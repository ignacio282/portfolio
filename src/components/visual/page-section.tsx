import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const sectionSpacing = {
  none: "",
  sm: "layout-section-sm",
  md: "layout-section-md",
  lg: "layout-section-lg",
  hero: "layout-section-hero"
};

const sectionWidth = {
  /* Long-form reading: narrower than the rest of the site so a paragraph
     running the full width of its container still holds a sane measure. */
  reading: "max-w-[1040px]",
  default: "max-w-[1280px]",
  wide: "max-w-[1420px]"
};

export function PageSection({
  children,
  id,
  className,
  spacing = "none",
  width = "default"
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  spacing?: keyof typeof sectionSpacing;
  width?: keyof typeof sectionWidth;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative mx-auto flex w-full flex-col px-5 md:px-8",
        sectionWidth[width],
        sectionSpacing[spacing],
        className
      )}
    >
      {children}
    </section>
  );
}
