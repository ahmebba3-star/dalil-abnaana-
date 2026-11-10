// يملأ إعدادات التطبيق قبل البناء — fills build-time config
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const repo = process.env.GITHUB_REPOSITORY || "";
const branch = process.env.GITHUB_REF_NAME || "main";
const newsUrl = process.env.NEWS_URL || (repo ? `https://raw.githubusercontent.com/${repo}/${branch}/news.json` : "");
const privacyUrl = process.env.PRIVACY_URL || (repo ? `https://github.com/${repo}/blob/${branch}/PRIVACY.md` : "");
const termsUrl = process.env.TERMS_URL || (repo ? `https://github.com/${repo}/blob/${branch}/TERMS.md` : "");
const callsEnabled = process.env.CALLS_ENABLED === "1";
const assistantUrl = String(process.env.ASSISTANT_URL || "").trim().replace(/\/+$/, "");
const banner = (process.env.ADMOB_BANNER_ID || "").trim();
const inter = (process.env.ADMOB_INTERSTITIAL_ID || "").trim();
const rewarded = (process.env.ADMOB_REWARDED_ID || "").trim();
const version = require(path.join(root, "package.json")).version;

const cfgPath = path.join(root, "www/js/config.js");
let cfg = fs.readFileSync(cfgPath, "utf8");
cfg = cfg
  .replace(/NEWS_URL: ".*?"/, `NEWS_URL: "${newsUrl || "__NEWS_URL__"}"`)
  .replace(/ADMOB_BANNER_ID: ".*?"/, `ADMOB_BANNER_ID: "${banner || "__ADMOB_BANNER_ID__"}"`)
  .replace(/ADMOB_INTERSTITIAL_ID: ".*?"/, `ADMOB_INTERSTITIAL_ID: "${inter || "__ADMOB_INTERSTITIAL_ID__"}"`)
  .replace(/ADMOB_REWARDED_ID: ".*?"/, `ADMOB_REWARDED_ID: "${rewarded || "__ADMOB_REWARDED_ID__"}"`)
  .replace(/ADMOB_TESTING: (true|false)/, `ADMOB_TESTING: ${banner ? "false" : "true"}`)
  .replace(/PRIVACY_URL: ".*?"/, `PRIVACY_URL: "${privacyUrl || "__PRIVACY_URL__"}"`)
  .replace(/TERMS_URL: ".*?"/, `TERMS_URL: "${termsUrl || "__TERMS_URL__"}"`)
  .replace(/CALLS_ENABLED: (true|false)/, `CALLS_ENABLED: ${callsEnabled}`)
  .replace(/ASSISTANT_URL: ".*?"/, `ASSISTANT_URL: "${/^https:\/\/[^"\s]+$/.test(assistantUrl) ? assistantUrl : "__ASSISTANT_URL__"}"`)
  .replace(/VERSION: ".*?"/, `VERSION: "${version}"`);
fs.writeFileSync(cfgPath, cfg);
fs.copyFileSync(path.join(root, "news.json"), path.join(root, "www/news.json"));
JSON.parse(fs.readFileSync(path.join(root, "news.json"), "utf8")); // fail early if news.json is broken
// study content (مذاكرتي): bundled as the offline copy; the app also fetches the latest from GitHub
const studyFiles = fs.readdirSync(root).filter((f) => /^study(-[A-Za-z0-9]+)?\.json$/.test(f));
for (const f of studyFiles) {
  JSON.parse(fs.readFileSync(path.join(root, f), "utf8")); // fail early if a study file is broken
  fs.copyFileSync(path.join(root, f), path.join(root, "www", f));
}
console.log("config:", { newsUrl, privacyUrl, termsUrl, callsEnabled, assistantUrl, admob: banner ? "real" : "test", interstitial: inter ? "real" : "test", rewarded: rewarded ? "real" : "test", studyFiles, version });
