import type { CaseStudy, ProjectMeta } from "./types";

const imageFallbacks = {
  portal: "/images/project-portal.png",
  reading: "/images/project-reading.png",
  qr: "/images/project-qr.png",
  process: "/images/process-card.png",
  aboutHero: "/images/about-hero.png"
};

export const projects: ProjectMeta[] = [
  {
    slug: "portal",
    title: "Banking website redesign",
    shortTitle: "Banking website redesign",
    summary:
      "A full redesign that reduced bounce rate and improved navigation of a 4 million-user banking website.",
    image: imageFallbacks.portal,
    imageAlt: "Laptop and phone mockups showing the redesigned banking website.",
    accent: "#8b5558",
    hoverTint: "#f1e5e4",
    layers: [
      {
        src: "/images/projects/portal/background.png",
        alt: "",
        className: "absolute inset-0 h-full w-full object-cover",
        motion: "base",
        priority: true,
        width: 1728,
        height: 1728
      },
      {
        src: "/images/projects/portal/laptop.png",
        alt: "Laptop mockup showing the redesigned banking website.",
        className: "absolute bottom-[-2%] left-[9%] w-[88%]",
        motion: "float-left",
        priority: true,
        width: 1483,
        height: 937
      },
      {
        src: "/images/projects/portal/phone.png",
        alt: "Phone mockup showing the redesigned banking website.",
        className: "absolute bottom-[0%] right-[5%] w-[34%]",
        motion: "float-right",
        priority: true,
        width: 429,
        height: 797
      }
    ]
  },
  {
    slug: "reading",
    title: "AI Reading Assistant",
    shortTitle: "AI Reading Assistant",
    summary:
      "Designing an AI-assisted app that puts the person first by supporting cognition without replacing it.",
    image: imageFallbacks.reading,
    imageAlt: "Three mobile screens showing an AI reading assistant app.",
    accent: "#497d76",
    hoverTint: "#e4efec",
    layers: [
      {
        src: "/images/projects/reading/background.png",
        alt: "",
        className: "absolute inset-0 h-full w-full object-cover",
        motion: "base",
        width: 1728,
        height: 1728
      },
      {
        src: "/images/projects/reading/phone-left.png",
        alt: "Reading app add book screen.",
        className: "absolute bottom-[-16%] left-[9%] w-[35%]",
        motion: "float-left",
        width: 619,
        height: 1028
      },
      {
        src: "/images/projects/reading/phone-main.png",
        alt: "Reading app current reading screen.",
        className: "absolute bottom-[-22%] left-[32%] w-[38%]",
        motion: "lift",
        width: 757,
        height: 1407
      },
      {
        src: "/images/projects/reading/phone-right.png",
        alt: "Reading app chapter notes screen.",
        className: "absolute bottom-[-16%] right-[9%] w-[35%]",
        motion: "float-right",
        width: 614,
        height: 1140
      }
    ]
  },
  {
    slug: "qr",
    title: "QR Code Money Requests",
    shortTitle: "QR Code Money Requests",
    summary:
      "A 1-screen flow that enabled instant money transfers in a regulated and security-aware market.",
    image: imageFallbacks.qr,
    imageAlt: "A mobile phone showing a QR code money request flow.",
    accent: "#596083",
    hoverTint: "#e6e8f2",
    layers: [
      {
        src: "/images/projects/qr/background.png",
        alt: "",
        className: "absolute inset-0 h-full w-full object-cover",
        motion: "base",
        width: 1728,
        height: 1728
      },
      {
        src: "/images/projects/qr/phone.png",
        alt: "Phone mockup showing a QR code money request.",
        className: "absolute bottom-[-15%] left-[28%] w-[46%]",
        motion: "lift",
        width: 698,
        height: 1323
      }
    ]
  }
];

export const caseStudies: CaseStudy[] = [
  {
    ...projects[0],
    caseHeroImage: "/images/projects/portal/Case/1.avif",
    caseHeroImageAlt: "Screens from the redesigned banking website shown in a case-study presentation layout.",
    heroTitle: "A website reorganized for millions.",
    heroSubtitle:
      "A full-scale redesign grounded in research, structure, and simplicity.",
    overview:
      "A 2M+ user public website was about to migrate to a new CMS. That would have preserved years of UX debt. Instead of a visual reskin, the project became a structural redesign.",
    problem:
      "The bank's public website had hundreds of unreachable pages owned by different departments, making navigation confusing and critical information hard to find despite high traffic.",
    goals: [
      "Understand how users actually navigated the site.",
      "Reduce content errors and redundancy.",
      "Create a more coherent architecture to improve navigation.",
      "Support a mandatory CMS migration without carrying existing UX debt forward."
    ],
    role:
      "I was 1 of 3 UX/UI designers in the project. I served as the main point of contact with stakeholders, and owned the new CMS component system, development handoff, and UI quality checks.",
    outcomes: [
      {
        value: "100+ Pages",
        label: "Audited, removing outdated content and organizing architecture."
      },
      {
        value: "2M+ Users",
        label: "Navigated the site more easily after restructuring around user needs."
      },
      {
        value: "Bounce rate ↓12%",
        label: "Dropped after prioritizing relevant content and removing low-value pages."
      },
      {
        value: "Templates",
        label: "Reusable templates reduced publishing time-to-task across teams."
      }
    ],
    sections: [
      {
        type: "text",
        eyebrow: "02. Background",
        title: "A technical migration that required a UX rethink",
        body: [
          "A technical migration uncovered deeper UX problems hidden in the site's structure. The original business goal was to move all pages to a new CMS and refresh the UI.",
          "We pushed to shift the scope from moving everything over to understanding what should exist."
        ],
        media: [
          {
            src: "/images/projects/portal/Case/2.avif",
            alt: "Audit and migration planning visual for the banking website redesign.",
            aspect: "aspect-[1/1]"
          }
        ]
      },
      {
        type: "split",
        eyebrow: "03. Audit findings",
        title: "A site without structure or ownership",
        body: [
          "The website had evolved into a digital storage space. Teams used it as a dumping ground for content rather than a structured communication channel.",
          "This misalignment between content and user behavior made the redesign much more than visual work."
        ],
        calloutTitle: "Findings",
        bullets: [
          "Hundreds of pages existed without clear ownership.",
          "Many pages had less than 0.1% of total visits.",
          "Some pages were unreachable through navigation.",
          "Outdated campaign pages from previous years were still live."
        ]
      },
      {
        type: "quote",
        eyebrow: "04. User research",
        quote:
          "It's really difficult to find anything on the website, I prefer calling the call center, it's quicker",
        body: [
          "Users felt overwhelmed, and many preferred calling instead of browsing the site. We conducted nearly 50 interviews with customers.",
          "Users were not reading because the content was not designed for them; it was designed to satisfy internal teams."
        ],
        media: [
          {
            src: "/images/projects/portal/Case/3.avif",
            alt: "Research findings and customer interview insights for the banking website redesign.",
            aspect: "aspect-[2.04/1]"
          }
        ]
      },
      {
        type: "split",
        eyebrow: "05. Design approach",
        title: "Redesigning meant aligning many departments",
        body: [
          "With dozens of teams owning parts of the site, the redesign required extensive coordination. Each team had different goals, content types, and expectations."
        ],
        calloutTitle: "My responsibilities",
        bullets: [
          "Analyzing the site's data.",
          "Defining the new architecture logic.",
          "Creating the UI component library.",
          "Aligning cross-functional teams.",
          "Delivering guidelines for future use."
        ]
      },
      {
        type: "text",
        eyebrow: "06. UI strategy",
        title: "I defended scalability of the system using the 80/20 principle",
        body: [
          "Reusable components allowed us to scale, but only by rejecting one-off requests.",
          "Components were designed to solve the needs of about 80% of pages. The remaining 20% were edge cases and handled separately."
        ],
        media: [
          {
            src: "/images/projects/portal/Case/4.avif",
            alt: "Reusable UI component strategy for the redesigned banking website.",
            aspect: "aspect-[1/1]"
          },
          {
            src: "/images/projects/portal/Case/5.avif",
            alt: "80/20 scalability principle applied to the banking website component system.",
            aspect: "aspect-[2.04/1]"
          }
        ]
      },
      {
        type: "text",
        eyebrow: "07. Technical constraints",
        title: "CMS limitations required adapting designs while preserving structure and clarity",
        body: [
          "The new CMS was more restrictive than expected, so several planned interactions had to be simplified.",
          "The priority became preserving the architecture, reusable templates, and clarity of the system while adapting to technical constraints."
        ]
      },
      {
        type: "text",
        eyebrow: "08. Final architecture & templates",
        title: "We created a new architecture from the ground up",
        body: [
          "A new information architecture, based on real user needs, brought clarity, consistency, and scalability.",
          "The final redesign introduced a clearer site structure, predictable navigation, a simplified mega-menu, reusable CMS components, and a unified design system."
        ],
        media: [
          {
            src: "/images/projects/portal/Case/6.avif",
            alt: "Final architecture and template system for the redesigned banking website.",
            aspect: "aspect-[1.33/1]"
          }
        ]
      },
      {
        type: "decisions",
        eyebrow: "09. What changed",
        title: "The redesign made the system easier for users and teams",
        decisions: [
          {
            title: "User side",
            body:
              "The website became easier to navigate, important pages became easier to reach, and the overall experience became more consistent."
          },
          {
            title: "Business side",
            body:
              "Outdated and duplicated pages were removed or merged, product pages were standardized, and the CMS supported a more controlled governance model."
          }
        ]
      }
    ]
  },
  {
    ...projects[1],
    caseHeroImage: "/images/projects/reading/case/heroImage.avif",
    caseHeroImageAlt: "Hero artwork showing Scriba reading assistant mobile screens.",
    heroTitle: "Reading made intentional.",
    heroSubtitle:
      "A reading assistant tailored for you.",
    overview:
      "Scriba is a reading memory companion built to help people capture messy notes, turn them into structured memory, reflect on what matters, and retrieve it later without spoilers or invented facts.",
    problem:
      "Most AI reading tools either over-summarize or act like generic chatbots. I wanted to explore a more useful model: an AI-assisted workflow that helps readers capture messy notes, turn them into structured memory, reflect on what matters, and retrieve it later without spoilers or invented facts.",
    goals: [
      "Make AI helpful without taking over the user's thinking.",
      "Structure AI into clear, focused jobs that support reading at different moments.",
      "Build a real AI product, not only a Figma prototype."
    ],
    role:
      "I was the sole designer and builder. I defined the workflow, wrote the prompt logic and behavioral rules for each AI feature, designed the interface in Figma, and used AI coding tools to build the product.",
    outcomes: [
      {
        value: "Working product",
        label: "From note capture to structured memory, reflection, and spoiler-safe retrieval."
      },
      {
        value: "Focused AI",
        label: "Several narrower AI roles with clear responsibilities and limits."
      },
      {
        value: "AI workflow",
        label: "Coding agents, structured prompts, and Figma MCP turned the product into a working system."
      },
      {
        value: "Refined",
        label: "User testing led to stronger narrative handling and tighter AI behavior rules."
      }
    ],
    sections: [
      {
        type: "text",
        eyebrow: "02. The Opportunity",
        title: "Most AI tools are good at sounding smart. Very few help people actually learn",
        body: [
          "Readers often highlight passages or take notes, but these notes get lost and rarely lead to deeper understanding. Most reading apps track progress, and most AI tools summarize content for the user instead of supporting personal insight.",
          "This project aims to help readers remember more of what they read by creating a tool that guides reflection, connects ideas across chapters, and builds a clearer long-term memory of books."
        ]
      },
      {
        type: "split",
        eyebrow: "03. The Core Idea",
        title: "A reading assistant that thinks with you, not for you.",
        body: [
          "The mental model was simple: capture, structure, reflect, retrieve. Scriba supports the reader through each moment without replacing their interpretation."
        ],
        calloutTitle: "Core behaviors",
        bullets: [
          "Capture reader thoughts while reading.",
          "Highlight relationships between themes, characters, and ideas.",
          "Generate summaries based on the reader's notes, not generic AI text.",
          "Track story elements through a structured data model.",
          "Support guided reflection after each chapter."
        ]
      },
      {
        type: "split",
        eyebrow: "04. Designing The AI Behavior",
        title: "What AI could not do mattered more than what it could do",
        body: [
          "I wanted the AI to be helpful, but not overbearing. Supportive, but not dominant. Smart, but not performative. That meant creating explicit behavioral boundaries for each AI role."
        ],
        calloutTitle: "Behavior rules",
        bullets: [
          "Answer only from the user's saved notes and reading progress.",
          "Stay spoiler-safe by refusing to go beyond what the reader has written.",
          "Admit uncertainty when the notes are thin.",
          "Ask clarification questions only when missing detail would improve the saved memory.",
          "Avoid turning the user's writing into generic, over-polished AI output."
        ]
      },
      {
        type: "text",
        eyebrow: "05. AI Layering In Action",
        title: "Scriba is built around focused AI behaviors",
        body: [
          "At a product level, Scriba is not built around one all-knowing assistant. It is built around a small set of focused AI behaviors: the silent organizer, the reflection coach, the scribe, and the knowledge layer.",
          "Each behavior supports a different moment in the reading experience, from passive note organization to guided reflection and spoiler-safe retrieval."
        ]
      },
      {
        type: "text",
        eyebrow: "06. From Designer To Builder",
        title: "AI accelerated execution after the product structure was clear",
        body: [
          "I used OpenAI's coding assistant Codex to create the Next.js project, implement the AI model endpoints, set up the front end, and scaffold the database structure.",
          "Connecting the coding agent to Figma through MCP gave it access to actual design definitions instead of screenshots, improving fidelity and speeding up the workflow."
        ]
      },
      {
        type: "text",
        eyebrow: "07. The Product",
        title: "A focused mobile reading workflow",
        body: [
          "The home screen gives readers a quick snapshot of their current book, recent notes, and weekly reading stats.",
          "Journal Mode lets readers capture thoughts without breaking their flow, while Session Summary organizes notes into summary, characters, and themes using only what the reader wrote."
        ]
      },
      {
        type: "decisions",
        eyebrow: "08. Testing And Iteration",
        title: "Testing exposed where the workflow and AI behavior needed to get sharper",
        decisions: [
          {
            title: "Book-creation flow",
            body:
              "Manual entry was functional, but slower than it needed to be, so I replaced it with Google Books search to make onboarding more natural."
          },
          {
            title: "AI interpretation",
            body:
              "Early behavior assumed characters were always human, which broke down in fantasy and non-human narratives. I updated the prompt logic so the system could handle characters more flexibly."
          }
        ]
      },
      {
        type: "decisions",
        eyebrow: "09. Learnings So Far",
        title: "The project clarified how I think about AI product design",
        decisions: [
          {
            title: "AI design is mostly about boundaries",
            body:
              "The hardest decision was not what the AI should do, but what it should not do."
          },
          {
            title: "AI should work the way people think",
            body:
              "I designed three layers aligned with how memory works: capture, reflect, retrieve."
          },
          {
            title: "Better structure, better output",
            body:
              "Working with coding agents taught me that AI works best when the system is well structured."
          },
          {
            title: "AI did not replace design decisions",
            body:
              "AI helped write code faster, but the real work remained designing the system the AI operates within."
          }
        ]
      }
    ]
  },
  {
    ...projects[2],
    caseHeroImage: "/images/projects/qr/case/HeroImage.avif",
    caseHeroImageAlt: "Hero artwork showing the QR money request flow in the Banco Pichincha app.",
    heroTitle: "A simple and secure way to receive money.",
    heroSubtitle:
      "A new solution shaped by real fears, real behaviors, and real constraints.",
    overview:
      "Banco Pichincha wanted to launch QR-based money requests quickly to increase transactions and position the app as more modern, but the work exposed a broader product architecture and trust challenge.",
    problem:
      "What started as a business push for QR money requests exposed a broader product challenge. Users were unfamiliar with QR transfers, worried about security, and the app had no clear place for a new money-receiving flow without disrupting its most used actions.",
    goals: [
      "Reduce friction with a minimal, three-step flow.",
      "Reassure users through clear, readable visual design.",
      "Include everyone with full accessibility support."
    ],
    role:
      "I turned a vague business request into a shippable product concept. I defined the final flow and entry point, led the UI design, and worked across product, brand, engineering, and the sibling payments team.",
    outcomes: [
      {
        value: "21 users tested",
        label: "Across 5-second tests, interviews, and findability studies to validate wording and placement."
      },
      {
        value: "Architecture",
        label: "Created a bottom-sheet model that introduced the feature without disrupting the home screen."
      },
      {
        value: "3-step flow",
        label: "A simple structure that reduced friction and made the task easier to understand."
      },
      {
        value: "Trust first",
        label: "A readable QR experience designed around security concerns, context, and confidence."
      }
    ],
    sections: [
      {
        type: "text",
        eyebrow: "01. Business Context",
        title: "Leadership wanted to move faster than other banks and increase transactions",
        body: [
          "The expectation was that QR would feel modern and attractive, especially for younger users. But before moving forward, we needed to understand whether customers actually understood what this feature was, how they would use it, and where it could live in the app without creating confusion.",
          "This mattered because in Ecuador digital maturity levels are not high. Even small changes in a familiar financial interface can create friction quickly. In that environment, adding a new money movement feature was not just a visual design problem. It was a trust and information-architecture problem."
        ]
      },
      {
        type: "split",
        eyebrow: "02. What We Learned",
        title: "Fast and modern became simple, safe, and reliable",
        body: [
          "We relied on existing research from the sibling company that powered the QR engine, then validated how this feature should appear inside Banco Pichincha's app.",
          "We ran preliminary interviews, 5-second tests, A/B tests, and card sorting with 21 users."
        ],
        calloutTitle: "Findings",
        bullets: [
          "Security concerns had to be addressed from the beginning.",
          "Receive Money was the clearest and most natural label.",
          "The entry point mattered more than the QR code itself."
        ]
      },
      {
        type: "split",
        eyebrow: "03. The Real Challenge",
        title: "Users needed something simple and trustworthy, not flashy",
        body: [
          "The product needed a new entry point that did not damage established navigation patterns.",
          "Another internal team was launching a different receive money feature at the same time, and the QR technology came from a sibling company whose brand had to appear inside the flow without creating suspicion."
        ],
        calloutTitle: "Constraints",
        bullets: [
          "External brand inside the banking flow.",
          "New feature competing for homepage placement.",
          "Ongoing redesign work in the same product surface.",
          "High trust requirement for any money movement flow."
        ]
      },
      {
        type: "decisions",
        eyebrow: "04. Key Decisions",
        title: "The design decisions focused on entry point, naming, simplicity, and branding",
        decisions: [
          {
            title: "Entry Point",
            body:
              "I grouped the available options under one Receive Money entry point so the feature could be introduced without disrupting the flows people already used most."
          },
          {
            title: "Naming",
            body:
              "Receive Money was the label people understood most naturally. Other options created confusion or suggested a different type of transaction."
          },
          {
            title: "Simplicity",
            body:
              "Testing showed that more decorated versions created doubt and friction, so I pushed for a cleaner QR design."
          },
          {
            title: "Branding",
            body:
              "I added supporting context so the sibling-company logo felt intentional and trustworthy instead of suspicious."
          }
        ]
      },
      {
        type: "text",
        eyebrow: "05. Accessibility",
        title: "Transactions for everyone",
        body: [
          "The feature needed to be usable by a wide range of users in a high-stakes context. Beyond screen-reader labels, I kept the interaction intentionally simple, used strong contrast to protect QR readability, reduced unnecessary decoration, and kept the flow short.",
          "Labels were organized into contextual, event, descriptive, and omission categories so screen readers could provide useful information without overload."
        ]
      },
      {
        type: "text",
        eyebrow: "06. Outcome",
        title: "The feature shipped and the core structural decision lasted",
        body: [
          "I left the bank before I could track post-launch performance, so I would not invent product metrics. But the feature shipped, it is still live, and the Receive Money bottom-sheet entry point was strong enough to influence later features."
        ]
      },
      {
        type: "text",
        eyebrow: "07. Why This Case Matters",
        title: "This project shows how I work when the request is vague, the timeline is short, and the stakes are high",
        body: [
          "I can take a loosely defined business idea, find the real product problem underneath it, test the parts that matter most, and shape a solution that respects both user trust and product architecture."
        ]
      }
    ]
  }
];

export function getProject(slug: string) {
  return caseStudies.find((project) => project.slug === slug);
}
