// TODO(confirm): replace with the real booking link before sharing this page.
export const BOOKING_URL = "https://cal.com/ignaciovergara/intro";
export const EMAIL_URL = "mailto:ignacio.vergara282@gmail.com";

// Testimonials stay off until there are real ones. Never fill this with samples.
export const SHOW_TESTIMONIALS = false;

export const startupsContent = {
  hero: {
    label: "For Founders",
    title: "You built something real. The interface is underselling it.",
    body:
      "Getting a working product out is the hard part, and you did it. What usually lags behind is the surface: the screens people actually meet, which tend to end up wherever the tooling and the schedule left them. That part I can take off your hands.",
    primaryCta: "Book a Call",
    secondaryCta: "Email Me"
  },
  problem: {
    label: "What I Keep Seeing",
    title: "AI can build your product. It hands everyone the same interface.",
    paragraphs: [
      "Open five products built with the same tools in the same year and you will meet the same sidebar, the same card grid, the same empty state with a centered icon. The output is competent. It is also interchangeable, which is awkward when the product is the thing that has to stand out.",
      "The bigger cost is quieter. Those defaults are shaped by what is easy to generate, not by what your users are trying to do, so the screens carry no sense of priority. Everything is the same size and the same weight, and people have to work out on their own what matters.",
      "This may not be happening to you. The only way to know is to look at the product with someone whose job is noticing it."
    ]
  },
  comparison: {
    label: "Sameness",
    title: "Different companies, same product",
    caption:
      "Four dashboards from four unrelated products, all built fast with the same generation of tools.",
    // TODO(images): drop screenshots into public/images/startups/ and list them here.
    // Shape: { src: "/images/startups/sameness-1.png", alt: "…" }
    // Around 16/10 works best. The section stays hidden while this array is empty.
    images: [] as { src: string; alt: string }[]
  },
  costs: {
    label: "Why It Matters",
    title: "What a default interface quietly costs you",
    items: [
      {
        icon: "presentation",
        title: "Demos that need narration",
        body:
          "You talk over your own product, explaining what each screen is for. People remember the explanation and not the product."
      },
      {
        icon: "route",
        title: "Users who never reach the good part",
        body:
          "Signup, setup, and first real use are where people decide. If the path there has friction, they leave before your product gets a chance to be useful."
      },
      {
        icon: "trending-up",
        title: "Investors reading the surface",
        body:
          "Polish is the fastest proxy investors have for how carefully a team works. A generic interface makes a serious product look early."
      },
      {
        icon: "life-buoy",
        title: "Support answering the same question",
        body:
          "Every unclear screen becomes a message someone on your team has to answer, again, for the rest of the product's life."
      },
      {
        icon: "repeat",
        title: "Engineering rebuilding the same screen",
        body:
          "With no shared patterns, the same component gets built slightly differently each time. You pay for that in review cycles and in every change that comes after."
      }
    ]
  },
  offerings: {
    label: "What I Do",
    title: "Two ways to start",
    // TODO(confirm): offering names, what is included, and both timelines.
    items: [
      {
        icon: "search",
        name: "Product Design Audit",
        description:
          "A structured review of your product the way your users meet it, from the first visit to the moment it becomes useful. You get specific problems, ranked by what they cost you, and a sensible order to fix them in.",
        includesLabel: "What's included",
        includes: [
          "A walkthrough of your live product, end to end",
          "A written list of issues, prioritized by impact",
          "Annotated screens showing what to change and why",
          "A working session to go through all of it with your team"
        ],
        timeline: "Usually one to two weeks"
      },
      {
        icon: "pen-tool",
        name: "Interface Redesign",
        description:
          "Hands-on design work on the parts of your product that carry the most weight, like onboarding, the core flow, and the screens you put in front of investors. You get designs your team can build from and the patterns to stay consistent as you add more.",
        includesLabel: "What's included",
        includes: [
          "Everything in the audit",
          "Redesigned flows for the areas we agree matter most",
          "Build-ready screens in Figma, responsive states included",
          "A small set of reusable components and rules",
          "Time with your engineers while it gets built"
        ],
        timeline: "Usually three to six weeks, depending on scope"
      }
    ],
    scopeNote:
      "Every team is at a different point, so I scope each engagement around what you are actually dealing with. If neither of these is quite the shape you need, say so on the call and we will work out something that fits.",
    cta: "Book a Call"
  },
  process: {
    label: "How We'd Work",
    title: "Four steps, no mystery",
    steps: [
      {
        title: "A call",
        body:
          "Thirty minutes. You show me the product and tell me where it hurts. I tell you honestly whether design is the thing that will help and what I would look at first."
      },
      {
        title: "A scope we agree on",
        body:
          "I write up what I would do, what you get, and how long it takes. Nothing starts until that shape is right."
      },
      {
        title: "The work",
        body:
          "I go deep on your product and share progress as it happens instead of saving it for one big reveal. You can react early, while changing direction is still cheap."
      },
      {
        title: "A handoff that sticks",
        body:
          "We walk your engineers through everything, and I stay reachable while it gets built. Questions come up during implementation, and answering them is part of the job."
      }
    ]
  },
  work: {
    label: "Selected Work",
    title: "Products where the interface had to carry real weight",
    // Keyed by project slug. Founder-facing framing, not the recruiter-facing summary.
    framings: {
      portal:
        "A banking site used by four million people, rebuilt so visitors could find what they came for. Bounce rate dropped 12%.",
      reading:
        "An AI product where the hard part was deciding what the model should not do for the user.",
      qr:
        "A money transfer reduced to a single screen, inside a market with rules about every step of it."
    } as Record<string, string>,
    cta: "Read case study"
  },
  bio: {
    label: "Who I Am",
    title: "Ignacio Vergara",
    paragraphs: [
      "I'm a product designer. For the past four years I have worked on enterprise banking products, the kind with millions of users and a long list of rules about what can and cannot change. I designed the website flow that cut bounce rate by 12% on a site serving over two million people, and helped take corporate account opening from 21 days down to 7.",
      "Designing inside constraints like those turns out to be good preparation for early-stage products. Both come down to the same question: what is genuinely in the way, and what is the smallest change that removes it."
    ],
    personalNote:
      "Outside of work I build things for myself most weekends, usually with more enthusiasm than planning. I read a lot of sci-fi and fantasy, I have opinions about ramen, and I will happily trade anime recommendations.",
    image: "/images/about-hero.png",
    imageAlt: "Ignacio smiling outdoors."
  },
  faq: {
    label: "Questions",
    title: "Before you book",
    // TODO(confirm): pricing model, availability, and anything about contracts.
    items: [
      {
        question: "How much does this cost?",
        answer:
          "It depends on scope, and a range this early would not mean much. After the first call I send a written scope with a price attached, so you know the number before you commit to anything."
      },
      {
        question: "We don't have a designer. Is that a problem?",
        answer:
          "No, and most teams I talk to don't have one. I work directly with founders and engineers, and I write things down so your team can act on them without a designer in the middle."
      },
      {
        question: "Will this slow my engineers down?",
        answer:
          "It shouldn't. I work ahead of the build rather than in the middle of it, and I hand over designs with the detail engineers need, which usually means less guessing during implementation."
      },
      {
        question: "Can you work with what we already have?",
        answer:
          "Yes, and usually that is the point. I design around your existing stack and components instead of handing you something that would mean starting over."
      },
      {
        question: "What if we only need one small piece of this?",
        answer:
          "Then we scope one small piece. Some teams need a single flow fixed before a launch. That is a good reason to talk."
      },
      {
        question: "How do we start?",
        answer:
          "Book a call. Bring the product, whatever you know about where people get stuck, and any deadline you are working against."
      }
    ]
  },
  testimonials: {
    label: "What Founders Say",
    title: "In their words",
    // Real quotes only. Shape:
    // { quote: "…", name: "…", role: "…" }
    items: [] as { quote: string; name: string; role: string }[]
  },
  finalCta: {
    label: "Next Step",
    title: "Show me what you built.",
    body:
      "Thirty minutes, your screen shared, no preparation needed. If design is not what your product needs right now, I will say so on the call.",
    primaryCta: "Book a Call",
    secondaryCta: "Email Me"
  }
};

export const startupsSections = [
  { label: "The Pattern", href: "#pattern" },
  { label: "What It Costs", href: "#costs" },
  { label: "What I Do", href: "#offerings" },
  { label: "How We'd Work", href: "#process" },
  { label: "Selected Work", href: "#work" },
  { label: "Who I Am", href: "#about" },
  { label: "Questions", href: "#faq" }
] as const;
