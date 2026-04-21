// Verify the budget enforcement actually reshapes weights
import { buildUserProfile } from "../src/lib/recommender.js";

// Fake fantasy-heavy reader with 10 fantasy books
const ratedBooks = Array.from({ length: 10 }, (_, i) => ({
  id: 100 + i,
  title: `Fantasy ${i}`,
  author: "Author",
  genre: "Fantasy",
  rating: i < 5 ? 5 : 3, // 5 five-star + 5 three-star, gives variance for Pearson
}));

// Universal axes also vary with rating but LESS than pack axes,
// so Pearson gives everything a weight and budget scaling kicks in
const tagData = {};
for (let i = 0; i < 10; i++) {
  const topTier = i < 5;
  tagData[String(100 + i)] = {
    vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 5 },
    scores: {
      // Universal: weak signal (mild variance)
      prose: topTier ? 8 : 6, characters: topTier ? 8 : 6, plot: topTier ? 7 : 6,
      pacing: 7, ideas: topTier ? 8 : 6, resonance: topTier ? 8 : 6,
      ending: topTier ? 7 : 6, voice: 7,
      // Pack: strong signal (big swing)
      worldBuilding: topTier ? 10 : 5,
      magicSystem: topTier ? 10 : 5,
    },
    tags: ["fantasy"],
  };
}

const profile = buildUserProfile(ratedBooks, tagData);
console.log("=== Fantasy bucket profile ===\n");
const fantasy = profile.craftProfile?.buckets?.fantasy;
if (!fantasy) {
  console.log("No fantasy bucket!");
  process.exit(1);
}

const UNIVERSAL = new Set(["prose", "characters", "plot", "pacing", "ideas", "resonance", "ending", "voice"]);
let uniSum = 0, packSum = 0;
for (const [axis, stats] of Object.entries(fantasy)) {
  const isUni = UNIVERSAL.has(axis);
  console.log(`  ${axis.padEnd(18)} ${isUni ? "(universal)" : "(pack)     "}  weight=${stats.weight.toFixed(4)}  n=${stats.n}`);
  if (isUni) uniSum += stats.weight;
  else packSum += stats.weight;
}
console.log(`\n  Universal sum: ${uniSum.toFixed(4)}  (target 0.65)`);
console.log(`  Pack sum:      ${packSum.toFixed(4)}  (target 0.35)`);
console.log(`  Total:         ${(uniSum + packSum).toFixed(4)}  (target 1.00)`);

if (Math.abs(uniSum - 0.65) < 0.01 && Math.abs(packSum - 0.35) < 0.01) {
  console.log("\n  ✓ Budget enforcement works");
} else {
  console.log("\n  ✗ BUDGET NOT ENFORCED CORRECTLY");
}
