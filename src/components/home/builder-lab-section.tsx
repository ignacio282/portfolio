import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/motion/animated-section";
import { Card } from "@/components/visual/card";
import { PageSection } from "@/components/visual/page-section";
import { SectionLabel } from "@/components/visual/section-label";
import { homeContent } from "@/content/home";

export function BuilderLabSection() {
  const { builderLab } = homeContent;

  return (
    <PageSection id="builder-lab" spacing="lg">
      <AnimatedSection>
        <Card padding="lg">
          <SectionLabel variant="home">{builderLab.label}</SectionLabel>
          <p className="type-body-large mt-6">{builderLab.body}</p>
          {/* A link rather than a button: the solid buttons belong to the case
              studies, and this section should not pull against them. */}
          <div className="mt-8">
            <Link className="ui-link-cta focus-ring" href={builderLab.href}>
              {builderLab.cta} <ArrowRight aria-hidden="true" size={20} />
            </Link>
          </div>
        </Card>
      </AnimatedSection>
    </PageSection>
  );
}
