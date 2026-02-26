-- Update handle_new_user trigger to also persist the role from signup metadata.
-- This ensures the profile is created with the correct role even when email
-- confirmation is enabled (i.e. when no session is returned immediately after signUp).

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    (NEW.raw_user_meta_data ->> 'role')::public.user_role
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
