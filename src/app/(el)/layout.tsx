import type { ReactNode } from "react";
import { RootShell } from "@/components/RootShell";

export default function GreekRootLayout({ children }: { children: ReactNode }) {
  return <RootShell locale="el">{children}</RootShell>;
}
