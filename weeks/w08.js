// weeks/w08.js — Tuần 8: Writing Task 1 (overview, so sánh, xu hướng) + ngữ pháp câu phức.
// Nội dung tự soạn, không phải đề thi thật. MỌI số liệu trong file này là SỐ LIỆU MINH HỌA TỰ SOẠN (hư cấu),
// công viên/thư viện/thị trấn đều là tên hư cấu, không phải dữ liệu thống kê thật.
(function () {
  var NOTE = { vi: "số liệu minh họa tự soạn (hư cấu)", en: "illustrative self-written data (fictional)" };

  // Bảng 1 – xu hướng (dùng trong bài mẫu và câu hỏi kiểm tra)
  var T_PARKS = {
    kind: "table", note: NOTE,
    title: "Annual visitors to three parks (thousands)",
    head: ["Park", "2005", "2010", "2015", "2020", "2025"],
    rows: [
      ["Park A", "120", "150", "210", "260", "340"],
      ["Park B", "300", "280", "250", "240", "220"],
      ["Park C", "90", "95", "92", "96", "94"]
    ]
  };
  // Bảng 2 – so sánh (dùng cho essay T1 cuối tuần)
  var T_EXERCISE = {
    kind: "table", note: NOTE,
    title: "Adults who exercised at least three times a week in 2025, by age group and sex (%)",
    head: ["Age group", "Men", "Women"],
    rows: [["18–29", "46", "38"], ["30–44", "37", "33"], ["45–59", "27", "29"], ["60 and over", "30", "32"]]
  };
  // Bảng 3 – bài tập overview trong lesson
  var T_LIB = {
    kind: "table", note: NOTE,
    title: "Average books borrowed per member per year in three libraries",
    head: ["Library", "2015", "2025"],
    rows: [["Library X", "12", "18"], ["Library Y", "20", "14"], ["Library Z", "9", "9"]]
  };
  // Bảng 4 – overview trong quiz
  var T_RECYCLE = {
    kind: "table", note: NOTE,
    title: "Household recycling rate in three towns (%)",
    head: ["Town", "2010", "2025"],
    rows: [["Town P", "25", "60"], ["Town Q", "40", "45"], ["Town R", "55", "38"]]
  };

  // Bảng 5 – bài T1 luyện tập trong lesson (bài T1 thứ nhất của PLAN; bài thứ hai là essay cuối tuần)
  var T_ENERGY = {
    kind: "table", note: NOTE,
    title: "Electricity generated in Norland (a fictional country), by source (% of total)",
    head: ["Source", "2005", "2015", "2025"],
    rows: [["Coal", "60", "45", "25"], ["Gas", "25", "30", "30"], ["Wind", "5", "15", "30"], ["Solar", "2", "5", "12"], ["Hydroelectric", "8", "5", "3"]]
  };

  var MODEL_T1_ENERGY =
    "The table shows the proportion of electricity generated from five sources in Norland in 2005, 2015 and 2025.\n\n" +
    "Overall, coal lost its dominant position over the period, while wind and solar power expanded considerably. By 2025, wind had caught up with gas as one of the two largest sources, whereas hydroelectric power had become the least significant.\n\n" +
    "In 2005, coal produced 60% of the country's electricity, far more than any other source. This share fell steadily, to 45% in 2015 and to just 25% in 2025. Hydroelectric power also declined, from 8% to only 3%.\n\n" +
    "By contrast, wind power rose sixfold, from 5% to 30%, so that by 2025 it equalled the figure for gas, which had increased from 25% to 30% in the first decade and then remained stable. Solar energy, although still relatively small, climbed from 2% to 12%. It matched hydroelectric power at 5% in 2015 and was four times larger by the end of the period.";

  var MODEL_T1_PARKS =
    "The table compares the annual number of visitors to three parks over a twenty-year period, from 2005 to 2025. Figures are given in thousands.\n\n" +
    "Overall, Park A became markedly more popular, whereas Park B lost visitors steadily. Park C attracted far fewer people than the other two parks, and its figures hardly changed.\n\n" +
    "In 2005, Park B was the most visited park, with 300,000 visitors, while Park A received 120,000. Over the following two decades, however, the number of visitors to Park A rose at every stage, reaching 340,000 in 2025. It overtook Park B between 2015 and 2020, when it climbed from 210,000 to 260,000 and Park B fell from 250,000 to 240,000. By 2025, Park B had dropped to 220,000, the lowest figure it recorded during the period.\n\n" +
    "Park C, by contrast, remained stable throughout. Its visitor numbers fluctuated within a narrow range of 90,000 to 96,000, and it ended the period at 94,000, only slightly above its starting figure of 90,000.";

  var MODEL_T1_EXERCISE =
    "The table compares the percentage of men and women in four age groups who exercised at least three times a week in 2025.\n\n" +
    "Overall, regular exercise was most common among the youngest adults, and participation tended to fall with age, although it rose slightly among the oldest group. Men were more active than women in the two younger groups, whereas the pattern was reversed in the two older groups.\n\n" +
    "Among adults aged 18 to 29, 46 per cent of men and 38 per cent of women exercised regularly, which were the highest figures for each sex. In the 30 to 44 group, the proportions fell to 37 per cent for men and 33 per cent for women, so the gap between the sexes narrowed from eight to four percentage points.\n\n" +
    "The figures were lowest in the 45 to 59 group, where 27 per cent of men and 29 per cent of women took regular exercise. Women were therefore slightly ahead of men, a trend that continued among those aged 60 and over, with 32 per cent of women against 30 per cent of men. Notably, both sexes were more active at 60 or above than in the previous age group.";

  (window.WEEKS = window.WEEKS || {})[8] = {
    meta: { week: 8, skill: "writing", source: "tự soạn", version: 1, reviewed: false, dataNote: "Mọi số liệu biểu đồ là số liệu minh họa tự soạn (hư cấu)." },

    lesson: {
      title: { vi: "Bài 08 – Writing Task 1 và ngữ pháp câu phức", en: "Lesson 08 – Writing Task 1 and complex grammar" },
      goal: [
        { vi: "Viết bài Task 1 150+ từ với 4 phần: mở bài paraphrase, overview, hai đoạn chi tiết; không bịa số liệu ngoài bảng.", en: "Write a 150+ word Task 1 report with 4 parts: paraphrased introduction, overview, two detail paragraphs; no figures beyond the table." },
        { vi: "Dùng ngôn ngữ so sánh và xu hướng chính xác (rose sharply, remained stable, overtook, whereas).", en: "Use accurate comparison and trend language (rose sharply, remained stable, overtook, whereas)." },
        { vi: "Dùng đúng mệnh đề quan hệ, câu điều kiện loại 0–3 và đảo ngữ cơ bản.", en: "Use relative clauses, conditionals 0–3 and basic inversion correctly." }
      ],
      explain: [
        {
          h: { vi: "Lưu ý về dữ liệu trong bài này", en: "Note on the data in this lesson" },
          vi: "Tất cả bảng số liệu trong tuần này (công viên, thư viện, thị trấn, điện năng) là số liệu minh họa tự soạn, hoàn toàn hư cấu, chỉ dùng để luyện viết. Chúng không phản ánh thống kê thật và không phải đề thi thật. Khi thi, bạn chỉ được mô tả đúng những gì có trong biểu đồ.",
          en: "All data tables this week (parks, libraries, towns, electricity) are illustrative, self-written and entirely fictional, used only for practice. They do not reflect real statistics and are not real exam questions. In the exam you may only describe what is in the chart."
        },
        {
          h: { vi: "1. Cấu trúc bài Task 1 (20 phút, 150+ từ)", en: "1. Task 1 structure (20 minutes, 150+ words)" },
          vi: "Gồm 4 phần: (1) Mở bài: paraphrase tiêu đề biểu đồ (1–2 câu, có đối tượng, đơn vị, thời gian). (2) Overview: 2–3 ý lớn nhất, KHÔNG kê số liệu. (3) Chi tiết 1 và (4) chi tiết 2: nhóm số liệu theo logic (nhóm tăng / nhóm giảm, hoặc cao nhất / thấp nhất) và dẫn số liệu chính xác. Không đưa ý kiến, không giải thích nguyên nhân nếu biểu đồ không nêu, không bịa số.",
          en: "4 parts: (1) Introduction: paraphrase the chart title (1–2 sentences covering subject, unit, time). (2) Overview: the 2–3 biggest features, with NO figures. (3) Detail paragraph 1 and (4) detail paragraph 2: group the data logically (rising vs falling, or highest vs lowest) and quote exact figures. No opinions, no explaining causes the chart does not give, no invented figures."
        },
        {
          h: { vi: "2. Overview – phần quyết định điểm Task Achievement", en: "2. The overview – the key to Task Achievement" },
          vi: "Overview nêu xu hướng chung hoặc điểm nổi bật nhất bằng từ chung (rose strongly, remained stable, was the highest). Đặt ngay sau mở bài hoặc đầu thân bài. Câu mở như “Overall, …” hoặc “It is clear that …”. Một overview tốt không chứa con số chi tiết và bao quát toàn bộ đối tượng trong biểu đồ.",
          en: "The overview states the general trend or most striking feature in general terms (rose strongly, remained stable, was the highest). Place it straight after the introduction or at the start of the body. Open with “Overall, …” or “It is clear that …”. A good overview contains no detailed figures and covers all items in the chart."
        },
        {
          h: { vi: "3. Ngôn ngữ so sánh và xu hướng", en: "3. Comparison and trend language" },
          vi: "Thì: dữ liệu quá khứ dùng quá khứ đơn (rose, fell); mốc tương lai dùng will/is expected to. So sánh: whereas, while, compared with, higher than, the highest, twice as … as. Giới từ: rise from … to …; rise by … (mức thay đổi); at … (mức cố định); between … and …; over the period. Trạng từ mức độ: sharply, steadily, slightly, gradually.",
          en: "Tense: past data takes the past simple (rose, fell); future dates take will/is expected to. Comparison: whereas, while, compared with, higher than, the highest, twice as … as. Prepositions: rise from … to …; rise by … (the amount of change); at … (a fixed level); between … and …; over the period. Degree adverbs: sharply, steadily, slightly, gradually."
        },
        {
          h: { vi: "4. Mệnh đề quan hệ", en: "4. Relative clauses" },
          vi: "Mệnh đề xác định (defining) cho thông tin cần thiết, không có dấu phẩy và có thể dùng that: “The park that opened in 2010 …”. Mệnh đề không xác định (non-defining) thêm thông tin phụ, có dấu phẩy và KHÔNG dùng that: “Park A, which had 120,000 visitors in 2005, …”. who cho người, which cho vật, whose chỉ sở hữu, where cho nơi chốn. “, which” cũng có thể nói về cả mệnh đề trước: “The number rose sharply, which surprised the council.”",
          en: "A defining clause gives essential information, has no commas and can use that: “The park that opened in 2010 …”. A non-defining clause adds extra information, has commas and CANNOT use that: “Park A, which had 120,000 visitors in 2005, …”. Use who for people, which for things, whose for possession and where for places. “, which” can also refer to the whole previous clause: “The number rose sharply, which surprised the council.”"
        },
        {
          h: { vi: "5. Câu điều kiện loại 0–3", en: "5. Conditionals 0–3" },
          vi: "Loại 0 (sự thật chung): If + hiện tại, hiện tại. Loại 1 (có thể xảy ra): If + hiện tại, will + V. Loại 2 (không có thật ở hiện tại): If + quá khứ đơn (be → were), would + V. Loại 3 (không có thật trong quá khứ): If + had + V3, would have + V3. Unless = if … not, đi với động từ khẳng định. Điều kiện hay dùng trong Task 2 và Speaking hơn Task 1; Task 1 chỉ dùng khi so sánh giả định rất hạn chế.",
          en: "Type 0 (general truth): If + present, present. Type 1 (possible): If + present, will + verb. Type 2 (unreal present): If + past simple (be → were), would + verb. Type 3 (unreal past): If + had + past participle, would have + past participle. Unless = if … not and takes an affirmative verb. Conditionals are more common in Task 2 and Speaking than in Task 1."
        },
        {
          h: { vi: "6. Đảo ngữ cơ bản (trợ động từ đứng trước chủ ngữ)", en: "6. Basic inversion (auxiliary before the subject)" },
          vi: "Khi đặt trạng ngữ phủ định/hạn chế ở đầu câu, trợ động từ đảo lên trước chủ ngữ: Never / Rarely / Seldom + trợ động từ + chủ ngữ + V (“Rarely do visitors stay long.”); Not only + trợ động từ + chủ ngữ … but also …; No sooner + had + chủ ngữ + V3 … than …; Hardly + had + chủ ngữ + V3 … when …. Chỉ dùng vài lần trong bài để tạo đa dạng cấu trúc; lạm dụng làm bài gượng.",
          en: "When a negative or limiting adverbial starts the sentence, the auxiliary moves before the subject: Never / Rarely / Seldom + auxiliary + subject + verb (“Rarely do visitors stay long.”); Not only + auxiliary + subject … but also …; No sooner + had + subject + past participle … than …; Hardly + had + subject + past participle … when …. Use it only a few times for variety; overuse sounds unnatural."
        }
      ],
      table: [
        {
          h: { vi: "Bảng 1 – Động từ và cụm xu hướng", en: "Table 1 – Trend verbs and phrases" },
          rows: [
            [{ vi: "Tăng", en: "Increase" }, { vi: "rise, increase, grow, climb, surge (mạnh)", en: "rise, increase, grow, climb, surge (sharp)" }],
            [{ vi: "Giảm", en: "Decrease" }, { vi: "fall, decline, decrease, drop, dip (nhẹ)", en: "fall, decline, decrease, drop, dip (slight)" }],
            [{ vi: "Ổn định", en: "Stable" }, "remain stable, stay constant, level off, plateau"],
            [{ vi: "Dao động", en: "Fluctuate" }, "fluctuate, vary within a range of … to …"],
            [{ vi: "Đỉnh / đáy", en: "Peak / low" }, "peak at …, reach a high of …, hit a low of …"]
          ]
        },
        {
          h: { vi: "Bảng 2 – Ba cấu trúc ngữ pháp trọng tâm", en: "Table 2 – Three key grammar structures" },
          rows: [
            [{ vi: "Mệnh đề quan hệ", en: "Relative clause" }, "who / which / whose / where / that (defining only)"],
            [{ vi: "Câu điều kiện", en: "Conditional" }, "0: If + present, present | 1: If + present, will | 2: If + past, would | 3: If + had V3, would have V3"],
            [{ vi: "Đảo ngữ", en: "Inversion" }, "Never / Rarely / Seldom + aux + S + V; Not only + aux + S …; No sooner + had + S + V3 … than …"]
          ]
        }
      ],
      vocab: [
        { w: "fluctuate", pos: "v", ipa: "/ˈflʌktʃueɪt/", vi: "dao động lên xuống", en: "to change often, rising and falling", ex: "Prices fluctuated between 90 and 96 over the period.", col: "fluctuate within / between" },
        { w: "plateau", pos: "v", ipa: "/ˈplætəʊ/", vi: "đi ngang, chững lại", en: "to stop rising or falling and stay at a level", ex: "The figure plateaued at 120 after 2015.", col: "plateau at + figure" },
        { w: "decline", pos: "v", ipa: "/dɪˈklaɪn/", vi: "giảm dần", en: "to become smaller or less", ex: "Visitor numbers declined steadily.", col: "decline steadily / sharply" },
        { w: "surge", pos: "v", ipa: "/sɜːdʒ/", vi: "tăng vọt", en: "to increase suddenly and strongly", ex: "Sales surged after the discount.", col: "surge to + figure" },
        { w: "steadily", pos: "adv", ipa: "/ˈstedɪli/", vi: "đều đặn, từ từ", en: "in a regular, continuous way", ex: "The number fell steadily over two decades.", col: "rise / fall steadily" },
        { w: "marginally", pos: "adv", ipa: "/ˈmɑːdʒɪnəli/", vi: "một chút, không đáng kể", en: "by a very small amount", ex: "Park C rose marginally in 2020.", col: "marginally higher / lower" },
        { w: "overtake", pos: "v", ipa: "/ˌəʊvəˈteɪk/", vi: "vượt qua", en: "to become greater than something else", ex: "Park A overtook Park B between 2015 and 2020.", col: "overtake X between … and …" },
        { w: "interval", pos: "n", ipa: "/ˈɪntəvl/", vi: "khoảng cách (thời gian)", en: "the time between two events or dates", ex: "The data are given at five-year intervals.", col: "at regular / five-year intervals" },
        { w: "proportion", pos: "n", ipa: "/prəˈpɔːʃn/", vi: "tỉ lệ, phần", en: "a part of a whole", ex: "A large proportion of adults exercised.", col: "a large / small proportion of" },
        { w: "figure", pos: "n", ipa: "/ˈfɪɡə/", vi: "con số", en: "a number, especially an official one", ex: "The figure for Park B was 220,000.", col: "the figure for / a figure of" },
        { w: "account for", pos: "phr v", ipa: "/əˈkaʊnt fɔː/", vi: "chiếm (tỉ lệ)", en: "to make up a part of a total", ex: "In the fictional town, cars accounted for half of all journeys.", col: "account for + percentage" },
        { w: "peak", pos: "v", ipa: "/piːk/", vi: "đạt đỉnh", en: "to reach the highest point", ex: "The figure peaked at 340,000.", col: "peak at + figure" },
        { w: "whereas", pos: "conj", ipa: "/weərˈæz/", vi: "trong khi đó (đối lập)", en: "used to show a contrast between two facts", ex: "Park A grew, whereas Park B declined.", col: "X rose, whereas Y fell" },
        { w: "respectively", pos: "adv", ipa: "/rɪˈspektɪvli/", vi: "lần lượt", en: "in the order mentioned", ex: "The figures were 46 and 38 per cent respectively.", col: "…, respectively" },
        { w: "significantly", pos: "adv", ipa: "/sɪɡˈnɪfɪkəntli/", vi: "đáng kể", en: "by a large or noticeable amount", ex: "Recycling rates rose significantly.", col: "significantly higher / lower" },
        { w: "roughly", pos: "adv", ipa: "/ˈrʌfli/", vi: "xấp xỉ", en: "approximately", ex: "Roughly a third of women exercised.", col: "roughly a third / half" },
        { w: "in contrast", pos: "phr", ipa: "/ɪn ˈkɒntrɑːst/", vi: "ngược lại", en: "used to introduce a different or opposite fact", ex: "In contrast, Park C stayed stable.", col: "In contrast, + clause" }
      ],
      examples: [
        {
          label: { vi: "Bài mẫu Task 1 – xu hướng (số liệu minh họa tự soạn)", en: "Model Task 1 – trends (illustrative self-written data)" },
          text: "Question: The table shows the annual number of visitors (thousands) to three parks, Park A, Park B and Park C, between 2005 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.\n(Data: illustrative, self-written, fictional)\nPark A: 120 (2005), 150 (2010), 210 (2015), 260 (2020), 340 (2025)\nPark B: 300, 280, 250, 240, 220\nPark C: 90, 95, 92, 96, 94\n\n" + MODEL_T1_PARKS,
          note: { vi: "Mô hình bài mẫu: 4 đoạn (mở bài, overview, chi tiết 1 về A và B, chi tiết 2 về C). Mọi con số khớp bảng. Khoảng 164 từ, đạt mức tối thiểu 150 từ. Overview không có số liệu.", en: "Model layout: 4 paragraphs (introduction, overview, detail 1 on A and B, detail 2 on C). Every figure matches the table. About 164 words, above the 150-word minimum. The overview has no figures." },
          speak: false
        },
        {
          label: { vi: "Overview tốt và overview yếu", en: "Good vs weak overview" },
          text: "Weak: Park A had 340,000 visitors in 2025 and Park B had 220,000.\nGood: Overall, Park A grew strongly, Park B declined steadily and Park C stayed almost unchanged.",
          note: { vi: "Câu yếu chỉ kê số liệu của hai công viên; câu tốt bao quát cả ba và nêu xu hướng chung, không kê số.", en: "The weak sentence only lists figures for two parks; the good one covers all three and states the general trend with no figures." },
          speak: true
        },
        {
          label: { vi: "Mệnh đề quan hệ", en: "Relative clauses" },
          text: "Defining: The park that opened in 2010 is now the most popular.\nNon-defining: Park A, which had 120,000 visitors in 2005, attracted 340,000 in 2025.\nWhose: The researchers whose report was published last year recommended new parks.\nWhole clause: The number of cyclists rose sharply, which surprised the council.",
          note: { vi: "Mệnh đề không xác định có dấu phẩy và dùng which (không dùng that).", en: "The non-defining clause uses commas and which (not that)." },
          speak: true
        },
        {
          label: { vi: "Câu điều kiện loại 0–3", en: "Conditionals 0–3" },
          text: "0: If you heat ice, it melts.\n1: If it rains tomorrow, the match will be cancelled.\n2: If bus fares fell, more people would take the bus.\n3: If the council had not closed the library, it would have helped many students last year.",
          note: { vi: "Loại 2 mô tả tình huống không có thật ở hiện tại; loại 3 mô tả điều không có thật trong quá khứ.", en: "Type 2 describes an unreal present situation; type 3 describes an unreal past." },
          speak: true
        },
        {
          label: { vi: "Đảo ngữ cơ bản", en: "Basic inversion" },
          text: "Rarely do visitors stay for more than an hour.\nNot only did the figures rise, but they also remained high.\nNo sooner had the figures peaked than they began to fall.\nHardly had the doors opened when the crowd rushed in.",
          note: { vi: "Trợ động từ (do, did, had) đứng trước chủ ngữ ngay sau trạng ngữ phủ định.", en: "The auxiliary (do, did, had) comes before the subject right after the negative adverbial." },
          speak: true
        }
      ],
      mistakes: [
        { vi: "Đưa số liệu vào overview hoặc không có overview — dễ mất điểm Task Achievement.", en: "Putting figures into the overview, or leaving out the overview — costly for Task Achievement." },
        { vi: "Bịa nguyên nhân hoặc dự đoán không có trong biểu đồ (vd “because a new road was built”).", en: "Inventing causes or predictions that are not in the chart (e.g. “because a new road was built”)." },
        { vi: "Dùng sai giới từ: “rose to 120 from 90” thay vì “rose from 90 to 120”; nhầm by (mức tăng) với to (mức đạt).", en: "Wrong prepositions: “rose to 120 from 90” instead of “rose from 90 to 120”; confusing by (amount of change) with to (level reached)." },
        { vi: "Dùng that sau dấu phẩy trong mệnh đề không xác định: “Park A, that opened…” là sai.", en: "Using that after a comma in a non-defining clause: “Park A, that opened…” is wrong." },
        { vi: "Giữ nguyên trật tự câu sau Rarely/Never: sai “Rarely visitors stay…”, đúng “Rarely do visitors stay…”.", en: "Keeping normal word order after Rarely/Never: wrong “Rarely visitors stay…”, correct “Rarely do visitors stay…”." }
      ],
      exercises: [
        {
          id: "w08-ex01", type: "mcq", tag: "relative",
          q: "The park ___ opened in 2010 is now the most popular.",
          opts: ["who", "which", "whom", "whose"],
          a: 1,
          why: { vi: "Danh từ chỉ vật (park) làm chủ ngữ của mệnh đề quan hệ → which (that cũng đúng nhưng không có trong lựa chọn). who/whom dùng cho người, whose chỉ sở hữu.", en: "A thing (park) is the subject of the relative clause → which (that would also work but is not among the options). who/whom are for people; whose shows possession." }
        },
        {
          id: "w08-ex02", type: "mcq", tag: "relative",
          q: "Park A, ___ attracted 340,000 visitors in 2025, overtook Park B.",
          opts: ["that", "which", "what", "who"],
          a: 1,
          why: { vi: "Mệnh đề không xác định (có dấu phẩy) về vật → which. Không dùng that sau dấu phẩy.", en: "A non-defining clause (with commas) about a thing → which. That cannot be used after a comma." }
        },
        {
          id: "w08-ex03", type: "gap", tag: "relative",
          q: "The researchers ___ report was published last year recommended new parks.",
          limit: { words: 1, number: false },
          accept: ["whose"],
          why: { vi: "Báo cáo thuộc về các nhà nghiên cứu → đại từ sở hữu whose.", en: "The report belongs to the researchers → the possessive relative pronoun whose." }
        },
        {
          id: "w08-ex04", type: "mcq", tag: "conditional",
          q: "If the council had not closed the library, it ___ many students last year.",
          opts: ["would help", "would have helped", "helps", "will help"],
          a: 1,
          why: { vi: "Điều kiện loại 3 (had not closed) + last year → would have + V3.", en: "Type 3 conditional (had not closed) + last year → would have + past participle." }
        },
        {
          id: "w08-ex05", type: "gap", tag: "conditional",
          q: "If bus fares ___ (fall), more people would take the bus.",
          limit: { words: 1, number: false },
          accept: ["fell"],
          why: { vi: "Điều kiện loại 2 (mệnh đề chính dùng would) → mệnh đề if dùng quá khứ đơn: fell.", en: "Type 2 conditional (would in the main clause) → the if-clause takes the past simple: fell." }
        },
        {
          id: "w08-ex06", type: "mcq", tag: "conditional",
          q: "If you heat ice, it ___.",
          opts: ["melts", "would melt", "will have melted", "melted"],
          a: 0,
          why: { vi: "Sự thật khoa học chung → điều kiện loại 0, cả hai vế ở hiện tại đơn: melts.", en: "A general scientific fact → type 0 conditional, both clauses in the present simple: melts." }
        },
        {
          id: "w08-ex07", type: "mcq", tag: "inversion",
          q: "___ had the figures peaked than they began to fall.",
          opts: ["No sooner", "As soon", "Not until", "Only when"],
          a: 0,
          why: { vi: "Cấu trúc No sooner + had + S + V3 … than …. “As soon” cần “as soon as” và không đảo ngữ; Not until và Only when không đi với “than” trong cấu trúc này.", en: "The pattern is No sooner + had + S + past participle … than …. “As soon” needs “as soon as” and no inversion; Not until and Only when do not pair with “than” here." }
        },
        {
          id: "w08-ex08", type: "mcq", tag: "inversion",
          q: "Which sentence is correct?",
          opts: [
            "Rarely the park attracted more than 100,000 visitors.",
            "Rarely did the park attract more than 100,000 visitors.",
            "Rarely the park did attract more than 100,000 visitors.",
            "Rarely attracted the park more than 100,000 visitors."
          ],
          a: 1,
          why: { vi: "Sau Rarely, trợ động từ đứng trước chủ ngữ và động từ chính về dạng nguyên mẫu: did the park attract.", en: "After Rarely the auxiliary goes before the subject and the main verb returns to the base form: did the park attract." }
        },
        {
          id: "w08-ex09", type: "text", tag: "inversion",
          q: { vi: "Viết lại bằng đảo ngữ, bắt đầu bằng Seldom: “Visitors seldom stay for more than an hour.”", en: "Rewrite with inversion, starting with Seldom: “Visitors seldom stay for more than an hour.”" },
          model: ["Seldom do visitors stay for more than an hour."],
          why: { vi: "Seldom + do + chủ ngữ + động từ nguyên mẫu. Nghĩa không đổi.", en: "Seldom + do + subject + base verb. The meaning stays the same." }
        },
        {
          id: "w08-ex10", type: "mcq", tag: "trend-preposition",
          data: T_PARKS, q: "(Park table, self-written data) The number of visitors to Park B fell ___ 80,000 between 2005 and 2025.",
          opts: ["by", "to", "at", "of"],
          a: 0,
          why: { vi: "Park B giảm từ 300 xuống 220 nghìn, tức giảm 80 nghìn. Giới từ by chỉ mức thay đổi; to chỉ mức đạt được (fell to 220,000).", en: "Park B dropped from 300 to 220 thousand, a fall of 80 thousand. The preposition by marks the amount of change; to marks the level reached (fell to 220,000)." }
        },
        {
          id: "w08-ex11", type: "write", tag: "overview",
          q: { vi: "Viết một câu overview cho bảng sau (số liệu minh họa tự soạn).", en: "Write one overview sentence for the table below (illustrative self-written data)." },
          data: T_LIB,
          model: "Overall, borrowing rose in Library X, fell in Library Y and remained unchanged in Library Z.",
          checklist: [
            { vi: "Không chứa số liệu cụ thể", en: "No specific figures" },
            { vi: "Nêu xu hướng chính của cả 3 thư viện", en: "States the main trend for all three libraries" },
            { vi: "Dùng thì quá khứ đơn", en: "Uses the past simple" }
          ],
          why: { vi: "Library X tăng (12 → 18), Y giảm (20 → 14), Z giữ nguyên (9 → 9). Overview chỉ tóm xu hướng, không kê số.", en: "Library X rose (12 → 18), Y fell (20 → 14), Z stayed the same (9 → 9). An overview summarises trends without listing figures." }
        },
        // --- Luyện thêm ngữ pháp câu phức (để đủ 30 câu ngữ pháp/tuần theo PLAN) ---
        {
          id: "w08-ex12", type: "mcq", tag: "relative",
          q: "The city ___ I was born has changed a lot.",
          opts: ["where", "which", "who", "whose"],
          a: 0,
          why: { vi: "Nơi chốn + mệnh đề đủ chủ ngữ và động từ (I was born) → where (= in which). “which” chỉ đúng khi có giới từ: the city in which I was born.", en: "A place followed by a complete clause (I was born) → where (= in which). “which” would need a preposition: the city in which I was born." }
        },
        {
          id: "w08-ex13", type: "gap", tag: "relative",
          q: "My sister, ___ lives in Da Nang, is a nurse.",
          limit: { words: 1, number: false },
          accept: ["who"],
          why: { vi: "Mệnh đề không xác định (có dấu phẩy) nói về người → who; không dùng that sau dấu phẩy.", en: "A non-defining clause (with commas) about a person → who; that cannot follow a comma." }
        },
        {
          id: "w08-ex14", type: "mcq", tag: "relative",
          q: "Which sentence is punctuated and formed correctly?",
          opts: [
            "The report, that was published in May, is useful.",
            "The report which was published in May, is useful.",
            "The report, which was published in May, is useful.",
            "The report, who was published in May, is useful."
          ],
          a: 2,
          why: { vi: "Mệnh đề không xác định cần dấu phẩy ở CẢ hai đầu và dùng which cho vật. A dùng that sau dấu phẩy; B thiếu dấu phẩy đầu; D dùng who cho vật.", en: "A non-defining clause needs commas at BOTH ends and which for things. A uses that after a comma; B is missing the first comma; D uses who for a thing." }
        },
        {
          id: "w08-ex15", type: "mcq", tag: "conditional",
          q: "If I ___ you, I would take the earlier train.",
          opts: ["were", "am", "will be", "had been"],
          a: 0,
          why: { vi: "Lời khuyên giả định ở hiện tại → điều kiện loại 2: If I were you, … would + V.", en: "Advice about an unreal present → type 2 conditional: If I were you, … would + verb." }
        },
        {
          id: "w08-ex16", type: "gap", tag: "conditional",
          q: "If the bus ___ (be) late again tomorrow, I will take a taxi.",
          limit: { words: 1, number: false },
          accept: ["is"],
          why: { vi: "Khả năng có thật trong tương lai, mệnh đề chính dùng will → loại 1: mệnh đề if dùng hiện tại đơn (is), không dùng will be.", en: "A real future possibility with will in the main clause → type 1: the if-clause takes the present simple (is), not will be." }
        },
        {
          id: "w08-ex17", type: "mcq", tag: "conditional",
          q: "If she had studied harder, she ___ the exam last June.",
          opts: ["would have passed", "would pass", "will pass", "passed"],
          a: 0,
          why: { vi: "Cả điều kiện lẫn kết quả đều ở quá khứ (last June) → loại 3: would have + V3.", en: "Both the condition and the result are in the past (last June) → type 3: would have + past participle." }
        },
        {
          id: "w08-ex18", type: "text", tag: "inversion",
          q: { vi: "Viết lại bằng đảo ngữ, bắt đầu bằng Not only: “The scheme reduced traffic, and it also improved air quality.”", en: "Rewrite with inversion, starting with Not only: “The scheme reduced traffic, and it also improved air quality.”" },
          model: ["Not only did the scheme reduce traffic, but it also improved air quality."],
          why: { vi: "Not only + did + chủ ngữ + động từ nguyên mẫu (reduce) …, but … also ….", en: "Not only + did + subject + base verb (reduce) …, but … also …." }
        },
        {
          id: "w08-ex19", type: "mcq", tag: "inversion",
          q: "Seldom ___ such a sharp fall in visitor numbers.",
          opts: ["have we seen", "we have seen", "we saw", "did we saw"],
          a: 0,
          why: { vi: "Seldom ở đầu câu → đảo trợ động từ lên trước chủ ngữ: have we seen. “did we saw” sai vì sau did phải là động từ nguyên mẫu.", en: "Seldom at the start → the auxiliary goes before the subject: have we seen. “did we saw” is wrong because did needs a base verb." }
        },
        // --- Bài T1 luyện tập số 1 (bài số 2 là essay ở phần kiểm tra cuối tuần) ---
        {
          id: "w08-ex20", type: "essay", task: "T1", minWords: 150, suggestMin: 20, tag: "task1", data: T_ENERGY,
          q: "The table shows the percentage of electricity generated from five sources in Norland in 2005, 2015 and 2025 (illustrative self-written data). Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
          model: MODEL_T1_ENERGY,
          checklist: [
            { vi: "Mở bài paraphrase tiêu đề, nêu đối tượng, đơn vị (%) và các năm", en: "Introduction paraphrases the title with subject, unit (%) and years" },
            { vi: "Overview nêu 2 xu hướng lớn (than giảm, gió/mặt trời tăng), không kê số", en: "Overview gives the two big trends (coal down, wind/solar up) with no figures" },
            { vi: "Nhóm số liệu: nguồn giảm một đoạn, nguồn tăng một đoạn", en: "Data grouped: falling sources in one paragraph, rising sources in the other" },
            { vi: "Mọi số liệu khớp bảng; không đoán nguyên nhân", en: "Every figure matches the table; no guessed causes" },
            { vi: "Từ 150 từ trở lên, viết trong khoảng 20 phút", en: "150 words or more, written in about 20 minutes" }
          ],
          criteria: ["TA", "CC", "LR", "GRA"],
          why: { vi: "Bài mẫu (khoảng 165 từ, số liệu minh họa tự soạn) khớp bảng: than 60 → 45 → 25; khí 25 → 30 → 30; gió 5 → 15 → 30; mặt trời 2 → 5 → 12; thủy điện 8 → 5 → 3. Lưu ý năm 2015 mặt trời và thủy điện bằng nhau (5%), nên không viết “vượt năm 2015”.", en: "The model (about 165 words, illustrative self-written data) matches the table: coal 60 → 45 → 25; gas 25 → 30 → 30; wind 5 → 15 → 30; solar 2 → 5 → 12; hydro 8 → 5 → 3. Note that solar and hydro were equal (5%) in 2015, so do not write that solar overtook hydro in 2015." }
        }
      ],
      summary: [
        { vi: "Task 1 = mở bài paraphrase + overview (không số liệu) + 2 đoạn chi tiết; 150+ từ; chỉ dùng số liệu có trong biểu đồ.", en: "Task 1 = paraphrased introduction + overview (no figures) + 2 detail paragraphs; 150+ words; use only figures in the chart." },
        { vi: "Xu hướng: rise from … to …, fall by …; so sánh: whereas, overtook, the highest.", en: "Trends: rise from … to …, fall by …; comparison: whereas, overtook, the highest." },
        { vi: "Mệnh đề quan hệ: không dùng that sau dấu phẩy. Điều kiện loại 2 dùng were/past simple + would; loại 3 dùng had V3 + would have V3.", en: "Relative clauses: no that after a comma. Type 2 uses were/past simple + would; type 3 uses had + V3 + would have + V3." },
        { vi: "Đảo ngữ: Never / Rarely / Seldom + trợ động từ + chủ ngữ + V.", en: "Inversion: Never / Rarely / Seldom + auxiliary + subject + verb." }
      ]
    },

    quiz: {
      title: { vi: "Kiểm tra tuần 8 – Writing Task 1 và ngữ pháp", en: "Week 8 test – Writing Task 1 and grammar" },
      passPct: null,
      timeLimitMin: null,
      sections: [
        {
          id: "w08-s1", skill: "grammar",
          title: { vi: "Phần 1 – Ngữ pháp câu phức", en: "Part 1 – Complex grammar" },
          instructions: { vi: "Chọn hoặc điền đáp án đúng duy nhất. Câu điền từ chỉ nhập từ được yêu cầu.", en: "Choose or fill in the one correct answer. For gap questions, type only the required word(s)." },
          questions: [
            {
              id: "w08-q01", type: "mcq", tag: "relative",
              q: "The students ___ completed the survey received a certificate.",
              opts: ["whose", "which", "who", "whom"],
              a: 2,
              why: { vi: "Người (students) làm chủ ngữ của mệnh đề quan hệ → who. which dùng cho vật; whose chỉ sở hữu; whom làm tân ngữ.", en: "People (students) as the subject of the clause → who. which is for things; whose shows possession; whom is an object." }
            },
            {
              id: "w08-q02", type: "mcq", tag: "relative",
              q: "Park C, ___ is the smallest of the three, attracted around 94,000 visitors in 2025.",
              opts: ["that", "who", "which", "whose"],
              a: 2,
              why: { vi: "Mệnh đề không xác định có dấu phẩy, nói về vật → which; that không dùng sau dấu phẩy.", en: "A non-defining clause with commas about a thing → which; that is not used after a comma." }
            },
            {
              id: "w08-q03", type: "gap", tag: "relative",
              q: "This is the town ___ I grew up.",
              limit: { words: 1, number: false },
              accept: ["where"],
              why: { vi: "Where thay cho “in which” khi nói về nơi chốn: the town where I grew up.", en: "Where replaces “in which” for places: the town where I grew up." }
            },
            {
              id: "w08-q04", type: "mcq", tag: "relative",
              q: "The number of cyclists rose sharply, ___ surprised the city council.",
              opts: ["that", "which", "what", "who"],
              a: 1,
              why: { vi: "“, which” nói về cả mệnh đề trước (việc số người đi xe đạp tăng mạnh). that và what không dùng ở vị trí này; who chỉ người.", en: "“, which” refers to the whole previous clause (the sharp rise in cyclists). That and what cannot be used here; who is for people." }
            },
            {
              id: "w08-q05", type: "mcq", tag: "conditional",
              q: "If it rains tomorrow, we ___ the match.",
              opts: ["will cancel", "would cancel", "would have cancelled", "cancelled"],
              a: 0,
              why: { vi: "Điều kiện loại 1 (có thể xảy ra trong tương lai): If + hiện tại đơn, will + V.", en: "Type 1 conditional (a real future possibility): If + present simple, will + verb." }
            },
            {
              id: "w08-q06", type: "mcq", tag: "conditional",
              q: "If I had more time, I ___ more practice tests every week.",
              opts: ["would do", "will do", "would have done", "did"],
              a: 0,
              why: { vi: "Tình huống không có thật ở hiện tại (had more time) → loại 2: would + V.", en: "An unreal present situation (had more time) → type 2: would + verb." }
            },
            {
              id: "w08-q07", type: "gap", tag: "conditional",
              q: "If the company ___ prices last year, sales would have fallen. (not / reduce)",
              limit: { words: 3, number: false },
              accept: ["had not reduced", "hadn't reduced"],
              why: { vi: "Mệnh đề chính dùng would have fallen (loại 3) → mệnh đề if dùng had not + V3: had not reduced.", en: "The main clause uses would have fallen (type 3) → the if-clause takes had not + past participle: had not reduced." }
            },
            {
              id: "w08-q08", type: "mcq", tag: "conditional",
              q: "Unless you ___ harder, you will not reach band 7.",
              opts: ["study", "will study", "studied", "don’t study"],
              a: 0,
              why: { vi: "Unless = if … not và đi với động từ khẳng định ở hiện tại đơn: Unless you study. “Don’t study” sẽ thành phủ định kép.", en: "Unless = if … not and takes an affirmative present simple: Unless you study. “Don’t study” would make a double negative." }
            },
            {
              id: "w08-q09", type: "mcq", tag: "inversion",
              q: "Not only ___ the figures rise, but they also remained high for a decade.",
              opts: ["did", "do", "have", "were"],
              a: 0,
              why: { vi: "Not only đứng đầu câu → đảo ngữ với trợ động từ; thì quá khứ (remained) → did the figures rise (động từ nguyên mẫu).", en: "Not only at the start triggers inversion; the past tense (remained) → did the figures rise (base verb)." }
            },
            {
              id: "w08-q10", type: "mcq", tag: "inversion",
              q: "Never before ___ so many people used the service.",
              opts: ["have", "has", "did", "are"],
              a: 0,
              why: { vi: "Never before + have + chủ ngữ (số nhiều) + V3: have so many people used. has không hợp với people; did phải đi với động từ nguyên mẫu.", en: "Never before + have + plural subject + past participle: have so many people used. has does not agree with people; did would need a base verb." }
            },
            {
              id: "w08-q11", type: "mcq", tag: "inversion",
              q: "Hardly had the doors opened ___ the crowd rushed in.",
              opts: ["when", "than", "that", "while"],
              a: 0,
              why: { vi: "Cấu trúc Hardly + had + S + V3 … when …. “than” đi với No sooner.", en: "The pattern is Hardly + had + S + past participle … when …. “than” goes with No sooner." }
            },
            {
              id: "w08-q12", type: "text", tag: "inversion",
              q: { vi: "Viết lại bằng đảo ngữ, bắt đầu bằng Never: “We had never seen such a large crowd.”", en: "Rewrite with inversion, starting with Never: “We had never seen such a large crowd.”" },
              model: ["Never had we seen such a large crowd."],
              why: { vi: "Never + had + chủ ngữ + V3. Đảo had lên trước we.", en: "Never + had + subject + past participle. Move had before we." }
            }
          ]
        },
        {
          id: "w08-s2", skill: "writing",
          title: { vi: "Phần 2 – Đọc hiểu bảng số liệu (Bảng 1: công viên, số liệu minh họa tự soạn)", en: "Part 2 – Reading the data (Table 1: parks, illustrative self-written data)" },
          instructions: { vi: "Dựa vào bảng số liệu hiển thị kèm mỗi câu. Với T/F/NG: NG nghĩa là bảng không cho biết điều đó.", en: "Use the table shown with each question. For T/F/NG: NG means the table does not tell you." },
          questions: [
            {
              id: "w08-q13", type: "mcq", tag: "overview", data: T_PARKS,
              q: "Which sentence is the best overview of the table?",
              opts: [
                "Park A had 340,000 visitors in 2025 and Park B had 220,000.",
                "Overall, Park A grew strongly, Park B declined steadily and Park C stayed almost unchanged.",
                "Park A is the best park because it has the best facilities.",
                "Park C was the most popular park throughout the period."
              ],
              a: 1,
              why: { vi: "B tóm xu hướng của cả ba công viên, không kê số. A chỉ có số liệu chi tiết và thiếu Park C; C bịa lý do (facilities); D sai (Park C luôn thấp nhất).", en: "B summarises the trend for all three parks with no figures. A lists details and omits Park C; C invents a reason (facilities); D is false (Park C was always the lowest)." }
            },
            {
              id: "w08-q14", type: "tfng", variant: "tfng", tag: "data-check", data: T_PARKS,
              q: "Park A overtook Park B between 2015 and 2020.",
              a: "T",
              why: { vi: "2015: A 210 < B 250; 2020: A 260 > B 240. Park A vượt Park B trong khoảng này.", en: "2015: A 210 < B 250; 2020: A 260 > B 240. Park A overtook Park B in this interval." }
            },
            {
              id: "w08-q15", type: "tfng", variant: "tfng", tag: "data-check", data: T_PARKS,
              q: "Park C never had more than 100,000 visitors in any of the years shown.",
              a: "T",
              why: { vi: "Các giá trị của Park C: 90, 95, 92, 96, 94 (nghìn), đều dưới 100.", en: "Park C’s values are 90, 95, 92, 96 and 94 (thousands), all below 100." }
            },
            {
              id: "w08-q16", type: "tfng", variant: "tfng", tag: "NG-trap", data: T_PARKS,
              q: "Park B lost visitors because a new road was built nearby.",
              a: "NG",
              why: { vi: "Bảng không nêu nguyên nhân nào. Task 1 không được tự suy diễn hay bịa lý do → NOT GIVEN.", en: "The table gives no cause. In Task 1 you must not guess or invent reasons → NOT GIVEN." }
            },
            {
              id: "w08-q17", type: "tfng", variant: "tfng", tag: "data-check", data: T_PARKS,
              q: "Park A received more visitors than Park B in 2015.",
              a: "F",
              why: { vi: "Năm 2015 Park A có 210 nghìn, Park B có 250 nghìn → Park A ít hơn.", en: "In 2015 Park A had 210 thousand and Park B 250 thousand, so Park A had fewer." }
            },
            {
              id: "w08-q18", type: "mcq", tag: "tense", data: T_PARKS,
              q: "In 2005, Park B ___ the most visited park of the three.",
              opts: ["was", "is", "has been", "will be"],
              a: 0,
              why: { vi: "Mốc thời gian cụ thể trong quá khứ (2005) → quá khứ đơn: was. Park B có 300 nghìn, cao nhất năm 2005.", en: "A specific past date (2005) → past simple: was. Park B had 300 thousand, the highest in 2005." }
            }
          ]
        },
        {
          id: "w08-s3", skill: "writing",
          title: { vi: "Phần 3 – Viết overview", en: "Part 3 – Write an overview" },
          instructions: { vi: "Viết 1–2 câu overview (không dùng số liệu cụ thể) rồi so với mẫu và checklist.", en: "Write 1–2 overview sentences (no specific figures), then compare with the model and checklist." },
          questions: [
            {
              id: "w08-q19", type: "write", tag: "overview", data: T_RECYCLE,
              q: { vi: "Viết overview cho bảng: tỉ lệ tái chế của hộ gia đình ở ba thị trấn (số liệu minh họa tự soạn).", en: "Write an overview for the table: household recycling rates in three towns (illustrative self-written data)." },
              model: "Overall, the recycling rate rose sharply in Town P, increased slightly in Town Q and fell in Town R, so that Town P ended with the highest rate although it started with the lowest.",
              checklist: [
                { vi: "Không chứa số liệu cụ thể", en: "No specific figures" },
                { vi: "Nêu xu hướng của cả 3 thị trấn", en: "States the trend of all three towns" },
                { vi: "Nhận ra thay đổi thứ hạng (Town P từ thấp nhất lên cao nhất)", en: "Notes the change in ranking (Town P from lowest to highest)" },
                { vi: "Dùng thì quá khứ đơn", en: "Uses the past simple" }
              ],
              why: { vi: "Town P: 25 → 60 (tăng mạnh, từ thấp nhất lên cao nhất); Town Q: 40 → 45 (tăng nhẹ); Town R: 55 → 38 (giảm).", en: "Town P: 25 → 60 (sharp rise, lowest to highest); Town Q: 40 → 45 (slight rise); Town R: 55 → 38 (fall)." }
            }
          ]
        },
        {
          id: "w08-s4", skill: "writing",
          title: { vi: "Phần 4 – Bài Task 1 hoàn chỉnh (gợi ý 20 phút)", en: "Part 4 – Full Task 1 report (suggested 20 minutes)" },
          instructions: { vi: "Viết bài Task 1 tối thiểu 150 từ cho bảng sau (số liệu minh họa tự soạn). Sau đó đối chiếu checklist và tự chấm TA / CC / LR / GRA (band 5–9). Bài mẫu chỉ để tham khảo.", en: "Write a Task 1 report of at least 150 words for the table below (illustrative self-written data). Then check the checklist and self-assess on TA / CC / LR / GRA (band 5–9). The model is for reference only." },
          questions: [
            {
              id: "w08-q20", type: "essay", task: "T1", minWords: 150, suggestMin: 20, data: T_EXERCISE,
              q: "The table shows the percentage of adults who exercised at least three times a week in 2025, by age group and sex (illustrative self-written data). Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
              model: MODEL_T1_EXERCISE,
              checklist: [
                { vi: "Mở bài paraphrase tiêu đề, nêu đủ đối tượng, đơn vị, thời gian", en: "Introduction paraphrases the title with subject, unit and time" },
                { vi: "Có overview rõ ràng, không kê số liệu", en: "A clear overview with no figures" },
                { vi: "Hai đoạn chi tiết nhóm số liệu theo logic và so sánh nam – nữ", en: "Two detail paragraphs grouped logically, comparing men and women" },
                { vi: "Mọi số liệu khớp bảng, không thêm số hoặc nguyên nhân bịa", en: "All figures match the table; no invented figures or causes" },
                { vi: "Dùng ít nhất 2 từ so sánh (whereas, compared with, higher than)", en: "Uses at least 2 comparison words (whereas, compared with, higher than)" },
                { vi: "Dùng ít nhất 1 mệnh đề quan hệ đúng ngữ pháp", en: "Uses at least 1 grammatically correct relative clause" },
                { vi: "Từ 150 từ trở lên", en: "150 words or more" }
              ],
              criteria: ["TA", "CC", "LR", "GRA"],
              why: { vi: "Bài mẫu (khoảng 200 từ) khớp bảng: 18–29 nam 46%, nữ 38%; 30–44 nam 37%, nữ 33%; 45–59 nam 27%, nữ 29%; từ 60 nam 30%, nữ 32%. Overview nêu xu hướng chung và sự đảo chiều khác biệt nam – nữ.", en: "The model (about 200 words) matches the table: 18–29 men 46%, women 38%; 30–44 men 37%, women 33%; 45–59 men 27%, women 29%; 60+ men 30%, women 32%. The overview gives the general trend and the reversal of the gender gap." }
            }
          ]
        }
      ]
    },

    passages: [],
    scripts: [],
    mock: null
  };
})();
