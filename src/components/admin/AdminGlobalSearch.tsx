"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { adminStore } from "@/lib/admin-data";

interface AdminGlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminGlobalSearch({ isOpen, onClose }: AdminGlobalSearchProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const products = adminStore.getProducts();
  const sales = adminStore.getSales();

  const pages = [
    { title: "Dashboard", subtitle: "Métricas principales y KPIs", href: "/admin", icon: "📊" },
    { title: "Publicaciones & Catálogo", subtitle: "Gestión de productos y stock", href: "/admin/publicaciones", icon: "👜" },
    { title: "Gestión de Precios", subtitle: "Ajuste individual y masivo", href: "/admin/precios", icon: "🏷️" },
    { title: "Promociones & 2x1", subtitle: "Reglas de descuento y combos", href: "/admin/promociones", icon: "✨" },
    { title: "Descuentos", subtitle: "Descuentos por categoría", href: "/admin/descuentos", icon: "🔖" },
    { title: "Venta al por Mayor", subtitle: "Escalas de volumen y cotizador", href: "/admin/mayoristas", icon: "🏢" },
    { title: "Control de Inventario", subtitle: "Alertas de stock y existencias", href: "/admin/inventario", icon: "📦" },
    { title: "Compras y Gastos", subtitle: "Egresos y balances contables", href: "/admin/gastos", icon: "💸" },
    { title: "Reportes & Exportar", subtitle: "Reportes en Excel y PDF", href: "/admin/reportes", icon: "📈" },
    { title: "Pagos & Caja (QR / Efectivo)", subtitle: "Registro de transacciones", href: "/admin/pagos", icon: "💳" },
    { title: "Redes Sociales & WhatsApp", subtitle: "Configuración de canales", href: "/admin/redes", icon: "💬" },
    { title: "Cupones de Descuento", subtitle: "Códigos promocionales", href: "/admin/cupones", icon: "🎟️" },
    { title: "Configuración", subtitle: "Ajustes de la tienda", href: "/admin/configuracion", icon: "⚙️" },
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredPages = pages.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProducts = products.filter(
    (prod) =>
      prod.name.toLowerCase().includes(query.toLowerCase()) ||
      prod.category.toLowerCase().includes(query.toLowerCase()) ||
      prod.tag?.toLowerCase().includes(query.toLowerCase())
  );

  const filteredSales = sales.filter(
    (s) =>
      s.code.toLowerCase().includes(query.toLowerCase()) ||
      s.customerName.toLowerCase().includes(query.toLowerCase()) ||
      s.customerCity.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (href: string) => {
    router.push(href);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-luxury-charcoal rounded-3xl border border-luxury-sand dark:border-luxury-charcoal-light shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-6 py-4 border-b border-luxury-sand/60 dark:border-luxury-charcoal-light/60">
          <svg className="w-5 h-5 text-luxury-gold mr-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar módulo, cartera, cliente, venta o código..."
            className="w-full bg-transparent border-none text-luxury-charcoal dark:text-luxury-ivory text-sm focus:outline-none placeholder-luxury-muted-light dark:placeholder-luxury-muted-dark"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-luxury-sand/50 dark:bg-luxury-charcoal-light text-luxury-muted-light dark:text-luxury-muted-dark border border-luxury-sand dark:border-luxury-charcoal-light">
            ESC
          </kbd>
        </div>

        {/* Results Body */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          
          {/* Módulos */}
          {filteredPages.length > 0 && (
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-luxury-muted-light dark:text-luxury-muted-dark px-3 block mb-1">
                Módulos del Sistema
              </span>
              <div className="space-y-1">
                {filteredPages.map((page) => (
                  <button
                    key={page.href}
                    onClick={() => handleSelect(page.href)}
                    className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-luxury-sand/40 dark:hover:bg-luxury-charcoal-light transition-colors text-left group"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{page.icon}</span>
                      <div>
                        <h4 className="text-xs font-semibold text-luxury-charcoal dark:text-luxury-ivory group-hover:text-luxury-gold transition-colors">
                          {page.title}
                        </h4>
                        <p className="text-[11px] text-luxury-muted-light dark:text-luxury-muted-dark">
                          {page.subtitle}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-luxury-gold opacity-0 group-hover:opacity-100 transition-opacity">
                      Abrir →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Carteras / Productos */}
          {filteredProducts.length > 0 && (
            <div className="pt-2 border-t border-luxury-sand/40 dark:border-luxury-charcoal-light/40">
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-luxury-muted-light dark:text-luxury-muted-dark px-3 block mb-1">
                Carteras & Catálogo
              </span>
              <div className="space-y-1">
                {filteredProducts.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => handleSelect("/admin/publicaciones")}
                    className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-luxury-sand/40 dark:hover:bg-luxury-charcoal-light transition-colors text-left group"
                  >
                    <div>
                      <h4 className="text-xs font-semibold text-luxury-charcoal dark:text-luxury-ivory group-hover:text-luxury-gold">
                        {prod.name}
                      </h4>
                      <p className="text-[11px] text-luxury-muted-light dark:text-luxury-muted-dark">
                        {prod.category} • Stock: {prod.stock} u. • Precio: Bs. {prod.price}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-luxury-gold">
                      Bs. {prod.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Ventas */}
          {filteredSales.length > 0 && (
            <div className="pt-2 border-t border-luxury-sand/40 dark:border-luxury-charcoal-light/40">
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-luxury-muted-light dark:text-luxury-muted-dark px-3 block mb-1">
                Transacciones Recientes
              </span>
              <div className="space-y-1">
                {filteredSales.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSelect("/admin/pagos")}
                    className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-luxury-sand/40 dark:hover:bg-luxury-charcoal-light transition-colors text-left group"
                  >
                    <div>
                      <h4 className="text-xs font-semibold text-luxury-charcoal dark:text-luxury-ivory group-hover:text-luxury-gold">
                        {s.code} - {s.customerName}
                      </h4>
                      <p className="text-[11px] text-luxury-muted-light dark:text-luxury-muted-dark">
                        {s.customerCity} • Pago: {s.paymentMethod}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      Bs. {s.total}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredPages.length === 0 && filteredProducts.length === 0 && filteredSales.length === 0 && (
            <div className="p-8 text-center text-luxury-muted-light dark:text-luxury-muted-dark text-xs">
              No se encontraron resultados para "{query}"
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
