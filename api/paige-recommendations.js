const MODE_PROMPTS = {
  popular: `Recommend books that are widely recognised and broadly read — major bestsellers, award winners, cultural touchstones, or books that have been adapted for film or TV. Notoriety and reach are what matter — not tone, accessibility, or whether the book is feel-good. A bleak or demanding book can still be popular. Be strict: every book must have genuine mainstream cultural recognition, not just be well-regarded within a niche.`,

  trending: `Recommend books that are currently having a moment — recent releases (2022 onwards) that are being actively discussed in book communities, on social media, in book clubs, and on podcasts right now. Books that are historically popular but no longer generating active conversation do NOT qualify. An older book experiencing a genuine resurgence does qualify. Be strict: every book must feel like something people are talking about TODAY.`,

  hidden_gems: `Recommend books that deserve far more readers than they have — genuinely overlooked gems that punch well above their recognition. These could be out-of-print classics, debut novels that got lost, or international titles that never broke through in English-speaking markets. Be strict: every book must be meaningfully under-recognised relative to its quality, not just modestly less famous than a bestseller.`,

  comfort_read: `Recommend books optimised for pure reading pleasure — satisfying, warm, fast-paced, and emotionally rewarding. These are books you reach for when you want to feel good, not be challenged. Prioritise readability, pacing, and satisfying endings. Be strict: books that are dense, demanding, intellectually heavy, or emotionally gruelling do NOT qualify, even if they're widely loved.`,

  challenge_me: `Recommend books that will push this reader beyond their comfort zone — denser prose, more complex structures, demanding ideas, or genres they haven't explored. Be strict: every book must feature genuinely demanding qualities like complex prose, non-linear/experimental structure, difficult philosophical ideas, or require significant effort. Pleasant reads don't qualify.`,

  new_to_me: `Recommend books in genres, styles, time periods, or from authors that are clearly absent or underrepresented in this reader's history. Identify the gaps in their reading profile and fill them with excellent books they're unlikely to have encountered. Be strict: every book must represent something meaningfully new relative to their demonstrated reading patterns.`,
};

function parseJson(text) {
  try { return JSON.parse(text); } catch {}
  const match = text.match(/\{[\s\S]*\}/);
  if (match) { try { return JSON.parse(match[0]); } catch {} }
  return null;
}

async function claudeCall(apiKey, prompt, maxTokens = 2500) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!response.ok) throw new Error(await response.text());
  const data = await response.json();
  return (data.content?.[0]?.text || "").trim();
}

async function generate(apiKey, profileLines, mode, exclude, count, { genre = null } = {}) {
  const excludeLines = exclude.length > 0
    ? `\n\nDo NOT recommend any of the following — they have already been seen or read:\n${exclude.map(t => `- "${t}"`).join("\n")}`
    : "";

  const genreConstraint = genre
    ? `\n\nIMPORTANT: Only recommend books in the "${genre}" genre. Every recommendation must be ${genre}.`
    : "";

  const prompt = `Here is a reader's library — books they have read, with ratings where available:\n${profileLines}${excludeLines}${genreConstraint}\n\nTask: ${MODE_PROMPTS[mode]}\n\nRecommend exactly ${count} books that STRICTLY meet the criterion above AND match this reader's demonstrated taste. Be rigorous — if a book only partially fits the criterion, don't include it. For each book, provide a concise reason (1–2 sentences) explaining why it both fits the criterion and suits this reader specifically. Respond ONLY with a JSON object — no markdown, no explanation — in this exact format:\n{"recommendations":[{"title":"...","author":"...","genre":"...","publishYear":1954,"pages":320,"reason":"..."},...]}\n\nGenres must be one of: Fiction, Non-Fiction, Fantasy, Sci-Fi, Mystery, Thriller, Horror, Romance, Biography, History, Historical Fiction, Young Adult, Self-Help, Graphic Novel, Other.`;

  const text = await claudeCall(apiKey, prompt, 2500);
  const parsed = parseJson(text);
  return parsed?.recommendations || [];
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { profile, mode, exclude = [], genre = null } = req.body;
  if (!profile || !Array.isArray(profile) || profile.length === 0)
    return res.status(400).json({ error: "No profile data provided." });
  if (!MODE_PROMPTS[mode])
    return res.status(400).json({ error: "Invalid mode." });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  const profileLines = profile
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .map(b => `- "${b.title}" by ${b.author} (${b.genre})${b.rating ? `, rated ${b.rating}/5` : ""}`)
    .join("\n");

  const seen = new Set(exclude.map(t => t.toLowerCase()));

  try {
    // Round 1: generate 10 that self-filter against the strict criterion
    const genOpts = { genre };
    const batch1 = await generate(apiKey, profileLines, mode, exclude, 10, genOpts);
    let recommendations = batch1.filter(b => !seen.has(b.title.toLowerCase()));
    recommendations.forEach(b => seen.add(b.title.toLowerCase()));

    // Single top-up if parser dropped books or duplicates pruned us below 10
    if (recommendations.length < 10) {
      const needed = 10 - recommendations.length;
      const batch2 = await generate(apiKey, profileLines, mode, [...seen], needed + 2, genOpts);
      const fresh = batch2.filter(b => !seen.has(b.title.toLowerCase()));
      recommendations = [...recommendations, ...fresh].slice(0, 10);
    }

    // Reserve: any extras from the top-up beyond 10
    const reserve = recommendations.length > 10 ? recommendations.slice(10) : [];
    const finalRecs = recommendations.slice(0, 10);

    res.json({ recommendations: finalRecs, reserve });
  } catch (e) {
    res.status(500).json({ error: e.message || "Something went wrong." });
  }
}
