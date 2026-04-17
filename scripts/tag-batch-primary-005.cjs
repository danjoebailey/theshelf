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
  // === LITERARY FICTION — next wave ===

  // Anthony Trollope — Victorian realism
  ...authorCluster(idsFor("Anthony Trollope"),
    { prose_craft: 7, prose_style: 6, warmth: 6, intensity: 3, pace: 3, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 6, tone: 5, difficulty: 5 },
    ["literary-fiction", "british-setting", "victorian-setting", "ensemble-cast", "class", "political-intrigue", "marriage", "church-setting", "social-panorama"]
  ),
  // Dostoevsky (remaining 12)
  ...authorCluster(idsFor("Fyodor Dostoevsky"),
    { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 6, pace: 4, moral_complexity: 9, fabulism: 1, emotional_register: 3, interiority: 8, tone: 3, difficulty: 6 },
    ["literary-fiction", "translated-from", "russian-setting", "male-protagonist", "philosophical", "psychological"]
  ),
  // Virginia Woolf (remaining)
  ...authorCluster(idsFor("Virginia Woolf"),
    { prose_craft: 10, prose_style: 8, warmth: 5, intensity: 3, pace: 2, moral_complexity: 7, fabulism: 2, emotional_register: 4, interiority: 10, tone: 3, difficulty: 7 },
    ["literary-fiction", "british-setting", "stream-of-consciousness", "modernist", "domestic", "lyrical-prose"]
  ),
  // F. Scott Fitzgerald (remaining)
  ...authorCluster(idsFor("F. Scott Fitzgerald"),
    { prose_craft: 9, prose_style: 6, warmth: 4, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 6, tone: 4, difficulty: 4 },
    ["literary-fiction", "american-setting", "1920s-setting", "wealth", "class", "lost-generation", "lyrical-prose"]
  ),
  // García Márquez (remaining)
  ...authorCluster(idsFor("Gabriel García Márquez"),
    { prose_craft: 8, prose_style: 7, warmth: 6, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 5, emotional_register: 4, interiority: 5, tone: 4, difficulty: 5 },
    ["literary-fiction", "translated-from", "colombian-setting", "magical-realism", "family-saga", "community", "lyrical-prose"]
  ),
  // Barbara Kingsolver
  ...authorCluster(idsFor("Barbara Kingsolver"),
    { prose_craft: 7, prose_style: 5, warmth: 7, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 5, interiority: 6, tone: 4, difficulty: 3 },
    ["literary-fiction", "american-setting", "female-protagonist", "community", "ecological", "social-realism", "family"]
  ),
  // Ann Patchett
  ...authorCluster(idsFor("Ann Patchett"),
    { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 5, interiority: 6, tone: 4, difficulty: 3 },
    ["literary-fiction", "american-setting", "ensemble-cast", "family", "domestic", "quiet-drama"]
  ),
  // A.S. Byatt
  ...authorCluster(idsFor("A.S. Byatt"),
    { prose_craft: 8, prose_style: 7, warmth: 4, intensity: 3, pace: 3, moral_complexity: 7, fabulism: 2, emotional_register: 4, interiority: 7, tone: 3, difficulty: 6 },
    ["literary-fiction", "british-setting", "academia", "dual-timeline", "dense-prose", "victorian-setting", "intellectual"]
  ),
  // Richard Russo (remaining)
  ...authorCluster(idsFor("Richard Russo"),
    { prose_craft: 7, prose_style: 4, warmth: 8, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 5, interiority: 6, tone: 5, difficulty: 3 },
    ["literary-fiction", "american-setting", "new-england-setting", "small-town", "working-class", "ensemble-cast", "witty-prose", "domestic"]
  ),
  // Ivan Turgenev
  ...authorCluster(idsFor("Ivan Turgenev"),
    { prose_craft: 8, prose_style: 5, warmth: 5, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 7, tone: 3, difficulty: 5 },
    ["literary-fiction", "translated-from", "russian-setting", "male-protagonist", "19th-century", "generational-conflict", "rural", "restrained-prose"]
  ),
  // Lorrie Moore
  ...authorCluster(idsFor("Lorrie Moore"),
    { prose_craft: 8, prose_style: 5, warmth: 5, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 7, tone: 6, difficulty: 4 },
    ["vignettes", "female-protagonist", "american-setting", "domestic", "witty-prose", "dark-humor", "marriage"]
  ),
  // Tom Robbins
  ...authorCluster(idsFor("Tom Robbins"),
    { prose_craft: 6, prose_style: 7, warmth: 6, intensity: 3, pace: 4, moral_complexity: 5, fabulism: 4, emotional_register: 5, interiority: 5, tone: 9, difficulty: 4 },
    ["literary-fiction", "american-setting", "absurdist", "whimsical", "philosophical", "baroque-prose", "counterculture"]
  ),
  // John Banville
  ...authorCluster(idsFor("John Banville"),
    { prose_craft: 9, prose_style: 8, warmth: 3, intensity: 3, pace: 2, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 9, tone: 3, difficulty: 6 },
    ["literary-fiction", "irish-setting", "male-protagonist", "first-person", "baroque-prose", "memory", "guilt", "dense-prose"]
  ),
  // Nathaniel Hawthorne
  ...authorCluster(idsFor("Nathaniel Hawthorne"),
    { prose_craft: 7, prose_style: 7, warmth: 4, intensity: 4, pace: 3, moral_complexity: 8, fabulism: 2, emotional_register: 3, interiority: 7, tone: 2, difficulty: 5 },
    ["literary-fiction", "american-setting", "new-england-setting", "19th-century", "guilt", "puritanism", "moral-dilemma", "gothic-atmosphere"]
  ),
  // Aldous Huxley
  ...authorCluster(idsFor("Aldous Huxley"),
    { prose_craft: 7, prose_style: 6, warmth: 3, intensity: 3, pace: 5, moral_complexity: 7, fabulism: 4, emotional_register: 3, interiority: 6, tone: 5, difficulty: 5 },
    ["literary-fiction", "british-setting", "satirical", "dystopian", "philosophical", "ideas-driven"]
  ),
  // Clarice Lispector
  ...authorCluster(idsFor("Clarice Lispector"),
    { prose_craft: 9, prose_style: 7, warmth: 4, intensity: 4, pace: 2, moral_complexity: 7, fabulism: 3, emotional_register: 3, interiority: 10, tone: 3, difficulty: 7 },
    ["literary-fiction", "translated-from", "brazilian-setting", "female-protagonist", "stream-of-consciousness", "existential", "lyrical-prose", "philosophical"]
  ),
  // Daphne du Maurier
  ...authorCluster(idsFor("Daphne du Maurier"),
    { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 6, pace: 5, moral_complexity: 6, fabulism: 2, emotional_register: 3, interiority: 6, tone: 3, difficulty: 3 },
    ["gothic-atmosphere", "british-setting", "female-protagonist", "domestic", "psychological", "atmospheric", "suspense"]
  ),
  // J.G. Ballard
  ...authorCluster(idsFor("J.G. Ballard"),
    { prose_craft: 7, prose_style: 5, warmth: 2, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 5, emotional_register: 2, interiority: 6, tone: 3, difficulty: 5 },
    ["literary-fiction", "british-setting", "near-future", "dystopian", "suburban", "psychological", "alienation"]
  ),
  // James Baldwin
  ...authorCluster(idsFor("James Baldwin"),
    { prose_craft: 9, prose_style: 6, warmth: 5, intensity: 7, pace: 4, moral_complexity: 9, fabulism: 1, emotional_register: 3, interiority: 8, tone: 2, difficulty: 5 },
    ["literary-fiction", "Black-protagonist", "american-setting", "race", "sexuality", "identity", "lyrical-prose", "queer-protagonist"]
  ),
  // Norman Mailer
  ...authorCluster(idsFor("Norman Mailer"),
    { prose_craft: 7, prose_style: 7, warmth: 3, intensity: 7, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 6 },
    ["literary-fiction", "male-protagonist", "american-setting", "masculinity", "war", "dense-prose", "political-intrigue"]
  ),
  // Michael Chabon
  ...authorCluster(idsFor("Michael Chabon"),
    { prose_craft: 8, prose_style: 7, warmth: 6, intensity: 3, pace: 5, moral_complexity: 6, fabulism: 2, emotional_register: 5, interiority: 6, tone: 5, difficulty: 5 },
    ["literary-fiction", "american-setting", "male-protagonist", "baroque-prose", "witty-prose", "nostalgia", "genre-bending"]
  ),
  // Colm Tóibín
  ...authorCluster(idsFor("Colm Tóibín"),
    { prose_craft: 8, prose_style: 4, warmth: 5, intensity: 3, pace: 3, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 8, tone: 3, difficulty: 4 },
    ["literary-fiction", "irish-setting", "male-protagonist", "exile", "restrained-prose", "domestic", "grief", "quiet-drama"]
  ),
  // William Golding (remaining)
  ...authorCluster(idsFor("William Golding"),
    { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 6, pace: 4, moral_complexity: 8, fabulism: 2, emotional_register: 2, interiority: 6, tone: 2, difficulty: 5 },
    ["literary-fiction", "british-setting", "male-protagonist", "allegory", "survival", "moral-dilemma"]
  ),
  // Anton Chekhov
  ...authorCluster(idsFor("Anton Chekhov"),
    { prose_craft: 9, prose_style: 5, warmth: 5, intensity: 3, pace: 3, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 7, tone: 4, difficulty: 4 },
    ["vignettes", "translated-from", "russian-setting", "domestic", "ensemble-cast", "restrained-prose", "quiet-drama", "19th-century"]
  ),
  // Sophocles + Euripides + Aristophanes + Aeschylus — Greek drama
  ...authorCluster(idsFor("Sophocles"),
    { prose_craft: 8, prose_style: 6, warmth: 3, intensity: 7, pace: 5, moral_complexity: 9, fabulism: 5, emotional_register: 2, interiority: 5, tone: 1, difficulty: 5 },
    ["play-format", "translated-from", "ancient-setting", "greek-setting", "tragedy", "mythology", "fate", "gods-walking"]
  ),
  ...authorCluster(idsFor("Euripides"),
    { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 7, pace: 5, moral_complexity: 9, fabulism: 5, emotional_register: 2, interiority: 6, tone: 2, difficulty: 5 },
    ["play-format", "translated-from", "ancient-setting", "greek-setting", "tragedy", "mythology", "feminist", "psychological"]
  ),
  ...authorCluster(idsFor("Aristophanes"),
    { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 3, pace: 6, moral_complexity: 5, fabulism: 5, emotional_register: 5, interiority: 3, tone: 9, difficulty: 4 },
    ["play-format", "translated-from", "ancient-setting", "greek-setting", "comedy", "satirical", "political-intrigue", "absurdist"]
  ),
  ...authorCluster(idsFor("Aeschylus"),
    { prose_craft: 8, prose_style: 7, warmth: 3, intensity: 7, pace: 4, moral_complexity: 9, fabulism: 6, emotional_register: 2, interiority: 5, tone: 1, difficulty: 6 },
    ["play-format", "translated-from", "ancient-setting", "greek-setting", "tragedy", "mythology", "justice", "gods-walking"]
  ),
  // Shakespeare
  ...authorCluster(idsFor("William Shakespeare"),
    { prose_craft: 10, prose_style: 9, warmth: 5, intensity: 6, pace: 5, moral_complexity: 9, fabulism: 3, emotional_register: 4, interiority: 7, tone: 5, difficulty: 6 },
    ["play-format", "british-setting", "poetry", "tragedy", "comedy", "historical-fiction"]
  ),
  // Joy Williams
  ...authorCluster(idsFor("Joy Williams"),
    { prose_craft: 9, prose_style: 5, warmth: 3, intensity: 4, pace: 3, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 7, tone: 3, difficulty: 6 },
    ["literary-fiction", "american-setting", "female-protagonist", "ecological", "alienation", "restrained-prose", "surreal"]
  ),
  // Wendell Berry
  ...authorCluster(idsFor("Wendell Berry"),
    { prose_craft: 8, prose_style: 4, warmth: 9, intensity: 2, pace: 2, moral_complexity: 6, fabulism: 1, emotional_register: 5, interiority: 6, tone: 4, difficulty: 3 },
    ["literary-fiction", "american-setting", "kentucky-setting", "rural", "farming", "community", "pastoral", "multigenerational", "sparse-prose"]
  ),
  // Nick Hornby
  ...authorCluster(idsFor("Nick Hornby"),
    { prose_craft: 6, prose_style: 4, warmth: 7, intensity: 2, pace: 6, moral_complexity: 5, fabulism: 1, emotional_register: 5, interiority: 5, tone: 7, difficulty: 2 },
    ["literary-fiction", "british-setting", "london-setting", "male-protagonist", "first-person", "witty-prose", "music", "contemporary-setting"]
  ),
  // Sinclair Lewis
  ...authorCluster(idsFor("Sinclair Lewis"),
    { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 3, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 5, tone: 5, difficulty: 4 },
    ["literary-fiction", "american-setting", "midwestern-setting", "satirical", "small-town", "social-realism", "class"]
  ),
  // R.K. Narayan
  ...authorCluster(idsFor("R.K. Narayan"),
    { prose_craft: 7, prose_style: 4, warmth: 7, intensity: 2, pace: 4, moral_complexity: 5, fabulism: 1, emotional_register: 5, interiority: 5, tone: 6, difficulty: 3 },
    ["literary-fiction", "indian-setting", "male-protagonist", "small-town", "community", "witty-prose", "warm", "domestic"]
  ),
  // Jean-Paul Sartre
  ...authorCluster(idsFor("Jean-Paul Sartre"),
    { prose_craft: 7, prose_style: 5, warmth: 2, intensity: 4, pace: 4, moral_complexity: 8, fabulism: 1, emotional_register: 2, interiority: 8, tone: 2, difficulty: 6 },
    ["literary-fiction", "translated-from", "french-setting", "male-protagonist", "existential", "philosophical", "freedom", "alienation"]
  ),
  // Thomas McGuane
  ...authorCluster(idsFor("Thomas McGuane"),
    { prose_craft: 8, prose_style: 5, warmth: 4, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 6, tone: 5, difficulty: 4 },
    ["literary-fiction", "american-setting", "montana-setting", "male-protagonist", "western-setting", "witty-prose", "rural", "working-class"]
  ),
  // Kent Haruf (might already be tagged from last session — idsFor handles dedup)
  ...authorCluster(idsFor("Kent Haruf"),
    { prose_craft: 8, prose_style: 3, warmth: 9, intensity: 3, pace: 3, moral_complexity: 6, fabulism: 1, emotional_register: 5, interiority: 6, tone: 3, difficulty: 3 },
    ["literary-fiction", "american-setting", "colorado-setting", "small-town", "ensemble-cast", "community", "quiet-drama", "sparse-prose"]
  ),
  // Roald Dahl
  ...authorCluster(idsFor("Roald Dahl"),
    { prose_craft: 7, prose_style: 4, warmth: 4, intensity: 4, pace: 7, moral_complexity: 6, fabulism: 3, emotional_register: 5, interiority: 4, tone: 7, difficulty: 2 },
    ["vignettes", "british-setting", "twist-ending", "dark-humor", "satirical", "witty-prose"]
  ),
  // Rudyard Kipling
  ...authorCluster(idsFor("Rudyard Kipling"),
    { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 3, emotional_register: 4, interiority: 4, tone: 4, difficulty: 4 },
    ["literary-fiction", "british-setting", "indian-setting", "colonial-era", "adventure", "male-protagonist"]
  ),
  // P.G. Wodehouse
  ...authorCluster(idsFor("P.G. Wodehouse"),
    { prose_craft: 8, prose_style: 5, warmth: 8, intensity: 1, pace: 7, moral_complexity: 3, fabulism: 1, emotional_register: 8, interiority: 4, tone: 10, difficulty: 3 },
    ["comic-novel", "british-setting", "witty-prose", "aristocratic", "male-protagonist", "farce", "edwardian-setting"]
  ),
  // Tennessee Williams + Arthur Miller + Eugene O'Neill + Harold Pinter + Tom Stoppard — playwrights
  ...authorCluster(idsFor("Tennessee Williams"),
    { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 7, pace: 5, moral_complexity: 8, fabulism: 1, emotional_register: 3, interiority: 7, tone: 2, difficulty: 4 },
    ["play-format", "american-setting", "southern-setting", "family", "sexuality", "decline", "domestic"]
  ),
  ...authorCluster(idsFor("Arthur Miller"),
    { prose_craft: 8, prose_style: 5, warmth: 5, intensity: 6, pace: 5, moral_complexity: 8, fabulism: 1, emotional_register: 2, interiority: 6, tone: 2, difficulty: 4 },
    ["play-format", "american-setting", "male-protagonist", "working-class", "family", "moral-dilemma", "american-dream"]
  ),
  ...authorCluster(idsFor("Eugene O'Neill"),
    { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 7, pace: 4, moral_complexity: 8, fabulism: 1, emotional_register: 2, interiority: 7, tone: 1, difficulty: 5 },
    ["play-format", "american-setting", "family", "addiction", "tragedy", "domestic", "autobiographical"]
  ),
  ...authorCluster(idsFor("Harold Pinter"),
    { prose_craft: 8, prose_style: 5, warmth: 2, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 2, emotional_register: 2, interiority: 6, tone: 3, difficulty: 6 },
    ["play-format", "british-setting", "menace", "silence", "domestic", "power", "absurdist"]
  ),
  ...authorCluster(idsFor("Tom Stoppard"),
    { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 3, pace: 5, moral_complexity: 6, fabulism: 3, emotional_register: 4, interiority: 5, tone: 8, difficulty: 5 },
    ["play-format", "british-setting", "witty-prose", "metafiction", "philosophical", "ideas-driven", "comedy"]
  ),
  // George Bernard Shaw
  ...authorCluster(idsFor("George Bernard Shaw"),
    { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 3, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 5, interiority: 4, tone: 7, difficulty: 4 },
    ["play-format", "british-setting", "satirical", "witty-prose", "class", "social-realism", "comedy"]
  ),
  // Seamus Heaney + Federico García Lorca + Langston Hughes — poets
  ...authorCluster(idsFor("Seamus Heaney"),
    { prose_craft: 10, prose_style: 6, warmth: 6, intensity: 3, pace: 2, moral_complexity: 6, fabulism: 2, emotional_register: 4, interiority: 7, tone: 3, difficulty: 5 },
    ["poetry", "irish-setting", "rural", "pastoral", "memory", "lyrical-prose", "political-intrigue"]
  ),
  ...authorCluster(idsFor("Federico García Lorca"),
    { prose_craft: 9, prose_style: 7, warmth: 5, intensity: 6, pace: 3, moral_complexity: 7, fabulism: 3, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 },
    ["poetry", "play-format", "translated-from", "spanish-setting", "rural", "passion", "death", "lyrical-prose"]
  ),
  ...authorCluster(idsFor("Langston Hughes"),
    { prose_craft: 8, prose_style: 5, warmth: 6, intensity: 4, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 5, tone: 4, difficulty: 3 },
    ["poetry", "vignettes", "Black-protagonist", "american-setting", "harlem-setting", "jazz", "race", "community"]
  ),
  // Edna O'Brien
  ...authorCluster(idsFor("Edna O'Brien"),
    { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 4 },
    ["literary-fiction", "irish-setting", "female-protagonist", "domestic", "sexuality", "rural", "lyrical-prose"]
  ),
  // T.C. Boyle
  ...authorCluster(idsFor("T.C. Boyle"),
    { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 5, pace: 6, moral_complexity: 6, fabulism: 2, emotional_register: 4, interiority: 5, tone: 5, difficulty: 4 },
    ["literary-fiction", "american-setting", "california-setting", "satirical", "ecological", "male-protagonist", "historical-fiction"]
  ),
  // Robertson Davies
  ...authorCluster(idsFor("Robertson Davies"),
    { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 2, emotional_register: 4, interiority: 6, tone: 5, difficulty: 5 },
    ["literary-fiction", "canadian-setting", "male-protagonist", "academia", "jungian", "witty-prose", "ensemble-cast"]
  ),
  // Barbara Pym
  ...authorCluster(idsFor("Barbara Pym"),
    { prose_craft: 7, prose_style: 4, warmth: 6, intensity: 1, pace: 3, moral_complexity: 5, fabulism: 1, emotional_register: 4, interiority: 6, tone: 6, difficulty: 3 },
    ["literary-fiction", "british-setting", "female-protagonist", "domestic", "church-setting", "quiet-drama", "witty-prose", "restrained-prose"]
  ),
  // Ernest Gaines
  ...authorCluster(idsFor("Ernest Gaines"),
    { prose_craft: 7, prose_style: 4, warmth: 6, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 3 },
    ["literary-fiction", "Black-protagonist", "american-setting", "louisiana-setting", "rural", "race", "community", "working-class"]
  ),
  // Ali Smith
  ...authorCluster(idsFor("Ali Smith"),
    { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 3, emotional_register: 5, interiority: 7, tone: 5, difficulty: 5 },
    ["literary-fiction", "british-setting", "female-protagonist", "experimental-form", "contemporary-setting", "witty-prose", "seasonal"]
  ),
  // Penelope Fitzgerald
  ...authorCluster(idsFor("Penelope Fitzgerald"),
    { prose_craft: 8, prose_style: 4, warmth: 5, intensity: 2, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 6, tone: 5, difficulty: 4 },
    ["literary-fiction", "british-setting", "restrained-prose", "quiet-drama", "witty-prose", "novella-length"]
  ),
  // Walker Percy
  ...authorCluster(idsFor("Walker Percy"),
    { prose_craft: 8, prose_style: 5, warmth: 5, intensity: 3, pace: 3, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 8, tone: 4, difficulty: 5 },
    ["literary-fiction", "american-setting", "southern-setting", "male-protagonist", "existential", "faith-and-doubt", "alienation", "philosophical"]
  ),
  // Heinrich Böll
  ...authorCluster(idsFor("Heinrich Böll"),
    { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 },
    ["literary-fiction", "translated-from", "german-setting", "post-war-setting", "male-protagonist", "working-class", "war-trauma", "social-realism"]
  ),
  // Jean Rhys
  ...authorCluster(idsFor("Jean Rhys"),
    { prose_craft: 8, prose_style: 4, warmth: 3, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 2, interiority: 8, tone: 2, difficulty: 4 },
    ["literary-fiction", "female-protagonist", "parisian-setting", "caribbean-setting", "loneliness", "poverty", "alienation", "restrained-prose"]
  ),
  // Iain Banks (literary, not M. Banks)
  ...authorCluster(idsFor("Iain Banks"),
    { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 6, pace: 5, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 6, tone: 4, difficulty: 4 },
    ["literary-fiction", "scottish-setting", "male-protagonist", "dark-humor", "domestic", "transgressive"]
  ),
  // David Mitchell
  ...authorCluster(idsFor("David Mitchell"),
    { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 5, emotional_register: 4, interiority: 6, tone: 4, difficulty: 5 },
    ["literary-fiction", "multi-pov", "nonlinear", "braided-narratives", "genre-bending", "ensemble-cast", "global-setting"]
  ),
  // E.M. Forster
  ...authorCluster(idsFor("E.M. Forster"),
    { prose_craft: 8, prose_style: 5, warmth: 6, intensity: 3, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 7, tone: 4, difficulty: 4 },
    ["literary-fiction", "british-setting", "class", "italian-setting", "indian-setting", "colonial-era", "restrained-prose", "domestic"]
  ),
  // Günter Grass
  ...authorCluster(idsFor("Günter Grass"),
    { prose_craft: 8, prose_style: 7, warmth: 4, intensity: 5, pace: 4, moral_complexity: 8, fabulism: 4, emotional_register: 3, interiority: 6, tone: 4, difficulty: 7 },
    ["literary-fiction", "translated-from", "german-setting", "ww2-era", "post-war-setting", "magical-realism", "dense-prose", "political-intrigue"]
  ),
  // Wallace Stegner
  ...authorCluster(idsFor("Wallace Stegner"),
    { prose_craft: 8, prose_style: 5, warmth: 6, intensity: 3, pace: 3, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 6, tone: 3, difficulty: 4 },
    ["literary-fiction", "american-setting", "western-setting", "family-saga", "landscape", "memory", "multigenerational", "pastoral"]
  ),
  // Michael Ondaatje
  ...authorCluster(idsFor("Michael Ondaatje"),
    { prose_craft: 9, prose_style: 7, warmth: 5, intensity: 5, pace: 3, moral_complexity: 7, fabulism: 2, emotional_register: 4, interiority: 7, tone: 3, difficulty: 6 },
    ["literary-fiction", "canadian-setting", "multi-pov", "nonlinear", "lyrical-prose", "war", "memory", "fragmentary-prose"]
  ),
  // Graham Swift
  ...authorCluster(idsFor("Graham Swift"),
    { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 4 },
    ["literary-fiction", "british-setting", "male-protagonist", "memory", "domestic", "restrained-prose", "quiet-drama"]
  ),
  // Somerset Maugham
  ...authorCluster(idsFor("Somerset Maugham"),
    { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 3, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 6, tone: 4, difficulty: 4 },
    ["literary-fiction", "british-setting", "male-protagonist", "travel", "colonial-era", "restrained-prose", "global-setting"]
  ),
  // Guy de Maupassant
  ...authorCluster(idsFor("Guy de Maupassant"),
    { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 5, tone: 4, difficulty: 4 },
    ["vignettes", "translated-from", "french-setting", "19th-century", "twist-ending", "social-realism", "class"]
  ),
  // Truman Capote
  ...authorCluster(idsFor("Truman Capote"),
    { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 4, difficulty: 4 },
    ["literary-fiction", "american-setting", "southern-setting", "male-protagonist", "lyrical-prose", "restrained-prose"]
  ),
  // Jack London
  ...authorCluster(idsFor("Jack London"),
    { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 6, pace: 7, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 4, tone: 3, difficulty: 3 },
    ["literary-fiction", "american-setting", "alaska-setting", "adventure", "survival", "naturalism", "male-protagonist"]
  ),
  // Jim Harrison
  ...authorCluster(idsFor("Jim Harrison"),
    { prose_craft: 8, prose_style: 5, warmth: 5, intensity: 5, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 6, tone: 4, difficulty: 4 },
    ["literary-fiction", "american-setting", "michigan-setting", "male-protagonist", "nature", "rural", "food-writing", "novella-length"]
  ),
  // Helen Oyeyemi
  ...authorCluster(idsFor("Helen Oyeyemi"),
    { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 6, emotional_register: 4, interiority: 6, tone: 5, difficulty: 5 },
    ["literary-fiction", "female-protagonist", "fairy-tale-retelling", "fabulism", "surreal", "identity", "multi-cultural"]
  ),
  // Lionel Shriver
  ...authorCluster(idsFor("Lionel Shriver"),
    { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 6, pace: 5, moral_complexity: 8, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 4 },
    ["literary-fiction", "american-setting", "female-protagonist", "domestic", "moral-dilemma", "contemporary-setting", "provocative"]
  ),
  // Jhumpa Lahiri
  ...authorCluster(idsFor("Jhumpa Lahiri"),
    { prose_craft: 8, prose_style: 4, warmth: 6, intensity: 3, pace: 3, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 7, tone: 3, difficulty: 3 },
    ["literary-fiction", "immigrant-novel", "indian-setting", "american-setting", "domestic", "family", "identity", "restrained-prose"]
  ),
  // Amy Tan
  ...authorCluster(idsFor("Amy Tan"),
    { prose_craft: 6, prose_style: 4, warmth: 6, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 6, tone: 4, difficulty: 3 },
    ["literary-fiction", "chinese-american", "female-protagonist", "mother-daughter", "immigrant-novel", "family-saga", "identity"]
  ),
  // Jorge Luis Borges
  ...authorCluster(idsFor("Jorge Luis Borges"),
    { prose_craft: 10, prose_style: 7, warmth: 3, intensity: 2, pace: 4, moral_complexity: 8, fabulism: 9, emotional_register: 4, interiority: 7, tone: 5, difficulty: 7 },
    ["vignettes", "translated-from", "argentine-setting", "fabulism", "philosophical", "metafiction", "labyrinths", "infinity", "dreaming"]
  ),
  // Italo Calvino (remaining)
  ...authorCluster(idsFor("Italo Calvino"),
    { prose_craft: 9, prose_style: 6, warmth: 5, intensity: 2, pace: 4, moral_complexity: 6, fabulism: 8, emotional_register: 5, interiority: 6, tone: 6, difficulty: 5 },
    ["literary-fiction", "translated-from", "italian-setting", "fabulism", "metafiction", "whimsical", "philosophical", "fairy-tale-retelling"]
  ),
  // Pat Conroy
  ...authorCluster(idsFor("Pat Conroy"),
    { prose_craft: 6, prose_style: 5, warmth: 6, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 5, tone: 3, difficulty: 3 },
    ["literary-fiction", "american-setting", "southern-setting", "male-protagonist", "family", "military", "domestic"]
  ),
  // Penelope Lively
  ...authorCluster(idsFor("Penelope Lively"),
    { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 2, pace: 3, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 7, tone: 4, difficulty: 4 },
    ["literary-fiction", "british-setting", "female-protagonist", "memory", "aging", "domestic", "quiet-drama", "restrained-prose"]
  ),
  // Richard Brautigan
  ...authorCluster(idsFor("Richard Brautigan"),
    { prose_craft: 7, prose_style: 4, warmth: 5, intensity: 2, pace: 4, moral_complexity: 4, fabulism: 3, emotional_register: 5, interiority: 5, tone: 8, difficulty: 3 },
    ["literary-fiction", "american-setting", "california-setting", "whimsical", "counterculture", "minimalism", "1960s-setting", "novella-length"]
  ),
  // Dennis Cooper
  ...authorCluster(idsFor("Dennis Cooper"),
    { prose_craft: 7, prose_style: 4, warmth: 1, intensity: 10, pace: 5, moral_complexity: 7, fabulism: 2, emotional_register: 1, interiority: 6, tone: 2, difficulty: 5 },
    ["literary-fiction", "male-protagonist", "queer-protagonist", "transgressive", "violence", "sexuality", "graphic-violence", "minimalism"]
  ),
  // Sebastian Faulks
  ...authorCluster(idsFor("Sebastian Faulks"),
    { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 },
    ["literary-fiction", "british-setting", "french-setting", "ww1-era", "historical-fiction", "romance-subplot", "war"]
  ),
  // Theodore Dreiser
  ...authorCluster(idsFor("Theodore Dreiser"),
    { prose_craft: 6, prose_style: 6, warmth: 4, intensity: 5, pace: 3, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 2, difficulty: 5 },
    ["literary-fiction", "american-setting", "naturalism", "class", "social-realism", "male-protagonist", "decline", "doorstopper"]
  ),
  // Wole Soyinka
  ...authorCluster(idsFor("Wole Soyinka"),
    { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 6, tone: 3, difficulty: 6 },
    ["literary-fiction", "nigerian-setting", "post-colonial", "political-intrigue", "community", "lyrical-prose"]
  ),
  // Ovid
  ...authorCluster(idsFor("Ovid"),
    { prose_craft: 8, prose_style: 7, warmth: 5, intensity: 6, pace: 5, moral_complexity: 6, fabulism: 8, emotional_register: 4, interiority: 4, tone: 5, difficulty: 5 },
    ["poetry", "translated-from", "ancient-setting", "mythology", "transformation", "gods-walking", "love", "classical"]
  ),
  // Johann Wolfgang von Goethe
  ...authorCluster(idsFor("Johann Wolfgang von Goethe"),
    { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 5, pace: 4, moral_complexity: 8, fabulism: 4, emotional_register: 4, interiority: 7, tone: 4, difficulty: 6 },
    ["literary-fiction", "translated-from", "german-setting", "male-protagonist", "philosophical", "coming-of-age", "classical"]
  ),
  // Tom Perrotta
  ...authorCluster(idsFor("Tom Perrotta"),
    { prose_craft: 6, prose_style: 4, warmth: 5, intensity: 3, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 5, tone: 5, difficulty: 2 },
    ["literary-fiction", "american-setting", "suburban", "ensemble-cast", "domestic", "satirical", "contemporary-setting"]
  ),
  // Stewart O'Nan
  ...authorCluster(idsFor("Stewart O'Nan"),
    { prose_craft: 7, prose_style: 4, warmth: 5, intensity: 5, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 3 },
    ["literary-fiction", "american-setting", "new-england-setting", "working-class", "domestic", "ensemble-cast", "quiet-drama"]
  ),
  // Meg Wolitzer
  ...authorCluster(idsFor("Meg Wolitzer"),
    { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 3, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 6, tone: 4, difficulty: 3 },
    ["literary-fiction", "american-setting", "female-protagonist", "domestic", "family", "marriage", "academia", "contemporary-setting"]
  ),
  // Liane Moriarty
  ...authorCluster(idsFor("Liane Moriarty"),
    { prose_craft: 5, prose_style: 3, warmth: 6, intensity: 4, pace: 6, moral_complexity: 5, fabulism: 1, emotional_register: 5, interiority: 5, tone: 5, difficulty: 2 },
    ["literary-fiction", "australian-setting", "female-protagonist", "domestic-thriller", "ensemble-cast", "suburban", "family", "twist-ending"]
  ),
  // Kristin Hannah
  ...authorCluster(idsFor("Kristin Hannah"),
    { prose_craft: 5, prose_style: 3, warmth: 7, intensity: 5, pace: 5, moral_complexity: 5, fabulism: 1, emotional_register: 4, interiority: 5, tone: 3, difficulty: 2 },
    ["historical-fiction", "female-protagonist", "family", "friendship", "war", "domestic"]
  ),
  // Taylor Jenkins Reid
  ...authorCluster(idsFor("Taylor Jenkins Reid"),
    { prose_craft: 5, prose_style: 3, warmth: 6, intensity: 4, pace: 6, moral_complexity: 5, fabulism: 1, emotional_register: 5, interiority: 5, tone: 4, difficulty: 2 },
    ["literary-fiction", "american-setting", "female-protagonist", "multi-pov", "celebrity", "1970s", "family", "contemporary-setting"]
  ),
  // Curtis Sittenfeld
  ...authorCluster(idsFor("Curtis Sittenfeld"),
    { prose_craft: 6, prose_style: 4, warmth: 5, intensity: 3, pace: 5, moral_complexity: 5, fabulism: 1, emotional_register: 4, interiority: 6, tone: 4, difficulty: 2 },
    ["literary-fiction", "american-setting", "female-protagonist", "domestic", "class", "contemporary-setting"]
  ),
  // Robert Louis Stevenson
  ...authorCluster(idsFor("Robert Louis Stevenson"),
    { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 5, pace: 6, moral_complexity: 6, fabulism: 3, emotional_register: 4, interiority: 5, tone: 5, difficulty: 4 },
    ["literary-fiction", "adventure", "british-setting", "male-protagonist", "19th-century", "quest"]
  ),
  // Yoko Ogawa
  ...authorCluster(idsFor("Yoko Ogawa"),
    { prose_craft: 7, prose_style: 4, warmth: 4, intensity: 4, pace: 3, moral_complexity: 6, fabulism: 3, emotional_register: 3, interiority: 7, tone: 3, difficulty: 4 },
    ["literary-fiction", "translated-from", "japanese-setting", "female-protagonist", "restrained-prose", "uneasy", "memory", "quiet-drama"]
  ),
  // Alice Walker
  ...authorCluster(idsFor("Alice Walker"),
    { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 6, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 4 },
    ["literary-fiction", "Black-protagonist", "female-protagonist", "american-setting", "southern-setting", "race", "feminism", "epistolary"]
  ),
  // Charles Portis
  ...authorCluster(idsFor("Charles Portis"),
    { prose_craft: 7, prose_style: 4, warmth: 5, intensity: 4, pace: 6, moral_complexity: 5, fabulism: 1, emotional_register: 5, interiority: 5, tone: 7, difficulty: 3 },
    ["literary-fiction", "american-setting", "southern-setting", "first-person", "male-protagonist", "picaresque", "witty-prose", "adventure"]
  ),
  // Karen Russell
  ...authorCluster(idsFor("Karen Russell"),
    { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 6, emotional_register: 4, interiority: 5, tone: 5, difficulty: 4 },
    ["literary-fiction", "american-setting", "florida-setting", "fabulism", "surreal", "coming-of-age", "ecological"]
  ),
  // Mark Twain (remaining)
  ...authorCluster(idsFor("Mark Twain"),
    { prose_craft: 8, prose_style: 5, warmth: 6, intensity: 4, pace: 6, moral_complexity: 7, fabulism: 2, emotional_register: 5, interiority: 5, tone: 7, difficulty: 4 },
    ["literary-fiction", "american-setting", "satirical", "witty-prose", "19th-century", "picaresque"]
  ),
};

const merged = { ...existing, ...batch };
fs.writeFileSync(SIDECAR, JSON.stringify(merged, null, 2));

const before = Object.keys(existing).length;
const after = Object.keys(merged).length;
console.log("Before:", before, "| Added:", Object.keys(batch).length, "| After:", after);
