// Batch 62 — broad coverage continuation
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === FANTASY ===
  11712: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Tower on the Rift
  11713: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Dark is the Moon
  11714: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Rhapsody
  11715: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Prophecy
  11716: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Destiny
  11719: { prose: 8, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 8, worldBuilding: 10, magicSystem: 8 }, // Inda
  11730: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Fool on the Hill
  11735: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 9 }, // Runelords
  11736: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 9 }, // Brotherhood of the Wolf
  11737: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 9 }, // Wizardborn
  11738: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 9 }, // Lair of Bones
  11753: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 8 }, // Monster Hunter International
  11754: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 8 }, // Monster Hunter Vendetta
  11755: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Hard Magic
  11756: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 9 }, // Son of the Black Sword
  11762: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 9, worldBuilding: 8, magicSystem: 7 }, // Practical Demonkeeping
  11763: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 9, ending: 8, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Dirty Job
  11764: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 7 }, // Fluke
  11768: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Medalon
  11769: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Lion of Senet
  11770: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Immortal Prince
  11787: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Broken Lands
  11795: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Half-Resurrection Blues
  11833: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 8 }, // Jaguar Hunter
  11834: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 10, magicSystem: 8 }, // Boneshaker
  8281:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 9, worldBuilding: 10, magicSystem: 8 }, // Summer Tree

  // === MYSTERY ===
  8865:  { prose: 9, characters: 9, plot: 9, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 10, puzzle: 9, stakes: 8 }, // Have His Carcase
  8866:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Death of an Expert Witness
  8867:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Black Tower
  8868:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Drowning Pool
  8911:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Still Life — McDermid
  8912:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // 1979
  8923:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // T Is for Trespass
  8924:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // U Is for Undertow
  8925:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // V Is for Vengeance
  8926:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // W Is for Wasted
  8927:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // X
  8928:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Y Is for Yesterday
  9041:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Beastly Things
  9043:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Overnight Kidnapper
  9044:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Abattoir Blues

  // === THRILLER ===
  4435:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 6, voice: 7, stakes: 7, twists: 7 }, // State of Fear
  4442:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Want You Dead
  4443:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Love You Dead
  4470:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Broken Ground
  4639:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 6 }, // Guardian — Sparks
  4680:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Loves Music Loves to Dance
  4681:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // I've Got You Under My Skin
  4683:  { prose: 7, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 7, stakes: 9, twists: 7 }, // Bear and the Dragon
  4686:  { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Apostle
  4687:  { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Full Black
  4719:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 7 }, // Rooster Bar
  4724:  { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Sentinel
  4725:  { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Better Off Dead
  4726:  { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // No Plan B
  4727:  { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Secret — Child
  4733:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Think Twice
  4734:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Girl, Forgotten
  4875:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 10, stakes: 8, twists: 8 }, // Bad Actors
  4876:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 10, stakes: 8, twists: 8 }, // Secret Hours
  5222:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Look for Me

  // === ROMANCE ===
  6600:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 7 }, // Game of Fate
  6601:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 7 }, // Game of Retribution
  6605:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 8 }, // Well Played
  6606:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 7 }, // Playboy Pilot
  6649:  { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 4, resonance: 5, ending: 6, voice: 5, chemistry: 7, tension: 6, heaPayoff: 7 }, // Beautiful Redemption
  6650:  { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 4, resonance: 5, ending: 6, voice: 5, chemistry: 7, tension: 6, heaPayoff: 7 }, // Beautiful Sacrifice
  6660:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Full Disclosure
  6661:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Unspoken
  6662:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Undetected
  6701:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Carve the Mark
  6702:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Fates Divide
  6734:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 7 }, // Wicked Deeds
  6942:  { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 6, resonance: 7, ending: 7, voice: 8, chemistry: 7, tension: 7, heaPayoff: 7 }, // Shivering Sands
  7564:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Iron Knight
  7565:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Shadow of the Fox
  7635:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 8, chemistry: 6, tension: 7, heaPayoff: 7 }, // Elsewhere
  7651:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 8 }, // Rule Book
  7671:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 8 }, // Graham Effect
  7672:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 8 }, // Dixon Rule
  8049:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9, chemistry: 5, tension: 7, heaPayoff: 6 }, // Cuckoo Song
  8328:  { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 4, resonance: 5, ending: 7, voice: 5, chemistry: 7, tension: 6, heaPayoff: 8 }, // Beautiful Wedding
  8331:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 6, heaPayoff: 7 }, // Rejoice
  8334:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 7 }, // Happily Ever Ninja
  8345:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Red Lily
  8346:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Last Boyfriend
  8347:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Perfect Hope

  // === LITERARY FICTION (other bucket) ===
  9638:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 8 }, // Great Big Beautiful Life — Henry
  9641:  { prose: 10, characters: 10, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Dream Count — Adichie
  9658:  { prose: 10, characters: 9, plot: 7, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Shadow Ticket — Pynchon
  9659:  { prose: 10, characters: 10, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // Emperor of Gladness
  9663:  { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Theft — Gurnah
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-062 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

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
