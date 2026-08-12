import { StaggerGroup, StaggerItem } from "@/components/motion/animated-section";
import { cn } from "@/lib/cn";
import type { AboutValue } from "@/content/about";

export function AboutValues({ items }: { items: AboutValue[] }) {
  return (
    <StaggerGroup className="mt-10" stagger={0.12}>
      {items.map((item, index) => (
        <StaggerItem key={item.id}>
          {/* Every row is topped by a rule, and the last one closes the set,
              so the three read as one ruled block rather than floating pairs. */}
          <div
            className={cn(
              "about-value-row case-rule",
              index === items.length - 1 ? "border-b border-line" : null
            )}
          >
            <div>
              <p className="type-eyebrow-accent">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="type-impact-heading mt-3">{item.title}</h3>
            </div>
            <div>
              <p className="type-body-large">
                {/* Segments are a fixed, ordered literal, so the index is a
                    stable key. */}
                {item.body.map((segment, segmentIndex) =>
                  typeof segment === "string" ? (
                    <span key={segmentIndex}>{segment}</span>
                  ) : (
                    <strong key={segmentIndex}>{segment.strong}</strong>
                  )
                )}
              </p>
            </div>
          </div>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
