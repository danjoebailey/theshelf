const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "Vanity Fair", author: "William Makepeace Thackeray", pageCount: 912, genre: "Fiction", publicationDate: "1848-01-01", description: "The scheming Becky Sharp rises through Regency and early-Victorian English society in Thackeray's canonical 'novel without a hero.'", series: null, tier: "S", topRank: null },
  { title: "The History of Henry Esmond", author: "William Makepeace Thackeray", pageCount: 512, genre: "Historical Fiction", publicationDate: "1852-01-01", description: "A Jacobite English gentleman's memoir of love, loyalty, and the failed Stuart restoration.", series: null, tier: "A", topRank: null },
  { title: "The Newcomes", author: "William Makepeace Thackeray", pageCount: 1024, genre: "Fiction", publicationDate: "1855-01-01", description: "Three generations of a respectable English merchant-banking family chase money and social position.", series: null, tier: "A", topRank: null },
  { title: "Barry Lyndon", author: "William Makepeace Thackeray", pageCount: 320, genre: "Historical Fiction", publicationDate: "1844-01-01", description: "An eighteenth-century Irish rogue's climb through duels, marriages, and military service — basis for the Kubrick film.", series: null, tier: "A", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  // Contemporary French literary
  { title: "The Adversary", author: "Emmanuel Carrère", pageCount: 208, genre: "Non-Fiction", publicationDate: "2000-01-01", description: "Carrère reconstructs the true story of a Frenchman who murdered his entire family after years of pretending to be a doctor at the WHO.", series: null, tier: "S", topRank: null },
  { title: "Limonov", author: "Emmanuel Carrère", pageCount: 352, genre: "Non-Fiction", publicationDate: "2011-01-01", description: "A biography of the Russian writer Eduard Limonov — poet, derelict, dissident, nationalist politician, soldier — by the French master of literary nonfiction.", series: null, tier: "S", topRank: null },
  { title: "The Kingdom", author: "Emmanuel Carrère", pageCount: 400, genre: "Non-Fiction", publicationDate: "2014-01-01", description: "Carrère investigates early Christianity with the obsessive attention he brings to every subject, reconstructing Luke and Paul's lives.", series: null, tier: "A", topRank: null },
  { title: "Lives Other Than My Own", author: "Emmanuel Carrère", pageCount: 256, genre: "Non-Fiction", publicationDate: "2009-01-01", description: "Two deaths — a child in the 2004 tsunami and his sister-in-law — become the occasion for a meditation on how to live among other people's griefs.", series: null, tier: "A", topRank: null },

  { title: "Three Strong Women", author: "Marie NDiaye", pageCount: 304, genre: "Fiction", publicationDate: "2009-01-01", description: "Three linked novellas about Senegalese-French women navigating impossible families and betrayals. Prix Goncourt winner.", series: null, tier: "S", topRank: null },
  { title: "My Heart Hemmed In", author: "Marie NDiaye", pageCount: 288, genre: "Fiction", publicationDate: "2007-01-01", description: "A Bordeaux schoolteacher and her husband discover that their neighbors have inexplicably begun to hate them.", series: null, tier: "A", topRank: null },
  { title: "Ladivine", author: "Marie NDiaye", pageCount: 288, genre: "Fiction", publicationDate: "2013-01-01", description: "A French woman visits her mother in secret once a month — and never tells her own family the mother exists.", series: null, tier: "A", topRank: null },

  { title: "HHhH", author: "Laurent Binet", pageCount: 336, genre: "Historical Fiction", publicationDate: "2010-01-01", description: "The 1942 assassination of Reinhard Heydrich by Czech and Slovak partisans, told through a self-aware metafictional investigation.", series: null, tier: "S", topRank: null },
  { title: "The Seventh Function of Language", author: "Laurent Binet", pageCount: 368, genre: "Fiction", publicationDate: "2015-01-01", description: "Roland Barthes's 1980 death becomes the opening of a secret war among structuralist philosophers.", series: null, tier: "A", topRank: null },
  { title: "Civilizations", author: "Laurent Binet", pageCount: 320, genre: "Historical Fiction", publicationDate: "2019-01-01", description: "An alternate history in which the Incas conquer Europe instead of the other way around.", series: null, tier: "A", topRank: null },

  { title: "Vernon Subutex 1", author: "Virginie Despentes", pageCount: 352, genre: "Fiction", publicationDate: "2015-01-01", description: "A former Parisian record-shop owner evicted into homelessness drifts through the couch-surfing networks of his past — portrait of a crumbling France.", series: { name: "Vernon Subutex", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "Apocalypse Baby", author: "Virginie Despentes", pageCount: 336, genre: "Fiction", publicationDate: "2010-01-01", description: "A Parisian private detective and a teenage runaway investigate a missing-persons case across an underclass landscape.", series: null, tier: "A", topRank: null },

  { title: "The Perfect Nanny", author: "Leïla Slimani", pageCount: 240, genre: "Thriller", publicationDate: "2016-01-01", description: "A Parisian nanny murders the two children she cares for — Slimani's Prix Goncourt novel opens with the end.", series: null, tier: "S", topRank: null },
  { title: "In the Country of Others", author: "Leïla Slimani", pageCount: 320, genre: "Historical Fiction", publicationDate: "2020-01-01", description: "A French woman follows her Moroccan husband back to his family's farm during the French-Moroccan decolonization.", series: { name: "In the Country of Others", order: 1, total: 3 }, tier: "A", topRank: null },

  { title: "Plague and Cholera", author: "Patrick Deville", pageCount: 224, genre: "Historical Fiction", publicationDate: "2012-01-01", description: "A novelistic life of Alexandre Yersin, the Swiss-French bacteriologist who identified the plague bacillus.", series: null, tier: "A", topRank: null },
  { title: "Viva", author: "Patrick Deville", pageCount: 208, genre: "Historical Fiction", publicationDate: "2014-01-01", description: "Trotsky, Tina Modotti, and Frida Kahlo's Mexico City converges in Deville's signature docu-fiction.", series: null, tier: "A", topRank: null },

  { title: "Zone", author: "Mathias Énard", pageCount: 528, genre: "Fiction", publicationDate: "2008-01-01", description: "A Franco-Croatian secret agent on a train from Milan to Rome reviews a lifetime of Mediterranean atrocities in one unbroken sentence.", series: null, tier: "S", topRank: null },
  { title: "Compass", author: "Mathias Énard", pageCount: 464, genre: "Fiction", publicationDate: "2015-01-01", description: "A sleepless Viennese musicologist walks through the Orientalist tradition of his field and the woman he never quite loved. Prix Goncourt winner.", series: null, tier: "S", topRank: null },
  { title: "Tell Them of Battles, Kings, and Elephants", author: "Mathias Énard", pageCount: 160, genre: "Historical Fiction", publicationDate: "2010-01-01", description: "A young Michelangelo travels to Constantinople in 1506 to design a bridge for Sultan Bayezid II.", series: null, tier: "A", topRank: null },

  { title: "The Heart", author: "Maylis de Kerangal", pageCount: 256, genre: "Fiction", publicationDate: "2014-01-01", description: "A single day in the life of a transplant heart — from a French surfer's accident to a new recipient.", series: null, tier: "S", topRank: null },
  { title: "Painting Time", author: "Maylis de Kerangal", pageCount: 256, genre: "Fiction", publicationDate: "2018-01-01", description: "A young French woman trains as a trompe-l'œil painter in an elite Brussels atelier.", series: null, tier: "A", topRank: null },

  { title: "The Order of the Day", author: "Éric Vuillard", pageCount: 144, genre: "Historical Fiction", publicationDate: "2017-01-01", description: "The 1938 Anschluss reconstructed from the meetings at which Hitler's cabinet quietly negotiated the annexation of Austria. Prix Goncourt winner.", series: null, tier: "S", topRank: null },
  { title: "The War of the Poor", author: "Éric Vuillard", pageCount: 80, genre: "Historical Fiction", publicationDate: "2019-01-01", description: "A brief history of Thomas Müntzer's peasant uprising in Reformation Germany.", series: null, tier: "A", topRank: null },

  { title: "The End of Eddy", author: "Édouard Louis", pageCount: 208, genre: "Fiction", publicationDate: "2014-01-01", description: "A young gay boy grows up in a poor, violent northern French village and eventually escapes.", series: null, tier: "A", topRank: null },
  { title: "A Man's Place", author: "Édouard Louis", pageCount: 96, genre: "Non-Fiction", publicationDate: "2018-01-01", description: "Louis reckons with his father's broken body and the French state that broke it.", series: null, tier: "A", topRank: null },

  // British Victorian
  { title: "The Egoist", author: "George Meredith", pageCount: 544, genre: "Fiction", publicationDate: "1879-01-01", description: "A wealthy Victorian man's casual selfishness is slowly exposed by his fiancée, in Meredith's masterpiece of domestic comedy.", series: null, tier: "A", topRank: null },
  { title: "The Ordeal of Richard Feverel", author: "George Meredith", pageCount: 560, genre: "Fiction", publicationDate: "1859-01-01", description: "A young Victorian heir is raised under his father's elaborate pedagogical System, which destroys him when he finally falls in love.", series: null, tier: "A", topRank: null },

  { title: "New Grub Street", author: "George Gissing", pageCount: 560, genre: "Fiction", publicationDate: "1891-01-01", description: "Two Victorian writers — one an artist, one a hack — grind through literary London's impossible economy.", series: null, tier: "S", topRank: null },
  { title: "The Odd Women", author: "George Gissing", pageCount: 384, genre: "Fiction", publicationDate: "1893-01-01", description: "The sisters and single women of late-Victorian London navigate a society that has no place for them.", series: null, tier: "A", topRank: null },

  { title: "Erewhon", author: "Samuel Butler", pageCount: 256, genre: "Fiction", publicationDate: "1872-01-01", description: "A Victorian traveler discovers a hidden country where illness is a crime and crime is an illness.", series: null, tier: "A", topRank: null },
  { title: "The Way of All Flesh", author: "Samuel Butler", pageCount: 432, genre: "Fiction", publicationDate: "1903-01-01", description: "Butler's posthumous novel dissects four generations of a hypocritical English clerical family.", series: null, tier: "S", topRank: null },

  // Russian 19th c
  { title: "The Enchanted Wanderer", author: "Nikolai Leskov", pageCount: 160, genre: "Fiction", publicationDate: "1873-01-01", description: "A Russian monk tells a lifetime of adventures — serfdom, horse trading, captivity among Tatars, and a failed vocation.", series: null, tier: "A", topRank: null },
  { title: "Lady Macbeth of Mtsensk", author: "Nikolai Leskov", pageCount: 96, genre: "Fiction", publicationDate: "1865-01-01", description: "A provincial Russian merchant's wife slips into murder and ruin to protect her illicit affair with a servant.", series: null, tier: "A", topRank: null },

  { title: "My Past and Thoughts", author: "Alexander Herzen", pageCount: 720, genre: "Non-Fiction", publicationDate: "1868-01-01", description: "The canonical memoir of the nineteenth-century Russian revolutionary in exile — Isaiah Berlin considered it essential reading.", series: null, tier: "S", topRank: null },

  // French 19th c
  { title: "Carmen and Other Stories", author: "Prosper Mérimée", pageCount: 368, genre: "Fiction", publicationDate: "1845-01-01", description: "The collected stories, including Carmen (the source of Bizet's opera) and Colomba.", series: null, tier: "A", topRank: null },

  { title: "Letters from My Windmill", author: "Alphonse Daudet", pageCount: 176, genre: "Fiction", publicationDate: "1869-01-01", description: "Sketches of Provençal life from a Parisian writer who bought an old windmill as a retreat.", series: null, tier: "A", topRank: null },
  { title: "Tartarin of Tarascon", author: "Alphonse Daudet", pageCount: 208, genre: "Fiction", publicationDate: "1872-01-01", description: "A provincial French braggart travels to North Africa to hunt lions — Daudet's comic satire of Second Empire fantasy.", series: null, tier: "A", topRank: null },

  // Contemporary German-language
  { title: "The Method", author: "Juli Zeh", pageCount: 272, genre: "Sci-Fi", publicationDate: "2009-01-01", description: "In a health-optimized near-future Germany, a biologist is prosecuted for the sin of refusing to monitor her own body.", series: null, tier: "A", topRank: null },
  { title: "Unter Leuten", author: "Juli Zeh", pageCount: 448, genre: "Fiction", publicationDate: "2016-01-01", description: "A small Brandenburg village is thrown into chaos by a planned wind-turbine project and the people who move to town.", series: null, tier: "A", topRank: null },

  { title: "Before the Feast", author: "Saša Stanišić", pageCount: 320, genre: "Fiction", publicationDate: "2014-01-01", description: "A single night before the annual festival in a tiny German village — and the villagers' memories, rumors, and secrets.", series: null, tier: "A", topRank: null },
  { title: "Where You Come From", author: "Saša Stanišić", pageCount: 352, genre: "Fiction", publicationDate: "2019-01-01", description: "A Bosnian-born German writer reconstructs his childhood village before the war, his grandmother's dementia, and his own halfway life.", series: null, tier: "S", topRank: null },

  { title: "The Capital", author: "Robert Menasse", pageCount: 448, genre: "Fiction", publicationDate: "2017-01-01", description: "The Brussels EU bureaucracy prepares to celebrate the twenty-fifth anniversary of the Commission in Menasse's satirical portrait.", series: null, tier: "A", topRank: null },

  { title: "Measuring the World", author: "Daniel Kehlmann", pageCount: 272, genre: "Historical Fiction", publicationDate: "2005-01-01", description: "Two German intellectual giants — Carl Friedrich Gauss and Alexander von Humboldt — measure the world in parallel.", series: null, tier: "S", topRank: null },
  { title: "Tyll", author: "Daniel Kehlmann", pageCount: 352, genre: "Historical Fiction", publicationDate: "2017-01-01", description: "Tyll Ulenspiegel, the medieval trickster of German folklore, is dropped into the Thirty Years' War.", series: null, tier: "A", topRank: null },

  { title: "Homecoming", author: "Bernhard Schlink", pageCount: 416, genre: "Fiction", publicationDate: "2006-01-01", description: "A German lawyer investigates an unfinished manuscript his grandfather edited and discovers a story that implicates his own family.", series: null, tier: "A", topRank: null },
  { title: "The Weekend", author: "Bernhard Schlink", pageCount: 224, genre: "Fiction", publicationDate: "2008-01-01", description: "A recently released RAF terrorist spends a weekend with old friends in a German country house.", series: null, tier: "A", topRank: null },

  // Pre-modern world classics
  { title: "The Pillow Book", author: "Sei Shōnagon", pageCount: 432, genre: "Non-Fiction", publicationDate: "1002-01-01", description: "A Heian court lady's tenth-century list-making, observations, and gossip — one of the great Japanese literary works.", series: null, tier: "S", topRank: null },

  { title: "Five Women Who Loved Love", author: "Ihara Saikaku", pageCount: 240, genre: "Fiction", publicationDate: "1686-01-01", description: "Five Edo-period Japanese women across society whose love affairs end in tragedy, execution, or flight.", series: null, tier: "A", topRank: null },
  { title: "The Life of an Amorous Woman", author: "Ihara Saikaku", pageCount: 240, genre: "Fiction", publicationDate: "1686-01-01", description: "An aged courtesan tells the story of her fall through every tier of Edo-era prostitution.", series: null, tier: "A", topRank: null },

  { title: "Essays in Idleness", author: "Yoshida Kenkō", pageCount: 208, genre: "Non-Fiction", publicationDate: "1332-01-01", description: "A Japanese Buddhist priest's fourteenth-century essays on impermanence, taste, and the small pleasures of daily life.", series: null, tier: "S", topRank: null },

  { title: "Romance of the Three Kingdoms", author: "Luo Guanzhong", pageCount: 1700, genre: "Historical Fiction", publicationDate: "1522-01-01", description: "The fourteenth-century Chinese epic of the three-kingdom period after the fall of the Han dynasty — the foundational Chinese historical novel.", series: null, tier: "S", topRank: null },

  { title: "Water Margin", author: "Shi Nai'an", pageCount: 2200, genre: "Fiction", publicationDate: "1589-01-01", description: "A hundred and eight outlaws flee government corruption to the marshes of Liangshan — one of the four great classical Chinese novels.", series: null, tier: "S", topRank: null },

  { title: "Journey to the West", author: "Wu Cheng'en", pageCount: 1616, genre: "Fantasy", publicationDate: "1592-01-01", description: "A Buddhist monk is escorted west to India by Sun Wukong the Monkey King and other supernatural disciples — one of the four great classical Chinese novels.", series: null, tier: "S", topRank: null },

  { title: "Strange Tales from a Chinese Studio", author: "Pu Songling", pageCount: 608, genre: "Fiction", publicationDate: "1740-01-01", description: "Nearly five hundred Chinese ghost and fox-spirit tales from Pu's late seventeenth-century collection.", series: null, tier: "S", topRank: null },
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
