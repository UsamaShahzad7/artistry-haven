"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCart } from "@/lib/CartContext";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function CartDrawer() {
  const { items, count, total, isOpen, closeCart, remove, update } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-text-deep/40 z-50 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-blush-50 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-blush-300">
              <h2 className="font-display text-2xl font-medium text-text-deep">
                Your Cart
                {count > 0 && (
                  <span className="font-body text-sm text-text-muted ml-2 font-normal">
                    ({count} {count === 1 ? "item" : "items"})
                  </span>
                )}
              </h2>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="p-2 text-text-muted hover:text-rose-gold transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                  <div className="text-5xl mb-4">🛍️</div>
                  <p className="font-display text-xl text-text-muted italic">
                    Your cart is empty
                  </p>
                  <p className="font-body text-sm text-text-muted mt-2">
                    Add something beautiful to get started
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-white rounded-xl p-3 shadow-sm border border-blush-300/50"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-blush-100">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-base font-medium text-text-deep truncate">
                        {item.name}
                      </p>
                      <p className="font-body text-sm text-rose-gold mt-0.5">
                        Rs. {item.price.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => update(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full border border-blush-300 flex items-center justify-center text-text-deep hover:bg-blush-100 transition-colors font-body text-sm"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="font-body text-sm text-text-deep w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => update(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full border border-blush-300 flex items-center justify-center text-text-deep hover:bg-blush-100 transition-colors font-body text-sm"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => remove(item.id)}
                      aria-label="Remove item"
                      className="self-start p-1.5 text-text-muted hover:text-rose-gold-dark transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M18 6 6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-blush-300 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-body text-text-muted text-sm">Subtotal</span>
                  <span className="font-display text-xl font-medium text-text-deep">
                    Rs. {total.toLocaleString()}
                  </span>
                </div>
                <a
                  href={buildWhatsAppUrl(items)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-body font-semibold text-sm rounded-full transition-colors duration-200"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Order via WhatsApp
                </a>
                <p className="font-body text-xs text-text-muted text-center">
                  You&apos;ll be taken to WhatsApp to complete your order
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
