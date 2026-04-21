const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");

const ADDITIONS = [
  // William Faulkner (5)
  { title: "Sartoris", author: "William Faulkner", pageCount: 432, genre: "Fiction", publicationDate: "1929", description: "Faulkner's first Yoknapatawpha novel, introducing the Sartoris family and tracing a disillusioned WWI pilot's self-destruction in the postwar South.", series: null, tier: 1, topRank: null },
  { title: "The Wild Palms", author: "William Faulkner", pageCount: 352, genre: "Fiction", publicationDate: "1939", description: "Faulkner's experimental novel interleaving two unrelated stories in alternating chapters — a doomed love affair and an escaped convict rescuing a pregnant woman during a Mississippi flood.", series: null, tier: 1, topRank: null },
  { title: "The Unvanquished", author: "William Faulkner", pageCount: 272, genre: "Historical Fiction", publicationDate: "1938", description: "Seven linked stories of the Sartoris family during and after the Civil War, narrated by a boy coming of age in a collapsing plantation world.", series: null, tier: 1, topRank: null },
  { title: "Mosquitoes", author: "William Faulkner", pageCount: 352, genre: "Fiction", publicationDate: "1927", description: "Faulkner's second novel, a satirical ensemble comedy aboard a New Orleans yacht carrying artists, intellectuals, and hangers-on through a long, becalmed cruise.", series: null, tier: 1, topRank: null },
  { title: "Requiem for a Nun", author: "William Faulkner", pageCount: 288, genre: "Fiction", publicationDate: "1951", description: "A part-novel, part-play sequel to Sanctuary, returning to Temple Drake years later as she tries to save her child's murderer from execution.", series: null, tier: 1, topRank: null },

  // Ernest Hemingway (3)
  { title: "Green Hills of Africa", author: "Ernest Hemingway", pageCount: 304, genre: "Non-Fiction", publicationDate: "1935", description: "Hemingway's nonfiction account of a month on East African safari, framed around his pursuit of a kudu bull and extended meditations on writing and death.", series: null, tier: 1, topRank: null },
  { title: "Death in the Afternoon", author: "Ernest Hemingway", pageCount: 496, genre: "Non-Fiction", publicationDate: "1932", description: "Hemingway's book-length study of Spanish bullfighting — at once a technical treatise, an aesthetic manifesto, and an argument for grace under pressure.", series: null, tier: 1, topRank: null },
  { title: "The Torrents of Spring", author: "Ernest Hemingway", pageCount: 144, genre: "Fiction", publicationDate: "1926", description: "Hemingway's first published novel, a short satirical parody of Sherwood Anderson's Dark Laughter written in ten days to break his contract with Anderson's publisher.", series: null, tier: 1, topRank: null },

  // John Steinbeck (7)
  { title: "The Red Pony", author: "John Steinbeck", pageCount: 100, genre: "Fiction", publicationDate: "1933", description: "Four linked stories of a boy on a California ranch learning about life and death through his relationships with horses, his father, and an old farmhand.", series: null, tier: 1, topRank: null },
  { title: "The Moon is Down", author: "John Steinbeck", pageCount: 192, genre: "Historical Fiction", publicationDate: "1942", description: "Steinbeck's WWII novella of a small northern town occupied by an unnamed invader, widely read as a parable of Nazi-occupied Norway and smuggled across occupied Europe.", series: null, tier: 1, topRank: null },
  { title: "Cup of Gold", author: "John Steinbeck", pageCount: 256, genre: "Historical Fiction", publicationDate: "1929", description: "Steinbeck's first novel, a fictionalized life of the pirate Henry Morgan and his sack of Panama — the last of his early romantic efforts before he turned to California.", series: null, tier: 1, topRank: null },
  { title: "The Pastures of Heaven", author: "John Steinbeck", pageCount: 224, genre: "Fiction", publicationDate: "1932", description: "Steinbeck's interlinked story collection about a California valley whose families each bear the weight of a secret curse, visible only as misfortune.", series: null, tier: 1, topRank: null },
  { title: "The Long Valley", author: "John Steinbeck", pageCount: 256, genre: "Fiction", publicationDate: "1938", description: "Steinbeck's major short story collection, gathering 'The Chrysanthemums,' 'The White Quail,' 'Flight,' and other Salinas Valley tales.", series: null, tier: 1, topRank: null },
  { title: "The Wayward Bus", author: "John Steinbeck", pageCount: 320, genre: "Fiction", publicationDate: "1947", description: "A cross-section of American life trapped together on a stranded California bus — Steinbeck's social comedy of postwar disillusionment.", series: null, tier: 1, topRank: null },
  { title: "To a God Unknown", author: "John Steinbeck", pageCount: 240, genre: "Fiction", publicationDate: "1933", description: "A Vermont settler brings his family to homestead in California and falls into a pagan worship of the land and its fertility — Steinbeck's early mystic novel.", series: null, tier: 1, topRank: null },

  // Vladimir Nabokov (2)
  { title: "Look at the Harlequins!", author: "Vladimir Nabokov", pageCount: 272, genre: "Fiction", publicationDate: "1974", description: "Nabokov's final completed novel, a parodic pseudo-autobiography narrated by a Russian émigré novelist whose life uncannily mirrors Nabokov's own.", series: null, tier: 1, topRank: null },
  { title: "The Original of Laura", author: "Vladimir Nabokov", pageCount: 304, genre: "Fiction", publicationDate: "2009", description: "Nabokov's unfinished final novel, published posthumously against his wishes — 138 index cards arranged into the fragmentary story of a young woman and her dying husband.", series: null, tier: 1, topRank: null },

  // John Updike (2)
  { title: "The Poorhouse Fair", author: "John Updike", pageCount: 192, genre: "Fiction", publicationDate: "1959", description: "Updike's first novel, set during the annual summer fair at a county poorhouse in a near-future America — a small novel of old age, rebellion, and welfare-state malaise.", series: null, tier: 1, topRank: null },
  { title: "A Month of Sundays", author: "John Updike", pageCount: 272, genre: "Fiction", publicationDate: "1975", description: "A disgraced clergyman sent to a desert retreat for sinning ministers narrates his confession over thirty days — the first of Updike's Hawthorne-inspired Scarlet Letter trilogy.", series: null, tier: 1, topRank: null },

  // Ursula K. Le Guin (5)
  { title: "The Beginning Place", author: "Ursula K. Le Guin", pageCount: 192, genre: "Fantasy", publicationDate: "1980", description: "Two young people escape their suburban lives through a portal into an adjacent twilight world and discover they are needed to confront the thing that haunts it.", series: null, tier: 1, topRank: null },
  { title: "Lavinia", author: "Ursula K. Le Guin", pageCount: 288, genre: "Historical Fiction", publicationDate: "2008", description: "Le Guin retells the Aeneid from the point of view of Lavinia, the Italian princess Aeneas is destined to marry — the silent bride Virgil barely describes.", series: null, tier: 1, topRank: null },
  { title: "The Compass Rose", author: "Ursula K. Le Guin", pageCount: 320, genre: "Sci-Fi", publicationDate: "1982", description: "Le Guin's story collection of twenty SF and fantasy tales from the late 1970s, organized around the compass points of the imagination.", series: null, tier: 1, topRank: null },
  { title: "The Birthday of the World", author: "Ursula K. Le Guin", pageCount: 384, genre: "Sci-Fi", publicationDate: "2002", description: "A collection of eight late Le Guin stories, most set in the Hainish universe, exploring gender, marriage, and social form on alien worlds.", series: null, tier: 1, topRank: null },
  { title: "The Eye of the Heron", author: "Ursula K. Le Guin", pageCount: 192, genre: "Sci-Fi", publicationDate: "1978", description: "A short SF novel set on a prison colony planet where two exiled Earth communities — one pacifist, one authoritarian — are forced to confront each other over scarce land.", series: null, tier: 1, topRank: null },

  // Philip K. Dick (5)
  { title: "Our Friends from Frolix 8", author: "Philip K. Dick", pageCount: 240, genre: "Sci-Fi", publicationDate: "1970", description: "In a future ruled by genetically engineered New Men and psychic Unusuals, an 'Old Man' underground leader awaits salvation from a gigantic alien approaching Earth.", series: null, tier: 1, topRank: null },
  { title: "The Game-Players of Titan", author: "Philip K. Dick", pageCount: 224, genre: "Sci-Fi", publicationDate: "1963", description: "Post-apocalyptic Earth: the survivors own real estate won or lost in a game called Bluff against alien Titanians — until one player stumbles onto the game's hidden stakes.", series: null, tier: 1, topRank: null },
  { title: "We Can Build You", author: "Philip K. Dick", pageCount: 272, genre: "Sci-Fi", publicationDate: "1972", description: "A piano manufacturer's company builds a simulacrum of Edwin M. Stanton and then Abraham Lincoln, and its inventor falls in love with a schizoid woman who may be less human than the robots.", series: null, tier: 1, topRank: null },
  { title: "The Cosmic Puppets", author: "Philip K. Dick", pageCount: 160, genre: "Sci-Fi", publicationDate: "1957", description: "A man returns to his Virginia hometown and finds every detail is wrong — the buildings, the people, his own memory of his death — caught in a battle between two Zoroastrian gods.", series: null, tier: 1, topRank: null },
  { title: "The Zap Gun", author: "Philip K. Dick", pageCount: 240, genre: "Sci-Fi", publicationDate: "1967", description: "A Cold War satire in which rival superpower weapons designers secretly collaborate to produce useless but impressive armaments — until an actual alien invasion arrives.", series: null, tier: 1, topRank: null },

  // Ray Bradbury (4)
  { title: "The Machineries of Joy", author: "Ray Bradbury", pageCount: 272, genre: "Fiction", publicationDate: "1964", description: "Bradbury's story collection from the early 1960s, ranging from Irish folklore to Catholic priests debating the morality of space exploration.", series: null, tier: 1, topRank: null },
  { title: "From the Dust Returned", author: "Ray Bradbury", pageCount: 208, genre: "Horror", publicationDate: "2001", description: "A novel weaving together Bradbury's decades of stories about the Elliott family — a gothic clan of witches, vampires, and ghosts living in an old Illinois house.", series: null, tier: 1, topRank: null },
  { title: "A Medicine for Melancholy", author: "Ray Bradbury", pageCount: 240, genre: "Fiction", publicationDate: "1959", description: "Bradbury's story collection of late-1950s tales, including 'All Summer in a Day' and 'The Dragon' — quiet moral fables sharpened by his characteristic nostalgia.", series: null, tier: 1, topRank: null },
  { title: "S Is for Space", author: "Ray Bradbury", pageCount: 240, genre: "Sci-Fi", publicationDate: "1966", description: "Bradbury's collection of sixteen stories selected for younger readers, organized around a cosmic alphabet of strangeness.", series: null, tier: 1, topRank: null },

  // Robert A. Heinlein (6)
  { title: "Podkayne of Mars", author: "Robert A. Heinlein", pageCount: 256, genre: "Sci-Fi", publicationDate: "1963", description: "A Martian teenage girl travels to Earth with her little brother and their uncle — a political diplomat — and finds herself tangled in interplanetary intrigue.", series: null, tier: 1, topRank: null },
  { title: "Beyond This Horizon", author: "Robert A. Heinlein", pageCount: 256, genre: "Sci-Fi", publicationDate: "1948", description: "A future society perfected by genetic engineering and universal abundance breeds dueling young men who go looking for trouble — Heinlein's early meditation on freedom and control.", series: null, tier: 1, topRank: null },
  { title: "Revolt in 2100", author: "Robert A. Heinlein", pageCount: 192, genre: "Sci-Fi", publicationDate: "1953", description: "Three linked stories set in a future theocratic America under a Prophet, following a young Legate who joins the secret resistance — core of Heinlein's Future History.", series: null, tier: 1, topRank: null },
  { title: "The Man Who Sold the Moon", author: "Robert A. Heinlein", pageCount: 300, genre: "Sci-Fi", publicationDate: "1950", description: "The first volume of Heinlein's Future History story cycle, centered on D.D. Harriman, the ruthless business tycoon who bankrolls the first trip to the Moon.", series: null, tier: 1, topRank: null },
  { title: "The Green Hills of Earth", author: "Robert A. Heinlein", pageCount: 240, genre: "Sci-Fi", publicationDate: "1951", description: "The second Future History collection, covering the early days of commercial space travel and the blind poet Rhysling whose songs become spacer folk culture.", series: null, tier: 1, topRank: null },
  { title: "Orphans of the Sky", author: "Robert A. Heinlein", pageCount: 192, genre: "Sci-Fi", publicationDate: "1963", description: "Generations into a long interstellar voyage, the ship's crew have forgotten they're on a ship at all — one of SF's foundational generation-ship stories.", series: null, tier: 1, topRank: null },

  // Stephen King (5)
  { title: "The Eyes of the Dragon", author: "Stephen King", pageCount: 384, genre: "Fantasy", publicationDate: "1984", description: "King's straight fantasy novel, written for his daughter: a wicked magician frames the rightful young king for his father's murder so a weaker prince can be controlled.", series: null, tier: 1, topRank: null },
  { title: "Four Past Midnight", author: "Stephen King", pageCount: 768, genre: "Horror", publicationDate: "1990", description: "King's second novella collection, containing 'The Langoliers,' 'Secret Window, Secret Garden,' 'The Library Policeman,' and 'The Sun Dog.'", series: null, tier: 1, topRank: null },
  { title: "Thinner", author: "Stephen King", pageCount: 320, genre: "Horror", publicationDate: "1984", description: "Published under the Richard Bachman pseudonym: an obese lawyer kills a Romani woman in a hit-and-run and is cursed to waste away by her ancient father.", series: null, tier: 1, topRank: null },
  { title: "The Dark Half", author: "Stephen King", pageCount: 432, genre: "Horror", publicationDate: "1989", description: "A literary novelist who writes pulp thrillers under a pseudonym decides to retire the alter ego — only to have 'George Stark' physically claw his way out of the grave and come for him.", series: null, tier: 1, topRank: null },
  { title: "Hearts in Atlantis", author: "Stephen King", pageCount: 528, genre: "Fiction", publicationDate: "1999", description: "Five linked stories spanning the 1960s to the 1990s, tracing how the Vietnam era haunted a generation — connected to the Dark Tower series through its hidden 'low men.'", series: null, tier: 1, topRank: null },

  // Dean Koontz (5)
  { title: "Hideaway", author: "Dean Koontz", pageCount: 384, genre: "Horror", publicationDate: "1992", description: "A man resuscitated after twenty minutes of clinical death discovers he has a psychic link to a serial killer who shared the hereafter with him.", series: null, tier: 1, topRank: null },
  { title: "Whispers", author: "Dean Koontz", pageCount: 608, genre: "Thriller", publicationDate: "1980", description: "A successful novelist is stalked by a man she killed in self-defense — who keeps coming back — in one of Koontz's early breakthrough thrillers.", series: null, tier: 1, topRank: null },
  { title: "Shadowfires", author: "Dean Koontz", pageCount: 432, genre: "Thriller", publicationDate: "1987", description: "A woman's ex-husband dies in an accident, then returns to hunt her — enhanced by the experimental genetic research that killed him.", series: null, tier: 1, topRank: null },
  { title: "Ticktock", author: "Dean Koontz", pageCount: 336, genre: "Horror", publicationDate: "1996", description: "A Vietnamese-American novelist finds a rag doll on his doorstep that slowly transforms into a demon with a single mission: kill him before dawn.", series: null, tier: 1, topRank: null },
  { title: "The House of Thunder", author: "Dean Koontz", pageCount: 368, genre: "Thriller", publicationDate: "1982", description: "A woman wakes from a coma to see men she knows are dead walking through her hospital room — and realizes the ordeal she thought was a dream is about to begin again.", series: null, tier: 1, topRank: null },

  // Clive Barker (5)
  { title: "Everville", author: "Clive Barker", pageCount: 704, genre: "Horror", publicationDate: "1994", description: "Sequel to The Great and Secret Show: the Art's final unraveling spreads into a Pacific Northwest town perched on the boundary of another, stranger reality.", series: null, tier: 1, topRank: null },
  { title: "Cabal", author: "Clive Barker", pageCount: 240, genre: "Horror", publicationDate: "1988", description: "The novella that became the film Nightbreed: a man framed for murders he didn't commit flees to Midian, a subterranean refuge for monsters persecuted by humans.", series: null, tier: 1, topRank: null },
  { title: "The Thief of Always", author: "Clive Barker", pageCount: 240, genre: "Fantasy", publicationDate: "1992", description: "Barker's illustrated YA dark fable: a bored boy is lured to the Holiday House, where every day holds a different season and no one ever wants to leave.", series: null, tier: 1, topRank: null },
  { title: "Days of Magic, Nights of War", author: "Clive Barker", pageCount: 528, genre: "Fantasy", publicationDate: "2004", description: "The second Abarat book: Candy Quackenbush discovers she holds magical memories of an Abaratian princess whose enemies are hunting her across an archipelago of islands.", series: { name: "Abarat", order: 2, total: 5 }, tier: 1, topRank: null },
  { title: "Galilee", author: "Clive Barker", pageCount: 720, genre: "Fantasy", publicationDate: "1998", description: "A multigenerational saga of two rival American dynasties, one mortal and one not — the Geary family versus the immortal, half-divine Barbarossas.", series: null, tier: 1, topRank: null },

  // Agatha Christie (7)
  { title: "The Secret Adversary", author: "Agatha Christie", pageCount: 320, genre: "Mystery", publicationDate: "1922", description: "Christie's second novel, introducing young adventurers Tommy and Tuppence who stumble into a postwar conspiracy involving a missing document and a master criminal.", series: { name: "Tommy and Tuppence", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "The Mystery of the Blue Train", author: "Agatha Christie", pageCount: 320, genre: "Mystery", publicationDate: "1928", description: "A wealthy American heiress is murdered on the luxury train to the French Riviera — Poirot, a fellow passenger, investigates the theft of her fabled rubies.", series: null, tier: 1, topRank: null },
  { title: "The Big Four", author: "Agatha Christie", pageCount: 272, genre: "Mystery", publicationDate: "1927", description: "Poirot and Hastings confront an international criminal conspiracy — Christie's atypical thriller, stitched together from previously published short stories.", series: null, tier: 1, topRank: null },
  { title: "The Secret of Chimneys", author: "Agatha Christie", pageCount: 320, genre: "Mystery", publicationDate: "1925", description: "A light comic thriller set at an English country house called Chimneys, involving royal impostors, stolen diamonds, and the vanished crown prince of Herzoslovakia.", series: null, tier: 1, topRank: null },
  { title: "A Pocket Full of Rye", author: "Agatha Christie", pageCount: 224, genre: "Mystery", publicationDate: "1953", description: "A City of London tycoon is found poisoned with rye in his pocket — Miss Marple realizes the murders in his family echo the nursery rhyme 'Sing a Song of Sixpence.'", series: null, tier: 1, topRank: null },
  { title: "The Clocks", author: "Agatha Christie", pageCount: 288, genre: "Mystery", publicationDate: "1963", description: "A young typist sent to an unfamiliar house finds a stranger murdered among four clocks, all stopped at the same wrong hour — a late Poirot novel Christie narrated from the sidelines.", series: null, tier: 1, topRank: null },
  { title: "Nemesis", author: "Agatha Christie", pageCount: 288, genre: "Mystery", publicationDate: "1971", description: "The last Miss Marple novel Christie wrote: a deceased tycoon's will instructs Marple to investigate a crime he does not name, assigning her only the code word 'Nemesis.'", series: null, tier: 1, topRank: null },

  // Raymond Chandler (1)
  { title: "Killer in the Rain", author: "Raymond Chandler", pageCount: 320, genre: "Mystery", publicationDate: "1964", description: "A posthumous collection of eight early Chandler pulp stories that later served as raw material for his Marlowe novels — including the original story behind The Big Sleep.", series: null, tier: 1, topRank: null },

  // Ruth Rendell (6)
  { title: "A Sight for Sore Eyes", author: "Ruth Rendell", pageCount: 352, genre: "Mystery", publicationDate: "1998", description: "Three damaged people in contemporary London are pulled together through the single painting that means different things to each of them.", series: null, tier: 1, topRank: null },
  { title: "The Bridesmaid", author: "Ruth Rendell", pageCount: 288, genre: "Mystery", publicationDate: "1989", description: "A young man falls for a beautiful bridesmaid at his sister's wedding who suggests they prove their love by each committing a murder.", series: null, tier: 1, topRank: null },
  { title: "Simisola", author: "Ruth Rendell", pageCount: 352, genre: "Mystery", publicationDate: "1994", description: "Inspector Wexford investigates the disappearance of a Nigerian family's daughter in Kingsmarkham — Rendell's sharp-edged engagement with British racism.", series: { name: "Inspector Wexford", order: 16, total: 24 }, tier: 1, topRank: null },
  { title: "13 Steps Down", author: "Ruth Rendell", pageCount: 352, genre: "Mystery", publicationDate: "2004", description: "An obsessive handyman in a dilapidated London house stalks a model while his elderly landlady, an aging Henry James scholar, watches her own life erode.", series: null, tier: 1, topRank: null },
  { title: "Wolf to the Slaughter", author: "Ruth Rendell", pageCount: 256, genre: "Mystery", publicationDate: "1967", description: "The third Inspector Wexford novel: Wexford investigates a rumored murder without a body, a known victim, or a suspect — only an anonymous letter claiming one has occurred.", series: { name: "Inspector Wexford", order: 3, total: 24 }, tier: 1, topRank: null },
  { title: "The Keys to the Street", author: "Ruth Rendell", pageCount: 368, genre: "Mystery", publicationDate: "1996", description: "A woman flat-sitting near Regent's Park gets drawn into the lives of the homeless and the rich who pass through it — and into a murderer's orbit.", series: null, tier: 1, topRank: null },

  // Elmore Leonard (5)
  { title: "Bandits", author: "Elmore Leonard", pageCount: 352, genre: "Thriller", publicationDate: "1987", description: "A New Orleans ex-nun, a former priest, and an ex-con plot to steal five million dollars from a Nicaraguan contra colonel who wants to start a war.", series: null, tier: 1, topRank: null },
  { title: "Touch", author: "Elmore Leonard", pageCount: 304, genre: "Fiction", publicationDate: "1987", description: "A former Franciscan brother in Detroit discovers he has stigmata and the power to heal — and a small mob of hustlers, believers, and opportunists begins to circle.", series: null, tier: 1, topRank: null },
  { title: "The Hot Kid", author: "Elmore Leonard", pageCount: 320, genre: "Historical Fiction", publicationDate: "2005", description: "A young US Marshal in 1930s Oklahoma, son of a Tulsa oilman, goes after bank robbers and wannabe gangsters during the twilight of the public-enemy era.", series: null, tier: 1, topRank: null },
  { title: "The Switch", author: "Elmore Leonard", pageCount: 288, genre: "Thriller", publicationDate: "1978", description: "Two career burglars kidnap a Detroit real estate tycoon's wife for ransom — except the tycoon has secretly decided he'd rather she not come back.", series: null, tier: 1, topRank: null },
  { title: "Valdez Is Coming", author: "Elmore Leonard", pageCount: 192, genre: "Historical Fiction", publicationDate: "1970", description: "A Mexican-American constable in 1890s Arizona territory kills a Black man on the word of a powerful rancher — and when the rancher refuses to pay the widow, the constable comes for him.", series: null, tier: 1, topRank: null },

  // Samuel R. Delany (1)
  { title: "The Jewels of Aptor", author: "Samuel R. Delany", pageCount: 192, genre: "Sci-Fi", publicationDate: "1962", description: "Delany's first novel, written at 19: a post-apocalyptic quest to a radioactive island where a goddess-cult guards three jewels of terrible power.", series: null, tier: 1, topRank: null },

  // Larry Niven (3)
  { title: "World of Ptavvs", author: "Larry Niven", pageCount: 192, genre: "Sci-Fi", publicationDate: "1966", description: "Niven's first novel: a billion-year-old telepathic alien slave-master is reawakened from stasis and believes all sentient life in the galaxy is his property.", series: null, tier: 1, topRank: null },
  { title: "A Gift from Earth", author: "Larry Niven", pageCount: 288, genre: "Sci-Fi", publicationDate: "1968", description: "On the colony world Mount Lookitthat, a ruling class harvests organs from dissidents — until a sublight ship arrives from Earth with a technology that threatens the whole system.", series: null, tier: 1, topRank: null },
  { title: "Inferno", author: "Larry Niven", pageCount: 240, genre: "Fantasy", publicationDate: "1976", description: "Niven and Jerry Pournelle's SF retelling of Dante: a science-fiction writer wakes up dead in Hell and is guided through it by a mysterious figure called Benito.", series: null, tier: 1, topRank: null },

  // Kim Stanley Robinson (2)
  { title: "The Martians", author: "Kim Stanley Robinson", pageCount: 480, genre: "Sci-Fi", publicationDate: "1999", description: "A story collection set in the universe of the Mars Trilogy, filling in gaps in the terraforming timeline and offering alternate histories of the red planet's settlement.", series: null, tier: 1, topRank: null },
  { title: "Icehenge", author: "Kim Stanley Robinson", pageCount: 272, genre: "Sci-Fi", publicationDate: "1984", description: "Three linked novellas across five centuries investigate a mysterious stone monument at Pluto's north pole — Robinson's early meditation on history and memory.", series: null, tier: 1, topRank: null },

  // Terry Pratchett (5)
  { title: "Good Omens", author: "Terry Pratchett", pageCount: 400, genre: "Fantasy", publicationDate: "1990", description: "Pratchett and Neil Gaiman's comic apocalypse: an angel and a demon who've grown too fond of Earth conspire to prevent Armageddon — complicated when the Antichrist goes missing.", series: null, tier: 1, topRank: null },
  { title: "The Amazing Maurice and His Educated Rodents", author: "Terry Pratchett", pageCount: 256, genre: "Fantasy", publicationDate: "2001", description: "A Discworld YA novel: a streetwise talking cat and a clan of sapient rats run a Pied Piper con through small towns — until they hit one where something much worse is already waiting.", series: null, tier: 1, topRank: null },
  { title: "Johnny and the Dead", author: "Terry Pratchett", pageCount: 192, genre: "Fantasy", publicationDate: "1993", description: "The second Johnny Maxwell book: Johnny discovers he can see and talk to the ghosts in the local cemetery, just in time to help them save it from developers.", series: { name: "Johnny Maxwell", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Only You Can Save Mankind", author: "Terry Pratchett", pageCount: 192, genre: "Fantasy", publicationDate: "1992", description: "The first Johnny Maxwell book: during the Gulf War, a boy playing a computer space shooter receives a message from his digital enemies asking him to stop killing them.", series: { name: "Johnny Maxwell", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Dodger", author: "Terry Pratchett", pageCount: 368, genre: "Historical Fiction", publicationDate: "2012", description: "A young tosher hustling through the sewers of Victorian London saves a mysterious young woman and collides with Charles Dickens, Sweeney Todd, and the Victorian underworld.", series: null, tier: 1, topRank: null },

  // Robert Frost (1)
  { title: "North of Boston", author: "Robert Frost", pageCount: 144, genre: "Fiction", publicationDate: "1914", description: "Frost's second collection, the book that made his name: dramatic monologues and narrative poems of rural New England including 'Mending Wall' and 'The Death of the Hired Man.'", series: null, tier: 1, topRank: null },

  // W.B. Yeats (1)
  { title: "The Celtic Twilight", author: "W.B. Yeats", pageCount: 192, genre: "Non-Fiction", publicationDate: "1893", description: "Yeats's prose collection of Irish folklore, ghost stories, and fairy lore — the early work that shaped his symbolic vocabulary and his sense of Ireland as a sacred landscape.", series: null, tier: 1, topRank: null },

  // Langston Hughes (2)
  { title: "The Big Sea", author: "Langston Hughes", pageCount: 352, genre: "Biography", publicationDate: "1940", description: "Hughes's first memoir, covering his childhood, his time as a merchant sailor, and his Harlem Renaissance years as one of American literature's rising voices.", series: null, tier: 1, topRank: null },
  { title: "The Ways of White Folks", author: "Langston Hughes", pageCount: 256, genre: "Fiction", publicationDate: "1934", description: "Hughes's first story collection: fourteen tales examining the tense, often intimate, and often cruel interactions between Black and white Americans in the 1920s and 1930s.", series: null, tier: 1, topRank: null },

  // Maya Angelou (1)
  { title: "A Song Flung Up to Heaven", author: "Maya Angelou", pageCount: 256, genre: "Biography", publicationDate: "2002", description: "The sixth volume of Angelou's autobiography, spanning her return from Ghana to the United States and her work with Malcolm X and Martin Luther King Jr.", series: null, tier: 1, topRank: null },

  // Zora Neale Hurston (1)
  { title: "Tell My Horse", author: "Zora Neale Hurston", pageCount: 320, genre: "Non-Fiction", publicationDate: "1938", description: "Hurston's anthropological account of her fieldwork on Vodou and Obeah in Jamaica and Haiti — a pioneering outsider's study of Afro-Caribbean religion by a trained insider.", series: null, tier: 1, topRank: null },

  // Alice Munro (6)
  { title: "Who Do You Think You Are?", author: "Alice Munro", pageCount: 256, genre: "Fiction", publicationDate: "1978", description: "Linked stories following Rose, a small-town Ontario girl who escapes into academia and broken marriages — Munro's Governor General's Award-winning portrait of class.", series: null, tier: 1, topRank: null },
  { title: "The View from Castle Rock", author: "Alice Munro", pageCount: 352, genre: "Fiction", publicationDate: "2006", description: "A late story collection braiding family history and invention, tracing Munro's Scottish ancestors across the Atlantic and through rural Ontario.", series: null, tier: 1, topRank: null },
  { title: "Dance of the Happy Shades", author: "Alice Munro", pageCount: 224, genre: "Fiction", publicationDate: "1968", description: "Munro's debut collection, the book that introduced her quiet, merciless eye for small-town southwestern Ontario — winner of Canada's Governor General's Award.", series: null, tier: 1, topRank: null },
  { title: "The Moons of Jupiter", author: "Alice Munro", pageCount: 256, genre: "Fiction", publicationDate: "1982", description: "Eleven linked and stand-alone stories of women navigating midlife, divorce, and the complicated pull of their mothers and daughters.", series: null, tier: 1, topRank: null },
  { title: "The Progress of Love", author: "Alice Munro", pageCount: 320, genre: "Fiction", publicationDate: "1986", description: "Munro's collection of stories in which small revelations rearrange entire lives — widely considered a turning point in her mature style.", series: null, tier: 1, topRank: null },
  { title: "Friend of My Youth", author: "Alice Munro", pageCount: 288, genre: "Fiction", publicationDate: "1990", description: "Stories of the strange, long reach of the past — childhood friends, lost lovers, family secrets — that Munro turns over with her characteristic patience.", series: null, tier: 1, topRank: null },

  // Margaret Atwood (4)
  { title: "Dancing Girls and Other Stories", author: "Margaret Atwood", pageCount: 256, genre: "Fiction", publicationDate: "1977", description: "Atwood's first story collection: fourteen tales of women in domestic and academic settings skewered by her dry, quietly menacing eye.", series: null, tier: 1, topRank: null },
  { title: "Bluebeard's Egg", author: "Margaret Atwood", pageCount: 288, genre: "Fiction", publicationDate: "1983", description: "A second Atwood collection exploring marriage, memory, and folk tale — stories that use the Bluebeard myth to probe the power asymmetries of modern relationships.", series: null, tier: 1, topRank: null },
  { title: "Good Bones", author: "Margaret Atwood", pageCount: 160, genre: "Fiction", publicationDate: "1992", description: "Atwood's collection of very short pieces — sketches, prose poems, rewritten fairy tales — that became a cult companion to her novels.", series: null, tier: 1, topRank: null },
  { title: "The Journals of Susanna Moodie", author: "Margaret Atwood", pageCount: 96, genre: "Fiction", publicationDate: "1970", description: "Atwood's breakthrough poetry sequence, imagining the inner life of 19th-century pioneer memoirist Susanna Moodie as she confronts the Canadian wilderness.", series: null, tier: 1, topRank: null },

  // Iris Murdoch (7)
  { title: "The Flight from the Enchanter", author: "Iris Murdoch", pageCount: 288, genre: "Fiction", publicationDate: "1956", description: "Murdoch's second novel: a group of London intellectuals and refugees are drawn into the orbit of a charismatic Eastern European magnate who may be a saint or a destroyer.", series: null, tier: 1, topRank: null },
  { title: "The Sandcastle", author: "Iris Murdoch", pageCount: 320, genre: "Fiction", publicationDate: "1957", description: "A middle-aged schoolmaster at an English public school falls in love with a young artist commissioned to paint his headmaster — a novel about moral weakness and magical thinking.", series: null, tier: 1, topRank: null },
  { title: "The Time of the Angels", author: "Iris Murdoch", pageCount: 256, genre: "Fiction", publicationDate: "1966", description: "A mad atheist clergyman lives as a recluse in a condemned City of London rectory with his daughter, his lover, and a niece — Murdoch's darkest gothic novel.", series: null, tier: 1, topRank: null },
  { title: "The Nice and the Good", author: "Iris Murdoch", pageCount: 384, genre: "Fiction", publicationDate: "1968", description: "A senior civil servant investigating a colleague's suicide uncovers black magic, blackmail, and the obscure connections binding a group of people at a Dorset country house.", series: null, tier: 1, topRank: null },
  { title: "The Red and the Green", author: "Iris Murdoch", pageCount: 304, genre: "Historical Fiction", publicationDate: "1965", description: "Murdoch's only historical novel: an Anglo-Irish family in Dublin during Easter Week, 1916, as the Easter Rising splinters them along political and romantic fault lines.", series: null, tier: 1, topRank: null },
  { title: "The Unicorn", author: "Iris Murdoch", pageCount: 288, genre: "Fiction", publicationDate: "1963", description: "A young governess is hired to teach a mysterious woman kept as a kind of willing prisoner in a remote Irish country house — Murdoch's purest engagement with the gothic.", series: null, tier: 1, topRank: null },
  { title: "An Unofficial Rose", author: "Iris Murdoch", pageCount: 320, genre: "Fiction", publicationDate: "1962", description: "A widower's family rearranges itself around old love affairs and new temptations in a novel of controlled disaster and the impossibility of unselfish love.", series: null, tier: 1, topRank: null },

  // Muriel Spark (5)
  { title: "The Comforters", author: "Muriel Spark", pageCount: 224, genre: "Fiction", publicationDate: "1957", description: "Spark's first novel: a young Catholic convert working on a book about the novel becomes convinced she is herself a character in a novel whose author she can hear typing.", series: null, tier: 1, topRank: null },
  { title: "The Ballad of Peckham Rye", author: "Muriel Spark", pageCount: 160, genre: "Fiction", publicationDate: "1960", description: "A Scottish interloper takes a job at a South London textile factory and proceeds to dismantle the lives around him — a comic novel that suggests he may literally be the devil.", series: null, tier: 1, topRank: null },
  { title: "The Mandelbaum Gate", author: "Muriel Spark", pageCount: 320, genre: "Fiction", publicationDate: "1965", description: "A half-Jewish English Catholic convert on a pilgrimage in Jerusalem in 1961 crosses into Jordan during the Eichmann trial — Spark's longest and most ambitious novel.", series: null, tier: 1, topRank: null },
  { title: "Robinson", author: "Muriel Spark", pageCount: 192, genre: "Fiction", publicationDate: "1958", description: "Three survivors of a plane crash are washed up on a small Atlantic island whose sole inhabitant, an ex-businessman named Robinson, lives in elaborate isolation.", series: null, tier: 1, topRank: null },
  { title: "The Public Image", author: "Muriel Spark", pageCount: 192, genre: "Fiction", publicationDate: "1968", description: "An English actress in Rome lives off a carefully managed public persona until her jealous husband kills himself in a way designed to destroy her.", series: null, tier: 1, topRank: null },
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
