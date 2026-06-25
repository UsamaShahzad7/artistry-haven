"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

function FloatingFlower({ x, y, size, delay, rotate }: { x: string; y: string; size: number; delay: number; rotate: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: [0, 0.6, 0.4, 0.6], scale: 1, y: [0, -14, 0, -8, 0], rotate: [rotate, rotate + 12, rotate - 8, rotate] }}
      transition={{ duration: 7 + delay, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <ellipse
            key={i}
            cx={20 + 9 * Math.cos((deg * Math.PI) / 180)}
            cy={20 + 9 * Math.sin((deg * Math.PI) / 180)}
            rx={5.5}
            ry={8}
            transform={`rotate(${deg}, ${20 + 9 * Math.cos((deg * Math.PI) / 180)}, ${20 + 9 * Math.sin((deg * Math.PI) / 180)})`}
            fill={i % 2 === 0 ? "#F0BFCA" : "#C4A882"}
            fillOpacity={0.7}
          />
        ))}
        <circle cx={20} cy={20} r={5} fill="#FAE0E6" />
      </svg>
    </motion.div>
  );
}

interface HeroSectionProps {
  heroImageUrl?: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      className="snap-section relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-blush-50"
    >
      {/* Bokeh blob — top left */}
      <div
        className="absolute -top-16 -left-16 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(240,191,202,0.55) 0%, rgba(254,244,245,0) 70%)",
          filter: "blur(32px)",
        }}
      />
      {/* Bokeh blob — bottom right */}
      <div
        className="absolute -bottom-10 -right-10 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(196,168,130,0.35) 0%, rgba(254,244,245,0) 70%)",
          filter: "blur(36px)",
        }}
      />
      {/* Bokeh blob — mid left */}
      <div
        className="absolute top-1/3 -left-8 w-40 h-40 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(240,191,202,0.40) 0%, rgba(254,244,245,0) 70%)",
          filter: "blur(24px)",
        }}
      />
      {/* Bokeh blob — mid right */}
      <div
        className="absolute bottom-1/4 -right-4 w-52 h-52 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(196,168,130,0.30) 0%, rgba(254,244,245,0) 70%)",
          filter: "blur(28px)",
        }}
      />

      {/* Floating flowers */}
      <FloatingFlower x="6%" y="12%" size={28} delay={0} rotate={15} />
      <FloatingFlower x="88%" y="8%" size={22} delay={1.2} rotate={-20} />
      <FloatingFlower x="4%" y="65%" size={20} delay={0.7} rotate={30} />
      <FloatingFlower x="92%" y="70%" size={26} delay={2} rotate={-10} />
      <FloatingFlower x="18%" y="88%" size={18} delay={1.5} rotate={45} />
      <FloatingFlower x="78%" y="84%" size={24} delay={0.4} rotate={-35} />
      <FloatingFlower x="50%" y="5%" size={16} delay={2.5} rotate={0} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto flex flex-col items-center">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10"
        >
          <div className="w-36 h-36 rounded-full bg-white shadow-lg border-2 border-white overflow-hidden flex items-center justify-center">
            <Image
              src="/logo.jpg"
              alt="The Artistry Haven"
              width={144}
              height={144}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </motion.div>

        {/* Title with gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          className="font-display font-light leading-tight"
          style={{
            fontSize: "clamp(2.8rem, 7vw, 5rem)",
            background: "linear-gradient(90deg, #B87878 0%, #C4A882 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          The Artistry Haven
        </motion.h1>

        {/* Warm gold divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
          className="mt-5 mb-5 h-px w-28 origin-center"
          style={{ background: "var(--rose-gold-warm)" }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: "easeOut" }}
          className="font-display italic text-text-muted text-lg md:text-2xl tracking-wide"
        >
          A safe place for handmade creativity
        </motion.p>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToNext}
          aria-label="Scroll to explore"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-14 flex flex-col items-center gap-2 group"
        >
          <span className="font-body text-xs tracking-[0.25em] uppercase text-text-muted/70 group-hover:text-rose-gold transition-colors">
            Scroll to Explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-text-muted/60 group-hover:text-rose-gold transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
