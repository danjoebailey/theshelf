const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");

const ADDITIONS = [
  // George Bernard Shaw (6)
  { title: "Pygmalion", author: "George Bernard Shaw", pageCount: 144, genre: "Fiction", publicationDate: "1913", description: "Shaw's comedy of phonetics professor Henry Higgins, who wagers he can pass a Cockney flower girl off as a duchess — the play that became My Fair Lady.", series: null, tier: 1, topRank: null },
  { title: "Man and Superman", author: "George Bernard Shaw", pageCount: 288, genre: "Fiction", publicationDate: "1903", description: "Shaw's Don Juan comedy in four acts, with the central third act a separate dream debate between Juan, the Devil, and a statue — the fullest expression of his Life Force philosophy.", series: null, tier: 1, topRank: null },
  { title: "Saint Joan", author: "George Bernard Shaw", pageCount: 176, genre: "Fiction", publicationDate: "1923", description: "Shaw's historical drama of Joan of Arc, written the year after her canonization — the play that sealed his Nobel Prize in Literature.", series: null, tier: 1, topRank: null },
  { title: "Major Barbara", author: "George Bernard Shaw", pageCount: 192, genre: "Fiction", publicationDate: "1905", description: "A Salvation Army officer's faith is tested when she realizes her father, an arms manufacturer, is doing more concrete good with his profits than her mission is with its charity.", series: null, tier: 1, topRank: null },
  { title: "Mrs Warren's Profession", author: "George Bernard Shaw", pageCount: 128, genre: "Fiction", publicationDate: "1893", description: "A Cambridge-educated daughter confronts her mother's career as a madam and the economic logic Shaw used to argue that Victorian prostitution was a rational response to capitalism.", series: null, tier: 1, topRank: null },
  { title: "Arms and the Man", author: "George Bernard Shaw", pageCount: 112, genre: "Fiction", publicationDate: "1894", description: "Shaw's anti-romantic comedy of the 1885 Serbo-Bulgarian War: a pragmatic Swiss mercenary shatters a young Bulgarian woman's operatic fantasies of heroism.", series: null, tier: 1, topRank: null },

  // Henrik Ibsen (5)
  { title: "A Doll's House", author: "Henrik Ibsen", pageCount: 112, genre: "Fiction", publicationDate: "1879", description: "Nora Helmer's marriage collapses when her husband learns she once forged a signature to save his life — the 19th-century play that slammed the door on Victorian domesticity.", series: null, tier: 1, topRank: null },
  { title: "Hedda Gabler", author: "Henrik Ibsen", pageCount: 128, genre: "Fiction", publicationDate: "1890", description: "A general's daughter, newly married to a dull academic, manipulates the people around her into destruction out of boredom — Ibsen's most famous female role.", series: null, tier: 1, topRank: null },
  { title: "An Enemy of the People", author: "Henrik Ibsen", pageCount: 144, genre: "Fiction", publicationDate: "1882", description: "A small-town doctor discovers the spa that supports the local economy is contaminated — and is shouted down and driven out when he tries to say so.", series: null, tier: 1, topRank: null },
  { title: "Ghosts", author: "Henrik Ibsen", pageCount: 112, genre: "Fiction", publicationDate: "1881", description: "A widow plans a memorial for her supposedly respectable husband while the truth of his syphilitic depravity and its inheritance to their son erupts around her.", series: null, tier: 1, topRank: null },
  { title: "Peer Gynt", author: "Henrik Ibsen", pageCount: 224, genre: "Fiction", publicationDate: "1867", description: "A verse drama following a Norwegian rogue across Africa, Morocco, and back home — Ibsen's epic of self-deception and the fragmented modern self.", series: null, tier: 1, topRank: null },

  // Eugene O'Neill (5)
  { title: "Long Day's Journey into Night", author: "Eugene O'Neill", pageCount: 192, genre: "Fiction", publicationDate: "1956", description: "O'Neill's autobiographical masterwork, published posthumously: a single August day in 1912 in the Tyrone family — a miserly father, a morphine-addicted mother, and two sons.", series: null, tier: 1, topRank: null },
  { title: "The Iceman Cometh", author: "Eugene O'Neill", pageCount: 272, genre: "Fiction", publicationDate: "1946", description: "A group of alcoholic down-and-outs in a 1912 Manhattan saloon await the arrival of a traveling salesman whose annual binge has become their last hope.", series: null, tier: 1, topRank: null },
  { title: "Mourning Becomes Electra", author: "Eugene O'Neill", pageCount: 256, genre: "Fiction", publicationDate: "1931", description: "O'Neill transplants the Oresteia to a New England family at the end of the Civil War — a Pulitzer-level attempt at Greek tragedy in American dress.", series: null, tier: 1, topRank: null },
  { title: "Desire Under the Elms", author: "Eugene O'Neill", pageCount: 96, genre: "Fiction", publicationDate: "1924", description: "O'Neill transposes the Phaedra myth onto a hard 1850s New England farm, where an old farmer's young third wife seduces his son.", series: null, tier: 1, topRank: null },
  { title: "A Moon for the Misbegotten", author: "Eugene O'Neill", pageCount: 192, genre: "Fiction", publicationDate: "1947", description: "A semi-sequel to Long Day's Journey: the grown-up elder Tyrone son arrives at a Connecticut tenant farm where a massive, defiant Irish girl tries to save him from himself.", series: null, tier: 1, topRank: null },

  // Edward Albee (4)
  { title: "Who's Afraid of Virginia Woolf?", author: "Edward Albee", pageCount: 256, genre: "Fiction", publicationDate: "1962", description: "A middle-aged academic couple torture each other and their young dinner guests through a long, liquor-soaked night — Albee's most famous play.", series: null, tier: 1, topRank: null },
  { title: "A Delicate Balance", author: "Edward Albee", pageCount: 192, genre: "Fiction", publicationDate: "1966", description: "A wealthy suburban couple's comfortable existence is disrupted when their best friends show up claiming to be fleeing a nameless terror — Pulitzer Prize winner.", series: null, tier: 1, topRank: null },
  { title: "The Zoo Story", author: "Edward Albee", pageCount: 48, genre: "Fiction", publicationDate: "1959", description: "Albee's first produced play, a one-act confrontation between a drifter and a complacent middle-class publisher on a Central Park bench.", series: null, tier: 1, topRank: null },
  { title: "Three Tall Women", author: "Edward Albee", pageCount: 112, genre: "Fiction", publicationDate: "1994", description: "Three women at three stages of the same life — 26, 52, and 92 — watch their shared past and recriminate each other. Albee's autobiographical portrait of his adoptive mother.", series: null, tier: 1, topRank: null },

  // Harold Pinter (3)
  { title: "The Caretaker", author: "Harold Pinter", pageCount: 96, genre: "Fiction", publicationDate: "1960", description: "Pinter's first major hit: a drifter taken in by a damaged man in a London flat plays the damaged man and his older brother off each other.", series: null, tier: 1, topRank: null },
  { title: "Betrayal", author: "Harold Pinter", pageCount: 96, genre: "Fiction", publicationDate: "1978", description: "A seven-year love affair told in reverse chronological order, ending at its beginning — Pinter's structural masterpiece.", series: null, tier: 1, topRank: null },
  { title: "No Man's Land", author: "Harold Pinter", pageCount: 96, genre: "Fiction", publicationDate: "1975", description: "Two aging literary men drink all night in a Hampstead study, circling around memories that may or may not be shared.", series: null, tier: 1, topRank: null },

  // Tom Stoppard (5)
  { title: "Rosencrantz and Guildenstern Are Dead", author: "Tom Stoppard", pageCount: 128, genre: "Fiction", publicationDate: "1966", description: "Stoppard's breakthrough: two minor characters from Hamlet blunder through the edges of the Shakespeare play, trying to work out what they are supposed to be doing.", series: null, tier: 1, topRank: null },
  { title: "Arcadia", author: "Tom Stoppard", pageCount: 128, genre: "Fiction", publicationDate: "1993", description: "A Derbyshire estate in 1809 and the present day, weaving thermodynamics, Romantic poetry, Fermat's Last Theorem, and Lord Byron into a single contrapuntal comedy.", series: null, tier: 1, topRank: null },
  { title: "Travesties", author: "Tom Stoppard", pageCount: 112, genre: "Fiction", publicationDate: "1974", description: "Lenin, James Joyce, and Tristan Tzara all passed through Zurich during WWI — Stoppard's comedy imagines them colliding over an amateur production of The Importance of Being Earnest.", series: null, tier: 1, topRank: null },
  { title: "The Real Thing", author: "Tom Stoppard", pageCount: 112, genre: "Fiction", publicationDate: "1982", description: "A middle-aged playwright leaves his wife for an actress, and tries to work out the difference between writing about love and actually being in it.", series: null, tier: 1, topRank: null },
  { title: "The Coast of Utopia", author: "Tom Stoppard", pageCount: 384, genre: "Fiction", publicationDate: "2002", description: "Stoppard's nine-hour trilogy — Voyage, Shipwreck, and Salvage — following Russian intellectuals Bakunin, Herzen, and Turgenev through the revolutions of 1848.", series: null, tier: 1, topRank: null },

  // P.G. Wodehouse (6)
  { title: "The Code of the Woosters", author: "P.G. Wodehouse", pageCount: 272, genre: "Fiction", publicationDate: "1938", description: "Bertie Wooster is blackmailed into stealing a silver cow-creamer from the collector Sir Watkyn Bassett, and only Jeeves can save him — widely considered the perfect Jeeves novel.", series: null, tier: 1, topRank: null },
  { title: "Right Ho, Jeeves", author: "P.G. Wodehouse", pageCount: 256, genre: "Fiction", publicationDate: "1934", description: "Bertie decides to dispense his own romantic advice at Brinkley Court and plunges half of Worcestershire into chaos — Jeeves saves the day with the newt episode.", series: null, tier: 1, topRank: null },
  { title: "The Inimitable Jeeves", author: "P.G. Wodehouse", pageCount: 240, genre: "Fiction", publicationDate: "1923", description: "Linked stories introducing the full Jeeves and Wooster canon: Aunt Agatha, Bingo Little's serial infatuations, and the Drones Club irregulars.", series: null, tier: 1, topRank: null },
  { title: "Leave It to Psmith", author: "P.G. Wodehouse", pageCount: 288, genre: "Fiction", publicationDate: "1923", description: "The elegant young Psmith advertises his willingness to do anything (crime not objected to) and is hired to steal Lady Constance's diamonds at Blandings Castle.", series: null, tier: 1, topRank: null },
  { title: "Carry On, Jeeves", author: "P.G. Wodehouse", pageCount: 256, genre: "Fiction", publicationDate: "1925", description: "A story collection including 'Jeeves Takes Charge,' the tale that introduces the fateful morning when Bertie and Jeeves first meet.", series: null, tier: 1, topRank: null },
  { title: "Summer Lightning", author: "P.G. Wodehouse", pageCount: 288, genre: "Fiction", publicationDate: "1929", description: "A Blandings novel: Lord Emsworth's prize pig the Empress is kidnapped, Galahad Threepwood writes scandalous memoirs, and young lovers try to elope — all at once.", series: null, tier: 1, topRank: null },

  // William Blake (3)
  { title: "Songs of Innocence and of Experience", author: "William Blake", pageCount: 160, genre: "Fiction", publicationDate: "1794", description: "Blake's paired illustrated poem cycles showing 'the two contrary states of the human soul,' including 'The Tyger,' 'The Lamb,' and 'London.'", series: null, tier: 1, topRank: null },
  { title: "The Marriage of Heaven and Hell", author: "William Blake", pageCount: 96, genre: "Fiction", publicationDate: "1790", description: "Blake's prose-poem manifesto inverting conventional Christian morality — the source of 'The Proverbs of Hell' and his foundational symbolic system.", series: null, tier: 1, topRank: null },
  { title: "Poetical Sketches", author: "William Blake", pageCount: 112, genre: "Fiction", publicationDate: "1783", description: "Blake's earliest published poems, written between the ages of twelve and twenty and privately printed with the help of friends.", series: null, tier: 1, topRank: null },

  // John Keats (2)
  { title: "The Complete Poems of John Keats", author: "John Keats", pageCount: 624, genre: "Fiction", publicationDate: "1820", description: "The complete verse of John Keats, including 'Ode to a Nightingale,' 'To Autumn,' 'The Eve of St. Agnes,' 'Hyperion,' and the great odes of 1819.", series: null, tier: 1, topRank: null },
  { title: "The Letters of John Keats", author: "John Keats", pageCount: 544, genre: "Non-Fiction", publicationDate: "1848", description: "Keats's letters to friends and family, the richest record of any Romantic poet's inner life — source of the concepts of 'negative capability' and the 'vale of Soul-making.'", series: null, tier: 1, topRank: null },

  // William Wordsworth (2)
  { title: "The Prelude", author: "William Wordsworth", pageCount: 352, genre: "Fiction", publicationDate: "1850", description: "Wordsworth's book-length autobiographical poem, published posthumously — the growth of a poet's mind from childhood in the Lake District through the French Revolution.", series: null, tier: 1, topRank: null },
  { title: "Lyrical Ballads", author: "William Wordsworth", pageCount: 320, genre: "Fiction", publicationDate: "1798", description: "Wordsworth and Coleridge's joint collection — the book that founded English Romanticism, including 'The Rime of the Ancient Mariner' and 'Tintern Abbey.'", series: null, tier: 1, topRank: null },

  // John Locke (3)
  { title: "Two Treatises of Government", author: "John Locke", pageCount: 400, genre: "Non-Fiction", publicationDate: "1689", description: "Locke's foundational argument for natural rights, consent-based government, and the right to rebellion — the philosophical source of the American Declaration of Independence.", series: null, tier: 1, topRank: null },
  { title: "An Essay Concerning Human Understanding", author: "John Locke", pageCount: 720, genre: "Non-Fiction", publicationDate: "1689", description: "Locke's monumental inquiry into the origins and limits of human knowledge, arguing against innate ideas in favor of the mind as a 'blank slate' shaped by experience.", series: null, tier: 1, topRank: null },
  { title: "A Letter Concerning Toleration", author: "John Locke", pageCount: 80, genre: "Non-Fiction", publicationDate: "1689", description: "Locke's argument that the state has no business enforcing religious belief — one of the founding documents of religious freedom in the Anglophone world.", series: null, tier: 1, topRank: null },

  // David Hume (4)
  { title: "A Treatise of Human Nature", author: "David Hume", pageCount: 720, genre: "Non-Fiction", publicationDate: "1739", description: "Hume's early masterwork, arguing that reason is 'the slave of the passions' and that causation is habit rather than necessity — the most radical empiricism of the Enlightenment.", series: null, tier: 1, topRank: null },
  { title: "An Enquiry Concerning Human Understanding", author: "David Hume", pageCount: 192, genre: "Non-Fiction", publicationDate: "1748", description: "Hume's compressed and more accessible reworking of the epistemology of the Treatise — the book Kant credited with waking him from his 'dogmatic slumber.'", series: null, tier: 1, topRank: null },
  { title: "Dialogues Concerning Natural Religion", author: "David Hume", pageCount: 160, genre: "Non-Fiction", publicationDate: "1779", description: "Hume's posthumous assault on the design argument, staged as a three-way conversation between a devout Christian, a skeptic, and a theist — published only after his death.", series: null, tier: 1, topRank: null },
  { title: "An Enquiry Concerning the Principles of Morals", author: "David Hume", pageCount: 144, genre: "Non-Fiction", publicationDate: "1751", description: "Hume's moral philosophy: virtue understood as what is useful or agreeable to ourselves or others — the book Hume himself considered his finest.", series: null, tier: 1, topRank: null },

  // Immanuel Kant (4)
  { title: "Critique of Pure Reason", author: "Immanuel Kant", pageCount: 784, genre: "Non-Fiction", publicationDate: "1781", description: "Kant's foundational 'Copernican revolution' in philosophy: the mind structures experience through inbuilt categories, and metaphysics must be limited to what is knowable.", series: null, tier: 1, topRank: null },
  { title: "Critique of Practical Reason", author: "Immanuel Kant", pageCount: 192, genre: "Non-Fiction", publicationDate: "1788", description: "Kant's second Critique: the moral law as the one thing reason cannot undermine, grounding freedom, immortality, and God as necessary postulates of ethical action.", series: null, tier: 1, topRank: null },
  { title: "Critique of Judgment", author: "Immanuel Kant", pageCount: 432, genre: "Non-Fiction", publicationDate: "1790", description: "Kant's third Critique, on aesthetic and teleological judgment — the foundation of modern aesthetics and the starting point for German Idealism.", series: null, tier: 1, topRank: null },
  { title: "Groundwork of the Metaphysics of Morals", author: "Immanuel Kant", pageCount: 128, genre: "Non-Fiction", publicationDate: "1785", description: "Kant's short foundational text on the categorical imperative — the duty-based ethics that treats persons as ends in themselves.", series: null, tier: 1, topRank: null },

  // René Descartes (3)
  { title: "Meditations on First Philosophy", author: "René Descartes", pageCount: 160, genre: "Non-Fiction", publicationDate: "1641", description: "Descartes's six-day exercise in radical doubt — the book that produced 'I think, therefore I am' and launched modern philosophy.", series: null, tier: 1, topRank: null },
  { title: "Discourse on the Method", author: "René Descartes", pageCount: 96, genre: "Non-Fiction", publicationDate: "1637", description: "Descartes's autobiographical introduction to his method of systematic doubt and its application to science — the first major modern philosophical text in French.", series: null, tier: 1, topRank: null },
  { title: "Principles of Philosophy", author: "René Descartes", pageCount: 320, genre: "Non-Fiction", publicationDate: "1644", description: "Descartes's textbook-style complete system of philosophy, from metaphysical foundations through physics and cosmology.", series: null, tier: 1, topRank: null },

  // Thomas Hobbes (1)
  { title: "Leviathan", author: "Thomas Hobbes", pageCount: 736, genre: "Non-Fiction", publicationDate: "1651", description: "Hobbes's absolute-sovereignty social contract: humanity in its natural state is a 'war of all against all,' and only unified, unchallengeable authority can save us from ourselves.", series: null, tier: 1, topRank: null },

  // Søren Kierkegaard (3)
  { title: "Repetition", author: "Søren Kierkegaard", pageCount: 144, genre: "Non-Fiction", publicationDate: "1843", description: "Published the same day as Fear and Trembling, Kierkegaard's experimental philosophical novella exploring whether true 'repetition' of experience is possible.", series: null, tier: 1, topRank: null },
  { title: "Concluding Unscientific Postscript", author: "Søren Kierkegaard", pageCount: 640, genre: "Non-Fiction", publicationDate: "1846", description: "Kierkegaard's massive philosophical 'postscript' to his Philosophical Fragments, arguing that truth is subjectivity and that Christianity cannot be proven, only leapt into.", series: null, tier: 1, topRank: null },
  { title: "Works of Love", author: "Søren Kierkegaard", pageCount: 448, genre: "Non-Fiction", publicationDate: "1847", description: "Kierkegaard's Christian ethics, published under his own name — the commandment to love one's neighbor as a duty that precedes every particular preference or attachment.", series: null, tier: 1, topRank: null },

  // Arthur Schopenhauer (1)
  { title: "Studies in Pessimism", author: "Arthur Schopenhauer", pageCount: 160, genre: "Non-Fiction", publicationDate: "1891", description: "A widely read English compilation of Schopenhauer's late essays on suffering, the emptiness of existence, and the wisdom of resignation.", series: null, tier: 1, topRank: null },

  // Roger Zelazny (6)
  { title: "The Dream Master", author: "Roger Zelazny", pageCount: 192, genre: "Sci-Fi", publicationDate: "1966", description: "A neurotherapist who enters patients' dreams to cure them takes on a blind woman desperate to see the world her mind has never held.", series: null, tier: 1, topRank: null },
  { title: "Jack of Shadows", author: "Roger Zelazny", pageCount: 208, genre: "Fantasy", publicationDate: "1971", description: "On a world half-magical and half-scientific, the shadow-wielding thief Jack escapes execution and begins plotting revenge against the lords who killed him.", series: null, tier: 1, topRank: null },
  { title: "To Die in Italbar", author: "Roger Zelazny", pageCount: 192, genre: "Sci-Fi", publicationDate: "1973", description: "A man whose presence heals disease — and whose anger spreads plague — wanders the stars while governments and cults try to claim him.", series: null, tier: 1, topRank: null },
  { title: "Doorways in the Sand", author: "Roger Zelazny", pageCount: 224, genre: "Sci-Fi", publicationDate: "1976", description: "A perpetual undergraduate accidentally acquires an alien artifact and becomes the center of a galactic manhunt — Zelazny's most breezy caper.", series: null, tier: 1, topRank: null },
  { title: "The Doors of His Face, the Lamps of His Mouth", author: "Roger Zelazny", pageCount: 240, genre: "Sci-Fi", publicationDate: "1971", description: "Zelazny's best short story collection, including the Hugo-winning title novella of sport fishing on Venus and 'A Rose for Ecclesiastes.'", series: null, tier: 1, topRank: null },
  { title: "Four for Tomorrow", author: "Roger Zelazny", pageCount: 192, genre: "Sci-Fi", publicationDate: "1967", description: "Zelazny's first story collection, including the novella 'He Who Shapes' (basis of The Dream Master) and the Nebula-winning 'The Doors of His Face, the Lamps of His Mouth.'", series: null, tier: 1, topRank: null },

  // Clifford D. Simak (4)
  { title: "City", author: "Clifford D. Simak", pageCount: 224, genre: "Sci-Fi", publicationDate: "1952", description: "Simak's International Fantasy Award-winning fix-up: eight linked stories told by sentient dogs thousands of years after humanity has vanished from Earth.", series: null, tier: 1, topRank: null },
  { title: "Way Station", author: "Clifford D. Simak", pageCount: 192, genre: "Sci-Fi", publicationDate: "1963", description: "A Civil War veteran in rural Wisconsin is recruited to run a secret galactic transit stop — a century later he looks the same age and has a dead alien in his cellar.", series: null, tier: 1, topRank: null },
  { title: "The Goblin Reservation", author: "Clifford D. Simak", pageCount: 192, genre: "Sci-Fi", publicationDate: "1968", description: "A university professor is transmitted back to his body two weeks after the original copy of himself arrives on Earth — and steps into an investigation involving goblins, trolls, and a dead alien.", series: null, tier: 1, topRank: null },
  { title: "A Choice of Gods", author: "Clifford D. Simak", pageCount: 192, genre: "Sci-Fi", publicationDate: "1972", description: "The Earth's population has been mysteriously removed to distant stars, leaving behind a handful of humans who have developed into something else entirely.", series: null, tier: 1, topRank: null },

  // Ramsey Campbell (3)
  { title: "The Face That Must Die", author: "Ramsey Campbell", pageCount: 240, genre: "Horror", publicationDate: "1979", description: "Campbell's urban horror novel told from inside the mind of a paranoid schizophrenic convinced a gay serial killer is stalking him — one of the genre's most uncomfortable books.", series: null, tier: 1, topRank: null },
  { title: "Incarnate", author: "Ramsey Campbell", pageCount: 480, genre: "Horror", publicationDate: "1983", description: "Five volunteers in a dream research experiment find that their nightmares are beginning to leak into the waking world.", series: null, tier: 1, topRank: null },
  { title: "The Doll Who Ate His Mother", author: "Ramsey Campbell", pageCount: 224, genre: "Horror", publicationDate: "1976", description: "Campbell's first novel: a Liverpool schoolteacher tracks the occultist who killed her brother and discovers the doll-like child at the center of a devouring cult.", series: null, tier: 1, topRank: null },

  // Peter Straub (1)
  { title: "Julia", author: "Peter Straub", pageCount: 288, genre: "Horror", publicationDate: "1975", description: "A grief-stricken mother moves into a London townhouse after her daughter's death and is haunted by the ghost of a murderous little girl.", series: null, tier: 1, topRank: null },

  // James Ellroy (4)
  { title: "Because the Night", author: "James Ellroy", pageCount: 352, genre: "Mystery", publicationDate: "1984", description: "An LAPD officer investigates a string of brutal murders linked to a charismatic psychiatrist running a cultlike therapy group — early Ellroy pulp noir.", series: null, tier: 1, topRank: null },
  { title: "My Dark Places", author: "James Ellroy", pageCount: 432, genre: "Biography", publicationDate: "1996", description: "Ellroy's memoir of reopening his own mother's unsolved 1958 murder, the case that haunted his crime fiction for decades.", series: null, tier: 1, topRank: null },
  { title: "Blood on the Moon", author: "James Ellroy", pageCount: 288, genre: "Mystery", publicationDate: "1984", description: "The first of Ellroy's Lloyd Hopkins trilogy: an LAPD sergeant with a genius for homicide investigates a serial killer whose victims share a single bizarre connection.", series: null, tier: 1, topRank: null },
  { title: "Clandestine", author: "James Ellroy", pageCount: 352, genre: "Mystery", publicationDate: "1982", description: "A young 1950s LAPD officer climbing the ladder becomes entangled with the murder of a woman he slept with — a direct rehearsal for the Black Dahlia material.", series: null, tier: 1, topRank: null },

  // John D. MacDonald (9)
  { title: "Nightmare in Pink", author: "John D. MacDonald", pageCount: 208, genre: "Mystery", publicationDate: "1964", description: "Travis McGee #2: McGee investigates the mysterious death of an old Army buddy's fiancé, a case that leads him into a Manhattan hospital specializing in experimental drugs.", series: { name: "Travis McGee", order: 2, total: 21 }, tier: 1, topRank: null },
  { title: "A Purple Place for Dying", author: "John D. MacDonald", pageCount: 208, genre: "Mystery", publicationDate: "1964", description: "Travis McGee #3: a wealthy wife hires McGee to recover money from her husband's cattle baron — and is murdered before McGee has even gotten started.", series: { name: "Travis McGee", order: 3, total: 21 }, tier: 1, topRank: null },
  { title: "A Deadly Shade of Gold", author: "John D. MacDonald", pageCount: 320, genre: "Mystery", publicationDate: "1965", description: "Travis McGee #5: McGee follows the trail of a dead friend and a stolen pre-Columbian gold figurine from Florida to Mexico.", series: { name: "Travis McGee", order: 5, total: 21 }, tier: 1, topRank: null },
  { title: "Bright Orange for the Shroud", author: "John D. MacDonald", pageCount: 272, genre: "Mystery", publicationDate: "1965", description: "Travis McGee #6: McGee helps an old friend destroyed by a Florida real-estate con and hunts the grifters who ruined him.", series: { name: "Travis McGee", order: 6, total: 21 }, tier: 1, topRank: null },
  { title: "Darker Than Amber", author: "John D. MacDonald", pageCount: 224, genre: "Mystery", publicationDate: "1966", description: "Travis McGee #7: McGee rescues a woman thrown off a bridge and uncovers a cruise-ship badger game preying on lonely widowers.", series: { name: "Travis McGee", order: 7, total: 21 }, tier: 1, topRank: null },
  { title: "Pale Gray for Guilt", author: "John D. MacDonald", pageCount: 240, genre: "Mystery", publicationDate: "1968", description: "Travis McGee #9: an old football teammate is murdered over development schemes on a small Florida river, and McGee constructs a stock-swindle scheme of his own for revenge.", series: { name: "Travis McGee", order: 9, total: 21 }, tier: 1, topRank: null },
  { title: "A Tan and Sandy Silence", author: "John D. MacDonald", pageCount: 272, genre: "Mystery", publicationDate: "1971", description: "Travis McGee #13: a jealous husband waves a gun under McGee's nose looking for his missing wife, then disappears himself — leading McGee to a Caribbean impostor scheme.", series: { name: "Travis McGee", order: 13, total: 21 }, tier: 1, topRank: null },
  { title: "The Scarlet Ruse", author: "John D. MacDonald", pageCount: 288, genre: "Mystery", publicationDate: "1973", description: "Travis McGee #14: McGee helps a Miami stamp dealer whose rare-stamp safety deposit box has been emptied of hundreds of thousands of dollars' worth of inventory.", series: { name: "Travis McGee", order: 14, total: 21 }, tier: 1, topRank: null },
  { title: "The Turquoise Lament", author: "John D. MacDonald", pageCount: 272, genre: "Mystery", publicationDate: "1973", description: "Travis McGee #15: the daughter of an old friend is convinced her husband is trying to kill her on their around-the-world honeymoon cruise.", series: { name: "Travis McGee", order: 15, total: 21 }, tier: 1, topRank: null },

  // Ross Macdonald (9)
  { title: "The Zebra-Striped Hearse", author: "Ross Macdonald", pageCount: 256, genre: "Mystery", publicationDate: "1962", description: "Lew Archer is hired by a wealthy Pasadena colonel to break up his daughter's engagement and ends up tracking a killer across California, Mexico, and a lifetime of secrets.", series: null, tier: 1, topRank: null },
  { title: "The Ivory Grin", author: "Ross Macdonald", pageCount: 240, genre: "Mystery", publicationDate: "1952", description: "An early Lew Archer case: a hard-edged woman hires Archer to find her Black former maid, but what Archer actually finds is an interracial romance and a killer.", series: null, tier: 1, topRank: null },
  { title: "The Far Side of the Dollar", author: "Ross Macdonald", pageCount: 256, genre: "Mystery", publicationDate: "1965", description: "A runaway teenager from an exclusive California boarding school is kidnapped — and Archer discovers the boy is not who everyone thought he was.", series: null, tier: 1, topRank: null },
  { title: "Meet Me at the Morgue", author: "Ross Macdonald", pageCount: 240, genre: "Mystery", publicationDate: "1953", description: "Originally published as Experience with Evil: a Santa Barbara probation officer's missing child case turns into a hunt for the officer himself when he disappears.", series: null, tier: 1, topRank: null },
  { title: "The Barbarous Coast", author: "Ross Macdonald", pageCount: 256, genre: "Mystery", publicationDate: "1956", description: "Lew Archer is hired to find a young woman at a seedy Hollywood beach club and walks into a conspiracy involving the club's powerful patrons.", series: null, tier: 1, topRank: null },
  { title: "The Blue Hammer", author: "Ross Macdonald", pageCount: 304, genre: "Mystery", publicationDate: "1976", description: "The final Lew Archer novel: Archer investigates the theft of a painting whose vanished artist was presumed dead decades ago.", series: null, tier: 1, topRank: null },
  { title: "The Instant Enemy", author: "Ross Macdonald", pageCount: 256, genre: "Mystery", publicationDate: "1968", description: "A wealthy California couple hires Archer to find their 17-year-old daughter, who's run off with an older man — and Archer uncovers a long-buried kidnapping case.", series: null, tier: 1, topRank: null },
  { title: "The Doomsters", author: "Ross Macdonald", pageCount: 256, genre: "Mystery", publicationDate: "1958", description: "A young man escaped from a mental institution begs Archer for help — and Archer is drawn into the apparent suicides of his entire family over the course of a generation.", series: null, tier: 1, topRank: null },
  { title: "The Way Some People Die", author: "Ross Macdonald", pageCount: 240, genre: "Mystery", publicationDate: "1951", description: "Early Lew Archer: hired to find a missing daughter, Archer discovers the girl has fallen in with a heroin-running gang and begun killing for them.", series: null, tier: 1, topRank: null },

  // Carl Sagan (1)
  { title: "The Cosmic Connection", author: "Carl Sagan", pageCount: 288, genre: "Non-Fiction", publicationDate: "1973", description: "Sagan's first book for a general audience, a meditation on humanity's place in the universe that anticipated Cosmos by seven years.", series: null, tier: 1, topRank: null },

  // Stephen Jay Gould (5)
  { title: "Wonderful Life", author: "Stephen Jay Gould", pageCount: 352, genre: "Non-Fiction", publicationDate: "1989", description: "Gould's argument, built around the Burgess Shale fossils, that the history of life is radically contingent — rewind the tape and run it again, and Homo sapiens never appears.", series: null, tier: 1, topRank: null },
  { title: "The Mismeasure of Man", author: "Stephen Jay Gould", pageCount: 448, genre: "Non-Fiction", publicationDate: "1981", description: "Gould's takedown of 19th- and 20th-century attempts to rank human intelligence biologically, from craniometry to IQ — the book that made him a public intellectual.", series: null, tier: 1, topRank: null },
  { title: "The Panda's Thumb", author: "Stephen Jay Gould", pageCount: 352, genre: "Non-Fiction", publicationDate: "1980", description: "Gould's second essay collection from Natural History magazine — the Panda's thumb as an example of imperfect evolutionary jury-rigging.", series: null, tier: 1, topRank: null },
  { title: "Ever Since Darwin", author: "Stephen Jay Gould", pageCount: 288, genre: "Non-Fiction", publicationDate: "1977", description: "Gould's first essay collection, making evolutionary biology legible to non-specialists and introducing the style he'd sustain for three decades.", series: null, tier: 1, topRank: null },
  { title: "Bully for Brontosaurus", author: "Stephen Jay Gould", pageCount: 544, genre: "Non-Fiction", publicationDate: "1991", description: "Gould's fifth essay collection, ranging from the proper classification of dinosaurs to the history of science and the rigging of SAT questions.", series: null, tier: 1, topRank: null },

  // Oliver Sacks (3)
  { title: "Migraine", author: "Oliver Sacks", pageCount: 352, genre: "Non-Fiction", publicationDate: "1970", description: "Sacks's first book: a clinical and phenomenological study of migraine — its auras, its hallucinations, its historical place in human imagination.", series: null, tier: 1, topRank: null },
  { title: "The Mind's Eye", author: "Oliver Sacks", pageCount: 272, genre: "Non-Fiction", publicationDate: "2010", description: "Sacks's essays on vision, reading, and the surprising ways the brain adapts to losing or transforming them — including his own ocular cancer.", series: null, tier: 1, topRank: null },
  { title: "A Leg to Stand On", author: "Oliver Sacks", pageCount: 224, genre: "Non-Fiction", publicationDate: "1984", description: "Sacks's case history of himself: after a climbing accident in Norway, his own leg no longer feels like part of his body — the first time he turned his clinical gaze on himself.", series: null, tier: 1, topRank: null },

  // Richard Dawkins (1)
  { title: "The Ancestor's Tale", author: "Richard Dawkins", pageCount: 688, genre: "Non-Fiction", publicationDate: "2004", description: "Dawkins's 40-rendezvous pilgrimage backward through evolutionary history, modeled on Chaucer, tracing every living thing to its common ancestor.", series: null, tier: 1, topRank: null },
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
