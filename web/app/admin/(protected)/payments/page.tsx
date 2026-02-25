"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import DataTable from "@/components/admin/DataTable";
import type { ColumnDef } from "@tanstack/react-table";

interface Payment {
  id: string;
  amount: number;
  platform_fee: number;
  provider_amount: number;
  currency: string;
  status: string;
  created_at: string;
  stripe_payment_intent_id: string;
}

const STATUS_LABELS: Record<string, { label: string; class: string }> = {
  authorized: { label: "Autorizado", class: "bg-blue-50 text-primary" },
  captured: { label: "Capturado", class: "bg-green-50 text-success" },
  cancelled: { label: "Cancelado", class: "bg-red-50 text-error" },
  refunded: { label: "Reembolsado", class: "bg-yellow-50 text-warning" },
};

const columns: ColumnDef<Payment, unknown>[] = [
  {
    accessorKey: "stripe_payment_intent_id",
    header: "Intent ID",
    cell: ({ getValue }) => {
      const id = getValue() as string;
      return (
        <span className="font-mono text-xs text-text-secondary">{id}</span>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Total",
    cell: ({ getValue, row }) => {
      const amount = getValue() as number;
      return `$${amount.toLocaleString("es-MX", { minimumFractionDigits: 2 })} ${row.original.currency}`;
    },
  },
  {
    accessorKey: "platform_fee",
    header: "Fee plataforma",
    cell: ({ getValue, row }) => {
      const fee = getValue() as number;
      return `$${fee.toLocaleString("es-MX", { minimumFractionDigits: 2 })} ${row.original.currency}`;
    },
  },
  {
    accessorKey: "provider_amount",
    header: "Para proveedor",
    cell: ({ getValue, row }) => {
      const amt = getValue() as number;
      return `$${amt.toLocaleString("es-MX", { minimumFractionDigits: 2 })} ${row.original.currency}`;
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ getValue }) => {
      const status = getValue() as string;
      const meta = STATUS_LABELS[status] ?? { label: status, class: "" };
      return (
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${meta.class}`}
        >
          {meta.label}
        </span>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Fecha",
    cell: ({ getValue }) => {
      const date = getValue() as string;
      return new Date(date).toLocaleDateString("es-MX");
    },
  },
];

const STATUS_OPTIONS = [
  { value: "", label: "Todos los estados" },
  { value: "authorized", label: "Autorizado" },
  { value: "captured", label: "Capturado" },
  { value: "cancelled", label: "Cancelado" },
  { value: "refunded", label: "Reembolsado" },
];

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");

  const supabase = createClient();

  const loadPayments = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from("payments")
      .select("*")
      .order("created_at", { ascending: false });

    if (statusFilter) {
      query = query.eq("status", statusFilter);
    }

    const { data } = await query;
    setPayments(data ?? []);
    setLoading(false);
  }, [supabase, statusFilter]);

  useEffect(() => {
    loadPayments();
  }, [loadPayments]);

  const totalCaptured = payments
    .filter((p) => p.status === "captured")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">Pagos</h1>

      {!statusFilter && (
        <div className="bg-primary-light border border-primary/20 rounded-lg p-4 mb-6">
          <p className="text-sm text-text-secondary">
            Total capturado en el conjunto actual:{" "}
            <span className="font-bold text-primary">
              ${totalCaptured.toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN
            </span>
          </p>
        </div>
      )}

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

        {statusFilter && (
          <button
            onClick={() => setStatusFilter("")}
            className="text-sm text-text-tertiary hover:text-error"
          >
            Limpiar filtro
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40 text-text-secondary">
          Cargando...
        </div>
      ) : (
        <DataTable data={payments} columns={columns} />
      )}
    </div>
  );
}
