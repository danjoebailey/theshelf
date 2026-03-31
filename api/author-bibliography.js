import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const GENRES = ["Fiction","Non-Fiction","Fantasy","Sci-Fi","Mystery","Thriller","Horror","Romance","Biography","History","Historical Fiction","Young Adult","Self-Help","Graphic Novel","Other"];
const RESULT_FORMAT = `Return ONLY a valid JSON array — no markdown, no explanation, no code blocks. The array must be sorted from most to least culturally significant and widely known. Each object must have exactly these keys: "title" (string — just the book title, no series info), "series" (string or null — e.g. "Malazan Book of the Fallen, #3"), "publishYear" (number or null), "pages" (number — approximate page count, or null if unknown), "tier" (number — 1 for essential/landmark works, 2 for notable/recommended works, 3 for minor/obscure/completionist works), "genre" (string — must be exactly one of: ${GENRES.join(", ")}). Example: [{"title":"Memories of Ice","series":"Malazan Book of the Fallen, #3","publishYear":2001,"pages":943,"tier":1,"genre":"Fantasy"}]`;


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
      max_tokens: 8000,
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

  res.json({ items, cached: false });
}
