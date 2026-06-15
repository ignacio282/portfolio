"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { motionDistances, motionPresets } from "./presets";

type AnimatedSectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  delay?: number;
  amount?: number;
};

export function AnimatedSection({
  children,
  id,
  className,
  delay = 0,
  amount = 0.28
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
      viewport={{ once: true, margin: "-8% 0px -14% 0px", amount }}
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
  margin = "-8% 0px -14% 0px",
  amount = 0.26
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  trigger?: "view" | "load";
  margin?: string;
  amount?: number;
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
