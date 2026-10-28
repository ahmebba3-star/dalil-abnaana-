/*
 * خادم المكالمات العائلية — دليل أبنائنا بالخارج
 * Family calling backend (Firebase Cloud Functions v2, callable only).
 *
 * Firestore layout
 *   users/{uid}                 name, country, code, tokens[], termsVersion, createdAt
 *   users/{uid}/contacts/{cid}  name, addedAt
 *   users/{uid}/blocked/{bid}   name, blockedAt
 *   codes/{code}                uid
 *   calls/{callId}              caller, callee, callerName, calleeName, status, createdAt, answeredAt, endedAt
 *   reports/{id}                reporter, reported, reason, details, createdAt  (type "ai" for assistant answers)
 *   usage/{uid_yyyymmdd}        count  (assistant questions per user per day; "_all_yyyymmdd" for the app total)
 *
 * Clients can only READ their own data; every write goes through these functions.
 */
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { getMessaging } = require("firebase-admin/messaging");
const { getAuth } = require("firebase-admin/auth");
const { RtcTokenBuilder, RtcRole } = require("agora-token");

initializeApp();
const db = getFirestore();

setGlobalOptions({ region: "europe-west1", maxInstances: 10, memory: "256MiB" });

// Secrets come from functions/.env (written by the GitHub workflow from repository secrets).
const env = (k) => String(process.env[k] || "").trim();

const TERMS_VERSION = 1;
const RING_MS = 45 * 1000; // a call rings for 45 seconds
const STALE_ACTIVE_MS = 3 * 60 * 60 * 1000; // treat "accepted" calls older than 3h as finished
const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I
const MAX_CONTACTS = 100;
const REPORT_REASONS = ["harassment", "spam", "impersonation", "inappropriate", "other"];

/* ---------------- helpers ---------------- */
function requireUser(req) {
  if (!req.auth || !req.auth.uid) throw new HttpsError("unauthenticated", "sign-in-required");
  return req.auth.uid;
}
function cleanName(s) {
  const v = String(s || "").replace(/[\u0000-\u001f<>]/g, "").trim().slice(0, 40);
  return v || "مستخدم";
}
function cleanUid(s) {
  const v = String(s || "");
  if (!/^[A-Za-z0-9_-]{6,128}$/.test(v)) throw new HttpsError("invalid-argument", "bad-uid");
  return v;
}
function randomCode() {
  let c = "";
  for (let i = 0; i < 6; i++) c += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  return c;
}
async function getProfile(uid) {
  const snap = await db.doc(`users/${uid}`).get();
  if (!snap.exists) throw new HttpsError("failed-precondition", "no-profile");
  return snap.data();
}
async function isBlockedEitherWay(a, b) {
  const [x, y] = await Promise.all([db.doc(`users/${a}/blocked/${b}`).get(), db.doc(`users/${b}/blocked/${a}`).get()]);
  return x.exists || y.exists;
}
/** Allocate a new unique invite code for uid (transactional). Releases the old one. */
async function assignNewCode(uid, oldCode) {
  for (let i = 0; i < 8; i++) {
    const code = randomCode();
    const ok = await db.runTransaction(async (tx) => {
      const ref = db.doc(`codes/${code}`);
      const s = await tx.get(ref);
      if (s.exists) return false;
      tx.set(ref, { uid, createdAt: Date.now() });
      tx.set(db.doc(`users/${uid}`), { code }, { merge: true });
      if (oldCode) tx.delete(db.doc(`codes/${oldCode}`));
      return true;
    });
    if (ok) return code;
  }
  throw new HttpsError("resource-exhausted", "code-generation-failed");
}
async function sendPush(uid, message) {
  const snap = await db.doc(`users/${uid}`).get();
  const tokens = (snap.exists && snap.data().tokens) || [];
  if (!tokens.length) return;
  const res = await getMessaging().sendEachForMulticast({ ...message, tokens });
  const dead = [];
  res.responses.forEach((r, i) => {
    const code = r.error && r.error.code;
    if (code === "messaging/registration-token-not-registered" || code === "messaging/invalid-registration-token") dead.push(tokens[i]);
  });
  if (dead.length) await db.doc(`users/${uid}`).update({ tokens: FieldValue.arrayRemove(...dead) });
}
function agoraToken(channel, agoraUid) {
  const appId = env("AGORA_APP_ID");
  const cert = env("AGORA_APP_CERT");
  if (!appId || !cert) throw new HttpsError("failed-precondition", "agora-not-configured");
  const ttl = 2 * 60 * 60; // 2 hours
  return { appId, token: RtcTokenBuilder.buildTokenWithUid(appId, cert, channel, agoraUid, RtcRole.PUBLISHER, ttl, ttl) };
}
async function hasActiveCall(uid) {
  const now = Date.now();
  const qs = await Promise.all([
    db.collection("calls").where("caller", "==", uid).where("status", "in", ["ringing", "accepted"]).limit(5).get(),
    db.collection("calls").where("callee", "==", uid).where("status", "in", ["ringing", "accepted"]).limit(5).get()
  ]);
  return qs.some((q) => q.docs.some((d) => {
    const c = d.data();
    return c.status === "ringing" ? now - c.createdAt < RING_MS : now - (c.answeredAt || c.createdAt) < STALE_ACTIVE_MS;
  }));
}

/* ---------------- profile ---------------- */
// Creates or refreshes the caller's profile; registers the device token.
exports.ensureProfile = onCall(async (req) => {
  const uid = requireUser(req);
  const d = req.data || {};
  const ref = db.doc(`users/${uid}`);
  const snap = await ref.get();
  const update = { name: cleanName(d.name || (req.auth.token && req.auth.token.name)), updatedAt: Date.now() };
  if (d.country) update.country = String(d.country).slice(0, 4);
  if (d.acceptTerms) update.termsVersion = TERMS_VERSION;
  if (typeof d.token === "string" && d.token.length > 20 && d.token.length < 4096) update.tokens = FieldValue.arrayUnion(d.token);
  if (!snap.exists) update.createdAt = Date.now();
  await ref.set(update, { merge: true });
  let profile = (await ref.get()).data();
  if (!profile.code) { await assignNewCode(uid, null); profile = (await ref.get()).data(); }
  return { name: profile.name, code: profile.code, termsVersion: profile.termsVersion || 0, requiredTerms: TERMS_VERSION };
});

exports.newCode = onCall(async (req) => {
  const uid = requireUser(req);
  const p = await getProfile(uid);
  const code = await assignNewCode(uid, p.code);
  return { code };
});

exports.removeToken = onCall(async (req) => {
  const uid = requireUser(req);
  const token = String((req.data && req.data.token) || "");
  if (token) await db.doc(`users/${uid}`).set({ tokens: FieldValue.arrayRemove(token) }, { merge: true });
  return { ok: true };
});

/* ---------------- contacts ---------------- */
exports.addContact = onCall(async (req) => {
  const uid = requireUser(req);
  const code = String((req.data && req.data.code) || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (code.length !== 6) throw new HttpsError("invalid-argument", "bad-code");
  const me = await getProfile(uid);
  if ((me.termsVersion || 0) < TERMS_VERSION) throw new HttpsError("failed-precondition", "terms-required");
  const codeSnap = await db.doc(`codes/${code}`).get();
  if (!codeSnap.exists) throw new HttpsError("not-found", "code-not-found");
  const other = codeSnap.data().uid;
  if (other === uid) throw new HttpsError("invalid-argument", "own-code");
  if (await isBlockedEitherWay(uid, other)) throw new HttpsError("not-found", "code-not-found");
  const count = (await db.collection(`users/${uid}/contacts`).count().get()).data().count;
  if (count >= MAX_CONTACTS) throw new HttpsError("resource-exhausted", "too-many-contacts");
  const them = await getProfile(other);
  const now = Date.now();
  const batch = db.batch();
  batch.set(db.doc(`users/${uid}/contacts/${other}`), { name: them.name, addedAt: now });
  batch.set(db.doc(`users/${other}/contacts/${uid}`), { name: me.name, addedAt: now });
  await batch.commit();
  await sendPush(other, {
    notification: { title: "دليل أبنائنا بالخارج", body: `${me.name} ضافك لجهات الاتصال وتقدروا تتكلموا دلوقتي` },
    data: { type: "contact", uid },
    android: { priority: "normal" }
  }).catch(() => {});
  return { uid: other, name: them.name };
});

exports.removeContact = onCall(async (req) => {
  const uid = requireUser(req);
  const other = cleanUid(req.data && req.data.uid);
  const batch = db.batch();
  batch.delete(db.doc(`users/${uid}/contacts/${other}`));
  batch.delete(db.doc(`users/${other}/contacts/${uid}`));
  await batch.commit();
  return { ok: true };
});

exports.blockUser = onCall(async (req) => {
  const uid = requireUser(req);
  const other = cleanUid(req.data && req.data.uid);
  if (other === uid) throw new HttpsError("invalid-argument", "self");
  const c = await db.doc(`users/${uid}/contacts/${other}`).get();
  const name = c.exists ? c.data().name : cleanName(req.data && req.data.name);
  const batch = db.batch();
  batch.set(db.doc(`users/${uid}/blocked/${other}`), { name, blockedAt: Date.now() });
  batch.delete(db.doc(`users/${uid}/contacts/${other}`));
  batch.delete(db.doc(`users/${other}/contacts/${uid}`));
  await batch.commit();
  return { ok: true };
});

exports.unblockUser = onCall(async (req) => {
  const uid = requireUser(req);
  const other = cleanUid(req.data && req.data.uid);
  await db.doc(`users/${uid}/blocked/${other}`).delete();
  return { ok: true };
});

exports.reportUser = onCall(async (req) => {
  const uid = requireUser(req);
  const d = req.data || {};
  const other = cleanUid(d.uid);
  const reason = REPORT_REASONS.includes(d.reason) ? d.reason : "other";
  const recent = await db.collection("reports").where("reporter", "==", uid).where("createdAt", ">", Date.now() - 3600e3).limit(10).get();
  if (recent.size >= 10) throw new HttpsError("resource-exhausted", "too-many-reports");
  const reported = await db.doc(`users/${other}`).get();
  await db.collection("reports").add({
    reporter: uid,
    reported: other,
    reportedName: reported.exists ? reported.data().name : "",
    reason,
    details: String(d.details || "").slice(0, 500),
    createdAt: Date.now(),
    status: "open"
  });
  return { ok: true };
});

/* ---------------- calls ---------------- */
exports.startCall = onCall(async (req) => {
  const uid = requireUser(req);
  const callee = cleanUid(req.data && req.data.uid);
  if (callee === uid) throw new HttpsError("invalid-argument", "self");
  const [me, contact] = await Promise.all([getProfile(uid), db.doc(`users/${uid}/contacts/${callee}`).get()]);
  if (!contact.exists) throw new HttpsError("permission-denied", "not-a-contact");
  if (await isBlockedEitherWay(uid, callee)) throw new HttpsError("permission-denied", "not-a-contact");

  const recent = await db.collection("calls").where("caller", "==", uid).where("createdAt", ">", Date.now() - 60e3).limit(6).get();
  if (recent.size >= 5) throw new HttpsError("resource-exhausted", "slow-down");
  if (await hasActiveCall(callee)) throw new HttpsError("unavailable", "busy");

  const ref = db.collection("calls").doc();
  const now = Date.now();
  await ref.set({ caller: uid, callee, callerName: me.name, calleeName: contact.data().name, status: "ringing", createdAt: now });
  await sendPush(callee, {
    notification: { title: `📞 ${me.name}`, body: "بيتصل بيك — اضغط للرد" },
    data: { type: "call", callId: ref.id, caller: uid, callerName: me.name },
    android: {
      priority: "high",
      ttl: RING_MS,
      notification: { channelId: "calls", tag: `call-${ref.id}`, sound: "ringtone", visibility: "public", defaultVibrateTimings: true }
    }
  }).catch((e) => console.warn("push failed", e.message));
  return { callId: ref.id, agoraUid: 1, channel: ref.id, ...agoraToken(ref.id, 1) };
});

// Callee accepts or declines; either side ends or cancels.
exports.updateCall = onCall(async (req) => {
  const uid = requireUser(req);
  const d = req.data || {};
  const callId = cleanUid(d.callId);
  const action = String(d.action || "");
  const ref = db.doc(`calls/${callId}`);
  const result = await db.runTransaction(async (tx) => {
    const s = await tx.get(ref);
    if (!s.exists) throw new HttpsError("not-found", "no-call");
    const c = s.data();
    const isCaller = c.caller === uid, isCallee = c.callee === uid;
    if (!isCaller && !isCallee) throw new HttpsError("permission-denied", "not-participant");
    const now = Date.now();
    const ringingExpired = c.status === "ringing" && now - c.createdAt > RING_MS;
    if (action === "accept") {
      if (!isCallee) throw new HttpsError("permission-denied", "only-callee");
      if (c.status !== "ringing" || ringingExpired) throw new HttpsError("failed-precondition", "call-over");
      tx.update(ref, { status: "accepted", answeredAt: now });
      return { status: "accepted", call: c };
    }
    if (action === "decline") {
      if (!isCallee || c.status !== "ringing") return { status: c.status, call: c };
      tx.update(ref, { status: "declined", endedAt: now });
      return { status: "declined", call: c };
    }
    if (action === "end") {
      if (c.status === "ringing") {
        const st = isCaller ? (ringingExpired ? "missed" : "canceled") : "declined";
        tx.update(ref, { status: st, endedAt: now });
        return { status: st, call: c };
      }
      if (c.status === "accepted") { tx.update(ref, { status: "ended", endedAt: now }); return { status: "ended", call: c }; }
      return { status: c.status, call: c };
    }
    throw new HttpsError("invalid-argument", "bad-action");
  });

  // Replace the ringing notification on the callee's phone.
  if (result.status === "missed" || result.status === "canceled") {
    await sendPush(result.call.callee, {
      notification: { title: `مكالمة فائتة من ${result.call.callerName}`, body: "اضغط عشان ترجع تتصل" },
      data: { type: "missed", callId, caller: result.call.caller },
      android: { priority: "high", notification: { tag: `call-${callId}`, channelId: "missed" } }
    }).catch(() => {});
  }
  const out = { status: result.status };
  if (result.status === "accepted") Object.assign(out, { agoraUid: 2, channel: callId }, agoraToken(callId, 2));
  return out;
});

/* ---------------- account deletion ---------------- */
async function deleteCollection(path) {
  const snap = await db.collection(path).limit(400).get();
  if (snap.empty) return;
  const batch = db.batch();
  snap.docs.forEach((d) => batch.delete(d.ref));
  await batch.commit();
  if (snap.size === 400) await deleteCollection(path);
}
exports.deleteAccount = onCall(async (req) => {
  const uid = requireUser(req);
  const snap = await db.doc(`users/${uid}`).get();
  const contacts = await db.collection(`users/${uid}/contacts`).get();
  const batch = db.batch();
  contacts.docs.forEach((d) => batch.delete(db.doc(`users/${d.id}/contacts/${uid}`)));
  if (snap.exists && snap.data().code) batch.delete(db.doc(`codes/${snap.data().code}`));
  await batch.commit();
  await deleteCollection(`users/${uid}/contacts`);
  await deleteCollection(`users/${uid}/blocked`);
  await db.doc(`users/${uid}`).delete();
  // Call records keep only IDs and display names; remove this user's name from them.
  for (const field of ["caller", "callee"]) {
    const qs = await db.collection("calls").where(field, "==", uid).limit(500).get();
    const b = db.batch();
    qs.docs.forEach((d) => b.update(d.ref, { [field + "Name"]: "حساب محذوف", [field]: "deleted" }));
    if (!qs.empty) await b.commit();
  }
  await getAuth().deleteUser(uid).catch(() => {});
  return { ok: true };
});


/* =====================================================================
   المساعد الذكي — AI assistant (Gemini), grounded on the app's own content
   ===================================================================== */
const fs = require("fs");
const path = require("path");
const ASK_DAILY_PER_USER = 20;
const ASK_DAILY_TOTAL = 3000; // protects the bill if something goes wrong
const SECTIONS = ["none", "exams", "consular", "family", "news", "tools"];
const COUNTRY_NAMES = { SA: "السعودية", AE: "الإمارات", KW: "الكويت", QA: "قطر", BH: "البحرين", OM: "عُمان", JO: "الأردن", LB: "لبنان", LY: "ليبيا", IT: "إيطاليا", FR: "فرنسا", DE: "ألمانيا", NL: "هولندا", GR: "اليونان", GB: "المملكة المتحدة", US: "الولايات المتحدة", CA: "كندا", AU: "أستراليا" };

let contentCache = { at: 0, kb: "", news: null };
async function fetchText(url) {
  const ctrl = new AbortController();
  const to = setTimeout(() => ctrl.abort(), 5000);
  try {
    const r = await fetch(url + (url.includes("?") ? "&" : "?") + "t=" + Date.now(), { signal: ctrl.signal });
    if (!r.ok) throw new Error("HTTP " + r.status);
    return await r.text();
  } finally { clearTimeout(to); }
}
/** Knowledge file + news, fetched live from GitHub (cached 10 min), with the deployed copy as fallback. */
async function loadContent() {
  if (Date.now() - contentCache.at < 10 * 60 * 1000 && contentCache.kb) return contentCache;
  const base = env("CONTENT_BASE_URL");
  let kb = "", news = null;
  if (base) {
    try { kb = await fetchText(base + "/assistant-knowledge.md"); } catch (e) { console.warn("kb fetch", e.message); }
    try { news = JSON.parse(await fetchText(base + "/news.json")); } catch (e) { console.warn("news fetch", e.message); }
  }
  if (!kb) { try { kb = fs.readFileSync(path.join(__dirname, "knowledge.md"), "utf8"); } catch (e) { kb = ""; } }
  if (!news) { try { news = JSON.parse(fs.readFileSync(path.join(__dirname, "news.json"), "utf8")); } catch (e) { news = null; } }
  contentCache = { at: Date.now(), kb: kb.slice(0, 60000), news };
  return contentCache;
}
function newsText(news) {
  if (!news) return "";
  const out = ["## مواعيد الامتحانات القادمة"];
  (news.exams || []).forEach((e) => out.push(`- ${e.title_ar}: ${e.confirmed && e.date ? "الموعد الرسمي " + e.date : "لم يُعلن رسميًا بعد. " + (e.expected_ar || "")}`));
  out.push("", "## آخر الأخبار (الأحدث أولًا)");
  (news.news || []).slice(0, 15).forEach((n) => out.push(`- [${n.date}] ${n.title_ar}: ${n.body_ar}${n.url ? " (المصدر: " + n.url + ")" : ""}`));
  return out.join("\n");
}
function todayKey() { return new Date().toISOString().slice(0, 10).replace(/-/g, ""); }

const SYSTEM_PROMPT = (country, today, lang) => `إنت «مساعد دليل أبنائنا بالخارج»، مساعد جوه تطبيق موبايل للمصريين المقيمين بره مصر.
بتساعدهم في: امتحانات الطلاب المصريين بالخارج (منصة أبناؤنا في الخارج)، والخدمات القنصلية (الجواز، قيد المواليد، التوكيلات، التصديقات، الرقم القومي، التجنيد)، وأخبار الجالية، وإزاي يستخدموا أقسام التطبيق.

قواعد لازم تلتزم بيها:
1. اللغة: ${lang === "en" ? "رد بالإنجليزي البسيط." : "رد بالعامية المصرية البسيطة والمهذبة. لو المستخدم كتب بالإنجليزي، رد بالإنجليزي."}
2. اعتمد بس على «المعلومات المتاحة» اللي تحت. متألفش أبدًا مواعيد أو رسوم أو أرقام تليفونات أو عناوين أو روابط أو أسماء مسؤولين.
3. لو الإجابة مش موجودة في المعلومات، قول بصراحة إنك مش متأكد، ووجّهه للجهة الرسمية المناسبة (منصة أبناؤنا في الخارج أو القسم القنصلي في السفارة).
4. لو السؤال عن خطوات، اكتبها مرقمة (1. 2. 3.) وكل خطوة في سطر لوحدها وقصيرة. وخلي الرد كله أقل من 170 كلمة.
5. متطلبش ومتقبلش بيانات شخصية زي أرقام الجوازات أو الرقم القومي أو كلمات السر. لو حد كتب حاجة زي كده، نبّهه بلطف إنه ميكتبهاش.
6. لو السؤال بره المواضيع دي، اعتذر بلطف في جملة واحدة وقول اللي تقدر تساعد فيه.
7. لو فيه طوارئ أو خطر على حياة حد، قوله يتصل فورًا بأرقام الطوارئ المحلية، واذكرها لو موجودة في المعلومات.
8. متدّيش رأي سياسي، ومتقدمش نفسك على إنك جهة رسمية.
9. ختم الإجابات اللي فيها إجراءات رسمية بجملة قصيرة إن التفاصيل ممكن تختلف، وإن المرجع النهائي هو الجهة الرسمية.

بيانات المستخدم: مقيم في ${COUNTRY_NAMES[country] || "دولة غير محددة"}. تاريخ النهارده ${today}.

الرد لازم يكون JSON بالشكل ده:
- answer: نص الرد.
- section: أنسب قسم في التطبيق يفتحه المستخدم بعد الرد، وتختار واحد من: exams, consular, family, news, tools, none.
- link: رابط رسمي واحد مناسب منقول بالحرف من المعلومات المتاحة، أو نص فاضي لو مفيش.`;

async function callGemini(model, body) {
  const key = env("GEMINI_API_KEY");
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify(body)
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) { const e = new Error((j.error && j.error.message) || "HTTP " + r.status); e.status = r.status; throw e; }
  return j;
}

exports.askAssistant = onCall({ timeoutSeconds: 60 }, async (req) => {
  const uid = requireUser(req);
  if (!env("GEMINI_API_KEY")) throw new HttpsError("failed-precondition", "assistant-not-configured");
  const d = req.data || {};
  const message = String(d.message || "").replace(/[\u0000-\u0008\u000b-\u001f]/g, "").trim().slice(0, 600);
  if (message.length < 2) throw new HttpsError("invalid-argument", "empty");
  const lang = d.lang === "en" ? "en" : "ar";
  const country = /^[A-Z]{2}$/.test(String(d.country || "")) ? d.country : "";
  const history = (Array.isArray(d.history) ? d.history : []).slice(-6)
    .filter((h) => h && (h.role === "user" || h.role === "assistant") && typeof h.text === "string")
    .map((h) => ({ role: h.role === "user" ? "user" : "model", parts: [{ text: h.text.slice(0, 1200) }] }));

  // daily limits (per user + whole app)
  const day = todayKey();
  const userRef = db.doc(`usage/${uid}_${day}`), allRef = db.doc(`usage/_all_${day}`);
  const used = await db.runTransaction(async (tx) => {
    const [u, a] = await Promise.all([tx.get(userRef), tx.get(allRef)]);
    const uc = u.exists ? u.data().count || 0 : 0, ac = a.exists ? a.data().count || 0 : 0;
    if (uc >= ASK_DAILY_PER_USER) throw new HttpsError("resource-exhausted", "daily-limit");
    if (ac >= ASK_DAILY_TOTAL) throw new HttpsError("resource-exhausted", "busy-today");
    tx.set(userRef, { count: uc + 1, uid, day }, { merge: true });
    tx.set(allRef, { count: ac + 1, day }, { merge: true });
    return uc + 1;
  });

  const content = await loadContent();
  const info = `المعلومات المتاحة:\n\n${content.kb}\n\n${newsText(content.news)}`;
  const body = {
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT(country, new Date().toISOString().slice(0, 10), lang) + "\n\n" + info }] },
    contents: [...history, { role: "user", parts: [{ text: message }] }],
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 2048,
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: { answer: { type: "STRING" }, section: { type: "STRING", enum: SECTIONS }, link: { type: "STRING" } },
        required: ["answer", "section", "link"]
      }
    }
  };

  const models = [env("GEMINI_MODEL") || "gemini-flash-lite-latest", "gemini-flash-latest"];
  let result = null, lastErr = null;
  for (const m of [...new Set(models)]) {
    try { result = await callGemini(m, body); break; }
    catch (e) { lastErr = e; console.warn("gemini", m, e.status, e.message); if (e.status !== 404 && e.status !== 400) break; }
  }
  if (!result) {
    // give the question back so a failure doesn't eat the user's quota
    await userRef.set({ count: FieldValue.increment(-1) }, { merge: true }).catch(() => {});
    const busy = lastErr && (lastErr.status === 429 || lastErr.status === 503);
    throw new HttpsError("unavailable", busy ? "assistant-busy" : "assistant-error");
  }

  const cand = (result.candidates || [])[0] || {};
  const raw = ((cand.content && cand.content.parts) || []).map((p) => p.text || "").join("");
  let out = { answer: "", section: "none", link: "" };
  try { out = { ...out, ...JSON.parse(raw) }; } catch (e) { out.answer = raw; }
  if (!out.answer || cand.finishReason === "SAFETY") {
    out = { answer: lang === "en" ? "Sorry, I can't help with that. I can answer questions about exams for Egyptian students abroad and consular services." : "معلش، مقدرش أساعد في ده. أقدر أجاوبك عن امتحانات الطلاب المصريين بالخارج والخدمات القنصلية.", section: "none", link: "" };
  }
  // only allow links that really appear in our content
  const allowed = content.kb + JSON.stringify(content.news || {});
  const link = String(out.link || "").trim();
  if (!/^https:\/\/[^\s"'<>]+$/.test(link) || !allowed.includes(link)) out.link = "";
  if (!SECTIONS.includes(out.section)) out.section = "none";
  return { answer: String(out.answer).slice(0, 2500), section: out.section, link: out.link, remaining: Math.max(0, ASK_DAILY_PER_USER - used) };
});

exports.reportAnswer = onCall(async (req) => {
  const uid = requireUser(req);
  const d = req.data || {};
  const recent = await db.collection("reports").where("reporter", "==", uid).where("createdAt", ">", Date.now() - 3600e3).limit(10).get();
  if (recent.size >= 10) throw new HttpsError("resource-exhausted", "too-many-reports");
  await db.collection("reports").add({
    type: "ai",
    reporter: uid,
    question: String(d.question || "").slice(0, 600),
    answer: String(d.answer || "").slice(0, 2500),
    reason: String(d.reason || "").slice(0, 40),
    createdAt: Date.now(),
    status: "open"
  });
  return { ok: true };
});
