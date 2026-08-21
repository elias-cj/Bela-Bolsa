"use client";

import React from "react";
import Image from "next/image";
import { CATEGORIES_DATA } from "@/data/products";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function CategoriesSection() {
  return (
    <section id="categorias" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-luxury-gold block mb-2 font-sans">
            Universos de Estilo
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-luxury-charcoal dark:text-luxury-ivory tracking-tight">
            Categorías Exclusivas
          </h2>
          <p className="mt-3 text-sm sm:text-base text-luxury-charcoal/70 dark:text-luxury-ivory/70 font-light">
            Encuentra la silueta idónea adaptada a cada momento y ocasión especial.
          </p>
        </div>

        {/* 3 Big Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CATEGORIES_DATA.map((cat) => (
            <div
              key={cat.id}
              className="group relative h-[440px] sm:h-[480px] rounded-3xl overflow-hidden shadow-luxury-md border border-luxury-sand/50 dark:border-luxury-charcoal-light/50 flex flex-col justify-end p-8 transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Background Image */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-110"
              />

              {/* Dark Luxury Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-black/90 group-hover:via-black/50" />

              {/* Card Content */}
              <div className="relative z-10 space-y-3">
                <span className="text-[11px] uppercase tracking-[0.25em] text-luxury-gold-shimmer font-medium font-sans block">
                  {cat.count}
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                  {cat.name}
                </h3>

                <p className="text-xs sm:text-sm text-luxury-sand/90 font-light line-clamp-2 leading-relaxed">
                  {cat.subtitle}
                </p>

                <div className="pt-3 flex items-center justify-between">
                  <a
                    href={`#coleccion`}
                    className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-medium text-white group-hover:text-luxury-gold transition-colors"
                  >
                    <span>Ver Modelos</span>
                    <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                  </a>

                  <a
                    href={getWhatsAppLink(`Hola, me gustaría recibir el catálogo de carteras en la categoría ${cat.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Consultar ${cat.name} en WhatsApp`}
                    className="w-9 h-9 rounded-full bg-luxury-gold/20 hover:bg-luxury-gold text-luxury-gold hover:text-luxury-charcoal-black flex items-center justify-center backdrop-blur-md border border-luxury-gold/40 transition-all duration-300"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.77.814 2.796.814 3.18 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.766-5.768-5.766zm3.376 8.21c-.14.394-.799.734-1.127.76-.328.026-.745.132-2.484-.572-1.739-.704-2.834-2.464-2.92-2.58-.086-.116-.704-.937-.704-1.787 0-.85.443-1.268.6-1.44.157-.172.344-.215.459-.215.115 0 .23 0 .33.006.107.005.25-.041.391.297.144.346.49 1.196.533 1.282.043.086.072.187.014.302-.058.115-.086.187-.172.288-.086.1-.182.224-.26.3-.086.084-.176.176-.076.347.1.171.444.733.953 1.186.655.584 1.207.765 1.379.851.172.086.273.072.373-.043.1-.115.43-.502.545-.674.115-.172.23-.144.388-.086.158.057 1.005.474 1.177.56.172.086.287.129.33.201.043.072.043.416-.097.81z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
