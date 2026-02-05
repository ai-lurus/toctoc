CREATE TABLE public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT NOT NULL,
  full_name   TEXT NOT NULL,
  phone       TEXT,
  avatar_url  TEXT,
  role        public.user_role,
  bio         TEXT,
  experience_years INTEGER,
  avg_rating  NUMERIC(3,2) NOT NULL DEFAULT 0,
  total_reviews INTEGER NOT NULL DEFAULT 0,
  immediate_market BOOLEAN NOT NULL DEFAULT false,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can read active provider profiles (public listing)
CREATE POLICY "Anyone can read active provider profiles"
  ON public.profiles FOR SELECT
  USING (role = 'provider' AND is_active = true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Users can insert their own profile (on signup)
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);
