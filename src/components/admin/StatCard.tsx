"use client";

import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  subtitle?: string;
  icon: React.ReactNode;
  badge?: string;
}

export function StatCard({
  title,
  value,
  change,
  isPositive = true,
  subtitle,
  icon,
  badge,
}: StatCardProps) {
  return (
    <div className="relative rounded-3xl p-6 bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light/70 shadow-luxury-sm hover:shadow-luxury-md hover:border-luxury-gold/40 transition-all duration-300 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-luxury-muted-light dark:text-luxury-muted-dark">
          {title}
        </span>
        <div className="w-10 h-10 rounded-2xl bg-luxury-sand/40 dark:bg-luxury-charcoal-light border border-luxury-gold/20 flex items-center justify-center text-luxury-gold">
          {icon}
        </div>
      </div>

      <div className="my-2">
        <h3 className="font-serif text-2xl sm:text-3xl text-luxury-charcoal dark:text-luxury-ivory font-normal tracking-tight">
          {value}
        </h3>
      </div>

      <div className="flex items-center justify-between text-xs pt-3 border-t border-luxury-sand/40 dark:border-luxury-charcoal-light/40">
        {change ? (
          <div className="flex items-center space-x-1 font-medium">
            <span
              className={`inline-flex items-center ${
                isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
              }`}
            >
              {isPositive ? "▲" : "▼"} {change}
            </span>
            <span className="text-luxury-muted-light dark:text-luxury-muted-dark font-light">vs mes ant.</span>
          </div>
        ) : (
          <span className="text-luxury-muted-light dark:text-luxury-muted-dark font-light text-[11px]">
            {subtitle || "Actualizado en tiempo real"}
          </span>
        )}

        {badge && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-luxury-gold/15 text-luxury-gold uppercase tracking-wider">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}
