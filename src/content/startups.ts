// TODO(confirm): replace with the real booking link before sharing this page.
export const BOOKING_URL = "https://cal.com/ignaciovergara/intro";
export const EMAIL_URL = "mailto:ignacio.vergara282@gmail.com";

// Testimonials stay off until there are real ones. Never fill this with samples.
export const SHOW_TESTIMONIALS = false;

// Text wrapped in *asterisks* renders as <em>. Used sparingly, once per section.
export const startupsContent = {
  hero: {
    label: "For Founders",
    title: "You built with AI and now you have a working product. That's real progress.",
    body:
      "Getting a first version working and deployed used to take months and a full team. You did it faster than that, more efficiently, and it runs “just fine.” The thing with AI is that it doesn't think about the part that usually comes next: what happens once people start using it? Real people, not friends and family, not your team.",
    primaryCta: "Book a call",
    secondaryCta: "Email me"
  },
  sameness: {
    label: "What's Happening",
    title: "It works. But somehow it doesn't feel right.",
    body: [
      "AI got you here fast, and I get it, that's great for the business. We all want that. A year ago you would have needed developers, a designer, and a few months to make it real. Now you can have something in a matter of weeks.",
      "The problem is that everyone in your position does the same thing, and every first version ends up looking just like yours. Tools like Claude Code or OpenAI Codex were trained on the same patterns, so they reach for the same defaults if nobody tells them otherwise.",
      "Think of it as a hotel room. Everything is there, nice and tidy, everything works and is where it should be, but somehow it doesn't feel like a house. It's not yours. And it's hard to build a company on something that doesn't feel like it belongs to you."
    ],
    // The staccato line from body[1] now labels the three panels of the
    // defaults strip, and the last beat closes it.
    defaults: {
      colors: "Same colors",
      type: "Same text",
      layout: "Same layout",
      footer: "*Same experience.*"
    },
    caption:
      "Three products, three founders, three different problems being solved. Same page.",
    // TODO(images): 3-up comparison of AI-generated interfaces.
    // Drop files in public/images/startups/ and list them here.
    // Shape: { src: "/images/startups/sameness-1.png", alt: "…" }, around 16/10.
    // The visual and its caption stay hidden while this array is empty.
    images: [] as { src: string; alt: string }[]
  },
  edgecases: {
    label: "What Comes Next",
    title: "People can use it. What happens when complaints come?",
    body: [
      "AI is good at the version of your product where nothing goes wrong. The signup that completes. The empty state before anyone has touched it. The form filled in the way it's supposed to be filled in. That version is easy, and it's the one you see in every demo.",
      "Real people don't stay on that path. They paste the wrong thing, they show up on a bad connection, they use the product for something you didn't build it for. AI can't design for that, because that part isn't generic, it's *yours*, it depends on your users and your data and the thing someone tries on day one that nobody thought to test. No model knows that yet. You only find out by watching real people use the thing.",
      "It doesn't show up on launch day. It shows up three weeks later, in a support inbox, one confused message at a time. Nothing breaks loud enough to file a bug over. It just quietly costs you people, and you won't always know why.",
      "And here's the part that's easy to ignore when you're moving fast: catching this before it ships is cheap. Catching it after, in front of users who already made up their mind about you, isn't."
    ],
    // TODO(copy): stage names, the three notes, and both legend lines.
    journey: {
      title: "How people move through a product",
      description:
        "A chart comparing two paths through five stages. The path AI assumes is flat and even. The path real people take dips at setup and first use before recovering.",
      stages: ["Lands", "Signs up", "Sets it up", "First real use", "Comes back"],
      legend: {
        assumed: "How AI assumes people use your product",
        real: "How people actually use it"
      },
      // Anchored to a stage index, drawn under the dip.
      notes: [
        { stage: 1, text: "on a bad connection" },
        { stage: 2, text: "pasted the wrong thing" },
        { stage: 3, text: "used it for something else" }
      ]
    }
  },
  bridge: {
    label: "Where I Come In",
    title: "I can tailor your solution to *real people.* AI designs for everyone, not your user.",
    // TODO(copy): the three traits are now labels on the diagram, so body[0]
    // stops where the list used to start.
    person: {
      title: "One real person, not an average",
      description:
        "A single figure with three labels pointing at it: their own impatience, their own context, their own reason for being there at all.",
      labels: [
        "their own impatience",
        "their own context",
        "their own reason for being there at all"
      ]
    },
    body: [
      "AI is trained on every product that came before yours, so it designs for an average user, and that person doesn't exist. Not the one actually opening your product for the first time.",
      "I spent four years designing for a bank. Millions of real people, real money, no room to get it wrong. Demos don't teach you that discipline. Real users do, and I've had four years of them.",
      "So I go through your product the way a new user would, not the way you already know it. I write down what's actually in the way, ranked by what it costs you. Then, if it makes sense, I fix it, hand your team something they can build from, and stick around while it ships."
    ]
  },
  offerings: {
    label: "What I Do",
    title: "Two ways to start",
    intro:
      "Every product is at a different point. These are the two shapes the work usually takes, but the call is where we figure out which one, if either, actually fits.",
    items: [
      {
        icon: "search",
        name: "Product Design Audit",
        description:
          "I use your product the way your users meet it, from first visit to the moment it becomes useful. You get the specific problems, ranked by what they cost you, and an order to fix them in.",
        includesLabel: "What's included",
        includes: [
          "A full walkthrough of your live product",
          "A written list of what's in the way, prioritized",
          "Annotated screens showing what to change",
          "A working session to go through it with your team"
        ],
        timeline: "One to two weeks"
      },
      {
        icon: "pen-tool",
        name: "Interface Redesign",
        description:
          "Design work on the parts of your product carrying the most weight. Onboarding, your core flow, the screens you put in front of investors. You get designs your team can build from and the patterns to stay consistent as you add more.",
        includesLabel: "What's included",
        includes: [
          "Everything in the audit",
          "Redesigned flows for the areas we agree matter most",
          "Build-ready screens in Figma, responsive states included",
          "A small set of reusable components and the rules for using them",
          "Time with your engineers while it gets built"
        ],
        timeline: "Three to six weeks, depending on scope"
      }
    ],
    scopeNote:
      "Some teams need one flow fixed before a launch. Some want someone around every week. If neither of these is the right shape, say so on the call and we'll work out something that fits.",
    cta: "Book a call"
  },
  process: {
    label: "How We'd Work",
    title: "What the first month looks like",
    steps: [
      {
        title: "A call",
        body:
          "Thirty minutes. You show me the product and tell me where it hurts. I tell you whether design is what you need right now, including if the answer is no."
      },
      {
        title: "A scope in writing",
        body:
          "I send what I'd do, what you get, how long it takes, and what it costs. Nothing starts until you've read it and agreed."
      },
      {
        title: "The work",
        body:
          "I share progress as it happens instead of saving it for a reveal. You can push back early, while changing direction is still cheap."
      },
      {
        title: "Handoff",
        body:
          "I walk your engineers through everything and stay reachable while they build. Questions come up during implementation. Answering them is part of the job."
      }
    ]
  },
  work: {
    label: "Selected Work",
    // TODO(copy): your wording.
    title: "Some examples of the work I've done",
    // Keyed by project slug. Founder-facing framing, not the recruiter-facing summary.
    // An empty string falls back to the case study's own summary.
    // TODO(copy): qr needs a real one-liner. The old one was invented, so it is
    // blank and the project summary shows until you write it.
    framings: {
      portal:
        "A banking site used by more than two million people, restructured so visitors could find what they came for. Bounce rate dropped 12%.",
      reading:
        "An AI product I designed and built myself, where most of the work was deciding what the model should not do.",
      qr: ""
    } as Record<string, string>,
    cta: "Read case study"
  },
  bio: {
    label: "Who I Am",
    title: "Ignacio Vergara",
    body: [
      "I'm a product designer from Ecuador, now in Tampa. I moved here for a master's in Digital Media at UCF and stayed.",
      "I like early-stage products because the questions are still open. There's no committee, no legacy system to route around, and the person who decides is usually the person I'm talking to.",
      "I build things on weekends, usually with more enthusiasm than planning. I read too much science fiction, I have opinions about ramen, and I'll trade anime recommendations with anyone who asks."
    ],
    image: "/images/about-hero.png",
    imageAlt: "Ignacio smiling outdoors."
  },
  faq: {
    label: "Questions",
    title: "Before you book",
    items: [
      {
        question: "How much does this cost?",
        // TODO(confirm): your call, a starting number or scoped per project.
        // This is the scoped-per-project version, carried over as a placeholder.
        answer:
          "It depends on scope, and a range this early would not mean much. After the first call I send a written scope with a price attached, so you know the number before you commit to anything."
      },
      {
        question: "We don't have a designer. Is that a problem?",
        answer:
          "No, and most teams I talk to don't. I work directly with founders and engineers, and I write things down so your team can act on them without a designer in the middle."
      },
      {
        question: "Will this slow my engineers down?",
        answer:
          "It shouldn't. I work ahead of the build rather than inside it, and I hand over designs with the detail engineers need, which usually means less guessing later."
      },
      {
        question: "Can you work with what we already have?",
        answer:
          "Yes, and that's usually the point. I design around your existing stack and components instead of handing you something that means starting over."
      },
      {
        question: "We built it with AI. Are you going to tell us to throw it out?",
        answer:
          "No. Shipping fast was the right call and the code is fine. What I look at is what happens when people who aren't you start using it."
      },
      {
        question: "What if we only need one small piece?",
        answer:
          "Then we scope one small piece. A single flow before a launch is a good reason to talk."
      },
      {
        question: "How do we start?",
        answer:
          "Book a call. Bring the product, whatever you know about where people get stuck, and any deadline you're working against."
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
      "Thirty minutes, your screen shared, nothing to prepare. If design isn't what your product needs right now, I'll say so on the call.",
    primaryCta: "Book a call",
    secondaryCta: "Email me"
  }
};

// Rail labels say what is in each section. Section headings stay as written.
// TODO(copy): your wording, these are drafts.
export const startupsSections = [
  { label: "Why it looks generic", href: "#happening" },
  { label: "What breaks with real users", href: "#next" },
  { label: "How I help", href: "#approach" },
  { label: "Services", href: "#offerings" },
  { label: "Process", href: "#process" },
  { label: "Case studies", href: "#work" },
  { label: "About me", href: "#about" },
  { label: "FAQ", href: "#faq" }
] as const;
