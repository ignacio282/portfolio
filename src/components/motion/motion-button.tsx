"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { motionPresets } from "./presets";

export function MotionButton({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.span
      className={cn("inline-flex", className)}
      whileHover={reducedMotion ? undefined : { y: -2 }}
      whileTap={reducedMotion ? undefined : { scale: 0.96 }}
      transition={motionPresets.buttonSpring}
    >
      {children}
    </motion.span>
  );
}
