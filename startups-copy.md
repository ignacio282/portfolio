# /startups — page copy (v3, live)

This is the copy currently on the page. `field:` labels map to keys in
`src/content/startups.ts`. Edit here, hand it back, and I'll map it across.

Markers:

- `[NEEDS INPUT]` — only Ignacio can fill this in. Nothing with this marker
  renders on the page; the section or line stays hidden or falls back.
- `TODO(confirm)` — a claim carried over from an earlier draft that still needs
  checking.
- Text wrapped in `*asterisks*` renders as italics.

---

## Metadata (the LinkedIn preview card)

**field: page.title**
Product design for founders who already shipped

**field: page.description**
You built it with AI and it works. Here's what usually needs a second look before real users arrive.

**field: og.eyebrow**
For Founders

**field: og.headline**
You built with AI. Now what?

**field: og.footer**
Ignacio Vergara, product designer

---

## 1. Hero

**field: hero.title**
You built with AI, and it works. Now what?

**field: hero.body** — the part in `**bold**` is set in semibold with a
hand-drawn teal underline under it.
Getting a first version working and deployed used to take months and a full team. You did it faster than that, more efficiently, and it runs “just fine.” The thing with AI is that it doesn't think about the part that usually comes next: **what happens once people start using it? Real people, not friends and family, not your team.**

**field: hero.help** — sits under the paragraph inside a hand-drawn bracket, so
the page says what you do before anyone scrolls. `TODO(copy)`.

- **help.lead** — That part I can help with.
- **help.items**
  - Learning what you're actually trying to solve
  - Analyzing how usable your product is today
  - Designing on years of practice, not on defaults

**field: hero.credential** — moved up from the "How I help" section so the reason
to believe the claim above sits in the hero. Rendered on a teal tint.
I spent four years designing digital products for a bank with millions of clients, mostly transactional flows where real money was involved and there was no room to get it wrong. All those years and dozens of conversations with real people taught me what an interface and a system actually need to succeed.

**field: hero.primaryCta**
Book a free call

**field: hero.secondaryCta**
Email me

---

## 2. It works but somehow it doesn't feel right

**field: sameness.label**
What's Happening

**field: sameness.title**
It works. But somehow it doesn't feel right.

**field: sameness.body[0]**
AI got you here fast, and I get it, that's great for the business. We all want that. A year ago you would have needed developers, a designer, and a few months to make it real. Now you can have something in a matter of weeks.

**field: sameness.body[1]**
The problem is that everyone in your position does the same thing, and every first version ends up looking just like yours. Tools like Claude Code or OpenAI Codex were trained on the same patterns, so they reach for the same defaults if nobody tells them otherwise.

**field: sameness.defaults** — the staccato line is now drawn, not written. Three
panels sit under the paragraph above: a violet blob, an Inter specimen, and a
circle → triangle → square flow. These label them.

- **defaults.colors** — Same colors
- **defaults.type** — Same text
- **defaults.layout** — Same layout
- **defaults.footer** — *Same experience.* (sits under the strip, at heading size)

**field: sameness.body[2]**
Think of it as a hotel room. Everything is there, nice and tidy, everything works and is where it should be, but somehow it doesn't feel like a house. It's not yours. And it's hard to build a company on something that doesn't feel like it belongs to you.

**field: sameness.images**
`[NEEDS INPUT: 3-up comparison of AI-generated interfaces. Drop files in public/images/startups/, around 16/10. The visual and its caption stay hidden until then.]`

**field: sameness.caption**
Three products, three founders, three different problems being solved. Same page.

Still open from your v3 notes: “just fine” in the hero and *Same experience* here
are two intensifying devices close together. Your call whether one goes.

---

## 3. People can use it. What happens when complaints come?

**field: edgecases.label**
What Comes Next

**field: edgecases.title**
People can use it. What happens when complaints come?

**field: edgecases.body[0]**
AI is good at the version of your product where nothing goes wrong. The signup that completes. The empty state before anyone has touched it. The form filled in the way it's supposed to be filled in. That version is easy, and it's the one you see in every demo.

**field: edgecases.body[1]**
Real people don't stay on that path. They paste the wrong thing, they show up on a bad connection, they use the product for something you didn't build it for. AI can't design for that, because that part isn't generic, it's *yours*, it depends on your users and your data and the thing someone tries on day one that nobody thought to test. No model knows that yet. You only find out by watching real people use the thing.

**field: edgecases.body[2]**
It doesn't show up on launch day. It shows up three weeks later, in a support inbox, one confused message at a time. Nothing breaks loud enough to file a bug over. It just quietly costs you people, and you won't always know why.

**field: edgecases.journey** — a chart sits between body[1] and body[2]. Two
lines across five stages: a flat dashed one for the path AI assumes, a solid
teal one that dips where real people struggle. `TODO(copy)` on all of it.

- **stages** — Lands · Signs up · Sets it up · First real use · Comes back
- **legend.assumed** — How AI assumes people use your product
- **legend.real** — How people actually use it
- **notes** (drawn under the dips, taken from your body[1])
  - at Signs up: on a bad connection
  - at Sets it up: pasted the wrong thing
  - at First real use: used it for something else

**field: edgecases.body[3]**
And here's the part that's easy to ignore when you're moving fast: catching this before it ships is cheap. Catching it after, in front of users who already made up their mind about you, isn't.

---

## 4. I can tailor your solution to real people

**field: bridge.label**
Where I Come In

**field: bridge.title**
I can tailor your solution to *real people.* AI designs for everyone, not your user.

**field: bridge.body[0]** — shortened. The list of traits that used to end this
sentence is now drawn as labels on a figure, so the paragraph stops earlier.
AI is trained on every product that came before yours, so it designs for an average user, and that person doesn't exist. Not the one actually opening your product for the first time.

**field: bridge.person.labels** — six pills orbiting a line-art figure. Short
words work best, long ones crowd the ring. `TODO(copy)`.

- Preferences
- Emotions
- Reasons
- Motivations
- Goals
- Limitations

**field: bridge.body[1]**
So I go through your product the way a new user would, not the way you already know it. I write down what's actually in the way, ranked by what it costs you. Then, if it makes sense, I fix it, hand your team something they can build from, and stick around while it ships.

---

## 5. Two ways to start

**field: offerings.label**
What I Do

**field: offerings.title** — `TODO(copy)`: updated for three offerings.
Three ways to work together

**field: offerings.intro**
Every product is at a different point. These are the shapes the work usually takes, but the call is where we figure out which one, if any, actually fits.

**field: offerings.labels** — the four headings inside every card.
What it is · What's included · What you get · Timeline

### Offering 1

**field: offerings.items[0].name**
Design Review

**field: offerings.items[0].about**
A structured review of your product against usability heuristics, from the first screen to the last. Each flow is tested against real use cases built from your user profiles, so the issues found are the ones your actual users will hit.

**field: offerings.items[0].includes**
- Full walkthrough of your live product
- Heuristic evaluation across your main flows
- Annotated screens marking each issue where it happens
- Issues ranked by what they cost you
- A note on where problems are likely to surface next, as more people use it
- Recorded walkthrough or working session with your team

**field: offerings.items[0].outcome**
A written report with annotated screens, a prioritized list of issues, and a recommended fix order with rough effort for each.

**field: offerings.items[0].timeline**
One to two weeks

### Offering 2

**field: offerings.items[1].name**
Core Flow Design

**field: offerings.items[1].about**
Full design of one flow, end to end. Every screen in the flow, plus the states most first versions skip: empty, loading, error, and the edge cases specific to your product and users.

**field: offerings.items[1].includes**
- Build-ready screens in Figma
- Responsive states
- Empty, loading, error, and edge case states for that flow
- Design tokens for the flow, set up so your coding agents use them
- Handoff session with your engineers
- Availability for questions while it gets built

**field: offerings.items[1].outcome**
A Figma file your team can build directly from, with the tokens already structured for your AI tooling.

**field: offerings.items[1].timeline**
Two to three weeks

### Offering 3

**field: offerings.items[2].name**
Design Foundation

**field: offerings.items[2].about**
Design system built and documented in Figma, then connected to your coding agents so they build from your real design structure. Ongoing design work and review on top of it.

**field: offerings.items[2].includes**
- Component library and design tokens in Figma
- Connection between your design files and your coding agents, so they build from real structure instead of screenshots
- Written rules and context files that keep AI output consistent across your team
- Design review on what your team ships
- Documentation so your team can extend the system without me

**field: offerings.items[2].outcome**
A design system your team owns, wired into your AI workflow, with documentation to extend it.

**field: offerings.items[2].timeline**
Flexible

**field: offerings.scopeNote**
Some teams need one flow fixed before a launch. Some want someone around every week. If neither of these is the right shape, say so on the call and we'll work out something that fits.

---

## 6. How we'd work

**field: process.label**
How We'd Work

**field: process.title**
What the first month looks like

**field: process.steps[0].title**
A call

**field: process.steps[0].body**
Thirty minutes. You show me the product and tell me where it hurts. I tell you whether design is what you need right now, including if the answer is no.

**field: process.steps[1].title**
A scope in writing

**field: process.steps[1].body**
I send what I'd do, what you get, how long it takes, and what it costs. Nothing starts until you've read it and agreed.

**field: process.steps[2].title**
The work

**field: process.steps[2].body**
I share progress as it happens instead of saving it for a reveal. You can push back early, while changing direction is still cheap.

**field: process.steps[3].title**
Handoff

**field: process.steps[3].body**
I walk your engineers through everything and stay reachable while they build. Questions come up during implementation. Answering them is part of the job.

---

## 7. Selected work

Titles and images come from `src/content/projects.ts`. Only these one-liners are
written for founders.

**field: work.label**
Selected Work

**field: work.title**
Where the interface had to carry real weight

**field: work.framings.portal**
A banking site used by more than two million people, restructured so visitors could find what they came for. Bounce rate dropped 12%.

**field: work.framings.reading**
An AI product I designed and built myself, where most of the work was deciding what the model should not do.

**field: work.framings.qr**
`[NEEDS INPUT: real one-liner for the QR project. Left blank, so the case study's own summary shows until you write it.]`

---

## 8. Who I am

**field: bio.label**
Who I Am

**field: bio.title**
Ignacio Vergara

**field: bio.body[0]**
I'm a product designer, originally from Ecuador, now based in Tampa. I have a master's in Digital Media from the University of Central Florida, focused on human-computer interaction.

**field: bio.body[1]**
Most of my work has been inside big companies. I like early-stage products because the problems are just as real without the bureaucracy: no committee, no legacy system to route around, and the person who decides is usually the person I'm talking to.

**field: bio.body[2]**
On my own time I design and build things, usually with more enthusiasm than planning. I read too much science fiction and fantasy, I play more games than I admit to, and I'll trade anime recommendations with anyone who asks.

---

## 9. Questions

**field: faq.label**
Questions

**field: faq.title**
Before you book

**field: faq.items[0].question**
How much does this cost?

**field: faq.items[0].answer** — `TODO(confirm)`: your call, a starting number or scoped per project. The scoped version is in place as a placeholder.
It depends on scope, and a range this early would not mean much. After the first call I send a written scope with a price attached, so you know the number before you commit to anything.

**field: faq.items[1].question**
We don't have a designer. Is that a problem?

**field: faq.items[1].answer**
No, and most teams I talk to don't. I work directly with founders and engineers, and I write things down so your team can act on them without a designer in the middle.

**field: faq.items[2].question**
Will this slow my engineers down?

**field: faq.items[2].answer**
It shouldn't. I work ahead of the build rather than inside it, and I hand over designs with the detail engineers need, which usually means less guessing later.

**field: faq.items[3].question**
Can you work with what we already have?

**field: faq.items[3].answer**
Yes, and that's usually the point. I design around your existing stack and components instead of handing you something that means starting over.

**field: faq.items[4].question**
We built it with AI. Are you going to tell us to throw it out?

**field: faq.items[4].answer**
No. Shipping fast was the right call and the code is fine. What I look at is what happens when people who aren't you start using it.

**field: faq.items[5].question**
What if we only need one small piece?

**field: faq.items[5].answer**
Then we scope one small piece. A single flow before a launch is a good reason to talk.

**field: faq.items[6].question**
How do we start?

**field: faq.items[6].answer**
Book a call. Bring the product, whatever you know about where people get stuck, and any deadline you're working against.

---

## 10. Testimonials

Hidden until real ones exist. Do not fill with placeholder quotes.

**field: testimonials.label**
What Founders Say

**field: testimonials.title**
In their words

---

## 11. Final CTA

**field: finalCta.label**
Next Step

**field: finalCta.title**
Let's talk.

**field: finalCta.body**
You show me what you have and I'll tell you what I think. If there's an opportunity to improve the design, the usability, or the overall experience, I'll say so on the call. Looking forward to making awesome things with you :)

**field: finalCta.primaryCta**
Book a free call

**field: finalCta.secondaryCta**
Email me

---

## Section nav labels

Left rail, `startupsSections`. These say what is in each section rather than
naming it in the abstract. `TODO(copy)`, drafts.

Why does this matter? · The problem · How I help · Services · Process · Case studies · About me · FAQ

---

## Open items

1. QR case study one-liner. Blank on the page until written.
2. FAQ pricing answer. Placeholder in place.
3. Comparison screenshots for section 2.
4. “Just fine” and *Same experience* sitting close together.

Done: booking URL is live at `cal.com/juanignacio/intro-call`, email goes to
juan@ignaciovergara.me, and the Design Foundation timeline reads Flexible.
