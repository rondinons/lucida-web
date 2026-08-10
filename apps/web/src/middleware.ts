import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// Protege todo /dashboard, /perfil, /consultorios, /agenda: sin sesión, redirige a /login.
export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isProtected = ["/dashboard", "/perfil", "/consultorios", "/agenda"].some((path) =>
    req.nextUrl.pathname.startsWith(path),
  );

  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
});

export const config = {
  matcher: ["/dashboard/:path*", "/perfil/:path*", "/consultorios/:path*", "/agenda/:path*"],
};
