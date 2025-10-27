import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { ConvexClientProvider } from "../../lib/convex-provider";
import { AdminLayout } from "./admin-layout";
import "./global.css";

export const metadata: Metadata = {
  title: "Gearboxe Market - Admin",
  description: "Admin panel for managing car marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider signInFallbackRedirectUrl="/" signUpFallbackRedirectUrl="/">
      <html lang="en">
        <body className="antialiased">
          <ConvexClientProvider>
            <AdminLayout>{children}</AdminLayout>
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
