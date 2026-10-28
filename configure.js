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
const banner = (process.env.ADMOB_BANNER_ID || "").trim();
const version = require(path.join(root, "package.json")).version;

const cfgPath = path.join(root, "www/js/config.js");
let cfg = fs.readFileSync(cfgPath, "utf8");
cfg = cfg
  .replace(/NEWS_URL: ".*?"/, `NEWS_URL: "${newsUrl || "__NEWS_URL__"}"`)
  .replace(/ADMOB_BANNER_ID: ".*?"/, `ADMOB_BANNER_ID: "${banner || "__ADMOB_BANNER_ID__"}"`)
  .replace(/ADMOB_TESTING: (true|false)/, `ADMOB_TESTING: ${banner ? "false" : "true"}`)
  .replace(/PRIVACY_URL: ".*?"/, `PRIVACY_URL: "${privacyUrl || "__PRIVACY_URL__"}"`)
  .replace(/TERMS_URL: ".*?"/, `TERMS_URL: "${termsUrl || "__TERMS_URL__"}"`)
  .replace(/CALLS_ENABLED: (true|false)/, `CALLS_ENABLED: ${callsEnabled}`)
  .replace(/VERSION: ".*?"/, `VERSION: "${version}"`);
fs.writeFileSync(cfgPath, cfg);
fs.copyFileSync(path.join(root, "news.json"), path.join(root, "www/news.json"));
JSON.parse(fs.readFileSync(path.join(root, "news.json"), "utf8")); // fail early if news.json is broken
console.log("config:", { newsUrl, privacyUrl, termsUrl, callsEnabled, admob: banner ? "real" : "test", version });
