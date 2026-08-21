"use client";

import React from "react";

export function ChartCategories({ data }: { data: Record<string, number> }) {
  const total = Object.values(data).reduce((a, b) => a + b, 0) || 1;

  const categories = [
    { name: "Edición Premium", color: "bg-luxury-gold", barColor: "#C5A880", amount: data["Edición Premium"] || 0 },
    { name: "Elegantes", color: "bg-luxury-charcoal dark:bg-luxury-sand", barColor: "#1C1B19", amount: data["Elegantes"] || 0 },
    { name: "Casual", color: "bg-amber-600", barColor: "#D97706", amount: data["Casual"] || 0 },
  ];

  return (
    <div className="rounded-3xl p-6 bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light/70 shadow-luxury-sm flex flex-col justify-between">
      <div>
        <span className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold font-semibold block mb-1">
          Rendimiento
        </span>
        <h3 className="font-serif text-xl text-luxury-charcoal dark:text-luxury-ivory font-normal">
          Ventas por Categoría
        </h3>
        <p className="text-xs text-luxury-muted-light dark:text-luxury-muted-dark font-light mt-0.5">
          Participación de facturación por línea de diseño
        </p>
      </div>

      <div className="space-y-4 my-6">
        {categories.map((cat) => {
          const pct = Math.round((cat.amount / total) * 100) || 0;
          return (
            <div key={cat.name} className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-luxury-charcoal dark:text-luxury-ivory">
                  {cat.name}
                </span>
                <span className="font-semibold text-luxury-gold">
                  Bs. {cat.amount.toLocaleString("es-BO")} ({pct}%)
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-luxury-sand/40 dark:bg-luxury-charcoal-light overflow-hidden">
                <div
                  style={{ width: `${Math.max(5, pct)}%` }}
                  className={`h-full rounded-full ${cat.color} transition-all duration-700`}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-3 border-t border-luxury-sand/40 dark:border-luxury-charcoal-light/40 flex justify-between text-xs text-luxury-muted-light dark:text-luxury-muted-dark">
        <span>Total categoría:</span>
        <strong className="text-luxury-charcoal dark:text-luxury-ivory">
          Bs. {total.toLocaleString("es-BO")}
        </strong>
      </div>
    </div>
  );
}
