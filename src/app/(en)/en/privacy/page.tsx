import type { Metadata } from "next";
import { PrivacyPage } from "@/components/PrivacyPage";
import { buildMetadata } from "@/lib/i18n";

export const metadata: Metadata = buildMetadata("en", "/privacy");

export default function Page() {
  return <PrivacyPage locale="en" />;
}
