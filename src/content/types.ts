export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type ProjectMeta = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  image: string;
  imageAlt: string;
  accent: string;
  hoverTint?: string;
  layers?: ProjectMediaLayer[];
};

export type BuilderLabProject = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  accent: string;
  image?: string;
  imageAlt?: string;
  demoUrl?: string;
  repoUrl?: string;
  caseUrl?: string;
  modal: {
    description: string;
    relevance: string[];
    slides: {
      title: string;
      caption: string;
      variant: "dashboard" | "planner" | "game" | "hardware" | "workflow";
      src?: string;
      alt?: string;
    }[];
  };
};

export type ProjectMediaLayer = {
  src: string;
  alt: string;
  className: string;
  motion: "base" | "float-left" | "float-right" | "lift" | "lift-soft";
  priority?: boolean;
  width: number;
  height: number;
};

export type Outcome = {
  value: string;
  label: string;
  description?: string;
};

export type CaseMedia = {
  src: string;
  alt: string;
  aspect?: string;
};

export type CaseSection =
  | {
      type: "text";
      eyebrow: string;
      title: string;
      body: string[];
      media?: CaseMedia[];
    }
  | {
      type: "split";
      eyebrow: string;
      title: string;
      body: string[];
      calloutTitle: string;
      bullets: string[];
      media?: CaseMedia[];
    }
  | {
      type: "quote";
      eyebrow: string;
      quote: string;
      body: string[];
      media?: CaseMedia[];
    }
  | {
      type: "decisions";
      eyebrow: string;
      title: string;
      decisions: {
        title: string;
        body: string;
      }[];
      media?: CaseMedia[];
    };

export type CaseStudy = ProjectMeta & {
  caseHeroImage?: string;
  caseHeroImageAlt?: string;
  heroTitle: string;
  heroSubtitle: string;
  overview: string;
  problem: string;
  goals: string[];
  role: string;
  outcomes: Outcome[];
  sections: CaseSection[];
};
