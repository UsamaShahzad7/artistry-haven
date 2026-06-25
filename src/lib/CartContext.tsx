"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  type CartItem,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  getCart,
  cartTotal,
  cartCount,
} from "./cart";

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (item: Omit<CartItem, "quantity">) => void;
  remove: (id: string) => void;
  update: (id: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const add = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems(addToCart(item));
    setIsOpen(true);
  }, []);

  const remove = useCallback((id: string) => {
    setItems(removeFromCart(id));
  }, []);

  const update = useCallback((id: string, quantity: number) => {
    setItems(updateQuantity(id, quantity));
  }, []);

  const clear = useCallback(() => {
    setItems(clearCart());
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        count: cartCount(items),
        total: cartTotal(items),
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        add,
        remove,
        update,
        clear,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
