import Image from "next/image";
import { cn } from "@/lib/cn";
import type { ProjectMeta } from "@/content/types";

export function ProjectCardMedia({
  project,
  priority = false
}: {
  project: ProjectMeta;
  priority?: boolean;
}) {
  if (!project.layers?.length) {
    return (
      <div className="project-card-media-fallback">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          className="object-cover"
          priority={priority}
          sizes="(max-width: 768px) 92vw, 420px"
        />
      </div>
    );
  }

  return (
    <div className="project-card-media" aria-label={project.imageAlt} role="img">
      {project.layers.map((layer) => (
        <Image
          key={layer.src}
          src={layer.src}
          alt={layer.alt}
          width={layer.width}
          height={layer.height}
          priority={priority || layer.priority}
          sizes="(max-width: 768px) 92vw, 420px"
          className={cn("project-media-layer", layer.className)}
          data-motion={layer.motion}
        />
      ))}
    </div>
  );
}
