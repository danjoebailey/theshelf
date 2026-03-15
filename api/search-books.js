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

async function googleBooksLookup(title, author) {
  try {
    const q = encodeURIComponent(`intitle:${title}${author ? ` inauthor:${author}` : ""}`);
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=1&printType=books`);
    const data = await res.json();
    const item = data.items?.[0];
    if (!item) return null;
    const thumb = item.volumeInfo?.imageLinks?.thumbnail;
    return {
      coverUrl: thumb ? thumb.replace("http://", "https://") : null,
      genre: inferGenre(item.volumeInfo?.categories || []),
    };
  } catch {
    return null;
  }
}

async function googleBooksSearch(query) {
  try {
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=7&printType=books`);
    const data = await res.json();
    return (data.items || []).map(item => {
      const info = item.volumeInfo || {};
      const thumb = info.imageLinks?.thumbnail;
      return {
        title:       info.title || "Unknown",
        author:      (info.authors || [])[0] || "Unknown",
        pages:       info.pageCount || 0,
        genre:       inferGenre(info.categories || []),
        coverUrl:    thumb ? thumb.replace("http://", "https://") : null,
        publishYear: info.publishedDate ? parseInt(info.publishedDate) : null,
        _fromGoogle: true,
      };
    });
  } catch {
    return [];
  }
}

const FIELDS = "title,author_name,number_of_pages_median,subject,cover_i,first_publish_year";

async function olSearch(param, query, limit = 7) {
  try {
    const url = `https://openlibrary.org/search.json?${param}=${encodeURIComponent(query)}&limit=${limit}&fields=${FIELDS}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.docs || [];
  } catch {
    return [];
  }
}

function docKey(title, author) {
  return `${(title || "").toLowerCase().replace(/[^\w]/g, "")}|${(author || "").toLowerCase().replace(/[^\w]/g, "")}`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { query } = req.body;
  if (!query?.trim()) return res.status(400).json({ error: "Missing query" });

  // Run all sources in parallel
  const [titleDocs, generalDocs, authorDocs, googleItems] = await Promise.all([
    olSearch("title", query),
    olSearch("q", query),
    olSearch("author", query),
    googleBooksSearch(query),
  ]);

  // Build OpenLibrary results first, then fill with Google Books
  const seen = new Set();
  const olMerged = [];
  for (const doc of [...titleDocs, ...generalDocs, ...authorDocs]) {
    const key = docKey(doc.title, (doc.author_name || [])[0]);
    if (!seen.has(key)) { seen.add(key); olMerged.push(doc); }
    if (olMerged.length === 7) break;
  }

  const olResults = await Promise.all(olMerged.map(async doc => {
    const genre = inferGenre(doc.subject || []);
    const coverUrl = doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : null;
    let gb = null;
    if (!coverUrl || genre === "Other") {
      gb = await googleBooksLookup(doc.title || query, (doc.author_name || [])[0] || "");
    }
    return {
      title:       doc.title || "Unknown",
      author:      (doc.author_name || [])[0] || "Unknown",
      pages:       doc.number_of_pages_median || 0,
      genre:       genre !== "Other" ? genre : (gb?.genre && gb.genre !== "Other" ? gb.genre : "Other"),
      coverUrl:    coverUrl || gb?.coverUrl || null,
      publishYear: doc.first_publish_year || null,
    };
  }));

  // Fill remaining slots with Google Books results not already seen
  const results = [...olResults];
  for (const item of googleItems) {
    if (results.length >= 7) break;
    const key = docKey(item.title, item.author);
    if (!seen.has(key)) {
      seen.add(key);
      const { _fromGoogle, ...clean } = item;
      results.push(clean);
    }
  }

  res.json(results);
}
