import type { ReactNode } from "react";
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
  tone = "card"
}: {
  children: ReactNode;
  className?: string;
  padding?: keyof typeof cardPadding;
  tone?: keyof typeof cardTone;
}) {
  return (
    <div
      className={cn(
        cardTone[tone],
        cardPadding[padding],
        className
      )}
    >
      {children}
    </div>
  );
}
