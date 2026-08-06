"use client";

import { motion, useReducedMotion } from "motion/react";
import { motionPresets } from "@/components/motion/presets";
import { startupsContent } from "@/content/startups";

const { defaults } = startupsContent.sameness;

const cellVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: motionPresets.staggerItemSpring }
};

// A stand-in for what generation tools reach for by default: the same violet,
// the same typeface, the same three blocks in the same order.
function ColorPanel({ reducedMotion }: { reducedMotion: boolean | null }) {
  return (
    <div className="landing-specimen">
      <motion.span
        animate={reducedMotion ? undefined : { scale: [1, 1.04, 1] }}
        className="landing-specimen-blob"
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function TypePanel() {
  return (
    <div className="landing-specimen">
      <span className="landing-specimen-type">Aa</span>
      <span className="landing-specimen-type-name">Inter</span>
    </div>
  );
}

function LayoutPanel({ reducedMotion }: { reducedMotion: boolean | null }) {
  const shape = reducedMotion
    ? { hidden: { opacity: 1, scale: 1 }, show: { opacity: 1, scale: 1 } }
    : {
        hidden: { opacity: 0, scale: 0.6 },
        show: { opacity: 1, scale: 1, transition: motionPresets.buttonSpring }
      };

  const line = reducedMotion
    ? { hidden: { pathLength: 1, opacity: 1 }, show: { pathLength: 1, opacity: 1 } }
    : {
        hidden: { pathLength: 0, opacity: 0 },
        show: {
          pathLength: 1,
          opacity: 1,
          transition: { duration: 0.4, ease: [0.2, 0, 0, 1] as const }
        }
      };

  return (
    <div className="landing-specimen">
      <motion.svg
        aria-hidden="true"
        className="landing-specimen-flow"
        initial="hidden"
        transition={{ staggerChildren: reducedMotion ? 0 : 0.12 }}
        viewBox="0 0 232 48"
        viewport={{ once: true, amount: 0.6 }}
        whileInView="show"
      >
        <motion.circle cx="20" cy="24" fill="#c07a72" r="14" variants={shape} />
        <motion.path
          d="M44 24 H76"
          stroke="#242526"
          strokeLinecap="round"
          strokeWidth="2"
          variants={line}
        />
        <motion.path
          d="M70 18 L77 24 L70 30"
          fill="none"
          stroke="#242526"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          variants={line}
        />
        <motion.path d="M116 8 L132 38 H100 Z" fill="#2e8b45" variants={shape} />
        <motion.path
          d="M156 24 H188"
          stroke="#242526"
          strokeLinecap="round"
          strokeWidth="2"
          variants={line}
        />
        <motion.path
          d="M182 18 L189 24 L182 30"
          fill="none"
          stroke="#242526"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          variants={line}
        />
        <motion.rect fill="#2b4acb" height="26" variants={shape} width="26" x="198" y="11" />
      </motion.svg>
    </div>
  );
}

export function StartupsDefaultsStrip() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className="landing-strip"
      initial="hidden"
      transition={{ staggerChildren: reducedMotion ? 0 : 0.14 }}
      viewport={{ once: true, amount: 0.35 }}
      whileInView="show"
    >
      <motion.div className="landing-strip-cell" variants={cellVariants}>
        <ColorPanel reducedMotion={reducedMotion} />
        <p className="type-body-small landing-strip-label">{defaults.colors}</p>
      </motion.div>
      <motion.div className="landing-strip-cell" variants={cellVariants}>
        <TypePanel />
        <p className="type-body-small landing-strip-label">{defaults.type}</p>
      </motion.div>
      <motion.div className="landing-strip-cell" variants={cellVariants}>
        <LayoutPanel reducedMotion={reducedMotion} />
        <p className="type-body-small landing-strip-label">{defaults.layout}</p>
      </motion.div>
    </motion.div>
  );
}
