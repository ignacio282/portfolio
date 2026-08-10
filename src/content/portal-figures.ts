// Copy and data for the drawn figures in the Pichincha case study, kept out of
// the components the way startups.ts feeds the landing-page diagrams. The
// `title` and `description` on each figure are its accessible name and long
// description — they render as <title>/<desc> inside the SVG, so they have to
// describe the finished picture, not the animation.

export const portalFigures = {
  // 01. Why we started — departments each publishing into one shared CMS with
  // no structure, so everything lands in the same funnel.
  cmsFunnel: {
    title: "The old CMS as a shared funnel",
    description:
      "Five departments — products, services, marketing, regulations and compliance — publish into a single funnel labelled OLD CMS, which narrows to one output: pichincha.com.",
    departments: ["Products", "Services", "Marketing", "Regulations", "Compliance"],
    funnelLabel: "Old CMS",
    outputLabel: "Pichincha.com"
  },

  // 04. My role — the intersection the work actually sat in.
  roleVenn: {
    title: "Working at the intersection of structure, business and design",
    description:
      "Three overlapping circles labelled structure, business and design. The area where all three overlap is labelled me.",
    circles: ["Structure", "Business", "Design"],
    centerLabel: "Me"
  },

  // 05. UI strategy — one library, page after page after page.
  componentReuse: {
    title: "One component library, every page",
    description:
      "A library of three components sits above a page outline. The same three components stack into the page in a different order each time a new page arrives.",
    libraryLabel: "Component library",
    pageLabel: "New page",
    components: [
      { name: "Component A", short: "A" },
      { name: "Component B", short: "B" },
      { name: "Component C", short: "C" }
    ],
    // Each entry is one page: the component index that fills each slot, top to
    // bottom. The figure cycles through them, so the number of arrangements is
    // just the length of this list.
    orders: [
      [0, 1, 2],
      [2, 0, 1],
      [1, 2, 0]
    ]
  },

  // 03. My approach — the finding that was prose-only: business priority and
  // actual traffic pointed in opposite directions. Illustrative, not a plot of
  // real analytics, so the figure is labelled as a schematic.
  trafficPriority: {
    title: "Business priority against actual traffic",
    description:
      "A schematic comparing where pages ranked on business priority with the traffic they actually received. The two lines diverge at the highest-priority pages.",
    legend: {
      priority: "Business priority",
      traffic: "Actual traffic"
    },
    caption: "Schematic. Shapes reflect the pattern we found in the audit, not raw analytics values.",
    // Page groups, ordered from highest business priority to lowest.
    groups: ["Products", "Rates & fees", "Support", "Campaigns", "News"],
    // 0–100. Priority is the ranking we assigned; traffic is what those pages
    // actually got. The gap at the left is the finding.
    priority: [95, 82, 64, 45, 22],
    traffic: [31, 48, 70, 66, 58],
    note: "High-priority pages, far less traffic than expected"
  }
};
