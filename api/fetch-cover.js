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

  function add(source, coverUrl, coverId = null) {
    const url = cleanThumb(coverUrl);
    if (!url || seen.has(url)) return;
    seen.add(url);
    options.push({ source, coverUrl: url, coverId });
  }

  // 1. iTunes first — best quality (600x600)
  (itunesData?.results || [])
    .filter(r => titleMatches(r.trackName || "", cleanTitle))
    .map(r => r.artworkUrl100?.replace("/100x100bb.", "/600x600bb."))
    .filter(Boolean)
    .slice(0, 3)
    .forEach((url, i) => add(i === 0 ? "iTunes" : `iTunes (${i + 1})`, url));

  // 2. Open Library — reliable, always -L.jpg
  if (isbn) add("Open Library (ISBN)", `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`);
  (olData?.docs || [])
    .filter(d => d.cover_i && titleMatches(d.title || "", cleanTitle))
    .slice(0, 3)
    .forEach((d, i) => add(
      i === 0 ? "Open Library" : `Open Library (${i + 1})`,
      `https://covers.openlibrary.org/b/id/${d.cover_i}-L.jpg`,
      d.cover_i
    ));

  // 3. Google Books — thumbnail as-is (last resort)
  const gbIsbnThumb = gbIsbnData?.items?.[0]?.volumeInfo?.imageLinks?.thumbnail;
  if (gbIsbnThumb) add("Google Books (ISBN)", gbIsbnThumb);

  (gbTitleData?.items || [])
    .filter(i => titleMatches(i.volumeInfo?.title || "", cleanTitle))
    .map(i => i.volumeInfo?.imageLinks?.thumbnail)
    .filter(Boolean)
    .slice(0, 3)
    .forEach((url, i) => add(i === 0 ? "Google Books" : `Google Books (${i + 1})`, url));

  const best = options[0] || null;
  const coverUrl = best?.coverUrl || null;
  const coverId = options.find(o => o.coverId)?.coverId || null;

  res.json({ coverUrl, coverId, options });
}
