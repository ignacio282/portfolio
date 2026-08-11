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
    label: "Things I Build",
    body:
      "I like to make a lot of things for myself to make my life easier or because it's interesting. I love making things.",
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
        modal: {
          description:
            "A household finance tracker built because categorizing a month of spending by hand never survives contact with real life. Statements from several cards and accounts go in, the Claude API sorts each transaction into a category, and the dashboard shows net cash flow, spending by category, and how the budget period is actually going.",
          relevance: [
            "Shows how I use an LLM as a working part of a product, not a bolt-on feature.",
            "Turns a tedious household chore into a clear, budget-aware view of where money goes.",
            "Covers the full path from data import and modeling to the dashboard and its charts."
          ],
          slides: [
            {
              title: "Walkthrough",
              caption:
                "Statements come in and get categorized, then the dashboard shows net cash flow, spending by category, and budget status across every card and account.",
              variant: "dashboard"
            }
          ]
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
        modal: {
          description:
            "A personal meal-planning product that keeps recipes, meal rotations, and weekly planning in one dashboard so cooking decisions do not restart from zero every week.",
          relevance: [
            "Shows I can turn a common personal workflow into a structured product system.",
            "Connects design, database-backed UI, and deployment-ready web development.",
            "Makes my AI-assisted programming workflow visible through a practical shipped tool."
          ],
          slides: [
            {
              title: "Smart Recipe Intake",
              caption:
                "Paste a recipe or a rough note and the assistant, connected to OpenAI's API, pulls out the ingredients, fills in the recipe form, and asks a follow-up if something's unclear.",
              variant: "dashboard",
              src: "/images/builder/meal-prep-assistant/slide-1.png",
              alt: "Smart recipe intake form prefilled from a pasted recipe"
            },
            {
              title: "Weekly Rotation",
              caption: "A planning surface for choosing meals across the week.",
              variant: "planner",
              src: "/images/builder/meal-prep-assistant/slide-2.png",
              alt: "Weekly meal rotation planner"
            },
            {
              title: "Recipe Randomizer",
              caption:
                "When nothing sounds good, the app pulls three options at random from the saved recipe library.",
              variant: "workflow",
              src: "/images/builder/meal-prep-assistant/slide-3.png",
              alt: "Recipe randomizer suggesting three meals from the library"
            }
          ]
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
        modal: {
          description:
            "A small arcade game inspired by survival wave mechanics, built to explore player feedback, upgrade loops, pacing, and the feeling of pressure over time.",
          relevance: [
            "Shows interaction design beyond conventional product screens.",
            "Highlights systems thinking through balancing, progression, and feedback loops.",
            "Extends my AI-assisted programming workflow into game logic and a real engine, not just web interfaces."
          ],
          slides: [
            {
              title: "In-Game View",
              caption: "Polygon-based characters and enemies, with score, time survived, and HP tracked on screen.",
              variant: "game",
              src: "/images/builder/survivor-style-game/slide-1.png",
              alt: "Gameplay screenshot showing polygon characters, score, time, and HP"
            },
            {
              title: "Enemy Types",
              caption: "A look at the different enemy types and how they read at a glance during a run.",
              variant: "workflow",
              src: "/images/builder/survivor-style-game/slide-2.png",
              alt: "The different enemy types in the game"
            },
            {
              title: "Built in Godot",
              caption: "The project in the Godot editor, where the scenes, scripts, and game logic come together.",
              variant: "game",
              src: "/images/builder/survivor-style-game/slide-3.png",
              alt: "The game open in the Godot editor"
            }
          ]
        }
      },
      {
        slug: "personal-operating-dashboard",
        title: "Personal Operating Dashboard",
        summary:
          "A daily workspace for goals, pomodoro sessions, notes, reminders, job hunting, and the small signals that keep work moving.",
        tags: ["Web Dev"],
        accent: "#00877f",
        modal: {
          description:
            "A planned daily operating system for my own work, combining focus sessions, goals, job-search tracking, reminders, and lightweight stats into one personal dashboard.",
          relevance: [
            "Shows how I think through messy personal workflows and turn them into usable product structure.",
            "Gives me a living testbed for dashboard design, information hierarchy, and habit-forming tools.",
            "Demonstrates the type of internal-tool thinking I can bring to teams and operations products."
          ],
          slides: [
            {
              title: "Daily Command Center",
              caption: "Goals, focus state, and reminders organized for the day.",
              variant: "dashboard"
            },
            {
              title: "Focus Modes",
              caption: "Pomodoro sessions and ambient work controls in one surface.",
              variant: "workflow"
            },
            {
              title: "Progress Signals",
              caption: "Weekly stats and job-search tracking for long-running goals.",
              variant: "planner"
            }
          ]
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
