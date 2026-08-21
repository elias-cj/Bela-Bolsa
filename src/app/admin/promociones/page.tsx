"use client";

import React, { useState } from "react";
import { adminStore, AdminPromotion } from "@/lib/admin-data";
import { PromotionFormModal } from "@/components/admin/PromotionFormModal";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { useToast } from "@/components/admin/Toast";

export default function AdminPromocionesPage() {
  const { success, info } = useToast();
  const [, setRefresh] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletePromo, setDeletePromo] = useState<AdminPromotion | null>(null);

  const promotions = adminStore.getPromotions();
  const products = adminStore.getProducts();

  const handleSavePromo = (data: Omit<AdminPromotion, "id" | "createdAt">) => {
    adminStore.createPromotion(data);
    setRefresh((r) => r + 1);
    success("Promoción creada", `La campaña '${data.name}' fue configurada`);
  };

  const handleToggle = (id: string) => {
    adminStore.togglePromotion(id);
    setRefresh((r) => r + 1);
    info("Estado actualizado", "La promoción cambió su disponibilidad");
  };

  const handleDelete = () => {
    if (deletePromo) {
      adminStore.deletePromotion(deletePromo.id);
      success("Promoción eliminada", `Se eliminó '${deletePromo.name}'`);
      setDeletePromo(null);
      setRefresh((r) => r + 1);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light shadow-luxury-sm">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold font-semibold block mb-1">
            Marketing & Campañas
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-luxury-charcoal dark:text-luxury-ivory font-normal">
            Motor de Promociones & Reglas
          </h1>
          <p className="text-xs sm:text-sm text-luxury-muted-light dark:text-luxury-muted-dark font-light mt-1">
            Configura descuentos fijos en Bs., 2x1 por temporada, combos de carteras y envíos gratuitos.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-luxury-gold text-luxury-charcoal-black text-xs font-semibold uppercase tracking-[0.2em] hover:bg-luxury-gold-shimmer shadow-luxury-gold transition-all"
        >
          <span className="text-base font-bold">+</span>
          <span>Crear Promoción</span>
        </button>
      </div>

      {/* Promos Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotions.map((promo) => {
          return (
            <div
              key={promo.id}
              className={`relative rounded-3xl p-6 bg-white dark:bg-luxury-charcoal border transition-all duration-300 flex flex-col justify-between shadow-luxury-sm ${
                promo.isActive
                  ? "border-luxury-gold/40 hover:shadow-luxury-md"
                  : "border-luxury-sand/60 opacity-60"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-luxury-gold/15 text-luxury-gold">
                    {promo.type === "PERCENTAGE" && `${promo.value}% OFF`}
                    {promo.type === "FIXED_BS" && `Bs. ${promo.value} OFF`}
                    {promo.type === "BUY_2_GET_1" && "2x1 Exclusivo"}
                    {promo.type === "COMBO" && "Combo Especial"}
                    {promo.type === "FREE_SHIPPING" && "Envío Gratis"}
                  </span>

                  <button
                    onClick={() => handleToggle(promo.id)}
                    className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider transition-colors ${
                      promo.isActive
                        ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                        : "bg-luxury-sand text-luxury-muted-light"
                    }`}
                  >
                    {promo.isActive ? "● Activa" : "○ Inactiva"}
                  </button>
                </div>

                <h3 className="font-serif text-lg text-luxury-charcoal dark:text-luxury-ivory font-normal">
                  {promo.name}
                </h3>

                <p className="text-xs text-luxury-muted-light dark:text-luxury-muted-dark mt-2 font-light line-clamp-2">
                  {promo.description || "Promoción aplicable a toda la colección"}
                </p>

                {/* Benefits Badges */}
                <div className="flex flex-wrap gap-2 pt-4 text-[11px]">
                  {promo.freeShipping && (
                    <span className="px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 font-medium">
                      🚚 Envío Gratis a Bolivia
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-md bg-luxury-sand/30 dark:bg-luxury-charcoal-light text-luxury-muted-light">
                    📅 {promo.startDate} al {promo.endDate}
                  </span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 mt-4 border-t border-luxury-sand/40 dark:border-luxury-charcoal-light/40 flex items-center justify-between text-xs">
                <span className="text-luxury-muted-light text-[11px]">
                  {promo.applicableProductIds.length === 0
                    ? "Aplica a todo el catálogo"
                    : `${promo.applicableProductIds.length} carteras seleccionadas`}
                </span>

                <button
                  onClick={() => setDeletePromo(promo)}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors"
                  title="Eliminar promoción"
                >
                  🗑️
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Promotion Form Modal */}
      <PromotionFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePromo}
      />

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!deletePromo}
        title="¿Eliminar Promoción?"
        message={`¿Deseas retirar permanentemente la promoción '${deletePromo?.name}'?`}
        onConfirm={handleDelete}
        onCancel={() => setDeletePromo(null)}
      />

    </div>
  );
}
