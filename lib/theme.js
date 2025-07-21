"use client";

import { useClientReady } from "@/hooks/useClientReady";
import { ThemeProvider } from "next-themes";

export function Providers({ children }) {
  const isReady = useClientReady();

  if (!isReady) return null;
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}

export const darkBackgrounds = [
  "https://ohl6h4pfccuxujvz.public.blob.vercel-storage.com/assets/dark-14731307_rm218-bb-07-compressed-9sCAZjCvL3s1nc3HQiD7sk4MHFPdVY.jpg",
  "https://ohl6h4pfccuxujvz.public.blob.vercel-storage.com/assets/dark-6600674_3334896-MKNWMCgbc6Vtwc7e5U8eU8qplP887k.jpg",
];

export const lightBackgrounds = [
  "https://ohl6h4pfccuxujvz.public.blob.vercel-storage.com/assets/light-2563-gFrHtSqHnO7ItvD5wXwVrJJO3kPKLo.jpg",
  "https://ohl6h4pfccuxujvz.public.blob.vercel-storage.com/assets/light-3798-vNANr1uZsxD7Ug0smjfYKCb26hK6BH.jpg",
];
