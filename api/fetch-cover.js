function cleanThumb(url) {
  return url ? url.replace("http://", "https://").replace("&edge=curl", "") : null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { title, author, isbn } = req.body || {};
  if (!title) return res.status(400).json({ error: "Missing title" });

  const cleanTitle = title.replace(/\s*\(.*$/, "").trim();

  // Run all lookups in parallel
  const [gbIsbnData, gbTitleData, olData, itunesData] = await Promise.all([
    isbn
      ? fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&maxResults=1`)
          .then(r => r.json()).catch(() => null)
      : null,
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(`${cleanTitle} ${author || ""}`.trim())}&maxResults=5&printType=books`)
      .then(r => r.json()).catch(() => null),
    fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(cleanTitle)}&author=${encodeURIComponent(author || "")}&limit=10&fields=cover_i`)
      .then(r => r.json()).catch(() => null),
    fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(`${cleanTitle} ${author || ""}`.trim())}&entity=ebook&limit=5&media=ebook`)
      .then(r => r.json()).catch(() => null),
  ]);

  // Collect all candidates
  const seen = new Set();
  const options = [];

  function add(source, coverUrl, coverId = null) {
    const url = cleanThumb(coverUrl);
    if (!url || seen.has(url)) return;
    seen.add(url);
    options.push({ source, coverUrl: url, coverId });
  }

  // Google Books by ISBN (most precise)
  const gbIsbnThumb = gbIsbnData?.items?.[0]?.volumeInfo?.imageLinks?.thumbnail;
  if (gbIsbnThumb) add("Google Books (ISBN)", gbIsbnThumb);

  // Google Books by title — up to 3 distinct results
  (gbTitleData?.items || [])
    .map(i => i.volumeInfo?.imageLinks?.thumbnail)
    .filter(Boolean)
    .slice(0, 3)
    .forEach((url, i) => add(i === 0 ? "Google Books" : `Google Books (${i + 1})`, url));

  // iTunes — up to 3 distinct results
  (itunesData?.results || [])
    .map(r => r.artworkUrl100?.replace("/100x100bb.", "/600x600bb."))
    .filter(Boolean)
    .slice(0, 3)
    .forEach((url, i) => add(i === 0 ? "iTunes" : `iTunes (${i + 1})`, url));

  // Open Library by ISBN (direct, no search needed)
  if (isbn) add("Open Library (ISBN)", `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`);

  // Open Library by cover_i from search — up to 3
  (olData?.docs || [])
    .filter(d => d.cover_i)
    .slice(0, 3)
    .forEach((d, i) => add(
      i === 0 ? "Open Library" : `Open Library (${i + 1})`,
      `https://covers.openlibrary.org/b/id/${d.cover_i}-L.jpg`,
      d.cover_i
    ));

  const best = options[0] || null;
  const coverUrl = best?.coverUrl || null;
  const coverId = options.find(o => o.coverId)?.coverId || null;

  res.json({ coverUrl, coverId, options });
}
