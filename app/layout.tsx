import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Next.js Auth.js Demo",
  description: "Auth.js (NextAuth) demo with Google OAuth and protected routes."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
