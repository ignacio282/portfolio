"use client";

import { motion, useReducedMotion } from "motion/react";
import { startupsContent } from "@/content/startups";

const { person } = startupsContent.bridge;

// Where each label sits, and the connector that ties it back to the figure.
const labels = [
  { anchor: "start" as const, x: 610, y: 96, line: { x1: 520, y1: 148, x2: 596, y2: 100 } },
  { anchor: "start" as const, x: 610, y: 252, line: { x1: 560, y1: 252, x2: 596, y2: 252 } },
  { anchor: "end" as const, x: 356, y: 340, line: { x1: 424, y1: 292, x2: 370, y2: 332 } }
];

export function StartupsPersonDiagram() {
  const reducedMotion = useReducedMotion();

  const draw = reducedMotion
    ? { hidden: { pathLength: 1, opacity: 1 }, show: { pathLength: 1, opacity: 1 } }
    : {
        hidden: { pathLength: 0, opacity: 0 },
        show: {
          pathLength: 1,
          opacity: 1,
          transition: { duration: 0.5, ease: [0.2, 0, 0, 1] as const }
        }
      };

  const fade = reducedMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.4 } }
      };

  return (
    <figure className="landing-figure mt-12">
      <motion.svg
        className="landing-figure-svg"
        initial="hidden"
        role="img"
        transition={{ staggerChildren: reducedMotion ? 0 : 0.16 }}
        viewBox="0 0 960 400"
        viewport={{ once: true, amount: 0.4 }}
        whileInView="show"
      >
        <title>{person.title}</title>
        <desc>{person.description}</desc>

        <motion.g fill="var(--color-ink)" variants={fade}>
          <circle cx="480" cy="172" r="46" />
          <path d="M400 296 C400 232, 436 216, 480 216 C524 216, 560 232, 560 296 Z" />
        </motion.g>

        {labels.map((label, index) => (
          <motion.g key={person.labels[index]} variants={fade}>
            <motion.line
              stroke="var(--color-line)"
              strokeWidth="2"
              variants={draw}
              x1={label.line.x1}
              x2={label.line.x2}
              y1={label.line.y1}
              y2={label.line.y2}
            />
            <text
              className="landing-figure-label"
              textAnchor={label.anchor}
              x={label.x}
              y={label.y}
            >
              {person.labels[index]}
            </text>
          </motion.g>
        ))}
      </motion.svg>
    </figure>
  );
}
