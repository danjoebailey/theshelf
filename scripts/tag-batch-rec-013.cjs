const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const existing = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));

const batch = {
  // James Thurber — classic American literary humorist
  12424: { vibes: { prose_craft: 7, prose_style: 4, warmth: 6, intensity: 2, pace: 5, moral_complexity: 5, fabulism: 4, emotional_register: 6, interiority: 4, tone: 9, difficulty: 3 }, tags: ["vignettes", "satirical", "fabulism", "absurdist", "witty-prose", "american-setting", "comic-novel", "novella-length"] },

  // Mat Johnson — satirical literary fiction
  12448: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 4, pace: 6, moral_complexity: 7, fabulism: 5, emotional_register: 4, interiority: 5, tone: 7, difficulty: 4 }, tags: ["satirical", "race", "Black-protagonist", "male-protagonist", "adventure", "antarctic-setting", "literary-fiction", "absurdist", "retelling"] },
  12449: { vibes: { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 3, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 5, interiority: 6, tone: 6, difficulty: 4 }, tags: ["literary-fiction", "race", "identity", "male-protagonist", "suburban", "contemporary-setting", "family", "mixed-race"] },

  // Joyce Carol Oates — We Were the Mulvaneys
  12512: { vibes: { prose_craft: 7, prose_style: 6, warmth: 6, intensity: 6, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "family-saga", "multi-pov", "sexual-violence", "decline", "suburban", "american-setting", "20th-century", "working-class"] },

  // François Mauriac — French Catholic novelist, Nobel
  12707: { vibes: { prose_craft: 8, prose_style: 6, warmth: 3, intensity: 5, pace: 5, moral_complexity: 8, fabulism: 1, emotional_register: 3, interiority: 8, tone: 2, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "female-protagonist", "french-setting", "marriage", "faith-and-doubt", "bourgeois", "rural", "restrained-prose"] },
  12708: { vibes: { prose_craft: 8, prose_style: 6, warmth: 2, intensity: 4, pace: 4, moral_complexity: 8, fabulism: 1, emotional_register: 2, interiority: 8, tone: 2, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "french-setting", "family", "faith-and-doubt", "aging", "greed", "domestic"] },
  12709: { vibes: { prose_craft: 8, prose_style: 6, warmth: 3, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 2, interiority: 8, tone: 2, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "french-setting", "obsession", "unrequited-love", "bourgeois"] },

  // Jean Giono — French pastoral, nature writing
  12711: { vibes: { prose_craft: 7, prose_style: 5, warmth: 9, intensity: 1, pace: 3, moral_complexity: 4, fabulism: 2, emotional_register: 8, interiority: 5, tone: 5, difficulty: 3 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "pastoral", "rural", "french-setting", "ecological", "novella-length", "hopeful", "meditative"] },
  12712: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 5, pace: 4, moral_complexity: 6, fabulism: 3, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "rural", "french-setting", "pastoral", "community", "atmospheric", "lyrical-prose"] },

  // Jean Echenoz — French minimalist literary fiction
  12713: { vibes: { prose_craft: 7, prose_style: 4, warmth: 3, intensity: 2, pace: 5, moral_complexity: 5, fabulism: 1, emotional_register: 3, interiority: 5, tone: 5, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "french-setting", "restrained-prose", "minimalism", "arctic-setting", "mystery"] },
  12715: { vibes: { prose_craft: 7, prose_style: 4, warmth: 3, intensity: 2, pace: 5, moral_complexity: 5, fabulism: 1, emotional_register: 3, interiority: 5, tone: 5, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "french-setting", "minimalism", "restrained-prose", "urban"] },

  // Antoine Volodine — French post-exotic fiction
  12716: { vibes: { prose_craft: 8, prose_style: 7, warmth: 2, intensity: 5, pace: 3, moral_complexity: 8, fabulism: 7, emotional_register: 2, interiority: 7, tone: 2, difficulty: 8 }, tags: ["experimental-form", "translated-from", "dystopian", "post-apocalyptic", "surreal", "fragmentary-prose", "political-sf", "ensemble-cast"] },
  12717: { vibes: { prose_craft: 8, prose_style: 7, warmth: 2, intensity: 4, pace: 3, moral_complexity: 8, fabulism: 6, emotional_register: 2, interiority: 7, tone: 2, difficulty: 8 }, tags: ["experimental-form", "translated-from", "writer-protagonist", "metafiction", "surreal", "political-sf"] },

  // Pierre Michon — Small Lives (French literary miniatures)
  12719: { vibes: { prose_craft: 9, prose_style: 7, warmth: 5, intensity: 3, pace: 3, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 6 }, tags: ["literary-fiction", "translated-from", "vignettes", "rural", "french-setting", "working-class", "lyrical-prose", "biography", "memory", "novella-length"] },

  // Claude Simon — Nobel laureate, nouveau roman
  12722: { vibes: { prose_craft: 10, prose_style: 10, warmth: 2, intensity: 5, pace: 2, moral_complexity: 7, fabulism: 2, emotional_register: 2, interiority: 8, tone: 2, difficulty: 10 }, tags: ["modernist", "translated-from", "ww2-era", "war-trauma", "nonlinear", "stream-of-consciousness", "dense-prose", "experimental-form", "memory", "male-protagonist"] },
  12723: { vibes: { prose_craft: 10, prose_style: 10, warmth: 2, intensity: 5, pace: 2, moral_complexity: 7, fabulism: 2, emotional_register: 2, interiority: 8, tone: 2, difficulty: 10 }, tags: ["modernist", "translated-from", "war", "nonlinear", "stream-of-consciousness", "dense-prose", "experimental-form", "memory", "multi-generational"] },
  12724: { vibes: { prose_craft: 10, prose_style: 9, warmth: 2, intensity: 4, pace: 2, moral_complexity: 6, fabulism: 2, emotional_register: 2, interiority: 7, tone: 2, difficulty: 10 }, tags: ["modernist", "translated-from", "experimental-form", "nonlinear", "vignettes", "dense-prose", "stream-of-consciousness"] },

  // Nathalie Sarraute — nouveau roman, psychological
  12725: { vibes: { prose_craft: 9, prose_style: 6, warmth: 2, intensity: 2, pace: 2, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 10, tone: 2, difficulty: 7 }, tags: ["modernist", "translated-from", "experimental-form", "vignettes", "novella-length", "psychological", "domestic", "stream-of-consciousness"] },
  12726: { vibes: { prose_craft: 9, prose_style: 6, warmth: 2, intensity: 3, pace: 3, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 10, tone: 2, difficulty: 7 }, tags: ["modernist", "translated-from", "ensemble-cast", "domestic", "bourgeois", "psychological", "stream-of-consciousness"] },
  12727: { vibes: { prose_craft: 8, prose_style: 6, warmth: 3, intensity: 2, pace: 3, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 9, tone: 2, difficulty: 7 }, tags: ["modernist", "translated-from", "male-protagonist", "psychological", "domestic", "stream-of-consciousness", "frame-story"] },

  // Alain Robbe-Grillet — nouveau roman master
  12728: { vibes: { prose_craft: 9, prose_style: 6, warmth: 1, intensity: 3, pace: 2, moral_complexity: 7, fabulism: 2, emotional_register: 2, interiority: 8, tone: 2, difficulty: 9 }, tags: ["modernist", "translated-from", "experimental-form", "obsession", "domestic", "colonial-era", "plantation-setting", "jealousy", "restrained-prose"] },
  12729: { vibes: { prose_craft: 9, prose_style: 6, warmth: 1, intensity: 6, pace: 4, moral_complexity: 8, fabulism: 2, emotional_register: 2, interiority: 7, tone: 2, difficulty: 8 }, tags: ["modernist", "translated-from", "experimental-form", "male-protagonist", "serial-killer", "island-setting", "restrained-prose", "unreliable-narrator"] },
  12730: { vibes: { prose_craft: 9, prose_style: 6, warmth: 1, intensity: 3, pace: 2, moral_complexity: 6, fabulism: 3, emotional_register: 2, interiority: 7, tone: 2, difficulty: 9 }, tags: ["modernist", "translated-from", "experimental-form", "urban", "nonlinear", "male-protagonist", "restrained-prose", "labyrinthine"] },

  // Michel Butor — nouveau roman
  12731: { vibes: { prose_craft: 8, prose_style: 6, warmth: 2, intensity: 2, pace: 2, moral_complexity: 6, fabulism: 2, emotional_register: 3, interiority: 7, tone: 2, difficulty: 7 }, tags: ["modernist", "translated-from", "experimental-form", "urban", "british-setting", "mystery", "nonlinear", "second-person"] },
  12732: { vibes: { prose_craft: 8, prose_style: 6, warmth: 2, intensity: 2, pace: 3, moral_complexity: 6, fabulism: 2, emotional_register: 3, interiority: 7, tone: 2, difficulty: 7 }, tags: ["modernist", "translated-from", "experimental-form", "male-protagonist", "french-setting", "second-person", "train-setting"] },

  // Raymond Queneau — French avant-garde, comic
  12733: { vibes: { prose_craft: 8, prose_style: 5, warmth: 6, intensity: 2, pace: 7, moral_complexity: 4, fabulism: 2, emotional_register: 7, interiority: 4, tone: 9, difficulty: 4 }, tags: ["comic-novel", "translated-from", "female-protagonist", "child-protagonist", "french-setting", "urban", "absurdist", "witty-prose", "novella-length"] },
  12734: { vibes: { prose_craft: 9, prose_style: 6, warmth: 4, intensity: 1, pace: 5, moral_complexity: 4, fabulism: 3, emotional_register: 5, interiority: 3, tone: 9, difficulty: 5 }, tags: ["experimental-form", "translated-from", "metafiction", "vignettes", "absurdist", "witty-prose", "linguistic-play"] },
  12735: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 2, pace: 5, moral_complexity: 4, fabulism: 2, emotional_register: 5, interiority: 5, tone: 7, difficulty: 4 }, tags: ["comic-novel", "translated-from", "male-protagonist", "french-setting", "absurdist", "whimsical", "domestic"] },

  // Boris Vian — French surrealist, jazz-era
  12736: { vibes: { prose_craft: 8, prose_style: 7, warmth: 6, intensity: 4, pace: 5, moral_complexity: 5, fabulism: 7, emotional_register: 3, interiority: 6, tone: 6, difficulty: 5 }, tags: ["fabulism", "translated-from", "romance-subplot", "surreal", "french-setting", "jazz", "lyrical-prose", "dreamlike", "illness", "whimsical"] },
  12737: { vibes: { prose_craft: 7, prose_style: 7, warmth: 3, intensity: 5, pace: 4, moral_complexity: 6, fabulism: 7, emotional_register: 2, interiority: 5, tone: 4, difficulty: 5 }, tags: ["fabulism", "translated-from", "surreal", "french-setting", "violence", "absurdist", "gothic-atmosphere"] },
  12738: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 4, pace: 4, moral_complexity: 5, fabulism: 6, emotional_register: 3, interiority: 6, tone: 5, difficulty: 5 }, tags: ["fabulism", "translated-from", "surreal", "french-setting", "dreamlike", "absurdist"] },

  // Carlo Emilio Gadda — Italian experimental
  12743: { vibes: { prose_craft: 9, prose_style: 9, warmth: 3, intensity: 4, pace: 2, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 8, tone: 4, difficulty: 9 }, tags: ["modernist", "translated-from", "italian-setting", "experimental-form", "baroque-prose", "dense-prose", "family", "grief", "digressive"] },

  // Tommaso Landolfi — Italian surrealist
  12744: { vibes: { prose_craft: 8, prose_style: 7, warmth: 3, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 6, emotional_register: 3, interiority: 6, tone: 5, difficulty: 6 }, tags: ["vignettes", "translated-from", "surreal", "fabulism", "gothic-atmosphere", "italian-setting", "absurdist"] },
  12745: { vibes: { prose_craft: 8, prose_style: 7, warmth: 3, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 6, emotional_register: 3, interiority: 6, tone: 5, difficulty: 6 }, tags: ["vignettes", "translated-from", "surreal", "fabulism", "gothic-atmosphere", "italian-setting"] },

  // Wolfgang Koeppen — German postwar trilogy
  12752: { vibes: { prose_craft: 8, prose_style: 7, warmth: 3, intensity: 5, pace: 4, moral_complexity: 8, fabulism: 2, emotional_register: 3, interiority: 7, tone: 3, difficulty: 7 }, tags: ["modernist", "translated-from", "german-setting", "post-war-setting", "urban", "ensemble-cast", "stream-of-consciousness", "political-intrigue"] },
  12753: { vibes: { prose_craft: 8, prose_style: 7, warmth: 3, intensity: 5, pace: 4, moral_complexity: 8, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 7 }, tags: ["modernist", "translated-from", "german-setting", "post-war-setting", "political-intrigue", "satirical", "urban", "cold-war-era"] },
  12754: { vibes: { prose_craft: 8, prose_style: 7, warmth: 2, intensity: 5, pace: 4, moral_complexity: 9, fabulism: 1, emotional_register: 2, interiority: 7, tone: 2, difficulty: 7 }, tags: ["modernist", "translated-from", "german-setting", "post-war-setting", "ww2-era", "guilt", "family", "italian-setting", "ensemble-cast"] },

  // Uwe Johnson — German literary fiction
  12755: { vibes: { prose_craft: 9, prose_style: 8, warmth: 4, intensity: 4, pace: 2, moral_complexity: 8, fabulism: 1, emotional_register: 3, interiority: 8, tone: 3, difficulty: 9 }, tags: ["literary-fiction", "translated-from", "german-setting", "new-york-setting", "female-protagonist", "dual-timeline", "cold-war-era", "dense-prose", "doorstopper", "memory", "political-intrigue"] },
  12756: { vibes: { prose_craft: 9, prose_style: 7, warmth: 3, intensity: 4, pace: 3, moral_complexity: 8, fabulism: 1, emotional_register: 3, interiority: 8, tone: 3, difficulty: 8 }, tags: ["literary-fiction", "translated-from", "german-setting", "cold-war-era", "experimental-form", "multi-pov", "political-intrigue"] },
  12757: { vibes: { prose_craft: 8, prose_style: 7, warmth: 3, intensity: 3, pace: 3, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 7 }, tags: ["literary-fiction", "translated-from", "german-setting", "cold-war-era", "metafiction", "identity"] },

  // Arno Schmidt — German experimental maximalism
  12758: { vibes: { prose_craft: 10, prose_style: 10, warmth: 2, intensity: 4, pace: 1, moral_complexity: 7, fabulism: 4, emotional_register: 3, interiority: 8, tone: 4, difficulty: 10 }, tags: ["experimental-form", "translated-from", "dense-prose", "maximalism", "doorstopper", "sexual-content", "multilingual", "typography-driven", "dream-logic"] },
  12759: { vibes: { prose_craft: 9, prose_style: 8, warmth: 3, intensity: 3, pace: 2, moral_complexity: 6, fabulism: 2, emotional_register: 3, interiority: 7, tone: 4, difficulty: 8 }, tags: ["literary-fiction", "translated-from", "german-setting", "post-war-setting", "experimental-form", "dense-prose"] },

  // Wolfgang Hilbig — East German literary
  12760: { vibes: { prose_craft: 8, prose_style: 7, warmth: 2, intensity: 5, pace: 3, moral_complexity: 7, fabulism: 2, emotional_register: 2, interiority: 8, tone: 2, difficulty: 7 }, tags: ["literary-fiction", "translated-from", "german-setting", "working-class", "industrial", "male-protagonist", "alienation", "communist-era", "dense-prose"] },
  12761: { vibes: { prose_craft: 8, prose_style: 7, warmth: 2, intensity: 4, pace: 3, moral_complexity: 7, fabulism: 2, emotional_register: 2, interiority: 8, tone: 2, difficulty: 7 }, tags: ["literary-fiction", "translated-from", "german-setting", "communist-era", "gender", "dense-prose"] },
  12762: { vibes: { prose_craft: 8, prose_style: 7, warmth: 2, intensity: 4, pace: 3, moral_complexity: 7, fabulism: 2, emotional_register: 2, interiority: 8, tone: 2, difficulty: 7 }, tags: ["vignettes", "translated-from", "german-setting", "communist-era", "working-class", "memory", "dense-prose"] },

  // Mike McCormack — Solar Bones (single-sentence Irish novel)
  12765: { vibes: { prose_craft: 9, prose_style: 8, warmth: 6, intensity: 4, pace: 3, moral_complexity: 6, fabulism: 3, emotional_register: 4, interiority: 9, tone: 3, difficulty: 7 }, tags: ["literary-fiction", "experimental-form", "stream-of-consciousness", "male-protagonist", "irish-setting", "rural", "family", "memory", "single-sentence", "domestic", "community"] },

  // Mohammed Hanif — Pakistani satirical fiction
  12768: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 6, pace: 7, moral_complexity: 8, fabulism: 3, emotional_register: 3, interiority: 5, tone: 7, difficulty: 4 }, tags: ["satirical", "translated-from", "pakistani-setting", "political-intrigue", "military", "conspiracy", "male-protagonist", "dark-comedy", "absurdist"] },
  12769: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 6, pace: 6, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 6, tone: 5, difficulty: 4 }, tags: ["literary-fiction", "pakistani-setting", "female-protagonist", "hospital-setting", "class", "violence", "dark-comedy"] },
  12770: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 3, emotional_register: 3, interiority: 5, tone: 6, difficulty: 4 }, tags: ["satirical", "pakistani-setting", "war", "drone-warfare", "multi-pov", "absurdist", "dark-comedy"] },

  // Anne Michaels — Fugitive Pieces (Canadian lyrical literary)
  12771: { vibes: { prose_craft: 9, prose_style: 7, warmth: 5, intensity: 5, pace: 2, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 9, tone: 3, difficulty: 6 }, tags: ["literary-fiction", "Holocaust", "male-protagonist", "canadian-setting", "greek-setting", "lyrical-prose", "grief", "memory", "poetry-like", "dual-timeline"] },

  // Alejandro Zambra — Chilean literary minimalism
  12787: { vibes: { prose_craft: 8, prose_style: 4, warmth: 5, intensity: 2, pace: 5, moral_complexity: 6, fabulism: 2, emotional_register: 4, interiority: 7, tone: 4, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "chilean-setting", "minimalism", "romance-subplot", "novella-length", "metafiction", "writer-protagonist"] },
  12788: { vibes: { prose_craft: 8, prose_style: 4, warmth: 4, intensity: 2, pace: 5, moral_complexity: 6, fabulism: 2, emotional_register: 4, interiority: 6, tone: 4, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "experimental-form", "chilean-setting", "multiple-choice-format", "identity", "political-intrigue"] },
  12789: { vibes: { prose_craft: 8, prose_style: 5, warmth: 6, intensity: 2, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 5, interiority: 6, tone: 5, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "chilean-setting", "fatherhood", "writer-protagonist", "contemporary-setting", "family"] },
  12790: { vibes: { prose_craft: 8, prose_style: 4, warmth: 5, intensity: 3, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 7, tone: 4, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "chilean-setting", "coming-of-age", "memory", "dictatorship", "novella-length"] },

  // Burhan Sönmez — Turkish literary fiction
  12810: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 7, pace: 4, moral_complexity: 8, fabulism: 3, emotional_register: 2, interiority: 8, tone: 2, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "turkish-setting", "prison-setting", "torture", "political-intrigue", "ensemble-cast"] },
  12811: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 3, emotional_register: 3, interiority: 8, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "istanbul-setting", "memory", "identity", "dreamlike", "amnesia"] },
  12812: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 3, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "dual-timeline", "turkish-setting", "architectural", "historical-fiction", "memory"] },

  // Yu Hua — Brothers (major Chinese literary)
  12814: { vibes: { prose_craft: 8, prose_style: 5, warmth: 5, intensity: 7, pace: 6, moral_complexity: 8, fabulism: 2, emotional_register: 3, interiority: 6, tone: 4, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "chinese-setting", "family-saga", "sibling-bond", "political-intrigue", "cultural-revolution", "doorstopper", "satirical", "violence"] },

  // Adam Haslett — American literary fiction
  12802: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["vignettes", "literary-fiction", "ensemble-cast", "mental-illness", "loneliness", "domestic", "american-setting", "contemporary-setting"] },
  12803: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 4, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "male-protagonist", "financial", "new-england-setting", "class", "contemporary-setting", "capitalism"] },
  12804: { vibes: { prose_craft: 8, prose_style: 5, warmth: 5, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 2, interiority: 8, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "family-saga", "multi-pov", "mental-illness", "grief", "contemporary-setting", "father-son", "domestic"] },

  // Namwali Serpell — Zambian literary fiction
  12808: { vibes: { prose_craft: 8, prose_style: 7, warmth: 5, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 4, emotional_register: 4, interiority: 6, tone: 4, difficulty: 6 }, tags: ["literary-fiction", "african-setting", "zambian-setting", "multigenerational", "ensemble-cast", "colonial-era", "post-colonial", "doorstopper", "magical-realism", "family-saga"] },
  12809: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 3, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "female-protagonist", "grief", "loss", "identity", "dreamlike", "contemporary-setting"] },

  // Ayana Mathis — The Twelve Tribes of Hattie
  12807: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "Black-protagonist", "female-protagonist", "family-saga", "multigenerational", "philadelphia-setting", "migration", "20th-century", "vignettes"] },
};

const merged = { ...existing, ...batch };
fs.writeFileSync(SIDECAR, JSON.stringify(merged, null, 2));

const before = Object.keys(existing).length;
const after = Object.keys(merged).length;
console.log("Before:", before, "| Added:", Object.keys(batch).length, "| After:", after);
