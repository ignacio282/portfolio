import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/motion/animated-section";
import { Card } from "@/components/visual/card";
import { SectionLabel } from "@/components/visual/section-label";
import { SHOW_TESTIMONIALS, startupsContent } from "@/content/startups";

const { testimonials } = startupsContent;

export function StartupsTestimonials() {
  if (!SHOW_TESTIMONIALS || testimonials.items.length === 0) {
    return null;
  }

  return (
    <section className="layout-section-lg">
      <AnimatedSection>
        <SectionLabel>{testimonials.label}</SectionLabel>
        <h2 className="type-impact-heading mt-6">{testimonials.title}</h2>
      </AnimatedSection>

      <StaggerGroup className="mt-8 grid gap-5 md:grid-cols-2">
        {testimonials.items.map((item) => (
          <StaggerItem key={item.name} className="h-full">
            <Card className="flex h-full flex-col" padding="lg">
              <blockquote className="type-quote">{item.quote}</blockquote>
              <p className="type-body-small mt-6 text-muted">
                {item.name}, {item.role}
              </p>
            </Card>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
