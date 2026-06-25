"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import ProductCard, { type Product } from "./ProductCard";

interface CatalogSectionProps {
  products: Product[];
}

type Filter = "all" | "keychain" | "canvas";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "keychain", label: "Keychains & Charms" },
  { value: "canvas", label: "Canvas Paintings" },
];

export default function CatalogSection({ products }: CatalogSectionProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const filtered =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  return (
    <section ref={ref} id="catalog" className="bg-cream py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="font-display italic text-rose-gold text-lg tracking-wide mb-3">
            Browse
          </p>
          <h2 className="font-display font-light text-text-deep text-4xl md:text-5xl">
            The Full Collection
          </h2>
          <div className="w-16 h-px bg-blush-300 mx-auto mt-5" />
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-2 mb-12 flex-wrap"
        >
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-6 py-2 rounded-full font-body text-sm font-medium transition-all duration-200 border ${
                filter === f.value
                  ? "bg-rose-gold text-white border-rose-gold"
                  : "bg-transparent text-text-muted border-blush-300 hover:border-rose-gold hover:text-rose-gold"
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Products masonry */}
        {filtered.length === 0 ? (
          <p className="font-body text-text-muted text-center py-20">
            No products in this category yet.
          </p>
        ) : (
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="masonry-grid"
          >
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} variant="standard" />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
