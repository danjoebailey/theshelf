// Batch 44 — broad coverage continuation
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === LITERARY ===
  6780:  { prose: 9, characters: 9, plot: 8, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 9, periodAuthenticity: 9, researchIntegration: 8 },
  6781:  { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Sanshirō
  6786:  { prose: 10, characters: 8, plot: 6, pacing: 4, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Old Capital
  6793:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Painter of Signs
  6795:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 9 }, // Job: Story of a Simple Man
  6801:  { prose: 10, characters: 9, plot: 8, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  6802:  { prose: 9, characters: 9, plot: 7, pacing: 4, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Raised from the Ground
  6845:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7 }, // Someone Else's Shoes
  7132:  { prose: 9, characters: 9, plot: 6, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Redhead by the Side of the Road
  7280:  { prose: 10, characters: 10, plot: 9, pacing: 7, ideas: 10, resonance: 10, ending: 10, voice: 10 }, // Romeo and Juliet
  7281:  { prose: 10, characters: 9, plot: 9, pacing: 8, ideas: 9, resonance: 9, ending: 9, voice: 10 }, // Twelfth Night
  7465:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 9, ending: 8, voice: 8 }, // This Tender Land
  7567:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, periodAuthenticity: 9, researchIntegration: 8 },
  7568:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, periodAuthenticity: 9, researchIntegration: 8 },
  7569:  { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  7589:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9, periodAuthenticity: 10, researchIntegration: 10 },
  7595:  { prose: 9, characters: 9, plot: 9, pacing: 5, ideas: 10, resonance: 9, ending: 9, voice: 10, periodAuthenticity: 10, researchIntegration: 10 },
  7632:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  7638:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Willow Tree
  7639:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 7, ending: 6, voice: 10 }, // Waiting Period
  7789:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 8 }, // Undomestic Goddess
  7790:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 8 }, // My Not So Perfect Life
  7799:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 7 }, // Beach House — Green
  7892:  { prose: 5, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6 }, // Nine Lives — Steel
  7901:  { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 8, resonance: 9, ending: 7, voice: 9 }, // Lucy by the Sea
  7964:  { prose: 9, characters: 9, plot: 7, pacing: 4, ideas: 8, resonance: 9, ending: 8, voice: 9 }, // Too Much Happiness
  7965:  { prose: 10, characters: 10, plot: 7, pacing: 4, ideas: 9, resonance: 10, ending: 8, voice: 10 }, // Hateship Friendship
  8033:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Harder They Come
  8034:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 9 }, // Blue Skies
  8217:  { prose: 6, characters: 7, plot: 7, pacing: 5, ideas: 7, resonance: 7, ending: 7, voice: 7, periodAuthenticity: 8, researchIntegration: 8 },
  8224:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7 }, // This Was a Man
  8225:  { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 6, resonance: 7, ending: 7, voice: 7 }, // Attic on Queen Street
  8226:  { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 6, resonance: 7, ending: 7, voice: 7 }, // Dreams of Falling
  8240:  { prose: 8, characters: 9, plot: 8, pacing: 5, ideas: 9, resonance: 8, ending: 8, voice: 8, periodAuthenticity: 10, researchIntegration: 10 },
  8241:  { prose: 8, characters: 9, plot: 8, pacing: 5, ideas: 9, resonance: 8, ending: 8, voice: 8, periodAuthenticity: 10, researchIntegration: 10 },
  8242:  { prose: 8, characters: 9, plot: 8, pacing: 5, ideas: 9, resonance: 8, ending: 8, voice: 8, periodAuthenticity: 10, researchIntegration: 10 },
  8293:  { prose: 9, characters: 9, plot: 8, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9, periodAuthenticity: 10, researchIntegration: 9 },
  8294:  { prose: 9, characters: 9, plot: 8, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9, periodAuthenticity: 10, researchIntegration: 9 },
  8295:  { prose: 10, characters: 9, plot: 8, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 10, periodAuthenticity: 10, researchIntegration: 10 },
  8313:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  8315:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  8318:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 8, resonance: 9, ending: 7, voice: 9 }, // Tie That Binds
  8339:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 9, periodAuthenticity: 9, researchIntegration: 8 },
  8340:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 9, periodAuthenticity: 9, researchIntegration: 8 },
  8349:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Troubled Sleep
  8406:  { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 6, resonance: 7, ending: 7, voice: 7 }, // Missing Sister
  8407:  { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 6, resonance: 7, ending: 7, voice: 7 }, // Atlas: Pa Salt
  8462:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 8 }, // Close Your Eyes
  8464:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7 }, // Then Came You
  8469:  { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // You Think It, I'll Say It
  8482:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  8493:  { prose: 5, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6 }, // Affair — Steel
  8495:  { prose: 5, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6 }, // Whittiers
  8748:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Music of Chance
  8749:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Third Life of Grange Copeland

  // === FANTASY ===
  777:   { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 10, worldBuilding: 9, magicSystem: 7 }, // Light Fantastic
  778:   { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Sourcery
  779:   { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 10, resonance: 9, ending: 8, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Pyramids
  780:   { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Eric
  781:   { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Moving Pictures
  820:   { prose: 9, characters: 10, plot: 8, pacing: 5, ideas: 9, resonance: 10, ending: 8, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Fool's Assassin
  821:   { prose: 9, characters: 10, plot: 8, pacing: 5, ideas: 9, resonance: 10, ending: 8, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Fool's Quest
  822:   { prose: 9, characters: 10, plot: 8, pacing: 5, ideas: 9, resonance: 10, ending: 9, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Assassin's Fate
  835:   { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 8, voice: 7, worldBuilding: 9, magicSystem: 8 }, // House of Earth and Blood
  836:   { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 8, voice: 7, worldBuilding: 9, magicSystem: 8 }, // House of Sky and Breath
  837:   { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 8, voice: 7, worldBuilding: 9, magicSystem: 8 }, // House of Flame and Shadow
  841:   { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 7 }, // Silver Chair
  842:   { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 7 }, // Horse and His Boy
  843:   { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 8, worldBuilding: 9, magicSystem: 7 }, // Last Battle
  984:   { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Fairy Tale
  1571:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 7 }, // City of the Beasts
  1590:  { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Haroun and the Sea of Stories

  // === SF ===
  12489: { prose: 9, characters: 8, plot: 7, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 10, speculativeRigor: 8 }, // Ice
  12490: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 10, speculativeRigor: 8 }, // Old Axolotl
  12525: { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // Bold as Love
  12526: { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // White Queen
  12527: { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // Life — Jones
  770:   { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 7 }, // Under the Dome
  982:   { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 8, worldBuilding: 9, speculativeRigor: 8 }, // Institute
  1215:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // Dogs of War
  1308:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, speculativeRigor: 7 }, // Galápagos
  1312:  { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 9, resonance: 7, ending: 6, voice: 10, worldBuilding: 8, speculativeRigor: 6 }, // Slapstick
  1313:  { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 8, speculativeRigor: 7 }, // Timequake
  1479:  { prose: 9, characters: 7, plot: 6, pacing: 4, ideas: 10, resonance: 7, ending: 6, voice: 10, worldBuilding: 8, speculativeRigor: 8 }, // Ratner's Star
  1488:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 10, worldBuilding: 8, speculativeRigor: 8 }, // Machines Like Me
  1723:  { prose: 9, characters: 7, plot: 6, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 10, worldBuilding: 9, speculativeRigor: 7 }, // Creatures of Light and Darkness
  1724:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 10, worldBuilding: 9, speculativeRigor: 7 }, // This Immortal
  1725:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 10, worldBuilding: 9, speculativeRigor: 7 }, // Isle of the Dead
  1834:  { prose: 8, characters: 9, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // System Collapse
  1851:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // Memory
  1852:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // Civil Campaign
  1890:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 10, worldBuilding: 9, speculativeRigor: 8 }, // Agency

  // === MYSTERY ===
  7476:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Way Through the Woods
  7477:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Daughters of Cain
  7478:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Death Is Now My Neighbour
  7479:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 8, puzzle: 8, stakes: 7 }, // Remorseful Day
  7480:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Woman in Blue
  7571:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Secret of Annexe 3
  7574:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Retribution
  8265:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // Mistress of Bhatia House
  8367:  { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 8, voice: 9, puzzle: 8, stakes: 8 }, // Cop Killer
  8371:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 8, stakes: 7 }, // Dead Water
  8372:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 8, stakes: 7 }, // Thin Air
  8373:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 8, stakes: 7 }, // Cold Earth
  8374:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 8, stakes: 7 }, // Wild Fire
  8387:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Selfies
  8410:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // Rupture

  // === THRILLER ===
  5538:  { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 8 }, // Sandman
  5539:  { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 8 }, // Stalker
  5540:  { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 8 }, // Rabbit Hunter
  5549:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Waiting for Wednesday
  5618:  { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 8, resonance: 7, ending: 8, voice: 9, stakes: 8, twists: 7 }, // City on Fire
  5619:  { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 8, resonance: 7, ending: 8, voice: 9, stakes: 8, twists: 7 }, // City of Dreams
  5620:  { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 8, resonance: 7, ending: 8, voice: 9, stakes: 8, twists: 7 }, // City in Ruins
  5624:  { prose: 7, characters: 7, plot: 8, pacing: 8, ideas: 7, resonance: 6, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Charlemagne Pursuit
  5625:  { prose: 7, characters: 7, plot: 8, pacing: 8, ideas: 7, resonance: 6, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Paris Vendetta
  5626:  { prose: 7, characters: 7, plot: 8, pacing: 8, ideas: 7, resonance: 6, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Emperor's Tomb
  5632:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Secret Prey
  5633:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Certain Prey
  5634:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Easy Prey
  5642:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Dirt
  5643:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Dead in the Water

  // === HORROR ===
  12220: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, atmosphere: 8, dread: 8 }, // Ritual
  12221: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, atmosphere: 9, dread: 9 }, // Chasing the Boogeyman
  12222: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, atmosphere: 9, dread: 9 }, // Becoming the Boogeyman
  12223: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, atmosphere: 8, dread: 7 }, // Gwendy's Button Box
  12229: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, atmosphere: 8, dread: 8 }, // Violence
  9672:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 10, atmosphere: 10, dread: 9 }, // Buffalo Hunter Hunter
  9860:  { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 10, atmosphere: 10, dread: 9 }, // Necromancer's House
  9861:  { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 10, atmosphere: 10, dread: 9 }, // Those Across the River
  10000: { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 10, resonance: 9, ending: 8, voice: 10, atmosphere: 10, dread: 10 }, // Books of Blood
  10003: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 10, ending: 8, voice: 10, atmosphere: 10, dread: 10 }, // Dark Tales

  // === ROMANCE ===
  4898:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Think of England
  4899:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Proper English

  // === NONFICTION ===
  8874:  { prose: 10, characters: 7, plot: 5, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 10, argument: 9, researchRigor: 8, access: 8 }, // Feel Free
  8881:  { prose: 10, characters: 8, plot: 6, pacing: 6, ideas: 10, resonance: 10, ending: 8, voice: 10, argument: 10, researchRigor: 8, access: 9 }, // Nobody Knows My Name
  8887:  { prose: 10, characters: 7, plot: 5, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10, argument: 9, researchRigor: 8, access: 8 }, // Swim in a Pond
  9423:  { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9, argument: 9, researchRigor: 9, access: 9 }, // Wide Wide Sea
  9431:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9, argument: 9, researchRigor: 10, access: 9 }, // Demon of Unrest
  9456:  { prose: 9, characters: 8, plot: 5, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 10, argument: 8, researchRigor: 6, access: 9 }, // Theft by Finding
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-044 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

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
