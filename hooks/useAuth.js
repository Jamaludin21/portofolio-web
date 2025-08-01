"use client";

import { useState } from "react";

export function useAuth() {
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const err = await res.json();
        return { error: err?.error || "Login failed" };
      }

      window.location.href = "/dashboard";
    } catch (err) {
      return { error: "Something went wrong. Please try again." };
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
}
