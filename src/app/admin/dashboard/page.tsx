import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import ProductTable from "@/components/admin/ProductTable";
import SignOutButton from "@/components/admin/SignOutButton";
import type { Product } from "@/components/public/ProductCard";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-blush-50">
      <header className="bg-white border-b border-blush-300 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="font-display text-2xl font-medium text-text-deep">
            Admin Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <span className="font-body text-xs text-text-muted hidden sm:block">
              {user.email}
            </span>
            <Link
              href="/admin/products/new"
              className="px-5 py-2 bg-rose-gold hover:bg-rose-gold-dark text-white font-body text-sm font-semibold rounded-full transition-colors"
            >
              + Add Product
            </Link>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-6">
          <p className="font-body text-text-muted text-sm">
            {(products ?? []).length} product{(products ?? []).length !== 1 ? "s" : ""} total
          </p>
        </div>
        <ProductTable products={(products ?? []) as Product[]} />
      </main>
    </div>
  );
}
