const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [];

const REC_LIBRARY_ADDITIONS = [
  // Margaret Owen
  { title: "The Merciful Crow", author: "Margaret Owen", pageCount: 384, genre: "Fantasy", publicationDate: "2019-07-30", description: "A caste of mercy-killer witches shelters the escaped crown prince in a kingdom where her people are hunted.", series: { name: "The Merciful Crow", order: 1, total: 2 }, tier: "A", topRank: null },
  { title: "The Faithless Hawk", author: "Margaret Owen", pageCount: 432, genre: "Fantasy", publicationDate: "2020-08-18", description: "Fie and Jasimir return to face the consequences of putting him on the throne.", series: { name: "The Merciful Crow", order: 2, total: 2 }, tier: "A", topRank: null },
  { title: "Painted Devils", author: "Margaret Owen", pageCount: 544, genre: "Fantasy", publicationDate: "2023-06-06", description: "A young girl accidentally invents a god and must keep the con going.", series: { name: "Little Thieves", order: 2, total: 3 }, tier: "A", topRank: null },

  // S. Jae-Jones
  { title: "Wintersong", author: "S. Jae-Jones", pageCount: 448, genre: "Fantasy", publicationDate: "2017-02-07", description: "A young composer's sister is kidnapped by the Goblin King and she must bargain for her life in the Underground.", series: { name: "Wintersong", order: 1, total: 2 }, tier: "A", topRank: null },
  { title: "Shadowsong", author: "S. Jae-Jones", pageCount: 400, genre: "Fantasy", publicationDate: "2018-02-06", description: "The Wintersong sequel follows Liesl back into the world and the music that still binds her to the Goblin King.", series: { name: "Wintersong", order: 2, total: 2 }, tier: "A", topRank: null },

  // Rachel Hartman
  { title: "Seraphina", author: "Rachel Hartman", pageCount: 496, genre: "Fantasy", publicationDate: "2012-07-10", description: "A royal court musician in a kingdom of warring humans and dragons hides a secret about her own heritage.", series: { name: "Seraphina", order: 1, total: 2 }, tier: "A", topRank: null },
  { title: "Shadow Scale", author: "Rachel Hartman", pageCount: 608, genre: "Fantasy", publicationDate: "2015-03-10", description: "Seraphina searches for other half-dragon ityasaari as the realm teeters on civil war.", series: { name: "Seraphina", order: 2, total: 2 }, tier: "A", topRank: null },

  // Tessa Gratton
  { title: "The Queens of Innis Lear", author: "Tessa Gratton", pageCount: 576, genre: "Fantasy", publicationDate: "2018-03-27", description: "A dark fantasy retelling of King Lear, set in a land ruled by the three daughters of a vanishing star king.", series: null, tier: "S", topRank: null },
  { title: "Lady Hotspur", author: "Tessa Gratton", pageCount: 592, genre: "Fantasy", publicationDate: "2020-01-07", description: "A genderbent retelling of Shakespeare's Henry IV Part 1 set in the same world as Queens of Innis Lear.", series: null, tier: "A", topRank: null },

  // Anna-Marie McLemore
  { title: "Wild Beauty", author: "Anna-Marie McLemore", pageCount: 352, genre: "Fantasy", publicationDate: "2017-10-03", description: "Five cousins tending a magical Californian flower garden inherit a family curse on the men they love.", series: null, tier: "A", topRank: null },
  { title: "When the Moon Was Ours", author: "Anna-Marie McLemore", pageCount: 288, genre: "Fantasy", publicationDate: "2016-10-04", description: "A Pakistani American girl and a Latino trans boy love each other in a small California town of magical-realist secrets.", series: null, tier: "A", topRank: null },
  { title: "The Mirror Season", author: "Anna-Marie McLemore", pageCount: 320, genre: "Fantasy", publicationDate: "2021-03-16", description: "Two sexual assault survivors in an enchanted bakery try to stop the reality around them from shattering.", series: null, tier: "A", topRank: null },

  // Heather Walter
  { title: "Malice", author: "Heather Walter", pageCount: 480, genre: "Fantasy", publicationDate: "2021-04-13", description: "The Sleeping Beauty retold from the Maleficent-esque dark fairy's perspective.", series: { name: "Malice", order: 1, total: 2 }, tier: "A", topRank: null },
  { title: "Misrule", author: "Heather Walter", pageCount: 432, genre: "Fantasy", publicationDate: "2022-05-10", description: "A decade after Malice, Aurora must reclaim Briar from the shadowy new ruler.", series: { name: "Malice", order: 2, total: 2 }, tier: "A", topRank: null },

  // Isabel Ibañez
  { title: "Woven in Moonlight", author: "Isabel Ibañez", pageCount: 384, genre: "Fantasy", publicationDate: "2020-01-07", description: "A Bolivian-inspired fantasy in which a moon-blessed tapestry weaver is sent to spy on the usurper who killed her queen.", series: { name: "Woven in Moonlight", order: 1, total: 2 }, tier: "A", topRank: null },
  { title: "Written in Starlight", author: "Isabel Ibañez", pageCount: 400, genre: "Fantasy", publicationDate: "2021-01-26", description: "Catalina, the exiled queen, must find her way through a deadly jungle.", series: { name: "Woven in Moonlight", order: 2, total: 2 }, tier: "A", topRank: null },

  // Kiersten White — The Conqueror's Saga
  { title: "And I Darken", author: "Kiersten White", pageCount: 496, genre: "Historical Fiction", publicationDate: "2016-06-28", description: "A genderbent Vlad the Impaler — Lada — and her brother Radu are raised in the Ottoman court.", series: { name: "The Conqueror's Saga", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "Now I Rise", author: "Kiersten White", pageCount: 496, genre: "Historical Fiction", publicationDate: "2017-06-27", description: "Lada leads her soldiers to reclaim Wallachia while Radu spies for Mehmed.", series: { name: "The Conqueror's Saga", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "Bright We Burn", author: "Kiersten White", pageCount: 432, genre: "Historical Fiction", publicationDate: "2018-07-10", description: "The Conqueror's Saga closes as Lada and Mehmed face each other over Wallachia.", series: { name: "The Conqueror's Saga", order: 3, total: 3 }, tier: "A", topRank: null },

  // Susan Ee — Penryn
  { title: "Angelfall", author: "Susan Ee", pageCount: 336, genre: "Fantasy", publicationDate: "2011-05-21", description: "Six weeks after angels descended upon Earth, a teenage girl's sister is taken and she forms an uneasy alliance with a fallen angel.", series: { name: "Penryn and the End of Days", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "World After", author: "Susan Ee", pageCount: 320, genre: "Fantasy", publicationDate: "2013-11-19", description: "Penryn continues to search for her little sister Paige in the ruins of the apocalyptic Bay Area.", series: { name: "Penryn and the End of Days", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "End of Days", author: "Susan Ee", pageCount: 304, genre: "Fantasy", publicationDate: "2015-05-12", description: "The Penryn and the End of Days trilogy concludes with a climactic confrontation between humans and angels.", series: { name: "Penryn and the End of Days", order: 3, total: 3 }, tier: "A", topRank: null },

  // Crystal Smith
  { title: "Bloodleaf", author: "Crystal Smith", pageCount: 400, genre: "Fantasy", publicationDate: "2019-03-12", description: "A princess in exile in a neighboring kingdom falls in love with its prince while her own power awakens.", series: { name: "Bloodleaf", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "Greythorne", author: "Crystal Smith", pageCount: 400, genre: "Fantasy", publicationDate: "2020-08-04", description: "Aurelia's magic grows more volatile as the Bloodleaf series continues.", series: { name: "Bloodleaf", order: 2, total: 3 }, tier: "A", topRank: null },

  // Gita Trelease
  { title: "Enchantée", author: "Gita Trelease", pageCount: 464, genre: "Fantasy", publicationDate: "2019-02-05", description: "A seventeen-year-old orphan in pre-Revolutionary Paris uses dark magic to disguise herself as an aristocrat at Versailles.", series: { name: "Enchantée", order: 1, total: 2 }, tier: "A", topRank: null },
  { title: "Liberté", author: "Gita Trelease", pageCount: 464, genre: "Fantasy", publicationDate: "2021-02-02", description: "The French Revolution ignites around Camille and her sister in the Enchantée sequel.", series: { name: "Enchantée", order: 2, total: 2 }, tier: "A", topRank: null },

  // Nicki Pau Preto
  { title: "Crown of Feathers", author: "Nicki Pau Preto", pageCount: 496, genre: "Fantasy", publicationDate: "2019-02-12", description: "A young woman disguises herself as a boy to train with the legendary Phoenix Riders.", series: { name: "Crown of Feathers", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "Heart of Flames", author: "Nicki Pau Preto", pageCount: 512, genre: "Fantasy", publicationDate: "2020-02-11", description: "The Crown of Feathers series continues as three young women fight to stop an empire.", series: { name: "Crown of Feathers", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "Wings of Shadow", author: "Nicki Pau Preto", pageCount: 576, genre: "Fantasy", publicationDate: "2021-11-02", description: "The Crown of Feathers trilogy closes as Veronyka confronts her family's dark legacy.", series: { name: "Crown of Feathers", order: 3, total: 3 }, tier: "A", topRank: null },

  // Dhonielle Clayton
  { title: "The Belles", author: "Dhonielle Clayton", pageCount: 448, genre: "Fantasy", publicationDate: "2018-02-06", description: "In Orléans, Belles are women born with the power to transform others' ugliness into beauty — and Camellia is the most talented.", series: { name: "The Belles", order: 1, total: 2 }, tier: "A", topRank: null },
  { title: "The Everlasting Rose", author: "Dhonielle Clayton", pageCount: 352, genre: "Fantasy", publicationDate: "2019-03-05", description: "The Belles series continues as Camellia and her allies try to rescue the rightful queen.", series: { name: "The Belles", order: 2, total: 2 }, tier: "A", topRank: null },

  // Laura Sebastian — Ash Princess
  { title: "Ash Princess", author: "Laura Sebastian", pageCount: 448, genre: "Fantasy", publicationDate: "2018-04-24", description: "A princess kept as a hostage in her conquered palace since childhood plots to reclaim her throne.", series: { name: "Ash Princess", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "Lady Smoke", author: "Laura Sebastian", pageCount: 512, genre: "Fantasy", publicationDate: "2019-02-05", description: "Theodosia escapes the Kaiser's palace and must rally allies to take back Astrea.", series: { name: "Ash Princess", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "Ember Queen", author: "Laura Sebastian", pageCount: 464, genre: "Fantasy", publicationDate: "2020-02-04", description: "The Ash Princess trilogy concludes as Theodosia commands the elemental mines and confronts the Kaiserin.", series: { name: "Ash Princess", order: 3, total: 3 }, tier: "A", topRank: null },

  // Kalynn Bayron
  { title: "Cinderella Is Dead", author: "Kalynn Bayron", pageCount: 400, genre: "Fantasy", publicationDate: "2020-07-07", description: "Two hundred years after Cinderella's fairytale ending, girls are still forced to attend the ball — and a Black queer teen plots to end it.", series: null, tier: "A", topRank: null },
  { title: "This Poison Heart", author: "Kalynn Bayron", pageCount: 416, genre: "Fantasy", publicationDate: "2021-06-29", description: "A Black girl who can make plants grow by touching them inherits an old upstate New York estate and discovers her family's gift is a curse.", series: { name: "This Poison Heart", order: 1, total: 2 }, tier: "A", topRank: null },
  { title: "This Wicked Fate", author: "Kalynn Bayron", pageCount: 352, genre: "Fantasy", publicationDate: "2022-06-21", description: "The This Poison Heart sequel continues Briseis's search for a way to save her mother.", series: { name: "This Poison Heart", order: 2, total: 2 }, tier: "A", topRank: null },
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
