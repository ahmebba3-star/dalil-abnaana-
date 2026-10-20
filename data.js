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

/* خطوات التسجيل — حسب تعليمات المنصة في 2025/2026 */
window.REG_STEPS = {
  ar: [
    ["أنشئ حساب ولي أمر", "ادخل على منصة «أبناؤنا في الخارج» الرسمية وأنشئ حسابًا باسم ولي الأمر، أو سجّل دخولك لو عندك حساب."],
    ["اختر خدمة التسجيل", "اختر خدمة التسجيل في الامتحانات وحدد عدد أبنائك للعام الدراسي."],
    ["اكتب بيانات كل طالب", "املأ بيانات كل طالب لوحده، وراجع الاسم والرقم القومي حرفًا حرفًا مع شهادة الميلاد."],
    ["ارفع المستندات", "حوّل مستندات كل طالب لملف PDF واحد وارفعه."],
    ["ادفع الرسوم", "ادفع الرسوم بطرق الدفع الإلكتروني المعتمدة على المنصة بعد فتح باب التسجيل."],
    ["اطبع الاستمارة", "اطبع استمارة التسجيل واحتفظ بها مع أصول المستندات."],
    ["استلم رقم الجلوس", "قبل الامتحان، ادخل على حساب ولي الأمر لاستلام رقم الجلوس وحساب الطالب."]
  ],
  en: [
    ["Create a parent account", "Go to the official “Our Children Abroad” platform and create an account in the parent's name, or log in if you already have one."],
    ["Choose exam registration", "Pick the exam registration service and set the number of children for the school year."],
    ["Enter each student's details", "Fill in each student separately and check the name and national ID letter by letter against the birth certificate."],
    ["Upload documents", "Combine each student's documents into one PDF and upload it."],
    ["Pay the fee", "Pay through the platform's approved online payment options once registration opens."],
    ["Print the form", "Print the registration form and keep it with the original documents."],
    ["Get the seat number", "Before the exam, log in to the parent account to get the seat number and student account."]
  ]
};

window.REG_DOCS = {
  ar: [
    "صورة شخصية حديثة للطالب",
    "شهادة ميلاد الطالب بالرقم القومي",
    "شهادة أو بيان نجاح آخر صف دراسي (الشهادات الصادرة خارج مصر لازم تكون موثّقة ومعتمدة)",
    "صورة جواز السفر والإقامة في دولة الإقامة"
  ],
  en: [
    "A recent personal photo of the student",
    "The student's birth certificate with national ID number",
    "Pass certificate or statement for the last grade (certificates issued outside Egypt must be attested)",
    "Copies of the passport and residence permit in the country of residence"
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
