import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { parseDateOrNull } from "@/lib/helper";

export async function PATCH(req, { params }) {
  try {
    const id = Number(params.id);
    const body = await req.json();

    // Whitelist fields you allow to update
    const data = {
      title: body.title ?? undefined,
      company: body.company ?? undefined,
      location: body.location ?? undefined,
      content: body.content ?? undefined,
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

    const updated = await prisma.experience.update({ where: { id }, data });
    revalidatePath("/biodata");
    return NextResponse.json(updated);
  } catch (err) {
    console.error("PATCH /api/experience/[id] failed:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}

export async function DELETE(_, { params }) {
  try {
    const id = Number(params.id);
    await prisma.experience.delete({ where: { id } });
    revalidatePath("/biodata");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/experience/[id] failed:", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 400 });
  }
}
