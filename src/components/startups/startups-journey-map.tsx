"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { startupsContent } from "@/content/startups";

const { journey } = startupsContent.edgecases;

// The full sequence takes about 4.5s, so the rest of the beat is stillness
// before it draws itself again.
const LOOP_MS = 9500;

// Chart geometry. The viewBox is fixed and the container scrolls on small
// screens, so these numbers never have to respond to anything.
const WIDTH = 900;
const HEIGHT = 400;
const FIRST_X = 70;
const LAST_X = 830;
const ASSUMED_Y = 130;
const step = (LAST_X - FIRST_X) / (journey.stages.length - 1);
const stageX = journey.stages.map((_, index) => FIRST_X + index * step);

// How people actually move: fine at first, then setup and first use cost them.
const realY = [140, 200, 310, 255, 165];

const realPath = stageX
  .map((x, index) => {
    if (index === 0) {
      return `M ${x} ${realY[index]}`;
    }

    const previousX = stageX[index - 1];
    const controlOne = previousX + step * 0.4;
    const controlTwo = x - step * 0.4;

    return `C ${controlOne} ${realY[index - 1]}, ${controlTwo} ${realY[index]}, ${x} ${realY[index]}`;
  })
  .join(" ");

const assumedPath = `M ${FIRST_X} ${ASSUMED_Y} L ${LAST_X} ${ASSUMED_Y}`;

export function StartupsJourneyMap() {
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

  const draw = reducedMotion
    ? { hidden: { pathLength: 1 }, show: { pathLength: 1 } }
    : {
        hidden: { pathLength: 0 },
        show: {
          pathLength: 1,
          transition: { duration: 1.7, ease: [0.3, 0, 0.2, 1] as const }
        }
      };

  const fadeAt = (delay: number) =>
    reducedMotion
      ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
      : {
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { duration: 0.5, delay } }
        };

  return (
    <figure className="mt-12" ref={figureRef}>
      <figcaption className="flex flex-wrap items-center gap-x-8 gap-y-3">
        <span className="type-body-small flex items-center gap-3 text-muted">
          <span aria-hidden="true" className="legend-swatch-assumed" />
          {journey.legend.assumed}
        </span>
        <span className="type-body-small flex items-center gap-3 text-ink">
          <span aria-hidden="true" className="legend-swatch-real" />
          {journey.legend.real}
        </span>
      </figcaption>

      <div className="figure-scroll mt-8">
        <motion.svg
          animate={isInView ? "show" : "hidden"}
          className="figure-svg-wide"
          initial="hidden"
          key={cycle}
          role="img"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        >
          <title>{journey.title}</title>
          <desc>{journey.description}</desc>

          {stageX.map((x, index) => (
            <g key={journey.stages[index]}>
              <text className="figure-stage" textAnchor="middle" x={x} y={32}>
                {journey.stages[index]}
              </text>
              <line
                stroke="var(--color-line)"
                x1={x}
                x2={x}
                y1={52}
                y2={340}
              />
            </g>
          ))}

          <motion.path
            d={assumedPath}
            fill="none"
            stroke="var(--color-muted)"
            strokeDasharray="7 7"
            strokeLinecap="round"
            strokeWidth="2"
            variants={draw}
          />

          <motion.path
            d={realPath}
            fill="none"
            stroke="var(--color-teal)"
            strokeLinecap="round"
            strokeWidth="3"
            variants={{
              ...draw,
              show: {
                ...draw.show,
                transition: reducedMotion
                  ? { duration: 0 }
                  : { duration: 2.4, delay: 1.4, ease: [0.3, 0, 0.2, 1] as const }
              }
            }}
          />

          <motion.g variants={fadeAt(3.7)}>
            {stageX.map((x, index) => (
              <g key={`dots-${journey.stages[index]}`}>
                <circle cx={x} cy={ASSUMED_Y} fill="var(--color-muted)" r="4" />
                <circle cx={x} cy={realY[index]} fill="var(--color-teal)" r="6" />
              </g>
            ))}
          </motion.g>

          <motion.g variants={fadeAt(4.1)}>
            {journey.notes.map((note) => (
              <g key={note.text}>
                <line
                  stroke="var(--color-line)"
                  strokeWidth="1.5"
                  x1={stageX[note.stage]}
                  x2={stageX[note.stage]}
                  y1={realY[note.stage] + 14}
                  y2={realY[note.stage] + 42}
                />
                <text
                  className="figure-note"
                  textAnchor="middle"
                  x={stageX[note.stage]}
                  y={realY[note.stage] + 62}
                >
                  {note.text}
                </text>
              </g>
            ))}
          </motion.g>
        </motion.svg>
      </div>
    </figure>
  );
}
