"use client";

import React, { useState } from "react";
import { adminStore, AdminExpense } from "@/lib/admin-data";
import { ExpenseFormModal } from "@/components/admin/ExpenseFormModal";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { useToast } from "@/components/admin/Toast";

export default function AdminGastosPage() {
  const { success } = useToast();
  const [, setRefresh] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteExpense, setDeleteExpense] = useState<AdminExpense | null>(null);
  const [filterCategory, setFilterCategory] = useState("TODAS");

  const expenses = adminStore.getExpenses();
  const kpis = adminStore.getKPIs();

  const filteredExpenses = expenses.filter(
    (e) => filterCategory === "TODAS" || e.category === filterCategory
  );

  const totalFiltered = filteredExpenses.reduce((acc, e) => acc + e.amount, 0);

  const handleSaveExpense = (data: Omit<AdminExpense, "id" | "createdAt">) => {
    adminStore.createExpense(data);
    setRefresh((r) => r + 1);
    success("Egreso registrado", `Se contabilizó '${data.concept}' por Bs. ${data.amount}`);
  };

  const handleConfirmDelete = () => {
    if (deleteExpense) {
      adminStore.deleteExpense(deleteExpense.id);
      success("Egreso eliminado", `El registro fue retirado.`);
      setDeleteExpense(null);
      setRefresh((r) => r + 1);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light shadow-luxury-sm">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold font-semibold block mb-1">
            Contabilidad & Costos
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-luxury-charcoal dark:text-luxury-ivory font-normal">
            Compras & Gastos Operativos
          </h1>
          <p className="text-xs sm:text-sm text-luxury-muted-light dark:text-luxury-muted-dark font-light mt-1">
            Control de egresos en mercadería, courier express, alquiler de showroom y marketing.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-luxury-gold text-luxury-charcoal-black text-xs font-semibold uppercase tracking-[0.2em] hover:bg-luxury-gold-shimmer shadow-luxury-gold transition-all"
        >
          <span className="text-base font-bold">+</span>
          <span>Registrar Egreso</span>
        </button>
      </div>

      {/* Financial Balance Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light shadow-luxury-sm">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-luxury-muted-light">
            Total Egresos del Mes
          </span>
          <h3 className="font-serif text-3xl font-bold text-rose-600 dark:text-rose-400 mt-2">
            Bs. {kpis.totalExpenses.toLocaleString("es-BO")}
          </h3>
          <span className="text-xs text-luxury-muted-light block mt-1">
            {expenses.length} egresos contabilizados
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light shadow-luxury-sm">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-luxury-muted-light">
            Ventas Totales (Ingresos)
          </span>
          <h3 className="font-serif text-3xl font-bold text-luxury-gold mt-2">
            Bs. {kpis.monthIncome.toLocaleString("es-BO")}
          </h3>
          <span className="text-xs text-luxury-muted-light block mt-1">
            Cobrado en Efectivo & QR
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-luxury-charcoal border border-emerald-500/30 shadow-luxury-sm">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400">
            Ganancia Neta Mensual
          </span>
          <h3 className="font-serif text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">
            Bs. {kpis.netProfit.toLocaleString("es-BO")}
          </h3>
          <span className="text-xs text-emerald-600/80 font-medium block mt-1">
            Margen neto de ganancia: {kpis.profitMargin}%
          </span>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="rounded-3xl bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light shadow-luxury-sm overflow-hidden">
        <div className="p-5 border-b border-luxury-sand/60 dark:border-luxury-charcoal-light/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <h3 className="font-serif text-xl text-luxury-charcoal dark:text-luxury-ivory font-normal">
            Historial de Gastos
          </h3>

          <div className="flex items-center space-x-3 text-xs">
            <label className="text-luxury-muted-light">Filtrar:</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3.5 py-1.5 rounded-xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs font-medium"
            >
              <option value="TODAS">Todas las Categorías</option>
              <option value="MERCADERIA">Mercadería / Cueros</option>
              <option value="TRANSPORTE">Transporte / Envíos</option>
              <option value="PUBLICIDAD">Publicidad</option>
              <option value="ALQUILER">Alquiler</option>
              <option value="SERVICIOS">Servicios</option>
              <option value="EMPAQUE">Empaque de Lujo</option>
              <option value="OTROS">Otros</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-luxury-sand/30 dark:bg-luxury-charcoal-light/60 border-b border-luxury-sand/60 text-[10px] uppercase tracking-[0.2em] font-semibold text-luxury-muted-light">
              <tr>
                <th className="py-4 px-6">Concepto</th>
                <th className="py-4 px-4">Categoría</th>
                <th className="py-4 px-4">Monto (Bs.)</th>
                <th className="py-4 px-4">Método</th>
                <th className="py-4 px-4">Fecha</th>
                <th className="py-4 px-4">Observaciones</th>
                <th className="py-4 px-6 text-right">Acción</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-luxury-sand/40 dark:divide-luxury-charcoal-light/40">
              {filteredExpenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-luxury-sand/15 dark:hover:bg-luxury-charcoal-light/30">
                  <td className="py-4 px-6 font-semibold text-luxury-charcoal dark:text-luxury-ivory">
                    {exp.concept}
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-luxury-sand/40 dark:bg-luxury-charcoal-light text-luxury-charcoal dark:text-luxury-ivory">
                      {exp.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-serif text-sm font-bold text-rose-600 dark:text-rose-400">
                    Bs. {exp.amount.toLocaleString("es-BO")}
                  </td>
                  <td className="py-4 px-4 font-medium text-luxury-muted-light">
                    {exp.paymentMethod}
                  </td>
                  <td className="py-4 px-4 text-luxury-muted-light">
                    {exp.date}
                  </td>
                  <td className="py-4 px-4 text-luxury-muted-light line-clamp-1 max-w-xs font-light">
                    {exp.notes || "—"}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => setDeleteExpense(exp)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors"
                      title="Eliminar egreso"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredExpenses.length === 0 && (
            <div className="p-12 text-center text-luxury-muted-light">
              No hay egresos en la categoría seleccionada.
            </div>
          )}
        </div>

        <div className="p-4 border-t border-luxury-sand/40 bg-luxury-sand/20 dark:bg-luxury-charcoal-light/40 flex justify-between items-center text-xs font-semibold">
          <span>Subtotal Filtrado:</span>
          <span className="text-rose-600 dark:text-rose-400 font-serif text-base">
            Bs. {totalFiltered.toLocaleString("es-BO")}
          </span>
        </div>
      </div>

      {/* Expense Form Modal */}
      <ExpenseFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveExpense}
      />

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={!!deleteExpense}
        title="¿Eliminar Registro de Gasto?"
        message={`¿Deseas retirar el gasto '${deleteExpense?.concept}' por Bs. ${deleteExpense?.amount}?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteExpense(null)}
      />

    </div>
  );
}
