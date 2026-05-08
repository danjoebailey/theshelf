// Backfill subgenre tags identified as gaps in tag-coverage audit:
//   dark-academia, mythic-retellings, alternate-history, scandi-noir,
//   splatterpunk, new-weird, queer-romance, litrpg, progression-fantasy,
//   wuxia, xianxia, spy-thriller, techno-thriller, political-thriller
//
// Strategy: high-precision rules on author cluster + named title overrides.
// Better to under-tag than over-tag — easier to add later than retract.
//
// Run: node scripts/backfill-subgenres.cjs
// Outputs: counts added per tag, then writes public/book-tags.json in place.

const fs = require("fs");
const path = require("path");

const BOOKS_PATH = path.join(__dirname, "..", "public", "book-data.json");
const TAGS_PATH  = path.join(__dirname, "..", "public", "book-tags.json");

const books = JSON.parse(fs.readFileSync(BOOKS_PATH, "utf8"));
const tags  = JSON.parse(fs.readFileSync(TAGS_PATH,  "utf8"));

const norm = s => (s || "").toLowerCase().replace(/\./g, "").replace(/\s+/g, " ").trim();
const titleNorm = s => norm(s).replace(/[^a-z0-9 ]/g, "");

// Tag rules: each entry is { tag, authors: Set<normAuthor>, titlesOnly?: Set<normTitle>, titlesByAuthor?: { [normAuthor]: Set<normTitle> } }
// authors  → tag every book by author
// titlesOnly → tag book matching title regardless of author (for distinctive standalones)
// titlesByAuthor → tag only specific titles by author (for selective tagging within an oeuvre)
const RULES = [
  {
    tag: "romantasy",
    authors: new Set([
      "laura thalassa",
      "hannah whitten",
      "allison saft",
      "elise kova",
    ].map(norm)),
    titlesByAuthor: {
      "rebecca yarros": ["fourth wing", "iron flame", "onyx storm"],
      "holly black": [
        "the cruel prince", "the wicked king", "the queen of nothing",
        "the stolen heir", "how the king of elfhame learned to hate stories",
      ],
      "kerri maniscalco": [
        "kingdom of the wicked", "kingdom of the cursed", "kingdom of the feared",
        "throne of the fallen",
      ],
      "naomi novik": ["spinning silver", "uprooted"],
    },
  },
  {
    tag: "dark-academia",
    titlesByAuthor: {
      "donna tartt": ["the secret history"],
      "leigh bardugo": ["ninth house", "hell bent"],
      "rf kuang": ["babel"],
      "r f kuang": ["babel"],
      "ml rio": ["if we were villains"],
      "m l rio": ["if we were villains"],
      "mona awad": ["bunny"],
      "susanna clarke": ["piranesi"],
      "tana french": ["the likeness"],
      "lev grossman": ["the magicians", "the magician king", "the magicians land"],
      "olivie blake": ["the atlas six", "the atlas paradox", "the atlas complex"],
      "ninth house": [],
    },
    authors: new Set(["m l rio", "ml rio"]),
  },
  {
    tag: "mythic-retellings",
    authors: new Set([
      "madeline miller",
      "jennifer saint",
      "natalie haynes",
      "stephen fry",
      "claire heywood",
      "costanza casati",
    ].map(norm)),
    titlesByAuthor: {
      "pat barker": [
        "the silence of the girls", "the women of troy", "the voyage home",
      ],
      "ursula k le guin": ["lavinia"],
      "margaret atwood": ["the penelopiad"],
      "david malouf": ["ransom"],
      "marie phillips": ["gods behaving badly"],
      "colm toibin": ["house of names"],
      "elizabeth cook": ["achilles"],
      "margaret george": ["helen of troy", "the memoirs of cleopatra"],
      "mary renault": [
        "the king must die", "the bull from the sea",
        "the last of the wine", "the mask of apollo",
        "the praise singer", "fire from heaven",
        "the persian boy", "funeral games",
      ],
    },
  },
  {
    tag: "alternate-history",
    authors: new Set([
      "harry turtledove",
    ].map(norm)),
    titlesByAuthor: {
      "mary robinette kowal": [
        "the calculating stars", "the fated sky", "the relentless moon",
        "the martian contingency",
      ],
      "naomi novik": [
        "his majestys dragon", "throne of jade", "black powder war",
        "empire of ivory", "victory of eagles", "tongues of serpents",
        "crucible of gold", "blood of tyrants", "league of dragons",
      ],
      "philip k dick": ["the man in the high castle"],
      "robert harris": ["fatherland", "the second sleep"],
      "kim stanley robinson": ["the years of rice and salt"],
      "michael chabon": ["the yiddish policemens union"],
      "ben h winters": ["underground airlines"],
      "susanna clarke": ["jonathan strange  mr norrell"],
      "len deighton": ["ss-gb"],
      "kate atkinson": ["life after life"],
      "mary gentle": ["ash a secret history"],
      "stephen fry": ["making history"],
      "stephen king": ["112263"],
      "guy gavriel kay": [
        "tigana", "the lions of al-rassan",
        "under heaven", "river of stars", "all the seas of the world",
        "a brightness long ago", "children of earth and sky",
        "the last light of the sun", "ysabel",
      ],
    },
  },
  {
    tag: "scandi-noir",
    authors: new Set([
      "stieg larsson",
      "jo nesbo",
      "jo nesbø",
      "henning mankell",
      "camilla lackberg",
      "camilla läckberg",
      "karin fossum",
      "arnaldur indridason",
      "arnaldur indriðason",
      "lars kepler",
      "yrsa sigurdardottir",
      "yrsa sigurðardóttir",
      "jussi adler-olsen",
      "jussi adler olsen",
      "anders roslund",
      "helene tursten",
      "ake edwardson",
      "asa larsson",
      "håkan nesser",
      "hakan nesser",
      "peter høeg",
      "peter hoeg",
      "kjell eriksson",
      "leif gw persson",
      "leif g w persson",
      "david lagercrantz",
    ].map(norm)),
  },
  {
    tag: "splatterpunk",
    authors: new Set([
      "edward lee",
      "richard laymon",
      "jack ketchum",
      "wrath james white",
      "bryan smith",
      "ryan harding",
    ].map(norm)),
    titlesByAuthor: {
      "brian keene": ["the rising", "city of the dead", "the conqueror worms", "the complex"],
      "clive barker": ["the books of blood"],
    },
  },
  {
    tag: "new-weird",
    authors: new Set([
      "china mieville",
      "china miéville",
      "k j bishop",
      "kj bishop",
      "steph swainston",
    ].map(norm)),
    titlesByAuthor: {
      "jeff vandermeer": [
        "annihilation", "authority", "acceptance",
        "borne", "dead astronauts",
        "city of saints and madmen", "shriek an afterword", "finch",
        "hummingbird salamander", "absolution",
      ],
      "m john harrison": ["light", "nova swing", "empty space", "viriconium"],
    },
  },
  {
    tag: "queer-romance",
    authors: new Set([
      "casey mcquiston",
      "kj charles",
      "k j charles",
      "alexis hall",
      "tj klune",
      "t j klune",
      "alice oseman",
      "cat sebastian",
      "roan parrish",
      "annabeth albert",
      "ashley herring blake",
      "talia hibbert",
      "rachel reid",
      "freya marske",
      "ck oren",
      "c k oren",
      "tj alexander",
      "t j alexander",
    ].map(norm)),
    titlesByAuthor: {
      "sarah waters": ["tipping the velvet", "fingersmith", "affinity", "the night watch", "the paying guests"],
      "mackenzi lee": ["the gentlemans guide to vice and virtue", "the ladys guide to petticoats and piracy"],
      "aiden thomas": ["cemetery boys"],
      "becky albertalli": ["simon vs the homo sapiens agenda", "leah on the offbeat", "what if its us"],
      "adam silvera": ["they both die at the end", "more happy than not", "history is all you left me", "what if its us"],
    },
  },
  {
    tag: "litrpg",
    authors: new Set([
      "matt dinniman",
      "travis bagwell",
      "andrew rowe",
      "luke chmilenko",
      "aleron kong",
      "daniel schinhofen",
      "blaise corvin",
    ].map(norm)),
    titlesByAuthor: {
      "shirtaloon": [],
      "domagoj kurmaic": [],
    },
  },
  {
    tag: "progression-fantasy",
    authors: new Set([
      "will wight",
      "andrew rowe",
      "shirtaloon",
      "domagoj kurmaic",
      "sarah lin",
    ].map(norm)),
  },
  {
    tag: "wuxia",
    authors: new Set([
      "jin yong",
      "louis cha",
      "gu long",
    ].map(norm)),
    titlesByAuthor: {
      "rf kuang": ["the poppy war", "the dragon republic", "the burning god"],
      "r f kuang": ["the poppy war", "the dragon republic", "the burning god"],
    },
  },
  {
    tag: "xianxia",
    authors: new Set([
      "mxtx",
      "mo xiang tong xiu",
      "priest",
      "meng xi shi",
    ].map(norm)),
    titlesByAuthor: {
      "xiran jay zhao": ["iron widow"],
      "shelley parker-chan": ["she who became the sun", "he who drowned the world"],
      "sue lynn tan": ["daughter of the moon goddess", "heart of the sun warrior", "immortal longings"],
    },
  },
  {
    tag: "spy-thriller",
    authors: new Set([
      "john le carre",
      "john le carré",
      "frederick forsyth",
      "charles mccarry",
      "mick herron",
      "alan furst",
      "charles cumming",
      "daniel silva",
      "olen steinhauer",
      "stella rimington",
      "robert littell",
      "ian fleming",
      "joseph kanon",
      "alex berenson",
      "len deighton",
      "anthony horowitz",
      "ben macintyre",
      "graham greene",
      "eric ambler",
      "helen macinnes",
      "lauren wilkinson",
      "i s berry",
      "vince flynn",
      "kim philby",
    ].map(norm)),
    titlesByAuthor: {
      "graham greene": [
        "our man in havana", "the human factor", "the quiet american",
        "the third man", "the confidential agent", "the ministry of fear",
      ],
    },
  },
  {
    tag: "techno-thriller",
    authors: new Set([
      "tom clancy",
      "michael crichton",
      "daniel suarez",
      "daniel h wilson",
      "daniel wilson",
      "vince flynn",
      "brad thor",
      "mark greaney",
      "marc cameron",
      "richard marcinko",
      "dale brown",
      "stephen coonts",
      "larry bond",
      "ralph peters",
      "patrick robinson",
    ].map(norm)),
  },
  {
    tag: "political-thriller",
    authors: new Set([
      "robert ludlum",
      "richard north patterson",
      "joseph finder",
      "david baldacci",
      "brad meltzer",
      "ross thomas",
      "jeffrey archer",
    ].map(norm)),
    titlesByAuthor: {
      "robert harris": [
        "fatherland", "archangel", "the ghost", "conclave",
        "imperium", "lustrum", "dictator", "an officer and a spy",
        "munich", "v2", "act of oblivion", "precipice",
      ],
      "frederick forsyth": [
        "the day of the jackal", "the odessa file", "the dogs of war",
        "the fourth protocol", "icon", "the kill list", "the fox",
      ],
      "allen drury": ["advise and consent"],
      "graham greene": ["the comedians", "the heart of the matter"],
    },
  },
];

// Build per-id tag set lookup with title/author
const idMeta = new Map();
books.forEach(b => idMeta.set(b.id, { title: titleNorm(b.title), author: norm(b.author) }));

const added = {}; // tag -> count
const skipped = {}; // tag -> count (already present)

function ensureTag(id, tag) {
  if (!tags[id]) tags[id] = { tags: [] };
  if (!Array.isArray(tags[id].tags)) tags[id].tags = [];
  if (tags[id].tags.includes(tag)) {
    skipped[tag] = (skipped[tag] || 0) + 1;
    return false;
  }
  tags[id].tags.push(tag);
  added[tag] = (added[tag] || 0) + 1;
  return true;
}

for (const rule of RULES) {
  const authorSet = rule.authors || new Set();
  const titlesByAuthor = rule.titlesByAuthor || {};
  const normTitlesByAuthor = {};
  for (const a in titlesByAuthor) {
    normTitlesByAuthor[norm(a)] = (titlesByAuthor[a] || []).map(titleNorm);
  }

  for (const [id, meta] of idMeta) {
    let match = false;
    if (authorSet.has(meta.author)) match = true;
    if (!match) {
      const titles = normTitlesByAuthor[meta.author];
      if (titles && titles.includes(meta.title)) match = true;
    }
    if (match) ensureTag(id, rule.tag);
  }
}

// Summary
console.log("Backfill summary:");
const allTags = new Set([...Object.keys(added), ...Object.keys(skipped)]);
[...allTags].sort().forEach(t => {
  const a = added[t] || 0;
  const s = skipped[t] || 0;
  console.log(`  ${t}: +${a} added, ${s} already present (total now ${a + s})`);
});

fs.writeFileSync(TAGS_PATH, JSON.stringify(tags));
console.log("\nWrote", TAGS_PATH);
