// Batch 73 — remaining adult thrillers (final scoring-eligible backlog)
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === THRILLER ===
  9099:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, stakes: 8, twists: 7 }, // Lost Light
  9114:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Public Secrets
  9115:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Genuine Lies
  9120:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Cross My Heart
  9121:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Merry Christmas, Alex Cross
  9123:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Deliver Us from Evil
  9126:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Fat Tuesday
  9128:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Pandora's Daughter
  9130:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Vortex
  9133:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Keeping the Dead
  9610:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Orchid Blues
  9611:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Blood Orchid
  12679: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 10, stakes: 8, twists: 8 }, // Statement — Moore
  13990: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 8 }, // Little Face
  13991: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 8 }, // Hurting Distance
  14051: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 10, stakes: 8, twists: 8 }, // Dark Ride
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-073 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

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
