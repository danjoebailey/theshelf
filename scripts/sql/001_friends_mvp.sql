-- =============================================================
-- The Shelf — Friends MVP schema
-- Run this in Supabase: Dashboard → SQL Editor → New Query → paste → Run
-- Safe to re-run (idempotent).
-- =============================================================

-- 1. Case-insensitive text extension for usernames
CREATE EXTENSION IF NOT EXISTS citext;

-- 2. Reserved usernames helper
CREATE OR REPLACE FUNCTION public.is_reserved_username(uname CITEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN lower(uname::text) IN (
    'admin', 'administrator', 'support', 'help', 'theshelf', 'shelf',
    'root', 'system', 'null', 'undefined', 'user', 'guest', 'official',
    'api', 'www', 'mail', 'reiko', 'paige', 'obi', 'reed'
  );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- 3. Profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username        CITEXT UNIQUE,
  username_set_at TIMESTAMPTZ,
  display_name    TEXT,
  avatar_url      TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT username_format CHECK (
    username IS NULL OR
    (length(username) BETWEEN 3 AND 20 AND username ~ '^[a-zA-Z0-9_]+$')
  ),
  CONSTRAINT username_not_reserved CHECK (
    username IS NULL OR NOT public.is_reserved_username(username)
  )
);

-- 4. Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. Sync display_name + avatar_url from auth.users.user_metadata
CREATE OR REPLACE FUNCTION public.sync_user_meta_to_profile()
RETURNS trigger AS $$
BEGIN
  UPDATE public.profiles SET
    display_name = NEW.raw_user_meta_data->>'full_name',
    avatar_url   = NEW.raw_user_meta_data->>'avatar_url'
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE OF raw_user_meta_data ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.sync_user_meta_to_profile();

-- 6. Backfill profiles for existing users
INSERT INTO public.profiles (id, display_name, avatar_url, created_at)
SELECT
  id,
  raw_user_meta_data->>'full_name',
  raw_user_meta_data->>'avatar_url',
  created_at
FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- 7. Enforce 30-day username cooldown via trigger (server-side guarantee)
CREATE OR REPLACE FUNCTION public.enforce_username_cooldown()
RETURNS trigger AS $$
BEGIN
  IF NEW.username IS DISTINCT FROM OLD.username THEN
    IF OLD.username_set_at IS NOT NULL
       AND OLD.username_set_at > now() - INTERVAL '30 days'
    THEN
      RAISE EXCEPTION 'Username can only be changed once every 30 days. Next allowed change: %', OLD.username_set_at + INTERVAL '30 days';
    END IF;
    NEW.username_set_at = now();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS enforce_username_cooldown_trigger ON public.profiles;
CREATE TRIGGER enforce_username_cooldown_trigger
  BEFORE UPDATE OF username ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.enforce_username_cooldown();

-- 8. Profiles RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select_authenticated" ON public.profiles;
CREATE POLICY "profiles_select_authenticated" ON public.profiles
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- =============================================================
-- 9. Friendships table
-- Convention: user_a_id is always the LESSER UUID (sorted)
-- so duplicate (a,b)/(b,a) pairs are impossible.
-- =============================================================
CREATE TABLE IF NOT EXISTS public.friendships (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_a_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_b_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status       TEXT NOT NULL CHECK (status IN ('pending', 'accepted')),
  requested_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  accepted_at  TIMESTAMPTZ,
  CONSTRAINT friendship_sorted          CHECK (user_a_id < user_b_id),
  CONSTRAINT friendship_requester_member CHECK (requested_by IN (user_a_id, user_b_id)),
  UNIQUE (user_a_id, user_b_id)
);

CREATE INDEX IF NOT EXISTS friendships_user_b_idx  ON public.friendships(user_b_id);
CREATE INDEX IF NOT EXISTS friendships_status_idx  ON public.friendships(status);

-- 10. Friendships RLS
ALTER TABLE public.friendships ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "friendships_select_member" ON public.friendships;
CREATE POLICY "friendships_select_member" ON public.friendships
  FOR SELECT TO authenticated
  USING (auth.uid() IN (user_a_id, user_b_id));

DROP POLICY IF EXISTS "friendships_insert_own_request" ON public.friendships;
CREATE POLICY "friendships_insert_own_request" ON public.friendships
  FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = requested_by
    AND auth.uid() IN (user_a_id, user_b_id)
    AND status = 'pending'
    AND accepted_at IS NULL
  );

-- Only the recipient (not the requester) can flip status to accepted.
DROP POLICY IF EXISTS "friendships_update_recipient" ON public.friendships;
CREATE POLICY "friendships_update_recipient" ON public.friendships
  FOR UPDATE TO authenticated
  USING (auth.uid() IN (user_a_id, user_b_id) AND auth.uid() <> requested_by)
  WITH CHECK (auth.uid() <> requested_by);

-- Either side can unfriend / decline.
DROP POLICY IF EXISTS "friendships_delete_member" ON public.friendships;
CREATE POLICY "friendships_delete_member" ON public.friendships
  FOR DELETE TO authenticated
  USING (auth.uid() IN (user_a_id, user_b_id));

-- =============================================================
-- 11. Extend books RLS: accepted friends can SELECT each other's books.
-- This is ADDITIVE to whatever owner-read policy already exists.
-- =============================================================
DROP POLICY IF EXISTS "books_friend_read" ON public.books;
CREATE POLICY "books_friend_read" ON public.books
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.friendships f
      WHERE f.status = 'accepted'
      AND (
        (f.user_a_id = auth.uid() AND f.user_b_id = books.user_id) OR
        (f.user_b_id = auth.uid() AND f.user_a_id = books.user_id)
      )
    )
  );

-- =============================================================
-- VERIFICATION — run these after the migration above:
--
--   SELECT count(*) AS profile_count FROM public.profiles;
--   -- Expect: same as your auth.users count.
--
--   SELECT * FROM public.profiles WHERE id = auth.uid();
--   -- Expect: your own row, with display_name + avatar_url populated.
--
--   SELECT count(*) AS friendship_count FROM public.friendships;
--   -- Expect: 0 (empty table).
-- =============================================================
