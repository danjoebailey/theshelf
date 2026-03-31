const GENRE_MAP = {
  "young adult":         "Young Adult",
  "ya fiction":          "Young Adult",
  "juvenile fiction":    "Young Adult",
  "children":            "Young Adult",
  "graphic novel":       "Graphic Novel",
  "comics":              "Graphic Novel",
  "manga":               "Graphic Novel",
  "horror":              "Horror",
  "gothic":              "Horror",
  "occult":              "Horror",
  "historical fiction":  "Historical Fiction",
  "thriller":            "Thriller",
  "suspense":            "Thriller",
  "true crime":          "Thriller",
  "crime":               "Mystery",
  "mystery":             "Mystery",
  "detective":           "Mystery",
  "noir":                "Mystery",
  "romance":             "Romance",
  "literary fiction":    "Fiction",
  "fiction":             "Fiction",
  "science fiction":     "Sci-Fi",
  "fantasy":             "Fantasy",
  "biography":           "Biography",
  "autobiography":       "Biography",
  "memoir":              "Biography",
  "history":             "History",
  "historical":          "History",
  "self-help":           "Self-Help",
  "personal development":"Self-Help",
  "psychology":          "Non-Fiction",
  "philosophy":          "Non-Fiction",
  "science":             "Non-Fiction",
  "nonfiction":          "Non-Fiction",
  "non-fiction":         "Non-Fiction",
};

function inferGenre(subjects = []) {
  const joined = subjects.join(" ").toLowerCase();
  for (const [key, genre] of Object.entries(GENRE_MAP)) {
    if (joined.includes(key)) return genre;
  }
  return "Other";
}

function docKey(title, author) {
  return `${(title || "").toLowerCase().replace(/[^\w]/g, "")}|${(author || "").toLowerCase().replace(/[^\w]/g, "")}`;
}

async function googleBooksSearch(query) {
  try {
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=7&printType=books`);
    const data = await res.json();
    return (data.items || []).map(item => {
      const info = item.volumeInfo || {};
      const thumb = info.imageLinks?.thumbnail;
      return {
        title:       toTitleCase(info.title || "Unknown"),
        author:      (info.authors || [])[0] || "Unknown",
        pages:       info.pageCount || 0,
        genre:       inferGenre(info.categories || []),
        coverUrl:    thumb ? thumb.replace("http://", "https://").replace("&edge=curl", "") : null,
        publishYear: info.publishedDate ? parseInt(info.publishedDate) : null,
      };
    });
  } catch {
    return [];
  }
}

async function olSearch(query) {
  try {
    const fields = "title,author_name,number_of_pages_median,subject,cover_i,first_publish_year";
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=7&fields=${fields}`;
    const res = await fetch(url);
    const data = await res.json();
    return (data.docs || []).map(doc => ({
      title:       toTitleCase(doc.title || "Unknown"),
      author:      (doc.author_name || [])[0] || "Unknown",
      pages:       doc.number_of_pages_median || 0,
      genre:       inferGenre(doc.subject || []),
      coverUrl:    doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : null,
      publishYear: doc.first_publish_year || null,
    }));
  } catch {
    return [];
  }
}

async function itunesSearch(query) {
  try {
    const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=ebook&limit=7&media=ebook`);
    const data = await res.json();
    return (data.results || []).map(r => ({
      title:       toTitleCase(r.trackName || "Unknown"),
      author:      r.artistName || "Unknown",
      pages:       0,
      genre:       inferGenre([r.primaryGenreName || ""]),
      coverUrl:    r.artworkUrl100 ? r.artworkUrl100.replace("/100x100bb.", "/400x600bb.") : null,
      publishYear: r.releaseDate ? parseInt(r.releaseDate) : null,
    }));
  } catch {
    return [];
  }
}

const TITLE_LOWER = new Set(["a","an","the","and","but","or","nor","for","so","yet","at","by","in","of","on","to","up","as","vs","via"]);

function toTitleCase(str) {
  if (!str || str === "Unknown") return str;
  const words = str.split(" ");
  return words.map((word, i) => {
    if (!word) return word;
    const m = word.match(/^([^a-zA-Z]*)([a-zA-Z].*)$/);
    if (!m) return word;
    const prefix = m[1];
    const rest = m[2].toLowerCase();
    const isFirst = i === 0;
    const isLast = i === words.length - 1;
    if (!isFirst && !isLast && !prefix && TITLE_LOWER.has(rest)) return rest;
    return prefix + rest.charAt(0).toUpperCase() + rest.slice(1);
  }).join(" ");
}

const STOP_WORDS = new Set(["the","a","an","and","of","by","in","on","at","to","for","with","is","it","my","his","her","their","our"]);

function isRelevant(item, queryWords) {
  if (!queryWords.length) return true;
  const haystack = `${item.title} ${item.author}`.toLowerCase();
  return queryWords.some(w => haystack.includes(w));
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { query, mode = "All" } = req.body;
  if (!query?.trim()) return res.status(400).json({ error: "Missing query" });

  const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 1 && !STOP_WORDS.has(w));

  const googleQuery = mode === "Books" || mode === "Series" ? `intitle:${query}`
    : mode === "Authors" ? `inauthor:${query}`
    : query;
  const olQuery = mode === "Authors"
    ? `https://openlibrary.org/search.json?author=${encodeURIComponent(query)}&limit=7&fields=title,author_name,number_of_pages_median,subject,cover_i,first_publish_year`
    : null;

  // Run all three in parallel; Google Books primary, OL fills gaps, iTunes catches the rest
  const [googleItems, olItems, itunesItems] = await Promise.all([
    googleBooksSearch(googleQuery),
    olQuery ? fetch(olQuery).then(r => r.json()).then(data => (data.docs || []).map(doc => ({
      title: toTitleCase(doc.title || "Unknown"),
      author: (doc.author_name || [])[0] || "Unknown",
      pages: doc.number_of_pages_median || 0,
      genre: inferGenre(doc.subject || []),
      coverUrl: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : null,
      publishYear: doc.first_publish_year || null,
    }))).catch(() => []) : olSearch(query),
    itunesSearch(query),
  ]);

  const seen = new Set();
  const results = [];

  for (const item of [...googleItems, ...olItems, ...itunesItems]) {
    if (results.length >= 7) break;
    if (!isRelevant(item, queryWords)) continue;
    const key = docKey(item.title, item.author);
    if (!seen.has(key)) { seen.add(key); results.push(item); }
  }

  res.json(results);
}
