"use client";

import React, { useState } from "react";
import { adminStore } from "@/lib/admin-data";
import { useToast } from "@/components/admin/Toast";

export default function AdminDescuentosPage() {
  const { success, info } = useToast();
  const [, setRefresh] = useState(0);

  const products = adminStore.getProducts();

  const [discountName, setDiscountName] = useState("Venta Flash de Fin de Semana");
  const [discountType, setDiscountType] = useState<"PERCENTAGE" | "FIXED_BS">("PERCENTAGE");
  const [discountValue, setDiscountValue] = useState<number>(15);
  const [targetCategory, setTargetCategory] = useState<string>("Elegantes");

  const applyCategoryDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    if (discountValue <= 0) return;

    let appliedCount = 0;
    products.forEach((p) => {
      if (targetCategory === "TODAS" || p.category === targetCategory) {
        let finalPromo = 0;
        if (discountType === "PERCENTAGE") {
          finalPromo = Math.round(p.price * (1 - discountValue / 100));
        } else {
          finalPromo = Math.max(50, p.price - discountValue);
        }
        adminStore.updateProduct(p.id, { promotionalPrice: finalPromo });
        appliedCount++;
      }
    });

    setRefresh((r) => r + 1);
    success(
      "Descuento aplicado",
      `Se calculó el precio promocional para ${appliedCount} carteras en '${targetCategory}'`
    );
  };

  const clearAllDiscounts = () => {
    products.forEach((p) => {
      adminStore.updateProduct(p.id, { promotionalPrice: null });
    });
    setRefresh((r) => r + 1);
    info("Descuentos restablecidos", "Todas las carteras volvieron a su precio normal");
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light shadow-luxury-sm">
        <span className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold font-semibold block mb-1">
          Ofertas Directas
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl text-luxury-charcoal dark:text-luxury-ivory font-normal">
          Sistema de Descuentos & Precios Tachados
        </h1>
        <p className="text-xs sm:text-sm text-luxury-muted-light dark:text-luxury-muted-dark font-light mt-1">
          Aplica descuentos por porcentaje o monto fijo en Bs. con visualización de precio anterior tachado.
        </p>
      </div>

      {/* Discount Configurator Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-luxury-sand/30 via-luxury-cream to-luxury-sand/30 dark:from-luxury-charcoal dark:via-luxury-charcoal-light dark:to-luxury-charcoal border border-luxury-gold/30 shadow-luxury-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-xl text-luxury-charcoal dark:text-luxury-ivory font-normal">
            Configurador Rápido de Descuento
          </h3>
          <button
            onClick={clearAllDiscounts}
            className="text-xs uppercase tracking-wider text-rose-500 hover:underline font-semibold"
          >
            Restablecer Precios Normales
          </button>
        </div>

        <form onSubmit={applyCategoryDiscount} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
          <div className="sm:col-span-3">
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
              Nombre de Campaña
            </label>
            <input
              type="text"
              required
              value={discountName}
              onChange={(e) => setDiscountName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-white dark:bg-luxury-charcoal border border-luxury-sand text-xs"
            />
          </div>

          <div className="sm:col-span-3">
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
              Categoría a Aplicar
            </label>
            <select
              value={targetCategory}
              onChange={(e) => setTargetCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-white dark:bg-luxury-charcoal border border-luxury-sand text-xs font-medium"
            >
              <option value="TODAS">Todo el Catálogo</option>
              <option value="Elegantes">Elegantes</option>
              <option value="Casual">Casual</option>
              <option value="Edición Premium">Edición Premium</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
              Tipo
            </label>
            <select
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-2xl bg-white dark:bg-luxury-charcoal border border-luxury-sand text-xs"
            >
              <option value="PERCENTAGE">Porcentaje (%)</option>
              <option value="FIXED_BS">Monto Fijo (Bs.)</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
              Valor
            </label>
            <input
              type="number"
              min={1}
              required
              value={discountValue}
              onChange={(e) => setDiscountValue(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-2xl bg-white dark:bg-luxury-charcoal border border-luxury-sand text-xs font-bold text-luxury-gold"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full py-2.5 rounded-full bg-luxury-gold text-luxury-charcoal-black text-xs font-semibold uppercase tracking-wider hover:bg-luxury-gold-shimmer shadow-luxury-gold transition-all"
            >
              Aplicar Descuento
            </button>
          </div>
        </form>
      </div>

      {/* Live Preview of Handbags with Strikethrough Pricing */}
      <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light shadow-luxury-sm">
        <h3 className="font-serif text-xl text-luxury-charcoal dark:text-luxury-ivory font-normal mb-6">
          Previsualización en Vivo de Precios Tachados
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => {
            const hasPromo = !!p.promotionalPrice;
            const savings = hasPromo ? p.price - (p.promotionalPrice || 0) : 0;
            const pct = hasPromo ? Math.round((savings / p.price) * 100) : 0;

            return (
              <div
                key={p.id}
                className="p-4 rounded-2xl border border-luxury-sand/60 dark:border-luxury-charcoal-light bg-luxury-sand/10 dark:bg-luxury-charcoal-light/30 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-luxury-muted-light font-medium block">
                    {p.category}
                  </span>
                  <h4 className="font-serif text-base text-luxury-charcoal dark:text-luxury-ivory font-medium mt-0.5">
                    {p.name}
                  </h4>
                </div>

                <div className="pt-4 mt-4 border-t border-luxury-sand/40 flex items-baseline justify-between">
                  <div>
                    {hasPromo ? (
                      <div className="space-y-0.5">
                        <span className="line-through text-xs text-luxury-muted-light block">
                          Bs. {p.price}
                        </span>
                        <span className="font-serif text-lg font-bold text-emerald-600 dark:text-emerald-400">
                          Bs. {p.promotionalPrice}
                        </span>
                      </div>
                    ) : (
                      <span className="font-serif text-lg font-semibold text-luxury-charcoal dark:text-luxury-ivory">
                        Bs. {p.price}
                      </span>
                    )}
                  </div>

                  {hasPromo && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      -{pct}%
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
