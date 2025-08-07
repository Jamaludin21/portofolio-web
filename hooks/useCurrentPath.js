"use client";

import { usePathname } from "next/navigation";

/**
 * Returns pathname and current active route segment.
 * For example: `/dashboard/products/123` -> segment = `products`
 */
export function useCurrentPath() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean); // remove empty
  const current = segments.length > 0 ? segments[segments.length - 1] : "";

  return {
    pathname,
    segments,
    currentSegment: current,
  };
}
