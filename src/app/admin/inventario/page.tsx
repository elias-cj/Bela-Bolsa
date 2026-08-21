"use client";

import React, { useState } from "react";
import Image from "next/image";
import { adminStore, AdminProduct } from "@/lib/admin-data";
import { useToast } from "@/components/admin/Toast";

export default function AdminInventarioPage() {
  const { success } = useToast();
  const [, setRefresh] = useState(0);

  const products = adminStore.getProducts();

  const totalUnits = products.reduce((acc, p) => acc + p.stock, 0);
  const totalCostValue = products.reduce((acc, p) => acc + p.stock * p.costPrice, 0);
  const totalRetailValue = products.reduce((acc, p) => acc + p.stock * p.price, 0);

  const handleAdjustStock = (p: AdminProduct, delta: number) => {
    const nextStock = Math.max(0, p.stock + delta);
    adminStore.updateProduct(p.id, { stock: nextStock });
    setRefresh((r) => r + 1);
    success("Stock actualizado", `${p.name} ahora cuenta con ${nextStock} unidades.`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light shadow-luxury-sm">
        <span className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold font-semibold block mb-1">
          Stock & Existencias
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl text-luxury-charcoal dark:text-luxury-ivory font-normal">
          Control de Inventario & Valorización
        </h1>
        <p className="text-xs sm:text-sm text-luxury-muted-light dark:text-luxury-muted-dark font-light mt-1">
          Monitoreo de existencias, valor patrimonial y ajuste rápido de inventario.
        </p>
      </div>

      {/* Inventory Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light shadow-luxury-sm">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-luxury-muted-light">
            Unidades en Almacén
          </span>
          <h3 className="font-serif text-3xl font-bold text-luxury-charcoal dark:text-luxury-ivory mt-2">
            {totalUnits} carteras
          </h3>
          <span className="text-xs text-luxury-muted-light block mt-1">
            Distribuidas en 8 modelos activos
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light shadow-luxury-sm">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-luxury-muted-light">
            Valor de Inventario (Costo)
          </span>
          <h3 className="font-serif text-3xl font-bold text-luxury-muted-dark dark:text-luxury-sand mt-2">
            Bs. {totalCostValue.toLocaleString("es-BO")}
          </h3>
          <span className="text-xs text-luxury-muted-light block mt-1">
            Capital invertido en marroquinería
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-luxury-charcoal border border-luxury-gold/30 shadow-luxury-sm">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-luxury-gold">
            Valor Estimado de Venta (Retail)
          </span>
          <h3 className="font-serif text-3xl font-bold text-luxury-gold mt-2">
            Bs. {totalRetailValue.toLocaleString("es-BO")}
          </h3>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 block mt-1 font-medium">
            Potencial de ganancia: Bs. {(totalRetailValue - totalCostValue).toLocaleString("es-BO")}
          </span>
        </div>
      </div>

      {/* Inventory Management Table */}
      <div className="rounded-3xl bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light shadow-luxury-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-luxury-sand/30 dark:bg-luxury-charcoal-light/60 border-b border-luxury-sand/60 text-[10px] uppercase tracking-[0.2em] font-semibold text-luxury-muted-light">
              <tr>
                <th className="py-4 px-6">Cartera</th>
                <th className="py-4 px-4">Categoría</th>
                <th className="py-4 px-4">Costo Unit.</th>
                <th className="py-4 px-4">P. Venta</th>
                <th className="py-4 px-4">Stock Actual</th>
                <th className="py-4 px-4">Nivel de Stock</th>
                <th className="py-4 px-6 text-right">Ajuste Rápido (+ / -)</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-luxury-sand/40 dark:divide-luxury-charcoal-light/40">
              {products.map((p) => {
                const isCritical = p.stock <= p.minStockAlert;

                return (
                  <tr key={p.id} className="hover:bg-luxury-sand/20 dark:hover:bg-luxury-charcoal-light/30">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-10 h-12 rounded-xl overflow-hidden bg-luxury-sand/30 border border-luxury-sand flex-shrink-0">
                          <Image src={p.images[0] || "/images/carteras/MDC-1-1.jpeg"} alt={p.name} fill className="object-cover" />
                        </div>
                        <span className="font-serif text-sm font-medium text-luxury-charcoal dark:text-luxury-ivory">
                          {p.name}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-luxury-muted-light">{p.category}</td>
                    <td className="py-4 px-4 text-luxury-muted-light">Bs. {p.costPrice}</td>
                    <td className="py-4 px-4 font-serif font-semibold text-luxury-gold">Bs. {p.price}</td>

                    {/* Stock Count */}
                    <td className="py-4 px-4 font-serif text-base font-bold text-luxury-charcoal dark:text-luxury-ivory">
                      {p.stock} u.
                    </td>

                    {/* Stock Alert Badge */}
                    <td className="py-4 px-4">
                      {isCritical ? (
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/15 text-rose-600 dark:text-rose-400">
                          ⚠️ Crítico (≤ {p.minStockAlert})
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                          ✓ Óptimo
                        </span>
                      )}
                    </td>

                    {/* Quick Stepper (+ / -) */}
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center space-x-1.5 p-1 rounded-xl bg-luxury-sand/30 dark:bg-luxury-charcoal-light border border-luxury-sand">
                        <button
                          onClick={() => handleAdjustStock(p, -1)}
                          disabled={p.stock <= 0}
                          className="w-7 h-7 rounded-lg bg-white dark:bg-luxury-charcoal flex items-center justify-center font-bold text-luxury-charcoal dark:text-luxury-ivory hover:bg-rose-500 hover:text-white disabled:opacity-30"
                          title="Restar 1 unidad"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-bold text-xs">{p.stock}</span>
                        <button
                          onClick={() => handleAdjustStock(p, +1)}
                          className="w-7 h-7 rounded-lg bg-white dark:bg-luxury-charcoal flex items-center justify-center font-bold text-luxury-charcoal dark:text-luxury-ivory hover:bg-emerald-600 hover:text-white"
                          title="Sumar 1 unidad"
                        >
                          +
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
