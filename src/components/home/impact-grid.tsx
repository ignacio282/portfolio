import {
  AnimatedSection,
  StaggerGroup,
  StaggerItem
} from "@/components/motion/animated-section";
import { CountUp } from "@/components/motion/count-up";
import { Card } from "@/components/visual/card";
import { PageSection } from "@/components/visual/page-section";
import { SectionLabel } from "@/components/visual/section-label";
import { homeContent } from "@/content/home";

export function ImpactGrid() {
  return (
    <PageSection spacing="md">
      <AnimatedSection>
        <SectionLabel>{"Impact I've made"}</SectionLabel>
        <p className="type-body-large mt-6">
          {"Results from products I've worked on in enterprise settings."}
        </p>
      </AnimatedSection>

      <StaggerGroup className="mt-10 grid gap-5 md:grid-cols-3" stagger={0.12}>
        {homeContent.impact.map((item) => (
          <StaggerItem key={item.metric}>
            <Card className="h-full" padding="md">
              <p className="type-impact-metric">
                <CountUp {...item.count} fallback={item.metric} />
              </p>
              <p className="type-body-small mt-3 italic text-muted">{item.product}</p>
              <p className="type-body mt-5">{item.body}</p>
            </Card>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </PageSection>
  );
}
