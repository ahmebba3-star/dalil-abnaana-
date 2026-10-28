/* =====================================================================
   المساعد الذكي — AI assistant chat
   Questions go to the assistant Worker on Cloudflare (Gemini, grounded on the
   app's own content). The conversation is kept only on this phone.
   ===================================================================== */
window.DalilAssistant = function (ctx) {
  "use strict";
  const { icon, esc, toast, openSheet, closeSheet, state, store, account, go } = ctx;

  const S = {
    ar: {
      entryTitle: "عندك سؤال؟ اسأل المساعد",
      entryBody: "اكتب سؤالك عن الامتحانات أو الجواز أو أي خدمة قنصلية، ويرد عليك بالخطوات.",
      entryShort: "عندك سؤال تاني؟ اسأل المساعد",
      hello: "أهلًا! أنا مساعد دليل أبنائنا بالخارج",
      helloBody: "اسألني عن امتحانات أبناؤنا في الخارج، أو الجواز، أو التوكيلات، أو أي خدمة في السفارة، وأنا أقولك تعمل إيه خطوة بخطوة.",
      try: "جرّب تسأل",
      sugg: ["إزاي أسجّل ابني في امتحانات أبناؤنا في الخارج؟", "إيه المستندات المطلوبة للتسجيل؟", "جوازي هيخلص، أجدده إزاي؟", "إمتى امتحانات الترم الأول؟"],
      note: "الردود آلية وممكن تغلط، والمرجع النهائي هو الجهة الرسمية. متكتبش بيانات شخصية زي رقم الجواز أو الرقم القومي.",
      placeholder: "اكتب سؤالك هنا…",
      send: "ابعت",
      newChat: "محادثة جديدة",
      needSignIn: "عشان تستخدم المساعد، سجّل الدخول بحساب جوجل. ده بيساعدنا نحمي الخدمة من الإساءة.",
      signIn: "سجّل الدخول بحساب جوجل",
      signingIn: "جاري تسجيل الدخول…",
      soon: "المساعد الذكي هيشتغل قريبًا في التحديث الجاي.",
      thinking: "بيكتب…",
      open: { exams: "افتح صفحة الامتحانات", consular: "افتح الخدمات القنصلية", family: "افتح صفحة أهلي", news: "افتح الأخبار", tools: "افتح الأدوات" },
      officialLink: "افتح الرابط الرسمي",
      remaining: (n) => n === 0 ? "خلصت أسئلة النهارده" : `فاضلك ${n} ${n <= 10 && n >= 3 ? "أسئلة" : "سؤال"} النهارده`,
      report: "إبلاغ عن الرد",
      reportTitle: "إبلاغ عن رد المساعد",
      reportHint: "إيه المشكلة في الرد ده؟",
      reasons: { wrong: "معلومة غلط أو مش دقيقة", offensive: "كلام مسيء أو غير لائق", unhelpful: "مش مفيد أو مش فاهم سؤالي", other: "سبب تاني" },
      sendReport: "ابعت البلاغ",
      reported: "وصل البلاغ، شكرًا",
      cancel: "إلغاء",
      errLimit: "خلصت الـ 20 سؤال بتوع النهارده. ارجع بكرة وهتلاقيهم اتجددوا.",
      errBusy: "المساعد عليه ضغط دلوقتي. جرب تاني بعد دقيقة.",
      errNet: "الرسالة موصلتش. اتأكد من الإنترنت وجرب تاني.",
      errConfig: "المساعد لسه مش متفعّل. جرب بعدين.",
      errSignIn: "محتاج تسجّل الدخول تاني. اقفل التطبيق وافتحه وجرب.",
      errGeneric: "حصلت مشكلة. جرب تاني بعد شوية.",
      retry: "جرب تاني",
      demo: "معاينة تجريبية: الردود هنا أمثلة ثابتة."
    },
    en: {
      entryTitle: "Got a question? Ask the assistant",
      entryBody: "Ask about exams, passports or any consular service and get the steps.",
      entryShort: "Another question? Ask the assistant",
      hello: "Hi! I'm the Our Children Abroad assistant",
      helloBody: "Ask me about the Our Children Abroad exams, passports, powers of attorney or any embassy service, and I'll tell you what to do step by step.",
      try: "Try asking",
      sugg: ["How do I register my child for the exams?", "What documents do I need to register?", "My passport is expiring. How do I renew it?", "When are the first-term exams?"],
      note: "Answers are automated and can be wrong; the official body is always the final reference. Don't type personal details like passport or ID numbers.",
      placeholder: "Type your question…",
      send: "Send",
      newChat: "New chat",
      needSignIn: "Sign in with Google to use the assistant. This helps us protect the service from abuse.",
      signIn: "Sign in with Google",
      signingIn: "Signing in…",
      soon: "The AI assistant is coming in the next update.",
      thinking: "Typing…",
      open: { exams: "Open Exams", consular: "Open Consular services", family: "Open Family", news: "Open News", tools: "Open Tools" },
      officialLink: "Open the official link",
      remaining: (n) => n === 0 ? "No questions left today" : `${n} question${n === 1 ? "" : "s"} left today`,
      report: "Report answer",
      reportTitle: "Report the assistant's answer",
      reportHint: "What's wrong with this answer?",
      reasons: { wrong: "Wrong or inaccurate information", offensive: "Offensive or inappropriate", unhelpful: "Not helpful or misunderstood me", other: "Something else" },
      sendReport: "Send report",
      reported: "Report sent. Thank you",
      cancel: "Cancel",
      errLimit: "You've used today's 20 questions. They reset tomorrow.",
      errBusy: "The assistant is busy right now. Try again in a minute.",
      errNet: "Your message didn't go through. Check your connection and try again.",
      errConfig: "The assistant isn't switched on yet. Try later.",
      errSignIn: "Please sign in again. Close and reopen the app, then try.",
      errGeneric: "Something went wrong. Try again shortly.",
      retry: "Try again",
      demo: "Demo preview: answers here are fixed examples."
    }
  };
  const s = (k) => { const v = (S[state.lang] || S.ar)[k]; return v !== undefined && v !== null ? v : S.ar[k]; };

  const WORKER = String(window.APP_CONFIG.ASSISTANT_URL || "").replace(/\/+$/, "");
  const enabled = !!(account && account.available && (account.demo || (WORKER && WORKER.indexOf("__") !== 0)));

  // Calls the Worker with the user's Google sign-in token (demo preview answers locally).
  async function api(path, body) {
    if (account.demo) return account.fn(path === "/ask" ? "askAssistant" : "reportAnswer", body);
    const tok = await account.idToken();
    const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    const timer = setTimeout(() => { if (ctrl) ctrl.abort(); }, 45000);
    let res;
    try {
      res = await fetch(WORKER + path, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + tok },
        body: JSON.stringify(body),
        signal: ctrl ? ctrl.signal : undefined
      });
    } catch (e) { throw new Error("network"); }
    finally { clearTimeout(timer); }
    let data = {};
    try { data = await res.json(); } catch (e) { data = {}; }
    if (!res.ok) throw new Error(data.error || ("http-" + res.status));
    return data;
  }
  let msgs = [];        // { role: "user"|"assistant"|"error", text, section, link, remaining, q }
  let sending = false;
  let loadedFor = null;
  let draft = "";

  const key = () => "chat:" + ((account && account.user() && account.user().uid) || "anon");
  function load() {
    const u = account && account.user();
    const id = u ? u.uid : null;
    if (loadedFor === id) return;
    loadedFor = id;
    msgs = id ? store.get(key(), []) : [];
  }
  const save = () => store.set(key(), msgs.filter((m) => m.role !== "error").slice(-40));

  /* ---------- light formatting: numbered and bulleted lines ---------- */
  function format(text) {
    const lines = esc(text).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").split(/\n+/);
    let html = "", list = null;
    const close = () => { if (list) { html += `</${list}>`; list = null; } };
    for (const raw of lines) {
      const line = raw.trim(); if (!line) continue;
      const ol = line.match(/^(\d+)[.)\-–]\s+(.*)$/);
      const ul = line.match(/^[-•*]\s+(.*)$/);
      if (ol) { if (list !== "ol") { close(); html += "<ol>"; list = "ol"; } html += `<li>${ol[2]}</li>`; }
      else if (ul) { if (list !== "ul") { close(); html += "<ul>"; list = "ul"; } html += `<li>${ul[1]}</li>`; }
      else { close(); html += `<p>${line}</p>`; }
    }
    close();
    return html;
  }

  /* ---------- views ---------- */
  function entryCard() {
    if (!enabled) return "";
    return `<button class="ask-card" data-ai="open">
      <span class="ask-mark">${icon("chat")}</span>
      <span class="grow"><b>${s("entryTitle")}</b><small>${s("entryBody")}</small></span>
      <span class="end">${icon("chev", "flip")}</span>
    </button>`;
  }
  function entryRow() {
    if (!enabled) return "";
    return `<button class="ask-row" data-ai="open">${icon("chat")}<span>${s("entryShort")}</span></button>`;
  }

  function bubble(m, i) {
    if (m.role === "user") return `<div class="msg me"><div class="bub">${esc(m.text)}</div></div>`;
    if (m.role === "error") return `<div class="msg sys"><div class="bub">${esc(m.text)}${m.q ? ` <button class="link-btn" data-ai="retry" data-i="${i}">${s("retry")}</button>` : ""}</div></div>`;
    const acts = [];
    if (m.section && m.section !== "none" && s("open")[m.section]) acts.push(`<button class="chip-act" data-ai="go" data-sec="${esc(m.section)}">${s("open")[m.section]}</button>`);
    if (m.link) acts.push(`<a class="chip-act" href="${esc(m.link)}" data-ext="${esc(m.link)}">${icon("ext")}${s("officialLink")}</a>`);
    return `<div class="msg bot"><span class="bot-mark" aria-hidden="true">${icon("chat")}</span><div class="bub">
      ${format(m.text)}
      ${acts.length ? `<div class="acts">${acts.join("")}</div>` : ""}
      <div class="bub-foot">${m.remaining != null ? `<span>${esc(s("remaining")(m.remaining))}</span>` : "<span></span>"}<button class="link-btn" data-ai="report" data-i="${i}">${icon("flag")}${s("report")}</button></div>
    </div></div>`;
  }

  function view() {
    if (!enabled) return `<h2 class="page-title">${s("entryTitle")}</h2><div class="card">${s("soon")}</div>`;
    load();
    const u = account.user();
    const demo = account.demo ? `<div class="notice">${s("demo")}</div>` : "";
    if (!account.ready()) return `<div class="chat">${demo}<div class="card small">…</div></div>`;
    if (!u) {
      const busy = account.busy();
      return `<div class="chat">${demo}
        <div class="chat-hello"><span class="hello-mark">${icon("chat")}</span><h2>${s("hello")}</h2><p>${s("helloBody")}</p></div>
        <div class="card">${s("needSignIn")}</div>
        <button class="btn block google" data-ai="signin" style="margin-top:12px" ${busy ? "disabled" : ""}>${busy ? s("signingIn") : account.googleMark() + s("signIn")}</button>
      </div>`;
    }
    const empty = !msgs.length;
    return `<div class="chat">
      ${demo}
      ${empty ? `<div class="chat-hello"><span class="hello-mark">${icon("chat")}</span><h2>${s("hello")}</h2><p>${s("helloBody")}</p></div>
        <p class="sugg-label">${s("try")}</p>
        <div class="sugg">${s("sugg").map((q) => `<button class="sugg-btn" data-ai="ask" data-q="${esc(q)}">${esc(q)}</button>`).join("")}</div>`
      : `<div class="chat-top"><button class="link-btn" data-ai="new">${icon("plus")}${s("newChat")}</button></div>
         <div class="msgs" id="msgs">${msgs.map(bubble).join("")}${sending ? `<div class="msg bot"><span class="bot-mark" aria-hidden="true">${icon("chat")}</span><div class="bub typing" aria-label="${s("thinking")}"><i></i><i></i><i></i></div></div>` : ""}</div>`}
      <p class="chat-note">${s("note")}</p>
    </div>
    <form class="composer" id="composer" autocomplete="off">
      <textarea id="askInput" rows="1" maxlength="600" placeholder="${s("placeholder")}" aria-label="${s("placeholder")}">${esc(draft)}</textarea>
      <button class="send" type="submit" aria-label="${s("send")}" ${sending ? "disabled" : ""}>${icon("send", "flip-ar")}</button>
    </form>`;
  }

  function mount(root) {
    const form = root.querySelector("#composer");
    const list = root.querySelector("#msgs");
    if (list) { const main = document.getElementById("view"); main.scrollTop = main.scrollHeight; }
    if (!form) return;
    const ta = form.querySelector("#askInput");
    const grow = () => { ta.style.height = "auto"; ta.style.height = Math.min(ta.scrollHeight, 140) + "px"; };
    grow();
    ta.addEventListener("input", () => { draft = ta.value; grow(); });
    ta.addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey && !e.isComposing && window.matchMedia("(pointer:fine)").matches) { e.preventDefault(); ask(ta.value); } });
    form.addEventListener("submit", (e) => { e.preventDefault(); ask(ta.value); });
  }

  /* ---------- actions ---------- */
  function errText(e) {
    const m = String((e && (e.message || e.code)) || e || "");
    if (/daily-limit/.test(m)) return s("errLimit");
    if (/busy/.test(m)) return s("errBusy");
    if (/sign-in-required/.test(m)) return s("errSignIn");
    if (/not-configured/.test(m)) return s("errConfig");
    if (/network|unavailable|UNAVAILABLE|offline|Failed to fetch/i.test(m)) return s("errNet");
    return s("errGeneric");
  }

  async function ask(text) {
    const q = String(text || "").trim();
    if (!q || sending) return;
    msgs = msgs.filter((m) => m.role !== "error");
    const history = msgs.slice(-6).map((m) => ({ role: m.role, text: m.text }));
    msgs.push({ role: "user", text: q.slice(0, 600) });
    draft = ""; sending = true; save(); ctx.rerender();
    try {
      const r = await api("/ask", { message: q, history, country: state.country, lang: state.lang });
      msgs.push({ role: "assistant", text: r.answer || "", section: r.section || "none", link: r.link || "", remaining: r.remaining, q });
    } catch (e) {
      msgs.pop();
      msgs.push({ role: "user", text: q }, { role: "error", text: errText(e), q: /daily-limit/.test(String(e && e.message)) ? "" : q });
    }
    sending = false; save(); ctx.rerender();
  }

  function reportSheet(m) {
    const R = s("reasons");
    openSheet(`<h3>${s("reportTitle")}</h3><p class="lead" style="margin:0 0 10px">${s("reportHint")}</p>
      <div class="panel" role="radiogroup">${Object.keys(R).map((k, i) => `<label class="row radio"><input type="radio" name="ar" value="${k}" ${i === 0 ? "checked" : ""}><span class="grow">${R[k]}</span></label>`).join("")}</div>
      <div class="sheet-actions"><button class="btn ghost" data-close>${s("cancel")}</button><button class="btn danger" id="arSend">${s("sendReport")}</button></div>`,
      (root) => root.querySelector("#arSend").addEventListener("click", async (e) => {
        const b = e.currentTarget; b.disabled = true;
        try {
          await api("/report", { question: m.q || "", answer: m.text, reason: root.querySelector("input[name=ar]:checked").value });
          closeSheet(); toast(s("reported"));
        } catch (er) { b.disabled = false; toast(errText(er)); }
      }));
  }

  function onClick(e) {
    const el = e.target.closest("[data-ai]"); if (!el) return false;
    const a = el.dataset.ai;
    if (a === "open") ctx.open();
    else if (a === "signin") account.signIn().then(() => ctx.rerender());
    else if (a === "ask") ask(el.dataset.q);
    else if (a === "retry") { const m = msgs[+el.dataset.i]; if (m && m.q) { msgs = msgs.filter((x) => x !== m); msgs.pop(); ask(m.q); } }
    else if (a === "new") { msgs = []; save(); ctx.rerender(); }
    else if (a === "go") go(el.dataset.sec);
    else if (a === "report") { const m = msgs[+el.dataset.i]; if (m) reportSheet(m); }
    else return false;
    return true;
  }

  account && account.onChange(() => { if (state.sub === "assistant") ctx.rerender(); });

  return { view, mount, onClick, entryCard, entryRow, enabled };
};
