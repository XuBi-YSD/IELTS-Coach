// weeks/w09.js — Tuần 9: Speaking Part 3 + phát âm (trọng âm, nối âm, ngữ điệu).
// Nội dung TỰ SOẠN, không phải đề thi thật. Bài mẫu dùng nhân vật giả định, không nêu số liệu hay nghiên cứu thật.
// IPA theo giọng Anh-Anh; ˈ = trọng âm chính, ˌ = trọng âm phụ, ‿ = nối âm.
(function () {
  var SELF = { vi: "Tự soạn – không phải đề thi thật", en: "Self-written – not a real exam" };

  // Checklist tự đánh giá Speaking Part 3 (không chấm tự động)
  var P3_CHECK = [
    { vi: "FC – Trả lời 25–40 giây theo O-R-E-C; không dừng quá 2 giây; có từ nối (because, for instance, whereas, that said).", en: "FC – Answered for 25–40 seconds using O-R-E-C; no pause over 2 seconds; used linkers (because, for instance, whereas, that said)." },
    { vi: "LR – Dùng từ vựng trừu tượng/xã hội (society, the younger generation, in the long run) và cụm rào đón (to some extent, it depends on).", en: "LR – Used abstract or social vocabulary (society, the younger generation, in the long run) and hedging (to some extent, it depends on)." },
    { vi: "GRA – Có câu so sánh (more… than, not as… as), câu điều kiện hoặc dự đoán (will / might / would).", en: "GRA – Used comparatives (more… than, not as… as) and a conditional or prediction (will / might / would)." },
    { vi: "Pron – Đúng trọng âm từ nhiều âm tiết; nối âm phụ âm–nguyên âm; xuống giọng ở cuối ý chính.", en: "Pron – Correct stress on multi-syllable words; consonant–vowel linking; falling tone at the end of main points." }
  ];
  var P3_WHY = { vi: "Tự ghi âm (app không ghi âm), bấm giờ 25–40 giây, nghe lại và tick checklist. Sau đó bấm Nghe mẫu và shadowing (đọc đuổi) bản chậm rồi bản thường. Bài mẫu chỉ để tham khảo, không học thuộc.",
                 en: "Record yourself (the app does not record), aim for 25–40 seconds, listen back and tick the checklist. Then play the model and shadow the slow version, then the normal one. The model is for reference only – do not memorise it." };

  // Câu hỏi Part 3 có bài mẫu: 0–4 dùng trong quiz, 5–8 dùng trong bài tập
  var P3 = [
    { q: "Why do some people volunteer to help others, while some people don't?",
      hint: { vi: "O: nhiều lý do. R: thời gian/ý thức cộng đồng. E: ví dụ cụ thể. C: so sánh hai nhóm.", en: "O: several reasons. R: time / sense of community. E: a concrete example. C: compare the two groups." },
      model: "I think it mainly comes down to time and habit. People who volunteer often grew up in families where helping others was simply normal, so it feels natural to them. For instance, someone whose parents helped at a local temple or charity is likely to do the same. On the other hand, many people would like to help but are too busy with work and childcare, so it's not that they don't care, it's that they can't find the time." },
    { q: "Do you think people help their neighbours less than they did in the past?",
      hint: { vi: "Rào đón (to some extent) + so sánh trước–nay + ví dụ chung cư/nông thôn.", en: "Hedge (to some extent) + past vs present + example: apartments vs villages." },
      model: "To some extent, yes, especially in big cities. In the past, people tended to live in the same neighbourhood for decades, so they knew everyone and helped each other naturally. Nowadays, many people live in apartment blocks and move every few years, so they hardly know the people next door. That said, I wouldn't say people care less. In my experience, if there's a real emergency, like a flood, neighbours still come together very quickly." },
    { q: "Should schools teach practical skills, such as cooking and managing money?",
      hint: { vi: "Quan điểm rõ + lý do + ví dụ + nhượng bộ (but… curriculum is full).", en: "Clear view + reason + example + concession (but… the curriculum is full)." },
      model: "Yes, I strongly believe they should, at least at secondary level. The main reason is that these are skills everyone needs, yet many young people leave home without them. For example, a lot of students take out loans or use credit cards without really understanding interest. Of course, the curriculum is already very full, so schools would have to keep these lessons short and practical, but I think even one lesson a week could make a real difference in the long run." },
    { q: "How has technology changed the way families spend time together?",
      hint: { vi: "Hai mặt: kết nối từ xa (+) và mỗi người một màn hình (–).", en: "Two sides: staying connected at a distance (+) and everyone on their own screen (–)." },
      model: "I'd say it has had both positive and negative effects. On the positive side, families who live far apart can stay in touch far more easily. My cousins abroad video-call their grandparents every weekend, which would have been impossible a generation ago. However, when families are actually in the same room, technology can pull them apart. It's quite common to see a family at dinner where everyone is looking at their own phone instead of talking to each other." },
    { q: "Who should be responsible for protecting the environment: individuals or governments?",
      hint: { vi: "Tránh chọn một phía tuyệt đối: chính phủ đặt luật + cá nhân thay đổi thói quen.", en: "Avoid an absolute choice: governments set the rules + individuals change habits." },
      model: "In my view, it has to be both, but governments carry the greater responsibility. Individuals can certainly make a difference by recycling or using public transport, but their choices are limited by what's available. For instance, people can't take a bus that doesn't exist. Governments, on the other hand, can pass laws, invest in clean energy and make the greener option the cheaper one, which changes the behaviour of millions of people at the same time." },
    { q: "What makes a city a good place to live?",
      hint: { vi: "Chọn 2 yếu tố, giải thích một cái sâu, so sánh với thành phố khác.", en: "Pick two factors, explain one in depth, compare with another kind of city." },
      model: "I think the two most important things are good public transport and enough green space. Transport matters because it decides how much of your day you spend in traffic. If you can get to work quickly and cheaply, you simply have more time for your family. Green space is important for health, especially for children and older people. A city can be very rich and modern, but if it's full of traffic jams and has no parks, I don't think it's really a good place to live." },
    { q: "Is it better to learn a new skill from a teacher or from online videos?",
      hint: { vi: "It depends on the skill + ví dụ hai loại kỹ năng.", en: "It depends on the skill + an example of each type." },
      model: "I'd say it depends on the skill. For something simple, like a new recipe or a computer shortcut, online videos are perfect, because they're free and you can watch them as many times as you like. But for more complex skills, such as swimming or playing an instrument, a teacher is far more effective. A good teacher can see your mistakes immediately and correct them before they become habits, which a video obviously can't do." },
    { q: "Some people say young people change jobs more often than in the past. Why might that be?",
      hint: { vi: "Nêu 2 nguyên nhân khả dĩ (might), ví dụ, so sánh thế hệ cha mẹ.", en: "Two possible causes (might), an example, compare with the parents' generation." },
      model: "If that's true, I think there might be a couple of reasons. Firstly, young people today often care about learning and personal growth, not just job security, so if a job stops teaching them something, they look for another one. Secondly, it's much easier to find vacancies now, because everything is online. My parents' generation, by contrast, usually stayed with one employer for most of their careers, partly because changing jobs was seen as a sign of disloyalty." },
    { q: "Do you think people will read fewer printed books in the future?",
      hint: { vi: "Dự đoán (will probably / might) + lý do + ngoại lệ.", en: "Prediction (will probably / might) + reason + exception." },
      model: "I think they probably will, but printed books won't disappear completely. For everyday reading, like news or short articles, most people already use their phones, because it's more convenient. However, I believe there will always be a market for printed books, especially children's books and books people want to keep. Many people still enjoy the feeling of holding a real book, and reading on paper is a nice break from screens." }
  ];

  // Ngân hàng 6 câu Part 3 thêm (chỉ gợi ý, để đủ 15 câu ghi âm/tuần cùng 9 câu có mẫu)
  var BANK = [
    { q: "What are the advantages of living in a small town?", hint: { vi: "O: yên tĩnh, chi phí thấp. C: so với thành phố lớn.", en: "O: quiet, lower costs. C: compared with a big city." } },
    { q: "How important is it for people to have hobbies?", hint: { vi: "R: giảm căng thẳng. E: một sở thích cụ thể.", en: "R: reduces stress. E: a specific hobby." } },
    { q: "Should public transport be free?", hint: { vi: "Lợi ích (môi trường) vs chi phí (ai trả tiền).", en: "Benefits (environment) vs cost (who pays)." } },
    { q: "Do advertisements influence children too much?", hint: { vi: "Rào đón + ví dụ quảng cáo đồ ăn vặt + vai trò cha mẹ.", en: "Hedge + example of snack adverts + role of parents." } },
    { q: "What qualities make a good leader?", hint: { vi: "Chọn 2 phẩm chất, giải thích một cái bằng ví dụ.", en: "Pick two qualities, explain one with an example." } },
    { q: "Is tourism always good for local communities?", hint: { vi: "Không phải luôn luôn: việc làm (+) vs giá cả, rác thải (–).", en: "Not always: jobs (+) vs rising prices and litter (–)." } }
  ];

  function speakItem(id, p, i) {
    return { id: id, type: "speak", part: 3, prepSec: 0, talkSec: 40,
             q: p.q, hint: p.hint, model: p.model, modelRef: "w09-sm", modelLine: i * 2 + 1, // w09-sm xen kẽ E/C → câu trả lời ở dòng 2i+1
             checklist: P3_CHECK, criteria: ["FC", "LR", "GRA", "P"], why: P3_WHY };
  }
  function pad(n) { return n < 10 ? "0" + n : "" + n; }
  function modelLines() {
    return P3.reduce(function (acc, p) { acc.push({ sp: "E", text: p.q }); acc.push({ sp: "C", text: p.model }); return acc; }, []);
  }

  (window.WEEKS = window.WEEKS || {})[9] = {
    meta: { week: 9, skill: "speaking", source: "tự soạn", label: SELF, version: 1, reviewed: false },

    // ---------------- LESSON ----------------
    lesson: {
      title: { vi: "Bài tuần 9 – Speaking Part 3 và phát âm (trọng âm, nối âm, ngữ điệu)", en: "Week 9 lesson – Speaking Part 3 and pronunciation (stress, linking, intonation)" },
      goal: [
        { vi: "Trả lời câu hỏi Part 3 trong 25–40 giây theo khung O-R-E-C (quan điểm – lý do – ví dụ – so sánh), không dừng quá 2 giây.", en: "Answer Part 3 questions in 25–40 seconds using O-R-E-C (opinion – reason – example – comparison/contrast), with no pause over 2 seconds." },
        { vi: "Đặt đúng trọng âm cho từ nhiều âm tiết theo hậu tố (-tion, -ic, -ity, -graphy/-logy) và cặp danh từ/động từ (REcord / reCORD).", en: "Stress multi-syllable words correctly using suffix patterns (-tion, -ic, -ity, -graphy/-logy) and noun/verb pairs (REcord / reCORD)." },
        { vi: "Nối âm phụ âm–nguyên âm, chèn /w/ /j/ /r/; dùng dạng yếu (to /tə/, can /kən/); xuống giọng cuối câu trần thuật.", en: "Link consonant to vowel, add /w/ /j/ /r/ between vowels; use weak forms (to /tə/, can /kən/); fall at the end of statements." },
        { vi: "Ghi âm 15 câu Part 3 trong tuần và shadowing 15 phút/ngày với bài mẫu.", en: "Record 15 Part 3 answers this week and shadow the models for 15 minutes a day." }
      ],
      explain: [
        { h: { vi: "Part 3 khác Part 1 thế nào?", en: "How is Part 3 different from Part 1?" },
          vi: "Part 3 kéo dài khoảng 4–5 phút, câu hỏi liên quan chủ đề Part 2 nhưng ở mức xã hội, trừu tượng: so sánh quá khứ – hiện tại, nguyên nhân, dự đoán, đánh giá chính sách. Giám khảo muốn nghe bạn lập luận, nên mỗi câu cần dài hơn Part 1 (khoảng 25–40 giây) và nói về “people / society / the younger generation”, không chỉ về bản thân.",
          en: "Part 3 lasts about 4–5 minutes. The questions link to the Part 2 topic but at a social, abstract level: past vs present, causes, predictions, evaluating policies. The examiner wants to hear you reason, so each answer should be longer than in Part 1 (about 25–40 seconds) and talk about “people / society / the younger generation”, not only yourself." },
        { h: { vi: "Khung O-R-E-C", en: "The O-R-E-C frame" },
          vi: "Opinion – nêu quan điểm, có thể rào đón (I'd say…, To some extent…, It depends on…). Reason – giải thích vì sao (The main reason is that…). Example – ví dụ cụ thể, có thể giả định (For instance…, Take… for example). Contrast/Comparison – mặt khác hoặc so sánh (On the other hand…, whereas…, compared with the past…). Không cần đủ 4 phần cho mọi câu, nhưng ít nhất phải có O + R + một trong E/C.",
          en: "Opinion – state your view, possibly hedged (I'd say…, To some extent…, It depends on…). Reason – explain why (The main reason is that…). Example – a concrete example, which may be hypothetical (For instance…, Take… for example). Contrast/Comparison – the other side or a comparison (On the other hand…, whereas…, compared with the past…). Not every answer needs all four, but aim for at least O + R + either E or C." },
        { h: { vi: "Trọng âm từ (word stress)", en: "Word stress" },
          vi: "Tiếng Anh nhấn mạnh một âm tiết trong từ: âm đó to hơn, dài hơn, cao hơn; các âm không nhấn thường đọc nhẹ thành /ə/. Nhấn sai làm người nghe khó nhận ra từ (vd phoTOgraphy chứ không phải PHOtography). Quy tắc hữu ích: -tion/-sion và -ic/-ical nhấn ngay trước hậu tố; -ity nhấn ngay trước hậu tố; -graphy/-logy nhấn âm ngay trước. Cặp hai âm tiết: danh từ nhấn âm 1, động từ nhấn âm 2 (REcord – reCORD, INcrease – inCREASE). Quy tắc có ngoại lệ – kiểm tra từ điển khi nghi ngờ.",
          en: "English stresses one syllable in a word: it is louder, longer and higher, and unstressed syllables often reduce to /ə/. Wrong stress makes words hard to recognise (phoTOgraphy, not PHOtography). Useful patterns: -tion/-sion and -ic/-ical stress the syllable just before the suffix; -ity stresses the syllable just before it; -graphy/-logy stress the syllable just before. Two-syllable pairs: nouns stress the first syllable, verbs the second (REcord – reCORD, INcrease – inCREASE). There are exceptions – check a dictionary when unsure." },
        { h: { vi: "Trọng âm câu và dạng yếu", en: "Sentence stress and weak forms" },
          vi: "Trong câu, từ mang nội dung (danh từ, động từ chính, tính từ, trạng từ, từ phủ định) được nhấn; từ chức năng (to, for, of, and, can, a, the) đọc nhẹ: to /tə/, for /fə/, of /əv/, and /ən/, can /kən/. Người Việt hay đọc mọi từ to như nhau, nghe “từng chữ một” – đây là điểm làm giảm điểm Pronunciation và Fluency.",
          en: "In a sentence, content words (nouns, main verbs, adjectives, adverbs, negatives) are stressed; function words (to, for, of, and, can, a, the) are weak: to /tə/, for /fə/, of /əv/, and /ən/, can /kən/. Vietnamese learners often give every word equal weight, which sounds word-by-word and lowers Pronunciation and Fluency." },
        { h: { vi: "Nối âm (linking)", en: "Linking" },
          vi: "(1) Phụ âm cuối + nguyên âm đầu: turn‿it‿off /tɜːn‿ɪt‿ɒf/. (2) Nguyên âm + nguyên âm: chèn /w/ sau âm tròn môi (go‿out /ɡəʊ‿w‿aʊt/), chèn /j/ sau /iː, aɪ, eɪ, ɔɪ/ (I‿agree /aɪ‿j‿əˈɡriː/). (3) Anh-Anh: chữ r cuối được đọc khi từ sau bắt đầu bằng nguyên âm (far‿away /fɑːr‿əˈweɪ/). (4) Nói nhanh thường lược /t/ /d/ giữa hai phụ âm: next day /neks deɪ/. Người Việt hay bỏ âm cuối – nối âm giúp giữ âm cuối mà vẫn trôi chảy.",
          en: "(1) Final consonant + initial vowel: turn‿it‿off /tɜːn‿ɪt‿ɒf/. (2) Vowel + vowel: add /w/ after rounded vowels (go‿out /ɡəʊ‿w‿aʊt/) and /j/ after /iː, aɪ, eɪ, ɔɪ/ (I‿agree /aɪ‿j‿əˈɡriː/). (3) British English: a final r is pronounced when the next word starts with a vowel (far‿away /fɑːr‿əˈweɪ/). (4) In fast speech /t/ and /d/ between consonants are often dropped: next day /neks deɪ/. Vietnamese learners often drop final sounds – linking keeps them while staying fluent." },
        { h: { vi: "Ngữ điệu (intonation)", en: "Intonation" },
          vi: "Xuống giọng ở cuối câu trần thuật và câu hỏi Wh- (Where do you live? ↘). Lên giọng ở câu hỏi Yes/No (Do you like cooking? ↗). Liệt kê: lên ở các mục trước, xuống ở mục cuối (cheap ↗, fast ↗ and reliable ↘). Trong Part 3, xuống giọng rõ ở cuối ý chính giúp câu trả lời nghe chắc chắn.",
          en: "Fall at the end of statements and Wh- questions (Where do you live? ↘). Rise on Yes/No questions (Do you like cooking? ↗). Lists: rise on earlier items, fall on the last (cheap ↗, fast ↗ and reliable ↘). In Part 3, a clear fall at the end of your main point makes the answer sound confident." },
        { h: { vi: "Shadowing 15 phút/ngày", en: "Shadowing, 15 minutes a day" },
          vi: "Bước 1: nghe bài mẫu bản chậm, đọc transcript, đánh dấu trọng âm và chỗ nối. Bước 2: đọc đuổi theo giọng máy, trễ khoảng nửa giây. Bước 3: chuyển sang bản tốc độ thường. Bước 4: tắt transcript, chỉ nghe và nói theo. Lưu ý: giọng trình duyệt có thể chưa tự nhiên ở ngữ điệu – ưu tiên học trọng âm từ và nối âm, ngữ điệu theo quy tắc ở trên.",
          en: "Step 1: play the slow model, read the transcript and mark stress and linking. Step 2: speak along about half a second behind the voice. Step 3: switch to normal speed. Step 4: hide the transcript and shadow by ear only. Note: the browser voice may not have natural intonation – focus on word stress and linking from it, and use the intonation rules above." }
      ],
      table: [
        { h: { vi: "Mẫu trọng âm theo hậu tố", en: "Stress patterns by suffix" },
          rows: [
            ["-tion / -sion", "communiCAtion /kəˌmjuːnɪˈkeɪʃn/, geneRAtion /ˌdʒenəˈreɪʃn/"],
            ["-ic / -ical", "ecoNOmic /ˌiːkəˈnɒmɪk/, technoLOgical /ˌteknəˈlɒdʒɪkl/"],
            ["-ity", "responsiBIlity /rɪˌspɒnsəˈbɪləti/, priORity /praɪˈɒrəti/"],
            ["-graphy / -logy", "phoTOgraphy /fəˈtɒɡrəfi/, techNOlogy /tekˈnɒlədʒi/"],
            [{ vi: "Danh từ / động từ 2 âm tiết", en: "Two-syllable noun / verb" }, "REcord /ˈrekɔːd/ – reCORD /rɪˈkɔːd/; INcrease /ˈɪŋkriːs/ – inCREASE /ɪnˈkriːs/"],
            [{ vi: "Họ từ đổi trọng âm", en: "Word families that shift stress" }, { vi: "PHOtograph – phoTOgraphy – photoGRAphic; deVElop – deVElopment (không đổi)", en: "PHOtograph – phoTOgraphy – photoGRAphic; deVElop – deVElopment (no shift)" }]
          ] },
        { h: { vi: "Nối âm", en: "Linking" },
          rows: [
            [{ vi: "Phụ âm + nguyên âm", en: "Consonant + vowel" }, "turn‿it‿off /tɜːn‿ɪt‿ɒf/; an‿hour‿ago /ən‿aʊər‿əˈɡəʊ/"],
            [{ vi: "Chèn /w/", en: "Linking /w/" }, "go‿out /ɡəʊ‿w‿aʊt/; do‿it /duː‿w‿ɪt/"],
            [{ vi: "Chèn /j/", en: "Linking /j/" }, "I‿agree /aɪ‿j‿əˈɡriː/; the‿end /ði‿j‿end/"],
            [{ vi: "/r/ nối (Anh-Anh)", en: "Linking /r/ (British)" }, "far‿away /fɑːr‿əˈweɪ/; for‿example /fər‿ɪɡˈzɑːmpl/"],
            [{ vi: "Lược /t/ /d/", en: "Dropping /t/ /d/" }, "next day /neks deɪ/; last night /lɑːs naɪt/"]
          ] }
      ],
      vocab: [
        { w: "photograph", pos: "n", ipa: "/ˈfəʊtəɡrɑːf/", vi: "bức ảnh", en: "a picture taken with a camera", ex: "She keeps an old photograph of her grandparents.", col: "take a photograph" },
        { w: "photography", pos: "n", ipa: "/fəˈtɒɡrəfi/", vi: "nhiếp ảnh", en: "the art or activity of taking photographs", ex: "He got into photography at university.", col: "landscape / wildlife photography" },
        { w: "photographic", pos: "adj", ipa: "/ˌfəʊtəˈɡræfɪk/", vi: "thuộc về ảnh", en: "connected with photographs", ex: "She has an almost photographic memory.", col: "photographic memory" },
        { w: "economy", pos: "n", ipa: "/ɪˈkɒnəmi/", vi: "nền kinh tế", en: "the system of money, trade and industry of a country", ex: "Tourism is important to the local economy.", col: "boost / strengthen the economy" },
        { w: "economic", pos: "adj", ipa: "/ˌiːkəˈnɒmɪk/", vi: "thuộc kinh tế", en: "connected with the economy", ex: "Economic growth is not the only goal.", col: "economic growth / development" },
        { w: "technology", pos: "n", ipa: "/tekˈnɒlədʒi/", vi: "công nghệ", en: "scientific knowledge used in practical ways", ex: "Technology can bring families closer or pull them apart.", col: "modern / digital technology" },
        { w: "technological", pos: "adj", ipa: "/ˌteknəˈlɒdʒɪkl/", vi: "thuộc công nghệ", en: "connected with technology", ex: "Technological change is very fast.", col: "technological progress" },
        { w: "communication", pos: "n", ipa: "/kəˌmjuːnɪˈkeɪʃn/", vi: "sự giao tiếp", en: "the act of sharing information", ex: "Good communication matters in every family.", col: "face-to-face communication" },
        { w: "responsibility", pos: "n", ipa: "/rɪˌspɒnsəˈbɪləti/", vi: "trách nhiệm", en: "a duty to deal with something", ex: "Governments carry the greater responsibility.", col: "take / carry responsibility for" },
        { w: "priority", pos: "n", ipa: "/praɪˈɒrəti/", vi: "ưu tiên", en: "something more important than other things", ex: "Public transport should be a priority.", col: "top priority" },
        { w: "generation", pos: "n", ipa: "/ˌdʒenəˈreɪʃn/", vi: "thế hệ", en: "all the people born at about the same time", ex: "My parents' generation stayed in one job.", col: "the younger / older generation" },
        { w: "record (noun)", pos: "n", ipa: "/ˈrekɔːd/", vi: "bản ghi, hồ sơ", en: "a written or stored account of something", ex: "I keep a record of my practice scores.", col: "keep a record of" },
        { w: "record (verb)", pos: "v", ipa: "/rɪˈkɔːd/", vi: "ghi lại, ghi âm", en: "to store sound or information", ex: "Record your answer and listen back.", col: "record yourself" },
        { w: "increase (noun)", pos: "n", ipa: "/ˈɪŋkriːs/", vi: "sự tăng", en: "a rise in amount", ex: "There has been an increase in remote work.", col: "a sharp / slight increase" },
        { w: "increase (verb)", pos: "v", ipa: "/ɪnˈkriːs/", vi: "tăng", en: "to become or make larger", ex: "Prices tend to increase in tourist areas.", col: "increase significantly" },
        { w: "inevitable", pos: "adj", ipa: "/ɪnˈevɪtəbl/", vi: "không thể tránh khỏi", en: "certain to happen", ex: "Some change is inevitable.", col: "almost inevitable" },
        { w: "sustainable", pos: "adj", ipa: "/səˈsteɪnəbl/", vi: "bền vững", en: "able to continue without harming the environment", ex: "Cities need more sustainable transport.", col: "sustainable development" },
        { w: "to some extent", pos: "phr", ipa: "/tə ˌsʌm ɪkˈstent/", vi: "ở mức độ nào đó", en: "partly, but not completely", ex: "To some extent, yes, especially in big cities.", col: "—" },
        { w: "in the long run", pos: "phr", ipa: "/ɪn ðə ˌlɒŋ ˈrʌn/", vi: "về lâu dài", en: "over a long period of time", ex: "It could make a real difference in the long run.", col: "—" },
        { w: "that said", pos: "phr", ipa: "/ˌðæt ˈsed/", vi: "dù vậy", en: "used to add a contrasting point", ex: "That said, I wouldn't say people care less.", col: "—" }
      ],
      examples: [
        { label: { vi: "Trọng âm đổi trong họ từ", en: "Stress shift in a word family" },
          text: "photograph – photography – photographic",
          note: { vi: "/ˈfəʊtəɡrɑːf/ – /fəˈtɒɡrəfi/ – /ˌfəʊtəˈɡræfɪk/: âm nhấn chuyển sang phải khi thêm hậu tố.", en: "/ˈfəʊtəɡrɑːf/ – /fəˈtɒɡrəfi/ – /ˌfəʊtəˈɡræfɪk/: the stress moves right as suffixes are added." }, speak: true },
        { label: { vi: "Danh từ – động từ", en: "Noun – verb" },
          text: "I keep a record of my scores. Please record your answer.",
          note: { vi: "REcord /ˈrekɔːd/ (danh từ) – reCORD /rɪˈkɔːd/ (động từ).", en: "REcord /ˈrekɔːd/ (noun) – reCORD /rɪˈkɔːd/ (verb)." }, speak: true },
        { label: { vi: "Nối âm", en: "Linking" },
          text: "Turn it off. Go out. I agree. Far away.",
          note: { vi: "turn‿it‿off /tɜːn‿ɪt‿ɒf/, go‿out /ɡəʊ‿w‿aʊt/, I‿agree /aɪ‿j‿əˈɡriː/, far‿away /fɑːr‿əˈweɪ/.", en: "turn‿it‿off /tɜːn‿ɪt‿ɒf/, go‿out /ɡəʊ‿w‿aʊt/, I‿agree /aɪ‿j‿əˈɡriː/, far‿away /fɑːr‿əˈweɪ/." }, speak: true },
        { label: { vi: "Trọng âm câu", en: "Sentence stress" },
          text: "I WANTed to GO, but I COULDn't.",
          note: { vi: "Nhấn từ nội dung (wanted, go, couldn't); to /tə/, but, I đọc nhẹ.", en: "Stress the content words (wanted, go, couldn't); to /tə/, but and I are weak." }, speak: true },
        { label: { vi: "Part 3 theo O-R-E-C", en: "Part 3 using O-R-E-C" },
          text: "In my view, it has to be both, but governments carry the greater responsibility. Individuals can certainly make a difference, but their choices are limited by what's available. For instance, people can't take a bus that doesn't exist. Governments, on the other hand, can make the greener option the cheaper one.",
          note: { vi: "O: In my view… R: choices are limited… E: a bus that doesn't exist. C: Governments, on the other hand…", en: "O: In my view… R: choices are limited… E: a bus that doesn't exist. C: Governments, on the other hand…" }, speak: true },
        { label: { vi: "Ngân hàng câu luyện thêm (6 câu, tự soạn)", en: "Extra practice bank (6 questions, self-written)" },
          text: BANK.map(function (b, i) { return (i + 1) + ". " + b.q; }).join("\n"),
          note: { vi: "Gợi ý: " + BANK.map(function (b, i) { return (i + 1) + ") " + b.hint.vi; }).join(" "), en: "Hints: " + BANK.map(function (b, i) { return (i + 1) + ") " + b.hint.en; }).join(" ") }, speak: true }
      ],
      mistakes: [
        { vi: "Nhấn sai từ dài: PHOtography, ECOnomic, deveLOPment.", en: "Wrong stress on long words: PHOtography, ECOnomic, deveLOPment." },
        { vi: "Bỏ âm cuối (wan’ for want, ol’ for old) thay vì nối sang nguyên âm sau.", en: "Dropping final sounds (wan’ for want, ol’ for old) instead of linking them to the next vowel." },
        { vi: "Đọc mọi từ to như nhau, không có dạng yếu (to /tuː/ ở mọi chỗ).", en: "Giving every word equal weight with no weak forms (to /tuː/ everywhere)." },
        { vi: "Part 3: chỉ nói về bản thân (I like…) mà không khái quát (people, society).", en: "Part 3: talking only about yourself (I like…) without generalising (people, society)." },
        { vi: "Part 3: trả lời 1 câu rồi dừng, hoặc nói quá 1 phút lan man.", en: "Part 3: one sentence and stop, or rambling for over a minute." }
      ],
      exercises: [
        { id: "w09-ex01", type: "mcq",
          q: { vi: "Trọng âm chính của “technology” rơi vào âm tiết nào?", en: "Where is the main stress in “technology”?" },
          opts: ["TECH-no-lo-gy", "tech-NO-lo-gy", "tech-no-LO-gy", "tech-no-lo-GY"], a: 1,
          why: { vi: "/tekˈnɒlədʒi/ – hậu tố -logy nhấn âm ngay trước: tech-NO-lo-gy.", en: "/tekˈnɒlədʒi/ – -logy stresses the syllable just before it: tech-NO-lo-gy." } },
        { id: "w09-ex02", type: "mcq",
          q: { vi: "Trọng âm chính của “communication”?", en: "Where is the main stress in “communication”?" },
          opts: ["com-MU-ni-ca-tion", "com-mu-NI-ca-tion", "com-mu-ni-CA-tion"], a: 2,
          why: { vi: "/kəˌmjuːnɪˈkeɪʃn/ – -tion nhấn âm ngay trước: com-mu-ni-CA-tion (MU là trọng âm phụ).", en: "/kəˌmjuːnɪˈkeɪʃn/ – -tion stresses the syllable just before it: com-mu-ni-CA-tion (MU has secondary stress)." } },
        { id: "w09-ex03", type: "mcq",
          q: { vi: "Cặp nào ghi đúng trọng âm danh từ / động từ của “record”?", en: "Which pair shows the correct noun / verb stress for “record”?" },
          opts: ["REcord (noun) / reCORD (verb)", "reCORD (noun) / REcord (verb)", "REcord (noun) / REcord (verb)"], a: 0,
          why: { vi: "Danh từ /ˈrekɔːd/, động từ /rɪˈkɔːd/ – mẫu danh từ nhấn âm 1, động từ nhấn âm 2.", en: "Noun /ˈrekɔːd/, verb /rɪˈkɔːd/ – the noun stresses syllable 1, the verb syllable 2." } },
        { id: "w09-ex04", type: "mcq",
          q: { vi: "Khi nói nhanh “I agree”, âm nào thường xuất hiện giữa hai từ?", en: "In natural speech, which sound often appears between the words in “I agree”?" },
          opts: ["/w/", "/j/", "/r/", "no sound – there is a pause"], a: 1,
          why: { vi: "Sau /aɪ/ (kết thúc bằng /ɪ/) chèn /j/: /aɪ‿j‿əˈɡriː/.", en: "After /aɪ/ (ending in /ɪ/) a /j/ links the words: /aɪ‿j‿əˈɡriː/." } },
        { id: "w09-ex05", type: "mcq",
          q: { vi: "Giọng Anh-Anh đọc “far away” thế nào khi nối âm?", en: "How is “far away” linked in British English?" },
          opts: ["/fɑː əˈweɪ/ with a pause", "/fɑːr‿əˈweɪ/ – the r is pronounced to link", "/fɑːw‿əˈweɪ/"], a: 1,
          why: { vi: "Anh-Anh không đọc r cuối khi đứng một mình (/fɑː/), nhưng đọc /r/ khi từ sau bắt đầu bằng nguyên âm.", en: "British English drops a final r on its own (/fɑː/) but pronounces /r/ when the next word begins with a vowel." } },
        { id: "w09-ex06", type: "mcq",
          q: { vi: "Trong câu “I can swim quite well”, “can” thường đọc là", en: "In “I can swim quite well”, “can” is usually pronounced" },
          opts: ["/kæn/", "/kən/", "/kɑːn/"], a: 1,
          why: { vi: "“can” khẳng định không nhấn → dạng yếu /kən/; “can't” /kɑːnt/ (Anh-Anh) thường được nhấn.", en: "Unstressed positive “can” → weak form /kən/; “can't” /kɑːnt/ (British) is usually stressed." } },
        { id: "w09-ex07", type: "order", scoreEach: false,
          q: { vi: "Gán nhãn O-R-E-C cho từng câu trong câu trả lời Part 3: “Is it better to learn a skill from a teacher or from videos?”", en: "Label each sentence of this Part 3 answer with O-R-E-C: “Is it better to learn a skill from a teacher or from videos?”" },
          items: ["For example, a swimming coach can see your mistakes immediately.",
                  "I'd say a teacher is usually better for complex skills.",
                  "Videos, by contrast, are fine for simple things like a new recipe.",
                  "That's because a teacher can correct you before mistakes become habits."],
          labels: ["Opinion", "Reason", "Example", "Contrast"],
          a: ["Example", "Opinion", "Contrast", "Reason"],
          why: { vi: "O: I'd say… → R: That's because… → E: For example… → C: by contrast…", en: "O: I'd say… → R: That's because… → E: For example… → C: by contrast…" } },
        speakItem("w09-ex08", P3[5], 5),
        speakItem("w09-ex09", P3[6], 6),
        speakItem("w09-ex10", P3[7], 7),
        speakItem("w09-ex11", P3[8], 8)
      ],
      summary: [
        { vi: "Part 3: 25–40 giây, O-R-E-C, nói ở mức xã hội, dùng rào đón và so sánh.", en: "Part 3: 25–40 seconds, O-R-E-C, speak at a social level, use hedging and comparison." },
        { vi: "Trọng âm: -tion, -ic, -ity, -graphy/-logy nhấn âm ngay trước; danh từ/động từ 2 âm tiết: REcord – reCORD.", en: "Stress: -tion, -ic, -ity, -graphy/-logy stress the syllable before; two-syllable noun/verb: REcord – reCORD." },
        { vi: "Nối âm: phụ âm–nguyên âm, chèn /w/ /j/ /r/; dạng yếu cho từ chức năng.", en: "Linking: consonant–vowel, add /w/ /j/ /r/; weak forms for function words." },
        { vi: "Ngữ điệu: xuống cuối câu trần thuật và Wh-, lên ở Yes/No.", en: "Intonation: fall on statements and Wh- questions, rise on Yes/No questions." },
        { vi: "Mỗi ngày: shadowing 15 phút (chậm → thường → không transcript).", en: "Daily: 15 minutes of shadowing (slow → normal → no transcript)." }
      ]
    },

    // ---------------- QUIZ ----------------
    quiz: {
      title: { vi: "Kiểm tra tuần 9 – Phát âm + Speaking Part 3", en: "Week 9 quiz – Pronunciation + Speaking Part 3" },
      passPct: null,
      note: { vi: "PLAN tuần 9 không đặt ngưỡng % – phần phát âm tự chấm chỉ để theo dõi (gợi ý tự đặt ≥ 80%). Tiêu chí chính: mỗi câu Part 3 dài 25–40 giây, không dừng quá 2 giây (tự đánh giá). Nội dung tự soạn, không phải đề thi thật.",
              en: "The week 9 PLAN sets no % threshold – the auto-marked pronunciation part is for tracking only (suggested personal target ≥ 80%). The main criterion: each Part 3 answer lasts 25–40 seconds with no pause over 2 seconds (self-assessed). Self-written content, not a real exam." },
      timeLimitMin: null,
      sections: [
        { id: "w09-s1", skill: "speaking",
          title: { vi: "Phát âm – trọng âm, nối âm, dạng yếu, ngữ điệu (10 câu)", en: "Pronunciation – stress, linking, weak forms, intonation (10 questions)" },
          instructions: { vi: "Chọn đáp án đúng. Nên đọc to từng lựa chọn trước khi chọn.", en: "Choose the correct answer. Say each option aloud before you choose." },
          questions: [
            { id: "w09-q01", type: "mcq", q: "Where is the main stress in “photography”?",
              opts: ["PHO-to-gra-phy", "pho-TO-gra-phy", "pho-to-GRA-phy", "pho-to-gra-PHY"], a: 1,
              why: { vi: "/fəˈtɒɡrəfi/ – -graphy nhấn âm ngay trước. Khác “photograph” /ˈfəʊtəɡrɑːf/ nhấn âm 1.", en: "/fəˈtɒɡrəfi/ – -graphy stresses the syllable just before. Compare “photograph” /ˈfəʊtəɡrɑːf/, stressed on syllable 1." } },
            { id: "w09-q02", type: "mcq", q: "Where is the main stress in “economic”?",
              opts: ["E-co-no-mic", "e-CO-no-mic", "e-co-NO-mic"], a: 2,
              why: { vi: "/ˌiːkəˈnɒmɪk/ – -ic nhấn âm ngay trước. Khác “economy” /ɪˈkɒnəmi/ nhấn âm 2.", en: "/ˌiːkəˈnɒmɪk/ – -ic stresses the syllable just before. Compare “economy” /ɪˈkɒnəmi/, stressed on syllable 2." } },
            { id: "w09-q03", type: "mcq", q: "“Please record your answer.” How is “record” stressed here?",
              opts: ["RE-cord /ˈrekɔːd/", "re-CORD /rɪˈkɔːd/"], a: 1,
              why: { vi: "Ở đây “record” là động từ → nhấn âm 2 /rɪˈkɔːd/.", en: "Here “record” is a verb → stress on syllable 2 /rɪˈkɔːd/." } },
            { id: "w09-q04", type: "mcq", q: "Which word is stressed on the FIRST syllable?",
              opts: ["increase (verb)", "progress (noun)", "present (verb)", "decrease (verb)"], a: 1,
              why: { vi: "progress (danh từ) /ˈprəʊɡres/ nhấn âm 1. Ba động từ còn lại nhấn âm 2: inCREASE, preSENT, deCREASE.", en: "progress (noun) /ˈprəʊɡres/ is stressed on syllable 1. The three verbs are stressed on syllable 2: inCREASE, preSENT, deCREASE." } },
            { id: "w09-q05", type: "mcq", q: "Where is the main stress in “responsibility”?",
              opts: ["re-SPON-si-bi-li-ty", "re-spon-SI-bi-li-ty", "re-spon-si-BI-li-ty"], a: 2,
              why: { vi: "/rɪˌspɒnsəˈbɪləti/ – -ity nhấn âm ngay trước: re-spon-si-BI-li-ty (SPON là trọng âm phụ).", en: "/rɪˌspɒnsəˈbɪləti/ – -ity stresses the syllable just before: re-spon-si-BI-li-ty (SPON has secondary stress)." } },
            { id: "w09-q06", type: "mcq", q: "How is “turn it off” usually said in natural speech?",
              opts: ["/tɜːn/ – pause – /ɪt/ – pause – /ɒf/", "/tɜːn‿ɪt‿ɒf/ – each final consonant joins the next vowel", "/tɜː ɪ ɒ/ – final consonants dropped"], a: 1,
              why: { vi: "Phụ âm cuối (n, t) nối sang nguyên âm đầu từ sau: “tur-ni-toff”. Bỏ âm cuối là lỗi, không phải nối âm.", en: "Final consonants (n, t) join the next word's vowel: “tur-ni-toff”. Dropping them is an error, not linking." } },
            { id: "w09-q07", type: "mcq", q: "In “go out”, which sound often links the two words?",
              opts: ["/j/", "/w/", "/r/", "/t/"], a: 1,
              why: { vi: "/əʊ/ kết thúc tròn môi → chèn /w/: /ɡəʊ‿w‿aʊt/.", en: "/əʊ/ ends with rounded lips → a /w/ links: /ɡəʊ‿w‿aʊt/." } },
            { id: "w09-q08", type: "mcq", q: "In “I want to go home”, “to” is usually pronounced",
              opts: ["/tuː/", "/tə/", "/tɒ/"], a: 1,
              why: { vi: "Từ chức năng không nhấn → dạng yếu /tə/ (trước phụ âm).", en: "An unstressed function word → weak form /tə/ (before a consonant)." } },
            { id: "w09-q09", type: "mcq", q: "Which question usually ends with a RISING tone?",
              opts: ["What do you do?", "Where do you live?", "Do you like cooking?", "Why did you choose it?"], a: 2,
              why: { vi: "Câu hỏi Yes/No thường lên giọng; câu hỏi Wh- (What, Where, Why) thường xuống giọng.", en: "Yes/No questions usually rise; Wh- questions (What, Where, Why) usually fall." } },
            { id: "w09-q10", type: "mcq", q: "In “I wanted to go, but I couldn't”, which words are normally stressed?",
              opts: ["I, to, but", "wanted, go, couldn't", "to, but, I"], a: 1,
              why: { vi: "Nhấn từ nội dung và từ phủ định: wanted, go, couldn't. I, to, but là từ chức năng, đọc nhẹ.", en: "Content words and negatives are stressed: wanted, go, couldn't. I, to and but are function words and are weak." } }
          ] },

        { id: "w09-s2", skill: "speaking",
          title: { vi: "Speaking Part 3 – 5 câu (tự đánh giá)", en: "Speaking Part 3 – 5 questions (self-assessed)" },
          instructions: { vi: "Bấm Nghe để nghe câu hỏi. Trả lời ngay, 25–40 giây, theo O-R-E-C. Tự ghi âm bằng máy rồi tick checklist. Không chấm tự động.",
                          en: "Press Play to hear the question. Answer straight away for 25–40 seconds using O-R-E-C. Record yourself on your device, then tick the checklist. Not auto-marked." },
          ref: "w09-sp",
          questions: [0, 1, 2, 3, 4].map(function (i) { return speakItem("w09-q" + pad(i + 11), P3[i], i); }) }
      ]
    },

    passages: [],

    // ---------------- SCRIPTS ----------------
    scripts: [
      { id: "w09-pr", kind: "speaking-model", part: null, lang: "en-GB", rate: 0.85, pauseMs: 1200,
        title: { vi: "Phát âm – nghe và nhắc lại", en: "Pronunciation – listen and repeat" },
        speakers: [{ id: "A", name: "Model", voice: "female" }],
        lines: [
          { sp: "A", text: "photograph. photography. photographic." },
          { sp: "A", text: "economy. economic." },
          { sp: "A", text: "technology. technological." },
          { sp: "A", text: "communicate. communication." },
          { sp: "A", text: "responsibility. priority." },
          { sp: "A", text: "I keep a record of my scores. Please record your answer." },
          { sp: "A", text: "There was an increase in prices. Prices may increase again." },
          { sp: "A", text: "Turn it off. Go out. I agree. Far away." },
          { sp: "A", text: "I wanted to go, but I couldn't." },
          { sp: "A", text: "Do you like cooking? Where do you live?" },
          { sp: "A", text: "It's cheap, fast and reliable." }
        ],
        transcript: "shown", maxPlays: null, source: "tự soạn" },

      { id: "w09-sp", kind: "speaking-prompt", part: 3, lang: "en-GB", rate: 0.95, pauseMs: 1500,
        title: { vi: "Speaking Part 3 – câu hỏi của giám khảo (9 câu có mẫu + 6 câu luyện thêm)", en: "Speaking Part 3 – examiner questions (9 with models + 6 extra)" },
        speakers: [{ id: "E", name: "Examiner", voice: "female" }],
        lines: P3.concat(BANK).map(function (p) { return { sp: "E", text: p.q }; }),
        transcript: "shown", maxPlays: null, source: "tự soạn" },

      { id: "w09-sm", kind: "speaking-model", part: 3, lang: "en-GB", rate: 1.0, pauseMs: 800,
        title: { vi: "Speaking Part 3 – bài mẫu (tốc độ thường)", en: "Speaking Part 3 – models (normal speed)" },
        speakers: [{ id: "E", name: "Examiner", voice: "female" }, { id: "C", name: "Candidate", voice: "male" }],
        lines: modelLines(),
        transcript: "hidden", maxPlays: null, source: "tự soạn" },

      { id: "w09-sh", kind: "speaking-model", part: 3, lang: "en-GB", rate: 0.8, pauseMs: 1200,
        title: { vi: "Shadowing – bài mẫu Part 3 (bản chậm)", en: "Shadowing – Part 3 models (slow version)" },
        speakers: [{ id: "E", name: "Examiner", voice: "female" }, { id: "C", name: "Candidate", voice: "male" }],
        lines: modelLines(),
        transcript: "shown", maxPlays: null, source: "tự soạn" }
    ],

    mock: null
  };
})();
