export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { book, profile } = req.body;
  if (!book) return res.status(400).json({ error: "Missing book data" });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  if ((profile || []).length < 3) {
    return res.json({ verdict: "Your shelves are still pretty bare — add some books you've loved (and a few you've abandoned) and I'll have a lot more to work with." });
  }

  const profileLines = [...profile]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .map(b => `- "${b.title}" by ${b.author} (${b.genre})${b.rating ? `, rated ${b.rating}/5` : b.shelf === "DNF" ? ", did not finish" : ""}`)
    .join("\n");

  const prompt = `You are Obi, a sharp and candid literary companion. Based on this reader's library, give a short honest verdict on whether they would enjoy the book in question.

Reader's library:
${profileLines}

Book in question: "${book.title}" by ${book.author} (${book.genre})${book.description ? `\n\nAbout the book: ${book.description}` : ""}

Write 2–3 sentences. Be direct and specific — reference what you actually know about this reader's taste. Don't hedge. No intro, no sign-off, no markdown.`;

  try {
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
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(500).json({ error: err });
    }

    const data = await response.json();
    const verdict = (data.content?.[0]?.text || "").trim();
    res.json({ verdict });
  } catch (e) {
    res.status(500).json({ error: e.message || "Something went wrong." });
  }
}
