import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore().delete("session");
  if (!cookieStore) return null;
  return NextResponse.json({ message: "Logged out" });
}
