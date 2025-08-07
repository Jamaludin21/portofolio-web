import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  const ua = req.headers.get("user-agent") || "";
  const ip =
    req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "";

  const isMobile = /Mobi|Android/i.test(ua);

  await prisma.visit.create({
    data: {
      ip: ip.toString(),
      userAgent: ua,
      device: isMobile ? "mobile" : "desktop",
    },
  });

  return NextResponse.json({ success: true });
}
