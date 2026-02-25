-- Move immediate_market from profiles to provider_services as immediate_available.
-- This allows express mode to be toggled per service per provider,
-- instead of a global toggle on the profile.

ALTER TABLE public.profiles DROP COLUMN IF EXISTS immediate_market;

ALTER TABLE public.provider_services
  ADD COLUMN IF NOT EXISTS immediate_available BOOLEAN NOT NULL DEFAULT false;
