const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [];

const REC_LIBRARY_ADDITIONS = [
  // Amber V. Nicole
  { title: "The Book of Azrael", author: "Amber V. Nicole", pageCount: 528, genre: "Fantasy", publicationDate: "2022-11-01", description: "A half-goddess assassin is hunted by the god who once loved her — the first Gods and Monsters novel.", series: { name: "Gods and Monsters", order: 1, total: 4 }, tier: "A", topRank: null },
  { title: "The Throne of Broken Gods", author: "Amber V. Nicole", pageCount: 528, genre: "Fantasy", publicationDate: "2023-11-28", description: "Dianna's alliance with the god Kane unravels as old gods return.", series: { name: "Gods and Monsters", order: 2, total: 4 }, tier: "A", topRank: null },
  { title: "The Gods We Fear", author: "Amber V. Nicole", pageCount: 608, genre: "Fantasy", publicationDate: "2024-12-03", description: "The Gods and Monsters trilogy deepens as Dianna's own divinity surfaces.", series: { name: "Gods and Monsters", order: 3, total: 4 }, tier: "A", topRank: null },

  // Jenny Hickman
  { title: "A Cursed Kiss", author: "Jenny Hickman", pageCount: 368, genre: "Fantasy", publicationDate: "2021-03-01", description: "An American exchange student in Ireland is pulled into the fae realm and its dangerous prince — Myths of Airren.", series: { name: "Myths of Airren", order: 1, total: 4 }, tier: "A", topRank: null },
  { title: "A Cursed Heart", author: "Jenny Hickman", pageCount: 432, genre: "Fantasy", publicationDate: "2022-01-22", description: "Keelynn's prince is trapped by an ancient geas and only Tadhg can save him.", series: { name: "Myths of Airren", order: 2, total: 4 }, tier: "A", topRank: null },
  { title: "A Cursed Fate", author: "Jenny Hickman", pageCount: 480, genre: "Fantasy", publicationDate: "2022-11-01", description: "The Myths of Airren series closes as Keelynn faces the Queen of Faerie.", series: { name: "Myths of Airren", order: 3, total: 4 }, tier: "A", topRank: null },

  // K.F. Breene
  { title: "Darkness Unleashed", author: "K.F. Breene", pageCount: 352, genre: "Fantasy", publicationDate: "2015-04-01", description: "A woman with dormant magic is pulled into the supernatural underworld — Breene's Darkness series opener.", series: { name: "Darkness", order: 1, total: 10 }, tier: "A", topRank: null },
  { title: "Magical Midlife Madness", author: "K.F. Breene", pageCount: 320, genre: "Fantasy", publicationDate: "2019-05-29", description: "A recently divorced forty-year-old inherits a magical Victorian mansion and discovers her own latent power.", series: { name: "Leveling Up", order: 1, total: 10 }, tier: "A", topRank: null },
  { title: "Fire's Song", author: "K.F. Breene", pageCount: 288, genre: "Fantasy", publicationDate: "2016-03-01", description: "A young woman accompanied by a dual-magic guardian flees a pursuing kingdom in the Warrior Chronicles.", series: { name: "The Warrior Chronicles", order: 1, total: 6 }, tier: "A", topRank: null },

  // Hannah F. Whitten
  { title: "For the Wolf", author: "Hannah F. Whitten", pageCount: 448, genre: "Fantasy", publicationDate: "2021-06-15", description: "A princess is sacrificed to the Wilderwood and the Wolf who guards it — a dark fairy tale romantasy.", series: { name: "The Wilderwood", order: 1, total: 2 }, tier: "A", topRank: null },
  { title: "For the Throne", author: "Hannah F. Whitten", pageCount: 448, genre: "Fantasy", publicationDate: "2022-06-07", description: "Neve is trapped in a shadow realm and must fight her way back to her sister.", series: { name: "The Wilderwood", order: 2, total: 2 }, tier: "A", topRank: null },
  { title: "The Foxglove King", author: "Hannah F. Whitten", pageCount: 448, genre: "Fantasy", publicationDate: "2023-03-07", description: "A necromancer hiding in plain sight in a sun-worshipping kingdom is conscripted by the king's son.", series: { name: "The Nightshade Crown", order: 1, total: 3 }, tier: "A", topRank: null },

  // Jennifer Donnelly
  { title: "Stepsister", author: "Jennifer Donnelly", pageCount: 352, genre: "Fantasy", publicationDate: "2019-05-14", description: "A Cinderella retelling from the perspective of the stepsister who cut off her own toes.", series: null, tier: "A", topRank: null },
  { title: "Poisoned", author: "Jennifer Donnelly", pageCount: 368, genre: "Fantasy", publicationDate: "2020-10-20", description: "A Snow White retelling where the huntsman actually cuts out her heart — and she survives.", series: null, tier: "A", topRank: null },

  // Jessica Thorne
  { title: "The Queen's Wing", author: "Jessica Thorne", pageCount: 400, genre: "Fantasy", publicationDate: "2019-05-16", description: "An heir to a dying kingdom must marry the enemy emperor's heir to save her throne.", series: { name: "The Queen of the Aurora", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "The Queen of Wishes", author: "Jessica Thorne", pageCount: 400, genre: "Fantasy", publicationDate: "2020-04-16", description: "Belengaria's wedding is only the start of her troubles as forgotten magic awakens.", series: { name: "The Queen of the Aurora", order: 2, total: 3 }, tier: "A", topRank: null },

  // Emma Theriault
  { title: "Rebel Rose", author: "Emma Theriault", pageCount: 400, genre: "Fantasy", publicationDate: "2020-11-10", description: "Belle, now queen after her marriage to the former Beast, navigates the beginnings of the French Revolution.", series: { name: "Queen's Council", order: 1, total: 3 }, tier: "A", topRank: null },

  // Joan He
  { title: "Strike the Zither", author: "Joan He", pageCount: 368, genre: "Fantasy", publicationDate: "2022-10-04", description: "A young Chinese-inspired strategist manipulates three warring kingdoms in a Romance of the Three Kingdoms retelling.", series: { name: "Kingdom of Three", order: 1, total: 2 }, tier: "A", topRank: null },
  { title: "The Ones We're Meant to Find", author: "Joan He", pageCount: 384, genre: "Sci-Fi", publicationDate: "2021-05-04", description: "Two sisters separated across a post-climate-apocalypse world try to find each other.", series: null, tier: "A", topRank: null },

  // Jennifer Ashley — Shifters Unbound
  { title: "Pride Mates", author: "Jennifer Ashley", pageCount: 320, genre: "Fantasy", publicationDate: "2010-04-06", description: "A human lawyer takes a case for a Las Vegas lion-shifter community — the first Shifters Unbound novel.", series: { name: "Shifters Unbound", order: 1, total: 19 }, tier: "A", topRank: null },
  { title: "Primal Bonds", author: "Jennifer Ashley", pageCount: 320, genre: "Fantasy", publicationDate: "2010-10-05", description: "A Scottish feline shifter escapes the UK shifter collar program and hides in Las Vegas.", series: { name: "Shifters Unbound", order: 2, total: 19 }, tier: "A", topRank: null },

  // Michelle Madow — Elementals
  { title: "The Prophecy of Shadows", author: "Michelle Madow", pageCount: 288, genre: "Fantasy", publicationDate: "2016-05-17", description: "A teenage girl discovers she's descended from Greek gods and enrolls in a training academy for the gifted.", series: { name: "Elementals", order: 1, total: 5 }, tier: "A", topRank: null },
  { title: "The Blood of the Hydra", author: "Michelle Madow", pageCount: 320, genre: "Fantasy", publicationDate: "2016-12-06", description: "Nicole and her friends must face the Hydra to recover a piece of the Golden Fleece.", series: { name: "Elementals", order: 2, total: 5 }, tier: "A", topRank: null },

  // Kristen Painter — House of Comarré
  { title: "Blood Rights", author: "Kristen Painter", pageCount: 448, genre: "Fantasy", publicationDate: "2011-10-01", description: "A vampire noble and a born-to-be-blood-servant woman team up to investigate a vanished ruler — House of Comarré.", series: { name: "House of Comarré", order: 1, total: 5 }, tier: "A", topRank: null },
  { title: "Flesh and Blood", author: "Kristen Painter", pageCount: 432, genre: "Fantasy", publicationDate: "2011-11-01", description: "The House of Comarré series continues as Chrysabelle and Mal hunt the vampire who murdered her patron.", series: { name: "House of Comarré", order: 2, total: 5 }, tier: "A", topRank: null },
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
