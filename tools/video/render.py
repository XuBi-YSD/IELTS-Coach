#!/usr/bin/env python3
"""Whiteboard-style lesson video renderer (offline, no frame files on disk).

Usage:  python3 render.py <scenes.json> <output_dir> [--name week-02] [--music file.mp3]
                          [--voice-en Samantha] [--voice-vi Linh] [--rate-en 165] [--keep-work]
Output: <output_dir>/<name>.mp4 (1920x1080, 30fps, H.264 + AAC) and <name>.srt
Voices: edge-tts neural (online, text sent to Microsoft; cached in .tts_cache by hash). Frames are piped as rawvideo into ffmpeg.
"""
import argparse, json, math, os, re, shutil, subprocess, sys, time, unicodedata, wave
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import icons as ic

W, H, FPS = 1920, 1080, 30
FFMPEG = shutil.which("ffmpeg") or "/opt/homebrew/bin/ffmpeg"
FFPROBE = shutil.which("ffprobe") or "/opt/homebrew/bin/ffprobe"
FONT_MAIN = "/System/Library/Fonts/Supplemental/ChalkboardSE.ttc"
FONT_MAIN_IDX = 2  # Bold: full Vietnamese glyph coverage (verified visually)
FONT_FALLBACK = "/Library/Fonts/Arial Unicode.ttf"  # IPA / special symbols
INK = (22, 28, 60)
INK_VI = (30, 70, 150)
RED = (205, 38, 38)
PAPER = (252, 251, 247)
VI_CHARS = set("ăâđêôơưĂÂĐÊÔƠƯ") | set(c for c in "áàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ")

TEXT_X0 = 110
TEXT_W_ILLUS = 1020
TEXT_W_FULL = 1700
ILLUS_BOX = (1210, 170, 600, 740)  # x, y, w, h


# ---------------------------------------------------------------- fonts
_fc = {}
def font(path, size, idx=0):
    k = (path, size, idx)
    if k not in _fc:
        _fc[k] = ImageFont.truetype(path, size, index=idx)
    return _fc[k]

def font_for(ch, size):
    o = ord(ch)
    if o < 0x250 or 0x1E00 <= o <= 0x1EFF or 0x2010 <= o <= 0x2026:
        return font(FONT_MAIN, size, FONT_MAIN_IDX)
    return font(FONT_FALLBACK, size)

def adv(ch, size):
    return font_for(ch, size).getlength(ch)

def word_w(word, size):
    return sum(adv(c, size) for c in word)

def strip_mark(ch):
    if ch in "đĐ":
        return "d" if ch == "đ" else "D"
    n = unicodedata.normalize("NFD", ch)
    base = n[0]
    # keep horn/breve/circumflex shapes? drop them: they are drawn as "marks" later
    return base


# ---------------------------------------------------------------- text layout
def norm_word(w):
    return re.sub(r"^[\W_]+|[\W_]+$", "", w)

def mark_highlights(words, highlights):
    flags = [False] * len(words)
    nw = [norm_word(w) for w in words]
    for h in highlights:
        hw = [norm_word(x) for x in h.split()]
        if not hw: continue
        for ci in (False, True):
            hit = False
            for i in range(len(words) - len(hw) + 1):
                seg = nw[i:i + len(hw)]
                ok = all((a.lower() == b.lower()) if ci else (a == b) for a, b in zip(seg, hw))
                if ok:
                    for j in range(len(hw)): flags[i + j] = True
                    hit = True
            if hit: break
    return flags

def layout_text(text, highlights, has_illus):
    box_w = TEXT_W_ILLUS if has_illus else TEXT_W_FULL
    paras = [p for p in text.split("\n") if p.strip()]
    for size in range(68, 31, -2):
        gap_sp = adv(" ", size)
        lines = []  # each: dict(tokens=[(word,x,flag)], width, para_idx)
        for pi, para in enumerate(paras):
            words = para.split()
            flags = mark_highlights(words, highlights)
            cur, x = [], 0.0
            for w_, f in zip(words, flags):
                ww = word_w(w_, size)
                if cur and x + ww > box_w:
                    lines.append(dict(tokens=cur, width=x - gap_sp, pi=pi)); cur, x = [], 0.0
                cur.append((w_, x, f)); x += ww + gap_sp
            if cur: lines.append(dict(tokens=cur, width=x - gap_sp, pi=pi))
        lh = size * 1.32
        total = len(lines) * lh + (len(paras) - 1) * size * 0.45
        if total <= 800 or size <= 32:
            break
    y = (H - total) / 2
    last_pi = None
    for ln in lines:
        if last_pi is not None and ln["pi"] != last_pi: y += size * 0.45
        ln["y"] = y; y += lh; last_pi = ln["pi"]
    return lines, size, lh, paras

class TextLine:
    """Pre-rendered line: colour + alpha for 'body only' and 'full (with diacritics)'."""
    def __init__(self, ln, size, lh, para_text):
        self.size = size
        pad = 24
        self.x0 = TEXT_X0 - pad
        self.y0 = int(ln["y"]) - pad // 2
        wl = int(max(w_ for w_ in [ln["width"]]) + 2 * pad + 20)
        hl = int(lh + pad)
        self.w, self.h = wl, hl
        col_base = INK_VI if any(c in VI_CHARS for c in para_text) else INK
        full = Image.new("RGBA", (wl, hl), (0, 0, 0, 0)); base = Image.new("RGBA", (wl, hl), (0, 0, 0, 0))
        df, db = ImageDraw.Draw(full), ImageDraw.Draw(base)
        ty = pad // 2 + (lh - size * 1.25) / 2
        self.has_marks = False
        runs, run = [], None
        toks = ln["tokens"]
        for i, (w_, x, f) in enumerate(toks):
            col = RED if f else col_base
            cx = pad + x
            for ch in w_:
                fn = font_for(ch, size)
                df.text((round(cx), round(ty)), ch, font=fn, fill=col + (255,))
                sb = strip_mark(ch)
                if sb != ch: self.has_marks = True
                db.text((round(cx), round(ty)), sb if sb in "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" else ch,
                        font=fn, fill=col + (255,))
                cx += adv(ch, size)
            if f:
                end = pad + x + word_w(w_, size)
                if run: run[1] = end
                else: run = [pad + x, end]
                nxt = toks[i + 1][2] if i + 1 < len(toks) else False
                if not nxt: runs.append(run); run = None
        base_y = ty + size * 1.12
        for a, b in runs:  # hand-drawn wavy underline in red
            pts = []
            n = max(4, int((b - a) / 14))
            for k in range(n + 1):
                xx = a + (b - a) * k / n
                pts.append((xx, base_y + math.sin(k * 1.7) * 2.2 + (k % 2) * 1.2))
            for dd in (df, db):
                dd.line(pts, fill=RED + (255,), width=max(3, size // 16), joint="curve")
        a_full = np.asarray(full)
        a_base = np.asarray(base)
        self.color = a_full[..., :3].copy()
        self.alpha_full = a_full[..., 3].astype(np.float32) / 255.0
        self.alpha_base = a_base[..., 3].astype(np.float32) / 255.0
        # body colour for base layer may differ only by alpha; reuse full colours
        ys, xs = np.nonzero(self.alpha_full > 0.05)
        self.ink_x0 = int(xs.min()) if len(xs) else 0
        self.ink_x1 = int(xs.max()) + 1 if len(xs) else wl
        self.xs = np.arange(wl, dtype=np.float32)[None, :]
        self.cy = self.y0 + hl * 0.62
        self.weight = (self.ink_x1 - self.ink_x0) + 120

    def _apply(self, canvas, alpha):
        x0, y0 = self.x0, self.y0
        reg = canvas[y0:y0 + self.h, x0:x0 + self.w]
        a = alpha[..., None]
        reg[:] = (reg * (1 - a) + self.color * a + 0.5).astype(np.uint8)

    def bake(self, canvas):
        self._apply(canvas, self.alpha_full)

    def _cut(self, p):
        return self.ink_x0 - 10 + (self.ink_x1 - self.ink_x0 + 30) * p

    def partial(self, canvas, p):
        soft = 18.0
        tail = 0.18 if self.has_marks else 0.0
        p1 = min(1.0, p / (1 - tail))
        p2 = max(0.0, (p - tail) / (1 - tail))
        c1, c2 = self._cut(p1), self._cut(p2)
        m1 = np.clip((c1 - self.xs) / soft, 0, 1)
        m2 = np.clip((c2 - self.xs) / soft, 0, 1)
        alpha = np.maximum(self.alpha_base * m1, self.alpha_full * m2) if self.has_marks else self.alpha_full * m1
        self._apply(canvas, alpha)

    def tip(self, p):
        tail = 0.18 if self.has_marks else 0.0
        p1 = min(1.0, p / (1 - tail))
        return self.x0 + self._cut(p1) - 6, self.cy


class IllusItem:
    """One icon cell revealed with a soft left-to-right wipe."""
    def __init__(self, alpha, color, cell, box):
        bx, by, bw, bh = box
        cx, cy, s = cell
        self.x0 = int(bx + max(0, cx - 12)); self.x1 = int(min(bx + bw, bx + cx + s + 12))
        self.y0 = int(by + max(0, cy - 12)); self.y1 = int(min(by + bh, by + cy + s + 12))
        self.alpha = alpha[self.y0 - by:self.y1 - by, self.x0 - bx:self.x1 - bx]
        self.color = color[self.y0 - by:self.y1 - by, self.x0 - bx:self.x1 - bx]
        self.xs = np.arange(self.x1 - self.x0, dtype=np.float32)[None, :]
        self.weight = 600
    def _apply(self, canvas, alpha):
        reg = canvas[self.y0:self.y1, self.x0:self.x1]
        a = alpha[..., None]
        reg[:] = (reg * (1 - a) + self.color * a + 0.5).astype(np.uint8)
    def bake(self, canvas): self._apply(canvas, self.alpha)
    def partial(self, canvas, p):
        c = -30 + (self.x1 - self.x0 + 60) * p
        self._apply(canvas, self.alpha * np.clip((c - self.xs) / 30.0, 0, 1))
    def tip(self, p):
        wd = self.x1 - self.x0
        x = self.x0 + (-30 + (wd + 60) * p)
        x = min(max(x, self.x0), self.x1)
        y = (self.y0 + self.y1) / 2 + (self.y1 - self.y0) * 0.33 * math.sin(p * 2 * math.pi * 3.2)
        return x, y


# ---------------------------------------------------------------- hand sprite
def make_hand_fallback():
    S = 2
    cw = 600
    im = Image.new("RGBA", (cw * S, cw * S), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    ux, uy = 0.5, 0.866
    nx, ny = -uy, ux
    tip = (40, 40)
    def pt(t, off=0): return ((tip[0] + ux * t + nx * off) * S, (tip[1] + uy * t + ny * off) * S)
    outline = (60, 40, 35, 255); skin = (240, 199, 165, 255); skin2 = (226, 178, 142, 255)
    # pen
    d.polygon([pt(0), pt(60, -9), pt(60, 9)], fill=(236, 205, 150, 255), outline=outline)
    d.polygon([pt(0), pt(12, -2), pt(12, 2)], fill=(40, 40, 40, 255))
    d.polygon([pt(60, -11), pt(470, -13), pt(470, 13), pt(60, 11)], fill=(40, 90, 190, 255), outline=outline)
    d.polygon([pt(300, -13), pt(330, -13), pt(330, 13), pt(300, 13)], fill=(240, 240, 240, 255))
    # fist
    cx, cy = (tip[0] + ux * 300 + 15) * S, (tip[1] + uy * 300 + 40) * S
    d.ellipse([cx - 135 * S, cy - 105 * S, cx + 135 * S, cy + 105 * S], fill=skin, outline=outline, width=3 * S)
    # index finger and thumb pressing the pen
    def capsule(a, b, wd, fill):
        d.line([(a[0] * S, a[1] * S), (b[0] * S, b[1] * S)], fill=outline, width=int((wd + 6) * S))
        d.line([(a[0] * S, a[1] * S), (b[0] * S, b[1] * S)], fill=fill, width=int(wd * S))
        for q in (a, b):
            d.ellipse([(q[0] - wd / 2) * S, (q[1] - wd / 2) * S, (q[0] + wd / 2) * S, (q[1] + wd / 2) * S], fill=fill)
    g = (tip[0] + ux * 215, tip[1] + uy * 215)
    capsule((g[0] + 80, g[1] + 20), (g[0] - 8, g[1] + 6), 46, skin)
    capsule((g[0] - 30, g[1] + 95), (g[0] + 14, g[1] + 22), 42, skin2)
    im = im.resize((cw, cw), Image.LANCZOS)
    a = np.asarray(im).astype(np.float32)
    alpha = a[..., 3] / 255.0
    sh = Image.fromarray((alpha * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(9))
    shadow = np.asarray(sh).astype(np.float32) / 255.0 * 0.28
    out = np.zeros((cw + 30, cw + 30, 4), np.float32)
    # shadow offset (14,18), composite sprite over it
    sa = np.zeros((cw + 30, cw + 30), np.float32); sa[18:18 + cw, 14:14 + cw] = shadow
    ha = np.zeros_like(sa); ha[:cw, :cw] = alpha
    hc = np.zeros((cw + 30, cw + 30, 3), np.float32); hc[:cw, :cw] = a[..., :3]
    ta = ha + sa * (1 - ha)
    col = (hc * ha[..., None] + 0 * sa[..., None] * (1 - ha[..., None])) / np.maximum(ta, 1e-5)[..., None]
    return col, ta, tip

def make_hand(scale=0.72):
    """CC0 hand image (assets/hand_cc0_color.png, tip from .json) + soft shadow; falls back to PIL drawing."""
    d = os.path.join(os.path.dirname(os.path.abspath(__file__)), "assets")
    png, js = os.path.join(d, "hand_cc0_color.png"), os.path.join(d, "hand_cc0_color.json")
    if not (os.path.exists(png) and os.path.exists(js)):
        print("WARNING: hand image not found, using drawn fallback hand")
        return make_hand_fallback()
    hd = Image.open(png).convert("RGBA")
    tip0 = json.load(open(js))["tip"]
    hd = hd.resize((int(hd.width * scale), int(hd.height * scale)), Image.LANCZOS)
    tip = (int(tip0[0] * scale), int(tip0[1] * scale))
    # the PNG is cut flat on the right (arm): fade the last 35% of the width so it does not look chopped
    arr_h = np.asarray(hd).copy()
    ramp = np.clip((hd.width - np.arange(hd.width)) / (0.35 * hd.width), 0, 1).astype(np.float32)
    arr_h[..., 3] = (arr_h[..., 3] * ramp[None, :]).astype(np.uint8)
    hd = Image.fromarray(arr_h)
    pad = 40
    cv = Image.new("RGBA", (hd.width + 2 * pad, hd.height + 2 * pad), (0, 0, 0, 0))
    a = np.asarray(hd)[..., 3]
    sh = Image.new("L", cv.size, 0)
    sh.paste(Image.fromarray(a), (pad + 12, pad + 14))
    sh = np.asarray(sh.filter(ImageFilter.GaussianBlur(8))).astype(np.float32) * 0.30
    shadow = np.zeros((cv.height, cv.width, 4), np.uint8); shadow[..., 3] = sh.astype(np.uint8)
    cv = Image.alpha_composite(Image.fromarray(shadow), cv)
    cv.alpha_composite(hd, (pad, pad))
    arr = np.asarray(cv).astype(np.float32)
    return arr[..., :3], arr[..., 3] / 255.0, (tip[0] + pad, tip[1] + pad)

HAND = None
def blit_hand(frame, x, y):
    col, a, tip = HAND
    hh, ww = a.shape
    px, py = int(round(x - tip[0])), int(round(y - tip[1]))
    sx0, sy0 = max(0, -px), max(0, -py)
    ex, ey = min(ww, W - px), min(hh, H - py)
    if ex <= sx0 or ey <= sy0: return
    reg = frame[py + sy0:py + ey, px + sx0:px + ex]
    aa = a[sy0:ey, sx0:ex, None]
    reg[:] = (reg * (1 - aa) + col[sy0:ey, sx0:ex] * aa + 0.5).astype(np.uint8)


# ---------------------------------------------------------------- audio
def run(cmd, **kw):
    return subprocess.run(cmd, check=True, **kw)

# --- TTS: edge-tts (Microsoft neural voices; sends the narration text to Microsoft's online service) ---
CACHE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".tts_cache")
VI_MARKED = set("ăâđêôơưáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ")
# Vietnamese words written without diacritics (must never be treated as English)
VI_NOMARK = set("""nay cho hai sao ba quay sai suy hay thi do trong to an la ma ban ca co con cu den di du em hoc khi
mo nha bo be bi ve vo tu mua xem lam bai cau cac gi ra vao thu ten tre the tai nam ngu nga bay bon sau tam chin muoi
nhe nhu nen neu nao nay no ong qua rat roi se so ta thay tin toi tuan vua voi xin""".split())

def eng_vocab(data):
    """English words known from the lesson itself: English-only text lines, highlights, English narration."""
    v = set()
    wd = lambda t: re.findall(r"[A-Za-z][A-Za-z'’-]*", t)
    for sc in data["scenes"]:
        for line in sc.get("text_display", "").split("\n"):
            if not any(c in VI_MARKED for c in line.lower()):
                v.update(w.lower() for w in wd(line))
        for h in sc.get("highlight", []): v.update(w.lower() for w in wd(h))
        if sc.get("voice_lang", "").startswith("en"): v.update(w.lower() for w in wd(sc["voice_text"]))
    v.add("ielts")
    return v

def split_langs(text, lang, vocab):
    """List of (segment_text, 'en'|'vi'). For vi scenes, English runs are read with the en voice."""
    if not lang.lower().startswith("vi"):
        return [(text, "en")]
    toks = text.split()
    core = lambda t: re.sub(r"^[^\w]+|[^\w]+$", "", t)
    flag = []
    for t in toks:
        w = core(t); lw = w.lower()
        ok = (len(w) >= 3 and lw in vocab and lw not in VI_NOMARK and not any(c in VI_MARKED for c in lw)
              and re.fullmatch(r"[A-Za-z'’-]+", w) is not None)
        flag.append(ok)
    for i in range(1, len(toks)):  # capitalised unmarked word in mid-sentence ("Writing Task")
        w = core(toks[i])
        if (not flag[i] and len(w) >= 4 and w[0].isupper() and re.fullmatch(r"[A-Za-z]+", w) and w.lower() not in VI_NOMARK
                and not re.search(r"[.!?:]$", toks[i - 1])):
            flag[i] = True
    for i in range(1, len(toks) - 1):  # connector words between two English words (of / the / to ...)
        w = core(toks[i]).lower()
        if not flag[i] and flag[i - 1] and flag[i + 1] and w in vocab and w not in VI_NOMARK and re.fullmatch(r"[a-z]+", w):
            flag[i] = True
    for i in range(1, len(toks)):  # digits right after an English word ("Task 2")
        if not flag[i] and flag[i - 1] and re.fullmatch(r"\d+[.,;:?!]*", toks[i]): flag[i] = True
    segs = []
    for t, f in zip(toks, flag):
        lg = "en" if f else "vi"
        if segs and segs[-1][1] == lg: segs[-1][0] += " " + t
        else: segs.append([t, lg])
    return [(a, b) for a, b in segs]

def _edge_to_wav(text, voice, rate, out_wav):
    import asyncio, edge_tts
    tmp = out_wav + ".mp3"
    last = None
    for attempt in range(5):
        try:
            asyncio.run(edge_tts.Communicate(text, voice, rate=rate).save(tmp))
            run([FFMPEG, "-y", "-loglevel", "error", "-i", tmp, "-ar", "44100", "-ac", "1", "-c:a", "pcm_s16le", out_wav])
            os.remove(tmp)
            return
        except Exception as e:
            last = e; time.sleep(3 * (attempt + 1))
    raise SystemExit(f"edge-tts failed 5 times (voice {voice}, text '{text[:60]}...'): {type(last).__name__} {last}. "
                     "Check the network connection; NOT falling back to the macOS 'say' voice.")

def tts(text, lang, out_wav, voices, rate, vocab=frozenset()):
    import hashlib
    os.makedirs(CACHE_DIR, exist_ok=True)
    parts = []
    for seg, lg in split_langs(text, lang, vocab):
        voice, r = (voices["vi"], rate["vi"]) if lg == "vi" else (voices["en"], rate["en"])
        key = hashlib.sha256(f"{voice}|{r}|{seg}".encode("utf-8")).hexdigest()[:24]
        cached = os.path.join(CACHE_DIR, key + ".wav")
        if not os.path.exists(cached):
            _edge_to_wav(seg, voice, r, cached)
            time.sleep(0.6)  # be gentle with the service (it throttles bursts)
        parts.append(read_wav(cached))
    gap = np.zeros(int(0.06 * 44100), np.int16)
    out = []
    for i, p in enumerate(parts):
        out.append(p)
        if i < len(parts) - 1: out.append(gap)
    arr = np.concatenate(out)
    with wave.open(out_wav, "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(44100); w.writeframes(arr.tobytes())

def wav_dur(p):
    out = subprocess.run([FFPROBE, "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", p],
                         capture_output=True, text=True, check=True).stdout
    return float(out.strip())

def read_wav(p):
    with wave.open(p) as w:
        return np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16)


# ---------------------------------------------------------------- srt
def srt_time(t):
    ms = int(round(t * 1000)); h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); s, ms = divmod(ms, 1000)
    return f"{h:02}:{m:02}:{s:02},{ms:03}"

def sentences(text):
    parts = re.split(r"(?<=[.!?:;])\s+", text.strip())
    out = []
    for p in parts:
        while len(p) > 90:
            cut = p.rfind(",", 0, 90)
            cut = cut if cut > 20 else p.rfind(" ", 0, 90)
            out.append(p[:cut + 1].strip()); p = p[cut + 1:].strip()
        if p: out.append(p)
    return out


# ---------------------------------------------------------------- main
def ease(x):
    x = min(1.0, max(0.0, x)); return x * x * (3 - 2 * x)

def build_items(sc):
    text = sc.get("text_display", "")
    ill = (sc.get("illustration") or "").strip()
    has_ill = bool(ill)
    lines, size, lh, paras = layout_text(text, sc.get("highlight", []), has_ill)
    items = [TextLine(ln, size, lh, paras[ln["pi"]]) for ln in lines]
    ill_items = []
    if has_ill:
        bx, by, bw, bh = ILLUS_BOX
        img, cells = ic.draw_illustration(re.sub(r"^Line art:\s*", "", ill), bw, bh)
        a = np.asarray(img)
        alpha = a[..., 3].astype(np.float32) / 255.0
        color = a[..., :3].astype(np.float32)
        n = len(cells)
        for cell in cells[:n]:
            ill_items.append(IllusItem(alpha, color, cell, ILLUS_BOX))
    return items, ill_items

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("scenes"); ap.add_argument("outdir")
    ap.add_argument("--name", default=None)
    ap.add_argument("--music", default=None)
    ap.add_argument("--voice-en", default="en-US-JennyNeural"); ap.add_argument("--voice-vi", default="vi-VN-HoaiMyNeural")
    ap.add_argument("--rate-en", default="-5%"); ap.add_argument("--rate-vi", default="+0%")
    ap.add_argument("--keep-work", action="store_true")
    ap.add_argument("--max-scenes", type=int, default=0, help="debug: only first N scenes")
    ap.add_argument("--encoder", default="libx264", choices=["libx264", "h264_videotoolbox"])
    args = ap.parse_args()
    global HAND
    HAND = make_hand()
    t_start = time.time()

    data = json.load(open(args.scenes, encoding="utf-8"))
    scenes = data["scenes"][: args.max_scenes or None]
    name = args.name or os.path.basename(os.path.dirname(os.path.abspath(args.scenes)))
    os.makedirs(args.outdir, exist_ok=True)
    work = os.path.join(args.outdir, "_work_" + name)
    os.makedirs(work, exist_ok=True)
    voices = dict(en=args.voice_en, vi=args.voice_vi); rate = dict(en=args.rate_en, vi=args.rate_vi)

    # 1) voice + timeline
    LEAD = 0.3
    vocab = eng_vocab(data)
    timeline = []
    t0 = 0.0
    for sc in scenes:
        wavp = os.path.join(work, f"{sc['id']}.wav")
        tts(sc["voice_text"], sc.get("voice_lang", "en-US"), wavp, voices, rate, vocab)
        vd = wav_dur(wavp)
        pause = float(sc.get("pause_after_sec", 1.0))
        dur = LEAD + vd + max(0.5, pause)
        timeline.append(dict(sc=sc, wav=wavp, vd=vd, t0=t0, dur=dur))
        t0 += dur
    total = t0
    nframes = int(math.ceil(total * FPS))
    print(f"voice done: {len(scenes)} scenes, {total:.1f}s ({time.time()-t_start:.0f}s)", flush=True)

    # 2) audio track + srt
    sr = 44100
    track = np.zeros(int(total * sr) + sr, dtype=np.int32)
    srt, idx = [], 1
    for e in timeline:
        a = read_wav(e["wav"]); s0 = int((e["t0"] + LEAD) * sr)
        track[s0:s0 + len(a)] += a
        sents = sentences(e["sc"]["voice_text"]); tot_c = sum(len(s) for s in sents) or 1
        tc = e["t0"] + LEAD
        for s in sents:
            d = e["vd"] * len(s) / tot_c
            srt.append(f"{idx}\n{srt_time(tc)} --> {srt_time(tc + d)}\n{s}\n"); idx += 1; tc += d
    track = np.clip(track, -32768, 32767).astype(np.int16)
    full_wav = os.path.join(work, "voice_full.wav")
    with wave.open(full_wav, "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(track.tobytes())
    open(os.path.join(args.outdir, name + ".srt"), "w", encoding="utf-8").write("\n".join(srt))

    # 3) paper
    rng = np.random.default_rng(3)
    noise = rng.normal(0, 1, (H, W)).astype(np.float32)
    nimg = Image.fromarray(((noise * 40) + 128).clip(0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))
    n2 = (np.asarray(nimg).astype(np.float32) - 128) / 40 * 1.6
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    vig = -((xx / W - .5) ** 2 + (yy / H - .5) ** 2) * 7
    paper = np.clip(np.array(PAPER, np.float32)[None, None, :] + (n2 + vig)[..., None], 0, 255).astype(np.uint8)

    # 4) ffmpeg pipe
    outp = os.path.join(args.outdir, name + ".mp4")
    enc = (["-c:v", "libx264", "-preset", "veryfast", "-crf", "20"] if args.encoder == "libx264"
           else ["-c:v", "h264_videotoolbox", "-b:v", "6M"])
    cmd = [FFMPEG, "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS),
           "-i", "-", "-i", full_wav]
    music = args.music or next((os.path.join(os.path.dirname(__file__), "assets", f) for f in ("music.mp3", "music.m4a", "music.wav")
                                if os.path.exists(os.path.join(os.path.dirname(__file__), "assets", f))), None)
    if music and os.path.exists(music):
        cmd += ["-stream_loop", "-1", "-i", music, "-filter_complex",
                "[2:a]volume=0.1[m];[1:a][m]amix=inputs=2:duration=first:normalize=0[a]", "-map", "0:v", "-map", "[a]"]
    else:
        cmd += ["-map", "0:v", "-map", "1:a"]
        print("no background music found: skipped")
    cmd += enc + ["-pix_fmt", "yuv420p", "-r", str(FPS), "-c:a", "aac", "-b:a", "160k", "-shortest",
                  "-movflags", "+faststart", outp]
    ff = subprocess.Popen(cmd, stdin=subprocess.PIPE)

    # 5) frames
    fno = 0
    for si, e in enumerate(timeline):
        items_t, items_i = build_items(e["sc"])
        items = items_t + items_i
        vd = e["vd"]
        ws = 0.25
        we = max(ws + 1.4, LEAD + vd - 0.5)
        Wd = we - ws
        share_i = 0.24 if items_i else 0.0
        wt = sum(i.weight for i in items_t) or 1
        wi = sum(i.weight for i in items_i) or 1
        tt = ws
        for it in items_t:
            d = Wd * (1 - share_i) * it.weight / wt; it.t0, it.t1 = tt, tt + d; tt += d
        for it in items_i:
            d = Wd * share_i * it.weight / wi; it.t0, it.t1 = tt, tt + d; tt += d
        canvas = paper.copy()
        nf = int(round(e["dur"] * FPS))
        # make sure global frame count stays aligned with scene start time
        nf = int(round((e["t0"] + e["dur"]) * FPS)) - fno
        baked = 0
        last_bytes, static_ok = None, False
        hand_enter, hand_exit = ws - 0.35, we + 0.3
        off = (W + 120, H + 60)
        rnd = np.random.default_rng(si)
        for k in range(nf):
            t = k / FPS
            dirty = False
            while baked < len(items) and t >= items[baked].t1:
                items[baked].bake(canvas); baked += 1; dirty = True
            active = items[baked] if baked < len(items) and t >= items[baked].t0 else None
            hand_on = hand_enter <= t <= hand_exit
            if not active and not hand_on and not dirty and last_bytes is not None:
                ff.stdin.write(last_bytes); fno += 1; continue
            fr = canvas.copy()
            if active:
                p = (t - active.t0) / max(1e-6, active.t1 - active.t0)
                active.partial(fr, p)
                tip = active.tip(p)
                if baked > 0:  # glide from the previous item's end
                    prev = items[baked - 1].tip(1.0)
                    g = ease((t - active.t0) / 0.22)
                    tip = (prev[0] + (tip[0] - prev[0]) * g, prev[1] + (tip[1] - prev[1]) * g)
            elif baked >= len(items):
                tip = items[-1].tip(1.0) if items else off
            else:
                tip = items[0].tip(0.0)
            if hand_on:
                jx = 2.2 * math.sin(t * 41) + 1.3 * math.sin(t * 23 + 1.0)
                jy = 2.0 * math.sin(t * 37 + 2.0) + 1.1 * math.sin(t * 19)
                x, y = tip[0] + jx, tip[1] + jy
                if t < ws:
                    g = ease((t - hand_enter) / (ws - hand_enter)); x, y = off[0] + (x - off[0]) * g, off[1] + (y - off[1]) * g
                elif t > we:
                    g = ease((t - we) / (hand_exit - we)); x, y = x + (off[0] - x) * g, y + (off[1] - y) * g
                blit_hand(fr, x, y)
            last_bytes = fr.tobytes()
            ff.stdin.write(last_bytes); fno += 1
        print(f"  scene {e['sc']['id']} done  ({fno}/{nframes} frames, {time.time()-t_start:.0f}s)", flush=True)
    ff.stdin.close(); ff.wait()
    if ff.returncode != 0:
        sys.exit("ffmpeg failed")
    if not args.keep_work:
        shutil.rmtree(work, ignore_errors=True)
    print(f"OK {outp}  total {total:.1f}s  render {time.time()-t_start:.0f}s  size {os.path.getsize(outp)/1e6:.1f} MB")

if __name__ == "__main__":
    main()
