// weeks/w11.js — Tuần 11: Mock Listening (4 phần, 40 câu, kịch bản đọc bằng Web Speech) + Mock Speaking 3 phần (11–14 phút)
// + bài học bù điểm yếu theo nhật ký lỗi.
// Nội dung TỰ SOẠN, không phải đề thi thật. Địa danh, tổ chức, nhân vật đều hư cấu.
// Không có file audio: app đọc scripts bằng speechSynthesis; giọng máy khác giọng thi thật.
// Ghi chú ngoài schema (app có thể bỏ qua):
//   - section.groups: lời dẫn cho từng nhóm câu; section.reviewMin / readAheadSec: gợi ý thời gian soát cuối và đọc trước câu hỏi.
//   - section.timer: ghi đè mock.timer cho riêng phần đó (Speaking không tự nộp).
//   - mock.band.table: bảng quy đổi ước lượng nhúng sẵn để file chạy độc lập khi chưa có weeks/band.js.
// Đếm điểm mock Listening: mcq/gap/short = 1 điểm; matching scoreEach = 1 điểm/mục → tổng 40.
(function () {
  const B = (vi, en) => ({ vi, en });

  const BAND_LABEL = B(
    "Band ước lượng (tự soạn) – KHÔNG phải bảng quy đổi chính thức của IELTS; chỉ để tự theo dõi tiến bộ.",
    "Estimated band (self-written) – NOT an official IELTS conversion table; for tracking your own progress only."
  );
  const BAND_EST_LISTENING = [
    { min: 39, band: 9.0 }, { min: 37, band: 8.5 }, { min: 35, band: 8.0 }, { min: 32, band: 7.5 },
    { min: 30, band: 7.0 }, { min: 26, band: 6.5 }, { min: 23, band: 6.0 }, { min: 18, band: 5.5 },
    { min: 16, band: 5.0 }, { min: 0, band: 4.5, note: "≤ 4.5" }
  ];

  const CK_P1 = [
    B("Trả lời thẳng câu hỏi rồi thêm 1 lý do hoặc ví dụ (2–3 câu)", "Answered directly, then added one reason or example (2–3 sentences)"),
    B("Không im lặng quá 2 giây", "No silence longer than 2 seconds"),
    B("Đúng thì của câu hỏi (hiện tại/quá khứ)", "Used the tense of the question (present/past)")
  ];
  const CK_P2 = [
    B("Nói đủ khoảng 2 phút (không dừng trước 1 phút 30)", "Spoke for about 2 minutes (did not stop before 1:30)"),
    B("Có đủ 4 ý gợi ý trên cue card", "Covered all four cue-card prompts"),
    B("Có mở – bối cảnh – điểm nhấn – kết (cảm nghĩ)", "Had an opening, background, key moment and closing (feelings)"),
    B("Dùng thì quá khứ đúng khi kể chuyện", "Used past tenses correctly when narrating"),
    B("Ít nhất 2 collocation/cụm từ ít phổ biến", "At least two less common collocations or phrases")
  ];
  const CK_P3 = [
    B("Nêu quan điểm rõ trong câu đầu", "Gave a clear view in the first sentence"),
    B("Có lý do + ví dụ hoặc so sánh (khoảng 40–60 giây)", "Supported it with a reason plus an example or comparison (about 40–60 seconds)"),
    B("Nói về xã hội/nhìn chung, không chỉ bản thân", "Spoke about society in general, not only yourself"),
    B("Dùng ít nhất 1 cấu trúc phức (if, although, which…)", "Used at least one complex structure (if, although, which…)")
  ];
  const SPEAK_CRIT = ["FC", "LR", "GRA", "P"];
  const SPEAK_WHY = B(
    "Tự ghi âm bằng ứng dụng ghi âm của máy (app không ghi âm), nghe lại rồi tick checklist và tự chọn band 5–9 cho 4 tiêu chí. Không có đáp án đúng duy nhất.",
    "Record yourself with your device's recorder (the app does not record), listen back, tick the checklist and choose a band from 5 to 9 for the four criteria. There is no single correct answer."
  );

  (window.WEEKS = window.WEEKS || {})[11] = {
    meta: { week: 11, skill: "mixed", source: "tự soạn", version: 1, reviewed: false,
            label: B("Tự soạn – không phải đề thi thật", "Self-written – not a real exam") },

    // ------------------------------------------------------------------ LESSON
    lesson: {
      title: B("Bài 11 – Bù điểm yếu theo nhật ký lỗi: bẫy Listening và sửa lỗi Speaking",
               "Lesson 11 – Fixing weak points from your error log: Listening traps and Speaking repairs"),
      goal: [
        B("Dùng nhật ký lỗi tuần 4 và 7 để tìm phần Listening yếu nhất và loại lỗi lặp nhiều nhất.",
          "Use your week 4 and week 7 error logs to find your weakest Listening part and most frequent error type."),
        B("Nhận ra 4 bẫy Listening: thông tin bị sửa lại, 'used to'/'không còn nữa', chính tả – số nhiều, vượt giới hạn từ.",
          "Recognise four Listening traps: corrected information, 'used to'/'no longer', spelling and plurals, exceeding the word limit."),
        B("Áp dụng 3 cách 'cứu' Speaking: câu câu giờ tự nhiên, paraphrase khi quên từ, mở rộng theo Answer – Reason – Example.",
          "Apply three Speaking repairs: natural thinking-time phrases, paraphrasing a forgotten word, and extending with Answer – Reason – Example."),
        B("Hoàn thành mock Listening 40 câu và mock Speaking 3 phần, so sánh với tuần 4/7.",
          "Complete a 40-question Listening mock and a three-part Speaking mock, and compare the results with weeks 4 and 7.")
      ],
      explain: [
        { h: B("1. Đọc nhật ký lỗi trước khi luyện", "1. Read your error log before practising"),
          vi: "Mở nhật ký điểm tuần 4 (Listening P1–P2) và tuần 7 (P3–P4). Với mỗi câu sai, ghi một nhãn: chính tả, số nhiều, bẫy sửa thông tin, không theo kịp, vượt số từ, hiểu sai paraphrase. Đếm nhãn: nhãn nhiều nhất là việc cần luyện tuần này. Ví dụ: nếu 5/9 lỗi là chính tả tên riêng, luyện đánh vần và chép số mỗi ngày quan trọng hơn làm thêm đề.",
          en: "Open your score log for week 4 (Listening Parts 1–2) and week 7 (Parts 3–4). Give each wrong answer one label: spelling, plurals, correction trap, lost the place, over the word limit, misread paraphrase. Count the labels: the most frequent one is this week's priority. For example, if 5 of your 9 errors are spelling of names, daily spelling and number dictation matters more than doing extra tests." },
        { h: B("2. Bốn bẫy Listening hay gặp", "2. Four common Listening traps"),
          vi: "(1) Thông tin bị sửa lại: 'Twelve. Oh, sorry, actually fourteen' → đáp án là thông tin cuối cùng. (2) 'We used to…', 'we don't do that any more' → điều đã thay đổi thường là bẫy. (3) Chính tả và số nhiều: 'leftovers' mất -s có thể bị chấm sai; chép tên riêng đúng từng chữ. (4) Giới hạn từ: 'ONE WORD ONLY' mà viết 'old clothes' là sai dù đúng ý. Trước khi nghe, đọc câu hỏi và đoán loại từ cần điền (danh từ? số? tính từ?).",
          en: "(1) Corrected information: 'Twelve. Oh, sorry, actually fourteen' → the answer is the final version. (2) 'We used to…', 'we don't do that any more' → what has changed is usually a trap. (3) Spelling and plurals: writing 'leftover' for 'leftovers' may be marked wrong; copy names letter by letter. (4) Word limits: writing 'old clothes' for 'ONE WORD ONLY' is wrong even if the meaning is right. Before listening, read the questions and predict the type of word needed (noun? number? adjective?)." },
        { h: B("3. Theo dấu signpost ở Part 3–4", "3. Following signposts in Parts 3–4"),
          vi: "Bài giảng Part 4 thường chia phần bằng từ chuyển ý: 'First of all…', 'Let's turn to…', 'Secondly…', 'Finally…'. Các tiêu đề trong phần ghi chú thường khớp với những chỗ chuyển ý này. Nếu lỡ một câu, nghe signpost tiếp theo để bắt lại vị trí, đừng tiếp tục chờ câu đã qua.",
          en: "Part 4 lectures usually mark sections with signposts: 'First of all…', 'Let's turn to…', 'Secondly…', 'Finally…'. The headings in the notes usually match these turns. If you miss a question, listen for the next signpost to find your place again rather than waiting for an answer that has already gone." },
        { h: B("4. Ba cách 'cứu' Speaking", "4. Three Speaking repairs"),
          vi: "(1) Câu giờ tự nhiên thay cho im lặng: 'That's an interesting question — let me think for a second.' Dùng tiết chế, không lặp ở mọi câu. (2) Quên từ → paraphrase: không nhớ 'umbrella' thì nói 'the thing you hold over your head when it rains'. Paraphrase được là dấu hiệu tốt cho Lexical Resource. (3) Câu trả lời quá ngắn → Answer – Reason – Example: trả lời, nêu lý do, thêm ví dụ cụ thể. Part 1 khoảng 2–3 câu; Part 3 khoảng 40–60 giây.",
          en: "(1) Natural thinking time instead of silence: 'That's an interesting question — let me think for a second.' Use it sparingly, not before every answer. (2) Forgotten word → paraphrase: if 'umbrella' will not come, say 'the thing you hold over your head when it rains'. Paraphrasing well is a good sign for Lexical Resource. (3) Answers that are too short → Answer – Reason – Example: answer, give a reason, add a specific example. Part 1 about 2–3 sentences; Part 3 about 40–60 seconds." },
        { h: B("5. Quy trình tự ghi âm", "5. A self-recording routine"),
          vi: "Ghi âm bằng ứng dụng của điện thoại/máy tính (app này không ghi âm). Nghe lại một lần chỉ để đếm khoảng dừng dài, một lần để nghe âm cuối (-s, -ed) và trọng âm. Tick checklist, chọn band 4 tiêu chí, rồi ghi âm lại đúng một câu trả lời yếu nhất. So sánh với bản ghi tuần 4/7.",
          en: "Record with your phone or computer's recorder (this app does not record). Listen once only to count long pauses, and once for final sounds (-s, -ed) and word stress. Tick the checklist, choose bands for the four criteria, then re-record just your weakest answer. Compare with your week 4/7 recordings." }
      ],
      table: [
        { h: B("Loại lỗi → cách luyện (tự soạn)", "Error type → practice fix (self-written)"),
          rows: [
            [B("Chính tả tên riêng, số", "Spelling of names, numbers"), B("Nghe đánh vần/số 5 phút mỗi ngày bằng nút Nghe, chép lại", "5 minutes a day of spelling/number dictation with the Listen button")],
            [B("Bẫy thông tin bị sửa", "Correction traps"), B("Khi nghe 'sorry', 'actually', 'no, wait' → chờ thông tin cuối", "When you hear 'sorry', 'actually', 'no, wait' → wait for the final version")],
            [B("Vượt giới hạn từ", "Over the word limit"), B("Khoanh giới hạn từ trước khi nghe; đếm từ khi soát", "Circle the word limit before listening; count words when checking")],
            [B("Im lặng lâu khi nói", "Long silences when speaking"), B("Học 3 câu câu giờ, luyện trả lời 30 giây bấm giờ", "Learn three thinking-time phrases; practise timed 30-second answers")],
            [B("Trả lời quá ngắn", "Answers too short"), B("Khung Answer – Reason – Example", "Answer – Reason – Example frame")],
            [B("Mất âm cuối -s/-ed", "Dropped -s/-ed endings"), B("Đọc to danh sách động từ quá khứ, ghi âm, nghe lại", "Read past-tense verb lists aloud, record and check")]
          ] }
      ],
      vocab: [
        { w: "distractor", pos: "n", ipa: "/dɪˈstræktə/", vi: "phương án gây nhiễu", en: "a wrong option designed to look correct", ex: "The first number the caller says is a distractor.", col: "a deliberate / obvious distractor" },
        { w: "signpost", pos: "n", ipa: "/ˈsaɪnpəʊst/", vi: "từ/cụm chuyển ý báo hiệu phần mới", en: "a word or phrase that shows a new section is starting", ex: "'Let's turn to the benefits' is a clear signpost.", col: "listen for signposts; a verbal signpost" },
        { w: "paraphrase", pos: "v", ipa: "/ˈpærəfreɪz/", vi: "diễn đạt lại bằng từ khác", en: "to express the same meaning using different words", ex: "If you forget a word, paraphrase it.", col: "paraphrase a question / an idea" },
        { w: "hesitation", pos: "n", ipa: "/ˌhezɪˈteɪʃn/", vi: "sự ngập ngừng", en: "a pause before saying or doing something", ex: "Long hesitation can lower your fluency score.", col: "without hesitation; a brief hesitation" },
        { w: "elaborate", pos: "v", ipa: "/ɪˈlæbəreɪt/", vi: "nói/giải thích thêm chi tiết", en: "to give more details about something", ex: "Try to elaborate with a reason and an example.", col: "elaborate on a point" },
        { w: "self-correct", pos: "v", ipa: "/ˌself kəˈrekt/", vi: "tự sửa lỗi khi đang nói", en: "to notice and fix your own mistake", ex: "It is fine to self-correct quickly and continue.", col: "self-correct naturally" },
        { w: "enrol", pos: "v", ipa: "/ɪnˈrəʊl/", vi: "đăng ký (khoá học)", en: "to officially join a course", ex: "She enrolled on a six-week cooking course.", col: "enrol on / in a course" },
        { w: "deposit", pos: "n", ipa: "/dɪˈpɒzɪt/", vi: "tiền đặt cọc", en: "money paid first, returned later or used as part payment", ex: "The deposit is returned when you bring the bikes back.", col: "pay / refund a deposit" },
        { w: "allergy", pos: "n", ipa: "/ˈælədʒi/", vi: "dị ứng", en: "a medical condition causing a bad reaction to something", ex: "Please tell the tutor about any food allergy.", col: "have an allergy to sth; a nut allergy" },
        { w: "habitat", pos: "n", ipa: "/ˈhæbɪtæt/", vi: "môi trường sống", en: "the natural home of a plant or animal", ex: "Green roofs can provide habitat for insects.", col: "natural habitat; habitat loss" },
        { w: "insulation", pos: "n", ipa: "/ˌɪnsjuˈleɪʃn/", vi: "sự cách nhiệt", en: "material or a layer that stops heat passing through", ex: "The roof provides insulation in summer and winter.", col: "provide / improve insulation" },
        { w: "membrane", pos: "n", ipa: "/ˈmembreɪn/", vi: "lớp màng", en: "a thin layer that covers or protects something", ex: "A waterproof membrane protects the building.", col: "a waterproof membrane" },
        { w: "refinement", pos: "n", ipa: "/rɪˈfaɪnmənt/", vi: "sự điều chỉnh cho chính xác hơn", en: "a small change that improves something", ex: "Changing the research question was a useful refinement.", col: "a useful / further refinement" },
        { w: "retrain", pos: "v", ipa: "/ˌriːˈtreɪn/", vi: "đào tạo lại (để đổi nghề)", en: "to learn new skills for a different job", ex: "Many adults retrain later in their careers.", col: "retrain as a nurse; retrain for a new job" }
      ],
      examples: [
        { label: B("Bẫy sửa thông tin", "Correction trap"),
          text: "How many people? — Twelve. Oh, sorry, actually fourteen — two more friends just confirmed.",
          note: B("Đáp án: 14. Từ 'sorry, actually' báo hiệu thông tin sẽ được sửa.", "Answer: 14. 'sorry, actually' signals that the information is being corrected."), speak: true },
        { label: B("Bẫy 'không còn nữa'", "'No longer' trap"),
          text: "We used to lend aprons out, but we don't do that any more, so please bring your own.",
          note: B("Nếu câu hỏi là 'Bring your own ___' → apron. 'lend' là điều đã thay đổi, không phải đáp án.", "If the question is 'Bring your own ___' → apron. Lending is what has changed, not the answer."), speak: true },
        { label: B("Paraphrase khi quên từ", "Paraphrasing a forgotten word"),
          text: "I always carry, um, the thing you hold over your head when it rains — an umbrella — because the weather changes so quickly.",
          note: B("Giữ được mạch nói thay vì dừng lâu; nhớ ra từ thì nói luôn.", "Keeps the answer flowing instead of a long pause; add the word if it comes back."), speak: true },
        { label: B("Answer – Reason – Example (Part 1)", "Answer – Reason – Example (Part 1)"),
          text: "Yes, I listen to music almost every day, mainly because it makes my commute feel shorter. For instance, this morning I listened to a whole album on the bus without noticing the traffic.",
          note: B("3 câu, khoảng 15–20 giây: đủ dài cho Part 1, không lan man.", "Three sentences, about 15–20 seconds: long enough for Part 1 without rambling."), speak: true }
      ],
      mistakes: [
        B("Viết ngay con số đầu tiên nghe được, không chờ người nói sửa lại.", "Writing the first number you hear without waiting for a correction."),
        B("Bỏ -s ở danh từ số nhiều hoặc sai một chữ trong tên được đánh vần.", "Dropping the plural -s or getting one letter wrong in a spelled name."),
        B("Lỡ một câu rồi hoảng, bỏ lỡ luôn 2–3 câu sau.", "Missing one answer, panicking and losing the next two or three."),
        B("Speaking Part 1 trả lời một từ ('Yes.', 'Sometimes.').", "Giving one-word answers in Speaking Part 1 ('Yes.', 'Sometimes.')."),
        B("Học thuộc câu trả lời dài cho Part 2; nghe máy móc và dễ lệch đề.", "Memorising long Part 2 answers; they sound mechanical and often go off-topic."),
        B("Nuốt âm cuối: 'I watch' thay cho 'I watched' khi kể chuyện quá khứ.", "Dropping endings: 'I watch' instead of 'I watched' when telling a past story.")
      ],
      exercises: [
        { id: "w11-ex01", type: "gap", ref: "w11-l0", limit: { words: 1, number: true },
          q: "Hire period: the ___ day", accept: ["whole"],
          why: B("Người gọi nói 'Half a day… Actually, no, let's say the whole day' → thông tin cuối là 'whole'.", "The caller says 'Half a day… Actually, no, let's say the whole day' → the final answer is 'whole'.") },
        { id: "w11-ex02", type: "gap", ref: "w11-l0", limit: { words: 1, number: true },
          q: "Price per bike for the day: £___", accept: ["30", "thirty"],
          why: B("'That's thirty pounds per bike for the day'.", "'That's thirty pounds per bike for the day'.") },
        { id: "w11-ex03", type: "gap", ref: "w11-l0", limit: { words: 1, number: true },
          q: "Helmet: £___ extra each", accept: ["2", "two"],
          why: B("Mũ bảo hiểm 'used to' được tính trong giá, nay là 'an extra two pounds each' → 2.", "Helmets 'used to' be included; now they are 'an extra two pounds each' → 2.") },
        { id: "w11-ex04", type: "gap", ref: "w11-l0", limit: { words: 1, number: true },
          q: "Deposit: £___ (returned with the bikes)", accept: ["50", "fifty"],
          why: B("'the deposit's fifty pounds, and you get it back when you return the bikes'.", "'the deposit's fifty pounds, and you get it back when you return the bikes'.") },
        { id: "w11-ex05", type: "gap", ref: "w11-l0", limit: { words: 1, number: false },
          q: "Customer surname: ___", accept: ["Holm"],
          why: B("Người gọi đánh vần H-O-L-M. Tên đánh vần phải chép đúng từng chữ.", "The caller spells H-O-L-M. Spelled names must be copied exactly.") },
        { id: "w11-ex06", type: "gap", ref: "w11-l0", limit: { words: 1, number: true },
          q: "All-day bikes can be collected from ___ a.m.", accept: ["9", "nine"],
          why: B("Cửa hàng mở 8:30 nhưng xe thuê cả ngày lấy từ 9 giờ — 8:30 là phương án gây nhiễu.", "The shop opens at half past eight, but all-day bikes are collected from nine — 8:30 is the distractor.") },
        { id: "w11-ex07", type: "mcq", tag: "correction-trap",
          q: B("Vì sao 'half' là đáp án sai ở câu 1?", "Why is 'half' wrong for question 1?"),
          opts: ["It is two words", "The speaker corrects herself immediately afterwards", "It is not mentioned", "It is spelled incorrectly"],
          a: 1,
          why: B("'Actually, no, let's say the whole day' — từ 'actually, no' báo hiệu thông tin được sửa.", "'Actually, no, let's say the whole day' — 'actually, no' signals a correction.") },
        { id: "w11-ex08", type: "mcq", tag: "paraphrase",
          q: B("Speaking: bạn quên từ 'umbrella' giữa câu. Cách xử lý tốt nhất?", "Speaking: you forget the word 'umbrella' mid-sentence. Best response?"),
          opts: ["Stop and say 'I don't know the word'", "Switch to Vietnamese for that word", "Say 'the thing you hold over your head when it rains' and continue", "Change the topic completely"],
          a: 2,
          why: B("Paraphrase giữ mạch nói (Fluency) và cho thấy khả năng xoay xở từ vựng (Lexical Resource).", "Paraphrasing keeps you fluent and shows you can manage vocabulary gaps (Lexical Resource).") },
        { id: "w11-ex09", type: "order", scoreEach: true, tag: "ARE",
          q: B("Gán vai trò Answer / Reason / Example cho từng câu (Part 1: 'Do you like cooking?').", "Label each sentence Answer / Reason / Example (Part 1: 'Do you like cooking?')."),
          items: ["Last weekend, for instance, I made a fish soup for my whole family.", "Yes, I really enjoy cooking, especially at weekends.", "It helps me relax after a busy week."],
          labels: ["Answer", "Reason", "Example"],
          a: ["Example", "Answer", "Reason"],
          why: B("Trả lời thẳng (Answer) → lý do (Reason: giúp thư giãn) → ví dụ cụ thể (Example: cuối tuần trước).", "Direct answer → reason (it helps me relax) → specific example (last weekend).") },
        { id: "w11-ex10", type: "mcq", tag: "pronunciation",
          q: B("Từ nào có đuôi -ed đọc là /ɪd/?", "Which word has an -ed ending pronounced /ɪd/?"),
          opts: ["played", "watched", "wanted", "cleaned"],
          a: 2,
          why: B("-ed đọc /ɪd/ sau âm /t/ hoặc /d/: wanted. played, cleaned → /d/; watched → /t/.", "-ed is /ɪd/ after /t/ or /d/: wanted. played and cleaned → /d/; watched → /t/.") }
      ],
      summary: [
        B("Luyện theo nhãn lỗi nhiều nhất trong nhật ký, không chỉ làm thêm đề.", "Practise your most frequent error label, not just more tests."),
        B("Chờ thông tin cuối khi nghe 'sorry', 'actually'; cảnh giác 'used to', 'not any more'.", "Wait for the final version after 'sorry', 'actually'; watch out for 'used to', 'not any more'."),
        B("Lỡ câu → nghe signpost kế tiếp để bắt lại vị trí.", "Missed an answer → listen for the next signpost to find your place."),
        B("Speaking: câu giờ tự nhiên, paraphrase, Answer – Reason – Example; tự ghi âm và so với tuần 4/7.", "Speaking: natural thinking time, paraphrase, Answer – Reason – Example; record yourself and compare with weeks 4/7.")
      ]
    },

    // -------------------------------------------------------------------- QUIZ
    quiz: {
      title: B("Kiểm tra tuần 11 – Bẫy Listening và sửa lỗi Speaking", "Week 11 check – Listening traps and Speaking repairs"),
      passPct: null, // PLAN tuần 11: tự kiểm tra bằng so sánh với tuần 4/7; quiz chỉ hiện % đúng.
      timeLimitMin: null,
      sections: [
        { id: "w11-s1", skill: "listening", ref: "w11-lq",
          title: B("Phần 1 – Nghe và ghi chú (Part 4 rút gọn)", "Part 1 – Listen and complete the notes (short Part 4 style)"),
          instructions: B("Nghe đoạn nói về khu vườn cộng đồng. Viết KHÔNG QUÁ HAI TỪ cho mỗi chỗ trống.", "Listen to the talk about a community garden. Write NO MORE THAN TWO WORDS for each answer."),
          questions: [
            { id: "w11-q01", type: "gap", limit: { words: 2, number: false },
              q: "The garden was built on an empty ___.", accept: ["car park", "carpark"],
              why: B("'started on an empty car park, not a park as many people think' — 'park' là bẫy.", "'started on an empty car park, not a park as many people think' — 'park' is the trap.") },
            { id: "w11-q02", type: "gap", limit: { words: 2, number: false },
              q: "It is managed by a ___ of volunteers.", accept: ["committee"],
              why: B("'there are no paid staff; it's managed by a committee of volunteers'.", "'there are no paid staff; it's managed by a committee of volunteers'.") },
            { id: "w11-q03", type: "gap", limit: { words: 2, number: false },
              q: "The yearly fee pays for water and ___.", accept: ["tools"],
              why: B("'a small yearly fee, which covers water and tools'. Nhớ -s số nhiều.", "'a small yearly fee, which covers water and tools'. Keep the plural -s.") },
            { id: "w11-q04", type: "gap", limit: { words: 2, number: false },
              q: "Most popular crop now: ___", accept: ["tomatoes"],
              why: B("'The most popular crop is tomatoes, although for the first two years it was beans' → beans là thông tin cũ.", "'The most popular crop is tomatoes, although for the first two years it was beans' → beans is the old information.") },
            { id: "w11-q05", type: "gap", limit: { words: 2, number: false },
              q: "Future plan: build a ___ next spring.", accept: ["greenhouse"],
              why: B("'The committee hopes to build a greenhouse next spring'.", "'The committee hopes to build a greenhouse next spring'.") }
          ] },
        { id: "w11-s2", skill: "mixed",
          title: B("Phần 2 – Chiến lược", "Part 2 – Strategy"),
          instructions: B("Chọn đáp án đúng hoặc viết câu trả lời.", "Choose the correct answer or write your answer."),
          questions: [
            { id: "w11-q06", type: "mcq", ref: "w11-lq", tag: "signpost",
              q: B("Trong bài nghe, cụm nào báo hiệu chuyển sang phần mới (cách vận hành khu vườn)?", "In the talk, which phrase signals the move to a new section (how the garden is run)?"),
              opts: ["as many people think", "Turning now to", "although", "so that"],
              a: 1,
              why: B("'Turning now to how it's run' là signpost mở phần mới; các cụm khác nối ý trong câu.", "'Turning now to how it's run' opens a new section; the others link ideas within a sentence.") },
            { id: "w11-q07", type: "mcq", ref: "w11-lq", tag: "distractor",
              q: B("Vì sao 'beans' là đáp án sai cho câu 4?", "Why is 'beans' wrong for question 4?"),
              opts: ["It was the most popular crop only in the past", "It is never mentioned", "It is more than two words", "It is the speaker's favourite"],
              a: 0,
              why: B("'for the first two years it was beans' → thông tin quá khứ; câu hỏi hỏi hiện tại ('now').", "'for the first two years it was beans' → past information; the question asks about now.") },
            { id: "w11-q08", type: "mcq", tag: "fluency",
              q: B("Câu nào tự nhiên nhất để có vài giây suy nghĩ trong Speaking Part 3?", "Which phrase sounds most natural to gain a few seconds of thinking time in Speaking Part 3?"),
              opts: ["I don't know.", "That's an interesting question — let me think for a second.", "Next question, please.", "(staying silent for ten seconds)"],
              a: 1,
              why: B("Câu giờ tự nhiên giữ mạch hội thoại; im lặng lâu hoặc từ chối trả lời ảnh hưởng Fluency.", "A natural thinking-time phrase keeps the conversation going; long silence or refusing to answer hurts Fluency.") },
            { id: "w11-q09", type: "text", tag: "ARE",
              q: B("Mở rộng câu trả lời theo Answer – Reason – Example. Q: 'Do you often use public transport?' A: 'No.'",
                   "Extend the answer using Answer – Reason – Example. Q: 'Do you often use public transport?' A: 'No.'"),
              model: ["Not very often, to be honest, mainly because the bus routes near my home are quite limited. For example, getting to my office by bus takes about an hour, whereas by motorbike it takes twenty minutes."],
              why: B("Có trả lời (Not very often), lý do (tuyến xe hạn chế) và ví dụ cụ thể (thời gian đi lại của bản thân). Câu trả lời khác vẫn đúng nếu đủ 3 phần.",
                     "It answers (Not very often), gives a reason (limited routes) and a specific personal example (journey times). Other answers are fine if they have all three parts.") },
            { id: "w11-q10", type: "mcq", tag: "pronunciation",
              q: B("Đuôi -es trong 'watches' đọc là gì?", "How is the -es in 'watches' pronounced?"),
              opts: ["/s/", "/z/", "/ɪz/", "silent"],
              a: 2,
              why: B("Sau âm /tʃ/, /ʃ/, /s/, /z/, /dʒ/ thì -s/-es đọc /ɪz/: watches, washes, buses.", "After /tʃ/, /ʃ/, /s/, /z/ and /dʒ/, -s/-es is pronounced /ɪz/: watches, washes, buses.") }
          ] }
      ]
    },

    passages: [],

    // ----------------------------------------------------------------- SCRIPTS
    scripts: [
      // Luyện tập trong bài học (nghe lại không giới hạn)
      { id: "w11-l0", kind: "listening", part: 1, lang: "en-GB", rate: 0.95, pauseMs: 600, transcript: "hidden", maxPlays: null, source: "tự soạn",
        speakers: [{ id: "A", name: "Assistant", voice: "male" }, { id: "B", name: "Customer", voice: "female" }],
        lines: [
          { sp: "A", text: "Hello, Cityride Bike Hire. How can I help?" },
          { sp: "B", text: "Hi, I'd like to hire two bikes for Saturday." },
          { sp: "A", text: "Certainly. Is that for the whole day?" },
          { sp: "B", text: "Half a day, please. Actually, no, let's say the whole day. We've got quite a long route planned." },
          { sp: "A", text: "No problem. That's thirty pounds per bike for the day. We used to include a helmet in the price, but now helmets are an extra two pounds each." },
          { sp: "B", text: "That's fine. Can I pay the deposit by card?" },
          { sp: "A", text: "Yes. The deposit's fifty pounds, and you get it back when you return the bikes. What name is the booking under?" },
          { sp: "B", text: "Holm. That's H-O-L-M." },
          { sp: "A", text: "Thank you. We open at half past eight, but bikes for all-day hire can be collected from nine." },
          { sp: "B", text: "Nine o'clock. Perfect, thanks." }
        ] },
      // Quiz tuần (nghe lại được)
      { id: "w11-lq", kind: "listening", part: 4, lang: "en-GB", rate: 0.95, pauseMs: 500, transcript: "hidden", maxPlays: null, source: "tự soạn",
        speakers: [{ id: "A", name: "Speaker", voice: "female" }],
        lines: [
          { sp: "A", text: "Today I'm going to describe the Elm Street community garden. First of all, its origins. The garden was started on an empty car park, not a park as many people think." },
          { sp: "A", text: "Turning now to how it's run. There are no paid staff; it's managed by a committee of volunteers who meet every month. Members pay a small yearly fee, which covers water and tools." },
          { sp: "A", text: "The most popular crop is tomatoes, although for the first two years it was beans." },
          { sp: "A", text: "Finally, plans for the future. The committee hopes to build a greenhouse next spring, so that members can grow vegetables in winter." }
        ] },

      // ---------------- MOCK LISTENING (maxPlays: 1) ----------------
      { id: "w11-l1", kind: "listening", part: 1, lang: "en-GB", rate: 0.95, pauseMs: 600, transcript: "hidden", maxPlays: 1, source: "tự soạn",
        speakers: [{ id: "A", name: "Mark (receptionist)", voice: "male" }, { id: "B", name: "Sarah (caller)", voice: "female" }],
        lines: [
          { sp: "A", text: "Good afternoon, Brookfield Community Kitchen. Mark speaking. How can I help you?" },
          { sp: "B", text: "Hello. I'm calling about your weekend cooking courses. I saw that you're starting some new ones in the spring." },
          { sp: "A", text: "That's right. Can I take your name first?" },
          { sp: "B", text: "Yes, it's Sarah Pellow." },
          { sp: "A", text: "Could you spell your surname for me?" },
          { sp: "B", text: "Of course. P-E-L-L-O-W." },
          { sp: "A", text: "Thank you. And which course are you interested in?" },
          { sp: "B", text: "Well, I was hoping to do the Italian course, but your website says it's full." },
          { sp: "A", text: "I'm afraid so. It always fills up quickly. We do still have places on the vegetarian course, though. That's very popular with beginners." },
          { sp: "B", text: "Actually, that sounds perfect. I've been trying to eat less meat anyway." },
          { sp: "A", text: "Great. The vegetarian course runs on Saturday mornings. The first group starts on the seventh of March, but that one's fully booked now, so the next start date would be the fourteenth of March." },
          { sp: "B", text: "The fourteenth is fine." },
          { sp: "A", text: "And it runs for six weeks. We used to do eight-week courses, but people found that a bit long." },
          { sp: "B", text: "Six weeks sounds about right. How much does it cost?" },
          { sp: "A", text: "The full price is ninety-five pounds per person. But if you book before the end of this month, it's eighty-five." },
          { sp: "B", text: "Oh good. I'd like to book today, then." },
          { sp: "A", text: "Lovely, so that's eighty-five pounds. Now, all the ingredients are provided, but there are a couple of things you'll need to bring." },
          { sp: "B", text: "OK." },
          { sp: "A", text: "Firstly, an apron. We used to lend them out, but we don't do that any more, I'm afraid." },
          { sp: "B", text: "That's fine, I've got one." },
          { sp: "A", text: "And it's a good idea to bring a container for leftovers. People usually cook more than they can eat, and it's a shame to waste it." },
          { sp: "B", text: "Good idea. Oh, I should mention that I have an allergy." },
          { sp: "A", text: "Thanks for telling me. What are you allergic to?" },
          { sp: "B", text: "Peanuts. Not other nuts, strangely, just peanuts." },
          { sp: "A", text: "I'll make a note of that and let the tutor know." },
          { sp: "B", text: "Thanks. Is there anywhere to park nearby?" },
          { sp: "A", text: "There's no parking at the kitchen itself, but you can use the car park behind the library. It's free on Saturdays and it's only a two-minute walk." },
          { sp: "B", text: "Behind the library. Great." },
          { sp: "A", text: "And finally, just for our records, how did you hear about the course?" },
          { sp: "B", text: "Well, a friend did mention it, but I'd already seen a leaflet in the window of the bakery, so I suppose it was the leaflet really." },
          { sp: "A", text: "Perfect, thank you, Sarah. I'll email you a confirmation this afternoon." }
        ] },

      { id: "w11-l2", kind: "listening", part: 2, lang: "en-GB", rate: 0.95, pauseMs: 500, transcript: "hidden", maxPlays: 1, source: "tự soạn",
        speakers: [{ id: "A", name: "Priya (volunteer coordinator)", voice: "female" }],
        lines: [
          { sp: "A", text: "Good morning, everyone, and welcome to Hallowmere Wetland Reserve. My name's Priya, and I coordinate the volunteer programme here. Before you start, I'd like to tell you a little about the reserve and explain what you'll be doing over the next few weeks." },
          { sp: "A", text: "The reserve opened to the public about fifteen years ago, on land that used to be a gravel quarry. When the quarry closed, the pits gradually filled with water, and the site was bought by a local wildlife trust. Many people assume it was always a natural wetland, but in fact almost everything you see here was shaped by human activity." },
          { sp: "A", text: "Now, our volunteers do a wide range of work, but the thing we need most help with at the moment is not, as many people expect, looking after the birds. It's actually helping with visitors. We've had a big increase in school groups this year, and we simply don't have enough staff to guide them." },
          { sp: "A", text: "As for training, every new volunteer attends a half-day session on safety. You might think the main risk here is the water, and of course you need to be careful near the edges, but most of the accidents we've had involve tools, usually people cutting themselves while clearing plants. So the safety session focuses mainly on that." },
          { sp: "A", text: "Regarding times, the reserve opens at eight in the morning, but on your first day please arrive by half past eight so that we can sign you in. After that, you can come at any time that suits you, as long as you let us know in advance." },
          { sp: "A", text: "There's a café near the main entrance, and volunteers get a discount there. However, I'd recommend bringing your own lunch on busy days, because the queues can be very long at weekends." },
          { sp: "A", text: "Right, let me tell you where the different tasks take place. If you look at the map in your welcome pack, you'll see five main areas." },
          { sp: "A", text: "At the Visitor Centre, most of the work involves leading the school groups I mentioned. You'll meet the teachers there and take the children on short walks. We don't ask volunteers to sell tickets; our paid staff do that." },
          { sp: "A", text: "At the North Lake, there's a hide, which is a small wooden shelter for watching wildlife, and that's where our weekly bird count happens. Volunteers who are good with binoculars usually enjoy that." },
          { sp: "A", text: "The Reed Beds need a lot of physical work in winter. The reeds grow so quickly that they have to be cut back, otherwise the open water disappears." },
          { sp: "A", text: "Along the Woodland Trail, storms often bring down branches, and clearing them so that the paths stay safe is a regular job. The fences there were repaired last year, so they shouldn't need attention for a while." },
          { sp: "A", text: "And finally, the Meadow. In summer we run a survey there, and volunteers walk a set route recording the butterflies they see. It's one of our most popular tasks, so do sign up early." }
        ] },

      { id: "w11-l3", kind: "listening", part: 3, lang: "en-GB", rate: 0.95, pauseMs: 600, transcript: "hidden", maxPlays: 1, source: "tự soạn",
        speakers: [{ id: "T", name: "Dr Rees (tutor)", voice: "male" }, { id: "H", name: "Hana", voice: "female" }, { id: "L", name: "Leo", voice: "male" }],
        lines: [
          { sp: "T", text: "Come in, Hana, Leo. So, you wanted to talk about your project on how students use the library. How's it going?" },
          { sp: "H", text: "Quite well, I think. We've done a few test interviews, and they changed our thinking quite a lot." },
          { sp: "T", text: "In what way?" },
          { sp: "H", text: "Well, originally we wanted to find out why students choose the library rather than studying at home. But after the test interviews, we realised the more interesting question is which areas of the library people use, and why." },
          { sp: "T", text: "That's a useful refinement. What made you change your minds?" },
          { sp: "L", text: "Mainly one thing that really surprised us. Almost everyone we spoke to said they do a lot of their studying in the café area on the ground floor, not in the quiet reading rooms." },
          { sp: "H", text: "We'd assumed the silent floor would be the most popular, but several people said it feels too formal." },
          { sp: "T", text: "Interesting. So, let's go through the parts of your plan. Start with the questionnaire." },
          { sp: "L", text: "At the moment it has thirty questions." },
          { sp: "T", text: "Thirty is a lot. In my experience, people stop paying proper attention after about ten minutes, and the answers at the end become careless. I'm not worried about printing or analysis; it's really about attention." },
          { sp: "H", text: "So we should cut it down?" },
          { sp: "T", text: "I'd aim for about fifteen. Some of your questions are about opening hours, and that's not your focus any more." },
          { sp: "L", text: "OK, we'll make it shorter." },
          { sp: "T", text: "And how were you going to distribute it?" },
          { sp: "L", text: "I wanted to put it on the student forum, because it's quick." },
          { sp: "H", text: "But I think we'd only hear from a certain kind of student. The people who read the forum tend to be very active already." },
          { sp: "T", text: "That's a fair point. Paper copies at the entrance would reach a wider range of people, although they take longer to process. Why not do both, and compare the results?" },
          { sp: "H", text: "That would make an interesting section in the report. Let's do that." },
          { sp: "T", text: "Good. Now, the interviews." },
          { sp: "L", text: "We were planning to start them next week." },
          { sp: "T", text: "Next week is the start of the exam period, isn't it? Students won't want to give up their time, and they won't be behaving normally either." },
          { sp: "H", text: "True. We could leave them until after the exams, at the start of next term." },
          { sp: "T", text: "I think that's sensible. And the observation?" },
          { sp: "L", text: "The idea is to sit in different areas and record how the space is used. We'd planned to do that after the holidays." },
          { sp: "T", text: "Actually, I'd do the opposite of the interviews there. If you want to see normal patterns, you should observe before the exams begin. So start as soon as you can, this week if possible." },
          { sp: "H", text: "OK, so we'll bring that forward." },
          { sp: "L", text: "One thing I'm worried about is privacy. Do we need permission from everyone we observe?" },
          { sp: "T", text: "Not if you don't identify anyone. Just count how many people are in each area and what they're doing: reading, using laptops, talking. Don't write down names or take photographs." },
          { sp: "L", text: "That's a relief." },
          { sp: "T", text: "And finally, the literature review." },
          { sp: "H", text: "We've read about eight articles so far. Do we need to change anything?" },
          { sp: "T", text: "No, that looks fine. Carry on as you planned." },
          { sp: "H", text: "Great. So what's the next step, Leo?" },
          { sp: "L", text: "I'll email the library manager to ask for a floor plan, so that we can divide the building into areas for the observation. And Hana's going to rewrite the questionnaire." },
          { sp: "T", text: "Excellent. Let's meet again in two weeks." }
        ] },

      { id: "w11-l4", kind: "listening", part: 4, lang: "en-GB", rate: 0.95, pauseMs: 500, transcript: "hidden", maxPlays: 1, source: "tự soạn",
        speakers: [{ id: "A", name: "Lecturer", voice: "female" }],
        lines: [
          { sp: "A", text: "Good morning. In today's lecture, I'm going to look at green roofs, which are becoming an increasingly common feature of urban buildings. I'll explain how they're constructed, the main types, the benefits they offer, and finally some of the challenges." },
          { sp: "A", text: "So, first of all, what exactly is a green roof? Put simply, it's a roof that is partly or completely covered with plants. That might sound straightforward, but you can't simply put earth on top of a building and hope for the best. A green roof is really a system of several layers, each with a specific job." },
          { sp: "A", text: "Starting from the bottom, the most important layer is the waterproof membrane. Its job is to protect the building itself; if water gets through to the structure below, the damage can be serious and expensive to repair. Above that there's usually a root barrier, which stops plant roots from growing down into the membrane." },
          { sp: "A", text: "Then comes a drainage layer, which removes excess water so that the plants are not left sitting in water after heavy rain. On top of this is the growing medium. This is not ordinary soil, which would be far too heavy when wet. Instead, it's a specially designed material that is much lighter than soil but still holds enough water and nutrients for the plants." },
          { sp: "A", text: "Now, green roofs are usually divided into two main types. Extensive green roofs have a shallow growing medium, often only a few centimetres deep, and they're planted with tough, low-growing species such as sedums. Their great advantage is that they need very little maintenance; once established, they might only be checked once or twice a year." },
          { sp: "A", text: "Intensive green roofs, on the other hand, are much deeper and can support a wide variety of plants, even small trees. These are more like roof gardens, and people can often walk on them. But because they're so much heavier, they require a stronger structure, so they are usually planned when a building is designed rather than added later." },
          { sp: "A", text: "Let's turn to the benefits. One of the most important is that green roofs absorb rainwater. On a conventional roof, rain runs off immediately into the drains, and in heavy storms this can overwhelm the drainage system and contribute to flooding. A green roof holds some of the water and releases the rest more slowly." },
          { sp: "A", text: "Secondly, green roofs provide insulation. In summer in particular, they keep the building below noticeably cooler, which can reduce the need for air conditioning. Thirdly, there's an ecological benefit. Green roofs provide habitat for insects and birds in areas where there may be very little green space at ground level." },
          { sp: "A", text: "Finally, the challenges. The most obvious is the higher initial cost. A green roof costs more to install than a conventional roof, although supporters argue that it may last longer because the membrane is protected from direct sunlight. The other key issue is weight. Even a lightweight extensive roof adds a significant load, especially when the growing medium is full of water. So before any installation, an engineer must check whether the existing roof can carry the extra weight." },
          { sp: "A", text: "In the next lecture, we'll look at how these ideas have been applied in practice." }
        ] },

      // ---------------- MOCK SPEAKING ----------------
      { id: "w11-s1", kind: "speaking-prompt", part: 1, lang: "en-GB", rate: 0.95, pauseMs: 500, transcript: "shown", maxPlays: null, source: "tự soạn",
        speakers: [{ id: "E", name: "Examiner", voice: "female" }],
        lines: [
          { sp: "E", text: "Good afternoon. This is the speaking test practice. In this first part, I'd like to ask you some questions about yourself." },
          { sp: "E", text: "Let's start with your work or studies." }
        ] },
      { id: "w11-s2", kind: "speaking-prompt", part: 2, lang: "en-GB", rate: 0.95, pauseMs: 500, transcript: "shown", maxPlays: null, source: "tự soạn",
        speakers: [{ id: "E", name: "Examiner", voice: "female" }],
        lines: [
          { sp: "E", text: "Now I'm going to give you a topic, and I'd like you to talk about it for one to two minutes. Before you talk, you'll have one minute to think about what you're going to say. You can make some notes if you wish." },
          { sp: "E", text: "Here is your topic. I'd like you to describe a skill that took you a long time to learn." }
        ] },
      { id: "w11-s3", kind: "speaking-prompt", part: 3, lang: "en-GB", rate: 0.95, pauseMs: 500, transcript: "shown", maxPlays: null, source: "tự soạn",
        speakers: [{ id: "E", name: "Examiner", voice: "female" }],
        lines: [
          { sp: "E", text: "We've been talking about a skill you learned. I'd now like to discuss with you some more general questions related to this." }
        ] },
      { id: "w11-sm2", kind: "speaking-model", part: 2, lang: "en-GB", rate: 0.95, pauseMs: 400, transcript: "hidden", maxPlays: null, source: "tự soạn",
        speakers: [{ id: "C", name: "Candidate (model)", voice: "male" }],
        lines: [
          { sp: "C", text: "I'd like to talk about learning to cook, which is something I'm still not brilliant at, but I've improved a lot." },
          { sp: "C", text: "I started when I moved away from home to go to university, so I was about eighteen. Before that, my mother did all the cooking, and to be honest, I couldn't even make a decent omelette. At first I mostly lived on instant noodles, which was cheap but, as you can imagine, not very healthy." },
          { sp: "C", text: "The reason it took me so long is partly that I didn't have anyone to teach me. I tried following videos online, but they always made it look much easier than it was, and the presenter never seemed to burn anything. I also didn't have much time, because I had classes all day and a part-time job in the evenings. So for the first couple of years, I'd try a new dish maybe once a month, it would go wrong, and I'd lose confidence and go back to noodles." },
          { sp: "C", text: "What changed things was that I started cooking with a flatmate who was really good. Watching someone actually do it, and being able to ask questions, made a huge difference. I learned simple things, like how to control the heat, which no video had ever really explained to me." },
          { sp: "C", text: "These days I feel quite proud of it. I can cook maybe ten or fifteen dishes without a recipe, and I really enjoy having friends round for dinner. It's also made me appreciate how much work my mother used to do for the whole family." }
        ] }
    ],

    // -------------------------------------------------------------------- MOCK
    mock: {
      title: B("Mock tuần 11 – Listening (4 phần, 40 câu) + Speaking (3 phần, 11–14 phút)", "Week 11 mock – Listening (4 parts, 40 questions) + Speaking (3 parts, 11–14 minutes)"),
      note: B("Listening: mỗi kịch bản chỉ phát MỘT lần, giọng đọc của trình duyệt (khác giọng thi thật). Dùng tai nghe, không xem transcript cho đến khi nộp bài. Speaking: tự ghi âm bằng ứng dụng của máy.",
              "Listening: each script plays ONCE only, using the browser's voice (different from real test recordings). Use headphones and do not open the transcript until you submit. Speaking: record yourself with your device's recorder."),
      sections: [
        { id: "w11-mL", skill: "listening", timeLimitMin: 40, readAheadSec: 30, reviewMin: 2,
          refs: ["w11-l1", "w11-l2", "w11-l3", "w11-l4"],
          title: B("Listening – 4 phần, 40 câu", "Listening – 4 parts, 40 questions"),
          instructions: B("Trước mỗi phần có 30 giây đọc câu hỏi. Kịch bản phát một lần; ghi đáp án trong khi nghe. Sau phần 4 có 2 phút soát chính tả và giới hạn từ. Đồng hồ 40 phút bao trùm toàn bộ (thời lượng đọc TTS thay đổi theo máy).",
                          "Before each part you have 30 seconds to read the questions. Each script plays once; write your answers while listening. After Part 4 you have 2 minutes to check spelling and word limits. The 40-minute timer covers everything (TTS reading time varies by device)."),
          groups: [
            { start: "w11-m01", end: "w11-m10", ref: "w11-l1", instructions: B("Phần 1 – Câu 1–10: Hoàn thành phiếu. Viết MỘT TỪ VÀ/HOẶC MỘT SỐ.", "Part 1 – Questions 1–10: Complete the form. Write ONE WORD AND/OR A NUMBER.") },
            { start: "w11-m11", end: "w11-m15", ref: "w11-l2", instructions: B("Phần 2 – Câu 11–15: Chọn đáp án đúng A, B, C hoặc D.", "Part 2 – Questions 11–15: Choose the correct letter, A, B, C or D.") },
            { start: "w11-m16", end: "w11-m16", ref: "w11-l2", instructions: B("Phần 2 – Câu 16–20: Mỗi khu vực có công việc tình nguyện nào? Chọn A–G (có 2 lựa chọn thừa).", "Part 2 – Questions 16–20: Which volunteer task takes place in each area? Choose A–G (two options are not used).") },
            { start: "w11-m21", end: "w11-m25", ref: "w11-l3", instructions: B("Phần 3 – Câu 21–25: Chọn đáp án đúng A, B, C hoặc D.", "Part 3 – Questions 21–25: Choose the correct letter, A, B, C or D.") },
            { start: "w11-m26", end: "w11-m26", ref: "w11-l3", instructions: B("Phần 3 – Câu 26–30: Các bạn quyết định gì với từng phần của dự án? Chọn A–F (có 1 lựa chọn thừa).", "Part 3 – Questions 26–30: What do the students decide about each part of the project? Choose A–F (one option is not used).") },
            { start: "w11-m31", end: "w11-m40", ref: "w11-l4", instructions: B("Phần 4 – Câu 31–40: Hoàn thành ghi chú. Viết MỘT TỪ DUY NHẤT.", "Part 4 – Questions 31–40: Complete the notes. Write ONE WORD ONLY.") }
          ],
          questions: [
            // Part 1 — form
            { id: "w11-m01", type: "gap", ref: "w11-l1", limit: { words: 1, number: true },
              q: "Name: Sarah ___", accept: ["Pellow"],
              why: B("Người gọi đánh vần P-E-L-L-O-W; phải đủ hai chữ L.", "The caller spells P-E-L-L-O-W; both Ls are needed.") },
            { id: "w11-m02", type: "gap", ref: "w11-l1", limit: { words: 1, number: true },
              q: "Course: ___ cooking", accept: ["vegetarian"],
              why: B("Lớp Italian đã đầy (bẫy); cô chọn 'the vegetarian course'.", "The Italian course is full (the trap); she chooses 'the vegetarian course'.") },
            { id: "w11-m03", type: "gap", ref: "w11-l1", limit: { words: 1, number: true },
              q: "Start date: ___ March", accept: ["14", "14th", "fourteenth"],
              why: B("Ngày 7/3 đã kín chỗ; ngày bắt đầu tiếp theo là 'the fourteenth of March'.", "The 7 March group is full; the next start date is 'the fourteenth of March'.") },
            { id: "w11-m04", type: "gap", ref: "w11-l1", limit: { words: 1, number: true },
              q: "Length of course: ___ weeks", accept: ["6", "six"],
              why: B("'it runs for six weeks. We used to do eight-week courses' → 8 là thông tin cũ.", "'it runs for six weeks. We used to do eight-week courses' → 8 is old information.") },
            { id: "w11-m05", type: "gap", ref: "w11-l1", limit: { words: 1, number: true },
              q: "Price paid: £___", accept: ["85", "eighty-five"],
              why: B("Giá đầy đủ 95, đặt trước cuối tháng còn 85; cô đặt ngay hôm nay → 85.", "Full price 95; booking before the end of the month costs 85, and she books today → 85.") },
            { id: "w11-m06", type: "gap", ref: "w11-l1", limit: { words: 1, number: true },
              q: "Bring: an ___", accept: ["apron"],
              why: B("'Firstly, an apron. We used to lend them out, but we don't do that any more' → phải tự mang.", "'Firstly, an apron. We used to lend them out, but we don't do that any more' → you must bring one.") },
            { id: "w11-m07", type: "gap", ref: "w11-l1", limit: { words: 1, number: true },
              q: "Also bring: a container for ___", accept: ["leftovers"],
              why: B("'bring a container for leftovers' — giữ -s số nhiều.", "'bring a container for leftovers' — keep the plural -s.") },
            { id: "w11-m08", type: "gap", ref: "w11-l1", limit: { words: 1, number: true },
              q: "Allergy: ___", accept: ["peanuts", "peanut"],
              why: B("'Peanuts. Not other nuts' → không viết 'nuts'. 'peanut' cũng chấp nhận vì vẫn đúng loại thực phẩm (quyết định tự soạn của app).", "'Peanuts. Not other nuts' → do not write 'nuts'. 'peanut' is also accepted as it names the same food (a self-written app decision).") },
            { id: "w11-m09", type: "gap", ref: "w11-l1", limit: { words: 1, number: true },
              q: "Parking: use the car park behind the ___", accept: ["library"],
              why: B("'you can use the car park behind the library'.", "'you can use the car park behind the library'.") },
            { id: "w11-m10", type: "gap", ref: "w11-l1", limit: { words: 1, number: true },
              q: "Heard about the course from: a ___", accept: ["leaflet"],
              why: B("Bạn có nhắc (bẫy), nhưng cô đã thấy tờ rơi trước: 'so I suppose it was the leaflet really'.", "A friend mentioned it (the trap), but she had already seen a leaflet: 'so I suppose it was the leaflet really'.") },
            // Part 2 — MCQ
            { id: "w11-m11", type: "mcq", ref: "w11-l2",
              q: "What was the reserve before it opened to the public?",
              opts: ["A. farmland", "B. a gravel quarry", "C. a military site", "D. a natural wetland"],
              a: 1,
              why: B("'on land that used to be a gravel quarry'. D là bẫy: 'Many people assume it was always a natural wetland'.", "'on land that used to be a gravel quarry'. D is the trap: 'Many people assume it was always a natural wetland'.") },
            { id: "w11-m12", type: "mcq", ref: "w11-l2",
              q: "What does the reserve need most help with at the moment?",
              opts: ["A. looking after birds", "B. helping with visitors", "C. repairing paths", "D. raising money"],
              a: 1,
              why: B("'not, as many people expect, looking after the birds. It's actually helping with visitors' (nhóm học sinh tăng).", "'not, as many people expect, looking after the birds. It's actually helping with visitors' (more school groups).") },
            { id: "w11-m13", type: "mcq", ref: "w11-l2",
              q: "According to Priya, most accidents at the reserve have involved",
              opts: ["A. falling into the water", "B. using tools", "C. slippery paths", "D. insect bites"],
              a: 1,
              why: B("'most of the accidents we've had involve tools'. Nước được nhắc nhưng chỉ là điều người ta nghĩ.", "'most of the accidents we've had involve tools'. Water is mentioned only as what people might think.") },
            { id: "w11-m14", type: "mcq", ref: "w11-l2",
              q: "On their first day, volunteers should arrive by",
              opts: ["A. 8.00 a.m.", "B. 8.30 a.m.", "C. 9.00 a.m.", "D. any time they choose"],
              a: 1,
              why: B("Khu bảo tồn mở lúc 8 giờ (bẫy), nhưng ngày đầu 'please arrive by half past eight'. 'any time' chỉ áp dụng từ ngày sau.", "The reserve opens at eight (the trap), but on the first day 'please arrive by half past eight'. 'Any time' applies only afterwards.") },
            { id: "w11-m15", type: "mcq", ref: "w11-l2",
              q: "What does Priya recommend about lunch?",
              opts: ["A. using the café to get a discount", "B. bringing food on busy days", "C. eating in the bird hide", "D. leaving the reserve at lunchtime"],
              a: 1,
              why: B("Có giảm giá ở café (bẫy A), nhưng 'I'd recommend bringing your own lunch on busy days'.", "There is a café discount (trap A), but 'I'd recommend bringing your own lunch on busy days'.") },
            // Part 2 — matching
            { id: "w11-m16", type: "matching", kind: "feature", ref: "w11-l2", scoreEach: true, reuse: false,
              q: "Questions 16–20: Which task takes place in each area?",
              items: ["16. Visitor Centre", "17. North Lake", "18. Reed Beds", "19. Woodland Trail", "20. Meadow"],
              options: ["A. counting birds", "B. leading school groups", "C. clearing fallen branches", "D. cutting back reeds", "E. selling tickets", "F. recording butterflies", "G. repairing fences"],
              a: [1, 0, 3, 2, 5],
              why: B("Visitor Centre: dẫn nhóm học sinh (B) — bán vé là việc của nhân viên (E bẫy). North Lake: đếm chim hằng tuần (A). Reed Beds: cắt bớt lau sậy (D). Woodland Trail: dọn cành gãy (C) — hàng rào đã sửa năm ngoái (G bẫy). Meadow: ghi chép bướm (F).",
                     "Visitor Centre: leading school groups (B) — paid staff sell tickets (E is a trap). North Lake: weekly bird count (A). Reed Beds: cutting back reeds (D). Woodland Trail: clearing branches (C) — fences were repaired last year (G is a trap). Meadow: recording butterflies (F).") },
            // Part 3 — MCQ
            { id: "w11-m21", type: "mcq", ref: "w11-l3",
              q: "How has the students' research question changed?",
              opts: ["A. It now focuses on which areas of the library students use", "B. It now compares two universities", "C. It now looks at the library's online services", "D. It now focuses on opening hours"],
              a: 0,
              why: B("Hana: 'the more interesting question is which areas of the library people use, and why'. Giờ mở cửa 'not your focus any more'.", "Hana: 'the more interesting question is which areas of the library people use, and why'. Opening hours are 'not your focus any more'.") },
            { id: "w11-m22", type: "mcq", ref: "w11-l3",
              q: "What surprised the students in the test interviews?",
              opts: ["A. Many students study in the café area", "B. Most students prefer to study at home", "C. The silent floor was always full", "D. Few students bring laptops"],
              a: 0,
              why: B("Leo: hầu hết nói học nhiều ở 'the café area on the ground floor'. Họ từng nghĩ tầng yên lặng phổ biến nhất (bẫy C).", "Leo: almost everyone studies a lot in 'the café area on the ground floor'. They had assumed the silent floor was most popular (trap C).") },
            { id: "w11-m23", type: "mcq", ref: "w11-l3",
              q: "Why does the tutor recommend a shorter questionnaire?",
              opts: ["A. Printing would be too expensive", "B. The results would be hard to analyse", "C. People stop paying attention after about ten minutes", "D. Some questions are too personal"],
              a: 2,
              why: B("'people stop paying proper attention after about ten minutes… I'm not worried about printing or analysis' → loại A, B.", "'people stop paying proper attention after about ten minutes… I'm not worried about printing or analysis' → A and B are ruled out.") },
            { id: "w11-m24", type: "mcq", ref: "w11-l3",
              q: "What does the tutor say about privacy during the observation?",
              opts: ["A. They need written permission from everyone", "B. They should count people without identifying them", "C. They may take photographs of each area", "D. They should observe only at night"],
              a: 1,
              why: B("'Not if you don't identify anyone. Just count… Don't write down names or take photographs.'", "'Not if you don't identify anyone. Just count… Don't write down names or take photographs.'") },
            { id: "w11-m25", type: "mcq", ref: "w11-l3",
              q: "What will Leo do next?",
              opts: ["A. rewrite the questionnaire", "B. email the library manager", "C. book rooms for the interviews", "D. meet the tutor tomorrow"],
              a: 1,
              why: B("Leo: 'I'll email the library manager to ask for a floor plan'. Viết lại bảng hỏi là việc của Hana (bẫy A).", "Leo: 'I'll email the library manager to ask for a floor plan'. Rewriting the questionnaire is Hana's job (trap A).") },
            // Part 3 — matching decisions
            { id: "w11-m26", type: "matching", kind: "feature", ref: "w11-l3", scoreEach: true, reuse: false,
              q: "Questions 26–30: What do the students decide about each part of the project?",
              items: ["26. questionnaire", "27. distribution of the questionnaire", "28. interviews", "29. observation", "30. literature review"],
              options: ["A. make it shorter", "B. use two methods", "C. continue as planned", "D. do it later", "E. remove it completely", "F. do it sooner"],
              a: [0, 1, 3, 5, 2],
              why: B("Bảng hỏi: rút từ 30 xuống ~15 câu (A). Phân phát: cả diễn đàn và bản giấy (B). Phỏng vấn: dời sau kỳ thi (D). Quan sát: làm trước kỳ thi, ngay tuần này (F). Tổng quan tài liệu: 'Carry on as you planned' (C). Không phần nào bị bỏ (E thừa).",
                     "Questionnaire: cut from 30 to about 15 questions (A). Distribution: both the forum and paper copies (B). Interviews: moved to after the exams (D). Observation: before the exams, this week (F). Literature review: 'Carry on as you planned' (C). Nothing is removed (E is unused).") },
            // Part 4 — notes
            { id: "w11-m31", type: "gap", ref: "w11-l4", limit: { words: 1, number: false },
              q: "Definition: a roof partly or completely covered with ___", accept: ["plants"],
              why: B("'a roof that is partly or completely covered with plants'.", "'a roof that is partly or completely covered with plants'.") },
            { id: "w11-m32", type: "gap", ref: "w11-l4", limit: { words: 1, number: false },
              q: "Bottom layer: waterproof ___ (protects the building)", accept: ["membrane"],
              why: B("'the most important layer is the waterproof membrane. Its job is to protect the building itself'.", "'the most important layer is the waterproof membrane. Its job is to protect the building itself'.") },
            { id: "w11-m33", type: "gap", ref: "w11-l4", limit: { words: 1, number: false },
              q: "Drainage layer: removes excess ___", accept: ["water"],
              why: B("'a drainage layer, which removes excess water'.", "'a drainage layer, which removes excess water'.") },
            { id: "w11-m34", type: "gap", ref: "w11-l4", limit: { words: 1, number: false },
              q: "Growing medium: much lighter than ___", accept: ["soil"],
              why: B("'much lighter than soil'. Lưu ý giảng viên có nói 'earth' ở phần định nghĩa, nhưng ghi chú này là về growing medium.", "'much lighter than soil'. The lecturer says 'earth' in the definition, but this note is about the growing medium.") },
            { id: "w11-m35", type: "gap", ref: "w11-l4", limit: { words: 1, number: false },
              q: "Extensive roofs: need very little ___", accept: ["maintenance"],
              why: B("'Their great advantage is that they need very little maintenance'.", "'Their great advantage is that they need very little maintenance'.") },
            { id: "w11-m36", type: "gap", ref: "w11-l4", limit: { words: 1, number: false },
              q: "Intensive roofs: heavier, so need a stronger ___", accept: ["structure"],
              why: B("'because they're so much heavier, they require a stronger structure'.", "'because they're so much heavier, they require a stronger structure'.") },
            { id: "w11-m37", type: "gap", ref: "w11-l4", limit: { words: 1, number: false },
              q: "Benefit 1: absorb ___, reducing pressure on drains", accept: ["rainwater", "rain"],
              why: B("'green roofs absorb rainwater'. 'rain' cũng đúng nghĩa (quyết định tự soạn).", "'green roofs absorb rainwater'. 'rain' carries the same meaning (a self-written decision).") },
            { id: "w11-m38", type: "gap", ref: "w11-l4", limit: { words: 1, number: false },
              q: "Benefit 2: insulation — building stays cooler, especially in ___", accept: ["summer"],
              why: B("'In summer in particular, they keep the building below noticeably cooler'.", "'In summer in particular, they keep the building below noticeably cooler'.") },
            { id: "w11-m39", type: "gap", ref: "w11-l4", limit: { words: 1, number: false },
              q: "Benefit 3: provide ___ for insects and birds", accept: ["habitat", "habitats"],
              why: B("'Green roofs provide habitat for insects and birds'.", "'Green roofs provide habitat for insects and birds'.") },
            { id: "w11-m40", type: "gap", ref: "w11-l4", limit: { words: 1, number: false },
              q: "Challenge: an engineer must check that the roof can carry the extra ___", accept: ["weight", "load"],
              why: B("'an engineer must check whether the existing roof can carry the extra weight'. Giảng viên cũng nói 'adds a significant load' nên 'load' được chấp nhận.", "'an engineer must check whether the existing roof can carry the extra weight'. The lecturer also says 'adds a significant load', so 'load' is accepted.") }
          ] },

        { id: "w11-mS", skill: "speaking", timeLimitMin: 14,
          timer: { autoSubmit: false, warnAtMin: [], pausable: false },
          refs: ["w11-s1", "w11-s2", "w11-s3", "w11-sm2"],
          title: B("Speaking – 3 phần (khoảng 12 phút)", "Speaking – 3 parts (about 12 minutes)"),
          instructions: B("Bật ghi âm trên điện thoại trước khi bắt đầu. App đọc câu hỏi bằng giọng trình duyệt và đếm giờ từng câu. Part 1 khoảng 30 giây/câu; Part 2: 1 phút chuẩn bị, nói đến 2 phút; Part 3 khoảng 50 giây/câu. Sau đó nghe lại bản ghi và tự chấm.",
                          "Start recording on your phone before you begin. The app reads each question with the browser's voice and times each answer. Part 1 about 30 seconds per question; Part 2: 1 minute to prepare, speak for up to 2 minutes; Part 3 about 50 seconds per question. Then listen back and self-assess."),
          groups: [
            { start: "w11-m41", end: "w11-m49", ref: "w11-s1", instructions: B("Part 1 (khoảng 4–5 phút): câu hỏi về bản thân và chủ đề quen thuộc.", "Part 1 (about 4–5 minutes): questions about yourself and familiar topics.") },
            { start: "w11-m50", end: "w11-m51", ref: "w11-s2", instructions: B("Part 2 (khoảng 3–4 phút): cue card, 1 phút chuẩn bị, nói 1–2 phút, 1 câu hỏi kết.", "Part 2 (about 3–4 minutes): cue card, 1 minute to prepare, speak for 1–2 minutes, one rounding-off question.") },
            { start: "w11-m52", end: "w11-m56", ref: "w11-s3", instructions: B("Part 3 (khoảng 4–5 phút): thảo luận chung liên quan chủ đề Part 2.", "Part 3 (about 4–5 minutes): general discussion linked to the Part 2 topic.") }
          ],
          questions: [
            { id: "w11-m41", type: "speak", part: 1, prepSec: 0, talkSec: 30, q: "Do you work or are you a student?", checklist: CK_P1, criteria: SPEAK_CRIT, why: SPEAK_WHY },
            { id: "w11-m42", type: "speak", part: 1, prepSec: 0, talkSec: 30, q: "What do you enjoy most about your work or studies?", checklist: CK_P1, criteria: SPEAK_CRIT, why: SPEAK_WHY },
            { id: "w11-m43", type: "speak", part: 1, prepSec: 0, talkSec: 30, q: "Is there anything you would like to change about your work or studies?", checklist: CK_P1, criteria: SPEAK_CRIT, why: SPEAK_WHY },
            { id: "w11-m44", type: "speak", part: 1, prepSec: 0, talkSec: 30, q: "Now let's talk about the weather. What kind of weather do you like most?", checklist: CK_P1, criteria: SPEAK_CRIT, why: SPEAK_WHY },
            { id: "w11-m45", type: "speak", part: 1, prepSec: 0, talkSec: 30, q: "Does the weather ever affect your mood?", checklist: CK_P1, criteria: SPEAK_CRIT, why: SPEAK_WHY },
            { id: "w11-m46", type: "speak", part: 1, prepSec: 0, talkSec: 30, q: "Do you prefer spending time indoors or outdoors when the weather is hot?", checklist: CK_P1, criteria: SPEAK_CRIT, why: SPEAK_WHY },
            { id: "w11-m47", type: "speak", part: 1, prepSec: 0, talkSec: 30, q: "Let's move on to music. How often do you listen to music?", checklist: CK_P1, criteria: SPEAK_CRIT, why: SPEAK_WHY },
            { id: "w11-m48", type: "speak", part: 1, prepSec: 0, talkSec: 30, q: "Did you learn to play a musical instrument when you were younger?", checklist: CK_P1, criteria: SPEAK_CRIT, why: SPEAK_WHY },
            { id: "w11-m49", type: "speak", part: 1, prepSec: 0, talkSec: 30, q: "Do you prefer listening to music alone or with other people?", checklist: CK_P1, criteria: SPEAK_CRIT, why: SPEAK_WHY },
            { id: "w11-m50", type: "speak", part: 2, prepSec: 60, talkSec: 120, modelRef: "w11-sm2",
              q: "Describe a skill that took you a long time to learn.\nYou should say:\n- what the skill is\n- when you started learning it\n- why it took a long time to learn\nand explain how you feel about this skill now.",
              checklist: CK_P2, criteria: SPEAK_CRIT,
              why: B("Bài nói mẫu (w11-sm2) là tự soạn, chỉ để tham khảo cách triển khai 4 ý; đừng học thuộc. Tự ghi âm, nghe lại và tick checklist.",
                     "The model talk (w11-sm2) is self-written, for reference on covering the four prompts; do not memorise it. Record yourself, listen back and tick the checklist.") },
            { id: "w11-m51", type: "speak", part: 2, prepSec: 0, talkSec: 20, q: "Do you think you will keep improving this skill in the future?", checklist: [B("Trả lời ngắn 1–2 câu, có lý do", "Short answer of 1–2 sentences with a reason")], criteria: SPEAK_CRIT, why: SPEAK_WHY },
            { id: "w11-m52", type: "speak", part: 3, prepSec: 0, talkSec: 50, q: "What skills do you think young people should learn at school that they don't learn now?", checklist: CK_P3, criteria: SPEAK_CRIT, why: SPEAK_WHY },
            { id: "w11-m53", type: "speak", part: 3, prepSec: 0, talkSec: 50, q: "Is it better to learn a practical skill from a teacher or from online videos?", checklist: CK_P3, criteria: SPEAK_CRIT, why: SPEAK_WHY },
            { id: "w11-m54", type: "speak", part: 3, prepSec: 0, talkSec: 50, q: "Why do some adults find it difficult to learn new skills?", checklist: CK_P3, criteria: SPEAK_CRIT, why: SPEAK_WHY },
            { id: "w11-m55", type: "speak", part: 3, prepSec: 0, talkSec: 50, q: "How has technology changed the skills that employers look for?", checklist: CK_P3, criteria: SPEAK_CRIT, why: SPEAK_WHY },
            { id: "w11-m56", type: "speak", part: 3, prepSec: 0, talkSec: 50, q: "Should governments pay for adults to retrain for new jobs?", checklist: CK_P3, criteria: SPEAK_CRIT, why: SPEAK_WHY }
          ] }
      ],
      timer: { autoSubmit: true, warnAtMin: [10, 5], pausable: false },
      band: {
        use: "BAND_EST", estimate: true, label: BAND_LABEL,
        listening: { questions: 40, table: BAND_EST_LISTENING },
        speaking: { formula: "mean(FC, LR, GRA, P)",
                    note: B("Band Speaking ước lượng = trung bình 4 tiêu chí tự chấm. Ước lượng tự soạn, không phải điểm thật; tự chấm thường lệch so với giám khảo.",
                            "Estimated Speaking band = mean of the four self-assessed criteria. A self-written estimate, not a real score; self-assessment often differs from an examiner's.") }
      },
      after: [
        B("So sánh số câu đúng từng phần Listening với tuần 4 (P1–P2) và tuần 7 (P3–P4).", "Compare your score for each Listening part with week 4 (Parts 1–2) and week 7 (Parts 3–4)."),
        B("Gắn nhãn lỗi cho mọi câu sai và cập nhật nhật ký điểm.", "Label every wrong answer and update your score log."),
        B("Speaking: nghe lại bản ghi, ghi số lần dừng >2 giây và chọn 1 câu để ghi âm lại.", "Speaking: listen back, note how many pauses lasted over 2 seconds and pick one answer to re-record.")
      ]
    }
  };
})();
