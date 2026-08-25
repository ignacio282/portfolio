import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/motion/animated-section";
import { Card } from "@/components/visual/card";
import { PageSection } from "@/components/visual/page-section";
import { LinkedInIcon } from "@/components/visual/linkedin-icon";
import { SectionLabel } from "@/components/visual/section-label";
import { homeContent } from "@/content/home";
import { siteConfig } from "@/content/site";

export function AboutSection() {
  const { about } = homeContent;

  return (
    <PageSection id="about" spacing="lg">
      <AnimatedSection>
        <Card padding="lg">
          <SectionLabel variant="home">{about.label}</SectionLabel>
          <p className="type-body-large mt-3">{about.body}</p>
          {/* Links rather than buttons, matching the builder lab section: the
              solid buttons belong to the hero and the case studies. */}
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link className="ui-link-cta focus-ring" href={about.href}>
              {about.cta} <ArrowRight aria-hidden="true" size={20} />
            </Link>
            <Link
              className="ui-link-cta focus-ring"
              href={siteConfig.linkedinUrl}
              rel="noreferrer"
              target="_blank"
            >
              {about.linkedinCta} <LinkedInIcon />
            </Link>
          </div>
        </Card>
      </AnimatedSection>
    </PageSection>
  );
}
