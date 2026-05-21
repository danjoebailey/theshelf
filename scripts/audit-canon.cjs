const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const data = JSON.parse(fs.readFileSync(CATALOG, "utf8"));
const books = Array.isArray(data) ? data : (data.books || Object.values(data).find(v => Array.isArray(v)));

const norm = s => (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z]/g, "");

// Curated list of indisputably canonical novelists/short-fiction writers.
// Genre canon (SF/F, mystery, horror) included since the catalog covers them.
const CANON = [
  // British 18thC
  "Daniel Defoe","Jonathan Swift","Samuel Richardson","Henry Fielding","Laurence Sterne","Tobias Smollett","Fanny Burney","Ann Radcliffe",
  // British 19thC
  "Walter Scott","Jane Austen","Mary Shelley","Charlotte Bronte","Emily Bronte","Anne Bronte","Charles Dickens","William Makepeace Thackeray","George Eliot","Anthony Trollope","Wilkie Collins","Elizabeth Gaskell","Thomas Hardy","George Meredith","Lewis Carroll","Samuel Butler","George Gissing","R.D. Blackmore","Charles Kingsley","Mrs. Henry Wood",
  // Late Victorian / Edwardian
  "Robert Louis Stevenson","H. Rider Haggard","Arthur Conan Doyle","Bram Stoker","Oscar Wilde","H.G. Wells","Rudyard Kipling","Joseph Conrad","Anthony Hope","Jerome K. Jerome","Kenneth Grahame","George du Maurier","Ford Madox Ford","Arnold Bennett","John Galsworthy","G.K. Chesterton","M.R. James","Saki","E. Nesbit","Sheridan Le Fanu","George MacDonald",
  // 20thC British / Irish
  "E.M. Forster","D.H. Lawrence","Virginia Woolf","James Joyce","Aldous Huxley","Evelyn Waugh","Graham Greene","George Orwell","W. Somerset Maugham","P.G. Wodehouse","Agatha Christie","Dorothy L. Sayers","Daphne du Maurier","Elizabeth Bowen","Anthony Powell","Iris Murdoch","Muriel Spark","Kingsley Amis","William Golding","Doris Lessing","Anthony Burgess","John Fowles","J.R.R. Tolkien","C.S. Lewis","J.G. Ballard","Lawrence Durrell","Malcolm Lowry","Jean Rhys","Rosamond Lehmann","Henry Green","Olivia Manning","Patrick White","L.P. Hartley","Nevil Shute",
  // Contemporary British / Irish / Commonwealth
  "Ian McEwan","Julian Barnes","Martin Amis","Kazuo Ishiguro","Salman Rushdie","A.S. Byatt","Hilary Mantel","Zadie Smith","Penelope Lively","Penelope Fitzgerald","William Trevor","John Banville","Sebastian Barry","Colm Toibin","Anne Enright","Roddy Doyle","Pat Barker","Graham Swift","Alan Hollinghurst","Sarah Waters","David Mitchell","Jeanette Winterson","Barry Unsworth",
  // American 19thC
  "Washington Irving","James Fenimore Cooper","Nathaniel Hawthorne","Edgar Allan Poe","Herman Melville","Harriet Beecher Stowe","Louisa May Alcott","Mark Twain","Henry James","William Dean Howells","Stephen Crane","Kate Chopin","Sarah Orne Jewett","Bret Harte","Frank Norris",
  // American 20thC
  "Edith Wharton","Willa Cather","Theodore Dreiser","Sinclair Lewis","Jack London","Upton Sinclair","Sherwood Anderson","Gertrude Stein","F. Scott Fitzgerald","Ernest Hemingway","William Faulkner","John Steinbeck","John Dos Passos","Thomas Wolfe","Zora Neale Hurston","Richard Wright","Ralph Ellison","James Baldwin","Carson McCullers","Flannery O'Connor","Eudora Welty","Truman Capote","Vladimir Nabokov","Saul Bellow","Bernard Malamud","Philip Roth","John Updike","Norman Mailer","Kurt Vonnegut","Joseph Heller","John Cheever","Raymond Carver","Toni Morrison","Cormac McCarthy","Don DeLillo","Thomas Pynchon","John Irving","Anne Tyler","Marilynne Robinson","Jonathan Franzen","Michael Chabon","Jeffrey Eugenides","Richard Ford","E.L. Doctorow","Joyce Carol Oates","Wallace Stegner","Walker Percy","John Gardner","William Styron","Katherine Anne Porter","Nathanael West","James M. Cain","Dashiell Hammett","Raymond Chandler","Patricia Highsmith",
  // Russian
  "Alexander Pushkin","Nikolai Gogol","Mikhail Lermontov","Ivan Turgenev","Ivan Goncharov","Fyodor Dostoevsky","Leo Tolstoy","Anton Chekhov","Maxim Gorky","Mikhail Bulgakov","Boris Pasternak","Aleksandr Solzhenitsyn","Vasily Grossman","Yevgeny Zamyatin","Andrei Bely","Isaac Babel",
  // French
  "Francois Rabelais","Voltaire","Denis Diderot","Choderlos de Laclos","Stendhal","Honore de Balzac","Victor Hugo","Alexandre Dumas","George Sand","Gustave Flaubert","Jules Verne","Emile Zola","Guy de Maupassant","Marcel Proust","Andre Gide","Colette","Francois Mauriac","Georges Bernanos","Louis-Ferdinand Celine","Andre Malraux","Jean-Paul Sartre","Albert Camus","Marguerite Yourcenar","Marguerite Duras","Georges Perec","Michel Houellebecq",
  // German-language
  "Johann Wolfgang von Goethe","E.T.A. Hoffmann","Theodor Fontane","Thomas Mann","Heinrich Mann","Hermann Hesse","Franz Kafka","Robert Musil","Joseph Roth","Alfred Doblin","Erich Maria Remarque","Stefan Zweig","Hermann Broch","Gunter Grass","Heinrich Boll","W.G. Sebald","Thomas Bernhard","Robert Walser",
  // Italian / Spanish / Portuguese / Latin American
  "Miguel de Cervantes","Alessandro Manzoni","Giovanni Verga","Italo Svevo","Luigi Pirandello","Giuseppe Tomasi di Lampedusa","Cesare Pavese","Alberto Moravia","Italo Calvino","Primo Levi","Umberto Eco","Elena Ferrante","Benito Perez Galdos","Camilo Jose Cela","Jose Saramago","Eca de Queiros","Jorge Luis Borges","Gabriel Garcia Marquez","Julio Cortazar","Mario Vargas Llosa","Carlos Fuentes","Juan Rulfo","Isabel Allende","Roberto Bolano","Machado de Assis",
  // Scandinavian / other European
  "Henrik Ibsen","August Strindberg","Knut Hamsun","Selma Lagerlof","Sigrid Undset","Karen Blixen","Halldor Laxness","Karl Ove Knausgaard","Witold Gombrowicz","Bruno Schulz","Stanislaw Lem","Milan Kundera","Bohumil Hrabal","Karel Capek","Sandor Marai","Imre Kertesz",
  // Genre canon — SF/F
  "Isaac Asimov","Arthur C. Clarke","Robert A. Heinlein","Ray Bradbury","Ursula K. Le Guin","Philip K. Dick","Frank Herbert","Kurt Vonnegut","Octavia E. Butler","William Gibson","Neal Stephenson","Iain M. Banks","Terry Pratchett","Neil Gaiman","George R.R. Martin","Robert Jordan","Brandon Sanderson","Gene Wolfe","Joe Abercrombie","N.K. Jemisin","Kim Stanley Robinson","Connie Willis","Dan Simmons","Orson Scott Card","Larry Niven","Stanislaw Lem","Mervyn Peake","T.H. White","Lloyd Alexander","Susanna Clarke",
  // Genre canon — mystery / crime / horror / thriller
  "Wilkie Collins","Agatha Christie","Dorothy L. Sayers","Raymond Chandler","Dashiell Hammett","Patricia Highsmith","P.D. James","Ruth Rendell","John le Carre","Georges Simenon","Ross Macdonald","James Ellroy","Elmore Leonard","H.P. Lovecraft","Shirley Jackson","Stephen King","Peter Straub","Richard Matheson","Clive Barker",
  // Other major modern world / postcolonial
  "Chinua Achebe","Nadine Gordimer","J.M. Coetzee","Naguib Mahfouz","V.S. Naipaul","R.K. Narayan","Anita Desai","Amitav Ghosh","Vikram Seth","Arundhati Roy","Rohinton Mistry","Yukio Mishima","Yasunari Kawabata","Junichiro Tanizaki","Kenzaburo Oe","Haruki Murakami","Kobo Abe","Natsume Soseki","Lu Xun","Eileen Chang","Orhan Pamuk","Amos Oz","David Grossman","Mario Vargas Llosa","Margaret Atwood","Alice Munro","Robertson Davies","Mordecai Richler","Michael Ondaatje",
];

const present = [], thin = [], absent = [];
const seen = new Set();
for (const a of CANON) {
  if (seen.has(norm(a))) continue;
  seen.add(norm(a));
  const titles = books.filter(b => norm(b.author) === norm(a)).map(b => b.title);
  if (titles.length === 0) absent.push(a);
  else if (titles.length <= 4) thin.push({ a, titles });
  else present.push({ a, n: titles.length });
}

console.log(`=== AUDIT: ${seen.size} canonical authors checked ===\n`);
console.log(`ABSENT ENTIRELY (${absent.length}):`);
absent.forEach(a => console.log(`  ✗ ${a}`));
console.log(`\nTHIN — 4 or fewer (${thin.length}):`);
thin.forEach(({ a, titles }) => console.log(`  • ${a} [${titles.length}]: ${titles.join(" | ")}`));
console.log(`\nWELL-COVERED (5+): ${present.length} authors`);
