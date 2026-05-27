import Link from "next/link";
import { ExternalLink, FileText, Mail, User } from "lucide-react";
import { navItems, siteConfig } from "@/content/site";
import { ResponsiveNav } from "./responsive-nav";

const icons = {
  Resume: FileText,
  About: User,
  LinkedIn: ExternalLink,
  "Contact Me": Mail
};

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-5 py-8 md:px-8">
        <Link
          href="/"
          className="type-brand inline-flex min-h-11 items-center focus-ring"
        >
          {siteConfig.title}
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => {
            const Icon = icons[item.label as keyof typeof icons];
            return (
              <Link
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                className="type-nav group inline-flex min-h-11 items-center gap-3 focus-ring"
              >
                {Icon ? (
                  <Icon
                    aria-hidden="true"
                    size={24}
                    strokeWidth={2.2}
                    className="transition-transform duration-200 group-hover:-translate-y-0.5"
                  />
                ) : null}
                {item.label}
              </Link>
            );
          })}
        </nav>
        <ResponsiveNav />
      </div>
    </header>
  );
}
