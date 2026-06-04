// Apply the GENUINE subset of the rec-library subgenre QA flags. The QA over-
// flagged on genre-gating (subgenres legitimately cross the primary genre
// label — post-apocalyptic/steampunk/new-weird/progression-fantasy/dystopian/
// alternate-history span SF/Fantasy/Horror/Fiction), so those flags are SKIPPED
// to preserve accurate descriptive tags. Only real mislabels + setting/subtype
// errors are applied here. Subgenre namespace only.
//
// Run: node scripts/apply-qa-fixes-rec.cjs

const fs = require("fs"), path = require("path");
const TAGS_PATH = path.join(__dirname, "..", "public", "book-tags.json");
const REC_PATH = path.join(__dirname, "..", "public", "rec-library.json");
const tags = JSON.parse(fs.readFileSync(TAGS_PATH, "utf8"));
const rec = JSON.parse(fs.readFileSync(REC_PATH, "utf8"));
const byId = new Map(rec.map(b => [b.id, b]));

// id -> { rm:[...], add:[...] }  (genuine errors only)
const FIX = {
  11578: { rm: ["epic-fantasy"], add: ["urban-fantasy"] },   // Anne Bishop — The Others (urban, not epic)
  11579: { rm: ["epic-fantasy"], add: ["urban-fantasy"] },
  11653: { rm: ["military-sf"], add: [] },                    // Grunts! — military FANTASY, no SF
  11667: { rm: ["cosmic-horror"], add: ["portal-fantasy"] },  // The Moon Pool — lost-world portal fantasy
  11725: { rm: ["hard-sf"], add: ["soft-sf"] },               // The Fold — soft SF thriller
  11726: { rm: ["post-apocalyptic"], add: [] },               // Dead Moon — contained outbreak, no collapse
  11963: { rm: ["quiet-horror"], add: ["supernatural-horror"] }, // John Saul — not quiet horror
  11998: { rm: ["space-opera"], add: [] },                    // Sector General — medical SF, not space opera
  11999: { rm: ["space-opera"], add: [] },
  12000: { rm: ["space-opera"], add: [] },
  12240: { rm: ["epic-fantasy"], add: ["urban-fantasy"] },    // Jessica Cluess — Victorian England
  12241: { rm: ["epic-fantasy"], add: ["urban-fantasy"] },
  12368: { rm: ["alternate-history"], add: [] },              // Court of the Air — secondary world, not alt-history
  12392: { rm: ["noir"], add: ["supernatural-horror", "police-procedural"] }, // Broken Monsters
  12395: { rm: ["gothic-horror"], add: ["historical-mystery"] }, // A Dark Dividing
  12481: { rm: ["quiet-horror"], add: ["body-horror"] },      // The Loop
  12522: { rm: ["alternate-history"], add: ["magical-realism"] }, // Unquenchable Fire
  12606: { rm: ["gothic-horror"], add: ["cozy-fantasy"] },    // House with a Clock
  12608: { rm: ["hard-sf"], add: ["soft-sf"] },               // The Dazzle of Day
  12259: { rm: ["alternate-history"], add: ["supernatural-horror"] }, // Red Moon
  12679: { rm: ["spy-thriller"], add: ["political-thriller"] }, // The Statement
  12684: { rm: ["epic-fantasy"], add: [] },                   // Forest of Hours — real historical Sweden
  13217: { rm: ["dystopian"], add: [] },                      // Concluding (Henry Green) — not dystopian
  13258: { rm: ["autofiction"], add: [] },                    // The First Stone — journalism
  13553: { rm: ["mythic-retellings"], add: [] },              // The Prose Edda — primary source
  13611: { rm: ["mythic-retellings"], add: [] },              // The Nazarene — straight historical fiction
  13940: { rm: ["first-contact"], add: ["soft-sf"] },         // The Body Snatchers — not first contact
  13993: { rm: ["spy-thriller"], add: [] },                   // Mary Jo Putney — romance-first
  13995: { rm: ["spy-thriller"], add: [] },                   // Joanna Bourne — romance-first
  13996: { rm: ["spy-thriller"], add: [] },
  13997: { rm: ["spy-thriller"], add: [] },
  12847: { rm: ["historical-romance"], add: ["paranormal-romance"] }, // Knight in Shining Armor — time-travel romance
  14328: { rm: ["historical-mystery"], add: ["historical-romance"] }, // LaFevers — not a mystery
  14329: { rm: ["historical-mystery"], add: ["historical-romance"] },
  14330: { rm: ["historical-mystery"], add: ["historical-romance"] },
  14366: { rm: ["epic-fantasy"], add: [] },                   // Enchantée — real historical Paris
  14367: { rm: ["epic-fantasy"], add: [] },
  14493: { rm: ["space-opera"], add: [] },                    // Book of Strange New Things — not space opera
  14566: { rm: ["historical-mystery"], add: ["police-procedural"] }, // Pattison Shan — contemporary
  14567: { rm: ["historical-mystery"], add: ["police-procedural"] },
  14568: { rm: ["historical-mystery"], add: ["police-procedural"] },
  14642: { rm: ["mythic-retellings"], add: [] },              // The Skystone — grounded historical
  14714: { rm: [], add: ["steampunk"] },                      // Ketty Jay — steampunk airships
  14715: { rm: [], add: ["steampunk"] },
  14716: { rm: [], add: ["steampunk"] },
  14726: { rm: ["urban-fantasy"], add: ["epic-fantasy"] },    // Maresca — secondary world
  14727: { rm: ["urban-fantasy"], add: ["epic-fantasy"] },
};

const STRUCTURAL_FANTASY = new Set(["epic-fantasy","urban-fantasy","mythic-retellings","sword-and-sorcery","grimdark","progression-fantasy","cozy-fantasy","portal-fantasy","steampunk","fairy-tale-retelling"]);

let changed = 0;
for (const [idStr, fix] of Object.entries(FIX)) {
  const id = +idStr;
  const entry = tags[id];
  if (!entry || !Array.isArray(entry.tags)) { console.log("skip (no entry):", id); continue; }
  let t = entry.tags.filter(x => !fix.rm.includes(x));
  for (const a of fix.add) if (!t.includes(a)) t.push(a);
  // romantasy stands alone
  if (t.includes("romantasy")) t = t.filter(x => !STRUCTURAL_FANTASY.has(x));
  entry.tags = t;
  changed++;
  const b = byId.get(id);
  console.log("  #" + id + " " + (b ? b.title : "?") + " -> [" + t.filter(x => ["romantasy","grimdark","cozy-fantasy","urban-fantasy","sword-and-sorcery","portal-fantasy","epic-fantasy","mythic-retellings","fairy-tale-retelling","progression-fantasy","steampunk","space-opera","cyberpunk","hard-sf","soft-sf","military-sf","post-apocalyptic","dystopian","time-travel","alternate-history","new-weird","first-contact","cozy-mystery","noir","hardboiled","police-procedural","historical-mystery","domestic-thriller","spy-thriller","techno-thriller","political-thriller","legal-thriller","scandi-noir","gothic-horror","cosmic-horror","supernatural-horror","folk-horror","body-horror","splatterpunk","quiet-horror","contemporary-romance","historical-romance","paranormal-romance","sports-romance","queer-romance","rom-com","dark-romance","magical-realism","family-saga","autofiction","bildungsroman"].includes(x)).join(",") + "]");
}
fs.writeFileSync(TAGS_PATH, JSON.stringify(tags));
console.log("\nApplied " + changed + " QA fixes. (Genre-gating false-positives skipped.)");
