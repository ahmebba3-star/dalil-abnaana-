/*
 * المساعد الذكي — دليل أبنائنا بالخارج
 * Cloudflare Worker (free plan). Paste this whole file in the Worker editor.
 *
 * Needs (Worker → Settings → Variables and Secrets / Bindings):
 *   GEMINI_API_KEY        secret   key from aistudio.google.com
 *   FIREBASE_PROJECT_ID   text     your Firebase project ID (e.g. dalil-abnaana)
 *   USAGE                 KV binding (daily counters + reports)
 * Optional:
 *   CONTENT_BASE_URL      text     raw GitHub folder with assistant-knowledge.md and news.json
 *   GEMINI_MODEL          text     model name (default: gemini-flash-lite-latest)
 *
 * Routes:  POST /ask     { message, history[], country, lang }   → { answer, section, link, remaining }
 *          POST /report  { question, answer, reason }             → { ok }
 *          GET  /        health check
 * Every POST needs "Authorization: Bearer <Firebase ID token>" from Google sign-in in the app.
 */

const DEFAULT_CONTENT = "https://raw.githubusercontent.com/ahmebba3-star/dalil-abnaana-/main";
const ASK_DAILY_PER_USER = 20;
const ASK_DAILY_TOTAL = 900; // KV free plan allows 1,000 writes a day
const SECTIONS = ["none", "exams", "consular", "family", "news", "tools"];
const COUNTRY_NAMES = { SA: "السعودية", AE: "الإمارات", KW: "الكويت", QA: "قطر", BH: "البحرين", OM: "عُمان", JO: "الأردن", LB: "لبنان", LY: "ليبيا", IT: "إيطاليا", FR: "فرنسا", DE: "ألمانيا", NL: "هولندا", GR: "اليونان", GB: "المملكة المتحدة", US: "الولايات المتحدة", CA: "كندا", AU: "أستراليا" };
const JWKS_URL = "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400"
};
const json = (obj, status = 200) => new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json; charset=utf-8", ...CORS } });
const fail = (code, status) => json({ error: code }, status);

/* ---------------- Firebase ID token check (RS256) ---------------- */
let jwksCache = { at: 0, keys: [] };
function b64urlToBytes(s) {
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  const bin = atob(s);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
const b64urlJson = (s) => JSON.parse(new TextDecoder().decode(b64urlToBytes(s)));
async function getKeys(force) {
  if (!force && Date.now() - jwksCache.at < 3600e3 && jwksCache.keys.length) return jwksCache.keys;
  const r = await fetch(JWKS_URL);
  if (!r.ok) throw new Error("jwks " + r.status);
  const j = await r.json();
  jwksCache = { at: Date.now(), keys: j.keys || [] };
  return jwksCache.keys;
}
async function verifyIdToken(token, projectId) {
  const parts = String(token || "").split(".");
  if (parts.length !== 3) throw new Error("bad-token");
  const header = b64urlJson(parts[0]);
  const payload = b64urlJson(parts[1]);
  if (header.alg !== "RS256" || !header.kid) throw new Error("bad-alg");
  let jwk = (await getKeys(false)).find((k) => k.kid === header.kid);
  if (!jwk) jwk = (await getKeys(true)).find((k) => k.kid === header.kid);
  if (!jwk) throw new Error("unknown-kid");
  const key = await crypto.subtle.importKey("jwk", { kty: jwk.kty, n: jwk.n, e: jwk.e, alg: "RS256", ext: true }, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
  const ok = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, b64urlToBytes(parts[2]), new TextEncoder().encode(parts[0] + "." + parts[1]));
  if (!ok) throw new Error("bad-signature");
  const now = Math.floor(Date.now() / 1000);
  if (payload.aud !== projectId) throw new Error("bad-aud");
  if (payload.iss !== "https://securetoken.google.com/" + projectId) throw new Error("bad-iss");
  if (!payload.exp || payload.exp < now - 30) throw new Error("expired");
  if (payload.iat && payload.iat > now + 300) throw new Error("bad-iat");
  if (!payload.sub) throw new Error("no-sub");
  return { uid: payload.sub, name: payload.name || "" };
}

/* ---------------- content (knowledge + news) ---------------- */
let contentCache = { at: 0, kb: "", news: null };
async function fetchText(url) {
  const r = await fetch(url + "?t=" + Math.floor(Date.now() / 600000), { cf: { cacheTtl: 600 } });
  if (!r.ok) throw new Error("HTTP " + r.status);
  return r.text();
}
async function loadContent(env) {
  if (Date.now() - contentCache.at < 600e3 && contentCache.kb) return contentCache;
  const base = (env.CONTENT_BASE_URL || DEFAULT_CONTENT).replace(/\/+$/, "");
  let kb = contentCache.kb, news = contentCache.news;
  try { kb = await fetchText(base + "/assistant-knowledge.md"); } catch (e) { /* keep old */ }
  try { news = JSON.parse(await fetchText(base + "/news.json")); } catch (e) { /* keep old */ }
  contentCache = { at: Date.now(), kb: String(kb || "").slice(0, 60000), news };
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

async function callGemini(env, model, body) {
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": String(env.GEMINI_API_KEY).trim() },
    body: JSON.stringify(body)
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) { const e = new Error((j.error && j.error.message) || "HTTP " + r.status); e.status = r.status; throw e; }
  return j;
}

const dayKey = () => new Date().toISOString().slice(0, 10).replace(/-/g, "");
async function getCount(env, key) { const v = await env.USAGE.get(key); return parseInt(v || "0", 10) || 0; }
const TTL = 2 * 86400;

/* ---------------- handlers ---------------- */
async function handleAsk(env, user, d) {
  const message = String(d.message || "").replace(/[\u0000-\u0008\u000b-\u001f]/g, "").trim().slice(0, 600);
  if (message.length < 2) return fail("empty", 400);
  const lang = d.lang === "en" ? "en" : "ar";
  const country = /^[A-Z]{2}$/.test(String(d.country || "")) ? d.country : "";
  const history = (Array.isArray(d.history) ? d.history : []).slice(-6)
    .filter((h) => h && (h.role === "user" || h.role === "assistant") && typeof h.text === "string")
    .map((h) => ({ role: h.role === "user" ? "user" : "model", parts: [{ text: h.text.slice(0, 1200) }] }));

  const day = dayKey();
  const uKey = `u:${user.uid}:${day}`, aKey = `all:${day}`;
  const [uc, ac] = await Promise.all([getCount(env, uKey), getCount(env, aKey)]);
  if (uc >= ASK_DAILY_PER_USER) return fail("daily-limit", 429);
  if (ac >= ASK_DAILY_TOTAL) return fail("busy-today", 429);

  const content = await loadContent(env);
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
  const models = [...new Set([String(env.GEMINI_MODEL || "").trim() || "gemini-flash-lite-latest", "gemini-flash-latest"])];
  let result = null, lastErr = null;
  for (const m of models) {
    try { result = await callGemini(env, m, body); break; }
    catch (e) { lastErr = e; console.log("gemini", m, e.status, e.message); if (e.status !== 404 && e.status !== 400) break; }
  }
  if (!result) {
    const busy = lastErr && (lastErr.status === 429 || lastErr.status === 503);
    return fail(busy ? "assistant-busy" : "assistant-error", 503); // nothing counted
  }
  // count only answered questions
  await Promise.all([
    env.USAGE.put(uKey, String(uc + 1), { expirationTtl: TTL }),
    env.USAGE.put(aKey, String(ac + 1), { expirationTtl: TTL })
  ]);

  const cand = (result.candidates || [])[0] || {};
  const raw = ((cand.content && cand.content.parts) || []).map((p) => p.text || "").join("");
  let out = { answer: "", section: "none", link: "" };
  try { out = { ...out, ...JSON.parse(raw) }; } catch (e) { out.answer = raw; }
  if (!out.answer || cand.finishReason === "SAFETY") {
    out = { answer: lang === "en" ? "Sorry, I can't help with that. I can answer questions about exams for Egyptian students abroad and consular services." : "معلش، مقدرش أساعد في ده. أقدر أجاوبك عن امتحانات الطلاب المصريين بالخارج والخدمات القنصلية.", section: "none", link: "" };
  }
  const allowed = content.kb + JSON.stringify(content.news || {});
  const link = String(out.link || "").trim();
  if (!/^https:\/\/[^\s"'<>]+$/.test(link) || !allowed.includes(link)) out.link = "";
  if (!SECTIONS.includes(out.section)) out.section = "none";
  return json({ answer: String(out.answer).slice(0, 2500), section: out.section, link: out.link, remaining: Math.max(0, ASK_DAILY_PER_USER - uc - 1) });
}

async function handleReport(env, user, d) {
  const rk = `rl:${user.uid}:${dayKey()}`;
  const n = await getCount(env, rk);
  if (n >= 10) return fail("too-many-reports", 429);
  const report = {
    type: "ai",
    reporter: user.uid,
    reporterName: user.name,
    question: String(d.question || "").slice(0, 600),
    answer: String(d.answer || "").slice(0, 2500),
    reason: String(d.reason || "").slice(0, 40),
    createdAt: new Date().toISOString()
  };
  await Promise.all([
    env.USAGE.put(`report:${report.createdAt}:${user.uid.slice(0, 8)}`, JSON.stringify(report, null, 2), { expirationTtl: 90 * 86400 }),
    env.USAGE.put(rk, String(n + 1), { expirationTtl: TTL })
  ]);
  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
    const url = new URL(request.url);
    if (request.method === "GET") {
      const ready = !!(env.GEMINI_API_KEY && env.FIREBASE_PROJECT_ID && env.USAGE);
      return json({ service: "dalil-assistant", ready, missing: [!env.GEMINI_API_KEY && "GEMINI_API_KEY", !env.FIREBASE_PROJECT_ID && "FIREBASE_PROJECT_ID", !env.USAGE && "USAGE"].filter(Boolean) });
    }
    if (request.method !== "POST") return fail("method", 405);
    if (!env.GEMINI_API_KEY || !env.FIREBASE_PROJECT_ID || !env.USAGE) return fail("assistant-not-configured", 503);

    let user;
    try {
      const auth = request.headers.get("Authorization") || "";
      user = await verifyIdToken(auth.replace(/^Bearer\s+/i, ""), String(env.FIREBASE_PROJECT_ID).trim());
    } catch (e) { return fail("sign-in-required", 401); }

    let d = {};
    try { d = await request.json(); } catch (e) { return fail("bad-json", 400); }
    try {
      if (url.pathname === "/ask") return await handleAsk(env, user, d);
      if (url.pathname === "/report") return await handleReport(env, user, d);
      return fail("not-found", 404);
    } catch (e) {
      console.log("error", e && e.message);
      return fail("assistant-error", 500);
    }
  }
};
