import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  if (!cookieStore) return null;
  cookieStore.delete("session");
  return NextResponse.json({ message: "Logged out" });
}
