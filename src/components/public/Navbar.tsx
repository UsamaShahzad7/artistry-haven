"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { count, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-blush-100"
          : "bg-blush-50/60 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Spacer */}
        <div className="w-10" />

        {/* Logo centered */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.jpg"
            alt="The Artistry Haven"
            width={44}
            height={44}
            className="rounded-full object-cover border-2 border-blush-300"
            priority
          />
          <span
            className="font-display text-lg font-medium tracking-wide hidden sm:block text-text-deep"
          >
            THE ARTISTRY HAVEN
          </span>
        </Link>

        {/* Cart button */}
        <button
          onClick={openCart}
          aria-label={`Open cart, ${count} items`}
          className="relative p-2 text-text-muted hover:text-rose-gold transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          {count > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-rose-gold text-white text-[10px] font-body font-semibold rounded-full flex items-center justify-center px-1">
              {count > 99 ? "99+" : count}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
