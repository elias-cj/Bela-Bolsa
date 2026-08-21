export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  price: number;
  promotionalPrice?: number | null;
  wholesalePrice: number;
  costPrice: number;
  stock: number;
  minStockAlert: number;
  category: "Elegantes" | "Casual" | "Edición Premium";
  colors: { name: string; hex: string }[];
  images: string[];
  dimensions: string;
  material: string;
  isFeatured: boolean;
  tag?: "Nuevo" | "Edición Limitada" | "Best Seller" | "Exclusivo" | "";
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}

export interface WholesaleTier {
  id: string;
  productId: string;
  minQuantity: number;
  unitPrice: number;
  description?: string;
}

export interface PriceHistoryRecord {
  id: string;
  productId: string;
  productName: string;
  oldPrice: number;
  newPrice: number;
  priceType: "NORMAL" | "PROMOTIONAL" | "WHOLESALE";
  reason: string;
  createdAt: string;
  startDate?: string;
  endDate?: string;
}

export interface AdminPromotion {
  id: string;
  name: string;
  description: string;
  type: "FIXED_BS" | "PERCENTAGE" | "BUY_2_GET_1" | "COMBO" | "FREE_SHIPPING";
  value: number; // e.g. 50 (Bs.) or 20 (%)
  minQuantity?: number;
  freeShipping: boolean;
  applicableProductIds: string[]; // empty = all
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
}

export interface AdminDiscount {
  id: string;
  name: string;
  type: "PERCENTAGE" | "FIXED_BS";
  value: number;
  applyToAll: boolean;
  categoryName?: string;
  productId?: string;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  createdAt: string;
}

export interface AdminCoupon {
  id: string;
  code: string;
  description: string;
  type: "PERCENTAGE" | "FIXED_BS";
  value: number;
  minPurchase: number;
  maxDiscount?: number;
  usageLimit: number;
  usedCount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
}

export interface AdminExpense {
  id: string;
  concept: string;
  category: "MERCADERIA" | "TRANSPORTE" | "PUBLICIDAD" | "ALQUILER" | "SERVICIOS" | "EMPAQUE" | "OTROS";
  amount: number;
  paymentMethod: "CASH" | "QR" | "TRANSFER";
  date: string;
  notes?: string;
  receiptUrl?: string;
  createdAt: string;
}

export interface AdminPayment {
  id: string;
  saleId: string;
  method: "CASH" | "QR" | "TRANSFER";
  amount: number;
  amountReceived?: number;
  changeGiven?: number;
  bank?: string; // "BNB", "Mercantil Santa Cruz", "BCP", "BISA", "Ganadero"
  reference?: string;
  transactionNumber?: string;
  status: "COMPLETED" | "PENDING";
  createdAt: string;
}

export interface AdminSaleItem {
  id: string;
  productId: string;
  productName: string;
  color?: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface AdminSale {
  id: string;
  code: string;
  customerName: string;
  customerPhone: string;
  customerCity: string;
  subtotal: number;
  discountAmount: number;
  couponCode?: string;
  total: number;
  status: "COMPLETED" | "PENDING" | "CANCELLED";
  paymentMethod: "CASH" | "QR" | "TRANSFER";
  paymentDetails?: AdminPayment;
  items: AdminSaleItem[];
  createdAt: string;
  notes?: string;
}

export interface SocialSettings {
  whatsappPhone: string;
  whatsappDefaultMessage: string;
  instagramUrl: string;
  facebookUrl: string;
  tiktokUrl: string;
  websiteUrl: string;
}

// Initial Seed Data
const INITIAL_PRODUCTS: AdminProduct[] = [
  {
    id: "prod-1",
    name: "Élysée Tote No. 1",
    slug: "elysee-tote-no-1",
    subtitle: "Bolso estructurado en cuero graneado italiano",
    description: "Una obra maestra de marroquinería que fusiona una silueta arquitectónica con la suavidad del cuero de becerro selecto. Herrajes con baño de oro pulido de 18k.",
    price: 890,
    promotionalPrice: 840,
    wholesalePrice: 650,
    costPrice: 420,
    stock: 12,
    minStockAlert: 3,
    category: "Edición Premium",
    colors: [
      { name: "Noir Profond", hex: "#1C1C1E" },
      { name: "Caramel Dore", hex: "#9E6D42" },
      { name: "Ivoire Pur", hex: "#F3ECE1" }
    ],
    images: ["/images/carteras/MDC-1-1.jpeg", "/images/carteras/MDC-1-2.jpeg"],
    dimensions: "32 cm × 24 cm × 14 cm",
    material: "100% Cuero Vacuno Italiano de Flor Entera",
    isFeatured: true,
    tag: "Edición Limitada",
    status: "ACTIVE",
    createdAt: "2026-08-01T10:00:00Z",
    updatedAt: "2026-08-15T14:30:00Z"
  },
  {
    id: "prod-2",
    name: "Marquise Flap Bag",
    slug: "marquise-flap-bag",
    subtitle: "Bandolera de lujo con cierre iconográfico dorado",
    description: "Elegancia minimalista diseñada para eventos de alta distinción o veladas sofisticadas. Su cadena deslizable permite lucirla al hombro o cruzada.",
    price: 740,
    promotionalPrice: null,
    wholesalePrice: 540,
    costPrice: 350,
    stock: 8,
    minStockAlert: 3,
    category: "Elegantes",
    colors: [
      { name: "Bordeaux Royal", hex: "#581825" },
      { name: "Noir Classique", hex: "#151516" },
      { name: "Vert Forêt", hex: "#233D2D" }
    ],
    images: ["/images/carteras/MDC-1-2.jpeg", "/images/carteras/MDC-1-3.jpeg"],
    dimensions: "24 cm × 16 cm × 8 cm",
    material: "Cuero Vacuno Liso con Acabado Semibrillante",
    isFeatured: true,
    tag: "Nuevo",
    status: "ACTIVE",
    createdAt: "2026-08-05T11:00:00Z",
    updatedAt: "2026-08-18T09:15:00Z"
  },
  {
    id: "prod-3",
    name: "Solstice Hobo Bag",
    slug: "solstice-hobo-bag",
    subtitle: "Silueta curva vanguardista y textura ultra suave",
    description: "Inspirada en las curvas orgánicas de la naturaleza. Espaciosa, ligera y con una caída escultural impecable.",
    price: 680,
    promotionalPrice: 620,
    wholesalePrice: 490,
    costPrice: 310,
    stock: 2, // Low stock for KPI alerts
    minStockAlert: 4,
    category: "Casual",
    colors: [
      { name: "Sable Chaud", hex: "#D4B996" },
      { name: "Chocolat Noir", hex: "#3B261D" },
      { name: "Blanc Crème", hex: "#FAF5ED" }
    ],
    images: ["/images/carteras/MDC-1-3.jpeg", "/images/carteras/MDC-1-4.jpeg"],
    dimensions: "36 cm × 28 cm × 12 cm",
    material: "Piel Napa Flex de Alta Flexibilidad",
    isFeatured: true,
    tag: "Best Seller",
    status: "ACTIVE",
    createdAt: "2026-08-08T12:00:00Z",
    updatedAt: "2026-08-20T16:00:00Z"
  },
  {
    id: "prod-4",
    name: "Vendôme Satchel",
    slug: "vendome-satchel",
    subtitle: "Estructura formal con asas dobles y candado bañado en oro",
    description: "El epítome del lujo clásico. Cada costura ha sido elaborada a mano por maestros marroquineros siguiendo técnicas tradicionales.",
    price: 950,
    promotionalPrice: null,
    wholesalePrice: 710,
    costPrice: 480,
    stock: 5,
    minStockAlert: 2,
    category: "Edición Premium",
    colors: [
      { name: "Cognac Prestige", hex: "#8A4923" },
      { name: "Noir Intense", hex: "#111112" }
    ],
    images: ["/images/carteras/MDC-1-4.jpeg", "/images/carteras/MDC-1-5.jpeg"],
    dimensions: "30 cm × 22 cm × 13 cm",
    material: "Cuero Box Calf Francés y detalles dorados",
    isFeatured: true,
    tag: "Exclusivo",
    status: "ACTIVE",
    createdAt: "2026-08-10T14:00:00Z",
    updatedAt: "2026-08-19T11:20:00Z"
  },
  {
    id: "prod-5",
    name: "Céleste Mini Crossbody",
    slug: "celeste-mini-crossbody",
    subtitle: "Micro silueta joya para salidas nocturnas y cócteles",
    description: "Una pequeña joya que eleva cualquier atuendo. Su broche de precisión magnética permite llevar lo indispensable.",
    price: 520,
    promotionalPrice: null,
    wholesalePrice: 380,
    costPrice: 240,
    stock: 14,
    minStockAlert: 3,
    category: "Elegantes",
    colors: [
      { name: "Or Métallique", hex: "#C5A880" },
      { name: "Noir Satin", hex: "#1A1A1A" },
      { name: "Rose Poudré", hex: "#E3BEBA" }
    ],
    images: ["/images/carteras/MDC-1-5.jpeg", "/images/carteras/MDC-1-6.jpeg"],
    dimensions: "19 cm × 13 cm × 6 cm",
    material: "Cuero Metalizado / Piel Lisa Premium",
    isFeatured: false,
    tag: "Nuevo",
    status: "ACTIVE",
    createdAt: "2026-08-12T15:00:00Z",
    updatedAt: "2026-08-15T18:00:00Z"
  },
  {
    id: "prod-6",
    name: "Riviera Bucket Bag",
    slug: "riviera-bucket-bag",
    subtitle: "Diseño cilíndrico contemporáneo con cordón ajustable",
    description: "El equilibrio idóneo entre el espíritu bohemio de la Riviera y la sastrería urbana moderna.",
    price: 610,
    promotionalPrice: null,
    wholesalePrice: 450,
    costPrice: 290,
    stock: 1, // Critical stock alert
    minStockAlert: 3,
    category: "Casual",
    colors: [
      { name: "Terracotta", hex: "#BD5338" },
      { name: "Kaki Olive", hex: "#5B5F45" },
      { name: "Camel", hex: "#A8764B" }
    ],
    images: ["/images/carteras/MDC-1-6.jpeg", "/images/carteras/MDC-1-7.jpeg"],
    dimensions: "22 cm × 26 cm × 15 cm",
    material: "Cuero Graneado Hidrófugo",
    isFeatured: false,
    tag: "Nuevo",
    status: "ACTIVE",
    createdAt: "2026-08-14T09:00:00Z",
    updatedAt: "2026-08-17T12:00:00Z"
  },
  {
    id: "prod-7",
    name: "Opéra Clutch de Soirée",
    slug: "opera-clutch-de-soiree",
    subtitle: "Sobre rígido con acabados en dorado mate",
    description: "Diseñado para galas, bodas y ocasiones memorables. Marco metálico bañado en oro cepillado.",
    price: 580,
    promotionalPrice: null,
    wholesalePrice: 420,
    costPrice: 270,
    stock: 6,
    minStockAlert: 2,
    category: "Elegantes",
    colors: [
      { name: "Noir Minuit", hex: "#0E0E10" },
      { name: "Émeraude Sombre", hex: "#143D30" }
    ],
    images: ["/images/carteras/MDC-1-7.jpeg", "/images/carteras/MDC-1-8.jpeg"],
    dimensions: "26 cm × 14 cm × 4.5 cm",
    material: "Cuero Rígido Forrado",
    isFeatured: false,
    tag: "Exclusivo",
    status: "ACTIVE",
    createdAt: "2026-08-15T16:00:00Z",
    updatedAt: "2026-08-18T17:30:00Z"
  },
  {
    id: "prod-8",
    name: "Palais Royal Shoulder Bag",
    slug: "palais-royal-shoulder-bag",
    subtitle: "Silueta baguette atemporal con asa esculpida",
    description: "La silueta icónica de los 90s reinventada con proporciones maestras. Un homenaje a la sofisticación parisina.",
    price: 790,
    promotionalPrice: null,
    wholesalePrice: 580,
    costPrice: 380,
    stock: 9,
    minStockAlert: 3,
    category: "Edición Premium",
    colors: [
      { name: "Café au Lait", hex: "#B39276" },
      { name: "Noir Onyx", hex: "#161616" }
    ],
    images: ["/images/carteras/MDC-1-8.jpeg", "/images/carteras/MDC-1-9.jpeg"],
    dimensions: "28 cm × 15 cm × 7 cm",
    material: "Cuero Italiano Vegetal",
    isFeatured: true,
    tag: "Best Seller",
    status: "ACTIVE",
    createdAt: "2026-08-16T11:00:00Z",
    updatedAt: "2026-08-20T10:00:00Z"
  }
];

const INITIAL_EXPENSES: AdminExpense[] = [
  {
    id: "exp-1",
    concept: "Importación Cueros Flor Entera (Lote Italia)",
    category: "MERCADERIA",
    amount: 14500,
    paymentMethod: "TRANSFER",
    date: "2026-08-02",
    notes: "Factura N° 8491 - Proveedor Maroquinerie Milano",
    createdAt: "2026-08-02T10:00:00Z"
  },
  {
    id: "exp-2",
    concept: "Campaña Publicitaria Meta & TikTok Ads (Agosto)",
    category: "PUBLICIDAD",
    amount: 3200,
    paymentMethod: "QR",
    date: "2026-08-06",
    notes: "Campaña Colección Élysée y Solstice en Santa Cruz y La Paz",
    createdAt: "2026-08-06T14:00:00Z"
  },
  {
    id: "exp-3",
    concept: "Alquiler Showroom Equipetrol (Mes de Agosto)",
    category: "ALQUILER",
    amount: 4800,
    paymentMethod: "TRANSFER",
    date: "2026-08-01",
    notes: "Contrato anual - Recibo N° 2026-08",
    createdAt: "2026-08-01T09:00:00Z"
  },
  {
    id: "exp-4",
    concept: "Envíos Nacionales Courier Express (La Paz, Cbba, Sucre)",
    category: "TRANSPORTE",
    amount: 1420,
    paymentMethod: "QR",
    date: "2026-08-14",
    notes: "28 despachos prioritarios con seguro",
    createdAt: "2026-08-14T17:00:00Z"
  },
  {
    id: "exp-5",
    concept: "Cajas Rígidas Luxury y Bolsas Guardapolvo de Seda",
    category: "EMPAQUE",
    amount: 2100,
    paymentMethod: "CASH",
    date: "2026-08-10",
    notes: "Lote de 200 cajas personalizadas en pan de oro",
    createdAt: "2026-08-10T11:30:00Z"
  }
];

const INITIAL_SALES: AdminSale[] = [
  {
    id: "sale-1",
    code: "VEN-2026-101",
    customerName: "Valeria Montes de Oca",
    customerPhone: "70891234",
    customerCity: "Santa Cruz",
    subtotal: 890,
    discountAmount: 50,
    couponCode: "BIENVENIDA10",
    total: 840,
    status: "COMPLETED",
    paymentMethod: "QR",
    paymentDetails: {
      id: "pay-1",
      saleId: "sale-1",
      method: "QR",
      amount: 840,
      bank: "Banco Nacional de Bolivia (BNB)",
      reference: "BNB-QR-891244",
      transactionNumber: "TX-992182",
      status: "COMPLETED",
      createdAt: "2026-08-20T14:30:00Z"
    },
    items: [
      {
        id: "item-1",
        productId: "prod-1",
        productName: "Élysée Tote No. 1",
        color: "Caramel Dore",
        quantity: 1,
        unitPrice: 890,
        subtotal: 890
      }
    ],
    createdAt: "2026-08-20T14:30:00Z",
    notes: "Envío urgente a Equipetrol"
  },
  {
    id: "sale-2",
    code: "VEN-2026-102",
    customerName: "Camila Arancibia",
    customerPhone: "77234512",
    customerCity: "La Paz",
    subtotal: 740,
    discountAmount: 0,
    total: 740,
    status: "COMPLETED",
    paymentMethod: "QR",
    paymentDetails: {
      id: "pay-2",
      saleId: "sale-2",
      method: "QR",
      amount: 740,
      bank: "Banco Mercantil Santa Cruz (BMSC)",
      reference: "BMSC-QR-331201",
      transactionNumber: "TX-440219",
      status: "COMPLETED",
      createdAt: "2026-08-20T11:15:00Z"
    },
    items: [
      {
        id: "item-2",
        productId: "prod-2",
        productName: "Marquise Flap Bag",
        color: "Bordeaux Royal",
        quantity: 1,
        unitPrice: 740,
        subtotal: 740
      }
    ],
    createdAt: "2026-08-20T11:15:00Z"
  },
  {
    id: "sale-3",
    code: "VEN-2026-103",
    customerName: "Mariana Suárez Rocha",
    customerPhone: "71098234",
    customerCity: "Santa Cruz",
    subtotal: 1470,
    discountAmount: 150,
    total: 1320,
    status: "COMPLETED",
    paymentMethod: "CASH",
    paymentDetails: {
      id: "pay-3",
      saleId: "sale-3",
      method: "CASH",
      amount: 1320,
      amountReceived: 1400,
      changeGiven: 80,
      status: "COMPLETED",
      createdAt: "2026-08-19T18:40:00Z"
    },
    items: [
      {
        id: "item-3",
        productId: "prod-4",
        productName: "Vendôme Satchel",
        color: "Noir Intense",
        quantity: 1,
        unitPrice: 950,
        subtotal: 950
      },
      {
        id: "item-4",
        productId: "prod-5",
        productName: "Céleste Mini Crossbody",
        color: "Or Métallique",
        quantity: 1,
        unitPrice: 520,
        subtotal: 520
      }
    ],
    createdAt: "2026-08-19T18:40:00Z",
    notes: "Compra presencial en Showroom"
  },
  {
    id: "sale-4",
    code: "VEN-2026-104",
    customerName: "Boutique Glamour Tarija (Mayorista)",
    customerPhone: "72983412",
    customerCity: "Tarija",
    subtotal: 5400,
    discountAmount: 600,
    total: 4800,
    status: "COMPLETED",
    paymentMethod: "TRANSFER",
    paymentDetails: {
      id: "pay-4",
      saleId: "sale-4",
      method: "TRANSFER",
      amount: 4800,
      bank: "Banco de Crédito BCP",
      reference: "TRF-BCP-992011",
      status: "COMPLETED",
      createdAt: "2026-08-18T16:00:00Z"
    },
    items: [
      {
        id: "item-5",
        productId: "prod-2",
        productName: "Marquise Flap Bag",
        quantity: 5,
        unitPrice: 540,
        subtotal: 2700
      },
      {
        id: "item-6",
        productId: "prod-3",
        productName: "Solstice Hobo Bag",
        quantity: 5,
        unitPrice: 540,
        subtotal: 2700
      }
    ],
    createdAt: "2026-08-18T16:00:00Z",
    notes: "Pedido Mayorista Nivel 10 Unidades"
  }
];

const INITIAL_PROMOTIONS: AdminPromotion[] = [
  {
    id: "promo-1",
    name: "Lanzamiento Colección Élysée",
    description: "Descuento especial de 50 Bs. en compras superiores a 800 Bs.",
    type: "FIXED_BS",
    value: 50,
    minQuantity: 1,
    freeShipping: true,
    applicableProductIds: ["prod-1", "prod-4"],
    startDate: "2026-08-01",
    endDate: "2026-08-31",
    isActive: true,
    createdAt: "2026-08-01T00:00:00Z"
  },
  {
    id: "promo-2",
    name: "Dúo Sofisticado (Combo)",
    description: "Lleva una cartera Edición Premium y obtén 20% de descuento en una bandolera",
    type: "PERCENTAGE",
    value: 20,
    minQuantity: 2,
    freeShipping: true,
    applicableProductIds: [],
    startDate: "2026-08-10",
    endDate: "2026-09-10",
    isActive: true,
    createdAt: "2026-08-10T00:00:00Z"
  }
];

const INITIAL_COUPONS: AdminCoupon[] = [
  {
    id: "coup-1",
    code: "BIENVENIDA10",
    description: "Cupón para primeras compras de clientas VIP",
    type: "PERCENTAGE",
    value: 10,
    minPurchase: 400,
    maxDiscount: 150,
    usageLimit: 100,
    usedCount: 28,
    startDate: "2026-08-01",
    endDate: "2026-12-31",
    isActive: true,
    createdAt: "2026-08-01T00:00:00Z"
  },
  {
    id: "coup-2",
    code: "BELALUJO",
    description: "Descuento directo de 100 Bs. en carteras de cuero italiano",
    type: "FIXED_BS",
    value: 100,
    minPurchase: 700,
    maxDiscount: 100,
    usageLimit: 50,
    usedCount: 14,
    startDate: "2026-08-15",
    endDate: "2026-09-15",
    isActive: true,
    createdAt: "2026-08-15T00:00:00Z"
  }
];

const INITIAL_SOCIAL: SocialSettings = {
  whatsappPhone: "59170000000",
  whatsappDefaultMessage: "Hola, quiero información y catálogo de carteras de Bela Bolsa.",
  instagramUrl: "https://instagram.com/belabolsa.bo",
  facebookUrl: "https://facebook.com/belabolsa.bo",
  tiktokUrl: "https://tiktok.com/@belabolsa.bo",
  websiteUrl: "https://belabolsa.bo"
};

// Global in-memory and state store
class AdminStore {
  private products: AdminProduct[] = [...INITIAL_PRODUCTS];
  private sales: AdminSale[] = [...INITIAL_SALES];
  private expenses: AdminExpense[] = [...INITIAL_EXPENSES];
  private promotions: AdminPromotion[] = [...INITIAL_PROMOTIONS];
  private coupons: AdminCoupon[] = [...INITIAL_COUPONS];
  private priceHistories: PriceHistoryRecord[] = [];
  private social: SocialSettings = { ...INITIAL_SOCIAL };

  // ==================== PRODUCTS ====================
  getProducts(): AdminProduct[] {
    return this.products;
  }

  getProductById(id: string): AdminProduct | undefined {
    return this.products.find((p) => p.id === id);
  }

  createProduct(data: Omit<AdminProduct, "id" | "createdAt" | "updatedAt">): AdminProduct {
    const newProduct: AdminProduct = {
      ...data,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.products.unshift(newProduct);
    return newProduct;
  }

  updateProduct(id: string, data: Partial<AdminProduct>): AdminProduct | null {
    const idx = this.products.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    
    // Check if price changed to record in PriceHistory
    if (data.price !== undefined && data.price !== this.products[idx].price) {
      this.recordPriceChange({
        productId: id,
        productName: this.products[idx].name,
        oldPrice: this.products[idx].price,
        newPrice: data.price,
        priceType: "NORMAL",
        reason: "Actualización manual de precio normal",
      });
    }

    this.products[idx] = {
      ...this.products[idx],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return this.products[idx];
  }

  deleteProduct(id: string): boolean {
    const initialLen = this.products.length;
    this.products = this.products.filter((p) => p.id !== id);
    return this.products.length < initialLen;
  }

  // ==================== PRICE MANAGEMENT ====================
  recordPriceChange(data: Omit<PriceHistoryRecord, "id" | "createdAt">): PriceHistoryRecord {
    const record: PriceHistoryRecord = {
      ...data,
      id: `ph-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.priceHistories.unshift(record);
    return record;
  }

  getPriceHistories(): PriceHistoryRecord[] {
    return this.priceHistories;
  }

  bulkUpdatePrices(category: string, percentageChange: number, reason: string): number {
    let count = 0;
    this.products.forEach((prod) => {
      if (category === "TODAS" || prod.category === category) {
        const oldPrice = prod.price;
        const newPrice = Math.round(oldPrice * (1 + percentageChange / 100));
        prod.price = newPrice;
        prod.updatedAt = new Date().toISOString();
        this.recordPriceChange({
          productId: prod.id,
          productName: prod.name,
          oldPrice,
          newPrice,
          priceType: "NORMAL",
          reason: `Ajuste masivo ${percentageChange > 0 ? "+" : ""}${percentageChange}%: ${reason}`,
        });
        count++;
      }
    });
    return count;
  }

  // ==================== EXPENSES ====================
  getExpenses(): AdminExpense[] {
    return this.expenses;
  }

  createExpense(data: Omit<AdminExpense, "id" | "createdAt">): AdminExpense {
    const exp: AdminExpense = {
      ...data,
      id: `exp-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.expenses.unshift(exp);
    return exp;
  }

  deleteExpense(id: string): boolean {
    const len = this.expenses.length;
    this.expenses = this.expenses.filter((e) => e.id !== id);
    return this.expenses.length < len;
  }

  // ==================== SALES & PAYMENTS ====================
  getSales(): AdminSale[] {
    return this.sales;
  }

  createSale(data: Omit<AdminSale, "id" | "code" | "createdAt">): AdminSale {
    const count = this.sales.length + 101;
    const sale: AdminSale = {
      ...data,
      id: `sale-${Date.now()}`,
      code: `VEN-2026-${count}`,
      createdAt: new Date().toISOString(),
    };

    // Deduct inventory
    sale.items.forEach((item) => {
      const prod = this.products.find((p) => p.id === item.productId);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - item.quantity);
      }
    });

    this.sales.unshift(sale);
    return sale;
  }

  // ==================== PROMOTIONS ====================
  getPromotions(): AdminPromotion[] {
    return this.promotions;
  }

  createPromotion(data: Omit<AdminPromotion, "id" | "createdAt">): AdminPromotion {
    const promo: AdminPromotion = {
      ...data,
      id: `promo-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.promotions.unshift(promo);
    return promo;
  }

  togglePromotion(id: string): boolean {
    const p = this.promotions.find((item) => item.id === id);
    if (p) {
      p.isActive = !p.isActive;
      return true;
    }
    return false;
  }

  deletePromotion(id: string): boolean {
    const len = this.promotions.length;
    this.promotions = this.promotions.filter((p) => p.id !== id);
    return this.promotions.length < len;
  }

  // ==================== COUPONS ====================
  getCoupons(): AdminCoupon[] {
    return this.coupons;
  }

  createCoupon(data: Omit<AdminCoupon, "id" | "usedCount" | "createdAt">): AdminCoupon {
    const coup: AdminCoupon = {
      ...data,
      id: `coup-${Date.now()}`,
      usedCount: 0,
      createdAt: new Date().toISOString(),
    };
    this.coupons.unshift(coup);
    return coup;
  }

  toggleCoupon(id: string): boolean {
    const c = this.coupons.find((item) => item.id === id);
    if (c) {
      c.isActive = !c.isActive;
      return true;
    }
    return false;
  }

  deleteCoupon(id: string): boolean {
    const len = this.coupons.length;
    this.coupons = this.coupons.filter((c) => c.id !== id);
    return this.coupons.length < len;
  }

  // ==================== SOCIAL & SETTINGS ====================
  getSocialSettings(): SocialSettings {
    return this.social;
  }

  updateSocialSettings(data: Partial<SocialSettings>): SocialSettings {
    this.social = { ...this.social, ...data };
    return this.social;
  }

  // ==================== DASHBOARD ANALYTICS ====================
  getKPIs() {
    const todayStr = new Date().toISOString().slice(0, 10);
    const todaySales = this.sales.filter((s) => s.createdAt.slice(0, 10) === todayStr);

    const totalIncome = this.sales.reduce((acc, s) => acc + s.total, 0);
    const totalExpenses = this.expenses.reduce((acc, e) => acc + e.amount, 0);
    const netProfit = totalIncome - totalExpenses;

    const totalProductsSold = this.sales.reduce((acc, s) => {
      return acc + s.items.reduce((sum, item) => sum + item.quantity, 0);
    }, 0);

    const todayIncome = todaySales.reduce((acc, s) => acc + s.total, 0);
    const todayUnits = todaySales.reduce((acc, s) => {
      return acc + s.items.reduce((sum, item) => sum + item.quantity, 0);
    }, 0);

    return {
      todayIncome,
      todaySalesCount: todaySales.length,
      todayUnits,
      monthIncome: totalIncome,
      monthSalesCount: this.sales.length,
      totalProductsSold,
      totalExpenses,
      netProfit,
      profitMargin: totalIncome > 0 ? Math.round((netProfit / totalIncome) * 100) : 0,
    };
  }

  getMonthlySalesData() {
    return [
      { month: "Mar", sales: 12400, expenses: 8200, profit: 4200 },
      { month: "Abr", sales: 15800, expenses: 9500, profit: 6300 },
      { month: "May", sales: 22100, expenses: 11400, profit: 10700 },
      { month: "Jun", sales: 18900, expenses: 10100, profit: 8800 },
      { month: "Jul", sales: 26400, expenses: 13200, profit: 13200 },
      { month: "Ago (Act)", sales: 31200, expenses: 14800, profit: 16400 },
    ];
  }

  getPaymentMethodPercentages() {
    const qrCount = this.sales.filter((s) => s.paymentMethod === "QR").length;
    const cashCount = this.sales.filter((s) => s.paymentMethod === "CASH").length;
    const transferCount = this.sales.filter((s) => s.paymentMethod === "TRANSFER").length;
    const total = this.sales.length || 1;

    return {
      qr: Math.round((qrCount / total) * 100),
      cash: Math.round((cashCount / total) * 100),
      transfer: Math.round((transferCount / total) * 100),
      raw: { qrCount, cashCount, transferCount, total },
    };
  }

  getCategoryDistribution() {
    const categories: Record<string, number> = {
      Elegantes: 0,
      Casual: 0,
      "Edición Premium": 0,
    };

    this.sales.forEach((s) => {
      s.items.forEach((item) => {
        const prod = this.products.find((p) => p.id === item.productId);
        if (prod && categories[prod.category] !== undefined) {
          categories[prod.category] += item.subtotal;
        }
      });
    });

    return categories;
  }

  getLowStockAlerts() {
    return this.products.filter((p) => p.stock <= p.minStockAlert);
  }
}

// Global Singleton Store
export const adminStore = new AdminStore();
