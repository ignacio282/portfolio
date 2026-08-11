"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { motionDistances, motionPresets } from "./presets";

/**
 * Reveals trigger on "some" (a 0 intersection threshold) rather than a
 * fraction of the element. A fractional threshold is measured against the
 * element's own height, so anything taller than the viewport — a stacked
 * grid on a phone, a long case study section — can never satisfy it, and
 * the content stays at opacity 0 forever. "some" is independent of both
 * element and viewport size, so it behaves the same on every device.
 */
const REVEAL_AMOUNT = "some" as const;
const REVEAL_MARGIN = "0px 0px -10% 0px";

type RevealAmount = number | "some" | "all";

type AnimatedSectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  delay?: number;
  amount?: RevealAmount;
};

export function AnimatedSection({
  children,
  id,
  className,
  delay = 0,
  amount = REVEAL_AMOUNT
}: AnimatedSectionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      id={id}
      className={className}
      initial={{
        opacity: reducedMotion ? 1 : 0,
        y: reducedMotion ? 0 : motionDistances.sectionY
      }}
      whileInView={{
        opacity: 1,
        y: 0
      }}
      viewport={{ once: true, margin: REVEAL_MARGIN, amount }}
      transition={{
        ...motionPresets.sectionSpring,
        delay: reducedMotion ? 0 : delay
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerGroup({
  children,
  className,
  stagger = 0.1,
  delayChildren = 0.04,
  trigger = "view",
  margin = REVEAL_MARGIN,
  amount = REVEAL_AMOUNT
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  trigger?: "view" | "load";
  margin?: string;
  amount?: RevealAmount;
}) {
  const reducedMotion = useReducedMotion();
  const isLoadTriggered = trigger === "load";

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      animate={isLoadTriggered ? "show" : undefined}
      whileInView={isLoadTriggered ? undefined : "show"}
      viewport={isLoadTriggered ? undefined : { once: true, margin, amount }}
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren: reducedMotion ? 0 : delayChildren,
            staggerChildren: reducedMotion ? 0 : stagger
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: {
          opacity: reducedMotion ? 1 : 0,
          y: reducedMotion ? 0 : motionDistances.sectionY
        },
        show: {
          opacity: 1,
          y: 0,
          transition: motionPresets.staggerItemSpring
        }
      }}
    >
      {children}
    </motion.div>
  );
}
