const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "The Flame and the Flower", author: "Kathleen E. Woodiwiss", pageCount: 608, genre: "Romance", publicationDate: "1972-04-01", description: "A penniless English girl is taken aboard a ship bound for colonial America by a brash sea captain — the novel credited with launching the modern romance genre.", series: null, tier: "S", topRank: null },
  { title: "The Wolf and the Dove", author: "Kathleen E. Woodiwiss", pageCount: 576, genre: "Romance", publicationDate: "1974-01-01", description: "A Saxon noblewoman is taken captive by a Norman knight after the Battle of Hastings.", series: null, tier: "S", topRank: null },
  { title: "Shanna", author: "Kathleen E. Woodiwiss", pageCount: 720, genre: "Romance", publicationDate: "1977-01-01", description: "An heiress marries a condemned man for his name, then finds him alive and pursuing her in the Caribbean.", series: null, tier: "A", topRank: null },
  { title: "Ashes in the Wind", author: "Kathleen E. Woodiwiss", pageCount: 672, genre: "Romance", publicationDate: "1979-01-01", description: "A Southern belle disguises herself as a boy to survive the Civil War and becomes entangled with a Union doctor.", series: null, tier: "A", topRank: null },

  { title: "In the Shadow of No Towers", author: "Art Spiegelman", pageCount: 42, genre: "Graphic Novel", publicationDate: "2004-09-07", description: "Spiegelman's response to 9/11 in oversized broadsheet plates, weaving personal witness and early American newspaper comics.", series: null, tier: "A", topRank: null },

  { title: "Dykes to Watch Out For", author: "Alison Bechdel", pageCount: 408, genre: "Graphic Novel", publicationDate: "2008-11-25", description: "The collected edition of Bechdel's pioneering long-running strip about a community of lesbian friends in an unnamed American city.", series: null, tier: "A", topRank: null },
  { title: "The Secret to Superhuman Strength", author: "Alison Bechdel", pageCount: 240, genre: "Graphic Novel", publicationDate: "2021-05-04", description: "A graphic memoir about Bechdel's lifelong fitness obsessions and the thinkers who shaped her ideas of the body.", series: null, tier: "A", topRank: null },

  { title: "Carnet de Voyage", author: "Craig Thompson", pageCount: 224, genre: "Graphic Novel", publicationDate: "2004-01-01", description: "A sketch-diary of Thompson's two-month book tour through Europe and Morocco.", series: null, tier: "A", topRank: null },
  { title: "Space Dumplins", author: "Craig Thompson", pageCount: 320, genre: "Graphic Novel", publicationDate: "2015-08-25", description: "A space-faring family of galactic trawlers hunts giant whales for the fuel that keeps the universe running.", series: null, tier: "B", topRank: null },

  { title: "Boxers & Saints", author: "Gene Luen Yang", pageCount: 512, genre: "Graphic Novel", publicationDate: "2013-09-10", description: "A two-volume graphic novel on the Boxer Rebellion, told from both sides — the peasant Chinese rebels and a Christian convert girl.", series: null, tier: "S", topRank: null },
  { title: "Dragon Hoops", author: "Gene Luen Yang", pageCount: 448, genre: "Graphic Novel", publicationDate: "2020-03-17", description: "A nonfiction graphic novel about Yang's year embedded with a California high school basketball team chasing a state championship.", series: null, tier: "A", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  // Old-school historical romance
  { title: "A Knight in Shining Armor", author: "Jude Deveraux", pageCount: 448, genre: "Romance", publicationDate: "1989-01-01", description: "A modern American woman abandoned by her fiancé in England weeps on a sixteenth-century knight's tomb — and calls him back to life.", series: null, tier: "A", topRank: null },
  { title: "The Velvet Promise", author: "Jude Deveraux", pageCount: 432, genre: "Romance", publicationDate: "1981-01-01", description: "The first Montgomery family novel: a medieval lord's arranged marriage turns into a long fight for trust.", series: { name: "Montgomery", order: 1, total: 15 }, tier: "B", topRank: null },
  { title: "The Maiden", author: "Jude Deveraux", pageCount: 432, genre: "Romance", publicationDate: "1988-01-01", description: "A fierce warrior queen from a tiny Scandinavian country marries into the Montgomery family.", series: { name: "Montgomery", order: 4, total: 15 }, tier: "B", topRank: null },

  { title: "The Bride", author: "Julie Garwood", pageCount: 384, genre: "Romance", publicationDate: "1989-01-01", description: "An English noblewoman is married off to a Scottish laird by order of the king and slowly wins her way into his clan.", series: { name: "Lairds' Fiancées", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "The Secret", author: "Julie Garwood", pageCount: 400, genre: "Romance", publicationDate: "1992-01-01", description: "Childhood friends from opposite sides of the Scottish border are reunited as adults when one of them needs to save her sister.", series: null, tier: "A", topRank: null },
  { title: "Ransom", author: "Julie Garwood", pageCount: 416, genre: "Romance", publicationDate: "1999-01-01", description: "A Scottish highlander and an English lady get caught up in a kidnapping during the time of King John.", series: null, tier: "A", topRank: null },

  { title: "Devil's Bride", author: "Stephanie Laurens", pageCount: 464, genre: "Romance", publicationDate: "1998-01-01", description: "The first Cynster novel: a rakish Devil Cynster is forced into a marriage of convenience that neither of them expected to survive.", series: { name: "Cynster", order: 1, total: 22 }, tier: "A", topRank: null },
  { title: "A Secret Love", author: "Stephanie Laurens", pageCount: 432, genre: "Romance", publicationDate: "2000-01-01", description: "A young widowed baroness hides her new love affair from her meddling Cynster cousins.", series: { name: "Cynster", order: 5, total: 22 }, tier: "B", topRank: null },
  { title: "On a Wild Night", author: "Stephanie Laurens", pageCount: 400, genre: "Romance", publicationDate: "2002-01-01", description: "An independent heiress and a rakish Cynster collide while searching for the same missing woman.", series: { name: "Cynster", order: 8, total: 22 }, tier: "B", topRank: null },

  { title: "Rafe", author: "Rebekah Weatherspoon", pageCount: 224, genre: "Romance", publicationDate: "2018-01-01", description: "A billionaire single mom hires a rugged cowboy nanny for her twins in the first Cowboys of California novel.", series: { name: "Cowboys of California", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "Xeni", author: "Rebekah Weatherspoon", pageCount: 320, genre: "Romance", publicationDate: "2019-01-01", description: "A woman inherits her aunt's Vermont estate on the condition that she marry the Scottish handyman within a month.", series: null, tier: "A", topRank: null },

  // Adult graphic novels
  { title: "The Umbrella Academy: Apocalypse Suite", author: "Gerard Way", pageCount: 184, genre: "Graphic Novel", publicationDate: "2008-01-01", description: "Seven estranged siblings raised as superheroes reunite for their father's funeral as the world begins to end.", series: { name: "The Umbrella Academy", order: 1, total: 4 }, tier: "A", topRank: null },
  { title: "The Umbrella Academy: Dallas", author: "Gerard Way", pageCount: 184, genre: "Graphic Novel", publicationDate: "2009-01-01", description: "The Umbrella siblings are drawn into the assassination of JFK — which one of them may have to commit.", series: { name: "The Umbrella Academy", order: 2, total: 4 }, tier: "A", topRank: null },
  { title: "The Umbrella Academy: Hotel Oblivion", author: "Gerard Way", pageCount: 216, genre: "Graphic Novel", publicationDate: "2019-01-01", description: "The villains the Monocle imprisoned in a hotel between dimensions finally break out.", series: { name: "The Umbrella Academy", order: 3, total: 4 }, tier: "A", topRank: null },

  { title: "Arzach", author: "Moebius", pageCount: 96, genre: "Graphic Novel", publicationDate: "1976-01-01", description: "Wordless adventures of a silent warrior riding a pterodactyl through a strange alien landscape.", series: null, tier: "S", topRank: null },
  { title: "The Incal", author: "Moebius", pageCount: 320, genre: "Graphic Novel", publicationDate: "1981-01-01", description: "A cosmic science-fantasy epic written by Jodorowsky and drawn by Moebius — the class-three detective John Difool and the black Incal.", series: null, tier: "S", topRank: null },
  { title: "The Airtight Garage", author: "Moebius", pageCount: 128, genre: "Graphic Novel", publicationDate: "1979-01-01", description: "A surreal, stream-of-consciousness science-fiction story set inside a vast artificial world built by a renegade scientist.", series: null, tier: "A", topRank: null },

  { title: "My Favorite Thing Is Monsters Book One", author: "Emil Ferris", pageCount: 416, genre: "Graphic Novel", publicationDate: "2017-02-14", description: "A ten-year-old girl in 1968 Chicago believes she's a werewolf and investigates the death of her Holocaust-survivor neighbor in a notebook drawn with ballpoint pen.", series: null, tier: "S", topRank: null },
  { title: "My Favorite Thing Is Monsters Book Two", author: "Emil Ferris", pageCount: 416, genre: "Graphic Novel", publicationDate: "2024-05-28", description: "The long-awaited conclusion to Ferris's ballpoint-pen masterpiece brings Karen's investigation to its painful revelations.", series: null, tier: "S", topRank: null },

  { title: "On a Sunbeam", author: "Tillie Walden", pageCount: 544, genre: "Graphic Novel", publicationDate: "2018-10-02", description: "A restoration crew travels through a strange interstellar future, mending ruined buildings and, eventually, lost loves.", series: null, tier: "S", topRank: null },
  { title: "Are You Listening?", author: "Tillie Walden", pageCount: 320, genre: "Graphic Novel", publicationDate: "2019-09-10", description: "Two women drive across a dreamlike Texas carrying a cat that is not quite what it seems.", series: null, tier: "A", topRank: null },
  { title: "Clementine Book One", author: "Tillie Walden", pageCount: 256, genre: "Graphic Novel", publicationDate: "2022-06-28", description: "A young amputee survivor of a zombie apocalypse sets out with a new companion across a ruined world.", series: { name: "Clementine", order: 1, total: 3 }, tier: "A", topRank: null },

  { title: "Sabrina", author: "Nick Drnaso", pageCount: 204, genre: "Graphic Novel", publicationDate: "2018-05-22", description: "A young woman disappears and the video footage that may explain her death unfolds into a study of loneliness and conspiracy culture.", series: null, tier: "S", topRank: null },
  { title: "Acting Class", author: "Nick Drnaso", pageCount: 272, genre: "Graphic Novel", publicationDate: "2022-08-16", description: "Ten strangers sign up for an acting class led by an unsettling instructor whose exercises blur the line between performance and reality.", series: null, tier: "A", topRank: null },

  { title: "Tamara Drewe", author: "Posy Simmonds", pageCount: 136, genre: "Graphic Novel", publicationDate: "2007-01-01", description: "A riff on Hardy's Far from the Madding Crowd set in a modern Dorset writer's retreat, in elegant long-form cartoons.", series: null, tier: "A", topRank: null },
  { title: "Gemma Bovery", author: "Posy Simmonds", pageCount: 106, genre: "Graphic Novel", publicationDate: "1999-01-01", description: "A rural Norman baker watches an English couple named Bovery move in next door and worries about literary fate.", series: null, tier: "A", topRank: null },
  { title: "Cassandra Darke", author: "Posy Simmonds", pageCount: 96, genre: "Graphic Novel", publicationDate: "2018-11-06", description: "A disgraced London art dealer blunders into a case of murder and trafficking in the winter snow.", series: null, tier: "A", topRank: null },
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
