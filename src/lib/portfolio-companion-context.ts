import { aboutContent } from "@/content/about";
import { homeContent } from "@/content/home";
import { caseStudies } from "@/content/projects";
import type { CaseSection, CaseStudy } from "@/content/types";
import {
  companionPrompts,
  type CompanionMessage,
  type CompanionPromptId,
  type CompanionSource
} from "@/lib/portfolio-companion-types";

export type CompanionRequestContext = {
  project: CaseStudy;
  question: string;
  promptLabel: string;
  sources: CompanionSource[];
  context: string;
};

const portalNarrative = [
  "Portal-specific rendered case narrative:",
  "The Banco Pichincha public website had grown into more than 500 pages owned by different teams. Different departments created content over time, causing inconsistent navigation, duplicated pages, and buried information.",
  "Ignacio led the information architecture and UI redesign, created the reusable CMS component system, and aligned brand, content, product, and engineering stakeholders.",
  "The team used Google Analytics, internal dashboards, custom funnels, and customer interviews to rank pages by traffic, business importance, and customer journey role.",
  "Customer research showed users felt overwhelmed and often preferred calling the call center instead of browsing the website.",
  "Ignacio defended the scalability of the system using the 80/20 principle: reusable components should cover most page needs, while edge cases should be handled only when justified.",
  "Outcomes shown in the rendered case include 500+ pages analyzed, 12% lower bounce rate, higher engagement, and reusable components for a more maintainable CMS publishing model."
].join("\n");

const readingNarrative = [
  "Reading-specific rendered case narrative:",
  "Scriba is a reading memory companion built to help people capture messy notes, turn them into structured memory, reflect on what matters, and retrieve it later without spoilers or invented facts.",
  "Ignacio was the sole designer and builder. He defined the workflow, wrote the prompt logic and behavioral rules for each AI feature, designed the interface in Figma, and used AI coding tools to build the product.",
  "The core idea is capture, structure, reflect, retrieve: a reading assistant that thinks with the reader, not for the reader.",
  "The AI behavior rules emphasize boundaries: answer only from saved notes and reading progress, stay spoiler-safe, admit uncertainty, ask clarification questions only when useful, and avoid over-polished generic output.",
  "The product is built around focused AI behaviors: the silent organizer, the reflection coach, the scribe, and the knowledge layer.",
  "The rendered case includes a product walkthrough, usability testing findings, and learnings about AI boundaries, structure, and design decisions."
].join("\n");

const qrNarrative = [
  "QR-specific rendered case narrative:",
  "Banco Pichincha wanted to launch QR-based money requests quickly to increase transactions and position the app as more modern, but the request exposed a trust and product architecture challenge.",
  "Ignacio turned a vague business request into a shippable product concept. He defined the final flow and entry point, led the UI design, and worked across product, brand, engineering, and the sibling payments team.",
  "The problem was not only drawing a QR screen. Users were unfamiliar with QR transfers, worried about security, and the app had no clear place for a new money-receiving flow without disrupting its most used actions.",
  "The team validated language and placement with 21 users through preliminary interviews, 5-second tests, A/B tests, and card sorting.",
  "Key decisions included grouping options under one Receive Money entry point, using the clearest tested label, simplifying the QR design, and adding supporting context for the sibling-company brand.",
  "The feature shipped, remains live, and the Receive Money bottom-sheet entry point influenced later features."
].join("\n");

const promptFallbacks: Record<CompanionPromptId, string> = {
  "recruiter-summary":
    "Live AI is unavailable, so here is the guided version: Ignacio's strongest signal in this case is that he can turn messy, real-world product systems into clearer experiences. The work connects research, stakeholder alignment, information architecture, reusable UI, and measurable outcomes rather than stopping at visual polish.",
  role:
    "Live AI is unavailable, so here is the guided version: Ignacio's role centered on product design execution, design-system thinking, and cross-functional alignment. He owned important parts of the structure, UI decisions, and handoff quality while balancing user needs, business priorities, and technical constraints.",
  decisions:
    "Live AI is unavailable, so here is the guided version: the important decisions are the ones that improved clarity and scale. Look for how Ignacio prioritized reusable patterns, simplified complex flows, reduced fragmentation, and used evidence instead of preference to guide design direction.",
  tradeoffs:
    "Live AI is unavailable, so here is the guided version: the core tradeoff was flexibility versus consistency. Ignacio's work shows how he gave teams enough room to solve real needs while preventing one-off decisions from weakening the larger product system.",
  impressive:
    "Live AI is unavailable, so here is the guided version: this project is impressive because it shows practical product judgment. Ignacio connects business impact, user research, scalable design systems, and implementation constraints in a way that hiring managers can evaluate quickly."
};

export function buildCompanionContext({
  slug,
  promptId,
  question,
  messages = []
}: {
  slug: string;
  promptId?: CompanionPromptId;
  question?: string;
  messages?: CompanionMessage[];
}): CompanionRequestContext | null {
  const project = caseStudies.find((item) => item.slug === slug);

  if (!project) {
    return null;
  }

  const prompt = promptId ? companionPrompts.find((item) => item.id === promptId) : undefined;
  const resolvedQuestion = (question || prompt?.question || "").trim();

  if (!resolvedQuestion) {
    return null;
  }

  return {
    project,
    question: resolvedQuestion,
    promptLabel: prompt?.label ?? "Custom Question",
    sources: getCompanionSources(project, promptId),
    context: [
      buildProfileContext(),
      buildProjectContext(project),
      project.slug === "portal" ? portalNarrative : "",
      project.slug === "reading" ? readingNarrative : "",
      project.slug === "qr" ? qrNarrative : "",
      buildSessionContext(messages)
    ]
      .filter(Boolean)
      .join("\n\n")
  };
}

export function getFallbackAnswer(promptId?: CompanionPromptId) {
  if (!promptId) {
    return "Live AI is unavailable right now, but you can still use the guided prompts.";
  }

  return promptFallbacks[promptId];
}

function buildProfileContext() {
  return [
    "Ignacio profile context:",
    `Hero: ${homeContent.hero.lines.join(" ")}`,
    `About: ${aboutContent.hero.body}`,
    `Designer summary: ${aboutContent.designer.body}`,
    `Work areas: ${homeContent.workOn.join("; ")}`,
    `Impact highlights: ${homeContent.impact.map((item) => `${item.value} ${item.label}`).join("; ")}`,
    `Project list: ${homeContent.projects.map((project) => `${project.title}: ${project.summary}`).join("; ")}`
  ].join("\n");
}

function buildProjectContext(project: CaseStudy) {
  return [
    `Current case study: ${project.title}`,
    `Short title: ${project.shortTitle}`,
    `Summary: ${project.summary}`,
    `Hero title: ${project.heroTitle}`,
    `Hero subtitle: ${project.heroSubtitle}`,
    `Overview: ${project.overview}`,
    `Problem: ${project.problem}`,
    `Goals: ${project.goals.join("; ")}`,
    `Role: ${project.role}`,
    `Outcomes: ${project.outcomes.map((outcome) => `${outcome.value}: ${outcome.label}`).join("; ")}`,
    `Sections:\n${project.sections.map(formatCaseSection).join("\n")}`
  ].join("\n");
}

function buildSessionContext(messages: CompanionMessage[]) {
  const recentMessages = messages
    .slice(-6)
    .map((message) => `${message.role}: ${message.content}`)
    .join("\n");

  return recentMessages ? `Recent session messages:\n${recentMessages}` : "";
}

function formatCaseSection(section: CaseSection) {
  if (section.type === "quote") {
    return `- ${section.eyebrow}: Quote "${section.quote}". ${section.body.join(" ")}`;
  }

  if (section.type === "split") {
    return `- ${section.eyebrow}: ${section.title}. ${section.body.join(" ")} ${section.calloutTitle}: ${section.bullets.join("; ")}`;
  }

  if (section.type === "decisions") {
    return `- ${section.eyebrow}: ${section.title}. ${section.decisions.map((decision) => `${decision.title}: ${decision.body}`).join(" ")}`;
  }

  return `- ${section.eyebrow}: ${section.title}. ${section.body.join(" ")}`;
}

function getCompanionSources(project: CaseStudy, promptId?: CompanionPromptId): CompanionSource[] {
  const baseHref = `/projects/${project.slug}`;
  const hasCustomAnchors = project.slug === "portal" || project.slug === "reading" || project.slug === "qr";
  const overviewHref = hasCustomAnchors ? `${baseHref}#overview` : baseHref;

  if (promptId === "role") {
    return [
      { label: "My Role", href: project.slug === "portal" ? `${baseHref}#role` : overviewHref },
      { label: project.title, href: baseHref }
    ];
  }

  if (promptId === "decisions" || promptId === "tradeoffs") {
    if (project.slug === "reading") {
      return [
        { label: "AI Behavior", href: `${baseHref}#ai-behavior` },
        { label: "Testing", href: `${baseHref}#testing` }
      ];
    }

    if (project.slug === "qr") {
      return [
        { label: "Key Decisions", href: `${baseHref}#key-decisions` },
        { label: "The Real Challenge", href: `${baseHref}#real-challenge` }
      ];
    }

    return [
      { label: "Key Decisions", href: project.slug === "portal" ? `${baseHref}#decisions` : baseHref },
      { label: "UI Strategy", href: project.slug === "portal" ? `${baseHref}#strategy` : baseHref }
    ];
  }

  return [
    { label: "Overview", href: overviewHref },
    {
      label: "Outcomes",
      href:
        project.slug === "portal"
          ? `${baseHref}#changed`
          : project.slug === "reading"
            ? `${baseHref}#testing`
            : project.slug === "qr"
              ? `${baseHref}#outcome`
              : baseHref
    }
  ];
}
