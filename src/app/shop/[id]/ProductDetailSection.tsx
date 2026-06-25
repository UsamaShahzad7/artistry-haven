"use client";

import { motion } from "framer-motion";
import { useCart } from "@/lib/CartContext";
import type { Product } from "@/components/public/ProductCard";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" },
});

export default function ProductDetailSection({ product }: { product: Product }) {
  const { add } = useCart();

  const handleAdd = () => {
    add({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] ?? "",
    });
  };

  const displayPrice = `Rs. ${product.price.toLocaleString()}`;
  const categoryLabel =
    product.category === "keychain" ? "Keychain · Resin Art" : "Canvas · Resin Art";

  return (
    <div className="w-full lg:w-[45%] flex flex-col gap-5 py-2">
      {/* Category chip */}
      <motion.div {...fadeUp(0.1)}>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blush-100 border border-blush-300 font-body text-xs text-text-muted tracking-widest uppercase">
          ✦ {categoryLabel}
        </span>
      </motion.div>

      {/* Name */}
      <motion.h1
        {...fadeUp(0.2)}
        className="font-display text-text-deep text-4xl md:text-5xl font-light leading-snug"
      >
        {product.name}
      </motion.h1>

      {/* Diamond divider */}
      <motion.div {...fadeUp(0.3)} className="flex items-center gap-3">
        <div className="flex-1 h-px bg-blush-300" />
        <span className="text-blush-300 text-sm">◆</span>
        <div className="flex-1 h-px bg-blush-300" />
      </motion.div>

      {/* Price */}
      <motion.p {...fadeUp(0.35)} className="font-display text-rose-gold text-3xl font-medium">
        {displayPrice}
      </motion.p>

      {/* Description */}
      {product.description && (
        <motion.p
          {...fadeUp(0.45)}
          className="font-body text-text-muted text-sm leading-relaxed"
        >
          {product.description}
        </motion.p>
      )}

      {/* Stock + CTA */}
      <motion.div {...fadeUp(0.55)} className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          {product.in_stock ? (
            <>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="font-body text-sm text-emerald-700 font-medium">
                In Stock — Ready to Ship
              </span>
            </>
          ) : (
            <>
              <span className="h-2.5 w-2.5 rounded-full bg-text-muted inline-block" />
              <span className="font-body text-sm text-text-muted">Currently Unavailable</span>
            </>
          )}
        </div>

        {product.in_stock ? (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleAdd}
            className="btn-shimmer relative overflow-hidden w-full py-4 bg-rose-gold hover:bg-rose-gold-dark text-white font-body font-semibold text-sm tracking-widest uppercase rounded-full transition-colors duration-300"
          >
            Add to Cart
          </motion.button>
        ) : (
          <div className="w-full py-4 bg-blush-100 text-text-muted font-body text-sm text-center rounded-full border border-blush-300">
            Sold Out
          </div>
        )}

        <p className="font-body text-xs text-text-muted italic text-center">
          or DM us on{" "}
          <a
            href="https://instagram.com/artistryhaven._"
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose-gold hover:text-rose-gold-dark underline underline-offset-2 transition-colors"
          >
            Instagram @artistryhaven._
          </a>
        </p>
      </motion.div>

      {/* Artisan badges */}
      <motion.div {...fadeUp(0.65)} className="flex flex-wrap gap-2 pt-1">
        {["✦ Handmade", "✦ Resin Art", "✦ Carefully Packed"].map((badge) => (
          <span
            key={badge}
            className="px-3 py-1.5 bg-blush-50 border border-blush-300 rounded-full font-body text-xs text-text-muted"
          >
            {badge}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
