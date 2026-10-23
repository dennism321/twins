import { NextResponse } from "next/server";
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { validateBooking, type BookingInput } from "@/lib/booking";
import { getService } from "@/lib/services";

export const dynamic = "force-dynamic";

/** Very small in-memory throttle per IP (best effort, per server instance). */
const recent = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 8;

function throttled(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  let body: Partial<BookingInput>;
  try {
    body = (await req.json()) as Partial<BookingInput>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: silently accept bots without storing anything
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true, id: 0 }, { status: 201 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (throttled(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const result = validateBooking(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 422 });
  }

  const { data } = result;
  const service = getService(data.serviceId)!;

  try {
    const [row] = await db
      .insert(bookings)
      .values({
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        serviceId: service.id,
        serviceName: service.name[data.locale],
        category: service.category,
        preferredDate: data.date,
        preferredTime: data.time,
        sister: data.sister,
        notes: data.notes || null,
        locale: data.locale,
        consentAt: new Date(),
      })
      .returning({ id: bookings.id });

    return NextResponse.json({ ok: true, id: row.id }, { status: 201 });
  } catch (error) {
    console.error("[bookings] insert failed", error);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
