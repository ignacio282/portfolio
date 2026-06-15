"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, FileText, Mail, User } from "lucide-react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { navItems, siteConfig } from "@/content/site";
import { cn } from "@/lib/cn";
import { ResponsiveNav } from "./responsive-nav";

const icons = {
  Resume: FileText,
  About: User,
  LinkedIn: ExternalLink,
  "Contact Me": Mail
};

export function Header() {
  const { scrollY } = useScroll();
  const reducedMotion = useReducedMotion();
  const [isFloating, setIsFloating] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsFloating(latest > 80);
  });

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-5 md:px-8">
      <div
        className={cn(
          "mx-auto flex w-full max-w-[1280px] items-center justify-between px-5 py-8 ease-out md:rounded-full md:px-8",
          !reducedMotion && "transition-[background-color,box-shadow,padding,margin-top,border-radius] duration-300",
          isFloating &&
            "-mx-5 border-b border-ink/10 bg-paper px-5 py-3 md:mx-0 md:mt-4 md:border-b-0 md:bg-paper/95 md:px-6 md:py-1 md:shadow-[0_18px_45px_rgba(36,37,38,0.14),0_4px_14px_rgba(36,37,38,0.08)]"
        )}
      >
        <Link
          href="/"
          className={cn(
            "type-brand inline-flex items-center focus-ring transition-[min-height] duration-300",
            isFloating ? "min-h-9" : "min-h-11"
          )}
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
                className={cn(
                  "type-nav group inline-flex items-center gap-3 focus-ring transition-[min-height] duration-300",
                  isFloating ? "min-h-9" : "min-h-11"
                )}
              >
                {Icon ? (
                  <Icon
                    aria-hidden="true"
                    size={isFloating ? 20 : 24}
                    strokeWidth={2.2}
                    className="transition-[transform,width,height] duration-200 group-hover:-translate-y-0.5"
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
