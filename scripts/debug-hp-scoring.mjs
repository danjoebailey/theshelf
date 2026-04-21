// Run Harry Potter through the full scoring pipeline against a proxy profile
// built from the user's known literary-fantasy reads. Shows every stage.
import { readFileSync } from "fs";
import { buildUserProfile, scoreBook, craftHardFilter, getBucket } from "../src/lib/recommender.js";

const primary = JSON.parse(readFileSync("./public/book-data.json", "utf8"));
const rec = JSON.parse(readFileSync("./public/rec-library.json", "utf8"));
const tags = JSON.parse(readFileSync("./public/book-tags.json", "utf8"));
const all = [...primary, ...rec];

// Proxy profile: user's confirmed 4-5 star reads with enough coverage to
// populate fantasy + literary buckets. Ratings below reflect taste patterns
// known from prior conversations (heavy/literary/grim preferences).
const proxyRatings = [
  // Literary — sets global prose_craft/warmth/intensity baseline
  { title: "Blood Meridian", author: "Cormac McCarthy", rating: 5 },
  { title: "Stoner", author: "John Williams", rating: 5 },
  { title: "Gilead", author: "Marilynne Robinson", rating: 5 },
  { title: "Suttree", author: "Cormac McCarthy", rating: 5 },
  { title: "The Road", author: "Cormac McCarthy", rating: 5 },
  { title: "Pale Fire", author: "Vladimir Nabokov", rating: 5 },
  { title: "Lolita", author: "Vladimir Nabokov", rating: 5 },

  // Fantasy — sets fantasy bucket profile
  { title: "Gardens of the Moon", author: "Steven Erikson", rating: 5 },
  { title: "Deadhouse Gates", author: "Steven Erikson", rating: 5 },
  { title: "Memories of Ice", author: "Steven Erikson", rating: 5 },
  { title: "House of Chains", author: "Steven Erikson", rating: 4 },
  { title: "The Way of Kings", author: "Brandon Sanderson", rating: 5 },
  { title: "Words of Radiance", author: "Brandon Sanderson", rating: 5 },
  { title: "Mistborn: The Final Empire", author: "Brandon Sanderson", rating: 4 },
  { title: "The Blade Itself", author: "Joe Abercrombie", rating: 5 },
  { title: "Before They Are Hanged", author: "Joe Abercrombie", rating: 5 },
  { title: "Last Argument of Kings", author: "Joe Abercrombie", rating: 5 },
  { title: "The Name of the Wind", author: "Patrick Rothfuss", rating: 5 },
  { title: "The Fellowship of the Ring", author: "J.R.R. Tolkien", rating: 5 },
  { title: "The Eye of the World", author: "Robert Jordan", rating: 4 },
  { title: "The Shadow of the Torturer", author: "Gene Wolfe", rating: 5 },
  { title: "The Claw of the Conciliator", author: "Gene Wolfe", rating: 5 },
  { title: "The Sword of the Lictor", author: "Gene Wolfe", rating: 5 },
];

// Resolve each to its catalog id so buildUserProfile can find tags
const norm = s => (s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
const resolved = [];
for (const r of proxyRatings) {
  const hit = all.find(b => norm(b.title) === norm(r.title) && norm(b.author) === norm(r.author));
  if (hit && tags[String(hit.id)]?.scores) {
    resolved.push({ ...r, id: hit.id, genre: hit.genre });
  } else {
    console.log(`MISSING: ${r.title} / ${r.author}`);
  }
}
console.log(`\nProxy profile: ${resolved.length}/${proxyRatings.length} resolved\n`);

const tagData = {};
for (const r of resolved) tagData[String(r.id)] = tags[String(r.id)];
const profile = buildUserProfile(resolved, tagData);

console.log("=== PROFILE SNAPSHOT ===");
console.log("Global vibes:", profile.globalVibes);
const fb = profile.bucketProfiles.speculative;
console.log(`\nSpeculative bucket (n=${fb?.bookCount}):`);
if (fb) console.log("  vibes:", fb.vibes);

const fantasyCraft = profile.craftProfile?.buckets?.fantasy;
console.log(`\nFantasy craft bucket:`);
if (fantasyCraft) {
  for (const [axis, s] of Object.entries(fantasyCraft)) {
    console.log(`  ${axis.padEnd(18)} mean=${s.mean.toFixed(2).padStart(5)} sd=${s.sd.toFixed(2)} weight=${s.weight.toFixed(3)} n=${s.n}`);
  }
}

console.log("\n=== HARRY POTTER (Sorcerer's Stone, id=660) ===");
const hp = all.find(b => b.id === 660);
const hpTags = tags["660"];
console.log("HP scores:", hpTags.scores);
console.log("HP vibes: ", hpTags.vibes);

// Per-axis z and penalty for fantasy bucket
if (fantasyCraft) {
  console.log("\n  HP craft breakdown vs fantasy profile:");
  function craftPenalty(z) {
    if (z >= 2) return 0.1;
    if (z >= 0) return 0.05 * z;
    if (z >= -1) return 0;
    if (z >= -2) return -0.4 * (Math.abs(z) - 1);
    return -0.4;
  }
  let weightedSum = 0, totalWeight = 0;
  for (const [axis, score] of Object.entries(hpTags.scores)) {
    const s = fantasyCraft[axis];
    if (!s || s.weight <= 0) continue;
    const z = (score - s.mean) / s.sd;
    const f = craftPenalty(z);
    const contrib = s.weight * f;
    weightedSum += contrib; totalWeight += s.weight;
    const flag = z < -2 ? " ← WOULD HARD-FILTER (if n≥5 & weight≥0.15)" : z < -1 ? " ← soft penalty" : "";
    console.log(`    ${axis.padEnd(18)} score=${score}  z=${z.toFixed(2).padStart(6)}  f(z)=${f.toFixed(3).padStart(6)}  weighted=${contrib.toFixed(3)}${flag}`);
  }
  const craftMatch = Math.max(0.5, 1 + weightedSum / (totalWeight || 1));
  console.log(`\n  raw craftMatch = 1 + ${(weightedSum / (totalWeight || 1)).toFixed(3)} = ${(1 + weightedSum / (totalWeight || 1)).toFixed(3)}`);
  console.log(`  after 0.5 floor clamp: craftMatch = ${craftMatch.toFixed(3)}`);
}

const filtered = craftHardFilter(hp, hpTags, profile.craftProfile);
console.log(`\n  hard filter triggered? ${filtered}`);

const score = scoreBook(hp, hpTags, profile);
console.log(`\n  final paigeScore = ${score?.toFixed(3)}`);

// For comparison: a book the user would actually like
console.log("\n=== COMPARISON: Gardens of the Moon (known 5★) ===");
const gotm = all.find(b => b.title === "Gardens of the Moon");
if (gotm && tags[String(gotm.id)]) {
  const gotmScore = scoreBook(gotm, tags[String(gotm.id)], profile);
  console.log(`  paigeScore = ${gotmScore?.toFixed(3)}`);
}
