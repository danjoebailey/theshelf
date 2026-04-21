const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

// ── PRIMARY (existing authors) ────────────────────────────────────────────
const PRIMARY_ADDITIONS = [
  // Premee Mohamed (3)
  { title: "Beneath the Rising", author: "Premee Mohamed", pageCount: 368, genre: "Horror", publicationDate: "2020", description: "The first Beneath the Rising novel: a young genius invents a clean-energy reactor and accidentally summons cosmic horrors from beyond reality — and her Muslim Canadian childhood friend must help her survive them.", series: { name: "Beneath the Rising", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "A Broken Darkness", author: "Premee Mohamed", pageCount: 336, genre: "Horror", publicationDate: "2021", description: "Beneath the Rising #2: Johnny and Nick's uneasy truce with the Ancient Ones collapses when someone else begins opening doors between worlds — and the cost of the first sealing begins coming due.", series: { name: "Beneath the Rising", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "The Void Ascendant", author: "Premee Mohamed", pageCount: 368, genre: "Horror", publicationDate: "2022", description: "Beneath the Rising #3: the final reckoning between Johnny Chambers and the forces from beyond reality — and between two friends whose relationship has survived far worse than cosmic horror.", series: { name: "Beneath the Rising", order: 3, total: 3 }, tier: 1, topRank: null },

  // M.C. Beaton (4)
  { title: "The Walkers of Dembley", author: "M.C. Beaton", pageCount: 256, genre: "Mystery", publicationDate: "1993", description: "Agatha Raisin #4: Agatha investigates the murder of a hiking ramblers' leader in a Cotswolds village with a gentry family determined to keep her out.", series: { name: "Agatha Raisin", order: 4, total: 34 }, tier: 1, topRank: null },
  { title: "The Murderous Marriage", author: "M.C. Beaton", pageCount: 240, genre: "Mystery", publicationDate: "1996", description: "Agatha Raisin #5: Agatha's own wedding is interrupted by a surprise guest — her supposedly dead first husband — and his subsequent murder.", series: { name: "Agatha Raisin", order: 5, total: 34 }, tier: 1, topRank: null },
  { title: "Death of an Outsider", author: "M.C. Beaton", pageCount: 240, genre: "Mystery", publicationDate: "1988", description: "Hamish Macbeth #3: a particularly unpleasant English newcomer to a small Scottish Highland village is murdered, and Hamish is assigned to the case no one wants.", series: { name: "Hamish Macbeth", order: 3, total: 36 }, tier: 1, topRank: null },
  { title: "Death of a Perfect Wife", author: "M.C. Beaton", pageCount: 224, genre: "Mystery", publicationDate: "1989", description: "Hamish Macbeth #4: a well-meaning Englishwoman is slowly making herself detested by everyone in Lochdubh — and then she turns up murdered.", series: { name: "Hamish Macbeth", order: 4, total: 36 }, tier: 1, topRank: null },

  // Robert Holdstock (3)
  { title: "Celtika", author: "Robert Holdstock", pageCount: 320, genre: "Fantasy", publicationDate: "2001", description: "The first Merlin Codex novel: Merlin, seven hundred years old, sails with Jason and the Argonauts to retrieve Jason's sons from a shadow land.", series: { name: "The Merlin Codex", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "The Iron Grail", author: "Robert Holdstock", pageCount: 368, genre: "Fantasy", publicationDate: "2002", description: "Merlin Codex #2: Merlin returns to his native Alba to find his ancestral hill fort besieged by the dead — and discovers the cost of his own immortality.", series: { name: "The Merlin Codex", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "The Broken Kings", author: "Robert Holdstock", pageCount: 336, genre: "Fantasy", publicationDate: "2007", description: "Merlin Codex #3: the final confrontation with the Ghostland, Merlin's ancient enemy, and with the price of the magic he has been carrying since the Argo.", series: { name: "The Merlin Codex", order: 3, total: 3 }, tier: 1, topRank: null },

  // Ken Grimwood (1)
  { title: "Into the Deep", author: "Ken Grimwood", pageCount: 320, genre: "Sci-Fi", publicationDate: "1995", description: "Grimwood's follow-up to Replay: a marine biologist studying dolphin communication makes a discovery that upends human understanding of cetacean civilization.", series: null, tier: 1, topRank: null },

  // Katherine Kurtz (3)
  { title: "Camber of Culdi", author: "Katherine Kurtz", pageCount: 320, genre: "Fantasy", publicationDate: "1976", description: "The first Legends of Camber of Culdi novel: in an alternate Wales, a holy man sets out to restore the rightful Deryni king and change the course of his kingdom's history.", series: { name: "Legends of Camber of Culdi", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Saint Camber", author: "Katherine Kurtz", pageCount: 352, genre: "Fantasy", publicationDate: "1978", description: "Legends of Camber #2: Camber sacrifices his own identity to continue guiding the new king, living in disguise while his legend grows without him.", series: { name: "Legends of Camber of Culdi", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Camber the Heretic", author: "Katherine Kurtz", pageCount: 416, genre: "Fantasy", publicationDate: "1981", description: "Legends of Camber #3: the backlash against Deryni magic begins and Camber's faithful must protect the young king from the Church persecution that is coming for them all.", series: { name: "Legends of Camber of Culdi", order: 3, total: 3 }, tier: 1, topRank: null },

  // Jacqueline Carey (5)
  { title: "Kushiel's Scion", author: "Jacqueline Carey", pageCount: 944, genre: "Fantasy", publicationDate: "2006", description: "The first Imriel Trilogy novel: Imriel de la Courcel, adopted son of Phèdre nó Delaunay, comes of age at the Terre d'Ange court with the question of his true parentage hanging over him.", series: { name: "Imriel Trilogy", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Kushiel's Justice", author: "Jacqueline Carey", pageCount: 832, genre: "Fantasy", publicationDate: "2007", description: "Imriel Trilogy #2: Imriel's political marriage to the princess of Alba is threatened by his own complicated feelings and by the cruel rulers of the dead-visited kingdom of Vralia.", series: { name: "Imriel Trilogy", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Kushiel's Mercy", author: "Jacqueline Carey", pageCount: 672, genre: "Fantasy", publicationDate: "2008", description: "Imriel Trilogy #3: Imriel must confront a dark enchantment placed on Terre d'Ange by an old enemy — and choose between his duty and his love.", series: { name: "Imriel Trilogy", order: 3, total: 3 }, tier: 1, topRank: null },
  { title: "Naamah's Kiss", author: "Jacqueline Carey", pageCount: 672, genre: "Fantasy", publicationDate: "2009", description: "The first Naamah Trilogy novel: a descendant of Alais de la Courcel and a Maghuin Dhonn witch sets out from her native Alba on a journey that will take her across the known world.", series: { name: "Naamah Trilogy", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Naamah's Curse", author: "Jacqueline Carey", pageCount: 576, genre: "Fantasy", publicationDate: "2010", description: "Naamah Trilogy #2: Moirin follows her love into Vralia and is captured by a religious order that intends to cure her of her magic — and her faith.", series: { name: "Naamah Trilogy", order: 2, total: 3 }, tier: 1, topRank: null },

  // Nick Harkaway (3)
  { title: "The Gone-Away World", author: "Nick Harkaway", pageCount: 544, genre: "Sci-Fi", publicationDate: "2008", description: "Harkaway's debut: in a post-apocalyptic world reshaped by a weapon that removes things from existence, a Haulier named Gonzo Lubitsch is hired to put out a fire on a vital pipeline.", series: null, tier: 1, topRank: null },
  { title: "Angelmaker", author: "Nick Harkaway", pageCount: 496, genre: "Sci-Fi", publicationDate: "2012", description: "A working-class London clockmaker reactivates a World War II doomsday device hidden in a clockwork golem — and finds himself the only person who can turn it off.", series: null, tier: 1, topRank: null },
  { title: "Gnomon", author: "Nick Harkaway", pageCount: 704, genre: "Sci-Fi", publicationDate: "2017", description: "In a near-future London run by a benevolent surveillance state, an Inspector investigates the death of a detainee whose final mental state contains four separate narratives.", series: null, tier: 1, topRank: null },

  // Louis L'Amour (3)
  { title: "The Quick and the Dead", author: "Louis L'Amour", pageCount: 192, genre: "Historical Fiction", publicationDate: "1973", description: "A family of frontier settlers crossing the Western plains is stalked by a pair of hard-luck gunmen — and is rescued by a professional man of violence named Con Vallian.", series: null, tier: 1, topRank: null },
  { title: "Shalako", author: "Louis L'Amour", pageCount: 192, genre: "Historical Fiction", publicationDate: "1962", description: "A lone gunman named Shalako encounters a group of European aristocrats who have wandered into Apache country on a safari — and must lead them out alive.", series: null, tier: 1, topRank: null },
  { title: "Flint", author: "Louis L'Amour", pageCount: 192, genre: "Historical Fiction", publicationDate: "1960", description: "A dying New York financier returns to his old hideout in New Mexico to spend his last days — and is dragged into a range war as his cancer quietly kills him.", series: null, tier: 1, topRank: null },

  // Zane Grey (2)
  { title: "The Lone Star Ranger", author: "Zane Grey", pageCount: 368, genre: "Historical Fiction", publicationDate: "1915", description: "A young man falsely accused of murder becomes an outlaw, then a Texas Ranger, and ultimately confronts the truth of who he really is.", series: null, tier: 1, topRank: null },
  { title: "The Light of Western Stars", author: "Zane Grey", pageCount: 400, genre: "Historical Fiction", publicationDate: "1914", description: "An Eastern socialite travels to New Mexico to visit her brother and is drawn into the dangerous border country and the life of a cowboy named Gene Stewart.", series: null, tier: 1, topRank: null },

  // Toshikazu Kawaguchi (3)
  { title: "Tales from the Cafe", author: "Toshikazu Kawaguchi", pageCount: 272, genre: "Fiction", publicationDate: "2017", description: "Before the Coffee Gets Cold #2: four more visitors to the magical Funiculi Funicula cafe seek to travel back in time while their coffee cools.", series: { name: "Before the Coffee Gets Cold", order: 2, total: 6 }, tier: 1, topRank: null },
  { title: "Before Your Memory Fades", author: "Toshikazu Kawaguchi", pageCount: 288, genre: "Fiction", publicationDate: "2018", description: "Before the Coffee Gets Cold #3: a similar magical cafe exists in Hakodate, where four new characters use it to reach the ones they never said goodbye to.", series: { name: "Before the Coffee Gets Cold", order: 3, total: 6 }, tier: 1, topRank: null },
  { title: "Before We Say Goodbye", author: "Toshikazu Kawaguchi", pageCount: 304, genre: "Fiction", publicationDate: "2020", description: "Before the Coffee Gets Cold #4: the Funiculi Funicula cafe welcomes four more visitors seeking one last conversation with the people they have lost.", series: { name: "Before the Coffee Gets Cold", order: 4, total: 6 }, tier: 1, topRank: null },

  // Matt Haig (2)
  { title: "The Last Family in England", author: "Matt Haig", pageCount: 304, genre: "Fiction", publicationDate: "2004", description: "Haig's debut: a labrador retriever narrates the slow disintegration of the English family he has sworn to protect — a Shakespearean tragedy told from dog height.", series: null, tier: 1, topRank: null },
  { title: "The Dead Fathers Club", author: "Matt Haig", pageCount: 336, genre: "Fiction", publicationDate: "2006", description: "An eleven-year-old boy is visited by the ghost of his recently deceased father, who wants him to kill his uncle — Haig's retelling of Hamlet for a working-class English pub.", series: null, tier: 1, topRank: null },
];

// ── REC LIBRARY (new authors) ────────────────────────────────────────────
const REC_LIBRARY_ADDITIONS = [
  // Ai Jiang (3)
  { title: "Linghun", author: "Ai Jiang", pageCount: 144, genre: "Horror", publicationDate: "2023", description: "Jiang's haunting novella: in a small town called HOME, residents can manifest the ghosts of their loved ones — but only as long as they stay.", series: null, tier: 1, topRank: null },
  { title: "A Palace Near the Wind", author: "Ai Jiang", pageCount: 192, genre: "Fantasy", publicationDate: "2025", description: "Jiang's Ignyte-nominated novella: the first daughter of a wind-clan tribe is promised as a bride to the mechanical king of a rival culture she was raised to fight.", series: null, tier: 1, topRank: null },
  { title: "I Am AI", author: "Ai Jiang", pageCount: 96, genre: "Sci-Fi", publicationDate: "2022", description: "Jiang's Hugo-nominated novella: in a near-future where AI has rendered human writing obsolete, a ghostwriter secretly disguised as AI begins to glitch.", series: null, tier: 1, topRank: null },

  // R.B. Lemberg (2)
  { title: "The Four Profound Weaves", author: "R.B. Lemberg", pageCount: 192, genre: "Fantasy", publicationDate: "2020", description: "Lemberg's novella: two trans elders from rival cultures in the Birdverse travel together to retrieve a sacred woven cloth — and to reclaim their long-delayed lives.", series: null, tier: 1, topRank: null },
  { title: "Geometries of Belonging", author: "R.B. Lemberg", pageCount: 240, genre: "Fantasy", publicationDate: "2022", description: "Lemberg's collection: linked stories set in the Birdverse exploring trans, non-binary, and neurodivergent characters across a vast mythological fantasy.", series: null, tier: 1, topRank: null },

  // Alan Garner (4)
  { title: "The Weirdstone of Brisingamen", author: "Alan Garner", pageCount: 288, genre: "Fantasy", publicationDate: "1960", description: "Garner's debut: two modern Cheshire children discover the quartz their mother gave them is an ancient artifact that awakens a sleeping king — and the evil hunting him.", series: { name: "Tales of Alderley", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "The Moon of Gomrath", author: "Alan Garner", pageCount: 224, genre: "Fantasy", publicationDate: "1963", description: "Tales of Alderley #2: the siblings return to the Cheshire countryside and accidentally release the Old Magic — and an ancient entity called the Brollachan.", series: { name: "Tales of Alderley", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Elidor", author: "Alan Garner", pageCount: 160, genre: "Fantasy", publicationDate: "1965", description: "Four children following a street map in a ruined Manchester neighborhood are drawn into a parallel world called Elidor and are entrusted with its four Treasures.", series: null, tier: 1, topRank: null },
  { title: "The Owl Service", author: "Alan Garner", pageCount: 208, genre: "Fantasy", publicationDate: "1967", description: "Garner's Carnegie-winning novel: three teenagers at a remote Welsh valley house discover a dinner service with an owl pattern — and unwittingly reenact an ancient Welsh myth.", series: null, tier: 1, topRank: null },

  // Peter Dickinson (3)
  { title: "The Weathermonger", author: "Peter Dickinson", pageCount: 176, genre: "Young Adult", publicationDate: "1968", description: "The first Changes Trilogy novel: a 16-year-old boy in a newly medieval England who can control the weather is sent to France — and discovers his own kingdom is under a strange enchantment.", series: { name: "The Changes Trilogy", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "The Devil's Children", author: "Peter Dickinson", pageCount: 176, genre: "Young Adult", publicationDate: "1970", description: "Changes Trilogy #3 (chronologically): a young English girl abandoned during the technology-hating backlash is taken in by a group of Sikh refugees and helps them survive.", series: { name: "The Changes Trilogy", order: 3, total: 3 }, tier: 1, topRank: null },
  { title: "Tulku", author: "Peter Dickinson", pageCount: 240, genre: "Young Adult", publicationDate: "1979", description: "Dickinson's Whitbread-winning novel: during the Boxer Rebellion, a missionary's son flees with a naturalist and is taken into a Tibetan monastery where he may be a reincarnated lama.", series: null, tier: 1, topRank: null },

  // Joan Aiken (4)
  { title: "The Wolves of Willoughby Chase", author: "Joan Aiken", pageCount: 176, genre: "Young Adult", publicationDate: "1962", description: "The first Wolves Chronicles novel: in an alternate-history Victorian England overrun by wolves, two cousins must escape a wicked governess and reclaim their ancestral estate.", series: { name: "The Wolves Chronicles", order: 1, total: 12 }, tier: 1, topRank: null },
  { title: "Black Hearts in Battersea", author: "Joan Aiken", pageCount: 240, genre: "Young Adult", publicationDate: "1964", description: "Wolves Chronicles #2: a young orphan boy arrives in London to study art and is drawn into a Hanoverian plot to overthrow the king.", series: { name: "The Wolves Chronicles", order: 2, total: 12 }, tier: 1, topRank: null },
  { title: "Nightbirds on Nantucket", author: "Joan Aiken", pageCount: 224, genre: "Young Adult", publicationDate: "1966", description: "Wolves Chronicles #3: Dido Twite is rescued at sea and taken to Nantucket by a whaling captain whose daughter has been locked in a tower for years.", series: { name: "The Wolves Chronicles", order: 3, total: 12 }, tier: 1, topRank: null },
  { title: "The Whispering Mountain", author: "Joan Aiken", pageCount: 240, genre: "Young Adult", publicationDate: "1968", description: "A Guardian Award-winning novel loosely connected to the Wolves Chronicles: a Welsh shepherd boy inherits a magical golden harp and must keep it from a wicked Marquess.", series: null, tier: 1, topRank: null },

  // E. Nesbit (4)
  { title: "Five Children and It", author: "E. Nesbit", pageCount: 240, genre: "Young Adult", publicationDate: "1902", description: "Nesbit's classic: five English children on holiday at a sand-pit meet a grumpy Psammead — a sand fairy — who grants them daily wishes they almost always regret.", series: { name: "Psammead Trilogy", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "The Phoenix and the Carpet", author: "E. Nesbit", pageCount: 272, genre: "Young Adult", publicationDate: "1904", description: "Psammead Trilogy #2: the same five children find a phoenix egg in their new wishing carpet and are whisked off on a series of adventures.", series: { name: "Psammead Trilogy", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "The Story of the Amulet", author: "E. Nesbit", pageCount: 272, genre: "Young Adult", publicationDate: "1906", description: "Psammead Trilogy #3: the children rediscover the Psammead in a Bloomsbury pet shop and use an ancient Egyptian amulet to travel through time.", series: { name: "Psammead Trilogy", order: 3, total: 3 }, tier: 1, topRank: null },
  { title: "The Enchanted Castle", author: "E. Nesbit", pageCount: 304, genre: "Young Adult", publicationDate: "1907", description: "Three children staying in the English countryside discover a real enchanted castle and a magic ring that grants wishes — and they quickly realize they are not ready.", series: null, tier: 1, topRank: null },

  // James Thurber (3)
  { title: "The Thirteen Clocks", author: "James Thurber", pageCount: 144, genre: "Fantasy", publicationDate: "1950", description: "Thurber's fairy tale: a wicked duke has stopped all thirteen clocks in his castle and set an impossible task for any prince who comes to rescue his niece.", series: null, tier: 1, topRank: null },
  { title: "Fables for Our Time", author: "James Thurber", pageCount: 128, genre: "Fiction", publicationDate: "1940", description: "Thurber's modern Aesop: short comic fables with moral punchlines, illustrated by the author and widely anthologized in American humor.", series: null, tier: 1, topRank: null },
  { title: "The Wonderful O", author: "James Thurber", pageCount: 96, genre: "Fantasy", publicationDate: "1957", description: "Thurber's fable: a pirate who hates the letter 'O' invades an island and bans its use, with cascading consequences for the islanders' language and lives.", series: null, tier: 1, topRank: null },

  // Karel Čapek (3)
  { title: "War with the Newts", author: "Karel Čapek", pageCount: 368, genre: "Sci-Fi", publicationDate: "1936", description: "Čapek's satirical SF novel: the discovery of a species of intelligent giant newts in the Pacific leads to humanity enslaving them — and then to the newts' eventual revolt.", series: null, tier: 1, topRank: null },
  { title: "R.U.R.", author: "Karel Čapek", pageCount: 128, genre: "Sci-Fi", publicationDate: "1920", description: "Čapek's landmark play: the company Rossum's Universal Robots manufactures artificial workers — 'robots' — who eventually rise up against their creators. The play that coined the word 'robot.'", series: null, tier: 1, topRank: null },
  { title: "The Absolute at Large", author: "Karel Čapek", pageCount: 256, genre: "Sci-Fi", publicationDate: "1922", description: "Čapek's satirical SF: an engineer invents a new kind of power source that releases enormous amounts of energy — and also causes anyone near it to become intensely religious.", series: null, tier: 1, topRank: null },

  // Justina Robson (3)
  { title: "Natural History", author: "Justina Robson", pageCount: 336, genre: "Sci-Fi", publicationDate: "2003", description: "Robson's posthuman SF: in a far future where humans are divided between Unevolved and genetically modified Forged, a war is brewing over an artifact that may be the first alien life ever encountered.", series: null, tier: 1, topRank: null },
  { title: "Living Next Door to the God of Love", author: "Justina Robson", pageCount: 464, genre: "Sci-Fi", publicationDate: "2005", description: "Robson's transhuman novel: a teenage girl runs away to a city on a gas giant where a god-like being has taken human form — and finds herself slowly becoming a god too.", series: null, tier: 1, topRank: null },
  { title: "Keeping It Real", author: "Justina Robson", pageCount: 320, genre: "Fantasy", publicationDate: "2006", description: "The first Quantum Gravity novel: a cyborg government agent is assigned to protect a rock-star elf whose concerts are attracting unwanted attention from across the quantum-stabilized realms.", series: { name: "Quantum Gravity", order: 1, total: 5 }, tier: 1, topRank: null },

  // Sara A. Mueller (1)
  { title: "The Bone Orchard", author: "Sara A. Mueller", pageCount: 416, genre: "Fantasy", publicationDate: "2022", description: "Mueller's debut: in an imperial courtesan's garden grow living women made of bone and mist — and when the emperor is murdered, the courtesan must use them to solve the case.", series: null, tier: 1, topRank: null },

  // Eva Ibbotson (4)
  { title: "Journey to the River Sea", author: "Eva Ibbotson", pageCount: 304, genre: "Young Adult", publicationDate: "2001", description: "Ibbotson's Smarties Prize-winning novel: a young orphan is sent to stay with relatives on a rubber plantation in early 20th-century Brazil and falls in love with the Amazon.", series: null, tier: 1, topRank: null },
  { title: "The Secret of Platform 13", author: "Eva Ibbotson", pageCount: 240, genre: "Young Adult", publicationDate: "1994", description: "Ibbotson's novel (published three years before Harry Potter): a hidden magical platform at King's Cross station leads to an enchanted island, and a prince has been kidnapped from it.", series: null, tier: 1, topRank: null },
  { title: "Which Witch?", author: "Eva Ibbotson", pageCount: 240, genre: "Young Adult", publicationDate: "1979", description: "Ibbotson's comic fantasy: an eccentric wizard decides to hold a contest to choose a bride, and seven witches of northern England all turn up to compete.", series: null, tier: 1, topRank: null },
  { title: "Island of the Aunts", author: "Eva Ibbotson", pageCount: 272, genre: "Young Adult", publicationDate: "1999", description: "Three eccentric aunts who secretly run a hidden island kindly inhabited by magical creatures decide to kidnap a child to help them care for the island.", series: null, tier: 1, topRank: null },

  // John Buchan (4)
  { title: "The Thirty-Nine Steps", author: "John Buchan", pageCount: 192, genre: "Thriller", publicationDate: "1915", description: "Buchan's landmark spy thriller: Richard Hannay is framed for a London murder and flees across Scotland while a German espionage cell pursues him.", series: { name: "Richard Hannay", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "Greenmantle", author: "John Buchan", pageCount: 288, genre: "Thriller", publicationDate: "1916", description: "Richard Hannay #2: Hannay is sent to Constantinople during World War I to investigate reports of a charismatic prophet called Greenmantle who is inciting a Muslim uprising.", series: { name: "Richard Hannay", order: 2, total: 5 }, tier: 1, topRank: null },
  { title: "Mr. Standfast", author: "John Buchan", pageCount: 320, genre: "Thriller", publicationDate: "1919", description: "Richard Hannay #3: Hannay infiltrates a pacifist commune in Scotland to root out a German double agent whose betrayal has been killing British soldiers.", series: { name: "Richard Hannay", order: 3, total: 5 }, tier: 1, topRank: null },
  { title: "The Three Hostages", author: "John Buchan", pageCount: 304, genre: "Thriller", publicationDate: "1924", description: "Richard Hannay #4: Hannay, now a retired Cotswolds squire, is called back into the great game when three prominent young people are kidnapped across Europe.", series: { name: "Richard Hannay", order: 4, total: 5 }, tier: 1, topRank: null },

  // Kugane Maruyama (3)
  { title: "Overlord, Vol. 1: The Undead King", author: "Kugane Maruyama", pageCount: 272, genre: "Sci-Fi", publicationDate: "2010", description: "The first Overlord light novel: a veteran player of a VR MMO is trapped in the game's closing moments — permanently stuck as his skeletal Overlord character Ainz Ooal Gown.", series: { name: "Overlord", order: 1, total: 17 }, tier: 1, topRank: null },
  { title: "Overlord, Vol. 2: The Dark Warrior", author: "Kugane Maruyama", pageCount: 272, genre: "Sci-Fi", publicationDate: "2012", description: "Overlord #2: Ainz adopts a human disguise as the adventurer Momon and enters a nearby kingdom to gather information about the world he's now stuck in.", series: { name: "Overlord", order: 2, total: 17 }, tier: 1, topRank: null },
  { title: "Overlord, Vol. 3: The Bloody Valkyrie", author: "Kugane Maruyama", pageCount: 272, genre: "Sci-Fi", publicationDate: "2012", description: "Overlord #3: Ainz investigates a vampire who has been leaving bodies across the Re-Estize Kingdom — and discovers she is the Bloody Valkyrie Shalltear Bloodfallen, one of his own guardians.", series: { name: "Overlord", order: 3, total: 17 }, tier: 1, topRank: null },

  // Pittacus Lore (4)
  { title: "I Am Number Four", author: "Pittacus Lore", pageCount: 384, genre: "Young Adult", publicationDate: "2010", description: "The first Lorien Legacies novel: a teenage alien hiding on Earth as a normal high school student learns his pursuers have killed three of the other nine survivors — and Number Four is next.", series: { name: "Lorien Legacies", order: 1, total: 7 }, tier: 1, topRank: null },
  { title: "The Power of Six", author: "Pittacus Lore", pageCount: 416, genre: "Young Adult", publicationDate: "2011", description: "Lorien Legacies #2: Number Four is on the run across America while Number Seven tells her own story of growing up in a Spanish convent.", series: { name: "Lorien Legacies", order: 2, total: 7 }, tier: 1, topRank: null },
  { title: "The Rise of Nine", author: "Pittacus Lore", pageCount: 368, genre: "Young Adult", publicationDate: "2012", description: "Lorien Legacies #3: as more of the Garde reunite to train together, the Mogadorian invasion begins to move from Earth's margins into major cities.", series: { name: "Lorien Legacies", order: 3, total: 7 }, tier: 1, topRank: null },
  { title: "The Fall of Five", author: "Pittacus Lore", pageCount: 432, genre: "Young Adult", publicationDate: "2013", description: "Lorien Legacies #4: the Garde finally find Number Five, but the reunion reveals that not all of them are as unified as they thought.", series: { name: "Lorien Legacies", order: 4, total: 7 }, tier: 1, topRank: null },

  // Mat Johnson (3)
  { title: "Pym", author: "Mat Johnson", pageCount: 336, genre: "Fiction", publicationDate: "2011", description: "Johnson's satirical novel: an unemployed Black literature professor obsessed with Edgar Allan Poe's 'The Narrative of Arthur Gordon Pym of Nantucket' organizes an all-Black Antarctic expedition.", series: null, tier: 1, topRank: null },
  { title: "Loving Day", author: "Mat Johnson", pageCount: 304, genre: "Fiction", publicationDate: "2015", description: "Johnson's novel: a biracial comic-book artist inherits a dilapidated Philadelphia mansion and meets the daughter he never knew he had — a young woman who identifies as white.", series: null, tier: 1, topRank: null },
  { title: "Invisible Things", author: "Mat Johnson", pageCount: 336, genre: "Sci-Fi", publicationDate: "2022", description: "Johnson's SF satire: a scientific expedition to Jupiter discovers a secret colony of abducted humans hidden under a dome — and has to decide whether to rescue them.", series: null, tier: 1, topRank: null },

  // Iain Reid (4)
  { title: "I'm Thinking of Ending Things", author: "Iain Reid", pageCount: 224, genre: "Thriller", publicationDate: "2016", description: "Reid's unnerving debut: a young woman accompanies her new boyfriend on a long winter drive to meet his parents at their rural family farm — while thinking about ending their relationship.", series: null, tier: 1, topRank: null },
  { title: "Foe", author: "Iain Reid", pageCount: 272, genre: "Sci-Fi", publicationDate: "2018", description: "A couple in a remote farmhouse is visited by a stranger who says the husband has been chosen for a years-long space-exploration mission — and offers a replacement.", series: null, tier: 1, topRank: null },
  { title: "We Spread", author: "Iain Reid", pageCount: 288, genre: "Thriller", publicationDate: "2022", description: "An aging woman is moved to a small long-term care home where the staff have unusual plans for her — and where the walls themselves seem unsure.", series: null, tier: 1, topRank: null },
  { title: "The Will to Believe", author: "Iain Reid", pageCount: 288, genre: "Thriller", publicationDate: "2025", description: "Reid's newest: a man in a quiet coastal town finds a letter addressed to him from someone who claims to be his future self — and who knows things he has never told anyone.", series: null, tier: 1, topRank: null },

  // Sylvie Germain (3)
  { title: "The Book of Nights", author: "Sylvie Germain", pageCount: 256, genre: "Historical Fiction", publicationDate: "1985", description: "Germain's debut: a French family saga from the Franco-Prussian War to WWII, following the supernatural Péniel family through the century's disasters.", series: null, tier: 1, topRank: null },
  { title: "Night of Amber", author: "Sylvie Germain", pageCount: 256, genre: "Historical Fiction", publicationDate: "1987", description: "A sequel to The Book of Nights: the next generation of the Péniel family navigates post-WWII France and the ancestral curse that haunts their blood.", series: null, tier: 1, topRank: null },
  { title: "The Medusa Child", author: "Sylvie Germain", pageCount: 224, genre: "Fiction", publicationDate: "1991", description: "A young French girl discovers her brother is a killer — and that her gaze has a power she cannot control. Germain's quiet, devastating short novel.", series: null, tier: 1, topRank: null },

  // Natasha Pulley (4)
  { title: "The Watchmaker of Filigree Street", author: "Natasha Pulley", pageCount: 336, genre: "Fantasy", publicationDate: "2015", description: "Pulley's debut: a Home Office clerk in 1883 London receives a mysterious pocket watch that saves his life during a bombing — and meets the Japanese watchmaker who made it.", series: { name: "The Watchmaker", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "The Bedlam Stacks", author: "Natasha Pulley", pageCount: 336, genre: "Fantasy", publicationDate: "2017", description: "A crippled East India Company smuggler in 1859 Peru is sent to steal cuttings from a cinchona tree — and discovers the village near the tree has been cut off from time.", series: null, tier: 1, topRank: null },
  { title: "The Lost Future of Pepperharrow", author: "Natasha Pulley", pageCount: 512, genre: "Fantasy", publicationDate: "2020", description: "Watchmaker of Filigree Street #2: the watchmaker Keita Mori returns to Japan with his friend Thaniel, where electricity has been causing unusual phenomena at the new British embassy.", series: { name: "The Watchmaker", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "The Mars House", author: "Natasha Pulley", pageCount: 448, genre: "Sci-Fi", publicationDate: "2024", description: "Pulley's SF: a climate refugee from a flooded London becomes the translator for a political assassination target on Mars — and must navigate the planet's unfamiliar gravity and politics.", series: null, tier: 1, topRank: null },
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
if (primaryDupes.length > 0) console.log(`⚠ Skipping ${primaryDupes.length} primary duplicates`);
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
if (recDupes.length > 0) console.log(`⚠ Skipping ${recDupes.length} rec library duplicates`);
const nextRec = recBooks.concat(recAdd);
fs.writeFileSync(REC_LIBRARY, JSON.stringify(nextRec));
console.log(`REC LIBRARY: added ${recAdd.length} books, ${beforeR} → ${nextRec.length}`);

const statCat = fs.statSync(CATALOG);
const statRec = fs.statSync(REC_LIBRARY);
console.log(`\nbook-data.json: ${(statCat.size / 1024 / 1024).toFixed(2)} MB`);
console.log(`rec-library.json: ${(statRec.size / 1024).toFixed(1)} KB`);
