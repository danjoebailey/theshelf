const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const existing = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));

const batch = {
  // Sylvie Germain — French mystical literary fiction
  12455: { vibes: { prose_craft: 7, prose_style: 7, warmth: 4, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 5, emotional_register: 3, interiority: 7, tone: 3, difficulty: 6 }, tags: ["literary-fiction", "translated-from", "family-saga", "french-setting", "rural", "multigenerational", "war", "lyrical-prose", "mystical"] },
  12456: { vibes: { prose_craft: 7, prose_style: 7, warmth: 4, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 5, emotional_register: 3, interiority: 7, tone: 3, difficulty: 6 }, tags: ["literary-fiction", "translated-from", "family-saga", "french-setting", "ww2-era", "lyrical-prose", "mystical"] },
  12457: { vibes: { prose_craft: 7, prose_style: 7, warmth: 3, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 5, emotional_register: 2, interiority: 7, tone: 3, difficulty: 6 }, tags: ["literary-fiction", "translated-from", "female-protagonist", "french-setting", "mythology", "dreamlike", "lyrical-prose"] },

  // Brian Moore — Black Robe (Canadian Jesuit historical)
  12678: { vibes: { prose_craft: 8, prose_style: 5, warmth: 4, intensity: 7, pace: 5, moral_complexity: 9, fabulism: 1, emotional_register: 3, interiority: 7, tone: 2, difficulty: 5 }, tags: ["historical-fiction", "religious", "faith-and-doubt", "colonial-era", "indigenous-community", "canadian-setting", "male-protagonist", "priest-protagonist", "violence", "cultural-clash"] },

  // Torgny Lindgren — Swedish literary
  12686: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 4, pace: 3, moral_complexity: 7, fabulism: 3, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "biblical", "swedish-setting", "rural", "lyrical-prose"] },
  12687: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 5, pace: 3, moral_complexity: 7, fabulism: 2, emotional_register: 2, interiority: 6, tone: 2, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "swedish-setting", "rural", "poverty", "bleak"] },

  // Jan Kjærstad — Norwegian maximalist literary
  12688: { vibes: { prose_craft: 8, prose_style: 7, warmth: 4, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 3, emotional_register: 4, interiority: 7, tone: 4, difficulty: 6 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "norwegian-setting", "nonlinear", "identity", "maximalism", "braided-narratives"] },
  12689: { vibes: { prose_craft: 8, prose_style: 7, warmth: 4, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 3, emotional_register: 4, interiority: 7, tone: 4, difficulty: 6 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "norwegian-setting", "nonlinear", "identity", "maximalism"] },

  // Jean Giono — The Horseman on the Roof (French historical romance)
  12710: { vibes: { prose_craft: 7, prose_style: 6, warmth: 6, intensity: 6, pace: 6, moral_complexity: 6, fabulism: 2, emotional_register: 4, interiority: 5, tone: 4, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "male-protagonist", "french-setting", "19th-century", "plague", "adventure", "romance-subplot", "pastoral"] },

  // Jean Echenoz — Ravel (French biographical miniature)
  12714: { vibes: { prose_craft: 8, prose_style: 5, warmth: 4, intensity: 2, pace: 4, moral_complexity: 5, fabulism: 1, emotional_register: 3, interiority: 6, tone: 4, difficulty: 4 }, tags: ["biographical-fiction", "translated-from", "male-protagonist", "musician-protagonist", "french-setting", "minimalism", "restrained-prose", "20th-century"] },

  // Pierre Michon — biographical literary miniatures
  12720: { vibes: { prose_craft: 9, prose_style: 7, warmth: 4, intensity: 3, pace: 3, moral_complexity: 6, fabulism: 2, emotional_register: 3, interiority: 7, tone: 3, difficulty: 6 }, tags: ["biographical-fiction", "translated-from", "male-protagonist", "french-setting", "artist-protagonist", "lyrical-prose", "novella-length", "19th-century"] },
  12721: { vibes: { prose_craft: 9, prose_style: 7, warmth: 4, intensity: 3, pace: 3, moral_complexity: 5, fabulism: 2, emotional_register: 3, interiority: 7, tone: 3, difficulty: 6 }, tags: ["literary-fiction", "translated-from", "vignettes", "rural", "french-setting", "lyrical-prose", "mythology", "memory"] },

  // Dacia Maraini — Italian literary / historical
  12746: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "female-protagonist", "disabled-protagonist", "italian-setting", "18th-century", "aristocratic", "feminism", "deaf-protagonist"] },
  12748: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 6, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "female-protagonist", "ww2-era", "train-setting", "Holocaust", "italian-setting"] },

  // Erri De Luca — Italian literary fiction
  12749: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 2, emotional_register: 4, interiority: 7, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "italian-setting", "coming-of-age", "urban", "novella-length"] },
  12750: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 6, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "italian-setting", "immigrant-protagonist", "memory", "novella-length"] },
  12751: { vibes: { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 5, interiority: 7, tone: 4, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "italian-setting", "coming-of-age", "urban", "nostalgia", "novella-length"] },

  // Clemens Meyer — German literary fiction
  12763: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 6, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "german-setting", "urban", "working-class", "sex-work", "ensemble-cast", "post-reunification"] },
  12764: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["vignettes", "translated-from", "german-setting", "urban", "working-class", "post-reunification", "youth"] },

  // Mike McCormack — Crowe's Requiem
  12767: { vibes: { prose_craft: 8, prose_style: 7, warmth: 4, intensity: 5, pace: 3, moral_complexity: 7, fabulism: 4, emotional_register: 3, interiority: 7, tone: 3, difficulty: 6 }, tags: ["literary-fiction", "irish-setting", "male-protagonist", "experimental-form", "isolation", "gothic-atmosphere", "rural"] },

  // Anne Michaels — The Winter Vault
  12772: { vibes: { prose_craft: 9, prose_style: 7, warmth: 5, intensity: 3, pace: 2, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 9, tone: 3, difficulty: 6 }, tags: ["literary-fiction", "dual-timeline", "marriage", "grief", "architectural", "egyptian-setting", "canadian-setting", "lyrical-prose", "memory", "loss"] },

  // Jane Urquhart — Canadian literary
  12773: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 3, emotional_register: 4, interiority: 6, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "irish-setting", "canadian-setting", "multigenerational", "immigration", "famine", "female-protagonist", "lyrical-prose"] },
  12774: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 2, emotional_register: 4, interiority: 6, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "canadian-setting", "ww1-era", "immigrant-community", "working-class", "sculpture", "lyrical-prose"] },
  12775: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 3, pace: 3, moral_complexity: 6, fabulism: 2, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "canadian-setting", "male-protagonist", "artist-protagonist", "memory", "landscape", "lyrical-prose"] },

  // Lisa Moore — Newfoundland literary fiction
  12776: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 5, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "canadian-setting", "female-protagonist", "grief", "marriage", "loss", "nonlinear", "domestic"] },
  12778: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "canadian-setting", "ensemble-cast", "multi-pov", "contemporary-setting", "urban", "violence"] },

  // Elizabeth Jolley — Australian literary fiction
  12779: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 3, pace: 3, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 7, tone: 4, difficulty: 5 }, tags: ["literary-fiction", "male-protagonist", "elderly-protagonist", "australian-setting", "hospital-setting", "aging", "loneliness", "dark-comedy"] },
  12780: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "female-protagonist", "australian-setting", "rural", "isolation", "domestic", "gothic-atmosphere"] },
  12781: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 3, pace: 4, moral_complexity: 5, fabulism: 2, emotional_register: 5, interiority: 7, tone: 5, difficulty: 5 }, tags: ["literary-fiction", "female-protagonist", "australian-setting", "epistolary", "writer-protagonist", "metafiction", "whimsical"] },

  // Julia Franck — German literary fiction
  12782: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 6, pace: 4, moral_complexity: 8, fabulism: 1, emotional_register: 2, interiority: 7, tone: 2, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "female-protagonist", "german-setting", "ww2-era", "motherhood", "abandonment", "domestic"] },
  12783: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "german-setting", "cold-war-era", "sibling-bond", "family", "post-war-setting"] },

  // Madeleine Thien — Canadian literary
  12784: { vibes: { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 5, pace: 4, moral_complexity: 8, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "chinese-setting", "canadian-setting", "dual-timeline", "musician-protagonist", "cultural-revolution", "multigenerational", "political-intrigue", "family-saga"] },
  12785: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "female-protagonist", "cambodian-setting", "canadian-setting", "genocide", "memory", "war-trauma", "immigrant-protagonist"] },
  12786: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 3, pace: 3, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 7, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "female-protagonist", "multi-pov", "grief", "loss", "memory", "global-setting"] },

  // Maria Gainza — Argentine art-world literary fiction
  12791: { vibes: { prose_craft: 8, prose_style: 5, warmth: 4, intensity: 2, pace: 4, moral_complexity: 5, fabulism: 2, emotional_register: 4, interiority: 7, tone: 4, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "female-protagonist", "argentine-setting", "art-history", "vignettes", "first-person", "essay-style"] },
  12792: { vibes: { prose_craft: 8, prose_style: 5, warmth: 4, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 3, emotional_register: 4, interiority: 6, tone: 4, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "female-protagonist", "argentine-setting", "art-world", "mystery", "forgery"] },

  // Carmen Boullosa — Mexican literary fiction
  12793: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 3, emotional_register: 4, interiority: 5, tone: 4, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "mexican-setting", "19th-century", "war", "border-setting", "multi-pov"] },
  12794: { vibes: { prose_craft: 7, prose_style: 6, warmth: 3, intensity: 4, pace: 3, moral_complexity: 6, fabulism: 5, emotional_register: 3, interiority: 7, tone: 3, difficulty: 6 }, tags: ["literary-fiction", "translated-from", "female-protagonist", "mexican-setting", "surreal", "childhood", "dreamlike", "gothic-atmosphere"] },
  12795: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 6, pace: 6, moral_complexity: 7, fabulism: 3, emotional_register: 3, interiority: 5, tone: 4, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "caribbean-setting", "pirate", "colonial-era", "male-protagonist", "adventure"] },

  // Cristina Rivera Garza — Mexican experimental literary
  12796: { vibes: { prose_craft: 8, prose_style: 6, warmth: 3, intensity: 4, pace: 3, moral_complexity: 7, fabulism: 5, emotional_register: 3, interiority: 7, tone: 3, difficulty: 6 }, tags: ["literary-fiction", "translated-from", "surreal", "fabulism", "dreamlike", "novella-length", "fairy-tale-retelling", "experimental-form"] },
  12797: { vibes: { prose_craft: 8, prose_style: 6, warmth: 3, intensity: 5, pace: 3, moral_complexity: 7, fabulism: 5, emotional_register: 3, interiority: 7, tone: 3, difficulty: 6 }, tags: ["literary-fiction", "translated-from", "female-protagonist", "gothic-atmosphere", "hospital-setting", "identity", "gender", "experimental-form", "unreliable-narrator"] },

  // Paul Yoon — Korean-American literary fiction (lyrical, restrained)
  12799: { vibes: { prose_craft: 8, prose_style: 5, warmth: 6, intensity: 3, pace: 2, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "male-protagonist", "immigrant-protagonist", "korean-setting", "brazilian-setting", "post-war-setting", "grief", "restrained-prose", "novella-length", "meditative"] },
  12800: { vibes: { prose_craft: 8, prose_style: 5, warmth: 6, intensity: 3, pace: 2, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 4 }, tags: ["vignettes", "korean-setting", "island-setting", "restrained-prose", "meditative", "ocean-setting", "lyrical-prose", "war-aftermath"] },
  12801: { vibes: { prose_craft: 8, prose_style: 5, warmth: 6, intensity: 3, pace: 2, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 4 }, tags: ["vignettes", "multi-pov", "asian-setting", "restrained-prose", "meditative", "lyrical-prose", "loss"] },

  // Idra Novey — literary fiction
  12805: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 4, pace: 6, moral_complexity: 6, fabulism: 3, emotional_register: 4, interiority: 5, tone: 5, difficulty: 4 }, tags: ["literary-fiction", "female-protagonist", "brazilian-setting", "mystery", "writer-protagonist", "translation-theme", "adventure"] },
  12806: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "female-protagonist", "island-setting", "political-intrigue", "secrets", "contemporary-setting"] },

  // Yu Hua — remaining
  12813: { vibes: { prose_craft: 8, prose_style: 5, warmth: 5, intensity: 8, pace: 5, moral_complexity: 8, fabulism: 1, emotional_register: 1, interiority: 6, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "chinese-setting", "political-intrigue", "cultural-revolution", "poverty", "survival", "family", "bleak", "novella-length"] },
  12815: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 7, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 2, interiority: 6, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "chinese-setting", "poverty", "working-class", "family", "body-selling"] },

  // Can Xue — Chinese avant-garde
  12816: { vibes: { prose_craft: 8, prose_style: 7, warmth: 2, intensity: 4, pace: 2, moral_complexity: 7, fabulism: 7, emotional_register: 3, interiority: 8, tone: 3, difficulty: 9 }, tags: ["experimental-form", "translated-from", "chinese-setting", "surreal", "dreamlike", "dense-prose", "absurdist", "kafka-esque"] },
  12817: { vibes: { prose_craft: 8, prose_style: 7, warmth: 2, intensity: 4, pace: 2, moral_complexity: 7, fabulism: 7, emotional_register: 3, interiority: 8, tone: 3, difficulty: 9 }, tags: ["experimental-form", "translated-from", "surreal", "dreamlike", "dense-prose", "absurdist", "romance-subplot"] },
  12818: { vibes: { prose_craft: 8, prose_style: 7, warmth: 2, intensity: 4, pace: 2, moral_complexity: 7, fabulism: 7, emotional_register: 3, interiority: 8, tone: 3, difficulty: 9 }, tags: ["experimental-form", "translated-from", "vignettes", "surreal", "dreamlike", "dense-prose", "absurdist"] },

  // Spanish literary fiction
  12874: { vibes: { prose_craft: 8, prose_style: 7, warmth: 5, intensity: 4, pace: 3, moral_complexity: 8, fabulism: 1, emotional_register: 4, interiority: 7, tone: 4, difficulty: 7 }, tags: ["literary-fiction", "translated-from", "multi-pov", "spanish-setting", "19th-century", "class", "doorstopper", "social-panorama", "marriage", "working-class"] },
  12875: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 3, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 7, tone: 4, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "female-protagonist", "spanish-setting", "feminism", "marriage", "19th-century", "novella-length"] },
  12876: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 3, pace: 4, moral_complexity: 7, fabulism: 2, emotional_register: 4, interiority: 6, tone: 4, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "priest-protagonist", "spanish-setting", "religious", "pilgrimage", "19th-century"] },
  12877: { vibes: { prose_craft: 8, prose_style: 7, warmth: 4, intensity: 4, pace: 3, moral_complexity: 8, fabulism: 1, emotional_register: 3, interiority: 8, tone: 3, difficulty: 7 }, tags: ["literary-fiction", "translated-from", "female-protagonist", "spanish-setting", "19th-century", "marriage", "adultery", "class", "doorstopper", "social-panorama"] },
  12878: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 3, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 6, tone: 4, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "spanish-setting", "coming-of-age", "philosophical", "social-realism"] },
  12879: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 4, pace: 6, moral_complexity: 5, fabulism: 2, emotional_register: 5, interiority: 5, tone: 5, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "basque-setting", "adventure", "ocean-setting", "memoir"] },
  12880: { vibes: { prose_craft: 8, prose_style: 5, warmth: 4, intensity: 3, pace: 4, moral_complexity: 8, fabulism: 5, emotional_register: 3, interiority: 8, tone: 4, difficulty: 6 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "spanish-setting", "metafiction", "existential", "philosophical", "identity", "novella-length"] },
  12881: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 2, interiority: 7, tone: 2, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "spanish-setting", "obsession", "jealousy", "biblical", "novella-length"] },
  12882: { vibes: { prose_craft: 8, prose_style: 5, warmth: 5, intensity: 3, pace: 4, moral_complexity: 8, fabulism: 1, emotional_register: 4, interiority: 8, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "priest-protagonist", "faith-and-doubt", "spanish-setting", "rural", "novella-length"] },
  // Goytisolo
  12883: { vibes: { prose_craft: 9, prose_style: 8, warmth: 2, intensity: 5, pace: 3, moral_complexity: 8, fabulism: 3, emotional_register: 2, interiority: 8, tone: 2, difficulty: 8 }, tags: ["experimental-form", "translated-from", "male-protagonist", "spanish-setting", "exile", "post-colonial", "dense-prose", "stream-of-consciousness", "political-intrigue"] },
  12884: { vibes: { prose_craft: 9, prose_style: 8, warmth: 1, intensity: 6, pace: 3, moral_complexity: 9, fabulism: 3, emotional_register: 1, interiority: 8, tone: 2, difficulty: 9 }, tags: ["experimental-form", "translated-from", "post-colonial", "stream-of-consciousness", "dense-prose", "sexuality", "identity", "revenge", "cultural-destruction"] },
  12885: { vibes: { prose_craft: 9, prose_style: 8, warmth: 1, intensity: 5, pace: 3, moral_complexity: 8, fabulism: 4, emotional_register: 2, interiority: 8, tone: 2, difficulty: 9 }, tags: ["experimental-form", "translated-from", "stream-of-consciousness", "dense-prose", "sexuality", "identity", "linguistic-play"] },
  // Muñoz Molina
  12889: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 5, pace: 4, moral_complexity: 8, fabulism: 2, emotional_register: 3, interiority: 7, tone: 3, difficulty: 6 }, tags: ["literary-fiction", "translated-from", "vignettes", "jewish-setting", "Holocaust", "spanish-setting", "exile", "memory", "20th-century"] },
  12890: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 7, tone: 3, difficulty: 6 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "spanish-setting", "mystery", "political-intrigue", "post-war-setting"] },
  12891: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "spanish-setting", "marriage", "memory", "novella-length"] },
  // Rodoreda
  12893: { vibes: { prose_craft: 8, prose_style: 5, warmth: 5, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 8, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "female-protagonist", "spanish-setting", "civil-war", "marriage", "working-class", "domestic", "restrained-prose"] },
  12894: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "female-protagonist", "spanish-setting", "urban", "domestic", "poverty"] },
  12895: { vibes: { prose_craft: 8, prose_style: 7, warmth: 3, intensity: 5, pace: 3, moral_complexity: 7, fabulism: 5, emotional_register: 2, interiority: 7, tone: 2, difficulty: 6 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "surreal", "fabulism", "violence", "death", "experimental-form", "lyrical-prose"] },
  // Portuguese
  12901: { vibes: { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 6, tone: 5, difficulty: 6 }, tags: ["literary-fiction", "translated-from", "portuguese-setting", "19th-century", "family-saga", "class", "social-panorama", "doorstopper", "satirical"] },
  12902: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 4, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 4, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "portuguese-setting", "19th-century", "adultery", "class", "satirical"] },
  12903: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 3, pace: 5, moral_complexity: 5, fabulism: 3, emotional_register: 5, interiority: 5, tone: 6, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "portuguese-setting", "pilgrimage", "satirical", "religious", "19th-century"] },
  // Tavares
  12904: { vibes: { prose_craft: 8, prose_style: 6, warmth: 2, intensity: 6, pace: 3, moral_complexity: 8, fabulism: 3, emotional_register: 1, interiority: 7, tone: 2, difficulty: 7 }, tags: ["literary-fiction", "translated-from", "ensemble-cast", "urban", "violence", "bleak", "experimental-form", "philosophical"] },
  12905: { vibes: { prose_craft: 8, prose_style: 6, warmth: 2, intensity: 4, pace: 3, moral_complexity: 8, fabulism: 3, emotional_register: 2, interiority: 7, tone: 2, difficulty: 7 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "philosophical", "experimental-form", "religious", "violence"] },
  12906: { vibes: { prose_craft: 8, prose_style: 6, warmth: 2, intensity: 4, pace: 3, moral_complexity: 7, fabulism: 3, emotional_register: 2, interiority: 7, tone: 2, difficulty: 7 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "workplace", "philosophical", "experimental-form", "alienation"] },
  // Agualusa
  12907: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 3, pace: 5, moral_complexity: 6, fabulism: 4, emotional_register: 5, interiority: 6, tone: 5, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "angolan-setting", "male-protagonist", "identity", "memory", "magical-realism", "post-colonial"] },
  12908: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 4, pace: 5, moral_complexity: 7, fabulism: 3, emotional_register: 4, interiority: 6, tone: 4, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "angolan-setting", "female-protagonist", "isolation", "revolution", "post-colonial", "memory"] },
  12909: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 3, emotional_register: 4, interiority: 5, tone: 4, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "angolan-setting", "colonial-era", "identity", "race", "19th-century"] },
  // Korean
  12910: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 5, pace: 4, moral_complexity: 6, fabulism: 2, emotional_register: 2, interiority: 7, tone: 2, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "female-protagonist", "korean-setting", "urban", "alienation", "poverty", "contemporary-setting"] },
  12911: { vibes: { prose_craft: 7, prose_style: 6, warmth: 3, intensity: 3, pace: 3, moral_complexity: 6, fabulism: 3, emotional_register: 3, interiority: 8, tone: 3, difficulty: 6 }, tags: ["literary-fiction", "translated-from", "female-protagonist", "korean-setting", "dreamlike", "nonlinear", "experimental-form"] },
  12912: { vibes: { prose_craft: 7, prose_style: 6, warmth: 3, intensity: 3, pace: 3, moral_complexity: 6, fabulism: 2, emotional_register: 3, interiority: 8, tone: 3, difficulty: 6 }, tags: ["literary-fiction", "translated-from", "female-protagonist", "korean-setting", "german-setting", "music", "immigrant-protagonist", "meditative"] },
  12913: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 3, emotional_register: 4, interiority: 6, tone: 4, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "korean-setting", "urban", "friendship", "class", "magical-realism", "novella-length"] },
  12914: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 3, emotional_register: 4, interiority: 6, tone: 4, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "korean-setting", "contemporary-setting", "absurdist", "satirical"] },
  12915: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 3, emotional_register: 4, interiority: 6, tone: 4, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "korean-setting", "magical-realism", "music", "fairy-tale-retelling", "novella-length"] },
  12916: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 3, pace: 5, moral_complexity: 5, fabulism: 2, emotional_register: 5, interiority: 5, tone: 5, difficulty: 4 }, tags: ["vignettes", "translated-from", "korean-setting", "contemporary-setting", "absurdist", "food-writing"] },
  12917: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "male-protagonist", "korean-setting", "artist-protagonist", "poet", "political-intrigue", "19th-century"] },
  12918: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 4, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "korean-setting", "coming-of-age", "authoritarian", "school-setting", "political-allegory", "novella-length"] },
  // Caribbean
  12919: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 2, emotional_register: 4, interiority: 6, tone: 4, difficulty: 5 }, tags: ["literary-fiction", "caribbean-setting", "Black-protagonist", "community", "religious", "colonial-era", "resistance", "oral-tradition"] },
  12920: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "caribbean-setting", "Black-protagonist", "ensemble-cast", "post-colonial", "political-intrigue", "community", "multi-pov"] },
  12921: { vibes: { prose_craft: 7, prose_style: 6, warmth: 6, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 2, emotional_register: 4, interiority: 6, tone: 4, difficulty: 5 }, tags: ["literary-fiction", "caribbean-setting", "Black-protagonist", "community", "urban", "working-class", "carnival", "dance"] },
  12922: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 5, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "african-setting", "Black-protagonist", "pre-colonial", "multigenerational", "empire", "slavery", "family-saga", "doorstopper", "translated-from"] },
  12923: { vibes: { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 6, pace: 5, moral_complexity: 8, fabulism: 3, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "Black-protagonist", "female-protagonist", "witch-trials", "colonial-era", "race", "feminism", "slavery", "translated-from"] },
  12924: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 3, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "caribbean-setting", "ensemble-cast", "community", "multi-pov", "mystery", "rural", "translated-from"] },
  12925: { vibes: { prose_craft: 9, prose_style: 8, warmth: 5, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 3, emotional_register: 4, interiority: 6, tone: 4, difficulty: 7 }, tags: ["literary-fiction", "translated-from", "caribbean-setting", "multigenerational", "community", "urban", "oral-tradition", "creole", "doorstopper", "lyrical-prose", "magical-realism", "post-colonial"] },
  12926: { vibes: { prose_craft: 8, prose_style: 7, warmth: 5, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 3, emotional_register: 5, interiority: 5, tone: 6, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "caribbean-setting", "male-protagonist", "oral-tradition", "mystery", "community", "witty-prose"] },

  // Olivia Laing — Crudo
  12845: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 3, pace: 5, moral_complexity: 5, fabulism: 2, emotional_register: 4, interiority: 7, tone: 4, difficulty: 5 }, tags: ["autofiction", "female-protagonist", "writer-protagonist", "contemporary-setting", "marriage", "british-setting", "political-anxiety", "experimental-form", "novella-length"] },
};

const merged = { ...existing, ...batch };
fs.writeFileSync(SIDECAR, JSON.stringify(merged, null, 2));

const before = Object.keys(existing).length;
const after = Object.keys(merged).length;
console.log("Before:", before, "| Added:", Object.keys(batch).length, "| After:", after);
