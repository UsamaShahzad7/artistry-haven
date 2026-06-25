"use client";

import { useState } from "react";
import ProductCard from "@/components/public/ProductCard";
import type { Product } from "@/components/public/ProductCard";

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "keychain", label: "Keychains & Charms" },
  { value: "canvas", label: "Canvas Paintings" },
] as const;

type Category = typeof CATEGORIES[number]["value"];

export default function ShopClientSection({ products }: { products: Product[] }) {
  const [active, setActive] = useState<Category>("all");

  const filtered = active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <section className="min-h-screen bg-blush-50 pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p
            className="font-body text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: "var(--rose-gold-warm)" }}
          >
            Handmade with Love
          </p>
          <h1
            className="font-display font-light leading-tight"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              background: "linear-gradient(90deg, #B87878 0%, #C4A882 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Our Collection
          </h1>
          <div className="mt-4 mx-auto h-px w-16" style={{ background: "var(--rose-gold-warm)" }} />
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActive(cat.value)}
              className={`px-6 py-2.5 rounded-full font-body text-sm font-medium transition-all duration-200 ${
                active === cat.value
                  ? "bg-rose-gold text-white shadow-sm"
                  : "bg-white text-text-muted border border-blush-300 hover:border-rose-gold hover:text-rose-gold"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display italic text-text-muted text-2xl">No products here yet</p>
            <p className="font-body text-text-muted/60 text-sm mt-2">Check back soon!</p>
          </div>
        ) : (
          <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
            {filtered.map((product) => (
              <div key={product.id} className="break-inside-avoid mb-4">
                <ProductCard product={product} variant="standard" />
              </div>
            ))}
          </div>
        )}

        {/* Product count */}
        {filtered.length > 0 && (
          <p className="text-center font-body text-xs text-text-muted/60 mt-10">
            Showing {filtered.length} item{filtered.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>
    </section>
  );
}
