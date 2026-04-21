const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

// Duplicate in primary to remove
const DELETE = [
  { title: "The Magician's Guild", author: "Trudi Canavan" }, // keep "The Magicians' Guild"
];

// ── PRIMARY (existing authors) ────────────────────────────────────────────
const PRIMARY_ADDITIONS = [
  // Dave Duncan (3)
  { title: "The Gilded Chain", author: "Dave Duncan", pageCount: 432, genre: "Fantasy", publicationDate: "1998", description: "The first King's Blades novel: a young swordsman is bound to his ward with a magical blade through the heart, and a lifetime of loyalty begins.", series: { name: "King's Blades", order: 1, total: 6 }, tier: 1, topRank: null },
  { title: "Lord of the Fire Lands", author: "Dave Duncan", pageCount: 448, genre: "Fantasy", publicationDate: "1999", description: "King's Blades #2: a runaway heir to the Fire Lands throne and a loyal Blade must navigate political intrigue while facing the prospect of being bound against his will.", series: { name: "King's Blades", order: 2, total: 6 }, tier: 1, topRank: null },
  { title: "Sky of Swords", author: "Dave Duncan", pageCount: 432, genre: "Fantasy", publicationDate: "2000", description: "King's Blades #3: Queen Malinda recounts the political intrigues that led her to the throne of Chivial and the strange magical ritual binding the Blades.", series: { name: "King's Blades", order: 3, total: 6 }, tier: 1, topRank: null },

  // Trudi Canavan (3)
  { title: "Priestess of the White", author: "Trudi Canavan", pageCount: 576, genre: "Fantasy", publicationDate: "2005", description: "The first Age of the Five novel: a young country girl is chosen as one of the Five Voices of the White Gods and drawn into a world of politics, magic, and prophecy.", series: { name: "Age of the Five", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Last of the Wilds", author: "Trudi Canavan", pageCount: 672, genre: "Fantasy", publicationDate: "2006", description: "Age of the Five #2: Auraya's confidence in the White Gods begins to crack as she learns more about the Pentadrian enemy and the Wilds — those who still follow other gods.", series: { name: "Age of the Five", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Voice of the Gods", author: "Trudi Canavan", pageCount: 672, genre: "Fantasy", publicationDate: "2006", description: "Age of the Five #3: the truth about the Circlians and the Pentadrians finally comes out, and Auraya must decide whose side of the war is worth fighting on.", series: { name: "Age of the Five", order: 3, total: 3 }, tier: 1, topRank: null },

  // Brian Aldiss (2)
  { title: "Frankenstein Unbound", author: "Brian Aldiss", pageCount: 224, genre: "Sci-Fi", publicationDate: "1973", description: "Aldiss's time-travel novel: a 21st-century American displaced by a quantum disturbance arrives in 1816 Geneva, where he meets Mary Shelley and the real Victor Frankenstein.", series: null, tier: 1, topRank: null },
  { title: "Report on Probability A", author: "Brian Aldiss", pageCount: 176, genre: "Sci-Fi", publicationDate: "1968", description: "A New Wave experimental novel: three men observe a woman in a house, observed by observers in another world, observed by still others — Aldiss's meta-fictional nesting doll.", series: null, tier: 1, topRank: null },

  // Hal Clement (2)
  { title: "Iceworld", author: "Hal Clement", pageCount: 192, genre: "Sci-Fi", publicationDate: "1953", description: "Clement's second novel: sulfuric-breathing aliens from a hot world trade with the 'iceworld' Earth, which their own biology finds deadly cold.", series: null, tier: 1, topRank: null },
  { title: "Cycle of Fire", author: "Hal Clement", pageCount: 192, genre: "Sci-Fi", publicationDate: "1957", description: "A human and an alien stranded on an eccentric-orbit world must work together to survive both a scorching summer and a frozen winter that will last decades.", series: null, tier: 1, topRank: null },

  // Kate Wilhelm (2)
  { title: "The Infinity Box", author: "Kate Wilhelm", pageCount: 272, genre: "Sci-Fi", publicationDate: "1971", description: "Wilhelm's early story collection of quietly unnerving SF: the title novella of a man who discovers he can project his consciousness into another's mind and gradually take over.", series: null, tier: 1, topRank: null },
  { title: "Margaret and I", author: "Kate Wilhelm", pageCount: 224, genre: "Sci-Fi", publicationDate: "1971", description: "A woman in a collapsing marriage begins hearing her own inner voice as a separate person — Wilhelm's short psychological SF novel of a doubled self.", series: null, tier: 1, topRank: null },

  // Ian McDonald (2)
  { title: "Brasyl", author: "Ian McDonald", pageCount: 400, genre: "Sci-Fi", publicationDate: "2007", description: "Three timelines in Brazil — 1732, 2006, and 2032 — weave together through a multiverse theory novel that uses the country's cultural textures as its quantum physics.", series: null, tier: 1, topRank: null },
  { title: "Desolation Road", author: "Ian McDonald", pageCount: 384, genre: "Sci-Fi", publicationDate: "1988", description: "McDonald's debut: a magical-realist Mars novel tracing the founding and rise of a desert town populated by impossible characters.", series: null, tier: 1, topRank: null },

  // Scott Westerfeld (4)
  { title: "Leviathan", author: "Scott Westerfeld", pageCount: 448, genre: "Young Adult", publicationDate: "2009", description: "The first Leviathan novel: an alternate WWI where the Allies fight with biotechnology (living ships and animals) and the Central Powers with mechanical walkers.", series: { name: "Leviathan", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Behemoth", author: "Scott Westerfeld", pageCount: 496, genre: "Young Adult", publicationDate: "2010", description: "Leviathan #2: the British airship Leviathan arrives in neutral Istanbul, where Deryn and Alek must navigate an Ottoman political crisis.", series: { name: "Leviathan", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Goliath", author: "Scott Westerfeld", pageCount: 544, genre: "Young Adult", publicationDate: "2011", description: "Leviathan #3: the Leviathan crosses Russia and North America as Nikola Tesla reveals a superweapon that could end the war — and as Deryn's secret is discovered.", series: { name: "Leviathan", order: 3, total: 3 }, tier: 1, topRank: null },
  { title: "Afterworlds", author: "Scott Westerfeld", pageCount: 608, genre: "Young Adult", publicationDate: "2014", description: "A dual narrative: a teenage YA novelist writing her first paranormal romance, and the actual novel she is writing, with its heroine who survives a terrorist attack.", series: null, tier: 1, topRank: null },

  // Bentley Little (3)
  { title: "The Town", author: "Bentley Little", pageCount: 480, genre: "Horror", publicationDate: "2000", description: "A family moves to an isolated Arizona community that turns out to be populated by Molokans — an obscure Russian religious sect whose spirit-world is very real.", series: null, tier: 1, topRank: null },
  { title: "The House", author: "Bentley Little", pageCount: 384, genre: "Horror", publicationDate: "1998", description: "Five people from across the country discover they each grew up in a different haunted house — and the houses are calling them all back on the same weekend.", series: null, tier: 1, topRank: null },
  { title: "The Collection", author: "Bentley Little", pageCount: 400, genre: "Horror", publicationDate: "2002", description: "Little's story collection: thirty-two short tales of American suburban and rural horror — from haunted laundromats to small-town secrets.", series: null, tier: 1, topRank: null },

  // John Connolly (3)
  { title: "The Whisperers", author: "John Connolly", pageCount: 432, genre: "Thriller", publicationDate: "2010", description: "Charlie Parker #9: a wave of post-Iraq veteran suicides in northern Maine leads Parker to a smuggling ring — and to the ancient evil the smugglers unknowingly carry.", series: { name: "Charlie Parker", order: 9, total: 22 }, tier: 1, topRank: null },
  { title: "The Burning Soul", author: "John Connolly", pageCount: 432, genre: "Thriller", publicationDate: "2011", description: "Charlie Parker #10: Parker is hired to protect a man whose past has caught up with him, while a missing girl case in a small Maine town turns into something much darker.", series: { name: "Charlie Parker", order: 10, total: 22 }, tier: 1, topRank: null },
  { title: "Nocturnes", author: "John Connolly", pageCount: 432, genre: "Horror", publicationDate: "2004", description: "Connolly's first story collection: thirteen supernatural tales, including 'The Cancer Cowboy Rides' and 'The Reflecting Eye' — with a Charlie Parker novella at its center.", series: null, tier: 1, topRank: null },

  // Mark Z. Danielewski (2)
  { title: "Only Revolutions", author: "Mark Z. Danielewski", pageCount: 360, genre: "Fiction", publicationDate: "2006", description: "Danielewski's second novel: two 16-year-old lovers on a cross-country road trip tell their story from opposite ends of the book, converging in the middle.", series: null, tier: 1, topRank: null },
  { title: "The Fifty Year Sword", author: "Mark Z. Danielewski", pageCount: 304, genre: "Horror", publicationDate: "2012", description: "A Halloween ghost story told through five differently-colored voices at a child's birthday party — Danielewski's tight, bone-clear little horror.", series: null, tier: 1, topRank: null },

  // Leigh Brackett (2)
  { title: "The Big Jump", author: "Leigh Brackett", pageCount: 128, genre: "Sci-Fi", publicationDate: "1955", description: "The first ship to return from an interstellar expedition carries a single unresponsive survivor — and the corporate family hiring the investigation wants the truth hidden.", series: null, tier: 1, topRank: null },
  { title: "The Starmen of Llyrdis", author: "Leigh Brackett", pageCount: 192, genre: "Sci-Fi", publicationDate: "1952", description: "A human discovers he is descended from the star-faring Vardda of Llyrdis — and must choose between his human life and the cosmic birthright he never asked for.", series: null, tier: 1, topRank: null },

  // C.L. Moore (2)
  { title: "Doomsday Morning", author: "C.L. Moore", pageCount: 256, genre: "Sci-Fi", publicationDate: "1957", description: "Moore's novel of a 21st-century America ruled by a benevolent but absolute mass-communication network — and the actor who becomes the instrument of its undoing.", series: null, tier: 1, topRank: null },
  { title: "Judgment Night", author: "C.L. Moore", pageCount: 272, genre: "Sci-Fi", publicationDate: "1952", description: "A collection of Moore's major novellas including the title novella — a space opera of a decadent empire's princess standing against an interstellar invasion.", series: null, tier: 1, topRank: null },

  // Catherine Asaro (2)
  { title: "The Last Hawk", author: "Catherine Asaro", pageCount: 432, genre: "Sci-Fi", publicationDate: "1997", description: "A Skolian Empire pilot crash-lands on a world where the all-female ruling caste holds men in ritual bondage — and finds himself bound to eleven consecutive dominant women.", series: { name: "Skolian Empire", order: null, total: 17 }, tier: 1, topRank: null },
  { title: "Spherical Harmonic", author: "Catherine Asaro", pageCount: 400, genre: "Sci-Fi", publicationDate: "2001", description: "A Skolian Empire novel: Dyhianna Selei, the Imperator's sister, navigates a political crisis while also being a quantum-mathematics physicist in her own right.", series: { name: "Skolian Empire", order: null, total: 17 }, tier: 1, topRank: null },
];

// ── REC LIBRARY (new authors) ────────────────────────────────────────────
const REC_LIBRARY_ADDITIONS = [
  // Matthew Stover (4)
  { title: "Heroes Die", author: "Matthew Stover", pageCount: 560, genre: "Fantasy", publicationDate: "1998", description: "The first Acts of Caine novel: an Earth entertainment star whose fictional persona is an actual fantasy-world assassin must rescue his estranged wife from the same world he's been killing in for years.", series: { name: "Acts of Caine", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "Blade of Tyshalle", author: "Matthew Stover", pageCount: 752, genre: "Fantasy", publicationDate: "2001", description: "Acts of Caine #2: Hari Michaelson, crippled in the events of Heroes Die, navigates an Earth bureaucracy while his alter ego Caine's fantasy world faces genocidal invasion.", series: { name: "Acts of Caine", order: 2, total: 4 }, tier: 1, topRank: null },
  { title: "Caine Black Knife", author: "Matthew Stover", pageCount: 432, genre: "Fantasy", publicationDate: "2008", description: "Acts of Caine #3: Caine returns to the fantasy world of his breakout film to finally confront what he did on that original mission twenty years ago.", series: { name: "Acts of Caine", order: 3, total: 4 }, tier: 1, topRank: null },
  { title: "Caine's Law", author: "Matthew Stover", pageCount: 384, genre: "Fantasy", publicationDate: "2012", description: "Acts of Caine #4: the conclusion of Stover's grimdark saga as Caine must choose between his Earth family and the fantasy world that has become his conscience.", series: { name: "Acts of Caine", order: 4, total: 4 }, tier: 1, topRank: null },

  // Stephen R. Lawhead (4)
  { title: "Taliesin", author: "Stephen R. Lawhead", pageCount: 480, genre: "Historical Fiction", publicationDate: "1987", description: "The first Pendragon Cycle novel: a Welsh bard and an Atlantean princess conceive the boy who will become Merlin — the grandfather of King Arthur.", series: { name: "Pendragon Cycle", order: 1, total: 6 }, tier: 1, topRank: null },
  { title: "Merlin", author: "Stephen R. Lawhead", pageCount: 480, genre: "Historical Fiction", publicationDate: "1988", description: "Pendragon Cycle #2: the life of Merlin from his Druid boyhood through his madness and the raising of Arthur — Lawhead's Celtic-historical Arthurian.", series: { name: "Pendragon Cycle", order: 2, total: 6 }, tier: 1, topRank: null },
  { title: "Arthur", author: "Stephen R. Lawhead", pageCount: 480, genre: "Historical Fiction", publicationDate: "1989", description: "Pendragon Cycle #3: the reign of Arthur as told by three successive narrators — Pelleas, Bedwyr, and Aneirin — the most ambitious volume of the cycle.", series: { name: "Pendragon Cycle", order: 3, total: 6 }, tier: 1, topRank: null },
  { title: "Byzantium", author: "Stephen R. Lawhead", pageCount: 848, genre: "Historical Fiction", publicationDate: "1996", description: "An Irish monk carrying the Book of Kells to the Byzantine emperor is shipwrecked and sold into slavery — and his journey through the medieval world becomes a spiritual odyssey.", series: null, tier: 1, topRank: null },

  // Kristen Britain (3)
  { title: "Green Rider", author: "Kristen Britain", pageCount: 480, genre: "Fantasy", publicationDate: "1998", description: "The first Green Rider novel: a schoolgirl fleeing expulsion encounters a dying king's messenger and inherits his mission to carry a critical message across the kingdom.", series: { name: "Green Rider", order: 1, total: 7 }, tier: 1, topRank: null },
  { title: "First Rider's Call", author: "Kristen Britain", pageCount: 688, genre: "Fantasy", publicationDate: "2003", description: "Green Rider #2: Karigan G'ladheon returns to Sacoridia and finds the magical wall that has protected the kingdom for centuries beginning to fail.", series: { name: "Green Rider", order: 2, total: 7 }, tier: 1, topRank: null },
  { title: "The High King's Tomb", author: "Kristen Britain", pageCount: 768, genre: "Fantasy", publicationDate: "2007", description: "Green Rider #3: Karigan confronts an awakening ancient evil while the kingdom is plagued by a series of magical thefts from its most sacred burial site.", series: { name: "Green Rider", order: 3, total: 7 }, tier: 1, topRank: null },

  // Melanie Rawn (3)
  { title: "Dragon Prince", author: "Melanie Rawn", pageCount: 576, genre: "Fantasy", publicationDate: "1988", description: "The first Dragon Prince novel: a young prince who refuses to hunt dragons inherits his throne and must navigate a political minefield to marry his prophesied consort.", series: { name: "Dragon Prince", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "The Star Scroll", author: "Melanie Rawn", pageCount: 608, genre: "Fantasy", publicationDate: "1989", description: "Dragon Prince #2: the discovery of a lost star scroll threatens to return ancient dangerous sorcery to the Desert kingdoms.", series: { name: "Dragon Prince", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Sunrunner's Fire", author: "Melanie Rawn", pageCount: 624, genre: "Fantasy", publicationDate: "1990", description: "Dragon Prince #3: the conclusion of the original trilogy as Andry of Graypearl rises to claim his destiny as Lord of Goddess Keep.", series: { name: "Dragon Prince", order: 3, total: 3 }, tier: 1, topRank: null },

  // Sharon Shinn (3)
  { title: "Archangel", author: "Sharon Shinn", pageCount: 400, genre: "Fantasy", publicationDate: "1996", description: "The first Samaria novel: on a world where angels rule as God's intermediaries, the reluctant next Archangel must find his prophesied human bride among the slave caste.", series: { name: "Samaria", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "Jovah's Angel", author: "Sharon Shinn", pageCount: 384, genre: "Fantasy", publicationDate: "1997", description: "Samaria #2: 150 years after Archangel, a hurt angel and an engineer investigate why the god Jovah no longer seems to answer the angels' songs.", series: { name: "Samaria", order: 2, total: 5 }, tier: 1, topRank: null },
  { title: "The Alleluia Files", author: "Sharon Shinn", pageCount: 416, genre: "Fantasy", publicationDate: "1998", description: "Samaria #3: a group of heretics searches for ancient data files that may reveal the true nature of Jovah — and shatter the theocratic order of the angels.", series: { name: "Samaria", order: 3, total: 5 }, tier: 1, topRank: null },

  // Fiona McIntosh (3)
  { title: "Myrren's Gift", author: "Fiona McIntosh", pageCount: 576, genre: "Fantasy", publicationDate: "2003", description: "The first Quickening trilogy: a young Morgravian general inherits a dying witch's strange gift and finds himself able to trade bodies with another man at will.", series: { name: "The Quickening", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Blood and Memory", author: "Fiona McIntosh", pageCount: 560, genre: "Fantasy", publicationDate: "2004", description: "The Quickening #2: Wyl Thirsk uses the witch's gift to survive assassination attempt after assassination attempt, each time waking in another body.", series: { name: "The Quickening", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Bridge of Souls", author: "Fiona McIntosh", pageCount: 560, genre: "Fantasy", publicationDate: "2005", description: "The Quickening #3: the final confrontation with the king who betrayed Wyl and the reckoning with the witch's curse that has preserved him.", series: { name: "The Quickening", order: 3, total: 3 }, tier: 1, topRank: null },

  // Ian Cameron Esslemont (3)
  { title: "Night of Knives", author: "Ian Cameron Esslemont", pageCount: 320, genre: "Fantasy", publicationDate: "2004", description: "The first Malazan Empire novel: set on the island of Malaz on the Shadow Moon night, a young initiate witnesses the event that will reshape the empire's leadership.", series: { name: "Novels of the Malazan Empire", order: 1, total: 6 }, tier: 1, topRank: null },
  { title: "Return of the Crimson Guard", author: "Ian Cameron Esslemont", pageCount: 720, genre: "Fantasy", publicationDate: "2008", description: "Malazan Empire #2: the ancient mercenary Crimson Guard return to Quon Tali after their century-long vow is fulfilled — and find the empire they vowed to destroy greatly changed.", series: { name: "Novels of the Malazan Empire", order: 2, total: 6 }, tier: 1, topRank: null },
  { title: "Stonewielder", author: "Ian Cameron Esslemont", pageCount: 592, genre: "Fantasy", publicationDate: "2010", description: "Malazan Empire #3: on the Korel subcontinent, a long-isolated Malazan expedition must navigate the local gods' political crises and the return of the ancient Stormriders.", series: { name: "Novels of the Malazan Empire", order: 3, total: 6 }, tier: 1, topRank: null },

  // Kevin J. Anderson (4)
  { title: "Hidden Empire", author: "Kevin J. Anderson", pageCount: 672, genre: "Sci-Fi", publicationDate: "2002", description: "The first Saga of Seven Suns novel: humanity's stellar civilization accidentally ignites a gas giant — waking a species of beings who consider the act a declaration of war.", series: { name: "The Saga of Seven Suns", order: 1, total: 7 }, tier: 1, topRank: null },
  { title: "A Forest of Stars", author: "Kevin J. Anderson", pageCount: 672, genre: "Sci-Fi", publicationDate: "2003", description: "Saga of Seven Suns #2: the Hydrogues' war against organic life spreads across the galaxy as human, Ildiran, and tree-priest factions struggle to mount a response.", series: { name: "The Saga of Seven Suns", order: 2, total: 7 }, tier: 1, topRank: null },
  { title: "Horizon Storms", author: "Kevin J. Anderson", pageCount: 624, genre: "Sci-Fi", publicationDate: "2004", description: "Saga of Seven Suns #3: the war expands as other elemental races join the fight, and the secrets of the ancient Klikiss robots begin to come out.", series: { name: "The Saga of Seven Suns", order: 3, total: 7 }, tier: 1, topRank: null },
  { title: "Climbing Olympus", author: "Kevin J. Anderson", pageCount: 336, genre: "Sci-Fi", publicationDate: "1994", description: "Anderson's Mars-colonization novel: an 'augie' — a bioengineered settler — climbs Olympus Mons in search of the mystery that has been killing her kind.", series: null, tier: 1, topRank: null },

  // Gail Z. Martin (3)
  { title: "The Summoner", author: "Gail Z. Martin", pageCount: 656, genre: "Fantasy", publicationDate: "2007", description: "The first Chronicles of the Necromancer: a young prince with the gift of speaking to the dead must flee his murdering brother and raise an army of spirits against him.", series: { name: "The Chronicles of the Necromancer", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "The Blood King", author: "Gail Z. Martin", pageCount: 608, genre: "Fantasy", publicationDate: "2008", description: "Chronicles of the Necromancer #2: Prince Tris Drayke gathers allies among the dead as his evil brother Jared consolidates power and courts a vampire ally.", series: { name: "The Chronicles of the Necromancer", order: 2, total: 4 }, tier: 1, topRank: null },
  { title: "Dark Haven", author: "Gail Z. Martin", pageCount: 624, genre: "Fantasy", publicationDate: "2009", description: "Chronicles of the Necromancer #3: King Martris Drayke rebuilds his war-torn kingdom while the last of Jared's magic reaches for him from the grave.", series: { name: "The Chronicles of the Necromancer", order: 3, total: 4 }, tier: 1, topRank: null },

  // James White (3)
  { title: "Hospital Station", author: "James White", pageCount: 192, genre: "Sci-Fi", publicationDate: "1962", description: "The first Sector General novel: linked stories of a gigantic multispecies hospital in deep space where the medical staff must learn to treat patients whose biology they've never seen.", series: { name: "Sector General", order: 1, total: 12 }, tier: 1, topRank: null },
  { title: "Star Surgeon", author: "James White", pageCount: 192, genre: "Sci-Fi", publicationDate: "1963", description: "Sector General #2: Dr. Conway must handle a new crisis on a plague-planet while the hospital itself becomes the target of a military strike.", series: { name: "Sector General", order: 2, total: 12 }, tier: 1, topRank: null },
  { title: "Major Operation", author: "James White", pageCount: 208, genre: "Sci-Fi", publicationDate: "1971", description: "Sector General #3: linked stories in which Dr. Conway investigates a world where the entire planet turns out to be a single vast organism.", series: { name: "Sector General", order: 3, total: 12 }, tier: 1, topRank: null },

  // Karl Schroeder (3)
  { title: "Ventus", author: "Karl Schroeder", pageCount: 592, genre: "Sci-Fi", publicationDate: "2000", description: "A planet with terraforming AIs that have gone sentient and begun worshipping the long-dead human engineers who built them — Schroeder's transhuman SF debut.", series: null, tier: 1, topRank: null },
  { title: "Permanence", author: "Karl Schroeder", pageCount: 448, genre: "Sci-Fi", publicationDate: "2002", description: "An orphan pilot on a dead backwater colony stumbles into a mystery involving an ancient galactic civilization whose successors still walk among humanity.", series: null, tier: 1, topRank: null },
  { title: "Sun of Suns", author: "Karl Schroeder", pageCount: 320, genre: "Sci-Fi", publicationDate: "2006", description: "The first Virga novel: Schroeder's space opera set inside a giant balloon-world where towns rotate for gravity and nations wage wars between artificial suns.", series: { name: "Virga", order: 1, total: 5 }, tier: 1, topRank: null },

  // Cornelia Funke (4)
  { title: "Inkheart", author: "Cornelia Funke", pageCount: 560, genre: "Young Adult", publicationDate: "2003", description: "The first Inkworld novel: a father with the power to read characters out of their books accidentally brings a villain into our world — and loses his wife into the villain's book.", series: { name: "Inkworld", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "Inkspell", author: "Cornelia Funke", pageCount: 672, genre: "Young Adult", publicationDate: "2005", description: "Inkworld #2: Meggie and her father Mo are drawn into the Inkworld itself — the book whose fictional characters they've been freeing.", series: { name: "Inkworld", order: 2, total: 4 }, tier: 1, topRank: null },
  { title: "Inkdeath", author: "Cornelia Funke", pageCount: 688, genre: "Young Adult", publicationDate: "2007", description: "Inkworld #3: trapped inside the Inkworld as the evil Adderhead ravages the land, Meggie's family must write a new ending for a story that has become real.", series: { name: "Inkworld", order: 3, total: 4 }, tier: 1, topRank: null },
  { title: "The Thief Lord", author: "Cornelia Funke", pageCount: 352, genre: "Young Adult", publicationDate: "2000", description: "Two runaway brothers hiding in Venice fall in with a charismatic teenage thief who calls himself the Thief Lord — and who has a magical secret.", series: null, tier: 1, topRank: null },

  // Michael Scott (3)
  { title: "The Alchemyst", author: "Michael Scott", pageCount: 384, genre: "Young Adult", publicationDate: "2007", description: "The first Secrets of the Immortal Nicholas Flamel: teenage twins discover their bookseller employer is the immortal Nicholas Flamel, and they are the prophesied twins of legend.", series: { name: "The Secrets of the Immortal Nicholas Flamel", order: 1, total: 6 }, tier: 1, topRank: null },
  { title: "The Magician", author: "Michael Scott", pageCount: 480, genre: "Young Adult", publicationDate: "2008", description: "Nicholas Flamel #2: the twins travel to Paris to meet Niccolò Machiavelli and the Comte de Saint-Germain while Dr. John Dee hunts them across time.", series: { name: "The Secrets of the Immortal Nicholas Flamel", order: 2, total: 6 }, tier: 1, topRank: null },
  { title: "The Sorceress", author: "Michael Scott", pageCount: 512, genre: "Young Adult", publicationDate: "2009", description: "Nicholas Flamel #3: the twins travel to London to find the sorceress Gilgamesh and unlock the Book of Abraham's final secrets before Dee can destroy them.", series: { name: "The Secrets of the Immortal Nicholas Flamel", order: 3, total: 6 }, tier: 1, topRank: null },

  // Philip Reeve (4)
  { title: "Mortal Engines", author: "Philip Reeve", pageCount: 304, genre: "Young Adult", publicationDate: "2001", description: "The first Mortal Engines novel: in a post-apocalyptic world of traction cities that roll across the land consuming smaller settlements, an apprentice historian falls out of London.", series: { name: "Mortal Engines", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "Predator's Gold", author: "Philip Reeve", pageCount: 336, genre: "Young Adult", publicationDate: "2003", description: "Mortal Engines #2: Tom and Hester flee to the ice-skating predator city of Anchorage as the Green Storm continues its war against the Traction Cities.", series: { name: "Mortal Engines", order: 2, total: 4 }, tier: 1, topRank: null },
  { title: "Infernal Devices", author: "Philip Reeve", pageCount: 368, genre: "Young Adult", publicationDate: "2005", description: "Mortal Engines #3: fifteen years later, Tom and Hester's daughter Wren is kidnapped by Lost Boys — and the fate of the Anchorage community is decided.", series: { name: "Mortal Engines", order: 3, total: 4 }, tier: 1, topRank: null },
  { title: "A Darkling Plain", author: "Philip Reeve", pageCount: 560, genre: "Young Adult", publicationDate: "2006", description: "Mortal Engines #4: the final confrontation with the Stalker Fang as the Traction Cities and Green Storm are both destroyed by a returning ancient weapon.", series: { name: "Mortal Engines", order: 4, total: 4 }, tier: 1, topRank: null },

  // Nancy Farmer (3)
  { title: "The Ear, the Eye, and the Arm", author: "Nancy Farmer", pageCount: 320, genre: "Young Adult", publicationDate: "1994", description: "In a 2194 Zimbabwe, three children of the military general are kidnapped and hunted by three mutant detectives with uncannily sharpened senses.", series: null, tier: 1, topRank: null },
  { title: "The House of the Scorpion", author: "Nancy Farmer", pageCount: 400, genre: "Young Adult", publicationDate: "2002", description: "In the future country of Opium, a boy raised for his organs realizes he is the clone of the 140-year-old drug lord El Patrón — and decides not to die for him.", series: { name: "Matteo Alacrán", order: 1, total: 2 }, tier: 1, topRank: null },
  { title: "A Girl Named Disaster", author: "Nancy Farmer", pageCount: 320, genre: "Young Adult", publicationDate: "1996", description: "An 11-year-old Mozambican girl flees an arranged marriage and crosses the African wilderness alone — Farmer's Newbery Honor coming-of-age adventure.", series: null, tier: 1, topRank: null },

  // Elizabeth Hand (3)
  { title: "Winterlong", author: "Elizabeth Hand", pageCount: 384, genre: "Sci-Fi", publicationDate: "1990", description: "Hand's debut: in a post-apocalyptic Washington DC ruled by decadent aesthetes, a young empath is drawn into a plot that could bring back the old gods.", series: { name: "Winterlong", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Waking the Moon", author: "Elizabeth Hand", pageCount: 416, genre: "Fantasy", publicationDate: "1994", description: "A young woman at a Catholic university in the 1970s stumbles onto an ancient moon-goddess cult whose members are gathering for an astrological ritual twenty years later.", series: null, tier: 1, topRank: null },
  { title: "Generation Loss", author: "Elizabeth Hand", pageCount: 272, genre: "Thriller", publicationDate: "2007", description: "The first Cass Neary novel: a washed-out 1970s punk photographer travels to coastal Maine to interview a reclusive female art photographer — and walks into a disappearance.", series: { name: "Cass Neary", order: 1, total: 4 }, tier: 1, topRank: null },

  // Poppy Z. Brite (3)
  { title: "Lost Souls", author: "Poppy Z. Brite", pageCount: 368, genre: "Horror", publicationDate: "1992", description: "Brite's debut: three decadent vampires on a road trip through the American South encounter a young runaway with his own supernatural heritage.", series: null, tier: 1, topRank: null },
  { title: "Drawing Blood", author: "Poppy Z. Brite", pageCount: 400, genre: "Horror", publicationDate: "1993", description: "A comic-book artist returning to his hometown and a hacker on the run from the FBI find themselves trapped in a haunted house at the edge of the Missing Mile.", series: null, tier: 1, topRank: null },
  { title: "Exquisite Corpse", author: "Poppy Z. Brite", pageCount: 240, genre: "Horror", publicationDate: "1996", description: "Two serial killers — one English, one American — find each other through a personals ad in New Orleans and become grotesquely in love.", series: null, tier: 1, topRank: null },

  // Douglas Clegg (3)
  { title: "The Priest of Blood", author: "Douglas Clegg", pageCount: 336, genre: "Horror", publicationDate: "2005", description: "The first Vampyricon novel: a medieval peasant huntsman is taken by vampire lords and sent on a quest to find a prophesied relic across a dying Europe.", series: { name: "Vampyricon", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Neverland", author: "Douglas Clegg", pageCount: 288, genre: "Horror", publicationDate: "1991", description: "Clegg's debut: a group of cousins spending summer at their grandmother's Georgia island discover a dark magical world ruled by their strange younger cousin.", series: null, tier: 1, topRank: null },
  { title: "The Halloween Man", author: "Douglas Clegg", pageCount: 400, genre: "Horror", publicationDate: "1998", description: "A woman returns to her hometown to confront the urban legend of a man who takes children on Halloween — and who may be more than a legend.", series: null, tier: 1, topRank: null },

  // Judith Tarr (3)
  { title: "The Isle of Glass", author: "Judith Tarr", pageCount: 304, genre: "Fantasy", publicationDate: "1985", description: "The first Hound and the Falcon novel: a young half-elven monk in a medieval English monastery must choose between his vows and the elvenkind who claim him.", series: { name: "The Hound and the Falcon", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "The Hall of the Mountain King", author: "Judith Tarr", pageCount: 288, genre: "Fantasy", publicationDate: "1986", description: "The first Avaryan Rising novel: a crown prince of a god-descended line must navigate political intrigue and magical destiny in Tarr's Byzantine-inspired fantasy.", series: { name: "Avaryan Rising", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "A Fall of Princes", author: "Judith Tarr", pageCount: 320, genre: "Fantasy", publicationDate: "1988", description: "Avaryan Rising #3: the consolidation of the Sun-Son's empire through the eyes of an enemy prince — Tarr's most politically intricate volume.", series: { name: "Avaryan Rising", order: 3, total: 3 }, tier: 1, topRank: null },

  // Diane Duane (4)
  { title: "So You Want to Be a Wizard", author: "Diane Duane", pageCount: 288, genre: "Young Adult", publicationDate: "1983", description: "The first Young Wizards novel: a bullied 13-year-old picks up a library book that is actually a wizarding manual and chooses to take the Oath.", series: { name: "Young Wizards", order: 1, total: 11 }, tier: 1, topRank: null },
  { title: "Deep Wizardry", author: "Diane Duane", pageCount: 288, genre: "Young Adult", publicationDate: "1985", description: "Young Wizards #2: Nita and Kit join a group of cetacean wizards to perform a ritual that will save the coast — and that may require a human sacrifice.", series: { name: "Young Wizards", order: 2, total: 11 }, tier: 1, topRank: null },
  { title: "High Wizardry", author: "Diane Duane", pageCount: 304, genre: "Young Adult", publicationDate: "1990", description: "Young Wizards #3: Nita's little sister Dairine receives her own wizard's manual and takes a wild interplanetary tour while Nita and Kit race to catch up.", series: { name: "Young Wizards", order: 3, total: 11 }, tier: 1, topRank: null },
  { title: "The Door into Fire", author: "Diane Duane", pageCount: 304, genre: "Fantasy", publicationDate: "1979", description: "The first Tale of the Five novel: a young prince who can summon fire elementals searches across the land for his missing lover — Duane's adult fantasy debut.", series: { name: "The Tale of the Five", order: 1, total: 4 }, tier: 1, topRank: null },
];

// ── Apply deletions to PRIMARY ──
const data = JSON.parse(fs.readFileSync(CATALOG, "utf8"));
let books = Array.isArray(data) ? data : (data.books || Object.values(data).find(v => Array.isArray(v)));
const beforeP = books.length;

const toDelete = new Set();
for (const d of DELETE) {
  const idx = books.findIndex(b => b.title === d.title && b.author === d.author);
  if (idx !== -1) {
    toDelete.add(idx);
    console.log(`  ✓ removing dupe: "${d.title}" — ${d.author}`);
  }
}
books = books.filter((_, i) => !toDelete.has(i));

// ── Apply PRIMARY additions ──
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
console.log(`\nPRIMARY: +${primaryAdd.length} -${toDelete.size}, ${beforeP} → ${nextBooks.length}`);

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
