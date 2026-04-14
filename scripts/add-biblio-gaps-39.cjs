const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "This Earth of Mankind", author: "Pramoedya Ananta Toer", pageCount: 384, genre: "Historical Fiction", publicationDate: "1980-01-01", description: "In turn-of-the-century Dutch-ruled Java, a young native scholar falls in love with the daughter of a Dutch colonial and a remarkable Javanese concubine.", series: { name: "Buru Quartet", order: 1, total: 4 }, tier: "S", topRank: null },
  { title: "Child of All Nations", author: "Pramoedya Ananta Toer", pageCount: 352, genre: "Historical Fiction", publicationDate: "1980-01-01", description: "Minke's education in the injustices of colonial rule deepens as he sees the conditions of plantation workers and the rising nationalist struggle.", series: { name: "Buru Quartet", order: 2, total: 4 }, tier: "S", topRank: null },
  { title: "Footsteps", author: "Pramoedya Ananta Toer", pageCount: 512, genre: "Historical Fiction", publicationDate: "1985-01-01", description: "Minke moves to the colonial capital Batavia and becomes a founding figure of the Indonesian nationalist movement.", series: { name: "Buru Quartet", order: 3, total: 4 }, tier: "S", topRank: null },
  { title: "House of Glass", author: "Pramoedya Ananta Toer", pageCount: 416, genre: "Historical Fiction", publicationDate: "1988-01-01", description: "The Buru Quartet closes through the eyes of the native policeman assigned to surveil and destroy Minke.", series: { name: "Buru Quartet", order: 4, total: 4 }, tier: "S", topRank: null },

  { title: "The Pendragon Legend", author: "Antal Szerb", pageCount: 288, genre: "Fiction", publicationDate: "1934-01-01", description: "A Hungarian philologist is invited to a Welsh castle to research the occult library of the Pendragon family and finds himself in a real Gothic conspiracy.", series: null, tier: "A", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  // Arabic literary
  { title: "Gate of the Sun", author: "Elias Khoury", pageCount: 544, genre: "Historical Fiction", publicationDate: "1998-01-01", description: "A dying Palestinian fighter is told the story of his own people's exile by a younger man keeping vigil at his bedside.", series: null, tier: "S", topRank: null },
  { title: "As Though She Were Sleeping", author: "Elias Khoury", pageCount: 384, genre: "Fiction", publicationDate: "2007-01-01", description: "A Palestinian woman living in 1940s Beirut remembers her life in three nights of dreamed sleep.", series: null, tier: "A", topRank: null },

  { title: "Gold Dust", author: "Ibrahim al-Koni", pageCount: 176, genre: "Fiction", publicationDate: "1990-01-01", description: "A Tuareg man and his piebald camel flee across the Sahara with a tribal feud chasing them.", series: null, tier: "S", topRank: null },
  { title: "The Bleeding of the Stone", author: "Ibrahim al-Koni", pageCount: 144, genre: "Fiction", publicationDate: "1990-01-01", description: "An Ibex-worshipping hermit in the Libyan desert defends the last waddan from hunters who will kill anything for meat.", series: null, tier: "A", topRank: null },

  { title: "Men in the Sun", author: "Ghassan Kanafani", pageCount: 80, genre: "Fiction", publicationDate: "1962-01-01", description: "Three Palestinian men pay a smuggler to hide them in an empty water tanker crossing the Iraqi-Kuwaiti desert — the canonical short novel of Palestinian exile.", series: null, tier: "S", topRank: null },

  { title: "The Secret Life of Saeed: The Pessoptimist", author: "Emile Habibi", pageCount: 192, genre: "Fiction", publicationDate: "1974-01-01", description: "A comical Palestinian citizen of Israel writes letters to an outer-space visitor about his absurd career as an informer — the Palestinian Candide.", series: null, tier: "S", topRank: null },

  { title: "Voices of the Lost", author: "Hoda Barakat", pageCount: 208, genre: "Fiction", publicationDate: "2017-01-01", description: "Six unsent letters by Arab exiles across Europe, each found by the next writer in the chain. International Prize for Arabic Fiction winner.", series: null, tier: "S", topRank: null },

  { title: "The Sacred Night", author: "Tahar Ben Jelloun", pageCount: 192, genre: "Fiction", publicationDate: "1987-01-01", description: "A Moroccan woman raised as a boy is set free by her dying father and begins a long reckoning with her body and country. Prix Goncourt winner.", series: null, tier: "S", topRank: null },
  { title: "The Sand Child", author: "Tahar Ben Jelloun", pageCount: 176, genre: "Fiction", publicationDate: "1985-01-01", description: "A Moroccan father, desperate for a son, raises his eighth daughter as a boy — in the novel that precedes The Sacred Night.", series: null, tier: "A", topRank: null },

  { title: "The Yacoubian Building", author: "Alaa Al Aswany", pageCount: 272, genre: "Fiction", publicationDate: "2002-01-01", description: "The inhabitants of a run-down Cairo apartment block — from dispossessed aristocrats to Islamist students — trace the state of modern Egypt.", series: null, tier: "S", topRank: null },

  { title: "Granada", author: "Radwa Ashour", pageCount: 288, genre: "Historical Fiction", publicationDate: "1994-01-01", description: "The lives of a Muslim family in Granada from the city's fall in 1492 through the early generations of forced conversion.", series: null, tier: "S", topRank: null },

  { title: "Zaat", author: "Sonallah Ibrahim", pageCount: 352, genre: "Fiction", publicationDate: "1992-01-01", description: "Half the chapters narrate Zaat's ordinary Cairo life, the other half are collages of real newspaper clippings on Egyptian corruption.", series: null, tier: "A", topRank: null },
  { title: "The Committee", author: "Sonallah Ibrahim", pageCount: 176, genre: "Fiction", publicationDate: "1981-01-01", description: "An Egyptian intellectual is interrogated by a shadowy committee about his career, his country, and an object he cannot name.", series: null, tier: "A", topRank: null },

  // Persian / Iranian
  { title: "Prince Ehtejab", author: "Houshang Golshiri", pageCount: 96, genre: "Fiction", publicationDate: "1969-01-01", description: "The last member of a declining Qajar noble family sits alone in his mansion recounting the cruelties of his forebears.", series: null, tier: "S", topRank: null },

  { title: "Missing Soluch", author: "Mahmoud Dowlatabadi", pageCount: 496, genre: "Fiction", publicationDate: "1979-01-01", description: "In a drought-stricken Iranian village, a woman wakes to find her husband has disappeared — and she must somehow feed her children.", series: null, tier: "S", topRank: null },
  { title: "The Colonel", author: "Mahmoud Dowlatabadi", pageCount: 256, genre: "Fiction", publicationDate: "2009-01-01", description: "A retired Iranian army colonel confronts the bodies of his children on a rainy night as the revolution consumes his country.", series: null, tier: "S", topRank: null },

  { title: "Censoring an Iranian Love Story", author: "Shahriar Mandanipour", pageCount: 304, genre: "Fiction", publicationDate: "2009-01-01", description: "An Iranian novelist tries to write a love story that can clear the Islamic Republic's censors — and documents his own cuts as he goes.", series: null, tier: "A", topRank: null },

  { title: "Savushun", author: "Simin Daneshvar", pageCount: 368, genre: "Historical Fiction", publicationDate: "1969-01-01", description: "A landowning family in WWII Allied-occupied Shiraz contends with political chaos — the first major Persian novel by a woman.", series: null, tier: "S", topRank: null },

  { title: "My Uncle Napoleon", author: "Iraj Pezeshkzad", pageCount: 528, genre: "Fiction", publicationDate: "1973-01-01", description: "An Iranian boy's conspiracy-obsessed uncle, convinced that the British are out to get him, consumes the life of the extended family — the canonical Iranian comic novel.", series: null, tier: "S", topRank: null },

  // Southeast Asian
  { title: "Beauty Is a Wound", author: "Eka Kurniawan", pageCount: 480, genre: "Fiction", publicationDate: "2002-01-01", description: "A beautiful Indonesian prostitute rises from her grave twenty-one years after her death in a sprawling magical-realist chronicle of her country.", series: null, tier: "S", topRank: null },
  { title: "Man Tiger", author: "Eka Kurniawan", pageCount: 176, genre: "Fiction", publicationDate: "2004-01-01", description: "A young Indonesian man who harbors a white tigress inside his body commits a murder — and the novel works backwards to explain why.", series: null, tier: "A", topRank: null },

  { title: "Paradise of the Blind", author: "Duong Thu Huong", pageCount: 272, genre: "Fiction", publicationDate: "1988-01-01", description: "A Vietnamese woman working in a Soviet-bloc factory remembers her mother's sacrifices and the party official uncle who destroyed the family.", series: null, tier: "S", topRank: null },
  { title: "Memories of a Pure Spring", author: "Duong Thu Huong", pageCount: 368, genre: "Fiction", publicationDate: "1996-01-01", description: "A Vietnamese songwriter from the resistance years collides with the disillusionments of peacetime.", series: null, tier: "A", topRank: null },

  { title: "Twilight in Jakarta", author: "Mochtar Lubis", pageCount: 272, genre: "Fiction", publicationDate: "1963-01-01", description: "A panorama of corrupt 1950s Jakarta through the lives of politicians, journalists, and the urban poor who serve them.", series: null, tier: "A", topRank: null },

  { title: "Saman", author: "Ayu Utami", pageCount: 192, genre: "Fiction", publicationDate: "1998-01-01", description: "The first major post-Suharto Indonesian novel — a defrocked priest, four friends, and a plantation struggle fuse into a reordering of what Indonesian fiction can do.", series: null, tier: "S", topRank: null },

  // Polish post-war
  { title: "On the Road to Babadag", author: "Andrzej Stasiuk", pageCount: 272, genre: "Non-Fiction", publicationDate: "2004-01-01", description: "Stasiuk's wandering travel essays across forgotten corners of Eastern Europe — Slovakia, Albania, Moldova, Ukraine, Romania.", series: null, tier: "S", topRank: null },
  { title: "Nine", author: "Andrzej Stasiuk", pageCount: 240, genre: "Fiction", publicationDate: "1999-01-01", description: "A post-communist Warsaw drifter tries to collect a debt that could save his life across a sleepless 24 hours in the city.", series: null, tier: "A", topRank: null },

  { title: "Ashes and Diamonds", author: "Jerzy Andrzejewski", pageCount: 256, genre: "Historical Fiction", publicationDate: "1948-01-01", description: "In the last days of WWII in a small Polish town, a young underground fighter is ordered to kill a communist official.", series: null, tier: "S", topRank: null },

  { title: "A Minor Apocalypse", author: "Tadeusz Konwicki", pageCount: 240, genre: "Fiction", publicationDate: "1979-01-01", description: "A disillusioned Polish writer is told by friends he must burn himself to death in front of the party headquarters — and spends the day trying to find matches.", series: null, tier: "A", topRank: null },
  { title: "The Polish Complex", author: "Tadeusz Konwicki", pageCount: 224, genre: "Fiction", publicationDate: "1977-01-01", description: "Polish citizens queue outside a Warsaw jewelry store on Christmas Eve while the narrator drifts through his country's historical wounds.", series: null, tier: "A", topRank: null },

  { title: "This Way for the Gas, Ladies and Gentlemen", author: "Tadeusz Borowski", pageCount: 180, genre: "Fiction", publicationDate: "1959-01-01", description: "Stories drawn from Borowski's own Auschwitz imprisonment — narrated from inside the camp's grim economy of survival.", series: null, tier: "S", topRank: null },

  { title: "The Mighty Angel", author: "Jerzy Pilch", pageCount: 160, genre: "Fiction", publicationDate: "2000-01-01", description: "A Polish writer's eighteenth stint in alcohol detox, told in the funniest, bleakest voice in contemporary Polish fiction.", series: null, tier: "A", topRank: null },
  { title: "His Current Woman", author: "Jerzy Pilch", pageCount: 208, genre: "Fiction", publicationDate: "1995-01-01", description: "A Polish Lutheran household in a Silesian mountain town is thrown into chaos by the arrival of a silent young woman.", series: null, tier: "A", topRank: null },

  { title: "Who Was David Weiser?", author: "Paweł Huelle", pageCount: 240, genre: "Fiction", publicationDate: "1987-01-01", description: "Three men who were Gdańsk schoolboys in 1957 try to reconstruct the day their classmate David Weiser vanished into the woods.", series: null, tier: "S", topRank: null },
  { title: "Mercedes-Benz", author: "Paweł Huelle", pageCount: 128, genre: "Fiction", publicationDate: "2001-01-01", description: "A Polish writer's driving lessons become a meditation on his grandfather and the cars that haunt his family's twentieth century.", series: null, tier: "A", topRank: null },

  // Hungarian
  { title: "The Door", author: "Magda Szabó", pageCount: 262, genre: "Fiction", publicationDate: "1987-01-01", description: "A Hungarian writer's relationship with her fierce, secretive housekeeper becomes the central moral reckoning of her life.", series: null, tier: "S", topRank: null },
  { title: "Iza's Ballad", author: "Magda Szabó", pageCount: 336, genre: "Fiction", publicationDate: "1963-01-01", description: "A recently widowed Hungarian woman is brought to live with her successful doctor daughter in Budapest, and the kindness destroys her.", series: null, tier: "S", topRank: null },
  { title: "Katalin Street", author: "Magda Szabó", pageCount: 240, genre: "Fiction", publicationDate: "1969-01-01", description: "Three Budapest families on one street before, during, and after the Second World War.", series: null, tier: "S", topRank: null },

  { title: "Celestial Harmonies", author: "Péter Esterházy", pageCount: 864, genre: "Fiction", publicationDate: "2000-01-01", description: "A sprawling fictional history of the Esterházy dynasty braided with the author's own father — a masterpiece of Hungarian postmodernism.", series: null, tier: "S", topRank: null },
  { title: "Helping Verbs of the Heart", author: "Péter Esterházy", pageCount: 144, genre: "Fiction", publicationDate: "1985-01-01", description: "A son's grief for his dead mother is rendered in a torrent of appropriated literary and philosophical quotations.", series: null, tier: "A", topRank: null },

  { title: "Sunflower", author: "Gyula Krúdy", pageCount: 224, genre: "Fiction", publicationDate: "1918-01-01", description: "A young Budapest woman withdraws to her late grandmother's countryside estate and is courted by a parade of grotesques.", series: null, tier: "S", topRank: null },
  { title: "The Adventures of Sindbad", author: "Gyula Krúdy", pageCount: 272, genre: "Fiction", publicationDate: "1911-01-01", description: "A long-dead Hungarian lover named Sindbad returns from the grave across twenty sketches to revisit the women he once haunted.", series: null, tier: "A", topRank: null },

  { title: "They Were Counted", author: "Miklós Bánffy", pageCount: 600, genre: "Historical Fiction", publicationDate: "1934-01-01", description: "The first volume of the Transylvanian Trilogy: two Hungarian cousins and the doomed decade before WWI in Austro-Hungarian Transylvania.", series: { name: "Transylvanian Trilogy", order: 1, total: 3 }, tier: "S", topRank: null },
  { title: "They Were Found Wanting", author: "Miklós Bánffy", pageCount: 560, genre: "Historical Fiction", publicationDate: "1937-01-01", description: "The second volume follows the cousins deeper into Budapest politics and their separate tragedies.", series: { name: "Transylvanian Trilogy", order: 2, total: 3 }, tier: "S", topRank: null },
  { title: "They Were Divided", author: "Miklós Bánffy", pageCount: 416, genre: "Historical Fiction", publicationDate: "1940-01-01", description: "The Transylvanian Trilogy closes with the outbreak of the First World War and the scattering of the remnants.", series: { name: "Transylvanian Trilogy", order: 3, total: 3 }, tier: "S", topRank: null },

  { title: "Metropole", author: "Ferenc Karinthy", pageCount: 240, genre: "Fiction", publicationDate: "1970-01-01", description: "A Hungarian linguist arriving at a conference lands in a country whose language he cannot decode, and cannot leave.", series: null, tier: "S", topRank: null },

  { title: "The Sinistra Zone", author: "Ádám Bodor", pageCount: 224, genre: "Fiction", publicationDate: "1992-01-01", description: "In a cold militarized zone in the Carpathians, a stranger tries to find his adopted son under a regime that has erased him.", series: null, tier: "A", topRank: null },

  // Russian post-Soviet
  { title: "The Slynx", author: "Tatyana Tolstaya", pageCount: 304, genre: "Sci-Fi", publicationDate: "2000-01-01", description: "Two centuries after the Blast, Moscow has reverted to a wooden-village barbarism where Pushkin is worshipped and a monstrous Slynx prowls the forest.", series: null, tier: "S", topRank: null },

  { title: "Omon Ra", author: "Viktor Pelevin", pageCount: 160, genre: "Sci-Fi", publicationDate: "1992-01-01", description: "A Soviet boy who dreams of space joins a cosmonaut program that turns out to be a suicidal Potemkin propaganda operation.", series: null, tier: "S", topRank: null },
  { title: "Homo Zapiens", author: "Viktor Pelevin", pageCount: 256, genre: "Sci-Fi", publicationDate: "1999-01-01", description: "A post-Soviet advertising copywriter discovers that Russia itself is being rendered inside a simulated reality run by magic.", series: null, tier: "A", topRank: null },
  { title: "The Life of Insects", author: "Viktor Pelevin", pageCount: 208, genre: "Fiction", publicationDate: "1993-01-01", description: "In a seaside Crimean resort, humans and insects merge and switch places in a series of fables about post-Soviet life.", series: null, tier: "A", topRank: null },

  { title: "Moscow to the End of the Line", author: "Venedikt Yerofeev", pageCount: 164, genre: "Fiction", publicationDate: "1970-01-01", description: "A drunk narrator tries to ride a commuter train from Moscow to the suburb of Petushki — the cult masterpiece of late-Soviet samizdat.", series: null, tier: "S", topRank: null },

  { title: "The Big Green Tent", author: "Lyudmila Ulitskaya", pageCount: 592, genre: "Fiction", publicationDate: "2010-01-01", description: "Three Moscow boys grow up in the thaw generation and lose their lives to the dissident movement.", series: null, tier: "A", topRank: null },
  { title: "Daniel Stein, Interpreter", author: "Lyudmila Ulitskaya", pageCount: 416, genre: "Historical Fiction", publicationDate: "2006-01-01", description: "A Polish Jew who survived the war as a translator for the Nazis becomes an Israeli Catholic priest — a novel told in documents.", series: null, tier: "A", topRank: null },

  { title: "There Once Lived a Woman Who Tried to Kill Her Neighbor's Baby", author: "Lyudmila Petrushevskaya", pageCount: 208, genre: "Fiction", publicationDate: "2009-01-01", description: "Scary fairy tales set in the communal apartments of the late Soviet Union.", series: null, tier: "S", topRank: null },
  { title: "There Once Lived a Girl Who Seduced Her Sister's Husband, and He Hanged Himself", author: "Lyudmila Petrushevskaya", pageCount: 192, genre: "Fiction", publicationDate: "2013-01-01", description: "Love stories from the same bitter, compassionate observer of Russian domestic life.", series: null, tier: "A", topRank: null },

  { title: "Laurus", author: "Yevgeny Vodolazkin", pageCount: 384, genre: "Historical Fiction", publicationDate: "2012-01-01", description: "A fifteenth-century Russian healer spends his life atoning for the death of his beloved — in a novel that braids medieval Russian with the contemporary.", series: null, tier: "S", topRank: null },

  { title: "Maidenhair", author: "Mikhail Shishkin", pageCount: 512, genre: "Fiction", publicationDate: "2005-01-01", description: "A Russian interpreter in Swiss asylum hearings listens to Chechen refugees as his own letters home unspool.", series: null, tier: "S", topRank: null },
  { title: "The Light and the Dark", author: "Mikhail Shishkin", pageCount: 320, genre: "Historical Fiction", publicationDate: "2010-01-01", description: "A Russian conscript in the 1900 Boxer expedition and a contemporary Russian woman write love letters across time.", series: null, tier: "A", topRank: null },

  { title: "Death and the Penguin", author: "Andrey Kurkov", pageCount: 240, genre: "Fiction", publicationDate: "1996-01-01", description: "A struggling Kyiv obituary writer, who keeps a pet penguin acquired from a failing zoo, begins writing obituaries for people who are still alive.", series: null, tier: "A", topRank: null },

  // Balkan
  { title: "Bosnian Chronicle", author: "Ivo Andrić", pageCount: 464, genre: "Historical Fiction", publicationDate: "1945-01-01", description: "The French, Austrian, and Ottoman consuls navigate a tense decade in nineteenth-century Ottoman Travnik — by the 1961 Nobel laureate.", series: null, tier: "S", topRank: null },

  { title: "On the Edge of Reason", author: "Miroslav Krleža", pageCount: 240, genre: "Fiction", publicationDate: "1938-01-01", description: "An insulted Zagreb lawyer tells the truth about his dinner companions for one night, and his life collapses.", series: null, tier: "S", topRank: null },
  { title: "The Return of Philip Latinowicz", author: "Miroslav Krleža", pageCount: 208, genre: "Fiction", publicationDate: "1932-01-01", description: "A Zagreb painter returns home after decades abroad to confront the provincial society that shaped him.", series: null, tier: "A", topRank: null },

  { title: "The Museum of Unconditional Surrender", author: "Dubravka Ugrešić", pageCount: 256, genre: "Fiction", publicationDate: "1997-01-01", description: "A Yugoslav writer exiled to Berlin collects fragments, photographs, and her mother's story as a Yugoslavia ceases to exist.", series: null, tier: "S", topRank: null },
  { title: "Baba Yaga Laid an Egg", author: "Dubravka Ugrešić", pageCount: 336, genre: "Fiction", publicationDate: "2007-01-01", description: "A triptych of tales about old women and Slavic folklore, culminating in an essay-decoding of the whole book.", series: null, tier: "A", topRank: null },

  { title: "S.: A Novel about the Balkans", author: "Slavenka Drakulić", pageCount: 192, genre: "Fiction", publicationDate: "1999-01-01", description: "A Bosnian Muslim woman in a Swedish hospital remembers the Serbian rape camps where she survived.", series: null, tier: "S", topRank: null },
  { title: "They Would Never Hurt a Fly", author: "Slavenka Drakulić", pageCount: 224, genre: "Non-Fiction", publicationDate: "2004-01-01", description: "Drakulić sits in the Hague war crimes tribunal and studies the astonishing ordinariness of the accused.", series: null, tier: "A", topRank: null },

  { title: "Death and the Dervish", author: "Meša Selimović", pageCount: 464, genre: "Fiction", publicationDate: "1966-01-01", description: "An Ottoman-era Bosnian Sufi dervish's quiet life is shattered when his brother is arrested — the canonical Bosnian novel.", series: null, tier: "S", topRank: null },

  { title: "The Lazarus Project", author: "Aleksandar Hemon", pageCount: 304, genre: "Fiction", publicationDate: "2008-05-01", description: "A Sarajevan émigré in Chicago investigates the 1908 shooting of a young Jewish immigrant by the city's police chief.", series: null, tier: "S", topRank: null },
  { title: "Nowhere Man", author: "Aleksandar Hemon", pageCount: 256, genre: "Fiction", publicationDate: "2002-10-08", description: "A Bosnian wanderer named Jozef Pronek passes through the lives of everyone he meets in Kiev, Chicago, and Sarajevo.", series: null, tier: "A", topRank: null },

  { title: "Bait", author: "David Albahari", pageCount: 128, genre: "Fiction", publicationDate: "1996-01-01", description: "A Serbian émigré in Canada listens to tape recordings his mother made before her death and tries to write her life.", series: null, tier: "A", topRank: null },

  // Romanian
  { title: "The Hooligan's Return", author: "Norman Manea", pageCount: 400, genre: "Non-Fiction", publicationDate: "2003-01-01", description: "A Romanian Jewish writer returns to Bucharest after decades of exile and contends with everything his country has tried to forget.", series: null, tier: "S", topRank: null },
  { title: "Captives", author: "Norman Manea", pageCount: 288, genre: "Fiction", publicationDate: "1970-01-01", description: "A three-part exploration of life under Ceaușescu's Romania, Manea's first major novel.", series: null, tier: "A", topRank: null },
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
