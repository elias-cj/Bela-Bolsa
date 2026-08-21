"use client";

import React from "react";
import Image from "next/image";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function EditorialBanner() {
  return (
    <section id="editorial" className="py-20 lg:py-28 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center rounded-3xl bg-luxury-cream dark:bg-luxury-charcoal/90 border border-luxury-sand dark:border-luxury-charcoal-light p-6 sm:p-10 lg:p-14 shadow-luxury-md">
          
          {/* Half Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/carteras/MDC-1-9.jpeg"
                alt="Artesanía y taller de marroquinería Bela Bolsa"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transform hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Image quote badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl backdrop-blur-md bg-black/40 border border-white/10 text-white">
                <p className="font-serif italic text-sm sm:text-base">
                  "El verdadero lujo reside en la armonía de lo imperceptible."
                </p>
                <span className="text-[10px] uppercase tracking-[0.2em] text-luxury-gold mt-1 block font-sans">
                  Atelier Bela Bolsa
                </span>
              </div>
            </div>
          </div>

          {/* Half Inspiring Editorial Text */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            
            <div className="inline-flex items-center space-x-2">
              <span className="h-[1px] w-8 bg-luxury-gold" />
              <span className="text-xs uppercase tracking-[0.3em] text-luxury-gold font-semibold font-sans">
                Manifiesto de Marca
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-luxury-charcoal dark:text-luxury-ivory font-normal leading-[1.15]">
              Cada cartera cuenta una historia de{" "}
              <span className="italic font-display gold-gradient-text">
                elegancia y distinción.
              </span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-luxury-charcoal/80 dark:text-luxury-ivory/80 font-light leading-relaxed">
              <p>
                En Bela Bolsa concebimos cada pieza no como un accesorio efímero, sino como una declaración de estilo perenne. Seleccionamos cuidadosamente pieles de curtido vegetal europeo, tratadas para envejecer con una pátina noble.
              </p>
              <p>
                Nuestros maestros artesanos dedican más de 18 horas a la confección, biselado de cantos y ensamblaje de herrajes de cada silueta, logrando un equilibrio perfecto entre solidez estructural y suavidad táctil.
              </p>
            </div>

            {/* Quote Signature Block */}
            <div className="pt-4 border-t border-luxury-sand/70 dark:border-luxury-charcoal-light/70 flex items-center justify-between">
              <div>
                <span className="font-serif text-lg tracking-wider text-luxury-charcoal dark:text-luxury-ivory block">
                  Elena de la Riva
                </span>
                <span className="text-xs text-luxury-muted-light dark:text-luxury-muted-dark tracking-widest uppercase">
                  Directora Creativa
                </span>
              </div>

              <a
                href={getWhatsAppLink("Hola, me encantó la historia de la marca Bela Bolsa y quisiera conocer sus modelos disponibles.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-medium text-luxury-gold hover:text-luxury-gold-dark transition-colors group"
              >
                <span>Saber Más</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
