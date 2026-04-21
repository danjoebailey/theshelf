// Batch 67 — broad coverage continuation
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === FANTASY ===
  12309: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Gloaming
  12314: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 7 }, // Captive Prince
  12315: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 7 }, // Prince's Gambit
  12316: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 8, worldBuilding: 9, magicSystem: 7 }, // Kings Rising
  12318: { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Wytches v1
  12319: { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // American Vampire v1
  12320: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 10, magicSystem: 8 }, // Batman: Court of Owls
  12321: { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Undiscovered Country v1
  12322: { prose: 10, characters: 9, plot: 8, pacing: 7, ideas: 10, resonance: 9, ending: 8, voice: 10, worldBuilding: 10, magicSystem: 7 }, // Scalped v1
  12323: { prose: 10, characters: 9, plot: 8, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10, worldBuilding: 10, magicSystem: 7 }, // Southern Bastards v1
  12324: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 8 }, // Goddamned v1
  12325: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 10, worldBuilding: 10, magicSystem: 8 }, // Thor: God Butcher
  12326: { prose: 10, characters: 9, plot: 8, pacing: 6, ideas: 10, resonance: 10, ending: 8, voice: 10, worldBuilding: 10, magicSystem: 8 }, // Vision
  12327: { prose: 10, characters: 9, plot: 8, pacing: 6, ideas: 10, resonance: 10, ending: 8, voice: 10, worldBuilding: 10, magicSystem: 9 }, // Mister Miracle
  12328: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 10, worldBuilding: 10, magicSystem: 7 }, // Sheriff of Babylon
  12329: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10, worldBuilding: 10, magicSystem: 8 }, // Strange Adventures
  12330: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 9 }, // East of West v1
  12331: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 7, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 8 }, // Manhattan Projects v1
  12332: { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 10, resonance: 8, ending: 8, voice: 9, worldBuilding: 10, magicSystem: 9 }, // House of X / Powers of X
  12333: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 9 }, // Black Monday Murders v1
  12337: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Art of Prophecy
  12338: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Nightlife
  12339: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Moonshine
  12340: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Madhouse
  12371: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 7 }, // Deadly Class v1
  12372: { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 10, resonance: 7, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 9 }, // Black Science v1
  12373: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 9 }, // LOW v1
  12374: { prose: 10, characters: 10, plot: 8, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Hawkeye v1
  12375: { prose: 9, characters: 9, plot: 7, pacing: 7, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Sex Criminals v1
  12376: { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 10, resonance: 7, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Casanova v1
  12377: { prose: 9, characters: 9, plot: 7, pacing: 7, ideas: 10, resonance: 9, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 8 }, // Bitch Planet v1
  12378: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 8 }, // Pretty Deadly v1
  12379: { prose: 9, characters: 9, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Captain Marvel
  12380: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 10, magicSystem: 8 }, // Lazarus v1
  12381: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 10, magicSystem: 7 }, // Queen & Country v1
  12382: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 10, magicSystem: 8 }, // Gotham Central v1
  12384: { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Secret Six v1
  12385: { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Birds of Prey v1
  12631: { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 10, magicSystem: 8 }, // Acacia
  12632: { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 10, magicSystem: 8 }, // Other Lands
  12633: { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 8, worldBuilding: 10, magicSystem: 8 }, // Sacred Band

  // === MYSTERY ===
  4359:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Riccardino
  4595:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9, puzzle: 8, stakes: 7 }, // Midnight and Blue
  4603:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Summer That Never Was
  4610:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Last Remains
  6233:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, puzzle: 6, stakes: 5 }, // Yankee Doodle Dead
  6732:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 10, puzzle: 8, stakes: 8 }, // Robicheaux
  6819:  { prose: 8, characters: 9, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // God Save the Child
  6820:  { prose: 8, characters: 9, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Mortal Stakes
  6822:  { prose: 8, characters: 9, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Judas Goat
  6825:  { prose: 8, characters: 9, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Catskill Eagle
  6827:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 6 }, // Burglar Who Liked to Quote Kipling
  6930:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Voice of the Violin
  6933:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Death and Judgment
  7461:  { prose: 8, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Shape Shifter
  7481:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Quietly in Their Sleep
  8515:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // Highwayman
  8819:  { prose: 8, characters: 9, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Walkin' the Dog
  8822:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 10, puzzle: 8, stakes: 8 }, // New Iberia Blues
  8914:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // Tooth and Claw
  8929:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Hush Money

  // === THRILLER ===
  9612:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Hot Mahogany
  9640:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 7 }, // Widow — Grisham
  9664:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 10, stakes: 8, twists: 8 }, // Clown Town
  9665:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 8 }, // With a Vengeance
  9666:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 8 }, // Don't Let Him In
  9678:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 8 }, // Crash
  9679:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 8 }, // Tenant
  9680:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 8 }, // Beautiful Ugly
  9688:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Fallen
  9959:  { prose: 10, characters: 10, plot: 9, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10, stakes: 9, twists: 9 }, // Smiley's People
  9960:  { prose: 10, characters: 10, plot: 9, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10, stakes: 9, twists: 9 }, // Honourable Schoolboy
  9961:  { prose: 10, characters: 10, plot: 8, pacing: 7, ideas: 10, resonance: 9, ending: 8, voice: 10, stakes: 8, twists: 9 }, // Tailor of Panama
  9962:  { prose: 10, characters: 10, plot: 8, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10, stakes: 8, twists: 9 }, // Legacy of Spies
  9963:  { prose: 10, characters: 10, plot: 8, pacing: 7, ideas: 10, resonance: 9, ending: 8, voice: 10, stakes: 8, twists: 9 }, // Russia House
  9964:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, stakes: 8, twists: 8 }, // Absolute Friends
  9965:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, stakes: 8, twists: 8 }, // Mission Song
  9976:  { prose: 10, characters: 9, plot: 8, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10, stakes: 8, twists: 9 }, // Cry of the Owl
  925:   { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 8, periodAuthenticity: 9, researchIntegration: 8 },
  1026:  { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Visitor
  1053:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Jack & Jill
  3087:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 8, stakes: 8, twists: 7 }, // Confession
  3128:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // Killing Moon
  3549:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Memory Man
  3702:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 8 }, // I Found You
  4128:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Shadow Prey
  4132:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Phantom Prey
  4196:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 8 }, // Only One Left
  4252:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Mary, Mary
  4312:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, stakes: 8, twists: 8 }, // Agent Running in the Field
  4323:  { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 9, stakes: 8, twists: 7 }, // Mr. Majestyk
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-067 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

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
