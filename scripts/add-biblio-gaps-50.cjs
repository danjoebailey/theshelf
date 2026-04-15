const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "The Garden of Evening Mists", author: "Tan Twan Eng", pageCount: 352, genre: "Historical Fiction", publicationDate: "2011-01-01", description: "A retired Malaysian judge reckons with her experience as a wartime Japanese prisoner and her postwar apprenticeship to a mysterious Japanese gardener. Booker shortlist.", series: null, tier: "S", topRank: null },
  { title: "The House of Doors", author: "Tan Twan Eng", pageCount: 320, genre: "Historical Fiction", publicationDate: "2023-05-23", description: "A 1921 visit by Somerset Maugham to colonial Penang uncovers a scandal among his hosts that finds its way into one of his stories.", series: null, tier: "A", topRank: null },

  { title: "Green Grass, Running Water", author: "Thomas King", pageCount: 480, genre: "Fiction", publicationDate: "1993-01-01", description: "Four elderly Indigenous tricksters escape from a mental hospital and set out to fix the world — King's canonical comic-tragic novel.", series: null, tier: "S", topRank: null },
  { title: "The Back of the Turtle", author: "Thomas King", pageCount: 528, genre: "Fiction", publicationDate: "2014-01-01", description: "A Cherokee scientist responsible for an ecological disaster travels to the west coast Indigenous community his work destroyed.", series: null, tier: "A", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  // Malaysian / Singaporean
  { title: "Evening Is the Whole Day", author: "Preeta Samarasan", pageCount: 352, genre: "Fiction", publicationDate: "2008-01-01", description: "A wealthy Malaysian Tamil family in 1980s Ipoh is unraveled by a servant girl's sudden dismissal.", series: null, tier: "A", topRank: null },
  { title: "Tale of the Dreamer's Son", author: "Preeta Samarasan", pageCount: 368, genre: "Fiction", publicationDate: "2022-01-01", description: "A Malaysian utopian commune in the 1970s is shaken by a religious crisis and the arrival of the founder's illegitimate son.", series: null, tier: "A", topRank: null },

  { title: "Joss and Gold", author: "Shirley Geok-lin Lim", pageCount: 320, genre: "Fiction", publicationDate: "2001-01-01", description: "A Chinese-Malaysian woman in 1969 Kuala Lumpur loses her Peace Corps lover to America and reinvents herself across decades.", series: null, tier: "A", topRank: null },
  { title: "Among the White Moon Faces", author: "Shirley Geok-lin Lim", pageCount: 232, genre: "Non-Fiction", publicationDate: "1996-01-01", description: "A memoir of growing up Peranakan in Malacca and emigrating to America — American Book Award winner.", series: null, tier: "A", topRank: null },

  { title: "Inheritance", author: "Balli Kaur Jaswal", pageCount: 368, genre: "Fiction", publicationDate: "2013-01-01", description: "A Punjabi Sikh family in 1970s Singapore contends with a mentally ill daughter who has vanished.", series: null, tier: "A", topRank: null },
  { title: "Erotic Stories for Punjabi Widows", author: "Balli Kaur Jaswal", pageCount: 320, genre: "Fiction", publicationDate: "2017-01-01", description: "A young Punjabi-British woman teaches a creative writing class to elderly Sikh widows in Southall who start writing explicit stories.", series: null, tier: "A", topRank: null },

  { title: "State of Emergency", author: "Jeremy Tiang", pageCount: 280, genre: "Historical Fiction", publicationDate: "2017-01-01", description: "Singapore's 1960s communist insurgency and its scattered survivors across decades — Tiang's debut novel.", series: null, tier: "A", topRank: null },
  { title: "It Never Rains on National Day", author: "Jeremy Tiang", pageCount: 208, genre: "Fiction", publicationDate: "2015-01-01", description: "Short stories of Singaporean life across the island's complicated postcolonial decades.", series: null, tier: "A", topRank: null },

  { title: "The Serpent's Tooth", author: "Catherine Lim", pageCount: 288, genre: "Fiction", publicationDate: "1982-01-01", description: "A Straits Chinese family in Singapore moves from its ancestral compound into a new housing estate and unravels.", series: null, tier: "A", topRank: null },
  { title: "Little Ironies", author: "Catherine Lim", pageCount: 176, genre: "Fiction", publicationDate: "1978-01-01", description: "Short stories of Singapore's Chinese community — Lim's debut collection that started modern Singaporean fiction in English.", series: null, tier: "A", topRank: null },

  // Sri Lankan
  { title: "Funny Boy", author: "Shyam Selvadurai", pageCount: 320, genre: "Fiction", publicationDate: "1994-01-01", description: "A young gay Tamil boy grows up in Colombo as ethnic violence gathers — Selvadurai's canonical Sri Lankan novel.", series: null, tier: "S", topRank: null },
  { title: "Cinnamon Gardens", author: "Shyam Selvadurai", pageCount: 400, genre: "Historical Fiction", publicationDate: "1998-01-01", description: "A gay Tamil man and a young woman both chafe against the 1920s Ceylon Hindu bourgeoisie of Colombo's Cinnamon Gardens.", series: null, tier: "A", topRank: null },

  { title: "Reef", author: "Romesh Gunesekera", pageCount: 192, genre: "Fiction", publicationDate: "1994-01-01", description: "A Sri Lankan servant boy learns to cook for a marine biologist as political violence consumes the country. Booker shortlist.", series: null, tier: "S", topRank: null },
  { title: "Heaven's Edge", author: "Romesh Gunesekera", pageCount: 240, genre: "Fiction", publicationDate: "2002-01-01", description: "A young man returns to an unnamed post-conflict Asian island and walks straight into a new resistance movement.", series: null, tier: "A", topRank: null },
  { title: "The Sandglass", author: "Romesh Gunesekera", pageCount: 288, genre: "Fiction", publicationDate: "1998-01-01", description: "A Sri Lankan émigré in London reconstructs two families' decades of feud, exile, and mysterious deaths.", series: null, tier: "A", topRank: null },

  { title: "The Story of a Brief Marriage", author: "Anuk Arudpragasam", pageCount: 208, genre: "Fiction", publicationDate: "2016-01-01", description: "A young Tamil man in the final days of the Sri Lankan civil war is offered a wife in a refugee camp.", series: null, tier: "S", topRank: null },
  { title: "A Passage North", author: "Anuk Arudpragasam", pageCount: 304, genre: "Fiction", publicationDate: "2021-07-13", description: "A young Sri Lankan man travels from Colombo to the north to attend a funeral and meditates on the country's war.", series: null, tier: "S", topRank: null },

  { title: "Island of a Thousand Mirrors", author: "Nayomi Munaweera", pageCount: 256, genre: "Historical Fiction", publicationDate: "2012-01-01", description: "Two Sri Lankan women — a Sinhalese and a Tamil — are pulled into opposite sides of the civil war.", series: null, tier: "A", topRank: null },
  { title: "What Lies Between Us", author: "Nayomi Munaweera", pageCount: 320, genre: "Fiction", publicationDate: "2016-01-01", description: "A Sri Lankan woman in an American prison reconstructs the childhood trauma that led her there.", series: null, tier: "A", topRank: null },

  { title: "On Sal Mal Lane", author: "Ru Freeman", pageCount: 400, genre: "Historical Fiction", publicationDate: "2013-01-01", description: "The children on a single street in 1979 Colombo watch Sri Lanka slide into ethnic war.", series: null, tier: "A", topRank: null },

  // Thai literature
  { title: "The Judgment", author: "Chart Korbjitti", pageCount: 176, genre: "Fiction", publicationDate: "1981-01-01", description: "A poor Thai villager is wrongly accused of sleeping with his dead father's widow and is slowly destroyed by the gossip. Southeast Asian Writers Award.", series: null, tier: "S", topRank: null },
  { title: "Mad Dogs and Co", author: "Chart Korbjitti", pageCount: 224, genre: "Fiction", publicationDate: "1988-01-01", description: "Four Thai drifters from the Bangkok slums wander the country looking for work and mischief.", series: null, tier: "A", topRank: null },

  { title: "Sightseeing", author: "Rattawut Lapcharoensap", pageCount: 256, genre: "Fiction", publicationDate: "2005-01-01", description: "Seven short stories of contemporary Thailand — Lapcharoensap's widely acclaimed debut collection.", series: null, tier: "S", topRank: null },

  { title: "The Sad Part Was", author: "Prabda Yoon", pageCount: 192, genre: "Fiction", publicationDate: "2017-01-01", description: "Twelve stories from contemporary Bangkok's strangest corners by Thailand's literary cult writer — Tilted Axis.", series: null, tier: "A", topRank: null },
  { title: "Moving Parts", author: "Prabda Yoon", pageCount: 192, genre: "Fiction", publicationDate: "2018-01-01", description: "More surreal short fiction of Thai urban life from Prabda Yoon.", series: null, tier: "A", topRank: null },

  { title: "Monsoon Country", author: "Pira Sudham", pageCount: 272, genre: "Fiction", publicationDate: "1988-01-01", description: "A boy from a poor Isaan village in northeastern Thailand leaves to study in Bangkok and reckons with the country's inequalities.", series: null, tier: "A", topRank: null },

  // Pakistani / Bangladeshi
  { title: "Cracking India", author: "Bapsi Sidhwa", pageCount: 320, genre: "Historical Fiction", publicationDate: "1988-01-01", description: "A young Parsi girl in 1947 Lahore watches Partition engulf the city — the basis for Deepa Mehta's Earth.", series: null, tier: "S", topRank: null },
  { title: "The Crow Eaters", author: "Bapsi Sidhwa", pageCount: 304, genre: "Fiction", publicationDate: "1980-01-01", description: "A Parsi family rises through early twentieth-century Lahore in Sidhwa's comic first novel.", series: null, tier: "A", topRank: null },
  { title: "An American Brat", author: "Bapsi Sidhwa", pageCount: 336, genre: "Fiction", publicationDate: "1993-01-01", description: "A young Pakistani woman is sent to America for her studies and her family loses her to the culture.", series: null, tier: "A", topRank: null },

  { title: "The Shadow of the Crescent Moon", author: "Fatima Bhutto", pageCount: 240, genre: "Fiction", publicationDate: "2013-01-01", description: "One Eid morning in a small Pakistani border town, five lives collide with the Taliban and the military.", series: null, tier: "A", topRank: null },
  { title: "The Runaways", author: "Fatima Bhutto", pageCount: 432, genre: "Fiction", publicationDate: "2018-01-01", description: "Three young people from Karachi, Portsmouth, and an English Midlands town are all drawn into jihadist radicalization.", series: null, tier: "A", topRank: null },

  { title: "A Golden Age", author: "Tahmima Anam", pageCount: 288, genre: "Historical Fiction", publicationDate: "2007-01-01", description: "A young widowed Bangladeshi mother in Dhaka is drawn into the 1971 liberation war through her two college-age children.", series: { name: "Bengal Trilogy", order: 1, total: 3 }, tier: "S", topRank: null },
  { title: "The Good Muslim", author: "Tahmima Anam", pageCount: 304, genre: "Historical Fiction", publicationDate: "2011-01-01", description: "The Bengal Trilogy continues: a Bangladeshi son returns from the 1971 war transformed into a religious fundamentalist.", series: { name: "Bengal Trilogy", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "The Bones of Grace", author: "Tahmima Anam", pageCount: 416, genre: "Fiction", publicationDate: "2016-01-01", description: "A Bangladeshi paleontologist in America writes a long letter to the man she is about to lose, about her own adopted past.", series: { name: "Bengal Trilogy", order: 3, total: 3 }, tier: "A", topRank: null },

  { title: "Trespassing", author: "Uzma Aslam Khan", pageCount: 432, genre: "Fiction", publicationDate: "2003-01-01", description: "A young Pakistani silkworm farmer and an American woman return home to Karachi after their fathers' deaths and fall into each other's orbit.", series: null, tier: "A", topRank: null },
  { title: "Thinner Than Skin", author: "Uzma Aslam Khan", pageCount: 336, genre: "Fiction", publicationDate: "2012-01-01", description: "Two Pakistani-American lovers travel to a remote Kaghan Valley village and accidentally cause a child's death.", series: null, tier: "A", topRank: null },

  { title: "Brick Lane", author: "Monica Ali", pageCount: 384, genre: "Fiction", publicationDate: "2003-01-01", description: "A young Bangladeshi woman enters an arranged marriage in London's Tower Hamlets and slowly claims her own life. Booker shortlist.", series: null, tier: "S", topRank: null },
  { title: "Love Marriage", author: "Monica Ali", pageCount: 528, genre: "Fiction", publicationDate: "2022-02-03", description: "A second-generation British-Bangladeshi doctor's engagement to a white English doctor opens old wounds in both families.", series: null, tier: "A", topRank: null },

  // Canadian Indigenous
  { title: "The Break", author: "Katherena Vermette", pageCount: 368, genre: "Fiction", publicationDate: "2016-01-01", description: "Four generations of Métis women in Winnipeg's North End reckon with a brutal assault — Governor General's Award finalist.", series: null, tier: "S", topRank: null },
  { title: "The Strangers", author: "Katherena Vermette", pageCount: 336, genre: "Fiction", publicationDate: "2021-09-14", description: "The Stranger family from The Break returns — a Métis mother, daughter, and grandmother each navigate the carceral system.", series: null, tier: "A", topRank: null },

  { title: "Jonny Appleseed", author: "Joshua Whitehead", pageCount: 240, genre: "Fiction", publicationDate: "2018-05-01", description: "A young Two-Spirit Oji-Cree sex worker in Winnipeg prepares to return to his reserve for a funeral.", series: null, tier: "A", topRank: null },

  { title: "Moon of the Crusted Snow", author: "Waubgeshig Rice", pageCount: 240, genre: "Fiction", publicationDate: "2018-10-02", description: "An isolated Anishinaabe community in northern Ontario loses contact with the outside world as winter falls.", series: { name: "Moon", order: 1, total: 2 }, tier: "S", topRank: null },
  { title: "Moon of the Turning Leaves", author: "Waubgeshig Rice", pageCount: 320, genre: "Fiction", publicationDate: "2023-10-03", description: "Twelve years after the blackout, the Anishinaabe community sends a scouting party south to determine what remains.", series: { name: "Moon", order: 2, total: 2 }, tier: "A", topRank: null },

  { title: "Ravensong", author: "Lee Maracle", pageCount: 256, genre: "Fiction", publicationDate: "1993-01-01", description: "A Coast Salish teenager in a 1950s village ravaged by influenza moves between her own community and the white town across the water.", series: null, tier: "A", topRank: null },
  { title: "Celia's Song", author: "Lee Maracle", pageCount: 264, genre: "Fiction", publicationDate: "2014-01-01", description: "A Nuu-chah-nulth seer named Celia watches a two-headed serpent emerge from the ocean and threaten her village.", series: null, tier: "A", topRank: null },

  { title: "Indian Horse", author: "Richard Wagamese", pageCount: 224, genre: "Fiction", publicationDate: "2012-01-01", description: "An Ojibway boy survives a residential school through the hockey that becomes his escape and his prison.", series: null, tier: "S", topRank: null },
  { title: "Medicine Walk", author: "Richard Wagamese", pageCount: 272, genre: "Fiction", publicationDate: "2014-01-01", description: "A sixteen-year-old Ojibway boy travels with his dying estranged father into the backcountry to bury him.", series: null, tier: "S", topRank: null },
  { title: "One Native Life", author: "Richard Wagamese", pageCount: 240, genre: "Non-Fiction", publicationDate: "2008-01-01", description: "Wagamese's memoir essays on his life from residential school to sobriety to a home in the Canadian interior.", series: null, tier: "A", topRank: null },

  { title: "The Marrow Thieves", author: "Cherie Dimaline", pageCount: 256, genre: "Sci-Fi", publicationDate: "2017-05-01", description: "In a near-future Canada where only Indigenous people still dream, they are hunted for their bone marrow.", series: { name: "Marrow Thieves", order: 1, total: 2 }, tier: "S", topRank: null },
  { title: "Hunting by Stars", author: "Cherie Dimaline", pageCount: 400, genre: "Sci-Fi", publicationDate: "2021-10-19", description: "The Marrow Thieves sequel — the Indigenous survivors push north and the schools catch up to them.", series: { name: "Marrow Thieves", order: 2, total: 2 }, tier: "A", topRank: null },

  // Australian Aboriginal
  { title: "Too Much Lip", author: "Melissa Lucashenko", pageCount: 328, genre: "Fiction", publicationDate: "2018-01-01", description: "A Goorie woman returns to her Bundjalung country to say goodbye to her dying grandfather — Miles Franklin Award winner.", series: null, tier: "S", topRank: null },
  { title: "Mullumbimby", author: "Melissa Lucashenko", pageCount: 304, genre: "Fiction", publicationDate: "2013-01-01", description: "A Goorie woman inherits a small block of land in far-north NSW and tangles with her white neighbors and her own family.", series: null, tier: "A", topRank: null },

  { title: "The Yield", author: "Tara June Winch", pageCount: 352, genre: "Fiction", publicationDate: "2019-01-01", description: "A young Wiradjuri woman returns home for her grandfather's funeral and inherits his Wiradjuri-language dictionary manuscript. Miles Franklin Award winner.", series: null, tier: "S", topRank: null },
  { title: "Swallow the Air", author: "Tara June Winch", pageCount: 224, genre: "Fiction", publicationDate: "2006-01-01", description: "A young Aboriginal girl whose mother has committed suicide searches for her estranged father across Australia.", series: null, tier: "A", topRank: null },

  { title: "Blood", author: "Tony Birch", pageCount: 240, genre: "Fiction", publicationDate: "2011-01-01", description: "A young Aboriginal boy and his sister flee across Victoria with their chaotic mother.", series: null, tier: "A", topRank: null },
  { title: "Ghost River", author: "Tony Birch", pageCount: 272, genre: "Fiction", publicationDate: "2015-01-01", description: "Two Melbourne boys grow up beside the Yarra in the 1960s and encounter a community of men who live on the river.", series: null, tier: "A", topRank: null },

  { title: "Dark Emu", author: "Bruce Pascoe", pageCount: 256, genre: "Non-Fiction", publicationDate: "2014-01-01", description: "Pascoe's landmark reassessment of Aboriginal Australian agriculture and settlement before European contact.", series: null, tier: "S", topRank: null },
  { title: "Bloke", author: "Bruce Pascoe", pageCount: 208, genre: "Fiction", publicationDate: "2009-01-01", description: "A man in rural Australia works through his own contradictions and prejudices — one of Pascoe's early novels.", series: null, tier: "A", topRank: null },

  // Bengali / South Asian women
  { title: "Chotti Munda and His Arrow", author: "Mahasweta Devi", pageCount: 368, genre: "Fiction", publicationDate: "1980-01-01", description: "A legendary Munda archer's life from colonial Bihar through Indian independence — Devi's canonical novel.", series: null, tier: "S", topRank: null },
  { title: "Breast Stories", author: "Mahasweta Devi", pageCount: 144, genre: "Fiction", publicationDate: "1997-01-01", description: "Three stories of Indian women's bodies and the political violence done to them — Gayatri Spivak's translations.", series: null, tier: "A", topRank: null },

  { title: "Karukku", author: "Bama", pageCount: 176, genre: "Non-Fiction", publicationDate: "1992-01-01", description: "A Tamil Dalit Christian woman's autobiographical account of caste discrimination — the canonical modern Dalit autobiography.", series: null, tier: "S", topRank: null },
  { title: "Sangati", author: "Bama", pageCount: 208, genre: "Fiction", publicationDate: "1994-01-01", description: "Linked stories of Dalit women in Bama's Tamil Nadu village, narrated in the community's own voices.", series: null, tier: "A", topRank: null },

  { title: "Ladies Coupé", author: "Anita Nair", pageCount: 288, genre: "Fiction", publicationDate: "2001-01-01", description: "Six Indian women share a ladies' sleeper train compartment and each tells a story of whether a woman can be complete alone.", series: null, tier: "A", topRank: null },
  { title: "Mistress", author: "Anita Nair", pageCount: 368, genre: "Fiction", publicationDate: "2005-01-01", description: "A Kerala kathakali dancer and a British travel writer who arrives to interview him are caught in a tangled triangle of love.", series: null, tier: "A", topRank: null },

  { title: "The Gypsy Goddess", author: "Meena Kandasamy", pageCount: 288, genre: "Historical Fiction", publicationDate: "2014-01-01", description: "The 1968 massacre of forty-four Tamil Dalit laborers by landlords in Kilvenmani, retold in Kandasamy's metafictional voice.", series: null, tier: "A", topRank: null },
  { title: "When I Hit You", author: "Meena Kandasamy", pageCount: 272, genre: "Fiction", publicationDate: "2017-01-01", description: "A young Indian writer documents the brutal beginning of her marriage in a memoir-novel hybrid.", series: null, tier: "S", topRank: null },

  { title: "Em and the Big Hoom", author: "Jerry Pinto", pageCount: 240, genre: "Fiction", publicationDate: "2012-01-01", description: "A Bombay Catholic family lives with their mother's manic depression in Pinto's quiet, devastating first novel.", series: null, tier: "S", topRank: null },
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
