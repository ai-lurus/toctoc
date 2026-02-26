import { createServiceClient } from "@/lib/supabase/server";
import StatsCard from "@/components/admin/StatsCard";

export const revalidate = 60;

export default async function AdminDashboardPage() {
  const supabase = await createServiceClient();

  const [
    { count: totalUsers },
    { count: activeRequests },
    { count: activeProviders },
    { data: paymentsData },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase
      .from("service_requests")
      .select("*", { count: "exact", head: true })
      .in("status", ["pending", "waiting_acceptance", "accepted", "in_progress"]),
    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("role", "provider")
      .eq("is_active", true),
    supabase
      .from("payments")
      .select("amount")
      .eq("status", "captured")
      .gte(
        "created_at",
        new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
      ),
  ]);

  const monthlyRevenue =
    paymentsData?.reduce((sum, p) => sum + p.amount, 0) ?? 0;

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total usuarios"
          value={totalUsers ?? 0}
          icon="👥"
          description="Clientes y proveedores"
        />
        <StatsCard
          title="Solicitudes activas"
          value={activeRequests ?? 0}
          icon="📋"
          description="Pendientes o en progreso"
        />
        <StatsCard
          title="Ingresos del mes"
          value={`$${monthlyRevenue.toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN`}
          icon="💰"
          description="Pagos capturados este mes"
        />
        <StatsCard
          title="Proveedores activos"
          value={activeProviders ?? 0}
          icon="🛠️"
          description="Con cuenta activa"
        />
      </div>

      <div className="bg-surface border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-3">
          Accesos rápidos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { href: "/admin/categories", label: "Gestionar categorías", icon: "🗂️" },
            { href: "/admin/requests", label: "Ver solicitudes", icon: "📋" },
            { href: "/admin/payments", label: "Ver pagos", icon: "💳" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 p-3 border border-border rounded-md text-sm text-text-secondary hover:bg-background hover:text-text-primary transition-colors"
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
