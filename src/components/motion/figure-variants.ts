import type { Variants } from "motion/react";
import { motionPresets } from "./presets";

// Diagram-scale strokes get a long, settling ease; small UI marks get a
// snappier one. Both are the curves already used on the startups page.
export const figureEase = {
  draw: [0.3, 0, 0.2, 1] as const,
  ui: [0.2, 0, 0, 1] as const
};

/**
 * Variant factories for hand-drawn figures, bound to one reduced-motion answer.
 *
 * Every factory returns identical `hidden` and `show` states when reduced
 * motion is on, so the figure renders as its own final frame — fully drawn,
 * nothing moving — rather than disappearing.
 *
 * Sequencing is by explicit `delay` on each element, not by parent stagger:
 * diagrams need beats that don't all have to be evenly spaced.
 */
export function figureVariants(reducedMotion: boolean | null) {
  const still = Boolean(reducedMotion);

  /** A stroke paints itself from start to end. */
  const drawAt = (delay: number, duration = 1.6): Variants =>
    still
      ? { hidden: { pathLength: 1, opacity: 1 }, show: { pathLength: 1, opacity: 1 } }
      : {
          hidden: { pathLength: 0, opacity: 0 },
          show: {
            pathLength: 1,
            opacity: 1,
            transition: {
              pathLength: { duration, delay, ease: figureEase.draw },
              opacity: { duration: 0.2, delay }
            }
          }
        };

  /** Opacity 0 → 1, with an optional rise. */
  const fadeAt = (delay: number, { duration = 0.5, y = 0 }: { duration?: number; y?: number } = {}): Variants =>
    still
      ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
      : {
          hidden: { opacity: 0, y },
          show: { opacity: 1, y: 0, transition: { duration, delay, ease: figureEase.ui } }
        };

  /** Scale up onto a spring — for shapes and dots landing. */
  const popAt = (delay: number, from = 0.6): Variants =>
    still
      ? { hidden: { opacity: 1, scale: 1 }, show: { opacity: 1, scale: 1 } }
      : {
          hidden: { opacity: 0, scale: from },
          show: {
            opacity: 1,
            scale: 1,
            transition: { ...motionPresets.buttonSpring, delay }
          }
        };

  /** Move from an offset into place. Give the offset in viewBox units. */
  const travelAt = (
    delay: number,
    { x = 0, y = 0, duration = 0.7 }: { x?: number; y?: number; duration?: number }
  ): Variants =>
    still
      ? { hidden: { opacity: 1, x: 0, y: 0 }, show: { opacity: 1, x: 0, y: 0 } }
      : {
          hidden: { opacity: 0, x, y },
          show: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
              x: { duration, delay, ease: figureEase.draw },
              y: { duration, delay, ease: figureEase.draw },
              opacity: { duration: 0.25, delay }
            }
          }
        };

  return { drawAt, fadeAt, popAt, travelAt, still };
}
