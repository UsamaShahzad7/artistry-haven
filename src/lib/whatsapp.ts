import type { CartItem } from "./cart";

export function buildWhatsAppUrl(items: CartItem[]): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  const lines = items.map(
    (i) => `• ${i.name} × ${i.quantity} — Rs. ${(i.price * i.quantity).toLocaleString()}`
  );
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const message = [
    "Order from The Artistry Haven:",
    ...lines,
    `Total: Rs. ${total.toLocaleString()}`,
  ].join("\n");

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
