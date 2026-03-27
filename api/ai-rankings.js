function buildLibraryContext(library, category) {
  const rated = (library || []).filter(b => b.rating > 0).sort((a, b) => b.rating - a.rating);
  if (!rated.length) return "No reading history provided.";
  const lines = rated.slice(0, 40).map(b => {
    let line = `- "${b.title}" by ${b.author} (${b.genre || "Fiction"}, rated ${b.rating}/5)`;
    if (b.likedAspects?.length) line += `; liked: ${b.likedAspects.join(", ")}`;
    if (b.dislikedAspects?.length) line += `; disliked: ${b.dislikedAspects.join(", ")}`;
    return line;
  });
  return `My reading history:\n${lines.join("\n")}`;
}

const RESULT_FORMAT = `Return ONLY a valid JSON array — no markdown, no explanation, no code blocks. Each object must have exactly these keys: "rank" (number), "title" (string), "author" (string), "publishYear" (number), "pages" (number — approximate page count of most common edition), "reason" (string — one concise sentence on what makes it exceptional for this list). Example: [{"rank":1,"title":"Blood Meridian","author":"Cormac McCarthy","publishYear":1985,"pages":337,"reason":"Relentlessly violent prose poetry that transcends the Western genre into something mythic."}]`;

async function callClaude(apiKey, messages, maxTokens = 6000) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      temperature: 0.3,
      max_tokens: maxTokens,
      system: "You are a deeply well-read literary critic and lifelong reader across all genres. You have strong, considered opinions and rank books the way a knowledgeable friend would — honestly, based on actual quality, not popularity or cultural default.",
      messages,
    }),
  });
  if (!response.ok) throw new Error(await response.text());
  const data = await response.json();
  return (data.content?.[0]?.text || "").trim();
}

function dedup(items) {
  const seen = new Set();
  return items.filter(item => {
    const key = `${item.title.toLowerCase()}|||${item.author.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).map((item, i) => ({ ...item, rank: i + 1 }));
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { genre, category, rankingMode = "alltime", library = [] } = req.body;
  if (!genre || !category) return res.status(400).json({ error: "Missing params" });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  const genreStr = genre === "All"
    ? " — spanning all genres and literary traditions equally, not dominated by any single genre —"
    : ` ${genre}`;

  const categoryStr = category === "all"
    ? ""
    : `. These are books where ${category} is the primary reason to read them — books a ${category} stylist would consider the gold standard. Only include books where ${category} is independently exceptional, regardless of overall reputation.`;

  let prompt;

  if (rankingMode === "vacuum") {
    prompt = `Give me your top 50${genreStr} novels ranked purely on contemporary literary craft${categoryStr} Judge each book solely on the quality of the work itself by modern critical standards — completely ignore historical significance, cultural importance, influence, or when it was written. A 19th-century novel that reads awkwardly today should rank below a contemporary novel with superior craft, even if the older work is more historically important. A book that was groundbreaking for its era but whose techniques have since been surpassed should rank lower than a book that executes those techniques better. The only question is: how good is this book, right now, judged as a piece of writing? For each rank, ask: what is the single best book for this slot on pure craft? Multiple books from the same author are welcome if each genuinely deserves its slot; do not list them consecutively. Each book must appear exactly once. ${RESULT_FORMAT}`;

  } else if (rankingMode === "foryou") {
    const libraryContext = buildLibraryContext(library, category);
    prompt = `Based on my reading history below, give me a personalized top 50${genreStr} books${categoryStr} — ordered by how much you think I would genuinely enjoy and appreciate them, given my demonstrated taste.\n\n${libraryContext}\n\nInfer my preferences from my ratings, liked/disliked aspects, and genre patterns. Recommend books that align with what I've responded to most strongly. Exclude books I've already read if you can identify them. Do not just recommend the most famous books — recommend what you think I specifically would love. Each book must appear exactly once. ${RESULT_FORMAT}`;

  } else {
    // alltime
    const allAllPrefix = genre === "All" && category === "all"
      ? " The question being answered is: in your opinion, what are the 50 best books ever written, regardless of genre? Answer honestly and personally — draw from the full history of world literature including literary fiction, classics, magical realism, science fiction, fantasy, crime, and any other genre. Genre fiction may appear but must genuinely compete with the greatest works ever written across all of human history."
      : "";

    prompt = `Give me your genuine, personal top 50${genreStr} novels of all time${categoryStr}.${allAllPrefix} Account for historical context — judge each work within its era and tradition, not against contemporary standards alone. A Victorian novel should be assessed by what it achieved for its time and what it still offers today; a genre pioneer should be credited for what it made possible. For each rank, ask yourself: what is the single best book that belongs in this slot compared to everything else? Judge each book on its literary merit — not its cultural prominence alone, not its position in a series, not how well-known it is. A later book in a series should rank higher than an earlier one if it is the superior work. Multiple books from the same series or author are welcome if they each genuinely deserve their slot, but do not list them consecutively — interleave the full list holistically. Each book must appear exactly once. ${RESULT_FORMAT}`;
  }

  try {
    // First pass: generate the list
    const messages = [{ role: "user", content: prompt }];
    let text = await callClaude(apiKey, messages);
    text = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();

    let items;
    try {
      items = JSON.parse(text);
    } catch {
      return res.status(500).json({ error: "Failed to parse AI response", raw: text });
    }

    // Self-critique pass for foryou only
    if (rankingMode === "foryou") {
      const libraryContext = buildLibraryContext(library, category);
      const critiqueMessages = [
        { role: "user", content: prompt },
        { role: "assistant", content: text },
        {
          role: "user",
          content: `Now critique this list against my reading profile. Ask yourself: are these genuinely the 50 books this specific reader would love most, or did you default to well-known titles that don't reflect their actual taste?\n\n${libraryContext}\n\nIdentify any books that don't fit the reader's demonstrated preferences and replace them with better matches. Reorder if needed. Then return the final revised list. ${RESULT_FORMAT}`,
        },
      ];

      let revisedText = await callClaude(apiKey, critiqueMessages, 7000);
      revisedText = revisedText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();

      try {
        items = JSON.parse(revisedText);
      } catch {
        // If critique pass fails to parse, fall back to original
      }
    }

    res.json({ items: dedup(items) });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
