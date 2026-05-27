"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { motionDistances, motionPresets } from "@/components/motion/presets";
import { PageSection } from "@/components/visual/page-section";
import type { homeContent } from "@/content/home";

type HomeHeroMotionProps = {
  content: typeof homeContent;
};

export function HomeHeroMotion({ content }: HomeHeroMotionProps) {
  const reducedMotion = useReducedMotion();
  const [showHand, setShowHand] = useState(false);

  const hiddenY = reducedMotion ? 0 : motionDistances.heroFollowY;

  return (
    <PageSection className="min-h-[560px] justify-center pt-28 md:min-h-[620px] md:pt-32">
      <div className="w-full">
        <motion.div
          className="relative inline-block"
          initial={{ opacity: 1, y: reducedMotion ? 0 : motionDistances.heroY }}
          animate={{ opacity: 1, y: 0 }}
          transition={motionPresets.heroSpring}
          onHoverStart={() => setShowHand(true)}
          onHoverEnd={() => setShowHand(false)}
        >
          <h1 className="type-hero max-w-4xl">
            {content.hero.title}
          </h1>
          <AnimatePresence>
            {showHand ? (
              <motion.span
                aria-hidden="true"
                className="type-hero-hand absolute -right-10 top-0 md:-right-14"
                initial={{ opacity: 0, scale: 0.75, rotate: -18, y: 8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: [0, 18, -10, 14, 0],
                  y: 0
                }}
                exit={{ opacity: 0, scale: 0.85, rotate: -12, y: 6 }}
                transition={{
                  opacity: { duration: 0.12 },
                  scale: { type: "spring", stiffness: 300, damping: 18 },
                  rotate: { duration: 0.8, ease: "easeInOut" },
                  y: { type: "spring", stiffness: 260, damping: 18 }
                }}
              >
                👋
              </motion.span>
            ) : null}
          </AnimatePresence>
        </motion.div>

        <div className="type-home-intro mt-8 w-full space-y-3">
          {content.hero.lines.map((line, index) => (
            <motion.p
              key={line}
              className={index === 1 ? "italic" : undefined}
              initial={{ opacity: reducedMotion ? 1 : 0, y: hiddenY }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                ...motionPresets.heroFollowSpring,
                delay: reducedMotion ? 0 : 0.5 + index * 0.12
              }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <motion.h2
          className="type-section-title mb-8"
          initial={{ opacity: reducedMotion ? 1 : 0, y: hiddenY }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            ...motionPresets.heroFollowSpring,
            delay: reducedMotion ? 0 : 0.74
          }}
        >
          What I work on
        </motion.h2>
        <motion.div
          className="overflow-hidden py-2"
          initial={{ opacity: reducedMotion ? 1 : 0, y: hiddenY }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            ...motionPresets.heroFollowSpring,
            delay: reducedMotion ? 0 : 0.86
          }}
        >
          <div className="ticker-track flex w-max gap-4 pr-4">
            {[...content.workOn, ...content.workOn, ...content.workOn].map((item, index) => (
              <span key={`${item}-${index}`} className="ui-pill">
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </PageSection>
  );
}
