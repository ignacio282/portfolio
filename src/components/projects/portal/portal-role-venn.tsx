"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { figureEase, figureVariants } from "@/components/motion/figure-variants";
import { useFigureLoop } from "@/components/motion/use-figure-loop";
import { portalFigures } from "@/content/portal-figures";

const { roleVenn } = portalFigures;

// The choreography lands at ~3.4s. The rest of the beat is stillness, long
// enough to read all four labels before it draws itself again.
const LOOP_MS = 11000;

const WIDTH = 400;
const HEIGHT = 360;
const R = 110;

// Three circles on an equilateral triangle, wide enough that all three overlap
// in the middle. Everything below is derived from these five numbers.
const CIRCLES = [
  { key: "structure", cx: 200, cy: 127, labelX: 200, labelY: 87 },
  { key: "business", cx: 137, cy: 237, labelX: 107, labelY: 262 },
  { key: "design", cx: 263, cy: 237, labelX: 293, labelY: 262 }
] as const;

const [S, B, D] = CIRCLES;

// Centre of the triple overlap, where the "me" label sits.
const CENTER_X = (S.cx + B.cx + D.cx) / 3;
const CENTER_Y = (S.cy + B.cy + D.cy) / 3;

type Point = { x: number; y: number };
type Circle = { cx: number; cy: number };

// Where two equal circles cross. Both points sit on the perpendicular bisector
// of the centres, offset by the half-chord height.
function crossings(a: Circle, b: Circle): [Point, Point] {
  const dx = b.cx - a.cx;
  const dy = b.cy - a.cy;
  const d = Math.hypot(dx, dy);
  const h = Math.sqrt(R * R - (d / 2) ** 2);
  const mx = (a.cx + b.cx) / 2;
  const my = (a.cy + b.cy) / 2;

  return [
    { x: mx + (h * -dy) / d, y: my + (h * dx) / d },
    { x: mx - (h * -dy) / d, y: my - (h * dx) / d }
  ];
}

const isInside = (point: Point, circle: Circle) =>
  Math.hypot(point.x - circle.cx, point.y - circle.cy) < R;

// A corner of the overlap is where two circles cross *inside* the third.
function corner(a: Circle, b: Circle, third: Circle): Point {
  const found = crossings(a, b).find((point) => isInside(point, third));
  return found ?? { x: CENTER_X, y: CENTER_Y };
}

// Which way round the arc goes. Angles increase clockwise on screen because
// SVG's y axis points down, so a positive sweep is the clockwise one.
function sweepFlag(from: Point, to: Point, circle: Circle) {
  const start = Math.atan2(from.y - circle.cy, from.x - circle.cx);
  const end = Math.atan2(to.y - circle.cy, to.x - circle.cx);
  let delta = end - start;

  while (delta <= -Math.PI) {
    delta += 2 * Math.PI;
  }
  while (delta > Math.PI) {
    delta -= 2 * Math.PI;
  }

  return delta > 0 ? 1 : 0;
}

// Rounded to two decimals so the server and the browser build byte-identical
// path strings.
const at = (point: Point) => `${point.x.toFixed(2)} ${point.y.toFixed(2)}`;

const arcTo = (from: Point, to: Point, circle: Circle) =>
  `A ${R} ${R} 0 0 ${sweepFlag(from, to, circle)} ${at(to)}`;

// The wedge is bounded by three arcs. Each pair of corners that shares a circle
// is joined by an arc of that circle.
const cornerSB = corner(S, B, D);
const cornerSD = corner(S, D, B);
const cornerBD = corner(B, D, S);

const WEDGE_PATH = [
  `M ${at(cornerSB)}`,
  arcTo(cornerSB, cornerBD, B),
  arcTo(cornerBD, cornerSD, D),
  arcTo(cornerSD, cornerSB, S),
  "Z"
].join(" ");

// Drawn as two semicircles from the top so the stroke paints clockwise from
// twelve o'clock. A plain <circle> would start at three o'clock instead.
const circlePath = ({ cx, cy }: Circle) =>
  `M ${cx} ${cy - R} A ${R} ${R} 0 1 1 ${cx} ${cy + R} A ${R} ${R} 0 1 1 ${cx} ${cy - R}`;

// Beat sheet, in seconds. Each circle finishes its stroke, its name lands, and
// only then does the next one start — so the three parts are read one at a
// time rather than as a set. Beats are short to keep the whole run under 4s.
const CIRCLE_DURATION = 0.8;
const LABEL_DURATION = 0.3;
const BEAT = 1.05;

const circleAt = (index: number) => index * BEAT;
const labelAt = (index: number) => circleAt(index) + CIRCLE_DURATION;

const LAST_LABEL_ENDS = labelAt(CIRCLES.length - 1) + LABEL_DURATION;
const TINT_AT = LAST_LABEL_ENDS + 0.05;
const CENTER_AT = TINT_AT + 0.3;
const TINT_OPACITY = 0.18;

export function PortalRoleVenn() {
  const figureRef = useRef<HTMLDivElement>(null);
  const { cycle, isInView, reducedMotion } = useFigureLoop(figureRef, { loopMs: LOOP_MS });
  const { drawAt, fadeAt, popAt, still } = figureVariants(reducedMotion);

  const tint = still
    ? { hidden: { fillOpacity: TINT_OPACITY }, show: { fillOpacity: TINT_OPACITY } }
    : {
        hidden: { fillOpacity: 0 },
        show: {
          fillOpacity: TINT_OPACITY,
          transition: { duration: 0.7, delay: TINT_AT, ease: figureEase.ui }
        }
      };

  return (
    <div className="w-full max-w-[560px]" ref={figureRef}>
      <motion.svg
        animate={isInView ? "show" : "hidden"}
        className="figure-svg"
        initial="hidden"
        key={cycle}
        role="img"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      >
        <title>{roleVenn.title}</title>
        <desc>{roleVenn.description}</desc>

        <motion.path d={WEDGE_PATH} fill="var(--color-teal)" variants={tint} />

        {CIRCLES.map((circle, index) => (
          <g key={circle.key}>
            <motion.path
              d={circlePath(circle)}
              fill="none"
              stroke="var(--color-ink)"
              strokeWidth="2"
              variants={drawAt(circleAt(index), CIRCLE_DURATION)}
            />
            <motion.text
              className="figure-label"
              dominantBaseline="middle"
              textAnchor="middle"
              variants={fadeAt(labelAt(index), { duration: LABEL_DURATION })}
              x={circle.labelX}
              y={circle.labelY}
            >
              {roleVenn.circles[index]}
            </motion.text>
          </g>
        ))}

        <motion.g
          style={{ originX: `${CENTER_X}px`, originY: `${CENTER_Y}px` }}
          variants={popAt(CENTER_AT)}
        >
          <text
            className="figure-label"
            dominantBaseline="middle"
            textAnchor="middle"
            x={CENTER_X}
            y={CENTER_Y}
          >
            {roleVenn.centerLabel}
          </text>
        </motion.g>
      </motion.svg>
    </div>
  );
}
