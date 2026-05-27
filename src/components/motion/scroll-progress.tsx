"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-teal"
      style={{ scaleX }}
    />
  );
}
