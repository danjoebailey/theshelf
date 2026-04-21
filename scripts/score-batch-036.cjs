// Batch 36 — broad coverage continuation
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === LITERARY ===
  10296: { prose: 9, characters: 9, plot: 7, pacing: 4, ideas: 8, resonance: 9, ending: 8, voice: 9 }, // Dance of the Happy Shades — Munro
  10297: { prose: 9, characters: 9, plot: 7, pacing: 4, ideas: 8, resonance: 9, ending: 8, voice: 9 }, // Moons of Jupiter
  10298: { prose: 9, characters: 9, plot: 7, pacing: 4, ideas: 8, resonance: 9, ending: 8, voice: 9 }, // Progress of Love
  10299: { prose: 9, characters: 9, plot: 7, pacing: 4, ideas: 8, resonance: 9, ending: 8, voice: 9 }, // Friend of My Youth
  10300: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Dancing Girls — Atwood
  10301: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Bluebeard's Egg
  10302: { prose: 9, characters: 7, plot: 5, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 10 }, // Good Bones (prose poems)
  10303: { prose: 9, characters: 7, plot: 6, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 10 }, // Susanna Moodie
  10304: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // Flight from the Enchanter
  10305: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // Sandcastle
  10306: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // Time of the Angels
  10307: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // Nice and the Good
  10308: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 9, periodAuthenticity: 8, researchIntegration: 7 },
  10309: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // Unicorn
  10310: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // Unofficial Rose
  10311: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // Comforters — Spark
  10312: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // Ballad of Peckham Rye
  10313: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // Mandelbaum Gate
  10314: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // Robinson — Spark
  10315: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // Public Image
  10329: { prose: 9, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 9 }, // Russell Autobiography
  10333: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Prime of Life
  10334: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 9 }, // Woman Destroyed
  10335: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // All Said and Done
  10336: { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 10 }, // The Words — Sartre
  10338: { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 6, ending: 6, voice: 8 }, // Nekrassov
  10339: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 8, ending: 8, voice: 9 }, // Caligula — Camus
  10341: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 10, ending: 9, voice: 10 }, // Glass Menagerie
  10342: { prose: 10, characters: 10, plot: 8, pacing: 6, ideas: 9, resonance: 10, ending: 9, voice: 10 }, // Streetcar
  10343: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 9, voice: 10 }, // Cat on a Hot Tin Roof
  10344: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Night of the Iguana
  10345: { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Suddenly, Last Summer
  10346: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Sweet Bird of Youth
  10347: { prose: 10, characters: 10, plot: 9, pacing: 7, ideas: 10, resonance: 10, ending: 10, voice: 10 }, // Death of a Salesman
  10348: { prose: 10, characters: 9, plot: 9, pacing: 7, ideas: 10, resonance: 10, ending: 9, voice: 10 }, // Crucible
  10349: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 9 }, // View from the Bridge
  10350: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9 }, // All My Sons
  10351: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8 }, // After the Fall
  10352: { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 8 }, // Ripple from the Storm
  10353: { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 8 }, // Landlocked
  10354: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Summer Before the Dark
  10355: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Memoirs of a Survivor
  10358: { prose: 10, characters: 9, plot: 8, pacing: 4, ideas: 9, resonance: 9, ending: 8, voice: 10, periodAuthenticity: 10, researchIntegration: 9 }, // Place of Greater Safety
  10359: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // Fludd
  10360: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9, periodAuthenticity: 9, researchIntegration: 8 },
  10361: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // Experiment in Love
  10362: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Change of Climate
  10363: { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 10 }, // Giving Up the Ghost
  10364: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Assassination of Margaret Thatcher
  10365: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Matisse Stories
  10366: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // Game — Byatt
  10367: { prose: 9, characters: 7, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Ragnarok
  10369: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 8, resonance: 9, ending: 7, voice: 9 }, // Voyage in the Dark
  10370: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 8, resonance: 9, ending: 7, voice: 9 }, // After Leaving Mr. Mackenzie
  10371: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 8, resonance: 9, ending: 7, voice: 9 }, // Quartet — Rhys
  10381: { prose: 7, characters: 7, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, periodAuthenticity: 7, researchIntegration: 7 },
  10382: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7 }, // In Search of the Castaways
  10383: { prose: 7, characters: 6, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 6, voice: 7 }, // Five Weeks in a Balloon
  10395: { prose: 10, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 10 }, // Pygmalion
  10396: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Man and Superman

  // === FANTASY ===
  10797: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, worldBuilding: 7, magicSystem: 7 }, // Running with the Demon
  10798: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, worldBuilding: 7, magicSystem: 7 }, // Armageddon's Children
  10800: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Books of Magic
  10806: { prose: 8, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 9, worldBuilding: 8, magicSystem: 7 }, // Solomon Kane
  10807: { prose: 8, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 9, worldBuilding: 8, magicSystem: 6 }, // Bran Mak Morn
  10808: { prose: 8, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 9, worldBuilding: 8, magicSystem: 7 }, // Kull
  10817: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 }, // Spine of the World
  10818: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 }, // Road of the Patriarch
  10819: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 6, voice: 7, worldBuilding: 7, magicSystem: 7 }, // Sword of Bedwyr
  10820: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 6, voice: 7, worldBuilding: 7, magicSystem: 7 }, // Dragon King
  10821: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 }, // Elvenbane
  10822: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 8 }, // Across the Wall
  10827: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 7 }, // Dogsbody
  10828: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 7 }, // House of Many Ways
  10829: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 7 }, // Cart and Cwidder
  10830: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 7 }, // Spellcoats
  10831: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Tale of Time City

  // === SF ===
  11662: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 5 }, // A Princess of Mars
  11664: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 7, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 5 }, // Gods of Mars
  11665: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 6, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 5 }, // Warlord of Mars
  11666: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 7, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 5 }, // At the Earth's Core
  11674: { prose: 8, characters: 7, plot: 7, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 8 }, // Salt
  11675: { prose: 8, characters: 7, plot: 7, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 7 }, // On
  11676: { prose: 8, characters: 7, plot: 8, pacing: 6, ideas: 9, resonance: 7, ending: 8, voice: 8, worldBuilding: 8, speculativeRigor: 8 }, // Jack Glass
  11691: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, worldBuilding: 7, speculativeRigor: 7 }, // West of Honor
  11692: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Janissaries
  11693: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, worldBuilding: 7, speculativeRigor: 7 }, // King David's Spaceship
  11703: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 7 }, // Valor's Choice
  11720: { prose: 7, characters: 7, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 7 }, // Sleeping Giants
  11721: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 7 }, // Waking Gods
  11722: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 7 }, // Only Human
  11723: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 7, speculativeRigor: 8 }, // The Test
  11724: { prose: 7, characters: 7, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // 14
  11725: { prose: 7, characters: 7, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Fold
  11746: { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 6 }, // Dies the Fire
  11747: { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 6 }, // Protector's War
  11748: { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 6 }, // Meeting at Corvallis
  11749: { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Island in the Sea of Time
  11750: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 6 }, // 1632
  11751: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 6 }, // 1633
  11752: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 6 }, // 1634 Baltic War
  11757: { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Guns of the South

  // === MYSTERY ===
  5309:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // Any Other Name
  5310:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // Dry Bones
  5311:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 8, voice: 8, puzzle: 8, stakes: 7 }, // Western Star
  5478:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // We Solve Murders
  5553:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Darkness — Jónasson
  5554:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Island
  5555:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Mist
  5557:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Lost Woman
  5900:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // Free Fall — Crais
  5917:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 5 }, // Lemon Meringue Pie
  5942:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 8, puzzle: 7, stakes: 6 }, // Death of a Gossip
  5943:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 8, puzzle: 7, stakes: 6 }, // Death of a Cad
  6324:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Broken Skin
  6326:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Blind Eye
  6327:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Dark Blood

  // === THRILLER ===
  4195:  { prose: 7, characters: 7, plot: 7, pacing: 8, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 8, twists: 8 }, // Survive the Night
  4197:  { prose: 7, characters: 7, plot: 7, pacing: 8, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 8, twists: 8 }, // Middle of the Night
  4198:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Dead Man's Footsteps
  4199:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Dead Tomorrow
  4201:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Lying Beside You
  4202:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // When You Are Mine
  4205:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Take Your Breath Away
  4253:  { prose: 6, characters: 6, plot: 6, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 6 }, // Double Cross
  4256:  { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Girls in the Garden
  4257:  { prose: 6, characters: 6, plot: 6, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Housemaid Is Watching
  4258:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Missing You
  4259:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 8, stakes: 7, twists: 7 }, // Win
  4310:  { prose: 9, characters: 9, plot: 8, pacing: 5, ideas: 9, resonance: 8, ending: 8, voice: 9, stakes: 8, twists: 8 }, // Little Drummer Girl
  4311:  { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, stakes: 7, twists: 7 }, // Our Kind of Traitor
  4314:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Without Remorse

  // === HORROR ===
  11919: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 9, atmosphere: 9, dread: 9 }, // Coyote Songs
  11920: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, atmosphere: 8, dread: 8 }, // Zero Saints
  11953: { prose: 8, characters: 8, plot: 9, pacing: 7, ideas: 9, resonance: 9, ending: 9, voice: 8, atmosphere: 9, dread: 10 }, // Rosemary's Baby
  11954: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 9, ending: 9, voice: 8, atmosphere: 8, dread: 9 }, // Stepford Wives
  11957: { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 8, atmosphere: 9, dread: 9 }, // Other — Tryon
  11958: { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, atmosphere: 9, dread: 9 }, // Harvest Home
  11959: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 9, ending: 8, voice: 8, atmosphere: 10, dread: 10 }, // Exorcist
  11960: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, atmosphere: 9, dread: 9 }, // Legion — Blatty
  11961: { prose: 6, characters: 6, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 6, voice: 6, atmosphere: 8, dread: 8 }, // Suffer the Children
  11962: { prose: 6, characters: 6, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 6, voice: 6, atmosphere: 7, dread: 7 }, // Punish the Sinners
  644:   { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 8, atmosphere: 8, dread: 8 }, // Doctor Sleep
  766:   { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, atmosphere: 9, dread: 9 }, // Cujo

  // === ROMANCE ===
  696:   { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 5, resonance: 6, ending: 6, voice: 5, chemistry: 6, tension: 6, heaPayoff: 6 }, // It Starts with Us
  850:   { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Happy Place
  851:   { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Funny Story
  855:   { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 5, resonance: 6, ending: 6, voice: 5, chemistry: 7, tension: 7, heaPayoff: 6 }, // November 9
  856:   { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 5, chemistry: 7, tension: 6, heaPayoff: 7 }, // Reminders of Him
  965:   { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9, chemistry: 6, tension: 6, heaPayoff: 6 }, // Turtles All the Way Down
  1002:  { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 5, chemistry: 7, tension: 6, heaPayoff: 7 }, // Slammed
  1003:  { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 5, chemistry: 7, tension: 6, heaPayoff: 7 }, // Hopeless — Hoover
  1004:  { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 5, chemistry: 7, tension: 6, heaPayoff: 7 }, // Maybe Someday
  1077:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // One True Loves
  1144:  { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 4, resonance: 5, ending: 6, voice: 5, chemistry: 7, tension: 7, heaPayoff: 7 }, // Twisted Lies

  // === NONFICTION ===
  10641: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 9, argument: 8, researchRigor: 8, access: 8 }, // Zeitoun
  10661: { prose: 8, characters: 6, plot: 5, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 9, argument: 8, researchRigor: 9, access: 9 }, // Six Easy Pieces
  10662: { prose: 8, characters: 6, plot: 5, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 9, argument: 9, researchRigor: 10, access: 7 }, // QED
  10665: { prose: 7, characters: 5, plot: 5, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 7, argument: 9, researchRigor: 7, access: 6 }, // Critique of the Gotha Program
  10666: { prose: 8, characters: 6, plot: 6, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 8, argument: 9, researchRigor: 8, access: 5 }, // Eighteenth Brumaire
  10719: { prose: 9, characters: 6, plot: 5, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 9, argument: 8, researchRigor: 6, access: 8 }, // Problem of Pain
  10726: { prose: 9, characters: 7, plot: 6, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 10, argument: 8, researchRigor: 7, access: 8 }, // Radical Chic
  10727: { prose: 9, characters: 6, plot: 6, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 10, argument: 8, researchRigor: 7, access: 8 }, // From Bauhaus to Our House
  10728: { prose: 9, characters: 6, plot: 6, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 10, argument: 8, researchRigor: 7, access: 8 }, // Painted Word
  10729: { prose: 9, characters: 7, plot: 6, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 10, argument: 8, researchRigor: 7, access: 8 }, // Pump House Gang
  10756: { prose: 9, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9, argument: 9, researchRigor: 9, access: 8 }, // Zimmerman Telegram
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-036 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

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
