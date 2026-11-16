// Extracts the handful of Solar icons the site uses (via Iconify's data
// package) into content/icons.json, so no icon request is made at runtime.
//   node scripts/build-icons.mjs
import { createRequire } from "node:module";
import { writeFile } from "node:fs/promises";
const require = createRequire(import.meta.url);
const solar = require("@iconify-json/solar/icons.json");

const NAMES = [
  "heart-linear", "heart-bold", "chat-round-linear", "repeat-linear", "bookmark-linear",
  "bookmark-bold", "arrow-right-linear", "arrow-right-up-linear", "map-point-linear",
  "phone-linear", "hamburger-menu-linear", "close-circle-linear", "pause-bold", "play-bold",
  "alt-arrow-down-linear", "alt-arrow-left-linear", "alt-arrow-right-linear", "paw-bold",
  "clock-circle-linear", "restart-linear", "menu-dots-bold", "cup-hot-linear",
  "umbrella-linear", "signpost-linear", "verified-check-bold", "pen-new-square-linear",
  "stars-minimalistic-bold",
];
const out = {};
for (const n of NAMES) {
  const icon = solar.icons[n];
  if (!icon) { console.warn("missing", n); continue; }
  out[n] = icon.body;
}
await writeFile(new URL("../content/icons.json", import.meta.url), JSON.stringify(out, null, 1) + "\n");
console.log(Object.keys(out).length + "/" + NAMES.length + " icons written");
