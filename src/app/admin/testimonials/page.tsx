import { verifyAdminSession } from "@/lib/adminAuth";
import { redirect } from "next/navigation";
import { createServiceClient } from "@/lib/supabase/service";
import Link from "next/link";
import SignOutButton from "@/components/admin/SignOutButton";
import TestimonialTable from "@/components/admin/TestimonialTable";
import type { Testimonial } from "@/app/admin/testimonials/actions";

export default async function AdminTestimonialsPage() {
  const ok = await verifyAdminSession();
  if (!ok) redirect("/admin/login");

  const supabase = createServiceClient();
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-blush-50">
      <header className="bg-white border-b border-blush-300 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="font-body text-sm text-text-muted hover:text-rose-gold transition-colors"
            >
              ← Dashboard
            </Link>
            <h1 className="font-display text-2xl font-medium text-text-deep">Testimonials</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/testimonials/new"
              className="px-5 py-2 bg-rose-gold hover:bg-rose-gold-dark text-white font-body text-sm font-semibold rounded-full transition-colors"
            >
              + Add Testimonial
            </Link>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-6">
          <p className="font-body text-text-muted text-sm">
            {(testimonials ?? []).length} testimonial{(testimonials ?? []).length !== 1 ? "s" : ""} total
          </p>
        </div>
        <TestimonialTable testimonials={(testimonials ?? []) as Testimonial[]} />
      </main>
    </div>
  );
}
