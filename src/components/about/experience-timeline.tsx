"use client";

import type { CSSProperties } from "react";
import { useId, useMemo, useRef, useState } from "react";
import { ChevronsRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { figureEase } from "@/components/motion/figure-variants";
import { aboutTimelineEnd, type AboutExperience } from "@/content/about";

/**
 * The rail is proportional, but a two-month range would render a few pixels
 * wide — unreadable and unclickable. Short ranges get a floor and are nudged
 * left to stay inside the rail, so they trade exact width for being usable.
 * The exact dates are always spelled out in the detail.
 */
const MIN_BAR_WIDTH_PCT = 16;

/** Months since year zero. Only differences are ever used. */
function toMonths(iso: string) {
  const [year, month] = iso.split("-");
  return Number(year) * 12 + (Number(month) - 1);
}

const round = (value: number) => Number(value.toFixed(2));

type BarGeometry = {
  entry: AboutExperience;
  left: number;
  width: number;
  align: "start" | "center" | "end";
};

function buildRail(entries: AboutExperience[]) {
  const spanStart = Math.min(...entries.map((entry) => toMonths(entry.start)));
  const spanEnd = Math.max(
    toMonths(aboutTimelineEnd),
    ...entries.map((entry) => toMonths(entry.end ?? aboutTimelineEnd))
  );
  const total = spanEnd - spanStart;

  const bars: BarGeometry[] = entries.map((entry) => {
    const startMonth = toMonths(entry.start);
    const endMonth = toMonths(entry.end ?? aboutTimelineEnd);
    const width = Math.max(((endMonth - startMonth) / total) * 100, MIN_BAR_WIDTH_PCT);
    const left = Math.min(((startMonth - spanStart) / total) * 100, 100 - width);
    const midpoint = left + width / 2;

    return {
      entry,
      left: round(left),
      width: round(width),
      // A bubble centred on a bar near either end would hang off the page.
      align: midpoint < 22 ? "start" : midpoint > 78 ? "end" : "center"
    };
  });

  const firstYear = Math.floor(spanStart / 12);
  const lastYear = Math.floor(spanEnd / 12);
  const ticks = [];

  for (let year = firstYear; year <= lastYear; year += 1) {
    const position = ((year * 12 - spanStart) / total) * 100;

    if (position >= 0 && position <= 100) {
      ticks.push({ year, left: round(position) });
    }
  }

  return { bars, ticks };
}

export function ExperienceTimeline({
  entries,
  defaultId
}: {
  entries: AboutExperience[];
  defaultId?: string;
}) {
  const reducedMotion = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(railRef, { once: true, amount: 0.3 });
  const baseId = useId();

  const { bars, ticks } = useMemo(() => buildRail(entries), [entries]);
  // Nothing is open at rest: on desktop a pinned bubble would float over the
  // section copy before anyone asked for it.
  const [openId, setOpenId] = useState<string | null>(defaultId ?? null);

  const buttonId = (id: string) => `${baseId}-bar-${id}`;
  const detailId = (id: string) => `${baseId}-detail-${id}`;

  const still = Boolean(reducedMotion);
  const animate = isInView ? "show" : "hidden";

  const lineVariants = still
    ? { hidden: { scaleX: 1 }, show: { scaleX: 1 } }
    : {
        hidden: { scaleX: 0 },
        show: { scaleX: 1, transition: { duration: 0.7, ease: figureEase.draw } }
      };

  const tickVariants = (index: number) =>
    still
      ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
      : {
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { duration: 0.3, delay: 0.45 + index * 0.05, ease: figureEase.ui }
          }
        };

  // Bars grow after the axis has settled, one at a time, oldest first — the
  // same "one shape, then the next" pacing the other figures use.
  const barVariants = (index: number) =>
    still
      ? { hidden: { opacity: 1, scaleX: 1 }, show: { opacity: 1, scaleX: 1 } }
      : {
          hidden: { opacity: 0, scaleX: 0 },
          show: {
            opacity: 1,
            scaleX: 1,
            transition: {
              scaleX: { duration: 0.5, delay: 0.75 + index * 0.14, ease: figureEase.draw },
              opacity: { duration: 0.2, delay: 0.75 + index * 0.14 }
            }
          }
        };

  return (
    <div className="about-rail-wrap">
      <div className="about-rail" ref={railRef}>
        <ol className="about-rail-items">
          {bars.map(({ entry, left, width, align }, index) => {
            const isOpen = entry.id === openId;

            return (
              <li
                className="about-rail-item"
                data-open={isOpen}
                key={entry.id}
                style={
                  {
                    "--bar-left": `${left}%`,
                    "--bar-width": `${width}%`
                  } as CSSProperties
                }
              >
                <motion.button
                  animate={animate}
                  aria-controls={detailId(entry.id)}
                  aria-expanded={isOpen}
                  className="about-bar"
                  id={buttonId(entry.id)}
                  initial="hidden"
                  onClick={() => setOpenId(isOpen ? null : entry.id)}
                  type="button"
                  variants={barVariants(index)}
                >
                  <span className="about-bar-text">
                    <span className="about-bar-label">{entry.railLabel}</span>
                    <span className="about-bar-role">{entry.railRole}</span>
                  </span>
                  <span className="about-bar-range">{entry.rangeLabel}</span>
                  {entry.end === null ? (
                    <ChevronsRight aria-hidden="true" className="about-bar-ongoing" size={16} />
                  ) : null}
                </motion.button>

                {/* One element for both breakpoints: an accordion panel on a
                    phone, a floating bubble from md up. */}
                <div
                  aria-labelledby={buttonId(entry.id)}
                  className="about-detail"
                  data-align={align}
                  id={detailId(entry.id)}
                  role="region"
                >
                  <h3 className="type-card-title">{entry.role}</h3>
                  <p className="about-detail-meta type-body-small text-muted">
                    <span>{entry.org}</span>
                    <span>{entry.rangeLabel}</span>
                    {entry.location ? <span>{entry.location}</span> : null}
                  </p>
                  <p className="type-body-small mt-3">{entry.summary}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <div aria-hidden="true" className="about-rail-axis">
          <motion.div
            animate={animate}
            className="about-rail-line"
            initial="hidden"
            variants={lineVariants}
          />
          {ticks.map((tick, index) => (
            <motion.span
              animate={animate}
              className="about-rail-tick type-body-small text-muted"
              initial="hidden"
              key={tick.year}
              style={{ "--tick-left": `${tick.left}%` } as CSSProperties}
              variants={tickVariants(index)}
            >
              {tick.year}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}
