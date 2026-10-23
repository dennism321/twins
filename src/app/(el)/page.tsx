import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { buildMetadata } from "@/lib/i18n";

export const metadata: Metadata = buildMetadata("el", "/");

export default function Page() {
  return <HomePage locale="el" />;
}
