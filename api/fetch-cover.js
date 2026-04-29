function cleanThumb(url) {
  return url ? url.replace("http://", "https://").replace("&edge=curl", "") : null;
}

function titleMatches(returned, query) {
  const normalize = s => s.toLowerCase()
    .replace(/\[.*?\]/g, "")           // strip [50th Anniversary Edition] etc
    .replace(/[^a-z0-9,:\s]/g, "")
    .replace(/\s+/g, " ").trim();
  const uninvert = s => s.replace(/^(\w[\w\s]*),\s*(the|a|an)\b/i, "$2 $1").trim();
  const r = uninvert(normalize(returned));
  const q = uninvert(normalize(query));
  if (r === q) return true;
  if (r.startsWith(q + ":") || r.startsWith(q + ", ") || r.startsWith(q + ",")) return true;
  const rPre = r.split(/\s*[,:]\s*/)[0].trim();
  const qPre = q.split(/\s*[,:]\s*/)[0].trim();
  return rPre.length > 0 && rPre === qPre;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { title, author, isbn } = req.body || {};
  if (!title) return res.status(400).json({ error: "Missing title" });

  const cleanTitle = title.replace(/\s*\(.*$/, "").trim();

  const [gbIsbnData, gbTitleData, olData, itunesData] = await Promise.all([
    isbn
      ? fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&maxResults=1`)
          .then(r => r.json()).catch(() => null)
      : null,
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(`${cleanTitle} ${author || ""}`.trim())}&maxResults=5&printType=books`)
      .then(r => r.json()).catch(() => null),
    fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(cleanTitle)}&author=${encodeURIComponent(author || "")}&limit=10&fields=cover_i,title`)
      .then(r => r.json()).catch(() => null),
    fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(`${cleanTitle} ${author || ""}`.trim())}&entity=ebook&limit=5&media=ebook`)
      .then(r => r.json()).catch(() => null),
  ]);

  const seen = new Set();
  const options = [];
  // Track first-seen authors per source — returned alongside the cover so
  // shelf-scan callers can backfill Unknown authors when the fetcher matched
  // the book in OpenLibrary / Google Books / iTunes.
  const authorsSeen = [];

  function add(source, coverUrl, coverId = null, foundAuthor = null) {
    const url = cleanThumb(coverUrl);
    if (!url || seen.has(url)) return;
    seen.add(url);
    options.push({ source, coverUrl: url, coverId });
    if (foundAuthor) authorsSeen.push(foundAuthor);
  }

  // 1. iTunes first — best quality (600x600)
  (itunesData?.results || [])
    .filter(r => titleMatches(r.trackName || "", cleanTitle))
    .slice(0, 3)
    .forEach((r, i) => {
      const url = r.artworkUrl100?.replace("/100x100bb.", "/600x600bb.");
      if (url) add(i === 0 ? "iTunes" : `iTunes (${i + 1})`, url, null, r.artistName);
    });

  // 2. Open Library — reliable, always -L.jpg
  if (isbn) add("Open Library (ISBN)", `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`);
  (olData?.docs || [])
    .filter(d => d.cover_i && titleMatches(d.title || "", cleanTitle))
    .slice(0, 3)
    .forEach((d, i) => add(
      i === 0 ? "Open Library" : `Open Library (${i + 1})`,
      `https://covers.openlibrary.org/b/id/${d.cover_i}-L.jpg`,
      d.cover_i,
      Array.isArray(d.author_name) ? d.author_name[0] : null
    ));

  // 3. Google Books — thumbnail as-is (last resort)
  const gbIsbnVi = gbIsbnData?.items?.[0]?.volumeInfo;
  const gbIsbnThumb = gbIsbnVi?.imageLinks?.thumbnail;
  if (gbIsbnThumb) add("Google Books (ISBN)", gbIsbnThumb, null, gbIsbnVi.authors?.[0]);

  (gbTitleData?.items || [])
    .filter(i => titleMatches(i.volumeInfo?.title || "", cleanTitle))
    .slice(0, 3)
    .forEach((it, i) => {
      const vi = it.volumeInfo;
      if (vi?.imageLinks?.thumbnail) add(
        i === 0 ? "Google Books" : `Google Books (${i + 1})`,
        vi.imageLinks.thumbnail,
        null,
        vi.authors?.[0]
      );
    });

  const best = options[0] || null;
  const coverUrl = best?.coverUrl || null;
  const coverId = options.find(o => o.coverId)?.coverId || null;
  // Author surfaced by whichever source matched first — lets shelf-scan
  // backfill 'Unknown' authors when OCR missed the spine. Renamed to avoid
  // shadowing the `author` param destructured from req.body.
  const matchedAuthor = authorsSeen[0] || null;
  // Page count from the GB ISBN match — only meaningful when caller passed
  // an ISBN, since title-only matches return whichever edition GB ranked
  // first (often hardcover) and would silently overwrite the user's value.
  const pages = isbn && gbIsbnVi?.pageCount ? gbIsbnVi.pageCount : null;

  res.json({ coverUrl, coverId, author: matchedAuthor, pages, options });
}
