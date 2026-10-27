(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const nl = s => esc(s).replace(/\n/g, "<br>");
  const KEY = "ieltscoach.v1";
  let st = { weeks: {}, known: {}, quiz: {}, tab: "plan", lang: "vi", sel: 0, wk: {}, qv: {} };
  try { st = Object.assign(st, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) {}
  ["weeks", "known", "quiz", "wk", "qv"].forEach(k => { if (!st[k] || typeof st[k] !== "object") st[k] = {}; });
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  const view = $("#view");
  const EN = () => st.lang === "en";

  const UI = {
    vi: { sub: "Mục tiêu band 7.5 · tự học 12 tuần", tabs: { plan: "Lộ trình", lesson: "Bài học", cards: "Từ vựng", quiz: "Luyện tập", video: "Video" }, foot: "Nội dung là bài luyện tự soạn, không phải đề thi thật và không đảm bảo kết quả. Tiến độ lưu trên trình duyệt của bạn.", weeksDone: "Tuần hoàn thành", hours: "Phân bổ 10 giờ/tuần", week: "Tuần", learn: "Học", tasks: "Bài tập", check: "Tự kiểm tra", openL: "Mở bài", goal: "Mục tiêu", teel: "Cấu trúc đoạn thân bài (TEEL)", mist: "Lỗi người Việt hay mắc", prompt: "Đề luyện (tự soạn)", listen: "Nghe", sum: "Tóm tắt", learnV: "Học từ vựng", doQ: "Làm bài tập", card: "Thẻ", known: "đã nhớ", tap: "Chạm để xem nghĩa", colloc: "Collocation", hear: "Nghe từ", hearEx: "Nghe câu", mark: "Đã nhớ", unmark: "Bỏ đánh dấu", qTitle: "Bài tập Bài 01", qHint: "Câu 1–6, 10, 11 tự chấm. Câu 7–9, 12–14 tự viết rồi so với đáp án mẫu (đáp án khác vẫn đúng nếu đạt ý).", chk: "Kiểm tra", ans: "Xem đáp án", pick: "Hãy chọn một đáp án.", right: "Đúng. ", wrong: "Chưa đúng. ", model: "Đáp án mẫu: ", reset: "Làm lại", fixPh: "Câu đã sửa...", writePh: "Viết câu trả lời...", role: "— vai trò —", words: "từ (mục tiêu 110–140)", auto: "câu tự chấm đúng", scene: "cảnh", vidHint: "Xem thử kịch bản. Bản video MP4 sẽ do whiteboard-video-agent dựng sau khi bạn duyệt kịch bản.", fig: "Hình", say: "Lời đọc", voice: "Giọng", pause: "nghỉ", play: "Phát", stop: "Dừng", unit: "giờ", title: "Bài 01 – Writing Task 2: Đoạn thân bài (TEEL)",
      openQ: "Làm kiểm tra", noContent: "Tuần này chưa có nội dung trong app.", vidLocal: "Video whiteboard (giọng máy, tự soạn).", vidMissing: "Chưa có file video trên thiết bị này. Video chỉ lưu trên máy, không đưa lên GitHub.", selfW: "Tự soạn – không phải đề thi thật", explain: "Giải thích", vocabT: "Từ vựng", examples: "Ví dụ", exT: "Bài tập trong bài", weekQuiz: "Kiểm tra tuần", mock: "Mock", min: "phút", qHintGen: "Câu trắc nghiệm, TRUE/FALSE/NOT GIVEN, điền từ, trả lời ngắn, nối và sắp xếp được chấm tự động. Câu viết/nói: tự so với đáp án mẫu và checklist.", passAt: "Ngưỡng đạt", autoPts: "điểm tự chấm", chkAll: "Chấm toàn bộ", accept: "Đáp án chấp nhận: ", correctIs: "Đáp án đúng: ", over: "Vượt giới hạn số từ. ", pickN: "Hãy chọn {n} đáp án.", choose: "— chọn —", plays: "Đã phát", showTr: "Hiện script", hideTr: "Ẩn script", trLocked: "Script hiện sau khi nộp bài.", noTTS: "Trình duyệt này không hỗ trợ đọc giọng nói.", hearQ: "Nghe câu hỏi", timerBtn: "Bấm giờ", prep: "Chuẩn bị", talk: "Nói", timeUp: "Hết giờ", crit: "Tự chấm band", bandSelf: "Band tự ước lượng", modelS: "Câu trả lời mẫu", mockInfo: "Đồng hồ chạy ngay khi bấm Bắt đầu và không tạm dừng được; hết giờ bài tự nộp. Câu trả lời được lưu trên trình duyệt, tải lại trang không đặt lại đồng hồ. Trong mock, bài nghe chỉ phát 1 lần.", start: "Bắt đầu", left: "Còn lại", warnLeft: "Còn {m} phút.", submit: "Nộp bài", confirmSubmit: "Nộp bài ngay? Sau khi nộp không sửa được.", autoSub: "Hết giờ – bài đã tự nộp.", submitted: "Đã nộp", result: "Kết quả", correctN: "đúng", bandEst: "Band ước lượng", bandNote: "Band ước lượng (tự soạn), không phải điểm chính thức.", scaled: "quy đổi tỷ lệ", redo: "Làm lại mock", confirmRedo: "Xoá kết quả mock này và làm lại?", board: "Bảng điểm theo tuần", colEx: "Bài tập", colQuiz: "Kiểm tra", colBest: "Cao nhất", colPass: "Ngưỡng", colMock: "Mock", passed: "Đạt", notYet: "Chưa đạt", passage: "Bài đọc", lst: "Bài nghe", part: "Phần", glossary: "Chú giải", dataT: "Dữ liệu", wordsN: "từ", minW: "tối thiểu", noBoard: "Chưa có tuần nào có nội dung.",
      skills: { reading: "Reading", listening: "Listening", writing: "Writing", speaking: "Speaking", grammar: "Ngữ pháp", mixed: "Tổng hợp" },
      lim: { one: "ONE WORD ONLY", n: "NO MORE THAN {n} WORDS", num: "A NUMBER", oneNum: "ONE WORD AND/OR A NUMBER", nNum: "NO MORE THAN {n} WORDS AND/OR A NUMBER" },
      tf: { T: "TRUE", F: "FALSE", NG: "NOT GIVEN", Y: "YES", N: "NO" } },
    en: { sub: "Target band 7.5 · 12-week self-study", tabs: { plan: "Plan", lesson: "Lesson", cards: "Vocabulary", quiz: "Practice", video: "Video" }, foot: "Content is self-written practice material, not a real exam, and does not guarantee a result. Progress is saved in your browser.", weeksDone: "Weeks completed", hours: "10 hours a week", week: "Week", learn: "Study", tasks: "Exercises", check: "Self-check", openL: "Open lesson", goal: "Goals", teel: "Body paragraph structure (TEEL)", mist: "Common mistakes of Vietnamese learners", prompt: "Practice question (self-written)", listen: "Listen", sum: "Summary", learnV: "Study vocabulary", doQ: "Do the exercises", card: "Card", known: "known", tap: "Tap to see the meaning", colloc: "Collocation", hear: "Hear word", hearEx: "Hear sentence", mark: "I know it", unmark: "Unmark", qTitle: "Lesson 01 exercises", qHint: "Questions 1–6, 10, 11 are auto-marked. For 7–9 and 12–14, write your answer and compare with the model (other answers are fine if they make the same point).", chk: "Check", ans: "Show answer", pick: "Please choose an answer.", right: "Correct. ", wrong: "Not quite. ", model: "Model answer: ", reset: "Start over", fixPh: "Corrected sentence...", writePh: "Write your answer...", role: "— role —", words: "words (target 110–140)", auto: "auto-marked correct", scene: "scene", vidHint: "Script preview. The MP4 video will be built by whiteboard-video-agent after you approve the script.", fig: "Picture", say: "Voice-over", voice: "Voice", pause: "pause", play: "Play", stop: "Stop", unit: "h", title: "Lesson 01 – Writing Task 2: Body paragraph (TEEL)",
      openQ: "Take the test", noContent: "This week has no content in the app yet.", vidLocal: "Whiteboard video (synthetic voice, self-written).", vidMissing: "The video file is not on this device. Videos are kept local and not published to GitHub.", selfW: "Self-written – not a real exam", explain: "Explanation", vocabT: "Vocabulary", examples: "Examples", exT: "Lesson exercises", weekQuiz: "Weekly test", mock: "Mock", min: "min", qHintGen: "Multiple choice, TRUE/FALSE/NOT GIVEN, gap fill, short answer, matching and ordering are auto-marked. Writing/speaking: compare with the model answer and checklist yourself.", passAt: "Pass mark", autoPts: "auto-marked points", chkAll: "Mark all", accept: "Accepted answers: ", correctIs: "Correct answer: ", over: "Over the word limit. ", pickN: "Please choose {n} answers.", choose: "— choose —", plays: "Played", showTr: "Show transcript", hideTr: "Hide transcript", trLocked: "The transcript is available after you submit.", noTTS: "This browser does not support speech synthesis.", hearQ: "Hear the question", timerBtn: "Start timer", prep: "Preparation", talk: "Speaking", timeUp: "Time's up", crit: "Self-assessed band", bandSelf: "Self-estimated band", modelS: "Model answer", mockInfo: "The timer starts as soon as you press Start and cannot be paused; your answers are submitted automatically when time runs out. Answers are saved in your browser, and reloading the page does not reset the timer. In a mock, each recording plays only once.", start: "Start", left: "Time left", warnLeft: "{m} minutes left.", submit: "Submit", confirmSubmit: "Submit now? You cannot change your answers afterwards.", autoSub: "Time's up – submitted automatically.", submitted: "Submitted", result: "Result", correctN: "correct", bandEst: "Estimated band", bandNote: "Estimated band (self-written), not an official score.", scaled: "scaled", redo: "Redo mock", confirmRedo: "Delete this mock result and start again?", board: "Scores by week", colEx: "Exercises", colQuiz: "Test", colBest: "Best", colPass: "Pass mark", colMock: "Mock", passed: "Passed", notYet: "Not yet", passage: "Reading passage", lst: "Listening", part: "Part", glossary: "Glossary", dataT: "Data", wordsN: "words", minW: "minimum", noBoard: "No week has content yet.",
      skills: { reading: "Reading", listening: "Listening", writing: "Writing", speaking: "Speaking", grammar: "Grammar", mixed: "Mixed" },
      lim: { one: "ONE WORD ONLY", n: "NO MORE THAN {n} WORDS", num: "A NUMBER", oneNum: "ONE WORD AND/OR A NUMBER", nNum: "NO MORE THAN {n} WORDS AND/OR A NUMBER" },
      tf: { T: "TRUE", F: "FALSE", NG: "NOT GIVEN", Y: "YES", N: "NO" } }
  };
  const T = () => UI[st.lang];
  // Chuỗi song ngữ: string giữ nguyên, {vi,en} lấy theo ngôn ngữ đang chọn
  const tx = x => x == null ? "" : (typeof x === "object" ? (x[st.lang] != null ? x[st.lang] : (x.vi != null ? x.vi : (x.en || ""))) : String(x));
  const bi = (vi, en) => ({ vi, en: en == null ? vi : en });
  const fmt = (s, o) => String(s).replace(/\{(\w+)\}/g, (_, k) => o[k]);

  // Dữ liệu theo ngôn ngữ (EN ghi đè phần tiếng Việt)
  const plan = () => {
    const P = window.PLAN;
    if (!EN()) return P;
    const E = window.PLAN_EN;
    return { note: E.note, hours: P.hours.map((h, i) => [E.hours[i], h[1]]), weeks: P.weeks.map((w, i) => Object.assign({}, w, E.weeks[i])) };
  };
  const scenes = () => {
    const D = window.SCENES;
    if (!EN()) return D;
    return Object.assign({}, D, { title: UI.en.title, scenes: D.scenes.map(s => { const e = window.SCENES_EN[s.id] || {}; return Object.assign({}, s, { text_display: e.text || s.text_display, voice_text: e.voice || s.voice_text, voice_lang: "en-US" }); }) });
  };

  // ---------- Dữ liệu tuần ----------
  // Tuần 2 (Bài 01): nếu chưa có weeks/w02.js thì dựng tại chỗ từ LESSON/QUIZ cũ (không sửa data.js).
  let legacyCache = null;
  function legacyWeek2() {
    if (legacyCache) return legacyCache;
    const L = window.LESSON, Q = window.QUIZ;
    if (!L || !Q) return null;
    const LE = window.LESSON_EN || {}, QE = window.QUIZ_EN || {};
    const zip = (a, b) => (a || []).map((x, i) => bi(x, b && b[i]));
    legacyCache = {
      meta: { week: 2, skill: "writing", source: "tự soạn", legacy: true },
      lesson: {
        title: bi(L.title, LE.title), goal: zip(L.goal, LE.goal),
        table: [{ h: bi(UI.vi.teel, UI.en.teel), rows: L.teel.map((r, i) => [r[0], bi(r[1], LE.teel && LE.teel[i] && LE.teel[i][1])]) }],
        mistakes: zip(L.mistakes, LE.mistakes),
        prompt: L.prompt,
        examples: [
          { label: "Band ~5.5", cls: "low", text: L.low.text, note: bi(L.low.note, LE.lowNote) },
          { label: "Band ~7.5", cls: "high", text: L.high.text, note: bi(L.high.note, LE.highNote), speak: true }
        ],
        vocab: L.vocab.map((v, i) => ({ w: v[0], ipa: v[1], vi: v[2], en: (LE.meanings || [])[i] || v[2], ex: v[3], col: v[4] })),
        summary: zip(L.summary, LE.summary)
      },
      quiz: {
        title: bi(UI.vi.qTitle, UI.en.qTitle), hint: bi(UI.vi.qHint, UI.en.qHint),
        sections: [{ id: "w02-s1", questions: Q.map(q => {
          const e = QE[q.id] || {};
          const o = { id: q.id, type: q.type, q: bi(q.q, e.q), why: bi(q.why, e.why) };
          if (q.opts) { o.opts = q.opts; o.a = q.a; }
          if (q.type === "order") { o.items = q.items; o.labels = ["Topic", "Explanation", "Example", "Link"]; o.a = q.roles; o.scoreEach = false; }
          if (q.model) o.model = bi(q.model, e.model);
          if (q.checklist) o.checklist = zip(q.checklist, e.checklist);
          if (q.type === "essay") o.wordHint = bi(UI.vi.words, UI.en.words);
          return o;
        }) }]
      }
    };
    return legacyCache;
  }
  const getWeek = n => { const W = window.WEEKS || {}; return W[n] || (+n === 2 ? legacyWeek2() : null); };
  const hasWeek = n => { const W = getWeek(n); return !!(W && (W.lesson || W.quiz || W.mock)); };
  const isLegacy = W => !!(W && W.meta && W.meta.legacy);
  const wk = n => { const k = String(n); const o = st.wk[k] || (st.wk[k] = {}); ["ex", "quiz", "self", "known", "mock"].forEach(f => { if (!o[f] || typeof o[f] !== "object") o[f] = {}; }); return o; };

  // Chuyển dữ liệu cũ (st.quiz, st.known của Bài 01) sang st.wk[2] một lần; giữ nguyên bản cũ.
  if (!st.mig) {
    const w2 = wk(2);
    Object.keys(st.quiz).forEach(k => { if (w2.quiz[k] === undefined) w2.quiz[k] = st.quiz[k]; });
    if (window.LESSON) window.LESSON.vocab.forEach((v, i) => { if (st.known[i]) w2.known[v[0]] = true; });
    st.mig = 1; save();
  }
  if (!hasWeek(st.sel)) { let f = 0; for (let i = 1; i <= 12; i++) if (hasWeek(i)) { f = i; break; } st.sel = f; }

  // ---------- Giọng đọc ----------
  let playTok = 0;
  function speak(text, lang, onend) {
    if (!("speechSynthesis" in window)) { onend && onend(); return; }
    speechSynthesis.cancel(); playTok++;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang || "en-US";
    u.rate = lang === "vi-VN" ? 1 : 0.92;
    if (onend) { u.onend = onend; u.onerror = onend; }
    speechSynthesis.speak(u);
  }
  function playScript(s, done) {
    if (!("speechSynthesis" in window)) { done && done(false); return; }
    speechSynthesis.cancel();
    const tok = ++playTok, lang = s.lang || "en-GB", sp = s.speakers || [];
    const all = speechSynthesis.getVoices().filter(v => /^en/i.test(v.lang));
    const exact = all.filter(v => v.lang.replace("_", "-").toLowerCase() === lang.toLowerCase());
    const pool = exact.length ? exact : all;
    let i = 0;
    const next = () => {
      if (tok !== playTok) return;
      if (i >= (s.lines || []).length) { done && done(true); return; }
      const L = s.lines[i++], u = new SpeechSynthesisUtterance(L.text);
      u.lang = lang; u.rate = s.rate || 0.95;
      const k = sp.findIndex(x => x.id === L.sp);
      if (pool.length) u.voice = pool[Math.max(0, k) % pool.length];
      u.onend = u.onerror = () => { if (tok === playTok) setTimeout(next, s.pauseMs == null ? 600 : s.pauseMs); };
      speechSynthesis.speak(u);
    };
    next();
  }

  function overall() {
    const done = Object.values(st.weeks).filter(Boolean).length;
    $("#overall").innerHTML = `${esc(T().weeksDone)}: <b>${done}/12</b><div class="bar"><i style="width:${done / 12 * 100}%"></i></div>`;
  }

  // ---------- Bộ chọn tuần ----------
  function weekBar() {
    const t = T();
    let h = `<div class="wkbar" role="group" aria-label="${esc(t.week)}">`;
    for (let n = 1; n <= 12; n++) h += `<button class="wk${n === +st.sel ? " on" : ""}" data-wk="${n}" ${hasWeek(n) ? "" : `disabled title="${esc(t.noContent)}"`} aria-pressed="${n === +st.sel}">${esc(t.week)} ${n}</button>`;
    return h + `</div>`;
  }
  function bindBar(render) {
    view.querySelectorAll("[data-wk]").forEach(b => b.onclick = () => { stop(); st.sel = +b.dataset.wk; ci = 0; flipped = false; save(); render(); window.scrollTo(0, 0); });
  }
  function emptyWeek() {
    const t = T(), w = (plan().weeks || []).find(x => x.w === +st.sel);
    return `<div class="card"><h3>${w ? `${esc(t.week)} ${w.w}: ${esc(w.focus)}` : ""}</h3><p>${esc(t.noContent)}</p></div>`;
  }
  const selfTag = W => isLegacy(W) ? "" : `<p class="selfw">${esc(T().selfW)}</p>`;

  // ---------- Lộ trình ----------
  function renderPlan() {
    const P = plan(), t = T();
    view.innerHTML = `<div class="note">${esc(P.note)}</div>
    <div class="card"><h3>${esc(t.hours)}</h3><table>${P.hours.map(h => `<tr><td>${esc(h[0])}</td><td>${h[1]} ${esc(t.unit)}</td></tr>`).join("")}</table></div>
    ${P.weeks.map(w => { const W = hasWeek(w.w) ? getWeek(w.w) : null; return `<div class="card week ${st.weeks[w.w] ? "done" : ""}">
      <input type="checkbox" data-w="${w.w}" ${st.weeks[w.w] ? "checked" : ""} aria-label="${esc(t.week)} ${w.w}">
      <div><h3>${esc(t.week)} ${w.w}: ${esc(w.focus)}<span class="badge">${esc(w.phase)}</span></h3>
      <p><b>${esc(t.learn)}:</b> ${esc(w.learn)}</p><p><b>${esc(t.tasks)}:</b> ${esc(w.tasks)}</p><p><b>${esc(t.check)}:</b> ${esc(w.check)}</p>
      ${W ? `<div class="ctl">${W.lesson ? `<button class="btn ghost" data-open="${w.w}" data-to="lesson">${esc(t.openL)}</button>` : ""}${W.quiz || W.mock ? `<button class="btn ghost" data-open="${w.w}" data-to="quiz">${esc(t.openQ)}</button>` : ""}</div>` : ""}</div></div>`; }).join("")}`;
    view.querySelectorAll("input[data-w]").forEach(i => i.onchange = () => { st.weeks[i.dataset.w] = i.checked; save(); overall(); renderPlan(); });
    view.querySelectorAll("[data-open]").forEach(b => b.onclick = () => { st.sel = +b.dataset.open; ci = 0; flipped = false; go(b.dataset.to); });
  }

  // ---------- Câu hỏi: hiển thị, thu thập, chấm ----------
  const AUTO = ["mcq", "tfng", "gap", "short", "matching", "order"];
  const isAuto = q => AUTO.includes(q.type);
  const scoreEach = q => q.scoreEach != null ? !!q.scoreEach : !q.roles;
  const orderKey = q => q.a || q.roles || [];
  const blanks = q => q.gaps || [{ accept: q.accept, limit: q.limit }];
  const maxOf = q => q.type === "mcq" ? (Array.isArray(q.a) ? q.a.length : 1)
    : q.type === "gap" || q.type === "short" ? blanks(q).length
    : (q.type === "matching" || q.type === "order") ? (scoreEach(q) ? (q.items || []).length : 1) : 1;
  const norm = s => String(s == null ? "" : s).replace(/[‘’]/g, "'").replace(/[“”]/g, '"').toLowerCase().replace(/\s+/g, " ").trim().replace(/^[\s.,;:!?"()]+|[\s.,;:!?"()]+$/g, "");
  const tokens = s => norm(s).split(" ").filter(Boolean);
  function overLimit(s, lim) {
    if (!lim || !lim.words) return false;
    const tk = tokens(s).filter(w => !(lim.number && /^[\d.,:/-]+$/.test(w)));
    return tk.length > lim.words;
  }
  function limText(lim) {
    if (!lim) return "";
    const L = T().lim, n = lim.words || 0;
    if (!n) return lim.number ? L.num : "";
    if (n === 1) return lim.number ? L.oneNum : L.one;
    return fmt(lim.number ? L.nNum : L.n, { n });
  }
  const modelText = m => Array.isArray(m) ? m.map(tx).join(" / ") : tx(m);

  function findRef(W, id) {
    const p = (W.passages || []).find(x => x.id === id); if (p) return { kind: "p", o: p };
    const s = (W.scripts || []).find(x => x.id === id); if (s) return { kind: "s", o: s };
    return null;
  }
  function passageHtml(p) {
    const t = T();
    return `<div class="card passage"><div class="small">${esc(t.passage)} · ${esc(t.selfW)}</div><h3>${esc(tx(p.title))}</h3>
      ${(p.paras || []).map(x => `<p>${x.label ? `<b class="plabel">${esc(x.label)}</b> ` : ""}${nl(x.text)}</p>`).join("")}
      ${p.glossary && p.glossary.length ? `<div class="small"><b>${esc(t.glossary)}:</b> ${p.glossary.map(g => `${esc(g.w)} – ${esc(tx({ vi: g.vi, en: g.en }))}`).join("; ")}</div>` : ""}</div>`;
  }
  function scriptHtml(s, ctx, isModel) {
    const t = T(), lim = scriptLimit(s, ctx), plays = ctx.plays[s.id] || 0;
    const sp = {}; (s.speakers || []).forEach(x => sp[x.id] = x.name);
    const trOk = !(ctx.mock && !ctx.locked);
    const label = isModel ? t.modelS : (s.kind === "listening" ? t.lst : t.skills.speaking);
    return `<div class="card script" data-sid="${esc(s.id)}"><div class="small">${esc(label)}${s.part ? ` · ${esc(t.part)} ${esc(s.part)}` : ""}${s.title ? ` · ${esc(tx(s.title))}` : ""}</div>
      <div class="ctl"><button class="btn" data-sact="play" ${lim != null && plays >= lim ? "disabled" : ""}>${esc(t.play)}</button><button class="btn ghost" data-sact="stop">${esc(t.stop)}</button>
      ${trOk ? `<button class="btn ghost" data-sact="tr">${esc(s.transcript === "shown" ? t.hideTr : t.showTr)}</button>` : `<span class="small">${esc(t.trLocked)}</span>`}
      <span class="small" data-plays>${lim != null ? `${esc(t.plays)} ${plays}/${lim}` : ""}</span></div>
      <div class="transcript" ${trOk && s.transcript === "shown" ? "" : "hidden"}>${(s.lines || []).map(l => `<div>${sp[l.sp] ? `<b>${esc(sp[l.sp])}:</b> ` : ""}${esc(l.text)}</div>`).join("")}</div></div>`;
  }
  function scriptLimit(s, ctx) {
    if (!ctx.mock) return null;
    const sec = ctx.sec || {};
    if (sec.maxPlays !== undefined) return sec.maxPlays;
    if (s.maxPlays != null) return s.maxPlays;
    return s.kind === "listening" ? 1 : null;
  }
  function matHtml(W, id, ctx) {
    if (!id || ctx.shown.has(id)) return "";
    ctx.shown.add(id);
    const r = findRef(W, id);
    if (!r) return "";
    return r.kind === "p" ? passageHtml(r.o) : scriptHtml(r.o, ctx, false);
  }
  function dataHtml(d) {
    if (!d) return "";
    const t = T();
    return `<div class="data"><div class="small"><b>${esc(t.dataT)}</b>${d.note ? ` – ${esc(tx(d.note))}` : ""}</div>
      ${d.head || d.rows ? `<table>${d.head ? `<tr>${d.head.map(c => `<th>${esc(tx(c))}</th>`).join("")}</tr>` : ""}${(d.rows || []).map(r => `<tr>${r.map(c => `<td>${esc(tx(c))}</td>`).join("")}</tr>`).join("")}</table>` : ""}</div>`;
  }
  function selfHtml(q) {
    const t = T();
    let h = (q.checklist || []).map((c, i) => `<label><input type="checkbox" data-chk="${i}"> ${esc(tx(c))}</label>`).join("");
    if (q.criteria && q.criteria.length) {
      const opts = [""].concat([4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9]);
      h += `<div class="crit"><span class="small">${esc(t.crit)}:</span> ${q.criteria.map(c => `<label class="inl">${esc(c)} <select data-crit="${esc(c)}">${opts.map(o => `<option value="${o}">${o === "" ? "–" : o}</option>`).join("")}</select></label>`).join("")} <span class="small" data-bself></span></div>`;
    }
    return h;
  }

  function qHtml(q, ctx) {
    const t = T(), k = ctx.qs.length, legacy = isLegacy(ctx.W);
    ctx.qs.push(q);
    const num = legacy ? q.id : k + 1, nm = `${ctx.pre}${k}`;
    const qt = tx(q.q);
    let h = `<div class="q" data-k="${k}">`;
    const head = `<b>${esc(num)}.</b> `;
    if (q.type === "gap") {
      const B = blanks(q), parts = esc(qt).split("___");
      let body = "";
      if (parts.length > 1) parts.forEach((p, i) => { body += p.replace(/\n/g, "<br>"); if (i < parts.length - 1) body += i < B.length ? `<input type="text" class="gapin" data-g="${i}" aria-label="${i + 1}">` : "___"; });
      else body = nl(qt);
      h += head + body;
      if (parts.length - 1 < B.length) for (let i = Math.max(0, parts.length - 1); i < B.length; i++) h += `<input type="text" data-g="${i}">`;
      const lt = limText(q.limit || B[0].limit);
      if (lt) h += `<div class="small lim">${esc(lt)}</div>`;
    } else {
      h += head + nl(qt);
      if (q.type === "mcq") {
        const multi = Array.isArray(q.a);
        if (multi) h += `<div class="small">${esc(fmt(t.pickN, { n: q.pick || q.a.length }))}</div>`;
        h += (q.opts || []).map((o, i) => `<label><input type="${multi ? "checkbox" : "radio"}" name="${nm}" value="${i}"> ${legacy ? "" : `<b>${String.fromCharCode(65 + i)}</b> `}${esc(legacy ? tx(o) : tx(o).replace(/^[A-H][.)]\s+/, ""))}</label>`).join("");
      } else if (q.type === "tfng") {
        const vals = q.variant === "ynng" ? ["Y", "N", "NG"] : ["T", "F", "NG"];
        h += vals.map(v => `<label><input type="radio" name="${nm}" value="${v}"> ${esc(t.tf[v])}</label>`).join("");
      } else if (q.type === "short") {
        h += `<input type="text" data-g="0">`;
        const lt = limText(q.limit); if (lt) h += `<div class="small lim">${esc(lt)}</div>`;
      } else if (q.type === "matching") {
        h += `<ul class="opts">${(q.options || []).map(o => `<li>${esc(tx(o))}</li>`).join("")}</ul>`;
        h += (q.items || []).map((it, i) => `<div class="mrow"><span>${esc(tx(it))}</span><select data-i="${i}"><option value="">${esc(t.choose)}</option>${(q.options || []).map((o, j) => `<option value="${j}">${esc(tx(o))}</option>`).join("")}</select></div>`).join("");
      } else if (q.type === "order") {
        const labels = q.labels || ["Topic", "Explanation", "Example", "Link"];
        h += (q.items || []).map((it, i) => `<div style="margin:6px 0">${esc(tx(it))}<br><select data-i="${i}"><option value="">${esc(legacy ? t.role : t.choose)}</option>${labels.map(r => `<option value="${esc(r)}">${esc(tx(r))}</option>`).join("")}</select></div>`).join("");
      } else if (q.type === "text") {
        h += `<input type="text" placeholder="${esc(t.fixPh)}">`;
      } else if (q.type === "speak") {
        h += `<div class="ctl"><button class="btn ghost" data-act="hearq">${esc(t.hearQ)}</button>${q.prepSec || q.talkSec ? `<button class="btn ghost" data-act="stimer">${esc(t.timerBtn)}${q.prepSec ? ` ${esc(t.prep)} ${q.prepSec}s` : ""}${q.talkSec ? ` · ${esc(t.talk)} ${q.talkSec}s` : ""}</button><span class="small" data-stime></span>` : ""}</div>`;
        h += selfHtml(q);
      } else {
        h += dataHtml(q.data);
        const essay = q.type === "essay";
        h += `<textarea rows="${essay ? 9 : 3}" placeholder="${esc(t.writePh)}"></textarea>`;
        if (essay) h += `<div class="small" data-wc>0 ${esc(q.wordHint ? tx(q.wordHint) : `${t.wordsN}${q.minWords ? ` (${t.minW} ${q.minWords})` : ""}`)}</div>`;
        h += selfHtml(q);
      }
    }
    if (!ctx.mock) h += `<div class="ctl"><button class="btn" data-act="chk">${esc(isAuto(q) ? t.chk : t.ans)}</button></div>`;
    h += `<div class="fb"></div>`;
    if (q.type === "speak" && q.modelRef) {
      const r = findRef(ctx.W, q.modelRef);
      if (r && r.kind === "s") h += `<div class="model" ${ctx.mock && !ctx.locked ? "hidden" : ""}>${scriptHtml(r.o, ctx, true)}</div>`;
    }
    return h + `</div>`;
  }

  function collect(q, box) {
    if (q.type === "mcq") {
      const sel = [...box.querySelectorAll("input:checked")].map(i => +i.value);
      return Array.isArray(q.a) ? sel : (sel.length ? sel[0] : null);
    }
    if (q.type === "tfng") { const s = box.querySelector("input:checked"); return s ? s.value : null; }
    if (q.type === "gap" || q.type === "short") return [...box.querySelectorAll("input[data-g]")].map(i => i.value);
    if (q.type === "matching" || q.type === "order") return [...box.querySelectorAll("select[data-i]")].map(s => s.value);
    if (q.type === "speak") return null;
    const f = box.querySelector("textarea, input[type=text]");
    return f ? f.value : "";
  }
  function restore(q, box, v) {
    if (v == null) return;
    if (q.type === "mcq" || q.type === "tfng") {
      const set = Array.isArray(v) ? v.map(String) : [String(v)];
      box.querySelectorAll("input[name]").forEach(i => { i.checked = set.includes(i.value); });
    } else if (q.type === "gap" || q.type === "short") box.querySelectorAll("input[data-g]").forEach((i, j) => { i.value = v[j] || ""; });
    else if (q.type === "matching" || q.type === "order") box.querySelectorAll("select[data-i]").forEach((s, j) => { s.value = v[j] == null ? "" : v[j]; });
    else { const f = box.querySelector("textarea, input[type=text]"); if (f) f.value = v; }
  }
  function grade(q, v) {
    const max = maxOf(q);
    if (q.type === "mcq") {
      if (Array.isArray(q.a)) {
        const sel = Array.isArray(v) ? v : [];
        const got = sel.length > (q.pick || q.a.length) ? 0 : sel.filter(i => q.a.includes(i)).length;
        return { got, max };
      }
      return { got: v === q.a ? 1 : 0, max };
    }
    if (q.type === "tfng") return { got: v === q.a ? 1 : 0, max };
    if (q.type === "gap" || q.type === "short") {
      const B = blanks(q), arr = Array.isArray(v) ? v : [];
      const marks = B.map((b, i) => { const lim = b.limit || q.limit; const a = arr[i] || ""; return !!norm(a) && !overLimit(a, lim) && (b.accept || []).some(x => norm(x) === norm(a)); });
      return { got: marks.filter(Boolean).length, max, marks };
    }
    if (q.type === "matching" || q.type === "order") {
      const key = q.type === "order" ? orderKey(q) : (q.a || []), arr = Array.isArray(v) ? v : [];
      const marks = (q.items || []).map((_, i) => arr[i] !== "" && arr[i] != null && String(arr[i]) === String(key[i]));
      const all = marks.length > 0 && marks.every(Boolean);
      return { got: scoreEach(q) ? marks.filter(Boolean).length : (all ? 1 : 0), max, marks };
    }
    return null;
  }
  function showFb(q, box, v, res) {
    const t = T(), fb = box.querySelector(".fb");
    const why = tx(q.why);
    if (!res) {
      const m = q.model != null ? t.model + modelText(q.model) + "\n" : "";
      fb.textContent = m + why;
      const md = box.querySelector(".model"); if (md) md.hidden = false;
      return;
    }
    const full = res.got === res.max;
    let extra = "";
    if (q.type === "mcq" || q.type === "tfng") {
      const key = q.type === "mcq" ? (Array.isArray(q.a) ? q.a.map(String) : [String(q.a)]) : [String(q.a)];
      const sel = Array.isArray(v) ? v.map(String) : (v == null ? [] : [String(v)]);
      box.querySelectorAll("label").forEach(l => {
        const i = l.querySelector("input[name]"); if (!i) return;
        l.classList.remove("ok", "bad");
        if (key.includes(i.value)) l.classList.add("ok"); else if (sel.includes(i.value)) l.classList.add("bad");
      });
      if (q.type === "tfng" && !full) extra = t.correctIs + t.tf[q.a] + ". ";
    } else if (q.type === "gap" || q.type === "short") {
      const B = blanks(q);
      box.querySelectorAll("input[data-g]").forEach((i, j) => { i.classList.toggle("ok", !!res.marks[j]); i.classList.toggle("bad", !res.marks[j]); });
      if (!full) {
        if (B.some((b, j) => overLimit((v || [])[j] || "", b.limit || q.limit))) extra += t.over;
        extra += t.accept + B.map(b => (b.accept || []).join(" / ")).join(" | ") + ". ";
      }
    } else {
      box.querySelectorAll("select[data-i]").forEach((s, j) => { s.classList.toggle("ok", !!res.marks[j]); s.classList.toggle("bad", !res.marks[j]); });
      if (!full) {
        const key = q.type === "order" ? orderKey(q) : (q.a || []);
        if (q.type === "matching") extra = t.correctIs + (q.items || []).map((it, j) => `${tx(it)} → ${tx((q.options || [])[key[j]])}`).join("; ") + ". ";
        else if (!isLegacy(currentW)) extra = t.correctIs + key.map(tx).join(" – ") + ". ";
      }
    }
    fb.textContent = (full ? t.right : t.wrong) + extra + why;
  }
  let currentW = null;

  // Gắn sự kiện cho các câu hỏi đã render. ctx: {W, n, store, selfStore, answers?, plays, mock?, locked, sec?, qs, onScore}
  function bindQs(ctx) {
    const t = T();
    currentW = ctx.W;
    const boxes = [...view.querySelectorAll(`[data-ctx="${ctx.pre}"] .q[data-k]`)];
    const box = k => boxes.find(b => +b.dataset.k === k);
    ctx.qs.forEach((q, k) => {
      const b = box(k); if (!b) return;
      if (ctx.answers) restore(q, b, ctx.answers[q.id]);
      // tự đánh giá: checklist + band
      const self = ctx.selfStore[q.id];
      if (self) {
        b.querySelectorAll("[data-chk]").forEach(c => { c.checked = !!(self.checks || [])[+c.dataset.chk]; });
        b.querySelectorAll("[data-crit]").forEach(s => { const v = (self.band || {})[s.dataset.crit]; s.value = v == null ? "" : String(v); });
        bandSelf(b);
      }
      const saveSelf = () => {
        const checks = [...b.querySelectorAll("[data-chk]")].map(c => c.checked ? 1 : 0), band = {};
        b.querySelectorAll("[data-crit]").forEach(s => { if (s.value !== "") band[s.dataset.crit] = +s.value; });
        ctx.selfStore[q.id] = { checks, band }; bandSelf(b); save();
      };
      b.querySelectorAll("[data-chk], [data-crit]").forEach(x => x.onchange = saveSelf);
      const ta = b.querySelector("textarea"), wc = b.querySelector("[data-wc]");
      if (ta && wc) { const upd = () => { const n = ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0; wc.textContent = wc.textContent.replace(/^\d+/, n); wc.classList.toggle("bad", !!q.minWords && n > 0 && n < q.minWords); }; ta.addEventListener("input", upd); upd(); }
      if (ctx.mock && !ctx.locked) {
        const keep = () => { ctx.answers[q.id] = collect(q, b); save(); };
        b.addEventListener("input", keep); b.addEventListener("change", keep);
      }
      const hq = b.querySelector("[data-act=hearq]");
      if (hq) hq.onclick = () => speak(tx(q.q).replace(/\n/g, ". "), "en-GB");
      const stb = b.querySelector("[data-act=stimer]");
      if (stb) stb.onclick = () => speakTimer(q, b.querySelector("[data-stime]"));
      const cb = b.querySelector("[data-act=chk]");
      if (cb) cb.onclick = () => checkOne(ctx, q, b);
      if (ctx.locked) {
        b.querySelectorAll("input:not([data-chk]), select:not([data-crit]), textarea").forEach(x => x.disabled = true);
        showFb(q, b, ctx.answers ? ctx.answers[q.id] : null, isAuto(q) ? grade(q, ctx.answers ? ctx.answers[q.id] : null) : null);
      }
    });
    bindScripts(ctx);
  }
  function checkOne(ctx, q, b, silent) {
    const t = T(), v = collect(q, b);
    if (isAuto(q)) {
      if (q.type === "mcq" || q.type === "tfng") {
        const none = v == null || (Array.isArray(v) && !v.length);
        if (none) { if (!silent) b.querySelector(".fb").textContent = Array.isArray(q.a) ? fmt(t.pickN, { n: q.pick || q.a.length }) : t.pick; return; }
      }
      const res = grade(q, v);
      ctx.store[q.id] = res.got; showFb(q, b, v, res);
      save(); ctx.onScore && ctx.onScore();
    } else if (!silent) showFb(q, b, v, null);
  }
  function bandSelf(b) {
    const out = b.querySelector("[data-bself]"); if (!out) return;
    const v = [...b.querySelectorAll("[data-crit]")].filter(s => s.value !== "").map(s => +s.value);
    out.textContent = v.length ? `${T().bandSelf}: ~${Math.floor(v.reduce((a, c) => a + c, 0) / v.length * 2) / 2}` : "";
  }
  let sTimer = null;
  function speakTimer(q, out) {
    const t = T(); clearInterval(sTimer);
    const phases = []; if (q.prepSec) phases.push([t.prep, q.prepSec]); if (q.talkSec) phases.push([t.talk, q.talkSec]);
    let p = 0, left = phases.length ? phases[0][1] : 0;
    const show = () => { out.textContent = p < phases.length ? `${phases[p][0]}: ${left}s` : t.timeUp; };
    show();
    sTimer = setInterval(() => { left--; if (left <= 0) { p++; if (p >= phases.length) { clearInterval(sTimer); show(); return; } left = phases[p][1]; } show(); }, 1000);
  }
  function bindScripts(ctx) {
    const t = T();
    view.querySelectorAll(`[data-ctx="${ctx.pre}"] .script[data-sid]`).forEach(card => {
      const r = findRef(ctx.W, card.dataset.sid); if (!r) return;
      const s = r.o, lim = scriptLimit(s, ctx);
      const pb = card.querySelector("[data-sact=play]"), tr = card.querySelector("[data-sact=tr]"), box = card.querySelector(".transcript"), pc = card.querySelector("[data-plays]");
      pb.onclick = () => {
        if (!("speechSynthesis" in window)) { pc.textContent = t.noTTS; return; }
        const n = (ctx.plays[s.id] || 0);
        if (lim != null && n >= lim) return;
        ctx.plays[s.id] = n + 1; save();
        if (lim != null) { pc.textContent = `${t.plays} ${n + 1}/${lim}`; if (n + 1 >= lim) pb.disabled = true; }
        playScript(s);
      };
      card.querySelector("[data-sact=stop]").onclick = () => { playTok++; if ("speechSynthesis" in window) speechSynthesis.cancel(); };
      if (tr) tr.onclick = () => { box.hidden = !box.hidden; tr.textContent = box.hidden ? t.showTr : t.hideTr; };
    });
  }
  function sumPts(qs, store) {
    let got = 0, max = 0, done = 0;
    qs.filter(isAuto).forEach(q => { max += maxOf(q); if (store[q.id] != null) { got += +store[q.id] || 0; done++; } });
    return { got, max, done };
  }
  const allQs = secs => (secs || []).reduce((a, s) => a.concat(s.questions || []), []);
  function sectionsHtml(secs, W, ctx) {
    return (secs || []).map(sec => {
      ctx.sec = sec;
      let h = sec.title || sec.instructions ? `<div class="sec">${sec.title ? `<h3>${esc(tx(sec.title))}</h3>` : ""}${sec.instructions ? `<p class="small">${nl(tx(sec.instructions))}</p>` : ""}</div>` : "";
      const refs = sec.refs || (sec.ref ? [sec.ref] : []), qs = sec.questions || [], used = new Set();
      const qRef = q => q.ref || (refs.length === 1 ? refs[0] : null);
      refs.forEach(r => { h += matHtml(W, r, ctx); qs.filter(q => qRef(q) === r).forEach(q => { used.add(q); h += qHtml(q, ctx); }); });
      qs.forEach(q => { if (used.has(q)) return; if (q.ref) h += matHtml(W, q.ref, ctx); h += qHtml(q, ctx); });
      return h;
    }).join("");
  }
  const newCtx = (pre, W, n, extra) => Object.assign({ pre, W, n, qs: [], shown: new Set(), plays: {}, store: {}, selfStore: wk(n).self, locked: false, mock: null }, extra || {});

  // ---------- Bài học ----------
  function renderLesson() {
    const t = T(), n = st.sel, W = hasWeek(n) ? getWeek(n) : null;
    if (!W || !W.lesson) { view.innerHTML = weekBar() + emptyWeek(); bindBar(renderLesson); return; }
    const L = W.lesson, legacy = isLegacy(W);
    let h = weekBar() + `<h2>${esc(tx(L.title))}</h2>` + selfTag(W);
    if (L.goal && L.goal.length) h += `<div class="card"><h3>${esc(t.goal)}</h3><ul>${L.goal.map(g => `<li>${esc(tx(g))}</li>`).join("")}</ul></div>`;
    if (L.explain && L.explain.length) h += `<div class="card"><h3>${esc(t.explain)}</h3>${L.explain.map(e => `${e.h ? `<h4>${esc(tx(e.h))}</h4>` : ""}<p>${nl(tx(e))}</p>`).join("")}</div>`;
    (L.table || []).forEach(tb => { h += `<div class="card"><h3>${esc(tx(tb.h))}</h3><table>${(tb.rows || []).map(r => `<tr>${r.map((c, i) => `<td>${i === 0 ? `<b>${esc(tx(c))}</b>` : esc(tx(c))}</td>`).join("")}</tr>`).join("")}</table></div>`; });
    if (!legacy && L.vocab && L.vocab.length) h += `<div class="card"><h3>${esc(t.vocabT)}</h3><table class="vocab">${L.vocab.map(v => `<tr><td><b>${esc(v.w)}</b>${v.pos ? ` <span class="small">(${esc(v.pos)})</span>` : ""}<div class="ph">${esc(v.ipa || "")}</div></td><td>${esc(tx({ vi: v.vi, en: v.en }))}<div class="small"><i>${esc(v.ex || "")}</i></div>${v.col ? `<div class="small">${esc(t.colloc)}: ${esc(v.col)}</div>` : ""}</td></tr>`).join("")}</table></div>`;
    if (L.mistakes && L.mistakes.length) h += `<div class="card"><h3>${esc(t.mist)}</h3><ul>${L.mistakes.map(m => `<li>${esc(tx(m))}</li>`).join("")}</ul></div>`;
    if (L.prompt || (L.examples && L.examples.length)) {
      h += `<div class="card"><h3>${esc(L.prompt ? t.prompt : t.examples)}</h3>${L.prompt ? `<p><i>${esc(tx(L.prompt))}</i></p>` : ""}`;
      (L.examples || []).forEach((e, i) => { h += `<div class="${esc(e.cls || "ex")}">${e.label ? `<b>${esc(tx(e.label))}</b>` : ""}${e.speak ? ` <button class="btn ghost" data-say="${i}">${esc(t.listen)}</button>` : ""}<br>${nl(tx(e.text))}${e.note ? `<div class="small">${esc(tx(e.note))}</div>` : ""}</div>`; });
      h += `</div>`;
    }
    let ctx = null;
    if (L.exercises && L.exercises.length) {
      ctx = newCtx("ex", W, n, { store: wk(n).ex });
      h += `<div class="card" data-ctx="ex"><h3>${esc(t.exT)} <span class="score" id="exScore"></span></h3>${L.exercises.map(q => qHtml(q, ctx)).join("")}
        <div class="ctl"><button class="btn ghost" id="exReset">${esc(t.reset)}</button></div></div>`;
    }
    h += `<div class="card"><h3>${esc(t.sum)}</h3><ol>${(L.summary || []).map(s => `<li>${esc(tx(s))}</li>`).join("")}</ol>
      ${L.vocab && L.vocab.length ? `<button class="btn" data-go="cards">${esc(t.learnV)}</button> ` : ""}${W.quiz || W.mock ? `<button class="btn ghost" data-go="quiz">${esc(t.doQ)}</button>` : ""}</div>`;
    view.innerHTML = h;
    bindBar(renderLesson);
    view.querySelectorAll("[data-say]").forEach(b => b.onclick = () => speak(tx(L.examples[+b.dataset.say].text), "en-US"));
    view.querySelectorAll("[data-go]").forEach(b => b.onclick = () => go(b.dataset.go));
    if (ctx) {
      const sc = () => { const p = sumPts(ctx.qs, ctx.store); $("#exScore").textContent = p.max ? `· ${p.got}/${p.max} ${t.autoPts}` : ""; };
      ctx.onScore = sc; bindQs(ctx); sc();
      $("#exReset").onclick = () => { wk(n).ex = {}; ctx.qs.forEach(q => delete wk(n).self[q.id]); save(); renderLesson(); };
    }
  }

  // ---------- Từ vựng ----------
  let ci = 0, flipped = false;
  function renderCards() {
    const t = T(), n = st.sel, W = hasWeek(n) ? getWeek(n) : null, V = W && W.lesson && W.lesson.vocab || [];
    if (!V.length) { view.innerHTML = weekBar() + emptyWeek(); bindBar(renderCards); return; }
    if (ci >= V.length) ci = 0;
    const K = wk(n).known, v = V[ci], known = V.filter(x => K[x.w]).length;
    view.innerHTML = weekBar() + `<p class="small">${esc(t.card)} ${ci + 1}/${V.length} · ${esc(t.known)} ${known}/${V.length}</p>
    <div class="card flash" id="card">${flipped
      ? `<div class="big" style="font-size:22px">${esc(tx({ vi: v.vi, en: v.en }))}</div><div>${esc(v.ex || "")}</div>${v.col ? `<div class="small">${esc(t.colloc)}: ${esc(v.col)}</div>` : ""}`
      : `<div class="big">${esc(v.w)}${v.pos ? ` <span class="ph">(${esc(v.pos)})</span>` : ""}</div><div class="ph">${esc(v.ipa || "")}</div><div class="small">${esc(t.tap)}</div>`}</div>
    <div class="ctl"><button class="btn ghost" id="prev">←</button><button class="btn ghost" id="say">${esc(t.hear)}</button><button class="btn ghost" id="sayEx">${esc(t.hearEx)}</button>
    <button class="btn" id="know">${esc(K[v.w] ? t.unmark : t.mark)}</button><button class="btn ghost" id="next">→</button></div>`;
    bindBar(renderCards);
    $("#card").onclick = () => { flipped = !flipped; renderCards(); };
    $("#prev").onclick = () => { ci = (ci + V.length - 1) % V.length; flipped = false; renderCards(); };
    $("#next").onclick = () => { ci = (ci + 1) % V.length; flipped = false; renderCards(); };
    $("#say").onclick = () => speak(v.w.replace(/\s*\(.*?\)/, ""), "en-US");
    $("#sayEx").onclick = () => speak(v.ex || v.w, "en-US");
    $("#know").onclick = () => { K[v.w] = !K[v.w]; save(); renderCards(); };
  }

  // ---------- Luyện tập / Kiểm tra / Mock ----------
  const BAND_TABLE = { // ước lượng tự soạn (schema mục 3.2), không chính thức
    listening: [[39, 9], [37, 8.5], [35, 8], [32, 7.5], [30, 7], [26, 6.5], [23, 6], [18, 5.5], [16, 5], [0, 4.5]],
    reading: [[39, 9], [37, 8.5], [35, 8], [33, 7.5], [30, 7], [27, 6.5], [23, 6], [19, 5.5], [15, 5], [0, 4.5]]
  };
  function bandEst(skill, correct, total) {
    const B = window.BAND_EST && Array.isArray(window.BAND_EST[skill]) ? window.BAND_EST[skill] : BAND_TABLE[skill];
    if (!B || !total) return null;
    const raw = total === 40 ? correct : Math.floor(correct / total * 40);
    const row = B.find(r => raw >= r[0]);
    if (!row || raw < 10) return { band: "< 4.5", scaled: total !== 40 };
    return { band: row[1], scaled: total !== 40 };
  }
  const mockLabel = s => `${T().mock}: ${T().skills[s.skill] || s.skill || ""}${s.timeLimitMin ? ` · ${s.timeLimitMin} ${T().min}` : ""}`;

  function renderQuiz() {
    const t = T(), n = st.sel, W = hasWeek(n) ? getWeek(n) : null;
    let h = weekBar();
    if (!W || (!W.quiz && !W.mock)) { view.innerHTML = h + emptyWeek() + boardHtml(); bindBar(renderQuiz); return; }
    const modes = [];
    if (W.quiz) modes.push({ id: "quiz", label: t.weekQuiz });
    ((W.mock && W.mock.sections) || []).forEach(s => modes.push({ id: s.id, label: mockLabel(s), sec: s }));
    let mode = modes.find(m => m.id === st.qv[n]) || modes[0];
    if (modes.length > 1) h += `<div class="wkbar modes">${modes.map(m => `<button class="wk${m === mode ? " on" : ""}" data-mode="${esc(m.id)}">${esc(m.label)}</button>`).join("")}</div>`;
    if (mode.id === "quiz") renderWeekQuiz(h, n, W); else renderMock(h, n, W, mode.sec);
    view.querySelectorAll("[data-mode]").forEach(b => b.onclick = () => { stop(); st.qv[n] = b.dataset.mode; save(); renderQuiz(); });
  }

  function renderWeekQuiz(h, n, W) {
    const t = T(), Q = W.quiz, legacy = isLegacy(W), store = wk(n).quiz;
    const ctx = newCtx("quiz", W, n, { store });
    h += `<h2>${esc(tx(Q.title) || t.weekQuiz)} <span class="score" id="score"></span></h2>${selfTag(W)}
      <p class="small">${esc(Q.hint ? tx(Q.hint) : t.qHintGen)}${Q.passPct ? ` ${esc(t.passAt)}: ${Q.passPct}%.` : ""}</p>
      <div data-ctx="quiz">${sectionsHtml(Q.sections, W, ctx)}</div>
      <div class="ctl">${legacy ? "" : `<button class="btn" id="chkAll">${esc(t.chkAll)}</button>`}<button class="btn ghost" id="reset">${esc(t.reset)}</button></div>` + boardHtml();
    view.innerHTML = h;
    bindBar(renderQuiz);
    const score = () => {
      const p = sumPts(ctx.qs, store);
      if (legacy) { $("#score").textContent = `· ${p.got}/${p.max} ${t.auto}`; }
      else {
        const pct = p.max ? Math.round(p.got / p.max * 100) : 0;
        $("#score").textContent = p.max ? `· ${p.got}/${p.max} ${t.autoPts} (${pct}%)${Q.passPct && p.done ? ` · ${pct >= Q.passPct ? t.passed : t.notYet}` : ""}` : "";
      }
      const w = wk(n); w.quizPct = p.max ? p.got / p.max : 0; if (p.done) w.quizBest = Math.max(w.quizBest || 0, w.quizPct); save();
      const bd = $("#scoreBoard"); if (bd) bd.outerHTML = boardHtml();
    };
    ctx.onScore = score; bindQs(ctx); score();
    const ca = $("#chkAll");
    if (ca) ca.onclick = () => { const boxes = [...view.querySelectorAll('[data-ctx="quiz"] .q[data-k]')]; ctx.qs.forEach((q, k) => { if (isAuto(q)) checkOne(ctx, q, boxes.find(b => +b.dataset.k === k), true); }); };
    $("#reset").onclick = () => { wk(n).quiz = {}; ctx.qs.forEach(q => delete wk(n).self[q.id]); save(); renderQuiz(); };
  }

  let tick = null;
  function renderMock(h, n, W, sec) {
    const t = T(), M = W.mock, store = wk(n).mock, rec = store[sec.id];
    const lim = sec.timeLimitMin || M.timeLimitMin || 0;
    h += `<h2>${esc(tx(M.title) || t.mock)}</h2>${selfTag(W)}<h3>${esc(mockLabel(sec))}</h3>${sec.title ? `<p>${esc(tx(sec.title))}</p>` : ""}`;
    if (!rec || !rec.startedAt) {
      h += `<div class="card"><p>${esc(t.mockInfo)}</p><button class="btn" id="mStart">${esc(t.start)}</button></div>` + boardHtml();
      view.innerHTML = h; bindBar(renderQuiz);
      $("#mStart").onclick = () => { store[sec.id] = { startedAt: Date.now(), answers: {}, plays: {}, self: {} }; save(); renderQuiz(); };
      return;
    }
    ["answers", "plays", "self"].forEach(f => { if (!rec[f]) rec[f] = {}; });
    const locked = !!rec.submitted;
    const ctx = newCtx("mock", W, n, { store: {}, selfStore: rec.self, answers: rec.answers, plays: rec.plays, mock: rec, locked, sec });
    if (!locked && lim) h += `<div class="timer" id="timer" role="timer" aria-live="off"></div><div class="warn" id="mWarn" hidden></div>`;
    if (locked) {
      const be = rec.bandEst;
      h += `<div class="card result"><h3>${esc(t.result)}${rec.auto ? ` · ${esc(t.autoSub)}` : ` · ${esc(t.submitted)}`}</h3>
        ${rec.total ? `<p><b>${rec.correct}/${rec.total}</b> ${esc(t.correctN)} (${Math.round(rec.correct / rec.total * 100)}%)</p>` : ""}
        ${be ? `<p>${esc(t.bandEst)}: <b>${typeof be.band === "number" ? "~" : ""}${be.band}</b>${be.scaled ? ` (${esc(t.scaled)})` : ""}</p><p class="small">${esc(t.bandNote)}</p>` : ""}</div>`;
    }
    const secs = [sec];
    h += `<div data-ctx="mock">${sectionsHtml(secs, W, ctx)}</div><div class="ctl">${locked ? `<button class="btn ghost" id="mRedo">${esc(t.redo)}</button>` : `<button class="btn" id="mSubmit">${esc(t.submit)}</button>`}</div>` + boardHtml();
    view.innerHTML = h; bindBar(renderQuiz); bindQs(ctx);
    const submit = auto => {
      clearInterval(tick); tick = null; stop();
      const boxes = [...view.querySelectorAll('[data-ctx="mock"] .q[data-k]')];
      let correct = 0, total = 0;
      ctx.qs.forEach((q, k) => {
        const b = boxes.find(x => +x.dataset.k === k);
        if (b) rec.answers[q.id] = collect(q, b);
        if (isAuto(q)) { const r = grade(q, rec.answers[q.id]); correct += r.got; total += r.max; }
      });
      rec.submitted = true; rec.auto = !!auto; rec.endedAt = Date.now(); rec.correct = correct; rec.total = total;
      rec.bandEst = (sec.skill === "listening" || sec.skill === "reading") ? bandEst(sec.skill, correct, total) : null;
      save(); renderQuiz();
    };
    if (locked) { $("#mRedo").onclick = () => { if (confirm(t.confirmRedo)) { delete store[sec.id]; save(); renderQuiz(); } }; return; }
    $("#mSubmit").onclick = () => { if (confirm(t.confirmSubmit)) submit(false); };
    if (lim) {
      const end = rec.startedAt + lim * 60000, warns = ((M.timer && M.timer.warnAtMin) || []).slice().sort((a, b) => a - b);
      const upd = () => {
        const el = $("#timer"); if (!el) { clearInterval(tick); tick = null; return; }
        const rem = end - Date.now();
        if (rem <= 0) { if (!M.timer || M.timer.autoSubmit !== false) { submit(true); } else { el.textContent = `${t.left}: 00:00`; clearInterval(tick); tick = null; } return; }
        const s = Math.ceil(rem / 1000);
        el.textContent = `${t.left}: ${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
        const w = warns.find(m => rem <= m * 60000);
        el.classList.toggle("low", w != null);
        const wn = $("#mWarn"); if (wn && w != null) { wn.hidden = false; wn.textContent = fmt(t.warnLeft, { m: w }); }
      };
      clearInterval(tick); tick = setInterval(upd, 1000); upd();
    }
  }

  function boardHtml() {
    const t = T(), rows = [];
    for (let n = 1; n <= 12; n++) {
      if (!hasWeek(n)) continue;
      const W = getWeek(n), w = st.wk[String(n)] || {};
      const ex = W.lesson && W.lesson.exercises ? sumPts(W.lesson.exercises, w.ex || {}) : null;
      const qz = W.quiz ? sumPts(allQs(W.quiz.sections), w.quiz || {}) : null;
      const mk = ((W.mock && W.mock.sections) || []).map(s => { const r = (w.mock || {})[s.id]; if (!r || !r.submitted) return ""; return `${t.skills[s.skill] || s.skill}: ${r.total ? `${r.correct}/${r.total}` : t.submitted}${r.bandEst ? ` (${typeof r.bandEst.band === "number" ? "~" : ""}${r.bandEst.band})` : ""}`; }).filter(Boolean).join("; ");
      const cell = p => p && p.max ? `${p.got}/${p.max}` : "—";
      rows.push(`<tr><td>${n}</td><td>${cell(ex)}</td><td>${qz && qz.max ? `${qz.got}/${qz.max} (${Math.round(qz.got / qz.max * 100)}%)` : "—"}</td><td>${w.quizBest != null ? Math.round(w.quizBest * 100) + "%" : "—"}</td><td>${W.quiz && W.quiz.passPct ? W.quiz.passPct + "%" : "—"}</td><td>${esc(mk || "—")}</td></tr>`);
    }
    return `<div class="card" id="scoreBoard"><h3>${esc(t.board)}</h3>${rows.length ? `<table><tr><th>${esc(t.week)}</th><th>${esc(t.colEx)}</th><th>${esc(t.colQuiz)}</th><th>${esc(t.colBest)}</th><th>${esc(t.colPass)}</th><th>${esc(t.colMock)}</th></tr>${rows.join("")}</table>` : `<p class="small">${esc(t.noBoard)}</p>`}</div>`;
  }

  // ---------- Video whiteboard (xem thử kịch bản) ----------
  let si = 0, playing = false, timer = null;
  function sceneHtml(s) {
    let h = esc(s.text_display);
    (s.highlight || []).forEach(x => { const e = esc(x); h = h.split(e).join(`<em>${e}</em>`); });
    return `<div class="ill">${esc(T().fig)}: ${esc(s.illustration)}</div><div>${h.replace(/\n/g, "<br>")}</div>`;
  }
  function renderVideo() {
    const D = scenes(), s = D.scenes[si], t = T(), wn = st.sel || 2;
    const vid = `<div class="card"><h3>${esc(t.week)} ${wn}</h3><video id="wbv" controls preload="metadata" style="width:100%;border-radius:10px;background:#fff" src="videos/v3/week-${String(wn).padStart(2, "0")}.mp4"><track kind="subtitles" src="videos/v3/week-${String(wn).padStart(2, "0")}.srt" srclang="${st.lang}" label="Subtitles"></video><p class="small" id="wbmsg">${esc(t.vidLocal)}</p></div>`;
    if (wn !== 2) {
      view.innerHTML = weekBar() + vid; bindBar(renderVideo);
      const v = $("#wbv"); v.onerror = () => { $("#wbmsg").textContent = t.vidMissing; v.style.display = "none"; };
      return;
    }
    view.innerHTML = weekBar() + vid + `<h2>${esc(D.title)}</h2><p class="small">${esc(t.vidHint)} (${esc(t.scene)} ${si + 1}/${D.scenes.length})</p>
    <div class="board" id="board">${sceneHtml(s)}</div>
    <div class="ctl"><button class="btn ghost" id="vp">←</button><button class="btn" id="play">${esc(playing ? t.stop : t.play)}</button><button class="btn ghost" id="vn">→</button>
    <span class="small">${esc(t.voice)}: ${esc(s.voice_lang)} · ${esc(t.pause)} ${s.pause_after_sec}s</span></div>
    <div class="card"><b>${esc(t.say)}:</b> ${esc(s.voice_text)}</div>`;
    bindBar(renderVideo);
    { const v = $("#wbv"); v.onerror = () => { $("#wbmsg").textContent = T().vidMissing; v.style.display = "none"; }; }
    $("#vp").onclick = () => { stop(); si = Math.max(0, si - 1); renderVideo(); };
    $("#vn").onclick = () => { stop(); si = Math.min(D.scenes.length - 1, si + 1); renderVideo(); };
    $("#play").onclick = () => { if (playing) { stop(); renderVideo(); } else { playing = true; renderVideo(); playScene(); } };
  }
  function stop() { playing = false; clearTimeout(timer); clearInterval(sTimer); clearInterval(tick); tick = null; playTok++; if ("speechSynthesis" in window) speechSynthesis.cancel(); }
  function playScene() {
    const D = scenes(), s = D.scenes[si];
    speak(s.voice_text, s.voice_lang, () => {
      if (!playing) return;
      timer = setTimeout(() => {
        if (!playing) return;
        if (si < D.scenes.length - 1) { si++; renderVideo(); playScene(); } else { playing = false; renderVideo(); }
      }, s.pause_after_sec * 1000);
    });
  }

  // ---------- điều hướng + ngôn ngữ ----------
  const R = { plan: renderPlan, lesson: renderLesson, cards: renderCards, quiz: renderQuiz, video: renderVideo };
  function chrome() {
    document.documentElement.lang = st.lang;
    $("#sub").textContent = T().sub;
    $("#foot").textContent = T().foot;
    document.querySelectorAll("#tabs button").forEach(b => b.textContent = T().tabs[b.dataset.tab]);
    document.querySelectorAll("#lang button").forEach(b => { b.classList.toggle("on", b.dataset.lang === st.lang); b.setAttribute("aria-pressed", b.dataset.lang === st.lang); });
    overall();
  }
  function go(tab) {
    stop(); st.tab = R[tab] ? tab : "plan"; save();
    document.querySelectorAll("#tabs button").forEach(b => b.classList.toggle("on", b.dataset.tab === st.tab));
    R[st.tab](); window.scrollTo(0, 0);
  }
  document.querySelectorAll("#tabs button").forEach(b => b.onclick = () => go(b.dataset.tab));
  document.querySelectorAll("#lang button").forEach(b => b.onclick = () => { st.lang = b.dataset.lang; save(); chrome(); stop(); R[st.tab](); });
  chrome(); go(st.tab);
})();
