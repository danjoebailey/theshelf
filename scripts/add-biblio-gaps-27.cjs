const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

// Remove one of the two Under the Whispering Door entries
function removeOneDuplicate(books, title, author) {
  let firstIdx = -1;
  for (let i = 0; i < books.length; i++) {
    if (books[i].title === title && books[i].author === author) {
      if (firstIdx === -1) firstIdx = i;
      else return i;
    }
  }
  return -1;
}

// ── PRIMARY (existing authors) ────────────────────────────────────────────
const PRIMARY_ADDITIONS = [
  // Laura Lippman (3)
  { title: "Lady in the Lake", author: "Laura Lippman", pageCount: 352, genre: "Mystery", publicationDate: "2019", description: "A 1960s Baltimore housewife reinvents herself as a newspaper reporter and investigates the death of a Black cocktail waitress whose body was found in a city park fountain.", series: null, tier: 1, topRank: null },
  { title: "What the Dead Know", author: "Laura Lippman", pageCount: 400, genre: "Mystery", publicationDate: "2007", description: "Thirty years after two sisters vanish from a Baltimore mall, a woman in a car accident claims to be one of them — and everyone wants to know which sister she is.", series: null, tier: 1, topRank: null },
  { title: "And When She Was Good", author: "Laura Lippman", pageCount: 320, genre: "Thriller", publicationDate: "2012", description: "A successful madam in suburban Maryland sees a news story about another madam's murder — and realizes she needs to protect her young son from the same fate.", series: null, tier: 1, topRank: null },

  // Megan Abbott (2)
  { title: "Queenpin", author: "Megan Abbott", pageCount: 192, genre: "Mystery", publicationDate: "2007", description: "Abbott's Edgar-winning noir: a young woman is taken in by an aging female gangster in a mid-century betting-racket city and groomed to inherit her throne.", series: null, tier: 1, topRank: null },
  { title: "Bury Me Deep", author: "Megan Abbott", pageCount: 224, genre: "Mystery", publicationDate: "2009", description: "Abbott's novel of the real 1931 Winnie Ruth Judd 'Trunk Murderess' case: a demure Phoenix housewife and her wayward friends end up with two bodies in a trunk at Union Station.", series: null, tier: 1, topRank: null },

  // Sarah Waters (1)
  { title: "Affinity", author: "Sarah Waters", pageCount: 368, genre: "Historical Fiction", publicationDate: "1999", description: "Waters's second novel: a grieving Victorian lady visits a women's prison in Millbank and becomes obsessed with a convicted spiritualist who claims she can reach Margaret's dead father.", series: null, tier: 1, topRank: null },

  // Gretchen Felker-Martin (1)
  { title: "Cuckoo", author: "Gretchen Felker-Martin", pageCount: 384, genre: "Horror", publicationDate: "2024", description: "Felker-Martin's follow-up to Manhunt: a queer teen conversion-therapy retreat in the 1990s becomes the site of a horrifying body-swap among its attendees.", series: null, tier: 1, topRank: null },

  // Vince Flynn (3)
  { title: "Memorial Day", author: "Vince Flynn", pageCount: 416, genre: "Thriller", publicationDate: "2004", description: "Mitch Rapp #7: a terrorist attack is planned for a Memorial Day ceremony at Arlington National Cemetery, and Mitch Rapp must stop it at any cost.", series: { name: "Mitch Rapp", order: 7, total: 22 }, tier: 1, topRank: null },
  { title: "The Last Man", author: "Vince Flynn", pageCount: 432, genre: "Thriller", publicationDate: "2012", description: "Mitch Rapp #13: the CIA's top-secret asset in Afghanistan is kidnapped, and only Mitch Rapp has the clearance and the ruthlessness to bring him back.", series: { name: "Mitch Rapp", order: 13, total: 22 }, tier: 1, topRank: null },
  { title: "Term Limits", author: "Vince Flynn", pageCount: 512, genre: "Thriller", publicationDate: "1997", description: "Flynn's debut: a trio of disgruntled ex-military operators begin systematically assassinating corrupt politicians in Washington DC, triggering a constitutional crisis.", series: null, tier: 1, topRank: null },

  // TJ Klune (5)
  { title: "The Extraordinaries", author: "TJ Klune", pageCount: 416, genre: "Young Adult", publicationDate: "2020", description: "The first Extraordinaries novel: a gay teenage fanboy of a city's superhero discovers he has powers of his own — and his crush is the superhero.", series: { name: "The Extraordinaries", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Wolfsong", author: "TJ Klune", pageCount: 464, genre: "Romance", publicationDate: "2016", description: "The first Green Creek novel: a young man whose family has ties to a werewolf pack in the Oregon woods falls for the Alpha's son after years of being kept away.", series: { name: "Green Creek", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "Ravensong", author: "TJ Klune", pageCount: 496, genre: "Romance", publicationDate: "2018", description: "Green Creek #2: Gordo Livingstone, a witch-bonded tattoo artist, faces the return of the Alpha who left Green Creek years ago — and the feelings that never really went away.", series: { name: "Green Creek", order: 2, total: 4 }, tier: 1, topRank: null },
  { title: "Heartsong", author: "TJ Klune", pageCount: 496, genre: "Romance", publicationDate: "2019", description: "Green Creek #3: the timid pack member Robbie Fontaine discovers he is the rightful Alpha of a missing pack — and must choose between his newfound identity and his adopted family.", series: { name: "Green Creek", order: 3, total: 4 }, tier: 1, topRank: null },
  { title: "Brothersong", author: "TJ Klune", pageCount: 576, genre: "Romance", publicationDate: "2020", description: "Green Creek #4: Carter Bennett sets out to find his lost brother and confronts the dark family history that has always bound the Bennett pack.", series: { name: "Green Creek", order: 4, total: 4 }, tier: 1, topRank: null },
];

// ── REC LIBRARY (new authors) ────────────────────────────────────────────
const REC_LIBRARY_ADDITIONS = [
  // Scott Snyder (4)
  { title: "Wytches, Vol. 1", author: "Scott Snyder", pageCount: 144, genre: "Graphic Novel", publicationDate: "2015", description: "Snyder and Jock's folk horror comic: a family moves to a rural New England town to escape tragedy and discovers the woods are full of ancient witches who feed on human flesh.", series: { name: "Wytches", order: 1, total: 2 }, tier: 1, topRank: null },
  { title: "American Vampire, Vol. 1", author: "Scott Snyder", pageCount: 200, genre: "Graphic Novel", publicationDate: "2010", description: "Snyder and Rafael Albuquerque's Eisner-winning horror comic: a new uniquely American breed of vampire is born in the 1880s West, with the first arc co-written by Stephen King.", series: { name: "American Vampire", order: 1, total: 11 }, tier: 1, topRank: null },
  { title: "Batman: The Court of Owls", author: "Scott Snyder", pageCount: 176, genre: "Graphic Novel", publicationDate: "2012", description: "Snyder and Greg Capullo's New 52 Batman debut: Bruce Wayne discovers a hidden organization, the Court of Owls, has secretly ruled Gotham for centuries.", series: null, tier: 1, topRank: null },
  { title: "Undiscovered Country, Vol. 1", author: "Scott Snyder", pageCount: 144, genre: "Graphic Novel", publicationDate: "2020", description: "Snyder and Charles Soule's comic: thirty years after the United States walled itself off from the rest of the world, an international expedition crosses the border.", series: { name: "Undiscovered Country", order: 1, total: 3 }, tier: 1, topRank: null },

  // Jason Aaron (4)
  { title: "Scalped, Vol. 1: Indian Country", author: "Jason Aaron", pageCount: 128, genre: "Graphic Novel", publicationDate: "2007", description: "Aaron and R.M. Guera's crime comic: an undercover FBI agent returns to the Lakota reservation he grew up on to bring down the tribal chief running an illegal casino.", series: { name: "Scalped", order: 1, total: 10 }, tier: 1, topRank: null },
  { title: "Southern Bastards, Vol. 1: Here Was a Man", author: "Jason Aaron", pageCount: 128, genre: "Graphic Novel", publicationDate: "2014", description: "Aaron and Jason Latour's Southern noir: an aging Vietnam vet returns to his corrupt Alabama hometown to clean out his late father's house and walks into a very local war.", series: { name: "Southern Bastards", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "The Goddamned, Vol. 1: Before the Flood", author: "Jason Aaron", pageCount: 128, genre: "Graphic Novel", publicationDate: "2016", description: "Aaron and R.M. Guera's Old Testament comic: Cain, the first murderer, has been wandering a pre-Flood Earth for 1,600 years and finally meets a Noah he does not recognize.", series: null, tier: 1, topRank: null },
  { title: "Thor: God of Thunder, Vol. 1: The God Butcher", author: "Jason Aaron", pageCount: 136, genre: "Graphic Novel", publicationDate: "2013", description: "Aaron and Esad Ribić's landmark Thor run: three Thors from three different eras unite to fight Gorr, a god who has been systematically murdering gods across the universe.", series: null, tier: 1, topRank: null },

  // Tom King (4)
  { title: "The Vision", author: "Tom King", pageCount: 288, genre: "Graphic Novel", publicationDate: "2016", description: "King and Gabriel Hernandez Walta's award-winning Marvel mini: the synthetic Avenger Vision builds a family of androids and tries to settle into suburban normalcy.", series: null, tier: 1, topRank: null },
  { title: "Mister Miracle", author: "Tom King", pageCount: 320, genre: "Graphic Novel", publicationDate: "2017", description: "King and Mitch Gerads's Eisner-winning mini: the DC escape artist Scott Free attempts suicide, survives, and finds himself fighting a war in heaven while trying to be a dad.", series: null, tier: 1, topRank: null },
  { title: "The Sheriff of Babylon", author: "Tom King", pageCount: 312, genre: "Graphic Novel", publicationDate: "2015", description: "King and Mitch Gerads's Iraq war noir: a US ex-cop training police in post-Saddam Baghdad investigates the murder of one of his recruits.", series: null, tier: 1, topRank: null },
  { title: "Strange Adventures", author: "Tom King", pageCount: 352, genre: "Graphic Novel", publicationDate: "2020", description: "King, Mitch Gerads, and Doc Shaner's DC mini: Adam Strange returns from his interplanetary adventures to find his memoir being questioned and a war crimes accusation against him.", series: null, tier: 1, topRank: null },

  // Jonathan Hickman (4)
  { title: "East of West, Vol. 1: The Promise", author: "Jonathan Hickman", pageCount: 168, genre: "Graphic Novel", publicationDate: "2013", description: "Hickman and Nick Dragotta's alt-history sci-fi western: in a fractured America where the Civil War ended differently, the Four Horsemen of the Apocalypse ride again.", series: { name: "East of West", order: 1, total: 10 }, tier: 1, topRank: null },
  { title: "The Manhattan Projects, Vol. 1: Science, Bad", author: "Jonathan Hickman", pageCount: 144, genre: "Graphic Novel", publicationDate: "2012", description: "Hickman and Nick Pitarra's alternate-history comic: the Manhattan Project was a front for a much darker WWII research program involving aliens, interdimensional portals, and Einstein's parallel selves.", series: { name: "The Manhattan Projects", order: 1, total: 6 }, tier: 1, topRank: null },
  { title: "House of X / Powers of X", author: "Jonathan Hickman", pageCount: 448, genre: "Graphic Novel", publicationDate: "2019", description: "Hickman's relaunch of X-Men: Charles Xavier unifies mutants in a new nation-state on the living island of Krakoa and confronts the mathematical inevitability of mutant extinction.", series: null, tier: 1, topRank: null },
  { title: "The Black Monday Murders, Vol. 1", author: "Jonathan Hickman", pageCount: 168, genre: "Graphic Novel", publicationDate: "2016", description: "Hickman and Tomm Coker's occult finance comic: global capitalism is secretly run by four ancient houses of magic, and one of their leaders has just been ritually murdered.", series: { name: "The Black Monday Murders", order: 1, total: 2 }, tier: 1, topRank: null },

  // Wesley Chu (4)
  { title: "The Lives of Tao", author: "Wesley Chu", pageCount: 464, genre: "Sci-Fi", publicationDate: "2013", description: "The first Tao novel: an out-of-shape Chicago IT guy is unexpectedly chosen as the host for Tao, an ancient alien intelligence whose species has been hiding inside humans for thousands of years.", series: { name: "Tao", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "The Deaths of Tao", author: "Wesley Chu", pageCount: 464, genre: "Sci-Fi", publicationDate: "2014", description: "Tao #2: the two ancient alien factions have grown tired of hiding and are preparing to go to war across Earth in ways humanity cannot comprehend.", series: { name: "Tao", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Time Salvager", author: "Wesley Chu", pageCount: 384, genre: "Sci-Fi", publicationDate: "2015", description: "A burnt-out time-traveling salvager sent to retrieve resources from Earth's past violates the primary rule of his profession and saves a woman he was never supposed to meet.", series: null, tier: 1, topRank: null },
  { title: "The Art of Prophecy", author: "Wesley Chu", pageCount: 528, genre: "Fantasy", publicationDate: "2022", description: "The first War Arts Saga novel: the prophesied hero of the Zhuun kingdom is eight years old, already training for his destiny — and the prophecy is wrong.", series: { name: "War Arts Saga", order: 1, total: 3 }, tier: 1, topRank: null },

  // Rob Thurman (3)
  { title: "Nightlife", author: "Rob Thurman", pageCount: 384, genre: "Fantasy", publicationDate: "2006", description: "The first Cal Leandros novel: two brothers in New York hide from Cal's inhuman father and his Grendel kin while Cal's monstrous half begins to surface.", series: { name: "Cal Leandros", order: 1, total: 10 }, tier: 1, topRank: null },
  { title: "Moonshine", author: "Rob Thurman", pageCount: 320, genre: "Fantasy", publicationDate: "2007", description: "Cal Leandros #2: Cal and Niko are hired to retrieve a stolen artifact from a werewolf mob and discover the theft is part of a much bigger supernatural power grab.", series: { name: "Cal Leandros", order: 2, total: 10 }, tier: 1, topRank: null },
  { title: "Madhouse", author: "Rob Thurman", pageCount: 336, genre: "Fantasy", publicationDate: "2008", description: "Cal Leandros #3: a serial-killing revenant with a body count in the hundreds of thousands has returned to New York — and is looking for a specific brother to kill next.", series: { name: "Cal Leandros", order: 3, total: 10 }, tier: 1, topRank: null },

  // Mark Hodder (3)
  { title: "The Strange Affair of Spring Heeled Jack", author: "Mark Hodder", pageCount: 384, genre: "Sci-Fi", publicationDate: "2010", description: "The first Burton and Swinburne novel: in an alternate Victorian London, Sir Richard Francis Burton and poet Algernon Swinburne investigate the vigilante called Spring Heeled Jack.", series: { name: "Burton and Swinburne", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "The Curious Case of the Clockwork Man", author: "Mark Hodder", pageCount: 384, genre: "Sci-Fi", publicationDate: "2011", description: "Burton and Swinburne #2: Burton is asked to investigate a strange clockwork creature that has been discovered in Trafalgar Square.", series: { name: "Burton and Swinburne", order: 2, total: 5 }, tier: 1, topRank: null },
  { title: "Expedition to the Mountains of the Moon", author: "Mark Hodder", pageCount: 448, genre: "Sci-Fi", publicationDate: "2011", description: "Burton and Swinburne #3: Burton leads a steampunk expedition into East Africa in search of the source of the Nile and an enemy who has been manipulating time itself.", series: { name: "Burton and Swinburne", order: 3, total: 5 }, tier: 1, topRank: null },

  // Barry Eisler (4)
  { title: "Rain Fall", author: "Barry Eisler", pageCount: 352, genre: "Thriller", publicationDate: "2002", description: "The first John Rain novel: a half-Japanese assassin living in Tokyo who specializes in natural-looking deaths takes a hit on a government official and the case spirals into betrayal.", series: { name: "John Rain", order: 1, total: 10 }, tier: 1, topRank: null },
  { title: "Hard Rain", author: "Barry Eisler", pageCount: 336, genre: "Thriller", publicationDate: "2003", description: "John Rain #2: Rain is hired to take out a yakuza enforcer and must navigate the tensions between American, Japanese, and Korean intelligence services.", series: { name: "John Rain", order: 2, total: 10 }, tier: 1, topRank: null },
  { title: "Rain Storm", author: "Barry Eisler", pageCount: 336, genre: "Thriller", publicationDate: "2004", description: "John Rain #3: Rain is forced to work for the CIA on a hit in Macau that turns into a double-cross involving a Mossad agent.", series: { name: "John Rain", order: 3, total: 10 }, tier: 1, topRank: null },
  { title: "The Last Assassin", author: "Barry Eisler", pageCount: 352, genre: "Thriller", publicationDate: "2006", description: "John Rain #5: Rain returns to Tokyo and discovers he has a son — and that the boy's mother and other Rain enemies are converging.", series: { name: "John Rain", order: 5, total: 10 }, tier: 1, topRank: null },

  // Susan Hill (4)
  { title: "The Woman in Black", author: "Susan Hill", pageCount: 160, genre: "Horror", publicationDate: "1983", description: "Hill's classic ghost story: a young solicitor sent to settle the estate of a deceased recluse in an isolated English marsh town begins encountering the figure of a veiled woman in black.", series: null, tier: 1, topRank: null },
  { title: "The Mist in the Mirror", author: "Susan Hill", pageCount: 208, genre: "Horror", publicationDate: "1992", description: "A traveller returning to Victorian England begins to see a ghostly child in mirrors — and to trace a curse that has been following his family for generations.", series: null, tier: 1, topRank: null },
  { title: "Dolly", author: "Susan Hill", pageCount: 160, genre: "Horror", publicationDate: "2012", description: "Hill's short novel: two children spend a summer with their strict aunt in Fenlands England — and one of them brings home a porcelain doll that refuses to be forgotten.", series: null, tier: 1, topRank: null },
  { title: "The Man in the Picture", author: "Susan Hill", pageCount: 160, genre: "Horror", publicationDate: "2007", description: "An Oxford don's favorite painting of a Venetian carnival begins to contain a figure who wasn't there before — and then another, and another.", series: null, tier: 1, topRank: null },

  // Peter Ackroyd (4)
  { title: "Hawksmoor", author: "Peter Ackroyd", pageCount: 224, genre: "Fiction", publicationDate: "1985", description: "Ackroyd's Whitbread-winning novel: a contemporary London detective named Hawksmoor investigates a series of murders at the six churches designed by the 18th-century architect Nicholas Dyer — his fictional double.", series: null, tier: 1, topRank: null },
  { title: "The House of Doctor Dee", author: "Peter Ackroyd", pageCount: 288, genre: "Fiction", publicationDate: "1993", description: "A contemporary Londoner inherits a house in Clerkenwell that once belonged to the Elizabethan magician John Dee — and finds the 16th-century Dee has been waiting in it.", series: null, tier: 1, topRank: null },
  { title: "Dan Leno and the Limehouse Golem", author: "Peter Ackroyd", pageCount: 288, genre: "Mystery", publicationDate: "1994", description: "A series of ritualistic murders in Victorian London is attributed to the 'Limehouse Golem' — and the suspects include Karl Marx, George Gissing, and the music hall star Dan Leno.", series: null, tier: 1, topRank: null },
  { title: "The Casebook of Victor Frankenstein", author: "Peter Ackroyd", pageCount: 368, genre: "Fiction", publicationDate: "2008", description: "Ackroyd's Frankenstein reimagined: the young Victor Frankenstein arrives at Oxford in 1816 and befriends Percy Shelley — and his experiments begin in earnest.", series: null, tier: 1, topRank: null },

  // Eden Robinson (3)
  { title: "Monkey Beach", author: "Eden Robinson", pageCount: 384, genre: "Fiction", publicationDate: "2000", description: "A young Haisla woman from a coastal British Columbia village searches for her missing brother and is guided by the spirits she has been able to see since childhood.", series: null, tier: 1, topRank: null },
  { title: "Son of a Trickster", author: "Eden Robinson", pageCount: 336, genre: "Fiction", publicationDate: "2017", description: "The first Trickster Trilogy novel: a troubled Haisla teenager discovers his father is Wee'git the Trickster — and his inheritance is shifting everything around him.", series: { name: "Trickster Trilogy", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Trickster Drift", author: "Eden Robinson", pageCount: 368, genre: "Fiction", publicationDate: "2018", description: "Trickster Trilogy #2: Jared moves to Vancouver to escape his Trickster heritage and finds that the spirit world has followed him there.", series: { name: "Trickster Trilogy", order: 2, total: 3 }, tier: 1, topRank: null },

  // Rikki Ducornet (3)
  { title: "The Stain", author: "Rikki Ducornet", pageCount: 288, genre: "Fiction", publicationDate: "1984", description: "Ducornet's debut novel: a young girl in 19th-century rural France is marked from birth by a strange birthmark and drawn into a Bosch-like world of religious mysticism and cruelty.", series: null, tier: 1, topRank: null },
  { title: "The Fountains of Neptune", author: "Rikki Ducornet", pageCount: 272, genre: "Fiction", publicationDate: "1992", description: "Ducornet's fabulist novel: an 80-year-old man in a Brittany fishing village regains his childhood memories during a long coma, and lives inside them.", series: null, tier: 1, topRank: null },
  { title: "Phosphor in Dreamland", author: "Rikki Ducornet", pageCount: 160, genre: "Fiction", publicationDate: "1995", description: "A 17th-century man on a fictional Caribbean island invents the first camera — while a half-human, half-avian creature watches from the jungle.", series: null, tier: 1, topRank: null },

  // Maggie Shayne (3)
  { title: "Twilight Phantasies", author: "Maggie Shayne", pageCount: 256, genre: "Romance", publicationDate: "1993", description: "The first Wings in the Night novel: a Chicago psychiatrist falls for a patient who insists he is a vampire — and slowly realizes he may be telling the truth.", series: { name: "Wings in the Night", order: 1, total: 23 }, tier: 1, topRank: null },
  { title: "Blue Twilight", author: "Maggie Shayne", pageCount: 304, genre: "Romance", publicationDate: "2005", description: "Wings in the Night #9: a vampire novelist and a mortal woman with a dark secret are drawn together by an ancient enemy from their past lives.", series: { name: "Wings in the Night", order: 9, total: 23 }, tier: 1, topRank: null },
  { title: "Prince of Twilight", author: "Maggie Shayne", pageCount: 336, genre: "Romance", publicationDate: "2006", description: "Wings in the Night #13: a vampire prince locked in an eternal search for his lost bride is finally reunited with her — in a body he does not recognize.", series: { name: "Wings in the Night", order: 13, total: 23 }, tier: 1, topRank: null },

  // Michelle Paver (3)
  { title: "Dark Matter", author: "Michelle Paver", pageCount: 256, genre: "Horror", publicationDate: "2010", description: "Paver's Arctic ghost story: a 1937 British scientific expedition to Spitsbergen shrinks to a single man who winters alone in the dark — and begins to feel something else in the cabin with him.", series: null, tier: 1, topRank: null },
  { title: "Thin Air", author: "Michelle Paver", pageCount: 288, genre: "Horror", publicationDate: "2016", description: "A 1935 mountaineering expedition to Kangchenjunga discovers something unseen waiting at the base of the death zone.", series: null, tier: 1, topRank: null },
  { title: "Wakenhyrst", author: "Michelle Paver", pageCount: 368, genre: "Horror", publicationDate: "2019", description: "Paver's gothic novel of an Edwardian Suffolk estate where a young woman watches her antiquarian father descend into obsession with a medieval painted panel in the local church.", series: null, tier: 1, topRank: null },

  // Stephen Hunt (3)
  { title: "The Court of the Air", author: "Stephen Hunt", pageCount: 592, genre: "Sci-Fi", publicationDate: "2007", description: "The first Jackelian novel: two orphans in an alternate-Victorian kingdom of Jackals are drawn into a conspiracy involving ancient gods, steam-powered constructs, and the mysterious Court of the Air.", series: { name: "Jackelian", order: 1, total: 7 }, tier: 1, topRank: null },
  { title: "The Kingdom Beyond the Waves", author: "Stephen Hunt", pageCount: 560, genre: "Sci-Fi", publicationDate: "2008", description: "Jackelian #2: a disgraced professor leads an expedition into a hidden ancient civilization — with the Court of the Air and a criminal cartel both pursuing her.", series: { name: "Jackelian", order: 2, total: 7 }, tier: 1, topRank: null },
  { title: "The Rise of the Iron Moon", author: "Stephen Hunt", pageCount: 512, genre: "Sci-Fi", publicationDate: "2009", description: "Jackelian #3: the Kingdom of Jackals faces an invasion from the skies by an alien army that has emerged from the depths of space — and refuses to negotiate.", series: { name: "Jackelian", order: 3, total: 7 }, tier: 1, topRank: null },

  // Rick Remender (3)
  { title: "Deadly Class, Vol. 1: Reagan Youth", author: "Rick Remender", pageCount: 160, genre: "Graphic Novel", publicationDate: "2014", description: "Remender and Wes Craig's comic: a homeless teenager in 1987 San Francisco is recruited to a secret high school for the children of international criminal organizations.", series: { name: "Deadly Class", order: 1, total: 10 }, tier: 1, topRank: null },
  { title: "Black Science, Vol. 1: How to Fall Forever", author: "Rick Remender", pageCount: 144, genre: "Graphic Novel", publicationDate: "2013", description: "Remender and Matteo Scalera's comic: an anarchist scientist breaks through the membrane between dimensions and is trapped forever — along with his reluctant team and his children.", series: { name: "Black Science", order: 1, total: 9 }, tier: 1, topRank: null },
  { title: "LOW, Vol. 1: The Delirium of Hope", author: "Rick Remender", pageCount: 144, genre: "Graphic Novel", publicationDate: "2014", description: "Remender and Greg Tocchini's comic: after humanity has fled to the ocean depths of a dying Earth, the last underwater city receives a probe from the surface — and a reason to hope.", series: { name: "LOW", order: 1, total: 3 }, tier: 1, topRank: null },

  // Matt Fraction (3)
  { title: "Hawkeye, Vol. 1: My Life as a Weapon", author: "Matt Fraction", pageCount: 136, genre: "Graphic Novel", publicationDate: "2013", description: "Fraction and David Aja's Eisner-winning Marvel run: the Avenger Clint Barton deals with 'what Hawkeye does when he's not being an Avenger' in a grimy NYC apartment building.", series: { name: "Hawkeye", order: 1, total: 6 }, tier: 1, topRank: null },
  { title: "Sex Criminals, Vol. 1: One Weird Trick", author: "Matt Fraction", pageCount: 128, genre: "Graphic Novel", publicationDate: "2014", description: "Fraction and Chip Zdarsky's comic: a librarian and a porn actor discover they can both stop time during orgasms — and use the ability to rob banks.", series: { name: "Sex Criminals", order: 1, total: 6 }, tier: 1, topRank: null },
  { title: "Casanova, Vol. 1: Luxuria", author: "Matt Fraction", pageCount: 152, genre: "Graphic Novel", publicationDate: "2006", description: "Fraction and Gabriel Bá's cult comic: Casanova Quinn, son of a spy-agency director, is kidnapped from his own dimension by a parallel self and recruited into the rival agency.", series: { name: "Casanova", order: 1, total: 4 }, tier: 1, topRank: null },

  // Kelly Sue DeConnick (3)
  { title: "Bitch Planet, Vol. 1: Extraordinary Machine", author: "Kelly Sue DeConnick", pageCount: 160, genre: "Graphic Novel", publicationDate: "2015", description: "DeConnick and Valentine De Landro's feminist SF: in a distant-future society, women who refuse to comply are sent to an off-world prison called Bitch Planet.", series: { name: "Bitch Planet", order: 1, total: 2 }, tier: 1, topRank: null },
  { title: "Pretty Deadly, Vol. 1: The Shrike", author: "Kelly Sue DeConnick", pageCount: 120, genre: "Graphic Novel", publicationDate: "2014", description: "DeConnick and Emma Ríos's weird western: Death's daughter Ginny, the Reaper of Vengeance, travels an old-West landscape hunting and being hunted.", series: { name: "Pretty Deadly", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Captain Marvel: In Pursuit of Flight", author: "Kelly Sue DeConnick", pageCount: 136, genre: "Graphic Novel", publicationDate: "2012", description: "DeConnick's Carol Danvers relaunch: Carol takes up the mantle of Captain Marvel and reckons with the Kree legacy that gave her her powers.", series: null, tier: 1, topRank: null },

  // Greg Rucka (4)
  { title: "Lazarus, Vol. 1: Family", author: "Greg Rucka", pageCount: 104, genre: "Graphic Novel", publicationDate: "2013", description: "Rucka and Michael Lark's comic: in a future where sixteen wealthy families rule the world, each family has a 'Lazarus' — a superpowered enforcer who cannot permanently die.", series: { name: "Lazarus", order: 1, total: 6 }, tier: 1, topRank: null },
  { title: "Queen & Country, Vol. 1", author: "Greg Rucka", pageCount: 128, genre: "Graphic Novel", publicationDate: "2001", description: "Rucka's British intelligence comic: a Minder for the Special Operations Section of SIS takes on deniable jobs across the globe — a Bond for a grittier decade.", series: { name: "Queen & Country", order: 1, total: 11 }, tier: 1, topRank: null },
  { title: "Gotham Central, Vol. 1: In the Line of Duty", author: "Greg Rucka", pageCount: 208, genre: "Graphic Novel", publicationDate: "2004", description: "Rucka and Ed Brubaker's Batman-adjacent comic: the normal Gotham City police detectives work homicides in a city where superheroes and supervillains are just part of the scene.", series: null, tier: 1, topRank: null },
  { title: "A Fistful of Rain", author: "Greg Rucka", pageCount: 288, genre: "Thriller", publicationDate: "2003", description: "Rucka's noir novel: a female roadie for a major rock band goes home to Oregon when her famous rock-star father dies, and finds herself the target of a kidnapper.", series: null, tier: 1, topRank: null },

  // Gail Simone (3)
  { title: "Secret Six, Vol. 1: Villains United", author: "Gail Simone", pageCount: 192, genre: "Graphic Novel", publicationDate: "2006", description: "Simone's DC run: a team of six cursed supervillains band together for self-preservation and take on more powerful villains for hire.", series: { name: "Secret Six", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "Birds of Prey, Vol. 1: Of Like Minds", author: "Gail Simone", pageCount: 144, genre: "Graphic Novel", publicationDate: "2003", description: "Simone's genre-defining Birds of Prey run: Oracle coordinates a team of female DC heroes on operations too delicate for the Justice League.", series: { name: "Birds of Prey", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Clean Room, Vol. 1: Immaculate Conception", author: "Gail Simone", pageCount: 168, genre: "Graphic Novel", publicationDate: "2016", description: "Simone's horror comic: an investigative reporter whose fiancé killed himself after reading a self-help book investigates the mysterious organization behind it.", series: { name: "Clean Room", order: 1, total: 3 }, tier: 1, topRank: null },

  // Mur Lafferty (3)
  { title: "Six Wakes", author: "Mur Lafferty", pageCount: 384, genre: "Sci-Fi", publicationDate: "2017", description: "A six-person clone crew on a generation ship wake to find that their current bodies are murdered — and the ship's AI has erased the last 25 years of their memories.", series: null, tier: 1, topRank: null },
  { title: "The Shambling Guide to New York City", author: "Mur Lafferty", pageCount: 368, genre: "Fantasy", publicationDate: "2013", description: "A travel writer in post-recession New York takes a job editing a guidebook for supernatural tourists and discovers the city is full of coterie — zombies, vampires, and other 'coterie.'", series: { name: "Shambling Guides", order: 1, total: 2 }, tier: 1, topRank: null },
  { title: "Solo: A Star Wars Story", author: "Mur Lafferty", pageCount: 416, genre: "Sci-Fi", publicationDate: "2018", description: "Lafferty's novelization of the Han Solo origin film, expanded with extra scenes and internal monologue.", series: null, tier: 1, topRank: null },

  // Lauren Beukes (4)
  { title: "The Shining Girls", author: "Lauren Beukes", pageCount: 384, genre: "Thriller", publicationDate: "2013", description: "Beukes's breakout novel: a time-traveling serial killer in 1930s Chicago moves through decades hunting 'shining' women — until one of his victims survives and begins hunting him back.", series: null, tier: 1, topRank: null },
  { title: "Zoo City", author: "Lauren Beukes", pageCount: 368, genre: "Fantasy", publicationDate: "2010", description: "Beukes's Arthur C. Clarke Award-winning novel: in an alternate Johannesburg, criminals are magically bonded to animal familiars as a mark of their guilt — and finding lost people becomes one woman's specialty.", series: null, tier: 1, topRank: null },
  { title: "Broken Monsters", author: "Lauren Beukes", pageCount: 448, genre: "Thriller", publicationDate: "2014", description: "A Detroit detective investigates a bizarre murder — a boy's upper body grafted to the lower body of a deer — and discovers a killer trying to make art out of death.", series: null, tier: 1, topRank: null },
  { title: "Afterland", author: "Lauren Beukes", pageCount: 416, genre: "Sci-Fi", publicationDate: "2020", description: "A near-future pandemic has killed almost every man on Earth. One mother smuggles her surviving son cross-country, pretending he's a girl, as she is hunted by people who want him for his body.", series: null, tier: 1, topRank: null },

  // Sarah Rayne (3)
  { title: "Tower of Silence", author: "Sarah Rayne", pageCount: 384, genre: "Thriller", publicationDate: "2003", description: "Rayne's psychological thriller: a respected academic becomes obsessed with the truth behind a Tower of Silence — a Zoroastrian death tower — and the woman who vanished from it.", series: null, tier: 1, topRank: null },
  { title: "A Dark Dividing", author: "Sarah Rayne", pageCount: 416, genre: "Thriller", publicationDate: "2004", description: "A pair of conjoined twins separated in childhood become the center of a haunting, generations-spanning mystery at an abandoned Shropshire estate.", series: null, tier: 1, topRank: null },
  { title: "Ghost Song", author: "Sarah Rayne", pageCount: 416, genre: "Thriller", publicationDate: "2009", description: "A Victorian London music hall reopens for the first time in nearly a century — and the ghosts of its missing performers begin to manifest.", series: null, tier: 1, topRank: null },

  // Amber Sparks (3)
  { title: "The Unfinished World", author: "Amber Sparks", pageCount: 224, genre: "Fiction", publicationDate: "2016", description: "Sparks's second collection: fourteen strange, lyrical stories of unfinished lives — time travel, ghosts, unlikely sisters, and the moments that never quite happened.", series: null, tier: 1, topRank: null },
  { title: "And I Do Not Forgive You", author: "Amber Sparks", pageCount: 208, genre: "Fiction", publicationDate: "2020", description: "Sparks's story collection of contemporary feminist fables: women navigating haunted houses, runaway ghosts, and the occasional apocalypse.", series: null, tier: 1, topRank: null },
  { title: "The Desert Places", author: "Amber Sparks", pageCount: 128, genre: "Fiction", publicationDate: "2013", description: "Sparks and Robert Kloss's hybrid novel of prose and illustration: the story of the first human murderer narrated in a high-strange tone by a cosmic observer.", series: null, tier: 1, topRank: null },

  // Chip Zdarsky (3)
  { title: "Daredevil: Know Fear", author: "Chip Zdarsky", pageCount: 136, genre: "Graphic Novel", publicationDate: "2019", description: "Zdarsky and Marco Checchetto's Daredevil run: Matt Murdock, recovering from near-death injuries, kills a man in a confrontation and must decide who he really is.", series: null, tier: 1, topRank: null },
  { title: "Public Domain, Vol. 1", author: "Chip Zdarsky", pageCount: 144, genre: "Graphic Novel", publicationDate: "2022", description: "Zdarsky's creator-owned comic: a cartoonist whose forgotten superhero character has become the basis of a billion-dollar film franchise finally decides to take his creation back.", series: { name: "Public Domain", order: 1, total: 2 }, tier: 1, topRank: null },
  { title: "Afterlift", author: "Chip Zdarsky", pageCount: 112, genre: "Graphic Novel", publicationDate: "2020", description: "Zdarsky and Jason Loo's graphic novel: a rideshare driver accepts a late-night fare that turns out to be carrying a passenger from one plane of existence to another.", series: null, tier: 1, topRank: null },
];

// ── Apply PRIMARY ──
const data = JSON.parse(fs.readFileSync(CATALOG, "utf8"));
let books = Array.isArray(data) ? data : (data.books || Object.values(data).find(v => Array.isArray(v)));
const beforeP = books.length;

// Remove the duplicate Under the Whispering Door (keep the first)
const dupIdx = removeOneDuplicate(books, "Under the Whispering Door", "TJ Klune");
if (dupIdx !== -1) {
  console.log(`  ✓ removing dupe: "Under the Whispering Door" — TJ Klune`);
  books.splice(dupIdx, 1);
}

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
console.log(`\nPRIMARY: +${primaryAdd.length} -${dupIdx !== -1 ? 1 : 0}, ${beforeP} → ${nextBooks.length}`);

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
