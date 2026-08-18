"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { figureVariants } from "@/components/motion/figure-variants";
import { useFigureLoop } from "@/components/motion/use-figure-loop";
import { readingFigures } from "@/content/reading-figures";

const { coreIdea } = readingFigures;

const WIDTH = 960;
const HEIGHT = 176;

const NODE = { width: 188, height: 104, gap: 54, y: 36, radius: 10 };
const ROW_WIDTH = coreIdea.steps.length * NODE.width + (coreIdea.steps.length - 1) * NODE.gap;
const ROW_LEFT = (WIDTH - ROW_WIDTH) / 2;

const nodeBox = (index: number) => ({
  x: ROW_LEFT + index * (NODE.width + NODE.gap),
  y: NODE.y,
  width: NODE.width,
  height: NODE.height
});

// Beat sheet, in seconds. A stage lands with its label already on it, the arrow
// reaches for the next one — and the next stage is arriving as it finishes.
const NODE_AT = (index: number) => index * 1;
const ARROW_AT = (index: number) => NODE_AT(index) + 0.55;
const LOOP_MS = 11000;

export function ReadingCoreIdeaFlow() {
  const figureRef = useRef<HTMLDivElement>(null);
  const { cycle, isInView, reducedMotion } = useFigureLoop(figureRef, { loopMs: LOOP_MS });
  const { drawAt, fadeAt, popAt } = figureVariants(reducedMotion);

  return (
    // Below its minimum width the 14px labels shrink under a readable size, so
    // the figure scrolls sideways instead of getting smaller.
    <div className="figure-scroll" ref={figureRef}>
      <motion.svg
        animate={isInView ? "show" : "hidden"}
        className="block h-auto w-full min-w-205"
        initial="hidden"
        key={cycle}
        role="img"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      >
        <title>{coreIdea.title}</title>
        <desc>{coreIdea.description}</desc>

        {/* The empty slots sit there from the start, so the figure reads as a
            shape being filled in rather than one being invented. */}
        <motion.g variants={fadeAt(0, { duration: 0.4 })}>
          {coreIdea.steps.map((step, index) => {
            const box = nodeBox(index);
            return (
              <rect
                fill="none"
                height={box.height}
                key={step.name}
                rx={NODE.radius}
                stroke="var(--color-line)"
                strokeDasharray="5 5"
                strokeWidth="1"
                width={box.width}
                x={box.x}
                y={box.y}
              />
            );
          })}
        </motion.g>

        {coreIdea.steps.map((step, index) => {
          const box = nodeBox(index);
          const centerX = box.x + box.width / 2;
          const isLast = index === coreIdea.steps.length - 1;

          // The gap between this node and the next one, trimmed at both ends so
          // the arrow never touches either box.
          const shaftStart = box.x + box.width + 10;
          const shaftEnd = box.x + box.width + NODE.gap - 12;
          const arrowY = box.y + box.height / 2;

          return (
            <g key={step.name}>
              {/* Box and label land as one object. A stage that arrives empty
                  and gets named a beat later reads as two events, not one. */}
              <motion.g variants={popAt(NODE_AT(index))}>
                <rect
                  fill="var(--color-card)"
                  height={box.height}
                  rx={NODE.radius}
                  stroke="var(--color-ink)"
                  strokeWidth="1.25"
                  width={box.width}
                  x={box.x}
                  y={box.y}
                />
                <text className="figure-label" textAnchor="middle" x={centerX} y={box.y + 42}>
                  {step.name}
                </text>
                <text className="figure-note" textAnchor="middle" x={centerX} y={box.y + 70}>
                  {step.note}
                </text>
              </motion.g>

              {isLast ? null : (
                <g>
                  <motion.path
                    d={`M ${shaftStart} ${arrowY} H ${shaftEnd}`}
                    fill="none"
                    stroke="var(--color-line)"
                    strokeWidth="1.5"
                    variants={drawAt(ARROW_AT(index), 0.4)}
                  />
                  <motion.path
                    d={`M ${shaftEnd - 5} ${arrowY - 6} L ${shaftEnd + 2} ${arrowY} L ${shaftEnd - 5} ${arrowY + 6}`}
                    fill="none"
                    stroke="var(--color-teal)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    variants={fadeAt(ARROW_AT(index) + 0.35, { duration: 0.25 })}
                  />
                </g>
              )}
            </g>
          );
        })}
      </motion.svg>
    </div>
  );
}
