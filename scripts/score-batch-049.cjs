// Batch 49 — broad coverage continuation
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === LITERARY ===
  11819: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 10 }, // Thirteenth Tale
  11820: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Bellman & Black
  11821: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 10 }, // Once Upon a River
  11964: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Family Fang
  11965: { prose: 9, characters: 9, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Nothing to See Here
  11966: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Now Is Not the Time to Panic
  11967: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // Run for the Hills
  11972: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  11973: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  11974: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  11975: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  12081: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Future Library
  12098: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9, periodAuthenticity: 10, researchIntegration: 8 },
  12155: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 9, periodAuthenticity: 10, researchIntegration: 9 },
  12156: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, periodAuthenticity: 10, researchIntegration: 9 },
  12157: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, periodAuthenticity: 10, researchIntegration: 9 },
  12158: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, periodAuthenticity: 10, researchIntegration: 9 },
  12182: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  12192: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 6, voice: 9 }, // Crooked Little Vein
  12207: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9, periodAuthenticity: 9, researchIntegration: 8 },
  12208: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9, periodAuthenticity: 9, researchIntegration: 8 },
  12216: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  12262: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9, periodAuthenticity: 9, researchIntegration: 8 },
  12273: { prose: 10, characters: 10, plot: 8, pacing: 4, ideas: 10, resonance: 9, ending: 8, voice: 10, periodAuthenticity: 10, researchIntegration: 10 },
  12292: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Everything Under
  12294: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 7, ending: 6, voice: 10 }, // Fen
  12352: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Hawksmoor
  12353: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // House of Doctor Dee
  12355: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // Casebook of Victor Frankenstein
  12356: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Monkey Beach
  12357: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Son of a Trickster
  12358: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Trickster Drift
  12359: { prose: 9, characters: 7, plot: 6, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 10 }, // Stain
  12360: { prose: 9, characters: 7, plot: 6, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 10 }, // Fountains of Neptune
  12361: { prose: 9, characters: 7, plot: 5, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 10 }, // Phosphor in Dreamland
  12397: { prose: 9, characters: 7, plot: 6, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 9 }, // Unfinished World
  12398: { prose: 9, characters: 7, plot: 6, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 9 }, // And I Do Not Forgive You
  12424: { prose: 10, characters: 7, plot: 7, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 10 }, // Fables for Our Time
  12448: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 10 }, // Pym
  12449: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Loving Day
  12455: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  12456: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  12457: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Medusa Child
  12512: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 9 }, // We Were the Mulvaneys
  12534: { prose: 8, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9, periodAuthenticity: 9, researchIntegration: 8 },
  12545: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 8, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  12583: { prose: 10, characters: 10, plot: 8, pacing: 4, ideas: 10, resonance: 9, ending: 8, voice: 10, periodAuthenticity: 10, researchIntegration: 10 },
  12610: { prose: 8, characters: 9, plot: 7, pacing: 6, ideas: 7, resonance: 8, ending: 7, voice: 9, periodAuthenticity: 9, researchIntegration: 8 },
  12636: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 10 }, // Envy
  12637: { prose: 10, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Petersburg
  12638: { prose: 10, characters: 7, plot: 5, pacing: 4, ideas: 9, resonance: 7, ending: 6, voice: 10 }, // Kotik Letaev
  12639: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Manikin
  12640: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  12641: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 10 }, // Make Believe
  12642: { prose: 10, characters: 7, plot: 5, pacing: 4, ideas: 10, resonance: 7, ending: 6, voice: 10 }, // Mulligan Stew
  12643: { prose: 10, characters: 7, plot: 5, pacing: 4, ideas: 10, resonance: 7, ending: 6, voice: 10 }, // Imaginative Qualities
  12644: { prose: 10, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 7, ending: 7, voice: 10 }, // Aberration of Starlight
  12645: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Cigarettes
  12646: { prose: 9, characters: 7, plot: 5, pacing: 5, ideas: 10, resonance: 7, ending: 6, voice: 10 }, // Tlooth
  12647: { prose: 9, characters: 7, plot: 5, pacing: 5, ideas: 10, resonance: 7, ending: 6, voice: 10 }, // Journalist

  // === FANTASY ===
  11627: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 }, // Twice Bitten
  11628: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Moonheart
  11629: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Little Country
  11630: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Memory and Dream
  11645: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 7 }, // Something from the Nightside
  11646: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 7 }, // Hawk & Fisher
  11647: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 7 }, // Blue Moon Rising
  11648: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Jhereg
  4161:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 8 }, // Magic's Price
  4162:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 8 }, // By the Sword
  4168:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9, worldBuilding: 8, magicSystem: 8 }, // Chalice
  4169:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Pegasus
  4173:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Port of Shadows
  4224:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Drowned Wednesday
  4225:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 }, // Siege of Darkness
  4226:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 }, // Passage to Dawn

  // === SF ===
  9264:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // Eversion
  9528:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 10, speculativeRigor: 8 }, // Long War
  9529:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 10, speculativeRigor: 8 }, // Long Mars
  9530:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 10, speculativeRigor: 8 }, // Long Utopia
  9531:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 10, speculativeRigor: 8 }, // Long Cosmos
  9561:  { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 9 }, // Odyssey — McDevitt
  9562:  { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 9 }, // Cauldron
  9580:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 10, speculativeRigor: 8 }, // Kif Strike Back
  9582:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 10, speculativeRigor: 8 }, // Chanur's Legacy
  9636:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 8, worldBuilding: 9, speculativeRigor: 8 }, // Red God
  9648:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 10, speculativeRigor: 9 }, // Shroud
  9655:  { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 8, resonance: 9, ending: 7, voice: 10, worldBuilding: 9, speculativeRigor: 7 }, // As You Wake, Break the Shell
  9673:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, speculativeRigor: 8 }, // Death of the Author
  9685:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 10, speculativeRigor: 8 }, // Urth of the New Sun
  9707:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // Planet of Exile
  9708:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // City of Illusions
  9709:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10, worldBuilding: 9, speculativeRigor: 8 }, // Four Ways to Forgiveness
  9725:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // Just City
  9726:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // Philosopher Kings
  9727:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // Necessity
  9728:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // My Real Children
  9734:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 10, speculativeRigor: 8 }, // Rosewater
  9735:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 10, speculativeRigor: 8 }, // Rosewater Insurrection
  9736:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 10, speculativeRigor: 8 }, // Rosewater Redemption
  9737:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // Far from the Light of Heaven

  // === MYSTERY ===
  9221:  { prose: 8, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, puzzle: 8, stakes: 7 }, // Moor
  9222:  { prose: 8, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9, puzzle: 8, stakes: 8 }, // O Jerusalem
  9223:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, puzzle: 8, stakes: 7 }, // Justice Hall
  9224:  { prose: 8, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, puzzle: 8, stakes: 7 }, // Game — King
  9275:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Keeper — McTiernan
  9480:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Silent Voices
  9481:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Glass Room
  9482:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Harbour Street
  9483:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Moth Catcher
  9484:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Seagull
  9485:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Darkest Evening
  9515:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Critic
  9516:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Blacklight Blue
  9517:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Freeze Frame
  9518:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Blowback

  // === THRILLER ===
  7628:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 8 }, // Key to Rebecca
  7629:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // Lie Down with Lions
  8306:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 10, stakes: 8, twists: 8 }, // Boy Who Followed Ripley
  8307:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 10, stakes: 8, twists: 8 }, // Ripley Under Water
  8375:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Indelible
  8376:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Faithless
  8377:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Beyond Reach
  8421:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Thursday's Children
  8422:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Friday on My Mind
  8423:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Saturday Requiem
  8430:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Minute to Midnight
  8431:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Daylight
  8439:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Kisscut
  8441:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Die Again
  8461:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 7 }, // Sleepwalker

  // === HORROR ===
  12351: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 10, atmosphere: 10, dread: 9 }, // Man in the Picture
  12365: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9, atmosphere: 10, dread: 10 }, // Dark Matter
  12366: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9, atmosphere: 10, dread: 10 }, // Thin Air — Paver
  12367: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9, atmosphere: 10, dread: 10 }, // Wakenhyrst
  12480: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 9, atmosphere: 9, dread: 8 }, // Skullcrack City
  12481: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 9, atmosphere: 9, dread: 8 }, // Loop
  12482: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 9, atmosphere: 9, dread: 8 }, // Entropy in Bloom
  12508: { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 10, atmosphere: 9, dread: 10 }, // Zombie
  12509: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9, atmosphere: 10, dread: 9 }, // Accursed
  12510: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, atmosphere: 9, dread: 9 }, // Beasts

  // === ROMANCE ===
  4941:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Crown
  4950:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, chemistry: 6, tension: 7, heaPayoff: 6 }, // Frankie Landau-Banks

  // === NONFICTION ===
  1387:  { prose: 9, characters: 7, plot: 5, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 10, argument: 7, researchRigor: 5, access: 8 }, // Shakespeare Never Did This
  1395:  { prose: 9, characters: 8, plot: 5, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 10, argument: 8, researchRigor: 6, access: 9 }, // Man Without a Country
  1396:  { prose: 9, characters: 8, plot: 5, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 10, argument: 8, researchRigor: 6, access: 9 }, // Palm Sunday
  1397:  { prose: 9, characters: 8, plot: 5, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 10, argument: 8, researchRigor: 6, access: 9 }, // Fates Worse Than Death
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-049 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

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
