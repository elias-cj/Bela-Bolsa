"use client";

import React, { useState, useEffect } from "react";
import { AdminProduct } from "@/lib/admin-data";
import Image from "next/image";

interface ProductFormModalProps {
  isOpen: boolean;
  product?: AdminProduct | null;
  onClose: () => void;
  onSave: (data: Partial<AdminProduct>) => void;
}

export function ProductFormModal({
  isOpen,
  product,
  onClose,
  onSave,
}: ProductFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    subtitle: "",
    description: "",
    price: 0,
    promotionalPrice: null as number | null,
    wholesalePrice: 0,
    costPrice: 0,
    stock: 10,
    minStockAlert: 3,
    category: "Edición Premium" as "Elegantes" | "Casual" | "Edición Premium",
    dimensions: "30 cm × 22 cm × 12 cm",
    material: "100% Cuero Vacuno Italiano",
    tag: "" as "Nuevo" | "Edición Limitada" | "Best Seller" | "Exclusivo" | "",
    status: "ACTIVE" as "ACTIVE" | "INACTIVE",
    images: ["/images/carteras/MDC-1-1.jpeg"],
    newImageUrl: "",
    colors: [
      { name: "Noir Classique", hex: "#151516" },
      { name: "Caramel Dore", hex: "#9E6D42" }
    ],
    newColorName: "",
    newColorHex: "#C5A880",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        subtitle: product.subtitle || "",
        description: product.description || "",
        price: product.price,
        promotionalPrice: product.promotionalPrice || null,
        wholesalePrice: product.wholesalePrice || Math.round(product.price * 0.75),
        costPrice: product.costPrice || Math.round(product.price * 0.5),
        stock: product.stock,
        minStockAlert: product.minStockAlert,
        category: product.category,
        dimensions: product.dimensions || "",
        material: product.material || "",
        tag: product.tag || "",
        status: product.status,
        images: product.images || ["/images/carteras/MDC-1-1.jpeg"],
        newImageUrl: "",
        colors: product.colors || [{ name: "Noir", hex: "#1C1C1E" }],
        newColorName: "",
        newColorHex: "#C5A880",
      });
    } else {
      setFormData({
        name: "",
        subtitle: "",
        description: "",
        price: 750,
        promotionalPrice: null,
        wholesalePrice: 560,
        costPrice: 380,
        stock: 8,
        minStockAlert: 3,
        category: "Elegantes",
        dimensions: "28 cm × 18 cm × 10 cm",
        material: "100% Cuero Vacuno de Flor Entera",
        tag: "Nuevo",
        status: "ACTIVE",
        images: ["/images/carteras/MDC-1-2.jpeg"],
        newImageUrl: "",
        colors: [
          { name: "Noir Satin", hex: "#1C1C1E" },
          { name: "Miel Doré", hex: "#C5A880" }
        ],
        newColorName: "",
        newColorHex: "#C5A880",
      });
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleAddColor = () => {
    if (!formData.newColorName) return;
    setFormData((prev) => ({
      ...prev,
      colors: [...prev.colors, { name: prev.newColorName, hex: prev.newColorHex }],
      newColorName: "",
    }));
  };

  const handleRemoveColor = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== idx),
    }));
  };

  const handleAddImage = () => {
    if (!formData.newImageUrl) return;
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, prev.newImageUrl],
      newImageUrl: "",
    }));
  };

  const handleRemoveImage = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    onSave({
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/\s+/g, "-"),
      subtitle: formData.subtitle,
      description: formData.description,
      price: Number(formData.price),
      promotionalPrice: formData.promotionalPrice ? Number(formData.promotionalPrice) : null,
      wholesalePrice: Number(formData.wholesalePrice),
      costPrice: Number(formData.costPrice),
      stock: Number(formData.stock),
      minStockAlert: Number(formData.minStockAlert),
      category: formData.category,
      dimensions: formData.dimensions,
      material: formData.material,
      tag: formData.tag || undefined,
      status: formData.status,
      images: formData.images,
      colors: formData.colors,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white dark:bg-luxury-charcoal rounded-3xl border border-luxury-sand dark:border-luxury-charcoal-light shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-luxury-sand/60 dark:border-luxury-charcoal-light/60 mb-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold font-semibold block">
              Catálogo & Publicaciones
            </span>
            <h3 className="font-serif text-2xl text-luxury-charcoal dark:text-luxury-ivory font-normal">
              {product ? "Editar Cartera" : "Nueva Cartera de Lujo"}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-luxury-sand/30 dark:bg-luxury-charcoal-light flex items-center justify-center text-luxury-charcoal dark:text-luxury-ivory hover:text-luxury-gold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Main Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                Nombre del Modelo *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="ej. Élysée Tote No. 1"
                className="w-full px-4 py-2.5 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand/70 dark:border-luxury-charcoal-light text-xs text-luxury-charcoal dark:text-white focus:outline-none focus:ring-2 focus:ring-luxury-gold/40"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                Categoría *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-4 py-2.5 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand/70 dark:border-luxury-charcoal-light text-xs text-luxury-charcoal dark:text-white focus:outline-none focus:ring-2 focus:ring-luxury-gold/40"
              >
                <option value="Edición Premium">Edición Premium</option>
                <option value="Elegantes">Elegantes</option>
                <option value="Casual">Casual</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
              Subtítulo / Estilo
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              placeholder="ej. Bolso estructurado en cuero graneado italiano"
              className="w-full px-4 py-2.5 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand/70 dark:border-luxury-charcoal-light text-xs text-luxury-charcoal dark:text-white focus:outline-none focus:ring-2 focus:ring-luxury-gold/40"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
              Descripción Editorial de Lujo
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detalles sobre curtido, herrajes de oro y proporciones..."
              className="w-full px-4 py-2.5 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand/70 dark:border-luxury-charcoal-light text-xs text-luxury-charcoal dark:text-white focus:outline-none focus:ring-2 focus:ring-luxury-gold/40"
            />
          </div>

          {/* Pricing Row in Bs. */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light/40 border border-luxury-gold/20">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                Precio Normal (Bs.) *
              </label>
              <input
                type="number"
                required
                min={0}
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-luxury-charcoal border border-luxury-sand dark:border-luxury-charcoal-light text-xs font-semibold text-luxury-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                Precio Mayorista (Bs.)
              </label>
              <input
                type="number"
                min={0}
                value={formData.wholesalePrice}
                onChange={(e) => setFormData({ ...formData, wholesalePrice: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-luxury-charcoal border border-luxury-sand dark:border-luxury-charcoal-light text-xs font-semibold text-luxury-charcoal dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                Costo de Producción (Bs.)
              </label>
              <input
                type="number"
                min={0}
                value={formData.costPrice}
                onChange={(e) => setFormData({ ...formData, costPrice: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-luxury-charcoal border border-luxury-sand dark:border-luxury-charcoal-light text-xs font-semibold text-luxury-muted-light dark:text-luxury-muted-dark focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                Precio Promo (Opcional)
              </label>
              <input
                type="number"
                min={0}
                value={formData.promotionalPrice || ""}
                onChange={(e) => setFormData({ ...formData, promotionalPrice: e.target.value ? Number(e.target.value) : null })}
                placeholder="Sin promo"
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-luxury-charcoal border border-luxury-sand dark:border-luxury-charcoal-light text-xs font-semibold text-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Stock and Tags */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                Stock Disponible *
              </label>
              <input
                type="number"
                required
                min={0}
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand dark:border-luxury-charcoal-light text-xs font-semibold text-luxury-charcoal dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                Alerta Stock Mínimo
              </label>
              <input
                type="number"
                min={1}
                value={formData.minStockAlert}
                onChange={(e) => setFormData({ ...formData, minStockAlert: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand dark:border-luxury-charcoal-light text-xs font-semibold text-luxury-charcoal dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                Etiqueta Especial
              </label>
              <select
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand dark:border-luxury-charcoal-light text-xs"
              >
                <option value="">Ninguna</option>
                <option value="Nuevo">Nuevo</option>
                <option value="Edición Limitada">Edición Limitada</option>
                <option value="Best Seller">Best Seller</option>
                <option value="Exclusivo">Exclusivo</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                Estado
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand dark:border-luxury-charcoal-light text-xs"
              >
                <option value="ACTIVE">Activo en Catálogo</option>
                <option value="INACTIVE">Inactivo / Oculto</option>
              </select>
            </div>
          </div>

          {/* Color Palettes Swatches Manager */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-2">
              Variantes de Color
            </label>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {formData.colors.map((c, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-luxury-sand/30 dark:bg-luxury-charcoal-light border border-luxury-sand dark:border-luxury-charcoal-light text-xs"
                >
                  <span className="w-3.5 h-3.5 rounded-full border border-black/20" style={{ backgroundColor: c.hex }} />
                  <span className="text-luxury-charcoal dark:text-luxury-ivory font-medium">{c.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveColor(i)}
                    className="text-luxury-muted-light hover:text-rose-500 ml-1"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={formData.newColorHex}
                onChange={(e) => setFormData({ ...formData, newColorHex: e.target.value })}
                className="w-8 h-8 rounded-full border-0 cursor-pointer"
              />
              <input
                type="text"
                value={formData.newColorName}
                onChange={(e) => setFormData({ ...formData, newColorName: e.target.value })}
                placeholder="Nombre del tono (ej. Bordeaux Royal)"
                className="px-3 py-1.5 rounded-xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs flex-grow text-luxury-charcoal dark:text-white"
              />
              <button
                type="button"
                onClick={handleAddColor}
                className="px-4 py-1.5 rounded-xl bg-luxury-gold text-luxury-charcoal-black font-semibold text-xs uppercase tracking-wider hover:bg-luxury-gold-shimmer"
              >
                + Añadir Tono
              </button>
            </div>
          </div>

          {/* Images preview & adding */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-2">
              Galería de Imágenes
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
              {formData.images.map((img, i) => (
                <div key={i} className="relative aspect-[4/5] rounded-xl overflow-hidden border border-luxury-sand/60 bg-luxury-sand/30 group">
                  <Image src={img} alt="Product preview" fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(i)}
                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={formData.newImageUrl}
                onChange={(e) => setFormData({ ...formData, newImageUrl: e.target.value })}
                placeholder="Ruta local (/images/products/...) o URL de imagen"
                className="px-3 py-2 rounded-xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs flex-grow text-luxury-charcoal dark:text-white"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="px-4 py-2 rounded-xl bg-luxury-charcoal dark:bg-luxury-gold dark:text-luxury-charcoal-black text-white text-xs font-semibold uppercase tracking-wider"
              >
                + Añadir Foto
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-luxury-sand/60 dark:border-luxury-charcoal-light/60 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-full border border-luxury-sand dark:border-luxury-charcoal-light text-luxury-charcoal dark:text-luxury-ivory text-xs uppercase tracking-wider font-medium hover:bg-luxury-sand/30 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-full bg-luxury-gold text-luxury-charcoal-black text-xs uppercase tracking-[0.2em] font-semibold hover:bg-luxury-gold-shimmer transition-all shadow-luxury-gold"
            >
              {product ? "Guardar Cambios" : "Crear Publicación"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
