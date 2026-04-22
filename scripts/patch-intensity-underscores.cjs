// Targeted intensity patches from the audit. Each change is a bump from
// under-scored to what the spec's "relentlessly visceral/graphic" anchor
// actually fits for these works.
const fs = require("fs");
const path = require("path");

const TAGS_PATH = path.join(__dirname, "..", "public", "book-tags.json");
const tags = JSON.parse(fs.readFileSync(TAGS_PATH, "utf8"));

const patches = [
  // Céline early novels — textbook 8-9 visceral war/poverty
  { id: 1321, axis: "intensity", from: 7, to: 9, why: "Journey to the End of the Night — bleak WWI + colonial + interwar squalor" },
  { id: 1322, axis: "intensity", from: 7, to: 9, why: "Death on the Installment Plan — childhood brutality, peer-level with Journey" },
  { id: 1323, axis: "intensity", from: 6, to: 8, why: "Castle to Castle — WWII exile trilogy opener, visceral chaos" },
  { id: 1370, axis: "intensity", from: 7, to: 8, why: "Guignol's Band — fragmented WWI London, high visceral register" },

  // Bukowski — final hardboiled noir under-scored
  { id: 1317, axis: "intensity", from: 5, to: 7, why: "Pulp — hardboiled noir with death/aliens, more visceral than 5" },

  // Abercrombie First Law — trilogy is notably violent/grim
  { id: 308, axis: "intensity", from: 7, to: 8, why: "The Blade Itself — brutal torture scenes, grim tone throughout" },
  { id: 309, axis: "intensity", from: 7, to: 8, why: "Before They Are Hanged — war, siege, torture peak mid-trilogy" },
  { id: 311, axis: "intensity", from: 7, to: 8, why: "Best Served Cold — standalone revenge thriller, peers with trilogy" },

  // Pizzolatto — dark Southern noir
  { id: 5973, axis: "intensity", from: 7, to: 8, why: "Between Here and the Yellow Sea — bleak story collection, 8 fits" },
];

let changed = 0;
for (const p of patches) {
  const te = tags[String(p.id)];
  if (!te?.vibes) { console.log(`[skip] ${p.id}: no tag entry`); continue; }
  const cur = te.vibes[p.axis];
  if (cur !== p.from) {
    console.log(`[skip] ${p.id}: ${p.axis}=${cur} (expected ${p.from})  ${p.why}`);
    continue;
  }
  te.vibes[p.axis] = p.to;
  console.log(`[fix] ${p.id}: ${p.axis} ${p.from} → ${p.to}  ${p.why}`);
  changed++;
}

fs.writeFileSync(TAGS_PATH, JSON.stringify(tags));
console.log(`\nPatched ${changed}/${patches.length} entries. Total tag entries: ${Object.keys(tags).length}`);
