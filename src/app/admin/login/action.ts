"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, computeSessionToken } from "@/lib/adminToken";

export async function loginAction(pin: string): Promise<{ error: string }> {
  if (pin !== process.env.ADMIN_PIN) {
    return { error: "Incorrect PIN. Please try again." };
  }
  const store = await cookies();
  store.set(ADMIN_COOKIE, await computeSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  redirect("/admin/dashboard");
}
