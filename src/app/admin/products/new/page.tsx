import { verifyAdminSession } from "@/lib/adminAuth";
import { redirect } from "next/navigation";
import Link from "next/link";
import ProductForm from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const ok = await verifyAdminSession();
  if (!ok) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-blush-50">
      <header className="bg-white border-b border-blush-300 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <Link
            href="/admin/dashboard"
            className="font-body text-sm text-text-muted hover:text-rose-gold transition-colors"
          >
            ← Dashboard
          </Link>
          <span className="text-blush-300">/</span>
          <h1 className="font-display text-2xl font-medium text-text-deep">
            New Product
          </h1>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-10">
        <ProductForm />
      </main>
    </div>
  );
}
