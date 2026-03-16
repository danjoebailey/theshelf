function cleanThumb(url) {
  return url ? url.replace("http://", "https://").replace("&edge=curl", "") : null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { title, author, isbn } = req.body || {};
  if (!title) return res.status(400).json({ error: "Missing title" });

  const cleanTitle = title.replace(/\s*\(.*$/, "").trim();

  // Run all lookups in parallel
  const [gbIsbnData, gbTitleData, olData] = await Promise.all([
    isbn
      ? fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&maxResults=1`)
          .then(r => r.json()).catch(() => null)
      : null,
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(`${cleanTitle} ${author || ""}`.trim())}&maxResults=3&printType=books`)
      .then(r => r.json()).catch(() => null),
    fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(cleanTitle)}&author=${encodeURIComponent(author || "")}&limit=1&fields=cover_i`)
      .then(r => r.json()).catch(() => null),
  ]);

  const coverId = olData?.docs?.[0]?.cover_i || null;

  const gbIsbnThumb = gbIsbnData?.items?.[0]?.volumeInfo?.imageLinks?.thumbnail;
  // Find first result with a thumbnail
  const gbTitleThumb = gbTitleData?.items?.find(i => i.volumeInfo?.imageLinks?.thumbnail)?.volumeInfo?.imageLinks?.thumbnail;
  const coverUrl = cleanThumb(gbIsbnThumb) || cleanThumb(gbTitleThumb) || null;

  res.json({ coverUrl, coverId });
}
