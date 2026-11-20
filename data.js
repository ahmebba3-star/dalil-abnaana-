/* البيانات الثابتة للتطبيق — Static app data */

window.OFFICIAL_LINKS = {
  sabroad: "https://sabroad.emis.gov.eg",
  sabroadLogin: "https://sabroad-register.emis.gov.eg/Identity/Account/Login",
  moe: "https://moe.gov.eg",
  mfa: "https://www.mfa.gov.eg",
  digital: "https://digital.gov.eg"
};

/*
  الدول: الإحداثيات للعاصمة (لمواقيت الصلاة)، العملة، طريقة حساب الصلاة،
  مقر السفارة والقنصليات، وأرقام الطوارئ المحلية.
  method: اسم طريقة الحساب في مكتبة adhan
*/
window.COUNTRIES = [
  { code: "SA", ar: "السعودية", en: "Saudi Arabia", flag: "🇸🇦", cur: "SAR", lat: 24.7136, lng: 46.6753, city_ar: "الرياض", city_en: "Riyadh", method: "UmmAlQura",
    consulates_ar: ["جدة"], consulates_en: ["Jeddah"],
    emergency: [["911", "الطوارئ الموحد", "Unified emergency"], ["999", "الشرطة", "Police"], ["997", "الإسعاف", "Ambulance"], ["998", "الدفاع المدني", "Civil defense"]] },
  { code: "AE", ar: "الإمارات", en: "UAE", flag: "🇦🇪", cur: "AED", lat: 24.4539, lng: 54.3773, city_ar: "أبوظبي", city_en: "Abu Dhabi", method: "Dubai",
    consulates_ar: ["دبي"], consulates_en: ["Dubai"],
    emergency: [["999", "الشرطة", "Police"], ["998", "الإسعاف", "Ambulance"], ["997", "الدفاع المدني", "Civil defense"]] },
  { code: "KW", ar: "الكويت", en: "Kuwait", flag: "🇰🇼", cur: "KWD", lat: 29.3759, lng: 47.9774, city_ar: "مدينة الكويت", city_en: "Kuwait City", method: "Kuwait",
    emergency: [["112", "الطوارئ", "Emergency"]] },
  { code: "QA", ar: "قطر", en: "Qatar", flag: "🇶🇦", cur: "QAR", lat: 25.2854, lng: 51.531, city_ar: "الدوحة", city_en: "Doha", method: "Qatar",
    emergency: [["999", "الطوارئ", "Emergency"]] },
  { code: "BH", ar: "البحرين", en: "Bahrain", flag: "🇧🇭", cur: "BHD", lat: 26.2285, lng: 50.586, city_ar: "المنامة", city_en: "Manama", method: "MuslimWorldLeague",
    emergency: [["999", "الطوارئ", "Emergency"]] },
  { code: "OM", ar: "عُمان", en: "Oman", flag: "🇴🇲", cur: "OMR", lat: 23.588, lng: 58.3829, city_ar: "مسقط", city_en: "Muscat", method: "MuslimWorldLeague",
    emergency: [["9999", "الطوارئ", "Emergency"]] },
  { code: "JO", ar: "الأردن", en: "Jordan", flag: "🇯🇴", cur: "JOD", lat: 31.9454, lng: 35.9284, city_ar: "عمّان", city_en: "Amman", method: "MuslimWorldLeague",
    emergency: [["911", "الطوارئ", "Emergency"]] },
  { code: "LB", ar: "لبنان", en: "Lebanon", flag: "🇱🇧", cur: "LBP", lat: 33.8938, lng: 35.5018, city_ar: "بيروت", city_en: "Beirut", method: "MuslimWorldLeague",
    emergency: [["112", "الشرطة", "Police"], ["140", "الصليب الأحمر", "Red Cross"], ["125", "الدفاع المدني", "Civil defense"]] },
  { code: "LY", ar: "ليبيا", en: "Libya", flag: "🇱🇾", cur: "LYD", lat: 32.8872, lng: 13.1913, city_ar: "طرابلس", city_en: "Tripoli", method: "Egyptian",
    emergency: [] },
  { code: "IT", ar: "إيطاليا", en: "Italy", flag: "🇮🇹", cur: "EUR", lat: 41.9028, lng: 12.4964, city_ar: "روما", city_en: "Rome", method: "MuslimWorldLeague",
    consulates_ar: ["ميلانو"], consulates_en: ["Milan"],
    emergency: [["112", "الطوارئ", "Emergency"]] },
  { code: "FR", ar: "فرنسا", en: "France", flag: "🇫🇷", cur: "EUR", lat: 48.8566, lng: 2.3522, city_ar: "باريس", city_en: "Paris", method: "MuslimWorldLeague",
    emergency: [["112", "الطوارئ", "Emergency"]] },
  { code: "DE", ar: "ألمانيا", en: "Germany", flag: "🇩🇪", cur: "EUR", lat: 52.52, lng: 13.405, city_ar: "برلين", city_en: "Berlin", method: "MuslimWorldLeague",
    emergency: [["112", "الطوارئ والإسعاف", "Emergency & ambulance"], ["110", "الشرطة", "Police"]] },
  { code: "NL", ar: "هولندا", en: "Netherlands", flag: "🇳🇱", cur: "EUR", lat: 52.0705, lng: 4.3007, city_ar: "لاهاي", city_en: "The Hague", method: "MuslimWorldLeague",
    emergency: [["112", "الطوارئ", "Emergency"]] },
  { code: "GR", ar: "اليونان", en: "Greece", flag: "🇬🇷", cur: "EUR", lat: 37.9838, lng: 23.7275, city_ar: "أثينا", city_en: "Athens", method: "MuslimWorldLeague",
    emergency: [["112", "الطوارئ", "Emergency"]] },
  { code: "GB", ar: "المملكة المتحدة", en: "United Kingdom", flag: "🇬🇧", cur: "GBP", lat: 51.5074, lng: -0.1278, city_ar: "لندن", city_en: "London", method: "MoonsightingCommittee",
    emergency: [["999", "الطوارئ", "Emergency"], ["112", "الطوارئ (بديل)", "Emergency (alt.)"]] },
  { code: "US", ar: "الولايات المتحدة", en: "United States", flag: "🇺🇸", cur: "USD", lat: 38.9072, lng: -77.0369, city_ar: "واشنطن", city_en: "Washington, D.C.", method: "NorthAmerica",
    consulates_ar: ["نيويورك", "شيكاغو", "هيوستن", "لوس أنجلوس", "سان فرانسيسكو"], consulates_en: ["New York", "Chicago", "Houston", "Los Angeles", "San Francisco"],
    emergency: [["911", "الطوارئ", "Emergency"]] },
  { code: "CA", ar: "كندا", en: "Canada", flag: "🇨🇦", cur: "CAD", lat: 45.4215, lng: -75.6972, city_ar: "أوتاوا", city_en: "Ottawa", method: "NorthAmerica",
    consulates_ar: ["مونتريال"], consulates_en: ["Montreal"],
    emergency: [["911", "الطوارئ", "Emergency"]] },
  { code: "AU", ar: "أستراليا", en: "Australia", flag: "🇦🇺", cur: "AUD", lat: -35.2809, lng: 149.13, city_ar: "كانبرا", city_en: "Canberra", method: "MuslimWorldLeague",
    consulates_ar: ["سيدني", "ملبورن"], consulates_en: ["Sydney", "Melbourne"],
    emergency: [["000", "الطوارئ", "Emergency"]] },
  { code: "OT", ar: "دولة أخرى", en: "Other country", flag: "🌍", cur: "USD", lat: 30.0444, lng: 31.2357, city_ar: "", city_en: "", method: "Egyptian",
    emergency: [] }
];

window.GRADES = [
  ["KG1", "رياض أطفال 1", "KG 1"], ["KG2", "رياض أطفال 2", "KG 2"],
  ["P1", "الأول الابتدائي", "Primary 1"], ["P2", "الثاني الابتدائي", "Primary 2"],
  ["P3", "الثالث الابتدائي", "Primary 3"], ["P4", "الرابع الابتدائي", "Primary 4"],
  ["P5", "الخامس الابتدائي", "Primary 5"], ["P6", "السادس الابتدائي", "Primary 6"],
  ["M1", "الأول الإعدادي", "Preparatory 1"], ["M2", "الثاني الإعدادي", "Preparatory 2"],
  ["M3", "الثالث الإعدادي (الشهادة)", "Preparatory 3 (certificate)"],
  ["S1", "الأول الثانوي", "Secondary 1"], ["S2", "الثاني الثانوي", "Secondary 2"]
];

/* خطوات التسجيل — حسب تعليمات 2026/2027 وتجربة تسجيل فعلية (نوفمبر 2026) */
window.REG_STEPS = {
  ar: [
    ["سجّل دخول بإيميل مايكروسوفت", "ادخل على المنصة الرسمية sabroad.emis.gov.eg وسجّل دخول بإيميل Hotmail أو Outlook أو Live. لو سجّلت السنة اللي فاتت، ادخل بنفس الإيميل."],
    ["حدد عدد الأبناء وادفع", "حدد عدد الأبناء وادفع الرسوم أونلاين: 150 دولار لكل طالب. اتأكد من شرط السن قبل الدفع، واحفظ الإيصال."],
    ["سجّل كل ابن", "لو الطالب كان مسجّل على المنصة السنة اللي فاتت، اكتب رقمه القومي وبياناته وصفه هيظهروا لوحدهم. ولو جديد، املأ كل بياناته زي شهادة الميلاد بالظبط."],
    ["ارفع المستندات", "الطالب اللي كان مسجّل: صورته، ونتيجة آخر سنة من المنصة، وشهادة الميلاد. الطالب الجديد: كل المستندات المطلوبة حسب حالته."],
    ["الطالب الجديد: ابعت الأصول", "اطبع الاستمارة. الطالب الجديد لازم أصول مستنداته تتبعت بالبريد للإدارة في القاهرة، وإلا النتيجة بتتحجب."],
    ["تابع واستلم رقم الجلوس", "تابع حساب ولي الأمر والإيميل، وقبل الامتحان هتلاقي رقم الجلوس وحساب الطالب. الترم الأول يبدأ السبت 9 يناير 2027."]
  ],
  en: [
    ["Sign in with a Microsoft email", "Go to the official platform sabroad.emis.gov.eg and sign in with a Hotmail, Outlook or Live email. If you registered last year, use the same email."],
    ["Set the number of children and pay", "Set how many children you are registering and pay online: 150 US dollars per student. Check the age rule before paying and keep the receipt."],
    ["Register each child", "If the student was registered on the platform last year, enter their national ID and their details and grade appear automatically. A new student needs all details filled in exactly as on the birth certificate."],
    ["Upload the documents", "Returning student: photo, last year's result from the platform and birth certificate. New student: all the documents required for their case."],
    ["New students: post the originals", "Print the form. A new student's original documents must be posted to the administration in Cairo, or the result is withheld."],
    ["Follow up and get the seat number", "Check the parent account and your email; before the exam you'll find the seat number and student account. First term starts Saturday 9 January 2027."]
  ]
};

window.REG_DOCS = {
  ar: [
    "صورة شخصية حديثة للطالب",
    "شهادة ميلاد الطالب بالرقم القومي",
    "طالب كان مسجّل على المنصة: نتيجة آخر سنة مطبوعة من المنصة",
    "طالب جديد: بيان نجاح آخر صف (الشهادات الصادرة خارج مصر لازم تكون معادلة وموثّقة)، وإقامة سارية أو تأشيرة عليها تاريخ الدخول",
    "KG وأولى وتانية ابتدائي: ملف التقييم والأنشطة"
  ],
  en: [
    "A recent personal photo of the student",
    "The student's birth certificate with national ID number",
    "Returning student: last year's result printed from the platform",
    "New student: last grade's pass statement (certificates issued outside Egypt must be equated and attested), plus a valid residence permit or a visa showing the entry date",
    "KG, Primary 1 and 2: the assessment and activities file"
  ]
};

/* دليل التسجيل المفصّل (بالرسوم التوضيحية) — حسب تعليمات 2025/2026 المنشورة، لحد ما تصدر تعليمات 2026/2027 */
window.REG_GUIDE = {
  basis_ar: "الخطوات دي حسب تعليمات العام الدراسي 2026/2027 وتجربة تسجيل فعلية على المنصة في نوفمبر 2026. الرسومات توضيحية، وشكل المنصة الفعلي ممكن يختلف.",
  basis_en: "These steps follow the 2026/2027 instructions and an actual registration on the platform in November 2026. Drawings are illustrative; the real platform may look different.",
  steps: [
    { art: "prep",
      ar: { t: "جهّز قبل ما تبدأ", d: "خلّص الحاجات دي الأول عشان التسجيل يمشي في جلسة واحدة:",
        items: ["إيميل من مايكروسوفت (Hotmail أو Outlook أو Live) شغال وبتفتحه باستمرار، لأن الردود وطلبات المستندات بتوصل عليه", "كارت دفع إلكتروني يقبل الدفع الدولي بالدولار", "بيانات شهادة ميلاد كل طالب: الاسم الرباعي والرقم القومي (14 رقم)", "مستندات كل طالب متصوّرة بالماسح (Scanner) وواضحة"],
        tip: "حوّل مستندات كل طالب لملف PDF واحد واضح، وحجمه أقل من 2 ميجابايت." },
      en: { t: "Get ready first", d: "Have these ready so you can finish in one sitting:",
        items: ["A working Microsoft email (Hotmail, Outlook or Live) you check regularly: replies and document requests arrive there", "A card that accepts international payments in US dollars", "Each student's birth-certificate details: full name and 14-digit national ID", "Clear scanned copies of each student's documents"],
        tip: "Combine each student's documents into one clear PDF under 2 MB." } },
    { art: "portal",
      ar: { t: "افتح بوابة التسجيل الرسمية", d: "من المتصفح على الموبايل أو الكمبيوتر:",
        items: ["ادخل على المنصة الرسمية sabroad.emis.gov.eg", "من القائمة اختار «التسجيل على البوابة»، أو اضغط زرار «حساب ولي الأمر» هنا تحت", "اتأكد إن العنوان آخره .gov.eg قبل ما تكتب أي بيانات"],
        tip: "متدفعش ولا تكتب بياناتك في أي موقع أو صفحة تانية بتقول إنها بتسجّل لـ«أبناؤنا في الخارج»." },
      en: { t: "Open the official registration portal", d: "In your phone or computer browser:",
        items: ["Go to the official platform sabroad.emis.gov.eg", "From the menu choose “Portal registration”, or tap “Parent account” below", "Make sure the address ends in .gov.eg before typing anything"],
        tip: "Never pay or enter details on any other site or page claiming to register for “Our Children Abroad”." } },
    { art: "account",
      ar: { t: "سجّل دخول بإيميل مايكروسوفت", d: "الدخول على المنصة بيتم بحساب مايكروسوفت:",
        items: ["اضغط تسجيل الدخول واكتب إيميل الـHotmail أو Outlook أو Live وكلمة سره", "لو سجّلت ولادك السنة اللي فاتت، ادخل بنفس الإيميل عشان بياناتهم تظهر", "أول مرة: كمّل بيانات ولي الأمر زي ما هي في الرقم القومي، ورقم الموبايل بالكود الدولي"],
        tip: "معندكش إيميل مايكروسوفت؟ اعمل واحد ببلاش من outlook.com قبل ما تبدأ." },
      en: { t: "Sign in with a Microsoft email", d: "The platform uses a Microsoft account to sign in:",
        items: ["Tap sign in and enter your Hotmail, Outlook or Live email and its password", "If you registered your children last year, use the same email so their details appear", "First time: complete the parent's details exactly as on the national ID, and the mobile number with the country code"],
        tip: "No Microsoft email? Create one free at outlook.com before you start." } },
    { art: "pay",
      ar: { t: "حدد عدد الأبناء وادفع الرسوم", d: "قبل تسجيل بيانات الأبناء:",
        items: ["حدد عدد الأبناء اللي هيمتحنوا السنة دي", "الرسوم 150 دولار لكل طالب من KG1 لتانية ثانوي، بتتدفع أونلاين بالكارت من المنصة", "قبل الدفع اتأكد إن كل طفل مطابق لشرط السن، لأن الرسوم ما بترجعش لو مخالف", "خد صورة شاشة لإيصال الدفع واحتفظ بيه"],
        tip: "طلب الاسترداد بيتبعت على Financial@moe.edu.eg مع كل الإيصالات. آخر ميعاد: 31 ديسمبر 2026 للترم الأول، و30 أبريل 2027 للترم التاني." },
      en: { t: "Set the number of children and pay", d: "Before entering the children's details:",
        items: ["Set how many children will sit the exams this year", "The fee is 150 US dollars per student from KG1 to Secondary 2, paid online by card on the platform", "Before paying, make sure each child meets the age rule; fees are not refunded otherwise", "Take a screenshot of the receipt and keep it"],
        tip: "Refund requests go to Financial@moe.edu.eg with all receipts. Deadlines: 31 December 2026 (term 1) and 30 April 2027 (term 2)." } },
    { art: "form",
      ar: { t: "سجّل بيانات كل ابن", d: "فيه حالتين:",
        items: ["طالب كان مسجّل على المنصة السنة اللي فاتت: اكتب رقمه القومي (14 رقم)، وبياناته وصفه الجديد هيظهروا لوحدهم. راجعهم بس", "طالب جديد: املأ كل البيانات بالظبط زي شهادة الميلاد، حرف حرف: الاسم الرباعي، والرقم القومي، وتاريخ الميلاد", "اختار الصف ونوع التعليم (عربي أو لغات) ودولة الإقامة"],
        tip: "أي اختلاف بين البيانات والمستندات الأصلية ممكن يلغي التقديم، وولي الأمر هو المسؤول عن صحتها." },
      en: { t: "Register each child", d: "There are two cases:",
        items: ["A student registered on the platform last year: enter their 14-digit national ID and their details and new grade appear automatically. Just review them", "A new student: fill in every detail exactly as on the birth certificate, letter by letter: full name, national ID and date of birth", "Choose the grade, the track (Arabic or language school) and the country of residence"],
        tip: "Any mismatch with the original documents can cancel the application; the parent is responsible for accuracy." } },
    { art: "upload",
      ar: { t: "ارفع المستندات", d: "كل ملف PDF أو صورة واضحة، وأقل من 2 ميجابايت:",
        items: ["الطالب اللي كان مسجّل: صورة شخصية حديثة، ونتيجة آخر سنة مطبوعة من المنصة، وشهادة الميلاد", "الطالب الجديد: صورة شخصية حديثة، وشهادة الميلاد المميكنة بالرقم القومي، وإقامة سارية أو تأشيرة عليها تاريخ الدخول، وبيان نجاح آخر صف (من برّه مصر لازم يكون معادل ومعتمد)", "حالات خاصة (مدارس دولية، محوّل من الأزهر، دمج): شوف «المستندات المطلوبة» في صفحة الامتحانات", "KG وأولى وتانية ابتدائي: ارفع ملف التقييم والأنشطة على المنصة، ومن غيره مفيش شهادة نجاح"],
        tip: "استخدم «صغّر ملف PDF» و«صورة الطالب» من الصفحة الأولى عشان الملفات تبقى بالحجم المطلوب." },
      en: { t: "Upload the documents", d: "Each file a clear PDF or image under 2 MB:",
        items: ["Returning student: a recent photo, last year's result printed from the platform, and the birth certificate", "New student: a recent photo, the machine-readable birth certificate with national ID, a valid residence permit or a visa showing the entry date, and the last grade's pass statement (from abroad it must be equated and attested)", "Special cases (international schools, transfer from Al-Azhar, inclusion): see “Required documents” on the exams page", "KG, Primary 1 and 2: upload the assessment and activities file on the platform; without it there's no pass certificate"],
        tip: "Use “Shrink PDF” and “Student photo” on the home page to get the files to the required size." } },
    { art: "print",
      ar: { t: "اطبع الاستمارة، والطالب الجديد يبعت الأصول", d: "بعد ما التسجيل يكتمل:",
        items: ["اطبع استمارة التقديم من حسابك", "الطالب الجديد: دبّس الاستمارة مع أصول المستندات اللي رفعت صورها، وابعتهم بالبريد للإدارة العامة للامتحانات: 16 ش أمين سامي، المنيرة، السيدة زينب، القاهرة", "الطالب اللي كان مسجّل قبل كده: احتفظ بالاستمارة، إلا لو المنصة طلبت منك أصول"],
        tip: "لو أصول الطالب الجديد ما وصلتش، نتيجته بتتحجب. والأصول لازم تكون مطابقة للصور اللي اترفعت." },
      en: { t: "Print the form; new students post the originals", d: "Once registration is complete:",
        items: ["Print the application form from your account", "New student: staple the form to the original documents you uploaded and post them to the General Administration of Exams: 16 Amin Sami St, El Mounira, Sayeda Zeinab, Cairo", "Returning student: keep the form, unless the platform asks you for originals"],
        tip: "If a new student's originals don't arrive, their result is withheld. Originals must match the uploaded copies." } },
    { art: "seat",
      ar: { t: "تابع الحساب واستلم رقم الجلوس", d: "بعد التسجيل وقبل الامتحان:",
        items: ["ادخل على حساب ولي الأمر كل فترة وشوف الرسائل", "لو اتطلبت مستندات إضافية، ارفعها بسرعة", "قبل الامتحان هتلاقي رقم الجلوس وحساب الطالب في حساب ولي الأمر. الترم الأول يبدأ السبت 9 يناير 2027", "يوم الامتحان: اضبط تاريخ ووقت جهاز الطالب على توقيت الدولة اللي هو فيها"],
        tip: "تابع الإيميل كمان، لأن مشرف الصف ممكن يبعت استفسارات عليه." },
      en: { t: "Follow up and get the seat number", d: "After registering and before the exam:",
        items: ["Log in to the parent account regularly and check messages", "If extra documents are requested, upload them quickly", "Before the exam, the seat number and student account appear in the parent account. Term 1 starts Saturday 9 January 2027", "Exam day: set the student's device date and time to the country they are in"],
        tip: "Check your email too; the grade supervisor may send questions there." } }
  ]
};

/* دليل الخدمات القنصلية — معلومات عامة، والتفاصيل تختلف حسب كل سفارة */
window.CONSULAR = [
  { id: "passport", icon: "passport",
    ar: { t: "تجديد أو استخراج جواز السفر", d: "تقدَّم الطلبات في القسم القنصلي بالسفارة أو القنصلية التابع لها محل إقامتك.",
      items: ["الجواز الحالي وصورة منه", "صور شخصية حديثة بالمقاس المطلوب", "بطاقة الرقم القومي أو صورتها", "صورة الإقامة في دولة الإقامة", "ما يثبت المهنة لو هتتغير في الجواز"],
      note: "أعلنت وزارة الخارجية في أغسطس 2026 تقليص مدة استخراج الجواز إلى أسبوعين." },
    en: { t: "Renew or issue a passport", d: "Apply at the consular section of the embassy or consulate that covers where you live.",
      items: ["Current passport and a copy", "Recent photos in the required size", "National ID card or a copy", "Copy of your residence permit", "Proof of profession if it will change on the passport"],
      note: "In August 2026 the Foreign Ministry announced passport processing would be cut to two weeks." } },
  { id: "birth", icon: "baby",
    ar: { t: "قيد مولود جديد بالخارج", d: "سجّل مولودك في السفارة عشان ياخد شهادة ميلاد مصرية ورقم قومي.",
      items: ["شهادة الميلاد الأجنبية موثقة من جهات الدولة", "جوازات سفر الأب والأم", "وثيقة الزواج", "إقامة الوالدين"],
      note: "سجّل المولود في أسرع وقت بعد الولادة لتجنب أي غرامات أو تعقيدات." },
    en: { t: "Register a newborn abroad", d: "Register your baby at the embassy to get an Egyptian birth certificate and national ID number.",
      items: ["Foreign birth certificate, attested by local authorities", "Both parents' passports", "Marriage certificate", "Parents' residence permits"],
      note: "Register as soon as possible after birth to avoid fines or complications." } },
  { id: "poa", icon: "pen",
    ar: { t: "عمل توكيل رسمي", d: "التوكيلات (عامة أو خاصة) تُعمل في القسم القنصلي، وتقدر تستخدمها في مصر بعد تصديقها.",
      items: ["جواز سفر الموكِّل ساري", "بيانات الوكيل كاملة كما في بطاقته", "نوع التوكيل والغرض منه", "حضور الموكِّل شخصيًا"],
      note: "اسأل السفارة لو التوكيل محتاج تصديق من الخارجية في مصر قبل استخدامه." },
    en: { t: "Make a power of attorney", d: "General or specific powers of attorney are done at the consular section and can be used in Egypt after attestation.",
      items: ["The grantor's valid passport", "The agent's full details as on their ID", "Type and purpose of the power of attorney", "The grantor must attend in person"],
      note: "Ask the embassy whether it needs attestation by the Foreign Ministry in Egypt before use." } },
  { id: "military", icon: "shield",
    ar: { t: "موقف التجنيد للشباب بالخارج", d: "الشباب المقيمين بالخارج محتاجين يتابعوا موقف التجنيد قبل السفر لمصر أو تجديد الجواز.",
      items: ["جواز السفر", "شهادة الميلاد", "ما يثبت الإقامة أو الدراسة بالخارج", "آخر مؤهل دراسي"],
      note: "القواعد بتتغير، فاسأل القسم القنصلي عن موقفك قبل أي سفر." },
    en: { t: "Military service status", d: "Young men living abroad should check their military service status before travelling to Egypt or renewing a passport.",
      items: ["Passport", "Birth certificate", "Proof of residence or study abroad", "Latest academic qualification"],
      note: "Rules change, so ask the consular section about your status before travelling." } },
  { id: "attest", icon: "stamp",
    ar: { t: "توثيق وتصديق المستندات", d: "الشهادات والمستندات الصادرة من دولة الإقامة لازم تتوثق عشان تتقبل في مصر، والعكس.",
      items: ["أصل المستند", "توثيق من الجهات المختصة في دولة الإقامة", "تصديق السفارة المصرية", "تصديق الخارجية في مصر عند الطلب"],
      note: "أعلنت الخارجية في أغسطس 2026 أن خدمات التصديق ستتحول لخدمة رقمية قريبًا." },
    en: { t: "Attest documents", d: "Certificates issued in your country of residence must be attested to be accepted in Egypt, and the other way round.",
      items: ["The original document", "Attestation by local authorities", "Egyptian embassy attestation", "Foreign Ministry attestation in Egypt when required"],
      note: "In August 2026 the Foreign Ministry announced attestation services would soon go digital." } },
  { id: "id", icon: "card",
    ar: { t: "بطاقة الرقم القومي", d: "استخراج أو تجديد بطاقة الرقم القومي للمقيمين بالخارج يتم عن طريق القسم القنصلي.",
      items: ["البطاقة القديمة أو صورتها", "جواز السفر", "صور شخصية حديثة", "ما يثبت المهنة والحالة الاجتماعية"],
      note: "مدة التسليم بتختلف من دولة لدولة، اسأل سفارتك." },
    en: { t: "National ID card", d: "Issuing or renewing a national ID card for residents abroad is done through the consular section.",
      items: ["Old card or a copy", "Passport", "Recent personal photos", "Proof of profession and marital status"],
      note: "Delivery times differ by country, so ask your embassy." } }
];

/* أدعية للأبناء — آيات القرآن بنصها، والأحاديث من الصحيحين أو ما صححه أهل العلم مع ذكر المصدر */
window.DUAS = [
  { k: "q", t: "رَبِّ هَبْ لِي مِن لَّدُنكَ ذُرِّيَّةً طَيِّبَةً ۖ إِنَّكَ سَمِيعُ الدُّعَاءِ", src: "سورة آل عمران: 38", note: "دعاء زكريا عليه السلام" },
  { k: "q", t: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا", src: "سورة الفرقان: 74", note: "من دعاء عباد الرحمن" },
  { k: "q", t: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ", src: "سورة إبراهيم: 40", note: "دعاء إبراهيم عليه السلام" },
  { k: "q", t: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَصْلِحْ لِي فِي ذُرِّيَّتِي ۖ إِنِّي تُبْتُ إِلَيْكَ وَإِنِّي مِنَ الْمُسْلِمِينَ", src: "سورة الأحقاف: 15" },
  { k: "q", t: "رَبَّنَا وَاجْعَلْنَا مُسْلِمَيْنِ لَكَ وَمِن ذُرِّيَّتِنَا أُمَّةً مُّسْلِمَةً لَّكَ وَأَرِنَا مَنَاسِكَنَا وَتُبْ عَلَيْنَا ۖ إِنَّكَ أَنتَ التَّوَّابُ الرَّحِيمُ", src: "سورة البقرة: 128", note: "دعاء إبراهيم وإسماعيل عليهما السلام" },
  { k: "q", t: "رَبِّ اجْعَلْ هَٰذَا الْبَلَدَ آمِنًا وَاجْنُبْنِي وَبَنِيَّ أَن نَّعْبُدَ الْأَصْنَامَ", src: "سورة إبراهيم: 35" },
  { k: "q", t: "رَبِّ هَبْ لِي مِنَ الصَّالِحِينَ", src: "سورة الصافات: 100" },
  { k: "q", t: "وَإِنِّي أُعِيذُهَا بِكَ وَذُرِّيَّتَهَا مِنَ الشَّيْطَانِ الرَّجِيمِ", src: "سورة آل عمران: 36", note: "دعاء امرأة عمران لمريم عليها السلام" },
  { k: "s", t: "أُعِيذُكُمَا بِكَلِمَاتِ اللَّهِ التَّامَّةِ، مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ، وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ", src: "صحيح البخاري: 3371", note: "كان النبي ﷺ يعوّذ بها الحسن والحسين. ولولد واحد: «أُعِيذُكَ»، ولبنت: «أُعِيذُكِ»، وللجمع: «أُعِيذُكُمْ»." },
  { k: "s", t: "اللَّهُمَّ أَكْثِرْ مَالَهُ وَوَلَدَهُ، وَبَارِكْ لَهُ فِيمَا أَعْطَيْتَهُ", src: "صحيح البخاري: 6378 — صحيح مسلم: 2480", note: "دعاء النبي ﷺ لأنس بن مالك رضي الله عنه لما طلبت أمه أم سُليم أن يدعو له." },
  { k: "s", t: "اللَّهُمَّ فَقِّهْهُ فِي الدِّينِ", src: "صحيح البخاري: 143", note: "دعاء النبي ﷺ لابن عباس رضي الله عنهما." },
  { k: "s", t: "اللَّهُمَّ إِنِّي أُحِبُّهُ فَأَحِبَّهُ", src: "صحيح البخاري: 3749 — صحيح مسلم: 2422", note: "قاله النبي ﷺ عن الحسن بن علي رضي الله عنهما." },
  { k: "e", t: "رَبِّ زِدْنِي عِلْمًا", src: "سورة طه: 114" },
  { k: "e", t: "رَبِّ اشْرَحْ لِي صَدْرِي ۝ وَيَسِّرْ لِي أَمْرِي ۝ وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي ۝ يَفْقَهُوا قَوْلِي", src: "سورة طه: 25–28", note: "دعاء موسى عليه السلام" },
  { k: "e", t: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا", src: "صحيح ابن حبان: 974 — صححه الألباني (السلسلة الصحيحة: 2886)" }
];
window.DUA_FACTS = [
  { t: "إِذَا مَاتَ الْإِنْسَانُ انْقَطَعَ عَنْهُ عَمَلُهُ إِلَّا مِنْ ثَلَاثَةٍ: إِلَّا مِنْ صَدَقَةٍ جَارِيَةٍ، أَوْ عِلْمٍ يُنْتَفَعُ بِهِ، أَوْ وَلَدٍ صَالِحٍ يَدْعُو لَهُ", src: "صحيح مسلم: 1631" },
  { t: "لَا تَدْعُوا عَلَى أَنْفُسِكُمْ، وَلَا تَدْعُوا عَلَى أَوْلَادِكُمْ، وَلَا تَدْعُوا عَلَى أَمْوَالِكُمْ، لَا تُوَافِقُوا مِنَ اللهِ سَاعَةً يُسْأَلُ فِيهَا عَطَاءٌ، فَيَسْتَجِيبُ لَكُمْ", src: "صحيح مسلم: 3009" }
];
