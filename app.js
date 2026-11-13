(function () {
  "use strict";

  /* ================= Icons ================= */
  const I = {
    home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    study: '<path d="M2.5 5.5c3-1.3 6.2-1.3 9.5.8 3.3-2.1 6.5-2.1 9.5-.8V19c-3-1.3-6.2-1.3-9.5.8-3.3-2.1-6.5-2.1-9.5-.8z"/><path d="M12 6.3v13.5"/>',
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
  // The native banner sits above the web view, so it is hidden while a sheet is open (it would cover the sheet's text and buttons).
  let sheetOpen = false;
  function openSheet(html, onMount) {
    document.getElementById("sheetBody").innerHTML = '<div class="grab"></div>' + html;
    sheet.hidden = false;
    if (!sheetOpen) { sheetOpen = true; updateAds(); }
    fixLinks(document.getElementById("sheetBody"));
    if (onMount) onMount(document.getElementById("sheetBody"));
    const f = sheet.querySelector("input, button:not([data-close])"); if (f) f.focus({ preventScroll: true });
  }
  function closeSheet() { sheet.hidden = true; document.getElementById("sheetBody").innerHTML = ""; if (sheetOpen) { sheetOpen = false; updateAds(); } }
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

  /* ---- إخلاء مسؤولية ومصادر رسمية (سياسة جوجل بلاي) ---- */
  function govNotice(which) {
    const ar = state.lang === "ar";
    const src = {
      exams: [["sabroad", "sabroad.emis.gov.eg", ar ? "منصة الطلاب المصريين بالخارج — وزارة التربية والتعليم" : "Egyptian Students Abroad platform — Ministry of Education"], ["moe", "moe.gov.eg", ar ? "وزارة التربية والتعليم" : "Ministry of Education"]],
      consular: [["mfa", "mfa.gov.eg", ar ? "وزارة الخارجية والهجرة" : "Ministry of Foreign Affairs & Emigration"], ["digital", "digital.gov.eg", ar ? "بوابة مصر الرقمية" : "Digital Egypt portal"]]
    };
    const list = which === "all" ? src.exams.concat(src.consular) : (src[which] || []);
    return `<div class="gov-notice" role="note">
      <div class="gn-head">${icon("alert")}<b>${t("govTitle")}</b></div>
      <p>${t("govBody")}</p>
      <div class="gn-src">${t("govSources")}</div>
      ${list.map((x) => `<a href="#" data-ext="${OFFICIAL_LINKS[x[0]]}"><span>${esc(x[2])}</span><code dir="ltr">${esc(OFFICIAL_LINKS[x[0]].replace(/^https:\/\//, ""))}</code></a>`).join("")}
    </div>`;
  }


  /* ---- دليل التسجيل المفصّل: رسومات توضيحية (SVG) ---- */
  function regArt(key) {
    const ar = state.lang === "ar";
    const L2 = (a, e) => esc(ar ? a : e);
    const X = (x) => (ar ? 320 - x : x); // mirror x for RTL
    const anc = ar ? "end" : "start";
    const frame = '<rect class="ra-bg" x="0" y="0" width="320" height="170" rx="16"/>';
    const win = (title) => '<rect class="ra-card" x="22" y="14" width="276" height="142" rx="12"/><rect class="ra-bar" x="22" y="14" width="276" height="26" rx="12"/><rect class="ra-bar" x="22" y="28" width="276" height="12"/>' +
      '<circle class="ra-dot" cx="' + X(36) + '" cy="27" r="4"/><circle class="ra-dot" cx="' + X(48) + '" cy="27" r="4"/>' +
      (title ? '<text class="ra-t ra-small" x="160" y="31" text-anchor="middle" direction="ltr">' + title + '</text>' : "");
    const field = (y, label, val, w) => '<text class="ra-t ra-small ra-mut" x="' + X(40) + '" y="' + y + '" text-anchor="' + anc + '">' + label + '</text>' +
      '<rect class="ra-field" x="' + (ar ? 320 - 40 - (w || 240) : 40) + '" y="' + (y + 4) + '" width="' + (w || 240) + '" height="16" rx="5"/>' +
      (val ? '<text class="ra-t ra-small" x="' + X(46) + '" y="' + (y + 16) + '" text-anchor="' + anc + '">' + val + '</text>' : "");
    const btn = (y, label) => '<rect class="ra-acc" x="110" y="' + y + '" width="100" height="22" rx="11"/><text class="ra-t ra-btn" x="160" y="' + (y + 15) + '" text-anchor="middle">' + label + '</text>';
    let g = "";
    switch (key) {
      case "prep": {
        const rows = [["✉", L2("إيميل شغال", "Working email")], ["▭", L2("كارت دفع دولي", "International card")], ["#", L2("الرقم القومي 14 رقم", "14-digit national ID")], ["PDF", L2("ملف لكل طالب", "One file per student")]];
        g = '<rect class="ra-card" x="40" y="14" width="240" height="142" rx="12"/>' + rows.map((r, i) => {
          const y = 26 + i * 32;
          return '<rect class="ra-soft" x="' + (ar ? 320 - 54 - 26 : 54) + '" y="' + y + '" width="26" height="24" rx="7"/>' +
            '<text class="ra-t ra-ic' + (r[0].length > 1 ? ' ra-tiny' : '') + '" x="' + (ar ? 320 - 67 : 67) + '" y="' + (y + 16) + '" text-anchor="middle">' + r[0] + '</text>' +
            '<text class="ra-t" x="' + X(90) + '" y="' + (y + 16) + '" text-anchor="' + anc + '">' + r[1] + '</text>' +
            '<path class="ra-ok" d="M' + (ar ? 70 : 250) + ' ' + (y + 12) + 'l5 5 9-10" fill="none"/>';
        }).join("");
        break;
      }
      case "portal":
        g = win("🔒 sabroad.emis.gov.eg") +
          '<rect class="ra-soft" x="' + (ar ? 160 : 40) + '" y="52" width="120" height="96" rx="8"/>' +
          [L2("الرئيسية", "Home"), L2("التسجيل على البوابة", "Portal registration"), L2("الامتحانات", "Exams"), L2("الدعم الفني", "Support")].map((m, i) =>
            (i === 1 ? '<rect class="ra-acc" x="' + (ar ? 166 : 46) + '" y="' + (58 + i * 22) + '" width="108" height="18" rx="6"/>' : "") +
            '<text class="ra-t ra-small' + (i === 1 ? " ra-on" : "") + '" x="' + X(52) + '" y="' + (71 + i * 22) + '" text-anchor="' + anc + '">' + m + '</text>').join("") +
          '<path class="ra-gold-s" d="M' + (ar ? 140 : 180) + ' 92 l' + (ar ? 18 : -18) + ' 0" />' +
          '<text class="ra-t ra-small ra-mut" x="' + (ar ? 70 : 250) + '" y="96" text-anchor="middle">' + L2("اضغط هنا", "Tap here") + '</text>';
        break;
      case "account":
        g = win(L2("حساب ولي الأمر", "Parent account")) + field(52, L2("اسم ولي الأمر", "Parent name"), "", 240) + field(82, L2("الإيميل", "Email"), "name@mail.com", 240) + field(112, L2("كلمة السر", "Password"), "••••••••", 240).replace(/height="16"/g, 'height="13"') + btn(132, L2("إنشاء الحساب", "Create account")).replace('height="22"', 'height="18"').replace(/y="147"/, 'y="145"');
        break;
      case "children":
        g = win(L2("التقدم للامتحانات", "Apply for exams")) +
          '<text class="ra-t" x="160" y="66" text-anchor="middle">' + L2("عدد الأبناء", "Number of children") + '</text>' +
          '<rect class="ra-field" x="105" y="76" width="110" height="34" rx="10"/>' +
          '<text class="ra-t ra-big" x="125" y="100" text-anchor="middle">−</text><text class="ra-t ra-big" x="160" y="101" text-anchor="middle">2</text><text class="ra-t ra-big" x="195" y="100" text-anchor="middle">+</text>' +
          btn(122, L2("متابعة", "Continue"));
        break;
      case "pay":
        g = win(L2("الدفع الإلكتروني", "Online payment")) +
          '<rect class="ra-acc" x="' + (ar ? 170 : 40) + '" y="54" width="110" height="68" rx="10"/><rect class="ra-gold" x="' + (ar ? 182 : 52) + '" y="70" width="20" height="14" rx="3"/>' +
          '<text class="ra-t ra-on ra-small" x="' + (ar ? 270 : 50) + '" y="112" text-anchor="' + (ar ? "end" : "start") + '" direction="ltr">•••• 4242</text>' +
          '<text class="ra-t ra-big" x="' + (ar ? 95 : 225) + '" y="84" text-anchor="middle" direction="ltr">$150</text>' +
          '<text class="ra-t ra-small ra-mut" x="' + (ar ? 95 : 225) + '" y="102" text-anchor="middle">' + L2("للطالب (2025/2026)", "per student (2025/26)") + '</text>' +
          btn(130, L2("ادفع", "Pay"));
        break;
      case "form": {
        let boxes = "";
        for (let i = 0; i < 14; i++) boxes += '<rect class="ra-field" x="' + (48 + i * 16.6) + '" y="112" width="13" height="18" rx="3"/>';
        g = win(L2("بيانات الطالب", "Student details")) + field(52, L2("الاسم الرباعي (زي شهادة الميلاد)", "Full name (as on birth certificate)"), L2("أحمد محمد علي حسن", "Ahmed Mohamed Ali Hassan"), 240) +
          '<text class="ra-t ra-small ra-mut" x="' + X(40) + '" y="104" text-anchor="' + anc + '">' + L2("الرقم القومي — 14 رقم", "National ID — 14 digits") + '</text>' + boxes +
          '<text class="ra-t ra-small ra-mut" x="160" y="148" text-anchor="middle">' + L2("الصف • نوع التعليم • دولة الإقامة", "Grade • Track • Country") + '</text>';
        break;
      }
      case "upload":
        g = win(L2("رفع المستندات", "Upload documents")) +
          '<path class="ra-card2" d="M138 50h32l14 14v52h-46z"/><path class="ra-soft" d="M170 50v14h14z"/>' +
          '<text class="ra-t ra-small ra-red" x="161" y="96" text-anchor="middle">PDF</text>' +
          '<path class="ra-acc-s" d="M210 98v-28m-10 10l10-10 10 10" fill="none"/>' +
          '<rect class="ra-field" x="60" y="126" width="200" height="8" rx="4"/><rect class="ra-acc" x="' + (ar ? 120 : 60) + '" y="126" width="140" height="8" rx="4"/>' +
          '<text class="ra-t ra-small ra-mut" x="160" y="150" text-anchor="middle">' + L2("ملف واحد لكل طالب • أقل من 2 ميجا", "One file per student • under 2 MB") + '</text>';
        break;
      case "print":
        g = '<rect class="ra-card" x="60" y="62" width="200" height="60" rx="12"/><rect class="ra-card2" x="95" y="20" width="130" height="50" rx="4"/>' +
          '<rect class="ra-line" x="108" y="32" width="104" height="5" rx="2"/><rect class="ra-line" x="108" y="44" width="80" height="5" rx="2"/>' +
          '<rect class="ra-card2" x="95" y="108" width="130" height="50" rx="4"/><rect class="ra-line" x="108" y="122" width="104" height="5" rx="2"/><rect class="ra-line" x="108" y="134" width="70" height="5" rx="2"/>' +
          '<circle class="ra-acc" cx="240" cy="80" r="5"/><rect class="ra-gold" x="100" y="104" width="16" height="6" rx="2"/>' +
          '<text class="ra-t ra-small ra-mut" x="' + (ar ? 290 : 30) + '" y="92" text-anchor="' + (ar ? "end" : "start") + '">' + L2("الاستمارة", "Form") + '</text>' +
          '<text class="ra-t ra-small ra-mut" x="' + (ar ? 290 : 30) + '" y="140" text-anchor="' + (ar ? "end" : "start") + '">' + L2("+ الأصول", "+ originals") + '</text>';
        break;
      case "seat":
        g = '<rect class="ra-card" x="110" y="10" width="100" height="150" rx="16"/><rect class="ra-soft" x="118" y="24" width="84" height="120" rx="8"/>' +
          '<text class="ra-t ra-small ra-mut" x="160" y="46" text-anchor="middle">' + L2("حساب ولي الأمر", "Parent account") + '</text>' +
          '<text class="ra-t ra-small" x="160" y="74" text-anchor="middle">' + L2("رقم الجلوس", "Seat number") + '</text>' +
          '<rect class="ra-acc" x="128" y="82" width="64" height="24" rx="6"/><text class="ra-t ra-on" x="160" y="99" text-anchor="middle" direction="ltr">•••••</text>' +
          '<text class="ra-t ra-small ra-mut" x="160" y="128" text-anchor="middle">' + L2("حساب الطالب", "Student account") + '</text>' +
          '<circle class="ra-card" cx="' + (ar ? 60 : 260) + '" cy="85" r="30"/><circle class="ra-soft" cx="' + (ar ? 60 : 260) + '" cy="85" r="24"/>' +
          '<path class="ra-acc-s" d="M' + (ar ? 60 : 260) + ' 85v-14m0 14l10 6" fill="none"/>' +
          '<text class="ra-t ra-small ra-mut" x="' + (ar ? 60 : 260) + '" y="132" text-anchor="middle">' + L2("توقيت بلدك", "Local time") + '</text>';
        break;
    }
    return '<svg class="reg-art" viewBox="0 0 320 170" role="img" aria-label="' + L2("رسم توضيحي", "Illustration") + '">' + frame + g + '</svg>';
  }

  function viewRegGuide() {
    const G = window.REG_GUIDE; if (!G) return "";
    const ar = state.lang === "ar";
    const exam = ((state.data && state.data.exams) || [])[0];
    return `
      <h2 class="page-title">${ar ? "طريقة التسجيل في امتحانات الفصل الدراسي الأول" : "How to register for first-term exams"}</h2>
      <p class="lead">${exam ? esc(L(exam, "title")) + " · " : ""}${ar ? "خطوة بخطوة بالرسومات" : "Step by step, with illustrations"}</p>
      <div class="notice">${esc(ar ? G.basis_ar : G.basis_en)}</div>
      ${G.steps.map((s, i) => {
        const x = s[state.lang] || s.ar;
        return `<section class="reg-step">
          <div class="reg-head"><span class="reg-num">${fmtNum(i + 1)}</span><b>${esc(x.t)}</b></div>
          ${regArt(s.art)}
          <p>${esc(x.d)}</p>
          <ul class="bullets">${x.items.map((it) => `<li>${esc(it)}</li>`).join("")}</ul>
          ${x.tip ? `<div class="reg-tip">${icon("alert")}<span>${esc(x.tip)}</span></div>` : ""}
          ${s.art === "portal" ? `<div class="reg-links"><a class="btn" href="#" data-ext="${OFFICIAL_LINKS.sabroad}">${icon("ext")}${t("openPlatform")}</a><a class="btn ghost" href="#" data-ext="${OFFICIAL_LINKS.sabroadLogin}">${icon("key")}${t("qLogin")}</a></div>` : ""}
        </section>`;
      }).join("")}
      ${AI() ? Assistant.entryRow() : ""}
      ${govNotice("exams")}
    `;
  }

  /* ================= Views ================= */
  function viewHome() {
    const c = country();
    const news = ((state.data && state.data.news) || []).slice(0, 3);
    const kidsSynced = Study && Study.homeKids();
    return `
      ${ticketHTML()}
      ${regHomeHTML()}
      ${duaHomeHTML()}
      ${Study ? Study.homeCard() : ""}
      ${AI() ? Assistant.entryCard() : ""}
      <h2 class="sec">${t("quick")}</h2>
      <div class="tiles">
        <a class="tile" href="#" data-ext="${OFFICIAL_LINKS.sabroad}"><span class="ic">${icon("globe")}</span><b>${t("qPlatform")}</b><small>${t("qPlatformSub")}</small></a>
        <a class="tile" href="#" data-ext="${OFFICIAL_LINKS.sabroadLogin}"><span class="ic">${icon("key")}</span><b>${t("qLogin")}</b><small>${t("qLoginSub")}</small></a>
        <button class="tile" data-go="consular"><span class="ic">${icon("consular")}</span><b>${t("qEmbassy")}</b><small>${esc(state.lang === "ar" ? c.ar : c.en)}</small></button>
        <button class="tile" data-go="tools"><span class="ic">${icon("phone")}</span><b>${t("qEmergency")}</b><small>${c.emergency.length ? esc(c.emergency.map((x) => x[0]).slice(0, 3).join(" / ")) : esc(state.lang === "ar" ? c.ar : c.en)}</small></button>
      </div>
      ${kidsSynced
        ? `<h2 class="sec">${t("myChildren")}<button data-st="open" data-to="parent">${t("addChild")}</button></h2>${kidsSynced}`
        : `<h2 class="sec">${t("myChildren")}<button data-act="addChild">${t("addChild")}</button></h2>${Study ? Study.parentCta() : ""}${childrenHTML()}`}
      <h2 class="sec">${t("latestNews")}<button data-go="news">${t("seeAll")}</button></h2>
      ${news.map(newsCard).join("")}
      ${govNotice("all")}
    `;
  }

  // التسجيل في امتحانات السفارة: أول حاجة في الرئيسية
  function regHomeHTML() {
    const ar = state.lang === "ar";
    const steps = REG_STEPS[state.lang] || REG_STEPS.ar, docs = REG_DOCS[state.lang] || REG_DOCS.ar;
    return `<section class="reg-home">
      <h2 class="sec">${ar ? "📋 التسجيل في امتحانات السفارة" : "📋 Registering for the embassy exams"}</h2>
      <button class="guide-card" data-act="regGuide">
        <span class="ic">${icon("exams")}</span>
        <span class="grow"><b>${t("guideTitle")}</b><small>${t("guideSub")}</small></span>
        <span class="end">${icon("chev", "flip")}</span>
      </button>
      <details class="rh-box"><summary>${ar ? `الخطوات باختصار (${fmtNum(steps.length)})` : `Steps in brief (${steps.length})`}</summary>
        <ol class="steps">${steps.map((x) => `<li><b>${esc(x[0])}</b><span>${esc(x[1])}</span></li>`).join("")}</ol></details>
      <details class="rh-box"><summary>${ar ? "الأوراق المطلوبة" : "Required documents"}</summary>
        <ul class="bullets">${docs.map((d) => `<li>${esc(d)}</li>`).join("")}</ul></details>
      <button class="pt-entry" data-act="pdftool"><span class="ic">📄</span><span class="grow"><b>${ar ? "صغّر ملف الـ PDF للتقديم" : "Shrink your PDF for the application"}</b><small>${ar ? "اجمع المستندات والصور في ملف واحد أقل من 2 ميجا" : "Merge documents and photos into one file under 2 MB"}</small></span><span class="end">${icon("chev", "flip")}</span></button>
      <a class="btn block" href="#" data-ext="${OFFICIAL_LINKS.sabroad}" style="margin-top:10px">${icon("ext")}${t("openPlatform")}</a>
    </section>`;
  }
  // ادعُ لأبنائك
  const duaOfDay = () => { const D = window.DUAS || []; const n = Math.floor((Date.now() + 3 * 36e5) / 864e5); return D.length ? D[n % D.length] : null; };
  function duaHomeHTML() {
    const d = duaOfDay(); if (!d) return "";
    const ar = state.lang === "ar";
    return `<h2 class="sec">${ar ? "🤲 ادعُ لأبنائك" : "🤲 Pray for your children"}<button data-act="duas">${ar ? "كل الأدعية" : "All"}</button></h2>
      <button class="dua-home" data-act="duas"><span class="dua-t">${esc(d.t)}</span><small>${esc(d.src)}</small></button>`;
  }
  const ptCtx = { lang: () => state.lang, esc, icon, num: (n) => fmtNum(n), toast: (m) => toast(m) };
  let duaCat = "all";
  function viewDuas() {
    const ar = state.lang === "ar";
    const D = (window.DUAS || []).filter((d) => duaCat === "all" || d.k === duaCat);
    const cats = [["all", ar ? "الكل" : "All"], ["q", ar ? "من القرآن" : "Quran"], ["s", ar ? "من السنة" : "Sunnah"], ["e", ar ? "للمذاكرة والامتحانات" : "Study and exams"]];
    return `
      <h2 class="page-title">${ar ? "ادعُ لأبنائك" : "Pray for your children"}</h2>
      <p class="lead">${ar ? "أدعية من القرآن الكريم ومن السنة الصحيحة، مع مصدر كل دعاء." : "Supplications from the Quran and authentic Sunnah, each with its source."}</p>
      <div class="chips" role="group">${cats.map((c) => `<button class="chip" data-duacat="${c[0]}" aria-pressed="${duaCat === c[0]}">${c[1]}</button>`).join("")}</div>
      ${D.map((d) => `<article class="dua">
        <p class="dua-t">${esc(d.t)}</p>
        <div class="dua-src"><span class="tag ${d.k === "s" ? "consular" : "exams"}">${d.k === "s" ? (ar ? "السنة" : "Sunnah") : ar ? "القرآن" : "Quran"}</span>${esc(d.src)}</div>
        ${d.note ? `<p class="small dua-note">${esc(d.note)}</p>` : ""}
        <div class="dua-act"><button class="btn ghost" data-duacopy="${esc(d.t + "\n(" + d.src + ")")}">${ar ? "نسخ" : "Copy"}</button><button class="btn ghost" data-duashare="${esc(d.t + "\n(" + d.src + ")")}">${ar ? "مشاركة" : "Share"}</button></div>
      </article>`).join("")}
      <h2 class="sec">${ar ? "فضل دعاء الوالد لولده" : "On praying for children"}</h2>
      ${(window.DUA_FACTS || []).map((f) => `<article class="dua fact"><p class="dua-t">«${esc(f.t)}»</p><div class="dua-src">${esc(f.src)}</div></article>`).join("")}
      <p class="small" style="margin-top:12px">${ar ? "الأحاديث من صحيح البخاري ومسلم أو مما صححه أهل العلم، وتقدر تدعي بأي دعاء بصيغة الجمع لكل أبنائك أو باسم كل واحد فيهم." : "Hadiths are from al-Bukhari and Muslim or graded authentic by scholars; you may adapt the wording for all your children or name each one."}</p>`;
  }
  async function shareText(txt) {
    const S = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Share;
    try {
      if (S) { await S.share({ text: txt }); return; }
      if (navigator.share) { await navigator.share({ text: txt }); return; }
    } catch (e) { return; }
    copyText(txt);
  }
  async function copyText(txt) {
    try { await navigator.clipboard.writeText(txt); toast(state.lang === "ar" ? "اتنسخ ✅" : "Copied ✅"); }
    catch (e) { toast(state.lang === "ar" ? "مقدرناش ننسخ" : "Couldn't copy"); }
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
      <button class="guide-card" data-act="regGuide">
        <span class="ic">${icon("exams")}</span>
        <span class="grow"><b>${t("guideTitle")}</b><small>${t("guideSub")}</small></span>
        <span class="end">${icon("chev", "flip")}</span>
      </button>
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
      ${AI() ? Assistant.entryRow() : ""}
      ${govNotice("exams")}
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
      ${AI() ? Assistant.entryRow() : ""}
      ${govNotice("consular")}
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
      <p class="small">${t("source")}: <a href="#" data-ext="${OFFICIAL_LINKS.mfa}" dir="ltr">mfa.gov.eg</a> · ${t("govShort")}</p>
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
      <p class="disclaimer">${t("newsDisclaimer")}</p>
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

      <button class="pt-entry" data-act="pdftool" style="margin-top:4px"><span class="ic">📄</span><span class="grow"><b>${state.lang === "ar" ? "تصغير ملف PDF للتقديم" : "Shrink a PDF for the application"}</b><small>${state.lang === "ar" ? "ملف واحد لكل طالب أقل من 2 ميجا — من غير رفع لأي سيرفر" : "One file per student under 2 MB — nothing is uploaded"}</small></span><span class="end">${icon("chev", "flip")}</span></button>

      <h2 class="sec">✈️ ${state.lang === "ar" ? "أرخص طيران" : "Cheapest flights"}</h2>
      <div class="card fl" id="flights"></div>

      <h2 class="sec">${t("currency")}</h2>
      <div class="card" id="fx">
        <div class="fx-rates" id="fxRates"></div>
        <div class="seg fx-seg" role="group" id="fxSeg"></div>
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

  /* ---- flights: build a search and open it on comparison sites (they show the live prices) ---- */
  const AIRPORTS = [
    ["مصر", "Egypt", [["CAI", "القاهرة", "Cairo"], ["HBE", "الإسكندرية (برج العرب)", "Alexandria (Borg El Arab)"], ["SPX", "سفنكس", "Sphinx"], ["HRG", "الغردقة", "Hurghada"], ["SSH", "شرم الشيخ", "Sharm El Sheikh"], ["LXR", "الأقصر", "Luxor"], ["ASW", "أسوان", "Aswan"], ["ATZ", "أسيوط", "Assiut"], ["HMB", "سوهاج", "Sohag"]]],
    ["الخليج", "Gulf", [["RUH", "الرياض", "Riyadh"], ["JED", "جدة", "Jeddah"], ["DMM", "الدمام", "Dammam"], ["MED", "المدينة المنورة", "Madinah"], ["AHB", "أبها", "Abha"], ["TIF", "الطائف", "Taif"], ["TUU", "تبوك", "Tabuk"], ["ELQ", "القصيم", "Qassim"], ["DXB", "دبي", "Dubai"], ["AUH", "أبوظبي", "Abu Dhabi"], ["SHJ", "الشارقة", "Sharjah"], ["KWI", "الكويت", "Kuwait"], ["DOH", "الدوحة", "Doha"], ["BAH", "البحرين", "Bahrain"], ["MCT", "مسقط", "Muscat"]]],
    ["العالم العربي", "Arab world", [["AMM", "عمّان", "Amman"], ["BEY", "بيروت", "Beirut"], ["MJI", "طرابلس (معيتيقة)", "Tripoli (Mitiga)"], ["BEN", "بنغازي", "Benghazi"], ["IST", "إسطنبول", "Istanbul"]]],
    ["أوروبا", "Europe", [["FCO", "روما", "Rome"], ["MXP", "ميلانو", "Milan"], ["CDG", "باريس", "Paris"], ["FRA", "فرانكفورت", "Frankfurt"], ["BER", "برلين", "Berlin"], ["MUC", "ميونخ", "Munich"], ["AMS", "أمستردام", "Amsterdam"], ["ATH", "أثينا", "Athens"], ["LHR", "لندن", "London"]]],
    ["أمريكا وأستراليا", "Americas and Australia", [["JFK", "نيويورك", "New York"], ["IAD", "واشنطن", "Washington"], ["LAX", "لوس أنجلوس", "Los Angeles"], ["YYZ", "تورونتو", "Toronto"], ["YUL", "مونتريال", "Montreal"], ["SYD", "سيدني", "Sydney"], ["MEL", "ملبورن", "Melbourne"]]]
  ];
  const HOME_AIRPORT = { SA: "RUH", AE: "DXB", KW: "KWI", QA: "DOH", BH: "BAH", OM: "MCT", JO: "AMM", LB: "BEY", LY: "MJI", IT: "FCO", FR: "CDG", DE: "FRA", NL: "AMS", GR: "ATH", GB: "LHR", US: "JFK", CA: "YYZ", AU: "SYD" };
  const isoDay = (d) => d.toISOString().slice(0, 10);
  function mountFlights() {
    const box = document.getElementById("flights"); if (!box) return;
    const ar = state.lang === "ar";
    const saved = store.get("flights", null) || {};
    const st = Object.assign({ from: HOME_AIRPORT[country().code] || "RUH", to: "CAI", rt: true, dep: "", ret: "", ad: 1, ch: 0, inf: 0 }, saved);
    const today = isoDay(new Date());
    if (!st.dep || st.dep < today) st.dep = isoDay(new Date(Date.now() + 14 * 864e5));
    if (!st.ret || st.ret < st.dep) st.ret = isoDay(new Date(new Date(st.dep).getTime() + 14 * 864e5));
    const opts = (sel) => AIRPORTS.map((g) => `<optgroup label="${esc(ar ? g[0] : g[1])}">${g[2].map((a) => `<option value="${a[0]}"${a[0] === sel ? " selected" : ""}>${esc(ar ? a[1] : a[2])} · ${a[0]}</option>`).join("")}</optgroup>`).join("");
    const step = (k, label, min) => `<div class="fl-step"><span>${label}</span><button data-fl="${k}" data-d="-1" aria-label="-"${st[k] <= min ? " disabled" : ""}>−</button><b>${st[k]}</b><button data-fl="${k}" data-d="1" aria-label="+"${st.ad + st.ch + st.inf >= 9 ? " disabled" : ""}>+</button></div>`;
    const draw = () => {
      box.innerHTML = `
        <div class="seg" role="group">
          <button data-flrt="1" aria-pressed="${st.rt}">${ar ? "ذهاب وعودة" : "Round trip"}</button>
          <button data-flrt="0" aria-pressed="${!st.rt}">${ar ? "ذهاب فقط" : "One way"}</button></div>
        <div class="fl-route">
          <div class="field"><label for="flFrom">${ar ? "من" : "From"}</label><select id="flFrom" class="input">${opts(st.from)}</select></div>
          <button class="swap" id="flSwap" aria-label="swap">${icon("swap")}</button>
          <div class="field"><label for="flTo">${ar ? "إلى" : "To"}</label><select id="flTo" class="input">${opts(st.to)}</select></div>
        </div>
        <div class="fl-dates">
          <div class="field"><label for="flDep">${ar ? "تاريخ السفر" : "Departure"}</label><input id="flDep" type="date" class="input" min="${today}" value="${st.dep}"></div>
          ${st.rt ? `<div class="field"><label for="flRet">${ar ? "تاريخ العودة" : "Return"}</label><input id="flRet" type="date" class="input" min="${st.dep}" value="${st.ret}"></div>` : ""}
        </div>
        <div class="fl-pax">${step("ad", ar ? "كبار" : "Adults", 1)}${step("ch", ar ? "أطفال (2–11)" : "Children (2–11)", 0)}${step("inf", ar ? "رضّع" : "Infants", 0)}</div>
        <p class="small fl-hint">${ar ? "اختار الموقع اللي تقارن عليه، وهيفتح بالبحث جاهز ومترتب من الأرخص:" : "Pick a site to compare on; it opens with your search ready, sorted by price:"}</p>
        <div class="fl-go">
          <button class="btn" data-flgo="google">${icon("plane")}Google Flights</button>
          <button class="btn ghost" data-flgo="sky">Skyscanner</button>
          <button class="btn ghost" data-flgo="kayak">Kayak</button>
        </div>
        <p class="small fl-tip">💡 ${ar ? "الأسعار بتتغير كل شوية: جرّب تواريخ قريبة من تاريخك، وقارن بين أكتر من موقع، وفعّل «تتبع الأسعار» في Google Flights عشان يبعتلك لما السعر ينزل. الحجز والدفع بيتم في موقع شركة الطيران أو موقع الحجز نفسه." : "Prices change often: try nearby dates, compare more than one site, and turn on price tracking in Google Flights. Booking and payment happen on the airline or booking site."}</p>`;
    };
    const save = () => store.set("flights", st);
    draw();
    box.onchange = (e) => {
      const id = e.target.id;
      if (id === "flFrom") st.from = e.target.value;
      if (id === "flTo") st.to = e.target.value;
      if (id === "flDep") { st.dep = e.target.value || st.dep; if (st.ret < st.dep) st.ret = st.dep; draw(); }
      if (id === "flRet") st.ret = e.target.value || st.ret;
      save();
    };
    box.onclick = (e) => {
      const b = e.target.closest("button"); if (!b) return;
      if (b.id === "flSwap") { [st.from, st.to] = [st.to, st.from]; save(); draw(); return; }
      if (b.dataset.flrt) { st.rt = b.dataset.flrt === "1"; save(); draw(); return; }
      if (b.dataset.fl) { const k = b.dataset.fl; st[k] = Math.max(k === "ad" ? 1 : 0, st[k] + +b.dataset.d); if (st.inf > st.ad) st.inf = st.ad; save(); draw(); return; }
      if (b.dataset.flgo) {
        if (st.from === st.to) { toast(ar ? "اختار مطارين مختلفين" : "Pick two different airports"); return; }
        const site = b.dataset.flgo, ymd = (d) => d.slice(2).replace(/-/g, "");
        let url;
        if (site === "google") {
          let q = `Flights from ${st.from} to ${st.to} on ${st.dep}` + (st.rt ? ` returning ${st.ret}` : " one way") + ` for ${st.ad} adult${st.ad > 1 ? "s" : ""}`;
          if (st.ch) q += ` and ${st.ch} child${st.ch > 1 ? "ren" : ""}`;
          if (st.inf) q += ` and ${st.inf} infant${st.inf > 1 ? "s" : ""} on lap`;
          url = "https://www.google.com/travel/flights?hl=" + (ar ? "ar" : "en") + "&q=" + encodeURIComponent(q);
        } else if (site === "sky") {
          const kids = Array(st.ch).fill("8").concat(Array(st.inf).fill("0")).join("|");
          url = `https://www.skyscanner.net/transport/flights/${st.from.toLowerCase()}/${st.to.toLowerCase()}/${ymd(st.dep)}/` + (st.rt ? `${ymd(st.ret)}/` : "") +
            `?adultsv2=${st.ad}` + (kids ? "&childrenv2=" + encodeURIComponent(kids) : "") + `&cabinclass=economy&rtn=${st.rt ? 1 : 0}`;
        } else {
          const kids = Array(st.ch).fill("8").concat(Array(st.inf).fill("1L"));
          url = `https://www.kayak.com/flights/${st.from}-${st.to}/${st.dep}` + (st.rt ? `/${st.ret}` : "") + `/${st.ad}adults` + (kids.length ? "/children-" + kids.join("-") : "") + "?sort=price_a";
        }
        openExternal(url);
      }
    };
  }

  /* ---- currency ---- */
  let fxDir = 1; // 1: foreign -> EGP, -1: EGP -> foreign
  let fxPick = null; // العملة المختارة في المحوّل: عملة الدولة أو الدولار
  async function mountFx() {
    const box = document.getElementById("fx"); if (!box) return;
    const local = country().cur;
    const curs = local === "USD" ? ["USD", "EUR"] : [local, "USD"];
    if (curs.indexOf(fxPick) < 0) fxPick = curs[0];
    const amt = box.querySelector("#fxAmt");
    const names = { USD: ["الدولار الأمريكي", "US dollar"], EUR: ["اليورو", "Euro"] };
    const cname = (c) => (names[c] ? names[c][state.lang === "ar" ? 0 : 1] : c);
    const seg = box.querySelector("#fxSeg");
    seg.innerHTML = curs.map((c) => '<button data-fx="' + c + '" aria-pressed="' + (c === fxPick) + '">' + esc(c) + " ⇄ EGP</button>").join("");
    const update = (rates, date) => {
      const cur = fxPick;
      const from = fxDir === 1 ? cur : "EGP", to = fxDir === 1 ? "EGP" : cur;
      box.querySelector("#fxFrom").textContent = from; box.querySelector("#fxTo").textContent = to;
      const tiles = box.querySelector("#fxRates");
      if (!rates) { tiles.innerHTML = ""; box.querySelector("#fxOut").textContent = "—"; return; }
      tiles.innerHTML = curs.map((c) => {
        const r = rates[c];
        return '<div class="fx-tile' + (c === "USD" ? " usd" : "") + '"><small>' + esc(names[c] ? cname(c) : (state.lang === "ar" ? country().ar : country().en)) + ' <bdi dir="ltr">(1 ' + esc(c) + ')</bdi></small><b dir="ltr">' + (r ? fmtNum(1 / r, 2) : "—") + ' <span>EGP</span></b></div>';
      }).join("");
      if (!rates[cur]) { box.querySelector("#fxOut").textContent = "—"; return; }
      const v = parseFloat(String(amt.value).replace(/[^\d.]/g, "")) || 0;
      const r = rates[cur]; // 1 EGP = r CUR
      const out = fxDir === 1 ? v / r : v * r;
      box.querySelector("#fxOut").textContent = fmtNum(out, 2);
      box.querySelector("#fxNote").textContent = t("rateAt") + " " + (date ? fmtDate(date) : "") + " · " + t("rateNote");
    };
    let cache = store.get("fx", null);
    const redraw = () => update(cache && cache.rates, cache && cache.date);
    redraw();
    amt.addEventListener("input", redraw);
    box.querySelector("#fxSwap").addEventListener("click", () => { fxDir *= -1; redraw(); });
    seg.addEventListener("click", (e) => {
      const b = e.target.closest("[data-fx]"); if (!b) return;
      fxPick = b.getAttribute("data-fx");
      Array.prototype.forEach.call(seg.querySelectorAll("[data-fx]"), (x) => x.setAttribute("aria-pressed", String(x === b)));
      redraw();
    });
    const fresh = cache && Date.now() - cache.at < 6 * 36e5;
    if (!fresh) {
      try {
        const r = await (await fetch("https://open.er-api.com/v6/latest/EGP")).json();
        if (r && r.result === "success") {
          cache = { rates: r.rates, date: new Date(r.time_last_update_unix * 1000).toISOString().slice(0, 10), at: Date.now() };
          store.set("fx", cache);
        }
      } catch (e) { if (!cache) box.querySelector("#fxNote").textContent = t("rateFail"); }
      if (document.getElementById("fx") === box) redraw();
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
  const TABS = [["home", "home", "tabHome"], ["study", "study", "tabStudy"], ["exams", "exams", "tabExams"], ["family", "phone", "tabFamily"], ["consular", "consular", "tabConsular"], ["news", "news", "tabNews"], ["tools", "tools", "tabTools"]];
  const inStudy = () => !!(Study && state.country && !state.sub && state.tab === "study");
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
    const studyBack = inStudy() && Study.canBack();
    backBtn.hidden = !state.sub && !studyBack; setBtn.hidden = !!state.sub || onboarding || studyBack;
    const tabbar = document.getElementById("tabbar");
    const studyFull = inStudy() && Study.fullScreen();
    tabbar.hidden = onboarding || state.sub === "assistant" || studyFull;
    view.classList.toggle("chat-view", state.sub === "assistant");
    view.classList.toggle("st-full", studyFull);
    tabbar.innerHTML = TABS.map(([id, ic, lbl]) => `<button data-tab="${id}" ${state.tab === id && !state.sub ? 'aria-current="page"' : ""}><span class="pill">${icon(ic)}</span>${t(lbl)}</button>`).join("");

    let body;
    if (onboarding) body = viewOnboarding();
    else if (state.sub === "settings") body = viewSettings();
    else if (state.sub === "regguide") body = viewRegGuide();
    else if (state.sub === "duas") body = viewDuas();
    else if (state.sub === "pdftool") body = window.PdfTool ? PdfTool.view(ptCtx) : "";
    else if (state.sub === "assistant") body = Assistant ? Assistant.view() : "";
    else body = ({ home: viewHome, study: viewStudy, exams: viewExams, family: viewFamily, consular: viewConsular, news: viewNews, tools: viewTools }[state.tab] || viewHome)();
    view.innerHTML = body;
    fixLinks(view);
    if (state.sub === "assistant" && Assistant) Assistant.mount(view);
    if (Study) Study.mount(inStudy() ? view : null);
    view.classList.remove("view-enter"); void view.offsetWidth; view.classList.add("view-enter");

    clearInterval(cdTimer);
    if (!onboarding && !state.sub && state.tab === "home") cdTimer = setInterval(() => { const tk = view.querySelector(".ticket"); if (tk) { tk.outerHTML = ticketHTML(); fixLinks(view); } }, 30000);
    if (!onboarding && !state.sub && state.tab === "tools") { mountFlights(); mountFx(); mountPrayer(); mountClock(); cdTimer = setInterval(mountClock, 30000); }
    if (state.sub === "pdftool" && window.PdfTool) PdfTool.mount(ptCtx);
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

  /* ================= Study (مذاكرتي) ================= */
  let Study = null;
  function viewStudy() { return Study ? Study.view() : ""; }
  function studyRefresh(toTop) {
    if (!inStudy()) return;
    const y = view.scrollTop;
    render();
    if (toTop) view.scrollTop = 0;
    else { view.classList.remove("view-enter"); view.scrollTop = y; }
  }
  try {
    if (window.DalilStudy) {
      Study = window.DalilStudy({
        icon, esc, toast, openSheet, closeSheet, state, store, isNative, P, go, fmtDate, fmtNum, nextExam,
        account: Calls && Calls.account ? Calls.account : null,
        refresh: studyRefresh,
        // background updates (content loaded, sign-in changed): keep the book and a running exam untouched
        rerender: () => {
          if (inStudy() && !Study.busyView()) studyRefresh(false);
          else if (state.country && !state.sub && state.tab === "home") { const y = view.scrollTop; render(); view.classList.remove("view-enter"); view.scrollTop = y; }
        },
        ensureTab: () => { state.tab = "study"; state.sub = null; closeSheet(); },
        ads: { preload: preloadInterstitial, interstitial: showInterstitial, rewarded: showRewarded }
      });
    }
  } catch (e) { Study = null; }
  // the AI assistant is for parents; it's hidden on a child's linked device
  const AI = () => !!(Assistant && !(Study && Study.isStudentDevice()));

  document.getElementById("tabbar").addEventListener("click", (e) => {
    const b = e.target.closest("[data-tab]"); if (!b) return;
    if (b.dataset.tab === "study" && inStudy()) { if (Study.reset()) { render(); view.scrollTop = 0; } return; }
    go(b.dataset.tab);
  });
  document.getElementById("settingsBtn").addEventListener("click", () => { state.sub = "settings"; render(); view.scrollTop = 0; });
  document.getElementById("backBtn").addEventListener("click", () => {
    if (!state.sub && inStudy()) { Study.onBack(); return; }
    state.sub = null; render();
  });

  view.addEventListener("click", async (e) => {
    if (Study && Study.onClick(e)) return;
    if (Assistant && Assistant.onClick(e)) return;
    if (Calls && Calls.onClick(e)) return;
    const el = e.target.closest("[data-go],[data-act],[data-lang],[data-pick],[data-cat],[data-duacat],[data-duacopy],[data-duashare],#onbStart");
    if (!el) return;
    if (el.dataset.go) return go(el.dataset.go);
    if (el.dataset.lang) { state.lang = el.dataset.lang; store.set("lang", state.lang); render(); return; }
    if (el.dataset.pick) { state.pick = el.dataset.pick; render(); return; }
    if (el.id === "onbStart" && state.pick) { state.country = state.pick; store.set("country", state.country); go("home"); return; }
    if (el.dataset.cat) { state.newsCat = el.dataset.cat; render(); return; }
    if (el.dataset.duacat) { duaCat = el.dataset.duacat; render(); return; }
    if (el.dataset.duacopy) { copyText(el.dataset.duacopy); return; }
    if (el.dataset.duashare) { shareText(el.dataset.duashare); return; }
    switch (el.dataset.act) {
      case "remind": return onRemind();
      case "regGuide": state.sub = "regguide"; render(); view.scrollTop = 0; return;
      case "duas": state.sub = "duas"; render(); view.scrollTop = 0; return;
      case "pdftool": state.sub = "pdftool"; render(); view.scrollTop = 0; return;
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

  /* ================= Ads (news tab + study pages) =================
   * The study section is used by children, so every ad request is child-directed,
   * non-personalized and rated G (Google Play Families policy). No consent form is needed then. */
  const AD_TEST = { banner: "ca-app-pub-3940256099942544/6300978111", inter: "ca-app-pub-3940256099942544/1033173712", reward: "ca-app-pub-3940256099942544/5224354917" };
  const adId = (kind, real) => (real && !String(real).startsWith("__") ? real : AD_TEST[kind]);
  let adsReady = false, bannerShown = false;
  async function initAds() {
    const A = P("AdMob"); if (!A) return;
    try {
      await A.initialize({ initializeForTesting: !!APP_CONFIG.ADMOB_TESTING, tagForChildDirectedTreatment: true, tagForUnderAgeOfConsent: true, maxAdContentRating: "General" });
      adsReady = true; updateAds();
    } catch (e) { /* ignore */ }
  }
  async function updateAds() {
    const A = P("AdMob"); if (!A || !adsReady) return;
    const want = !!state.country && !state.sub && !sheetOpen && (state.tab === "news" || (inStudy() && Study.wantsBanner()));
    view.classList.toggle("with-ad", want);
    try {
      if (want && !bannerShown) {
        await A.showBanner({ adId: adId("banner", APP_CONFIG.ADMOB_BANNER_ID), adSize: "ADAPTIVE_BANNER", position: "BOTTOM_CENTER", margin: 64, isTesting: !!APP_CONFIG.ADMOB_TESTING, npa: true });
        bannerShown = true;
      } else if (want && bannerShown) { await A.resumeBanner(); }
      else if (!want && bannerShown) { await A.hideBanner(); }
    } catch (e) { /* ignore */ }
  }
  // full-screen ad after a finished exam: never the first one, and at most once every 4 minutes
  let interReady = null, lastInter = 0, finishedN = 0;
  function interAllowed() { return finishedN >= 1 && Date.now() - lastInter > 4 * 60000; }
  function preloadInterstitial() {
    const A = P("AdMob"); if (!A || !adsReady || interReady || !interAllowed()) return;
    interReady = A.prepareInterstitial({ adId: adId("inter", APP_CONFIG.ADMOB_INTERSTITIAL_ID), isTesting: !!APP_CONFIG.ADMOB_TESTING, npa: true }).then(() => true, () => { interReady = null; return false; });
  }
  async function showInterstitial() {
    const A = P("AdMob");
    const ready = interReady; finishedN++;
    if (!A || !adsReady || !ready || Date.now() - lastInter < 4 * 60000) return;
    interReady = null;
    try {
      if (await Promise.race([ready, new Promise((r) => setTimeout(() => r(false), 1500))])) { await A.showInterstitial(); lastInter = Date.now(); }
    } catch (e) { /* ignore */ }
  }
  // optional rewarded ad for "show the answer" in practice; if no ad is available the answer is shown anyway
  async function showRewarded() {
    const A = P("AdMob"); if (!A || !adsReady) return true;
    try { await A.prepareRewardVideoAd({ adId: adId("reward", APP_CONFIG.ADMOB_REWARDED_ID), isTesting: !!APP_CONFIG.ADMOB_TESTING, npa: true }); }
    catch (e) { return true; }
    try { await A.showRewardVideoAd(); return true; } catch (e) { return false; }
  }

  /* ================= Android back button ================= */
  const App = P("App");
  if (App) {
    App.addListener("backButton", () => {
      if (Calls && Calls.onBack()) return;
      if (!sheet.hidden) return closeSheet();
      if (state.sub) { state.sub = null; return render(); }
      if (inStudy() && Study.onBack()) return;
      if (state.country && state.tab !== "home") return go("home");
      App.exitApp();
    });
  }

  render();
  loadData();
  initAds();
})();
