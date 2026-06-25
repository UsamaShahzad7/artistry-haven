import { createClient } from "@/lib/supabase/server";
import { CartProvider } from "@/lib/CartContext";
import Navbar from "@/components/public/Navbar";
import CartDrawer from "@/components/public/CartDrawer";
import HeroSection from "@/components/public/HeroSection";
import BrandStorySection from "@/components/public/BrandStorySection";
import FeaturedProductsSection from "@/components/public/FeaturedProductsSection";
import CatalogSection from "@/components/public/CatalogSection";
import Footer from "@/components/public/Footer";
import type { Product } from "@/components/public/ProductCard";

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

export default async function HomePage() {
  const products = await getProducts();
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

      {/* Catalog is natural scroll — lives outside the snap container */}
      <CatalogSection products={products} />
      <Footer />
    </CartProvider>
  );
}
