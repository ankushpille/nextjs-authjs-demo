# Next.js Auth.js Demo (App Router + TypeScript)

Production-ready authentication and authorization demo built with Next.js App Router, TypeScript, and Auth.js (NextAuth). It uses credentials-based login with stateless JWT sessions and middleware-protected routes.

**Project Overview**
- Credentials-based login via Auth.js
- JWT session strategy (no database required)
- Protected `/dashboard` route via middleware
- App Router structure with API route handlers
- Role-based authorization example (demo rule)

**Setup**
1. Install dependencies:
   - `npm install`
2. Create `.env.local` from the template:
   - Copy `.env.local.example` to `.env.local` and fill values.
3. Generate a strong `NEXTAUTH_SECRET` (e.g., 32+ random bytes).
4. Run the dev server:
   - `npm run dev`

**Environment Variables**
Template: `.env.local.example`
```text
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
```

**How Authentication Works**
- The API route `app/api/auth/[...nextauth]/route.ts` exposes Auth.js handlers.
- Credentials are validated in the `authorize()` function.
- A JWT is issued and stored in a cookie (stateless session strategy).
- The session is available on the client via `useSession()` and on the server via `auth()`.

**Authentication vs Authorization**
- Authentication answers: “Who is the user?”
- Authorization answers: “What is the user allowed to do?”

**How Middleware Protects Routes**
- `middleware.ts` checks if a valid token exists for `/dashboard` paths.
- `/admin` requires a valid token with `role === "admin"`.
- Unauthenticated users are redirected to `/` to sign in.
- Authenticated users proceed to the protected route.

**Role-Based Authorization (Demo)**
- `auth.ts` accepts hardcoded credentials and assigns `role: "admin"`.
- The role is stored on the JWT and then exposed on the session object.
- Update this rule and credential check to match your real authorization logic.

**Do Not Commit Secrets**
- `.env.local` is gitignored to keep credentials safe.
