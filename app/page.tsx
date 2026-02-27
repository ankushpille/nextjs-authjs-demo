"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("admin@test.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = () => signOut({ callbackUrl: "/" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard"
    });

    if (result?.error) {
      setError("Invalid credentials. Try admin@test.com / 123456.");
    } else if (result?.url) {
      window.location.href = result.url;
    }
  };

  return (
    <section>
      <h1>Next.js Auth.js Demo</h1>
      <p>
        This page lets you sign in with email/password and view your session
        details.
      </p>

      {status === "loading" && <p>Checking session...</p>}

      {status !== "loading" && !session && (
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          <button type="submit">Sign in</button>
          {error && <p>{error}</p>}
        </form>
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
