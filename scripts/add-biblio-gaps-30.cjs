const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "Camp Concentration", author: "Thomas M. Disch", pageCount: 192, genre: "Sci-Fi", publicationDate: "1968-01-01", description: "A poet imprisoned in a secret facility is injected with an experimental drug that boosts intelligence but is fatal.", series: null, tier: "A", topRank: null },
  { title: "334", author: "Thomas M. Disch", pageCount: 256, genre: "Sci-Fi", publicationDate: "1972-01-01", description: "Linked stories of life in a dystopian New York public housing project at 334 East 11th Street.", series: null, tier: "A", topRank: null },
  { title: "On Wings of Song", author: "Thomas M. Disch", pageCount: 359, genre: "Sci-Fi", publicationDate: "1979-01-01", description: "In a future America, people who can truly sing are able to leave their bodies and fly free.", series: null, tier: "A", topRank: null },
  { title: "The Genocides", author: "Thomas M. Disch", pageCount: 192, genre: "Sci-Fi", publicationDate: "1965-01-01", description: "Alien Plants overtake Earth, reducing humanity to vermin in a ruined biosphere.", series: null, tier: "B", topRank: null },

  { title: "The Female Man", author: "Joanna Russ", pageCount: 214, genre: "Sci-Fi", publicationDate: "1975-01-01", description: "Four women from parallel worlds meet and confront the meaning of gender and freedom.", series: null, tier: "S", topRank: null },
  { title: "We Who Are About To...", author: "Joanna Russ", pageCount: 170, genre: "Sci-Fi", publicationDate: "1977-01-01", description: "Castaways on an alien world refuse to play the roles of colonizers, with dark consequences.", series: null, tier: "A", topRank: null },
  { title: "And Chaos Died", author: "Joanna Russ", pageCount: 189, genre: "Sci-Fi", publicationDate: "1970-01-01", description: "A man marooned on a telepathic utopia returns to an Earth he no longer recognizes.", series: null, tier: "B", topRank: null },

  { title: "Night's Master", author: "Tanith Lee", pageCount: 256, genre: "Fantasy", publicationDate: "1978-01-01", description: "Azhrarn, Prince of Demons, weaves desire and despair through a flat earth of legend.", series: { name: "Tales from the Flat Earth", order: 1, total: 5 }, tier: "S", topRank: null },
  { title: "Death's Master", author: "Tanith Lee", pageCount: 352, genre: "Fantasy", publicationDate: "1979-01-01", description: "Uhlume, Lord of Death, strikes bargains with mortals across centuries on the flat earth.", series: { name: "Tales from the Flat Earth", order: 2, total: 5 }, tier: "A", topRank: null },
  { title: "Delusion's Master", author: "Tanith Lee", pageCount: 208, genre: "Fantasy", publicationDate: "1981-01-01", description: "Chuz, Lord of Madness, shares tales of his touch on mortal lives.", series: { name: "Tales from the Flat Earth", order: 3, total: 5 }, tier: "A", topRank: null },

  { title: "Ombria in Shadow", author: "Patricia A. McKillip", pageCount: 304, genre: "Fantasy", publicationDate: "2002-01-01", description: "A dying prince, a bastard heir, and a shadow city bound to the real one in a tale of inheritance and magic.", series: null, tier: "A", topRank: null },
  { title: "Od Magic", author: "Patricia A. McKillip", pageCount: 320, genre: "Fantasy", publicationDate: "2005-01-01", description: "The king's wizards and a wandering gardener collide when strange magic surfaces in the city of Kelior.", series: null, tier: "A", topRank: null },
  { title: "The Bards of Bone Plain", author: "Patricia A. McKillip", pageCount: 336, genre: "Fantasy", publicationDate: "2010-01-01", description: "A student bard and an archaeologist princess unravel the mystery of the Three Trials of Bone Plain.", series: null, tier: "A", topRank: null },

  { title: "Transformation", author: "Carol Berg", pageCount: 512, genre: "Fantasy", publicationDate: "2000-01-01", description: "Seyonne, a slave and fallen sorcerer, is bought by the prince of the empire that destroyed his people.", series: { name: "Rai-kirah", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "Revelation", author: "Carol Berg", pageCount: 464, genre: "Fantasy", publicationDate: "2001-01-01", description: "Seyonne battles the demons that corrupt souls while his own people turn against him.", series: { name: "Rai-kirah", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "Restoration", author: "Carol Berg", pageCount: 480, genre: "Fantasy", publicationDate: "2002-01-01", description: "The final confrontation with the Lord of Demons brings Seyonne's long struggle to a close.", series: { name: "Rai-kirah", order: 3, total: 3 }, tier: "A", topRank: null },

  { title: "The Gate to Women's Country", author: "Sheri S. Tepper", pageCount: 278, genre: "Sci-Fi", publicationDate: "1988-01-01", description: "Centuries after a cataclysm, women live in walled towns while men dwell in garrisons outside — but the real story is hidden.", series: null, tier: "A", topRank: null },
  { title: "Beauty", author: "Sheri S. Tepper", pageCount: 412, genre: "Fantasy", publicationDate: "1991-01-01", description: "A retelling of Sleeping Beauty that sprawls across centuries, fairy realms, and ecological collapse.", series: null, tier: "A", topRank: null },

  { title: "Norstrilia", author: "Cordwainer Smith", pageCount: 288, genre: "Sci-Fi", publicationDate: "1975-01-01", description: "A boy from the wealthiest planet in the galaxy buys Earth and journeys there in disguise.", series: null, tier: "A", topRank: null },
  { title: "The Rediscovery of Man", author: "Cordwainer Smith", pageCount: 671, genre: "Sci-Fi", publicationDate: "1993-01-01", description: "The complete short fiction of Cordwainer Smith, including the tales of the Instrumentality of Mankind.", series: null, tier: "S", topRank: null },

  { title: "Lest Darkness Fall", author: "L. Sprague de Camp", pageCount: 256, genre: "Sci-Fi", publicationDate: "1939-01-01", description: "A modern archaeologist is flung back to sixth-century Rome and tries to prevent the Dark Ages.", series: null, tier: "A", topRank: null },
  { title: "The Incomplete Enchanter", author: "L. Sprague de Camp", pageCount: 192, genre: "Fantasy", publicationDate: "1941-01-01", description: "Psychologist Harold Shea uses symbolic logic to travel into the worlds of Norse myth and Spenser's Faerie Queene.", series: { name: "Harold Shea", order: 1, total: 5 }, tier: "B", topRank: null },
  { title: "The Compleat Enchanter", author: "L. Sprague de Camp", pageCount: 384, genre: "Fantasy", publicationDate: "1975-01-01", description: "Omnibus of the first three Harold Shea stories across myth and literary worlds.", series: { name: "Harold Shea", order: 0, total: 5 }, tier: "B", topRank: null },

  { title: "Banewreaker", author: "Jacqueline Carey", pageCount: 416, genre: "Fantasy", publicationDate: "2004-01-01", description: "An epic fantasy told from the side of the Dark Lord, reframing good and evil across a sundered world.", series: { name: "The Sundering", order: 1, total: 2 }, tier: "A", topRank: null },
  { title: "Godslayer", author: "Jacqueline Carey", pageCount: 416, genre: "Fantasy", publicationDate: "2005-01-01", description: "The Sundering reaches its tragic conclusion as prophecy and loyalty collide.", series: { name: "The Sundering", order: 2, total: 2 }, tier: "A", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  { title: "The Phoenix and the Mirror", author: "Avram Davidson", pageCount: 222, genre: "Fantasy", publicationDate: "1969-01-01", description: "Virgil the Magus, a Roman sorcerer of legend, must forge a mirror of mirrors to save a kidnapped girl.", series: null, tier: "A", topRank: null },
  { title: "The Island Under the Earth", author: "Avram Davidson", pageCount: 176, genre: "Fantasy", publicationDate: "1969-01-01", description: "A strange quest across a half-mythic landscape of centaurs and giants.", series: null, tier: "B", topRank: null },
  { title: "Rogue Dragon", author: "Avram Davidson", pageCount: 160, genre: "Sci-Fi", publicationDate: "1965-01-01", description: "On a distant world where hunting dragons is sport for the galactic elite, one hunt goes very wrong.", series: null, tier: "B", topRank: null },

  { title: "Past Master", author: "R. A. Lafferty", pageCount: 192, genre: "Sci-Fi", publicationDate: "1968-01-01", description: "Thomas More is snatched from 1535 to rule a utopia-turned-dystopia on the far-future planet Astrobe.", series: null, tier: "A", topRank: null },
  { title: "Fourth Mansions", author: "R. A. Lafferty", pageCount: 224, genre: "Sci-Fi", publicationDate: "1969-01-01", description: "A journalist stumbles into a secret war among hidden factions shaping human destiny.", series: null, tier: "A", topRank: null },
  { title: "Nine Hundred Grandmothers", author: "R. A. Lafferty", pageCount: 320, genre: "Sci-Fi", publicationDate: "1970-01-01", description: "Landmark short story collection showcasing Lafferty's tall-tale inventiveness.", series: null, tier: "S", topRank: null },
  { title: "Okla Hannali", author: "R. A. Lafferty", pageCount: 288, genre: "Historical Fiction", publicationDate: "1972-01-01", description: "A Choctaw giant's life spans the Trail of Tears and the transformation of the American South.", series: null, tier: "A", topRank: null },

  { title: "The Fall of Chronopolis", author: "Barrington J. Bayley", pageCount: 176, genre: "Sci-Fi", publicationDate: "1974-01-01", description: "A time-faring empire fights to preserve its own history against paradox and invasion.", series: null, tier: "A", topRank: null },
  { title: "The Garments of Caean", author: "Barrington J. Bayley", pageCount: 192, genre: "Sci-Fi", publicationDate: "1976-01-01", description: "On the planet Caean, clothing shapes identity — and one garment may reshape humanity itself.", series: null, tier: "A", topRank: null },
  { title: "The Zen Gun", author: "Barrington J. Bayley", pageCount: 168, genre: "Sci-Fi", publicationDate: "1983-01-01", description: "A dying galactic empire, a genetically engineered pig scientist, and a weapon powered by enlightenment.", series: null, tier: "B", topRank: null },

  { title: "Thinner Than Thou", author: "Kit Reed", pageCount: 384, genre: "Sci-Fi", publicationDate: "2004-01-01", description: "In a near-future America obsessed with body image, a cult of weight and beauty rules society.", series: null, tier: "A", topRank: null },
  { title: "Enclave", author: "Kit Reed", pageCount: 304, genre: "Sci-Fi", publicationDate: "2009-01-01", description: "An exclusive boarding school on a hidden island hides sinister secrets about its wealthy students.", series: null, tier: "B", topRank: null },
  { title: "Where", author: "Kit Reed", pageCount: 320, genre: "Sci-Fi", publicationDate: "2015-01-01", description: "The entire population of a small town vanishes, replaced by an impossible place.", series: null, tier: "B", topRank: null },

  { title: "Carmen Dog", author: "Carol Emshwiller", pageCount: 164, genre: "Sci-Fi", publicationDate: "1988-01-01", description: "Animals are becoming women and women becoming animals; a setter named Pooch flees with a baby to find opera stardom.", series: null, tier: "A", topRank: null },
  { title: "The Mount", author: "Carol Emshwiller", pageCount: 232, genre: "Sci-Fi", publicationDate: "2002-01-01", description: "Earth has been conquered by aliens who ride humans; a boy bred as a mount questions his place.", series: null, tier: "A", topRank: null },
  { title: "Ledoyt", author: "Carol Emshwiller", pageCount: 320, genre: "Historical Fiction", publicationDate: "1995-01-01", description: "A turn-of-the-century California ranch family shaped by a taciturn drifter.", series: null, tier: "B", topRank: null },

  { title: "Dreamsnake", author: "Vonda N. McIntyre", pageCount: 313, genre: "Sci-Fi", publicationDate: "1978-01-01", description: "A healer travels a post-apocalyptic Earth with genetically engineered serpents she uses in her craft.", series: null, tier: "S", topRank: null },
  { title: "The Moon and the Sun", author: "Vonda N. McIntyre", pageCount: 432, genre: "Historical Fiction", publicationDate: "1997-01-01", description: "In the court of Louis XIV, a natural philosopher discovers a captured sea creature is sentient.", series: null, tier: "A", topRank: null },
  { title: "Starfarers", author: "Vonda N. McIntyre", pageCount: 320, genre: "Sci-Fi", publicationDate: "1989-01-01", description: "A starship crew hijacks their own vessel to carry out the interstellar mission their government canceled.", series: { name: "Starfarers", order: 1, total: 4 }, tier: "B", topRank: null },

  { title: "A Woman of the Iron People", author: "Eleanor Arnason", pageCount: 590, genre: "Sci-Fi", publicationDate: "1991-01-01", description: "A human anthropologist befriends an alien outcast on a world where the sexes live apart.", series: null, tier: "A", topRank: null },
  { title: "Ring of Swords", author: "Eleanor Arnason", pageCount: 351, genre: "Sci-Fi", publicationDate: "1993-01-01", description: "First contact with the hwarhath, an alien species whose warrior culture mirrors humanity in unexpected ways.", series: null, tier: "A", topRank: null },
  { title: "Tomb of the Fathers", author: "Eleanor Arnason", pageCount: 200, genre: "Sci-Fi", publicationDate: "2010-01-01", description: "A Lydia Duluth adventure through an alien archaeological mystery.", series: null, tier: "B", topRank: null },

  { title: "Walk to the End of the World", author: "Suzy McKee Charnas", pageCount: 215, genre: "Sci-Fi", publicationDate: "1974-01-01", description: "In a post-apocalyptic wasteland, women are blamed for the fall of civilization and enslaved.", series: { name: "Holdfast Chronicles", order: 1, total: 4 }, tier: "A", topRank: null },
  { title: "Motherlines", author: "Suzy McKee Charnas", pageCount: 249, genre: "Sci-Fi", publicationDate: "1978-01-01", description: "Escaped women build a society among horse-riding tribes on the plains.", series: { name: "Holdfast Chronicles", order: 2, total: 4 }, tier: "A", topRank: null },
  { title: "The Vampire Tapestry", author: "Suzy McKee Charnas", pageCount: 304, genre: "Horror", publicationDate: "1980-01-01", description: "Edward Weyland, an ancient predator hiding as an anthropology professor, in linked novellas.", series: null, tier: "S", topRank: null },

  { title: "The Falling Woman", author: "Pat Murphy", pageCount: 287, genre: "Fantasy", publicationDate: "1986-01-01", description: "An archaeologist in the Yucatan who can see the ghosts of the past meets her estranged daughter.", series: null, tier: "A", topRank: null },
  { title: "The City, Not Long After", author: "Pat Murphy", pageCount: 244, genre: "Sci-Fi", publicationDate: "1989-01-01", description: "After a plague, artists reshape a depopulated San Francisco into a living work of art.", series: null, tier: "A", topRank: null },
  { title: "Nadya", author: "Pat Murphy", pageCount: 352, genre: "Fantasy", publicationDate: "1996-01-01", description: "A werewolf journeys westward across nineteenth-century America.", series: null, tier: "B", topRank: null },

  { title: "Queen City Jazz", author: "Kathleen Ann Goonan", pageCount: 432, genre: "Sci-Fi", publicationDate: "1994-01-01", description: "Post-nanotech Cincinnati runs on living architecture powered by giant bees and jazz.", series: { name: "Nanotech Quartet", order: 1, total: 4 }, tier: "A", topRank: null },
  { title: "In War Times", author: "Kathleen Ann Goonan", pageCount: 352, genre: "Sci-Fi", publicationDate: "2007-01-01", description: "A WWII soldier receives plans for a device that could rewrite history through jazz and quantum mechanics.", series: null, tier: "A", topRank: null },
  { title: "Light Music", author: "Kathleen Ann Goonan", pageCount: 400, genre: "Sci-Fi", publicationDate: "2002-01-01", description: "The conclusion of the Nanotech Quartet, as the boundaries between human and machine dissolve.", series: { name: "Nanotech Quartet", order: 4, total: 4 }, tier: "B", topRank: null },

  { title: "Black Wine", author: "Candas Jane Dorsey", pageCount: 283, genre: "Fantasy", publicationDate: "1997-01-01", description: "A braided tale of three women across a world of slavery, madness, and quiet magic.", series: null, tier: "A", topRank: null },
  { title: "A Paradigm of Earth", author: "Candas Jane Dorsey", pageCount: 350, genre: "Sci-Fi", publicationDate: "2001-01-01", description: "A young woman becomes caretaker to an alien sent to learn humanity.", series: null, tier: "B", topRank: null },

  { title: "Maul", author: "Tricia Sullivan", pageCount: 320, genre: "Sci-Fi", publicationDate: "2003-01-01", description: "A shopping-mall shootout and a far-future plague where only women survive — intertwined.", series: null, tier: "A", topRank: null },
  { title: "Double Vision", author: "Tricia Sullivan", pageCount: 352, genre: "Sci-Fi", publicationDate: "2005-01-01", description: "A corporate psychic watches an alien war through others' eyes — until it breaks into her world.", series: null, tier: "A", topRank: null },
  { title: "Lightborn", author: "Tricia Sullivan", pageCount: 400, genre: "Sci-Fi", publicationDate: "2010-01-01", description: "A town where beamed light modifies thought and behavior loses control of its technology.", series: null, tier: "B", topRank: null },

  { title: "The Enchantments of Flesh and Spirit", author: "Storm Constantine", pageCount: 320, genre: "Fantasy", publicationDate: "1987-01-01", description: "In a post-human world, the androgynous Wraeththu rise as humanity declines.", series: { name: "Wraeththu", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "The Bewitchments of Love and Hate", author: "Storm Constantine", pageCount: 352, genre: "Fantasy", publicationDate: "1988-01-01", description: "The Wraeththu nations crystallize into warring tribes and courts.", series: { name: "Wraeththu", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "The Fulfilments of Fate and Desire", author: "Storm Constantine", pageCount: 336, genre: "Fantasy", publicationDate: "1989-01-01", description: "The final volume of Wraeththu closes the story of a reborn species.", series: { name: "Wraeththu", order: 3, total: 3 }, tier: "A", topRank: null },

  { title: "Melusine", author: "Sarah Monette", pageCount: 448, genre: "Fantasy", publicationDate: "2005-01-01", description: "A broken wizard and a cat burglar flee the city of Melusine through the Mirador's shattered magic.", series: { name: "Doctrine of Labyrinths", order: 1, total: 4 }, tier: "A", topRank: null },
  { title: "The Virtu", author: "Sarah Monette", pageCount: 448, genre: "Fantasy", publicationDate: "2006-01-01", description: "Felix and Mildmay return toward Melusine to repair the shattered magical engine.", series: { name: "Doctrine of Labyrinths", order: 2, total: 4 }, tier: "A", topRank: null },
  { title: "The Mirador", author: "Sarah Monette", pageCount: 448, genre: "Fantasy", publicationDate: "2007-01-01", description: "Court intrigue and forbidden magic tighten around the half-brothers.", series: { name: "Doctrine of Labyrinths", order: 3, total: 4 }, tier: "A", topRank: null },
  { title: "Corambis", author: "Sarah Monette", pageCount: 432, genre: "Fantasy", publicationDate: "2009-01-01", description: "Exiled from Melusine, Felix and Mildmay arrive in Corambis, where a dead engine is waking.", series: { name: "Doctrine of Labyrinths", order: 4, total: 4 }, tier: "A", topRank: null },
];

function keyOf(b) { return (b.title + "|" + b.author).toLowerCase(); }

// Apply primary
const data = JSON.parse(fs.readFileSync(CATALOG, "utf8"));
const books = Array.isArray(data) ? data : (data.books || []);
const existingKeys = new Set(books.map(keyOf));
const freshPrimary = PRIMARY_ADDITIONS.filter(b => !existingKeys.has(keyOf(b)));
const nextBooks = books.concat(freshPrimary);
fs.writeFileSync(CATALOG, JSON.stringify(Array.isArray(data) ? nextBooks : { ...data, books: nextBooks }));
console.log(`PRIMARY: added ${freshPrimary.length} books, ${books.length} → ${nextBooks.length}`);

// Apply rec library
let recData;
if (fs.existsSync(REC_LIBRARY)) {
  recData = JSON.parse(fs.readFileSync(REC_LIBRARY, "utf8"));
} else {
  recData = [];
}
const recBooks = Array.isArray(recData) ? recData : (recData.books || []);
const recKeys = new Set(recBooks.map(keyOf));
const freshRec = REC_LIBRARY_ADDITIONS.filter(b => !recKeys.has(keyOf(b)));
const nextRec = recBooks.concat(freshRec);
fs.writeFileSync(REC_LIBRARY, JSON.stringify(Array.isArray(recData) || !recData.books ? nextRec : { ...recData, books: nextRec }));
console.log(`REC LIBRARY: added ${freshRec.length} books, ${recBooks.length} → ${nextRec.length}`);

const pSize = (fs.statSync(CATALOG).size / 1024 / 1024).toFixed(2);
const rSize = (fs.statSync(REC_LIBRARY).size / 1024).toFixed(1);
console.log(`\nbook-data.json: ${pSize} MB`);
console.log(`rec-library.json: ${rSize} KB`);
