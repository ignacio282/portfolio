import Link from "next/link";
import { ExternalLink, FileText, Home, Mail, User } from "lucide-react";
import { navItems } from "@/content/site";

const bottomItems = [
  { label: "Home", href: "/", icon: Home },
  ...navItems.map((item) => ({
    ...item,
    icon:
      item.label === "Resume"
        ? FileText
        : item.label === "About"
          ? User
          : item.label === "LinkedIn"
            ? ExternalLink
            : Mail
  }))
];

export function BottomNav() {
  return (
    <nav
      aria-label="Case study navigation"
      className="surface-card type-nav-compact mx-auto my-16 hidden w-full max-w-4xl items-center justify-center gap-8 rounded-full px-8 py-5 md:flex"
    >
      {bottomItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.label}
            href={item.href}
            target={"external" in item && item.external ? "_blank" : undefined}
            rel={"external" in item && item.external ? "noreferrer" : undefined}
            className="focus-ring inline-flex min-h-10 items-center gap-2 transition-colors hover:text-teal"
          >
            <Icon aria-hidden="true" size={17} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
