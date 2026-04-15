const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [];

const REC_LIBRARY_ADDITIONS = [
  // Spy thrillers
  { title: "The Good German", author: "Joseph Kanon", pageCount: 496, genre: "Historical Fiction", publicationDate: "2001-10-23", description: "An American war correspondent returns to ruined 1945 Berlin to investigate a murder tied to German rocket scientists.", series: null, tier: "S", topRank: null },
  { title: "Istanbul Passage", author: "Joseph Kanon", pageCount: 432, genre: "Historical Fiction", publicationDate: "2012-05-29", description: "A neutral American businessman in postwar Istanbul is pulled into moving a fugitive Romanian war criminal out of the city.", series: null, tier: "A", topRank: null },
  { title: "Los Alamos", author: "Joseph Kanon", pageCount: 416, genre: "Historical Fiction", publicationDate: "1997-01-01", description: "A security officer investigates a murder at the Manhattan Project's Los Alamos site in 1945. Edgar Award winner.", series: null, tier: "A", topRank: null },

  { title: "Night Soldiers", author: "Alan Furst", pageCount: 464, genre: "Historical Fiction", publicationDate: "1988-01-01", description: "A young Bulgarian joins Soviet intelligence in the 1930s and moves through pre-WWII Europe — the first of Furst's Night Soldiers series.", series: { name: "Night Soldiers", order: 1, total: 14 }, tier: "S", topRank: null },
  { title: "Dark Star", author: "Alan Furst", pageCount: 448, genre: "Historical Fiction", publicationDate: "1991-01-01", description: "A Jewish Pravda correspondent in 1937 Paris is pulled into Soviet intelligence just as Stalin's purges begin.", series: { name: "Night Soldiers", order: 2, total: 14 }, tier: "S", topRank: null },
  { title: "The Polish Officer", author: "Alan Furst", pageCount: 320, genre: "Historical Fiction", publicationDate: "1995-01-01", description: "A Polish military intelligence officer spends the 1939 invasion and after moving between occupied Warsaw and exile Paris.", series: { name: "Night Soldiers", order: 3, total: 14 }, tier: "A", topRank: null },

  { title: "The Tourist", author: "Olen Steinhauer", pageCount: 416, genre: "Thriller", publicationDate: "2009-03-03", description: "A CIA operative called a Tourist is pulled back out of retirement after a hit he thought he had left behind.", series: { name: "Milo Weaver", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "The Cairo Affair", author: "Olen Steinhauer", pageCount: 416, genre: "Thriller", publicationDate: "2014-03-18", description: "An American diplomat's wife in Hungary is drawn into her husband's murder and a CIA operation spanning Libya, Egypt, and Tunisia.", series: null, tier: "A", topRank: null },

  { title: "A Spy by Nature", author: "Charles Cumming", pageCount: 384, genre: "Thriller", publicationDate: "2001-01-01", description: "A young British man is recruited as a corporate spy in a North Sea oil dispute — Cumming's debut.", series: null, tier: "A", topRank: null },
  { title: "A Foreign Country", author: "Charles Cumming", pageCount: 432, genre: "Thriller", publicationDate: "2012-01-01", description: "A former MI6 officer is pulled back in when the newly appointed chief of the service disappears. CWA Dagger winner.", series: null, tier: "A", topRank: null },

  { title: "Body of Lies", author: "David Ignatius", pageCount: 349, genre: "Thriller", publicationDate: "2007-04-23", description: "A CIA officer in Iraq and Jordan builds a fictional terrorist organization to flush out a real one.", series: null, tier: "A", topRank: null },
  { title: "The Increment", author: "David Ignatius", pageCount: 400, genre: "Thriller", publicationDate: "2009-06-01", description: "A CIA officer in London receives coded messages from an Iranian physicist and is sent to verify them.", series: null, tier: "A", topRank: null },

  { title: "An Honorable Man", author: "Paul Vidich", pageCount: 240, genre: "Thriller", publicationDate: "2016-04-12", description: "A 1953 CIA counterintelligence officer hunts a mole in the agency — Vidich's Graham Greene-inflected debut.", series: null, tier: "A", topRank: null },
  { title: "The Good Assassin", author: "Paul Vidich", pageCount: 272, genre: "Thriller", publicationDate: "2017-04-11", description: "A CIA officer in 1958 Havana tries to reach an old friend as the Cuban Revolution closes in.", series: null, tier: "A", topRank: null },

  // Literary (Helen Dunmore)
  { title: "A Spell of Winter", author: "Helen Dunmore", pageCount: 320, genre: "Fiction", publicationDate: "1995-01-01", description: "Two Edwardian English siblings raised alone in a great house slowly fall into an incestuous bond. Orange Prize winner.", series: null, tier: "S", topRank: null },
  { title: "The Siege", author: "Helen Dunmore", pageCount: 320, genre: "Historical Fiction", publicationDate: "2001-01-01", description: "A young Leningrad woman tries to keep her family alive through the first brutal winter of the Nazi siege.", series: null, tier: "S", topRank: null },
  { title: "Birdcage Walk", author: "Helen Dunmore", pageCount: 416, genre: "Historical Fiction", publicationDate: "2017-03-02", description: "In 1792 Bristol, a woman married to a speculative property developer realizes her husband may have killed his first wife.", series: null, tier: "A", topRank: null },

  // Regional crime
  { title: "Bruno, Chief of Police", author: "Martin Walker", pageCount: 320, genre: "Mystery", publicationDate: "2008-01-01", description: "The single policeman of a Dordogne village investigates the murder of an elderly Algerian immigrant — the first Bruno novel.", series: { name: "Bruno, Chief of Police", order: 1, total: 17 }, tier: "A", topRank: null },
  { title: "The Dark Vineyard", author: "Martin Walker", pageCount: 320, genre: "Mystery", publicationDate: "2009-01-01", description: "An arsonist sets fire to a Dordogne vineyard and Bruno unspools a local fight over genetically modified wine grapes.", series: { name: "Bruno, Chief of Police", order: 2, total: 17 }, tier: "A", topRank: null },
  { title: "Black Diamond", author: "Martin Walker", pageCount: 320, genre: "Mystery", publicationDate: "2010-01-01", description: "Bruno investigates the murder of a local truffle-hunting friend and a shady network of Chinese traders.", series: { name: "Bruno, Chief of Police", order: 3, total: 17 }, tier: "A", topRank: null },

  { title: "Little Face", author: "Sophie Hannah", pageCount: 416, genre: "Thriller", publicationDate: "2006-08-01", description: "A new mother returns from her first errand alone to discover the baby in the cot is not her baby.", series: { name: "Culver Valley Crime", order: 1, total: 10 }, tier: "A", topRank: null },
  { title: "Hurting Distance", author: "Sophie Hannah", pageCount: 432, genre: "Thriller", publicationDate: "2007-01-01", description: "A woman's married lover disappears and she must confess a crime of her own to find him.", series: { name: "Culver Valley Crime", order: 2, total: 10 }, tier: "A", topRank: null },

  // Historical romance
  { title: "Thunder and Roses", author: "Mary Jo Putney", pageCount: 448, genre: "Romance", publicationDate: "1993-01-01", description: "A Welsh Methodist schoolmistress bargains with a dissolute aristocrat to save her village from his mine — the first Fallen Angels novel.", series: { name: "Fallen Angels", order: 1, total: 6 }, tier: "A", topRank: null },
  { title: "Dancing on the Wind", author: "Mary Jo Putney", pageCount: 400, genre: "Romance", publicationDate: "1994-01-01", description: "A spymaster in Regency England employs an actress to expose a political conspiracy.", series: { name: "Fallen Angels", order: 2, total: 6 }, tier: "A", topRank: null },
  { title: "The Rake", author: "Mary Jo Putney", pageCount: 384, genre: "Romance", publicationDate: "1998-01-01", description: "A drunken English aristocrat is sent to manage his crumbling country estate and meets the competent steward secretly running it.", series: null, tier: "A", topRank: null },

  { title: "The Spymaster's Lady", author: "Joanna Bourne", pageCount: 384, genre: "Romance", publicationDate: "2008-01-01", description: "A French spy escapes an English prison with the British spymaster sent to track her down.", series: { name: "Spymasters", order: 1, total: 6 }, tier: "S", topRank: null },
  { title: "The Forbidden Rose", author: "Joanna Bourne", pageCount: 400, genre: "Romance", publicationDate: "2010-01-01", description: "A French aristocrat fleeing the Revolution is sheltered by a British spy disguised as a bookseller.", series: { name: "Spymasters", order: 2, total: 6 }, tier: "A", topRank: null },
  { title: "My Lord and Spymaster", author: "Joanna Bourne", pageCount: 384, genre: "Romance", publicationDate: "2008-01-01", description: "A merchant's daughter and a British spymaster both pursue the same French spy in Regency London.", series: { name: "Spymasters", order: 3, total: 6 }, tier: "A", topRank: null },

  { title: "Duke of Shadows", author: "Meredith Duran", pageCount: 400, genre: "Romance", publicationDate: "2008-01-01", description: "A mixed-race duke and an English artist meet in 1857 Delhi just before the Sepoy Rebellion.", series: null, tier: "A", topRank: null },
  { title: "Fool Me Twice", author: "Meredith Duran", pageCount: 384, genre: "Romance", publicationDate: "2014-04-01", description: "A duke locked away in his country house after a scandal is roused by the new housekeeper who is not what she seems.", series: null, tier: "A", topRank: null },

  { title: "Lord of Scoundrels", author: "Loretta Chase", pageCount: 384, genre: "Romance", publicationDate: "1995-01-01", description: "A notorious Regency rake meets his match in a scholar's daughter who shoots him on their first encounter — widely considered one of the greatest romance novels.", series: { name: "Scoundrels", order: 3, total: 5 }, tier: "S", topRank: null },
  { title: "Mr. Impossible", author: "Loretta Chase", pageCount: 384, genre: "Romance", publicationDate: "2005-01-01", description: "An English gentlewoman scholar frees an English adventurer from an Egyptian prison and the two search for her kidnapped brother.", series: { name: "Carsington", order: 2, total: 5 }, tier: "A", topRank: null },
  { title: "Silk Is for Seduction", author: "Loretta Chase", pageCount: 384, genre: "Romance", publicationDate: "2011-01-01", description: "A London dressmaker sets out to seduce a duke into buying his fiancée's trousseau from her shop.", series: { name: "Dressmakers", order: 1, total: 4 }, tier: "A", topRank: null },

  { title: "The Raven Prince", author: "Elizabeth Hoyt", pageCount: 368, genre: "Romance", publicationDate: "2006-01-01", description: "A Regency widow takes a position as secretary to a brooding earl — the first Princes trilogy novel.", series: { name: "Princes", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "The Serpent Prince", author: "Elizabeth Hoyt", pageCount: 384, genre: "Romance", publicationDate: "2007-01-01", description: "A reclusive country spinster rescues a naked unconscious aristocrat from the road and the novel follows his revenge.", series: { name: "Princes", order: 3, total: 3 }, tier: "A", topRank: null },

  { title: "Bringing Down the Duke", author: "Evie Dunmore", pageCount: 400, genre: "Romance", publicationDate: "2019-09-03", description: "An Oxford suffragette in 1879 is tasked with winning a conservative duke over to women's suffrage — and falls for him.", series: { name: "A League of Extraordinary Women", order: 1, total: 4 }, tier: "A", topRank: null },
  { title: "A Rogue of One's Own", author: "Evie Dunmore", pageCount: 432, genre: "Romance", publicationDate: "2020-09-01", description: "A suffragette publisher is blackmailed into an arrangement by the earl who owns her press.", series: { name: "A League of Extraordinary Women", order: 2, total: 4 }, tier: "A", topRank: null },

  // Contemporary romance
  { title: "Delilah Green Doesn't Care", author: "Ashley Herring Blake", pageCount: 384, genre: "Romance", publicationDate: "2022-02-22", description: "A New York photographer returns to her small Vermont hometown for her stepsister's wedding and falls for the best friend.", series: { name: "Bright Falls", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "Astrid Parker Doesn't Fail", author: "Ashley Herring Blake", pageCount: 368, genre: "Romance", publicationDate: "2022-11-22", description: "A type-A interior designer and a chaotic carpenter are forced to collaborate on renovating a beloved Vermont inn.", series: { name: "Bright Falls", order: 2, total: 3 }, tier: "A", topRank: null },

  { title: "The Worst Best Man", author: "Mia Sosa", pageCount: 336, genre: "Romance", publicationDate: "2020-04-14", description: "A jilted Philadelphia wedding planner is forced to work with the brother of the groom who helped ruin her wedding.", series: null, tier: "A", topRank: null },
  { title: "The Wedding Crasher", author: "Mia Sosa", pageCount: 384, genre: "Romance", publicationDate: "2022-04-05", description: "A Philadelphia woman stops a wedding in progress and ends up in a fake engagement with the stopped groom.", series: null, tier: "A", topRank: null },

  { title: "Every Summer After", author: "Carley Fortune", pageCount: 320, genre: "Romance", publicationDate: "2022-05-10", description: "A Toronto magazine editor returns to her childhood cottage for her best friend's mother's funeral and sees the boy she left behind.", series: null, tier: "A", topRank: null },
  { title: "Meet Me at the Lake", author: "Carley Fortune", pageCount: 352, genre: "Romance", publicationDate: "2023-05-02", description: "A Toronto woman who runs her mother's lakeside resort meets a stranger who reveals a day they shared nine years ago.", series: null, tier: "A", topRank: null },
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
