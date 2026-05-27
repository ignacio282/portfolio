"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, FileText, Home, Mail, User } from "lucide-react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { navItems, siteConfig } from "@/content/site";
import { cn } from "@/lib/cn";
import { motionPresets } from "@/components/motion/presets";

export type CaseStudySectionLink = {
  label: string;
  href: `#${string}`;
};

const topNavItems = [
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

export function CaseStudyNavigation({
  sections,
  backHref = "/projects"
}: {
  sections: CaseStudySectionLink[];
  backHref?: string;
}) {
  const { scrollY } = useScroll();
  const reducedMotion = useReducedMotion();
  const [isFloating, setIsFloating] = useState(false);
  const [activeHref, setActiveHref] = useState(sections[0]?.href);

  const sectionIds = useMemo(
    () => sections.map((section) => section.href.slice(1)),
    [sections]
  );

  useEffect(() => {
    document.body.classList.add("case-study-navigation-active");

    return () => {
      document.body.classList.remove("case-study-navigation-active");
    };
  }, []);

  useEffect(() => {
    const targets = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!targets.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveHref(`#${visible.target.id}`);
        }
      },
      {
        rootMargin: "-24% 0px -58% 0px",
        threshold: [0.08, 0.18, 0.32]
      }
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [sectionIds]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsFloating(latest > 120);
  });

  return (
    <>
      <span className="case-study-navigation-root hidden" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 hidden justify-center px-5 md:flex md:px-8">
        <motion.nav
          aria-label="Project navigation"
          initial={false}
          animate={{
            y: isFloating ? 18 : 28
          }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : {
                  layout: motionPresets.buttonSpring,
                  y: motionPresets.buttonSpring
                }
          }
          className="pointer-events-auto relative min-h-16 w-full max-w-[1280px]"
        >
          <motion.div
            animate={{
              opacity: isFloating ? 0 : 1,
              y: isFloating ? -10 : 0
            }}
            transition={reducedMotion ? { duration: 0 } : motionPresets.iconSwap}
            className={cn(
              "absolute inset-0 flex items-center justify-between",
              isFloating && "pointer-events-none"
            )}
            aria-hidden={isFloating}
          >
            <Link
              href="/"
              className="type-brand inline-flex min-h-11 items-center focus-ring"
              tabIndex={isFloating ? -1 : undefined}
            >
              {siteConfig.title}
            </Link>
            <nav aria-label="Main navigation" className="flex items-center gap-10">
              {navItems.map((item) => {
                const Icon =
                  item.label === "Resume"
                    ? FileText
                    : item.label === "About"
                      ? User
                      : item.label === "LinkedIn"
                        ? ExternalLink
                        : Mail;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                    tabIndex={isFloating ? -1 : undefined}
                    className="type-nav group inline-flex min-h-11 items-center gap-3 focus-ring"
                  >
                    <Icon
                      aria-hidden="true"
                      size={24}
                      strokeWidth={2.2}
                      className="transition-transform duration-200 group-hover:-translate-y-0.5"
                    />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>

          <motion.div
            animate={{
              opacity: isFloating ? 1 : 0,
              scale: isFloating ? 1 : 0.96,
              y: isFloating ? 0 : -8
            }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : {
                    opacity: { duration: 0.18, ease: [0.2, 0, 0, 1] },
                    scale: motionPresets.buttonSpring,
                    y: motionPresets.buttonSpring
                  }
            }
            className={cn(
              "absolute inset-x-0 top-0 flex justify-center",
              !isFloating && "pointer-events-none"
            )}
            aria-hidden={!isFloating}
          >
            <div
              className="flex min-h-16 items-center justify-center gap-8 whitespace-nowrap rounded-full bg-paper/95 px-7"
              style={{
                boxShadow: "0 18px 45px rgba(36, 37, 38, 0.14), 0 4px 14px rgba(36, 37, 38, 0.08)"
              }}
            >
              {topNavItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    target={"external" in item && item.external ? "_blank" : undefined}
                    rel={"external" in item && item.external ? "noreferrer" : undefined}
                    tabIndex={isFloating ? undefined : -1}
                    className="type-nav group inline-flex min-h-11 items-center gap-3 rounded-full px-2 transition-colors focus-ring"
                  >
                    <Icon
                      aria-hidden="true"
                      size={24}
                      strokeWidth={2.15}
                      className="transition-transform duration-200 group-hover:-translate-y-0.5"
                    />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </motion.nav>
      </div>

      <aside
        aria-label="Case study sections"
        className="case-study-side-nav fixed left-8 top-36 z-30 w-52 rounded-[12px] bg-card/65 p-4"
      >
        <Link
          href={backHref}
          className="type-body-small group mb-8 inline-flex min-h-10 items-center gap-3 text-muted transition-colors hover:text-ink focus-ring"
        >
          <ArrowLeft
            aria-hidden="true"
            size={18}
            className="transition-transform duration-200 group-hover:-translate-x-1"
          />
          Back
        </Link>
        <nav className="flex flex-col gap-3">
          {sections.map((section) => {
            const isActive = activeHref === section.href;

            return (
              <a
                key={section.href}
                href={section.href}
                className={cn(
                  "type-body-small group relative min-h-8 rounded-[6px] py-1 pl-4 text-muted transition-[color,transform] duration-200 focus-ring",
                  isActive ? "translate-x-1 font-medium text-teal" : "hover:translate-x-1 hover:text-ink"
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-teal transition-[opacity,scale] duration-200",
                    isActive ? "scale-100 opacity-100" : "scale-50 opacity-0 group-hover:opacity-40"
                  )}
                />
                {section.label}
              </a>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
