const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

// ── PRIMARY (existing authors) ────────────────────────────────────────────
const PRIMARY_ADDITIONS = [
  // S.A. Chakraborty (1)
  { title: "The Adventures of Amina al-Sirafi", author: "S.A. Chakraborty", pageCount: 496, genre: "Fantasy", publicationDate: "2023", description: "A legendary middle-aged pirate captain in the medieval Indian Ocean is lured out of retirement for one last job — recovering a kidnapped girl from a demon-bound Frank.", series: null, tier: 1, topRank: null },

  // Tasha Suri (2)
  { title: "Empire of Sand", author: "Tasha Suri", pageCount: 480, genre: "Fantasy", publicationDate: "2018", description: "The first Books of Ambha novel: a noblewoman in a Mughal-inspired empire is taken by the Emperor's court because of the forbidden magic of her Amrithi mother's people.", series: { name: "The Books of Ambha", order: 1, total: 2 }, tier: 1, topRank: null },
  { title: "Realm of Ash", author: "Tasha Suri", pageCount: 480, genre: "Fantasy", publicationDate: "2019", description: "Books of Ambha #2: Mehr's younger sister Arwa, widowed, is sent to a hidden Amrithi stronghold where she learns the magic that might save the crumbling empire.", series: { name: "The Books of Ambha", order: 2, total: 2 }, tier: 1, topRank: null },

  // Rebecca Roanhorse (3)
  { title: "Trail of Lightning", author: "Rebecca Roanhorse", pageCount: 304, genre: "Fantasy", publicationDate: "2018", description: "The first Sixth World novel: in a post-climate-apocalypse Dinétah protected by a wall of Navajo gods, a monster hunter takes on a contract that leads her to a reckoning with her own past.", series: { name: "The Sixth World", order: 1, total: 2 }, tier: 1, topRank: null },
  { title: "Storm of Locusts", author: "Rebecca Roanhorse", pageCount: 320, genre: "Fantasy", publicationDate: "2019", description: "The Sixth World #2: Maggie Hoskie tracks a cult leader across Dinétah and the radioactive ruins of the lost American West — with a new crew and old enemies.", series: { name: "The Sixth World", order: 2, total: 2 }, tier: 1, topRank: null },
  { title: "Resistance Reborn", author: "Rebecca Roanhorse", pageCount: 432, genre: "Sci-Fi", publicationDate: "2019", description: "Roanhorse's Star Wars novel: Poe Dameron and Leia Organa rebuild the Resistance in the wake of The Last Jedi's losses.", series: null, tier: 1, topRank: null },

  // P. Djèlí Clark (2)
  { title: "The Black God's Drums", author: "P. Djèlí Clark", pageCount: 112, genre: "Fantasy", publicationDate: "2018", description: "Clark's alt-history novella: in an 1880s free New Orleans, a teenage street thief and a nun-airship pirate captain race to prevent a Confederate superweapon.", series: null, tier: 1, topRank: null },
  { title: "A Dead Djinn in Cairo", author: "P. Djèlí Clark", pageCount: 48, genre: "Fantasy", publicationDate: "2016", description: "The novelette that launched Clark's Dead Djinn Universe: a Cairo Ministry of Alchemy agent investigates a djinn's apparent suicide in a magical 1912 Egypt.", series: { name: "Dead Djinn Universe", order: 1, total: 4 }, tier: 1, topRank: null },

  // Silvia Moreno-Garcia (2)
  { title: "The Beautiful Ones", author: "Silvia Moreno-Garcia", pageCount: 320, genre: "Fantasy", publicationDate: "2017", description: "A Belle Époque-inspired romance with telekinetic powers: a country girl arrives in the capital for the social season and becomes entangled with a traveling performer.", series: null, tier: 1, topRank: null },
  { title: "Untamed Shore", author: "Silvia Moreno-Garcia", pageCount: 288, genre: "Fiction", publicationDate: "2020", description: "A bookish 18-year-old in a 1970s Baja California village takes a job as a nurse-translator for a wealthy American — and stumbles into noir violence.", series: null, tier: 1, topRank: null },

  // Nghi Vo (2)
  { title: "The Brides of High Hill", author: "Nghi Vo", pageCount: 128, genre: "Fantasy", publicationDate: "2024", description: "The fifth Singing Hills novella: Cleric Chih accompanies a young woman to the remote estate of her wealthy fiancé and uncovers a pattern of disappearing brides.", series: { name: "The Singing Hills Cycle", order: 5, total: 6 }, tier: 1, topRank: null },
  { title: "Siren Queen", author: "Nghi Vo", pageCount: 288, genre: "Fantasy", publicationDate: "2022", description: "A Chinese-American actress in 1930s Hollywood trades literally bloodletting for studio contracts in a magical-realist vision of the old studio system.", series: null, tier: 1, topRank: null },

  // Rivers Solomon (2)
  { title: "Sorrowland", author: "Rivers Solomon", pageCount: 368, genre: "Fantasy", publicationDate: "2021", description: "A teenage fugitive from a cult gives birth alone in the woods and undergoes a monstrous transformation — Solomon's Gothic of Black motherhood and survival.", series: null, tier: 1, topRank: null },
  { title: "Model Home", author: "Rivers Solomon", pageCount: 320, genre: "Horror", publicationDate: "2024", description: "Three Black siblings return to the Dallas suburban home where their parents are found dead — and the house begins to remember what it did to them.", series: null, tier: 1, topRank: null },

  // Blake Crouch (2)
  { title: "Abandon", author: "Blake Crouch", pageCount: 432, genre: "Thriller", publicationDate: "2009", description: "A modern expedition to the ghost town of Abandon, Colorado — where every resident vanished on Christmas Day 1893 — finds the mystery still waiting for them.", series: null, tier: 1, topRank: null },
  { title: "Good Behavior", author: "Blake Crouch", pageCount: 240, genre: "Thriller", publicationDate: "2016", description: "Three linked novellas following Letty Dobesh, a drug-addicted professional thief, through a series of jobs that spiral into bigger trouble.", series: null, tier: 1, topRank: null },

  // Dennis E. Taylor (2)
  { title: "Not Till We Are Lost", author: "Dennis E. Taylor", pageCount: 416, genre: "Sci-Fi", publicationDate: "2023", description: "Bobiverse #5: the Bob clones face a crisis of identity and new alien contact as their exponentially expanding population strains the moral framework they began with.", series: { name: "Bobiverse", order: 5, total: 5 }, tier: 1, topRank: null },
  { title: "Outland", author: "Dennis E. Taylor", pageCount: 320, genre: "Sci-Fi", publicationDate: "2015", description: "Taylor's self-published debut: a group of grad students discover a portal to a parallel Earth where humanity never evolved, and figure out what to do with it.", series: null, tier: 1, topRank: null },

  // Max Barry (2)
  { title: "Machine Man", author: "Max Barry", pageCount: 288, genre: "Sci-Fi", publicationDate: "2011", description: "An engineer accidentally crushes his leg in a lab accident and builds himself a better prosthetic — and then a better one — until the question becomes whether he is still human.", series: null, tier: 1, topRank: null },
  { title: "The 22 Murders of Madison May", author: "Max Barry", pageCount: 336, genre: "Thriller", publicationDate: "2021", description: "A woman is murdered in Manhattan — and then in a parallel universe, and another, and another. A journalist becomes the only person who can remember the pattern.", series: null, tier: 1, topRank: null },

  // Charles Yu (2)
  { title: "How to Live Safely in a Science Fictional Universe", author: "Charles Yu", pageCount: 256, genre: "Sci-Fi", publicationDate: "2010", description: "A time-machine mechanic in a universe grafted to a second-rate sci-fi franchise hunts for his vanished father and accidentally shoots his future self.", series: null, tier: 1, topRank: null },
  { title: "Third Class Superhero", author: "Charles Yu", pageCount: 208, genre: "Fiction", publicationDate: "2006", description: "Yu's first story collection: eleven meta-fictional, formally inventive tales about disappointed men, AI, and the fictions they cannot escape.", series: null, tier: 1, topRank: null },

  // Christopher Buehlman (2)
  { title: "The Lesser Dead", author: "Christopher Buehlman", pageCount: 320, genre: "Horror", publicationDate: "2014", description: "A vampire who haunts 1978 New York subway stations narrates the summer when his small coven discovered something older, hungrier, and far worse than themselves.", series: null, tier: 1, topRank: null },
  { title: "The Suicide Motor Club", author: "Christopher Buehlman", pageCount: 320, genre: "Horror", publicationDate: "2016", description: "A 1970s widow who survived the roadside attack that killed her husband hunts the vampire hot-rodder gang responsible — a revenge novel on the open American highway.", series: null, tier: 1, topRank: null },

  // Alma Katsu (1)
  { title: "The Taker", author: "Alma Katsu", pageCount: 448, genre: "Fantasy", publicationDate: "2011", description: "A small-town nurse in present-day Maine takes in a woman who claims to be almost 200 years old and possessed by an obsessive love that has outlived everything.", series: { name: "The Taker", order: 1, total: 3 }, tier: 1, topRank: null },

  // Chuck Wendig (3)
  { title: "Blackbirds", author: "Chuck Wendig", pageCount: 320, genre: "Fantasy", publicationDate: "2012", description: "The first Miriam Black novel: a rootless woman who sees exactly how and when a person will die simply by touching them tries to prevent one very specific death.", series: { name: "Miriam Black", order: 1, total: 6 }, tier: 1, topRank: null },
  { title: "Mockingbird", author: "Chuck Wendig", pageCount: 352, genre: "Fantasy", publicationDate: "2013", description: "Miriam Black #2: Miriam gets dragged into a series of girls' deaths at a reform school and ends up tangled with a cult that worships death itself.", series: { name: "Miriam Black", order: 2, total: 6 }, tier: 1, topRank: null },
  { title: "Wayward", author: "Chuck Wendig", pageCount: 816, genre: "Sci-Fi", publicationDate: "2022", description: "The sequel to Wanderers: years after the Sleepwalker pandemic ended most of civilization, the survivors of the Wayward migration try to build something in its aftermath.", series: { name: "Wanderers", order: 2, total: 2 }, tier: 1, topRank: null },

  // Tochi Onyebuchi (2)
  { title: "Goliath", author: "Tochi Onyebuchi", pageCount: 400, genre: "Sci-Fi", publicationDate: "2022", description: "A mid-21st-century New Haven reclaimed from corporate collapse by its remaining Black residents is slowly gentrified by the return of white 'Stackers' from space habitats.", series: null, tier: 1, topRank: null },
  { title: "Beasts Made of Night", author: "Tochi Onyebuchi", pageCount: 304, genre: "Young Adult", publicationDate: "2017", description: "The first Beasts Made of Night novel: in a Nigerian-inspired fantasy city, 'sin-eaters' fight the physical manifestations of the nobility's sins and then carry them as tattoos.", series: { name: "Beasts Made of Night", order: 1, total: 2 }, tier: 1, topRank: null },

  // Micaiah Johnson (1)
  { title: "Those Beyond the Wall", author: "Micaiah Johnson", pageCount: 400, genre: "Sci-Fi", publicationDate: "2024", description: "The sequel to The Space Between Worlds: set decades later, a new generation faces a cross-dimensional killer and the simmering political faultlines of Ashtown.", series: { name: "The Space Between Worlds", order: 2, total: 2 }, tier: 1, topRank: null },

  // Emily Tesh (2)
  { title: "Silver in the Wood", author: "Emily Tesh", pageCount: 112, genre: "Fantasy", publicationDate: "2019", description: "The first Greenhollow novella: a man who has lived in an English forest for four hundred years as its green spirit meets a younger man who awakens old memories.", series: { name: "Greenhollow Duology", order: 1, total: 2 }, tier: 1, topRank: null },
  { title: "Drowned Country", author: "Emily Tesh", pageCount: 160, genre: "Fantasy", publicationDate: "2020", description: "The second Greenhollow novella: the new Wild Man of Greenhollow must leave his forest to investigate a vampire in a coastal Cornish town.", series: { name: "Greenhollow Duology", order: 2, total: 2 }, tier: 1, topRank: null },

  // Kai Ashante Wilson (1)
  { title: "A Taste of Honey", author: "Kai Ashante Wilson", pageCount: 160, genre: "Fantasy", publicationDate: "2016", description: "A companion novella to Sorcerer of the Wildeeps: a ten-day illicit affair between a young courtier and a visiting prince is recounted from the end of a long life.", series: null, tier: 1, topRank: null },
];

// ── REC LIBRARY (new authors) ────────────────────────────────────────────
const REC_LIBRARY_ADDITIONS = [
  // Sylvain Neuvel (4)
  { title: "Sleeping Giants", author: "Sylvain Neuvel", pageCount: 320, genre: "Sci-Fi", publicationDate: "2016", description: "The first Themis Files novel: a child falls into a buried giant metal hand in South Dakota, and decades later a team begins assembling the alien robot it belongs to.", series: { name: "Themis Files", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Waking Gods", author: "Sylvain Neuvel", pageCount: 336, genre: "Sci-Fi", publicationDate: "2017", description: "Themis Files #2: other giant robots begin arriving on Earth, and the original Themis team must determine whether they are here to help or exterminate humanity.", series: { name: "Themis Files", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Only Human", author: "Sylvain Neuvel", pageCount: 336, genre: "Sci-Fi", publicationDate: "2018", description: "Themis Files #3: the conclusion of Neuvel's interrogation-transcript trilogy — a diplomatic journey to the alien homeworld forces a reckoning with what humanity has done.", series: { name: "Themis Files", order: 3, total: 3 }, tier: 1, topRank: null },
  { title: "The Test", author: "Sylvain Neuvel", pageCount: 112, genre: "Sci-Fi", publicationDate: "2019", description: "Neuvel's novella: a British citizenship test takes a sudden, horrifying turn as the examiner begins asking what-would-you-do questions the applicant was never meant to hear.", series: null, tier: 1, topRank: null },

  // Peter Clines (4)
  { title: "14", author: "Peter Clines", pageCount: 368, genre: "Sci-Fi", publicationDate: "2012", description: "A laid-off copywriter moves into a cheap LA apartment building and discovers that its strangeness — green cockroaches, inexplicable locked rooms — points to something cosmic.", series: null, tier: 1, topRank: null },
  { title: "The Fold", author: "Peter Clines", pageCount: 384, genre: "Sci-Fi", publicationDate: "2015", description: "A high school English teacher with perfect recall is hired by DARPA to evaluate a teleportation project at a remote facility — and finds the team hiding something.", series: null, tier: 1, topRank: null },
  { title: "Dead Moon", author: "Peter Clines", pageCount: 352, genre: "Horror", publicationDate: "2019", description: "A near-future lunar graveyard's operators fight an unexpected outbreak — the dead have started coming back on the moon's surface.", series: null, tier: 1, topRank: null },
  { title: "Ex-Heroes", author: "Peter Clines", pageCount: 336, genre: "Horror", publicationDate: "2010", description: "The first Ex-Heroes novel: a handful of superheroes in a zombie-apocalypse Los Angeles protect a fortress of survivors — and try to keep their powers a secret from the undead.", series: { name: "Ex-Heroes", order: 1, total: 6 }, tier: 1, topRank: null },

  // Matt Ruff (4)
  { title: "Lovecraft Country", author: "Matt Ruff", pageCount: 400, genre: "Horror", publicationDate: "2016", description: "A Jim Crow-era Black family in 1950s Chicago travels across the country in search of a missing relative and confronts both the supernatural horrors of a secret cabal and the horrors of American racism.", series: null, tier: 1, topRank: null },
  { title: "Bad Monkeys", author: "Matt Ruff", pageCount: 240, genre: "Thriller", publicationDate: "2007", description: "A woman in a psychiatric ward claims to be an agent of a secret organization called Bad Monkeys that hunts and kills evil people — and her interrogator must decide what to believe.", series: null, tier: 1, topRank: null },
  { title: "Fool on the Hill", author: "Matt Ruff", pageCount: 464, genre: "Fantasy", publicationDate: "1988", description: "Ruff's debut, written during his senior year at Cornell: a dense magical-realist novel set on and under the Cornell campus, populated by sprites, talking dogs, and a writer-in-residence.", series: null, tier: 1, topRank: null },
  { title: "Mirage", author: "Matt Ruff", pageCount: 416, genre: "Thriller", publicationDate: "2012", description: "In an alternate 2009 where the United Arab States is the global superpower, a Baghdad homeland security agent investigates Christian terrorists who claim their world is an illusion.", series: null, tier: 1, topRank: null },

  // Agustina Bazterrica (3)
  { title: "Tender Is the Flesh", author: "Agustina Bazterrica", pageCount: 224, genre: "Horror", publicationDate: "2017", description: "In a near-future where animal meat has become toxic and humans are bred for legal slaughter, a middle manager at a processing plant receives a living woman as a gift.", series: null, tier: 1, topRank: null },
  { title: "The Unworthy", author: "Agustina Bazterrica", pageCount: 192, genre: "Horror", publicationDate: "2024", description: "In a post-apocalyptic convent, a woman writes her memories on stolen scraps — the only trace of her life before the sisterhood that claimed her.", series: null, tier: 1, topRank: null },
  { title: "Nineteen Claws and a Black Bird", author: "Agustina Bazterrica", pageCount: 192, genre: "Horror", publicationDate: "2023", description: "Bazterrica's story collection: twenty short tales of psychological unease, body horror, and quiet apocalypse from the author of Tender Is the Flesh.", series: null, tier: 1, topRank: null },

  // David Farland (4)
  { title: "The Runelords", author: "David Farland", pageCount: 592, genre: "Fantasy", publicationDate: "1998", description: "The first Runelords novel: in a world where nobles are endowed with the attributes of their willing subjects, a young prince receives his first endowments as his kingdom is invaded.", series: { name: "The Runelords", order: 1, total: 9 }, tier: 1, topRank: null },
  { title: "Brotherhood of the Wolf", author: "David Farland", pageCount: 576, genre: "Fantasy", publicationDate: "1999", description: "The Runelords #2: Prince Gaborn, the Earth King, leads the defense of the Seven Kingdoms against Raj Ahten's hordes and the returning Reavers.", series: { name: "The Runelords", order: 2, total: 9 }, tier: 1, topRank: null },
  { title: "Wizardborn", author: "David Farland", pageCount: 624, genre: "Fantasy", publicationDate: "2001", description: "The Runelords #3: Gaborn's powers as Earth King wane, and a new wizardborn child threatens to shift the balance of every family of magic in the world.", series: { name: "The Runelords", order: 3, total: 9 }, tier: 1, topRank: null },
  { title: "The Lair of Bones", author: "David Farland", pageCount: 608, genre: "Fantasy", publicationDate: "2003", description: "The Runelords #4: the original quartet's conclusion — Gaborn descends into the underworld to confront the oldest Reavers in a final test of the earth magic.", series: { name: "The Runelords", order: 4, total: 9 }, tier: 1, topRank: null },

  // James Herbert (4)
  { title: "The Rats", author: "James Herbert", pageCount: 240, genre: "Horror", publicationDate: "1974", description: "Herbert's debut: giant mutant rats emerge from the sewers of bombed-out East London and begin killing people — a cult-classic British horror novel.", series: { name: "Rats", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "The Fog", author: "James Herbert", pageCount: 352, genre: "Horror", publicationDate: "1975", description: "A yellow fog drifts across England, and everyone who breathes it turns savagely mad — Herbert's second novel and one of the landmarks of 1970s British horror.", series: null, tier: 1, topRank: null },
  { title: "The Survivor", author: "James Herbert", pageCount: 336, genre: "Horror", publicationDate: "1976", description: "The only survivor of a 747 crash in an English village tries to figure out why the dead passengers are appearing to him and what they want.", series: null, tier: 1, topRank: null },
  { title: "The Magic Cottage", author: "James Herbert", pageCount: 384, genre: "Horror", publicationDate: "1986", description: "A young couple move into a remote English cottage with seemingly benevolent magical properties — and discover what the magic is actually for.", series: null, tier: 1, topRank: null },

  // Robert Bloch (3)
  { title: "Psycho", author: "Robert Bloch", pageCount: 208, genre: "Horror", publicationDate: "1959", description: "Bloch's short novel about the Bates Motel and its haunted proprietor Norman — the book that inspired Alfred Hitchcock's film and redefined American psychological horror.", series: null, tier: 1, topRank: null },
  { title: "The Scarf", author: "Robert Bloch", pageCount: 224, genre: "Horror", publicationDate: "1947", description: "Bloch's first novel: an itinerant writer strangles women with the same scarf as he moves from city to city — a very early psychological serial-killer novel.", series: null, tier: 1, topRank: null },
  { title: "American Gothic", author: "Robert Bloch", pageCount: 288, genre: "Horror", publicationDate: "1974", description: "Bloch's fictionalized account of H.H. Holmes, the 1893 Chicago World's Fair serial killer, and the young woman journalist who uncovers his 'Murder Castle.'", series: null, tier: 1, topRank: null },
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
