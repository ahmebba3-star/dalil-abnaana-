// يضبط مشروع أندرويد بعد إنشائه — patches the generated Android project
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const TEST_APP_ID = "ca-app-pub-3940256099942544~3347511713";
const admobAppId = (process.env.ADMOB_APP_ID || "").trim() || TEST_APP_ID;

// 1) AndroidManifest.xml
const mPath = path.join(root, "android/app/src/main/AndroidManifest.xml");
let m = fs.readFileSync(mPath, "utf8");
const perms = [
  "android.permission.INTERNET",
  "android.permission.POST_NOTIFICATIONS",
  "android.permission.ACCESS_COARSE_LOCATION",
  "android.permission.ACCESS_FINE_LOCATION",
  "android.permission.RECORD_AUDIO",
  "android.permission.MODIFY_AUDIO_SETTINGS",
  "android.permission.VIBRATE"
];
for (const p of perms) {
  if (!m.includes(`"${p}"`)) m = m.replace("</manifest>", `    <uses-permission android:name="${p}" />\n</manifest>`);
}
if (!m.includes("com.google.android.gms.ads.APPLICATION_ID")) {
  m = m.replace(/<application([^>]*)>/, `<application$1>\n        <meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="${admobAppId}" />`);
} else {
  m = m.replace(/(com\.google\.android\.gms\.ads\.APPLICATION_ID"\s+android:value=")[^"]*/, `$1${admobAppId}`);
}
if (!m.includes("default_notification_icon")) {
  m = m.replace(/<application([^>]*)>/, `<application$1>
        <meta-data android:name="com.google.firebase.messaging.default_notification_icon" android:resource="@drawable/ic_stat_notify" />
        <meta-data android:name="com.google.firebase.messaging.default_notification_color" android:resource="@color/notify_color" />`);
}
if (!m.includes('android:supportsRtl="true"')) m = m.replace(/<application/, '<application android:supportsRtl="true"');
fs.writeFileSync(mPath, m);

// 1b) resources: ringtone, notification icon and color
const res = path.join(root, "android/app/src/main/res");
const copyRes = (src, dir, name) => {
  const from = path.join(root, "assets", src);
  if (!fs.existsSync(from)) return console.warn("missing", src);
  fs.mkdirSync(path.join(res, dir), { recursive: true });
  fs.copyFileSync(from, path.join(res, dir, name));
};
copyRes("ringtone.wav", "raw", "ringtone.wav");
copyRes("ic_stat_notify.png", "drawable", "ic_stat_notify.png");
fs.mkdirSync(path.join(res, "values"), { recursive: true });
fs.writeFileSync(path.join(res, "values/notify_color.xml"), '<?xml version="1.0" encoding="utf-8"?>\n<resources><color name="notify_color">#148F8C</color></resources>\n');

// 1c) variables.gradle: include Google sign-in libraries
const vPath = path.join(root, "android/variables.gradle");
let v = fs.readFileSync(vPath, "utf8");
if (!v.includes("rgcfaIncludeGoogle")) v = v.replace(/ext \{/, "ext {\n    rgcfaIncludeGoogle = true");
fs.writeFileSync(vPath, v);

// 2) app/build.gradle: version from CI + release signing from env
const gPath = path.join(root, "android/app/build.gradle");
let g = fs.readFileSync(gPath, "utf8");
const version = require(path.join(root, "package.json")).version;
g = g.replace(/versionCode \d+/, 'versionCode Integer.parseInt(System.getenv("VERSION_CODE") ?: "1")');
g = g.replace(/versionName "[^"]*"/, `versionName "${version}"`);
if (!g.includes("signingConfigs {")) {
  g = g.replace(/(\n\s*buildTypes \{)/, `
    signingConfigs {
        release {
            def ks = System.getenv("KEYSTORE_FILE")
            if (ks != null && new File(ks).exists()) {
                storeFile file(ks)
                storePassword System.getenv("KEYSTORE_PASSWORD")
                keyAlias System.getenv("KEY_ALIAS") ?: "dalil"
                keyPassword System.getenv("KEYSTORE_PASSWORD")
            }
        }
    }$1`);
  g = g.replace(/(buildTypes \{\s*release \{)/, `$1\n            if (System.getenv("KEYSTORE_FILE") != null) { signingConfig signingConfigs.release }`);
}
fs.writeFileSync(gPath, g);
console.log("android patched (admob app id:", admobAppId === TEST_APP_ID ? "test" : "real", ")");
