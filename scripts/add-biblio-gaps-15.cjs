const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

// ── PRIMARY (existing authors) ────────────────────────────────────────────
const PRIMARY_ADDITIONS = [
  // Nalini Singh (3)
  { title: "Bonds of Justice", author: "Nalini Singh", pageCount: 368, genre: "Romance", publicationDate: "2010", description: "Psy-Changeling #8: a traumatized human cop and a powerful J-Psy detective work a joint case that draws them into the web between three species.", series: { name: "Psy-Changeling", order: 8, total: 21 }, tier: 1, topRank: null },
  { title: "Play of Passion", author: "Nalini Singh", pageCount: 368, genre: "Romance", publicationDate: "2010", description: "Psy-Changeling #9: SnowDancer lieutenant Indigo Riviere finds herself unable to resist a younger, more dominant wolf she has been ordered to command.", series: { name: "Psy-Changeling", order: 9, total: 21 }, tier: 1, topRank: null },
  { title: "Angels' Blood", author: "Nalini Singh", pageCount: 384, genre: "Fantasy", publicationDate: "2009", description: "The first Guild Hunter novel: vampire hunter Elena Deveraux is hired by the archangel Raphael to track down an angel who has gone murderously insane.", series: { name: "Guild Hunter", order: 1, total: 16 }, tier: 1, topRank: null },

  // Elizabeth Bear (3)
  { title: "Hammered", author: "Elizabeth Bear", pageCount: 336, genre: "Sci-Fi", publicationDate: "2005", description: "Bear's debut: a near-future French-Canadian veteran with cybernetic enhancements becomes a pawn in a Cold War between Canada and a collapsed United States.", series: { name: "Jenny Casey", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Ancestral Night", author: "Elizabeth Bear", pageCount: 512, genre: "Sci-Fi", publicationDate: "2019", description: "A salvage ship crew investigating a derelict finds itself caught between a cryptic AI, an ancient alien artifact, and a fleet of anarchist pirates.", series: { name: "White Space", order: 1, total: 2 }, tier: 1, topRank: null },
  { title: "Karen Memory", author: "Elizabeth Bear", pageCount: 368, genre: "Fantasy", publicationDate: "2015", description: "Bear's steampunk western: a seamstress (prostitute) at a high-end Seattle brothel in an alternate 19th century helps hide a fugitive and tangles with a mesmerist serial killer.", series: null, tier: 1, topRank: null },

  // Richard Laymon (4)
  { title: "The Woods Are Dark", author: "Richard Laymon", pageCount: 272, genre: "Horror", publicationDate: "1981", description: "A family of vacationers stops at a small California town where the townsfolk sacrifice drifters to a backwoods cannibal clan — Laymon's notorious early novel.", series: null, tier: 1, topRank: null },
  { title: "The Beast House", author: "Richard Laymon", pageCount: 320, genre: "Horror", publicationDate: "1986", description: "A guided tour of a Malcasa Point horror-tourism house goes wrong when the things that live under the floorboards decide it's been too long.", series: { name: "Beast House Chronicles", order: 2, total: 4 }, tier: 1, topRank: null },
  { title: "Resurrection Dreams", author: "Richard Laymon", pageCount: 400, genre: "Horror", publicationDate: "1988", description: "A medical-school washout returns to his hometown determined to prove he can raise the dead — using his high school crush's freshly deceased body.", series: null, tier: 1, topRank: null },
  { title: "Endless Night", author: "Richard Laymon", pageCount: 432, genre: "Horror", publicationDate: "1993", description: "Two teenage girls become the only witnesses to a group of killers slaughtering a house full of partygoers — and are now being hunted through one long night.", series: null, tier: 1, topRank: null },

  // C.S. Friedman (3)
  { title: "In Conquest Born", author: "C.S. Friedman", pageCount: 672, genre: "Sci-Fi", publicationDate: "1986", description: "Friedman's debut: two psychically gifted enemies from warring interstellar civilizations have been destined to destroy each other since before they were born.", series: null, tier: 1, topRank: null },
  { title: "The Madness Season", author: "C.S. Friedman", pageCount: 432, genre: "Sci-Fi", publicationDate: "1990", description: "An ancient immortal hiding on an occupied Earth four centuries after alien conquest is forced to reveal himself — and joins the resistance he never wanted to lead.", series: null, tier: 1, topRank: null },
  { title: "Feast of Souls", author: "C.S. Friedman", pageCount: 480, genre: "Fantasy", publicationDate: "2007", description: "The first Magister Trilogy novel: in a world where every spell drains the caster's life force, a group of immortal male sorcerers have found a way to steal others' lives instead.", series: { name: "Magister Trilogy", order: 1, total: 3 }, tier: 1, topRank: null },

  // Yoon Ha Lee (2)
  { title: "Dragon Pearl", author: "Yoon Ha Lee", pageCount: 336, genre: "Young Adult", publicationDate: "2019", description: "A thirteen-year-old fox-spirit girl runs away from her Korean-inspired colony world to find her missing brother and clear his name — Lee's middle-grade space fantasy.", series: null, tier: 1, topRank: null },
  { title: "Hexarchate Stories", author: "Yoon Ha Lee", pageCount: 432, genre: "Sci-Fi", publicationDate: "2019", description: "A collection of Machineries of Empire-universe stories, including the novella 'Glass Cannon' that continues the story of Cheris and Jedao after Revenant Gun.", series: null, tier: 1, topRank: null },

  // Aliette de Bodard (2)
  { title: "Servant of the Underworld", author: "Aliette de Bodard", pageCount: 416, genre: "Fantasy", publicationDate: "2010", description: "The first Obsidian and Blood novel: in a magical-realist Aztec Empire, high priest Acatl investigates the disappearance of a priestess whose blood has been spilled.", series: { name: "Obsidian and Blood", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "In the Vanishers' Palace", author: "Aliette de Bodard", pageCount: 160, genre: "Fantasy", publicationDate: "2018", description: "A post-apocalyptic retelling of Beauty and the Beast in a Vietnamese-inspired world: a young scholar is given to a dragon as payment for a magical debt.", series: null, tier: 1, topRank: null },

  // M. John Harrison (2)
  { title: "The Sunken Land Begins to Rise Again", author: "M. John Harrison", pageCount: 240, genre: "Fiction", publicationDate: "2020", description: "Two lonely Londoners — a middle-aged man and a middle-aged woman — drift toward each other as something ancient begins to resurface beneath England.", series: null, tier: 1, topRank: null },
  { title: "The Course of the Heart", author: "M. John Harrison", pageCount: 240, genre: "Fantasy", publicationDate: "1992", description: "A dark, literary novel about three former students who once performed a dangerous occult experiment and now live with its slow-motion consequences.", series: null, tier: 1, topRank: null },

  // Ken Liu (1)
  { title: "The Hidden Girl and Other Stories", author: "Ken Liu", pageCount: 432, genre: "Sci-Fi", publicationDate: "2020", description: "Liu's second story collection: nineteen tales spanning digital immortality, mathematical espionage, and Chinese folk magic — the range of his short fiction.", series: null, tier: 1, topRank: null },

  // Jo Walton (2)
  { title: "Farthing", author: "Jo Walton", pageCount: 320, genre: "Mystery", publicationDate: "2006", description: "The first Small Change novel: in an alternate 1949 Britain that made peace with Hitler, a Scotland Yard inspector investigates a country-house murder that threatens the fascist status quo.", series: { name: "Small Change", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Tooth and Claw", author: "Jo Walton", pageCount: 320, genre: "Fantasy", publicationDate: "2003", description: "Walton's Victorian drawing-room novel with dragons: when the patriarch dies, his children must navigate inheritance, love, and literal dragon-eat-dragon society.", series: null, tier: 1, topRank: null },

  // Catherynne M. Valente (3)
  { title: "Radiance", author: "Catherynne M. Valente", pageCount: 432, genre: "Sci-Fi", publicationDate: "2015", description: "Valente's decopunk space opera: a filmmaker searches for her missing daughter across an alternate solar system where Edison's lock on film technology has left every planet in the silent era.", series: null, tier: 1, topRank: null },
  { title: "Palimpsest", author: "Catherynne M. Valente", pageCount: 384, genre: "Fantasy", publicationDate: "2009", description: "A mysterious tattoo-like mark grants access to Palimpsest, a city that can only be visited in dreams — and only after sleeping with someone else marked.", series: null, tier: 1, topRank: null },
  { title: "In the Cities of Coin and Spice", author: "Catherynne M. Valente", pageCount: 528, genre: "Fantasy", publicationDate: "2007", description: "The second Orphan's Tales volume: continuing the nested Arabian-Nights-style storytelling framework begun in In the Night Garden.", series: { name: "The Orphan's Tales", order: 2, total: 2 }, tier: 1, topRank: null },

  // Helen Oyeyemi (1)
  { title: "The Icarus Girl", author: "Helen Oyeyemi", pageCount: 336, genre: "Fiction", publicationDate: "2005", description: "Oyeyemi's debut, written when she was 18: an eight-year-old English-Nigerian girl visits her mother's homeland and acquires a frightening imaginary friend.", series: null, tier: 1, topRank: null },
];

// ── REC LIBRARY (new authors) ────────────────────────────────────────────
const REC_LIBRARY_ADDITIONS = [
  // Richelle Mead (4)
  { title: "Vampire Academy", author: "Richelle Mead", pageCount: 336, genre: "Young Adult", publicationDate: "2007", description: "The first Vampire Academy novel: half-vampire guardian Rose Hathaway protects her best friend, a royal Moroi princess, at a secret boarding school in rural Montana.", series: { name: "Vampire Academy", order: 1, total: 6 }, tier: 1, topRank: null },
  { title: "Frostbite", author: "Richelle Mead", pageCount: 336, genre: "Young Adult", publicationDate: "2008", description: "Vampire Academy #2: a massive Strigoi attack on a royal family prompts the Moroi to reconsider whether the Academy's isolationist defense strategy is enough.", series: { name: "Vampire Academy", order: 2, total: 6 }, tier: 1, topRank: null },
  { title: "Shadow Kiss", author: "Richelle Mead", pageCount: 448, genre: "Young Adult", publicationDate: "2008", description: "Vampire Academy #3: Rose's near-death experience leaves her haunted by the dead while a Strigoi siege threatens the Academy itself.", series: { name: "Vampire Academy", order: 3, total: 6 }, tier: 1, topRank: null },
  { title: "Succubus Blues", author: "Richelle Mead", pageCount: 368, genre: "Fantasy", publicationDate: "2007", description: "The first Georgina Kincaid novel: a Seattle bookstore manager who is secretly a succubus tries to navigate a forbidden relationship with a famous urban fantasy novelist.", series: { name: "Georgina Kincaid", order: 1, total: 6 }, tier: 1, topRank: null },

  // Chloe Neill (3)
  { title: "Some Girls Bite", author: "Chloe Neill", pageCount: 368, genre: "Fantasy", publicationDate: "2009", description: "The first Chicagoland Vampires novel: a University of Chicago grad student attacked in the quad is turned against her will into a vampire of Cadogan House.", series: { name: "Chicagoland Vampires", order: 1, total: 13 }, tier: 1, topRank: null },
  { title: "Friday Night Bites", author: "Chloe Neill", pageCount: 368, genre: "Fantasy", publicationDate: "2009", description: "Chicagoland Vampires #2: Merit is assigned to investigate shapeshifter movements in Chicago and gets drawn into her old social circle's dangerous secrets.", series: { name: "Chicagoland Vampires", order: 2, total: 13 }, tier: 1, topRank: null },
  { title: "Twice Bitten", author: "Chloe Neill", pageCount: 368, genre: "Fantasy", publicationDate: "2010", description: "Chicagoland Vampires #3: a summit of the North American shapeshifters is threatened by attacks that could plunge the city into supernatural war.", series: { name: "Chicagoland Vampires", order: 3, total: 13 }, tier: 1, topRank: null },

  // Charles de Lint (3)
  { title: "Moonheart", author: "Charles de Lint", pageCount: 448, genre: "Fantasy", publicationDate: "1984", description: "A young Ottawa woman discovers her ancestral home is a gateway between our world and the faerie world of Tamson House — the founding novel of modern urban fantasy.", series: null, tier: 1, topRank: null },
  { title: "The Little Country", author: "Charles de Lint", pageCount: 640, genre: "Fantasy", publicationDate: "1991", description: "A Cornish folk musician discovers an unpublished manuscript by an old children's author and finds that the story inside it may be altering her life.", series: null, tier: 1, topRank: null },
  { title: "Memory and Dream", author: "Charles de Lint", pageCount: 496, genre: "Fantasy", publicationDate: "1994", description: "A painter discovers that the numenlight figures she paints are real — and that the cruel mentor who taught her has been using her to bring dark things across.", series: null, tier: 1, topRank: null },

  // Robert R. McCammon (4)
  { title: "Swan Song", author: "Robert R. McCammon", pageCount: 960, genre: "Horror", publicationDate: "1987", description: "McCammon's post-apocalyptic epic: after a nuclear exchange, a girl with healing powers, a hardened boxer, a vagrant, and a madman move across a ruined America.", series: null, tier: 1, topRank: null },
  { title: "Boy's Life", author: "Robert R. McCammon", pageCount: 624, genre: "Fiction", publicationDate: "1991", description: "McCammon's semi-autobiographical coming-of-age novel set in a 1964 Alabama small town: a boy witnesses a murder that opens him to the magic around his childhood.", series: null, tier: 1, topRank: null },
  { title: "They Thirst", author: "Robert R. McCammon", pageCount: 528, genre: "Horror", publicationDate: "1981", description: "McCammon's early vampire epic: a Los Angeles beset by a growing vampire invasion, told through a dozen characters as the city collapses around them.", series: null, tier: 1, topRank: null },
  { title: "Mine", author: "Robert R. McCammon", pageCount: 512, genre: "Thriller", publicationDate: "1990", description: "A radicalized Weather Underground fugitive kidnaps a newborn baby believing it to be the child she lost years earlier — the mother must cross America to get him back.", series: null, tier: 1, topRank: null },

  // T.E.D. Klein (2)
  { title: "The Ceremonies", author: "T.E.D. Klein", pageCount: 576, genre: "Horror", publicationDate: "1984", description: "Klein's only novel: a literature professor on sabbatical in rural New Jersey unknowingly becomes the catalyst for an ancient rite that will unmake the world.", series: null, tier: 1, topRank: null },
  { title: "Dark Gods", author: "T.E.D. Klein", pageCount: 288, genre: "Horror", publicationDate: "1985", description: "Klein's collection of four long horror novellas — 'Children of the Kingdom,' 'Petey,' 'Black Man With a Horn,' and 'Nadelman's God.'", series: null, tier: 1, topRank: null },

  // Michael McDowell (4)
  { title: "The Elementals", author: "Michael McDowell", pageCount: 352, genre: "Horror", publicationDate: "1981", description: "Three Victorian cottages on an Alabama Gulf beach stand against a dune that is slowly, deliberately, burying one of them — and something is living in the sand.", series: null, tier: 1, topRank: null },
  { title: "Blackwater", author: "Michael McDowell", pageCount: 800, genre: "Horror", publicationDate: "1983", description: "McDowell's six-volume saga of the Caskey family in early 20th-century Alabama, originally published as six paperbacks over five months — Southern Gothic at its most bizarre.", series: null, tier: 1, topRank: null },
  { title: "Cold Moon Over Babylon", author: "Michael McDowell", pageCount: 320, genre: "Horror", publicationDate: "1980", description: "A Florida teenager is murdered in a blueberry grove, and her ghost begins a slow, patient revenge against the family that killed her.", series: null, tier: 1, topRank: null },
  { title: "The Amulet", author: "Michael McDowell", pageCount: 240, genre: "Horror", publicationDate: "1979", description: "McDowell's debut: a cursed amulet passes from hand to hand through a small Alabama town, and anyone who touches it becomes a murderer.", series: null, tier: 1, topRank: null },

  // Adam Nevill (4)
  { title: "The Ritual", author: "Adam Nevill", pageCount: 416, genre: "Horror", publicationDate: "2011", description: "Four old friends on a hiking holiday in the Scandinavian wilderness take a shortcut through an ancient forest and find something waiting that should not exist.", series: null, tier: 1, topRank: null },
  { title: "Last Days", author: "Adam Nevill", pageCount: 560, genre: "Horror", publicationDate: "2012", description: "A documentary filmmaker is hired to investigate the Temple of the Last Days, a 1970s cult whose members all died in a remote Arizona ranch — and whose secrets refuse to die.", series: null, tier: 1, topRank: null },
  { title: "No One Gets Out Alive", author: "Adam Nevill", pageCount: 640, genre: "Horror", publicationDate: "2014", description: "A young woman renting a cheap room in a Birmingham boarding house begins hearing voices in the walls — and realizes the landlord knows exactly what they are.", series: null, tier: 1, topRank: null },
  { title: "Apartment 16", author: "Adam Nevill", pageCount: 432, genre: "Horror", publicationDate: "2010", description: "A sealed London apartment has been empty for 50 years, and when a night porter and an American art student investigate, they find it is the center of something the building cannot contain.", series: null, tier: 1, topRank: null },

  // Simon R. Green (3)
  { title: "Something from the Nightside", author: "Simon R. Green", pageCount: 240, genre: "Fantasy", publicationDate: "2003", description: "The first Nightside novel: a reluctant private eye returns to the hidden London district where time runs wrong and gods walk the streets.", series: { name: "Nightside", order: 1, total: 12 }, tier: 1, topRank: null },
  { title: "Hawk & Fisher", author: "Simon R. Green", pageCount: 320, genre: "Fantasy", publicationDate: "1990", description: "The first Hawk & Fisher novel: two tough married guards in the corrupt city of Haven investigate a locked-room murder at a wizard's election-night party.", series: { name: "Hawk & Fisher", order: 1, total: 8 }, tier: 1, topRank: null },
  { title: "Blue Moon Rising", author: "Simon R. Green", pageCount: 496, genre: "Fantasy", publicationDate: "1991", description: "The first Forest Kingdom novel: the younger prince of a backwater kingdom is sent to fetch a dragon as his rite of passage and winds up with the kingdom's last magical allies.", series: { name: "Forest Kingdom", order: 1, total: 4 }, tier: 1, topRank: null },

  // Steven Brust (4)
  { title: "Jhereg", author: "Steven Brust", pageCount: 240, genre: "Fantasy", publicationDate: "1983", description: "The first Vlad Taltos novel: a human assassin in an empire of sorcerous elves gets a contract that is worth a fortune and will certainly get him killed.", series: { name: "Vlad Taltos", order: 1, total: 16 }, tier: 1, topRank: null },
  { title: "Yendi", author: "Steven Brust", pageCount: 224, genre: "Fantasy", publicationDate: "1984", description: "Vlad Taltos #2 (chronologically first): the young assassin consolidates his Adrilankha criminal territory and meets his future wife during a violent gang war.", series: { name: "Vlad Taltos", order: 2, total: 16 }, tier: 1, topRank: null },
  { title: "Teckla", author: "Steven Brust", pageCount: 224, genre: "Fantasy", publicationDate: "1987", description: "Vlad Taltos #3: Vlad's wife becomes involved with a revolutionary Teckla peasant movement, and Vlad must choose between his wife and his criminal employers.", series: { name: "Vlad Taltos", order: 3, total: 16 }, tier: 1, topRank: null },
  { title: "Taltos", author: "Steven Brust", pageCount: 224, genre: "Fantasy", publicationDate: "1988", description: "Vlad Taltos #4 (prequel): the origin story of the assassin Vlad, his familiar Loiosh, and his journey into the Paths of the Dead.", series: { name: "Vlad Taltos", order: 4, total: 16 }, tier: 1, topRank: null },

  // Mary Gentle (3)
  { title: "Ash: A Secret History", author: "Mary Gentle", pageCount: 1120, genre: "Historical Fiction", publicationDate: "2000", description: "Gentle's alternate-history epic: in 1476 a female mercenary captain fights on the losing side of a forgotten Carthaginian invasion of Europe, narrated in a modern academic frame.", series: null, tier: 1, topRank: null },
  { title: "Grunts!", author: "Mary Gentle", pageCount: 448, genre: "Fantasy", publicationDate: "1992", description: "A dark-comic military fantasy told from the perspective of an orc raiding party that has inherited the armory of a halfling-style Dead Marine Corps.", series: null, tier: 1, topRank: null },
  { title: "Rats and Gargoyles", author: "Mary Gentle", pageCount: 400, genre: "Fantasy", publicationDate: "1990", description: "In a Renaissance-like city ruled by giant rat-people and watched by living gargoyles, a spy and a scholar try to prevent an apocalyptic alchemical working.", series: null, tier: 1, topRank: null },

  // Barbara Hambly (3)
  { title: "Dragonsbane", author: "Barbara Hambly", pageCount: 352, genre: "Fantasy", publicationDate: "1985", description: "A middle-aged lord and his older witch-lover are summoned from their quiet lives to fight a dragon — and discover the dragon is not the real problem.", series: { name: "Winterlands", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "Those Who Hunt the Night", author: "Barbara Hambly", pageCount: 320, genre: "Horror", publicationDate: "1988", description: "A retired Oxford spy is blackmailed by the master vampire of London into investigating who is murdering the city's undead during daylight.", series: { name: "James Asher", order: 1, total: 7 }, tier: 1, topRank: null },
  { title: "The Ladies of Mandrigyn", author: "Barbara Hambly", pageCount: 320, genre: "Fantasy", publicationDate: "1984", description: "The widows of a conquered city hire a mercenary captain to train them as an army to rescue their men — Hambly's early feminist sword-and-sorcery novel.", series: { name: "Sun Wolf and Starhawk", order: 1, total: 3 }, tier: 1, topRank: null },

  // L.E. Modesitt Jr. (4)
  { title: "The Magic of Recluce", author: "L.E. Modesitt Jr.", pageCount: 528, genre: "Fantasy", publicationDate: "1991", description: "The first Recluce novel: a young man on an island where order magic is law is exiled for doubting, and must figure out what kind of magician he really is.", series: { name: "Recluce", order: 1, total: 22 }, tier: 1, topRank: null },
  { title: "The Magic Engineer", author: "L.E. Modesitt Jr.", pageCount: 560, genre: "Fantasy", publicationDate: "1994", description: "A Recluce smith exiled for his unusual techniques builds a military engineering empire on the continent — and clashes with the order magic of his homeland.", series: { name: "Recluce", order: 3, total: 22 }, tier: 1, topRank: null },
  { title: "The White Order", author: "L.E. Modesitt Jr.", pageCount: 528, genre: "Fantasy", publicationDate: "1998", description: "A young scribe's son is discovered to have the talents of a chaos mage and is taken from his family to study in the all-white Empire of Fairhaven.", series: { name: "Recluce", order: 8, total: 22 }, tier: 1, topRank: null },
  { title: "Imager", author: "L.E. Modesitt Jr.", pageCount: 432, genre: "Fantasy", publicationDate: "2009", description: "The first Imager Portfolio novel: a young painter in a magical Italianate city-state discovers he is an 'imager' — capable of shaping reality by visualizing it.", series: { name: "Imager Portfolio", order: 1, total: 12 }, tier: 1, topRank: null },

  // Edgar Rice Burroughs (5)
  { title: "A Princess of Mars", author: "Edgar Rice Burroughs", pageCount: 224, genre: "Sci-Fi", publicationDate: "1912", description: "The first Barsoom novel: a Virginia gentleman mysteriously transported to Mars wins the love of an imperial princess and fights across the red planet's dying civilizations.", series: { name: "Barsoom", order: 1, total: 11 }, tier: 1, topRank: null },
  { title: "Tarzan of the Apes", author: "Edgar Rice Burroughs", pageCount: 320, genre: "Fiction", publicationDate: "1912", description: "The origin of Tarzan: an English lord raised by apes in the African jungle after the mysterious death of his parents — Burroughs's most enduring character.", series: { name: "Tarzan", order: 1, total: 24 }, tier: 1, topRank: null },
  { title: "The Gods of Mars", author: "Edgar Rice Burroughs", pageCount: 240, genre: "Sci-Fi", publicationDate: "1913", description: "Barsoom #2: John Carter returns to Mars and discovers the terrible secret of its religion — the river Iss does not lead to paradise but to cannibalistic predators.", series: { name: "Barsoom", order: 2, total: 11 }, tier: 1, topRank: null },
  { title: "The Warlord of Mars", author: "Edgar Rice Burroughs", pageCount: 224, genre: "Sci-Fi", publicationDate: "1913", description: "Barsoom #3: John Carter pursues his captive wife Dejah Thoris across the black pole of Mars to confront the Therns, the False Gods of Barsoom.", series: { name: "Barsoom", order: 3, total: 11 }, tier: 1, topRank: null },
  { title: "At the Earth's Core", author: "Edgar Rice Burroughs", pageCount: 192, genre: "Sci-Fi", publicationDate: "1914", description: "The first Pellucidar novel: an experimental mechanical mole carries two adventurers five hundred miles into the Earth's crust and out into a prehistoric inner world.", series: { name: "Pellucidar", order: 1, total: 7 }, tier: 1, topRank: null },

  // A. Merritt (3)
  { title: "The Moon Pool", author: "A. Merritt", pageCount: 304, genre: "Fantasy", publicationDate: "1919", description: "An expedition to the Carolines pursues a mysterious force that has been stealing men through a lunar ray in a ruined Micronesian temple — Merritt's landmark weird romance.", series: null, tier: 1, topRank: null },
  { title: "The Ship of Ishtar", author: "A. Merritt", pageCount: 352, genre: "Fantasy", publicationDate: "1924", description: "A New York antiquarian opens a sealed Babylonian block and is transported onto an ancient ship carrying a priestess of Ishtar and a priest of Nergal locked in eternal combat.", series: null, tier: 1, topRank: null },
  { title: "Dwellers in the Mirage", author: "A. Merritt", pageCount: 288, genre: "Fantasy", publicationDate: "1932", description: "Merritt's Alaska adventure: a man with a mysterious past is drawn into a hidden Mongolian civilization worshipping a tentacled horror called Khalk'ru.", series: null, tier: 1, topRank: null },

  // H. Rider Haggard (3)
  { title: "King Solomon's Mines", author: "H. Rider Haggard", pageCount: 320, genre: "Fiction", publicationDate: "1885", description: "The first Allan Quatermain novel and one of the founding texts of the 'lost world' adventure genre: a great-white-hunter leads an expedition into unexplored Africa.", series: { name: "Allan Quatermain", order: 1, total: 18 }, tier: 1, topRank: null },
  { title: "She", author: "H. Rider Haggard", pageCount: 320, genre: "Fantasy", publicationDate: "1887", description: "An English scholar and his foster son journey to a hidden African kingdom ruled by Ayesha, the immortal white queen known as 'She-Who-Must-Be-Obeyed.'", series: null, tier: 1, topRank: null },
  { title: "Allan Quatermain", author: "H. Rider Haggard", pageCount: 320, genre: "Fiction", publicationDate: "1887", description: "The direct sequel to King Solomon's Mines: an aging Quatermain launches one final African expedition and discovers a lost white civilization north of Kenya.", series: { name: "Allan Quatermain", order: 2, total: 18 }, tier: 1, topRank: null },

  // Koushun Takami (1)
  { title: "Battle Royale", author: "Koushun Takami", pageCount: 624, genre: "Fiction", publicationDate: "1999", description: "Takami's Japanese dystopian novel: a class of Japanese ninth-graders is sent to an abandoned island and forced to kill each other as part of an authoritarian government program.", series: null, tier: 1, topRank: null },

  // Adam Roberts (3)
  { title: "Salt", author: "Adam Roberts", pageCount: 256, genre: "Sci-Fi", publicationDate: "2000", description: "Roberts's debut: two colony ships crossing interstellar space to a salt-desert planet diverge politically — and the two landing parties begin a conflict that echoes into the new world.", series: null, tier: 1, topRank: null },
  { title: "On", author: "Adam Roberts", pageCount: 336, genre: "Sci-Fi", publicationDate: "2001", description: "A young climber lives on a vertical world — everyone clings to a vast wall — and a fall can send him past every culture his people have ever known.", series: null, tier: 1, topRank: null },
  { title: "Jack Glass", author: "Adam Roberts", pageCount: 416, genre: "Sci-Fi", publicationDate: "2012", description: "Three locked-room mysteries involving the notorious killer Jack Glass — Roberts's Campbell Award winning homage to Golden Age detective fiction in a future solar system.", series: null, tier: 1, topRank: null },
];

// ── Apply PRIMARY ──
const data = JSON.parse(fs.readFileSync(CATALOG, "utf8"));
const books = Array.isArray(data) ? data : (data.books || Object.values(data).find(v => Array.isArray(v)));
const beforeP = books.length;

const existingKeys = new Set(books.map(b => (b.title + "|" + b.author).toLowerCase()));
const primaryDupes = [];
const primaryAdd = [];
for (const a of PRIMARY_ADDITIONS) {
  const key = (a.title + "|" + a.author).toLowerCase();
  if (existingKeys.has(key)) primaryDupes.push(a);
  else { primaryAdd.push(a); existingKeys.add(key); }
}
if (primaryDupes.length > 0) {
  console.log(`⚠ Skipping ${primaryDupes.length} primary duplicates`);
}
const nextBooks = books.concat(primaryAdd);
fs.writeFileSync(CATALOG, JSON.stringify(nextBooks));
console.log(`PRIMARY: added ${primaryAdd.length} books, ${beforeP} → ${nextBooks.length}`);

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
if (recDupes.length > 0) {
  console.log(`⚠ Skipping ${recDupes.length} rec library duplicates`);
}
const nextRec = recBooks.concat(recAdd);
fs.writeFileSync(REC_LIBRARY, JSON.stringify(nextRec));
console.log(`REC LIBRARY: added ${recAdd.length} books, ${beforeR} → ${nextRec.length}`);

const statCat = fs.statSync(CATALOG);
const statRec = fs.statSync(REC_LIBRARY);
console.log(`\nbook-data.json: ${(statCat.size / 1024 / 1024).toFixed(2)} MB`);
console.log(`rec-library.json: ${(statRec.size / 1024).toFixed(1)} KB`);
