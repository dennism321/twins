"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms */
  delay?: number;
  as?: "div" | "section" | "article" | "li" | "figure";
  id?: string;
};

/**
 * Fades content up once it scrolls into view. Content stays fully visible
 * when JavaScript is unavailable (see `.js .reveal` in globals.css).
 */
export function Reveal({ children, className = "", delay = 0, as = "div", id }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as;
  return (
    <Tag
      ref={ref as any}
      id={id}
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  const centered = align === "center";
  return (
    <Reveal className={`${centered ? "mx-auto text-center" : ""} max-w-2xl`}>
      <span className={`eyebrow ${centered ? "justify-center" : ""}`}>{eyebrow}</span>
      <h2 className={`heading-lg mt-4 ${light ? "text-ivory" : ""}`}>{title}</h2>
      {subtitle ? (
        <p className={`lead mt-5 ${light ? "text-ivory/80" : ""}`}>{subtitle}</p>
      ) : null}
    </Reveal>
  );
}
