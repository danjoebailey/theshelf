// One-shot: clear cached `scores` column on users.books rows so the new
// schema endpoint can repopulate. Old data was the 7-axis grid (with
// `dialogue`); new data is universal 7 + per-genre pack (with `ideas`,
// `resonance`, etc.). Schemas don't align — clean wipe is simpler than
// a partial-merge migration.
//
// Usage:
//   ANTHROPIC dry-run (default — counts only, no writes):
//     SUPABASE_URL=... SUPABASE_SERVICE_KEY=... node scripts/wipe-cached-scores.mjs --user <userId>
//
//   Apply:
//     SUPABASE_URL=... SUPABASE_SERVICE_KEY=... node scripts/wipe-cached-scores.mjs --user <userId> --apply
//
//   By email instead of user_id:
//     ... --email danjoebailey@gmail.com [--apply]

import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_KEY;
if (!url || !key) {
  console.error("Set SUPABASE_URL (or VITE_SUPABASE_URL) and SUPABASE_SERVICE_KEY");
  process.exit(1);
}

const args = process.argv.slice(2);
function flag(name) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : null;
}
const apply = args.includes("--apply");
const userId = flag("user");
const email = flag("email");

if (!userId && !email) {
  console.error("Provide --user <id> or --email <addr>");
  process.exit(1);
}

const supabase = createClient(url, key);

let resolvedUserId = userId;
if (!resolvedUserId && email) {
  const { data, error } = await supabase.auth.admin.listUsers();
  if (error) { console.error("listUsers failed:", error.message); process.exit(1); }
  const user = data.users.find(u => u.email === email);
  if (!user) { console.error(`No user with email ${email}`); process.exit(1); }
  resolvedUserId = user.id;
  console.log(`Resolved ${email} → ${resolvedUserId}`);
}

const { data: books, error: readErr } = await supabase
  .from("books")
  .select("id, title, scores")
  .eq("user_id", resolvedUserId)
  .not("scores", "is", null);

if (readErr) { console.error("read failed:", readErr.message); process.exit(1); }

console.log(`Found ${books.length} books with cached scores for user ${resolvedUserId}`);
if (books.length > 0) {
  console.log("Sample:");
  books.slice(0, 5).forEach(b => console.log(`  - ${b.title}: ${Object.keys(b.scores || {}).join(", ")}`));
}

if (!apply) {
  console.log("\nDry-run only. Re-run with --apply to wipe.");
  process.exit(0);
}

const { error: updateErr, count } = await supabase
  .from("books")
  .update({ scores: null }, { count: "exact" })
  .eq("user_id", resolvedUserId)
  .not("scores", "is", null);

if (updateErr) { console.error("update failed:", updateErr.message); process.exit(1); }

console.log(`\nWiped scores on ${count ?? "?"} books. New endpoint will repopulate on next view.`);
