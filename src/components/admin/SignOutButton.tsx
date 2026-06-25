"use client";

import { useTransition } from "react";
import { logoutAction } from "@/app/admin/logout/action";

export default function SignOutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => logoutAction())}
      disabled={isPending}
      className="font-body text-sm text-text-muted hover:text-rose-gold disabled:opacity-50 transition-colors px-2 py-1"
    >
      {isPending ? "Signing out…" : "Sign out"}
    </button>
  );
}
