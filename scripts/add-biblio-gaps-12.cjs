const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");

const ADDITIONS = [
  // Robert E. Howard (3)
  { title: "The Savage Tales of Solomon Kane", author: "Robert E. Howard", pageCount: 416, genre: "Fantasy", publicationDate: "1998", description: "The complete Solomon Kane stories: Howard's 16th-century Puritan adventurer stalks evil across Africa, Europe, and the edge of the unknown — collected with Howard's unfinished drafts.", series: null, tier: 1, topRank: null },
  { title: "Bran Mak Morn: The Last King", author: "Robert E. Howard", pageCount: 432, genre: "Fantasy", publicationDate: "2001", description: "The complete Bran Mak Morn stories: Howard's tales of the last king of the Picts, leading his dwindling people against the Roman invaders of Britain.", series: null, tier: 1, topRank: null },
  { title: "Kull: Exile of Atlantis", author: "Robert E. Howard", pageCount: 320, genre: "Fantasy", publicationDate: "2006", description: "The complete Kull stories: Howard's Atlantean barbarian who becomes the brooding king of Valusia — the philosophical precursor to Conan.", series: null, tier: 1, topRank: null },

  // Fritz Leiber (5)
  { title: "The Big Time", author: "Fritz Leiber", pageCount: 160, genre: "Sci-Fi", publicationDate: "1958", description: "Leiber's Hugo-winning short novel: the action takes place entirely inside a single room — a rest station outside spacetime used by soldiers in an endless Change War.", series: null, tier: 1, topRank: null },
  { title: "Our Lady of Darkness", author: "Fritz Leiber", pageCount: 240, genre: "Horror", publicationDate: "1977", description: "Leiber's World Fantasy Award-winning urban horror novel: a San Francisco writer discovers a hidden occult geometry stalking his city through a lost 1907 diary.", series: null, tier: 1, topRank: null },
  { title: "The Wanderer", author: "Fritz Leiber", pageCount: 352, genre: "Sci-Fi", publicationDate: "1964", description: "A rogue planet emerges from hyperspace near Earth, disrupting the moon's orbit — Leiber's Hugo-winning disaster novel told from a dozen intercut viewpoints.", series: null, tier: 1, topRank: null },
  { title: "The Green Millennium", author: "Fritz Leiber", pageCount: 192, genre: "Sci-Fi", publicationDate: "1953", description: "A near-future drifter discovers a green cat in his apartment — and finds it is the key to an alien pacification project unfolding across the planet.", series: null, tier: 1, topRank: null },
  { title: "The Night of the Long Knives", author: "Fritz Leiber", pageCount: 112, genre: "Sci-Fi", publicationDate: "1960", description: "In a post-atomic wasteland where human life is cheap, two loners meet and are forced to cooperate under the shadow of a secret installation and a silent plane.", series: null, tier: 1, topRank: null },

  // L. Sprague de Camp (3)
  { title: "Lest Darkness Fall", author: "L. Sprague de Camp", pageCount: 272, genre: "Sci-Fi", publicationDate: "1939", description: "A 20th-century archaeologist is struck by lightning in Rome and wakes up in 535 AD — and sets out to prevent the Dark Ages using what he remembers of modern technology.", series: null, tier: 1, topRank: null },
  { title: "Rogue Queen", author: "L. Sprague de Camp", pageCount: 224, genre: "Sci-Fi", publicationDate: "1951", description: "On a planet where humans encounter a race of social insects in humanoid form, a visitor's influence begins to unravel the hive's hierarchy.", series: null, tier: 1, topRank: null },
  { title: "The Tritonian Ring", author: "L. Sprague de Camp", pageCount: 192, genre: "Fantasy", publicationDate: "1953", description: "De Camp's Pusadian Atlantis-era fantasy: a young prince quests across a barbaric ancient world to forge a weapon that can defeat the Sea Gods' champion.", series: null, tier: 1, topRank: null },

  // R.A. Salvatore (4)
  { title: "The Spine of the World", author: "R.A. Salvatore", pageCount: 384, genre: "Fantasy", publicationDate: "1999", description: "Paths of Darkness #2: Wulfgar, broken by his imprisonment in the Abyss, drifts away from his friends and into the rough lives of Luskan's thieves and smugglers.", series: { name: "Paths of Darkness", order: 2, total: 4 }, tier: 1, topRank: null },
  { title: "Road of the Patriarch", author: "R.A. Salvatore", pageCount: 384, genre: "Fantasy", publicationDate: "2006", description: "The Sellswords #3: Entreri and Jarlaxle accept a contract that takes them across Faerûn and pulls them into the shadow of the Father of Wisdom.", series: { name: "The Sellswords", order: 3, total: 3 }, tier: 1, topRank: null },
  { title: "The Sword of Bedwyr", author: "R.A. Salvatore", pageCount: 320, genre: "Fantasy", publicationDate: "1995", description: "The Crimson Shadow #1: in an occupied kingdom, the young nobleman Luthien Bedwyr becomes a masked outlaw hero known as the Crimson Shadow.", series: { name: "The Crimson Shadow", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "The Dragon King", author: "R.A. Salvatore", pageCount: 320, genre: "Fantasy", publicationDate: "1996", description: "The Crimson Shadow #3: Luthien must rally the conquered kingdoms of Eriador against the wizard-king Greensparrow and his dragon allies.", series: { name: "The Crimson Shadow", order: 3, total: 3 }, tier: 1, topRank: null },

  // Mercedes Lackey (1)
  { title: "The Elvenbane", author: "Mercedes Lackey", pageCount: 576, genre: "Fantasy", publicationDate: "1991", description: "Lackey's collaboration with Andre Norton: in a world ruled by sorcerer-elves who keep humans as slaves, a half-breed child becomes the prophesied Elvenbane.", series: { name: "Halfblood Chronicles", order: 1, total: 3 }, tier: 1, topRank: null },

  // Garth Nix (1)
  { title: "Across the Wall", author: "Garth Nix", pageCount: 320, genre: "Fantasy", publicationDate: "2005", description: "A story collection including the Old Kingdom novella 'Nicholas Sayre and the Creature in the Case,' plus short fiction set in Nix's various fantasy worlds.", series: null, tier: 1, topRank: null },

  // Tamora Pierce (4)
  { title: "Sandry's Book", author: "Tamora Pierce", pageCount: 272, genre: "Young Adult", publicationDate: "1997", description: "The first Circle of Magic book: four children with unusual gifts are brought together at Winding Circle temple to discover their ambient magic — Sandry and her thread magic.", series: { name: "Circle of Magic", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "Tris's Book", author: "Tamora Pierce", pageCount: 272, genre: "Young Adult", publicationDate: "1998", description: "Circle of Magic #2: Winding Circle is under attack by pirates, and the four young mages must work together using their weather, metal, plant, and thread magic.", series: { name: "Circle of Magic", order: 2, total: 4 }, tier: 1, topRank: null },
  { title: "Daja's Book", author: "Tamora Pierce", pageCount: 256, genre: "Young Adult", publicationDate: "1998", description: "Circle of Magic #3: Daja's smithcraft magic produces a living metal while the four friends travel through drought-stricken Gold Ridge.", series: { name: "Circle of Magic", order: 3, total: 4 }, tier: 1, topRank: null },
  { title: "Briar's Book", author: "Tamora Pierce", pageCount: 272, genre: "Young Adult", publicationDate: "1999", description: "Circle of Magic #4: a plague ravages Summersea, and Briar, the former street rat who can speak with plants, is drawn into the fight against it.", series: { name: "Circle of Magic", order: 4, total: 4 }, tier: 1, topRank: null },

  // Diana Wynne Jones (6)
  { title: "Dogsbody", author: "Diana Wynne Jones", pageCount: 272, genre: "Fantasy", publicationDate: "1975", description: "Sirius, the dog-star, is falsely accused of murder and sentenced to life as a mortal dog on Earth — and must find a lost weapon before his life runs out.", series: null, tier: 1, topRank: null },
  { title: "House of Many Ways", author: "Diana Wynne Jones", pageCount: 416, genre: "Fantasy", publicationDate: "2008", description: "The third Howl's Moving Castle book: a bookish young woman looking after her great-uncle's impossible house gets tangled up with Sophie, Howl, and the royal library's missing books.", series: { name: "Howl's Moving Castle", order: 3, total: 3 }, tier: 1, topRank: null },
  { title: "Cart and Cwidder", author: "Diana Wynne Jones", pageCount: 208, genre: "Fantasy", publicationDate: "1975", description: "The first Dalemark Quartet book: four children in a land divided between tyrannical earldoms discover their father's cart contains secret magic and weapons of revolution.", series: { name: "The Dalemark Quartet", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "The Spellcoats", author: "Diana Wynne Jones", pageCount: 288, genre: "Fantasy", publicationDate: "1979", description: "Dalemark Quartet #3: set in the land's prehistory, a young weaver discovers her magic woven coats can remake reality — told in first person as an unfolding history.", series: { name: "The Dalemark Quartet", order: 3, total: 4 }, tier: 1, topRank: null },
  { title: "A Tale of Time City", author: "Diana Wynne Jones", pageCount: 272, genre: "Fantasy", publicationDate: "1987", description: "A WWII evacuee is kidnapped by two children from a city outside time who think she is the Time Lady — and the three of them must save their city from unraveling.", series: null, tier: 1, topRank: null },
  { title: "Eight Days of Luke", author: "Diana Wynne Jones", pageCount: 176, genre: "Fantasy", publicationDate: "1975", description: "A lonely English boy accidentally releases a strange charismatic young man named Luke from his prison — and the man turns out to be a bound Norse god.", series: null, tier: 1, topRank: null },

  // Holly Black (5)
  { title: "The Field Guide", author: "Holly Black", pageCount: 128, genre: "Young Adult", publicationDate: "2003", description: "The Spiderwick Chronicles #1 (with Tony DiTerlizzi): three siblings move into a crumbling Victorian house and find a field guide to the faeries living inside its walls.", series: { name: "The Spiderwick Chronicles", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "The Seeing Stone", author: "Holly Black", pageCount: 128, genre: "Young Adult", publicationDate: "2003", description: "Spiderwick Chronicles #2: the Grace siblings use a magical stone to see faeries who have stolen one of their own and must rescue him from goblins.", series: { name: "The Spiderwick Chronicles", order: 2, total: 5 }, tier: 1, topRank: null },
  { title: "Lucinda's Secret", author: "Holly Black", pageCount: 128, genre: "Young Adult", publicationDate: "2003", description: "Spiderwick Chronicles #3: the Grace kids visit their reclusive Aunt Lucinda in a psychiatric hospital and learn the truth about their great-uncle Arthur's disappearance.", series: { name: "The Spiderwick Chronicles", order: 3, total: 5 }, tier: 1, topRank: null },
  { title: "The Ironwood Tree", author: "Holly Black", pageCount: 128, genre: "Young Adult", publicationDate: "2004", description: "Spiderwick Chronicles #4: Jared is framed for a crime at his new school, and the siblings race into a hidden dwarven mine to rescue Mallory.", series: { name: "The Spiderwick Chronicles", order: 4, total: 5 }, tier: 1, topRank: null },
  { title: "The Wrath of Mulgarath", author: "Holly Black", pageCount: 144, genre: "Young Adult", publicationDate: "2004", description: "Spiderwick Chronicles #5: the ogre Mulgarath moves against the Grace children and their field guide — the climax of the original quintet.", series: { name: "The Spiderwick Chronicles", order: 5, total: 5 }, tier: 1, topRank: null },

  // Robert Silverberg (5)
  { title: "Nightwings", author: "Robert Silverberg", pageCount: 176, genre: "Sci-Fi", publicationDate: "1969", description: "Silverberg's Hugo-winning far-future Earth: a third-rate watcher accompanies a winged flier and a deformed changeling across a decaying landscape awaiting an alien invasion.", series: null, tier: 1, topRank: null },
  { title: "Up the Line", author: "Robert Silverberg", pageCount: 288, genre: "Sci-Fi", publicationDate: "1969", description: "A Time Service guide becomes obsessed with a Byzantine princess who is his own distant ancestor — Silverberg's mordant meditation on tourism and incest paradoxes.", series: null, tier: 1, topRank: null },
  { title: "Thorns", author: "Robert Silverberg", pageCount: 224, genre: "Sci-Fi", publicationDate: "1967", description: "A mutilated star-explorer and an empath woman are manipulated into a psychic relationship by a media mogul who feeds on their suffering.", series: null, tier: 1, topRank: null },
  { title: "The World Inside", author: "Robert Silverberg", pageCount: 240, genre: "Sci-Fi", publicationDate: "1971", description: "Linked stories set in a 24th-century world of thousand-floor urban monads housing 75 billion people — a calm, ritualized overpopulated future.", series: null, tier: 1, topRank: null },
  { title: "The Positronic Man", author: "Robert Silverberg", pageCount: 288, genre: "Sci-Fi", publicationDate: "1992", description: "Silverberg's novel-length expansion (with Isaac Asimov) of Asimov's novella 'The Bicentennial Man' — the two-hundred-year quest of a robot to become legally human.", series: null, tier: 1, topRank: null },

  // Frederik Pohl (4)
  { title: "Jem", author: "Frederik Pohl", pageCount: 352, genre: "Sci-Fi", publicationDate: "1979", description: "Three Earth factions — Food, Fuel, and People blocs — colonize the same alien world at the same time, each arriving with its own ideology and its own prejudices.", series: null, tier: 1, topRank: null },
  { title: "Wolfbane", author: "Frederik Pohl", pageCount: 176, genre: "Sci-Fi", publicationDate: "1959", description: "Pohl and C.M. Kornbluth's novel of Earth stolen from the solar system by alien pyramidal beings — and a small resistance of human 'wolves' who refuse to adapt.", series: null, tier: 1, topRank: null },
  { title: "Search the Sky", author: "Frederik Pohl", pageCount: 224, genre: "Sci-Fi", publicationDate: "1954", description: "Pohl and Kornbluth's satire: an interstellar trader is sent to find out why the human colonies scattered across the stars are dying one by one.", series: null, tier: 1, topRank: null },
  { title: "A Plague of Pythons", author: "Frederik Pohl", pageCount: 192, genre: "Sci-Fi", publicationDate: "1965", description: "A man on trial for crimes he doesn't remember committing discovers the world is being secretly possessed by a small group of telepaths — an early Pohl paranoid thriller.", series: null, tier: 1, topRank: null },

  // Daniel Keyes (1)
  { title: "The Minds of Billy Milligan", author: "Daniel Keyes", pageCount: 432, genre: "Non-Fiction", publicationDate: "1981", description: "Keyes's true-crime study of Billy Milligan, the first person acquitted of major crimes by reason of multiple personality disorder — twenty-four separate personalities sharing one body.", series: null, tier: 1, topRank: null },

  // Jack Williamson (3)
  { title: "The Humanoids", author: "Jack Williamson", pageCount: 256, genre: "Sci-Fi", publicationDate: "1949", description: "An alien civilization arrives with perfect humanoid robots whose prime directive — to serve, obey, and guard men from harm — slowly dismantles human freedom.", series: null, tier: 1, topRank: null },
  { title: "Darker Than You Think", author: "Jack Williamson", pageCount: 256, genre: "Horror", publicationDate: "1948", description: "An anthropologist discovers that an ancient race of shape-shifting witch-people is returning to power — and that he is one of them. A foundational werewolf novel.", series: null, tier: 1, topRank: null },
  { title: "The Legion of Space", author: "Jack Williamson", pageCount: 272, genre: "Sci-Fi", publicationDate: "1934", description: "A classic space opera of a young Legion officer's quest with the loyalist Three Musketeers-style companions to rescue the heiress to the secret weapon AKKA.", series: null, tier: 1, topRank: null },

  // James Blish (1)
  { title: "The Seedling Stars", author: "James Blish", pageCount: 224, genre: "Sci-Fi", publicationDate: "1957", description: "Blish's fix-up of his 'pantropy' stories: the idea of adapting humans genetically to alien environments rather than adapting the environments to humans.", series: null, tier: 1, topRank: null },

  // Sheri S. Tepper (3)
  { title: "Raising the Stones", author: "Sheri S. Tepper", pageCount: 464, genre: "Sci-Fi", publicationDate: "1990", description: "On a colony world of ancient stone ruins, a new benevolent religion begins to literally transform its believers — until old Earth cultures try to stop it.", series: null, tier: 1, topRank: null },
  { title: "Beauty", author: "Sheri S. Tepper", pageCount: 432, genre: "Fantasy", publicationDate: "1991", description: "Tepper's feminist fairy tale: Sleeping Beauty escapes her curse by leaving her body behind, and her consciousness travels through time, witnessing humanity's collapse.", series: null, tier: 1, topRank: null },
  { title: "Sideshow", author: "Sheri S. Tepper", pageCount: 464, genre: "Sci-Fi", publicationDate: "1992", description: "On a planet where every sapient species is preserved in its own sealed enclave by a single alien authority, a delegation from Earth's Enforcement Office arrives to audit.", series: null, tier: 1, topRank: null },

  // Robert Charles Wilson (3)
  { title: "Axis", author: "Robert Charles Wilson", pageCount: 416, genre: "Sci-Fi", publicationDate: "2007", description: "The sequel to Spin: on the newly accessible world of Equatoria — opened to Earth by the Hypothetical arch — a man and his estranged father are drawn into an alien prophecy.", series: { name: "Spin", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Vortex", author: "Robert Charles Wilson", pageCount: 336, genre: "Sci-Fi", publicationDate: "2011", description: "Spin trilogy #3: ten thousand years after the events of Axis, a kidnapped Houston teenager becomes the key to the ultimate purpose of the Hypotheticals.", series: { name: "Spin", order: 3, total: 3 }, tier: 1, topRank: null },
  { title: "Darwinia", author: "Robert Charles Wilson", pageCount: 384, genre: "Sci-Fi", publicationDate: "1998", description: "On a single night in 1912, Europe vanishes and is replaced by an unearthly wilderness — and the exploration of this new 'Darwinia' reveals a truth that shatters physics.", series: null, tier: 1, topRank: null },

  // Joe Hill (2)
  { title: "20th Century Ghosts", author: "Joe Hill", pageCount: 320, genre: "Horror", publicationDate: "2005", description: "Hill's first book: a story collection including the British Fantasy Award-winning title story of a haunted movie theater and the widely reprinted 'Pop Art.'", series: null, tier: 1, topRank: null },
  { title: "Strange Weather", author: "Joe Hill", pageCount: 448, genre: "Horror", publicationDate: "2017", description: "Four short novels on strange weather and strange pasts: a child-stealing Polaroid, a kidnapper in the sky, a rain of nails, and a mass shooting witnessed from every side.", series: null, tier: 1, topRank: null },

  // Brian Lumley (4)
  { title: "Necroscope", author: "Brian Lumley", pageCount: 512, genre: "Horror", publicationDate: "1986", description: "A young Englishman who can speak with the dead is recruited by British intelligence to confront a Soviet spy agency that has developed its own psychic capabilities — including a vampire.", series: { name: "Necroscope", order: 1, total: 16 }, tier: 1, topRank: null },
  { title: "Wamphyri!", author: "Brian Lumley", pageCount: 528, genre: "Horror", publicationDate: "1988", description: "Necroscope II: Harry Keogh pursues the true identity of the Wamphyri across time and alternate dimensions while the Soviet psychic branch adapts his techniques.", series: { name: "Necroscope", order: 2, total: 16 }, tier: 1, topRank: null },
  { title: "The Source", author: "Brian Lumley", pageCount: 560, genre: "Horror", publicationDate: "1989", description: "Necroscope III: a Siberian expedition uncovers a gateway to the Wamphyri homeworld — and Harry Keogh is drawn into a war on their native ground.", series: { name: "Necroscope", order: 3, total: 16 }, tier: 1, topRank: null },
  { title: "Deadspeak", author: "Brian Lumley", pageCount: 512, genre: "Horror", publicationDate: "1990", description: "Necroscope IV: Harry Keogh, now himself a vampire, loses his ability to speak with the dead — and must recover his talent before ancient Wamphyri lords find him.", series: { name: "Necroscope", order: 4, total: 16 }, tier: 1, topRank: null },
];

console.log(`Will add ${ADDITIONS.length} books\n`);

const data = JSON.parse(fs.readFileSync(CATALOG, "utf8"));
const books = Array.isArray(data) ? data : (data.books || Object.values(data).find(v => Array.isArray(v)));
const before = books.length;

const existingKeys = new Set(books.map(b => (b.title + "|" + b.author).toLowerCase()));
const duplicates = [];
const toAdd = [];
for (const a of ADDITIONS) {
  const key = (a.title + "|" + a.author).toLowerCase();
  if (existingKeys.has(key)) duplicates.push(a);
  else { toAdd.push(a); existingKeys.add(key); }
}

if (duplicates.length > 0) {
  console.log(`⚠ Skipping ${duplicates.length} duplicates:`);
  for (const d of duplicates) console.log(`  - "${d.title}" — ${d.author}`);
}

const next = books.concat(toAdd);
fs.writeFileSync(CATALOG, JSON.stringify(next));
const stat = fs.statSync(CATALOG);
console.log(`\nAdded ${toAdd.length} books`);
console.log(`Before: ${before} | After: ${next.length}`);
console.log(`File size: ${(stat.size / 1024 / 1024).toFixed(2)} MB`);
