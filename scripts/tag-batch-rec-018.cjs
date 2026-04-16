const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const existing = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));

const batch = {
  // Greg Rucka — graphic novels (acclaimed crime/action)
  12380: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 7, pace: 6, moral_complexity: 8, fabulism: 5, emotional_register: 3, interiority: 5, tone: 2, difficulty: 4 }, tags: ["graphic-novel", "dystopian", "near-future", "family-saga", "female-protagonist", "political-intrigue", "class", "violence", "ensemble-cast"] },
  12381: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 6, pace: 7, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 3 }, tags: ["graphic-novel", "espionage", "female-protagonist", "british-setting", "action", "political-intrigue", "series-detective"] },
  12382: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 6, pace: 6, moral_complexity: 7, fabulism: 3, emotional_register: 3, interiority: 5, tone: 3, difficulty: 3 }, tags: ["graphic-novel", "police-procedural", "ensemble-cast", "urban", "noir", "superhero-adjacent", "moral-dilemma"] },
  12383: { vibes: { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 6, pace: 7, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 3 }, tags: ["thriller", "female-protagonist", "musician-protagonist", "family", "conspiracy", "contemporary-setting"] },

  // Gail Simone — graphic novels
  12384: { vibes: { prose_craft: 6, prose_style: 4, warmth: 5, intensity: 6, pace: 7, moral_complexity: 6, fabulism: 6, emotional_register: 4, interiority: 4, tone: 6, difficulty: 3 }, tags: ["graphic-novel", "superhero", "ensemble-cast", "antihero", "witty-prose", "morally-gray-protagonist", "action"] },
  12385: { vibes: { prose_craft: 6, prose_style: 4, warmth: 5, intensity: 5, pace: 7, moral_complexity: 5, fabulism: 5, emotional_register: 5, interiority: 4, tone: 6, difficulty: 3 }, tags: ["graphic-novel", "superhero", "female-protagonist", "ensemble-cast", "action", "found-family", "witty-prose"] },

  // Kelly Sue DeConnick — Captain Marvel
  12379: { vibes: { prose_craft: 6, prose_style: 4, warmth: 6, intensity: 5, pace: 7, moral_complexity: 5, fabulism: 7, emotional_register: 5, interiority: 5, tone: 5, difficulty: 3 }, tags: ["graphic-novel", "superhero", "female-protagonist", "space-opera", "action", "military-sf", "identity"] },

  // Andrea Hairston — Afrofuturist literary fantasy
  12262: { vibes: { prose_craft: 7, prose_style: 6, warmth: 6, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 5, emotional_register: 4, interiority: 6, tone: 4, difficulty: 6 }, tags: ["historical-fantasy", "Black-protagonist", "female-protagonist", "american-setting", "magical-realism", "race", "community", "multigenerational", "lyrical-prose", "19th-century"] },
  12263: { vibes: { prose_craft: 7, prose_style: 6, warmth: 6, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 5, emotional_register: 4, interiority: 6, tone: 4, difficulty: 6 }, tags: ["urban-fantasy", "Black-protagonist", "female-protagonist", "family", "magical-realism", "community", "lyrical-prose"] },
  12264: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 7, emotional_register: 3, interiority: 6, tone: 3, difficulty: 6 }, tags: ["epic-fantasy", "secondary-world", "female-protagonist", "ecological", "political-intrigue", "ensemble-cast", "lyrical-prose"] },

  // Olivia Atwater — Regency fantasy romance (cozy)
  12268: { vibes: { prose_craft: 5, prose_style: 4, warmth: 8, intensity: 2, pace: 5, moral_complexity: 5, fabulism: 7, emotional_register: 7, interiority: 5, tone: 7, difficulty: 2 }, tags: ["regency-romance", "historical-fantasy", "female-protagonist", "neurodivergent", "faeries", "cozy", "HEA", "witty-prose", "british-setting"] },
  12269: { vibes: { prose_craft: 5, prose_style: 4, warmth: 8, intensity: 2, pace: 5, moral_complexity: 5, fabulism: 7, emotional_register: 7, interiority: 5, tone: 7, difficulty: 2 }, tags: ["regency-romance", "historical-fantasy", "female-protagonist", "faeries", "cozy", "HEA", "working-class", "british-setting"] },
  12270: { vibes: { prose_craft: 5, prose_style: 4, warmth: 8, intensity: 3, pace: 5, moral_complexity: 5, fabulism: 7, emotional_register: 7, interiority: 5, tone: 7, difficulty: 2 }, tags: ["regency-romance", "historical-fantasy", "female-protagonist", "faeries", "cozy", "HEA", "british-setting"] },

  // Molly Tanzer — Vermilion (weird western)
  12276: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 6, emotional_register: 4, interiority: 5, tone: 5, difficulty: 4 }, tags: ["weird-fiction", "western-setting", "female-protagonist", "Asian-protagonist", "queer-protagonist", "mystery", "adventure", "19th-century", "steampunk"] },

  // Benjamin Percy — The Ninth Metal
  12261: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 6, pace: 6, moral_complexity: 6, fabulism: 5, emotional_register: 3, interiority: 5, tone: 3, difficulty: 4 }, tags: ["near-future", "small-town", "multi-pov", "alien-artifact", "class", "midwestern-setting", "literary-sf", "noir"] },

  // YA — tagging the ones I know enough about with genre-informed vibes

  // Ally Condie — Matched (YA dystopian)
  12166: { vibes: { prose_craft: 5, prose_style: 4, warmth: 6, intensity: 4, pace: 6, moral_complexity: 5, fabulism: 6, emotional_register: 5, interiority: 6, tone: 3, difficulty: 2 }, tags: ["YA-dystopian", "female-protagonist", "first-person", "romance-subplot", "near-future", "rebellion", "forbidden-love"] },
  12167: { vibes: { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 6, emotional_register: 4, interiority: 5, tone: 3, difficulty: 2 }, tags: ["YA-dystopian", "female-protagonist", "rebellion", "near-future", "survival", "love-triangle"] },
  12168: { vibes: { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 6, emotional_register: 4, interiority: 5, tone: 3, difficulty: 2 }, tags: ["YA-dystopian", "female-protagonist", "rebellion", "near-future", "war"] },

  // Beth Revis — Across the Universe (YA SF, generation ship)
  12169: { vibes: { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 6, pace: 7, moral_complexity: 6, fabulism: 8, emotional_register: 4, interiority: 5, tone: 3, difficulty: 3 }, tags: ["YA-sci-fi", "generation-ship", "female-protagonist", "dual-pov", "mystery", "romance-subplot", "conspiracy", "far-future"] },
  12170: { vibes: { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 6, pace: 7, moral_complexity: 6, fabulism: 8, emotional_register: 4, interiority: 5, tone: 3, difficulty: 3 }, tags: ["YA-sci-fi", "generation-ship", "dual-pov", "mystery", "conspiracy"] },
  12171: { vibes: { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 6, pace: 7, moral_complexity: 6, fabulism: 8, emotional_register: 4, interiority: 5, tone: 3, difficulty: 3 }, tags: ["YA-sci-fi", "colony-world", "dual-pov", "survival", "action"] },

  // Carrie Ryan — Forest of Hands and Teeth (YA zombie)
  12230: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 6, pace: 6, moral_complexity: 5, fabulism: 4, emotional_register: 3, interiority: 6, tone: 2, difficulty: 2 }, tags: ["YA-fantasy", "zombies", "female-protagonist", "first-person", "post-apocalyptic", "survival", "isolation", "romance-subplot", "village-setting"] },
  12231: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 6, pace: 6, moral_complexity: 5, fabulism: 4, emotional_register: 3, interiority: 5, tone: 2, difficulty: 2 }, tags: ["YA-fantasy", "zombies", "female-protagonist", "post-apocalyptic", "survival", "ocean-setting"] },
  12232: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 6, pace: 6, moral_complexity: 5, fabulism: 4, emotional_register: 3, interiority: 5, tone: 2, difficulty: 2 }, tags: ["YA-fantasy", "zombies", "female-protagonist", "post-apocalyptic", "survival", "urban"] },

  // Dan Wells — Partials (YA SF)
  12175: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 5, pace: 7, moral_complexity: 6, fabulism: 6, emotional_register: 4, interiority: 5, tone: 3, difficulty: 3 }, tags: ["YA-sci-fi", "post-apocalyptic", "female-protagonist", "near-future", "genetic-engineering", "survival", "conspiracy"] },

  // Rob Thurman — Cal Leandros (urban fantasy, brothers)
  12338: { vibes: { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 6, pace: 7, moral_complexity: 5, fabulism: 7, emotional_register: 4, interiority: 4, tone: 5, difficulty: 3 }, tags: ["urban-fantasy", "male-protagonist", "first-person", "sibling-bond", "monsters", "new-york-setting", "witty-prose", "action"] },
  12339: { vibes: { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 6, pace: 7, moral_complexity: 5, fabulism: 7, emotional_register: 4, interiority: 4, tone: 5, difficulty: 3 }, tags: ["urban-fantasy", "male-protagonist", "first-person", "sibling-bond", "monsters", "new-york-setting", "action"] },
  12340: { vibes: { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 6, pace: 7, moral_complexity: 5, fabulism: 7, emotional_register: 4, interiority: 4, tone: 5, difficulty: 3 }, tags: ["urban-fantasy", "male-protagonist", "first-person", "sibling-bond", "monsters", "new-york-setting"] },

  // Wesley Chu — The Art of Prophecy (epic fantasy, subversive chosen-one)
  12337: { vibes: { prose_craft: 6, prose_style: 4, warmth: 6, intensity: 5, pace: 6, moral_complexity: 6, fabulism: 9, emotional_register: 5, interiority: 5, tone: 5, difficulty: 4 }, tags: ["epic-fantasy", "secondary-world", "Asian-inspired-setting", "chosen-one", "subversive", "martial-arts", "multi-pov", "coming-of-age", "mentor-student"] },

  // Maggie Shayne — paranormal romance
  12362: { vibes: { prose_craft: 4, prose_style: 3, warmth: 7, intensity: 4, pace: 6, moral_complexity: 3, fabulism: 7, emotional_register: 6, interiority: 5, tone: 5, difficulty: 2 }, tags: ["paranormal-romance", "vampires", "female-protagonist", "HEA", "steamy", "contemporary-setting"] },
  12363: { vibes: { prose_craft: 4, prose_style: 3, warmth: 7, intensity: 4, pace: 6, moral_complexity: 3, fabulism: 7, emotional_register: 6, interiority: 5, tone: 5, difficulty: 2 }, tags: ["paranormal-romance", "vampires", "HEA", "steamy", "contemporary-setting"] },
  12364: { vibes: { prose_craft: 4, prose_style: 3, warmth: 7, intensity: 4, pace: 6, moral_complexity: 3, fabulism: 7, emotional_register: 6, interiority: 5, tone: 5, difficulty: 2 }, tags: ["paranormal-romance", "vampires", "HEA", "steamy", "contemporary-setting"] },

  // Hayao Miyazaki — Starting Point (nonfiction, essays on animation)
  12121: { vibes: { prose_craft: 7, prose_style: 5, warmth: 7, intensity: 1, pace: 3, moral_complexity: 5, fabulism: 0, emotional_register: 6, interiority: 7, tone: 5, difficulty: 4 }, tags: ["essay-collection", "translated-from", "art-history", "animation", "craft-guide", "personal-essay", "japanese-setting", "ecological", "philosophy"] },

  // Vonda McIntyre — Starfarers
  11767: { vibes: { prose_craft: 6, prose_style: 5, warmth: 6, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 8, emotional_register: 5, interiority: 5, tone: 3, difficulty: 4 }, tags: ["space-opera", "near-future", "female-protagonist", "ensemble-cast", "first-contact", "community", "feminist", "optimistic"] },

  // Sam Sykes — fantasy adventure
  12224: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 6, pace: 7, moral_complexity: 5, fabulism: 9, emotional_register: 4, interiority: 4, tone: 5, difficulty: 3 }, tags: ["secondary-world", "ensemble-cast", "sword-and-sorcery", "adventure", "witty-prose", "violence", "quest"] },
  12225: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 6, pace: 7, moral_complexity: 5, fabulism: 9, emotional_register: 4, interiority: 4, tone: 5, difficulty: 3 }, tags: ["secondary-world", "ensemble-cast", "sword-and-sorcery", "adventure", "violence"] },
  12226: { vibes: { prose_craft: 5, prose_style: 5, warmth: 4, intensity: 6, pace: 6, moral_complexity: 6, fabulism: 9, emotional_register: 4, interiority: 5, tone: 4, difficulty: 4 }, tags: ["secondary-world", "multi-pov", "urban", "political-intrigue", "war", "ensemble-cast"] },

  // Stephen Hunt — Court of the Air (steampunk)
  12368: { vibes: { prose_craft: 5, prose_style: 5, warmth: 5, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 8, emotional_register: 4, interiority: 4, tone: 5, difficulty: 4 }, tags: ["steampunk", "secondary-world", "dual-pov", "coming-of-age", "conspiracy", "revolution", "adventure", "worldbuilding-heavy"] },
  12369: { vibes: { prose_craft: 5, prose_style: 5, warmth: 5, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 8, emotional_register: 4, interiority: 4, tone: 5, difficulty: 4 }, tags: ["steampunk", "secondary-world", "adventure", "quest", "worldbuilding-heavy"] },
  12370: { vibes: { prose_craft: 5, prose_style: 5, warmth: 5, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 8, emotional_register: 4, interiority: 4, tone: 5, difficulty: 4 }, tags: ["steampunk", "secondary-world", "war", "invasion", "worldbuilding-heavy"] },

  // Emma Newman — Between Two Thorns (Split Worlds, lighter fantasy)
  12134: { vibes: { prose_craft: 5, prose_style: 4, warmth: 6, intensity: 3, pace: 6, moral_complexity: 5, fabulism: 7, emotional_register: 5, interiority: 5, tone: 6, difficulty: 3 }, tags: ["urban-fantasy", "female-protagonist", "faeries", "contemporary-setting", "british-setting", "romance-subplot", "court-intrigue", "comedy"] },

  // Nino Cipri — Homesick
  12181: { vibes: { prose_craft: 6, prose_style: 4, warmth: 5, intensity: 3, pace: 5, moral_complexity: 5, fabulism: 5, emotional_register: 4, interiority: 6, tone: 5, difficulty: 3 }, tags: ["literary-fiction", "queer-protagonist", "domestic", "haunted-house", "intimate", "novella-length", "contemporary-setting"] },

  // Peng Shepherd — The Future Library
  12081: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 4, emotional_register: 4, interiority: 6, tone: 4, difficulty: 4 }, tags: ["literary-fiction", "books-within-books", "library-setting", "multi-pov", "memory", "contemporary-setting"] },

  // Joanna Scott — literary fiction
  12639: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 4, pace: 3, moral_complexity: 7, fabulism: 3, emotional_register: 3, interiority: 7, tone: 3, difficulty: 6 }, tags: ["literary-fiction", "historical-fiction", "multi-pov", "nonlinear", "lyrical-prose", "ensemble-cast"] },
  12640: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 4, pace: 3, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 7, tone: 3, difficulty: 6 }, tags: ["historical-fiction", "male-protagonist", "artist-protagonist", "european-setting", "lyrical-prose", "19th-century"] },
  12641: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 3, pace: 3, moral_complexity: 6, fabulism: 3, emotional_register: 4, interiority: 7, tone: 4, difficulty: 5 }, tags: ["literary-fiction", "child-protagonist", "family", "island-setting", "american-setting", "lyrical-prose"] },

  // Dara Horn — The World to Come
  12931: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 3, emotional_register: 4, interiority: 6, tone: 4, difficulty: 4 }, tags: ["literary-fiction", "Jewish-protagonist", "art-world", "dual-timeline", "family-saga", "mystery", "american-setting", "russian-setting"] },

  // Tahar Ben Jelloun — Moroccan-French literary
  12941: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 5, pace: 4, moral_complexity: 8, fabulism: 3, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "moroccan-setting", "female-protagonist", "gender", "identity", "lyrical-prose", "magical-realism", "coming-of-age"] },
  12942: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 3, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "moroccan-setting", "male-protagonist", "immigration", "european-setting", "racism", "loneliness"] },

  // Sonallah Ibrahim — Egyptian literary
  12945: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "egyptian-setting", "female-protagonist", "satirical", "consumerism", "post-colonial", "domestic", "contemporary-setting"] },
  12946: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "egyptian-setting", "male-protagonist", "prison-setting", "political-intrigue", "post-colonial"] },

  // Mahmoud Dowlatabadi — Iranian literary
  12948: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 5, pace: 3, moral_complexity: 7, fabulism: 1, emotional_register: 2, interiority: 7, tone: 2, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "iranian-setting", "rural", "poverty", "family", "working-class", "community", "drought"] },
  12949: { vibes: { prose_craft: 8, prose_style: 7, warmth: 4, intensity: 5, pace: 3, moral_complexity: 8, fabulism: 2, emotional_register: 2, interiority: 7, tone: 2, difficulty: 7 }, tags: ["literary-fiction", "translated-from", "iranian-setting", "rural", "multigenerational", "political-intrigue", "doorstopper", "family-saga", "community"] },

  // Eka Kurniawan — Indonesian literary
  12953: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 7, pace: 5, moral_complexity: 7, fabulism: 4, emotional_register: 3, interiority: 5, tone: 4, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "indonesian-setting", "multigenerational", "magical-realism", "violence", "family-saga", "post-colonial", "doorstopper"] },
  12954: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 3, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "indonesian-setting", "male-protagonist", "coming-of-age", "violence", "class"] },

  // Duong Thu Huong — Vietnamese literary
  12955: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 2, interiority: 7, tone: 2, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "vietnamese-setting", "female-protagonist", "political-intrigue", "communist-era", "domestic", "poverty"] },
  12956: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 5, pace: 4, moral_complexity: 8, fabulism: 1, emotional_register: 2, interiority: 7, tone: 2, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "vietnamese-setting", "male-protagonist", "war", "vietnam-era", "post-war-setting", "political-intrigue", "disillusionment"] },

  // Ibrahim al-Koni — Libyan/Tuareg literary
  12936: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 5, pace: 3, moral_complexity: 7, fabulism: 4, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "saharan-setting", "desert-setting", "male-protagonist", "animal-bond", "spiritual", "lyrical-prose", "novella-length"] },
  12937: { vibes: { prose_craft: 7, prose_style: 6, warmth: 3, intensity: 5, pace: 3, moral_complexity: 7, fabulism: 4, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "saharan-setting", "desert-setting", "male-protagonist", "mythic-fantasy", "spiritual", "lyrical-prose"] },

  // Minae Mizumura — Japanese literary
  13027: { vibes: { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 3, pace: 3, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "japanese-setting", "retelling", "dual-timeline", "marriage", "class", "multigenerational", "doorstopper"] },
  13028: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 2, pace: 3, moral_complexity: 6, fabulism: 0, emotional_register: 4, interiority: 7, tone: 3, difficulty: 5 }, tags: ["narrative-nonfiction", "translated-from", "japanese-setting", "language", "cultural", "essay-collection", "literary-memoir"] },

  // Lyudmila Ulitskaya — remaining
  12986: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "russian-setting", "multi-pov", "ensemble-cast", "political-intrigue", "20th-century", "dissident", "community"] },
  12988: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 6, tone: 4, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "russian-setting", "female-protagonist", "vignettes", "domestic", "contemporary-setting", "family"] },
};

const merged = { ...existing, ...batch };
fs.writeFileSync(SIDECAR, JSON.stringify(merged, null, 2));

const before = Object.keys(existing).length;
const after = Object.keys(merged).length;
console.log("Before:", before, "| Added:", Object.keys(batch).length, "| After:", after);
