"use client";
import { useEffect } from "react";

export const TrafficLogger = () => {
  useEffect(() => {
    const env = process.env.NEXT_PUBLIC_VERCEL_ENV;

    // Hanya eksekusi jika ini benar-benar URL Production utama
    if (env !== "production") {
      console.log(
        `Traffic logger disabled. Current Vercel Env: ${env || "local"}`,
      );
      return;
    }

    fetch("/api/track", {
      method: "POST",
    }).catch((err) => {
      console.error("Visit tracking failed:", err);
    });
  }, []);

  return null;
};
