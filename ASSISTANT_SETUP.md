# تشغيل المساعد الذكي مجانًا — خطوة بخطوة

الطريقة دي **مجانية بالكامل، ومن غير كارت**:
- **Firebase (باقة Spark المجانية):** تسجيل الدخول بحساب جوجل بس.
- **Gemini (Google AI Studio):** الذكاء الاصطناعي، بالحصة المجانية.
- **Cloudflare Workers (الباقة المجانية):** الخادم الصغير اللي بيربط التطبيق بـ Gemini.

متعملش **Upgrade** لباقة Blaze في Firebase، لأننا مش محتاجينها.

---

## أ) Firebase — تسجيل الدخول بجوجل

### 1. فعّل تسجيل الدخول بجوجل
في مشروعك على Firebase: **Build ← Authentication ← Get started ← Sign-in method ← Google ← Enable**، واختار إيميلك في **Support email**، وبعدين **Save**.

### 2. اعرف رقم المشروع (Project ID)
اضغط الترس ⚙️ ← **Project settings**. هتلاقي **Project ID**، زي `dalil-abnaana` أو `dalil-abnaana-1a2b3`. **انسخه واحفظه**، هنحتاجه في Cloudflare.

### 3. أضف تطبيق أندرويد وحمّل `google-services.json`
1. في نفس صفحة **Project settings**، تحت في **Your apps**، اضغط أيقونة أندرويد.
2. **Android package name:** اكتب `com.dalil.egyptiansabroad`
3. **Debug signing certificate SHA-1:** الصق البصمة دي:
   ```
   F4:C2:18:A3:96:75:51:DA:06:1E:89:53:11:BD:69:F3:B0:68:8E:4F
   ```
4. اضغط **Register app**، وبعدين **Download google-services.json**، وكمّل لحد الآخر.

### 4. أضف بصمة جوجل بلاي
1. في **Play Console** افتح التطبيق، وادخل **Test and release ← App integrity ← App signing**، وانسخ **SHA-1** اللي تحت **App signing key certificate**.
2. ارجع لـ Firebase: **Project settings ← Your apps ← Add fingerprint**، والصقها، واضغط **Save**.
3. حمّل ملف `google-services.json` **تاني**، واستخدم النسخة الجديدة دي.

لو التطبيق لسه مش مرفوع على Play Console، اتخطى الخطوة دي دلوقتي وارجعلها بعدين. تسجيل الدخول هيشتغل في ملف الـ APK اللي بتجربه، بس مش هيشتغل في النسخة اللي الناس بتنزلها من المتجر لحد ما تضيف البصمة دي.

---

## ب) مفتاح Gemini
1. افتح **aistudio.google.com/apikey** بنفس حساب جوجل.
2. اضغط **Create API key**، واختار مشروع Firebase بتاعك من القائمة (أو اعمل مشروع جديد).
3. انسخ المفتاح (بيبدأ بـ `AIza`) واحفظه.

---

## ج) Cloudflare — خادم المساعد

### 1. اعمل حساب
افتح **dash.cloudflare.com/sign-up**، واعمل حساب مجاني بإيميلك، وأكّد الإيميل.

### 2. اعمل مخزن البيانات (KV)
1. من القائمة على الشمال: **Storage & databases ← Workers KV** (أو **KV**).
2. اضغط **Create instance** (أو **Create namespace**)، وسمّيه `dalil-usage`، واضغط **Create**.

### 3. اعمل الـ Worker
1. من القائمة: **Compute (Workers) ← Workers & Pages ← Create**.
2. اختار **Start with Hello World!**، وسمّيه `dalil-assistant`، واضغط **Deploy**.
3. اضغط **Edit code**.
4. امسح كل الكود اللي في المحرر، وافتح ملف **`assistant-worker.js`** بالمفكرة، وانسخه كله والصقه مكانه.
5. اضغط **Deploy** فوق على اليمين.

### 4. ضيف المفتاح ورقم المشروع
ارجع لصفحة الـ Worker، وادخل **Settings ← Variables and Secrets ← Add**:

| Type | Variable name | Value |
|---|---|---|
| **Secret** | `GEMINI_API_KEY` | مفتاح Gemini |
| **Text** | `FIREBASE_PROJECT_ID` | الـ Project ID من Firebase |

اضغط **Deploy** (أو **Save and deploy**).

### 5. اربط مخزن البيانات
في نفس **Settings**، ادخل **Bindings ← Add binding ← KV namespace**:
- **Variable name:** `USAGE`
- **KV namespace:** اختار `dalil-usage`

اضغط **Add binding** أو **Deploy**.

### 6. اتأكد إنه شغال
في صفحة الـ Worker هتلاقي رابطه، شكله كده: `https://dalil-assistant.XXXX.workers.dev`. افتحه في المتصفح:
- لو ظهرلك `"ready":true`، يبقى تمام ✅ **انسخ الرابط ده**.
- لو ظهرلك `"missing":[...]`، يبقى فيه حاجة ناقصة. الاسم اللي جوه الأقواس هو اللي ناقص، فارجع للخطوة 4 أو 5.

---

## د) GitHub
في المستودع: **Settings ← Secrets and variables ← Actions**.

1. تبويب **Secrets ← New repository secret**:
   - **Name:** `GOOGLE_SERVICES_JSON`
   - **Secret:** افتح `google-services.json` بالمفكرة، وانسخ محتواه كله.
2. تبويب **Variables ← New repository variable**:
   - **Name:** `ASSISTANT_URL`
   - **Value:** رابط الـ Worker، مثلًا `https://dalil-assistant.XXXX.workers.dev`

---

## هـ) ابني وجرّب
1. **Actions ← Build Android App ← Run workflow**.
2. شغلة **backend** هتتخطى لوحدها، وده طبيعي لأننا مش محتاجينها. المهم إن شغلة **build** تخلص بعلامة ✅.
3. نزّل الـ APK من **Releases**، وثبّته.
4. من الرئيسية اضغط **«عندك سؤال؟ اسأل المساعد»** ← سجّل الدخول بجوجل ← اسأل سؤال.

---

## تعليم المساعد معلومات جديدة
افتح **`assistant-knowledge.md`** في المستودع، واضغط القلم ✏️، واكتب المعلومة مع الرابط الرسمي لو موجود، واضغط **Commit changes**. المساعد هيعرفها في خلال 10 دقايق.

## مراجعة البلاغات (مرة في الأسبوع)
**Cloudflare ← Workers KV ← dalil-usage**. المفاتيح اللي بتبدأ بـ `report:` هي بلاغات المستخدمين عن الردود. افتح أي بلاغ، هتلاقي فيه السؤال والرد والسبب. لو الرد كان غلط، صحّح المعلومة في `assistant-knowledge.md`.

## الحدود المجانية
- **لكل مستخدم:** 20 سؤال في اليوم.
- **للتطبيق كله:** 900 سؤال في اليوم، وده حد الباقة المجانية في Cloudflare KV.
- **Gemini المجاني:** ليه حد يومي بيتغير من وقت للتاني، وتقدر تشوفه في AI Studio. لو الحد خلص، المستخدم هيشوف رسالة «المساعد عليه ضغط، جرب بعد شوية».
- **ملحوظة خصوصية:** على الحصة المجانية، جوجل ممكن تستخدم الأسئلة لتحسين خدماتها، وده مكتوب في سياسة الخصوصية. لو التطبيق كبر بعد كده، فعّل الدفع في AI Studio.
