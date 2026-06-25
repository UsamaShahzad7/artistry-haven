import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { CartProvider } from "@/lib/CartContext";
import Navbar from "@/components/public/Navbar";
import CartDrawer from "@/components/public/CartDrawer";
import HeroSection from "@/components/public/HeroSection";
import BrandStorySection from "@/components/public/BrandStorySection";
import FeaturedProductsSection from "@/components/public/FeaturedProductsSection";
import CatalogSection from "@/components/public/CatalogSection";
import TestimonialsSection from "@/components/public/TestimonialsSection";
import Footer from "@/components/public/Footer";
import type { Product } from "@/components/public/ProductCard";
import type { Testimonial } from "@/app/admin/testimonials/actions";

export const revalidate = 60;

async function getProducts() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as Product[];
  } catch {
    return [] as Product[];
  }
}

async function getTestimonials() {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as Testimonial[];
  } catch {
    return [] as Testimonial[];
  }
}

export default async function HomePage() {
  const [products, testimonials] = await Promise.all([getProducts(), getTestimonials()]);
  const featured = products.filter((p) => p.is_featured && p.in_stock);
  const heroImage = featured[0]?.images?.[0] ?? null;

  return (
    <CartProvider>
      <Navbar />
      <CartDrawer />

      <main className="snap-container">
        <HeroSection heroImageUrl={heroImage} />
        <BrandStorySection />
        <FeaturedProductsSection products={featured} />
      </main>

      {/* Natural scroll sections */}
      <CatalogSection products={products} />
      <TestimonialsSection testimonials={testimonials} />
      <Footer />
    </CartProvider>
  );
}
