// Batch 71 — adult romance push
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === ROMANCE (adult) ===
  11321: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 10, chemistry: 9, tension: 8, heaPayoff: 8 }, // Wolfsong
  11322: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 10, chemistry: 9, tension: 8, heaPayoff: 8 }, // Ravensong
  11323: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 10, chemistry: 9, tension: 8, heaPayoff: 8 }, // Heartsong
  11324: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 10, chemistry: 9, tension: 8, heaPayoff: 9 }, // Brothersong
  11586: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 8 }, // Tiger Eye
  11816: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, chemistry: 7, tension: 6, heaPayoff: 7 }, // Love Bites
  11817: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, chemistry: 7, tension: 6, heaPayoff: 7 }, // Single White Vampire
  11818: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, chemistry: 7, tension: 6, heaPayoff: 7 }, // Tall Dark & Hungry
  11838: { prose: 9, characters: 9, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 10, chemistry: 8, tension: 7, heaPayoff: 8 }, // Soulless
  11839: { prose: 9, characters: 9, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 10, chemistry: 8, tension: 7, heaPayoff: 8 }, // Changeless
  11840: { prose: 9, characters: 9, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 10, chemistry: 8, tension: 7, heaPayoff: 8 }, // Blameless
  11841: { prose: 9, characters: 9, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 10, chemistry: 8, tension: 7, heaPayoff: 9 }, // Heartless
  11901: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, chemistry: 7, tension: 6, heaPayoff: 7 }, // How to Marry a Millionaire Vampire
  11902: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, chemistry: 7, tension: 6, heaPayoff: 7 }, // Vamps and the City
  11903: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, chemistry: 7, tension: 6, heaPayoff: 7 }, // Be Still My Vampire Heart
  11944: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 9, chemistry: 7, tension: 7, heaPayoff: 7 }, // Undead and Unwed
  11945: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 9, chemistry: 7, tension: 7, heaPayoff: 7 }, // Undead and Unemployed
  11946: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 9, chemistry: 7, tension: 7, heaPayoff: 7 }, // Derik's Bane
  12082: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Dragon Bound
  12083: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Storm's Heart
  12084: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Serpent's Kiss
  12085: { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 8, heaPayoff: 8 }, // Halfway to the Grave
  12086: { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 8, heaPayoff: 8 }, // One Foot in the Grave
  12087: { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 8, heaPayoff: 8 }, // At Grave's End
  12088: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Radiance
  12089: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Eidolon
  12090: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Ippos King
  12110: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 9, chemistry: 7, tension: 7, heaPayoff: 7 }, // Nice Girls Don't Have Fangs
  12111: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 9, chemistry: 7, tension: 7, heaPayoff: 7 }, // Date Dead Men
  12112: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 9, chemistry: 7, tension: 7, heaPayoff: 7 }, // Live Forever
  12268: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Half a Soul
  12269: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Ten Thousand Stitches
  12270: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Longshadow
  12362: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Twilight Phantasies
  12363: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Blue Twilight
  12364: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Prince of Twilight
  1005:  { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 4, resonance: 6, ending: 6, voice: 5, chemistry: 7, tension: 7, heaPayoff: 6 }, // Heart Bones
  1008:  { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 4, resonance: 6, ending: 6, voice: 5, chemistry: 7, tension: 6, heaPayoff: 6 }, // All Your Perfects
  2098:  { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 4, resonance: 5, ending: 6, voice: 5, chemistry: 7, tension: 6, heaPayoff: 7 }, // Losing Hope
  2546:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 6, heaPayoff: 8 }, // True Love Experiment
  3151:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 6 }, // Lucky One
  3678:  { prose: 8, characters: 9, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 9, chemistry: 8, tension: 7, heaPayoff: 8 }, // Slow Dance
  3845:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Marrying Winterborne
  3853:  { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 4, resonance: 5, ending: 6, voice: 5, chemistry: 7, tension: 6, heaPayoff: 7 }, // Finding Cinderella
  4118:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Choice — Sparks
  4120:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Return — Sparks
  4251:  { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 4, resonance: 5, ending: 6, voice: 5, chemistry: 7, tension: 6, heaPayoff: 6 }, // Maybe Not
  4285:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Do You Want to Start a Scandal
  4287:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Chasing Cassandra
  4288:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Hello Stranger
  4289:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 8 }, // Because of Miss Bridgerton
  4404:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // When a Scot Ties the Knot
  4562:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 10, chemistry: 8, tension: 7, heaPayoff: 9 }, // Sylvester
  4563:  { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 7, resonance: 8, ending: 8, voice: 10, chemistry: 8, tension: 7, heaPayoff: 8 }, // Bath Tangle
  4615:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Tribute
  4618:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 8 }, // Other Miss Bridgerton
  4619:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 8 }, // First Comes Scandal
  4629:  { prose: 6, characters: 7, plot: 6, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 7 }, // King of Greed
  4630:  { prose: 6, characters: 7, plot: 6, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 7 }, // King of Sloth
  4631:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Wild Eyes
  4635:  { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 4, resonance: 5, ending: 6, voice: 5, chemistry: 7, tension: 6, heaPayoff: 7 }, // Point of Retreat
  4636:  { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 4, resonance: 5, ending: 6, voice: 5, chemistry: 7, tension: 6, heaPayoff: 7 }, // Maybe Now
  4638:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // At First Sight
  4900:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, chemistry: 8, tension: 7, heaPayoff: 8 }, // Secret Lives of Country Gentlemen
  4901:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, chemistry: 8, tension: 7, heaPayoff: 8 }, // Nobleman Guide
  4912:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Time to Shine
  5048:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 7 }, // Chestnut Springs
  5051:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 8 }, // Tools of Engagement
  5059:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 8 }, // All Rhodes Lead Here
  5154:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 8 }, // Lie for a Lie
  5335:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Dreamland
  5336:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Counting Miracles
  5435:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 8, heaPayoff: 7 }, // Midnight Ruin
  5759:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Ravishing the Heiress
  6392:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Texas Proud
  6393:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Notorious
  6398:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 7 }, // Forever Never
  6501:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 8 }, // Lover Mine
  6505:  { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 4, resonance: 5, ending: 6, voice: 5, chemistry: 7, tension: 7, heaPayoff: 7 }, // Darkest Seduction
  6523:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 8 }, // Lover At Last
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-071 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

if (apply) {
  for (const [id, scores] of Object.entries(batch)) {
    if (!sidecar[id]) { sidecar[id] = { vibes: {}, tags: [], scores }; added++; }
    else { sidecar[id].scores = { ...(sidecar[id].scores || {}), ...scores }; updated++; }
  }
  fs.writeFileSync(SIDECAR, JSON.stringify(sidecar, null, 2));
  console.log(`Wrote ${added} new, updated ${updated}.`);
} else {
  console.log("Dry run — pass --apply to write.");
}
