"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GALLERY_ITEMS, GalleryItem } from "@/data/gallery";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function LuxuryGallery() {
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  return (
    <section id="galeria" className="py-14 sm:py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-luxury-gold/30 bg-luxury-gold/10 dark:bg-luxury-gold/15 mb-2.5 sm:mb-3">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] font-semibold text-luxury-gold-dark dark:text-luxury-gold">
              Inspiración & Atelier
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal text-luxury-charcoal dark:text-luxury-ivory tracking-tight">
            Galería Luxury
          </h2>
          <p className="mt-2 text-xs sm:text-base text-luxury-charcoal/70 dark:text-luxury-ivory/70 font-light">
            Un recorrido visual por las texturas, matices y acabados de nuestras creaciones.
          </p>
        </div>

        {/* Pinterest / Magazine Style Dynamic Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 auto-rows-[160px] sm:auto-rows-[280px]">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-luxury-md border border-luxury-sand/50 dark:border-luxury-charcoal-light/50 ${item.span}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-108"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Caption & Title */}
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-8 transform translate-y-1 sm:translate-y-2 group-hover:translate-y-0 transition-transform duration-300 flex items-end justify-between">
                <div>
                  <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.25em] text-luxury-gold-shimmer font-medium block font-sans truncate">
                    {item.subtitle}
                  </span>
                  <h3 className="font-serif text-xs sm:text-2xl text-white font-normal mt-0.5 sm:mt-1 truncate">
                    {item.title}
                  </h3>
                </div>

                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-luxury-gold group-hover:text-luxury-charcoal-black transition-all shadow-md flex-shrink-0 ml-2">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox / Zoom Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-fade-in"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden bg-luxury-charcoal border border-luxury-gold/30 shadow-2xl p-4 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImage(null)}
              aria-label="Cerrar modal de imagen"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white hover:text-luxury-gold flex items-center justify-center"
            >
              ✕
            </button>
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src={activeImage.image}
                alt={activeImage.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="pt-4 text-center">
              <h4 className="font-serif text-lg sm:text-xl text-white">{activeImage.title}</h4>
              <p className="text-xs text-luxury-gold mt-1 uppercase tracking-widest">{activeImage.subtitle}</p>
              <div className="mt-4">
                <a
                  href={getWhatsAppLink(`Hola, me gustó la fotografía '${activeImage.title}' y deseo información sobre las carteras exhibidas.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-luxury-gold text-luxury-charcoal-black text-xs font-semibold uppercase tracking-wider hover:bg-luxury-gold-shimmer transition-colors"
                >
                  <span>Consultar este estilo por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
