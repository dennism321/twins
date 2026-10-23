import type { Metadata } from "next";
import Link from "next/link";
import { asc, desc } from "drizzle-orm";
import { db } from "@/db";
import { bookings, type Booking } from "@/db/schema";
import { isAdminRequest } from "@/lib/admin-auth";
import { getDictionary } from "@/lib/i18n";
import { site } from "@/lib/site";
import { LogoLockup } from "@/components/Logo";
import { login, logout, setStatus } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Διαχείριση | ${site.name}`,
  robots: { index: false, follow: false },
};

const t = getDictionary("el").admin;
const sisterName = (s: Booking["sister"]) => (s === "any" ? "—" : site.owners[s].el);

function statusClass(status: Booking["status"]) {
  switch (status) {
    case "confirmed":
      return "bg-emerald-50 text-emerald-700";
    case "cancelled":
      return "bg-taupe-100 text-taupe-600 line-through";
    default:
      return "bg-champagne-100 text-gold-dark";
  }
}

function fmtDate(d: string) {
  return new Date(`${d}T12:00:00`).toLocaleDateString("el-GR", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function fmtStamp(d: Date) {
  return d.toLocaleString("el-GR", { timeZone: site.timeZone, dateStyle: "short", timeStyle: "short" });
}

function StatusActions({ b }: { b: Booking }) {
  const actions: { status: Booking["status"]; label: string; cls: string }[] = [
    { status: "confirmed", label: t.confirm, cls: "bg-taupe-900 text-ivory hover:bg-taupe-800" },
    { status: "cancelled", label: t.cancel, cls: "bg-white text-taupe-700 ring-1 ring-blush-200 hover:bg-blush-50" },
    { status: "pending", label: t.reset, cls: "bg-white text-taupe-700 ring-1 ring-blush-200 hover:bg-blush-50" },
  ];
  return (
    <div className="flex flex-wrap gap-1.5">
      {actions
        .filter((a) => a.status !== b.status)
        .map((a) => (
          <form key={a.status} action={setStatus}>
            <input type="hidden" name="id" value={b.id} />
            <input type="hidden" name="status" value={a.status} />
            <button type="submit" className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${a.cls}`}>
              {a.label}
            </button>
          </form>
        ))}
    </div>
  );
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const authed = await isAdminRequest();

  if (!authed) {
    return (
      <main className="grain flex min-h-dvh items-center justify-center p-5">
        <div className="card w-full max-w-sm p-8">
          <Link href="/" className="inline-block">
            <LogoLockup compact />
          </Link>
          <h1 className="heading-md mt-6">{t.title}</h1>
          <form action={login} className="mt-6 space-y-4">
            <div>
              <label htmlFor="password" className="label">{t.password}</label>
              <input id="password" name="password" type="password" required autoComplete="current-password" className="field" />
              {error ? <p className="mt-1.5 text-xs text-blush-600">{t.wrongPassword}</p> : null}
            </div>
            <button type="submit" className="btn-primary w-full">{t.login}</button>
          </form>
          <p className="mt-5 text-xs text-taupe-500">{t.hint}</p>
        </div>
      </main>
    );
  }

  const rows = await db
    .select()
    .from(bookings)
    .orderBy(asc(bookings.preferredDate), asc(bookings.preferredTime), desc(bookings.createdAt));

  return (
    <main className="grain min-h-dvh">
      <header className="border-b border-blush-200/70 bg-ivory/80 backdrop-blur">
        <div className="container-x flex h-16 items-center justify-between">
          <Link href="/"><LogoLockup compact /></Link>
          <form action={logout}>
            <button type="submit" className="btn-ghost text-sm">{t.logout}</button>
          </form>
        </div>
      </header>

      <section className="container-x py-10">
        <h1 className="heading-lg">{t.title}</h1>
        <p className="mt-2 text-sm text-taupe-500">{rows.length} / {t.columns.received.toLowerCase()}</p>

        {rows.length === 0 ? (
          <p className="card mt-8 p-8 text-center text-taupe-500">{t.empty}</p>
        ) : (
          <>
            {/* Mobile cards */}
            <ul className="mt-8 space-y-4 lg:hidden">
              {rows.map((b) => (
                <li key={b.id} className="card p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-serif text-xl text-taupe-900">{fmtDate(b.preferredDate)} · {b.preferredTime}</p>
                      <p className="mt-1 text-sm font-semibold text-taupe-800">{b.name}</p>
                      <a href={`tel:${b.phone}`} className="text-sm text-blush-600">{b.phone}</a>
                      {b.email ? <p className="text-xs text-taupe-500">{b.email}</p> : null}
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(b.status)}`}>
                      {t.status[b.status]}
                    </span>
                  </div>
                  <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div><dt className="text-xs text-taupe-500">{t.columns.service}</dt><dd>{b.serviceName}</dd></div>
                    <div><dt className="text-xs text-taupe-500">{t.columns.sister}</dt><dd>{sisterName(b.sister)}</dd></div>
                    {b.notes ? <div className="col-span-2"><dt className="text-xs text-taupe-500">{t.columns.notes}</dt><dd className="text-taupe-700">{b.notes}</dd></div> : null}
                    <div className="col-span-2"><dt className="text-xs text-taupe-500">{t.columns.received}</dt><dd className="text-xs text-taupe-600">{fmtStamp(b.createdAt)}</dd></div>
                  </dl>
                  <div className="mt-4"><StatusActions b={b} /></div>
                </li>
              ))}
            </ul>

            {/* Desktop table */}
            <div className="card mt-8 hidden overflow-hidden lg:block">
              <table className="w-full text-left text-sm">
                <thead className="bg-blush-50 text-xs uppercase tracking-[0.16em] text-taupe-500">
                  <tr>
                    <th className="px-5 py-3 font-semibold">{t.columns.when}</th>
                    <th className="px-5 py-3 font-semibold">{t.columns.client}</th>
                    <th className="px-5 py-3 font-semibold">{t.columns.service}</th>
                    <th className="px-5 py-3 font-semibold">{t.columns.sister}</th>
                    <th className="px-5 py-3 font-semibold">{t.columns.notes}</th>
                    <th className="px-5 py-3 font-semibold">{t.columns.status}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blush-200/70">
                  {rows.map((b) => (
                    <tr key={b.id} className="align-top">
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="font-semibold text-taupe-900">{fmtDate(b.preferredDate)}</div>
                        <div className="text-taupe-600">{b.preferredTime}</div>
                        <div className="mt-1 text-xs text-taupe-400">{t.columns.received}: {fmtStamp(b.createdAt)}</div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-semibold text-taupe-900">{b.name}</div>
                        <a href={`tel:${b.phone}`} className="text-blush-600">{b.phone}</a>
                        {b.email ? <div className="text-xs text-taupe-500">{b.email}</div> : null}
                      </td>
                      <td className="px-5 py-4">{b.serviceName}</td>
                      <td className="px-5 py-4">{sisterName(b.sister)}</td>
                      <td className="max-w-xs px-5 py-4 text-taupe-600">{b.notes ?? "—"}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(b.status)}`}>
                          {t.status[b.status]}
                        </span>
                        <div className="mt-2"><StatusActions b={b} /></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
