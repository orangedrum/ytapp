import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

// Initialize the Montserrat font
const montserrat = Montserrat({ subsets: ["latin"] });

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
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
