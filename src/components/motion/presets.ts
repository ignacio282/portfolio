export const motionPresets = {
  sectionSpring: {
    type: "spring" as const,
    stiffness: 92,
    damping: 19,
    mass: 0.9
  },
  staggerItemSpring: {
    type: "spring" as const,
    stiffness: 96,
    damping: 19,
    mass: 0.88
  },
  heroSpring: {
    type: "spring" as const,
    stiffness: 96,
    damping: 18,
    mass: 0.9
  },
  heroFollowSpring: {
    type: "spring" as const,
    stiffness: 112,
    damping: 20,
    mass: 0.85
  },
  pageFade: {
    duration: 0.55,
    ease: [0.22, 1, 0.36, 1] as const
  },
  iconSwap: {
    type: "spring" as const,
    duration: 0.3,
    bounce: 0
  },
  buttonSpring: {
    type: "spring" as const,
    duration: 0.3,
    bounce: 0
  }
};

export const motionDistances = {
  sectionY: 36,
  heroY: 28,
  heroFollowY: 38,
  subtleExitY: -12
};
