import { getServerSession } from "next-auth";
import { authOptions } from "../../auth";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  return (
    <section>
      <h1>Admin Area</h1>
      <p>Only users with the admin role can access this route.</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </section>
  );
}
