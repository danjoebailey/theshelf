const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const existing = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));

const batch = {
  // Henry Green — major British modernist
  13216: { vibes: { prose_craft: 9, prose_style: 6, warmth: 6, intensity: 3, pace: 3, moral_complexity: 7, fabulism: 1, emotional_register: 5, interiority: 6, tone: 5, difficulty: 6 }, tags: ["literary-fiction", "british-setting", "ensemble-cast", "domestic", "country-house", "ww2-era", "servant-class", "dialogue-driven", "restrained-prose", "intimate"] },
  13217: { vibes: { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 2, pace: 2, moral_complexity: 6, fabulism: 2, emotional_register: 4, interiority: 6, tone: 4, difficulty: 6 }, tags: ["literary-fiction", "british-setting", "ensemble-cast", "institutional-setting", "post-war-setting", "pastoral", "atmospheric", "dialogue-driven"] },

  // Arnold Bennett — Edwardian realism
  13218: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 3, pace: 3, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 6, tone: 4, difficulty: 5 }, tags: ["literary-fiction", "british-setting", "female-protagonist", "multigenerational", "family-saga", "domestic", "marriage", "19th-century", "provincial", "social-realism"] },
  13219: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 3, pace: 3, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 6, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "british-setting", "male-protagonist", "coming-of-age", "family-saga", "provincial", "19th-century", "working-class", "social-realism"] },

  // John Galsworthy — Forsyte Saga opener
  13220: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 3, pace: 3, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 6, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "british-setting", "ensemble-cast", "family-saga", "class", "marriage", "property", "victorian-setting", "london-setting", "social-panorama"] },
  13221: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 3, pace: 3, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 6, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "british-setting", "ensemble-cast", "family-saga", "class", "marriage", "edwardian-setting"] },

  // Rose Macaulay — Towers of Trebizond
  13222: { vibes: { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 2, pace: 5, moral_complexity: 6, fabulism: 2, emotional_register: 5, interiority: 6, tone: 7, difficulty: 4 }, tags: ["literary-fiction", "british-setting", "turkish-setting", "female-protagonist", "road-trip", "faith-and-doubt", "witty-prose", "travel", "comic-novel", "religious"] },
  13223: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "british-setting", "female-protagonist", "ww2-era", "post-war-setting", "london-setting", "coming-of-age", "ruins"] },

  // Frank Norris — McTeague
  13224: { vibes: { prose_craft: 7, prose_style: 6, warmth: 3, intensity: 7, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 2, interiority: 5, tone: 2, difficulty: 5 }, tags: ["literary-fiction", "american-setting", "san-francisco-setting", "male-protagonist", "marriage", "greed", "decline", "naturalism", "working-class", "violence"] },

  // Ellen Glasgow — Barren Ground
  13226: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "american-setting", "virginia-setting", "female-protagonist", "rural", "farming", "resilience", "multigenerational", "southern-setting"] },

  // Stephen Crane — naturalism
  13228: { vibes: { prose_craft: 7, prose_style: 5, warmth: 2, intensity: 7, pace: 6, moral_complexity: 7, fabulism: 1, emotional_register: 2, interiority: 5, tone: 2, difficulty: 4 }, tags: ["literary-fiction", "american-setting", "new-york-setting", "female-protagonist", "poverty", "working-class", "naturalism", "urban", "novella-length", "decline"] },
  13229: { vibes: { prose_craft: 8, prose_style: 5, warmth: 3, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 4 }, tags: ["vignettes", "american-setting", "ocean-setting", "survival", "naturalism", "male-protagonist"] },

  // Upton Sinclair — Oil!
  13230: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 5, tone: 3, difficulty: 4 }, tags: ["historical-fiction", "american-setting", "california-setting", "male-protagonist", "capitalism", "oil-industry", "class", "political-intrigue", "father-son", "coming-of-age"] },

  // Sherwood Anderson
  13232: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 3, pace: 3, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "american-setting", "midwestern-setting", "male-protagonist", "small-town", "industrialization", "working-class", "social-realism"] },
  13233: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 3, pace: 3, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 6, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "american-setting", "male-protagonist", "marriage", "alienation", "southern-setting", "20th-century"] },

  // Rosamond Lehmann
  13214: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "british-setting", "female-protagonist", "london-setting", "1930s", "romance-subplot", "domestic", "class", "marriage"] },
  13215: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 7, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "british-setting", "female-protagonist", "coming-of-age", "academia", "romance-subplot", "1920s-setting"] },

  // Chilean experimental feminist
  13383: { vibes: { prose_craft: 8, prose_style: 7, warmth: 2, intensity: 6, pace: 3, moral_complexity: 8, fabulism: 4, emotional_register: 2, interiority: 8, tone: 2, difficulty: 8 }, tags: ["literary-fiction", "translated-from", "chilean-setting", "twin", "domestic", "body-horror", "surreal", "feminist", "experimental-form", "dense-prose"] },
  13384: { vibes: { prose_craft: 8, prose_style: 7, warmth: 2, intensity: 5, pace: 3, moral_complexity: 7, fabulism: 3, emotional_register: 2, interiority: 8, tone: 2, difficulty: 7 }, tags: ["literary-fiction", "translated-from", "female-protagonist", "hospital-setting", "surveillance", "feminist", "experimental-form", "dense-prose"] },

  // Nona Fernández — Chilean literary
  13385: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 3, emotional_register: 3, interiority: 6, tone: 4, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "chilean-setting", "ensemble-cast", "childhood", "dictatorship", "memory", "novella-length", "coming-of-age"] },
  13386: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 3, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "chilean-setting", "dictatorship", "torture", "memory", "political-intrigue", "metafiction"] },

  // Lina Meruane — Chilean literary
  13387: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 6, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 2, interiority: 8, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "chilean-setting", "female-protagonist", "illness", "blindness", "domestic", "intimate", "first-person"] },
  13388: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 2, emotional_register: 2, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "female-protagonist", "illness", "domestic", "family", "body", "intimate"] },

  // Cristina Peri Rossi — Uruguayan literary
  13377: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 4, emotional_register: 3, interiority: 6, tone: 4, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "uruguayan-setting", "ensemble-cast", "exile", "fabulism", "absurdist", "political-allegory", "vignettes"] },
  13378: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 3, emotional_register: 3, interiority: 6, tone: 4, difficulty: 5 }, tags: ["vignettes", "translated-from", "female-protagonist", "sexuality", "lesbian", "exile", "intimate"] },

  // Stratis Myrivilis — Greek literary
  13390: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 4, pace: 3, moral_complexity: 6, fabulism: 2, emotional_register: 4, interiority: 6, tone: 4, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "greek-setting", "island-setting", "female-protagonist", "community", "rural", "lyrical-prose", "atmospheric", "marine-setting"] },

  // Juan Villoro — Mexican literary
  13411: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 2, emotional_register: 3, interiority: 6, tone: 5, difficulty: 4 }, tags: ["vignettes", "translated-from", "mexican-setting", "multi-pov", "urban", "contemporary-setting", "satirical", "witty-prose"] },

  // Santiago Gamboa — Colombian literary
  13415: { vibes: { prose_craft: 6, prose_style: 5, warmth: 3, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 2, emotional_register: 3, interiority: 5, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "multi-pov", "global-setting", "ensemble-cast", "conference-setting", "contemporary-setting", "conspiracy"] },

  // Horacio Castellanos Moya — Tyrant Memory
  13418: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 6, pace: 5, moral_complexity: 8, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "central-american-setting", "multi-pov", "dictatorship", "political-intrigue", "family", "dual-timeline", "resistance"] },

  // Juan Gabriel Vásquez — Reputations
  13414: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 4, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "colombian-setting", "male-protagonist", "political-intrigue", "cartoonist", "reputation", "memory", "contemporary-setting", "novella-length"] },

  // Rodrigo Rey Rosa — Guatemalan literary
  13407: { vibes: { prose_craft: 7, prose_style: 4, warmth: 3, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 2, emotional_register: 3, interiority: 6, tone: 4, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "guatemalan-setting", "books-within-books", "male-protagonist", "mystery", "restrained-prose", "novella-length"] },
  13408: { vibes: { prose_craft: 7, prose_style: 4, warmth: 3, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "moroccan-setting", "male-protagonist", "outsider-protagonist", "restrained-prose", "migration", "novella-length"] },

  // Rodrigo Fresán — Kensington Gardens
  13410: { vibes: { prose_craft: 8, prose_style: 7, warmth: 4, intensity: 3, pace: 3, moral_complexity: 6, fabulism: 4, emotional_register: 4, interiority: 7, tone: 5, difficulty: 7 }, tags: ["literary-fiction", "translated-from", "london-setting", "male-protagonist", "writer-protagonist", "childhood", "peter-pan", "metafiction", "dense-prose"] },

  // Dara Horn — Guide for the Perplexed
  12933: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 3, emotional_register: 4, interiority: 6, tone: 4, difficulty: 4 }, tags: ["literary-fiction", "dual-timeline", "female-protagonist", "Jewish-protagonist", "technology", "memory", "egyptian-setting", "contemporary-setting", "medieval-setting"] },

  // Oscar Hijuelos — Cuban-American literary
  13431: { vibes: { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 6, tone: 4, difficulty: 4 }, tags: ["literary-fiction", "cuban-american", "male-protagonist", "new-york-setting", "immigrant-protagonist", "family", "coming-of-age", "1940s", "nostalgia"] },
  13432: { vibes: { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 6, tone: 4, difficulty: 4 }, tags: ["literary-fiction", "cuban-american", "female-protagonist", "new-york-setting", "immigrant-protagonist", "working-class", "domestic", "contemporary-setting"] },

  // Cristina García — Cuban-American
  13433: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 3, emotional_register: 4, interiority: 6, tone: 4, difficulty: 4 }, tags: ["literary-fiction", "cuban-setting", "american-setting", "female-protagonist", "family-saga", "magical-realism", "exile", "sibling-bond", "identity"] },
  13434: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 2, emotional_register: 4, interiority: 5, tone: 4, difficulty: 4 }, tags: ["literary-fiction", "central-american-setting", "ensemble-cast", "multi-pov", "hotel-setting", "political-intrigue", "contemporary-setting"] },

  // Rudolfo Anaya — Chicano literary
  13430: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 2, emotional_register: 4, interiority: 5, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "american-setting", "new-mexico-setting", "male-protagonist", "Latino-protagonist", "working-class", "urban", "community", "political-intrigue"] },

  // Monique Truong — Bitter in the Mouth
  13420: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 2, emotional_register: 4, interiority: 7, tone: 4, difficulty: 4 }, tags: ["literary-fiction", "asian-protagonist", "female-protagonist", "southern-setting", "coming-of-age", "identity", "synesthesia", "race", "family", "secrets"] },

  // Jean Stafford — Boston Adventure
  13308: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 3, pace: 3, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "american-setting", "boston-setting", "female-protagonist", "coming-of-age", "class", "immigrant-protagonist", "domestic", "restrained-prose"] },

  // Hortense Calisher — Collected Stories
  13309: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 3, pace: 3, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 7, tone: 3, difficulty: 5 }, tags: ["vignettes", "american-setting", "new-york-setting", "female-protagonist", "domestic", "family", "class", "20th-century", "lyrical-prose"] },

  // Kathryn Davis — The Silk Road
  13328: { vibes: { prose_craft: 8, prose_style: 7, warmth: 4, intensity: 4, pace: 3, moral_complexity: 6, fabulism: 5, emotional_register: 3, interiority: 7, tone: 4, difficulty: 7 }, tags: ["literary-fiction", "experimental-form", "surreal", "nonlinear", "braided-narratives", "dreamlike", "multi-pov", "lyrical-prose"] },

  // Elena Poniatowska — Here's to You, Jesusa
  13379: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "mexican-setting", "female-protagonist", "working-class", "oral-history", "revolution", "20th-century", "coming-of-age", "poverty"] },

  // Rosario Castellanos — The Nine Guardians
  13382: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "mexican-setting", "child-protagonist", "Indigenous-community", "class", "colonial-legacy", "rural", "coming-of-age", "lyrical-prose"] },

  // Australian literary — remaining
  13261: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 5, pace: 3, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "australian-setting", "Indigenous-protagonist", "multigenerational", "identity", "colonial-era", "family-saga", "experimental-form"] },
  13263: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 3, pace: 3, moral_complexity: 5, fabulism: 2, emotional_register: 4, interiority: 7, tone: 4, difficulty: 5 }, tags: ["literary-fiction", "australian-setting", "female-protagonist", "vignettes", "light", "photography", "lyrical-prose", "atmospheric"] },
  13265: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 3, pace: 3, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "australian-setting", "male-protagonist", "rural", "writer-protagonist", "domestic", "marriage", "memory"] },
  13266: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "australian-setting", "sri-lankan-setting", "multi-pov", "immigration", "dual-timeline", "identity", "travel"] },

  // New Zealand
  13274: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "new-zealand-setting", "multi-pov", "immigration", "identity", "ensemble-cast", "contemporary-setting"] },

  // Canadian
  13279: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 5, pace: 4, moral_complexity: 6, fabulism: 2, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "canadian-setting", "newfoundland-setting", "male-protagonist", "island-setting", "community", "isolation", "contemporary-setting", "resistance"] },

  // Mochtar Lubis — Indonesian literary
  12957: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "indonesian-setting", "urban", "corruption", "political-intrigue", "ensemble-cast", "post-colonial", "social-realism"] },
  12958: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "indonesian-setting", "female-protagonist", "feminism", "sexuality", "political-intrigue", "contemporary-setting"] },

  // Marie NDiaye — Ladivine
  13159: { vibes: { prose_craft: 8, prose_style: 6, warmth: 3, intensity: 4, pace: 3, moral_complexity: 7, fabulism: 4, emotional_register: 2, interiority: 8, tone: 2, difficulty: 6 }, tags: ["literary-fiction", "translated-from", "french-setting", "female-protagonist", "multigenerational", "identity", "race", "family", "surreal", "transformation"] },

  // Yuri Andrukhovych — Ukrainian experimental
  13292: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 4, emotional_register: 4, interiority: 5, tone: 6, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "ukrainian-setting", "european-setting", "male-protagonist", "picaresque", "carnival", "satirical", "postmodern", "sexuality"] },
  13293: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 2, emotional_register: 4, interiority: 6, tone: 5, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "ukrainian-setting", "multi-pov", "vignettes", "community", "satirical"] },

  // Amber Sparks — American literary flash/short fiction
  12397: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 3, pace: 4, moral_complexity: 5, fabulism: 4, emotional_register: 4, interiority: 6, tone: 4, difficulty: 4 }, tags: ["vignettes", "fabulism", "female-protagonist", "surreal", "dreamlike", "mythic-fantasy", "contemporary-setting"] },
  12398: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 4, pace: 4, moral_complexity: 5, fabulism: 4, emotional_register: 3, interiority: 6, tone: 4, difficulty: 4 }, tags: ["vignettes", "fabulism", "female-protagonist", "surreal", "fairy-tale-retelling", "violence", "feminist"] },

  // Peter Stamm — Agnes
  13404: { vibes: { prose_craft: 7, prose_style: 4, warmth: 3, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 2, emotional_register: 3, interiority: 7, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "swiss-setting", "male-protagonist", "romance-subplot", "writer-protagonist", "restrained-prose", "domestic", "uneasy"] },

  // Jáchym Topol — The Devil's Workshop
  13358: { vibes: { prose_craft: 7, prose_style: 6, warmth: 3, intensity: 6, pace: 5, moral_complexity: 7, fabulism: 3, emotional_register: 3, interiority: 5, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "czech-setting", "belarusian-setting", "male-protagonist", "Holocaust", "post-communist", "memory", "violence", "contemporary-setting"] },

  // Vassilis Vassilikos — The Harpoon Gun
  13394: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["vignettes", "translated-from", "greek-setting", "male-protagonist", "coming-of-age", "political-intrigue", "intimate"] },

  // Karel Čapek — An Ordinary Life
  13361: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 2, pace: 3, moral_complexity: 6, fabulism: 2, emotional_register: 4, interiority: 8, tone: 4, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "czech-setting", "male-protagonist", "autofiction", "memory", "identity", "philosophical", "domestic"] },

  // Jennine Capó Crucet
  13429: { vibes: { prose_craft: 6, prose_style: 4, warmth: 5, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 6, tone: 4, difficulty: 3 }, tags: ["literary-fiction", "cuban-american", "female-protagonist", "coming-of-age", "academia", "first-generation", "identity", "contemporary-setting", "race"] },

  // Zoë Wicomb — South African
  13369: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "south-african-setting", "male-protagonist", "post-apartheid", "identity", "race", "multi-pov", "political-intrigue"] },
  13370: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 6, tone: 3, difficulty: 4 }, tags: ["vignettes", "south-african-setting", "female-protagonist", "coming-of-age", "coloured-identity", "race", "apartheid-era", "domestic"] },

  // Martin Suter — Small World
  13405: { vibes: { prose_craft: 6, prose_style: 4, warmth: 5, intensity: 3, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 6, tone: 4, difficulty: 3 }, tags: ["literary-fiction", "translated-from", "swiss-setting", "male-protagonist", "elderly-protagonist", "alzheimers", "memory", "domestic", "mystery"] },

  // Alexandros Papadiamantis — The Boundless Garden
  13392: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 3, pace: 3, moral_complexity: 6, fabulism: 2, emotional_register: 4, interiority: 6, tone: 4, difficulty: 5 }, tags: ["vignettes", "translated-from", "greek-setting", "island-setting", "rural", "community", "19th-century", "lyrical-prose", "pastoral", "atmospheric"] },

  // Maylis de Kerangal — Painting Time
  13173: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 2, pace: 3, moral_complexity: 5, fabulism: 1, emotional_register: 5, interiority: 7, tone: 4, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "russian-setting", "female-protagonist", "artist-protagonist", "painting", "coming-of-age", "lyrical-prose", "contemporary-setting"] },
};

const merged = { ...existing, ...batch };
fs.writeFileSync(SIDECAR, JSON.stringify(merged, null, 2));

const before = Object.keys(existing).length;
const after = Object.keys(merged).length;
console.log("Before:", before, "| Added:", Object.keys(batch).length, "| After:", after);