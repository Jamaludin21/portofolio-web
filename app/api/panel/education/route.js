import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { parseDateOrNull } from "@/lib/helper";

export async function POST(req) {
  try {
    const body = await req.json();
    const created = await prisma.education.create({
      data: {
        school: body.school ?? undefined,
        major: body.major ?? undefined,
        degree: body.degree ?? undefined,
        description: body.description ?? undefined,
        imageUrl: body.imageUrl ?? undefined,
        isPublished:
          typeof body.isPublished === "boolean" ? body.isPublished : undefined,
        startDate:
          body.startDate !== undefined
            ? parseDateOrNull(body.startDate)
            : undefined,
        endDate:
          body.endDate !== undefined
            ? parseDateOrNull(body.endDate)
            : undefined,
      },
    });
    revalidatePath("/biodata");
    return NextResponse.json(created);
  } catch (err) {
    console.error("POST education failed:", err);
    return NextResponse.json({ error: "Create failed" }, { status: 400 });
  }
}
