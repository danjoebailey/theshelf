// Batch 65 — broad coverage continuation
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === FANTASY ===
  11983: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Jovah's Angel
  11988: { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 10, magicSystem: 9 }, // Night of Knives (alt ID)
  11989: { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 10, magicSystem: 9 }, // Return of Crimson Guard (alt)
  11990: { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 10, magicSystem: 9 }, // Stonewielder (alt)
  11995: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Summoner
  11996: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Blood King
  11997: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Dark Haven
  12019: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Waking the Moon
  12027: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Isle of Glass
  12028: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Hall of the Mountain King
  12029: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Fall of Princes
  12033: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Door into Fire
  12078: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Silver Bough
  12095: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Misenchanted Sword
  12096: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // With a Single Spell
  12097: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Unwilling Warlord
  12100: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Last Hot Time
  12101: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 10, magicSystem: 8 }, // Imaro
  12102: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 10, magicSystem: 8 }, // Quest for Cush
  12103: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 10, magicSystem: 8 }, // Trail of Bohu
  12119: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 7 }, // Last Coin
  12120: { prose: 10, characters: 9, plot: 8, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 8 }, // Nausicaä v1
  12134: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Between Two Thorns
  12159: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 10, magicSystem: 9 }, // Madness of Angels
  12160: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 10, magicSystem: 9 }, // Midnight Mayor
  12161: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 10, magicSystem: 9 }, // Neon Court
  12181: { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Homesick
  12183: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Mechanique
  12185: { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 9 }, // Invisibles v1
  12186: { prose: 10, characters: 9, plot: 8, pacing: 7, ideas: 10, resonance: 9, ending: 8, voice: 10, worldBuilding: 10, magicSystem: 9 }, // All-Star Superman v1
  12187: { prose: 10, characters: 9, plot: 8, pacing: 7, ideas: 10, resonance: 9, ending: 8, voice: 10, worldBuilding: 10, magicSystem: 8 }, // We3
  12188: { prose: 10, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 9 }, // Flex Mentallo

  // === MYSTERY ===
  9669:  { prose: 8, characters: 9, plot: 9, pacing: 7, ideas: 8, resonance: 8, ending: 9, voice: 9, puzzle: 9, stakes: 7 }, // Marble Hall Murders
  9689:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Mercy Chair
  9696:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Now We Are Dead
  9697:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Blood Road
  9698:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // All That's Dead
  9699:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Coffinmaker's Garden
  9700:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // Carmen Zita
  9701:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // Hellfire
  9702:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Listening Woman
  9703:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Talking God
  9704:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // First Eagle
  9705:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Wailing Wind
  9706:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Skeleton Man
  9955:  { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, puzzle: 7, stakes: 7 }, // Death Is a Lonely Business
  9956:  { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, puzzle: 7, stakes: 7 }, // Graveyard for Lunatics
  9957:  { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 10, puzzle: 7, stakes: 7 }, // Let's All Kill Constance
  9975:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 9, puzzle: 8, stakes: 7 }, // Investigation — Lem
  9987:  { prose: 10, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 10, puzzle: 8, stakes: 8 }, // Trouble Is My Business
  9988:  { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10, puzzle: 8, stakes: 8 }, // Simple Art of Murder
  11436: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Mystery Mile

  // === THRILLER ===
  6812:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 8 }, // Aquitaine Progression
  7440:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 7 }, // Storm Watch
  7576:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, stakes: 8, twists: 7 }, // Waiting
  7577:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 8, voice: 9, stakes: 8, twists: 7 }, // Fifth Witness
  7578:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 8, voice: 9, stakes: 8, twists: 7 }, // Gods of Guilt
  7631:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 8, stakes: 9, twists: 7 }, // Never
  7730:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Only Survivors
  8277:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // When You See Me
  8278:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Before She Disappeared
  8316:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Fix — Baldacci
  8424:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Sunday Silence
  8425:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Day of the Dead
  8440:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Mercy — Baldacci
  8442:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // I Know a Secret
  8463:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 7 }, // Double Bind
  8471:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Find You First
  8474:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Cold Cold Heart
  8483:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Thick as Thieves
  8506:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Unseen
  8517:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Hour Game
  8832:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Saving Faith
  8848:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Silencing Eve
  8856:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 6, voice: 7, stakes: 7, twists: 7 }, // Sole Survivor
  8869:  { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, stakes: 7, twists: 8 }, // Blunderer
  8902:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Secrets to the Grave

  // === ROMANCE (Pullman Sally Lockhart YA adult-leaning) ===
  10198: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, chemistry: 7, tension: 7, heaPayoff: 7, periodAuthenticity: 9, researchIntegration: 8 },
  10199: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, chemistry: 7, tension: 7, heaPayoff: 7, periodAuthenticity: 9, researchIntegration: 8 },
  10200: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, chemistry: 6, tension: 7, heaPayoff: 6, periodAuthenticity: 9, researchIntegration: 8 },
  10201: { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, chemistry: 6, tension: 7, heaPayoff: 6, periodAuthenticity: 9, researchIntegration: 8 },
  10202: { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, chemistry: 5, tension: 7, heaPayoff: 6 }, // Clockwork
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-065 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

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
