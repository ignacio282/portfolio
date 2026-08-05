"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

export type TimelineStep = {
  title: string;
  body: string;
};

export function StartupsTimeline({ steps }: { steps: TimelineStep[] }) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 72%", "end 62%"]
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001
  });
  const scaleY = useTransform(smoothProgress, (value) => (reducedMotion ? 1 : value));

  return (
    <div className="landing-timeline" ref={containerRef}>
      <div aria-hidden="true" className="landing-timeline-line">
        <motion.div className="landing-timeline-progress" style={{ scaleY }} />
      </div>

      <ol className="landing-timeline-list">
        {steps.map((step, index) => (
          <li className="landing-timeline-step" key={step.title}>
            <span aria-hidden="true" className="landing-timeline-node type-small-title">
              {index + 1}
            </span>
            <h3 className="type-card-title">{step.title}</h3>
            <p className="type-body mt-3 max-w-2xl">{step.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
