import { withAuth } from "next-auth/middleware";

// Protect routes using Auth.js middleware wrapper.
export default withAuth({
  pages: {
    signIn: "/"
  },
  callbacks: {
    authorized: ({ token }) => !!token
  }
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
