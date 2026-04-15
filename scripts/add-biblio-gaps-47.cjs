const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [];

const REC_LIBRARY_ADDITIONS = [
  // Contemporary Israeli
  { title: "Love Life", author: "Zeruya Shalev", pageCount: 288, genre: "Fiction", publicationDate: "1997-01-01", description: "A young married Jerusalem student falls into a consuming affair with her father's old friend.", series: null, tier: "S", topRank: null },
  { title: "Husband and Wife", author: "Zeruya Shalev", pageCount: 304, genre: "Fiction", publicationDate: "2000-01-01", description: "An Israeli woman wakes one morning to find her husband paralyzed, and their whole shared life is thrown into question.", series: null, tier: "A", topRank: null },
  { title: "Pain", author: "Zeruya Shalev", pageCount: 320, genre: "Fiction", publicationDate: "2015-01-01", description: "Ten years after surviving a Jerusalem bombing, an Israeli woman runs into her first love in a hospital waiting room.", series: null, tier: "A", topRank: null },

  { title: "Homesick", author: "Eshkol Nevo", pageCount: 432, genre: "Fiction", publicationDate: "2004-01-01", description: "Five residents of an apartment house near Jerusalem at the millennium pull at each other's edges — Nevo's breakthrough novel.", series: null, tier: "A", topRank: null },
  { title: "World Cup Wishes", author: "Eshkol Nevo", pageCount: 336, genre: "Fiction", publicationDate: "2007-01-01", description: "Four Israeli friends in 1998 write down the things they hope to achieve before the next World Cup — and the novel follows them across four years.", series: null, tier: "A", topRank: null },
  { title: "Three Floors Up", author: "Eshkol Nevo", pageCount: 288, genre: "Fiction", publicationDate: "2015-01-01", description: "Three Tel Aviv neighbors in one building each tell a crisis of their lives that their building could not contain.", series: null, tier: "A", topRank: null },

  { title: "The Missing File", author: "Dror Mishani", pageCount: 288, genre: "Mystery", publicationDate: "2011-01-01", description: "An Israeli police detective in a bleak Holon suburb investigates the disappearance of a teenage boy — the first Avraham Avraham mystery.", series: { name: "Avraham Avraham", order: 1, total: 5 }, tier: "A", topRank: null },
  { title: "Three", author: "Dror Mishani", pageCount: 288, genre: "Thriller", publicationDate: "2018-01-01", description: "Three Israeli women become entangled with the same dangerous online dating prospect.", series: null, tier: "A", topRank: null },

  { title: "One Night, Markovitch", author: "Ayelet Gundar-Goshen", pageCount: 384, genre: "Historical Fiction", publicationDate: "2012-01-01", description: "A plain Jewish man in British Mandate Palestine marries a beautiful refugee woman to rescue her from Europe and refuses to grant her a divorce.", series: null, tier: "A", topRank: null },
  { title: "Waking Lions", author: "Ayelet Gundar-Goshen", pageCount: 432, genre: "Thriller", publicationDate: "2016-01-01", description: "An Israeli neurosurgeon hits an Eritrean refugee on a desert road and drives away — and the dead man's wife finds him.", series: null, tier: "S", topRank: null },

  { title: "The Hilltop", author: "Assaf Gavron", pageCount: 464, genre: "Fiction", publicationDate: "2013-01-01", description: "A small unauthorized Israeli settlement in the West Bank is built and defended by a handful of committed, deluded, and ordinary people.", series: null, tier: "A", topRank: null },
  { title: "Almost Dead", author: "Assaf Gavron", pageCount: 336, genre: "Fiction", publicationDate: "2006-01-01", description: "A Tel Aviv businessman survives three suicide bombings in one week and shares a hospital room with a Palestinian fighter.", series: null, tier: "A", topRank: null },

  // Contemporary Spanish women
  { title: "Four by Four", author: "Sara Mesa", pageCount: 224, genre: "Fiction", publicationDate: "2012-01-01", description: "A mysterious crisis unfolds at an elite Spanish boarding school cut off from the outside world.", series: null, tier: "S", topRank: null },
  { title: "Among the Hedges", author: "Sara Mesa", pageCount: 144, genre: "Fiction", publicationDate: "2020-01-01", description: "A truant Spanish schoolgirl spends her days in a city park with an older man in Mesa's unsettling small novel.", series: null, tier: "A", topRank: null },

  { title: "The Back Room", author: "Carmen Martín Gaite", pageCount: 208, genre: "Fiction", publicationDate: "1978-01-01", description: "A Spanish woman writer wakes in the middle of the night to interview a mysterious visitor about her childhood under Franco — winner of the Spanish National Prize.", series: null, tier: "S", topRank: null },
  { title: "Variable Cloud", author: "Carmen Martín Gaite", pageCount: 336, genre: "Fiction", publicationDate: "1992-01-01", description: "Two Spanish women estranged since their childhood days in Franco-era Madrid resume a correspondence that excavates their whole lives.", series: null, tier: "A", topRank: null },

  { title: "Death Rites", author: "Alicia Giménez Bartlett", pageCount: 240, genre: "Mystery", publicationDate: "1996-01-01", description: "Barcelona inspector Petra Delicado — the first novel in the long-running Spanish mystery series.", series: { name: "Petra Delicado", order: 1, total: 12 }, tier: "A", topRank: null },
  { title: "Dog Day", author: "Alicia Giménez Bartlett", pageCount: 256, genre: "Mystery", publicationDate: "1997-01-01", description: "Petra Delicado investigates the murder of a Barcelona man who lived alone with dozens of dogs.", series: { name: "Petra Delicado", order: 2, total: 12 }, tier: "A", topRank: null },

  // Contemporary Portuguese / Lusophone
  { title: "Blank Gaze", author: "José Luís Peixoto", pageCount: 208, genre: "Fiction", publicationDate: "2000-01-01", description: "A rural Portuguese village wears away across generations of quiet devastation — Peixoto's debut novel.", series: null, tier: "S", topRank: null },
  { title: "The Piano Cemetery", author: "José Luís Peixoto", pageCount: 272, genre: "Fiction", publicationDate: "2006-01-01", description: "A Lisbon carpenter's family is traced through a piano workshop where his dead pianos are kept.", series: null, tier: "A", topRank: null },
  { title: "Galveias", author: "José Luís Peixoto", pageCount: 304, genre: "Fiction", publicationDate: "2014-01-01", description: "A mysterious object crashes into a remote Portuguese village and the novel follows the aftershocks through its inhabitants.", series: null, tier: "A", topRank: null },

  { title: "The Return", author: "Dulce Maria Cardoso", pageCount: 272, genre: "Historical Fiction", publicationDate: "2011-01-01", description: "A teenage Portuguese boy retornado from newly independent Angola arrives in a crumbling Lisbon hotel with his family.", series: null, tier: "A", topRank: null },

  { title: "The Apocalypse of Workers", author: "Valter Hugo Mãe", pageCount: 192, genre: "Fiction", publicationDate: "2008-01-01", description: "Two Portuguese cleaning women and the Ukrainian man who loves one of them navigate a pinched working-class Porto life.", series: null, tier: "A", topRank: null },

  { title: "Kokoschka's Doll", author: "Afonso Cruz", pageCount: 512, genre: "Fiction", publicationDate: "2010-01-01", description: "A Dresden bird-seller after WWII, a writer's manuscript that may or may not be stolen, and Oskar Kokoschka's life-sized doll of Alma Mahler.", series: null, tier: "S", topRank: null },

  { title: "Good Morning Comrades", author: "Ondjaki", pageCount: 128, genre: "Fiction", publicationDate: "2001-01-01", description: "A boy in 1990 Luanda navigates the final years of Angolan socialism in a tender coming-of-age novel.", series: null, tier: "S", topRank: null },
  { title: "Granma Nineteen and the Soviet's Secret", author: "Ondjaki", pageCount: 160, genre: "Fiction", publicationDate: "2008-01-01", description: "A group of Angolan children in a seaside neighborhood discover that the Russians are planning to demolish their street.", series: null, tier: "A", topRank: null },
  { title: "Transparent City", author: "Ondjaki", pageCount: 400, genre: "Fiction", publicationDate: "2012-01-01", description: "A single Luanda apartment building holds a panorama of modern Angolan life as a man inside it literally turns invisible.", series: null, tier: "S", topRank: null },

  { title: "The Murmuring Coast", author: "Lídia Jorge", pageCount: 288, genre: "Historical Fiction", publicationDate: "1988-01-01", description: "A young Portuguese woman arrives in Mozambique at the end of the colonial war and watches the old empire break apart.", series: null, tier: "S", topRank: null },
  { title: "The Painter of Birds", author: "Lídia Jorge", pageCount: 288, genre: "Fiction", publicationDate: "1998-01-01", description: "A young Portuguese woman reconstructs the life of her uncle, a painter of birds who emigrated to Africa.", series: null, tier: "A", topRank: null },

  // Additional Japanese literary
  { title: "The Word Book", author: "Mieko Kanai", pageCount: 160, genre: "Fiction", publicationDate: "1979-01-01", description: "Twelve interlinked short stories that play with narrative frames and memory — Dalkey Archive.", series: null, tier: "A", topRank: null },
  { title: "Oh, Tama!", author: "Mieko Kanai", pageCount: 192, genre: "Fiction", publicationDate: "1987-01-01", description: "A Tokyo man unexpectedly inherits a pregnant cat named Tama from a drifter friend and his life reorganizes around the animal.", series: null, tier: "A", topRank: null },

  { title: "Where the Wild Ladies Are", author: "Aoko Matsuda", pageCount: 272, genre: "Fiction", publicationDate: "2016-01-01", description: "Japanese ghost stories retold as feminist fables set in the present-day office economy — Tilted Axis.", series: null, tier: "A", topRank: null },

  { title: "The Factory", author: "Hiroko Oyamada", pageCount: 128, genre: "Fiction", publicationDate: "2013-01-01", description: "Three workers start new jobs at a massive, inscrutable Japanese factory and find that their tasks make no sense.", series: null, tier: "S", topRank: null },
  { title: "The Hole", author: "Hiroko Oyamada", pageCount: 112, genre: "Fiction", publicationDate: "2014-01-01", description: "A young woman follows her husband to a rural Japanese town and falls into a hole she is sure contains a strange creature.", series: null, tier: "A", topRank: null },
  { title: "Weasels in the Attic", author: "Hiroko Oyamada", pageCount: 96, genre: "Fiction", publicationDate: "2022-10-04", description: "Three linked stories about fertility, domestic animals, and a disintegrating Japanese friendship.", series: null, tier: "A", topRank: null },

  { title: "Terminal Boredom", author: "Izumi Suzuki", pageCount: 224, genre: "Sci-Fi", publicationDate: "2021-04-20", description: "Seven stories by one of Japanese science fiction's long-forgotten counterculture voices — Verso.", series: null, tier: "A", topRank: null },
  { title: "Hit Parade of Tears", author: "Izumi Suzuki", pageCount: 304, genre: "Sci-Fi", publicationDate: "2023-04-04", description: "More Suzuki stories — feminist, melancholy, druggy, genre-eroding — recovered decades after her death.", series: null, tier: "A", topRank: null },

  { title: "Tokyo Ueno Station", author: "Yu Miri", pageCount: 192, genre: "Fiction", publicationDate: "2014-01-01", description: "A ghost in Ueno Park narrates his life as a laborer from Fukushima who worked on the 1964 Tokyo Olympics — National Book Award winner.", series: null, tier: "S", topRank: null },
  { title: "Gold Rush", author: "Yu Miri", pageCount: 304, genre: "Fiction", publicationDate: "1998-01-01", description: "A fourteen-year-old Yokohama boy plots to murder his pachinko-parlor-owning father.", series: null, tier: "A", topRank: null },

  { title: "The Thief", author: "Fuminori Nakamura", pageCount: 224, genre: "Fiction", publicationDate: "2009-01-01", description: "A solitary Tokyo pickpocket is pulled back into a crew that demands a bigger, more dangerous job.", series: null, tier: "A", topRank: null },
  { title: "Evil and the Mask", author: "Fuminori Nakamura", pageCount: 368, genre: "Fiction", publicationDate: "2010-01-01", description: "A young Japanese man is raised from childhood to become a cancer on society and spends his adult life trying to stop.", series: null, tier: "A", topRank: null },
  { title: "Last Winter, We Parted", author: "Fuminori Nakamura", pageCount: 224, genre: "Thriller", publicationDate: "2013-01-01", description: "A Japanese journalist interviews a photographer on death row and begins to doubt which of them is the true predator.", series: null, tier: "A", topRank: null },

  { title: "Memoirs of a Polar Bear", author: "Yōko Tawada", pageCount: 288, genre: "Fiction", publicationDate: "2011-01-01", description: "Three generations of a Berlin polar bear family tell their own stories — celebrity, motherhood, exile.", series: null, tier: "S", topRank: null },
  { title: "The Emissary", author: "Yōko Tawada", pageCount: 160, genre: "Sci-Fi", publicationDate: "2014-01-01", description: "A near-future Japan cut off from the world: the elderly live forever, the children are frail. National Book Award winner.", series: null, tier: "S", topRank: null },

  // Black feminist canon
  { title: "Zami: A New Spelling of My Name", author: "Audre Lorde", pageCount: 256, genre: "Non-Fiction", publicationDate: "1982-01-01", description: "Lorde's autobiographical 'biomythography' of her Black lesbian coming-of-age in Harlem, Mexico, and Stamford.", series: null, tier: "S", topRank: null },
  { title: "Sister Outsider", author: "Audre Lorde", pageCount: 208, genre: "Non-Fiction", publicationDate: "1984-01-01", description: "Fifteen essays that form one of the foundational texts of Black feminist thought.", series: null, tier: "S", topRank: null },
  { title: "The Cancer Journals", author: "Audre Lorde", pageCount: 96, genre: "Non-Fiction", publicationDate: "1980-01-01", description: "Lorde's journals of her mastectomy and the refusal of the prosthesis, in her unflinching voice.", series: null, tier: "A", topRank: null },

  { title: "Some of Us Did Not Die", author: "June Jordan", pageCount: 320, genre: "Non-Fiction", publicationDate: "2002-01-01", description: "Jordan's essential essays across two decades of political, poetic, and pedagogical argument.", series: null, tier: "A", topRank: null },

  { title: "The Salt Eaters", author: "Toni Cade Bambara", pageCount: 304, genre: "Fiction", publicationDate: "1980-01-01", description: "A Black activist in a small Georgia town sits in a healing session and reckons with suicidal exhaustion — American Book Award winner.", series: null, tier: "S", topRank: null },
  { title: "Gorilla, My Love", author: "Toni Cade Bambara", pageCount: 192, genre: "Fiction", publicationDate: "1972-01-01", description: "Fifteen short stories of Black American life, voiced with Bambara's urgent ear.", series: null, tier: "A", topRank: null },

  { title: "Corregidora", author: "Gayl Jones", pageCount: 192, genre: "Fiction", publicationDate: "1975-01-01", description: "A blues singer is beaten by her husband and loses her womb, and with it the chain of inherited memory her mother and grandmothers kept alive.", series: null, tier: "S", topRank: null },
  { title: "Eva's Man", author: "Gayl Jones", pageCount: 192, genre: "Fiction", publicationDate: "1976-01-01", description: "A Black woman in a psychiatric prison slowly reveals why she killed her lover — Jones's harrowing second novel.", series: null, tier: "A", topRank: null },

  { title: "All About Love", author: "bell hooks", pageCount: 240, genre: "Non-Fiction", publicationDate: "2000-01-01", description: "hooks's widely read essay-length exploration of love as ethic and political practice.", series: null, tier: "S", topRank: null },

  // Austrian contemporary
  { title: "A Whole Life", author: "Robert Seethaler", pageCount: 160, genre: "Fiction", publicationDate: "2014-01-01", description: "The life of a solitary man in an Austrian Alpine valley from the early twentieth century through the 1970s.", series: null, tier: "S", topRank: null },
  { title: "The Tobacconist", author: "Robert Seethaler", pageCount: 256, genre: "Historical Fiction", publicationDate: "2012-01-01", description: "A young apprentice tobacconist in 1937 Vienna befriends a customer named Sigmund Freud as Nazism consumes the city.", series: null, tier: "S", topRank: null },
  { title: "The Field", author: "Robert Seethaler", pageCount: 240, genre: "Fiction", publicationDate: "2018-01-01", description: "The dead of a small Austrian town's cemetery each rise briefly to narrate a fragment of their lives.", series: null, tier: "A", topRank: null },

  { title: "The Old King in His Exile", author: "Arno Geiger", pageCount: 192, genre: "Non-Fiction", publicationDate: "2011-01-01", description: "Geiger's memoir of his father's descent into dementia, written with humor and piercing clarity.", series: null, tier: "A", topRank: null },

  { title: "The English Years", author: "Norbert Gstrein", pageCount: 336, genre: "Fiction", publicationDate: "1999-01-01", description: "An Austrian writer investigates the life of a dead exiled Austrian Jewish writer in wartime London.", series: null, tier: "A", topRank: null },

  { title: "The Liquid Land", author: "Raphaela Edelbauer", pageCount: 288, genre: "Fiction", publicationDate: "2019-01-01", description: "An Austrian physicist returns home to bury her parents and discovers her village is built on a sinkhole concealing a Nazi crime.", series: null, tier: "S", topRank: null },
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
