"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { StaggerGroup, StaggerItem } from "@/components/motion/animated-section";
import { MediaFrame } from "@/components/visual/media-frame";
import { PageSection } from "@/components/visual/page-section";
import { SectionLabel } from "@/components/visual/section-label";
import { homeContent } from "@/content/home";
import type { BuilderLabProject } from "@/content/types";

type BuilderAccentStyle = CSSProperties & {
  "--builder-accent"?: string;
};

function BuilderShowcaseVisual({
  project,
  slideIndex,
  onSelectSlide,
  onOpen
}: {
  project: BuilderLabProject;
  slideIndex: number;
  onSelectSlide: (index: number) => void;
  onOpen: (project: BuilderLabProject, slideIndex: number) => void;
}) {
  const style: BuilderAccentStyle = { "--builder-accent": project.accent };
  const slides = project.modal.slides;
  const slide = slides[slideIndex] ?? slides[0];
  const src = slide?.src ?? project.image;
  const alt = slide?.alt ?? project.imageAlt ?? project.title;
  const hasVideo = Boolean(project.video);

  return (
    <div className="builder-showcase-visual-wrap">
      <button
        aria-label={`Open ${project.title} details`}
        className="builder-showcase-visual"
        onClick={() => onOpen(project, slideIndex)}
        style={style}
        type="button"
      >
        {hasVideo ? (
          <video
            aria-label={project.imageAlt ?? project.title}
            autoPlay
            className="builder-showcase-video"
            loop
            muted
            onLoadedMetadata={(event) => {
              event.currentTarget.playbackRate = 1.25;
            }}
            playsInline
            poster={project.videoPoster}
            preload="metadata"
            src={project.video}
            suppressHydrationWarning
          />
        ) : src ? (
          <MediaFrame
            alt={alt}
            className="absolute inset-0"
            fit="cover"
            radius="md"
            sizes="(max-width: 768px) 100vw, 1200px"
            src={src}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: `color-mix(in srgb, ${project.accent} 16%, white)` }}
          />
        )}
        <div className="builder-showcase-hover">
          <p className="builder-showcase-hover-title">{project.title}</p>
          <p className="builder-showcase-hover-summary">{project.summary}</p>
        </div>
      </button>
      {!hasVideo && slides.length > 1 ? (
        <>
          <button
            aria-label={`Show previous image for ${project.title}`}
            className="builder-carousel-arrow builder-carousel-arrow-prev builder-showcase-arrow"
            onClick={() => onSelectSlide((slideIndex - 1 + slides.length) % slides.length)}
            type="button"
          >
            <ChevronLeft size={20} aria-hidden={true} />
          </button>
          <button
            aria-label={`Show next image for ${project.title}`}
            className="builder-carousel-arrow builder-carousel-arrow-next builder-showcase-arrow"
            onClick={() => onSelectSlide((slideIndex + 1) % slides.length)}
            type="button"
          >
            <ChevronRight size={20} aria-hidden={true} />
          </button>
          <div className="builder-carousel-dots builder-carousel-dots-overlay" aria-label="Carousel position">
            {slides.map((item, index) => (
              <button
                aria-label={`Show ${item.title}`}
                aria-pressed={slideIndex === index}
                className="builder-carousel-dot"
                key={item.title}
                onClick={() => onSelectSlide(index)}
                type="button"
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
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
      <div className="builder-modal-visual" data-variant={slide.variant} style={style}>
        <MediaFrame
          alt=""
          className="builder-modal-visual-bg"
          fit="cover"
          radius="none"
          sizes="(max-width: 768px) 92vw, 984px"
          src={slide.src}
        />
        <MediaFrame
          alt={slide.alt ?? slide.title}
          className="builder-modal-visual-img"
          fit="contain"
          radius="none"
          sizes="(max-width: 768px) 92vw, 984px"
          src={slide.src}
        />
      </div>
    );
  }

  return (
    <div className="builder-modal-visual" data-variant={slide.variant} style={style}>
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
    </div>
  );
}

function BuilderProjectModal({
  project,
  initialSlide = 0,
  onClose
}: {
  project: BuilderLabProject;
  initialSlide?: number;
  onClose: () => void;
}) {
  const [activeSlide, setActiveSlide] = useState(initialSlide);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();
  const slide = project.modal.slides[activeSlide];
  const slideCount = project.modal.slides.length;
  const links = [
    project.demoUrl ? { href: project.demoUrl, label: "Website" } : null,
    project.repoUrl ? { href: project.repoUrl, label: "GitHub" } : null,
    project.caseUrl ? { href: project.caseUrl, label: "Case Study" } : null
  ].filter((link): link is { href: string; label: string } => link !== null);

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
        <div className="builder-modal-content">
          <header className="builder-modal-header">
            <div className="builder-modal-heading">
              <h2 className="type-display" id="builder-project-modal-title">
                {project.title}
              </h2>
              <p className="type-body-large builder-modal-summary">{project.summary}</p>
              {links.length > 0 ? (
                <div className="builder-modal-links">
                  {links.map((link, index) => (
                    <a
                      className={index === 0 ? "ui-pill" : "ui-pill-outline"}
                      href={link.href}
                      key={link.href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {link.label}
                      <ExternalLink size={14} aria-hidden={true} />
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
            <button
              aria-label="Close project details"
              className="builder-modal-close"
              onClick={onClose}
              ref={closeButtonRef}
              type="button"
            >
              <X size={18} aria-hidden={true} />
            </button>
          </header>

          <div className="builder-carousel-frame">
            <div className="builder-carousel-stage">
              <ProductVisual project={project} slide={slide} />
            </div>
            <div className="builder-carousel-meta">
              <p className="builder-carousel-caption">
                <strong>{slide.title}</strong>
                <span className="type-body-small">{slide.caption}</span>
              </p>
              {slideCount > 1 ? (
                <div className="builder-carousel-controls">
                  <button
                    aria-label="Show previous image"
                    className="builder-modal-arrow"
                    onClick={showPreviousSlide}
                    type="button"
                  >
                    <ChevronLeft size={18} aria-hidden={true} />
                  </button>
                  <div className="builder-modal-dots" aria-label="Carousel position">
                    {project.modal.slides.map((item, index) => (
                      <button
                        aria-label={`Show ${item.title}`}
                        aria-pressed={activeSlide === index}
                        className="builder-modal-dot"
                        key={item.title}
                        onClick={() => setActiveSlide(index)}
                        type="button"
                      />
                    ))}
                  </div>
                  <button
                    aria-label="Show next image"
                    className="builder-modal-arrow"
                    onClick={showNextSlide}
                    type="button"
                  >
                    <ChevronRight size={18} aria-hidden={true} />
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          <div className="builder-modal-sections">
            <section>
              <SectionLabel variant="accent">The Story</SectionLabel>
              <p className="type-body builder-modal-description">{project.modal.description}</p>
            </section>
            <section>
              <SectionLabel variant="accent">Why It Belongs Here</SectionLabel>
              <ul className="builder-modal-list">
                {project.modal.relevance.map((point) => (
                  <li className="type-body-small" key={point}>
                    {point}
                  </li>
                ))}
              </ul>
            </section>
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
  const [modalInitialSlide, setModalInitialSlide] = useState(0);
  const projectsBySlug = useMemo(
    () => new Map(builderLab.projects.map((project) => [project.slug, project])),
    [builderLab.projects]
  );
  const mealPrep = projectsBySlug.get("meal-prep-assistant") ?? builderLab.projects[0];
  const game = projectsBySlug.get("survivor-style-game") ?? builderLab.projects[1];
  const rfid = projectsBySlug.get("rfid-productivity-device") ?? builderLab.projects[2];
  const featuredProjects = useMemo(() => [mealPrep, game, rfid], [mealPrep, game, rfid]);
  const [activeSlug, setActiveSlug] = useState(featuredProjects[0].slug);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const activeTabProject =
    featuredProjects.find((project) => project.slug === activeSlug) ?? featuredProjects[0];

  function handleSelectTab(slug: string) {
    setActiveSlug(slug);
    setActiveSlideIndex(0);
  }

  function handleOpen(project: BuilderLabProject, slideIndex: number) {
    setModalInitialSlide(slideIndex);
    setActiveProject(project);
  }

  return (
    <PageSection id="builder-lab" spacing="lg">
      <StaggerGroup className="builder-lab" stagger={0.1} margin="0px 0px -15% 0px" amount={0.1}>
        <StaggerItem>
          <SectionLabel variant="home">{builderLab.label}</SectionLabel>
          <p className="type-body-large builder-lab-body">{builderLab.body}</p>
        </StaggerItem>
        <StaggerItem>
          <div className="builder-showcase">
            <div className="builder-showcase-media">
              <BuilderShowcaseVisual
                onOpen={handleOpen}
                onSelectSlide={setActiveSlideIndex}
                project={activeTabProject}
                slideIndex={activeSlideIndex}
              />
            </div>
            <div className="builder-showcase-tabs" role="tablist">
              {featuredProjects.map((project) => (
                <button
                  aria-selected={project.slug === activeSlug}
                  className="builder-showcase-tab"
                  key={project.slug}
                  onClick={() => handleSelectTab(project.slug)}
                  role="tab"
                  style={{ "--builder-accent": project.accent } as BuilderAccentStyle}
                  type="button"
                >
                  {project.title}
                </button>
              ))}
            </div>
          </div>
        </StaggerItem>
      </StaggerGroup>
      <AnimatePresence mode="wait">
        {activeProject ? (
          <BuilderProjectModal
            initialSlide={modalInitialSlide}
            key={activeProject.slug}
            onClose={() => setActiveProject(null)}
            project={activeProject}
          />
        ) : null}
      </AnimatePresence>
    </PageSection>
  );
}
