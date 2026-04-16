const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const existing = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));

const batch = {
  // Emmanuel Carrère — French nonfiction/autofiction master
  13153: { vibes: { prose_craft: 8, prose_style: 5, warmth: 3, intensity: 7, pace: 6, moral_complexity: 9, fabulism: 0, emotional_register: 2, interiority: 7, tone: 3, difficulty: 5 }, tags: ["narrative-nonfiction", "translated-from", "french-setting", "male-protagonist", "true-crime", "identity", "fraud", "family", "deeply-researched"] },
  13154: { vibes: { prose_craft: 8, prose_style: 5, warmth: 4, intensity: 5, pace: 6, moral_complexity: 8, fabulism: 0, emotional_register: 4, interiority: 6, tone: 4, difficulty: 5 }, tags: ["biography", "translated-from", "russian-setting", "male-protagonist", "political-intrigue", "adventure", "20th-century", "picaresque"] },
  13155: { vibes: { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 0, emotional_register: 4, interiority: 7, tone: 4, difficulty: 5 }, tags: ["narrative-nonfiction", "translated-from", "religious", "faith-and-doubt", "biblical", "autofiction", "personal-essay", "christian-origins"] },
  13156: { vibes: { prose_craft: 8, prose_style: 5, warmth: 7, intensity: 5, pace: 4, moral_complexity: 6, fabulism: 0, emotional_register: 3, interiority: 7, tone: 3, difficulty: 4 }, tags: ["narrative-nonfiction", "translated-from", "autofiction", "illness", "grief", "family", "domestic", "personal-essay", "empathy"] },

  // Laurent Binet — HHhH (WWII literary thriller)
  13160: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 7, pace: 6, moral_complexity: 8, fabulism: 0, emotional_register: 3, interiority: 6, tone: 4, difficulty: 4 }, tags: ["historical-fiction", "translated-from", "ww2-era", "czech-setting", "assassination", "metafiction", "resistance", "heydrich", "deeply-researched", "dual-timeline"] },
  13162: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 4, pace: 5, moral_complexity: 7, fabulism: 4, emotional_register: 4, interiority: 5, tone: 5, difficulty: 4 }, tags: ["alternate-history-sf", "translated-from", "colonial-era", "multi-pov", "satirical", "american-setting", "european-setting", "revisionist"] },

  // Éric Vuillard — Prix Goncourt microhistory
  13174: { vibes: { prose_craft: 8, prose_style: 6, warmth: 3, intensity: 5, pace: 6, moral_complexity: 8, fabulism: 0, emotional_register: 3, interiority: 5, tone: 3, difficulty: 4 }, tags: ["narrative-nonfiction", "translated-from", "ww2-era", "german-setting", "political-intrigue", "novella-length", "deeply-researched", "power", "complicity"] },
  13175: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 5, pace: 6, moral_complexity: 7, fabulism: 0, emotional_register: 3, interiority: 5, tone: 3, difficulty: 4 }, tags: ["narrative-nonfiction", "translated-from", "german-setting", "16th-century", "rebellion", "class", "religious", "novella-length"] },

  // Daniel Kehlmann — German literary fiction
  13195: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 3, pace: 5, moral_complexity: 6, fabulism: 2, emotional_register: 5, interiority: 6, tone: 6, difficulty: 4 }, tags: ["historical-fiction", "translated-from", "german-setting", "dual-pov", "science", "mathematics", "exploration", "19th-century", "witty-prose", "biographical-fiction"] },
  13196: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 3, emotional_register: 4, interiority: 6, tone: 5, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "german-setting", "male-protagonist", "trickster", "30-years-war", "picaresque", "17th-century", "war"] },

  // Sofi Oksanen — Finnish-Estonian literary
  13347: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 7, pace: 5, moral_complexity: 8, fabulism: 1, emotional_register: 2, interiority: 7, tone: 2, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "estonian-setting", "female-protagonist", "dual-timeline", "ww2-era", "soviet-occupation", "sexual-violence", "resistance", "domestic"] },
  13348: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 6, pace: 5, moral_complexity: 8, fabulism: 1, emotional_register: 3, interiority: 6, tone: 2, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "estonian-setting", "multi-pov", "ww2-era", "soviet-occupation", "collaboration", "identity", "dual-timeline"] },

  // Väinö Linna — Finnish classics
  13349: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 7, pace: 6, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 4 }, tags: ["historical-fiction", "translated-from", "finnish-setting", "ensemble-cast", "ww2-era", "war", "soldier-protagonist", "military", "working-class", "brotherhood"] },
  13350: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 4 }, tags: ["historical-fiction", "translated-from", "finnish-setting", "ensemble-cast", "multigenerational", "rural", "working-class", "community", "political-intrigue", "20th-century"] },

  // Per Olov Enquist — Swedish literary
  13148: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 5, pace: 4, moral_complexity: 8, fabulism: 2, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "danish-setting", "male-protagonist", "18th-century", "medical", "court-intrigue", "madness", "power", "biographical-fiction"] },
  13149: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 6, tone: 3, difficulty: 4 }, tags: ["historical-fiction", "translated-from", "french-setting", "female-protagonist", "medical", "biographical-fiction", "science", "disability"] },

  // Vilhelm Moberg — Swedish emigration epic
  13150: { vibes: { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 5, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 6, tone: 3, difficulty: 4 }, tags: ["historical-fiction", "translated-from", "swedish-setting", "american-setting", "ensemble-cast", "immigration", "19th-century", "rural", "family", "working-class"] },
  13151: { vibes: { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 6, tone: 3, difficulty: 4 }, tags: ["historical-fiction", "translated-from", "american-setting", "immigration", "19th-century", "rural", "family", "working-class", "homesteading"] },

  // Hugo Claus — The Sorrow of Belgium
  13124: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 5, pace: 4, moral_complexity: 8, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 6 }, tags: ["historical-fiction", "translated-from", "flemish-setting", "male-protagonist", "child-protagonist", "coming-of-age", "ww2-era", "collaboration", "family", "doorstopper"] },

  // Dutch historical
  13113: { vibes: { prose_craft: 8, prose_style: 5, warmth: 4, intensity: 7, pace: 6, moral_complexity: 8, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "dutch-setting", "male-protagonist", "ww2-era", "child-protagonist", "bombing", "coming-of-age", "war-trauma"] },
  13116: { vibes: { prose_craft: 8, prose_style: 5, warmth: 3, intensity: 6, pace: 5, moral_complexity: 9, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 6 }, tags: ["historical-fiction", "translated-from", "dutch-setting", "male-protagonist", "ww2-era", "identity", "resistance", "unreliable-narrator", "moral-dilemma", "spy"] },
  13121: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 5, pace: 4, moral_complexity: 6, fabulism: 2, emotional_register: 4, interiority: 6, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "dutch-setting", "french-setting", "medieval-setting", "male-protagonist", "political-intrigue", "war", "burgundian", "doorstopper"] },

  // A.L. Kennedy — Day
  13130: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 6, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 2, interiority: 8, tone: 2, difficulty: 6 }, tags: ["historical-fiction", "scottish-setting", "male-protagonist", "ww2-era", "soldier-protagonist", "war-trauma", "memory", "fragmented-prose", "lyrical-prose"] },

  // Friedrich Dürrenmatt — Swiss German literary mystery
  13400: { vibes: { prose_craft: 8, prose_style: 5, warmth: 3, intensity: 5, pace: 5, moral_complexity: 9, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-mystery", "translated-from", "swiss-setting", "male-protagonist", "police-procedural", "child-murder", "obsession", "philosophical", "anti-detective", "novella-length"] },
  13401: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 4, pace: 6, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 4, difficulty: 4 }, tags: ["literary-mystery", "translated-from", "swiss-setting", "male-protagonist", "series-detective", "political-intrigue", "novella-length"] },
  13402: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 4, pace: 6, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["literary-mystery", "translated-from", "swiss-setting", "male-protagonist", "hospital-setting", "conspiracy", "novella-length"] },

  // Icelandic historical
  13341: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 4, pace: 3, moral_complexity: 6, fabulism: 5, emotional_register: 4, interiority: 7, tone: 4, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "icelandic-setting", "male-protagonist", "17th-century", "naturalist", "fabulism", "lyrical-prose", "island-setting"] },
  13342: { vibes: { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "icelandic-setting", "male-protagonist", "coming-of-age", "fishing-community", "early-20th-century", "lyrical-prose", "friendship", "grief"] },
  13343: { vibes: { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "icelandic-setting", "ensemble-cast", "arctic-setting", "survival", "early-20th-century", "lyrical-prose"] },

  // Nino Haratischvili — The Eighth Life (Georgian epic)
  13364: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 6, pace: 5, moral_complexity: 8, fabulism: 2, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "georgian-setting", "russian-setting", "multigenerational", "family-saga", "20th-century", "doorstopper", "ensemble-cast", "political-intrigue", "war", "chocolate"] },

  // African historical
  13305: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 6, pace: 5, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 5, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "ethiopian-setting", "female-protagonist", "ww2-era", "war", "resistance", "ensemble-cast", "multi-pov"] },
  13306: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 6, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["historical-fiction", "ethiopian-setting", "ensemble-cast", "revolution", "political-intrigue", "family", "violence", "20th-century"] },
  13303: { vibes: { prose_craft: 7, prose_style: 6, warmth: 3, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 2, emotional_register: 2, interiority: 6, tone: 2, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "african-setting", "ensemble-cast", "slavery", "pre-colonial", "community", "family-saga", "violence"] },

  // Caryl Phillips — historical
  13250: { vibes: { prose_craft: 8, prose_style: 5, warmth: 4, intensity: 5, pace: 4, moral_complexity: 8, fabulism: 1, emotional_register: 2, interiority: 7, tone: 2, difficulty: 5 }, tags: ["historical-fiction", "multi-pov", "Black-protagonist", "slavery", "atlantic-setting", "multi-century", "epistolary", "race", "exile", "lyrical-prose"] },
  13251: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 6, pace: 4, moral_complexity: 8, fabulism: 1, emotional_register: 2, interiority: 7, tone: 2, difficulty: 5 }, tags: ["historical-fiction", "caribbean-setting", "Black-protagonist", "slavery", "colonial-era", "race", "oppression", "first-person"] },

  // Canadian historical
  13275: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 6, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "canadian-setting", "multi-pov", "english-french-conflict", "ensemble-cast", "20th-century", "community", "identity", "bilingual"] },
  13277: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 7, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 2, interiority: 7, tone: 2, difficulty: 4 }, tags: ["historical-fiction", "canadian-setting", "male-protagonist", "ww1-era", "soldier-protagonist", "war-trauma", "battlefield", "violence", "memory"] },
  13278: { vibes: { prose_craft: 7, prose_style: 6, warmth: 3, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "canadian-setting", "male-protagonist", "ww2-era", "writer-protagonist", "fascism", "european-setting", "unreliable-narrator", "metafiction"] },
  13280: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 5, pace: 4, moral_complexity: 6, fabulism: 3, emotional_register: 4, interiority: 5, tone: 4, difficulty: 5 }, tags: ["historical-fiction", "canadian-setting", "newfoundland-setting", "multigenerational", "community", "magical-realism", "rural", "family-saga", "oral-tradition"] },

  // Janet Lewis — Wife of Martin Guerre
  13310: { vibes: { prose_craft: 8, prose_style: 5, warmth: 5, intensity: 4, pace: 4, moral_complexity: 8, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 4 }, tags: ["historical-fiction", "french-setting", "female-protagonist", "16th-century", "identity", "marriage", "moral-dilemma", "rural", "restrained-prose", "novella-length"] },

  // Sylvia Townsend Warner — Summer Will Show
  13313: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 7, tone: 4, difficulty: 5 }, tags: ["historical-fiction", "british-setting", "french-setting", "female-protagonist", "queer-protagonist", "1848-revolution", "class", "witty-prose", "feminist"] },

  // Javier Cercas — Soldiers of Salamis
  12886: { vibes: { prose_craft: 8, prose_style: 5, warmth: 5, intensity: 5, pace: 5, moral_complexity: 8, fabulism: 0, emotional_register: 4, interiority: 6, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "spanish-setting", "male-protagonist", "civil-war", "metafiction", "autofiction", "soldier-protagonist", "mercy", "deeply-researched"] },

  // Czech Holocaust literary
  13359: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 6, pace: 4, moral_complexity: 8, fabulism: 1, emotional_register: 2, interiority: 7, tone: 2, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "czech-setting", "male-protagonist", "Jewish-protagonist", "Holocaust", "isolation", "survival", "urban", "restrained-prose"] },
  13360: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 5, tone: 4, difficulty: 4 }, tags: ["historical-fiction", "translated-from", "czech-setting", "ensemble-cast", "Holocaust", "satirical", "music", "resistance"] },

  // Bulgarian historical
  13362: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 6, tone: 4, difficulty: 4 }, tags: ["historical-fiction", "translated-from", "bulgarian-setting", "Jewish-protagonist", "multigenerational", "20th-century", "survival", "identity", "picaresque"] },
  13363: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 5, tone: 3, difficulty: 4 }, tags: ["historical-fiction", "translated-from", "chinese-setting", "Jewish-protagonist", "ww2-era", "refugee-protagonist", "shanghai-setting", "ensemble-cast"] },

  // Leïla Slimani — In the Country of Others
  13166: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 4 }, tags: ["historical-fiction", "translated-from", "moroccan-setting", "female-protagonist", "marriage", "colonial-era", "post-war-setting", "domestic", "feminism", "cultural-clash"] },

  // Classical texts
  13199: { vibes: { prose_craft: 8, prose_style: 6, warmth: 6, intensity: 1, pace: 3, moral_complexity: 4, fabulism: 1, emotional_register: 5, interiority: 7, tone: 6, difficulty: 4 }, tags: ["essay-collection", "translated-from", "japanese-setting", "female-protagonist", "court-life", "domestic", "witty-prose", "10th-century", "diary-form", "observations"] },
  13202: { vibes: { prose_craft: 8, prose_style: 5, warmth: 5, intensity: 1, pace: 2, moral_complexity: 5, fabulism: 1, emotional_register: 5, interiority: 8, tone: 5, difficulty: 4 }, tags: ["essay-collection", "translated-from", "japanese-setting", "male-protagonist", "philosophical", "meditative", "14th-century", "zen", "observations", "mortality"] },
  13203: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 7, pace: 6, moral_complexity: 7, fabulism: 3, emotional_register: 4, interiority: 4, tone: 4, difficulty: 6 }, tags: ["historical-fiction", "translated-from", "chinese-setting", "ensemble-cast", "multi-pov", "war", "political-intrigue", "dynastic", "doorstopper", "classical", "brotherhood"] },

  // Alexander Herzen — My Past and Thoughts (Russian memoir)
  13186: { vibes: { prose_craft: 8, prose_style: 7, warmth: 5, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 0, emotional_register: 4, interiority: 8, tone: 4, difficulty: 7 }, tags: ["literary-memoir", "translated-from", "russian-setting", "male-protagonist", "exile", "political-intrigue", "19th-century", "revolutionary", "doorstopper", "dense-prose", "philosophical"] },

  // Elizabeth Hardwick — Seduction and Betrayal (literary criticism as essay art)
  13319: { vibes: { prose_craft: 9, prose_style: 6, warmth: 4, intensity: 2, pace: 3, moral_complexity: 7, fabulism: 0, emotional_register: 3, interiority: 8, tone: 3, difficulty: 6 }, tags: ["essay-collection", "literary-criticism", "feminist", "female-protagonist", "writer-protagonist", "19th-century", "restrained-prose", "biographical"] },

  // Helen Garner — The First Stone (Australian nonfiction)
  13258: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 5, pace: 5, moral_complexity: 8, fabulism: 0, emotional_register: 3, interiority: 7, tone: 3, difficulty: 4 }, tags: ["narrative-nonfiction", "australian-setting", "feminism", "sexual-harassment", "academia", "moral-dilemma", "autofiction", "controversial"] },

  // Andrzej Stasiuk — On the Road to Babadag (Polish travel-literary)
  12959: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 2, pace: 3, moral_complexity: 5, fabulism: 1, emotional_register: 4, interiority: 7, tone: 4, difficulty: 5 }, tags: ["literary-memoir", "translated-from", "eastern-european-setting", "male-protagonist", "road-trip", "meditative", "landscape", "lyrical-prose", "philosophical"] },

  // Édouard Louis — nonfiction
  13177: { vibes: { prose_craft: 7, prose_style: 4, warmth: 4, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 0, emotional_register: 3, interiority: 7, tone: 3, difficulty: 4 }, tags: ["autofiction", "translated-from", "french-setting", "male-protagonist", "father-son", "working-class", "class", "rural", "violence", "novella-length"] },

  // Katja Petrowskaja — Maybe Esther (Ukrainian-German memoir)
  13449: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-memoir", "translated-from", "ukrainian-setting", "german-setting", "Jewish-protagonist", "Holocaust", "multigenerational", "memory", "identity", "fragmentary-prose"] },

  // Korean-Australian historical
  13262: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 2, emotional_register: 4, interiority: 6, tone: 4, difficulty: 5 }, tags: ["historical-fiction", "australian-setting", "Indigenous-protagonist", "colonial-era", "19th-century", "community", "resistance", "cultural-clash", "lyrical-prose"] },

  // Finnish historical
  13353: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["historical-fiction", "translated-from", "finnish-setting", "dual-timeline", "interwar-setting", "contemporary-setting", "ensemble-cast", "political-intrigue"] },

  // Margaret Walker — Jubilee (African-American historical)
  13284: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 6, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 4 }, tags: ["historical-fiction", "Black-protagonist", "female-protagonist", "slavery", "civil-war", "american-setting", "multigenerational", "community", "survival"] },

  // Various remaining
  13419: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 2, emotional_register: 4, interiority: 7, tone: 4, difficulty: 4 }, tags: ["historical-fiction", "parisian-setting", "male-protagonist", "queer-protagonist", "asian-protagonist", "food-writing", "1920s-setting", "colonial-era", "domestic", "intimate"] },
  13422: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 5, pace: 3, moral_complexity: 8, fabulism: 2, emotional_register: 3, interiority: 6, tone: 3, difficulty: 6 }, tags: ["historical-fiction", "san-francisco-setting", "multi-pov", "ensemble-cast", "asian-protagonist", "civil-rights", "doorstopper", "multi-generational", "experimental-form", "community"] },

  // Greek mystery
  13395: { vibes: { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 5, pace: 6, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 5, tone: 4, difficulty: 3 }, tags: ["police-procedural", "translated-from", "greek-setting", "male-protagonist", "series-detective", "urban", "social-realism", "corruption"] },
  13396: { vibes: { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 5, pace: 6, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 5, tone: 4, difficulty: 3 }, tags: ["police-procedural", "translated-from", "greek-setting", "male-protagonist", "series-detective", "political-intrigue"] },

  // Kjell Eriksson — Swedish mystery
  12826: { vibes: { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 5, pace: 6, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 3 }, tags: ["police-procedural", "translated-from", "swedish-setting", "female-protagonist", "series-detective", "urban", "social-realism"] },
  12827: { vibes: { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 3 }, tags: ["police-procedural", "translated-from", "swedish-setting", "female-protagonist", "series-detective"] },

  // Ukrainian historical
  13291: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 6, pace: 4, moral_complexity: 8, fabulism: 2, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "ukrainian-setting", "dual-timeline", "multi-pov", "ww2-era", "political-intrigue", "ensemble-cast", "secrets", "doorstopper"] },
  13294: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 5, pace: 4, moral_complexity: 6, fabulism: 2, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["historical-fiction", "translated-from", "ukrainian-setting", "female-protagonist", "soviet-era", "rural", "community", "suffering", "lyrical-prose"] },

  // Nigerian historical
  13296: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["historical-fiction", "nigerian-setting", "female-protagonist", "queer-protagonist", "coming-of-age", "biafran-war", "forbidden-love", "identity"] },

  // Alicia Giménez Bartlett — Spanish mystery
  13471: { vibes: { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 5, pace: 6, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 5, tone: 4, difficulty: 3 }, tags: ["police-procedural", "translated-from", "spanish-setting", "female-protagonist", "series-detective", "ensemble-cast", "social-realism"] },
  13472: { vibes: { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 5, pace: 6, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 5, tone: 4, difficulty: 3 }, tags: ["police-procedural", "translated-from", "spanish-setting", "female-protagonist", "series-detective"] },

  // Israeli mystery
  13461: { vibes: { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 5, pace: 6, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 3 }, tags: ["police-procedural", "translated-from", "israeli-setting", "male-protagonist", "series-detective", "missing-person", "urban"] },

  // Iranian historical
  13439: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 4 }, tags: ["historical-fiction", "translated-from", "iranian-setting", "female-protagonist", "domestic", "marriage", "multigenerational", "family-saga", "20th-century", "political-intrigue"] },
  13444: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 5, pace: 3, moral_complexity: 7, fabulism: 3, emotional_register: 3, interiority: 7, tone: 3, difficulty: 6 }, tags: ["historical-fiction", "translated-from", "iranian-setting", "female-protagonist", "multigenerational", "family-saga", "political-intrigue", "mystical", "doorstopper", "20th-century"] },

  // Frank Norris — The Octopus
  13225: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 6, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "american-setting", "california-setting", "ensemble-cast", "capitalism", "labor", "farming", "railroad", "class", "naturalism"] },

  // Ellen Glasgow — Vein of Iron
  13227: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 6, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "american-setting", "virginia-setting", "female-protagonist", "family-saga", "working-class", "depression-era", "resilience"] },

  // Molly Gloss — Hearts of Horses
  12610: { vibes: { prose_craft: 7, prose_style: 5, warmth: 7, intensity: 3, pace: 3, moral_complexity: 5, fabulism: 1, emotional_register: 5, interiority: 6, tone: 4, difficulty: 3 }, tags: ["historical-fiction", "american-setting", "western-setting", "female-protagonist", "horse-culture", "ww1-era", "rural", "community", "quiet-drama", "pastoral"] },

  // Vonda McIntyre — Moon and the Sun
  12545: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 5, emotional_register: 5, interiority: 5, tone: 4, difficulty: 4 }, tags: ["historical-fantasy", "french-setting", "female-protagonist", "court-intrigue", "17th-century", "versailles-setting", "sea-creature", "romance-subplot"] },

  // Elena Poniatowska
  13380: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 2, emotional_register: 4, interiority: 7, tone: 4, difficulty: 4 }, tags: ["biographical-fiction", "translated-from", "mexican-setting", "female-protagonist", "artist-protagonist", "surrealism", "european-setting", "20th-century", "marriage"] },

  // Rosario Castellanos — Book of Lamentations
  13381: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "mexican-setting", "Indigenous-protagonist", "ensemble-cast", "oppression", "class", "colonial-era", "community", "lyrical-prose"] },

  // Israeli historical
  13463: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 2, emotional_register: 4, interiority: 5, tone: 5, difficulty: 4 }, tags: ["historical-fiction", "translated-from", "israeli-setting", "ensemble-cast", "pre-state", "british-mandate", "romance-subplot", "identity", "multi-pov"] },

  // Patrick Deville — French biographical nonfiction
  13167: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 0, emotional_register: 3, interiority: 5, tone: 3, difficulty: 5 }, tags: ["biography", "translated-from", "global-setting", "male-protagonist", "medical", "colonial-era", "adventure", "20th-century"] },
  13168: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 0, emotional_register: 3, interiority: 5, tone: 3, difficulty: 5 }, tags: ["biography", "translated-from", "mexican-setting", "male-protagonist", "revolutionary", "20th-century", "political-intrigue", "adventure"] },

  // Carlo Levi — Words Are Stones
  13109: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 3, pace: 3, moral_complexity: 6, fabulism: 0, emotional_register: 4, interiority: 6, tone: 4, difficulty: 4 }, tags: ["narrative-nonfiction", "translated-from", "sicilian-setting", "personal-essay", "working-class", "poverty", "community", "southern-italy"] },

  // Beppe Fenoglio — Johnny the Partisan
  13104: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 6, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "italian-setting", "male-protagonist", "ww2-era", "resistance", "partisan", "coming-of-age", "war", "violence"] },
};

const merged = { ...existing, ...batch };
fs.writeFileSync(SIDECAR, JSON.stringify(merged, null, 2));

const before = Object.keys(existing).length;
const after = Object.keys(merged).length;
console.log("Before:", before, "| Added:", Object.keys(batch).length, "| After:", after);
