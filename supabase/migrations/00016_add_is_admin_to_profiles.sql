-- Add is_admin column to profiles for web admin panel access control
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS is_admin boolean NOT NULL DEFAULT false;

-- Only service role can update is_admin (no RLS row needed, but restrict via policy)
CREATE POLICY "Only service role can set is_admin"
  ON public.profiles
  FOR UPDATE
  USING (true)
  WITH CHECK (
    -- Prevent users from setting their own is_admin via client
    (is_admin = (SELECT is_admin FROM public.profiles WHERE id = auth.uid()))
    OR (auth.role() = 'service_role')
  );
