const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

// Duplicate to remove — remove ONE of the two Moon Witch, Spider King entries
// (leaves the other one intact)
function removeOneDuplicate(books, title, author) {
  let firstIdx = -1;
  for (let i = 0; i < books.length; i++) {
    if (books[i].title === title && books[i].author === author) {
      if (firstIdx === -1) { firstIdx = i; }
      else { return i; } // return the second occurrence to delete
    }
  }
  return -1;
}

// ── PRIMARY (existing authors) ────────────────────────────────────────────
const PRIMARY_ADDITIONS = [
  // Michael Swanwick (2)
  { title: "The Dragons of Babel", author: "Michael Swanwick", pageCount: 368, genre: "Fantasy", publicationDate: "2008", description: "A companion to The Iron Dragon's Daughter: a young human from a war-torn Faerie village journeys to the dwarf-built city of Babel, chasing the promise of citizenship.", series: null, tier: 1, topRank: null },
  { title: "Jack Faust", author: "Michael Swanwick", pageCount: 336, genre: "Fantasy", publicationDate: "1997", description: "Swanwick's Faust reimagining: Faust's demon Mephistopheles is replaced by interdimensional beings who give Faust modern science and wait to see what he does with it.", series: null, tier: 1, topRank: null },

  // Pat Cadigan (2)
  { title: "Tea from an Empty Cup", author: "Pat Cadigan", pageCount: 272, genre: "Sci-Fi", publicationDate: "1998", description: "A Tokyo detective investigates a string of artificial-reality murders in which the victims died in the virtual world and somehow bled out in reality.", series: { name: "Artificial Reality", order: 1, total: 2 }, tier: 1, topRank: null },
  { title: "Dervish Is Digital", author: "Pat Cadigan", pageCount: 288, genre: "Sci-Fi", publicationDate: "2000", description: "Artificial Reality #2: post-cyberpunk detective Konstantin continues to track criminals across AR environments that feel increasingly more real than the material world.", series: { name: "Artificial Reality", order: 2, total: 2 }, tier: 1, topRank: null },

  // Rudy Rucker (3)
  { title: "Freeware", author: "Rudy Rucker", pageCount: 320, genre: "Sci-Fi", publicationDate: "1997", description: "Ware Tetralogy #3: Rucker's third Ware novel, continuing the saga of the boppers — robot intelligences that have separated from humanity and evolved.", series: { name: "Ware", order: 3, total: 4 }, tier: 1, topRank: null },
  { title: "Realware", author: "Rudy Rucker", pageCount: 320, genre: "Sci-Fi", publicationDate: "2000", description: "Ware Tetralogy #4: the final Ware novel in which the wetware/software/freeware developments culminate in a complete reshaping of the relationship between humans and their creations.", series: { name: "Ware", order: 4, total: 4 }, tier: 1, topRank: null },
  { title: "White Light", author: "Rudy Rucker", pageCount: 272, genre: "Sci-Fi", publicationDate: "1980", description: "Rucker's first novel: a math professor and his cat investigate a mathematical concept of the afterlife, translating Cantor-Hilbert ideas into metaphysical geography.", series: null, tier: 1, topRank: null },

  // Karen Joy Fowler (2)
  { title: "The Jane Austen Book Club", author: "Karen Joy Fowler", pageCount: 304, genre: "Fiction", publicationDate: "2004", description: "Six Californians start a Jane Austen book club and find their lives slowly rearranging themselves to match the plots of the novels they are discussing.", series: null, tier: 1, topRank: null },
  { title: "Sarah Canary", author: "Karen Joy Fowler", pageCount: 304, genre: "Historical Fiction", publicationDate: "1991", description: "Fowler's debut: in the 1870s Pacific Northwest, a mysterious woman who speaks only nonsense is adopted by a Chinese laborer and travels through the fringes of American history.", series: null, tier: 1, topRank: null },

  // Marlon James (1)
  { title: "John Crow's Devil", author: "Marlon James", pageCount: 240, genre: "Fiction", publicationDate: "2005", description: "James's debut: in a 1957 Jamaican village, two preachers with opposing theologies struggle for control of the same congregation — and summon something neither can control.", series: null, tier: 1, topRank: null },

  // Sarah Gailey (2)
  { title: "Upright Women Wanted", author: "Sarah Gailey", pageCount: 176, genre: "Sci-Fi", publicationDate: "2020", description: "A 21st-century Western: in a repressive near-future, a young woman runs away to join the Librarians, a crew of government-funded women who deliver state-approved books across the frontier.", series: null, tier: 1, topRank: null },
  { title: "Just Like Home", author: "Sarah Gailey", pageCount: 320, genre: "Horror", publicationDate: "2022", description: "A woman returns to the suburban childhood home where her father committed a series of murders — and finds the house has been waiting for her.", series: null, tier: 1, topRank: null },

  // Annalee Newitz (3)
  { title: "Autonomous", author: "Annalee Newitz", pageCount: 320, genre: "Sci-Fi", publicationDate: "2017", description: "Newitz's debut novel: in 2144, a pharmaceutical pirate is hunted by a military agent and his robot partner while she uncovers a conspiracy involving addiction-inducing productivity drugs.", series: null, tier: 1, topRank: null },
  { title: "The Terraformers", author: "Annalee Newitz", pageCount: 352, genre: "Sci-Fi", publicationDate: "2023", description: "Newitz's far-future ecological fable: a corporate terraforming project on a distant planet runs up against the rights of the sentient beings it has been engineering.", series: null, tier: 1, topRank: null },
  { title: "The Future of Another Timeline", author: "Annalee Newitz", pageCount: 352, genre: "Sci-Fi", publicationDate: "2019", description: "A feminist geologist and a punk teenager discover they can time-travel and begin editing history to prevent women's rights from being repeatedly erased.", series: null, tier: 1, topRank: null },
];

// ── REC LIBRARY (new authors) ────────────────────────────────────────────
const REC_LIBRARY_ADDITIONS = [
  // Robert Sheckley (4)
  { title: "Untouched by Human Hands", author: "Robert Sheckley", pageCount: 192, genre: "Sci-Fi", publicationDate: "1954", description: "Sheckley's first story collection: thirteen comic-absurdist SF tales that helped define the style of the early Galaxy magazine era.", series: null, tier: 1, topRank: null },
  { title: "Mindswap", author: "Robert Sheckley", pageCount: 224, genre: "Sci-Fi", publicationDate: "1966", description: "A man renting an alien body for a vacation is left stranded when his own body is stolen — and he must body-hop across the galaxy trying to get it back.", series: null, tier: 1, topRank: null },
  { title: "Dimension of Miracles", author: "Robert Sheckley", pageCount: 192, genre: "Sci-Fi", publicationDate: "1968", description: "A man who has won an interstellar prize he was never eligible for must find his way home through a series of increasingly absurd parallel universes.", series: null, tier: 1, topRank: null },
  { title: "Immortality, Inc.", author: "Robert Sheckley", pageCount: 224, genre: "Sci-Fi", publicationDate: "1959", description: "A 20th-century American is killed in a car crash and wakes up in the 22nd century in a body bought for him by a company that has just changed its mind.", series: null, tier: 1, topRank: null },

  // H. Beam Piper (3)
  { title: "Little Fuzzy", author: "H. Beam Piper", pageCount: 192, genre: "Sci-Fi", publicationDate: "1962", description: "A prospector on an alien colony world discovers a small primate-like creature — and must prove in court that it is sentient before his employer can have the species reclassified.", series: { name: "Fuzzy", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "Space Viking", author: "H. Beam Piper", pageCount: 240, genre: "Sci-Fi", publicationDate: "1963", description: "In the post-Federation galaxy, a nobleman turned pirate-king uses his fleet to hunt the murderer of his wife across the fractured worlds of humanity.", series: null, tier: 1, topRank: null },
  { title: "Lord Kalvan of Otherwhen", author: "H. Beam Piper", pageCount: 224, genre: "Sci-Fi", publicationDate: "1965", description: "A Pennsylvania state trooper is transported to a parallel world with 17th-century technology and becomes the king who introduces them to modern firearms.", series: null, tier: 1, topRank: null },

  // James H. Schmitz (3)
  { title: "Agent of Vega", author: "James H. Schmitz", pageCount: 192, genre: "Sci-Fi", publicationDate: "1960", description: "The first Vegan Confederacy collection: linked stories of the elite Agents who keep order across a far-future galactic federation using psychic powers and deep cover.", series: null, tier: 1, topRank: null },
  { title: "The Witches of Karres", author: "James H. Schmitz", pageCount: 320, genre: "Sci-Fi", publicationDate: "1966", description: "A freighter captain rescues three children who turn out to be witches from the planet Karres — and finds himself on a chaotic adventure across the galaxy.", series: null, tier: 1, topRank: null },
  { title: "The Universe Against Her", author: "James H. Schmitz", pageCount: 192, genre: "Sci-Fi", publicationDate: "1964", description: "The first Telzey Amberdon novel: a telepathic teenager navigates the political machinery of the Federation while pursuing a secret mission.", series: { name: "Telzey Amberdon", order: 1, total: 3 }, tier: 1, topRank: null },

  // Eric Brown (3)
  { title: "Helix", author: "Eric Brown", pageCount: 400, genre: "Sci-Fi", publicationDate: "2007", description: "A starship crash-lands on a colossal artificial helix winding around a sun — a structure containing thousands of habitats occupied by different intelligent species.", series: { name: "Helix", order: 1, total: 2 }, tier: 1, topRank: null },
  { title: "New York Nights", author: "Eric Brown", pageCount: 304, genre: "Sci-Fi", publicationDate: "2000", description: "A New York private detective in 2040 investigates cases at the intersection of virtual reality and supernatural horror — Brown's noir cyberpunk novel.", series: null, tier: 1, topRank: null },
  { title: "Jani and the Greater Game", author: "Eric Brown", pageCount: 320, genre: "Sci-Fi", publicationDate: "2014", description: "An alternate-history Imperial Britain in 1925 where Empire rules via alien technology — and a young woman discovers the aliens have their own agenda for India.", series: null, tier: 1, topRank: null },

  // John Shirley (3)
  { title: "Eclipse", author: "John Shirley", pageCount: 320, genre: "Sci-Fi", publicationDate: "1985", description: "The first A Song Called Youth novel: in near-future Europe, a fascist corporate army called the Second Alliance conquers a fractured continent as underground resistance begins.", series: { name: "A Song Called Youth", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Eclipse Penumbra", author: "John Shirley", pageCount: 336, genre: "Sci-Fi", publicationDate: "1988", description: "A Song Called Youth #2: the war against the Second Alliance expands as the resistance learns the full extent of the fascist corporate mind-control program.", series: { name: "A Song Called Youth", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Eclipse Corona", author: "John Shirley", pageCount: 336, genre: "Sci-Fi", publicationDate: "1990", description: "A Song Called Youth #3: the final battle between the resistance and the Second Alliance as humanity's fate on the Grid is decided.", series: { name: "A Song Called Youth", order: 3, total: 3 }, tier: 1, topRank: null },

  // Pamela Sargent (3)
  { title: "The Shore of Women", author: "Pamela Sargent", pageCount: 480, genre: "Sci-Fi", publicationDate: "1986", description: "Centuries after a nuclear war, women live in high-tech walled cities while men live as primitive hunter-gatherers outside — until one woman is exiled and meets the 'savages.'", series: null, tier: 1, topRank: null },
  { title: "Cloned Lives", author: "Pamela Sargent", pageCount: 304, genre: "Sci-Fi", publicationDate: "1976", description: "Sargent's early novel: the first human clones — five siblings engineered from a single donor — grow up under public scrutiny and make very different lives.", series: null, tier: 1, topRank: null },
  { title: "Venus of Dreams", author: "Pamela Sargent", pageCount: 592, genre: "Sci-Fi", publicationDate: "1986", description: "The first Venus trilogy novel: multi-generational saga of a woman whose dream of terraforming Venus becomes the obsessive project of an entire political movement.", series: { name: "Venus", order: 1, total: 3 }, tier: 1, topRank: null },

  // Joan Slonczewski (3)
  { title: "A Door into Ocean", author: "Joan Slonczewski", pageCount: 416, genre: "Sci-Fi", publicationDate: "1986", description: "On the water-world Shora, a race of all-female pacifist natives resist invasion from a patriarchal interstellar empire — Slonczewski's landmark feminist ecological SF.", series: { name: "Elysium Cycle", order: 2, total: 4 }, tier: 1, topRank: null },
  { title: "The Children Star", author: "Joan Slonczewski", pageCount: 480, genre: "Sci-Fi", publicationDate: "1998", description: "Elysium Cycle: a missionary couple tries to adapt genetically modified human children to a lethal alien biosphere where microscopic life is sentient.", series: { name: "Elysium Cycle", order: 3, total: 4 }, tier: 1, topRank: null },
  { title: "Brain Plague", author: "Joan Slonczewski", pageCount: 400, genre: "Sci-Fi", publicationDate: "2000", description: "Elysium Cycle: a painter allows an intelligent microbial colony to take up residence in her brain — and discovers an entire civilization of tiny beings in her head.", series: { name: "Elysium Cycle", order: 4, total: 4 }, tier: 1, topRank: null },

  // William Hope Hodgson (4)
  { title: "The House on the Borderland", author: "William Hope Hodgson", pageCount: 240, genre: "Horror", publicationDate: "1908", description: "Hodgson's cosmic horror masterwork: two travelers in rural Ireland discover a journal left in a ruined house — a manuscript of attack by pig-creatures and a vision of Earth's far future.", series: null, tier: 1, topRank: null },
  { title: "The Night Land", author: "William Hope Hodgson", pageCount: 480, genre: "Sci-Fi", publicationDate: "1912", description: "Hodgson's far-future epic: billions of years from now, the last humans live in a colossal pyramid-city surrounded by a dying Earth haunted by things the sun cannot reach.", series: null, tier: 1, topRank: null },
  { title: "The Ghost Pirates", author: "William Hope Hodgson", pageCount: 224, genre: "Horror", publicationDate: "1909", description: "A sailor signs on to a merchant ship and discovers the crew's growing certainty that they are being haunted — and then hunted — by spectral pirates from beyond the grave.", series: null, tier: 1, topRank: null },
  { title: "Carnacki the Ghost-Finder", author: "William Hope Hodgson", pageCount: 224, genre: "Horror", publicationDate: "1913", description: "Hodgson's occult-detective story collection: Thomas Carnacki investigates supernatural cases using a mixture of scientific instruments and pentacle-based protection.", series: null, tier: 1, topRank: null },

  // Robert W. Chambers (2)
  { title: "The King in Yellow", author: "Robert W. Chambers", pageCount: 304, genre: "Horror", publicationDate: "1895", description: "Chambers's classic horror collection linked by a fictional play whose second act drives readers mad — a foundational weird fiction text influencing Lovecraft and True Detective.", series: null, tier: 1, topRank: null },
  { title: "The Maker of Moons", author: "Robert W. Chambers", pageCount: 256, genre: "Horror", publicationDate: "1896", description: "Chambers's second horror collection: stories of Chinese sorcery, occult conspiracies, and the strange creatures who appear when the moon is wrong.", series: null, tier: 1, topRank: null },

  // E.F. Benson (2)
  { title: "The Collected Ghost Stories of E.F. Benson", author: "E.F. Benson", pageCount: 432, genre: "Horror", publicationDate: "1992", description: "Benson's complete supernatural fiction: Edwardian ghost stories and horror tales by one of the masters of the M.R. James school, collected in one volume.", series: null, tier: 1, topRank: null },
  { title: "The Room in the Tower", author: "E.F. Benson", pageCount: 256, genre: "Horror", publicationDate: "1912", description: "Benson's first horror collection, including the title story of a recurring nightmare that becomes real — one of the most-anthologized ghost stories in English.", series: null, tier: 1, topRank: null },

  // Robert Aickman (3)
  { title: "Cold Hand in Mine", author: "Robert Aickman", pageCount: 288, genre: "Horror", publicationDate: "1975", description: "Aickman's World Fantasy Award-winning collection: eight 'strange stories' in which ordinary lives slide sideways into something quietly, profoundly wrong.", series: null, tier: 1, topRank: null },
  { title: "Dark Entries", author: "Robert Aickman", pageCount: 256, genre: "Horror", publicationDate: "1964", description: "Aickman's first solo collection: six strange stories of haunting, obsession, and loss that refuse to resolve into conventional ghost-story explanations.", series: null, tier: 1, topRank: null },
  { title: "Painted Devils", author: "Robert Aickman", pageCount: 224, genre: "Horror", publicationDate: "1979", description: "Aickman's sixth collection: strange stories of obsession, fate, and the thin membrane between the ordinary and the inexplicable.", series: null, tier: 1, topRank: null },

  // Max Brooks (3)
  { title: "World War Z", author: "Max Brooks", pageCount: 352, genre: "Horror", publicationDate: "2006", description: "An oral history of a global zombie outbreak told after the war's end by survivors from every continent and walk of life — Brooks's landmark pandemic novel.", series: null, tier: 1, topRank: null },
  { title: "The Zombie Survival Guide", author: "Max Brooks", pageCount: 288, genre: "Horror", publicationDate: "2003", description: "Brooks's fake-straight-face survival manual for a zombie apocalypse — the book that essentially created the modern zombie-preparation subgenre.", series: null, tier: 1, topRank: null },
  { title: "Devolution", author: "Max Brooks", pageCount: 320, genre: "Horror", publicationDate: "2020", description: "An eco-village in the Washington Cascades is cut off from the outside world by a Mount Rainier eruption — and learns it is not alone in the woods.", series: null, tier: 1, topRank: null },

  // Matt Wesolowski (3)
  { title: "Six Stories", author: "Matt Wesolowski", pageCount: 256, genre: "Thriller", publicationDate: "2017", description: "The first Six Stories novel: a true-crime podcaster investigates the twenty-year-old death of a teenager at an isolated outdoor center through six interviews with witnesses.", series: { name: "Six Stories", order: 1, total: 7 }, tier: 1, topRank: null },
  { title: "Hydra", author: "Matt Wesolowski", pageCount: 272, genre: "Thriller", publicationDate: "2018", description: "Six Stories #2: the podcaster investigates the case of a woman who killed her entire family in a remote farmhouse — and whose defense involved a creature she called Hydra.", series: { name: "Six Stories", order: 2, total: 7 }, tier: 1, topRank: null },
  { title: "Beast", author: "Matt Wesolowski", pageCount: 272, genre: "Thriller", publicationDate: "2019", description: "Six Stories #3: the investigation of three teenage YouTubers who livestreamed their deaths in a deserted tower block — and whose assailants have never been found.", series: { name: "Six Stories", order: 3, total: 7 }, tier: 1, topRank: null },

  // Sarah Langan (3)
  { title: "The Keeper", author: "Sarah Langan", pageCount: 352, genre: "Horror", publicationDate: "2006", description: "Langan's debut: a dying Maine mill town is haunted by the return of a local woman whose drowning ten years earlier was never solved — and who has waited patiently for revenge.", series: null, tier: 1, topRank: null },
  { title: "The Missing", author: "Sarah Langan", pageCount: 336, genre: "Horror", publicationDate: "2007", description: "A sequel to The Keeper: Maine's Corpus Dei plague is spreading, and a small-town doctor must confront the growing horde of undead overtaking New England.", series: null, tier: 1, topRank: null },
  { title: "Good Neighbors", author: "Sarah Langan", pageCount: 336, genre: "Horror", publicationDate: "2021", description: "A suburban Long Island neighborhood's obsessive scapegoating of a single mother escalates into tragedy — Langan's social-horror novel of cul-de-sac cruelty.", series: null, tier: 1, topRank: null },

  // Lisa Tuttle (3)
  { title: "Familiar Spirit", author: "Lisa Tuttle", pageCount: 272, genre: "Horror", publicationDate: "1983", description: "A woman who has recently moved to Texas is haunted by the jealous spirit of her rental house's previous tenant — Tuttle's contemporary psychological horror novel.", series: null, tier: 1, topRank: null },
  { title: "The Pillow Friend", author: "Lisa Tuttle", pageCount: 304, genre: "Horror", publicationDate: "1996", description: "A woman given a wish-granting doll as a child grows up discovering the costs of each of her childhood wishes as they come due one by one.", series: null, tier: 1, topRank: null },
  { title: "The Silver Bough", author: "Lisa Tuttle", pageCount: 320, genre: "Fantasy", publicationDate: "2006", description: "Three women find themselves trapped in a small Scottish town where an ancient fertility-magic custom is reasserting itself.", series: null, tier: 1, topRank: null },

  // Peng Shepherd (3)
  { title: "The Book of M", author: "Peng Shepherd", pageCount: 496, genre: "Sci-Fi", publicationDate: "2018", description: "An unexplained global phenomenon causes people to lose their shadows — and then their memories — and a couple must survive as one of them begins to forget.", series: null, tier: 1, topRank: null },
  { title: "The Cartographers", author: "Peng Shepherd", pageCount: 400, genre: "Thriller", publicationDate: "2022", description: "A young woman investigates her cartographer father's death and uncovers a conspiracy centered on a mass-produced gas-station map that is hiding a secret town.", series: null, tier: 1, topRank: null },
  { title: "The Future Library", author: "Peng Shepherd", pageCount: 112, genre: "Fiction", publicationDate: "2023", description: "Shepherd's novella for the Future Library project: a speculation about a library whose books will not be published for 100 years.", series: null, tier: 1, topRank: null },

  // Thea Harrison (3)
  { title: "Dragon Bound", author: "Thea Harrison", pageCount: 336, genre: "Romance", publicationDate: "2011", description: "The first Elder Races novel: a half-fae thief steals from a dragon shapeshifter and finds her punishment is an arranged partnership with the monstrous creature she robbed.", series: { name: "Elder Races", order: 1, total: 14 }, tier: 1, topRank: null },
  { title: "Storm's Heart", author: "Thea Harrison", pageCount: 336, genre: "Romance", publicationDate: "2011", description: "Elder Races #2: a Wyr princess of a conspired-against thunderbird clan flees to Las Vegas and finds refuge with a dark fae assassin.", series: { name: "Elder Races", order: 2, total: 14 }, tier: 1, topRank: null },
  { title: "Serpent's Kiss", author: "Thea Harrison", pageCount: 304, genre: "Romance", publicationDate: "2011", description: "Elder Races #3: a healer Wyr is hired to save a comatose vampire and finds the case drawing her into ancient vampire politics.", series: { name: "Elder Races", order: 3, total: 14 }, tier: 1, topRank: null },

  // Jeaniene Frost (3)
  { title: "Halfway to the Grave", author: "Jeaniene Frost", pageCount: 368, genre: "Romance", publicationDate: "2007", description: "The first Night Huntress novel: a half-vampire woman hunting vampires for revenge reluctantly teams up with an irresistible vampire bounty hunter.", series: { name: "Night Huntress", order: 1, total: 7 }, tier: 1, topRank: null },
  { title: "One Foot in the Grave", author: "Jeaniene Frost", pageCount: 368, genre: "Romance", publicationDate: "2008", description: "Night Huntress #2: Cat works for a government vampire-hunting unit and is drawn back to her old partner Bones — and his enemies.", series: { name: "Night Huntress", order: 2, total: 7 }, tier: 1, topRank: null },
  { title: "At Grave's End", author: "Jeaniene Frost", pageCount: 368, genre: "Romance", publicationDate: "2009", description: "Night Huntress #3: Cat and Bones's open relationship is threatened when an ancient vampire Cat's father once crossed returns to claim her.", series: { name: "Night Huntress", order: 3, total: 7 }, tier: 1, topRank: null },

  // Grace Draven (3)
  { title: "Radiance", author: "Grace Draven", pageCount: 360, genre: "Romance", publicationDate: "2014", description: "The first Wraith Kings novel: a political marriage between a plain human noblewoman and a scholarly gray-skinned Kai prince becomes unexpectedly tender.", series: { name: "Wraith Kings", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "Eidolon", author: "Grace Draven", pageCount: 416, genre: "Romance", publicationDate: "2017", description: "Wraith Kings #2: Ildiko and Brishen must defend their kingdoms from an ancient evil bleeding across the borders between realms.", series: { name: "Wraith Kings", order: 2, total: 4 }, tier: 1, topRank: null },
  { title: "The Ippos King", author: "Grace Draven", pageCount: 448, genre: "Romance", publicationDate: "2020", description: "Wraith Kings #3: an ex-slave and a Kai warrior forge an unlikely alliance against a demonic threat and discover an unexpected bond.", series: { name: "Wraith Kings", order: 3, total: 4 }, tier: 1, topRank: null },

  // Patricia C. Wrede (4)
  { title: "Dealing with Dragons", author: "Patricia C. Wrede", pageCount: 240, genre: "Young Adult", publicationDate: "1990", description: "The first Enchanted Forest Chronicles novel: a princess tired of princess lessons runs away to become housekeeper to a dragon — and discovers dragons have problems of their own.", series: { name: "Enchanted Forest", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "Searching for Dragons", author: "Patricia C. Wrede", pageCount: 272, genre: "Young Adult", publicationDate: "1991", description: "Enchanted Forest #2: the King of the Enchanted Forest and Princess Cimorene search for a missing dragon while the wizards continue their attacks on the forest.", series: { name: "Enchanted Forest", order: 2, total: 4 }, tier: 1, topRank: null },
  { title: "Calling on Dragons", author: "Patricia C. Wrede", pageCount: 256, genre: "Young Adult", publicationDate: "1993", description: "Enchanted Forest #3: the witch Morwen's cats help Queen Cimorene investigate a plot involving the King's sword and an old dragon-wizard alliance.", series: { name: "Enchanted Forest", order: 3, total: 4 }, tier: 1, topRank: null },
  { title: "Talking to Dragons", author: "Patricia C. Wrede", pageCount: 256, genre: "Young Adult", publicationDate: "1985", description: "Enchanted Forest #4 (and chronologically first-written): Cimorene's teenage son Daystar sets out into the Enchanted Forest on a quest to rescue his father.", series: { name: "Enchanted Forest", order: 4, total: 4 }, tier: 1, topRank: null },

  // Lawrence Watt-Evans (3)
  { title: "The Misenchanted Sword", author: "Lawrence Watt-Evans", pageCount: 272, genre: "Fantasy", publicationDate: "1985", description: "The first Ethshar novel: a deserting soldier receives a magically enchanted sword whose curse is that he cannot die while holding it and cannot lose it for long.", series: { name: "Ethshar", order: 1, total: 15 }, tier: 1, topRank: null },
  { title: "With a Single Spell", author: "Lawrence Watt-Evans", pageCount: 256, genre: "Fantasy", publicationDate: "1987", description: "Ethshar #2: an apprentice wizard who only knows one minor spell must use his wit — and his single enchantment — to survive an increasingly dangerous quest.", series: { name: "Ethshar", order: 2, total: 15 }, tier: 1, topRank: null },
  { title: "The Unwilling Warlord", author: "Lawrence Watt-Evans", pageCount: 304, genre: "Fantasy", publicationDate: "1989", description: "Ethshar #3: a reluctant warlock is kidnapped and installed as the military ruler of a fractious city-state on the edge of destruction.", series: { name: "Ethshar", order: 3, total: 15 }, tier: 1, topRank: null },

  // John M. Ford (3)
  { title: "The Dragon Waiting", author: "John M. Ford", pageCount: 368, genre: "Historical Fiction", publicationDate: "1983", description: "Ford's World Fantasy Award-winning alternate history: an alternate 15th-century Europe in which Byzantium never fell, vampires exist, and Richard III may win the throne.", series: null, tier: 1, topRank: null },
  { title: "Growing Up Weightless", author: "John M. Ford", pageCount: 320, genre: "Sci-Fi", publicationDate: "1993", description: "A young boy born on a lunar colony tries to run away from his famous father — and in the process discovers what it means to be the second native-born generation of the Moon.", series: null, tier: 1, topRank: null },
  { title: "The Last Hot Time", author: "John M. Ford", pageCount: 256, genre: "Fantasy", publicationDate: "2000", description: "A young paramedic arrives in an urban-fantasy Chicago where elves, magic, and mob politics share the same nightclubs as 1940s jazz.", series: null, tier: 1, topRank: null },

  // Charles R. Saunders (3)
  { title: "Imaro", author: "Charles R. Saunders", pageCount: 288, genre: "Fantasy", publicationDate: "1981", description: "Saunders's foundational work of sword-and-soul: a young warrior exiled from his cattle-herding people wanders a pre-colonial Africa-inspired continent called Nyumbani.", series: { name: "Imaro", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "The Quest for Cush", author: "Charles R. Saunders", pageCount: 272, genre: "Fantasy", publicationDate: "1984", description: "Imaro #2: the exiled warrior journeys through the lands of Nyumbani seeking the ancient city of Cush and the truth of his origin.", series: { name: "Imaro", order: 2, total: 5 }, tier: 1, topRank: null },
  { title: "The Trail of Bohu", author: "Charles R. Saunders", pageCount: 288, genre: "Fantasy", publicationDate: "1985", description: "Imaro #3: Imaro follows the trail of his sworn enemy Bohu into lands ruled by powerful sorcerer-priests — the original third volume of the Imaro saga.", series: { name: "Imaro", order: 3, total: 5 }, tier: 1, topRank: null },

  // Kim Bo-Young (3)
  { title: "I'm Waiting for You", author: "Kim Bo-Young", pageCount: 240, genre: "Sci-Fi", publicationDate: "2020", description: "A Korean SF novella in two parts: two lovers separated by relativistic travel exchange letters across time as they try to arrive together for their wedding.", series: null, tier: 1, topRank: null },
  { title: "On the Origin of Species and Other Stories", author: "Kim Bo-Young", pageCount: 304, genre: "Sci-Fi", publicationDate: "2021", description: "Kim's first English-translated story collection: seven tales spanning transhumanism, Korean folk-religion, and the far future of consciousness.", series: null, tier: 1, topRank: null },
  { title: "The Prophet of Corruption", author: "Kim Bo-Young", pageCount: 384, genre: "Sci-Fi", publicationDate: "2019", description: "Kim's Buddhist-inspired novel of reincarnation across many worlds — and a prophet who turns against the system of rebirth itself.", series: null, tier: 1, topRank: null },

  // Caroline Stevermer (3)
  { title: "A College of Magics", author: "Caroline Stevermer", pageCount: 448, genre: "Young Adult", publicationDate: "1994", description: "A young woman arrives at a Victorian-era girls' college where the curriculum secretly includes sorcery — and discovers she is at the center of a political prophecy.", series: { name: "A College of Magics", order: 1, total: 2 }, tier: 1, topRank: null },
  { title: "Sorcery and Cecelia", author: "Caroline Stevermer", pageCount: 336, genre: "Young Adult", publicationDate: "1988", description: "Stevermer and Patricia C. Wrede's epistolary Regency fantasy: two cousins exchange letters about the strange magical goings-on in their respective London and country seasons.", series: { name: "Cecelia and Kate", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "A Scholar of Magics", author: "Caroline Stevermer", pageCount: 368, genre: "Young Adult", publicationDate: "2004", description: "A College of Magics #2: an American sharpshooter is hired by an Oxford scholar to protect him during a dangerous magical experiment.", series: { name: "A College of Magics", order: 2, total: 2 }, tier: 1, topRank: null },

  // Molly Harper (3)
  { title: "Nice Girls Don't Have Fangs", author: "Molly Harper", pageCount: 368, genre: "Romance", publicationDate: "2009", description: "The first Jane Jameson novel: a laid-off Kentucky children's librarian is turned into a vampire and must navigate her new eternal life and her mother's disapproval.", series: { name: "Jane Jameson", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "Nice Girls Don't Date Dead Men", author: "Molly Harper", pageCount: 352, genre: "Romance", publicationDate: "2009", description: "Jane Jameson #2: Jane's sister gets engaged to a werewolf, vampire sorority politics escalate, and Jane's boyfriend may be hiding a dark secret.", series: { name: "Jane Jameson", order: 2, total: 5 }, tier: 1, topRank: null },
  { title: "Nice Girls Don't Live Forever", author: "Molly Harper", pageCount: 352, genre: "Romance", publicationDate: "2010", description: "Jane Jameson #3: Jane's beloved vampire boyfriend Gabriel has a mysterious visit from his undead sire — who may or may not have plans to kill her.", series: { name: "Jane Jameson", order: 3, total: 5 }, tier: 1, topRank: null },
];

// ── Apply PRIMARY ──
const data = JSON.parse(fs.readFileSync(CATALOG, "utf8"));
let books = Array.isArray(data) ? data : (data.books || Object.values(data).find(v => Array.isArray(v)));
const beforeP = books.length;

// Remove Marlon James duplicate
const dupIdx = removeOneDuplicate(books, "Moon Witch, Spider King", "Marlon James");
if (dupIdx !== -1) {
  console.log(`  ✓ removing dupe: "Moon Witch, Spider King" — Marlon James`);
  books.splice(dupIdx, 1);
}

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
console.log(`\nPRIMARY: +${primaryAdd.length} -${dupIdx !== -1 ? 1 : 0}, ${beforeP} → ${nextBooks.length}`);

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
