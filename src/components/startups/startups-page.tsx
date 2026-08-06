import type { CSSProperties, ReactNode } from "react";
import { Fragment } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Check, Clock, PenTool, Search } from "lucide-react";
import { ProjectCardMedia } from "@/components/home/project-card-media";
import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/motion/animated-section";
import { StartupsDefaultsStrip } from "@/components/startups/startups-defaults-strip";
import { StartupsJourneyMap } from "@/components/startups/startups-journey-map";
import { StartupsPersonDiagram } from "@/components/startups/startups-person-diagram";
import { StartupsSectionNav } from "@/components/startups/startups-section-nav";
import { StartupsTestimonials } from "@/components/startups/startups-testimonials";
import { StartupsTimeline } from "@/components/startups/startups-timeline";
import { Card } from "@/components/visual/card";
import { CTAButton } from "@/components/visual/cta-button";
import { Disclosure } from "@/components/visual/disclosure";
import { InlineCTA } from "@/components/visual/inline-cta";
import { MediaFrame } from "@/components/visual/media-frame";
import { SectionLabel } from "@/components/visual/section-label";
import { projects } from "@/content/projects";
import {
  BOOKING_URL,
  EMAIL_URL,
  startupsContent,
  startupsSections
} from "@/content/startups";
import { cn } from "@/lib/cn";

const {
  hero,
  sameness,
  edgecases,
  bridge,
  offerings,
  process,
  work,
  bio,
  faq,
  finalCta
} = startupsContent;

const icons: Record<string, LucideIcon> = {
  search: Search,
  "pen-tool": PenTool
};

// Content strings mark emphasis with *asterisks* so the copy stays plain text.
function withEmphasis(text: string): ReactNode {
  return text.split(/\*([^*]+)\*/g).map((part, index) =>
    index % 2 === 1 ? <em key={part}>{part}</em> : <Fragment key={index}>{part}</Fragment>
  );
}

function BookingCTA({
  label,
  className,
  invert = false
}: {
  label: string;
  className?: string;
  invert?: boolean;
}) {
  return (
    <CTAButton
      className={cn(invert && "landing-cta-invert", className)}
      href={BOOKING_URL}
      rel="noreferrer"
      target="_blank"
    >
      {label} <ArrowRight aria-hidden="true" size={20} />
    </CTAButton>
  );
}

function EmailLink({ label, invert = false }: { label: string; invert?: boolean }) {
  return (
    <a
      className={cn("ui-pill-outline focus-ring", invert && "landing-pill-invert")}
      href={EMAIL_URL}
    >
      {label}
    </a>
  );
}

function CtaRow({
  primary,
  secondary,
  invert = false
}: {
  primary: string;
  secondary: string;
  invert?: boolean;
}) {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-4">
      <BookingCTA invert={invert} label={primary} />
      <EmailLink invert={invert} label={secondary} />
    </div>
  );
}

function LandingSection({
  id,
  children,
  className
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("layout-section-lg scroll-mt-24", className)} id={id}>
      {children}
    </section>
  );
}

// Every section runs in a single column: heading, then paragraphs, full width.
function SectionIntro({
  title,
  paragraphs
}: {
  title: string;
  paragraphs: string[];
}) {
  return (
    <AnimatedSection>
      <h2 className="type-impact-heading landing-heading-wrap">{withEmphasis(title)}</h2>
      {paragraphs.map((paragraph) => (
        <p className="type-body-large mt-8" key={paragraph}>
          {withEmphasis(paragraph)}
        </p>
      ))}
    </AnimatedSection>
  );
}

function BodyParagraph({ children }: { children: ReactNode }) {
  return (
    <AnimatedSection>
      <p className="type-body-large mt-8">{children}</p>
    </AnimatedSection>
  );
}

function StartupsHero() {
  return (
    <section className="layout-section-hero pb-8">
      <StaggerGroup className="grid gap-6" delayChildren={0.1} trigger="load">
        <StaggerItem>
          <SectionLabel variant="accent">{hero.label}</SectionLabel>
        </StaggerItem>
        <StaggerItem>
          <h1 className="type-display landing-heading-wrap">{hero.title}</h1>
        </StaggerItem>
        <StaggerItem>
          <p className="type-body-large text-muted">{hero.body}</p>
        </StaggerItem>
        <StaggerItem>
          <CtaRow primary={hero.primaryCta} secondary={hero.secondaryCta} />
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}

function SamenessVisual() {
  if (sameness.images.length === 0) {
    return null;
  }

  return (
    <>
      <StaggerGroup className="mt-16 grid gap-5 md:grid-cols-3">
        {sameness.images.map((image) => (
          <StaggerItem key={image.src}>
            <MediaFrame
              alt={image.alt}
              className="aspect-[16/10] w-full"
              sizes="(max-width: 768px) 92vw, 33vw"
              src={image.src}
            />
          </StaggerItem>
        ))}
      </StaggerGroup>
      <AnimatedSection>
        <p className="type-body-small mt-6 text-muted">{sameness.caption}</p>
      </AnimatedSection>
    </>
  );
}

function SamenessSection() {
  return (
    <LandingSection id="happening">
      <SectionIntro
        paragraphs={[sameness.body[0], sameness.body[1]]}
        title={sameness.title}
      />

      <div className="mt-12">
        <StartupsDefaultsStrip />
      </div>

      <AnimatedSection>
        <p className="type-section-title mt-8">{withEmphasis(sameness.defaults.footer)}</p>
      </AnimatedSection>

      <BodyParagraph>{withEmphasis(sameness.body[2])}</BodyParagraph>

      <SamenessVisual />
    </LandingSection>
  );
}

function EdgecasesSection() {
  return (
    <LandingSection id="next">
      <SectionIntro
        paragraphs={[edgecases.body[0], edgecases.body[1]]}
        title={edgecases.title}
      />

      <StartupsJourneyMap />

      <BodyParagraph>{withEmphasis(edgecases.body[2])}</BodyParagraph>
      <BodyParagraph>{withEmphasis(edgecases.body[3])}</BodyParagraph>
    </LandingSection>
  );
}

function BridgeSection() {
  return (
    <LandingSection id="approach">
      <SectionIntro paragraphs={[bridge.body[0]]} title={bridge.title} />

      <StartupsPersonDiagram />

      <BodyParagraph>{withEmphasis(bridge.body[1])}</BodyParagraph>
      <BodyParagraph>{withEmphasis(bridge.body[2])}</BodyParagraph>
    </LandingSection>
  );
}

function OfferingGrid() {
  return (
    <LandingSection id="offerings">
      <SectionIntro paragraphs={[offerings.intro]} title={offerings.title} />

      <StaggerGroup className="mt-10 grid gap-5 md:grid-cols-2">
        {offerings.items.map((item) => {
          const Icon = icons[item.icon];

          return (
            <StaggerItem className="h-full" key={item.name}>
              <Card className="landing-offering-card" padding="lg">
                <span className="landing-icon-badge landing-icon-badge-lg">
                  <Icon aria-hidden="true" size={24} />
                </span>
                <h3 className="type-section-title mt-8">{item.name}</h3>
                <p className="type-body mt-4">{item.description}</p>

                <div className="case-rule mt-8 pt-8">
                  <SectionLabel>{item.includesLabel}</SectionLabel>
                  <ul className="mt-5 grid gap-3">
                    {item.includes.map((entry) => (
                      <li className="landing-includes-item" key={entry}>
                        <Check
                          aria-hidden="true"
                          className="mt-1 shrink-0 text-teal"
                          size={18}
                        />
                        <span className="type-body">{entry}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="type-body-small mt-auto flex items-center gap-2 pt-8 text-muted">
                  <Clock aria-hidden="true" size={16} />
                  {item.timeline}
                </p>
              </Card>
            </StaggerItem>
          );
        })}
      </StaggerGroup>

      <AnimatedSection>
        <p className="type-body-small mt-8 text-muted">{offerings.scopeNote}</p>
        <BookingCTA className="mt-8" label={offerings.cta} />
      </AnimatedSection>
    </LandingSection>
  );
}

function ProcessSteps() {
  return (
    <LandingSection id="process">
      <AnimatedSection>
        <h2 className="type-impact-heading landing-heading-wrap">{process.title}</h2>
      </AnimatedSection>
      <div className="mt-12">
        <StartupsTimeline steps={process.steps} />
      </div>
    </LandingSection>
  );
}

function SelectedWork() {
  return (
    <LandingSection id="work">
      <AnimatedSection>
        <h2 className="type-impact-heading landing-heading-wrap">{work.title}</h2>
      </AnimatedSection>

      <StaggerGroup className="mt-10 grid gap-8">
        {projects.map((project, index) => (
          <StaggerItem key={project.slug}>
            <Link
              className="surface-link-card project-card group grid gap-5 p-4 md:grid-cols-[420px_1fr] md:items-center md:gap-6 md:p-5"
              href={`/projects/${project.slug}`}
              style={
                {
                  "--project-hover-tint": project.hoverTint ?? "#f4f0ea",
                  "--project-accent": project.accent
                } as CSSProperties
              }
            >
              <ProjectCardMedia priority={index === 0} project={project} />
              <div className="px-1 py-4 md:px-4">
                <h3 className="type-home-title">{project.title}</h3>
                <p className="type-body-large mt-6">
                  {work.framings[project.slug] || project.summary}
                </p>
                <InlineCTA>{work.cta}</InlineCTA>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </LandingSection>
  );
}

function BioSection() {
  return (
    <LandingSection id="about">
      <AnimatedSection>
        <div className="layout-text-pair-balanced">
          <div>
            <h2 className="type-impact-heading landing-heading-wrap">{bio.title}</h2>
            <div className="mt-8 grid gap-5">
              {bio.body.map((paragraph) => (
                <p className="type-body-large" key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <MediaFrame
            alt={bio.imageAlt}
            className="aspect-[4/3] w-full"
            sizes="(max-width: 768px) 92vw, 560px"
            src={bio.image}
          />
        </div>
      </AnimatedSection>
    </LandingSection>
  );
}

function FaqList() {
  return (
    <LandingSection id="faq">
      <AnimatedSection>
        <h2 className="type-impact-heading landing-heading-wrap">{faq.title}</h2>
        <div className="mt-10">
          {faq.items.map((item, index) => (
            <Disclosure
              defaultOpen={index === 0}
              key={item.question}
              title={item.question}
            >
              <p className="type-body text-muted">{item.answer}</p>
            </Disclosure>
          ))}
        </div>
      </AnimatedSection>
    </LandingSection>
  );
}

function FinalCta() {
  return (
    <section className="layout-section-lg">
      <AnimatedSection className="landing-final-cta">
        <h2 className="type-impact-heading landing-heading-wrap">{finalCta.title}</h2>
        <p className="type-body-large mt-8">{finalCta.body}</p>
        <CtaRow
          invert
          primary={finalCta.primaryCta}
          secondary={finalCta.secondaryCta}
        />
      </AnimatedSection>
    </section>
  );
}

export function StartupsPage() {
  return (
    <main className="landing-page-root">
      <div className="landing-shell">
        <StartupsSectionNav sections={startupsSections} />
        <div>
          <StartupsHero />
          <SamenessSection />
          <EdgecasesSection />
          <BridgeSection />
          <OfferingGrid />
          <ProcessSteps />
          <SelectedWork />
          <BioSection />
          <FaqList />
          <StartupsTestimonials />
          <FinalCta />
        </div>
      </div>
    </main>
  );
}
