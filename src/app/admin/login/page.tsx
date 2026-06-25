"use client";

import { useRef, useState, useTransition, KeyboardEvent, ClipboardEvent } from "react";
import Image from "next/image";
import { loginAction } from "./action";

const DIGITS = 6;

export default function AdminLoginPage() {
  const [digits, setDigits] = useState<string[]>(Array(DIGITS).fill(""));
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const submit = (pin: string) => {
    setError(null);
    startTransition(async () => {
      const result = await loginAction(pin);
      if (result?.error) setError(result.error);
    });
  };

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = digit;
    setDigits(next);

    if (digit && index < DIGITS - 1) {
      refs.current[index + 1]?.focus();
    }

    if (digit && index === DIGITS - 1) {
      const pin = next.join("");
      if (pin.length === DIGITS) submit(pin);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
    if (e.key === "Enter") {
      const pin = digits.join("");
      if (pin.length === DIGITS) submit(pin);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, DIGITS);
    const next = Array(DIGITS).fill("");
    pasted.split("").forEach((ch, i) => { next[i] = ch; });
    setDigits(next);
    const lastFilled = Math.min(pasted.length, DIGITS - 1);
    refs.current[lastFilled]?.focus();
    if (pasted.length === DIGITS) submit(pasted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pin = digits.join("");
    if (pin.length === DIGITS) submit(pin);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-blush-50">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-10">
          <Image
            src="/logo.jpg"
            alt="The Artistry Haven"
            width={72}
            height={72}
            className="rounded-full border-2 border-blush-300 mb-4"
          />
          <h1 className="font-display text-3xl font-medium text-text-deep">Admin Access</h1>
          <p className="font-body text-text-muted text-sm mt-1">The Artistry Haven</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-blush-300 p-8">
          <p className="font-body text-xs font-medium text-text-muted uppercase tracking-wider text-center mb-6">
            Enter 6-digit PIN
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-3">
              {digits.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { refs.current[i] = el; }}
                  type="password"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  onPaste={handlePaste}
                  disabled={isPending}
                  className="w-11 h-14 rounded-xl border-2 border-blush-300 bg-blush-50 text-center text-2xl font-body text-text-deep focus:outline-none focus:border-rose-gold focus:bg-white transition-colors disabled:opacity-50"
                  aria-label={`PIN digit ${i + 1}`}
                  autoFocus={i === 0}
                />
              ))}
            </div>

            {error && (
              <p className="font-body text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending || digits.join("").length < DIGITS}
              className="w-full py-3 bg-rose-gold hover:bg-rose-gold-dark disabled:opacity-50 text-white font-body font-semibold text-sm rounded-xl transition-colors duration-200"
            >
              {isPending ? "Verifying…" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
