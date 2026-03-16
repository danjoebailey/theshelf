export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { title, author, isbn } = req.body;
  if (!title) return res.status(400).json({ error: "Missing title" });

  const t = encodeURIComponent(title.replace(/\s*\(.*$/, "").trim());
  const a = encodeURIComponent(author || "");

  const [olData, gbTitleData, gbIsbnData] = await Promise.all([
    fetch(`https://openlibrary.org/search.json?title=${t}&author=${a}&limit=1&fields=cover_i`)
      .then(r => r.json()).catch(() => null),
    fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${t}+inauthor:${a}&maxResults=1&printType=books`)
      .then(r => r.json()).catch(() => null),
    isbn
      ? fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&maxResults=1`)
          .then(r => r.json()).catch(() => null)
      : Promise.resolve(null),
  ]);

  const coverId = olData?.docs?.[0]?.cover_i || null;
  const gbIsbnThumb = gbIsbnData?.items?.[0]?.volumeInfo?.imageLinks?.thumbnail;
  const gbTitleThumb = gbTitleData?.items?.[0]?.volumeInfo?.imageLinks?.thumbnail;
  const raw = gbIsbnThumb || gbTitleThumb || null;
  const coverUrl = raw ? raw.replace("http://", "https://").replace("&edge=curl", "") : null;

  res.json({ coverUrl, coverId });
}
