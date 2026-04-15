const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "After the Winter", author: "Guadalupe Nettel", pageCount: 240, genre: "Fiction", publicationDate: "2014-01-01", description: "A Cuban man living in Paris and a Mexican woman living in New York share a long-distance romance of letters and meetings.", series: null, tier: "A", topRank: null },
  { title: "Natural Histories", author: "Guadalupe Nettel", pageCount: 128, genre: "Fiction", publicationDate: "2013-01-01", description: "Five stories in which animals mirror the psychological pressures of the human characters who keep them.", series: null, tier: "A", topRank: null },

  { title: "Glory", author: "NoViolet Bulawayo", pageCount: 416, genre: "Fiction", publicationDate: "2022-03-08", description: "An Animal Farm-style satire of a Zimbabwe-like nation's transition of power, told entirely through animal characters. Booker shortlist.", series: null, tier: "S", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  // Catalan
  { title: "Confessions", author: "Jaume Cabré", pageCount: 752, genre: "Fiction", publicationDate: "2011-01-01", description: "A Barcelona linguist dying of Alzheimer's writes a last long letter to his dead beloved — a Catalan epic that spans centuries.", series: null, tier: "S", topRank: null },
  { title: "Winter Journey", author: "Jaume Cabré", pageCount: 224, genre: "Fiction", publicationDate: "2000-01-01", description: "Cabré's linked stories threaded through a Schubert song cycle — Catalan literature's formal puzzle master.", series: null, tier: "A", topRank: null },

  { title: "The Enormity of the Tragedy", author: "Quim Monzó", pageCount: 160, genre: "Fiction", publicationDate: "1989-01-01", description: "A Barcelona trumpet player develops a permanent erection that becomes a kind of curse on his family.", series: null, tier: "A", topRank: null },
  { title: "Gasoline", author: "Quim Monzó", pageCount: 128, genre: "Fiction", publicationDate: "1983-01-01", description: "A Catalan avant-garde painter is slowly displaced in his own marriage and his own studio by a younger rival.", series: null, tier: "A", topRank: null },

  { title: "Stone in a Landslide", author: "Maria Barbal", pageCount: 144, genre: "Fiction", publicationDate: "1985-01-01", description: "A Catalan peasant woman narrates her entire life across the twentieth-century Pyrenees in a small, devastating monologue.", series: null, tier: "S", topRank: null },

  // Basque
  { title: "Obabakoak", author: "Bernardo Atxaga", pageCount: 336, genre: "Fiction", publicationDate: "1988-01-01", description: "A metafictional collection of linked stories set in the Basque village of Obaba — Spain's National Prize for Literature.", series: null, tier: "S", topRank: null },
  { title: "The Accordionist's Son", author: "Bernardo Atxaga", pageCount: 416, genre: "Fiction", publicationDate: "2003-01-01", description: "A Basque man dying in California reconstructs his youth in a village haunted by the Spanish Civil War and ETA.", series: null, tier: "A", topRank: null },
  { title: "The Lone Man", author: "Bernardo Atxaga", pageCount: 288, genre: "Fiction", publicationDate: "1993-01-01", description: "A former ETA militant turned Barcelona hotelkeeper reluctantly hides two old comrades on the run.", series: null, tier: "A", topRank: null },

  // Slovenian / Croatian / Serbian / Bosnian
  { title: "I Saw Her That Night", author: "Drago Jančar", pageCount: 208, genre: "Historical Fiction", publicationDate: "2010-01-01", description: "Five people remember a beautiful Slovenian woman who vanished in WWII — one of the great contemporary Slovenian novels.", series: null, tier: "S", topRank: null },
  { title: "The Galley Slave", author: "Drago Jančar", pageCount: 376, genre: "Historical Fiction", publicationDate: "1978-01-01", description: "A young Slovenian peasant in the seventeenth century is sentenced to the Venetian galleys.", series: null, tier: "A", topRank: null },

  { title: "Yugoslavia, My Fatherland", author: "Goran Vojnović", pageCount: 272, genre: "Fiction", publicationDate: "2011-01-01", description: "A young Slovenian discovers that his father, presumed dead since the Yugoslav wars, is alive and wanted for war crimes.", series: null, tier: "A", topRank: null },
  { title: "Southern Scum Go Home!", author: "Goran Vojnović", pageCount: 240, genre: "Fiction", publicationDate: "2008-01-01", description: "A Slovenian teenager with Bosnian parents narrates life on the margins of Ljubljana's estates.", series: null, tier: "A", topRank: null },

  { title: "Sarajevo Marlboro", author: "Miljenko Jergović", pageCount: 144, genre: "Fiction", publicationDate: "1994-01-01", description: "Linked stories of Sarajevo during and after the siege — Jergović's breakthrough collection.", series: null, tier: "S", topRank: null },
  { title: "The Walnut Mansion", author: "Miljenko Jergović", pageCount: 768, genre: "Historical Fiction", publicationDate: "2003-01-01", description: "Jergović's massive saga of a Dubrovnik family across the twentieth-century Balkans — told backwards.", series: null, tier: "S", topRank: null },
  { title: "Kin", author: "Miljenko Jergović", pageCount: 900, genre: "Fiction", publicationDate: "2013-01-01", description: "Jergović's autobiographical maximalist novel of his own Croatian-Bosnian family.", series: null, tier: "A", topRank: null },

  { title: "Trieste", author: "Daša Drndić", pageCount: 384, genre: "Historical Fiction", publicationDate: "2007-01-01", description: "A dying Italian-Slovenian woman searches for the child the SS took from her during the war — New Directions.", series: null, tier: "S", topRank: null },
  { title: "Belladonna", author: "Daša Drndić", pageCount: 384, genre: "Fiction", publicationDate: "2012-01-01", description: "A retired Croatian psychologist looks back on a century of European catastrophe through fragments of his own disintegrating mind.", series: null, tier: "S", topRank: null },
  { title: "EEG", author: "Daša Drndić", pageCount: 384, genre: "Fiction", publicationDate: "2016-01-01", description: "Drndić's final novel — the same protagonist continues his archival rage against forgetting.", series: null, tier: "A", topRank: null },

  { title: "The Use of Man", author: "Aleksandar Tišma", pageCount: 368, genre: "Historical Fiction", publicationDate: "1976-01-01", description: "A Jewish woman and her former German tutor trace the WWII destruction of Novi Sad's Jewish community — NYRB Classics.", series: null, tier: "S", topRank: null },
  { title: "Kapo", author: "Aleksandar Tišma", pageCount: 336, genre: "Historical Fiction", publicationDate: "1987-01-01", description: "A postwar Bosnian pharmacist secretly a former Auschwitz Kapo tries to outrun his own past.", series: null, tier: "A", topRank: null },

  // Finnish / Baltic literary
  { title: "The Czar's Madman", author: "Jaan Kross", pageCount: 352, genre: "Historical Fiction", publicationDate: "1978-01-01", description: "A nineteenth-century Estonian nobleman writes a dangerous letter to the Tsar and is declared insane. Kross's canonical historical novel.", series: null, tier: "S", topRank: null },
  { title: "Professor Martens' Departure", author: "Jaan Kross", pageCount: 288, genre: "Historical Fiction", publicationDate: "1984-01-01", description: "An aging Estonian international-law professor travels by train to meet the Russian foreign minister and reviews his life.", series: null, tier: "A", topRank: null },

  { title: "The American Girl", author: "Monika Fagerholm", pageCount: 528, genre: "Fiction", publicationDate: "2004-01-01", description: "An American girl arrives in a small Finnish coastal community in the 1960s and changes two local girls' lives forever.", series: null, tier: "S", topRank: null },
  { title: "The Glitter Scene", author: "Monika Fagerholm", pageCount: 496, genre: "Fiction", publicationDate: "2009-01-01", description: "The American Girl's follow-up revisits the Finnish coastal community decades after the first novel's central tragedy.", series: null, tier: "A", topRank: null },

  // Contemporary Latin American women
  { title: "Pink Slime", author: "Fernanda Trías", pageCount: 208, genre: "Sci-Fi", publicationDate: "2020-01-01", description: "A Uruguayan woman cares for her ex-husband and a troubled boy in a coastal city poisoned by algae.", series: null, tier: "A", topRank: null },
  { title: "The Rooftop", author: "Fernanda Trías", pageCount: 160, genre: "Fiction", publicationDate: "2001-01-01", description: "A single mother in Montevideo retreats to her apartment rooftop with her infant and a caged bird.", series: null, tier: "A", topRank: null },

  { title: "Elena Knows", author: "Claudia Piñeiro", pageCount: 176, genre: "Mystery", publicationDate: "2007-01-01", description: "A Parkinson's-afflicted Argentine mother insists on investigating her daughter's ruled-suicide death — International Booker finalist.", series: null, tier: "S", topRank: null },
  { title: "Thursday Night Widows", author: "Claudia Piñeiro", pageCount: 320, genre: "Mystery", publicationDate: "2005-01-01", description: "Three wealthy Argentine men are found dead in a swimming pool in an exclusive gated community.", series: null, tier: "A", topRank: null },
  { title: "Betty Boo", author: "Claudia Piñeiro", pageCount: 336, genre: "Mystery", publicationDate: "2011-01-01", description: "A female Argentine journalist and a cast of rival reporters investigate a suburban businessman's murder.", series: null, tier: "A", topRank: null },

  { title: "Jawbone", author: "Mónica Ojeda", pageCount: 272, genre: "Horror", publicationDate: "2018-01-01", description: "Teenage girls at an elite Ecuadorian Catholic school bully each other through a game that invokes pagan gods.", series: null, tier: "S", topRank: null },
  { title: "Nefando", author: "Mónica Ojeda", pageCount: 192, genre: "Fiction", publicationDate: "2016-01-01", description: "Three Ecuadorian siblings create a notorious underground video game with their apartment-mates in Barcelona.", series: null, tier: "A", topRank: null },

  { title: "The Wind That Lays Waste", author: "Selva Almada", pageCount: 128, genre: "Fiction", publicationDate: "2012-01-01", description: "An evangelical Argentine preacher and his teenage daughter break down in the countryside and are helped by a mechanic and his assistant.", series: null, tier: "A", topRank: null },
  { title: "Dead Girls", author: "Selva Almada", pageCount: 144, genre: "Non-Fiction", publicationDate: "2014-01-01", description: "Almada investigates three unsolved femicides from her own rural Argentine 1980s youth.", series: null, tier: "A", topRank: null },

  // African contemporary new wave
  { title: "A Particular Kind of Black Man", author: "Tope Folarin", pageCount: 256, genre: "Fiction", publicationDate: "2019-08-06", description: "A Nigerian American boy growing up in Utah is shaped by his father's abandonment and his own inherited mental illness.", series: null, tier: "A", topRank: null },

  { title: "Blackass", author: "A. Igoni Barrett", pageCount: 272, genre: "Fiction", publicationDate: "2015-03-04", description: "A Lagos man wakes up white — except for his buttocks — and decides to use the transformation to his advantage.", series: null, tier: "A", topRank: null },
  { title: "Love Is Power, or Something Like That", author: "A. Igoni Barrett", pageCount: 240, genre: "Fiction", publicationDate: "2013-01-08", description: "Nine stories of contemporary Nigerian life, mostly set in Lagos — Barrett's breakthrough collection.", series: null, tier: "A", topRank: null },

  { title: "On Black Sisters' Street", author: "Chika Unigwe", pageCount: 304, genre: "Fiction", publicationDate: "2009-01-01", description: "Four African sex workers in Antwerp's red-light district reconstruct how they arrived there after one of them is murdered.", series: null, tier: "A", topRank: null },
  { title: "Better Never Than Late", author: "Chika Unigwe", pageCount: 208, genre: "Fiction", publicationDate: "2019-06-19", description: "Linked stories of Nigerian and other African immigrants in contemporary Belgium.", series: null, tier: "A", topRank: null },

  { title: "Foreign Gods, Inc.", author: "Okey Ndibe", pageCount: 336, genre: "Fiction", publicationDate: "2014-01-14", description: "A Nigerian New York cab driver steals a small war deity from his home village to sell at a Manhattan gallery.", series: null, tier: "A", topRank: null },
  { title: "Arrows of Rain", author: "Okey Ndibe", pageCount: 288, genre: "Fiction", publicationDate: "2000-01-01", description: "A Nigerian journalist discovers a prostitute's body on the beach and exposes a general's decades-old crimes.", series: null, tier: "A", topRank: null },
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
