"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const PETALS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${8 + (i * 7.5) % 88}%`,
  size: 12 + (i % 4) * 6,
  delay: (i * 0.9) % 8,
  duration: 8 + (i % 5) * 2,
  rotate: i % 2 === 0 ? 1 : -1,
}));

interface HeroSectionProps {
  heroImageUrl?: string | null;
}

export default function HeroSection({ heroImageUrl }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const scrollToNext = () => {
    const el = sectionRef.current;
    if (!el) return;
    const next = el.nextElementSibling as HTMLElement | null;
    next?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="snap-section relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      {heroImageUrl ? (
        <Image
          src={heroImageUrl}
          alt="The Artistry Haven hero"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-blush-300 via-rose-gold/60 to-text-deep/80" />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-text-deep/20 via-text-deep/40 to-text-deep/70" />

      {/* Floating petals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {PETALS.map((petal) => (
          <div
            key={petal.id}
            className="petal absolute bottom-0"
            style={{
              left: petal.left,
              width: petal.size,
              height: petal.size,
              animationDuration: `${petal.duration}s`,
              animationDelay: `${petal.delay}s`,
            }}
          >
            <svg viewBox="0 0 24 24" fill="rgba(245,197,206,0.5)" style={{ transform: `rotate(${petal.rotate * 45}deg)` }}>
              <path d="M12 2C8 2 4 6 4 10c0 4 4 8 8 10 4-2 8-6 8-10 0-4-4-8-8-8z" />
            </svg>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          <p className="font-display italic text-blush-100 text-lg md:text-xl mb-4 tracking-widest opacity-90">
            Welcome to
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="font-display font-light text-white text-5xl md:text-7xl lg:text-8xl tracking-widest uppercase leading-tight"
        >
          The Artistry<br />
          <span className="font-medium">Haven</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
          className="font-display italic text-blush-100 text-lg md:text-2xl mt-5 opacity-90 tracking-wide"
        >
          A safe place for handmade creativity
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          className="mt-10"
        >
          <button
            onClick={scrollToNext}
            className="inline-block px-10 py-3.5 border-2 border-white/80 text-white font-body font-medium text-sm tracking-widest uppercase hover:bg-white hover:text-text-deep transition-all duration-300 rounded-full"
          >
            Explore the Collection
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToNext}
        aria-label="Scroll to next section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.button>
    </section>
  );
}
