"use client";

import React, { useState } from "react";
import { adminStore, AdminProduct } from "@/lib/admin-data";
import { useToast } from "@/components/admin/Toast";

export default function AdminPreciosPage() {
  const { success, error } = useToast();
  const [, setRefresh] = useState(0);

  const products = adminStore.getProducts();
  const histories = adminStore.getPriceHistories();

  // Bulk update state
  const [bulkCategory, setBulkCategory] = useState("TODAS");
  const [percentageChange, setPercentageChange] = useState<number>(5);
  const [bulkReason, setBulkReason] = useState("Ajuste por temporada de alta demanda");

  // In-line individual price edit states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newNormalPrice, setNewNormalPrice] = useState<number>(0);
  const [newPromoPrice, setNewPromoPrice] = useState<number | "">("");
  const [newWholesalePrice, setNewWholesalePrice] = useState<number>(0);

  const startEdit = (p: AdminProduct) => {
    setEditingId(p.id);
    setNewNormalPrice(p.price);
    setNewPromoPrice(p.promotionalPrice || "");
    setNewWholesalePrice(p.wholesalePrice);
  };

  const saveIndividualPrice = (p: AdminProduct) => {
    if (newNormalPrice <= 0) {
      error("Precio inválido", "El precio normal debe ser mayor a 0");
      return;
    }

    adminStore.updateProduct(p.id, {
      price: Number(newNormalPrice),
      promotionalPrice: newPromoPrice ? Number(newPromoPrice) : null,
      wholesalePrice: Number(newWholesalePrice),
    });

    setEditingId(null);
    setRefresh((r) => r + 1);
    success("Precio actualizado", `Se guardaron las nuevas tarifas para ${p.name}`);
  };

  const handleBulkUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (percentageChange === 0) return;

    const count = adminStore.bulkUpdatePrices(bulkCategory, percentageChange, bulkReason);
    setRefresh((r) => r + 1);
    success(
      "Ajuste masivo aplicado",
      `Se actualizaron ${count} carteras con un ${percentageChange > 0 ? "+" : ""}${percentageChange}%`
    );
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light shadow-luxury-sm">
        <span className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold font-semibold block mb-1">
          Tarifas & Margen
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl text-luxury-charcoal dark:text-luxury-ivory font-normal">
          Gestión de Precios e Historial
        </h1>
        <p className="text-xs sm:text-sm text-luxury-muted-light dark:text-luxury-muted-dark font-light mt-1">
          Modifica precios individualmente en línea o realiza incrementos y descuentos porcentuales masivos.
        </p>
      </div>

      {/* Bulk Update Tool Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-luxury-sand/30 via-luxury-cream to-luxury-sand/30 dark:from-luxury-charcoal dark:via-luxury-charcoal-light dark:to-luxury-charcoal border border-luxury-gold/30 shadow-luxury-sm">
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-luxury-gold text-lg">⚡</span>
          <h3 className="font-serif text-xl text-luxury-charcoal dark:text-luxury-ivory font-normal">
            Ajuste Masivo de Precios
          </h3>
        </div>

        <form onSubmit={handleBulkUpdate} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
          <div className="sm:col-span-3">
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
              Categoría Objetivo
            </label>
            <select
              value={bulkCategory}
              onChange={(e) => setBulkCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-white dark:bg-luxury-charcoal border border-luxury-sand text-xs font-medium"
            >
              <option value="TODAS">Todas las Carteras ({products.length})</option>
              <option value="Edición Premium">Edición Premium</option>
              <option value="Elegantes">Elegantes</option>
              <option value="Casual">Casual</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
              Variación Porcentual (%)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                required
                value={percentageChange}
                onChange={(e) => setPercentageChange(Number(e.target.value))}
                placeholder="ej. 10 o -10"
                className="w-full px-3.5 py-2.5 rounded-2xl bg-white dark:bg-luxury-charcoal border border-luxury-sand text-xs font-bold text-luxury-gold"
              />
              <span className="text-xs font-bold">%</span>
            </div>
          </div>

          <div className="sm:col-span-4">
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
              Motivo del Cambio (Auditoría)
            </label>
            <input
              type="text"
              required
              value={bulkReason}
              onChange={(e) => setBulkReason(e.target.value)}
              placeholder="ej. Incremento costo cueros importados"
              className="w-full px-3.5 py-2.5 rounded-2xl bg-white dark:bg-luxury-charcoal border border-luxury-sand text-xs"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full py-2.5 rounded-full bg-luxury-gold text-luxury-charcoal-black text-xs font-semibold uppercase tracking-wider hover:bg-luxury-gold-shimmer shadow-luxury-gold transition-all"
            >
              Aplicar a Lote
            </button>
          </div>
        </form>
      </div>

      {/* Individual Pricing Table */}
      <div className="rounded-3xl bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light shadow-luxury-sm overflow-hidden">
        <div className="p-6 border-b border-luxury-sand/60 dark:border-luxury-charcoal-light/60 flex items-center justify-between">
          <h3 className="font-serif text-xl text-luxury-charcoal dark:text-luxury-ivory font-normal">
            Tabla de Precios por Modelo
          </h3>
          <span className="text-xs text-luxury-muted-light">
            Edita y guarda tarifas en tiempo real
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-luxury-sand/30 dark:bg-luxury-charcoal-light/60 border-b border-luxury-sand/60 text-[10px] uppercase tracking-[0.2em] font-semibold text-luxury-muted-light">
              <tr>
                <th className="py-4 px-6">Modelo</th>
                <th className="py-4 px-4">Categoría</th>
                <th className="py-4 px-4">Costo Prod.</th>
                <th className="py-4 px-4">Precio Normal (Bs.)</th>
                <th className="py-4 px-4">Precio Promo (Bs.)</th>
                <th className="py-4 px-4">P. Mayorista (Bs.)</th>
                <th className="py-4 px-4">Margen Ganancia</th>
                <th className="py-4 px-6 text-right">Acción</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-luxury-sand/40 dark:divide-luxury-charcoal-light/40">
              {products.map((p) => {
                const isEditing = editingId === p.id;
                const margin = p.costPrice > 0 ? Math.round(((p.price - p.costPrice) / p.price) * 100) : 50;

                return (
                  <tr key={p.id} className="hover:bg-luxury-sand/15 dark:hover:bg-luxury-charcoal-light/30">
                    <td className="py-4 px-6 font-medium text-luxury-charcoal dark:text-luxury-ivory">
                      {p.name}
                    </td>
                    <td className="py-4 px-4 text-luxury-muted-light">{p.category}</td>
                    <td className="py-4 px-4 text-luxury-muted-light">Bs. {p.costPrice}</td>

                    {/* Normal Price */}
                    <td className="py-4 px-4">
                      {isEditing ? (
                        <input
                          type="number"
                          value={newNormalPrice}
                          onChange={(e) => setNewNormalPrice(Number(e.target.value))}
                          className="w-24 px-2 py-1 rounded-lg bg-luxury-sand/30 border border-luxury-sand text-xs font-bold text-luxury-gold"
                        />
                      ) : (
                        <span className="font-serif text-sm font-bold text-luxury-gold">
                          Bs. {p.price}
                        </span>
                      )}
                    </td>

                    {/* Promo Price */}
                    <td className="py-4 px-4">
                      {isEditing ? (
                        <input
                          type="number"
                          value={newPromoPrice}
                          onChange={(e) => setNewPromoPrice(e.target.value ? Number(e.target.value) : "")}
                          placeholder="Sin promo"
                          className="w-24 px-2 py-1 rounded-lg bg-luxury-sand/30 border border-luxury-sand text-xs font-semibold text-emerald-600"
                        />
                      ) : (
                        <span className={p.promotionalPrice ? "font-semibold text-emerald-600" : "text-luxury-muted-light"}>
                          {p.promotionalPrice ? `Bs. ${p.promotionalPrice}` : "—"}
                        </span>
                      )}
                    </td>

                    {/* Wholesale Price */}
                    <td className="py-4 px-4">
                      {isEditing ? (
                        <input
                          type="number"
                          value={newWholesalePrice}
                          onChange={(e) => setNewWholesalePrice(Number(e.target.value))}
                          className="w-24 px-2 py-1 rounded-lg bg-luxury-sand/30 border border-luxury-sand text-xs font-semibold text-luxury-charcoal dark:text-white"
                        />
                      ) : (
                        <span className="font-medium text-luxury-charcoal dark:text-luxury-ivory">
                          Bs. {p.wholesalePrice}
                        </span>
                      )}
                    </td>

                    {/* Profit Margin */}
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                        {margin}%
                      </span>
                    </td>

                    {/* Action buttons */}
                    <td className="py-4 px-6 text-right">
                      {isEditing ? (
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => saveIndividualPrice(p)}
                            className="px-3 py-1 rounded-full bg-emerald-600 text-white font-semibold text-[11px]"
                          >
                            Guardar
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-3 py-1 rounded-full border border-luxury-sand text-[11px]"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEdit(p)}
                          className="px-3 py-1.5 rounded-full bg-luxury-sand/40 dark:bg-luxury-charcoal-light hover:bg-luxury-gold hover:text-luxury-charcoal-black transition-colors font-medium text-[11px]"
                        >
                          Editar Precio
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Price History Audit Log */}
      <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light shadow-luxury-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold font-semibold block">
              Registro de Auditoría
            </span>
            <h3 className="font-serif text-xl text-luxury-charcoal dark:text-luxury-ivory font-normal">
              Historial de Cambios de Precio ({histories.length})
            </h3>
          </div>
        </div>

        {histories.length > 0 ? (
          <div className="divide-y divide-luxury-sand/40 dark:divide-luxury-charcoal-light/40">
            {histories.map((h) => (
              <div key={h.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-luxury-charcoal dark:text-luxury-ivory block">
                    {h.productName}
                  </span>
                  <span className="text-luxury-muted-light text-[11px]">
                    Motivo: {h.reason} • {new Date(h.createdAt).toLocaleDateString("es-BO")}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="line-through text-luxury-muted-light">Bs. {h.oldPrice}</span>
                  <span>→</span>
                  <span className="font-bold text-luxury-gold text-sm">Bs. {h.newPrice}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-luxury-muted-light py-4 text-center">
            Aún no se registran modificaciones de precios en esta sesión.
          </p>
        )}
      </div>

    </div>
  );
}
