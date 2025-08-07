"use client";
import { useEffect } from "react";

export const TrafficLogger = () => {
  useEffect(() => {
    fetch("/api/track", {
      method: "POST",
    }).catch((err) => {
      console.error("Visit tracking failed:", err);
    });
  }, []);

  return null;
};
