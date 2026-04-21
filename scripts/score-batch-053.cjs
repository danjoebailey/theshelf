// Batch 53 — broad coverage continuation
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === LITERARY ===
  12899: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  12900: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  12901: { prose: 10, characters: 10, plot: 7, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Maias
  12902: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Cousin Bazilio
  12903: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Relic
  12904: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Jerusalem — Tavares
  12905: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 7, ending: 7, voice: 10 }, // Learning to Pray
  12906: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 7, ending: 7, voice: 10 }, // Joseph Walser's Machine
  12907: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Book of Chameleons
  12908: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // General Theory of Oblivion
  12909: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  12910: { prose: 10, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Nowhere to Be Found
  12911: { prose: 10, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Untold Night and Day
  12912: { prose: 10, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Greater Music
  12913: { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // One Hundred Shadows
  12914: { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // I'll Go On
  12915: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Pavane for a Dead Princess
  12916: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Castella
  12917: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  12918: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Our Twisted Hero
  12919: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Wine of Astonishment
  12920: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Salt — Lovelace
  12921: { prose: 10, characters: 10, plot: 7, pacing: 6, ideas: 9, resonance: 10, ending: 8, voice: 10 }, // Dragon Can't Dance
  12922: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  12923: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  12924: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Crossing the Mangrove
  12925: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  12926: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Solibo Magnificent
  12927: { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // School Days
  12928: { prose: 10, characters: 9, plot: 8, pacing: 6, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // History of Love
  12929: { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Great House
  12930: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Forest Dark
  12931: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // World to Come
  12932: { prose: 10, characters: 9, plot: 8, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  12933: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Guide for the Perplexed
  12934: { prose: 10, characters: 9, plot: 8, pacing: 4, ideas: 10, resonance: 10, ending: 7, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  12935: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // As Though She Were Sleeping
  12936: { prose: 10, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Gold Dust
  12937: { prose: 10, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Bleeding of the Stone
  12938: { prose: 10, characters: 9, plot: 8, pacing: 6, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // Men in the Sun
  12939: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Saeed Pessoptimist
  12940: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 10, ending: 7, voice: 10 }, // Voices of the Lost
  12941: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Sacred Night
  12942: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Sand Child
  12943: { prose: 10, characters: 10, plot: 8, pacing: 6, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // Yacoubian Building
  12944: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  12945: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Zaat
  12946: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Committee
  12947: { prose: 10, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Prince Ehtejab
  12948: { prose: 10, characters: 9, plot: 7, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Missing Soluch
  12949: { prose: 10, characters: 9, plot: 7, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Colonel
  12950: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Censoring an Iranian Love Story
  12951: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  12952: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 10 }, // My Uncle Napoleon
  12953: { prose: 10, characters: 9, plot: 8, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Beauty Is a Wound
  12954: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Man Tiger
  12955: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Paradise of the Blind
  12956: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Memories of a Pure Spring
  12957: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Twilight in Jakarta
  12958: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Saman

  // === FANTASY ===
  8235:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Blood of Tyrants
  8236:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, worldBuilding: 9, magicSystem: 8 }, // League of Dragons
  8238:  { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Where the Drowned Girls Go
  8239:  { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Mislaid in Parts Half-Known
  8248:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Wicked Day
  8249:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Prince and the Pilgrim
  8257:  { prose: 8, characters: 8, plot: 8, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 10, magicSystem: 8 }, // In the Ruins
  8258:  { prose: 8, characters: 8, plot: 8, pacing: 5, ideas: 8, resonance: 7, ending: 8, voice: 8, worldBuilding: 10, magicSystem: 8 }, // Crown of Stars
  8260:  { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Navigator's Children
  8274:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Dread Wyrm
  8275:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 6, voice: 6, worldBuilding: 8, magicSystem: 7 }, // Third Kingdom
  8276:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 6, voice: 6, worldBuilding: 8, magicSystem: 7 }, // Severed Souls
  8282:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 9, worldBuilding: 10, magicSystem: 8 }, // Wandering Fire
  8283:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 9, ending: 9, voice: 9, worldBuilding: 10, magicSystem: 8 }, // Darkest Road
  8284:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9, worldBuilding: 10, magicSystem: 9 }, // Killing Moon
  8285:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9, worldBuilding: 10, magicSystem: 9 }, // Shadowed Sun

  // === SF ===
  3650:  { prose: 9, characters: 7, plot: 6, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 10, worldBuilding: 8, speculativeRigor: 7 }, // Toynbee Convector
  4101:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 8 }, // Bicentennial Man (collection)
  4102:  { prose: 7, characters: 7, plot: 7, pacing: 8, ideas: 8, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Fantastic Voyage
  4103:  { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 8 }, // White Plague
  4210:  { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 10, speculativeRigor: 9 }, // Glory Season
  4334:  { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 10, speculativeRigor: 8 }, // Dosadi Experiment
  4335:  { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, speculativeRigor: 7 }, // Dragon in the Sea
  4336:  { prose: 10, characters: 7, plot: 6, pacing: 7, ideas: 10, resonance: 9, ending: 8, voice: 10, worldBuilding: 9, speculativeRigor: 8 }, // Ones Who Walk Away
  4341:  { prose: 9, characters: 7, plot: 6, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, speculativeRigor: 7 }, // Golden Apples of the Sun
  4646:  { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 7 }, // Running Man
  7634:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 10, speculativeRigor: 8 }, // Difference Engine
  8978:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // Ogres
  12530: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 6 }, // Rogue Dragon
  12531: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, speculativeRigor: 7 }, // Past Master
  12532: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, speculativeRigor: 7 }, // Fourth Mansions
  12533: { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, speculativeRigor: 7 }, // Nine Hundred Grandmothers
  12535: { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 10, speculativeRigor: 8 }, // Fall of Chronopolis
  12536: { prose: 8, characters: 7, plot: 6, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 10, speculativeRigor: 8 }, // Garments of Caean
  12537: { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 7 }, // Zen Gun
  12541: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 7, ending: 7, voice: 10, worldBuilding: 9, speculativeRigor: 7 }, // Carmen Dog
  12542: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, speculativeRigor: 7 }, // Mount
  12547: { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 10, speculativeRigor: 9 }, // Woman of the Iron People
  12548: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 10, speculativeRigor: 9 }, // Ring of Swords
  12549: { prose: 8, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 9 }, // Tomb of the Fathers
  12550: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 9, worldBuilding: 10, speculativeRigor: 8 }, // Walk to the End of the World

  // === MYSTERY ===
  10481: { prose: 8, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Turquoise Lament
  10482: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Zebra-Striped Hearse
  10483: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Ivory Grin
  10484: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Far Side of the Dollar
  10485: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Meet Me at the Morgue
  10486: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Barbarous Coast
  10487: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Blue Hammer
  10488: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Instant Enemy
  10489: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Doomsters
  10490: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Way Some People Die
  10555: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 10, puzzle: 8, stakes: 8 }, // Drop
  10570: { prose: 7, characters: 8, plot: 8, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, puzzle: 8, stakes: 7 }, // On, Off
  10735: { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Naming of the Dead
  10736: { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Question of Blood
  10737: { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Hide and Seek

  // === THRILLER ===
  9234:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Alex Cross, Run
  9235:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Cross Justice
  9236:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 8 }, // Death of Mrs. Westaway
  9365:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Hidden
  9366:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Labyrinth of Lies
  9537:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 10, stakes: 8, twists: 8 }, // Hit List
  9538:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 10, stakes: 8, twists: 8 }, // Hit Parade
  9539:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 10, stakes: 8, twists: 8 }, // Hit Me
  9551:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Call Me Princess
  9552:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Night Women
  9553:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Killing Forest
  9554:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Harmless Lie
  9634:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Running Girl
  9635:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Her Father's Secret
  10188: { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 10, stakes: 8, twists: 8 }, // Gun for Sale

  // === ROMANCE ===
  5057:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 8 }, // From Lukov with Love
  5058:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 8 }, // Dear Aaron

  // === NONFICTION ===
  11468: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10, argument: 8, researchRigor: 7, access: 8 }, // Journey to the Alcarria
  11535: { prose: 9, characters: 7, plot: 5, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10, argument: 8, researchRigor: 7, access: 8 }, // Year of the Monkey
  11536: { prose: 9, characters: 7, plot: 5, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, argument: 8, researchRigor: 7, access: 8 }, // Woolgathering
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-053 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

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
