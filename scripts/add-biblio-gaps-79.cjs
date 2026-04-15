const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [];

const REC_LIBRARY_ADDITIONS = [
  // Greek mythology retelling wave
  { title: "Ariadne", author: "Jennifer Saint", pageCount: 416, genre: "Historical Fiction", publicationDate: "2021-05-04", description: "The Minoan princess who helped Theseus kill the Minotaur tells her own story — Saint's canonical Greek retelling.", series: null, tier: "S", topRank: null },
  { title: "Elektra", author: "Jennifer Saint", pageCount: 320, genre: "Historical Fiction", publicationDate: "2022-05-03", description: "Clytemnestra, Cassandra, and Elektra each narrate the curse of the House of Atreus.", series: null, tier: "A", topRank: null },
  { title: "Atalanta", author: "Jennifer Saint", pageCount: 352, genre: "Historical Fiction", publicationDate: "2023-05-09", description: "The only woman on Jason's Argonaut crew tells her own story of the hunt and the race.", series: null, tier: "A", topRank: null },

  { title: "Clytemnestra", author: "Costanza Casati", pageCount: 464, genre: "Historical Fiction", publicationDate: "2023-05-02", description: "A life of the Mycenaean queen who murdered her husband Agamemnon on his return from Troy.", series: null, tier: "S", topRank: null },
  { title: "Babylonia", author: "Costanza Casati", pageCount: 416, genre: "Historical Fiction", publicationDate: "2024-10-15", description: "Semiramis, the only woman to rule the Assyrian empire, rises from village girl to regent.", series: null, tier: "A", topRank: null },

  { title: "Mythos", author: "Stephen Fry", pageCount: 432, genre: "Non-Fiction", publicationDate: "2017-11-02", description: "Fry's witty retelling of the Greek creation myths and the first generations of gods.", series: { name: "Stephen Fry's Greek Myths", order: 1, total: 4 }, tier: "S", topRank: null },
  { title: "Heroes", author: "Stephen Fry", pageCount: 448, genre: "Non-Fiction", publicationDate: "2018-11-01", description: "Fry's second volume retells the great Greek hero myths — Perseus, Heracles, Jason, Theseus.", series: { name: "Stephen Fry's Greek Myths", order: 2, total: 4 }, tier: "A", topRank: null },
  { title: "Troy", author: "Stephen Fry", pageCount: 432, genre: "Non-Fiction", publicationDate: "2020-10-29", description: "Fry's telling of the Trojan War from its long roots to its aftermath.", series: { name: "Stephen Fry's Greek Myths", order: 3, total: 4 }, tier: "A", topRank: null },

  { title: "Psyche and Eros", author: "Luna McNamara", pageCount: 384, genre: "Historical Fiction", publicationDate: "2023-06-13", description: "The Greek myth of the princess and the god of love retold from Psyche's perspective.", series: null, tier: "A", topRank: null },

  { title: "Girl, Goddess, Queen", author: "Bea Fitzgerald", pageCount: 432, genre: "Fantasy", publicationDate: "2023-07-06", description: "A YA retelling of Persephone and Hades with a conniving goddess who willingly takes the underworld.", series: { name: "Girl, Goddess, Queen", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "The End Crowns All", author: "Bea Fitzgerald", pageCount: 400, genre: "Fantasy", publicationDate: "2024-07-04", description: "The Trojan War retold through Cassandra's forbidden prophecies.", series: null, tier: "A", topRank: null },

  { title: "Medusa's Sisters", author: "Lauren J.A. Bear", pageCount: 400, genre: "Historical Fiction", publicationDate: "2023-08-08", description: "The Gorgons Stheno and Euryale tell their sister Medusa's story.", series: null, tier: "A", topRank: null },

  { title: "Athena's Child", author: "Hannah Lynn", pageCount: 288, genre: "Historical Fiction", publicationDate: "2020-03-24", description: "Medusa's life from innocent temple maiden to cursed monster.", series: null, tier: "A", topRank: null },
  { title: "Daughters of Sparta", author: "Hannah Lynn", pageCount: 368, genre: "Historical Fiction", publicationDate: "2021-05-20", description: "Helen of Troy and her sister Clytemnestra tell their own intertwined story.", series: null, tier: "A", topRank: null },

  { title: "For the Most Beautiful", author: "Emily Hauser", pageCount: 384, genre: "Historical Fiction", publicationDate: "2016-02-11", description: "The Trojan War retold through Briseis and Chryseis — the first of Hauser's Golden Apple trilogy.", series: { name: "Golden Apple", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "For the Winner", author: "Emily Hauser", pageCount: 416, genre: "Historical Fiction", publicationDate: "2017-02-23", description: "Atalanta, the only female Argonaut, joins Jason's quest.", series: { name: "Golden Apple", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "For the Immortal", author: "Emily Hauser", pageCount: 416, genre: "Historical Fiction", publicationDate: "2018-02-22", description: "Hippolyta of the Amazons and Heracles collide as the Golden Apple trilogy closes.", series: { name: "Golden Apple", order: 3, total: 3 }, tier: "A", topRank: null },

  { title: "The Witch's Heart", author: "Genevieve Gornichec", pageCount: 368, genre: "Fantasy", publicationDate: "2021-02-09", description: "Angrboda, the Norse giantess wife of Loki, tells her own story of losing her children to the gods.", series: null, tier: "S", topRank: null },
  { title: "The Weaver and the Witch Queen", author: "Genevieve Gornichec", pageCount: 384, genre: "Historical Fiction", publicationDate: "2023-07-25", description: "A Viking-era witch and the shieldmaiden who becomes queen of Norway are bound by an old oath.", series: null, tier: "A", topRank: null },

  // Indian mythology
  { title: "The Palace of Illusions", author: "Chitra Banerjee Divakaruni", pageCount: 384, genre: "Historical Fiction", publicationDate: "2008-01-01", description: "The Mahabharata retold from the perspective of Draupadi, wife to the Pandava brothers.", series: null, tier: "S", topRank: null },
  { title: "The Forest of Enchantments", author: "Chitra Banerjee Divakaruni", pageCount: 368, genre: "Historical Fiction", publicationDate: "2019-01-10", description: "The Ramayana retold from Sita's perspective.", series: null, tier: "A", topRank: null },
  { title: "The Last Queen", author: "Chitra Banerjee Divakaruni", pageCount: 368, genre: "Historical Fiction", publicationDate: "2021-01-18", description: "Rani Jindan, the last queen of the Sikh Empire and the child-mother of Maharaja Duleep Singh.", series: null, tier: "A", topRank: null },

  { title: "The Immortals of Meluha", author: "Amish Tripathi", pageCount: 416, genre: "Fantasy", publicationDate: "2010-02-22", description: "A Tibetan tribal chief arrives in the utopian kingdom of Meluha and is hailed as the destroyer prophesied to save it — the first Shiva Trilogy novel.", series: { name: "Shiva Trilogy", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "The Secret of the Nagas", author: "Amish Tripathi", pageCount: 432, genre: "Fantasy", publicationDate: "2011-08-15", description: "Shiva hunts the Nagas who attacked his wife and uncovers a deeper conspiracy.", series: { name: "Shiva Trilogy", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "The Oath of the Vayuputras", author: "Amish Tripathi", pageCount: 576, genre: "Fantasy", publicationDate: "2013-02-27", description: "The Shiva Trilogy closes as Shiva declares war on the evil he has identified.", series: { name: "Shiva Trilogy", order: 3, total: 3 }, tier: "A", topRank: null },

  { title: "Prince of Ayodhya", author: "Ashok Banker", pageCount: 448, genre: "Fantasy", publicationDate: "2003-01-01", description: "The first of Banker's eight-volume Ramayana retelling — the young Prince Rama faces his first rakshasa.", series: { name: "Ramayana", order: 1, total: 8 }, tier: "A", topRank: null },
  { title: "Siege of Mithila", author: "Ashok Banker", pageCount: 448, genre: "Fantasy", publicationDate: "2003-01-01", description: "Rama, Lakshmana, and Vishwamitra defend Mithila from a rakshasa army.", series: { name: "Ramayana", order: 2, total: 8 }, tier: "A", topRank: null },
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
