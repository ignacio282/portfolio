"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ChevronLeft,
  ChevronRight,
  Code2,
  Cpu,
  Gamepad2,
  Layers3,
  X
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { StaggerGroup, StaggerItem } from "@/components/motion/animated-section";
import { MediaFrame } from "@/components/visual/media-frame";
import { PageSection } from "@/components/visual/page-section";
import { SectionLabel } from "@/components/visual/section-label";
import { homeContent } from "@/content/home";
import type { BuilderLabProject } from "@/content/types";

type BuilderAccentStyle = CSSProperties & {
  "--builder-accent"?: string;
  "--builder-stack-index"?: number;
};

function CategoryGlyph({ category, size = 14 }: { category: string; size?: number }) {
  if (category === "Web Dev") {
    return <Code2 size={size} aria-hidden={true} />;
  }

  if (category === "Game Dev") {
    return <Gamepad2 size={size} aria-hidden={true} />;
  }

  if (category === "Physical Computing") {
    return <Cpu size={size} aria-hidden={true} />;
  }

  return <Layers3 size={size} aria-hidden={true} />;
}

function ProjectTags({ project }: { project: BuilderLabProject }) {
  return (
    <span className="builder-tag-row">
      {project.tags.map((tag, index) => (
        <span className="builder-tag" key={tag}>
          {index === 0 ? <CategoryGlyph category={tag} /> : null}
          {tag}
          {index < project.tags.length - 1 ? <span className="builder-tag-fallback"> / </span> : null}
        </span>
      ))}
    </span>
  );
}

function BuilderProjectCard({
  project,
  featured = false,
  onOpen
}: {
  project: BuilderLabProject;
  featured?: boolean;
  onOpen: (project: BuilderLabProject) => void;
}) {
  const className = [
    "builder-card surface-card",
    featured ? "builder-card-feature" : ""
  ].filter(Boolean).join(" ");
  const style: BuilderAccentStyle = { "--builder-accent": project.accent };

  return (
    <button
      className={className}
      onClick={() => onOpen(project)}
      style={style}
      type="button"
    >
      <span className="builder-card-copy">
        <ProjectTags project={project} />
        <span className="type-small-title builder-card-title">{project.title}</span>
        <span className="type-body-small builder-card-summary">{project.summary}</span>
      </span>
    </button>
  );
}

function ProductVisual({
  project,
  slide
}: {
  project: BuilderLabProject;
  slide: BuilderLabProject["modal"]["slides"][number];
}) {
  const style: BuilderAccentStyle = { "--builder-accent": project.accent };

  if (slide.src) {
    return (
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        className="builder-modal-visual"
        data-variant={slide.variant}
        exit={{ opacity: 0, x: -12 }}
        initial={{ opacity: 0, x: 12 }}
        key={slide.title}
        style={style}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        <MediaFrame
          alt={slide.alt ?? slide.title}
          className="absolute inset-0"
          fit="contain"
          radius="none"
          sizes="(max-width: 1024px) 92vw, 600px"
          src={slide.src}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      animate={{ opacity: 1, x: 0 }}
      className="builder-modal-visual"
      data-variant={slide.variant}
      exit={{ opacity: 0, x: -12 }}
      initial={{ opacity: 0, x: 12 }}
      key={slide.title}
      style={style}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="builder-modal-visual-header">
        <span />
        <span />
        <span />
      </div>
      <div className="builder-modal-visual-body">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </motion.div>
  );
}

function BuilderProjectModal({
  project,
  onClose
}: {
  project: BuilderLabProject;
  onClose: () => void;
}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();
  const slide = project.modal.slides[activeSlide];
  const slideCount = project.modal.slides.length;

  useEffect(() => {
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  function showPreviousSlide() {
    setActiveSlide((current) => (current - 1 + slideCount) % slideCount);
  }

  function showNextSlide() {
    setActiveSlide((current) => (current + 1) % slideCount);
  }

  const modal = (
    <motion.div
      animate={{ opacity: 1 }}
      className="builder-modal-scrim"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      onMouseDown={(event) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    }}
      transition={{ duration: reducedMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.section
        animate={{
          opacity: 1,
          scale: 1,
          y: 0
        }}
        aria-labelledby="builder-project-modal-title"
        aria-modal="true"
        className="builder-modal-panel"
        exit={{
          opacity: 0,
          scale: reducedMotion ? 1 : 0.98,
          y: reducedMotion ? 0 : 14
        }}
        initial={{
          opacity: 0,
          scale: reducedMotion ? 1 : 0.96,
          y: reducedMotion ? 0 : 24
        }}
        role="dialog"
        style={{ "--builder-accent": project.accent } as BuilderAccentStyle}
        transition={
          reducedMotion
            ? { duration: 0.01 }
            : { type: "spring", stiffness: 260, damping: 24, mass: 0.82 }
        }
      >
        <div className="builder-modal-header">
          <div>
            <ProjectTags project={project} />
            <h2 className="type-display builder-modal-title" id="builder-project-modal-title">
              {project.title}
            </h2>
          </div>
          <button
            aria-label="Close project details"
            className="builder-modal-icon-button"
            onClick={onClose}
            ref={closeButtonRef}
            type="button"
          >
            <X size={22} aria-hidden={true} />
          </button>
        </div>

        <div className="builder-modal-content">
          <div className="builder-carousel order-2 lg:order-none">
            <div className="builder-carousel-frame">
              <AnimatePresence mode="wait">
                <ProductVisual project={project} slide={slide} />
              </AnimatePresence>
              <button
                aria-label="Show previous image"
                className="builder-carousel-arrow builder-carousel-arrow-prev"
                onClick={showPreviousSlide}
                type="button"
              >
                <ChevronLeft size={20} aria-hidden={true} />
              </button>
              <button
                aria-label="Show next image"
                className="builder-carousel-arrow builder-carousel-arrow-next"
                onClick={showNextSlide}
                type="button"
              >
                <ChevronRight size={20} aria-hidden={true} />
              </button>
            </div>
            <div className="builder-carousel-controls">
              <p className="type-body-small builder-carousel-caption">
                <strong>{slide.title}</strong>
                <span>{slide.caption}</span>
              </p>
            </div>
            <div className="builder-carousel-dots" aria-label="Carousel position">
              {project.modal.slides.map((item, index) => (
                <button
                  aria-label={`Show ${item.title}`}
                  aria-pressed={activeSlide === index}
                  className="builder-carousel-dot"
                  key={item.title}
                  onClick={() => setActiveSlide(index)}
                  type="button"
                />
              ))}
            </div>
          </div>

          <div className="builder-modal-details order-1 lg:order-none">
            <p className="type-body builder-modal-description">{project.modal.description}</p>
            <div>
              <h3 className="type-small-title">Why It Belongs Here</h3>
              <ul className="builder-modal-list">
                {project.modal.relevance.map((point) => (
                  <li className="type-body-small" key={point}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(modal, document.body);
}

export function BuilderLabSection() {
  const { builderLab } = homeContent;
  const [activeProject, setActiveProject] = useState<BuilderLabProject | null>(null);
  const projectsBySlug = useMemo(
    () => new Map(builderLab.projects.map((project) => [project.slug, project])),
    [builderLab.projects]
  );
  const mealPrep = projectsBySlug.get("meal-prep-assistant") ?? builderLab.projects[0];
  const game = projectsBySlug.get("survivor-style-game") ?? builderLab.projects[1];
  const rfid = projectsBySlug.get("rfid-productivity-device") ?? builderLab.projects[2];

  return (
    <PageSection id="builder-lab" spacing="lg">
      <StaggerGroup className="builder-lab" stagger={0.1} margin="0px 0px -15% 0px" amount={0.1}>
        <StaggerItem>
          <SectionLabel>{builderLab.label}</SectionLabel>
          <p className="type-body-large builder-lab-body">{builderLab.body}</p>
        </StaggerItem>
        <div className="builder-lab-grid">
          <StaggerItem className="builder-grid-feature">
            <BuilderProjectCard project={mealPrep} featured onOpen={setActiveProject} />
          </StaggerItem>
          <StaggerItem className="builder-grid-small">
            <BuilderProjectCard project={game} onOpen={setActiveProject} />
          </StaggerItem>
          <StaggerItem className="builder-grid-small">
            <BuilderProjectCard project={rfid} onOpen={setActiveProject} />
          </StaggerItem>
        </div>
      </StaggerGroup>
      <AnimatePresence mode="wait">
        {activeProject ? (
          <BuilderProjectModal
            key={activeProject.slug}
            onClose={() => setActiveProject(null)}
            project={activeProject}
          />
        ) : null}
      </AnimatePresence>
    </PageSection>
  );
}
