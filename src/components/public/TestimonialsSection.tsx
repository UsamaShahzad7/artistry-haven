"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Testimonial } from "@/app/admin/testimonials/actions";

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const id = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  const navigate = (dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  };

  if (testimonials.length === 0) return null;

  const t = testimonials[index];

  return (
    <section className="py-20 px-6 bg-blush-50 relative overflow-hidden">
      {/* Subtle background blobs */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(240,191,202,0.20) 0%, transparent 70%)", filter: "blur(40px)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(196,168,130,0.15) 0%, transparent 70%)", filter: "blur(40px)" }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p
            className="font-body text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: "var(--rose-gold-warm)" }}
          >
            Kind Words
          </p>
          <h2 className="font-display font-light text-4xl md:text-5xl text-text-deep leading-tight">
            Loved by our customers
          </h2>
          <div className="mt-4 mx-auto h-px w-16" style={{ background: "var(--rose-gold-warm)" }} />
        </div>

        {/* Card */}
        <div className="relative" style={{ minHeight: 300 }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={t.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-blush-100 relative"
            >
              {/* Decorative quote */}
              <span
                className="absolute top-7 left-8 font-display text-6xl leading-none select-none"
                style={{ color: "rgba(240,191,202,0.45)" }}
                aria-hidden
              >
                &#8220;
              </span>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className="text-xl"
                    style={{ color: i < t.rating ? "var(--rose-gold-warm)" : "var(--blush-300)" }}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Quote text */}
              <p className="font-display italic text-text-deep text-center text-lg md:text-xl leading-relaxed mb-8 relative z-10">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blush-100 flex items-center justify-center">
                  <span className="font-body text-sm font-semibold text-text-deep">
                    {t.author_name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="font-body text-sm font-medium text-text-deep">{t.author_name}</span>
                <div className="h-px w-12" style={{ background: "var(--rose-gold-warm)" }} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots + arrows */}
        {testimonials.length > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => navigate(-1)}
              aria-label="Previous testimonial"
              className="w-8 h-8 rounded-full border border-blush-300 flex items-center justify-center text-text-muted hover:text-rose-gold hover:border-rose-gold transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{ background: i === index ? "var(--rose-gold)" : "var(--blush-300)" }}
                />
              ))}
            </div>
            <button
              onClick={() => navigate(1)}
              aria-label="Next testimonial"
              className="w-8 h-8 rounded-full border border-blush-300 flex items-center justify-center text-text-muted hover:text-rose-gold hover:border-rose-gold transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
