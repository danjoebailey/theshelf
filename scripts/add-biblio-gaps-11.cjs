const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");

const ADDITIONS = [
  // Cixin Liu (4)
  { title: "The Three-Body Problem", author: "Cixin Liu", pageCount: 400, genre: "Sci-Fi", publicationDate: "2008", description: "During the Cultural Revolution, a young astrophysicist beams a signal from a secret Chinese listening post — and an alien civilization answers. The first of the Remembrance of Earth's Past trilogy and Hugo winner.", series: { name: "Remembrance of Earth's Past", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "The Dark Forest", author: "Cixin Liu", pageCount: 512, genre: "Sci-Fi", publicationDate: "2008", description: "Four hundred years before the Trisolaran invasion fleet arrives, humanity appoints four secret 'Wallfacers' given unlimited resources to devise strategies they cannot reveal to anyone — the middle volume of Liu's trilogy.", series: { name: "Remembrance of Earth's Past", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Death's End", author: "Cixin Liu", pageCount: 608, genre: "Sci-Fi", publicationDate: "2010", description: "The final volume of Liu's trilogy spans millions of years as humanity confronts the true nature of the dark forest universe. Hugo finalist and the grandest-scale science fiction of the 21st century.", series: { name: "Remembrance of Earth's Past", order: 3, total: 3 }, tier: 1, topRank: null },
  { title: "Ball Lightning", author: "Cixin Liu", pageCount: 384, genre: "Sci-Fi", publicationDate: "2004", description: "A young atmospheric physicist whose parents were killed by ball lightning dedicates his life to the phenomenon — and discovers something at the intersection of physics and the paranormal.", series: null, tier: 1, topRank: null },

  // Greg Bear (4)
  { title: "Eternity", author: "Greg Bear", pageCount: 432, genre: "Sci-Fi", publicationDate: "1988", description: "The direct sequel to Eon: the asteroid habitat Axis returns to our universe carrying a Gate between times, and the conflict with the Jart civilization finally comes home.", series: { name: "The Way", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Legacy", author: "Greg Bear", pageCount: 416, genre: "Sci-Fi", publicationDate: "1995", description: "The prequel to Eon: a reluctant agent is sent through the asteroid's Gate to an alien biosphere planet whose ecology turns out to be a single networked mind.", series: { name: "The Way", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Anvil of Stars", author: "Greg Bear", pageCount: 432, genre: "Sci-Fi", publicationDate: "1992", description: "The sequel to The Forge of God: the survivors of Earth's destruction, rescued by benevolent aliens, set out on a thousand-year voyage to find and punish the civilization that murdered their world.", series: null, tier: 1, topRank: null },
  { title: "Vitals", author: "Greg Bear", pageCount: 368, genre: "Sci-Fi", publicationDate: "2002", description: "A biologist investigating longevity at the bottom of the ocean is caught up in a global conspiracy that began with Stalin's life-extension research.", series: null, tier: 1, topRank: null },

  // Orson Scott Card (5)
  { title: "The Memory of Earth", author: "Orson Scott Card", pageCount: 304, genre: "Sci-Fi", publicationDate: "1992", description: "The first of Card's Homecoming Saga: forty million years after humanity fled Earth to the planet Harmony, a planetary AI is failing and a family is chosen to return to the original homeworld.", series: { name: "Homecoming", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "The Call of Earth", author: "Orson Scott Card", pageCount: 320, genre: "Sci-Fi", publicationDate: "1992", description: "Homecoming #2: the chosen family gathers in the desert outside the great city of Basilica as the Oversoul begins to fail and their prophetic dreams intensify.", series: { name: "Homecoming", order: 2, total: 5 }, tier: 1, topRank: null },
  { title: "The Ships of Earth", author: "Orson Scott Card", pageCount: 352, genre: "Sci-Fi", publicationDate: "1994", description: "Homecoming #3: the travelers cross the desert on foot toward the ancient starships that will carry them back to Earth — Card's retelling of the Book of Mormon's exodus.", series: { name: "Homecoming", order: 3, total: 5 }, tier: 1, topRank: null },
  { title: "Songmaster", author: "Orson Scott Card", pageCount: 368, genre: "Sci-Fi", publicationDate: "1980", description: "One of Card's early novels: a gifted singer taken from his home to be trained at the Songhouse becomes the favorite of the galactic Emperor and a player in imperial politics.", series: null, tier: 1, topRank: null },
  { title: "Wyrms", author: "Orson Scott Card", pageCount: 272, genre: "Sci-Fi", publicationDate: "1987", description: "A young heir on a distant colony world is destined to mate with the monstrous Unwyrm — and must instead destroy it, using the fragmented legacy of her ancient ancestors.", series: null, tier: 1, topRank: null },

  // Stephen Baxter (3)
  { title: "Flood", author: "Stephen Baxter", pageCount: 496, genre: "Sci-Fi", publicationDate: "2008", description: "The seas begin to rise — not because of climate change but because subterranean water is being forced up by deep-crust pressure — and Baxter charts forty years of civilization's submersion.", series: null, tier: 1, topRank: null },
  { title: "Proxima", author: "Stephen Baxter", pageCount: 464, genre: "Sci-Fi", publicationDate: "2013", description: "A reluctant colonist is dropped on a tidally locked planet orbiting Proxima Centauri and discovers the remnants of earlier visitors — and the true shape of the solar system's history.", series: null, tier: 1, topRank: null },
  { title: "Manifold: Time", author: "Stephen Baxter", pageCount: 480, genre: "Sci-Fi", publicationDate: "1999", description: "A near-future entrepreneur launches a private asteroid-mining mission and receives a message from the deep future — the first volume of Baxter's Manifold trilogy.", series: { name: "Manifold", order: 1, total: 3 }, tier: 1, topRank: null },

  // Dan Simmons (2)
  { title: "Phases of Gravity", author: "Dan Simmons", pageCount: 288, genre: "Fiction", publicationDate: "1989", description: "A retired Apollo astronaut, adrift in middle age, travels to sites of personal significance — India, Colorado, Poland — trying to locate what his life has come to.", series: null, tier: 1, topRank: null },
  { title: "Children of the Night", author: "Dan Simmons", pageCount: 416, genre: "Horror", publicationDate: "1992", description: "A hematologist specializing in rare blood diseases adopts a Romanian orphan carrying a genetic anomaly — and discovers the ancient secret of Dracula's bloodline.", series: null, tier: 1, topRank: null },

  // Neal Stephenson (1)
  { title: "The Rise and Fall of D.O.D.O.", author: "Neal Stephenson", pageCount: 768, genre: "Sci-Fi", publicationDate: "2017", description: "Stephenson's collaboration with Nicole Galland: a Department of Diachronic Operations is formed to bring magic — and time travel — back to a modern world that has lost both.", series: null, tier: 1, topRank: null },

  // Peter F. Hamilton (1)
  { title: "A Second Chance at Eden", author: "Peter F. Hamilton", pageCount: 448, genre: "Sci-Fi", publicationDate: "1998", description: "A collection set in the Confederation universe of Hamilton's Night's Dawn trilogy — seven stories spanning the development of bitek starships and the Edenist culture.", series: null, tier: 1, topRank: null },

  // Brandon Sanderson (1)
  { title: "Alcatraz versus the Evil Librarians", author: "Brandon Sanderson", pageCount: 320, genre: "Young Adult", publicationDate: "2007", description: "A foster kid named Alcatraz discovers on his thirteenth birthday that he has a magical talent for breaking things — and that a secret cult of librarians controls the world.", series: { name: "Alcatraz", order: 1, total: 6 }, tier: 1, topRank: null },

  // Michael Moorcock (3)
  { title: "An Alien Heat", author: "Michael Moorcock", pageCount: 192, genre: "Sci-Fi", publicationDate: "1972", description: "The first Dancers at the End of Time novel: in the literal last days of humanity, the decadent immortal Jherek Carnelian falls in love with a Victorian time traveler.", series: { name: "Dancers at the End of Time", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "The Hollow Lands", author: "Michael Moorcock", pageCount: 192, genre: "Sci-Fi", publicationDate: "1974", description: "Dancers at the End of Time #2: Jherek Carnelian travels through time to recover his lost Victorian love — and becomes increasingly entangled with 19th-century London.", series: { name: "Dancers at the End of Time", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "The End of All Songs", author: "Michael Moorcock", pageCount: 256, genre: "Sci-Fi", publicationDate: "1976", description: "Dancers at the End of Time #3: Jherek and his lover finally return to the End of Time just as the universe's energy begins its final collapse.", series: { name: "Dancers at the End of Time", order: 3, total: 3 }, tier: 1, topRank: null },

  // Raymond E. Feist (6)
  { title: "The King's Buccaneer", author: "Raymond E. Feist", pageCount: 624, genre: "Fantasy", publicationDate: "1992", description: "Prince Nicholas of Krondor, sent to Crydee to learn statecraft, stumbles into a kidnapping conspiracy that leads him across the sea to the mysterious island of the Sunset Kingdoms.", series: null, tier: 1, topRank: null },
  { title: "Talon of the Silver Hawk", author: "Raymond E. Feist", pageCount: 400, genre: "Fantasy", publicationDate: "2002", description: "The first Conclave of Shadows novel: a young Orosini boy whose people are slaughtered is taken in by a secret society of agents and trained for revenge.", series: { name: "Conclave of Shadows", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "King of Foxes", author: "Raymond E. Feist", pageCount: 400, genre: "Fantasy", publicationDate: "2003", description: "Conclave of Shadows #2: Talon of the Silver Hawk takes on the identity of Tal Hawkins and infiltrates the court of the Duke who destroyed his people.", series: { name: "Conclave of Shadows", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Flight of the Nighthawks", author: "Raymond E. Feist", pageCount: 384, genre: "Fantasy", publicationDate: "2005", description: "The first Darkwar Saga novel: the Nighthawks assassin cult returns to plague the Kingdom of the Isles as Pug and the Conclave of Shadows prepare for a deeper threat.", series: { name: "Darkwar Saga", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Into a Dark Realm", author: "Raymond E. Feist", pageCount: 400, genre: "Fantasy", publicationDate: "2006", description: "Darkwar Saga #2: Pug and his companions journey to the nightmarish home-world of the Dasati to learn how to stop an ancient god from returning.", series: { name: "Darkwar Saga", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Murder in LaMut", author: "Raymond E. Feist", pageCount: 416, genre: "Fantasy", publicationDate: "2002", description: "The second Legends of the Riftwar novel, co-written with Joel Rosenberg: three mercenaries caught in a snowbound keep at LaMut must solve a series of locked-room murders.", series: { name: "Legends of the Riftwar", order: 2, total: 3 }, tier: 1, topRank: null },

  // Terry Brooks (5)
  { title: "Magic Kingdom for Sale—Sold!", author: "Terry Brooks", pageCount: 352, genre: "Fantasy", publicationDate: "1986", description: "A grieving Chicago lawyer sees an ad for a real magic kingdom in a Christmas catalog, buys it for a million dollars, and arrives to find Landover in political and magical collapse.", series: { name: "Landover", order: 1, total: 8 }, tier: 1, topRank: null },
  { title: "The Black Unicorn", author: "Terry Brooks", pageCount: 320, genre: "Fantasy", publicationDate: "1987", description: "Landover #2: the new king Ben Holiday hunts the legendary black unicorn to solve a mystery that has been haunting him — while the wizard Questor Thews has his own secret.", series: { name: "Landover", order: 2, total: 8 }, tier: 1, topRank: null },
  { title: "Wizard at Large", author: "Terry Brooks", pageCount: 320, genre: "Fantasy", publicationDate: "1988", description: "Landover #3: Questor Thews accidentally makes the scribe Abernathy human and sends him back to Earth — and a dragon follows him.", series: { name: "Landover", order: 3, total: 8 }, tier: 1, topRank: null },
  { title: "Running with the Demon", author: "Terry Brooks", pageCount: 416, genre: "Fantasy", publicationDate: "1997", description: "The first Word & Void novel: a fourteen-year-old girl in small-town Illinois must choose between two ancient supernatural forces over one terrifying Fourth of July weekend.", series: { name: "Word & Void", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Armageddon's Children", author: "Terry Brooks", pageCount: 384, genre: "Fantasy", publicationDate: "2006", description: "The first of Brooks's Genesis of Shannara trilogy, set in a post-apocalyptic 21st century that eventually becomes the world of the original Shannara books.", series: { name: "Genesis of Shannara", order: 1, total: 3 }, tier: 1, topRank: null },

  // Neil Gaiman (2)
  { title: "InterWorld", author: "Neil Gaiman", pageCount: 240, genre: "Young Adult", publicationDate: "2007", description: "Gaiman's YA collaboration with Michael Reaves: a teenage boy discovers he can walk between parallel Earths and is recruited into an interdimensional peacekeeping force.", series: null, tier: 1, topRank: null },
  { title: "The Books of Magic", author: "Neil Gaiman", pageCount: 208, genre: "Graphic Novel", publicationDate: "1990", description: "Gaiman's DC Comics miniseries introducing Tim Hunter, a young English boy destined to become the greatest magician of his age — a tour of the DC occult universe.", series: null, tier: 1, topRank: null },

  // Dan Abnett (5)
  { title: "Xenos", author: "Dan Abnett", pageCount: 416, genre: "Sci-Fi", publicationDate: "2001", description: "The first Eisenhorn novel: Imperial Inquisitor Gregor Eisenhorn hunts a heretical book across multiple star systems, drawn into a conspiracy that will test his own orthodoxy — Warhammer 40K.", series: { name: "Eisenhorn", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Malleus", author: "Dan Abnett", pageCount: 400, genre: "Sci-Fi", publicationDate: "2001", description: "Eisenhorn #2: one hundred years after the events of Xenos, Eisenhorn's crew faces a daemon hunt that forces him to contemplate crossing the line into radicalism.", series: { name: "Eisenhorn", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Hereticus", author: "Dan Abnett", pageCount: 416, genre: "Sci-Fi", publicationDate: "2002", description: "Eisenhorn #3: now firmly a radical Inquisitor, Eisenhorn pursues an ancient enemy while his own order turns against him — the completion of the trilogy.", series: { name: "Eisenhorn", order: 3, total: 3 }, tier: 1, topRank: null },
  { title: "First and Only", author: "Dan Abnett", pageCount: 416, genre: "Sci-Fi", publicationDate: "1999", description: "The first Gaunt's Ghosts novel: Commissar-Colonel Ibram Gaunt leads a regiment of stealth troops through the meat grinder of an Imperial crusade — the start of Abnett's long 40K war saga.", series: { name: "Gaunt's Ghosts", order: 1, total: 16 }, tier: 1, topRank: null },
  { title: "Ghostmaker", author: "Dan Abnett", pageCount: 384, genre: "Sci-Fi", publicationDate: "2000", description: "Gaunt's Ghosts #2: a fix-up of linked stories introducing each of the named members of the Tanith First regiment, woven together as Gaunt prepares for the Monthax campaign.", series: { name: "Gaunt's Ghosts", order: 2, total: 16 }, tier: 1, topRank: null },
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
