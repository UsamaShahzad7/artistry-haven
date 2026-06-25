export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CART_KEY = "artistry_haven_cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addToCart(item: Omit<CartItem, "quantity">): CartItem[] {
  const cart = getCart();
  const existing = cart.find((i) => i.id === item.id);
  let updated: CartItem[];
  if (existing) {
    updated = cart.map((i) =>
      i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
    );
  } else {
    updated = [...cart, { ...item, quantity: 1 }];
  }
  saveCart(updated);
  return updated;
}

export function removeFromCart(id: string): CartItem[] {
  const updated = getCart().filter((i) => i.id !== id);
  saveCart(updated);
  return updated;
}

export function updateQuantity(id: string, quantity: number): CartItem[] {
  const updated =
    quantity <= 0
      ? getCart().filter((i) => i.id !== id)
      : getCart().map((i) => (i.id === id ? { ...i, quantity } : i));
  saveCart(updated);
  return updated;
}

export function clearCart(): CartItem[] {
  saveCart([]);
  return [];
}

export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}
