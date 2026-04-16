const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const existing = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));

const batch = {
  // Previously skipped — tagging with reasonable confidence now

  // Chloe Neill — Chicagoland Vampires (urban fantasy, decent prose for genre)
  11625: { vibes: { prose_craft: 5, prose_style: 4, warmth: 6, intensity: 5, pace: 7, moral_complexity: 5, fabulism: 7, emotional_register: 5, interiority: 5, tone: 5, difficulty: 3 }, tags: ["urban-fantasy", "vampires", "female-protagonist", "first-person", "romance-subplot", "chicago-setting", "enemies-to-lovers", "contemporary-setting"] },
  11626: { vibes: { prose_craft: 5, prose_style: 4, warmth: 6, intensity: 5, pace: 7, moral_complexity: 5, fabulism: 7, emotional_register: 5, interiority: 5, tone: 5, difficulty: 3 }, tags: ["urban-fantasy", "vampires", "female-protagonist", "first-person", "romance-subplot", "chicago-setting"] },
  11627: { vibes: { prose_craft: 5, prose_style: 4, warmth: 6, intensity: 5, pace: 7, moral_complexity: 5, fabulism: 7, emotional_register: 5, interiority: 5, tone: 5, difficulty: 3 }, tags: ["urban-fantasy", "vampires", "female-protagonist", "first-person", "romance-subplot", "chicago-setting"] },

  // Darcy Coates — indie gothic horror, atmospheric
  11778: { vibes: { prose_craft: 4, prose_style: 4, warmth: 4, intensity: 6, pace: 6, moral_complexity: 4, fabulism: 4, emotional_register: 3, interiority: 5, tone: 3, difficulty: 2 }, tags: ["haunted-house", "gothic-atmosphere", "female-protagonist", "isolation", "supernatural-horror", "rural"] },
  11779: { vibes: { prose_craft: 4, prose_style: 4, warmth: 3, intensity: 7, pace: 7, moral_complexity: 4, fabulism: 4, emotional_register: 2, interiority: 4, tone: 2, difficulty: 2 }, tags: ["supernatural-horror", "wilderness", "survival", "ensemble-cast", "isolation"] },
  11780: { vibes: { prose_craft: 4, prose_style: 4, warmth: 3, intensity: 7, pace: 6, moral_complexity: 4, fabulism: 4, emotional_register: 2, interiority: 4, tone: 2, difficulty: 2 }, tags: ["supernatural-horror", "ocean-setting", "survival", "claustrophobic", "isolation"] },

  // Paul Cornell — London Falling (police procedural urban fantasy)
  11845: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 6, pace: 6, moral_complexity: 6, fabulism: 7, emotional_register: 3, interiority: 5, tone: 3, difficulty: 4 }, tags: ["urban-fantasy", "police-procedural", "ensemble-cast", "london-setting", "british-setting", "supernatural-horror", "dark-fantasy"] },
  11846: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 6, pace: 6, moral_complexity: 6, fabulism: 7, emotional_register: 3, interiority: 5, tone: 3, difficulty: 4 }, tags: ["urban-fantasy", "police-procedural", "ensemble-cast", "london-setting", "serial-killer"] },
  11847: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 6, pace: 6, moral_complexity: 6, fabulism: 7, emotional_register: 3, interiority: 5, tone: 4, difficulty: 4 }, tags: ["urban-fantasy", "police-procedural", "ensemble-cast", "london-setting", "mystery"] },

  // George Mann — Newbury & Hobbes (steampunk mystery)
  11842: { vibes: { prose_craft: 5, prose_style: 5, warmth: 5, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 7, emotional_register: 5, interiority: 4, tone: 5, difficulty: 3 }, tags: ["steampunk", "mystery", "victorian-setting", "london-setting", "ensemble-cast", "series-detective", "adventure"] },
  11843: { vibes: { prose_craft: 5, prose_style: 5, warmth: 5, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 7, emotional_register: 5, interiority: 4, tone: 5, difficulty: 3 }, tags: ["steampunk", "mystery", "victorian-setting", "london-setting", "adventure"] },
  11844: { vibes: { prose_craft: 5, prose_style: 5, warmth: 5, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 7, emotional_register: 5, interiority: 4, tone: 5, difficulty: 3 }, tags: ["steampunk", "superhero", "new-york-setting", "1930s", "adventure", "noir"] },

  // Ann Aguirre — Grimspace (SF romance action)
  11855: { vibes: { prose_craft: 5, prose_style: 4, warmth: 6, intensity: 6, pace: 8, moral_complexity: 5, fabulism: 8, emotional_register: 5, interiority: 5, tone: 4, difficulty: 3 }, tags: ["space-opera", "female-protagonist", "first-person", "romance-subplot", "far-future", "action", "grief"] },

  // NEW ENTRIES — the next stretch

  // Andy Davidson — Southern literary horror
  11876: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 7, pace: 4, moral_complexity: 7, fabulism: 4, emotional_register: 3, interiority: 6, tone: 2, difficulty: 5 }, tags: ["gothic-horror", "southern-gothic", "female-protagonist", "river-setting", "lyrical-prose", "atmospheric", "supernatural-horror", "rural"] },
  11877: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 6, pace: 4, moral_complexity: 7, fabulism: 5, emotional_register: 3, interiority: 6, tone: 2, difficulty: 5 }, tags: ["gothic-horror", "southern-gothic", "haunted-house", "family-saga", "dual-timeline", "rural", "atmospheric"] },
  11878: { vibes: { prose_craft: 6, prose_style: 5, warmth: 3, intensity: 8, pace: 5, moral_complexity: 6, fabulism: 4, emotional_register: 2, interiority: 5, tone: 2, difficulty: 4 }, tags: ["gothic-horror", "vampires", "western-setting", "male-protagonist", "desert-setting", "violence", "road-trip"] },

  // Jennifer McMahon — Vermont gothic
  11879: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 5, pace: 6, moral_complexity: 6, fabulism: 4, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["supernatural-horror", "dual-timeline", "female-protagonist", "rural", "new-england-setting", "missing-person", "gothic-atmosphere", "family"] },
  11880: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 5, pace: 6, moral_complexity: 6, fabulism: 3, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["psychological-thriller", "female-protagonist", "rural", "new-england-setting", "childhood", "memory", "secrets"] },
  11881: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 5, pace: 6, moral_complexity: 6, fabulism: 4, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["supernatural-horror", "dual-timeline", "female-protagonist", "new-england-setting", "family", "lake-setting", "ghosts"] },

  // Harry Harrison — classic SF satirist
  11882: { vibes: { prose_craft: 6, prose_style: 4, warmth: 5, intensity: 4, pace: 8, moral_complexity: 5, fabulism: 8, emotional_register: 6, interiority: 4, tone: 8, difficulty: 3 }, tags: ["space-opera", "comic-fantasy", "male-protagonist", "first-person", "heist", "satirical", "far-future", "witty-prose"] },
  11883: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 6, pace: 7, moral_complexity: 5, fabulism: 8, emotional_register: 4, interiority: 3, tone: 4, difficulty: 3 }, tags: ["hard-sf", "survival", "male-protagonist", "alien-planet", "far-future", "action"] },
  11884: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 6, emotional_register: 3, interiority: 5, tone: 3, difficulty: 4 }, tags: ["dystopian", "near-future", "overpopulation", "urban", "new-york-setting", "class", "social-realism"] },
  11885: { vibes: { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 5, pace: 7, moral_complexity: 5, fabulism: 8, emotional_register: 5, interiority: 3, tone: 9, difficulty: 3 }, tags: ["military-sf", "space-opera", "satirical", "comic-fantasy", "absurdist", "male-protagonist", "parody"] },

  // Keith Laumer — Retief (diplomatic comedy SF)
  11886: { vibes: { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 3, pace: 7, moral_complexity: 4, fabulism: 8, emotional_register: 5, interiority: 3, tone: 8, difficulty: 3 }, tags: ["space-opera", "satirical", "male-protagonist", "episodic", "aliens", "diplomatic", "witty-prose", "comic-fantasy"] },
  11887: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 4, pace: 7, moral_complexity: 5, fabulism: 8, emotional_register: 4, interiority: 4, tone: 5, difficulty: 4 }, tags: ["alternate-history-sf", "multiverse", "male-protagonist", "espionage", "near-future", "adventure"] },
  11888: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 6, pace: 7, moral_complexity: 5, fabulism: 7, emotional_register: 4, interiority: 3, tone: 4, difficulty: 4 }, tags: ["military-sf", "aliens", "male-protagonist", "action", "invasion", "near-future"] },

  // E.E. "Doc" Smith — proto-space-opera, pulp founding father
  11889: { vibes: { prose_craft: 3, prose_style: 5, warmth: 4, intensity: 5, pace: 7, moral_complexity: 3, fabulism: 9, emotional_register: 5, interiority: 2, tone: 4, difficulty: 4 }, tags: ["space-opera", "hard-sf", "far-future", "male-protagonist", "action", "aliens", "classic-sf"] },
  11890: { vibes: { prose_craft: 3, prose_style: 5, warmth: 4, intensity: 5, pace: 7, moral_complexity: 3, fabulism: 9, emotional_register: 5, interiority: 2, tone: 4, difficulty: 4 }, tags: ["space-opera", "hard-sf", "far-future", "ensemble-cast", "aliens", "political-intrigue", "classic-sf"] },
  11891: { vibes: { prose_craft: 3, prose_style: 5, warmth: 4, intensity: 6, pace: 8, moral_complexity: 3, fabulism: 9, emotional_register: 5, interiority: 2, tone: 4, difficulty: 4 }, tags: ["space-opera", "hard-sf", "far-future", "male-protagonist", "action", "aliens", "military-sf"] },
  11892: { vibes: { prose_craft: 3, prose_style: 5, warmth: 4, intensity: 5, pace: 7, moral_complexity: 3, fabulism: 9, emotional_register: 5, interiority: 2, tone: 5, difficulty: 4 }, tags: ["space-opera", "hard-sf", "far-future", "male-protagonist", "adventure", "classic-sf"] },

  // C.M. Kornbluth — satirical 1950s SF
  11893: { vibes: { prose_craft: 6, prose_style: 5, warmth: 3, intensity: 4, pace: 6, moral_complexity: 7, fabulism: 7, emotional_register: 4, interiority: 5, tone: 5, difficulty: 5 }, tags: ["dystopian", "satirical", "near-future", "political-sf", "organized-crime", "social-realism"] },
  11894: { vibes: { prose_craft: 6, prose_style: 5, warmth: 3, intensity: 5, pace: 6, moral_complexity: 7, fabulism: 6, emotional_register: 3, interiority: 5, tone: 4, difficulty: 5 }, tags: ["dystopian", "near-future", "invasion", "political-sf", "cold-war-era", "american-setting"] },

  // Eric Frank Russell — classic guerrilla/satirical SF
  11895: { vibes: { prose_craft: 6, prose_style: 4, warmth: 5, intensity: 4, pace: 8, moral_complexity: 5, fabulism: 7, emotional_register: 6, interiority: 4, tone: 7, difficulty: 3 }, tags: ["soft-sf", "espionage", "satirical", "male-protagonist", "alien-world", "guerrilla", "witty-prose", "near-future"] },
  11896: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 7, emotional_register: 4, interiority: 4, tone: 4, difficulty: 4 }, tags: ["hard-sf", "first-contact", "aliens", "near-future", "conspiracy"] },
  11897: { vibes: { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 5, pace: 7, moral_complexity: 4, fabulism: 8, emotional_register: 5, interiority: 3, tone: 6, difficulty: 3 }, tags: ["space-opera", "aliens", "episodic", "ensemble-cast", "action", "comic-fantasy"] },

  // Joe R. Lansdale — East Texas noir/horror master
  11904: { vibes: { prose_craft: 7, prose_style: 4, warmth: 6, intensity: 7, pace: 7, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 5, tone: 5, difficulty: 3 }, tags: ["hardboiled", "noir", "male-protagonist", "ensemble-cast", "witty-prose", "texas-setting", "violence", "friendship", "working-class", "southern-gothic"] },
  11905: { vibes: { prose_craft: 8, prose_style: 5, warmth: 6, intensity: 7, pace: 5, moral_complexity: 8, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["literary-mystery", "southern-gothic", "male-protagonist", "child-protagonist", "race", "coming-of-age", "1930s", "texas-setting", "violence"] },
  11906: { vibes: { prose_craft: 6, prose_style: 4, warmth: 5, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 5, emotional_register: 5, interiority: 4, tone: 8, difficulty: 2 }, tags: ["comic-fantasy", "satirical", "elderly-protagonist", "monsters", "absurdist", "novella-length", "texas-setting"] },
  11907: { vibes: { prose_craft: 7, prose_style: 4, warmth: 4, intensity: 8, pace: 7, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 3 }, tags: ["noir", "male-protagonist", "violence", "revenge-plot", "texas-setting", "ticking-clock", "father-son", "psychological-thriller"] },

  // Ania Ahlborn — modern horror
  11908: { vibes: { prose_craft: 5, prose_style: 4, warmth: 3, intensity: 7, pace: 6, moral_complexity: 6, fabulism: 5, emotional_register: 2, interiority: 5, tone: 2, difficulty: 3 }, tags: ["supernatural-horror", "rural", "family", "evil-presence", "isolation", "male-protagonist"] },
  11909: { vibes: { prose_craft: 6, prose_style: 5, warmth: 3, intensity: 8, pace: 5, moral_complexity: 7, fabulism: 3, emotional_register: 1, interiority: 6, tone: 1, difficulty: 4 }, tags: ["psychological-horror", "rural-poor", "family", "violence", "sibling-bond", "serial-killer", "southern-gothic", "claustrophobic"] },
  11910: { vibes: { prose_craft: 5, prose_style: 4, warmth: 3, intensity: 7, pace: 7, moral_complexity: 4, fabulism: 4, emotional_register: 2, interiority: 4, tone: 2, difficulty: 3 }, tags: ["supernatural-horror", "wilderness", "ensemble-cast", "survival", "isolation", "monsters"] },

  // C.L. Polk — Kingston Cycle (gaslamp fantasy, queer)
  11911: { vibes: { prose_craft: 7, prose_style: 5, warmth: 7, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 8, emotional_register: 5, interiority: 6, tone: 5, difficulty: 4 }, tags: ["secondary-world", "male-protagonist", "queer-protagonist", "romance-subplot", "victorian-setting", "soft-magic", "class", "mystery", "steampunk"] },
  11912: { vibes: { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 8, emotional_register: 5, interiority: 6, tone: 4, difficulty: 4 }, tags: ["secondary-world", "female-protagonist", "queer-protagonist", "political-intrigue", "weather-magic", "class"] },
  11913: { vibes: { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 8, emotional_register: 5, interiority: 6, tone: 4, difficulty: 4 }, tags: ["secondary-world", "female-protagonist", "queer-protagonist", "revolution", "class", "political-intrigue"] },
  11914: { vibes: { prose_craft: 8, prose_style: 5, warmth: 7, intensity: 5, pace: 6, moral_complexity: 7, fabulism: 7, emotional_register: 4, interiority: 7, tone: 3, difficulty: 4 }, tags: ["urban-fantasy", "queer-protagonist", "female-protagonist", "1930s", "noir", "demons", "romance-subplot", "novella-length", "chicago-setting"] },

  // Gabino Iglesias — Tex-Mex noir/horror, literary
  11918: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 8, pace: 7, moral_complexity: 8, fabulism: 3, emotional_register: 2, interiority: 6, tone: 2, difficulty: 5 }, tags: ["noir", "Latino-protagonist", "male-protagonist", "violence", "texas-setting", "border-setting", "poverty", "literary-thriller", "revenge-plot", "magical-realism"] },
  11919: { vibes: { prose_craft: 8, prose_style: 6, warmth: 3, intensity: 8, pace: 5, moral_complexity: 8, fabulism: 4, emotional_register: 2, interiority: 6, tone: 2, difficulty: 6 }, tags: ["magical-realism", "Latino-protagonist", "vignettes", "violence", "border-setting", "poverty", "immigrant-community", "lyrical-prose"] },
  11920: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 8, pace: 7, moral_complexity: 7, fabulism: 4, emotional_register: 2, interiority: 5, tone: 2, difficulty: 5 }, tags: ["noir", "urban-fantasy", "Latino-protagonist", "male-protagonist", "violence", "voodoo", "texas-setting", "poverty"] },

  // Robert J. Sawyer — Canadian hard SF, ideas-driven
  11921: { vibes: { prose_craft: 5, prose_style: 4, warmth: 6, intensity: 3, pace: 5, moral_complexity: 6, fabulism: 8, emotional_register: 5, interiority: 5, tone: 5, difficulty: 4 }, tags: ["hard-sf", "near-future", "multiverse", "anthropological-sf", "first-contact", "philosophical-sf", "ensemble-cast"] },
  11922: { vibes: { prose_craft: 5, prose_style: 4, warmth: 6, intensity: 3, pace: 5, moral_complexity: 6, fabulism: 8, emotional_register: 5, interiority: 5, tone: 5, difficulty: 4 }, tags: ["hard-sf", "multiverse", "anthropological-sf", "philosophical-sf", "ensemble-cast"] },
  11923: { vibes: { prose_craft: 6, prose_style: 4, warmth: 6, intensity: 3, pace: 5, moral_complexity: 7, fabulism: 7, emotional_register: 5, interiority: 5, tone: 4, difficulty: 4 }, tags: ["hard-sf", "first-contact", "aliens", "religious", "philosophical-sf", "canadian-setting"] },
  11924: { vibes: { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 4, pace: 6, moral_complexity: 6, fabulism: 7, emotional_register: 4, interiority: 5, tone: 4, difficulty: 4 }, tags: ["hard-sf", "near-future", "time-travel", "ensemble-cast", "philosophical-sf"] },

  // Lynsay Sands — paranormal comedy romance
  11816: { vibes: { prose_craft: 4, prose_style: 3, warmth: 8, intensity: 3, pace: 7, moral_complexity: 3, fabulism: 7, emotional_register: 7, interiority: 5, tone: 8, difficulty: 2 }, tags: ["paranormal-romance", "vampires", "female-protagonist", "HEA", "steamy", "witty-prose", "contemporary-setting"] },
  11817: { vibes: { prose_craft: 4, prose_style: 3, warmth: 8, intensity: 3, pace: 7, moral_complexity: 3, fabulism: 7, emotional_register: 7, interiority: 5, tone: 8, difficulty: 2 }, tags: ["paranormal-romance", "vampires", "male-protagonist", "HEA", "steamy", "witty-prose", "contemporary-setting", "rom-com"] },
  11818: { vibes: { prose_craft: 4, prose_style: 3, warmth: 8, intensity: 3, pace: 7, moral_complexity: 3, fabulism: 7, emotional_register: 7, interiority: 5, tone: 8, difficulty: 2 }, tags: ["paranormal-romance", "vampires", "HEA", "steamy", "witty-prose", "contemporary-setting"] },

  // MaryJanice Davidson — Undead series (comedy paranormal romance)
  11944: { vibes: { prose_craft: 3, prose_style: 3, warmth: 7, intensity: 3, pace: 8, moral_complexity: 3, fabulism: 7, emotional_register: 7, interiority: 4, tone: 9, difficulty: 1 }, tags: ["paranormal-romance", "vampires", "female-protagonist", "first-person", "HEA", "rom-com", "witty-prose", "contemporary-setting"] },
  11945: { vibes: { prose_craft: 3, prose_style: 3, warmth: 7, intensity: 3, pace: 8, moral_complexity: 3, fabulism: 7, emotional_register: 7, interiority: 4, tone: 9, difficulty: 1 }, tags: ["paranormal-romance", "vampires", "female-protagonist", "first-person", "HEA", "rom-com"] },
  11946: { vibes: { prose_craft: 3, prose_style: 3, warmth: 7, intensity: 3, pace: 7, moral_complexity: 3, fabulism: 7, emotional_register: 7, interiority: 4, tone: 8, difficulty: 1 }, tags: ["paranormal-romance", "werewolves", "HEA", "rom-com"] },
};

const merged = { ...existing, ...batch };
fs.writeFileSync(SIDECAR, JSON.stringify(merged, null, 2));

const before = Object.keys(existing).length;
const after = Object.keys(merged).length;
console.log("Before:", before, "| Added:", Object.keys(batch).length, "| After:", after);
