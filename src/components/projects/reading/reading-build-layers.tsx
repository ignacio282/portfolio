"use client";

import type { Variants } from "motion/react";
import { useRef } from "react";
import { motion } from "motion/react";
import { figureEase, figureVariants } from "@/components/motion/figure-variants";
import { useFigureLoop } from "@/components/motion/use-figure-loop";
import { readingFigures } from "@/content/reading-figures";

const { buildLayers } = readingFigures;

const WIDTH = 900;
const HEIGHT = 300;

const PANEL = { width: 288, height: 236, y: 32, radius: 12, tab: 20 };
const ROW_LEFT = (WIDTH - buildLayers.panels.length * PANEL.width) / 2;
const MID_Y = PANEL.y + PANEL.height / 2;

const panelX = (index: number) => ROW_LEFT + index * PANEL.width;

/**
 * One puzzle piece: a rounded panel with a tab on its right edge and a matching
 * notch on its left. Both are the same semicircle at the same coordinates, so
 * neighbouring panels key into each other exactly rather than approximately.
 */
const panelPath = (index: number) => {
  const x = panelX(index);
  const { width: w, height: h, y, radius: r, tab } = PANEL;
  const hasTab = index < buildLayers.panels.length - 1;
  const hasNotch = index > 0;

  return [
    `M ${x + r} ${y}`,
    `H ${x + w - r}`,
    `A ${r} ${r} 0 0 1 ${x + w} ${y + r}`,
    `V ${MID_Y - tab}`,
    hasTab ? `A ${tab} ${tab} 0 0 1 ${x + w} ${MID_Y + tab}` : "",
    `V ${y + h - r}`,
    `A ${r} ${r} 0 0 1 ${x + w - r} ${y + h}`,
    `H ${x + r}`,
    `A ${r} ${r} 0 0 1 ${x} ${y + h - r}`,
    `V ${MID_Y + tab}`,
    hasNotch ? `A ${tab} ${tab} 0 0 1 ${x} ${MID_Y - tab}` : "",
    `V ${y + r}`,
    `A ${r} ${r} 0 0 1 ${x + r} ${y}`,
    "Z"
  ]
    .filter(Boolean)
    .join(" ");
};

const seamPath = (index: number) => {
  const x = panelX(index);
  return `M ${x} ${MID_Y - PANEL.tab} A ${PANEL.tab} ${PANEL.tab} 0 0 1 ${x} ${MID_Y + PANEL.tab}`;
};

// Beat sheet, in seconds. Each piece slides in from the left carrying its own
// copy and seats against the one before it; the seam flashes on contact.
const PANEL_AT = (index: number) => index * 1.2;
const SEAM_AT = (index: number) => PANEL_AT(index) + 0.62;
const LOOP_MS = 12000;

export function ReadingBuildLayers() {
  const figureRef = useRef<HTMLDivElement>(null);
  const { cycle, isInView, reducedMotion } = useFigureLoop(figureRef, { loopMs: LOOP_MS });
  const { fadeAt, travelAt, still } = figureVariants(reducedMotion);

  // The click. It has to be brief — a seam that stays lit stops reading as a
  // moment of contact and starts reading as a label.
  const seamFlash = (delay: number): Variants =>
    still
      ? { hidden: { opacity: 0 }, show: { opacity: 0 } }
      : {
          hidden: { opacity: 0 },
          show: {
            opacity: [0, 1, 0],
            transition: { duration: 0.9, delay, ease: figureEase.ui, times: [0, 0.25, 1] }
          }
        };

  return (
    // Below its minimum width the 14px bullets shrink under a readable size, so
    // the figure scrolls sideways instead of getting smaller.
    <div className="figure-scroll mt-12" ref={figureRef}>
      <motion.svg
        animate={isInView ? "show" : "hidden"}
        className="block h-auto w-full min-w-195"
        initial="hidden"
        key={cycle}
        role="img"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      >
        <title>{buildLayers.title}</title>
        <desc>{buildLayers.description}</desc>

        {/* The three empty cut-outs, so the interlock is legible before any
            piece has arrived to prove it. */}
        <motion.g variants={fadeAt(0, { duration: 0.4 })}>
          {buildLayers.panels.map((panel, index) => (
            <path
              d={panelPath(index)}
              fill="none"
              key={panel.name}
              stroke="var(--color-line)"
              strokeDasharray="5 5"
              strokeWidth="1.5"
            />
          ))}
        </motion.g>

        {buildLayers.panels.map((panel, index) => {
          const x = panelX(index);

          return (
            <g key={panel.name}>
              {/* The piece carries its copy in with it. Sliding an empty panel
                  into place and filling it afterwards reads as two moves. */}
              <motion.g variants={travelAt(PANEL_AT(index), { x: -70, y: -18, duration: 0.7 })}>
                <path
                  d={panelPath(index)}
                  fill="var(--color-card)"
                  stroke="var(--color-ink)"
                  strokeWidth="1.75"
                />
                <text
                  className="figure-label"
                  textAnchor="middle"
                  x={x + PANEL.width / 2}
                  y={PANEL.y + 48}
                >
                  {panel.name}
                </text>
                {panel.bullets.map((bullet, bulletIndex) => {
                  const bulletY = PANEL.y + 110 + bulletIndex * 40;
                  return (
                    <g key={bullet}>
                      <circle cx={x + 30} cy={bulletY - 5} fill="var(--color-teal)" r="3.5" />
                      <text className="figure-note" x={x + 44} y={bulletY}>
                        {bullet}
                      </text>
                    </g>
                  );
                })}
              </motion.g>

              {index === 0 ? null : (
                <motion.path
                  d={seamPath(index)}
                  fill="none"
                  stroke="var(--color-teal)"
                  strokeLinecap="round"
                  strokeWidth="3"
                  variants={seamFlash(SEAM_AT(index))}
                />
              )}
            </g>
          );
        })}
      </motion.svg>
    </div>
  );
}
