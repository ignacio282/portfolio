# /startups — page copy

Working document. Rewrite anything here in your own voice, hand it back, and I'll
map it into `src/content/startups.ts`. The `field:` labels are the keys in that
file, so keep them where they are and change only the text under them.

Two things that are not copy decisions:

- `TODO(confirm)` marks a claim I invented and you need to verify or replace.
- Testimonials stay empty until you have real ones.

---

## Metadata (the LinkedIn preview card)

**field: page title**
Design Help for Early-Stage Founders

**field: page description**
Products built fast tend to end up with the same interface. Product design audits and interface redesign for early-stage startups, built around what your team already shipped.

**field: OG card eyebrow**
For Founders

**field: OG card headline**
You built something real. The interface is underselling it.

**field: OG card footer**
Ignacio Vergara, product designer

---

## 1. Hero

**field: hero.label** (eyebrow, Title Case)
For Founders

**field: hero.title**
You built something real. The interface is underselling it.

**field: hero.body**
Getting a working product out is the hard part, and you did it. What usually lags behind is the surface: the screens people actually meet, which tend to end up wherever the tooling and the schedule left them. That part I can take off your hands.

**field: hero.primaryCta** / **hero.secondaryCta** (button labels, Title Case)
Book a Call / Email Me

---

## 2. The pattern

**field: problem.label**
What I Keep Seeing

**field: problem.title**
AI can build your product. It hands everyone the same interface.

**field: problem.paragraphs[0]**
Open five products built with the same tools in the same year and you will meet the same sidebar, the same card grid, the same empty state with a centered icon. The output is competent. It is also interchangeable, which is awkward when the product is the thing that has to stand out.

**field: problem.paragraphs[1]**
The bigger cost is quieter. Those defaults are shaped by what is easy to generate, not by what your users are trying to do, so the screens carry no sense of priority. Everything is the same size and the same weight, and people have to work out on their own what matters.

**field: problem.paragraphs[2]**
This may not be happening to you. The only way to know is to look at the product with someone whose job is noticing it.

---

## 3. Comparison strip

Hidden until you add screenshots to `public/images/startups/` and list them in
`comparison.images`. Around 16/10 works best.

**field: comparison.label**
Sameness

**field: comparison.title**
Different companies, same product

**field: comparison.caption**
Four dashboards from four unrelated products, all built fast with the same generation of tools.

---

## 4. What it costs

**field: costs.label**
Why It Matters

**field: costs.title**
What a default interface quietly costs you

**field: costs.items[0].title** — Demos that need narration
**field: costs.items[0].body**
You talk over your own product, explaining what each screen is for. People remember the explanation and not the product.

**field: costs.items[1].title** — Users who never reach the good part
**field: costs.items[1].body**
Signup, setup, and first real use are where people decide. If the path there has friction, they leave before your product gets a chance to be useful.

**field: costs.items[2].title** — Investors reading the surface
**field: costs.items[2].body**
Polish is the fastest proxy investors have for how carefully a team works. A generic interface makes a serious product look early.

**field: costs.items[3].title** — Support answering the same question
**field: costs.items[3].body**
Every unclear screen becomes a message someone on your team has to answer, again, for the rest of the product's life.

**field: costs.items[4].title** — Engineering rebuilding the same screen
**field: costs.items[4].body**
With no shared patterns, the same component gets built slightly differently each time. You pay for that in review cycles and in every change that comes after.

---

## 5. What I do

**field: offerings.label**
What I Do

**field: offerings.title**
Two ways to start

### Offering 1 — TODO(confirm): name, inclusions, timeline

**field: offerings.items[0].name**
Product Design Audit

**field: offerings.items[0].description**
A structured review of your product the way your users meet it, from the first visit to the moment it becomes useful. You get specific problems, ranked by what they cost you, and a sensible order to fix them in.

**field: offerings.items[0].includes**
- A walkthrough of your live product, end to end
- A written list of issues, prioritized by impact
- Annotated screens showing what to change and why
- A working session to go through all of it with your team

**field: offerings.items[0].timeline**
Usually one to two weeks

### Offering 2 — TODO(confirm): name, inclusions, timeline

**field: offerings.items[1].name**
Interface Redesign

**field: offerings.items[1].description**
Hands-on design work on the parts of your product that carry the most weight, like onboarding, the core flow, and the screens you put in front of investors. You get designs your team can build from and the patterns to stay consistent as you add more.

**field: offerings.items[1].includes**
- Everything in the audit
- Redesigned flows for the areas we agree matter most
- Build-ready screens in Figma, responsive states included
- A small set of reusable components and rules
- Time with your engineers while it gets built

**field: offerings.items[1].timeline**
Usually three to six weeks, depending on scope

**field: offerings.scopeNote**
Every team is at a different point, so I scope each engagement around what you are actually dealing with. If neither of these is quite the shape you need, say so on the call and we will work out something that fits.

---

## 6. How we'd work

**field: process.label**
How We'd Work

**field: process.title**
Four steps, no mystery

**field: process.steps[0].title** — A call
**field: process.steps[0].body**
Thirty minutes. You show me the product and tell me where it hurts. I tell you honestly whether design is the thing that will help and what I would look at first.

**field: process.steps[1].title** — A scope we agree on
**field: process.steps[1].body**
I write up what I would do, what you get, and how long it takes. Nothing starts until that shape is right.

**field: process.steps[2].title** — The work
**field: process.steps[2].body**
I go deep on your product and share progress as it happens instead of saving it for one big reveal. You can react early, while changing direction is still cheap.

**field: process.steps[3].title** — A handoff that sticks
**field: process.steps[3].body**
We walk your engineers through everything, and I stay reachable while it gets built. Questions come up during implementation, and answering them is part of the job.

---

## 7. Selected work

Titles and images come from `src/content/projects.ts`. Only these one-liners are
written for founders.

**field: work.label**
Selected Work

**field: work.title**
Products where the interface had to carry real weight

**field: work.framings.portal**
A banking site used by four million people, rebuilt so visitors could find what they came for. Bounce rate dropped 12%.

**field: work.framings.reading**
An AI product where the hard part was deciding what the model should not do for the user.

**field: work.framings.qr**
A money transfer reduced to a single screen, inside a market with rules about every step of it.

---

## 8. Who I am

**field: bio.label**
Who I Am

**field: bio.title**
Ignacio Vergara

**field: bio.paragraphs[0]**
I'm a product designer. For the past four years I have worked on enterprise banking products, the kind with millions of users and a long list of rules about what can and cannot change. I designed the website flow that cut bounce rate by 12% on a site serving over two million people, and helped take corporate account opening from 21 days down to 7.

**field: bio.paragraphs[1]**
Designing inside constraints like those turns out to be good preparation for early-stage products. Both come down to the same question: what is genuinely in the way, and what is the smallest change that removes it.

**field: bio.personalNote**
Outside of work I build things for myself most weekends, usually with more enthusiasm than planning. I read a lot of sci-fi and fantasy, I have opinions about ramen, and I will happily trade anime recommendations.

---

## 9. FAQ

TODO(confirm): every answer here describes how you work. Check each one against
reality, especially pricing.

**field: faq.label**
Questions

**field: faq.title**
Before you book

**field: faq.items[0].question** — How much does this cost?
**field: faq.items[0].answer**
It depends on scope, and a range this early would not mean much. After the first call I send a written scope with a price attached, so you know the number before you commit to anything.

**field: faq.items[1].question** — We don't have a designer. Is that a problem?
**field: faq.items[1].answer**
No, and most teams I talk to don't have one. I work directly with founders and engineers, and I write things down so your team can act on them without a designer in the middle.

**field: faq.items[2].question** — Will this slow my engineers down?
**field: faq.items[2].answer**
It shouldn't. I work ahead of the build rather than in the middle of it, and I hand over designs with the detail engineers need, which usually means less guessing during implementation.

**field: faq.items[3].question** — Can you work with what we already have?
**field: faq.items[3].answer**
Yes, and usually that is the point. I design around your existing stack and components instead of handing you something that would mean starting over.

**field: faq.items[4].question** — What if we only need one small piece of this?
**field: faq.items[4].answer**
Then we scope one small piece. Some teams need a single flow fixed before a launch. That is a good reason to talk.

**field: faq.items[5].question** — How do we start?
**field: faq.items[5].answer**
Book a call. Bring the product, whatever you know about where people get stuck, and any deadline you are working against.

---

## 10. Testimonials (hidden)

**field: testimonials.label** — What Founders Say
**field: testimonials.title** — In their words

Empty on purpose. Add real quotes to `testimonials.items` and flip
`SHOW_TESTIMONIALS` to `true`.

---

## 11. Final CTA

**field: finalCta.label**
Next Step

**field: finalCta.title**
Show me what you built.

**field: finalCta.body**
Thirty minutes, your screen shared, no preparation needed. If design is not what your product needs right now, I will say so on the call.

**field: finalCta.primaryCta** / **finalCta.secondaryCta**
Book a Call / Email Me

---

## Section nav labels

Short labels for the left rail. `startupsSections` in the same file.

The Pattern · What It Costs · What I Do · How We'd Work · Selected Work · Who I Am · Questions
