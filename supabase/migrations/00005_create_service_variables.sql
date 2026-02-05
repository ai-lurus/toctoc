CREATE TABLE public.service_variables (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id     UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  name           TEXT NOT NULL,
  label          TEXT NOT NULL,
  type           public.variable_type NOT NULL DEFAULT 'number',
  options        JSONB,        -- for 'select' type: [{"label": "...", "value": "..."}]
  min_value      NUMERIC,      -- for 'number' type
  max_value      NUMERIC,      -- for 'number' type
  default_value  TEXT,
  price_modifier INTEGER NOT NULL DEFAULT 0, -- centavos per unit or flat
  sort_order     INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_service_variables_service ON public.service_variables(service_id);

ALTER TABLE public.service_variables ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read service variables"
  ON public.service_variables FOR SELECT
  USING (true);
