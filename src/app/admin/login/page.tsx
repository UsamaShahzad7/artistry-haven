"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/admin/dashboard`,
      },
    });

    setLoading(false);

    if (authError) {
      setError(authError.message);
    } else {
      setSent(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
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
          {sent ? (
            <div className="text-center space-y-4">
              <div className="text-4xl">📬</div>
              <h2 className="font-display text-xl text-text-deep">Check your email</h2>
              <p className="font-body text-text-muted text-sm leading-relaxed">
                We sent a magic link to <strong>{email}</strong>. Click it to sign in.
              </p>
              <button
                onClick={() => setSent(false)}
                className="font-body text-sm text-rose-gold hover:underline mt-2"
              >
                Try a different email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block font-body text-xs font-medium text-text-muted uppercase tracking-wider mb-2"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-blush-300 bg-blush-50 font-body text-sm text-text-deep placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-rose-gold/40 focus:border-rose-gold transition-colors"
                />
              </div>

              {error && (
                <p className="font-body text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-rose-gold hover:bg-rose-gold-dark disabled:opacity-60 text-white font-body font-semibold text-sm rounded-xl transition-colors duration-200"
              >
                {loading ? "Sending…" : "Send Magic Link"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
