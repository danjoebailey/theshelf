// Batch 52 — broad coverage continuation
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === LITERARY ===
  12782: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  12783: { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Back to Back
  12784: { prose: 10, characters: 10, plot: 8, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  12785: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Dogs at the Perimeter
  12786: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Certainty
  12787: { prose: 9, characters: 8, plot: 6, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Bonsai
  12788: { prose: 9, characters: 7, plot: 5, pacing: 6, ideas: 10, resonance: 7, ending: 7, voice: 10 }, // Multiple Choice
  12789: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Chilean Poet
  12790: { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Ways of Going Home
  12791: { prose: 9, characters: 7, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Optic Nerve
  12792: { prose: 9, characters: 7, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Portrait of an Unknown Lady
  12793: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  12794: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Before — Boullosa
  12795: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  12796: { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Taiga Syndrome
  12797: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Iliac Crest
  12799: { prose: 10, characters: 9, plot: 7, pacing: 4, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Snow Hunters
  12800: { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Once the Shore
  12801: { prose: 10, characters: 9, plot: 7, pacing: 4, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Mountain
  12802: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // You Are Not a Stranger Here
  12803: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Union Atlantic
  12804: { prose: 10, characters: 10, plot: 8, pacing: 6, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // Imagine Me Gone
  12805: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Ways to Disappear
  12806: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Those Who Knew
  12807: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Twelve Tribes of Hattie
  12808: { prose: 10, characters: 9, plot: 7, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Old Drift
  12809: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Furrows
  12810: { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Istanbul Istanbul
  12811: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Labyrinth
  12812: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Stone and Shadow
  12813: { prose: 10, characters: 10, plot: 8, pacing: 6, ideas: 9, resonance: 10, ending: 8, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  12814: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Brothers
  12815: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Chronicle of a Blood Merchant
  12816: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Five Spice Street
  12817: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 7, ending: 6, voice: 10 }, // Last Lover
  12818: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 7, ending: 6, voice: 10 }, // I Live in the Slums
  12845: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 6, voice: 10 }, // Crudo
  12874: { prose: 10, characters: 10, plot: 8, pacing: 4, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Fortunata and Jacinta
  12875: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Tristana
  12876: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Nazarín
  12877: { prose: 10, characters: 10, plot: 7, pacing: 4, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // La Regenta
  12878: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Tree of Knowledge
  12879: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // Restlessness of Shanti Andía
  12880: { prose: 10, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Mist
  12881: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Abel Sánchez
  12882: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Saint Manuel Bueno
  12883: { prose: 10, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Marks of Identity
  12884: { prose: 10, characters: 7, plot: 5, pacing: 4, ideas: 10, resonance: 7, ending: 6, voice: 10 }, // Count Julian
  12885: { prose: 10, characters: 7, plot: 5, pacing: 4, ideas: 10, resonance: 7, ending: 6, voice: 10 }, // Juan the Landless
  12886: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 10, periodAuthenticity: 9, researchIntegration: 9 },
  12889: { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Sepharad
  12890: { prose: 10, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Manuscript of Ashes
  12891: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // In Her Absence
  12892: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // School of the Sun
  12893: { prose: 10, characters: 10, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // Time of the Doves
  12894: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Camellia Street
  12895: { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Death in Spring
  12896: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // On the Edge
  12897: { prose: 9, characters: 9, plot: 8, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  12898: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Ages of Lulu

  // === FANTASY ===
  7051:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Shadow of the Gods
  7052:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Hunger of the Gods
  7053:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Fury of the Gods
  7064:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 7 }, // Paladin's Hope
  7511:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 9, worldBuilding: 10, magicSystem: 10 }, // Locklands
  7557:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Gods of Jade and Shadow
  7575:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Map of Days
  7645:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Fragile Threads of Power
  7657:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 6, worldBuilding: 8, magicSystem: 7 }, // Heartless Sky
  7658:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 6, worldBuilding: 8, magicSystem: 7 }, // Sorrow and Starlight
  7782:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // When Among Crows
  8227:  { prose: 9, characters: 9, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 7 }, // Swords and Ice Magic
  8228:  { prose: 9, characters: 9, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 7 }, // Knight and Knave
  8232:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Infernal Battalion
  8233:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Guns of Empire
  8234:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Crucible of Gold

  // === SF ===
  9953:  { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 6, voice: 8, worldBuilding: 8, speculativeRigor: 7 }, // I Will Fear No Evil
  9954:  { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 7 }, // To Sail Beyond the Sunset
  9969:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 10, speculativeRigor: 7 }, // Big Planet
  9970:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 10, speculativeRigor: 7 }, // Languages of Pao
  9971:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 10, worldBuilding: 10, speculativeRigor: 7 }, // Blue World
  9972:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 10, speculativeRigor: 7 }, // Araminta Station
  9973:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 10, speculativeRigor: 7 }, // Night Lamp
  9974:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 10, speculativeRigor: 7 }, // Showboat World
  9982:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Fantastic Voyage II
  9983:  { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 7 }, // Nightfall (novel)
  9984:  { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 8 }, // Positronic Man
  9985:  { prose: 8, characters: 7, plot: 6, pacing: 6, ideas: 10, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 8 }, // Complete Robot
  9986:  { prose: 8, characters: 7, plot: 6, pacing: 6, ideas: 10, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 8 }, // Nine Tomorrows
  9989:  { prose: 9, characters: 7, plot: 6, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, speculativeRigor: 8 }, // Wind's Twelve Quarters
  9992:  { prose: 9, characters: 7, plot: 7, pacing: 7, ideas: 10, resonance: 8, ending: 8, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // Minority Report
  9993:  { prose: 9, characters: 7, plot: 6, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 7 }, // PKD Reader
  9996:  { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 10, resonance: 8, ending: 8, voice: 8, worldBuilding: 8, speculativeRigor: 8 }, // Nine Billion Names of God
  9997:  { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 10, resonance: 8, ending: 8, voice: 8, worldBuilding: 9, speculativeRigor: 9 }, // Sentinel
  10005: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, speculativeRigor: 8 }, // Ten Thousand Light-Years
  10007: { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 7 }, // Saucer of Loneliness
  192:   { prose: 10, characters: 9, plot: 7, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10, worldBuilding: 10, speculativeRigor: 8 }, // Shadow of the Torturer
  433:   { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10, worldBuilding: 9, speculativeRigor: 9 }, // Bloodchild
  1738:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10, worldBuilding: 9, speculativeRigor: 8 }, // Behold the Man
  2441:  { prose: 8, characters: 7, plot: 6, pacing: 4, ideas: 10, resonance: 7, ending: 6, voice: 9, worldBuilding: 10, speculativeRigor: 8 }, // Fall — Stephenson
  2455:  { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 10, speculativeRigor: 8 }, // Against the Fall of Night

  // === MYSTERY ===
  10268: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9, puzzle: 8, stakes: 7 }, // Simisola
  10269: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9, puzzle: 8, stakes: 7 }, // 13 Steps Down
  10270: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9, puzzle: 8, stakes: 7 }, // Wolf to the Slaughter
  10271: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9, puzzle: 8, stakes: 7 }, // Keys to the Street
  10469: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 10, puzzle: 8, stakes: 8 }, // Because the Night
  10471: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 10, puzzle: 8, stakes: 8 }, // Blood on the Moon
  10472: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 8, stakes: 7 }, // Clandestine
  10473: { prose: 8, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Nightmare in Pink
  10474: { prose: 8, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Purple Place for Dying
  10475: { prose: 8, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Deadly Shade of Gold
  10476: { prose: 8, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Bright Orange for the Shroud
  10477: { prose: 8, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Darker Than Amber
  10478: { prose: 8, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Pale Gray for Guilt
  10479: { prose: 8, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Tan and Sandy Silence
  10480: { prose: 8, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Scarlet Ruse

  // === THRILLER ===
  9127:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Switch
  9129:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Bonnie
  9131:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 6, voice: 7, stakes: 7, twists: 7 }, // Life Expectancy
  9132:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 6, voice: 7, stakes: 7, twists: 7 }, // Brother Odd
  9134:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Chosen to Die
  9135:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Born to Die
  9148:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 6 }, // Gray Mountain
  9149:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Hit
  9150:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Target
  9151:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // End Game
  9156:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Alibi Man
  9158:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Watch Your Back
  9159:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Reckless Abandon
  9160:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Fresh Disasters
  9233:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // What Have You Done?

  // === ROMANCE ===
  5052:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 8, heaPayoff: 7 }, // Rival
  5053:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 8, heaPayoff: 7 }, // Falling Away

  // === NONFICTION ===
  6246:  { prose: 9, characters: 8, plot: 6, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 10, argument: 9, researchRigor: 8, access: 10 }, // On Writing
  8795:  { prose: 10, characters: 8, plot: 5, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10, argument: 10, researchRigor: 9, access: 8 }, // When I Was a Child I Read Books
  11465: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10, argument: 9, researchRigor: 8, access: 8 }, // Report to Greco
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-052 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

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
