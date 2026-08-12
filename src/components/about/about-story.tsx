import { ArrowRight, Download } from "lucide-react";
import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/motion/animated-section";
import { Card } from "@/components/visual/card";
import { CTAButton } from "@/components/visual/cta-button";
import { MediaFrame } from "@/components/visual/media-frame";
import { PageSection } from "@/components/visual/page-section";
import { SectionLabel } from "@/components/visual/section-label";
import { aboutContent } from "@/content/about";
import { siteConfig } from "@/content/site";

const { hero, story, education } = aboutContent;

export function AboutStory() {
  return (
    <PageSection className="pt-32 md:pt-36">
      {/* The story spans both rows, so it sets the row height; the education
          block then parks itself against the bottom of that height, level with
          the last paragraph. On a phone this collapses to one column and the
          photo is pulled to the front. */}
      <div className="grid gap-8 md:grid-cols-[1fr_460px] md:grid-rows-[auto_1fr] md:gap-x-12">
        <AnimatedSection className="order-first md:col-start-2 md:row-start-1" delay={0.15}>
          <MediaFrame
            alt={hero.imageAlt}
            className="aspect-[0.9/1]"
            priority
            radius="lg"
            sizes="(max-width: 768px) 92vw, 460px"
            src={hero.image}
          />
        </AnimatedSection>

        <div className="md:col-start-1 md:row-span-2 md:row-start-1">
          <AnimatedSection>
            <h1 className="type-display">{hero.title}</h1>
          </AnimatedSection>

          {/* Each beat gets its own reveal rather than a shared stagger, so the
              story lands a paragraph at a time as you read down it. */}
          <div className="mt-8 grid max-w-2xl gap-6">
            {story.beats.map((beat) => (
              <AnimatedSection key={beat.id}>
                <p className="type-body-large">{beat.body}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>

        <div className="md:col-start-2 md:row-start-2 md:self-end">
          <AnimatedSection>
            <SectionLabel variant="accent">{education.label}</SectionLabel>
          </AnimatedSection>
          <StaggerGroup className="mt-4 grid gap-4">
            {education.items.map((item) => (
              <StaggerItem key={item.degree}>
                <Card className="border border-line" padding="md">
                  <h2 className="type-card-title">{item.degree}</h2>
                  <p className="type-body-small mt-2 text-muted">
                    {item.year ? `${item.school} · ${item.year}` : item.school}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>

      <AnimatedSection className="mt-12">
        <div className="flex flex-wrap items-center gap-4">
          <CTAButton href={siteConfig.linkedinUrl} rel="noreferrer" target="_blank">
            Let&rsquo;s Connect <ArrowRight aria-hidden="true" size={20} />
          </CTAButton>
          <CTAButton
            href={siteConfig.resumeDownloadUrl}
            rel="noreferrer"
            target="_blank"
            variant="outline"
          >
            Download My Resume <Download aria-hidden="true" size={20} />
          </CTAButton>
        </div>
      </AnimatedSection>
    </PageSection>
  );
}
