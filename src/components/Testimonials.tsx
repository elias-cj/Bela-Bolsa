"use client";

import React from "react";
import Image from "next/image";
import { TESTIMONIALS } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section id="testimonios" className="py-14 sm:py-24 lg:py-32 bg-luxury-sand/30 dark:bg-[#0C0C0E] border-t border-luxury-sand/60 dark:border-luxury-charcoal-light/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-luxury-gold/30 bg-luxury-gold/10 dark:bg-luxury-gold/15 mb-2.5 sm:mb-3">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] font-semibold text-luxury-gold-dark dark:text-luxury-gold">
              Experiencias & Confianza
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal text-luxury-charcoal dark:text-luxury-ivory tracking-tight">
            Voces de Distinción
          </h2>
          <p className="mt-2 text-xs sm:text-base text-luxury-charcoal/70 dark:text-luxury-ivory/70 font-light">
            La satisfacción de mujeres que eligen la exclusividad y sofisticación de Bela Bolsa en toda Bolivia.
          </p>
        </div>

        {/* 3 Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-8 bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light/70 shadow-luxury-sm hover:shadow-luxury-md hover:border-luxury-gold/40 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top Quote Mark Icon */}
              <div className="text-luxury-gold/30 font-serif text-4xl sm:text-6xl leading-none -mb-2 sm:-mb-4 select-none">
                “
              </div>

              {/* Comment */}
              <p className="text-xs sm:text-base text-luxury-charcoal/85 dark:text-luxury-ivory/85 font-light leading-relaxed italic mb-5 sm:mb-8 relative z-10">
                "{test.comment}"
              </p>

              {/* Client Profile and Stars */}
              <div className="pt-4 sm:pt-6 border-t border-luxury-sand/60 dark:border-luxury-charcoal-light/60 flex items-center justify-between">
                <div className="flex items-center space-x-2.5 sm:space-x-3.5">
                  {/* Circular Avatar */}
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-luxury-gold/40 shadow-sm flex-shrink-0">
                    <Image
                      src={test.avatar}
                      alt={test.name}
                      fill
                      sizes="48px"
                      className="object-cover object-center"
                    />
                  </div>

                  <div>
                    <h4 className="font-serif text-sm sm:text-base text-luxury-charcoal dark:text-luxury-ivory font-medium">
                      {test.name}
                    </h4>
                    <span className="text-[10px] sm:text-[11px] text-luxury-gold font-medium uppercase tracking-wider block">
                      {test.city}
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-luxury-muted-light dark:text-luxury-muted-dark block">
                      Modelo: {test.productPurchased}
                    </span>
                  </div>
                </div>

                {/* 5 Golden Stars */}
                <div className="flex items-center space-x-0.5 sm:space-x-1 text-luxury-gold flex-shrink-0" aria-label="5 estrellas de calificación">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
