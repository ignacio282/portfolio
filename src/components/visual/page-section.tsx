import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const sectionSpacing = {
  none: "",
  sm: "layout-section-sm",
  md: "layout-section-md",
  lg: "layout-section-lg",
  hero: "layout-section-hero"
};

export function PageSection({
  children,
  id,
  className,
  spacing = "none",
  wide = false
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  spacing?: keyof typeof sectionSpacing;
  wide?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative mx-auto flex w-full flex-col px-5 md:px-8",
        wide ? "max-w-[1420px]" : "max-w-[1280px]",
        sectionSpacing[spacing],
        className
      )}
    >
      {children}
    </section>
  );
}
