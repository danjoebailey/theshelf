const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "Sometimes a Great Notion", author: "Ken Kesey", pageCount: 736, genre: "Fiction", publicationDate: "1964-01-01", description: "A stubborn Oregon logging family breaks a timber workers' strike and tears itself apart — Kesey's sprawling second novel.", series: null, tier: "S", topRank: null },

  { title: "Candy", author: "Terry Southern", pageCount: 224, genre: "Fiction", publicationDate: "1958-01-01", description: "An innocent young American girl encounters a parade of grotesque lecherous men in Southern's subversive satirical novel, co-written with Mason Hoffenberg.", series: null, tier: "A", topRank: null },
  { title: "The Magic Christian", author: "Terry Southern", pageCount: 144, genre: "Fiction", publicationDate: "1959-01-01", description: "An eccentric billionaire runs elaborate pranks to expose the greed of everyone around him — the source of the Peter Sellers film.", series: null, tier: "A", topRank: null },

  { title: "The Spider's House", author: "Paul Bowles", pageCount: 416, genre: "Fiction", publicationDate: "1955-01-01", description: "An American writer in 1954 Fez watches colonial Morocco collapse as independence arrives.", series: null, tier: "A", topRank: null },
  { title: "Up Above the World", author: "Paul Bowles", pageCount: 224, genre: "Fiction", publicationDate: "1966-01-01", description: "An American couple traveling in Central America is slowly poisoned by a charming young man and his mother.", series: null, tier: "A", topRank: null },

  { title: "Steps", author: "Jerzy Kosinski", pageCount: 160, genre: "Fiction", publicationDate: "1968-01-01", description: "A series of fragmentary scenes of brutality and displacement — Kosinski's National Book Award winner.", series: null, tier: "S", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  // Beat second tier / core prose
  { title: "Go", author: "John Clellon Holmes", pageCount: 336, genre: "Fiction", publicationDate: "1952-01-01", description: "The novel that first portrayed the Beat Generation in print — a thinly veiled account of Kerouac, Ginsberg, Cassady, and Holmes himself in late 1940s New York.", series: null, tier: "S", topRank: null },
  { title: "The Horn", author: "John Clellon Holmes", pageCount: 256, genre: "Fiction", publicationDate: "1958-01-01", description: "A dying bebop saxophonist's last night in New York, told in ensemble voices — Holmes's jazz novel.", series: null, tier: "A", topRank: null },

  { title: "The First Third", author: "Neal Cassady", pageCount: 208, genre: "Non-Fiction", publicationDate: "1971-01-01", description: "Cassady's unfinished posthumous autobiography — the Denver childhood that Kerouac mythologized as Dean Moriarty.", series: null, tier: "A", topRank: null },

  { title: "Guilty of Everything", author: "Herbert Huncke", pageCount: 208, genre: "Non-Fiction", publicationDate: "1990-01-01", description: "The Times Square hustler who gave the Beats the word 'beat' finally writes his own memoir.", series: null, tier: "A", topRank: null },
  { title: "The Herbert Huncke Reader", author: "Herbert Huncke", pageCount: 416, genre: "Fiction", publicationDate: "1997-01-01", description: "Huncke's collected stories, sketches, and memoir pieces from decades on the margins of the Beat circle.", series: null, tier: "A", topRank: null },

  { title: "Memoirs of a Beatnik", author: "Diane di Prima", pageCount: 208, genre: "Non-Fiction", publicationDate: "1969-01-01", description: "Di Prima's unapologetic sexual-countercultural memoir of her years in downtown New York.", series: null, tier: "A", topRank: null },
  { title: "Recollections of My Life as a Woman", author: "Diane di Prima", pageCount: 432, genre: "Non-Fiction", publicationDate: "2001-01-01", description: "Di Prima's long, reflective account of her early life as a young woman in the 1950s Beat scene.", series: null, tier: "A", topRank: null },

  { title: "Cain's Book", author: "Alexander Trocchi", pageCount: 256, genre: "Fiction", publicationDate: "1960-01-01", description: "A Scottish junkie on a New York scow boat on the Hudson River keeps a hermetic heroin journal — Trocchi's cult masterwork.", series: null, tier: "S", topRank: null },
  { title: "Young Adam", author: "Alexander Trocchi", pageCount: 192, genre: "Fiction", publicationDate: "1954-01-01", description: "A Glasgow barge worker and an affair with the skipper's wife — Trocchi's earlier existential crime novel.", series: null, tier: "A", topRank: null },

  { title: "Memoirs of a Bastard Angel", author: "Harold Norse", pageCount: 528, genre: "Non-Fiction", publicationDate: "1989-01-01", description: "Harold Norse's memoir of a half-century of Beat and post-Beat queer literary life across America, Italy, and Morocco.", series: null, tier: "A", topRank: null },

  // Beat-adjacent fellow travelers
  { title: "City of Night", author: "John Rechy", pageCount: 400, genre: "Fiction", publicationDate: "1963-01-01", description: "A young hustler drifts through the gay underworlds of 1960s New York, Hollywood, and New Orleans — Rechy's canonical debut.", series: null, tier: "S", topRank: null },
  { title: "Numbers", author: "John Rechy", pageCount: 256, genre: "Fiction", publicationDate: "1967-01-01", description: "A handsome hustler returns to Los Angeles and tries to break his own record for anonymous sexual encounters.", series: null, tier: "A", topRank: null },
  { title: "The Sexual Outlaw", author: "John Rechy", pageCount: 304, genre: "Non-Fiction", publicationDate: "1977-01-01", description: "Rechy's hybrid novel-essay-documentary of pre-AIDS Los Angeles gay cruising and political rage.", series: null, tier: "A", topRank: null },

  { title: "Nog", author: "Rudy Wurlitzer", pageCount: 192, genre: "Fiction", publicationDate: "1969-01-01", description: "An amnesiac drifter wanders a disintegrating late-sixties America with a mechanical octopus — Wurlitzer's cult debut.", series: null, tier: "A", topRank: null },
  { title: "Flats", author: "Rudy Wurlitzer", pageCount: 176, genre: "Fiction", publicationDate: "1970-01-01", description: "A nameless group of survivors on a featureless American plain take on the names of American cities.", series: null, tier: "A", topRank: null },

  { title: "Wild at Heart", author: "Barry Gifford", pageCount: 192, genre: "Fiction", publicationDate: "1989-01-01", description: "Sailor Ripley and Lula Fortune flee Lula's mother across the American South — Gifford's pulpy cult novel adapted by David Lynch.", series: { name: "Sailor and Lula", order: 1, total: 7 }, tier: "A", topRank: null },
  { title: "Night People", author: "Barry Gifford", pageCount: 208, genre: "Fiction", publicationDate: "1992-01-01", description: "Two serial killer women and their boyfriends drift through a hallucinatory mid-nineties Southern landscape.", series: null, tier: "A", topRank: null },

  // Counterculture / psychedelia
  { title: "Eve's Hollywood", author: "Eve Babitz", pageCount: 320, genre: "Fiction", publicationDate: "1974-01-01", description: "Babitz's comic autobiographical portrait of being a young woman in 1970s Los Angeles — NYRB Classics.", series: null, tier: "S", topRank: null },
  { title: "Slow Days, Fast Company", author: "Eve Babitz", pageCount: 192, genre: "Fiction", publicationDate: "1977-01-01", description: "More linked autobiographical sketches of Babitz's Los Angeles — the rock stars, gamblers, and heiresses she ran with.", series: null, tier: "S", topRank: null },
  { title: "Sex and Rage", author: "Eve Babitz", pageCount: 240, genre: "Fiction", publicationDate: "1979-01-01", description: "A young Los Angeles woman's rise from surfer girl to literary Manhattan.", series: null, tier: "A", topRank: null },

  { title: "The Teachings of Don Juan", author: "Carlos Castaneda", pageCount: 272, genre: "Non-Fiction", publicationDate: "1968-01-01", description: "Castaneda's canonical (and disputed) account of his apprenticeship to a Yaqui Indian sorcerer in the Sonoran Desert.", series: null, tier: "S", topRank: null },
  { title: "A Separate Reality", author: "Carlos Castaneda", pageCount: 320, genre: "Non-Fiction", publicationDate: "1971-01-01", description: "Castaneda's second book continues his training with Don Juan deeper into the hallucinogenic world.", series: null, tier: "A", topRank: null },

  { title: "Flashbacks", author: "Timothy Leary", pageCount: 448, genre: "Non-Fiction", publicationDate: "1983-01-01", description: "Leary's autobiography — Harvard, Millbrook, Algerian exile with the Black Panthers, federal prison, Ram Dass, and Haight-Ashbury.", series: null, tier: "A", topRank: null },

  // Women of the Beat Generation — memoir
  { title: "Minor Characters", author: "Joyce Johnson", pageCount: 288, genre: "Non-Fiction", publicationDate: "1983-01-01", description: "Johnson's memoir of being Kerouac's girlfriend at twenty-one — National Book Critics Circle Award winner.", series: null, tier: "S", topRank: null },
  { title: "Door Wide Open", author: "Joyce Johnson", pageCount: 208, genre: "Non-Fiction", publicationDate: "2000-01-01", description: "Johnson and Kerouac's two-year correspondence, woven with her own recollections of the period.", series: null, tier: "A", topRank: null },

  { title: "Off the Road", author: "Carolyn Cassady", pageCount: 464, genre: "Non-Fiction", publicationDate: "1990-01-01", description: "Neal Cassady's wife writes her own side of the Kerouac-Cassady-Ginsberg years.", series: null, tier: "A", topRank: null },

  { title: "How I Became Hettie Jones", author: "Hettie Jones", pageCount: 240, genre: "Non-Fiction", publicationDate: "1990-01-01", description: "Hettie Cohen's memoir of her marriage to LeRoi Jones (Amiri Baraka) and the 1950s interracial downtown New York scene.", series: null, tier: "A", topRank: null },

  { title: "Troia: Mexican Memoirs", author: "Brenda Frazer", pageCount: 240, genre: "Non-Fiction", publicationDate: "1969-01-01", description: "Bonnie Bremser's memoir of travelling through Mexico with her poet husband Ray and their infant daughter, surviving on sex work.", series: null, tier: "A", topRank: null },
];

function keyOf(b) { return (b.title + "|" + b.author).toLowerCase(); }

const data = JSON.parse(fs.readFileSync(CATALOG, "utf8"));
const books = Array.isArray(data) ? data : (data.books || []);
const existingKeys = new Set(books.map(keyOf));
const freshPrimary = PRIMARY_ADDITIONS.filter(b => !existingKeys.has(keyOf(b)));
const nextBooks = books.concat(freshPrimary);
fs.writeFileSync(CATALOG, JSON.stringify(Array.isArray(data) ? nextBooks : { ...data, books: nextBooks }));
console.log(`PRIMARY: added ${freshPrimary.length} books, ${books.length} → ${nextBooks.length}`);

let recData = fs.existsSync(REC_LIBRARY) ? JSON.parse(fs.readFileSync(REC_LIBRARY, "utf8")) : [];
const recBooks = Array.isArray(recData) ? recData : (recData.books || []);
const recKeys = new Set(recBooks.map(keyOf));
const freshRec = REC_LIBRARY_ADDITIONS.filter(b => !recKeys.has(keyOf(b)));
const nextRec = recBooks.concat(freshRec);
fs.writeFileSync(REC_LIBRARY, JSON.stringify(Array.isArray(recData) || !recData.books ? nextRec : { ...recData, books: nextRec }));
console.log(`REC LIBRARY: added ${freshRec.length}, ${recBooks.length} → ${nextRec.length}`);

const pSize = (fs.statSync(CATALOG).size / 1024 / 1024).toFixed(2);
const rSize = (fs.statSync(REC_LIBRARY).size / 1024).toFixed(1);
console.log(`\nbook-data.json: ${pSize} MB`);
console.log(`rec-library.json: ${rSize} KB`);
