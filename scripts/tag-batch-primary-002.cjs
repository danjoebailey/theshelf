const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const existing = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));

// Helper: apply same vibes to a cluster with minor per-book tweaks
function authorCluster(ids, baseVibes, baseTags, perBook = {}) {
  const result = {};
  for (const id of ids) {
    const override = perBook[id] || {};
    result[id] = {
      vibes: { ...baseVibes, ...(override.vibes || {}) },
      tags: override.tags || baseTags,
    };
  }
  return result;
}

const batch = {
  // Philip Roth — remaining (already have Human Stain, Sabbath's, I Married, American Pastoral, Portnoy's, Ghost Writer, Indignation, Goodbye Columbus)
  ...authorCluster(
    [1336, 1337, 1338, 1340, 1342, 1343, 1344, 1345, 1347, 1348, 1349, 1350, 1373, 1374, 1375, 1376, 1377, 1378, 1379, 4841, 4842],
    { prose_craft: 8, prose_style: 7, warmth: 4, intensity: 5, pace: 5, moral_complexity: 8, fabulism: 1, emotional_register: 3, interiority: 7, tone: 4, difficulty: 6 },
    ["literary-fiction", "male-protagonist", "Jewish-protagonist", "american-setting", "identity", "dense-prose"],
    {
      1340: { vibes: { fabulism: 3, pace: 6 }, tags: ["literary-fiction", "alternate-history-sf", "male-protagonist", "Jewish-protagonist", "american-setting", "political-intrigue", "fascism", "family"] },
      1349: { vibes: { fabulism: 4, tone: 5 }, tags: ["literary-fiction", "male-protagonist", "transformation", "kafka-esque", "novella-length", "satirical", "absurdist"] },
      1374: { vibes: { tone: 7, fabulism: 2 }, tags: ["satirical", "male-protagonist", "political-intrigue", "american-setting", "parody", "dark-humor"] },
      1377: { vibes: { warmth: 6, intensity: 4 }, tags: ["memoir", "male-protagonist", "father-son", "Jewish-protagonist", "grief", "aging", "domestic"] },
      1376: { vibes: { warmth: 5 }, tags: ["autofiction", "male-protagonist", "writer-protagonist", "Jewish-protagonist", "identity", "metafiction"] },
    }
  ),

  // Graham Greene — moral Catholic thrillers + literary
  ...authorCluster(
    [2184, 2185, 2186, 2187, 2188, 2189, 2190, 2191, 2192, 2193, 2194, 3427, 3428, 3429, 3430, 3431, 3432, 3433, 3434, 3435, 3436, 3437, 3438, 10188],
    { prose_craft: 8, prose_style: 5, warmth: 4, intensity: 5, pace: 6, moral_complexity: 8, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 },
    ["literary-fiction", "male-protagonist", "faith-and-doubt", "moral-dilemma", "political-intrigue"],
    {
      2184: { tags: ["literary-fiction", "male-protagonist", "priest-protagonist", "mexican-setting", "faith-and-doubt", "persecution", "alcoholism", "moral-dilemma"] },
      2185: { tags: ["literary-fiction", "male-protagonist", "african-setting", "colonial-era", "faith-and-doubt", "marriage", "guilt", "moral-dilemma"] },
      2186: { vibes: { warmth: 5 }, tags: ["literary-fiction", "male-protagonist", "london-setting", "faith-and-doubt", "adultery", "romance-subplot", "grief", "moral-dilemma"] },
      2187: { vibes: { pace: 5 }, tags: ["literary-fiction", "male-protagonist", "vietnamese-setting", "espionage", "colonial-era", "political-intrigue", "moral-dilemma", "war"] },
      2188: { vibes: { intensity: 7, pace: 7 }, tags: ["literary-thriller", "male-protagonist", "british-setting", "gangster", "catholic", "violence", "moral-dilemma"] },
      2189: { vibes: { pace: 7 }, tags: ["literary-thriller", "male-protagonist", "viennese-setting", "espionage", "post-war-setting", "noir", "novella-length"] },
      2190: { vibes: { tone: 6, pace: 7 }, tags: ["literary-thriller", "male-protagonist", "cuban-setting", "espionage", "satirical", "cold-war-era", "witty-prose"] },
      2194: { vibes: { tone: 6, warmth: 6 }, tags: ["literary-fiction", "male-protagonist", "road-trip", "comedy", "elderly-protagonist", "witty-prose"] },
      3427: { vibes: { pace: 7, intensity: 6 }, tags: ["literary-thriller", "male-protagonist", "london-setting", "ww2-era", "espionage", "paranoia", "atmospheric"] },
    }
  ),

  // Haruki Murakami
  ...authorCluster(
    [889, 890, 891, 892, 893, 894, 2314, 2315, 2316, 3454, 3455, 3456, 3457, 3458, 4846, 4847, 4848, 4849, 9994, 9995],
    { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 5, emotional_register: 3, interiority: 7, tone: 4, difficulty: 4 },
    ["literary-fiction", "translated-from", "japanese-setting", "male-protagonist", "alienation", "loneliness", "surreal", "dreamlike"],
    {
      891: { vibes: { intensity: 5, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "japanese-setting", "male-protagonist", "surreal", "political-intrigue", "violence", "well-setting", "dreamlike", "doorstopper"] },
      892: { vibes: { difficulty: 5 }, tags: ["literary-fiction", "translated-from", "japanese-setting", "multi-pov", "dual-timeline", "surreal", "doorstopper", "cult-horror", "parallel-worlds"] },
      893: { vibes: { fabulism: 7 }, tags: ["literary-fiction", "translated-from", "japanese-setting", "male-protagonist", "first-person", "surreal", "dual-narrative", "cyberpunk", "dreamlike"] },
      894: { vibes: { pace: 5 }, tags: ["literary-fiction", "translated-from", "japanese-setting", "male-protagonist", "first-person", "surreal", "quest", "sheep", "alienation"] },
      3457: { vibes: { fabulism: 0, warmth: 6, tone: 5 }, tags: ["memoir", "translated-from", "japanese-setting", "male-protagonist", "running", "discipline", "personal-essay"] },
      4848: { vibes: { fabulism: 0, intensity: 5 }, tags: ["narrative-nonfiction", "translated-from", "japanese-setting", "terrorism", "cult-horror", "ensemble-cast", "deeply-researched"] },
      9994: { tags: ["vignettes", "translated-from", "japanese-setting", "surreal", "loneliness", "dreamlike", "alienation"] },
      9995: { tags: ["vignettes", "translated-from", "japanese-setting", "surreal", "loneliness", "dreamlike"] },
    }
  ),

  // Don DeLillo
  ...authorCluster(
    [132, 133, 134, 1473, 1474, 1475, 1476, 1477, 1478, 1479, 1480, 1481, 1482, 1483, 3491, 3492, 3493],
    { prose_craft: 8, prose_style: 6, warmth: 3, intensity: 4, pace: 4, moral_complexity: 8, fabulism: 2, emotional_register: 3, interiority: 7, tone: 3, difficulty: 6 },
    ["literary-fiction", "male-protagonist", "american-setting", "alienation", "paranoia", "capitalism", "dense-prose"],
    {
      132: { tags: ["literary-fiction", "male-protagonist", "academia", "campus-novel", "suburban", "toxic-event", "family", "death", "satirical", "american-setting"] },
      133: { vibes: { difficulty: 8 }, tags: ["literary-fiction", "multi-pov", "american-setting", "cold-war-era", "doorstopper", "dense-prose", "baseball", "nuclear", "ensemble-cast", "nonlinear", "maximalism"] },
      134: { vibes: { pace: 5 }, tags: ["literary-fiction", "male-protagonist", "american-setting", "conspiracy", "JFK-assassination", "paranoia", "dense-prose"] },
      1474: { vibes: { pace: 5 }, tags: ["literary-fiction", "male-protagonist", "new-york-setting", "near-future", "capitalism", "technology", "urban", "alienation"] },
      3491: { vibes: { warmth: 4, pace: 3 }, tags: ["literary-fiction", "female-protagonist", "body", "domestic", "novella-length", "restrained-prose"] },
      3492: { vibes: { pace: 3 }, tags: ["literary-fiction", "male-protagonist", "desert-setting", "aging", "mortality", "novella-length", "restrained-prose"] },
      3493: { vibes: { warmth: 3 }, tags: ["literary-fiction", "ensemble-cast", "near-future", "technology-failure", "novella-length", "restrained-prose", "contemporary-setting"] },
    }
  ),

  // Ian McEwan
  ...authorCluster(
    [248, 249, 250, 1484, 1485, 1486, 1487, 1488, 1489, 1490, 1491, 1492, 8872, 8873, 10111, 10112, 10113, 10114],
    { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 4 },
    ["literary-fiction", "british-setting", "domestic", "moral-dilemma"],
    {
      248: { vibes: { craft: 8, intensity: 6 }, tags: ["literary-fiction", "british-setting", "female-protagonist", "ww2-era", "country-house", "class", "coming-of-age", "guilt", "dual-timeline", "metafiction", "doorstopper"] },
      250: { vibes: { warmth: 5 }, tags: ["literary-fiction", "british-setting", "dual-pov", "1960s-setting", "sexuality", "marriage", "class", "novella-length", "restrained-prose"] },
      1486: { vibes: { intensity: 7, warmth: 2 }, tags: ["literary-fiction", "british-setting", "child-protagonist", "domestic", "transgressive", "gothic-atmosphere", "novella-length"] },
      1488: { vibes: { fabulism: 4 }, tags: ["literary-fiction", "british-setting", "near-future", "AI", "love-triangle", "moral-dilemma", "1980s-setting"] },
      1489: { vibes: { fabulism: 2, tone: 5 }, tags: ["literary-fiction", "british-setting", "male-protagonist", "unreliable-narrator", "shakespeare", "novella-length", "witty-prose"] },
      10113: { vibes: { intensity: 7, warmth: 2 }, tags: ["vignettes", "british-setting", "transgressive", "sexuality", "domestic", "uneasy", "short-chapters"] },
    }
  ),

  // William Faulkner (already have Sound and Fury)
  ...authorCluster(
    [575, 576, 577, 1676, 1677, 1678, 3449, 3450, 3451, 3452, 3453, 10204, 10205, 10206, 10207, 10208],
    { prose_craft: 9, prose_style: 8, warmth: 4, intensity: 6, pace: 3, moral_complexity: 9, fabulism: 2, emotional_register: 2, interiority: 7, tone: 2, difficulty: 8 },
    ["literary-fiction", "southern-gothic", "american-setting", "mississippi-setting", "race", "family-saga", "dense-prose"],
    {
      575: { vibes: { pace: 5, tone: 3 }, tags: ["literary-fiction", "southern-gothic", "multi-pov", "family", "death", "rural", "stream-of-consciousness", "grotesque", "experimental-form"] },
      576: { vibes: { difficulty: 9 }, tags: ["literary-fiction", "southern-gothic", "multi-pov", "race", "dynasty", "dense-prose", "nonlinear", "doorstopper", "obsession", "decline"] },
      577: { tags: ["literary-fiction", "southern-gothic", "multi-pov", "race", "identity", "violence", "religion", "outsider-protagonist"] },
      1676: { vibes: { intensity: 8, pace: 6 }, tags: ["literary-fiction", "southern-gothic", "male-protagonist", "violence", "sexual-violence", "transgressive", "noir"] },
      1677: { tags: ["literary-fiction", "southern-gothic", "vignettes", "race", "family-saga", "rural", "multigenerational"] },
      3449: { vibes: { tone: 4 }, tags: ["literary-fiction", "southern-gothic", "male-protagonist", "rural", "picaresque", "class", "working-class"] },
    }
  ),

  // J.M. Coetzee
  ...authorCluster(
    [270, 271, 272, 1641, 1642, 1643, 1644, 3464, 3465, 3466, 3467, 3468, 3469, 8761],
    { prose_craft: 9, prose_style: 4, warmth: 3, intensity: 5, pace: 4, moral_complexity: 9, fabulism: 2, emotional_register: 2, interiority: 8, tone: 2, difficulty: 5 },
    ["literary-fiction", "south-african-setting", "male-protagonist", "restrained-prose", "moral-dilemma"],
    {
      270: { tags: ["literary-fiction", "south-african-setting", "male-protagonist", "academia", "race", "sexual-violence", "post-apartheid", "restrained-prose", "moral-dilemma", "aging"] },
      271: { vibes: { fabulism: 4 }, tags: ["literary-fiction", "male-protagonist", "colonial-allegory", "torture", "oppression", "restrained-prose", "moral-dilemma", "dystopian"] },
      272: { vibes: { fabulism: 3 }, tags: ["literary-fiction", "south-african-setting", "male-protagonist", "survival", "apartheid", "restrained-prose", "quest"] },
      1641: { vibes: { fabulism: 3, tone: 4 }, tags: ["literary-fiction", "female-protagonist", "metafiction", "academia", "philosophical", "animal-rights", "vignettes", "restrained-prose"] },
      1642: { vibes: { fabulism: 3 }, tags: ["literary-fiction", "female-protagonist", "retelling", "metafiction", "island-setting", "robinson-crusoe", "restrained-prose"] },
      1643: { vibes: { fabulism: 5 }, tags: ["literary-fiction", "translated-from-allegory", "male-protagonist", "immigration", "philosophical", "jesus-allegory", "restrained-prose"] },
      3464: { vibes: { warmth: 5 }, tags: ["autofiction", "south-african-setting", "male-protagonist", "child-protagonist", "coming-of-age", "apartheid-era", "restrained-prose"] },
      3465: { vibes: { warmth: 4 }, tags: ["autofiction", "south-african-setting", "male-protagonist", "london-setting", "coming-of-age", "writer-protagonist", "restrained-prose"] },
      3466: { tags: ["autofiction", "south-african-setting", "male-protagonist", "metafiction", "multi-pov", "interviews", "restrained-prose", "aging"] },
    }
  ),

  // John Irving (already have World According to Garp)
  ...authorCluster(
    [320, 321, 1460, 1461, 1462, 1463, 1464, 1465, 3401, 3402, 3403, 3404, 3405],
    { prose_craft: 7, prose_style: 6, warmth: 7, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 5, interiority: 6, tone: 5, difficulty: 4 },
    ["literary-fiction", "american-setting", "new-england-setting", "family", "coming-of-age", "bildungsroman"],
    {
      320: { vibes: { warmth: 8, moral_complexity: 7 }, tags: ["literary-fiction", "male-protagonist", "new-england-setting", "faith-and-doubt", "family", "coming-of-age", "friendship", "baseball", "bildungsroman"] },
      321: { vibes: { moral_complexity: 7, intensity: 6 }, tags: ["literary-fiction", "male-protagonist", "new-england-setting", "orphan-protagonist", "doctor-protagonist", "abortion", "moral-dilemma", "coming-of-age"] },
      1465: { vibes: { moral_complexity: 7 }, tags: ["literary-fiction", "male-protagonist", "queer-protagonist", "wrestling", "coming-of-age", "new-england-setting", "sexuality", "identity"] },
    }
  ),

  // Charles Dickens
  ...authorCluster(
    [82, 83, 84, 85, 86, 3439, 3440, 3441, 3442, 3443, 3444, 3445, 3446, 3447, 3448, 9105],
    { prose_craft: 8, prose_style: 7, warmth: 6, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 5, tone: 5, difficulty: 5 },
    ["literary-fiction", "british-setting", "victorian-setting", "social-panorama", "class", "ensemble-cast"],
    {
      82: { tags: ["literary-fiction", "british-setting", "victorian-setting", "male-protagonist", "coming-of-age", "class", "orphan-protagonist", "first-person", "bildungsroman"] },
      83: { vibes: { intensity: 7, pace: 6 }, tags: ["historical-fiction", "french-setting", "london-setting", "revolution", "dual-timeline", "sacrifice", "violence", "ensemble-cast"] },
      85: { vibes: { difficulty: 7 }, tags: ["literary-fiction", "british-setting", "victorian-setting", "ensemble-cast", "legal-system", "doorstopper", "social-panorama", "class", "mystery"] },
      86: { tags: ["literary-fiction", "british-setting", "victorian-setting", "male-protagonist", "child-protagonist", "orphan-protagonist", "coming-of-age", "poverty", "london-setting"] },
      3439: { vibes: { warmth: 8, tone: 7 }, tags: ["literary-fiction", "british-setting", "victorian-setting", "christmas", "redemption", "ghosts", "novella-length", "warm"] },
      3448: { tags: ["literary-fiction", "british-setting", "victorian-setting", "industrial-setting", "class", "labor", "social-realism"] },
    }
  ),

  // Henry James
  ...authorCluster(
    [233, 234, 235, 1621, 1622, 1623, 1624, 1625, 1626, 1627, 3698, 3699, 10159],
    { prose_craft: 9, prose_style: 8, warmth: 4, intensity: 3, pace: 2, moral_complexity: 8, fabulism: 1, emotional_register: 3, interiority: 9, tone: 3, difficulty: 7 },
    ["literary-fiction", "dense-prose", "psychological", "class", "19th-century"],
    {
      233: { tags: ["literary-fiction", "female-protagonist", "american-protagonist", "european-setting", "marriage", "class", "psychological", "dense-prose", "19th-century", "doorstopper"] },
      234: { vibes: { fabulism: 4, intensity: 5 }, tags: ["supernatural-horror", "british-setting", "country-house", "unreliable-narrator", "child-protagonist", "governess", "ghosts", "novella-length"] },
      235: { tags: ["literary-fiction", "female-protagonist", "london-setting", "illness", "mortality", "class", "marriage", "dense-prose", "19th-century"] },
      1621: { vibes: { difficulty: 5 }, tags: ["literary-fiction", "female-protagonist", "new-york-setting", "19th-century", "class", "marriage", "domestic", "restrained-prose"] },
      1627: { vibes: { difficulty: 4 }, tags: ["literary-fiction", "female-protagonist", "american-protagonist", "italian-setting", "19th-century", "class", "romance-subplot", "novella-length"] },
    }
  ),

  // Margaret Atwood
  ...authorCluster(
    [379, 380, 381, 382, 383, 759, 1709, 1710, 1711, 1712, 4113, 4114, 4115, 4116, 4117, 10300, 10301, 10302, 10303],
    { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 3, emotional_register: 4, interiority: 6, tone: 4, difficulty: 4 },
    ["literary-fiction", "canadian-setting", "female-protagonist", "feminist"],
    {
      379: { vibes: { fabulism: 6, intensity: 7 }, tags: ["dystopian", "female-protagonist", "first-person", "totalitarian", "near-future", "feminism", "oppression", "sexual-violence", "diary-form"] },
      380: { vibes: { fabulism: 7 }, tags: ["dystopian", "male-protagonist", "near-future", "post-apocalyptic", "genetic-engineering", "corporate", "ecological"] },
      381: { vibes: { difficulty: 5 }, tags: ["literary-fiction", "canadian-setting", "female-protagonist", "nonlinear", "family-saga", "nested-narrator", "memory", "dual-timeline"] },
      382: { tags: ["literary-fiction", "canadian-setting", "female-protagonist", "artist-protagonist", "coming-of-age", "memory", "identity"] },
      383: { vibes: { intensity: 6 }, tags: ["historical-fiction", "canadian-setting", "female-protagonist", "19th-century", "prison-setting", "murder", "dual-pov", "mystery", "feminism"] },
      759: { vibes: { fabulism: 6 }, tags: ["dystopian", "female-protagonist", "first-person", "totalitarian", "near-future", "sequel", "resistance", "multi-pov"] },
      4117: { vibes: { fabulism: 5, tone: 5 }, tags: ["mythology-retelling", "female-protagonist", "feminist", "novella-length", "satirical", "odyssey"] },
    }
  ),

  // Alice Munro
  ...authorCluster(
    [7959, 7960, 7961, 7962, 7963, 7964, 7965, 10294, 10295, 10296, 10297, 10298, 10299],
    { prose_craft: 9, prose_style: 5, warmth: 5, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 8, tone: 3, difficulty: 5 },
    ["vignettes", "canadian-setting", "female-protagonist", "domestic", "rural", "memory", "restrained-prose", "marriage"],
    {
      7963: { tags: ["literary-fiction", "canadian-setting", "female-protagonist", "coming-of-age", "rural", "domestic", "bildungsroman", "restrained-prose"] },
    }
  ),

  // John Steinbeck (already have Cannery Row, Of Mice and Men)
  ...authorCluster(
    [322, 323, 1670, 1671, 1672, 1673, 4843, 4844, 4845, 10212, 10213, 10214, 10215, 10216, 10217, 10218],
    { prose_craft: 7, prose_style: 4, warmth: 6, intensity: 4, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 5, tone: 3, difficulty: 4 },
    ["literary-fiction", "american-setting", "california-setting", "working-class"],
    {
      322: { vibes: { intensity: 6, craft: 8 }, tags: ["literary-fiction", "american-setting", "ensemble-cast", "depression-era", "migration", "working-class", "family-saga", "poverty", "doorstopper", "social-realism"] },
      323: { vibes: { warmth: 7, craft: 8 }, tags: ["literary-fiction", "american-setting", "california-setting", "family-saga", "multigenerational", "moral-dilemma", "biblical", "doorstopper", "farming"] },
      1672: { tags: ["literary-fiction", "male-protagonist", "mexican-setting", "poverty", "pearl", "moral-dilemma", "novella-length", "parable"] },
      1673: { vibes: { fabulism: 0, tone: 5 }, tags: ["memoir", "male-protagonist", "american-setting", "road-trip", "dog-companion", "rural", "travel", "witty-prose"] },
    }
  ),

  // Louise Erdrich
  ...authorCluster(
    [672, 673, 674, 1595, 1596, 1597, 1598, 1599, 1600, 3513, 3514, 3515, 3516, 7421],
    { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 2, emotional_register: 4, interiority: 6, tone: 4, difficulty: 5 },
    ["literary-fiction", "Indigenous-protagonist", "american-setting", "north-dakota-setting", "multigenerational", "family-saga", "community"],
    {
      672: { vibes: { warmth: 6, pace: 5 }, tags: ["literary-fiction", "Indigenous-protagonist", "american-setting", "north-dakota-setting", "1950s-setting", "labor", "community", "family", "political-intrigue"] },
      673: { vibes: { intensity: 7, pace: 6 }, tags: ["literary-fiction", "Indigenous-protagonist", "male-protagonist", "american-setting", "north-dakota-setting", "sexual-violence", "legal-thriller", "family", "revenge-plot"] },
      674: { vibes: { warmth: 6 }, tags: ["literary-fiction", "Indigenous-protagonist", "multi-pov", "american-setting", "north-dakota-setting", "multigenerational", "family-saga", "nonlinear", "community", "reservation-setting"] },
    }
  ),

  // Toni Morrison (already have Beloved)
  ...authorCluster(
    [539, 540, 541, 542, 543, 2317, 2318, 2319, 2320, 3479],
    { prose_craft: 10, prose_style: 8, warmth: 5, intensity: 6, pace: 3, moral_complexity: 9, fabulism: 4, emotional_register: 3, interiority: 8, tone: 2, difficulty: 7 },
    ["literary-fiction", "Black-protagonist", "american-setting", "race", "lyrical-prose"],
    {
      539: { tags: ["literary-fiction", "Black-protagonist", "male-protagonist", "american-setting", "family-saga", "quest", "identity", "lyrical-prose", "mythic-fantasy"] },
      540: { vibes: { warmth: 4, difficulty: 5 }, tags: ["literary-fiction", "Black-protagonist", "female-protagonist", "friendship", "domestic", "small-town", "lyrical-prose", "novella-length"] },
      541: { vibes: { intensity: 7 }, tags: ["literary-fiction", "Black-protagonist", "female-protagonist", "coming-of-age", "race", "beauty", "domestic", "lyrical-prose"] },
      542: { vibes: { fabulism: 5 }, tags: ["literary-fiction", "Black-protagonist", "multi-pov", "harlem-setting", "1920s-setting", "jazz", "sexuality", "lyrical-prose"] },
      543: { vibes: { fabulism: 5, intensity: 7 }, tags: ["literary-fiction", "Black-protagonist", "female-protagonist", "utopian", "multi-pov", "race", "community", "violence", "lyrical-prose"] },
    }
  ),

  // Joseph Conrad
  ...authorCluster(
    [7220, 7221, 7222, 7223, 7224, 9966, 9967, 9968, 10156, 10157, 10158],
    { prose_craft: 8, prose_style: 7, warmth: 3, intensity: 5, pace: 4, moral_complexity: 9, fabulism: 1, emotional_register: 3, interiority: 7, tone: 2, difficulty: 6 },
    ["literary-fiction", "male-protagonist", "ocean-setting", "colonialism", "moral-dilemma", "dense-prose"],
    {
      7220: { vibes: { intensity: 7 }, tags: ["literary-fiction", "male-protagonist", "african-setting", "colonialism", "river-setting", "moral-dilemma", "frame-story", "dense-prose", "novella-length"] },
      7221: { tags: ["literary-fiction", "male-protagonist", "ocean-setting", "guilt", "identity", "moral-dilemma", "dense-prose", "frame-story"] },
      7222: { vibes: { difficulty: 7 }, tags: ["literary-fiction", "ensemble-cast", "south-american-setting", "political-intrigue", "colonialism", "revolution", "silver-mine", "doorstopper", "dense-prose"] },
      7223: { vibes: { pace: 5, intensity: 6 }, tags: ["literary-fiction", "male-protagonist", "london-setting", "espionage", "anarchism", "terrorism", "domestic", "political-intrigue"] },
    }
  ),

  // Elizabeth Strout
  ...authorCluster(
    [146, 147, 148, 1663, 1664, 1665, 4138, 4139, 7901, 8892],
    { prose_craft: 8, prose_style: 4, warmth: 7, intensity: 3, pace: 3, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 7, tone: 3, difficulty: 3 },
    ["literary-fiction", "new-england-setting", "female-protagonist", "domestic", "small-town", "restrained-prose", "quiet-drama"],
    {
      146: { tags: ["literary-fiction", "new-england-setting", "female-protagonist", "vignettes", "ensemble-cast", "marriage", "aging", "small-town", "restrained-prose", "quiet-drama"] },
    }
  ),

  // Hemingway (already have A Farewell to Arms, The Sun Also Rises)
  ...authorCluster(
    [155, 158, 159, 2312, 2313, 3480, 3481, 3482, 8879, 9998, 10209, 10210, 10211],
    { prose_craft: 9, prose_style: 2, warmth: 4, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 4 },
    ["literary-fiction", "male-protagonist", "sparse-prose"],
    {
      155: { vibes: { warmth: 5 }, tags: ["literary-fiction", "male-protagonist", "ocean-setting", "cuban-setting", "fishing", "endurance", "sparse-prose", "novella-length", "aging"] },
      158: { vibes: { intensity: 7 }, tags: ["literary-fiction", "male-protagonist", "spanish-setting", "civil-war", "war", "romance-subplot", "sparse-prose"] },
      159: { vibes: { warmth: 6, tone: 5, fabulism: 0 }, tags: ["memoir", "male-protagonist", "parisian-setting", "1920s-setting", "writer-protagonist", "lost-generation", "sparse-prose", "nostalgia"] },
      8879: { tags: ["vignettes", "male-protagonist", "coming-of-age", "midwestern-setting", "war", "sparse-prose", "nick-adams"] },
    }
  ),

  // John Updike
  ...authorCluster(
    [2203, 2204, 2205, 2206, 2207, 2208, 2209, 2210, 3235, 9100, 10221, 10222],
    { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 7, tone: 4, difficulty: 5 },
    ["literary-fiction", "male-protagonist", "american-setting", "suburban", "marriage", "domestic"],
    {
      2203: { tags: ["literary-fiction", "male-protagonist", "pennsylvania-setting", "suburban", "marriage", "infidelity", "running", "working-class", "domestic", "alienation"] },
      2204: { vibes: { intensity: 5 }, tags: ["literary-fiction", "male-protagonist", "pennsylvania-setting", "1960s-setting", "race", "domestic", "political-intrigue", "vietnam-era"] },
      2208: { vibes: { fabulism: 4, tone: 5 }, tags: ["literary-fiction", "female-protagonist", "new-england-setting", "witches", "suburban", "satirical"] },
    }
  ),

  // Iris Murdoch
  ...authorCluster(
    [2211, 2212, 2213, 2214, 2215, 2216, 10304, 10305, 10306, 10307, 10308, 10309, 10310],
    { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 4, pace: 4, moral_complexity: 8, fabulism: 2, emotional_register: 4, interiority: 7, tone: 4, difficulty: 5 },
    ["literary-fiction", "british-setting", "philosophical", "domestic", "ensemble-cast", "moral-dilemma"],
    {
      2211: { vibes: { craft: 8 }, tags: ["literary-fiction", "british-setting", "male-protagonist", "first-person", "ocean-setting", "obsession", "jealousy", "domestic", "philosophical", "gothic-atmosphere"] },
      2212: { vibes: { tone: 5, pace: 5 }, tags: ["literary-fiction", "british-setting", "male-protagonist", "first-person", "london-setting", "picaresque", "philosophical", "existential", "witty-prose"] },
      2213: { vibes: { intensity: 5, craft: 8 }, tags: ["literary-fiction", "british-setting", "male-protagonist", "first-person", "writer-protagonist", "obsession", "philosophical", "metafiction", "dense-prose"] },
    }
  ),

  // Herman Melville
  ...authorCluster(
    [236, 237, 238, 1635, 1636, 3637, 3638, 10130, 10131, 10132, 10133],
    { prose_craft: 8, prose_style: 8, warmth: 4, intensity: 5, pace: 3, moral_complexity: 8, fabulism: 2, emotional_register: 3, interiority: 6, tone: 3, difficulty: 7 },
    ["literary-fiction", "19th-century", "american-setting", "male-protagonist", "dense-prose"],
    {
      236: { vibes: { craft: 10, difficulty: 8, style: 9 }, tags: ["literary-fiction", "male-protagonist", "ocean-setting", "obsession", "first-person", "whaling", "quest", "doorstopper", "biblical-register", "philosophical", "dense-prose", "maximalism"] },
      237: { vibes: { warmth: 3, difficulty: 4 }, tags: ["literary-fiction", "male-protagonist", "new-york-setting", "office-setting", "alienation", "novella-length", "restrained-prose"] },
      238: { vibes: { moral_complexity: 9, difficulty: 5 }, tags: ["literary-fiction", "male-protagonist", "ocean-setting", "naval-setting", "moral-dilemma", "innocence", "violence", "novella-length"] },
      1636: { vibes: { tone: 5, difficulty: 8 }, tags: ["literary-fiction", "male-protagonist", "river-setting", "satirical", "picaresque", "identity", "con-artist", "dense-prose"] },
      10132: { vibes: { difficulty: 9 }, tags: ["literary-fiction", "male-protagonist", "identity", "obsession", "dense-prose", "doorstopper", "experimental-form"] },
    }
  ),

  // Jack Kerouac (already have On the Road, Big Sur)
  ...authorCluster(
    [279, 1560, 1561, 1562, 3497, 3498, 3499, 3500],
    { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 4, pace: 5, moral_complexity: 5, fabulism: 1, emotional_register: 4, interiority: 6, tone: 4, difficulty: 4 },
    ["autofiction", "male-protagonist", "american-setting", "beat-generation", "road-trip", "friendship"],
    {
      279: { vibes: { warmth: 6, tone: 5, craft: 7 }, tags: ["autofiction", "male-protagonist", "california-setting", "beat-generation", "zen", "spiritual", "mountain-setting", "friendship"] },
      1561: { vibes: { craft: 7, style: 6, difficulty: 6 }, tags: ["autofiction", "male-protagonist", "stream-of-consciousness", "beat-generation", "experimental-form", "dense-prose", "road-trip"] },
      1562: { vibes: { intensity: 5 }, tags: ["autofiction", "male-protagonist", "beat-generation", "sexuality", "urban", "novella-length"] },
      3497: { vibes: { craft: 7, style: 5 }, tags: ["literary-fiction", "male-protagonist", "new-england-setting", "family", "coming-of-age", "working-class", "bildungsroman"] },
    }
  ),
};

const merged = { ...existing, ...batch };
fs.writeFileSync(SIDECAR, JSON.stringify(merged, null, 2));

const before = Object.keys(existing).length;
const after = Object.keys(merged).length;
console.log("Before:", before, "| Added:", Object.keys(batch).length, "| After:", after);
