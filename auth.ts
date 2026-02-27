import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const isAdminEmail = (email: string | null | undefined) => {
  if (!email) return false;
  // Demo rule: treat "@example.com" emails as admins.
  return email.toLowerCase().endsWith("@example.com");
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    // Use stateless JWTs so no database is required.
    strategy: "jwt"
  },
  callbacks: {
    // Persist a demo role on the JWT.
    async jwt({ token, user }) {
      if (user?.email) {
        token.role = isAdminEmail(user.email) ? "admin" : "user";
      }
      return token;
    },
    // Expose role on the session object for UI and authorization checks.
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role ?? "user";
      }
      return session;
    }
  }
});
