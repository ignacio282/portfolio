import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/motion/animated-section";
import { Card } from "@/components/visual/card";
import { MediaFrame } from "@/components/visual/media-frame";
import { PageSection } from "@/components/visual/page-section";
import { homeContent } from "@/content/home";
import type { BuilderLabProject } from "@/content/types";
import { LabVideo } from "./lab-video";

/** Ordered so the label matches whichever URL the project actually carries. */
function projectLinks(project: BuilderLabProject) {
  return [
    project.demoUrl ? { href: project.demoUrl, label: "Visit Site" } : null,
    project.repoUrl ? { href: project.repoUrl, label: "GitHub" } : null,
    project.caseUrl ? { href: project.caseUrl, label: "Case Study" } : null
  ].filter((link): link is { href: string; label: string } => link !== null);
}

export function LabIndex() {
  const { builderLab } = homeContent;

  return (
    <main>
      <PageSection spacing="hero">
        <AnimatedSection>
          {/* This page is only reached from the home section, so it needs a
              way out — the same back affordance the case studies use. */}
          <Link className="ui-link-cta ui-link-cta-back focus-ring" href="/#builder-lab">
            <ArrowLeft aria-hidden="true" size={20} />
            Back
          </Link>
          <h1 className="type-display mt-8">{builderLab.label}</h1>
          <p className="type-body-large mt-6">{builderLab.body}</p>
        </AnimatedSection>
      </PageSection>

      <PageSection className="pb-24 pt-8">
        <StaggerGroup className="grid gap-8" stagger={0.1}>
          {builderLab.projects.map((project, index) => (
            <StaggerItem key={project.slug}>
              <LabProject priority={index === 0} project={project} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </PageSection>
    </main>
  );
}

function LabProject({
  project,
  priority
}: {
  project: BuilderLabProject;
  priority: boolean;
}) {
  const links = projectLinks(project);

  return (
    <Card
      padding="lg"
      style={{ "--project-accent": project.accent } as React.CSSProperties}
    >
      <LabProjectMedia priority={priority} project={project} />

      <div className="mt-10">
        <h2 className="type-home-title">{project.title}</h2>
        <p className="type-body mt-6">{project.summary}</p>
        <p className="type-body mt-5">{project.details.description}</p>

        <h3 className="type-case-subtitle mt-12">Main features</h3>
        <ul className="type-body mt-4 list-disc space-y-2 pl-5">
          {project.details.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>

        <h3 className="type-case-subtitle mt-12">Tech stack</h3>
        <p className="type-body mt-4">
          {project.details.stack.map((tool, index) => (
            <span key={tool}>
              {index > 0 ? <span aria-hidden="true"> · </span> : null}
              {tool}
            </span>
          ))}
        </p>

        {links.length > 0 ? (
          <div className="mt-12 flex flex-wrap gap-3">
            {links.map((link) => (
              <a
                className="ui-pill-outline focus-ring"
                href={link.href}
                key={link.href}
                rel="noreferrer"
                target="_blank"
              >
                {link.label}
                <ExternalLink aria-hidden="true" size={14} />
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </Card>
  );
}

/* The lead visual is whatever the project has: a clip or a still. A project
   with neither renders copy only. */
function LabProjectMedia({
  project,
  priority
}: {
  project: BuilderLabProject;
  priority: boolean;
}) {
  if (project.video) {
    return (
      <LabVideo
        label={project.title}
        poster={project.videoPoster}
        src={project.video}
      />
    );
  }

  if (project.image) {
    return (
      <MediaFrame
        alt={project.imageAlt ?? project.title}
        className="aspect-video w-full"
        priority={priority}
        sizes="(max-width: 768px) 92vw, 1280px"
        src={project.image}
      />
    );
  }

  return null;
}
