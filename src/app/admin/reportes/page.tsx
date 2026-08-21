"use client";

import React, { useState } from "react";
import { adminStore } from "@/lib/admin-data";
import { exportToCSV, printReportSection } from "@/lib/export-utils";
import { useToast } from "@/components/admin/Toast";

export default function AdminReportesPage() {
  const { success } = useToast();

  const [dateRange, setDateRange] = useState("ESTE_MES");
  const [reportType, setReportType] = useState("VENTAS");

  const sales = adminStore.getSales();
  const expenses = adminStore.getExpenses();
  const products = adminStore.getProducts();
  const coupons = adminStore.getCoupons();
  const kpis = adminStore.getKPIs();

  // Export functions
  const handleExportExcel = () => {
    if (reportType === "VENTAS") {
      const rows = sales.map((s) => ({
        "Código Venta": s.code,
        "Fecha": s.createdAt.slice(0, 10),
        "Cliente": s.customerName,
        "Teléfono": s.customerPhone,
        "Ciudad": s.customerCity,
        "Método Pago": s.paymentMethod,
        "Subtotal (Bs)": s.subtotal,
        "Descuento (Bs)": s.discountAmount,
        "Total (Bs)": s.total,
        "Estado": s.status,
      }));
      exportToCSV("Reporte_Ventas_BelaBolsa", rows);
    } else if (reportType === "GASTOS") {
      const rows = expenses.map((e) => ({
        "ID": e.id,
        "Fecha": e.date,
        "Concepto": e.concept,
        "Categoría": e.category,
        "Monto (Bs)": e.amount,
        "Método Pago": e.paymentMethod,
        "Notas": e.notes || "",
      }));
      exportToCSV("Reporte_Gastos_BelaBolsa", rows);
    } else if (reportType === "INVENTARIO") {
      const rows = products.map((p) => ({
        "ID": p.id,
        "Modelo": p.name,
        "Categoría": p.category,
        "Costo Prod (Bs)": p.costPrice,
        "Precio Venta (Bs)": p.price,
        "Precio Mayorista (Bs)": p.wholesalePrice,
        "Stock": p.stock,
        "Estado": p.status,
      }));
      exportToCSV("Reporte_Inventario_BelaBolsa", rows);
    } else if (reportType === "CUPONES") {
      const rows = coupons.map((c) => ({
        "Código": c.code,
        "Tipo": c.type,
        "Valor": c.value,
        "Compra Mínima": c.minPurchase,
        "Usos Realizados": c.usedCount,
        "Límite": c.usageLimit,
        "Vigencia Fin": c.endDate,
        "Estado": c.isActive ? "Activo" : "Inactivo",
      }));
      exportToCSV("Reporte_Cupones_BelaBolsa", rows);
    }
    success("Reporte Exportado", "Se generó y descargó el archivo Excel / CSV exitosamente.");
  };

  const handlePrintPDF = () => {
    printReportSection("Reporte_Oficial_Bela_Bolsa");
  };

  return (
    <div className="space-y-6 animate-fade-in print:p-0">
      
      {/* Header (Hidden on print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light shadow-luxury-sm print:hidden">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold font-semibold block mb-1">
            Auditoría & BI
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-luxury-charcoal dark:text-luxury-ivory font-normal">
            Generador de Reportes Oficiales
          </h1>
          <p className="text-xs sm:text-sm text-luxury-muted-light dark:text-luxury-muted-dark font-light mt-1">
            Exporta balances ejecutivos, ventas, egresos e inventario a formatos Excel (.CSV) y PDF imprimible.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportExcel}
            className="inline-flex items-center space-x-2 px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-all"
          >
            <span>📊 Descargar Excel</span>
          </button>
          <button
            onClick={handlePrintPDF}
            className="inline-flex items-center space-x-2 px-5 py-3 rounded-full bg-luxury-gold hover:bg-luxury-gold-shimmer text-luxury-charcoal-black text-xs font-semibold uppercase tracking-wider shadow-luxury-gold transition-all"
          >
            <span>🖨️ Imprimir PDF</span>
          </button>
        </div>
      </div>

      {/* Filter Selector Bar (Hidden on print) */}
      <div className="p-5 rounded-3xl bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light shadow-luxury-sm flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-luxury-muted-light font-semibold mb-1">
              Tipo de Reporte:
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="px-3.5 py-2 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs font-semibold text-luxury-charcoal dark:text-white"
            >
              <option value="VENTAS">Reporte de Ventas & Facturación</option>
              <option value="GASTOS">Reporte de Gastos & Compras</option>
              <option value="INVENTARIO">Reporte de Existencias & Valor de Almacén</option>
              <option value="CUPONES">Reporte de Cupones & Promociones Canjeadas</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-luxury-muted-light font-semibold mb-1">
              Rango de Tiempo:
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3.5 py-2 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs font-medium"
            >
              <option value="HOY">Hoy (Ventas del día)</option>
              <option value="ESTA_SEMANA">Últimos 7 días</option>
              <option value="ESTE_MES">Mes Actual (Agosto 2026)</option>
              <option value="HISTORICO">Histórico Completo</option>
            </select>
          </div>
        </div>

        <div className="text-xs text-luxury-muted-light">
          ✦ Mostrando datos consolidados para la tienda Bela Bolsa Bolivia
        </div>
      </div>

      {/* Printable Report Document Card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light shadow-luxury-md print:border-none print:shadow-none print:p-0">
        
        {/* Document Header */}
        <div className="flex items-center justify-between pb-6 border-b border-luxury-sand dark:border-luxury-charcoal-light mb-8">
          <div>
            <span className="font-serif text-2xl font-bold tracking-widest text-luxury-charcoal dark:text-luxury-ivory block">
              BELA BOLSA S.R.L.
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold block">
              Haute Maroquinerie Bolivienne • NIT: 1029384021
            </span>
            <span className="text-xs text-luxury-muted-light mt-1 block">
              Equipetrol, Santa Cruz de la Sierra - Bolivia
            </span>
          </div>

          <div className="text-right">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-luxury-gold/15 text-luxury-gold inline-block mb-1">
              Documento Oficial
            </span>
            <h3 className="font-serif text-lg text-luxury-charcoal dark:text-luxury-ivory">
              {reportType === "VENTAS" && "Balance de Ventas & Facturación"}
              {reportType === "GASTOS" && "Auditoría de Egresos & Compras"}
              {reportType === "INVENTARIO" && "Valorización Física de Inventario"}
              {reportType === "CUPONES" && "Informe de Cupones & Descuentos"}
            </h3>
            <span className="text-[11px] text-luxury-muted-light block">
              Generado: {new Date().toLocaleDateString("es-BO")} {new Date().toLocaleTimeString("es-BO")}
            </span>
          </div>
        </div>

        {/* Executive Summary Metrics Box */}
        <div className="grid grid-cols-4 gap-4 p-5 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light/40 border border-luxury-sand/60 mb-8">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-luxury-muted-light font-semibold block">Total Facturado</span>
            <span className="font-serif text-xl font-bold text-luxury-gold">Bs. {kpis.monthIncome.toLocaleString("es-BO")}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-luxury-muted-light font-semibold block">Total Gastos</span>
            <span className="font-serif text-xl font-bold text-rose-600">Bs. {kpis.totalExpenses.toLocaleString("es-BO")}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-luxury-muted-light font-semibold block">Ganancia Neta</span>
            <span className="font-serif text-xl font-bold text-emerald-600">Bs. {kpis.netProfit.toLocaleString("es-BO")}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-luxury-muted-light font-semibold block">Margen Neto</span>
            <span className="font-serif text-xl font-bold text-luxury-charcoal dark:text-luxury-ivory">{kpis.profitMargin}%</span>
          </div>
        </div>

        {/* Dynamic Table Content according to reportType */}
        {reportType === "VENTAS" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-luxury-sand/30 dark:bg-luxury-charcoal-light/60 border-y border-luxury-sand text-[10px] uppercase tracking-wider text-luxury-muted-light">
                <tr>
                  <th className="py-3 px-4">Código</th>
                  <th className="py-3 px-4">Fecha</th>
                  <th className="py-3 px-4">Clienta</th>
                  <th className="py-3 px-4">Ciudad</th>
                  <th className="py-3 px-4">Método</th>
                  <th className="py-3 px-4 text-right">Total (Bs.)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-sand/40">
                {sales.map((s) => (
                  <tr key={s.id}>
                    <td className="py-3 px-4 font-mono font-semibold">{s.code}</td>
                    <td className="py-3 px-4 text-luxury-muted-light">{s.createdAt.slice(0, 10)}</td>
                    <td className="py-3 px-4 font-medium text-luxury-charcoal dark:text-luxury-ivory">{s.customerName}</td>
                    <td className="py-3 px-4 text-luxury-muted-light">{s.customerCity}</td>
                    <td className="py-3 px-4">{s.paymentMethod}</td>
                    <td className="py-3 px-4 text-right font-serif font-bold text-luxury-gold">
                      Bs. {s.total.toLocaleString("es-BO")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {reportType === "GASTOS" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-luxury-sand/30 dark:bg-luxury-charcoal-light/60 border-y border-luxury-sand text-[10px] uppercase tracking-wider text-luxury-muted-light">
                <tr>
                  <th className="py-3 px-4">Fecha</th>
                  <th className="py-3 px-4">Concepto</th>
                  <th className="py-3 px-4">Categoría</th>
                  <th className="py-3 px-4">Método</th>
                  <th className="py-3 px-4 text-right">Monto (Bs.)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-sand/40">
                {expenses.map((e) => (
                  <tr key={e.id}>
                    <td className="py-3 px-4 text-luxury-muted-light">{e.date}</td>
                    <td className="py-3 px-4 font-medium text-luxury-charcoal dark:text-luxury-ivory">{e.concept}</td>
                    <td className="py-3 px-4">{e.category}</td>
                    <td className="py-3 px-4">{e.paymentMethod}</td>
                    <td className="py-3 px-4 text-right font-serif font-bold text-rose-600">
                      Bs. {e.amount.toLocaleString("es-BO")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {reportType === "INVENTARIO" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-luxury-sand/30 dark:bg-luxury-charcoal-light/60 border-y border-luxury-sand text-[10px] uppercase tracking-wider text-luxury-muted-light">
                <tr>
                  <th className="py-3 px-4">Modelo</th>
                  <th className="py-3 px-4">Categoría</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4">Costo Unit.</th>
                  <th className="py-3 px-4">Precio Venta</th>
                  <th className="py-3 px-4 text-right">Valor Total Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-sand/40">
                {products.map((p) => (
                  <tr key={p.id}>
                    <td className="py-3 px-4 font-serif font-medium">{p.name}</td>
                    <td className="py-3 px-4 text-luxury-muted-light">{p.category}</td>
                    <td className="py-3 px-4 font-bold">{p.stock} un.</td>
                    <td className="py-3 px-4">Bs. {p.costPrice}</td>
                    <td className="py-3 px-4">Bs. {p.price}</td>
                    <td className="py-3 px-4 text-right font-serif font-bold text-luxury-gold">
                      Bs. {(p.stock * p.price).toLocaleString("es-BO")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Document Footer */}
        <div className="pt-8 mt-8 border-t border-luxury-sand/60 flex justify-between text-[11px] text-luxury-muted-light">
          <span>Emitido por: Sistema de Administración Bela Bolsa</span>
          <span>Página 1 de 1</span>
        </div>

      </div>

    </div>
  );
}
