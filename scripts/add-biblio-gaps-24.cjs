const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

// ── PRIMARY (existing authors) ────────────────────────────────────────────
const PRIMARY_ADDITIONS = [
  // Junji Ito (3)
  { title: "Remina", author: "Junji Ito", pageCount: 248, genre: "Graphic Novel", publicationDate: "2005", description: "Ito's cosmic horror manga: a teenage girl named after a newly discovered planet becomes humanity's scapegoat when that planet begins consuming the solar system.", series: null, tier: 1, topRank: null },
  { title: "Fragments of Horror", author: "Junji Ito", pageCount: 224, genre: "Graphic Novel", publicationDate: "2014", description: "Ito's eight-story manga collection: quiet suburban horrors including 'Tomb Town,' 'Glyceride,' and 'Dissection-chan.'", series: null, tier: 1, topRank: null },
  { title: "Shiver", author: "Junji Ito", pageCount: 408, genre: "Graphic Novel", publicationDate: "2015", description: "Ito's self-selected best-of: nine of his most iconic short horror manga including 'The Enigma of Amigara Fault' and 'Hanging Balloons.'", series: null, tier: 1, topRank: null },

  // Jack Ketchum (2)
  { title: "The Lost", author: "Jack Ketchum", pageCount: 368, genre: "Horror", publicationDate: "2001", description: "Four years after a teenage boy murders two women at a campsite, the secrets he shares with his friends begin to unravel — and the original bloodshed finds its next target.", series: null, tier: 1, topRank: null },
  { title: "Cover", author: "Jack Ketchum", pageCount: 272, genre: "Horror", publicationDate: "1987", description: "A Vietnam veteran growing marijuana in a remote mountain forest is discovered by a weekend hiking group — and his paranoid delusions turn the encounter into a massacre.", series: null, tier: 1, topRank: null },

  // Brian Keene (2)
  { title: "Dark Hollow", author: "Brian Keene", pageCount: 368, genre: "Horror", publicationDate: "2006", description: "A small Pennsylvania town's women are drawn to the woods — and to a strange horned figure waiting there — as the men left behind try to figure out what to do.", series: null, tier: 1, topRank: null },
  { title: "Urban Gothic", author: "Brian Keene", pageCount: 288, genre: "Horror", publicationDate: "2009", description: "Six white teenagers get lost in a rough Philadelphia neighborhood and take refuge in an old boarded-up house — which turns out to be the wrong decision.", series: null, tier: 1, topRank: null },

  // Tade Thompson (2)
  { title: "Making Wolf", author: "Tade Thompson", pageCount: 224, genre: "Thriller", publicationDate: "2015", description: "A London supermarket loss-prevention officer returns to his West African homeland for a funeral and is mistaken for an expert investigator — and pressed into solving a political murder.", series: null, tier: 1, topRank: null },
  { title: "Lost Tales", author: "Tade Thompson", pageCount: 240, genre: "Sci-Fi", publicationDate: "2019", description: "Thompson's story collection: Nigerian SF and horror drawing on Yoruba folklore, Lagos street life, and the edges of colonialism.", series: null, tier: 1, topRank: null },

  // Sue Burke (2)
  { title: "Usurpation", author: "Sue Burke", pageCount: 400, genre: "Sci-Fi", publicationDate: "2024", description: "The third Semiosis novel: the intelligent plant Stevland continues to negotiate humanity's future on Pax as new colonists from Earth arrive.", series: { name: "Semiosis", order: 3, total: 3 }, tier: 1, topRank: null },
  { title: "Immunity Index", author: "Sue Burke", pageCount: 320, genre: "Sci-Fi", publicationDate: "2021", description: "Burke's near-future novel: in a near-future US ruled by a quasi-fascist president, three young women with secret genetic modifications face a new pandemic.", series: null, tier: 1, topRank: null },

  // Simon Jimenez (1)
  { title: "The Vanished Birds", author: "Simon Jimenez", pageCount: 416, genre: "Sci-Fi", publicationDate: "2020", description: "Jimenez's debut: a starship captain who ages slowly raises a mute boy whose mysterious origins and even more mysterious abilities may change interstellar civilization.", series: null, tier: 1, topRank: null },

  // Sebastien de Castell (3)
  { title: "Spellslinger", author: "Sebastien de Castell", pageCount: 400, genre: "Young Adult", publicationDate: "2017", description: "The first Spellslinger novel: a mage-in-training whose magic is failing is forced to flee his family and team up with a traveling con artist and her squirrel cat.", series: { name: "Spellslinger", order: 1, total: 6 }, tier: 1, topRank: null },
  { title: "Shadowblack", author: "Sebastien de Castell", pageCount: 384, genre: "Young Adult", publicationDate: "2017", description: "Spellslinger #2: Kellen continues his journey with Ferius Parfax and discovers more about the mysterious 'shadowblack' curse spreading across his eye.", series: { name: "Spellslinger", order: 2, total: 6 }, tier: 1, topRank: null },
  { title: "Charmcaster", author: "Sebastien de Castell", pageCount: 384, genre: "Young Adult", publicationDate: "2018", description: "Spellslinger #3: Kellen takes a job as a court magician at a prestigious academy — and discovers the school's secret darker than anyone expected.", series: { name: "Spellslinger", order: 3, total: 6 }, tier: 1, topRank: null },

  // Mary Stewart (2)
  { title: "This Rough Magic", author: "Mary Stewart", pageCount: 320, genre: "Fiction", publicationDate: "1964", description: "A young English actress visits her sister on the Greek island of Corfu and stumbles into a mystery involving smugglers, political refugees, and a dolphin.", series: null, tier: 1, topRank: null },
  { title: "Thornyhold", author: "Mary Stewart", pageCount: 272, genre: "Fantasy", publicationDate: "1988", description: "A young woman inherits a cottage in the English West Country from a cousin who may have been a witch — and begins to discover her own unexpected abilities.", series: null, tier: 1, topRank: null },

  // Kiera Cass (2)
  { title: "The Betrothed", author: "Kiera Cass", pageCount: 320, genre: "Young Adult", publicationDate: "2020", description: "A young noblewoman becomes the favored choice to be queen — but an escape to see her childhood friend reveals there may be a better life waiting outside the palace.", series: { name: "The Betrothed", order: 1, total: 2 }, tier: 1, topRank: null },
  { title: "A Thousand Heartbeats", author: "Kiera Cass", pageCount: 336, genre: "Young Adult", publicationDate: "2022", description: "Cass's standalone romance: a princess preparing for an arranged marriage meets a mysterious young man at a ball whose presence at court could destroy them both.", series: null, tier: 1, topRank: null },

  // Marie Lu (2)
  { title: "The Young Elites", author: "Marie Lu", pageCount: 368, genre: "Young Adult", publicationDate: "2014", description: "The first Young Elites novel: a survivor of a blood fever left with unique dark powers joins a secret society of the magically marked — the first YA fantasy about a villain's origin.", series: { name: "The Young Elites", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Skyhunter", author: "Marie Lu", pageCount: 384, genre: "Young Adult", publicationDate: "2020", description: "The first Skyhunter novel: a war refugee joins an elite squad of hybrid soldiers fighting a ghost-creating army on the border of a collapsing federation.", series: { name: "Skyhunter", order: 1, total: 2 }, tier: 1, topRank: null },

  // Kate Atkinson (2)
  { title: "Death at the Sign of the Rook", author: "Kate Atkinson", pageCount: 352, genre: "Mystery", publicationDate: "2024", description: "The sixth Jackson Brodie novel: the retired private investigator is drawn into a rural Yorkshire art-theft case that turns into a snowbound country-house murder mystery.", series: { name: "Jackson Brodie", order: 6, total: 6 }, tier: 1, topRank: null },
  { title: "Normal Rules Don't Apply", author: "Kate Atkinson", pageCount: 240, genre: "Fiction", publicationDate: "2023", description: "Atkinson's first story collection: eleven linked tales of odd coincidences, near-mystical encounters, and the uncanny seams in apparently ordinary life.", series: null, tier: 1, topRank: null },
];

// ── REC LIBRARY (new authors) ────────────────────────────────────────────
const REC_LIBRARY_ADDITIONS = [
  // K.W. Jeter (4)
  { title: "Morlock Night", author: "K.W. Jeter", pageCount: 272, genre: "Sci-Fi", publicationDate: "1979", description: "Jeter's cult novel that coined the term 'steampunk' in a letter to Locus a decade later: a direct sequel to H.G. Wells's Time Machine in which the Morlocks invade Victorian London.", series: null, tier: 1, topRank: null },
  { title: "Infernal Devices", author: "K.W. Jeter", pageCount: 336, genre: "Sci-Fi", publicationDate: "1987", description: "Jeter's steampunk classic: a Victorian clockmaker inherits his father's mysterious device and is drawn into a secret war between automatons and fish-men.", series: null, tier: 1, topRank: null },
  { title: "Dr. Adder", author: "K.W. Jeter", pageCount: 256, genre: "Sci-Fi", publicationDate: "1984", description: "Jeter's legendary cyberpunk novel, so extreme it couldn't find a publisher for a decade: a far-future Los Angeles of augmented sex workers, terror TV, and bioweapons.", series: null, tier: 1, topRank: null },
  { title: "Noir", author: "K.W. Jeter", pageCount: 528, genre: "Sci-Fi", publicationDate: "1998", description: "A corporate retrieval agent investigating a bookshop murder in a cyberpunk future discovers a connection to an exiled philosopher's stolen data.", series: null, tier: 1, topRank: null },

  // James P. Blaylock (3)
  { title: "The Digging Leviathan", author: "James P. Blaylock", pageCount: 272, genre: "Sci-Fi", publicationDate: "1984", description: "In 1960s Los Angeles, a group of eccentrics follows an aging scientist's plans to build a submarine and dig to the hollow center of the Earth — Blaylock's dreamlike Southern California fantasy.", series: null, tier: 1, topRank: null },
  { title: "Homunculus", author: "James P. Blaylock", pageCount: 304, genre: "Sci-Fi", publicationDate: "1986", description: "Blaylock's Victorian steampunk: a derelict airship has been circling London for fifteen years, a homunculus is on the loose, and a cabal of occultists wants both.", series: null, tier: 1, topRank: null },
  { title: "The Last Coin", author: "James P. Blaylock", pageCount: 432, genre: "Fantasy", publicationDate: "1988", description: "The thirty pieces of silver Judas was paid for betraying Christ are scattered around the world — and a California beachcomber has the last one.", series: null, tier: 1, topRank: null },

  // Hayao Miyazaki (2)
  { title: "Nausicaä of the Valley of the Wind, Vol. 1", author: "Hayao Miyazaki", pageCount: 136, genre: "Graphic Novel", publicationDate: "1982", description: "The first volume of Miyazaki's post-apocalyptic manga epic: a young princess tries to make peace between warring human kingdoms and the mutated insect-haunted Sea of Corruption.", series: { name: "Nausicaä", order: 1, total: 7 }, tier: 1, topRank: null },
  { title: "Starting Point", author: "Hayao Miyazaki", pageCount: 464, genre: "Non-Fiction", publicationDate: "1996", description: "Miyazaki's essays, interviews, and production notes from his first three decades at Studio Ghibli — the most direct window on his creative process.", series: null, tier: 1, topRank: null },

  // F. Paul Wilson (4)
  { title: "The Keep", author: "F. Paul Wilson", pageCount: 368, genre: "Horror", publicationDate: "1981", description: "A Nazi garrison in WWII Romania takes over an ancient keep — and begins dying one by one as something that has been sealed inside the building for centuries wakes up.", series: { name: "Adversary Cycle", order: 1, total: 6 }, tier: 1, topRank: null },
  { title: "The Tomb", author: "F. Paul Wilson", pageCount: 432, genre: "Horror", publicationDate: "1984", description: "The first Repairman Jack novel: an off-the-grid problem-solver-for-hire in New York takes a case involving missing relatives — and discovers ancient Hindu demons are hunting them.", series: { name: "Repairman Jack", order: 1, total: 17 }, tier: 1, topRank: null },
  { title: "Legacies", author: "F. Paul Wilson", pageCount: 432, genre: "Thriller", publicationDate: "1998", description: "Repairman Jack #2: Jack investigates the deaths of a stage magician, his daughter, and a mysterious benefactor whose inheritance is tied to a lost Edison invention.", series: { name: "Repairman Jack", order: 2, total: 17 }, tier: 1, topRank: null },
  { title: "Sibs", author: "F. Paul Wilson", pageCount: 416, genre: "Horror", publicationDate: "1991", description: "A woman investigating her twin sister's suicide in New York uncovers a series of eerie deaths that may be tied to an otherworldly force that feeds on grief.", series: null, tier: 1, topRank: null },

  // Gwendolyn Kiste (3)
  { title: "Reluctant Immortals", author: "Gwendolyn Kiste", pageCount: 304, genre: "Horror", publicationDate: "2022", description: "In 1967 Haight-Ashbury, two immortal women — one Lucy Westenra from Dracula, one Bertha from Jane Eyre — confront their monstrous male 'authors' who have come back to claim them.", series: null, tier: 1, topRank: null },
  { title: "The Rust Maidens", author: "Gwendolyn Kiste", pageCount: 240, genre: "Horror", publicationDate: "2018", description: "In 1980 Cleveland, a teenage girl watches her friends — known as the Rust Maidens — slowly transform into something that is shedding layers of themselves like rust.", series: null, tier: 1, topRank: null },
  { title: "Boneset & Feathers", author: "Gwendolyn Kiste", pageCount: 256, genre: "Horror", publicationDate: "2020", description: "A witch living in seclusion after escaping a brutal witch trial must confront her past when the witch hunters return to her village.", series: null, tier: 1, topRank: null },

  // Essa Hansen (3)
  { title: "Nophek Gloss", author: "Essa Hansen", pageCount: 512, genre: "Sci-Fi", publicationDate: "2020", description: "The first Graven novel: a 14-year-old boy raised on a rural pastoral world discovers his entire life has been a deliberate illusion — and embarks on a revenge that spans multiverses.", series: { name: "The Graven", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Azura Ghost", author: "Essa Hansen", pageCount: 496, genre: "Sci-Fi", publicationDate: "2022", description: "The Graven #2: Caiden pursues the Graven entity whose past intrusion into the multiverse is unraveling reality — and discovers he may have been marked to stop it since childhood.", series: { name: "The Graven", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Ethera Grave", author: "Essa Hansen", pageCount: 528, genre: "Sci-Fi", publicationDate: "2023", description: "The Graven #3: the final confrontation across a shattered multiverse as Caiden's mission to save all universes becomes an ethical question.", series: { name: "The Graven", order: 3, total: 3 }, tier: 1, topRank: null },

  // Emma Newman (4)
  { title: "Planetfall", author: "Emma Newman", pageCount: 336, genre: "Sci-Fi", publicationDate: "2015", description: "The first Planetfall novel: a colony of humans on a distant world has lived for decades around a mysterious alien structure — and the arrival of a stranger threatens the lie the leaders have been hiding.", series: { name: "Planetfall", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "After Atlas", author: "Emma Newman", pageCount: 416, genre: "Sci-Fi", publicationDate: "2016", description: "Planetfall #2: on a near-future Earth where the Planetfall mission has been mythologized, a famous detective is hired to investigate the death of a cult leader.", series: { name: "Planetfall", order: 2, total: 4 }, tier: 1, topRank: null },
  { title: "Between Two Thorns", author: "Emma Newman", pageCount: 384, genre: "Fantasy", publicationDate: "2013", description: "The first Split Worlds novel: a young woman in an alternate Victorian England caught between fae politics and magical obligations she did not choose.", series: { name: "Split Worlds", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "Before Mars", author: "Emma Newman", pageCount: 336, genre: "Sci-Fi", publicationDate: "2018", description: "Planetfall #3: a geologist arriving at the Mars colony finds a note written in her own handwriting warning her not to trust the psychiatrist on base.", series: { name: "Planetfall", order: 3, total: 4 }, tier: 1, topRank: null },

  // S.B. Divya (3)
  { title: "Machinehood", author: "S.B. Divya", pageCount: 416, genre: "Sci-Fi", publicationDate: "2021", description: "A 2095 bodyguard for a pharmaceutical pill-designer investigates a terrorist group called the Machinehood that wants to pause all human work — and may be partly nonhuman.", series: null, tier: 1, topRank: null },
  { title: "Meru", author: "S.B. Divya", pageCount: 432, genre: "Sci-Fi", publicationDate: "2023", description: "The first Alloy Era novel: an engineered post-human girl and a traditional-genetics pilot team up to investigate the first truly habitable human-compatible planet discovered in centuries.", series: { name: "The Alloy Era", order: 1, total: 2 }, tier: 1, topRank: null },
  { title: "Loka", author: "S.B. Divya", pageCount: 432, genre: "Sci-Fi", publicationDate: "2024", description: "The Alloy Era #2: Akshaya's daughter attempts to live as a regular human on a post-scarcity Earth and finds herself shaping the planet's political future.", series: { name: "The Alloy Era", order: 2, total: 2 }, tier: 1, topRank: null },

  // Susan Dennard (4)
  { title: "Truthwitch", author: "Susan Dennard", pageCount: 416, genre: "Young Adult", publicationDate: "2016", description: "The first Witchlands novel: two witch friends — one a rare Truthwitch, one a Threadwitch — flee across a war-torn continent as empires and assassins hunt them.", series: { name: "The Witchlands", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "Windwitch", author: "Susan Dennard", pageCount: 432, genre: "Young Adult", publicationDate: "2017", description: "The Witchlands #2: prince Merik fakes his own death while Safi is held prisoner by the Hell-Bards — and a new enemy begins to stir in the Origin Wells.", series: { name: "The Witchlands", order: 2, total: 4 }, tier: 1, topRank: null },
  { title: "Bloodwitch", author: "Susan Dennard", pageCount: 416, genre: "Young Adult", publicationDate: "2019", description: "The Witchlands #3: Aeduan, the titular Bloodwitch, and the truthwitch-in-training Iseult must confront the ancient curse that binds them both.", series: { name: "The Witchlands", order: 3, total: 4 }, tier: 1, topRank: null },
  { title: "Something Strange and Deadly", author: "Susan Dennard", pageCount: 400, genre: "Young Adult", publicationDate: "2012", description: "Dennard's debut: in 1876 Philadelphia, a young woman whose brother has gone missing investigates rumors of a necromancer-led zombie uprising at the Centennial Exposition.", series: { name: "Something Strange and Deadly", order: 1, total: 3 }, tier: 1, topRank: null },

  // Mary E. Pearson (4)
  { title: "The Kiss of Deception", author: "Mary E. Pearson", pageCount: 512, genre: "Young Adult", publicationDate: "2014", description: "The first Remnant Chronicles novel: a runaway princess is pursued by an assassin and a prince of a rival kingdom — both of whom reach her incognito in the same village.", series: { name: "The Remnant Chronicles", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "The Heart of Betrayal", author: "Mary E. Pearson", pageCount: 480, genre: "Young Adult", publicationDate: "2015", description: "Remnant Chronicles #2: Lia is held captive by the Komizar of Venda and must find a way to survive long enough to prevent a continent-wide war.", series: { name: "The Remnant Chronicles", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "The Beauty of Darkness", author: "Mary E. Pearson", pageCount: 688, genre: "Young Adult", publicationDate: "2016", description: "Remnant Chronicles #3: the final confrontation with the Komizar as Lia rallies her kingdoms to confront the gathered Vendan horde.", series: { name: "The Remnant Chronicles", order: 3, total: 3 }, tier: 1, topRank: null },
  { title: "Dance of Thieves", author: "Mary E. Pearson", pageCount: 544, genre: "Young Adult", publicationDate: "2018", description: "Set in the Remnant Chronicles world: a young outlaw queen and a rahtan agent investigating her outpost fall for each other — and learn they are on opposite sides of a coming war.", series: { name: "Dance of Thieves", order: 1, total: 2 }, tier: 1, topRank: null },

  // David Dalglish (3)
  { title: "A Dance of Cloaks", author: "David Dalglish", pageCount: 528, genre: "Fantasy", publicationDate: "2010", description: "The first Shadowdance novel: the son of a powerful crime-guild leader is raised to become the perfect assassin — and discovers his empathy may be his only advantage.", series: { name: "Shadowdance", order: 1, total: 7 }, tier: 1, topRank: null },
  { title: "A Dance of Blades", author: "David Dalglish", pageCount: 464, genre: "Fantasy", publicationDate: "2011", description: "Shadowdance #2: Haern the Watcher, a vigilante assassin, is hired to disrupt a war that is about to engulf Veldaren — and finds the politics are more complex than he realized.", series: { name: "Shadowdance", order: 2, total: 7 }, tier: 1, topRank: null },
  { title: "Soulkeeper", author: "David Dalglish", pageCount: 496, genre: "Fantasy", publicationDate: "2019", description: "The first Keepers novel: a church soulkeeper — a priest trained to shepherd dying souls to their next journey — confronts a wave of impossible awakenings.", series: { name: "The Keepers", order: 1, total: 3 }, tier: 1, topRank: null },

  // Taran Matharu (3)
  { title: "The Novice", author: "Taran Matharu", pageCount: 368, genre: "Young Adult", publicationDate: "2013", description: "The first Summoner novel: a young blacksmith's son discovers he has a rare talent for summoning demons and is recruited into the Empire's elite Vocans Academy.", series: { name: "Summoner", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "The Inquisition", author: "Taran Matharu", pageCount: 384, genre: "Young Adult", publicationDate: "2015", description: "Summoner #2: Fletcher stands trial for his mysterious background and heritage — while the orc invasion grows closer to the empire's frontier.", series: { name: "Summoner", order: 2, total: 4 }, tier: 1, topRank: null },
  { title: "The Battlemage", author: "Taran Matharu", pageCount: 464, genre: "Young Adult", publicationDate: "2016", description: "Summoner #3: Fletcher and his friends are thrown into the orc-infested ether and must find a way back before the Empire collapses under an orc assault.", series: { name: "Summoner", order: 3, total: 4 }, tier: 1, topRank: null },

  // Peter Orullian (2)
  { title: "The Unremembered", author: "Peter Orullian", pageCount: 672, genre: "Fantasy", publicationDate: "2011", description: "The first Vault of Heaven novel: a young orphan in a quiet village discovers his bloodline is at the heart of an ancient war between gods and an imprisoned evil.", series: { name: "The Vault of Heaven", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Trial of Intentions", author: "Peter Orullian", pageCount: 784, genre: "Fantasy", publicationDate: "2015", description: "Vault of Heaven #2: the heroes prepare for the coming Quietgiven while political and theological factions fracture the kingdom they are trying to save.", series: { name: "The Vault of Heaven", order: 2, total: 3 }, tier: 1, topRank: null },

  // Rosemary Sutcliff (4)
  { title: "The Eagle of the Ninth", author: "Rosemary Sutcliff", pageCount: 240, genre: "Historical Fiction", publicationDate: "1954", description: "Sutcliff's classic: a young Roman centurion and his British slave travel north of Hadrian's Wall to recover the lost Eagle of the Ninth Legion.", series: { name: "Dolphin Ring", order: 1, total: 8 }, tier: 1, topRank: null },
  { title: "The Silver Branch", author: "Rosemary Sutcliff", pageCount: 240, genre: "Historical Fiction", publicationDate: "1957", description: "Dolphin Ring #2: a century after The Eagle of the Ninth, two descendants of Marcus Flavius Aquila defend Roman Britain against Saxon raiders.", series: { name: "Dolphin Ring", order: 2, total: 8 }, tier: 1, topRank: null },
  { title: "The Lantern Bearers", author: "Rosemary Sutcliff", pageCount: 256, genre: "Historical Fiction", publicationDate: "1959", description: "Dolphin Ring #3: at the end of Roman rule in Britain, a young officer deserts the last legion and joins the British resistance against the Saxon settlers. Carnegie Medal winner.", series: { name: "Dolphin Ring", order: 3, total: 8 }, tier: 1, topRank: null },
  { title: "The Mark of the Horse Lord", author: "Rosemary Sutcliff", pageCount: 288, genre: "Historical Fiction", publicationDate: "1965", description: "A Roman gladiator who has won his freedom is recruited to impersonate the long-lost king of the Dalriads — and must survive the Pictish war that greets his arrival.", series: null, tier: 1, topRank: null },

  // Kate Griffin (3)
  { title: "A Madness of Angels", author: "Kate Griffin", pageCount: 464, genre: "Fantasy", publicationDate: "2009", description: "The first Matthew Swift novel: a London sorcerer dies in an alley and wakes up two years later, possessed by the blue electric angels of the telephone wires and hunting his own killer.", series: { name: "Matthew Swift", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "The Midnight Mayor", author: "Kate Griffin", pageCount: 480, genre: "Fantasy", publicationDate: "2010", description: "Matthew Swift #2: Matthew is drafted into the mystical role of the Midnight Mayor — London's supernatural protector — and must confront an ancient evil stirring in the Square Mile.", series: { name: "Matthew Swift", order: 2, total: 4 }, tier: 1, topRank: null },
  { title: "The Neon Court", author: "Kate Griffin", pageCount: 464, genre: "Fantasy", publicationDate: "2011", description: "Matthew Swift #3: the Neon Court of London's supernatural elites demands Matthew find a missing chosen one before a prophesied catastrophe.", series: { name: "Matthew Swift", order: 3, total: 4 }, tier: 1, topRank: null },

  // Lauren Oliver (4)
  { title: "Before I Fall", author: "Lauren Oliver", pageCount: 480, genre: "Young Adult", publicationDate: "2010", description: "Oliver's debut: a popular high school girl dies in a car accident — and relives the same day seven times, each time trying to figure out what she's meant to do differently.", series: null, tier: 1, topRank: null },
  { title: "Delirium", author: "Lauren Oliver", pageCount: 448, genre: "Young Adult", publicationDate: "2011", description: "The first Delirium novel: in a future where love has been declared a disease and surgically cured, a teenager falls for a rebel boy ninety-five days before her own scheduled cure.", series: { name: "Delirium", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Pandemonium", author: "Lauren Oliver", pageCount: 384, genre: "Young Adult", publicationDate: "2012", description: "Delirium #2: Lena survives in the Wilds while a growing resistance movement plots against the regime that cures love.", series: { name: "Delirium", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Requiem", author: "Lauren Oliver", pageCount: 400, genre: "Young Adult", publicationDate: "2013", description: "Delirium #3: Lena's life and the war against the regime collide as the rebels prepare for a final uprising.", series: { name: "Delirium", order: 3, total: 3 }, tier: 1, topRank: null },

  // Ally Condie (3)
  { title: "Matched", author: "Ally Condie", pageCount: 384, genre: "Young Adult", publicationDate: "2010", description: "The first Matched novel: in a society where everyone is assigned a perfect partner at age 17, a young woman sees a second face flicker in her Match report.", series: { name: "Matched", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Crossed", author: "Ally Condie", pageCount: 384, genre: "Young Adult", publicationDate: "2011", description: "Matched #2: Cassia has been sent to the Outer Provinces as punishment for her dissent — and joins a growing resistance against the Society's control.", series: { name: "Matched", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Reached", author: "Ally Condie", pageCount: 528, genre: "Young Adult", publicationDate: "2012", description: "Matched #3: the final chapter in Cassia's rebellion against the Society as a plague begins to sweep across the Provinces.", series: { name: "Matched", order: 3, total: 3 }, tier: 1, topRank: null },

  // Beth Revis (3)
  { title: "Across the Universe", author: "Beth Revis", pageCount: 416, genre: "Young Adult", publicationDate: "2011", description: "The first Across the Universe novel: a teenage girl cryogenically frozen for a 300-year interstellar journey is woken 50 years early — and realizes someone is murdering the passengers.", series: { name: "Across the Universe", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "A Million Suns", author: "Beth Revis", pageCount: 400, genre: "Young Adult", publicationDate: "2012", description: "Across the Universe #2: Amy and Elder must navigate the social collapse of the Godspeed as the truth about the ship's mission begins to unravel.", series: { name: "Across the Universe", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Shades of Earth", author: "Beth Revis", pageCount: 400, genre: "Young Adult", publicationDate: "2013", description: "Across the Universe #3: the Godspeed arrives at Centauri-Earth — and the survivors discover the planet has deadly secrets of its own.", series: { name: "Across the Universe", order: 3, total: 3 }, tier: 1, topRank: null },

  // Dan Wells (4)
  { title: "I Am Not a Serial Killer", author: "Dan Wells", pageCount: 304, genre: "Horror", publicationDate: "2009", description: "A teenager with clinical sociopathy works at his mother's mortuary and spends all his energy not becoming a serial killer — until a real one arrives in town.", series: { name: "John Cleaver", order: 1, total: 6 }, tier: 1, topRank: null },
  { title: "Mr. Monster", author: "Dan Wells", pageCount: 304, genre: "Horror", publicationDate: "2010", description: "John Cleaver #2: John has killed a demon, but his inner 'Mr. Monster' is getting stronger — and another supernatural killer is targeting young women in his town.", series: { name: "John Cleaver", order: 2, total: 6 }, tier: 1, topRank: null },
  { title: "I Don't Want to Kill You", author: "Dan Wells", pageCount: 320, genre: "Horror", publicationDate: "2011", description: "John Cleaver #3: John deliberately calls out a new demon — and regrets it as it begins hunting his family and the people he cares about.", series: { name: "John Cleaver", order: 3, total: 6 }, tier: 1, topRank: null },
  { title: "Partials", author: "Dan Wells", pageCount: 480, genre: "Young Adult", publicationDate: "2012", description: "The first Partials Sequence novel: in a 2076 America where only 40,000 humans survive after a war with the bioengineered Partials, a teenage medic tries to find a cure for infant mortality.", series: { name: "Partials Sequence", order: 1, total: 4 }, tier: 1, topRank: null },

  // Reki Kawahara (3)
  { title: "Sword Art Online: Aincrad", author: "Reki Kawahara", pageCount: 248, genre: "Sci-Fi", publicationDate: "2009", description: "The first Sword Art Online light novel: 10,000 players are trapped in a VR MMO that can only be exited by beating all 100 floors — and dying in-game kills you in reality.", series: { name: "Sword Art Online", order: 1, total: 27 }, tier: 1, topRank: null },
  { title: "Sword Art Online: Fairy Dance", author: "Reki Kawahara", pageCount: 272, genre: "Sci-Fi", publicationDate: "2010", description: "Sword Art Online #3-4: Kirito investigates a new VR game where Asuna is being held prisoner in a high-tech magical kingdom.", series: { name: "Sword Art Online", order: 3, total: 27 }, tier: 1, topRank: null },
  { title: "Accel World, Vol. 1", author: "Reki Kawahara", pageCount: 256, genre: "Sci-Fi", publicationDate: "2009", description: "The first Accel World light novel: a bullied middle-schooler is invited to join a hidden online game where the fastest combatants become Burst Linkers.", series: { name: "Accel World", order: 1, total: 29 }, tier: 1, topRank: null },

  // Nino Cipri (3)
  { title: "Finna", author: "Nino Cipri", pageCount: 144, genre: "Sci-Fi", publicationDate: "2020", description: "Two minimum-wage employees at a LitenVärld (not-IKEA) store use an interdimensional-wormhole-locator device to find a customer who wandered into another universe.", series: { name: "LitenVärld", order: 1, total: 2 }, tier: 1, topRank: null },
  { title: "Defekt", author: "Nino Cipri", pageCount: 176, genre: "Sci-Fi", publicationDate: "2021", description: "LitenVärld #2: an Employee of the Month is assigned to an overnight shift and discovers his coworkers are all clones of himself — and something lives in the bedding aisle.", series: { name: "LitenVärld", order: 2, total: 2 }, tier: 1, topRank: null },
  { title: "Homesick", author: "Nino Cipri", pageCount: 232, genre: "Fantasy", publicationDate: "2019", description: "Cipri's first collection: trans and non-binary characters navigating haunted houses, vanished worlds, and the slow unraveling of gendered certainties.", series: null, tier: 1, topRank: null },

  // Genevieve Valentine (3)
  { title: "The Girls at the Kingfisher Club", author: "Genevieve Valentine", pageCount: 288, genre: "Historical Fiction", publicationDate: "2014", description: "A Jazz Age retelling of The Twelve Dancing Princesses: twelve sisters hidden by their abusive father escape nightly to Manhattan speakeasies — and must ultimately flee together.", series: null, tier: 1, topRank: null },
  { title: "Mechanique", author: "Genevieve Valentine", pageCount: 288, genre: "Fantasy", publicationDate: "2011", description: "Valentine's debut: in a post-apocalyptic world, a traveling circus whose aerialists are fitted with mechanical bones draws both devotees and inquisitors.", series: null, tier: 1, topRank: null },
  { title: "Persona", author: "Genevieve Valentine", pageCount: 320, genre: "Thriller", publicationDate: "2015", description: "In a near-future world of celebrity diplomats, a face-for-hire is framed for the assassination of a rival Face — and must survive her handlers and the press.", series: null, tier: 1, topRank: null },
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
