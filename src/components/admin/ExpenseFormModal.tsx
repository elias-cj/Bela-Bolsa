"use client";

import React, { useState } from "react";
import { AdminExpense } from "@/lib/admin-data";

interface ExpenseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<AdminExpense, "id" | "createdAt">) => void;
}

export function ExpenseFormModal({ isOpen, onClose, onSave }: ExpenseFormModalProps) {
  const [concept, setConcept] = useState("");
  const [category, setCategory] = useState<AdminExpense["category"]>("MERCADERIA");
  const [amount, setAmount] = useState<number | "">("");
  const [paymentMethod, setPaymentMethod] = useState<AdminExpense["paymentMethod"]>("QR");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!concept || !amount) return;

    onSave({
      concept,
      category,
      amount: Number(amount),
      paymentMethod,
      date,
      notes,
    });

    setConcept("");
    setAmount("");
    setNotes("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white dark:bg-luxury-charcoal rounded-3xl border border-luxury-sand dark:border-luxury-charcoal-light shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-luxury-sand/60 dark:border-luxury-charcoal-light/60 mb-5">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold font-semibold block">
              Contabilidad & Egresos
            </span>
            <h3 className="font-serif text-2xl text-luxury-charcoal dark:text-luxury-ivory font-normal">
              Registrar Compra / Gasto
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-luxury-sand/30 dark:bg-luxury-charcoal-light flex items-center justify-center text-luxury-charcoal dark:text-luxury-ivory"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
              Concepto del Gasto *
            </label>
            <input
              type="text"
              required
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              placeholder="ej. Compra de cueros, Publicidad TikTok, Courier..."
              className="w-full px-3.5 py-2.5 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs text-luxury-charcoal dark:text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                Categoría *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs text-luxury-charcoal dark:text-white"
              >
                <option value="MERCADERIA">Mercadería / Cueros</option>
                <option value="TRANSPORTE">Transporte / Envíos</option>
                <option value="PUBLICIDAD">Publicidad & Marketing</option>
                <option value="ALQUILER">Alquiler Showroom</option>
                <option value="SERVICIOS">Servicios Básicos</option>
                <option value="EMPAQUE">Empaque / Cajas Lujo</option>
                <option value="OTROS">Otros Gastos</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                Monto en Bolivianos (Bs.) *
              </label>
              <input
                type="number"
                required
                min={1}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="ej. 1500"
                className="w-full px-3.5 py-2.5 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs font-semibold text-rose-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                Método de Pago
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs"
              >
                <option value="QR">QR Simple</option>
                <option value="TRANSFER">Transferencia Bancaria</option>
                <option value="CASH">Efectivo en Caja</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                Fecha del Gasto
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs text-luxury-charcoal dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
              Observaciones / N° de Factura
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="N° de comprobante o detalle de proveedor..."
              className="w-full px-3.5 py-2 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs text-luxury-charcoal dark:text-white focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-luxury-sand/60 dark:border-luxury-charcoal-light/60 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-luxury-sand dark:border-luxury-charcoal-light text-xs font-medium uppercase tracking-wider"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-luxury-gold text-luxury-charcoal-black text-xs font-semibold uppercase tracking-wider hover:bg-luxury-gold-shimmer shadow-luxury-gold"
            >
              Registrar Egreso
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
