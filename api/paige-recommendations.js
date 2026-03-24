export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { profile, mode, exclude } = req.body;
  if (!profile || !Array.isArray(profile) || profile.length === 0)
    return res.status(400).json({ error: "No profile data provided." });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  const MODE_INSTRUCTIONS = {
    popular:      "Recommend books that are widely beloved and have strong mainstream appeal — bestsellers, highly rated on Goodreads, broadly discussed in reading culture. These should be books that are easy to recommend to anyone with this taste profile.",
    obscure:      "Recommend books that are genuinely lesser-known and under-the-radar — cult favourites, critically respected but not widely read, books that serious readers whisper about. Avoid anything that appeared on major bestseller lists or is commonly known.",
    hidden_gems:  "Recommend books that deserve far more readers than they have — overlooked gems that punch well above their recognition. These could be out-of-print classics, debut novels that got lost, or international titles that never broke through in English-speaking markets.",
    comfort_read: "Recommend books optimised for pure reading pleasure — satisfying, warm, fast-paced, and emotionally rewarding. These are books you reach for when you want to feel good, not be challenged. Prioritise readability, pacing, and satisfying endings.",
    challenge_me: "Recommend books that will push this reader beyond their comfort zone — denser prose, more complex structures, demanding ideas, or genres they haven't explored. These should feel like a genuine stretch based on their reading history.",
    new_to_me:    "Recommend books in genres, styles, or from authors that are clearly absent from this reader's history. Identify the gaps in their reading profile and fill them with excellent books they're unlikely to have encountered.",
  };

  const modeInstruction = MODE_INSTRUCTIONS[mode] || MODE_INSTRUCTIONS.popular;

  const profileLines = profile
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .map(b => `- "${b.title}" by ${b.author} (${b.genre})${b.rating ? `, rated ${b.rating}/5` : ""}`)
    .join("\n");

  const excludeLines = exclude && exclude.length > 0
    ? `\n\nDo NOT recommend any of the following books — the reader has already seen them:\n${exclude.map(t => `- "${t}"`).join("\n")}`
    : "";

  const userMessage = `Here is a reader's full library — books they have read, with ratings where available:\n${profileLines}${excludeLines}\n\nMode: ${modeInstruction}\n\nRecommend exactly 10 books. For each, provide a concise reason (1–2 sentences) explaining why it fits this reader specifically. Respond ONLY with a JSON object — no markdown, no explanation — in this exact format:\n{"recommendations":[{"title":"...","author":"...","genre":"...","publishYear":1954,"pages":320,"reason":"..."},...]}\n\nGenres must be one of: Fiction, Non-Fiction, Fantasy, Sci-Fi, Mystery, Thriller, Horror, Romance, Biography, History, Historical Fiction, Young Adult, Self-Help, Graphic Novel, Other.`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 2000,
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return res.status(500).json({ error: err });
  }

  const data = await response.json();
  const text = (data.content?.[0]?.text || "").trim();

  try {
    const parsed = JSON.parse(text);
    res.json(parsed);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try { return res.json(JSON.parse(match[0])); } catch {}
    }
    res.status(500).json({ error: "Failed to parse recommendations." });
  }
}
