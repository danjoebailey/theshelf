// Find unscored books ranked by priority (tier, topRank, author cluster size)
// Prioritizes: tier 1/S books, books in top 1000 topRank, and bucket coverage gaps

const fs = require("fs");
const path = require("path");

const SIDECAR = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "public", "book-tags.json"), "utf8"));
const PRIMARY = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "public", "book-data.json"), "utf8"));
const REC = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "public", "rec-library.json"), "utf8"));
const ALL = [...PRIMARY, ...REC];

const BUCKETS = {
  Fiction: "literary", "Historical Fiction": "literary", Biography: "literary",
  Fantasy: "fantasy", "Graphic Novel": "fantasy",
  "Sci-Fi": "sf", Horror: "horror",
  Mystery: "mystery", Thriller: "thriller",
  Romance: "romance", "Young Adult": "romance",
  "Non-Fiction": "nonfiction", History: "nonfiction", "Self-Help": "nonfiction",
};

// Count scored by bucket
const scoredByBucket = {};
for (const b of ALL) {
  const entry = SIDECAR[b.id];
  if (!entry?.scores) continue;
  const bkt = BUCKETS[b.genre] || "other";
  scoredByBucket[bkt] = (scoredByBucket[bkt] || 0) + 1;
}

console.log("\n=== Scored books by bucket ===");
for (const [b, n] of Object.entries(scoredByBucket).sort()) console.log(`  ${b}: ${n}`);

// Find unscored, prioritize by tier + topRank
const unscored = ALL
  .filter(b => SIDECAR[b.id]?.vibes && !SIDECAR[b.id]?.scores)
  .map(b => ({
    id: b.id, title: b.title, author: b.author, genre: b.genre,
    bucket: BUCKETS[b.genre] || "other",
    tier: b.tier ?? 99,
    topRank: b.topRank ?? 9999,
  }));

unscored.sort((a, b) => {
  if (a.tier !== b.tier) return a.tier - b.tier;
  return a.topRank - b.topRank;
});

console.log(`\n=== Total unscored (but vibe-tagged): ${unscored.length} ===`);

// Top 150 by priority
console.log("\nTop 150 priority unscored books:");
const byBkt = {};
for (const b of unscored.slice(0, 150)) {
  if (!byBkt[b.bucket]) byBkt[b.bucket] = [];
  byBkt[b.bucket].push(b);
}
for (const [bkt, list] of Object.entries(byBkt).sort()) {
  console.log(`\n--- ${bkt} (${list.length}) ---`);
  for (const b of list) {
    console.log(`  [${String(b.id).padStart(5)}] T${b.tier} #${b.topRank}  ${b.title} — ${b.author}`);
  }
}

// Bucket coverage gap analysis
console.log("\n=== Bucket coverage for inference ===");
const targets = { literary: 40, fantasy: 25, sf: 20, mystery: 15, thriller: 15, horror: 15, romance: 10, nonfiction: 15 };
for (const [bkt, target] of Object.entries(targets)) {
  const have = scoredByBucket[bkt] || 0;
  const need = Math.max(0, target - have);
  const status = have >= target ? "✓" : need > 10 ? "!!" : "!";
  console.log(`  ${status} ${bkt}: ${have}/${target} (need ${need})`);
}
