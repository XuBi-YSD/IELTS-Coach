"""Line-art icon library (PIL) for the whiteboard renderer.
Icons are chosen automatically from keywords in a scene's `illustration` text."""
import math, random, re
from PIL import Image, ImageDraw, ImageFont

NAVY = (28, 40, 90)
RED = (205, 40, 40)
GREEN = (30, 140, 70)
FONT_PATH = "/System/Library/Fonts/Supplemental/ChalkboardSE.ttc"
SS = 2  # supersampling


class Ink:
    def __init__(self, w, h, seed=7):
        self.img = Image.new("RGBA", (w * SS, h * SS), (0, 0, 0, 0))
        self.d = ImageDraw.Draw(self.img)
        self.rnd = random.Random(seed)

    def ln(self, pts, col=NAVY, w=6.0, closed=False, jit=1.3):
        if closed:
            pts = list(pts) + [pts[0]]
        out = []
        for (a, b) in zip(pts[:-1], pts[1:]):
            n = max(1, int(math.dist(a, b) / 28))
            for i in range(n):
                t = i / n
                out.append((a[0] + (b[0] - a[0]) * t + self.rnd.uniform(-jit, jit),
                            a[1] + (b[1] - a[1]) * t + self.rnd.uniform(-jit, jit)))
        out.append(pts[-1])
        wp = w * SS
        P = [(x * SS, y * SS) for x, y in out]
        self.d.line(P, fill=col + (255,), width=int(wp), joint="curve")
        r = wp / 2
        for x, y in (P[0], P[-1]):
            self.d.ellipse([x - r, y - r, x + r, y + r], fill=col + (255,))

    def ell(self, cx, cy, rx, ry, col=NAVY, w=6.0, a0=0, a1=360):
        n = max(12, int((a1 - a0) / 8))
        pts = [(cx + rx * math.cos(math.radians(a0 + (a1 - a0) * i / n)),
                cy + ry * math.sin(math.radians(a0 + (a1 - a0) * i / n))) for i in range(n + 1)]
        self.ln(pts, col, w, jit=0.8)

    def rect(self, x, y, w_, h_, col=NAVY, w=6.0):
        self.ln([(x, y), (x + w_, y), (x + w_, y + h_), (x, y + h_)], col, w, closed=True)

    def dot(self, x, y, r, col=RED):
        self.d.ellipse([(x - r) * SS, (y - r) * SS, (x + r) * SS, (y + r) * SS], fill=col + (255,))

    def text(self, cx, cy, s, size, col=NAVY):
        f = ImageFont.truetype(FONT_PATH, int(size * SS), index=2)
        self.d.text((cx * SS, cy * SS), s, font=f, fill=col + (255,), anchor="mm")

    def result(self, w, h):
        return self.img.resize((w, h), Image.LANCZOS)


# every icon draws inside a 100x100 box scaled by u at (x, y)
def _mk(ink, x, y, s):
    u = s / 100.0
    lw = max(4.0, 6.5 * min(1.0, s / 300.0) + 1.5)
    p = lambda a, b: (x + a * u, y + b * u)
    P = lambda pts: [p(a, b) for a, b in pts]
    return u, lw, p, P


def notebook(k, x, y, s, **kw):
    u, lw, p, P = _mk(k, x, y, s)
    k.ln(P([(22, 10), (84, 10), (84, 92), (22, 92)]), NAVY, lw, True)
    for yy in range(20, 90, 14):
        k.ell(*p(22, yy), 5 * u, 4 * u, NAVY, lw * .8)
    for yy in (30, 46, 62):
        k.ln(P([(38, yy), (72, yy)]), NAVY, lw * .7)
    k.ln(P([(38, 78), (58, 78)]), RED, lw * .8)


def pencil(k, x, y, s, **kw):
    u, lw, p, P = _mk(k, x, y, s)
    d = (0.7071, -0.7071); n = (0.7071, 0.7071)
    A = (30, 70); B = (80, 20); w_ = 8
    c = lambda pt, m: (pt[0] + n[0] * m, pt[1] + n[1] * m)
    k.ln(P([c(A, w_), c(B, w_), c(B, -w_), c(A, -w_)]), NAVY, lw, True)
    k.ln(P([c(A, w_), (12, 90), c(A, -w_)]), NAVY, lw)
    k.ln(P([c((66, 34), w_), c((66, 34), -w_)]), RED, lw)
    k.dot(*p(14, 88), 3.2 * u, NAVY)


def target(k, x, y, s, **kw):
    u, lw, p, P = _mk(k, x, y, s)
    for r in (40, 27, 14):
        k.ell(*p(50, 50), r * u, r * u, NAVY, lw)
    k.dot(*p(50, 50), 5 * u, RED)
    k.ln(P([(50, 50), (92, 8)]), RED, lw)
    k.ln(P([(92, 8), (92, 24)]), RED, lw); k.ln(P([(92, 8), (76, 8)]), RED, lw)


def blocks(k, x, y, s, **kw):
    u, lw, p, P = _mk(k, x, y, s)
    for i, ch in enumerate("TEEL"):
        yy = 8 + i * 22; xx = 20 + (3 if i % 2 else -2)
        k.rect(*p(xx, yy), 60 * u, 20 * u, NAVY, lw)
        k.text(*p(xx + 30, yy + 11), ch, 15 * u, RED)


def flag(k, x, y, s, **kw):
    u, lw, p, P = _mk(k, x, y, s)
    k.rect(*p(22, 60), 56 * u, 30 * u, NAVY, lw)
    k.ln(P([(50, 60), (50, 8)]), NAVY, lw)
    k.ln(P([(50, 8), (84, 20), (50, 34)]), RED, lw, True)


def arrow(k, x, y, s, **kw):
    u, lw, p, P = _mk(k, x, y, s)
    k.ln(P([(8, 50), (88, 50)]), RED, lw + 1)
    k.ln(P([(68, 30), (90, 50), (68, 70)]), RED, lw + 1)


def person(k, x, y, s, device=None, **kw):
    u, lw, p, P = _mk(k, x, y, s)
    k.ell(*p(36, 22), 12 * u, 12 * u, NAVY, lw)
    k.ln(P([(36, 34), (36, 68)]), NAVY, lw)
    k.ln(P([(36, 44), (58, 54)]), NAVY, lw)
    k.ln(P([(36, 68), (24, 92)]), NAVY, lw); k.ln(P([(36, 68), (48, 92)]), NAVY, lw)
    if device == "laptop":
        k.rect(*p(56, 34), 32 * u, 22 * u, NAVY, lw)
        k.ln(P([(50, 62), (94, 62)]), NAVY, lw)
    elif device == "tablet":
        k.rect(*p(58, 36), 24 * u, 32 * u, NAVY, lw)
        k.ln(P([(64, 46), (76, 46)]), RED, lw * .7)
    k.ln(P([(30, 20), (34, 24)]), NAVY, lw * .5, jit=0)


def bubble(k, x, y, s, **kw):
    u, lw, p, P = _mk(k, x, y, s)
    k.ln(P([(8, 10), (92, 10), (92, 60), (46, 60), (24, 84), (28, 60), (8, 60)]), NAVY, lw, True)
    for yy in (26, 42):
        k.ln(P([(22, yy), (78 if yy == 26 else 60, yy)]), RED if yy == 42 else NAVY, lw * .7)


def school(k, x, y, s, **kw):
    u, lw, p, P = _mk(k, x, y, s)
    k.ln(P([(8, 38), (50, 12), (92, 38)]), NAVY, lw, True)
    k.rect(*p(16, 38), 68 * u, 52 * u, NAVY, lw)
    k.rect(*p(42, 60), 16 * u, 30 * u, NAVY, lw)
    k.rect(*p(22, 48), 12 * u, 12 * u, NAVY, lw * .8); k.rect(*p(66, 48), 12 * u, 12 * u, NAVY, lw * .8)
    k.ln(P([(50, 12), (50, 0)]), RED, lw * .8); k.ln(P([(50, 0), (62, 4), (50, 8)]), RED, lw * .8)


def circles(k, x, y, s, **kw):
    u, lw, p, P = _mk(k, x, y, s)
    k.ell(*p(20, 62), 16 * u, 16 * u, NAVY, lw); k.ell(*p(80, 62), 16 * u, 16 * u, NAVY, lw)
    k.ln(P([(38, 62), (62, 62)]), RED, lw); k.ln(P([(54, 54), (62, 62), (54, 70)]), RED, lw)
    k.text(*p(50, 38), "because", 11 * u, RED)
    k.text(*p(20, 64), "?", 20 * u, NAVY); k.text(*p(80, 64), "!", 20 * u, NAVY)


def clock(k, x, y, s, **kw):
    u, lw, p, P = _mk(k, x, y, s)
    k.ell(*p(50, 50), 38 * u, 38 * u, NAVY, lw)
    k.ln(P([(50, 50), (50, 26)]), NAVY, lw); k.ln(P([(50, 50), (68, 58)]), RED, lw)
    for a in range(0, 360, 90):
        c, sn = math.cos(math.radians(a)), math.sin(math.radians(a))
        k.ln(P([(50 + 33 * c, 50 + 33 * sn), (50 + 28 * c, 50 + 28 * sn)]), NAVY, lw * .8, jit=0)


def magnifier(k, x, y, s, **kw):
    u, lw, p, P = _mk(k, x, y, s)
    k.ell(*p(42, 42), 30 * u, 30 * u, NAVY, lw)
    k.ln(P([(64, 64), (90, 90)]), RED, lw + 3)


def chain(k, x, y, s, **kw):
    u, lw, p, P = _mk(k, x, y, s)
    k.ell(*p(33, 50), 26 * u, 15 * u, NAVY, lw + 1); k.ell(*p(67, 50), 26 * u, 15 * u, RED, lw + 1)


def stairs(k, x, y, s, **kw):
    u, lw, p, P = _mk(k, x, y, s)
    k.ln(P([(6, 94), (6, 78), (28, 78), (28, 64), (50, 64), (50, 50), (72, 50), (72, 42), (96, 42)]), NAVY, lw)
    k.ell(*p(84, 18), 7 * u, 7 * u, NAVY, lw * .8)
    k.ell(*p(84, 19), 3 * u, 2.5 * u, RED, lw * .6, 0, 180)
    k.ln(P([(84, 25), (84, 34)]), NAVY, lw); k.ln(P([(84, 34), (79, 42)]), NAVY, lw); k.ln(P([(84, 34), (89, 42)]), NAVY, lw)
    k.ln(P([(84, 28), (76, 22)]), NAVY, lw); k.ln(P([(84, 28), (92, 22)]), NAVY, lw)


def cards(k, x, y, s, **kw):
    u, lw, p, P = _mk(k, x, y, s)
    for ang, col in ((-22, NAVY), (0, NAVY), (22, RED)):
        a = math.radians(ang); c, sn = math.cos(a), math.sin(a)
        pts = [(-20, -34), (20, -34), (20, 34), (-20, 34)]
        R = [(50 + px * c - py * sn + ang * 0.6, 62 + px * sn + py * c) for px, py in pts]
        k.ln(P(R), col, lw, True)
    k.ln(P([(42, 40), (58, 40)]), NAVY, lw * .7)


def check(k, x, y, s, **kw):
    u, lw, p, P = _mk(k, x, y, s)
    k.ln(P([(12, 54), (38, 80), (90, 20)]), GREEN, lw + 4)


def qmark(k, x, y, s, **kw):
    u, lw, p, P = _mk(k, x, y, s)
    k.text(*p(50, 50), "?", 95 * u, RED)


def checklist(k, x, y, s, **kw):
    u, lw, p, P = _mk(k, x, y, s)
    k.rect(*p(16, 6), 68 * u, 88 * u, NAVY, lw)
    for yy in (24, 42, 60, 78):
        k.ln(P([(24, yy), (30, yy + 6), (41, yy - 7)]), GREEN, lw * .9)
        k.ln(P([(50, yy), (74, yy)]), NAVY, lw * .7)


def page(k, x, y, s, **kw):
    u, lw, p, P = _mk(k, x, y, s)
    k.rect(*p(16, 8), 68 * u, 84 * u, NAVY, lw)
    for yy in (26, 42, 58, 74):
        k.ln(P([(26, yy), (74, yy)]), NAVY, lw * .7)
    k.ell(*p(52, 42), 26 * u, 9 * u, RED, lw * .8)


def fraction(k, x, y, s, **kw):
    u, lw, p, P = _mk(k, x, y, s)
    k.text(*p(50, 50), "1/2", 62 * u, RED)


def teacher(k, x, y, s, **kw):
    u, lw, p, P = _mk(k, x, y, s)
    k.ell(*p(20, 26), 11 * u, 11 * u, NAVY, lw)
    k.ln(P([(20, 37), (20, 72)]), NAVY, lw); k.ln(P([(20, 72), (10, 94)]), NAVY, lw); k.ln(P([(20, 72), (30, 94)]), NAVY, lw)
    k.ln(P([(20, 46), (42, 34)]), NAVY, lw)
    k.rect(*p(34, 6), 24 * u, 18 * u, RED, lw * .7)
    for i, cx in enumerate((52, 70, 88)):
        k.ell(*p(cx, 62), 7 * u, 7 * u, NAVY, lw * .8)
        k.ln(P([(cx, 69), (cx, 90)]), NAVY, lw * .8)


def bulb(k, x, y, s, **kw):
    u, lw, p, P = _mk(k, x, y, s)
    k.ell(*p(50, 38), 24 * u, 26 * u, NAVY, lw)
    k.ln(P([(40, 62), (42, 76), (58, 76), (60, 62)]), NAVY, lw)
    k.ln(P([(44, 86), (56, 86)]), NAVY, lw)
    for a in (-60, -30, 0, 30, 60):
        c, sn = math.sin(math.radians(a)), -math.cos(math.radians(a))
        k.ln(P([(50 + 34 * c, 38 + 36 * sn), (50 + 44 * c, 38 + 46 * sn)]), RED, lw * .8, jit=0)


ICONS = dict(notebook=notebook, pencil=pencil, target=target, blocks=blocks, flag=flag, arrow=arrow,
             person=person, bubble=bubble, school=school, circles=circles, clock=clock, magnifier=magnifier,
             chain=chain, stairs=stairs, cards=cards, check=check, qmark=qmark, checklist=checklist,
             page=page, fraction=fraction, teacher=teacher, bulb=bulb)

# (regex, icon) ; earliest match position decides drawing order
KEYWORDS = [
    (r"notebook", "notebook"), (r"pencil", "pencil"), (r"target", "target"), (r"block", "blocks"),
    (r"flag", "flag"), (r"teacher", "teacher"), (r"stair|upward", "stairs"),
    (r"student|learner|person|stick-figure", "person"), (r"tablet|laptop", "person"),
    (r"speech bubble|bubble", "bubble"), (r"school", "school"), (r"circles", "circles"),
    (r"clock", "clock"), (r"magnif", "magnifier"), (r"chain", "chain"), (r"cards?", "cards"),
    (r"check mark|tick", "check"), (r"question mark", "qmark"), (r"checklist|list", "checklist"),
    (r"sentence|page|essay", "page"), (r"fraction|1/2", "fraction"),
]


def pick_icons(desc, limit=3):
    d = desc.lower()
    found = {}
    for pat, name in KEYWORDS:
        m = re.search(pat, d)
        if m and (name not in found or m.start() < found[name]):
            found[name] = m.start()
    if "stairs" in found: found.pop("person", None)
    if "flag" in found: found.pop("blocks", None)
    if "teacher" in found: found.pop("person", None)
    if "circles" in found: found.pop("qmark", None)
    if "checklist" in found and "check" in found and "check mark" not in d:
        found.pop("check")
    if "cards" in found: found.pop("page", None) if "sentence" not in d else None
    names = [n for n, _ in sorted(found.items(), key=lambda kv: kv[1])][:limit]
    if not names:
        names = ["bulb"]
    device = "laptop" if "laptop" in d else "tablet" if "tablet" in d else None
    return names, device


def draw_illustration(desc, w, h):
    """Returns RGBA PIL image (w x h) and list of (x0,x1,cy) cells for the pen path."""
    names, device = pick_icons(desc)
    k = Ink(w, h)
    n = len(names)
    cells = []
    if n == 1:
        s = min(w, h) * 0.8; cells = [((w - s) / 2, (h - s) / 2, s)]
    elif n == 2:
        s = min(w * 0.7, h * 0.46)
        cells = [((w - s) / 2, h * 0.02, s), ((w - s) / 2, h * 0.52, s)]
    else:
        s = min(w * 0.48, h * 0.44)
        cells = [(w * 0.02, h * 0.03, s), (w - s - w * 0.02, h * 0.03, s), ((w - s) / 2, h * 0.52, s)]
    for nm, (cx, cy, s) in zip(names, cells):
        ICONS[nm](k, cx, cy, s, device=device)
    return k.result(w, h), cells
