-- =============================================================
-- The Shelf — Top 5 Books + Top 5 Authors (manual curation)
-- Run this in Supabase: Dashboard → SQL Editor → New Query → paste → Run
-- Safe to re-run (idempotent).
-- =============================================================

-- Two JSONB arrays on the existing profiles table:
--   top_book_ids → ordered list of book_id strings (matches books.book_id, per-user)
--   top_authors  → ordered list of author display strings (matches books.author)
-- Both are JSONB arrays so ordering is preserved (rank 1 = first element).
-- Both default to empty array, so existing rows don't need backfill.

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS top_book_ids JSONB NOT NULL DEFAULT '[]'::jsonb;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS top_authors  JSONB NOT NULL DEFAULT '[]'::jsonb;

-- Length caps (defense-in-depth — the UI also enforces 0-5).
-- CHECK constraints reject any update that would push past 5 entries.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'top_book_ids_max_5'
  ) THEN
    ALTER TABLE public.profiles
      ADD CONSTRAINT top_book_ids_max_5
      CHECK (jsonb_array_length(top_book_ids) <= 5);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'top_authors_max_5'
  ) THEN
    ALTER TABLE public.profiles
      ADD CONSTRAINT top_authors_max_5
      CHECK (jsonb_array_length(top_authors) <= 5);
  END IF;
END $$;

-- =============================================================
-- VERIFICATION — run after the migration above:
--
--   SELECT id, top_book_ids, top_authors FROM public.profiles WHERE id = auth.uid();
--   -- Expect: your row, both fields as [].
-- =============================================================
