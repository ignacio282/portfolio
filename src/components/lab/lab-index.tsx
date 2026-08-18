import { ExternalLink } from "lucide-react";
import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/motion/animated-section";
import { MediaFrame } from "@/components/visual/media-frame";
import { PageSection } from "@/components/visual/page-section";
import { SectionLabel } from "@/components/visual/section-label";
import { homeContent } from "@/content/home";
import type { BuilderLabProject } from "@/content/types";

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
          <SectionLabel variant="accent">Lab</SectionLabel>
          <h1 className="type-display mt-6 max-w-4xl">{builderLab.label}</h1>
          <p className="type-body-large mt-6 max-w-3xl">{builderLab.body}</p>
        </AnimatedSection>
      </PageSection>

      <PageSection className="pb-24">
        <StaggerGroup className="grid gap-16" stagger={0.1}>
          {builderLab.projects.map((project, index) => (
            <StaggerItem
              key={project.slug}
              // A rule between entries, not around them: the first row opens
              // straight after the intro.
              className={index === 0 ? undefined : "case-rule pt-16"}
            >
              <LabProject project={project} priority={index === 0} />
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
  const shots = project.details.shots.filter((shot) => shot.src);

  return (
    <article style={{ "--project-accent": project.accent } as React.CSSProperties}>
      <LabProjectMedia priority={priority} project={project} />

      <div className="mt-8 max-w-3xl">
        <h2 className="type-home-title">{project.title}</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li className="ui-tag" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
        <p className="type-body-large mt-6">{project.summary}</p>
        <p className="type-body mt-5">{project.details.description}</p>

        <h3 className="type-case-subtitle mt-8">Why it belongs here</h3>
        <ul className="type-body mt-4 list-disc space-y-2 pl-5">
          {project.details.relevance.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>

        {links.length > 0 ? (
          <div className="mt-8 flex flex-wrap gap-3">
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

      {shots.length > 0 ? (
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {shots.map((shot) => (
            <figure key={shot.title}>
              <MediaFrame
                alt={shot.alt ?? shot.title}
                className="aspect-[1.5/1] w-full"
                fit="contain"
                sizes="(max-width: 768px) 92vw, 620px"
                src={shot.src as string}
              />
              <figcaption className="mt-4">
                <p className="type-small-title">{shot.title}</p>
                <p className="type-body-small mt-2 text-muted">{shot.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      ) : null}
    </article>
  );
}

/* The lead visual is whatever the project has: a looping clip, a still, or
   nothing at all for the ones that are still only planned. */
function LabProjectMedia({
  project,
  priority
}: {
  project: BuilderLabProject;
  priority: boolean;
}) {
  if (project.video) {
    return (
      <div className="media-frame aspect-[16/9] w-full">
        <video
          aria-label={project.imageAlt ?? project.title}
          autoPlay
          className="h-full w-full object-cover"
          loop
          muted
          playsInline
          poster={project.videoPoster}
          preload="metadata"
          src={project.video}
        />
      </div>
    );
  }

  if (project.image) {
    return (
      <MediaFrame
        alt={project.imageAlt ?? project.title}
        className="aspect-[16/9] w-full"
        priority={priority}
        sizes="(max-width: 768px) 92vw, 1280px"
        src={project.image}
      />
    );
  }

  return null;
}
