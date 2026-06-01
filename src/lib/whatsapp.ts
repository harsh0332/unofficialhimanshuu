/**
 * Shared utility for generating pre-filled WhatsApp deep links.
 * Leverages NEXT_PUBLIC_WHATSAPP_NUMBER or defaults to E.164 Indian format.
 */

export const getWhatsAppNumber = (): string => {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918827736537";
};

export const getWhatsAppLink = (message: string): string => {
  const number = getWhatsAppNumber();
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};
