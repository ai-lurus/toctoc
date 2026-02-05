CREATE TABLE public.provider_availability (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0=Sunday
  start_time  TIME NOT NULL,
  end_time    TIME NOT NULL,
  CHECK (start_time < end_time)
);

CREATE INDEX idx_provider_availability_provider ON public.provider_availability(provider_id);

ALTER TABLE public.provider_availability ENABLE ROW LEVEL SECURITY;

-- Providers can manage their own availability
CREATE POLICY "Providers can manage own availability"
  ON public.provider_availability FOR ALL
  USING (auth.uid() = provider_id)
  WITH CHECK (auth.uid() = provider_id);

-- Anyone can read provider availability
CREATE POLICY "Anyone can read provider availability"
  ON public.provider_availability FOR SELECT
  USING (true);
