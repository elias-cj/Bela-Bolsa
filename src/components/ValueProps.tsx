"use client";

import React from "react";

export function ValueProps() {
  const values = [
    {
      title: "Cuero de Alta Calidad",
      subtitle: "Curtido de Flor Entera",
      description: "Pieles vacunas europeas tratadas con ceras naturales para una longevidad excepcional, suavidad táctil y resistencia al desgaste.",
      icon: (
        <svg className="w-7 h-7 text-luxury-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0-18l8 4v10l-8 4M12 3L4 7v10l8 4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7l8 4 8-4" />
        </svg>
      ),
    },
    {
      title: "Diseños Exclusivos",
      subtitle: "Tiradas Limitadas de Autor",
      description: "Creamos colecciones en cantidades estrictamente limitadas para preservar la exclusividad e identidad de cada cliente.",
      icon: (
        <svg className="w-7 h-7 text-luxury-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      ),
    },
    {
      title: "Envíos a Toda Bolivia",
      subtitle: "Empaque Luxury & Seguro",
      description: "Entregas express aseguradas a Santa Cruz, La Paz, Cochabamba, Sucre, Tarija y todos los departamentos con caja rígida y guardapolvo.",
      icon: (
        <svg className="w-7 h-7 text-luxury-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.215-9.102L16.5 4.5H12M3 14.25V5.625C3 5.003 3.503 4.5 4.125 4.5H12m0 0v9.75m0 0h6.75" />
        </svg>
      ),
    },
    {
      title: "Atención Personalizada",
      subtitle: "Asesoría Directa por WhatsApp",
      description: "Respuesta inmediata de stylists expertas para resolver inquietudes de tamaño, combinación de atuendos y disponibilidad.",
      icon: (
        <svg className="w-7 h-7 text-luxury-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-.874-.836l.348-2.61C3.606 16.035 3 14.11 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-luxury-sand/30 dark:bg-[#0E0E10] border-y border-luxury-sand/60 dark:border-luxury-charcoal-light/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-luxury-gold block mb-2 font-sans">
            Pilares de Excelencia
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-luxury-charcoal dark:text-luxury-ivory tracking-tight">
            ¿Por qué elegirnos?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-luxury-charcoal/70 dark:text-luxury-ivory/70 font-light">
            Nuestros estándares intransigentes de marroquinería y servicio premium.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="group relative rounded-3xl p-8 bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light/70 shadow-luxury-sm hover:shadow-luxury-lg hover:border-luxury-gold/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Icon Container with Gold Glow */}
                <div className="w-14 h-14 rounded-2xl bg-luxury-ivory dark:bg-luxury-charcoal-light border border-luxury-gold/30 flex items-center justify-center group-hover:scale-110 group-hover:border-luxury-gold transition-all duration-300 shadow-sm">
                  {val.icon}
                </div>

                <div>
                  <h3 className="font-serif text-xl text-luxury-charcoal dark:text-luxury-ivory font-normal group-hover:text-luxury-gold transition-colors">
                    {val.title}
                  </h3>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-luxury-gold font-medium block mt-1 font-sans">
                    {val.subtitle}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-luxury-charcoal/75 dark:text-luxury-ivory/75 font-light leading-relaxed">
                  {val.description}
                </p>
              </div>

              {/* Bottom decorative subtle indicator */}
              <div className="pt-6 mt-6 border-t border-luxury-sand/40 dark:border-luxury-charcoal-light/40 flex items-center space-x-2 text-[10px] uppercase tracking-widest text-luxury-muted-light dark:text-luxury-muted-dark">
                <span>Garantía Bela</span>
                <span className="text-luxury-gold">✦</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
