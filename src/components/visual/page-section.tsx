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
        /* The gutter grows with the viewport until the max-width takes over.
           At 1280px the container is exactly as wide as the window, so a fixed
           32px gutter left the content running edge to edge on a small laptop
           while a wide monitor gets hundreds of pixels of margin. */
        "relative mx-auto flex w-full flex-col px-5 md:px-8 lg:px-[max(2rem,4vw)]",
        sectionWidth[width],
        sectionSpacing[spacing],
        className
      )}
    >
      {children}
    </section>
  );
}
