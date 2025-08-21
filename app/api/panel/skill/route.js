// app/api/experience/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function POST(req) {
  try {
    const body = await req.json();
    const created = await prisma.skill.create({
      data: {
        name: body.name ?? undefined,
        level: body.level ?? undefined,
        category: body.category ?? undefined,
        isPublished:
          typeof body.isPublished === "boolean" ? body.isPublished : undefined,
      },
    });
    revalidatePath("/biodata");
    return NextResponse.json(created);
  } catch (err) {
    console.error("POST skill failed:", err);
    return NextResponse.json({ error: "Create failed" }, { status: 400 });
  }
}
