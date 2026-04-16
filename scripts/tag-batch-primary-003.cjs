const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const existing = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));

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

const PRIMARY = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "public", "book-data.json"), "utf8"));

// Helper: get all untagged IDs for an author
function idsFor(author) {
  return PRIMARY.filter(b => b.author === author && !existing[String(b.id)]).map(b => b.id);
}

const batch = {
  // Émile Zola — French naturalism
  ...authorCluster(idsFor("Émile Zola"),
    { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 7, pace: 5, moral_complexity: 8, fabulism: 1, emotional_register: 3, interiority: 5, tone: 2, difficulty: 5 },
    ["literary-fiction", "translated-from", "french-setting", "19th-century", "naturalism", "social-panorama", "working-class", "class"]
  ),
  // Edith Wharton — American gilded age
  ...authorCluster(idsFor("Edith Wharton"),
    { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 },
    ["literary-fiction", "american-setting", "new-york-setting", "class", "marriage", "domestic", "19th-century", "restrained-prose"]
  ),
  // Larry McMurtry — Texas literary
  ...authorCluster(idsFor("Larry McMurtry"),
    { prose_craft: 7, prose_style: 4, warmth: 6, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 5, tone: 4, difficulty: 3 },
    ["literary-fiction", "american-setting", "texas-setting", "western-setting", "male-protagonist", "working-class", "rural"]
  ),
  // Muriel Spark — Scottish, sharp, short
  ...authorCluster(idsFor("Muriel Spark"),
    { prose_craft: 8, prose_style: 4, warmth: 3, intensity: 3, pace: 5, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 6, tone: 6, difficulty: 4 },
    ["literary-fiction", "british-setting", "female-protagonist", "witty-prose", "satirical", "novella-length", "restrained-prose"]
  ),
  // Cormac McCarthy (remaining)
  ...authorCluster(idsFor("Cormac McCarthy"),
    { prose_craft: 10, prose_style: 8, warmth: 3, intensity: 9, pace: 4, moral_complexity: 9, fabulism: 2, emotional_register: 2, interiority: 4, tone: 1, difficulty: 6 },
    ["literary-fiction", "american-setting", "western-setting", "violence", "male-protagonist", "biblical-register", "lyrical-prose"]
  ),
  // Evelyn Waugh — English satirist
  ...authorCluster(idsFor("Evelyn Waugh"),
    { prose_craft: 8, prose_style: 5, warmth: 4, intensity: 3, pace: 6, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 5, tone: 8, difficulty: 4 },
    ["literary-fiction", "british-setting", "satirical", "witty-prose", "class", "aristocratic", "male-protagonist"]
  ),
  // Hermann Hesse (remaining)
  ...authorCluster(idsFor("Hermann Hesse"),
    { prose_craft: 8, prose_style: 5, warmth: 6, intensity: 3, pace: 3, moral_complexity: 7, fabulism: 3, emotional_register: 4, interiority: 8, tone: 3, difficulty: 5 },
    ["literary-fiction", "translated-from", "male-protagonist", "philosophical", "spiritual", "coming-of-age", "quest"]
  ),
  // Vonnegut (remaining)
  ...authorCluster(idsFor("Kurt Vonnegut"),
    { prose_craft: 7, prose_style: 3, warmth: 5, intensity: 4, pace: 6, moral_complexity: 7, fabulism: 4, emotional_register: 4, interiority: 5, tone: 6, difficulty: 3 },
    ["satirical", "male-protagonist", "american-setting", "absurdist", "dark-humor"]
  ),
  // Salman Rushdie
  ...authorCluster(idsFor("Salman Rushdie"),
    { prose_craft: 8, prose_style: 8, warmth: 5, intensity: 5, pace: 5, moral_complexity: 8, fabulism: 6, emotional_register: 4, interiority: 6, tone: 5, difficulty: 6 },
    ["literary-fiction", "magical-realism", "multi-pov", "baroque-prose", "political-intrigue", "identity", "immigrant-novel"]
  ),
  // Thomas Hardy — English pastoral tragedy
  ...authorCluster(idsFor("Thomas Hardy"),
    { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 6, pace: 3, moral_complexity: 7, fabulism: 1, emotional_register: 2, interiority: 6, tone: 2, difficulty: 5 },
    ["literary-fiction", "british-setting", "rural", "19th-century", "tragedy", "class", "pastoral", "marriage"]
  ),
  // Roberto Bolaño
  ...authorCluster(idsFor("Roberto Bolaño"),
    { prose_craft: 9, prose_style: 7, warmth: 3, intensity: 6, pace: 4, moral_complexity: 9, fabulism: 3, emotional_register: 3, interiority: 7, tone: 3, difficulty: 7 },
    ["literary-fiction", "translated-from", "male-protagonist", "latin-american-setting", "writer-protagonist", "violence", "dense-prose", "nonlinear"]
  ),
  // John Fante (remaining)
  ...authorCluster(idsFor("John Fante"),
    { prose_craft: 7, prose_style: 4, warmth: 5, intensity: 6, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 7, tone: 4, difficulty: 3 },
    ["autofiction", "first-person", "male-protagonist", "los-angeles-setting", "writer-protagonist", "poverty", "italian-american"]
  ),
  // Saul Bellow
  ...authorCluster(idsFor("Saul Bellow"),
    { prose_craft: 9, prose_style: 7, warmth: 5, intensity: 4, pace: 4, moral_complexity: 8, fabulism: 1, emotional_register: 4, interiority: 8, tone: 4, difficulty: 6 },
    ["literary-fiction", "male-protagonist", "american-setting", "chicago-setting", "Jewish-protagonist", "dense-prose", "intellectual"]
  ),
  // Willa Cather
  ...authorCluster(idsFor("Willa Cather"),
    { prose_craft: 8, prose_style: 5, warmth: 6, intensity: 3, pace: 3, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 6, tone: 3, difficulty: 4 },
    ["literary-fiction", "american-setting", "nebraska-setting", "rural", "pastoral", "pioneer", "female-protagonist", "restrained-prose"]
  ),
  // D.H. Lawrence
  ...authorCluster(idsFor("D.H. Lawrence"),
    { prose_craft: 8, prose_style: 7, warmth: 5, intensity: 6, pace: 3, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 7, tone: 3, difficulty: 6 },
    ["literary-fiction", "british-setting", "sexuality", "class", "working-class", "marriage", "nature", "dense-prose"]
  ),
  // Julian Barnes
  ...authorCluster(idsFor("Julian Barnes"),
    { prose_craft: 8, prose_style: 5, warmth: 5, intensity: 3, pace: 4, moral_complexity: 7, fabulism: 2, emotional_register: 4, interiority: 7, tone: 4, difficulty: 5 },
    ["literary-fiction", "british-setting", "male-protagonist", "memory", "aging", "restrained-prose", "witty-prose"]
  ),
  // Oscar Wilde (remaining)
  ...authorCluster(idsFor("Oscar Wilde"),
    { prose_craft: 9, prose_style: 7, warmth: 4, intensity: 3, pace: 5, moral_complexity: 6, fabulism: 2, emotional_register: 5, interiority: 5, tone: 8, difficulty: 4 },
    ["literary-fiction", "british-setting", "witty-prose", "satirical", "victorian-setting", "epigrammatic"]
  ),
  // Richard Powers
  ...authorCluster(idsFor("Richard Powers"),
    { prose_craft: 8, prose_style: 7, warmth: 5, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 2, emotional_register: 4, interiority: 6, tone: 3, difficulty: 6 },
    ["literary-fiction", "american-setting", "multi-pov", "science", "ensemble-cast", "dense-prose", "ideas-driven"]
  ),
  // Nabokov (remaining)
  ...authorCluster(idsFor("Vladimir Nabokov"),
    { prose_craft: 10, prose_style: 8, warmth: 3, intensity: 4, pace: 4, moral_complexity: 8, fabulism: 2, emotional_register: 3, interiority: 7, tone: 5, difficulty: 7 },
    ["literary-fiction", "baroque-prose", "unreliable-narrator", "male-protagonist", "witty-prose", "identity"]
  ),
  // Fredrik Backman — warm Swedish fiction
  ...authorCluster(idsFor("Fredrik Backman"),
    { prose_craft: 5, prose_style: 3, warmth: 10, intensity: 3, pace: 5, moral_complexity: 5, fabulism: 1, emotional_register: 8, interiority: 5, tone: 6, difficulty: 2 },
    ["literary-fiction", "translated-from", "swedish-setting", "community", "small-town", "ensemble-cast", "warm", "hopeful"]
  ),
  // Bukowski (remaining)
  ...authorCluster(idsFor("Charles Bukowski"),
    { prose_craft: 7, prose_style: 2, warmth: 5, intensity: 6, pace: 6, moral_complexity: 6, fabulism: 0, emotional_register: 3, interiority: 6, tone: 5, difficulty: 2 },
    ["autofiction", "plain-prose", "working-class", "urban", "los-angeles-setting", "alcoholism", "male-protagonist"]
  ),
  // Paul Auster
  ...authorCluster(idsFor("Paul Auster"),
    { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 4, pace: 5, moral_complexity: 7, fabulism: 3, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 },
    ["literary-fiction", "male-protagonist", "new-york-setting", "identity", "coincidence", "writer-protagonist", "metafiction"]
  ),
  // William S. Burroughs
  ...authorCluster(idsFor("William S. Burroughs"),
    { prose_craft: 7, prose_style: 7, warmth: 1, intensity: 8, pace: 4, moral_complexity: 7, fabulism: 5, emotional_register: 2, interiority: 6, tone: 3, difficulty: 8 },
    ["experimental-form", "male-protagonist", "beat-generation", "drugs", "transgressive", "cut-up", "surreal"]
  ),
  // Samuel Beckett
  ...authorCluster(idsFor("Samuel Beckett"),
    { prose_craft: 10, prose_style: 6, warmth: 2, intensity: 3, pace: 2, moral_complexity: 8, fabulism: 4, emotional_register: 2, interiority: 9, tone: 3, difficulty: 9 },
    ["literary-fiction", "translated-from", "male-protagonist", "existential", "minimalism", "absurdist", "experimental-form", "alienation"]
  ),
  // Thomas Bernhard
  ...authorCluster(idsFor("Thomas Bernhard"),
    { prose_craft: 9, prose_style: 7, warmth: 1, intensity: 5, pace: 3, moral_complexity: 7, fabulism: 1, emotional_register: 2, interiority: 9, tone: 3, difficulty: 7 },
    ["literary-fiction", "translated-from", "austrian-setting", "male-protagonist", "misanthropic", "stream-of-consciousness", "obsessive-interiority", "dense-prose"]
  ),
  // Naguib Mahfouz
  ...authorCluster(idsFor("Naguib Mahfouz"),
    { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 2, emotional_register: 4, interiority: 6, tone: 4, difficulty: 4 },
    ["literary-fiction", "translated-from", "egyptian-setting", "cairo-setting", "ensemble-cast", "multigenerational", "community", "social-realism"]
  ),
  // Doris Lessing
  ...authorCluster(idsFor("Doris Lessing"),
    { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 },
    ["literary-fiction", "female-protagonist", "feminism", "african-setting", "british-setting", "political-intrigue", "domestic"]
  ),
  // Honoré de Balzac
  ...authorCluster(idsFor("Honoré de Balzac"),
    { prose_craft: 7, prose_style: 7, warmth: 4, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 6, tone: 4, difficulty: 6 },
    ["literary-fiction", "translated-from", "french-setting", "parisian-setting", "19th-century", "social-panorama", "class", "dense-prose"]
  ),
  // Karl Ove Knausgård (remaining)
  ...authorCluster(idsFor("Karl Ove Knausgård"),
    { prose_craft: 9, prose_style: 5, warmth: 7, intensity: 5, pace: 3, moral_complexity: 8, fabulism: 0, emotional_register: 3, interiority: 10, tone: 3, difficulty: 6 },
    ["autofiction", "first-person", "stream-of-consciousness", "translated-from", "norwegian-setting", "family-saga", "memory", "writer-protagonist"]
  ),
  // Bernard Malamud
  ...authorCluster(idsFor("Bernard Malamud"),
    { prose_craft: 8, prose_style: 5, warmth: 5, intensity: 4, pace: 5, moral_complexity: 7, fabulism: 2, emotional_register: 4, interiority: 6, tone: 4, difficulty: 4 },
    ["literary-fiction", "male-protagonist", "Jewish-protagonist", "american-setting", "working-class", "moral-dilemma"]
  ),
  // Anne Tyler
  ...authorCluster(idsFor("Anne Tyler"),
    { prose_craft: 7, prose_style: 4, warmth: 7, intensity: 2, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 5, interiority: 7, tone: 5, difficulty: 3 },
    ["literary-fiction", "american-setting", "baltimore-setting", "domestic", "family", "marriage", "quiet-drama", "restrained-prose"]
  ),
  // Jim Thompson — noir
  ...authorCluster(idsFor("Jim Thompson"),
    { prose_craft: 7, prose_style: 3, warmth: 2, intensity: 9, pace: 8, moral_complexity: 8, fabulism: 1, emotional_register: 2, interiority: 7, tone: 2, difficulty: 3 },
    ["noir", "male-protagonist", "first-person", "serial-killer", "unreliable-narrator", "transgressive", "violence", "american-setting", "working-class"]
  ),
  // Elmore Leonard — crime fiction
  ...authorCluster(idsFor("Elmore Leonard"),
    { prose_craft: 7, prose_style: 3, warmth: 5, intensity: 6, pace: 8, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 4, tone: 6, difficulty: 2 },
    ["noir", "male-protagonist", "american-setting", "crime", "witty-prose", "dialogue-driven", "violence"]
  ),
  // Elena Ferrante
  ...authorCluster(idsFor("Elena Ferrante"),
    { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 6, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 8, tone: 3, difficulty: 4 },
    ["literary-fiction", "translated-from", "italian-setting", "neapolitan-setting", "female-protagonist", "friendship", "class", "domestic", "coming-of-age"]
  ),
  // Annie Proulx
  ...authorCluster(idsFor("Annie Proulx"),
    { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 6, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 5 },
    ["literary-fiction", "american-setting", "rural", "working-class", "landscape", "harsh-conditions"]
  ),
  // George Eliot — Victorian
  ...authorCluster(idsFor("George Eliot"),
    { prose_craft: 8, prose_style: 7, warmth: 5, intensity: 4, pace: 3, moral_complexity: 8, fabulism: 1, emotional_register: 4, interiority: 7, tone: 3, difficulty: 6 },
    ["literary-fiction", "british-setting", "victorian-setting", "social-panorama", "marriage", "class", "moral-dilemma", "doorstopper"]
  ),
  // Leo Tolstoy
  ...authorCluster(idsFor("Leo Tolstoy"),
    { prose_craft: 9, prose_style: 6, warmth: 5, intensity: 5, pace: 4, moral_complexity: 9, fabulism: 1, emotional_register: 4, interiority: 8, tone: 3, difficulty: 6 },
    ["literary-fiction", "translated-from", "russian-setting", "19th-century", "social-panorama", "family-saga", "moral-dilemma"]
  ),
  // Marcel Proust (remaining)
  ...authorCluster(idsFor("Marcel Proust"),
    { prose_craft: 10, prose_style: 10, warmth: 5, intensity: 2, pace: 1, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 10, tone: 4, difficulty: 10 },
    ["literary-fiction", "translated-from", "parisian-setting", "male-protagonist", "memory", "time", "dense-prose", "stream-of-consciousness", "doorstopper", "social-panorama"]
  ),
  // Irvine Welsh — Scottish transgressive
  ...authorCluster(idsFor("Irvine Welsh"),
    { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 8, pace: 6, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 5, tone: 4, difficulty: 4 },
    ["literary-fiction", "scottish-setting", "edinburgh-setting", "working-class", "drugs", "addiction", "dialect", "ensemble-cast", "transgressive"]
  ),
  // Hubert Selby Jr.
  ...authorCluster(idsFor("Hubert Selby Jr."),
    { prose_craft: 7, prose_style: 5, warmth: 2, intensity: 10, pace: 5, moral_complexity: 8, fabulism: 1, emotional_register: 1, interiority: 7, tone: 1, difficulty: 5 },
    ["literary-fiction", "male-protagonist", "new-york-setting", "brooklyn-setting", "working-class", "addiction", "transgressive", "violence", "bleak"]
  ),
  // Denis Johnson
  ...authorCluster(idsFor("Denis Johnson"),
    { prose_craft: 8, prose_style: 5, warmth: 4, intensity: 7, pace: 5, moral_complexity: 8, fabulism: 2, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 },
    ["literary-fiction", "male-protagonist", "american-setting", "addiction", "drugs", "alienation", "violence", "lyrical-prose"]
  ),
  // Thomas Pynchon (remaining)
  ...authorCluster(idsFor("Thomas Pynchon"),
    { prose_craft: 9, prose_style: 10, warmth: 3, intensity: 4, pace: 3, moral_complexity: 9, fabulism: 5, emotional_register: 3, interiority: 6, tone: 5, difficulty: 10 },
    ["literary-fiction", "male-protagonist", "postmodern", "maximalism", "paranoia", "conspiracy", "dense-prose", "doorstopper", "ensemble-cast"]
  ),
  // José Saramago
  ...authorCluster(idsFor("José Saramago"),
    { prose_craft: 9, prose_style: 7, warmth: 5, intensity: 5, pace: 4, moral_complexity: 9, fabulism: 5, emotional_register: 3, interiority: 6, tone: 3, difficulty: 6 },
    ["literary-fiction", "translated-from", "portuguese-setting", "fabulism", "philosophical", "allegorical", "no-punctuation", "ensemble-cast"]
  ),
  // Michael Cunningham
  ...authorCluster(idsFor("Michael Cunningham"),
    { prose_craft: 8, prose_style: 6, warmth: 6, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 2, emotional_register: 4, interiority: 7, tone: 3, difficulty: 5 },
    ["literary-fiction", "queer-protagonist", "new-york-setting", "domestic", "mortality", "lyrical-prose"]
  ),
  // Richard Ford
  ...authorCluster(idsFor("Richard Ford"),
    { prose_craft: 8, prose_style: 5, warmth: 5, intensity: 3, pace: 3, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 7, tone: 3, difficulty: 4 },
    ["literary-fiction", "male-protagonist", "american-setting", "domestic", "suburban", "marriage", "midlife-crisis", "restrained-prose"]
  ),
  // Albert Camus (remaining)
  ...authorCluster(idsFor("Albert Camus"),
    { prose_craft: 8, prose_style: 5, warmth: 3, intensity: 5, pace: 5, moral_complexity: 8, fabulism: 2, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 },
    ["literary-fiction", "translated-from", "algerian-setting", "french-setting", "male-protagonist", "existential", "philosophical", "absurdist"]
  ),
  // Jane Austen
  ...authorCluster(idsFor("Jane Austen"),
    { prose_craft: 8, prose_style: 5, warmth: 7, intensity: 2, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 5, interiority: 6, tone: 7, difficulty: 4 },
    ["literary-fiction", "british-setting", "female-protagonist", "romance-subplot", "class", "marriage", "19th-century", "witty-prose", "domestic"]
  ),
  // David Foster Wallace
  ...authorCluster(idsFor("David Foster Wallace"),
    { prose_craft: 10, prose_style: 10, warmth: 4, intensity: 5, pace: 3, moral_complexity: 8, fabulism: 3, emotional_register: 3, interiority: 8, tone: 5, difficulty: 10 },
    ["literary-fiction", "male-protagonist", "american-setting", "maximalism", "experimental-form", "dense-prose", "footnotes", "addiction", "postmodern"]
  ),
  // Milan Kundera
  ...authorCluster(idsFor("Milan Kundera"),
    { prose_craft: 8, prose_style: 5, warmth: 4, intensity: 4, pace: 4, moral_complexity: 8, fabulism: 2, emotional_register: 4, interiority: 7, tone: 4, difficulty: 5 },
    ["literary-fiction", "translated-from", "czech-setting", "parisian-setting", "philosophical", "sexuality", "political-intrigue", "identity"]
  ),
  // Jonathan Franzen
  ...authorCluster(idsFor("Jonathan Franzen"),
    { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 6, tone: 4, difficulty: 4 },
    ["literary-fiction", "american-setting", "midwestern-setting", "family-saga", "domestic", "social-panorama", "ensemble-cast", "doorstopper"]
  ),
  // Zadie Smith
  ...authorCluster(idsFor("Zadie Smith"),
    { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 3, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 5, interiority: 6, tone: 5, difficulty: 4 },
    ["literary-fiction", "british-setting", "london-setting", "multi-pov", "race", "immigrant-novel", "ensemble-cast", "witty-prose"]
  ),
  // Michel Houellebecq
  ...authorCluster(idsFor("Michel Houellebecq"),
    { prose_craft: 7, prose_style: 5, warmth: 1, intensity: 6, pace: 5, moral_complexity: 8, fabulism: 3, emotional_register: 1, interiority: 7, tone: 3, difficulty: 5 },
    ["literary-fiction", "translated-from", "french-setting", "male-protagonist", "nihilistic", "sexuality", "satirical", "alienation", "contemporary-setting"]
  ),
  // Javier Marías
  ...authorCluster(idsFor("Javier Marías"),
    { prose_craft: 9, prose_style: 8, warmth: 4, intensity: 3, pace: 2, moral_complexity: 8, fabulism: 1, emotional_register: 3, interiority: 9, tone: 3, difficulty: 7 },
    ["literary-fiction", "translated-from", "spanish-setting", "male-protagonist", "dense-prose", "digressive", "memory", "secrets", "espionage"]
  ),
  // Patricia Highsmith
  ...authorCluster(idsFor("Patricia Highsmith"),
    { prose_craft: 7, prose_style: 4, warmth: 2, intensity: 6, pace: 6, moral_complexity: 8, fabulism: 1, emotional_register: 2, interiority: 7, tone: 2, difficulty: 3 },
    ["psychological-thriller", "male-protagonist", "morally-gray-protagonist", "unreliable-narrator", "identity", "restrained-prose"]
  ),
  // Yasunari Kawabata
  ...authorCluster(idsFor("Yasunari Kawabata"),
    { prose_craft: 9, prose_style: 5, warmth: 4, intensity: 3, pace: 2, moral_complexity: 6, fabulism: 2, emotional_register: 3, interiority: 8, tone: 3, difficulty: 5 },
    ["literary-fiction", "translated-from", "japanese-setting", "male-protagonist", "restrained-prose", "beauty", "melancholic", "lyrical-prose", "meditative"]
  ),
  // Yukio Mishima (remaining)
  ...authorCluster(idsFor("Yukio Mishima"),
    { prose_craft: 9, prose_style: 6, warmth: 3, intensity: 7, pace: 4, moral_complexity: 8, fabulism: 1, emotional_register: 2, interiority: 7, tone: 2, difficulty: 5 },
    ["literary-fiction", "translated-from", "japanese-setting", "male-protagonist", "beauty", "violence", "nihilistic", "sexuality"]
  ),
  // Ngũgĩ wa Thiong'o
  ...authorCluster(idsFor("Ngũgĩ wa Thiong'o"),
    { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 5, tone: 3, difficulty: 4 },
    ["literary-fiction", "kenyan-setting", "post-colonial", "political-intrigue", "community", "resistance", "class"]
  ),
  // Joseph Roth
  ...authorCluster(idsFor("Joseph Roth"),
    { prose_craft: 8, prose_style: 5, warmth: 5, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 },
    ["literary-fiction", "translated-from", "austrian-setting", "male-protagonist", "decline", "family-saga", "interwar-setting", "jewish-setting", "elegiac"]
  ),
  // Kent Haruf
  ...authorCluster(idsFor("Kent Haruf"),
    { prose_craft: 8, prose_style: 3, warmth: 9, intensity: 3, pace: 3, moral_complexity: 6, fabulism: 1, emotional_register: 5, interiority: 6, tone: 3, difficulty: 3 },
    ["literary-fiction", "american-setting", "colorado-setting", "small-town", "ensemble-cast", "community", "quiet-drama", "sparse-prose", "pastoral"]
  ),
  // Daniel Woodrell
  ...authorCluster(idsFor("Daniel Woodrell"),
    { prose_craft: 8, prose_style: 5, warmth: 4, intensity: 7, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 5, tone: 2, difficulty: 4 },
    ["literary-fiction", "american-setting", "ozarks-setting", "rural-poor", "violence", "working-class", "southern-gothic"]
  ),
  // Natsume Sōseki
  ...authorCluster(idsFor("Natsume Sōseki"),
    { prose_craft: 8, prose_style: 5, warmth: 5, intensity: 4, pace: 3, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 8, tone: 4, difficulty: 5 },
    ["literary-fiction", "translated-from", "japanese-setting", "male-protagonist", "meiji-era", "loneliness", "modernization", "restrained-prose"]
  ),
  // Osamu Dazai
  ...authorCluster(idsFor("Osamu Dazai"),
    { prose_craft: 8, prose_style: 5, warmth: 4, intensity: 6, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 2, interiority: 9, tone: 3, difficulty: 4 },
    ["autofiction", "translated-from", "japanese-setting", "male-protagonist", "first-person", "alcoholism", "shame", "decline", "self-destruction"]
  ),
  // Julio Cortázar
  ...authorCluster(idsFor("Julio Cortázar"),
    { prose_craft: 9, prose_style: 6, warmth: 5, intensity: 3, pace: 4, moral_complexity: 7, fabulism: 5, emotional_register: 4, interiority: 7, tone: 5, difficulty: 6 },
    ["literary-fiction", "translated-from", "argentine-setting", "parisian-setting", "experimental-form", "surreal", "witty-prose", "metafiction"]
  ),
  // Stefan Zweig
  ...authorCluster(idsFor("Stefan Zweig"),
    { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 8, tone: 3, difficulty: 4 },
    ["literary-fiction", "translated-from", "austrian-setting", "european-setting", "psychological", "obsession", "novella-length", "restrained-prose", "elegiac"]
  ),
  // Orhan Pamuk
  ...authorCluster(idsFor("Orhan Pamuk"),
    { prose_craft: 8, prose_style: 7, warmth: 5, intensity: 4, pace: 3, moral_complexity: 7, fabulism: 3, emotional_register: 4, interiority: 7, tone: 4, difficulty: 6 },
    ["literary-fiction", "translated-from", "turkish-setting", "istanbul-setting", "identity", "east-meets-west", "dense-prose", "meditative"]
  ),
  // Kazuo Ishiguro
  ...authorCluster(idsFor("Kazuo Ishiguro"),
    { prose_craft: 9, prose_style: 4, warmth: 5, intensity: 3, pace: 3, moral_complexity: 8, fabulism: 3, emotional_register: 3, interiority: 9, tone: 3, difficulty: 5 },
    ["literary-fiction", "british-setting", "male-protagonist", "unreliable-narrator", "memory", "regret", "restrained-prose"]
  ),
  // Marilynne Robinson
  ...authorCluster(idsFor("Marilynne Robinson"),
    { prose_craft: 10, prose_style: 5, warmth: 10, intensity: 2, pace: 2, moral_complexity: 7, fabulism: 1, emotional_register: 5, interiority: 10, tone: 3, difficulty: 6 },
    ["literary-fiction", "american-setting", "iowa-setting", "faith-and-doubt", "family", "small-town", "lyrical-prose", "meditative"]
  ),
  // Han Kang
  ...authorCluster(idsFor("Han Kang"),
    { prose_craft: 8, prose_style: 5, warmth: 3, intensity: 7, pace: 4, moral_complexity: 8, fabulism: 3, emotional_register: 2, interiority: 8, tone: 2, difficulty: 5 },
    ["literary-fiction", "translated-from", "korean-setting", "female-protagonist", "body", "violence", "political-intrigue", "restrained-prose"]
  ),
  // George Saunders
  ...authorCluster(idsFor("George Saunders"),
    { prose_craft: 8, prose_style: 5, warmth: 6, intensity: 5, pace: 6, moral_complexity: 7, fabulism: 4, emotional_register: 4, interiority: 6, tone: 6, difficulty: 4 },
    ["vignettes", "american-setting", "satirical", "near-future", "absurdist", "working-class", "warm", "dark-humor"]
  ),
  // Olga Tokarczuk
  ...authorCluster(idsFor("Olga Tokarczuk"),
    { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 4, pace: 3, moral_complexity: 7, fabulism: 4, emotional_register: 4, interiority: 7, tone: 4, difficulty: 6 },
    ["literary-fiction", "translated-from", "polish-setting", "multi-pov", "nonlinear", "philosophical", "ensemble-cast", "mythic-fantasy"]
  ),
  // Rachel Cusk
  ...authorCluster(idsFor("Rachel Cusk"),
    { prose_craft: 8, prose_style: 5, warmth: 3, intensity: 3, pace: 3, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 9, tone: 3, difficulty: 5 },
    ["autofiction", "female-protagonist", "british-setting", "domestic", "marriage", "divorce", "restrained-prose", "philosophical"]
  ),
  // Bret Easton Ellis
  ...authorCluster(idsFor("Bret Easton Ellis"),
    { prose_craft: 6, prose_style: 4, warmth: 1, intensity: 7, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 1, interiority: 6, tone: 3, difficulty: 4 },
    ["literary-fiction", "male-protagonist", "american-setting", "los-angeles-setting", "nihilistic", "transgressive", "capitalism", "alienation"]
  ),
  // Ottessa Moshfegh
  ...authorCluster(idsFor("Ottessa Moshfegh"),
    { prose_craft: 7, prose_style: 4, warmth: 2, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 2, interiority: 7, tone: 4, difficulty: 3 },
    ["literary-fiction", "female-protagonist", "alienation", "dark-humor", "contemporary-setting", "domestic", "transgressive"]
  ),
  // Mo Yan
  ...authorCluster(idsFor("Mo Yan"),
    { prose_craft: 8, prose_style: 7, warmth: 4, intensity: 7, pace: 5, moral_complexity: 8, fabulism: 4, emotional_register: 3, interiority: 5, tone: 4, difficulty: 6 },
    ["literary-fiction", "translated-from", "chinese-setting", "rural", "multigenerational", "political-intrigue", "magical-realism", "violence"]
  ),
  // Ismail Kadare
  ...authorCluster(idsFor("Ismail Kadare"),
    { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 5, pace: 4, moral_complexity: 8, fabulism: 3, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 },
    ["literary-fiction", "translated-from", "albanian-setting", "political-intrigue", "totalitarian", "allegorical", "historical-fiction"]
  ),
  // Jun'ichirō Tanizaki
  ...authorCluster(idsFor("Jun'ichirō Tanizaki"),
    { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 5, pace: 3, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 },
    ["literary-fiction", "translated-from", "japanese-setting", "obsession", "sexuality", "beauty", "domestic", "lyrical-prose"]
  ),
  // Patrick Modiano
  ...authorCluster(idsFor("Patrick Modiano"),
    { prose_craft: 8, prose_style: 4, warmth: 4, intensity: 2, pace: 3, moral_complexity: 6, fabulism: 2, emotional_register: 3, interiority: 8, tone: 3, difficulty: 5 },
    ["literary-fiction", "translated-from", "parisian-setting", "male-protagonist", "memory", "identity", "ww2-era", "restrained-prose", "dreamlike"]
  ),
  // Isaac Bashevis Singer
  ...authorCluster(idsFor("Isaac Bashevis Singer"),
    { prose_craft: 8, prose_style: 5, warmth: 5, intensity: 4, pace: 5, moral_complexity: 7, fabulism: 3, emotional_register: 4, interiority: 6, tone: 4, difficulty: 4 },
    ["literary-fiction", "translated-from", "Jewish-protagonist", "polish-setting", "new-york-setting", "shtetl", "folk-tale", "faith-and-doubt", "sexuality"]
  ),
  // Percival Everett
  ...authorCluster(idsFor("Percival Everett"),
    { prose_craft: 8, prose_style: 5, warmth: 5, intensity: 4, pace: 5, moral_complexity: 7, fabulism: 2, emotional_register: 4, interiority: 6, tone: 5, difficulty: 4 },
    ["literary-fiction", "male-protagonist", "american-setting", "race", "satirical", "identity", "witty-prose"]
  ),
  // Halldór Laxness
  ...authorCluster(idsFor("Halldór Laxness"),
    { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 4, pace: 3, moral_complexity: 7, fabulism: 2, emotional_register: 4, interiority: 6, tone: 4, difficulty: 5 },
    ["literary-fiction", "translated-from", "icelandic-setting", "rural", "pastoral", "community", "satirical", "working-class"]
  ),
};

const merged = { ...existing, ...batch };
fs.writeFileSync(SIDECAR, JSON.stringify(merged, null, 2));

const before = Object.keys(existing).length;
const after = Object.keys(merged).length;
console.log("Before:", before, "| Added:", Object.keys(batch).length, "| After:", after);
