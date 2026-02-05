CREATE TABLE public.platform_config (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key        TEXT NOT NULL UNIQUE,
  value      TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER platform_config_updated_at
  BEFORE UPDATE ON public.platform_config
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.platform_config ENABLE ROW LEVEL SECURITY;

-- Anyone can read config
CREATE POLICY "Anyone can read config"
  ON public.platform_config FOR SELECT
  USING (true);

-- Insert default config
INSERT INTO public.platform_config (key, value) VALUES
  ('platform_fee_percent', '20'),
  ('request_timeout_minutes', '15'),
  ('auto_release_hours', '24'),
  ('min_provider_rating', '3.0'),
  ('support_email', 'soporte@toctoc.mx');
