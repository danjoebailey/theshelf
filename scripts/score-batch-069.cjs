// Batch 69 — broad coverage continuation
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === MYSTERY ===
  12493: { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7, periodAuthenticity: 9, researchIntegration: 8 },
  12683: { prose: 10, characters: 9, plot: 8, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 10, puzzle: 8, stakes: 7 }, // Blackwater
  12685: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10, puzzle: 7, stakes: 7 }, // Under the Snow
  12739: { prose: 10, characters: 9, plot: 8, pacing: 7, ideas: 10, resonance: 9, ending: 8, voice: 10, puzzle: 8, stakes: 8 }, // Day of the Owl
  12740: { prose: 10, characters: 9, plot: 8, pacing: 7, ideas: 10, resonance: 9, ending: 8, voice: 10, puzzle: 8, stakes: 8 }, // To Each His Own
  12741: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10, puzzle: 8, stakes: 7 }, // Equal Danger
  12742: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10, puzzle: 8, stakes: 7 }, // Awful Mess on Via Merulana
  12747: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10, puzzle: 8, stakes: 7 }, // Voices — Maraini
  12819: { prose: 10, characters: 9, plot: 9, pacing: 7, ideas: 9, resonance: 9, ending: 9, voice: 10, puzzle: 9, stakes: 8 }, // Roseanna
  12820: { prose: 10, characters: 9, plot: 9, pacing: 7, ideas: 9, resonance: 9, ending: 9, voice: 10, puzzle: 9, stakes: 8 }, // Laughing Policeman (Sjöwall/Wahlöö)

  // === THRILLER ===
  8497:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Silent Corner
  8498:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Whispering Room
  8499:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Crooked Staircase
  8500:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Forbidden Door
  8501:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Night Window
  8516:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Simple Genius
  8518:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, stakes: 8, twists: 7 }, // Crossing
  8844:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Where There's Smoke
  8846:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Deadline
  8849:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Shadow Play
  8871:  { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, stakes: 7, twists: 8 }, // Glass Cell
  8899:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Standup Guy
  8900:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Skin Game
  8903:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Quarter to Midnight
  8904:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Beneath Dark Waters
  8905:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Labyrinth — Coulter
  8906:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Deadlock
  8908:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Persuasion
  8909:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Overkill
  8952:  { prose: 5, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Suspects

  // === ROMANCE (adult only) ===
  11100: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 7 }, // Kiss of the Night
  11101: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 7 }, // Night Play
  11102: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 7 }, // Seize the Night
  11103: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 7 }, // Sins of the Night
  11104: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 8 }, // Lover Unleashed
  11105: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 8 }, // Lover Reborn
  11106: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 8 }, // Shadows
  11107: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 8 }, // Beast
  11108: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 8 }, // Chosen
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-069 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

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
