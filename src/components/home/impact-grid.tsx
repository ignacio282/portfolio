import {
  AnimatedSection,
  StaggerGroup,
  StaggerItem
} from "@/components/motion/animated-section";
import { Card } from "@/components/visual/card";
import { PageSection } from "@/components/visual/page-section";
import { SectionLabel } from "@/components/visual/section-label";
import { homeContent } from "@/content/home";

const impactSectionDelay = 1.05;
const impactCardsDelay = 1.36;

export function ImpactGrid() {
  return (
    <PageSection spacing="md">
      <AnimatedSection delay={impactSectionDelay}>
        <SectionLabel>{"Impact I've made"}</SectionLabel>
        <p className="type-body-large mt-6 max-w-2xl">
          {"Results from products I've worked on in enterprise settings."}
        </p>
      </AnimatedSection>

      <StaggerGroup
        className="mt-8 grid gap-5 md:grid-cols-3"
        delayChildren={impactCardsDelay}
        stagger={0.12}
      >
        {homeContent.impact.map((item) => (
          <StaggerItem key={item.value}>
            <Card className="min-h-40" padding="md">
              <p className="type-impact-metric">{item.value}</p>
              <p className="type-body mt-4">{item.label}</p>
            </Card>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </PageSection>
  );
}
