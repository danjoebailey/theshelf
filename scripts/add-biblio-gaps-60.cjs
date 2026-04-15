const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [];

const REC_LIBRARY_ADDITIONS = [
  // Classical antiquity
  { title: "The Golden Ass", author: "Apuleius", pageCount: 336, genre: "Fiction", publicationDate: "180-01-01", description: "A young man accidentally transformed into a donkey wanders the Roman world — the only Latin novel to survive complete.", series: null, tier: "S", topRank: null },
  { title: "The Satyricon", author: "Petronius", pageCount: 208, genre: "Fiction", publicationDate: "66-01-01", description: "The surviving fragments of Petronius's raucous first-century Roman picaresque of drifters, banquets, and Trimalchio's feast.", series: null, tier: "S", topRank: null },
  { title: "The Twelve Caesars", author: "Suetonius", pageCount: 416, genre: "Non-Fiction", publicationDate: "121-01-01", description: "Suetonius's biographies of Rome's first twelve emperors, from Julius Caesar through Domitian.", series: null, tier: "S", topRank: null },

  { title: "Anabasis", author: "Xenophon", pageCount: 240, genre: "Non-Fiction", publicationDate: "-370-01-01", description: "Xenophon's account of ten thousand Greek mercenaries marching home from Persia — the canonical ancient adventure narrative.", series: null, tier: "S", topRank: null },
  { title: "Memorabilia", author: "Xenophon", pageCount: 208, genre: "Non-Fiction", publicationDate: "-371-01-01", description: "Xenophon's recollections of Socrates — a less philosophical but more worldly counterpart to Plato.", series: null, tier: "A", topRank: null },

  { title: "Selected Dialogues", author: "Lucian of Samosata", pageCount: 272, genre: "Fiction", publicationDate: "170-01-01", description: "Lucian's satirical dialogues — including A True Story, which invents the fantastical voyage narrative.", series: null, tier: "A", topRank: null },

  { title: "Daphnis and Chloe", author: "Longus", pageCount: 160, genre: "Fiction", publicationDate: "180-01-01", description: "A shepherd boy and a goatherd girl on Lesbos grow up discovering love — the canonical ancient Greek pastoral romance.", series: null, tier: "A", topRank: null },

  // Spanish Golden Age
  { title: "The Swindler", author: "Francisco de Quevedo", pageCount: 272, genre: "Fiction", publicationDate: "1626-01-01", description: "Quevedo's picaresque novel of a young Spanish trickster who rises through and falls out of every station in seventeenth-century Spain.", series: null, tier: "S", topRank: null },

  { title: "Guzmán de Alfarache", author: "Mateo Alemán", pageCount: 528, genre: "Fiction", publicationDate: "1599-01-01", description: "The canonical picaresque novel of the Spanish Golden Age — a rogue's life told from prison as a confession.", series: null, tier: "A", topRank: null },

  { title: "The Art of Worldly Wisdom", author: "Baltasar Gracián", pageCount: 176, genre: "Non-Fiction", publicationDate: "1647-01-01", description: "Three hundred aphorisms on navigating courtly society from the seventeenth-century Spanish Jesuit philosopher.", series: null, tier: "A", topRank: null },

  // Russian 20th century
  { title: "The Faculty of Useless Knowledge", author: "Yuri Dombrovsky", pageCount: 640, genre: "Historical Fiction", publicationDate: "1978-01-01", description: "A Kazakhstan museum curator in 1937 is pulled into Stalin's Great Terror — Dombrovsky's canonical late-Soviet novel.", series: null, tier: "S", topRank: null },
  { title: "The Keeper of Antiquities", author: "Yuri Dombrovsky", pageCount: 240, genre: "Fiction", publicationDate: "1964-01-01", description: "The earlier novel that introduces Zybin, the archaeologist-scholar of Alma-Ata.", series: null, tier: "A", topRank: null },

  { title: "The Island of Crimea", author: "Vasily Aksyonov", pageCount: 368, genre: "Fiction", publicationDate: "1979-01-01", description: "An alternate-history Crimea that remained a White Russian republic after 1917 — Aksyonov's cult late-Soviet novel.", series: null, tier: "A", topRank: null },
  { title: "Generations of Winter", author: "Vasily Aksyonov", pageCount: 592, genre: "Historical Fiction", publicationDate: "1994-01-01", description: "Aksyonov's multi-generational saga of the Gradov family across Stalin's Russia.", series: null, tier: "A", topRank: null },

  { title: "Children of the Arbat", author: "Anatoly Rybakov", pageCount: 688, genre: "Historical Fiction", publicationDate: "1987-01-01", description: "Young Muscovites on the Arbat live through the first years of Stalin's purges — one of the major perestroika-era novels.", series: null, tier: "S", topRank: null },
  { title: "Heavy Sand", author: "Anatoly Rybakov", pageCount: 416, genre: "Historical Fiction", publicationDate: "1978-01-01", description: "A Jewish family in Ukraine across the twentieth century, from the Revolution through the Holocaust.", series: null, tier: "A", topRank: null },

  { title: "The Trial Begins", author: "Abram Tertz", pageCount: 144, genre: "Fiction", publicationDate: "1960-01-01", description: "A satirical Soviet novel smuggled out and published abroad — the work that led to Sinyavsky's 1966 show trial.", series: null, tier: "A", topRank: null },
  { title: "On Socialist Realism", author: "Abram Tertz", pageCount: 96, genre: "Non-Fiction", publicationDate: "1960-01-01", description: "Sinyavsky's smuggled-out polemic against the Soviet literary doctrine, published abroad under his pseudonym.", series: null, tier: "A", topRank: null },

  { title: "Farewell to Matyora", author: "Valentin Rasputin", pageCount: 240, genre: "Fiction", publicationDate: "1976-01-01", description: "An ancient Siberian village is about to be flooded by a hydroelectric project, and its elderly residents say goodbye.", series: null, tier: "S", topRank: null },
  { title: "Live and Remember", author: "Valentin Rasputin", pageCount: 272, genre: "Historical Fiction", publicationDate: "1974-01-01", description: "A Soviet soldier deserts in the final months of WWII and hides near his Siberian village, while his wife alone knows.", series: null, tier: "A", topRank: null },

  { title: "The Suitcase", author: "Sergei Dovlatov", pageCount: 144, genre: "Fiction", publicationDate: "1986-01-01", description: "A Russian émigré in New York unpacks the single suitcase he brought from the USSR — each object unlocks a comic Leningrad memory.", series: null, tier: "S", topRank: null },
  { title: "Pushkin Hills", author: "Sergei Dovlatov", pageCount: 144, genre: "Fiction", publicationDate: "1983-01-01", description: "A failed Soviet writer takes a summer job as a tour guide at the Pushkin estate museum.", series: null, tier: "S", topRank: null },
  { title: "The Zone", author: "Sergei Dovlatov", pageCount: 224, genre: "Fiction", publicationDate: "1982-01-01", description: "Dovlatov's linked stories of his time as a camp guard in a Soviet prison colony.", series: null, tier: "A", topRank: null },

  // Iranian / Afghan diaspora literary
  { title: "Earth and Ashes", author: "Atiq Rahimi", pageCount: 96, genre: "Fiction", publicationDate: "1999-01-01", description: "An elderly Afghan man and his grandson travel to tell the boy's father his village has been destroyed by a Soviet bombing.", series: null, tier: "A", topRank: null },
  { title: "The Patience Stone", author: "Atiq Rahimi", pageCount: 176, genre: "Fiction", publicationDate: "2008-01-01", description: "An Afghan woman watches over her comatose husband and slowly tells him every truth she has never spoken. Prix Goncourt winner.", series: null, tier: "S", topRank: null },

  { title: "In Praise of Hatred", author: "Khaled Khalifa", pageCount: 336, genre: "Historical Fiction", publicationDate: "2006-01-01", description: "A young woman from a prominent Aleppo family is drawn into the 1980s Syrian Muslim Brotherhood uprising against the Assad regime.", series: null, tier: "A", topRank: null },
  { title: "No Knives in the Kitchens of This City", author: "Khaled Khalifa", pageCount: 256, genre: "Fiction", publicationDate: "2013-01-01", description: "An Aleppo family unravels across decades of Syrian dictatorship.", series: null, tier: "A", topRank: null },

  { title: "The Last Illusion", author: "Porochista Khakpour", pageCount: 336, genre: "Fiction", publicationDate: "2014-05-13", description: "A feral Iranian boy raised in a cage by his birdwatching mother is rescued and transplanted to New York.", series: null, tier: "A", topRank: null },
  { title: "Sick", author: "Porochista Khakpour", pageCount: 272, genre: "Non-Fiction", publicationDate: "2018-06-05", description: "Khakpour's memoir of her long battle with late-stage Lyme disease and the American medical system.", series: null, tier: "A", topRank: null },

  { title: "The Stationery Shop", author: "Marjan Kamali", pageCount: 320, genre: "Historical Fiction", publicationDate: "2019-06-18", description: "Two Iranian teenagers fall in love in a Tehran stationery shop in 1953 and are separated by the CIA-backed coup.", series: null, tier: "A", topRank: null },
  { title: "Together Tea", author: "Marjan Kamali", pageCount: 320, genre: "Fiction", publicationDate: "2013-05-07", description: "A young Iranian American woman is pressured by her mother into arranged-marriage meetings in New York and then Tehran.", series: null, tier: "A", topRank: null },

  { title: "The Blood of Flowers", author: "Anita Amirrezvani", pageCount: 400, genre: "Historical Fiction", publicationDate: "2007-06-05", description: "A young Persian girl in seventeenth-century Isfahan apprentices to her uncle as a carpet designer.", series: null, tier: "A", topRank: null },
  { title: "Equal of the Sun", author: "Anita Amirrezvani", pageCount: 448, genre: "Historical Fiction", publicationDate: "2012-06-05", description: "A sixteenth-century Safavid princess and her eunuch vizier maneuver to keep her family in power.", series: null, tier: "A", topRank: null },

  // Classical fills
  { title: "The Histories", author: "Tacitus", pageCount: 384, genre: "Non-Fiction", publicationDate: "110-01-01", description: "Tacitus's surviving history of the Year of the Four Emperors and the first years of the Flavian dynasty.", series: null, tier: "S", topRank: null },
  { title: "Germania", author: "Tacitus", pageCount: 112, genre: "Non-Fiction", publicationDate: "98-01-01", description: "Tacitus's ethnographic essay on the Germanic tribes outside the Roman Empire.", series: null, tier: "A", topRank: null },

  { title: "Greek Lives", author: "Plutarch", pageCount: 464, genre: "Non-Fiction", publicationDate: "100-01-01", description: "Nine of Plutarch's biographies of great Greeks — Lycurgus, Solon, Themistocles, Pericles, Alcibiades, Alexander, and others.", series: null, tier: "S", topRank: null },

  // Ulitskaya fill
  { title: "Sonechka", author: "Lyudmila Ulitskaya", pageCount: 160, genre: "Fiction", publicationDate: "1992-01-01", description: "A bookish Moscow librarian's quiet life across the Soviet decades — Ulitskaya's breakthrough novella.", series: null, tier: "A", topRank: null },
  { title: "Medea and Her Children", author: "Lyudmila Ulitskaya", pageCount: 336, genre: "Fiction", publicationDate: "1996-01-01", description: "A childless Greek matriarch in Crimea presides over her extended family's summer gatherings across decades of Soviet history.", series: null, tier: "A", topRank: null },
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
