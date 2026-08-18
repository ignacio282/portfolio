import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/motion/animated-section";
import { MediaFrame } from "@/components/visual/media-frame";
import { PageSection } from "@/components/visual/page-section";
import { SectionLabel } from "@/components/visual/section-label";
import { AboutProcess } from "./about-process";
import { AboutStory } from "./about-story";
import { AboutValues } from "./about-values";
import { ExperienceTimeline } from "./experience-timeline";
import { aboutContent } from "@/content/about";

const { experience, values, process, beyond, gallery } = aboutContent;

export function AboutPage() {
  return (
    <main>
      <AboutStory />

      <PageSection spacing="lg">
        <AnimatedSection>
          <SectionLabel variant="accent">{experience.label}</SectionLabel>
          <h2 className="type-section-title mt-3">{experience.title}</h2>
          <p className="type-body-large mt-4">{experience.intro}</p>
        </AnimatedSection>
        <AnimatedSection className="mt-10">
          <ExperienceTimeline entries={experience.entries} />
        </AnimatedSection>
      </PageSection>

      <PageSection spacing="lg">
        <AnimatedSection>
          <SectionLabel variant="accent">{values.label}</SectionLabel>
          <h2 className="type-section-title mt-3">{values.title}</h2>
        </AnimatedSection>
        <AboutValues items={values.items} />
      </PageSection>

      <PageSection spacing="lg">
        <AnimatedSection>
          <SectionLabel variant="accent">{process.label}</SectionLabel>
          <h2 className="type-section-title mt-3">{process.title}</h2>
          <p className="type-body-large mt-4">{process.intro}</p>
        </AnimatedSection>
        <div className="mt-12">
          <AboutProcess steps={process.steps} />
        </div>
      </PageSection>

      <PageSection className="pb-24" spacing="lg">
        <AnimatedSection>
          <h2 className="type-section-title">{beyond.title}</h2>
          <p className="type-body-large mt-4">{beyond.body}</p>
        </AnimatedSection>
        <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.map((image) => (
            <StaggerItem key={image.src}>
              <MediaFrame
                alt={image.alt}
                className="aspect-square"
                radius="md"
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 309px"
                src={image.src}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </PageSection>
    </main>
  );
}
