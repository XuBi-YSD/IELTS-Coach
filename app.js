(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const KEY = "ieltscoach.v1";
  let st = { weeks: {}, known: {}, quiz: {}, tab: "plan", lang: "vi" };
  try { st = Object.assign(st, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  const view = $("#view");
  const EN = () => st.lang === "en";

  const UI = {
    vi: { sub: "Mục tiêu band 7.5 · tự học 12 tuần", tabs: { plan: "Lộ trình", lesson: "Bài học", cards: "Từ vựng", quiz: "Luyện tập", video: "Video" }, foot: "Nội dung là bài luyện tự soạn, không phải đề thi thật và không đảm bảo kết quả. Tiến độ lưu trên trình duyệt của bạn.", weeksDone: "Tuần hoàn thành", hours: "Phân bổ 10 giờ/tuần", week: "Tuần", learn: "Học", tasks: "Bài tập", check: "Tự kiểm tra", openL: "Mở Bài 01", goal: "Mục tiêu", teel: "Cấu trúc đoạn thân bài (TEEL)", mist: "Lỗi người Việt hay mắc", prompt: "Đề luyện (tự soạn)", listen: "Nghe", sum: "Tóm tắt", learnV: "Học từ vựng", doQ: "Làm bài tập", card: "Thẻ", known: "đã nhớ", tap: "Chạm để xem nghĩa", colloc: "Collocation", hear: "Nghe từ", hearEx: "Nghe câu", mark: "Đã nhớ", unmark: "Bỏ đánh dấu", qTitle: "Bài tập Bài 01", qHint: "Câu 1–6, 10, 11 tự chấm. Câu 7–9, 12–14 tự viết rồi so với đáp án mẫu (đáp án khác vẫn đúng nếu đạt ý).", chk: "Kiểm tra", ans: "Xem đáp án", pick: "Hãy chọn một đáp án.", right: "Đúng. ", wrong: "Chưa đúng. ", model: "Đáp án mẫu: ", reset: "Làm lại", fixPh: "Câu đã sửa...", writePh: "Viết câu trả lời...", role: "— vai trò —", words: "từ (mục tiêu 110–140)", auto: "câu tự chấm đúng", scene: "cảnh", vidHint: "Xem thử kịch bản. Bản video MP4 sẽ do whiteboard-video-agent dựng sau khi bạn duyệt kịch bản.", fig: "Hình", say: "Lời đọc", voice: "Giọng", pause: "nghỉ", play: "Phát", stop: "Dừng", unit: "giờ", title: "Bài 01 – Writing Task 2: Đoạn thân bài (TEEL)" },
    en: { sub: "Target band 7.5 · 12-week self-study", tabs: { plan: "Plan", lesson: "Lesson", cards: "Vocabulary", quiz: "Practice", video: "Video" }, foot: "Content is self-written practice material, not a real exam, and does not guarantee a result. Progress is saved in your browser.", weeksDone: "Weeks completed", hours: "10 hours a week", week: "Week", learn: "Study", tasks: "Exercises", check: "Self-check", openL: "Open Lesson 01", goal: "Goals", teel: "Body paragraph structure (TEEL)", mist: "Common mistakes of Vietnamese learners", prompt: "Practice question (self-written)", listen: "Listen", sum: "Summary", learnV: "Study vocabulary", doQ: "Do the exercises", card: "Card", known: "known", tap: "Tap to see the meaning", colloc: "Collocation", hear: "Hear word", hearEx: "Hear sentence", mark: "I know it", unmark: "Unmark", qTitle: "Lesson 01 exercises", qHint: "Questions 1–6, 10, 11 are auto-marked. For 7–9 and 12–14, write your answer and compare with the model (other answers are fine if they make the same point).", chk: "Check", ans: "Show answer", pick: "Please choose an answer.", right: "Correct. ", wrong: "Not quite. ", model: "Model answer: ", reset: "Start over", fixPh: "Corrected sentence...", writePh: "Write your answer...", role: "— role —", words: "words (target 110–140)", auto: "auto-marked correct", scene: "scene", vidHint: "Script preview. The MP4 video will be built by whiteboard-video-agent after you approve the script.", fig: "Picture", say: "Voice-over", voice: "Voice", pause: "pause", play: "Play", stop: "Stop", unit: "h", title: "Lesson 01 – Writing Task 2: Body paragraph (TEEL)" }
  };
  const T = () => UI[st.lang];

  // Dữ liệu theo ngôn ngữ (EN ghi đè phần tiếng Việt)
  const plan = () => {
    const P = window.PLAN;
    if (!EN()) return P;
    const E = window.PLAN_EN;
    return { note: E.note, hours: P.hours.map((h, i) => [E.hours[i], h[1]]), weeks: P.weeks.map((w, i) => Object.assign({}, w, E.weeks[i])) };
  };
  const lesson = () => {
    const L = window.LESSON;
    if (!EN()) return L;
    const E = window.LESSON_EN;
    return Object.assign({}, L, { title: E.title, goal: E.goal, teel: E.teel, mistakes: E.mistakes, summary: E.summary, vocab: L.vocab.map((v, i) => [v[0], v[1], E.meanings[i], v[3], v[4]]), low: Object.assign({}, L.low, { note: E.lowNote }), high: Object.assign({}, L.high, { note: E.highNote }) });
  };
  const quiz = () => window.QUIZ.map(q => EN() ? Object.assign({}, q, window.QUIZ_EN[q.id] || {}) : q);
  const scenes = () => {
    const D = window.SCENES;
    if (!EN()) return D;
    return Object.assign({}, D, { title: UI.en.title, scenes: D.scenes.map(s => { const e = window.SCENES_EN[s.id] || {}; return Object.assign({}, s, { text_display: e.text || s.text_display, voice_text: e.voice || s.voice_text, voice_lang: "en-US" }); }) });
  };

  function speak(text, lang, onend) {
    if (!("speechSynthesis" in window)) { onend && onend(); return; }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang || "en-US";
    u.rate = lang === "vi-VN" ? 1 : 0.92;
    if (onend) { u.onend = onend; u.onerror = onend; }
    speechSynthesis.speak(u);
  }

  function overall() {
    const done = Object.values(st.weeks).filter(Boolean).length;
    $("#overall").innerHTML = `${esc(T().weeksDone)}: <b>${done}/12</b><div class="bar"><i style="width:${done / 12 * 100}%"></i></div>`;
  }

  // ---------- Lộ trình ----------
  function renderPlan() {
    const P = plan(), t = T();
    view.innerHTML = `<div class="note">${esc(P.note)}</div>
    <div class="card"><h3>${esc(t.hours)}</h3><table>${P.hours.map(h => `<tr><td>${esc(h[0])}</td><td>${h[1]} ${t.unit}</td></tr>`).join("")}</table></div>
    ${P.weeks.map(w => `<div class="card week ${st.weeks[w.w] ? "done" : ""}">
      <input type="checkbox" data-w="${w.w}" ${st.weeks[w.w] ? "checked" : ""} aria-label="${t.week} ${w.w}">
      <div><h3>${t.week} ${w.w}: ${esc(w.focus)}<span class="badge">${esc(w.phase)}</span></h3>
      <p><b>${t.learn}:</b> ${esc(w.learn)}</p><p><b>${t.tasks}:</b> ${esc(w.tasks)}</p><p><b>${t.check}:</b> ${esc(w.check)}</p>
      ${w.lesson ? `<button class="btn ghost" data-go="lesson">${t.openL}</button>` : ""}</div></div>`).join("")}`;
    view.querySelectorAll("input[data-w]").forEach(i => i.onchange = () => { st.weeks[i.dataset.w] = i.checked; save(); overall(); renderPlan(); });
    view.querySelectorAll("[data-go]").forEach(b => b.onclick = () => go(b.dataset.go));
  }

  // ---------- Bài học ----------
  function renderLesson() {
    const L = lesson(), t = T();
    view.innerHTML = `<h2>${esc(L.title)}</h2>
    <div class="card"><h3>${t.goal}</h3><ul>${L.goal.map(g => `<li>${esc(g)}</li>`).join("")}</ul></div>
    <div class="card"><h3>${t.teel}</h3><table>${L.teel.map(x => `<tr><td><b>${esc(x[0])}</b></td><td>${esc(x[1])}</td></tr>`).join("")}</table></div>
    <div class="card"><h3>${t.mist}</h3><ul>${L.mistakes.map(m => `<li>${esc(m)}</li>`).join("")}</ul></div>
    <div class="card"><h3>${t.prompt}</h3><p><i>${esc(L.prompt)}</i></p>
      <div class="low"><b>Band ~5.5</b><br>${esc(L.low.text)}<div class="small">${esc(L.low.note)}</div></div>
      <div class="high"><b>Band ~7.5</b> <button class="btn ghost" id="readHigh">${t.listen}</button><br>${esc(L.high.text)}<div class="small">${esc(L.high.note)}</div></div></div>
    <div class="card"><h3>${t.sum}</h3><ol>${L.summary.map(s => `<li>${esc(s)}</li>`).join("")}</ol>
      <button class="btn" data-go="cards">${t.learnV}</button> <button class="btn ghost" data-go="quiz">${t.doQ}</button></div>`;
    $("#readHigh").onclick = () => speak(L.high.text, "en-US");
    view.querySelectorAll("[data-go]").forEach(b => b.onclick = () => go(b.dataset.go));
  }

  // ---------- Từ vựng ----------
  let ci = 0, flipped = false;
  function renderCards() {
    const V = lesson().vocab, v = V[ci], t = T(), known = V.filter((_, i) => st.known[i]).length;
    view.innerHTML = `<p class="small">${t.card} ${ci + 1}/${V.length} · ${t.known} ${known}/${V.length}</p>
    <div class="card flash" id="card">${flipped
      ? `<div class="big" style="font-size:22px">${esc(v[2])}</div><div>${esc(v[3])}</div><div class="small">${t.colloc}: ${esc(v[4])}</div>`
      : `<div class="big">${esc(v[0])}</div><div class="ph">${esc(v[1])}</div><div class="small">${t.tap}</div>`}</div>
    <div class="ctl"><button class="btn ghost" id="prev">←</button><button class="btn ghost" id="say">${t.hear}</button><button class="btn ghost" id="sayEx">${t.hearEx}</button>
    <button class="btn" id="know">${st.known[ci] ? t.unmark : t.mark}</button><button class="btn ghost" id="next">→</button></div>`;
    $("#card").onclick = () => { flipped = !flipped; renderCards(); };
    $("#prev").onclick = () => { ci = (ci + V.length - 1) % V.length; flipped = false; renderCards(); };
    $("#next").onclick = () => { ci = (ci + 1) % V.length; flipped = false; renderCards(); };
    $("#say").onclick = () => speak(v[0].replace(/\s*\(.*?\)/, ""), "en-US");
    $("#sayEx").onclick = () => speak(v[3], "en-US");
    $("#know").onclick = () => { st.known[ci] = !st.known[ci]; save(); renderCards(); };
  }

  // ---------- Luyện tập ----------
  function renderQuiz() {
    const Q = quiz(), t = T();
    const body = Q.map(q => {
      let h = `<div class="q" data-id="${q.id}"><b>${q.id}.</b> ${esc(q.q)}`;
      if (q.type === "mcq") h += q.opts.map((o, i) => `<label><input type="radio" name="q${q.id}" value="${i}"> ${esc(o)}</label>`).join("");
      else if (q.type === "text") h += `<input type="text" placeholder="${t.fixPh}">`;
      else if (q.type === "order") h += q.items.map((it, i) => `<div style="margin:6px 0">${esc(it)}<br><select data-i="${i}"><option value="">${t.role}</option>${["Topic", "Explanation", "Example", "Link"].map(r => `<option>${r}</option>`).join("")}</select></div>`).join("");
      else h += `<textarea rows="${q.type === "essay" ? 9 : 3}" placeholder="${t.writePh}"></textarea>` + (q.type === "essay" ? `<div class="small" id="wc">0 ${t.words}</div>${q.checklist.map(c => `<label><input type="checkbox"> ${esc(c)}</label>`).join("")}` : "");
      h += `<div class="ctl"><button class="btn" data-check="${q.id}">${q.type === "mcq" || q.type === "order" ? t.chk : t.ans}</button></div><div class="fb" id="fb${q.id}"></div></div>`;
      return h;
    }).join("");
    view.innerHTML = `<h2>${t.qTitle} <span class="score" id="score"></span></h2><p class="small">${t.qHint}</p>${body}<button class="btn ghost" id="reset">${t.reset}</button>`;
    const score = () => { const a = Q.filter(q => q.type === "mcq" || q.type === "order"); const ok = a.filter(q => st.quiz[q.id] === 1).length; $("#score").textContent = `· ${ok}/${a.length} ${t.auto}`; };
    view.querySelectorAll("[data-check]").forEach(b => b.onclick = () => {
      const q = Q.find(x => x.id == b.dataset.check), box = b.closest(".q"), fb = $("#fb" + q.id);
      if (q.type === "mcq") {
        const sel = box.querySelector("input:checked"); if (!sel) { fb.textContent = t.pick; return; }
        box.querySelectorAll("label").forEach((l, i) => { l.classList.remove("ok", "bad"); if (i === q.a) l.classList.add("ok"); else if (+sel.value === i) l.classList.add("bad"); });
        st.quiz[q.id] = +sel.value === q.a ? 1 : 0; fb.textContent = (st.quiz[q.id] ? t.right : t.wrong) + q.why;
      } else if (q.type === "order") {
        const ok = [...box.querySelectorAll("select")].every((s, i) => s.value === q.roles[i]);
        st.quiz[q.id] = ok ? 1 : 0; fb.textContent = (ok ? t.right : t.wrong) + q.why;
      } else { fb.textContent = t.model + q.model + "\n" + q.why; }
      save(); score();
    });
    const ta = view.querySelector(".q[data-id='14'] textarea");
    if (ta) ta.oninput = () => { $("#wc").textContent = (ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0) + " " + t.words; };
    $("#reset").onclick = () => { st.quiz = {}; save(); renderQuiz(); };
    score();
  }

  // ---------- Video whiteboard (xem thử kịch bản) ----------
  let si = 0, playing = false, timer = null;
  function sceneHtml(s) {
    let h = esc(s.text_display);
    (s.highlight || []).forEach(x => { const e = esc(x); h = h.split(e).join(`<em>${e}</em>`); });
    return `<div class="ill">${T().fig}: ${esc(s.illustration)}</div><div>${h.replace(/\n/g, "<br>")}</div>`;
  }
  function renderVideo() {
    const D = scenes(), s = D.scenes[si], t = T();
    view.innerHTML = `<h2>${esc(D.title)}</h2><p class="small">${t.vidHint} (${t.scene} ${si + 1}/${D.scenes.length})</p>
    <div class="board" id="board">${sceneHtml(s)}</div>
    <div class="ctl"><button class="btn ghost" id="vp">←</button><button class="btn" id="play">${playing ? t.stop : t.play}</button><button class="btn ghost" id="vn">→</button>
    <span class="small">${t.voice}: ${esc(s.voice_lang)} · ${t.pause} ${s.pause_after_sec}s</span></div>
    <div class="card"><b>${t.say}:</b> ${esc(s.voice_text)}</div>`;
    $("#vp").onclick = () => { stop(); si = Math.max(0, si - 1); renderVideo(); };
    $("#vn").onclick = () => { stop(); si = Math.min(D.scenes.length - 1, si + 1); renderVideo(); };
    $("#play").onclick = () => { if (playing) { stop(); renderVideo(); } else { playing = true; renderVideo(); playScene(); } };
  }
  function stop() { playing = false; clearTimeout(timer); if ("speechSynthesis" in window) speechSynthesis.cancel(); }
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
