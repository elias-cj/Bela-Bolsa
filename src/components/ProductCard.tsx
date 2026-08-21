"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/data/products";
import { getProductWhatsAppLink } from "@/lib/whatsapp";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product, selectedColor: string) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "");
  const [isHovered, setIsHovered] = useState(false);

  const whatsappMessageUrl = `${getProductWhatsAppLink(product.name)}${
    selectedColor ? `%20en%20color%20${encodeURIComponent(selectedColor)}` : ""
  }`;

  return (
    <div
      className="group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light/70 p-4 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-luxury-lg hover:border-luxury-gold/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container with Zoom & Badge */}
      <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-luxury-sand/30 dark:bg-luxury-charcoal-light/30 mb-4 cursor-pointer"
        onClick={() => onQuickView(product, selectedColor)}
      >
        <Image
          src={isHovered ? product.secondaryImage || product.image : product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Floating Tag / Badge */}
        {product.tag && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.18em] font-medium bg-luxury-charcoal-black/80 text-luxury-gold dark:bg-luxury-ivory/90 dark:text-luxury-charcoal backdrop-blur-md border border-luxury-gold/30 shadow-sm">
              {product.tag}
            </span>
          </div>
        )}

        {/* Quick view button overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product, selectedColor);
            }}
            className="px-4 py-2 rounded-full bg-white/90 dark:bg-luxury-charcoal-black/90 backdrop-blur-md text-luxury-charcoal dark:text-luxury-ivory text-xs uppercase tracking-wider font-medium hover:bg-luxury-gold hover:text-white dark:hover:bg-luxury-gold dark:hover:text-black transition-all shadow-md transform translate-y-2 group-hover:translate-y-0 duration-300"
          >
            Vista Rápida
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-grow justify-between space-y-3">
        <div>
          {/* Category & Color Count */}
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-luxury-muted-light dark:text-luxury-muted-dark">
            <span>{product.category}</span>
            <span>{product.colors.length} {product.colors.length === 1 ? "color" : "tonos"}</span>
          </div>

          {/* Handbag Name */}
          <h3
            onClick={() => onQuickView(product, selectedColor)}
            className="font-serif text-lg text-luxury-charcoal dark:text-luxury-ivory font-normal hover:text-luxury-gold dark:hover:text-luxury-gold transition-colors cursor-pointer mt-1"
          >
            {product.name}
          </h3>

          {/* Subtitle / Style */}
          <p className="text-xs text-luxury-charcoal/70 dark:text-luxury-ivory/70 line-clamp-1 font-light">
            {product.subtitle}
          </p>
        </div>

        {/* Color Swatches */}
        <div className="flex items-center space-x-2 pt-1">
          {product.colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color.name)}
              className={`w-5 h-5 rounded-full p-0.5 border transition-transform duration-200 ${
                selectedColor === color.name
                  ? "border-luxury-gold scale-125 shadow-sm ring-1 ring-luxury-gold/50"
                  : "border-black/10 dark:border-white/20 hover:scale-110 opacity-70 hover:opacity-100"
              }`}
              title={color.name}
              aria-label={`Seleccionar tono ${color.name}`}
            >
              <span
                className="block w-full h-full rounded-full"
                style={{ backgroundColor: color.hex }}
              />
            </button>
          ))}
        </div>

        {/* Price and WhatsApp Action */}
        <div className="pt-3 border-t border-luxury-sand/50 dark:border-luxury-charcoal-light/50 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-luxury-muted-light dark:text-luxury-muted-dark block">
              Precio
            </span>
            <span className="font-serif text-lg font-medium text-luxury-charcoal dark:text-luxury-gold">
              {product.currency} {product.price.toLocaleString("es-BO")}
            </span>
          </div>

          {/* WhatsApp Direct Action Button */}
          <a
            href={whatsappMessageUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Comprar ${product.name} por WhatsApp`}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-full bg-luxury-gold/15 dark:bg-luxury-gold/20 hover:bg-luxury-gold text-luxury-gold-dark dark:text-luxury-gold hover:text-white dark:hover:text-luxury-charcoal-black transition-all duration-300 text-[11px] uppercase tracking-wider font-semibold border border-luxury-gold/30 hover:border-luxury-gold shadow-sm hover:shadow-luxury-gold"
          >
            <svg
              className="w-3.5 h-3.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.77.814 2.796.814 3.18 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.766-5.768-5.766zm3.376 8.21c-.14.394-.799.734-1.127.76-.328.026-.745.132-2.484-.572-1.739-.704-2.834-2.464-2.92-2.58-.086-.116-.704-.937-.704-1.787 0-.85.443-1.268.6-1.44.157-.172.344-.215.459-.215.115 0 .23 0 .33.006.107.005.25-.041.391.297.144.346.49 1.196.533 1.282.043.086.072.187.014.302-.058.115-.086.187-.172.288-.086.1-.182.224-.26.3-.086.084-.176.176-.076.347.1.171.444.733.953 1.186.655.584 1.207.765 1.379.851.172.086.273.072.373-.043.1-.115.43-.502.545-.674.115-.172.23-.144.388-.086.158.057 1.005.474 1.177.56.172.086.287.129.33.201.043.072.043.416-.097.81z" />
            </svg>
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
