const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [];

const REC_LIBRARY_ADDITIONS = [
  // Melissa Marr
  { title: "Wicked Lovely", author: "Melissa Marr", pageCount: 336, genre: "Fantasy", publicationDate: "2007-06-12", description: "A Pittsburgh teenager who has always been able to see faeries becomes the mortal queen of the Summer Court.", series: { name: "Wicked Lovely", order: 1, total: 5 }, tier: "A", topRank: null },
  { title: "Ink Exchange", author: "Melissa Marr", pageCount: 336, genre: "Fantasy", publicationDate: "2008-04-22", description: "A traumatized girl gets a tattoo that bonds her to the Dark Court faerie king.", series: { name: "Wicked Lovely", order: 2, total: 5 }, tier: "A", topRank: null },
  { title: "Fragile Eternity", author: "Melissa Marr", pageCount: 400, genre: "Fantasy", publicationDate: "2009-04-21", description: "Aislinn and Seth face the consequences of Aislinn becoming queen and Seth choosing faerie immortality.", series: { name: "Wicked Lovely", order: 3, total: 5 }, tier: "A", topRank: null },

  // Morgan Rhodes — Falling Kingdoms
  { title: "Falling Kingdoms", author: "Morgan Rhodes", pageCount: 432, genre: "Fantasy", publicationDate: "2012-12-11", description: "Four teens across three kingdoms are pulled into a war that threatens their entire continent.", series: { name: "Falling Kingdoms", order: 1, total: 6 }, tier: "A", topRank: null },
  { title: "Rebel Spring", author: "Morgan Rhodes", pageCount: 416, genre: "Fantasy", publicationDate: "2013-12-03", description: "After the war, an arranged marriage and a rebellion threaten the new king's fragile power.", series: { name: "Falling Kingdoms", order: 2, total: 6 }, tier: "A", topRank: null },
  { title: "Gathering Darkness", author: "Morgan Rhodes", pageCount: 400, genre: "Fantasy", publicationDate: "2014-12-09", description: "The Falling Kingdoms series continues as the Kindred magic threatens to slip from everyone's control.", series: { name: "Falling Kingdoms", order: 3, total: 6 }, tier: "A", topRank: null },

  // Maria V. Snyder — Study series
  { title: "Poison Study", author: "Maria V. Snyder", pageCount: 416, genre: "Fantasy", publicationDate: "2005-10-01", description: "A condemned prisoner chooses to become the Commander's food taster in exchange for her life.", series: { name: "Study", order: 1, total: 6 }, tier: "A", topRank: null },
  { title: "Magic Study", author: "Maria V. Snyder", pageCount: 416, genre: "Fantasy", publicationDate: "2006-10-01", description: "Yelena travels south to meet her family and study her magic — the Study series continues.", series: { name: "Study", order: 2, total: 6 }, tier: "A", topRank: null },
  { title: "Fire Study", author: "Maria V. Snyder", pageCount: 448, genre: "Fantasy", publicationDate: "2008-03-04", description: "Yelena and Valek face a powerful new threat from a rebel magician.", series: { name: "Study", order: 3, total: 6 }, tier: "A", topRank: null },

  // Melissa de la Cruz
  { title: "Blue Bloods", author: "Melissa de la Cruz", pageCount: 320, genre: "Fantasy", publicationDate: "2006-04-18", description: "Elite Manhattan private-school teenagers discover they're descended from vampires.", series: { name: "Blue Bloods", order: 1, total: 7 }, tier: "A", topRank: null },
  { title: "Witches of East End", author: "Melissa de la Cruz", pageCount: 320, genre: "Fantasy", publicationDate: "2011-06-21", description: "Three immortal witch sisters in a small Long Island town must stop their magic from being discovered.", series: { name: "The Beauchamp Family", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "The Queen's Assassin", author: "Melissa de la Cruz", pageCount: 384, genre: "Fantasy", publicationDate: "2020-02-04", description: "An assassin and his unwilling apprentice navigate a magical kingdom at war.", series: { name: "Queen's Secret", order: 1, total: 2 }, tier: "A", topRank: null },

  // Rachel E. Carter — The Black Mage
  { title: "First Year", author: "Rachel E. Carter", pageCount: 322, genre: "Fantasy", publicationDate: "2015-02-10", description: "A commoner girl is accepted to a magic academy for nobles — the first Black Mage novel.", series: { name: "The Black Mage", order: 1, total: 4 }, tier: "A", topRank: null },
  { title: "Apprentice", author: "Rachel E. Carter", pageCount: 372, genre: "Fantasy", publicationDate: "2015-07-14", description: "Ryiah's second year at the academy brings new training and forbidden romance.", series: { name: "The Black Mage", order: 2, total: 4 }, tier: "A", topRank: null },

  // Elizabeth Lim
  { title: "Six Crimson Cranes", author: "Elizabeth Lim", pageCount: 464, genre: "Fantasy", publicationDate: "2021-07-06", description: "A princess must save her six brothers who have been transformed into cranes by their stepmother.", series: { name: "Six Crimson Cranes", order: 1, total: 2 }, tier: "A", topRank: null },
  { title: "The Dragon's Promise", author: "Elizabeth Lim", pageCount: 480, genre: "Fantasy", publicationDate: "2022-08-30", description: "Shiori must return a dragon pearl to its rightful owner — Six Crimson Cranes continues.", series: { name: "Six Crimson Cranes", order: 2, total: 2 }, tier: "A", topRank: null },
  { title: "Spin the Dawn", author: "Elizabeth Lim", pageCount: 416, genre: "Fantasy", publicationDate: "2019-07-09", description: "A tailor's daughter disguises herself as a boy to compete for the imperial tailor position.", series: { name: "The Blood of Stars", order: 1, total: 2 }, tier: "A", topRank: null },

  // Kathryn Purdie
  { title: "Burning Glass", author: "Kathryn Purdie", pageCount: 512, genre: "Fantasy", publicationDate: "2016-03-01", description: "A girl with the ability to feel others' emotions is drafted to serve the emperor's heir.", series: { name: "Burning Glass", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "Bone Crier's Moon", author: "Kathryn Purdie", pageCount: 464, genre: "Fantasy", publicationDate: "2020-03-03", description: "A young woman trained as a Bone Crier must kill her prophesied mate to become immortal.", series: { name: "Bone Grace", order: 1, total: 2 }, tier: "A", topRank: null },

  // Roseanne A. Brown
  { title: "A Song of Wraiths and Ruin", author: "Roseanne A. Brown", pageCount: 480, genre: "Fantasy", publicationDate: "2020-06-02", description: "A princess must sacrifice a boy to resurrect her sister — and the boy has the same target on her.", series: { name: "A Song of Wraiths and Ruin", order: 1, total: 2 }, tier: "A", topRank: null },
  { title: "A Psalm of Storms and Silence", author: "Roseanne A. Brown", pageCount: 528, genre: "Fantasy", publicationDate: "2021-11-02", description: "The series continues with Karina and Malik on opposite sides of a revolution.", series: { name: "A Song of Wraiths and Ruin", order: 2, total: 2 }, tier: "A", topRank: null },

  // Chloe Walsh — Boys of Tommen
  { title: "Binding 13", author: "Chloe Walsh", pageCount: 696, genre: "Romance", publicationDate: "2018-09-18", description: "An Irish teenage girl transfers to a new school and falls for its rugby captain — the first Boys of Tommen novel.", series: { name: "Boys of Tommen", order: 1, total: 5 }, tier: "A", topRank: null },
  { title: "Keeping 13", author: "Chloe Walsh", pageCount: 768, genre: "Romance", publicationDate: "2019-09-17", description: "Shannon and Johnny's relationship deepens as she confronts her abusive home life.", series: { name: "Boys of Tommen", order: 2, total: 5 }, tier: "A", topRank: null },
  { title: "Saving 6", author: "Chloe Walsh", pageCount: 800, genre: "Romance", publicationDate: "2022-01-18", description: "Joey and Aoife's addict-and-tough-girl romance is the third Boys of Tommen novel.", series: { name: "Boys of Tommen", order: 3, total: 5 }, tier: "A", topRank: null },

  // Robin LaFevers — His Fair Assassin
  { title: "Grave Mercy", author: "Robin LaFevers", pageCount: 560, genre: "Historical Fiction", publicationDate: "2012-04-03", description: "A fifteenth-century Breton girl escapes an arranged marriage by joining a convent that trains assassins.", series: { name: "His Fair Assassin", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "Dark Triumph", author: "Robin LaFevers", pageCount: 416, genre: "Historical Fiction", publicationDate: "2013-04-02", description: "Sybella, a second assassin-nun, is sent back to her abusive noble family on a secret mission.", series: { name: "His Fair Assassin", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "Mortal Heart", author: "Robin LaFevers", pageCount: 464, genre: "Historical Fiction", publicationDate: "2014-11-04", description: "Annith, the third assassin, defies the convent to join the Duchess of Brittany's cause.", series: { name: "His Fair Assassin", order: 3, total: 3 }, tier: "A", topRank: null },

  // Julie C. Dao
  { title: "Forest of a Thousand Lanterns", author: "Julie C. Dao", pageCount: 384, genre: "Fantasy", publicationDate: "2017-10-10", description: "An Evil Queen origin story set in an East Asian-inspired fantasy empire.", series: { name: "Rise of the Empress", order: 1, total: 2 }, tier: "A", topRank: null },
  { title: "Kingdom of the Blazing Phoenix", author: "Julie C. Dao", pageCount: 384, genre: "Fantasy", publicationDate: "2018-11-06", description: "Eighteen years later, the stepdaughter must defeat her Evil Queen.", series: { name: "Rise of the Empress", order: 2, total: 2 }, tier: "A", topRank: null },

  // Emily A. Duncan — Something Dark and Holy
  { title: "Wicked Saints", author: "Emily A. Duncan", pageCount: 400, genre: "Fantasy", publicationDate: "2019-04-02", description: "A Slavic-inspired fantasy of a cleric blood mage and a dark prince teaming up to stop a war.", series: { name: "Something Dark and Holy", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "Ruthless Gods", author: "Emily A. Duncan", pageCount: 544, genre: "Fantasy", publicationDate: "2020-04-07", description: "Nadya's gods have abandoned her and she must confront the dark magic she touched.", series: { name: "Something Dark and Holy", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "Blessed Monsters", author: "Emily A. Duncan", pageCount: 528, genre: "Fantasy", publicationDate: "2021-04-06", description: "The Something Dark and Holy trilogy closes with a clash of monsters and broken gods.", series: { name: "Something Dark and Holy", order: 3, total: 3 }, tier: "A", topRank: null },

  // Sarah Henning
  { title: "Sea Witch", author: "Sarah Henning", pageCount: 368, genre: "Fantasy", publicationDate: "2018-07-31", description: "The origin story of the Little Mermaid's sea witch — a Danish teenager grieving a drowned friend.", series: { name: "Sea Witch", order: 1, total: 2 }, tier: "A", topRank: null },
  { title: "Throne of Air", author: "Sarah Henning", pageCount: 352, genre: "Fantasy", publicationDate: "2024-08-06", description: "A sky-kingdom princess is forced into a tournament she cannot afford to lose.", series: null, tier: "A", topRank: null },

  // Lara Adrian — Midnight Breed
  { title: "Kiss of Midnight", author: "Lara Adrian", pageCount: 400, genre: "Fantasy", publicationDate: "2007-05-29", description: "A Boston photographer witnesses a vampire killing and is drawn into the Order of the Breed.", series: { name: "Midnight Breed", order: 1, total: 15 }, tier: "A", topRank: null },
  { title: "Kiss of Crimson", author: "Lara Adrian", pageCount: 400, genre: "Fantasy", publicationDate: "2007-06-26", description: "A Boston veterinary medic rescues a wounded vampire and is pulled into his world.", series: { name: "Midnight Breed", order: 2, total: 15 }, tier: "A", topRank: null },

  // Ruby Dixon fill — Ice Planet Barbarians
  { title: "Ice Planet Barbarians", author: "Ruby Dixon", pageCount: 264, genre: "Sci-Fi", publicationDate: "2015-09-10", description: "A group of abducted Earth women crash-land on a frozen alien planet inhabited by large horned warriors.", series: { name: "Ice Planet Barbarians", order: 1, total: 30 }, tier: "A", topRank: null },
  { title: "Barbarian Alien", author: "Ruby Dixon", pageCount: 264, genre: "Sci-Fi", publicationDate: "2015-09-22", description: "The Ice Planet Barbarians series continues as another of the Earth women finds her mate.", series: { name: "Ice Planet Barbarians", order: 2, total: 30 }, tier: "A", topRank: null },
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
