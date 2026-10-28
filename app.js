(function () {
  "use strict";

  /* ================= Icons ================= */
  const I = {
    home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    exams: '<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19v15H5.5A1.5 1.5 0 0 0 4 19.5z"/><path d="M4 19.5A1.5 1.5 0 0 0 5.5 21H19v-3"/><path d="M8 7h7M8 11h5"/>',
    consular: '<path d="M3 21h18M5 21V10M19 21V10M9 21v-7h6v7M2 10l10-6 10 6z"/>',
    news: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h10M7 16h6"/>',
    tools: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    back: '<path d="M9 6l6 6-6 6"/>',
    chev: '<path d="M15 6l-6 6 6 6"/>',
    ext: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    plane: '<path d="M2.5 13.5 21 6l-4.5 14-4-6.5z"/><path d="M12.5 13.5 21 6"/>',
    phone: '<path d="M5 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 12l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8M10.3 20a1.9 1.9 0 0 0 3.4 0"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    key: '<circle cx="7.5" cy="15.5" r="4.5"/><path d="M10.7 12.3 20 3M16 7l3 3M14 9l2 2"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    swap: '<path d="M7 7h13l-4-4M17 17H4l4 4"/>',
    passport: '<rect x="5" y="2.5" width="14" height="19" rx="2"/><circle cx="12" cy="10" r="3.5"/><path d="M9 17h6"/>',
    baby: '<circle cx="12" cy="8" r="4"/><path d="M10.5 8h.01M13.5 8h.01M6 21v-2a6 6 0 0 1 12 0v2"/>',
    pen: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
    stamp: '<path d="M9 13V9a3 3 0 1 1 6 0v4"/><path d="M5 13h14v4H5zM6 21h12"/>',
    card: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><circle cx="8.5" cy="12" r="2.5"/><path d="M14 10h4M14 14h4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
    coin: '<circle cx="12" cy="12" r="9"/><path d="M15 9.5c-.5-1-1.6-1.5-3-1.5-1.7 0-3 .9-3 2s1.3 1.8 3 2 3 .9 3 2-1.3 2-3 2c-1.4 0-2.5-.5-3-1.5M12 6v2M12 16v2"/>',
    alert: '<path d="M12 3 2 20h20zM12 9v5M12 17h.01"/>',
    chat: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 13.5z"/><path d="M8.5 8.5h7M8.5 11.5h4.5"/>',
    send: '<path d="M4 12h12M11 6l6 6-6 6"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',
    share: '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
    logout: '<path d="M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4M10 16l-4-4 4-4M6 12h10"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/>',
    dots: '<circle cx="12" cy="5" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.6" fill="currentColor" stroke="none"/>',
    block: '<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>',
    flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
    phoneDown: '<path d="M3 15.5c5.3-5 12.7-5 18 0l-2.5 2.6-3.6-1.6v-2.7a10 10 0 0 0-5.8 0v2.7l-3.6 1.6z"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    micOff: '<path d="M15 10V6a3 3 0 0 0-5.7-1.3M9 9v2a3 3 0 0 0 4.6 2.5M5 11a7 7 0 0 0 11.2 5.6M19 11a7 7 0 0 1-.5 2.6M12 18v3M3 3l18 18"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>'
  };
  const icon = (n, cls) => `<svg ${cls ? `class="${cls}"` : ""} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n] || ""}</svg>`;

  /* ================= Storage ================= */
  const store = {
    get(k, d) { try { const v = localStorage.getItem("dalil:" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("dalil:" + k, JSON.stringify(v)); } catch (e) { /* ignore */ } }
  };

  const state = {
    lang: store.get("lang", (navigator.language || "ar").startsWith("ar") ? "ar" : "en"),
    country: store.get("country", null),
    children: store.get("children", []),
    reminders: store.get("reminders", false),
    tab: "home",
    sub: null,
    newsCat: "all",
    data: null,
    offline: false,
    loc: null
  };

  const cap = window.Capacitor;
  const isNative = !!(cap && cap.isNativePlatform && cap.isNativePlatform());
  const P = (name) => (cap && cap.Plugins && cap.Plugins[name]) || null;

  const t = (k) => (STRINGS[state.lang] && STRINGS[state.lang][k]) || STRINGS.ar[k] || k;
  const L = (o, base) => o[base + "_" + state.lang] || o[base + "_ar"] || "";
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const locale = () => (state.lang === "ar" ? "ar-EG-u-nu-latn" : "en-GB");
  const fmtNum = (n, d = 0) => new Intl.NumberFormat(locale(), { maximumFractionDigits: d, minimumFractionDigits: 0 }).format(n);
  const country = () => COUNTRIES.find((c) => c.code === state.country) || COUNTRIES[COUNTRIES.length - 1];

  const TZ = { SA: "Asia/Riyadh", AE: "Asia/Dubai", KW: "Asia/Kuwait", QA: "Asia/Qatar", BH: "Asia/Bahrain", OM: "Asia/Muscat", JO: "Asia/Amman", LB: "Asia/Beirut", LY: "Africa/Tripoli", IT: "Europe/Rome", FR: "Europe/Paris", DE: "Europe/Berlin", NL: "Europe/Amsterdam", GR: "Europe/Athens", GB: "Europe/London", US: "America/New_York", CA: "America/Toronto", AU: "Australia/Sydney" };
  const deviceTZ = () => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (e) { return "UTC"; } };
  const countryTZ = () => (state.loc ? deviceTZ() : TZ[state.country] || deviceTZ());

  function fmtDate(iso, opts) {
    const d = new Date(iso + (iso.length <= 10 ? "T12:00:00" : ""));
    if (isNaN(d)) return iso;
    return new Intl.DateTimeFormat(locale(), opts || { day: "numeric", month: "long", year: "numeric" }).format(d);
  }
  function fmtTime(d, tz) {
    try { return new Intl.DateTimeFormat(locale(), { hour: "numeric", minute: "2-digit", timeZone: tz }).format(d); }
    catch (e) { return new Intl.DateTimeFormat(locale(), { hour: "numeric", minute: "2-digit" }).format(d); }
  }
  function tzOffsetMin(tz, date) {
    try {
      const parts = new Intl.DateTimeFormat("en-US", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }).formatToParts(date);
      const g = (ty) => +parts.find((p) => p.type === ty).value;
      const asUTC = Date.UTC(g("year"), g("month") - 1, g("day"), g("hour") % 24, g("minute"), g("second"));
      return Math.round((asUTC - date.getTime()) / 60000);
    } catch (e) { return 0; }
  }

  /* ================= External links ================= */
  function openExternal(url) {
    if (!url) return;
    if (isNative) { window.location.href = url; }
    else { window.open(url, "_blank", "noopener"); }
  }
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-ext]");
    if (a && isNative) { e.preventDefault(); openExternal(a.getAttribute("data-ext")); }
  });
  function fixLinks(root) {
    root.querySelectorAll("a[data-ext]").forEach((a) => {
      const u = a.getAttribute("data-ext");
      a.setAttribute("href", u);
      if (!u.startsWith("tel:")) { a.setAttribute("target", "_blank"); a.setAttribute("rel", "noopener"); }
    });
  }
  const mapUrl = (q) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);

  /* ================= Toast & sheet ================= */
  let toastTimer;
  function toast(msg) {
    const el = document.getElementById("toast");
    el.textContent = msg; el.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("show"), 2800);
  }
  const sheet = document.getElementById("sheet");
  function openSheet(html, onMount) {
    document.getElementById("sheetBody").innerHTML = '<div class="grab"></div>' + html;
    sheet.hidden = false;
    fixLinks(document.getElementById("sheetBody"));
    if (onMount) onMount(document.getElementById("sheetBody"));
    const f = sheet.querySelector("input, button:not([data-close])"); if (f) f.focus({ preventScroll: true });
  }
  function closeSheet() { sheet.hidden = true; document.getElementById("sheetBody").innerHTML = ""; }
  sheet.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeSheet(); });

  /* ================= Data loading ================= */
  async function loadData() {
    let bundled = null;
    try { bundled = await (await fetch("news.json", { cache: "no-store" })).json(); } catch (e) { bundled = window.__NEWS__ || null; }
    const cached = store.get("newsCache", null);
    state.data = newer(cached, bundled) || bundled || { exams: [], news: [] };
    const url = APP_CONFIG.NEWS_URL;
    if (url && !url.startsWith("__")) {
      try {
        const ctrl = new AbortController(); const to = setTimeout(() => ctrl.abort(), 8000);
        const res = await fetch(url + (url.includes("?") ? "&" : "?") + "t=" + Date.now(), { signal: ctrl.signal, cache: "no-store" });
        clearTimeout(to);
        if (!res.ok) throw new Error("bad");
        const live = await res.json();
        if (!live || !Array.isArray(live.news)) throw new Error("shape");
        state.data = live; state.offline = false; store.set("newsCache", live);
      } catch (e) { state.offline = true; }
    }
    render();
    scheduleReminders();
  }
  function newer(a, b) { if (!a) return null; if (!b) return a; return (a.updated || "") >= (b.updated || "") ? a : null; }

  /* ================= Exams helpers ================= */
  function nextExam() {
    const ex = (state.data && state.data.exams) || [];
    const now = Date.now();
    const confirmed = ex.filter((e) => e.confirmed && e.date).map((e) => ({ ...e, ts: new Date(e.date + "T08:00:00").getTime() }))
      .filter((e) => e.ts + 10 * 864e5 > now).sort((a, b) => a.ts - b.ts);
    if (confirmed.length) return confirmed[0];
    return ex.find((e) => !e.confirmed) || null;
  }

  function ticketHTML() {
    const c = country();
    const ex = nextExam();
    const from = state.lang === "ar" ? (c.city_ar || c.ar) : (c.city_en || c.en);
    const route = `<span class="route">${esc(from)} ${icon("plane", "flip")} ${state.lang === "ar" ? "القاهرة" : "Cairo"}</span>`;
    let main;
    if (!ex) {
      main = `<div class="ticket-pending"><strong>${t("notAnnounced")}</strong></div>`;
    } else if (ex.confirmed && ex.date) {
      const diff = ex.ts - Date.now();
      if (diff <= 0) {
        main = `<p class="ticket-title">${esc(L(ex, "title"))}</p><div class="ticket-pending"><strong>${t("examStarted")}</strong>${esc(fmtDate(ex.date))}</div>`;
      } else {
        const d = Math.floor(diff / 864e5), h = Math.floor((diff % 864e5) / 36e5), m = Math.floor((diff % 36e5) / 6e4);
        main = `<p class="ticket-title">${esc(L(ex, "title"))}</p>
          <div class="countdown" aria-label="${esc(fmtDate(ex.date))}">
            <div class="cell"><span class="num" data-cd="d">${fmtNum(d)}</span><span class="unit">${t("days")}</span></div>
            <div class="cell"><span class="num" data-cd="h">${fmtNum(h)}</span><span class="unit">${t("hours")}</span></div>
            <div class="cell"><span class="num" data-cd="m">${fmtNum(m)}</span><span class="unit">${t("minutes")}</span></div>
          </div>
          <p class="small" style="color:rgba(255,255,255,.75);margin:10px 0 0">${t("expected")}: ${esc(fmtDate(ex.date, { weekday: "long", day: "numeric", month: "long", year: "numeric" }))}</p>`;
      }
    } else {
      main = `<p class="ticket-title">${esc(L(ex, "title"))}</p><div class="ticket-pending"><strong>${t("notAnnounced")}</strong>${esc(L(ex, "expected"))}</div>`;
    }
    return `<section class="ticket" aria-label="${t("nextExam")}">
      <div class="ticket-top">${route}<span class="label">${t("nextExam")}</span></div>
      <div class="ticket-perf"></div>
      <div class="ticket-main">${main}
        <div class="ticket-actions">
          <button class="btn light" data-act="remind">${icon("bell")}${t("remind")}</button>
          <a class="btn light" href="#" data-ext="${OFFICIAL_LINKS.sabroad}">${icon("ext")}${t("openPlatform")}</a>
        </div>
      </div>
    </section>`;
  }

  /* ================= Reminders ================= */
  async function scheduleReminders() {
    const LN = P("LocalNotifications");
    if (!LN || !state.reminders || !state.data) return;
    try {
      const pending = await LN.getPending();
      if (pending.notifications.length) await LN.cancel({ notifications: pending.notifications.map((n) => ({ id: n.id })) });
      const list = [];
      let id = 100;
      (state.data.exams || []).filter((e) => e.confirmed && e.date).forEach((e) => {
        const base = new Date(e.date + "T09:00:00").getTime();
        [[7, state.lang === "ar" ? "باقي أسبوع على" : "One week until"], [1, state.lang === "ar" ? "بكرة" : "Tomorrow:"]].forEach(([days, pre]) => {
          const at = new Date(base - days * 864e5);
          if (at.getTime() > Date.now()) list.push({ id: id++, title: t("appName"), body: `${pre} ${L(e, "title")}`, schedule: { at } });
        });
      });
      if (list.length) await LN.schedule({ notifications: list });
    } catch (e) { /* ignore */ }
  }
  async function enableReminders() {
    const LN = P("LocalNotifications");
    if (LN) {
      try {
        const p = await LN.requestPermissions();
        if (p.display !== "granted") return false;
      } catch (e) { return false; }
    }
    state.reminders = true; store.set("reminders", true);
    await scheduleReminders();
    return true;
  }
  async function onRemind() {
    const ok = await enableReminders();
    if (!ok) return;
    const hasDate = ((state.data && state.data.exams) || []).some((e) => e.confirmed && e.date);
    toast(hasDate ? t("reminderSet") : t("reminderNeedsDate"));
  }

  /* ================= Views ================= */
  function viewHome() {
    const c = country();
    const news = ((state.data && state.data.news) || []).slice(0, 3);
    return `
      ${ticketHTML()}
      ${Assistant ? Assistant.entryCard() : ""}
      <h2 class="sec">${t("quick")}</h2>
      <div class="tiles">
        <a class="tile" href="#" data-ext="${OFFICIAL_LINKS.sabroad}"><span class="ic">${icon("globe")}</span><b>${t("qPlatform")}</b><small>${t("qPlatformSub")}</small></a>
        <a class="tile" href="#" data-ext="${OFFICIAL_LINKS.sabroadLogin}"><span class="ic">${icon("key")}</span><b>${t("qLogin")}</b><small>${t("qLoginSub")}</small></a>
        <button class="tile" data-go="consular"><span class="ic">${icon("consular")}</span><b>${t("qEmbassy")}</b><small>${esc(state.lang === "ar" ? c.ar : c.en)}</small></button>
        <button class="tile" data-go="tools"><span class="ic">${icon("phone")}</span><b>${t("qEmergency")}</b><small>${c.emergency.length ? esc(c.emergency.map((x) => x[0]).slice(0, 3).join(" / ")) : esc(state.lang === "ar" ? c.ar : c.en)}</small></button>
      </div>
      <h2 class="sec">${t("myChildren")}<button data-act="addChild">${t("addChild")}</button></h2>
      ${childrenHTML()}
      <h2 class="sec">${t("latestNews")}<button data-go="news">${t("seeAll")}</button></h2>
      ${news.map(newsCard).join("")}
    `;
  }

  function childrenHTML() {
    if (!state.children.length) return `<div class="panel"><div class="empty">${t("noChildren")}<button class="btn ghost" data-act="addChild">${icon("plus")}${t("addChild")}</button></div></div>`;
    return `<div class="panel">${state.children.map((ch, i) => {
      const g = GRADES.find((x) => x[0] === ch.grade);
      return `<div class="child"><span class="avatar">${esc((ch.name || "?").trim().charAt(0))}</span>
        <div class="grow" style="flex:1"><b>${esc(ch.name)}</b><span class="small" style="display:block">${g ? esc(state.lang === "ar" ? g[1] : g[2]) : ""}</span></div>
        <button class="icon-btn" style="color:var(--muted)" data-act="delChild" data-i="${i}" aria-label="${t("remove")}">${icon("x")}</button></div>`;
    }).join("")}</div>`;
  }

  function addChildSheet() {
    openSheet(`<h3>${t("addChild")}</h3>
      <div class="field"><label for="chName">${t("childName")}</label><input id="chName" class="input" maxlength="40" autocomplete="off"></div>
      <div class="field"><label for="chGrade">${t("childGrade")}</label><select id="chGrade" class="input">${GRADES.map((g) => `<option value="${g[0]}">${esc(state.lang === "ar" ? g[1] : g[2])}</option>`).join("")}</select></div>
      <div class="sheet-actions"><button class="btn ghost" data-close>${t("cancel")}</button><button class="btn" id="chSave">${t("save")}</button></div>`,
      (root) => {
        root.querySelector("#chSave").addEventListener("click", () => {
          const name = root.querySelector("#chName").value.trim();
          if (!name) { root.querySelector("#chName").focus(); return; }
          state.children.push({ name, grade: root.querySelector("#chGrade").value });
          store.set("children", state.children); closeSheet(); render();
        });
      });
  }

  function viewExams() {
    const ex = (state.data && state.data.exams) || [];
    const steps = REG_STEPS[state.lang] || REG_STEPS.ar;
    const docs = REG_DOCS[state.lang] || REG_DOCS.ar;
    return `
      <h2 class="page-title">${t("examsTitle")}</h2>
      <p class="lead">${t("examsIntro")}</p>
      <h2 class="sec">${t("schedule")}</h2>
      <div class="panel">${ex.map((e) => {
        const d = e.confirmed && e.date ? new Date(e.date + "T12:00:00") : null;
        const box = d ? `<div class="exam-date"><b>${fmtNum(d.getDate())}</b><small>${esc(new Intl.DateTimeFormat(locale(), { month: "short", year: "numeric" }).format(d))}</small></div>`
          : `<div class="exam-date tbd"><b>؟</b><small>${state.lang === "ar" ? "قريبًا" : "Soon"}</small></div>`;
        return `<div class="exam-row">${box}<div><b>${esc(L(e, "title"))}</b><span class="small" style="display:block">${d ? esc(fmtDate(e.date, { weekday: "long", day: "numeric", month: "long" })) : esc(L(e, "expected"))}</span></div></div>`;
      }).join("") || `<div class="empty">${t("notAnnounced")}</div>`}</div>
      <div style="margin-top:10px"><button class="btn ghost block" data-act="remind">${icon("bell")}${t("remind")}</button></div>

      <h2 class="sec">${t("howToRegister")}</h2>
      <ol class="steps">${steps.map((s) => `<li><b>${esc(s[0])}</b><span>${esc(s[1])}</span></li>`).join("")}</ol>
      <a class="btn block" href="#" data-ext="${OFFICIAL_LINKS.sabroad}">${icon("ext")}${t("openPlatform")}</a>

      <h2 class="sec">${t("documents")}</h2>
      <div class="panel"><ul class="bullets">${docs.map((d) => `<li>${esc(d)}</li>`).join("")}</ul></div>

      <h2 class="sec">${t("fees")}</h2>
      <div class="card">${t("feesBody")}</div>

      <h2 class="sec">${t("tips")}</h2>
      <div class="panel">
        ${["tip1", "tip2", "tip3"].map((k) => `<div class="row" style="cursor:default"><span class="ic" style="background:var(--gold-soft);color:#8A6413">${icon("alert")}</span><span class="grow">${t(k)}</span></div>`).join("")}
      </div>
      ${Assistant ? Assistant.entryRow() : ""}
    `;
  }

  function viewConsular() {
    const c = country();
    const name = state.lang === "ar" ? c.ar : c.en;
    const city = state.lang === "ar" ? c.city_ar : c.city_en;
    const cons = (state.lang === "ar" ? c.consulates_ar : c.consulates_en) || [];
    const embassyBlock = c.code === "OT" ? "" : `
      <div class="panel">
        <a class="row" href="#" data-ext="${mapUrl("Embassy of Egypt " + c.city_en + " " + c.en)}">
          <span class="ic">${icon("consular")}</span>
          <span class="grow"><span class="t">${t("embassyIn")} ${esc(city)}</span><span class="s">${c.flag} ${esc(name)}</span></span>
          <span class="end">${icon("pin")}</span>
        </a>
        ${(c.consulates_en || []).map((en, i) => `<a class="row" href="#" data-ext="${mapUrl("Consulate of Egypt " + en)}">
          <span class="ic">${icon("pin")}</span><span class="grow"><span class="t">${state.lang === "ar" ? "القنصلية المصرية في" : "Egyptian Consulate in"} ${esc(cons[i])}</span><span class="s">${t("openMap")}</span></span><span class="end">${icon("ext")}</span></a>`).join("")}
      </div>`;
    return `
      <h2 class="page-title">${t("consularTitle")}</h2>
      <p class="lead">${t("consularNote")}</p>
      ${embassyBlock ? `<h2 class="sec">${state.lang === "ar" ? "سفارتك" : "Your embassy"}</h2>${embassyBlock}` : ""}
      <h2 class="sec">${state.lang === "ar" ? "الخدمات" : "Services"}</h2>
      <div class="panel">${CONSULAR.map((s) => {
        const x = s[state.lang] || s.ar;
        return `<button class="row" data-act="service" data-id="${s.id}"><span class="ic">${icon(s.icon)}</span><span class="grow"><span class="t">${esc(x.t)}</span><span class="s">${esc(x.d)}</span></span><span class="end">${icon("chev", "flip")}</span></button>`;
      }).join("")}</div>
      <h2 class="sec">${state.lang === "ar" ? "مواقع رسمية" : "Official websites"}</h2>
      <div class="panel">
        <a class="row" href="#" data-ext="${OFFICIAL_LINKS.mfa}"><span class="ic">${icon("globe")}</span><span class="grow"><span class="t">${t("mfaSite")}</span><span class="s">mfa.gov.eg</span></span><span class="end">${icon("ext")}</span></a>
        <a class="row" href="#" data-ext="${OFFICIAL_LINKS.digital}"><span class="ic">${icon("globe")}</span><span class="grow"><span class="t">${t("digitalSite")}</span><span class="s">digital.gov.eg</span></span><span class="end">${icon("ext")}</span></a>
      </div>
      ${Assistant ? Assistant.entryRow() : ""}
    `;
  }

  function serviceSheet(id) {
    const s = CONSULAR.find((x) => x.id === id); if (!s) return;
    const x = s[state.lang] || s.ar;
    openSheet(`<h3>${esc(x.t)}</h3><p class="lead" style="margin:0 0 10px">${esc(x.d)}</p>
      <b style="font-size:14px">${t("requirements")}</b>
      <ul class="bullets" style="padding-top:8px">${x.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
      <div class="notice">${esc(x.note)}</div>
      <p class="small">${t("consularNote")}</p>
      <div class="sheet-actions"><button class="btn ghost" data-close>${t("close")}</button><a class="btn" href="#" data-ext="${OFFICIAL_LINKS.mfa}">${icon("ext")}${t("mfaShort")}</a></div>`);
  }

  const catLabel = (c) => ({ exams: t("catExams"), consular: t("catConsular"), community: t("catCommunity") }[c] || c);
  function newsCard(n) {
    return `<button class="news-card" data-act="news" data-id="${esc(n.id)}">
      <div class="news-meta"><span class="tag ${esc(n.cat)}">${esc(catLabel(n.cat))}</span><span>${esc(fmtDate(n.date))}</span></div>
      <h3>${esc(L(n, "title"))}</h3></button>`;
  }
  function viewNews() {
    const all = (state.data && state.data.news) || [];
    const list = state.newsCat === "all" ? all : all.filter((n) => n.cat === state.newsCat);
    return `
      <h2 class="page-title">${t("newsTitle")}</h2>
      ${state.offline ? `<div class="notice">${t("offline")}</div>` : ""}
      <div class="chips" role="group">${["all", "exams", "consular", "community"].map((c) => `<button class="chip" data-cat="${c}" aria-pressed="${state.newsCat === c}">${c === "all" ? t("catAll") : catLabel(c)}</button>`).join("")}</div>
      ${list.map(newsCard).join("")}
      ${state.data && state.data.updated ? `<p class="small">${t("updated")}: ${esc(fmtDate(state.data.updated))}</p>` : ""}
    `;
  }
  function newsSheet(id) {
    const n = ((state.data && state.data.news) || []).find((x) => x.id === id); if (!n) return;
    openSheet(`<div class="news-meta"><span class="tag ${esc(n.cat)}">${esc(catLabel(n.cat))}</span><span>${esc(fmtDate(n.date))}</span></div>
      <h3>${esc(L(n, "title"))}</h3>
      <p style="margin:8px 0 12px">${esc(L(n, "body"))}</p>
      ${n.source ? `<p class="small">${t("source")}: ${esc(n.source)}</p>` : ""}
      <div class="sheet-actions"><button class="btn ghost" data-close>${t("close")}</button>${n.url ? `<a class="btn" href="#" data-ext="${esc(n.url)}">${icon("ext")}${t("readSource")}</a>` : ""}</div>`);
  }

  function viewTools() {
    const c = country();
    const cname = state.lang === "ar" ? c.ar : c.en;
    return `
      <h2 class="page-title">${t("toolsTitle")}</h2>

      <h2 class="sec">${t("currency")}</h2>
      <div class="card" id="fx">
        <div class="conv">
          <div class="field" style="margin:0"><label for="fxAmt">${t("amount")} (<span id="fxFrom"></span>)</label><input id="fxAmt" class="input" inputmode="decimal" value="100"></div>
          <button class="swap" id="fxSwap" aria-label="swap">${icon("swap")}</button>
          <div class="field" style="margin:0"><label><span id="fxTo"></span></label><div class="result" id="fxOut">—</div></div>
        </div>
        <p class="small" id="fxNote" style="margin:10px 0 0"></p>
      </div>

      <h2 class="sec">${t("prayer")}<button data-act="myLoc">${t("useMyLocation")}</button></h2>
      <div class="card" id="prayerCard"></div>

      <h2 class="sec">${t("cairoTime")}</h2>
      <div class="card" id="clockCard"></div>

      <h2 class="sec">${t("emergency")} ${esc(cname)}</h2>
      <div class="panel">${c.emergency.length ? c.emergency.map((e) => `<div class="tel"><span class="num">${esc(e[0])}</span><span class="grow">${esc(state.lang === "ar" ? e[1] : e[2])}</span><a class="btn ghost" href="#" data-ext="tel:${esc(e[0])}">${icon("phone")}${t("call")}</a></div>`).join("") : `<div class="empty">${t("noEmergency")}</div>`}</div>
    `;
  }

  /* ---- currency ---- */
  let fxDir = 1; // 1: local -> EGP, -1: EGP -> local
  async function mountFx() {
    const box = document.getElementById("fx"); if (!box) return;
    const cur = country().cur;
    const amt = box.querySelector("#fxAmt");
    const update = (rates, date) => {
      const from = fxDir === 1 ? cur : "EGP", to = fxDir === 1 ? "EGP" : cur;
      box.querySelector("#fxFrom").textContent = from; box.querySelector("#fxTo").textContent = to;
      if (!rates || !rates[cur]) { box.querySelector("#fxOut").textContent = "—"; return; }
      const v = parseFloat(String(amt.value).replace(/[^\d.]/g, "")) || 0;
      const r = rates[cur]; // 1 EGP = r CUR
      const out = fxDir === 1 ? v / r : v * r;
      box.querySelector("#fxOut").textContent = fmtNum(out, 2);
      box.querySelector("#fxNote").textContent = `1 ${cur} = ${fmtNum(1 / r, 2)} EGP · ${t("rateAt")} ${date ? fmtDate(date) : ""}`;
    };
    let cache = store.get("fx", null);
    update(cache && cache.rates, cache && cache.date);
    amt.addEventListener("input", () => update(cache && cache.rates, cache && cache.date));
    box.querySelector("#fxSwap").addEventListener("click", () => { fxDir *= -1; update(cache && cache.rates, cache && cache.date); });
    const fresh = cache && Date.now() - cache.at < 6 * 36e5;
    if (!fresh) {
      try {
        const r = await (await fetch("https://open.er-api.com/v6/latest/EGP")).json();
        if (r && r.result === "success") {
          cache = { rates: r.rates, date: new Date(r.time_last_update_unix * 1000).toISOString().slice(0, 10), at: Date.now() };
          store.set("fx", cache);
        }
      } catch (e) { if (!cache) box.querySelector("#fxNote").textContent = t("rateFail"); }
      if (document.getElementById("fx") === box) update(cache && cache.rates, cache && cache.date);
    }
  }

  /* ---- prayer ---- */
  const METHODS = { UmmAlQura: ["تقويم أم القرى", "Umm al-Qura"], Dubai: ["طريقة دبي", "Dubai"], Kuwait: ["طريقة الكويت", "Kuwait"], Qatar: ["طريقة قطر", "Qatar"], MuslimWorldLeague: ["رابطة العالم الإسلامي", "Muslim World League"], Egyptian: ["الهيئة المصرية العامة للمساحة", "Egyptian General Authority"], MoonsightingCommittee: ["لجنة رؤية الهلال", "Moonsighting Committee"], NorthAmerica: ["الجمعية الإسلامية لأمريكا الشمالية", "ISNA (North America)"] };
  const methodName = (m) => (METHODS[m] ? METHODS[m][state.lang === "ar" ? 0 : 1] : m);
  function mountPrayer() {
    const box = document.getElementById("prayerCard"); if (!box || !window.adhan) return;
    const c = country();
    const lat = state.loc ? state.loc.lat : c.lat, lng = state.loc ? state.loc.lng : c.lng;
    const tz = countryTZ();
    try {
      const m = adhan.CalculationMethod[c.method] ? adhan.CalculationMethod[c.method]() : adhan.CalculationMethod.MuslimWorldLeague();
      const pt = new adhan.PrayerTimes(new adhan.Coordinates(lat, lng), new Date(), m);
      const next = pt.nextPrayer();
      const names = ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"];
      const place = state.loc ? t("currentLoc") : (state.lang === "ar" ? c.city_ar || c.ar : c.city_en || c.en);
      box.innerHTML = `<b>${esc(place)}</b> <span class="small">${t("basedOn")} ${esc(methodName(c.method))}</span>
        <div class="prayers">${names.map((n) => `<div class="prayer ${next === n ? "next" : ""}"><span>${t(n)}</span><b>${esc(fmtTime(pt[n], tz))}</b></div>`).join("")}</div>`;
    } catch (e) { box.textContent = "—"; }
  }
  function askLocation() {
    if (!navigator.geolocation) { toast(t("locFail")); return; }
    navigator.geolocation.getCurrentPosition(
      (p) => { state.loc = { lat: p.coords.latitude, lng: p.coords.longitude }; mountPrayer(); mountClock(); },
      () => toast(t("locFail")), { timeout: 10000, maximumAge: 36e5 }
    );
  }

  /* ---- clock ---- */
  function mountClock() {
    const box = document.getElementById("clockCard"); if (!box) return;
    const now = new Date();
    const here = countryTZ();
    const d = tzOffsetMin(here, now) - tzOffsetMin("Africa/Cairo", now);
    let diffTxt = t("same");
    if (d !== 0) {
      const hrs = Math.abs(d) / 60;
      diffTxt = `${fmtNum(hrs, 1)} ${t("hourWord")} ${d > 0 ? t("ahead") : t("behind")}`;
    }
    box.innerHTML = `<div class="clock"><b>${esc(fmtTime(now, "Africa/Cairo"))}</b><span class="small" style="text-align:end">${t("diff")}<br><b style="font-size:14px;color:var(--ink)">${esc(diffTxt)}</b></span></div>`;
  }

  /* ---- settings ---- */
  function viewSettings() {
    const opts = COUNTRIES.map((c) => `<option value="${c.code}" ${c.code === state.country ? "selected" : ""}>${c.flag} ${esc(state.lang === "ar" ? c.ar : c.en)}</option>`).join("");
    const privacy = APP_CONFIG.PRIVACY_URL && !APP_CONFIG.PRIVACY_URL.startsWith("__") ? APP_CONFIG.PRIVACY_URL : "";
    return `
      <h2 class="page-title">${t("settings")}</h2>
      <h2 class="sec">${t("language")}</h2>
      <div class="seg"><button data-lang="ar" aria-pressed="${state.lang === "ar"}">العربية</button><button data-lang="en" aria-pressed="${state.lang === "en"}">English</button></div>
      <h2 class="sec">${t("country")}</h2>
      <select class="input" id="setCountry">${opts}</select>
      <h2 class="sec">${t("notifications")}</h2>
      <div class="panel"><label class="row" style="cursor:pointer"><span class="ic">${icon("bell")}</span><span class="grow">${t("remind")}</span><span class="switch"><input type="checkbox" id="setRem" ${state.reminders ? "checked" : ""}><span></span></span></label></div>
      <h2 class="sec">${t("about")}</h2>
      <div class="panel">
        ${privacy ? `<a class="row" href="#" data-ext="${esc(privacy)}"><span class="ic">${icon("shield")}</span><span class="grow"><span class="t">${t("privacy")}</span></span><span class="end">${icon("ext")}</span></a>` : ""}
        <div class="row" style="cursor:default"><span class="ic">${icon("news")}</span><span class="grow"><span class="t">${t("version")} ${esc(APP_CONFIG.VERSION)}</span>${state.data && state.data.updated ? `<span class="s">${t("updated")}: ${esc(fmtDate(state.data.updated))}</span>` : ""}</span></div>
      </div>
      <p class="disclaimer">${t("disclaimer")}</p>
    `;
  }

  /* ---- onboarding ---- */
  function viewOnboarding() {
    return `<div class="onb">
      <svg class="onb-mark" viewBox="0 0 96 96" aria-hidden="true"><rect width="96" height="96" rx="24" fill="#0B3C49"/><path d="M48 18c-12.7 0-23 10-23 22.4C25 57 48 78 48 78s23-21 23-37.6C71 28 60.7 18 48 18z" fill="#C8962E"/><path d="M48 30 36 50h24z" fill="#0B3C49"/><path d="M48 30l6 20h6z" fill="#148F8C"/></svg>
      <h2 class="page-title" style="font-size:24px">${t("welcomeTitle")}</h2>
      <p class="lead">${t("welcomeBody")}</p>
      <h2 class="sec" style="margin-top:8px">${t("chooseLang")}</h2>
      <div class="seg"><button data-lang="ar" aria-pressed="${state.lang === "ar"}">العربية</button><button data-lang="en" aria-pressed="${state.lang === "en"}">English</button></div>
      <h2 class="sec" style="margin-top:8px">${t("chooseCountry")}</h2>
      <div class="country-grid">${COUNTRIES.map((c) => `<button data-pick="${c.code}" aria-pressed="${state.pick === c.code}"><span class="fl">${c.flag}</span>${esc(state.lang === "ar" ? c.ar : c.en)}</button>`).join("")}</div>
      <button class="btn block" id="onbStart" ${state.pick ? "" : "disabled style=\"opacity:.5\""}>${t("start")}</button>
      <p class="disclaimer">${t("disclaimer")}</p>
    </div>`;
  }

  /* ================= Render & routing ================= */
  const TABS = [["home", "home", "tabHome"], ["exams", "exams", "tabExams"], ["family", "phone", "tabFamily"], ["consular", "consular", "tabConsular"], ["news", "news", "tabNews"], ["tools", "tools", "tabTools"]];
  const view = document.getElementById("view");
  let cdTimer;

  function render() {
    const html = document.documentElement;
    html.lang = state.lang; html.dir = state.lang === "ar" ? "rtl" : "ltr";
    document.title = t("appName");
    const onboarding = !state.country;
    document.getElementById("title").textContent = t("appName");
    const backBtn = document.getElementById("backBtn"), setBtn = document.getElementById("settingsBtn");
    backBtn.innerHTML = icon("back", state.lang === "ar" ? "" : "flip"); backBtn.setAttribute("aria-label", t("back"));
    setBtn.innerHTML = icon("gear"); setBtn.setAttribute("aria-label", t("settings"));
    backBtn.hidden = !state.sub; setBtn.hidden = !!state.sub || onboarding;
    const tabbar = document.getElementById("tabbar");
    tabbar.hidden = onboarding || state.sub === "assistant";
    view.classList.toggle("chat-view", state.sub === "assistant");
    tabbar.innerHTML = TABS.map(([id, ic, lbl]) => `<button data-tab="${id}" ${state.tab === id && !state.sub ? 'aria-current="page"' : ""}><span class="pill">${icon(ic)}</span>${t(lbl)}</button>`).join("");

    let body;
    if (onboarding) body = viewOnboarding();
    else if (state.sub === "settings") body = viewSettings();
    else if (state.sub === "assistant") body = Assistant ? Assistant.view() : "";
    else body = ({ home: viewHome, exams: viewExams, family: viewFamily, consular: viewConsular, news: viewNews, tools: viewTools }[state.tab] || viewHome)();
    view.innerHTML = body;
    fixLinks(view);
    if (state.sub === "assistant" && Assistant) Assistant.mount(view);
    view.classList.remove("view-enter"); void view.offsetWidth; view.classList.add("view-enter");

    clearInterval(cdTimer);
    if (!onboarding && !state.sub && state.tab === "home") cdTimer = setInterval(() => { const tk = view.querySelector(".ticket"); if (tk) { tk.outerHTML = ticketHTML(); fixLinks(view); } }, 30000);
    if (!onboarding && !state.sub && state.tab === "tools") { mountFx(); mountPrayer(); mountClock(); cdTimer = setInterval(mountClock, 30000); }
    updateAds();
  }

  function go(tab) { state.tab = tab; state.sub = null; closeSheet(); render(); view.scrollTop = 0; }

  /* ================= Family calls ================= */
  let Calls = null;
  function viewFamily() { return Calls ? Calls.view() : ""; }
  try {
    if (window.DalilCalls) {
      Calls = window.DalilCalls({
        icon, esc, toast, openSheet, closeSheet, state, store, isNative, P, go,
        rerender: () => { if (state.tab === "family" && !state.sub && state.country) { const y = view.scrollTop; render(); view.classList.remove("view-enter"); view.scrollTop = y; } }
      });
    }
  } catch (e) { Calls = null; }

  /* ================= AI assistant ================= */
  let Assistant = null;
  try {
    if (window.DalilAssistant && Calls && Calls.account) {
      Assistant = window.DalilAssistant({
        icon, esc, toast, openSheet, closeSheet, state, store, go, account: Calls.account,
        open: () => { state.sub = "assistant"; closeSheet(); render(); },
        rerender: () => { if (state.sub === "assistant") render(); }
      });
    }
  } catch (e) { Assistant = null; }

  document.getElementById("tabbar").addEventListener("click", (e) => { const b = e.target.closest("[data-tab]"); if (b) go(b.dataset.tab); });
  document.getElementById("settingsBtn").addEventListener("click", () => { state.sub = "settings"; render(); view.scrollTop = 0; });
  document.getElementById("backBtn").addEventListener("click", () => { state.sub = null; render(); });

  view.addEventListener("click", async (e) => {
    if (Assistant && Assistant.onClick(e)) return;
    if (Calls && Calls.onClick(e)) return;
    const el = e.target.closest("[data-go],[data-act],[data-lang],[data-pick],[data-cat],#onbStart");
    if (!el) return;
    if (el.dataset.go) return go(el.dataset.go);
    if (el.dataset.lang) { state.lang = el.dataset.lang; store.set("lang", state.lang); render(); return; }
    if (el.dataset.pick) { state.pick = el.dataset.pick; render(); return; }
    if (el.id === "onbStart" && state.pick) { state.country = state.pick; store.set("country", state.country); go("home"); return; }
    if (el.dataset.cat) { state.newsCat = el.dataset.cat; render(); return; }
    switch (el.dataset.act) {
      case "remind": return onRemind();
      case "addChild": return addChildSheet();
      case "delChild": state.children.splice(+el.dataset.i, 1); store.set("children", state.children); render(); return;
      case "service": return serviceSheet(el.dataset.id);
      case "news": return newsSheet(el.dataset.id);
      case "myLoc": return askLocation();
    }
  });
  view.addEventListener("change", async (e) => {
    if (e.target.id === "setCountry") { state.country = e.target.value; state.loc = null; store.set("country", state.country); render(); }
    if (e.target.id === "setRem") {
      if (e.target.checked) { const ok = await enableReminders(); if (!ok) e.target.checked = false; else toast(t("reminderSet")); }
      else {
        state.reminders = false; store.set("reminders", false);
        const LN = P("LocalNotifications");
        if (LN) { try { const p = await LN.getPending(); if (p.notifications.length) await LN.cancel({ notifications: p.notifications.map((n) => ({ id: n.id })) }); } catch (er) { /* ignore */ } }
      }
    }
  });

  /* ================= Ads (news tab only) ================= */
  let adsReady = false, bannerShown = false;
  async function initAds() {
    const A = P("AdMob"); if (!A) return;
    try {
      await A.initialize({ initializeForTesting: !!APP_CONFIG.ADMOB_TESTING });
      try {
        const info = await A.requestConsentInfo();
        if (info.isConsentFormAvailable && info.status === "REQUIRED") await A.showConsentForm();
      } catch (e) { /* consent not needed */ }
      adsReady = true; updateAds();
    } catch (e) { /* ignore */ }
  }
  async function updateAds() {
    const A = P("AdMob"); if (!A || !adsReady) return;
    const want = !!state.country && !state.sub && state.tab === "news";
    view.classList.toggle("with-ad", want);
    try {
      if (want && !bannerShown) {
        const id = APP_CONFIG.ADMOB_BANNER_ID && !APP_CONFIG.ADMOB_BANNER_ID.startsWith("__") ? APP_CONFIG.ADMOB_BANNER_ID : "ca-app-pub-3940256099942544/6300978111";
        await A.showBanner({ adId: id, adSize: "ADAPTIVE_BANNER", position: "BOTTOM_CENTER", margin: 64, isTesting: !!APP_CONFIG.ADMOB_TESTING });
        bannerShown = true;
      } else if (want && bannerShown) { await A.resumeBanner(); }
      else if (!want && bannerShown) { await A.hideBanner(); }
    } catch (e) { /* ignore */ }
  }

  /* ================= Android back button ================= */
  const App = P("App");
  if (App) {
    App.addListener("backButton", () => {
      if (Calls && Calls.onBack()) return;
      if (!sheet.hidden) return closeSheet();
      if (state.sub) { state.sub = null; return render(); }
      if (state.country && state.tab !== "home") return go("home");
      App.exitApp();
    });
  }

  render();
  loadData();
  initAds();
})();
