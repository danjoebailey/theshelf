const MODE_GENERATION = {
  popular:      "Recommend books that are widely recognised and broadly read — major bestsellers, award winners, cultural touchstones, or books that have been adapted for film or TV. Judge purely by notoriety and reach. Tone does not matter — a bleak or demanding book belongs here if it is genuinely well-known.",
  trending:     "Recommend books that are currently having a moment — recent releases (2021–2025) that are being actively discussed in book communities, on social media, in book clubs, and on podcasts. These should be books people are talking about right now, not just historically popular titles.",
  hidden_gems:  "Recommend books that deserve far more readers than they have — overlooked gems that punch well above their recognition. These could be out-of-print classics, debut novels that got lost, or international titles that never broke through in English-speaking markets.",
  comfort_read: "Recommend books optimised for pure reading pleasure — satisfying, warm, fast-paced, and emotionally rewarding. These are books you reach for when you want to feel good, not be challenged. Prioritise readability, pacing, and satisfying endings.",
  challenge_me: "Recommend books that will push this reader beyond their comfort zone — denser prose, more complex structures, demanding ideas, or genres they haven't explored. These should feel like a genuine stretch based on their reading history.",
  new_to_me:    "Recommend books in genres, styles, or from authors that are clearly absent from this reader's history. Identify the gaps in their reading profile and fill them with excellent books they're unlikely to have encountered.",
};

const MODE_VALIDATION = {
  popular:      "Is this book widely recognised and broadly read? Has it appeared on major bestseller lists, won major awards, been adapted for film or TV, or achieved genuine cultural notoriety? Notoriety and reach are what matter — not tone, accessibility, or whether the book is feel-good. A bleak or demanding book can still be popular.",
  trending:     "Is this book currently generating active buzz in reading communities? Was it published in 2021 or later, or is it an older book experiencing a notable resurgence right now? Is it being widely discussed on social media, in book clubs, or on book podcasts? Books that are historically popular but no longer generating active conversation do NOT qualify.",
  hidden_gems:  "Does this book deserve far more readers than it actually has? Is it meaningfully overlooked or underappreciated relative to its quality — not just modestly less famous, but genuinely under-recognised?",
  comfort_read: "Is this book easy, warm, fast-paced, and emotionally satisfying? Would a reader reach for it when they want to feel good rather than be challenged? Does it have accessible prose and a rewarding ending? Books that are dense, demanding, intellectually heavy, or emotionally gruelling do NOT qualify.",
  challenge_me: "Is this book genuinely demanding? Does it feature dense or complex prose, a non-linear or experimental structure, difficult philosophical or intellectual ideas, or does it require significant effort from the reader?",
  new_to_me:    "Based on the reader's library profile provided, is this book in a genre, style, time period, or from an author that is clearly absent or underrepresented in their reading history?",
};

function parseJson(text) {
  try { return JSON.parse(text); } catch {}
  const match = text.match(/\{[\s\S]*\}/);
  if (match) { try { return JSON.parse(match[0]); } catch {} }
  return null;
}

async function claudeCall(apiKey, prompt, maxTokens = 2000) {
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

async function generate(apiKey, profileLines, mode, exclude, count) {
  const excludeLines = exclude.length > 0
    ? `\n\nDo NOT recommend any of the following — they have already been seen:\n${exclude.map(t => `- "${t}"`).join("\n")}`
    : "";

  const prompt = `Here is a reader's library — books they have read, with ratings where available:\n${profileLines}${excludeLines}\n\nMode: ${MODE_GENERATION[mode]}\n\nRecommend exactly ${count} books. For each, provide a concise reason (1–2 sentences) explaining why it fits this reader specifically. Respond ONLY with a JSON object — no markdown, no explanation — in this exact format:\n{"recommendations":[{"title":"...","author":"...","genre":"...","publishYear":1954,"pages":320,"reason":"..."},...]}\n\nGenres must be one of: Fiction, Non-Fiction, Fantasy, Sci-Fi, Mystery, Thriller, Horror, Romance, Biography, History, Historical Fiction, Young Adult, Self-Help, Graphic Novel, Other.`;

  const text = await claudeCall(apiKey, prompt, 2500);
  const parsed = parseJson(text);
  return parsed?.recommendations || [];
}

async function validate(apiKey, books, mode, profileLines) {
  if (!books.length) return [];

  const bookList = books.map((b, i) => `${i + 1}. "${b.title}" by ${b.author} (${b.genre}, ${b.publishYear || ""})`).join("\n");
  const criterion = MODE_VALIDATION[mode];

  const prompt = `You are validating a list of book recommendations against a specific criterion.\n\nReader's library:\n${profileLines}\n\nCriterion: ${criterion}\n\nFor each book below, answer strictly yes or no — does it meet the criterion above?\n\n${bookList}\n\nRespond ONLY with a JSON object in this exact format (no markdown, no explanation):\n{"results":[{"title":"...","passes":true},...]}\n\nBe strict. If a book only partially meets the criterion, mark it false.`;

  const text = await claudeCall(apiKey, prompt, 1000);
  const parsed = parseJson(text);
  if (!parsed?.results) return books; // if validation fails to parse, pass all through

  const passingTitles = new Set(
    parsed.results.filter(r => r.passes).map(r => r.title.toLowerCase())
  );
  return books.filter(b => passingTitles.has(b.title.toLowerCase()));
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { profile, mode, exclude = [] } = req.body;
  if (!profile || !Array.isArray(profile) || profile.length === 0)
    return res.status(400).json({ error: "No profile data provided." });
  if (!MODE_GENERATION[mode])
    return res.status(400).json({ error: "Invalid mode." });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  const profileLines = profile
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .map(b => `- "${b.title}" by ${b.author} (${b.genre})${b.rating ? `, rated ${b.rating}/5` : ""}`)
    .join("\n");

  const seen = new Set(exclude.map(t => t.toLowerCase()));

  try {
    // Round 1: generate 15, validate all
    const batch1 = await generate(apiKey, profileLines, mode, exclude, 15);
    const fresh1 = batch1.filter(b => !seen.has(b.title.toLowerCase()));
    fresh1.forEach(b => seen.add(b.title.toLowerCase()));
    let validated = await validate(apiKey, fresh1, mode, profileLines);

    // Round 2: if <10, top up with 5 more, validate new ones only
    if (validated.length < 10) {
      const batch2 = await generate(apiKey, profileLines, mode, [...seen], 5);
      const fresh2 = batch2.filter(b => !seen.has(b.title.toLowerCase()));
      fresh2.forEach(b => seen.add(b.title.toLowerCase()));
      const validated2 = await validate(apiKey, fresh2, mode, profileLines);
      validated = [...validated, ...validated2];
    }

    // Round 3: if still <10, one final top-up of 5
    if (validated.length < 10) {
      const batch3 = await generate(apiKey, profileLines, mode, [...seen], 5);
      const fresh3 = batch3.filter(b => !seen.has(b.title.toLowerCase()));
      fresh3.forEach(b => seen.add(b.title.toLowerCase()));
      const validated3 = await validate(apiKey, fresh3, mode, profileLines);
      validated = [...validated, ...validated3];
    }

    // Fallback: if still <10 after all rounds, fill gap without validation
    if (validated.length < 10) {
      const needed = 10 - validated.length;
      const fallback = await generate(apiKey, profileLines, mode, [...seen], needed);
      const freshFallback = fallback.filter(b => !seen.has(b.title.toLowerCase()));
      validated = [...validated, ...freshFallback].slice(0, 10);
    }

    // Serve first 10, cache remainder as reserve
    const recommendations = validated.slice(0, 10);
    const reserve = validated.slice(10);

    res.json({ recommendations, reserve });
  } catch (e) {
    res.status(500).json({ error: e.message || "Something went wrong." });
  }
}
