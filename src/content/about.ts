export type AboutStoryBeat = {
  id: string;
  body: string;
};

export type AboutEducationItem = {
  degree: string;
  school: string;
  year?: string;
};

export type AboutExperience = {
  id: string;
  role: string;
  org: string;
  /** ISO year-month. Drives the rail geometry, not the visible label. */
  start: string;
  /** ISO year-month, or null while the role is ongoing. */
  end: string | null;
  rangeLabel: string;
  /** Short enough to sit inside the bar on the rail, where space is scarce. */
  railLabel: string;
  /** The role name at rail scale — the full title rarely fits. */
  railRole: string;
  location?: string;
  /** Two or three sentences, shown in the bubble and the mobile detail. */
  summary: string;
};

/** A paragraph as segments, so a phrase can be emphasised without parsing HTML. */
export type AboutBodySegment = string | { strong: string };

export type AboutValue = {
  id: string;
  title: string;
  body: AboutBodySegment[];
};

export type AboutProcessStep = {
  id: string;
  title: string;
  lines: [string, string];
};

/**
 * Where the timeline rail stops. Deliberately a constant rather than a call to
 * `new Date()`: a runtime date makes the server and the browser compute
 * different bar widths and trips a hydration mismatch, and it would drift the
 * rail silently every month. Extend it by hand when the range needs to grow.
 */
export const aboutTimelineEnd = "2026-09";

export const aboutContent = {
  hero: {
    title: "Hey! I'm Ignacio ✌",
    image: "/images/about-hero.png",
    imageAlt: "Ignacio smiling outdoors."
  },
  story: {
    label: "My story",
    beats: [
      {
        id: "games",
        body:
          "I've been an avid gamer since I was a kid, and I was never drawn to the easy ones. I wanted the games with knotty systems and puzzles that made me sit with a problem for days. That's what sent me to study Multimedia and Interactivity in Ecuador, because I figured if I loved those challenges that much, I should learn to build them."
      },
      {
        id: "pivot",
        body:
          "Somewhere along the way I realized it wasn't really the games I loved. It was the solving. So I started turning toward UX and product design, taking every game-design lesson I could get my hands on and applying it to my own projects until it clicked. I was lucky that my degree already had classes pointing that direction, so the shift felt less like a detour and more like the road I'd been on."
      },
      {
        id: "bank",
        body:
          "My first design job was at Ecuador's biggest bank, where I started as a trainee and poured everything I had into it, because I'd found the thing. I love solving problems, but I've always been an empathetic person too, and design turned out to be the place where both of those live at once: solving problems to help people."
      },
      {
        id: "now",
        body:
          "That's still the drive. Along the way I learned to aim it at business goals too, which is what turns good intentions into work that actually ships. I've just finished a master's in Digital Media with an HCI focus, I'm doing research at UCF, and I'm ready for what's next: helping people get where they're going through the systems they use every day."
      }
    ] satisfies AboutStoryBeat[]
  },
  education: {
    label: "Education",
    items: [
      {
        degree: "Master in Digital Media, HCI focus",
        school: "University of Central Florida",
        year: "2026"
      },
      {
        degree: "Bachelor's in Multimedia and Interactivity",
        school: "Universidad San Francisco de Quito"
      }
    ] satisfies AboutEducationItem[]
  },
  experience: {
    label: "Experience",
    title: "Where I've done the work",
    intro:
      "Six years of it, from front-end builds to a bank serving millions. Pick a stretch to see what happened there.",
    entries: [
      {
        id: "paseo",
        role: "Front-End Developer",
        org: "Paseo San Francisco",
        start: "2019-01",
        end: "2020-12",
        rangeLabel: "2019 – 2020",
        railLabel: "Paseo San Francisco",
        railRole: "Front-End Developer",
        summary:
          "Built production web interfaces alongside the dev team, working in HTML, CSS, React and Tailwind. It's where I learned what a design actually costs once it hits code, which is still why my handoffs go smoothly."
      },
      {
        id: "pichincha",
        role: "UI/UX Designer",
        org: "Banco Pichincha",
        start: "2021-01",
        end: "2024-07",
        rangeLabel: "January 2021 – July 2024",
        railLabel: "Banco Pichincha",
        railRole: "UI/UX Designer",
        location: "Quito, Ecuador",
        summary:
          "Designed across the bank's web and mobile products for millions of customers: rebuilding onboarding and payment flows, reshaping the information architecture through a CMS migration, and running the research (interviews, branch visits, analytics) that pointed the work in the right direction. I also grew and documented the design system so the rest of the team could move faster."
      },
      {
        id: "ucf-gra",
        role: "Graduate Research Assistant",
        org: "University of Central Florida",
        start: "2026-07",
        end: null,
        rangeLabel: "July 2026 – Present",
        railLabel: "UCF",
        railRole: "Research Assistant",
        location: "Orlando, Florida · Remote",
        summary:
          "Researching human-computer interaction under the Nicholson School of Communication and Media, focused on interactive media and digital experience design. I support literature reviews, research synthesis, and preparation of work for academic publication."
      }
    ] satisfies AboutExperience[]
  },
  values: {
    label: "What I bring",
    title: "How I show up on a team",
    items: [
      {
        id: "raise-my-hand",
        title: "I'll raise my hand",
        body: [
          "I'm not afraid to say so when I disagree, because caring about the quality of the work means asking the uncomfortable questions out loud. Usually it comes down to two: ",
          { strong: "does this really solve the issue?" },
          " and ",
          { strong: "is this even the problem we should be solving?" }
        ]
      },
      {
        id: "systems",
        title: "I think in systems",
        body: [
          "Experience has taught me that small fixes, patches, and one-off screens get more expensive over time, because none of it is reusable. So I go for the root cause and try to build something that holds up: a solution that answers this problem and the next one that looks like it."
        ]
      },
      {
        id: "people",
        title: "I design for people, not users",
        body: [
          "Everything we ship ends up in the hands of a person with their own desires, needs, and limits. I work to give those people a genuinely good experience, I avoid dark patterns wherever I can, and I keep talking with the business so everyone stays clear on who we're designing for and what they actually need."
        ]
      }
    ] satisfies AboutValue[]
  },
  process: {
    label: "How I work",
    title: "My design process",
    intro:
      "It bends to the project, but it always moves through the same five places, and it doesn't end at handoff.",
    steps: [
      {
        id: "discovery",
        title: "Discovery",
        lines: [
          "Talk to users, the business, and whoever holds the context.",
          "Gather the data and constraints before proposing anything."
        ]
      },
      {
        id: "definition",
        title: "Definition",
        lines: [
          "Synthesize the findings into the actual problem worth solving.",
          "Agree on what success looks like and how we'll know."
        ]
      },
      {
        id: "design",
        title: "Design",
        lines: [
          "Explore flows and interfaces, then prototype the promising ones.",
          "Validate with real people and iterate on what breaks."
        ]
      },
      {
        id: "handoff",
        title: "Handoff",
        lines: [
          "Document states, edge cases, and the reasoning behind them.",
          "Stay close to engineering through build and QA."
        ]
      },
      {
        id: "measure",
        title: "Measure",
        lines: [
          "Watch analytics and feedback against the success metrics.",
          "Feed what we learn back into the next round."
        ]
      }
    ] satisfies AboutProcessStep[]
  },
  beyond: {
    title: "Beyond design",
    body:
      "I'm a food, animal, and book lover (sci-fi and fantasy especially)…and a geek to the bones. Want to swap anime recommendations or debate the best ramen spot? Reach out on LinkedIn, or send me an email."
  },
  gallery: [
    {
      src: "/images/about-gallery-1.png",
      alt: "Ignacio standing with a partner indoors."
    },
    {
      src: "/images/about-gallery-2.png",
      alt: "Two dogs sitting on a couch."
    },
    {
      src: "/images/about-gallery-3.png",
      alt: "A bookshelf with fantasy novels."
    },
    {
      src: "/images/about-gallery-4.png",
      alt: "A live orchestra stage with a One Piece screen."
    }
  ]
};
