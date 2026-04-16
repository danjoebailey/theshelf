const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const existing = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));

const batch = {
  // Karel Čapek — Czech SF founding father
  12426: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 4, pace: 5, moral_complexity: 8, fabulism: 6, emotional_register: 3, interiority: 5, tone: 6, difficulty: 5 }, tags: ["satirical", "translated-from", "dystopian", "near-future", "aliens", "political-sf", "class", "absurdist", "ensemble-cast"] },
  12427: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 4, pace: 6, moral_complexity: 8, fabulism: 6, emotional_register: 4, interiority: 4, tone: 5, difficulty: 4 }, tags: ["satirical", "translated-from", "AI", "near-future", "philosophical-sf", "play-format", "class", "labor"] },
  12428: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 3, pace: 5, moral_complexity: 7, fabulism: 6, emotional_register: 4, interiority: 4, tone: 6, difficulty: 4 }, tags: ["satirical", "translated-from", "near-future", "religious", "absurdist", "philosophical-sf"] },

  // George Alec Effinger — Budayeen cyberpunk (Arabic-inspired noir)
  12477: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 6, pace: 7, moral_complexity: 7, fabulism: 7, emotional_register: 3, interiority: 5, tone: 4, difficulty: 4 }, tags: ["cyberpunk", "near-future", "male-protagonist", "first-person", "noir", "middle-east-setting", "nanotech", "morally-gray-protagonist", "hardboiled", "urban"] },
  12478: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 6, pace: 7, moral_complexity: 7, fabulism: 7, emotional_register: 3, interiority: 5, tone: 4, difficulty: 4 }, tags: ["cyberpunk", "near-future", "male-protagonist", "noir", "middle-east-setting", "nanotech", "political-intrigue"] },
  12479: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 6, pace: 7, moral_complexity: 7, fabulism: 7, emotional_register: 3, interiority: 5, tone: 4, difficulty: 4 }, tags: ["cyberpunk", "near-future", "male-protagonist", "noir", "middle-east-setting", "desert-setting", "quest"] },

  // R.A. Lafferty — utterly unique voice in SF
  12531: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 9, emotional_register: 4, interiority: 5, tone: 6, difficulty: 7 }, tags: ["philosophical-sf", "far-future", "utopian", "satirical", "absurdist", "male-protagonist", "political-sf", "experimental-form"] },
  12532: { vibes: { prose_craft: 8, prose_style: 7, warmth: 4, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 8, emotional_register: 4, interiority: 6, tone: 5, difficulty: 8 }, tags: ["weird-fiction", "near-future", "philosophical-sf", "conspiracy", "absurdist", "experimental-form", "surreal", "male-protagonist"] },
  12533: { vibes: { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 3, pace: 5, moral_complexity: 6, fabulism: 8, emotional_register: 5, interiority: 5, tone: 7, difficulty: 5 }, tags: ["vignettes", "absurdist", "satirical", "aliens", "tall-tale", "comic-fantasy", "witty-prose", "americana"] },

  // Pat Cadigan — cyberpunk master
  12584: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 7, emotional_register: 3, interiority: 7, tone: 3, difficulty: 6 }, tags: ["cyberpunk", "near-future", "VR", "identity", "female-protagonist", "nanotech", "uploaded-consciousness", "philosophical-sf"] },
  12585: { vibes: { prose_craft: 8, prose_style: 6, warmth: 3, intensity: 6, pace: 5, moral_complexity: 7, fabulism: 7, emotional_register: 3, interiority: 7, tone: 3, difficulty: 6 }, tags: ["cyberpunk", "near-future", "VR", "ensemble-cast", "multi-pov", "los-angeles-setting", "nanotech", "uploaded-consciousness", "literary-sf"] },
  12586: { vibes: { prose_craft: 7, prose_style: 6, warmth: 3, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 7, emotional_register: 3, interiority: 7, tone: 3, difficulty: 6 }, tags: ["cyberpunk", "near-future", "identity", "female-protagonist", "memory", "unreliable-narrator"] },

  // Maureen F. McHugh — literary SF
  12593: { vibes: { prose_craft: 8, prose_style: 5, warmth: 5, intensity: 3, pace: 4, moral_complexity: 7, fabulism: 7, emotional_register: 4, interiority: 7, tone: 3, difficulty: 5 }, tags: ["near-future", "literary-sf", "male-protagonist", "queer-protagonist", "chinese-setting", "identity", "class", "immigrant-protagonist", "restrained-prose"] },
  12594: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 7, emotional_register: 4, interiority: 7, tone: 3, difficulty: 5 }, tags: ["soft-sf", "colony-world", "female-protagonist", "identity", "gender", "anthropological-sf", "literary-sf"] },
  12595: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 7, emotional_register: 4, interiority: 6, tone: 3, difficulty: 5 }, tags: ["near-future", "cyberpunk", "male-protagonist", "caribbean-setting", "underwater-setting", "noir", "literary-sf"] },

  // Geoff Ryman — literary SF
  12596: { vibes: { prose_craft: 8, prose_style: 6, warmth: 6, intensity: 3, pace: 4, moral_complexity: 7, fabulism: 6, emotional_register: 4, interiority: 7, tone: 4, difficulty: 5 }, tags: ["near-future", "literary-sf", "female-protagonist", "asian-setting", "technological-change", "community", "village-setting", "lyrical-prose"] },
  12597: { vibes: { prose_craft: 8, prose_style: 7, warmth: 5, intensity: 4, pace: 3, moral_complexity: 7, fabulism: 7, emotional_register: 3, interiority: 7, tone: 4, difficulty: 7 }, tags: ["far-future", "literary-sf", "london-setting", "biological", "near-future", "identity", "memory", "lyrical-prose", "dystopian"] },

  // Gwyneth Jones — literary SF/fantasy
  12525: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 5, emotional_register: 4, interiority: 6, tone: 4, difficulty: 6 }, tags: ["near-future", "british-setting", "ensemble-cast", "counterculture", "political-intrigue", "rock-music", "literary-sf", "environmental"] },
  12526: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 4, pace: 3, moral_complexity: 8, fabulism: 8, emotional_register: 4, interiority: 7, tone: 3, difficulty: 7 }, tags: ["first-contact", "aliens", "feminist", "near-future", "philosophical-sf", "gender", "literary-sf", "british-setting"] },
  12527: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 4, pace: 3, moral_complexity: 7, fabulism: 3, emotional_register: 3, interiority: 7, tone: 3, difficulty: 6 }, tags: ["literary-fiction", "british-setting", "female-protagonist", "academic-setting", "feminist", "contemporary-setting", "identity"] },

  // Suzy McKee Charnas — feminist SF/horror
  12550: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 6, pace: 5, moral_complexity: 8, fabulism: 7, emotional_register: 2, interiority: 6, tone: 2, difficulty: 5 }, tags: ["dystopian", "feminist", "post-apocalyptic", "male-protagonist", "gender", "oppression", "far-future", "philosophical-sf"] },
  12551: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 7, emotional_register: 4, interiority: 6, tone: 3, difficulty: 5 }, tags: ["feminist", "post-apocalyptic", "female-protagonist", "community", "gender", "utopian", "horse-culture"] },
  12552: { vibes: { prose_craft: 8, prose_style: 5, warmth: 4, intensity: 5, pace: 4, moral_complexity: 8, fabulism: 4, emotional_register: 3, interiority: 8, tone: 3, difficulty: 5 }, tags: ["vampires", "male-protagonist", "literary-sf", "psychological", "identity", "vignettes", "contemporary-setting", "morally-gray-protagonist"] },

  // Carol Emshwiller — feminist SF/slipstream
  12541: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 3, pace: 5, moral_complexity: 6, fabulism: 6, emotional_register: 5, interiority: 6, tone: 6, difficulty: 4 }, tags: ["satirical", "feminist", "fabulism", "near-future", "female-protagonist", "transformation", "absurdist", "novella-length"] },
  12542: { vibes: { prose_craft: 8, prose_style: 5, warmth: 4, intensity: 5, pace: 4, moral_complexity: 8, fabulism: 6, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["soft-sf", "far-future", "male-protagonist", "slavery", "animal-human", "first-person", "oppression", "literary-sf"] },

  // Eleanor Arnason — feminist SF
  12547: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 8, emotional_register: 4, interiority: 5, tone: 3, difficulty: 5 }, tags: ["soft-sf", "first-contact", "anthropological-sf", "female-protagonist", "aliens", "feminist", "far-future", "colony-world"] },
  12548: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 8, emotional_register: 4, interiority: 5, tone: 3, difficulty: 5 }, tags: ["soft-sf", "aliens", "feminist", "gender", "military-sf", "male-protagonist", "far-future"] },
  12549: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 8, emotional_register: 5, interiority: 5, tone: 4, difficulty: 5 }, tags: ["soft-sf", "aliens", "far-future", "family", "coming-of-age", "anthropological-sf"] },

  // Joyce Carol Oates — horror entries
  12508: { vibes: { prose_craft: 8, prose_style: 5, warmth: 1, intensity: 9, pace: 5, moral_complexity: 9, fabulism: 1, emotional_register: 1, interiority: 9, tone: 2, difficulty: 5 }, tags: ["psychological-horror", "first-person", "male-protagonist", "serial-killer", "unreliable-narrator", "restrained-prose", "novella-length", "transgressive"] },
  12509: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 6, pace: 4, moral_complexity: 7, fabulism: 5, emotional_register: 3, interiority: 6, tone: 3, difficulty: 6 }, tags: ["gothic-horror", "historical-fiction", "new-england-setting", "ensemble-cast", "family-saga", "19th-century", "supernatural-horror", "doorstopper"] },
  12510: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 6, pace: 4, moral_complexity: 7, fabulism: 2, emotional_register: 2, interiority: 7, tone: 2, difficulty: 5 }, tags: ["psychological-horror", "female-protagonist", "academia", "obsession", "sexuality", "domestic"] },
  12511: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 7, pace: 5, moral_complexity: 7, fabulism: 4, emotional_register: 2, interiority: 7, tone: 2, difficulty: 5 }, tags: ["gothic-horror", "vignettes", "ensemble-cast", "psychological-horror", "grotesque", "suburban", "domestic"] },

  // Avram Davidson — unique literary SF voice
  12530: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 4, pace: 5, moral_complexity: 5, fabulism: 8, emotional_register: 4, interiority: 4, tone: 6, difficulty: 5 }, tags: ["far-future", "dragons", "adventure", "secondary-world", "witty-prose", "quest", "male-protagonist"] },

  // Barrington J. Bayley — British new wave SF
  12535: { vibes: { prose_craft: 5, prose_style: 5, warmth: 3, intensity: 4, pace: 6, moral_complexity: 5, fabulism: 9, emotional_register: 4, interiority: 4, tone: 4, difficulty: 5 }, tags: ["time-travel", "space-opera", "far-future", "ideas-driven", "war", "temporal-mechanics"] },
  12536: { vibes: { prose_craft: 5, prose_style: 5, warmth: 3, intensity: 3, pace: 5, moral_complexity: 5, fabulism: 9, emotional_register: 4, interiority: 4, tone: 4, difficulty: 5 }, tags: ["space-opera", "far-future", "ideas-driven", "identity", "fashion", "weird-fiction"] },
  12537: { vibes: { prose_craft: 5, prose_style: 5, warmth: 3, intensity: 4, pace: 6, moral_complexity: 5, fabulism: 9, emotional_register: 4, interiority: 4, tone: 5, difficulty: 5 }, tags: ["space-opera", "far-future", "absurdist", "ideas-driven", "weapon-focused", "quest"] },

  // Howard Waldrop — cult SF, eccentric
  12571: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 7, emotional_register: 4, interiority: 4, tone: 5, difficulty: 5 }, tags: ["alternate-history-sf", "time-travel", "ensemble-cast", "american-setting", "multi-pov", "adventure"] },
  12572: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 3, pace: 5, moral_complexity: 5, fabulism: 7, emotional_register: 5, interiority: 4, tone: 6, difficulty: 4 }, tags: ["vignettes", "satirical", "absurdist", "alternate-history-sf", "americana", "witty-prose", "pop-culture"] },
  12573: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 3, pace: 5, moral_complexity: 5, fabulism: 7, emotional_register: 5, interiority: 4, tone: 6, difficulty: 4 }, tags: ["vignettes", "satirical", "absurdist", "alternate-history-sf", "pop-culture", "witty-prose"] },

  // Melissa Scott — queer cyberpunk
  12587: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 7, emotional_register: 4, interiority: 6, tone: 3, difficulty: 5 }, tags: ["cyberpunk", "near-future", "female-protagonist", "queer-protagonist", "hacker", "political-intrigue", "literary-sf"] },
  12588: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 4, pace: 5, moral_complexity: 5, fabulism: 8, emotional_register: 4, interiority: 5, tone: 3, difficulty: 5 }, tags: ["space-opera", "female-protagonist", "pilot-protagonist", "far-future", "FTL", "quest"] },
  12589: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 8, emotional_register: 4, interiority: 5, tone: 3, difficulty: 5 }, tags: ["soft-sf", "AI", "near-future", "female-protagonist", "identity", "uploaded-consciousness"] },

  // Wesley Chu — Lives of Tao (alien-symbiote SF)
  12334: { vibes: { prose_craft: 5, prose_style: 4, warmth: 6, intensity: 5, pace: 7, moral_complexity: 5, fabulism: 6, emotional_register: 5, interiority: 5, tone: 6, difficulty: 3 }, tags: ["near-future", "aliens", "male-protagonist", "first-person", "action", "conspiracy", "buddy-story", "witty-prose", "coming-of-age"] },
  12335: { vibes: { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 6, pace: 7, moral_complexity: 6, fabulism: 6, emotional_register: 4, interiority: 5, tone: 5, difficulty: 3 }, tags: ["near-future", "aliens", "male-protagonist", "action", "conspiracy", "war", "ensemble-cast"] },
  12336: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 6, pace: 7, moral_complexity: 6, fabulism: 7, emotional_register: 3, interiority: 5, tone: 3, difficulty: 4 }, tags: ["far-future", "time-travel", "male-protagonist", "dystopian", "action", "post-apocalyptic"] },

  // Mur Lafferty — Six Wakes (locked-room cloning mystery)
  12387: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 5, pace: 7, moral_complexity: 6, fabulism: 7, emotional_register: 4, interiority: 5, tone: 4, difficulty: 4 }, tags: ["space-opera", "mystery", "locked-room", "cloning", "ensemble-cast", "generation-ship", "identity", "unreliable-narrator"] },

  // Nicky Drayden — South African-inspired SF
  12265: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 5, pace: 6, moral_complexity: 6, fabulism: 7, emotional_register: 4, interiority: 5, tone: 5, difficulty: 4 }, tags: ["near-future", "african-setting", "south-african-setting", "multi-pov", "mythology", "ensemble-cast", "political-intrigue"] },
  12266: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 5, pace: 6, moral_complexity: 7, fabulism: 6, emotional_register: 4, interiority: 6, tone: 4, difficulty: 4 }, tags: ["near-future", "african-setting", "south-african-setting", "male-protagonist", "twins", "identity", "class"] },
  12267: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 8, emotional_register: 4, interiority: 5, tone: 4, difficulty: 4 }, tags: ["far-future", "space-opera", "biological", "community", "queer-protagonist", "female-protagonist"] },

  // Molly Tanzer — Victorian horror
  12274: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 5, emotional_register: 4, interiority: 5, tone: 4, difficulty: 4 }, tags: ["gothic-horror", "victorian-setting", "female-protagonist", "queer-protagonist", "fencing", "demons", "london-setting", "historical-fantasy"] },
  12275: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 5, emotional_register: 4, interiority: 5, tone: 4, difficulty: 4 }, tags: ["gothic-horror", "1920s-setting", "female-protagonist", "bootlegging", "folk-horror", "american-setting"] },

  // Iain Reid — Foe
  12452: { vibes: { prose_craft: 7, prose_style: 4, warmth: 3, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 5, emotional_register: 2, interiority: 8, tone: 2, difficulty: 5 }, tags: ["near-future", "domestic-thriller", "male-protagonist", "marriage", "identity", "AI", "cloning", "claustrophobic", "rural", "uneasy"] },

  // Hiron Ennes — Leech (literary SF/horror)
  12582: { vibes: { prose_craft: 7, prose_style: 6, warmth: 3, intensity: 6, pace: 4, moral_complexity: 7, fabulism: 7, emotional_register: 2, interiority: 7, tone: 2, difficulty: 6 }, tags: ["body-horror", "gothic-horror", "near-future", "parasite", "unreliable-narrator", "first-person", "isolated-house", "winter-setting", "literary-sf", "queer-protagonist"] },

  // Jacek Dukaj — Polish SF (Ice is famous)
  12489: { vibes: { prose_craft: 7, prose_style: 7, warmth: 3, intensity: 4, pace: 3, moral_complexity: 8, fabulism: 8, emotional_register: 3, interiority: 6, tone: 3, difficulty: 8 }, tags: ["alternate-history-sf", "translated-from", "polish-setting", "hard-sf", "worldbuilding-heavy", "philosophical-sf", "doorstopper", "dense-prose", "mathematical"] },
  12490: { vibes: { prose_craft: 7, prose_style: 6, warmth: 3, intensity: 4, pace: 5, moral_complexity: 7, fabulism: 8, emotional_register: 3, interiority: 5, tone: 3, difficulty: 6 }, tags: ["near-future", "AI", "translated-from", "post-human", "philosophical-sf", "novella-length", "identity"] },

  // Mark Hodder — Burton & Swinburne steampunk
  12341: { vibes: { prose_craft: 5, prose_style: 5, warmth: 5, intensity: 5, pace: 7, moral_complexity: 5, fabulism: 7, emotional_register: 5, interiority: 4, tone: 6, difficulty: 4 }, tags: ["steampunk", "alternate-history-sf", "victorian-setting", "london-setting", "adventure", "male-protagonist", "ensemble-cast", "time-travel"] },
  12342: { vibes: { prose_craft: 5, prose_style: 5, warmth: 5, intensity: 5, pace: 7, moral_complexity: 5, fabulism: 7, emotional_register: 5, interiority: 4, tone: 6, difficulty: 4 }, tags: ["steampunk", "alternate-history-sf", "victorian-setting", "london-setting", "adventure", "clockwork", "mystery"] },
  12343: { vibes: { prose_craft: 5, prose_style: 5, warmth: 5, intensity: 5, pace: 7, moral_complexity: 5, fabulism: 7, emotional_register: 5, interiority: 4, tone: 5, difficulty: 4 }, tags: ["steampunk", "alternate-history-sf", "victorian-setting", "adventure", "african-setting", "exploration"] },

  // Natasha Pulley — The Mars House
  12461: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 8, emotional_register: 4, interiority: 6, tone: 4, difficulty: 5 }, tags: ["near-future", "mars-setting", "soft-sf", "queer-protagonist", "male-protagonist", "immigrant-protagonist", "political-intrigue", "romance-subplot", "class"] },

  // Pat Murphy — The City Not Long After
  12554: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 5, emotional_register: 5, interiority: 6, tone: 4, difficulty: 4 }, tags: ["post-apocalyptic", "san-francisco-setting", "artist-protagonist", "community", "pacifist", "magical-realism", "ensemble-cast", "literary-sf"] },

  // Kathleen Ann Goonan — nanotech literary SF
  12556: { vibes: { prose_craft: 7, prose_style: 7, warmth: 5, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 8, emotional_register: 4, interiority: 6, tone: 4, difficulty: 7 }, tags: ["near-future", "nanotech", "post-apocalyptic", "urban", "jazz", "literary-sf", "worldbuilding-heavy", "dense-prose"] },
  12557: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 6, emotional_register: 4, interiority: 6, tone: 3, difficulty: 5 }, tags: ["alternate-history-sf", "ww2-era", "jazz", "time-travel", "male-protagonist", "literary-sf"] },

  // Ian R. MacLeod — Song of Time (literary SF)
  12592: { vibes: { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 3, pace: 3, moral_complexity: 6, fabulism: 5, emotional_register: 4, interiority: 8, tone: 3, difficulty: 5 }, tags: ["near-future", "literary-sf", "female-protagonist", "musician-protagonist", "elderly-protagonist", "memory", "lyrical-prose", "climate-fiction", "meditative"] },

  // C.S. Friedman — This Alien Shore
  12581: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 5, pace: 6, moral_complexity: 6, fabulism: 8, emotional_register: 4, interiority: 5, tone: 3, difficulty: 5 }, tags: ["space-opera", "far-future", "female-protagonist", "neurodivergent", "cyberpunk", "aliens", "genetic-engineering", "ensemble-cast"] },

  // Paul Park — Celestis (literary SF)
  12599: { vibes: { prose_craft: 7, prose_style: 6, warmth: 3, intensity: 5, pace: 3, moral_complexity: 8, fabulism: 8, emotional_register: 3, interiority: 7, tone: 2, difficulty: 6 }, tags: ["soft-sf", "colony-world", "aliens", "identity", "colonialism", "philosophical-sf", "literary-sf", "transformation"] },

  // Jeremy Robert Johnson — experimental horror
  12480: { vibes: { prose_craft: 6, prose_style: 5, warmth: 3, intensity: 8, pace: 8, moral_complexity: 5, fabulism: 5, emotional_register: 2, interiority: 4, tone: 4, difficulty: 4 }, tags: ["body-horror", "urban-fantasy", "cyberpunk", "male-protagonist", "violence", "conspiracy", "frenetic"] },
  12481: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 8, pace: 8, moral_complexity: 6, fabulism: 5, emotional_register: 2, interiority: 5, tone: 3, difficulty: 4 }, tags: ["body-horror", "near-future", "small-town", "male-protagonist", "violence", "conspiracy", "parasites", "YA-thriller"] },
  12482: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 7, pace: 6, moral_complexity: 6, fabulism: 5, emotional_register: 3, interiority: 5, tone: 4, difficulty: 5 }, tags: ["vignettes", "body-horror", "surreal", "transgressive", "experimental-form", "absurdist"] },

  // Charles L. Grant — quiet horror master
  12513: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 4, pace: 4, moral_complexity: 5, fabulism: 5, emotional_register: 3, interiority: 6, tone: 2, difficulty: 4 }, tags: ["quiet-horror", "small-town", "supernatural-horror", "atmospheric", "new-england-setting", "gothic-atmosphere", "series-debut"] },
  12514: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 5, pace: 4, moral_complexity: 5, fabulism: 4, emotional_register: 3, interiority: 5, tone: 2, difficulty: 4 }, tags: ["quiet-horror", "small-town", "supernatural-horror", "rural", "atmospheric", "community", "evil-presence"] },
  12515: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 5, pace: 5, moral_complexity: 5, fabulism: 4, emotional_register: 3, interiority: 5, tone: 2, difficulty: 3 }, tags: ["supernatural-horror", "small-town", "male-protagonist", "coming-of-age", "violence"] },
};

const merged = { ...existing, ...batch };
fs.writeFileSync(SIDECAR, JSON.stringify(merged, null, 2));

const before = Object.keys(existing).length;
const after = Object.keys(merged).length;
console.log("Before:", before, "| Added:", Object.keys(batch).length, "| After:", after);
