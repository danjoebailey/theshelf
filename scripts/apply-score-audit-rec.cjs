// Commit craft scores + vibes from the rec-library honesty-guarded scoring
// workflow (scripts/score-audit-rec/out/) into public/book-tags.json. Mirrors
// scripts/apply-score-audit.cjs but for rec-library.json candidates. Only
// knows:true AND confidence>=4 committed; schema coerced to canonical per-genre
// shape (universal 8 + genre pack present-only + 11 vibes). Preserves `tags`.
//
// Dry:    node scripts/apply-score-audit-rec.cjs
// Write:  node scripts/apply-score-audit-rec.cjs --write

const fs = require("fs"), path = require("path");
const WRITE = process.argv.includes("--write");
const TAGS_PATH = path.join(__dirname, "..", "public", "book-tags.json");
const REC_PATH = path.join(__dirname, "..", "public", "rec-library.json");
const OUT = path.join(__dirname, "score-audit-rec", "out");

const tags = JSON.parse(fs.readFileSync(TAGS_PATH, "utf8"));
const rec = JSON.parse(fs.readFileSync(REC_PATH, "utf8"));
const byId = new Map(rec.map(b => [b.id, b]));
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

const commit = new Map();
let skipped = 0;
for (const x of all) {
  if (!(x.knows && x.confidence >= 4)) continue;
  const b = byId.get(x.id);
  if (!b) { skipped++; continue; }
  const exp = [...UNIV, ...(PACK[b.genre] || [])];
  const scores = {}; for (const k of exp) if (okInt(x.scores?.[k])) scores[k] = x.scores[k];
  const vibes = {}; for (const k of VIB) if (okInt(x.vibes?.[k])) vibes[k] = x.vibes[k];
  if (UNIV.some(k => !(k in scores)) || VIB.some(k => !(k in vibes))) { skipped++; continue; }
  commit.set(x.id, { scores, vibes });
}

console.log("=== REC SCORE AUDIT " + (WRITE ? "(WRITING)" : "(DRY RUN)") + " ===");
console.log("commit-ready:", commit.size, "| skipped:", skipped);
const left = all.filter(x => !(x.knows && x.confidence >= 4)).map(x => byId.get(x.id)).filter(Boolean);
const scored2021 = [...commit.keys()].map(id => byId.get(id)).filter(b => b && yr(b) >= 2021).sort((a,b)=>yr(b)-yr(a));
console.log("\nSCORED & 2021+ (" + scored2021.length + ") — scrutinize:");
scored2021.slice(0, 12).forEach(b => console.log("    " + yr(b) + "  " + b.title + " — " + b.author));
console.log("\nSample LEFT unscored:");
left.slice(0, 8).forEach(b => console.log("    " + b.title + " — " + b.author));

if (WRITE) {
  const backup = TAGS_PATH.replace(/\.json$/, ".backup-pre-rec-score.json");
  fs.copyFileSync(TAGS_PATH, backup);
  for (const [id, data] of commit) {
    const entry = tags[id] || { tags: [] };
    if (!Array.isArray(entry.tags)) entry.tags = [];
    entry.scores = data.scores; entry.vibes = data.vibes;
    tags[id] = entry;
  }
  fs.writeFileSync(TAGS_PATH, JSON.stringify(tags));
  console.log("\nBacked up -> " + path.basename(backup) + "; wrote " + commit.size + " scored entries.");
} else {
  console.log("\n(dry run — nothing written.)");
}
