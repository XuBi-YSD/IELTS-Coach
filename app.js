(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const KEY = "ieltscoach.v1";
  let st = { weeks: {}, known: {}, quiz: {}, tab: "plan" };
  try { st = Object.assign(st, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  const view = $("#view");

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
    $("#overall").innerHTML = `Tuần hoàn thành: <b>${done}/12</b><div class="bar"><i style="width:${done / 12 * 100}%"></i></div>`;
  }

  // ---------- Lộ trình ----------
  function renderPlan() {
    const P = window.PLAN;
    view.innerHTML = `<div class="note">${esc(P.note)}</div>
    <div class="card"><h3>Phân bổ 10 giờ/tuần</h3><table>${P.hours.map(h => `<tr><td>${esc(h[0])}</td><td>${h[1]} giờ</td></tr>`).join("")}</table></div>
    ${P.weeks.map(w => `<div class="card week ${st.weeks[w.w] ? "done" : ""}">
      <input type="checkbox" data-w="${w.w}" ${st.weeks[w.w] ? "checked" : ""} aria-label="Hoàn thành tuần ${w.w}">
      <div><h3>Tuần ${w.w}: ${esc(w.focus)}<span class="badge">${esc(w.phase)}</span></h3>
      <p><b>Học:</b> ${esc(w.learn)}</p><p><b>Bài tập:</b> ${esc(w.tasks)}</p><p><b>Tự kiểm tra:</b> ${esc(w.check)}</p>
      ${w.lesson ? `<button class="btn ghost" data-go="lesson">Mở Bài 01</button>` : ""}</div></div>`).join("")}`;
    view.querySelectorAll("input[data-w]").forEach(i => i.onchange = () => { st.weeks[i.dataset.w] = i.checked; save(); overall(); renderPlan(); });
    view.querySelectorAll("[data-go]").forEach(b => b.onclick = () => go(b.dataset.go));
  }

  // ---------- Bài học ----------
  function renderLesson() {
    const L = window.LESSON;
    view.innerHTML = `<h2>${esc(L.title)}</h2>
    <div class="card"><h3>Mục tiêu</h3><ul>${L.goal.map(g => `<li>${esc(g)}</li>`).join("")}</ul></div>
    <div class="card"><h3>Cấu trúc đoạn thân bài (TEEL)</h3><table>${L.teel.map(t => `<tr><td><b>${esc(t[0])}</b></td><td>${esc(t[1])}</td></tr>`).join("")}</table></div>
    <div class="card"><h3>Lỗi người Việt hay mắc</h3><ul>${L.mistakes.map(m => `<li>${esc(m)}</li>`).join("")}</ul></div>
    <div class="card"><h3>Đề luyện (tự soạn)</h3><p><i>${esc(L.prompt)}</i></p>
      <div class="low"><b>Band ~5.5</b><br>${esc(L.low.text)}<div class="small">${esc(L.low.note)}</div></div>
      <div class="high"><b>Band ~7.5</b> <button class="btn ghost" id="readHigh">Nghe</button><br>${esc(L.high.text)}<div class="small">${esc(L.high.note)}</div></div></div>
    <div class="card"><h3>Tóm tắt</h3><ol>${L.summary.map(s => `<li>${esc(s)}</li>`).join("")}</ol>
      <button class="btn" data-go="cards">Học từ vựng</button> <button class="btn ghost" data-go="quiz">Làm bài tập</button></div>`;
    $("#readHigh").onclick = () => speak(L.high.text, "en-US");
    view.querySelectorAll("[data-go]").forEach(b => b.onclick = () => go(b.dataset.go));
  }

  // ---------- Từ vựng ----------
  let ci = 0, flipped = false;
  function renderCards() {
    const V = window.LESSON.vocab, v = V[ci], known = V.filter((_, i) => st.known[i]).length;
    view.innerHTML = `<p class="small">Thẻ ${ci + 1}/${V.length} · đã nhớ ${known}/${V.length}</p>
    <div class="card flash" id="card">${flipped
      ? `<div class="big" style="font-size:22px">${esc(v[2])}</div><div>${esc(v[3])}</div><div class="small">Collocation: ${esc(v[4])}</div>`
      : `<div class="big">${esc(v[0])}</div><div class="ph">${esc(v[1])}</div><div class="small">Chạm để xem nghĩa</div>`}</div>
    <div class="ctl"><button class="btn ghost" id="prev">←</button><button class="btn ghost" id="say">Nghe từ</button><button class="btn ghost" id="sayEx">Nghe câu</button>
    <button class="btn" id="know">${st.known[ci] ? "Bỏ đánh dấu" : "Đã nhớ"}</button><button class="btn ghost" id="next">→</button></div>`;
    $("#card").onclick = () => { flipped = !flipped; renderCards(); };
    $("#prev").onclick = () => { ci = (ci + V.length - 1) % V.length; flipped = false; renderCards(); };
    $("#next").onclick = () => { ci = (ci + 1) % V.length; flipped = false; renderCards(); };
    $("#say").onclick = () => speak(v[0].replace(/\s*\(.*?\)/, ""), "en-US");
    $("#sayEx").onclick = () => speak(v[3], "en-US");
    $("#know").onclick = () => { st.known[ci] = !st.known[ci]; save(); renderCards(); };
  }

  // ---------- Luyện tập ----------
  function renderQuiz() {
    const Q = window.QUIZ;
    const body = Q.map(q => {
      let h = `<div class="q" data-id="${q.id}"><b>${q.id}.</b> ${esc(q.q)}`;
      if (q.type === "mcq") h += q.opts.map((o, i) => `<label><input type="radio" name="q${q.id}" value="${i}"> ${esc(o)}</label>`).join("");
      else if (q.type === "text") h += `<input type="text" placeholder="Câu đã sửa...">`;
      else if (q.type === "order") h += q.items.map((it, i) => `<div style="margin:6px 0">${esc(it)}<br><select data-i="${i}"><option value="">— vai trò —</option>${["Topic", "Explanation", "Example", "Link"].map(r => `<option>${r}</option>`).join("")}</select></div>`).join("");
      else h += `<textarea rows="${q.type === "essay" ? 9 : 3}" placeholder="Viết câu trả lời..."></textarea>` + (q.type === "essay" ? `<div class="small" id="wc">0 từ</div>${q.checklist.map(c => `<label><input type="checkbox"> ${esc(c)}</label>`).join("")}` : "");
      h += `<div class="ctl"><button class="btn" data-check="${q.id}">${q.type === "mcq" || q.type === "order" ? "Kiểm tra" : "Xem đáp án"}</button></div><div class="fb" id="fb${q.id}"></div></div>`;
      return h;
    }).join("");
    view.innerHTML = `<h2>Bài tập Bài 01 <span class="score" id="score"></span></h2><p class="small">Câu 1–6, 10, 11 tự chấm. Câu 7–9, 12–14 tự viết rồi so với đáp án mẫu (đáp án khác vẫn đúng nếu đạt ý).</p>${body}<button class="btn ghost" id="reset">Làm lại</button>`;
    const score = () => { const t = Q.filter(q => q.type === "mcq" || q.type === "order"); const ok = t.filter(q => st.quiz[q.id] === 1).length; $("#score").textContent = `· ${ok}/${t.length} câu tự chấm đúng`; };
    view.querySelectorAll("[data-check]").forEach(b => b.onclick = () => {
      const q = Q.find(x => x.id == b.dataset.check), box = b.closest(".q"), fb = $("#fb" + q.id);
      if (q.type === "mcq") {
        const sel = box.querySelector("input:checked"); if (!sel) { fb.textContent = "Hãy chọn một đáp án."; return; }
        box.querySelectorAll("label").forEach((l, i) => { l.classList.remove("ok", "bad"); if (i === q.a) l.classList.add("ok"); else if (+sel.value === i) l.classList.add("bad"); });
        st.quiz[q.id] = +sel.value === q.a ? 1 : 0; fb.textContent = (st.quiz[q.id] ? "Đúng. " : "Chưa đúng. ") + q.why;
      } else if (q.type === "order") {
        const sels = [...box.querySelectorAll("select")]; const ok = sels.every((s, i) => s.value === q.roles[i]);
        st.quiz[q.id] = ok ? 1 : 0; fb.textContent = (ok ? "Đúng. " : "Chưa đúng. ") + q.why;
      } else { fb.textContent = "Đáp án mẫu: " + q.model + "\n" + q.why; }
      save(); score();
    });
    const ta = view.querySelector(".q[data-id='14'] textarea");
    if (ta) ta.oninput = () => { $("#wc").textContent = (ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0) + " từ (mục tiêu 110–140)"; };
    $("#reset").onclick = () => { st.quiz = {}; save(); renderQuiz(); };
    score();
  }

  // ---------- Video whiteboard (xem thử kịch bản) ----------
  let si = 0, playing = false, timer = null;
  function sceneHtml(s) {
    let t = esc(s.text_display);
    (s.highlight || []).forEach(h => { const e = esc(h); t = t.split(e).join(`<em>${e}</em>`); });
    return `<div class="ill">Hình: ${esc(s.illustration)}</div><div>${t.replace(/\n/g, "<br>")}</div>`;
  }
  function renderVideo() {
    const D = window.SCENES, s = D.scenes[si];
    view.innerHTML = `<h2>${esc(D.title)}</h2><p class="small">Xem thử kịch bản (cảnh ${si + 1}/${D.scenes.length}). Bản video MP4 sẽ do whiteboard-video-agent dựng sau khi bạn duyệt kịch bản.</p>
    <div class="board" id="board">${sceneHtml(s)}</div>
    <div class="ctl"><button class="btn ghost" id="vp">←</button><button class="btn" id="play">${playing ? "Dừng" : "Phát"}</button><button class="btn ghost" id="vn">→</button>
    <span class="small">Giọng: ${esc(s.voice_lang)} · nghỉ ${s.pause_after_sec}s</span></div>
    <div class="card"><b>Lời đọc:</b> ${esc(s.voice_text)}</div>`;
    $("#vp").onclick = () => { stop(); si = Math.max(0, si - 1); renderVideo(); };
    $("#vn").onclick = () => { stop(); si = Math.min(D.scenes.length - 1, si + 1); renderVideo(); };
    $("#play").onclick = () => { if (playing) { stop(); renderVideo(); } else { playing = true; renderVideo(); playScene(); } };
  }
  function stop() { playing = false; clearTimeout(timer); if ("speechSynthesis" in window) speechSynthesis.cancel(); }
  function playScene() {
    const D = window.SCENES, s = D.scenes[si];
    speak(s.voice_text, s.voice_lang, () => {
      if (!playing) return;
      timer = setTimeout(() => {
        if (!playing) return;
        if (si < D.scenes.length - 1) { si++; renderVideo(); playScene(); } else { playing = false; renderVideo(); }
      }, s.pause_after_sec * 1000);
    });
  }

  // ---------- điều hướng ----------
  const R = { plan: renderPlan, lesson: renderLesson, cards: renderCards, quiz: renderQuiz, video: renderVideo };
  function go(tab) {
    stop(); st.tab = R[tab] ? tab : "plan"; save();
    document.querySelectorAll("#tabs button").forEach(b => b.classList.toggle("on", b.dataset.tab === st.tab));
    R[st.tab](); window.scrollTo(0, 0);
  }
  document.querySelectorAll("#tabs button").forEach(b => b.onclick = () => go(b.dataset.tab));
  overall(); go(st.tab);
})();
