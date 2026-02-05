CREATE TABLE public.services (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  description TEXT,
  base_price  INTEGER NOT NULL DEFAULT 0, -- centavos MXN
  icon        TEXT NOT NULL DEFAULT 'construct',
  sort_order  INTEGER NOT NULL DEFAULT 0,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_services_category ON public.services(category_id);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active services"
  ON public.services FOR SELECT
  USING (is_active = true);
