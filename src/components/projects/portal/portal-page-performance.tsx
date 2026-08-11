"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { figureVariants } from "@/components/motion/figure-variants";
import { useFigureLoop } from "@/components/motion/use-figure-loop";
import { portalFigures } from "@/content/portal-figures";

const { pagePerformance } = portalFigures;

const LOOP_MS = 12500;

// Fixed viewBox; the container scrolls on small screens, so none of this has
// to respond to anything.
const WIDTH = 900;
const HEIGHT = 400;
const PLOT_LEFT = 110;
const PLOT_RIGHT = 850;
const PLOT_TOP = 80;
const BASE_Y = 320;

const step = (PLOT_RIGHT - PLOT_LEFT) / (pagePerformance.months.length - 1);
const monthX = pagePerformance.months.map((_, index) => PLOT_LEFT + index * step);

// Both series share one 0–100 visits scale.
const toY = (value: number) => BASE_Y - ((BASE_Y - PLOT_TOP) * value) / 100;

const expectedY = pagePerformance.expected.map(toY);
const actualY = pagePerformance.actual.map(toY);

// Control handles at 32% of the step. Tighter than the startups journey map
// because the campaign month is a spike — softer handles round it into a hill
// and it stops reading as a one-off.
const segments = (ys: number[]) =>
  monthX
    .slice(1)
    .map((x, index) => {
      const previousX = monthX[index];

      return `C ${previousX + step * 0.32} ${ys[index]}, ${x - step * 0.32} ${ys[index + 1]}, ${x} ${ys[index + 1]}`;
    })
    .join(" ");

const linePath = (ys: number[]) => `M ${monthX[0]} ${ys[0]} ${segments(ys)}`;

// The same curve, closed down to the baseline so it can be filled.
const areaPath = (ys: number[]) =>
  `M ${monthX[0]} ${BASE_Y} L ${monthX[0]} ${ys[0]} ${segments(ys)} L ${monthX[monthX.length - 1]} ${BASE_Y} Z`;

const PEAK_X = monthX[pagePerformance.peak.month];
const PEAK_Y = actualY[pagePerformance.peak.month];

// High enough to clear the expected line, which passes above the peak.
const NOTE_Y = PLOT_TOP + 28;

// Beat sheet, in seconds. The expected line lands completely on its own, so the
// actual line reads as a departure from it rather than one of two lines.
const AXES_AT = 0;
const EXPECTED_AT = 0.5;
const EXPECTED_RUN = 1.6;
const EXPECTED_AREA_AT = 2.2;
const ACTUAL_AT = 2.8;
const ACTUAL_RUN = 1.8;
const ACTUAL_AREA_AT = 4.7;
const PEAK_NOTE_AT = 5.3;

export function PortalPagePerformance() {
  const figureRef = useRef<HTMLElement>(null);
  const { cycle, isInView, reducedMotion } = useFigureLoop(figureRef, { loopMs: LOOP_MS });
  const { drawAt, fadeAt } = figureVariants(reducedMotion);

  return (
    <figure className="mt-12" ref={figureRef}>
      <figcaption className="flex flex-wrap items-center gap-x-8 gap-y-3">
        <span className="type-body-small flex items-center gap-3 text-muted">
          <span aria-hidden="true" className="legend-swatch-assumed" />
          {pagePerformance.legend.expected}
        </span>
        <span className="type-body-small flex items-center gap-3 text-ink">
          <span aria-hidden="true" className="legend-swatch-real" />
          {pagePerformance.legend.actual}
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
          <title>{pagePerformance.title}</title>
          <desc>{pagePerformance.description}</desc>

          <motion.g variants={fadeAt(AXES_AT, { duration: 0.5 })}>
            {pagePerformance.ticks.map((tick) => (
              <g key={tick}>
                <line
                  stroke="var(--color-line)"
                  x1={monthX[tick]}
                  x2={monthX[tick]}
                  y1={PLOT_TOP - 20}
                  y2={BASE_Y}
                />
                <text className="figure-note" textAnchor="middle" x={monthX[tick]} y={346}>
                  {tick === 0 ? "Launch" : tick}
                </text>
              </g>
            ))}

            <line
              stroke="var(--color-line)"
              strokeWidth="1.5"
              x1={PLOT_LEFT}
              x2={PLOT_LEFT}
              y1={PLOT_TOP - 20}
              y2={BASE_Y}
            />
            <line
              stroke="var(--color-line)"
              strokeWidth="1.5"
              x1={PLOT_LEFT}
              x2={PLOT_RIGHT + 20}
              y1={BASE_Y}
              y2={BASE_Y}
            />

            <text
              className="figure-stage"
              textAnchor="middle"
              transform={`rotate(-90 74 ${(PLOT_TOP + BASE_Y) / 2})`}
              x={74}
              y={(PLOT_TOP + BASE_Y) / 2}
            >
              {pagePerformance.axisLabels.y}
            </text>
            <text
              className="figure-note"
              textAnchor="middle"
              x={(PLOT_LEFT + PLOT_RIGHT) / 2}
              y={378}
            >
              {pagePerformance.axisLabels.x}
            </text>
          </motion.g>

          <motion.path
            d={areaPath(expectedY)}
            fill="var(--color-muted)"
            fillOpacity={0.1}
            stroke="none"
            variants={fadeAt(EXPECTED_AREA_AT, { duration: 0.5 })}
          />
          <motion.path
            d={linePath(expectedY)}
            fill="none"
            stroke="var(--color-muted)"
            strokeDasharray="7 7"
            strokeLinecap="round"
            strokeWidth="2"
            variants={drawAt(EXPECTED_AT, EXPECTED_RUN)}
          />

          <motion.path
            d={areaPath(actualY)}
            fill="var(--color-teal)"
            fillOpacity={0.14}
            stroke="none"
            variants={fadeAt(ACTUAL_AREA_AT, { duration: 0.5 })}
          />
          <motion.path
            d={linePath(actualY)}
            fill="none"
            stroke="var(--color-teal)"
            strokeLinecap="round"
            strokeWidth="3"
            variants={drawAt(ACTUAL_AT, ACTUAL_RUN)}
          />

          <motion.g variants={fadeAt(PEAK_NOTE_AT, { duration: 0.5 })}>
            <circle cx={PEAK_X} cy={PEAK_Y} fill="var(--color-teal)" r="6" />
            {/* The note sits above the peak, clear of both lines, with a
                dotted leader running down to it. Anywhere to the side and the
                leader ends up running through the text. */}
            <line
              stroke="var(--color-ink)"
              strokeDasharray="2 4"
              strokeWidth="1.5"
              x1={PEAK_X}
              x2={PEAK_X}
              y1={PEAK_Y - 12}
              y2={NOTE_Y + 10}
            />
            <text className="figure-note" textAnchor="middle" x={PEAK_X} y={NOTE_Y}>
              {pagePerformance.peak.note}
            </text>
          </motion.g>
        </motion.svg>
      </div>

      <p className="figure-caption">{pagePerformance.caption}</p>
    </figure>
  );
}
