"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ProductCard, { type Product } from "./ProductCard";

interface FeaturedProductsSectionProps {
  products: Product[];
}

export default function FeaturedProductsSection({ products }: FeaturedProductsSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="featured"
      className="snap-section min-h-screen bg-blush-50 flex flex-col items-center justify-center py-24 px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-14"
      >
        <p className="font-display italic text-rose-gold text-lg tracking-wide mb-3">
          Our Favourites
        </p>
        <h2 className="font-display font-light text-text-deep text-4xl md:text-5xl">
          Handpicked for You
        </h2>
        <div className="w-16 h-px bg-blush-300 mx-auto mt-5" />
      </motion.div>

      {products.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="font-body text-text-muted text-center"
        >
          New pieces coming soon — follow us on Instagram for previews.
        </motion.p>
      ) : (
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.slice(0, 3).map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 * i }}
            >
              <ProductCard product={product} variant="flip" />
            </motion.div>
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.7 }}
        className="mt-14"
      >
        <a
          href="#catalog"
          className="inline-block px-10 py-3.5 border-2 border-rose-gold text-rose-gold font-body font-medium text-sm tracking-widest uppercase hover:bg-rose-gold hover:text-white transition-all duration-300 rounded-full"
        >
          View Full Collection
        </a>
      </motion.div>
    </section>
  );
}
