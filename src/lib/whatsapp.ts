export const WHATSAPP_PHONE = "59170000000";

/**
 * Generates a clean WhatsApp direct link with a pre-filled custom message.
 * @param customMessage Optional custom message text
 * @returns Formatted https://wa.me/... link
 */
export function getWhatsAppLink(customMessage?: string): string {
  const defaultText = "Hola, quiero información sobre sus carteras";
  const message = customMessage || defaultText;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates a WhatsApp product inquiry link
 * @param productName Handbag product name
 * @returns Formatted product WhatsApp link
 */
export function getProductWhatsAppLink(productName: string): string {
  const message = `Hola, me interesa la cartera ${productName}.`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
