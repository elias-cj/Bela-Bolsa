"use client";

import React, { useState } from "react";
import { AdminSale, adminStore, AdminProduct } from "@/lib/admin-data";

interface SaleRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (sale: Omit<AdminSale, "id" | "code" | "createdAt">) => void;
}

export function SaleRecordModal({ isOpen, onClose, onSave }: SaleRecordModalProps) {
  const products = adminStore.getProducts();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerCity, setCustomerCity] = useState("Santa Cruz");
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || "");
  const [quantity, setQuantity] = useState(1);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<"QR" | "CASH" | "TRANSFER">("QR");

  // Cash fields
  const [amountReceived, setAmountReceived] = useState<number>(0);

  // QR fields
  const [bank, setBank] = useState("Banco Nacional de Bolivia (BNB)");
  const [reference, setReference] = useState(`QR-${Math.floor(100000 + Math.random() * 900000)}`);
  const [transactionNumber, setTransactionNumber] = useState(`TX-${Math.floor(100000 + Math.random() * 900000)}`);

  if (!isOpen) return null;

  const currentProduct = products.find((p) => p.id === selectedProductId) || products[0];
  const unitPrice = currentProduct ? currentProduct.price : 0;
  const subtotal = unitPrice * quantity;
  const total = Math.max(0, subtotal - discountAmount);
  const changeGiven = paymentMethod === "CASH" && amountReceived >= total ? amountReceived - total : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !currentProduct) return;

    const saleData: Omit<AdminSale, "id" | "code" | "createdAt"> = {
      customerName,
      customerPhone,
      customerCity,
      subtotal,
      discountAmount,
      total,
      status: "COMPLETED",
      paymentMethod,
      items: [
        {
          id: `item-${Date.now()}`,
          productId: currentProduct.id,
          productName: currentProduct.name,
          color: currentProduct.colors[0]?.name || "Original",
          quantity,
          unitPrice,
          subtotal,
        },
      ],
      paymentDetails: {
        id: `pay-${Date.now()}`,
        saleId: "",
        method: paymentMethod,
        amount: total,
        amountReceived: paymentMethod === "CASH" ? Number(amountReceived) : undefined,
        changeGiven: paymentMethod === "CASH" ? Number(changeGiven) : undefined,
        bank: paymentMethod === "QR" ? bank : undefined,
        reference: paymentMethod === "QR" ? reference : undefined,
        transactionNumber: paymentMethod === "QR" ? transactionNumber : undefined,
        status: "COMPLETED",
        createdAt: new Date().toISOString(),
      },
    };

    onSave(saleData);
    setCustomerName("");
    setCustomerPhone("");
    setDiscountAmount(0);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white dark:bg-luxury-charcoal rounded-3xl border border-luxury-sand dark:border-luxury-charcoal-light shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-luxury-sand/60 dark:border-luxury-charcoal-light/60 mb-5">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold font-semibold block">
              Caja & Punto de Venta
            </span>
            <h3 className="font-serif text-2xl text-luxury-charcoal dark:text-luxury-ivory font-normal">
              Registrar Nueva Venta
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
          
          {/* Customer details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                Nombre de la Clienta *
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="ej. Mariana Suárez"
                className="w-full px-3.5 py-2.5 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs text-luxury-charcoal dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                WhatsApp / Teléfono
              </label>
              <input
                type="text"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="ej. 70891234"
                className="w-full px-3.5 py-2.5 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs text-luxury-charcoal dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
              Ciudad de Entrega
            </label>
            <select
              value={customerCity}
              onChange={(e) => setCustomerCity(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs"
            >
              <option value="Santa Cruz">Santa Cruz de la Sierra</option>
              <option value="La Paz">La Paz</option>
              <option value="Cochabamba">Cochabamba</option>
              <option value="Sucre">Sucre</option>
              <option value="Tarija">Tarija</option>
              <option value="Oruro">Oruro</option>
              <option value="Potosí">Potosí</option>
              <option value="Beni">Beni (Trinidad)</option>
              <option value="Pando">Pando (Cobija)</option>
            </select>
          </div>

          {/* Product & Quantity Selection */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light/40 border border-luxury-gold/20">
            <div className="col-span-2">
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                Cartera Seleccionada
              </label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-luxury-charcoal border border-luxury-sand text-xs font-medium"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} - Bs. {p.price} (Stock: {p.stock})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                Cantidad
              </label>
              <input
                type="number"
                min={1}
                max={currentProduct?.stock || 50}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-luxury-charcoal border border-luxury-sand text-xs text-center font-bold"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
              Método de Pago *
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "QR", label: "📱 QR Simple" },
                { id: "CASH", label: "💵 Efectivo" },
                { id: "TRANSFER", label: "🏦 Transferencia" },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id as any)}
                  className={`py-2.5 px-3 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all ${
                    paymentMethod === m.id
                      ? "bg-luxury-gold text-luxury-charcoal-black shadow-md scale-102"
                      : "bg-luxury-sand/30 dark:bg-luxury-charcoal-light text-luxury-charcoal dark:text-luxury-ivory border border-luxury-sand"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Cash Fields (Change Calculator) */}
          {paymentMethod === "CASH" && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-emerald-700 dark:text-emerald-300 mb-1">
                  Monto Recibido (Bs.) *
                </label>
                <input
                  type="number"
                  min={total}
                  value={amountReceived || ""}
                  onChange={(e) => setAmountReceived(Number(e.target.value))}
                  placeholder={`Mínimo: Bs. ${total}`}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-luxury-charcoal border border-emerald-500/40 text-xs font-bold text-emerald-600"
                />
              </div>

              <div className="flex flex-col justify-center">
                <span className="text-[11px] uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                  Cambio / Vuelto a Entregar:
                </span>
                <span className="font-serif text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  Bs. {changeGiven.toLocaleString("es-BO")}
                </span>
              </div>
            </div>
          )}

          {/* Dynamic QR Fields */}
          {paymentMethod === "QR" && (
            <div className="p-4 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light/40 border border-luxury-gold/30 space-y-3">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                  Banco Destino QR *
                </label>
                <select
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-luxury-charcoal border border-luxury-sand text-xs"
                >
                  <option value="Banco Nacional de Bolivia (BNB)">Banco Nacional de Bolivia (BNB)</option>
                  <option value="Banco Mercantil Santa Cruz (BMSC)">Banco Mercantil Santa Cruz (BMSC)</option>
                  <option value="Banco de Crédito (BCP)">Banco de Crédito (BCP)</option>
                  <option value="Banco Ganadero">Banco Ganadero</option>
                  <option value="Banco BISA">Banco BISA</option>
                  <option value="Banco Económico">Banco Económico</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-luxury-muted-light dark:text-luxury-muted-dark mb-1">
                    N° de Referencia QR
                  </label>
                  <input
                    type="text"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-luxury-charcoal border border-luxury-sand text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-luxury-muted-light dark:text-luxury-muted-dark mb-1">
                    N° Transacción / Comprobante
                  </label>
                  <input
                    type="text"
                    value={transactionNumber}
                    onChange={(e) => setTransactionNumber(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-luxury-charcoal border border-luxury-sand text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Discount and Totals Summary */}
          <div className="pt-2 border-t border-luxury-sand/60 dark:border-luxury-charcoal-light/60 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <label className="text-xs uppercase tracking-wider text-luxury-muted-light">Descuento (Bs.):</label>
              <input
                type="number"
                min={0}
                max={subtotal}
                value={discountAmount}
                onChange={(e) => setDiscountAmount(Number(e.target.value))}
                className="w-20 px-2 py-1 rounded-lg bg-luxury-sand/30 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs font-semibold text-center"
              />
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-luxury-muted-light block">Total a Cobrar</span>
              <span className="font-serif text-2xl font-bold text-luxury-gold">
                Bs. {total.toLocaleString("es-BO")}
              </span>
            </div>
          </div>

          <div className="pt-3 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-luxury-sand text-xs font-medium uppercase tracking-wider"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-8 py-2.5 rounded-full bg-luxury-gold text-luxury-charcoal-black text-xs font-semibold uppercase tracking-wider hover:bg-luxury-gold-shimmer shadow-luxury-gold"
            >
              Completar Venta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
