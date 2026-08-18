import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/motion/animated-section";
import { Card } from "@/components/visual/card";
import { CTAButton } from "@/components/visual/cta-button";
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
          <p className="type-body-large mt-6 max-w-3xl">{builderLab.body}</p>
          <div className="mt-10">
            <CTAButton asChild>
              <Link href={builderLab.href}>
                {builderLab.cta} <ArrowRight aria-hidden="true" size={20} />
              </Link>
            </CTAButton>
          </div>
        </Card>
      </AnimatedSection>
    </PageSection>
  );
}
