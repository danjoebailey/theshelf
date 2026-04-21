const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");

const ADDITIONS = [
  // Eudora Welty (1)
  { title: "A Curtain of Green", author: "Eudora Welty", pageCount: 240, genre: "Fiction", publicationDate: "1941", description: "Welty's first story collection, set in her native Mississippi — the book that introduced her sharp, compassionate eye for small-town Southern life.", series: null, tier: 1, topRank: null },

  // Carson McCullers (1)
  { title: "The Mortgaged Heart", author: "Carson McCullers", pageCount: 288, genre: "Fiction", publicationDate: "1972", description: "McCullers's posthumous collection of uncollected stories, essays, and unfinished work — edited by her sister and published five years after her death.", series: null, tier: 1, topRank: null },

  // Bernard Malamud (5)
  { title: "The Magic Barrel", author: "Bernard Malamud", pageCount: 224, genre: "Fiction", publicationDate: "1958", description: "Malamud's National Book Award-winning debut story collection, including 'The Last Mohican,' 'Take Pity,' and the title story of a marriage broker and a lonely rabbinical student.", series: null, tier: 1, topRank: null },
  { title: "A New Life", author: "Bernard Malamud", pageCount: 368, genre: "Fiction", publicationDate: "1961", description: "An Eastern academic arrives at a small Pacific Northwest college for a fresh start and stumbles into an affair with a colleague's wife — Malamud's semi-autobiographical campus novel.", series: null, tier: 1, topRank: null },
  { title: "Idiots First", author: "Bernard Malamud", pageCount: 240, genre: "Fiction", publicationDate: "1963", description: "Malamud's second story collection, with the title story of a dying father trying to put his disabled son on a train to a relative before the hour of his death.", series: null, tier: 1, topRank: null },
  { title: "The Tenants", author: "Bernard Malamud", pageCount: 256, genre: "Fiction", publicationDate: "1971", description: "A Jewish novelist and a Black writer share the top floor of a condemned New York building and circle each other through literary rivalry, race, and love — Malamud's most combustible novel.", series: null, tier: 1, topRank: null },
  { title: "Pictures of Fidelman", author: "Bernard Malamud", pageCount: 240, genre: "Fiction", publicationDate: "1969", description: "A linked series of stories following Arthur Fidelman, a failed American painter drifting through Italy — Malamud's comic meditation on art, fraud, and self-deception.", series: null, tier: 1, topRank: null },

  // Isaac Bashevis Singer (2)
  { title: "Zlateh the Goat", author: "Isaac Bashevis Singer", pageCount: 112, genre: "Young Adult", publicationDate: "1966", description: "Singer's Newbery Honor children's story collection, drawn from the folk traditions of Eastern European shtetls — his first major work for younger readers.", series: null, tier: 1, topRank: null },
  { title: "Satan in Goray", author: "Isaac Bashevis Singer", pageCount: 240, genre: "Historical Fiction", publicationDate: "1935", description: "Singer's first novel: in the aftermath of the 1648 Khmelnytsky massacres, a traumatized Polish shtetl falls under the spell of the false messiah Sabbatai Zevi.", series: null, tier: 1, topRank: null },

  // Grace Paley (1)
  { title: "The Little Disturbances of Man", author: "Grace Paley", pageCount: 192, genre: "Fiction", publicationDate: "1959", description: "Paley's first story collection, introducing the Bronx Jewish-American voice that would shape her career — eleven short stories of women, lovers, and children in the city.", series: null, tier: 1, topRank: null },

  // Jared Diamond (3)
  { title: "The Third Chimpanzee", author: "Jared Diamond", pageCount: 416, genre: "Non-Fiction", publicationDate: "1991", description: "Diamond's first popular book, arguing that humans are the third species of chimpanzee — and tracing the biology, culture, and destructive potential that followed our genetic split.", series: null, tier: 1, topRank: null },
  { title: "Upheaval", author: "Jared Diamond", pageCount: 512, genre: "Non-Fiction", publicationDate: "2019", description: "Diamond's comparative study of how seven nations have handled existential crises, from Meiji Japan to post-WWII Germany, with lessons for the contemporary United States.", series: null, tier: 1, topRank: null },
  { title: "Why Is Sex Fun?", author: "Jared Diamond", pageCount: 176, genre: "Non-Fiction", publicationDate: "1997", description: "Diamond's short evolutionary biology book on why human sexuality is so unusual — concealed ovulation, non-reproductive sex, and monogamy in mammals.", series: null, tier: 1, topRank: null },

  // Richard Feynman (4)
  { title: "Surely You're Joking, Mr. Feynman!", author: "Richard Feynman", pageCount: 384, genre: "Biography", publicationDate: "1985", description: "Feynman's memoir as told to Ralph Leighton — Los Alamos pranks, Brazilian samba, safecracking, and the story of a physicist who refused to take anything at face value.", series: null, tier: 1, topRank: null },
  { title: "What Do You Care What Other People Think?", author: "Richard Feynman", pageCount: 256, genre: "Biography", publicationDate: "1988", description: "The sequel to Surely You're Joking — stories of Feynman's wife Arline, plus his account of the Challenger disaster investigation and the O-ring demonstration.", series: null, tier: 1, topRank: null },
  { title: "Six Easy Pieces", author: "Richard Feynman", pageCount: 176, genre: "Non-Fiction", publicationDate: "1994", description: "The six simplest chapters from Feynman's legendary Caltech physics lectures, published as an accessible introduction for non-physicists.", series: null, tier: 1, topRank: null },
  { title: "QED: The Strange Theory of Light and Matter", author: "Richard Feynman", pageCount: 192, genre: "Non-Fiction", publicationDate: "1985", description: "Feynman's four lectures on quantum electrodynamics for a general audience — how to explain the world's strangest physics without a single equation.", series: null, tier: 1, topRank: null },

  // Adam Smith (2)
  { title: "The Wealth of Nations", author: "Adam Smith", pageCount: 1152, genre: "Non-Fiction", publicationDate: "1776", description: "Smith's foundational work of classical economics: division of labor, the invisible hand of the market, and the first sustained argument for free trade.", series: null, tier: 1, topRank: null },
  { title: "The Theory of Moral Sentiments", author: "Adam Smith", pageCount: 400, genre: "Non-Fiction", publicationDate: "1759", description: "Smith's earlier work, arguing that human morality is founded on sympathy and the capacity to imagine ourselves in others' positions — the book he considered his masterpiece.", series: null, tier: 1, topRank: null },

  // Karl Marx (2)
  { title: "Critique of the Gotha Program", author: "Karl Marx", pageCount: 96, genre: "Non-Fiction", publicationDate: "1875", description: "Marx's private letter attacking the unification program of Germany's socialist parties — containing his most developed statement of the transition from socialism to communism.", series: null, tier: 1, topRank: null },
  { title: "The Eighteenth Brumaire of Louis Napoleon", author: "Karl Marx", pageCount: 160, genre: "Non-Fiction", publicationDate: "1852", description: "Marx's analysis of Louis-Napoleon's 1851 coup in France — the source of the observation that history repeats itself 'the first time as tragedy, the second as farce.'", series: null, tier: 1, topRank: null },

  // John Maynard Keynes (2)
  { title: "The General Theory of Employment, Interest, and Money", author: "John Maynard Keynes", pageCount: 464, genre: "Non-Fiction", publicationDate: "1936", description: "Keynes's foundational argument that market economies can settle into equilibrium below full employment, and that government spending can rescue them — the book that made modern macroeconomics.", series: null, tier: 1, topRank: null },
  { title: "The Economic Consequences of the Peace", author: "John Maynard Keynes", pageCount: 304, genre: "Non-Fiction", publicationDate: "1919", description: "Keynes's polemic against the Versailles Treaty, predicting that its punitive reparations would wreck Germany's economy and destabilize Europe — a prediction that came true within fifteen years.", series: null, tier: 1, topRank: null },

  // Iain Banks (mainstream novels, 6)
  { title: "The Wasp Factory", author: "Iain Banks", pageCount: 192, genre: "Fiction", publicationDate: "1984", description: "Banks's shocking debut: a sixteen-year-old Scottish boy on a remote island has killed three family members and constructed a ritual device from a giant clock face and wasps.", series: null, tier: 1, topRank: null },
  { title: "The Bridge", author: "Iain Banks", pageCount: 288, genre: "Fiction", publicationDate: "1986", description: "Three intercut narratives — a comatose man in a Scottish hospital, a dreamer trapped on a gigantic Forth Bridge, and a barbarian across fantasy worlds — knit into one life.", series: null, tier: 1, topRank: null },
  { title: "Complicity", author: "Iain Banks", pageCount: 320, genre: "Thriller", publicationDate: "1993", description: "A jaded Edinburgh journalist wakes up to discover that prominent Thatcher-era Britons are being murdered in the exact ways he once imagined killing them.", series: null, tier: 1, topRank: null },
  { title: "The Crow Road", author: "Iain Banks", pageCount: 512, genre: "Fiction", publicationDate: "1992", description: "A student in an Argyll family with a large eccentric clan investigates his vanished uncle and the dark family secret his death hints at — Banks's warmest mainstream novel.", series: null, tier: 1, topRank: null },
  { title: "A Song of Stone", author: "Iain Banks", pageCount: 288, genre: "Fiction", publicationDate: "1997", description: "An unnamed European civil war: a castle's lord and his half-sister are forced to entertain a band of armed refugees whose charismatic female lieutenant begins to unravel them.", series: null, tier: 1, topRank: null },
  { title: "The Steep Approach to Garbadale", author: "Iain Banks", pageCount: 400, genre: "Fiction", publicationDate: "2007", description: "A prodigal son returns to his wealthy family's Highland estate for the vote on selling their boardgame empire — and for his cousin and first love.", series: null, tier: 1, topRank: null },

  // Iain M. Banks (1)
  { title: "The Algebraist", author: "Iain M. Banks", pageCount: 544, genre: "Sci-Fi", publicationDate: "2004", description: "Banks's only standalone non-Culture space opera: a human xenologist tries to translate the secrets of an ancient gas-giant civilization before a fascist invasion arrives.", series: null, tier: 1, topRank: null },

  // Lois McMaster Bujold (1)
  { title: "Beguilement", author: "Lois McMaster Bujold", pageCount: 400, genre: "Fantasy", publicationDate: "2006", description: "The first Sharing Knife novel: a young farmer girl is rescued from a malice by a mysterious Lakewalker patroller and begins a romance that crosses two hostile cultures.", series: { name: "The Sharing Knife", order: 1, total: 4 }, tier: 1, topRank: null },

  // Octavia E. Butler (6)
  { title: "Kindred", author: "Octavia E. Butler", pageCount: 288, genre: "Sci-Fi", publicationDate: "1979", description: "A Black woman in 1976 California is repeatedly pulled back in time to a Maryland plantation to save the white ancestor who will eventually rape her great-grandmother.", series: null, tier: 1, topRank: null },
  { title: "Parable of the Sower", author: "Octavia E. Butler", pageCount: 368, genre: "Sci-Fi", publicationDate: "1993", description: "In a near-future California collapsing under climate chaos and corporate feudalism, a teenage girl with hyperempathy syndrome flees north and founds a new religion.", series: { name: "Earthseed", order: 1, total: 2 }, tier: 1, topRank: null },
  { title: "Parable of the Talents", author: "Octavia E. Butler", pageCount: 416, genre: "Sci-Fi", publicationDate: "1998", description: "The sequel to Parable of the Sower: Lauren Olamina's Earthseed community is destroyed by a fundamentalist president's Christian America Crusaders — Nebula winner.", series: { name: "Earthseed", order: 2, total: 2 }, tier: 1, topRank: null },
  { title: "Wild Seed", author: "Octavia E. Butler", pageCount: 320, genre: "Sci-Fi", publicationDate: "1980", description: "A 17th-century African shape-shifter and an ancient body-swapping predator meet in West Africa and begin a centuries-long struggle that crosses the Atlantic.", series: { name: "Patternmaster", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "Dawn", author: "Octavia E. Butler", pageCount: 256, genre: "Sci-Fi", publicationDate: "1987", description: "The first of the Xenogenesis trilogy: the last survivors of a devastated Earth are awakened centuries later by the alien Oankali, who offer to save them at the price of genetic merger.", series: { name: "Lilith's Brood", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Bloodchild and Other Stories", author: "Octavia E. Butler", pageCount: 224, genre: "Sci-Fi", publicationDate: "1995", description: "Butler's story collection, including the Hugo- and Nebula-winning title novella of humans on an alien world who must host their protectors' young to earn their place.", series: null, tier: 1, topRank: null },

  // Tad Williams (4)
  { title: "City of Golden Shadow", author: "Tad Williams", pageCount: 784, genre: "Sci-Fi", publicationDate: "1996", description: "The first Otherland novel: children all over the world are falling into unexplained comas, and their minds appear to be trapped in a secret corporate virtual reality network.", series: { name: "Otherland", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "River of Blue Fire", author: "Tad Williams", pageCount: 720, genre: "Sci-Fi", publicationDate: "1998", description: "The second Otherland novel: the scattered heroes explore the simulated worlds built by the Grail Brotherhood, each one a different impossible reality.", series: { name: "Otherland", order: 2, total: 4 }, tier: 1, topRank: null },
  { title: "Mountain of Black Glass", author: "Tad Williams", pageCount: 768, genre: "Sci-Fi", publicationDate: "1999", description: "The third Otherland novel: the heroes approach the ultimate secret of the Otherland network while the Brotherhood's enforcer closes in.", series: { name: "Otherland", order: 3, total: 4 }, tier: 1, topRank: null },
  { title: "Sea of Silver Light", author: "Tad Williams", pageCount: 912, genre: "Sci-Fi", publicationDate: "2001", description: "The concluding Otherland novel: the true nature of the network — and of the entity at its center — is finally revealed.", series: { name: "Otherland", order: 4, total: 4 }, tier: 1, topRank: null },

  // Federico García Lorca (4)
  { title: "Poet in New York", author: "Federico García Lorca", pageCount: 320, genre: "Fiction", publicationDate: "1940", description: "Lorca's posthumous book of poems written during his 1929–30 stay in New York — surrealist, apocalyptic, and strikingly different from his Andalusian work.", series: null, tier: 1, topRank: null },
  { title: "Yerma", author: "Federico García Lorca", pageCount: 96, genre: "Fiction", publicationDate: "1934", description: "The second play in Lorca's rural trilogy: a barren Spanish peasant woman's desperate longing for a child drives her to destruction.", series: null, tier: 1, topRank: null },
  { title: "Blood Wedding", author: "Federico García Lorca", pageCount: 96, genre: "Fiction", publicationDate: "1933", description: "The first play in Lorca's rural trilogy: a bride flees her own wedding with her former lover, and the two men who love her pursue each other to the death.", series: null, tier: 1, topRank: null },
  { title: "The House of Bernarda Alba", author: "Federico García Lorca", pageCount: 96, genre: "Fiction", publicationDate: "1936", description: "Lorca's final play, written weeks before his assassination: a widowed matriarch imprisons her five daughters in an eight-year mourning while a single eligible bachelor haunts the village.", series: null, tier: 1, topRank: null },

  // Ford Madox Ford (1)
  { title: "The Fifth Queen", author: "Ford Madox Ford", pageCount: 384, genre: "Historical Fiction", publicationDate: "1906", description: "The first volume of Ford's Tudor trilogy about Katharine Howard, the fifth wife of Henry VIII — Ford's first serious fiction and a model for English historical romance.", series: null, tier: 1, topRank: null },
];

console.log(`Will add ${ADDITIONS.length} books\n`);

const data = JSON.parse(fs.readFileSync(CATALOG, "utf8"));
const books = Array.isArray(data) ? data : (data.books || Object.values(data).find(v => Array.isArray(v)));
const before = books.length;

const existingKeys = new Set(books.map(b => (b.title + "|" + b.author).toLowerCase()));
const duplicates = [];
const toAdd = [];
for (const a of ADDITIONS) {
  const key = (a.title + "|" + a.author).toLowerCase();
  if (existingKeys.has(key)) duplicates.push(a);
  else { toAdd.push(a); existingKeys.add(key); }
}

if (duplicates.length > 0) {
  console.log(`⚠ Skipping ${duplicates.length} duplicates:`);
  for (const d of duplicates) console.log(`  - "${d.title}" — ${d.author}`);
}

const next = books.concat(toAdd);
fs.writeFileSync(CATALOG, JSON.stringify(next));
const stat = fs.statSync(CATALOG);
console.log(`\nAdded ${toAdd.length} books`);
console.log(`Before: ${before} | After: ${next.length}`);
console.log(`File size: ${(stat.size / 1024 / 1024).toFixed(2)} MB`);
