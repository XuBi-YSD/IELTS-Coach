// weeks/w07.js — Tuần 7: Listening Section 3–4 + Speaking Part 2 (cue card).
// Nội dung TỰ SOẠN, không phải đề thi thật. Nhân vật, trường đại học và số liệu khảo sát trong Section 3 là hư cấu.
// Bài giảng Section 4 chỉ dùng kiến thức phổ thông về mái nhà xanh, không nêu số liệu hay nghiên cứu cụ thể.
(function () {
  var SELF = { vi: "Tự soạn – không phải đề thi thật", en: "Self-written – not a real exam" };

  // Checklist tự đánh giá Speaking Part 2 (không chấm tự động)
  var P2_CHECK = [
    { vi: "FC – Nói liên tục 1,5–2 phút; không dừng quá 2 giây; có mở bài, các ý theo gợi ý và kết bài.", en: "FC – Kept talking for 1.5–2 minutes; no pause over 2 seconds; had an opening, the prompt points and a closing." },
    { vi: "FC – Dùng từ nối kể chuyện (At first, After that, What I remember most…, In the end).", en: "FC – Used story linkers (At first, After that, What I remember most…, In the end)." },
    { vi: "LR – Có ít nhất 3 cụm từ miêu tả/collocation hay; tự paraphrase khi thiếu từ.", en: "LR – Used at least three good descriptive phrases or collocations; paraphrased when a word was missing." },
    { vi: "GRA – Thì quá khứ đúng khi kể; có câu phức (when, which, because, although) và ít nhất 1 câu điều kiện hoặc bị động.", en: "GRA – Past tenses correct in the story; complex sentences (when, which, because, although) and at least one conditional or passive." },
    { vi: "Pron – Nhấn từ khoá, ngắt câu theo cụm ý, rõ đuôi -ed; nghe lại không có từ nào khó hiểu.", en: "Pron – Stressed key words, paused between thought groups, clear -ed endings; nothing hard to understand on playback." }
  ];
  var P2_WHY = { vi: "Bấm giờ 60 giây chuẩn bị (ghi từ khoá, không viết câu), rồi nói tới 2 phút. Tự ghi âm bằng máy (app không ghi âm), nghe lại và tick checklist. Bài mẫu dùng nhân vật giả định – không học thuộc.",
                 en: "Take 60 seconds to prepare (keywords only, no full sentences), then speak for up to 2 minutes. Record yourself on your device (the app does not record), listen back and tick the checklist. The model uses an imaginary persona – do not memorise it." };

  // 5 cue card + ghi chú chuẩn bị + bài mẫu (~1,5–2 phút)
  var CARDS = [
    { q: "Describe a time when you helped someone.\nYou should say:\n- who you helped\n- what you did\n- why you helped them\nand explain how you felt about it.",
      notes: "neighbour Mr Hoa – moving house – rainy Saturday – sofa stuck on stairs – son abroad – tired but happy",
      model: "I'd like to talk about a time I helped an elderly neighbour of mine, Mr Hoa, move house. This was about two years ago, on a rainy Saturday morning. Mr Hoa had lived in the flat next to mine for as long as I can remember, but his knees had become so bad that he couldn't manage the stairs any more, so he decided to move to a ground-floor flat a few streets away. His son works abroad, and the removal company he'd booked cancelled at the last minute, so he had nobody else to ask. I spent the whole day carrying boxes, books and, the hardest part, an enormous wooden sofa. What I remember most is the moment the sofa got completely stuck on the stairs. We had to take the legs off, and by the end we were both laughing so much that we had to sit down. As for why I helped, I suppose it just felt like the obvious thing to do. He'd always looked after my plants when I was away, so it was a way of paying him back. In terms of how I felt, I was absolutely exhausted that evening, but also really happy. It made me realise that small acts of kindness can matter much more than we think." },
    { q: "Describe a place in your country that you would like to visit.\nYou should say:\n- where it is\n- how you know about it\n- what you would like to do there\nand explain why you would like to visit this place.",
      notes: "Ha Giang – far north – friend's photos – motorbike, mountain roads, markets – escape the city",
      model: "The place I'd love to visit is Ha Giang, a mountainous area in the far north of Vietnam, right next to the border with China. Strangely enough, even though I've lived in Vietnam all my life, I've never been there. I first heard about it from a close friend who went there on a motorbike trip last year. She showed me her photos, and I was amazed by the views: huge limestone mountains, narrow roads winding along the edge of deep valleys, and tiny villages that look as if they haven't changed for a century. If I went, I'd like to do the same kind of trip, ideally with a local guide who knows the roads, because some of them are quite dangerous. I'd also like to visit one of the weekly markets, where people from different ethnic groups come to buy and sell things, and try some of the local food. The main reason I want to go is that my daily life is very urban. I spend most of my time on construction sites or in traffic, so the idea of a few days surrounded by mountains, with hardly any phone signal, sounds incredibly refreshing. I think it would also help me appreciate how diverse my own country is." },
    { q: "Describe a skill that took you a long time to learn.\nYou should say:\n- what the skill is\n- when you started learning it\n- how you learnt it\nand explain why it took a long time.",
      notes: "swimming – age 25 – fear of deep water – evening classes, a patient coach – one year – fear not technique",
      model: "I'm going to talk about learning to swim, which might sound surprising, because most people learn it as children. I didn't, because I grew up in a town without a public pool, so I only started when I was about twenty-five. A colleague told me about evening classes at a sports centre near our office, and I signed up mainly because I was embarrassed that I couldn't swim. At first, it was a disaster. I could do the arm movements perfectly well while standing in shallow water, but as soon as my feet left the bottom, I panicked and grabbed the side. Fortunately, the coach was incredibly patient. Instead of pushing me into deep water, she made me practise floating and breathing for weeks before we did anything else. Looking back, I'd say it took almost a whole year before I could swim a full length without stopping. The reason it took so long wasn't really the technique. It was fear. I had to convince myself that the water would actually hold me up. Now I swim twice a week, and it's one of my favourite ways to relax, so I'm really glad I didn't give up." },
    { q: "Describe a piece of technology that you find useful.\nYou should say:\n- what it is\n- when you got it\n- how you use it\nand explain why you find it useful.",
      notes: "laser distance meter – first job – measuring rooms, sites – saves time, accurate, fewer arguments",
      model: "The piece of technology I'd like to describe isn't a phone or a laptop, but a small laser distance meter that I use at work. It's about the size of a mobile phone, and when you point it at a wall, it tells you the exact distance in a second. I got it when I started my first job as a site engineer, because my supervisor told me it would save me a lot of trouble, and he was absolutely right. I use it almost every day. For example, when we need to check whether a room has been built to the right size, I can measure all four walls on my own in a couple of minutes, whereas with a tape measure I'd need a second person and much more time. It also calculates areas automatically, which is really handy when we're ordering materials like floor tiles. The main reason I find it so useful is accuracy. With a tape measure, it's easy to make small mistakes, especially over long distances, and those mistakes can be expensive to fix later. It has also reduced arguments on site, because nobody can really argue with a laser. Honestly, I'd feel quite lost without it now." },
    { q: "Describe a person who has inspired you.\nYou should say:\n- who the person is\n- how you know them\n- what they did\nand explain why they inspired you.",
      notes: "Ms Lan – English teacher, grade 10 – reading club, free lessons – believed in weak students – why I study now",
      model: "The person who has inspired me most is my English teacher from secondary school, Ms Lan. I was in her class for three years, from grade ten to grade twelve, and to be honest, at the beginning I was a pretty weak student who saw English as just another exam subject. What made her different was that she never treated English as a list of grammar rules. She ran a free reading club after school, where we read short stories and argued about the characters, and she always found simple books for students like me, so that we didn't feel left behind. I remember once I wrote a really poor essay, and instead of just giving me a low mark, she sat with me for half an hour and showed me how to rebuild it paragraph by paragraph. She inspired me because she clearly believed that anyone could improve if they were given enough patience. That attitude has stayed with me. Whenever I find something difficult, like preparing for this exam, I remind myself that progress is slow but real. In fact, she's one of the reasons I'm still studying English today." }
  ];

  (window.WEEKS = window.WEEKS || {})[7] = {
    meta: { week: 7, skill: "mixed", skills: ["listening", "speaking"], source: "tự soạn", label: SELF, version: 1, reviewed: false },

    // ---------------- LESSON ----------------
    lesson: {
      title: { vi: "Bài tuần 7 – Listening Section 3–4 và Speaking Part 2 (cue card)", en: "Week 7 lesson – Listening Sections 3–4 and Speaking Part 2 (cue card)" },
      goal: [
        { vi: "Theo dõi thảo luận học thuật nhiều người nói: ai nói ý nào, ai đồng ý hay phản đối.", en: "Follow an academic discussion with several speakers: who says what, and who agrees or disagrees." },
        { vi: "Dùng từ chỉ dẫn (signposting) để bám cấu trúc bài giảng Section 4 và điền note completion.", en: "Use signposting to follow the structure of a Section 4 lecture and complete notes." },
        { vi: "Nói cue card 1,5–2 phút theo khung Mở – 3 ý – Kết sau 1 phút chuẩn bị.", en: "Speak on a cue card for 1.5–2 minutes using Opening – 3 points – Closing after 1 minute of preparation." },
        { vi: "Mục tiêu bài kiểm tra cuối tuần: Listening đúng ≥ 70%.", en: "End-of-week target: Listening ≥ 70% correct." }
      ],
      explain: [
        { h: { vi: "Section 3: thảo luận học thuật", en: "Section 3: academic discussion" },
          vi: "Thường 2–4 người (sinh viên và giảng viên) bàn về bài tập, dự án, kết quả nghiên cứu. Câu hỏi hay là MCQ về quan điểm và matching “ai nói gì”. Khó nhất là phân biệt ý kiến của từng người: nhớ giọng và tên ngay đầu bài, chú ý người thứ hai đồng ý hay phản bác. Đồng ý: Exactly / That's my concern too / I agree with… Phản bác: I'm not keen on… / I see what you mean, but… / I'm not sure that…",
          en: "Usually 2–4 speakers (students and a tutor) discuss an assignment, project or findings. Typical questions are MCQ about opinions and matching “who said what”. The hardest part is separating each person's view: learn the voices and names at the start, and notice whether the next speaker agrees or objects. Agreeing: Exactly / That's my concern too / I agree with… Objecting: I'm not keen on… / I see what you mean, but… / I'm not sure that…" },
        { h: { vi: "Section 4: bài giảng", en: "Section 4: lecture" },
          vi: "Một người nói về đề tài học thuật, thường không có quãng nghỉ giữa bài. Dạng phổ biến nhất là note/summary completion theo trình tự bài giảng. Bám signposting: I'll start with… / Moving on to… / Firstly, Secondly… / However, there are drawbacks… / To sum up… Đáp án thường là danh từ, đúng chính tả và số ít/số nhiều.",
          en: "One speaker talks on an academic subject, usually without a break in the middle. The most common task is note or summary completion in the order of the lecture. Follow the signposting: I'll start with… / Moving on to… / Firstly, Secondly… / However, there are drawbacks… / To sum up… Answers are usually nouns – check spelling and singular/plural." },
        { h: { vi: "Paraphrase giữa câu hỏi và script", en: "Paraphrase between questions and script" },
          vi: "Ở Section 3–4, câu hỏi hầu như không lặp nguyên văn script. Ví dụ: câu hỏi “Why did they change their method?” – script: “At first we planned to… but we realised… So in the end we…”. Hãy nghe ý, không chờ từ giống hệt.",
          en: "In Sections 3–4 the questions rarely repeat the script word for word. Example: question “Why did they change their method?” – script: “At first we planned to… but we realised… So in the end we…”. Listen for the meaning, not the exact words." },
        { h: { vi: "Speaking Part 2: cue card", en: "Speaking Part 2: the cue card" },
          vi: "Giám khảo đưa thẻ đề có 3–4 gợi ý. Bạn có 1 phút chuẩn bị (được ghi chú) và nói 1–2 phút; giám khảo có thể hỏi thêm 1–2 câu ngắn. Mục tiêu band 7: nói đủ gần 2 phút, mạch lạc, có chi tiết cụ thể, dùng nhiều thì và từ miêu tả. Đừng viết câu trong 1 phút chuẩn bị – chỉ ghi 5–8 từ khoá.",
          en: "The examiner gives you a card with 3–4 prompts. You have 1 minute to prepare (you may make notes) and speak for 1–2 minutes; the examiner may ask one or two short follow-up questions. For band 7, speak for close to 2 minutes, coherently, with concrete details, a range of tenses and descriptive language. Don't write sentences in the preparation minute – note 5–8 keywords only." },
        { h: { vi: "Khung Mở – 3 ý – Kết", en: "Opening – 3 points – Closing" },
          vi: "Mở (1 câu giới thiệu chủ đề) → bối cảnh (khi nào, ở đâu, ai) → điểm nhấn/chi tiết đáng nhớ (What I remember most is…) → lý do/giải thích (The reason… is that…) → kết bằng cảm xúc hoặc ý nghĩa (Looking back… / It made me realise…). Nếu hết ý sớm: thêm so sánh trước–sau, cảm xúc, hoặc điều bạn sẽ làm khác.",
          en: "Opening (one sentence introducing the topic) → background (when, where, who) → key moment or memorable detail (What I remember most is…) → reason or explanation (The reason… is that…) → close with a feeling or meaning (Looking back… / It made me realise…). If you run out of ideas early, add a before/after comparison, a feeling, or what you would do differently." }
      ],
      table: [
        { h: { vi: "Khung cue card (1–2 phút)", en: "Cue card frame (1–2 minutes)" },
          rows: [
            [{ vi: "Mở (~10 giây)", en: "Opening (~10 s)" }, "I'd like to talk about… / The person I'm going to describe is…"],
            [{ vi: "Bối cảnh (~20 giây)", en: "Background (~20 s)" }, "This was about two years ago, when… / I first heard about it from…"],
            [{ vi: "Chi tiết chính (~40 giây)", en: "Key details (~40 s)" }, "What I remember most is… / At first… After that… In the end…"],
            [{ vi: "Lý do / giải thích (~30 giây)", en: "Reason / explanation (~30 s)" }, "The main reason… is that… / As for why…"],
            [{ vi: "Kết (~10 giây)", en: "Closing (~10 s)" }, "Looking back, … / It made me realise that… / I'd feel quite lost without it now."]
          ] },
        { h: { vi: "Signposting trong bài giảng", en: "Lecture signposting" },
          rows: [
            [{ vi: "Bắt đầu", en: "Starting" }, "I'll start with… / Let's begin with…"],
            [{ vi: "Chuyển ý", en: "Moving on" }, "Moving on to… / Let's now turn to… / So much for…"],
            [{ vi: "Liệt kê", en: "Listing" }, "Firstly… Secondly… Thirdly… / Another issue is…"],
            [{ vi: "Đối lập", en: "Contrast" }, "However, … / On the other hand, … / Although…"],
            [{ vi: "Diễn đạt lại", en: "Rephrasing" }, "In other words, … / That is to say, …"],
            [{ vi: "Kết", en: "Concluding" }, "To sum up, … / To conclude, …"]
          ] }
      ],
      vocab: [
        { w: "methodology", pos: "n", ipa: "/ˌmeθəˈdɒlədʒi/", vi: "phương pháp nghiên cứu", en: "the set of methods used in a study", ex: "We need to explain our methodology clearly.", col: "research methodology" },
        { w: "questionnaire", pos: "n", ipa: "/ˌkwestʃəˈneə/", vi: "bảng câu hỏi khảo sát", en: "a written list of questions answered by many people", ex: "We sent an online questionnaire to all first-year students.", col: "design / send out a questionnaire" },
        { w: "response", pos: "n", ipa: "/rɪˈspɒns/", vi: "phản hồi, câu trả lời", en: "a reply, especially to a survey", ex: "The response was better than we expected.", col: "response rate" },
        { w: "findings", pos: "n", ipa: "/ˈfaɪndɪŋz/", vi: "kết quả (nghiên cứu)", en: "the information discovered by a study", ex: "Our findings surprised us.", col: "present / summarise the findings" },
        { w: "limitation", pos: "n", ipa: "/ˌlɪmɪˈteɪʃn/", vi: "hạn chế", en: "a weakness that reduces how far results can be trusted", ex: "That's a fair point to include in your limitations.", col: "acknowledge a limitation" },
        { w: "recommendation", pos: "n", ipa: "/ˌrekəmenˈdeɪʃn/", vi: "kiến nghị", en: "a suggestion about what should be done", ex: "Our main recommendation is more secure bike parking.", col: "make a recommendation" },
        { w: "feasible", pos: "adj", ipa: "/ˈfiːzəbl/", vi: "khả thi", en: "possible and practical to do", ex: "Interviewing every student wasn't feasible.", col: "economically / technically feasible" },
        { w: "drawback", pos: "n", ipa: "/ˈdrɔːbæk/", vi: "nhược điểm", en: "a disadvantage", ex: "The main drawback is the weight.", col: "a major / serious drawback" },
        { w: "membrane", pos: "n", ipa: "/ˈmembreɪn/", vi: "lớp màng", en: "a thin layer that stops water passing through", ex: "A waterproof membrane protects the building.", col: "waterproof membrane" },
        { w: "drainage", pos: "n", ipa: "/ˈdreɪnɪdʒ/", vi: "sự thoát nước", en: "the system or process of carrying water away", ex: "The drainage layer lets extra water flow away.", col: "drainage layer / system" },
        { w: "insulation", pos: "n", ipa: "/ˌɪnsjuˈleɪʃn/", vi: "sự cách nhiệt", en: "material that stops heat passing in or out", ex: "A green roof acts as insulation.", col: "provide insulation" },
        { w: "habitat", pos: "n", ipa: "/ˈhæbɪtæt/", vi: "môi trường sống", en: "the natural home of an animal or plant", ex: "The roof provides a habitat for insects.", col: "natural habitat / habitat loss" },
        { w: "maintenance", pos: "n", ipa: "/ˈmeɪntənəns/", vi: "bảo trì", en: "the work of keeping something in good condition", ex: "Extensive roofs need little maintenance.", col: "regular / low maintenance" },
        { w: "conventional", pos: "adj", ipa: "/kənˈvenʃənl/", vi: "thông thường, truyền thống", en: "of the usual type", ex: "The cost is higher than for a conventional roof.", col: "conventional method" },
        { w: "vivid", pos: "adj", ipa: "/ˈvɪvɪd/", vi: "sống động, rõ nét", en: "very clear and detailed in the mind", ex: "I have a vivid memory of that day.", col: "a vivid memory / description" },
        { w: "look back on", pos: "phr v", ipa: "/lʊk ˈbæk ɒn/", vi: "nhìn lại (chuyện đã qua)", en: "to think about something in the past", ex: "When I look back on it, I'm glad I didn't give up.", col: "look back on + experience" },
        { w: "pay someone back", pos: "phr v", ipa: "/peɪ ˈsʌmwʌn bæk/", vi: "đền đáp", en: "to do something good for someone who helped you", ex: "It was a way of paying him back.", col: "—" },
        { w: "give up", pos: "phr v", ipa: "/ɡɪv ˈʌp/", vi: "bỏ cuộc", en: "to stop trying", ex: "I'm really glad I didn't give up.", col: "never give up" },
        { w: "strangely enough", pos: "phr", ipa: "/ˈstreɪndʒli ɪˈnʌf/", vi: "lạ thay", en: "used to introduce something surprising", ex: "Strangely enough, I've never been there.", col: "—" },
        { w: "incredibly", pos: "adv", ipa: "/ɪnˈkredəbli/", vi: "vô cùng", en: "extremely", ex: "The coach was incredibly patient.", col: "incredibly patient / refreshing" }
      ],
      examples: [
        { label: { vi: "Mở bài cue card", en: "Cue card opening" },
          text: "I'd like to talk about a time I helped an elderly neighbour of mine move house.",
          note: { vi: "Một câu, vào thẳng chủ đề; không nhắc lại toàn bộ đề.", en: "One sentence, straight to the topic; no need to repeat the whole card." }, speak: true },
        { label: { vi: "Điểm nhấn", en: "Key moment" },
          text: "What I remember most is the moment the sofa got completely stuck on the stairs.",
          note: { vi: "Cấu trúc “What I remember most is…” giúp kéo dài tự nhiên và tạo câu phức.", en: "“What I remember most is…” extends the talk naturally and adds a complex structure." }, speak: true },
        { label: { vi: "Kết", en: "Closing" },
          text: "It made me realise that small acts of kindness can matter much more than we think.",
          note: { vi: "Kết bằng ý nghĩa/cảm xúc, không nói “That's all.”", en: "Close with a meaning or feeling rather than “That's all.”" }, speak: true },
        { label: { vi: "Ghi chú 1 phút (ví dụ)", en: "1-minute notes (example)" },
          text: "neighbour Mr Hoa – moving house – rainy Saturday – sofa stuck on stairs – son abroad – tired but happy",
          note: { vi: "Chỉ từ khoá theo thứ tự kể, không viết câu.", en: "Keywords in story order only, no sentences." }, speak: false }
      ],
      mistakes: [
        { vi: "Section 3: chọn ý của người nói đầu tiên dù người sau phản bác (“I'm not keen on…”).", en: "Section 3: choosing the first speaker's idea even though the next speaker rejects it (“I'm not keen on…”)." },
        { vi: "Section 4: mất dấu vị trí khi bài giảng chuyển ý; hãy theo signposting và tiêu đề trong note.", en: "Section 4: losing your place when the lecture moves on; follow the signposting and the note headings." },
        { vi: "Viết sai chính tả từ học thuật (insulation, maintenance) hoặc thiếu -s số nhiều (roots, butterflies).", en: "Misspelling academic words (insulation, maintenance) or missing plural -s (roots, butterflies)." },
        { vi: "Part 2: dùng 1 phút chuẩn bị để viết câu hoàn chỉnh, rồi đọc lại.", en: "Part 2: using the preparation minute to write full sentences and then reading them out." },
        { vi: "Part 2: nói 40–50 giây rồi dừng; trộn thì hiện tại khi kể chuyện quá khứ.", en: "Part 2: stopping after 40–50 seconds; mixing present tenses into a past story." }
      ],
      exercises: [
        { id: "w07-ex01", type: "mcq", ref: "w07-l0",
          q: "Does Ben think the local markets topic is a good choice?",
          opts: ["Yes, completely.", "Partly – he sees why it is interesting but doubts they will find enough data.", "No – he rejects it without giving a reason."],
          a: 1,
          why: { vi: "“I see what you mean about markets being interesting, but I'm not sure we'd find enough data.” – công nhận một phần rồi phản bác.", en: "“I see what you mean about markets being interesting, but I'm not sure we'd find enough data.” – partial agreement followed by an objection." } },
        { id: "w07-ex02", type: "mcq", ref: "w07-l0",
          q: "How does Lily respond to Ben?",
          opts: ["She agrees with him.", "She disagrees with him.", "She changes the subject."],
          a: 0,
          why: { vi: "“Exactly. That's my concern too.” = đồng ý.", en: "“Exactly. That's my concern too.” = agreement." } },
        { id: "w07-ex03", type: "mcq", ref: "w07-l0",
          q: "The lecturer says “So much for the causes.” This tells you that",
          opts: ["the lecturer will repeat the causes.", "the part about causes has finished.", "the causes are not important."],
          a: 1,
          why: { vi: "“So much for…” = kết thúc phần đó, chuyển sang phần tiếp (ở đây là effects).", en: "“So much for…” closes that part and moves on (here, to the effects)." } },
        { id: "w07-ex04", type: "mcq", ref: "w07-l0",
          q: "“In other words” introduces",
          opts: ["a new topic.", "a rephrasing of the previous point.", "a counter-argument."],
          a: 1,
          why: { vi: "“In other words, the plan was too expensive to be practical.” – nói lại ý trước bằng cách đơn giản hơn.", en: "“In other words, the plan was too expensive to be practical.” – the previous point restated more simply." } },
        { id: "w07-ex05", type: "matching", kind: "feature", scoreEach: true, reuse: false,
          q: { vi: "Ghép mỗi cụm signposting với chức năng của nó.", en: "Match each signposting phrase with its function." },
          items: ["To sum up, …", "Let's now turn to …", "A case in point is …", "That is to say, …"],
          options: ["starting a new section", "rephrasing", "giving an example", "concluding"],
          a: [3, 0, 2, 1],
          why: { vi: "To sum up = kết; Let's now turn to = chuyển phần mới; A case in point is = đưa ví dụ; That is to say = diễn đạt lại.", en: "To sum up = concluding; Let's now turn to = new section; A case in point is = example; That is to say = rephrasing." } },
        { id: "w07-ex06", type: "order", scoreEach: false,
          q: { vi: "Gán vai trò cho từng câu trong câu trả lời Part 2.", en: "Label each sentence of this Part 2 answer." },
          items: ["So that's why that afternoon still makes me smile.",
                  "I'd like to talk about a time I helped a neighbour move house.",
                  "It was a rainy Saturday, and he had nobody else to ask.",
                  "What I remember most is how we laughed when the sofa got stuck."],
          labels: ["Opening", "Background", "Key moment", "Closing"],
          a: ["Closing", "Opening", "Background", "Key moment"],
          why: { vi: "Khung cue card: mở (giới thiệu chủ đề) → bối cảnh → điểm nhấn → kết (cảm xúc/ý nghĩa).", en: "Cue card frame: opening → background → key moment → closing (feeling/meaning)." } },
        { id: "w07-ex07", type: "write",
          q: { vi: "Bấm giờ 60 giây. Ghi 5–8 từ khoá cho cue card: “Describe a skill that took you a long time to learn.” Không viết câu.", en: "Time yourself for 60 seconds. Note 5–8 keywords for the cue card “Describe a skill that took you a long time to learn.” No sentences." },
          model: "swimming – age 25 – fear of deep water – evening classes, a patient coach – one year – fear not technique",
          checklist: [
            { vi: "5–8 từ khoá, không có câu hoàn chỉnh", en: "5–8 keywords, no full sentences" },
            { vi: "Có từ khoá cho mỗi gợi ý trên thẻ", en: "A keyword for each prompt on the card" },
            { vi: "Có một chi tiết đáng nhớ để kể dài", en: "One memorable detail to expand on" },
            { vi: "Sắp theo thứ tự sẽ nói", en: "In the order you will speak" }
          ],
          why: { vi: "Ghi chú tốt giúp bạn không bị “hết ý” ở phút thứ hai.", en: "Good notes stop you running out of ideas in the second minute." } },
        { id: "w07-ex08", type: "text",
          q: { vi: "Viết lại câu kết cho tự nhiên hơn: “That's all. Thank you.”", en: "Rewrite this closing to sound more natural: “That's all. Thank you.”" },
          model: ["Looking back, I'm really glad I made that decision.", "It made me realise how much small things can matter.", "So that's why it's still one of my favourite memories."],
          why: { vi: "Kết bằng cảm xúc hoặc ý nghĩa giúp bài trọn vẹn; “That's all” làm bài dừng đột ngột.", en: "Ending with a feeling or meaning rounds off the talk; “That's all” stops it abruptly." } }
      ],
      summary: [
        { vi: "Section 3: nhớ tên – giọng, nghe ai đồng ý/phản bác; câu hỏi paraphrase script.", en: "Section 3: link names to voices, notice agreement and objection; questions paraphrase the script." },
        { vi: "Section 4: bám signposting; đáp án thường là danh từ, đúng chính tả và số nhiều.", en: "Section 4: follow the signposting; answers are usually nouns, spelled correctly with plural -s if needed." },
        { vi: "Part 2: 1 phút ghi từ khoá, nói 1,5–2 phút: Mở – bối cảnh – điểm nhấn – lý do – kết.", en: "Part 2: 1 minute of keywords, then 1.5–2 minutes: opening – background – key moment – reason – closing." },
        { vi: "Mục tiêu tuần: Listening ≥ 70%; tự chấm FC, LR, GRA, Pron bằng checklist.", en: "Weekly target: Listening ≥ 70%; self-assess FC, LR, GRA and Pron with the checklist." }
      ]
    },

    // ---------------- QUIZ ----------------
    quiz: {
      title: { vi: "Kiểm tra tuần 7 – Listening Section 3–4 + Speaking Part 2", en: "Week 7 quiz – Listening Sections 3–4 + Speaking Part 2" },
      passPct: 70,
      note: { vi: "Mục tiêu: Listening đúng ≥ 70% (15/21 điểm tự chấm). Speaking Part 2 không tính điểm tự động – tự đánh giá bằng checklist. Nội dung tự soạn, không phải đề thi thật.",
              en: "Target: Listening ≥ 70% correct (15 of 21 auto-marked points). Speaking Part 2 is not auto-marked – assess yourself with the checklist. Self-written content, not a real exam." },
      timeLimitMin: null,
      sections: [
        { id: "w07-s1", skill: "listening",
          title: { vi: "Listening Section 3 – Dự án khảo sát đi lại của sinh viên", en: "Listening Section 3 – A student travel survey project" },
          instructions: { vi: "Câu 1–4 và 9: chọn A, B hoặc C. Câu 5–8: chọn người nói đúng; một người có thể được chọn nhiều lần. Câu 10–11: viết KHÔNG QUÁ BA TỪ VÀ/HOẶC MỘT SỐ.",
                          en: "Questions 1–4 and 9: choose A, B or C. Questions 5–8: choose the correct speaker; you may use any speaker more than once. Questions 10–11: write NO MORE THAN THREE WORDS AND/OR A NUMBER." },
          ref: "w07-l1",
          questions: [
            { id: "w07-q01", type: "mcq", q: "Why did the students change their method of collecting data?",
              opts: ["Interviews would have taken too long.", "Interviews would only have reached students who use the library a lot.", "Their tutor told them to use a questionnaire."], a: 1,
              why: { vi: "Tom: “we realised we'd only reach students who already use the library a lot. So in the end we sent an online questionnaire”. Không ai nói phỏng vấn mất thời gian, và tutor không yêu cầu.", en: "Tom: “we realised we'd only reach students who already use the library a lot. So in the end we sent an online questionnaire”. Nobody says interviews took too long, and the tutor did not tell them." } },
            { id: "w07-q02", type: "mcq", q: "What surprised Tom about the results?",
              opts: ["Cycling was the most common way of travelling.", "Many students drive to campus.", "Few students replied to the questionnaire."], a: 0,
              why: { vi: "“I assumed most people would drive… But cycling was the most common answer.” Driving là điều Tom đoán trước (bẫy).", en: "“I assumed most people would drive… But cycling was the most common answer.” Driving was what he expected (distractor)." } },
            { id: "w07-q03", type: "mcq", q: "What surprised Maya?",
              opts: ["the number of international students", "how far some students walk to save money", "how few students cycle"], a: 1,
              why: { vi: "Maya: “What surprised me was how many students walk more than thirty minutes each way, just to save money on the bus.”", en: "Maya: “What surprised me was how many students walk more than thirty minutes each way, just to save money on the bus.”" } },
            { id: "w07-q04", type: "mcq", q: "What was the problem with question seven of the questionnaire?",
              opts: ["It asked for personal information.", "The distances were given in miles.", "It was missing from the online version."], a: 1,
              why: { vi: "“we gave the options in miles, and a lot of international students said they found that confusing.”", en: "“we gave the options in miles, and a lot of international students said they found that confusing.”" } },
            { id: "w07-q05", type: "matching", kind: "feature", scoreEach: true, reuse: true,
              q: "Questions 5–8. Who makes each suggestion? Choose A, B or C.",
              items: ["5. using a map to show where students live", "6. marking the main bus routes", "7. providing more secure bike parking", "8. offering a cheaper student bus ticket"],
              options: ["A. Maya", "B. Tom", "C. Dr Grant"],
              a: [2, 0, 1, 0],
              why: { vi: "Map: Dr Grant – “a map could work well for showing where students live”. Bus routes: Maya – “We could mark the main bus routes on it too”. Bike parking: Tom. Vé xe buýt rẻ hơn: Maya. Lưu ý: pie chart do Maya đề xuất nhưng Tom phản đối – không phải câu hỏi.",
                     en: "Map: Dr Grant – “a map could work well for showing where students live”. Bus routes: Maya – “We could mark the main bus routes on it too”. Bike parking: Tom. Cheaper ticket: Maya. Note: Maya suggests a pie chart but Tom objects – not asked here." } },
            { id: "w07-q09", type: "mcq", q: "What does Dr Grant say about the recommendation for the bus company?",
              opts: ["It should be removed from the report.", "It should be phrased as something the university could discuss with the company.", "It is the strongest recommendation in the report."], a: 1,
              why: { vi: "“the bus company isn't part of your study. Phrase it as something the university could discuss with them.” Dr Grant không yêu cầu bỏ đi.", en: "“the bus company isn't part of your study. Phrase it as something the university could discuss with them.” She does not ask them to remove it." } },
            { id: "w07-q10", type: "gap", q: "The written report is due on ___ December.", limit: { words: 3, number: true },
              accept: ["5", "5th", "fifth", "the fifth", "the 5th", "the fifth of", "the 5th of"],
              why: { vi: "“The written report is due on the fifth of December, and the presentation is the week after.”", en: "“The written report is due on the fifth of December, and the presentation is the week after.”" } },
            { id: "w07-q11", type: "short", q: "Where will the presentation take place?", limit: { words: 3, number: true },
              accept: ["seminar room four", "seminar room 4", "room four", "room 4"],
              why: { vi: "Tom hỏi “in the lecture theatre?” – Dr Grant: “No, in seminar room four”. Lecture theatre là bẫy.", en: "Tom asks “in the lecture theatre?” – Dr Grant: “No, in seminar room four”. The lecture theatre is the distractor." } }
          ] },

        { id: "w07-s2", skill: "listening",
          title: { vi: "Listening Section 4 – Bài giảng về mái nhà xanh", en: "Listening Section 4 – A lecture on green roofs" },
          instructions: { vi: "Hoàn thành ghi chú. Viết MỘT TỪ DUY NHẤT cho mỗi câu.", en: "Complete the notes. Write ONE WORD ONLY for each answer." },
          ref: "w07-l2",
          questions: [
            { id: "w07-q12", type: "gap", q: "Layers – bottom: a waterproof ___ stops water entering the building", limit: { words: 1, number: false },
              accept: ["membrane"],
              why: { vi: "“At the bottom… there's a waterproof membrane, which stops water getting into the building.”", en: "“At the bottom… there's a waterproof membrane, which stops water getting into the building.”" } },
            { id: "w07-q13", type: "gap", q: "Root barrier: stops plant ___ damaging the bottom layer", limit: { words: 1, number: false },
              accept: ["roots"],
              why: { vi: "“Its job is to stop plant roots from damaging the membrane.” Cần số nhiều “roots”.", en: "“Its job is to stop plant roots from damaging the membrane.” The plural “roots” is needed." } },
            { id: "w07-q14", type: "gap", q: "Drainage layer: lets extra ___ flow away", limit: { words: 1, number: false },
              accept: ["water"],
              why: { vi: "“a drainage layer, which lets extra water flow away”.", en: "“a drainage layer, which lets extra water flow away”." } },
            { id: "w07-q15", type: "gap", q: "Filter sheet: keeps the ___ from washing into the drainage layer", limit: { words: 1, number: false },
              accept: ["soil"],
              why: { vi: "“a filter sheet, which keeps the soil from washing into the drainage layer”.", en: "“a filter sheet, which keeps the soil from washing into the drainage layer”." } },
            { id: "w07-q16", type: "gap", q: "Extensive roofs: low-growing plants such as ___, which store water in thick leaves", limit: { words: 1, number: false },
              accept: ["sedum", "sedums"],
              why: { vi: "Giảng viên đánh vần “S-E-D-U-M”. Mái intensive (cỏ, cây bụi) là ý khác.", en: "The lecturer spells it “S-E-D-U-M”. Intensive roofs (grass, shrubs) are a different point." } },
            { id: "w07-q17", type: "gap", q: "Benefit 1: holds back rainwater and releases it ___", limit: { words: 1, number: false },
              accept: ["slowly"],
              why: { vi: "“A green roof holds back much of that water and releases it slowly.”", en: "“A green roof holds back much of that water and releases it slowly.”" } },
            { id: "w07-q18", type: "gap", q: "Benefit 2: acts as ___, keeping the building cooler in summer and warmer in winter", limit: { words: 1, number: false },
              accept: ["insulation"],
              why: { vi: "“a green roof acts as insulation”. Chú ý chính tả i-n-s-u-l-a-t-i-o-n.", en: "“a green roof acts as insulation”. Check the spelling: i-n-s-u-l-a-t-i-o-n." } },
            { id: "w07-q19", type: "gap", q: "Benefit 3: habitat for insects, particularly bees and ___", limit: { words: 1, number: false },
              accept: ["butterflies"],
              why: { vi: "“a habitat for insects, particularly bees and butterflies”. Số nhiều: butterflies (y → ies).", en: "“a habitat for insects, particularly bees and butterflies”. Plural: butterflies (y → ies)." } },
            { id: "w07-q20", type: "gap", q: "Main drawback: the ___ of a wet roof – an engineer must check the building", limit: { words: 1, number: false },
              accept: ["weight"],
              why: { vi: "“The most important is weight. A wet green roof is very heavy…” Cost được nhắc sau, không phải nhược điểm chính.", en: "“The most important is weight. A wet green roof is very heavy…” Cost is mentioned later and is not the main drawback." } },
            { id: "w07-q21", type: "gap", q: "Maintenance: remove weeds and check the drains in spring and ___", limit: { words: 1, number: false },
              accept: ["autumn"],
              why: { vi: "“remove weeds and check the drains regularly, usually in spring and autumn.” Ghi đúng từ đã nghe (autumn).", en: "“remove weeds and check the drains regularly, usually in spring and autumn.” Write the word you hear (autumn)." } }
          ] },

        { id: "w07-s3", skill: "speaking",
          title: { vi: "Speaking Part 2 – 5 cue card (tự đánh giá)", en: "Speaking Part 2 – 5 cue cards (self-assessed)" },
          instructions: { vi: "Mỗi thẻ: 60 giây chuẩn bị, nói 1–2 phút, tự ghi âm bằng máy rồi tick checklist. Bấm “Nghe mẫu” sau khi đã tự nói. Không chấm tự động.",
                          en: "For each card: 60 seconds to prepare, speak for 1–2 minutes, record yourself on your device, then tick the checklist. Use “Play model” only after you have spoken. Not auto-marked." },
          ref: "w07-sp",
          questions: CARDS.map(function (c, i) {
            var n = i + 22;
            return { id: "w07-q" + n, type: "speak", part: 2, prepSec: 60, talkSec: 120,
                     q: c.q,
                     hint: { vi: "Ghi chú mẫu (từ khoá): " + c.notes, en: "Sample notes (keywords): " + c.notes },
                     model: c.model, modelRef: "w07-sm" + (i + 1),
                     checklist: P2_CHECK, criteria: ["FC", "LR", "GRA", "P"], why: P2_WHY };
          }) }
      ]
    },

    passages: [],

    // ---------------- SCRIPTS ----------------
    scripts: [
      { id: "w07-l0", kind: "listening", part: 3, lang: "en-GB", rate: 0.95, pauseMs: 700,
        title: { vi: "Luyện đồng ý/phản bác và signposting (bài tập)", en: "Agreement and signposting practice (exercises)" },
        speakers: [{ id: "T", name: "Tutor", voice: "female" }, { id: "B", name: "Ben", voice: "male" }, { id: "L", name: "Lily", voice: "female", pitch: 1.15 }, { id: "P", name: "Lecturer", voice: "male", rate: 0.9 }],
        lines: [
          { sp: "T", text: "So, should your group focus on online shopping or on local markets?" },
          { sp: "B", text: "I see what you mean about markets being interesting, but I'm not sure we'd find enough data." },
          { sp: "L", text: "Exactly. That's my concern too." },
          { sp: "P", text: "So much for the causes. Let's now turn to the effects." },
          { sp: "P", text: "The new bridge would have cost twice the original budget. In other words, the plan was too expensive to be practical." }
        ],
        transcript: "hidden", maxPlays: null, source: "tự soạn" },

      { id: "w07-l1", kind: "listening", part: 3, lang: "en-GB", rate: 0.95, pauseMs: 600,
        title: { vi: "Section 3 – Dự án khảo sát đi lại của sinh viên", en: "Section 3 – A student travel survey project" },
        speakers: [{ id: "G", name: "Dr Grant (tutor)", voice: "female", pitch: 0.9 }, { id: "M", name: "Maya", voice: "female", pitch: 1.15 }, { id: "T", name: "Tom", voice: "male" }],
        lines: [
          { sp: "G", text: "Come in, Maya, Tom. So, you wanted to talk about your research project on how students get to campus." },
          { sp: "M", text: "Yes. We've finished collecting the data, but we're not sure how to present it." },
          { sp: "G", text: "Let's start with the method. How did you collect your data?" },
          { sp: "T", text: "At first we planned to interview people outside the library, but we realised we'd only reach students who already use the library a lot. So in the end we sent an online questionnaire to all first-year students." },
          { sp: "G", text: "Sensible. And how was the response?" },
          { sp: "M", text: "Better than we expected, actually. We got just over two hundred replies." },
          { sp: "G", text: "Good. What surprised you in the results?" },
          { sp: "T", text: "I assumed most people would drive, because the car park is always full. But cycling was the most common answer." },
          { sp: "M", text: "I wasn't surprised by that. What surprised me was how many students walk more than thirty minutes each way, just to save money on the bus." },
          { sp: "G", text: "Interesting. That might be worth a section of its own. Now, Tom, you mentioned a problem with one of the questions?" },
          { sp: "T", text: "Yes. Question seven asked how far people live from campus, but we gave the options in miles, and a lot of international students said they found that confusing." },
          { sp: "G", text: "That's a fair point to include in your limitations. What about presenting the results?" },
          { sp: "M", text: "I'd like to use a pie chart for the main types of transport." },
          { sp: "T", text: "I'm not keen on pie charts. With seven categories, the slices get too small to read. I think a bar chart would be clearer." },
          { sp: "G", text: "I agree with Tom on that. Pie charts work best when there are only a few categories. A map could work well for showing where students live, though." },
          { sp: "M", text: "Oh, good idea. We could mark the main bus routes on it too." },
          { sp: "G", text: "What about your recommendations?" },
          { sp: "T", text: "I'd suggest the university provides more secure bike parking, because several people said their bikes had been stolen." },
          { sp: "M", text: "And I think the bus company should offer a cheaper student ticket. That would help the people who walk such long distances." },
          { sp: "G", text: "Both reasonable, but be careful. You can make recommendations to the university, but the bus company isn't part of your study. Phrase it as something the university could discuss with them." },
          { sp: "M", text: "Okay, that makes sense." },
          { sp: "G", text: "Finally, the deadline. The written report is due on the fifth of December, and the presentation is the week after." },
          { sp: "T", text: "Will the presentation be in the lecture theatre?" },
          { sp: "G", text: "No, in seminar room four, so you won't need a microphone. Please keep it to ten minutes." }
        ],
        transcript: "hidden", maxPlays: null, source: "tự soạn" },

      { id: "w07-l2", kind: "listening", part: 4, lang: "en-GB", rate: 0.95, pauseMs: 700,
        title: { vi: "Section 4 – Bài giảng: mái nhà xanh", en: "Section 4 – Lecture: green roofs" },
        speakers: [{ id: "P", name: "Lecturer", voice: "male" }],
        lines: [
          { sp: "P", text: "Good afternoon. Today I'm going to talk about green roofs, that is, roofs that are partly or completely covered with plants. I'll start with how they're built, then look at their benefits, and finish with some of the problems." },
          { sp: "P", text: "Let's begin with construction. A green roof is really a series of layers. At the bottom, directly on top of the roof, there's a waterproof membrane, which stops water getting into the building." },
          { sp: "P", text: "Above that comes a root barrier. Its job is to stop plant roots from damaging the membrane." },
          { sp: "P", text: "Next is a drainage layer, which lets extra water flow away, so that the plants don't sit in water. Then there's a filter sheet, which keeps the soil from washing into the drainage layer. And finally, on top, we have the growing medium and the plants themselves." },
          { sp: "P", text: "Now, what kind of plants? On most so-called extensive green roofs, which are thin and light, designers choose low-growing plants such as sedum. That's S-E-D-U-M. These plants store water in their thick leaves, so they can survive dry periods without watering. Deeper, intensive roofs can support grass, shrubs and even small trees, but they are much heavier." },
          { sp: "P", text: "Moving on to the benefits. The first is water management. In a heavy storm, a normal roof sends rainwater straight into the drains, which can then overflow. A green roof holds back much of that water and releases it slowly." },
          { sp: "P", text: "Secondly, a green roof acts as insulation. It helps to keep the building cooler in summer and warmer in winter, which can reduce the energy needed for heating and air conditioning." },
          { sp: "P", text: "Thirdly, these roofs provide a habitat for insects, particularly bees and butterflies, in areas where there is very little green space at ground level." },
          { sp: "P", text: "However, there are drawbacks. The most important is weight. A wet green roof is very heavy, so an engineer must check that the building can support it, and older buildings sometimes need to be strengthened first." },
          { sp: "P", text: "Another issue is maintenance. Although extensive roofs need little care, someone still has to remove weeds and check the drains regularly, usually in spring and autumn. And of course, the initial cost is higher than for a conventional roof." },
          { sp: "P", text: "To sum up, green roofs can manage rainwater, save energy and support wildlife, but only if the building is strong enough and someone takes responsibility for looking after them." }
        ],
        transcript: "hidden", maxPlays: null, source: "tự soạn" },

      { id: "w07-sp", kind: "speaking-prompt", part: 2, lang: "en-GB", rate: 0.95, pauseMs: 1500,
        title: { vi: "Speaking Part 2 – đề cue card", en: "Speaking Part 2 – cue cards" },
        speakers: [{ id: "E", name: "Examiner", voice: "female" }],
        lines: CARDS.map(function (c) {
          return { sp: "E", text: "Now I'm going to give you a topic, and I'd like you to talk about it for one to two minutes. You have one minute to prepare. " + c.q.replace(/\n- /g, ", ").replace(/\n/g, " ") };
        }),
        transcript: "shown", maxPlays: null, source: "tự soạn" }
    ].concat(CARDS.map(function (c, i) {
      return { id: "w07-sm" + (i + 1), kind: "speaking-model", part: 2, lang: "en-GB", rate: 0.95, pauseMs: 600,
               title: { vi: "Bài mẫu cue card " + (i + 1) + " (nhân vật giả định)", en: "Model answer, cue card " + (i + 1) + " (imaginary persona)" },
               speakers: [{ id: "C", name: "Candidate", voice: "male" }],
               lines: [{ sp: "C", text: c.model }],
               transcript: "hidden", maxPlays: null, source: "tự soạn" };
    })),

    mock: null
  };
})();
