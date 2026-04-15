const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [];

const REC_LIBRARY_ADDITIONS = [
  // Jennifer Roberson — Tiger and Del
  { title: "Sword-Dancer", author: "Jennifer Roberson", pageCount: 320, genre: "Fantasy", publicationDate: "1986-01-01", description: "A desert sword-for-hire is hired by a mysterious Northern woman to find her younger brother — the first Tiger and Del novel.", series: { name: "Tiger and Del", order: 1, total: 7 }, tier: "A", topRank: null },
  { title: "Sword-Singer", author: "Jennifer Roberson", pageCount: 384, genre: "Fantasy", publicationDate: "1988-01-01", description: "Tiger and Del travel North to face Del's reckoning with her old sword-dancer guild.", series: { name: "Tiger and Del", order: 2, total: 7 }, tier: "A", topRank: null },
  { title: "Sword-Maker", author: "Jennifer Roberson", pageCount: 400, genre: "Fantasy", publicationDate: "1989-01-01", description: "Tiger is exiled and must face the mages of the North.", series: { name: "Tiger and Del", order: 3, total: 7 }, tier: "A", topRank: null },

  // Lynn Flewelling — Nightrunner
  { title: "Luck in the Shadows", author: "Lynn Flewelling", pageCount: 496, genre: "Fantasy", publicationDate: "1996-06-01", description: "A young thief is taken on as apprentice by a noble spy — the first Nightrunner novel.", series: { name: "Nightrunner", order: 1, total: 7 }, tier: "A", topRank: null },
  { title: "Stalking Darkness", author: "Lynn Flewelling", pageCount: 560, genre: "Fantasy", publicationDate: "1997-06-01", description: "Seregil and Alec hunt a necromantic cult threatening the Skalan throne.", series: { name: "Nightrunner", order: 2, total: 7 }, tier: "A", topRank: null },
  { title: "Traitor's Moon", author: "Lynn Flewelling", pageCount: 608, genre: "Fantasy", publicationDate: "1999-07-06", description: "Seregil returns to his Aurënfaie homeland as an official Skalan envoy.", series: { name: "Nightrunner", order: 3, total: 7 }, tier: "A", topRank: null },

  // Michelle West — Sun Sword
  { title: "The Broken Crown", author: "Michelle West", pageCount: 768, genre: "Fantasy", publicationDate: "1997-07-01", description: "A clan matriarch in the Dominion of Annagar faces clan war and assassination — the first Sun Sword novel.", series: { name: "The Sun Sword", order: 1, total: 6 }, tier: "A", topRank: null },
  { title: "The Uncrowned King", author: "Michelle West", pageCount: 768, genre: "Fantasy", publicationDate: "1998-12-01", description: "A Kings' Challenge in Averalaan will decide the heir — Sun Sword book two.", series: { name: "The Sun Sword", order: 2, total: 6 }, tier: "A", topRank: null },
  { title: "The Shining Court", author: "Michelle West", pageCount: 720, genre: "Fantasy", publicationDate: "1999-12-01", description: "The kialli rise in the south as the Dominion fractures.", series: { name: "The Sun Sword", order: 3, total: 6 }, tier: "A", topRank: null },

  // Sara Douglass — Axis Trilogy
  { title: "BattleAxe", author: "Sara Douglass", pageCount: 576, genre: "Fantasy", publicationDate: "1995-02-01", description: "An Axe-Wielder of the Seneschal is prophesied to fight an ancient enemy — the first Axis Trilogy novel.", series: { name: "The Axis Trilogy", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "Enchanter", author: "Sara Douglass", pageCount: 736, genre: "Fantasy", publicationDate: "1996-03-01", description: "Axis Rivkahson comes into his true power as civil war and the ice invasion escalate.", series: { name: "The Axis Trilogy", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "StarMan", author: "Sara Douglass", pageCount: 800, genre: "Fantasy", publicationDate: "1996-09-01", description: "The Axis Trilogy closes as the prophesied war reaches its climax.", series: { name: "The Axis Trilogy", order: 3, total: 3 }, tier: "A", topRank: null },

  // Karen Miller
  { title: "The Innocent Mage", author: "Karen Miller", pageCount: 656, genre: "Fantasy", publicationDate: "2005-07-01", description: "A young fisherman from a despised kingdom is prophesied to save the magic kingdom that rules over his people.", series: { name: "Kingmaker, Kingbreaker", order: 1, total: 2 }, tier: "A", topRank: null },
  { title: "The Awakened Mage", author: "Karen Miller", pageCount: 720, genre: "Fantasy", publicationDate: "2005-09-01", description: "Asher of Restharven comes into his own as Morg's plot unfolds.", series: { name: "Kingmaker, Kingbreaker", order: 2, total: 2 }, tier: "A", topRank: null },
  { title: "Empress", author: "Karen Miller", pageCount: 672, genre: "Fantasy", publicationDate: "2007-09-05", description: "A woman sold into slavery as a girl becomes the empress of a warrior god — the first Godspeaker novel.", series: { name: "Godspeaker", order: 1, total: 3 }, tier: "A", topRank: null },

  // James Blaylock
  { title: "The Last Coin", author: "James Blaylock", pageCount: 352, genre: "Fantasy", publicationDate: "1988-01-01", description: "A Seal Beach café owner is unknowingly in possession of one of the thirty silver coins paid to Judas Iscariot.", series: null, tier: "A", topRank: null },
  { title: "The Paper Grail", author: "James Blaylock", pageCount: 384, genre: "Fantasy", publicationDate: "1991-01-01", description: "A Northern California antiquarian inherits a Japanese paper artifact that turns out to be a sacred object.", series: null, tier: "A", topRank: null },
  { title: "Homunculus", author: "James Blaylock", pageCount: 256, genre: "Sci-Fi", publicationDate: "1986-01-01", description: "A steampunk Victorian London of secret societies, reanimation, and an air-filled homunculus.", series: null, tier: "A", topRank: null },

  // Jim C. Hines
  { title: "The Stepsister Scheme", author: "Jim C. Hines", pageCount: 352, genre: "Fantasy", publicationDate: "2009-01-06", description: "Cinderella's stepsisters kidnap her prince and the fairy-tale princesses Cinderella, Snow White, and Sleeping Beauty team up as secret agents.", series: { name: "Princess", order: 1, total: 4 }, tier: "A", topRank: null },
  { title: "Libriomancer", author: "Jim C. Hines", pageCount: 320, genre: "Fantasy", publicationDate: "2012-08-07", description: "A librarian who can pull objects out of books is drawn into a hidden magical war.", series: { name: "Magic Ex Libris", order: 1, total: 4 }, tier: "A", topRank: null },
  { title: "Goblin Quest", author: "Jim C. Hines", pageCount: 336, genre: "Fantasy", publicationDate: "2006-11-28", description: "A runty goblin named Jig gets dragged along on a classic dungeon-crawling adventurer quest — from the goblin's perspective.", series: { name: "Jig the Goblin", order: 1, total: 3 }, tier: "A", topRank: null },

  // Louise Cooper
  { title: "The Initiate", author: "Louise Cooper", pageCount: 320, genre: "Fantasy", publicationDate: "1985-01-01", description: "A young initiate of the Circle is caught between the Lords of Order and Chaos — the first Time Master novel.", series: { name: "Time Master", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "The Master", author: "Louise Cooper", pageCount: 320, genre: "Fantasy", publicationDate: "1987-01-01", description: "The Time Master trilogy continues as Tarod struggles against his own dark heritage.", series: { name: "Time Master", order: 3, total: 3 }, tier: "A", topRank: null },

  // Emma Bull
  { title: "War for the Oaks", author: "Emma Bull", pageCount: 336, genre: "Fantasy", publicationDate: "1987-07-01", description: "A Minneapolis rock musician is drafted into a war between the Seelie and Unseelie faerie courts — foundational urban fantasy.", series: null, tier: "S", topRank: null },
  { title: "Territory", author: "Emma Bull", pageCount: 320, genre: "Fantasy", publicationDate: "2007-07-10", description: "A magical reimagining of the Tombstone era — Wyatt Earp, Doc Holliday, and a hidden war of sorcery.", series: null, tier: "A", topRank: null },

  // Megan Lindholm (Robin Hobb)
  { title: "Wizard of the Pigeons", author: "Megan Lindholm", pageCount: 256, genre: "Fantasy", publicationDate: "1986-01-01", description: "A Vietnam veteran living on the streets of Seattle has the power to speak with pigeons — early Robin Hobb under her Lindholm pen name.", series: null, tier: "S", topRank: null },
  { title: "Cloven Hooves", author: "Megan Lindholm", pageCount: 352, genre: "Fantasy", publicationDate: "1991-01-01", description: "A Montana ranch wife trapped in her unhappy marriage encounters a satyr-like creature in the woods.", series: null, tier: "A", topRank: null },
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
