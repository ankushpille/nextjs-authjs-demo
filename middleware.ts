import { withAuth } from "next-auth/middleware";

// Protect routes using Auth.js middleware wrapper.
export default withAuth({
  pages: {
    signIn: "/"
  },
  callbacks: {
    authorized: ({ token, req }) => {
      if (!token) return false;
      if (req.nextUrl.pathname.startsWith("/admin")) {
        return token.role === "admin";
      }
      return true;
    }
  }
});

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
