"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

// Scroll reveal simple: fade + 24px de traslado, una sola vez. La regla
// prefers-reduced-motion global (globals.css) ya colapsa la duración a ~0.
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      style={visible ? { animationDelay: `${delay}ms` } : undefined}
      className={cn(visible ? "animate-fade-up" : "opacity-0", className)}
    >
      {children}
    </Tag>
  );
}
