import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/motion/animated-section";
import { StartupsTestimonials } from "@/components/startups/startups-testimonials";
import { Card } from "@/components/visual/card";
import { CTAButton } from "@/components/visual/cta-button";
import { InlineCTA } from "@/components/visual/inline-cta";
import { MediaFrame } from "@/components/visual/media-frame";
import { PageSection } from "@/components/visual/page-section";
import { SectionLabel } from "@/components/visual/section-label";
import { projects } from "@/content/projects";
import { BOOKING_URL, EMAIL_URL, startupsContent } from "@/content/startups";
import { cn } from "@/lib/cn";

const { hero, problem, costs, offerings, process, work, bio, faq, finalCta } = startupsContent;

function BookingCTA({ label, className }: { label: string; className?: string }) {
  return (
    <CTAButton className={className} href={BOOKING_URL} rel="noreferrer" target="_blank">
      {label} <ArrowRight aria-hidden="true" size={20} />
    </CTAButton>
  );
}

function EmailLink({ label }: { label: string }) {
  return (
    <a className="ui-pill-outline focus-ring" href={EMAIL_URL}>
      {label}
    </a>
  );
}

function StartupsHero() {
  return (
    <PageSection spacing="hero">
      <AnimatedSection>
        <SectionLabel variant="accent">{hero.label}</SectionLabel>
        <h1 className="type-display mt-6 max-w-4xl">{hero.title}</h1>
        <p className="type-body-large mt-6 max-w-2xl text-muted">{hero.body}</p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <BookingCTA label={hero.primaryCta} />
          <EmailLink label={hero.secondaryCta} />
        </div>
      </AnimatedSection>
    </PageSection>
  );
}

function ProblemSection() {
  return (
    <PageSection spacing="lg">
      <AnimatedSection>
        <SectionLabel>{problem.label}</SectionLabel>
        <h2 className="type-impact-heading mt-6 max-w-3xl">{problem.title}</h2>
        <div className="mt-6 grid max-w-3xl gap-5">
          {problem.paragraphs.map((paragraph) => (
            <p className="type-body-large" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </AnimatedSection>
    </PageSection>
  );
}

function CostGrid() {
  return (
    <PageSection spacing="lg">
      <AnimatedSection>
        <SectionLabel>{costs.label}</SectionLabel>
        <h2 className="type-impact-heading mt-6 max-w-3xl">{costs.title}</h2>
      </AnimatedSection>

      <StaggerGroup className="mt-8 grid gap-5 md:grid-cols-3">
        {costs.items.map((item) => (
          <StaggerItem className="h-full" key={item.title}>
            <Card className="h-full" padding="md">
              <h3 className="type-small-title">{item.title}</h3>
              <p className="type-body mt-4">{item.body}</p>
            </Card>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </PageSection>
  );
}

function OfferingGrid() {
  return (
    <PageSection spacing="lg">
      <AnimatedSection>
        <SectionLabel>{offerings.label}</SectionLabel>
        <h2 className="type-impact-heading mt-6 max-w-3xl">{offerings.title}</h2>
      </AnimatedSection>

      <StaggerGroup className="mt-8 grid gap-5 md:grid-cols-2">
        {offerings.items.map((item) => (
          <StaggerItem className="h-full" key={item.name}>
            <Card className="flex h-full flex-col" padding="lg">
              <h3 className="type-card-title">{item.name}</h3>
              <p className="type-body mt-4">{item.description}</p>
              <SectionLabel className="mt-8">{item.includesLabel}</SectionLabel>
              <ul className="type-body mt-4 list-disc space-y-2 pl-5">
                {item.includes.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
              <p className="type-body-small mt-8 text-muted">{item.timeline}</p>
            </Card>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <AnimatedSection>
        <p className="type-body-small mt-8 max-w-2xl text-muted">{offerings.scopeNote}</p>
        <BookingCTA className="mt-8" label={offerings.cta} />
      </AnimatedSection>
    </PageSection>
  );
}

function ProcessSteps() {
  return (
    <PageSection spacing="lg">
      <AnimatedSection>
        <SectionLabel>{process.label}</SectionLabel>
        <h2 className="type-impact-heading mt-6 max-w-3xl">{process.title}</h2>
        <ol className="mt-8 grid gap-5 md:grid-cols-4">
          {process.steps.map((step, index) => (
            <li key={step.title}>
              <Card className="h-full" padding="md">
                <p className="type-index-marker">{index + 1}</p>
                <h3 className="type-small-title mt-6">{step.title}</h3>
                <p className="type-body mt-4">{step.body}</p>
              </Card>
            </li>
          ))}
        </ol>
      </AnimatedSection>
    </PageSection>
  );
}

function SelectedWork() {
  return (
    <PageSection spacing="lg">
      <AnimatedSection>
        <SectionLabel>{work.label}</SectionLabel>
        <h2 className="type-impact-heading mt-6 max-w-3xl">{work.title}</h2>
      </AnimatedSection>

      <StaggerGroup className="mt-8 grid gap-8">
        {projects.map((project) => (
          <StaggerItem key={project.slug}>
            <Link
              className="surface-link-card group grid gap-8 p-4 md:grid-cols-[380px_1fr] md:items-center md:p-6"
              href={`/projects/${project.slug}`}
            >
              <MediaFrame
                alt={project.imageAlt}
                className="aspect-[1.5/1]"
                sizes="(max-width: 768px) 92vw, 380px"
                src={project.image}
              />
              <div className="p-2 md:p-6">
                <h3 className="type-card-title">{project.title}</h3>
                <p className="type-body-large mt-5">
                  {work.framings[project.slug] ?? project.summary}
                </p>
                <InlineCTA>{work.cta}</InlineCTA>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </PageSection>
  );
}

function BioSection() {
  return (
    <PageSection spacing="lg">
      <AnimatedSection>
        <SectionLabel>{bio.label}</SectionLabel>
        <div className="layout-text-pair-balanced mt-6">
          <div>
            <h2 className="type-impact-heading">{bio.title}</h2>
            <div className="mt-6 grid gap-5">
              {bio.paragraphs.map((paragraph) => (
                <p className="type-body-large" key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
            <p className="type-body mt-6 text-muted">{bio.personalNote}</p>
          </div>
          <MediaFrame
            alt={bio.imageAlt}
            className="aspect-[4/3] w-full"
            sizes="(max-width: 768px) 92vw, 560px"
            src={bio.image}
          />
        </div>
      </AnimatedSection>
    </PageSection>
  );
}

function FaqList() {
  return (
    <PageSection spacing="lg">
      <AnimatedSection>
        <SectionLabel>{faq.label}</SectionLabel>
        <h2 className="type-impact-heading mt-6 max-w-3xl">{faq.title}</h2>
        <div className="mt-8 max-w-3xl">
          {faq.items.map((item, index) => (
            <div className={cn(index > 0 && "case-rule mt-8 pt-8")} key={item.question}>
              <h3 className="type-small-title">{item.question}</h3>
              <p className="type-body mt-3 text-muted">{item.answer}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </PageSection>
  );
}

function FinalCta() {
  return (
    <PageSection spacing="lg">
      <AnimatedSection>
        <SectionLabel>{finalCta.label}</SectionLabel>
        <h2 className="type-impact-heading mt-6 max-w-3xl">{finalCta.title}</h2>
        <p className="type-body-large mt-6 max-w-2xl text-muted">{finalCta.body}</p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <BookingCTA label={finalCta.primaryCta} />
          <EmailLink label={finalCta.secondaryCta} />
        </div>
      </AnimatedSection>
    </PageSection>
  );
}

export function StartupsPage() {
  return (
    <main className="landing-page-root">
      <StartupsHero />
      <ProblemSection />
      <CostGrid />
      <OfferingGrid />
      <ProcessSteps />
      <SelectedWork />
      <BioSection />
      <FaqList />
      <StartupsTestimonials />
      <FinalCta />
    </main>
  );
}
