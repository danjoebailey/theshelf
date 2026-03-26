import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const GENRES = ["Fiction","Non-Fiction","Fantasy","Sci-Fi","Mystery","Thriller","Horror","Romance","Biography","History","Historical Fiction","Young Adult","Self-Help","Graphic Novel","Other"];
const RESULT_FORMAT = `Return ONLY a valid JSON array — no markdown, no explanation, no code blocks. The array must be sorted from most to least culturally significant and widely known. Each object must have exactly these keys: "title" (string — just the book title, no series info), "series" (string or null — e.g. "Malazan Book of the Fallen, #3"), "publishYear" (number or null), "pages" (number — approximate page count, or null if unknown), "tier" (number — 1 for essential/landmark works, 2 for notable/recommended works, 3 for minor/obscure/completionist works), "genre" (string — must be exactly one of: ${GENRES.join(", ")}). Example: [{"title":"Memories of Ice","series":"Malazan Book of the Fallen, #3","publishYear":2001,"pages":943,"tier":1,"genre":"Fantasy"}]`;

function titleMatches(returned, query) {
  const normalize = s => s.toLowerCase().replace(/[^a-z0-9,:\s]/g, "").replace(/\s+/g, " ").trim();
  const r = normalize(returned), q = normalize(query);
  if (r === q) return true;
  if (r.startsWith(q + ":") || r.startsWith(q + ", ") || r.startsWith(q + ",")) return true;
  return r.split(/\s*[,:]\s*/)[0].trim() === q.split(/\s*[,:]\s*/)[0].trim();
}

async function fetchCoverUrl(title, author) {
  try {
    const [gbData, itunesData] = await Promise.all([
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(`${title} ${author}`)}&maxResults=5&printType=books`)
        .then(r => r.json()).catch(() => null),
      fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(`${title} ${author}`)}&entity=ebook&limit=5&media=ebook`)
        .then(r => r.json()).catch(() => null),
    ]);
    const gbItem = (gbData?.items || []).find(i => titleMatches(i.volumeInfo?.title || "", title) && i.volumeInfo?.imageLinks?.thumbnail);
    const itunesItem = (itunesData?.results || []).find(r => titleMatches(r.trackName || "", title) && r.artworkUrl100);
    const itunesUrl = itunesItem?.artworkUrl100?.replace("/100x100bb.", "/600x600bb.");
    const gbUrl = gbItem?.volumeInfo.imageLinks.thumbnail.replace("http://", "https://").replace("&edge=curl", "");
    return itunesUrl || gbUrl || null;
  } catch {}
  return null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { author } = req.body || {};
  if (!author) return res.status(400).json({ error: "Missing author" });

  // Check Supabase cache first
  const { data: cached } = await supabase
    .from("author_bibliographies")
    .select("items, generated_at")
    .eq("author", author)
    .single();

  if (cached?.items) {
    return res.json({ items: cached.items, cached: true });
  }

  // Generate via Claude API
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  const prompt = `List all notable books written by ${author} — every novel, story collection, or major non-fiction work they are known for. Include both acclaimed works and lesser-known titles. Do not include books they edited, translated, or contributed to as a co-author unless they are the primary author. Within each tier, order books by cultural significance and notoriety — the most widely read and recognised works first. ${RESULT_FORMAT}`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      temperature: 0.2,
      max_tokens: 4000,
      system: "You are a knowledgeable literary reference assistant. Provide accurate, comprehensive bibliographies for authors.",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return res.status(500).json({ error: err });
  }

  const data = await response.json();
  let text = (data.content?.[0]?.text || "").trim();
  text = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();

  let items;
  try {
    items = JSON.parse(text);
  } catch {
    return res.status(500).json({ error: "Failed to parse AI response", raw: text });
  }

  // Fetch covers sequentially to avoid rate limiting
  const itemsWithCovers = [];
  for (const item of items) {
    const coverUrl = await fetchCoverUrl(item.title, author);
    itemsWithCovers.push({ ...item, coverUrl: coverUrl || null });
  }

  // Cache in Supabase
  await supabase.from("author_bibliographies").upsert({
    author,
    items: itemsWithCovers,
    generated_at: new Date().toISOString(),
  });

  res.json({ items: itemsWithCovers, cached: false });
}
