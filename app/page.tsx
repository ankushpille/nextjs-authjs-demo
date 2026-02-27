"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session, status } = useSession();

  const handleSignIn = () => signIn("google", { callbackUrl: "/dashboard" });
  const handleSignOut = () => signOut({ callbackUrl: "/" });

  return (
    <section>
      <h1>Next.js Auth.js Demo</h1>
      <p>
        This page lets you sign in with Google and view your session details.
      </p>

      {status === "loading" && <p>Checking session...</p>}

      {status !== "loading" && !session && (
        <button onClick={handleSignIn}>Sign in with Google</button>
      )}

      {session && (
        <div>
          <h2>Signed in</h2>
          <p>
            <strong>Name:</strong> {session.user?.name}
          </p>
          <p>
            <strong>Email:</strong> {session.user?.email}
          </p>
          <p>
            <strong>Role:</strong> {session.user?.role}
          </p>
          {session.user?.image && (
            <img
              className="avatar"
              src={session.user.image}
              alt="Profile"
              width={64}
              height={64}
            />
          )}
          <div style={{ marginTop: 16 }}>
            <button className="secondary" onClick={handleSignOut}>
              Sign out
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
