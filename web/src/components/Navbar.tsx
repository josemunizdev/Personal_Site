import Link from "next/link";

import { portfolio } from "@/data/portfolio";

type NavItem = {
  href: string;
  label: string;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="border-b border-neutral-200">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3"
      >
        <Link href="/" className="text-sm font-semibold tracking-tight">
          {portfolio.name}
        </Link>

        <ul className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded px-3 py-1.5 text-sm text-neutral-700"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
