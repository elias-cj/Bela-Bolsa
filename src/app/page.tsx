import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturedCollection } from "@/components/FeaturedCollection";
import { EditorialBanner } from "@/components/EditorialBanner";
import { CategoriesSection } from "@/components/CategoriesSection";
import { ValueProps } from "@/components/ValueProps";
import { LuxuryGallery } from "@/components/LuxuryGallery";
import { Testimonials } from "@/components/Testimonials";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-luxury-ivory dark:bg-luxury-charcoal-black transition-colors duration-300">
      {/* 1. Navbar Premium */}
      <Navbar />

      <main className="flex-grow">
        {/* 2. Hero (Pantalla Completa) */}
        <Hero />

        {/* 3. Colección Destacada (8 Productos) */}
        <FeaturedCollection />

        {/* 4. Banner Editorial */}
        <EditorialBanner />

        {/* 5. Categorías (Elegantes, Casual, Edición Premium) */}
        <CategoriesSection />

        {/* 6. ¿Por qué elegirnos? */}
        <ValueProps />

        {/* 7. Galería Luxury */}
        <LuxuryGallery />

        {/* 8. Testimonios */}
        <Testimonials />

        {/* 9. CTA Final */}
        <FinalCTA />
      </main>

      {/* 10. Footer */}
      <Footer />

      {/* Floating Action Button */}
      <FloatingWhatsApp />
    </div>
  );
}
