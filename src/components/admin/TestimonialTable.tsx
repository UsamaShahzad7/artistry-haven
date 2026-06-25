"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteTestimonialAction, togglePublishedAction } from "@/app/admin/testimonials/actions";
import type { Testimonial } from "@/app/admin/testimonials/actions";

export default function TestimonialTable({ testimonials }: { testimonials: Testimonial[] }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete review by "${name}"? This cannot be undone.`)) return;
    setDeleting(id);
    await deleteTestimonialAction(id);
    setDeleting(null);
    router.refresh();
  };

  const handleToggle = (id: string, current: boolean) => {
    startTransition(async () => {
      await togglePublishedAction(id, !current);
      router.refresh();
    });
  };

  if (testimonials.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-blush-300 p-16 text-center">
        <p className="font-display text-2xl text-text-muted italic mb-4">No testimonials yet</p>
        <Link
          href="/admin/testimonials/new"
          className="inline-block px-8 py-3 bg-rose-gold text-white font-body font-semibold text-sm rounded-full hover:bg-rose-gold-dark transition-colors"
        >
          Add First Testimonial
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-blush-300 overflow-hidden shadow-sm">
      <div className="divide-y divide-blush-300/50">
        {testimonials.map((t) => (
          <div key={t.id} className="px-6 py-5 hover:bg-blush-50/50 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-full bg-blush-100 flex items-center justify-center flex-shrink-0">
                    <span className="font-body text-xs font-semibold text-text-deep">
                      {t.author_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-body text-sm font-semibold text-text-deep">{t.author_name}</span>
                  <span className="text-rose-gold-warm text-sm">{"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}</span>
                </div>
                <p className="font-body text-sm text-text-muted line-clamp-2 pl-11">{t.text}</p>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <button
                  onClick={() => handleToggle(t.id, t.is_published)}
                  className={`font-body text-xs px-3 py-1 rounded-full border transition-colors ${
                    t.is_published
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-blush-100 text-text-muted border-blush-300"
                  }`}
                >
                  {t.is_published ? "Published" : "Hidden"}
                </button>
                <Link
                  href={`/admin/testimonials/${t.id}`}
                  className="font-body text-sm text-rose-gold hover:text-rose-gold-dark font-medium transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(t.id, t.author_name)}
                  disabled={deleting === t.id}
                  className="font-body text-sm text-text-muted hover:text-red-600 transition-colors disabled:opacity-40"
                >
                  {deleting === t.id ? "Deleting…" : "Delete"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
