// Nội dung do english-coach-agent soạn (bài luyện tự soạn, không phải đề thi thật).
window.PLAN = {
  note: "“TOEIC 7.5” không phải thang điểm có thật (TOEIC tối đa 990). Lộ trình hiểu là IELTS Overall 7.5, tương đương khoảng TOEIC Listening + Reading 900+. Giả định: trình độ B2, ~10 giờ/tuần, 12 tuần. Đây là ước lượng từ bài luyện tự soạn, không thay cho đề thi thật và không đảm bảo kết quả.",
  hours: [["Bài học chính", 3], ["Bài tập + chữa lỗi", 2], ["Listening/Reading thực hành", 2.5], ["Speaking (ghi âm + tự nghe)", 1.5], ["Ôn từ vựng/lỗi hay sai (1-3-7-14 ngày)", 1]],
  weeks: [
    { w: 1, phase: "Nền tảng", focus: "Đánh giá đầu vào, nền tảng ngữ pháp, làm quen format", learn: "Test đầu vào ~20 câu; ôn thì, mạo từ, hòa hợp chủ vị; tìm hiểu format 4 kỹ năng và band descriptors.", tasks: "30 câu ngữ pháp hỗn hợp; viết 1 đoạn 100 từ tự giới thiệu.", check: "Ghi điểm; lập danh sách 10 lỗi đầu tiên." },
    { w: 2, phase: "Nền tảng", focus: "Writing T2: đoạn thân bài (TEEL) – Education/Technology", learn: "Bài 01 trong app; 12 từ Education/Technology.", tasks: "14 câu bài 01; viết 2 đoạn thân bài (110–140 từ).", check: "Đoạn viết có topic sentence, explanation, example, không lặp ý.", lesson: true },
    { w: 3, phase: "Nền tảng", focus: "Reading: skimming/scanning, True/False/Not Given", learn: "Skimming, scanning, nhận biết paraphrase; T/F/NG.", tasks: "2 passage × 13 câu, phân tích từng câu sai.", check: "Đúng ≥ 65%; ghi nguyên nhân sai (từ vựng / bẫy NG / hết giờ)." },
    { w: 4, phase: "Nền tảng", focus: "Listening Section 1–2; Speaking Part 1", learn: "Chính tả số/tên; đoán từ loại trước khi nghe; Speaking P1 trả lời 2–3 câu có lý do.", tasks: "2 bài Listening; ghi âm 10 câu P1.", check: "Nghe lại bản ghi, đánh dấu ngập ngừng; Listening ≥ 60%." },
    { w: 5, phase: "Phát triển", focus: "Writing T2 hoàn chỉnh: mở bài, kết bài, 4 dạng đề", learn: "Mở bài (paraphrase + thesis), kết bài; opinion, discussion, problem–solution, two-part.", tasks: "1 bài hoàn chỉnh 250+ từ (40 phút), tự chấm 4 tiêu chí.", check: "Đối chiếu band descriptors; viết lại 1 đoạn đạt 7.5." },
    { w: 6, phase: "Phát triển", focus: "Reading nâng cao; từ vựng Environment/Health", learn: "Matching Headings, Summary Completion; 25 từ Environment/Health.", tasks: "2 passage, 20 phút/passage.", check: "Đúng ≥ 70%; ôn từ tuần 2 theo giãn cách." },
    { w: 7, phase: "Phát triển", focus: "Listening Section 3–4; Speaking Part 2", learn: "Nghe thảo luận học thuật, bài giảng; cấu trúc cue card (mở, 3 ý, kết).", tasks: "2 bài Listening; ghi âm 5 cue card × 2 phút.", check: "Tự chấm Fluency & Pronunciation, Lexical Resource; Listening ≥ 70%." },
    { w: 8, phase: "Phát triển", focus: "Writing Task 1 + ngữ pháp câu phức", learn: "Overview, so sánh, xu hướng; mệnh đề quan hệ, câu điều kiện, đảo ngữ cơ bản.", tasks: "2 bài T1 (150+ từ, 20 phút); 30 câu ngữ pháp.", check: "Có overview rõ, không bịa số liệu; lỗi ngữ pháp giảm so với tuần 1." },
    { w: 9, phase: "Nâng band", focus: "Speaking Part 3; phát âm, nối âm", learn: "Khung quan điểm – lý do – ví dụ – so sánh; trọng âm, ngữ điệu, nối âm.", tasks: "Ghi âm 15 câu Part 3; shadowing 15 phút/ngày.", check: "Mỗi câu 25–40 giây, không dừng quá 2 giây." },
    { w: 10, phase: "Nâng band", focus: "Mock Writing + Reading (bấm giờ)", learn: "Chữa lỗi sâu, quản lý thời gian.", tasks: "1 mock Writing (T1 + T2, 60 phút); 1 mock Reading (60 phút).", check: "Ghi band ước lượng từng tiêu chí; chọn 3 mục tiêu cải thiện." },
    { w: 11, phase: "Nâng band", focus: "Mock Listening + Speaking, bù điểm yếu", learn: "Bù điểm yếu theo nhật ký lỗi.", tasks: "1 mock Listening; 1 mock Speaking đủ 3 phần (11–14 phút).", check: "So sánh với tuần 4/7; cập nhật nhật ký điểm." },
    { w: 12, phase: "Nước rút", focus: "Mock full + tổng ôn + chiến lược ngày thi", learn: "Chiến lược ngày thi, rà soát danh sách lỗi.", tasks: "1 mock đủ 4 kỹ năng (chia 2 ngày); ôn toàn bộ từ vựng.", check: "Band ước lượng cuối; kỹ năng dưới 7.0 thì bổ sung 2–4 tuần." }
  ]
};

window.LESSON = {
  title: "Bài 01 – Writing Task 2: Đoạn thân bài lập luận (Education/Technology)",
  goal: ["Viết được 1 đoạn thân bài 110–140 từ có đủ topic sentence – explanation – example – link, không lặp ý.", "Dùng đúng ít nhất 6 trong 12 từ/cụm học thuật bên dưới, đúng collocation."],
  vocab: [
    ["curriculum (n)", "/kəˈrɪkjələm/", "chương trình giảng dạy", "The curriculum should include practical skills.", "revise / overhaul the curriculum"],
    ["personalised learning", "/ˈpɜːsənəlaɪzd ˈlɜːnɪŋ/", "học tập cá nhân hoá", "Personalised learning helps students progress at their own pace.", "tailor learning to individual needs"],
    ["rote learning", "/rəʊt ˈlɜːnɪŋ/", "học vẹt", "Rote learning rarely develops deep understanding.", "rely on rote learning"],
    ["foster (v)", "/ˈfɒstə/", "nuôi dưỡng, thúc đẩy", "Group projects foster teamwork.", "foster critical thinking / creativity"],
    ["widen access to", "/ˈwaɪdn ˈækses tuː/", "mở rộng cơ hội tiếp cận", "Online courses widen access to higher education.", "widen access to education / resources"],
    ["bridge the digital divide", "/brɪdʒ ðə ˈdɪdʒɪtl dɪˈvaɪd/", "thu hẹp khoảng cách số", "Free devices could help bridge the digital divide.", "the digital divide between urban and rural areas"],
    ["digital literacy", "/ˈdɪdʒɪtl ˈlɪtərəsi/", "năng lực số", "Digital literacy is now a basic workplace skill.", "improve / teach digital literacy"],
    ["distraction (n)", "/dɪˈstrækʃn/", "sự xao nhãng", "Notifications are a major distraction.", "a constant distraction; easily distracted"],
    ["academic attainment", "/ˌækəˈdemɪk əˈteɪnmənt/", "thành tích học tập", "Attendance is linked to academic attainment.", "raise / improve academic attainment"],
    ["automate (v)", "/ˈɔːtəmeɪt/", "tự động hoá", "Software can automate routine marking.", "automate repetitive tasks"],
    ["compulsory (adj)", "/kəmˈpʌlsəri/", "bắt buộc", "Computer science should be compulsory at secondary level.", "compulsory subject / education"],
    ["reliance on", "/rɪˈlaɪəns ɒn/", "sự phụ thuộc vào", "Heavy reliance on calculators may weaken mental arithmetic.", "growing / excessive reliance on technology"]
  ],
  teel: [
    ["T – Topic sentence", "Câu đầu nêu một ý chính duy nhất, có quan điểm rõ, trả lời đề."],
    ["E – Explanation", "Giải thích vì sao/như thế nào (cơ chế nhân quả), 1–2 câu."],
    ["E – Example", "Ví dụ cụ thể (có thể giả định): For instance / Consider a student who... Không bịa số liệu hay trích dẫn."],
    ["L – Link", "Câu kết gắn về đề: Consequently, ... / This is why ..."]
  ],
  mistakes: [
    "Topic sentence quá chung (“Technology is good”) hoặc chứa 2–3 ý cùng lúc.",
    "Lặp ý: explanation chỉ nhắc lại topic sentence bằng từ khác.",
    "Ví dụ mơ hồ (“many people use phone”) thay vì tình huống cụ thể.",
    "Thiếu mạo từ/sai số: a computer, students use computers; technology không đếm được nên không có -s.",
    "Sai hòa hợp: technology help → technology helps.",
    "Dùng Firstly, Secondly cho mọi câu trong đoạn, nghe máy móc.",
    "Dịch từng chữ: increase critical thinking → foster critical thinking; do progress → make progress."
  ],
  prompt: "Some people believe that technology has greatly improved education. To what extent do you agree or disagree?",
  low: { text: "Technology is very good for education. Many students use computer to study. For example, my friend use app to learn English and he is better. So technology is very useful and students should use it more because it help them.", note: "Ý chung chung, không có cơ chế giải thích (TR); từ vựng đơn giản, lặp good/useful (LR); sai mạo từ, hòa hợp chủ vị, ví dụ mơ hồ (GRA); liên kết bằng So đơn điệu (CC)." },
  high: { text: "First and foremost, digital tools enable learning to be tailored to individual needs, which a traditional classroom rarely achieves. In a class of thirty, a teacher cannot realistically adjust the pace for every child, so weaker students may fall behind while stronger ones become bored. Adaptive learning software, by contrast, can analyse a learner's mistakes and offer easier or more challenging exercises accordingly. For instance, a student who struggles with fractions could receive extra practice on that topic at home, while a classmate who has mastered it moves on to algebra. Consequently, each learner is more likely to progress steadily and stay motivated.", note: "Topic sentence một ý rõ; explanation có đối lập, ví dụ tình huống cụ thể, link bằng Consequently; từ vựng tự nhiên (tailored to, adjust the pace, adaptive); cấu trúc đa dạng. Số “thirty” là giả định minh hoạ, không phải số liệu thật." },
  summary: [
    "Một đoạn thân bài = một ý chính: Topic, Explanation, Example, Link.",
    "Explanation phải trả lời “vì sao”, không nhắc lại topic sentence.",
    "Ví dụ cụ thể (có thể giả định) hơn là chung chung; không bịa số liệu.",
    "Dùng collocation học thuật: foster critical thinking, widen access to, bridge the digital divide.",
    "Soát lỗi quen thuộc: mạo từ, -s ngôi thứ ba, hòa hợp chủ vị, dịch từng chữ."
  ]
};

window.QUIZ = [
  { id: 1, type: "mcq", q: "The school decided to overhaul its ___ to include coding.", opts: ["curriculum", "literacy", "attainment"], a: 0, why: "curriculum = chương trình giảng dạy; literacy, attainment không hợp “overhaul its ___”." },
  { id: 2, type: "mcq", q: "Many students rely on ___, memorising facts without really understanding them.", opts: ["rote learning", "digital divide", "distraction"], a: 0, why: "“memorising facts without understanding” chính là học vẹt." },
  { id: 3, type: "mcq", q: "Online courses can ___ to higher education for people in remote areas.", opts: ["foster access", "widen access", "automate access"], a: 1, why: "Collocation: widen access to." },
  { id: 4, type: "mcq", q: "Constant notifications are a major ___ during study.", opts: ["compulsory", "distraction", "curriculum"], a: 1, why: "a major distraction. Compulsory là tính từ, curriculum không hợp nghĩa." },
  { id: 5, type: "mcq", q: "Free tablets for rural pupils may help ___.", opts: ["bridge the digital divide", "make the digital divide bigger", "rote the divide"], a: 0, why: "(b) ngược nghĩa, (c) vô nghĩa." },
  { id: 6, type: "mcq", q: "Teachers should ___ critical thinking through open-ended questions.", opts: ["do", "foster", "increase up"], a: 1, why: "foster critical thinking; “do critical thinking” và “increase up” sai." },
  { id: 7, type: "text", q: "Sửa lỗi: Technology help students to learn faster.", model: "Technology helps students (to) learn faster.", why: "Technology là danh từ không đếm được, ngôi thứ ba số ít nên thêm -s." },
  { id: 8, type: "text", q: "Sửa lỗi: Schools should make progress students' digital literacy.", model: "Schools should improve / raise students' digital literacy. (hoặc teach digital literacy)", why: "“Make progress” không đi với tân ngữ như vậy; make progress in mới đúng." },
  { id: 9, type: "text", q: "Sửa lỗi: Many students have heavy reliance of smartphones.", model: "Many students have a heavy reliance on smartphones. (hoặc rely heavily on smartphones)", why: "Giới từ đi với reliance là on, và cần mạo từ a." },
  { id: 10, type: "order", q: "Xác định vai trò của từng câu trong đoạn văn:", items: ["Consequently, learners are likelier to stay motivated.", "Adaptive software can analyse errors and offer suitable exercises.", "Digital tools allow lessons to be tailored to each student.", "For instance, a pupil weak at fractions can practise them at home."], roles: ["Link", "Explanation", "Topic", "Example"], why: "Thứ tự đúng: Topic (c) → Explanation (b) → Example (d) → Link (a)." },
  { id: 11, type: "mcq", q: "Topic sentence nào tốt hơn?", opts: ["Technology is good and bad and has many things.", "Online platforms widen access to education for people who cannot attend school in person."], a: 1, why: "(b) có một ý, cụ thể, có người hưởng lợi rõ ràng. (a) mơ hồ, mâu thuẫn, không trả lời đề." },
  { id: 12, type: "write", q: "Câu explanation bị lặp ý. Viết lại cho có cơ chế nhân quả: “Online learning is useful because it is helpful for students.”", model: "Online learning is useful because students can revisit recorded lessons as often as they need, which allows them to master difficult topics at their own pace.", why: "Có cơ chế: xem lại bài → hiểu sâu → tự điều chỉnh tốc độ." },
  { id: 13, type: "write", q: "Ví dụ quá mơ hồ. Viết lại thành ví dụ cụ thể (giả định, không số liệu): “For example, many students use phones.” (ý: phụ thuộc vào công cụ làm yếu kỹ năng).", model: "Consider a student who always uses a calculator for simple sums; over time, he may lose confidence in his mental arithmetic and struggle in exams where devices are banned.", why: "Tình huống cụ thể, có hệ quả rõ." },
  { id: 14, type: "essay", q: "Viết 1 đoạn thân bài 110–140 từ cho đề: “Some people think schools should rely less on technology. To what extent do you agree?”", model: "To a considerable extent, I agree that schools should reduce their reliance on technology, particularly in the early years. Young children who spend most lessons on tablets may find it harder to concentrate on a single task, since notifications and games are a constant distraction. Moreover, heavy use of devices can replace activities that foster fine motor skills and face-to-face communication. For instance, a pupil who types every answer might never develop neat handwriting or the habit of discussing ideas aloud with classmates. This does not mean technology should be banned; rather, it should be introduced gradually so that it supports, rather than replaces, traditional teaching. Therefore, a balanced approach would protect core skills while still building digital literacy.", why: "Đoạn mẫu tham khảo; câu trả lời khác vẫn đúng nếu đạt checklist.", checklist: ["Topic sentence chỉ có 1 ý, trả lời đề", "Explanation có “vì sao” thật sự, không lặp topic sentence", "Ví dụ cụ thể, không số liệu bịa", "Có câu link", "Dùng ≥ 4 từ trong bảng, đúng collocation", "Kiểm tra: s/es, mạo từ, hòa hợp chủ vị"] }
];
