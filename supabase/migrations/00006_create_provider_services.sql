CREATE TABLE public.provider_services (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  service_id  UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  base_price  INTEGER NOT NULL, -- centavos MXN (provider's own price)
  immediate_available BOOLEAN NOT NULL DEFAULT false, -- express mode toggle (real-time availability)
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(provider_id, service_id)
);

CREATE INDEX idx_provider_services_provider ON public.provider_services(provider_id);
CREATE INDEX idx_provider_services_service ON public.provider_services(service_id);

ALTER TABLE public.provider_services ENABLE ROW LEVEL SECURITY;

-- Providers can CRUD their own services
CREATE POLICY "Providers can manage own services"
  ON public.provider_services FOR ALL
  USING (auth.uid() = provider_id)
  WITH CHECK (auth.uid() = provider_id);

-- Anyone can read active provider services
CREATE POLICY "Anyone can read active provider services"
  ON public.provider_services FOR SELECT
  USING (is_active = true);
