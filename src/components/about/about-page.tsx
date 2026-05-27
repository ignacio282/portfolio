import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/motion/animated-section";
import { CTAButton } from "@/components/visual/cta-button";
import { MediaFrame } from "@/components/visual/media-frame";
import { PageSection } from "@/components/visual/page-section";
import { aboutContent } from "@/content/about";
import { siteConfig } from "@/content/site";

export function AboutPage() {
  return (
    <main>
      <PageSection className="grid min-h-[720px] items-center gap-12 pt-32 md:grid-cols-[1fr_550px] md:pt-36">
        <StaggerGroup>
          <StaggerItem>
            <h1 className="type-display">
              {aboutContent.hero.title}
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="type-body-large mt-6 max-w-2xl">{aboutContent.hero.body}</p>
          </StaggerItem>
          <StaggerItem>
            <h2 className="type-section-title mt-10">
              {aboutContent.designer.title}
            </h2>
            <p className="type-body mt-5 max-w-2xl">{aboutContent.designer.body}</p>
          </StaggerItem>
          <StaggerItem>
            <CTAButton asChild className="mt-8">
              <Link href={siteConfig.contactUrl}>
                Let&rsquo;s Connect <ArrowRight aria-hidden="true" size={20} />
              </Link>
            </CTAButton>
          </StaggerItem>
        </StaggerGroup>
        <AnimatedSection delay={0.15}>
          <MediaFrame
            src={aboutContent.hero.image}
            alt={aboutContent.hero.imageAlt}
            className="aspect-[0.9/1]"
            radius="lg"
            priority
            sizes="(max-width: 768px) 92vw, 550px"
          />
        </AnimatedSection>
      </PageSection>
      <PageSection className="pb-24">
        <AnimatedSection>
          <h2 className="type-section-title">{aboutContent.beyond.title}</h2>
          <p className="type-body-large mt-4 max-w-5xl">{aboutContent.beyond.body}</p>
        </AnimatedSection>
        <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {aboutContent.gallery.map((image) => (
            <StaggerItem key={image.src}>
              <MediaFrame
                src={image.src}
                alt={image.alt}
                className="aspect-[1/1]"
                radius="md"
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 309px"
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </PageSection>
    </main>
  );
}
