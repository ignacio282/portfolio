"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { motionDistances, motionPresets } from "@/components/motion/presets";
import { CTAButton } from "@/components/visual/cta-button";
import { LinkedInIcon } from "@/components/visual/linkedin-icon";
import { PageSection } from "@/components/visual/page-section";
import type { homeContent } from "@/content/home";
import { siteConfig } from "@/content/site";

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
          <h1 className="type-hero">
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

        {/* The case studies sit below a tall hero, so on a short laptop screen
            they can fall entirely out of view. This is the way in. */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={{ opacity: reducedMotion ? 1 : 0, y: hiddenY }}
          transition={{
            ...motionPresets.heroFollowSpring,
            delay: reducedMotion ? 0 : 0.74
          }}
        >
          <CTAButton href="#case-studies">
            View Case Studies <ArrowRight aria-hidden="true" size={20} />
          </CTAButton>
          <CTAButton
            href={siteConfig.linkedinUrl}
            rel="noreferrer"
            target="_blank"
            variant="outline"
          >
            Let&rsquo;s Connect <LinkedInIcon />
          </CTAButton>
        </motion.div>
      </div>
    </PageSection>
  );
}
