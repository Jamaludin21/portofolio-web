"use client";

import { useEffect, useState } from "react";

export function useClientReady(delay = 50) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return isReady;
}
