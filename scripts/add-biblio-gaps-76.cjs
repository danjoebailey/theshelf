const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "The Kingdom of Copper", author: "Shannon Chakraborty", pageCount: 640, genre: "Fantasy", publicationDate: "2019-01-22", description: "The Daevabad Trilogy continues as Nahri tries to survive in the djinn court that adopted her.", series: { name: "The Daevabad Trilogy", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "The Empire of Gold", author: "Shannon Chakraborty", pageCount: 768, genre: "Fantasy", publicationDate: "2020-06-30", description: "The Daevabad Trilogy concludes as Nahri and her allies race to reclaim the city.", series: { name: "The Daevabad Trilogy", order: 3, total: 3 }, tier: "A", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  // Grimdark
  { title: "Godblind", author: "Anna Stephens", pageCount: 400, genre: "Fantasy", publicationDate: "2017-06-01", description: "The Red Gods return as exiled warriors fight to keep the Rilporin throne from falling — Stephens's grim debut.", series: { name: "Godblind", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "Darksoul", author: "Anna Stephens", pageCount: 432, genre: "Fantasy", publicationDate: "2018-05-31", description: "Rilporin is besieged by the Mireces as the Godblind trilogy continues.", series: { name: "Godblind", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "Bloodchild", author: "Anna Stephens", pageCount: 496, genre: "Fantasy", publicationDate: "2019-06-27", description: "The Godblind trilogy closes in a battle of gods and mortals.", series: { name: "Godblind", order: 3, total: 3 }, tier: "A", topRank: null },

  { title: "The Grim Company", author: "Luke Scull", pageCount: 416, genre: "Fantasy", publicationDate: "2013-03-05", description: "A party of aging mercenaries, wizards, and assassins sets out to kill the immortal tyrants of a drowning world — Scull's grim debut.", series: { name: "The Grim Company", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "Sword of the North", author: "Luke Scull", pageCount: 400, genre: "Fantasy", publicationDate: "2015-03-17", description: "The Grim Company continues as Brodar Kayne hunts for his stolen wife across the north.", series: { name: "The Grim Company", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "Dead Man's Steel", author: "Luke Scull", pageCount: 496, genre: "Fantasy", publicationDate: "2017-04-04", description: "The Grim Company trilogy closes as the immortals fall.", series: { name: "The Grim Company", order: 3, total: 3 }, tier: "A", topRank: null },

  { title: "The Grey Bastards", author: "Jonathan French", pageCount: 432, genre: "Fantasy", publicationDate: "2015-08-14", description: "A half-orc cavalry company rides the southern wastes of their kingdom — a grimy, funny, raucous brotherhood novel. Self-Published Fantasy Blog-Off winner.", series: { name: "The Lot Lands", order: 1, total: 3 }, tier: "S", topRank: null },
  { title: "The True Bastards", author: "Jonathan French", pageCount: 576, genre: "Fantasy", publicationDate: "2019-03-12", description: "Fetching leads the Bastards as new threats rise in the Lot Lands.", series: { name: "The Lot Lands", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "Saga of the Hero-Brother", author: "Jonathan French", pageCount: 512, genre: "Fantasy", publicationDate: "2025-01-01", description: "The Lot Lands trilogy closes as old enemies return.", series: { name: "The Lot Lands", order: 3, total: 3 }, tier: "A", topRank: null },

  { title: "Low Town", author: "Daniel Polansky", pageCount: 352, genre: "Fantasy", publicationDate: "2011-08-16", description: "A disgraced war veteran and drug dealer in a fantasy city slum investigates the murder of a local child. Polansky's noir-fantasy debut.", series: { name: "Low Town", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "Tomorrow, the Killing", author: "Daniel Polansky", pageCount: 352, genre: "Fantasy", publicationDate: "2012-08-16", description: "The Warden investigates the death of a war hero's daughter in the slums.", series: { name: "Low Town", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "She Who Waits", author: "Daniel Polansky", pageCount: 416, genre: "Fantasy", publicationDate: "2013-09-10", description: "The Low Town trilogy closes with the Warden's past catching him.", series: { name: "Low Town", order: 3, total: 3 }, tier: "A", topRank: null },

  // Contemporary epic fantasy
  { title: "The Library at Mount Char", author: "Scott Hawkins", pageCount: 400, genre: "Fantasy", publicationDate: "2015-06-16", description: "Twelve adopted children trained in the many disciplines of a mysterious Father return to find him missing — Hawkins's cult debut.", series: null, tier: "S", topRank: null },

  { title: "The Wolf of Oren-Yaro", author: "K.S. Villoso", pageCount: 512, genre: "Fantasy", publicationDate: "2017-09-01", description: "A queen estranged from her husband tries to save her kingdom and her young son — Villoso's Filipino-inspired debut.", series: { name: "Chronicles of the Bitch Queen", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "The Ikessar Falcon", author: "K.S. Villoso", pageCount: 624, genre: "Fantasy", publicationDate: "2020-09-22", description: "Talyien travels beyond her empire to understand the forces threatening her throne.", series: { name: "Chronicles of the Bitch Queen", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "The Dragon of Jin-Sayeng", author: "K.S. Villoso", pageCount: 624, genre: "Fantasy", publicationDate: "2021-04-20", description: "The Chronicles of the Bitch Queen closes with Talyien confronting the agan.", series: { name: "Chronicles of the Bitch Queen", order: 3, total: 3 }, tier: "A", topRank: null },

  { title: "We Ride the Storm", author: "Devin Madson", pageCount: 528, genre: "Fantasy", publicationDate: "2018-06-04", description: "An Asian-inspired war of succession across a sprawling continent — Madson's self-published debut rebooted by Orbit.", series: { name: "The Reborn Empire", order: 1, total: 4 }, tier: "A", topRank: null },
  { title: "We Lie with Death", author: "Devin Madson", pageCount: 544, genre: "Fantasy", publicationDate: "2020-06-30", description: "The Reborn Empire continues as Miko, Rah, and Cassandra navigate widening war.", series: { name: "The Reborn Empire", order: 2, total: 4 }, tier: "A", topRank: null },
  { title: "We Cry for Blood", author: "Devin Madson", pageCount: 624, genre: "Fantasy", publicationDate: "2021-06-29", description: "The Reborn Empire approaches its climax as old empires shatter.", series: { name: "The Reborn Empire", order: 3, total: 4 }, tier: "A", topRank: null },

  { title: "The Stormcaller", author: "Tom Lloyd", pageCount: 512, genre: "Fantasy", publicationDate: "2006-03-30", description: "A white-eye with the favor of the sky god is prophesied to reshape the world — the first Twilight Reign novel.", series: { name: "Twilight Reign", order: 1, total: 5 }, tier: "A", topRank: null },
  { title: "The Twilight Herald", author: "Tom Lloyd", pageCount: 528, genre: "Fantasy", publicationDate: "2007-04-05", description: "Lord Isak gathers allies as the Menin invasion approaches.", series: { name: "Twilight Reign", order: 2, total: 5 }, tier: "A", topRank: null },
  { title: "The Grave Thief", author: "Tom Lloyd", pageCount: 624, genre: "Fantasy", publicationDate: "2008-04-03", description: "The Twilight Reign continues as Isak's prophecies begin to crystallize.", series: { name: "Twilight Reign", order: 3, total: 5 }, tier: "A", topRank: null },

  { title: "We Are the Dead", author: "Mike Shackle", pageCount: 512, genre: "Fantasy", publicationDate: "2019-07-09", description: "A conquered people's last warriors begin a hopeless resistance against their occupiers — Shackle's grim debut.", series: { name: "The Last War", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "The Last Shield", author: "Mike Shackle", pageCount: 496, genre: "Fantasy", publicationDate: "2020-07-16", description: "The resistance continues as survivors regroup in the mountains.", series: { name: "The Last War", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "A Fool's Hope", author: "Mike Shackle", pageCount: 560, genre: "Fantasy", publicationDate: "2022-04-28", description: "The Last War trilogy closes in a final confrontation.", series: { name: "The Last War", order: 3, total: 3 }, tier: "A", topRank: null },

  { title: "Retribution Falls", author: "Chris Wooding", pageCount: 560, genre: "Fantasy", publicationDate: "2009-07-02", description: "The crew of a shabby airship is framed for a crime they didn't commit and must clear their names — Tales of the Ketty Jay book one.", series: { name: "Tales of the Ketty Jay", order: 1, total: 4 }, tier: "A", topRank: null },
  { title: "The Black Lung Captain", author: "Chris Wooding", pageCount: 512, genre: "Fantasy", publicationDate: "2010-07-01", description: "Captain Frey and the Ketty Jay crew take a dangerous expedition into the wilderness.", series: { name: "Tales of the Ketty Jay", order: 2, total: 4 }, tier: "A", topRank: null },
  { title: "The Iron Jackal", author: "Chris Wooding", pageCount: 560, genre: "Fantasy", publicationDate: "2011-10-20", description: "Frey is cursed by an ancient relic and the Ketty Jay crew races to save him.", series: { name: "Tales of the Ketty Jay", order: 3, total: 4 }, tier: "A", topRank: null },

  { title: "The Wretched of Muirwood", author: "Jeff Wheeler", pageCount: 352, genre: "Fantasy", publicationDate: "2013-10-01", description: "A young wretched girl at an abbey school discovers her hidden royal birth — Wheeler's Legends of Muirwood.", series: { name: "Legends of Muirwood", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "The Blight of Muirwood", author: "Jeff Wheeler", pageCount: 416, genre: "Fantasy", publicationDate: "2013-10-01", description: "Lia sets out to recover the Medium and save the abbey.", series: { name: "Legends of Muirwood", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "The Scourge of Muirwood", author: "Jeff Wheeler", pageCount: 416, genre: "Fantasy", publicationDate: "2013-10-01", description: "Legends of Muirwood closes as Lia faces the Garden of Leerings.", series: { name: "Legends of Muirwood", order: 3, total: 3 }, tier: "A", topRank: null },

  { title: "Of Blood and Fire", author: "Ryan Cahill", pageCount: 624, genre: "Fantasy", publicationDate: "2021-01-30", description: "A young farm boy in an occupied continent discovers his bond to a newborn dragon — Cahill's self-published debut.", series: { name: "The Bound and the Broken", order: 1, total: 5 }, tier: "A", topRank: null },
  { title: "Of Darkness and Light", author: "Ryan Cahill", pageCount: 800, genre: "Fantasy", publicationDate: "2021-12-18", description: "Calen and his companions travel deep into the Lorian empire.", series: { name: "The Bound and the Broken", order: 2, total: 5 }, tier: "A", topRank: null },
  { title: "Of War and Ruin", author: "Ryan Cahill", pageCount: 1024, genre: "Fantasy", publicationDate: "2023-03-18", description: "The Bound and the Broken continues with massive battles and new alliances.", series: { name: "The Bound and the Broken", order: 3, total: 5 }, tier: "A", topRank: null },

  // Lighter / commercial
  { title: "The Spirit Thief", author: "Rachel Aaron", pageCount: 320, genre: "Fantasy", publicationDate: "2010-10-01", description: "Eli Monpress, a self-proclaimed greatest thief in the world, talks his way through every lock — Aaron's breezy heist fantasy.", series: { name: "The Legend of Eli Monpress", order: 1, total: 5 }, tier: "A", topRank: null },
  { title: "The Spirit Rebellion", author: "Rachel Aaron", pageCount: 336, genre: "Fantasy", publicationDate: "2010-11-01", description: "Eli Monpress continues his improbable thieveries with his wizard-sword and a bounty-hunter after him.", series: { name: "The Legend of Eli Monpress", order: 2, total: 5 }, tier: "A", topRank: null },
  { title: "The Spirit Eater", author: "Rachel Aaron", pageCount: 368, genre: "Fantasy", publicationDate: "2010-12-01", description: "Eli faces a demonseed and a mounting body count.", series: { name: "The Legend of Eli Monpress", order: 3, total: 5 }, tier: "A", topRank: null },

  { title: "The Thorn of Dentonhill", author: "Marshall Ryan Maresca", pageCount: 336, genre: "Fantasy", publicationDate: "2015-02-03", description: "A university magic student moonlights as a vigilante in the slums — the first Maradaine novel.", series: { name: "Maradaine", order: 1, total: 4 }, tier: "A", topRank: null },
  { title: "A Murder of Mages", author: "Marshall Ryan Maresca", pageCount: 320, genre: "Fantasy", publicationDate: "2015-07-07", description: "Two constables investigate ritual murders of mages in the same city as The Thorn of Dentonhill.", series: { name: "Maradaine Constabulary", order: 1, total: 4 }, tier: "A", topRank: null },

  { title: "The Emperor's Edge", author: "Lindsay Buroker", pageCount: 320, genre: "Fantasy", publicationDate: "2010-12-31", description: "A disgraced enforcer forms a team of outcasts to save the emperor in Buroker's self-published steampunk debut.", series: { name: "The Emperor's Edge", order: 1, total: 9 }, tier: "A", topRank: null },
  { title: "Dark Currents", author: "Lindsay Buroker", pageCount: 320, genre: "Fantasy", publicationDate: "2011-10-21", description: "Amaranthe and her crew investigate a plague affecting the aqueducts.", series: { name: "The Emperor's Edge", order: 2, total: 9 }, tier: "A", topRank: null },

  { title: "Free the Darkness", author: "Kel Kade", pageCount: 416, genre: "Fantasy", publicationDate: "2016-11-22", description: "A young swordsman who has trained himself in isolation sets out into the kingdom for the first time — Kade's King's Dark Tidings.", series: { name: "King's Dark Tidings", order: 1, total: 5 }, tier: "A", topRank: null },
  { title: "Reign of Madness", author: "Kel Kade", pageCount: 464, genre: "Fantasy", publicationDate: "2017-11-21", description: "Rezkin and his companions face the growing shadows of King's Dark Tidings.", series: { name: "King's Dark Tidings", order: 2, total: 5 }, tier: "A", topRank: null },
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
