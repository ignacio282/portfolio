import { projects } from "./projects";
import type { BuilderLabProject } from "./types";

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
    label: "Things I Build",
    body:
      "I like to make a lot of things for myself to make my life easier or because it's interesting. I love making things.",
    projects: [
      {
        slug: "meal-prep-assistant",
        title: "MealPrep Buddy",
        summary:
          "A recipe dashboard for saving meals, planning weekly rotations, and turning scattered cooking ideas into a reusable system.",
        tags: ["Web Dev"],
        accent: "#d36f42",
        image: "/images/builder/meal-prep-assistant/card.png",
        imageAlt: "Meal Prep Assistant recipe dashboard",
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
        title: "Poligon Survivors",
        summary:
          "A playable arcade experiment exploring enemy waves, upgrades, feedback loops, and the pressure curve behind survival games.",
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
        slug: "rfid-productivity-device",
        title: "Productivity Pal",
        summary:
          "A lo-fi Arduino prototype using an LCD screen and RFID reader to trigger small productivity routines away from the browser.",
        tags: ["Physical Computing"],
        accent: "#5c6f82",
        modal: {
          description:
            "A physical productivity prototype built with Arduino, an LCD screen, and an RFID reader. The routines it triggers matter less than what it shows: that the same AI-assisted coding workflow I use for web products extends to physical computing.",
          relevance: [
            "Shows comfort prototyping outside the screen and working with real-world constraints.",
            "Connects product thinking to tangible interaction design and low-fidelity hardware.",
            "Demonstrates that my AI-assisted workflow isn't limited to one stack or medium."
          ],
          slides: [
            {
              title: "Arduino Code",
              caption: "The Arduino sketch that reads RFID tags and drives the LCD display.",
              variant: "hardware",
              src: "/images/builder/rfid-productivity-device/slide-1.png",
              alt: "Arduino IDE showing the device's code"
            },
            {
              title: "Tag Reader",
              caption: "Tapping a tag on the reader shows its routine on the small LCD screen.",
              variant: "workflow",
              src: "/images/builder/rfid-productivity-device/slide-2.jpg",
              alt: "The device with an RFID tag held over the reader and the LCD lit up"
            },
            {
              title: "Wiring",
              caption: "The physical connections between the Arduino, the LCD, the RFID reader, and the rest of the components.",
              variant: "hardware",
              src: "/images/builder/rfid-productivity-device/slide-3.jpg",
              alt: "Wiring between the Arduino board and its components"
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
