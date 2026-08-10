"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

// Dispara scroll_50 / scroll_90 una sola vez cada uno por sesión de página.
export function useScrollDepthTracking() {
  const fired = useRef({ half: false, most: false });

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const scrolled = window.scrollY + window.innerHeight;
      const ratio = scrolled / doc.scrollHeight;

      if (ratio >= 0.5 && !fired.current.half) {
        fired.current.half = true;
        trackEvent("scroll_50");
      }
      if (ratio >= 0.9 && !fired.current.most) {
        fired.current.most = true;
        trackEvent("scroll_90");
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}
