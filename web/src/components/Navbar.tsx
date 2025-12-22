import Link from "next/link";

type NavItem = {
  href: string;
  label: string;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
];

export function Navbar() {
  return (
    <header className="border-b border-neutral-200">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3"
      >
        <Link href="/" className="text-sm font-semibold">
          Personal Site
        </Link>

        <ul className="flex items-center gap-4">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="text-sm text-neutral-700">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
