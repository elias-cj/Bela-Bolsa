"use client";

import React, { useState } from "react";
import { AdminPromotion, adminStore } from "@/lib/admin-data";

interface PromotionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<AdminPromotion, "id" | "createdAt">) => void;
}

export function PromotionFormModal({ isOpen, onClose, onSave }: PromotionFormModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<AdminPromotion["type"]>("PERCENTAGE");
  const [value, setValue] = useState<number>(15);
  const [freeShipping, setFreeShipping] = useState(true);
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState("2026-09-30");
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  const products = adminStore.getProducts();

  if (!isOpen) return null;

  const toggleProduct = (id: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    onSave({
      name,
      description,
      type,
      value: Number(value),
      freeShipping,
      applicableProductIds: selectedProductIds,
      startDate,
      endDate,
      isActive: true,
    });

    setName("");
    setDescription("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white dark:bg-luxury-charcoal rounded-3xl border border-luxury-sand dark:border-luxury-charcoal-light shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-luxury-sand/60 dark:border-luxury-charcoal-light/60 mb-5">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold font-semibold block">
              Estrategia Comercial
            </span>
            <h3 className="font-serif text-2xl text-luxury-charcoal dark:text-luxury-ivory font-normal">
              Nueva Promoción
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
              Nombre de la Campaña *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ej. Especial Día de la Madre / 2x1 en Colección Elegantes"
              className="w-full px-3.5 py-2.5 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs text-luxury-charcoal dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
              Tipo de Promoción *
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs font-medium"
            >
              <option value="PERCENTAGE">Descuento Porcentual (%)</option>
              <option value="FIXED_BS">Descuento Fijo en Bolivianos (Bs.)</option>
              <option value="BUY_2_GET_1">Promoción 2x1</option>
              <option value="COMBO">Combo de Productos</option>
              <option value="FREE_SHIPPING">Envío Gratis Exclusivo</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                Valor del Beneficio
              </label>
              <input
                type="number"
                min={0}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                placeholder={type === "PERCENTAGE" ? "ej. 20 (%)" : "ej. 80 (Bs.)"}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs font-semibold text-luxury-gold"
              />
            </div>

            <div className="flex items-center space-x-3 pt-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={freeShipping}
                  onChange={(e) => setFreeShipping(e.target.checked)}
                  className="rounded text-luxury-gold focus:ring-luxury-gold"
                />
                <span className="text-xs uppercase tracking-wider font-medium text-luxury-charcoal dark:text-luxury-ivory">
                  Incluye Envío Gratis
                </span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                Fecha Inicio
              </label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                Fecha Fin
              </label>
              <input
                type="date"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs"
              />
            </div>
          </div>

          {/* Applicable products */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
              Carteras Aplicables (Opcional, vacío = todas)
            </label>
            <div className="max-h-36 overflow-y-auto p-2 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light/40 border border-luxury-sand space-y-1">
              {products.map((p) => (
                <label key={p.id} className="flex items-center justify-between p-1.5 rounded hover:bg-luxury-sand/40 cursor-pointer text-xs">
                  <span>{p.name} ({p.category})</span>
                  <input
                    type="checkbox"
                    checked={selectedProductIds.includes(p.id)}
                    onChange={() => toggleProduct(p.id)}
                    className="rounded text-luxury-gold"
                  />
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
              Texto Descriptivo / Reglas
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalle visible en WhatsApp y campañas..."
              className="w-full px-3.5 py-2 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs text-luxury-charcoal dark:text-white"
            />
          </div>

          <div className="pt-4 border-t border-luxury-sand/60 dark:border-luxury-charcoal-light/60 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-luxury-sand text-xs font-medium uppercase tracking-wider"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-luxury-gold text-luxury-charcoal-black text-xs font-semibold uppercase tracking-wider hover:bg-luxury-gold-shimmer shadow-luxury-gold"
            >
              Activar Promoción
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
