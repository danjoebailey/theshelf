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
    fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(cleanTitle)}&author=${encodeURIComponent(author || "")}&limit=5&fields=cover_i`)
      .then(r => r.json()).catch(() => null),
    fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(`${cleanTitle} ${author || ""}`.trim())}&entity=ebook&limit=5&media=ebook`)
      .then(r => r.json()).catch(() => null),
  ]);

  const coverId = olData?.docs?.find(d => d.cover_i)?.cover_i || null;
  const itunesThumb = itunesData?.results?.find(r => r.artworkUrl100)?.artworkUrl100?.replace("/100x100bb.", "/400x600bb.") || null;

  // Prefer OpenLibrary (reliable CDN) over Google Books for coverUrl; iTunes as fallback
  const olCoverUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : null;
  const gbIsbnThumb = gbIsbnData?.items?.[0]?.volumeInfo?.imageLinks?.thumbnail;
  const gbTitleThumb = gbTitleData?.items?.find(i => i.volumeInfo?.imageLinks?.thumbnail)?.volumeInfo?.imageLinks?.thumbnail;
  const coverUrl = olCoverUrl || cleanThumb(gbIsbnThumb) || cleanThumb(gbTitleThumb) || itunesThumb || null;

  res.json({ coverUrl, coverId });
}
