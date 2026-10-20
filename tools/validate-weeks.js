#!/usr/bin/env node
// tools/validate-weeks.js — Validator nội dung IELTS Coach (tự soạn).
// Kiểm tra weeks/wNN.js theo schema (~/Private Project/20261020-english-coach/design/schema-tuan-va-chuan-ielts.md)
// và số lượng theo lộ trình (PLAN trong data.js). Chỉ ĐỌC file, không sửa gì.
//
// Cách chạy (từ thư mục gốc app):
//   node tools/validate-weeks.js                # toàn bộ weeks/w*.js + kiểm tra Bài 01 (data.js / data-en.js)
//   node tools/validate-weeks.js weeks/w03.js   # một/vài file
//   node tools/validate-weeks.js --quiet        # chỉ in lỗi + tổng kết
// Mã thoát: 0 = không có lỗi (cảnh báo không làm fail), 1 = có lỗi.
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const args = process.argv.slice(2);
const QUIET = args.includes("--quiet");
let files = args.filter(a => !a.startsWith("--"));
const ALL = files.length === 0;
if (ALL) files = fs.readdirSync(path.join(ROOT, "weeks")).filter(f => /^w\d\d\.js$/.test(f)).sort().map(f => path.join("weeks", f));

let nErr = 0, nWarn = 0;
const out = [];
const err = (where, msg) => { nErr++; out.push(`  ERROR  ${where}: ${msg}`); };
const warn = (where, msg) => { nWarn++; out.push(`  warn   ${where}: ${msg}`); };
const info = msg => { if (!QUIET) out.push(msg); };
const flush = () => { if (out.length) console.log(out.join("\n")); out.length = 0; };

// ---------------------------------------------------------------- helpers
const isStr = x => typeof x === "string" && x.trim().length > 0;
const isBi = x => x && typeof x === "object" && !Array.isArray(x) && isStr(x.vi) && isStr(x.en);
const isStrOrBi = x => isStr(x) || isBi(x);
const txt = x => (typeof x === "string" ? x : x ? `${x.vi || ""} ${x.en || ""}` : "");
const wc = s => String(s).trim().split(/\s+/).filter(Boolean).length;
const norm = s => String(s).toLowerCase().normalize("NFC")
  .replace(/[’‘`]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ").trim();
const pad2 = n => String(n).padStart(2, "0");

const SKILLS = ["grammar", "writing", "reading", "listening", "speaking", "mixed"];
const QTYPES = ["mcq", "tfng", "gap", "short", "matching", "order", "text", "write", "essay", "speak"];
const AUTO = ["mcq", "tfng", "gap", "short", "matching", "order"];
const POS = ["n", "v", "adj", "adv", "phr", "phr v", "idiom", "prep", "conj"];
const SCRIPT_KINDS = ["listening", "speaking-model", "speaking-prompt"];
const GRAMMAR_TAGS = ["tense", "article", "agreement", "relative", "conditional", "inversion", "trend-preposition", "grammar"];
// Ngưỡng đạt lấy từ cột "Tự kiểm tra" của PLAN (tuần không có % → null)
const PASS_PCT = { 1: null, 3: 65, 4: 60, 5: null, 6: 70, 7: 70, 8: null, 9: null, 10: null, 11: null, 12: null };
// Dấu hiệu nguồn có bản quyền / đề thật (không được xuất hiện trong nội dung)
const COPYRIGHT_RX = /(cambridge ielts|official guide to ielts|road to ielts|ielts trainer|barron'?s|collins english for ielts|actual test|real test \d|đề thi thật năm|ielts-mentor)/i;
// Dấu hiệu số liệu/nghiên cứu "như thật" — chỉ cảnh báo để rà tay
const CLAIM_RX = /(\b(a|one|recent|new) (study|survey|report)\b[^.]{0,80}\b(found|showed|shows|suggests|revealed)\b|\baccording to (research|scientists|experts|statistics)\b|\b\d+(\.\d+)?\s?(%|per cent|percent)\b)/i;

function pts(q) {
  if (!AUTO.includes(q.type)) return 0;
  if ((q.type === "matching" || q.type === "order") && q.scoreEach) return (q.items || []).length;
  return 1;
}

// Chuẩn hoá cách đọc số trong script (chữ → chữ số) để đối chiếu đáp án dạng số.
const NUMW = { zero: 0, oh: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19,
  twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 };
const ORD = ["first","second","third","fourth","fifth","sixth","seventh","eighth","ninth","tenth","eleventh","twelfth","thirteenth","fourteenth","fifteenth","sixteenth","seventeenth","eighteenth","nineteenth","twentieth","thirtieth"];
const isNumWord = t => String(t).toLowerCase().split("-").every(p => p in NUMW || ORD.includes(p));
function spokenDigits(text) {
  let t = norm(text).replace(/[-,]/g, " ").replace(/\s+/g, " ");
  const n = w => NUMW[w];
  t = t.replace(/\bhalf past (\w+)/g, (m, w) => n(w) != null ? `${n(w)}.30` : m)
       .replace(/\b(?:a )?quarter past (\w+)/g, (m, w) => n(w) != null ? `${n(w)}.15` : m)
       .replace(/\b(?:a )?quarter to (\w+)/g, (m, w) => n(w) != null ? `${n(w) - 1}.45` : m)
       .replace(/\bdouble (\w+)/g, (m, w) => n(w) != null ? `${n(w)} ${n(w)}` : m)
       .replace(/\b(twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety) (one|two|three|four|five|six|seven|eight|nine)\b/g,
                (m, a, b) => String(NUMW[a] + NUMW[b]))
       .replace(/\b[a-z]+\b/g, w => (NUMW[w] != null ? String(NUMW[w]) : w));
  // gộp chuỗi ký tự/chữ số đọc rời: "h 4 4 2" → "h442", "0 7 7 0 0" → "07700"
  return t.replace(/\b([a-z0-9])(?: (?=[0-9]\b)([0-9]))+/g, m => m.replace(/ /g, ""))
          .replace(/(\d) (?=\d)/g, "$1");
}
function inSource(ans, src) {
  const a = norm(ans), s = norm(src);
  if (s.includes(a)) return true;
  const dh = x => x.replace(/-/g, " ");
  if (dh(s).includes(dh(a))) return true;
  if (/\d/.test(a)) {
    const d = spokenDigits(src).replace(/\s/g, "");
    return d.includes(a.replace(/[\s-]/g, ""));
  }
  return false;
}

// ---------------------------------------------------------------- load
function loadFile(rel) {
  const code = fs.readFileSync(path.resolve(ROOT, rel), "utf8");
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(code, ctx, { filename: rel });
  return { code, WEEKS: ctx.window.WEEKS || {} };
}
let PLAN = null;
try {
  const ctx = { window: {} }; vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, "data.js"), "utf8"), ctx);
  PLAN = ctx.window.PLAN;
} catch (e) { /* PLAN không bắt buộc */ }

// ---------------------------------------------------------------- per-week validation
const globalIds = new Map();
const summary = [];

function validateWeek(rel) {
  const where0 = rel;
  let loaded;
  try { loaded = loadFile(rel); } catch (e) { err(where0, "không nạp được (cú pháp/runtime): " + e.message); return; }
  const keys = Object.keys(loaded.WEEKS);
  const fileN = +(/w(\d\d)\.js$/.exec(rel) || [])[1];
  if (keys.length !== 1) { err(where0, `phải đăng ký đúng 1 tuần, thấy ${keys.length}`); if (!keys.length) return; }
  const n = +keys[0];
  if (n !== fileN) err(where0, `tên file w${pad2(fileN)} nhưng đăng ký WEEKS[${n}]`);
  const W = loaded.WEEKS[n];
  const P = `w${pad2(n)}-`;
  const at = s => `w${pad2(n)} ${s}`;
  info(`== ${rel} (tuần ${n})`);

  // --- top-level & meta
  ["meta", "lesson", "quiz", "passages", "scripts", "mock"].forEach(k => { if (!(k in W)) err(at("top"), `thiếu khoá ${k}`); });
  if (!Array.isArray(W.passages)) err(at("top"), "passages phải là mảng");
  if (!Array.isArray(W.scripts)) err(at("top"), "scripts phải là mảng");
  const m = W.meta || {};
  if (m.week !== n) err(at("meta"), `meta.week = ${m.week}`);
  if (m.source !== "tự soạn") err(at("meta"), `meta.source phải là "tự soạn" (đang là ${JSON.stringify(m.source)})`);
  if (!SKILLS.includes(m.skill)) err(at("meta"), `meta.skill không hợp lệ: ${m.skill}`);
  if (typeof m.version !== "number") err(at("meta"), "thiếu meta.version");
  if (typeof m.reviewed !== "boolean") err(at("meta"), "thiếu meta.reviewed (boolean)");
  if (m.label && !isBi(m.label)) err(at("meta"), "meta.label phải là {vi,en}");
  if (!norm(loaded.code.slice(0, 800)).includes("tự soạn")) err(at("file"), "chú thích đầu file phải ghi rõ 'tự soạn'");
  if (COPYRIGHT_RX.test(loaded.code)) err(at("file"), "có nhắc nguồn đề/sách có bản quyền: " + loaded.code.match(COPYRIGHT_RX)[0]);

  // --- deep Bi check: mọi object có vi/en phải đủ cả hai
  (function deep(o, p) {
    if (Array.isArray(o)) return o.forEach((x, i) => deep(x, `${p}[${i}]`));
    if (o && typeof o === "object") {
      if (("vi" in o || "en" in o) && !(isStr(o.vi) && isStr(o.en))) err(at(p), "cặp {vi,en} thiếu một vế hoặc rỗng");
      for (const k in o) deep(o[k], `${p}.${k}`);
    }
  })(W, "W");

  // --- passages & scripts
  const src = {};
  const pass = {}, scr = {};
  (W.passages || []).forEach((p, i) => {
    const w = at(`passages[${i}]`);
    if (!isStr(p.id) || !p.id.startsWith(P + "p")) err(w, `id passage sai tiền tố: ${p.id}`);
    if (src[p.id]) err(w, `trùng id ${p.id}`);
    if (p.source !== "tự soạn") err(w, `${p.id}: source phải là "tự soạn"`);
    if (!isStr(p.title)) err(w, `${p.id}: thiếu title`);
    if (!Array.isArray(p.paras) || !p.paras.length) err(w, `${p.id}: thiếu paras`);
    const labels = new Set();
    (p.paras || []).forEach(pp => { if (!isStr(pp.text)) err(w, `${p.id}: đoạn rỗng`); if (pp.label) { if (labels.has(pp.label)) err(w, `${p.id}: trùng nhãn đoạn ${pp.label}`); labels.add(pp.label); } });
    const text = (p.paras || []).map(x => x.text).join(" ");
    const c = wc(text);
    if (p.words && Math.abs(c - p.words) / c > 0.1) warn(w, `${p.id}: words khai báo ${p.words}, đếm được ${c}`);
    if (CLAIM_RX.test(text)) warn(w, `${p.id}: có cụm giống số liệu/nghiên cứu thật, rà tay: "${text.match(CLAIM_RX)[0]}"`);
    src[p.id] = text; pass[p.id] = p; p._wc = c;
  });
  (W.scripts || []).forEach((s, i) => {
    const w = at(`scripts[${i}]`);
    if (!isStr(s.id) || !s.id.startsWith(P)) err(w, `id script sai tiền tố: ${s.id}`);
    if (src[s.id]) err(w, `trùng id ${s.id}`);
    if (s.source !== "tự soạn") err(w, `${s.id}: source phải là "tự soạn"`);
    if (!SCRIPT_KINDS.includes(s.kind)) err(w, `${s.id}: kind không hợp lệ ${s.kind}`);
    if (!Array.isArray(s.speakers) || !s.speakers.length) err(w, `${s.id}: thiếu speakers`);
    const sp = new Set((s.speakers || []).map(x => x.id));
    if (sp.size !== (s.speakers || []).length) err(w, `${s.id}: trùng id người nói`);
    if (!Array.isArray(s.lines) || !s.lines.length) err(w, `${s.id}: thiếu lines`);
    (s.lines || []).forEach((l, j) => { if (!sp.has(l.sp)) err(w, `${s.id}: lines[${j}] người nói '${l.sp}' không có trong speakers`); if (!isStr(l.text)) err(w, `${s.id}: lines[${j}] rỗng`); });
    if (!isStr(s.lang)) err(w, `${s.id}: thiếu lang`);
    const text = (s.lines || []).map(x => x.text).join(" ");
    if (s.kind === "listening" && CLAIM_RX.test(text)) warn(w, `${s.id}: có cụm giống số liệu/nghiên cứu thật, rà tay: "${text.match(CLAIM_RX)[0]}"`);
    src[s.id] = text; scr[s.id] = s;
  });
  for (const id of Object.keys(src)) { if (globalIds.has(id)) err(at("ids"), `id ${id} trùng với ${globalIds.get(id)}`); globalIds.set(id, rel); }

  // --- lesson
  const L = W.lesson || {};
  if (!isBi(L.title)) err(at("lesson"), "lesson.title phải là {vi,en}");
  if (!Array.isArray(L.goal) || !L.goal.length || !L.goal.every(isBi)) err(at("lesson"), "lesson.goal phải là mảng {vi,en}");
  if (!Array.isArray(L.explain) || !L.explain.length) err(at("lesson"), "thiếu lesson.explain");
  (L.explain || []).forEach((e, i) => { if (!isStr(e.vi) || !isStr(e.en)) err(at(`lesson.explain[${i}]`), "thiếu vi/en"); if (e.h && !isBi(e.h)) err(at(`lesson.explain[${i}]`), "h phải là {vi,en}"); });
  (L.table || []).forEach((t, i) => { if (!isBi(t.h)) err(at(`lesson.table[${i}]`), "h phải là {vi,en}"); (t.rows || []).forEach((r, j) => { if (!Array.isArray(r) || !r.every(isStrOrBi)) err(at(`lesson.table[${i}].rows[${j}]`), "ô phải là string hoặc {vi,en}"); }); });
  if (!Array.isArray(L.summary) || !L.summary.length || !L.summary.every(isBi)) err(at("lesson"), "lesson.summary phải là mảng {vi,en}");
  (L.mistakes || []).forEach((x, i) => { if (!isBi(x)) err(at(`lesson.mistakes[${i}]`), "phải là {vi,en}"); });
  (L.examples || []).forEach((x, i) => { if (!isBi(x.label) || !isStr(x.text) || !isBi(x.note)) err(at(`lesson.examples[${i}]`), "cần label {vi,en}, text, note {vi,en}"); });
  const vocab = L.vocab || [];
  const seenW = new Set();
  vocab.forEach((v, i) => {
    const w = at(`vocab[${i}] ${v.w}`);
    ["w", "pos", "ipa", "vi", "en", "ex", "col"].forEach(k => { if (!isStr(v[k])) err(w, `thiếu ${k}`); });
    if (isStr(v.ipa) && !/^\/[^/]+\/$/.test(v.ipa)) err(w, `IPA phải dạng /…/: ${v.ipa}`);
    if (isStr(v.pos) && !v.pos.split(/\s*,\s*/).every(p => POS.includes(p))) err(w, `pos không hợp lệ: ${v.pos}`);
    const k = norm(v.w || ""); if (seenW.has(k)) err(w, "từ vựng trùng trong tuần"); seenW.add(k);
  });
  if (vocab.length < 12 || vocab.length > 25) err(at("vocab"), `cần 12–25 mục, có ${vocab.length}`);

  // --- questions
  const ids = new Set();
  const all = [];
  function checkQ(q, ctx) {
    const { kind, sec, group } = ctx;
    const w = at(q.id || "(không id)");
    const rx = new RegExp(`^${P}${kind}\\d{2}$`);
    if (!isStr(q.id) || !rx.test(q.id)) err(w, `id phải dạng ${P}${kind}NN`);
    if (ids.has(q.id)) err(w, "trùng id trong tuần"); ids.add(q.id);
    if (!QTYPES.includes(q.type)) { err(w, `type không hợp lệ ${q.type}`); return; }
    if (!isStrOrBi(q.q)) err(w, "thiếu đề câu hỏi q");
    if (!isBi(q.why)) err(w, "thiếu why {vi,en}");
    const ref = q.ref || (group && group.ref) || (sec && sec.ref) || null;
    if (q.ref && !src[q.ref]) err(w, `ref không tồn tại: ${q.ref}`);
    if (q.data) {
      const d = q.data;
      if (d.kind !== "table" || !Array.isArray(d.head) || !Array.isArray(d.rows)) err(w, "data phải là bảng {kind:'table', head, rows}");
      else d.rows.forEach((r, j) => { if (r.length !== d.head.length) err(w, `data.rows[${j}] lệch số cột`); });
      if (!/(giả định|tự soạn|hypothetical|fictional)/i.test(txt(d.note))) err(w, "bảng số liệu phải ghi rõ 'số liệu giả định/tự soạn'");
    }
    switch (q.type) {
      case "mcq": {
        if (!Array.isArray(q.opts) || q.opts.length < 2 || !q.opts.every(isStrOrBi)) { err(w, "opts phải có ≥2 lựa chọn"); break; }
        const o = q.opts.map(x => txt(x).replace(/\s+/g, " ").trim()); // phân biệt hoa/thường (vd trọng âm TECH-no / tech-NO)
        if (new Set(o).size !== o.length) err(w, "có lựa chọn trùng nhau");
        const a = Array.isArray(q.a) ? q.a : [q.a];
        if (!a.every(x => Number.isInteger(x) && x >= 0 && x < q.opts.length)) err(w, `đáp án a=${JSON.stringify(q.a)} nằm ngoài opts`);
        if (Array.isArray(q.a) && q.pick !== q.a.length) err(w, "mcq nhiều đáp án: pick phải bằng số đáp án");
        if (!Array.isArray(q.a) && q.pick && q.pick !== 1) err(w, "pick > 1 nhưng a không phải mảng");
        break;
      }
      case "tfng": {
        const ok = q.variant === "ynng" ? ["Y", "N", "NG"] : q.variant === "tfng" ? ["T", "F", "NG"] : null;
        if (!ok) err(w, `variant phải là tfng/ynng (đang ${q.variant})`);
        else if (!ok.includes(q.a)) err(w, `đáp án ${q.a} không thuộc ${ok.join("/")}`);
        if (!ref && !q.data) err(w, "tfng cần ref passage hoặc data");
        break;
      }
      case "gap": case "short": {
        if (q.type === "gap" && !/_{3,}/.test(txt(q.q))) err(w, "gap phải có chỗ trống ___");
        if (!Array.isArray(q.accept) || !q.accept.length || !q.accept.every(isStr)) { err(w, "accept rỗng"); break; }
        const an = q.accept.map(norm);
        if (new Set(an).size !== an.length) err(w, "accept có giá trị trùng");
        const lim = q.limit;
        if (!lim || typeof lim.words !== "number") err(w, "thiếu limit.words");
        else q.accept.forEach(a => {
          const toks = a.trim().split(/\s+/);
          const numTok = t => /^[a-z]?\d[\d.:/,a-z-]*$/i.test(t) || isNumWord(t);
          const words = toks.filter(t => !(lim.number && numTok(t))).length;
          if (words > lim.words) err(w, `đáp án "${a}" vượt giới hạn ${lim.words} từ`);
          if (!lim.number && toks.some(t => /^\d/.test(t))) err(w, `đáp án "${a}" là số nhưng limit.number=false`);
          if (lim.words === 0 && !toks.every(t => numTok(t) || /^(the|a)$/i.test(t))) err(w, `limit "A NUMBER" nhưng đáp án "${a}" không phải số`);
        });
        // từ khoá phải có trong script/passage (hoặc trong hộp từ với dạng summary-box)
        if (q.tag === "summary-box") {
          const box = norm(txt(sec && sec.instructions));
          if (!q.accept.some(a => box.includes(norm(a)))) err(w, "đáp án không có trong hộp từ (instructions)");
        } else if (ref && src[ref]) {
          if (!q.accept.some(a => inSource(a, src[ref]))) err(w, `không đáp án nào xuất hiện trong ${ref}: ${JSON.stringify(q.accept)}`);
          q.accept.forEach(a => { if (!/\d/.test(a) && !inSource(a, src[ref])) warn(w, `biến thể "${a}" không có nguyên văn trong ${ref} (đáp án thay thế do người soạn quyết định – rà tay)`); });
        } else if (ref && !src[ref]) err(w, `ref không tồn tại: ${ref}`);
        break;
      }
      case "matching": {
        if (!Array.isArray(q.items) || !Array.isArray(q.options) || !Array.isArray(q.a)) { err(w, "matching cần items, options, a"); break; }
        if (q.a.length !== q.items.length) err(w, "số đáp án khác số mục");
        if (!q.a.every(x => Number.isInteger(x) && x >= 0 && x < q.options.length)) err(w, "đáp án ngoài phạm vi options");
        if (!q.reuse && new Set(q.a).size !== q.a.length) err(w, "reuse=false nhưng một lựa chọn dùng nhiều lần");
        if (typeof q.scoreEach !== "boolean") err(w, "thiếu scoreEach");
        if (new Set(q.options.map(x => norm(txt(x)))).size !== q.options.length) err(w, "options trùng nhau");
        break;
      }
      case "order": {
        if (!Array.isArray(q.items) || !Array.isArray(q.labels) || !Array.isArray(q.a)) { err(w, "order cần items, labels, a"); break; }
        if (q.a.length !== q.items.length) err(w, "số đáp án khác số mục");
        if (!q.a.every(l => q.labels.includes(l))) err(w, "đáp án không thuộc labels");
        if (q.labels.length === q.items.length && new Set(q.a).size !== q.a.length) err(w, "mỗi nhãn phải dùng đúng một lần");
        break;
      }
      case "text":
        if (!Array.isArray(q.model) || !q.model.length || !q.model.every(isStr)) err(w, "text cần model là mảng đáp án mẫu");
        break;
      case "write":
        if (!isStr(q.model)) err(w, "write cần model");
        if (!Array.isArray(q.checklist) || !q.checklist.length || !q.checklist.every(isBi)) err(w, "write cần checklist {vi,en}");
        break;
      case "essay": {
        const exp = q.task === "T1" ? { min: 150, crit: "TA,CC,LR,GRA" } : q.task === "T2" ? { min: 250, crit: "TR,CC,LR,GRA" } : null;
        if (!exp) { err(w, "essay.task phải là T1/T2"); break; }
        if (q.minWords !== exp.min) err(w, `minWords phải là ${exp.min}`);
        if (!isStr(q.model)) err(w, "thiếu bài mẫu"); else if (wc(q.model) < exp.min) err(w, `bài mẫu ${wc(q.model)} từ < ${exp.min}`);
        if ((q.criteria || []).join(",") !== exp.crit) err(w, `criteria phải là ${exp.crit}`);
        if (!Array.isArray(q.checklist) || !q.checklist.length || !q.checklist.every(isBi)) err(w, "essay cần checklist {vi,en}");
        if (q.task === "T1" && !q.data) err(w, "essay T1 cần bảng số liệu giả định (data)");
        break;
      }
      case "speak": {
        if (![1, 2, 3].includes(q.part)) err(w, "speak.part phải là 1/2/3");
        if (typeof q.talkSec !== "number" || q.talkSec <= 0) err(w, "thiếu talkSec");
        if (q.part === 2 && q.talkSec >= 60 && (q.prepSec !== 60 || q.talkSec !== 120)) err(w, "cue card Part 2: prepSec 60, talkSec 120");
        if (!Array.isArray(q.checklist) || !q.checklist.length || !q.checklist.every(isBi)) err(w, "speak cần checklist {vi,en}");
        if ((q.criteria || []).join(",") !== "FC,LR,GRA,P") err(w, "criteria phải là FC,LR,GRA,P");
        if (q.modelRef) {
          const s = scr[q.modelRef];
          if (!s) err(w, `modelRef không tồn tại: ${q.modelRef}`);
          else {
            if (s.kind !== "speaking-model") err(w, `modelRef ${q.modelRef} không phải speaking-model`);
            if (q.modelLine != null) {
              const line = s.lines[q.modelLine];
              if (!line) err(w, `modelLine ${q.modelLine} ngoài phạm vi ${q.modelRef}`);
              else if (isStr(q.model) && norm(line.text) !== norm(q.model)) err(w, `modelLine ${q.modelLine} không trỏ đúng câu trả lời mẫu`);
            }
          }
        }
        break;
      }
    }
    all.push({ q, ctx, ref });
  }

  (L.exercises || []).forEach(q => checkQ(q, { kind: "ex", where: "lesson" }));
  const ex = L.exercises || [];
  if (ex.length < 6) err(at("lesson"), `cần ≥6 bài tập, có ${ex.length}`);
  if (ex.length > 12) info(`  (lesson có ${ex.length} bài tập, nhiều hơn khung 6–12 của schema – theo PLAN)`);

  const Q = W.quiz || {};
  if (!isBi(Q.title)) err(at("quiz"), "quiz.title phải là {vi,en}");
  if (Q.note && !isBi(Q.note)) err(at("quiz"), "quiz.note phải là {vi,en}");
  if (!(Q.passPct === null || (typeof Q.passPct === "number" && Q.passPct > 0 && Q.passPct <= 100))) err(at("quiz"), "passPct phải null hoặc 1–100");
  if (n in PASS_PCT && Q.passPct !== PASS_PCT[n]) err(at("quiz"), `passPct = ${Q.passPct}, PLAN yêu cầu ${PASS_PCT[n]}`);
  const secIds = new Set();
  function checkSection(s, kind, label) {
    const w = at(`${label} ${s.id}`);
    if (!isStr(s.id) || !s.id.startsWith(P)) err(w, "id section sai tiền tố");
    if (secIds.has(s.id)) err(w, "trùng id section"); secIds.add(s.id);
    if (!SKILLS.includes(s.skill)) err(w, `skill không hợp lệ ${s.skill}`);
    if (!isBi(s.title)) err(w, "title phải là {vi,en}");
    if (!isBi(s.instructions)) err(w, "instructions phải là {vi,en}");
    if (s.ref && !src[s.ref]) err(w, `ref không tồn tại ${s.ref}`);
    (s.refs || []).forEach(r => { if (!src[r]) err(w, `refs không tồn tại ${r}`); });
    if (!Array.isArray(s.questions) || !s.questions.length) { err(w, "section không có câu hỏi"); return; }
    const order = s.questions.map(q => q.id);
    (s.groups || []).forEach(g => {
      const a = order.indexOf(g.start), b = order.indexOf(g.end);
      if (a < 0 || b < 0 || b < a) err(w, `group ${g.start}–${g.end} không khớp id câu hỏi`);
      if (g.ref && !src[g.ref]) err(w, `group ref không tồn tại ${g.ref}`);
      if (!isBi(g.instructions)) err(w, `group ${g.start} thiếu instructions {vi,en}`);
    });
    s.questions.forEach((q, i) => {
      const g = (s.groups || []).find(gr => { const a = order.indexOf(gr.start), b = order.indexOf(gr.end); return i >= a && i <= b; });
      checkQ(q, { kind, sec: s, group: g, where: label });
    });
  }
  (Q.sections || []).forEach(s => checkSection(s, "q", "quiz"));
  if (!(Q.sections || []).length) err(at("quiz"), "quiz không có section");

  // --- mock
  const M = W.mock;
  const mockPts = {};
  if (n >= 10 && !M) err(at("mock"), "tuần 10–12 phải có mock");
  if (n < 10 && M) err(at("mock"), "chỉ tuần 10–12 có mock");
  if (M) {
    if (!isBi(M.title)) err(at("mock"), "mock.title phải là {vi,en}");
    if (!M.band || M.band.estimate !== true || !isBi(M.band.label)) err(at("mock"), "mock.band cần estimate:true và label {vi,en} (band ước lượng tự soạn)");
    if (!M.timer || typeof M.timer.autoSubmit !== "boolean") err(at("mock"), "thiếu mock.timer");
    (M.sections || []).forEach(s => {
      checkSection(s, "m", "mock");
      if (typeof s.timeLimitMin !== "number") err(at(`mock ${s.id}`), "thiếu timeLimitMin");
      const p = (s.questions || []).reduce((a, q) => a + pts(q), 0);
      mockPts[s.skill] = (mockPts[s.skill] || 0) + p;
      const w = at(`mock ${s.id}`);
      if (s.skill === "listening") {
        if (p !== 40) err(w, `Listening mock phải đủ 40 điểm, có ${p}`);
        const refs = s.refs || [];
        if (refs.length !== 4) err(w, "Listening mock cần 4 script");
        refs.forEach((r, i) => { const sc = scr[r]; if (sc && sc.maxPlays !== 1) err(w, `${r}: mock phải maxPlays 1`); if (sc && sc.part !== i + 1) err(w, `${r}: part ${sc.part}, cần ${i + 1}`); });
        const per = {}; s.questions.forEach(q => { per[q.ref] = (per[q.ref] || 0) + pts(q); });
        Object.entries(per).forEach(([r, c]) => { if (c !== 10) err(w, `${r}: ${c} điểm (mỗi part cần 10)`); });
      }
      if (s.skill === "reading") {
        if (p !== 40) err(w, `Reading mock phải đủ 40 điểm, có ${p}`);
        if ((s.refs || []).length !== 3) err(w, "Reading mock cần 3 passage");
        (s.refs || []).forEach(r => { const pp = pass[r]; if (pp && (pp._wc < 650 || pp._wc > 950)) warn(w, `${r}: ${pp._wc} từ (mock nên 700–900)`); });
        if (s.timeLimitMin !== 60) err(w, "Reading mock 60 phút");
      }
      if (s.skill === "writing") {
        const t = s.questions.filter(q => q.type === "essay").map(q => q.task).sort().join(",");
        if (t !== "T1,T2") err(w, `Writing mock cần đúng 1 T1 + 1 T2 (có ${t})`);
        if (s.timeLimitMin !== 60) err(w, "Writing mock 60 phút");
      }
      if (s.skill === "speaking") {
        const parts = new Set(s.questions.filter(q => q.type === "speak").map(q => q.part));
        if (![1, 2, 3].every(x => parts.has(x))) err(w, "Speaking mock cần đủ Part 1, 2, 3");
        const sec = s.questions.reduce((a, q) => a + (q.prepSec || 0) + (q.talkSec || 0), 0) / 60;
        if (sec < 9 || sec > 15) warn(w, `tổng thời gian nói ${sec.toFixed(1)} phút (thi thật 11–14)`);
      }
    });
    const need = { 10: ["reading", "writing"], 11: ["listening", "speaking"], 12: ["listening", "reading", "writing", "speaking"] }[n] || [];
    const have = (M.sections || []).map(s => s.skill);
    need.forEach(k => { if (!have.includes(k)) err(at("mock"), `PLAN tuần ${n} cần mock ${k}`); });
    if (n === 12) (M.sections || []).forEach(s => { if (s.day !== (s.skill === "speaking" ? 2 : 1)) err(at(`mock ${s.id}`), "tuần 12: L/R/W ngày 1, Speaking ngày 2"); });
  }

  // --- quiz passages length (quiz tuần 350–600 từ)
  const quizRefs = new Set();
  (Q.sections || []).forEach(s => { if (s.ref) quizRefs.add(s.ref); s.questions.forEach(q => q.ref && quizRefs.add(q.ref)); });
  quizRefs.forEach(r => { const pp = pass[r]; if (pp && (pp._wc < 350 || pp._wc > 600)) warn(at(`quiz ${r}`), `${pp._wc} từ (quiz tuần nên 350–600)`); });
  // passage/script không được dùng
  const used = new Set();
  all.forEach(x => x.ref && used.add(x.ref));
  (W.quiz.sections || []).concat(M ? M.sections : []).forEach(s => { (s.refs || []).forEach(r => used.add(r)); if (s.ref) used.add(s.ref); (s.groups || []).forEach(g => g.ref && used.add(g.ref)); });
  all.forEach(x => x.q.modelRef && used.add(x.q.modelRef));
  Object.keys(src).forEach(id => { if (!used.has(id)) info(`  (lưu ý: ${id} không được câu/section nào tham chiếu – dùng trực tiếp trong bài học/luyện nghe)`); });

  // --- số lượng theo lộ trình (PLAN)
  const quizQs = (Q.sections || []).flatMap(s => s.questions);
  const lessonQs = ex;
  const autoPts = quizQs.reduce((a, q) => a + pts(q), 0);
  const tagCount = (qs, tags) => qs.filter(q => tags.includes(q.tag)).length;
  const speak = (qs, part) => qs.filter(q => q.type === "speak" && q.part === part);
  const listenSecs = (Q.sections || []).filter(s => s.skill === "listening");
  const quizPassages = new Set((Q.sections || []).filter(s => s.skill === "reading").map(s => s.ref));
  const need = (cond, msg) => { if (!cond) err(at("PLAN"), msg); };
  switch (n) {
    case 1:
      need(tagCount(lessonQs, GRAMMAR_TAGS) >= 30, `PLAN: 30 câu ngữ pháp luyện tập (có ${tagCount(lessonQs, GRAMMAR_TAGS)})`);
      { const c = quizQs.filter(q => !["write", "essay", "speak"].includes(q.type)).length;
        need(c >= 18 && c <= 22, `PLAN: test đầu vào ~20 câu (có ${c})`); }
      need(quizQs.some(q => q.type === "write"), "PLAN: 1 đoạn viết 100 từ");
      break;
    case 3:
      need(quizPassages.size === 2, "PLAN: 2 passage");
      (Q.sections || []).forEach(s => need(s.questions.reduce((a, q) => a + pts(q), 0) === 13, `PLAN: ${s.ref} cần 13 câu`));
      break;
    case 4:
      need(listenSecs.length >= 2, "PLAN: 2 bài Listening");
      need(speak(quizQs, 1).length >= 10, `PLAN: 10 câu Speaking Part 1 (có ${speak(quizQs, 1).length})`);
      break;
    case 5:
      need(quizQs.some(q => q.type === "essay" && q.task === "T2"), "PLAN: 1 bài T2 250+ từ");
      need(quizQs.some(q => q.type === "write" && q.tag === "rewrite-7.5"), "PLAN: viết lại 1 đoạn đạt 7.5");
      break;
    case 6:
      need(vocab.length >= 25, `PLAN: 25 từ Environment/Health (có ${vocab.length})`);
      need(quizPassages.size === 2, "PLAN: 2 passage");
      break;
    case 7: {
      need(listenSecs.length >= 2, "PLAN: 2 bài Listening");
      const cards = speak(quizQs, 2).filter(q => q.prepSec === 60 && q.talkSec === 120).length;
      need(cards >= 5, `PLAN: 5 cue card × 2 phút (có ${cards})`);
      break;
    }
    case 8: {
      const t1 = lessonQs.concat(quizQs).filter(q => q.type === "essay" && q.task === "T1").length;
      need(t1 >= 2, `PLAN: 2 bài T1 150+ từ (có ${t1})`);
      const g = tagCount(lessonQs.concat(quizQs), GRAMMAR_TAGS);
      need(g >= 30, `PLAN: 30 câu ngữ pháp (có ${g})`);
      break;
    }
    case 9: {
      const p3 = new Set(speak(lessonQs.concat(quizQs), 3).map(q => norm(q.q)));
      Object.values(scr).filter(s => s.kind === "speaking-prompt" && s.part === 3).forEach(s => s.lines.forEach(l => p3.add(norm(l.text))));
      need(p3.size >= 15, `PLAN: 15 câu Part 3 (có ${p3.size})`);
      need(Object.values(scr).some(s => s.kind === "speaking-model" && s.part === 3), "PLAN: script mẫu Part 3 để shadowing");
      break;
    }
  }

  // --- tổng kết tuần
  const row = {
    week: n, vocab: vocab.length, ex: ex.length, quizQ: quizQs.length, quizPts: autoPts,
    passages: (W.passages || []).length, scripts: (W.scripts || []).length,
    mock: M ? Object.entries(mockPts).map(([k, v]) => `${k[0].toUpperCase()}${v ? ":" + v : ""}`).join(" ") : "-",
    passPct: Q.passPct
  };
  summary.push(row);
}

// ---------------------------------------------------------------- Bài 01 (tuần 2, dữ liệu cũ – chỉ đọc)
function validateLegacy() {
  const at = s => `w02(Bài 01) ${s}`;
  info("== data.js + data-en.js (Bài 01 = tuần 2, chỉ kiểm tra, không sửa)");
  let G;
  try {
    const ctx = { window: {} }; vm.createContext(ctx);
    ["data.js", "data-en.js"].forEach(f => vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), ctx, { filename: f }));
    G = ctx.window;
  } catch (e) { err(at("load"), e.message); return; }
  const { PLAN: PL, PLAN_EN, LESSON: LS, LESSON_EN: LE, QUIZ: QZ, QUIZ_EN: QE } = G;
  if (!PL || !PLAN_EN) err(at("PLAN"), "thiếu PLAN/PLAN_EN");
  else {
    if (PL.weeks.length !== 12) err(at("PLAN"), "PLAN phải có 12 tuần");
    if (!PLAN_EN.weeks || PLAN_EN.weeks.length !== PL.weeks.length) err(at("PLAN_EN"), "PLAN_EN.weeks lệch số tuần với PLAN");
    else PL.weeks.forEach((w, i) => { const e = PLAN_EN.weeks[i]; ["focus", "learn", "tasks", "check"].forEach(k => { if (w[k] && !(e && isStr(e[k]))) err(at(`PLAN_EN tuần ${w.w}`), `thiếu bản EN của ${k}`); }); });
  }
  if (!LS || !LE) { err(at("LESSON"), "thiếu LESSON/LESSON_EN"); return; }
  const pairs = [["goal", "goal"], ["vocab", "meanings"], ["teel", "teel"], ["mistakes", "mistakes"], ["summary", "summary"]];
  pairs.forEach(([a, b]) => { if (!Array.isArray(LE[b]) || LE[b].length !== LS[a].length) err(at(`LESSON_EN.${b}`), `số mục EN (${(LE[b] || []).length}) khác VI (${LS[a].length})`); });
  ["title", "lowNote", "highNote"].forEach(k => { if (!isStr(LE[k])) err(at("LESSON_EN"), `thiếu ${k}`); });
  if (PL && PL.weeks[1] && /20 từ/.test(PL.weeks[1].learn) && LS.vocab.length < 20)
    warn(at("PLAN"), `PLAN tuần 2 ghi "20 từ Education/Technology" nhưng Bài 01 có ${LS.vocab.length} từ (dữ liệu cũ, không sửa trong task này – báo Planning)`);
  if (!Array.isArray(QZ) || QZ.length !== 14) err(at("QUIZ"), `PLAN: 14 câu Bài 01 (có ${(QZ || []).length})`);
  const hasVi = s => /[ăâđêôơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]/i.test(s);
  (QZ || []).forEach(q => {
    const w = at(`QUIZ ${q.id}`), e = QE && QE[q.id];
    if (!isStr(q.why)) err(w, "thiếu why (vi)");
    if (!e || !isStr(e.why)) err(w, "thiếu why bản EN");
    if (hasVi(q.q) && !(e && isStr(e.q))) err(w, "đề có tiếng Việt nhưng thiếu q bản EN");
    if (q.model && hasVi(q.model) && !(e && isStr(e.model))) err(w, "model có tiếng Việt nhưng thiếu bản EN");
    if (q.checklist && !(e && Array.isArray(e.checklist) && e.checklist.length === q.checklist.length)) err(w, "checklist EN lệch số mục");
    if (q.type === "mcq" && !(Number.isInteger(q.a) && q.a >= 0 && q.a < q.opts.length)) err(w, "đáp án ngoài opts");
    if (q.type === "order" && (!Array.isArray(q.roles) || q.roles.length !== q.items.length)) err(w, "order: roles lệch items");
  });
}

// ---------------------------------------------------------------- run
for (const f of files) { validateWeek(f); flush(); }
if (ALL) {
  validateLegacy(); flush();
  const have = new Set(summary.map(r => r.week));
  [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach(w => { if (!have.has(w)) err("weeks", `thiếu file tuần ${w}`); });
  flush();
}
if (!QUIET && summary.length) {
  console.log("\nTuần | vocab | bài tập | câu quiz | điểm tự chấm quiz | passage | script | mock (điểm) | passPct");
  summary.forEach(r => console.log(`${String(r.week).padStart(4)} | ${String(r.vocab).padStart(5)} | ${String(r.ex).padStart(7)} | ${String(r.quizQ).padStart(8)} | ${String(r.quizPts).padStart(17)} | ${String(r.passages).padStart(7)} | ${String(r.scripts).padStart(6)} | ${r.mock.padEnd(11)} | ${r.passPct}`));
}
console.log(`\n${nErr ? "FAILED" : "OK"} – ${nErr} lỗi, ${nWarn} cảnh báo (${files.length} file tuần${ALL ? " + Bài 01" : ""}).`);
process.exit(nErr ? 1 : 0);
