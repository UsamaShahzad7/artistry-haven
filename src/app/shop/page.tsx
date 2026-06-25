import { createClient } from "@/lib/supabase/server";
import { CartProvider } from "@/lib/CartContext";
import Navbar from "@/components/public/Navbar";
import CartDrawer from "@/components/public/CartDrawer";
import Footer from "@/components/public/Footer";
import ShopClientSection from "@/components/public/ShopClientSection";
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

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <CartProvider>
      <Navbar />
      <CartDrawer />
      <main>
        <ShopClientSection products={products} />
      </main>
      <Footer />
    </CartProvider>
  );
}
