"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { motionPresets } from "./presets";

export function PageFade({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className="relative z-10"
      initial={{
        opacity: reducedMotion ? 1 : 0.98,
        y: reducedMotion ? 0 : 20
      }}
      animate={{ opacity: 1, y: 0 }}
      transition={motionPresets.pageFade}
    >
      {children}
    </motion.div>
  );
}
