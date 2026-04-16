const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const existing = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
const PRIMARY = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "public", "book-data.json"), "utf8"));

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

function idsFor(author) {
  return PRIMARY.filter(b => b.author === author && !existing[String(b.id)]).map(b => b.id);
}

const batch = {
  // === FANTASY ===

  // Terry Pratchett (remaining ~43)
  ...authorCluster(idsFor("Terry Pratchett"),
    { prose_craft: 7, prose_style: 5, warmth: 8, intensity: 3, pace: 6, moral_complexity: 6, fabulism: 10, emotional_register: 7, interiority: 4, tone: 9, difficulty: 3 },
    ["comic-fantasy", "secondary-world", "satirical", "witty-prose", "absurdist", "ensemble-cast", "warm"]
  ),
  // Robin Hobb
  ...authorCluster(idsFor("Robin Hobb"),
    { prose_craft: 7, prose_style: 6, warmth: 6, intensity: 6, pace: 4, moral_complexity: 7, fabulism: 9, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 },
    ["epic-fantasy", "secondary-world", "male-protagonist", "first-person", "coming-of-age", "political-intrigue", "assassin-protagonist", "animals"]
  ),
  // Brandon Sanderson (remaining)
  ...authorCluster(idsFor("Brandon Sanderson"),
    { prose_craft: 4, prose_style: 5, warmth: 7, intensity: 5, pace: 6, moral_complexity: 6, fabulism: 9, emotional_register: 5, interiority: 5, tone: 4, difficulty: 4 },
    ["epic-fantasy", "hard-magic", "magic-system-focused", "secondary-world", "ensemble-cast", "doorstopper"]
  ),
  // Guy Gavriel Kay (remaining)
  ...authorCluster(idsFor("Guy Gavriel Kay"),
    { prose_craft: 8, prose_style: 7, warmth: 6, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 7, emotional_register: 4, interiority: 6, tone: 3, difficulty: 5 },
    ["historical-fantasy", "secondary-world", "lyrical-prose", "political-intrigue", "multi-pov", "romance-subplot"]
  ),
  // Jim Butcher — Dresden Files
  ...authorCluster(idsFor("Jim Butcher"),
    { prose_craft: 5, prose_style: 4, warmth: 6, intensity: 6, pace: 8, moral_complexity: 5, fabulism: 8, emotional_register: 5, interiority: 5, tone: 6, difficulty: 3 },
    ["urban-fantasy", "male-protagonist", "first-person", "witty-prose", "action", "noir", "chicago-setting", "magic-system-focused"]
  ),
  // Naomi Novik
  ...authorCluster(idsFor("Naomi Novik"),
    { prose_craft: 6, prose_style: 5, warmth: 6, intensity: 5, pace: 6, moral_complexity: 6, fabulism: 9, emotional_register: 5, interiority: 5, tone: 5, difficulty: 3 },
    ["fantasy", "female-protagonist", "secondary-world", "quest", "romance-subplot"]
  ),
  // Diana Wynne Jones
  ...authorCluster(idsFor("Diana Wynne Jones"),
    { prose_craft: 7, prose_style: 4, warmth: 7, intensity: 3, pace: 6, moral_complexity: 5, fabulism: 9, emotional_register: 6, interiority: 5, tone: 7, difficulty: 3 },
    ["YA-fantasy", "secondary-world", "witty-prose", "whimsical", "coming-of-age", "magic-system-focused"]
  ),
  // Michael Moorcock
  ...authorCluster(idsFor("Michael Moorcock"),
    { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 6, pace: 7, moral_complexity: 7, fabulism: 9, emotional_register: 4, interiority: 5, tone: 4, difficulty: 4 },
    ["sword-and-sorcery", "secondary-world", "male-protagonist", "antihero", "multiverse", "dark-fantasy", "morally-gray-protagonist"]
  ),
  // Leigh Bardugo
  ...authorCluster(idsFor("Leigh Bardugo"),
    { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 6, pace: 7, moral_complexity: 6, fabulism: 9, emotional_register: 4, interiority: 5, tone: 4, difficulty: 3 },
    ["YA-fantasy", "secondary-world", "ensemble-cast", "heist", "magic-system-focused", "political-intrigue"]
  ),
  // Sarah J. Maas
  ...authorCluster(idsFor("Sarah J. Maas"),
    { prose_craft: 4, prose_style: 4, warmth: 7, intensity: 6, pace: 7, moral_complexity: 5, fabulism: 9, emotional_register: 5, interiority: 6, tone: 5, difficulty: 3 },
    ["romantasy", "female-protagonist", "first-person", "faerie-courts", "enemies-to-lovers", "steamy", "ensemble-cast"]
  ),
  // Ben Aaronovitch — Rivers of London
  ...authorCluster(idsFor("Ben Aaronovitch"),
    { prose_craft: 5, prose_style: 4, warmth: 6, intensity: 5, pace: 7, moral_complexity: 5, fabulism: 7, emotional_register: 5, interiority: 4, tone: 6, difficulty: 3 },
    ["urban-fantasy", "male-protagonist", "first-person", "police-procedural", "london-setting", "witty-prose", "magic-system-focused"]
  ),
  // Terry Brooks
  ...authorCluster(idsFor("Terry Brooks"),
    { prose_craft: 4, prose_style: 4, warmth: 6, intensity: 5, pace: 6, moral_complexity: 4, fabulism: 9, emotional_register: 5, interiority: 4, tone: 4, difficulty: 3 },
    ["epic-fantasy", "secondary-world", "quest", "chosen-one", "high-fantasy", "ensemble-cast"]
  ),
  // Terry Goodkind
  ...authorCluster(idsFor("Terry Goodkind"),
    { prose_craft: 4, prose_style: 4, warmth: 5, intensity: 7, pace: 6, moral_complexity: 4, fabulism: 9, emotional_register: 4, interiority: 4, tone: 3, difficulty: 3 },
    ["epic-fantasy", "secondary-world", "male-protagonist", "chosen-one", "magic-system-focused", "doorstopper", "violence"]
  ),
  // R.A. Salvatore
  ...authorCluster(idsFor("R.A. Salvatore"),
    { prose_craft: 4, prose_style: 4, warmth: 5, intensity: 6, pace: 7, moral_complexity: 4, fabulism: 9, emotional_register: 5, interiority: 4, tone: 4, difficulty: 2 },
    ["epic-fantasy", "secondary-world", "male-protagonist", "elves", "sword-and-sorcery", "action", "quest"]
  ),
  // Michael J. Sullivan
  ...authorCluster(idsFor("Michael J. Sullivan"),
    { prose_craft: 5, prose_style: 4, warmth: 6, intensity: 5, pace: 7, moral_complexity: 5, fabulism: 9, emotional_register: 5, interiority: 4, tone: 5, difficulty: 3 },
    ["epic-fantasy", "secondary-world", "male-protagonist", "heist", "friendship", "ensemble-cast", "quest"]
  ),
  // Cassandra Clare
  ...authorCluster(idsFor("Cassandra Clare"),
    { prose_craft: 4, prose_style: 4, warmth: 6, intensity: 5, pace: 7, moral_complexity: 5, fabulism: 8, emotional_register: 5, interiority: 5, tone: 5, difficulty: 2 },
    ["YA-fantasy", "urban-fantasy", "ensemble-cast", "new-york-setting", "romance-subplot", "demons", "angels"]
  ),

  // === SCI-FI ===

  // Philip K. Dick
  ...authorCluster(idsFor("Philip K. Dick"),
    { prose_craft: 6, prose_style: 4, warmth: 3, intensity: 5, pace: 6, moral_complexity: 8, fabulism: 7, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 },
    ["soft-sf", "near-future", "male-protagonist", "identity", "paranoia", "philosophical-sf", "alienation"]
  ),
  // Robert A. Heinlein
  ...authorCluster(idsFor("Robert A. Heinlein"),
    { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 4, pace: 6, moral_complexity: 6, fabulism: 8, emotional_register: 5, interiority: 4, tone: 5, difficulty: 4 },
    ["hard-sf", "space-opera", "male-protagonist", "libertarian", "ideas-driven", "far-future"]
  ),
  // Isaac Asimov (remaining)
  ...authorCluster(idsFor("Isaac Asimov"),
    { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 3, pace: 6, moral_complexity: 6, fabulism: 8, emotional_register: 5, interiority: 4, tone: 4, difficulty: 4 },
    ["hard-sf", "space-opera", "ideas-driven", "far-future", "ensemble-cast"]
  ),
  // Arthur C. Clarke
  ...authorCluster(idsFor("Arthur C. Clarke"),
    { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 3, pace: 5, moral_complexity: 6, fabulism: 8, emotional_register: 4, interiority: 4, tone: 3, difficulty: 4 },
    ["hard-sf", "space-opera", "far-future", "first-contact", "ideas-driven", "sense-of-wonder"]
  ),
  // Gene Wolfe
  ...authorCluster(idsFor("Gene Wolfe"),
    { prose_craft: 10, prose_style: 8, warmth: 4, intensity: 5, pace: 3, moral_complexity: 9, fabulism: 9, emotional_register: 3, interiority: 8, tone: 3, difficulty: 9 },
    ["far-future", "first-person", "unreliable-narrator", "baroque-prose", "literary-sf", "philosophical", "morally-gray-protagonist"]
  ),
  // Ursula K. Le Guin (remaining)
  ...authorCluster(idsFor("Ursula K. Le Guin"),
    { prose_craft: 8, prose_style: 5, warmth: 6, intensity: 3, pace: 3, moral_complexity: 8, fabulism: 8, emotional_register: 4, interiority: 7, tone: 3, difficulty: 5 },
    ["soft-sf", "philosophical-sf", "anthropological-sf", "feminist", "lyrical-prose"]
  ),
  // Octavia Butler
  ...authorCluster(idsFor("Octavia Butler"),
    { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 7, pace: 5, moral_complexity: 9, fabulism: 7, emotional_register: 3, interiority: 7, tone: 2, difficulty: 5 },
    ["soft-sf", "female-protagonist", "Black-protagonist", "slavery", "oppression", "identity", "biological"]
  ),
  // Iain M. Banks — Culture novels
  ...authorCluster(idsFor("Iain M. Banks"),
    { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 6, pace: 5, moral_complexity: 8, fabulism: 9, emotional_register: 4, interiority: 5, tone: 4, difficulty: 6 },
    ["space-opera", "far-future", "AI", "utopian", "political-sf", "multi-pov", "ensemble-cast", "worldbuilding-heavy"]
  ),
  // Alastair Reynolds
  ...authorCluster(idsFor("Alastair Reynolds"),
    { prose_craft: 6, prose_style: 5, warmth: 3, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 9, emotional_register: 3, interiority: 5, tone: 3, difficulty: 5 },
    ["hard-sf", "space-opera", "far-future", "worldbuilding-heavy", "AI", "ensemble-cast"]
  ),
  // John Scalzi
  ...authorCluster(idsFor("John Scalzi"),
    { prose_craft: 5, prose_style: 4, warmth: 6, intensity: 5, pace: 7, moral_complexity: 5, fabulism: 8, emotional_register: 5, interiority: 4, tone: 6, difficulty: 3 },
    ["space-opera", "military-sf", "first-person", "witty-prose", "action", "far-future", "aliens"]
  ),
  // Kim Stanley Robinson
  ...authorCluster(idsFor("Kim Stanley Robinson"),
    { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 3, pace: 3, moral_complexity: 7, fabulism: 7, emotional_register: 4, interiority: 5, tone: 3, difficulty: 6 },
    ["hard-sf", "near-future", "ecological", "political-sf", "climate-fiction", "ensemble-cast", "worldbuilding-heavy"]
  ),
  // Frank Herbert (remaining)
  ...authorCluster(idsFor("Frank Herbert"),
    { prose_craft: 7, prose_style: 7, warmth: 4, intensity: 5, pace: 4, moral_complexity: 8, fabulism: 9, emotional_register: 4, interiority: 6, tone: 2, difficulty: 7 },
    ["space-opera", "far-future", "political-intrigue", "ecological", "philosophical-sf", "worldbuilding-heavy"]
  ),
  // Frederik Pohl
  ...authorCluster(idsFor("Frederik Pohl"),
    { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 4, pace: 6, moral_complexity: 6, fabulism: 8, emotional_register: 4, interiority: 5, tone: 4, difficulty: 4 },
    ["soft-sf", "near-future", "satirical", "ideas-driven", "male-protagonist"]
  ),
  // Adrian Tchaikovsky (remaining)
  ...authorCluster(idsFor("Adrian Tchaikovsky"),
    { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 9, emotional_register: 4, interiority: 5, tone: 4, difficulty: 5 },
    ["hard-sf", "far-future", "aliens", "evolution", "multi-pov", "worldbuilding-heavy"]
  ),
  // Orson Scott Card
  ...authorCluster(idsFor("Orson Scott Card"),
    { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 5, pace: 6, moral_complexity: 6, fabulism: 8, emotional_register: 5, interiority: 5, tone: 3, difficulty: 3 },
    ["space-opera", "male-protagonist", "child-protagonist", "military-sf", "aliens", "coming-of-age"]
  ),
  // David Brin
  ...authorCluster(idsFor("David Brin"),
    { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 5, pace: 6, moral_complexity: 6, fabulism: 8, emotional_register: 4, interiority: 4, tone: 4, difficulty: 4 },
    ["hard-sf", "space-opera", "far-future", "aliens", "uplift", "worldbuilding-heavy", "ensemble-cast"]
  ),
  // Greg Bear
  ...authorCluster(idsFor("Greg Bear"),
    { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 8, emotional_register: 4, interiority: 5, tone: 3, difficulty: 5 },
    ["hard-sf", "near-future", "biological", "ideas-driven", "worldbuilding-heavy"]
  ),
  // Peter F. Hamilton
  ...authorCluster(idsFor("Peter F. Hamilton"),
    { prose_craft: 5, prose_style: 5, warmth: 4, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 9, emotional_register: 4, interiority: 4, tone: 3, difficulty: 5 },
    ["space-opera", "far-future", "ensemble-cast", "multi-pov", "doorstopper", "worldbuilding-heavy", "action"]
  ),
  // C.J. Cherryh
  ...authorCluster(idsFor("C.J. Cherryh"),
    { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 8, emotional_register: 3, interiority: 6, tone: 3, difficulty: 6 },
    ["space-opera", "far-future", "aliens", "political-intrigue", "anthropological-sf", "worldbuilding-heavy"]
  ),
  // Ray Bradbury (remaining)
  ...authorCluster(idsFor("Ray Bradbury"),
    { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 6, emotional_register: 5, interiority: 5, tone: 5, difficulty: 3 },
    ["soft-sf", "vignettes", "american-setting", "lyrical-prose", "nostalgia", "small-town"]
  ),

  // === THRILLER ===

  // John le Carré
  ...authorCluster(idsFor("John le Carré"),
    { prose_craft: 8, prose_style: 5, warmth: 4, intensity: 5, pace: 4, moral_complexity: 9, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 },
    ["espionage", "male-protagonist", "british-setting", "cold-war-era", "political-intrigue", "moral-dilemma", "restrained-prose"]
  ),
  // Michael Connelly
  ...authorCluster(idsFor("Michael Connelly"),
    { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 6, pace: 7, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 2 },
    ["police-procedural", "male-protagonist", "los-angeles-setting", "series-detective", "noir"]
  ),
  // Lee Child
  ...authorCluster(idsFor("Lee Child"),
    { prose_craft: 3, prose_style: 2, warmth: 3, intensity: 6, pace: 10, moral_complexity: 3, fabulism: 1, emotional_register: 3, interiority: 3, tone: 3, difficulty: 1 },
    ["thriller", "male-protagonist", "first-person", "drifter-protagonist", "action", "ticking-clock", "american-setting"]
  ),
  // Harlan Coben
  ...authorCluster(idsFor("Harlan Coben"),
    { prose_craft: 4, prose_style: 3, warmth: 5, intensity: 6, pace: 8, moral_complexity: 5, fabulism: 1, emotional_register: 4, interiority: 4, tone: 3, difficulty: 2 },
    ["domestic-thriller", "male-protagonist", "missing-person", "twist-ending", "suburban", "family"]
  ),
  // James Patterson
  ...authorCluster(idsFor("James Patterson"),
    { prose_craft: 3, prose_style: 2, warmth: 4, intensity: 6, pace: 9, moral_complexity: 4, fabulism: 1, emotional_register: 3, interiority: 3, tone: 3, difficulty: 1 },
    ["thriller", "male-protagonist", "short-chapters", "serial-killer", "action", "ticking-clock"]
  ),
  // David Baldacci
  ...authorCluster(idsFor("David Baldacci"),
    { prose_craft: 4, prose_style: 3, warmth: 4, intensity: 6, pace: 8, moral_complexity: 5, fabulism: 1, emotional_register: 3, interiority: 4, tone: 3, difficulty: 2 },
    ["thriller", "male-protagonist", "conspiracy", "action", "american-setting"]
  ),
  // Daniel Silva
  ...authorCluster(idsFor("Daniel Silva"),
    { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 6, pace: 7, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 3 },
    ["espionage", "male-protagonist", "series-detective", "israeli-setting", "political-intrigue", "art-world"]
  ),
  // Karin Slaughter
  ...authorCluster(idsFor("Karin Slaughter"),
    { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 8, pace: 7, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 5, tone: 2, difficulty: 2 },
    ["thriller", "female-protagonist", "serial-killer", "violence", "southern-setting", "forensic-protagonist"]
  ),

  // === MYSTERY ===

  // Agatha Christie
  ...authorCluster(idsFor("Agatha Christie"),
    { prose_craft: 6, prose_style: 4, warmth: 5, intensity: 3, pace: 6, moral_complexity: 5, fabulism: 1, emotional_register: 4, interiority: 4, tone: 5, difficulty: 2 },
    ["cozy-mystery", "whodunit", "ensemble-cast", "british-setting", "series-detective", "twist-ending"]
  ),

  // === HORROR ===

  // Stephen King (remaining)
  ...authorCluster(idsFor("Stephen King"),
    { prose_craft: 6, prose_style: 5, warmth: 6, intensity: 7, pace: 5, moral_complexity: 6, fabulism: 5, emotional_register: 3, interiority: 5, tone: 3, difficulty: 3 },
    ["supernatural-horror", "american-setting", "small-town", "ensemble-cast", "coming-of-age"]
  ),

  // === ROMANCE ===

  // Danielle Steel
  ...authorCluster(idsFor("Danielle Steel"),
    { prose_craft: 3, prose_style: 3, warmth: 7, intensity: 4, pace: 6, moral_complexity: 3, fabulism: 1, emotional_register: 6, interiority: 4, tone: 5, difficulty: 1 },
    ["romance", "female-protagonist", "domestic", "family-saga", "wealth", "contemporary-setting"]
  ),

  // === NON-FICTION ===

  // Jon Krakauer (remaining)
  ...authorCluster(idsFor("Jon Krakauer"),
    { prose_craft: 7, prose_style: 4, warmth: 5, intensity: 6, pace: 6, moral_complexity: 7, fabulism: 0, emotional_register: 3, interiority: 5, tone: 3, difficulty: 3 },
    ["narrative-nonfiction", "deeply-researched", "adventure", "survival", "american-setting"]
  ),
};

const merged = { ...existing, ...batch };
fs.writeFileSync(SIDECAR, JSON.stringify(merged, null, 2));

const before = Object.keys(existing).length;
const after = Object.keys(merged).length;
console.log("Before:", before, "| Added:", Object.keys(batch).length, "| After:", after);
