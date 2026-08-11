import Link from "next/link";
import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/motion/animated-section";
import { InlineCTA } from "@/components/visual/inline-cta";
import { MediaFrame } from "@/components/visual/media-frame";
import { PageSection } from "@/components/visual/page-section";
import { SectionLabel } from "@/components/visual/section-label";
import { projects } from "@/content/projects";

export function ProjectIndex() {
  return (
    <main>
      <PageSection spacing="hero">
        <AnimatedSection>
          <SectionLabel variant="accent">Work / Projects</SectionLabel>
          <h1 className="type-display mt-6 max-w-5xl">
            Case studies about product design in real systems.
          </h1>
        </AnimatedSection>
        <StaggerGroup className="mt-12 grid gap-8">
          {projects.map((project) => (
            <StaggerItem key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="surface-link-card group grid gap-8 p-4 md:grid-cols-[380px_1fr] md:items-center md:p-6"
              >
                <MediaFrame
                  src={project.image}
                  alt={project.imageAlt}
                  className="aspect-[1.5/1]"
                  sizes="(max-width: 768px) 92vw, 380px"
                />
                <div className="p-2 md:p-6">
                  <h2 className="type-card-title">{project.title}</h2>
                  <p className="type-body-large mt-5">{project.summary}</p>
                  <InlineCTA>Read case study</InlineCTA>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </PageSection>
    </main>
  );
}
