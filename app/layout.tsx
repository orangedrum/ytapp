import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { AppShell } from "@/components/app-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tango App",
  description: "Practice Argentine Tango anywhere, anytime.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
