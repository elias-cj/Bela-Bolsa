"use client";

import React from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  isDestructive = true,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
      onClick={onCancel}
    >
      <div
        className="relative w-full max-w-md bg-white dark:bg-luxury-charcoal rounded-3xl border border-luxury-sand dark:border-luxury-charcoal-light shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isDestructive ? "bg-rose-500/10 text-rose-600 dark:text-rose-400" : "bg-luxury-gold/15 text-luxury-gold"
          }`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="font-serif text-xl text-luxury-charcoal dark:text-luxury-ivory font-normal">
            {title}
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-luxury-muted-light dark:text-luxury-muted-dark leading-relaxed font-light mb-6">
          {message}
        </p>

        <div className="flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 rounded-full border border-luxury-sand dark:border-luxury-charcoal-light text-luxury-charcoal dark:text-luxury-ivory text-xs uppercase tracking-wider font-medium hover:bg-luxury-sand/30 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-5 py-2.5 rounded-full text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-sm ${
              isDestructive
                ? "bg-rose-600 hover:bg-rose-700"
                : "bg-luxury-gold hover:bg-luxury-gold-dark text-luxury-charcoal-black"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
