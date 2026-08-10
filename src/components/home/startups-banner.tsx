import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/motion/animated-section";
import { CTAButton } from "@/components/visual/cta-button";
import { PageSection } from "@/components/visual/page-section";
import { homeContent } from "@/content/home";

const { startupsBanner } = homeContent;

export function StartupsBanner() {
  return (
    <PageSection spacing="lg">
      <AnimatedSection amount={0.08} className="landing-final-cta">
        <h2 className="type-impact-heading landing-heading-wrap">
          {startupsBanner.title}
        </h2>
        <p className="type-body-large mt-8">{startupsBanner.body}</p>
        <div className="mt-10">
          <CTAButton asChild className="landing-cta-invert">
            <Link href={startupsBanner.href}>
              {startupsBanner.cta} <ArrowRight aria-hidden="true" size={20} />
            </Link>
          </CTAButton>
        </div>
      </AnimatedSection>
    </PageSection>
  );
}
