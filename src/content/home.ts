import { projects } from "./projects";
import type { BuilderLabProject, ImpactStat } from "./types";

export const homeContent = {
  hero: {
    title: "Hey, I'm Ignacio",
    kicker: "Product Designer",
    lines: [
      "Product designer who thinks in systems, not screens.",
      "4+ years designing for enterprise banking products. Now I use AI to take that same thinking from prototype to the real thing."
    ]
  },
  workOn: [
    "B2C banking & fintech products",
    "B2B financial workflows",
    "Internal tools & complex user flows",
    "Design systems & reusable UI"
  ],
  impact: [
    {
      metric: "4M users",
      body: "Designed features for the mobile banking app as part of the product team.",
      product: "Banco Pichincha · Mobile banking app",
      count: { from: 0, to: 4_000_000, format: "compact", suffix: " users" }
    },
    {
      metric: "−12% bounce",
      body:
        "Redesigned the bank's website with a small team. Improved the information architecture, content, and built a UI component library.",
      product: "Banco Pichincha · Public website",
      count: { from: 0, to: 12, prefix: "−", suffix: "% bounce" }
    },
    {
      metric: "21 → 7 days",
      body:
        "Consolidated forms in the corporate checking account opening flow, cutting opening time during a pilot.",
      product: "Banco Pichincha · Corporate onboarding",
      count: { from: 21, to: 7, prefix: "21 → ", suffix: " days", delay: 0.25 }
    }
  ] satisfies ImpactStat[],
  caseIntro:
    "These case studies show how I design products in complex, real-world systems, from products used by millions in banking to AI-powered tools, focusing on decisions, trade-offs, and impact.",
  projects,
  builderLab: {
    label: "Things I've built",
    body:
      "Personal projects and experiments to hone my code and craft skills. See how I turn my ideas into products through hands-on exploration.",
    cta: "See What I've Built",
    href: "/lab",
    projects: [
      {
        slug: "household-finance-tracker",
        title: "Household Finance Tracker",
        summary:
          "A finance dashboard that reads our bank statements and sorts every transaction on its own.",
        tags: ["Web Dev"],
        accent: "#2f7d63",
        demoUrl: "https://finance-tool-red.vercel.app/demo",
        video: "/images/builder/household-finance-tracker/FinanceCompressed.mp4",
        imageAlt: "Household finance tracker dashboard",
        details: {
          description:
            "A household finance tracker built because categorizing a month of spending by hand never survives contact with real life. Statements from several cards and accounts go in, the Claude API sorts each transaction into a category, and the dashboard shows net cash flow, spending by category, and how the budget period is actually going.",
          features: [
            "Imports statements from several cards and accounts in one pass.",
            "Categorizes every transaction through the Claude API instead of by hand.",
            "Tracks net cash flow and spending by category across the budget period.",
            "Flags how the period is actually going against the budget that was set."
          ],
          /* TODO(ignacio): confirm — inferred from the Vercel demo URL. */
          stack: ["Next.js", "React", "TypeScript", "Claude API", "Vercel"]
        }
      },
      {
        slug: "meal-prep-assistant",
        title: "MealPrep Buddy",
        summary:
          "A recipe dashboard that turns scattered meal ideas into an easy weekly plan.",
        tags: ["Web Dev"],
        accent: "#d36f42",
        image: "/images/builder/meal-prep-assistant/card.png",
        imageAlt: "Meal Prep Assistant recipe dashboard",
        video: "/images/builder/meal-prep-assistant/MealCompressed.mp4",
        videoPoster: "/images/builder/meal-prep-assistant/slide-1.png",
        details: {
          description:
            "A personal meal-planning product that keeps recipes, meal rotations, and weekly planning in one dashboard so cooking decisions do not restart from zero every week.",
          features: [
            "Turns a pasted recipe or a rough note into a filled-in recipe form, asking a follow-up when something is unclear.",
            "Plans the week in one rotation view instead of deciding meal by meal.",
            "Pulls three options at random from the saved library when nothing sounds good.",
            "Keeps every recipe in one place so the week does not restart from zero."
          ],
          /* TODO(ignacio): confirm the database and host. */
          stack: ["Next.js", "TypeScript", "Supabase", "OpenAI API", "Vercel"]
        }
      },
      {
        slug: "survivor-style-game",
        title: "Poligon Survivors",
        summary:
          "A wave survival arcade game built to explore enemy design, upgrades, and pacing.",
        tags: ["Game Dev"],
        accent: "#7d5bb8",
        image: "/images/builder/survivor-style-game/card.png",
        imageAlt: "Survivor-style arcade game screenshot",
        details: {
          description:
            "A small arcade game inspired by survival wave mechanics, built to explore player feedback, upgrade loops, pacing, and the feeling of pressure over time.",
          features: [
            "A wave survival loop that ramps pressure the longer a run lasts.",
            "Upgrades between waves that change how the rest of the run plays.",
            "Distinct enemy types built to read at a glance under pressure.",
            "Score, time survived, and HP tracked on screen throughout."
          ],
          stack: ["Godot", "GDScript"]
        }
      }
    ] satisfies BuilderLabProject[]
  },
  startupsBanner: {
    title: "I also work with early-stage teams on product design",
    body:
      "From early ideas to products already in use, bringing a designer's perspective to what you're building.",
    cta: "Learn more",
    href: "/startups"
  },
  process: {
    title: "See how I work",
    body: "My design approach and how I solve real problems."
  }
};
