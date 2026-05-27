import type { ReactNode } from "react";
import Link from "next/link";
import { LayoutGrid, ShieldCheck, Type } from "lucide-react";
import { CaseStudyCompanion } from "@/components/ai/case-study-companion";
import { BottomNav } from "@/components/shell/bottom-nav";
import { CaseStudyNavigation, type CaseStudySectionLink } from "@/components/shell/case-study-navigation";
import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/motion/animated-section";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { Card } from "@/components/visual/card";
import { InlineCTA } from "@/components/visual/inline-cta";
import { MediaFrame } from "@/components/visual/media-frame";
import { PageSection } from "@/components/visual/page-section";
import { SectionLabel } from "@/components/visual/section-label";
import { caseStudies } from "@/content/projects";
import type { CaseMedia, CaseSection, CaseStudy } from "@/content/types";

const portalSectionLinks: CaseStudySectionLink[] = [
  { label: "Overview", href: "#overview" },
  { label: "Why we started", href: "#why-started" },
  { label: "The challenge", href: "#challenge" },
  { label: "My approach", href: "#approach" },
  { label: "My role", href: "#role" },
  { label: "UI strategy", href: "#strategy" },
  { label: "Key decisions", href: "#decisions" },
  { label: "What changed", href: "#changed" },
  { label: "Why this matters", href: "#matters" }
];

const readingSectionLinks: CaseStudySectionLink[] = [
  { label: "Overview", href: "#overview" },
  { label: "Opportunity", href: "#opportunity" },
  { label: "Core idea", href: "#core-idea" },
  { label: "AI behavior", href: "#ai-behavior" },
  { label: "AI layering", href: "#ai-layering" },
  { label: "Designer to builder", href: "#designer-to-builder" },
  { label: "Product", href: "#product" },
  { label: "Testing", href: "#testing" },
  { label: "Learnings", href: "#learnings" },
  { label: "Why this matters", href: "#matters" }
];

const qrSectionLinks: CaseStudySectionLink[] = [
  { label: "Overview", href: "#overview" },
  { label: "Business context", href: "#business-context" },
  { label: "What we learned", href: "#what-we-learned" },
  { label: "The real challenge", href: "#real-challenge" },
  { label: "Key decisions", href: "#key-decisions" },
  { label: "Accessibility", href: "#accessibility" },
  { label: "Outcome", href: "#outcome" },
  { label: "Why this matters", href: "#matters" }
];

export function CaseStudyPage({ project }: { project: CaseStudy }) {
  const nextProject =
    caseStudies[(caseStudies.findIndex((item) => item.slug === project.slug) + 1) % caseStudies.length];

  if (project.slug === "portal") {
    return <PortalCaseStudyPage project={project} nextProject={nextProject} />;
  }

  if (project.slug === "reading") {
    return <ReadingCaseStudyPage project={project} nextProject={caseStudies[0] ?? nextProject} />;
  }

  if (project.slug === "qr") {
    return <QrCaseStudyPage project={project} nextProject={nextProject} />;
  }

  return (
    <main>
      <ScrollProgress />
      <CaseStudyCompanion slug={project.slug} projectTitle={project.title} />
      <PageSection spacing="hero">
        <CaseHero project={project} />
      </PageSection>

      <PageSection spacing="md">
        <OverviewPanel project={project} />
      </PageSection>

      <PageSection className="gap-20 py-8">
        {project.sections.map((section) => (
          <CaseSectionBlock key={section.eyebrow} section={section} />
        ))}
      </PageSection>

      <BottomNav />

      <PageSection className="pb-24">
        <NextProjectCard project={nextProject} />
      </PageSection>
    </main>
  );
}

function QrCaseStudyPage({
  project,
  nextProject
}: {
  project: CaseStudy;
  nextProject: CaseStudy;
}) {
  return (
    <main>
      <ScrollProgress />
      <CaseStudyNavigation sections={qrSectionLinks} />
      <CaseStudyCompanion slug={project.slug} projectTitle={project.title} />
      <PageSection spacing="hero">
        <QrHero />
      </PageSection>

      <PageSection id="overview" spacing="md" className="scroll-mt-32">
        <QrOverview />
      </PageSection>

      <PageSection className="gap-20 py-8">
        <QrBusinessContext />
        <QrWhatLearned />
        <QrRealChallenge />
        <QrKeyDecisions />
        <QrAccessibility />
        <QrOutcome />
        <QrMatters nextProject={nextProject} />
      </PageSection>
    </main>
  );
}

function QrHero() {
  return (
    <AnimatedSection>
      <MediaFrame
        src="/images/projects/qr/case/HeroImage.avif"
        alt="Hero artwork for the QR money request case study."
        className="aspect-[16/9] w-full"
        imageClassName="object-cover"
        radius="lg"
        priority
        sizes="(max-width: 768px) 92vw, 1280px"
      />
    </AnimatedSection>
  );
}

function QrOverview() {
  const outcomes = [
    [
      "21 users tested",
      "Across 5-second tests, interviews, and findability studies to validate wording and placement."
    ],
    [
      "Architecture",
      "Created a bottom-sheet model that introduced the feature without disrupting the home screen."
    ],
    [
      "3-step flow",
      "A simple structure that reduced friction and made the task easier to understand."
    ],
    [
      "Trust first",
      "A readable QR experience designed around security concerns, context, and confidence."
    ]
  ];

  return (
    <AnimatedSection>
      <Card padding="lg">
        <div className="space-y-7">
          <div>
            <h2 className="type-section-title">The Problem</h2>
            <p className="type-body mt-3">
              What started as a business push for QR money requests exposed a broader product challenge. Users were unfamiliar with QR transfers, worried about security, and the app had no clear place for a new money-receiving flow without disrupting its most used actions.
            </p>
          </div>
          <div>
            <h2 className="type-section-title">Why This Mattered</h2>
            <ul className="type-body mt-3 list-disc space-y-1 pl-5">
              <li>The request came from business, not from a clearly validated user need.</li>
              <li>In a high-traffic banking app, even a small homepage change could create confusion.</li>
              <li>The real challenge was not just designing a QR screen. It was defining the right <strong>entry point, language, and trust signals</strong> for a new financial flow.</li>
            </ul>
          </div>
          <div>
            <h2 className="type-section-title">My Role</h2>
            <p className="type-body mt-3">
              I turned a <strong>vague business request into a shippable product</strong> concept. I defined the final flow and entry point, <strong>led the UI design</strong>, and <strong>worked across product, brand, engineering, and the sibling payments team</strong> to make the feature clear, trustworthy, and compatible with the app&apos;s existing architecture.
            </p>
          </div>
          <div>
            <h2 className="type-section-title text-center">Outcomes</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {outcomes.map(([value, label]) => (
                <div key={value} className="min-h-40 rounded-[8px] border border-teal p-5">
                  <p className="type-small-title">{value}</p>
                  <p className="type-body-small mt-3">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

    </AnimatedSection>
  );
}

function QrBusinessContext() {
  return (
    <AnimatedSection id="business-context" className="case-rule scroll-mt-32 pt-20">
      <CaseSectionLabel>01. Business Context</CaseSectionLabel>
      <h2 className="type-case-display-title mt-7">
        Leadership wanted to <span className="text-teal">move faster</span> than other banks and increase transactions.
      </h2>
      <div className="type-body mt-8 max-w-6xl space-y-7">
        <p>
          The expectation was that QR would feel modern and attractive, especially for younger users. But before moving forward, we needed to understand whether customers actually understood what this feature was, how they would use it, and where it could live in the app without creating confusion.
        </p>
        <p>
          <strong>This mattered because in Ecuador digital maturity levels are not high.</strong> Even small changes in a familiar financial interface can create friction quickly. In that environment, adding a new money movement feature was not just a visual design problem. It was a trust and information-architecture problem.
        </p>
      </div>
    </AnimatedSection>
  );
}

function QrWhatLearned() {
  const methods = ["Interviews", "5-Second Test", "A/B Tests", "Card Sorting"];
  const findings = [
    {
      title: "Security Concerns",
      body: (
        <>
          Many people did not understand QR as a safe way to move money and were afraid someone could misuse it. <strong>That meant trust had to be designed into the feature</strong> from the beginning.
        </>
      ),
      icon: ShieldCheck
    },
    {
      title: "Language Mattered",
      body: (
        <>
          We tested different labels in Spanish, including versions closer to &ldquo;request&rdquo; or &ldquo;ask for money,&rdquo; but those created confusion and sometimes made users think the feature was related to loans. <strong>&ldquo;Receive Money&rdquo; was the clearest and most natural option.</strong>
        </>
      ),
      icon: Type
    },
    {
      title: "Architecture",
      body: (
        <>
          The hardest part of the problem was not the QR code itself. It was where this feature should live in the product. Our testing focused heavily on entry point position because changing the homepage of a heavily used banking app carries risk for the rest of the experience.
        </>
      ),
      icon: LayoutGrid
    }
  ];

  return (
    <AnimatedSection id="what-we-learned" className="case-rule scroll-mt-32 pt-20">
      <CaseSectionLabel>02. What We Learned</CaseSectionLabel>
      <p className="type-body mt-7 max-w-6xl">
        We relied heavily on existing research from the sibling company that powered the QR engine, since they had already studied how QR payments worked in the Ecuadorian market and the project had limited time. That gave us a head start, but we still needed to validate how this feature should appear inside Banco Pichincha&apos;s app.
      </p>
      <div className="mt-10 grid gap-10 md:grid-cols-[200px_1fr] md:items-center">
        <div>
          <p className="type-case-display-metric">21 Users</p>
          <p className="type-case-metric-label mt-3">Interviewed And Tested</p>
        </div>
        <div>
          <p className="type-body">We ran a full round of preliminary interviews and usability testing with lo-fi prototypes.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {methods.map((method) => (
              <div key={method} className="surface-card min-h-16 rounded-full px-6 py-5 text-center">
                <p className="type-small-title">{method}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <h3 className="type-case-subtitle mt-10">Findings</h3>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {findings.map((finding) => {
          const Icon = finding.icon;
          return (
            <div key={finding.title} className="rounded-[8px] border border-teal p-5">
              <div className="flex items-center gap-3">
                <Icon aria-hidden="true" className="text-teal" size={25} />
                <h4 className="type-case-subtitle">{finding.title}</h4>
              </div>
              <p className="type-body-small mt-4">{finding.body}</p>
            </div>
          );
        })}
      </div>
      <h2 className="type-case-display-title mt-10">
        Fast and modern <span className="text-teal">&rarr;</span> Simple, safe, and reliable
      </h2>
    </AnimatedSection>
  );
}

function QrRealChallenge() {
  return (
    <AnimatedSection id="real-challenge" className="case-rule scroll-mt-32 pt-20">
      <CaseSectionLabel>03. The Real Challenge</CaseSectionLabel>
      <div className="mt-8 grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <CaseImage
          src="/images/projects/qr/case/Section3Imagewebp.webp"
          alt="Diagram showing external brand, new features, entry point, and ongoing redesign constraints."
          aspect="aspect-[1.42/1]"
          compact
          fit="contain"
          maxWidth="max-w-[620px]"
        />
        <div className="type-body-large space-y-7">
          <p>Users needed <strong>something simple</strong> and trustworthy, not flashy.</p>
          <p>The product needed a <strong>new entry point</strong> that did not damage established navigation patterns.</p>
          <p><strong>Another internal team</strong> was launching a different &ldquo;receive money&rdquo; feature at the same time and wanted stronger placement on the homepage.</p>
          <p>And the QR technology came from a <strong>sibling company</strong>, whose brand had to appear inside the flow in a way that did not create suspicion.</p>
        </div>
      </div>
    </AnimatedSection>
  );
}

function QrKeyDecisions() {
  const decisions = [
    [
      "Entry Point",
      "Instead of adding more actions to the homepage, I grouped the available options under one Receive Money entry point. This let us introduce the feature without disrupting the flows people already used most."
    ],
    [
      "Naming",
      "We tested different labels, and Receive Money was the one people understood most naturally. Other options created confusion or suggested a different type of transaction."
    ],
    [
      "Simplicity",
      "Testing showed that more decorated versions created more doubt and friction. I pushed for a cleaner QR design that felt easier to understand, safer, and more reliable."
    ],
    [
      "Branding",
      "Because the QR technology came from a sibling company, some users questioned the extra logo. I added supporting context in the interface so the feature felt intentional and trustworthy."
    ]
  ];

  return (
    <AnimatedSection id="key-decisions" className="case-rule scroll-mt-32 pt-20">
      <CaseSectionLabel>04. Key Decisions</CaseSectionLabel>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {decisions.map(([title, body], index) => (
          <Card key={title} padding="md" className="min-h-56">
            <div className="flex gap-6">
              <p className="type-index-marker">{index + 1}</p>
              <div>
                <h3 className="type-case-subtitle">{title}</h3>
                <p className="type-body mt-5">{body}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </AnimatedSection>
  );
}

function QrAccessibility() {
  const categories = [
    ["Contextual Labels", "Provide users with an overview of the screen's purpose and what they are about to do."],
    ["Event Labels", "Give feedback on user interactions with interactive elements, such as buttons, selectors, or input fields."],
    ["Descriptive Labels", "Read out important screen elements like headings, descriptions, or available actions."],
    ["Omission Labels", "Tell the screen reader to skip elements that do not add value, such as decorative images, to reduce confusion."]
  ];

  return (
    <AnimatedSection id="accessibility" className="case-rule scroll-mt-32 pt-20">
      <CaseSectionLabel>05. Accessibility</CaseSectionLabel>
      <h2 className="type-case-display-title mt-7">Transactions For Everyone</h2>
      <div className="type-body mt-5 max-w-6xl space-y-7">
        <p>
          This project was not only about getting the feature out quickly. It also needed to be usable by a wide range of users in a high-stakes context. Beyond screen-reader labels, I kept the interaction intentionally simple, used strong contrast to protect QR readability, reduced unnecessary decoration, and kept the flow short so users could understand what was happening without overload.
        </p>
        <div>
          <h3 className="type-case-subtitle">The Labels Were Organized Into Four Categories:</h3>
          <ol className="mt-5 space-y-4">
            {categories.map(([title, body], index) => (
              <li key={title}>
                {index + 1}. <strong>{title}:</strong> {body}
              </li>
            ))}
          </ol>
        </div>
        <p>
          These decisions were important because a confusing or partially accessible money transfer flow can quickly become a barrier. Ensuring clarity for all users, regardless of familiarity with technology or visual ability, was a core priority.
        </p>
      </div>
      <CaseImage
        src="/images/projects/qr/case/Section5Image.webp"
        alt="Accessibility annotation board for the QR money request flow."
        aspect="aspect-[1.3/1]"
        fit="contain"
      />
    </AnimatedSection>
  );
}

function QrOutcome() {
  return (
    <AnimatedSection id="outcome" className="case-rule scroll-mt-32 pt-20">
      <CaseSectionLabel>06. Outcome</CaseSectionLabel>
      <p className="type-body-large mt-7 max-w-6xl">
        I left the bank before I could track post-launch performance, so I would not invent product metrics here. But the feature shipped, it is still live, and the core structural decision behind it, the &ldquo;Receive Money&rdquo; bottom-sheet entry point, was strong enough to influence later features as well. That matters because it shows the work was not just visually approved, it was durable inside the product.
      </p>
    </AnimatedSection>
  );
}

function QrMatters({ nextProject }: { nextProject: CaseStudy }) {
  return (
    <AnimatedSection id="matters" className="case-rule scroll-mt-32 pt-20">
      <CaseSectionLabel>07. Why This Case Matters</CaseSectionLabel>
      <div className="layout-text-pair-balanced mt-7">
        <h2 className="type-case-display-title">
          This project shows <span className="text-teal">how I work</span> when the request is vague, the timeline is short, and the stakes are high.
        </h2>
        <p className="type-body-large">
          I can take a loosely defined business idea, find the real product problem underneath it, test the parts that matter most, and shape a solution that respects both user trust and product architecture. In this case, the most important design work was not drawing the QR screen. It was defining where the feature belonged, what it should be called, and how simple it needed to be for people to use it confidently.
        </p>
      </div>
      <div className="mt-16">
        <NextProjectCard project={nextProject} />
      </div>
    </AnimatedSection>
  );
}

function ReadingCaseStudyPage({
  project,
  nextProject
}: {
  project: CaseStudy;
  nextProject: CaseStudy;
}) {
  return (
    <main>
      <ScrollProgress />
      <CaseStudyNavigation sections={readingSectionLinks} />
      <CaseStudyCompanion slug={project.slug} projectTitle={project.title} />
      <PageSection spacing="hero">
        <ReadingHero />
      </PageSection>

      <PageSection id="overview" spacing="md" className="scroll-mt-32">
        <ReadingOverview />
      </PageSection>

      <PageSection className="gap-20 py-8">
        <ReadingOpportunity />
        <ReadingCoreIdea />
        <ReadingAIBehavior />
        <ReadingAILayering />
        <ReadingDesignerBuilder />
        <ReadingProduct />
        <ReadingTesting />
        <ReadingLearnings />
        <ReadingMatters nextProject={nextProject} />
      </PageSection>
    </main>
  );
}

function ReadingHero() {
  return (
    <AnimatedSection>
      <MediaFrame
        src="/images/projects/reading/case/heroImage.avif"
        alt="Hero artwork for the Scriba reading assistant case study."
        className="aspect-[16/9] w-full"
        imageClassName="object-cover"
        radius="lg"
        priority
        sizes="(max-width: 768px) 92vw, 1280px"
      />
    </AnimatedSection>
  );
}

function ReadingOverview() {
  const outcomes = [
    [
      "Working end-to-end product",
      "From note capture to structured memory, reflection, and spoiler-safe retrieval."
    ],
    [
      "Focused AI behaviors",
      "Instead of one vague assistant, I designed several narrower AI roles with clear responsibilities and limits."
    ],
    [
      "AI-assisted workflow",
      "Used coding agents, structured prompts, and Figma MCP to turn the product into a working system."
    ],
    [
      "Tested and refined",
      "User testing and real-world use led to stronger handling of narrative elements and tighter AI behavior rules."
    ]
  ];

  return (
    <AnimatedSection>
      <Card padding="lg">
        <div className="space-y-7">
          <div>
            <h2 className="type-section-title">The Problem</h2>
            <p className="type-body mt-3">
              Most AI reading tools either over-summarize or act like generic chatbots. I wanted to explore a more useful model: an AI-assisted workflow that helps readers capture messy notes, turn them into structured memory, reflect on what matters, and retrieve it later without spoilers or invented facts.
            </p>
          </div>
          <div>
            <h2 className="type-section-title">Why This Mattered</h2>
            <ul className="type-body mt-3 list-disc space-y-1 pl-5">
              <li>The challenge was not just adding AI to a product. It was making AI helpful without taking over the user&apos;s thinking.</li>
              <li>I wanted to test how far a product designer with coding knowledge could go in building a real AI product, not just designing screens for one.</li>
              <li>The opportunity was to structure AI into clear, focused jobs that support the reading experience at different moments.</li>
            </ul>
          </div>
          <div>
            <h2 className="type-section-title">My Role</h2>
            <p className="type-body mt-3">
              I was the sole designer and builder. I defined the workflow, wrote the prompt logic and behavioral rules for each AI feature, designed the interface in Figma, and used AI coding tools to build the product.
            </p>
          </div>
          <div>
            <h2 className="type-section-title text-center">Outcomes</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {outcomes.map(([value, label]) => (
                <div key={value} className="min-h-40 rounded-[8px] border border-teal p-5">
                  <p className="type-small-title">{value}</p>
                  <p className="type-body-small mt-3">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <YouTubeEmbed />
    </AnimatedSection>
  );
}

function YouTubeEmbed() {
  return (
    <div className="media-frame mt-16 aspect-video w-full rounded-[16px] bg-ink">
      <iframe
        className="h-full w-full"
        src="https://www.youtube.com/embed/GN3Px1lWEaA"
        title="Scriba reading assistant prototype demo"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}

function ReadingOpportunity() {
  return (
    <AnimatedSection id="opportunity" className="case-rule scroll-mt-32 pt-20">
      <div className="layout-text-pair-balanced">
        <div>
          <CaseSectionLabel>02. The Opportunity</CaseSectionLabel>
          <h2 className="type-case-display-title mt-7">
            Most AI tools are good at sounding smart. Very few help people actually <span className="text-teal">learn</span>
          </h2>
          <div className="type-body mt-7 space-y-5">
            <p>
              Readers often highlight passages or take notes, but these notes get lost and rarely lead to deeper understanding. Most reading apps track progress, and most AI tools summarize content for the user instead of supporting personal insight.
            </p>
            <p>
              This project aims to help readers remember more of what they read by creating a tool that guides reflection, connects ideas across chapters, and builds a clearer long-term memory of books.
            </p>
          </div>
        </div>
        <div>
          <ReadingVideo />
          <p className="type-small-title mt-5 text-center">Scriba In Action</p>
        </div>
      </div>
    </AnimatedSection>
  );
}

function ReadingVideo() {
  return (
    <div className="media-frame mx-auto aspect-[498/992] w-full max-w-[360px] rounded-[34px] border-[10px] border-ink bg-ink shadow-[0_18px_45px_rgba(36,37,38,0.18)]">
      <video
        className="h-full w-full rounded-[22px] bg-black object-contain"
        src="/images/projects/reading/case/VideoSection2.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label="Looping product video showing Scriba in action."
      >
        Your browser does not support this video.
      </video>
    </div>
  );
}

function ReadingCoreIdea() {
  return (
    <AnimatedSection id="core-idea" className="case-rule scroll-mt-32 pt-20">
      <CaseSectionLabel>03. The Core Idea</CaseSectionLabel>
      <p className="type-case-subtitle mt-7">The mental model was simple:</p>
      <p className="type-section-title mt-4">capture &rarr; structure &rarr; reflect &rarr; retrieve</p>
      <div className="layout-text-pair mt-10">
        <h2 className="type-case-display-title">
          A reading assistant that thinks <span className="text-teal">with you, not for you.</span>
        </h2>
        <ul className="type-body list-disc space-y-2 pl-5">
          <li>Capture reader thoughts while reading.</li>
          <li>Highlight relationships between themes, characters, and ideas.</li>
          <li>Generate summaries based on the reader&apos;s notes, not generic AI text.</li>
          <li>Track story elements through a structured data model.</li>
          <li>Support guided reflection after each chapter.</li>
        </ul>
      </div>
    </AnimatedSection>
  );
}

function ReadingAIBehavior() {
  return (
    <AnimatedSection id="ai-behavior" className="case-rule scroll-mt-32 pt-20">
      <CaseSectionLabel>04. Designing The AI Behavior</CaseSectionLabel>
      <h2 className="type-case-display-title mt-7">
        What AI could NOT do <span className="text-teal">&gt;</span> What the AI could do
      </h2>
      <p className="type-body mt-7 max-w-5xl">
        I wanted the AI to be helpful, but not overbearing. Supportive, but not dominant. Smart, but not performative. That meant creating explicit behavioral boundaries for each AI role.
      </p>
      <div className="mt-8">
        <h3 className="type-case-subtitle">I designed the system so that:</h3>
        <ul className="type-body mt-5 list-disc space-y-2 pl-5">
          <li>it only answered from the user&apos;s saved notes and reading progress</li>
          <li>it <strong>stayed spoiler-safe</strong> by refusing to go beyond what the reader has written</li>
          <li>it <strong>admitted uncertainty</strong> when the notes were thin</li>
          <li>it <strong>asked clarification</strong> questions only when missing detail would materially improve the saved memory</li>
          <li>it avoided turning the user&apos;s writing into generic, over-polished AI slop</li>
        </ul>
      </div>
    </AnimatedSection>
  );
}

function ReadingAILayering() {
  return (
    <AnimatedSection id="ai-layering" className="case-rule scroll-mt-32 pt-20">
      <CaseSectionLabel>05. AI Layering In Action</CaseSectionLabel>
      <p className="type-body mt-7">
        At a product level, Scriba is not built around one all-knowing assistant. It is built around a small set of focused AI behaviors.
      </p>
      <div className="mt-12 grid gap-12 md:grid-cols-[0.9fr_1fr] md:items-center">
        <div className="type-body space-y-7">
          <div>
            <h3 className="type-case-subtitle">The Silent Organizer</h3>
            <p className="mt-3">
              AI turns messy notes into structured memory: summary, characters, setting, relationships, and reflections. It mostly stays invisible unless a missing detail is important enough to ask about.
            </p>
          </div>
          <div>
            <h3 className="type-case-subtitle">The Reflection Coach</h3>
            <p className="mt-3">
              It does not summarize. It asks the next useful question based on what the user already wrote, helping deepen recall and interpretation.
            </p>
          </div>
          <div>
            <h3 className="type-case-subtitle">The &ldquo;Scribe&rdquo;</h3>
            <p className="mt-3">
              When the user asks something like &ldquo;Who is this again?&rdquo; or &ldquo;How are these two connected?&rdquo;, the assistant answers only from saved notes up to the user&apos;s progress.
            </p>
          </div>
          <div>
            <h3 className="type-case-subtitle">The Knowledge</h3>
            <p className="mt-3">
              The AI generates and stores a working memory of everything the user has written to answer questions, improve output quality, and track stats as more information is captured.
            </p>
          </div>
        </div>
        <CaseImage
          src="/images/projects/reading/case/ImageSection5.webp"
          alt="Reflection cycle architecture diagram showing journal and reflection modes."
          aspect="aspect-[0.79/1]"
          compact
          fit="contain"
          maxWidth="max-w-[620px]"
        />
      </div>
    </AnimatedSection>
  );
}

function ReadingDesignerBuilder() {
  return (
    <AnimatedSection id="designer-to-builder" className="case-rule scroll-mt-32 pt-20">
      <CaseSectionLabel>06. From Designer To Builder</CaseSectionLabel>
      <div className="type-body mt-7 max-w-6xl space-y-5">
        <p>
          A big reason this project matters is that I did not stop at defining the experience in Figma. <strong>I built it.</strong>
        </p>
        <p>
          I used OpenAI&apos;s coding assistant &ldquo;Codex&rdquo; to create the Next.js project, implement the AI model endpoints, set up the front end, and scaffold the database structure. I created the API keys, service setup, and Supabase tables, and I directed the implementation by defining the product logic and the rules the AI needed to follow.
        </p>
      </div>
      <h2 className="type-case-display-title mt-8">
        AI did not replace product thinking. It accelerated execution <span className="text-teal">after</span> the structure was clear.
      </h2>
      <CaseImage
        src="/images/projects/reading/case/ImageSection6.webp"
        alt="Three-column diagram showing system design, interface design, and AI behavior design."
        aspect="aspect-[1.88/1]"
        fit="contain"
      />
      <p className="type-body mt-8 max-w-6xl">
        That became even more obvious when I connected the coding agent to Figma through MCP. Instead of asking the agent to guess from screenshots, I gave it access to the actual design definitions through a Figma-generated JSON structure. That improved fidelity and sped up the workflow substantially.
      </p>
    </AnimatedSection>
  );
}

function ReadingProduct() {
  return (
    <AnimatedSection id="product" className="case-rule scroll-mt-32 pt-20">
      <CaseSectionLabel>07. The Product</CaseSectionLabel>
      <p className="type-body mt-5 max-w-6xl">
        All the designs for this prototype were made using Figma, going from a low-fidelity idea to a high-fidelity prototype with its own mini design system after multiple rounds of feedback and iterations. The following screens show the key interactions and visual elements.
      </p>
      <ProductScreenRow
        image="/images/projects/reading/case/Image1Section7.avif"
        alt="Scriba home screen showing a current book, story progress, and activity."
        title="Home: A Quick Snapshot Of Your Reading Activity"
        reverse={false}
      >
        <p>
          The home screen gives readers a <strong>quick snapshot of their current book</strong>, recent notes, and weekly reading stats. The layout uses a lot of white space, soft neutral tones, and clear hierarchy to support long-form reading and reduce cognitive load.
        </p>
        <p>
          This screen also <strong>pulls data from the structured JSON model</strong> built for the project, displaying recent notes, character mentions, and session history. The goal is to offer a lightweight overview without overwhelming the user with options.
        </p>
      </ProductScreenRow>
      <ProductScreenRow
        image="/images/projects/reading/case/Image2Section7.avif"
        alt="Scriba journal mode screen for capturing thoughts while reading."
        title="Journal Mode: Write Freely While You Read"
        reverse
      >
        <p>
          This screen lets readers capture thoughts without breaking their flow. The interface is minimal on purpose: soft colors, clear text hierarchy, and no distractions. These notes later become part of summaries and reflection prompts.
        </p>
        <p>
          The AI takes a listener role in this screen. It never interrupts the user and silently takes note of the input to generate summaries and extract details of the chapter.
        </p>
      </ProductScreenRow>
      <ProductScreenRow
        image="/images/projects/reading/case/Image3Section7.avif"
        alt="Scriba session summary screen with organized notes, characters, and themes."
        title="Session Summary: Your Notes Organized Automatically"
        reverse={false}
      >
        <p>
          After a reading session, the system organizes notes into a simple structure like summary, characters, and themes. Nothing here is AI invented; all content comes from what the reader wrote. The layout uses clear sections and neutral backgrounds to keep things easy to scan.
        </p>
      </ProductScreenRow>
    </AnimatedSection>
  );
}

function ProductScreenRow({
  image,
  alt,
  title,
  reverse,
  children
}: {
  image: string;
  alt: string;
  title: string;
  reverse: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`mt-16 grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-center ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
      <CaseImage
        src={image}
        alt={alt}
        aspect="aspect-[0.56/1]"
        compact
        fit="contain"
        transparent
        maxWidth="max-w-[360px]"
      />
      <div className="type-body space-y-5">
        <h3 className="type-case-subtitle">{title}</h3>
        {children}
      </div>
    </div>
  );
}

function ReadingTesting() {
  const findings = [
    [
      "Book-Creation Flow",
      "Manual entry was functional, but slower than it needed to be, so I replaced it with Google Books search to make onboarding more natural."
    ],
    [
      "AI's Interpretation",
      "Early behavior assumed characters were always human, which broke down in fantasy and non-human narratives. I updated the prompt logic so the system could handle characters more flexibly."
    ]
  ];

  return (
    <AnimatedSection id="testing" className="case-rule scroll-mt-32 pt-20">
      <CaseSectionLabel>08. Testing And Iteration</CaseSectionLabel>
      <p className="type-body mt-7 max-w-6xl">
        I ran lightweight usability sessions with classmates, where users were asked to add a book, create a note, and interact with the AI assistant. Everyone completed the tasks successfully, but the real value came from what needed improvement.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {findings.map(([title, body]) => (
          <div key={title} className="rounded-[8px] border border-teal p-5">
            <h3 className="type-case-subtitle">{title}</h3>
            <p className="type-body-small mt-4">{body}</p>
          </div>
        ))}
      </div>
      <div className="type-body mt-10 max-w-6xl">
        <h3 className="type-case-subtitle">Tested In Real Scenarios</h3>
        <p className="mt-5">
          I also tested the system on myself over multiple weeks with real books I was reading. That was essential. <strong>AI can generate outputs that look polished on the surface while still being shallow, generic, or slightly wrong.</strong> Repeated usage helped me identify weak patterns, reduce hallucination risk, and make sure the output was actually useful for future recall rather than just cosmetically impressive.
        </p>
      </div>
    </AnimatedSection>
  );
}

function ReadingLearnings() {
  const learnings = [
    [
      "AI Design Is Mostly About Boundaries",
      "The hardest decision was not what the AI should do, but what it should not do. By preventing the assistant from summarizing or inventing story details, the system keeps the reader responsible for generating knowledge."
    ],
    [
      "AI Should Work The Way People Think",
      "I designed three layers aligned with how memory works: Capture -> Reflect -> Retrieve. Each stage supports a different cognitive moment during reading."
    ],
    [
      "Better Structure, Better Output",
      "Working with coding agents taught me that AI works best when the system is well structured. An AGENTS.md file defines context and rules for the coding agent, while the Figma MCP connection lets the agent read real design structure instead of guessing from screenshots."
    ],
    [
      "AI Did Not Replace Design Decisions",
      "AI helped write code faster, but the real work remained designing the system the AI operates within. Deciding when the assistant should speak, organize, question, or stay silent became the most important experience design challenge."
    ]
  ];

  return (
    <AnimatedSection id="learnings" className="case-rule scroll-mt-32 pt-20">
      <CaseSectionLabel>09. Learnings So Far</CaseSectionLabel>
      <div className="mt-7 grid gap-5 md:grid-cols-2">
        {learnings.map(([title, body], index) => (
          <Card key={title} padding="md" className="min-h-72">
            <div className="flex gap-6">
              <p className="type-index-marker">{index + 1}</p>
              <div>
                <h3 className="type-case-subtitle">{title}</h3>
                <p className="type-body mt-5">{body}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </AnimatedSection>
  );
}

function ReadingMatters({ nextProject }: { nextProject: CaseStudy }) {
  return (
    <AnimatedSection id="matters" className="case-rule scroll-mt-32 pt-20">
      <CaseSectionLabel>10. Why This Case Matters</CaseSectionLabel>
      <div className="layout-text-pair-balanced mt-7">
        <h2 className="type-case-display-title">
          This project shows <span className="text-teal">how I design with AI-powered workflows</span> from product ideas to deployment.
        </h2>
        <p className="type-body">
          I am comfortable stepping into ambiguous product spaces, defining the structure that makes AI useful, and translating that structure into working software. In this case, the final output was a functioning reading assistant, but the real work was designing the boundaries, workflows, and product logic that kept the experience grounded in the reader&apos;s own thinking.
        </p>
      </div>
      <div className="mt-16">
        <NextProjectCard project={nextProject} />
      </div>
    </AnimatedSection>
  );
}

function CaseHero({ project }: { project: CaseStudy }) {
  return (
    <AnimatedSection>
      <div
        className="grid min-h-[520px] overflow-hidden rounded-[18px] p-8 text-white md:grid-cols-[0.9fr_1.1fr] md:p-16"
        style={{
          background: `linear-gradient(120deg, ${project.accent}, #b58c8c)`
        }}
      >
        <div className="flex max-w-md flex-col justify-center">
          <h1 className="type-case-hero text-white">
            {project.heroTitle}
          </h1>
          <p className="type-body-large mt-6 text-white/90">
            {project.heroSubtitle}
          </p>
          <ul className="type-case-meta-list mt-8 space-y-4">
            {project.goals.slice(0, 3).map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>
        </div>
        <MediaFrame
          src={project.caseHeroImage ?? project.image}
          alt={project.caseHeroImageAlt ?? project.imageAlt}
          className="mt-8 aspect-[1.4/1] self-center md:mt-0"
          radius="sm"
          priority
          sizes="(max-width: 768px) 92vw, 620px"
        />
      </div>
    </AnimatedSection>
  );
}

function PortalCaseStudyPage({
  project,
  nextProject
}: {
  project: CaseStudy;
  nextProject: CaseStudy;
}) {
  return (
    <main>
      <ScrollProgress />
      <CaseStudyNavigation sections={portalSectionLinks} />
      <CaseStudyCompanion slug={project.slug} projectTitle={project.title} />
      <PageSection spacing="hero">
        <PortalHero />
      </PageSection>

      <PageSection id="overview" spacing="md" className="scroll-mt-32">
        <PortalOverview />
      </PageSection>

      <PageSection className="gap-20 py-8">
        <PortalStarted />
        <PortalChallenge />
        <PortalApproach />
        <PortalRole />
        <PortalStrategy />
        <PortalDecisions />
        <PortalChanged />
        <PortalMatters nextProject={nextProject} />
      </PageSection>
    </main>
  );
}

function PortalHero() {
  return (
    <AnimatedSection>
      <MediaFrame
        src="/images/projects/portal/Case/1.avif"
        alt="Hero artwork for the banking website redesign case study."
        className="aspect-[16/9] w-full"
        imageClassName="object-cover"
        radius="lg"
        priority
        sizes="(max-width: 768px) 92vw, 1280px"
      />
    </AnimatedSection>
  );
}

function PortalOverview() {
  const outcomes = [
    ["500+ pages analyzed", "using analytics, dashboards, funnels, and stakeholder input"],
    ["12% lower bounce rate", "After improving navigation clarity and reducing low-value content"],
    ["Higher engagement", "Priority pages became easier to reach through a clearer site structure"],
    ["Reusable components", "standardized how teams created and maintained pages"]
  ];

  return (
    <AnimatedSection>
      <Card padding="lg">
        <div className="space-y-7">
          <div>
            <h2 className="type-section-title">The problem</h2>
            <p className="type-body mt-3">
              Banco Pichincha&apos;s public website had grown into a fragmented system of more than 500 pages. Different teams had created and managed content over time, which led to inconsistent navigation, duplicated pages, and important information becoming harder to find.
            </p>
          </div>
          <div>
            <h2 className="type-section-title">Why this mattered</h2>
            <p className="type-body mt-3">
              The website served more than 2M users and was one of the main entry points to the bank&apos;s products and services. Migrating the site as-is would have moved years of UX debt into the new CMS.
            </p>
          </div>
          <div>
            <h2 className="type-section-title">My role</h2>
            <p className="type-body mt-3">
              I led the information architecture and UI redesign, created the reusable CMS component system, and worked with brand, content, product, and engineering teams to align the new structure.
            </p>
          </div>
          <div>
            <h2 className="type-section-title text-center">Outcomes</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {outcomes.map(([value, label]) => (
                <div key={value} className="min-h-40 rounded-[8px] border border-teal p-5">
                  <p className="type-small-title">{value}</p>
                  <p className="type-body-small mt-3">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </AnimatedSection>
  );
}


function PortalStarted() {
  return (
    <AnimatedSection id="why-started" className="case-rule scroll-mt-32 pt-20">
      <CaseSectionLabel>01. Why we started</CaseSectionLabel>
      <h2 className="type-case-display-title mt-7">
        The problem was <span className="text-teal">bigger</span> than outdated pages. The website lacked structure.
      </h2>
      <div className="mt-16 grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="type-body space-y-5">
          <p>
            For many customers, the public website was the first place they went to understand products, compare options, or find the next step. But the site had become difficult to use because it had been built in pieces by different departments over time.
          </p>
          <p>
            Users were not always struggling because the information was missing. In many cases, the information existed, but it was buried, duplicated, or written around internal priorities instead of user needs.
          </p>
          <p>
            The CMS migration made the problem visible. If we migrated every page without changing the structure, the bank would keep the same usability problems and make them harder to fix later.
          </p>
        </div>
        <CaseImage src="/images/projects/portal/Case/2.avif" alt="Diagram showing the old CMS structure as a funnel for different departments." aspect="aspect-[1/1]" compact maxWidth="max-w-[420px]" />
      </div>
    </AnimatedSection>
  );
}

function PortalChallenge() {
  return (
    <AnimatedSection id="challenge" className="case-rule scroll-mt-32 pt-20">
      <CaseSectionLabel>02. The challenge</CaseSectionLabel>
      <div className="layout-text-pair mt-8">
        <h2 className="type-case-display-title">
          Redesign pages <span className="text-teal">≠</span> improve structure
        </h2>
        <div>
          <h3 className="type-case-subtitle">The main questions were:</h3>
          <ul className="type-body mt-4 list-disc space-y-1 pl-5">
            <li>Which pages were critical for users and the business?</li>
            <li>Which pages were outdated, duplicated, or no longer useful?</li>
            <li>How could we make the site more consistent without making every page feel rigid?</li>
            <li>How could the new CMS support real publishing workflows after launch?</li>
          </ul>
        </div>
      </div>
      <p className="type-body mt-10">
        The challenge was balancing user clarity, business priorities, brand standards, stakeholder needs, and technical constraints at the same time.
      </p>
    </AnimatedSection>
  );
}

function PortalApproach() {
  return (
    <AnimatedSection id="approach" className="case-rule scroll-mt-32 pt-20">
      <CaseSectionLabel>03. My approach</CaseSectionLabel>
      <p className="type-case-subtitle mt-7">
        We audited the site from both a user and business perspective.
      </p>
      <div className="layout-metric-text-pair mt-12">
        <div>
          <p className="type-case-display-metric">500 pages</p>
          <p className="type-case-metric-label mt-3">Analyzed Using Data</p>
        </div>
        <p className="type-body">
          I worked with my UX partner to analyze the existing site using Google Analytics, internal dashboards, and custom funnels built with support from data engineers.
        </p>
      </div>
      <div className="type-body mt-10 max-w-5xl space-y-5">
        <p>
          We ranked pages by traffic, business importance, and role in the customer journey. This helped us see where the site was working, where users were dropping off, and where important pages were underperforming despite their business value.
        </p>
        <p>
          One of the clearest findings was that some high-priority pages were receiving far less traffic than expected. That pointed to a navigation and information architecture issue, not just a content issue.
        </p>
      </div>
      <p className="type-case-subtitle mt-12">
        We also used customer interviews to understand how people experienced the site.
      </p>
      <blockquote className="type-quote surface-card mt-8 border-l-4 border-teal p-8 text-muted">
        &ldquo;It&apos;s really difficult to find anything on the website, I prefer calling the call center, it&apos;s quicker&rdquo;
      </blockquote>
      <p className="type-body mt-8 max-w-5xl">
        Across 20 customer interviews, we heard similar patterns. Users felt overwhelmed and often preferred calling instead of browsing. The issue was not only the amount of content. Much of the content was written to satisfy internal teams, not to help customers make decisions.
      </p>
      <CaseImage src="/images/projects/portal/Case/3.avif" alt="Customer quote cards from user research interviews." aspect="aspect-[2.05/1]" />
    </AnimatedSection>
  );
}

function PortalRole() {
  return (
    <AnimatedSection id="role" className="case-rule scroll-mt-32 pt-20">
      <CaseSectionLabel>04. My role</CaseSectionLabel>
      <p className="type-case-subtitle mt-7">
        I worked at the intersection of structure, business needs, and design execution.
      </p>
      <div className="mt-10 grid gap-12 md:grid-cols-[1fr_1fr] md:items-center">
        <CaseImage src="/images/projects/portal/Case/4.avif" alt="Venn diagram showing structure, business, and design with me in the middle." aspect="aspect-[1/1]" compact maxWidth="max-w-[560px]" transparent />
        <div>
          <h3 className="type-case-subtitle">My responsibilities included:</h3>
          <ul className="type-body mt-5 list-disc space-y-2 pl-5">
            <li><strong>Analyzing</strong> site data to understand page performance and user behavior</li>
            <li><strong>Defining</strong> the logic for the new information architecture</li>
            <li><strong>Designing</strong> the reusable CMS component system</li>
            <li><strong>Aligning</strong> brand, content, product, and engineering stakeholders</li>
            <li><strong>Creating</strong> guidelines so teams could use the system after launch</li>
          </ul>
          <div className="case-rule mt-8 pt-8">
            <p className="type-body">
              Because many departments owned different parts of the website, the design process needed constant alignment. I led recurring working sessions with brand and communications, product stakeholders, the external technical provider, and the internal technical team.
            </p>
            <p className="type-body mt-5">
              Those sessions helped us test early design directions against real content. They also helped me identify where teams needed flexibility, where the system needed stronger rules, and where custom requests would create long-term maintenance problems.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function PortalStrategy() {
  return (
    <AnimatedSection id="strategy" className="case-rule scroll-mt-32 pt-20">
      <CaseSectionLabel>05. UI strategy</CaseSectionLabel>
      <p className="type-case-subtitle mt-7">
        The component system had to be flexible enough for teams, but strict enough to prevent fragmentation.
      </p>
      <p className="type-body mt-7">
        At first, many stakeholders wanted custom layouts for their own product pages. Even when they agreed with the idea of templates, they often asked for exceptions.
      </p>
      <div className="mt-16 grid gap-12 md:grid-cols-[1.15fr_0.85fr] md:items-center">
        <div>
          <h2 className="type-case-display-title">
            I defended scalability of the system using the <span className="text-teal">80/20</span> principle:
          </h2>
          <ul className="type-body mt-8 list-disc space-y-2 pl-5">
            <li>Components were designed to cover the needs of most pages.</li>
            <li>Edge cases were handled separately when there was a real reason.</li>
            <li>We avoided designing around every exception because that would recreate the same fragmented experience.</li>
          </ul>
          <p className="type-body mt-8">
            This gave teams enough flexibility to publish different types of content while keeping the overall website consistent.
          </p>
        </div>
        <CaseImage src="/images/projects/portal/Case/5.avif" alt="Diagram explaining reusable page components across page A and page B." aspect="aspect-[1/1]" compact maxWidth="max-w-[420px]" />
      </div>
      <CaseImage src="/images/projects/portal/Case/6.avif" alt="Annotated reusable components example for a banking product page." aspect="aspect-[2.04/1]" fit="contain" />
    </AnimatedSection>
  );
}

function PortalDecisions() {
  const decisions = [
    ["Treat the migration as a chance to fix the structure", "The CMS migration could have become a simple content transfer. Instead, we used it to question what should stay, what should be merged, and what needed a clearer path."],
    ["Use data to decide what deserved attention", "With more than 500 pages, we could not redesign everything with the same level of effort. Analytics helped us prioritize the pages that mattered most, find underperforming content, and support decisions with evidence instead of internal preference."],
    ["Standardize around one master structure", "We moved away from every team creating pages in their own way. The new model used one master page structure supported by flexible components. That meant giving up some visual variety, but the tradeoff was worth it: clearer navigation, more consistent pages, and a system that could be maintained over time."],
    ["Design for the people publishing the content", "The component system was not only for users visiting the website. It also helped internal teams understand what content they needed to provide, where it belonged, and how each page should be assembled."]
  ];

  return (
    <AnimatedSection id="decisions" className="case-rule scroll-mt-32 pt-20">
      <CaseSectionLabel>06. Key decisions and tradeoffs</CaseSectionLabel>
      <div className="mt-7 grid gap-5 md:grid-cols-2">
        {decisions.map(([title, body], index) => (
          <Card key={title} className="min-h-64" padding="md">
            <div className="flex gap-6">
              <p className="type-index-marker">{index + 1}</p>
              <div>
                <h3 className="type-case-subtitle">{title}</h3>
                <p className="type-body mt-5">{body}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </AnimatedSection>
  );
}

function PortalChanged() {
  return (
    <AnimatedSection id="changed" className="case-rule scroll-mt-32 pt-20">
      <CaseSectionLabel>07. What changed</CaseSectionLabel>
      <div className="mt-7 grid gap-5 md:grid-cols-2">
        <div className="rounded-[8px] border border-teal p-8">
          <h3 className="type-case-subtitle">User side</h3>
          <p className="type-body mt-5">
            The website became easier to navigate because priority pages had clearer paths and page layouts became more consistent. Users could reach important information with fewer steps, and the overall experience felt less fragmented. <strong>After launch, bounce rate dropped by 12%.</strong>
          </p>
        </div>
        <div className="rounded-[8px] border border-teal p-8">
          <h3 className="type-case-subtitle">Business side</h3>
          <p className="type-body mt-5">
            The redesign reduced duplicated and outdated content, standardized product pages through reusable CMS components, and gave teams a clearer governance model for future publishing.
          </p>
          <p className="type-body mt-5">
            The result was not just a cleaner website. It was a more sustainable way to manage a large public site across many departments.
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}

function PortalMatters({ nextProject }: { nextProject: CaseStudy }) {
  return (
    <AnimatedSection id="matters" className="case-rule scroll-mt-32 pt-20">
      <CaseSectionLabel>08. Why this case matters</CaseSectionLabel>
      <div className="layout-text-pair-balanced mt-7">
        <h2 className="type-case-display-title">
          This project shows <span className="text-teal">how I work</span> when the problem is bigger than the screen.
        </h2>
        <div className="type-body space-y-5">
          <p>
            The value came from identifying the real issue behind the brief, using data to focus the work, aligning teams with different priorities, and designing a system that could scale beyond launch.
          </p>
          <p>
            It also reflects the kind of work I enjoy most: making complex digital experiences easier to understand, easier to use, and easier for teams to maintain.
          </p>
        </div>
      </div>
      <div className="mt-16">
        <NextProjectCard project={nextProject} />
      </div>
    </AnimatedSection>
  );
}

function CaseImage({
  src,
  alt,
  aspect,
  maxWidth,
  fit,
  transparent = false,
  compact = false
}: {
  src: string;
  alt: string;
  aspect: string;
  maxWidth?: string;
  fit?: "cover" | "contain";
  transparent?: boolean;
  compact?: boolean;
}) {
  return (
    <MediaFrame
      src={src}
      alt={alt}
      className={`${compact ? `w-full ${maxWidth ?? "max-w-[520px]"}` : "mt-12 w-full"} ${aspect}`}
      fit={fit ?? (compact ? "contain" : "cover")}
      imageClassName={compact || fit === "contain" ? undefined : "object-top"}
      radius="md"
      transparent={transparent}
      sizes={compact ? "(max-width: 768px) 92vw, 560px" : "(max-width: 768px) 92vw, 1280px"}
    />
  );
}

function OverviewPanel({ project }: { project: CaseStudy }) {
  return (
    <AnimatedSection>
      <Card padding="lg">
        <div className="grid gap-8">
          <div>
            <h2 className="type-section-title">The problem</h2>
            <p className="type-body mt-3">{project.problem}</p>
          </div>
          <div>
            <h2 className="type-section-title">Why this mattered</h2>
            <ul className="type-body mt-3 list-disc space-y-2 pl-5">
              {project.goals.map((goal) => (
                <li key={goal}>{goal}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="type-section-title">My role</h2>
            <p className="type-body mt-3">{project.role}</p>
          </div>
          <OutcomeGrid outcomes={project.outcomes} />
        </div>
      </Card>
    </AnimatedSection>
  );
}

function NextProjectCard({ project }: { project: CaseStudy }) {
  return (
    <AnimatedSection>
      <SectionLabel>Read next case study</SectionLabel>
      <Link
        href={`/projects/${project.slug}`}
        className="surface-link-card mt-8 grid overflow-hidden md:grid-cols-[300px_1fr]"
      >
        <MediaFrame
          src={project.image}
          alt={project.imageAlt}
          className="min-h-[220px]"
          radius="none"
          sizes="(max-width: 768px) 92vw, 300px"
        />
        <div className="p-8">
          <h3 className="type-card-title">{project.title}</h3>
          <p className="type-body-large mt-4">{project.summary}</p>
          <InlineCTA>Read case study</InlineCTA>
        </div>
      </Link>
    </AnimatedSection>
  );
}

function OutcomeGrid({ outcomes }: { outcomes: CaseStudy["outcomes"] }) {
  return (
    <div>
      <h2 className="type-section-title text-center">Outcomes</h2>
      <StaggerGroup className="mt-6 grid gap-4 md:grid-cols-4">
        {outcomes.map((outcome) => (
          <StaggerItem key={outcome.value}>
            <Card className="min-h-32" padding="sm" tone="paper">
              <p className="type-small-title">{outcome.value}</p>
              <p className="type-body-small mt-3">{outcome.label}</p>
            </Card>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}

function CaseSectionBlock({ section }: { section: CaseSection }) {
  if (section.type === "quote") {
    return (
      <AnimatedSection className="case-divider">
        <CaseSectionLabel>{section.eyebrow}</CaseSectionLabel>
        <blockquote className="type-quote surface-card mt-8 p-8">
          &ldquo;{section.quote}&rdquo;
        </blockquote>
        <div className="type-body mt-8 max-w-4xl space-y-5">
          {section.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <CaseMediaBlock media={section.media} />
      </AnimatedSection>
    );
  }

  if (section.type === "split") {
    return (
      <AnimatedSection className="case-divider grid gap-10 md:grid-cols-[1fr_420px]">
        <div>
          <CaseSectionLabel>{section.eyebrow}</CaseSectionLabel>
          <h2 className="type-section-title mt-8">{section.title}</h2>
          <div className="type-body mt-8 space-y-5">
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <Card className="self-start" padding="md">
          <h3 className="type-small-title">{section.calloutTitle}</h3>
          <ul className="type-body-small mt-5 list-disc space-y-3 pl-5">
            {section.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </Card>
        <CaseMediaBlock media={section.media} className="md:col-span-2" />
      </AnimatedSection>
    );
  }

  if (section.type === "decisions") {
    return (
      <AnimatedSection className="case-divider">
        <CaseSectionLabel>{section.eyebrow}</CaseSectionLabel>
        <h2 className="type-section-title mt-8 max-w-4xl">
          {section.title}
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {section.decisions.map((decision, index) => (
            <Card key={decision.title} padding="md">
              <p className="type-metric">{index + 1}</p>
              <h3 className="type-small-title mt-3">{decision.title}</h3>
              <p className="type-body mt-4">{decision.body}</p>
            </Card>
          ))}
        </div>
        <CaseMediaBlock media={section.media} />
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection className="case-divider">
      <CaseSectionLabel>{section.eyebrow}</CaseSectionLabel>
      <h2 className="type-section-title mt-8 max-w-5xl">
        {section.title}
      </h2>
      <div className="type-body mt-8 max-w-4xl space-y-5">
        {section.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <CaseMediaBlock media={section.media} />
    </AnimatedSection>
  );
}

function CaseSectionLabel({ children }: { children: string }) {
  return (
    <SectionLabel variant="case">
      {children}
    </SectionLabel>
  );
}

function CaseMediaBlock({
  media,
  className
}: {
  media?: CaseMedia[];
  className?: string;
}) {
  if (!media?.length) {
    return null;
  }

  return (
    <div className={["mt-10 grid gap-5", className].filter(Boolean).join(" ")}>
      {media.map((item) => (
        <MediaFrame
          key={item.src}
          src={item.src}
          alt={item.alt}
          className={item.aspect ?? "aspect-[1.6/1]"}
          radius="sm"
          sizes="(max-width: 768px) 92vw, 1280px"
        />
      ))}
    </div>
  );
}
