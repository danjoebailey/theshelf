const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

// ── PRIMARY (existing authors) ────────────────────────────────────────────
const PRIMARY_ADDITIONS = [
  // Alan Moore (4)
  { title: "V for Vendetta", author: "Alan Moore", pageCount: 296, genre: "Graphic Novel", publicationDate: "1988", description: "Moore's dystopian graphic novel: in a near-future fascist Britain, a masked revolutionary calling himself V begins a terror campaign to bring down the regime.", series: null, tier: 1, topRank: null },
  { title: "From Hell", author: "Alan Moore", pageCount: 576, genre: "Graphic Novel", publicationDate: "1999", description: "Moore's immense graphic-novel Ripper hypothesis: a conspiratorial theory of the Whitechapel murders told through royal physician Sir William Gull's psychogeographic descent into madness.", series: null, tier: 1, topRank: null },
  { title: "The League of Extraordinary Gentlemen, Vol. 1", author: "Alan Moore", pageCount: 192, genre: "Graphic Novel", publicationDate: "2000", description: "Moore's Victorian team-up: Mina Murray, Allan Quatermain, Captain Nemo, Dr. Jekyll, and the Invisible Man unite to stop Fu Manchu's plot against the British Empire.", series: { name: "The League of Extraordinary Gentlemen", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "Jerusalem", author: "Alan Moore", pageCount: 1280, genre: "Fiction", publicationDate: "2016", description: "Moore's 1,200-page novel of Northampton: a mystical history of a single working-class English neighborhood told across time, space, and multiple metaphysical planes.", series: null, tier: 1, topRank: null },

  // Frank Miller (3)
  { title: "300", author: "Frank Miller", pageCount: 88, genre: "Graphic Novel", publicationDate: "1998", description: "Miller's graphic novel of the Battle of Thermopylae: 300 Spartans under King Leonidas make their stand against the Persian army of Xerxes.", series: null, tier: 1, topRank: null },
  { title: "Batman: Year One", author: "Frank Miller", pageCount: 144, genre: "Graphic Novel", publicationDate: "1987", description: "Miller's origin story of Batman: a first-year Bruce Wayne patrolling Gotham while a rookie Jim Gordon tries to survive the department's corruption.", series: null, tier: 1, topRank: null },
  { title: "Daredevil: Born Again", author: "Frank Miller", pageCount: 240, genre: "Graphic Novel", publicationDate: "1987", description: "Miller's Marvel masterwork: after the Kingpin learns Matt Murdock is Daredevil, he systematically destroys Murdock's life — and Murdock rebuilds himself from the ruins.", series: null, tier: 1, topRank: null },

  // Brian K. Vaughan (3)
  { title: "Pride of Baghdad", author: "Brian K. Vaughan", pageCount: 136, genre: "Graphic Novel", publicationDate: "2006", description: "Based on a true story: four lions escape a Baghdad zoo during the 2003 American bombing and face the question of freedom in an unfamiliar city.", series: null, tier: 1, topRank: null },
  { title: "Runaways Vol. 1: Pride & Joy", author: "Brian K. Vaughan", pageCount: 144, genre: "Graphic Novel", publicationDate: "2004", description: "Six teenagers discover their parents are supervillains — and that they themselves have inherited superpowers they never suspected.", series: { name: "Runaways", order: 1, total: 12 }, tier: 1, topRank: null },
  { title: "We Stand on Guard", author: "Brian K. Vaughan", pageCount: 144, genre: "Graphic Novel", publicationDate: "2015", description: "Vaughan's graphic novel of the United States invading Canada for its water in the 2120s — and the Canadian resistance that forms to stop them.", series: null, tier: 1, topRank: null },

  // Jeff Lemire (3)
  { title: "Sweet Tooth, Vol. 1: Out of the Deep Woods", author: "Jeff Lemire", pageCount: 128, genre: "Graphic Novel", publicationDate: "2010", description: "A deer-human hybrid boy named Gus, raised by his father in the woods after a pandemic wiped out most of humanity, is taken by a tough survivalist to a refuge he may or may not reach.", series: { name: "Sweet Tooth", order: 1, total: 6 }, tier: 1, topRank: null },
  { title: "Descender, Vol. 1: Tin Stars", author: "Jeff Lemire", pageCount: 160, genre: "Graphic Novel", publicationDate: "2015", description: "Lemire and Dustin Nguyen's space opera: a young robot named Tim-21 wakes after a decade of sleep to find his human family gone and an intergalactic robot-hunting purge underway.", series: { name: "Descender", order: 1, total: 6 }, tier: 1, topRank: null },
  { title: "The Underwater Welder", author: "Jeff Lemire", pageCount: 224, genre: "Graphic Novel", publicationDate: "2012", description: "An underwater welder on a Nova Scotia offshore oil rig begins having supernatural visions of his dead father as his own wife is about to give birth.", series: null, tier: 1, topRank: null },

  // Marjane Satrapi (2)
  { title: "Chicken with Plums", author: "Marjane Satrapi", pageCount: 96, genre: "Graphic Novel", publicationDate: "2004", description: "Satrapi's graphic memoir of her great-uncle, a celebrated Iranian tar musician, and the eight days he spent waiting to die after his favorite tar was destroyed.", series: null, tier: 1, topRank: null },
  { title: "Embroideries", author: "Marjane Satrapi", pageCount: 144, genre: "Graphic Novel", publicationDate: "2003", description: "Satrapi's graphic account of an afternoon tea with her grandmother and her female relatives — during which the women recount their secret love lives.", series: null, tier: 1, topRank: null },

  // Brian Jacques (5)
  { title: "Salamandastron", author: "Brian Jacques", pageCount: 432, genre: "Young Adult", publicationDate: "1992", description: "Redwall #5: the mountain fortress of Salamandastron is besieged by a massive army, and the hares and badgers of the Long Patrol must defend it at all costs.", series: { name: "Redwall", order: 5, total: 22 }, tier: 1, topRank: null },
  { title: "Marlfox", author: "Brian Jacques", pageCount: 384, genre: "Young Adult", publicationDate: "1998", description: "Redwall #11: the Marlfoxes — shape-shifting water-marauders — steal the Redwall Abbey tapestry, and a band of young mice must pursue them through the wilderness.", series: { name: "Redwall", order: 11, total: 22 }, tier: 1, topRank: null },
  { title: "The Legend of Luke", author: "Brian Jacques", pageCount: 384, genre: "Young Adult", publicationDate: "1999", description: "Redwall #12: Martin the Warrior returns to the seashore of his birth to learn the story of his father Luke — and the sea wolf Vilu Daskar who killed Luke's wife.", series: { name: "Redwall", order: 12, total: 22 }, tier: 1, topRank: null },
  { title: "The Taggerung", author: "Brian Jacques", pageCount: 432, genre: "Young Adult", publicationDate: "2001", description: "Redwall #14: an otter infant stolen by a ferret clan is raised as the Taggerung, their prophesied champion — and one day learns where he truly came from.", series: { name: "Redwall", order: 14, total: 22 }, tier: 1, topRank: null },
  { title: "Triss", author: "Brian Jacques", pageCount: 416, genre: "Young Adult", publicationDate: "2002", description: "Redwall #15: a squirrelmaid warrior named Triss escapes the Riftgard pirates and leads a rebellion to free the other slaves and reach Redwall.", series: { name: "Redwall", order: 15, total: 22 }, tier: 1, topRank: null },

  // Christopher Priest (3)
  { title: "Inverted World", author: "Christopher Priest", pageCount: 256, genre: "Sci-Fi", publicationDate: "1974", description: "A city that must be moved forward on rails across a strange landscape to avoid the 'past' catching up with it — Priest's classic of reality warped by perception.", series: null, tier: 1, topRank: null },
  { title: "The Affirmation", author: "Christopher Priest", pageCount: 240, genre: "Fiction", publicationDate: "1981", description: "An unemployed Englishman escapes to an isolated Yorkshire cottage and begins writing his autobiography — which becomes indistinguishable from the Dream Archipelago that may be real.", series: null, tier: 1, topRank: null },
  { title: "Fugue for a Darkening Island", author: "Christopher Priest", pageCount: 160, genre: "Sci-Fi", publicationDate: "1972", description: "A nuclear war in Africa sends millions of refugees to Britain, and the resulting civil war destroys the country — Priest's early dystopian novel.", series: null, tier: 1, topRank: null },

  // Peter James (3)
  { title: "You Are Dead", author: "Peter James", pageCount: 464, genre: "Thriller", publicationDate: "2015", description: "Roy Grace #11: a young woman vanishes in Brighton's city centre — and a series of text messages from her mobile suggests she may already be dead.", series: { name: "Roy Grace", order: 11, total: 20 }, tier: 1, topRank: null },
  { title: "Need You Dead", author: "Peter James", pageCount: 448, genre: "Thriller", publicationDate: "2017", description: "Roy Grace #13: a wealthy Brighton woman is found dead in her bath, and her mysterious boyfriend's double life begins to unravel.", series: { name: "Roy Grace", order: 13, total: 20 }, tier: 1, topRank: null },
  { title: "Dead at First Sight", author: "Peter James", pageCount: 528, genre: "Thriller", publicationDate: "2018", description: "Roy Grace #15: a woman falls for a man she met online — but the man has no idea she exists, and Grace must stop a global romance-scam ring before it kills again.", series: { name: "Roy Grace", order: 15, total: 20 }, tier: 1, topRank: null },

  // Katherine Arden (3)
  { title: "Small Spaces", author: "Katherine Arden", pageCount: 240, genre: "Young Adult", publicationDate: "2018", description: "The first Small Spaces novel: an 11-year-old Vermont girl and her friends get trapped on a mysterious farm field trip — and are hunted by scarecrows and a smiling man.", series: { name: "Small Spaces", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "Dead Voices", author: "Katherine Arden", pageCount: 240, genre: "Young Adult", publicationDate: "2019", description: "Small Spaces #2: Ollie, Brian, and Coco are snowed in at a ski resort — where the ghost of a child murdered in the resort's past is waking up.", series: { name: "Small Spaces", order: 2, total: 4 }, tier: 1, topRank: null },
  { title: "Dark Waters", author: "Katherine Arden", pageCount: 256, genre: "Young Adult", publicationDate: "2021", description: "Small Spaces #3: Ollie and her friends visit Lake Champlain and encounter the lake monster — and the smiling man who may be controlling it.", series: { name: "Small Spaces", order: 3, total: 4 }, tier: 1, topRank: null },

  // Sarah Pinsker (3)
  { title: "We Are Satellites", author: "Sarah Pinsker", pageCount: 400, genre: "Sci-Fi", publicationDate: "2021", description: "A near-future American family splits over a new brain implant device that makes users capable of intense multitasking — and whose rejection by one member becomes a social stigma.", series: null, tier: 1, topRank: null },
  { title: "Sooner or Later Everything Falls Into the Sea", author: "Sarah Pinsker", pageCount: 256, genre: "Sci-Fi", publicationDate: "2019", description: "Pinsker's first story collection: thirteen tales including the Nebula-winning 'Our Lady of the Open Road' and the Hugo-winning 'Wind Will Rove.'", series: null, tier: 1, topRank: null },
  { title: "Haunt Sweet Home", author: "Sarah Pinsker", pageCount: 144, genre: "Horror", publicationDate: "2024", description: "A down-on-her-luck production assistant on her cousin's haunted-house reality-TV show discovers something real is waiting in one of the houses.", series: null, tier: 1, topRank: null },

  // Malka Older (2)
  { title: "The Imposition of Unnecessary Obstacles", author: "Malka Older", pageCount: 176, genre: "Mystery", publicationDate: "2023", description: "The first Mossa and Pleiti novella: on a colonized Jupiter, a professor and an investigator team up to solve a locked-room murder at an orbital university.", series: { name: "The Mossa and Pleiti Investigations", order: 1, total: 2 }, tier: 1, topRank: null },
  { title: "The Potency of Ungovernable Impulses", author: "Malka Older", pageCount: 176, genre: "Mystery", publicationDate: "2024", description: "Mossa and Pleiti #2: the couple investigate a series of impossible disappearances at one of Jupiter's outer university platforms.", series: { name: "The Mossa and Pleiti Investigations", order: 2, total: 2 }, tier: 1, topRank: null },

  // Daniel Clowes (3)
  { title: "Ghost World", author: "Daniel Clowes", pageCount: 80, genre: "Graphic Novel", publicationDate: "1997", description: "Clowes's landmark graphic novel: two recently graduated high school friends navigate post-adolescent boredom and their slowly diverging lives in an unnamed American city.", series: null, tier: 1, topRank: null },
  { title: "Patience", author: "Daniel Clowes", pageCount: 180, genre: "Graphic Novel", publicationDate: "2016", description: "A science-fiction graphic novel: a grieving husband travels back in time to prevent his wife's murder — but every intervention makes things worse.", series: null, tier: 1, topRank: null },
  { title: "Wilson", author: "Daniel Clowes", pageCount: 80, genre: "Graphic Novel", publicationDate: "2010", description: "Clowes's dark comedy: a middle-aged misanthropic loner tries to reconnect with his estranged ex-wife and the daughter he never met.", series: null, tier: 1, topRank: null },

  // Katherine Rundell (2)
  { title: "Rooftoppers", author: "Katherine Rundell", pageCount: 304, genre: "Young Adult", publicationDate: "2013", description: "A girl raised by a bookish English scholar after being rescued from a shipwreck embarks on a journey to find her mother across the rooftops of Paris.", series: null, tier: 1, topRank: null },
  { title: "The Explorer", author: "Katherine Rundell", pageCount: 336, genre: "Young Adult", publicationDate: "2017", description: "Four children survive a plane crash in the Amazon rainforest and are helped by a mysterious man who has been hiding in the jungle.", series: null, tier: 1, topRank: null },
];

// ── REC LIBRARY (new authors) ────────────────────────────────────────────
const REC_LIBRARY_ADDITIONS = [
  // Grant Morrison (4)
  { title: "The Invisibles, Vol. 1: Say You Want a Revolution", author: "Grant Morrison", pageCount: 160, genre: "Graphic Novel", publicationDate: "1994", description: "Morrison's psychedelic counterculture-conspiracy epic: a British cell of the Invisibles fights the Outer Church through time-bending reality and pop-magic warfare.", series: { name: "The Invisibles", order: 1, total: 7 }, tier: 1, topRank: null },
  { title: "All-Star Superman, Vol. 1", author: "Grant Morrison", pageCount: 160, genre: "Graphic Novel", publicationDate: "2005", description: "Morrison and Frank Quitely's twelve-issue Superman saga: Superman's exposure to solar radiation gives him enough power to complete his twelve labors before he dies.", series: null, tier: 1, topRank: null },
  { title: "We3", author: "Grant Morrison", pageCount: 104, genre: "Graphic Novel", publicationDate: "2004", description: "Morrison and Frank Quitely: three animals — a dog, a cat, and a rabbit — are converted into weapons and escape their military handlers.", series: null, tier: 1, topRank: null },
  { title: "Flex Mentallo", author: "Grant Morrison", pageCount: 112, genre: "Graphic Novel", publicationDate: "1996", description: "Morrison and Frank Quitely's meta-fictional four-part series: a superhero-parody bodybuilder named Flex Mentallo searches for meaning at the intersection of comics and reality.", series: null, tier: 1, topRank: null },

  // Warren Ellis (4)
  { title: "Transmetropolitan, Vol. 1: Back on the Street", author: "Warren Ellis", pageCount: 144, genre: "Graphic Novel", publicationDate: "1997", description: "Ellis's cyberpunk-gonzo: Spider Jerusalem, a Hunter S. Thompson-esque journalist, returns from reclusive exile to the City to investigate its new fascist president.", series: { name: "Transmetropolitan", order: 1, total: 10 }, tier: 1, topRank: null },
  { title: "Planetary, Vol. 1: All Over the World", author: "Warren Ellis", pageCount: 160, genre: "Graphic Novel", publicationDate: "1999", description: "Ellis and John Cassaday's meta-comics: three field agents of the Planetary organization investigate the secret history of the 20th century across a world of forgotten pulp heroes.", series: { name: "Planetary", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "The Authority, Vol. 1: Relentless", author: "Warren Ellis", pageCount: 176, genre: "Graphic Novel", publicationDate: "1999", description: "Ellis's superhero revamp: a team of post-human defenders drops the pretense of government partnership and starts treating superhuman problems as global politics.", series: { name: "The Authority", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Crooked Little Vein", author: "Warren Ellis", pageCount: 288, genre: "Fiction", publicationDate: "2007", description: "Ellis's novel: a washed-up private investigator in New York is hired by the President's chief of staff to find a secret alternate Constitution — and is sent through the vilest underbelly of American culture.", series: null, tier: 1, topRank: null },

  // Mike Mignola (3)
  { title: "Hellboy, Vol. 1: Seed of Destruction", author: "Mike Mignola", pageCount: 128, genre: "Graphic Novel", publicationDate: "1994", description: "The first Hellboy collection: a demon summoned to Earth by Nazis in 1944 is raised by the American military and grows up to fight the occult on behalf of the BPRD.", series: { name: "Hellboy", order: 1, total: 16 }, tier: 1, topRank: null },
  { title: "Hellboy, Vol. 2: Wake the Devil", author: "Mike Mignola", pageCount: 160, genre: "Graphic Novel", publicationDate: "1996", description: "Hellboy #2: Hellboy investigates a vampire resurrection in Romania and confronts his own prophesied destiny as the Beast of the Apocalypse.", series: { name: "Hellboy", order: 2, total: 16 }, tier: 1, topRank: null },
  { title: "Hellboy in Hell, Vol. 1: The Descent", author: "Mike Mignola", pageCount: 144, genre: "Graphic Novel", publicationDate: "2014", description: "The final Hellboy arc: after dying in The Storm and the Fury, Hellboy wakes up in Hell and begins an exploration of his true home — and his ancient inheritance.", series: null, tier: 1, topRank: null },

  // Garth Ennis (3)
  { title: "Preacher, Vol. 1: Gone to Texas", author: "Garth Ennis", pageCount: 200, genre: "Graphic Novel", publicationDate: "1996", description: "Ennis and Steve Dillon's Texas preacher is possessed by the entity Genesis — offspring of an angel and a demon — and sets off with his ex-girlfriend and an Irish vampire to find God.", series: { name: "Preacher", order: 1, total: 9 }, tier: 1, topRank: null },
  { title: "The Boys, Vol. 1: The Name of the Game", author: "Garth Ennis", pageCount: 152, genre: "Graphic Novel", publicationDate: "2006", description: "Ennis's cynical superhero deconstruction: a CIA-funded team of non-powered humans keeps watch on corporate superheroes — and kills them when they get out of line.", series: { name: "The Boys", order: 1, total: 12 }, tier: 1, topRank: null },
  { title: "Punisher MAX, Vol. 1: In the Beginning", author: "Garth Ennis", pageCount: 144, genre: "Graphic Novel", publicationDate: "2004", description: "Ennis's definitive take on Frank Castle: a more realistic, brutal Punisher operating in a world without superheroes and without clean consciences.", series: null, tier: 1, topRank: null },

  // Scott McCloud (3)
  { title: "Understanding Comics", author: "Scott McCloud", pageCount: 224, genre: "Non-Fiction", publicationDate: "1993", description: "McCloud's landmark comics-theory book, itself in comics form: an analytical tour of how sequential art works, why it's an art form unto itself, and how readers participate in it.", series: null, tier: 1, topRank: null },
  { title: "Reinventing Comics", author: "Scott McCloud", pageCount: 256, genre: "Non-Fiction", publicationDate: "2000", description: "McCloud's follow-up to Understanding Comics: the twelve revolutions he saw coming to comics — from digital publication to creator ownership and micropayments.", series: null, tier: 1, topRank: null },
  { title: "Making Comics", author: "Scott McCloud", pageCount: 272, genre: "Non-Fiction", publicationDate: "2006", description: "McCloud's how-to guide for aspiring comics creators: storytelling, pacing, character design, and the craft of sequential art — taught in comics form.", series: null, tier: 1, topRank: null },

  // John Flanagan (4)
  { title: "The Ruins of Gorlan", author: "John Flanagan", pageCount: 272, genre: "Young Adult", publicationDate: "2004", description: "The first Ranger's Apprentice novel: a small orphan boy is chosen by the mysterious Ranger Corps to serve as an apprentice to a hooded master-scout.", series: { name: "Ranger's Apprentice", order: 1, total: 12 }, tier: 1, topRank: null },
  { title: "The Burning Bridge", author: "John Flanagan", pageCount: 272, genre: "Young Adult", publicationDate: "2005", description: "Ranger's Apprentice #2: Will and his mentor must uncover a treasonous plot while leading a diplomatic mission to the neighboring kingdom of Celtica.", series: { name: "Ranger's Apprentice", order: 2, total: 12 }, tier: 1, topRank: null },
  { title: "The Icebound Land", author: "John Flanagan", pageCount: 288, genre: "Young Adult", publicationDate: "2005", description: "Ranger's Apprentice #3: Will and Evanlyn are enslaved by Skandian pirates and must survive a winter in the frozen north while Halt comes to rescue them.", series: { name: "Ranger's Apprentice", order: 3, total: 12 }, tier: 1, topRank: null },
  { title: "The Battle for Skandia", author: "John Flanagan", pageCount: 304, genre: "Young Adult", publicationDate: "2006", description: "Ranger's Apprentice #4: Will and Halt return to Skandia to help the Oberjarl defend the kingdom from a massive Temujai invasion.", series: { name: "Ranger's Apprentice", order: 4, total: 12 }, tier: 1, topRank: null },

  // Jeffrey Ford (3)
  { title: "The Physiognomy", author: "Jeffrey Ford", pageCount: 256, genre: "Fantasy", publicationDate: "1997", description: "The first Well-Built City novel: an arrogant physiognomist investigates a series of murders in a strange imperial city and is exiled to a labor camp.", series: { name: "Well-Built City", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "The Portrait of Mrs. Charbuque", author: "Jeffrey Ford", pageCount: 304, genre: "Historical Fiction", publicationDate: "2002", description: "In 19th-century Manhattan, a society portrait painter is hired to paint a wealthy woman who insists he cannot see her — only hear her life story through a screen.", series: null, tier: 1, topRank: null },
  { title: "The Girl in the Glass", author: "Jeffrey Ford", pageCount: 304, genre: "Historical Fiction", publicationDate: "2005", description: "A Depression-era spiritualism conman and his medium partner discover a real ghost during one of their staged séances — Ford's Edgar Award-winning novel.", series: null, tier: 1, topRank: null },

  // Felix Gilman (3)
  { title: "Thunderer", author: "Felix Gilman", pageCount: 432, genre: "Fantasy", publicationDate: "2007", description: "Gilman's debut: in the massive city of Ararat, a thousand gods compete for worshippers and a new revolutionary movement tries to free the city from the theocrats.", series: { name: "Ararat", order: 1, total: 2 }, tier: 1, topRank: null },
  { title: "Gears of the City", author: "Felix Gilman", pageCount: 464, genre: "Fantasy", publicationDate: "2009", description: "Ararat #2: an exiled character from Thunderer returns to discover the city has grown beyond his understanding, and new political factions are shaping its gods.", series: { name: "Ararat", order: 2, total: 2 }, tier: 1, topRank: null },
  { title: "The Half-Made World", author: "Felix Gilman", pageCount: 480, genre: "Fantasy", publicationDate: "2010", description: "Gilman's western-fantasy: a psychiatrist from the civilized East travels into the Half-Made World — a still-being-created frontier ruled by supernatural Gun and Line factions.", series: { name: "The Half-Made World", order: 1, total: 2 }, tier: 1, topRank: null },

  // Theodora Goss (3)
  { title: "The Strange Case of the Alchemist's Daughter", author: "Theodora Goss", pageCount: 416, genre: "Fantasy", publicationDate: "2017", description: "The first Athena Club novel: Mary Jekyll, Diana Hyde, Catherine Moreau, Justine Frankenstein, and Beatrice Rappaccini form a detective club in Victorian London.", series: { name: "The Extraordinary Adventures of the Athena Club", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "European Travel for the Monstrous Gentlewoman", author: "Theodora Goss", pageCount: 704, genre: "Fantasy", publicationDate: "2018", description: "The Athena Club #2: the Club travels to Vienna and Budapest to rescue Lucinda Van Helsing and confronts the alchemical society that created them all.", series: { name: "The Extraordinary Adventures of the Athena Club", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "The Sinister Mystery of the Mesmerizing Girl", author: "Theodora Goss", pageCount: 544, genre: "Fantasy", publicationDate: "2019", description: "The Athena Club #3: back in London, the Club investigates a kidnapping plot involving a young woman with mesmeric powers — and the Society of the Golden Dawn.", series: { name: "The Extraordinary Adventures of the Athena Club", order: 3, total: 3 }, tier: 1, topRank: null },

  // Jess Kidd (3)
  { title: "Things in Jars", author: "Jess Kidd", pageCount: 400, genre: "Mystery", publicationDate: "2019", description: "A Victorian lady detective in 1863 London investigates the kidnapping of a strange child being kept as a curiosity — and who may not be entirely human.", series: null, tier: 1, topRank: null },
  { title: "The Night Ship", author: "Jess Kidd", pageCount: 416, genre: "Historical Fiction", publicationDate: "2022", description: "Kidd's dual-timeline novel: a girl on the 17th-century Batavia shipwreck and a 1989 Australian boy whose island becomes the site of reckonings with a long-buried tragedy.", series: null, tier: 1, topRank: null },
  { title: "Himself", author: "Jess Kidd", pageCount: 384, genre: "Mystery", publicationDate: "2016", description: "Kidd's debut: a charming hitman who sees ghosts returns to the Irish village where his mother was killed — and sets out to solve the 26-year-old mystery.", series: null, tier: 1, topRank: null },

  // Graham Masterton (3)
  { title: "The Manitou", author: "Graham Masterton", pageCount: 256, genre: "Horror", publicationDate: "1975", description: "Masterton's horror debut: a Manhattan fortune teller's client grows a strange tumor on her neck — which is actually a Native American medicine man's reincarnated body.", series: null, tier: 1, topRank: null },
  { title: "Prey", author: "Graham Masterton", pageCount: 400, genre: "Horror", publicationDate: "1992", description: "An English architect renovating an Isle of Wight cottage is haunted by an entity that has been waiting in the house for centuries — and wants a body of its own.", series: null, tier: 1, topRank: null },
  { title: "Ritual", author: "Graham Masterton", pageCount: 400, genre: "Horror", publicationDate: "1988", description: "A New Orleans restaurant critic investigates a ritual cannibal cult whose members are butchering themselves at a gourmet chef's behest.", series: null, tier: 1, topRank: null },

  // Richard Chizmar (3)
  { title: "Chasing the Boogeyman", author: "Richard Chizmar", pageCount: 336, genre: "Horror", publicationDate: "2021", description: "Chizmar's fake-memoir novel: a small Maryland town in 1988 is stalked by a serial killer called the Boogeyman, and a young reporter investigates using his own childhood experiences.", series: null, tier: 1, topRank: null },
  { title: "Becoming the Boogeyman", author: "Richard Chizmar", pageCount: 352, genre: "Horror", publicationDate: "2023", description: "The sequel to Chasing the Boogeyman: Chizmar returns to Edgewood as a man connected to the original killings is released from prison.", series: null, tier: 1, topRank: null },
  { title: "Gwendy's Button Box", author: "Richard Chizmar", pageCount: 176, genre: "Horror", publicationDate: "2017", description: "Chizmar's collaboration with Stephen King: a 12-year-old girl in 1974 Castle Rock receives a mysterious button box from a mysterious man in a small top hat.", series: { name: "Gwendy", order: 1, total: 3 }, tier: 1, topRank: null },

  // Sam Sykes (3)
  { title: "Tome of the Undergates", author: "Sam Sykes", pageCount: 608, genre: "Fantasy", publicationDate: "2010", description: "The first Aeons' Gate novel: a band of misfit adventurers is hired to recover a book that can unlock the gates of the Abysmyth — and of course they fail catastrophically.", series: { name: "Aeons' Gate", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Black Halo", author: "Sam Sykes", pageCount: 576, genre: "Fantasy", publicationDate: "2011", description: "Aeons' Gate #2: Lenk and his dysfunctional crew continue to argue about the book while the demons they were trying to contain escape and hunt them down.", series: { name: "Aeons' Gate", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "The Mortal Tally", author: "Sam Sykes", pageCount: 592, genre: "Fantasy", publicationDate: "2016", description: "The second Bring Down Heaven novel: Lenk and his companions confront the return of the gods to a world that has learned to survive without them.", series: { name: "Bring Down Heaven", order: 2, total: 3 }, tier: 1, topRank: null },

  // Delilah S. Dawson (3)
  { title: "Wicked as They Come", author: "Delilah S. Dawson", pageCount: 400, genre: "Romance", publicationDate: "2012", description: "The first Blud novel: a woman transported to an alternate steampunk Victorian London falls for a charming vampire — and discovers the locket that brought her there is a key.", series: { name: "Blud", order: 1, total: 6 }, tier: 1, topRank: null },
  { title: "Hit", author: "Delilah S. Dawson", pageCount: 336, genre: "Young Adult", publicationDate: "2015", description: "A 17-year-old whose mother's medical debt is sold to Valor Savings Bank is drafted as one of its teenage assassins — and given a list of ten people to kill.", series: { name: "Hit", order: 1, total: 2 }, tier: 1, topRank: null },
  { title: "The Violence", author: "Delilah S. Dawson", pageCount: 400, genre: "Horror", publicationDate: "2022", description: "A pandemic that causes people to have brief blackouts during which they become extremely violent tears apart a Florida family and reveals their secrets.", series: null, tier: 1, topRank: null },

  // Carrie Ryan (3)
  { title: "The Forest of Hands and Teeth", author: "Carrie Ryan", pageCount: 320, genre: "Young Adult", publicationDate: "2009", description: "Ryan's debut: a teenage girl in a fenced village surrounded by a forest full of infected undead begins to question what her Sisterhood leaders have been hiding from her.", series: { name: "The Forest of Hands and Teeth", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "The Dead-Tossed Waves", author: "Carrie Ryan", pageCount: 416, genre: "Young Adult", publicationDate: "2010", description: "Forest of Hands and Teeth #2: a young woman in a post-zombie coastal settlement discovers her mother was the girl from the original book — and that the infection is changing.", series: { name: "The Forest of Hands and Teeth", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "The Dark and Hollow Places", author: "Carrie Ryan", pageCount: 384, genre: "Young Adult", publicationDate: "2011", description: "Forest of Hands and Teeth #3: the conclusion of Ryan's post-zombie trilogy as the last human settlement falls to the plague and the survivors begin a desperate exodus.", series: { name: "The Forest of Hands and Teeth", order: 3, total: 3 }, tier: 1, topRank: null },

  // Carlton Mellick III (3)
  { title: "The Haunted Vagina", author: "Carlton Mellick III", pageCount: 96, genre: "Horror", publicationDate: "2006", description: "Mellick's cult bizarro novella: a woman's vagina is literally haunted, and her boyfriend must journey into her to confront whatever lives there.", series: null, tier: 1, topRank: null },
  { title: "Satan Burger", author: "Carlton Mellick III", pageCount: 240, genre: "Horror", publicationDate: "2001", description: "Mellick's debut: a group of punks in a dying city get jobs at a fast-food chain owned by Satan — and learn what humanity's last days look like.", series: null, tier: 1, topRank: null },
  { title: "The Baby Jesus Butt Plug", author: "Carlton Mellick III", pageCount: 112, genre: "Horror", publicationDate: "2004", description: "Mellick's satirical bizarro: a corporate drone becomes obsessed with a new consumer product and his office descends into an increasingly literal hell.", series: null, tier: 1, topRank: null },

  // Paul Stewart (3)
  { title: "Beyond the Deepwoods", author: "Paul Stewart", pageCount: 288, genre: "Young Adult", publicationDate: "1998", description: "The first Edge Chronicles: a young orphan raised by woodtrolls sets out into the deep forest of the Edge to find his true parentage — and discovers a world of sky pirates and floating cities.", series: { name: "The Edge Chronicles", order: 1, total: 13 }, tier: 1, topRank: null },
  { title: "Stormchaser", author: "Paul Stewart", pageCount: 320, genre: "Young Adult", publicationDate: "1999", description: "Edge Chronicles #2: Twig, now an apprentice sky pirate, must sail into the heart of a Great Storm to recover a fragment of stormphrax that can save Sanctaphrax.", series: { name: "The Edge Chronicles", order: 2, total: 13 }, tier: 1, topRank: null },
  { title: "Midnight Over Sanctaphrax", author: "Paul Stewart", pageCount: 320, genre: "Young Adult", publicationDate: "2000", description: "Edge Chronicles #3: a Mother Storm is approaching Sanctaphrax, and Twig must find a way to save the floating city before it is ripped from its moorings.", series: { name: "The Edge Chronicles", order: 3, total: 13 }, tier: 1, topRank: null },

  // Jessica Cluess (3)
  { title: "A Shadow Bright and Burning", author: "Jessica Cluess", pageCount: 416, genre: "Young Adult", publicationDate: "2016", description: "The first Kingdom on Fire novel: a Victorian orphan with secret flame magic is recruited into a society of male sorcerers who believe she is the prophesied chosen one.", series: { name: "Kingdom on Fire", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "A Poison Dark and Drowning", author: "Jessica Cluess", pageCount: 464, genre: "Young Adult", publicationDate: "2017", description: "Kingdom on Fire #2: Henrietta Howel and her fellow sorcerers hunt the Ancients across England — and discover the true source of her fire magic.", series: { name: "Kingdom on Fire", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "A Sorrow Fierce and Falling", author: "Jessica Cluess", pageCount: 432, genre: "Young Adult", publicationDate: "2018", description: "Kingdom on Fire #3: the final confrontation with the demonic Ancients as Henrietta and her allies fight to save England and each other.", series: { name: "Kingdom on Fire", order: 3, total: 3 }, tier: 1, topRank: null },

  // Isabel Greenberg (3)
  { title: "The Encyclopedia of Early Earth", author: "Isabel Greenberg", pageCount: 176, genre: "Graphic Novel", publicationDate: "2013", description: "Greenberg's debut: a mythology-textured graphic novel about a storyteller from the North Pole who travels the world trying to find a woman he cannot physically touch.", series: null, tier: 1, topRank: null },
  { title: "The One Hundred Nights of Hero", author: "Isabel Greenberg", pageCount: 224, genre: "Graphic Novel", publicationDate: "2016", description: "A graphic-novel retelling of the Thousand and One Nights, set in Greenberg's Early Earth universe: a woman and her wife tell stories for a hundred nights to survive a wager.", series: null, tier: 1, topRank: null },
  { title: "Glass Town", author: "Isabel Greenberg", pageCount: 224, genre: "Graphic Novel", publicationDate: "2020", description: "Greenberg's graphic-novel imagining of the Brontë siblings' shared imaginary world of Glass Town and the fictional characters who lived inside it.", series: null, tier: 1, topRank: null },

  // James Tynion IV (3)
  { title: "Something Is Killing the Children, Vol. 1", author: "James Tynion IV", pageCount: 128, genre: "Graphic Novel", publicationDate: "2020", description: "Tynion and Werther Dell'Edera's horror comic: in the town of Archer's Peak, children are being killed by monsters only they can see — and a young woman called Erica Slaughter arrives to hunt them.", series: { name: "Something Is Killing the Children", order: 1, total: 7 }, tier: 1, topRank: null },
  { title: "The Department of Truth, Vol. 1", author: "James Tynion IV", pageCount: 144, genre: "Graphic Novel", publicationDate: "2020", description: "Tynion and Martin Simmonds's conspiracy-horror: an FBI agent joins a secret government department responsible for keeping conspiracy theories from becoming true.", series: { name: "The Department of Truth", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "The Nice House on the Lake, Vol. 1", author: "James Tynion IV", pageCount: 168, genre: "Graphic Novel", publicationDate: "2021", description: "Tynion and Álvaro Martínez Bueno's horror comic: ten friends are invited by their mysterious mutual friend Walter to a lake house — and learn the world has ended without them.", series: { name: "The Nice House on the Lake", order: 1, total: 2 }, tier: 1, topRank: null },
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
if (primaryDupes.length > 0) console.log(`⚠ Skipping ${primaryDupes.length} primary duplicates`);
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
if (recDupes.length > 0) console.log(`⚠ Skipping ${recDupes.length} rec library duplicates`);
const nextRec = recBooks.concat(recAdd);
fs.writeFileSync(REC_LIBRARY, JSON.stringify(nextRec));
console.log(`REC LIBRARY: added ${recAdd.length} books, ${beforeR} → ${nextRec.length}`);

const statCat = fs.statSync(CATALOG);
const statRec = fs.statSync(REC_LIBRARY);
console.log(`\nbook-data.json: ${(statCat.size / 1024 / 1024).toFixed(2)} MB`);
console.log(`rec-library.json: ${(statRec.size / 1024).toFixed(1)} KB`);
