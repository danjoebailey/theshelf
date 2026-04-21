// Batch 38 — broad coverage continuation
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === LITERARY ===
  10611: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 9 }, // Prometheus Bound
  10612: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 9 }, // Persians
  10613: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Seven Against Thebes
  10614: { prose: 9, characters: 7, plot: 6, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // Suppliants
  10615: { prose: 10, characters: 7, plot: 5, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 10 }, // Colossus and Other Poems
  10616: { prose: 10, characters: 8, plot: 5, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Johnny Panic
  10632: { prose: 10, characters: 7, plot: 5, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 10 }, // Death of a Naturalist
  10633: { prose: 10, characters: 7, plot: 5, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 10 }, // Seeing Things
  10634: { prose: 10, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 9, ending: 9, voice: 10 }, // Beowulf — Heaney
  10638: { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Heartbreaking Work
  10639: { prose: 8, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 9 }, // What Is the What
  10640: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 6, voice: 7 }, // Circle
  10642: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Hologram for the King
  10643: { prose: 10, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Primeval and Other Times
  10644: { prose: 10, characters: 8, plot: 6, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // House of Day, House of Night
  10645: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Safe Conduct
  10646: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 8, resonance: 9, ending: 8, voice: 10 }, // Curtain of Green
  10648: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9 }, // Magic Barrel
  10649: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // New Life
  10650: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Idiots First
  10651: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Tenants
  10652: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Pictures of Fidelman
  10654: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9, periodAuthenticity: 9, researchIntegration: 8 }, // Satan in Goray
  10659: { prose: 9, characters: 9, plot: 7, pacing: 7, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Surely You're Joking
  10660: { prose: 9, characters: 9, plot: 7, pacing: 7, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // What Do You Care
  10669: { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 10 }, // Wasp Factory
  10670: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Bridge — Banks
  10672: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Crow Road
  10673: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 8, resonance: 7, ending: 6, voice: 9 }, // Song of Stone
  10674: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Steep Approach to Garbadale
  10687: { prose: 10, characters: 7, plot: 5, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 10 }, // Poet in New York
  10688: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 10 }, // Yerma
  10689: { prose: 10, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 10, ending: 9, voice: 10 }, // Blood Wedding
  10690: { prose: 10, characters: 10, plot: 8, pacing: 6, ideas: 9, resonance: 10, ending: 9, voice: 10 }, // House of Bernarda Alba
  10691: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, periodAuthenticity: 9, researchIntegration: 8 },
  10692: { prose: 9, characters: 8, plot: 7, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 9, periodAuthenticity: 9, researchIntegration: 8 },
  10693: { prose: 10, characters: 9, plot: 7, pacing: 3, ideas: 10, resonance: 9, ending: 8, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  10694: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // Gertrud
  10695: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Flounder
  10696: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 9, resonance: 7, ending: 7, voice: 10 }, // Rat
  10697: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9, periodAuthenticity: 9, researchIntegration: 8 },
  10698: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Clown
  10699: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Billiards at Half-Past Nine
  10700: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // And Never Said a Word
  10701: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 10, periodAuthenticity: 10, researchIntegration: 9 }, // Iceland's Bell
  10702: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Atom Station
  10703: { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Under the Glacier
  10704: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Adrift on the Nile
  10705: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Harafish
  10706: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Day the Leader Was Killed
  10707: { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Istanbul
  10708: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Dance of the Forests
  10709: { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 9 }, // Lion and the Jewel
  10710: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // You Must Set Forth at Dawn
  10711: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9 }, // Dreams in a Time of War

  // === FANTASY ===
  10923: { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 10, worldBuilding: 9, magicSystem: 7 }, // Railsea
  10924: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 9 }, // Mirror Empire
  10925: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 9 }, // Empire Ascendant
  10926: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 9 }, // Broken Heavens
  10943: { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 8, voice: 7, worldBuilding: 8, magicSystem: 8 }, // Dragons of Summer Flame
  10944: { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 8 }, // Hourglass Mage
  10945: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 }, // Dwarven Depths
  10946: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 }, // Highlord Skies
  10947: { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 8 }, // Serpent Mage
  10954: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 8, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 7 }, // Moreta
  10956: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 7 }, // Renegades of Pern
  10957: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 8, voice: 7, worldBuilding: 9, magicSystem: 8 }, // All the Weyrs
  10958: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 7 }, // Skies of Pern
  10959: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 }, // Dragonseye
  10968: { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10, worldBuilding: 10, magicSystem: 8 }, // Phoenix v1
  10969: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 9, worldBuilding: 8, magicSystem: 6 }, // Black Jack v1
  10972: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 6, worldBuilding: 8, magicSystem: 7 }, // Angels' Blood

  // === SF ===
  11811: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 6, voice: 6, worldBuilding: 7, speculativeRigor: 6 }, // Runner
  11812: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 6, voice: 6, worldBuilding: 7, speculativeRigor: 6 }, // Galactic Bounty
  11828: { prose: 9, characters: 8, plot: 7, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 9, worldBuilding: 10, speculativeRigor: 9 }, // Neverness
  11829: { prose: 8, characters: 8, plot: 7, pacing: 4, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 10, speculativeRigor: 8 }, // Broken God
  11830: { prose: 8, characters: 7, plot: 7, pacing: 4, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // Wild — Zindell
  11831: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, speculativeRigor: 8 }, // Life During Wartime
  11851: { prose: 8, characters: 7, plot: 8, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 8 }, // Mechanical
  11852: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 7 }, // Embers of War
  11853: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 7 }, // Fleet of Knives
  11854: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 7 }, // Light of Impossible Stars
  11855: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 6 }, // Grimspace
  11882: { prose: 8, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 9, worldBuilding: 8, speculativeRigor: 6 }, // Stainless Steel Rat
  11883: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Deathworld
  11884: { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 8 }, // Make Room! Make Room!
  11885: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 6, voice: 7, worldBuilding: 7, speculativeRigor: 6 }, // Bill, the Galactic Hero
  11886: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 8, worldBuilding: 7, speculativeRigor: 6 }, // Retief
  11887: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, worldBuilding: 7, speculativeRigor: 6 }, // Worlds of the Imperium
  11888: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 6, voice: 7, worldBuilding: 7, speculativeRigor: 6 }, // Plague of Demons
  11889: { prose: 6, characters: 6, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 6, voice: 6, worldBuilding: 8, speculativeRigor: 5 }, // Triplanetary
  11890: { prose: 6, characters: 6, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 6, voice: 6, worldBuilding: 8, speculativeRigor: 5 }, // First Lensman
  11891: { prose: 6, characters: 6, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 6, voice: 6, worldBuilding: 8, speculativeRigor: 5 }, // Galactic Patrol
  11892: { prose: 6, characters: 6, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 6, voice: 6, worldBuilding: 8, speculativeRigor: 5 }, // Skylark of Space
  11893: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Syndic
  11894: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 6, voice: 7, worldBuilding: 7, speculativeRigor: 6 }, // Not This August
  11895: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 7, speculativeRigor: 7 }, // Wasp

  // === MYSTERY ===
  6353:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Bloodline
  6354:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // From the Dead
  6355:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Good as Dead
  6358:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 7, resonance: 7, ending: 8, voice: 8, puzzle: 8, stakes: 7 }, // Cast Iron
  6430:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 6 }, // Speaking from Among the Bones
  6431:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 6 }, // Dead in Their Vaulted Arches
  6432:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 6 }, // As Chimney Sweepers
  6433:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 6 }, // Thrice the Brinded Cat
  6445:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // Black Seconds
  6446:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // Indian Bride
  6447:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // Bad Intentions
  6470:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Heart Full of Headstones
  6522:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 8, voice: 8, puzzle: 9, stakes: 8 }, // Last Murder at the End of the World
  6531:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, puzzle: 6, stakes: 5 }, // Merry Merry Ghost
  6532:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, puzzle: 6, stakes: 5 }, // Ghost Gone Wild

  // === THRILLER ===
  4440:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Last to Die
  4441:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Dead Like You
  4444:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Night Prey
  4445:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Mind Prey
  4446:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Sudden Prey
  4447:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Chosen Prey
  4448:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Naked Prey
  4449:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Broken Prey
  4455:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 7 }, // Winterkill
  4456:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 7 }, // Trophy Hunt
  4531:  { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 8, resonance: 7, ending: 8, voice: 8, stakes: 8, twists: 8 }, // Ghost — Harris
  4532:  { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 8, resonance: 7, ending: 8, voice: 8, stakes: 8, twists: 8 }, // Conclave
  4596:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Last Temptation — McDermid
  4597:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Torment of Others
  4598:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Beneath the Bleeding

  // === HORROR ===
  12026: { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 6, resonance: 6, ending: 6, voice: 7, atmosphere: 8, dread: 7 }, // Halloween Man
  12056: { prose: 9, characters: 7, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 8, voice: 9, atmosphere: 10, dread: 9 }, // House on the Borderland
  12058: { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, atmosphere: 9, dread: 8 }, // Ghost Pirates
  12059: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, atmosphere: 9, dread: 7 }, // Carnacki
  12060: { prose: 9, characters: 7, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10, atmosphere: 10, dread: 9 }, // King in Yellow
  1615:  { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, atmosphere: 10, dread: 9 }, // Slade House
  1990:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, atmosphere: 9, dread: 8 }, // Twisted Ones
  2479:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, atmosphere: 9, dread: 8 }, // Wolf's Hour
  2480:  { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 8, atmosphere: 8, dread: 8 }, // Mine
  3406:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, atmosphere: 9, dread: 8 }, // Fevre Dream

  // === ROMANCE ===
  3139:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 8 }, // Say Yes to the Marquess
  3146:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Search — Roberts
  3150:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Safe Haven
  3152:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // See Me
  3579:  { prose: 7, characters: 7, plot: 7, pacing: 8, ideas: 6, resonance: 6, ending: 7, voice: 7, chemistry: 5, tension: 7, heaPayoff: 6 }, // Kill Joy
  3580:  { prose: 7, characters: 7, plot: 7, pacing: 8, ideas: 6, resonance: 6, ending: 7, voice: 7, chemistry: 5, tension: 7, heaPayoff: 6 }, // Five Survive
  3581:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 8 }, // Secretly Yours
  3582:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 8 }, // Unfortunately Yours
  3676:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, chemistry: 8, tension: 7, heaPayoff: 8 }, // Attachments
  3679:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Pairing
  3680:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 6, heaPayoff: 8 }, // Royal Holiday
  3681:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 6, heaPayoff: 8 }, // By the Book
  3842:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 8 }, // Any Duchess Will Do
  3843:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 8 }, // Governess Game
  3846:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 8 }, // To Sir Phillip
  3847:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 8 }, // When He Was Wicked
  3848:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 8 }, // It's in His Kiss
  3849:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 8 }, // On the Way to the Wedding

  // === NONFICTION ===
  12121: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9, argument: 8, researchRigor: 7, access: 8 }, // Starting Point
  12199: { prose: 9, characters: 7, plot: 6, pacing: 7, ideas: 10, resonance: 9, ending: 8, voice: 10, argument: 10, researchRigor: 9, access: 10 }, // Understanding Comics
  12200: { prose: 8, characters: 7, plot: 6, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 9, argument: 9, researchRigor: 8, access: 9 }, // Reinventing Comics
  9795:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9, argument: 9, researchRigor: 10, access: 7 }, // Stilwell
  9796:  { prose: 9, characters: 7, plot: 6, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 9, argument: 9, researchRigor: 9, access: 8 }, // Practicing History
  9797:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9, argument: 9, researchRigor: 10, access: 7 }, // House of Morgan
  9798:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9, argument: 9, researchRigor: 10, access: 7 }, // Warburgs
  9807:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9, argument: 9, researchRigor: 9, access: 8 }, // Last Stand — Philbrick
  9808:  { prose: 9, characters: 7, plot: 6, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, argument: 8, researchRigor: 8, access: 8 }, // Travels with George
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-038 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

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
