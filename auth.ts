import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Ensure a dev-only secret exists to avoid NextAuth configuration errors.
if (!process.env.NEXTAUTH_SECRET) {
  process.env.NEXTAUTH_SECRET = "dev-secret-change-me";
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (email === "admin@test.com" && password === "123456") {
          return {
            id: "1",
            name: "Admin User",
            email: "admin@test.com",
            role: "admin"
          };
        }

        return null;
      }
    })
  ],
  // Dev fallback to avoid configuration errors when NEXTAUTH_SECRET is unset.
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    // Use stateless JWTs so no database is required.
    strategy: "jwt"
  },
  callbacks: {
    // Persist a demo role on the JWT.
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: "admin" | "user" }).role ?? "user";
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
  },
  pages: {
    signIn: "/"
  }
};

export default NextAuth(authOptions);
