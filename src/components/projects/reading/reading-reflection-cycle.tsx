"use client";

import type { Variants } from "motion/react";
import { useRef } from "react";
import { motion } from "motion/react";
import { figureEase, figureVariants } from "@/components/motion/figure-variants";
import { useFigureLoop } from "@/components/motion/use-figure-loop";
import { readingFigures } from "@/content/reading-figures";

const { reflectionCycle } = readingFigures;

const WIDTH = 500;
const HEIGHT = 470;

const PILL = { x: 155, y: 44, width: 190, height: 44, radius: 10 };
const CARD = { x: 70, width: 340, height: 132, radius: 12 };
const CARD_TOPS = [118, 280];
const SPINE_X = WIDTH / 2;

// The route home: down out of reflection mode, around the right, back into the
// pill. It is the only stroke that is teal end to end, because closing the loop
// is the whole claim the figure makes.
const RETURN_PATH = `M ${SPINE_X} ${CARD_TOPS[1] + CARD.height} V 430 Q ${SPINE_X} 440 ${SPINE_X + 10} 440 H 442 Q 452 440 452 430 V 76 Q 452 66 442 66 H ${PILL.x + PILL.width + 8}`;

const connectorPath = (fromY: number, toY: number) => `M ${SPINE_X} ${fromY} V ${toY}`;

const CONNECTORS = [
  { from: PILL.y + PILL.height, to: CARD_TOPS[0] },
  { from: CARD_TOPS[0] + CARD.height, to: CARD_TOPS[1] }
];

// Beat sheet, in seconds. The long beats are the two fills: a mode that filled
// instantly would look like a state, and these are stretches of work.
const FILL_DURATION = 1.7;
const PILL_AT = 0;
const CONNECTOR_AT = [0.5, 3.1];
const CARD_AT = [0.9, 3.5];
const FILL_AT = [1.3, 3.9];
const RETURN_AT = 5.7;
const PULSE_AT = 6.5;
const LOOP_MS = 13000;

export function ReadingReflectionCycle() {
  const figureRef = useRef<HTMLDivElement>(null);
  const { cycle, isInView, reducedMotion } = useFigureLoop(figureRef, { loopMs: LOOP_MS });
  const { drawAt, fadeAt, popAt, still } = figureVariants(reducedMotion);

  // A mode fills from its top edge down, which is what makes it read as time
  // passing rather than a box switching on. Animating the rect's height keeps
  // the growth in user space, so no transform origin has to be guessed.
  const fillTo = (delay: number): Variants =>
    still
      ? { hidden: { height: CARD.height }, show: { height: CARD.height } }
      : {
          hidden: { height: 0 },
          show: {
            height: CARD.height,
            transition: { duration: FILL_DURATION, delay, ease: figureEase.draw }
          }
        };

  // One breath on the pill when the loop closes. Under reduced motion it simply
  // never appears — the resting figure is the completed cycle, not a flash.
  const pulseAt = (delay: number): Variants =>
    still
      ? { hidden: { opacity: 0 }, show: { opacity: 0 } }
      : {
          hidden: { opacity: 0 },
          show: {
            opacity: [0, 1, 0],
            transition: { duration: 1.2, delay, ease: figureEase.ui, times: [0, 0.3, 1] }
          }
        };

  return (
    // Below its minimum width the 14px card copy shrinks under a readable size,
    // so the figure scrolls sideways instead of getting smaller.
    <div className="figure-scroll mx-auto max-w-130" ref={figureRef}>
      <motion.svg
        animate={isInView ? "show" : "hidden"}
        className="block h-auto w-full min-w-110"
        initial="hidden"
        key={cycle}
        role="img"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      >
        <title>{reflectionCycle.title}</title>
        <desc>{reflectionCycle.description}</desc>

        <defs>
          {CARD_TOPS.map((top, index) => (
            <clipPath id={`reading-cycle-clip-${index}`} key={top}>
              <rect height={CARD.height} rx={CARD.radius} width={CARD.width} x={CARD.x} y={top} />
            </clipPath>
          ))}
        </defs>

        {/* The whole route, dotted, before anything runs. The reader can see
            where this is going, which is what lets the beats feel like progress
            instead of reveal. */}
        <motion.g fill="none" stroke="var(--color-line)" variants={fadeAt(0.15, { duration: 0.45 })}>
          {CARD_TOPS.map((top) => (
            <rect
              height={CARD.height}
              key={top}
              rx={CARD.radius}
              strokeDasharray="5 5"
              strokeWidth="1"
              width={CARD.width}
              x={CARD.x}
              y={top}
            />
          ))}
          {CONNECTORS.map((connector) => (
            <path
              d={connectorPath(connector.from, connector.to)}
              key={connector.from}
              strokeDasharray="5 5"
              strokeWidth="1.5"
            />
          ))}
          <path d={RETURN_PATH} strokeDasharray="5 5" strokeWidth="1.5" />
        </motion.g>

        <motion.g variants={popAt(PILL_AT)}>
          <rect
            fill="var(--color-card)"
            height={PILL.height}
            rx={PILL.radius}
            stroke="var(--color-ink)"
            strokeWidth="1.25"
            width={PILL.width}
            x={PILL.x}
            y={PILL.y}
          />
          <text
            className="figure-label"
            dominantBaseline="middle"
            textAnchor="middle"
            x={PILL.x + PILL.width / 2}
            y={PILL.y + PILL.height / 2 + 1}
          >
            {reflectionCycle.startLabel}
          </text>
        </motion.g>

        <motion.rect
          fill="none"
          height={PILL.height + 12}
          rx={PILL.radius + 4}
          stroke="var(--color-teal)"
          strokeWidth="1.5"
          variants={pulseAt(PULSE_AT)}
          width={PILL.width + 12}
          x={PILL.x - 6}
          y={PILL.y - 6}
        />

        {/* Each leg carries the colour of the mode it feeds, so the eye can
            tell which half of the cycle it is looking at. */}
        {CONNECTORS.map((connector, index) => (
          <motion.path
            d={connectorPath(connector.from, connector.to)}
            fill="none"
            key={connector.from}
            stroke={reflectionCycle.modes[index].accent}
            strokeWidth="1.5"
            variants={drawAt(CONNECTOR_AT[index], 0.35)}
          />
        ))}

        {reflectionCycle.modes.map((mode, index) => {
          const top = CARD_TOPS[index];

          return (
            <g key={mode.name}>
              {/* The card turns white first; the wash then grows down over it,
                  so the progress reads against a blank page rather than
                  against the paper. */}
              <motion.g variants={fadeAt(CARD_AT[index], { duration: 0.4 })}>
                <rect
                  fill="var(--color-card)"
                  height={CARD.height}
                  rx={CARD.radius}
                  width={CARD.width}
                  x={CARD.x}
                  y={top}
                />
              </motion.g>

              <g clipPath={`url(#reading-cycle-clip-${index})`}>
                <motion.rect
                  fill={mode.wash}
                  variants={fillTo(FILL_AT[index])}
                  width={CARD.width}
                  x={CARD.x}
                  y={top}
                />
              </g>

              <motion.g variants={fadeAt(CARD_AT[index], { duration: 0.4 })}>
                <rect
                  fill="none"
                  height={CARD.height}
                  rx={CARD.radius}
                  stroke="var(--color-ink)"
                  strokeWidth="1.25"
                  width={CARD.width}
                  x={CARD.x}
                  y={top}
                />
                {/* .figure-label pins the fill to ink, so the accent has to
                    come through style to win the cascade. */}
                <text
                  className="figure-label"
                  style={{ fill: mode.accent }}
                  x={CARD.x + 24}
                  y={top + 34}
                >
                  {mode.name}
                </text>
                <text className="figure-note" textAnchor="end" x={CARD.x + CARD.width - 24} y={top + 34}>
                  {mode.phase}
                </text>
                <text className="figure-note" x={CARD.x + 24} y={top + 74}>
                  {mode.goal}
                </text>
                <text className="figure-note" x={CARD.x + 24} y={top + 106}>
                  {mode.role}
                </text>
              </motion.g>
            </g>
          );
        })}

        <motion.path
          d={RETURN_PATH}
          fill="none"
          stroke="var(--color-teal)"
          strokeWidth="2"
          variants={drawAt(RETURN_AT, 0.9)}
        />
        <motion.path
          d={`M ${PILL.x + PILL.width + 15} ${PILL.y + 16} L ${PILL.x + PILL.width + 8} ${PILL.y + 22} L ${PILL.x + PILL.width + 15} ${PILL.y + 28}`}
          fill="none"
          stroke="var(--color-teal)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          variants={fadeAt(RETURN_AT + 0.75, { duration: 0.25 })}
        />
      </motion.svg>
    </div>
  );
}
