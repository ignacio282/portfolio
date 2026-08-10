"use client";

import type { RefObject } from "react";
import { useEffect, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

// A drawn figure plays its choreography once, then holds still for the rest of
// the beat before drawing itself again. The hold is the point: a diagram that
// never rests reads as decoration instead of explanation.
const DEFAULT_LOOP_MS = 9500;

/**
 * The loop harness every hand-drawn figure shares.
 *
 * Put `key={cycle}` on the root `motion.svg` — remounting it is what replays
 * the draw — and `animate={isInView ? "show" : "hidden"}`. Under reduced
 * motion the interval never starts, so the figure renders once and stays put.
 */
export function useFigureLoop(
  ref: RefObject<Element | null>,
  { loopMs = DEFAULT_LOOP_MS, amount = 0.35 }: { loopMs?: number; amount?: number } = {}
) {
  const reducedMotion = useReducedMotion();
  const isInView = useInView(ref, { amount });
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reducedMotion || !isInView) {
      return;
    }

    const timer = window.setInterval(() => {
      setCycle((current) => current + 1);
    }, loopMs);

    return () => window.clearInterval(timer);
  }, [isInView, loopMs, reducedMotion]);

  return { cycle, isInView, reducedMotion: Boolean(reducedMotion) };
}
