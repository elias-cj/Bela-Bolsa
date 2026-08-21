"use client";

import React from "react";
import Image from "next/image";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[90vh] sm:min-h-screen flex flex-col justify-center pt-24 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 lg:pb-20 overflow-hidden"
    >
      {/* Background Subtle Gradient & Accents */}
      <div className="absolute inset-0 bg-gradient-to-r from-luxury-ivory via-luxury-cream to-luxury-sand dark:from-luxury-charcoal-black dark:via-[#0E0E10] dark:to-luxury-charcoal transition-colors duration-500" />
      
      {/* Delicate background circles for ambient depth */}
      <div className="absolute -top-32 -left-32 w-72 sm:w-96 h-72 sm:h-96 bg-luxury-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-luxury-gold/10 dark:bg-luxury-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 flex flex-col items-start justify-center space-y-4 sm:space-y-6 pt-4 sm:pt-8 lg:pt-0">
            
            {/* Exclusive Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-luxury-gold/40 bg-luxury-gold/10 dark:bg-luxury-gold/15 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-ping" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] font-medium text-luxury-gold-dark dark:text-luxury-gold">
                Colección Exclusiva 2026
              </span>
            </div>

            {/* Main Luxury Title */}
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-normal tracking-tight text-luxury-charcoal dark:text-luxury-ivory leading-[1.1] sm:leading-[1.08]">
              Elegancia <br className="hidden sm:inline" />
              <span className="italic font-normal font-display gold-gradient-text">
                Esculpida
              </span>{" "}
              en <br className="hidden sm:inline" />
              Cada Detalle.
            </h1>

            {/* Short Editorial Description */}
            <p className="text-xs sm:text-base lg:text-lg text-luxury-charcoal/80 dark:text-luxury-ivory/80 font-light max-w-lg leading-relaxed">
              Marroquinería de alta gama elaborada con cueros seleccionados y herrajes dorados. Cada diseño combina la tradición artesanal con el lujo contemporáneo.
            </p>

            {/* Feature highlights pills */}
            <div className="flex flex-wrap gap-2.5 sm:gap-4 py-1 sm:py-2 text-[10px] sm:text-xs tracking-wider text-luxury-charcoal/70 dark:text-luxury-ivory/70 uppercase">
              <div className="flex items-center space-x-1.5 bg-luxury-sand/30 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-full">
                <span className="text-luxury-gold">✦</span>
                <span>Cuero de flor entera</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-luxury-sand/30 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-full">
                <span className="text-luxury-gold">✦</span>
                <span>Envíos a toda Bolivia</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-luxury-sand/30 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-full">
                <span className="text-luxury-gold">✦</span>
                <span>Edición Limitada</span>
              </div>
            </div>

            {/* Primary Action Button (WhatsApp) */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href={getWhatsAppLink("Hola, quiero comprar una cartera de la nueva colección de Bela Bolsa.")}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center space-x-2.5 sm:space-x-3 px-6 py-3.5 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-luxury-gold via-luxury-gold-light to-luxury-gold-dark text-luxury-charcoal-black font-semibold text-xs sm:text-sm uppercase tracking-[0.18em] sm:tracking-[0.2em] shadow-luxury-gold hover:shadow-luxury-gold-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden"
              >
                {/* Gold shimmer highlight effect */}
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                
                {/* WhatsApp Vector Icon */}
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-luxury-charcoal-black flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.77.814 2.796.814 3.18 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.766-5.768-5.766zm3.376 8.21c-.14.394-.799.734-1.127.76-.328.026-.745.132-2.484-.572-1.739-.704-2.834-2.464-2.92-2.58-.086-.116-.704-.937-.704-1.787 0-.85.443-1.268.6-1.44.157-.172.344-.215.459-.215.115 0 .23 0 .33.006.107.005.25-.041.391.297.144.346.49 1.196.533 1.282.043.086.072.187.014.302-.058.115-.086.187-.172.288-.086.1-.182.224-.26.3-.086.084-.176.176-.076.347.1.171.444.733.953 1.186.655.584 1.207.765 1.379.851.172.086.273.072.373-.043.1-.115.43-.502.545-.674.115-.172.23-.144.388-.086.158.057 1.005.474 1.177.56.172.086.287.129.33.201.043.072.043.416-.097.81z" />
                </svg>
                <span>Comprar por WhatsApp</span>
              </a>

              <a
                href="#coleccion"
                className="inline-flex items-center justify-center px-5 py-3 sm:px-6 sm:py-4 rounded-full border border-luxury-charcoal/20 dark:border-luxury-ivory/20 hover:border-luxury-gold dark:hover:border-luxury-gold text-luxury-charcoal dark:text-luxury-ivory hover:text-luxury-gold text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] font-medium transition-all duration-300 text-center"
              >
                Ver Colección
              </a>
            </div>

          </div>

          {/* Right Column: Hero Luxury Handbag Photography Showcase */}
          <div className="lg:col-span-6 relative flex items-center justify-center pt-2 sm:pt-0">
            
            {/* Ambient decorative frame backdrop */}
            <div className="relative w-full max-w-[290px] sm:max-w-md lg:max-w-none">
              
              {/* Outer Golden Line border */}
              <div className="absolute -inset-2 sm:-inset-4 rounded-2xl sm:rounded-3xl border border-luxury-gold/30 dark:border-luxury-gold/20 transform rotate-1 transition-transform duration-700" />
              
              {/* Main Image Container */}
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl bg-luxury-sand/30 dark:bg-luxury-charcoal-light/30">
                <Image
                  src="/images/carteras/MDC-1-1.jpeg"
                  alt="Cartera de Lujo Bela Bolsa Modelo Élysée"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transform hover:scale-105 transition-transform duration-1000 ease-out"
                />

                {/* Subtle Luxury Gradient Overlay at the bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                {/* Floating Tag over image */}
                <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 p-2.5 sm:p-4 rounded-xl backdrop-blur-md bg-black/40 border border-white/10 text-white flex items-center justify-between">
                  <div>
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-luxury-gold block font-sans">
                      Pieza Destacada
                    </span>
                    <span className="font-serif text-sm sm:text-lg font-normal tracking-wide">
                      Élysée Tote No. 1
                    </span>
                  </div>
                  <span className="font-serif text-base sm:text-xl text-luxury-gold-shimmer">
                    Bs. 890
                  </span>
                </div>
              </div>

              {/* Floating Mini Badge */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-white/90 dark:bg-luxury-charcoal/90 backdrop-blur-md border border-luxury-gold/40 py-1.5 px-3 sm:py-2 sm:px-4 rounded-full shadow-lg flex items-center space-x-1.5 sm:space-x-2">
                <span className="text-luxury-gold text-xs sm:text-sm">★</span>
                <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-luxury-charcoal dark:text-luxury-ivory">
                  Hecho a Mano
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Scroll Down Indicator */}
        <div className="pt-6 sm:pt-10 flex flex-col items-center justify-center">
          <a
            href="#coleccion"
            aria-label="Deslizar a la colección"
            className="group flex flex-col items-center space-y-2 text-luxury-muted-light dark:text-luxury-muted-dark hover:text-luxury-gold transition-colors"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium font-sans">
              Explorar
            </span>
            <div className="w-5 h-9 rounded-full border border-luxury-charcoal/30 dark:border-luxury-ivory/30 group-hover:border-luxury-gold flex items-start justify-center p-1 transition-colors">
              <div className="w-1.5 h-2 bg-luxury-gold rounded-full animate-bounce" />
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}
