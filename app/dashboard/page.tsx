import { auth } from "../../auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <section>
      <h1>Welcome to Dashboard</h1>
      <p>This route is protected by middleware.</p>
      <h2>Session Data</h2>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </section>
  );
}
