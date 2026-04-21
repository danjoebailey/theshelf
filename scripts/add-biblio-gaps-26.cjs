const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

// Duplicate to remove
const DELETE = [
  { title: "Dying Fall", author: "Elly Griffiths" }, // keep "A Dying Fall"
];

// ── PRIMARY (existing authors) ────────────────────────────────────────────
const PRIMARY_ADDITIONS = [
  // Max Gladstone (3)
  { title: "Dead Country", author: "Max Gladstone", pageCount: 240, genre: "Fantasy", publicationDate: "2023", description: "The first Craft Wars novel: Tara Abernathy returns to her hometown of Edgemont to bury her father and stays to confront the Raiders killing everyone she grew up with.", series: { name: "The Craft Wars", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Wicked Problems", author: "Max Gladstone", pageCount: 368, genre: "Fantasy", publicationDate: "2024", description: "Craft Wars #2: the King in Red and his allies confront the returning Old Gods while the Craft legal system threatens to tear itself apart.", series: { name: "The Craft Wars", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "This Is How You Lose the Time War", author: "Max Gladstone", pageCount: 208, genre: "Sci-Fi", publicationDate: "2019", description: "Gladstone's Hugo-winning epistolary collaboration with Amal El-Mohtar: two time-traveling agents from opposing futures begin exchanging hidden letters across history.", series: null, tier: 1, topRank: null },

  // Zen Cho (2)
  { title: "Black Water Sister", author: "Zen Cho", pageCount: 384, genre: "Fantasy", publicationDate: "2021", description: "A Malaysian-American woman returning to her family's homeland discovers her late grandmother's ghost has taken up residence in her head — and that Grandma has unfinished business.", series: null, tier: 1, topRank: null },
  { title: "Spirits Abroad", author: "Zen Cho", pageCount: 240, genre: "Fantasy", publicationDate: "2014", description: "Cho's debut collection: nineteen stories of Malaysian spirits, displaced families, and cross-cultural ghosts — her Crawford Award-winning short fiction.", series: null, tier: 1, topRank: null },

  // Emily St. John Mandel (1)
  { title: "Last Night in Montreal", author: "Emily St. John Mandel", pageCount: 256, genre: "Fiction", publicationDate: "2009", description: "Mandel's debut: a young woman who has spent her life on the run from her own childhood abduction vanishes from her boyfriend's apartment in Brooklyn, leaving him to trace her back to Montreal.", series: null, tier: 1, topRank: null },

  // Clare Mackintosh (2)
  { title: "The Last Party", author: "Clare Mackintosh", pageCount: 416, genre: "Thriller", publicationDate: "2022", description: "The first DC Morgan novel: a Welsh detective investigates the New Year's Eve death of a controversial property developer in a remote village straddling the English-Welsh border.", series: { name: "DC Ffion Morgan", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "A Game of Lies", author: "Clare Mackintosh", pageCount: 400, genre: "Thriller", publicationDate: "2023", description: "DC Morgan #2: a reality-TV show contestant is killed on set, and Ffion Morgan must piece together which of the show's lies led to her death.", series: { name: "DC Ffion Morgan", order: 2, total: 3 }, tier: 1, topRank: null },

  // Tana French (1)
  { title: "The Witch Elm", author: "Tana French", pageCount: 528, genre: "Mystery", publicationDate: "2018", description: "French's first standalone outside the Dublin Murder Squad: a charming young man recovering from an attack at his uncle's Dublin house is drawn into a decades-old mystery when a skull is discovered in a tree.", series: null, tier: 1, topRank: null },

  // Clay McLeod Chapman (3)
  { title: "The Remaking", author: "Clay McLeod Chapman", pageCount: 320, genre: "Horror", publicationDate: "2019", description: "Chapman's novel about a cursed urban legend of a witch and her daughter that is remade into a 1970s horror movie — and that begins bleeding into the real world of each new adaptation.", series: null, tier: 1, topRank: null },
  { title: "Whisper Down the Lane", author: "Clay McLeod Chapman", pageCount: 304, genre: "Horror", publicationDate: "2021", description: "A single father with a dark childhood secret is drawn back into the 1980s Satanic panic he accidentally started — as it begins happening all over again.", series: null, tier: 1, topRank: null },
  { title: "Wake Up and Open Your Eyes", author: "Clay McLeod Chapman", pageCount: 320, genre: "Horror", publicationDate: "2025", description: "A man whose family members have become silent, staring, and monstrously violent after watching a specific TV channel must figure out what is happening before it reaches him.", series: null, tier: 1, topRank: null },

  // Ryan Graudin (3)
  { title: "Wolf by Wolf", author: "Ryan Graudin", pageCount: 400, genre: "Young Adult", publicationDate: "2015", description: "The first Wolf by Wolf novel: in an alternate history where the Axis won WWII, a concentration camp survivor with shape-shifting powers plans to assassinate Hitler at a cross-continental motorcycle race.", series: { name: "Wolf by Wolf", order: 1, total: 2 }, tier: 1, topRank: null },
  { title: "Blood for Blood", author: "Ryan Graudin", pageCount: 496, genre: "Young Adult", publicationDate: "2016", description: "Wolf by Wolf #2: Yael and her allies flee the wreckage of her failed assassination and lead the resistance against the Third Reich.", series: { name: "Wolf by Wolf", order: 2, total: 2 }, tier: 1, topRank: null },
  { title: "Invictus", author: "Ryan Graudin", pageCount: 464, genre: "Young Adult", publicationDate: "2017", description: "A time-traveling teenage thief and his crew steal artifacts from doomed moments in history — until one heist drops them into an even greater paradox.", series: null, tier: 1, topRank: null },
];

// ── REC LIBRARY (new authors) ────────────────────────────────────────────
const REC_LIBRARY_ADDITIONS = [
  // Rob J. Hayes (4)
  { title: "Where Loyalties Lie", author: "Rob J. Hayes", pageCount: 384, genre: "Fantasy", publicationDate: "2017", description: "The first Best Laid Plans novel: a pirate king with a dark past tries to unite the pirates of the Pirate Isles into a single fleet — before the three kingdoms destroy them all.", series: { name: "Best Laid Plans", order: 1, total: 2 }, tier: 1, topRank: null },
  { title: "The Heresy Within", author: "Rob J. Hayes", pageCount: 416, genre: "Fantasy", publicationDate: "2013", description: "The first Ties That Bind novel: three characters — an aging inquisitor, a necromantic apprentice, and a mercenary captain — converge on a grimdark continent's darkest secret.", series: { name: "The Ties That Bind", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Never Die", author: "Rob J. Hayes", pageCount: 320, genre: "Fantasy", publicationDate: "2018", description: "Hayes's Asian-inspired standalone: a dying samurai is hired by a boy to gather five fallen heroes from across the land — and then kill a god.", series: null, tier: 1, topRank: null },
  { title: "Along the Razor's Edge", author: "Rob J. Hayes", pageCount: 432, genre: "Fantasy", publicationDate: "2020", description: "The first War Eternal novel: an enslaved girl with forbidden magical talent orchestrates a prison rebellion that will shape the rest of her life.", series: { name: "War Eternal", order: 1, total: 6 }, tier: 1, topRank: null },

  // Dyrk Ashton (3)
  { title: "Paternus: Rise of Gods", author: "Dyrk Ashton", pageCount: 528, genre: "Fantasy", publicationDate: "2016", description: "The first Paternus Trilogy novel: every god and monster from every world mythology is real, and they are secretly fighting a centuries-long war hidden beneath modern Ohio.", series: { name: "Paternus Trilogy", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Paternus: Wrath of Gods", author: "Dyrk Ashton", pageCount: 544, genre: "Fantasy", publicationDate: "2018", description: "Paternus Trilogy #2: the hidden gods and their chosen humans flee across the globe as the Firstborn tear away the last barriers between mythology and reality.", series: { name: "Paternus Trilogy", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Paternus: War of Gods", author: "Dyrk Ashton", pageCount: 640, genre: "Fantasy", publicationDate: "2020", description: "Paternus Trilogy #3: the final confrontation between the hidden pantheon and the Asura — a war fought across the entire scope of human myth.", series: { name: "Paternus Trilogy", order: 3, total: 3 }, tier: 1, topRank: null },

  // Foz Meadows (3)
  { title: "An Accident of Stars", author: "Foz Meadows", pageCount: 432, genre: "Fantasy", publicationDate: "2016", description: "The first Manifold Worlds novel: a troubled Australian teenager accidentally travels through a portal to a matriarchal polyamorous kingdom — and is drawn into its political crisis.", series: { name: "Manifold Worlds", order: 1, total: 2 }, tier: 1, topRank: null },
  { title: "A Tyranny of Queens", author: "Foz Meadows", pageCount: 480, genre: "Fantasy", publicationDate: "2017", description: "Manifold Worlds #2: Saffron must adjust to life back on Earth while the empire she helped save in Kena tears itself apart.", series: { name: "Manifold Worlds", order: 2, total: 2 }, tier: 1, topRank: null },
  { title: "A Strange and Stubborn Endurance", author: "Foz Meadows", pageCount: 560, genre: "Fantasy", publicationDate: "2022", description: "Meadows's m/m romance fantasy: a young noble diplomat marries into a rival kingdom's royal family — and must survive a web of courtly intrigue and personal trauma.", series: null, tier: 1, topRank: null },

  // Benjamin Percy (4)
  { title: "The Dead Lands", author: "Benjamin Percy", pageCount: 416, genre: "Sci-Fi", publicationDate: "2015", description: "Percy's post-apocalyptic western: 150 years after a pandemic and nuclear war, a survivor named Lewis leads an expedition out of walled St. Louis into the American interior.", series: null, tier: 1, topRank: null },
  { title: "Red Moon", author: "Benjamin Percy", pageCount: 544, genre: "Horror", publicationDate: "2013", description: "An alternate-world America where lycanthropy is a political identity: a teenage werewolf, a young woman with prosthetic legs, and an ambitious politician confront a looming war.", series: null, tier: 1, topRank: null },
  { title: "The Dark Net", author: "Benjamin Percy", pageCount: 272, genre: "Horror", publicationDate: "2017", description: "A 12-year-old blind girl who has just received experimental implants that restore her sight begins to see something else — a demonic force crawling out of the internet.", series: null, tier: 1, topRank: null },
  { title: "The Ninth Metal", author: "Benjamin Percy", pageCount: 304, genre: "Sci-Fi", publicationDate: "2021", description: "The first Comet Cycle novel: a meteor shower leaves a powerful new metal called 'omnimetal' embedded across Minnesota — and a mining boomtown is born around it.", series: { name: "Comet Cycle", order: 1, total: 3 }, tier: 1, topRank: null },

  // Andrea Hairston (3)
  { title: "Redwood and Wildfire", author: "Andrea Hairston", pageCount: 400, genre: "Historical Fiction", publicationDate: "2011", description: "Hairston's Tiptree-winning novel: a hoodoo conjure woman and a Seminole-Irish magic man travel from 1898 Georgia to Chicago and then to Hollywood — the early American entertainment industry through Black and Indigenous eyes.", series: null, tier: 1, topRank: null },
  { title: "Will Do Magic for Small Change", author: "Andrea Hairston", pageCount: 416, genre: "Fantasy", publicationDate: "2016", description: "In 1986 Pittsburgh, a teenage girl inherits a magical manuscript that tells the story of a shape-shifting extra-dimensional being traveling through 19th-century Dahomey.", series: null, tier: 1, topRank: null },
  { title: "Master of Poisons", author: "Andrea Hairston", pageCount: 448, genre: "Fantasy", publicationDate: "2020", description: "Hairston's ecological fantasy: in a dying African-inspired continent, a Master of Poisons travels with a young rebel to find the cause of the plague consuming the land.", series: null, tier: 1, topRank: null },

  // Nicky Drayden (3)
  { title: "The Prey of Gods", author: "Nicky Drayden", pageCount: 400, genre: "Sci-Fi", publicationDate: "2017", description: "Drayden's debut: a near-future South Africa where a drug turns the addicted into gods, a teen robotics prodigy, a pop-star politician, and a hidden entity all collide.", series: null, tier: 1, topRank: null },
  { title: "Temper", author: "Nicky Drayden", pageCount: 400, genre: "Sci-Fi", publicationDate: "2018", description: "In an alternate-Earth society where twins are ranked by the virtues and vices they were born with, a pair of brothers discovers their imbalance is part of an ancient war.", series: null, tier: 1, topRank: null },
  { title: "Escaping Exodus", author: "Nicky Drayden", pageCount: 320, genre: "Sci-Fi", publicationDate: "2019", description: "Humanity's survivors live inside massive bioengineered space creatures — and the young heir to a dying people must decide whether to defy her culture to save the beast they are killing.", series: null, tier: 1, topRank: null },

  // Olivia Atwater (3)
  { title: "Half a Soul", author: "Olivia Atwater", pageCount: 320, genre: "Romance", publicationDate: "2020", description: "The first Regency Faerie Tales novel: a young Englishwoman cursed by a faerie lord as a child has only half a soul — until a disreputable magician decides to help her reclaim it.", series: { name: "Regency Faerie Tales", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Ten Thousand Stitches", author: "Olivia Atwater", pageCount: 320, genre: "Romance", publicationDate: "2022", description: "Regency Faerie Tales #2: a maid in a Regency English household embroiders handkerchiefs to trap a faerie lord in a marriage bargain.", series: { name: "Regency Faerie Tales", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Longshadow", author: "Olivia Atwater", pageCount: 368, genre: "Romance", publicationDate: "2022", description: "Regency Faerie Tales #3: a young woman with faerie-tainted shadow magic investigates a series of deaths in Regency London and encounters both fae and men who would destroy her.", series: { name: "Regency Faerie Tales", order: 3, total: 3 }, tier: 1, topRank: null },

  // Nicola Griffith (3)
  { title: "Ammonite", author: "Nicola Griffith", pageCount: 400, genre: "Sci-Fi", publicationDate: "1993", description: "Griffith's debut: an anthropologist is sent to a colony world where a virus killed all the men generations ago — and the women have developed their own unique civilization.", series: null, tier: 1, topRank: null },
  { title: "Slow River", author: "Nicola Griffith", pageCount: 352, genre: "Sci-Fi", publicationDate: "1995", description: "Griffith's Nebula-winning near-future novel: a corporate heiress, kidnapped and left for dead, builds a new identity working at a sewage-treatment plant in a Northern English city.", series: null, tier: 1, topRank: null },
  { title: "Hild", author: "Nicola Griffith", pageCount: 560, genre: "Historical Fiction", publicationDate: "2013", description: "Griffith's masterwork: the early life of Saint Hilda of Whitby, born in 614 AD to a dispossessed royal family and raised to serve her uncle the king of Northumbria as a seer.", series: null, tier: 1, topRank: null },

  // Molly Tanzer (3)
  { title: "Creatures of Will and Temper", author: "Molly Tanzer", pageCount: 368, genre: "Horror", publicationDate: "2017", description: "Tanzer's Victorian-inspired reimagining of The Picture of Dorian Gray: two sisters arriving in 1880s London are drawn into a secret society of demon-bonded aesthetes.", series: { name: "Diabolist's Library", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Creatures of Want and Ruin", author: "Molly Tanzer", pageCount: 384, genre: "Horror", publicationDate: "2018", description: "Diabolist's Library #2: in 1920s Long Island, a bootlegger discovers the liquor she's selling contains something that is making its drinkers murderous.", series: { name: "Diabolist's Library", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Vermilion", author: "Molly Tanzer", pageCount: 352, genre: "Fantasy", publicationDate: "2015", description: "A Chinese-American gunslinger and psychopomp in the 1870s American West tries to rescue missing Chinese immigrants from a mountain sanatorium run by something inhuman.", series: null, tier: 1, topRank: null },

  // Melissa F. Olson (3)
  { title: "Dead Spots", author: "Melissa F. Olson", pageCount: 288, genre: "Fantasy", publicationDate: "2012", description: "The first Scarlett Bernard novel: a Los Angeles 'null' whose presence cancels supernatural abilities gets hired to clean up after supernatural crimes before the human police find them.", series: { name: "Scarlett Bernard", order: 1, total: 6 }, tier: 1, topRank: null },
  { title: "Trail of Dead", author: "Melissa F. Olson", pageCount: 304, genre: "Fantasy", publicationDate: "2013", description: "Scarlett Bernard #2: Scarlett's investigation of a series of supernatural murders leads her to Colorado and a coven of witches with their own agenda.", series: { name: "Scarlett Bernard", order: 2, total: 6 }, tier: 1, topRank: null },
  { title: "Hunter's Trail", author: "Melissa F. Olson", pageCount: 288, genre: "Fantasy", publicationDate: "2014", description: "Scarlett Bernard #3: Scarlett is hired to hunt a newly-made werewolf before the full moon — but as usual, nothing in the LA supernatural world is what it seems.", series: { name: "Scarlett Bernard", order: 3, total: 6 }, tier: 1, topRank: null },

  // Jonathan Auxier (3)
  { title: "The Night Gardener", author: "Jonathan Auxier", pageCount: 368, genre: "Young Adult", publicationDate: "2014", description: "Two Irish orphans take jobs as servants at a Victorian English manor haunted by a mysterious night gardener — and by a tree that grants wishes at a terrible price.", series: null, tier: 1, topRank: null },
  { title: "Peter Nimble and His Fantastic Eyes", author: "Jonathan Auxier", pageCount: 400, genre: "Young Adult", publicationDate: "2011", description: "Auxier's debut: a blind ten-year-old thief receives a magical box containing three pairs of eyes and is recruited to save a missing kingdom.", series: { name: "Peter Nimble", order: 1, total: 2 }, tier: 1, topRank: null },
  { title: "Sweep", author: "Jonathan Auxier", pageCount: 368, genre: "Young Adult", publicationDate: "2018", description: "Auxier's tale of a Victorian chimney sweep girl and her golem companion — a creature born from ash — fighting the cruel master who owns them both.", series: null, tier: 1, topRank: null },

  // Adam Gidwitz (3)
  { title: "A Tale Dark and Grimm", author: "Adam Gidwitz", pageCount: 272, genre: "Young Adult", publicationDate: "2010", description: "Gidwitz's retelling of the Grimm brothers' darkest fairy tales: Hansel and Gretel are the protagonists of eight very un-sanitized stories from the original collection.", series: { name: "A Tale Dark and Grimm", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "The Inquisitor's Tale", author: "Adam Gidwitz", pageCount: 368, genre: "Young Adult", publicationDate: "2016", description: "Gidwitz's Newbery Honor medieval epic: a group of travelers at a French inn in 1242 tell the linked story of three magical children on the run from the Inquisition.", series: null, tier: 1, topRank: null },
  { title: "In a Glass Grimmly", author: "Adam Gidwitz", pageCount: 336, genre: "Young Adult", publicationDate: "2012", description: "A Tale Dark and Grimm #2: Jack and Jill escape their own fairy-tale origins and journey through a second string of gruesome Grimm stories.", series: { name: "A Tale Dark and Grimm", order: 2, total: 3 }, tier: 1, topRank: null },

  // William Ritter (4)
  { title: "Jackaby", author: "William Ritter", pageCount: 304, genre: "Young Adult", publicationDate: "2014", description: "The first Jackaby novel: a young governess in 1892 New England becomes the assistant to an eccentric investigator who can see the supernatural, and hunts a serial-killing shapeshifter.", series: { name: "Jackaby", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "Beastly Bones", author: "William Ritter", pageCount: 304, genre: "Young Adult", publicationDate: "2015", description: "Jackaby #2: Abigail Rook and R.F. Jackaby investigate a series of bizarre murders in the Connecticut countryside that appear to involve a living dinosaur.", series: { name: "Jackaby", order: 2, total: 4 }, tier: 1, topRank: null },
  { title: "Ghostly Echoes", author: "William Ritter", pageCount: 336, genre: "Young Adult", publicationDate: "2016", description: "Jackaby #3: a decade-old murder case returns to haunt Jenny — the resident ghost at Jackaby's — and the Jackaby team must investigate her own death.", series: { name: "Jackaby", order: 3, total: 4 }, tier: 1, topRank: null },
  { title: "The Dire King", author: "William Ritter", pageCount: 336, genre: "Young Adult", publicationDate: "2017", description: "Jackaby #4: the final confrontation as the ancient creature known as the Dire King prepares to break the walls between the human and magical worlds.", series: { name: "Jackaby", order: 4, total: 4 }, tier: 1, topRank: null },

  // Usman T. Malik (2)
  { title: "The Pauper Prince and the Eucalyptus Jinn", author: "Usman T. Malik", pageCount: 96, genre: "Fantasy", publicationDate: "2015", description: "Malik's World Fantasy Award-nominated novella: a Pakistani-American physicist investigates his grandfather's claims about a jinn-haunted mango grove in Punjab.", series: null, tier: 1, topRank: null },
  { title: "Midnight Doorways: Fables from Pakistan", author: "Usman T. Malik", pageCount: 240, genre: "Fantasy", publicationDate: "2021", description: "Malik's first collection: seven literary horror and fantasy stories drawing on Sufi mysticism, Pakistani folklore, and the geopolitical tensions of South Asia.", series: null, tier: 1, topRank: null },

  // Daisy Johnson (3)
  { title: "Everything Under", author: "Daisy Johnson", pageCount: 272, genre: "Fiction", publicationDate: "2018", description: "Johnson's Booker-shortlisted debut: a lexicographer reunites with her estranged mother while returning to the Oxford canals of her childhood and a monster called the Bonak.", series: null, tier: 1, topRank: null },
  { title: "Sisters", author: "Daisy Johnson", pageCount: 224, genre: "Horror", publicationDate: "2020", description: "Two teenage sisters and their mother move to a desolate house on the North York moors after a school incident — and their relationship begins collapsing in uncanny ways.", series: null, tier: 1, topRank: null },
  { title: "Fen", author: "Daisy Johnson", pageCount: 208, genre: "Fiction", publicationDate: "2016", description: "Johnson's debut story collection: linked tales of women in the Fenlands of eastern England — haunted, hungering, and thinly separated from the land itself.", series: null, tier: 1, topRank: null },

  // Caroline Kepnes (4)
  { title: "You", author: "Caroline Kepnes", pageCount: 432, genre: "Thriller", publicationDate: "2014", description: "Kepnes's debut: a New York bookstore clerk named Joe becomes obsessed with a female customer and narrates his increasingly disturbing stalker campaign in second person.", series: { name: "You", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "Hidden Bodies", author: "Caroline Kepnes", pageCount: 448, genre: "Thriller", publicationDate: "2016", description: "You #2: Joe Goldberg has relocated from New York to Los Angeles to escape his past — and has to manage a whole new set of people he cannot help but want to kill.", series: { name: "You", order: 2, total: 5 }, tier: 1, topRank: null },
  { title: "Providence", author: "Caroline Kepnes", pageCount: 384, genre: "Thriller", publicationDate: "2018", description: "Kepnes's standalone: a teenage boy kidnapped by a Lovecraft-obsessed stranger in Rhode Island emerges years later with an inexplicable and dangerous physical power.", series: null, tier: 1, topRank: null },
  { title: "You Love Me", author: "Caroline Kepnes", pageCount: 416, genre: "Thriller", publicationDate: "2021", description: "You #3: Joe has moved to a quiet Pacific Northwest island and fallen for a librarian — but even small islands are not quiet enough to hide Joe's instincts.", series: { name: "You", order: 3, total: 5 }, tier: 1, topRank: null },

  // Kathe Koja (3)
  { title: "The Cipher", author: "Kathe Koja", pageCount: 304, genre: "Horror", publicationDate: "1991", description: "Koja's debut: two Detroit slackers discover a mysterious black hole in their apartment building's storage room that can reshape any matter placed inside it.", series: null, tier: 1, topRank: null },
  { title: "Skin", author: "Kathe Koja", pageCount: 352, genre: "Horror", publicationDate: "1993", description: "A performance-art collective in Detroit begins using body modification and metal sculpture as a medium — and the art begins doing things the artists did not intend.", series: null, tier: 1, topRank: null },
  { title: "Bad Brains", author: "Kathe Koja", pageCount: 320, genre: "Horror", publicationDate: "1992", description: "A man recovering from a head injury begins to see a metallic presence in his vision — and finds it is feeding on him.", series: null, tier: 1, topRank: null },

  // Gemma Files (3)
  { title: "Experimental Film", author: "Gemma Files", pageCount: 352, genre: "Horror", publicationDate: "2015", description: "Files's Shirley Jackson Award-winning novel: a Toronto film critic investigating a forgotten Canadian experimental filmmaker discovers the filmmaker's last project was literally dangerous.", series: null, tier: 1, topRank: null },
  { title: "A Book of Tongues", author: "Gemma Files", pageCount: 352, genre: "Fantasy", publicationDate: "2010", description: "The first Hexslinger novel: a Pinkerton agent infiltrates a gang of supernatural outlaws in the post-Civil War West and is drawn into Aztec blood magic.", series: { name: "Hexslinger", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "In the House of the Worm", author: "Gemma Files", pageCount: 240, genre: "Horror", publicationDate: "2023", description: "Files's collection of linked cosmic-horror novellas set in a Toronto haunted by a dying cult's lingering god.", series: null, tier: 1, topRank: null },

  // A.G. Slatter (3)
  { title: "All the Murmuring Bones", author: "A.G. Slatter", pageCount: 384, genre: "Fantasy", publicationDate: "2021", description: "Slatter's Shirley Jackson-winning gothic: a young woman from a fallen coastal family discovers her ancestors bargained with the merpeople in her grandmother's stories.", series: { name: "Sourdough", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "The Path of Thorns", author: "A.G. Slatter", pageCount: 400, genre: "Fantasy", publicationDate: "2022", description: "Sourdough #2: a governess with a secret family history arrives at a gloomy estate in the Sourdough universe and begins a covert mission of revenge.", series: { name: "Sourdough", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "The Briar Book of the Dead", author: "A.G. Slatter", pageCount: 368, genre: "Fantasy", publicationDate: "2024", description: "Sourdough #3: a young witch in a forest community with its own death-adjacent magic confronts an outside force threatening to destroy everything her people have built.", series: { name: "Sourdough", order: 3, total: 3 }, tier: 1, topRank: null },

  // Kirsty Logan (3)
  { title: "The Gracekeepers", author: "Kirsty Logan", pageCount: 304, genre: "Fantasy", publicationDate: "2015", description: "Logan's debut: in a world mostly covered by water, a floating circus and a lonely island gracekeeper encounter each other and find their fates intertwined.", series: null, tier: 1, topRank: null },
  { title: "The Gloaming", author: "Kirsty Logan", pageCount: 320, genre: "Fantasy", publicationDate: "2018", description: "On a Scottish island where people turn to stone when they die, a grieving family tries to imagine how they will say goodbye to each other.", series: null, tier: 1, topRank: null },
  { title: "Things We Say in the Dark", author: "Kirsty Logan", pageCount: 240, genre: "Horror", publicationDate: "2019", description: "Logan's story collection: twenty tales of women navigating haunted houses, frozen marriages, and the domestic terrors of everyday Scotland.", series: null, tier: 1, topRank: null },

  // Ramez Naam (3)
  { title: "Nexus", author: "Ramez Naam", pageCount: 460, genre: "Sci-Fi", publicationDate: "2012", description: "The first Nexus novel: a graduate student develops a drug called Nexus that networks human minds — and attracts the attention of the US Emerging Risks Directorate.", series: { name: "Nexus", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Crux", author: "Ramez Naam", pageCount: 560, genre: "Sci-Fi", publicationDate: "2013", description: "Nexus #2: with Nexus now illegal but still spreading, its creator Kade is hunted by a Buddhist monk who may be the first child born from Nexus minds.", series: { name: "Nexus", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Apex", author: "Ramez Naam", pageCount: 560, genre: "Sci-Fi", publicationDate: "2015", description: "Nexus #3: the conclusion as humanity fractures into factions over the posthuman future — and Nexus becomes the core of a new kind of civilization.", series: { name: "Nexus", order: 3, total: 3 }, tier: 1, topRank: null },

  // C.S. Pacat (4)
  { title: "Captive Prince", author: "C.S. Pacat", pageCount: 272, genre: "Fantasy", publicationDate: "2013", description: "The first Captive Prince novel: a prince-warrior of one Mediterranean-inspired kingdom is enslaved and given as a gift to the son of his country's invader.", series: { name: "Captive Prince", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Prince's Gambit", author: "C.S. Pacat", pageCount: 400, genre: "Fantasy", publicationDate: "2013", description: "Captive Prince #2: Damen and Laurent's uneasy alliance is tested as they lead Laurent's troops through enemy territory to the border fortress of Charcy.", series: { name: "Captive Prince", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Kings Rising", author: "C.S. Pacat", pageCount: 384, genre: "Fantasy", publicationDate: "2016", description: "Captive Prince #3: the final confrontation as Damen must choose between his own crown and the man he has come to love across lines of war and betrayal.", series: { name: "Captive Prince", order: 3, total: 3 }, tier: 1, topRank: null },
  { title: "Dark Rise", author: "C.S. Pacat", pageCount: 480, genre: "Young Adult", publicationDate: "2021", description: "The first Dark Rise novel: a young London dockworker discovers he is the reincarnation of an ancient champion in a centuries-spanning war between Light and Dark.", series: { name: "Dark Rise", order: 1, total: 2 }, tier: 1, topRank: null },
];

// ── Apply deletions to PRIMARY ──
const data = JSON.parse(fs.readFileSync(CATALOG, "utf8"));
let books = Array.isArray(data) ? data : (data.books || Object.values(data).find(v => Array.isArray(v)));
const beforeP = books.length;

const toDelete = new Set();
for (const d of DELETE) {
  const idx = books.findIndex(b => b.title === d.title && b.author === d.author);
  if (idx !== -1) {
    toDelete.add(idx);
    console.log(`  ✓ removing dupe: "${d.title}" — ${d.author}`);
  }
}
books = books.filter((_, i) => !toDelete.has(i));

const existingKeys = new Set(books.map(b => (b.title + "|" + b.author).toLowerCase()));
const primaryDupes = [];
const primaryAdd = [];
for (const a of PRIMARY_ADDITIONS) {
  const key = (a.title + "|" + a.author).toLowerCase();
  if (existingKeys.has(key)) primaryDupes.push(a);
  else { primaryAdd.push(a); existingKeys.add(key); }
}
if (primaryDupes.length > 0) console.log(`⚠ Skipping ${primaryDupes.length} primary duplicates`);
const nextBooks = books.concat(primaryAdd);
fs.writeFileSync(CATALOG, JSON.stringify(nextBooks));
console.log(`\nPRIMARY: +${primaryAdd.length} -${toDelete.size}, ${beforeP} → ${nextBooks.length}`);

// ── Apply REC LIBRARY ──
let recBooks = [];
if (fs.existsSync(REC_LIBRARY)) {
  const raw = JSON.parse(fs.readFileSync(REC_LIBRARY, "utf8"));
  recBooks = Array.isArray(raw) ? raw : (raw.books || []);
}
const beforeR = recBooks.length;

const recKeys = new Set(recBooks.map(b => (b.title + "|" + b.author).toLowerCase()));
const recDupes = [];
const recAdd = [];
for (const a of REC_LIBRARY_ADDITIONS) {
  const key = (a.title + "|" + a.author).toLowerCase();
  if (recKeys.has(key)) recDupes.push(a);
  else { recAdd.push(a); recKeys.add(key); }
}
if (recDupes.length > 0) console.log(`⚠ Skipping ${recDupes.length} rec library duplicates`);
const nextRec = recBooks.concat(recAdd);
fs.writeFileSync(REC_LIBRARY, JSON.stringify(nextRec));
console.log(`REC LIBRARY: added ${recAdd.length} books, ${beforeR} → ${nextRec.length}`);

const statCat = fs.statSync(CATALOG);
const statRec = fs.statSync(REC_LIBRARY);
console.log(`\nbook-data.json: ${(statCat.size / 1024 / 1024).toFixed(2)} MB`);
console.log(`rec-library.json: ${(statRec.size / 1024).toFixed(1)} KB`);
