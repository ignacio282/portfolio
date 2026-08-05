"use client";

import type { ReactNode } from "react";
import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

export function Disclosure({
  title,
  children,
  className,
  defaultOpen = false
}: {
  title: string;
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const panelId = useId();
  const triggerId = useId();

  return (
    <div className={cn("landing-disclosure", className)}>
      <h3>
        <button
          aria-controls={panelId}
          aria-expanded={isOpen}
          className="landing-disclosure-trigger type-small-title focus-ring"
          id={triggerId}
          onClick={() => setIsOpen((open) => !open)}
          type="button"
        >
          {title}
          <ChevronDown aria-hidden="true" className="landing-disclosure-icon" size={22} />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            animate={{ height: "auto", opacity: 1 }}
            aria-labelledby={triggerId}
            className="landing-disclosure-panel"
            exit={{ height: 0, opacity: 0 }}
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            role="region"
            transition={
              reducedMotion
                ? { duration: 0 }
                : {
                    height: { duration: 0.28, ease: [0.2, 0, 0, 1] },
                    opacity: { duration: 0.2 }
                  }
            }
          >
            <div className="pb-6">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
