// weeks/w05.js — Tuần 5: Writing Task 2 hoàn chỉnh (mở bài, kết bài, 4 dạng đề).
// Nội dung tự soạn, không phải đề thi thật. Đề bài và bài mẫu do người soạn tự viết.
(window.WEEKS = window.WEEKS || {})[5] = {
  meta: { week: 5, skill: "writing", source: "tự soạn", version: 1, reviewed: false },

  lesson: {
    title: { vi: "Bài 05 – Writing Task 2: mở bài, kết bài và 4 dạng đề", en: "Lesson 05 – Writing Task 2: introductions, conclusions and the 4 question types" },
    goal: [
      { vi: "Nhận diện đúng 4 dạng đề Task 2 (opinion, discussion, problem–solution, two-part) từ từ khóa trong đề.", en: "Identify the 4 Task 2 question types (opinion, discussion, problem–solution, two-part) from key words in the prompt." },
      { vi: "Viết mở bài gồm paraphrase đề + thesis rõ ràng, và kết bài nhắc lại quan điểm mà không thêm ý mới.", en: "Write an introduction (paraphrase + clear thesis) and a conclusion that restates your view without new ideas." },
      { vi: "Hoàn thành 1 bài 250+ từ trong 40 phút và tự chấm theo 4 tiêu chí TR / CC / LR / GRA.", en: "Complete one 250+ word essay in 40 minutes and self-assess it on TR / CC / LR / GRA." }
    ],
    explain: [
      {
        h: { vi: "1. Cấu trúc bài Task 2 và phân bổ 40 phút", en: "1. Task 2 structure and the 40-minute plan" },
        vi: "Một bài Task 2 gọn gàng thường có 4 đoạn: Mở bài (2–3 câu), Thân bài 1, Thân bài 2 và Kết bài (2 câu). Đề yêu cầu tối thiểu 250 từ; bài 270–320 từ là vùng an toàn. Gợi ý thời gian: 5 phút lập dàn ý, 30 phút viết, 5 phút soát lỗi. Mỗi đoạn thân bài theo mô hình TEEL đã học ở Bài 01 (Topic sentence – Explanation – Example – Link).",
        en: "A clear Task 2 essay usually has 4 paragraphs: Introduction (2–3 sentences), Body 1, Body 2 and Conclusion (2 sentences). The minimum is 250 words; 270–320 words is a safe range. Suggested timing: 5 minutes planning, 30 minutes writing, 5 minutes checking. Each body paragraph follows the TEEL model from Lesson 01 (Topic sentence – Explanation – Example – Link)."
      },
      {
        h: { vi: "2. Mở bài = paraphrase + thesis", en: "2. Introduction = paraphrase + thesis" },
        vi: "Câu 1 diễn đạt lại đề bằng lời của bạn (không chép nguyên văn). Có 3 cách paraphrase: (a) thay từ bằng từ đồng nghĩa (increase → rise), (b) đổi từ loại (the growth of cities → cities are growing), (c) đổi cấu trúc câu (chủ động ↔ bị động, đổi thứ tự mệnh đề). Câu 2 là thesis: nói rõ quan điểm hoặc cách bạn sẽ trả lời đề. Thesis phải khớp với dạng đề (xem bảng bên dưới). Không viết câu mở bài chung chung kiểu “In today’s world…” kéo dài mà không có thông tin.",
        en: "Sentence 1 restates the prompt in your own words (do not copy). There are 3 ways to paraphrase: (a) replace words with synonyms (increase → rise), (b) change word class (the growth of cities → cities are growing), (c) change the structure (active ↔ passive, reorder clauses). Sentence 2 is the thesis: it states your position or how you will answer. The thesis must match the question type (see the table below). Avoid long, empty openers such as “In today’s world…” that carry no information."
      },
      {
        h: { vi: "3. Kết bài = nhắc lại + tóm tắt, KHÔNG thêm ý mới", en: "3. Conclusion = restate + summarise, NO new ideas" },
        vi: "Kết bài ngắn (2 câu). Câu 1 mở bằng một cụm kết (In conclusion / To sum up / Overall) rồi nhắc lại quan điểm bằng từ khác với mở bài. Câu 2 tóm tắt lý do chính hoặc đưa ra một kiến nghị gắn trực tiếp với quan điểm. Nếu một ý chưa xuất hiện ở thân bài thì đừng đưa vào kết bài.",
        en: "Keep the conclusion short (2 sentences). Sentence 1 starts with a closing phrase (In conclusion / To sum up / Overall) and restates your position in different words from the introduction. Sentence 2 summarises the main reasons or gives a recommendation directly linked to your position. If an idea did not appear in the body, do not add it to the conclusion."
      },
      {
        h: { vi: "4. Bốn dạng đề và cách trả lời", en: "4. The four question types and how to answer" },
        vi: "Đọc kỹ câu lệnh cuối đề vì nó quyết định cấu trúc. Opinion: nêu rõ đồng ý hay không và ở mức nào. Discussion: viết cả hai quan điểm, thường kèm ý kiến riêng nếu đề yêu cầu. Problem–solution: nêu vấn đề/nguyên nhân rồi giải pháp. Two-part: có 2 câu hỏi riêng, mỗi câu phải được trả lời đầy đủ (thường mỗi câu một đoạn thân bài). Trả lời thiếu một phần là lỗi Task Response lớn nhất.",
        en: "Read the final instruction carefully because it decides the structure. Opinion: state clearly whether you agree and to what degree. Discussion: cover both views, plus your own opinion if the prompt asks for it. Problem–solution: describe the problems/causes, then the solutions. Two-part: there are 2 separate questions and each must be answered fully (usually one body paragraph each). Leaving out one part is the biggest Task Response error."
      }
    ],
    table: [
      {
        h: { vi: "Bảng 1 – Bốn dạng đề Task 2", en: "Table 1 – The four Task 2 question types" },
        rows: [
          ["Opinion (agree/disagree)", { vi: "Từ khóa: “To what extent do you agree or disagree?”. Thesis: nêu rõ đồng ý hoàn toàn / một phần / không đồng ý. Thân bài: mỗi đoạn một lý do ủng hộ quan điểm.", en: "Key phrase: “To what extent do you agree or disagree?”. Thesis: state full / partial agreement or disagreement. Body: one reason supporting your view per paragraph." }],
          ["Discussion (both views)", { vi: "Từ khóa: “Discuss both views and give your opinion.”. Thesis: nói bạn sẽ bàn cả hai và nghiêng về bên nào. Thân bài: đoạn 1 quan điểm A, đoạn 2 quan điểm B + ý kiến riêng.", en: "Key phrase: “Discuss both views and give your opinion.”. Thesis: say you will discuss both and which side you favour. Body: paragraph 1 view A, paragraph 2 view B + your opinion." }],
          ["Problem–solution", { vi: "Từ khóa: “What are the causes/problems? What measures can be taken?”. Thesis: tóm tắt vấn đề chính và hướng giải pháp. Thân bài: đoạn 1 vấn đề, đoạn 2 giải pháp tương ứng.", en: "Key phrase: “What are the causes/problems? What measures can be taken?”. Thesis: summarise the main problem and the type of solution. Body: paragraph 1 problems, paragraph 2 matching solutions." }],
          ["Two-part question", { vi: "Từ khóa: hai câu hỏi liền nhau (vd “Why…? Is this positive or negative?”). Thesis: trả lời ngắn cả hai câu. Thân bài: mỗi câu hỏi một đoạn.", en: "Key phrase: two separate questions (e.g. “Why…? Is this positive or negative?”). Thesis: answer both briefly. Body: one paragraph per question." }]
        ]
      },
      {
        h: { vi: "Bảng 2 – Khung mở bài và kết bài", en: "Table 2 – Introduction and conclusion frames" },
        rows: [
          ["Introduction", { vi: "Paraphrase đề (1 câu) + Thesis (1 câu). Ví dụ khung: “It is often claimed that … . This essay will argue that …”.", en: "Paraphrase (1 sentence) + Thesis (1 sentence). Frame example: “It is often claimed that … . This essay will argue that …”." }],
          ["Conclusion", { vi: "Cụm kết + nhắc lại quan điểm (1 câu) + tóm tắt/kiến nghị (1 câu). Ví dụ khung: “In conclusion, … . For this reason, …”.", en: "Closing phrase + restated position (1 sentence) + summary/recommendation (1 sentence). Frame example: “In conclusion, … . For this reason, …”." }]
        ]
      }
    ],
    vocab: [
      { w: "thesis statement", pos: "n", ipa: "/ˈθiːsɪs ˈsteɪtmənt/", vi: "câu luận điểm (nêu quan điểm chính của bài)", en: "a sentence that states the main position of an essay", ex: "Your thesis statement should answer the question directly.", col: "a clear / strong thesis statement" },
      { w: "paraphrase", pos: "v", ipa: "/ˈpærəfreɪz/", vi: "diễn đạt lại bằng lời khác", en: "to express the same meaning using different words", ex: "Paraphrase the question instead of copying it.", col: "paraphrase a sentence / a question" },
      { w: "to what extent", pos: "phr", ipa: "/tə wɒt ɪkˈstent/", vi: "ở mức độ nào", en: "how far or how much", ex: "To what extent do you agree with this statement?", col: "to what extent + do you agree" },
      { w: "outweigh", pos: "v", ipa: "/ˌaʊtˈweɪ/", vi: "nặng hơn, vượt trội hơn", en: "to be greater or more important than something", ex: "The benefits of cycling outweigh the risks.", col: "outweigh the drawbacks / risks" },
      { w: "viewpoint", pos: "n", ipa: "/ˈvjuːpɔɪnt/", vi: "quan điểm", en: "a particular way of thinking about a topic", ex: "Both viewpoints have some merit.", col: "an opposing / a different viewpoint" },
      { w: "argue", pos: "v", ipa: "/ˈɑːɡjuː/", vi: "lập luận, cho rằng", en: "to give reasons to support an opinion", ex: "Some people argue that schools should teach cooking.", col: "argue that + clause" },
      { w: "convincing", pos: "adj", ipa: "/kənˈvɪnsɪŋ/", vi: "thuyết phục", en: "able to make people believe something", ex: "I find the second argument more convincing.", col: "a convincing argument / reason" },
      { w: "contribute to", pos: "phr v", ipa: "/kənˈtrɪbjuːt tuː/", vi: "góp phần gây ra, đóng góp vào", en: "to help to cause something", ex: "Heavy traffic contributes to air pollution.", col: "contribute to a problem / to growth" },
      { w: "address", pos: "v", ipa: "/əˈdres/", vi: "giải quyết (vấn đề)", en: "to deal with a problem", ex: "Governments must address the shortage of housing.", col: "address an issue / a problem" },
      { w: "drawback", pos: "n", ipa: "/ˈdrɔːbæk/", vi: "nhược điểm, mặt hạn chế", en: "a disadvantage of something", ex: "One drawback of online study is the lack of face-to-face contact.", col: "a major / obvious drawback" },
      { w: "in the long run", pos: "phr", ipa: "/ɪn ðə lɒŋ rʌn/", vi: "về lâu dài", en: "over a long period of time; eventually", ex: "In the long run, cheaper public transport saves money.", col: "in the long run, ..." },
      { w: "undoubtedly", pos: "adv", ipa: "/ʌnˈdaʊtɪdli/", vi: "chắc chắn, không còn nghi ngờ", en: "without any doubt", ex: "Exercise is undoubtedly good for mental health.", col: "undoubtedly beneficial / important" },
      { w: "tackle", pos: "v", ipa: "/ˈtækl/", vi: "xử lý, giải quyết", en: "to try to deal with a difficult problem", ex: "Stricter rules could tackle the problem of litter.", col: "tackle a problem / an issue" },
      { w: "consequence", pos: "n", ipa: "/ˈkɒnsɪkwəns/", vi: "hậu quả, kết quả", en: "a result of an action or situation", ex: "A serious consequence of noise is poor sleep.", col: "a serious / unintended consequence" },
      { w: "measure", pos: "n", ipa: "/ˈmeʒə/", vi: "biện pháp", en: "an action taken to achieve a particular aim", ex: "The council introduced measures to reduce traffic.", col: "take / introduce measures" },
      { w: "widespread", pos: "adj", ipa: "/ˈwaɪdspred/", vi: "phổ biến, lan rộng", en: "existing or happening in many places or among many people", ex: "Online banking is now widespread.", col: "widespread concern / use" }
    ],
    examples: [
      {
        label: { vi: "Mở bài – dạng Opinion", en: "Introduction – Opinion" },
        text: "Prompt: Some people believe that homework should be banned in primary schools. To what extent do you agree or disagree?\nIt is sometimes suggested that young pupils should not be given any work to do at home. I partly agree with this view, because excessive homework harms children, although a small amount can be useful.",
        note: { vi: "Câu 1 paraphrase (banned → should not be given any work; primary schools → young pupils). Câu 2 là thesis nêu mức độ đồng ý (partly agree).", en: "Sentence 1 paraphrases (banned → should not be given any work; primary schools → young pupils). Sentence 2 is the thesis stating the degree of agreement (partly agree)." },
        speak: true
      },
      {
        label: { vi: "Mở bài – dạng Discussion", en: "Introduction – Discussion" },
        text: "Prompt: Some people think that museums should be free for everyone, while others believe visitors should pay. Discuss both views and give your opinion.\nOpinions differ on whether people ought to pay to enter museums. This essay will examine both arguments before explaining why I support free entry.",
        note: { vi: "Thesis báo trước cấu trúc (xét cả hai) và vị trí của người viết (ủng hộ vào cửa miễn phí).", en: "The thesis previews the structure (both arguments) and the writer’s position (support for free entry)." },
        speak: true
      },
      {
        label: { vi: "Mở bài – dạng Problem–solution", en: "Introduction – Problem–solution" },
        text: "Prompt: Many cities suffer from heavy traffic. What problems does this cause, and what measures could be taken?\nTraffic congestion has become a common feature of large cities. It leads to pollution and lost time, but better public transport and road charges could reduce the problem.",
        note: { vi: "Thesis tóm tắt cả vấn đề (pollution, lost time) lẫn hướng giải pháp (public transport, road charges).", en: "The thesis summarises both the problems (pollution, lost time) and the type of solution (public transport, road charges)." },
        speak: true
      },
      {
        label: { vi: "Mở bài – dạng Two-part", en: "Introduction – Two-part" },
        text: "Prompt: More and more people choose to live alone. Why is this happening? Is it a positive or negative development?\nLiving alone is becoming increasingly common around the world. This trend is mainly driven by rising incomes and later marriage, and I believe it is largely a positive development.",
        note: { vi: "Thesis trả lời ngắn gọn cả hai câu hỏi: lý do (rising incomes, later marriage) và đánh giá (largely positive).", en: "The thesis briefly answers both questions: the reasons (rising incomes, later marriage) and the evaluation (largely positive)." },
        speak: true
      },
      {
        label: { vi: "Kết bài mẫu", en: "Sample conclusion" },
        text: "In conclusion, giving pupils a small amount of homework is helpful, but heavy workloads damage their health and enthusiasm. Schools should therefore set short, purposeful tasks.",
        note: { vi: "Câu 1 nhắc lại quan điểm (partly agree) bằng từ mới; câu 2 là kiến nghị liên quan trực tiếp, không có ý mới.", en: "Sentence 1 restates the position (partly agree) in new words; sentence 2 is a recommendation directly linked to it, with no new ideas." },
        speak: true
      },
      {
        label: { vi: "Nâng cấp đoạn thân bài (từ ~band 6 lên ~band 7+, tự đánh giá)", en: "Upgrading a body paragraph (from ~band 6 to ~band 7+, self-assessed)" },
        text: "Before: Cars are bad for city centres. They make a lot of pollution and many people get sick. So the government should ban them.\nAfter: Firstly, private cars are a major source of air pollution in crowded centres. Exhaust fumes can aggravate respiratory conditions such as asthma, so restricting traffic would directly improve public health. For instance, a pedestrian zone in a busy shopping street allows residents to breathe cleaner air while they shop.",
        note: { vi: "Bản sau có topic sentence rõ, giải thích nguyên nhân – kết quả, ví dụ cụ thể, từ vựng chính xác hơn (aggravate, respiratory conditions) và không lặp từ. Đây là ví dụ tự soạn để so sánh, không phải chấm điểm chính thức.", en: "The second version has a clear topic sentence, a cause–effect explanation, a concrete example and more precise vocabulary (aggravate, respiratory conditions) without repetition. This is a self-written comparison, not an official score." }
      }
    ],
    mistakes: [
      { vi: "Chép nguyên văn đề bài làm mở bài: số từ ở phần chép không được tính là bài làm của bạn. Hãy đổi từ, đổi từ loại hoặc đổi cấu trúc.", en: "Copying the prompt as the introduction: copied words do not count as your own language. Change words, word class or structure." },
      { vi: "Không có thesis (chỉ viết “This essay will discuss…” mà không nêu quan điểm) khi đề hỏi ý kiến.", en: "No thesis (only “This essay will discuss…” with no position) when the prompt asks for an opinion." },
      { vi: "Chỉ trả lời một nửa đề two-part hoặc quên nêu ý kiến riêng ở đề discussion có yêu cầu.", en: "Answering only half of a two-part prompt, or forgetting your own opinion when a discussion prompt asks for it." },
      { vi: "Thêm ý mới hoàn toàn ở kết bài (vd “Another important point is…”).", en: "Adding a completely new idea in the conclusion (e.g. “Another important point is…”)." },
      { vi: "Lạm dụng cụm nối máy móc (Firstly, Secondly, Thirdly, Moreover ở mọi câu) thay vì liên kết bằng ý và đại từ tham chiếu (this, such, these).", en: "Overusing mechanical linkers (Firstly, Secondly, Moreover in every sentence) instead of linking by ideas and reference words (this, such, these)." }
    ],
    exercises: [
      {
        id: "w05-ex01", type: "mcq", tag: "question-type",
        q: { vi: "Xác định dạng đề: “Some people believe that homework should be banned. To what extent do you agree or disagree?”", en: "Identify the type: “Some people believe that homework should be banned. To what extent do you agree or disagree?”" },
        opts: ["Opinion", "Discussion", "Problem–solution", "Two-part question"],
        a: 0,
        why: { vi: "“To what extent do you agree or disagree?” là câu lệnh đặc trưng của dạng Opinion.", en: "“To what extent do you agree or disagree?” is the typical instruction for an Opinion essay." }
      },
      {
        id: "w05-ex02", type: "mcq", tag: "question-type",
        q: { vi: "Xác định dạng đề: “Some people think a gap year is useful, while others disagree. Discuss both views and give your opinion.”", en: "Identify the type: “Some people think a gap year is useful, while others disagree. Discuss both views and give your opinion.”" },
        opts: ["Opinion", "Discussion", "Problem–solution", "Two-part question"],
        a: 1,
        why: { vi: "“Discuss both views” là dấu hiệu của Discussion; phải trình bày cả hai quan điểm và ý kiến riêng.", en: "“Discuss both views” signals a Discussion essay; you must present both views plus your own opinion." }
      },
      {
        id: "w05-ex03", type: "mcq", tag: "question-type",
        q: { vi: "Xác định dạng đề: “Noise pollution is increasing in cities. What are the causes, and what can be done to reduce it?”", en: "Identify the type: “Noise pollution is increasing in cities. What are the causes, and what can be done to reduce it?”" },
        opts: ["Opinion", "Discussion", "Problem–solution", "Two-part question"],
        a: 2,
        why: { vi: "Hỏi về nguyên nhân và giải pháp = Problem–solution (cause–solution).", en: "Asking for causes and solutions = Problem–solution (cause–solution)." }
      },
      {
        id: "w05-ex04", type: "mcq", tag: "question-type",
        q: { vi: "Xác định dạng đề: “Many young people now prefer to rent rather than buy a home. Why is this? Is it a good or bad trend?”", en: "Identify the type: “Many young people now prefer to rent rather than buy a home. Why is this? Is it a good or bad trend?”" },
        opts: ["Opinion", "Discussion", "Problem–solution", "Two-part question"],
        a: 3,
        why: { vi: "Có hai câu hỏi riêng (Why? và Good or bad?) nên phải trả lời cả hai: đây là Two-part question.", en: "There are two separate questions (Why? and Good or bad?) and both must be answered: a Two-part question." }
      },
      {
        id: "w05-ex05", type: "mcq", tag: "paraphrase",
        q: { vi: "Câu nào là paraphrase tốt nhất cho: “Young people today spend too much time on social media.”?", en: "Which is the best paraphrase of: “Young people today spend too much time on social media.”?" },
        opts: [
          "Young people today spend too much time on social media.",
          "Many youngsters devote an excessive amount of their time to social networking sites.",
          "Young people today use social media.",
          "Social media is bad for young people."
        ],
        a: 1,
        why: { vi: "B giữ nguyên nghĩa bằng từ khác (young people → youngsters, too much → an excessive amount, social media → social networking sites). A chép nguyên văn; C mất ý “quá nhiều”; D đổi nghĩa (nói về tác hại).", en: "B keeps the meaning in different words (young people → youngsters, too much → an excessive amount, social media → social networking sites). A copies; C loses “too much”; D changes the meaning (it talks about harm)." }
      },
      {
        id: "w05-ex06", type: "mcq", tag: "conclusion",
        q: { vi: "Câu nào KHÔNG nên xuất hiện trong kết bài?", en: "Which sentence should NOT appear in a conclusion?" },
        opts: [
          "In conclusion, I believe that governments should invest more in public transport.",
          "To sum up, the benefits of remote work outweigh its drawbacks.",
          "Another important point is that employers also save money on office rent.",
          "Overall, both views have merit, but I favour the second."
        ],
        a: 2,
        why: { vi: "C đưa ra ý mới (tiết kiệm tiền thuê văn phòng) chưa được phát triển ở thân bài. A, B, D đều nhắc lại quan điểm đã nêu.", en: "C introduces a new idea (saving office rent) that was not developed in the body. A, B and D restate positions already given." }
      },
      {
        id: "w05-ex07", type: "order", tag: "structure", scoreEach: true,
        q: { vi: "Gán vai trò đoạn cho từng câu của một bài luận về xe cá nhân trong trung tâm thành phố.", en: "Label the paragraph role of each sentence from an essay about private cars in city centres." },
        items: [
          "In short, restricting cars in city centres brings more benefits than drawbacks, so I support the proposal.",
          "Many people argue that private cars should be banned from city centres. I agree with this view for health and safety reasons.",
          "Firstly, fewer cars mean cleaner air, which reduces illnesses such as asthma.",
          "Secondly, streets without traffic are safer for pedestrians and cyclists."
        ],
        labels: ["Introduction", "Body 1", "Body 2", "Conclusion"],
        a: ["Conclusion", "Introduction", "Body 1", "Body 2"],
        why: { vi: "“In short” + nhắc lại quan điểm = kết bài. Câu có paraphrase đề và thesis = mở bài. “Firstly” mở thân bài 1; “Secondly” mở thân bài 2.", en: "“In short” + restated position = Conclusion. The sentences with a paraphrase and thesis = Introduction. “Firstly” opens Body 1; “Secondly” opens Body 2." }
      },
      {
        id: "w05-ex08", type: "text", tag: "paraphrase",
        q: { vi: "Viết lại bằng lời của bạn (không dùng lại nhiều từ gốc): “More and more people are choosing to work from home.”", en: "Paraphrase in your own words (avoid reusing the original words): “More and more people are choosing to work from home.”" },
        model: [
          "An increasing number of employees are opting to work remotely.",
          "Working from home is becoming a more popular choice."
        ],
        why: { vi: "Đổi từ (more and more → an increasing number of; choosing → opting; work from home → work remotely) hoặc đổi cấu trúc (is becoming a more popular choice). Nghĩa phải giữ nguyên.", en: "Change words (more and more → an increasing number of; choosing → opting; work from home → work remotely) or structure (is becoming a more popular choice). The meaning must stay the same." }
      },
      {
        id: "w05-ex09", type: "mcq", tag: "thesis",
        q: { vi: "Đề Discussion: “Some people prefer working in an office, others at home. Discuss both views and give your opinion.” Thesis nào phù hợp nhất?", en: "Discussion prompt: “Some people prefer working in an office, others at home. Discuss both views and give your opinion.” Which thesis fits best?" },
        opts: [
          "I completely agree that everyone should work at home.",
          "While working from home offers flexibility, office work supports teamwork, and I believe the second matters more.",
          "There are many opinions about work, and everyone is different.",
          "This essay will talk about offices."
        ],
        a: 1,
        why: { vi: "B nêu cả hai quan điểm và vị trí của người viết. A bỏ qua một bên; C và D không có quan điểm.", en: "B names both views and the writer’s position. A ignores one side; C and D have no position." }
      },
      {
        id: "w05-ex10", type: "mcq", tag: "time",
        q: { vi: "Phân bổ 40 phút nào hợp lý nhất cho Task 2?", en: "Which split of 40 minutes is the most sensible for Task 2?" },
        opts: [
          { vi: "0 phút lập dàn ý, 40 phút viết", en: "0 min planning, 40 min writing" },
          { vi: "5 phút lập dàn ý, 30 phút viết, 5 phút soát lỗi", en: "5 min planning, 30 min writing, 5 min checking" },
          { vi: "20 phút lập dàn ý, 15 phút viết, 5 phút soát lỗi", en: "20 min planning, 15 min writing, 5 min checking" },
          { vi: "35 phút viết mở bài, 5 phút viết phần còn lại", en: "35 min on the introduction, 5 min on the rest" }
        ],
        a: 1,
        why: { vi: "Lập dàn ý ngắn giúp bài mạch lạc, còn thời gian soát lỗi ngữ pháp và đếm từ. Các phương án khác thiếu bước hoặc mất cân đối.", en: "A short plan keeps the essay coherent and leaves time to check grammar and word count. The other options skip steps or are unbalanced." }
      }
    ],
    summary: [
      { vi: "4 dạng đề: Opinion, Discussion, Problem–solution, Two-part; đọc kỹ câu lệnh cuối đề.", en: "4 types: Opinion, Discussion, Problem–solution, Two-part; read the final instruction carefully." },
      { vi: "Mở bài = paraphrase + thesis khớp dạng đề.", en: "Introduction = paraphrase + thesis matching the question type." },
      { vi: "Kết bài = nhắc lại quan điểm + tóm tắt, không thêm ý mới.", en: "Conclusion = restated position + summary, no new ideas." },
      { vi: "Thời gian gợi ý: 5 phút dàn ý, 30 phút viết, 5 phút soát; tối thiểu 250 từ.", en: "Suggested time: 5 min plan, 30 min write, 5 min check; at least 250 words." }
    ]
  },

  quiz: {
    title: { vi: "Kiểm tra tuần 5 – Writing Task 2", en: "Week 5 test – Writing Task 2" },
    passPct: null,
    timeLimitMin: null,
    sections: [
      {
        id: "w05-s1", skill: "writing",
        title: { vi: "Phần 1 – Nhận diện dạng đề", en: "Part 1 – Identify the question type" },
        instructions: { vi: "Chọn dạng đề đúng cho từng đề bài.", en: "Choose the correct type for each prompt." },
        questions: [
          {
            id: "w05-q01", type: "mcq", tag: "question-type",
            q: "In some countries, many young people leave rural areas to live in cities. What are the causes of this trend, and what solutions can be proposed?",
            opts: ["Opinion", "Discussion", "Problem–solution", "Two-part question"],
            a: 2,
            why: { vi: "Hỏi nguyên nhân và giải pháp = Problem–solution (cause–solution).", en: "Asking for causes and solutions = Problem–solution (cause–solution)." }
          },
          {
            id: "w05-q02", type: "mcq", tag: "question-type",
            q: "Some people believe that university education should be free for every student. Others think that students should pay for their own studies. Discuss both views and give your opinion.",
            opts: ["Opinion", "Discussion", "Problem–solution", "Two-part question"],
            a: 1,
            why: { vi: "“Discuss both views” = Discussion.", en: "“Discuss both views” = Discussion." }
          },
          {
            id: "w05-q03", type: "mcq", tag: "question-type",
            q: "Many people now change careers several times during their working lives. Why is this happening? Is it a positive or negative development?",
            opts: ["Opinion", "Discussion", "Problem–solution", "Two-part question"],
            a: 3,
            why: { vi: "Hai câu hỏi riêng (Why? và positive or negative?) = Two-part question.", en: "Two separate questions (Why? and positive or negative?) = Two-part question." }
          },
          {
            id: "w05-q04", type: "mcq", tag: "question-type",
            q: "Online shopping will soon replace shopping in real stores. To what extent do you agree or disagree?",
            opts: ["Opinion", "Discussion", "Problem–solution", "Two-part question"],
            a: 0,
            why: { vi: "“To what extent do you agree or disagree?” = Opinion.", en: "“To what extent do you agree or disagree?” = Opinion." }
          },
          {
            id: "w05-q05", type: "mcq", tag: "question-type",
            q: { vi: "Cụm nào trong đề báo hiệu bạn phải viết về CẢ HAI phía?", en: "Which phrase in a prompt signals that you must write about BOTH sides?" },
            opts: ["To what extent do you agree?", "Discuss both views.", "What are the causes?", "Why does this happen?"],
            a: 1,
            why: { vi: "“Discuss both views” yêu cầu trình bày hai quan điểm. Các cụm còn lại hỏi mức độ đồng ý hoặc nguyên nhân.", en: "“Discuss both views” asks for two viewpoints. The other phrases ask about degree of agreement or causes." }
          }
        ]
      },
      {
        id: "w05-s2", skill: "writing",
        title: { vi: "Phần 2 – Mở bài, kết bài và cấu trúc", en: "Part 2 – Introductions, conclusions and structure" },
        instructions: { vi: "Chọn đáp án tốt nhất; riêng câu sắp xếp, gán vai trò cho từng câu.", en: "Choose the best answer; for the ordering question, label the role of each sentence." },
        questions: [
          {
            id: "w05-q06", type: "mcq", tag: "paraphrase",
            q: "Which sentence is the best paraphrase of: “The number of people who work from home has risen sharply in recent years.”?",
            opts: [
              "The number of people who work from home has risen sharply in recent years.",
              "Over the past few years, remote working has become considerably more common.",
              "People work from home in recent years.",
              "Working from home is better than working in an office."
            ],
            a: 1,
            why: { vi: "B giữ nghĩa với từ khác (risen sharply → become considerably more common; in recent years → over the past few years). A chép nguyên văn, C sai ngữ pháp và mất ý tăng, D đổi nghĩa.", en: "B keeps the meaning with different words (risen sharply → become considerably more common; in recent years → over the past few years). A copies, C is ungrammatical and loses the idea of increase, D changes the meaning." }
          },
          {
            id: "w05-q07", type: "mcq", tag: "thesis",
            q: "Prompt: “Online shopping will soon replace shopping in real stores. To what extent do you agree or disagree?” Which thesis is the best?",
            opts: [
              "There are many opinions about online shopping and I will discuss them.",
              "Online shopping is good and I like it very much.",
              "Although online shopping is growing quickly, I disagree that it will completely replace physical shops, because many customers still value seeing and touching products.",
              "Some people agree and some people disagree with the statement."
            ],
            a: 2,
            why: { vi: "C có quan điểm rõ (disagree), mức độ và lý do. A và D không có quan điểm; B không trả lời câu hỏi “replace”.", en: "C gives a clear position (disagree), its degree and a reason. A and D take no position; B does not answer the “replace” question." }
          },
          {
            id: "w05-q08", type: "mcq", tag: "conclusion",
            q: "Prompt: museums free or paid (discussion, writer favours free entry). Which conclusion is best?",
            opts: [
              "Furthermore, museums also need new buildings, and governments should plan this carefully.",
              "In conclusion, although charging fees brings some income, I believe free entry is better because it gives everyone access to culture and learning.",
              "I do not know which side is better, so everyone can decide for themselves.",
              "Opinions differ on whether people ought to pay to enter museums, and this essay will examine both sides."
            ],
            a: 1,
            why: { vi: "B nhắc lại quan điểm và tóm tắt lý do. A thêm ý mới; C không có quan điểm; D lặp lại mở bài.", en: "B restates the position and summarises the reason. A adds a new idea; C has no position; D repeats the introduction." }
          },
          {
            id: "w05-q09", type: "order", tag: "structure", scoreEach: true,
            q: { vi: "Gán vai trò đoạn cho từng câu của một bài luận về học trực tuyến.", en: "Label the paragraph role of each sentence from an essay about online learning." },
            items: [
              "Moreover, flexible schedules let adults study while holding a job, which widens access to education.",
              "To conclude, online courses offer convenience and wider access, so I largely agree that they will become the main way adults study.",
              "It is often claimed that online courses are replacing classroom teaching for adults. I partly agree with this view.",
              "To begin with, online courses save time and money because learners do not need to travel to a campus."
            ],
            labels: ["Introduction", "Body 1", "Body 2", "Conclusion"],
            a: ["Body 2", "Conclusion", "Introduction", "Body 1"],
            why: { vi: "“To begin with” mở thân bài 1; “Moreover” bổ sung ở thân bài 2; “To conclude” là kết bài; câu paraphrase đề và nêu thesis là mở bài.", en: "“To begin with” opens Body 1; “Moreover” continues in Body 2; “To conclude” is the conclusion; the sentence that paraphrases the prompt and states a thesis is the introduction." }
          }
        ]
      },
      {
        id: "w05-s3", skill: "writing",
        title: { vi: "Phần 3 – Viết lại câu", en: "Part 3 – Rewriting sentences" },
        instructions: { vi: "Viết câu của bạn rồi so với đáp án mẫu; nhiều đáp án khác vẫn có thể đúng nếu giữ nghĩa và đúng ngữ pháp.", en: "Write your own sentence and compare it with the model; other answers can also be right if they keep the meaning and are grammatical." },
        questions: [
          {
            id: "w05-q10", type: "text", tag: "paraphrase",
            q: { vi: "Paraphrase: “Governments should spend more money on public transport than on roads.”", en: "Paraphrase: “Governments should spend more money on public transport than on roads.”" },
            model: [
              "State authorities ought to invest more in public transport than in road building.",
              "Public transport should receive more government funding than roads."
            ],
            why: { vi: "Đổi từ (governments → state authorities; spend money → invest; roads → road building) hoặc đổi chủ ngữ và cấu trúc. Nghĩa phải giữ nguyên, so sánh vẫn là public transport hơn roads.", en: "Change words (governments → state authorities; spend money → invest; roads → road building) or change the subject and structure. The meaning must stay: public transport receives more than roads." }
          },
          {
            id: "w05-q11", type: "text", tag: "thesis",
            q: { vi: "Viết lại thesis yếu “This essay will talk about zoos.” thành thesis có quan điểm rõ cho đề: “Zoos should be closed. To what extent do you agree or disagree?”", en: "Rewrite the weak thesis “This essay will talk about zoos.” into a thesis with a clear position for the prompt: “Zoos should be closed. To what extent do you agree or disagree?”" },
            model: [
              "I strongly disagree that zoos should be closed, because they protect endangered species and educate the public.",
              "I largely agree that zoos should be closed, since animals suffer when they are kept in small enclosures."
            ],
            why: { vi: "Thesis tốt trả lời trực tiếp đề (agree/disagree), nêu mức độ và 1–2 lý do chính. Chọn bên nào cũng được nếu nhất quán trong cả bài.", en: "A good thesis answers the prompt directly (agree/disagree), states the degree and gives 1–2 main reasons. Either side is fine if you stay consistent in the whole essay." }
          }
        ]
      },
      {
        id: "w05-s4", skill: "writing",
        title: { vi: "Phần 4 – Bài luận hoàn chỉnh (gợi ý 40 phút)", en: "Part 4 – Full essay (suggested 40 minutes)" },
        instructions: { vi: "Viết bài Task 2 tối thiểu 250 từ. Sau đó đối chiếu checklist và tự chấm 4 tiêu chí TR / CC / LR / GRA (chọn band 5–9), rồi viết lại đoạn thân bài yếu nhất (câu cuối). Bài mẫu chỉ để tham khảo.", en: "Write a Task 2 essay of at least 250 words. Then check the checklist and self-assess on TR / CC / LR / GRA (choose a band from 5 to 9), and rewrite your weakest body paragraph (last question). The models are for reference only." },
        questions: [
          {
            id: "w05-q12", type: "essay", task: "T2", minWords: 250, suggestMin: 40,
            q: "Some people think that children should start learning a foreign language at primary school, while others believe it is better to wait until secondary school. Discuss both views and give your opinion.",
            model: "People disagree about the best age to begin learning a foreign language. Some argue that children should start in primary school, whereas others believe that secondary school is a more suitable time. This essay will discuss both views, but I believe that an early start is more beneficial.\n\nThose who favour waiting until secondary school make two main points. Firstly, primary teachers already have a crowded timetable, and adding another subject may leave pupils with less time to master reading, writing and mathematics. Secondly, older students can understand grammar rules and study more independently, so they may progress faster in a shorter time. For example, a teenager who is motivated to travel or work abroad can set clear goals and revise alone, which young children usually cannot do.\n\nHowever, I find the case for early learning more convincing. Young children tend to pick up new sounds easily, so they are more likely to pronounce a language clearly and to lose their fear of speaking. In addition, if lessons are built around songs, games and stories, pupils enjoy the subject and develop positive attitudes that can last for many years. A child who has studied English since the age of seven will also have far more exposure than one who begins at twelve, and this extra time makes fluency easier to reach.\n\nIn conclusion, although starting later has some advantages, such as better study skills and a lighter primary timetable, I believe that introducing a foreign language in primary school gives children a stronger foundation. Schools should therefore offer short, enjoyable lessons from an early age.",
            checklist: [
              { vi: "Mở bài: paraphrase đề + thesis nêu cả hai quan điểm và ý kiến riêng", en: "Introduction: paraphrase + thesis covering both views and your opinion" },
              { vi: "Thân bài 1 trình bày quan điểm A; thân bài 2 trình bày quan điểm B và lý do bạn nghiêng về bên nào", en: "Body 1 presents view A; Body 2 presents view B and why you favour one side" },
              { vi: "Mỗi đoạn thân bài có topic sentence, giải thích và ví dụ", en: "Each body paragraph has a topic sentence, explanation and example" },
              { vi: "Kết bài nhắc lại quan điểm, không thêm ý mới", en: "Conclusion restates the position with no new ideas" },
              { vi: "Từ nối đa dạng, có đại từ tham chiếu (this, such)", en: "Varied linkers and reference words (this, such)" },
              { vi: "Có ít nhất 3 câu phức đúng ngữ pháp", en: "At least 3 grammatically correct complex sentences" },
              { vi: "Đủ 250 từ trở lên", en: "250 words or more" }
            ],
            criteria: ["TR", "CC", "LR", "GRA"],
            why: { vi: "Bài mẫu là một cách làm tham khảo (khoảng 265 từ); bài khác vẫn tốt nếu trả lời đủ cả hai quan điểm, có ý kiến riêng và đạt checklist. Thời gian gợi ý: 5 phút dàn ý, 30 phút viết, 5 phút soát lỗi.", en: "The model (about 265 words) is one reference approach; other essays are fine if they cover both views, give your opinion and meet the checklist. Suggested timing: 5 minutes planning, 30 writing, 5 checking." }
          },
          {
            id: "w05-q13", type: "write", tag: "rewrite-7.5",
            q: { vi: "Sau khi tự chấm bài luận ở câu trên, chọn đoạn thân bài yếu nhất và viết lại cho đạt mức ~7.5 (đối chiếu checklist). Nếu chưa có bài, hãy viết lại đoạn yếu sau (cùng đề): “Children should learn foreign language early. Because children learn fast. For example my cousin learn English when he is small and now he speak very good. So it is good for children to start at primary school.”",
                 en: "After self-assessing your essay above, choose your weakest body paragraph and rewrite it to a ~7.5 standard (use the checklist). If you have no essay yet, rewrite this weak paragraph on the same prompt: “Children should learn foreign language early. Because children learn fast. For example my cousin learn English when he is small and now he speak very good. So it is good for children to start at primary school.”" },
            model: "The strongest argument for an early start is that young children pick up the sounds of a new language with remarkable ease. Because they are less self-conscious than teenagers, they are usually willing to imitate unfamiliar pronunciation and to speak without worrying about mistakes. Consider a seven-year-old who sings simple English songs in class every week: by the time she reaches secondary school, she is likely to pronounce common words naturally and to see speaking as an ordinary activity rather than a test. For this reason, introducing a foreign language at primary school can give pupils a confident foundation on which later grammar study can build.",
            checklist: [
              { vi: "Topic sentence chỉ một ý, trả lời đúng đề", en: "Topic sentence with one idea that answers the prompt" },
              { vi: "Giải thích có quan hệ nguyên nhân – kết quả, không lặp lại topic sentence", en: "A cause–effect explanation that does not repeat the topic sentence" },
              { vi: "Ví dụ cụ thể (có thể giả định), không số liệu bịa", en: "A specific (possibly hypothetical) example, no invented statistics" },
              { vi: "Câu link nối về quan điểm của bài", en: "A link sentence back to your position" },
              { vi: "Đã sửa hết lỗi ngữ pháp của bản gốc (mạo từ, -s ngôi thứ ba, câu cụt “Because…”, thì quá khứ)", en: "All the original grammar errors fixed (articles, third-person -s, the “Because…” fragment, past tense)" },
              { vi: "Từ vựng chính xác hơn, không lặp “good”", en: "More precise vocabulary, no repeated “good”" }
            ],
            why: { vi: "PLAN tuần 5: đối chiếu tiêu chí và viết lại 1 đoạn đạt 7.5. Đoạn mẫu (tự soạn, nhân vật giả định) thay ví dụ mơ hồ “my cousin” bằng tình huống cụ thể và có cơ chế giải thích. Mô tả mức band ở đây là diễn giải tự soạn, không phải band descriptors chính thức.", en: "PLAN week 5: compare with the criteria and rewrite one paragraph to 7.5. The self-written model (an imaginary child) replaces the vague “my cousin” with a concrete situation and explains the mechanism. The band level here is a self-written interpretation, not the official band descriptors." }
          }
        ]
      }
    ]
  },

  passages: [],
  scripts: [],
  mock: null
};
