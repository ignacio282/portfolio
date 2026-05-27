import { projects } from "./projects";
import type { BuilderLabProject } from "./types";

export const homeContent = {
  hero: {
    title: "Hey, I'm Ignacio",
    kicker: "Product Designer",
    lines: [
      "Product designer that creates practical solutions for complex problems.",
      "Using AI Workflows to turn ideas to products for fast-moving teams."
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
      value: "12%",
      label: "Bounce rate reduction on a 2M+ user banking website"
    },
    {
      value: "4M+ users",
      label: "Served with features designed for consumer facing products."
    },
    {
      value: "21 to 7 days",
      label: "Reduction in corporate account opening time."
    }
  ],
  caseIntro:
    "These case studies show how I design products in complex, real-world systems, from products used by millions in banking to AI-powered tools, focusing on decisions, trade-offs, and impact.",
  projects,
  builderLab: {
    label: "Builder Lab",
    title: "Small products, tools, and experiments I design and ship.",
    body:
      "A growing set of practical products and prototypes built with AI-assisted programming, from dashboards and games to hardware experiments.",
    projects: [
      {
        slug: "meal-prep-assistant",
        title: "Meal Prep Assistant",
        summary:
          "A recipe dashboard for saving meals, planning weekly rotations, and turning scattered cooking ideas into a reusable system.",
        tags: ["Web Dev"],
        accent: "#d36f42",
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
              title: "Recipe Library",
              caption: "Saved meals grouped by type, effort, and rotation fit.",
              variant: "dashboard"
            },
            {
              title: "Weekly Rotation",
              caption: "A planning surface for choosing meals across the week.",
              variant: "planner"
            },
            {
              title: "Reusable System",
              caption: "A small product built around repeat use, not one-time entry.",
              variant: "workflow"
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
      },
      {
        slug: "survivor-style-game",
        title: "Survivor-Style Game",
        summary:
          "A playable arcade experiment exploring enemy waves, upgrades, feedback loops, and the pressure curve behind survival games.",
        tags: ["Game Dev"],
        accent: "#7d5bb8",
        modal: {
          description:
            "A small arcade game inspired by survival wave mechanics, built to explore player feedback, upgrade loops, pacing, and the feeling of pressure over time.",
          relevance: [
            "Shows interaction design beyond conventional product screens.",
            "Highlights systems thinking through balancing, progression, and feedback loops.",
            "Adds range to the portfolio by showing I can ship playful, real-time experiences."
          ],
          slides: [
            {
              title: "Wave Pressure",
              caption: "Enemies, movement, and spacing tuned around moment-to-moment readability.",
              variant: "game"
            },
            {
              title: "Upgrade Loops",
              caption: "Small decisions that compound into a stronger run.",
              variant: "workflow"
            },
            {
              title: "Readable Chaos",
              caption: "Feedback and pacing designed so action stays understandable.",
              variant: "game"
            }
          ]
        }
      },
      {
        slug: "rfid-productivity-device",
        title: "RFID Productivity Device",
        summary:
          "A lo-fi Arduino prototype using an LCD screen and RFID reader to trigger small productivity routines away from the browser.",
        tags: ["Physical Computing"],
        accent: "#5c6f82",
        modal: {
          description:
            "A physical productivity prototype built with Arduino, an LCD screen, and an RFID reader, exploring how simple hardware interactions can trigger work modes and reminders.",
          relevance: [
            "Shows comfort prototyping outside the screen and working with real-world constraints.",
            "Connects product thinking to tangible interaction design and low-fidelity hardware.",
            "Makes the Builder Lab feel broader than web apps while still staying tied to productivity."
          ],
          slides: [
            {
              title: "RFID Trigger",
              caption: "Cards become physical shortcuts for focus modes or routines.",
              variant: "hardware"
            },
            {
              title: "LCD Feedback",
              caption: "A tiny display gives immediate state and reminder feedback.",
              variant: "workflow"
            },
            {
              title: "Desk Prototype",
              caption: "A rough but tangible experiment in ambient productivity tools.",
              variant: "hardware"
            }
          ]
        }
      }
    ] satisfies BuilderLabProject[]
  },
  process: {
    title: "See how I work",
    body: "My design approach and how I solve real problems."
  }
};
