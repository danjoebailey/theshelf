// Commit craft scores + vibes from the honesty-guarded scoring workflow
// (scripts/score-audit/out/) into public/book-tags.json. Only entries the
// agents marked knows:true AND confidence>=4 are committed. Schema is coerced
// to canonical per-genre shape: universal 8 + that genre's pack axes (present
// ones only — no fabrication) + 11 vibes. Preserves each book's `tags`.
//
// Dry (report + QA):  node scripts/apply-score-audit.cjs
// Write:              node scripts/apply-score-audit.cjs --write

const fs = require("fs"), path = require("path");
const WRITE = process.argv.includes("--write");
const TAGS_PATH = path.join(__dirname, "..", "public", "book-tags.json");
const BOOKS_PATH = path.join(__dirname, "..", "public", "book-data.json");
const OUT = path.join(__dirname, "score-audit", "out");

const tags = JSON.parse(fs.readFileSync(TAGS_PATH, "utf8"));
const books = JSON.parse(fs.readFileSync(BOOKS_PATH, "utf8"));
const byId = new Map(books.map(b => [b.id, b]));
const yr = b => { const m = String(b && b.publicationDate || "").match(/\d{4}/); return m ? +m[0] : 0; };

const UNIV = ["prose","characters","plot","pacing","ideas","resonance","ending","voice"];
const VIB = ["prose_craft","prose_style","warmth","intensity","pace","moral_complexity","fabulism","emotional_register","interiority","tone","difficulty"];
const PACK = { Fantasy:["worldBuilding","magicSystem"], "Graphic Novel":["worldBuilding","magicSystem"], "Sci-Fi":["worldBuilding","speculativeRigor"], Mystery:["puzzle","stakes"], Thriller:["stakes","twists"], Romance:["chemistry","tension","heaPayoff"], "Young Adult":["chemistry","tension","heaPayoff"], Horror:["atmosphere","dread"], "Historical Fiction":["periodAuthenticity","researchIntegration"], Fiction:[], "Literary Fiction":[], "Urban Fantasy":[] };

const okInt = v => Number.isInteger(v) && v >= 0 && v <= 10;

function parseLoose(t){ try{return JSON.parse(t)}catch(e){return JSON.parse(t.replace(/^﻿/,"").trim().replace(/^```(?:json)?/i,"").replace(/```$/,"").replace(/,(\s*[\]}])/g,"$1"))} }
let all = [];
for (const f of fs.readdirSync(OUT).filter(f => f.endsWith(".json"))) {
  try { all.push(...parseLoose(fs.readFileSync(path.join(OUT, f), "utf8"))); } catch (e) {}
}

let committed = 0, skipped = 0;
const byId2 = new Map();
for (const x of all) {
  if (!(x.knows && x.confidence >= 4)) continue;
  const b = byId.get(x.id);
  if (!b) { skipped++; continue; }
  const exp = [...UNIV, ...(PACK[b.genre] || [])];
  const scores = {};
  for (const k of exp) if (okInt(x.scores?.[k])) scores[k] = x.scores[k];
  const vibes = {};
  for (const k of VIB) if (okInt(x.vibes?.[k])) vibes[k] = x.vibes[k];
  // require full universal 8 + all 11 vibes; pack may be partial
  if (UNIV.some(k => !(k in scores)) || VIB.some(k => !(k in vibes))) { skipped++; continue; }
  byId2.set(x.id, { scores, vibes });
}

// ---- QA (dry) ----
console.log("=== SCORE AUDIT " + (WRITE ? "(WRITING)" : "(DRY RUN)") + " ===");
console.log("commit-ready:", byId2.size, "| skipped (invalid/unknown book):", skipped);
const OBSCURE = { 9378:"A Dawn of Onyx", 9379:"A Promise of Peridot", 7780:"A Court of Honey and Ash", 9382:"Quicksilver", 1083:"Onyx Storm" };
console.log("\nHONESTY spot-check (known-obscure should be LEFT):");
for (const id in OBSCURE) console.log("    #" + id + " " + OBSCURE[id] + " -> " + (byId2.has(+id) ? "!! SCORED" : "left unscored OK"));
const left = all.filter(x => !(x.knows && x.confidence >= 4)).map(x => byId.get(x.id)).filter(Boolean);
console.log("\nSample LEFT unscored (should be obscure/recent):");
left.filter(b => yr(b) >= 2020).slice(0, 8).forEach(b => console.log("    " + yr(b) + "  " + b.title + " — " + b.author));

if (WRITE) {
  const backup = TAGS_PATH.replace(/\.json$/, ".backup-pre-score-audit.json");
  fs.copyFileSync(TAGS_PATH, backup);
  for (const [id, data] of byId2) {
    const entry = tags[id] || { tags: [] };
    if (!Array.isArray(entry.tags)) entry.tags = [];
    entry.scores = data.scores;
    entry.vibes = data.vibes;
    tags[id] = entry;
  }
  fs.writeFileSync(TAGS_PATH, JSON.stringify(tags));
  console.log("\nBacked up -> " + path.basename(backup));
  console.log("Wrote " + byId2.size + " scored entries to " + path.basename(TAGS_PATH));
} else {
  console.log("\n(dry run — nothing written. Re-run with --write to commit.)");
}
