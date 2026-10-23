import { createHash } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "mt_admin";

/**
 * The admin password comes from the ADMIN_PASSWORD environment variable.
 * Local development falls back to a preview password; in production there is
 * no fallback, so admin login stays disabled until ADMIN_PASSWORD is set.
 */
export function adminPassword(): string | null {
  const fromEnv = process.env.ADMIN_PASSWORD;
  if (fromEnv) return fromEnv;
  return process.env.NODE_ENV === "production" ? null : "twins-dev-preview";
}

export function adminToken(): string | null {
  const password = adminPassword();
  return password ? createHash("sha256").update(`my-twins:${password}`).digest("hex") : null;
}

export async function isAdminRequest() {
  const token = adminToken();
  if (!token) return false;
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === token;
}
