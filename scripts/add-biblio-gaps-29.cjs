const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

// ── PRIMARY (existing authors) ────────────────────────────────────────────
const PRIMARY_ADDITIONS = [
  // Clark Ashton Smith (3)
  { title: "Zothique", author: "Clark Ashton Smith", pageCount: 224, genre: "Fantasy", publicationDate: "1970", description: "A collection of Smith's Zothique stories: tales of the last continent on a dying future Earth, where necromancers and moribund gods preside over a world of decadent magic.", series: null, tier: 1, topRank: null },
  { title: "The City of the Singing Flame", author: "Clark Ashton Smith", pageCount: 256, genre: "Fantasy", publicationDate: "1931", description: "Smith's science-fantasy collection built around the title novelette: a poet discovers a portal to another dimension where travelers willingly step into an ever-burning flame.", series: null, tier: 1, topRank: null },
  { title: "The End of the Story", author: "Clark Ashton Smith", pageCount: 336, genre: "Fantasy", publicationDate: "2006", description: "The first volume of Smith's collected fantasies from Night Shade Books: early horror and weird tales including the title story of a medieval scholar lured by a beautiful serpent-woman.", series: null, tier: 1, topRank: null },

  // John Crowley (3)
  { title: "Love & Sleep", author: "John Crowley", pageCount: 528, genre: "Fiction", publicationDate: "1994", description: "Aegypt #2: Pierce Moffett continues his research into the hidden history of Aegypt in a Kentucky childhood flashback and a contemporary mid-life crisis.", series: { name: "Aegypt", order: 2, total: 4 }, tier: 1, topRank: null },
  { title: "Daemonomania", author: "John Crowley", pageCount: 464, genre: "Fiction", publicationDate: "2000", description: "Aegypt #3: Pierce's research and his life in a small Faraway Hills town converge around a hidden conflict that has shaped Western magic since the Renaissance.", series: { name: "Aegypt", order: 3, total: 4 }, tier: 1, topRank: null },
  { title: "Endless Things", author: "John Crowley", pageCount: 336, genre: "Fiction", publicationDate: "2007", description: "Aegypt #4: the final volume of Crowley's tetralogy, as Pierce reaches the end of his research and the hidden history finally reveals itself — or does not.", series: { name: "Aegypt", order: 4, total: 4 }, tier: 1, topRank: null },

  // Dino Buzzati (2)
  { title: "Poem Strip", author: "Dino Buzzati", pageCount: 224, genre: "Graphic Novel", publicationDate: "1969", description: "Buzzati's experimental graphic novel, an Orpheus retelling set in contemporary Milan: a pop musician follows his dead girlfriend to a hell that looks like a nightclub.", series: null, tier: 1, topRank: null },
  { title: "Bàrnabo of the Mountains", author: "Dino Buzzati", pageCount: 128, genre: "Fiction", publicationDate: "1933", description: "Buzzati's debut: a young forest ranger in the Dolomites is dismissed after failing to defend a remote powder magazine against bandits, and spends years in solitary redemption.", series: null, tier: 1, topRank: null },

  // Robin McKinley (3)
  { title: "Rose Daughter", author: "Robin McKinley", pageCount: 304, genre: "Fantasy", publicationDate: "1997", description: "McKinley's second Beauty and the Beast retelling, written two decades after Beauty: a quieter, rose-saturated version in which the youngest sister goes to live at the Beast's strange country estate.", series: null, tier: 1, topRank: null },
  { title: "The Outlaws of Sherwood", author: "Robin McKinley", pageCount: 288, genre: "Historical Fiction", publicationDate: "1988", description: "McKinley's realist retelling of Robin Hood: a nervous forester accidentally kills a man at an archery tournament and flees to Sherwood, becoming the reluctant leader of outlaws.", series: null, tier: 1, topRank: null },
  { title: "Dragonhaven", author: "Robin McKinley", pageCount: 352, genre: "Fantasy", publicationDate: "2007", description: "A teenage boy growing up on a near-future dragon refuge discovers an orphaned dragon hatchling and must raise her in secret — because dragons are illegal and hunted.", series: null, tier: 1, topRank: null },

  // Katherine Addison (2)
  { title: "The Angel of the Crows", author: "Katherine Addison", pageCount: 448, genre: "Fantasy", publicationDate: "2020", description: "Addison's Sherlock Holmes reimagining: a man returning injured from the Anglo-Afghan War takes rooms with a mysterious detective who happens to be a fallen angel.", series: null, tier: 1, topRank: null },
  { title: "The Tomb of Dragons", author: "Katherine Addison", pageCount: 336, genre: "Fantasy", publicationDate: "2025", description: "The Cemeteries of Amalo #3: Thara Celehar investigates the murder of a dragon and uncovers a conspiracy that reaches into the highest levels of the Ethuveraz.", series: { name: "The Cemeteries of Amalo", order: 3, total: 3 }, tier: 1, topRank: null },

  // Ellen Kushner (1)
  { title: "Thomas the Rhymer", author: "Ellen Kushner", pageCount: 256, genre: "Fantasy", publicationDate: "1990", description: "Kushner's World Fantasy Award-winning retelling of the Scottish ballad: a minstrel in the Borders country is taken by the Queen of Elfland and returned years later unable to tell a lie.", series: null, tier: 1, topRank: null },

  // Matt Bell (2)
  { title: "Scrapper", author: "Matt Bell", pageCount: 336, genre: "Fiction", publicationDate: "2015", description: "A salvage hunter in the ruins of abandoned Detroit discovers a kidnapped boy in an empty factory — and becomes the only person who can save him.", series: null, tier: 1, topRank: null },
  { title: "In the House upon the Dirt Between the Lake and the Woods", author: "Matt Bell", pageCount: 320, genre: "Fiction", publicationDate: "2013", description: "Bell's fable-like debut: a young man and his wife move to a house by a lake in a forest and begin to cope with their inability to have a child.", series: null, tier: 1, topRank: null },

  // Leslie Marmon Silko (1)
  { title: "Gardens in the Dunes", author: "Leslie Marmon Silko", pageCount: 496, genre: "Historical Fiction", publicationDate: "1999", description: "Silko's novel: a Sand Lizard girl at the turn of the 20th century is taken from her tribal land and passes through a series of gardens — from indigenous to white — as her world collapses around her.", series: null, tier: 1, topRank: null },
];

// ── REC LIBRARY (new authors) ────────────────────────────────────────────
const REC_LIBRARY_ADDITIONS = [
  // Talbot Mundy (3)
  { title: "King of the Khyber Rifles", author: "Talbot Mundy", pageCount: 368, genre: "Historical Fiction", publicationDate: "1916", description: "Mundy's adventure novel of British India during WWI: a captain of the Khyber Rifles goes undercover to prevent a German-instigated Muslim uprising.", series: null, tier: 1, topRank: null },
  { title: "The Nine Unknown", author: "Talbot Mundy", pageCount: 304, genre: "Fantasy", publicationDate: "1923", description: "Mundy's pulp adventure: a secret society of nine Indian sages has been guarding nine books of forbidden wisdom for centuries — and a Western adventurer intends to find them.", series: null, tier: 1, topRank: null },
  { title: "Tros of Samothrace", author: "Talbot Mundy", pageCount: 960, genre: "Historical Fiction", publicationDate: "1934", description: "Mundy's sprawling novel of a Greek hero who sails the Roman world in opposition to Julius Caesar — an early influence on sword-and-sorcery fiction.", series: null, tier: 1, topRank: null },

  // Sax Rohmer (3)
  { title: "The Mystery of Dr. Fu-Manchu", author: "Sax Rohmer", pageCount: 272, genre: "Thriller", publicationDate: "1913", description: "Rohmer's notorious pulp: a British doctor and a former police official hunt the enigmatic Chinese mastermind Dr. Fu-Manchu, who is using his scientific genius against the West.", series: { name: "Fu-Manchu", order: 1, total: 14 }, tier: 1, topRank: null },
  { title: "The Return of Dr. Fu-Manchu", author: "Sax Rohmer", pageCount: 272, genre: "Thriller", publicationDate: "1916", description: "Fu-Manchu #2: Nayland Smith returns from Burma to find Fu-Manchu also back in London and plotting a new campaign against the British Empire.", series: { name: "Fu-Manchu", order: 2, total: 14 }, tier: 1, topRank: null },
  { title: "The Hand of Fu-Manchu", author: "Sax Rohmer", pageCount: 272, genre: "Thriller", publicationDate: "1917", description: "Fu-Manchu #3: Smith and Petrie face the doctor's daughter Fah Lo Suee and his Si-Fan assassins across England and France.", series: { name: "Fu-Manchu", order: 3, total: 14 }, tier: 1, topRank: null },

  // Edgar Wallace (3)
  { title: "The Four Just Men", author: "Edgar Wallace", pageCount: 192, genre: "Thriller", publicationDate: "1905", description: "Wallace's debut: four gentlemen-vigilantes who execute those the law cannot touch publicly warn a British Foreign Secretary they will kill him if he passes an extradition bill.", series: null, tier: 1, topRank: null },
  { title: "The Clue of the Twisted Candle", author: "Edgar Wallace", pageCount: 272, genre: "Mystery", publicationDate: "1916", description: "Wallace's locked-room mystery: a Greek blackmailer is found dead in his sealed study, and the only clue is a twisted candle burning on his desk.", series: null, tier: 1, topRank: null },
  { title: "The Ringer", author: "Edgar Wallace", pageCount: 288, genre: "Thriller", publicationDate: "1925", description: "A master criminal known as the Ringer — a man of many disguises — returns from Australia seeking revenge on a corrupt London solicitor.", series: null, tier: 1, topRank: null },

  // James Gunn (3)
  { title: "The Listeners", author: "James Gunn", pageCount: 288, genre: "Sci-Fi", publicationDate: "1972", description: "Gunn's SETI novel: over generations, a team of scientists waits and listens for an extraterrestrial signal — and then finally receives one from Capella.", series: null, tier: 1, topRank: null },
  { title: "The Immortals", author: "James Gunn", pageCount: 208, genre: "Sci-Fi", publicationDate: "1962", description: "Gunn's fix-up novel of a small group of genetically immortal humans hunted by a medical-industrial complex that wants their blood for eternal life.", series: null, tier: 1, topRank: null },
  { title: "Kampus", author: "James Gunn", pageCount: 240, genre: "Sci-Fi", publicationDate: "1977", description: "Gunn's near-future satire of American universities: a vast chaotic campus where students live entirely outside the law, in a culture that has essentially abandoned them.", series: null, tier: 1, topRank: null },

  // James Patrick Kelly (3)
  { title: "Think Like a Dinosaur and Other Stories", author: "James Patrick Kelly", pageCount: 256, genre: "Sci-Fi", publicationDate: "1995", description: "Kelly's story collection built around his Hugo-winning title novelette: a humane examination of teleportation ethics set on a colony world run by dinosaur-like aliens.", series: null, tier: 1, topRank: null },
  { title: "Burn", author: "James Patrick Kelly", pageCount: 176, genre: "Sci-Fi", publicationDate: "2005", description: "Kelly's Nebula-winning novella: a resident of an eco-fanatic colony world is confronted by a firefighter from another Earth — the same Earth his people fled centuries ago.", series: null, tier: 1, topRank: null },
  { title: "Wildlife", author: "James Patrick Kelly", pageCount: 304, genre: "Sci-Fi", publicationDate: "1994", description: "Kelly's fix-up novel: linked stories about a near-future where genetic engineering has produced new human subspecies and the old kind is being phased out.", series: null, tier: 1, topRank: null },

  // George Alec Effinger (3)
  { title: "When Gravity Fails", author: "George Alec Effinger", pageCount: 288, genre: "Sci-Fi", publicationDate: "1987", description: "The first Budayeen novel: in a 22nd-century Muslim city quarter called the Budayeen, a private investigator who refuses body modifications takes a case that may finally force him to get one.", series: { name: "Budayeen", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "A Fire in the Sun", author: "George Alec Effinger", pageCount: 304, genre: "Sci-Fi", publicationDate: "1989", description: "Budayeen #2: Marid Audran, now an officer of the law, investigates a series of brutal murders — while also discovering what his own upgraded brain can do.", series: { name: "Budayeen", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "The Exile Kiss", author: "George Alec Effinger", pageCount: 304, genre: "Sci-Fi", publicationDate: "1991", description: "Budayeen #3: Marid is kidnapped and left to die in the Arabian desert — and must survive long enough to return and destroy the man who put him there.", series: { name: "Budayeen", order: 3, total: 3 }, tier: 1, topRank: null },

  // Jeremy Robert Johnson (3)
  { title: "Skullcrack City", author: "Jeremy Robert Johnson", pageCount: 336, genre: "Horror", publicationDate: "2015", description: "Johnson's bizarro horror: a low-level money launderer discovers his employers are a pharmaceutical cult bred to become post-human — and he's been chosen to join them.", series: null, tier: 1, topRank: null },
  { title: "The Loop", author: "Jeremy Robert Johnson", pageCount: 336, genre: "Horror", publicationDate: "2020", description: "A small Oregon town is engulfed in a quiet horror: residents begin attacking each other with meticulous, coordinated violence — and a teenage survivor tries to figure out why.", series: null, tier: 1, topRank: null },
  { title: "Entropy in Bloom", author: "Jeremy Robert Johnson", pageCount: 320, genre: "Horror", publicationDate: "2017", description: "Johnson's first major story collection: twenty tales of bizarro and literary horror, including his widely anthologized 'The Sleep of Judges.'", series: null, tier: 1, topRank: null },

  // Lisa Goldstein (3)
  { title: "The Red Magician", author: "Lisa Goldstein", pageCount: 208, genre: "Fantasy", publicationDate: "1982", description: "Goldstein's debut: a young Jewish girl in a Carpathian village in the 1930s encounters a traveling red magician and a dybbuk — and then the war comes.", series: null, tier: 1, topRank: null },
  { title: "Tourists", author: "Lisa Goldstein", pageCount: 256, genre: "Fantasy", publicationDate: "1989", description: "An American family traveling in a fictional Middle Eastern country called Amaz discovers the country's 'tourist' class is actually a caste of permanent wandering souls.", series: null, tier: 1, topRank: null },
  { title: "The Uncertain Places", author: "Lisa Goldstein", pageCount: 272, genre: "Fantasy", publicationDate: "2011", description: "A Berkeley student in 1971 meets a wealthy Napa Valley family whose women have all been promised to Faerie for seven years at a time — and that time is nearly up.", series: null, tier: 1, topRank: null },

  // Barry Hughart (3)
  { title: "Bridge of Birds", author: "Barry Hughart", pageCount: 304, genre: "Fantasy", publicationDate: "1984", description: "Hughart's World Fantasy Award-winning novel: in an ancient China that never quite was, a young villager hires a drunken old sage named Master Li to cure a poisoning at his silk factory.", series: { name: "Master Li and Number Ten Ox", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "The Story of the Stone", author: "Barry Hughart", pageCount: 272, genre: "Fantasy", publicationDate: "1988", description: "Master Li #2: a murder at a Taoist monastery draws Li Kao and his assistant into a tangle of ancient wizard grudges and one particular unexplained stone.", series: { name: "Master Li and Number Ten Ox", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Eight Skilled Gentlemen", author: "Barry Hughart", pageCount: 256, genre: "Fantasy", publicationDate: "1990", description: "Master Li #3: a mandarin's murder and an explosion of magic in the imperial city bring Master Li and Number Ten Ox face to face with eight supernatural beings.", series: { name: "Master Li and Number Ten Ox", order: 3, total: 3 }, tier: 1, topRank: null },

  // Jacek Dukaj (2)
  { title: "Ice", author: "Jacek Dukaj", pageCount: 1056, genre: "Sci-Fi", publicationDate: "2007", description: "Dukaj's alternate-history epic: in a 1924 where the Tunguska event froze a vast area of Siberia in ice and altered history, a Polish mathematician travels east by train.", series: null, tier: 1, topRank: null },
  { title: "The Old Axolotl", author: "Jacek Dukaj", pageCount: 288, genre: "Sci-Fi", publicationDate: "2015", description: "Dukaj's post-apocalyptic novella: a cosmic disaster kills all biological life on Earth — and leaves a few humans uploaded into mechanical bodies trying to continue civilization.", series: null, tier: 1, topRank: null },

  // Marek Krajewski (3)
  { title: "Death in Breslau", author: "Marek Krajewski", pageCount: 224, genre: "Mystery", publicationDate: "1999", description: "The first Eberhard Mock novel: in 1933 Breslau, a corrupt, alcoholic police officer investigates a ritualistic double murder with pre-Nazi occult overtones.", series: { name: "Eberhard Mock", order: 1, total: 7 }, tier: 1, topRank: null },
  { title: "The End of the World in Breslau", author: "Marek Krajewski", pageCount: 256, genre: "Mystery", publicationDate: "2003", description: "Eberhard Mock #2: a series of elaborate tortures and murders in 1927 Breslau points to a conspiracy involving the city's oldest and most secret society.", series: { name: "Eberhard Mock", order: 2, total: 7 }, tier: 1, topRank: null },
  { title: "Phantoms of Breslau", author: "Marek Krajewski", pageCount: 288, genre: "Mystery", publicationDate: "2005", description: "Eberhard Mock #3: in 1919 Breslau, young Mock faces the aftermath of WWI and a series of killings that may be the work of an enemy from his wartime service.", series: { name: "Eberhard Mock", order: 3, total: 7 }, tier: 1, topRank: null },

  // Megan Whalen Turner (4)
  { title: "The Thief", author: "Megan Whalen Turner", pageCount: 224, genre: "Young Adult", publicationDate: "1996", description: "The first Queen's Thief novel: a cocky young thief named Gen is broken out of the king's prison to steal a legendary artifact from a neighboring kingdom's oldest temple.", series: { name: "The Queen's Thief", order: 1, total: 6 }, tier: 1, topRank: null },
  { title: "The Queen of Attolia", author: "Megan Whalen Turner", pageCount: 352, genre: "Young Adult", publicationDate: "2000", description: "Queen's Thief #2: Gen is captured by the brutal Queen of Attolia and returned to his own queen changed — and the political map of the peninsula begins to rearrange itself.", series: { name: "The Queen's Thief", order: 2, total: 6 }, tier: 1, topRank: null },
  { title: "The King of Attolia", author: "Megan Whalen Turner", pageCount: 400, genre: "Young Adult", publicationDate: "2006", description: "Queen's Thief #3: the arrogant Eugenides becomes the disrespected new King of Attolia and begins a quiet campaign to earn the loyalty of his own guard.", series: { name: "The Queen's Thief", order: 3, total: 6 }, tier: 1, topRank: null },
  { title: "A Conspiracy of Kings", author: "Megan Whalen Turner", pageCount: 320, genre: "Young Adult", publicationDate: "2010", description: "Queen's Thief #4: Sophos, the reluctant heir of Sounis, is kidnapped and held prisoner while his country is invaded and he must decide whether to claim the throne.", series: { name: "The Queen's Thief", order: 4, total: 6 }, tier: 1, topRank: null },

  // Laurie J. Marks (4)
  { title: "Fire Logic", author: "Laurie J. Marks", pageCount: 416, genre: "Fantasy", publicationDate: "2002", description: "The first Elemental Logic novel: in a conquered country, a fire-talented warrior-healer joins a scattered resistance — and finds herself drawn to a prisoner from the invaders' own forces.", series: { name: "Elemental Logic", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "Earth Logic", author: "Laurie J. Marks", pageCount: 416, genre: "Fantasy", publicationDate: "2004", description: "Elemental Logic #2: the resistance to the Sainnite occupation shifts as an earth-talented witch-child emerges — a figure who can rewrite the paths of a country's history.", series: { name: "Elemental Logic", order: 2, total: 4 }, tier: 1, topRank: null },
  { title: "Water Logic", author: "Laurie J. Marks", pageCount: 432, genre: "Fantasy", publicationDate: "2007", description: "Elemental Logic #3: Zanja travels on behalf of the new government while water-talented witches try to reconcile the Shaftali people with their hostile occupiers.", series: { name: "Elemental Logic", order: 3, total: 4 }, tier: 1, topRank: null },
  { title: "Air Logic", author: "Laurie J. Marks", pageCount: 480, genre: "Fantasy", publicationDate: "2019", description: "Elemental Logic #4: the conclusion of Marks's tetralogy, as a network of air-talented spies tries to hold together a peace that many on both sides refuse to accept.", series: { name: "Elemental Logic", order: 4, total: 4 }, tier: 1, topRank: null },

  // Alexander Jablokov (3)
  { title: "Carve the Sky", author: "Alexander Jablokov", pageCount: 304, genre: "Sci-Fi", publicationDate: "1991", description: "Jablokov's debut: in a 24th century solar system of baroque political neo-medievalism, a young art expert investigates a mysterious forgery and uncovers a revolution.", series: null, tier: 1, topRank: null },
  { title: "A Deeper Sea", author: "Alexander Jablokov", pageCount: 288, genre: "Sci-Fi", publicationDate: "1992", description: "Jablokov's second novel: a Russian scientist who develops a way to communicate with dolphins is caught between competing governments — and the dolphins have their own agenda.", series: null, tier: 1, topRank: null },
  { title: "Nimbus", author: "Alexander Jablokov", pageCount: 352, genre: "Sci-Fi", publicationDate: "1993", description: "Jablokov's novel of a near-future Boston where memory-extraction technology allows private investigators to literally reconstruct a person's life from their own neural residue.", series: null, tier: 1, topRank: null },

  // Delia Sherman (3)
  { title: "The Porcelain Dove", author: "Delia Sherman", pageCount: 416, genre: "Fantasy", publicationDate: "1993", description: "A French Revolution-era fairy tale narrated by the servant of a cruel duchess: the fate of a noble family whose ancestor was cursed for refusing hospitality to a hungry beggar.", series: null, tier: 1, topRank: null },
  { title: "The Freedom Maze", author: "Delia Sherman", pageCount: 272, genre: "Young Adult", publicationDate: "2011", description: "A young white girl in 1960s Louisiana is sent back in time to 1860 and mistaken for a mixed-race slave — Sherman's unflinching YA time-travel novel.", series: null, tier: 1, topRank: null },
  { title: "Changeling", author: "Delia Sherman", pageCount: 320, genre: "Young Adult", publicationDate: "2006", description: "A girl who was swapped with a changeling as a baby lives her whole life in the magical under-New-York — and finally meets the girl who took her place above.", series: null, tier: 1, topRank: null },

  // Joyce Carol Oates (5)
  { title: "Zombie", author: "Joyce Carol Oates", pageCount: 192, genre: "Horror", publicationDate: "1995", description: "Oates's Bram Stoker-winning novel: a thinly fictionalized version of Jeffrey Dahmer narrating his attempts to create a compliant 'zombie' lover through lobotomy.", series: null, tier: 1, topRank: null },
  { title: "The Accursed", author: "Joyce Carol Oates", pageCount: 688, genre: "Horror", publicationDate: "2013", description: "Oates's gothic historical horror: a curse descends on Princeton, New Jersey in 1905, affecting Woodrow Wilson, Grover Cleveland, and Upton Sinclair — and causing impossible disappearances.", series: null, tier: 1, topRank: null },
  { title: "Beasts", author: "Joyce Carol Oates", pageCount: 144, genre: "Horror", publicationDate: "2002", description: "Oates's novella: a former student returns to a remote New England college to investigate the death of her favorite professor — and meets the charismatic new poet who has replaced him.", series: null, tier: 1, topRank: null },
  { title: "Haunted: Tales of the Grotesque", author: "Joyce Carol Oates", pageCount: 336, genre: "Horror", publicationDate: "1994", description: "Oates's first horror story collection: sixteen tales of domestic dread, small-town violence, and the grotesque intruding into ordinary American life.", series: null, tier: 1, topRank: null },
  { title: "We Were the Mulvaneys", author: "Joyce Carol Oates", pageCount: 464, genre: "Fiction", publicationDate: "1996", description: "Oates's Oprah-selection novel: an idyllic upstate New York family collapses after their daughter is raped at a school dance, told decades later by the youngest son.", series: null, tier: 1, topRank: null },

  // Charles L. Grant (3)
  { title: "The Hour of the Oxrun Dead", author: "Charles L. Grant", pageCount: 176, genre: "Horror", publicationDate: "1977", description: "Grant's first Oxrun Station novel: in a quiet Connecticut town, the widow of a philandering husband discovers her community has been systematically killing its troublemakers for centuries.", series: { name: "Oxrun Station", order: 1, total: 11 }, tier: 1, topRank: null },
  { title: "The Nestling", author: "Charles L. Grant", pageCount: 288, genre: "Horror", publicationDate: "1982", description: "Grant's quiet horror novel: in a desolate California mountain town, residents are being killed by an ancient predator — and the only warning is the sound of its wings.", series: null, tier: 1, topRank: null },
  { title: "The Pet", author: "Charles L. Grant", pageCount: 320, genre: "Horror", publicationDate: "1986", description: "A bullied teenage boy in Oxrun Station makes up an imaginary horse as his pet — until it begins to manifest and kill the people tormenting him.", series: null, tier: 1, topRank: null },

  // Chet Williamson (3)
  { title: "Soulstorm", author: "Chet Williamson", pageCount: 384, genre: "Horror", publicationDate: "1986", description: "A writer hired to research a haunted English manor discovers its ghosts are multiplying — and that his own grief may be feeding them.", series: null, tier: 1, topRank: null },
  { title: "Ash Wednesday", author: "Chet Williamson", pageCount: 384, genre: "Horror", publicationDate: "1987", description: "On a single Ash Wednesday, every person who has ever died suddenly and violently in a small Pennsylvania town reappears as a silent, standing shadow.", series: null, tier: 1, topRank: null },
  { title: "Reign", author: "Chet Williamson", pageCount: 368, genre: "Horror", publicationDate: "1990", description: "An English stage company mounts an ill-advised production of Macbeth in a condemned London theater — and the play's curse begins to literally come true.", series: null, tier: 1, topRank: null },

  // Sarah Zettel (3)
  { title: "Reclamation", author: "Sarah Zettel", pageCount: 432, genre: "Sci-Fi", publicationDate: "1996", description: "Zettel's debut: a galactic civilization has abandoned a colony world, and centuries later the descendants of the abandoned are beginning to develop psychic powers.", series: null, tier: 1, topRank: null },
  { title: "A Taste of the Nightlife", author: "Sarah Zettel", pageCount: 336, genre: "Fantasy", publicationDate: "2011", description: "The first Vampire Chef Mystery: a Manhattan restaurant owner whose vampire brother is accused of murder must prove his innocence while keeping the vamp/human tension in her restaurant from killing it.", series: { name: "Vampire Chef", order: 1, total: 2 }, tier: 1, topRank: null },
  { title: "In Camelot's Shadow", author: "Sarah Zettel", pageCount: 448, genre: "Historical Fiction", publicationDate: "2004", description: "The first Paths to Camelot novel: a young noblewoman cursed by a dark wizard flees to Arthur's court and finds protection in the knight Gawain.", series: { name: "Paths to Camelot", order: 1, total: 4 }, tier: 1, topRank: null },

  // Rachel Pollack (3)
  { title: "Unquenchable Fire", author: "Rachel Pollack", pageCount: 384, genre: "Fantasy", publicationDate: "1988", description: "Pollack's Arthur C. Clarke Award-winning novel: in an alternate America transformed by a spiritual revolution in 1934, an ordinary woman in Poughkeepsie becomes pregnant by a vision.", series: null, tier: 1, topRank: null },
  { title: "Temporary Agency", author: "Rachel Pollack", pageCount: 272, genre: "Fantasy", publicationDate: "1994", description: "The sequel to Unquenchable Fire: a teenage girl gets a summer job at an 'Agency' that helps people with minor magical problems — and stumbles onto a major one.", series: null, tier: 1, topRank: null },
  { title: "Godmother Night", author: "Rachel Pollack", pageCount: 336, genre: "Fantasy", publicationDate: "1996", description: "Pollack's World Fantasy Award-winning novel: a lesbian couple in a contemporary American city finds their godmother is Death herself — and she has plans for their unborn daughter.", series: null, tier: 1, topRank: null },

  // Gwyneth Jones (3)
  { title: "Bold as Love", author: "Gwyneth Jones", pageCount: 416, genre: "Sci-Fi", publicationDate: "2001", description: "Jones's Clarke Award-winning novel: in a near-future post-devolution England, three rock stars are accidentally crowned the ruling triumvirate of a broken Britain.", series: { name: "Bold as Love", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "White Queen", author: "Gwyneth Jones", pageCount: 320, genre: "Sci-Fi", publicationDate: "1991", description: "The first Aleutian Trilogy: when alien visitors arrive on Earth looking for a place to settle, a small group of humans works to figure out what they actually want.", series: { name: "Aleutian Trilogy", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Life", author: "Gwyneth Jones", pageCount: 416, genre: "Sci-Fi", publicationDate: "2004", description: "Jones's near-future novel about a biologist whose discovery of a new kind of genetic exchange between men and women triggers a global gender reckoning.", series: null, tier: 1, topRank: null },
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
