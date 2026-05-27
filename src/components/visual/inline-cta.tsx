import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

export function InlineCTA({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("ui-button mt-6", className)}>
      {children}
      <ArrowRight aria-hidden="true" size={20} />
    </span>
  );
}
