"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  images: string[];
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  stopPropagation?: boolean;
}

export default function ImageCarousel({
  images,
  alt,
  fill,
  width,
  height,
  sizes,
  className,
  stopPropagation,
}: Props) {
  const [idx, setIdx] = useState(0);

  const validImages = images.filter(Boolean);

  if (validImages.length === 0) return null;

  if (validImages.length === 1) {
    return fill ? (
      <Image src={validImages[0]} alt={alt} fill className={className} sizes={sizes} />
    ) : (
      <Image src={validImages[0]} alt={alt} width={width} height={height} className={className} sizes={sizes} />
    );
  }

  const stop = (e: React.MouseEvent) => { if (stopPropagation) e.stopPropagation(); };
  const prev = (e: React.MouseEvent) => { stop(e); setIdx((i) => (i - 1 + validImages.length) % validImages.length); };
  const next = (e: React.MouseEvent) => { stop(e); setIdx((i) => (i + 1) % validImages.length); };

  const chrome = (
    <>
      <button
        onClick={prev}
        aria-label="Previous image"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white/70 hover:bg-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200 shadow-sm"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 11L5 7l4-4" stroke="#6B4A50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Next image"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white/70 hover:bg-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200 shadow-sm"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M5 3l4 4-4 4" stroke="#6B4A50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="absolute bottom-2 left-0 right-0 z-20 flex items-center justify-center gap-1.5" onClick={stop}>
        {validImages.map((_, i) => (
          <button
            key={i}
            aria-label={`Image ${i + 1}`}
            onClick={(e) => { stop(e); setIdx(i); }}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${i === idx ? "bg-rose-gold scale-125" : "bg-white/70 hover:bg-white"}`}
          />
        ))}
      </div>
    </>
  );

  // Both fill and non-fill use absolute inset-0 frames so images crossfade simultaneously.
  // For non-fill, the container height is locked via aspect-ratio so absolute children have a reference.
  const containerStyle = !fill && width && height ? { aspectRatio: `${width}/${height}` } : undefined;
  const containerClass = fill
    ? "absolute inset-0 group/carousel"
    : "relative w-full overflow-hidden group/carousel";

  return (
    <div className={containerClass} style={containerStyle}>
      <AnimatePresence initial={false}>
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <Image
            src={validImages[idx]}
            alt={`${alt} ${idx + 1}`}
            fill
            className={className}
            sizes={sizes}
          />
        </motion.div>
      </AnimatePresence>
      {chrome}
    </div>
  );
}
