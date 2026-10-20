// English version of the app content (overrides data.js when the EN button is active).
window.PLAN_EN = {
  note: "“TOEIC 7.5” is not a real score scale (TOEIC tops out at 990). This plan reads it as IELTS Overall 7.5, roughly TOEIC Listening + Reading 900+. Assumptions: B2 starting level, about 10 hours a week, 12 weeks. It is an estimate based on self-written practice material, not a substitute for the real exam, and it does not guarantee a result.",
  hours: ["Core lessons", "Exercises + error review", "Listening/Reading practice", "Speaking (record + self-review)", "Vocabulary/error review (1-3-7-14 days)"],
  unit: "h",
  weeks: [
    { focus: "Placement, grammar basics, exam formats", phase: "Foundation", learn: "~20-question placement test; review tenses, articles, subject-verb agreement; learn the 4-skill formats and band descriptors.", tasks: "30 mixed grammar questions; write a 100-word self-introduction.", check: "Log your scores; list your first 10 mistakes." },
    { focus: "Writing Task 2: body paragraph (TEEL) – Education/Technology", phase: "Foundation", learn: "Lesson 01 in this app; 20 Education/Technology words.", tasks: "The 14 questions in Lesson 01; write 2 body paragraphs (110–140 words each).", check: "Each paragraph has a topic sentence, explanation and example, with no repeated ideas." },
    { focus: "Reading: skimming/scanning, True/False/Not Given", phase: "Foundation", learn: "Skimming, scanning, spotting paraphrase; T/F/NG.", tasks: "2 passages × 13 questions; analyse every wrong answer.", check: "At least 65% correct; note why you were wrong (vocabulary / NG trap / ran out of time)." },
    { focus: "Listening Sections 1–2; Speaking Part 1", phase: "Foundation", learn: "Spelling numbers/names; guess the word type before listening; Speaking P1 answers of 2–3 sentences with a reason.", tasks: "2 Listening tests; record 10 Part 1 answers.", check: "Replay your recording and mark hesitations; Listening at least 60%." },
    { focus: "Complete Writing Task 2: introduction, conclusion, 4 question types", phase: "Development", learn: "Introduction (paraphrase + thesis), conclusion; opinion, discussion, problem–solution, two-part questions.", tasks: "One full essay of 250+ words (40 minutes), self-marked on the 4 criteria.", check: "Compare with the band descriptors; rewrite one paragraph at band 7.5." },
    { focus: "Advanced Reading; Environment/Health vocabulary", phase: "Development", learn: "Matching Headings, Summary Completion; 25 Environment/Health words.", tasks: "2 passages, 20 minutes each.", check: "At least 70% correct; review week 2 words with spaced repetition." },
    { focus: "Listening Sections 3–4; Speaking Part 2", phase: "Development", learn: "Academic discussions and lectures; cue-card structure (opening, 3 points, closing).", tasks: "2 Listening tests; record 5 cue cards × 2 minutes.", check: "Self-mark Fluency & Pronunciation and Lexical Resource; Listening at least 70%." },
    { focus: "Writing Task 1 + complex grammar", phase: "Development", learn: "Overview, comparison, trends; relative clauses, conditionals, basic inversion.", tasks: "2 Task 1 reports (150+ words, 20 minutes); 30 grammar questions.", check: "A clear overview, no invented data; fewer grammar errors than week 1." },
    { focus: "Speaking Part 3; pronunciation, linking", phase: "Raise the band", learn: "Answer frame: opinion – reason – example – comparison; stress, intonation, linking sounds.", tasks: "Record 15 Part 3 answers; shadowing 15 minutes a day.", check: "Each answer 25–40 seconds, no pause over 2 seconds." },
    { focus: "Mock Writing + Reading (timed)", phase: "Raise the band", learn: "Deep error correction, time management.", tasks: "1 mock Writing (T1 + T2, 60 minutes); 1 mock Reading (60 minutes).", check: "Record an estimated band per criterion; choose 3 improvement goals." },
    { focus: "Mock Listening + Speaking, fix weak points", phase: "Raise the band", learn: "Target weak points from your error log.", tasks: "1 mock Listening; 1 full 3-part mock Speaking (11–14 minutes).", check: "Compare with weeks 4/7; update your score log." },
    { focus: "Full mock + final review + exam-day strategy", phase: "Final sprint", learn: "Exam-day strategy, review of your error list.", tasks: "1 full 4-skill mock (split over 2 days); review all vocabulary.", check: "Final estimated band; if any skill is below 7.0, plan 2–4 extra weeks." }
  ]
};

window.LESSON_EN = {
  title: "Lesson 01 – Writing Task 2: The argument body paragraph (Education/Technology)",
  goal: ["Write one 110–140-word body paragraph with a topic sentence, explanation, example and link, without repeating ideas.", "Use at least 6 of the 12 academic words/phrases below, with correct collocations."],
  meanings: ["the programme of subjects taught at a school", "learning adapted to each individual student", "learning by memorising without real understanding", "to encourage and help something develop", "to make something available to more people", "to reduce the gap between people with and without technology", "the ability to use digital tools confidently and safely", "something that takes your attention away", "the level of success in studies", "to make a process run by machine or software", "required by law or by rule", "dependence on something"],
  teel: [
    ["T – Topic sentence", "The first sentence states one main idea only, with a clear position that answers the question."],
    ["E – Explanation", "Explain why/how it is true (cause and effect), in 1–2 sentences."],
    ["E – Example", "A specific example (it may be hypothetical): For instance / Consider a student who... Never invent statistics or quotations."],
    ["L – Link", "A closing sentence that ties back to the question: Consequently, ... / This is why ..."]
  ],
  mistakes: [
    "A topic sentence that is too general (“Technology is good”) or holds 2–3 ideas at once.",
    "Repeated ideas: the explanation only restates the topic sentence in other words.",
    "A vague example (“many people use phone”) instead of a concrete situation.",
    "Missing articles/number errors: a computer, students use computers; technology is uncountable, so no -s.",
    "Agreement errors: technology help → technology helps.",
    "Starting every sentence with Firstly, Secondly sounds mechanical.",
    "Word-for-word translation: increase critical thinking → foster critical thinking; do progress → make progress."
  ],
  lowNote: "Ideas are generic with no explanation of cause and effect (TR); simple vocabulary, repeated good/useful (LR); article and subject-verb errors, a vague personal example (GRA); the single linker So (CC).",
  highNote: "One clear topic sentence; the explanation uses contrast, a concrete example, and a Consequently link; natural vocabulary (tailored to, adjust the pace, adaptive); varied structures. “Thirty” is a hypothetical number for illustration, not real data.",
  summary: [
    "One body paragraph = one main idea: Topic, Explanation, Example, Link.",
    "The explanation must answer “why”, not restate the topic sentence.",
    "Prefer a specific (even hypothetical) example to a general one; never invent statistics.",
    "Use academic collocations: foster critical thinking, widen access to, bridge the digital divide.",
    "Check your usual errors: articles, third-person -s, subject-verb agreement, word-for-word translation."
  ]
};

window.QUIZ_EN = {
  1: { why: "curriculum = the programme of subjects taught; literacy and attainment do not fit “overhaul its ___”." },
  2: { why: "“memorising facts without understanding” is exactly rote learning." },
  3: { why: "Collocation: widen access to." },
  4: { why: "a major distraction. Compulsory is an adjective and curriculum does not fit the meaning." },
  5: { why: "(b) means the opposite and (c) is meaningless." },
  6: { why: "foster critical thinking; “do critical thinking” and “increase up” are wrong." },
  7: { q: "Correct the error: Technology help students to learn faster.", why: "Technology is an uncountable noun taking a third-person singular verb, so add -s." },
  8: { q: "Correct the error: Schools should make progress students' digital literacy.", model: "Schools should improve / raise students' digital literacy. (or teach digital literacy)", why: "“Make progress” cannot take an object like this; make progress in is correct." },
  9: { q: "Correct the error: Many students have heavy reliance of smartphones.", model: "Many students have a heavy reliance on smartphones. (or rely heavily on smartphones)", why: "The preposition after reliance is on, and the article a is needed." },
  10: { q: "Identify the role of each sentence in the paragraph:", why: "Correct order: Topic (c) → Explanation (b) → Example (d) → Link (a)." },
  11: { q: "Which topic sentence is better?", why: "(b) has one idea, is specific and names who benefits. (a) is vague, contradictory and does not answer the question." },
  12: { q: "This explanation repeats the idea. Rewrite it with a cause-and-effect mechanism: “Online learning is useful because it is helpful for students.”", why: "It has a mechanism: re-watching lessons → deeper understanding → learning at one's own pace." },
  13: { q: "This example is too vague. Rewrite it as a specific (hypothetical, no statistics) example: “For example, many students use phones.” (Idea: relying on a tool weakens a skill.)", why: "A concrete situation with a clear consequence." },
  14: { q: "Write one 110–140-word body paragraph for the question: “Some people think schools should rely less on technology. To what extent do you agree?”", why: "A reference paragraph; other answers are fine if they meet the checklist.", checklist: ["The topic sentence has one idea and answers the question", "The explanation gives a real “why” and does not repeat the topic sentence", "A specific example, no invented statistics", "There is a link sentence", "Uses at least 4 words from the table, with correct collocations", "Check: s/es, articles, subject-verb agreement"] }
};

window.SCENES_EN = {
  s01: { text: "Goal: write one strong body paragraph", voice: "Hello. Today you will learn how to write an argument body paragraph for Writing Task 2." },
  s02: { text: "T – E – E – L\nTopic, Explain, Example, Link" },
  s03: { text: "1. Topic sentence: ONE clear idea", voice: "First: the topic sentence states one main idea, clearly, and answers the question." },
  s04: {},
  s05: { text: "2. Explanation: WHY it is true", voice: "Second: explain why. Do not restate the topic sentence in other words. Give a cause and a result." },
  s06: {},
  s07: { text: "3. Example: specific, not vague", voice: "Third: the example must be specific. It can be a hypothetical situation, but do not invent statistics." },
  s08: {},
  s09: { text: "4. Link: connect back to the question", voice: "Fourth: the link sentence ties the paragraph back to the question." },
  s10: {},
  s11: {},
  s12: { text: "Quiz 1: Technology help students.\nFix the error.", voice: "Question one. What is wrong with this sentence: Technology help students? Think for a few seconds." },
  s13: { text: "Quiz 2: Which topic sentence is better?\nA: Technology is good.\nB: Online platforms widen access.", voice: "Question two. Which topic sentence is better, A or B? Choose one and explain why." },
  s14: { text: "Answers: 1. helps (-s)  2. B (one clear idea)\nQuiz 3: Link starts with ___ ?", voice: "Answers. One: helps, add s for the third person singular. Two: B, because it has one clear idea. Question three: which word does a link sentence often start with? Consequently or Therefore." },
  s15: { text: "Summary: Topic - Explain - Example - Link\nOne idea, a reason, an example, a link", voice: "Summary: each paragraph has one idea, a real reason, a specific example and a link back to the question. Now do exercise fourteen in the lesson and submit it for marking." }
};
