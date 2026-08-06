"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { startupsContent } from "@/content/startups";

const { person } = startupsContent.bridge;

// Matches the journey chart: draw, hold, draw again.
const LOOP_MS = 9500;

export function StartupsPersonDiagram() {
  const reducedMotion = useReducedMotion();
  const figureRef = useRef<HTMLElement>(null);
  const isInView = useInView(figureRef, { amount: 0.35 });
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reducedMotion || !isInView) {
      return;
    }

    const timer = window.setInterval(() => {
      setCycle((current) => current + 1);
    }, LOOP_MS);

    return () => window.clearInterval(timer);
  }, [isInView, reducedMotion]);

  const draw = (delay: number) =>
    reducedMotion
      ? { hidden: { pathLength: 1, opacity: 1 }, show: { pathLength: 1, opacity: 1 } }
      : {
          hidden: { pathLength: 0, opacity: 0 },
          show: {
            pathLength: 1,
            opacity: 1,
            transition: {
              pathLength: { duration: 1.6, delay, ease: [0.3, 0, 0.2, 1] as const },
              opacity: { duration: 0.2, delay }
            }
          }
        };

  return (
    <figure className="landing-orbit-wrap mt-12" ref={figureRef}>
      <div className="landing-orbit">
        <motion.svg
          animate={isInView ? "show" : "hidden"}
          className="landing-orbit-svg"
          initial="hidden"
          key={cycle}
          role="img"
          viewBox="0 0 100 100"
        >
          <title>{person.title}</title>
          <desc>{person.description}</desc>

          <motion.circle
            cx="50"
            cy="50"
            fill="none"
            r="37"
            stroke="var(--color-line)"
            strokeWidth="0.4"
            variants={draw(0)}
          />
          <motion.circle
            cx="50"
            cy="43"
            fill="none"
            r="7.6"
            stroke="var(--color-ink)"
            strokeLinecap="round"
            strokeWidth="2.6"
            variants={draw(0.5)}
          />
          <motion.path
            d="M38 63 A12 12 0 0 1 62 63"
            fill="none"
            stroke="var(--color-ink)"
            strokeLinecap="round"
            strokeWidth="2.6"
            variants={draw(1.1)}
          />
        </motion.svg>

        <div aria-hidden="true" className="landing-orbit-ring">
          {person.labels.map((label, index) => (
            <div
              className="landing-orbit-slot"
              key={label}
              style={{ "--slot-angle": `${(index * 360) / person.labels.length}deg` } as React.CSSProperties}
            >
              <span className="landing-orbit-pill">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </figure>
  );
}
