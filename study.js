/* ================= مذاكرتي — قسم المذاكرة =================
 * الكتب الرسمية، شرح المنهج، امتحانات السنين اللي فاتت، المراجعة والأسئلة المتوقعة،
 * وحسابات ولي الأمر والطالب (Firestore على باقة Spark المجانية).
 * Study section: official books, lessons, past papers, review sets, parent/student accounts.
 */
window.DalilStudy = function (ctx) {
  "use strict";
  const { icon, esc, toast, openSheet, closeSheet, state, store, isNative, P } = ctx;
  const account = ctx.account || null;

  /* ================= Strings ================= */
  // Arabic counted noun: 1 درس، 2 درسين، 3–10 دروس، 11+ درس (the number itself is passed formatted)
  const lessonWord = (n) => { const v = parseInt(String(n).replace(/[٠-٩]/g, (c) => "٠١٢٣٤٥٦٧٨٩".indexOf(c)).replace(/[^\d]/g, ""), 10) || 0; return v === 1 ? "درس" : v === 2 ? "درسين" : v >= 3 && v <= 10 ? "دروس" : "درس"; };
  const S = {
    ar: {
      tab: "مذاكرتي",
      title: "مذاكرتي",
      lead: "كتب الوزارة وشرح المنهج والامتحانات، لكل صف من رياض الأطفال لتانية ثانوي.",
      chooseGrade: "اختار الصف",
      soon: "قريبًا", available: "متاح",
      term: (n) => (n === 1 ? "الترم الأول" : "الترم التاني"),
      book: "الكتاب المدرسي", bookSub: "كتاب الوزارة الرسمي، بيفتح جوه التطبيق",
      explain: "شرح المنهج", explainSub: "شرح وافي وحدة وحدة ودرس درس",
      past: "امتحانات السنين اللي فاتت", pastSub: "حل امتحانات آخر 5 سنين، والتطبيق يصححلك",
      review: "مراجعة وأسئلة متوقعة", reviewSub: "أسئلة على كل وحدة وامتحانات تجريبية بنفس النظام",
      mistakes: "راجع أخطاءك", mistakesSub: (n) => `${n} سؤال غلطت فيهم قبل كده`,
      noMistakes: "مفيش أخطاء تراجعها دلوقتي. برافو!",
      saved: "الدروس المحفوظة", noSaved: "احفظ أي درس بعلامة النجمة عشان ترجعله بسرعة.",
      units: "الوحدات", unit: "الوحدة", lessonsN: (n) => `${n} ${lessonWord(n)}`,
      markDone: "خلّصت الدرس", done: "خلّصته", nextLesson: "الدرس اللي بعده", prevLesson: "الدرس اللي قبله",
      saveLesson: "احفظ الدرس", unsaveLesson: "شيل من المحفوظات",
      checkYourself: "اختبر نفسك",
      example: "مثال", solution: "الحل", showSolution: "اعرض الحل", tip: "خلي بالك", def: "تعريف",
      questionsN: (n) => `${n} سؤال`, minutesN: (n) => `${n} دقيقة`,
      best: "أعلى درجة", tries: (n) => `حلّيته ${n} ${n === 1 ? "مرة" : n === 2 ? "مرتين" : "مرات"}`,
      startTitle: "هتحل إزاي؟",
      modePractice: "تدريب", modePracticeSub: "تعرف الإجابة صح ولا غلط بعد كل سؤال، ومن غير وقت.",
      modeExam: "امتحان بوقت", modeExamSub: (n) => `زي الامتحان الحقيقي: ${n} دقيقة، والنتيجة في الآخر.`,
      qOf: (i, n) => `سؤال ${i} من ${n}`,
      check: "صحّح", next: "التالي", prev: "السابق", finish: "سلّم الامتحان", finishPractice: "شوف النتيجة",
      correct: "إجابة صح", wrong: "إجابة غلط", rightAnswer: "الإجابة الصح:", yourAnswer: "إجابتك:", noAnswer: "مجاوبتش",
      showAnswer: "اعرض الإجابة", revealed: "شفت الإجابة، فالسؤال ده مش هيتحسب",
      typeAnswer: "اكتب إجابتك هنا", tfTrue: "صح", tfFalse: "غلط",
      unanswered: (n) => `لسه فيه ${n} ${n === 1 ? "سؤال" : "أسئلة"} من غير إجابة. تسلّم برضه؟`,
      submitAnyway: "سلّم", keepGoing: "كمّل",
      exitQuiz: "تخرج من الامتحان؟", exitQuizBody: "إجاباتك في المحاولة دي مش هتتحفظ.", exit: "اخرج",
      timeUp: "الوقت خلص، والامتحان اتسلّم.",
      result: "النتيجة", scoreOf: (a, b) => `${a} من ${b}`,
      msg: (p) => (p >= 85 ? "ممتاز، كمّل كده!" : p >= 65 ? "كويس جدًا، راجع أخطاءك وهتبقى ممتاز." : p >= 50 ? "محتاج شوية مراجعة. ارجع للشرح وجرّب تاني." : "متزعلش، ذاكر الدروس دي تاني وجرّب."),
      reviewAnswers: "راجع الإجابات", retry: "حل تاني", retryWrong: "حل اللي غلطت فيه بس", backSubject: "رجوع للمادة",
      time: "الوقت",
      pastSoon: "الامتحان الرسمي هيتضاف قريب",
      pastNote: "دي امتحانات الوزارة الرسمية للمصريين بالخارج زي ما اتنشرت. حلها على ورقة، وبعدين راجع إجاباتك مع الشرح وامتحانات المراجعة.",
      noSets: "مفيش أسئلة هنا لسه.",
      expected: "امتحانات تجريبية متوقعة", unitReview: "مراجعة على الوحدات",
      contentNote: "الشرح والأسئلة دي للتدريب ومن إعداد التطبيق. المرجع الرسمي هو كتاب الوزارة.",
      bookNone: "كتب الوزارة هتتاح جوه التطبيق قريبًا إن شاء الله. لحد ما تتاح، استخدم الشرح والمراجعة، وكل درس مكتوب فيه رقم صفحته في كتابك.",
      bookOpenLib: "افتح مكتبة الوزارة",
      bookPage: (n) => `صفحة ${n} في كتاب الوزارة`,
      officialExam: "امتحان رسمي من الوزارة",
      officialSrc: "الامتحان ده منشور على منصة أبناؤنا في الخارج التابعة لوزارة التربية والتعليم، وبيتفتح من موقع الوزارة مباشرة.",
      openExam: "افتح الامتحان",
      parentCta: "تابع أبناءك من أي جهاز",
      parentCtaSub: "سجّل دخول كولي أمر بحساب جوجل، وضيف أبناءك، واربط موبايلاتهم بكود",
      parentCtaBtn: "سجّل الدخول بجوجل",
      stageK: "رياض الأطفال والصفوف الأولى",
      youngNote: "الصف ده للأطفال أقل من 9 سنين، فمفيش حساب للطفل ولا كود ربط. ذاكر معاه من موبايلك، ونتايجه بتتحفظ هنا في متابعته.",
      studyWith: (n) => `ذاكر مع ${n}`, studyWithSub: "افتح الدروس والتدريبات باسمه على موبايلك",
      listen: "اسمع", practiceT: "تدريبات", practiceSub: "أسئلة بالصور والصوت على كل الدروس", noVoice: "القراية بالصوت مش متاحة على الجهاز ده", noYoungCode: "الكود مش متاح للصفوف دي",
      bookLoading: "بيتحمّل الكتاب…", bookFail: "مقدرناش نحمّل الكتاب. اتأكد من الإنترنت وجرب تاني.",
      bookSaved: "الكتاب محفوظ على جهازك وتقدر تقراه من غير نت",
      page: (a, b) => `صفحة ${a} من ${b}`, goPage: "روح لصفحة",
      zoomIn: "تكبير", zoomOut: "تصغير",
      tryAgain: "جرب تاني",
      gradeSoon: "شرح وأسئلة الصف ده بيتجهزوا، وهيتضافوا من غير ما تحتاج تحدّث التطبيق.",
      termSoon: "محتوى الترم ده هيتضاف قريب.",
      loading: "لحظة…",
      contentFail: "مقدرناش نحمّل المحتوى. اتأكد من الإنترنت وجرب تاني.",
      offline: "بتعرض نسخة محفوظة من المحتوى.",
      continueL: "كمّل من حيث وقفت",
      countdown: (d) => `باقي ${d} يوم على الامتحانات`,
      examsSoon: "مواعيد الامتحانات لسه متعلنتش",
      // profiles
      profileLocal: "تقدمك محفوظ على الجهاز ده بس",
      profileSynced: "تقدمك بيوصل لولي أمرك",
      hello: (n) => `أهلًا يا ${n}`,
      studyingAs: (n) => `بتذاكر دلوقتي باسم ${n}`,
      stopStudyAs: "خروج",
      changeGrade: "غيّر الصف",
      myGrade: "صفي",
      // accounts
      accounts: "الحسابات",
      parentTitle: "حساب ولي الأمر", parentSub: "سجّل أبناءك وتابع مذاكرتهم ودرجاتهم",
      studentTitle: "أنا طالب", studentSub: "عندي كود ربط من ولي أمري",
      parentIntro: "سجّل الدخول بحساب جوجل، وضيف أبناءك وصفوفهم. كل ابن بياخد كود يربط بيه موبايله أو التابلت بتاعه، وإنت تتابع دروسه ودرجاته من حسابك.",
      p1: "تابع الدروس اللي خلّصها كل ابن",
      p2: "شوف درجاته في كل امتحان ومتوسطه في كل مادة",
      p3: "اعرف المواد اللي محتاج يذاكرها أكتر",
      signIn: "سجّل الدخول بجوجل", signingIn: "بنسجّل دخولك…",
      accUnavailable: "حسابات أولياء الأمور مش متاحة في النسخة دي. تقدر تذاكر عادي، وتقدمك هيتحفظ على الجهاز.",
      studentDeviceWarn: "الجهاز ده مربوط كجهاز طالب. لو سجّلت دخول كولي أمر هنا، ربط الطالب هيتلغي.",
      continueAnyway: "كمّل",
      myKids: "أبنائي", addKid: "ضيف ابن أو ابنة", kidName: "الاسم", kidGrade: "الصف",
      save: "حفظ", cancel: "إلغاء", close: "إغلاق", del: "حذف",
      noKids: "لسه مضفتش أبناء. ضيف ابنك وصفه عشان تتابع مذاكرته.",
      importKids: (n) => `عندك ${n} من أبنائك محفوظين على الجهاز. نضيفهم لحسابك؟`, importYes: "ضيفهم",
      devices: (n) => (n ? `مربوط على ${n} ${n === 1 ? "جهاز" : n === 2 ? "جهازين" : "أجهزة"}` : "مش مربوط بجهاز لسه"),
      lastActive: "آخر نشاط", never: "لسه مذاكرش",
      avg: "المتوسط", lessonsDone: "دروس خلّصها", examsDone: "امتحانات حلّها",
      linkCode: "كود ربط جهاز ابنك",
      linkCodeHint: "افتح التطبيق على موبايل ابنك، وادخل «مذاكرتي» ثم «أنا طالب»، واكتب الكود ده. الكود شغال يومين ولمرة واحدة.",
      codeValid: (d) => `شغال لحد ${d}`,
      newCode: "اعمل كود ربط", newCodeAgain: "اعمل كود جديد",
      share: "مشاركة", copy: "نسخ", copied: "اتنسخ",
      shareText: (n, c) => `كود ربط ${n} في تطبيق دليل أبنائنا بالخارج: ${c}\nافتح «مذاكرتي» ← «أنا طالب» واكتب الكود.`,
      studyHere: (n) => `ذاكر باسم ${n} على الجهاز ده`,
      studyHereSub: "لو ابنك بيذاكر على نفس موبايلك أو التابلت",
      editKid: "تعديل البيانات", deleteKid: "حذف الابن من الحساب",
      deleteKidQ: (n) => `تحذف ${n}؟`, deleteKidBody: "كل درجاته وتقدمه هيتمسحوا ومش هينفع ترجعهم.",
      unlink: "إلغاء ربط الأجهزة", unlinkBody: "الأجهزة المربوطة هتخرج من حسابه، وهيحتاج كود جديد عشان يرجع.",
      unlinked: "اتلغى ربط الأجهزة",
      bySubject: "حسب المادة", recent: "آخر الامتحانات", weak: "محتاج يذاكر أكتر في",
      noResults: "لسه محلّش امتحانات.",
      signOut: "تسجيل الخروج",
      deleteAll: "حذف حساب ولي الأمر",
      deleteAllQ: "تحذف حسابك وكل بيانات أبنائك؟",
      deleteAllBody: "هنمسح أبناءك وكل درجاتهم وتقدمهم، وحساب ولي الأمر نفسه. مش هينفع ترجعهم.",
      deleted: "اتمسح الحساب",
      reauth: "لأمان حسابك، سجّل الدخول تاني وبعدين احذف.",
      signedInAs: "مسجّل باسم",
      // student linking
      enterCode: "اكتب كود الربط اللي معاك من ولي أمرك",
      codePh: "8 حروف وأرقام",
      link: "اربط", linking: "بنربط…",
      linked: (n) => `أهلًا يا ${n}! جهازك اتربط بحساب ولي أمرك.`,
      codeBad: "الكود غلط أو خلص. اطلب من ولي أمرك كود جديد.",
      codeParent: "إنت مسجّل دخول كولي أمر على الجهاز ده. افتح حساب ولي الأمر واختار «ذاكر باسم ابنك».",
      leaveLink: "إلغاء ربط الجهاز ده",
      leaveQ: "تلغي ربط الجهاز ده؟", leaveBody: "تقدمك اللي فات هيفضل عند ولي أمرك، وهتحتاج كود جديد عشان ترجع.",
      unlinkedSelf: "الجهاز ده اتشال من حساب ولي أمرك",
      demo: "نسخة تجربة: الحسابات هنا وهمية ومحفوظة على المتصفح بس.",
      genericErr: "حصلت مشكلة. جرب تاني بعد شوية.",
      saveErr: "ماقدرناش نحفظ التغيير ده. جرب تاني بعد شوية، ولو المشكلة فضلت كلّمنا.",
      netErr: "مفيش إنترنت. جرب تاني لما النت يرجع.",
      settings: "إعدادات المذاكرة",
      clearBooks: "امسح الكتب المحفوظة", clearedBooks: "اتمسحت الكتب المحفوظة",
      resetLocal: "امسح تقدمي على الجهاز ده", resetLocalQ: "تمسح تقدمك المحفوظ على الجهاز ده؟", resetDone: "اتمسح التقدم",
      historyT: "سجل امتحاناتي", noHistory: "لسه محلّتش امتحانات.",
      progress: "تقدمك",
      stats: (a, b) => `${a} من ${b} ${lessonWord(b)}`,
      explainSoon: "الشرح والأسئلة هيتضافوا قريب",
      english: "",
      ago: (d) => (d === 0 ? "النهارده" : d === 1 ? "إمبارح" : `من ${d} يوم`)
    },
    en: {
      tab: "Study",
      title: "Study",
      lead: "Ministry books, lessons and exams for every grade from KG to Secondary 2.",
      chooseGrade: "Choose a grade",
      soon: "Soon", available: "Available",
      term: (n) => (n === 1 ? "First term" : "Second term"),
      book: "Textbook", bookSub: "The official Ministry book, opens inside the app",
      explain: "Lessons", explainSub: "Full explanations, unit by unit",
      past: "Past exams", pastSub: "Solve the last 5 years' exams and get them marked",
      review: "Review & expected questions", reviewSub: "Unit questions and mock exams in the same format",
      mistakes: "Review your mistakes", mistakesSub: (n) => `${n} questions you got wrong before`,
      noMistakes: "No mistakes to review right now. Well done!",
      saved: "Saved lessons", noSaved: "Star a lesson to come back to it quickly.",
      units: "Units", unit: "Unit", lessonsN: (n) => `${n} lesson${n === 1 ? "" : "s"}`,
      markDone: "I finished this lesson", done: "Done", nextLesson: "Next lesson", prevLesson: "Previous lesson",
      saveLesson: "Save lesson", unsaveLesson: "Remove from saved",
      checkYourself: "Check yourself",
      example: "Example", solution: "Solution", showSolution: "Show solution", tip: "Note", def: "Definition",
      questionsN: (n) => `${n} questions`, minutesN: (n) => `${n} min`,
      best: "Best", tries: (n) => `Solved ${n} time${n === 1 ? "" : "s"}`,
      startTitle: "How do you want to solve it?",
      modePractice: "Practice", modePracticeSub: "See if you're right after each question. No timer.",
      modeExam: "Timed exam", modeExamSub: (n) => `Like the real exam: ${n} minutes, results at the end.`,
      qOf: (i, n) => `Question ${i} of ${n}`,
      check: "Check", next: "Next", prev: "Back", finish: "Submit", finishPractice: "See result",
      correct: "Correct", wrong: "Wrong", rightAnswer: "Correct answer:", yourAnswer: "Your answer:", noAnswer: "No answer",
      showAnswer: "Show answer", revealed: "You viewed the answer, so this one won't count",
      typeAnswer: "Type your answer", tfTrue: "True", tfFalse: "False",
      unanswered: (n) => `${n} question${n === 1 ? " is" : "s are"} unanswered. Submit anyway?`,
      submitAnyway: "Submit", keepGoing: "Keep going",
      exitQuiz: "Leave this exam?", exitQuizBody: "Your answers in this attempt won't be saved.", exit: "Leave",
      timeUp: "Time's up. Your exam was submitted.",
      result: "Result", scoreOf: (a, b) => `${a} of ${b}`,
      msg: (p) => (p >= 85 ? "Excellent, keep it up!" : p >= 65 ? "Very good. Review your mistakes to reach the top." : p >= 50 ? "Needs some review. Go back to the lessons and try again." : "Don't worry. Study these lessons again and retry."),
      reviewAnswers: "Review answers", retry: "Try again", retryWrong: "Retry wrong ones", backSubject: "Back to subject",
      time: "Time",
      pastSoon: "The official exam will be added soon",
      pastNote: "These are the Ministry's official exams for Egyptians abroad, as published. Solve them on paper, then check yourself with the lessons and review exams.",
      noSets: "No questions here yet.",
      expected: "Expected mock exams", unitReview: "Unit review",
      contentNote: "These lessons and questions are practice material written for the app. The Ministry book is the official reference.",
      bookNone: "Ministry books will be available in the app soon. Meanwhile, use the lessons and reviews; every lesson shows its page number in your book.",
      bookOpenLib: "Open the Ministry library",
      bookPage: (n) => `Page ${n} in the Ministry book`,
      officialExam: "Official Ministry exam",
      officialSrc: "This exam is published on the Ministry of Education's platform for Egyptian students abroad and opens directly from the Ministry's site.",
      openExam: "Open the exam",
      parentCta: "Follow your children from any device",
      parentCtaSub: "Sign in as a parent with Google, add your children and link their phones with a code",
      parentCtaBtn: "Sign in with Google",
      stageK: "Kindergarten and early grades",
      youngNote: "This grade is for children under 9, so there is no child account or link code. Study together on your phone, and the results are saved here.",
      studyWith: (n) => `Study with ${n}`, studyWithSub: "Open lessons and practice under their name on your phone",
      listen: "Listen", practiceT: "Practice", practiceSub: "Picture and audio questions on every lesson", noVoice: "Read-aloud is not available on this device", noYoungCode: "Codes are not available for these grades",
      bookLoading: "Loading the book…", bookFail: "Couldn't load the book. Check your connection and try again.",
      bookSaved: "Saved on your device, readable offline",
      page: (a, b) => `Page ${a} of ${b}`, goPage: "Go to page",
      zoomIn: "Zoom in", zoomOut: "Zoom out",
      tryAgain: "Try again",
      gradeSoon: "Lessons and questions for this grade are being prepared and will appear without an app update.",
      termSoon: "This term's content will be added soon.",
      loading: "Loading…",
      contentFail: "Couldn't load the content. Check your connection and try again.",
      offline: "Showing a saved copy of the content.",
      continueL: "Continue where you left off",
      countdown: (d) => `${d} days until the exams`,
      examsSoon: "Exam dates not announced yet",
      profileLocal: "Your progress is saved on this device only",
      profileSynced: "Your progress is shared with your parent",
      hello: (n) => `Hi ${n}`,
      studyingAs: (n) => `Studying as ${n}`,
      stopStudyAs: "Exit",
      changeGrade: "Change grade",
      myGrade: "My grade",
      accounts: "Accounts",
      parentTitle: "Parent account", parentSub: "Add your children and follow their study and scores",
      studentTitle: "I'm a student", studentSub: "I have a link code from my parent",
      parentIntro: "Sign in with Google and add your children and their grades. Each child gets a code to link their phone or tablet, and you follow their lessons and scores from your account.",
      p1: "See which lessons each child has finished",
      p2: "See every exam score and the average per subject",
      p3: "Find the subjects that need more study",
      signIn: "Sign in with Google", signingIn: "Signing you in…",
      accUnavailable: "Parent accounts aren't available in this version. You can still study, and progress is saved on this device.",
      studentDeviceWarn: "This device is linked as a student device. Signing in as a parent here will unlink the student.",
      continueAnyway: "Continue",
      myKids: "My children", addKid: "Add a child", kidName: "Name", kidGrade: "Grade",
      save: "Save", cancel: "Cancel", close: "Close", del: "Delete",
      noKids: "No children yet. Add your child and their grade to follow their study.",
      importKids: (n) => `${n} of your children are saved on this device. Add them to your account?`, importYes: "Add them",
      devices: (n) => (n ? `Linked on ${n} device${n === 1 ? "" : "s"}` : "Not linked to a device yet"),
      lastActive: "Last active", never: "Hasn't studied yet",
      avg: "Average", lessonsDone: "Lessons done", examsDone: "Exams taken",
      linkCode: "Link code for your child's device",
      linkCodeHint: "Open the app on your child's phone, go to Study → I'm a student, and enter this code. It works once, for two days.",
      codeValid: (d) => `Valid until ${d}`,
      newCode: "Create a link code", newCodeAgain: "Create a new code",
      share: "Share", copy: "Copy", copied: "Copied",
      shareText: (n, c) => `Link code for ${n} in the Egyptians Abroad Guide app: ${c}\nOpen Study → I'm a student and enter the code.`,
      studyHere: (n) => `Study as ${n} on this device`,
      studyHereSub: "If your child studies on your phone or tablet",
      editKid: "Edit details", deleteKid: "Remove child from account",
      deleteKidQ: (n) => `Remove ${n}?`, deleteKidBody: "All their scores and progress will be deleted for good.",
      unlink: "Unlink devices", unlinkBody: "Linked devices will be removed and need a new code to return.",
      unlinked: "Devices unlinked",
      bySubject: "By subject", recent: "Recent exams", weak: "Needs more study in",
      noResults: "No exams taken yet.",
      signOut: "Sign out",
      deleteAll: "Delete parent account",
      deleteAllQ: "Delete your account and all your children's data?",
      deleteAllBody: "We'll delete your children, all their scores and progress, and the parent account itself. This can't be undone.",
      deleted: "Account deleted",
      reauth: "For your security, sign in again and then delete.",
      signedInAs: "Signed in as",
      enterCode: "Enter the link code from your parent",
      codePh: "8 letters and numbers",
      link: "Link", linking: "Linking…",
      linked: (n) => `Hi ${n}! Your device is linked to your parent's account.`,
      codeBad: "That code is wrong or expired. Ask your parent for a new one.",
      codeParent: "You're signed in as a parent on this device. Open the parent account and choose “Study as your child”.",
      leaveLink: "Unlink this device",
      leaveQ: "Unlink this device?", leaveBody: "Your past progress stays with your parent. You'll need a new code to come back.",
      unlinkedSelf: "This device was removed from your parent's account",
      demo: "Demo: accounts here are fake and stored in this browser only.",
      genericErr: "Something went wrong. Try again shortly.",
      saveErr: "We couldn't save this change. Try again shortly, and contact us if it keeps happening.",
      netErr: "No connection. Try again when you're back online.",
      settings: "Study settings",
      clearBooks: "Clear saved books", clearedBooks: "Saved books cleared",
      resetLocal: "Clear my progress on this device", resetLocalQ: "Clear your progress saved on this device?", resetDone: "Progress cleared",
      historyT: "My exam history", noHistory: "No exams taken yet.",
      progress: "Your progress",
      stats: (a, b) => `${a} of ${b} lessons`,
      explainSoon: "Lessons and questions coming soon",
      english: "Lessons and questions are in Arabic, like the official exams.",
      ago: (d) => (d === 0 ? "today" : d === 1 ? "yesterday" : `${d} days ago`)
    }
  };
  const s = (k, ...a) => {
    const t = (S[state.lang] || S.ar)[k];
    const v = t !== undefined ? t : S.ar[k];
    return typeof v === "function" ? v(...a) : v;
  };
  const ar = () => state.lang !== "en";
  const N = (o, base) => (o ? (state.lang === "en" && o[(base || "") + "en"] ? o[(base || "") + "en"] : o[(base || "") + "ar"] || o[base || "ar"] || "") : "");
  const num = (n) => ctx.fmtNum(n);

  /* ================= Extra icons ================= */
  const XI = {
    sound: '<path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z"/><path d="M15.5 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11"/>',
    study: '<path d="M2.5 5.5c3-1.3 6.2-1.3 9.5.8 3.3-2.1 6.5-2.1 9.5-.8V19c-3-1.3-6.2-1.3-9.5.8-3.3-2.1-6.5-2.1-9.5-.8z"/><path d="M12 6.3v13.5"/>',
    calc: '<rect x="5" y="2.5" width="14" height="19" rx="2.5"/><path d="M8 6.5h8M8.5 11h.01M12 11h.01M15.5 11h.01M8.5 14.5h.01M12 14.5h.01M15.5 14.5h.01M8.5 18h.01M12 18h3.5"/>',
    flask: '<path d="M9 3h6M10 3v6L4.5 18.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3"/><path d="M7.5 14h9"/>',
    map: '<path d="M9 4 3 6.5v13L9 17l6 2.5 6-2.5V4l-6 2.5z"/><path d="M9 4v13M15 6.5v13"/>',
    abc: '<path d="M4 18 8 6l4 12M5.3 14h5.4M15 6v12h3a3 3 0 0 0 0-6h-3M15 12h2.5a3 3 0 0 0 0-6H15"/>',
    pen2: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
    star: '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    play: '<path d="M7 4.5v15l12-7.5z"/>',
    timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M9.5 2.5h5"/>',
    redo: '<path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/>',
    list: '<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/>',
    archive: '<rect x="3" y="4" width="18" height="5" rx="1.5"/><path d="M5 9v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9M10 13h4"/>',
    minus: '<path d="M5 12h14"/>',
    link: '<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1"/>',
    family: '<circle cx="8" cy="7" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2.5 20a5.5 5.5 0 0 1 11 0M13.5 20a3.5 3.5 0 0 1 7 0"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'
  };
  const ic = (n, cls) => (XI[n]
    ? `<svg ${cls ? `class="${cls}"` : ""} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${XI[n]}</svg>`
    : icon(n, cls));

  /* ================= Catalog ================= */
  const DEFAULT_CATALOG = {
    updated: "2026-11-08",
    grades: [
      { id: "KG1", ar: "رياض أطفال 1", en: "KG 1", stage: "k", young: true, file: "study-KG1.json" },
      { id: "KG2", ar: "رياض أطفال 2", en: "KG 2", stage: "k", young: true, file: "study-KG2.json" },
      { id: "P1", ar: "الأول الابتدائي", en: "Primary 1", stage: "k", young: true, file: "study-P1.json" },
      { id: "P2", ar: "الثاني الابتدائي", en: "Primary 2", stage: "k", young: true, file: "study-P2.json" },
      { id: "P3", ar: "الثالث الابتدائي", en: "Primary 3", stage: "k", young: true, file: "study-P3.json" },
      { id: "P4", ar: "الرابع الابتدائي", en: "Primary 4", stage: "p", file: "study-P4.json" },
      { id: "P5", ar: "الخامس الابتدائي", en: "Primary 5", stage: "p", file: "study-P5.json" },
      { id: "P6", ar: "السادس الابتدائي", en: "Primary 6", stage: "p", file: "study-P6.json" },
      { id: "M1", ar: "الأول الإعدادي", en: "Preparatory 1", stage: "m", file: "study-M1.json" },
      { id: "M2", file: "study-M2.json", ar: "الثاني الإعدادي", en: "Preparatory 2", stage: "m" },
      { id: "M3", file: "study-M3.json", ar: "الثالث الإعدادي", en: "Preparatory 3", stage: "m" },
      { id: "S1", file: "study-S1.json", ar: "الأول الثانوي", en: "Secondary 1", stage: "s" },
      { id: "S2G", file: "study-S2G.json", ar: "الثاني الثانوي — عام", en: "Secondary 2 — General", stage: "s" },
      { id: "S2B", file: "study-S2B.json", ar: "الثاني الثانوي — بكالوريا", en: "Secondary 2 — Baccalaureate", stage: "s" }
    ],
    library: "https://ellibrary.moe.gov.eg/books/"
  };
  // ربط صفوف قائمة «أبنائي» القديمة بصفوف المذاكرة
  const OLD_GRADE = { KG1: "KG1", KG2: "KG2", P1: "P1", P2: "P2", P3: "P3", P4: "P4", P5: "P5", P6: "P6", M1: "M1", M2: "M2", M3: "M3", S1: "S1", S2: "S2G" };

  let catalog = store.get("study:c:study.json", null) || DEFAULT_CATALOG;
  const content = {}; // grade id -> { status, data, live }
  let catalogLoaded = false;

  const base = (() => {
    const u = (window.APP_CONFIG && APP_CONFIG.NEWS_URL) || "";
    return u && !u.startsWith("__") ? u.replace(/[^/]*$/, "") : "";
  })();

  async function fetchJSON(url, ms) {
    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), ms || 9000);
    try {
      const r = await fetch(url, { signal: ctrl.signal, cache: "no-store" });
      if (!r.ok) throw new Error("HTTP " + r.status);
      return await r.json();
    } finally { clearTimeout(to); }
  }
  // remote (GitHub) first, then the copy bundled in the app, then the cached copy — whichever is newest
  async function loadFile(name) {
    const key = "study:c:" + name;
    const cached = store.get(key, null);
    let remote = null, bundled = null;
    if (base) { try { remote = await fetchJSON(base + name + "?t=" + Math.floor(Date.now() / 6e5)); } catch (e) { remote = null; } }
    if (!remote) { try { bundled = await fetchJSON(name, 5000); } catch (e) { bundled = null; } }
    const pick = [remote, bundled, cached].filter(Boolean).sort((a, b) => String(b.updated || "").localeCompare(String(a.updated || "")))[0] || null;
    if (pick && pick !== cached) { try { store.set(key, pick); } catch (e) { /* storage full */ } }
    return { data: pick, live: base ? !!remote : true };
  }
  async function loadCatalog() {
    if (catalogLoaded) return;
    catalogLoaded = true;
    const r = await loadFile("study.json");
    if (r.data && Array.isArray(r.data.grades)) { catalog = r.data; refresh(); }
  }
  // under-9 grades: no child account, no link code, no ads, bigger UI with read-aloud
  const isYoung = (gid) => !!gid && (gradeInfo(gid) ? !!gradeInfo(gid).young : /^(KG\d|P[123])$/.test(gid));
  function curGrade() {
    const r = top();
    if (r.g) return r.g;
    if ((r.v === "quiz" || r.v === "result") && quiz) return quiz.g;
    if (profile && profile.mode === "parentAs") return profile.grade;
    return null;
  }
  const youngNow = () => isYoung(curGrade());
  function gradeInfo(id) { return (catalog.grades || []).find((g) => g.id === id) || DEFAULT_CATALOG.grades.find((g) => g.id === id) || null; }
  function gradeName(id) { const g = gradeInfo(id); return g ? N(g) : id || ""; }

  function ensureContent(gid) {
    const g = gradeInfo(gid);
    if (!g || !g.file) return null;
    const c = content[gid];
    if (c) return c;
    content[gid] = { status: "loading" };
    loadFile(g.file).then((r) => {
      if (r.data && Array.isArray(r.data.subjects)) { prepare(r.data); content[gid] = { status: "ok", data: r.data, live: r.live }; }
      else content[gid] = { status: "fail" };
      refresh();
    });
    return content[gid];
  }
  // ids for every question so mistakes can be tracked
  const QIDX = {};
  function prepare(d) {
    (d.subjects || []).forEach((sub) => {
      (sub.units || []).forEach((u) => (u.lessons || []).forEach((l) => {
        l.unit = u.id;
        (l.check || []).forEach((q, i) => { q.id = q.id || `${l.id}-c${i + 1}`; QIDX[q.id] = { q, sub: sub.id, g: d.grade }; });
      }));
      (sub.sets || []).forEach((set) => (set.q || []).forEach((q, i) => {
        q.id = q.id || `${set.id}-${i + 1}`; QIDX[q.id] = { q, sub: sub.id, g: d.grade };
      }));
    });
  }
  const gradeData = (gid) => (content[gid] && content[gid].status === "ok" ? content[gid].data : null);
  const subjectOf = (gid, sid) => { const d = gradeData(gid); return d ? (d.subjects || []).find((x) => x.id === sid) : null; };
  function allLessons(sub, term) {
    const out = [];
    (sub.units || []).filter((u) => !term || (u.term || 1) === term).forEach((u) => (u.lessons || []).forEach((l) => out.push(l)));
    return out;
  }
  function findLesson(sub, lid) { for (const u of sub.units || []) for (const l of u.lessons || []) if (l.id === lid) return { u, l }; return null; }

  /* ================= Local profile & progress ================= */
  // profile: { mode: "guest" | "student" | "parentAs", grade, sid?, name?, uid? }
  let profile = store.get("study:profile", null);
  const saveProfile = () => store.set("study:profile", profile);
  const progKey = () => "study:prog:" + (profile && profile.sid ? profile.sid : "guest");
  let prog = null;
  function P_() {
    if (!prog || prog.__k !== progKey()) {
      prog = Object.assign({ lessons: {}, results: [], wrong: {}, marks: {}, last: null, pages: {} }, store.get(progKey(), {}));
      prog.__k = progKey();
    }
    return prog;
  }
  function saveProg() { const p = P_(); const copy = Object.assign({}, p); delete copy.__k; store.set(progKey(), copy); }
  const term = () => state.studyTerm || 1;

  /* ================= Backends (accounts) ================= */
  const marker = (type, extra) => Object.assign({ __type__: type }, extra);
  function nativeBackend() {
    const Auth = P("FirebaseAuthentication"), Fs = P("FirebaseFirestore");
    if (!Auth || !Fs) return null;
    const doc = async (ref) => {
      const r = await Fs.getDocument({ reference: ref });
      return r && r.snapshot && r.snapshot.data ? Object.assign({ id: r.snapshot.id }, r.snapshot.data) : null;
    };
    const col = async (ref, where, order, limit) => {
      const o = { reference: ref };
      if (where) o.compositeFilter = { type: "and", queryConstraints: where.map(([f, op, v]) => ({ type: "where", fieldPath: f, opStr: op, value: v })) };
      const qc = [];
      if (order) qc.push({ type: "orderBy", fieldPath: order[0], directionStr: order[1] });
      if (limit) qc.push({ type: "limit", limit });
      if (qc.length) o.queryConstraints = qc;
      const r = await Fs.getCollection(o);
      return ((r && r.snapshots) || []).filter((d) => d.data).map((d) => Object.assign({ id: d.id }, d.data));
    };
    // small batches: security rules allow ~20 document lookups per batched write, and each op here does one
    const batch = async (ops) => { for (let i = 0; i < ops.length; i += 10) await Fs.writeBatch({ operations: ops.slice(i, i + 10) }); };
    return {
      demo: false,
      async user() { const r = await Auth.getCurrentUser(); return (r && r.user) || null; },
      async anon() {
        const u = await this.user();
        if (u) return u;
        const r = await Auth.signInAnonymously();
        return r.user;
      },
      kids: (uid) => col("students", [["parentUid", "==", uid]]),
      kid: (sid) => doc("students/" + sid),
      async addKid(uid, d) {
        const r = await Fs.addDocument({ reference: "students", data: { parentUid: uid, name: d.name, grade: d.grade, devices: [], createdAt: Date.now() } });
        return r.reference.id;
      },
      editKid: (sid, d) => Fs.updateDocument({ reference: "students/" + sid, data: { name: d.name, grade: d.grade } }),
      async delKid(sid, kid) {
        const res = await col(`students/${sid}/results`);
        const ops = res.map((r) => ({ type: "delete", reference: `students/${sid}/results/${r.id}` }));
        ops.push({ type: "delete", reference: `students/${sid}/progress/main` });
        if (kid && kid.code) ops.push({ type: "delete", reference: "linkCodes/" + kid.code });
        await batch(ops);
        await Fs.deleteDocument({ reference: "students/" + sid });
      },
      async newCode(uid, sid, old) {
        const code = genCode(), exp = Date.now() + 48 * 36e5;
        const ops = [];
        if (old) ops.push({ type: "delete", reference: "linkCodes/" + old });
        ops.push({ type: "set", reference: "linkCodes/" + code, data: { sid, parentUid: uid, expiresAt: exp } });
        ops.push({ type: "update", reference: "students/" + sid, data: { code, codeExp: exp } });
        await batch(ops);
        return { code, exp };
      },
      async claim(code) {
        const u = await this.anon();
        if (!u.isAnonymous) throw new Error("parent-device");
        let c = null;
        try { c = await doc("linkCodes/" + code); } catch (e) { c = null; }
        if (!c || !c.sid) throw new Error("code-bad");
        await Fs.updateDocument({ reference: "students/" + c.sid, data: { devices: marker("arrayUnion", { elements: [u.uid] }), claim: code, code: null, codeExp: 0 } });
        const kid = await doc("students/" + c.sid);
        Fs.deleteDocument({ reference: "linkCodes/" + code }).catch(() => {});
        return { sid: c.sid, name: kid.name, grade: kid.grade, uid: u.uid };
      },
      leave: (sid, uid) => Fs.updateDocument({ reference: "students/" + sid, data: { devices: marker("arrayRemove", { elements: [uid] }) } }),
      unlink: (sid) => Fs.updateDocument({ reference: "students/" + sid, data: { devices: [] } }),
      results: (sid) => col(`students/${sid}/results`, null, ["at", "desc"], 60),
      progress: (sid) => doc(`students/${sid}/progress/main`),
      addResult: (sid, r) => Fs.addDocument({ reference: `students/${sid}/results`, data: r }),
      lesson: (sid, id) => Fs.setDocument({ reference: `students/${sid}/progress/main`, data: { lessons: { [id]: Date.now() }, at: Date.now() }, merge: true }),
      async deleteParent(uid) {
        const kids = await this.kids(uid);
        for (const k of kids) await this.delKid(k.id, k);
        await Auth.deleteUser();
      },
      async signOutAnon() { const u = await this.user(); if (u && u.isAnonymous) await Auth.signOut(); }
    };
  }

  // Browser preview: everything lives in this browser's storage.
  function demoBackend() {
    const K = "study:demoDb";
    const db = () => store.get(K, { students: {}, codes: {}, results: {}, progress: {} });
    const put = (d) => store.set(K, d);
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    let anonUid = store.get("study:demoAnon", null);
    return {
      demo: true,
      async user() {
        const me = account && account.user && account.user();
        if (me) return { uid: me.uid, isAnonymous: false };
        return anonUid ? { uid: anonUid, isAnonymous: true } : null;
      },
      async anon() { const u = await this.user(); if (u) return u; anonUid = "demo-anon-" + Math.random().toString(36).slice(2, 8); store.set("study:demoAnon", anonUid); return { uid: anonUid, isAnonymous: true }; },
      async kids(uid) { await wait(250); const d = db(); return Object.keys(d.students).map((id) => Object.assign({ id }, d.students[id])).filter((k) => k.parentUid === uid); },
      async kid(sid) { await wait(150); const k = db().students[sid]; return k ? Object.assign({ id: sid }, k) : null; },
      async addKid(uid, x) { await wait(250); const d = db(); const id = "kid" + Date.now().toString(36); d.students[id] = { parentUid: uid, name: x.name, grade: x.grade, devices: [], createdAt: Date.now() }; put(d); return id; },
      async editKid(sid, x) { await wait(200); const d = db(); Object.assign(d.students[sid], { name: x.name, grade: x.grade }); put(d); },
      async delKid(sid) { await wait(250); const d = db(); delete d.students[sid]; delete d.results[sid]; delete d.progress[sid]; Object.keys(d.codes).forEach((c) => { if (d.codes[c].sid === sid) delete d.codes[c]; }); put(d); },
      async newCode(uid, sid, old) { await wait(250); const d = db(); if (old) delete d.codes[old]; const code = genCode(), exp = Date.now() + 48 * 36e5; d.codes[code] = { sid, parentUid: uid, expiresAt: exp }; Object.assign(d.students[sid], { code, codeExp: exp }); put(d); return { code, exp }; },
      async claim(code) {
        await wait(500);
        const u = await this.anon();
        if (!u.isAnonymous) throw new Error("parent-device");
        const d = db(); const c = d.codes[code];
        if (!c || c.expiresAt < Date.now()) throw new Error("code-bad");
        const k = d.students[c.sid]; k.devices = (k.devices || []).concat([u.uid]); k.code = null; k.codeExp = 0; delete d.codes[code]; put(d);
        return { sid: c.sid, name: k.name, grade: k.grade, uid: u.uid };
      },
      async leave(sid, uid) { const d = db(); const k = d.students[sid]; if (k) { k.devices = (k.devices || []).filter((x) => x !== uid); put(d); } },
      async unlink(sid) { await wait(200); const d = db(); if (d.students[sid]) { d.students[sid].devices = []; put(d); } },
      async results(sid) { await wait(200); return (db().results[sid] || []).slice().sort((a, b) => b.at - a.at).slice(0, 60); },
      async progress(sid) { await wait(150); return db().progress[sid] || null; },
      async addResult(sid, r) { const d = db(); (d.results[sid] = d.results[sid] || []).push(Object.assign({ id: "r" + Date.now() }, r)); put(d); },
      async lesson(sid, id) { const d = db(); const p = d.progress[sid] = d.progress[sid] || { lessons: {} }; p.lessons[id] = Date.now(); p.at = Date.now(); put(d); },
      async deleteParent(uid) { const kids = await this.kids(uid); for (const k of kids) await this.delKid(k.id); },
      async signOutAnon() { anonUid = null; store.set("study:demoAnon", null); }
    };
  }
  const backend = isNative ? nativeBackend() : demoBackend();
  const accountsOn = () => !!(backend && account && account.available);

  function genCode() {
    const A = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
    const b = new Uint8Array(8);
    (window.crypto || {}).getRandomValues ? crypto.getRandomValues(b) : b.forEach((_, i) => { b[i] = Math.floor(Math.random() * 256); });
    return Array.from(b, (x) => A[x % A.length]).join("");
  }
  // Only the link-code screen talks about codes; elsewhere a permission error means the save was refused.
  function errMsg(e, codeFlow) {
    const m = String((e && (e.message || e.code)) || e || "");
    if (/code-bad/i.test(m) || (codeFlow && /not-found|NOT_FOUND|permission|PERMISSION/i.test(m))) return s("codeBad");
    if (/permission|PERMISSION/i.test(m)) return s("saveErr");
    if (/parent-device/.test(m)) return s("codeParent");
    if (/network|unavailable|UNAVAILABLE|offline|Failed to fetch/i.test(m)) return s("netErr");
    return s("genericErr");
  }

  /* ---- syncing progress to the parent's account ---- */
  const synced = () => !!(profile && profile.sid && (profile.mode === "student" || profile.mode === "parentAs") && backend);
  // the parent's cached view of this child is stale once something new is saved
  function syncResult(r) { if (synced()) { delete parent.stats[profile.sid]; backend.addResult(profile.sid, r).catch(() => {}); } }
  function syncLesson(id) { if (synced()) { delete parent.stats[profile.sid]; backend.lesson(profile.sid, id).catch(() => {}); } }

  // student device: make sure the anonymous session is still the one linked
  async function checkStudentLink() {
    if (!profile || profile.mode !== "student" || !backend) return;
    try {
      const u = await backend.user();
      if (!u || (profile.uid && u.uid !== profile.uid)) { profile.unlinked = true; saveProfile(); refresh(); return; }
      const k = await backend.kid(profile.sid);
      if (!k || !(k.devices || []).includes(u.uid)) { profile.unlinked = true; saveProfile(); refresh(); return; }
      if (k.name !== profile.name || k.grade !== profile.grade) { profile.name = k.name; profile.grade = k.grade; profile.unlinked = false; saveProfile(); refresh(); }
    } catch (e) { /* offline: keep working locally */ }
  }

  /* ---- parent session ---- */
  const parent = { uid: null, kids: null, loading: false, err: false, stats: {} };
  const me = () => (account && account.user ? account.user() : null);
  async function loadKids(force) {
    const u = me();
    if (!u || !accountsOn()) { parent.uid = null; parent.kids = null; return; }
    if (!force && parent.uid === u.uid && (parent.kids || parent.loading)) return;
    parent.uid = u.uid; parent.loading = true; parent.err = false;
    try { parent.kids = (await backend.kids(u.uid)).sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0)); }
    catch (e) { parent.err = true; parent.kids = parent.kids || []; }
    parent.loading = false;
    refresh();
  }
  async function loadKidStats(sid, force) {
    const cur = parent.stats[sid];
    if (cur && !force && (cur.loading || Date.now() - cur.at < 60000)) return;
    parent.stats[sid] = { loading: true, at: Date.now(), results: cur ? cur.results : [], progress: cur ? cur.progress : null };
    try {
      const [results, progress] = await Promise.all([backend.results(sid), backend.progress(sid)]);
      parent.stats[sid] = { loading: false, at: Date.now(), results: results || [], progress };
    } catch (e) { parent.stats[sid] = { loading: false, at: Date.now(), results: [], progress: null, err: true }; }
    refresh();
  }
  if (account && account.onChange) account.onChange(() => { parent.kids = null; parent.stats = {}; loadKids(); refresh(); });

  /* ================= Navigation ================= */
  // stack of routes: home | grade | subject | lessons | lesson | sets | book | quiz | result | mistakes | saved | parent | kid | history
  let nav = [{ v: "home" }];
  const top = () => nav[nav.length - 1];
  function push(r) {
    stopSay();
    if (top().v === "quiz" && r.v === "result") nav.pop();
    nav.push(r); ctx.refresh(true);
  }
  function replace(r) { stopSay(); nav[nav.length - 1] = r; ctx.refresh(true); }
  function back() {
    if (nav.length <= 1) return false;
    stopSay();
    if (top().v === "quiz" && quiz && !quiz.done) { confirmExitQuiz(); return true; }
    leaveRoute(top());
    nav.pop();
    ctx.refresh(true);
    return true;
  }
  function reset() { leaveRoute(top()); nav = [{ v: "home" }]; }
  function leaveRoute(r) {
    if (r.v === "book") closePdf();
    if (r.v === "quiz") stopTimer();
  }
  function refresh() { ctx.rerender(); }

  /* ================= Small helpers ================= */
  // **bold**, {{ltr math}}, new lines.
  // Purely numeric expressions (3 : 5, 12 − 4 = 8) are kept left-to-right everywhere so a ratio never
  // flips inside Arabic text; algebra with Arabic letters (3س − 5) stays right-to-left like Arabic books.
  const LTR = (m) => `<bdi dir="ltr" class="m">${m}</bdi>`;
  function rich(t) {
    const keep = [];
    let h = esc(t).replace(/\{\{(.+?)\}\}/g, (_, m) => { keep.push(LTR(m)); return `\u0001${keep.length - 1}\u0001`; })
      .replace(/\[\[(.+?)\]\]/g, (_, m) => { keep.push(`<bdi dir="ltr" class="en">${m}</bdi>`); return `\u0001${keep.length - 1}\u0001`; });
    h = h.replace(/-?\d[\d.%²³]*(?:\s*[:+\-−×÷=\/]\s*-?\(?-?\d[\d.%²³)]*)+/g, (m, off, str) => {
      if (!/[:+\-−×÷=]/.test(m.replace(/^-/, ""))) return m;
      const prev = str.charAt(off - 1), next = str.charAt(off + m.length);
      const prevNS = str.slice(0, off).replace(/\s+$/, "").slice(-1), nextNS = str.slice(off + m.length).replace(/^\s+/, "").charAt(0);
      const arab = /[؀-ۿ]/, op = /[:+\-−×÷=\/(]/;
      // part of a longer algebraic expression (3س − 5 = 2س): leave it right-to-left as a whole
      if (arab.test(prev) || arab.test(next) || op.test(prevNS) || op.test(nextNS)) return m;
      return LTR(m);
    });
    return h
      .replace(/\u0001(\d+)\u0001/g, (_, i) => keep[+i])
      .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
      .replace(/\n/g, "<br>");
  }
  const pctTone = (p) => (p >= 85 ? "great" : p >= 65 ? "good" : p >= 50 ? "ok" : "low");
  const daysAgo = (ts) => Math.max(0, Math.floor((Date.now() - ts) / 864e5));
  const fmtDay = (ts) => ctx.fmtDate(new Date(ts).toISOString().slice(0, 10), { day: "numeric", month: "short" });
  const fmtDur = (sec) => `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, "0")}`;
  const SUBJ_IC = { math: "calc", science: "flask", discover: "eye", social: "map", arabic: "pen2", english: "abc", religion: "study", ict: "tools", history: "map", geography: "map", philosophy: "study", physics: "flask", chemistry: "flask", biology: "flask" };
  const subjIcon = (sub) => ic(sub.icon || SUBJ_IC[sub.id] || "study");
  function shuffle(a) { const r = a.slice(); for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; }
  function ring(pct, size, label) {
    const r = 15.5, c = 2 * Math.PI * r, v = Math.max(0, Math.min(100, pct || 0));
    return `<span class="st-ring ${pctTone(v)}" style="width:${size}px;height:${size}px" role="img" aria-label="${esc(label || num(Math.round(v)) + "%")}">
      <svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="${r}" class="bg"/><circle cx="18" cy="18" r="${r}" class="fg" stroke-dasharray="${(c * v / 100).toFixed(2)} ${c.toFixed(2)}"/></svg>
      <b>${num(Math.round(v))}<small>%</small></b></span>`;
  }
  function subjStats(gid, sub) {
    const p = P_();
    const lessons = allLessons(sub).filter((l) => (l.body || []).length);
    const doneN = lessons.filter((l) => p.lessons[l.id]).length;
    const res = p.results.filter((r) => r.g === gid && r.s === sub.id);
    const avg = res.length ? Math.round(res.reduce((a, r) => a + r.pct, 0) / res.length) : null;
    return { doneN, total: lessons.length, avg, n: res.length };
  }
  const wrongCount = (gid, sid) => Object.keys(P_().wrong).filter((k) => { const w = P_().wrong[k]; return w.g === gid && (!sid || w.s === sid) && QIDX[k]; }).length;

  // نَحْوِي (nahwi.js): interactive grammar lessons + games, rendered inside the study stack
  const nhGrade = () => curGrade() || (profile && profile.grade) || "";
  const nhApi = {
    kidsDefault: () => /^(KG\d|P\d)$/.test(nhGrade()),
    say: (t) => say(t), stopSay: () => stopSay(), num, toast, top: () => top(),
    push: (r) => push(Object.assign({ g: top().g }, r)), replace: (r) => replace(Object.assign({ g: top().g }, r)), back: () => back(),
    who: () => (profile && profile.sid) || "guest",
    syncLesson: (id) => syncLesson(id),
    refresh: (scroll) => ctx.refresh(!!scroll)
  };
  const nahwiCard = (g) => window.Nahwi ? `<button class="st-cont nh-entry" data-st="nahwi"${g ? ` data-g="${esc(g)}"` : ""}>
    <span class="ic">🦉</span><span class="grow"><b>${ar() ? "نَحْوِي: النحو ببساطة" : "Nahwi: Arabic grammar made easy"}</b><small>${ar() ? `${num(window.Nahwi.count)} درسًا في 4 مستويات، تدريب على الإعراب، ألعاب وأوسمة` : "Levels, parsing practice, games and badges"}</small></span><span class="end">${icon("chev", "flip")}</span></button>` : "";

  /* ================= Views ================= */
  function view() {
    loadCatalog();
    const r = top();
    let body = "";
    switch (r.v) {
      case "home": body = vHome(); break;
      case "grade": body = vGrade(r); break;
      case "subject": body = vSubject(r); break;
      case "lessons": body = vLessons(r); break;
      case "lesson": body = vLesson(r); break;
      case "sets": body = vSets(r); break;
      case "book": body = vBook(r); break;
      case "quiz": body = vQuiz(); break;
      case "result": body = vResult(); break;
      case "saved": body = vSaved(r); break;
      case "parent": body = vParent(); break;
      case "kid": body = vKid(r); break;
      case "history": body = vHistory(); break;
      case "nahwi": case "nahwiL": case "nahwiG": body = window.Nahwi ? window.Nahwi.view(r, nhApi) : vHome(); break;
      default: body = vHome();
    }
    return `<div class="st${youngNow() ? " young" : ""}">${body}</div>`;
  }

  function profileBar() {
    if (!profile) return "";
    if (profile.mode === "student") {
      if (profile.unlinked) {
        return `<div class="st-who warn"><span class="avatar">${esc((profile.name || "?").charAt(0))}</span>
          <span class="grow"><b>${esc(s("hello", profile.name || ""))}</b><small>${s("unlinkedSelf")}</small></span>
          <button class="btn ghost" data-st="studentLink">${s("link")}</button></div>`;
      }
      return `<div class="st-who"><span class="avatar">${esc((profile.name || "?").charAt(0))}</span>
        <span class="grow"><b>${esc(s("hello", profile.name || ""))}</b><small>${esc(gradeName(profile.grade))} · ${s("profileSynced")}</small></span></div>`;
    }
    if (profile.mode === "parentAs") {
      return `<div class="st-who as"><span class="avatar">${esc((profile.name || "?").charAt(0))}</span>
        <span class="grow"><b>${esc(s("studyingAs", profile.name || ""))}</b><small>${esc(gradeName(profile.grade))} · ${s("profileSynced")}</small></span>
        <button class="btn ghost" data-st="stopAs">${s("stopStudyAs")}</button></div>`;
    }
    return "";
  }

  function countdownCard() {
    const ex = ctx.nextExam && ctx.nextExam();
    if (!ex) return "";
    if (ex.confirmed && ex.date) {
      const d = Math.ceil((new Date(ex.date + "T08:00:00").getTime() - Date.now()) / 864e5);
      if (d < 0) return "";
      return `<div class="st-count" role="note">${ic("timer")}<span class="grow"><b>${esc(s("countdown", num(d)))}</b><small>${esc(state.lang === "en" ? ex.title_en || ex.title_ar : ex.title_ar)}</small></span></div>`;
    }
    return `<div class="st-count soft" role="note">${ic("timer")}<span class="grow"><b>${s("examsSoon")}</b><small>${esc(state.lang === "en" ? ex.expected_en || ex.title_en || "" : ex.expected_ar || ex.title_ar || "")}</small></span></div>`;
  }

  function vHome() {
    const myGrade = profile && profile.grade;
    if (myGrade) ensureContent(myGrade);
    const last = P_().last;
    let cont = "";
    if (last && last.g && last.s && last.l) {
      const sub = subjectOf(last.g, last.s);
      const f = sub && findLesson(sub, last.l);
      if (f) cont = `<button class="st-cont" data-st="lesson" data-g="${esc(last.g)}" data-s="${esc(last.s)}" data-l="${esc(last.l)}">
        <span class="ic">${subjIcon(sub)}</span><span class="grow"><small>${s("continueL")}</small><b>${esc(N(f.l))}</b><small>${esc(N(sub))}</small></span><span class="end">${icon("chev", "flip")}</span></button>`;
    }
    const grades = catalog.grades || DEFAULT_CATALOG.grades;
    const gradeCard = (g) => {
      const mine = g.id === myGrade;
      return `<button class="st-grade${mine ? " mine" : ""}${g.file ? "" : " later"}" data-st="grade" data-g="${esc(g.id)}">
        <span class="st-gnum">${esc(gradeShort(g))}</span>
        <b>${esc(N(g))}</b>
        <small>${mine ? s("myGrade") : g.file ? s("available") : s("soon")}</small>
      </button>`;
    };
    const stages = [["k", s("stageK")], ["p", ar() ? "المرحلة الابتدائية" : "Primary"], ["m", ar() ? "المرحلة الإعدادية" : "Preparatory"], ["s", ar() ? "المرحلة الثانوية" : "Secondary"]];
    return `
      <h2 class="page-title">${s("title")}</h2>
      <p class="lead">${s("lead")}</p>
      ${state.lang === "en" ? `<p class="small" style="margin:2px 2px 0">${s("english")}</p>` : ""}
      ${profileBar()}
      ${parentCta()}
      ${countdownCard()}
      ${cont}
      ${nahwiCard("")}
      ${stages.map(([st, label]) => {
        const list = grades.filter((g) => (g.stage || stageOf(g.id)) === st);
        return list.length ? `<h2 class="sec">${esc(label)}</h2><div class="st-grades">${list.map(gradeCard).join("")}</div>` : "";
      }).join("")}
      ${accountsBlock()}
      <h2 class="sec">${s("settings")}</h2>
      <div class="panel">
        <button class="row" data-st="history"><span class="ic">${ic("chart")}</span><span class="grow"><span class="t">${s("historyT")}</span></span><span class="end">${icon("chev", "flip")}</span></button>
        <button class="row" data-st="clearBooks"><span class="ic">${ic("archive")}</span><span class="grow"><span class="t">${s("clearBooks")}</span></span></button>
        ${profile && profile.mode === "student" ? `<button class="row danger" data-st="leave"><span class="ic">${ic("link")}</span><span class="grow"><span class="t">${s("leaveLink")}</span></span></button>`
          : `<button class="row" data-st="resetLocal"><span class="ic">${icon("trash")}</span><span class="grow"><span class="t">${s("resetLocal")}</span></span></button>`}
      </div>
      <p class="disclaimer">${s("contentNote")}</p>
    `;
  }
  const stageOf = (id) => (/^(KG\d|P[123])$/.test(id) ? "k" : id[0] === "P" ? "p" : id[0] === "M" ? "m" : "s");
  function gradeShort(g) {
    const n = { KG1: "KG1", KG2: "KG2", P1: "١", P2: "٢", P3: "٣", P4: "٤", P5: "٥", P6: "٦", M1: "١", M2: "٢", M3: "٣", S1: "١", S2G: "٢", S2B: "٢" }[g.id];
    const en = { KG1: "KG1", KG2: "KG2", P1: "1", P2: "2", P3: "3", P4: "4", P5: "5", P6: "6", M1: "1", M2: "2", M3: "3", S1: "1", S2G: "2", S2B: "2" }[g.id];
    return (ar() ? n : en) || g.id;
  }

  // prominent sign-in card at the top of the study home and the main home screen
  function parentCta() {
    if (!accountsOn() || me() || (profile && profile.mode === "student" && !profile.unlinked)) return "";
    return `<section class="st-cta">
      <span class="ic">${ic("family")}</span>
      <div class="grow"><b>${s("parentCta")}</b><small>${s("parentCtaSub")}</small></div>
      <div class="st-cta-a">
        <button class="btn google" data-st="parentSignIn">${account.googleMark ? account.googleMark() : ""}${s("parentCtaBtn")}</button>
        <button class="link-btn" data-st="studentLink">${s("studentTitle")}</button>
      </div>
    </section>`;
  }
  function accountsBlock() {
    if (!accountsOn()) return "";
    const u = me();
    const isStudent = profile && profile.mode === "student" && !profile.unlinked;
    const rows = [];
    rows.push(`<button class="row" data-st="parent"><span class="ic">${ic("family")}</span><span class="grow"><span class="t">${s("parentTitle")}</span><span class="s">${u ? esc(s("signedInAs") + " " + (u.name || "")) : s("parentSub")}</span></span><span class="end">${icon("chev", "flip")}</span></button>`);
    if (!isStudent && !u) rows.push(`<button class="row" data-st="studentLink"><span class="ic">${ic("link")}</span><span class="grow"><span class="t">${s("studentTitle")}</span><span class="s">${s("studentSub")}</span></span><span class="end">${icon("chev", "flip")}</span></button>`);
    return `<h2 class="sec">${s("accounts")}</h2><div class="panel">${rows.join("")}</div>`;
  }

  function loadingBlock(c) {
    if (c && c.status === "fail") return `<div class="card"><p style="margin:0 0 10px">${s("contentFail")}</p><button class="btn ghost" data-st="reloadContent">${ic("redo")}${s("tryAgain")}</button></div>`;
    return `<div class="st-skel" aria-busy="true"><div></div><div></div><div></div></div>`;
  }

  function termChips(d) {
    const t = term();
    return `<div class="chips" role="group">${[1, 2].map((n) => `<button class="chip" data-st="term" data-t="${n}" aria-pressed="${t === n}">${s("term", n)}</button>`).join("")}</div>`;
  }

  function vGrade(r) {
    const g = gradeInfo(r.g);
    const head = `<h2 class="page-title">${esc(gradeName(r.g))}</h2>`;
    if (!g || !g.file) {
      return `${head}<div class="st-soon">${ic("study")}<p>${s("gradeSoon")}</p>
        <a class="btn ghost" href="#" data-ext="${esc(catalog.library || DEFAULT_CATALOG.library)}">${icon("ext")}${s("bookOpenLib")}</a></div>
        ${pickGradeRow(r.g)}`;
    }
    const c = ensureContent(r.g);
    if (!c || c.status !== "ok") return head + loadingBlock(c);
    const d = c.data;
    if (!state.studyTerm) state.studyTerm = d.term || 1;
    const t = term();
    const subs = (d.subjects || []);
    const list = subs.map((sub) => {
      const hasTerm = (sub.units || []).some((u) => (u.term || 1) === t) || (sub.sets || []).some((x) => (x.term || 1) === t && (x.q || []).length);
      const st = subjStats(r.g, sub);
      const pct = st.total ? Math.round(st.doneN / st.total * 100) : 0;
      return `<button class="st-subj subj-${esc(sub.id)}" data-st="subject" data-g="${esc(r.g)}" data-s="${esc(sub.id)}">
        <span class="st-sic">${subjIcon(sub)}</span>
        <span class="grow"><b>${esc(N(sub))}</b>
          <small>${!hasTerm ? s("termSoon") : !st.total ? s("explainSoon") : `${esc(s("stats", num(st.doneN), num(st.total)))}${st.avg != null ? ` · ${s("avg")} ${num(st.avg)}%` : ""}`}</small>
          <span class="st-bar"><i style="width:${pct}%"></i></span>
        </span>
        <span class="end">${icon("chev", "flip")}</span>
      </button>`;
    }).join("");
    return `${head}
      ${c.live === false ? `<div class="notice">${s("offline")}</div>` : ""}
      ${termChips(d)}
      <div class="st-subjs">${list}</div>
      ${pickGradeRow(r.g)}`;
  }
  function pickGradeRow(gid) {
    if (profile && (profile.mode === "student" || profile.mode === "parentAs")) return "";
    if (profile && profile.grade === gid) return "";
    return `<button class="btn ghost block" style="margin-top:14px" data-st="setGrade" data-g="${esc(gid)}">${ic("target")}${ar() ? "ده صفي" : "This is my grade"}</button>`;
  }

  function vSubject(r) {
    const c = ensureContent(r.g);
    if (!c || c.status !== "ok") return loadingBlock(c);
    const sub = subjectOf(r.g, r.s);
    if (!sub) return `<div class="card">${s("noSets")}</div>`;
    const t = term();
    const st = subjStats(r.g, sub);
    const wn = wrongCount(r.g, sub.id);
    const savedN = allLessons(sub).filter((l) => P_().marks[l.id]).length;
    const pastN = (sub.sets || []).filter((x) => x.kind === "past" && (x.term || 1) === t && ((x.q || []).length || x.pdf)).length;
    const bookN = (sub.books || []).filter((b) => (b.term || 1) === t && b.url).length;
    const revN = (sub.sets || []).filter((x) => x.kind !== "past" && (x.term || 1) === t && (x.q || []).length).length;
    const tile = (act, icn, title, sub2, extra) => `<button class="st-big" data-st="${act}" data-g="${esc(r.g)}" data-s="${esc(sub.id)}"${extra || ""}>
      <span class="ic">${ic(icn)}</span><b>${title}</b><small>${sub2}</small></button>`;
    const recent = P_().results.filter((x) => x.g === r.g && x.s === sub.id).slice(-3).reverse();
    return `
      <section class="st-hero subj-${esc(sub.id)}">
        <span class="st-sic">${subjIcon(sub)}</span>
        <div class="grow"><h2>${esc(N(sub))}</h2><small>${esc(gradeName(r.g))} · ${s("term", t)}</small></div>
        ${ring(st.total ? st.doneN / st.total * 100 : 0, 58, s("stats", num(st.doneN), num(st.total)))}
      </section>
      <div class="st-bigs">
        ${tile("book", "study", s("book"), bookN ? s("bookSub") : s("soon"))}
        ${tile("lessons", "list", s("explain"), st.total ? s("lessonsN", num(st.total)) : s("soon"))}
        ${isYoung(r.g) ? tile("sets", "target", s("practiceT"), revN ? s("practiceSub") : s("soon"), ' data-k="review"') + (pastN ? tile("sets", "archive", s("past"), s("pastSub"), ' data-k="past"') : "") : `
        ${tile("sets", "archive", s("past"), pastN ? s("pastSub") : s("soon"), ' data-k="past"')}
        ${tile("sets", "target", s("review"), revN ? s("reviewSub") : s("soon"), ' data-k="review"')}`}
      </div>
      <div class="panel" style="margin-top:12px">
        <button class="row" data-st="mistakes" data-g="${esc(r.g)}" data-s="${esc(sub.id)}" ${wn ? "" : "disabled"}>
          <span class="ic warnic">${ic("redo")}</span><span class="grow"><span class="t">${s("mistakes")}</span><span class="s">${wn ? esc(s("mistakesSub", num(wn))) : s("noMistakes")}</span></span>${wn ? `<span class="end">${icon("chev", "flip")}</span>` : ""}</button>
        <button class="row" data-st="saved" data-g="${esc(r.g)}" data-s="${esc(sub.id)}">
          <span class="ic">${ic("star")}</span><span class="grow"><span class="t">${s("saved")}</span><span class="s">${savedN ? s("lessonsN", num(savedN)) : s("noSaved")}</span></span><span class="end">${icon("chev", "flip")}</span></button>
      </div>
      ${sub.id === "arabic" ? nahwiCard(r.g) : ""}
      ${recent.length ? `<h2 class="sec">${s("recent")}</h2><div class="panel">${recent.map(resultRow).join("")}</div>` : ""}
    `;
  }
  function resultRow(x) {
    return `<div class="st-res"><span class="st-score ${pctTone(x.pct)}">${num(x.pct)}%</span>
      <span class="grow"><b>${esc(x.title || "")}</b><small>${esc(s("scoreOf", num(x.score), num(x.total)))} · ${esc(fmtDay(x.at))}${x.subjName ? " · " + esc(x.subjName) : ""}</small></span></div>`;
  }

  function vLessons(r) {
    const c = ensureContent(r.g);
    if (!c || c.status !== "ok") return loadingBlock(c);
    const sub = subjectOf(r.g, r.s); if (!sub) return "";
    const p = P_();
    const units = (sub.units || []).filter((u) => (u.term || 1) === term());
    if (!units.length) return `<h2 class="page-title">${s("explain")}</h2><div class="st-soon">${ic("list")}<p>${s("termSoon")}</p></div>`;
    return `<h2 class="page-title">${s("explain")} — ${esc(N(sub))}</h2>
      ${units.map((u, ui) => {
        const done = (u.lessons || []).filter((l) => p.lessons[l.id]).length;
        return `<section class="st-unit">
          <div class="st-uhead"><span class="st-unum">${num(ui + 1)}</span><span class="grow"><small>${s("unit")} ${num(ui + 1)}</small><b>${esc(N(u))}</b></span><span class="small">${num(done)}/${num((u.lessons || []).length)}</span></div>
          <div class="panel">${(u.lessons || []).map((l, li) => {
            const isDone = !!p.lessons[l.id];
            const ready = (l.body || []).length > 0;
            return `<button class="row st-lrow${isDone ? " done" : ""}" data-st="lesson" data-g="${esc(r.g)}" data-s="${esc(sub.id)}" data-l="${esc(l.id)}" ${ready ? "" : "disabled"}>
              <span class="st-lnum">${isDone ? ic("check") : num(li + 1)}</span>
              <span class="grow"><span class="t">${esc(N(l))}</span>${ready ? (l.check && l.check.length ? `<span class="s">${s("checkYourself")}: ${esc(s("questionsN", num(l.check.length)))}</span>` : "") : `<span class="s">${s("soon")}</span>`}</span>
              ${p.marks[l.id] ? `<span class="st-starred">${ic("star")}</span>` : ""}
            </button>`;
          }).join("")}</div>
        </section>`;
      }).join("")}`;
  }

  function block(b) {
    if (typeof b === "string") return `<p>${rich(b)}</p>`;
    if (b.h) return `<h3>${rich(b.h)}</h3>`;
    if (b.big) return `<div class="st-big" dir="auto">${rich(b.big)}</div>`;
    if (b.ul) return `<ul class="bullets">${b.ul.map((x) => `<li>${rich(x)}</li>`).join("")}</ul>`;
    if (b.ol) return `<ol class="st-ol">${b.ol.map((x) => `<li>${rich(x)}</li>`).join("")}</ol>`;
    if (b.def) return `<div class="st-def"><span>${s("def")}</span>${rich(b.def)}</div>`;
    if (b.tip) return `<div class="st-tip">${icon("alert")}<span>${rich(b.tip)}</span></div>`;
    if (b.f) return `<div class="st-f">${rich(b.f)}</div>`;
    if (b.ex) return `<details class="st-ex"><summary><span class="st-exl">${s("example")}</span><span class="grow">${rich(b.ex.q)}</span></summary><div class="st-exa"><b>${s("solution")}</b>${rich(b.ex.a)}</div></details>`;
    if (b.table) return `<div class="st-tw"><table class="st-t"><thead><tr>${b.table.head.map((h) => `<th>${rich(h)}</th>`).join("")}</tr></thead><tbody>${b.table.rows.map((row) => `<tr>${row.map((c) => `<td>${rich(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
    return "";
  }

  function vLesson(r) {
    const c = ensureContent(r.g);
    if (!c || c.status !== "ok") return loadingBlock(c);
    const sub = subjectOf(r.g, r.s); if (!sub) return "";
    const f = findLesson(sub, r.l); if (!f) return "";
    const p = P_();
    const list = allLessons(sub, f.u.term || 1);
    const i = list.findIndex((x) => x.id === f.l.id);
    const prev = list[i - 1], next = list[i + 1];
    const done = !!p.lessons[f.l.id], marked = !!p.marks[f.l.id];
    if (!p.last || p.last.l !== f.l.id) { p.last = { g: r.g, s: sub.id, l: f.l.id }; saveProg(); }
    const check = (f.l.check || []).map((q, qi) => `<div class="st-chk" data-q="${esc(q.id)}">
        <p class="st-chkq"><span>${num(qi + 1)}</span>${rich(q.q)}${isYoung(r.g) ? `<button class="st-say sm" data-st="say" data-say="${esc(sayText(q.q, q.t === "fill" ? [] : optList(q).map((o) => o.t)))}" aria-label="${s("listen")}">${ic("sound")}</button>` : ""}</p>
        ${q.t === "fill" ? `<div class="st-fill"><input class="input" dir="auto" autocomplete="off" placeholder="${esc(s("typeAnswer"))}" data-chkin="${esc(q.id)}"><button class="btn" data-st="chkFill" data-q="${esc(q.id)}">${s("check")}</button></div>`
          : `<div class="st-opts">${optList(q).map((o) => `<button class="st-opt${isEmo(o.t) ? " emo" : ""}" data-st="chk" data-q="${esc(q.id)}" data-k="${esc(String(o.k))}">${rich(o.t)}</button>`).join("")}</div>`}
        <div class="st-fb" hidden></div>
      </div>`).join("");
    return `
      <div class="st-lhead subj-${esc(sub.id)}">
        <small>${esc(N(sub))} · ${s("unit")} ${num((sub.units || []).indexOf(f.u) + 1)}: ${esc(N(f.u))}</small>
        <h2>${esc(N(f.l))}</h2>
        ${f.l.page ? `<small class="st-pg">${ic("study")}${esc(s("bookPage", num(f.l.page)))}</small>` : ""}
        <button class="st-mark" data-st="mark" data-l="${esc(f.l.id)}" aria-pressed="${marked}" aria-label="${marked ? s("unsaveLesson") : s("saveLesson")}">${ic("star")}</button>
      </div>
      ${isYoung(r.g) ? `<button class="st-say" data-st="say" data-say="${esc(sayText(lessonText(f.l), []))}">${ic("sound")}${s("listen")}</button>` : ""}
      <article class="st-body">${(f.l.body || []).map(block).join("")}</article>
      ${check ? `<h2 class="sec">${s("checkYourself")}</h2><div class="st-chks">${check}</div>` : ""}
      <button class="btn block ${done ? "ghost" : ""}" style="margin-top:16px" data-st="done" data-l="${esc(f.l.id)}">${ic("check")}${done ? s("done") : s("markDone")}</button>
      <div class="st-pn">
        ${prev ? `<button class="btn ghost" data-st="lesson" data-g="${esc(r.g)}" data-s="${esc(sub.id)}" data-l="${esc(prev.id)}" data-rep="1">${icon("back", ar() ? "" : "flip")}${s("prevLesson")}</button>` : "<span></span>"}
        ${next ? `<button class="btn ghost" data-st="lesson" data-g="${esc(r.g)}" data-s="${esc(sub.id)}" data-l="${esc(next.id)}" data-rep="1">${s("nextLesson")}${icon("chev", ar() ? "" : "flip")}</button>` : "<span></span>"}
      </div>
      <p class="disclaimer">${s("contentNote")}</p>
    `;
  }

  // plain text for read-aloud: drop markup and the LTR math markers
  const isEmo = (t) => /^[\p{Extended_Pictographic}\u200d\ufe0f\s0-9️⃣]+$/u.test(String(t || "")) && /\p{Extended_Pictographic}/u.test(String(t || ""));
  function plain(t) { return String(t == null ? "" : t).replace(/\*\*|\{\{|\}\}|\[\[|\]\]/g, "").replace(/\s+/g, " ").trim(); }
  function sayText(q, opts) { return [plain(q)].concat((opts || []).map((o, i) => `${i + 1}: ${plain(o)}`)).join(". "); }
  function lessonText(l) {
    const out = [];
    (l.body || []).forEach((b) => {
      if (typeof b === "string") out.push(b);
      else if (b.h || b.def || b.tip) out.push(b.h || b.def || b.tip);
      else if (b.ul || b.ol) out.push(...(b.ul || b.ol));
      else if (b.ex) out.push(b.ex.q, b.ex.a);
    });
    return out.join(". ");
  }
  let speaking = false;
  // Mixed Arabic/English text is read in pieces, each with its own voice.
  function sayParts(text) {
    const out = [];
    String(text).split(/([A-Za-z][A-Za-z0-9 ,.'’?!\-]*[A-Za-z0-9.?!']|[A-Za-z])/).forEach((x, i) => {
      const t = x.trim(); if (!t || !/[A-Za-z\u0600-\u06FF0-9]/.test(t)) return;
      const lang = i % 2 ? "en-US" : (ar() ? "ar-EG" : "en-US");
      if (out.length && out[out.length - 1].lang === lang) out[out.length - 1].text += " " + t; else out.push({ text: t, lang });
    });
    return out;
  }
  async function say(text) {
    const T = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.TextToSpeech;
    const parts = sayParts(text);
    try {
      if (T) {
        if (speaking) { speaking = false; await T.stop(); return; }
        speaking = true;
        for (const p of parts) { if (!speaking) break; await T.speak({ text: p.text, lang: p.lang, rate: p.lang === "en-US" ? 0.8 : 0.9, pitch: 1.0, volume: 1.0, category: "playback" }); }
        speaking = false;
      } else if (window.speechSynthesis) {
        if (speechSynthesis.speaking) { speechSynthesis.cancel(); return; }
        parts.forEach((p) => { const u = new SpeechSynthesisUtterance(p.text); u.lang = p.lang; u.rate = p.lang === "en-US" ? 0.8 : 0.9; speechSynthesis.speak(u); });
      } else toast(s("noVoice"));
    } catch (e) { speaking = false; }
  }
  function stopSay() {
    const T = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.TextToSpeech;
    speaking = false;
    try { if (T) T.stop(); else if (window.speechSynthesis) speechSynthesis.cancel(); } catch (e) {}
  }

  function vSaved(r) {
    const c = ensureContent(r.g);
    if (!c || c.status !== "ok") return loadingBlock(c);
    const sub = subjectOf(r.g, r.s); if (!sub) return "";
    const list = allLessons(sub).filter((l) => P_().marks[l.id]);
    return `<h2 class="page-title">${s("saved")}</h2>
      ${list.length ? `<div class="panel">${list.map((l) => `<button class="row" data-st="lesson" data-g="${esc(r.g)}" data-s="${esc(sub.id)}" data-l="${esc(l.id)}"><span class="ic">${ic("star")}</span><span class="grow"><span class="t">${esc(N(l))}</span></span><span class="end">${icon("chev", "flip")}</span></button>`).join("")}</div>`
        : `<div class="st-soon">${ic("star")}<p>${s("noSaved")}</p></div>`}`;
  }

  function vSets(r) {
    const c = ensureContent(r.g);
    if (!c || c.status !== "ok") return loadingBlock(c);
    const sub = subjectOf(r.g, r.s); if (!sub) return "";
    const t = term();
    const p = P_();
    const card = (x) => {
      const ready = (x.q || []).length > 0;
      const mine = p.results.filter((y) => y.set === x.id);
      const best = mine.length ? Math.max(...mine.map((y) => y.pct)) : null;
      return `<button class="st-set" data-st="startSet" data-g="${esc(r.g)}" data-s="${esc(sub.id)}" data-set="${esc(x.id)}" ${ready ? "" : "disabled"}>
        <span class="st-setic">${x.kind === "past" ? `<b>${esc(String(x.year || "").slice(-4))}</b>` : ic(x.kind === "expected" ? "target" : "list")}</span>
        <span class="grow"><b>${esc(N(x))}</b>
          <small>${ready ? `${esc(s("questionsN", num(x.q.length)))}${x.minutes ? " · " + esc(s("minutesN", num(x.minutes))) : ""}${mine.length ? " · " + esc(s("tries", num(mine.length))) : ""}` : s("pastSoon")}</small></span>
        ${best != null ? `<span class="st-score ${pctTone(best)}">${num(best)}%</span>` : ready ? `<span class="end">${ic("play")}</span>` : ""}
      </button>`;
    };
    if (r.k === "past") {
      const list = (sub.sets || []).filter((x) => x.kind === "past" && (x.term || 1) === t && ((x.q || []).length || x.pdf))
        .sort((a, b) => String(b.year).localeCompare(String(a.year)));
      const pdfCard = (x) => `<button class="st-set" data-st="pastPdf" data-g="${esc(r.g)}" data-s="${esc(sub.id)}" data-set="${esc(x.id)}">
        <span class="st-setic"><b>${esc(String(x.year || "").slice(-4))}</b></span>
        <span class="grow"><b>${esc(N(x))}</b><small>${s("officialExam")}${x.lang ? " · " + esc(x.lang) : ""}</small></span>
        <span class="end">${icon("ext")}</span></button>`;
      return `<h2 class="page-title">${s("past")}</h2><p class="lead">${esc(N(sub))} · ${s("term", t)}</p>
        <div class="notice">${s("pastNote")}</div>
        ${list.length ? `<div class="st-sets">${list.map((x) => ((x.q || []).length ? card(x) : pdfCard(x))).join("")}</div>
          <p class="disclaimer">${s("officialSrc")}</p>` : `<div class="st-soon">${ic("archive")}<p>${s("noSets")}</p></div>`}`;
    }
    const exp = (sub.sets || []).filter((x) => x.kind === "expected" && (x.term || 1) === t);
    const rev = (sub.sets || []).filter((x) => x.kind === "review" && (x.term || 1) === t);
    return `<h2 class="page-title">${isYoung(r.g) ? s("practiceT") : s("review")}</h2><p class="lead">${esc(N(sub))} · ${s("term", t)}</p>
      ${exp.length ? `<h2 class="sec">${s("expected")}</h2><div class="st-sets">${exp.map(card).join("")}</div>` : ""}
      ${rev.length ? `<h2 class="sec">${isYoung(r.g) ? s("practiceT") : s("unitReview")}</h2><div class="st-sets">${rev.map(card).join("")}</div>` : ""}
      ${!exp.length && !rev.length ? `<div class="st-soon">${ic("target")}<p>${s("noSets")}</p></div>` : ""}
      <p class="disclaimer">${s("contentNote")}</p>`;
  }

  function vHistory() {
    const list = P_().results.slice().reverse();
    return `<h2 class="page-title">${s("historyT")}</h2>
      ${list.length ? `<div class="panel">${list.map(resultRow).join("")}</div>` : `<div class="st-soon">${ic("chart")}<p>${s("noHistory")}</p></div>`}`;
  }

  /* ================= Quiz engine ================= */
  let quiz = null; // { set, title, g, s, qs, mode, i, ans, chk, rev, at, deadline, done }
  function optList(q) {
    if (q.t === "tf") return [{ t: s("tfTrue"), k: "true" }, { t: s("tfFalse"), k: "false" }];
    return (q.o || []).map((t, k) => ({ t, k }));
  }
  function startSheet(gid, sid, set, qsOverride, titleOverride) {
    const qs = qsOverride || set.q || [];
    if (!qs.length) return;
    const mins = set && set.minutes ? set.minutes : Math.max(5, Math.round(qs.length * 1.5));
    openSheet(`<h3>${esc(titleOverride || N(set))}</h3>
      <p class="lead" style="margin:0 0 12px">${esc(s("questionsN", num(qs.length)))}</p>
      <div class="st-modes">
        <button class="st-mode" data-mode="practice"><span class="ic">${ic("check")}</span><span class="grow"><b>${s("modePractice")}</b><small>${s("modePracticeSub")}</small></span></button>
        ${isYoung(gid) ? "" : `<button class="st-mode" data-mode="exam"><span class="ic">${ic("timer")}</span><span class="grow"><b>${s("modeExam")}</b><small>${esc(s("modeExamSub", num(mins)))}</small></span></button>`}
      </div>
      <div class="sheet-actions"><button class="btn ghost" data-close>${s("cancel")}</button></div>`,
      (root) => root.querySelectorAll("[data-mode]").forEach((b) => b.addEventListener("click", () => {
        closeSheet();
        beginQuiz({ g: gid, s: sid, set: set ? set.id : "mistakes", kind: set ? set.kind : "mistakes", title: titleOverride || N(set), qs, mode: b.dataset.mode, minutes: mins });
      })));
  }
  function beginQuiz(o) {
    stopTimer();
    const qs = o.qs.map((q) => Object.assign({}, q, { _opts: q.t === "mcq" && !q.keep ? shuffle(optList(q)) : optList(q) }));
    quiz = { g: o.g, s: o.s, set: o.set, kind: o.kind, title: o.title, qs, mode: o.mode, i: 0, ans: {}, chk: {}, rev: {}, at: Date.now(), deadline: o.mode === "exam" ? Date.now() + o.minutes * 60000 : 0, done: false };
    if (!isYoung(o.g) && ctx.ads && ctx.ads.preload) ctx.ads.preload();
    push({ v: "quiz" });
  }
  function isRight(q, a) {
    if (a === undefined || a === null || a === "") return false;
    if (q.t === "tf") return String(a) === String(!!q.a);
    if (q.t === "fill") {
      const want = Array.isArray(q.a) ? q.a : [q.a];
      const na = norm(a), nv = numVal(a);
      return want.some((w) => norm(w) === na || (nv != null && numVal(w) != null && Math.abs(numVal(w) - nv) < 1e-9));
    }
    return Number(a) === Number(q.a);
  }
  function norm(x) {
    return String(x == null ? "" : x)
      .replace(/[ً-ٰٟـ]/g, "")
      .replace(/[أإآٱ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه").replace(/ؤ/g, "و").replace(/ئ/g, "ي")
      .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d)).replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
      .replace(/[٫,]/g, ".").replace(/[−–]/g, "-")
      .toLowerCase().replace(/[^\p{L}\p{N}.\/\-%]+/gu, " ").trim().replace(/\s+/g, " ")
      .replace(/^(ال)/, "");
  }
  function numVal(x) {
    // "4-" typed on an Arabic keyboard means -4
    const t = norm(x).replace(/\s/g, "").replace(/%$/, "").replace(/^(\d+(?:\.\d+)?)-$/, "-$1");
    if (/^-?\d+(\.\d+)?$/.test(t)) return parseFloat(t);
    const m = t.match(/^(-?\d+)\/(\d+)$/);
    if (m && +m[2]) return +m[1] / +m[2];
    return null;
  }
  function answerText(q, a) {
    if (a === undefined || a === null || a === "") return s("noAnswer");
    if (q.t === "tf") return String(a) === "true" ? s("tfTrue") : s("tfFalse");
    if (q.t === "fill") return String(a);
    return (q.o || [])[Number(a)] || "";
  }
  const rightText = (q) => (q.t === "tf" ? (q.a ? s("tfTrue") : s("tfFalse")) : q.t === "fill" ? (Array.isArray(q.a) ? q.a[0] : q.a) : (q.o || [])[q.a]);

  function vQuiz() {
    if (!quiz) return "";
    const q = quiz.qs[quiz.i], n = quiz.qs.length;
    const a = quiz.ans[q.id], checked = quiz.mode === "practice" && (quiz.chk[q.id] || quiz.rev[q.id]);
    const ok = checked && isRight(q, a) && !quiz.rev[q.id];
    const opts = q.t === "fill"
      ? `<div class="st-fill"><input class="input" id="qzFill" dir="auto" autocomplete="off" placeholder="${esc(s("typeAnswer"))}" value="${esc(a || "")}" ${checked ? "disabled" : ""}>${quiz.mode === "practice" && !checked ? `<button class="btn" data-st="qzCheck">${s("check")}</button>` : ""}</div>`
      : `<div class="st-opts">${q._opts.map((o) => {
          let cls = "";
          const sel = a !== undefined && String(a) === String(o.k);
          if (checked) { if (isRight(q, o.k)) cls = " right"; else if (sel) cls = " wrong"; }
          else if (sel) cls = " sel";
          if (isEmo(o.t)) cls += " emo";
          return `<button class="st-opt${cls}" data-st="qzPick" data-k="${esc(String(o.k))}" aria-pressed="${sel}" ${checked ? "disabled" : ""}>${rich(o.t)}</button>`;
        }).join("")}</div>`;
    const fb = checked ? `<div class="st-fb ${ok ? "ok" : "no"}">
        <b>${quiz.rev[q.id] ? s("revealed") : ok ? s("correct") : s("wrong")}</b>
        ${ok ? "" : `<span>${s("rightAnswer")} <b>${rich(rightText(q))}</b></span>`}
        ${q.e ? `<p>${rich(q.e)}</p>` : ""}</div>` : "";
    const answeredN = quiz.qs.filter((x) => quiz.ans[x.id] !== undefined && quiz.ans[x.id] !== "").length;
    const last = quiz.i === n - 1;
    return `<div class="qz">
      <div class="qz-top">
        <span class="qz-t">${esc(quiz.title)}</span>
        ${quiz.mode === "exam" ? `<span class="qz-timer" id="qzTimer">${ic("timer")}<b>${fmtDur(Math.max(0, (quiz.deadline - Date.now()) / 1000))}</b></span>` : ""}
      </div>
      <div class="qz-bar"><i style="width:${((quiz.i + 1) / n * 100).toFixed(1)}%"></i></div>
      <div class="qz-card">
        <small class="qz-n">${esc(s("qOf", num(quiz.i + 1), num(n)))}</small>
        <p class="qz-q"${/[\u0600-\u06FF]/.test(q.q) ? "" : ' dir="ltr"'}>${rich(q.q)}</p>
        ${youngNow() ? `<button class="st-say" data-st="say" data-say="${esc(sayText(q.q, q.t === "fill" ? [] : q._opts.map((o) => o.t)))}">${ic("sound")}${s("listen")}</button>` : ""}
        ${q.img ? `<img class="qz-img" src="${esc(q.img)}" alt="">` : ""}
        ${opts}
        ${fb}
        ${quiz.mode === "practice" && !checked ? `<button class="link-btn qz-reveal" data-st="qzReveal">${ic("eye")}${s("showAnswer")}</button>` : ""}
      </div>
      ${quiz.mode === "exam" ? `<div class="qz-dots" role="group">${quiz.qs.map((x, k) => `<button data-st="qzGo" data-i="${k}" class="${k === quiz.i ? "cur" : ""}${quiz.ans[x.id] !== undefined && quiz.ans[x.id] !== "" ? " ans" : ""}" aria-label="${esc(s("qOf", num(k + 1), num(n)))}">${num(k + 1)}</button>`).join("")}</div>` : ""}
      <div class="qz-nav">
        <button class="btn ghost" data-st="qzPrev" ${quiz.i === 0 ? "disabled" : ""}>${icon("back", ar() ? "" : "flip")}${s("prev")}</button>
        ${last ? `<button class="btn" data-st="qzFinish">${quiz.mode === "exam" ? s("finish") : s("finishPractice")}</button>`
          : `<button class="btn" data-st="qzNext">${s("next")}${icon("chev", ar() ? "" : "flip")}</button>`}
      </div>
      ${quiz.mode === "exam" ? `<p class="small" style="text-align:center;margin-top:8px">${num(answeredN)}/${num(n)}</p>` : ""}
    </div>`;
  }

  let timer = null;
  function stopTimer() { clearInterval(timer); timer = null; }
  function mountQuiz(root) {
    stopTimer();
    if (!quiz || quiz.done) return;
    const fill = root.querySelector("#qzFill");
    if (fill) {
      fill.addEventListener("input", () => { quiz.ans[quiz.qs[quiz.i].id] = fill.value.trim(); });
      fill.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); if (quiz.mode === "practice") qzCheck(); else qzMove(1); } });
    }
    if (quiz.mode === "exam") {
      timer = setInterval(() => {
        const left = (quiz.deadline - Date.now()) / 1000;
        const el = document.getElementById("qzTimer");
        if (el) { el.querySelector("b").textContent = fmtDur(Math.max(0, left)); el.classList.toggle("low", left < 60); }
        if (left <= 0) { stopTimer(); toast(s("timeUp")); finishQuiz(true); }
      }, 1000);
    }
  }
  function qzMove(d) {
    const n = quiz.qs.length;
    quiz.i = Math.max(0, Math.min(n - 1, quiz.i + d));
    ctx.refresh(false);
  }
  function qzCheck() {
    const q = quiz.qs[quiz.i];
    const a = quiz.ans[q.id];
    if (a === undefined || a === "") return;
    quiz.chk[q.id] = true;
    ctx.refresh(false);
  }
  async function qzReveal() {
    const q = quiz.qs[quiz.i];
    const ok = !isYoung(quiz.g) && ctx.ads && ctx.ads.rewarded ? await ctx.ads.rewarded() : true;
    if (!ok || !quiz) return;
    quiz.rev[q.id] = true;
    ctx.refresh(false);
  }
  function finishQuiz(force) {
    if (!quiz || quiz.done) return;
    const missing = quiz.qs.filter((q) => quiz.ans[q.id] === undefined || quiz.ans[q.id] === "").length;
    if (!force && missing && quiz.mode === "exam") {
      openSheet(`<h3>${s("finish")}</h3><p>${esc(s("unanswered", num(missing)))}</p>
        <div class="sheet-actions"><button class="btn ghost" data-close>${s("keepGoing")}</button><button class="btn" id="qzSubmit">${s("submitAnyway")}</button></div>`,
        (root) => root.querySelector("#qzSubmit").addEventListener("click", () => { closeSheet(); finishQuiz(true); }));
      return;
    }
    stopTimer();
    quiz.done = true;
    const p = P_();
    let score = 0;
    const wrongIds = [];
    quiz.qs.forEach((q) => {
      const ok = isRight(q, quiz.ans[q.id]) && !quiz.rev[q.id];
      if (ok) { score++; delete p.wrong[q.id]; }
      else { wrongIds.push(q.id); p.wrong[q.id] = { g: quiz.g, s: quiz.s }; }
    });
    const total = quiz.qs.length;
    const sub = subjectOf(quiz.g, quiz.s);
    const r = {
      at: Date.now(), g: quiz.g, s: quiz.s, set: quiz.set, kind: quiz.kind, title: quiz.title, subjName: sub ? N(sub) : "",
      score, total, pct: total ? Math.round(score / total * 100) : 0, dur: Math.round((Date.now() - quiz.at) / 1000), mode: quiz.mode
    };
    quiz.result = r; quiz.wrongIds = wrongIds;
    p.results.push(r);
    if (p.results.length > 300) p.results = p.results.slice(-300);
    saveProg();
    syncResult(r);
    const show = () => push({ v: "result" });
    if (!isYoung(quiz.g) && ctx.ads && ctx.ads.interstitial) ctx.ads.interstitial().then(show, show); else show();
  }
  function confirmExitQuiz() {
    openSheet(`<h3>${s("exitQuiz")}</h3><p>${s("exitQuizBody")}</p>
      <div class="sheet-actions"><button class="btn ghost" data-close>${s("keepGoing")}</button><button class="btn danger" id="qzExit">${s("exit")}</button></div>`,
      (root) => root.querySelector("#qzExit").addEventListener("click", () => { closeSheet(); stopTimer(); quiz = null; nav.pop(); ctx.refresh(true); }));
  }

  function vResult() {
    if (!quiz || !quiz.result) return "";
    const r = quiz.result;
    const review = quiz.qs.map((q, k) => {
      const a = quiz.ans[q.id];
      const ok = isRight(q, a) && !quiz.rev[q.id];
      return `<details class="st-rv ${ok ? "ok" : "no"}"><summary><span class="st-rvn">${num(k + 1)}</span><span class="grow">${rich(q.q)}</span><span class="st-rvm">${ok ? ic("check") : icon("x")}</span></summary>
        <div class="st-rvb">${ok ? "" : `<p>${s("yourAnswer")} <b>${rich(answerText(q, a))}</b></p>`}<p>${s("rightAnswer")} <b>${rich(rightText(q))}</b></p>${q.e ? `<p class="small">${rich(q.e)}</p>` : ""}</div></details>`;
    }).join("");
    return `
      <section class="st-result ${pctTone(r.pct)}">
        ${ring(r.pct, 120)}
        <h2>${esc(s("scoreOf", num(r.score), num(r.total)))}</h2>
        <p>${esc(s("msg", r.pct))}</p>
        <small>${esc(quiz.title)} · ${s("time")} ${fmtDur(r.dur)}</small>
      </section>
      <div class="st-ra">
        ${quiz.wrongIds.length ? `<button class="btn" data-st="retryWrong">${ic("redo")}${s("retryWrong")}</button>` : ""}
        <button class="btn ghost" data-st="retry">${ic("redo")}${s("retry")}</button>
        <button class="btn ghost" data-st="toSubject">${s("backSubject")}</button>
      </div>
      <h2 class="sec">${s("reviewAnswers")}</h2>
      <div class="st-rvs">${review}</div>
      ${profile && profile.sid ? `<p class="small" style="text-align:center;margin-top:12px">${s("profileSynced")}</p>` : ""}
    `;
  }

  /* ================= Book viewer (pdf.js) ================= */
  let pdf = null; // { url, doc, n, zoom, obs, pageObs, rendered:Set, key }
  function vBook(r) {
    const c = ensureContent(r.g);
    if (!c || c.status !== "ok") return loadingBlock(c);
    const sub = subjectOf(r.g, r.s); if (!sub) return "";
    const books = r.pdf ? [{ url: r.pdf, ar: r.title, en: r.title }] : (sub.books || []).filter((b) => (b.term || 1) === term());
    const pick = books[r.b || 0];
    const lib = (pick && pick.page) || catalog.library || DEFAULT_CATALOG.library;
    const chips = books.length > 1 ? `<div class="chips">${books.map((b, i) => `<button class="chip" data-st="bookPick" data-i="${i}" aria-pressed="${(r.b || 0) === i}">${esc(N(b) || s("book"))}</button>`).join("")}</div>` : "";
    if (!pick || !pick.url) {
      return `<h2 class="page-title">${s("book")} — ${esc(N(sub))}</h2>${chips}
        <div class="st-soon">${ic("study")}<b>${s("soon")}</b><p>${s("bookNone")}</p>
        <button class="btn ghost" data-st="lessons" data-g="${esc(r.g)}" data-s="${esc(sub.id)}">${ic("list")}${s("explain")}</button></div>`;
    }
    return `<div class="pdf-wrap">
      ${chips}
      <div class="pdf-bar">
        <span class="grow pdf-title">${esc(N(pick) || N(sub))}</span>
        <button class="icon-btn" data-st="zoom" data-d="-1" aria-label="${s("zoomOut")}">${ic("minus")}</button>
        <button class="icon-btn" data-st="zoom" data-d="1" aria-label="${s("zoomIn")}">${icon("plus")}</button>
      </div>
      <div class="pdf-pages" id="pdfPages" data-url="${esc(pick.url)}"><div class="pdf-msg">${s("bookLoading")}<span class="pdf-prog" id="pdfProg"></span></div></div>
      <div class="pdf-foot"><button class="pdf-pg" data-st="goPage" id="pdfPg">—</button></div>
    </div>`;
  }
  let pdfjsP = null;
  function loadPdfjs() {
    if (!pdfjsP) {
      const baseUrl = new URL("vendor/pdfjs/", location.href).href;
      pdfjsP = import(baseUrl + "pdf.min.mjs").then((m) => {
        m.GlobalWorkerOptions.workerSrc = baseUrl + "pdf.worker.min.mjs";
        return { lib: m, base: baseUrl };
      }).catch((e) => { pdfjsP = null; throw e; });
    }
    return pdfjsP;
  }
  function b64ToBytes(b64) { const bin = atob(b64); const out = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i); return out; }
  async function fetchBook(url, onProg) {
    let cache = null;
    try { cache = await caches.open("dalil-books"); const hit = await cache.match(url); if (hit) return new Uint8Array(await hit.arrayBuffer()); } catch (e) { cache = null; }
    let bytes = null;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("HTTP " + res.status);
      const total = +res.headers.get("content-length") || 0;
      if (res.body && res.body.getReader && total) {
        const rd = res.body.getReader(); const parts = []; let got = 0;
        for (;;) { const { done, value } = await rd.read(); if (done) break; parts.push(value); got += value.length; onProg && onProg(got / total); }
        bytes = new Uint8Array(got); let o = 0; parts.forEach((p) => { bytes.set(p, o); o += p.length; });
      } else bytes = new Uint8Array(await res.arrayBuffer());
    } catch (e) {
      const H = P("CapacitorHttp");
      if (!H) throw e;
      const r = await H.request({ url, method: "GET", responseType: "arraybuffer" });
      if (!r || r.status >= 400 || !r.data) throw new Error("HTTP " + (r && r.status));
      bytes = typeof r.data === "string" ? b64ToBytes(r.data) : new Uint8Array(r.data);
    }
    if (cache) { try { await cache.put(url, new Response(bytes.slice(0), { headers: { "Content-Type": "application/pdf" } })); } catch (e) { /* storage full */ } }
    return bytes;
  }
  function closePdf() {
    if (!pdf) return;
    try { pdf.obs && pdf.obs.disconnect(); pdf.pageObs && pdf.pageObs.disconnect(); } catch (e) { /* ignore */ }
    try { pdf.doc && pdf.doc.destroy(); } catch (e) { /* ignore */ }
    pdf = null;
  }
  async function mountBook(root) {
    const host = root.querySelector("#pdfPages"); if (!host) return;
    const url = host.dataset.url;
    if (pdf && pdf.url === url && pdf.doc) { buildPages(host); return; }
    closePdf();
    const mine = pdf = { url, zoom: 1, rendered: new Map(), key: "pg:" + url };
    try {
      const [{ lib, base: b }, data] = await Promise.all([loadPdfjs(), fetchBook(url, (f) => { const el = document.getElementById("pdfProg"); if (el) el.textContent = " " + num(Math.round(f * 100)) + "%"; })]);
      if (pdf !== mine) return;
      const doc = await lib.getDocument({ data, cMapUrl: b + "cmaps/", cMapPacked: true, standardFontDataUrl: b + "standard_fonts/", wasmUrl: b + "wasm/", iccUrl: b + "iccs/", isEvalSupported: false }).promise;
      if (pdf !== mine) { doc.destroy(); return; }
      mine.doc = doc; mine.n = doc.numPages;
      const first = await doc.getPage(1);
      const vp = first.getViewport({ scale: 1 });
      mine.ratio = vp.height / vp.width;
      const cur = document.getElementById("pdfPages");
      if (cur) { buildPages(cur); toast(s("bookSaved")); }
    } catch (e) {
      if (pdf !== mine) return;
      pdf = null;
      const cur = document.getElementById("pdfPages");
      if (cur) cur.innerHTML = `<div class="pdf-msg">${s("bookFail")}<button class="btn ghost" data-st="bookRetry">${ic("redo")}${s("tryAgain")}</button></div>`;
    }
  }
  function buildPages(host) {
    const d = pdf; if (!d || !d.doc) return;
    host.innerHTML = "";
    host.style.setProperty("--z", d.zoom);
    for (let i = 1; i <= d.n; i++) {
      const pg = document.createElement("div");
      pg.className = "pdf-page"; pg.dataset.p = i;
      pg.style.aspectRatio = `1 / ${d.ratio}`;
      pg.innerHTML = `<span class="pdf-num">${num(i)}</span>`;
      host.appendChild(pg);
    }
    d.rendered = new Map();
    d.obs = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) renderPage(+en.target.dataset.p, en.target); }), { root: host, rootMargin: "600px 0px" });
    d.pageObs = new IntersectionObserver((ents) => {
      ents.forEach((en) => {
        if (en.isIntersecting && en.intersectionRatio > 0.35) {
          const p = +en.target.dataset.p; d.cur = p;
          const lbl = document.getElementById("pdfPg"); if (lbl) lbl.textContent = s("page", num(p), num(d.n));
          const pr = P_(); pr.pages[d.url] = p; saveProg();
        }
      });
    }, { root: host, threshold: [0.35] });
    host.querySelectorAll(".pdf-page").forEach((el) => { d.obs.observe(el); d.pageObs.observe(el); });
    const startAt = P_().pages[d.url] || 1;
    const lbl = document.getElementById("pdfPg"); if (lbl) lbl.textContent = s("page", num(startAt), num(d.n));
    if (startAt > 1) { const el = host.querySelector(`.pdf-page[data-p="${startAt}"]`); if (el) host.scrollTop = el.offsetTop - host.offsetTop; }
  }
  async function renderPage(i, el) {
    const d = pdf; if (!d || !d.doc) return;
    if (d.rendered.get(i) === d.zoom) return;
    d.rendered.set(i, d.zoom);
    try {
      const page = await d.doc.getPage(i);
      if (pdf !== d) return;
      const w = el.clientWidth || 360;
      const vp0 = page.getViewport({ scale: 1 });
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      const vp = page.getViewport({ scale: (w / vp0.width) * dpr });
      const cv = document.createElement("canvas");
      cv.width = Math.floor(vp.width); cv.height = Math.floor(vp.height);
      await page.render({ canvasContext: cv.getContext("2d"), viewport: vp, canvas: cv }).promise;
      if (pdf !== d) return;
      const old = el.querySelector("canvas"); if (old) old.remove();
      el.appendChild(cv);
    } catch (e) { d.rendered.delete(i); }
  }
  function zoomBook(dir) {
    if (!pdf || !pdf.doc) return;
    const steps = [1, 1.5, 2, 2.5];
    const k = Math.max(0, Math.min(steps.length - 1, steps.indexOf(pdf.zoom) + dir));
    if (steps[k] === pdf.zoom) return;
    const host = document.getElementById("pdfPages"); if (!host) return;
    const cur = pdf.cur || 1;
    pdf.zoom = steps[k];
    host.style.setProperty("--z", pdf.zoom);
    pdf.rendered = new Map();
    host.querySelectorAll(".pdf-page").forEach((el) => { pdf.obs.unobserve(el); pdf.obs.observe(el); });
    const el = host.querySelector(`.pdf-page[data-p="${cur}"]`); if (el) host.scrollTop = el.offsetTop - host.offsetTop;
  }
  function goPageSheet() {
    if (!pdf || !pdf.doc) return;
    openSheet(`<h3>${s("goPage")}</h3>
      <div class="field"><input id="pgIn" class="input" type="number" inputmode="numeric" min="1" max="${pdf.n}" value="${pdf.cur || 1}"></div>
      <div class="sheet-actions"><button class="btn ghost" data-close>${s("cancel")}</button><button class="btn" id="pgGo">${s("next")}</button></div>`,
      (root) => {
        const go = () => {
          const v = Math.max(1, Math.min(pdf.n, parseInt(root.querySelector("#pgIn").value, 10) || 1));
          closeSheet();
          const host = document.getElementById("pdfPages");
          const el = host && host.querySelector(`.pdf-page[data-p="${v}"]`);
          if (el) host.scrollTop = el.offsetTop - host.offsetTop;
        };
        root.querySelector("#pgGo").addEventListener("click", go);
        root.querySelector("#pgIn").addEventListener("keydown", (e) => { if (e.key === "Enter") go(); });
      });
  }

  /* ================= Parent & student views ================= */
  function vParent() {
    if (!accountsOn()) return `<h2 class="page-title">${s("parentTitle")}</h2><div class="card">${s("accUnavailable")}</div>`;
    const u = me();
    const demo = backend.demo ? `<div class="notice">${s("demo")}</div>` : "";
    if (!u) {
      const busy = account.busy && account.busy();
      return `<h2 class="page-title">${s("parentTitle")}</h2>${demo}
        <p class="lead">${s("parentIntro")}</p>
        <div class="panel" style="margin-top:12px">
          ${[["study", "p1"], ["chart", "p2"], ["target", "p3"]].map(([i, k]) => `<div class="row" style="cursor:default"><span class="ic">${ic(i)}</span><span class="grow">${s(k)}</span></div>`).join("")}
        </div>
        <button class="btn block google" data-st="parentSignIn" style="margin-top:14px" ${busy ? "disabled" : ""}>${busy ? s("signingIn") : `${account.googleMark ? account.googleMark() : ""}${s("signIn")}`}</button>`;
    }
    loadKids();
    const kids = parent.kids;
    const localKids = (state.children || []).filter((c) => OLD_GRADE[c.grade]);
    const importable = kids && !kids.length && localKids.length;
    return `<h2 class="page-title">${s("parentTitle")}</h2>${demo}
      <h2 class="sec">${s("myKids")}<button data-st="addKid">${s("addKid")}</button></h2>
      ${importable ? `<div class="card st-imp"><p style="margin:0 0 10px">${esc(s("importKids", num(localKids.length)))}</p><button class="btn" data-st="importKids">${icon("plus")}${s("importYes")}</button></div>` : ""}
      ${kids == null ? loadingBlock() : kids.length ? `<div class="st-kids">${kids.map(kidCard).join("")}</div>`
        : `<div class="panel"><div class="empty">${s("noKids")}<button class="btn ghost" data-st="addKid">${icon("plus")}${s("addKid")}</button></div></div>`}
      ${parent.err ? `<div class="notice" style="margin-top:10px">${s("netErr")} <button class="link-btn" data-st="reloadKids">${s("tryAgain")}</button></div>` : ""}
      <h2 class="sec">${s("accounts")}</h2>
      <div class="panel">
        <div class="row" style="cursor:default"><span class="ic">${icon("user")}</span><span class="grow"><span class="s">${s("signedInAs")}</span><span class="t">${esc(u.name || "")}</span></span></div>
        <button class="row" data-st="parentSignOut"><span class="ic">${icon("logout")}</span><span class="grow"><span class="t">${s("signOut")}</span></span></button>
        <button class="row danger" data-st="deleteParent"><span class="ic">${icon("trash")}</span><span class="grow"><span class="t">${s("deleteAll")}</span></span></button>
      </div>`;
  }
  function kidCard(k) {
    const n = (k.devices || []).length;
    return `<button class="st-kid" data-st="kid" data-sid="${esc(k.id)}">
      <span class="avatar">${esc((k.name || "?").trim().charAt(0))}</span>
      <span class="grow"><b>${esc(k.name)}</b><small>${esc(gradeName(k.grade))}</small><small class="${n ? "on" : ""}">${ic("link")}${esc(s("devices", n))}</small></span>
      <span class="end">${icon("chev", "flip")}</span></button>`;
  }

  function vKid(r) {
    const k = (parent.kids || []).find((x) => x.id === r.sid);
    if (!k) { loadKids(); return loadingBlock(); }
    loadKidStats(k.id);
    ensureContent(k.grade);
    const st = parent.stats[k.id] || { loading: true, results: [] };
    const results = st.results || [];
    const lessonKeys = st.progress && st.progress.lessons ? Object.keys(st.progress.lessons) : [];
    const lessonsN = lessonKeys.filter((x) => !x.startsWith("nh:")).length;
    const nhDone = lessonKeys.filter((x) => x.startsWith("nh:")).sort((a, b) => st.progress.lessons[b] - st.progress.lessons[a]);
    const avg = results.length ? Math.round(results.reduce((a, x) => a + (x.pct || 0), 0) / results.length) : null;
    const lastAt = Math.max(results[0] ? results[0].at : 0, st.progress && st.progress.at ? st.progress.at : 0);
    const bySub = {};
    results.forEach((x) => { const b = bySub[x.s] = bySub[x.s] || { n: 0, sum: 0, name: x.subjName || x.s }; b.n++; b.sum += x.pct || 0; });
    const d = gradeData(k.grade);
    const subName = (id) => { const sub = d && d.subjects.find((x) => x.id === id); return sub ? N(sub) : (bySub[id] && bySub[id].name) || id; };
    const subRows = Object.keys(bySub).map((id) => ({ id, avg: Math.round(bySub[id].sum / bySub[id].n), n: bySub[id].n })).sort((a, b) => a.avg - b.avg);
    const weak = subRows.filter((x) => x.avg < 60);
    const codeLive = k.code && k.codeExp > Date.now();
    const n = (k.devices || []).length;
    return `
      <section class="st-kidhero">
        <span class="avatar big">${esc((k.name || "?").trim().charAt(0))}</span>
        <div class="grow"><h2>${esc(k.name)}</h2><small>${esc(gradeName(k.grade))}</small>
          <small>${s("lastActive")}: ${lastAt ? esc(s("ago", daysAgo(lastAt))) : s("never")}</small></div>
      </section>
      <div class="st-kpis">
        <div><b>${avg != null ? num(avg) + "%" : "—"}</b><small>${s("avg")}</small></div>
        <div><b>${num(lessonsN)}</b><small>${s("lessonsDone")}</small></div>
        <div><b>${num(results.length)}</b><small>${s("examsDone")}</small></div>
      </div>
      ${weak.length ? `<div class="st-weak">${icon("alert")}<span><b>${s("weak")}:</b> ${weak.map((x) => esc(subName(x.id))).join("، ")}</span></div>` : ""}
      ${subRows.length ? `<h2 class="sec">${s("bySubject")}</h2><div class="card st-bars">${subRows.map((x) => `<div class="st-brow"><span>${esc(subName(x.id))}</span><span class="st-btrack"><i class="${pctTone(x.avg)}" style="width:${Math.max(4, x.avg)}%"></i></span><b>${num(x.avg)}%</b></div>`).join("")}</div>` : ""}
      ${nhDone.length && window.Nahwi ? `<h2 class="sec">🦉 ${ar() ? "نَحْوِي" : "Nahwi grammar"}<span class="small">${num(nhDone.length)}/${num(window.Nahwi.count)}</span></h2>
        <div class="card st-nhkid"><div class="nh-prog thin"><div style="width:${nhDone.length / window.Nahwi.count * 100}%"></div></div>
        <div class="st-nhlist">${nhDone.slice(0, 8).map((x) => `<span>${esc(window.Nahwi.titleOf(x.slice(3)))}</span>`).join("")}</div></div>` : ""}
      <h2 class="sec">${s("recent")}${st.loading ? `<span class="small">${s("loading")}</span>` : ""}</h2>
      ${results.length ? `<div class="panel">${results.slice(0, 10).map(resultRow).join("")}</div>` : `<div class="panel"><div class="empty">${s("noResults")}</div></div>`}

      ${isYoung(k.grade) ? `<div class="st-young-note">${ic("family")}<span>${s("youngNote")}</span></div>
      <button class="btn block" style="margin-top:12px" data-st="studyAs" data-sid="${esc(k.id)}">${ic("study")}${esc(s("studyWith", k.name))}</button>` : `
      <h2 class="sec">${s("linkCode")}</h2>
      <section class="code-card st-code">
        ${codeLive ? `<div class="code" dir="ltr">${esc(k.code).split("").map((c) => `<span>${c}</span>`).join("")}</div>
          <p class="code-hint">${esc(s("codeValid", fmtDayTime(k.codeExp)))}</p>` : ""}
        <p class="code-hint">${s("linkCodeHint")}</p>
        <div class="code-actions">
          ${codeLive ? `<button class="btn light" data-st="shareCode" data-sid="${esc(k.id)}">${icon("share")}${s("share")}</button><button class="btn light" data-st="copyCode" data-sid="${esc(k.id)}">${icon("copy")}${s("copy")}</button>` : ""}
          <button class="btn light" data-st="newCode" data-sid="${esc(k.id)}">${icon("key")}${codeLive ? s("newCodeAgain") : s("newCode")}</button>
        </div>
        <small class="st-devs">${ic("link")}${esc(s("devices", n))}</small>
      </section>`}
      <div class="panel" style="margin-top:12px">
        ${isYoung(k.grade) ? "" : `<button class="row" data-st="studyAs" data-sid="${esc(k.id)}"><span class="ic">${ic("study")}</span><span class="grow"><span class="t">${esc(s("studyHere", k.name))}</span><span class="s">${s("studyHereSub")}</span></span><span class="end">${icon("chev", "flip")}</span></button>`}
        <button class="row" data-st="editKid" data-sid="${esc(k.id)}"><span class="ic">${icon("pen")}</span><span class="grow"><span class="t">${s("editKid")}</span></span></button>
        ${n ? `<button class="row" data-st="unlinkKid" data-sid="${esc(k.id)}"><span class="ic">${ic("link")}</span><span class="grow"><span class="t">${s("unlink")}</span></span></button>` : ""}
        <button class="row danger" data-st="delKid" data-sid="${esc(k.id)}"><span class="ic">${icon("trash")}</span><span class="grow"><span class="t">${s("deleteKid")}</span></span></button>
      </div>`;
  }
  function fmtDayTime(ts) {
    try { return new Intl.DateTimeFormat(state.lang === "ar" ? "ar-EG-u-nu-latn" : "en-GB", { weekday: "long", hour: "numeric", minute: "2-digit" }).format(new Date(ts)); }
    catch (e) { return new Date(ts).toLocaleString(); }
  }

  function gradeOptions(sel) {
    return (catalog.grades || DEFAULT_CATALOG.grades).map((g) => `<option value="${esc(g.id)}" ${g.id === sel ? "selected" : ""}>${esc(N(g))}</option>`).join("");
  }
  function kidSheet(k) {
    openSheet(`<h3>${k ? s("editKid") : s("addKid")}</h3>
      <div class="field"><label for="kName">${s("kidName")}</label><input id="kName" class="input" maxlength="40" autocomplete="off" value="${esc(k ? k.name : "")}"></div>
      <div class="field"><label for="kGrade">${s("kidGrade")}</label><select id="kGrade" class="input">${gradeOptions(k ? k.grade : "M1")}</select></div>
      <div class="sheet-actions"><button class="btn ghost" data-close>${s("cancel")}</button><button class="btn" id="kSave">${s("save")}</button></div>`,
      (root) => {
        const btn = root.querySelector("#kSave");
        btn.addEventListener("click", async () => {
          const name = root.querySelector("#kName").value.trim().slice(0, 40);
          const grade = root.querySelector("#kGrade").value;
          if (!name) { root.querySelector("#kName").focus(); return; }
          btn.disabled = true;
          try {
            if (k) await backend.editKid(k.id, { name, grade });
            else await backend.addKid(me().uid, { name, grade });
            closeSheet();
            if (k && profile && profile.sid === k.id) { profile.name = name; profile.grade = grade; saveProfile(); }
            await loadKids(true);
          } catch (e) { btn.disabled = false; toast(errMsg(e)); }
        });
      });
  }
  function confirmSheet(title, body, yes, run, danger) {
    openSheet(`<h3>${esc(title)}</h3><p>${esc(body)}</p>
      <div class="sheet-actions"><button class="btn ghost" data-close>${s("cancel")}</button><button class="btn${danger ? " danger" : ""}" id="cfYes">${esc(yes)}</button></div>`,
      (root) => {
        const b = root.querySelector("#cfYes");
        b.addEventListener("click", async () => { b.disabled = true; try { await run(); closeSheet(); } catch (e) { b.disabled = false; toast(errMsg(e)); } });
      });
  }

  function studentLinkSheet() {
    if (!accountsOn()) { toast(s("accUnavailable")); return; }
    if (me()) { toast(s("codeParent")); return; }
    openSheet(`<h3>${s("studentTitle")}</h3>
      <p class="lead" style="margin:0 0 12px">${s("enterCode")}</p>
      <div class="field"><input id="lkCode" class="input st-codein" dir="ltr" maxlength="8" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="${esc(s("codePh"))}"></div>
      <div class="sheet-actions"><button class="btn ghost" data-close>${s("cancel")}</button><button class="btn" id="lkGo">${s("link")}</button></div>`,
      (root) => {
        const inp = root.querySelector("#lkCode"), btn = root.querySelector("#lkGo");
        inp.addEventListener("input", () => { inp.value = inp.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8); });
        const go = async () => {
          const code = inp.value.trim();
          if (code.length !== 8) { toast(s("codeBad")); inp.focus(); return; }
          btn.disabled = true; btn.textContent = s("linking");
          try {
            const r = await backend.claim(code);
            profile = { mode: "student", sid: r.sid, name: r.name, grade: r.grade, uid: r.uid };
            saveProfile(); prog = null;
            closeSheet();
            toast(s("linked", r.name));
            reset(); ctx.refresh(true);
          } catch (e) { btn.disabled = false; btn.textContent = s("link"); toast(errMsg(e, true)); }
        };
        btn.addEventListener("click", go);
        inp.addEventListener("keydown", (e) => { if (e.key === "Enter") go(); });
      });
  }

  async function parentSignIn() {
    const run = async () => {
      if (profile && profile.mode === "student") {
        try { await backend.leave(profile.sid, profile.uid); } catch (e) { /* ignore */ }
        try { await backend.signOutAnon(); } catch (e) { /* ignore */ }
        profile = null; saveProfile(); prog = null;
      }
      const ok = await account.signIn();
      if (ok) { await loadKids(true); }
      refresh();
    };
    if (profile && profile.mode === "student" && !profile.unlinked) {
      openSheet(`<h3>${s("parentTitle")}</h3><p>${s("studentDeviceWarn")}</p>
        <div class="sheet-actions"><button class="btn ghost" data-close>${s("cancel")}</button><button class="btn" id="psGo">${s("continueAnyway")}</button></div>`,
        (root) => root.querySelector("#psGo").addEventListener("click", () => { closeSheet(); run(); }));
      return;
    }
    run();
  }

  /* ================= Events ================= */
  function onClick(e) {
    const el = e.target.closest("[data-st]");
    if (!el || el.disabled) return false;
    const a = el.dataset.st, g = el.dataset.g, sid = el.dataset.s;
    const goTab = () => { if (ctx.ensureTab) ctx.ensureTab(); };
    switch (a) {
      case "open": goTab(); reset(); if (el.dataset.to === "parent") nav.push({ v: "parent" }); if (el.dataset.to === "kid") { loadKidStats(el.dataset.sid, true); nav.push({ v: "parent" }, { v: "kid", sid: el.dataset.sid }); } ctx.refresh(true); break;
      case "grade": if (g !== (top().g)) state.studyTerm = null; push({ v: "grade", g }); break;
      case "setGrade":
        profile = Object.assign({}, profile || {}, { mode: (profile && profile.mode) || "guest", grade: g }); saveProfile();
        ctx.refresh(false); break;
      case "term": state.studyTerm = +el.dataset.t; ctx.refresh(false); break;
      case "subject": push({ v: "subject", g, s: sid }); break;
      case "lessons": push({ v: "lessons", g, s: sid }); break;
      case "lesson": {
        const r = { v: "lesson", g, s: sid, l: el.dataset.l };
        if (el.dataset.rep) replace(r); else { goTab(); if (top().v === "home" && !nav.some((x) => x.v === "subject")) nav.push({ v: "subject", g, s: sid }); push(r); }
        break;
      }
      case "saved": push({ v: "saved", g, s: sid }); break;
      case "book": push({ v: "book", g, s: sid, b: 0 }); break;
      case "bookPick": closePdf(); replace(Object.assign({}, top(), { b: +el.dataset.i })); break;
      case "bookRetry": closePdf(); ctx.refresh(false); break;
      case "zoom": zoomBook(+el.dataset.d); break;
      case "goPage": goPageSheet(); break;
      case "sets": push({ v: "sets", g, s: sid, k: el.dataset.k }); break;
      case "pastPdf": {
        const sub = subjectOf(g, sid); const set = sub && (sub.sets || []).find((x) => x.id === el.dataset.set);
        if (set && set.pdf) push({ v: "book", g, s: sid, pdf: set.pdf, title: N(set) });
        break;
      }
      case "startSet": {
        const sub = subjectOf(g, sid); const set = sub && (sub.sets || []).find((x) => x.id === el.dataset.set);
        if (set) startSheet(g, sid, set);
        break;
      }
      case "mistakes": {
        const ids = Object.keys(P_().wrong).filter((k) => { const w = P_().wrong[k]; return w.g === g && w.s === sid && QIDX[k]; });
        if (!ids.length) { toast(s("noMistakes")); break; }
        startSheet(g, sid, null, shuffle(ids.map((k) => QIDX[k].q)).slice(0, 30), s("mistakes"));
        break;
      }
      case "mark": { const p = P_(); const id = el.dataset.l; if (p.marks[id]) delete p.marks[id]; else p.marks[id] = Date.now(); saveProg(); ctx.refresh(false); break; }
      case "done": {
        const p = P_(); const id = el.dataset.l;
        if (!p.lessons[id]) { p.lessons[id] = Date.now(); saveProg(); syncLesson(id); }
        ctx.refresh(false); break;
      }
      case "chk": case "chkFill": {
        const box = el.closest(".st-chk"); const info = QIDX[el.dataset.q]; if (!box || !info) break;
        const q = info.q;
        const ans = a === "chk" ? el.dataset.k : (box.querySelector("input") || {}).value;
        if (a === "chkFill" && !String(ans || "").trim()) break;
        const ok = isRight(q, q.t === "mcq" ? Number(ans) : ans);
        box.querySelectorAll(".st-opt").forEach((b) => { b.disabled = true; if (isRight(q, q.t === "mcq" ? Number(b.dataset.k) : b.dataset.k)) b.classList.add("right"); else if (b === el) b.classList.add("wrong"); });
        const inp = box.querySelector("input"); if (inp) inp.disabled = true;
        const fbb = box.querySelector(".st-fb");
        fbb.hidden = false; fbb.className = "st-fb " + (ok ? "ok" : "no");
        fbb.innerHTML = `<b>${ok ? s("correct") : s("wrong")}</b>${ok ? "" : `<span>${s("rightAnswer")} <b>${rich(rightText(q))}</b></span>`}${q.e ? `<p>${rich(q.e)}</p>` : ""}`;
        break;
      }
      case "qzPick": {
        const q = quiz.qs[quiz.i];
        quiz.ans[q.id] = q.t === "tf" ? el.dataset.k : Number(el.dataset.k);
        if (quiz.mode === "practice") quiz.chk[q.id] = true;
        ctx.refresh(false); break;
      }
      case "qzCheck": qzCheck(); break;
      case "qzReveal": qzReveal(); break;
      case "qzNext": qzMove(1); break;
      case "qzPrev": qzMove(-1); break;
      case "qzGo": quiz.i = +el.dataset.i; ctx.refresh(false); break;
      case "qzFinish": finishQuiz(false); break;
      case "retry": case "retryWrong": {
        const old = quiz;
        const qs = a === "retry" ? old.qs : old.qs.filter((q) => old.wrongIds.includes(q.id));
        nav.pop();
        beginQuiz({ g: old.g, s: old.s, set: old.set, kind: old.kind, title: old.title, qs, mode: old.mode, minutes: Math.max(5, Math.round(qs.length * 1.5)) });
        break;
      }
      case "toSubject": {
        quiz = null;
        while (nav.length > 1 && top().v !== "subject") nav.pop();
        ctx.refresh(true); break;
      }
      case "history": push({ v: "history" }); break;
      case "clearBooks":
        (async () => { try { await caches.delete("dalil-books"); } catch (er) { /* ignore */ } toast(s("clearedBooks")); })();
        break;
      case "resetLocal":
        confirmSheet(s("resetLocalQ"), s("resetLocal"), s("del"), async () => { store.set(progKey(), {}); prog = null; toast(s("resetDone")); refresh(); }, true);
        break;
      case "reloadContent": Object.keys(content).forEach((k) => { if (content[k].status === "fail") delete content[k]; }); ctx.refresh(false); break;
      // accounts
      case "parent": push({ v: "parent" }); break;
      case "studentLink": studentLinkSheet(); break;
      case "leave":
        confirmSheet(s("leaveQ"), s("leaveBody"), s("leaveLink"), async () => {
          try { await backend.leave(profile.sid, profile.uid); } catch (er) { /* offline: still clear locally */ }
          try { await backend.signOutAnon(); } catch (er) { /* ignore */ }
          profile = null; saveProfile(); prog = null; reset(); ctx.refresh(true);
        }, true);
        break;
      case "stopAs": profile = profile && profile.grade ? { mode: "guest", grade: profile.grade } : null; saveProfile(); prog = null; ctx.refresh(false); break;
      case "parentSignIn": parentSignIn(); break;
      case "parentSignOut": (async () => { if (account.signOut) await account.signOut(); parent.kids = null; if (profile && profile.mode === "parentAs") { profile = null; saveProfile(); prog = null; } reset(); ctx.refresh(true); })(); break;
      case "reloadKids": loadKids(true); break;
      case "addKid": kidSheet(null); break;
      case "importKids": (async () => {
        el.disabled = true;
        try { for (const c of state.children || []) if (OLD_GRADE[c.grade]) await backend.addKid(me().uid, { name: c.name, grade: OLD_GRADE[c.grade] }); await loadKids(true); }
        catch (er) { el.disabled = false; toast(errMsg(er)); }
      })(); break;
      case "kid": loadKidStats(el.dataset.sid, true); push({ v: "kid", sid: el.dataset.sid }); break;
      case "editKid": kidSheet((parent.kids || []).find((x) => x.id === el.dataset.sid)); break;
      case "delKid": {
        const k = (parent.kids || []).find((x) => x.id === el.dataset.sid); if (!k) break;
        confirmSheet(s("deleteKidQ", k.name), s("deleteKidBody"), s("del"), async () => {
          await backend.delKid(k.id, k);
          if (profile && profile.sid === k.id) { profile = null; saveProfile(); prog = null; }
          delete parent.stats[k.id];
          nav.pop(); await loadKids(true); ctx.refresh(true);
        }, true);
        break;
      }
      case "unlinkKid": {
        const k = (parent.kids || []).find((x) => x.id === el.dataset.sid); if (!k) break;
        confirmSheet(s("unlink"), s("unlinkBody"), s("unlink"), async () => { await backend.unlink(k.id); toast(s("unlinked")); await loadKids(true); }, true);
        break;
      }
      case "newCode": if (isYoung(((parent.kids || []).find((x) => x.id === el.dataset.sid) || {}).grade)) { toast(s("noYoungCode")); break; } (async () => {
        const k = (parent.kids || []).find((x) => x.id === el.dataset.sid); if (!k) return;
        el.disabled = true;
        try { const r = await backend.newCode(me().uid, k.id, k.code); k.code = r.code; k.codeExp = r.exp; refresh(); }
        catch (er) { el.disabled = false; toast(errMsg(er)); }
      })(); break;
      case "copyCode": case "shareCode": {
        const k = (parent.kids || []).find((x) => x.id === el.dataset.sid); if (!k || !k.code) break;
        if (a === "copyCode") {
          (navigator.clipboard ? navigator.clipboard.writeText(k.code) : Promise.reject()).then(() => toast(s("copied")), () => toast(k.code));
        } else {
          const Sh = P("Share"); const text = s("shareText", k.name, k.code);
          if (Sh) Sh.share({ text }).catch(() => {}); else if (navigator.share) navigator.share({ text }).catch(() => {}); else toast(k.code);
        }
        break;
      }
      case "say": say(el.dataset.say || ""); break;
      case "nahwi": push({ v: "nahwi", g: g || undefined }); break;
      case "nh": if (window.Nahwi) window.Nahwi.click(el, nhApi); break;
      case "studyAs": {
        const k = (parent.kids || []).find((x) => x.id === el.dataset.sid); if (!k) break;
        profile = { mode: "parentAs", sid: k.id, name: k.name, grade: k.grade }; saveProfile(); prog = null;
        reset(); state.studyTerm = null; nav.push({ v: "grade", g: k.grade }); ctx.refresh(true);
        break;
      }
      case "deleteParent":
        confirmSheet(s("deleteAllQ"), s("deleteAllBody"), s("del"), async () => {
          try { await backend.deleteParent(me().uid); }
          catch (er) { if (/recent|requires-recent-login|RECENT/i.test(String(er && (er.message || er.code)))) { toast(s("reauth")); return; } throw er; }
          if (profile && profile.mode === "parentAs") { profile = null; saveProfile(); prog = null; }
          if (account.signOut) await account.signOut();
          parent.kids = null; toast(s("deleted")); reset(); ctx.refresh(true);
        }, true);
        break;
      default: return false;
    }
    return true;
  }

  /* ================= Public API ================= */
  function mount(root) {
    // left the study tab: free the book's memory; an exam timer keeps running like a real exam
    if (!root) { if (pdf) closePdf(); return; }
    const r = top();
    if (r.v === "quiz") mountQuiz(root); else stopTimer();
    if (r.v === "book") mountBook(root);
    else if (pdf) closePdf();
  }
  function onBack() {
    if (top().v === "quiz" && quiz && !quiz.done) { confirmExitQuiz(); return true; }
    return back();
  }
  // home screen card
  function homeCard() {
    const g = profile && profile.grade;
    const sub = g ? `${esc(gradeName(g))}${profile.name ? " · " + esc(profile.name) : ""}` : s("lead");
    return `<button class="st-homecard" data-st="open">
      <span class="st-hmark">${ic("study")}</span>
      <span class="grow"><b>${s("title")}</b><small>${sub}</small></span>
      <span class="end">${icon("chev", "flip")}</span></button>`;
  }
  // replaces the local "my children" list on the home screen when a parent is signed in
  function homeKids() {
    if (!accountsOn() || !me()) return null;
    loadKids();
    if (!parent.kids) return `<div class="panel"><div class="empty">${s("loading")}</div></div>`;
    if (!parent.kids.length) return `<div class="panel"><div class="empty">${s("noKids")}<button class="btn ghost" data-st="open" data-to="parent">${icon("plus")}${s("addKid")}</button></div></div>`;
    return `<div class="panel">${parent.kids.map((k) => `<button class="child row" data-st="open" data-to="kid" data-sid="${esc(k.id)}"><span class="avatar">${esc((k.name || "?").trim().charAt(0))}</span>
      <span class="grow"><b>${esc(k.name)}</b><span class="small" style="display:block">${esc(gradeName(k.grade))} · ${esc(s("devices", (k.devices || []).length))}</span></span><span class="end">${icon("chev", "flip")}</span></button>`).join("")}</div>`;
  }

  checkStudentLink();
  if (profile && profile.mode === "student") nav = [{ v: "home" }];

  return {
    view, mount, onClick, onBack, homeCard, homeKids, parentCta,
    label: () => s("tab"),
    canBack: () => nav.length > 1,
    fullScreen: () => top().v === "quiz" || top().v === "book",
    reset: () => { if (top().v === "quiz" && quiz && !quiz.done) { confirmExitQuiz(); return false; } reset(); return true; },
    isStudentDevice: () => !!(profile && profile.mode === "student"),
    // banner only on browsing pages, never during an exam, on results or inside the book
    wantsBanner: () => !youngNow() && ["home", "grade", "subject", "lessons", "lesson", "sets", "saved", "history"].includes(top().v),
    busyView: () => ["book", "quiz"].includes(top().v),
    parentKidsVisible: () => !!(accountsOn() && me())
  };
};
