import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySession } from "./session";

export async function withAuth(renderPage) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;
  const session = sessionToken ? await verifySession(sessionToken) : null;

  if (!session) {
    redirect("/login");
  }

  return renderPage(session);
}
