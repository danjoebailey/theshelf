// Batch 64 — broad coverage continuation
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === FANTASY ===
  11911: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Witchmark
  11912: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Stormsong
  11913: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Soulstar
  11914: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Even Though I Knew the End
  11942: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 }, // Working Stiff
  11947: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 8 }, // Greywalker
  11948: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 8 }, // Poltergeist
  11949: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 8 }, // Underground
  11950: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 6, worldBuilding: 8, magicSystem: 7 }, // Touch the Dark
  11951: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 6, worldBuilding: 8, magicSystem: 7 }, // Claimed by Shadow
  11952: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 6, worldBuilding: 8, magicSystem: 7 }, // Midnight's Daughter
  11968: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 10, magicSystem: 9 }, // Heroes Die
  11969: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 10, magicSystem: 9 }, // Blade of Tyshalle
  11970: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 10, magicSystem: 9 }, // Caine Black Knife
  11971: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 9, worldBuilding: 10, magicSystem: 9 }, // Caine's Law
  11976: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Green Rider
  11977: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // First Rider's Call
  11978: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // High King's Tomb
  11979: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Dragon Prince
  11980: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Star Scroll
  11981: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Sunrunner's Fire
  11982: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Archangel — Shinn
  11984: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Alleluia Files
  11386: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 10, magicSystem: 8 }, // Godslayer
  11390: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Dancing with Bears
  11455: { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 10, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 7 }, // In the Shadow of No Towers
  11456: { prose: 10, characters: 9, plot: 6, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 7 }, // Dykes to Watch Out For
  11457: { prose: 10, characters: 9, plot: 6, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 7 }, // Secret to Superhuman Strength
  11458: { prose: 10, characters: 8, plot: 5, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 6 }, // Carnet de Voyage
  11459: { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 8 }, // Space Dumplins
  11574: { prose: 9, characters: 9, plot: 8, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 8 }, // Maia

  // === MYSTERY ===
  9175:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 6 }, // Painted Queen
  9200:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 6 }, // Mrs. Pollifax Pursued
  9201:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 6 }, // Lion Killer
  9202:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 6 }, // Innocent Tourist
  9203:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 6 }, // Unveiled
  9215:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 7, resonance: 7, ending: 8, voice: 8, puzzle: 8, stakes: 7 }, // Scales of Justice
  9216:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 7, resonance: 7, ending: 8, voice: 8, puzzle: 8, stakes: 7 }, // Dead Water
  9225:  { prose: 8, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, puzzle: 8, stakes: 7 }, // Locked Rooms
  9226:  { prose: 8, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, puzzle: 8, stakes: 7 }, // Language of Bees
  9227:  { prose: 8, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, puzzle: 8, stakes: 7 }, // God of the Hive
  9535:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 10, puzzle: 8, stakes: 7 }, // Even the Dead
  9536:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 10, puzzle: 8, stakes: 7 }, // Elegy for April
  9600:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, puzzle: 6, stakes: 5 }, // Death by Chocolate Marshmallow
  9620:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, puzzle: 6, stakes: 5 }, // Assault and Beret
  9621:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, puzzle: 6, stakes: 5 }, // Buried to the Brim
  9622:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, puzzle: 6, stakes: 5 }, // Fatal Fascinator
  9627:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // Blood Salt Water
  9628:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // Red Road
  9667:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9, puzzle: 8, stakes: 7 }, // Black Wolf
  9668:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Impossible Fortune

  // === THRILLER ===
  5664:  { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Chaos Agent
  6356:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 7 }, // Coffin Road
  6357:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 7 }, // I'll Keep You Safe
  6408:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Willing to Die
  6460:  { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // American Traitor
  6461:  { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // End of Days
  6467:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Therapist
  6512:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 9, stakes: 8, twists: 7 }, // Reapers
  6513:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 9, stakes: 8, twists: 7 }, // Lovers
  6517:  { prose: 7, characters: 7, plot: 7, pacing: 8, ideas: 7, resonance: 6, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Pandemic
  6528:  { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 6, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Night Ranger
  6529:  { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 6, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Twelve Days
  6551:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 6, resonance: 6, ending: 7, voice: 6, stakes: 8, twists: 6 }, // Kremlin Strike
  6715:  { prose: 7, characters: 7, plot: 7, pacing: 8, ideas: 7, resonance: 6, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Valhalla Rising
  6716:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 8 }, // Secrets She Keeps
  6717:  { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 10, stakes: 7, twists: 8 }, // Beware the Woman
  6738:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // Storm Child
  6746:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 10, stakes: 8, twists: 8 }, // Cold Six Thousand
  6747:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 10, stakes: 8, twists: 8 }, // Blood's a Rover
  6811:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 8 }, // Parsifal Mosaic

  // === ROMANCE (adult) ===
  9563:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Slightly Married
  9564:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Slightly Wicked
  9565:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Slightly Scandalous
  9575:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, chemistry: 6, tension: 7, heaPayoff: 6 }, // Killer Instinct
  9591:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Moonlight Cove
  9592:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Beach Lane
  9593:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // O'Brien Family Christmas
  9594:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Summer Garden
  9595:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Dogwood Hill
  9601:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // This Heart of Mine
  9602:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Match Me If You Can
  9613:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Protector
  9623:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Understatement of the Year

  // === NONFICTION ===
  // (all remaining candidates are travel — skip per memory rules)
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-064 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

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
