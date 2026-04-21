const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

// ── Books for existing authors → primary catalog (book-data.json) ──────────
const PRIMARY_ADDITIONS = [
  // John Langan (2 → 4)
  { title: "House of Windows", author: "John Langan", pageCount: 336, genre: "Horror", publicationDate: "2009", description: "Langan's debut novel: a widow tells the story of her husband's feud with his academic father and the cursed house in upstate New York that unmade them both.", series: null, tier: 1, topRank: null },
  { title: "Mr. Gaunt and Other Uneasy Encounters", author: "John Langan", pageCount: 256, genre: "Horror", publicationDate: "2008", description: "Langan's first story collection: five tales of literary weird horror, including the title novella of a Victorian aristocrat and the thing that inhabits his ancestral estate.", series: null, tier: 1, topRank: null },

  // George R.R. Martin (14 → 18)
  { title: "Windhaven", author: "George R.R. Martin", pageCount: 368, genre: "Sci-Fi", publicationDate: "1981", description: "Martin's collaboration with Lisa Tuttle: on a colony world whose settlers use manufactured wings to fly between islands, a lowborn girl fights to join the aristocratic flyer corps.", series: null, tier: 1, topRank: null },
  { title: "Dying of the Light", author: "George R.R. Martin", pageCount: 368, genre: "Sci-Fi", publicationDate: "1977", description: "Martin's first novel: a man follows an old lover to a drifting planet whose ancient festival has ended, and finds himself caught in a dying culture's lethal honor codes.", series: null, tier: 1, topRank: null },
  { title: "The Armageddon Rag", author: "George R.R. Martin", pageCount: 400, genre: "Horror", publicationDate: "1983", description: "A failed novelist investigates the murder of a 1960s rock impresario and stumbles onto a plan to reunite a vanished band — and possibly resurrect the counterculture's dead.", series: null, tier: 1, topRank: null },
  { title: "Sandkings", author: "George R.R. Martin", pageCount: 400, genre: "Sci-Fi", publicationDate: "1981", description: "Martin's Hugo- and Nebula-winning story collection, including the title novelette of an ambitious collector whose strange new pets begin worshipping him — and then stop.", series: null, tier: 1, topRank: null },

  // Anne McCaffrey (7 → 15)
  { title: "Moreta: Dragonlady of Pern", author: "Anne McCaffrey", pageCount: 400, genre: "Fantasy", publicationDate: "1983", description: "A prequel set a thousand Turns before the original Pern trilogy: dragonrider Moreta leads the fight against a deadly plague sweeping the planet.", series: { name: "Dragonriders of Pern", order: null, total: 22 }, tier: 1, topRank: null },
  { title: "Dragonsdawn", author: "Anne McCaffrey", pageCount: 432, genre: "Sci-Fi", publicationDate: "1988", description: "The founding of Pern: a colony expedition lands on a distant world and confronts the first Threadfall — the origin story of the dragons and the Weyr.", series: { name: "Dragonriders of Pern", order: null, total: 22 }, tier: 1, topRank: null },
  { title: "The Renegades of Pern", author: "Anne McCaffrey", pageCount: 480, genre: "Fantasy", publicationDate: "1989", description: "The story of the Holdless — Pern's outcasts and drifters — told against the backdrop of the Ninth Pass's political upheavals.", series: { name: "Dragonriders of Pern", order: null, total: 22 }, tier: 1, topRank: null },
  { title: "All the Weyrs of Pern", author: "Anne McCaffrey", pageCount: 432, genre: "Fantasy", publicationDate: "1991", description: "The AI system AIVAS, rediscovered at Landing, offers Pern a plan to end Threadfall forever — if the dragonriders can muster the will to carry it out.", series: { name: "Dragonriders of Pern", order: null, total: 22 }, tier: 1, topRank: null },
  { title: "The Skies of Pern", author: "Anne McCaffrey", pageCount: 416, genre: "Fantasy", publicationDate: "2001", description: "With Thread's final Pass ending, the dragonriders face a new threat — a rogue comet fragment — and a changing social order on a planet that no longer needs them.", series: { name: "Dragonriders of Pern", order: null, total: 22 }, tier: 1, topRank: null },
  { title: "Dragonseye", author: "Anne McCaffrey", pageCount: 352, genre: "Fantasy", publicationDate: "1997", description: "Set between the first and second Passes of Thread, three generations after Dragonsdawn — the dragonriders must remind a comfortable population of the threat from the sky.", series: { name: "Dragonriders of Pern", order: null, total: 22 }, tier: 1, topRank: null },
  { title: "The Rowan", author: "Anne McCaffrey", pageCount: 352, genre: "Sci-Fi", publicationDate: "1990", description: "The first Tower and the Hive novel: a traumatized young orphan grows up to become the most powerful Prime telepath in the human federation.", series: { name: "The Tower and the Hive", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "To Ride Pegasus", author: "Anne McCaffrey", pageCount: 240, genre: "Sci-Fi", publicationDate: "1973", description: "The first Talent novel: linked stories charting the first generation of psychic humans — the 'Talents' — fighting for legal recognition in a hostile near-future.", series: { name: "The Talent", order: 1, total: 3 }, tier: 1, topRank: null },

  // Harlan Ellison (2 → 5)
  { title: "The Beast That Shouted Love at the Heart of the World", author: "Harlan Ellison", pageCount: 224, genre: "Sci-Fi", publicationDate: "1969", description: "Ellison's Hugo-winning story collection from the late 1960s, including 'A Boy and His Dog' and the title story that became synonymous with his era's New Wave SF.", series: null, tier: 1, topRank: null },
  { title: "Shatterday", author: "Harlan Ellison", pageCount: 320, genre: "Sci-Fi", publicationDate: "1980", description: "Ellison's collection including 'Jeffty Is Five,' 'Count the Clock That Tells the Time,' and 'Shoppe Keeper' — some of his most influential late-career stories.", series: null, tier: 1, topRank: null },
  { title: "Strange Wine", author: "Harlan Ellison", pageCount: 272, genre: "Sci-Fi", publicationDate: "1978", description: "Ellison's collection of 'fifteen new stories from the nightside of the world,' including 'Croatoan' and 'The Deathbird'-era dark fantasy.", series: null, tier: 1, topRank: null },

  // A.E. van Vogt (3 → 6)
  { title: "The Weapon Shops of Isher", author: "A.E. van Vogt", pageCount: 240, genre: "Sci-Fi", publicationDate: "1951", description: "In a future autocratic Earth, a network of weapon shops exists in a legal paradox — 'the right to buy weapons is the right to be free' — as a resistance to the Empress.", series: null, tier: 1, topRank: null },
  { title: "Empire of the Atom", author: "A.E. van Vogt", pageCount: 240, genre: "Sci-Fi", publicationDate: "1956", description: "Van Vogt's fix-up of his Mutant Master stories: a mutant child becomes emperor of a post-atomic feudal interstellar dominion — a deliberate echo of the Claudius story.", series: null, tier: 1, topRank: null },
  { title: "The Players of Null-A", author: "A.E. van Vogt", pageCount: 240, genre: "Sci-Fi", publicationDate: "1956", description: "The sequel to The World of Null-A: Gilbert Gosseyn, the rebuilt man whose mind can tap every copy of itself across the galaxy, must confront the Players behind his creation.", series: null, tier: 1, topRank: null },

  // Osamu Tezuka (2 → 4)
  { title: "Phoenix, Vol. 1: Dawn", author: "Osamu Tezuka", pageCount: 320, genre: "Graphic Novel", publicationDate: "1967", description: "The first volume of Tezuka's life's work: a twelve-volume manga epic following the immortal Phoenix across 30,000 years of human history — part myth, part meditation on mortality.", series: { name: "Phoenix", order: 1, total: 12 }, tier: 1, topRank: null },
  { title: "Black Jack, Vol. 1", author: "Osamu Tezuka", pageCount: 288, genre: "Graphic Novel", publicationDate: "1973", description: "Tezuka's manga about a brilliant unlicensed surgeon who takes impossible cases for outrageous fees — seventeen volumes of medical drama and black comedy.", series: { name: "Black Jack", order: 1, total: 17 }, tier: 1, topRank: null },
];

// ── Books for NEW authors → recommendation library (rec-library.json) ─────
const REC_LIBRARY_ADDITIONS = [
  // Anne Bishop (5)
  { title: "Daughter of the Blood", author: "Anne Bishop", pageCount: 416, genre: "Fantasy", publicationDate: "1998", description: "The first Black Jewels novel: in a matriarchal dark-fantasy world where magical power is measured by the jewels witches wear, a prophesied queen arrives as a child.", series: { name: "Black Jewels", order: 1, total: 11 }, tier: 1, topRank: null },
  { title: "Heir to the Shadows", author: "Anne Bishop", pageCount: 480, genre: "Fantasy", publicationDate: "1999", description: "Black Jewels #2: the child queen Jaenelle Angelline recovers from her trauma and begins to take her place as the most powerful witch in the Realms.", series: { name: "Black Jewels", order: 2, total: 11 }, tier: 1, topRank: null },
  { title: "Queen of the Darkness", author: "Anne Bishop", pageCount: 464, genre: "Fantasy", publicationDate: "2000", description: "Black Jewels #3: the final confrontation with Dorothea SaDiablo — the war that will decide whether the dream of Witch becomes nightmare or fulfillment.", series: { name: "Black Jewels", order: 3, total: 11 }, tier: 1, topRank: null },
  { title: "Written in Red", author: "Anne Bishop", pageCount: 496, genre: "Fantasy", publicationDate: "2013", description: "The first Others novel: a runaway blood prophet finds refuge in a community of shape-shifting terra indigene — the supernatural beings who tolerate humanity.", series: { name: "The Others", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "Murder of Crows", author: "Anne Bishop", pageCount: 368, genre: "Fantasy", publicationDate: "2014", description: "The Others #2: Meg Corbyn's growing visions force her and the shifters of the Lakeside Courtyard to confront a drug that turns humans homicidal around Others.", series: { name: "The Others", order: 2, total: 5 }, tier: 1, topRank: null },

  // Jennifer Estep (3)
  { title: "Spider's Bite", author: "Jennifer Estep", pageCount: 400, genre: "Fantasy", publicationDate: "2010", description: "The first Elemental Assassin novel: a stone and ice elemental assassin named Gin Blanco, who cooks barbecue by day, takes a contract that goes wrong.", series: { name: "Elemental Assassin", order: 1, total: 17 }, tier: 1, topRank: null },
  { title: "Web of Lies", author: "Jennifer Estep", pageCount: 384, genre: "Fantasy", publicationDate: "2010", description: "Elemental Assassin #2: Gin gets drawn into a mining conspiracy in the Appalachian town she grew up in — and a reunion with a family she'd rather forget.", series: { name: "Elemental Assassin", order: 2, total: 17 }, tier: 1, topRank: null },
  { title: "Venom", author: "Jennifer Estep", pageCount: 416, genre: "Fantasy", publicationDate: "2011", description: "Elemental Assassin #3: Gin's ex-mentor sends her a gift from beyond the grave and she must confront a fire elemental as strong as her sworn enemy.", series: { name: "Elemental Assassin", order: 3, total: 17 }, tier: 1, topRank: null },

  // Deborah Harkness (3)
  { title: "A Discovery of Witches", author: "Deborah Harkness", pageCount: 592, genre: "Fantasy", publicationDate: "2011", description: "A witch-descended historian at Oxford accidentally unlocks a long-hidden alchemical manuscript and finds herself in an alliance — and romance — with a vampire.", series: { name: "All Souls Trilogy", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Shadow of Night", author: "Deborah Harkness", pageCount: 608, genre: "Fantasy", publicationDate: "2012", description: "All Souls Trilogy #2: Diana Bishop and Matthew Clairmont travel to Elizabethan London to hunt for the missing Ashmole 782 and find Diana a magical teacher.", series: { name: "All Souls Trilogy", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "The Book of Life", author: "Deborah Harkness", pageCount: 576, genre: "Fantasy", publicationDate: "2014", description: "All Souls Trilogy #3: Diana and Matthew return to the present pursued by enemies on all sides, racing to reassemble Ashmole 782 before their unborn twins are born.", series: { name: "All Souls Trilogy", order: 3, total: 3 }, tier: 1, topRank: null },

  // Marjorie M. Liu (3)
  { title: "Tiger Eye", author: "Marjorie M. Liu", pageCount: 336, genre: "Romance", publicationDate: "2005", description: "The first Dirk & Steele paranormal romance: a Chinese-American antiques dealer buys an ancient riddle box at a Beijing flea market — and releases an immortal tiger-shifter warrior.", series: { name: "Dirk & Steele", order: 1, total: 9 }, tier: 1, topRank: null },
  { title: "The Iron Hunt", author: "Marjorie M. Liu", pageCount: 304, genre: "Fantasy", publicationDate: "2008", description: "The first Hunter Kiss novel: a demon hunter's tattoos come alive at night as her personal bodyguards against the zombies of the apocalypse she is meant to prevent.", series: { name: "Hunter Kiss", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "Monstress, Vol. 1: Awakening", author: "Marjorie M. Liu", pageCount: 192, genre: "Graphic Novel", publicationDate: "2016", description: "Liu's acclaimed graphic novel with Sana Takeda: a teenage girl in an alternate 1920s Asia shares a psychic link with a monstrous eldritch god — Eisner and Hugo winner.", series: { name: "Monstress", order: 1, total: 9 }, tier: 1, topRank: null },

  // Michelle Sagara (3)
  { title: "Cast in Shadow", author: "Michelle Sagara", pageCount: 512, genre: "Fantasy", publicationDate: "2005", description: "The first Chronicles of Elantra novel: a young Hawk (police officer) in a multiracial fantasy city is sent to investigate child murders tied to her own traumatic past.", series: { name: "Chronicles of Elantra", order: 1, total: 18 }, tier: 1, topRank: null },
  { title: "Cast in Courtlight", author: "Michelle Sagara", pageCount: 496, genre: "Fantasy", publicationDate: "2006", description: "Chronicles of Elantra #2: Kaylin Neya is summoned to the Barrani High Court as a diplomat and must survive immortal politics while keeping a dying prince alive.", series: { name: "Chronicles of Elantra", order: 2, total: 18 }, tier: 1, topRank: null },
  { title: "Cast in Secret", author: "Michelle Sagara", pageCount: 464, genre: "Fantasy", publicationDate: "2007", description: "Chronicles of Elantra #3: Kaylin investigates an ancient artifact at the Elantra Exchange and uncovers a centuries-old elemental conspiracy.", series: { name: "Chronicles of Elantra", order: 3, total: 18 }, tier: 1, topRank: null },

  // Caitlin R. Kiernan (3)
  { title: "The Red Tree", author: "Caitlin R. Kiernan", pageCount: 400, genre: "Horror", publicationDate: "2009", description: "A Rhode Island writer rents an isolated farmhouse to work through writer's block and discovers an unfinished manuscript about the enormous, ancient red oak in her backyard.", series: null, tier: 1, topRank: null },
  { title: "The Drowning Girl", author: "Caitlin R. Kiernan", pageCount: 320, genre: "Horror", publicationDate: "2012", description: "Kiernan's haunted novel of a schizophrenic woman's encounters with a strange woman who may be a mermaid, a werewolf, or a ghost — winner of the Bram Stoker Award.", series: null, tier: 1, topRank: null },
  { title: "Silk", author: "Caitlin R. Kiernan", pageCount: 352, genre: "Horror", publicationDate: "1998", description: "Kiernan's debut: a goth band in Birmingham, Alabama, is drawn into the growing psychosis of their keyboardist and the sinister things that begin crawling out of the walls.", series: null, tier: 1, topRank: null },

  // John Ajvide Lindqvist (4)
  { title: "Let the Right One In", author: "John Ajvide Lindqvist", pageCount: 480, genre: "Horror", publicationDate: "2004", description: "A bullied twelve-year-old boy in 1980s suburban Stockholm befriends a strange new neighbor who only comes out at night — Lindqvist's influential Swedish vampire novel.", series: null, tier: 1, topRank: null },
  { title: "Handling the Undead", author: "John Ajvide Lindqvist", pageCount: 368, genre: "Horror", publicationDate: "2005", description: "In Stockholm, the recently dead begin returning home — not as monsters but as empty, grieving bodies. Three families must decide what to do with their returned.", series: null, tier: 1, topRank: null },
  { title: "Harbor", author: "John Ajvide Lindqvist", pageCount: 528, genre: "Horror", publicationDate: "2008", description: "A father whose daughter vanished on a small Swedish island years ago returns to confront the sea itself — Lindqvist's quiet, relentless folk-horror novel.", series: null, tier: 1, topRank: null },
  { title: "Little Star", author: "John Ajvide Lindqvist", pageCount: 416, genre: "Horror", publicationDate: "2010", description: "Two traumatized teenage girls — one a famous TV discovery, one a dangerous forest-raised foundling — form a friendship that escalates into a nationwide horror.", series: null, tier: 1, topRank: null },

  // Jonathan Maberry (4)
  { title: "Patient Zero", author: "Jonathan Maberry", pageCount: 432, genre: "Thriller", publicationDate: "2009", description: "The first Joe Ledger novel: a Baltimore detective is recruited into a black-ops team hunting terrorists who have weaponized a fast-acting zombie virus.", series: { name: "Joe Ledger", order: 1, total: 11 }, tier: 1, topRank: null },
  { title: "The Dragon Factory", author: "Jonathan Maberry", pageCount: 528, genre: "Thriller", publicationDate: "2010", description: "Joe Ledger #2: a genetic engineering cartel is breeding monsters — and a Nazi offshoot family is about to release a planet-killing pathogen.", series: { name: "Joe Ledger", order: 2, total: 11 }, tier: 1, topRank: null },
  { title: "Dead of Night", author: "Jonathan Maberry", pageCount: 352, genre: "Horror", publicationDate: "2011", description: "A Pennsylvania small-town cop and a reporter fight the first hours of a local zombie outbreak caused by a botched prison execution.", series: null, tier: 1, topRank: null },
  { title: "Ghost Road Blues", author: "Jonathan Maberry", pageCount: 432, genre: "Horror", publicationDate: "2006", description: "The first Pine Deep novel: a town that markets itself as America's Halloween capital is visited by three very real escaped killers — and something older beneath them.", series: { name: "Pine Deep", order: 1, total: 3 }, tier: 1, topRank: null },

  // Arkady Strugatsky (4)
  { title: "Roadside Picnic", author: "Arkady Strugatsky", pageCount: 224, genre: "Sci-Fi", publicationDate: "1972", description: "Twelve years after alien 'visitors' stopped briefly on Earth and left inexplicable artifacts behind, the 'Stalkers' who venture into the Zones to retrieve them face unending physics.", series: null, tier: 1, topRank: null },
  { title: "Hard to Be a God", author: "Arkady Strugatsky", pageCount: 272, genre: "Sci-Fi", publicationDate: "1964", description: "A historian from future Earth is embedded as an observer on a feudal-era alien planet and must decide whether to intervene as a fascist takeover begins.", series: null, tier: 1, topRank: null },
  { title: "Monday Begins on Saturday", author: "Arkady Strugatsky", pageCount: 288, genre: "Fantasy", publicationDate: "1965", description: "A Soviet programmer takes a job at a research institute studying magic — a satirical science-fiction comedy aimed at Soviet academic bureaucracy.", series: null, tier: 1, topRank: null },
  { title: "The Doomed City", author: "Arkady Strugatsky", pageCount: 464, genre: "Sci-Fi", publicationDate: "1988", description: "The Strugatskys' banned-for-decades masterwork: a 1950s Leningrad Komsomol is recruited into a mysterious 'Experiment' in a city at the edge of an abyss.", series: null, tier: 1, topRank: null },

  // Hao Jingfang (2)
  { title: "Folding Beijing", author: "Hao Jingfang", pageCount: 64, genre: "Sci-Fi", publicationDate: "2012", description: "Hao's Hugo-winning novelette: a future Beijing physically folds itself into three shifts of population, and a worker from the bottom crosses the divide to carry a message.", series: null, tier: 1, topRank: null },
  { title: "Vagabonds", author: "Hao Jingfang", pageCount: 640, genre: "Sci-Fi", publicationDate: "2016", description: "A century after a Mars colony won independence in a brutal war, a cultural exchange program sends five teenage Martians to Earth — and they return no longer certain who they are.", series: null, tier: 1, topRank: null },

  // Bradley P. Beaulieu (3)
  { title: "Twelve Kings in Sharakhai", author: "Bradley P. Beaulieu", pageCount: 592, genre: "Fantasy", publicationDate: "2015", description: "The first Song of the Shattered Sands novel: in a desert city ruled by twelve immortal kings, a young pit fighter is drawn into a plot to assassinate them.", series: { name: "Song of the Shattered Sands", order: 1, total: 6 }, tier: 1, topRank: null },
  { title: "With Blood Upon the Sand", author: "Bradley P. Beaulieu", pageCount: 688, genre: "Fantasy", publicationDate: "2017", description: "Song of the Shattered Sands #2: Çeda enters the Maidens, the elite all-female warriors of the Kings, as a double agent determined to destroy them from within.", series: { name: "Song of the Shattered Sands", order: 2, total: 6 }, tier: 1, topRank: null },
  { title: "Beneath the Twisted Trees", author: "Bradley P. Beaulieu", pageCount: 704, genre: "Fantasy", publicationDate: "2018", description: "Song of the Shattered Sands #3: Çeda, now a fugitive in the desert, must forge alliances with the nomadic tribes as the Twelve Kings hunt her.", series: { name: "Song of the Shattered Sands", order: 3, total: 6 }, tier: 1, topRank: null },

  // Janny Wurts (3)
  { title: "The Curse of the Mistwraith", author: "Janny Wurts", pageCount: 736, genre: "Fantasy", publicationDate: "1993", description: "The first Wars of Light and Shadow: two half-brothers inherit opposed gifts of light and shadow and must banish the Mistwraith suffocating their world — but their curse pits them against each other.", series: { name: "Wars of Light and Shadow", order: 1, total: 11 }, tier: 1, topRank: null },
  { title: "The Ships of Merior", author: "Janny Wurts", pageCount: 752, genre: "Fantasy", publicationDate: "1994", description: "Wars of Light and Shadow #2: the brothers' conflict metastasizes into full war as Arithon disappears to build a fleet and Lysaer raises armies to hunt him.", series: { name: "Wars of Light and Shadow", order: 2, total: 11 }, tier: 1, topRank: null },
  { title: "Warhost of Vastmark", author: "Janny Wurts", pageCount: 784, genre: "Fantasy", publicationDate: "1995", description: "Wars of Light and Shadow #3: Arithon defends the mountain clans of Vastmark against Lysaer's crusading army in the first massive battle of their war.", series: { name: "Wars of Light and Shadow", order: 3, total: 11 }, tier: 1, topRank: null },

  // Jack L. Chalker (3)
  { title: "Midnight at the Well of Souls", author: "Jack L. Chalker", pageCount: 384, genre: "Sci-Fi", publicationDate: "1977", description: "The first Well World novel: a spaceship stumbles into an alien world designed to house 1,560 species in hexagonal habitats, and the visitors are transformed into aliens themselves.", series: { name: "Well World", order: 1, total: 7 }, tier: 1, topRank: null },
  { title: "Exiles at the Well of Souls", author: "Jack L. Chalker", pageCount: 384, genre: "Sci-Fi", publicationDate: "1978", description: "Well World #2: a pair of kidnapped Earth children sent to the Well World become central to a race across the hexagons to prevent a galactic-scale artifact's activation.", series: { name: "Well World", order: 2, total: 7 }, tier: 1, topRank: null },
  { title: "Downtiming the Nightside", author: "Jack L. Chalker", pageCount: 416, genre: "Sci-Fi", publicationDate: "1985", description: "A time-travel agency sends agents upstream and downstream to police paradoxes — until their target begins manipulating history on a larger scale than they can track.", series: null, tier: 1, topRank: null },

  // Takehiko Inoue (3)
  { title: "Vagabond, Vol. 1", author: "Takehiko Inoue", pageCount: 224, genre: "Graphic Novel", publicationDate: "1998", description: "Inoue's manga adaptation of Musashi by Eiji Yoshikawa: the young Shinmen Takezo becomes the wandering samurai who will one day be known as Miyamoto Musashi.", series: { name: "Vagabond", order: 1, total: 37 }, tier: 1, topRank: null },
  { title: "Slam Dunk, Vol. 1", author: "Takehiko Inoue", pageCount: 216, genre: "Graphic Novel", publicationDate: "1990", description: "The first volume of Inoue's classic basketball manga: a delinquent high schooler joins the team to impress a girl and slowly discovers an actual love of the game.", series: { name: "Slam Dunk", order: 1, total: 31 }, tier: 1, topRank: null },
  { title: "Real, Vol. 1", author: "Takehiko Inoue", pageCount: 208, genre: "Graphic Novel", publicationDate: "1999", description: "Inoue's wheelchair-basketball manga: three young men connected by disability and determination build their lives around the sport.", series: { name: "Real", order: 1, total: 15 }, tier: 1, topRank: null },
];

// ── Apply PRIMARY additions to book-data.json ────────────────────────────
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
  console.log(`⚠ Skipping ${primaryDupes.length} primary duplicates:`);
  for (const d of primaryDupes) console.log(`  - "${d.title}" — ${d.author}`);
}
const nextBooks = books.concat(primaryAdd);
fs.writeFileSync(CATALOG, JSON.stringify(nextBooks));
console.log(`\nPRIMARY: added ${primaryAdd.length} books, ${beforeP} → ${nextBooks.length}`);

// ── Write REC LIBRARY to rec-library.json (create or append) ─────────────
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
  console.log(`\n⚠ Skipping ${recDupes.length} rec library duplicates`);
}
const nextRec = recBooks.concat(recAdd);
fs.writeFileSync(REC_LIBRARY, JSON.stringify(nextRec));
console.log(`REC LIBRARY: added ${recAdd.length} books, ${beforeR} → ${nextRec.length}`);

const statCat = fs.statSync(CATALOG);
const statRec = fs.statSync(REC_LIBRARY);
console.log(`\nbook-data.json: ${(statCat.size / 1024 / 1024).toFixed(2)} MB`);
console.log(`rec-library.json: ${(statRec.size / 1024).toFixed(1)} KB`);
