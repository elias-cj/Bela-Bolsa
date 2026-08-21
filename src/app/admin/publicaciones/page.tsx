"use client";

import React, { useState } from "react";
import Image from "next/image";
import { adminStore, AdminProduct } from "@/lib/admin-data";
import { ProductFormModal } from "@/components/admin/ProductFormModal";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { useToast } from "@/components/admin/Toast";

export default function AdminPublicacionesPage() {
  const { success, info } = useToast();
  const [, setRefresh] = useState(0);

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("TODAS");
  const [filterStatus, setFilterStatus] = useState("TODOS");
  const [sortBy, setSortBy] = useState<"name" | "price" | "stock">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [deleteConfirmProduct, setDeleteConfirmProduct] = useState<AdminProduct | null>(null);

  const allProducts = adminStore.getProducts();

  // Filters and sorting
  const filteredProducts = allProducts
    .filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.tag?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        filterCategory === "TODAS" || p.category === filterCategory;

      const matchesStatus =
        filterStatus === "TODOS" || p.status === filterStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === "name") comparison = a.name.localeCompare(b.name);
      if (sortBy === "price") comparison = a.price - b.price;
      if (sortBy === "stock") comparison = a.stock - b.stock;
      return sortOrder === "asc" ? comparison : -comparison;
    });

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: AdminProduct) => {
    setEditingProduct(p);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (data: Partial<AdminProduct>) => {
    if (editingProduct) {
      adminStore.updateProduct(editingProduct.id, data);
      success("Publicación actualizada", `Se guardaron los cambios para ${data.name}`);
    } else {
      adminStore.createProduct(data as any);
      success("Nueva cartera publicada", `Se añadió ${data.name} al catálogo oficial`);
    }
    setRefresh((r) => r + 1);
  };

  const handleToggleStatus = (p: AdminProduct) => {
    const nextStatus = p.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    adminStore.updateProduct(p.id, { status: nextStatus });
    setRefresh((r) => r + 1);
    info(
      `Estado modificado`,
      `${p.name} ahora está ${nextStatus === "ACTIVE" ? "Visible" : "Oculto"}`
    );
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmProduct) {
      adminStore.deleteProduct(deleteConfirmProduct.id);
      success("Publicación eliminada", `La cartera ${deleteConfirmProduct.name} fue retirada`);
      setDeleteConfirmProduct(null);
      setRefresh((r) => r + 1);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light shadow-luxury-sm">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold font-semibold block mb-1">
            Catálogo & Inventario
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-luxury-charcoal dark:text-luxury-ivory font-normal">
            Gestión de Publicaciones ({allProducts.length})
          </h1>
          <p className="text-xs sm:text-sm text-luxury-muted-light dark:text-luxury-muted-dark font-light mt-1">
            Administra carteras, galerías de fotos, precios mayoristas y stock disponible.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-luxury-gold text-luxury-charcoal-black text-xs font-semibold uppercase tracking-[0.2em] hover:bg-luxury-gold-shimmer shadow-luxury-gold transition-all"
        >
          <span className="text-base font-bold">+</span>
          <span>Nueva Publicación</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-5 rounded-3xl bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light shadow-luxury-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-grow max-w-md">
          <svg className="w-4 h-4 text-luxury-gold absolute left-3.5 top-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre, categoría o etiqueta..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs text-luxury-charcoal dark:text-white focus:outline-none focus:ring-2 focus:ring-luxury-gold/40"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3.5 py-2 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs font-medium"
          >
            <option value="TODAS">Todas las Categorías</option>
            <option value="Edición Premium">Edición Premium</option>
            <option value="Elegantes">Elegantes</option>
            <option value="Casual">Casual</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3.5 py-2 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs font-medium"
          >
            <option value="TODOS">Todos los Estados</option>
            <option value="ACTIVE">Activos (Visibles)</option>
            <option value="INACTIVE">Inactivos (Ocultos)</option>
          </select>

          {/* Sorting */}
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [sb, so] = e.target.value.split("-");
              setSortBy(sb as any);
              setSortOrder(so as any);
            }}
            className="px-3.5 py-2 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs font-medium"
          >
            <option value="name-asc">Nombre (A-Z)</option>
            <option value="price-desc">Precio (Mayor a menor)</option>
            <option value="price-asc">Precio (Menor a mayor)</option>
            <option value="stock-desc">Stock (Mayor stock)</option>
            <option value="stock-asc">Stock (Poco stock)</option>
          </select>
        </div>

      </div>

      {/* Publications Table */}
      <div className="rounded-3xl bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light shadow-luxury-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-luxury-sand/30 dark:bg-luxury-charcoal-light/60 border-b border-luxury-sand/60 dark:border-luxury-charcoal-light text-[10px] uppercase tracking-[0.2em] font-semibold text-luxury-muted-light dark:text-luxury-muted-dark">
              <tr>
                <th className="py-4 px-6">Cartera</th>
                <th className="py-4 px-4">Categoría</th>
                <th className="py-4 px-4">Precio Normal</th>
                <th className="py-4 px-4">P. Mayorista</th>
                <th className="py-4 px-4">Stock</th>
                <th className="py-4 px-4">Colores</th>
                <th className="py-4 px-4">Estado</th>
                <th className="py-4 px-6 text-right">Acciones</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-luxury-sand/40 dark:divide-luxury-charcoal-light/40">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-luxury-sand/20 dark:hover:bg-luxury-charcoal-light/30 transition-colors">
                  
                  {/* Thumbnail & Name */}
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3.5">
                      <div className="relative w-12 h-14 rounded-xl overflow-hidden bg-luxury-sand/30 flex-shrink-0 border border-luxury-sand/50">
                        <Image src={p.images[0] || "/images/carteras/MDC-1-1.jpeg"} alt={p.name} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-serif text-sm text-luxury-charcoal dark:text-luxury-ivory font-medium">
                            {p.name}
                          </h4>
                          {p.tag && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-semibold bg-luxury-gold/15 text-luxury-gold">
                              {p.tag}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-luxury-muted-light dark:text-luxury-muted-dark line-clamp-1 font-light">
                          {p.subtitle}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-4 text-luxury-charcoal dark:text-luxury-ivory font-medium">
                    {p.category}
                  </td>

                  {/* Normal Price */}
                  <td className="py-4 px-4 font-serif text-sm font-semibold text-luxury-gold">
                    Bs. {p.price.toLocaleString("es-BO")}
                    {p.promotionalPrice && (
                      <span className="block text-[10px] text-emerald-600 font-sans font-normal">
                        Promo: Bs. {p.promotionalPrice}
                      </span>
                    )}
                  </td>

                  {/* Wholesale Price */}
                  <td className="py-4 px-4 font-semibold text-luxury-charcoal dark:text-luxury-ivory">
                    Bs. {p.wholesalePrice.toLocaleString("es-BO")}
                  </td>

                  {/* Stock with Warning */}
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        p.stock <= p.minStockAlert
                          ? "bg-rose-500/15 text-rose-600 dark:text-rose-400"
                          : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                      }`}
                    >
                      {p.stock} un.
                    </span>
                  </td>

                  {/* Colors Swatches */}
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-1">
                      {p.colors.map((c, i) => (
                        <span
                          key={i}
                          className="w-3.5 h-3.5 rounded-full border border-black/20"
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </td>

                  {/* Status Toggle */}
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleToggleStatus(p)}
                      className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold transition-colors ${
                        p.status === "ACTIVE"
                          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-rose-500/15 hover:text-rose-600"
                          : "bg-luxury-sand dark:bg-luxury-charcoal-light text-luxury-muted-light hover:bg-emerald-500/15 hover:text-emerald-600"
                      }`}
                    >
                      {p.status === "ACTIVE" ? "✓ Activo" : "✕ Inactivo"}
                    </button>
                  </td>

                  {/* Actions (Edit / Delete) */}
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="p-2 rounded-xl bg-luxury-sand/30 dark:bg-luxury-charcoal-light hover:bg-luxury-gold hover:text-white text-luxury-charcoal dark:text-luxury-ivory transition-colors"
                      title="Editar publicación"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => setDeleteConfirmProduct(p)}
                      className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-600 hover:text-white text-rose-600 transition-colors"
                      title="Eliminar publicación"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="p-12 text-center text-luxury-muted-light dark:text-luxury-muted-dark">
              No se encontraron carteras con los filtros seleccionados.
            </div>
          )}
        </div>
      </div>

      {/* Product Form Modal (Create / Edit) */}
      <ProductFormModal
        isOpen={isModalOpen}
        product={editingProduct}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteConfirmProduct}
        title="¿Eliminar Cartera?"
        message={`¿Estás segura de retirar '${deleteConfirmProduct?.name}' del catálogo? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar Definitivamente"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirmProduct(null)}
      />

    </div>
  );
}
