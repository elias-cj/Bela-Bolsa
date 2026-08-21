export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  aspect: "tall" | "wide" | "square";
  span: string; // Tailwind grid span classes
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Atelier & Artesanía",
    subtitle: "Curtido vegetal y bordes pintados a mano",
    image: "/images/carteras/MDC-1-1.jpeg",
    aspect: "tall",
    span: "col-span-1 md:col-span-2 row-span-2"
  },
  {
    id: "gal-2",
    title: "Silueta Vendôme",
    subtitle: "Textura graneada y proporciones áureas",
    image: "/images/carteras/MDC-1-2.jpeg",
    aspect: "square",
    span: "col-span-1 md:col-span-1 row-span-1"
  },
  {
    id: "gal-3",
    title: "Detalles en Oro 18k",
    subtitle: "Herrajes inoxidables pulidos a espejo",
    image: "/images/carteras/MDC-1-5.jpeg",
    aspect: "wide",
    span: "col-span-1 md:col-span-1 row-span-1"
  },
  {
    id: "gal-4",
    title: "Editorial Otoño / Invierno",
    subtitle: "Lujo discreto para la mujer contemporánea",
    image: "/images/carteras/MDC-1-4.jpeg",
    aspect: "wide",
    span: "col-span-1 md:col-span-2 row-span-1"
  },
  {
    id: "gal-5",
    title: "Paleta Mineral",
    subtitle: "Tonos tierra inspirados en paisajes nobles",
    image: "/images/carteras/MDC-1-3.jpeg",
    aspect: "square",
    span: "col-span-1 md:col-span-1 row-span-1"
  },
  {
    id: "gal-6",
    title: "Esencia de Atelier",
    subtitle: "Cortes maestros y acabados eternos",
    image: "/images/carteras/MDC-1-8.jpeg",
    aspect: "square",
    span: "col-span-1 md:col-span-1 row-span-1"
  }
];
