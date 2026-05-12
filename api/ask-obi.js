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
  // v2 — invalidates pre-existing cache entries that lack the trailing
  // <call>...</call> tag so the auto-route to Recommended works.
  return `verdict::v2::${norm(title)}::${norm(author)}`;
}

function recommendKey(author) {
  const norm = s => (s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  // v5 — v4 phrasing ("if queued fits, name it. Otherwise...") biased Obi
  // toward queued picks regardless of taste fit. v5 presents queued and
  // unread as equal candidates and tells Obi to judge by fit, not shelf.
  return `recommend::v5::${norm(author)}`;
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

  // ── Bulk filter mode: from a list of N candidates, which N' should this reader try? ──
  // Used by Paige's "Obi-curate" button: reader gets a Paige-ranked list of
  // 50-100 books, Obi applies qualitative judgment to filter down to a top-10
  // slate. Single LLM call (~2-3¢) with cached profile prefix.
  if (mode === "bulk_filter") {
    const { books, profile, listFingerprint } = req.body;
    if (!Array.isArray(books) || !books.length) return res.status(400).json({ error: "No books" });

    // v4 cache key — bumped during a prompt-tightening experiment that was
    // reverted after one questionable rec turned out to be too thin a signal
    // to act on. Leaving v4 in place keeps invalidated cache entries dead,
    // so the next call recomputes fresh under the (restored) inclusive prompt.
    // that anchored on 'at most 10' + 'be strict' and missed obvious yeses.
    const cacheKey = `bulk::v4::${listFingerprint || ""}`;
    if (listFingerprint) {
      const cached = await getCached(userId, cacheKey);
      if (cached) {
        try { return res.json({ picks: JSON.parse(cached) }); } catch {}
      }
    }

    // Without a meaningful profile, just pass through the original order.
    if ((profile || []).length < 3) {
      return res.json({ picks: books.slice(0, 10).map(b => b.title) });
    }

    const cachedProfile = `You are Obi, a sharp and candid literary companion. Use this reader's library to identify which books from a candidate list they'd most genuinely love.

Reader's library:
${buildProfileLines(profile)}`;

    const bookList = books.map((b, i) => `${i + 1}. ${b.title} / ${b.author} / ${b.genre || "?"}`).join("\n");

    const uncachedQuery = `

Candidate list:
${bookList}

For each book on this list, apply this test: if the reader asked you about it individually, would you say "yes, read this" or "pass"? Include EVERY book where the answer is yes — don't stop at an arbitrary count, and don't shy away from returning 15+ books if that many genuinely fit.

A yes requires alignment across multiple dimensions (prose quality, themes, tone, intellectual register, what this reader has actually loved before) — not just a shared genre tag. A book that nails 4+ dimensions is a yes; one that shares only a genre is a pass.

Return up to 25 to keep the response manageable. Return [] if none fit.

Output ONLY a JSON array of 1-based indices in original input order. No prose.
Example: [1, 3, 4, 7, 12, 15, 18, 23]`;

    try {
      const response = await callClaude(apiKey, [
        { type: "text", text: cachedProfile, cache_control: { type: "ephemeral" } },
        { type: "text", text: uncachedQuery },
      ]);
      const match = response.match(/\[[\d,\s]+\]/);
      if (!match) throw new Error(`No JSON array in Obi response: ${response.slice(0, 100)}`);
      const indices = JSON.parse(match[0]);
      const picks = indices.map(i => books[i - 1]?.title).filter(Boolean).slice(0, 25);
      if (listFingerprint) await saveCache(userId, cacheKey, JSON.stringify(picks));
      return res.json({ picks });
    } catch (e) {
      return res.status(500).json({ error: e.message || "Obi filter failed" });
    }
  }

  // ── Recommend mode: which book by this author should I read? ──
  if (mode === "recommend") {
    const { author, bibliography, queued = [], profile } = req.body;
    if (!author || !bibliography?.length) return res.status(400).json({ error: "Missing data" });

    const key = recommendKey(author);
    const cached = await getCached(userId, key);
    if (cached) return res.json({ verdict: cached });

    const biblioLines = bibliography
      .map(b => `- "${b.title}"${b.publishYear ? ` (${b.publishYear})` : ""}${b.genre ? `, ${b.genre}` : ""}`)
      .join("\n");

    const queuedLines = queued.length
      ? queued.map(b => `- "${b.title}" (on the reader's "${b.shelf}" shelf)`).join("\n")
      : null;

    const hasProfile = (profile || []).length >= 3;

    // Split the prompt: cached profile prefix + uncached question. Profile
    // is reused across many calls in a session; pinning it as ephemeral cache
    // makes call 2..N within 5 min pay ~10% of the input price.
    let blocks;
    if (hasProfile) {
      const cached = `You are Obi, a sharp and candid literary companion. Based on this reader's library, decide whether any book in ${author}'s unread bibliography is a genuine fit — and if so, which one to start with.

Reader's library:
${buildProfileLines(profile)}`;
      const uncached = `

${author}'s unread books:
${biblioLines}${queuedLines ? `\n\nAlso on this reader's shelves but not yet read (treat as equal candidates):\n${queuedLines}` : ""}

Pick the best entry point into ${author}'s work for this reader. Judge by fit — queued and unread are equally available; shelf status doesn't make a book a better or worse pick. If nothing here is for this reader, say so and name what's off. Don't call queued books "absent" or "missing."

Hard limit: 2 sentences. Direct prose — no preamble, no asides, no comparison name-stacking, no markdown.`;
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
    return res.json({ verdict: "Your shelves are still pretty bare — add some books you've loved (and a few you've abandoned) and I'll have a lot more to work with.", call: null });
  }

  const key = bookKey(book.title, book.author);
  const cached = await getCached(userId, key);
  if (cached) {
    const parsed = parseVerdict(cached);
    return res.json(parsed);
  }

  // Split: cached profile prefix + uncached book-specific tail. Repeat Obi
  // calls within 5 min reuse the cached prefix at ~10% of input price.
  const cachedProfile = `You are Obi, a sharp and candid literary companion. Based on this reader's library, give a short honest verdict on whether they would enjoy the book in question.

Reader's library:
${buildProfileLines(profile)}`;
  const uncachedQuestion = `

Book in question: "${book.title}" by ${book.author} (${book.genre})${book.description ? `\n\nAbout the book: ${book.description}` : ""}

Write 2–3 sentences. Be direct and specific — reference what you actually know about this reader's taste. Don't hedge. No intro, no sign-off, no markdown.

After your verdict, on its own final line, output EXACTLY one of these three strings — nothing else on that line, no quotes, no markdown:
<call>yes</call>
<call>pass</call>
<call>maybe</call>

Pick "yes" if you'd recommend this book to this reader, "pass" if not, "maybe" only if genuinely uncertain. This tag is required — your response is incomplete without it.`;

  try {
    const raw = await callClaude(apiKey, [
      { type: "text", text: cachedProfile, cache_control: { type: "ephemeral" } },
      { type: "text", text: uncachedQuestion },
    ]);
    await saveCache(userId, key, raw);
    res.json(parseVerdict(raw));
  } catch (e) {
    res.status(500).json({ error: e.message || "Something went wrong." });
  }
}

// Split Obi's response into the visible prose and the structured call.
// Old cache entries lack the tag — call comes back null, no auto-routing.
function parseVerdict(raw) {
  // Primary: closed <call>yes|pass|maybe</call>
  let m = raw.match(/<call>\s*(yes|pass|maybe)\s*<\/call>/i);
  // Fallback A: dangling <call>yes (truncated by max_tokens)
  if (!m) m = raw.match(/<call>\s*(yes|pass|maybe)\b/i);
  // Fallback B: bare keyword on its own final line (markdown / no tag)
  if (!m) m = raw.match(/(?:^|\n)\s*\**\s*(yes|pass|maybe)\s*\**\s*$/i);
  const call = m ? m[1].toLowerCase() : null;
  const verdict = raw
    .replace(/<call>[^<\n]*(?:<\/call>)?/gi, "")
    .replace(/(?:^|\n)\s*\**\s*(yes|pass|maybe)\s*\**\s*$/i, "")
    .trim();
  return { verdict, call };
}
