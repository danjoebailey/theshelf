const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "Troubles", author: "J.G. Farrell", pageCount: 464, genre: "Historical Fiction", publicationDate: "1970-01-01", description: "An English major returns from WWI to his fiancée's crumbling grand hotel on the Irish coast as the Troubles begin. Lost Man Booker Prize winner.", series: { name: "Empire Trilogy", order: 1, total: 3 }, tier: "S", topRank: null },
  { title: "The Siege of Krishnapur", author: "J.G. Farrell", pageCount: 352, genre: "Historical Fiction", publicationDate: "1973-01-01", description: "The 1857 Indian Mutiny closes around a small British colonial enclave in the fictional Krishnapur. Booker Prize winner.", series: { name: "Empire Trilogy", order: 2, total: 3 }, tier: "S", topRank: null },
  { title: "The Singapore Grip", author: "J.G. Farrell", pageCount: 608, genre: "Historical Fiction", publicationDate: "1978-01-01", description: "A British rubber-trading family watches the 1941 Japanese invasion destroy their Singapore.", series: { name: "Empire Trilogy", order: 3, total: 3 }, tier: "S", topRank: null },
  { title: "The Lung", author: "J.G. Farrell", pageCount: 224, genre: "Fiction", publicationDate: "1965-01-01", description: "A lapsed Catholic journalist contracts polio and spends a novel's worth of time in an iron lung — Farrell's early work, drawing on his own illness.", series: null, tier: "A", topRank: null },

  { title: "Sacred Hunger", author: "Barry Unsworth", pageCount: 640, genre: "Historical Fiction", publicationDate: "1992-01-01", description: "An eighteenth-century British slaving ship's mutiny establishes a free interracial community in the Florida swamps. Booker Prize winner.", series: null, tier: "S", topRank: null },
  { title: "Morality Play", author: "Barry Unsworth", pageCount: 208, genre: "Historical Fiction", publicationDate: "1995-01-01", description: "A fourteenth-century English troupe of traveling players stages the real murder of a local boy as their next morality play.", series: null, tier: "S", topRank: null },
  { title: "Pascali's Island", author: "Barry Unsworth", pageCount: 208, genre: "Historical Fiction", publicationDate: "1980-01-01", description: "A Turkish-born informer on a Greek island reports on his own dying Ottoman empire.", series: null, tier: "A", topRank: null },
  { title: "Stone Virgin", author: "Barry Unsworth", pageCount: 336, genre: "Historical Fiction", publicationDate: "1985-01-01", description: "A contemporary British art restorer cleans a Venetian statue of the Madonna and uncovers its dark history.", series: null, tier: "A", topRank: null },

  { title: "Birds Without Wings", author: "Louis de Bernières", pageCount: 624, genre: "Historical Fiction", publicationDate: "2004-07-13", description: "A mixed Christian-Muslim Anatolian village lives through the collapse of the Ottoman Empire and the Greco-Turkish war.", series: null, tier: "S", topRank: null },
  { title: "The Dust That Falls from Dreams", author: "Louis de Bernières", pageCount: 528, genre: "Historical Fiction", publicationDate: "2015-07-09", description: "A wealthy Edwardian family and their neighbors are scattered by WWI.", series: null, tier: "A", topRank: null },

  { title: "A Thousand Ships", author: "Natalie Haynes", pageCount: 368, genre: "Historical Fiction", publicationDate: "2019-05-02", description: "The Trojan War retold from the perspectives of its women — queens, slaves, goddesses, Muses.", series: null, tier: "S", topRank: null },
  { title: "Stone Blind", author: "Natalie Haynes", pageCount: 384, genre: "Fantasy", publicationDate: "2023-02-07", description: "The life of Medusa from her own perspective — a girl who was turned into a monster.", series: null, tier: "A", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  // British literary historical
  { title: "Any Human Heart", author: "William Boyd", pageCount: 512, genre: "Fiction", publicationDate: "2002-01-01", description: "The intimate journals of Logan Mountstuart across the twentieth century — Boyd's canonical mock biography.", series: null, tier: "S", topRank: null },
  { title: "Restless", author: "William Boyd", pageCount: 336, genre: "Historical Fiction", publicationDate: "2006-09-07", description: "An English daughter discovers her aging mother was a British spy operating inside wartime America.", series: null, tier: "A", topRank: null },
  { title: "A Good Man in Africa", author: "William Boyd", pageCount: 320, genre: "Fiction", publicationDate: "1981-01-01", description: "A bumbling British diplomat in a fictional West African country is pulled into political farce — Boyd's comic debut.", series: null, tier: "A", topRank: null },

  { title: "A Soldier of the Great War", author: "Mark Helprin", pageCount: 792, genre: "Historical Fiction", publicationDate: "1991-01-01", description: "An aging Italian professor walks across Italy with a young man and tells him the story of his Great War.", series: null, tier: "S", topRank: null },
  { title: "Winter's Tale", author: "Mark Helprin", pageCount: 768, genre: "Fantasy", publicationDate: "1983-01-01", description: "A mythic New York City across a century in Helprin's canonical urban fantasy romance.", series: null, tier: "S", topRank: null },
  { title: "Memoir from Antproof Case", author: "Mark Helprin", pageCount: 528, genre: "Fiction", publicationDate: "1995-01-01", description: "An aging American expatriate in Brazil writes his memoirs for his stepson, organized around his lifelong hatred of coffee.", series: null, tier: "A", topRank: null },

  { title: "Penmarric", author: "Susan Howatch", pageCount: 768, genre: "Historical Fiction", publicationDate: "1971-01-01", description: "A Cornish estate and the family feuds of its nineteenth-century owners — Howatch's saga that adapts the Plantagenet story.", series: null, tier: "A", topRank: null },
  { title: "Cashelmara", author: "Susan Howatch", pageCount: 704, genre: "Historical Fiction", publicationDate: "1974-01-01", description: "An Anglo-Irish family's estate from the 1850s through WWI — Howatch's second Plantagenet-coded saga.", series: null, tier: "A", topRank: null },
  { title: "The Rich Are Different", author: "Susan Howatch", pageCount: 704, genre: "Historical Fiction", publicationDate: "1977-01-01", description: "An American banking dynasty across the first half of the twentieth century — Howatch adapts Caesar and Antony.", series: null, tier: "A", topRank: null },

  { title: "The Crimson Petal and the White", author: "Michel Faber", pageCount: 848, genre: "Historical Fiction", publicationDate: "2002-09-10", description: "A nineteen-year-old Victorian London prostitute is taken up by a wealthy perfume heir — Faber's canonical neo-Victorian novel.", series: null, tier: "S", topRank: null },
  { title: "Under the Skin", author: "Michel Faber", pageCount: 320, genre: "Sci-Fi", publicationDate: "2000-05-01", description: "A woman drives the Scottish Highlands picking up hitchhikers — nothing about her is what it seems.", series: null, tier: "S", topRank: null },
  { title: "The Book of Strange New Things", author: "Michel Faber", pageCount: 512, genre: "Sci-Fi", publicationDate: "2014-10-28", description: "A Christian missionary is sent to evangelize aliens on a distant planet as Earth collapses without him.", series: null, tier: "A", topRank: null },

  // American historical doorstoppers
  { title: "Northwest Passage", author: "Kenneth Roberts", pageCount: 720, genre: "Historical Fiction", publicationDate: "1937-01-01", description: "A Harvard graduate joins Robert Rogers's Rangers in the French and Indian War.", series: null, tier: "S", topRank: null },
  { title: "Arundel", author: "Kenneth Roberts", pageCount: 528, genre: "Historical Fiction", publicationDate: "1929-01-01", description: "A Maine family's involvement in Benedict Arnold's 1775 expedition against Quebec.", series: null, tier: "A", topRank: null },
  { title: "Rabble in Arms", author: "Kenneth Roberts", pageCount: 880, genre: "Historical Fiction", publicationDate: "1933-01-01", description: "The continuation of Arundel through Benedict Arnold's Lake Champlain campaign.", series: null, tier: "A", topRank: null },

  { title: "Andersonville", author: "MacKinlay Kantor", pageCount: 768, genre: "Historical Fiction", publicationDate: "1955-01-01", description: "The Confederate prison camp at Andersonville, Georgia, across its horrific thirteen months of existence. Pulitzer Prize winner.", series: null, tier: "S", topRank: null },
  { title: "Spirit Lake", author: "MacKinlay Kantor", pageCount: 960, genre: "Historical Fiction", publicationDate: "1961-01-01", description: "The 1857 massacre at Spirit Lake, Iowa, retold through both settlers and Sioux.", series: null, tier: "A", topRank: null },

  { title: "North and South", author: "John Jakes", pageCount: 736, genre: "Historical Fiction", publicationDate: "1982-01-01", description: "Two young men, one from a Pennsylvania ironworks family and one from a South Carolina plantation, meet at West Point on the eve of the Civil War.", series: { name: "North and South", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "Love and War", author: "John Jakes", pageCount: 1024, genre: "Historical Fiction", publicationDate: "1984-01-01", description: "The Hazards and the Mains endure the Civil War on opposite sides.", series: { name: "North and South", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "Heaven and Hell", author: "John Jakes", pageCount: 720, genre: "Historical Fiction", publicationDate: "1987-01-01", description: "The North and South trilogy concludes in Reconstruction-era America.", series: { name: "North and South", order: 3, total: 3 }, tier: "A", topRank: null },

  { title: "Forrest Gump", author: "Winston Groom", pageCount: 240, genre: "Fiction", publicationDate: "1986-01-01", description: "Groom's picaresque novel of a simple Alabama man whose life brushes against every major moment of the 1960s and 70s.", series: null, tier: "A", topRank: null },
  { title: "Gone the Sun", author: "Winston Groom", pageCount: 336, genre: "Fiction", publicationDate: "1988-01-01", description: "A Vietnam veteran returns to his Alabama hometown and investigates a murder tied to the war he cannot escape.", series: null, tier: "A", topRank: null },

  // Commonwealth / world
  { title: "The Citadel", author: "A.J. Cronin", pageCount: 432, genre: "Historical Fiction", publicationDate: "1937-01-01", description: "A young Welsh mining-town doctor rises through the British medical establishment and is corrupted by it.", series: null, tier: "S", topRank: null },
  { title: "The Keys of the Kingdom", author: "A.J. Cronin", pageCount: 416, genre: "Historical Fiction", publicationDate: "1941-01-01", description: "A Scottish Catholic priest spends decades as a missionary in rural China.", series: null, tier: "A", topRank: null },
  { title: "Hatter's Castle", author: "A.J. Cronin", pageCount: 576, genre: "Fiction", publicationDate: "1931-01-01", description: "A domineering Scottish hatter rules his family until each of them in turn breaks.", series: null, tier: "A", topRank: null },

  { title: "Washington Black", author: "Esi Edugyan", pageCount: 416, genre: "Historical Fiction", publicationDate: "2018-09-18", description: "An eleven-year-old enslaved boy in 1830s Barbados is taken on as a field assistant by his master's eccentric naturalist brother.", series: null, tier: "S", topRank: null },
  { title: "Half-Blood Blues", author: "Esi Edugyan", pageCount: 336, genre: "Historical Fiction", publicationDate: "2011-01-01", description: "An African-German jazz trumpeter disappears in Nazi-occupied Paris in 1940, and decades later his bandmates try to reckon with what happened.", series: null, tier: "S", topRank: null },
  { title: "The Second Life of Samuel Tyne", author: "Esi Edugyan", pageCount: 368, genre: "Fiction", publicationDate: "2004-01-01", description: "A Ghanaian-Canadian civil servant inherits a house in a small Alberta town and moves his family into it.", series: null, tier: "A", topRank: null },

  { title: "Gone to Soldiers", author: "Marge Piercy", pageCount: 768, genre: "Historical Fiction", publicationDate: "1987-01-01", description: "Piercy's epic WWII novel from ten different viewpoints across the globe.", series: null, tier: "S", topRank: null },
  { title: "Sex Wars", author: "Marge Piercy", pageCount: 432, genre: "Historical Fiction", publicationDate: "2005-01-01", description: "Post-Civil-War New York feminists — Susan B. Anthony, Elizabeth Cady Stanton, Victoria Woodhull — and the men who fought them.", series: null, tier: "A", topRank: null },
  { title: "City of Darkness, City of Light", author: "Marge Piercy", pageCount: 496, genre: "Historical Fiction", publicationDate: "1996-01-01", description: "Piercy's French Revolution novel from six intertwined perspectives, three women and three men.", series: null, tier: "A", topRank: null },

  // Historical intellectual / puzzle
  { title: "An Instance of the Fingerpost", author: "Iain Pears", pageCount: 704, genre: "Historical Fiction", publicationDate: "1997-01-01", description: "Four unreliable narrators each tell their version of a 1663 Oxford murder.", series: null, tier: "S", topRank: null },
  { title: "The Dream of Scipio", author: "Iain Pears", pageCount: 416, genre: "Historical Fiction", publicationDate: "2002-01-01", description: "Three men across the decline of Rome, the Black Death, and WWII France face the same moral choices.", series: null, tier: "A", topRank: null },

  { title: "That Summer", author: "Andrew Greig", pageCount: 320, genre: "Historical Fiction", publicationDate: "2000-01-01", description: "A Scottish RAF pilot and an English searchlight operator fall in love during the Battle of Britain.", series: null, tier: "A", topRank: null },
  { title: "In Another Light", author: "Andrew Greig", pageCount: 384, genre: "Fiction", publicationDate: "2004-01-01", description: "A Scottish writer reconstructs his dead father's time as a young Scottish doctor in 1930s colonial Penang.", series: null, tier: "A", topRank: null },

  { title: "Back Bay", author: "William Martin", pageCount: 592, genre: "Historical Fiction", publicationDate: "1979-01-01", description: "A Boston historian and a Pratt family heir hunt a Revere silver tea set across two centuries of Boston history.", series: null, tier: "A", topRank: null },
  { title: "Cape Cod", author: "William Martin", pageCount: 720, genre: "Historical Fiction", publicationDate: "1991-01-01", description: "The log of a Pilgrim shipmate launches a four-hundred-year Cape Cod family saga.", series: null, tier: "A", topRank: null },
  { title: "The Lincoln Letter", author: "William Martin", pageCount: 432, genre: "Historical Fiction", publicationDate: "2012-06-26", description: "A Boston rare books dealer hunts a lost Lincoln diary that could rewrite emancipation history.", series: null, tier: "A", topRank: null },
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
