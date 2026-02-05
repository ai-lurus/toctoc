CREATE TABLE public.categories (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  description TEXT,
  icon        TEXT NOT NULL,
  color       TEXT NOT NULL DEFAULT '#4F46E5',
  sort_order  INTEGER NOT NULL DEFAULT 0,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Public read for active categories
CREATE POLICY "Anyone can read active categories"
  ON public.categories FOR SELECT
  USING (is_active = true);

-- Only service_role (admin) can insert/update/delete
-- Admin panel will use service_role key
