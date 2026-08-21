"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Inicio", href: "#inicio" },
    { label: "Colección", href: "#coleccion" },
    { label: "Categorías", href: "#categorias" },
    { label: "Nosotros", href: "#editorial" },
    { label: "Galería", href: "#galeria" },
    { label: "Testimonios", href: "#testimonios" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-header border-b border-luxury-sand/70 dark:border-luxury-charcoal-light/70 py-2.5 sm:py-3.5 shadow-luxury-sm"
          : "bg-luxury-ivory/80 dark:bg-luxury-charcoal-black/80 backdrop-blur-md border-b border-luxury-sand/30 dark:border-luxury-charcoal-light/30 py-3 sm:py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link
            href="#inicio"
            className="group flex flex-col items-start focus:outline-none"
          >
            <span className="font-serif text-lg sm:text-2xl lg:text-3xl tracking-[0.2em] sm:tracking-[0.25em] font-semibold text-luxury-charcoal dark:text-luxury-ivory transition-colors group-hover:text-luxury-gold">
              BELA BOLSA
            </span>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-luxury-muted-light dark:text-luxury-muted-dark -mt-0.5 sm:-mt-1 font-sans">
              Haute Maroquinerie
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs tracking-[0.18em] uppercase text-luxury-charcoal/80 dark:text-luxury-ivory/80 hover:text-luxury-gold dark:hover:text-luxury-gold transition-colors duration-300 font-medium relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-luxury-gold hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions & Theme Toggle */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <ThemeToggle />

            {/* Admin Panel Link */}
            <Link
              href="/admin"
              className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-full bg-luxury-sand/40 dark:bg-luxury-charcoal-light border border-luxury-sand dark:border-luxury-charcoal-light text-luxury-charcoal dark:text-luxury-ivory hover:text-luxury-gold text-xs font-semibold tracking-wider uppercase transition-colors"
              title="Panel de Administración"
            >
              <span>⚙️ Admin</span>
            </Link>

            {/* Direct WhatsApp Concierge CTA */}
            <a
              href={getWhatsAppLink("Hola, deseo recibir atención personalizada y asesoría sobre sus carteras.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-luxury-gold/50 bg-luxury-gold/10 dark:bg-luxury-gold/15 text-luxury-charcoal dark:text-luxury-gold hover:bg-luxury-gold hover:text-white dark:hover:text-luxury-charcoal-black transition-all duration-300 text-xs font-semibold tracking-wider uppercase shadow-sm group"
            >
              <svg
                className="w-3.5 h-3.5 text-luxury-gold group-hover:text-white dark:group-hover:text-luxury-charcoal-black transition-colors"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.77.814 2.796.814 3.18 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.766-5.768-5.766zm3.376 8.21c-.14.394-.799.734-1.127.76-.328.026-.745.132-2.484-.572-1.739-.704-2.834-2.464-2.92-2.58-.086-.116-.704-.937-.704-1.787 0-.85.443-1.268.6-1.44.157-.172.344-.215.459-.215.115 0 .23 0 .33.006.107.005.25-.041.391.297.144.346.49 1.196.533 1.282.043.086.072.187.014.302-.058.115-.086.187-.172.288-.086.1-.182.224-.26.3-.086.084-.176.176-.076.347.1.171.444.733.953 1.186.655.584 1.207.765 1.379.851.172.086.273.072.373-.043.1-.115.43-.502.545-.674.115-.172.23-.144.388-.086.158.057 1.005.474 1.177.56.172.086.287.129.33.201.043.072.043.416-.097.81z" />
              </svg>
              <span>Concierge</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-luxury-charcoal dark:text-luxury-ivory hover:text-luxury-gold focus:outline-none"
              aria-label="Abrir menú de navegación"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.75"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.75"
                    d="M4 7h16M4 12h16M4 17h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`lg:hidden transition-all duration-400 ease-in-out overflow-hidden ${
          mobileMenuOpen
            ? "max-h-[500px] opacity-100 border-b border-luxury-sand/60 dark:border-luxury-charcoal-light/60 bg-luxury-ivory/95 dark:bg-luxury-charcoal-black/95 backdrop-blur-xl shadow-lg"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pt-4 pb-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm uppercase tracking-[0.2em] font-medium text-luxury-charcoal dark:text-luxury-ivory hover:text-luxury-gold dark:hover:text-luxury-gold transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-luxury-sand/50 dark:border-luxury-charcoal-light/50 space-y-2">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-full bg-luxury-sand/40 dark:bg-luxury-charcoal-light text-luxury-charcoal dark:text-luxury-ivory font-semibold text-xs uppercase tracking-widest hover:text-luxury-gold transition-colors"
            >
              <span>⚙️ Panel de Administración</span>
            </Link>
            <a
              href={getWhatsAppLink("Hola, deseo contactarme con una asesora de Bela Bolsa")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 w-full py-3 rounded-full bg-luxury-gold text-white font-medium text-xs uppercase tracking-widest hover:bg-luxury-gold-dark transition-colors shadow-luxury-gold"
            >
              <span>Escribir por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
