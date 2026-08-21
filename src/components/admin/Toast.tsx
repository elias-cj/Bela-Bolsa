"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (title: string, description?: string, type?: ToastType) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (title: string, description?: string, type: ToastType = "success") => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      setToasts((prev) => [...prev, { id, title, description, type }]);

      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast]
  );

  const success = (title: string, desc?: string) => addToast(title, desc, "success");
  const error = (title: string, desc?: string) => addToast(title, desc, "error");
  const warning = (title: string, desc?: string) => addToast(title, desc, "warning");
  const info = (title: string, desc?: string) => addToast(title, desc, "info");

  return (
    <ToastContext.Provider value={{ toast: addToast, success, error, warning, info }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 pointer-events-none max-w-sm w-full">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto p-4 rounded-2xl shadow-xl border backdrop-blur-xl transition-all duration-300 transform translate-y-0 animate-fade-in flex items-start space-x-3.5 ${
              t.type === "success"
                ? "bg-white/95 dark:bg-luxury-charcoal/95 border-emerald-500/30 text-luxury-charcoal dark:text-luxury-ivory"
                : t.type === "error"
                ? "bg-white/95 dark:bg-luxury-charcoal/95 border-rose-500/30 text-luxury-charcoal dark:text-luxury-ivory"
                : t.type === "warning"
                ? "bg-white/95 dark:bg-luxury-charcoal/95 border-amber-500/30 text-luxury-charcoal dark:text-luxury-ivory"
                : "bg-white/95 dark:bg-luxury-charcoal/95 border-luxury-gold/40 text-luxury-charcoal dark:text-luxury-ivory"
            }`}
          >
            {/* Icon */}
            <div className="flex-shrink-0 mt-0.5">
              {t.type === "success" && (
                <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              {t.type === "error" && (
                <div className="w-6 h-6 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              )}
              {t.type === "warning" && (
                <div className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              )}
              {t.type === "info" && (
                <div className="w-6 h-6 rounded-full bg-luxury-gold/15 text-luxury-gold flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-grow">
              <h5 className="font-semibold text-xs uppercase tracking-wider">{t.title}</h5>
              {t.description && (
                <p className="text-xs text-luxury-muted-light dark:text-luxury-muted-dark mt-0.5 font-light">
                  {t.description}
                </p>
              )}
            </div>

            {/* Close button */}
            <button
              onClick={() => removeToast(t.id)}
              className="text-luxury-muted-light dark:text-luxury-muted-dark hover:text-luxury-charcoal dark:hover:text-white p-1"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
