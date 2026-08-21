"use client";

import React, { useState } from "react";
import { PRODUCTS, Product } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { ProductDetailModal } from "./ProductDetailModal";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function FeaturedCollection() {
  const [activeCategory, setActiveCategory] = useState<string>("Todas");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalColor, setModalColor] = useState<string>("");

  const categories = ["Todas", "Elegantes", "Casual", "Edición Premium"];

  const filteredProducts =
    activeCategory === "Todas"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleQuickView = (product: Product, colorName: string) => {
    setSelectedProduct(product);
    setModalColor(colorName);
  };

  return (
    <section id="coleccion" className="py-14 sm:py-24 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-luxury-gold/30 bg-luxury-gold/10 dark:bg-luxury-gold/15 mb-3 sm:mb-4">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] font-semibold text-luxury-gold-dark dark:text-luxury-gold">
              Selección de Autor
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal text-luxury-charcoal dark:text-luxury-ivory tracking-tight">
            Colección Destacada
          </h2>

          <p className="mt-2 sm:mt-4 text-xs sm:text-base text-luxury-charcoal/70 dark:text-luxury-ivory/70 font-light leading-relaxed">
            Nueve creaciones emblemáticas confeccionadas con meticuloso rigor artesanal, cueros de textura sublime y proporciones impecables.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 mt-5 sm:mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.18em] transition-all duration-300 font-medium ${
                  activeCategory === cat
                    ? "bg-luxury-charcoal text-white dark:bg-luxury-gold dark:text-luxury-charcoal-black shadow-md scale-102 sm:scale-105"
                    : "bg-luxury-sand/50 dark:bg-luxury-charcoal-light/50 text-luxury-charcoal/80 dark:text-luxury-ivory/80 hover:bg-luxury-gold/20 hover:text-luxury-gold"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 9 Products Grid (2 cols on mobile, 4 on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={handleQuickView}
            />
          ))}
        </div>

        {/* Bottom Direct Concierge Banner */}
        <div className="mt-10 sm:mt-16 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-luxury-sand/40 via-luxury-cream to-luxury-sand/40 dark:from-luxury-charcoal dark:via-luxury-charcoal-light dark:to-luxury-charcoal border border-luxury-sand dark:border-luxury-charcoal-light text-center flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 shadow-sm">
          <div className="text-left">
            <h4 className="font-serif text-lg sm:text-2xl text-luxury-charcoal dark:text-luxury-ivory">
              ¿Buscas una personalización o tono a medida?
            </h4>
            <p className="text-xs sm:text-sm text-luxury-charcoal/70 dark:text-luxury-ivory/70 mt-1 font-light">
              Nuestras asesoras de alta marroquinería te guiarán con fotos en tiempo real y disponibilidad exclusiva.
            </p>
          </div>

          <a
            href={getWhatsAppLink("Hola, deseo solicitar una asesoría personalizada para elegir mi cartera Bela Bolsa.")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-luxury-charcoal dark:bg-luxury-gold text-white dark:text-luxury-charcoal-black text-xs font-semibold uppercase tracking-[0.18em] sm:tracking-[0.2em] hover:bg-luxury-gold hover:text-white transition-all shadow-md"
          >
            <span>Consultar con Asesora</span>
            <span>→</span>
          </a>
        </div>

      </div>

      {/* Quick View Modal */}
      <ProductDetailModal
        product={selectedProduct}
        selectedColorName={modalColor}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
