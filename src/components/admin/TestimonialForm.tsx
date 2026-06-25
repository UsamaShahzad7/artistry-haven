"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveTestimonialAction } from "@/app/admin/testimonials/actions";
import type { Testimonial } from "@/app/admin/testimonials/actions";

interface TestimonialFormProps {
  testimonial?: Testimonial;
}

export default function TestimonialForm({ testimonial }: TestimonialFormProps) {
  const router = useRouter();
  const [authorName, setAuthorName] = useState(testimonial?.author_name ?? "");
  const [text, setText] = useState(testimonial?.text ?? "");
  const [rating, setRating] = useState(testimonial?.rating ?? 5);
  const [isPublished, setIsPublished] = useState(testimonial?.is_published ?? true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = await saveTestimonialAction(
      { author_name: authorName.trim(), text: text.trim(), rating, is_published: isPublished },
      testimonial?.id
    );
    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }
    router.push("/admin/testimonials");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 font-body text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      <div>
        <label className="block font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
          Customer Name *
        </label>
        <input
          required
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="e.g. Sara Ahmed"
          className="w-full px-4 py-3 rounded-xl border border-blush-300 bg-white font-body text-sm text-text-deep placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-rose-gold/40 focus:border-rose-gold transition-colors"
        />
      </div>

      <div>
        <label className="block font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
          Review *
        </label>
        <textarea
          required
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What did the customer say about the product?"
          className="w-full px-4 py-3 rounded-xl border border-blush-300 bg-white font-body text-sm text-text-deep placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-rose-gold/40 focus:border-rose-gold transition-colors resize-none"
        />
      </div>

      <div>
        <label className="block font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
          Rating
        </label>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-2xl transition-colors ${star <= rating ? "text-rose-gold-warm" : "text-blush-300"}`}
            >
              ★
            </button>
          ))}
          <span className="font-body text-sm text-text-muted ml-2">{rating}/5</span>
        </div>
      </div>

      <label className="flex items-center gap-3 cursor-pointer select-none">
        <div
          role="checkbox"
          aria-checked={isPublished}
          tabIndex={0}
          onClick={() => setIsPublished((v) => !v)}
          onKeyDown={(e) => e.key === " " && setIsPublished((v) => !v)}
          className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${isPublished ? "bg-rose-gold" : "bg-blush-300"}`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${isPublished ? "translate-x-5" : "translate-x-0"}`}
          />
        </div>
        <span className="font-body text-sm text-text-deep">Published (visible on site)</span>
      </label>

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="px-10 py-3 bg-rose-gold hover:bg-rose-gold-dark disabled:opacity-60 text-white font-body font-semibold text-sm rounded-full transition-colors duration-200"
        >
          {loading ? "Saving…" : testimonial ? "Save Changes" : "Add Testimonial"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 font-body text-sm text-text-muted hover:text-text-deep transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
