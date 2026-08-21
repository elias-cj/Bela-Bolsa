export interface Testimonial {
  id: string;
  name: string;
  city: string;
  avatar: string;
  rating: number;
  productPurchased: string;
  comment: string;
  date: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Valeria Montes de Oca",
    city: "Santa Cruz de la Sierra",
    avatar: "/images/testimonials/valeria.jpg",
    rating: 5,
    productPurchased: "Élysée Tote No. 1",
    comment: "La calidad del cuero y los herrajes superaron completamente mis expectativas. Se siente igual o mejor que mis carteras de diseñador internacional. La atención por WhatsApp fue impecable y el envío a Santa Cruz llegó en 24 horas.",
    date: "Hace 2 semanas"
  },
  {
    id: "test-2",
    name: "Camila Arancibia",
    city: "La Paz (Zona Sur)",
    avatar: "/images/testimonials/camila.jpg",
    rating: 5,
    productPurchased: "Marquise Flap Bag",
    comment: "El diseño es sublime, minimalista y extremadamente elegante. La textura del cuero es suave pero mantiene su estructura a la perfección. Es ahora mi cartera favorita para todas mis reuniones de gala.",
    date: "Hace 1 mes"
  },
  {
    id: "test-3",
    name: "Sofía Gutiérrez",
    city: "Cochabamba",
    avatar: "/images/testimonials/sofia.jpg",
    rating: 5,
    productPurchased: "Solstice Hobo Bag",
    comment: "Comprar por WhatsApp fue rapidísimo y muy cómodo. Me enviaron fotos y videos adicionales de los tonos antes de decidirme. El empaque en el que llegó parecía de alta costura parisina. 100% recomendada.",
    date: "Hace 3 semanas"
  }
];
