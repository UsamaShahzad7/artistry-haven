import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { CartProvider } from "@/lib/CartContext";
import Navbar from "@/components/public/Navbar";
import CartDrawer from "@/components/public/CartDrawer";
import Footer from "@/components/public/Footer";
import ImageCarousel from "@/components/public/ImageCarousel";
import ProductCard, { type Product } from "@/components/public/ProductCard";
import type { Testimonial } from "@/app/admin/testimonials/actions";
import ProductDetailSection from "./ProductDetailSection";

export const revalidate = 60;

async function getProduct(id: string): Promise<Product | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();
    if (error) return null;
    return data as Product;
  } catch {
    return null;
  }
}

async function getRelated(category: string, excludeId: string): Promise<Product[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("category", category)
      .eq("in_stock", true)
      .neq("id", excludeId)
      .limit(3);
    return (data ?? []) as Product[];
  } catch {
    return [];
  }
}

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(6);
    return (data ?? []) as Testimonial[];
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return {};
  return {
    title: `${product.name} — The Artistry Haven`,
    description: product.description ?? "Handmade resin art from The Artistry Haven",
    openGraph: {
      title: product.name,
      description: product.description ?? "Handmade resin art from The Artistry Haven",
      images: product.images?.[0] ? [product.images[0]] : [],
    },
  };
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-sm mt-3">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < rating ? "text-rose-gold" : "text-blush-300"}>
          ★
        </span>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="masonry-item bg-cream rounded-2xl p-6 border border-blush-300/50 shadow-sm">
      <span className="font-display text-blush-300 text-5xl leading-none select-none">&ldquo;</span>
      <p className="font-body text-text-muted text-sm italic leading-relaxed mt-1">
        {testimonial.text}
      </p>
      <StarRow rating={testimonial.rating} />
      <div className="flex items-center gap-2.5 mt-3">
        <div className="w-8 h-8 rounded-full bg-rose-gold flex items-center justify-center flex-shrink-0">
          <span className="font-body text-white text-xs font-semibold">
            {testimonial.author_name[0].toUpperCase()}
          </span>
        </div>
        <span className="font-body text-text-deep text-sm font-medium">
          {testimonial.author_name}
        </span>
      </div>
    </div>
  );
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, testimonials] = await Promise.all([getProduct(id), getTestimonials()]);
  if (!product) notFound();
  const related = await getRelated(product.category, product.id);

  return (
    <CartProvider>
      <Navbar />
      <CartDrawer />
      <main className="min-h-screen bg-blush-50">
        {/* Back link */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-2">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 font-body text-sm text-text-muted hover:text-rose-gold transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 12L6 8l4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Shop
          </Link>
        </div>

        {/* Product hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-20">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            {/* Image column — sticky on desktop */}
            <div className="w-full lg:w-[55%] lg:sticky lg:top-24 lg:self-start relative">
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-blush-100 shadow-xl">
                {product.images.length > 0 ? (
                  <ImageCarousel
                    images={product.images}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blush-100 to-blush-300 flex items-center justify-center">
                    <span className="font-display text-text-muted italic text-lg">No image</span>
                  </div>
                )}
              </div>

              {/* Floating decorative sparkles */}
              <span
                className="gentle-float absolute -top-5 right-6 font-display text-blush-300 text-4xl opacity-70 pointer-events-none select-none"
                style={{ animationDuration: "4s" }}
              >
                ✦
              </span>
              <span
                className="gentle-float absolute -bottom-3 -left-5 text-rose-gold-warm text-3xl opacity-50 pointer-events-none select-none"
                style={{ animationDuration: "5.5s", animationDelay: "-2s" }}
              >
                ✿
              </span>
              <span
                className="gentle-float absolute top-1/3 -right-4 font-display text-blush-300 text-xl opacity-40 pointer-events-none select-none"
                style={{ animationDuration: "6s", animationDelay: "-1s" }}
              >
                ✦
              </span>
            </div>

            {/* Details column */}
            <ProductDetailSection product={product} />
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-10">
                <p className="font-body text-text-muted text-xs tracking-widest uppercase mb-2">
                  ✦ More from the collection
                </p>
                <h2 className="font-display text-text-deep text-3xl md:text-4xl font-light">
                  You might also love
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} variant="standard" />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <section className="py-16 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-10">
                <p className="font-body text-text-muted text-xs tracking-widest uppercase mb-2">
                  ✦ Customer love
                </p>
                <h2 className="font-display text-text-deep text-3xl md:text-4xl font-light">
                  What they say
                </h2>
              </div>
              <div className="masonry-grid">
                {testimonials.map((t) => (
                  <TestimonialCard key={t.id} testimonial={t} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </CartProvider>
  );
}
