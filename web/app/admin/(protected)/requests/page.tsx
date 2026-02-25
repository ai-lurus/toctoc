"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import DataTable from "@/components/admin/DataTable";
import type { ColumnDef } from "@tanstack/react-table";

interface ServiceRequest {
  id: string;
  status: string;
  address: string;
  scheduled_date: string;
  scheduled_time: string;
  estimated_price: number;
  created_at: string;
  client_name: string;
  service_name: string;
}

const STATUS_LABELS: Record<string, { label: string; class: string }> = {
  pending: { label: "Pendiente", class: "bg-yellow-50 text-warning" },
  waiting_acceptance: { label: "Esperando", class: "bg-blue-50 text-primary" },
  accepted: { label: "Aceptada", class: "bg-blue-50 text-primary" },
  in_progress: { label: "En progreso", class: "bg-purple-50 text-purple-600" },
  completed: { label: "Completada", class: "bg-green-50 text-success" },
  cancelled: { label: "Cancelada", class: "bg-red-50 text-error" },
};

const columns: ColumnDef<ServiceRequest, unknown>[] = [
  {
    accessorKey: "service_name",
    header: "Servicio",
  },
  {
    accessorKey: "client_name",
    header: "Cliente",
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ getValue }) => {
      const status = getValue() as string;
      const meta = STATUS_LABELS[status] ?? { label: status, class: "" };
      return (
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${meta.class}`}>
          {meta.label}
        </span>
      );
    },
  },
  {
    accessorKey: "scheduled_date",
    header: "Fecha",
    cell: ({ getValue }) => {
      const date = getValue() as string;
      return new Date(date).toLocaleDateString("es-MX");
    },
  },
  {
    accessorKey: "estimated_price",
    header: "Precio est.",
    cell: ({ getValue }) => {
      const price = getValue() as number;
      return `$${price.toLocaleString("es-MX")} MXN`;
    },
  },
  {
    accessorKey: "created_at",
    header: "Creada",
    cell: ({ getValue }) => {
      const date = getValue() as string;
      return new Date(date).toLocaleDateString("es-MX");
    },
  },
];

const STATUS_OPTIONS = [
  { value: "", label: "Todos los estados" },
  { value: "pending", label: "Pendiente" },
  { value: "waiting_acceptance", label: "Esperando aceptación" },
  { value: "accepted", label: "Aceptada" },
  { value: "in_progress", label: "En progreso" },
  { value: "completed", label: "Completada" },
  { value: "cancelled", label: "Cancelada" },
];

export default function RequestsPage() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");

  const supabase = createClient();

  const loadRequests = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from("service_requests")
      .select(
        `id, status, address, scheduled_date, scheduled_time, estimated_price, created_at,
         client:profiles!service_requests_client_id_fkey(full_name),
         service:services(name)`
      )
      .order("created_at", { ascending: false });

    if (statusFilter) {
      query = query.eq("status", statusFilter);
    }
    if (dateFrom) {
      query = query.gte("scheduled_date", dateFrom);
    }

    const { data } = await query;
    const mapped = (data ?? []).map((r) => ({
      id: r.id,
      status: r.status,
      address: r.address,
      scheduled_date: r.scheduled_date,
      scheduled_time: r.scheduled_time,
      estimated_price: r.estimated_price,
      created_at: r.created_at,
      client_name:
        (Array.isArray(r.client) ? r.client[0] : r.client as { full_name: string } | null)?.full_name ?? "-",
      service_name:
        (Array.isArray(r.service) ? r.service[0] : r.service as { name: string } | null)?.name ?? "-",
    }));
    setRequests(mapped);
    setLoading(false);
  }, [supabase, statusFilter, dateFrom]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">Solicitudes</h1>

      <div className="flex flex-wrap gap-3 mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-border rounded-md px-3 py-2 text-sm text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="border border-border rounded-md px-3 py-2 text-sm text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
        />

        {(statusFilter || dateFrom) && (
          <button
            onClick={() => {
              setStatusFilter("");
              setDateFrom("");
            }}
            className="text-sm text-text-tertiary hover:text-error"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40 text-text-secondary">
          Cargando...
        </div>
      ) : (
        <DataTable data={requests} columns={columns} />
      )}
    </div>
  );
}
