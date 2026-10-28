# تشغيل المكالمات العائلية «أهلي» والمساعد الذكي — خطوة بخطوة

ميزة «أهلي» محتاجة 3 حاجات: **Firebase** للحسابات والرنّة، و**Agora** للصوت، و**GitHub** عشان يربط الاتنين ويبني التطبيق.

لحد ما تخلص الخطوات دي، التطبيق هيتبني عادي، وصفحة «أهلي» هتقول «هتشتغل قريبًا». يعني مفيش حاجة هتبوظ لو أخدت وقتك.

الوقت المتوقع: حوالي ساعة.

---

## 1) ارفع ملفات التحديث على GitHub

1. فك ضغط ملف `dalil-calls-update.zip`.
2. في صفحة المستودع اضغط **Add file ← Upload files**، واسحب **كل الملفات** اللي طلعت من الضغط، واضغط **Commit changes**. الملفات اللي ليها نفس الاسم هتتبدل بالجديدة، وده المطلوب.
3. حدّث ملف البناء:
   - افتح `.github/workflows/build.yml` في المستودع، واضغط القلم ✏️.
   - امسح كل اللي فيه، والصق محتوى ملف `build.yml` الجديد، واضغط **Commit changes**.

---

## 2) جهّز Firebase

### أ. اعمل المشروع
1. ادخل على **console.firebase.google.com** بنفس حساب جوجل بتاعك.
2. اضغط **Create a project**، وسمّيه مثلًا `dalil-abnaana`. لو سألك عن Google Analytics، ممكن تقفله.

### ب. فعّل باقة Blaze
رنّة المكالمة بتحتاج Cloud Functions، والخدمة دي شغالة على باقة Blaze بس.
1. تحت يسار الصفحة اضغط **Upgrade**، واختار **Blaze**، وضيف كارت.
2. **مهم:** حط تنبيه ميزانية **Budget alert** بـ **1 دولار**، عشان يوصلك إيميل لو حصل أي استهلاك.

الاستخدام الصغير غالبًا هيفضل في حدود المجاني ومش هتدفع حاجة. بس مفيش حد أقصى للفلوس بيتحط أوتوماتيك، وعشان كده تنبيه الميزانية مهم.

### ج. فعّل تسجيل الدخول بجوجل
**Build ← Authentication ← Get started ← Sign-in method ← Google ← Enable**، واختار إيميلك في **Support email**، وبعدين **Save**.

### د. اعمل قاعدة البيانات
**Build ← Firestore Database ← Create database**:
- **Location:** اختار `europe-west1 (Belgium)`.
- اختار **Start in production mode**، واضغط **Create**.

### هـ. أضف تطبيق أندرويد وحمّل `google-services.json`
1. اضغط الترس ⚙️ ← **Project settings**. تحت في **Your apps** اضغط أيقونة أندرويد.
2. **Android package name:** اكتب `com.dalil.egyptiansabroad`
3. **Debug signing certificate SHA-1:** الصق ده:
   ```
   F4:C2:18:A3:96:75:51:DA:06:1E:89:53:11:BD:69:F3:B0:68:8E:4F
   ```
4. اضغط **Register app**، وبعدين **Download google-services.json**، وكمّل لحد الآخر.

### و. أضف بصمة جوجل بلاي (ضروري للنسخة اللي على المتجر)
جوجل بلاي بيعيد توقيع التطبيق بمفتاحه هو، فلازم تضيف بصمته كمان، وإلا تسجيل الدخول مش هيشتغل في النسخة اللي الناس بتنزلها من المتجر.
1. في **Play Console** افتح التطبيق، وادخل **Test and release ← App integrity ← App signing**.
2. انسخ **SHA-1** اللي تحت **App signing key certificate**.
3. ارجع لـ Firebase: **Project settings ← Your apps ← Add fingerprint**، والصقها، واضغط **Save**.
4. حمّل ملف `google-services.json` **تاني** بعد الإضافة، واستخدم النسخة الجديدة دي في الخطوة 4.

### ز. حمّل مفتاح النشر (Service account)
1. **Project settings ← Service accounts ← Generate new private key ← Generate key**. هيتحمّل ملف JSON.
2. اديله صلاحية النشر:
   - افتح **console.cloud.google.com/iam-admin/iam**، واختار مشروعك من فوق.
   - دوّر على الحساب اللي اسمه بيبدأ بـ `firebase-adminsdk`، واضغط القلم ✏️ جنبه.
   - **Add another role**، واختار **Owner**، وبعدين **Save**.

⚠️ الملف ده بيدّي تحكم كامل في المشروع. متبعتهوش لحد، ومتحطهوش في أي حتة غير أسرار GitHub. وبعد ما تحطه هناك، امسحه من الكمبيوتر.

---

## 3) جهّز Agora للصوت
1. اعمل حساب على **console.agora.io**.
2. **Projects ← Create a new project**:
   - **Name:** `dalil`
   - **Use case:** اختار أي حاجة تحت Social أو Voice calling.
   - **Authentication:** اختار **Secured mode: APP ID + Token**. ده مهم.
3. افتح المشروع، وانسخ:
   - **App ID**
   - **Primary Certificate** (اضغط على العين عشان يظهر)

أول 10,000 دقيقة في الشهر مجانية.

---

## 3ب) جهّز مفتاح المساعد الذكي (Gemini)
1. ادخل على **aistudio.google.com** بنفس حساب جوجل.
2. اضغط **Get API key ← Create API key**، واختار مشروع Firebase بتاعك `dalil-abnaana` من القائمة.
3. انسخ المفتاح (بيبدأ بـ `AIza`).

**يُفضّل:** في نفس الصفحة فعّل الدفع **Set up billing** على المشروع. التكلفة تقريبًا 2 دولار لكل 1,000 سؤال، والحد بيعلى، والأهم إن جوجل **مبتستخدمش** أسئلة المستخدمين في تحسين خدماتها على الباقة المدفوعة. ولو فضلت على المجاني، الخدمة هتشتغل برضه، بس بحدود أقل.

المساعد بيرد من ملف **`assistant-knowledge.md`** اللي في المستودع، ومن الأخبار اللي في `news.json`. عشان تعلّمه معلومة جديدة: افتح الملف على GitHub، واضغط القلم ✏️، واكتب المعلومة مع الرابط الرسمي لو موجود، واضغط **Commit changes**. المساعد هيعرفها في خلال 10 دقايق، من غير بناء ولا تحديث للتطبيق.

---

## 4) ضيف الأسرار في GitHub

**Settings ← Secrets and variables ← Actions ← New repository secret**. اكتب كل اسم بإيدك زي ما هو بالظبط:

| الاسم (Name) | القيمة (Secret) |
|---|---|
| `GOOGLE_SERVICES_JSON` | افتح `google-services.json` بالمفكرة، وانسخ محتواه كله |
| `FIREBASE_SERVICE_ACCOUNT` | افتح ملف مفتاح النشر بالمفكرة، وانسخ محتواه كله |
| `AGORA_APP_ID` | الـ App ID من Agora |
| `AGORA_APP_CERT` | الـ Primary Certificate من Agora |
| `GEMINI_API_KEY` | مفتاح Gemini من AI Studio |

---

## 5) ابني وجرّب
1. **Actions ← Build Android App ← Run workflow**.
2. هتلاقي شغلتين، **backend** و**build**، والاتنين لازم يخلصوا بعلامة ✅.
   - أول مرة **backend** ممكن ياخد 10 دقايق. ولو فشل برسالة فيها "permission" أو "Eventarc" أو "Cloud Build"، استنى 5 دقايق وشغّله تاني، لأن الصلاحيات الجديدة بتاخد وقت عشان تتفعل. لو فضل يفشل، ابعتلي صورة.
3. نزّل الـ APK الجديد من **Releases** على موبايلين، وكل موبايل بحساب جوجل مختلف.
4. على الموبايل الأول: «أهلي» ← سجّل الدخول ← وافق على الشروط ← انسخ الكود.
5. على الموبايل التاني: «أهلي» ← «أضف حد من أهلك» ← اكتب الكود.
6. اتصلوا ببعض 🎉 جرّبوا كمان والتطبيق مقفول خالص، والمفروض الموبايل يرن.
7. جرّب المساعد: من الرئيسية اضغط «عندك سؤال؟ اسأل المساعد»، واسأله مثلًا «إزاي أسجّل ابني في الامتحانات؟».

---

## 6) حدّث بيانات Google Play
المكالمات بتغيّر شوية إجابات في **Play Console ← App content**:

- **Data safety:** ضيف الحاجات دي:
  - **Personal info ← Name:** Collected، والغرض App functionality، ومش بيتشارك.
  - **Audio ← Voice or sound recordings:** Collected، واختار **Processed ephemerally**، والغرض App functionality.
  - **Device or other IDs:** Collected، والغرض App functionality (للإشعارات)، وكمان Advertising (AdMob).
  - **Other user-generated content:** Collected (البلاغات)، والغرض App functionality.
  - **Messages ← Other in-app messages:** Collected (أسئلة المساعد)، واختار **Processed ephemerally**، والغرض App functionality.
  - **Users can request data deletion:** Yes.
  - **Delete account URL:**
    ```
    https://github.com/ahmebba3-star/dalil-abnaana-/blob/main/DELETE_ACCOUNT.md
    ```
- **App access:** اختار **All or some functionality is restricted**، واكتب:
  "Family calls require signing in with any Google account. No special credentials are needed."
- **Content rating:** أعد الاستبيان، وجاوب **Yes** على سؤال إن المستخدمين يقدروا يتواصلوا مع بعض.
- **Target audience:** خليه **18+**.
- **AI-generated content:** لو Play Console سألك إذا كان التطبيق فيه محتوى متولّد بالذكاء الاصطناعي، جاوب **Yes**، واذكر إن فيه زرار «إبلاغ عن الرد» جوه المحادثة.

---

## المتابعة الأسبوعية (مهمة لجوجل بلاي)

جوجل بلاي بيطلب إن البلاغات تتراجع وتتاخد فيها إجراءات. مرة في الأسبوع:
1. **Firebase ← Firestore Database ← reports**. كل بلاغ فيه `reported`، وده معرّف الشخص اللي اتبلّغ عنه، وفيه السبب.
   - البلاغات اللي فيها `type: ai` بتبقى عن ردود المساعد، وفيها السؤال والرد. لو الرد غلط، صحّح المعلومة أو ضيفها في `assistant-knowledge.md`.
2. لو البلاغ جدّي: **Authentication ← Users**، دوّر على نفس المعرّف، واضغط ⋮ ← **Disable account**. كده مش هيقدر يدخل تاني.
3. غيّر `status` في البلاغ من `open` لـ `done`.

وراجع الاستهلاك مرة في الشهر: **Firebase ← Usage and billing**، و**Agora ← Usage**، و**AI Studio ← Usage**.

**حدود المساعد:** 20 سؤال لكل مستخدم في اليوم، و3,000 سؤال للتطبيق كله في اليوم. لو حابب تغيّرهم، عدّل `ASK_DAILY_PER_USER` و`ASK_DAILY_TOTAL` في ملف `functions-index.js`.
