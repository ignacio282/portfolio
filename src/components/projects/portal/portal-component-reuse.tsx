"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { figureEase, figureVariants } from "@/components/motion/figure-variants";
import { useFigureLoop } from "@/components/motion/use-figure-loop";
import { portalFigures } from "@/content/portal-figures";

const { componentReuse } = portalFigures;
const COMPONENT_COUNT = componentReuse.components.length;

const WIDTH = 460;
const HEIGHT = 400;

// Library and page blocks are exactly the same size, so a component travelling
// between them only ever translates. Scaling it on the way down would say the
// piece changes to fit the page, which is the opposite of the point.
const BLOCK = { width: 130, height: 56 };

// The shelf: one row across the top.
const SHELF = { y: 34, gap: 14 };
const SHELF_WIDTH = COMPONENT_COUNT * BLOCK.width + (COMPONENT_COUNT - 1) * SHELF.gap;
const SHELF_LEFT = (WIDTH - SHELF_WIDTH) / 2;

const shelfBox = (index: number) => ({
  x: SHELF_LEFT + index * (BLOCK.width + SHELF.gap),
  y: SHELF.y,
  width: BLOCK.width,
  height: BLOCK.height
});

// The page: one outline, centred, that slides in and out.
const PAGE = { width: 150, top: 138, height: 216, slotTop: 150, slotGap: 12 };
const PAGE_LEFT = (WIDTH - PAGE.width) / 2;
const PAGE_SLIDE = 320;

const slotBox = (slotIndex: number) => ({
  x: PAGE_LEFT + (PAGE.width - BLOCK.width) / 2,
  y: PAGE.slotTop + slotIndex * (BLOCK.height + PAGE.slotGap),
  width: BLOCK.width,
  height: BLOCK.height
});

const centerOf = (box: { x: number; y: number; width: number; height: number }) => ({
  x: box.x + box.width / 2,
  y: box.y + box.height / 2
});

// Each component keeps its own fill wherever it goes. That consistency is what
// makes it readable that the next page is the same pieces, reordered.
const TINTS = [
  { fill: "var(--color-teal)", fillOpacity: 0.16 },
  { fill: "var(--color-card)", fillOpacity: 1 },
  { fill: "var(--color-line)", fillOpacity: 0.55 }
];

// Beat sheet for one page, in seconds. The page arrives, the shelf empties into
// it top slot first, it holds long enough to be read, the pieces go home, and
// the page leaves to make room for the next one.
const PAGE_IN = 0.7;
const DEPART_FIRST = 0.95;
const DEPART_STAGGER = 0.6;
const TRAVEL = 0.7;
const RETURN_FIRST = 4.7;
const RETURN_STAGGER = 0.12;
const RETURN_TRAVEL = 0.6;
const PAGE_OUT_AT = 5.7;
const PAGE_OUT = 0.6;
const CYCLE = 6.8;

const departAt = (slotIndex: number) => DEPART_FIRST + slotIndex * DEPART_STAGGER;
const returnAt = (slotIndex: number) => RETURN_FIRST + slotIndex * RETURN_STAGGER;

export function PortalComponentReuse() {
  const figureRef = useRef<HTMLDivElement>(null);
  const { cycle, isInView, reducedMotion } = useFigureLoop(figureRef, {
    loopMs: CYCLE * 1000
  });
  const { fadeAt, still } = figureVariants(reducedMotion);

  // Each cycle builds a different page out of the same shelf.
  const order = componentReuse.orders[cycle % componentReuse.orders.length];

  // One component's whole cycle: wait on the shelf, drop into its slot, hold,
  // go back. Expressed as a single keyframe track so the piece is never
  // unmounted — it is the same block throughout, which is the whole idea.
  const blockVariants = (componentIndex: number) => {
    const slotIndex = order.indexOf(componentIndex);
    const shelf = centerOf(shelfBox(componentIndex));
    const slot = centerOf(slotBox(slotIndex));
    const dx = slot.x - shelf.x;
    const dy = slot.y - shelf.y;

    // At rest the figure shows an assembled page — the outcome, not the setup.
    if (still) {
      return {
        hidden: { x: dx, y: dy, opacity: 1 },
        show: { x: dx, y: dy, opacity: 1 }
      };
    }

    const leaves = departAt(slotIndex);
    const lands = leaves + TRAVEL;
    const goesBack = returnAt(slotIndex);
    const home = goesBack + RETURN_TRAVEL;

    return {
      hidden: { x: 0, y: 0, opacity: 1 },
      show: {
        x: [0, 0, dx, dx, 0, 0],
        y: [0, 0, dy, dy, 0, 0],
        opacity: 1,
        transition: {
          duration: CYCLE,
          times: [0, leaves / CYCLE, lands / CYCLE, goesBack / CYCLE, home / CYCLE, 1],
          ease: figureEase.draw
        }
      }
    };
  };

  const pageVariants = still
    ? { hidden: { x: 0, opacity: 1 }, show: { x: 0, opacity: 1 } }
    : {
        hidden: { x: PAGE_SLIDE, opacity: 0 },
        show: {
          x: [PAGE_SLIDE, 0, 0, -PAGE_SLIDE, -PAGE_SLIDE],
          opacity: [0, 1, 1, 0, 0],
          transition: {
            duration: CYCLE,
            times: [
              0,
              PAGE_IN / CYCLE,
              PAGE_OUT_AT / CYCLE,
              (PAGE_OUT_AT + PAGE_OUT) / CYCLE,
              1
            ],
            ease: figureEase.draw
          }
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
        <title>{componentReuse.title}</title>
        <desc>{componentReuse.description}</desc>

        <motion.text
          className="figure-label-sm"
          dominantBaseline="middle"
          textAnchor="middle"
          variants={fadeAt(0, { duration: 0.4 })}
          x={WIDTH / 2}
          y={16}
        >
          {componentReuse.libraryLabel}
        </motion.text>

        {/* The shelf keeps its outlines while the pieces are away, so it reads
            as a library they came from rather than one that disappeared. */}
        <motion.g variants={fadeAt(0.2, { duration: 0.5 })}>
          {componentReuse.components.map((component, index) => {
            const box = shelfBox(index);

            return (
              <rect
                fill="none"
                height={box.height}
                key={component.name}
                rx="6"
                stroke="var(--color-line)"
                strokeDasharray="5 5"
                strokeWidth="1.5"
                width={box.width}
                x={box.x}
                y={box.y}
              />
            );
          })}
        </motion.g>

        {/* Fades in once on first view. Everything inside it is always opaque,
            so remounting the cycle never causes a flash. */}
        <motion.g variants={fadeAt(0.35, { duration: 0.5 })}>
          <g key={cycle}>
            <motion.g variants={pageVariants}>
              <text
                className="figure-label-sm"
                dominantBaseline="middle"
                textAnchor="middle"
                x={WIDTH / 2}
                y={PAGE.top - 16}
              >
                {componentReuse.pageLabel}
              </text>
              <rect
                fill="none"
                height={PAGE.height}
                rx="8"
                stroke="var(--color-ink)"
                strokeWidth="1.5"
                width={PAGE.width}
                x={PAGE_LEFT}
                y={PAGE.top}
              />
              {order.map((componentIndex, slotIndex) => {
                const box = slotBox(slotIndex);

                return (
                  <rect
                    fill="none"
                    height={box.height}
                    key={componentIndex}
                    rx="6"
                    stroke="var(--color-line)"
                    strokeDasharray="4 4"
                    strokeWidth="1.25"
                    width={box.width}
                    x={box.x}
                    y={box.y}
                  />
                );
              })}
            </motion.g>

            {componentReuse.components.map((component, index) => {
              const box = shelfBox(index);
              const center = centerOf(box);
              const tint = TINTS[index];

              return (
                <motion.g key={component.name} variants={blockVariants(index)}>
                  <rect
                    fill={tint.fill}
                    fillOpacity={tint.fillOpacity}
                    height={box.height}
                    rx="6"
                    stroke="var(--color-ink)"
                    strokeWidth="1.5"
                    width={box.width}
                    x={box.x}
                    y={box.y}
                  />
                  <text
                    className="figure-label-sm"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    x={center.x}
                    y={center.y}
                  >
                    {component.name}
                  </text>
                </motion.g>
              );
            })}
          </g>
        </motion.g>
      </motion.svg>
    </div>
  );
}
