import {
  AnimatedSection,
  StaggerGroup,
  StaggerItem
} from "@/components/motion/animated-section";
import { CountUp } from "@/components/motion/count-up";
import { PageSection } from "@/components/visual/page-section";
import { SectionLabel } from "@/components/visual/section-label";
import { homeContent } from "@/content/home";

export function ImpactGrid() {
  return (
    <PageSection spacing="md">
      <AnimatedSection>
        <SectionLabel>{"Impact I've made"}</SectionLabel>
        <p className="type-body-large mt-6 max-w-2xl">
          {"Results from products I've worked on in enterprise settings."}
        </p>
      </AnimatedSection>

      <StaggerGroup className="mt-10 grid gap-10 md:grid-cols-3 md:gap-0" stagger={0.12}>
        {homeContent.impact.map((item, index) => (
          <StaggerItem
            key={item.metric}
            className={
              index === 0
                ? "md:pr-10"
                : "md:border-l-2 md:border-line md:pl-10 md:pr-10"
            }
          >
            <p className="type-impact-metric">
              <CountUp {...item.count} fallback={item.metric} />
            </p>
            <p className="type-body-small mt-3 italic text-muted">{item.product}</p>
            <p className="type-body mt-5">{item.body}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </PageSection>
  );
}
