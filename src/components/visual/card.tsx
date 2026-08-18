import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

const cardPadding = {
  none: "",
  sm: "p-5",
  md: "p-8",
  lg: "p-8 md:p-10"
};

const cardTone = {
  card: "surface-card",
  paper: "surface-card surface-paper"
};

export function Card({
  children,
  className,
  padding = "none",
  style,
  tone = "card"
}: {
  children: ReactNode;
  className?: string;
  padding?: keyof typeof cardPadding;
  /** For passing custom properties such as --project-accent down to the card. */
  style?: CSSProperties;
  tone?: keyof typeof cardTone;
}) {
  return (
    <div
      className={cn(
        cardTone[tone],
        cardPadding[padding],
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}
