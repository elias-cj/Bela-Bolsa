"use client";

import React, { useState } from "react";
import { adminStore, AdminCoupon } from "@/lib/admin-data";
import { CouponFormModal } from "@/components/admin/CouponFormModal";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { useToast } from "@/components/admin/Toast";

export default function AdminCuponesPage() {
  const { success, info } = useToast();
  const [, setRefresh] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteCoupon, setDeleteCoupon] = useState<AdminCoupon | null>(null);

  const coupons = adminStore.getCoupons();

  const handleSaveCoupon = (data: Omit<AdminCoupon, "id" | "usedCount" | "createdAt">) => {
    adminStore.createCoupon(data);
    setRefresh((r) => r + 1);
    success("Cupón creado con éxito", `Código: ${data.code} activado.`);
  };

  const handleToggle = (id: string) => {
    adminStore.toggleCoupon(id);
    setRefresh((r) => r + 1);
    info("Estado actualizado", "El cupón ha cambiado su estado de validez.");
  };

  const handleDelete = () => {
    if (deleteCoupon) {
      adminStore.deleteCoupon(deleteCoupon.id);
      success("Cupón eliminado", `Se retiró el código ${deleteCoupon.code}`);
      setDeleteCoupon(null);
      setRefresh((r) => r + 1);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light shadow-luxury-sm">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold font-semibold block mb-1">
            Fidelización & Códigos
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-luxury-charcoal dark:text-luxury-ivory font-normal">
            Sistema de Cupones de Descuento
          </h1>
          <p className="text-xs sm:text-sm text-luxury-muted-light dark:text-luxury-muted-dark font-light mt-1">
            Crea códigos promocionales con límites de canje, fechas de vigencia y montos mínimos de compra.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-luxury-gold text-luxury-charcoal-black text-xs font-semibold uppercase tracking-[0.2em] hover:bg-luxury-gold-shimmer shadow-luxury-gold transition-all"
        >
          <span className="text-base font-bold">+</span>
          <span>Crear Cupón</span>
        </button>
      </div>

      {/* Coupons Table */}
      <div className="rounded-3xl bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light shadow-luxury-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-luxury-sand/30 dark:bg-luxury-charcoal-light/60 border-b border-luxury-sand/60 text-[10px] uppercase tracking-[0.2em] font-semibold text-luxury-muted-light">
              <tr>
                <th className="py-4 px-6">Código</th>
                <th className="py-4 px-4">Beneficio</th>
                <th className="py-4 px-4">Compra Mínima</th>
                <th className="py-4 px-4">Usos / Límite</th>
                <th className="py-4 px-4">Vigencia</th>
                <th className="py-4 px-4">Estado</th>
                <th className="py-4 px-6 text-right">Acciones</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-luxury-sand/40 dark:divide-luxury-charcoal-light/40">
              {coupons.map((c) => {
                const isExpired = new Date(c.endDate) < new Date();
                const usagePercent = Math.round((c.usedCount / c.usageLimit) * 100);

                return (
                  <tr key={c.id} className="hover:bg-luxury-sand/15 dark:hover:bg-luxury-charcoal-light/30">
                    <td className="py-4 px-6">
                      <span className="font-mono text-sm font-bold tracking-widest text-luxury-gold bg-luxury-gold/10 px-3 py-1 rounded-lg border border-luxury-gold/30 inline-block">
                        {c.code}
                      </span>
                      <span className="text-[11px] text-luxury-muted-light block mt-1 line-clamp-1 font-light">
                        {c.description || "Cupón oficial de descuento"}
                      </span>
                    </td>

                    <td className="py-4 px-4 font-serif text-sm font-bold text-luxury-charcoal dark:text-luxury-ivory">
                      {c.type === "PERCENTAGE" ? `${c.value}% OFF` : `Bs. ${c.value} OFF`}
                    </td>

                    <td className="py-4 px-4 font-medium text-luxury-muted-light">
                      Bs. {c.minPurchase}
                    </td>

                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <span className="font-bold text-luxury-charcoal dark:text-luxury-ivory">
                          {c.usedCount} de {c.usageLimit}
                        </span>
                        <div className="w-24 h-1.5 rounded-full bg-luxury-sand/50 overflow-hidden">
                          <div
                            style={{ width: `${Math.min(100, usagePercent)}%` }}
                            className="h-full bg-luxury-gold rounded-full"
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-luxury-muted-light text-[11px]">
                      {c.startDate} al {c.endDate}
                      {isExpired && (
                        <span className="text-rose-500 font-bold block text-[10px]">Expirado</span>
                      )}
                    </td>

                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleToggle(c.id)}
                        className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider transition-colors ${
                          c.isActive
                            ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                            : "bg-luxury-sand text-luxury-muted-light"
                        }`}
                      >
                        {c.isActive ? "✓ Activo" : "✕ Inactivo"}
                      </button>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setDeleteCoupon(c)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors"
                        title="Eliminar cupón"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {coupons.length === 0 && (
            <div className="p-12 text-center text-luxury-muted-light">
              No hay cupones creados aún.
            </div>
          )}
        </div>
      </div>

      {/* Coupon Modal */}
      <CouponFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCoupon}
      />

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!deleteCoupon}
        title="¿Eliminar Cupón?"
        message={`¿Deseas retirar permanentemente el código '${deleteCoupon?.code}'?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteCoupon(null)}
      />

    </div>
  );
}
