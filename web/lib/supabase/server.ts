import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

async function getCookieMethods() {
  const cookieStore = await cookies();
  return {
    getAll() {
      return cookieStore.getAll();
    },
    setAll(
      cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]
    ) {
      try {
        cookiesToSet.forEach(({ name, value, options }) =>
          cookieStore.set(name, value, options)
        );
      } catch {
        // Called from a Server Component — cookies can't be set.
      }
    },
  };
}

export async function createClient() {
  const cookieMethods = await getCookieMethods();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: cookieMethods }
  );
}

export async function createServiceClient() {
  const cookieMethods = await getCookieMethods();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: cookieMethods }
  );
}
