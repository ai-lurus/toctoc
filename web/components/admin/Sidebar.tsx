"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { clsx } from "clsx";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: "📊", exact: true },
  { href: "/admin/categories", label: "Categorías", icon: "🗂️", exact: false },
  { href: "/admin/requests", label: "Solicitudes", icon: "📋", exact: false },
  { href: "/admin/payments", label: "Pagos", icon: "💳", exact: false },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="w-60 min-h-screen bg-surface border-r border-border flex flex-col">
      <div className="p-5 border-b border-border">
        <span className="text-xl font-bold text-primary">TocToc</span>
        <p className="text-xs text-text-tertiary mt-0.5">Admin Panel</p>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                active
                  ? "bg-primary-light text-primary"
                  : "text-text-secondary hover:bg-background hover:text-text-primary"
              )}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-text-secondary hover:bg-background hover:text-text-primary transition-colors w-full"
        >
          <span>🚪</span>
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
