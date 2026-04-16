const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const existing = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));

const batch = {
  // Eoin Colfer — Artemis Fowl (YA, but well-crafted for genre)
  11698: { vibes: { prose_craft: 6, prose_style: 4, warmth: 6, intensity: 4, pace: 8, moral_complexity: 6, fabulism: 7, emotional_register: 6, interiority: 5, tone: 7, difficulty: 3 }, tags: ["YA-fantasy", "male-protagonist", "antihero", "heist", "faeries", "witty-prose", "ensemble-cast", "technology", "irish-setting"] },
  11699: { vibes: { prose_craft: 6, prose_style: 4, warmth: 6, intensity: 5, pace: 8, moral_complexity: 6, fabulism: 7, emotional_register: 5, interiority: 5, tone: 7, difficulty: 3 }, tags: ["YA-fantasy", "male-protagonist", "antihero", "faeries", "witty-prose", "arctic-setting", "ensemble-cast"] },
  11700: { vibes: { prose_craft: 6, prose_style: 4, warmth: 6, intensity: 5, pace: 8, moral_complexity: 6, fabulism: 7, emotional_register: 5, interiority: 5, tone: 7, difficulty: 3 }, tags: ["YA-fantasy", "male-protagonist", "antihero", "faeries", "heist", "witty-prose", "technology"] },
  11701: { vibes: { prose_craft: 6, prose_style: 4, warmth: 6, intensity: 5, pace: 8, moral_complexity: 6, fabulism: 7, emotional_register: 5, interiority: 5, tone: 7, difficulty: 3 }, tags: ["YA-fantasy", "male-protagonist", "antihero", "faeries", "witty-prose", "ensemble-cast"] },

  // Ian Irvine — View from the Mirror (Australian epic fantasy, dense worldbuilding)
  11711: { vibes: { prose_craft: 5, prose_style: 5, warmth: 4, intensity: 5, pace: 4, moral_complexity: 6, fabulism: 9, emotional_register: 4, interiority: 5, tone: 3, difficulty: 6 }, tags: ["epic-fantasy", "secondary-world", "multi-pov", "worldbuilding-heavy", "portal-fantasy", "quest", "ensemble-cast", "doorstopper"] },
  11712: { vibes: { prose_craft: 5, prose_style: 5, warmth: 4, intensity: 5, pace: 4, moral_complexity: 6, fabulism: 9, emotional_register: 4, interiority: 5, tone: 3, difficulty: 6 }, tags: ["epic-fantasy", "secondary-world", "multi-pov", "worldbuilding-heavy", "war", "ensemble-cast"] },
  11713: { vibes: { prose_craft: 5, prose_style: 5, warmth: 4, intensity: 5, pace: 4, moral_complexity: 6, fabulism: 9, emotional_register: 4, interiority: 5, tone: 3, difficulty: 6 }, tags: ["epic-fantasy", "secondary-world", "multi-pov", "worldbuilding-heavy", "war"] },

  // Elizabeth Haydon — Rhapsody (epic fantasy, music magic)
  11714: { vibes: { prose_craft: 5, prose_style: 5, warmth: 6, intensity: 5, pace: 5, moral_complexity: 5, fabulism: 9, emotional_register: 5, interiority: 5, tone: 4, difficulty: 4 }, tags: ["epic-fantasy", "secondary-world", "female-protagonist", "musician-protagonist", "quest", "romance-subplot", "prophecy", "doorstopper"] },
  11715: { vibes: { prose_craft: 5, prose_style: 5, warmth: 6, intensity: 5, pace: 5, moral_complexity: 5, fabulism: 9, emotional_register: 5, interiority: 5, tone: 4, difficulty: 4 }, tags: ["epic-fantasy", "secondary-world", "female-protagonist", "prophecy", "ensemble-cast", "war"] },
  11716: { vibes: { prose_craft: 5, prose_style: 5, warmth: 6, intensity: 5, pace: 5, moral_complexity: 5, fabulism: 9, emotional_register: 5, interiority: 5, tone: 4, difficulty: 4 }, tags: ["epic-fantasy", "secondary-world", "female-protagonist", "prophecy", "war", "ancient-evil"] },

  // Jennifer Fallon — Australian fantasy
  11768: { vibes: { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 5, pace: 6, moral_complexity: 6, fabulism: 8, emotional_register: 4, interiority: 4, tone: 4, difficulty: 4 }, tags: ["epic-fantasy", "secondary-world", "political-intrigue", "female-protagonist", "ensemble-cast", "gods-walking"] },
  11769: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 5, pace: 6, moral_complexity: 7, fabulism: 7, emotional_register: 4, interiority: 5, tone: 4, difficulty: 4 }, tags: ["secondary-world", "political-intrigue", "multi-pov", "conspiracy", "island-setting", "court-intrigue"] },
  11770: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 8, emotional_register: 4, interiority: 5, tone: 4, difficulty: 5 }, tags: ["secondary-world", "political-intrigue", "gods-walking", "multi-pov", "immortality", "court-intrigue"] },

  // William C. Dietz — military SF
  11810: { vibes: { prose_craft: 4, prose_style: 4, warmth: 4, intensity: 6, pace: 7, moral_complexity: 4, fabulism: 8, emotional_register: 4, interiority: 3, tone: 3, difficulty: 3 }, tags: ["military-sf", "space-opera", "male-protagonist", "soldier-protagonist", "far-future", "action", "war"] },
  11811: { vibes: { prose_craft: 4, prose_style: 4, warmth: 4, intensity: 5, pace: 7, moral_complexity: 5, fabulism: 8, emotional_register: 4, interiority: 3, tone: 4, difficulty: 3 }, tags: ["space-opera", "male-protagonist", "quest", "far-future", "action", "adventure"] },
  11812: { vibes: { prose_craft: 4, prose_style: 4, warmth: 4, intensity: 5, pace: 7, moral_complexity: 4, fabulism: 8, emotional_register: 4, interiority: 3, tone: 4, difficulty: 3 }, tags: ["space-opera", "male-protagonist", "bounty-hunter", "far-future", "action"] },

  // Taylor Anderson — Destroyermen (WWII destroyer alternate world)
  11928: { vibes: { prose_craft: 4, prose_style: 4, warmth: 5, intensity: 6, pace: 6, moral_complexity: 5, fabulism: 8, emotional_register: 4, interiority: 3, tone: 4, difficulty: 4 }, tags: ["alternate-history-sf", "military-sf", "portal-fantasy", "ensemble-cast", "naval", "war", "aliens", "ww2-era"] },
  11929: { vibes: { prose_craft: 4, prose_style: 4, warmth: 5, intensity: 6, pace: 6, moral_complexity: 5, fabulism: 8, emotional_register: 4, interiority: 3, tone: 4, difficulty: 4 }, tags: ["alternate-history-sf", "military-sf", "ensemble-cast", "naval", "war", "aliens"] },
  11930: { vibes: { prose_craft: 4, prose_style: 4, warmth: 5, intensity: 6, pace: 6, moral_complexity: 5, fabulism: 8, emotional_register: 4, interiority: 3, tone: 4, difficulty: 4 }, tags: ["alternate-history-sf", "military-sf", "ensemble-cast", "naval", "war"] },

  // B.V. Larson — indie military SF
  11931: { vibes: { prose_craft: 3, prose_style: 3, warmth: 4, intensity: 6, pace: 8, moral_complexity: 4, fabulism: 8, emotional_register: 4, interiority: 3, tone: 4, difficulty: 2 }, tags: ["military-sf", "space-opera", "male-protagonist", "first-person", "action", "far-future", "aliens"] },
  11932: { vibes: { prose_craft: 3, prose_style: 3, warmth: 4, intensity: 5, pace: 7, moral_complexity: 4, fabulism: 8, emotional_register: 4, interiority: 3, tone: 4, difficulty: 2 }, tags: ["military-sf", "AI", "male-protagonist", "action", "far-future"] },
  11933: { vibes: { prose_craft: 3, prose_style: 3, warmth: 4, intensity: 6, pace: 8, moral_complexity: 4, fabulism: 8, emotional_register: 4, interiority: 3, tone: 4, difficulty: 2 }, tags: ["military-sf", "space-opera", "aliens", "male-protagonist", "first-person", "action", "invasion"] },

  // Rachel Caine — Stillhouse Lake (thriller)
  11943: { vibes: { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 7, pace: 8, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 3 }, tags: ["domestic-thriller", "female-protagonist", "first-person", "serial-killer", "motherhood", "ticking-clock", "identity", "small-town"] },

  // Ira Levin — classic horror/thriller master
  11953: { vibes: { prose_craft: 8, prose_style: 4, warmth: 4, intensity: 7, pace: 6, moral_complexity: 8, fabulism: 5, emotional_register: 2, interiority: 7, tone: 2, difficulty: 4 }, tags: ["psychological-horror", "female-protagonist", "pregnancy", "conspiracy", "new-york-setting", "paranoia", "domestic", "cult-horror", "gothic-atmosphere"] },
  11954: { vibes: { prose_craft: 7, prose_style: 4, warmth: 3, intensity: 5, pace: 6, moral_complexity: 8, fabulism: 3, emotional_register: 2, interiority: 6, tone: 3, difficulty: 3 }, tags: ["satirical", "dystopian", "feminism", "suburban", "conspiracy", "near-future", "female-protagonist", "domestic"] },
  11955: { vibes: { prose_craft: 7, prose_style: 4, warmth: 3, intensity: 7, pace: 8, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 3 }, tags: ["psychological-thriller", "male-protagonist", "serial-killer", "twist-ending", "university-setting", "romance-subplot"] },
  11956: { vibes: { prose_craft: 7, prose_style: 4, warmth: 3, intensity: 7, pace: 7, moral_complexity: 8, fabulism: 3, emotional_register: 3, interiority: 5, tone: 3, difficulty: 4 }, tags: ["espionage", "conspiracy", "ww2-era", "cloning", "genetic-engineering", "ticking-clock", "nazi", "male-protagonist"] },

  // Thomas Tryon — 70s literary horror
  11957: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 6, pace: 5, moral_complexity: 7, fabulism: 4, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["psychological-horror", "child-protagonist", "twin", "suburban", "unreliable-narrator", "1930s", "small-town", "gothic-atmosphere"] },
  11958: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 7, pace: 4, moral_complexity: 7, fabulism: 5, emotional_register: 2, interiority: 6, tone: 2, difficulty: 5 }, tags: ["folk-horror", "rural", "new-england-setting", "pagan", "community", "outsider-protagonist", "slow-burn", "cult-horror"] },

  // William Peter Blatty — The Exorcist, Legion
  11959: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 9, pace: 5, moral_complexity: 8, fabulism: 6, emotional_register: 1, interiority: 7, tone: 2, difficulty: 5 }, tags: ["supernatural-horror", "possession", "religious", "faith-and-doubt", "female-protagonist", "child-protagonist", "washington-dc-setting", "priest-protagonist", "graphic-violence"] },
  11960: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 7, pace: 5, moral_complexity: 8, fabulism: 5, emotional_register: 2, interiority: 7, tone: 3, difficulty: 5 }, tags: ["supernatural-horror", "serial-killer", "religious", "faith-and-doubt", "philosophical", "washington-dc-setting", "mystery"] },

  // John Saul — 80s horror
  11961: { vibes: { prose_craft: 4, prose_style: 4, warmth: 4, intensity: 7, pace: 7, moral_complexity: 4, fabulism: 4, emotional_register: 2, interiority: 4, tone: 2, difficulty: 2 }, tags: ["supernatural-horror", "child-protagonist", "small-town", "family", "evil-presence", "rural"] },
  11962: { vibes: { prose_craft: 4, prose_style: 4, warmth: 3, intensity: 7, pace: 7, moral_complexity: 4, fabulism: 4, emotional_register: 2, interiority: 4, tone: 2, difficulty: 2 }, tags: ["supernatural-horror", "religious", "boarding-school-setting", "child-protagonist", "small-town"] },
  11963: { vibes: { prose_craft: 4, prose_style: 4, warmth: 4, intensity: 6, pace: 7, moral_complexity: 5, fabulism: 4, emotional_register: 3, interiority: 4, tone: 3, difficulty: 2 }, tags: ["psychological-thriller", "conspiracy", "child-protagonist", "genetic-engineering", "suburban", "family"] },

  // Kevin Wilson — modern literary fiction (warm, absurdist)
  11964: { vibes: { prose_craft: 7, prose_style: 4, warmth: 8, intensity: 3, pace: 5, moral_complexity: 6, fabulism: 2, emotional_register: 6, interiority: 6, tone: 7, difficulty: 3 }, tags: ["comic-novel", "family", "artist-protagonist", "absurdist", "coming-of-age", "contemporary-setting", "dysfunctional-family"] },
  11965: { vibes: { prose_craft: 7, prose_style: 4, warmth: 9, intensity: 3, pace: 5, moral_complexity: 5, fabulism: 4, emotional_register: 7, interiority: 6, tone: 7, difficulty: 3 }, tags: ["magical-realism", "family", "female-protagonist", "child-protagonist", "southern-setting", "absurdist", "warm", "contemporary-setting"] },
  11966: { vibes: { prose_craft: 7, prose_style: 4, warmth: 7, intensity: 3, pace: 5, moral_complexity: 5, fabulism: 1, emotional_register: 6, interiority: 7, tone: 6, difficulty: 3 }, tags: ["coming-of-age", "friendship", "artist-protagonist", "southern-setting", "contemporary-setting", "nostalgia", "intimate"] },
  11967: { vibes: { prose_craft: 7, prose_style: 4, warmth: 8, intensity: 3, pace: 5, moral_complexity: 5, fabulism: 1, emotional_register: 6, interiority: 6, tone: 7, difficulty: 3 }, tags: ["vignettes", "family", "southern-setting", "contemporary-setting", "absurdist", "warm", "quiet-drama"] },

  // Matthew Stover — Acts of Caine (cult epic fantasy, extremely intense)
  11968: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 9, pace: 8, moral_complexity: 8, fabulism: 8, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["dark-fantasy", "secondary-world", "male-protagonist", "antihero", "violence", "graphic-violence", "portal-fantasy", "gladiator", "morally-gray-protagonist", "dystopian"] },
  11969: { vibes: { prose_craft: 8, prose_style: 6, warmth: 3, intensity: 9, pace: 5, moral_complexity: 9, fabulism: 8, emotional_register: 2, interiority: 8, tone: 2, difficulty: 7 }, tags: ["dark-fantasy", "secondary-world", "male-protagonist", "antihero", "graphic-violence", "philosophical", "disability", "morally-gray-protagonist", "doorstopper"] },
  11970: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 9, pace: 7, moral_complexity: 9, fabulism: 8, emotional_register: 2, interiority: 6, tone: 2, difficulty: 6 }, tags: ["dark-fantasy", "secondary-world", "male-protagonist", "antihero", "violence", "morally-gray-protagonist", "war"] },
  11971: { vibes: { prose_craft: 8, prose_style: 6, warmth: 3, intensity: 8, pace: 5, moral_complexity: 10, fabulism: 8, emotional_register: 2, interiority: 8, tone: 2, difficulty: 8 }, tags: ["dark-fantasy", "secondary-world", "male-protagonist", "antihero", "philosophical", "nonlinear", "metafiction", "morally-gray-protagonist"] },

  // Stephen R. Lawhead — Pendragon Cycle (Christian Arthurian)
  11972: { vibes: { prose_craft: 6, prose_style: 6, warmth: 6, intensity: 5, pace: 4, moral_complexity: 5, fabulism: 7, emotional_register: 5, interiority: 5, tone: 4, difficulty: 5 }, tags: ["historical-fantasy", "mythology-retelling", "celtic-inspired", "coming-of-age", "religious", "lyrical-prose", "british-setting"] },
  11973: { vibes: { prose_craft: 6, prose_style: 6, warmth: 6, intensity: 5, pace: 4, moral_complexity: 5, fabulism: 7, emotional_register: 5, interiority: 5, tone: 4, difficulty: 5 }, tags: ["historical-fantasy", "mythology-retelling", "celtic-inspired", "male-protagonist", "prophet", "religious", "british-setting"] },
  11974: { vibes: { prose_craft: 6, prose_style: 6, warmth: 6, intensity: 6, pace: 5, moral_complexity: 5, fabulism: 7, emotional_register: 5, interiority: 5, tone: 4, difficulty: 5 }, tags: ["historical-fantasy", "mythology-retelling", "celtic-inspired", "male-protagonist", "war", "knight-protagonist", "british-setting"] },
  11975: { vibes: { prose_craft: 6, prose_style: 6, warmth: 5, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 3, emotional_register: 4, interiority: 5, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "viking", "religious", "pilgrimage", "quest", "medieval-setting", "irish-setting"] },

  // Melanie Rawn — Dragon Prince
  11979: { vibes: { prose_craft: 5, prose_style: 5, warmth: 6, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 9, emotional_register: 5, interiority: 5, tone: 4, difficulty: 4 }, tags: ["epic-fantasy", "secondary-world", "dragons", "political-intrigue", "romance-subplot", "dynasty", "magic-system-focused", "multi-pov"] },
  11980: { vibes: { prose_craft: 5, prose_style: 5, warmth: 6, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 9, emotional_register: 5, interiority: 5, tone: 4, difficulty: 4 }, tags: ["epic-fantasy", "secondary-world", "dragons", "political-intrigue", "war", "multi-pov"] },
  11981: { vibes: { prose_craft: 5, prose_style: 5, warmth: 6, intensity: 6, pace: 5, moral_complexity: 6, fabulism: 9, emotional_register: 4, interiority: 5, tone: 4, difficulty: 4 }, tags: ["epic-fantasy", "secondary-world", "dragons", "political-intrigue", "war", "multi-pov", "ensemble-cast"] },

  // Sharon Shinn — Archangel (SF/fantasy hybrid, music, angels)
  11982: { vibes: { prose_craft: 6, prose_style: 5, warmth: 7, intensity: 3, pace: 4, moral_complexity: 5, fabulism: 8, emotional_register: 6, interiority: 6, tone: 4, difficulty: 4 }, tags: ["secondary-world", "romance-subplot", "angels", "musician-protagonist", "female-protagonist", "prophecy", "religious", "soft-sf"] },
  11983: { vibes: { prose_craft: 6, prose_style: 5, warmth: 7, intensity: 3, pace: 4, moral_complexity: 5, fabulism: 8, emotional_register: 6, interiority: 6, tone: 4, difficulty: 4 }, tags: ["secondary-world", "romance-subplot", "angels", "female-protagonist", "religious", "soft-sf"] },
  11984: { vibes: { prose_craft: 6, prose_style: 5, warmth: 6, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 8, emotional_register: 5, interiority: 6, tone: 4, difficulty: 4 }, tags: ["secondary-world", "angels", "female-protagonist", "quest", "revolution", "religious", "soft-sf"] },

  // Ian Cameron Esslemont — Malazan universe
  11988: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 7, pace: 6, moral_complexity: 7, fabulism: 10, emotional_register: 3, interiority: 5, tone: 3, difficulty: 7 }, tags: ["epic-fantasy", "secondary-world", "multi-pov", "gods-walking", "worldbuilding-heavy", "war", "assassin-protagonist", "novella-length"] },
  11989: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 7, pace: 5, moral_complexity: 8, fabulism: 10, emotional_register: 3, interiority: 5, tone: 3, difficulty: 7 }, tags: ["epic-fantasy", "secondary-world", "multi-pov", "worldbuilding-heavy", "war", "political-intrigue", "doorstopper", "ensemble-cast"] },
  11990: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 7, pace: 5, moral_complexity: 7, fabulism: 10, emotional_register: 3, interiority: 5, tone: 3, difficulty: 7 }, tags: ["epic-fantasy", "secondary-world", "multi-pov", "worldbuilding-heavy", "war", "siege", "ensemble-cast"] },

  // Kevin J. Anderson — Saga of Seven Suns
  11991: { vibes: { prose_craft: 4, prose_style: 4, warmth: 5, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 9, emotional_register: 4, interiority: 3, tone: 4, difficulty: 4 }, tags: ["space-opera", "far-future", "multi-pov", "ensemble-cast", "aliens", "political-intrigue", "war"] },
  11992: { vibes: { prose_craft: 4, prose_style: 4, warmth: 5, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 9, emotional_register: 4, interiority: 3, tone: 4, difficulty: 4 }, tags: ["space-opera", "far-future", "multi-pov", "ensemble-cast", "aliens", "war"] },
  11993: { vibes: { prose_craft: 4, prose_style: 4, warmth: 5, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 9, emotional_register: 4, interiority: 3, tone: 4, difficulty: 4 }, tags: ["space-opera", "far-future", "multi-pov", "ensemble-cast", "aliens", "war"] },
  11994: { vibes: { prose_craft: 4, prose_style: 4, warmth: 4, intensity: 5, pace: 5, moral_complexity: 5, fabulism: 8, emotional_register: 4, interiority: 4, tone: 3, difficulty: 4 }, tags: ["hard-sf", "terraforming", "near-future", "survival", "genetic-engineering"] },

  // James White — Sector General (medical SF, unique)
  11998: { vibes: { prose_craft: 5, prose_style: 4, warmth: 7, intensity: 3, pace: 5, moral_complexity: 5, fabulism: 8, emotional_register: 6, interiority: 4, tone: 5, difficulty: 4 }, tags: ["space-opera", "far-future", "aliens", "hospital-setting", "problem-solving", "ensemble-cast", "episodic", "optimistic"] },
  11999: { vibes: { prose_craft: 5, prose_style: 4, warmth: 7, intensity: 3, pace: 5, moral_complexity: 5, fabulism: 8, emotional_register: 6, interiority: 4, tone: 5, difficulty: 4 }, tags: ["space-opera", "far-future", "aliens", "hospital-setting", "problem-solving", "episodic"] },
  12000: { vibes: { prose_craft: 5, prose_style: 4, warmth: 7, intensity: 3, pace: 5, moral_complexity: 5, fabulism: 8, emotional_register: 6, interiority: 4, tone: 5, difficulty: 4 }, tags: ["space-opera", "far-future", "aliens", "hospital-setting", "problem-solving", "episodic"] },

  // Karl Schroeder — Canadian hard SF, worldbuilding-focused
  12001: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 4, pace: 5, moral_complexity: 7, fabulism: 9, emotional_register: 4, interiority: 5, tone: 3, difficulty: 7 }, tags: ["hard-sf", "far-future", "AI", "worldbuilding-heavy", "philosophical-sf", "nanotech", "colony-world"] },
  12002: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 4, pace: 5, moral_complexity: 7, fabulism: 9, emotional_register: 4, interiority: 5, tone: 3, difficulty: 7 }, tags: ["hard-sf", "far-future", "first-contact", "worldbuilding-heavy", "philosophical-sf", "colony-world"] },
  12003: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 5, pace: 7, moral_complexity: 6, fabulism: 9, emotional_register: 5, interiority: 4, tone: 5, difficulty: 5 }, tags: ["hard-sf", "space-opera", "worldbuilding-heavy", "adventure", "far-future", "steampunk-in-space"] },

  // Kerrelyn Sparks — paranormal romance comedy
  11901: { vibes: { prose_craft: 3, prose_style: 3, warmth: 8, intensity: 3, pace: 7, moral_complexity: 3, fabulism: 7, emotional_register: 7, interiority: 4, tone: 8, difficulty: 1 }, tags: ["paranormal-romance", "vampires", "female-protagonist", "HEA", "rom-com", "witty-prose", "contemporary-setting"] },
  11902: { vibes: { prose_craft: 3, prose_style: 3, warmth: 8, intensity: 3, pace: 7, moral_complexity: 3, fabulism: 7, emotional_register: 7, interiority: 4, tone: 8, difficulty: 1 }, tags: ["paranormal-romance", "vampires", "HEA", "rom-com", "contemporary-setting", "ensemble-cast"] },
  11903: { vibes: { prose_craft: 3, prose_style: 3, warmth: 8, intensity: 3, pace: 7, moral_complexity: 3, fabulism: 7, emotional_register: 7, interiority: 4, tone: 8, difficulty: 1 }, tags: ["paranormal-romance", "vampires", "HEA", "rom-com", "contemporary-setting"] },
};

const merged = { ...existing, ...batch };
fs.writeFileSync(SIDECAR, JSON.stringify(merged, null, 2));

const before = Object.keys(existing).length;
const after = Object.keys(merged).length;
console.log("Before:", before, "| Added:", Object.keys(batch).length, "| After:", after);
