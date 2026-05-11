// Adds 22 rec-library entries identified as gaps from a real shelf-scan
// audit (literary classics + crime + comedic novels missing from both
// primary book-data.json and rec-library.json). Across Five Aprils
// skipped per the "no children's works" rule.
//
// Run: node scripts/add-rec-shelf-scan-gaps.cjs
// Idempotent: skips any title+author combo that's already in either catalog.

const fs = require("fs");
const path = require("path");

const PRIMARY = path.join(__dirname, "..", "public", "book-data.json");
const REC = path.join(__dirname, "..", "public", "rec-library.json");

const primary = JSON.parse(fs.readFileSync(PRIMARY, "utf8"));
const rec = JSON.parse(fs.readFileSync(REC, "utf8"));

const norm = s => (s || "").toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim();
const existing = new Set();
[...primary, ...rec].forEach(b => existing.add(`${norm(b.title)}|${norm(b.author)}`));

const maxId = Math.max(...rec.map(b => b.id || 0), ...primary.map(b => b.id || 0));
let nextId = maxId + 1;

const TIER_2 = 2;
const TIER_3 = 3;

const ADDITIONS = [
  // E.F. Benson — Lucia cycle (comic English social satire, 1920–1939)
  { title: "Queen Lucia", author: "E.F. Benson", pageCount: 320, genre: "Fiction", publicationDate: "1920",
    description: "Mrs. Emmeline 'Lucia' Lucas presides over the social life of Riseholme with theatrical pretension and a thin veneer of Italian culture — until a younger rival threatens her cultural monopoly.",
    series: { name: "Lucia", order: 1, total: 6 }, tier: TIER_2 },
  { title: "Miss Mapp", author: "E.F. Benson", pageCount: 256, genre: "Fiction", publicationDate: "1922",
    description: "In the seaside town of Tilling, Elizabeth Mapp wages quiet, vicious campaigns of social manipulation from her ideally-situated garden room. Introduces Lucia's eventual nemesis.",
    series: { name: "Lucia", order: 2, total: 6 }, tier: TIER_2 },
  { title: "Lucia in London", author: "E.F. Benson", pageCount: 304, genre: "Fiction", publicationDate: "1927",
    description: "Lucia, newly widowed and newly rich, decamps for a season of London society and discovers the metropolis offers fresh stages and fresh rivals to conquer.",
    series: { name: "Lucia", order: 3, total: 6 }, tier: TIER_2 },
  { title: "Mapp and Lucia", author: "E.F. Benson", pageCount: 320, genre: "Fiction", publicationDate: "1931",
    description: "Lucia rents Mallards in Tilling and the two grand social tacticians finally meet, beginning a campaign of escalating courtesies and quiet warfare over the town's allegiance.",
    series: { name: "Lucia", order: 4, total: 6 }, tier: TIER_2 },
  { title: "Lucia's Progress", author: "E.F. Benson", pageCount: 304, genre: "Fiction", publicationDate: "1935",
    description: "Lucia, ascendant in Tilling, expands her empire — stock-market speculation, archaeological discovery, and the mayor's chain glitter as new prizes. Also published as The Worshipful Lucia.",
    series: { name: "Lucia", order: 5, total: 6 }, tier: TIER_2 },
  { title: "Trouble for Lucia", author: "E.F. Benson", pageCount: 288, genre: "Fiction", publicationDate: "1939",
    description: "Lucia rises to Mayor of Tilling and finds the ceremonial robes barely cover the daily skirmishes with Mapp, Georgie, and a roster of rivals jockeying for civic notice.",
    series: { name: "Lucia", order: 6, total: 6 }, tier: TIER_2 },

  // Nicholas Meyer — Sherlock Holmes pastiches (1974–2024)
  { title: "The Seven-Per-Cent Solution", author: "Nicholas Meyer", pageCount: 256, genre: "Mystery", publicationDate: "1974",
    description: "A 'lost manuscript' of John Watson recounts the true story of Holmes's cocaine addiction, his treatment by Sigmund Freud in Vienna, and the case they undertake together. The pastiche that revived the form.",
    series: { name: "Nicholas Meyer's Holmes", order: 1, total: 6 }, tier: TIER_2 },
  { title: "The West End Horror", author: "Nicholas Meyer", pageCount: 224, genre: "Mystery", publicationDate: "1976",
    description: "Holmes investigates a murder in London's theatrical district, with cameos from George Bernard Shaw, Oscar Wilde, and Bram Stoker. Another 'recovered' Watson manuscript.",
    series: { name: "Nicholas Meyer's Holmes", order: 2, total: 6 }, tier: TIER_2 },
  { title: "The Canary Trainer", author: "Nicholas Meyer", pageCount: 224, genre: "Mystery", publicationDate: "1993",
    description: "During the Great Hiatus, Holmes plays violin in the Paris Opera and investigates the haunting that will later inspire The Phantom of the Opera. Crossover pastiche.",
    series: { name: "Nicholas Meyer's Holmes", order: 3, total: 6 }, tier: TIER_3 },
  { title: "The Adventure of the Peculiar Protocols", author: "Nicholas Meyer", pageCount: 256, genre: "Mystery", publicationDate: "2019",
    description: "Mycroft sends Holmes and Watson on the Orient Express to investigate the origin of the anti-Semitic forgery known as the Protocols of the Elders of Zion.",
    series: { name: "Nicholas Meyer's Holmes", order: 4, total: 6 }, tier: TIER_3 },
  { title: "The Return of the Pharaoh", author: "Nicholas Meyer", pageCount: 256, genre: "Mystery", publicationDate: "2021",
    description: "Holmes travels to Egypt in 1910 and finds himself entangled with archaeology, espionage, and a missing English duke in the years before Carter's Tutankhamun discovery.",
    series: { name: "Nicholas Meyer's Holmes", order: 5, total: 6 }, tier: TIER_3 },
  { title: "Sherlock Holmes and the Telegram from Hell", author: "Nicholas Meyer", pageCount: 240, genre: "Mystery", publicationDate: "2024",
    description: "Watson uncovers a 1917 case in which Holmes investigates the Zimmermann Telegram, the cipher break that drew America into the First World War.",
    series: { name: "Nicholas Meyer's Holmes", order: 6, total: 6 }, tier: TIER_3 },

  // Sébastien Japrisot — French crime classics (standalones, in English translation)
  { title: "The Sleeping Car Murders", author: "Sébastien Japrisot", pageCount: 224, genre: "Mystery", publicationDate: "1962",
    description: "A woman is found murdered in a sleeping car on the night train from Marseille to Paris. As one by one the other passengers in her compartment are killed, an inspector races to find the connection.",
    series: null, tier: TIER_2 },
  { title: "Trap for Cinderella", author: "Sébastien Japrisot", pageCount: 192, genre: "Mystery", publicationDate: "1962",
    description: "A young woman survives a fire that kills her best friend, but the resulting amnesia leaves her unable to remember which of the two she actually is.",
    series: null, tier: TIER_2 },
  { title: "The Lady in the Car with Glasses and a Gun", author: "Sébastien Japrisot", pageCount: 256, genre: "Mystery", publicationDate: "1966",
    description: "A Parisian secretary 'borrows' her boss's car for an impulsive trip to the Riviera and discovers, terrifyingly, that strangers along the route insist they've already met her.",
    series: null, tier: TIER_2 },
  { title: "One Deadly Summer", author: "Sébastien Japrisot", pageCount: 304, genre: "Mystery", publicationDate: "1977",
    description: "In a small Provençal village, a beautiful young woman seduces a local mechanic as part of a long-laid plan of revenge — narrated in turn by everyone caught in her wake.",
    series: null, tier: TIER_2 },
  { title: "A Very Long Engagement", author: "Sébastien Japrisot", pageCount: 384, genre: "Historical Fiction", publicationDate: "1991",
    description: "After the First World War, a young woman refuses to believe her fiancé died at the front and undertakes a years-long investigation to find what really happened to him in no-man's-land.",
    series: null, tier: TIER_2 },

  // John Kenneth Galbraith — A Tenured Professor (academic-economic satire)
  { title: "A Tenured Professor", author: "John Kenneth Galbraith", pageCount: 208, genre: "Fiction", publicationDate: "1990",
    description: "A Harvard economist and his wife build a market-prediction model that makes them obscenely rich, then use the proceeds to fund mischievous progressive causes that infuriate the powerful.",
    series: null, tier: TIER_3 },

  // Cathie Pelletier — Mattagash trilogy (Northern Maine literary fiction)
  { title: "The Funeral Makers", author: "Cathie Pelletier", pageCount: 256, genre: "Fiction", publicationDate: "1986",
    description: "In the tiny northern-Maine town of Mattagash, a dying matriarch summons her scattered family home and decades of resentment, grievance, and dark comedy come with them.",
    series: { name: "Mattagash", order: 1, total: 3 }, tier: TIER_2 },
  { title: "Once Upon a Time on the Banks", author: "Cathie Pelletier", pageCount: 320, genre: "Fiction", publicationDate: "1989",
    description: "A wedding looms over Mattagash and exposes the marriages, feuds, and self-deceptions already in motion in the second of the trilogy.",
    series: { name: "Mattagash", order: 2, total: 3 }, tier: TIER_2 },
  { title: "The Weight of Winter", author: "Cathie Pelletier", pageCount: 384, genre: "Fiction", publicationDate: "1991",
    description: "A brutal Mattagash winter brings the town's long history — its mills, its loggers, its ghosts — to bear on a single fractured generation.",
    series: { name: "Mattagash", order: 3, total: 3 }, tier: TIER_2 },

  // Christine Reilly — debut literary novel
  { title: "Sunday's on the Phone to Monday", author: "Christine Reilly", pageCount: 336, genre: "Fiction", publicationDate: "2016",
    description: "Two record-store-owning parents and their three daughters in 1990s New York move through love, mental illness, and music in a debut told in lyrical short chapters.",
    series: null, tier: TIER_3 },
];

let added = 0, skipped = 0;
const recOut = [...rec];
for (const b of ADDITIONS) {
  const key = `${norm(b.title)}|${norm(b.author)}`;
  if (existing.has(key)) {
    skipped++;
    console.log(`  skip (already present): ${b.title} — ${b.author}`);
    continue;
  }
  recOut.push({ ...b, topRank: null, id: nextId++ });
  existing.add(key);
  added++;
  console.log(`+ ${b.title} — ${b.author}  (id ${nextId - 1})`);
}

fs.writeFileSync(REC, JSON.stringify(recOut));
console.log(`\nadded ${added}, skipped ${skipped}.  rec-library now ${recOut.length} books`);
