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
  "android.permission.ACCESS_FINE_LOCATION"
];
for (const p of perms) {
  if (!m.includes(`"${p}"`)) m = m.replace("</manifest>", `    <uses-permission android:name="${p}" />\n</manifest>`);
}
if (!m.includes("com.google.android.gms.ads.APPLICATION_ID")) {
  m = m.replace(/<application([^>]*)>/, `<application$1>\n        <meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="${admobAppId}" />`);
} else {
  m = m.replace(/(com\.google\.android\.gms\.ads\.APPLICATION_ID"\s+android:value=")[^"]*/, `$1${admobAppId}`);
}
if (!m.includes('android:supportsRtl="true"')) m = m.replace(/<application/, '<application android:supportsRtl="true"');
fs.writeFileSync(mPath, m);

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
