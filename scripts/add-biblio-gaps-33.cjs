const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "Lucky Jim", author: "Kingsley Amis", pageCount: 251, genre: "Fiction", publicationDate: "1954-01-25", description: "A hapless junior lecturer at a provincial English university stumbles through a series of comic disasters.", series: null, tier: "S", topRank: null },
  { title: "The Old Devils", author: "Kingsley Amis", pageCount: 384, genre: "Fiction", publicationDate: "1986-09-25", description: "A group of aging Welsh friends reunite when a celebrity poet returns to their town. Booker Prize winner.", series: null, tier: "S", topRank: null },
  { title: "Ending Up", author: "Kingsley Amis", pageCount: 176, genre: "Fiction", publicationDate: "1974-01-01", description: "Five elderly people share a decaying cottage and grind each other down in bleak comedy.", series: null, tier: "A", topRank: null },
  { title: "The Green Man", author: "Kingsley Amis", pageCount: 256, genre: "Horror", publicationDate: "1969-01-01", description: "An alcoholic innkeeper confronts a seventeenth-century ghost in a country pub.", series: null, tier: "A", topRank: null },

  { title: "Justine", author: "Lawrence Durrell", pageCount: 253, genre: "Fiction", publicationDate: "1957-01-01", description: "The first volume of the Alexandria Quartet: an obsessive love affair in pre-WWII Alexandria, layered with intrigue and self-deception.", series: { name: "The Alexandria Quartet", order: 1, total: 4 }, tier: "S", topRank: null },
  { title: "Balthazar", author: "Lawrence Durrell", pageCount: 256, genre: "Fiction", publicationDate: "1958-01-01", description: "The same events retold from a different angle, revealing how much the first narrator misread.", series: { name: "The Alexandria Quartet", order: 2, total: 4 }, tier: "S", topRank: null },
  { title: "Mountolive", author: "Lawrence Durrell", pageCount: 320, genre: "Fiction", publicationDate: "1958-01-01", description: "A British diplomat's view of the Alexandria affair exposes a Coptic conspiracy beneath the love story.", series: { name: "The Alexandria Quartet", order: 3, total: 4 }, tier: "S", topRank: null },
  { title: "Clea", author: "Lawrence Durrell", pageCount: 288, genre: "Fiction", publicationDate: "1960-01-01", description: "The quartet's final movement, set during WWII, follows the survivors to their reckonings.", series: { name: "The Alexandria Quartet", order: 4, total: 4 }, tier: "S", topRank: null },

  { title: "The 42nd Parallel", author: "John Dos Passos", pageCount: 416, genre: "Fiction", publicationDate: "1930-01-01", description: "The first volume of the U.S.A. trilogy, following interwoven American lives in the early twentieth century through experimental 'newsreels' and biographies.", series: { name: "U.S.A.", order: 1, total: 3 }, tier: "S", topRank: null },
  { title: "Nineteen Nineteen", author: "John Dos Passos", pageCount: 416, genre: "Fiction", publicationDate: "1932-01-01", description: "The second U.S.A. volume follows its characters through the First World War and the Paris peace.", series: { name: "U.S.A.", order: 2, total: 3 }, tier: "S", topRank: null },
  { title: "The Big Money", author: "John Dos Passos", pageCount: 464, genre: "Fiction", publicationDate: "1936-01-01", description: "The U.S.A. trilogy closes with the Roaring Twenties and the onset of the Great Depression.", series: { name: "U.S.A.", order: 3, total: 3 }, tier: "S", topRank: null },

  { title: "The Man Without Qualities, Volume 1", author: "Robert Musil", pageCount: 752, genre: "Fiction", publicationDate: "1930-01-01", description: "A mathematician adrift in the last days of the Austro-Hungarian empire navigates a society preparing for a celebration that will never happen.", series: { name: "The Man Without Qualities", order: 1, total: 2 }, tier: "S", topRank: null },
  { title: "The Man Without Qualities, Volume 2", author: "Robert Musil", pageCount: 896, genre: "Fiction", publicationDate: "1933-01-01", description: "The unfinished second volume of Musil's modernist masterpiece, following Ulrich's entanglement with his sister Agathe.", series: { name: "The Man Without Qualities", order: 2, total: 2 }, tier: "S", topRank: null },

  { title: "Red Cavalry", author: "Isaac Babel", pageCount: 224, genre: "Fiction", publicationDate: "1926-01-01", description: "Linked stories drawn from Babel's time riding with a Cossack cavalry unit in the 1920 Polish-Soviet war.", series: null, tier: "S", topRank: null },
  { title: "Odessa Stories", author: "Isaac Babel", pageCount: 224, genre: "Fiction", publicationDate: "1931-01-01", description: "Tales of Jewish gangsters in the port city of Odessa, centering on the legendary Benya Krik.", series: null, tier: "A", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  // Yuri Olesha / Andrey Bely (moved from primary per routing rules)
  { title: "Envy", author: "Yuri Olesha", pageCount: 160, genre: "Fiction", publicationDate: "1927-01-01", description: "A drunken poet is taken in by a Soviet sausage magnate and plots his downfall in a fever-dream of Russian modernism.", series: null, tier: "A", topRank: null },

  { title: "Petersburg", author: "Andrey Bely", pageCount: 608, genre: "Fiction", publicationDate: "1913-01-01", description: "A revolutionary's son is ordered to assassinate his father with a time-bomb in 1905 St. Petersburg; Nabokov ranked it among the greatest novels of the century.", series: null, tier: "S", topRank: null },
  { title: "Kotik Letaev", author: "Andrey Bely", pageCount: 240, genre: "Fiction", publicationDate: "1922-01-01", description: "A child's consciousness remembered from within — Bely's experimental autobiographical novel.", series: null, tier: "B", topRank: null },

  // American postmodernist / mid-century
  { title: "The Manikin", author: "Joanna Scott", pageCount: 304, genre: "Fiction", publicationDate: "1996-01-01", description: "In an isolated Adirondack taxidermy museum, a manor house becomes a hothouse of obsession.", series: null, tier: "A", topRank: null },
  { title: "Arrogance", author: "Joanna Scott", pageCount: 272, genre: "Historical Fiction", publicationDate: "1990-01-01", description: "A novelistic portrait of the Austrian painter Egon Schiele and his scandal-ridden life.", series: null, tier: "A", topRank: null },
  { title: "Make Believe", author: "Joanna Scott", pageCount: 240, genre: "Fiction", publicationDate: "2000-01-01", description: "A biracial boy orphaned in a car crash is caught in a custody dispute between grandparents who never met.", series: null, tier: "B", topRank: null },

  { title: "Mulligan Stew", author: "Gilbert Sorrentino", pageCount: 464, genre: "Fiction", publicationDate: "1979-01-01", description: "An experimental metafiction in which characters rebel against their hack novelist author.", series: null, tier: "A", topRank: null },
  { title: "Imaginative Qualities of Actual Things", author: "Gilbert Sorrentino", pageCount: 264, genre: "Fiction", publicationDate: "1971-01-01", description: "A sardonic portrait of 1960s New York avant-garde circles, told through the narrator's relentless dismantling.", series: null, tier: "A", topRank: null },
  { title: "Aberration of Starlight", author: "Gilbert Sorrentino", pageCount: 192, genre: "Fiction", publicationDate: "1980-01-01", description: "A single weekend at a New Jersey boarding house, told from four perspectives and never fully reconciled.", series: null, tier: "A", topRank: null },

  { title: "Cigarettes", author: "Harry Mathews", pageCount: 304, genre: "Fiction", publicationDate: "1987-01-01", description: "Interlocking stories of New York society across decades, told through elaborate combinatorial structures.", series: null, tier: "A", topRank: null },
  { title: "Tlooth", author: "Harry Mathews", pageCount: 160, genre: "Fiction", publicationDate: "1966-01-01", description: "A baroque oulipian quest involving rival religious sects, a dentist, and surgical revenge.", series: null, tier: "A", topRank: null },
  { title: "The Journalist", author: "Harry Mathews", pageCount: 224, genre: "Fiction", publicationDate: "1994-01-01", description: "A man's increasingly elaborate journal entries document his collapse into obsession.", series: null, tier: "B", topRank: null },

  { title: "The Men's Club", author: "Leonard Michaels", pageCount: 176, genre: "Fiction", publicationDate: "1981-01-01", description: "Seven men in Berkeley meet for what becomes a long, savage night of confession.", series: null, tier: "A", topRank: null },
  { title: "Sylvia", author: "Leonard Michaels", pageCount: 144, genre: "Fiction", publicationDate: "1992-01-01", description: "An autobiographical novel of a brief and catastrophic 1960s Manhattan marriage.", series: null, tier: "A", topRank: null },

  { title: "Desperate Characters", author: "Paula Fox", pageCount: 176, genre: "Fiction", publicationDate: "1970-01-01", description: "A Brooklyn couple's weekend unravels after a stray cat bites the wife's hand.", series: null, tier: "S", topRank: null },
  { title: "The Widow's Children", author: "Paula Fox", pageCount: 224, genre: "Fiction", publicationDate: "1976-01-01", description: "A family gathering on the eve of a cruise turns into a night of grievances and cruelties.", series: null, tier: "A", topRank: null },
  { title: "Poor George", author: "Paula Fox", pageCount: 192, genre: "Fiction", publicationDate: "1967-01-01", description: "A schoolteacher's well-meaning attempt to save a troubled boy destroys his marriage.", series: null, tier: "B", topRank: null },

  // Eastern European
  { title: "The Engineer of Human Souls", author: "Josef Škvorecký", pageCount: 592, genre: "Fiction", publicationDate: "1977-01-01", description: "A Czech émigré professor in Toronto ranges across his life in a seven-layered novel of exile and memory.", series: null, tier: "S", topRank: null },
  { title: "The Cowards", author: "Josef Škvorecký", pageCount: 416, genre: "Fiction", publicationDate: "1958-01-01", description: "A week in a Czech town in May 1945 as WWII ends and everyone jockeys for position in the aftermath.", series: null, tier: "A", topRank: null },
  { title: "Miss Silver's Past", author: "Josef Škvorecký", pageCount: 288, genre: "Fiction", publicationDate: "1969-01-01", description: "A Prague editor becomes entangled with a mysterious young woman whose manuscripts conceal a dark history.", series: null, tier: "B", topRank: null },

  { title: "Skylark", author: "Dezső Kosztolányi", pageCount: 240, genre: "Fiction", publicationDate: "1924-01-01", description: "A Hungarian provincial couple's plain spinster daughter leaves for a one-week vacation, and her parents discover what their lives could have been.", series: null, tier: "S", topRank: null },
  { title: "Kornél Esti", author: "Dezső Kosztolányi", pageCount: 272, genre: "Fiction", publicationDate: "1933-01-01", description: "Linked stories about the narrator's alter ego, a scapegrace double who embodies everything he cannot live out.", series: null, tier: "A", topRank: null },
  { title: "Anna Édes", author: "Dezső Kosztolányi", pageCount: 240, genre: "Fiction", publicationDate: "1926-01-01", description: "A provincial servant girl in post-WWI Budapest is worked until she breaks.", series: null, tier: "A", topRank: null },

  { title: "A Book of Memories", author: "Péter Nádas", pageCount: 720, genre: "Fiction", publicationDate: "1986-01-01", description: "Three interwoven first-person narratives span Cold War Europe and the interior life of memory.", series: null, tier: "S", topRank: null },
  { title: "Parallel Stories", author: "Péter Nádas", pageCount: 1152, genre: "Fiction", publicationDate: "2005-01-01", description: "A century-spanning epic of Central European lives, sprawling through Budapest, Berlin, and history.", series: null, tier: "S", topRank: null },

  // Hebrew / Jewish literary
  { title: "Badenheim 1939", author: "Aharon Appelfeld", pageCount: 160, genre: "Fiction", publicationDate: "1978-01-01", description: "An Austrian resort town of Jewish vacationers slowly, dreamlike, is closed off from the world.", series: null, tier: "S", topRank: null },
  { title: "The Iron Tracks", author: "Aharon Appelfeld", pageCount: 224, genre: "Fiction", publicationDate: "1991-01-01", description: "A Holocaust survivor rides the same postwar train circuit every year, hunting the officer who killed his parents.", series: null, tier: "A", topRank: null },
  { title: "Tzili", author: "Aharon Appelfeld", pageCount: 192, genre: "Fiction", publicationDate: "1983-01-01", description: "A slow-witted Jewish girl is left behind when her family flees; she survives the war in the forests and fields.", series: null, tier: "A", topRank: null },

  { title: "Only Yesterday", author: "S.Y. Agnon", pageCount: 656, genre: "Fiction", publicationDate: "1945-01-01", description: "A young Jew leaves Galicia for Palestine in the early twentieth century and becomes entangled with a stray dog who carries his destiny.", series: null, tier: "S", topRank: null },
  { title: "A Simple Story", author: "S.Y. Agnon", pageCount: 256, genre: "Fiction", publicationDate: "1935-01-01", description: "A young man in a Galician shtetl is forced to abandon the woman he loves for a respectable marriage.", series: null, tier: "A", topRank: null },

  // Japanese modernist
  { title: "The Wild Geese", author: "Mori Ōgai", pageCount: 144, genre: "Fiction", publicationDate: "1913-01-01", description: "A medical student in Meiji-era Tokyo glimpses and almost rescues the unhappy mistress of a moneylender.", series: null, tier: "A", topRank: null },
  { title: "Vita Sexualis", author: "Mori Ōgai", pageCount: 160, genre: "Fiction", publicationDate: "1909-01-01", description: "A philosopher reconstructs his sexual education in turn-of-the-century Japan.", series: null, tier: "B", topRank: null },

  { title: "Rashomon and Seventeen Other Stories", author: "Ryunosuke Akutagawa", pageCount: 272, genre: "Fiction", publicationDate: "1915-01-01", description: "Classic short fiction from Japan's most celebrated early-twentieth-century storyteller, including the famous title story.", series: null, tier: "S", topRank: null },
  { title: "Kappa", author: "Ryunosuke Akutagawa", pageCount: 128, genre: "Fiction", publicationDate: "1927-01-01", description: "A mental patient recounts his journey to the land of the Kappa — a satirical alternate Japan.", series: null, tier: "A", topRank: null },

  { title: "Kitchen", author: "Yoshimoto Banana", pageCount: 152, genre: "Fiction", publicationDate: "1988-01-01", description: "A young woman grieving her grandmother finds an unexpected family in the transgender mother of a casual acquaintance.", series: null, tier: "S", topRank: null },
  { title: "Goodbye Tsugumi", author: "Yoshimoto Banana", pageCount: 208, genre: "Fiction", publicationDate: "1989-01-01", description: "A last summer in a seaside town with a sickly, cruel, beloved cousin.", series: null, tier: "A", topRank: null },
  { title: "Amrita", author: "Yoshimoto Banana", pageCount: 384, genre: "Fiction", publicationDate: "1994-01-01", description: "A young woman's brain injury leaves her adrift and open to the half-real relationships around her.", series: null, tier: "B", topRank: null },

  // African literature
  { title: "The Beautyful Ones Are Not Yet Born", author: "Ayi Kwei Armah", pageCount: 224, genre: "Fiction", publicationDate: "1968-01-01", description: "A nameless railway clerk resists the corruption overwhelming post-independence Ghana.", series: null, tier: "S", topRank: null },
  { title: "Fragments", author: "Ayi Kwei Armah", pageCount: 288, genre: "Fiction", publicationDate: "1970-01-01", description: "A Ghanaian just back from America refuses the expectations of wealth and display that his family places on him.", series: null, tier: "A", topRank: null },

  { title: "So Long a Letter", author: "Mariama Bâ", pageCount: 96, genre: "Fiction", publicationDate: "1981-01-01", description: "A widowed Senegalese woman writes a long letter to her best friend about her husband, his second wife, and her own life.", series: null, tier: "S", topRank: null },
  { title: "Scarlet Song", author: "Mariama Bâ", pageCount: 192, genre: "Fiction", publicationDate: "1981-01-01", description: "A marriage between a Senegalese man and a French woman collides with the pull of his family and culture.", series: null, tier: "A", topRank: null },

  // Irish mid-century
  { title: "The Lonely Passion of Judith Hearne", author: "Brian Moore", pageCount: 240, genre: "Fiction", publicationDate: "1955-01-01", description: "A spinster piano teacher in 1950s Belfast battles crushing loneliness and creeping alcoholism.", series: null, tier: "S", topRank: null },
  { title: "Black Robe", author: "Brian Moore", pageCount: 256, genre: "Historical Fiction", publicationDate: "1985-01-01", description: "A young Jesuit priest treks into seventeenth-century New France to convert the Huron.", series: null, tier: "A", topRank: null },
  { title: "The Statement", author: "Brian Moore", pageCount: 256, genre: "Thriller", publicationDate: "1995-01-01", description: "An old Vichy war criminal, hidden by the Catholic church for decades, is finally being hunted down.", series: null, tier: "A", topRank: null },

  // Nordic literary
  { title: "The Ice Palace", author: "Tarjei Vesaas", pageCount: 176, genre: "Fiction", publicationDate: "1963-01-01", description: "Two eleven-year-old Norwegian girls form an instant bond; the next day, one vanishes into a frozen waterfall.", series: null, tier: "S", topRank: null },
  { title: "The Birds", author: "Tarjei Vesaas", pageCount: 224, genre: "Fiction", publicationDate: "1957-01-01", description: "A simple-minded man lives with his sister in a Norwegian cottage, reading omens in the flight of woodcocks.", series: null, tier: "S", topRank: null },
  { title: "The Boat in the Evening", author: "Tarjei Vesaas", pageCount: 192, genre: "Fiction", publicationDate: "1968-01-01", description: "Prose poems and meditations on nature, memory, and mortality.", series: null, tier: "A", topRank: null },

  { title: "Blackwater", author: "Kerstin Ekman", pageCount: 448, genre: "Mystery", publicationDate: "1993-01-01", description: "A young mother stumbles across two bodies in a remote Swedish forest, and decades later the mystery resurfaces.", series: null, tier: "S", topRank: null },
  { title: "The Forest of Hours", author: "Kerstin Ekman", pageCount: 432, genre: "Fantasy", publicationDate: "1988-01-01", description: "A troll lives among humans across five centuries of Swedish history.", series: null, tier: "A", topRank: null },
  { title: "Under the Snow", author: "Kerstin Ekman", pageCount: 256, genre: "Mystery", publicationDate: "1961-01-01", description: "A Lapland schoolteacher is killed and a small-town policeman must piece together what happened.", series: null, tier: "B", topRank: null },

  { title: "Bathsheba", author: "Torgny Lindgren", pageCount: 256, genre: "Historical Fiction", publicationDate: "1984-01-01", description: "A retelling of the biblical story of David and Bathsheba from inside its characters' minds.", series: null, tier: "A", topRank: null },
  { title: "The Way of a Serpent", author: "Torgny Lindgren", pageCount: 144, genre: "Fiction", publicationDate: "1982-01-01", description: "A Swedish peasant family is gradually destroyed by a merchant's sexual exploitation across generations.", series: null, tier: "A", topRank: null },

  { title: "The Seducer", author: "Jan Kjærstad", pageCount: 672, genre: "Fiction", publicationDate: "1993-01-01", description: "A Norwegian TV star returns home to find his wife murdered, and the novel moves in loops through his life seeking the why.", series: { name: "Jonas Wergeland", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "The Conqueror", author: "Jan Kjærstad", pageCount: 560, genre: "Fiction", publicationDate: "1996-01-01", description: "The same Jonas Wergeland, now reconstructed from his rivals' and friends' perspectives.", series: { name: "Jonas Wergeland", order: 2, total: 3 }, tier: "A", topRank: null },

  { title: "Professor Andersen's Night", author: "Dag Solstad", pageCount: 160, genre: "Fiction", publicationDate: "1996-01-01", description: "An Oslo professor sees a murder through his window on Christmas Eve and does nothing.", series: null, tier: "A", topRank: null },
  { title: "T. Singer", author: "Dag Solstad", pageCount: 272, genre: "Fiction", publicationDate: "1999-01-01", description: "A librarian moves to a small Norwegian town and tries to disappear into an invented life.", series: null, tier: "A", topRank: null },
  { title: "Shyness and Dignity", author: "Dag Solstad", pageCount: 160, genre: "Fiction", publicationDate: "1994-01-01", description: "An Oslo high school teacher snaps one day over a broken umbrella and Ibsen's Wild Duck.", series: null, tier: "A", topRank: null },
];

function keyOf(b) { return (b.title + "|" + b.author).toLowerCase(); }

const data = JSON.parse(fs.readFileSync(CATALOG, "utf8"));
const books = Array.isArray(data) ? data : (data.books || []);
const existingKeys = new Set(books.map(keyOf));
const freshPrimary = PRIMARY_ADDITIONS.filter(b => !existingKeys.has(keyOf(b)));
const nextBooks = books.concat(freshPrimary);
fs.writeFileSync(CATALOG, JSON.stringify(Array.isArray(data) ? nextBooks : { ...data, books: nextBooks }));
console.log(`PRIMARY: added ${freshPrimary.length} books, ${books.length} → ${nextBooks.length}`);

let recData = fs.existsSync(REC_LIBRARY) ? JSON.parse(fs.readFileSync(REC_LIBRARY, "utf8")) : [];
const recBooks = Array.isArray(recData) ? recData : (recData.books || []);
const recKeys = new Set(recBooks.map(keyOf));
const freshRec = REC_LIBRARY_ADDITIONS.filter(b => !recKeys.has(keyOf(b)));
const nextRec = recBooks.concat(freshRec);
fs.writeFileSync(REC_LIBRARY, JSON.stringify(Array.isArray(recData) || !recData.books ? nextRec : { ...recData, books: nextRec }));
console.log(`REC LIBRARY: added ${freshRec.length}, ${recBooks.length} → ${nextRec.length}`);

const pSize = (fs.statSync(CATALOG).size / 1024 / 1024).toFixed(2);
const rSize = (fs.statSync(REC_LIBRARY).size / 1024).toFixed(1);
console.log(`\nbook-data.json: ${pSize} MB`);
console.log(`rec-library.json: ${rSize} KB`);
