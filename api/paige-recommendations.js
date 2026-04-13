const MODE_GUIDANCE = {
  popular:      "Pick books that are widely recognised, culturally impactful, and broadly read — bestsellers, award winners, cultural touchstones. Match picks to the reader's demonstrated tastes.",
  trending:     "Pick recent books (2021 onwards) that match this reader's demonstrated tastes. Prioritize acclaimed recent releases.",
  hidden_gems:  "Pick lesser-known but genuinely excellent books that match this reader's tastes. Prioritize choices they're unlikely to have heard of.",
  comfort_read: "Pick warm, emotionally satisfying, accessible books that match this reader's tastes. Prioritize readability and rewarding stories.",
  challenge_me: "Pick demanding, complex, intellectually ambitious books that would stretch this reader beyond their comfort zone based on their current reading.",
  new_to_me:    "Pick books in genres, styles, or from authors that are clearly absent from this reader's history but would match their sensibilities.",
};

function compressProfile(profile) {
  const top = [...profile].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 20);
  const genreCount = {};
  profile.forEach(b => { if (b.genre) genreCount[b.genre] = (genreCount[b.genre] || 0) + 1; });
  const genreSummary = Object.entries(genreCount).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([g, c]) => `${g} (${c})`).join(", ");
  const authorCount = {};
  profile.forEach(b => { if (b.author) authorCount[b.author] = (authorCount[b.author] || 0) + 1; });
  const topAuthors = Object.entries(authorCount).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([a, c]) => `${a} (${c})`).join(", ");
  const topList = top.map(b => `- "${b.title}" by ${b.author} (${b.genre})${b.rating ? `, ${b.rating}/5` : ""}`).join("\n");
  return `Library size: ${profile.length} books\nGenre distribution: ${genreSummary}\nMost-read authors: ${topAuthors}\n\nTop-rated books:\n${topList}`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { profile, mode, candidates } = req.body;
  if (!profile || !Array.isArray(profile) || profile.length === 0)
    return res.status(400).json({ error: "No profile data provided." });
  if (!MODE_GUIDANCE[mode])
    return res.status(400).json({ error: "Invalid mode." });
  if (!candidates || !Array.isArray(candidates) || candidates.length === 0)
    return res.status(400).json({ error: "No candidates provided." });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  const profileSummary = compressProfile(profile);
  const candidateList = candidates.map((b, i) => `${i + 1}. "${b.title}" by ${b.author} (${b.genre}${b.publishYear ? `, ${b.publishYear}` : ""})`).join("\n");

  const prompt = `You are recommending books to a reader based on their library.\n\n${profileSummary}\n\nTask: ${MODE_GUIDANCE[mode]}\n\nFrom the candidate pool below, pick exactly 10 books this reader would most enjoy. For each pick, write a concise 1-2 sentence reason tied to their specific reading history.\n\nCandidate pool:\n${candidateList}\n\nRespond ONLY with a JSON object — no markdown, no explanation — in this exact format:\n{"recommendations":[{"title":"...","author":"...","genre":"...","publishYear":1954,"pages":320,"reason":"..."}]}\n\nUse the exact titles and authors from the candidate pool. Fill in publishYear and pages from the pool. Pick 10 books only.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1800,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    if (!response.ok) return res.status(500).json({ error: await response.text() });
    const data = await response.json();
    const text = (data.content?.[0]?.text || "").trim();
    let parsed;
    try { parsed = JSON.parse(text); }
    catch {
      const match = text.match(/\{[\s\S]*\}/);
      if (match) { try { parsed = JSON.parse(match[0]); } catch {} }
    }
    if (!parsed?.recommendations) return res.status(500).json({ error: "Failed to parse response." });

    // Enrich picks with full metadata from candidate pool
    const candidateMap = new Map(candidates.map(c => [c.title.toLowerCase(), c]));
    const recommendations = parsed.recommendations.slice(0, 10).map(r => {
      const src = candidateMap.get(r.title.toLowerCase()) || {};
      return {
        title: r.title,
        author: r.author || src.author,
        genre: r.genre || src.genre,
        publishYear: r.publishYear || src.publishYear,
        pages: r.pages || src.pages,
        reason: r.reason,
      };
    });

    // Reserve: remaining candidates not picked
    const pickedKeys = new Set(recommendations.map(r => r.title.toLowerCase()));
    const reserve = candidates.filter(c => !pickedKeys.has(c.title.toLowerCase())).slice(0, 20).map(c => ({
      title: c.title, author: c.author, genre: c.genre, publishYear: c.publishYear, pages: c.pages, reason: "",
    }));

    res.json({ recommendations, reserve });
  } catch (e) {
    res.status(500).json({ error: e.message || "Something went wrong." });
  }
}
