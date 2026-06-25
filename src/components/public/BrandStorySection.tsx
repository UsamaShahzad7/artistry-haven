"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function BrandStorySection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="our-story"
      className="snap-section min-h-screen bg-cream flex items-center"
    >
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative h-[420px] md:h-[540px] rounded-2xl overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-blush-100 to-blush-300 flex items-center justify-center">
              <Image
                src="/logo.jpg"
                alt="The Artistry Haven artist at work"
                width={280}
                height={280}
                className="rounded-full object-cover shadow-xl border-4 border-white/60"
              />
            </div>
          </div>
          {/* Decorative accent */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blush-300/40 rounded-full -z-10" />
          <div className="absolute -top-4 -left-4 w-16 h-16 bg-rose-gold/20 rounded-full -z-10" />
        </motion.div>

        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="space-y-6"
        >
          <p className="font-display italic text-rose-gold text-lg tracking-wide">
            Our Story
          </p>
          <h2 className="font-display font-light text-text-deep text-4xl md:text-5xl leading-tight">
            Made with love,<br />
            <em>one piece at a time</em>
          </h2>
          <div className="w-16 h-px bg-blush-300" />
          <div className="space-y-4 font-body text-text-muted text-base leading-relaxed">
            <p>
              Every piece at The Artistry Haven begins as a dream — poured, pressed, and polished into something you can hold. Our resin art is crafted by hand, which means no two items are ever quite the same.
            </p>
            <p>
              From delicate keychains that catch the light to bold canvas paintings that anchor a room, we pour our heart into each creation. Resin is our medium; beauty is our language.
            </p>
            <p>
              Whether you&apos;re treating yourself or gifting someone special, you&apos;ll find a little piece of magic here.
            </p>
          </div>

          <a
            href="https://www.instagram.com/artistryhaven._"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 mt-2 group"
          >
            <span className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </span>
            <span className="font-body text-text-deep group-hover:text-rose-gold transition-colors font-medium">
              Follow us @artistryhaven._
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
