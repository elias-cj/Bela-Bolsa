"use client";

import React, { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AdminGlobalSearch } from "./AdminGlobalSearch";
import { adminStore } from "@/lib/admin-data";
import Link from "next/link";

interface AdminHeaderProps {
  onOpenMobileSidebar: () => void;
}

export function AdminHeader({ onOpenMobileSidebar }: AdminHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const lowStock = adminStore.getLowStockAlerts();
  const sales = adminStore.getSales().slice(0, 3);

  const todayFormatted = new Intl.DateTimeFormat("es-BO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <>
      <header className="sticky top-0 z-30 h-20 bg-white/80 dark:bg-[#0E0E10]/80 backdrop-blur-xl border-b border-luxury-sand/80 dark:border-luxury-charcoal-light px-4 sm:px-8 flex items-center justify-between transition-colors">
        
        {/* Left Side: Mobile Menu Trigger & Search Bar */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 rounded-xl text-luxury-charcoal dark:text-luxury-ivory hover:bg-luxury-sand/40 dark:hover:bg-luxury-charcoal-light"
            aria-label="Abrir menú lateral"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Search Trigger Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center space-x-3 px-4 py-2 rounded-full bg-luxury-sand/30 dark:bg-luxury-charcoal-light/50 border border-luxury-sand dark:border-luxury-charcoal-light hover:border-luxury-gold/50 text-luxury-muted-light dark:text-luxury-muted-dark hover:text-luxury-charcoal dark:hover:text-white transition-all text-xs w-48 sm:w-64 md:w-80 justify-between group shadow-sm"
          >
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-luxury-gold flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <span className="truncate">Buscar en el sistema...</span>
            </div>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono bg-white dark:bg-luxury-charcoal border border-luxury-sand/60 dark:border-luxury-charcoal text-luxury-muted-light dark:text-luxury-muted-dark">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Side: Date, Theme, Notifications & User */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          
          {/* Live Date Label (Desktop) */}
          <div className="hidden xl:flex flex-col text-right">
            <span className="text-[11px] uppercase tracking-wider text-luxury-gold font-semibold capitalize">
              {todayFormatted}
            </span>
            <span className="text-[10px] text-luxury-muted-light dark:text-luxury-muted-dark">
              Santa Cruz, Bolivia (GMT-4)
            </span>
          </div>

          {/* Theme Switcher */}
          <ThemeToggle />

          {/* Notifications Bell with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2.5 rounded-full border border-luxury-sand dark:border-luxury-charcoal-light bg-white dark:bg-luxury-charcoal hover:bg-luxury-sand/30 text-luxury-charcoal dark:text-luxury-ivory transition-colors"
              aria-label="Ver notificaciones"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>

              {lowStock.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-luxury-charcoal animate-pulse" />
              )}
            </button>

            {/* Notifications Panel */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-3xl bg-white dark:bg-luxury-charcoal border border-luxury-sand dark:border-luxury-charcoal-light shadow-2xl p-5 z-50 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-luxury-sand/60 dark:border-luxury-charcoal-light/60">
                  <h4 className="font-serif text-base text-luxury-charcoal dark:text-luxury-ivory font-normal">
                    Centro de Alertas
                  </h4>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-luxury-gold">
                    {lowStock.length} críticas
                  </span>
                </div>

                <div className="divide-y divide-luxury-sand/40 dark:divide-luxury-charcoal-light/40 max-h-72 overflow-y-auto py-2 space-y-2">
                  {lowStock.map((prod) => (
                    <Link
                      key={prod.id}
                      href="/admin/inventario"
                      onClick={() => setNotificationsOpen(false)}
                      className="flex items-start space-x-3 p-2 rounded-xl hover:bg-luxury-sand/30 dark:hover:bg-luxury-charcoal-light transition-colors"
                    >
                      <span className="text-rose-500 text-base mt-0.5">⚠️</span>
                      <div className="flex-grow text-xs">
                        <span className="font-semibold text-luxury-charcoal dark:text-luxury-ivory block">
                          Stock Crítico: {prod.name}
                        </span>
                        <span className="text-luxury-muted-light dark:text-luxury-muted-dark block text-[11px]">
                          Solo quedan <strong>{prod.stock} unidades</strong> (Mínimo: {prod.minStockAlert})
                        </span>
                      </div>
                    </Link>
                  ))}

                  {sales.map((s) => (
                    <Link
                      key={s.id}
                      href="/admin/pagos"
                      onClick={() => setNotificationsOpen(false)}
                      className="flex items-start space-x-3 p-2 rounded-xl hover:bg-luxury-sand/30 dark:hover:bg-luxury-charcoal-light transition-colors"
                    >
                      <span className="text-emerald-500 text-base mt-0.5">💰</span>
                      <div className="flex-grow text-xs">
                        <span className="font-semibold text-luxury-charcoal dark:text-luxury-ivory block">
                          Venta {s.code}: Bs. {s.total}
                        </span>
                        <span className="text-luxury-muted-light dark:text-luxury-muted-dark block text-[11px]">
                          Cliente: {s.customerName} ({s.customerCity})
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Admin User Profile */}
          <div className="flex items-center space-x-3 pl-2 sm:pl-3 border-l border-luxury-sand/60 dark:border-luxury-charcoal-light/60">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-luxury-gold to-luxury-gold-shimmer text-luxury-charcoal-black font-semibold flex items-center justify-center shadow-sm text-xs border border-luxury-gold/40">
              AD
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-semibold text-luxury-charcoal dark:text-luxury-ivory leading-tight">
                Directora General
              </span>
              <span className="text-[10px] text-luxury-gold font-medium uppercase tracking-wider">
                Admin Master
              </span>
            </div>
          </div>

        </div>
      </header>

      {/* Global Spotlight Search Modal */}
      <AdminGlobalSearch
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
