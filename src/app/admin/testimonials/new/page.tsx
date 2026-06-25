import { verifyAdminSession } from "@/lib/adminAuth";
import { redirect } from "next/navigation";
import Link from "next/link";
import TestimonialForm from "@/components/admin/TestimonialForm";

export default async function NewTestimonialPage() {
  const ok = await verifyAdminSession();
  if (!ok) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-blush-50">
      <header className="bg-white border-b border-blush-300 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Link
            href="/admin/testimonials"
            className="font-body text-sm text-text-muted hover:text-rose-gold transition-colors"
          >
            ← Testimonials
          </Link>
          <h1 className="font-display text-2xl font-medium text-text-deep">Add Testimonial</h1>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-10">
        <TestimonialForm />
      </main>
    </div>
  );
}
