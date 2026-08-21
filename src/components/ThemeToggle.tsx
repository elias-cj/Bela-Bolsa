"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-10 h-10 rounded-full border border-luxury-sand/50 dark:border-luxury-charcoal-light/50 ${className}`} />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className={`relative inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 border 
        ${
          isDark
            ? "border-luxury-gold/40 bg-luxury-charcoal hover:bg-luxury-charcoal-light text-luxury-gold shadow-sm"
            : "border-luxury-gold/30 bg-white hover:bg-luxury-ivory text-luxury-charcoal shadow-sm"
        } 
        focus:outline-none focus:ring-2 focus:ring-luxury-gold/40 ${className}`}
      title={isDark ? "Activar Modo Claro" : "Activar Modo Oscuro"}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Sun Icon */}
        <svg
          className={`w-5 h-5 transform transition-all duration-500 ${
            isDark
              ? "rotate-90 scale-0 opacity-0 absolute"
              : "rotate-0 scale-100 opacity-100 text-luxury-gold-dark"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>

        {/* Moon Icon */}
        <svg
          className={`w-5 h-5 transform transition-all duration-500 ${
            isDark
              ? "rotate-0 scale-100 opacity-100 text-luxury-gold-metallic"
              : "-rotate-90 scale-0 opacity-0 absolute"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          viewBox="0 0 24 24"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </div>
    </button>
  );
}
