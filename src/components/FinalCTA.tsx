"use client";

import React from "react";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function FinalCTA() {
  return (
    <section id="contacto" className="py-24 sm:py-32 relative overflow-hidden bg-luxury-charcoal-black text-white">
      {/* Ambient Gold Glows in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-luxury-gold/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-24 left-10 w-80 h-80 bg-luxury-gold/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative Gold Border Top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-luxury-gold/50 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 space-y-8">
        
        {/* Subtle Brand Tag */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-luxury-gold/40 bg-luxury-gold/10 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-semibold text-luxury-gold">
            Atelier & Concierge Bela Bolsa
          </span>
        </div>

        {/* Majestic Title */}
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-luxury-ivory leading-[1.15] max-w-3xl mx-auto">
          Descubre la cartera <br className="hidden sm:block" />
          <span className="italic font-display gold-gradient-text">
            perfecta para tu estilo.
          </span>
        </h2>

        {/* Editorial Subtitle */}
        <p className="text-base sm:text-lg text-luxury-sand/80 font-light max-w-xl mx-auto leading-relaxed">
          Nuestras asesoras de moda están listas para brindarte una atención personalizada, mostrarte detalles en video y gestionar tu envío prioritario a cualquier rincón de Bolivia.
        </p>

        {/* Large WhatsApp CTA Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={getWhatsAppLink("Hola, quiero información sobre sus carteras")}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center space-x-3 px-10 py-5 rounded-full bg-gradient-to-r from-luxury-gold via-luxury-gold-shimmer to-luxury-gold-dark text-luxury-charcoal-black font-semibold text-sm uppercase tracking-[0.25em] shadow-luxury-gold-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
          >
            {/* Shimmer animation */}
            <div className="absolute inset-0 bg-white/25 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />

            <svg
              className="w-6 h-6 text-luxury-charcoal-black flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.77.814 2.796.814 3.18 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.766-5.768-5.766zm3.376 8.21c-.14.394-.799.734-1.127.76-.328.026-.745.132-2.484-.572-1.739-.704-2.834-2.464-2.92-2.58-.086-.116-.704-.937-.704-1.787 0-.85.443-1.268.6-1.44.157-.172.344-.215.459-.215.115 0 .23 0 .33.006.107.005.25-.041.391.297.144.346.49 1.196.533 1.282.043.086.072.187.014.302-.058.115-.086.187-.172.288-.086.1-.182.224-.26.3-.086.084-.176.176-.076.347.1.171.444.733.953 1.186.655.584 1.207.765 1.379.851.172.086.273.072.373-.043.1-.115.43-.502.545-.674.115-.172.23-.144.388-.086.158.057 1.005.474 1.177.56.172.086.287.129.33.201.043.072.043.416-.097.81z" />
            </svg>
            <span>Conversar por WhatsApp</span>
          </a>
        </div>

        {/* Benefits bar */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs tracking-widest uppercase text-luxury-sand/60">
          <div className="flex items-center space-x-2">
            <span className="text-luxury-gold">✓</span>
            <span>Atención Inmediata</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-luxury-gold">✓</span>
            <span>Envíos Seguros a toda Bolivia</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-luxury-gold">✓</span>
            <span>Empaque de Regalo Exclusivo</span>
          </div>
        </div>

      </div>
    </section>
  );
}
