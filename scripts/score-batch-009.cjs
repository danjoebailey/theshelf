// score-batch-009 — 36 hand-picked literary canon (selective mode continuing)
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  2222: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9 },   // Ragtime — Doctorow
  2233: { prose: 10, characters: 8, plot: 6, pacing: 4, ideas: 9, resonance: 9, ending: 8, voice: 9 },  // Blue Flower — Fitzgerald
  2244: { prose: 9, characters: 7, plot: 4, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Flights — Tokarczuk
  2251: { prose: 10, characters: 7, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 8, voice: 10 },// A Heart So White — Marías
  2605: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 9 },   // Man with the Golden Arm — Algren
  2686: { prose: 9, characters: 8, plot: 5, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 10 }, // Miss Lonelyhearts — West
  2694: { prose: 9, characters: 7, plot: 4, pacing: 6, ideas: 8, resonance: 8, ending: 6, voice: 9 },   // Delta of Venus — Nin
  2746: { prose: 9, characters: 7, plot: 3, pacing: 5, ideas: 10, resonance: 8, ending: 6, voice: 10 }, // Blood and Guts — Acker
  2782: { prose: 10, characters: 7, plot: 4, pacing: 5, ideas: 8, resonance: 9, ending: 7, voice: 10 }, // Ray — Hannah
  2788: { prose: 9, characters: 6, plot: 3, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Trout Fishing in America — Brautigan
  2811: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 9, resonance: 9, ending: 8, voice: 9 },   // Missing Person — Modiano
  2821: { prose: 9, characters: 7, plot: 5, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 9 },   // Goalie's Anxiety — Handke
  2824: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 10 },// Piano Teacher — Jelinek
  2827: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 10, ending: 9, voice: 9 },// Fatelessness — Kertész
  2840: { prose: 9, characters: 9, plot: 5, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10 },// No Longer Human — Dazai
  2850: { prose: 10, characters: 8, plot: 5, pacing: 4, ideas: 10, resonance: 9, ending: 8, voice: 10 },// Hopscotch — Cortázar
  2855: { prose: 9, characters: 9, plot: 8, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 9 },  // War of End of World — Vargas Llosa
  2868: { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Dead Souls — Gogol
  2873: { prose: 9, characters: 9, plot: 5, pacing: 4, ideas: 9, resonance: 9, ending: 9, voice: 9 },   // Cherry Orchard — Chekhov
  2878: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 8 }, // Fathers and Sons — Turgenev
  2887: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 10, ending: 9, voice: 9 }, // Chess Story — Zweig
  2893: { prose: 10, characters: 9, plot: 7, pacing: 4, ideas: 9, resonance: 10, ending: 9, voice: 9 },// Radetzky March — Joseph Roth
  2897: { prose: 10, characters: 9, plot: 5, pacing: 2, ideas: 10, resonance: 9, ending: 7, voice: 10 },// Man Without Qualities — Musil
  2900: { prose: 10, characters: 7, plot: 5, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 },// At Swim-Two-Birds — O'Brien
  2914: { prose: 10, characters: 9, plot: 7, pacing: 4, ideas: 10, resonance: 9, ending: 8, voice: 10 },// My Name Is Red — Pamuk
  2919: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 9 }, // A Personal Matter — Ōe
  2956: { prose: 9, characters: 9, plot: 9, pacing: 7, ideas: 10, resonance: 10, ending: 10, voice: 9 },// Oedipus Rex — Sophocles
  2958: { prose: 10, characters: 7, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 },// Metamorphoses — Ovid
  2961: { prose: 9, characters: 9, plot: 8, pacing: 5, ideas: 10, resonance: 10, ending: 9, voice: 9 },// Oresteia — Aeschylus
  2963: { prose: 10, characters: 8, plot: 5, pacing: 5, ideas: 8, resonance: 9, ending: 8, voice: 10 },// What We Talk About — Carver
  2967: { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 10, ending: 8, voice: 9 }, // Interpreter of Maladies — Lahiri
  2974: { prose: 9, characters: 8, plot: 5, pacing: 6, ideas: 9, resonance: 10, ending: 8, voice: 10 },// House on Mango Street — Cisneros
  2985: { prose: 9, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 8, voice: 9 }, // Golden Notebook — Lessing
  2992: { prose: 10, characters: 9, plot: 8, pacing: 5, ideas: 10, resonance: 9, ending: 9, voice: 9 },// Possession — Byatt
  2994: { prose: 10, characters: 9, plot: 5, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 10 },// Birds of America — Moore
  3017: { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 10, ending: 9, voice: 10 },// Charlie and the Chocolate Factory — Dahl
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
const entries = Object.entries(batch);
console.log(`\n=== score-batch-009 (selective) ===\nBooks: ${entries.length}\nMode: ${apply ? "APPLY" : "DRY RUN"}`);

if (apply) {
  let updated = 0, added = 0;
  for (const [id, scores] of entries) {
    if (!sidecar[id]) { sidecar[id] = { vibes: {}, tags: [], scores }; added++; }
    else { sidecar[id].scores = { ...(sidecar[id].scores || {}), ...scores }; updated++; }
  }
  fs.writeFileSync(SIDECAR, JSON.stringify(sidecar, null, 2));
  console.log(`Wrote ${added} new, updated ${updated}.`);
} else console.log("Dry run. Re-run with --apply.");
