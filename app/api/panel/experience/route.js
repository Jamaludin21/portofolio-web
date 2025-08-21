// app/api/experience/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { parseDateOrNull } from "@/lib/helper";

export async function POST(req) {
  try {
    const body = await req.json();
    const created = await prisma.experience.create({
      data: {
        title: body.title,
        company: body.company ?? "",
        location: body.location ?? "",
        startDate: parseDateOrNull(body.startDate),
        endDate: parseDateOrNull(body.endDate),
        imageUrl: body.imageUrl ?? "",
        content: body.content ?? "",
        isPublished: !!body.isPublished,
      },
    });
    revalidatePath("/biodata");
    return NextResponse.json(created);
  } catch (err) {
    console.error("POST experience failed:", err);
    return NextResponse.json({ error: "Create failed" }, { status: 400 });
  }
}
