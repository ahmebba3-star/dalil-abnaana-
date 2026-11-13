/* صورة الطالب للتسجيل: قص بالمقاس، تفتيح، وتصغير لحد الحجم المطلوب — على الموبايل من غير رفع لأي سيرفر. */
(function () {
  "use strict";
  const PRESETS = [
    { id: "4x6", ar: "4×6 سم (صورة شخصية)", en: "4×6 cm (ID photo)", w: 472, h: 709, kb: 200 },
    { id: "sq", ar: "مربعة", en: "Square", w: 600, h: 600, kb: 200 },
    { id: "custom", ar: "مقاس تاني", en: "Custom", w: 0, h: 0, kb: 0 }
  ];
  let P = { preset: "4x6", w: 472, h: 709, kb: 200 };
  let img = null, zoom = 1, ox = 0, oy = 0, rot = 0, bright = 0, busy = false, result = null;
  let C = null;
  const T = (a, e) => (C.lang() === "ar" ? a : e);
  const fmt = (b) => `<bdi dir="ltr">${b >= 1048576 ? (b / 1048576).toFixed(2) + " MB" : Math.max(1, Math.round(b / 1024)) + " KB"}</bdi>`;
  try { const s = JSON.parse(localStorage.getItem("dalil:photoSpec") || "null"); if (s && s.w && s.h && s.kb) P = s; } catch (e) { /* ignore */ }
  const saveSpec = () => { try { localStorage.setItem("dalil:photoSpec", JSON.stringify(P)); } catch (e) { /* ignore */ } };

  // draw the current crop into a canvas of size W×H
  function drawTo(cv, W, H) {
    const g = cv.getContext("2d"); cv.width = W; cv.height = H;
    g.fillStyle = "#fff"; g.fillRect(0, 0, W, H);
    if (!img) return;
    const iw = rot % 180 ? img.height : img.width, ih = rot % 180 ? img.width : img.height;
    const base = Math.max(W / iw, H / ih), k = base * zoom;
    g.save();
    g.filter = bright ? `brightness(${1 + bright / 100}) contrast(${1 + Math.abs(bright) / 250})` : "none";
    g.translate(W / 2 + ox * W, H / 2 + oy * H); g.rotate(rot * Math.PI / 180); g.scale(k, k);
    g.drawImage(img, -img.width / 2, -img.height / 2);
    g.restore();
  }
  // keep the photo covering the whole frame
  function clamp() {
    if (!img) return;
    const W = P.w, H = P.h, iw = rot % 180 ? img.height : img.width, ih = rot % 180 ? img.width : img.height;
    const k = Math.max(W / iw, H / ih) * zoom, mx = Math.max(0, (iw * k - W) / 2 / W), my = Math.max(0, (ih * k - H) / 2 / H);
    ox = Math.min(mx, Math.max(-mx, ox)); oy = Math.min(my, Math.max(-my, oy));
  }
  function preview() {
    const cv = document.getElementById("phCv"); if (!cv) return;
    const scale = Math.min(1, 300 / P.w, 360 / P.h);
    drawTo(cv, Math.round(P.w * scale), Math.round(P.h * scale));
  }
  const toBlob = (cv, q) => new Promise((res) => cv.toBlob(res, "image/jpeg", q));
  async function make() {
    if (!img || busy) return;
    busy = true; draw();
    const cv = document.createElement("canvas"); drawTo(cv, P.w, P.h);
    let q = 0.92, b = await toBlob(cv, q);
    while (b.size > P.kb * 1024 && q > 0.3) { q -= 0.06; b = await toBlob(cv, q); }
    result = { blob: b, ok: b.size <= P.kb * 1024, url: URL.createObjectURL(b) };
    busy = false; draw();
  }
  async function share() {
    if (!result) return;
    const name = "photo-" + P.w + "x" + P.h + ".jpg";
    const Pl = window.Capacitor && window.Capacitor.Plugins;
    if (Pl && Pl.Filesystem && Pl.Share) {
      try {
        const b64 = await new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(String(r.result).split(",")[1]); r.onerror = rej; r.readAsDataURL(result.blob); });
        const w = await Pl.Filesystem.writeFile({ path: name, data: b64, directory: "CACHE" });
        await Pl.Share.share({ title: name, files: [w.uri], dialogTitle: T("احفظ الصورة أو ابعتها", "Save or send the photo") });
        return;
      } catch (e) { if (/cancel/i.test(String(e && e.message))) return; console.error(e); }
    }
    const a = document.createElement("a"); a.href = result.url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
  }

  function html() {
    const cur = PRESETS.find((x) => x.id === P.preset) || PRESETS[2];
    return `
      <h2 class="page-title">${T("صورة الطالب للتسجيل", "Student photo for registration")}</h2>
      <p class="lead">${T("اختار صورة الطالب أو صوّره، ظبّط القص، وهنطلّعها بالمقاس والحجم المطلوبين. الصورة ما بتتبعتش لأي مكان.", "Pick or take the student's photo, adjust the crop, and we'll export it at the required size. Nothing is uploaded.")}</p>
      <h2 class="sec">${T("المقاس المطلوب", "Required size")}</h2>
      <div class="seg" role="group">${PRESETS.map((x) => `<button data-ph="preset" data-id="${x.id}" aria-pressed="${P.preset === x.id}">${T(x.ar, x.en)}</button>`).join("")}</div>
      <div class="ph-spec">
        <label>${T("العرض", "Width")}<input class="input" id="phW" type="number" inputmode="numeric" min="100" max="2000" value="${P.w}"${cur.id !== "custom" ? " readonly" : ""}><small>px</small></label>
        <label>${T("الطول", "Height")}<input class="input" id="phH" type="number" inputmode="numeric" min="100" max="2000" value="${P.h}"${cur.id !== "custom" ? " readonly" : ""}><small>px</small></label>
        <label>${T("أقصى حجم", "Max size")}<input class="input" id="phKB" type="number" inputmode="numeric" min="20" max="5000" value="${P.kb}"${cur.id !== "custom" ? " readonly" : ""}><small>KB</small></label>
      </div>
      <p class="small">${T("لو المنصة كاتبة مقاس أو حجم مختلف، اختار «مقاس تاني» واكتبه.", "If the platform states a different size, choose Custom and enter it.")}</p>
      <label class="btn block pt-pick">📷 ${img ? T("غيّر الصورة", "Change photo") : T("اختار الصورة أو صوّر", "Choose or take a photo")}<input id="phFile" type="file" accept="image/*" hidden></label>
      ${img ? `<div class="ph-stage"><canvas id="phCv" class="ph-cv" aria-label="${T("اسحب لتحريك الصورة", "Drag to move the photo")}"></canvas></div>
        <p class="small ph-c">${T("اسحب الصورة بصباعك عشان تحرّكها جوه الإطار", "Drag the photo to move it inside the frame")}</p>
        <label class="ph-range">🔍 ${T("تكبير", "Zoom")}<input id="phZoom" type="range" min="100" max="300" value="${Math.round(zoom * 100)}"></label>
        <label class="ph-range">☀️ ${T("الإضاءة", "Brightness")}<input id="phBr" type="range" min="-40" max="60" value="${bright}"></label>
        <div class="ph-row"><button class="btn ghost" data-ph="rot">↻ ${T("لف", "Rotate")}</button><button class="btn ghost" data-ph="reset">${T("رجّع زي الأول", "Reset")}</button></div>
        <button class="btn block" data-ph="make"${busy ? " disabled" : ""} style="margin-top:10px">${busy ? T("استنى شوية…", "Please wait…") : T("اعمل الصورة", "Make the photo")}</button>` : ""}
      ${result ? `<div class="card pt-res ${result.ok ? "ok" : "warn"}">
        <img class="ph-out" src="${result.url}" alt="">
        <p>${result.ok ? T(`تمام ✅ ${P.w}×${P.h} بكسل، وحجمها ${fmt(result.blob.size)}.`, `Done ✅ ${P.w}×${P.h} px, ${fmt(result.blob.size)}.`) : T(`حجمها ${fmt(result.blob.size)} ولسه أكبر من المطلوب. صغّر المقاس شوية وجرب تاني.`, `It's ${fmt(result.blob.size)}, still too big. Reduce the dimensions and try again.`)}</p>
        <button class="btn block" data-ph="share">${C.icon("ext")}${T("احفظ الصورة أو ابعتها", "Save or send the photo")}</button></div>` : ""}
      <div class="card ph-tips"><b>💡 ${T("نصايح لصورة مقبولة", "Tips for an accepted photo")}</b><ul class="bullets">
        <li>${T("خلفية بيضاء سادة: وقّف الطالب قدام حيطة بيضا أو ملاية بيضا.", "Plain white background: stand the student in front of a white wall or sheet.")}</li>
        <li>${T("نور النهار من قدام الوش، ومن غير ضل ورا الطالب.", "Daylight facing the face, no shadow behind.")}</li>
        <li>${T("الوش في نص الصورة وباصص للكاميرا، والكتفين باينين.", "Face centred, looking at the camera, shoulders visible.")}</li>
        <li>${T("صورة حديثة، من غير نضارة شمس ولا فلاتر.", "A recent photo, no sunglasses or filters.")}</li></ul></div>`;
  }
  function draw() { const root = document.getElementById("phRoot"); if (!root) return; root.innerHTML = html(); bind(); preview(); }
  function bind() {
    const root = document.getElementById("phRoot"); if (!root) return;
    const f = document.getElementById("phFile");
    if (f) f.onchange = async () => {
      const file = f.files && f.files[0]; if (!file) return;
      try {
        let im;
        try { im = await createImageBitmap(file, { imageOrientation: "from-image" }); }
        catch (e) { im = await new Promise((res, rej) => { const x = new Image(); x.onload = () => res(x); x.onerror = rej; x.src = URL.createObjectURL(file); }); }
        img = im; zoom = 1; ox = oy = 0; rot = 0; bright = 0; result = null; draw();
      } catch (e) { C.toast(T("مقدرناش نفتح الصورة دي", "Couldn't open this photo")); }
    };
    const num = (id, k) => { const el = document.getElementById(id); if (el) el.onchange = () => { const v = Math.round(+el.value); if (v > 0) { P[k] = v; saveSpec(); result = null; clamp(); draw(); } }; };
    num("phW", "w"); num("phH", "h"); num("phKB", "kb");
    const z = document.getElementById("phZoom"); if (z) z.oninput = () => { zoom = +z.value / 100; clamp(); preview(); result = null; };
    const br = document.getElementById("phBr"); if (br) br.oninput = () => { bright = +br.value; preview(); result = null; };
    const cv = document.getElementById("phCv");
    if (cv) {
      let st = null;
      cv.onpointerdown = (e) => { st = { x: e.clientX, y: e.clientY, ox, oy }; cv.setPointerCapture(e.pointerId); };
      cv.onpointermove = (e) => { if (!st) return; ox = st.ox + (e.clientX - st.x) / cv.clientWidth; oy = st.oy + (e.clientY - st.y) / cv.clientHeight; clamp(); preview(); };
      cv.onpointerup = cv.onpointercancel = () => { if (st) { st = null; result = null; } };
    }
    root.onclick = (e) => {
      const b = e.target.closest("[data-ph]"); if (!b || busy) return;
      const a = b.dataset.ph;
      if (a === "preset") { const x = PRESETS.find((y) => y.id === b.dataset.id); P.preset = x.id; if (x.w) { P.w = x.w; P.h = x.h; P.kb = x.kb; } saveSpec(); clamp(); }
      else if (a === "rot") { rot = (rot + 90) % 360; ox = oy = 0; clamp(); }
      else if (a === "reset") { zoom = 1; ox = oy = 0; rot = 0; bright = 0; }
      else if (a === "make") return make();
      else if (a === "share") return share();
      else return;
      result = null; draw();
    };
  }
  window.PhotoTool = {
    view: (ctx) => { C = ctx; return `<div id="phRoot">${html()}</div>`; },
    mount: (ctx) => { C = ctx; bind(); preview(); }
  };
})();
