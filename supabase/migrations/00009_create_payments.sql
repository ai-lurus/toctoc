CREATE TABLE public.payments (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id               UUID NOT NULL REFERENCES public.service_requests(id),
  stripe_payment_intent_id TEXT NOT NULL UNIQUE,
  amount                   INTEGER NOT NULL, -- centavos
  platform_fee             INTEGER NOT NULL, -- centavos
  provider_amount          INTEGER NOT NULL, -- centavos
  currency                 TEXT NOT NULL DEFAULT 'mxn',
  status                   public.payment_status NOT NULL DEFAULT 'authorized',
  created_at               TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at               TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_payments_request ON public.payments(request_id);

CREATE TRIGGER payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Users can read payments for their own requests
CREATE POLICY "Users can read own payments"
  ON public.payments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.service_requests sr
      WHERE sr.id = request_id
      AND (sr.client_id = auth.uid() OR sr.provider_id = auth.uid())
    )
  );
