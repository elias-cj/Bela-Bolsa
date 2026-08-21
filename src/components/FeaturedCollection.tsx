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
    <section id="coleccion" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-luxury-gold/30 bg-luxury-gold/10 dark:bg-luxury-gold/15 mb-4">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-luxury-gold-dark dark:text-luxury-gold">
              Selección de Autor
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-luxury-charcoal dark:text-luxury-ivory tracking-tight">
            Colección Destacada
          </h2>

          <p className="mt-4 text-sm sm:text-base text-luxury-charcoal/70 dark:text-luxury-ivory/70 font-light leading-relaxed">
            Ocho creaciones emblemáticas confeccionadas con meticuloso rigor artesanal, cueros de textura sublime y proporciones impecables.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs uppercase tracking-[0.18em] transition-all duration-300 font-medium ${
                  activeCategory === cat
                    ? "bg-luxury-charcoal text-white dark:bg-luxury-gold dark:text-luxury-charcoal-black shadow-md scale-105"
                    : "bg-luxury-sand/50 dark:bg-luxury-charcoal-light/50 text-luxury-charcoal/80 dark:text-luxury-ivory/80 hover:bg-luxury-gold/20 hover:text-luxury-gold"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 8 Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={handleQuickView}
            />
          ))}
        </div>

        {/* Bottom Direct Concierge Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-luxury-sand/40 via-luxury-cream to-luxury-sand/40 dark:from-luxury-charcoal dark:via-luxury-charcoal-light dark:to-luxury-charcoal border border-luxury-sand dark:border-luxury-charcoal-light text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="text-left">
            <h4 className="font-serif text-xl sm:text-2xl text-luxury-charcoal dark:text-luxury-ivory">
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
            className="flex-shrink-0 inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-luxury-charcoal dark:bg-luxury-gold text-white dark:text-luxury-charcoal-black text-xs font-semibold uppercase tracking-[0.2em] hover:bg-luxury-gold hover:text-white transition-all shadow-md"
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
        onSelectColor={(colorName) => setModalColor(colorName)}
      />
    </section>
  );
}
