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
  // === HISTORICAL FICTION ===
  // Bernard Cornwell (43)
  ...authorCluster(idsFor("Bernard Cornwell"),
    { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 7, pace: 7, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 4, tone: 3, difficulty: 3 },
    ["historical-fiction", "male-protagonist", "british-setting", "war", "action", "soldier-protagonist", "medieval-setting"]
  ),
  // Patrick O'Brian (20)
  ...authorCluster(idsFor("Patrick O'Brian"),
    { prose_craft: 8, prose_style: 6, warmth: 6, intensity: 5, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 5, tone: 5, difficulty: 5 },
    ["historical-fiction", "male-protagonist", "ocean-setting", "naval-setting", "napoleonic-era", "friendship", "adventure", "british-setting"]
  ),
  // Ken Follett
  ...authorCluster(idsFor("Ken Follett"),
    { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 6, pace: 6, moral_complexity: 5, fabulism: 1, emotional_register: 4, interiority: 4, tone: 3, difficulty: 3 },
    ["historical-fiction", "multi-pov", "ensemble-cast", "doorstopper", "political-intrigue", "war"]
  ),

  // === FANTASY (remaining) ===
  // Neil Gaiman (25)
  ...authorCluster(idsFor("Neil Gaiman"),
    { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 8, emotional_register: 4, interiority: 5, tone: 5, difficulty: 3 },
    ["urban-fantasy", "mythic-fantasy", "mythology", "witty-prose", "dreamlike", "gods-walking"]
  ),
  // Roger Zelazny (20)
  ...authorCluster(idsFor("Roger Zelazny"),
    { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 5, pace: 6, moral_complexity: 6, fabulism: 9, emotional_register: 4, interiority: 5, tone: 5, difficulty: 4 },
    ["secondary-world", "male-protagonist", "gods-walking", "mythology", "multiverse", "lyrical-prose"]
  ),
  // Raymond E. Feist (18)
  ...authorCluster(idsFor("Raymond E. Feist"),
    { prose_craft: 4, prose_style: 4, warmth: 6, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 9, emotional_register: 5, interiority: 4, tone: 4, difficulty: 3 },
    ["epic-fantasy", "secondary-world", "male-protagonist", "quest", "coming-of-age", "ensemble-cast", "doorstopper"]
  ),
  // George R.R. Martin (remaining 16)
  ...authorCluster(idsFor("George R.R. Martin"),
    { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 7, pace: 5, moral_complexity: 9, fabulism: 8, emotional_register: 3, interiority: 5, tone: 3, difficulty: 5 },
    ["epic-fantasy", "secondary-world", "multi-pov", "morally-gray-protagonist", "political-intrigue", "violence", "ensemble-cast"]
  ),
  // C.S. Lewis (17)
  ...authorCluster(idsFor("C.S. Lewis"),
    { prose_craft: 7, prose_style: 5, warmth: 7, intensity: 3, pace: 5, moral_complexity: 6, fabulism: 8, emotional_register: 5, interiority: 5, tone: 5, difficulty: 3 },
    ["fantasy", "british-setting", "allegorical", "religious", "coming-of-age"]
  ),
  // Holly Black (16)
  ...authorCluster(idsFor("Holly Black"),
    { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 5, pace: 7, moral_complexity: 6, fabulism: 9, emotional_register: 4, interiority: 5, tone: 4, difficulty: 2 },
    ["YA-fantasy", "urban-fantasy", "faeries", "female-protagonist", "court-intrigue", "romance-subplot"]
  ),
  // Tamora Pierce (16)
  ...authorCluster(idsFor("Tamora Pierce"),
    { prose_craft: 5, prose_style: 4, warmth: 7, intensity: 4, pace: 6, moral_complexity: 5, fabulism: 9, emotional_register: 5, interiority: 5, tone: 5, difficulty: 2 },
    ["YA-fantasy", "secondary-world", "female-protagonist", "coming-of-age", "knight-protagonist", "magic-system-focused"]
  ),
  // Stephen R. Donaldson (15)
  ...authorCluster(idsFor("Stephen R. Donaldson"),
    { prose_craft: 6, prose_style: 6, warmth: 3, intensity: 6, pace: 3, moral_complexity: 8, fabulism: 9, emotional_register: 3, interiority: 7, tone: 2, difficulty: 6 },
    ["epic-fantasy", "secondary-world", "male-protagonist", "antihero", "dark-fantasy", "portal-fantasy", "doorstopper"]
  ),
  // Anne McCaffrey (15)
  ...authorCluster(idsFor("Anne McCaffrey"),
    { prose_craft: 5, prose_style: 4, warmth: 6, intensity: 4, pace: 6, moral_complexity: 5, fabulism: 9, emotional_register: 5, interiority: 5, tone: 4, difficulty: 3 },
    ["soft-sf", "dragons", "female-protagonist", "colony-world", "coming-of-age", "romance-subplot"]
  ),
  // Garth Nix (13)
  ...authorCluster(idsFor("Garth Nix"),
    { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 5, pace: 6, moral_complexity: 6, fabulism: 9, emotional_register: 4, interiority: 5, tone: 4, difficulty: 3 },
    ["YA-fantasy", "secondary-world", "female-protagonist", "necromancy", "quest", "coming-of-age"]
  ),
  // Will Wight (13)
  ...authorCluster(idsFor("Will Wight"),
    { prose_craft: 4, prose_style: 3, warmth: 5, intensity: 5, pace: 8, moral_complexity: 4, fabulism: 9, emotional_register: 5, interiority: 4, tone: 5, difficulty: 2 },
    ["progression-fantasy", "secondary-world", "male-protagonist", "hard-magic", "martial-arts", "action", "coming-of-age"]
  ),
  // Benedict Jacka (12)
  ...authorCluster(idsFor("Benedict Jacka"),
    { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 5, pace: 7, moral_complexity: 6, fabulism: 8, emotional_register: 4, interiority: 5, tone: 4, difficulty: 3 },
    ["urban-fantasy", "male-protagonist", "first-person", "london-setting", "magic-system-focused", "political-intrigue"]
  ),
  // Kim Harrison (14)
  ...authorCluster(idsFor("Kim Harrison"),
    { prose_craft: 5, prose_style: 4, warmth: 6, intensity: 5, pace: 7, moral_complexity: 5, fabulism: 8, emotional_register: 5, interiority: 5, tone: 5, difficulty: 2 },
    ["urban-fantasy", "female-protagonist", "first-person", "vampires", "witches", "romance-subplot"]
  ),

  // === SCI-FI (remaining) ===
  // Neal Stephenson (13)
  ...authorCluster(idsFor("Neal Stephenson"),
    { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 7, emotional_register: 4, interiority: 5, tone: 5, difficulty: 6 },
    ["hard-sf", "near-future", "ideas-driven", "worldbuilding-heavy", "doorstopper", "male-protagonist"]
  ),
  // William Gibson (13)
  ...authorCluster(idsFor("William Gibson"),
    { prose_craft: 7, prose_style: 6, warmth: 3, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 7, emotional_register: 3, interiority: 5, tone: 3, difficulty: 5 },
    ["cyberpunk", "near-future", "male-protagonist", "corporate", "technology", "urban", "literary-sf"]
  ),
  // Michael Crichton (16)
  ...authorCluster(idsFor("Michael Crichton"),
    { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 6, pace: 8, moral_complexity: 5, fabulism: 5, emotional_register: 4, interiority: 4, tone: 3, difficulty: 2 },
    ["tech-thriller", "near-future", "science", "male-protagonist", "ticking-clock", "action", "ideas-driven"]
  ),
  // H.G. Wells (13)
  ...authorCluster(idsFor("H.G. Wells"),
    { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 5, pace: 6, moral_complexity: 7, fabulism: 7, emotional_register: 4, interiority: 5, tone: 4, difficulty: 4 },
    ["soft-sf", "near-future", "male-protagonist", "british-setting", "ideas-driven", "social-realism", "classic-sf"]
  ),
  // David Weber (12)
  ...authorCluster(idsFor("David Weber"),
    { prose_craft: 4, prose_style: 4, warmth: 5, intensity: 6, pace: 5, moral_complexity: 5, fabulism: 8, emotional_register: 4, interiority: 4, tone: 3, difficulty: 4 },
    ["military-sf", "space-opera", "female-protagonist", "far-future", "naval-setting", "war", "doorstopper"]
  ),

  // === MYSTERY ===
  // Sue Grafton (25)
  ...authorCluster(idsFor("Sue Grafton"),
    { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 4, pace: 6, moral_complexity: 5, fabulism: 1, emotional_register: 4, interiority: 5, tone: 5, difficulty: 2 },
    ["mystery", "female-protagonist", "first-person", "private-eye", "california-setting", "series-detective"]
  ),
  // Ian Rankin (23)
  ...authorCluster(idsFor("Ian Rankin"),
    { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 5, pace: 6, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 3 },
    ["police-procedural", "male-protagonist", "edinburgh-setting", "scottish-setting", "series-detective", "social-realism"]
  ),
  // Louise Penny (21)
  ...authorCluster(idsFor("Louise Penny"),
    { prose_craft: 6, prose_style: 4, warmth: 7, intensity: 3, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 5, interiority: 5, tone: 4, difficulty: 2 },
    ["cozy-mystery", "male-protagonist", "canadian-setting", "small-town", "series-detective", "community", "ensemble-cast"]
  ),
  // Craig Johnson (20)
  ...authorCluster(idsFor("Craig Johnson"),
    { prose_craft: 5, prose_style: 4, warmth: 6, intensity: 5, pace: 5, moral_complexity: 5, fabulism: 1, emotional_register: 4, interiority: 4, tone: 5, difficulty: 2 },
    ["mystery", "male-protagonist", "first-person", "western-setting", "wyoming-setting", "series-detective", "small-town-sheriff"]
  ),
  // Lawrence Block (20)
  ...authorCluster(idsFor("Lawrence Block"),
    { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 5, pace: 6, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 5, tone: 4, difficulty: 2 },
    ["noir", "mystery", "male-protagonist", "new-york-setting", "series-detective", "hardboiled", "alcoholism"]
  ),
  // Elizabeth Peters (20)
  ...authorCluster(idsFor("Elizabeth Peters"),
    { prose_craft: 5, prose_style: 4, warmth: 6, intensity: 3, pace: 6, moral_complexity: 4, fabulism: 1, emotional_register: 5, interiority: 4, tone: 6, difficulty: 2 },
    ["cozy-mystery", "female-protagonist", "egyptian-setting", "archaeological", "series-detective", "witty-prose", "historical-mystery"]
  ),
  // Donna Leon (19)
  ...authorCluster(idsFor("Donna Leon"),
    { prose_craft: 6, prose_style: 4, warmth: 5, intensity: 3, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 5, tone: 4, difficulty: 2 },
    ["police-procedural", "male-protagonist", "italian-setting", "venice-setting", "series-detective", "social-realism"]
  ),
  // Andrea Camilleri (19)
  ...authorCluster(idsFor("Andrea Camilleri"),
    { prose_craft: 6, prose_style: 4, warmth: 6, intensity: 3, pace: 6, moral_complexity: 6, fabulism: 1, emotional_register: 5, interiority: 4, tone: 6, difficulty: 2 },
    ["police-procedural", "male-protagonist", "translated-from", "sicilian-setting", "series-detective", "food-writing", "witty-prose"]
  ),
  // Walter Mosley (19)
  ...authorCluster(idsFor("Walter Mosley"),
    { prose_craft: 7, prose_style: 4, warmth: 5, intensity: 6, pace: 6, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 3 },
    ["noir", "mystery", "male-protagonist", "Black-protagonist", "los-angeles-setting", "series-detective", "race", "working-class"]
  ),
  // Ann Cleeves (18)
  ...authorCluster(idsFor("Ann Cleeves"),
    { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 4, pace: 5, moral_complexity: 5, fabulism: 1, emotional_register: 4, interiority: 5, tone: 3, difficulty: 2 },
    ["police-procedural", "british-setting", "series-detective", "rural", "community", "atmospheric"]
  ),
  // Robert B. Parker (18)
  ...authorCluster(idsFor("Robert B. Parker"),
    { prose_craft: 5, prose_style: 3, warmth: 5, intensity: 5, pace: 8, moral_complexity: 5, fabulism: 1, emotional_register: 4, interiority: 4, tone: 5, difficulty: 1 },
    ["mystery", "male-protagonist", "first-person", "boston-setting", "private-eye", "series-detective", "hardboiled", "witty-prose"]
  ),
  // Tony Hillerman (18)
  ...authorCluster(idsFor("Tony Hillerman"),
    { prose_craft: 6, prose_style: 4, warmth: 5, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 5, tone: 3, difficulty: 3 },
    ["mystery", "male-protagonist", "Indigenous-protagonist", "navajo-setting", "western-setting", "series-detective", "landscape"]
  ),
  // Ross Macdonald (17)
  ...authorCluster(idsFor("Ross Macdonald"),
    { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 3 },
    ["noir", "mystery", "male-protagonist", "california-setting", "private-eye", "series-detective", "family-saga"]
  ),
  // James Lee Burke (17)
  ...authorCluster(idsFor("James Lee Burke"),
    { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 7, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 2, difficulty: 4 },
    ["noir", "mystery", "male-protagonist", "louisiana-setting", "series-detective", "violence", "southern-setting", "lyrical-prose"]
  ),
  // Dennis Lehane (15)
  ...authorCluster(idsFor("Dennis Lehane"),
    { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 7, pace: 6, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 2, difficulty: 3 },
    ["noir", "mystery", "male-protagonist", "boston-setting", "working-class", "violence", "ensemble-cast"]
  ),
  // Val McDermid (20)
  ...authorCluster(idsFor("Val McDermid"),
    { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 6, pace: 6, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 2 },
    ["police-procedural", "british-setting", "scottish-setting", "female-protagonist", "serial-killer", "series-detective"]
  ),
  // Peter Robinson (17)
  ...authorCluster(idsFor("Peter Robinson"),
    { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 4, pace: 5, moral_complexity: 5, fabulism: 1, emotional_register: 4, interiority: 5, tone: 3, difficulty: 2 },
    ["police-procedural", "male-protagonist", "british-setting", "yorkshire-setting", "series-detective", "rural"]
  ),
  // Dorothy Gilman (14)
  ...authorCluster(idsFor("Dorothy Gilman"),
    { prose_craft: 5, prose_style: 3, warmth: 7, intensity: 3, pace: 6, moral_complexity: 4, fabulism: 1, emotional_register: 6, interiority: 4, tone: 7, difficulty: 1 },
    ["cozy-mystery", "female-protagonist", "elderly-protagonist", "espionage", "adventure", "witty-prose", "globe-trotting"]
  ),
  // Jo Nesbø (14)
  ...authorCluster(idsFor("Jo Nesbø"),
    { prose_craft: 5, prose_style: 4, warmth: 3, intensity: 7, pace: 7, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 5, tone: 2, difficulty: 3 },
    ["police-procedural", "male-protagonist", "translated-from", "norwegian-setting", "series-detective", "serial-killer", "violence", "nordic-noir"]
  ),
  // Stuart MacBride (15)
  ...authorCluster(idsFor("Stuart MacBride"),
    { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 6, pace: 6, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 4, tone: 4, difficulty: 2 },
    ["police-procedural", "male-protagonist", "scottish-setting", "series-detective", "violence", "dark-humor"]
  ),

  // === THRILLER (remaining) ===
  // Dean Koontz (36)
  ...authorCluster(idsFor("Dean Koontz"),
    { prose_craft: 4, prose_style: 4, warmth: 5, intensity: 6, pace: 7, moral_complexity: 4, fabulism: 3, emotional_register: 4, interiority: 4, tone: 3, difficulty: 2 },
    ["thriller", "supernatural-horror", "male-protagonist", "near-future", "action", "good-vs-evil"]
  ),
  // Nora Roberts / J.D. Robb (50)
  ...authorCluster(idsFor("Nora Roberts"),
    { prose_craft: 4, prose_style: 3, warmth: 7, intensity: 4, pace: 6, moral_complexity: 4, fabulism: 1, emotional_register: 6, interiority: 4, tone: 5, difficulty: 1 },
    ["romance", "female-protagonist", "HEA", "domestic", "contemporary-setting"]
  ),
  // Sandra Brown (20)
  ...authorCluster(idsFor("Sandra Brown"),
    { prose_craft: 4, prose_style: 3, warmth: 5, intensity: 6, pace: 7, moral_complexity: 4, fabulism: 1, emotional_register: 4, interiority: 4, tone: 3, difficulty: 1 },
    ["romantic-suspense", "female-protagonist", "american-setting", "ticking-clock", "romance-subplot"]
  ),
  // Vince Flynn (14)
  ...authorCluster(idsFor("Vince Flynn"),
    { prose_craft: 4, prose_style: 3, warmth: 4, intensity: 6, pace: 8, moral_complexity: 4, fabulism: 1, emotional_register: 3, interiority: 3, tone: 3, difficulty: 2 },
    ["thriller", "male-protagonist", "espionage", "action", "ticking-clock", "political-intrigue", "CIA"]
  ),
  // Freida McFadden (14)
  ...authorCluster(idsFor("Freida McFadden"),
    { prose_craft: 4, prose_style: 3, warmth: 4, intensity: 6, pace: 8, moral_complexity: 5, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 1 },
    ["domestic-thriller", "female-protagonist", "twist-ending", "unreliable-narrator", "contemporary-setting"]
  ),
  // Iris Johansen (15)
  ...authorCluster(idsFor("Iris Johansen"),
    { prose_craft: 4, prose_style: 3, warmth: 5, intensity: 6, pace: 7, moral_complexity: 4, fabulism: 1, emotional_register: 4, interiority: 4, tone: 3, difficulty: 1 },
    ["thriller", "female-protagonist", "series-detective", "action", "romance-subplot"]
  ),
  // Tami Hoag (14)
  ...authorCluster(idsFor("Tami Hoag"),
    { prose_craft: 4, prose_style: 3, warmth: 4, intensity: 6, pace: 7, moral_complexity: 5, fabulism: 1, emotional_register: 3, interiority: 5, tone: 2, difficulty: 2 },
    ["thriller", "female-protagonist", "serial-killer", "police-procedural", "american-setting"]
  ),

  // === HORROR ===
  // Anne Rice (14)
  ...authorCluster(idsFor("Anne Rice"),
    { prose_craft: 6, prose_style: 6, warmth: 5, intensity: 6, pace: 4, moral_complexity: 7, fabulism: 7, emotional_register: 4, interiority: 7, tone: 3, difficulty: 4 },
    ["gothic-horror", "vampires", "male-protagonist", "first-person", "new-orleans-setting", "historical-fantasy", "lyrical-prose", "immortality"]
  ),
  // Robert McCammon (remaining 14)
  ...authorCluster(idsFor("Robert R. McCammon"),
    { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 7, pace: 6, moral_complexity: 6, fabulism: 4, emotional_register: 3, interiority: 5, tone: 3, difficulty: 4 },
    ["supernatural-horror", "american-setting", "ensemble-cast", "small-town"]
  ),

  // === ROMANCE ===
  // Colleen Hoover (21)
  ...authorCluster(idsFor("Colleen Hoover"),
    { prose_craft: 4, prose_style: 3, warmth: 6, intensity: 6, pace: 7, moral_complexity: 5, fabulism: 1, emotional_register: 4, interiority: 6, tone: 3, difficulty: 1 },
    ["romance", "female-protagonist", "first-person", "domestic-thriller", "contemporary-setting", "twist-ending"]
  ),
  // Nicholas Sparks (20)
  ...authorCluster(idsFor("Nicholas Sparks"),
    { prose_craft: 4, prose_style: 3, warmth: 8, intensity: 3, pace: 5, moral_complexity: 3, fabulism: 1, emotional_register: 4, interiority: 4, tone: 3, difficulty: 1 },
    ["romance", "american-setting", "southern-setting", "love-story", "domestic", "HEA"]
  ),
  // Debbie Macomber (20)
  ...authorCluster(idsFor("Debbie Macomber"),
    { prose_craft: 3, prose_style: 2, warmth: 9, intensity: 1, pace: 5, moral_complexity: 3, fabulism: 1, emotional_register: 7, interiority: 4, tone: 6, difficulty: 1 },
    ["romance", "female-protagonist", "small-town", "community", "HEA", "domestic", "cozy"]
  ),
  // J.R. Ward (15)
  ...authorCluster(idsFor("J.R. Ward"),
    { prose_craft: 4, prose_style: 4, warmth: 5, intensity: 7, pace: 7, moral_complexity: 5, fabulism: 7, emotional_register: 5, interiority: 5, tone: 4, difficulty: 2 },
    ["paranormal-romance", "vampires", "male-protagonist", "urban-fantasy", "steamy", "ensemble-cast", "action"]
  ),

  // === NON-FICTION ===
  // Bill Bryson (14)
  ...authorCluster(idsFor("Bill Bryson"),
    { prose_craft: 7, prose_style: 4, warmth: 7, intensity: 1, pace: 5, moral_complexity: 4, fabulism: 0, emotional_register: 6, interiority: 4, tone: 8, difficulty: 2 },
    ["narrative-nonfiction", "witty-prose", "science-writing", "academic-accessible", "american-setting", "british-setting"]
  ),

  // === YOUNG ADULT ===
  // Rick Riordan (21)
  ...authorCluster(idsFor("Rick Riordan"),
    { prose_craft: 5, prose_style: 3, warmth: 7, intensity: 4, pace: 8, moral_complexity: 4, fabulism: 8, emotional_register: 6, interiority: 4, tone: 7, difficulty: 1 },
    ["YA-fantasy", "male-protagonist", "mythology", "quest", "ensemble-cast", "coming-of-age", "witty-prose"]
  ),

  // === MISC BIG AUTHORS ===
  // Sophie Kinsella (15)
  ...authorCluster(idsFor("Sophie Kinsella"),
    { prose_craft: 4, prose_style: 3, warmth: 7, intensity: 2, pace: 7, moral_complexity: 3, fabulism: 1, emotional_register: 7, interiority: 4, tone: 8, difficulty: 1 },
    ["rom-com", "female-protagonist", "first-person", "british-setting", "london-setting", "witty-prose", "contemporary-setting"]
  ),
  // Jodi Picoult (13)
  ...authorCluster(idsFor("Jodi Picoult"),
    { prose_craft: 5, prose_style: 3, warmth: 5, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 5, tone: 3, difficulty: 2 },
    ["literary-fiction", "multi-pov", "american-setting", "domestic", "moral-dilemma", "family", "issue-driven-YA"]
  ),
  // Jeffrey Archer (12)
  ...authorCluster(idsFor("Jeffrey Archer"),
    { prose_craft: 4, prose_style: 3, warmth: 4, intensity: 4, pace: 7, moral_complexity: 5, fabulism: 1, emotional_register: 4, interiority: 3, tone: 4, difficulty: 2 },
    ["thriller", "male-protagonist", "british-setting", "political-intrigue", "rags-to-riches", "ensemble-cast"]
  ),
  // Paulo Coelho (8)
  ...authorCluster(idsFor("Paulo Coelho"),
    { prose_craft: 4, prose_style: 3, warmth: 7, intensity: 2, pace: 5, moral_complexity: 3, fabulism: 4, emotional_register: 5, interiority: 5, tone: 4, difficulty: 1 },
    ["literary-fiction", "translated-from", "male-protagonist", "spiritual", "quest", "philosophical", "allegorical"]
  ),
  // Matt Haig (6)
  ...authorCluster(idsFor("Matt Haig"),
    { prose_craft: 5, prose_style: 3, warmth: 8, intensity: 2, pace: 5, moral_complexity: 4, fabulism: 4, emotional_register: 6, interiority: 5, tone: 6, difficulty: 2 },
    ["literary-fiction", "british-setting", "male-protagonist", "mental-illness", "warm", "hopeful", "contemporary-setting"]
  ),
  // John Grisham (remaining from Fiction)
  ...authorCluster(idsFor("John Grisham"),
    { prose_craft: 4, prose_style: 3, warmth: 4, intensity: 5, pace: 8, moral_complexity: 5, fabulism: 1, emotional_register: 4, interiority: 4, tone: 3, difficulty: 2 },
    ["legal-thriller", "male-protagonist", "american-setting", "southern-setting", "ticking-clock", "conspiracy"]
  ),
};

const merged = { ...existing, ...batch };
fs.writeFileSync(SIDECAR, JSON.stringify(merged, null, 2));

const before = Object.keys(existing).length;
const after = Object.keys(merged).length;
console.log("Before:", before, "| Added:", Object.keys(batch).length, "| After:", after);
