"use client";

import React, { useState } from "react";
import { useToast } from "@/components/admin/Toast";

export default function AdminConfiguracionPage() {
  const { success } = useToast();

  const [storeName, setStoreName] = useState("Bela Bolsa - Haute Maroquinerie");
  const [currency, setCurrency] = useState("Bs. (Boliviano)");
  const [taxId, setTaxId] = useState("1029384021");
  const [companyName, setCompanyName] = useState("BELA BOLSA S.R.L.");
  const [address, setAddress] = useState("Av. San Martín esq. Calle 4, Equipetrol, Santa Cruz - Bolivia");
  const [email, setEmail] = useState("contacto@belabolsa.bo");
  const [stockAlertThreshold, setStockAlertThreshold] = useState(3);
  const [allowWholesale, setAllowWholesale] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    success("Configuración Guardada", "Los parámetros del sistema fueron actualizados con éxito.");
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light shadow-luxury-sm">
        <span className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold font-semibold block mb-1">
          Ajustes del Sistema
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl text-luxury-charcoal dark:text-luxury-ivory font-normal">
          Configuración General de la Tienda
        </h1>
        <p className="text-xs sm:text-sm text-luxury-muted-light dark:text-luxury-muted-dark font-light mt-1">
          Parámetros de facturación, moneda nacional, alertas de inventario y datos corporativos.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* General Store Parameters */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light shadow-luxury-sm space-y-4">
          <h3 className="font-serif text-lg text-luxury-charcoal dark:text-luxury-ivory font-medium pb-3 border-b border-luxury-sand/60">
            Identidad & Moneda
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                Nombre Comercial de la Marca
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs text-luxury-charcoal dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                Moneda del Sistema
              </label>
              <input
                type="text"
                disabled
                value={currency}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-luxury-sand/40 dark:bg-luxury-charcoal-light/40 border border-luxury-sand text-xs text-luxury-muted-light font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                Umbral de Alerta de Poco Stock
              </label>
              <input
                type="number"
                min={1}
                value={stockAlertThreshold}
                onChange={(e) => setStockAlertThreshold(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs text-luxury-charcoal dark:text-white"
              />
              <span className="text-[10px] text-luxury-muted-light mt-0.5 block">
                Notifica automáticamente cuando el stock sea menor o igual a este valor.
              </span>
            </div>

            <div className="flex flex-col justify-center pt-2">
              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowWholesale}
                  onChange={(e) => setAllowWholesale(e.target.checked)}
                  className="rounded text-luxury-gold focus:ring-luxury-gold"
                />
                <span className="text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory">
                  Habilitar Venta Mayorista para Boutiques
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Legal & Fiscal Data in Bolivia */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light shadow-luxury-sm space-y-4">
          <h3 className="font-serif text-lg text-luxury-charcoal dark:text-luxury-ivory font-medium pb-3 border-b border-luxury-sand/60">
            Datos Fiscales & Ubicación en Bolivia
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                Razón Social
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs text-luxury-charcoal dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                NIT (Número de Identificación Tributaria)
              </label>
              <input
                type="text"
                value={taxId}
                onChange={(e) => setTaxId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs text-luxury-charcoal dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                Dirección Showroom Principal
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs text-luxury-charcoal dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                Correo Electrónico de Contacto
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs text-luxury-charcoal dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3.5 rounded-full bg-luxury-gold text-luxury-charcoal-black text-xs font-semibold uppercase tracking-[0.2em] hover:bg-luxury-gold-shimmer shadow-luxury-gold transition-all"
          >
            Guardar Cambios
          </button>
        </div>

      </form>

    </div>
  );
}
