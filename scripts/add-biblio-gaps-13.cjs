const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");

const ADDITIONS = [
  // David Brin (1)
  { title: "Heart of the Comet", author: "David Brin", pageCount: 480, genre: "Sci-Fi", publicationDate: "1986", description: "Brin's collaboration with Gregory Benford: a 2061 expedition settles on Halley's Comet for a 76-year return voyage, and the comet itself proves stranger than expected.", series: null, tier: 1, topRank: null },

  // Elizabeth Moon (2)
  { title: "Oath of Fealty", author: "Elizabeth Moon", pageCount: 544, genre: "Fantasy", publicationDate: "2010", description: "The first Paladin's Legacy novel, returning to the world of the Deed of Paksenarrion twenty years later: three former companions — now king, duke, and paladin — face new threats.", series: { name: "Paladin's Legacy", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "Marque and Reprisal", author: "Elizabeth Moon", pageCount: 416, genre: "Sci-Fi", publicationDate: "2004", description: "The second Vatta's War novel: Kylara Vatta, a disgraced naval cadet, becomes the heir to her family's shattered trading empire — and the only Vatta left who can fight back.", series: { name: "Vatta's War", order: 2, total: 5 }, tier: 1, topRank: null },

  // David Weber (4)
  { title: "Echoes of Honor", author: "David Weber", pageCount: 768, genre: "Sci-Fi", publicationDate: "1998", description: "Honor Harrington #8: believed dead by her government, Honor is imprisoned in the maximum-security Hades system — and plans an impossible escape with thousands of fellow prisoners.", series: { name: "Honor Harrington", order: 8, total: 14 }, tier: 1, topRank: null },
  { title: "War of Honor", author: "David Weber", pageCount: 864, genre: "Sci-Fi", publicationDate: "2002", description: "Honor Harrington #10: with new political leadership in Manticore, Honor is sent into an increasingly hostile diplomatic situation as the Peeps rearm for another war.", series: { name: "Honor Harrington", order: 10, total: 14 }, tier: 1, topRank: null },
  { title: "At All Costs", author: "David Weber", pageCount: 880, genre: "Sci-Fi", publicationDate: "2005", description: "Honor Harrington #11: facing a renewed assault from Haven, Manticore hands Honor command of an Eighth Fleet designed to strike directly at the heart of the enemy.", series: { name: "Honor Harrington", order: 11, total: 14 }, tier: 1, topRank: null },
  { title: "Mission of Honor", author: "David Weber", pageCount: 592, genre: "Sci-Fi", publicationDate: "2010", description: "Honor Harrington #12: a shadowy conspiracy called the Mesan Alignment emerges as the true enemy behind the Haven wars, and Honor must organize a new alliance against them.", series: { name: "Honor Harrington", order: 12, total: 14 }, tier: 1, topRank: null },

  // David Drake (4)
  { title: "Hammer's Slammers", author: "David Drake", pageCount: 288, genre: "Sci-Fi", publicationDate: "1979", description: "Drake's Vietnam-haunted military SF: Colonel Alois Hammer's mercenary armor regiment fights on backwater worlds where the politics rarely make sense and the casualties always do.", series: null, tier: 1, topRank: null },
  { title: "The Forlorn Hope", author: "David Drake", pageCount: 320, genre: "Sci-Fi", publicationDate: "1984", description: "A company of mercenaries on the losing side of a colonial war must escort their employer's family across hostile territory — Drake's tight military-SF standalone.", series: null, tier: 1, topRank: null },
  { title: "Lord of the Isles", author: "David Drake", pageCount: 432, genre: "Fantasy", publicationDate: "1997", description: "The first of Drake's nine-book epic fantasy series: a young shepherd and his sister are drawn into an apocalyptic conflict as an ancient magical wheel begins another cycle.", series: { name: "Lord of the Isles", order: 1, total: 9 }, tier: 1, topRank: null },
  { title: "With the Lightnings", author: "David Drake", pageCount: 384, genre: "Sci-Fi", publicationDate: "1998", description: "The first RCN novel: a Republic of Cinnabar naval lieutenant and a librarian daughter of noble house become an unlikely partnership as war breaks out.", series: { name: "Republic of Cinnabar Navy", order: 1, total: 13 }, tier: 1, topRank: null },

  // Walter Jon Williams (3)
  { title: "Metropolitan", author: "Walter Jon Williams", pageCount: 400, genre: "Fantasy", publicationDate: "1995", description: "In a city that has grown to cover the entire world and whose magic comes from the pipes of its infrastructure, a low-level bureaucrat accidentally taps into unlimited power.", series: null, tier: 1, topRank: null },
  { title: "The Praxis", author: "Walter Jon Williams", pageCount: 432, genre: "Sci-Fi", publicationDate: "2002", description: "The first Dread Empire's Fall novel: as the millennium-long reign of the alien Shaa comes to an end, the subject species of the empire begin a war over the power vacuum.", series: { name: "Dread Empire's Fall", order: 1, total: 6 }, tier: 1, topRank: null },
  { title: "Voice of the Whirlwind", author: "Walter Jon Williams", pageCount: 288, genre: "Sci-Fi", publicationDate: "1987", description: "A corporate mercenary's clone wakes up to discover his original was killed fifteen years earlier — and his original's enemies are still watching.", series: null, tier: 1, topRank: null },

  // Bruce Sterling (3)
  { title: "The Hacker Crackdown", author: "Bruce Sterling", pageCount: 352, genre: "Non-Fiction", publicationDate: "1992", description: "Sterling's reportage on the 1990 federal raids against early computer hackers — the book that documented the first generation of US cybercrime law.", series: null, tier: 1, topRank: null },
  { title: "Zeitgeist", author: "Bruce Sterling", pageCount: 320, genre: "Fiction", publicationDate: "2000", description: "A globe-trotting pop-music impresario markets a fake Turkish girl band to the millennial audience and is pursued by the woman he might have loved and the son he might have had.", series: null, tier: 1, topRank: null },
  { title: "The Caryatids", author: "Bruce Sterling", pageCount: 304, genre: "Sci-Fi", publicationDate: "2009", description: "In a mid-21st-century world rebuilding after climate catastrophe, three surviving cloned sisters take different sides in the political order their mother helped create.", series: null, tier: 1, topRank: null },

  // Laurell K. Hamilton (6)
  { title: "The Killing Dance", author: "Laurell K. Hamilton", pageCount: 416, genre: "Fantasy", publicationDate: "1997", description: "Anita Blake #6: an assassin has been hired to kill Anita, and the only person who knows the killer's identity is Master of the City Jean-Claude — who wants her in exchange.", series: { name: "Anita Blake", order: 6, total: 28 }, tier: 1, topRank: null },
  { title: "Burnt Offerings", author: "Laurell K. Hamilton", pageCount: 416, genre: "Fantasy", publicationDate: "1998", description: "Anita Blake #7: a serial arsonist is targeting vampire-owned properties in St. Louis, and ancient master vampires begin arriving in the city to answer the challenge.", series: { name: "Anita Blake", order: 7, total: 28 }, tier: 1, topRank: null },
  { title: "Blue Moon", author: "Laurell K. Hamilton", pageCount: 448, genre: "Fantasy", publicationDate: "1998", description: "Anita Blake #8: Richard Zeeman, Anita's werewolf ex, is in jail in rural Tennessee on a trumped-up rape charge, and Anita has to get him out before the full moon.", series: { name: "Anita Blake", order: 8, total: 28 }, tier: 1, topRank: null },
  { title: "Obsidian Butterfly", author: "Laurell K. Hamilton", pageCount: 480, genre: "Fantasy", publicationDate: "2000", description: "Anita Blake #9: Edward, the assassin 'Death,' calls in his favor and Anita travels to New Mexico to help him hunt something that is skinning its victims alive.", series: { name: "Anita Blake", order: 9, total: 28 }, tier: 1, topRank: null },
  { title: "Narcissus in Chains", author: "Laurell K. Hamilton", pageCount: 672, genre: "Fantasy", publicationDate: "2001", description: "Anita Blake #10: Anita returns from six months away to find Richard's wolf pack in turmoil and Jean-Claude's vampires being targeted by an ancient hunter.", series: { name: "Anita Blake", order: 10, total: 28 }, tier: 1, topRank: null },
  { title: "Cerulean Sins", author: "Laurell K. Hamilton", pageCount: 496, genre: "Fantasy", publicationDate: "2003", description: "Anita Blake #11: Jean-Claude's sire Belle Morte sends her envoy Musette to St. Louis, and the ancient politics of the vampire world arrive at Anita's door.", series: { name: "Anita Blake", order: 11, total: 28 }, tier: 1, topRank: null },

  // Charlaine Harris (6)
  { title: "Definitely Dead", author: "Charlaine Harris", pageCount: 336, genre: "Fantasy", publicationDate: "2006", description: "Sookie Stackhouse #6: Sookie flies to New Orleans to settle her dead cousin Hadley's affairs and discovers Hadley was the vampire Queen of Louisiana's lover.", series: { name: "Sookie Stackhouse", order: 6, total: 13 }, tier: 1, topRank: null },
  { title: "All Together Dead", author: "Charlaine Harris", pageCount: 336, genre: "Fantasy", publicationDate: "2007", description: "Sookie Stackhouse #7: Sookie attends the vampire summit in Rhodes, where the Queen of Louisiana faces a tribunal — and a terrorist attack is being planned.", series: { name: "Sookie Stackhouse", order: 7, total: 13 }, tier: 1, topRank: null },
  { title: "From Dead to Worse", author: "Charlaine Harris", pageCount: 368, genre: "Fantasy", publicationDate: "2008", description: "Sookie Stackhouse #8: with Katrina's aftermath and the Rhodes summit still rippling through the supernatural world, Sookie discovers a truth about her own ancestry.", series: { name: "Sookie Stackhouse", order: 8, total: 13 }, tier: 1, topRank: null },
  { title: "Dead and Gone", author: "Charlaine Harris", pageCount: 336, genre: "Fantasy", publicationDate: "2009", description: "Sookie Stackhouse #9: a werewolf is crucified in Bon Temps just days after supernaturals reveal themselves to the world, and Sookie's fairy relatives arrive bringing war.", series: { name: "Sookie Stackhouse", order: 9, total: 13 }, tier: 1, topRank: null },
  { title: "Dead in the Family", author: "Charlaine Harris", pageCount: 320, genre: "Fantasy", publicationDate: "2010", description: "Sookie Stackhouse #10: Sookie recovers from the fairy war while Eric's vampire maker arrives in Louisiana with his mad Russian child in tow.", series: { name: "Sookie Stackhouse", order: 10, total: 13 }, tier: 1, topRank: null },
  { title: "Dead Reckoning", author: "Charlaine Harris", pageCount: 336, genre: "Fantasy", publicationDate: "2011", description: "Sookie Stackhouse #11: Sookie investigates a firebombing at Merlotte's and her growing entanglement in vampire politics draws her inexorably toward the end of the series.", series: { name: "Sookie Stackhouse", order: 11, total: 13 }, tier: 1, topRank: null },

  // Kelley Armstrong (3)
  { title: "The Summoning", author: "Kelley Armstrong", pageCount: 400, genre: "Young Adult", publicationDate: "2008", description: "The first Darkest Powers novel: a fifteen-year-old girl begins seeing ghosts and is sent to a group home for troubled teens — where the other residents all have supernatural gifts.", series: { name: "Darkest Powers", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "No Humans Involved", author: "Kelley Armstrong", pageCount: 432, genre: "Fantasy", publicationDate: "2007", description: "Otherworld #7: celebrity necromancer Jaime Vegas takes a reality-TV gig and discovers the ghosts of murdered children on the hotel grounds.", series: { name: "Otherworld", order: 7, total: 13 }, tier: 1, topRank: null },
  { title: "Personal Demon", author: "Kelley Armstrong", pageCount: 400, genre: "Fantasy", publicationDate: "2008", description: "Otherworld #8: half-demon tabloid journalist Hope Adams infiltrates a Miami supernatural gang at the behest of the Cabal sorcerers, and nothing is what it seems.", series: { name: "Otherworld", order: 8, total: 13 }, tier: 1, topRank: null },

  // Piers Anthony (5)
  { title: "A Spell for Chameleon", author: "Piers Anthony", pageCount: 352, genre: "Fantasy", publicationDate: "1977", description: "The first Xanth novel: a young man in a land where everyone has a magical talent is about to be exiled for apparently having none — and has to figure out what his is.", series: { name: "Xanth", order: 1, total: 47 }, tier: 1, topRank: null },
  { title: "The Source of Magic", author: "Piers Anthony", pageCount: 320, genre: "Fantasy", publicationDate: "1979", description: "Xanth #2: the new King Trent sends Bink on a quest to find the source of magic itself — a journey that will reshape the kingdom.", series: { name: "Xanth", order: 2, total: 47 }, tier: 1, topRank: null },
  { title: "Castle Roogna", author: "Piers Anthony", pageCount: 352, genre: "Fantasy", publicationDate: "1979", description: "Xanth #3: Bink's son Dor travels 800 years into Xanth's past to retrieve a zombie specialist for a dying king — and becomes entangled in the founding of Castle Roogna.", series: { name: "Xanth", order: 3, total: 47 }, tier: 1, topRank: null },
  { title: "On a Pale Horse", author: "Piers Anthony", pageCount: 304, genre: "Fantasy", publicationDate: "1983", description: "The first Incarnations of Immortality: a despondent man accidentally kills Death and is drafted into the office himself, becoming the newest Grim Reaper.", series: { name: "Incarnations of Immortality", order: 1, total: 8 }, tier: 1, topRank: null },
  { title: "Macroscope", author: "Piers Anthony", pageCount: 480, genre: "Sci-Fi", publicationDate: "1969", description: "Anthony's most ambitious early novel: scientists using a macroscope to observe the galaxy discover a transmission from another civilization — and a mind-breaking defensive signal.", series: null, tier: 1, topRank: null },

  // Alan Dean Foster (5)
  { title: "The Tar-Aiym Krang", author: "Alan Dean Foster", pageCount: 208, genre: "Sci-Fi", publicationDate: "1972", description: "The first Pip & Flinx novel: a teenage orphan on the planet Moth and his flying mini-dragon stumble onto an ancient alien artifact hunted by nearly everyone.", series: { name: "Pip & Flinx", order: 1, total: 14 }, tier: 1, topRank: null },
  { title: "Orphan Star", author: "Alan Dean Foster", pageCount: 256, genre: "Sci-Fi", publicationDate: "1977", description: "Pip & Flinx #2: Flinx's search for his origins leads him into a confrontation with shadowy forces who know more about his genetic makeup than he does.", series: { name: "Pip & Flinx", order: 2, total: 14 }, tier: 1, topRank: null },
  { title: "Icerigger", author: "Alan Dean Foster", pageCount: 304, genre: "Sci-Fi", publicationDate: "1974", description: "A group of humans stranded on a frozen world is adopted by the native Tran — icepack-dwelling catlike beings — and begins a long overland journey to the nearest colony.", series: null, tier: 1, topRank: null },
  { title: "Midworld", author: "Alan Dean Foster", pageCount: 224, genre: "Sci-Fi", publicationDate: "1975", description: "On a planet whose forests rise five hundred meters from the ground, a tribal society lives in the canopy and must confront offworld exploiters who want to cut it down.", series: null, tier: 1, topRank: null },
  { title: "Spellsinger", author: "Alan Dean Foster", pageCount: 288, genre: "Fantasy", publicationDate: "1983", description: "A graduate student pulled into a magical world of talking animals discovers that his guitar and his memory of classic rock songs are a powerful form of battle magic.", series: { name: "Spellsinger", order: 1, total: 8 }, tier: 1, topRank: null },

  // Sergey Lukyanenko (4)
  { title: "Night Watch", author: "Sergey Lukyanenko", pageCount: 480, genre: "Fantasy", publicationDate: "1998", description: "In a contemporary Moscow populated by Others — vampires, witches, shape-shifters — two ancient factions enforce an uneasy truce between Light and Dark.", series: { name: "Night Watch", order: 1, total: 6 }, tier: 1, topRank: null },
  { title: "Day Watch", author: "Sergey Lukyanenko", pageCount: 512, genre: "Fantasy", publicationDate: "2000", description: "Night Watch #2: told from the perspective of the Dark Others, three linked stories reveal how the Day Watch of Moscow conducts its own side of the ancient conflict.", series: { name: "Night Watch", order: 2, total: 6 }, tier: 1, topRank: null },
  { title: "Twilight Watch", author: "Sergey Lukyanenko", pageCount: 448, genre: "Fantasy", publicationDate: "2003", description: "Night Watch #3: Anton Gorodetsky investigates a threat to the treaty itself — someone is trying to re-create the ancient spell that can turn a normal human into an Other.", series: { name: "Night Watch", order: 3, total: 6 }, tier: 1, topRank: null },
  { title: "The Last Watch", author: "Sergey Lukyanenko", pageCount: 400, genre: "Fantasy", publicationDate: "2005", description: "Night Watch #4: an Edinburgh murder draws Anton into an investigation involving artifacts from the mythical Merlin and the secret Sixth Watch that knows the truth.", series: { name: "Night Watch", order: 4, total: 6 }, tier: 1, topRank: null },

  // Andrzej Sapkowski (3)
  { title: "The Tower of Fools", author: "Andrzej Sapkowski", pageCount: 576, genre: "Historical Fiction", publicationDate: "2002", description: "The first Hussite Trilogy novel: in 15th-century Silesia at the height of the Hussite Wars, a young nobleman caught in adultery is imprisoned and swept into the religious war.", series: { name: "Hussite Trilogy", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Warriors of God", author: "Andrzej Sapkowski", pageCount: 576, genre: "Historical Fiction", publicationDate: "2004", description: "Hussite Trilogy #2: Reynevan continues his adventures through the Hussite Wars, crossing Bohemia, Silesia, and the Czech Lands as the religious conflict deepens.", series: { name: "Hussite Trilogy", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Light Perpetual", author: "Andrzej Sapkowski", pageCount: 544, genre: "Historical Fiction", publicationDate: "2006", description: "Hussite Trilogy #3: Reynevan confronts the end of the Hussite Wars and the final reckoning with the enemies who have pursued him across the conflict.", series: { name: "Hussite Trilogy", order: 3, total: 3 }, tier: 1, topRank: null },

  // David Lindsay (1)
  { title: "A Voyage to Arcturus", author: "David Lindsay", pageCount: 304, genre: "Fantasy", publicationDate: "1920", description: "Lindsay's one great novel: a man travels to the double-star system of Arcturus and journeys across a planet of shifting physical and philosophical landscapes — a major influence on C.S. Lewis and Harold Bloom.", series: null, tier: 1, topRank: null },

  // Hope Mirrlees (1)
  { title: "Lud-in-the-Mist", author: "Hope Mirrlees", pageCount: 288, genre: "Fantasy", publicationDate: "1926", description: "A quiet English country town bordering Fairyland begins receiving shipments of contraband fairy fruit — Mirrlees's only fantasy novel and a touchstone of the genre.", series: null, tier: 1, topRank: null },

  // George MacDonald (4)
  { title: "Phantastes", author: "George MacDonald", pageCount: 256, genre: "Fantasy", publicationDate: "1858", description: "MacDonald's first fantasy, the book C.S. Lewis said 'baptized' his imagination: a young man enters Fairy Land and travels through dreams, libraries, and shadows.", series: null, tier: 1, topRank: null },
  { title: "Lilith", author: "George MacDonald", pageCount: 240, genre: "Fantasy", publicationDate: "1895", description: "MacDonald's final fantasy: a man passes through a mirror in his library into a world presided over by Adam, Eve, and the vampiric first wife Lilith.", series: null, tier: 1, topRank: null },
  { title: "The Princess and the Goblin", author: "George MacDonald", pageCount: 224, genre: "Fantasy", publicationDate: "1872", description: "A princess whose castle is threatened by goblins beneath the mountain is protected by her magical great-great-grandmother and befriended by a miner's son — one of the founding children's fantasies.", series: null, tier: 1, topRank: null },
  { title: "At the Back of the North Wind", author: "George MacDonald", pageCount: 352, genre: "Fantasy", publicationDate: "1871", description: "MacDonald's lyrical children's novel: a poor London cabman's son named Diamond is carried away nightly by the North Wind — personified as a mysterious woman of great power.", series: null, tier: 1, topRank: null },

  // Ken MacLeod (3)
  { title: "The Cassini Division", author: "Ken MacLeod", pageCount: 256, genre: "Sci-Fi", publicationDate: "1998", description: "The third Fall Revolution novel: a fierce anti-capitalist commander in a post-scarcity socialist solar system must confront the post-humans of the Jovian clouds.", series: { name: "Fall Revolution", order: 3, total: 4 }, tier: 1, topRank: null },
  { title: "The Sky Road", author: "Ken MacLeod", pageCount: 288, genre: "Sci-Fi", publicationDate: "1999", description: "Fall Revolution #4: two timelines — one a far-future agricultural Scotland rebuilding space travel, the other the 2059 founding of the Green movement — converge.", series: { name: "Fall Revolution", order: 4, total: 4 }, tier: 1, topRank: null },
  { title: "Learning the World", author: "Ken MacLeod", pageCount: 304, genre: "Sci-Fi", publicationDate: "2005", description: "A fourteen-thousand-year-old human colony ship approaches a star system and discovers, for the first time, that the solar system contains another sapient species.", series: null, tier: 1, topRank: null },

  // China Miéville (2)
  { title: "King Rat", author: "China Miéville", pageCount: 336, genre: "Fantasy", publicationDate: "1998", description: "Miéville's debut: a London DJ accused of his father's murder is broken out of jail by a mysterious figure who calls himself King Rat — ruler of the city's rodents.", series: null, tier: 1, topRank: null },
  { title: "Railsea", author: "China Miéville", pageCount: 432, genre: "Fantasy", publicationDate: "2012", description: "A post-apocalyptic Moby-Dick retelling: in a world where steam trains hunt giant moles across an endless rail-crossed 'railsea,' a young rail-orphan signs on to a hunt.", series: null, tier: 1, topRank: null },

  // Kameron Hurley (3)
  { title: "The Mirror Empire", author: "Kameron Hurley", pageCount: 544, genre: "Fantasy", publicationDate: "2014", description: "The first Worldbreaker Saga novel: on a world where a distant star's approach ignites a magical ecology, an invasion from a parallel world begins to wipe out its doppelgangers.", series: { name: "Worldbreaker Saga", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Empire Ascendant", author: "Kameron Hurley", pageCount: 464, genre: "Fantasy", publicationDate: "2015", description: "Worldbreaker Saga #2: Lilia tries to build an army to stop the invasion while the invading Dhai's armies push deeper into the territory of the Saiduan.", series: { name: "Worldbreaker Saga", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "The Broken Heavens", author: "Kameron Hurley", pageCount: 480, genre: "Fantasy", publicationDate: "2019", description: "Worldbreaker Saga #3: the end of Hurley's dark epic — the two worlds must be sorted out before the collapsing stars destroy both.", series: { name: "Worldbreaker Saga", order: 3, total: 3 }, tier: 1, topRank: null },

  // Nancy Kress (3)
  { title: "Probability Sun", author: "Nancy Kress", pageCount: 384, genre: "Sci-Fi", publicationDate: "2001", description: "Probability Trilogy #2: a multi-species expedition to the 'probability' artifact at the core of a dying star turns political as human factions struggle for its control.", series: { name: "Probability Trilogy", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Probability Space", author: "Nancy Kress", pageCount: 384, genre: "Sci-Fi", publicationDate: "2002", description: "Probability Trilogy #3: the full nature of the probability artifact and the war with the alien Fallers converge in the conclusion of Kress's hard-SF trilogy.", series: { name: "Probability Trilogy", order: 3, total: 3 }, tier: 1, topRank: null },
  { title: "Tomorrow's Kin", author: "Nancy Kress", pageCount: 352, genre: "Sci-Fi", publicationDate: "2017", description: "Kress's expansion of her Nebula-winning novella Yesterday's Kin: a geneticist discovers the alien visitors to Earth share human DNA — and what follows fractures her family.", series: { name: "Yesterday's Kin", order: 1, total: 3 }, tier: 1, topRank: null },

  // Lois Lowry (1)
  { title: "A Summer to Die", author: "Lois Lowry", pageCount: 176, genre: "Young Adult", publicationDate: "1977", description: "Lowry's first novel: a thirteen-year-old girl must watch her older sister decline through a fatal illness during a single summer in the country.", series: null, tier: 1, topRank: null },

  // James Dashner (2)
  { title: "The Kill Order", author: "James Dashner", pageCount: 336, genre: "Young Adult", publicationDate: "2012", description: "The first Maze Runner prequel: during the solar flares and the release of the Flare virus, a small group of immune survivors is caught between WICKED's agents and the infected.", series: { name: "The Maze Runner", order: 4, total: 5 }, tier: 1, topRank: null },
  { title: "The Fever Code", author: "James Dashner", pageCount: 352, genre: "Young Adult", publicationDate: "2016", description: "The second Maze Runner prequel, returning to Thomas's childhood at WICKED and chronicling the creation of the Maze and the subjects who would run it.", series: { name: "The Maze Runner", order: 5, total: 5 }, tier: 1, topRank: null },

  // Suzanne Collins (5)
  { title: "Gregor the Overlander", author: "Suzanne Collins", pageCount: 320, genre: "Young Adult", publicationDate: "2003", description: "The first Underland Chronicles: an eleven-year-old boy and his baby sister fall through a vent in their Manhattan laundry room into a world of giant rats, bats, and talking cockroaches.", series: { name: "Underland Chronicles", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "Gregor and the Prophecy of Bane", author: "Suzanne Collins", pageCount: 336, genre: "Young Adult", publicationDate: "2004", description: "Underland Chronicles #2: Gregor returns to the Underland to fulfill a new prophecy — one that says he must kill a giant white rat to save his baby sister.", series: { name: "Underland Chronicles", order: 2, total: 5 }, tier: 1, topRank: null },
  { title: "Gregor and the Curse of the Warmbloods", author: "Suzanne Collins", pageCount: 368, genre: "Young Adult", publicationDate: "2005", description: "Underland Chronicles #3: a plague sweeps the Underland, and Gregor must find the cure before it reaches his own mother in New York.", series: { name: "Underland Chronicles", order: 3, total: 5 }, tier: 1, topRank: null },
  { title: "Gregor and the Marks of Secret", author: "Suzanne Collins", pageCount: 352, genre: "Young Adult", publicationDate: "2006", description: "Underland Chronicles #4: Gregor and his sister return to discover that the rats are systematically exterminating the mice — and that a final war is approaching.", series: { name: "Underland Chronicles", order: 4, total: 5 }, tier: 1, topRank: null },
  { title: "Gregor and the Code of Claw", author: "Suzanne Collins", pageCount: 432, genre: "Young Adult", publicationDate: "2007", description: "Underland Chronicles #5: the final prophecy is fulfilled as war consumes the Underland and Gregor faces his destiny.", series: { name: "Underland Chronicles", order: 5, total: 5 }, tier: 1, topRank: null },

  // Veronica Roth (1)
  { title: "Four", author: "Veronica Roth", pageCount: 304, genre: "Young Adult", publicationDate: "2014", description: "Four short stories retelling key moments from the Divergent trilogy from Tobias 'Four' Eaton's point of view — Roth's Divergent companion volume.", series: null, tier: 1, topRank: null },

  // Stephen R. Donaldson (5)
  { title: "The Real Story", author: "Stephen R. Donaldson", pageCount: 288, genre: "Sci-Fi", publicationDate: "1991", description: "The first Gap Cycle novel: a brutal retelling of Wagner's Ring cycle in space — a woman is tormented by a pirate, rescued by a worse man, and the universe begins to close around them.", series: { name: "The Gap Cycle", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "Forbidden Knowledge", author: "Stephen R. Donaldson", pageCount: 528, genre: "Sci-Fi", publicationDate: "1991", description: "The Gap Cycle #2: Morn Hyland's captor takes her deeper into forbidden space while a conspiracy at the top of the Police Department begins to unfold.", series: { name: "The Gap Cycle", order: 2, total: 5 }, tier: 1, topRank: null },
  { title: "A Dark and Hungry God Arises", author: "Stephen R. Donaldson", pageCount: 656, genre: "Sci-Fi", publicationDate: "1992", description: "The Gap Cycle #3: an alien civilization's envoy arrives in human space as the three main characters converge — and begin to realize they are being used as pieces in a larger game.", series: { name: "The Gap Cycle", order: 3, total: 5 }, tier: 1, topRank: null },
  { title: "Chaos and Order", author: "Stephen R. Donaldson", pageCount: 672, genre: "Sci-Fi", publicationDate: "1994", description: "The Gap Cycle #4: the conflict between Nick Succorso and Angus Thermopyle becomes the center of a much larger cosmic crisis.", series: { name: "The Gap Cycle", order: 4, total: 5 }, tier: 1, topRank: null },
  { title: "This Day All Gods Die", author: "Stephen R. Donaldson", pageCount: 704, genre: "Sci-Fi", publicationDate: "1996", description: "The Gap Cycle #5: the final reckoning for Donaldson's Ring-cycle space opera — human and alien civilizations confront each other as the original schemes collapse.", series: { name: "The Gap Cycle", order: 5, total: 5 }, tier: 1, topRank: null },

  // Margaret Weis (5)
  { title: "Dragons of Summer Flame", author: "Margaret Weis", pageCount: 624, genre: "Fantasy", publicationDate: "1995", description: "Weis and Hickman's return to Krynn after the Chronicles and Legends: a second Cataclysm, the Chaos War, and the final battle of the gods.", series: null, tier: 1, topRank: null },
  { title: "Dragons of the Hourglass Mage", author: "Margaret Weis", pageCount: 384, genre: "Fantasy", publicationDate: "2009", description: "Lost Chronicles #3: the untold story of Raistlin Majere's year in Neraka during the War of the Lance — Weis and Hickman's return to the original trilogy era.", series: { name: "Dragonlance: The Lost Chronicles", order: 3, total: 3 }, tier: 1, topRank: null },
  { title: "Dragons of the Dwarven Depths", author: "Margaret Weis", pageCount: 400, genre: "Fantasy", publicationDate: "2006", description: "Lost Chronicles #1: the untold story of the Heroes of the Lance's winter in Thorbardin between Dragons of Autumn Twilight and Dragons of Winter Night.", series: { name: "Dragonlance: The Lost Chronicles", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Dragons of the Highlord Skies", author: "Margaret Weis", pageCount: 400, genre: "Fantasy", publicationDate: "2007", description: "Lost Chronicles #2: the untold story of Laurana's mission to Icewall Glacier to recover the dragon orb — filling the gap between Winter Night and Spring Dawning.", series: { name: "Dragonlance: The Lost Chronicles", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "The Serpent Mage", author: "Margaret Weis", pageCount: 416, genre: "Fantasy", publicationDate: "1992", description: "The Death Gate Cycle #4: Haplo and Alfred reach Chelestra, the realm of water, where the ancient serpent enemies of both Sartan and Patryns finally emerge.", series: { name: "The Death Gate Cycle", order: 4, total: 7 }, tier: 1, topRank: null },
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
