import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { parseDateOrNull } from "@/lib/helper";

export async function PATCH(req, { params }) {
  try {
    const id = Number(params.id);
    const body = await req.json();
    const data = {
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
        body.endDate !== undefined ? parseDateOrNull(body.endDate) : undefined,
    };
    const updated = await prisma.education.update({ where: { id }, data });
    revalidatePath("/panel/bio");
    return NextResponse.json(updated);
  } catch (err) {
    console.error("PATCH /api/education/[id] failed:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}

export async function DELETE(_req, { params }) {
  try {
    const id = Number(params.id);
    await prisma.education.delete({ where: { id } });
    revalidatePath("/panel/bio");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/education/[id] failed:", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 400 });
  }
}
