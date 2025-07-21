"use client";

import { darkBackgrounds, lightBackgrounds } from "@/lib/theme";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function useRandomBackground() {
  const { resolvedTheme } = useTheme();
  const [backgroundUrl, setBackgroundUrl] = useState("");

  useEffect(() => {
    const bgArray =
      resolvedTheme === "dark" ? darkBackgrounds : lightBackgrounds;
    const randomIndex = Math.floor(Math.random() * bgArray.length);
    setBackgroundUrl(bgArray[randomIndex]);
  }, [resolvedTheme]);

  return backgroundUrl;
}
