"use client";

import React from "react";

interface PaymentPercentages {
  qr: number;
  cash: number;
  transfer: number;
  raw: { qrCount: number; cashCount: number; transferCount: number; total: number };
}

export function ChartPaymentMethods({ data }: { data: PaymentPercentages }) {
  return (
    <div className="rounded-3xl p-6 bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light/70 shadow-luxury-sm flex flex-col justify-between">
      <div>
        <span className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold font-semibold block mb-1">
          Transacciones
        </span>
        <h3 className="font-serif text-xl text-luxury-charcoal dark:text-luxury-ivory font-normal">
          Métodos de Pago
        </h3>
        <p className="text-xs text-luxury-muted-light dark:text-luxury-muted-dark font-light mt-0.5">
          Distribución de cobros en caja y canales digitales
        </p>
      </div>

      {/* Visual Multi-Segment Bar */}
      <div className="my-6 space-y-4">
        <div className="h-4 w-full rounded-full overflow-hidden flex bg-luxury-sand/30 dark:bg-luxury-charcoal-light p-0.5 border border-luxury-sand/50">
          <div
            style={{ width: `${data.qr}%` }}
            className="h-full bg-luxury-gold rounded-l-full transition-all duration-500"
            title={`QR: ${data.qr}%`}
          />
          <div
            style={{ width: `${data.cash}%` }}
            className="h-full bg-emerald-500 transition-all duration-500"
            title={`Efectivo: ${data.cash}%`}
          />
          <div
            style={{ width: `${data.transfer}%` }}
            className="h-full bg-sky-500 rounded-r-full transition-all duration-500"
            title={`Transferencia: ${data.transfer}%`}
          />
        </div>

        {/* Detailed Breakdown Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light/50 border border-luxury-gold/20 text-center">
            <div className="flex items-center justify-center space-x-1.5 mb-1">
              <span className="w-2 h-2 rounded-full bg-luxury-gold" />
              <span className="text-[11px] font-semibold text-luxury-charcoal dark:text-luxury-ivory uppercase tracking-wider">
                QR Simple
              </span>
            </div>
            <span className="font-serif text-xl font-normal text-luxury-gold block">
              {data.qr}%
            </span>
            <span className="text-[10px] text-luxury-muted-light dark:text-luxury-muted-dark block">
              {data.raw.qrCount} ventas
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light/50 border border-emerald-500/20 text-center">
            <div className="flex items-center justify-center space-x-1.5 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[11px] font-semibold text-luxury-charcoal dark:text-luxury-ivory uppercase tracking-wider">
                Efectivo
              </span>
            </div>
            <span className="font-serif text-xl font-normal text-emerald-600 dark:text-emerald-400 block">
              {data.cash}%
            </span>
            <span className="text-[10px] text-luxury-muted-light dark:text-luxury-muted-dark block">
              {data.raw.cashCount} ventas
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light/50 border border-sky-500/20 text-center">
            <div className="flex items-center justify-center space-x-1.5 mb-1">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              <span className="text-[11px] font-semibold text-luxury-charcoal dark:text-luxury-ivory uppercase tracking-wider">
                Transf.
              </span>
            </div>
            <span className="font-serif text-xl font-normal text-sky-600 dark:text-sky-400 block">
              {data.transfer}%
            </span>
            <span className="text-[10px] text-luxury-muted-light dark:text-luxury-muted-dark block">
              {data.raw.transferCount} ventas
            </span>
          </div>
        </div>
      </div>

      <div className="text-[11px] text-luxury-muted-light dark:text-luxury-muted-dark border-t border-luxury-sand/40 dark:border-luxury-charcoal-light/40 pt-3 flex justify-between">
        <span>Bancos QR: BNB, Mercantil, BCP</span>
        <span>Total: {data.raw.total} pedidos</span>
      </div>
    </div>
  );
}
