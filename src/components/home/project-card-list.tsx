import Link from "next/link";
import { StaggerGroup, StaggerItem } from "@/components/motion/animated-section";
import { InlineCTA } from "@/components/visual/inline-cta";
import { PageSection } from "@/components/visual/page-section";
import { SectionLabel } from "@/components/visual/section-label";
import { homeContent } from "@/content/home";
import { ProjectCardMedia } from "./project-card-media";

export function ProjectCardList() {
  return (
    // scroll-mt keeps the section label clear of the fixed header when the
    // hero CTA jumps here, matching the case study sections.
    <PageSection className="scroll-mt-32" id="case-studies" spacing="lg">
      <StaggerGroup stagger={0.12}>
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
                <div className="project-card-copy px-1 py-3 md:px-4 md:py-4">
                  <p
                    className="type-eyebrow-accent mb-2"
                    style={{ color: "var(--project-accent)" }}
                  >
                    {project.context.company}
                    <span aria-hidden="true"> · </span>
                    {project.context.product}
                  </p>
                  <h3 className="type-home-title">
                    {project.title}
                  </h3>
                  <ul className="mt-2.5 flex flex-wrap gap-1.5 md:mt-3 md:gap-2">
                    {project.tags.map((tag) => (
                      <li key={tag} className="ui-tag">
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <p className="type-body-large mt-5 md:mt-8">{project.summary}</p>
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
