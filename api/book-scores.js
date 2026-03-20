const WORLD_BUILDING_GENRES = new Set(["Fantasy", "Sci-Fi", "Fiction", "Horror", "Young Adult", "Historical Fiction"]);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { title, author, genre } = req.body;
  if (!title || !author) return res.status(400).json({ error: "Missing title or author" });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  const includeWorldBuilding = WORLD_BUILDING_GENRES.has(genre);
  const exampleJson = includeWorldBuilding
    ? `{"prose":7,"plot":8,"characters":9,"pacing":6,"worldBuilding":8,"dialogue":7,"ending":8}`
    : `{"prose":7,"plot":8,"characters":9,"pacing":6,"dialogue":7,"ending":8}`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 300,
      messages: [{
        role: "user",
        content: `Score "${title}" by ${author} on a scale of 1–10 for each category below. Scores are relative and contextual — use the following anchors as your frame of reference:

Prose: 10 = Lolita (Nabokov), Ulysses (Joyce); 9 = Beloved (Morrison), Anna Karenina (Tolstoy); 7 = The Girl with the Dragon Tattoo; 4 = Twilight; 1 = barely literate self-published fiction
Plot: 10 = Crime and Punishment, The Brothers Karamazov; 9 = Gone Girl, The Count of Monte Cristo; 7 = The Da Vinci Code; 4 = slow literary fiction with minimal plot; 1 = no discernible story
Characters: 10 = Middlemarch (Eliot), The Brothers Karamazov; 9 = Jane Eyre, To Kill a Mockingbird; 7 = competent genre fiction; 4 = flat stereotypes; 1 = cardboard cutouts
Pacing: 10 = The Road (McCarthy), No Country for Old Men; 9 = Gone Girl, Rebecca; 7 = average thriller; 4 = In Search of Lost Time; 1 = unreadably slow or erratic
Dialogue: 10 = Hemingway, Elmore Leonard; 9 = Jane Austen, Cormac McCarthy; 7 = competent mainstream fiction; 4 = stilted or expository; 1 = no one speaks like a human
Ending: 10 = Anna Karenina, Crime and Punishment; 9 = Never Let Me Go, Atonement; 7 = satisfying but unremarkable; 4 = rushed or unearned; 1 = no resolution
World-building: 10 = Dune (Herbert), The Lord of the Rings; 9 = 1984, Ursula K. Le Guin's Hainish Cycle; 7 = standard genre world-building; 4 = thin backdrop; 1 = no sense of place

Respond ONLY with a JSON object, no markdown, no explanation:\n${exampleJson}`,
      }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return res.status(500).json({ error: err });
  }

  const data = await response.json();
  const text = (data.content?.[0]?.text || "").trim();

  try {
    res.json(JSON.parse(text));
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try { return res.json(JSON.parse(match[0])); } catch {}
    }
    res.status(500).json({ error: "Failed to parse scores." });
  }
}
