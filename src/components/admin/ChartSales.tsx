"use client";

import React, { useState } from "react";

interface MonthlyData {
  month: string;
  sales: number;
  expenses: number;
  profit: number;
}

export function ChartSales({ data }: { data: MonthlyData[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const maxVal = Math.max(...data.map((d) => Math.max(d.sales, d.expenses))) * 1.15 || 35000;
  const chartHeight = 220;
  const chartWidth = 550;

  return (
    <div className="rounded-3xl p-6 bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light/70 shadow-luxury-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold font-semibold block">
            Evolución Financiera
          </span>
          <h3 className="font-serif text-xl text-luxury-charcoal dark:text-luxury-ivory font-normal">
            Ventas vs Gastos Mensuales
          </h3>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-luxury-gold inline-block" />
            <span className="text-luxury-charcoal dark:text-luxury-ivory font-medium">Ingresos</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-luxury-charcoal dark:bg-luxury-sand/60 inline-block" />
            <span className="text-luxury-muted-light dark:text-luxury-muted-dark font-medium">Gastos</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">Ganancia</span>
          </div>
        </div>
      </div>

      {/* SVG Bar / Area Visualization */}
      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight + 40}`}
          className="w-full h-56 min-w-[480px] overflow-visible"
        >
          {/* Horizontal Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
            const y = chartHeight - pct * chartHeight + 10;
            return (
              <g key={i}>
                <line
                  x1="40"
                  y1={y}
                  x2={chartWidth}
                  y2={y}
                  stroke="currentColor"
                  className="text-luxury-sand/40 dark:text-luxury-charcoal-light/40"
                  strokeDasharray="3 3"
                />
                <text
                  x="0"
                  y={y + 4}
                  className="text-[10px] fill-current text-luxury-muted-light dark:text-luxury-muted-dark font-mono"
                >
                  Bs. {Math.round((pct * maxVal) / 1000)}k
                </text>
              </g>
            );
          })}

          {/* Bars */}
          {data.map((item, idx) => {
            const colWidth = (chartWidth - 60) / data.length;
            const x = 55 + idx * colWidth;
            const barWidth = 14;

            const salesHeight = (item.sales / maxVal) * chartHeight;
            const expenseHeight = (item.expenses / maxVal) * chartHeight;
            const profitHeight = (item.profit / maxVal) * chartHeight;

            const isHovered = hoveredIdx === idx;

            return (
              <g
                key={item.month}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="cursor-pointer transition-opacity"
              >
                {/* Sales Bar */}
                <rect
                  x={x}
                  y={chartHeight - salesHeight + 10}
                  width={barWidth}
                  height={salesHeight}
                  rx="4"
                  className="fill-luxury-gold transition-all duration-300 hover:brightness-110"
                />

                {/* Expense Bar */}
                <rect
                  x={x + barWidth + 3}
                  y={chartHeight - expenseHeight + 10}
                  width={barWidth}
                  height={expenseHeight}
                  rx="4"
                  className="fill-luxury-charcoal dark:fill-luxury-sand/50 transition-all duration-300"
                />

                {/* Profit Bar */}
                <rect
                  x={x + (barWidth + 3) * 2}
                  y={chartHeight - profitHeight + 10}
                  width={barWidth}
                  height={profitHeight}
                  rx="4"
                  className="fill-emerald-500 transition-all duration-300"
                />

                {/* Month Label */}
                <text
                  x={x + barWidth * 1.5 + 3}
                  y={chartHeight + 30}
                  textAnchor="middle"
                  className={`text-xs fill-current font-medium transition-colors ${
                    isHovered
                      ? "text-luxury-gold font-bold"
                      : "text-luxury-muted-light dark:text-luxury-muted-dark"
                  }`}
                >
                  {item.month}
                </text>

                {/* Tooltip on hover */}
                {isHovered && (
                  <g>
                    <rect
                      x={Math.min(x - 20, chartWidth - 140)}
                      y={10}
                      width="130"
                      height="65"
                      rx="8"
                      className="fill-luxury-charcoal-black/95 dark:fill-white/95"
                    />
                    <text
                      x={Math.min(x - 20, chartWidth - 140) + 10}
                      y={30}
                      className="text-[10px] fill-white dark:fill-black font-semibold"
                    >
                      Ventas: Bs. {item.sales.toLocaleString("es-BO")}
                    </text>
                    <text
                      x={Math.min(x - 20, chartWidth - 140) + 10}
                      y={46}
                      className="text-[10px] fill-white/80 dark:fill-black/80"
                    >
                      Gastos: Bs. {item.expenses.toLocaleString("es-BO")}
                    </text>
                    <text
                      x={Math.min(x - 20, chartWidth - 140) + 10}
                      y={62}
                      className="text-[10px] fill-emerald-400 dark:fill-emerald-700 font-bold"
                    >
                      Ganancia: Bs. {item.profit.toLocaleString("es-BO")}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
