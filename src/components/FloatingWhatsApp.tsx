"use client";

import React, { useState, useEffect } from "react";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside
      aria-label="Contacto de Asesoría en WhatsApp"
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 transition-all duration-500 transform ${
        isVisible
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-12 opacity-0 scale-90 pointer-events-none"
      }`}
    >
      <a
        href={getWhatsAppLink("Hola, deseo comunicarme con una asesora de Bela Bolsa para consultar disponibilidad.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp a Bela Bolsa"
        className="group relative flex items-center space-x-2.5 p-3 sm:px-4 sm:py-3 rounded-full bg-[#128C7E] hover:bg-[#075E54] text-white shadow-luxury-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20"
      >
        {/* Pulse glow ripple */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none opacity-40" />

        {/* WhatsApp Icon */}
        <div className="relative flex items-center justify-center">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-white flex-shrink-0"
            viewBox="0 0 24 24"
          >
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.77.814 2.796.814 3.18 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.766-5.768-5.766zm3.376 8.21c-.14.394-.799.734-1.127.76-.328.026-.745.132-2.484-.572-1.739-.704-2.834-2.464-2.92-2.58-.086-.116-.704-.937-.704-1.787 0-.85.443-1.268.6-1.44.157-.172.344-.215.459-.215.115 0 .23 0 .33.006.107.005.25-.041.391.297.144.346.49 1.196.533 1.282.043.086.072.187.014.302-.058.115-.086.187-.172.288-.086.1-.182.224-.26.3-.086.084-.176.176-.076.347.1.171.444.733.953 1.186.655.584 1.207.765 1.379.851.172.086.273.072.373-.043.1-.115.43-.502.545-.674.115-.172.23-.144.388-.086.158.057 1.005.474 1.177.56.172.086.287.129.33.201.043.072.043.416-.097.81z" />
          </svg>
        </div>

        {/* Text for desktop */}
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-[10px] uppercase tracking-wider text-emerald-100 font-sans leading-none">
            Asesoría Online
          </span>
          <span className="text-xs font-semibold text-white tracking-wide">
            Pedir por WhatsApp
          </span>
        </div>
      </a>
    </aside>
  );
}
