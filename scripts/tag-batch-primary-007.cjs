const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const existing = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
const PRIMARY = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "public", "book-data.json"), "utf8"));

function authorCluster(ids, baseVibes, baseTags) {
  const result = {};
  for (const id of ids) {
    result[id] = { vibes: { ...baseVibes }, tags: [...baseTags] };
  }
  return result;
}

function idsFor(author) {
  return PRIMARY.filter(b => b.author === author && !existing[String(b.id)]).map(b => b.id);
}

const batch = {
  // === LITERARY / NOTABLE AUTHORS ===
  // Joan Didion (12)
  ...authorCluster(idsFor("Joan Didion"),
    { prose_craft: 9, prose_style: 4, warmth: 3, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 0, emotional_register: 3, interiority: 8, tone: 3, difficulty: 5 },
    ["essay-collection", "american-setting", "california-setting", "female-protagonist", "restrained-prose", "personal-essay", "grief", "new-journalism"]
  ),
  // Oliver Sacks (12)
  ...authorCluster(idsFor("Oliver Sacks"),
    { prose_craft: 8, prose_style: 5, warmth: 8, intensity: 2, pace: 5, moral_complexity: 5, fabulism: 0, emotional_register: 6, interiority: 5, tone: 5, difficulty: 4 },
    ["narrative-nonfiction", "science-writing", "case-study-driven", "neurology", "empathy", "academic-accessible", "warm"]
  ),
  // Stanisław Lem (12)
  ...authorCluster(idsFor("Stanisław Lem"),
    { prose_craft: 8, prose_style: 5, warmth: 3, intensity: 3, pace: 4, moral_complexity: 8, fabulism: 9, emotional_register: 4, interiority: 6, tone: 4, difficulty: 6 },
    ["hard-sf", "translated-from", "philosophical-sf", "aliens", "first-contact", "satirical", "ideas-driven"]
  ),
  // Kate Atkinson (12)
  ...authorCluster(idsFor("Kate Atkinson"),
    { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 2, emotional_register: 5, interiority: 6, tone: 5, difficulty: 4 },
    ["literary-fiction", "british-setting", "multi-pov", "nonlinear", "family", "witty-prose", "mystery"]
  ),
  // James Ellroy (11)
  ...authorCluster(idsFor("James Ellroy"),
    { prose_craft: 7, prose_style: 5, warmth: 2, intensity: 9, pace: 8, moral_complexity: 9, fabulism: 1, emotional_register: 2, interiority: 5, tone: 1, difficulty: 5 },
    ["noir", "male-protagonist", "los-angeles-setting", "corrupt-cop", "violence", "conspiracy", "staccato-prose", "1940s"]
  ),
  // Henning Mankell (11)
  ...authorCluster(idsFor("Henning Mankell"),
    { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 3 },
    ["police-procedural", "male-protagonist", "translated-from", "swedish-setting", "series-detective", "social-realism", "nordic-noir"]
  ),
  // Jack Vance (17)
  ...authorCluster(idsFor("Jack Vance"),
    { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 4, pace: 6, moral_complexity: 5, fabulism: 9, emotional_register: 4, interiority: 4, tone: 6, difficulty: 4 },
    ["far-future", "secondary-world", "male-protagonist", "picaresque", "witty-prose", "worldbuilding-heavy", "dying-earth"]
  ),
  // Clive Barker (13)
  ...authorCluster(idsFor("Clive Barker"),
    { prose_craft: 7, prose_style: 7, warmth: 3, intensity: 9, pace: 5, moral_complexity: 7, fabulism: 8, emotional_register: 3, interiority: 5, tone: 3, difficulty: 5 },
    ["horror", "dark-fantasy", "body-horror", "graphic-violence", "baroque-prose", "sexuality", "otherworldly", "transgressive"]
  ),
  // N.K. Jemisin (12)
  ...authorCluster(idsFor("N.K. Jemisin"),
    { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 6, pace: 5, moral_complexity: 8, fabulism: 9, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 },
    ["epic-fantasy", "secondary-world", "female-protagonist", "Black-protagonist", "oppression", "magic-system-focused", "multi-pov"]
  ),
  // Lois McMaster Bujold (12)
  ...authorCluster(idsFor("Lois McMaster Bujold"),
    { prose_craft: 6, prose_style: 4, warmth: 7, intensity: 4, pace: 6, moral_complexity: 6, fabulism: 8, emotional_register: 5, interiority: 5, tone: 5, difficulty: 3 },
    ["space-opera", "male-protagonist", "disabled-protagonist", "witty-prose", "political-intrigue", "ensemble-cast", "military-sf"]
  ),
  // Fritz Leiber (12)
  ...authorCluster(idsFor("Fritz Leiber"),
    { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 5, pace: 6, moral_complexity: 6, fabulism: 9, emotional_register: 4, interiority: 4, tone: 6, difficulty: 4 },
    ["sword-and-sorcery", "secondary-world", "male-protagonist", "friendship", "adventure", "witty-prose", "urban"]
  ),
  // Andrzej Sapkowski (11)
  ...authorCluster(idsFor("Andrzej Sapkowski"),
    { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 6, pace: 6, moral_complexity: 7, fabulism: 9, emotional_register: 4, interiority: 5, tone: 4, difficulty: 4 },
    ["dark-fantasy", "secondary-world", "male-protagonist", "translated-from", "morally-gray-protagonist", "fairy-tale-retelling", "ensemble-cast"]
  ),
  // Tad Williams (11)
  ...authorCluster(idsFor("Tad Williams"),
    { prose_craft: 5, prose_style: 5, warmth: 5, intensity: 5, pace: 4, moral_complexity: 6, fabulism: 9, emotional_register: 4, interiority: 5, tone: 4, difficulty: 5 },
    ["epic-fantasy", "secondary-world", "multi-pov", "ensemble-cast", "doorstopper", "quest", "worldbuilding-heavy"]
  ),
  // Philip Pullman (11)
  ...authorCluster(idsFor("Philip Pullman"),
    { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 5, pace: 6, moral_complexity: 7, fabulism: 9, emotional_register: 4, interiority: 5, tone: 4, difficulty: 3 },
    ["YA-fantasy", "secondary-world", "female-protagonist", "coming-of-age", "theological", "portal-fantasy", "ensemble-cast"]
  ),
  // Robin McKinley (11)
  ...authorCluster(idsFor("Robin McKinley"),
    { prose_craft: 6, prose_style: 5, warmth: 6, intensity: 4, pace: 5, moral_complexity: 5, fabulism: 9, emotional_register: 5, interiority: 6, tone: 4, difficulty: 3 },
    ["fantasy", "female-protagonist", "fairy-tale-retelling", "coming-of-age", "romance-subplot"]
  ),
  // Charlaine Harris (11)
  ...authorCluster(idsFor("Charlaine Harris"),
    { prose_craft: 4, prose_style: 3, warmth: 6, intensity: 5, pace: 7, moral_complexity: 5, fabulism: 7, emotional_register: 5, interiority: 4, tone: 6, difficulty: 2 },
    ["urban-fantasy", "female-protagonist", "first-person", "vampires", "southern-setting", "romance-subplot", "cozy", "witty-prose"]
  ),
  // Ilona Andrews (13)
  ...authorCluster(idsFor("Ilona Andrews"),
    { prose_craft: 5, prose_style: 4, warmth: 6, intensity: 6, pace: 7, moral_complexity: 5, fabulism: 8, emotional_register: 5, interiority: 5, tone: 5, difficulty: 2 },
    ["urban-fantasy", "female-protagonist", "first-person", "romance-subplot", "enemies-to-lovers", "magic-system-focused", "action"]
  ),
  // T. Kingfisher (13)
  ...authorCluster(idsFor("T. Kingfisher"),
    { prose_craft: 6, prose_style: 4, warmth: 7, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 8, emotional_register: 5, interiority: 5, tone: 6, difficulty: 2 },
    ["cozy-fantasy", "female-protagonist", "witty-prose", "romance-subplot", "found-family", "gothic-horror"]
  ),
  // Brian Jacques (13)
  ...authorCluster(idsFor("Brian Jacques"),
    { prose_craft: 5, prose_style: 4, warmth: 7, intensity: 4, pace: 6, moral_complexity: 4, fabulism: 9, emotional_register: 6, interiority: 3, tone: 5, difficulty: 2 },
    ["YA-fantasy", "secondary-world", "animal-protagonist", "quest", "good-vs-evil", "feast-scenes", "abbey-setting"]
  ),
  // Margaret Weis (11 — Dragonlance etc)
  ...authorCluster(idsFor("Margaret Weis"),
    { prose_craft: 4, prose_style: 4, warmth: 6, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 9, emotional_register: 5, interiority: 4, tone: 4, difficulty: 3 },
    ["epic-fantasy", "secondary-world", "ensemble-cast", "dragons", "quest", "good-vs-evil"]
  ),
  // Jennifer L. Armentrout (11)
  ...authorCluster(idsFor("Jennifer L. Armentrout"),
    { prose_craft: 4, prose_style: 3, warmth: 6, intensity: 5, pace: 7, moral_complexity: 4, fabulism: 8, emotional_register: 5, interiority: 5, tone: 5, difficulty: 2 },
    ["romantasy", "female-protagonist", "first-person", "enemies-to-lovers", "steamy", "fated-mates"]
  ),
  // Garth Nix — already tagged above

  // === THRILLER REMAINING ===
  // John Sandford (20)
  ...authorCluster(idsFor("John Sandford"),
    { prose_craft: 5, prose_style: 3, warmth: 4, intensity: 6, pace: 8, moral_complexity: 5, fabulism: 1, emotional_register: 3, interiority: 4, tone: 4, difficulty: 2 },
    ["thriller", "male-protagonist", "series-detective", "police-procedural", "action", "midwestern-setting"]
  ),
  // C.J. Box (16)
  ...authorCluster(idsFor("C.J. Box"),
    { prose_craft: 5, prose_style: 3, warmth: 5, intensity: 5, pace: 7, moral_complexity: 5, fabulism: 1, emotional_register: 4, interiority: 4, tone: 3, difficulty: 2 },
    ["thriller", "male-protagonist", "series-detective", "western-setting", "wyoming-setting", "wilderness", "hunting"]
  ),
  // Lisa Gardner (16)
  ...authorCluster(idsFor("Lisa Gardner"),
    { prose_craft: 4, prose_style: 3, warmth: 4, intensity: 6, pace: 7, moral_complexity: 5, fabulism: 1, emotional_register: 3, interiority: 5, tone: 2, difficulty: 2 },
    ["thriller", "female-protagonist", "serial-killer", "domestic-thriller", "missing-person", "ticking-clock"]
  ),
  // Stuart Woods (16)
  ...authorCluster(idsFor("Stuart Woods"),
    { prose_craft: 3, prose_style: 2, warmth: 4, intensity: 5, pace: 8, moral_complexity: 4, fabulism: 1, emotional_register: 4, interiority: 3, tone: 5, difficulty: 1 },
    ["thriller", "male-protagonist", "series-detective", "action", "new-york-setting", "wealth"]
  ),
  // Tess Gerritsen (13)
  ...authorCluster(idsFor("Tess Gerritsen"),
    { prose_craft: 5, prose_style: 3, warmth: 4, intensity: 7, pace: 7, moral_complexity: 5, fabulism: 1, emotional_register: 3, interiority: 5, tone: 2, difficulty: 2 },
    ["medical-thriller", "female-protagonist", "boston-setting", "serial-killer", "forensic-protagonist", "dual-pov"]
  ),
  // Mark Greaney (13)
  ...authorCluster(idsFor("Mark Greaney"),
    { prose_craft: 4, prose_style: 3, warmth: 3, intensity: 7, pace: 9, moral_complexity: 4, fabulism: 1, emotional_register: 3, interiority: 3, tone: 3, difficulty: 1 },
    ["espionage", "male-protagonist", "action", "assassin-protagonist", "global-setting", "ticking-clock"]
  ),
  // Tom Clancy (11)
  ...authorCluster(idsFor("Tom Clancy"),
    { prose_craft: 4, prose_style: 4, warmth: 4, intensity: 6, pace: 5, moral_complexity: 5, fabulism: 1, emotional_register: 3, interiority: 3, tone: 3, difficulty: 4 },
    ["tech-thriller", "male-protagonist", "espionage", "military-sf", "political-intrigue", "cold-war-era", "doorstopper"]
  ),
  // Douglas Preston (11 — with Lincoln Child)
  ...authorCluster(idsFor("Douglas Preston"),
    { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 6, pace: 7, moral_complexity: 5, fabulism: 3, emotional_register: 4, interiority: 4, tone: 4, difficulty: 2 },
    ["thriller", "male-protagonist", "series-detective", "new-york-setting", "action", "mystery", "FBI-agent"]
  ),
  // Kathy Reichs (11)
  ...authorCluster(idsFor("Kathy Reichs"),
    { prose_craft: 5, prose_style: 3, warmth: 4, intensity: 5, pace: 7, moral_complexity: 5, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 2 },
    ["thriller", "female-protagonist", "forensic-protagonist", "series-detective", "first-person"]
  ),
  // Lisa Jewell (11)
  ...authorCluster(idsFor("Lisa Jewell"),
    { prose_craft: 5, prose_style: 3, warmth: 5, intensity: 5, pace: 7, moral_complexity: 5, fabulism: 1, emotional_register: 4, interiority: 5, tone: 3, difficulty: 2 },
    ["domestic-thriller", "multi-pov", "british-setting", "london-setting", "family", "twist-ending", "missing-person"]
  ),
  // John Connolly (11)
  ...authorCluster(idsFor("John Connolly"),
    { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 6, pace: 5, moral_complexity: 6, fabulism: 4, emotional_register: 3, interiority: 5, tone: 3, difficulty: 3 },
    ["supernatural-horror", "noir", "male-protagonist", "series-detective", "american-setting", "gothic-atmosphere", "violence"]
  ),
  // Mark Billingham (11)
  ...authorCluster(idsFor("Mark Billingham"),
    { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 2 },
    ["police-procedural", "male-protagonist", "london-setting", "series-detective", "dark-humor"]
  ),

  // === MYSTERY REMAINING ===
  // Colin Dexter (13)
  ...authorCluster(idsFor("Colin Dexter"),
    { prose_craft: 6, prose_style: 4, warmth: 5, intensity: 3, pace: 5, moral_complexity: 5, fabulism: 1, emotional_register: 4, interiority: 5, tone: 5, difficulty: 3 },
    ["mystery", "male-protagonist", "oxford-setting", "series-detective", "academic-setting", "whodunit", "british-setting"]
  ),
  // Ruth Rendell (12)
  ...authorCluster(idsFor("Ruth Rendell"),
    { prose_craft: 7, prose_style: 4, warmth: 3, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 3 },
    ["psychological-thriller", "british-setting", "suburban", "series-detective", "domestic", "obsession"]
  ),
  // Peter May (12)
  ...authorCluster(idsFor("Peter May"),
    { prose_craft: 6, prose_style: 4, warmth: 5, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 1, emotional_register: 4, interiority: 5, tone: 3, difficulty: 3 },
    ["mystery", "male-protagonist", "scottish-setting", "island-setting", "series-detective", "atmospheric", "landscape"]
  ),
  // Elly Griffiths (11)
  ...authorCluster(idsFor("Elly Griffiths"),
    { prose_craft: 5, prose_style: 4, warmth: 6, intensity: 4, pace: 5, moral_complexity: 5, fabulism: 1, emotional_register: 4, interiority: 5, tone: 4, difficulty: 2 },
    ["mystery", "female-protagonist", "british-setting", "archaeological", "series-detective", "atmospheric"]
  ),
  // Sara Blædel (11)
  ...authorCluster(idsFor("Sara Blædel"),
    { prose_craft: 5, prose_style: 3, warmth: 4, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 2 },
    ["police-procedural", "female-protagonist", "translated-from", "danish-setting", "series-detective", "nordic-noir"]
  ),
  // Helene Tursten (11)
  ...authorCluster(idsFor("Helene Tursten"),
    { prose_craft: 5, prose_style: 3, warmth: 4, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 2 },
    ["police-procedural", "female-protagonist", "translated-from", "swedish-setting", "series-detective", "nordic-noir"]
  ),
  // Carolyn Hart (11)
  ...authorCluster(idsFor("Carolyn Hart"),
    { prose_craft: 4, prose_style: 3, warmth: 6, intensity: 3, pace: 6, moral_complexity: 4, fabulism: 1, emotional_register: 5, interiority: 4, tone: 6, difficulty: 1 },
    ["cozy-mystery", "female-protagonist", "amateur-sleuth", "small-town", "series-detective"]
  ),

  // === ROMANCE ===
  // Julia Quinn (12)
  ...authorCluster(idsFor("Julia Quinn"),
    { prose_craft: 5, prose_style: 4, warmth: 8, intensity: 3, pace: 6, moral_complexity: 3, fabulism: 1, emotional_register: 8, interiority: 5, tone: 8, difficulty: 2 },
    ["regency-romance", "female-protagonist", "dual-pov", "HEA", "witty-prose", "british-setting", "aristocratic", "steamy"]
  ),
  // Lisa Kleypas (11)
  ...authorCluster(idsFor("Lisa Kleypas"),
    { prose_craft: 5, prose_style: 4, warmth: 8, intensity: 4, pace: 6, moral_complexity: 4, fabulism: 1, emotional_register: 7, interiority: 5, tone: 7, difficulty: 2 },
    ["historical-romance", "regency-romance", "female-protagonist", "HEA", "steamy", "witty-prose", "enemies-to-lovers"]
  ),
  // Christina Lauren (11)
  ...authorCluster(idsFor("Christina Lauren"),
    { prose_craft: 4, prose_style: 3, warmth: 8, intensity: 3, pace: 7, moral_complexity: 3, fabulism: 1, emotional_register: 7, interiority: 5, tone: 8, difficulty: 1 },
    ["contemporary-romance", "rom-com", "female-protagonist", "dual-pov", "HEA", "witty-prose", "workplace-romance"]
  ),
  // Penelope Douglas (11)
  ...authorCluster(idsFor("Penelope Douglas"),
    { prose_craft: 4, prose_style: 3, warmth: 4, intensity: 7, pace: 7, moral_complexity: 5, fabulism: 1, emotional_register: 4, interiority: 5, tone: 3, difficulty: 2 },
    ["romance", "female-protagonist", "enemies-to-lovers", "steamy", "explicit", "high-school-setting", "contemporary-setting"]
  ),
  // Nalini Singh (11)
  ...authorCluster(idsFor("Nalini Singh"),
    { prose_craft: 5, prose_style: 4, warmth: 6, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 7, emotional_register: 5, interiority: 5, tone: 4, difficulty: 2 },
    ["paranormal-romance", "female-protagonist", "enemies-to-lovers", "steamy", "ensemble-cast", "near-future", "shapeshifters"]
  ),
  // Sherryl Woods (11)
  ...authorCluster(idsFor("Sherryl Woods"),
    { prose_craft: 3, prose_style: 2, warmth: 9, intensity: 1, pace: 5, moral_complexity: 3, fabulism: 1, emotional_register: 7, interiority: 4, tone: 6, difficulty: 1 },
    ["romance", "female-protagonist", "small-town", "community", "HEA", "domestic", "cozy", "family"]
  ),

  // === HISTORICAL FICTION ===
  // Philippa Gregory (12)
  ...authorCluster(idsFor("Philippa Gregory"),
    { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 5, pace: 5, moral_complexity: 5, fabulism: 1, emotional_register: 4, interiority: 5, tone: 3, difficulty: 3 },
    ["historical-fiction", "female-protagonist", "british-setting", "Tudor", "court-intrigue", "political-intrigue", "first-person"]
  ),
  // Wilbur Smith (12)
  ...authorCluster(idsFor("Wilbur Smith"),
    { prose_craft: 4, prose_style: 4, warmth: 5, intensity: 6, pace: 7, moral_complexity: 5, fabulism: 1, emotional_register: 4, interiority: 3, tone: 3, difficulty: 2 },
    ["historical-fiction", "african-setting", "male-protagonist", "adventure", "war", "multigenerational", "action"]
  ),
  // James Michener (11)
  ...authorCluster(idsFor("James Michener"),
    { prose_craft: 5, prose_style: 5, warmth: 5, intensity: 4, pace: 3, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 4, tone: 3, difficulty: 4 },
    ["historical-fiction", "multi-pov", "multigenerational", "doorstopper", "ensemble-cast", "sweeping", "landscape"]
  ),

  // === HORROR (remaining) ===
  // Clive Barker already tagged above
  // Robert McCammon remaining
  ...authorCluster(idsFor("Robert R. McCammon"),
    { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 7, pace: 6, moral_complexity: 6, fabulism: 4, emotional_register: 3, interiority: 5, tone: 3, difficulty: 4 },
    ["supernatural-horror", "american-setting", "ensemble-cast"]
  ),

  // === YOUNG ADULT ===
  // Lemony Snicket (13)
  ...authorCluster(idsFor("Lemony Snicket"),
    { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 4, pace: 6, moral_complexity: 6, fabulism: 5, emotional_register: 3, interiority: 4, tone: 6, difficulty: 2 },
    ["YA-fantasy", "child-protagonist", "ensemble-cast", "orphan-protagonist", "dark-humor", "series-detective", "witty-prose", "gothic-atmosphere"]
  ),
  // Maggie Stiefvater (12)
  ...authorCluster(idsFor("Maggie Stiefvater"),
    { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 7, emotional_register: 4, interiority: 6, tone: 4, difficulty: 3 },
    ["YA-fantasy", "lyrical-prose", "romance-subplot", "rural", "atmospheric", "coming-of-age"]
  ),
  // Marissa Meyer (12)
  ...authorCluster(idsFor("Marissa Meyer"),
    { prose_craft: 4, prose_style: 3, warmth: 6, intensity: 5, pace: 7, moral_complexity: 5, fabulism: 7, emotional_register: 5, interiority: 4, tone: 5, difficulty: 2 },
    ["YA-sci-fi", "fairy-tale-retelling", "female-protagonist", "ensemble-cast", "romance-subplot", "near-future"]
  ),

  // === NON-FICTION ===
  // Larry Niven (11)
  ...authorCluster(idsFor("Larry Niven"),
    { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 4, pace: 6, moral_complexity: 5, fabulism: 9, emotional_register: 4, interiority: 4, tone: 5, difficulty: 4 },
    ["hard-sf", "space-opera", "far-future", "worldbuilding-heavy", "aliens", "ideas-driven"]
  ),

  // === COMMERCIAL FICTION REMAINING ===
  // Colleen McCullough (13)
  ...authorCluster(idsFor("Colleen McCullough"),
    { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 5, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 5, tone: 3, difficulty: 4 },
    ["historical-fiction", "australian-setting", "roman-setting", "ensemble-cast", "family-saga", "doorstopper", "multigenerational"]
  ),
  // Elin Hilderbrand (12)
  ...authorCluster(idsFor("Elin Hilderbrand"),
    { prose_craft: 4, prose_style: 3, warmth: 7, intensity: 3, pace: 5, moral_complexity: 4, fabulism: 1, emotional_register: 5, interiority: 4, tone: 5, difficulty: 1 },
    ["romance", "female-protagonist", "island-setting", "nantucket-setting", "family", "domestic", "summer-setting"]
  ),
  // Marian Keyes (8)
  ...authorCluster(idsFor("Marian Keyes"),
    { prose_craft: 5, prose_style: 3, warmth: 7, intensity: 4, pace: 6, moral_complexity: 5, fabulism: 1, emotional_register: 5, interiority: 5, tone: 6, difficulty: 2 },
    ["literary-fiction", "irish-setting", "female-protagonist", "first-person", "family", "domestic", "addiction", "witty-prose", "dark-humor"]
  ),
  // Lucinda Riley (8)
  ...authorCluster(idsFor("Lucinda Riley"),
    { prose_craft: 4, prose_style: 3, warmth: 6, intensity: 3, pace: 5, moral_complexity: 4, fabulism: 1, emotional_register: 5, interiority: 4, tone: 4, difficulty: 2 },
    ["historical-fiction", "female-protagonist", "dual-timeline", "family-saga", "romance-subplot", "global-setting", "mystery"]
  ),
  // Barbara Taylor Bradford (9)
  ...authorCluster(idsFor("Barbara Taylor Bradford"),
    { prose_craft: 3, prose_style: 3, warmth: 6, intensity: 4, pace: 5, moral_complexity: 4, fabulism: 1, emotional_register: 5, interiority: 4, tone: 4, difficulty: 1 },
    ["romance", "female-protagonist", "rags-to-riches", "family-saga", "domestic", "doorstopper"]
  ),
  // Jackie Collins (10)
  ...authorCluster(idsFor("Jackie Collins"),
    { prose_craft: 3, prose_style: 3, warmth: 4, intensity: 5, pace: 7, moral_complexity: 3, fabulism: 1, emotional_register: 4, interiority: 3, tone: 5, difficulty: 1 },
    ["romance", "female-protagonist", "los-angeles-setting", "hollywood", "wealth", "sexuality", "glamour"]
  ),
  // Jane Green (10)
  ...authorCluster(idsFor("Jane Green"),
    { prose_craft: 4, prose_style: 3, warmth: 6, intensity: 3, pace: 5, moral_complexity: 4, fabulism: 1, emotional_register: 5, interiority: 4, tone: 5, difficulty: 1 },
    ["romance", "female-protagonist", "british-setting", "domestic", "marriage", "contemporary-setting"]
  ),
  // Peter James (11)
  ...authorCluster(idsFor("Peter James"),
    { prose_craft: 5, prose_style: 3, warmth: 4, intensity: 6, pace: 7, moral_complexity: 5, fabulism: 1, emotional_register: 3, interiority: 4, tone: 2, difficulty: 2 },
    ["police-procedural", "male-protagonist", "british-setting", "brighton-setting", "series-detective", "serial-killer"]
  ),
  // Lisa Jackson (11)
  ...authorCluster(idsFor("Lisa Jackson"),
    { prose_craft: 4, prose_style: 3, warmth: 4, intensity: 6, pace: 7, moral_complexity: 4, fabulism: 1, emotional_register: 3, interiority: 4, tone: 2, difficulty: 1 },
    ["thriller", "female-protagonist", "serial-killer", "american-setting", "domestic-thriller"]
  ),
  // Catherine Coulter (11)
  ...authorCluster(idsFor("Catherine Coulter"),
    { prose_craft: 4, prose_style: 3, warmth: 5, intensity: 5, pace: 7, moral_complexity: 4, fabulism: 1, emotional_register: 4, interiority: 4, tone: 4, difficulty: 1 },
    ["thriller", "dual-pov", "FBI-agent", "series-detective", "action", "romance-subplot"]
  ),
  // Karen Rose (11)
  ...authorCluster(idsFor("Karen Rose"),
    { prose_craft: 4, prose_style: 3, warmth: 5, intensity: 6, pace: 7, moral_complexity: 4, fabulism: 1, emotional_register: 4, interiority: 4, tone: 2, difficulty: 1 },
    ["romantic-suspense", "female-protagonist", "serial-killer", "romance-subplot", "american-setting"]
  ),
};

const merged = { ...existing, ...batch };
fs.writeFileSync(SIDECAR, JSON.stringify(merged, null, 2));

const before = Object.keys(existing).length;
const after = Object.keys(merged).length;
console.log("Before:", before, "| Added:", Object.keys(batch).length, "| After:", after);
