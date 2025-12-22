import type { Metadata } from "next";
import "./globals.css";

import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Personal Site",
  description: "Personal site built with Next.js, React, TypeScript, and Tailwind.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-white text-neutral-900">
        <Navbar />
        <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
      </body>
    </html>
  );
}
