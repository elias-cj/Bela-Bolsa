"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Product } from "@/data/products";
import { getProductWhatsAppLink } from "@/lib/whatsapp";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  selectedColorName?: string;
  onSelectColor?: (colorName: string) => void;
}

export function ProductDetailModal({
  product,
  onClose,
  selectedColorName,
  onSelectColor,
}: ProductDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (product) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const activeColor = selectedColorName || product.colors[0]?.name;
  const whatsappUrl = `${getProductWhatsAppLink(product.name)}%20en%20color%20${encodeURIComponent(activeColor)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/75 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-luxury-ivory dark:bg-luxury-charcoal rounded-3xl border border-luxury-sand dark:border-luxury-charcoal-light shadow-2xl p-6 sm:p-8 md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Cerrar ventana"
          className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/80 dark:bg-luxury-charcoal-light/80 text-luxury-charcoal dark:text-luxury-ivory hover:text-luxury-gold flex items-center justify-center transition-colors border border-luxury-sand/50 dark:border-luxury-charcoal-light"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Images preview */}
          <div className="md:col-span-6 space-y-4">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-luxury-sand/40 dark:bg-luxury-charcoal-light/40 shadow-inner">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
              {product.tag && (
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-luxury-charcoal-black/80 backdrop-blur-md border border-luxury-gold/50 text-luxury-gold text-[10px] uppercase tracking-[0.2em] font-medium">
                  {product.tag}
                </div>
              )}
            </div>
          </div>

          {/* Product Specifications & WhatsApp Purchase */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold font-medium block mb-1">
                {product.category}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-luxury-charcoal dark:text-luxury-ivory font-normal">
                {product.name}
              </h3>
              <p className="text-xs sm:text-sm text-luxury-muted-light dark:text-luxury-muted-dark mt-1">
                {product.subtitle}
              </p>

              {/* Price */}
              <div className="mt-4 flex items-baseline space-x-2">
                <span className="font-serif text-3xl text-luxury-charcoal dark:text-luxury-gold font-normal">
                  {product.currency} {product.price.toLocaleString("es-BO")}
                </span>
                <span className="text-xs text-luxury-muted-light dark:text-luxury-muted-dark">
                  (Incluye IVA y estuche protector)
                </span>
              </div>

              {/* Editorial Description */}
              <p className="mt-5 text-sm text-luxury-charcoal/80 dark:text-luxury-ivory/80 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Specs Breakdown */}
              <div className="mt-6 space-y-2.5 pt-4 border-t border-luxury-sand/60 dark:border-luxury-charcoal-light/60 text-xs">
                <div className="flex justify-between py-1">
                  <span className="text-luxury-muted-light dark:text-luxury-muted-dark font-medium">Material:</span>
                  <span className="text-luxury-charcoal dark:text-luxury-ivory text-right">{product.material}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-luxury-muted-light dark:text-luxury-muted-dark font-medium">Dimensiones:</span>
                  <span className="text-luxury-charcoal dark:text-luxury-ivory">{product.dimensions}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-luxury-muted-light dark:text-luxury-muted-dark font-medium">Disponibilidad:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">En stock para envío inmediato</span>
                </div>
              </div>

              {/* Color Swatches */}
              <div className="mt-6">
                <span className="text-xs uppercase tracking-wider text-luxury-charcoal dark:text-luxury-ivory font-medium block mb-2.5">
                  Color seleccionado: <strong className="text-luxury-gold font-semibold">{activeColor}</strong>
                </span>
                <div className="flex items-center space-x-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => onSelectColor && onSelectColor(c.name)}
                      className={`group relative flex items-center justify-center p-0.5 rounded-full transition-all duration-300 ${
                        activeColor === c.name
                          ? "ring-2 ring-luxury-gold ring-offset-2 dark:ring-offset-luxury-charcoal scale-110"
                          : "opacity-70 hover:opacity-100 hover:scale-105"
                      }`}
                      title={c.name}
                    >
                      <span
                        className="w-7 h-7 rounded-full border border-black/10 dark:border-white/20 shadow-sm"
                        style={{ backgroundColor: c.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Purchase Action */}
            <div className="pt-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-3 px-6 py-4 rounded-full bg-gradient-to-r from-luxury-gold via-luxury-gold-light to-luxury-gold-dark text-luxury-charcoal-black font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] shadow-luxury-gold hover:shadow-luxury-gold-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.77.814 2.796.814 3.18 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.766-5.768-5.766zm3.376 8.21c-.14.394-.799.734-1.127.76-.328.026-.745.132-2.484-.572-1.739-.704-2.834-2.464-2.92-2.58-.086-.116-.704-.937-.704-1.787 0-.85.443-1.268.6-1.44.157-.172.344-.215.459-.215.115 0 .23 0 .33.006.107.005.25-.041.391.297.144.346.49 1.196.533 1.282.043.086.072.187.014.302-.058.115-.086.187-.172.288-.086.1-.182.224-.26.3-.086.084-.176.176-.076.347.1.171.444.733.953 1.186.655.584 1.207.765 1.379.851.172.086.273.072.373-.043.1-.115.43-.502.545-.674.115-.172.23-.144.388-.086.158.057 1.005.474 1.177.56.172.086.287.129.33.201.043.072.043.416-.097.81z" />
                </svg>
                <span>Pedir por WhatsApp</span>
              </a>
              <p className="text-center text-[11px] text-luxury-muted-light dark:text-luxury-muted-dark mt-2.5">
                ✦ Respuesta inmediata de una asesora de imagen
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
