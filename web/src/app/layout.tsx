import type { Metadata } from "next";
import "./globals.css";

import { Navbar } from "@/components/Navbar";
import { portfolio } from "@/data/portfolio";

export const metadata: Metadata = {
  title: portfolio.name,
  description: `${portfolio.name} — ${portfolio.headline}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-neutral-50 text-neutral-900">
        <Navbar />
        <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
        <footer className="border-t border-neutral-200">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6">
            <p className="text-sm text-neutral-600">
              © {new Date().getFullYear()} {portfolio.name}
            </p>
            <p className="text-sm text-neutral-600">Built with Next.js</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
