const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "A Fate Inked in Blood", author: "Danielle L. Jensen", pageCount: 448, genre: "Fantasy", publicationDate: "2024-01-23", description: "A Norse-inspired saltfisher's daughter is bound by prophecy to a ruthless jarl hunting his father's murderers.", series: { name: "Saga of the Unfated", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "The Bridge Kingdom", author: "Danielle L. Jensen", pageCount: 432, genre: "Fantasy", publicationDate: "2018-08-28", description: "A warrior princess is sent to marry the king of the Bridge Kingdom, intending to destroy him from inside.", series: { name: "The Bridge Kingdom", order: 1, total: 5 }, tier: "A", topRank: null },

  { title: "The Dead Romantics", author: "Ashley Poston", pageCount: 368, genre: "Romance", publicationDate: "2022-06-28", description: "A ghostwriter of paranormal romance is visited by the ghost of her recently deceased editor.", series: null, tier: "A", topRank: null },
  { title: "The Seven Year Slip", author: "Ashley Poston", pageCount: 320, genre: "Romance", publicationDate: "2023-07-11", description: "A grieving book publicist inherits her aunt's New York apartment where time slips seven years back.", series: null, tier: "A", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  // Raven Kennedy — Plated Prisoner
  { title: "Gild", author: "Raven Kennedy", pageCount: 272, genre: "Fantasy", publicationDate: "2020-06-30", description: "A Midas-cursed king's favorite saddle plays her part inside a golden cage until a new kingdom's arrival changes everything.", series: { name: "The Plated Prisoner", order: 1, total: 6 }, tier: "A", topRank: null },
  { title: "Glint", author: "Raven Kennedy", pageCount: 392, genre: "Fantasy", publicationDate: "2021-01-21", description: "The Plated Prisoner series continues as Auren awakens to her own power.", series: { name: "The Plated Prisoner", order: 2, total: 6 }, tier: "A", topRank: null },
  { title: "Gleam", author: "Raven Kennedy", pageCount: 480, genre: "Fantasy", publicationDate: "2021-06-03", description: "Auren confronts the consequences of her emerging power and the men who would use her.", series: { name: "The Plated Prisoner", order: 3, total: 6 }, tier: "A", topRank: null },

  // Penn Cole
  { title: "Spark of the Everflame", author: "Penn Cole", pageCount: 480, genre: "Fantasy", publicationDate: "2023-02-23", description: "A young mortal woman with stolen magic is thrown into the rebellion against immortal rulers of the Gifted Kingdoms.", series: { name: "Kindred's Curse", order: 1, total: 4 }, tier: "A", topRank: null },
  { title: "Kindling the Moon", author: "Penn Cole", pageCount: 480, genre: "Fantasy", publicationDate: "2023-07-31", description: "The Kindred's Curse series continues as Diem is pulled deeper into the conflict.", series: { name: "Kindred's Curse", order: 2, total: 4 }, tier: "A", topRank: null },

  // Kristen Ciccarelli
  { title: "Heartless Hunter", author: "Kristen Ciccarelli", pageCount: 432, genre: "Fantasy", publicationDate: "2024-02-27", description: "A witch and a witch hunter fall into a forced alliance in a land where magic has been outlawed.", series: { name: "The Crimson Moth", order: 1, total: 2 }, tier: "A", topRank: null },
  { title: "The Last Namsara", author: "Kristen Ciccarelli", pageCount: 432, genre: "Fantasy", publicationDate: "2017-10-03", description: "A princess turned dragon slayer discovers the truth about the dragons she has been killing.", series: { name: "Iskari", order: 1, total: 3 }, tier: "A", topRank: null },

  // Amanda Bouchet — Kingmaker Chronicles
  { title: "A Promise of Fire", author: "Amanda Bouchet", pageCount: 432, genre: "Fantasy", publicationDate: "2016-08-02", description: "A fire-blooded Greek oracle is kidnapped by a warlord who needs her talent for his war.", series: { name: "Kingmaker Chronicles", order: 1, total: 4 }, tier: "A", topRank: null },
  { title: "Breath of Fire", author: "Amanda Bouchet", pageCount: 416, genre: "Fantasy", publicationDate: "2017-01-03", description: "Cat and Griffin prepare for war against her homeland in the Kingmaker Chronicles sequel.", series: { name: "Kingmaker Chronicles", order: 2, total: 4 }, tier: "A", topRank: null },

  // Tracy Wolff — Crave
  { title: "Crave", author: "Tracy Wolff", pageCount: 608, genre: "Fantasy", publicationDate: "2020-04-07", description: "A grieving teenage girl arrives at a boarding school in Alaska populated by paranormal students.", series: { name: "Crave", order: 1, total: 7 }, tier: "A", topRank: null },
  { title: "Crush", author: "Tracy Wolff", pageCount: 768, genre: "Fantasy", publicationDate: "2020-09-29", description: "The Crave series continues as Grace navigates her feelings for two very different supernatural boys.", series: { name: "Crave", order: 2, total: 7 }, tier: "A", topRank: null },
  { title: "Covet", author: "Tracy Wolff", pageCount: 784, genre: "Fantasy", publicationDate: "2021-03-02", description: "Grace comes into her own power while factions vie for control of the supernatural world.", series: { name: "Crave", order: 3, total: 7 }, tier: "A", topRank: null },

  // Sarah A. Parker
  { title: "When the Moon Hatched", author: "Sarah A. Parker", pageCount: 720, genre: "Fantasy", publicationDate: "2023-07-28", description: "A bounty hunter who dreams of being a dragon is pulled into the heart of an ancient war.", series: { name: "The Moonfall", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "To Bleed a Crystal Bloom", author: "Sarah A. Parker", pageCount: 528, genre: "Fantasy", publicationDate: "2021-11-01", description: "An orphaned girl raised in a remote tower is given to a cruel king as a prize.", series: { name: "The Crystal Bloom", order: 1, total: 3 }, tier: "A", topRank: null },

  // Natalie Mae
  { title: "The Kinder Poison", author: "Natalie Mae", pageCount: 400, genre: "Fantasy", publicationDate: "2020-06-16", description: "A girl from a desert kingdom is chosen as a ceremonial sacrifice for the king's children in a race for the throne.", series: { name: "The Kinder Poison", order: 1, total: 3 }, tier: "A", topRank: null },

  // Intisar Khanani
  { title: "Thorn", author: "Intisar Khanani", pageCount: 512, genre: "Fantasy", publicationDate: "2020-03-24", description: "A shy princess switches bodies with her maid on the way to meet her foreign husband — a Goose Girl retelling.", series: { name: "Dauntless Path", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "The Theft of Sunlight", author: "Intisar Khanani", pageCount: 512, genre: "Fantasy", publicationDate: "2021-03-23", description: "A commoner turned lady-in-waiting investigates the kingdom's missing children.", series: { name: "Dauntless Path", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "A Darkness at the Door", author: "Intisar Khanani", pageCount: 512, genre: "Fantasy", publicationDate: "2022-07-26", description: "The Dauntless Path trilogy concludes as Rae is captured by slavers.", series: { name: "Dauntless Path", order: 3, total: 3 }, tier: "A", topRank: null },

  // Karen Lynch
  { title: "Born in Fire", author: "Karen Lynch", pageCount: 352, genre: "Fantasy", publicationDate: "2018-07-31", description: "A young bounty hunter raised outside the Mohiri warrior clan is drawn into their war with demons.", series: { name: "Fae Warrior", order: 1, total: 7 }, tier: "A", topRank: null },
  { title: "Gilded Cage", author: "Karen Lynch", pageCount: 384, genre: "Fantasy", publicationDate: "2020-03-31", description: "A faerie princess escaped into the human world is captured by the most dangerous wolf shifter in Los Angeles.", series: { name: "Relentless", order: 1, total: 7 }, tier: "A", topRank: null },

  // Stacia Stark
  { title: "A Kingdom of Lies", author: "Stacia Stark", pageCount: 432, genre: "Fantasy", publicationDate: "2020-05-25", description: "A former thief is drawn into the intrigues of a powerful kingdom whose prince she cannot trust.", series: { name: "Kingdom of Lies", order: 1, total: 4 }, tier: "A", topRank: null },
  { title: "A Queen of Shadow and Lies", author: "Stacia Stark", pageCount: 480, genre: "Fantasy", publicationDate: "2020-11-30", description: "The Kingdom of Lies series continues as Prisca embraces her growing power.", series: { name: "Kingdom of Lies", order: 2, total: 4 }, tier: "A", topRank: null },

  // C.N. Crawford
  { title: "The Demon Queen Trials", author: "C.N. Crawford", pageCount: 304, genre: "Fantasy", publicationDate: "2021-06-07", description: "A demon-born woman is thrust into a supernatural contest for the demon throne.", series: { name: "The Demon Queen Trials", order: 1, total: 5 }, tier: "A", topRank: null },
  { title: "Frost and Nectar", author: "C.N. Crawford", pageCount: 384, genre: "Fantasy", publicationDate: "2022-01-24", description: "A woman who discovers she's part fae returns to the mysterious aunt who raised her.", series: { name: "Frost and Nectar", order: 1, total: 6 }, tier: "A", topRank: null },
  { title: "The Witch Is Back", author: "C.N. Crawford", pageCount: 304, genre: "Fantasy", publicationDate: "2023-03-07", description: "A mortal witch returns to her ancestral seaside town where the fae king rules and nothing is as it seems.", series: { name: "Sea Witch", order: 1, total: 4 }, tier: "A", topRank: null },

  // Sarah Beth Durst
  { title: "The Queen of Blood", author: "Sarah Beth Durst", pageCount: 368, genre: "Fantasy", publicationDate: "2016-09-20", description: "A young woman with the power to command deadly spirits trains to become one of her nation's queens.", series: { name: "The Queens of Renthia", order: 1, total: 4 }, tier: "A", topRank: null },
  { title: "The Bone Maker", author: "Sarah Beth Durst", pageCount: 464, genre: "Fantasy", publicationDate: "2021-03-09", description: "The aging members of a legendary hero party reunite to stop a resurrected villain.", series: null, tier: "A", topRank: null },
  { title: "The Spellshop", author: "Sarah Beth Durst", pageCount: 384, genre: "Fantasy", publicationDate: "2024-07-09", description: "A librarian rescues stolen spellbooks and opens a cozy shop in her remote island hometown.", series: null, tier: "A", topRank: null },

  // Marie Rutkoski — Winner's Curse
  { title: "The Winner's Curse", author: "Marie Rutkoski", pageCount: 368, genre: "Fantasy", publicationDate: "2014-03-04", description: "A general's daughter in a conquering Valorian empire buys a slave at auction she cannot let herself love.", series: { name: "The Winner's Trilogy", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "The Winner's Crime", author: "Marie Rutkoski", pageCount: 416, genre: "Fantasy", publicationDate: "2015-03-03", description: "Kestrel and Arin navigate opposite sides of a mounting rebellion in the Winner's Trilogy second book.", series: { name: "The Winner's Trilogy", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "The Winner's Kiss", author: "Marie Rutkoski", pageCount: 496, genre: "Fantasy", publicationDate: "2016-03-29", description: "The Winner's Trilogy concludes in war and drugged memory loss.", series: { name: "The Winner's Trilogy", order: 3, total: 3 }, tier: "A", topRank: null },

  // B.K. Borison
  { title: "Lovelight Farms", author: "B.K. Borison", pageCount: 304, genre: "Romance", publicationDate: "2021-10-05", description: "A Christmas tree farm owner convinces her best friend to pose as her fake boyfriend in a docuseries contest.", series: { name: "Lovelight", order: 1, total: 4 }, tier: "A", topRank: null },
  { title: "In the Weeds", author: "B.K. Borison", pageCount: 320, genre: "Romance", publicationDate: "2022-03-14", description: "A reclusive viral-video farmhand meets the Lovelight Farms social media manager who made him famous.", series: { name: "Lovelight", order: 2, total: 4 }, tier: "A", topRank: null },
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
