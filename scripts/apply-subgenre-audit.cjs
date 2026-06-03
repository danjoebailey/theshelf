// Apply the catalog subgenre audit to public/book-tags.json.
//
// Source of truth = the per-chunk classifier output in scripts/subgenre-audit/out/.
// Reconciles ONLY the 51 surfaced subgenre tags for each candidate book:
// adds the missing, removes the wrong, leaves none where none fits. Never
// touches `genre`, craft/setting/POV tags, or the intentionally-pulled
// subgenre tags (wuxia/xianxia/dark-academia/litrpg).
//
// Romantasy rule (locked with user): `romantasy` is a standalone mode — when a
// book is genuinely romantasy it carries `romantasy` and NO structural-fantasy
// subgenre; when the romance is secondary, `romantasy` is dropped and the
// structural subgenre stays.
//
// Run dry (report only):   node scripts/apply-subgenre-audit.cjs
// Run for real (writes):   node scripts/apply-subgenre-audit.cjs --write

const fs = require("fs"), path = require("path");
const WRITE = process.argv.includes("--write");

const TAGS_PATH = path.join(__dirname, "..", "public", "book-tags.json");
const BOOKS_PATH = path.join(__dirname, "..", "public", "book-data.json");
const OUT = path.join(__dirname, "subgenre-audit", "out");

const tags = JSON.parse(fs.readFileSync(TAGS_PATH, "utf8"));
const books = JSON.parse(fs.readFileSync(BOOKS_PATH, "utf8"));
const byId = new Map(books.map(b => [b.id, b]));

const SURFACED = new Set(["romantasy","grimdark","cozy-fantasy","urban-fantasy","sword-and-sorcery","portal-fantasy","epic-fantasy","mythic-retellings","fairy-tale-retelling","progression-fantasy","steampunk","space-opera","cyberpunk","hard-sf","soft-sf","military-sf","post-apocalyptic","dystopian","time-travel","alternate-history","new-weird","first-contact","cozy-mystery","noir","hardboiled","police-procedural","historical-mystery","domestic-thriller","spy-thriller","techno-thriller","political-thriller","legal-thriller","scandi-noir","gothic-horror","cosmic-horror","supernatural-horror","folk-horror","body-horror","splatterpunk","quiet-horror","contemporary-romance","historical-romance","paranormal-romance","sports-romance","queer-romance","rom-com","dark-romance","magical-realism","family-saga","autofiction","bildungsroman"]);

// Structural-fantasy subgenres that romantasy must NOT co-exist with.
const STRUCTURAL_FANTASY = new Set(["epic-fantasy","urban-fantasy","mythic-retellings","sword-and-sorcery","grimdark","progression-fantasy","cozy-fantasy","portal-fantasy","steampunk","fairy-tale-retelling"]);

// Books where the romance is NOT the engine -> drop romantasy, keep structural.
const norm = s => (s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
const FANTASY_FIRST = [
  { a: "tashasuri", t: "jasminethrone" },
  { a: "tashasuri", t: "oleandersword" },
  { a: "tashasuri", t: "lotusempire" },
  { a: "ilonaandrews", t: "magicbleeds" },
  { a: "avareid", t: "ladymacbeth" },
  { a: "marionzimmerbradley", t: "foresthouse" },
  { a: "heatherfawcett", t: "emilywilde" }, // both Emily Wilde titles
];
function isFantasyFirst(b) {
  const an = norm(b.author), tn = norm(b.title);
  return FANTASY_FIRST.some(r => an.includes(r.a) && tn.includes(r.t));
}

// ---- load proposed classifications ----
function parseLoose(t) {
  try { return JSON.parse(t); }
  catch (e) { return JSON.parse(t.replace(/^﻿/, "").trim().replace(/^```(?:json)?/i, "").replace(/```$/, "").replace(/,(\s*[\]}])/g, "$1")); }
}
const proposed = new Map();
for (const f of fs.readdirSync(OUT).filter(f => f.endsWith(".json"))) {
  for (const r of parseLoose(fs.readFileSync(path.join(OUT, f), "utf8"))) {
    proposed.set(r.id, (r.subgenres || []).filter(s => SURFACED.has(s)));
  }
}

// ---- resolve each candidate's final subgenre set ----
let romStrays = 0, romCollapsed = 0;
function resolve(id, list) {
  let set = new Set(list);
  if (set.has("romantasy")) {
    const b = byId.get(id);
    if (b && isFantasyFirst(b)) { set.delete("romantasy"); romStrays++; }      // drop romantasy
    else {
      let collapsed = false;
      for (const t of [...set]) if (STRUCTURAL_FANTASY.has(t)) { set.delete(t); collapsed = true; }
      if (collapsed) romCollapsed++;                                            // romantasy stands alone
    }
  }
  return set;
}

// ---- reconcile book-tags.json (subgenre namespace only) ----
let booksChanged = 0, adds = 0, removes = 0, fills = 0, cleared = 0;
const after = {}; SURFACED.forEach(t => after[t] = 0);
for (const [id, list] of proposed) {
  if (!byId.has(id)) continue;                 // ignore any non-candidate id
  const finalSet = resolve(id, list);
  finalSet.forEach(t => after[t]++);

  const entry = tags[id] || { tags: [] };
  if (!Array.isArray(entry.tags)) entry.tags = [];
  const cur = entry.tags;
  const curSub = cur.filter(t => SURFACED.has(t));
  const kept = cur.filter(t => !SURFACED.has(t));           // preserve everything else
  const finalArr = [...finalSet];

  const added = finalArr.filter(t => !curSub.includes(t));
  const removed = curSub.filter(t => !finalSet.has(t));
  if (added.length || removed.length) {
    booksChanged++; adds += added.length; removes += removed.length;
    if (curSub.length === 0 && finalArr.length > 0) fills++;
    if (curSub.length > 0 && finalArr.length === 0) cleared++;
    entry.tags = [...kept, ...finalArr];
    tags[id] = entry;
  }
}

console.log("=== SUBGENRE AUDIT RECONCILE " + (WRITE ? "(WRITING)" : "(DRY RUN)") + " ===");
console.log("romantasy strays dropped:", romStrays, "| genuine romantasy collapsed to standalone:", romCollapsed);
console.log("books changed:", booksChanged, "| tag adds:", adds, "| tag removes:", removes);
console.log("recall fills (none->some):", fills, "| cleared (some->none):", cleared);
console.log("\nfinal romantasy count:", after["romantasy"]);
console.log("\n=== FINAL PER-TAG COUNTS ===");
Object.keys(after).sort((a, b) => after[b] - after[a]).forEach(t => console.log("  " + String(after[t]).padStart(4) + "  " + t));

if (WRITE) {
  const backup = TAGS_PATH.replace(/\.json$/, ".backup-pre-subgenre-audit.json");
  fs.copyFileSync(TAGS_PATH, backup);
  fs.writeFileSync(TAGS_PATH, JSON.stringify(tags));
  console.log("\nBacked up ->", path.basename(backup));
  console.log("Wrote", path.basename(TAGS_PATH));
} else {
  console.log("\n(dry run — nothing written. Re-run with --write to commit.)");
}
