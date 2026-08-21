"use client";

import React, { useState } from "react";
import { adminStore } from "@/lib/admin-data";
import { getWhatsAppLink } from "@/lib/whatsapp";

export default function AdminMayoristasPage() {
  const products = adminStore.getProducts();

  // Interactive Wholesale Calculator
  const [selectedProduct, setSelectedProduct] = useState(products[0]?.id || "");
  const [quantity, setQuantity] = useState<number>(10);
  const [customerBoutique, setCustomerBoutique] = useState("Boutique Elegance (Santa Cruz)");

  const currentProd = products.find((p) => p.id === selectedProduct) || products[0];

  // Dynamic Tier Calculation
  const calculateWholesalePrice = (basePrice: number, qty: number) => {
    if (qty >= 20) return Math.round(basePrice * 0.65); // 35% discount
    if (qty >= 10) return Math.round(basePrice * 0.72); // 28% discount
    if (qty >= 5) return Math.round(basePrice * 0.80);  // 20% discount
    return basePrice;
  };

  const unitWholesale = currentProd ? calculateWholesalePrice(currentProd.price, quantity) : 0;
  const totalWholesale = unitWholesale * quantity;
  const normalTotal = currentProd ? currentProd.price * quantity : 0;
  const totalSavings = normalTotal - totalWholesale;

  const quoteMessage = `Hola ${customerBoutique}, le compartimos la cotización oficial de Bela Bolsa para ${quantity} unidades del modelo ${currentProd?.name}:\n\n` +
    `• Precio Unitario Mayorista: Bs. ${unitWholesale}\n` +
    `• Total del Pedido: Bs. ${totalWholesale}\n` +
    `• Ahorro Mayorista: Bs. ${totalSavings} (-${Math.round((totalSavings / normalTotal) * 100)}%)\n` +
    `• Incluye: Cajas de lujo, certificados y envío express asegurado a su boutique.`;

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light shadow-luxury-sm">
        <span className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold font-semibold block mb-1">
          B2B & Boutiques
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl text-luxury-charcoal dark:text-luxury-ivory font-normal">
          Escalas Mayoristas & Cotizador Automático
        </h1>
        <p className="text-xs sm:text-sm text-luxury-muted-light dark:text-luxury-muted-dark font-light mt-1">
          Configuración de niveles de descuento por volumen (5u, 10u, 20u) y cotizaciones inmediatas para boutiques.
        </p>
      </div>

      {/* Calculator and Tier Table Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Wholesale Interactive Calculator (7 Cols) */}
        <div className="lg:col-span-7 rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-luxury-sand/30 via-white to-luxury-sand/20 dark:from-luxury-charcoal dark:via-luxury-charcoal-light dark:to-luxury-charcoal border border-luxury-gold/30 shadow-luxury-sm space-y-6">
          <div className="flex items-center space-x-2">
            <span className="text-luxury-gold text-xl">🧮</span>
            <h3 className="font-serif text-xl text-luxury-charcoal dark:text-luxury-ivory font-normal">
              Generador de Cotización Mayorista
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                Nombre de la Boutique / Cliente Mayorista
              </label>
              <input
                type="text"
                value={customerBoutique}
                onChange={(e) => setCustomerBoutique(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-white dark:bg-luxury-charcoal border border-luxury-sand text-xs text-luxury-charcoal dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                  Modelo de Cartera
                </label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-white dark:bg-luxury-charcoal border border-luxury-sand text-xs font-medium"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (P. Normal: Bs. {p.price})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                  Cantidad de Unidades
                </label>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-white dark:bg-luxury-charcoal border border-luxury-sand text-xs font-bold text-luxury-gold"
                />
              </div>
            </div>

            {/* Live Calculation Results Card */}
            <div className="p-5 rounded-2xl bg-luxury-gold/10 border border-luxury-gold/30 space-y-3">
              <div className="flex justify-between items-baseline text-xs">
                <span className="text-luxury-muted-light dark:text-luxury-muted-dark">Precio Minorista Regular:</span>
                <span className="line-through text-luxury-muted-light">Bs. {normalTotal.toLocaleString("es-BO")}</span>
              </div>
              <div className="flex justify-between items-baseline text-xs">
                <span className="text-luxury-charcoal dark:text-luxury-ivory font-medium">Precio Unitario Mayorista ({quantity} u.):</span>
                <span className="font-serif text-lg font-bold text-luxury-gold">Bs. {unitWholesale.toLocaleString("es-BO")} / u.</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-luxury-gold/20">
                <span className="text-xs uppercase tracking-wider font-bold text-luxury-charcoal dark:text-luxury-ivory">Total Cotización:</span>
                <span className="font-serif text-2xl font-bold text-luxury-charcoal dark:text-luxury-ivory">
                  Bs. {totalWholesale.toLocaleString("es-BO")}
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                <span>Ahorro para la Boutique:</span>
                <span>Bs. {totalSavings.toLocaleString("es-BO")} ({Math.round((totalSavings / normalTotal) * 100)}% de margen)</span>
              </div>
            </div>

            {/* Direct Send Quote via WhatsApp */}
            <a
              href={getWhatsAppLink(quoteMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md"
            >
              <span>📲 Enviar Cotización por WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Wholesale Tiers Overview Table (5 Cols) */}
        <div className="lg:col-span-5 rounded-3xl p-6 sm:p-8 bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light shadow-luxury-sm flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-xl text-luxury-charcoal dark:text-luxury-ivory font-normal mb-4">
              Escalas de Descuento por Volumen
            </h3>
            <p className="text-xs text-luxury-muted-light dark:text-luxury-muted-dark font-light mb-6">
              Reglas aplicadas automáticamente para pedidos mayoristas de tiendas asociadas en Bolivia.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-xs text-luxury-charcoal dark:text-luxury-ivory uppercase tracking-wider">
                    Nivel Inicial: 5 a 9 unidades
                  </h4>
                  <span className="text-[11px] text-luxury-muted-light font-light">Ideal para boutiques boutique pequeñas</span>
                </div>
                <span className="font-serif text-base font-bold text-luxury-gold">20% OFF</span>
              </div>

              <div className="p-4 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-gold/40 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-xs text-luxury-charcoal dark:text-luxury-ivory uppercase tracking-wider">
                    Nivel VIP: 10 a 19 unidades
                  </h4>
                  <span className="text-[11px] text-luxury-muted-light font-light">Para tiendas multimarca departamentales</span>
                </div>
                <span className="font-serif text-base font-bold text-luxury-gold">28% OFF</span>
              </div>

              <div className="p-4 rounded-2xl bg-luxury-gold/15 dark:bg-luxury-gold/20 border border-luxury-gold flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-xs text-luxury-charcoal dark:text-luxury-ivory uppercase tracking-wider">
                    Nivel Master: 20+ unidades
                  </h4>
                  <span className="text-[11px] text-luxury-muted-light font-light">Distribuidores oficiales en Bolivia</span>
                </div>
                <span className="font-serif text-base font-bold text-luxury-gold">35% OFF</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-luxury-sand/40 text-xs text-luxury-muted-light text-center">
            ✦ Todas las compras mayoristas incluyen material promocional de alta gama.
          </div>
        </div>

      </div>

    </div>
  );
}
