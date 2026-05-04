import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function callClaude(apiKey, prompt) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 400,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!response.ok) throw new Error(await response.text());
  const data = await response.json();
  return (data.content?.[0]?.text || "").trim();
}

const CACHE_KEY = (mode) => `reed:${mode}`;

async function getCached(userId, mode) {
  if (!userId) return null;
  const { data } = await supabase
    .from("obi_verdicts")
    .select("verdict")
    .eq("user_id", userId)
    .eq("book_key", CACHE_KEY(mode))
    .single();
  try { return data?.verdict ? JSON.parse(data.verdict) : null; } catch { return null; }
}

async function saveCache(userId, mode, picks) {
  if (!userId) return;
  await supabase.from("obi_verdicts").upsert(
    { user_id: userId, book_key: CACHE_KEY(mode), verdict: JSON.stringify(picks) },
    { onConflict: "user_id,book_key" }
  );
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  const { mode = "list", shelfBooks = [], library = [], userId, refresh = false } = req.body;

  if (!shelfBooks.length) return res.json({ picks: [] });

  if (!refresh) {
    const cached = await getCached(userId, mode);
    if (cached) return res.json({ picks: cached });
  }

  const shelfLabel = mode === "list"
    ? "The List (books they plan to read)"
    : mode === "curious"
      ? "Curious (books they're interested in but haven't committed to yet)"
      : "Recommended (books pushed onto their shelf by other recommendation systems — you're the final filter)";

  const libraryLines = [...library]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .map(b => `- "${b.title}" by ${b.author} (${b.genre || "Fiction"}, rated ${b.rating}/5)`)
    .join("\n");

  const shelfLines = shelfBooks
    .map(b => `- "${b.title}" by ${b.author}${b.genre ? ` (${b.genre})` : ""}`)
    .join("\n");

  const prompt = `You are Reed, an energetic and confident reading advisor. Based on this reader's taste, pick the 5 books from their shelf they should read next.

Reader's rated library (taste profile):
${libraryLines || "No rated books yet."}

Their ${shelfLabel}:
${shelfLines}

Choose exactly 5 books from the shelf above that best match this reader's demonstrated taste. If the shelf has fewer than 5 books, return all of them. Order them by priority — #1 is the one they should pick up first.

Return ONLY a valid JSON array. Each object must have exactly these keys: "title" (string), "author" (string). Use the exact title and author as listed above. No markdown, no explanation.
Example: [{"title":"The Way of Kings","author":"Brandon Sanderson"}]`;

  try {
    let text = await callClaude(apiKey, prompt);
    text = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();
    const picks = JSON.parse(text);
    await saveCache(userId, mode, picks);
    return res.json({ picks });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
