import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// callClaude accepts either a string (legacy single-block prompt) or an array
// of content blocks (so callers can mark portions as cacheable). We use the
// latter to pin the user's library section as cache_control:ephemeral so
// repeat Obi calls in a 5-min window pay ~$0.0016/call instead of ~$0.017.
async function callClaude(apiKey, content) {
  const blocks = typeof content === "string" ? [{ type: "text", text: content }] : content;
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 200,
      messages: [{ role: "user", content: blocks }],
    }),
  });
  if (!response.ok) throw new Error(await response.text());
  const data = await response.json();
  return (data.content?.[0]?.text || "").trim();
}

function buildProfileLines(profile) {
  return [...profile]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .map(b => `- "${b.title}" by ${b.author} (${b.genre})${b.rating ? `, rated ${b.rating}/5` : b.shelf === "DNF" ? ", did not finish" : ""}`)
    .join("\n");
}

function bookKey(title, author) {
  const norm = s => (s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  return `verdict::${norm(title)}::${norm(author)}`;
}

function recommendKey(author) {
  const norm = s => (s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  return `recommend::${norm(author)}`;
}

async function getCached(userId, key) {
  if (!userId) return null;
  const { data } = await supabase
    .from("obi_verdicts")
    .select("verdict")
    .eq("user_id", userId)
    .eq("book_key", key)
    .single();
  return data?.verdict || null;
}

async function saveCache(userId, key, verdict) {
  if (!userId) return;
  await supabase.from("obi_verdicts").upsert(
    { user_id: userId, book_key: key, verdict },
    { onConflict: "user_id,book_key" }
  );
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  const { mode = "verdict", userId } = req.body;

  // ── Recommend mode: which book by this author should I read? ──
  if (mode === "recommend") {
    const { author, bibliography, profile } = req.body;
    if (!author || !bibliography?.length) return res.status(400).json({ error: "Missing data" });

    const key = recommendKey(author);
    const cached = await getCached(userId, key);
    if (cached) return res.json({ verdict: cached });

    const biblioLines = bibliography
      .map(b => `- "${b.title}"${b.publishYear ? ` (${b.publishYear})` : ""}${b.genre ? `, ${b.genre}` : ""}`)
      .join("\n");

    const hasProfile = (profile || []).length >= 3;

    // Split the prompt: cached profile prefix + uncached question. Profile
    // is reused across many calls in a session; pinning it as ephemeral cache
    // makes call 2..N within 5 min pay ~10% of the input price.
    let blocks;
    if (hasProfile) {
      const cached = `You are Obi, a sharp literary companion. Based on this reader's library, recommend the single best book to start with from ${author}'s unread bibliography.

Reader's library:
${buildProfileLines(profile)}`;
      const uncached = `

${author}'s unread books:
${biblioLines}

Name one specific title and explain in 2–3 sentences why it's the right fit for this reader. Be direct. No intro, no sign-off, no markdown.`;
      blocks = [
        { type: "text", text: cached, cache_control: { type: "ephemeral" } },
        { type: "text", text: uncached },
      ];
    } else {
      blocks = `You are Obi, a sharp literary companion. Recommend the single best entry point into ${author}'s work from this list.

${author}'s books:
${biblioLines}

Name one specific title and explain in 2–3 sentences why it's the best starting point. Be direct. No intro, no sign-off, no markdown.`;
    }

    try {
      const verdict = await callClaude(apiKey, blocks);
      await saveCache(userId, key, verdict);
      return res.json({ verdict });
    } catch (e) {
      return res.status(500).json({ error: e.message || "Something went wrong." });
    }
  }

  // ── Verdict mode: would I like this specific book? ──
  const { book, profile } = req.body;
  if (!book) return res.status(400).json({ error: "Missing book data" });

  if ((profile || []).length < 3) {
    return res.json({ verdict: "Your shelves are still pretty bare — add some books you've loved (and a few you've abandoned) and I'll have a lot more to work with." });
  }

  const key = bookKey(book.title, book.author);
  const cached = await getCached(userId, key);
  if (cached) return res.json({ verdict: cached });

  // Split: cached profile prefix + uncached book-specific tail. Repeat Obi
  // calls within 5 min reuse the cached prefix at ~10% of input price.
  const cachedProfile = `You are Obi, a sharp and candid literary companion. Based on this reader's library, give a short honest verdict on whether they would enjoy the book in question.

Reader's library:
${buildProfileLines(profile)}`;
  const uncachedQuestion = `

Book in question: "${book.title}" by ${book.author} (${book.genre})${book.description ? `\n\nAbout the book: ${book.description}` : ""}

Write 2–3 sentences. Be direct and specific — reference what you actually know about this reader's taste. Don't hedge. No intro, no sign-off, no markdown.`;

  try {
    const verdict = await callClaude(apiKey, [
      { type: "text", text: cachedProfile, cache_control: { type: "ephemeral" } },
      { type: "text", text: uncachedQuestion },
    ]);
    await saveCache(userId, key, verdict);
    res.json({ verdict });
  } catch (e) {
    res.status(500).json({ error: e.message || "Something went wrong." });
  }
}
