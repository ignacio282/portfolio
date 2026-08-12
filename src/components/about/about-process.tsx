"use client";

import { useRef } from "react";
import { Activity, PenTool, Search, Share2, Target } from "lucide-react";
import { motion } from "motion/react";
import { figureVariants } from "@/components/motion/figure-variants";
import { useFigureLoop } from "@/components/motion/use-figure-loop";
import type { AboutProcessStep } from "@/content/about";

const ICONS = [Search, Target, PenTool, Share2, Activity];

// Beat sheet, in seconds. A circle lands, its name and lines settle, the arrow
// reaches for the next one — then the next step starts. Five steps at 1.15s
// each finish around 6s, and the rest of the loop is stillness to read in.
const CIRCLE_AT = (index: number) => index * 1.15;
const TEXT_AT = (index: number) => CIRCLE_AT(index) + 0.3;
const ARROW_AT = (index: number) => CIRCLE_AT(index) + 0.62;
const LOOP_MS = 13000;

export function AboutProcess({ steps }: { steps: AboutProcessStep[] }) {
  const figureRef = useRef<HTMLDivElement>(null);
  const { cycle, isInView, reducedMotion } = useFigureLoop(figureRef, { loopMs: LOOP_MS });
  const { drawAt, fadeAt, popAt } = figureVariants(reducedMotion);

  return (
    <div ref={figureRef}>
      <motion.ol
        animate={isInView ? "show" : "hidden"}
        className="about-process"
        initial="hidden"
        key={cycle}
      >
        {steps.map((step, index) => {
          const Icon = ICONS[index % ICONS.length];
          const isLast = index === steps.length - 1;

          return (
            <li className="about-process-step" key={step.id}>
              <motion.span className="about-process-circle" variants={popAt(CIRCLE_AT(index))}>
                <Icon aria-hidden="true" size={28} strokeWidth={1.6} />
              </motion.span>

              <motion.span
                className="mt-4 block"
                variants={fadeAt(TEXT_AT(index), { duration: 0.35, y: 8 })}
              >
                <span className="type-small-title block">{step.title}</span>
                {step.lines.map((line) => (
                  <span className="type-body-small mt-1 block text-muted" key={line}>
                    {line}
                  </span>
                ))}
              </motion.span>

              {isLast ? null : (
                <svg
                  aria-hidden="true"
                  className="about-process-connector"
                  fill="none"
                  viewBox="0 0 16 64"
                >
                  <motion.path
                    d="M8 2 V 54"
                    stroke="var(--color-line)"
                    strokeWidth="2"
                    variants={drawAt(ARROW_AT(index), 0.45)}
                  />
                  <motion.path
                    d="M3 49 L8 56 L13 49"
                    stroke="var(--color-teal)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    variants={fadeAt(ARROW_AT(index) + 0.4, { duration: 0.25 })}
                  />
                </svg>
              )}
            </li>
          );
        })}
      </motion.ol>
    </div>
  );
}
