// Phase A — mechanical catalog audit (merge-prep). Reversible: backups in /backups.
// 1. Dedupe the cross-library duplicates: primary wins; if primary untagged but
//    rec tagged, carry the rec book-tags entry onto the primary id before dropping.
// 2. Fix id collisions: reassign the colliding REC books to fresh ids above max;
//    primary keeps its id + tags.
// 3. Add `library: "primary" | "rec"` to every book.
// Writes book-data.json, rec-library.json, book-tags.json (minified, matching source).
const fs = require("fs");
const P = "./public/";
const primary = JSON.parse(fs.readFileSync(P + "book-data.json", "utf8"));
const rec = JSON.parse(fs.readFileSync(P + "rec-library.json", "utf8"));
const tags = JSON.parse(fs.readFileSync(P + "book-tags.json", "utf8"));

const norm = s => (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
const isTagged = id => !!(tags[String(id)] && tags[String(id)].scores);

const primaryByKey = new Map(primary.map(b => [norm(b.title) + "|" + norm(b.author), b]));
const primaryIds = new Set(primary.map(b => b.id));

// --- 1. Dedupe ---
const dupeRecIds = new Set();
let carried = 0;
for (const r of rec) {
  const p = primaryByKey.get(norm(r.title) + "|" + norm(r.author));
  if (!p) continue;
  dupeRecIds.add(r.id);
  // carry rec tags onto primary id when primary lacks scores but rec has them
  if (!isTagged(p.id) && isTagged(r.id)) {
    tags[String(p.id)] = tags[String(r.id)];
    carried++;
  }
}
let survivingRec = rec.filter(r => !dupeRecIds.has(r.id));

// --- 2. Fix id collisions among surviving rec books ---
let maxId = Math.max(...primary.map(b => b.id), ...rec.map(b => b.id));
const reassigned = [];
survivingRec = survivingRec.map(r => {
  if (primaryIds.has(r.id)) {
    const oldId = r.id;
    maxId += 1;
    reassigned.push({ title: r.title, author: r.author, oldId, newId: maxId });
    return { ...r, id: maxId };
  }
  return r;
});

// --- 3. Add library field ---
const outPrimary = primary.map(b => ({ ...b, library: "primary" }));
const outRec = survivingRec.map(b => ({ ...b, library: "rec" }));

// --- write (minified, matching source format) ---
fs.writeFileSync(P + "book-data.json", JSON.stringify(outPrimary));
fs.writeFileSync(P + "rec-library.json", JSON.stringify(outRec));
fs.writeFileSync(P + "book-tags.json", JSON.stringify(tags));

// --- report ---
const untagged = arr => arr.filter(b => !isTagged(b.id)).length;
console.log("===== PHASE A AUDIT — RESULTS =====");
console.log("primary (book-data):", primary.length, "books (unchanged count) + library:'primary'");
console.log("rec (rec-library):  ", rec.length, "->", outRec.length, "books (dropped", dupeRecIds.size, "duplicates) + library:'rec'");
console.log("tag carry-overs (rec tags copied onto untagged primary id):", carried);
console.log("id collisions reassigned:", reassigned.length);
reassigned.forEach(r => console.log("   ", r.oldId, "->", r.newId, ":", r.title, "/", r.author));
console.log("");
console.log("untagged AFTER (need Phase C tagging): primary", untagged(outPrimary), "/", outPrimary.length, "| rec", untagged(outRec), "/", outRec.length);
console.log("total unique books now:", outPrimary.length + outRec.length);
console.log("");
// sanity: any remaining id collisions across the two files?
const pIds = new Set(outPrimary.map(b => b.id));
const stillColliding = outRec.filter(b => pIds.has(b.id)).map(b => b.id);
const allIds = [...outPrimary, ...outRec].map(b => b.id);
console.log("SANITY — remaining cross-file id collisions:", stillColliding.length, stillColliding);
console.log("SANITY — total ids unique?", new Set(allIds).size === allIds.length, "(", new Set(allIds).size, "unique of", allIds.length, ")");
