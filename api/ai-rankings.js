function buildLibraryContext(library, genre) {
  const rated = (library || []).filter(b => b.rating > 0).sort((a, b) => b.rating - a.rating);
  if (!rated.length) return "No reading history provided.";

  // All rated books, full library — no cap
  const lines = rated.map(b => {
    let line = `- "${b.title}" by ${b.author} (${b.genre || "Fiction"}, rated ${b.rating}/5)`;
    if (b.likedAspects?.length) line += `; liked: ${b.likedAspects.join(", ")}`;
    if (b.dislikedAspects?.length) line += `; disliked: ${b.dislikedAspects.join(", ")}`;
    return line;
  });

  // Separate signal commentary for genre-specific searches
  const genreBooks = genre && genre !== "All"
    ? rated.filter(b => b.genre === genre)
    : [];
  const genreNote = genreBooks.length > 0
    ? `\n\nOf these, the reader has read ${genreBooks.length} ${genre} book(s). Their ${genre} ratings specifically: ${genreBooks.map(b => `"${b.title}" (${b.rating}/5)`).join(", ")}. Weight these heavily when inferring taste within this genre.`
    : "";

  return `Reader's full library (sorted by rating, highest first):\n${lines.join("\n")}${genreNote}`;
}

function buildReadTitles(library) {
  return (library || [])
    .filter(b => b.title)
    .map(b => `"${b.title}" by ${b.author}`)
    .join(", ");
}

const RESULT_FORMAT = `Return ONLY a valid JSON array — no markdown, no explanation, no code blocks. Each object must have exactly these keys: "rank" (number), "title" (string), "author" (string), "publishYear" (number), "pages" (number — approximate page count of most common edition), "reason" (string — one concise sentence on what makes it exceptional for this list). Example: [{"rank":1,"title":"Blood Meridian","author":"Cormac McCarthy","publishYear":1985,"pages":337,"reason":"Relentlessly violent prose poetry that transcends the Western genre into something mythic."}]`;

async function callClaude(apiKey, messages, maxTokens = 6000, temperature = 0.3) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      temperature,
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
  });
}

// Reorder to prevent consecutive same-author entries.
// Pulls the next non-same-author book forward; only allows consecutive
// if no other option exists (e.g. author dominates the entire list).
function interleave(items) {
  const result = [];
  const remaining = [...items];
  while (remaining.length) {
    const lastAuthor = result.length ? result[result.length - 1].author.toLowerCase() : null;
    const nextIdx = remaining.findIndex(b => b.author.toLowerCase() !== lastAuthor);
    const pick = nextIdx === -1 ? 0 : nextIdx;
    result.push(remaining.splice(pick, 1)[0]);
  }
  return result.map((item, i) => ({ ...item, rank: i + 1 }));
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
    const libraryContext = buildLibraryContext(library, genre);
    const readTitles = buildReadTitles(library);

    prompt = `You are building a personalised ranked list for a specific reader. Here is how to do it:

FIRST — study the reader's library carefully. Identify:
- The specific subgenres, themes, tones, and styles that appear in their 4–5 star books (e.g. grimdark, progression fantasy, political intrigue, found family, slow-burn character work, hard magic systems, morally complex protagonists — be specific)
- What their 1–3 star books and disliked aspects tell you about what this reader does NOT respond to
${genre !== "All" ? `- This is a ${genre} search. Their ${genre} ratings are the primary signal — weight them above everything else.` : ""}

THEN — produce a ranked list of 50${genreStr} books${categoryStr} this reader has NOT yet read, ordered by how highly you believe they would personally rank each book if they had read it.

CRITICAL RULES:
- This list must reflect the reader's specific subgenre and style preferences, not general critical consensus
- Do NOT default to the standard "best of genre" canonical picks (Tolkien, Jordan, GRRM, Sanderson, etc.) unless the reader's actual taste profile genuinely demands them — if their ratings don't strongly support a canonical pick, leave it out
- The value of this list is in the specific, tailored discoveries — books like mid-tier gems, acclaimed-but-not-mainstream works, and series that match their exact taste pattern. These are books the reader would not easily find on a generic top-50 list
- A lesser-known book that perfectly matches the reader's demonstrated taste belongs higher than a famous book that only loosely fits
- Do not include any book the reader has already read. Books already read: ${readTitles || "none listed"}

${libraryContext}

Each book must appear exactly once. ${RESULT_FORMAT}`;

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
      const libraryContext = buildLibraryContext(library, genre);
      const critiqueMessages = [
        { role: "user", content: prompt },
        { role: "assistant", content: text },
        {
          role: "user",
          content: `Now rigorously critique this list against the reader's profile.

Ask yourself three questions:
1. SHOULDN'T BE HERE — Are any books on this list a poor fit for this reader? Check each entry against their low-rated books and disliked aspects. A book that resembles something they rated 3 stars or below, or shares qualities they explicitly disliked, should be cut.
2. TOO OBVIOUS — Are any entries just canonical "best of genre" picks that don't specifically reflect this reader's taste? Famous books that appear on every generic top-50 list should only stay if the reader's ratings strongly support them. Replace lazy canonical picks with specific, well-matched alternatives — including mid-tier, less-celebrated, or niche works that fit the reader's actual subgenre and style preferences.
3. MISSING — Are there books not on this list that would be a stronger match than some current entries? Look for specific subgenre fits, series that align with what the reader has loved, and less obvious picks that match their taste pattern precisely.

${libraryContext}

Make the necessary replacements and reorder. Return the final revised list. ${RESULT_FORMAT}`,
        },
      ];

      let revisedText = await callClaude(apiKey, critiqueMessages, 7000, 0);
      revisedText = revisedText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();

      try {
        items = JSON.parse(revisedText);
      } catch {
        // If critique pass fails to parse, fall back to original
      }
    }

    let finalItems = dedup(items);
    if (rankingMode === "foryou") {
      const authorCount = {};
      finalItems = finalItems.filter(item => {
        const key = item.author.toLowerCase();
        authorCount[key] = (authorCount[key] || 0) + 1;
        return authorCount[key] <= 3;
      });
    }
    res.json({ items: interleave(finalItems) });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
