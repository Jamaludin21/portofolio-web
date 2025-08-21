import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function PATCH(req, { params }) {
  try {
    const id = Number(params.id);
    const body = await req.json();
    const data = {
      name: body.name ?? undefined,
      level: body.level ?? undefined,
      category: body.category ?? undefined,
      isPublished:
        typeof body.isPublished === "boolean" ? body.isPublished : undefined,
    };
    const updated = await prisma.skill.update({ where: { id }, data });
    revalidatePath("/biodata");
    return NextResponse.json(updated);
  } catch (err) {
    console.error("PATCH /api/skill/[id] failed:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}

export async function DELETE(_req, { params }) {
  try {
    const id = Number(params.id);
    await prisma.skill.delete({ where: { id } });
    revalidatePath("/biodata");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/skill/[id] failed:", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 400 });
  }
}
