import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.AUTH_SECRET || "dev-secret";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  const isAuthPage = req.nextUrl.pathname === "/login";
  const isProtectedPage = req.nextUrl.pathname.startsWith("/dashboard");

  try {
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET);

      // Redirect from login to dashboard if already logged in
      if (isAuthPage) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      // Allow access to protected route
      return NextResponse.next();
    }

    // Redirect to login if not authenticated
    if (isProtectedPage) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  } catch {
    if (isProtectedPage) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/", "/login"],
};
