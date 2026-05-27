"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { motionDistances, motionPresets } from "@/components/motion/presets";
import { navItems } from "@/content/site";

export function ResponsiveNav() {
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-controls="mobile-navigation"
        aria-expanded={open}
        className="focus-ring inline-flex size-11 items-center justify-center rounded-full bg-card text-ink transition-[background-color,scale] duration-150 ease-out active:scale-[0.96]"
        onClick={() => setOpen((value) => !value)}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={open ? "close" : "menu"}
            className="inline-flex"
            initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
            transition={motionPresets.iconSwap}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </motion.span>
        </AnimatePresence>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id="mobile-navigation"
            className="fixed inset-x-5 top-24 rounded-[12px] bg-card p-4"
            initial={{ opacity: 0, y: reducedMotion ? 0 : motionDistances.subtleExitY }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : motionDistances.subtleExitY }}
            transition={{ duration: 0.22 }}
          >
            <nav aria-label="Mobile navigation" className="grid gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  className="type-nav-mobile focus-ring inline-flex min-h-11 items-center rounded-[8px] px-4 py-3 transition-colors hover:bg-teal hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
