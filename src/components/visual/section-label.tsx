import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const sectionLabelVariants = {
  default: "type-eyebrow",
  accent: "type-eyebrow-accent",
  case: "type-case-section-label"
};

export function SectionLabel({
  children,
  className,
  variant = "default"
}: {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof sectionLabelVariants;
}) {
  return (
    <p
      className={cn(
        sectionLabelVariants[variant],
        className
      )}
    >
      {children}
    </p>
  );
}
