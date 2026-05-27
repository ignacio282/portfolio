"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Gamepad2,
  Layers3,
  UtensilsCrossed,
  X
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { StaggerGroup, StaggerItem } from "@/components/motion/animated-section";
import { PageSection } from "@/components/visual/page-section";
import { SectionLabel } from "@/components/visual/section-label";
import { homeContent } from "@/content/home";
import type { BuilderLabProject } from "@/content/types";

type BuilderAccentStyle = CSSProperties & {
  "--builder-accent"?: string;
  "--builder-stack-index"?: number;
};

function ProjectGlyph({ slug, size = 22 }: { slug: string; size?: number }) {
  if (slug === "meal-prep-assistant") {
    return <UtensilsCrossed size={size} aria-hidden={true} />;
  }

  if (slug === "personal-operating-dashboard") {
    return <CalendarDays size={size} aria-hidden={true} />;
  }

  if (slug === "survivor-style-game") {
    return <Gamepad2 size={size} aria-hidden={true} />;
  }

  if (slug === "rfid-productivity-device") {
    return <Cpu size={size} aria-hidden={true} />;
  }

  return <Layers3 size={size} aria-hidden={true} />;
}

function ProjectIcon({ project, size = 22 }: { project: BuilderLabProject; size?: number }) {
  return (
    <span className="builder-card-icon" aria-hidden="true">
      <ProjectGlyph slug={project.slug} size={size} />
    </span>
  );
}

function ProjectTags({ project }: { project: BuilderLabProject }) {
  return (
    <span className="builder-tag-row">
      {project.tags.map((tag, index) => (
        <span className="builder-tag" key={tag}>
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
  wide = false,
  onOpen
}: {
  project: BuilderLabProject;
  featured?: boolean;
  wide?: boolean;
  onOpen: (project: BuilderLabProject) => void;
}) {
  const className = [
    "builder-card surface-card",
    featured ? "builder-card-feature" : "",
    wide ? "builder-card-wide" : ""
  ].filter(Boolean).join(" ");
  const style: BuilderAccentStyle = { "--builder-accent": project.accent };

  return (
    <button
      className={className}
      onClick={() => onOpen(project)}
      style={style}
      type="button"
    >
      <span className="builder-card-topline">
        <ProjectIcon project={project} />
      </span>
      <span className="builder-card-copy">
        <ProjectTags project={project} />
        <span className="type-small-title builder-card-title">{project.title}</span>
        <span className="type-body-small builder-card-summary">{project.summary}</span>
      </span>
      {featured ? <MealPrepPreview /> : null}
      {wide ? <HardwarePreview /> : null}
    </button>
  );
}

function MealPrepPreview() {
  return (
    <span className="builder-meal-preview" aria-hidden="true">
      <span className="builder-meal-sidebar">
        <span />
        <span />
        <span />
      </span>
      <span className="builder-meal-panel">
        <span className="builder-meal-toolbar">
          <span />
          <span />
        </span>
        <span className="builder-meal-calendar">
          {["Mon", "Tue", "Wed", "Thu"].map((day, index) => (
            <span className="builder-meal-day" key={day}>
              <strong>{day}</strong>
              <span data-active={index === 1 || index === 3} />
              <span />
            </span>
          ))}
        </span>
      </span>
    </span>
  );
}

function HardwarePreview() {
  return (
    <span className="builder-hardware-preview" aria-hidden="true">
      <span className="builder-hardware-board">
        <span className="builder-hardware-screen">
          <span>FOCUS</span>
          <span>25:00</span>
        </span>
        <span className="builder-hardware-reader" />
        <span className="builder-hardware-chip" />
      </span>
      <span className="builder-hardware-card" />
    </span>
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
          <div className="builder-carousel">
            <AnimatePresence mode="wait">
              <ProductVisual project={project} slide={slide} />
            </AnimatePresence>
            <div className="builder-carousel-controls">
              <button
                aria-label="Show previous image"
                className="builder-modal-icon-button"
                onClick={showPreviousSlide}
                type="button"
              >
                <ChevronLeft size={22} aria-hidden={true} />
              </button>
              <p className="type-body-small builder-carousel-caption">
                <strong>{slide.title}</strong>
                <span>{slide.caption}</span>
              </p>
              <button
                aria-label="Show next image"
                className="builder-modal-icon-button"
                onClick={showNextSlide}
                type="button"
              >
                <ChevronRight size={22} aria-hidden={true} />
              </button>
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

          <div className="builder-modal-details">
            <ProjectTags project={project} />
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
  const dashboard = projectsBySlug.get("personal-operating-dashboard") ?? builderLab.projects[1];
  const game = projectsBySlug.get("survivor-style-game") ?? builderLab.projects[2];
  const rfid = projectsBySlug.get("rfid-productivity-device") ?? builderLab.projects[3];

  return (
    <PageSection id="builder-lab" spacing="lg">
      <StaggerGroup className="builder-lab" stagger={0.1}>
        <StaggerItem>
          <div className="builder-lab-header">
            <div>
              <SectionLabel>{builderLab.label}</SectionLabel>
              <h2 className="type-display builder-lab-title">{builderLab.title}</h2>
            </div>
            <p className="type-body-large builder-lab-body">{builderLab.body}</p>
          </div>
        </StaggerItem>
        <div className="builder-lab-grid">
          <StaggerItem className="builder-grid-feature">
            <BuilderProjectCard project={mealPrep} featured onOpen={setActiveProject} />
          </StaggerItem>
          <StaggerItem className="builder-grid-wide">
            <BuilderProjectCard project={dashboard} wide onOpen={setActiveProject} />
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
