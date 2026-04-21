// Batch 55 — broad coverage continuation
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === LITERARY ===
  13028: { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // I-Novel
  13030: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Fires on the Plain
  13032: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Into a Black Sun
  13033: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Darkness in Summer
  13034: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 10, ending: 7, voice: 10 }, // Notes of a Crocodile
  13035: { prose: 10, characters: 8, plot: 5, pacing: 5, ideas: 10, resonance: 10, ending: 7, voice: 10 }, // Last Words from Montmartre
  13036: { prose: 10, characters: 10, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // Taipei People
  13037: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Crystal Boys
  13038: { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Mind at Peace
  13039: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Time Regulation Institute
  13040: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // Madonna in a Fur Coat
  13041: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Berji Kristin
  13042: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Last Jew
  13043: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // Adam Resurrected
  13044: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Blue Mountain
  13045: { prose: 10, characters: 10, plot: 7, pacing: 6, ideas: 9, resonance: 10, ending: 8, voice: 10 }, // Pigeon and a Boy
  13046: { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Dolly City
  13048: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Dancing Arabs
  13049: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Let It Be Morning
  13050: { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Shipyard
  13051: { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Brief Life
  13052: { prose: 10, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Artificial Respiration
  13054: { prose: 10, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Sixty-Five Years of Washington
  13055: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Scars
  13056: { prose: 9, characters: 7, plot: 5, pacing: 4, ideas: 10, resonance: 8, ending: 6, voice: 10 }, // My Two Worlds
  13057: { prose: 10, characters: 7, plot: 5, pacing: 3, ideas: 10, resonance: 7, ending: 6, voice: 10 }, // Eterna's Novel
  13058: { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Piano Stories
  13059: { prose: 10, characters: 9, plot: 7, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  13060: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  13061: { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Three Trapped Tigers
  13062: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Infante's Inferno
  13064: { prose: 10, characters: 9, plot: 8, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10, periodAuthenticity: 10, researchIntegration: 10 },
  13065: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 10, periodAuthenticity: 9, researchIntegration: 9 },
  13066: { prose: 10, characters: 9, plot: 8, pacing: 6, ideas: 10, resonance: 10, ending: 8, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  13067: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Black Docker
  13068: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Xala
  13069: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Ambiguous Adventure
  13070: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Poor Christ of Bomba
  13071: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Mission to Kala
  13073: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Houseboy
  13074: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Old Man and the Medal
  13075: { prose: 10, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Life and a Half
  13076: { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Seven Solitudes
  13077: { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Butterfly Burning
  13078: { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 10, ending: 7, voice: 10 }, // Stone Virgins
  13079: { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Without a Name
  13080: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 10, ending: 7, voice: 10 }, // Johnny Mad Dog
  13082: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Jakob von Gunten
  13083: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Tanners
  13084: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Memoirs of an Anti-Semite
  13086: { prose: 10, characters: 9, plot: 6, pacing: 3, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Strudlhof Steps
  13089: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Dream Story
  13090: { prose: 9, characters: 9, plot: 6, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Late Fame
  13091: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Tales of a Long Night
  13092: { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Malina
  13093: { prose: 10, characters: 9, plot: 7, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Auto-da-Fé
  13094: { prose: 10, characters: 10, plot: 8, pacing: 6, ideas: 10, resonance: 10, ending: 8, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  13095: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // House by the Medlar Tree
  13096: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Little Novels of Sicily
  13097: { prose: 10, characters: 10, plot: 8, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },

  // === FANTASY ===
  8416:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 9 }, // Ruin of Angels
  8984:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Liar's Key
  8985:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 8, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Wheel of Osheim
  9248:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 7 }, // Priestess of Avalon
  9388:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 6, worldBuilding: 8, magicSystem: 7 }, // Fire in the Flesh
  9389:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 6, worldBuilding: 8, magicSystem: 7 }, // Born of Blood and Ash
  9494:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Conrad's Fate
  9495:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Pinhoe Egg
  9496:  { prose: 8, characters: 8, plot: 6, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Mixed Magics
  9630:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Feverborn
  9631:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Feversong
  9632:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Kingdom of Shadow and Light
  9637:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Devils
  9642:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Katabasis
  9644:  { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Bury Our Bones
  9645:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Thief of Night

  // === MYSTERY ===
  11328: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 8, puzzle: 7, stakes: 6 }, // Walkers of Dembley
  11329: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 8, puzzle: 7, stakes: 6 }, // Murderous Marriage
  11330: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 8, puzzle: 7, stakes: 6 }, // Death of an Outsider
  11331: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 8, puzzle: 7, stakes: 6 }, // Death of a Perfect Wife
  11788: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Holmes-Dracula File
  11904: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 10, puzzle: 8, stakes: 8 }, // Savage Season
  11905: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 9, ending: 8, voice: 10, puzzle: 8, stakes: 8 }, // Bottoms
  11907: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 10, puzzle: 8, stakes: 8 }, // Cold in July
  806:   { prose: 9, characters: 9, plot: 9, pacing: 7, ideas: 8, resonance: 9, ending: 9, voice: 10, puzzle: 9, stakes: 8 }, // Curtain
  989:   { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 8, voice: 9, puzzle: 8, stakes: 7, periodAuthenticity: 9, researchIntegration: 8 },
  990:   { prose: 8, characters: 9, plot: 9, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 9, stakes: 7 }, // Appointment with Death
  991:   { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 7, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Sad Cypress
  994:   { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Hickory Dickory Dock
  995:   { prose: 8, characters: 9, plot: 9, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 9, stakes: 7 }, // Cat Among the Pigeons
  996:   { prose: 9, characters: 9, plot: 9, pacing: 7, ideas: 9, resonance: 8, ending: 9, voice: 10, puzzle: 9, stakes: 8 }, // Pale Horse

  // === THRILLER ===
  10556: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 8 }, // Archangel
  10558: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // Hammer of Eden
  10559: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 8 }, // Third Twin
  10560: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // Code to Zero
  10561: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // Whiteout
  10671: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 10, stakes: 8, twists: 8 }, // Complicity
  11048: { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 8, resonance: 8, ending: 7, voice: 8, stakes: 8, twists: 8 }, // Abandon
  11049: { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 8 }, // Good Behavior
  11121: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // All These Bodies
  11207: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 9, stakes: 8, twists: 7 }, // Whisperers
  11208: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 9, stakes: 8, twists: 7 }, // Burning Soul
  11240: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, stakes: 7, twists: 7 }, // Making Wolf
  11279: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // You Are Dead
  11280: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Need You Dead
  11281: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Dead at First Sight

  // === ROMANCE ===
  5079:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 7, chemistry: 6, tension: 7, heaPayoff: 7 }, // UnDivided
  5080:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 8, chemistry: 6, tension: 7, heaPayoff: 7 }, // Scythe
  5088:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 6, tension: 7, heaPayoff: 7 }, // Five Dark Fates
  5150:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 8 }, // Pucked Over
  5151:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 8 }, // Forever Pucked
  5152:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 8 }, // Pucked Love
  5153:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 6, heaPayoff: 8 }, // Meet Cute

  // === NONFICTION ===
  12840: { prose: 10, characters: 7, plot: 5, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10, argument: 10, researchRigor: 8, access: 8 }, // Notes from No Man's Land
  12841: { prose: 9, characters: 7, plot: 5, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10, argument: 10, researchRigor: 8, access: 9 }, // How to Do Nothing
  12842: { prose: 9, characters: 7, plot: 5, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 10, argument: 10, researchRigor: 8, access: 9 }, // Saving Time
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-055 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

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
