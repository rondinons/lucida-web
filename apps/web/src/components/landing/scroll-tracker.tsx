"use client";

import { useScrollDepthTracking } from "@/hooks/use-scroll-depth";

export function ScrollTracker() {
  useScrollDepthTracking();
  return null;
}
