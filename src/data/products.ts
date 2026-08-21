export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  currency: string;
  colors: ProductColor[];
  category: "Elegantes" | "Casual" | "Edición Premium";
  image: string;
  secondaryImage: string;
  featured: boolean;
  tag?: "Nuevo" | "Edición Limitada" | "Best Seller" | "Exclusivo";
  description: string;
  material: string;
  dimensions: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "bela-elysee",
    name: "Élysée Tote No. 1",
    subtitle: "Bolso estructurado en cuero graneado italiano",
    price: 890,
    currency: "Bs.",
    colors: [
      { name: "Noir Profond", hex: "#1C1C1E" },
      { name: "Caramel Dore", hex: "#9E6D42" },
      { name: "Ivoire Pur", hex: "#F3ECE1" }
    ],
    category: "Edición Premium",
    image: "/images/carteras/MDC-1-1.jpeg",
    secondaryImage: "/images/carteras/MDC-1-2.jpeg",
    featured: true,
    tag: "Edición Limitada",
    description: "Una obra maestra de marroquinería que fusiona una silueta arquitectónica con la suavidad del cuero de becerro selecto. Herrajes con baño de oro pulido de 18k y compartimento interior forrado en gamuza suave.",
    material: "100% Cuero Vacuno Italiano de Flor Entera",
    dimensions: "32 cm × 24 cm × 14 cm"
  },
  {
    id: "bela-marquise",
    name: "Marquise Flap Bag",
    subtitle: "Bandolera de lujo con cierre iconográfico dorado",
    price: 740,
    currency: "Bs.",
    colors: [
      { name: "Bordeaux Royal", hex: "#581825" },
      { name: "Noir Classique", hex: "#151516" },
      { name: "Vert Forêt", hex: "#233D2D" }
    ],
    category: "Elegantes",
    image: "/images/carteras/MDC-1-2.jpeg",
    secondaryImage: "/images/carteras/MDC-1-3.jpeg",
    featured: true,
    tag: "Nuevo",
    description: "Elegancia minimalista diseñada para eventos de alta distinción o veladas sofisticadas. Su cadena deslizable permite lucirla al hombro o cruzada con sublime gracia.",
    material: "Cuero Vacuno Liso con Acabado Semibrillante",
    dimensions: "24 cm × 16 cm × 8 cm"
  },
  {
    id: "bela-solstice",
    name: "Solstice Hobo Bag",
    subtitle: "Silueta curva vanguardista y textura ultra suave",
    price: 680,
    currency: "Bs.",
    colors: [
      { name: "Sable Chaud", hex: "#D4B996" },
      { name: "Chocolat Noir", hex: "#3B261D" },
      { name: "Blanc Crème", hex: "#FAF5ED" }
    ],
    category: "Casual",
    image: "/images/carteras/MDC-1-3.jpeg",
    secondaryImage: "/images/carteras/MDC-1-4.jpeg",
    featured: true,
    tag: "Best Seller",
    description: "Inspirada en las curvas orgánicas de la naturaleza. Espaciosa, ligera y con una caída escultural impecable para acompañar el ritmo dinámico del día a día con total sofisticación.",
    material: "Piel Napa Flex de Alta Flexibilidad",
    dimensions: "36 cm × 28 cm × 12 cm"
  },
  {
    id: "bela-vendome",
    name: "Vendôme Satchel",
    subtitle: "Estructura formal con asas dobles y candado bañado en oro",
    price: 950,
    currency: "Bs.",
    colors: [
      { name: "Cognac Prestige", hex: "#8A4923" },
      { name: "Noir Intense", hex: "#111112" }
    ],
    category: "Edición Premium",
    image: "/images/carteras/MDC-1-4.jpeg",
    secondaryImage: "/images/carteras/MDC-1-5.jpeg",
    featured: true,
    tag: "Exclusivo",
    description: "El epítome del lujo clásico. Cada costura ha sido elaborada a mano por maestros marroquineros siguiendo técnicas tradicionales que garantizan una durabilidad eterna.",
    material: "Cuero Box Calf Francés y detalles metálicos hipoalergénicos",
    dimensions: "30 cm × 22 cm × 13 cm"
  },
  {
    id: "bela-celeste",
    name: "Céleste Mini Crossbody",
    subtitle: "Micro silueta joya para salidas nocturnas y cócteles",
    price: 520,
    currency: "Bs.",
    colors: [
      { name: "Or Métallique", hex: "#C5A880" },
      { name: "Noir Satin", hex: "#1A1A1A" },
      { name: "Rose Poudré", hex: "#E3BEBA" }
    ],
    category: "Elegantes",
    image: "/images/carteras/MDC-1-5.jpeg",
    secondaryImage: "/images/carteras/MDC-1-6.jpeg",
    featured: false,
    tag: "Nuevo",
    description: "Una pequeña joya que eleva cualquier atuendo. Su broche de precisión magnética y proporciones equilibradas permiten llevar lo indispensable con máximo encanto.",
    material: "Cuero Metalizado / Piel Lisa Premium",
    dimensions: "19 cm × 13 cm × 6 cm"
  },
  {
    id: "bela-riviera",
    name: "Riviera Bucket Bag",
    subtitle: "Diseño cilíndrico contemporáneo con cordón ajustable",
    price: 610,
    currency: "Bs.",
    colors: [
      { name: "Terracotta", hex: "#BD5338" },
      { name: "Kaki Olive", hex: "#5B5F45" },
      { name: "Camel", hex: "#A8764B" }
    ],
    category: "Casual",
    image: "/images/carteras/MDC-1-6.jpeg",
    secondaryImage: "/images/carteras/MDC-1-7.jpeg",
    featured: false,
    tag: "Nuevo",
    description: "El equilibrio idóneo entre el espíritu bohemio de la Riviera y la sastrería urbana moderna. Interior amplio con bolsillo de seguridad y forro textil suave.",
    material: "Cuero Graneado Hidrófugo de Primera Calidad",
    dimensions: "22 cm × 26 cm × 15 cm"
  },
  {
    id: "bela-opera",
    name: "Opéra Clutch de Soirée",
    subtitle: "Sobre rígido con acabados en dorado mate y forro de terciopelo",
    price: 580,
    currency: "Bs.",
    colors: [
      { name: "Noir Minuit", hex: "#0E0E10" },
      { name: "Émeraude Sombre", hex: "#143D30" },
      { name: "Bourgogne", hex: "#4A121A" }
    ],
    category: "Elegantes",
    image: "/images/carteras/MDC-1-7.jpeg",
    secondaryImage: "/images/carteras/MDC-1-8.jpeg",
    featured: false,
    tag: "Exclusivo",
    description: "Diseñado para galas, bodas y ocasiones memorables. Marco metálico bañado en oro cepillado y cierre de joya que denota buen gusto impecable.",
    material: "Cuero Rígido Forrado y Marco de Aleación Noble",
    dimensions: "26 cm × 14 cm × 4.5 cm"
  },
  {
    id: "bela-palais",
    name: "Palais Royal Shoulder Bag",
    subtitle: "Silueta baguette atemporal con asa esculpida y detalles artesanales",
    price: 790,
    currency: "Bs.",
    colors: [
      { name: "Café au Lait", hex: "#B39276" },
      { name: "Noir Onyx", hex: "#161616" },
      { name: "Miel Doré", hex: "#C79D58" }
    ],
    category: "Edición Premium",
    image: "/images/carteras/MDC-1-8.jpeg",
    secondaryImage: "/images/carteras/MDC-1-9.jpeg",
    featured: true,
    tag: "Best Seller",
    description: "La silueta icónica de los 90s reinventada con proporciones maestras. Un homenaje a la sofisticación parisina que se ajusta a la perfección bajo el hombro.",
    material: "Cuero Italiano de Curtido Vegetal Sostenible",
    dimensions: "28 cm × 15 cm × 7 cm"
  },
  {
    id: "bela-heritage",
    name: "Héritage Signature Tote",
    subtitle: "Bolso insignia con acabados artesanales y herrajes pulidos",
    price: 920,
    currency: "Bs.",
    colors: [
      { name: "Noir Prestige", hex: "#111112" },
      { name: "Camel Doré", hex: "#A8764B" }
    ],
    category: "Edición Premium",
    image: "/images/carteras/MDC-1-9.jpeg",
    secondaryImage: "/images/carteras/MDC-1-1.jpeg",
    featured: true,
    tag: "Exclusivo",
    description: "Nuestra creación más representativa. Confeccionada con cueros seleccionados y una arquitectura interior con triple fuelle.",
    material: "100% Cuero Vacuno de Flor Entera con Forro de Gamuza",
    dimensions: "34 cm × 26 cm × 15 cm"
  }
];

export const CATEGORIES_DATA = [
  {
    id: "elegantes",
    name: "Elegantes",
    subtitle: "Siluetas refinadas para ocasiones inolvidables",
    image: "/images/carteras/MDC-1-2.jpeg",
    count: "3 modelos exclusivos",
    filterKey: "Elegantes"
  },
  {
    id: "casual",
    name: "Casual",
    subtitle: "Comodidad suprema sin renunciar a la distinción diaria",
    image: "/images/carteras/MDC-1-3.jpeg",
    count: "2 modelos versátiles",
    filterKey: "Casual"
  },
  {
    id: "edicion-premium",
    name: "Edición Premium",
    subtitle: "Nuestra más alta expresión de marroquinería artesanal",
    image: "/images/carteras/MDC-1-1.jpeg",
    count: "4 creaciones selectas",
    filterKey: "Edición Premium"
  }
];
