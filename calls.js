/* =====================================================================
   المكالمات العائلية — Family calls
   - Google sign-in (Firebase Auth), invite codes, contacts, block/report
   - Voice via Agora Web SDK (loaded only when a call starts)
   - Ringing via Firebase Cloud Messaging; all writes go through Cloud Functions
   - In a browser preview it runs on a demo backend so the screens can be tried
   ===================================================================== */
window.DalilCalls = function (ctx) {
  "use strict";
  const { icon, esc, toast, openSheet, closeSheet, state, store, rerender, isNative, P } = ctx;

  /* ---------------- strings ---------------- */
  const S = {
    ar: {
      tab: "أهلي",
      title: "كلّم أهلك",
      intro: "مكالمات صوتية مجانية بينك وبين أهلك وقرايبك، داخل التطبيق.",
      p1: "بتضيف أهلك بكود دعوة، ومحدش غريب يقدر يتصل بيك.",
      p2: "المكالمة بالإنترنت، من غير رصيد.",
      p3: "تقدر تحظر أو تبلّغ عن أي حد في أي وقت.",
      signIn: "سجّل الدخول بحساب جوجل",
      signingIn: "جاري تسجيل الدخول…",
      signInFail: "مقدرناش نسجّل دخولك. اتأكد من الإنترنت وجرب تاني.",
      restricted: "المكالمات عبر الإنترنت مقيّدة في دولتك، فممكن المكالمة متوصلش أو تتقطع.",
      soon: "المكالمات العائلية هتشتغل قريبًا في التحديث الجاي.",
      soonBadge: "قريبًا",
      soonTitle: "المكالمات العائلية جاية قريبًا",
      soonBody: "قريب هتقدر تكلّم أهلك وقرايبك مكالمات صوتية مجانية من جوه التطبيق. هنبلغك أول ما الميزة تشتغل.",
      demo: "معاينة تجريبية: الأسماء والمكالمات هنا للتجربة بس.",
      termsTitle: "قبل ما تبدأ",
      termsIntro: "عشان المكالمات تفضل آمنة ومحترمة للكل، لازم توافق على شروط الاستخدام:",
      t1: "تضيف بس ناس تعرفهم شخصيًا، وتشارك الكود بتاعك مع أهلك وبس.",
      t2: "ممنوع الإزعاج أو التهديد أو أي كلام مسيء أو غير لائق.",
      t3: "ممنوع انتحال شخصية حد تاني أو جهة رسمية.",
      t4: "المكالمات مش بتتسجل. أي بلاغ بيتراجع، والحساب المخالف بيتقفل.",
      t5: "التطبيق للبالغين من 18 سنة فأكتر.",
      readTerms: "اقرأ شروط الاستخدام كاملة",
      agree: "قريت الشروط وموافق عليها",
      agreeBtn: "موافق، كمّل",
      myCode: "كود الدعوة بتاعك",
      codeHint: "ابعت الكود ده لأهلك عشان يضيفوك.",
      share: "شارك الكود",
      copy: "نسخ",
      copied: "اتنسخ الكود",
      shareText: (name, code) => `${name} عايز يكلمك على تطبيق «دليل أبنائنا بالخارج». نزّل التطبيق وضيفني بالكود: ${code}\nhttps://play.google.com/store/apps/details?id=com.dalil.egyptiansabroad`,
      family: "أهلي",
      add: "أضف حد من أهلك",
      addTitle: "أضف حد من أهلك",
      addHint: "اطلب من قريبك كود الدعوة اللي في صفحة «أهلي» عنده، واكتبه هنا.",
      codeLabel: "كود الدعوة (6 حروف وأرقام)",
      addBtn: "أضف",
      added: (n) => `اتضاف ${n}، تقدروا تتكلموا دلوقتي`,
      empty: "لسه مضفتش حد. ابعت الكود بتاعك لأهلك، أو اطلب الكود بتاعهم.",
      call: "اتصال",
      more: "خيارات",
      remove: "إزالة من أهلي",
      removed: "اتشال من القائمة",
      block: "حظر",
      blocked: "اتحظر، ومش هيقدر يتصل بيك أو يضيفك تاني",
      report: "إبلاغ",
      reportTitle: (n) => `إبلاغ عن ${n}`,
      reportHint: "البلاغ بيوصل لإدارة التطبيق وبيتراجع. اختار السبب:",
      reasons: { harassment: "إزعاج أو تهديد", spam: "إعلانات أو رسائل مزعجة", impersonation: "انتحال شخصية", inappropriate: "كلام غير لائق", other: "سبب تاني" },
      details: "تفاصيل (اختياري)",
      alsoBlock: "واحظره كمان",
      sendReport: "ابعت البلاغ",
      reported: "وصل البلاغ، شكرًا إنك بلّغت",
      account: "الحساب",
      signedInAs: "مسجّل باسم",
      newCode: "اعمل كود جديد",
      newCodeHint: "الكود القديم هيبطل يشتغل، واللي ضافوك قبل كده هيفضلوا عندك.",
      newCodeDone: "اتعمل كود جديد",
      blockedList: "المحظورين",
      noBlocked: "مفيش حد محظور.",
      unblock: "إلغاء الحظر",
      signOut: "تسجيل الخروج",
      deleteAcc: "حذف حسابي",
      deleteTitle: "حذف الحساب نهائيًا؟",
      deleteBody: "هنمسح اسمك وكود الدعوة وقائمة أهلك والمحظورين. مش هتقدر ترجّعهم، وأهلك هيحتاجوا يضيفوك من جديد.",
      deleteYes: "احذف حسابي",
      deleted: "اتحذف حسابك",
      cancel: "إلغاء",
      close: "إغلاق",
      calling: "بيرن…",
      connecting: "جاري التوصيل…",
      incoming: "مكالمة واردة",
      accept: "رد",
      decline: "رفض",
      end: "إنهاء",
      mute: "كتم",
      unmute: "إلغاء الكتم",
      speaker: "السمّاعة",
      noAnswer: "مفيش رد",
      busy: "مشغول في مكالمة تانية",
      declined: "المكالمة اترفضت",
      ended: "المكالمة خلصت",
      callFail: "المكالمة موصلتش. اتأكد من الإنترنت وجرب تاني.",
      micDenied: "لازم تسمح للتطبيق باستخدام الميكروفون عشان تتكلم. افتح الإعدادات وفعّل الإذن.",
      keepOpen: "خلي التطبيق مفتوح طول المكالمة.",
      slowDown: "استنى دقيقة وجرب تاني.",
      notContact: "الشخص ده مش في قائمة أهلك.",
      codeNotFound: "الكود ده مش موجود. اتأكد منه وجرب تاني.",
      ownCode: "ده الكود بتاعك، اكتب كود قريبك.",
      badCode: "الكود 6 حروف وأرقام بالإنجليزي.",
      genericErr: "حصلت مشكلة. جرب تاني بعد شوية.",
      notifTitle: "المكالمات",
      missedChan: "مكالمات فائتة"
    },
    en: {
      tab: "Family",
      title: "Call your family",
      intro: "Free voice calls with your family and relatives, inside the app.",
      p1: "You add family with an invite code, so strangers can't call you.",
      p2: "Calls use the internet, not phone credit.",
      p3: "You can block or report anyone at any time.",
      signIn: "Sign in with Google",
      signingIn: "Signing in…",
      signInFail: "Couldn't sign you in. Check your connection and try again.",
      restricted: "Internet calls are restricted in your country, so calls may not connect or may drop.",
      soon: "Family calls are coming in the next update.",
      soonBadge: "Coming soon",
      soonTitle: "Family calls are coming soon",
      soonBody: "Soon you'll be able to make free voice calls with your family and relatives inside the app. We'll let you know as soon as it's ready.",
      demo: "Demo preview: names and calls here are examples only.",
      termsTitle: "Before you start",
      termsIntro: "To keep calls safe and respectful for everyone, please agree to the terms of use:",
      t1: "Only add people you know personally, and share your code with family only.",
      t2: "No harassment, threats, or offensive or inappropriate talk.",
      t3: "Don't impersonate another person or an official body.",
      t4: "Calls are not recorded. Every report is reviewed and violating accounts are closed.",
      t5: "The app is for adults aged 18 and over.",
      readTerms: "Read the full terms of use",
      agree: "I've read and agree to the terms",
      agreeBtn: "Agree and continue",
      myCode: "Your invite code",
      codeHint: "Send this code to your family so they can add you.",
      share: "Share code",
      copy: "Copy",
      copied: "Code copied",
      shareText: (name, code) => `${name} wants to talk to you on the "Our Children Abroad Guide" app. Install it and add me with code: ${code}\nhttps://play.google.com/store/apps/details?id=com.dalil.egyptiansabroad`,
      family: "My family",
      add: "Add a family member",
      addTitle: "Add a family member",
      addHint: "Ask your relative for the invite code on their Family page and enter it here.",
      codeLabel: "Invite code (6 letters and numbers)",
      addBtn: "Add",
      added: (n) => `${n} added. You can talk now`,
      empty: "No one added yet. Send your code to your family, or ask for theirs.",
      call: "Call",
      more: "Options",
      remove: "Remove from family",
      removed: "Removed from your list",
      block: "Block",
      blocked: "Blocked. They can't call or add you again",
      report: "Report",
      reportTitle: (n) => `Report ${n}`,
      reportHint: "Reports go to the app team and are reviewed. Choose a reason:",
      reasons: { harassment: "Harassment or threats", spam: "Spam or ads", impersonation: "Impersonation", inappropriate: "Inappropriate talk", other: "Something else" },
      details: "Details (optional)",
      alsoBlock: "Also block them",
      sendReport: "Send report",
      reported: "Report sent. Thanks for letting us know",
      account: "Account",
      signedInAs: "Signed in as",
      newCode: "Make a new code",
      newCodeHint: "Your old code will stop working. People who already added you stay in your list.",
      newCodeDone: "New code created",
      blockedList: "Blocked",
      noBlocked: "No one is blocked.",
      unblock: "Unblock",
      signOut: "Sign out",
      deleteAcc: "Delete my account",
      deleteTitle: "Delete your account permanently?",
      deleteBody: "We'll erase your name, invite code, family list and blocked list. This can't be undone, and your family will need to add you again.",
      deleteYes: "Delete my account",
      deleted: "Your account was deleted",
      cancel: "Cancel",
      close: "Close",
      calling: "Ringing…",
      connecting: "Connecting…",
      incoming: "Incoming call",
      accept: "Answer",
      decline: "Decline",
      end: "End",
      mute: "Mute",
      unmute: "Unmute",
      speaker: "Speaker",
      noAnswer: "No answer",
      busy: "On another call",
      declined: "Call declined",
      ended: "Call ended",
      callFail: "The call didn't connect. Check your connection and try again.",
      micDenied: "Allow microphone access so you can talk. Open Settings and turn on the permission.",
      keepOpen: "Keep the app open during the call.",
      slowDown: "Wait a minute and try again.",
      notContact: "This person isn't in your family list.",
      codeNotFound: "That code doesn't exist. Check it and try again.",
      ownCode: "That's your own code. Enter your relative's code.",
      badCode: "The code is 6 letters and numbers.",
      genericErr: "Something went wrong. Try again shortly.",
      notifTitle: "Calls",
      missedChan: "Missed calls"
    }
  };
  const s = (k) => { const v = (S[state.lang] || S.ar)[k]; return v !== undefined && v !== null ? v : S.ar[k]; };

  const RESTRICTED = ["AE", "QA"];
  // Calls are paused for now: the tab shows "coming soon", but the Google account still works for the AI assistant.
  const COMING_SOON = window.APP_CONFIG.CALLS_COMING_SOON !== false;
  const RING_MS = 45000;
  const REGION = "europe-west1";
  const TERMS_URL = (window.APP_CONFIG.TERMS_URL || "").startsWith("__") ? "" : window.APP_CONFIG.TERMS_URL;

  /* ================= Backends ================= */
  function nativeBackend() {
    const Auth = P("FirebaseAuthentication"), Fs = P("FirebaseFirestore"), Msg = P("FirebaseMessaging"), Fn = P("FirebaseFunctions");
    if (!Auth || !Fs || !Fn) return null;
    return {
      demo: false,
      async currentUser() { const r = await Auth.getCurrentUser(); return r && r.user; },
      async signIn() { const r = await Auth.signInWithGoogle(); return r && r.user; },
      async signOut() { await Auth.signOut(); },
      async fn(name, data) { const r = await Fn.callByName({ name, region: REGION, data: data || {} }); return r && r.data; },
      listenCollection(reference, filters, cb) {
        const opts = { reference };
        if (filters && filters.length) opts.compositeFilter = { type: "and", queryConstraints: filters.map(([f, op, v]) => ({ type: "where", fieldPath: f, opStr: op, value: v })) };
        return Fs.addCollectionSnapshotListener(opts, (ev, err) => { if (!err && ev) cb((ev.snapshots || []).map((d) => ({ id: d.id, ...(d.data || {}) }))); });
      },
      listenDoc(reference, cb) {
        return Fs.addDocumentSnapshotListener({ reference }, (ev, err) => { if (!err && ev && ev.snapshot) cb(ev.snapshot.data ? { id: ev.snapshot.id, ...ev.snapshot.data } : null); });
      },
      unlisten(id) { if (id != null) Promise.resolve(id).then((cid) => Fs.removeSnapshotListener({ callbackId: cid })).catch(() => {}); },
      async pushToken() {
        if (!Msg) return "";
        try {
          let p = await Msg.checkPermissions();
          if (p.receive !== "granted") p = await Msg.requestPermissions();
          if (p.receive !== "granted") return "";
          const r = await Msg.getToken();
          return (r && r.token) || "";
        } catch (e) { return ""; }
      },
      async setupChannels() {
        if (!Msg) return;
        try {
          await Msg.createChannel({ id: "calls", name: s("notifTitle"), importance: 5, sound: "ringtone", vibration: true, visibility: 1 });
          await Msg.createChannel({ id: "missed", name: s("missedChan"), importance: 4, vibration: true, visibility: 1 });
        } catch (e) { /* ignore */ }
      },
      onNotification(cb) {
        if (!Msg) return;
        Msg.addListener("notificationActionPerformed", (ev) => cb((ev && ev.notification && ev.notification.data) || {}, true));
        Msg.addListener("notificationReceived", (ev) => cb((ev && ev.notification && ev.notification.data) || {}, false));
        Msg.addListener("tokenReceived", (ev) => { if (ev && ev.token && me) backend.fn("ensureProfile", { token: ev.token }).catch(() => {}); });
      },
      async removeAllNotifications() { try { if (Msg) await Msg.removeAllDeliveredNotifications(); } catch (e) { /* ignore */ } }
    };
  }

  // Demo backend for the browser preview (no network, nothing stored remotely).
  function demoBackend() {
    let user = null, signed = false;
    const db = { contacts: [], blocked: [], calls: {} };
    const listeners = new Map(); let lid = 0;
    const notify = () => listeners.forEach((l) => l());
    const seed = () => {
      db.contacts = [
        { id: "demo-mom", name: state.lang === "ar" ? "ماما" : "Mum", addedAt: 1 },
        { id: "demo-brother", name: state.lang === "ar" ? "محمود أخويا" : "Mahmoud (brother)", addedAt: 2 },
        { id: "demo-aunt", name: state.lang === "ar" ? "خالتي سعاد" : "Aunt Soad", addedAt: 3 }
      ];
    };
    return {
      demo: true,
      async currentUser() { return signed ? user : null; },
      async signIn() { await wait(600); signed = true; user = { uid: "demo-me", displayName: state.lang === "ar" ? "أحمد (تجربة)" : "Ahmed (demo)" }; seed(); return user; },
      async signOut() { signed = false; user = null; },
      async fn(name, data) {
        await wait(350);
        switch (name) {
          case "ensureProfile": return { name: user.displayName, code: "K7M2QX", termsVersion: data.acceptTerms ? 1 : (store.get("demoTerms", 0)), requiredTerms: 1 };
          case "newCode": return { code: "R4TP8Z" };
          case "addContact": {
            const c = String(data.code || "").toUpperCase();
            if (c === "K7M2QX") throw new Error("own-code");
            if (!/^[A-Z0-9]{6}$/.test(c)) throw new Error("bad-code");
            const nc = { id: "demo-" + c, name: state.lang === "ar" ? "عمي فتحي" : "Uncle Fathy", addedAt: Date.now() };
            db.contacts.push(nc); notify(); return { uid: nc.id, name: nc.name };
          }
          case "removeContact": db.contacts = db.contacts.filter((c) => c.id !== data.uid); notify(); return { ok: true };
          case "blockUser": { const c = db.contacts.find((x) => x.id === data.uid); db.contacts = db.contacts.filter((x) => x.id !== data.uid); db.blocked.push({ id: data.uid, name: c ? c.name : "?" }); notify(); return { ok: true }; }
          case "unblockUser": db.blocked = db.blocked.filter((x) => x.id !== data.uid); notify(); return { ok: true };
          case "reportUser": return { ok: true };
          case "deleteAccount": signed = false; return { ok: true };
          case "startCall": {
            const id = "demo-call-" + Date.now();
            const c = db.contacts.find((x) => x.id === data.uid);
            db.calls[id] = { id, caller: "demo-me", callee: data.uid, calleeName: c && c.name, status: "ringing", createdAt: Date.now() };
            setTimeout(() => { if (db.calls[id].status === "ringing") { db.calls[id].status = "accepted"; notify(); } }, 3500);
            return { callId: id, demo: true };
          }
          case "askAssistant": {
            await wait(900);
            const q = String(data.message || "");
            const ar = state.lang !== "en";
            if (/جواز|passport/i.test(q)) return { answer: ar ? "تجديد الجواز بيتعمل في القسم القنصلي بالسفارة أو القنصلية التابع لها محل إقامتك.\nغالبًا هتحتاج:\n- الجواز الحالي وصورة منه\n- صور شخصية حديثة\n- بطاقة الرقم القومي أو صورتها\n- صورة الإقامة\nالتفاصيل ممكن تختلف من سفارة لسفارة، فاتأكد منهم قبل ما تروح." : "Passport renewal is done at the consular section of your embassy or consulate.\nYou'll usually need:\n- Your current passport and a copy\n- Recent photos\n- Your national ID or a copy\n- A copy of your residence permit\nDetails can differ between embassies, so check before you go.", section: "consular", link: "https://www.mfa.gov.eg", remaining: 18 };
            if (/إمتى|امتى|ميعاد|موعد|when/i.test(q)) return { answer: ar ? "مواعيد امتحانات 2026/2027 لسه متعلنتش رسميًا. السنة اللي فاتت امتحانات الترم الأول بدأت 10 يناير، والترم التاني 16 مايو.\nفعّل «ذكّرني قبل الامتحان» وهنبلغك أول ما الموعد يتعلن." : "The 2026/2027 exam dates haven't been announced yet. Last year first-term exams started on 10 January and second-term on 16 May.\nTurn on exam reminders and we'll tell you once dates are announced.", section: "exams", link: "", remaining: 18 };
            return { answer: ar ? "عشان تسجّل ابنك في امتحانات أبناؤنا في الخارج:\n1. ادخل منصة «أبناؤنا في الخارج» واعمل حساب ولي أمر.\n2. اختار خدمة التسجيل في الامتحانات.\n3. اكتب بيانات ابنك وراجع الاسم والرقم القومي مع شهادة الميلاد.\n4. ارفع المستندات في ملف PDF واحد.\n5. ادفع الرسوم أول ما التسجيل يفتح، واطبع الاستمارة.\nالمرجع النهائي هو المنصة الرسمية." : "To register your child for the exams:\n1. Create a parent account on the Our Children Abroad platform.\n2. Choose exam registration.\n3. Enter your child's details and check the name and national ID.\n4. Upload the documents as one PDF.\n5. Pay the fee when registration opens and print the form.\nThe official platform is the final reference.", section: "exams", link: "https://sabroad.emis.gov.eg", remaining: 18 };
          }
          case "reportAnswer": return { ok: true };
          case "updateCall": {
            const c = db.calls[data.callId]; if (!c) return { status: "ended" };
            c.status = data.action === "accept" ? "accepted" : data.action === "decline" ? "declined" : (c.status === "ringing" ? "canceled" : "ended");
            notify(); return { status: c.status, demo: true };
          }
        }
        return {};
      },
      listenCollection(reference, filters, cb) {
        const id = ++lid;
        const run = () => {
          if (reference.endsWith("/contacts")) cb(db.contacts.slice());
          else if (reference.endsWith("/blocked")) cb(db.blocked.slice());
          else cb([]);
        };
        listeners.set(id, run); setTimeout(run, 0); return id;
      },
      listenDoc(reference, cb) {
        const id = ++lid; const callId = reference.split("/")[1];
        const run = () => cb(db.calls[callId] ? { ...db.calls[callId] } : null);
        listeners.set(id, run); setTimeout(run, 0); return id;
      },
      unlisten(id) { listeners.delete(id); },
      async pushToken() { return ""; },
      async setupChannels() {},
      onNotification() {},
      async removeAllNotifications() {}
    };
  }

  const enabled = !isNative || window.APP_CONFIG.CALLS_ENABLED === true;
  const backend = !enabled ? null : isNative ? nativeBackend() : demoBackend();

  /* ================= State ================= */
  let me = null;            // { uid, name, code, termsOk }
  let authChecked = false;
  let busy = false;         // sign-in in progress
  let contacts = [], blocked = [];
  let subs = [];            // listener ids
  let incomingSub = null;
  let active = null;        // current call session
  const handledCalls = new Set();

  function wait(ms) { return new Promise((r) => setTimeout(r, ms)); }
  function errText(e) {
    const m = String((e && (e.message || e.code)) || e || "");
    if (/busy/.test(m)) return s("busy");
    if (/slow-down|too-many/.test(m)) return s("slowDown");
    if (/not-a-contact/.test(m)) return s("notContact");
    if (/code-not-found/.test(m)) return s("codeNotFound");
    if (/own-code/.test(m)) return s("ownCode");
    if (/bad-code/.test(m)) return s("badCode");
    if (/NotAllowed|Permission|permission denied/i.test(m)) return s("micDenied");
    if (/network|unavailable|UNAVAILABLE|offline/i.test(m)) return s("callFail");
    return s("genericErr");
  }
  const initial = (n) => esc(String(n || "?").trim().charAt(0) || "?");

  /* ================= Session ================= */
  async function init() {
    if (!backend) { authChecked = true; return; }
    backend.onNotification(onPush);
    if (!COMING_SOON) backend.setupChannels();
    try {
      const u = await backend.currentUser();
      if (u) await afterSignIn(u, false);
    } catch (e) { /* signed out */ }
    authChecked = true; emitAuth();
    if (state.tab === "family") rerender();
  }

  async function afterSignIn(u, fresh) {
    const token = COMING_SOON ? "" : await backend.pushToken();
    const p = await backend.fn("ensureProfile", { name: u.displayName || "", token, country: state.country });
    me = { uid: u.uid, name: p.name, code: p.code, termsOk: (p.termsVersion || 0) >= (p.requiredTerms || 1) };
    if (COMING_SOON) return;
    if (me.termsOk) startListening();
    if (fresh && !me.termsOk) termsSheet();
  }

  function startListening() {
    stopListening();
    subs.push(backend.listenCollection(`users/${me.uid}/contacts`, [], (list) => {
      contacts = list.sort((a, b) => String(a.name).localeCompare(String(b.name), "ar"));
      if (state.tab === "family" && !state.sub) rerender();
    }));
    subs.push(backend.listenCollection(`users/${me.uid}/blocked`, [], (list) => { blocked = list; }));
    incomingSub = backend.listenCollection("calls", [["callee", "==", me.uid], ["status", "==", "ringing"]], (list) => {
      const now = Date.now();
      const fresh = list.filter((c) => now - (c.createdAt || 0) < RING_MS && !handledCalls.has(c.id));
      if (fresh.length && !active) showIncoming(fresh[0]);
      if (active && active.incoming && active.phase === "ringing" && !list.some((c) => c.id === active.callId)) finishCall(s("noAnswer"));
    });
  }
  function stopListening() {
    subs.forEach((id) => backend.unlisten(id)); subs = [];
    if (incomingSub != null) backend.unlisten(incomingSub); incomingSub = null;
  }

  const authListeners = [];
  const emitAuth = () => authListeners.forEach((f) => { try { f(me); } catch (e) { /* ignore */ } });
  async function signIn(opts) {
    if (busy) return false;
    busy = true; rerender(); emitAuth();
    let ok = false;
    try {
      const u = await backend.signIn();
      if (u) { await afterSignIn(u, !(opts && opts.quiet)); ok = true; }
    } catch (e) {
      if (!/cancel/i.test(String(e && e.message))) toast(s("signInFail"));
    }
    busy = false; rerender(); emitAuth();
    return ok;
  }

  async function signOut() {
    try {
      if (isNative) {
        const Msg = P("FirebaseMessaging");
        const tk = Msg ? (await Msg.getToken().catch(() => ({}))).token : "";
        if (tk) await backend.fn("removeToken", { token: tk }).catch(() => {});
      }
      await backend.signOut();
    } catch (e) { /* ignore */ }
    stopListening(); me = null; contacts = []; blocked = [];
    closeSheet(); rerender(); emitAuth();
  }

  /* ================= Views ================= */
  function restrictedNote() {
    return RESTRICTED.includes(state.country) ? `<div class="notice">${s("restricted")}</div>` : "";
  }

  function view() {
    if (!backend || COMING_SOON) {
      return `<h2 class="page-title">${s("title")}</h2>
        <section class="soon-card">
          <span class="soon-badge">${s("soonBadge")}</span>
          <span class="soon-mark">${icon("phone")}</span>
          <h3>${s("soonTitle")}</h3>
          <p>${s("soonBody")}</p>
        </section>`;
    }
    if (!backend) {
      return `<h2 class="page-title">${s("title")}</h2><div class="card">${s("soon")}</div>`;
    }
    const demo = backend.demo ? `<div class="notice">${s("demo")}</div>` : "";
    if (!authChecked) return `<h2 class="page-title">${s("title")}</h2>${demo}<div class="card small">…</div>`;
    if (!me) {
      return `
        <h2 class="page-title">${s("title")}</h2>
        ${demo}
        <p class="lead">${s("intro")}</p>
        <div class="panel" style="margin-top:12px">
          ${[["users", "p1"], ["globe", "p2"], ["shield", "p3"]].map(([ic, k]) => `<div class="row" style="cursor:default"><span class="ic">${icon(ic)}</span><span class="grow">${s(k)}</span></div>`).join("")}
        </div>
        ${restrictedNote() ? `<div style="margin-top:12px">${restrictedNote()}</div>` : ""}
        <button class="btn block google" data-calls="signin" style="margin-top:14px" ${busy ? "disabled" : ""}>${busy ? s("signingIn") : `${googleMark()}${s("signIn")}`}</button>
      `;
    }
    if (!me.termsOk) {
      return `<h2 class="page-title">${s("title")}</h2>${demo}<div class="card">${s("termsIntro")}</div>
        <button class="btn block" data-calls="terms" style="margin-top:12px">${s("termsTitle")}</button>`;
    }
    return `
      <h2 class="page-title">${s("title")}</h2>
      ${demo}${restrictedNote()}
      <section class="code-card" aria-label="${s("myCode")}">
        <span class="code-label">${s("myCode")}</span>
        <div class="code" dir="ltr">${esc(me.code || "------").split("").map((c) => `<span>${c}</span>`).join("")}</div>
        <p class="code-hint">${s("codeHint")}</p>
        <div class="code-actions">
          <button class="btn light" data-calls="share">${icon("share")}${s("share")}</button>
          <button class="btn light" data-calls="copy">${icon("copy")}${s("copy")}</button>
        </div>
      </section>
      <h2 class="sec">${s("family")}<button data-calls="add">${s("add")}</button></h2>
      ${contacts.length ? `<div class="panel">${contacts.map(contactRow).join("")}</div>`
        : `<div class="panel"><div class="empty">${s("empty")}<button class="btn ghost" data-calls="add">${icon("plus")}${s("add")}</button></div></div>`}
      <h2 class="sec">${s("account")}</h2>
      <div class="panel">
        <div class="row" style="cursor:default"><span class="ic">${icon("user")}</span><span class="grow"><span class="s">${s("signedInAs")}</span><span class="t">${esc(me.name)}</span></span></div>
        <button class="row" data-calls="newcode"><span class="ic">${icon("key")}</span><span class="grow"><span class="t">${s("newCode")}</span><span class="s">${s("newCodeHint")}</span></span></button>
        <button class="row" data-calls="blocked"><span class="ic">${icon("shield")}</span><span class="grow"><span class="t">${s("blockedList")}</span></span><span class="end">${icon("chev", "flip")}</span></button>
        <button class="row" data-calls="signout"><span class="ic">${icon("logout")}</span><span class="grow"><span class="t">${s("signOut")}</span></span></button>
        <button class="row danger" data-calls="delete"><span class="ic">${icon("trash")}</span><span class="grow"><span class="t">${s("deleteAcc")}</span></span></button>
      </div>
      ${TERMS_URL ? `<p class="small" style="margin:12px 4px"><a href="${esc(TERMS_URL)}" data-ext="${esc(TERMS_URL)}">${s("readTerms")}</a></p>` : ""}
    `;
  }
  function contactRow(c) {
    return `<div class="contact">
      <span class="avatar">${initial(c.name)}</span>
      <span class="grow"><b>${esc(c.name)}</b></span>
      <button class="call-btn" data-calls="call" data-uid="${esc(c.id)}" aria-label="${s("call")} ${esc(c.name)}">${icon("phone")}</button>
      <button class="icon-btn more-btn" data-calls="menu" data-uid="${esc(c.id)}" aria-label="${s("more")}">${icon("dots")}</button>
    </div>`;
  }
  function googleMark() {
    return `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.2-2.1 3.5-5.1 3.5-8.8z"/><path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24z"/><path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6h-4a12 12 0 0 0 0 10.8z"/><path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1c.9-2.9 3.6-4.9 6.7-4.9z"/></svg>`;
  }

  /* ================= Sheets ================= */
  function termsSheet() {
    openSheet(`<h3>${s("termsTitle")}</h3>
      <p class="lead" style="margin:0 0 8px">${s("termsIntro")}</p>
      <ul class="bullets">${["t1", "t2", "t3", "t4", "t5"].map((k) => `<li>${s(k)}</li>`).join("")}</ul>
      ${TERMS_URL ? `<p class="small"><a href="${esc(TERMS_URL)}" data-ext="${esc(TERMS_URL)}">${s("readTerms")}</a></p>` : ""}
      <label class="check"><input type="checkbox" id="termsChk"><span>${s("agree")}</span></label>
      <div class="sheet-actions"><button class="btn ghost" data-close>${s("cancel")}</button><button class="btn" id="termsOk" disabled>${s("agreeBtn")}</button></div>`,
      (root) => {
        const chk = root.querySelector("#termsChk"), ok = root.querySelector("#termsOk");
        chk.addEventListener("change", () => { ok.disabled = !chk.checked; });
        ok.addEventListener("click", async () => {
          ok.disabled = true;
          try {
            const p = await backend.fn("ensureProfile", { acceptTerms: true });
            if (backend.demo) store.set("demoTerms", 1);
            me.termsOk = (p.termsVersion || 0) >= (p.requiredTerms || 1); me.code = p.code;
            closeSheet(); startListening(); rerender();
          } catch (e) { ok.disabled = false; toast(errText(e)); }
        });
      });
  }

  function addSheet() {
    openSheet(`<h3>${s("addTitle")}</h3><p class="lead" style="margin:0 0 12px">${s("addHint")}</p>
      <div class="field"><label for="addCode">${s("codeLabel")}</label>
      <input id="addCode" class="input code-input" dir="ltr" maxlength="6" autocomplete="off" autocapitalize="characters" spellcheck="false" inputmode="text"></div>
      <p class="small" id="addErr" role="alert"></p>
      <div class="sheet-actions"><button class="btn ghost" data-close>${s("cancel")}</button><button class="btn" id="addGo">${s("addBtn")}</button></div>`,
      (root) => {
        const inp = root.querySelector("#addCode"), go = root.querySelector("#addGo"), err = root.querySelector("#addErr");
        inp.addEventListener("input", () => { inp.value = inp.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6); err.textContent = ""; });
        const submit = async () => {
          if (inp.value.length !== 6) { err.textContent = s("badCode"); inp.focus(); return; }
          go.disabled = true;
          try { const r = await backend.fn("addContact", { code: inp.value }); closeSheet(); toast(s("added")(r.name)); }
          catch (e) { err.textContent = errText(e); go.disabled = false; }
        };
        go.addEventListener("click", submit);
        inp.addEventListener("keydown", (e) => { if (e.key === "Enter") submit(); });
      });
  }

  function menuSheet(uid) {
    const c = contacts.find((x) => x.id === uid); if (!c) return;
    openSheet(`<div class="sheet-head"><span class="avatar">${initial(c.name)}</span><h3 style="margin:0">${esc(c.name)}</h3></div>
      <div class="panel" style="margin-top:12px">
        <button class="row" data-m="call"><span class="ic">${icon("phone")}</span><span class="grow"><span class="t">${s("call")}</span></span></button>
        <button class="row" data-m="remove"><span class="ic">${icon("x")}</span><span class="grow"><span class="t">${s("remove")}</span></span></button>
        <button class="row danger" data-m="block"><span class="ic">${icon("block")}</span><span class="grow"><span class="t">${s("block")}</span></span></button>
        <button class="row danger" data-m="report"><span class="ic">${icon("flag")}</span><span class="grow"><span class="t">${s("report")}</span></span></button>
      </div>
      <div class="sheet-actions"><button class="btn ghost" data-close>${s("close")}</button></div>`,
      (root) => root.addEventListener("click", async (e) => {
        const b = e.target.closest("[data-m]"); if (!b) return;
        const m = b.dataset.m;
        if (m === "call") { closeSheet(); return startCall(uid); }
        if (m === "report") return reportSheet(c);
        b.disabled = true;
        try {
          if (m === "remove") { await backend.fn("removeContact", { uid }); toast(s("removed")); }
          if (m === "block") { await backend.fn("blockUser", { uid }); toast(s("blocked")); }
          closeSheet();
        } catch (er) { b.disabled = false; toast(errText(er)); }
      }));
  }

  function reportSheet(c) {
    const R = s("reasons");
    openSheet(`<h3>${esc(s("reportTitle")(c.name))}</h3><p class="lead" style="margin:0 0 10px">${s("reportHint")}</p>
      <div class="panel" role="radiogroup">${Object.keys(R).map((k, i) => `<label class="row radio"><input type="radio" name="rr" value="${k}" ${i === 0 ? "checked" : ""}><span class="grow">${R[k]}</span></label>`).join("")}</div>
      <div class="field" style="margin-top:12px"><label for="rDetails">${s("details")}</label><textarea id="rDetails" class="input" rows="3" maxlength="500"></textarea></div>
      <label class="check"><input type="checkbox" id="rBlock" checked><span>${s("alsoBlock")}</span></label>
      <div class="sheet-actions"><button class="btn ghost" data-close>${s("cancel")}</button><button class="btn danger" id="rSend">${s("sendReport")}</button></div>`,
      (root) => root.querySelector("#rSend").addEventListener("click", async (e) => {
        const btn = e.currentTarget; btn.disabled = true;
        try {
          await backend.fn("reportUser", { uid: c.id, reason: root.querySelector("input[name=rr]:checked").value, details: root.querySelector("#rDetails").value });
          if (root.querySelector("#rBlock").checked) await backend.fn("blockUser", { uid: c.id, name: c.name });
          closeSheet(); toast(s("reported"));
        } catch (er) { btn.disabled = false; toast(errText(er)); }
      }));
  }

  function blockedSheet() {
    const body = () => blocked.length
      ? `<div class="panel">${blocked.map((b) => `<div class="contact"><span class="avatar">${initial(b.name)}</span><span class="grow"><b>${esc(b.name)}</b></span><button class="btn ghost" data-ub="${esc(b.id)}">${s("unblock")}</button></div>`).join("")}</div>`
      : `<p class="lead">${s("noBlocked")}</p>`;
    openSheet(`<h3>${s("blockedList")}</h3><div id="blkBody">${body()}</div><div class="sheet-actions"><button class="btn ghost" data-close>${s("close")}</button></div>`,
      (root) => root.addEventListener("click", async (e) => {
        const b = e.target.closest("[data-ub]"); if (!b) return;
        b.disabled = true;
        try { await backend.fn("unblockUser", { uid: b.dataset.ub }); blocked = blocked.filter((x) => x.id !== b.dataset.ub); root.querySelector("#blkBody").innerHTML = body(); }
        catch (er) { b.disabled = false; toast(errText(er)); }
      }));
  }

  function deleteSheet() {
    openSheet(`<h3>${s("deleteTitle")}</h3><p style="margin:6px 0 0">${s("deleteBody")}</p>
      <div class="sheet-actions"><button class="btn ghost" data-close>${s("cancel")}</button><button class="btn danger" id="delYes">${s("deleteYes")}</button></div>`,
      (root) => root.querySelector("#delYes").addEventListener("click", async (e) => {
        e.currentTarget.disabled = true;
        try { await backend.fn("deleteAccount", {}); await backend.signOut().catch(() => {}); stopListening(); me = null; contacts = []; closeSheet(); toast(s("deleted")); rerender(); emitAuth(); }
        catch (er) { e.currentTarget.disabled = false; toast(errText(er)); }
      }));
  }

  function newCodeSheet() {
    openSheet(`<h3>${s("newCode")}</h3><p style="margin:6px 0 0">${s("newCodeHint")}</p>
      <div class="sheet-actions"><button class="btn ghost" data-close>${s("cancel")}</button><button class="btn" id="ncGo">${s("newCode")}</button></div>`,
      (root) => root.querySelector("#ncGo").addEventListener("click", async (e) => {
        e.currentTarget.disabled = true;
        try { const r = await backend.fn("newCode", {}); me.code = r.code; closeSheet(); toast(s("newCodeDone")); rerender(); }
        catch (er) { e.currentTarget.disabled = false; toast(errText(er)); }
      }));
  }

  async function shareCode() {
    const text = s("shareText")(me.name, me.code);
    const Share = P("Share");
    try {
      if (Share) { await Share.share({ text, dialogTitle: s("share") }); return; }
      if (navigator.share) { await navigator.share({ text }); return; }
    } catch (e) { return; }
    copyCode();
  }
  async function copyCode() {
    try { await navigator.clipboard.writeText(me.code); toast(s("copied")); }
    catch (e) {
      const el = document.querySelector(".code"); if (!el) return;
      const r = document.createRange(); r.selectNodeContents(el);
      const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
    }
  }

  /* ================= Audio (ringtones) ================= */
  let audioCtx = null, toneTimer = null, toneNodes = [];
  function playTone(kind) {
    stopTone();
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === "suspended") audioCtx.resume();
      const burst = () => {
        const now = audioCtx.currentTime;
        const freqs = kind === "ring" ? [[523, 659], [587, 740]] : [[440, 480]];
        const len = kind === "ring" ? 0.45 : 1.6;
        freqs.forEach((pair, i) => pair.forEach((f) => {
          const o = audioCtx.createOscillator(), g = audioCtx.createGain();
          o.frequency.value = f; o.type = "sine";
          const t0 = now + i * (len + 0.08);
          g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(kind === "ring" ? 0.18 : 0.08, t0 + 0.03);
          g.gain.setValueAtTime(kind === "ring" ? 0.18 : 0.08, t0 + len - 0.05); g.gain.linearRampToValueAtTime(0, t0 + len);
          o.connect(g).connect(audioCtx.destination); o.start(t0); o.stop(t0 + len + 0.02);
          toneNodes.push(o);
        }));
        if (kind === "ring" && navigator.vibrate) navigator.vibrate([400, 200, 400]);
      };
      burst();
      toneTimer = setInterval(burst, kind === "ring" ? 2200 : 4000);
    } catch (e) { /* no audio */ }
  }
  function stopTone() {
    clearInterval(toneTimer); toneTimer = null;
    toneNodes.forEach((o) => { try { o.stop(); } catch (e) { /* ignore */ } }); toneNodes = [];
    if (navigator.vibrate) navigator.vibrate(0);
  }

  /* ================= Agora ================= */
  let agoraLoading = null;
  function loadAgora() {
    if (window.AgoraRTC) return Promise.resolve(window.AgoraRTC);
    if (!agoraLoading) agoraLoading = new Promise((res, rej) => {
      const sc = document.createElement("script");
      sc.src = "vendor/AgoraRTC_N-production.js";
      sc.onload = () => { try { window.AgoraRTC.setLogLevel(3); window.AgoraRTC.disableLogUpload && window.AgoraRTC.disableLogUpload(); } catch (e) { /* ignore */ } res(window.AgoraRTC); };
      sc.onerror = () => { agoraLoading = null; rej(new Error("network")); };
      document.head.appendChild(sc);
    });
    return agoraLoading;
  }
  async function joinVoice(sess, creds) {
    if (backend.demo) { sess.mic = { muted: false }; return; }
    const AgoraRTC = await loadAgora();
    const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    sess.client = client;
    client.on("user-published", async (user, mediaType) => {
      if (mediaType !== "audio") return;
      await client.subscribe(user, mediaType);
      user.audioTrack && user.audioTrack.play();
      sess.remoteJoined = true;
      if (sess.phase === "accepted") setPhase(sess, "live");
    });
    client.on("user-left", () => { if (sess === active && sess.phase === "live") finishCall(s("ended")); });
    client.on("connection-state-change", (cur) => { if (cur === "DISCONNECTED" && sess === active && sess.phase === "live") finishCall(s("ended")); });
    await client.join(creds.appId, creds.channel, creds.token, creds.agoraUid);
    if (sess !== active) { client.leave().catch(() => {}); return; }
    const mic = await AgoraRTC.createMicrophoneAudioTrack({ AEC: true, ANS: true, AGC: true });
    sess.mic = mic;
    await client.publish([mic]);
  }
  async function leaveVoice(sess) {
    try { if (sess.mic && sess.mic.close) { sess.mic.stop && sess.mic.stop(); sess.mic.close(); } } catch (e) { /* ignore */ }
    try { if (sess.client) await sess.client.leave(); } catch (e) { /* ignore */ }
  }

  /* ================= Call screen ================= */
  const screen = document.createElement("div");
  screen.className = "call-screen"; screen.hidden = true;
  screen.setAttribute("role", "dialog"); screen.setAttribute("aria-modal", "true");
  document.body.appendChild(screen);
  screen.addEventListener("click", (e) => {
    const b = e.target.closest("[data-cs]"); if (!b || !active) return;
    if (b.dataset.cs === "end") hangUp();
    if (b.dataset.cs === "accept") acceptCall();
    if (b.dataset.cs === "decline") declineCall();
    if (b.dataset.cs === "mute") toggleMute();
  });

  function drawScreen(sess, statusText) {
    const live = sess.phase === "live";
    const ringingIn = sess.incoming && sess.phase === "ringing";
    screen.hidden = false;
    screen.innerHTML = `
      <div class="cs-top">
        <span class="cs-label">${ringingIn ? s("incoming") : esc(window.STRINGS[state.lang].appName)}</span>
        <div class="cs-avatar ${sess.phase === "ringing" || sess.phase === "connecting" ? "pulse" : ""}">${initial(sess.name)}</div>
        <h2 class="cs-name">${esc(sess.name)}</h2>
        <p class="cs-status" id="csStatus" aria-live="polite">${esc(statusText || "")}</p>
        ${live ? `<p class="cs-hint">${s("keepOpen")}</p>` : ""}
      </div>
      <div class="cs-actions">
        ${ringingIn ? `
          <div class="cs-act"><button class="cs-btn decline" data-cs="decline" aria-label="${s("decline")}">${icon("phoneDown")}</button><span>${s("decline")}</span></div>
          <div class="cs-act"><button class="cs-btn accept" data-cs="accept" aria-label="${s("accept")}">${icon("phone")}</button><span>${s("accept")}</span></div>`
        : `
          <div class="cs-act"><button class="cs-btn soft ${sess.muted ? "on" : ""}" data-cs="mute" aria-pressed="${!!sess.muted}" aria-label="${sess.muted ? s("unmute") : s("mute")}">${icon(sess.muted ? "micOff" : "mic")}</button><span>${sess.muted ? s("unmute") : s("mute")}</span></div>
          <div class="cs-act"><button class="cs-btn decline" data-cs="end" aria-label="${s("end")}">${icon("phoneDown")}</button><span>${s("end")}</span></div>`}
      </div>`;
    const f = screen.querySelector(".cs-btn.accept, .cs-btn.decline"); if (f) f.focus({ preventScroll: true });
  }
  function fmtDur(ms) { const t = Math.floor(ms / 1000); return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`; }
  function setPhase(sess, phase) {
    sess.phase = phase;
    if (phase === "live") {
      stopTone();
      sess.liveAt = Date.now();
      drawScreen(sess, "00:00");
      clearInterval(sess.timer);
      sess.timer = setInterval(() => { const el = document.getElementById("csStatus"); if (el) el.textContent = fmtDur(Date.now() - sess.liveAt); }, 1000);
    } else if (phase === "accepted") {
      stopTone(); drawScreen(sess, s("connecting"));
      if (sess.remoteJoined || backend.demo) setPhase(sess, "live");
    } else if (phase === "ringing") {
      drawScreen(sess, sess.incoming ? "" : s("calling"));
    } else if (phase === "connecting") {
      drawScreen(sess, s("connecting"));
    }
  }

  async function startCall(uid) {
    if (active) return;
    const c = contacts.find((x) => x.id === uid);
    const sess = active = { incoming: false, name: c ? c.name : "", phase: "connecting", muted: false };
    setPhase(sess, "connecting");
    try {
      const r = await backend.fn("startCall", { uid });
      if (sess !== active) return;
      sess.callId = r.callId; handledCalls.add(r.callId);
      setPhase(sess, "ringing"); playTone("ringback");
      sess.docSub = backend.listenDoc(`calls/${r.callId}`, (d) => onCallDoc(sess, d));
      sess.ringTimeout = setTimeout(() => { if (sess === active && sess.phase === "ringing") hangUp(s("noAnswer")); }, RING_MS);
      await joinVoice(sess, r);
    } catch (e) {
      if (sess === active) finishCall(errText(e), true);
    }
  }
  function onCallDoc(sess, d) {
    if (sess !== active || !d) return;
    if (d.status === "accepted" && (sess.phase === "ringing" || sess.phase === "connecting")) setPhase(sess, "accepted");
    else if (d.status === "declined") finishCall(s("declined"));
    else if (d.status === "ended" || d.status === "canceled" || d.status === "missed") finishCall(sess.incoming && d.status !== "ended" ? s("noAnswer") : s("ended"));
  }

  function showIncoming(call) {
    handledCalls.add(call.id);
    const sess = active = { incoming: true, callId: call.id, name: call.callerName || "", phase: "ringing", muted: false };
    setPhase(sess, "ringing"); playTone("ring");
    sess.docSub = backend.listenDoc(`calls/${call.id}`, (d) => onCallDoc(sess, d));
    sess.ringTimeout = setTimeout(() => { if (sess === active && sess.phase === "ringing") finishCall(s("noAnswer")); }, Math.max(3000, RING_MS - (Date.now() - (call.createdAt || Date.now()))));
  }
  async function acceptCall() {
    const sess = active; if (!sess || !sess.incoming || sess.phase !== "ringing") return;
    stopTone(); setPhase(sess, "connecting");
    try {
      const r = await backend.fn("updateCall", { callId: sess.callId, action: "accept" });
      if (r.status !== "accepted") return finishCall(s("noAnswer"));
      await joinVoice(sess, r);
      setPhase(sess, "accepted");
      backend.removeAllNotifications();
    } catch (e) { finishCall(errText(e), true); backend.fn("updateCall", { callId: sess.callId, action: "end" }).catch(() => {}); }
  }
  async function declineCall() {
    const sess = active; if (!sess) return;
    backend.fn("updateCall", { callId: sess.callId, action: "decline" }).catch(() => {});
    backend.removeAllNotifications();
    finishCall("", false, true);
  }
  async function hangUp(reason) {
    const sess = active; if (!sess) return;
    if (sess.callId) backend.fn("updateCall", { callId: sess.callId, action: "end" }).catch(() => {});
    finishCall(reason || s("ended"));
  }
  function toggleMute() {
    const sess = active; if (!sess || !sess.mic) return;
    sess.muted = !sess.muted;
    try { if (sess.mic.setMuted) sess.mic.setMuted(sess.muted); else sess.mic.muted = sess.muted; } catch (e) { /* ignore */ }
    const status = document.getElementById("csStatus");
    drawScreen(sess, status ? status.textContent : "");
  }
  function finishCall(message, isError, silent) {
    const sess = active; if (!sess) return;
    active = null;
    stopTone();
    clearTimeout(sess.ringTimeout); clearInterval(sess.timer);
    if (sess.docSub != null) backend.unlisten(sess.docSub);
    leaveVoice(sess);
    if (silent) { screen.hidden = true; screen.innerHTML = ""; return; }
    sess.phase = "done";
    const st = document.getElementById("csStatus");
    if (st) st.textContent = message || s("ended");
    screen.querySelectorAll("button").forEach((b) => { b.disabled = true; });
    setTimeout(() => { if (!active) { screen.hidden = true; screen.innerHTML = ""; } }, isError ? 2600 : 1400);
  }

  /* ================= Push handling ================= */
  function onPush(data, tapped) {
    if (!data || !data.type || COMING_SOON) return;
    if (data.type === "call" && tapped) {
      if (!active && me && data.callId && !handledCalls.has(data.callId)) {
        // the incoming listener normally catches it; this covers a cold start
        let sub = null, done = false;
        sub = backend.listenDoc(`calls/${data.callId}`, (d) => {
          if (done) return; done = true;
          setTimeout(() => backend.unlisten(sub), 0);
          if (d && d.status === "ringing" && Date.now() - (d.createdAt || 0) < RING_MS && !active && !handledCalls.has(d.id)) showIncoming(d);
        });
      }
      ctx.go("family");
    }
    if ((data.type === "missed" || data.type === "contact") && tapped) ctx.go("family");
  }

  /* ================= Events from the main view ================= */
  function onClick(e) {
    const el = e.target.closest("[data-calls]"); if (!el) return false;
    const a = el.dataset.calls;
    if (a === "signin") signIn();
    else if (a === "terms") termsSheet();
    else if (a === "share") shareCode();
    else if (a === "copy") copyCode();
    else if (a === "add") addSheet();
    else if (a === "call") startCall(el.dataset.uid);
    else if (a === "menu") menuSheet(el.dataset.uid);
    else if (a === "newcode") newCodeSheet();
    else if (a === "blocked") blockedSheet();
    else if (a === "signout") signOut();
    else if (a === "delete") deleteSheet();
    return true;
  }
  function onBack() {
    if (active) { if (active.incoming && active.phase === "ringing") declineCall(); return true; }
    return false;
  }

  init();
  return {
    view, onClick, onBack, label: () => s("tab"),
    // shared Google account for other features (AI assistant)
    account: {
      available: !!backend,
      demo: !!(backend && backend.demo),
      ready: () => authChecked,
      busy: () => busy,
      user: () => me,
      signIn: () => signIn({ quiet: true }),
      fn: (name, data) => backend.fn(name, data),
      onChange: (f) => authListeners.push(f),
      googleMark
    }
  };
};
