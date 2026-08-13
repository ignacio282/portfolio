// Copy and data for the drawn figures in the Scriba case study, kept out of the
// components the way portal-figures.ts feeds the Pichincha diagrams. The
// `title` and `description` on each figure are its accessible name and long
// description — they render as <title>/<desc> inside the SVG, so they have to
// describe the finished picture, not the animation.

export const readingFigures = {
  // 03. The core idea — the four-stage mental model the product is built on.
  coreIdea: {
    title: "The core loop: capture, structure, reflect, retrieve",
    description:
      "Four stages connected left to right by arrows. Capture takes thoughts while reading. Structure turns them into a data model. Reflect asks guided questions after each chapter. Retrieve answers later from the reader's own notes.",
    // Notes are held to roughly twenty characters: SVG text does not wrap, so
    // anything longer runs out past the node it belongs to.
    steps: [
      { name: "Capture", note: "Thoughts while reading" },
      { name: "Structure", note: "Notes into a model" },
      { name: "Reflect", note: "Questions per chapter" },
      { name: "Retrieve", note: "Answers from notes" }
    ]
  },

  // 05. AI layering in action — the reflection cycle. Reading feeds journaling,
  // journaling feeds reflection, and reflection sends the reader back to the
  // book. The two modes are the same loop at different moments, which is why
  // the figure closes rather than ending.
  //
  // The source diagram this replaces labelled both cards "Journal Mode"; the
  // second one is Reflection Mode, which its own goal line makes clear.
  reflectionCycle: {
    title: "The reflection cycle",
    description:
      "A loop. Reading leads into journal mode, where the reader captures thoughts as they come and the AI listens passively. That leads into reflection mode, where the AI becomes an active collaborator and helps make sense of what was read. The loop returns to reading.",
    startLabel: "Start reading",
    // The two modes are the only place in the figure set that needs colour to
    // carry meaning: they are different kinds of work, not two steps of one.
    // The pair is borrowed from the other case study cards — Pichincha's red
    // and the QR flow's indigo — so the palette stays inside the portfolio's
    // own range instead of inventing two more hues. `wash` is each accent's
    // card hover tint, light enough to fill a white card without drowning it.
    modes: [
      {
        name: "Journal mode",
        phase: "While reading",
        goal: "Goal → Capture thoughts as they come",
        role: "AI role: Passive listener",
        accent: "#8b5558",
        wash: "#f1e5e4"
      },
      {
        name: "Reflection mode",
        phase: "After reading",
        goal: "Goal → Make sense of what was read",
        role: "AI role: Active collaborator",
        accent: "#596083",
        wash: "#e6e8f2"
      }
    ]
  },

  // 06. From designer to builder — three layers of design work that only fit
  // together in one order. The structure has to exist before the interface can
  // express it, and the interface before the AI behaviour can be constrained.
  buildLayers: {
    title: "Three layers of design work, keyed together",
    description:
      "Three interlocking panels in a row. System design defines mental models, the data model and reflection loops. Interface design builds the UI, the token system and reading comfort. AI behavior design sets prompt structures, sourcing rules and early prototypes.",
    panels: [
      {
        name: "System design",
        bullets: ["Mental models for chapters", "JSON data model for notes", "Reflection loops over time"]
      },
      {
        name: "Interface design",
        bullets: ["Clean, simple UI in Figma", "Token-based design system", "Clarity for long-form reading"]
      },
      {
        name: "AI behavior design",
        bullets: ["Predictable prompt structures", "User's notes as the only source", "Early React prototypes"]
      }
    ]
  }
};
