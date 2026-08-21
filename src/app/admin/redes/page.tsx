"use client";

import React, { useState } from "react";
import { adminStore } from "@/lib/admin-data";
import { useToast } from "@/components/admin/Toast";

export default function AdminRedesPage() {
  const { success } = useToast();
  const social = adminStore.getSocialSettings();

  const [whatsappPhone, setWhatsappPhone] = useState(social.whatsappPhone);
  const [whatsappDefaultMessage, setWhatsappDefaultMessage] = useState(social.whatsappDefaultMessage);
  const [instagramUrl, setInstagramUrl] = useState(social.instagramUrl);
  const [facebookUrl, setFacebookUrl] = useState(social.facebookUrl);
  const [tiktokUrl, setTiktokUrl] = useState(social.tiktokUrl);
  const [websiteUrl, setWebsiteUrl] = useState(social.websiteUrl);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    adminStore.updateSocialSettings({
      whatsappPhone,
      whatsappDefaultMessage,
      instagramUrl,
      facebookUrl,
      tiktokUrl,
      websiteUrl,
    });
    success("Canales Actualizados", "Los enlaces sociales y el mensaje de WhatsApp fueron sincronizados.");
  };

  const previewWhatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappDefaultMessage)}`;

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light shadow-luxury-sm">
        <span className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold font-semibold block mb-1">
          Canales & Conversión
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl text-luxury-charcoal dark:text-luxury-ivory font-normal">
          Redes Sociales & Configuración de WhatsApp
        </h1>
        <p className="text-xs sm:text-sm text-luxury-muted-light dark:text-luxury-muted-dark font-light mt-1">
          Personaliza los números de atención al cliente, enlaces oficiales y el mensaje de bienvenida automático.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* WhatsApp Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light shadow-luxury-sm space-y-4">
          <div className="flex items-center space-x-3 pb-3 border-b border-luxury-sand/60 dark:border-luxury-charcoal-light/60">
            <span className="text-2xl">💬</span>
            <div>
              <h3 className="font-serif text-lg text-luxury-charcoal dark:text-luxury-ivory font-medium">
                WhatsApp Concierge (Canal de Conversión Principal)
              </h3>
              <span className="text-xs text-luxury-muted-light">
                Utilizado en los botones de compra de toda la web
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                Número Telefónico (Con código de país 591) *
              </label>
              <input
                type="text"
                required
                value={whatsappPhone}
                onChange={(e) => setWhatsappPhone(e.target.value)}
                placeholder="59170000000"
                className="w-full px-3.5 py-2.5 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs font-mono font-bold text-luxury-charcoal dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                Estado del Canal
              </label>
              <div className="flex items-center space-x-2 pt-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                <span>●</span>
                <span>En línea • Asesoría activa para Bolivia</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
              Mensaje Predeterminado General *
            </label>
            <textarea
              rows={3}
              required
              value={whatsappDefaultMessage}
              onChange={(e) => setWhatsappDefaultMessage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs text-luxury-charcoal dark:text-white focus:outline-none"
            />
          </div>

          {/* WhatsApp Live Link Preview */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs">
            <span className="font-semibold text-emerald-700 dark:text-emerald-300 block mb-1">
              Previsualización de Enlace Generado:
            </span>
            <a
              href={previewWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 break-all underline hover:opacity-80"
            >
              {previewWhatsappUrl}
            </a>
          </div>
        </div>

        {/* Other Social Networks */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-luxury-charcoal border border-luxury-sand/70 dark:border-luxury-charcoal-light shadow-luxury-sm space-y-4">
          <h3 className="font-serif text-lg text-luxury-charcoal dark:text-luxury-ivory font-medium pb-3 border-b border-luxury-sand/60">
            Perfiles en Redes Sociales
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                Instagram
              </label>
              <input
                type="url"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                placeholder="https://instagram.com/belabolsa.bo"
                className="w-full px-3.5 py-2.5 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs text-luxury-charcoal dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                TikTok
              </label>
              <input
                type="url"
                value={tiktokUrl}
                onChange={(e) => setTiktokUrl(e.target.value)}
                placeholder="https://tiktok.com/@belabolsa.bo"
                className="w-full px-3.5 py-2.5 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs text-luxury-charcoal dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                Facebook
              </label>
              <input
                type="url"
                value={facebookUrl}
                onChange={(e) => setFacebookUrl(e.target.value)}
                placeholder="https://facebook.com/belabolsa.bo"
                className="w-full px-3.5 py-2.5 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs text-luxury-charcoal dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-luxury-charcoal dark:text-luxury-ivory mb-1">
                Sitio Web Oficial
              </label>
              <input
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://belabolsa.bo"
                className="w-full px-3.5 py-2.5 rounded-2xl bg-luxury-sand/20 dark:bg-luxury-charcoal-light border border-luxury-sand text-xs text-luxury-charcoal dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3.5 rounded-full bg-luxury-gold text-luxury-charcoal-black text-xs font-semibold uppercase tracking-[0.2em] hover:bg-luxury-gold-shimmer shadow-luxury-gold transition-all"
          >
            Guardar Configuración
          </button>
        </div>

      </form>

    </div>
  );
}
