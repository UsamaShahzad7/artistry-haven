"use client";

import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import ImageCarousel from "@/components/public/ImageCarousel";

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: "keychain" | "canvas";
  images: string[];
  is_featured: boolean;
  in_stock: boolean;
}

interface ProductCardProps {
  product: Product;
  variant?: "flip" | "standard";
}

export default function ProductCard({ product, variant = "standard" }: ProductCardProps) {
  const { add } = useCart();
  const firstImage = product.images?.[0] ?? null;
  const displayPrice = `Rs. ${product.price.toLocaleString()}`;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add({
      id: product.id,
      name: product.name,
      price: product.price,
      image: firstImage ?? "",
    });
  };

  if (variant === "flip") {
    return (
      <Link
        href={`/shop/${product.id}`}
        className="card-flip block w-full h-[420px] cursor-pointer"
        style={{ perspective: "1000px" }}
      >
        <div className="card-flip-inner relative w-full h-full">
          {/* Front */}
          <div className="card-face absolute inset-0 rounded-2xl overflow-hidden bg-blush-100 shadow-md">
            {!product.in_stock && (
              <div className="absolute inset-0 bg-text-deep/40 z-10 flex items-center justify-center rounded-2xl">
                <span className="font-body text-white font-semibold text-sm tracking-widest uppercase bg-text-deep/60 px-4 py-2 rounded-full">
                  Sold Out
                </span>
              </div>
            )}
            {product.images?.length > 0 ? (
              <ImageCarousel
                images={product.images}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                stopPropagation
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blush-100 to-blush-300 flex items-center justify-center">
                <span className="font-display text-text-muted italic text-lg">No image</span>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-text-deep/80 to-transparent p-5">
              <p className="font-display text-white font-medium text-xl leading-tight">
                {product.name}
              </p>
              <p className="font-body text-blush-100 text-sm mt-1">{displayPrice}</p>
            </div>
          </div>

          {/* Back */}
          <div className="card-face card-face-back absolute inset-0 rounded-2xl bg-blush-50 border border-blush-300 shadow-md flex flex-col items-center justify-center p-7 text-center gap-5">
            <p className="font-display text-rose-gold italic text-xl">{product.name}</p>
            <div className="w-10 h-px bg-blush-300" />
            <p className="font-body text-text-muted text-sm leading-relaxed line-clamp-5">
              {product.description ?? "A beautiful handcrafted piece made with love."}
            </p>
            <p className="font-display text-text-deep text-2xl font-medium">{displayPrice}</p>
            {product.in_stock ? (
              <button
                onClick={handleAdd}
                className="px-8 py-2.5 bg-rose-gold hover:bg-rose-gold-dark text-white font-body font-semibold text-sm rounded-full transition-colors duration-200 tracking-wide"
              >
                Add to Cart
              </button>
            ) : (
              <span className="font-body text-text-muted text-sm">Currently unavailable</span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  // Standard card
  return (
    <Link
      href={`/shop/${product.id}`}
      className="masonry-item group block rounded-xl overflow-hidden bg-white shadow-sm border border-blush-300/50 hover:shadow-md transition-shadow duration-300"
    >
      <div className="relative overflow-hidden bg-blush-100">
        {!product.in_stock && (
          <div className="absolute inset-0 bg-text-deep/40 z-10 flex items-center justify-center">
            <span className="font-body text-white font-semibold text-xs tracking-widest uppercase bg-text-deep/60 px-3 py-1.5 rounded-full">
              Sold Out
            </span>
          </div>
        )}
        {product.images?.length > 0 ? (
          <ImageCarousel
            images={product.images}
            alt={product.name}
            width={400}
            height={product.category === "canvas" ? 500 : 300}
            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="h-48 bg-gradient-to-br from-blush-100 to-blush-300" />
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display text-text-deep font-medium text-base leading-tight">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-3">
          <span className="font-body text-rose-gold font-medium text-sm">{displayPrice}</span>
          {product.in_stock && (
            <button
              onClick={handleAdd}
              className="px-4 py-1.5 bg-rose-gold hover:bg-rose-gold-dark text-white font-body text-xs font-semibold rounded-full transition-colors duration-200"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
