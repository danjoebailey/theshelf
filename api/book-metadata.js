export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { title, author } = req.body;
  if (!title) return res.status(400).json({ error: "Missing title" });

  // Try Open Library search
  try {
    const q = encodeURIComponent(`${title}${author ? " " + author : ""}`);
    const olRes = await fetch(`https://openlibrary.org/search.json?q=${q}&limit=5&fields=title,author_name,number_of_pages_median`, { signal: AbortSignal.timeout(5000) });
    if (olRes.ok) {
      const olData = await olRes.json();
      for (const doc of (olData.docs || [])) {
        if (doc.number_of_pages_median > 0) {
          return res.json({ pages: doc.number_of_pages_median });
        }
      }
    }
  } catch {}

  // Try Google Books
  try {
    const q = encodeURIComponent(`intitle:${title}${author ? ` inauthor:${author}` : ""}`);
    const gbRes = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=5`, { signal: AbortSignal.timeout(5000) });
    if (gbRes.ok) {
      const gbData = await gbRes.json();
      for (const item of (gbData.items || [])) {
        const pc = item.volumeInfo?.pageCount;
        if (pc > 0) return res.json({ pages: pc });
      }
    }
  } catch {}

  return res.json({ pages: 0 });
}
