import type { ReactNode } from "react";
import { RootShell } from "@/components/RootShell";

export default function EnglishRootLayout({ children }: { children: ReactNode }) {
  return <RootShell locale="en">{children}</RootShell>;
}
