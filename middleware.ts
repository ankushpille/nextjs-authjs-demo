import { NextResponse } from "next/server";
import { auth } from "./auth";

// Protect routes using Auth.js middleware wrapper.
export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");

  if (!isLoggedIn && isDashboard) {
    const redirectUrl = new URL("/", req.nextUrl.origin);
    redirectUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
