// Apply the rec-library subgenre audit to public/book-tags.json.
// Mirrors scripts/apply-subgenre-audit.cjs but for rec-library.json candidates
// (chunk output in scripts/subgenre-audit-rec/out/). Reconciles ONLY the 51
// surfaced subgenre tags for each rec candidate; never touches genre or other
// tags. Romantasy stands alone (drops structural-fantasy co-tags). Fantasy-
// first overrides (books where romance is secondary -> drop romantasy) are
// passed in by id after review.
//
// Dry:    node scripts/apply-subgenre-audit-rec.cjs
// Write:  node scripts/apply-subgenre-audit-rec.cjs --write

const fs = require("fs"), path = require("path");
const WRITE = process.argv.includes("--write");
const TAGS_PATH = path.join(__dirname, "..", "public", "book-tags.json");
const REC_PATH = path.join(__dirname, "..", "public", "rec-library.json");
const OUT = path.join(__dirname, "subgenre-audit-rec", "out");

const tags = JSON.parse(fs.readFileSync(TAGS_PATH, "utf8"));
const rec = JSON.parse(fs.readFileSync(REC_PATH, "utf8"));
const byId = new Map(rec.map(b => [b.id, b]));

const SURFACED = new Set(["romantasy","grimdark","cozy-fantasy","urban-fantasy","sword-and-sorcery","portal-fantasy","epic-fantasy","mythic-retellings","fairy-tale-retelling","progression-fantasy","steampunk","space-opera","cyberpunk","hard-sf","soft-sf","military-sf","post-apocalyptic","dystopian","time-travel","alternate-history","new-weird","first-contact","cozy-mystery","noir","hardboiled","police-procedural","historical-mystery","domestic-thriller","spy-thriller","techno-thriller","political-thriller","legal-thriller","scandi-noir","gothic-horror","cosmic-horror","supernatural-horror","folk-horror","body-horror","splatterpunk","quiet-horror","contemporary-romance","historical-romance","paranormal-romance","sports-romance","queer-romance","rom-com","dark-romance","magical-realism","family-saga","autofiction","bildungsroman"]);
const STRUCTURAL_FANTASY = new Set(["epic-fantasy","urban-fantasy","mythic-retellings","sword-and-sorcery","grimdark","progression-fantasy","cozy-fantasy","portal-fantasy","steampunk","fairy-tale-retelling"]);

// Fantasy-first rec books (romance secondary) -> drop romantasy. Fill after review.
const FANTASY_FIRST_IDS = new Set([
  11583, 11584, 11585, // Deborah Harkness — All Souls (urban fantasy, romance secondary)
  11624,               // Succubus Blues — Richelle Mead (paranormal UF)
  14274, 14275, 14276, // The Winner's trilogy — Marie Rutkoski (political YA fantasy)
  14486,               // Winter's Tale — Mark Helprin (literary)
]);

function parseLoose(t){ try{return JSON.parse(t)}catch(e){return JSON.parse(t.replace(/^﻿/,"").trim().replace(/^```(?:json)?/i,"").replace(/```$/,"").replace(/,(\s*[\]}])/g,"$1"))} }
const proposed = new Map();
for (const f of fs.readdirSync(OUT).filter(f => f.endsWith(".json"))) {
  for (const r of parseLoose(fs.readFileSync(path.join(OUT, f), "utf8"))) {
    proposed.set(r.id, (r.subgenres || []).filter(s => SURFACED.has(s)));
  }
}

function resolve(id, list) {
  let set = new Set(list);
  if (set.has("romantasy")) {
    if (FANTASY_FIRST_IDS.has(id)) set.delete("romantasy");
    else for (const t of [...set]) if (STRUCTURAL_FANTASY.has(t)) set.delete(t);
  }
  return set;
}

let booksChanged = 0, adds = 0, removes = 0, fills = 0;
const after = {}; SURFACED.forEach(t => after[t] = 0);
const newRomantasy = [];
for (const [id, list] of proposed) {
  if (!byId.has(id)) continue;
  const finalSet = resolve(id, list);
  finalSet.forEach(t => after[t]++);
  const entry = tags[id] || { tags: [] };
  if (!Array.isArray(entry.tags)) entry.tags = [];
  const cur = entry.tags;
  const curSub = cur.filter(t => SURFACED.has(t));
  const kept = cur.filter(t => !SURFACED.has(t));
  const finalArr = [...finalSet];
  const added = finalArr.filter(t => !curSub.includes(t));
  const removed = curSub.filter(t => !finalSet.has(t));
  if (finalSet.has("romantasy") && !curSub.includes("romantasy")) { const b = byId.get(id); newRomantasy.push("    " + b.title + " — " + b.author + " [" + b.genre + "]"); }
  if (added.length || removed.length) {
    booksChanged++; adds += added.length; removes += removed.length;
    if (curSub.length === 0 && finalArr.length > 0) fills++;
    entry.tags = [...kept, ...finalArr];
    tags[id] = entry;
  }
}

console.log("=== REC-LIBRARY SUBGENRE RECONCILE " + (WRITE ? "(WRITING)" : "(DRY RUN)") + " ===");
console.log("books changed:", booksChanged, "| adds:", adds, "| removes:", removes, "| recall fills:", fills);
console.log("rec books newly tagged romantasy:", newRomantasy.length);
console.log("\nTop subgenres applied in rec library:");
Object.keys(after).sort((a,b)=>after[b]-after[a]).slice(0,15).forEach(t=>console.log("  "+String(after[t]).padStart(4)+"  "+t));
console.log("\n=== NEW ROMANTASY in rec (review for fantasy-first strays) ===");
newRomantasy.sort().forEach(s=>console.log(s));

if (WRITE) {
  const backup = TAGS_PATH.replace(/\.json$/, ".backup-pre-rec-subgenre.json");
  fs.copyFileSync(TAGS_PATH, backup);
  fs.writeFileSync(TAGS_PATH, JSON.stringify(tags));
  console.log("\nBacked up -> " + path.basename(backup) + "; wrote book-tags.json");
} else {
  console.log("\n(dry run — nothing written.)");
}
