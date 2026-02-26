"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  sort_order: number;
  is_active: boolean;
}

interface Service {
  id: string;
  category_id: string;
  name: string;
  base_price: number;
  icon: string;
  is_active: boolean;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [saving, setSaving] = useState(false);

  const supabase = createClient();

  const loadData = useCallback(async () => {
    setLoading(true);
    const [{ data: cats }, { data: svcs }] = await Promise.all([
      supabase.from("categories").select("*").order("sort_order"),
      supabase.from("services").select("*").order("sort_order"),
    ]);
    setCategories(cats ?? []);
    setServices(svcs ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function toggleCategory(cat: Category) {
    await supabase
      .from("categories")
      .update({ is_active: !cat.is_active })
      .eq("id", cat.id);
    setCategories((prev) =>
      prev.map((c) =>
        c.id === cat.id ? { ...c, is_active: !cat.is_active } : c
      )
    );
  }

  async function saveCategory() {
    if (!editingCategory) return;
    setSaving(true);
    await supabase
      .from("categories")
      .update({
        name: editingCategory.name,
        icon: editingCategory.icon,
        color: editingCategory.color,
        sort_order: editingCategory.sort_order,
      })
      .eq("id", editingCategory.id);
    setCategories((prev) =>
      prev.map((c) => (c.id === editingCategory.id ? editingCategory : c))
    );
    setEditingCategory(null);
    setSaving(false);
  }

  const filteredServices = selectedCategoryId
    ? services.filter((s) => s.category_id === selectedCategoryId)
    : services;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-text-secondary">
        Cargando...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">
        Categorías y Servicios
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Categories */}
        <div>
          <h2 className="text-base font-semibold text-text-primary mb-3">
            Categorías
          </h2>
          <div className="bg-surface border border-border rounded-lg overflow-hidden">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-0"
              >
                {editingCategory?.id === cat.id ? (
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <input
                      className="col-span-2 border border-border rounded px-2 py-1 text-sm"
                      value={editingCategory.name}
                      onChange={(e) =>
                        setEditingCategory({ ...editingCategory, name: e.target.value })
                      }
                    />
                    <input
                      className="border border-border rounded px-2 py-1 text-sm"
                      value={editingCategory.icon}
                      placeholder="Ícono (emoji)"
                      onChange={(e) =>
                        setEditingCategory({ ...editingCategory, icon: e.target.value })
                      }
                    />
                    <input
                      className="border border-border rounded px-2 py-1 text-sm"
                      value={editingCategory.color}
                      placeholder="Color hex"
                      onChange={(e) =>
                        setEditingCategory({ ...editingCategory, color: e.target.value })
                      }
                    />
                    <input
                      type="number"
                      className="border border-border rounded px-2 py-1 text-sm"
                      value={editingCategory.sort_order}
                      placeholder="Orden"
                      onChange={(e) =>
                        setEditingCategory({
                          ...editingCategory,
                          sort_order: Number(e.target.value),
                        })
                      }
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={saveCategory}
                        disabled={saving}
                        className="px-3 py-1 bg-primary text-white rounded text-xs font-medium"
                      >
                        {saving ? "..." : "Guardar"}
                      </button>
                      <button
                        onClick={() => setEditingCategory(null)}
                        className="px-3 py-1 border border-border rounded text-xs text-text-secondary"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="text-xl">{cat.icon}</span>
                    <button
                      className="flex-1 text-left text-sm font-medium text-text-primary hover:text-primary"
                      onClick={() =>
                        setSelectedCategoryId(
                          selectedCategoryId === cat.id ? null : cat.id
                        )
                      }
                    >
                      {cat.name}
                    </button>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        cat.is_active
                          ? "bg-green-50 text-success"
                          : "bg-gray-100 text-text-tertiary"
                      }`}
                    >
                      {cat.is_active ? "Activa" : "Inactiva"}
                    </span>
                    <button
                      onClick={() => setEditingCategory(cat)}
                      className="text-xs text-text-tertiary hover:text-primary px-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => toggleCategory(cat)}
                      className="text-xs text-text-tertiary hover:text-text-primary px-2"
                    >
                      {cat.is_active ? "Desactivar" : "Activar"}
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h2 className="text-base font-semibold text-text-primary mb-3">
            Servicios
            {selectedCategoryId && (
              <span className="text-text-tertiary font-normal text-sm ml-2">
                (
                {categories.find((c) => c.id === selectedCategoryId)?.name ??
                  ""}
                )
              </span>
            )}
          </h2>
          <div className="bg-surface border border-border rounded-lg overflow-hidden">
            {filteredServices.length === 0 ? (
              <p className="text-center py-8 text-text-tertiary text-sm">
                {selectedCategoryId
                  ? "Sin servicios en esta categoría"
                  : "Selecciona una categoría para filtrar"}
              </p>
            ) : (
              filteredServices.map((svc) => (
                <div
                  key={svc.id}
                  className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-0"
                >
                  <span className="text-xl">{svc.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {svc.name}
                    </p>
                    <p className="text-xs text-text-tertiary">
                      ${svc.base_price.toLocaleString("es-MX")} MXN base
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      svc.is_active
                        ? "bg-green-50 text-success"
                        : "bg-gray-100 text-text-tertiary"
                    }`}
                  >
                    {svc.is_active ? "Activo" : "Inactivo"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
