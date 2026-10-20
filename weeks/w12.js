// weeks/w12.js — Tuần 12: Mock đủ 4 kỹ năng (chia 2 ngày) + bài học chiến lược ngày thi và rà soát lỗi.
// Nội dung TỰ SOẠN, không phải đề thi thật. Địa danh, tổ chức, nhân vật đều hư cấu; số liệu Writing Task 1 là SỐ LIỆU GIẢ ĐỊNH.
// Không có file audio: Listening/Speaking đọc bằng speechSynthesis của trình duyệt.
// Về quy định phòng thi: file này CỐ Ý KHÔNG liệt kê quy định cụ thể (giấy tờ, đồ được mang, giờ có mặt...);
// người học được hướng dẫn kiểm tra thư xác nhận/trang chính thức của đơn vị tổ chức.
// Ghi chú ngoài schema (app có thể bỏ qua): section.day, section.groups, section.readAheadSec/reviewMin, section.timer,
// essay T1 có data; mock.band.* nhúng bảng ước lượng để file chạy độc lập khi chưa có weeks/band.js.
// Đếm điểm: Listening 40, Reading 40 (matching scoreEach = 1 điểm/mục).
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
  const BAND_EST_READING = [
    { min: 39, band: 9.0 }, { min: 37, band: 8.5 }, { min: 35, band: 8.0 }, { min: 33, band: 7.5 },
    { min: 30, band: 7.0 }, { min: 27, band: 6.5 }, { min: 23, band: 6.0 }, { min: 19, band: 5.5 },
    { min: 15, band: 5.0 }, { min: 0, band: 4.5, note: "≤ 4.5" }
  ];

  const CK_WRITING_T1 = [
    B("Câu mở đầu paraphrase đề (không chép nguyên văn)", "Opening sentence paraphrases the task (not copied)"),
    B("Có overview nêu xu hướng/đặc điểm chính của cả hai thành phố, không kê số", "Overview states the main trends for both cities without figures"),
    B("Thân bài so sánh số liệu chính, trích đúng bảng (đơn vị %)", "Body paragraphs compare key figures, quoted correctly (in %)"),
    B("Không đưa lý do/ý kiến không có trong bảng", "No reasons or opinions that the table does not show"),
    B("≥ 150 từ, khoảng 20 phút", "150+ words, about 20 minutes")
  ];
  const CK_WRITING_T2 = [
    B("Trả lời đúng dạng đề 'Do the advantages outweigh…' bằng một kết luận rõ", "Answers 'Do the advantages outweigh…' with a clear judgement"),
    B("Có cả lợi ích và bất lợi, mỗi đoạn một ý chính", "Covers both advantages and disadvantages, one main idea per paragraph"),
    B("Mỗi ý có giải thích và ví dụ cụ thể (không bịa số liệu, không trích nguồn giả)", "Each idea is explained with a specific example (no invented statistics or sources)"),
    B("Từ nối đa dạng, không lặp Firstly/Secondly ở mọi câu", "Varied linking, not Firstly/Secondly in every sentence"),
    B("Kết bài nhắc lại đánh giá, không thêm ý mới", "Conclusion restates the judgement, no new ideas"),
    B("≥ 250 từ; đã soát theo checklist lỗi cá nhân", "250+ words; proofread with your personal error checklist")
  ];
  const CK_P1 = [
    B("Trả lời thẳng rồi thêm 1 lý do hoặc ví dụ", "Answered directly, then added a reason or example"),
    B("Không im lặng quá 2 giây", "No silence longer than 2 seconds"),
    B("Đúng thì của câu hỏi", "Used the tense of the question")
  ];
  const CK_P2 = [
    B("Nói đủ khoảng 2 phút", "Spoke for about 2 minutes"),
    B("Có đủ 4 ý gợi ý", "Covered all four prompts"),
    B("Kể chuyện bằng thì quá khứ chính xác", "Narrated accurately in past tenses"),
    B("Có mô tả cảm xúc với từ vựng cụ thể (không chỉ 'happy', 'good')", "Described feelings with precise words (not only 'happy', 'good')"),
    B("Không học thuộc; nghe tự nhiên", "Not memorised; sounded natural")
  ];
  const CK_P3 = [
    B("Nêu quan điểm rõ ở câu đầu", "Clear view in the first sentence"),
    B("Lý do + ví dụ/so sánh, khoảng 40–60 giây", "Reason plus example/comparison, about 40–60 seconds"),
    B("Nói khái quát về xã hội, có thể xét hai mặt", "Spoke generally about society, possibly weighing both sides"),
    B("Ít nhất 1 cấu trúc phức (if, although, which…)", "At least one complex structure (if, although, which…)")
  ];
  const SPEAK_CRIT = ["FC", "LR", "GRA", "P"];
  const SPEAK_WHY = B(
    "Tự ghi âm bằng ứng dụng của máy (app không ghi âm), nghe lại, tick checklist và chọn band 5–9 cho 4 tiêu chí. Không có đáp án đúng duy nhất.",
    "Record yourself with your device's recorder (the app does not record), listen back, tick the checklist and choose a band from 5 to 9 for the four criteria. There is no single correct answer."
  );

  (window.WEEKS = window.WEEKS || {})[12] = {
    meta: { week: 12, skill: "mixed", source: "tự soạn", version: 1, reviewed: false,
            label: B("Tự soạn – không phải đề thi thật", "Self-written – not a real exam") },

    // ------------------------------------------------------------------ LESSON
    lesson: {
      title: B("Bài 12 – Chiến lược ngày thi và rà soát lỗi", "Lesson 12 – Exam-day strategy and final error review"),
      goal: [
        B("Lập checklist trước thi (T-7, T-1, sáng ngày thi) dựa trên hướng dẫn chính thức của đơn vị tổ chức, không dựa vào app cho quy định phòng thi.",
          "Build a pre-test checklist (7 days before, the day before, the morning) based on the test provider's official instructions, not on this app, for test-room rules."),
        B("Áp dụng chiến lược thời gian và xử lý tình huống cho từng kỹ năng.", "Apply time strategies and recovery tactics for each skill."),
        B("Rà soát danh sách lỗi cá nhân và các lỗi hay gặp trong cả lộ trình.", "Review your personal error list and the common errors from the whole course."),
        B("Tính band ước lượng cuối; kỹ năng nào dưới 7.0 thì lập kế hoạch bổ sung 2–4 tuần.", "Calculate your final estimated band; plan 2–4 extra weeks for any skill below 7.0.")
      ],
      explain: [
        { h: B("1. Quy định phòng thi: chỉ tin nguồn chính thức", "1. Test-room rules: trust only official sources"),
          vi: "App này KHÔNG liệt kê quy định phòng thi. Những điều như giấy tờ tùy thân cần mang, giờ phải có mặt, vật dụng được phép mang vào, thứ tự các phần thi, ngày giờ Speaking (có thể khác ngày với 3 kỹ năng còn lại) đều do đơn vị tổ chức thông báo và có thể khác nhau theo trung tâm, theo hình thức thi trên giấy hay trên máy. Việc cần làm: đọc kỹ email/thư xác nhận đăng ký và trang chính thức của đơn vị tổ chức; điều gì chưa rõ thì hỏi trực tiếp trung tâm thi trước ngày thi. Không dựa vào lời kể trên mạng.",
          en: "This app does NOT list test-room rules. Things such as which ID to bring, what time to arrive, what you may take into the room, the order of the papers and the date and time of your Speaking test (which may be on a different day from the other three skills) are set by the test provider and may differ between centres and between paper-based and computer-delivered tests. What to do: read your booking confirmation and the provider's official website carefully, and ask the test centre directly before test day about anything unclear. Do not rely on stories online." },
        { h: B("2. Tuần cuối và ngày trước thi", "2. The final week and the day before"),
          vi: "Tuần cuối là để củng cố, không phải học mới: ôn lại từ vựng các tuần, đọc lại danh sách lỗi cá nhân, làm mock ở cùng khung giờ với giờ thi dự kiến để quen nhịp. Ngày trước thi: ôn nhẹ (không làm đề dài), chuẩn bị những thứ đơn vị tổ chức yêu cầu theo thư xác nhận, kiểm tra đường đi và thời gian di chuyển, ngủ đủ.",
          en: "The final week is for consolidation, not new material: revise vocabulary from every week, re-read your personal error list, and take a mock at the same time of day as your expected test so the rhythm feels familiar. The day before: light review only (no full tests), prepare whatever your confirmation says the provider requires, check your route and travel time, and get enough sleep." },
        { h: B("3. Listening và Reading trong ngày thi", "3. Listening and Reading on the day"),
          vi: "Listening: dùng thời gian trước mỗi phần để đọc câu hỏi, khoanh giới hạn từ, đoán loại từ. Lỡ một câu thì bỏ qua ngay và theo signpost tiếp theo. Cảnh giác thông tin bị sửa và 'used to'. Soát chính tả và số nhiều khi có thời gian. Reading: khoảng 17 – 20 – 23 phút, quy tắc 90 giây, viết đáp án ngay khi làm. Hai phút cuối: điền nốt mọi câu còn trống bằng phương án hợp lý nhất — câu bỏ trống chắc chắn không có điểm.",
          en: "Listening: use the time before each part to read the questions, circle the word limits and predict the word type. If you miss an answer, let it go at once and follow the next signpost. Watch for corrected information and 'used to'. Check spelling and plurals when you have time. Reading: about 17 – 20 – 23 minutes, the 90-second rule, and write answers as you go. In the last two minutes, fill every blank with your best option — a blank certainly scores nothing." },
        { h: B("4. Writing và Speaking trong ngày thi", "4. Writing and Speaking on the day"),
          vi: "Writing: giữ mốc phút 20 (xong Task 1) và phút 55 (bắt đầu soát Task 2) nếu làm Task 1 trước — hoặc thứ tự ngược lại nếu bạn đã luyện làm Task 2 trước. Khi luyện viết tay, đếm trung bình số từ trên một dòng chữ của bạn để ước lượng nhanh độ dài, khỏi phải đếm từng từ. Speaking: nói tự nhiên, mở rộng bằng lý do và ví dụ; nếu không nghe rõ câu hỏi, lịch sự đề nghị nhắc lại ('Sorry, could you repeat the question, please?') còn hơn đoán sai đề; quên từ thì paraphrase.",
          en: "Writing: keep the checkpoints at minute 20 (Task 1 finished) and minute 55 (start proofreading Task 2) if you do Task 1 first — or the reverse if you have practised doing Task 2 first. When practising by hand, count your average words per line so you can estimate length quickly instead of counting every word. Speaking: speak naturally and extend with reasons and examples; if you do not catch a question, politely ask for it to be repeated ('Sorry, could you repeat the question, please?') rather than guessing; if a word will not come, paraphrase." },
        { h: B("5. Sau mock full: band cuối và quyết định", "5. After the full mock: final band and decision"),
          vi: "Band Listening/Reading ước lượng theo bảng tự soạn; Writing = (T1 + 2×T2)/3, làm tròn xuống 0,5; Speaking = trung bình 4 tiêu chí tự chấm. Overall ước lượng = trung bình 4 kỹ năng, làm tròn đến 0,5 gần nhất theo quy tắc trong tóm tắt format của app (tự soạn, chưa xác minh với nguồn chính thức). Theo PLAN: kỹ năng nào dưới 7.0 thì bổ sung 2–4 tuần tập trung vào kỹ năng đó trước khi đăng ký thi.",
          en: "Listening/Reading bands are estimated from the self-written table; Writing = (T1 + 2×T2)/3, rounded down to 0.5; Speaking = mean of the four self-assessed criteria. Estimated overall = mean of the four skills, rounded to the nearest 0.5 using the rule in the app's format summary (self-written, not verified against official sources). Per the PLAN: for any skill below 7.0, add 2–4 weeks focused on that skill before booking the test." }
      ],
      table: [
        { h: B("Checklist trước thi (tự soạn – quy định cụ thể xem nguồn chính thức)", "Pre-test checklist (self-written – check official sources for specific rules)"),
          rows: [
            [B("T-7 ngày", "7 days before"), B("Đọc lại thư xác nhận và trang chính thức; ghi các câu hỏi cần hỏi trung tâm thi; làm mock cùng khung giờ thi", "Re-read the confirmation and official website; note questions for the test centre; take a mock at test time of day")],
            [B("T-3 ngày", "3 days before"), B("Ôn danh sách lỗi cá nhân và từ vựng tuần 1–12; không học chủ đề mới", "Review your error list and week 1–12 vocabulary; no new topics")],
            [B("T-1 ngày", "The day before"), B("Chuẩn bị đúng những gì thư xác nhận yêu cầu; kiểm tra đường đi, thời gian di chuyển; ôn nhẹ; ngủ sớm", "Prepare exactly what the confirmation requires; check route and travel time; light review; sleep early")],
            [B("Sáng ngày thi", "Morning of the test"), B("Ăn sáng, đi sớm hơn dự kiến để có thời gian dự phòng; đọc lại 5 lỗi cá nhân", "Eat breakfast, leave earlier than needed to allow a margin; re-read your top five errors")],
            [B("Trong phòng thi", "In the test"), B("Làm theo hướng dẫn của cán bộ coi thi; áp dụng mốc thời gian từng kỹ năng", "Follow the invigilators' instructions; apply each skill's time checkpoints")]
          ] },
        { h: B("Tình huống → cách xử lý", "Situation → response"),
          rows: [
            [B("Listening: lỡ một câu", "Listening: missed an answer"), B("Bỏ qua, nghe signpost kế tiếp; cuối phần đoán một đáp án hợp lý", "Let it go, follow the next signpost; guess sensibly at the end")],
            [B("Reading: còn 3 phút, 5 câu trống", "Reading: 3 minutes left, 5 blanks"), B("Điền ngay phương án hợp lý nhất cho cả 5 câu", "Fill all five with your best option immediately")],
            [B("Writing: phút 25 mà Task 1 chưa xong", "Writing: minute 25 and Task 1 unfinished"), B("Viết nhanh câu so sánh chính, chuyển sang Task 2", "Write the key comparison quickly and move to Task 2")],
            [B("Speaking: không nghe rõ câu hỏi", "Speaking: did not catch the question"), B("'Sorry, could you repeat the question, please?'", "'Sorry, could you repeat the question, please?'")]
          ] }
      ],
      vocab: [
        { w: "invigilator", pos: "n", ipa: "/ɪnˈvɪdʒɪleɪtə/", vi: "cán bộ coi thi", en: "a person who watches candidates during an exam", ex: "Follow the invigilator's instructions at all times.", col: "ask / inform the invigilator" },
        { w: "candidate", pos: "n", ipa: "/ˈkændɪdət/", vi: "thí sinh", en: "a person taking an exam", ex: "Each candidate receives a confirmation email.", col: "a test candidate; candidates must…" },
        { w: "identification", pos: "n", ipa: "/aɪˌdentɪfɪˈkeɪʃn/", vi: "giấy tờ tùy thân", en: "an official document that proves who you are", ex: "Check which identification the test centre accepts.", col: "valid / photo identification" },
        { w: "confirmation", pos: "n", ipa: "/ˌkɒnfəˈmeɪʃn/", vi: "xác nhận (đăng ký)", en: "a message saying that a booking has been made", ex: "Read your booking confirmation carefully.", col: "booking confirmation; receive confirmation" },
        { w: "consolidate", pos: "v", ipa: "/kənˈsɒlɪdeɪt/", vi: "củng cố", en: "to make knowledge or skills stronger", ex: "Use the final week to consolidate what you know.", col: "consolidate knowledge / skills" },
        { w: "margin", pos: "n", ipa: "/ˈmɑːdʒɪn/", vi: "khoảng dự phòng", en: "extra time or space allowed in case it is needed", ex: "Leave home with a margin of at least half an hour.", col: "a safety margin; allow a margin" },
        { w: "legible", pos: "adj", ipa: "/ˈledʒəbl/", vi: "dễ đọc (chữ viết)", en: "clear enough to be read", ex: "Make sure your handwriting is legible.", col: "clearly legible; barely legible" },
        { w: "word limit", pos: "n", ipa: "/ˈwɜːd ˌlɪmɪt/", vi: "giới hạn số từ", en: "the maximum number of words allowed in an answer", ex: "An answer over the word limit is marked wrong.", col: "exceed / keep within the word limit" },
        { w: "pace", pos: "n", ipa: "/peɪs/", vi: "nhịp độ", en: "the speed at which you do something", ex: "Keep a steady pace through the Reading test.", col: "a steady pace; pace yourself" },
        { w: "composure", pos: "n", ipa: "/kəmˈpəʊʒə/", vi: "sự bình tĩnh", en: "the state of being calm and in control", ex: "Breathing slowly helps you keep your composure.", col: "keep / lose your composure" },
        { w: "contingency plan", pos: "n", ipa: "/kənˈtɪndʒənsi plæn/", vi: "phương án dự phòng", en: "a plan for what to do if something goes wrong", ex: "Have a contingency plan in case your bus is late.", col: "draw up a contingency plan" },
        { w: "overall band", pos: "n", ipa: "/ˌəʊvərɔːl ˈbænd/", vi: "điểm tổng (band tổng)", en: "the combined score across the four skills", ex: "My estimated overall band was 7.0.", col: "achieve / estimate an overall band" },
        { w: "overcrowded", pos: "adj", ipa: "/ˌəʊvəˈkraʊdɪd/", vi: "quá đông đúc", en: "containing too many people", ex: "The market was overcrowded during the holiday.", col: "overcrowded streets / trains" },
        { w: "overproduction", pos: "n", ipa: "/ˌəʊvəprəˈdʌkʃn/", vi: "sản xuất (nấu) quá nhiều", en: "making more of something than is needed", ex: "Overproduction was the main cause of food waste.", col: "reduce overproduction" }
      ],
      examples: [
        { label: B("Xin nhắc lại câu hỏi (Speaking)", "Asking for repetition (Speaking)"),
          text: "Sorry, could you repeat the question, please?",
          note: B("Lịch sự, ngắn, tự nhiên. Tốt hơn trả lời lệch đề.", "Polite, short and natural. Better than answering the wrong question."), speak: true },
        { label: B("Câu giờ khi suy nghĩ (Part 3)", "Thinking time (Part 3)"),
          text: "That's not something I've thought about much, but I'd probably say that…",
          note: B("Dùng 1–2 lần trong bài, không lặp ở mọi câu.", "Use once or twice in the test, not before every answer."), speak: true },
        { label: B("Overview không có số (Task 1)", "Overview without figures (Task 1)"),
          text: "Overall, the car remained the most common way to commute in both cities, but its share fell sharply in Varnholt while it changed little in Elsbridge.",
          note: B("Xu hướng chính, không kê số liệu.", "Main trends, no figures."), speak: true },
        { label: B("Câu kết Task 2 rõ đánh giá", "A Task 2 conclusion with a clear judgement"),
          text: "In conclusion, I believe the benefits of working from home outweigh the drawbacks, as long as employers combine it with regular face-to-face contact.",
          note: B("Trả lời thẳng câu hỏi 'outweigh?', có điều kiện, không thêm ý mới.", "Answers 'outweigh?' directly, with a condition, and adds no new ideas."), speak: true }
      ],
      mistakes: [
        B("Tin quy định phòng thi do người khác kể thay vì đọc thư xác nhận và trang chính thức.", "Trusting test-room rules from other people instead of reading the confirmation and the official website."),
        B("Học đề mới đến khuya hôm trước thi.", "Studying new material late into the night before the test."),
        B("Listening: vượt giới hạn từ hoặc sai chính tả ở câu đã nghe đúng.", "Listening: exceeding the word limit or misspelling an answer you heard correctly."),
        B("Reading: để trống câu khi hết giờ; nhầm FALSE với NOT GIVEN.", "Reading: leaving blanks when time runs out; confusing FALSE with NOT GIVEN."),
        B("Writing Task 2: không trả lời đủ mọi phần của đề; Task 1: không có overview.", "Writing Task 2: not answering every part of the question; Task 1: no overview."),
        B("Speaking: đọc thuộc câu trả lời đã chuẩn bị, nghe máy móc và lệch đề.", "Speaking: reciting prepared answers, which sound mechanical and miss the question.")
      ],
      exercises: [
        { id: "w12-ex01", type: "mcq", tag: "official",
          q: B("Bạn muốn biết cần mang giấy tờ tùy thân nào. Nên kiểm tra ở đâu?", "You want to know which ID to bring. Where should you check?"),
          opts: ["A study forum", "This app", "Your booking confirmation and the test provider's official website", "A friend who took the test last year"],
          a: 2,
          why: B("Quy định do đơn vị tổ chức đặt ra và có thể thay đổi/khác theo trung tâm; chỉ nguồn chính thức là đáng tin. App không liệt kê quy định này.",
                 "Rules are set by the test provider and may change or differ between centres; only official sources are reliable. This app does not list them.") },
        { id: "w12-ex02", type: "mcq", tag: "listening",
          q: B("Listening: bạn lỡ câu 4, người nói đã sang nội dung câu 6. Nên làm gì?", "Listening: you missed question 4 and the speaker has moved on to question 6. What should you do?"),
          opts: ["Keep thinking about question 4", "Focus on question 6 now and guess question 4 at the end", "Stop writing until the part ends", "Ask for the recording to be played again"],
          a: 1,
          why: B("Mỗi bản ghi nghe một lần (theo tóm tắt format); bám câu hiện tại để không mất thêm câu, đoán câu bị lỡ sau.",
                 "Each recording is heard once (per the format summary); stay with the current question so you do not lose more, and guess the missed one later.") },
        { id: "w12-ex03", type: "mcq", tag: "reading",
          q: B("Reading: còn 3 phút, 5 câu còn trống. Lựa chọn tốt nhất?", "Reading: 3 minutes left and 5 blanks. Best choice?"),
          opts: ["Leave them blank to avoid mistakes", "Fill all five with your best options now", "Spend the 3 minutes on one question", "Rewrite earlier answers neatly"],
          a: 1,
          why: B("Câu bỏ trống chắc chắn 0 điểm; một phương án hợp lý có thể đúng.", "A blank certainly scores zero; a sensible option might be right.") },
        { id: "w12-ex04", type: "order", scoreEach: true, tag: "writing-time",
          q: B("Gán mốc phút cho từng việc trong 60 phút Writing (làm Task 1 trước).", "Match each Writing event to its minute (doing Task 1 first)."),
          items: ["Finish Task 1 and start Task 2", "Start proofreading Task 2", "Finish planning Task 2", "Finish planning Task 1"],
          labels: ["Minute 3", "Minute 20", "Minute 25", "Minute 55"],
          a: ["Minute 20", "Minute 55", "Minute 25", "Minute 3"],
          why: B("Task 1: 3 phút đọc/lập ý + 15 viết + 2 soát → phút 20. Task 2: 5 phút dàn ý → phút 25; viết 30 phút → phút 55 bắt đầu soát.",
                 "Task 1: 3 min reading/planning + 15 writing + 2 checking → minute 20. Task 2: 5 min planning → minute 25; 30 min writing → start proofreading at minute 55.") },
        { id: "w12-ex05", type: "mcq", tag: "day-before",
          q: B("Ngày trước thi, việc nào ÍT hữu ích nhất?", "On the day before the test, which is LEAST useful?"),
          opts: ["Learning 50 new words late at night", "A light review of your error list", "Checking your route and travel time", "Going to bed early"],
          a: 0,
          why: B("Học nhiều từ mới sát giờ khó nhớ và làm mệt; tuần cuối dùng để củng cố.", "Cramming new words late is hard to retain and tiring; the final days are for consolidation.") },
        { id: "w12-ex06", type: "text", tag: "grammar",
          q: B("Sửa lỗi: Nowadays, there are many people think that working from home is better.", "Correct the error: Nowadays, there are many people think that working from home is better."),
          model: ["Nowadays, many people think that working from home is better.", "Nowadays, there are many people who think that working from home is better."],
          why: B("Hai động từ chia (are, think) trong một mệnh đề. Bỏ 'there are' hoặc thêm 'who'. Lỗi hay gặp do dịch 'có nhiều người nghĩ'.",
                 "Two finite verbs (are, think) in one clause. Remove 'there are' or add 'who'. A common error from translating 'có nhiều người nghĩ'.") },
        { id: "w12-ex07", type: "text", tag: "task1-overview",
          q: B("Viết lại thành câu overview (không có số): 'Overall, cycling in Varnholt increased from 5% to 18%.'", "Rewrite as an overview (no figures): 'Overall, cycling in Varnholt increased from 5% to 18%.'"),
          model: ["Overall, cycling became far more popular in Varnholt over the period.", "Overall, the most striking change was the rise of cycling in Varnholt."],
          why: B("Overview tóm xu hướng, không kê số; số liệu để ở thân bài.", "An overview summarises trends without figures; figures belong in the body.") },
        { id: "w12-ex08", type: "mcq", tag: "speaking",
          q: B("Speaking Part 3: bạn không nghe rõ câu hỏi. Nên làm gì?", "Speaking Part 3: you did not catch the question. What should you do?"),
          opts: ["Answer a question you prepared earlier", "Stay silent until the next question", "Say 'Sorry, could you repeat the question, please?'", "Answer in Vietnamese"],
          a: 2,
          why: B("Đề nghị nhắc lại một cách lịch sự giúp trả lời đúng đề; trả lời lệch đề ảnh hưởng nhiều hơn.", "Politely asking for repetition lets you answer the right question; an off-topic answer does more harm.") },
        { id: "w12-ex09", type: "mcq", tag: "band",
          q: B("Band ước lượng: L 7.5, R 7.0, W 6.5, S 7.0. Overall ước lượng là bao nhiêu (trung bình, làm tròn 0,5 gần nhất)?", "Estimated bands: L 7.5, R 7.0, W 6.5, S 7.0. What is the estimated overall (mean, rounded to the nearest 0.5)?"),
          opts: ["6.5", "7.0", "7.5", "8.0"],
          a: 1,
          why: B("(7.5 + 7.0 + 6.5 + 7.0) / 4 = 7.0. Đây là ước lượng tự soạn, không phải điểm thật.", "(7.5 + 7.0 + 6.5 + 7.0) / 4 = 7.0. This is a self-written estimate, not a real score.") },
        { id: "w12-ex10", type: "mcq", tag: "plan",
          q: B("Với kết quả ở câu trên, theo PLAN nên làm gì tiếp?", "With the results above, what does the PLAN suggest next?"),
          opts: ["Book the test immediately with no changes", "Add 2–4 weeks focused on Writing (6.5)", "Restart the whole 12-week course", "Focus only on Listening"],
          a: 1,
          why: B("PLAN tuần 12: kỹ năng nào dưới 7.0 thì bổ sung 2–4 tuần. Ở đây chỉ Writing (6.5) dưới 7.0.", "PLAN week 12: add 2–4 weeks for any skill below 7.0. Here only Writing (6.5) is below 7.0.") }
      ],
      summary: [
        B("Quy định phòng thi: đọc thư xác nhận và trang chính thức, hỏi trung tâm nếu chưa rõ — app không thay thế nguồn này.", "Test-room rules: read the confirmation and official website and ask the centre if unsure — this app does not replace them."),
        B("Tuần cuối củng cố, không học mới; hôm trước ôn nhẹ, chuẩn bị theo yêu cầu, ngủ đủ.", "Final week: consolidate, no new material; the day before: light review, prepare what is required, sleep."),
        B("Mốc thời gian: Reading khoảng 17 – 20 – 23; Writing phút 20 và 55; không bỏ trống câu nào.", "Checkpoints: Reading about 17 – 20 – 23; Writing minutes 20 and 55; no blank answers."),
        B("Band cuối là ước lượng tự soạn; kỹ năng dưới 7.0 → thêm 2–4 tuần.", "The final band is a self-written estimate; any skill below 7.0 → 2–4 more weeks.")
      ]
    },

    // -------------------------------------------------------------------- QUIZ
    quiz: {
      title: B("Kiểm tra tuần 12 – Tổng ôn chiến lược và lỗi", "Week 12 check – Strategy and error review"),
      passPct: null, // PLAN tuần 12: tự kiểm tra bằng band ước lượng cuối của mock full; quiz chỉ hiện % đúng.
      timeLimitMin: null,
      sections: [
        { id: "w12-s1", skill: "mixed",
          title: B("Tổng ôn", "Review"),
          instructions: B("Chọn đáp án đúng, điền MỘT TỪ hoặc viết câu trả lời.", "Choose the correct answer, write ONE WORD or write your answer."),
          questions: [
            { id: "w12-q01", type: "text", tag: "article",
              q: B("Sửa lỗi: Unemployment is serious problem in many countries.", "Correct the error: Unemployment is serious problem in many countries."),
              model: ["Unemployment is a serious problem in many countries."],
              why: B("'problem' đếm được, số ít → cần mạo từ 'a'.", "'problem' is a singular countable noun → it needs 'a'.") },
            { id: "w12-q02", type: "text", tag: "agreement",
              q: B("Sửa lỗi: The proportion of commuters who cycle have tripled.", "Correct the error: The proportion of commuters who cycle have tripled."),
              model: ["The proportion of commuters who cycle has tripled."],
              why: B("Chủ ngữ chính là 'The proportion' (số ít) → has.", "The head of the subject is 'The proportion' (singular) → has.") },
            { id: "w12-q03", type: "mcq", tag: "tfng",
              q: B("Khác biệt giữa FALSE và NOT GIVEN là gì?", "What is the difference between FALSE and NOT GIVEN?"),
              opts: ["FALSE means the passage contradicts the statement; NOT GIVEN means the passage does not say", "They mean the same thing", "NOT GIVEN means the statement is partly true", "FALSE is used only for numbers"],
              a: 0,
              why: B("FALSE: bài nói điều ngược lại. NOT GIVEN: bài không có thông tin để khẳng định hay phủ định.", "FALSE: the text states the opposite. NOT GIVEN: the text has no information to confirm or contradict it.") },
            { id: "w12-q04", type: "mcq", tag: "listening",
              q: B("Nghe: 'The fee used to be three pounds, but it went up to five this year.' Phí hiện tại?", "Listening: 'The fee used to be three pounds, but it went up to five this year.' What is the current fee?"),
              opts: ["£3", "£5", "£8", "£2"],
              a: 1,
              why: B("'used to be three' là thông tin cũ; hiện tại là 5.", "'used to be three' is old information; the current fee is five.") },
            { id: "w12-q05", type: "gap", tag: "format", limit: { words: 1, number: false },
              q: "According to the app's format summary, Writing Task 2 carries ___ the weight of Task 1.", accept: ["twice", "double"],
              why: B("Tóm tắt format (tự soạn): Task 2 có trọng số gấp đôi Task 1 → band Writing ước lượng = (T1 + 2×T2)/3.", "Format summary (self-written): Task 2 carries twice the weight of Task 1 → estimated Writing band = (T1 + 2×T2)/3.") },
            { id: "w12-q06", type: "mcq", tag: "format",
              q: B("Theo tóm tắt format trong app, thời gian chuẩn bị Speaking Part 2 là bao lâu?", "According to the app's format summary, how long is the preparation time for Speaking Part 2?"),
              opts: ["No preparation", "30 seconds", "1 minute", "5 minutes"],
              a: 2,
              why: B("Part 2: 1 phút chuẩn bị, nói 1–2 phút (tóm tắt tự soạn, chưa xác minh với nguồn chính thức).", "Part 2: 1 minute to prepare, speak for 1–2 minutes (self-written summary, not verified against official sources).") },
            { id: "w12-q07", type: "mcq", tag: "band",
              q: B("Trung bình 4 kỹ năng là 7.25. Theo quy tắc làm tròn trong tóm tắt format của app, overall ước lượng là?", "The mean of the four skills is 7.25. Using the rounding rule in the app's format summary, what is the estimated overall?"),
              opts: ["7.0", "7.5", "8.0", "7.25"],
              a: 1,
              why: B("Quy tắc trong tóm tắt (tự soạn, chưa xác minh): .25 làm tròn lên .5; .75 làm tròn lên số nguyên kế tiếp → 7.5.", "Rule in the summary (self-written, not verified): .25 rounds up to .5; .75 rounds up to the next whole band → 7.5.") },
            { id: "w12-q08", type: "mcq", tag: "official",
              q: B("Nguồn nào đáng tin nhất để biết giờ phải có mặt tại phòng thi?", "Which is the most reliable source for the time you must arrive at the test?"),
              opts: ["Your booking confirmation / the test provider", "A video from last year", "This app's lesson", "Your classmate's memory"],
              a: 0,
              why: B("Giờ có mặt do đơn vị tổ chức thông báo cho từng buổi thi; app không cung cấp thông tin này.", "Arrival times are set by the provider for each session; this app does not provide them.") },
            { id: "w12-q09", type: "write", tag: "error-list",
              q: B("Viết 'checklist 5 lỗi của riêng tôi' để đọc lại sáng ngày thi (mỗi lỗi kèm 1 ví dụ đã sửa).", "Write your 'top five errors' checklist to re-read on the morning of the test (each with one corrected example)."),
              model: "1. Subject–verb agreement: The number of students has risen. 2. Articles: It is a serious problem. 3. Comma splices: Prices rose, which reduced demand. 4. Word form: poor students (not poverty students). 5. Listening plurals: leftovers, tools.",
              checklist: [B("Đúng 5 lỗi, lấy từ nhật ký lỗi của bạn", "Exactly five errors taken from your own log"), B("Mỗi lỗi có 1 ví dụ đã sửa đúng", "Each has one correct example"), B("Ngắn gọn, đọc lại trong 1 phút", "Short enough to re-read in one minute")],
              why: B("Danh sách ngắn, cá nhân hoá giúp tập trung vào lỗi thật của bạn thay vì đọc lại cả khoá học.", "A short, personal list keeps your focus on your real errors instead of re-reading the whole course.") },
            { id: "w12-q10", type: "mcq", tag: "word-limit",
              q: B("Đề: 'Write NO MORE THAN TWO WORDS'. Câu: 'Visitors must use the ___ entrance.' Đáp án nào hợp lệ?", "Instruction: 'Write NO MORE THAN TWO WORDS'. Sentence: 'Visitors must use the ___ entrance.' Which answer is valid?"),
              opts: ["north side", "the north side gate", "north side main gate", "the northern side of the"],
              a: 0,
              why: B("Chỉ 'north side' (2 từ) nằm trong giới hạn và hợp ngữ pháp với câu; các lựa chọn khác vượt 2 từ.", "Only 'north side' (two words) is within the limit and fits the sentence; the others exceed two words.") }
          ] }
      ]
    },

    // ---------------------------------------------------------------- PASSAGES
    passages: [
      { id: "w12-p1", title: "The Keepers of Varrick Light", source: "tự soạn", words: 714,
        paras: [
          { label: "A", text: "Varrick Light stands on a low rocky island about four kilometres off the western coast, and for more than a century it was home to a small team of keepers. The lighthouse was built after a series of shipwrecks on the reef that surrounds the island, and its light could be seen from roughly thirty kilometres away on a clear night. Today the light is operated automatically and controlled from an office on the mainland, and the keepers' cottages stand empty for most of the year." },
          { label: "B", text: "Life on the island was shaped by routine. Three keepers lived there at any one time, working in shifts so that the light was never left unattended. Each evening, the lamp had to be lit at sunset, and throughout the night the keeper on duty wound the clockwork mechanism that turned the lens. In the morning, the lens was cleaned and polished, a task that took far longer than visitors expected, because even a thin layer of salt could reduce the strength of the beam. The keepers also painted the tower regularly, since the salty wind quickly damaged any exposed surface." },
          { label: "C", text: "Supplies arrived by boat every two weeks, weather permitting. In winter, storms sometimes delayed the boat for a month or more, and the keepers learned to keep a store of tinned food, flour and fuel. Several former keepers have said that the hardest part of the job was not the work itself but the uncertainty of not knowing when they would next see their families. Letters were the main form of contact until a radio telephone was installed, and even then calls were short and had to be arranged in advance. Some keepers filled the long evenings by reading, carving wood or keeping small vegetable gardens behind the cottages, protected from the wind by stone walls." },
          { label: "D", text: "The keepers were not only responsible for the light. They recorded the weather every three hours, and these records were sent to the national weather service, which used them in its forecasts. They also kept a logbook of passing ships and reported any vessel that appeared to be in difficulty. On at least two occasions, according to the island's logbooks, keepers rowed out to help fishermen whose boats had been damaged on the reef. The logbooks also record smaller events, such as the arrival of migrating birds each autumn and the occasional visit of a seal to the landing stage." },
          { label: "E", text: "Automation arrived gradually. First, an electric lamp replaced the oil burner, removing the need to carry fuel up the tower. Each change was tested for several months before the next was introduced. Later, an automatic system was installed to switch the light on and off according to the level of daylight. The final step was a remote monitoring system that alerted engineers on the mainland if any part of the equipment failed. Once this was in place, the authorities decided that permanent keepers were no longer necessary, and the last team left the island one spring morning, after the new equipment had been tested through a full winter." },
          { label: "F", text: "Not everyone welcomed the change. Fishermen in the nearby harbour argued that a machine could keep the light working but could not watch the sea, and some felt that the island had lost the people who knew its dangers best. The lighthouse authority replied that modern navigation equipment on ships had made the keepers' observation role less important than in the past, and that the money saved could be used to maintain other lights along the coast. A few former keepers, interviewed years later, said they understood the decision but regretted that no one had asked for their views." },
          { label: "G", text: "In recent years, a local heritage group has begun restoring one of the cottages. Volunteers have repaired the roof and windows, and they hope eventually to open a small museum about the keepers' lives. Because the island can only be reached by boat, visitor numbers will always be limited, but the group believes that this isolation is part of the story it wants to tell. The group has also begun recording interviews with the families of former keepers, so that their memories are not lost. For now, the light still turns every night, but no one on the island is awake to watch it." }
        ],
        glossary: [{ w: "reef", vi: "rạn đá ngầm", en: "a line of rocks just below or at the surface of the sea" }, { w: "unattended", vi: "không có người trông", en: "not being watched or looked after" }] },

      { id: "w12-p2", title: "The Seed Library of Ellisford", source: "tự soạn", words: 707,
        paras: [
          { label: "A", text: "On the ground floor of the public library in Ellisford, between the children's books and the local history shelves, stands a wooden cabinet with dozens of small drawers. Instead of books, the drawers contain packets of seeds: beans, tomatoes, squash, herbs and flowers. The cabinet itself was built by a local carpenter from wood donated by a nearby timber yard. Anyone with a library card may take up to five packets each season, free of charge. The only request is that, at the end of the growing season, borrowers save some seeds from their best plants and bring them back for others to use. Each packet carries a handwritten label showing the name of the variety and, where it is known, the name of the person who grew it." },
          { label: "B", text: "The idea came from a retired school caretaker, Owen Pritchard, who had been saving seeds from his own vegetable garden for forty years. He noticed that the varieties he grew, some of which had been passed down from his grandparents, were no longer available in garden centres. He had no experience of running a project of this kind. 'When I'm gone, these will disappear with me,' he told the library's manager. The manager agreed to provide space for a trial, on condition that the project did not require extra staff. Pritchard therefore recruited a small group of volunteers to sort, label and refill the drawers each week. Most of them were gardeners he had met at the local allotments." },
          { label: "C", text: "In its first year, the seed library lent around three hundred packets, and fewer than a third of borrowers returned seeds. Pritchard admits that he was disappointed, but he soon realised that many borrowers simply did not know how to save seeds. Some had harvested seeds from plants that were not fully ripe; others had stored them in damp conditions, where they rotted. Others had simply forgotten, or had eaten everything they grew. The following spring, the library began running free workshops on seed saving, led by volunteers, and the return rate improved noticeably. Pritchard also noticed that borrowers who had attended a workshop seemed far more likely to return seeds than those who had not, although he has kept no formal records." },
          { label: "D", text: "Not all seeds are equally easy to save. Beans and peas are generally considered suitable for beginners, because their flowers usually pollinate themselves, so the seeds tend to grow into plants like the parent. Squash and pumpkins are more difficult: insects carry pollen between different varieties, and the seeds may produce unexpected crosses. Tomatoes fall somewhere in between: they usually pollinate themselves, but bees occasionally cross neighbouring plants, so experienced growers keep different varieties some distance apart. The seed library labels its drawers by difficulty, using a simple system of one to three leaves, so that borrowers can choose plants that match their experience." },
          { label: "E", text: "The project has also attracted criticism. A commercial seed supplier in the region complained that the library was competing unfairly with businesses that pay taxes and employ staff. Others raised concerns about quality, pointing out that the library cannot test whether returned seeds will germinate. The library responded to the quality concerns by adding a note to each packet explaining that seeds are shared on a 'best effort' basis, and by asking borrowers to report any packets that fail to grow. Pritchard himself acknowledges that some packets fail, but he argues that commercial seeds are not always perfect either. The supplier's complaint, by contrast, has never been formally answered." },
          { label: "F", text: "Despite these concerns, similar projects have started in three neighbouring towns, and the Ellisford volunteers now run a yearly seed swap that brings growers from across the region together. For Pritchard, the most rewarding change is not the number of packets but the conversations. 'People come back and tell me what grew, what failed, what the slugs ate,' he says. 'A seed library is really a library of experience.' He hopes that, in time, younger volunteers will take over the running of the cabinet, so that the project no longer depends on him. The library has since given the cabinet a permanent place on its ground floor, and the manager now describes it as one of the most popular services the library offers." }
        ],
        glossary: [{ w: "germinate", vi: "nảy mầm", en: "to begin to grow from a seed" }, { w: "pollinate", vi: "thụ phấn", en: "to move pollen so that a plant can produce seeds" }] },

      { id: "w12-p3", title: "The Value of Quiet", source: "tự soạn", words: 705,
        paras: [
          { label: "A", text: "Cities have always been noisy places, but the kind of noise has changed. Where once the dominant sounds were voices, footsteps and the occasional cart, today they are engines, sirens, air-conditioning units and the constant hum of traffic. Most of us have learned to ignore this background, or at least we believe we have. The change has happened slowly enough that few of us noticed it. I want to suggest that this belief is mistaken, and that quiet should be treated as a shared resource, like clean air or public parks, rather than as a private luxury." },
          { label: "B", text: "The argument that noise is merely an annoyance underestimates how it affects daily life. A person woken repeatedly by traffic may not remember the disturbances in the morning, yet still feel tired and irritable. Children who study in classrooms beside busy roads have to work harder to hear their teachers. Office workers in open-plan spaces may find that their concentration is broken many times an hour. None of these effects is dramatic on its own, which is precisely why they are so easily overlooked. They are small costs, paid every day, by large numbers of people." },
          { label: "C", text: "It is often said that people who dislike noise should simply move to the countryside. This seems to me both unrealistic and unfair. Most jobs, schools and hospitals are in cities, and many residents cannot afford to choose where they live. Moreover, quiet housing tends to be more expensive, which means that those with the least money often live closest to the loudest roads. Even within a single neighbourhood, the difference between a flat facing a main road and one facing a courtyard can be considerable. Treating quiet as something individuals must buy therefore turns it into yet another advantage of wealth." },
          { label: "D", text: "What, then, can be done? Some measures are technical. Road surfaces can be designed to reduce tyre noise, and electric buses are considerably quieter than older diesel vehicles, particularly at low speeds. Buildings can be fitted with better windows. Trees and hedges can soften the sound of traffic, although they are often valued more for how they look than for what they do to noise. These solutions are valuable, but they tend to treat noise as an engineering problem rather than a question of how we want to share the city. I am more interested in decisions about space and time." },
          { label: "E", text: "Consider the idea of designated quiet areas: parks, squares or courtyards where amplified music and unnecessary engine noise are discouraged. Such places would not be silent, and nor should they be; birdsong, conversation and children playing are part of what makes a city feel alive. The aim would be to protect a few places where the sounds of people and nature are not drowned out by machines. Libraries have long worked in this way, and few people regard their quiet as an unreasonable restriction. Similar logic could apply to time. Restricting deliveries in residential streets during the early morning, for example, would cost businesses relatively little and allow many residents to sleep." },
          { label: "F", text: "Critics might argue that such rules would be difficult to enforce, and that a city which regulates sound risks becoming dull. The first concern is reasonable; the second, I think, is exaggerated. Rules about litter and smoking in public places were once considered intrusive, yet most people now regard them as normal. In any case, the purpose is not to ban noise but to give it boundaries, so that lively streets and calm spaces can exist side by side. A night market or a street festival would lose nothing if the square next to it remained a place where people could sit and hear themselves think." },
          { label: "G", text: "Ultimately, the question is not whether cities should be quiet, but whether quiet should be available to everyone who lives in them. At present, it is distributed largely according to income. A city that took quiet seriously would plan for it, protect it and share it, in the same way that it already does with parks and clean water. That would be a small change in policy, but a significant change in how we value the experience of urban life. None of this requires a city to give up its energy." }
        ],
        glossary: [{ w: "amplified", vi: "được khuếch đại (loa)", en: "made louder using electronic equipment" }, { w: "intrusive", vi: "xâm phạm, gây phiền", en: "affecting people's private lives in an unwelcome way" }] }
    ],

    // ----------------------------------------------------------------- SCRIPTS
    scripts: [
      { id: "w12-l1", kind: "listening", part: 1, lang: "en-GB", rate: 0.95, pauseMs: 600, transcript: "hidden", maxPlays: 1, source: "tự soạn",
        speakers: [{ id: "A", name: "Clerk", voice: "female" }, { id: "B", name: "Daniel", voice: "male" }],
        lines: [
          { sp: "A", text: "Kestwick Central lost property office. How can I help?" },
          { sp: "B", text: "Hi. I left a bag on a train, and I wondered if anyone had handed it in." },
          { sp: "A", text: "I'll take some details and check. Can I have your name?" },
          { sp: "B", text: "Daniel Frayne." },
          { sp: "A", text: "How do you spell your surname?" },
          { sp: "B", text: "F-R-A-Y-N-E." },
          { sp: "A", text: "Thanks. And what kind of bag was it?" },
          { sp: "B", text: "A backpack. Quite a large one, with a padded strap." },
          { sp: "A", text: "What colour?" },
          { sp: "B", text: "Dark green. People always assume it's black when they see it indoors, but it's definitely green." },
          { sp: "A", text: "Dark green. And what was inside?" },
          { sp: "B", text: "Mostly clothes, but the important thing is my camera. It isn't expensive, but it has all my holiday photos on it." },
          { sp: "A", text: "I understand. And when did you lose it?" },
          { sp: "B", text: "It was Tuesday. Oh no, sorry, I'm getting confused. I travelled on Wednesday, so it was Wednesday." },
          { sp: "A", text: "Wednesday. Which platform did the train leave from?" },
          { sp: "B", text: "Platform nine, I think. Yes, nine. It was the evening train to Dunmarrow." },
          { sp: "A", text: "And can you remember where you were sitting?" },
          { sp: "B", text: "In the quiet carriage, near the middle of the train. I put the bag on the rack above my seat and forgot about it when I got off." },
          { sp: "A", text: "That happens a lot, believe me. If we find it, how would you like us to contact you? By phone call?" },
          { sp: "B", text: "I'm in meetings most of the day, so a text message would be best." },
          { sp: "A", text: "No problem. I should tell you there's a handling fee when you collect an item. It used to be three pounds, but it went up to five this year." },
          { sp: "B", text: "That's fine." },
          { sp: "A", text: "And the office is open until eight on weekdays, but on Saturdays we close at six." },
          { sp: "B", text: "I'll probably come on Saturday, so I'll make sure I'm here before six." },
          { sp: "A", text: "Lovely. Let me just check the system for you." }
        ] },

      { id: "w12-l2", kind: "listening", part: 2, lang: "en-GB", rate: 0.95, pauseMs: 500, transcript: "hidden", maxPlays: 1, source: "tự soạn",
        speakers: [{ id: "A", name: "Radio presenter", voice: "male" }],
        lines: [
          { sp: "A", text: "Good evening, and welcome to What's On. This week, we're looking ahead to the Morwen Lantern Festival, which takes place over the coming weekend. This is the festival's tenth year, and the organisers have made a few changes, so let me run through the main points." },
          { sp: "A", text: "First, getting there. In previous years, many visitors drove into the town centre, and parking was a real problem. This year the centre will be closed to cars all weekend, and the organisers are running free shuttle buses from the sports ground on the edge of town. They're asking everyone to use those rather than trying to park in residential streets." },
          { sp: "A", text: "Second, tickets. Most events are free, as always, but the lantern-making workshops have become so popular that they now need to be booked in advance online. You can't just turn up on the day." },
          { sp: "A", text: "The theme this year is Rivers. The organisers chose it because the festival began on the riverbank, and they wanted to mark the tenth anniversary by returning to its origins. So expect lots of lanterns shaped like fish, boats and birds." },
          { sp: "A", text: "One more thing. In the past, the festival relied on donations from local businesses, but this year it has received funding from the regional arts council for the first time, which is why the programme is bigger than ever." },
          { sp: "A", text: "Now, let me go through the programme day by day. On Friday evening, the festival opens with the lighting of the giant lantern in the market square. That's always a magical moment. Friday is also when the photography exhibition opens in the town hall. It'll stay open all weekend, but the official opening, with a talk by the photographers, is on Friday." },
          { sp: "A", text: "Saturday is the busiest day. The lantern-making workshops run all day in the community centre, and in the evening there's the main parade along the river. If you only go to one event, make it the parade." },
          { sp: "A", text: "Some people have asked about the fireworks. They used to be on Saturday night, after the parade, but because residents complained about the noise so late at night, they've moved to Sunday, and they'll start earlier, at eight o'clock." },
          { sp: "A", text: "Also on Sunday, there's a family storytelling session in the library in the afternoon, and the weekend was going to finish with a concert by the town's youth orchestra in the park. Actually, I've just been told the concert has been moved. It's now on Saturday afternoon, before the parade, so that it doesn't clash with the fireworks." },
          { sp: "A", text: "So, plenty to see. Remember to book those workshops, and enjoy the festival." }
        ] },

      { id: "w12-l3", kind: "listening", part: 3, lang: "en-GB", rate: 0.95, pauseMs: 600, transcript: "hidden", maxPlays: 1, source: "tự soạn",
        speakers: [{ id: "J", name: "Josh", voice: "male" }, { id: "M", name: "Mia", voice: "female" }],
        lines: [
          { sp: "J", text: "Hi Mia. Have you got a few minutes to go over the presentation?" },
          { sp: "M", text: "Sure. We've only got a week left, so we'd better sort out who's doing what." },
          { sp: "J", text: "OK. So, just to remind myself, our topic is food waste in the canteen, and we've got the data from the two weeks we spent weighing the leftover food." },
          { sp: "M", text: "Right. And the thing that surprised me most was where the waste actually came from. I assumed it would be mostly food left on students' plates." },
          { sp: "J", text: "Me too. But plate waste was actually smaller than the food that was never served at all, the food cooked in the kitchen and thrown away at the end of the day." },
          { sp: "M", text: "Exactly. So I think that should be our main message: the biggest problem is overproduction, not students being fussy." },
          { sp: "J", text: "Agreed. Now, how should we start? I was thinking of opening with some national statistics on food waste." },
          { sp: "M", text: "Hmm, I'm not sure. We'd have to check the sources really carefully, and the tutor said she'd prefer us to focus on our own data. What if we started with a photo of one day's waste from the canteen? It's quite shocking." },
          { sp: "J", text: "Good idea. That would grab people's attention." },
          { sp: "M", text: "Then we go through the method. That part should be short. People don't need every detail." },
          { sp: "J", text: "Fine. The main problem I can see is the charts. Some of them are really cluttered. The one comparing the days of the week has far too many colours." },
          { sp: "M", text: "Yes, I noticed that. Let's simplify it and just highlight Monday and Friday, because those were the days with the most waste." },
          { sp: "J", text: "Monday and Friday, yes. What about the recommendations? We said we'd suggest three." },
          { sp: "M", text: "Smaller portions as an option, a discount on food near closing time, and better forecasting of how many meals to cook." },
          { sp: "J", text: "I think the forecasting one is the most important, given what we found. The discount idea is good, but it only deals with food that's already been cooked." },
          { sp: "M", text: "True. Let's present forecasting first, then." },
          { sp: "J", text: "How long have we got?" },
          { sp: "M", text: "Fifteen minutes for the presentation itself, and then five minutes for questions. And our draft is about twenty minutes, so we definitely need to cut something." },
          { sp: "J", text: "OK. So, who does what? I'm happy to redo the charts, since I made them in the first place." },
          { sp: "M", text: "Great. I'll write the introduction, the part with the photo, because I took the photos." },
          { sp: "J", text: "And the recommendations?" },
          { sp: "M", text: "Shall we split those? You do one and I do two. Or actually, let's both work on them together. They're the most important part." },
          { sp: "J", text: "OK, we'll do them together. What about the handout? The tutor said a one-page summary would be useful." },
          { sp: "M", text: "Could you do that? I'm terrible at layout." },
          { sp: "J", text: "Sure, I'll do the handout. And who's going to contact the canteen manager to thank her and ask if she'd like to come?" },
          { sp: "M", text: "I'll do that. I've already met her a couple of times." },
          { sp: "J", text: "Perfect. And we both need to be at the final rehearsal, obviously." },
          { sp: "M", text: "Obviously. Let's book a room for Thursday." }
        ] },

      { id: "w12-l4", kind: "listening", part: 4, lang: "en-GB", rate: 0.95, pauseMs: 500, transcript: "hidden", maxPlays: 1, source: "tự soạn",
        speakers: [{ id: "A", name: "Lecturer", voice: "male" }],
        lines: [
          { sp: "A", text: "Today I'd like to present a case study that brings together several ideas from this module: the restoration of Fenmoor, a wetland area in a river valley. I should say at the start that Fenmoor is not a famous site, but that's partly why it's useful. It shows what can be achieved with a modest budget." },
          { sp: "A", text: "First, some background. For about a century, most of Fenmoor was used as farmland. To make it suitable for growing crops, the land was drained using a network of ditches, which carried water away into the river. Over time, the soil, which was rich in peat, dried out and gradually shrank, so the land surface actually became lower." },
          { sp: "A", text: "By the time the restoration began, farming there had become less and less profitable, and the land was frequently flooded in winter anyway. A conservation charity bought the site from the farming families, who were, in most cases, willing to sell." },
          { sp: "A", text: "The restoration had three stages. In the first stage, the team blocked the drainage ditches with small dams made of earth and wood, so that water would stay on the land rather than flowing away. This was the cheapest stage, but also, arguably, the most important." },
          { sp: "A", text: "In the second stage, they reshaped parts of the land to create shallow pools and channels. The aim was to produce a variety of water depths, because different species prefer different conditions. Wading birds, for instance, feed in very shallow water, while fish need deeper channels." },
          { sp: "A", text: "The third stage involved the plants. Rather than planting everything by hand, which would have been very expensive, the team spread seeds collected from a nearby wetland and allowed other plants to arrive naturally." },
          { sp: "A", text: "Now, what were the results? The most visible change was the return of birds. Within five years, the number of breeding bird species on the site had roughly doubled, according to the charity's own surveys." },
          { sp: "A", text: "There were also benefits for people living downstream. Because the restored wetland holds water like a sponge, it reduces the risk of flooding in the town further down the valley." },
          { sp: "A", text: "However, the project wasn't without problems. One unexpected issue was an invasive plant, a fast-growing reed from another region, which began to spread across the open water. Volunteers now remove it by hand each summer." },
          { sp: "A", text: "Another challenge was public access. The charity wanted people to visit, but too many visitors could disturb nesting birds. The solution was a raised boardwalk, which keeps visitors on a fixed route." },
          { sp: "A", text: "Finally, I want to mention monitoring. The charity relies heavily on volunteers to count birds and record plants, and this data is now shared with the local university, whose students use it for research projects." }
        ] },

      { id: "w12-s1", kind: "speaking-prompt", part: 1, lang: "en-GB", rate: 0.95, pauseMs: 500, transcript: "shown", maxPlays: null, source: "tự soạn",
        speakers: [{ id: "E", name: "Examiner", voice: "male" }],
        lines: [
          { sp: "E", text: "Good morning. This is the speaking test practice. In this first part, I'd like to ask you some questions about yourself." },
          { sp: "E", text: "Let's talk about where you live." }
        ] },
      { id: "w12-s2", kind: "speaking-prompt", part: 2, lang: "en-GB", rate: 0.95, pauseMs: 500, transcript: "shown", maxPlays: null, source: "tự soạn",
        speakers: [{ id: "E", name: "Examiner", voice: "male" }],
        lines: [
          { sp: "E", text: "Now I'm going to give you a topic, and I'd like you to talk about it for one to two minutes. Before you talk, you'll have one minute to think about what you're going to say. You can make some notes if you wish." },
          { sp: "E", text: "Here is your topic. I'd like you to describe a place you visited that was very crowded." }
        ] },
      { id: "w12-s3", kind: "speaking-prompt", part: 3, lang: "en-GB", rate: 0.95, pauseMs: 500, transcript: "shown", maxPlays: null, source: "tự soạn",
        speakers: [{ id: "E", name: "Examiner", voice: "male" }],
        lines: [
          { sp: "E", text: "We've been talking about a crowded place you visited. I'd now like to discuss with you some more general questions related to this." }
        ] },
      { id: "w12-sm2", kind: "speaking-model", part: 2, lang: "en-GB", rate: 0.95, pauseMs: 400, transcript: "hidden", maxPlays: null, source: "tự soạn",
        speakers: [{ id: "C", name: "Candidate (model)", voice: "female" }],
        lines: [
          { sp: "C", text: "I'd like to talk about a night market I went to with my cousin a couple of years ago, in the city where she lives." },
          { sp: "C", text: "It was during the New Year holiday, so I suppose that explains why it was so crowded. Everyone had time off work, the weather was cool and dry, and it seemed as if the whole city, plus thousands of visitors, had decided to go out on the same evening. The market itself is in a fairly narrow street, so even on a normal night it's busy, but that evening you could barely move. At one point, it took us about twenty minutes to walk a hundred metres." },
          { sp: "C", text: "We went there mainly for the food. My cousin had been telling me for months about a particular stall that sells grilled rice paper, and she insisted that I had to try it. When we finally found it, the queue was enormous, but to be fair, it was worth the wait." },
          { sp: "C", text: "As for how I felt, it was a mixture, really. At first I found it quite stressful, because I'm not a big fan of crowds and I was worried about losing my phone. But after a while I started to enjoy the atmosphere. People were laughing, there was live music somewhere, and everyone seemed to be in a good mood. Looking back, I think the crowd was actually part of the experience. If the street had been empty, it wouldn't have felt like a celebration." },
          { sp: "C", text: "That said, next time I'd probably choose a quieter evening." }
        ] }
    ],

    // -------------------------------------------------------------------- MOCK
    mock: {
      title: B("Mock tuần 12 – Đủ 4 kỹ năng (Ngày 1: Listening + Reading + Writing; Ngày 2: Speaking)",
               "Week 12 mock – All four skills (Day 1: Listening + Reading + Writing; Day 2: Speaking)"),
      note: B("Ngày 1 làm liền 3 phần, chỉ nghỉ ngắn giữa các phần như bạn dự kiến khi thi; Ngày 2 làm Speaking. Thứ tự và lịch thi thật do đơn vị tổ chức thông báo — mock này chỉ mô phỏng.",
              "Day 1: do the three papers in one session with only short breaks, as you expect on test day; Day 2: Speaking. The real order and schedule are set by the test provider — this mock is only a simulation."),
      sections: [
        // ---------------- DAY 1: LISTENING ----------------
        { id: "w12-mL", skill: "listening", day: 1, timeLimitMin: 40, readAheadSec: 30, reviewMin: 2,
          refs: ["w12-l1", "w12-l2", "w12-l3", "w12-l4"],
          title: B("Ngày 1 – Listening (4 phần, 40 câu)", "Day 1 – Listening (4 parts, 40 questions)"),
          instructions: B("Mỗi kịch bản phát MỘT lần bằng giọng trình duyệt. Trước mỗi phần có 30 giây đọc câu hỏi; sau phần 4 có 2 phút soát. Không mở transcript trước khi nộp.",
                          "Each script plays ONCE using the browser's voice. You have 30 seconds to read the questions before each part and 2 minutes to check after Part 4. Do not open the transcripts before submitting."),
          groups: [
            { start: "w12-m01", end: "w12-m10", ref: "w12-l1", instructions: B("Phần 1 – Câu 1–10: Hoàn thành phiếu báo mất đồ. Viết MỘT TỪ VÀ/HOẶC MỘT SỐ.", "Part 1 – Questions 1–10: Complete the lost property form. Write ONE WORD AND/OR A NUMBER.") },
            { start: "w12-m11", end: "w12-m14", ref: "w12-l2", instructions: B("Phần 2 – Câu 11–14: Chọn đáp án đúng A, B, C hoặc D.", "Part 2 – Questions 11–14: Choose the correct letter, A, B, C or D.") },
            { start: "w12-m15", end: "w12-m15", ref: "w12-l2", instructions: B("Phần 2 – Câu 15–20: Mỗi sự kiện diễn ra vào ngày nào? Chọn A, B hoặc C. Một lựa chọn có thể dùng nhiều lần.", "Part 2 – Questions 15–20: On which day does each event take place? Choose A, B or C. You may use any letter more than once.") },
            { start: "w12-m21", end: "w12-m25", ref: "w12-l3", instructions: B("Phần 3 – Câu 21–25: Chọn đáp án đúng A, B, C hoặc D.", "Part 3 – Questions 21–25: Choose the correct letter, A, B, C or D.") },
            { start: "w12-m26", end: "w12-m26", ref: "w12-l3", instructions: B("Phần 3 – Câu 26–30: Ai sẽ làm từng việc? Chọn A, B hoặc C. Một lựa chọn có thể dùng nhiều lần.", "Part 3 – Questions 26–30: Who will do each task? Choose A, B or C. You may use any letter more than once.") },
            { start: "w12-m31", end: "w12-m36", ref: "w12-l4", instructions: B("Phần 4 – Câu 31–36: Hoàn thành ghi chú. Viết MỘT TỪ DUY NHẤT.", "Part 4 – Questions 31–36: Complete the notes. Write ONE WORD ONLY.") },
            { start: "w12-m37", end: "w12-m40", ref: "w12-l4", instructions: B("Phần 4 – Câu 37–40: Trả lời câu hỏi. Viết KHÔNG QUÁ HAI TỪ.", "Part 4 – Questions 37–40: Answer the questions. Write NO MORE THAN TWO WORDS.") }
          ],
          questions: [
            // Part 1
            { id: "w12-m01", type: "gap", ref: "w12-l1", limit: { words: 1, number: true }, q: "Name: Daniel ___", accept: ["Frayne"],
              why: B("Đánh vần F-R-A-Y-N-E; chép đúng từng chữ (không phải 'Frain').", "Spelled F-R-A-Y-N-E; copy it exactly (not 'Frain').") },
            { id: "w12-m02", type: "gap", ref: "w12-l1", limit: { words: 1, number: true }, q: "Type of bag: ___", accept: ["backpack"],
              why: B("'A backpack. Quite a large one'.", "'A backpack. Quite a large one'.") },
            { id: "w12-m03", type: "gap", ref: "w12-l1", limit: { words: 1, number: true }, q: "Colour: dark ___", accept: ["green"],
              why: B("'People always assume it's black… but it's definitely green' → black là bẫy.", "'People always assume it's black… but it's definitely green' → black is the trap.") },
            { id: "w12-m04", type: "gap", ref: "w12-l1", limit: { words: 1, number: true }, q: "Most important item inside: ___", accept: ["camera"],
              why: B("'Mostly clothes, but the important thing is my camera'.", "'Mostly clothes, but the important thing is my camera'.") },
            { id: "w12-m05", type: "gap", ref: "w12-l1", limit: { words: 1, number: true }, q: "Day lost: ___", accept: ["Wednesday"],
              why: B("Anh nói Tuesday rồi sửa: 'I travelled on Wednesday, so it was Wednesday'.", "He says Tuesday, then corrects himself: 'I travelled on Wednesday, so it was Wednesday'.") },
            { id: "w12-m06", type: "gap", ref: "w12-l1", limit: { words: 1, number: true }, q: "Platform: ___", accept: ["9", "nine"],
              why: B("'Platform nine, I think. Yes, nine.'", "'Platform nine, I think. Yes, nine.'") },
            { id: "w12-m07", type: "gap", ref: "w12-l1", limit: { words: 1, number: true }, q: "Seat: in the ___ carriage", accept: ["quiet"],
              why: B("'In the quiet carriage, near the middle of the train'.", "'In the quiet carriage, near the middle of the train'.") },
            { id: "w12-m08", type: "gap", ref: "w12-l1", limit: { words: 1, number: true }, q: "Contact by: ___ message", accept: ["text"],
              why: B("Nhân viên gợi ý gọi điện (bẫy); anh chọn 'a text message would be best'.", "The clerk suggests a phone call (the trap); he chooses 'a text message would be best'.") },
            { id: "w12-m09", type: "gap", ref: "w12-l1", limit: { words: 1, number: true }, q: "Handling fee: £___", accept: ["5", "five"],
              why: B("'It used to be three pounds, but it went up to five this year'.", "'It used to be three pounds, but it went up to five this year'.") },
            { id: "w12-m10", type: "gap", ref: "w12-l1", limit: { words: 1, number: true }, q: "Office closes on Saturdays at: ___ p.m.", accept: ["6", "six"],
              why: B("Ngày thường đến 8 giờ (bẫy), 'on Saturdays we close at six'.", "Weekdays until eight (the trap); 'on Saturdays we close at six'.") },
            // Part 2
            { id: "w12-m11", type: "mcq", ref: "w12-l2",
              q: "What is new about transport to the festival this year?",
              opts: ["A. Extra parking in the town centre", "B. Free shuttle buses from the sports ground", "C. A new train service", "D. Cheaper bus fares"],
              a: 1,
              why: B("'the organisers are running free shuttle buses from the sports ground'; trung tâm đóng cửa với ô tô nên A sai.", "'the organisers are running free shuttle buses from the sports ground'; the centre is closed to cars, so A is wrong.") },
            { id: "w12-m12", type: "mcq", ref: "w12-l2",
              q: "What must visitors now book in advance?",
              opts: ["A. the parade", "B. the lantern-making workshops", "C. the concert", "D. the shuttle buses"],
              a: 1,
              why: B("'the lantern-making workshops… now need to be booked in advance online'.", "'the lantern-making workshops… now need to be booked in advance online'.") },
            { id: "w12-m13", type: "mcq", ref: "w12-l2",
              q: "Why was the theme 'Rivers' chosen?",
              opts: ["A. The river was recently cleaned", "B. To mark the festival's origins on the riverbank", "C. A competition winner suggested it", "D. Local fishermen sponsor the festival"],
              a: 1,
              why: B("'the festival began on the riverbank, and they wanted to mark the tenth anniversary by returning to its origins'.", "'the festival began on the riverbank, and they wanted to mark the tenth anniversary by returning to its origins'.") },
            { id: "w12-m14", type: "mcq", ref: "w12-l2",
              q: "How is this year's festival funded differently?",
              opts: ["A. through ticket sales", "B. with a grant from the regional arts council", "C. by a national bank", "D. by larger business donations"],
              a: 1,
              why: B("Trước đây dựa vào doanh nghiệp (bẫy D); năm nay 'received funding from the regional arts council for the first time'.", "In the past it relied on businesses (trap D); this year it 'received funding from the regional arts council for the first time'.") },
            { id: "w12-m15", type: "matching", kind: "feature", ref: "w12-l2", scoreEach: true, reuse: true,
              q: "Questions 15–20: On which day does each event take place?",
              items: ["15. lighting of the giant lantern", "16. official opening of the photography exhibition", "17. main parade", "18. fireworks", "19. family storytelling session", "20. youth orchestra concert"],
              options: ["A. Friday", "B. Saturday", "C. Sunday"],
              a: [0, 0, 1, 2, 2, 1],
              why: B("Thứ Sáu: thắp đèn lồng lớn, khai mạc triển lãm ảnh. Thứ Bảy: diễu hành. Pháo hoa từng ở thứ Bảy nhưng chuyển sang Chủ nhật. Kể chuyện: Chủ nhật. Hoà nhạc định Chủ nhật nhưng chuyển sang chiều thứ Bảy.",
                     "Friday: giant lantern lighting and the exhibition opening. Saturday: parade. Fireworks used to be Saturday but moved to Sunday. Storytelling: Sunday. The concert was planned for Sunday but moved to Saturday afternoon.") },
            // Part 3
            { id: "w12-m21", type: "mcq", ref: "w12-l3",
              q: "What surprised the students most about their data?",
              opts: ["A. Most waste came from food that was never served", "B. Students wasted more at dinner than at lunch", "C. Waste was lower than expected", "D. Vegetarian dishes were wasted most"],
              a: 0,
              why: B("Họ nghĩ chủ yếu là thức ăn thừa trên đĩa, nhưng 'plate waste was actually smaller than the food that was never served at all'.", "They expected plate waste, but 'plate waste was actually smaller than the food that was never served at all'.") },
            { id: "w12-m22", type: "mcq", ref: "w12-l3",
              q: "How do they decide to begin the presentation?",
              opts: ["A. with national statistics", "B. with a photo of one day's waste", "C. with a short quiz", "D. with a video interview"],
              a: 1,
              why: B("Josh đề xuất số liệu quốc gia (bẫy A); Mia đề xuất ảnh rác thải một ngày, Josh đồng ý: 'Good idea'.", "Josh suggests national statistics (trap A); Mia suggests a photo of one day's waste and Josh agrees: 'Good idea'.") },
            { id: "w12-m23", type: "mcq", ref: "w12-l3",
              q: "What do they decide about the chart comparing days of the week?",
              opts: ["A. delete it", "B. simplify it", "C. correct the data", "D. move it to the start"],
              a: 1,
              why: B("'Let's simplify it and just highlight Monday and Friday'.", "'Let's simplify it and just highlight Monday and Friday'.") },
            { id: "w12-m24", type: "mcq", ref: "w12-l3",
              q: "Which recommendation do they agree is most important?",
              opts: ["A. smaller portions", "B. a discount near closing time", "C. better forecasting of meals", "D. more vegetarian options"],
              a: 2,
              why: B("'the forecasting one is the most important'; giảm giá chỉ xử lý đồ đã nấu.", "'the forecasting one is the most important'; the discount only deals with food already cooked.") },
            { id: "w12-m25", type: "mcq", ref: "w12-l3",
              q: "What problem do they identify with their draft?",
              opts: ["A. It is too long", "B. It lacks data", "C. It has no conclusion", "D. It repeats the tutor's lecture"],
              a: 0,
              why: B("Bài thuyết trình được 15 phút nhưng bản nháp 'about twenty minutes, so we definitely need to cut something'.", "The presentation must be 15 minutes but the draft is 'about twenty minutes, so we definitely need to cut something'.") },
            { id: "w12-m26", type: "matching", kind: "feature", ref: "w12-l3", scoreEach: true, reuse: true,
              q: "Questions 26–30: Who will do each task?",
              items: ["26. redesign the charts", "27. write the introduction", "28. prepare the recommendations", "29. make the handout", "30. contact the canteen manager"],
              options: ["A. Mia", "B. Josh", "C. both Mia and Josh"],
              a: [1, 0, 2, 1, 0],
              why: B("Josh làm lại biểu đồ (anh làm từ đầu). Mia viết phần mở đầu (cô chụp ảnh). Khuyến nghị: ban đầu định chia nhưng đổi thành cả hai cùng làm. Josh làm handout (Mia kém trình bày). Mia liên hệ quản lý căng tin.",
                     "Josh redoes the charts (he made them). Mia writes the introduction (she took the photos). Recommendations: they first think of splitting them but decide to do them together. Josh makes the handout (Mia is bad at layout). Mia contacts the canteen manager.") },
            // Part 4 — notes
            { id: "w12-m31", type: "gap", ref: "w12-l4", limit: { words: 1, number: false }, q: "Farming period: land drained by a network of ___", accept: ["ditches"],
              why: B("'the land was drained using a network of ditches'.", "'the land was drained using a network of ditches'.") },
            { id: "w12-m32", type: "gap", ref: "w12-l4", limit: { words: 1, number: false }, q: "Soil rich in ___ dried out and shrank", accept: ["peat"],
              why: B("'the soil, which was rich in peat, dried out and gradually shrank'.", "'the soil, which was rich in peat, dried out and gradually shrank'.") },
            { id: "w12-m33", type: "gap", ref: "w12-l4", limit: { words: 1, number: false }, q: "Stage 1: ditches blocked with small ___ of earth and wood", accept: ["dams"],
              why: B("'blocked the drainage ditches with small dams made of earth and wood'. Giữ -s số nhiều.", "'blocked the drainage ditches with small dams made of earth and wood'. Keep the plural -s.") },
            { id: "w12-m34", type: "gap", ref: "w12-l4", limit: { words: 1, number: false }, q: "Stage 2: pools and channels give a variety of water ___", accept: ["depths"],
              why: B("'to produce a variety of water depths'.", "'to produce a variety of water depths'.") },
            { id: "w12-m35", type: "gap", ref: "w12-l4", limit: { words: 1, number: false }, q: "Stage 3: team spread ___ collected from a nearby wetland", accept: ["seeds"],
              why: B("'the team spread seeds collected from a nearby wetland'. Trồng bằng tay bị loại vì quá đắt.", "'the team spread seeds collected from a nearby wetland'. Planting by hand was rejected as too expensive.") },
            { id: "w12-m36", type: "gap", ref: "w12-l4", limit: { words: 1, number: false }, q: "Result: within five years, breeding bird species roughly ___", accept: ["doubled"],
              why: B("'the number of breeding bird species on the site had roughly doubled' (theo khảo sát của chính tổ chức — chi tiết hư cấu).", "'the number of breeding bird species on the site had roughly doubled' (according to the charity's own surveys — a fictional detail).") },
            // Part 4 — short answers
            { id: "w12-m37", type: "short", ref: "w12-l4", limit: { words: 2, number: false }, q: "What does the lecturer compare the restored wetland to?", accept: ["a sponge", "sponge"],
              why: B("'the restored wetland holds water like a sponge'.", "'the restored wetland holds water like a sponge'.") },
            { id: "w12-m38", type: "short", ref: "w12-l4", limit: { words: 2, number: false }, q: "What type of plant caused an unexpected problem?", accept: ["invasive plant", "fast-growing reed", "reed", "invasive reed"],
              why: B("'an invasive plant, a fast-growing reed from another region'. Các cách diễn đạt 2 từ đều chấp nhận.", "'an invasive plant, a fast-growing reed from another region'. Either two-word description is accepted.") },
            { id: "w12-m39", type: "short", ref: "w12-l4", limit: { words: 2, number: false }, q: "What keeps visitors on a fixed route?", accept: ["raised boardwalk", "boardwalk", "a boardwalk"],
              why: B("'The solution was a raised boardwalk, which keeps visitors on a fixed route'.", "'The solution was a raised boardwalk, which keeps visitors on a fixed route'.") },
            { id: "w12-m40", type: "short", ref: "w12-l4", limit: { words: 2, number: false }, q: "Who uses the monitoring data for research projects?", accept: ["university students", "students"],
              why: B("Dữ liệu chia sẻ với trường đại học địa phương, 'whose students use it for research projects'. Tình nguyện viên thu thập dữ liệu (bẫy).", "The data is shared with the local university, 'whose students use it for research projects'. Volunteers collect the data (the trap).") }
          ] },

        // ---------------- DAY 1: READING ----------------
        { id: "w12-mR", skill: "reading", day: 1, timeLimitMin: 60, refs: ["w12-p1", "w12-p2", "w12-p3"],
          title: B("Ngày 1 – Reading (3 passage, 40 câu)", "Day 1 – Reading (3 passages, 40 questions)"),
          instructions: B("60 phút, ghi đáp án trực tiếp. Gợi ý: passage 1 khoảng 17 phút, passage 2 khoảng 20 phút, passage 3 khoảng 23 phút; 2 phút cuối điền nốt câu trống.",
                          "60 minutes; write answers directly. Suggested: about 17 minutes for passage 1, 20 for passage 2 and 23 for passage 3; use the last 2 minutes to fill any blanks."),
          groups: [
            { start: "w12-m41", end: "w12-m47", ref: "w12-p1", instructions: B("Câu 1–7: TRUE / FALSE / NOT GIVEN.", "Questions 1–7: TRUE, FALSE or NOT GIVEN.") },
            { start: "w12-m48", end: "w12-m53", ref: "w12-p1", instructions: B("Câu 8–13: Hoàn thành ghi chú. Viết MỘT TỪ VÀ/HOẶC MỘT SỐ.", "Questions 8–13: Complete the notes. Write ONE WORD AND/OR A NUMBER.") },
            { start: "w12-m54", end: "w12-m54", ref: "w12-p2", instructions: B("Câu 14–18: Đoạn nào (A–F) chứa thông tin sau? Một chữ cái có thể dùng nhiều lần.", "Questions 14–18: Which paragraph (A–F) contains the following information? You may use any letter more than once.") },
            { start: "w12-m59", end: "w12-m62", ref: "w12-p2", instructions: B("Câu 19–22: Chọn đáp án đúng A, B, C hoặc D.", "Questions 19–22: Choose the correct letter, A, B, C or D.") },
            { start: "w12-m63", end: "w12-m66", ref: "w12-p2", instructions: B("Câu 23–26: Hoàn thành câu. Viết KHÔNG QUÁ HAI TỪ lấy từ passage.", "Questions 23–26: Complete the sentences. Write NO MORE THAN TWO WORDS from the passage.") },
            { start: "w12-m67", end: "w12-m72", ref: "w12-p3", instructions: B("Câu 27–32: YES / NO / NOT GIVEN theo quan điểm tác giả.", "Questions 27–32: YES, NO or NOT GIVEN according to the writer's views.") },
            { start: "w12-m73", end: "w12-m76", ref: "w12-p3", instructions: B("Câu 33–36: Chọn đáp án đúng A, B, C hoặc D.", "Questions 33–36: Choose the correct letter, A, B, C or D.") },
            { start: "w12-m77", end: "w12-m80", ref: "w12-p3", instructions: B("Câu 37–40: Hoàn thành tóm tắt. Viết KHÔNG QUÁ HAI TỪ lấy từ passage.", "Questions 37–40: Complete the summary. Write NO MORE THAN TWO WORDS from the passage.") }
          ],
          questions: [
            // Passage 1 — TFNG (Q1–7)
            { id: "w12-m41", type: "tfng", variant: "tfng", ref: "w12-p1", q: "The lighthouse was built because ships had been wrecked near the island.", a: "T",
              why: B("Đoạn A: 'built after a series of shipwrecks on the reef that surrounds the island'.", "Paragraph A: 'built after a series of shipwrecks on the reef that surrounds the island'.") },
            { id: "w12-m42", type: "tfng", variant: "tfng", ref: "w12-p1", tag: "NG-trap", q: "Varrick Light was the first lighthouse on the western coast to be automated.", a: "NG",
              why: B("Bài nói đèn nay tự động, nhưng không so sánh với các hải đăng khác → NOT GIVEN.", "The passage says the light is now automatic but never compares it with other lighthouses, so NOT GIVEN.") },
            { id: "w12-m43", type: "tfng", variant: "tfng", ref: "w12-p1", q: "Two keepers lived on the island at any one time.", a: "F",
              why: B("Đoạn B: 'Three keepers lived there at any one time'.", "Paragraph B: 'Three keepers lived there at any one time'.") },
            { id: "w12-m44", type: "tfng", variant: "tfng", ref: "w12-p1", q: "Cleaning the lens was a quick task.", a: "F",
              why: B("Đoạn B: 'a task that took far longer than visitors expected' → mâu thuẫn với 'quick'.", "Paragraph B: 'a task that took far longer than visitors expected', which contradicts 'quick'.") },
            { id: "w12-m45", type: "tfng", variant: "tfng", ref: "w12-p1", tag: "NG-trap", q: "The keepers were paid extra during the winter months.", a: "NG",
              why: B("Đoạn C nói về khó khăn mùa đông nhưng không nói gì về lương → NOT GIVEN.", "Paragraph C describes winter difficulties but says nothing about pay, so NOT GIVEN.") },
            { id: "w12-m46", type: "tfng", variant: "tfng", ref: "w12-p1", q: "The keepers' weather records were used in national forecasts.", a: "T",
              why: B("Đoạn D: hồ sơ thời tiết gửi cho cơ quan khí tượng quốc gia, 'which used them in its forecasts'.", "Paragraph D: the records went to the national weather service, 'which used them in its forecasts'.") },
            { id: "w12-m47", type: "tfng", variant: "tfng", ref: "w12-p1", q: "All the fishermen in the nearby harbour supported automation.", a: "F",
              why: B("Đoạn F: 'Not everyone welcomed the change. Fishermen… argued that a machine… could not watch the sea'.", "Paragraph F: 'Not everyone welcomed the change. Fishermen… argued that a machine… could not watch the sea'.") },
            // Passage 1 — notes (Q8–13)
            { id: "w12-m48", type: "gap", ref: "w12-p1", limit: { words: 1, number: true }, q: "Supplies: delivered by boat every ___ weeks", accept: ["2", "two"],
              why: B("Đoạn C: 'Supplies arrived by boat every two weeks'. 'a month or more' là khi bão làm chậm.", "Paragraph C: 'Supplies arrived by boat every two weeks'. 'a month or more' refers to storm delays.") },
            { id: "w12-m49", type: "gap", ref: "w12-p1", limit: { words: 1, number: true }, q: "Winter store: tinned food, flour and ___", accept: ["fuel"],
              why: B("Đoạn C: 'a store of tinned food, flour and fuel'.", "Paragraph C: 'a store of tinned food, flour and fuel'.") },
            { id: "w12-m50", type: "gap", ref: "w12-p1", limit: { words: 1, number: true }, q: "Contact with families: mainly by ___ before the radio telephone", accept: ["letters", "letter"],
              why: B("Đoạn C: 'Letters were the main form of contact until a radio telephone was installed'.", "Paragraph C: 'Letters were the main form of contact until a radio telephone was installed'.") },
            { id: "w12-m51", type: "gap", ref: "w12-p1", limit: { words: 1, number: true }, q: "Weather recorded every ___ hours", accept: ["3", "three"],
              why: B("Đoạn D: 'They recorded the weather every three hours'.", "Paragraph D: 'They recorded the weather every three hours'.") },
            { id: "w12-m52", type: "gap", ref: "w12-p1", limit: { words: 1, number: true }, q: "First step of automation: an electric lamp replaced the oil ___", accept: ["burner"],
              why: B("Đoạn E: 'an electric lamp replaced the oil burner'.", "Paragraph E: 'an electric lamp replaced the oil burner'.") },
            { id: "w12-m53", type: "gap", ref: "w12-p1", limit: { words: 1, number: true }, q: "Heritage group: hopes to open a small ___", accept: ["museum"],
              why: B("Đoạn G: 'they hope eventually to open a small museum about the keepers' lives'.", "Paragraph G: 'they hope eventually to open a small museum about the keepers' lives'.") },
            // Passage 2 — matching information (Q14–18)
            { id: "w12-m54", type: "matching", kind: "info", ref: "w12-p2", scoreEach: true, reuse: true,
              q: "Questions 14–18: Which paragraph contains the following information?",
              items: ["14. a description of mistakes made by borrowers", "15. a reason why some plants are harder to save seeds from", "16. a condition set for allowing the project to start", "17. a response to doubts about seed quality", "18. the limit on how many packets a person may take"],
              options: ["A", "B", "C", "D", "E", "F"],
              a: [2, 3, 1, 4, 0],
              why: B("14 → C (hạt chưa chín, bảo quản nơi ẩm). 15 → D (côn trùng mang phấn giữa các giống bí). 16 → B (không cần thêm nhân viên). 17 → E (ghi chú 'best effort', báo hạt không mọc). 18 → A (tối đa 5 gói mỗi mùa).",
                     "14 → C (unripe seeds, damp storage). 15 → D (insects carry pollen between squash varieties). 16 → B (no extra staff). 17 → E ('best effort' note, reporting failed packets). 18 → A (up to five packets per season).") },
            // Passage 2 — MCQ (Q19–22)
            { id: "w12-m59", type: "mcq", ref: "w12-p2", q: "Why did Owen Pritchard start the seed library?",
              opts: ["A. to earn money from his garden", "B. to stop old varieties from disappearing", "C. because garden centres asked him to", "D. to teach school pupils about plants"],
              a: 1,
              why: B("Đoạn B: các giống ông trồng không còn bán; 'When I'm gone, these will disappear with me'.", "Paragraph B: his varieties were no longer sold; 'When I'm gone, these will disappear with me'.") },
            { id: "w12-m60", type: "mcq", ref: "w12-p2", q: "What happened in the seed library's first year?",
              opts: ["A. Most borrowers returned seeds", "B. Fewer than a third of borrowers returned seeds", "C. The library hired extra staff", "D. The workshops were cancelled"],
              a: 1,
              why: B("Đoạn C: 'fewer than a third of borrowers returned seeds'. Workshop chỉ bắt đầu vào mùa xuân năm sau.", "Paragraph C: 'fewer than a third of borrowers returned seeds'. Workshops only began the following spring.") },
            { id: "w12-m61", type: "mcq", ref: "w12-p2", q: "Why are beans considered suitable for beginners?",
              opts: ["A. They grow very quickly", "B. Their flowers usually pollinate themselves", "C. They need little water", "D. Insects avoid them"],
              a: 1,
              why: B("Đoạn D: 'because their flowers usually pollinate themselves, so the seeds tend to grow into plants like the parent'.", "Paragraph D: 'because their flowers usually pollinate themselves, so the seeds tend to grow into plants like the parent'.") },
            { id: "w12-m62", type: "mcq", ref: "w12-p2", q: "What does Pritchard value most about the project?",
              opts: ["A. the number of packets lent", "B. conversations about growers' experiences", "C. income from the seed swap", "D. attention from the media"],
              a: 1,
              why: B("Đoạn F: 'the most rewarding change is not the number of packets but the conversations'.", "Paragraph F: 'the most rewarding change is not the number of packets but the conversations'.") },
            // Passage 2 — sentence completion (Q23–26)
            { id: "w12-m63", type: "gap", ref: "w12-p2", limit: { words: 2, number: false }, q: "Borrowers are asked to save seeds from their ___.", accept: ["best plants"],
              why: B("Đoạn A: 'save some seeds from their best plants'.", "Paragraph A: 'save some seeds from their best plants'.") },
            { id: "w12-m64", type: "gap", ref: "w12-p2", limit: { words: 2, number: false }, q: "Some borrowers stored seeds in ___ conditions, so the seeds rotted.", accept: ["damp"],
              why: B("Đoạn C: 'stored them in damp conditions, where they rotted'.", "Paragraph C: 'stored them in damp conditions, where they rotted'.") },
            { id: "w12-m65", type: "gap", ref: "w12-p2", limit: { words: 2, number: false }, q: "The drawers are labelled by difficulty using one to three ___.", accept: ["leaves"],
              why: B("Đoạn D: 'a simple system of one to three leaves'.", "Paragraph D: 'a simple system of one to three leaves'.") },
            { id: "w12-m66", type: "gap", ref: "w12-p2", limit: { words: 2, number: false }, q: "Similar projects have now started in three ___.", accept: ["neighbouring towns", "neighboring towns"],
              why: B("Đoạn F: 'similar projects have started in three neighbouring towns'. Chấp nhận chính tả Anh-Mỹ 'neighboring'.", "Paragraph F: 'similar projects have started in three neighbouring towns'. The American spelling 'neighboring' is accepted.") },
            // Passage 3 — YNNG (Q27–32)
            { id: "w12-m67", type: "tfng", variant: "ynng", ref: "w12-p3", q: "Most people are as unaffected by background noise as they believe.", a: "N",
              why: B("Đoạn A: chúng ta tin mình đã quen tiếng ồn, nhưng 'this belief is mistaken'.", "Paragraph A: we believe we ignore the noise, but 'this belief is mistaken'.") },
            { id: "w12-m68", type: "tfng", variant: "ynng", ref: "w12-p3", q: "Each individual effect of noise is dramatic.", a: "N",
              why: B("Đoạn B: 'None of these effects is dramatic on its own'.", "Paragraph B: 'None of these effects is dramatic on its own'.") },
            { id: "w12-m69", type: "tfng", variant: "ynng", ref: "w12-p3", q: "People with less money are more likely to live close to loud roads.", a: "Y",
              why: B("Đoạn C: 'those with the least money often live closest to the loudest roads'.", "Paragraph C: 'those with the least money often live closest to the loudest roads'.") },
            { id: "w12-m70", type: "tfng", variant: "ynng", ref: "w12-p3", q: "Electric buses are quieter than older diesel buses, especially at low speeds.", a: "Y",
              why: B("Đoạn D: 'electric buses are considerably quieter than older diesel vehicles, particularly at low speeds'.", "Paragraph D: 'electric buses are considerably quieter than older diesel vehicles, particularly at low speeds'.") },
            { id: "w12-m71", type: "tfng", variant: "ynng", ref: "w12-p3", q: "Designated quiet areas should be completely silent.", a: "N",
              why: B("Đoạn E: 'Such places would not be silent, and nor should they be'.", "Paragraph E: 'Such places would not be silent, and nor should they be'.") },
            { id: "w12-m72", type: "tfng", variant: "ynng", ref: "w12-p3", tag: "NG-trap", q: "Noise rules would be more popular with older residents than with younger ones.", a: "NG",
              why: B("Tác giả không nhắc tới nhóm tuổi nào → NOT GIVEN.", "The writer never mentions age groups, so NOT GIVEN.") },
            // Passage 3 — MCQ (Q33–36)
            { id: "w12-m73", type: "mcq", ref: "w12-p3", q: "In paragraph B, why does the writer say the effects of noise are overlooked?",
              opts: ["A. They are rarely studied", "B. Each one is small on its own", "C. Only children are affected", "D. People remember them clearly"],
              a: 1,
              why: B("Đoạn B: 'None of these effects is dramatic on its own, which is precisely why they are so easily overlooked'.", "Paragraph B: 'None of these effects is dramatic on its own, which is precisely why they are so easily overlooked'.") },
            { id: "w12-m74", type: "mcq", ref: "w12-p3", q: "What is the writer's main objection to telling people to move to the countryside?",
              opts: ["A. The countryside is also noisy", "B. It is unrealistic and makes quiet a privilege of wealth", "C. Rural transport is poor", "D. Farmers would object"],
              a: 1,
              why: B("Đoạn C: 'both unrealistic and unfair… turns it into yet another advantage of wealth'.", "Paragraph C: 'both unrealistic and unfair… turns it into yet another advantage of wealth'.") },
            { id: "w12-m75", type: "mcq", ref: "w12-p3", q: "Why does the writer mention rules about litter and smoking?",
              opts: ["A. to show that such rules usually fail", "B. to show that rules once seen as intrusive became accepted", "C. to suggest noise is less harmful than smoking", "D. to compare the size of fines"],
              a: 1,
              why: B("Đoạn F: 'were once considered intrusive, yet most people now regard them as normal' → phản bác lo ngại thành phố trở nên nhàm chán.", "Paragraph F: they 'were once considered intrusive, yet most people now regard them as normal' → a reply to the 'dull city' concern.") },
            { id: "w12-m76", type: "mcq", ref: "w12-p3", q: "What is the writer's attitude to technical solutions such as quieter road surfaces?",
              opts: ["A. They are useless", "B. They are valuable but treat noise only as an engineering problem", "C. They are too expensive", "D. They are the only realistic option"],
              a: 1,
              why: B("Đoạn D: 'These solutions are valuable, but they tend to treat noise as an engineering problem'.", "Paragraph D: 'These solutions are valuable, but they tend to treat noise as an engineering problem'.") },
            // Passage 3 — summary (Q37–40)
            { id: "w12-m77", type: "gap", ref: "w12-p3", limit: { words: 2, number: false }, q: "Summary: The writer proposes designated ___ such as parks, squares or courtyards.", accept: ["quiet areas"],
              why: B("Đoạn E: 'designated quiet areas: parks, squares or courtyards'.", "Paragraph E: 'designated quiet areas: parks, squares or courtyards'.") },
            { id: "w12-m78", type: "gap", ref: "w12-p3", limit: { words: 2, number: false }, q: "Summary: These places would still include sounds such as birdsong and ___.", accept: ["conversation", "children playing"],
              why: B("Đoạn E: 'birdsong, conversation and children playing'. Cả 'conversation' và 'children playing' đều đúng ngữ pháp và đúng nội dung.", "Paragraph E: 'birdsong, conversation and children playing'. Both 'conversation' and 'children playing' fit the grammar and the text.") },
            { id: "w12-m79", type: "gap", ref: "w12-p3", limit: { words: 2, number: false }, q: "Summary: The same idea could apply to time, for example by restricting ___ in residential streets early in the morning.", accept: ["deliveries"],
              why: B("Đoạn E: 'Restricting deliveries in residential streets during the early morning'.", "Paragraph E: 'Restricting deliveries in residential streets during the early morning'.") },
            { id: "w12-m80", type: "gap", ref: "w12-p3", limit: { words: 2, number: false }, q: "Summary: The writer believes quiet should be planned and shared in the same way as parks and ___.", accept: ["clean water"],
              why: B("Đoạn G: 'in the same way that it already does with parks and clean water'. Lưu ý đoạn A nói 'clean air' — nhưng câu tóm tắt khớp đoạn G.", "Paragraph G: 'in the same way that it already does with parks and clean water'. Paragraph A mentions 'clean air', but this sentence matches paragraph G.") }
          ] },

        // ---------------- DAY 1: WRITING ----------------
        { id: "w12-mW", skill: "writing", day: 1, timeLimitMin: 60,
          title: B("Ngày 1 – Writing (Task 1 + Task 2)", "Day 1 – Writing (Task 1 + Task 2)"),
          instructions: B("60 phút cho cả hai task. Mốc gợi ý: phút 20 xong Task 1, phút 55 bắt đầu soát Task 2. Sau khi nộp, tự chấm theo checklist và chọn band 5–9 cho từng tiêu chí.",
                          "60 minutes for both tasks. Suggested checkpoints: Task 1 finished by minute 20, start proofreading Task 2 at minute 55. After submitting, self-assess with the checklist and choose a band from 5 to 9 for each criterion."),
          questions: [
            { id: "w12-m81", type: "essay", task: "T1", minWords: 150, suggestMin: 20,
              q: "The table below shows the percentage of commuters using four ways of travelling to work in two cities, Varnholt and Elsbridge, in 2005 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. (Hypothetical data.)",
              data: { kind: "table", note: { vi: "số liệu giả định", en: "hypothetical data" },
                      head: ["Mode (% of commuters)", "Varnholt 2005", "Varnholt 2025", "Elsbridge 2005", "Elsbridge 2025"],
                      rows: [["Car", "55", "38", "40", "42"], ["Bus", "20", "22", "35", "25"], ["Bicycle", "5", "18", "10", "11"], ["Walking", "20", "22", "15", "22"]] },
              model: "The table shows how commuters in two cities, Varnholt and Elsbridge, travelled to work in 2005 and 2025, expressed as percentages.\n\nOverall, the car remained the most common way to commute in both cities in 2025, but its dominance fell sharply in Varnholt while it changed little in Elsbridge. The most striking development was the rise of cycling in Varnholt, whereas in Elsbridge the main shift was from buses to walking.\n\nIn Varnholt, more than half of commuters (55%) drove in 2005, but this proportion dropped to 38% two decades later. Over the same period, the share who cycled more than tripled, from 5% to 18%. Bus use and walking both rose slightly, each reaching 22%.\n\nElsbridge followed a different pattern. Car use increased marginally from 40% to 42%, and cycling was almost unchanged at around one in ten commuters. By contrast, the proportion of people taking the bus declined from 35% to 25%, while walking grew from 15% to 22%, matching the figure for Varnholt.",
              checklist: CK_WRITING_T1,
              criteria: ["TA", "CC", "LR", "GRA"],
              why: B("Bài mẫu tự soạn; mọi số trong bài khớp bảng giả định (tổng mỗi cột = 100%). Bài khác vẫn tốt nếu có overview và so sánh chính xác.",
                     "A self-written model; every figure matches the hypothetical table (each column totals 100%). Other answers are fine with a clear overview and accurate comparisons.") },
            { id: "w12-m82", type: "essay", task: "T2", minWords: 250, suggestMin: 40,
              q: "In many cities, the number of people who work from home rather than in an office has increased.\n\nDo the advantages of this development outweigh the disadvantages?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.",
              model: "In many cities, it has become increasingly common for employees to work from home rather than travel to an office every day. In my view, although this trend has some genuine drawbacks, its advantages are more significant, provided that it is managed sensibly.\n\nThe most obvious benefit is the time and money saved by not commuting. A worker who previously spent an hour each way in traffic gains ten hours a week, which can be used for rest, exercise or family life. This is not only good for individuals; fewer daily journeys also reduce congestion and air pollution, which benefits everyone in the city, including those who still have to travel.\n\nWorking from home can also improve productivity for certain tasks. Writing a report or analysing data often requires long periods of concentration, and an open-plan office, with its constant conversations and interruptions, can make this difficult. At home, many employees can organise their day around their most productive hours.\n\nOn the other hand, remote work can weaken relationships between colleagues. New employees in particular may struggle to learn from more experienced staff if they rarely meet them in person, and some people feel isolated without the social contact of an office. There is also a risk that the boundary between work and private life becomes blurred, so that people find it hard to stop working in the evening.\n\nHowever, these problems can largely be reduced through hybrid arrangements, in which staff spend some days in the office for meetings and training and other days at home for focused work. Clear rules about working hours can also protect employees' free time.\n\nIn conclusion, I believe the benefits of working from home, particularly the reduction in commuting and the opportunity for focused work, outweigh the disadvantages, as long as employers combine it with regular face-to-face contact.",
              checklist: CK_WRITING_T2,
              criteria: ["TR", "CC", "LR", "GRA"],
              why: B("Bài mẫu tự soạn chỉ để tham khảo; ví dụ là tình huống giả định ('một giờ mỗi chiều'), không phải số liệu thống kê. Kết luận ngược lại vẫn đạt nếu lập luận rõ và trả lời thẳng câu hỏi 'outweigh'.",
                     "A self-written model for reference only; its example ('an hour each way') is a hypothetical situation, not a statistic. The opposite conclusion is equally valid if well argued and it answers 'outweigh' directly.") }
          ] },

        // ---------------- DAY 2: SPEAKING ----------------
        { id: "w12-mS", skill: "speaking", day: 2, timeLimitMin: 14,
          timer: { autoSubmit: false, warnAtMin: [], pausable: false },
          refs: ["w12-s1", "w12-s2", "w12-s3", "w12-sm2"],
          title: B("Ngày 2 – Speaking (3 phần, khoảng 12 phút)", "Day 2 – Speaking (3 parts, about 12 minutes)"),
          instructions: B("Bật ghi âm trên điện thoại trước khi bắt đầu. App đọc câu hỏi và đếm giờ từng câu. Part 1 khoảng 30 giây/câu; Part 2: 1 phút chuẩn bị, nói đến 2 phút; Part 3 khoảng 50 giây/câu. Nghe lại và tự chấm 4 tiêu chí.",
                          "Start recording on your phone before you begin. The app reads each question and times each answer. Part 1 about 30 seconds per question; Part 2: 1 minute to prepare, speak for up to 2 minutes; Part 3 about 50 seconds per question. Listen back and self-assess the four criteria."),
          groups: [
            { start: "w12-m83", end: "w12-m91", ref: "w12-s1", instructions: B("Part 1 (khoảng 4–5 phút): nơi ở, ảnh, giao thông công cộng.", "Part 1 (about 4–5 minutes): your home, photos, public transport.") },
            { start: "w12-m92", end: "w12-m93", ref: "w12-s2", instructions: B("Part 2 (khoảng 3–4 phút): cue card + 1 câu hỏi kết.", "Part 2 (about 3–4 minutes): cue card + one rounding-off question.") },
            { start: "w12-m94", end: "w12-m98", ref: "w12-s3", instructions: B("Part 3 (khoảng 4–5 phút): đám đông, du lịch, quản lý thành phố.", "Part 3 (about 4–5 minutes): crowds, tourism, managing cities.") }
          ],
          questions: [
            { id: "w12-m83", type: "speak", part: 1, prepSec: 0, talkSec: 30, q: "Do you live in a house or an apartment?", checklist: CK_P1, criteria: SPEAK_CRIT, why: SPEAK_WHY },
            { id: "w12-m84", type: "speak", part: 1, prepSec: 0, talkSec: 30, q: "Which room in your home do you like most? Why?", checklist: CK_P1, criteria: SPEAK_CRIT, why: SPEAK_WHY },
            { id: "w12-m85", type: "speak", part: 1, prepSec: 0, talkSec: 30, q: "Would you like to move to a different home in the future?", checklist: CK_P1, criteria: SPEAK_CRIT, why: SPEAK_WHY },
            { id: "w12-m86", type: "speak", part: 1, prepSec: 0, talkSec: 30, q: "Let's talk about photos. Do you often take photos?", checklist: CK_P1, criteria: SPEAK_CRIT, why: SPEAK_WHY },
            { id: "w12-m87", type: "speak", part: 1, prepSec: 0, talkSec: 30, q: "What do you usually do with the photos you take?", checklist: CK_P1, criteria: SPEAK_CRIT, why: SPEAK_WHY },
            { id: "w12-m88", type: "speak", part: 1, prepSec: 0, talkSec: 30, q: "Do you prefer taking photos of people or of places?", checklist: CK_P1, criteria: SPEAK_CRIT, why: SPEAK_WHY },
            { id: "w12-m89", type: "speak", part: 1, prepSec: 0, talkSec: 30, q: "Now let's move on to public transport. How do you usually travel around your city?", checklist: CK_P1, criteria: SPEAK_CRIT, why: SPEAK_WHY },
            { id: "w12-m90", type: "speak", part: 1, prepSec: 0, talkSec: 30, q: "Is public transport in your city easy to use?", checklist: CK_P1, criteria: SPEAK_CRIT, why: SPEAK_WHY },
            { id: "w12-m91", type: "speak", part: 1, prepSec: 0, talkSec: 30, q: "Did you use public transport more or less when you were a child?", checklist: CK_P1, criteria: SPEAK_CRIT, why: SPEAK_WHY },
            { id: "w12-m92", type: "speak", part: 2, prepSec: 60, talkSec: 120, modelRef: "w12-sm2",
              q: "Describe a place you visited that was very crowded.\nYou should say:\n- where it was\n- when you went there\n- why it was crowded\nand explain how you felt about being there.",
              checklist: CK_P2, criteria: SPEAK_CRIT,
              why: B("Bài nói mẫu (w12-sm2) tự soạn, chỉ tham khảo cách triển khai đủ 4 ý và mô tả cảm xúc; đừng học thuộc. Tự ghi âm, nghe lại, tick checklist.",
                     "The model talk (w12-sm2) is self-written, for reference on covering all four prompts and describing feelings; do not memorise it. Record yourself, listen back and tick the checklist.") },
            { id: "w12-m93", type: "speak", part: 2, prepSec: 0, talkSec: 20, q: "Would you like to go back to that place again?", checklist: [B("Trả lời ngắn 1–2 câu, có lý do", "Short answer of 1–2 sentences with a reason")], criteria: SPEAK_CRIT, why: SPEAK_WHY },
            { id: "w12-m94", type: "speak", part: 3, prepSec: 0, talkSec: 50, q: "Why do many people enjoy visiting crowded places such as festivals or markets?", checklist: CK_P3, criteria: SPEAK_CRIT, why: SPEAK_WHY },
            { id: "w12-m95", type: "speak", part: 3, prepSec: 0, talkSec: 50, q: "What problems can large numbers of tourists cause for local residents?", checklist: CK_P3, criteria: SPEAK_CRIT, why: SPEAK_WHY },
            { id: "w12-m96", type: "speak", part: 3, prepSec: 0, talkSec: 50, q: "How can cities manage crowds safely at popular events?", checklist: CK_P3, criteria: SPEAK_CRIT, why: SPEAK_WHY },
            { id: "w12-m97", type: "speak", part: 3, prepSec: 0, talkSec: 50, q: "Should popular tourist sites limit the number of visitors each day?", checklist: CK_P3, criteria: SPEAK_CRIT, why: SPEAK_WHY },
            { id: "w12-m98", type: "speak", part: 3, prepSec: 0, talkSec: 50, q: "Do you think people will choose quieter holiday destinations in the future? Why?", checklist: CK_P3, criteria: SPEAK_CRIT, why: SPEAK_WHY }
          ] }
      ],
      timer: { autoSubmit: true, warnAtMin: [10, 5], pausable: false },
      band: {
        use: "BAND_EST", estimate: true, label: BAND_LABEL,
        listening: { questions: 40, table: BAND_EST_LISTENING },
        reading: { questions: 40, table: BAND_EST_READING },
        writing: { formula: "(T1 + 2*T2) / 3", round: "down-0.5",
                   note: B("Band Writing ước lượng = (T1 + 2×T2)/3, làm tròn xuống 0,5. Ước lượng tự soạn.", "Estimated Writing band = (T1 + 2×T2)/3, rounded down to 0.5. A self-written estimate.") },
        speaking: { formula: "mean(FC, LR, GRA, P)",
                    note: B("Band Speaking ước lượng = trung bình 4 tiêu chí tự chấm. Ước lượng tự soạn.", "Estimated Speaking band = mean of the four self-assessed criteria. A self-written estimate.") },
        overall: { formula: "mean(L, R, W, S)", round: "nearest-0.5 (.25 up to .5, .75 up to next whole)",
                   note: B("Overall ước lượng = trung bình 4 kỹ năng, làm tròn theo quy tắc trong tóm tắt format của app (tự soạn, chưa xác minh với nguồn chính thức). Không phải điểm thật.",
                           "Estimated overall = mean of the four skills, rounded using the rule in the app's format summary (self-written, not verified against official sources). Not a real score."),
                   followUp: B("Theo PLAN: kỹ năng nào dưới 7.0 → bổ sung 2–4 tuần tập trung kỹ năng đó.", "Per the PLAN: any skill below 7.0 → add 2–4 weeks focused on that skill.") }
      },
      after: [
        B("Ghi band ước lượng 4 kỹ năng và overall vào nhật ký điểm; so với mock tuần 10–11.", "Record estimated bands for all four skills and the overall in your score log; compare with the week 10–11 mocks."),
        B("Kỹ năng nào dưới 7.0: lập kế hoạch 2–4 tuần, bắt đầu từ nhãn lỗi nhiều nhất.", "For any skill below 7.0: plan 2–4 weeks, starting with your most frequent error label."),
        B("Trước khi đăng ký thi: đọc hướng dẫn chính thức của đơn vị tổ chức về lịch, giấy tờ và quy định.", "Before booking: read the provider's official guidance on schedules, documents and rules.")
      ]
    }
  };
})();
