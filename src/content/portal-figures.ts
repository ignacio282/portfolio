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

  // 03. My approach — the finding that was prose-only. A high-priority page
  // was meant to build traffic organically after launch. It never did: the
  // only time anyone arrived was when a campaign pointed them at it, which is
  // what made this a navigation problem rather than a content one.
  pagePerformance: {
    title: "Expected against actual visits after launch",
    description:
      "A schematic line chart of visits over the months after a page launched. The expected line climbs steadily from zero as traffic builds. The actual line stays flat and low, apart from one sharp peak when a campaign pointed people directly at the page, after which it falls back.",
    legend: {
      expected: "How the business expected a new page to perform",
      actual: "How the page actually performed"
    },
    axisLabels: { x: "Months since launch", y: "Visits" },
    // Both series are 0–100 on the same visits scale, sampled monthly from
    // launch. The values carry the shape of the finding; they are not measured
    // analytics, which is what the caption says out loud.
    caption:
      "Schematic. The shape is the pattern the audit surfaced, not raw analytics values.",
    months: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    // Only these month indices get a gridline and a label, so the axis stays
    // readable at nine sample points.
    ticks: [0, 2, 4, 6, 8],
    expected: [0, 22, 40, 55, 66, 74, 81, 86, 90],
    actual: [0, 8, 12, 14, 13, 62, 30, 17, 15],
    // The spike, anchored to a month index.
    peak: { month: 5, note: "A campaign sent people straight here" }
  }
};
