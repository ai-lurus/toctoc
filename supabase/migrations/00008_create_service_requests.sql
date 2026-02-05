CREATE TABLE public.service_requests (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id       UUID NOT NULL REFERENCES public.profiles(id),
  provider_id     UUID REFERENCES public.profiles(id),
  service_id      UUID NOT NULL REFERENCES public.services(id),
  status          public.request_status NOT NULL DEFAULT 'pending',
  address         TEXT NOT NULL,
  latitude        DOUBLE PRECISION,
  longitude       DOUBLE PRECISION,
  scheduled_date  DATE NOT NULL,
  scheduled_time  TIME NOT NULL,
  variables       JSONB,
  estimated_price INTEGER NOT NULL, -- centavos
  final_price     INTEGER,          -- centavos
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_service_requests_client ON public.service_requests(client_id);
CREATE INDEX idx_service_requests_provider ON public.service_requests(provider_id);
CREATE INDEX idx_service_requests_status ON public.service_requests(status);

CREATE TRIGGER service_requests_updated_at
  BEFORE UPDATE ON public.service_requests
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;

-- Clients can read their own requests
CREATE POLICY "Clients can read own requests"
  ON public.service_requests FOR SELECT
  USING (auth.uid() = client_id);

-- Providers can read requests assigned to them
CREATE POLICY "Providers can read assigned requests"
  ON public.service_requests FOR SELECT
  USING (auth.uid() = provider_id);

-- Clients can create requests
CREATE POLICY "Clients can create requests"
  ON public.service_requests FOR INSERT
  WITH CHECK (auth.uid() = client_id);

-- Enable realtime for service_requests
ALTER PUBLICATION supabase_realtime ADD TABLE public.service_requests;
