"use client";

import { useEffect, useMemo, useState } from "react";

export type StartupsSectionLink = {
  label: string;
  href: `#${string}`;
};

export function StartupsSectionNav({
  sections
}: {
  sections: readonly StartupsSectionLink[];
}) {
  const [activeHref, setActiveHref] = useState(sections[0]?.href);

  const sectionIds = useMemo(
    () => sections.map((section) => section.href.slice(1)),
    [sections]
  );

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

  return (
    <aside aria-label="Page sections" className="landing-side-nav">
      <nav className="flex flex-col gap-2">
        {sections.map((section) => (
          <a
            className="landing-side-nav-link type-body-small focus-ring"
            data-active={activeHref === section.href}
            href={section.href}
            key={section.href}
          >
            <span aria-hidden="true" className="landing-side-nav-dot" />
            {section.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
