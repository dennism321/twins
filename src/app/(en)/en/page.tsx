import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { buildMetadata } from "@/lib/i18n";

export const metadata: Metadata = buildMetadata("en", "/");

export default function Page() {
  return <HomePage locale="en" />;
}
