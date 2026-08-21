"use client";

import React, { useState } from "react";
import { adminStore } from "@/lib/admin-data";
import { SaleRecordModal } from "@/components/admin/SaleRecordModal";
import { useToast } from "@/components/admin/Toast";

export default function AdminPagosPage() {
  const { success } = useToast();
  const [, setRefresh] = useState(0);

  const [saleModalOpen, setSaleModalOpen] = useState(false);
  const [filterMethod, setFilterMethod] = useState("TODOS");

  const sales = adminStore.getSales();
  const paymentStats = adminStore.getPaymentMethodPercentages();

  const filteredSales = sales.filter(
    (s) => filterMethod === "TODOS" || s.paymentMethod === filterMethod
  );

  const totalCash = sales
    .filter((s) => s.paymentMethod === "CASH")
    .reduce((a, b) => a + b.total, 0);

  const totalQR = sales
    .filter((s) => s.paymentMethod === "QR")
    .reduce((a, b) => a + b.total, 0);

  const totalTransfer = sales
    .filter((s) => s.paymentMethod === "TRANSFER")
    .reduce((a, b) => a + b.total, 0);

  const handleSaveSale = (saleData: any) => {
    adminStore.createSale(saleData);
    setRefresh((r) => r + 1);
    success("Cobro registrado", `Venta ${saleData.code} asentada en caja.`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light shadow-luxury-sm">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold font-semibold block mb-1">
            Caja & Tesorería
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-luxury-charcoal dark:text-luxury-ivory font-normal">
            Métodos de Pago & Arqueo de Caja
          </h1>
          <p className="text-xs sm:text-sm text-luxury-muted-light dark:text-luxury-muted-dark font-light mt-1">
            Control de cobros en Efectivo (con cambio) y transferencias QR con bancos autorizados en Bolivia.
          </p>
        </div>

        <button
          onClick={() => setSaleModalOpen(true)}
          className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-luxury-gold text-luxury-charcoal-black text-xs font-semibold uppercase tracking-[0.2em] hover:bg-luxury-gold-shimmer shadow-luxury-gold transition-all"
        >
          <span className="text-base font-bold">+</span>
          <span>Registrar Cobro</span>
        </button>
      </div>

      {/* Payment Balances by Method */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* QR Payments */}
        <div className="p-6 rounded-3xl bg-white dark:bg-luxury-charcoal border border-luxury-gold/30 shadow-luxury-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-luxury-gold">
              📱 Pagos por QR Simple
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-luxury-gold/15 text-luxury-gold">
              {paymentStats.qr}% del total
            </span>
          </div>
          <h3 className="font-serif text-3xl font-bold text-luxury-charcoal dark:text-luxury-ivory">
            Bs. {totalQR.toLocaleString("es-BO")}
          </h3>
          <span className="text-xs text-luxury-muted-light block mt-1">
            {paymentStats.raw.qrCount} transferencias bancarias
          </span>
        </div>

        {/* Cash Payments */}
        <div className="p-6 rounded-3xl bg-white dark:bg-luxury-charcoal border border-emerald-500/30 shadow-luxury-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400">
              💵 Efectivo en Caja
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              {paymentStats.cash}% del total
            </span>
          </div>
          <h3 className="font-serif text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            Bs. {totalCash.toLocaleString("es-BO")}
          </h3>
          <span className="text-xs text-luxury-muted-light block mt-1">
            {paymentStats.raw.cashCount} cobros en showroom
          </span>
        </div>

        {/* Transfer / Other */}
        <div className="p-6 rounded-3xl bg-white dark:bg-luxury-charcoal border border-sky-500/30 shadow-luxury-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-sky-600 dark:text-sky-400">
              🏦 Transferencias Mayoristas
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/15 text-sky-600 dark:text-sky-400">
              {paymentStats.transfer}% del total
            </span>
          </div>
          <h3 className="font-serif text-3xl font-bold text-sky-600 dark:text-sky-400">
            Bs. {totalTransfer.toLocaleString("es-BO")}
          </h3>
          <span className="text-xs text-luxury-muted-light block mt-1">
            {paymentStats.raw.transferCount} pedidos mayoristas
          </span>
        </div>

      </div>

      {/* Transactions List */}
      <div className="rounded-3xl bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light shadow-luxury-sm overflow-hidden">
        <div className="p-5 border-b border-luxury-sand/60 dark:border-luxury-charcoal-light/60 flex items-center justify-between">
          <h3 className="font-serif text-xl text-luxury-charcoal dark:text-luxury-ivory font-normal">
            Registro Detallado de Cobros
          </h3>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-luxury-muted-light">Filtrar:</span>
            <select
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
              className="px-3.5 py-1.5 rounded-xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs font-medium"
            >
              <option value="TODOS">Todos los Métodos</option>
              <option value="QR">Solo QR Simple</option>
              <option value="CASH">Solo Efectivo</option>
              <option value="TRANSFER">Solo Transferencia</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-luxury-sand/30 dark:bg-luxury-charcoal-light/60 border-b border-luxury-sand/60 text-[10px] uppercase tracking-[0.2em] font-semibold text-luxury-muted-light">
              <tr>
                <th className="py-4 px-6">Venta / Código</th>
                <th className="py-4 px-4">Clienta</th>
                <th className="py-4 px-4">Método</th>
                <th className="py-4 px-4">Detalle de Pago</th>
                <th className="py-4 px-4">Total Cobrado</th>
                <th className="py-4 px-4">Fecha</th>
                <th className="py-4 px-6 text-right">Estado</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-luxury-sand/40 dark:divide-luxury-charcoal-light/40">
              {filteredSales.map((s) => (
                <tr key={s.id} className="hover:bg-luxury-sand/15 dark:hover:bg-luxury-charcoal-light/30">
                  <td className="py-4 px-6 font-mono font-bold text-luxury-charcoal dark:text-luxury-ivory">
                    {s.code}
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-luxury-charcoal dark:text-luxury-ivory block">
                      {s.customerName}
                    </span>
                    <span className="text-[11px] text-luxury-muted-light">
                      {s.customerCity} • {s.customerPhone}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-semibold">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                        s.paymentMethod === "QR"
                          ? "bg-luxury-gold/15 text-luxury-gold"
                          : s.paymentMethod === "CASH"
                          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                          : "bg-sky-500/15 text-sky-600 dark:text-sky-400"
                      }`}
                    >
                      {s.paymentMethod}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-luxury-muted-light font-light text-[11px]">
                    {s.paymentMethod === "QR" && (
                      <div>
                        <span className="text-luxury-charcoal dark:text-luxury-ivory font-medium block">
                          {s.paymentDetails?.bank || "Banco Nacional de Bolivia"}
                        </span>
                        <span>Ref: {s.paymentDetails?.reference || "QR-39102"}</span>
                      </div>
                    )}
                    {s.paymentMethod === "CASH" && (
                      <div>
                        <span>Recibido: Bs. {s.paymentDetails?.amountReceived || s.total}</span>
                        {s.paymentDetails?.changeGiven ? (
                          <span className="block text-emerald-600 font-semibold">
                            Cambio: Bs. {s.paymentDetails.changeGiven}
                          </span>
                        ) : null}
                      </div>
                    )}
                    {s.paymentMethod === "TRANSFER" && (
                      <span>Banco BCP • Confirmado</span>
                    )}
                  </td>
                  <td className="py-4 px-4 font-serif text-sm font-bold text-luxury-gold">
                    Bs. {s.total.toLocaleString("es-BO")}
                  </td>
                  <td className="py-4 px-4 text-luxury-muted-light">
                    {new Date(s.createdAt).toLocaleDateString("es-BO")}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      ✓ Completado
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sale Modal */}
      <SaleRecordModal
        isOpen={saleModalOpen}
        onClose={() => setSaleModalOpen(false)}
        onSave={handleSaveSale}
      />

    </div>
  );
}
