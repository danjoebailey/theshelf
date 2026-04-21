// Batch 61 — broad coverage continuation
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === LITERARY ===
  13584: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Hygiene and the Assassin
  13585: { prose: 10, characters: 9, plot: 6, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Fear and Trembling
  13587: { prose: 10, characters: 8, plot: 5, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Bathroom
  13588: { prose: 10, characters: 8, plot: 5, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Television
  13712: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Foreign Affairs
  13722: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Wallcreeper
  13723: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Mislaid
  13755: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Once Upon a River — Campbell
  13756: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // American Salvage
  13774: { prose: 10, characters: 8, plot: 5, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Wittgenstein's Mistress
  13775: { prose: 10, characters: 7, plot: 4, pacing: 3, ideas: 10, resonance: 7, ending: 6, voice: 10 }, // Reader's Block
  13776: { prose: 10, characters: 7, plot: 4, pacing: 3, ideas: 10, resonance: 7, ending: 6, voice: 10 }, // This Is Not a Novel
  13783: { prose: 10, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Brief History of the Dead
  13784: { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Illumination
  13786: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Like You'd Understand
  13787: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Project X
  13801: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Delicious Foods
  13818: { prose: 10, characters: 8, plot: 5, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Inferno — Myles
  13819: { prose: 10, characters: 8, plot: 5, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Chelsea Girls
  13823: { prose: 10, characters: 8, plot: 5, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // I Love Dick
  13824: { prose: 10, characters: 7, plot: 5, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Aliens & Anorexia
  13833: { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Interstate
  13834: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Frog
  13854: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Children's Bible
  13855: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Magnificence
  13923: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Childhood and Other Neighborhoods
  13924: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Coast of Chicago
  13926: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Feast of Love
  13927: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Saul and Patsy
  14050: { prose: 10, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 10, periodAuthenticity: 9, researchIntegration: 8 }, // November Road
  14082: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Eve's Hollywood
  14083: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Slow Days, Fast Company
  14113: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Suitcase
  14114: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Pushkin Hills
  14115: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Zone
  14161: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Millstone
  14162: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Radiant Way
  14170: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Natural Way of Things
  14180: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // One Part Woman
  14181: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Seasons of the Palm
  14192: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Obabakoak
  14193: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Accordionist's Son
  14236: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Mumbo Jumbo
  14237: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Last Days of Louisiana Red
  14238: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Flight to Canada

  // === FANTASY ===
  11669: { prose: 9, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 10, magicSystem: 8 }, // Dwellers in the Mirage
  11671: { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 9, worldBuilding: 10, magicSystem: 8 }, // She
  11678: { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Gospel of Loki
  11681: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 8, magicSystem: 7 }, // Tea with the Black Dragon
  11682: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 7 }, // Damiano
  11683: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 7 }, // Book of Kells
  11684: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Daggerspell
  11685: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Darkspell
  11686: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Bristling Wood
  11687: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Dragon Revenant
  11688: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Daughter of the Forest
  11689: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Son of the Shadows
  11690: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Child of the Prophecy
  11694: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 10, worldBuilding: 10, magicSystem: 9 }, // Amulet of Samarkand
  11695: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 10, worldBuilding: 10, magicSystem: 9 }, // Golem's Eye
  11696: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 9, voice: 10, worldBuilding: 10, magicSystem: 9 }, // Ptolemy's Gate
  11702: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 7 }, // Blood Price
  11704: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 7 }, // Summon the Keeper
  11705: { prose: 8, characters: 8, plot: 7, pacing: 8, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 8, magicSystem: 7 }, // Already Dead
  11706: { prose: 8, characters: 8, plot: 7, pacing: 8, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 8, magicSystem: 7 }, // No Dominion
  11707: { prose: 8, characters: 8, plot: 7, pacing: 8, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 8, magicSystem: 7 }, // Half the Blood of Brooklyn
  11711: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Shadow on the Glass

  // === MYSTERY ===
  8411:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // Whiteout
  8412:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // Winterkill — Jónasson
  8512:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // Next to Last Stand
  8513:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // Daughter of the Morning Star
  8514:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // Hell and Back
  8809:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 8, stakes: 7 }, // Let It Bleed
  8810:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // Spirit of Steamboat
  8817:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 9, puzzle: 8, stakes: 8 }, // Devil Knows You're Dead
  8824:  { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Double — Pelecanos
  8826:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Temptation of Forgiveness
  8827:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Beam of Light
  8828:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Dance of the Seagull
  8829:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Shadow District
  8851:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 10, puzzle: 8, stakes: 7 }, // One Good Turn
  8864:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 10, puzzle: 9, stakes: 7 }, // Unpleasantness at the Bellona Club

  // === THRILLER ===
  3429:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 10, stakes: 8, twists: 8 }, // Stamboul Train
  3432:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 10, stakes: 8, twists: 8 }, // Confidential Agent
  3572:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 10, stakes: 8, twists: 8 }, // Hummingbird Salamander
  3614:  { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Only the Dead
  3700:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Hold Tight
  3701:  { prose: 7, characters: 7, plot: 7, pacing: 8, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 8 }, // Fool Me Once
  3703:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 8 }, // One by One
  3704:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 8 }, // Locked Door
  3851:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Liar
  3984:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // One Good Deed
  4095:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7, periodAuthenticity: 8, researchIntegration: 7 },
  4096:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7, periodAuthenticity: 8, researchIntegration: 7 },
  4255:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Shelter in Place
  4313:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 7, stakes: 9, twists: 7 }, // Red Storm Rising
  4332:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, stakes: 8, twists: 7 }, // Resurrection Walk
  4375:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // Wild Fire
  4376:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // Quest
  4380:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 6, resonance: 6, ending: 6, voice: 6, stakes: 8, twists: 7 }, // Last Oracle
  4381:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 6, resonance: 6, ending: 6, voice: 6, stakes: 8, twists: 7 }, // Devil Colony
  4412:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 6, voice: 7, stakes: 7, twists: 7 }, // Cold Fire

  // === ROMANCE ===
  6497:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 8 }, // Lover Revealed
  6498:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 8 }, // Lover Unbound
  6499:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 8 }, // Lover Enshrined
  6500:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 8 }, // Lover Avenged
  6502:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 8 }, // Mine to Possess
  6503:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Darkest Lie
  6504:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Darkest Secret
  6520:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 8 }, // Kiss an Angel
  6521:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 8 }, // Breathing Room
  6525:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 7 }, // Hostage to Pleasure
  6526:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 7 }, // Branded by Fire
  6588:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 8, heaPayoff: 6 }, // Satan's Affair
  6589:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Nash
  6590:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Rowdy
  6592:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Aced
  6593:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Slow Burn
  6598:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Road Trip

  // === NONFICTION ===
  13156: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10, argument: 9, researchRigor: 8, access: 8 }, // Lives Other Than My Own
  13177: { prose: 10, characters: 9, plot: 6, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10, argument: 9, researchRigor: 7, access: 8 }, // Man's Place
  13186: { prose: 10, characters: 10, plot: 7, pacing: 4, ideas: 10, resonance: 10, ending: 8, voice: 10, argument: 10, researchRigor: 9, access: 7, periodAuthenticity: 10, researchIntegration: 9 },
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-061 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

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
