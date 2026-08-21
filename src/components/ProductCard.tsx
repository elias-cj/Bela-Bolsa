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
      className="group relative flex flex-col justify-between rounded-xl sm:rounded-2xl bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light/70 p-2.5 sm:p-4 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-luxury-lg hover:border-luxury-gold/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container with Zoom & Badge */}
      <div
        className="relative aspect-[4/5] w-full rounded-lg sm:rounded-xl overflow-hidden bg-luxury-sand/30 dark:bg-luxury-charcoal-light/30 mb-2.5 sm:mb-4 cursor-pointer"
        onClick={() => onQuickView(product, selectedColor)}
      >
        <Image
          src={isHovered ? product.secondaryImage || product.image : product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Floating Tag / Badge */}
        {product.tag && (
          <div className="absolute top-1.5 sm:top-3 left-1.5 sm:left-3 z-10">
            <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] uppercase tracking-[0.14em] sm:tracking-[0.18em] font-medium bg-luxury-charcoal-black/80 text-luxury-gold dark:bg-luxury-ivory/90 dark:text-luxury-charcoal backdrop-blur-md border border-luxury-gold/30 shadow-sm">
              {product.tag}
            </span>
          </div>
        )}

        {/* Quick view button overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center p-4">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product, selectedColor);
            }}
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/90 dark:bg-luxury-charcoal-black/90 backdrop-blur-md text-luxury-charcoal dark:text-luxury-ivory text-[11px] sm:text-xs uppercase tracking-wider font-medium hover:bg-luxury-gold hover:text-white dark:hover:bg-luxury-gold dark:hover:text-black transition-all shadow-md transform translate-y-2 group-hover:translate-y-0 duration-300"
          >
            Vista Rápida
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-grow justify-between space-y-2 sm:space-y-3">
        <div>
          {/* Category & Color Count */}
          <div className="flex items-center justify-between text-[9px] sm:text-[11px] uppercase tracking-wider text-luxury-muted-light dark:text-luxury-muted-dark">
            <span className="truncate max-w-[65%]">{product.category}</span>
            <span>{product.colors.length} {product.colors.length === 1 ? "color" : "tonos"}</span>
          </div>

          {/* Handbag Name */}
          <h3
            onClick={() => onQuickView(product, selectedColor)}
            className="font-serif text-xs sm:text-base lg:text-lg text-luxury-charcoal dark:text-luxury-ivory font-normal hover:text-luxury-gold dark:hover:text-luxury-gold transition-colors cursor-pointer mt-0.5 sm:mt-1 truncate"
          >
            {product.name}
          </h3>

          {/* Subtitle / Style */}
          <p className="text-[10px] sm:text-xs text-luxury-charcoal/70 dark:text-luxury-ivory/70 line-clamp-1 font-light hidden sm:block">
            {product.subtitle}
          </p>
        </div>

        {/* Color Swatches */}
        <div className="flex items-center space-x-1 sm:space-x-1.5 pt-0.5">
          {product.colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color.name)}
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full p-0.5 border transition-transform duration-200 ${
                selectedColor === color.name
                  ? "border-luxury-gold scale-125 shadow-sm ring-1 ring-luxury-gold/50"
                  : "border-black/10 dark:border-white/20 hover:scale-110 opacity-70 hover:opacity-100"
              }`}
              title={color.name}
              aria-label={`Seleccionar tono ${color.name}`}
            >
              <span
                className="block w-full h-full rounded-full shadow-inner"
                style={{ backgroundColor: color.hex }}
              />
            </button>
          ))}
        </div>

        {/* Price & Direct Conversion WhatsApp Button */}
        <div className="pt-2 sm:pt-3 border-t border-luxury-sand/50 dark:border-luxury-charcoal-light/50 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-luxury-muted-light block">
              Precio
            </span>
            <span className="font-serif text-sm sm:text-lg font-medium text-luxury-charcoal dark:text-luxury-ivory">
              {product.currency} {product.price.toLocaleString("es-BO")}
            </span>
          </div>

          <a
            href={whatsappMessageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center space-x-1 sm:space-x-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-luxury-gold text-luxury-charcoal-black font-semibold text-[10px] sm:text-xs uppercase tracking-wider hover:bg-luxury-gold-shimmer transition-all duration-300 shadow-sm text-center"
            title="Pedir por WhatsApp"
          >
            <span>Pedir</span>
            <span className="text-xs">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
