"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform
} from "motion/react";
import { motionPresets } from "./presets";

export type CountSpec = {
  from: number;
  to: number;
  prefix?: string;
  suffix?: string;
  /** Compact keeps large numbers readable: 0 → 1.2M → 4M instead of seven churning digits. */
  format?: "compact";
  delay?: number;
};

type CountUpProps = CountSpec & {
  /** Shown verbatim under reduced motion. */
  fallback: string;
  className?: string;
};

const compact = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1
});

export function CountUp({
  from,
  to,
  prefix = "",
  suffix = "",
  format,
  delay = 0,
  fallback,
  className
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.5 });

  // Starts at the final value so server render and no-JS both show the real
  // number; the effect rewinds to `from` only once we're actually animating.
  const value = useMotionValue(to);
  const text = useTransform(value, (latest) => {
    const rounded = Math.round(latest);
    return `${prefix}${format === "compact" ? compact.format(rounded) : rounded}${suffix}`;
  });

  useEffect(() => {
    if (reducedMotion || !inView) return;
    value.set(from);
    const controls = animate(value, to, { ...motionPresets.countUp, delay });
    return () => controls.stop();
  }, [delay, from, inView, reducedMotion, to, value]);

  if (reducedMotion) {
    return <span className={className}>{fallback}</span>;
  }

  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  );
}
