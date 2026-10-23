"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { ADMIN_COOKIE, adminPassword, adminToken, isAdminRequest } from "@/lib/admin-auth";

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const expected = adminPassword();
  const token = adminToken();
  if (!expected || !token || password !== expected) redirect("/admin?error=1");

  const proto = (await headers()).get("x-forwarded-proto");
  const store = await cookies();
  store.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: proto === "https",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  redirect("/admin");
}

export async function logout() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  redirect("/admin");
}

export async function setStatus(formData: FormData) {
  if (!(await isAdminRequest())) redirect("/admin");
  const id = Number(formData.get("id"));
  const status = String(formData.get("status"));
  if (!Number.isInteger(id) || !["pending", "confirmed", "cancelled"].includes(status)) return;
  await db
    .update(bookings)
    .set({ status: status as "pending" | "confirmed" | "cancelled" })
    .where(eq(bookings.id, id));
  revalidatePath("/admin");
}
