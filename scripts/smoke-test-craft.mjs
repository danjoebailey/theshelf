// Quick smoke test for the craft scoring layer
import { buildUserProfile, scoreBook, craftHardFilter } from "../src/lib/recommender.js";

// Fake user: mix of genres and ratings, enough per bucket to trigger craft stats
const ratedBooks = [
  { id: 1, title: "Stoner", author: "John Williams", genre: "Fiction", rating: 5 },
  { id: 2, title: "Blood Meridian", author: "Cormac McCarthy", genre: "Fiction", rating: 5 },
  { id: 6, title: "Suttree", author: "Cormac McCarthy", genre: "Fiction", rating: 5 },
  { id: 7, title: "Gilead", author: "Robinson", genre: "Fiction", rating: 5 },
  { id: 8, title: "Weak Lit", author: "Noname", genre: "Fiction", rating: 2 },
  { id: 4, title: "Dan Brown Thriller", author: "Dan Brown", genre: "Thriller", rating: 3 },
  { id: 5, title: "Gone Girl", author: "Gillian Flynn", genre: "Thriller", rating: 5 },
  { id: 9, title: "Le Carré", author: "John le Carré", genre: "Thriller", rating: 5 },
  { id: 10, title: "Cheap Thriller", author: "Hack", genre: "Thriller", rating: 2 },
];

// Fake tag data
const tagData = {
  "1": {
    vibes: { prose_craft: 10, prose_style: 4, warmth: 4, intensity: 3 },
    scores: { prose: 10, characters: 10, plot: 6, pacing: 3, ideas: 9, resonance: 10, ending: 10, voice: 9 },
    tags: ["literary", "academic"],
  },
  "2": {
    vibes: { prose_craft: 10, prose_style: 10, warmth: 1, intensity: 10 },
    scores: { prose: 10, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 10, ending: 10, voice: 10 },
    tags: ["literary", "violent"],
  },
  "3": {
    vibes: { prose_craft: 6, prose_style: 3, warmth: 7, intensity: 5 },
    scores: { prose: 6, characters: 8, plot: 9, pacing: 8, ideas: 10, resonance: 9, ending: 9, voice: 7, worldBuilding: 9, speculativeRigor: 10 },
    tags: ["sf", "hard-sf"],
  },
  "4": {
    vibes: { prose_craft: 4, prose_style: 2, warmth: 4, intensity: 6 },
    scores: { prose: 4, characters: 5, plot: 7, pacing: 9, ideas: 5, resonance: 6, ending: 6, voice: 4, stakes: 8, twists: 7 },
    tags: ["thriller"],
  },
  "5": {
    vibes: { prose_craft: 8, prose_style: 6, warmth: 2, intensity: 8 },
    scores: { prose: 8, characters: 9, plot: 9, pacing: 8, ideas: 7, resonance: 10, ending: 10, voice: 9, stakes: 9, twists: 10 },
    tags: ["thriller", "dark"],
  },
  "6": {
    vibes: { prose_craft: 10, prose_style: 10, warmth: 1, intensity: 9 },
    scores: { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 9, resonance: 10, ending: 9, voice: 10 },
    tags: ["literary"],
  },
  "7": {
    vibes: { prose_craft: 10, prose_style: 4, warmth: 7, intensity: 3 },
    scores: { prose: 10, characters: 10, plot: 6, pacing: 3, ideas: 9, resonance: 10, ending: 10, voice: 10 },
    tags: ["literary", "quiet"],
  },
  "8": {
    vibes: { prose_craft: 3, prose_style: 3, warmth: 5, intensity: 3 },
    scores: { prose: 3, characters: 4, plot: 5, pacing: 5, ideas: 3, resonance: 3, ending: 4, voice: 3 },
    tags: ["literary"],
  },
  "9": {
    vibes: { prose_craft: 9, prose_style: 7, warmth: 3, intensity: 7 },
    scores: { prose: 9, characters: 10, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 10, stakes: 9, twists: 8 },
    tags: ["thriller", "spy"],
  },
  "10": {
    vibes: { prose_craft: 3, prose_style: 3, warmth: 4, intensity: 6 },
    scores: { prose: 3, characters: 4, plot: 6, pacing: 8, ideas: 3, resonance: 4, ending: 5, voice: 3, stakes: 7, twists: 6 },
    tags: ["thriller"],
  },
};

const profile = buildUserProfile(ratedBooks, tagData);
console.log("=== USER PROFILE ===");
console.log("Vibes (global):", profile.globalVibes);
console.log("Has craftProfile?", !!profile.craftProfile);
if (profile.craftProfile) {
  console.log("\nCraft buckets:", Object.keys(profile.craftProfile.buckets));
  for (const [bucket, axes] of Object.entries(profile.craftProfile.buckets)) {
    console.log(`\n  ${bucket}:`);
    for (const [axis, stats] of Object.entries(axes)) {
      console.log(`    ${axis}: mean=${stats.mean.toFixed(1)} sd=${stats.sd.toFixed(2)} w=${stats.weight.toFixed(2)} n=${stats.n}`);
    }
  }
}

// Candidate scenarios
console.log("\n=== CANDIDATE SCORING ===");

const candidates = [
  {
    book: { id: 100, title: "Demon Copperhead", author: "Barbara Kingsolver", genre: "Fiction" },
    te: {
      vibes: { prose_craft: 9, prose_style: 5, warmth: 6, intensity: 6 },
      scores: { prose: 9, characters: 10, plot: 8, pacing: 6, ideas: 9, resonance: 10, ending: 9, voice: 9 },
      tags: ["literary"],
    },
    label: "Strong literary match (should score high)",
  },
  {
    book: { id: 101, title: "Reacher Thriller", author: "Lee Child", genre: "Thriller" },
    te: {
      vibes: { prose_craft: 5, prose_style: 3, warmth: 4, intensity: 6 },
      scores: { prose: 5, characters: 7, plot: 7, pacing: 9, ideas: 5, resonance: 6, ending: 6, voice: 5, stakes: 8, twists: 6 },
      tags: ["thriller"],
    },
    label: "Mid-craft thriller (above DanBrown floor, below GoneGirl)",
  },
  {
    book: { id: 102, title: "Bad prose literary", author: "Unknown", genre: "Fiction" },
    te: {
      vibes: { prose_craft: 3, prose_style: 2, warmth: 4, intensity: 3 },
      scores: { prose: 3, characters: 5, plot: 5, pacing: 5, ideas: 4, resonance: 4, ending: 5, voice: 3 },
      tags: ["literary"],
    },
    label: "Weak prose in literary (craft hard filter should catch this)",
  },
];

for (const { book, te, label } of candidates) {
  const filtered = craftHardFilter(book, te, profile.craftProfile);
  const score = scoreBook(book, te, profile);
  console.log(`\n${label}`);
  console.log(`  book: "${book.title}" [${book.genre}]`);
  console.log(`  hardFilter: ${filtered}, score: ${score?.toFixed(3) ?? "null"}`);
}
