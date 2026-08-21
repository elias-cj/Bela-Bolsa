import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BELA BOLSA | Carteras Femeninas de Lujo & Alta Marroquinería",
  description: "Descubre la colección exclusiva de carteras femeninas de lujo de Bela Bolsa. Diseños arquitectónicos en cuero italiano de flor entera. Envíos exclusivos a toda Bolivia. Atención personalizada por WhatsApp.",
  keywords: ["carteras de lujo", "bolsos de diseñador", "cuero italiano", "Bela Bolsa Bolivia", "carteras elegantes", "marroquinería fina", "Santa Cruz", "La Paz", "Cochabamba"],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "BELA BOLSA | Colección de Carteras de Lujo",
    description: "Cada cartera cuenta una historia de elegancia y distinción. Pide tu modelo exclusivo directamente por WhatsApp.",
    type: "website",
    locale: "es_BO",
    images: [
      {
        url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85",
        width: 1200,
        height: 630,
        alt: "Bela Bolsa - Colección Exclusiva de Lujo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${playfair.variable} ${cormorant.variable} ${plusJakarta.variable} antialiased selection:bg-luxury-gold/30 selection:text-luxury-charcoal dark:selection:text-white`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
