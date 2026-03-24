import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { author } = req.body || {};
  if (!author) return res.status(400).json({ error: "Missing author" });

  // Check Supabase cache first
  const { data: cached } = await supabase
    .from("author_bios")
    .select("bio")
    .eq("author", author)
    .single();

  if (cached?.bio) {
    return res.json({ bio: cached.bio, cached: true });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      temperature: 0.6,
      max_tokens: 700,
      system: "You are a literary critic and essayist. Write author profiles that are incisive, atmospheric, and treat the reader as a serious book lover. No filler phrases, no generic praise. Write in plain prose — no headers, no bullet points, no markdown.",
      messages: [{
        role: "user",
        content: `Write a 2–3 paragraph author profile of ${author}. Focus on what makes their voice and worldview distinct, the major themes and preoccupations running through their work, and what a reader should know before diving in. Mention key works naturally, but don't just list them. The tone should be that of a knowledgeable friend recommending an author they love.`,
      }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return res.status(500).json({ error: err });
  }

  const data = await response.json();
  const bio = (data.content?.[0]?.text || "").trim();

  if (!bio) return res.status(500).json({ error: "Empty response from AI" });

  // Cache in Supabase
  await supabase.from("author_bios").upsert({
    author,
    bio,
    generated_at: new Date().toISOString(),
  });

  res.json({ bio, cached: false });
}
