// Batch 60 — broad coverage continuation
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === LITERARY ===
  13390: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Mermaid Madonna
  13391: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Murderess
  13392: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Boundless Garden
  13393: { prose: 10, characters: 9, plot: 8, pacing: 7, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // Z
  13394: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Harpoon Gun
  13397: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Homo Faber
  13398: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // I'm Not Stiller
  13399: { prose: 10, characters: 9, plot: 5, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Montauk
  13403: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // On a Day Like This
  13404: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Agnes
  13405: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Small World
  13406: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Night Train to Lisbon
  13407: { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Severina
  13408: { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // African Shore
  13409: { prose: 10, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Invented Part
  13410: { prose: 10, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Kensington Gardens
  13411: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Guilty
  13412: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // Sound of Things Falling
  13414: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Reputations
  13415: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Necropolis
  13416: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Armies
  13417: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Senselessness
  13418: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  13419: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  13420: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Bitter in the Mouth
  13421: { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Tropic of Orange
  13422: { prose: 10, characters: 9, plot: 7, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  13423: { prose: 10, characters: 10, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // No-No Boy
  13424: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // America Is in the Heart
  13425: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 10, ending: 7, voice: 10 }, // Swimmers
  13426: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Book of Form and Emptiness
  13427: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // We the Animals
  13428: { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Blackouts
  13429: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Make Your Home Among Strangers
  13430: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Heart of Aztlán
  13431: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Our House in the Last World
  13432: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Empress of the Splendid Season
  13433: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Agüero Sisters
  13434: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Lady Matador's Hotel
  13435: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Lost City Radio
  13436: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // At Night We Walk in Circles
  13437: { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Things We Left Unsaid
  13438: { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Space Between Us
  13439: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  13440: { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // My Bird
  13441: { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Pomegranate Lady
  13444: { prose: 10, characters: 9, plot: 7, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  13463: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  13487: { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Factory
  13488: { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Hole
  13518: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Boy's Own Story
  13519: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Beautiful Room Is Empty
  13520: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Farewell Symphony
  13532: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Waiting for an Angel
  13533: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Measuring Time
  13548: { prose: 10, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Asleep in the Sun
  13549: { prose: 10, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Plan for Escape
  13581: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // Notebook
  13582: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Proof
  13583: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Third Lie

  // === FANTASY ===
  794:   { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Wintersmith
  796:   { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 10, resonance: 9, ending: 8, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Unseen Academicals
  1602:  { prose: 10, characters: 9, plot: 8, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 10, worldBuilding: 10, magicSystem: 7 }, // Sailing to Sarantium
  2365:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 8, worldBuilding: 10, magicSystem: 8 }, // Daughter of the Empire
  2366:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 8, worldBuilding: 10, magicSystem: 8 }, // Servant of the Empire
  2367:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 8, worldBuilding: 10, magicSystem: 8 }, // Mistress of the Empire
  2437:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 9 }, // Wizard Knight (omnibus)
  2575:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 8 }, // Soldier of Sidon
  3932:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 6, voice: 6, worldBuilding: 8, magicSystem: 7 }, // Pillars of Creation
  4000:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 9 }, // Talisman
  4002:  { prose: 9, characters: 9, plot: 7, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Last Hero
  4344:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Truckers
  4571:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Demon in the Wood
  7389:  { prose: 10, characters: 9, plot: 8, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 9 }, // Preludes & Nocturnes
  7390:  { prose: 10, characters: 9, plot: 8, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10, worldBuilding: 10, magicSystem: 9 }, // Doll's House
  7391:  { prose: 10, characters: 10, plot: 9, pacing: 7, ideas: 10, resonance: 10, ending: 9, voice: 10, worldBuilding: 10, magicSystem: 9 }, // Season of Mists
  7392:  { prose: 10, characters: 10, plot: 8, pacing: 6, ideas: 10, resonance: 10, ending: 8, voice: 10, worldBuilding: 10, magicSystem: 9 }, // Brief Lives
  7393:  { prose: 10, characters: 10, plot: 9, pacing: 6, ideas: 10, resonance: 10, ending: 9, voice: 10, worldBuilding: 10, magicSystem: 9 }, // Wake
  7573:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 10, worldBuilding: 10, magicSystem: 9 }, // Wind Through the Keyhole
  8252:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Paladin's Faith
  8253:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Paladin's Prayer

  // === MYSTERY ===
  7472:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Many Rivers to Cross
  7473:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Not Dark Yet
  7475:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Jewel That Was Ours
  7482:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, puzzle: 6, stakes: 5 }, // Murder Most Fowl
  7483:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, puzzle: 6, stakes: 5 }, // Dashing Through the Snowbirds
  7484:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Potter's Field
  7572:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Stranger — Läckberg
  7737:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9, puzzle: 8, stakes: 7 }, // Dark Corners
  8229:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 6 }, // Grave's a Fine and Private Place
  8230:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 6 }, // Golden Tresses of the Dead
  8368:  { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 8 }, // Terrorists
  8369:  { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 9, stakes: 8 }, // Locked Room — Sjöwall
  8370:  { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 8, voice: 9, puzzle: 8, stakes: 8 }, // Murder at the Savoy
  8388:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Victim 2117
  8389:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Shadow Murders

  // === THRILLER ===
  1234:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 8, voice: 9, stakes: 8, twists: 8 }, // Reversal
  1497:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 10, stakes: 8, twists: 8 }, // Since We Fell
  2143:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Don't Let Go
  2145:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 8 }, // False Witness
  3070:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 8, voice: 9, stakes: 8, twists: 7 }, // Destination Unknown
  3083:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 8, voice: 9, stakes: 8, twists: 7 }, // Law of Innocence
  3084:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 8, stakes: 8, twists: 7 }, // Chamber
  3085:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 7 }, // Brethren
  3095:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Run Away
  3105:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 8, stakes: 8, twists: 7 }, // Midnight Line
  3110:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Silent Wife
  3111:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // After That Night
  3149:  { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 5, resonance: 6, ending: 6, voice: 5, stakes: 7, twists: 7 }, // Too Late
  3427:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 10, stakes: 8, twists: 8 }, // Ministry of Fear
  3428:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 10, stakes: 8, twists: 8 }, // Human Factor

  // === ROMANCE ===
  6388:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Fearless
  6389:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Invincible
  6390:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Untamed
  6391:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Defender
  6394:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // By a Thread
  6395:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Rock Bottom Girl
  6396:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Worst Best Man
  6397:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Pretend You're Mine
  6450:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Until Friday Night
  6451:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Under the Lights
  6452:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // After the Game
  6453:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // When I'm Gone

  // === NONFICTION ===
  13153: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 10, ending: 8, voice: 10, argument: 10, researchRigor: 9, access: 8 }, // Adversary
  13154: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10, argument: 9, researchRigor: 9, access: 8 }, // Limonov
  13155: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10, argument: 10, researchRigor: 9, access: 8 }, // Kingdom
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-060 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

if (apply) {
  for (const [id, scores] of Object.entries(batch)) {
    if (!sidecar[id]) { sidecar[id] = { vibes: {}, tags: [], scores }; added++; }
    else { sidecar[id].scores = { ...(sidecar[id].scores || {}), ...scores }; updated++; }
  }
  fs.writeFileSync(SIDECAR, JSON.stringify(sidecar, null, 2));
  console.log(`Wrote ${added} new, updated ${updated}.`);
} else {
  console.log("Dry run — pass --apply to write.");
}
