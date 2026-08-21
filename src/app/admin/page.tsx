"use client";

import React, { useState } from "react";
import Link from "next/link";
import { adminStore, AdminProduct, AdminSale } from "@/lib/admin-data";
import { StatCard } from "@/components/admin/StatCard";
import { ChartSales } from "@/components/admin/ChartSales";
import { ChartPaymentMethods } from "@/components/admin/ChartPaymentMethods";
import { ChartCategories } from "@/components/admin/ChartCategories";
import { SaleRecordModal } from "@/components/admin/SaleRecordModal";
import { useToast } from "@/components/admin/Toast";

export default function AdminDashboardPage() {
  const { success } = useToast();
  const [saleModalOpen, setSaleModalOpen] = useState(false);
  const [, setRefresh] = useState(0);

  const kpis = adminStore.getKPIs();
  const monthlyData = adminStore.getMonthlySalesData();
  const paymentStats = adminStore.getPaymentMethodPercentages();
  const categoryStats = adminStore.getCategoryDistribution();
  const lowStockProducts = adminStore.getLowStockAlerts();
  const recentSales = adminStore.getSales().slice(0, 5);
  const activePromos = adminStore.getPromotions().filter((p) => p.isActive);

  const handleSaveSale = (newSaleData: any) => {
    adminStore.createSale(newSaleData);
    setRefresh((r) => r + 1);
    success("Venta registrada con éxito", `Código: ${newSaleData.code || "Completado"} por Bs. ${newSaleData.total}`);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Banner & Quick Sale Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-luxury-sand/40 via-luxury-cream to-luxury-sand/40 dark:from-luxury-charcoal dark:via-luxury-charcoal-light dark:to-luxury-charcoal border border-luxury-sand dark:border-luxury-charcoal-light shadow-sm">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-luxury-gold block mb-1">
            Panel Ejecutivo
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-luxury-charcoal dark:text-luxury-ivory">
            Resumen General de Operaciones
          </h1>
          <p className="text-xs sm:text-sm text-luxury-muted-light dark:text-luxury-muted-dark font-light mt-1">
            Monitoreo en tiempo real de ventas, inventario de marroquinería y flujo de caja en Bolivia.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSaleModalOpen(true)}
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-luxury-gold text-luxury-charcoal-black text-xs font-semibold uppercase tracking-[0.2em] hover:bg-luxury-gold-shimmer shadow-luxury-gold transition-all"
          >
            <span className="text-base font-bold">+</span>
            <span>Nueva Venta</span>
          </button>
        </div>
      </div>

      {/* 6 KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6">
        
        {/* 1. Ventas del Día */}
        <StatCard
          title="Ventas del Día"
          value={`Bs. ${kpis.todayIncome.toLocaleString("es-BO")}`}
          subtitle={`${kpis.todaySalesCount} pedidos hoy (${kpis.todayUnits} u.)`}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />

        {/* 2. Ventas del Mes */}
        <StatCard
          title="Ventas del Mes"
          value={`Bs. ${kpis.monthIncome.toLocaleString("es-BO")}`}
          change="+18.4%"
          isPositive={true}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25" />
            </svg>
          }
        />

        {/* 3. Productos Vendidos */}
        <StatCard
          title="Carteras Vendidas"
          value={`${kpis.totalProductsSold} un.`}
          subtitle="Agosto 2026"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          }
        />

        {/* 4. Ingresos Brutos */}
        <StatCard
          title="Ingresos Brutos"
          value={`Bs. ${kpis.monthIncome.toLocaleString("es-BO")}`}
          change="+24.1%"
          isPositive={true}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />

        {/* 5. Gastos Registrados */}
        <StatCard
          title="Gastos Totales"
          value={`Bs. ${kpis.totalExpenses.toLocaleString("es-BO")}`}
          change="-4.2%"
          isPositive={false}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
            </svg>
          }
        />

        {/* 6. Ganancia Neta */}
        <StatCard
          title="Ganancia Neta"
          value={`Bs. ${kpis.netProfit.toLocaleString("es-BO")}`}
          badge={`Margen ${kpis.profitMargin}%`}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Monthly Sales & Expenses Comparison Chart (8 Cols) */}
        <div className="lg:col-span-8">
          <ChartSales data={monthlyData} />
        </div>

        {/* Payment Methods (QR vs Cash) (4 Cols) */}
        <div className="lg:col-span-4">
          <ChartPaymentMethods data={paymentStats} />
        </div>
      </div>

      {/* Bottom Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Category Sales Share */}
        <div className="lg:col-span-1">
          <ChartCategories data={categoryStats} />
        </div>

        {/* Latest Transactions Table */}
        <div className="lg:col-span-1 rounded-3xl p-6 bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light/70 shadow-luxury-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold font-semibold block">
                  Actividad Reciente
                </span>
                <h3 className="font-serif text-xl text-luxury-charcoal dark:text-luxury-ivory font-normal">
                  Últimas Ventas
                </h3>
              </div>
              <Link
                href="/admin/pagos"
                className="text-xs uppercase tracking-wider text-luxury-gold hover:underline"
              >
                Ver todas →
              </Link>
            </div>

            <div className="space-y-3">
              {recentSales.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light/40 border border-luxury-sand/40 text-xs"
                >
                  <div>
                    <span className="font-semibold text-luxury-charcoal dark:text-luxury-ivory block">
                      {s.code} • {s.customerName}
                    </span>
                    <span className="text-luxury-muted-light dark:text-luxury-muted-dark text-[11px]">
                      {s.customerCity} • {s.items[0]?.productName || "Cartera"}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="font-serif font-bold text-luxury-gold block">
                      Bs. {s.total.toLocaleString("es-BO")}
                    </span>
                    <span className="inline-block px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      {s.paymentMethod}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-luxury-sand/40 dark:border-luxury-charcoal-light/40 text-[11px] text-luxury-muted-light text-center">
            ✦ Total de {adminStore.getSales().length} transacciones registradas este mes
          </div>
        </div>

        {/* Low Stock Alerts & Active Promotions */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Low Stock Alert Box */}
          <div className="rounded-3xl p-6 bg-white dark:bg-luxury-charcoal border border-rose-500/30 shadow-luxury-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-rose-500">⚠️</span>
                <h4 className="font-serif text-lg text-luxury-charcoal dark:text-luxury-ivory font-normal">
                  Poco Stock ({lowStockProducts.length})
                </h4>
              </div>
              <Link
                href="/admin/inventario"
                className="text-[11px] uppercase tracking-wider text-rose-500 hover:underline font-semibold"
              >
                Reabastecer →
              </Link>
            </div>

            <div className="space-y-2">
              {lowStockProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs"
                >
                  <div>
                    <span className="font-medium text-luxury-charcoal dark:text-luxury-ivory block">
                      {p.name}
                    </span>
                    <span className="text-[10px] text-luxury-muted-light">
                      Cat: {p.category}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-rose-600 text-white font-bold text-[10px]">
                    {p.stock} u.
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Promotions Widget */}
          <div className="rounded-3xl p-6 bg-white dark:bg-luxury-charcoal border border-luxury-gold/30 shadow-luxury-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-luxury-gold">✨</span>
                <h4 className="font-serif text-lg text-luxury-charcoal dark:text-luxury-ivory font-normal">
                  Promociones Activas
                </h4>
              </div>
              <Link
                href="/admin/promociones"
                className="text-[11px] uppercase tracking-wider text-luxury-gold hover:underline font-semibold"
              >
                Gestionar →
              </Link>
            </div>

            <div className="space-y-2">
              {activePromos.map((pr) => (
                <div
                  key={pr.id}
                  className="p-3 rounded-2xl bg-luxury-gold/10 border border-luxury-gold/25 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-luxury-charcoal dark:text-luxury-ivory">
                      {pr.name}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-luxury-gold text-luxury-charcoal-black uppercase">
                      {pr.type}
                    </span>
                  </div>
                  <p className="text-[11px] text-luxury-muted-light dark:text-luxury-muted-dark mt-1 line-clamp-1">
                    {pr.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* New Sale Modal */}
      <SaleRecordModal
        isOpen={saleModalOpen}
        onClose={() => setSaleModalOpen(false)}
        onSave={handleSaveSale}
      />

    </div>
  );
}
