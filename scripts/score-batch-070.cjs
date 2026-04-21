// Batch 70 — broad coverage continuation
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === MYSTERY ===
  12821: { prose: 10, characters: 9, plot: 9, pacing: 7, ideas: 9, resonance: 8, ending: 9, voice: 10, puzzle: 9, stakes: 8 }, // Locked Room — Sjöwall/Wahlöö
  12822: { prose: 10, characters: 9, plot: 9, pacing: 7, ideas: 9, resonance: 8, ending: 9, voice: 10, puzzle: 9, stakes: 8 }, // Man on the Balcony
  12823: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Mind's Eye
  12824: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Borkmann's Point
  12825: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Return — Nesser
  12826: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Princess of Burundi
  12827: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Cruel Stars of the Night
  12828: { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Last Rituals
  12829: { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // My Soul to Take
  12830: { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Ashes to Dust
  13053: { prose: 10, characters: 9, plot: 8, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10, puzzle: 8, stakes: 7 }, // Target in the Night
  13063: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 10, puzzle: 8, stakes: 7 }, // Havana Blue
  13395: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Deadline in Athens
  13396: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Che Committed Suicide
  13400: { prose: 10, characters: 9, plot: 8, pacing: 6, ideas: 10, resonance: 9, ending: 9, voice: 10, puzzle: 9, stakes: 8 }, // Pledge
  13401: { prose: 10, characters: 9, plot: 8, pacing: 7, ideas: 10, resonance: 9, ending: 8, voice: 10, puzzle: 9, stakes: 8 }, // Judge and His Hangman
  13402: { prose: 10, characters: 9, plot: 8, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10, puzzle: 9, stakes: 8 }, // Suspicion
  13461: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 9, puzzle: 8, stakes: 7 }, // Missing File
  13471: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 9, puzzle: 8, stakes: 7 }, // Death Rites
  13472: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 9, puzzle: 8, stakes: 7 }, // Dog Day

  // === THRILLER ===
  8954:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // 23rd Midnight
  8955:  { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // President Is Missing
  8956:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 7 }, // Guardians
  8964:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 6, voice: 7, stakes: 7, twists: 7 }, // Devoted
  8965:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 6, voice: 7, stakes: 7, twists: 7 }, // Quicksilver
  9006:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Triple Cross
  9008:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Stone Cold
  9014:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Other Daughter
  9024:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 7 }, // Final Detail
  9026:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 7 }, // Promise Me
  9028:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Killing Hour
  9032:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // 2nd Chance
  9050:  { prose: 8, characters: 9, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 10, stakes: 7, twists: 7 }, // Pronto
  9087:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Black Hills
  9088:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Carnal Innocence
  9089:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Witness
  9092:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Private
  9093:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // NYPD Red
  9094:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 7 }, // Partner
  9098:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 7 }, // Home — Coben

  // === ROMANCE (adult only) ===
  11109: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 7 }, // Demon from the Dark
  11110: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 7 }, // Dreams of a Dark Warrior
  11111: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 7 }, // Dark Desires After Dusk
  11112: { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 4, resonance: 5, ending: 6, voice: 5, chemistry: 7, tension: 7, heaPayoff: 7 }, // Dark Challenge
  11113: { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 4, resonance: 5, ending: 6, voice: 5, chemistry: 7, tension: 7, heaPayoff: 7 }, // Dark Fire
  11114: { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 4, resonance: 5, ending: 6, voice: 5, chemistry: 7, tension: 7, heaPayoff: 7 }, // Dark Legend
  11115: { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 4, resonance: 5, ending: 6, voice: 5, chemistry: 7, tension: 7, heaPayoff: 7 }, // Dark Guardian
  11129: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 7, periodAuthenticity: 8, researchIntegration: 7 },
  11130: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 7, periodAuthenticity: 8, researchIntegration: 7 },
  11131: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 7, periodAuthenticity: 8, researchIntegration: 7 },
  11150: { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 4, resonance: 5, ending: 6, voice: 5, chemistry: 7, tension: 7, heaPayoff: 7 }, // Darkest Whisper
  11151: { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 4, resonance: 5, ending: 6, voice: 5, chemistry: 7, tension: 7, heaPayoff: 7 }, // Darkest Passion
  11152: { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 4, resonance: 5, ending: 6, voice: 5, chemistry: 7, tension: 7, heaPayoff: 7 }, // Darkest Surrender
  11155: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 7 }, // Wicked
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-070 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

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
