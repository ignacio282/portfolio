import Link from "next/link";
import { StaggerGroup, StaggerItem } from "@/components/motion/animated-section";
import { InlineCTA } from "@/components/visual/inline-cta";
import { PageSection } from "@/components/visual/page-section";
import { SectionLabel } from "@/components/visual/section-label";
import { homeContent } from "@/content/home";
import { ProjectCardMedia } from "./project-card-media";

const projectSectionDelay = 1.95;

export function ProjectCardList() {
  return (
    <PageSection id="case-studies" spacing="lg">
      <StaggerGroup
        delayChildren={projectSectionDelay}
        stagger={0.12}
        trigger="load"
      >
        <StaggerItem>
          <SectionLabel variant="home">Case studies</SectionLabel>
        </StaggerItem>
        <div className="mt-10 grid gap-8">
          {homeContent.projects.map((project, index) => (
            <StaggerItem key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="surface-link-card project-card group grid gap-5 p-4 md:grid-cols-[420px_1fr] md:items-center md:gap-6 md:p-5"
                style={{
                  "--project-hover-tint": project.hoverTint ?? "#f4f0ea",
                  "--project-accent": project.accent
                } as React.CSSProperties}
              >
                <ProjectCardMedia project={project} priority={index === 0} />
                <div className="px-1 py-4 md:px-4">
                  <h3 className="type-home-title">
                    {project.title}
                  </h3>
                  <p className="type-body-large mt-6 max-w-2xl">{project.summary}</p>
                  <InlineCTA>Read Case Study</InlineCTA>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </div>
      </StaggerGroup>
    </PageSection>
  );
}
