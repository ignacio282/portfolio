"use client";

import { useId, useRef } from "react";
import { motion } from "motion/react";
import { figureEase, figureVariants } from "@/components/motion/figure-variants";
import { useFigureLoop } from "@/components/motion/use-figure-loop";
import { portalFigures } from "@/content/portal-figures";

const { cmsFunnel } = portalFigures;

const LOOP_MS = 11500;

const WIDTH = 400;
const HEIGHT = 400;

// Funnel geometry: a wide mouth, walls converging on a narrow neck, and a
// short spout above the one thing that came out the bottom.
const MOUTH_Y = 140;
const MOUTH_LEFT = 50;
const MOUTH_RIGHT = 350;
const NECK_Y = 290;
const NECK_LEFT = 185;
const NECK_RIGHT = 215;
const SPOUT_Y = 336;

// One closed outline: mouth, right wall, spout, and back up the left.
const FUNNEL_PATH = [
  `M ${MOUTH_LEFT} ${MOUTH_Y}`,
  `L ${MOUTH_RIGHT} ${MOUTH_Y}`,
  `L ${NECK_RIGHT} ${NECK_Y}`,
  `L ${NECK_RIGHT} ${SPOUT_Y}`,
  `L ${NECK_LEFT} ${SPOUT_Y}`,
  `L ${NECK_LEFT} ${NECK_Y}`,
  "Z"
].join(" ");

const OUTPUT_BAR = { x: 88, y: 356, width: 224, height: 34, radius: 17 };

// Where each department comes to rest above the mouth, and the off-frame point
// it flies in from. Both are deliberately uneven — four different heights,
// entries from left, top, right, top-left and right — because arriving in a
// tidy row would say the opposite of what the figure is about. The resting
// positions are also the reduced-motion frame, so they must not collide.
// No entry point may start below the rim, or the pill would be clipped on the
// way in and look like it was coming *out* of the funnel.
const PILL_HEIGHT = 26;

// Every pill sinks to the same depth inside the funnel before it fades, so
// they all disappear on one line no matter which height they came to rest at.
const VANISH_Y = 205;
const FUNNEL_CENTER = (MOUTH_LEFT + MOUTH_RIGHT) / 2;

const ARRIVALS = [
  { dropX: 105, dropY: 64, fromX: -260, fromY: 20 },
  { dropX: 210, dropY: 36, fromX: 20, fromY: -120 },
  { dropX: 265, dropY: 64, fromX: 240, fromY: -30 },
  { dropX: 130, dropY: 92, fromX: -190, fromY: -130 },
  { dropX: 270, dropY: 120, fromX: 250, fromY: -8 }
] as const;

// Uppercase 12px with tracking, measured generously so nothing clips.
const pillWidth = (label: string) => label.length * 7.6 + 24;

// Beat sheet, in seconds. Each pill flies in, sits long enough to be read,
// then sinks through the mouth and fades. The cadence is shorter than one
// pill's run, so the next is already arriving as the last one sinks.
const FUNNEL_DRAW = 1.2;
const INTRO = 1.35;
const CADENCE = 1.05;
const PILL_RUN = 2;

// Fractions of PILL_RUN: fly in, rest, sink. The rest beat is the longest of
// the three — it is the only moment the department name can be read.
const PILL_TIMES = [0, 0.3, 0.62, 1];

const arrivalAt = (index: number) => INTRO + index * CADENCE;
const LAST_ARRIVAL_ENDS = arrivalAt(ARRIVALS.length - 1) + PILL_RUN;
const OUTPUT_PULSE_AT = LAST_ARRIVAL_ENDS - 0.15;

export function PortalCmsFunnel() {
  const figureRef = useRef<HTMLDivElement>(null);
  const { cycle, isInView, reducedMotion } = useFigureLoop(figureRef, { loopMs: LOOP_MS });
  const { drawAt, fadeAt, still } = figureVariants(reducedMotion);
  // useId contains colons, which url(#…) will not resolve.
  const clipId = `funnel-rim-${useId().replace(/:/g, "")}`;

  // A pill's whole run in one keyframed variant: fly in, rest, then sink
  // straight down behind the funnel's rim. Nothing fades out — the rim clips
  // the pill away, so it reads as going *into* the funnel rather than
  // dissolving above it. The sink holds x at zero; drifting sideways on the
  // way down read as a diagonal slide rather than falling in.
  const pillVariants = (index: number) => {
    const { dropY, fromX, fromY } = ARRIVALS[index];

    if (still) {
      return {
        hidden: { opacity: 1, x: 0, y: 0 },
        show: { opacity: 1, x: 0, y: 0 }
      };
    }

    const sink = VANISH_Y - dropY;

    return {
      hidden: { opacity: 0, x: fromX, y: fromY },
      show: {
        opacity: [0, 1, 1, 1],
        x: [fromX, 0, 0, 0],
        y: [fromY, 0, 0, sink],
        transition: {
          duration: PILL_RUN,
          delay: arrivalAt(index),
          times: PILL_TIMES,
          ease: figureEase.draw
        }
      }
    };
  };

  // The output takes the hit each time the funnel empties.
  const outputPulse = still
    ? { hidden: { opacity: 0 }, show: { opacity: 0 } }
    : {
        hidden: { opacity: 0 },
        show: {
          opacity: [0, 0.22, 0],
          transition: { duration: 1.1, delay: OUTPUT_PULSE_AT, ease: figureEase.ui }
        }
      };

  return (
    <div className="w-full max-w-[420px]" ref={figureRef}>
      <motion.svg
        animate={isInView ? "show" : "hidden"}
        className="figure-svg"
        initial="hidden"
        role="img"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      >
        <title>{cmsFunnel.title}</title>
        <desc>{cmsFunnel.description}</desc>

        {/* Everything below the rim is cut away, so a sinking pill slides out
            of sight behind the funnel's front edge instead of fading. */}
        <defs>
          <clipPath id={clipId}>
            <rect height={MOUTH_Y + 400} width={WIDTH} x={0} y={-400} />
          </clipPath>
        </defs>

        {/* Painted before the funnel so the rim stroke covers the clip edge.
            Remounting this group is what replays the run. */}
        <g key={cycle}>
          <g clipPath={`url(#${clipId})`}>
            {cmsFunnel.departments.map((department, index) => {
              const width = pillWidth(department);
              const { dropX, dropY } = ARRIVALS[index];

              return (
                <motion.g key={department} variants={pillVariants(index)}>
                  <rect
                    fill="var(--color-card)"
                    height={PILL_HEIGHT}
                    rx={PILL_HEIGHT / 2}
                    stroke="var(--color-ink)"
                    strokeWidth="1"
                    width={width}
                    x={dropX - width / 2}
                    y={dropY - PILL_HEIGHT / 2}
                  />
                  <text
                    className="figure-label-sm"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    x={dropX}
                    y={dropY}
                  >
                    {department}
                  </text>
                </motion.g>
              );
            })}
          </g>

          <motion.rect
            fill="var(--color-teal)"
            height={OUTPUT_BAR.height}
            rx={OUTPUT_BAR.radius}
            variants={outputPulse}
            width={OUTPUT_BAR.width}
            x={OUTPUT_BAR.x}
            y={OUTPUT_BAR.y}
          />
        </g>

        {/* The funnel draws once when the figure comes into view and then
            stays put. Only the departments loop. */}
        {/* Body and outline are separate so the white can arrive once the
            stroke has finished drawing, rather than as a shape that appears
            before it has been drawn. */}
        <motion.path
          d={FUNNEL_PATH}
          fill="var(--color-card)"
          stroke="none"
          variants={fadeAt(FUNNEL_DRAW - 0.3, { duration: 0.4 })}
        />

        <motion.path
          d={FUNNEL_PATH}
          fill="none"
          stroke="var(--color-ink)"
          strokeLinejoin="round"
          strokeWidth="1.25"
          variants={drawAt(0, FUNNEL_DRAW)}
        />

        <motion.text
          className="figure-label"
          dominantBaseline="middle"
          textAnchor="middle"
          variants={fadeAt(FUNNEL_DRAW - 0.2, { duration: 0.4 })}
          x={FUNNEL_CENTER}
          y={232}
        >
          {cmsFunnel.funnelLabel}
        </motion.text>

        <motion.g variants={fadeAt(FUNNEL_DRAW, { duration: 0.4 })}>
          <rect
            fill="none"
            height={OUTPUT_BAR.height}
            rx={OUTPUT_BAR.radius}
            stroke="var(--color-line)"
            strokeWidth="1"
            width={OUTPUT_BAR.width}
            x={OUTPUT_BAR.x}
            y={OUTPUT_BAR.y}
          />
          <text
            className="figure-label-sm"
            dominantBaseline="middle"
            textAnchor="middle"
            x={OUTPUT_BAR.x + OUTPUT_BAR.width / 2}
            y={OUTPUT_BAR.y + OUTPUT_BAR.height / 2}
          >
            {cmsFunnel.outputLabel}
          </text>
        </motion.g>
      </motion.svg>
    </div>
  );
}
