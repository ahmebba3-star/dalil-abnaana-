/* تصغير ملف PDF للتقديم: يجمع ملفات PDF وصور المستندات في ملف واحد ويصغّره لحد الحجم المطلوب — كله على الموبايل من غير رفع لأي سيرفر. */
(function () {
  "use strict";
  const MB = 1024 * 1024;
  const LADDER = [[1700, 0.78], [1500, 0.72], [1350, 0.66], [1200, 0.6], [1050, 0.55], [900, 0.5], [780, 0.45], [680, 0.4]];
  let items = []; // { name, size, kind: "pdf"|"img", file }
  let target = 2 * MB * 0.92, gray = false, busy = false, result = null;
  let C = null; // ctx from app.js

  const fmtSize = (b) => `<bdi dir="ltr">${b >= MB ? (b / MB).toFixed(2) + " MB" : Math.max(1, Math.round(b / 1024)) + " KB"}</bdi>`;
  const ar = () => C.lang() === "ar";
  const T = (a, e) => (ar() ? a : e);

  let pdfjsP = null;
  function loadPdfjs() {
    if (!pdfjsP) {
      const base = new URL("vendor/pdfjs/", location.href).href;
      pdfjsP = import(base + "pdf.min.mjs").then((m) => { m.GlobalWorkerOptions.workerSrc = base + "pdf.worker.min.mjs"; return { lib: m, base }; })
        .catch((e) => { pdfjsP = null; throw e; });
    }
    return pdfjsP;
  }

  // ---------- render every page once to a high-quality bitmap source ----------
  const toBlob = (cv, q) => new Promise((res) => cv.toBlob((b) => res(b), "image/jpeg", q));
  async function loadImg(blob) {
    if (window.createImageBitmap) { try { return await createImageBitmap(blob); } catch (e) { /* fall back */ } }
    return new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = URL.createObjectURL(blob); });
  }
  async function collectPages(onProg) {
    const pages = []; let n = 0;
    const total = items.length;
    for (const it of items) {
      n++;
      if (it.kind === "img") {
        const im = await loadImg(it.file);
        const cv = document.createElement("canvas"), max = LADDER[0][0], k = Math.min(1, max / Math.max(im.width, im.height));
        cv.width = Math.round(im.width * k); cv.height = Math.round(im.height * k);
        const g = cv.getContext("2d"); g.fillStyle = "#fff"; g.fillRect(0, 0, cv.width, cv.height); g.drawImage(im, 0, 0, cv.width, cv.height);
        pages.push(await toBlob(cv, 0.92)); cv.width = cv.height = 0;
        onProg(n / total);
      } else {
        const { lib, base } = await loadPdfjs();
        const data = new Uint8Array(await it.file.arrayBuffer());
        const task = lib.getDocument({ data, cMapUrl: base + "cmaps/", cMapPacked: true, standardFontDataUrl: base + "standard_fonts/", wasmUrl: base + "wasm/", iccUrl: base + "iccs/", isEvalSupported: false });
        const doc = await task.promise;
        for (let p = 1; p <= doc.numPages; p++) {
          const page = await doc.getPage(p);
          const vp0 = page.getViewport({ scale: 1 }), k = LADDER[0][0] / Math.max(vp0.width, vp0.height);
          const vp = page.getViewport({ scale: k });
          const cv = document.createElement("canvas"); cv.width = Math.round(vp.width); cv.height = Math.round(vp.height);
          const g = cv.getContext("2d"); g.fillStyle = "#fff"; g.fillRect(0, 0, cv.width, cv.height);
          await page.render({ canvasContext: g, viewport: vp }).promise;
          pages.push(await toBlob(cv, 0.92)); cv.width = cv.height = 0; page.cleanup();
          onProg((n - 1 + p / doc.numPages) / total);
        }
        try { await task.destroy(); } catch (e) { /* ignore */ }
      }
    }
    return pages;
  }
  async function encode(pages, maxSide, q) {
    const out = [];
    for (const b of pages) {
      const im = await loadImg(b);
      const k = Math.min(1, maxSide / Math.max(im.width, im.height));
      const cv = document.createElement("canvas"); cv.width = Math.round(im.width * k); cv.height = Math.round(im.height * k);
      const g = cv.getContext("2d"); g.fillStyle = "#fff"; g.fillRect(0, 0, cv.width, cv.height);
      if (gray) g.filter = "grayscale(1) contrast(1.15)";
      g.drawImage(im, 0, 0, cv.width, cv.height);
      const jb = await toBlob(cv, q);
      out.push({ w: cv.width, h: cv.height, bytes: new Uint8Array(await jb.arrayBuffer()) });
      cv.width = cv.height = 0; if (im.close) im.close();
    }
    return out;
  }

  // ---------- minimal PDF writer: one JPEG per A4-width page ----------
  function buildPdf(imgs) {
    const enc = new TextEncoder(), parts = [], offs = [];
    let len = 0;
    const put = (x) => { const b = typeof x === "string" ? enc.encode(x) : x; parts.push(b); len += b.length; };
    const obj = (id, body) => { offs[id] = len; put(`${id} 0 obj\n`); body(); put("\nendobj\n"); };
    put("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n");
    const n = imgs.length, pageIds = imgs.map((_, i) => 3 + i * 3);
    obj(1, () => put("<< /Type /Catalog /Pages 2 0 R >>"));
    obj(2, () => put(`<< /Type /Pages /Count ${n} /Kids [${pageIds.map((i) => i + " 0 R").join(" ")}] >>`));
    imgs.forEach((im, i) => {
      const pid = 3 + i * 3, cid = pid + 1, iid = pid + 2;
      const W = 595.28, H = +(W * im.h / im.w).toFixed(2);
      obj(pid, () => put(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /XObject << /Im${i} ${iid} 0 R >> >> /Contents ${cid} 0 R >>`));
      const cs = `q ${W} 0 0 ${H} 0 0 cm /Im${i} Do Q`;
      obj(cid, () => { put(`<< /Length ${cs.length} >>\nstream\n`); put(cs); put("\nendstream"); });
      obj(iid, () => { put(`<< /Type /XObject /Subtype /Image /Width ${im.w} /Height ${im.h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${im.bytes.length} >>\nstream\n`); put(im.bytes); put("\nendstream"); });
    });
    const total = 3 + n * 3, xref = len;
    let x = `xref\n0 ${total}\n0000000000 65535 f \n`;
    for (let i = 1; i < total; i++) x += String(offs[i]).padStart(10, "0") + " 00000 n \n";
    put(x + `trailer\n<< /Size ${total} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`);
    return new Blob(parts, { type: "application/pdf" });
  }

  async function run() {
    if (busy || !items.length) return;
    busy = true; result = null; draw();
    const prog = (p, msg) => { const el = document.getElementById("ptProg"); if (el) { el.style.width = Math.round(p * 100) + "%"; } const m = document.getElementById("ptMsg"); if (m && msg) m.textContent = msg; };
    try {
      const pages = await collectPages((p) => prog(p * 0.5, T("بنجهّز الصفحات…", "Preparing pages…")));
      let pdf = null, step = 0;
      for (const [side, q] of LADDER) {
        step++;
        prog(0.5 + 0.5 * step / LADDER.length, T("بنصغّر الملف…", "Compressing…"));
        pdf = buildPdf(await encode(pages, side, q));
        if (pdf.size <= target) break;
      }
      const orig = items.reduce((a, b) => a + b.size, 0);
      result = { blob: pdf, size: pdf.size, pages: pages.length, orig, ok: pdf.size <= target };
    } catch (e) {
      console.error(e);
      C.toast(T("مقدرناش نقرا الملف. لو الـ PDF عليه باسورد، شيله الأول وجرب تاني.", "Couldn't read the file. If the PDF is password-protected, remove the password and try again."));
    }
    busy = false; draw();
  }

  async function shareResult() {
    if (!result) return;
    const name = "documents-" + new Date().toISOString().slice(0, 10) + ".pdf";
    const P = window.Capacitor && window.Capacitor.Plugins;
    if (P && P.Filesystem && P.Share) {
      try {
        const b64 = await new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(String(r.result).split(",")[1]); r.onerror = rej; r.readAsDataURL(result.blob); });
        const w = await P.Filesystem.writeFile({ path: name, data: b64, directory: "CACHE" });
        await P.Share.share({ title: name, files: [w.uri], dialogTitle: T("احفظ الملف أو ابعته", "Save or send the file") });
        return;
      } catch (e) { if (/cancel/i.test(String(e && e.message))) return; console.error(e); }
    }
    const a = document.createElement("a"); a.href = URL.createObjectURL(result.blob); a.download = name; document.body.appendChild(a); a.click(); a.remove();
  }

  // ---------- UI ----------
  function html() {
    const esc = C.esc, tgt = [[2, T("أقل من 2 ميجا (المنصة)", "Under 2 MB (platform)")], [1, T("أقل من 1 ميجا", "Under 1 MB")], [0.5, T("أقل من 500 كيلو", "Under 500 KB")]];
    const orig = items.reduce((a, b) => a + b.size, 0);
    return `
      <h2 class="page-title">${T("تصغير ملف PDF للتقديم", "Shrink a PDF for the application")}</h2>
      <p class="lead">${T("المنصة بتطلب ملف PDF واحد لكل طالب أقل من 2 ميجابايت. اختار ملفات الـ PDF أو صور المستندات (شهادة الميلاد، الجواز، الإقامة...) وهنجمعهم في ملف واحد ونصغّره. الملفات ما بتتبعتش لأي مكان، كله بيحصل على موبايلك.", "The platform asks for one PDF per student under 2 MB. Pick PDF files or photos of the documents (birth certificate, passport, residence...) and we'll merge and shrink them into one file. Nothing is uploaded; it all happens on your phone.")}</p>
      <label class="btn block pt-pick">${C.icon("plus")}${T("اختار ملفات PDF أو صور", "Choose PDFs or photos")}<input id="ptFiles" type="file" accept="application/pdf,image/*" multiple hidden></label>
      ${items.length ? `<h2 class="sec">${T("الملفات بالترتيب", "Files in order")}<span class="small">${C.num(items.length)} · ${fmtSize(orig)}</span></h2>
      <div class="pt-list">${items.map((it, i) => `<div class="pt-item">
        <span class="pt-ic">${it.kind === "pdf" ? "📄" : "🖼️"}</span>
        <span class="grow"><b dir="auto">${esc(it.name)}</b><small>${fmtSize(it.size)}</small></span>
        <button data-pt="up" data-i="${i}" aria-label="${T("لفوق", "Up")}"${i === 0 ? " disabled" : ""}>▲</button>
        <button data-pt="down" data-i="${i}" aria-label="${T("لتحت", "Down")}"${i === items.length - 1 ? " disabled" : ""}>▼</button>
        <button data-pt="rm" data-i="${i}" aria-label="${T("شيل", "Remove")}">✕</button></div>`).join("")}</div>
      <h2 class="sec">${T("الحجم المطلوب", "Target size")}</h2>
      <div class="seg" role="group">${tgt.map(([v, l]) => `<button data-pt="tgt" data-v="${v}" aria-pressed="${Math.abs(target - v * MB * 0.92) < 1}">${l}</button>`).join("")}</div>
      <label class="pt-gray"><input type="checkbox" id="ptGray"${gray ? " checked" : ""}> ${T("أبيض وأسود (حجم أصغر، والكلام بيبان أوضح في الورق الممسوح)", "Black and white (smaller, and text is clearer on scans)")}</label>
      <button class="btn block" data-pt="go"${busy ? " disabled" : ""} style="margin-top:12px">${busy ? T("استنى شوية…", "Please wait…") : T("صغّر واعمل الملف", "Shrink and make the file")}</button>
      ${busy ? `<div class="pt-bar"><div id="ptProg"></div></div><p class="small" id="ptMsg">${T("بنجهّز الصفحات…", "Preparing pages…")}</p>` : ""}
      ${result ? `<div class="card pt-res ${result.ok ? "ok" : "warn"}">
        <div class="pt-sz"><span>${fmtSize(result.orig)}</span><b>←</b><span class="new">${fmtSize(result.size)}</span></div>
        <p>${result.ok ? T(`تمام ✅ ملف واحد فيه ${C.num(result.pages)} صفحة، وحجمه مناسب للرفع.`, `Done ✅ One file with ${result.pages} pages, small enough to upload.`) : T("الملف لسه أكبر من المطلوب. شيل الصفحات اللي مش محتاجها، أو اختار «أبيض وأسود»، وجرب تاني.", "Still too big. Remove pages you don't need or choose black and white, then try again.")}</p>
        <button class="btn block" data-pt="share">${C.icon("ext")}${T("احفظ الملف أو ابعته", "Save or send the file")}</button>
        <p class="small">${T("راجع الملف قبل الرفع واتأكد إن كل البيانات مقروءة.", "Check the file before uploading and make sure everything is readable.")}</p></div>` : ""}` : ""}
      <p class="small" style="margin-top:14px">💡 ${T("صوّر كل مستند في نور كويس على خلفية سادة، والصورة تبقى مستقيمة ومن غير ضل.", "Photograph each document in good light on a plain background, straight and without shadows.")}</p>`;
  }
  function draw() { const root = document.getElementById("ptRoot"); if (root) { root.innerHTML = html(); bind(); } }
  function bind() {
    const root = document.getElementById("ptRoot");
    const inp = document.getElementById("ptFiles");
    if (inp) inp.onchange = () => {
      for (const f of inp.files) {
        const isPdf = f.type === "application/pdf" || /\.pdf$/i.test(f.name);
        if (!isPdf && !/^image\//.test(f.type)) continue;
        items.push({ name: f.name, size: f.size, kind: isPdf ? "pdf" : "img", file: f });
      }
      result = null; draw();
    };
    const g = document.getElementById("ptGray"); if (g) g.onchange = () => { gray = g.checked; result = null; };
    root.onclick = (e) => {
      const b = e.target.closest("[data-pt]"); if (!b || busy) return;
      const a = b.dataset.pt, i = +b.dataset.i;
      if (a === "rm") items.splice(i, 1);
      else if (a === "up" && i > 0) [items[i - 1], items[i]] = [items[i], items[i - 1]];
      else if (a === "down" && i < items.length - 1) [items[i + 1], items[i]] = [items[i], items[i + 1]];
      else if (a === "tgt") target = +b.dataset.v * MB * 0.92;
      else if (a === "go") return run();
      else if (a === "share") return shareResult();
      else return;
      result = null; draw();
    };
  }
  window.PdfTool = {
    view: (ctx) => { C = ctx; return `<div id="ptRoot">${html()}</div>`; },
    mount: (ctx) => { C = ctx; bind(); },
    _buildPdf: buildPdf
  };
})();
