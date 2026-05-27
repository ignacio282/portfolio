import Link from "next/link";
import { StaggerGroup, StaggerItem } from "@/components/motion/animated-section";
import { InlineCTA } from "@/components/visual/inline-cta";
import { MediaFrame } from "@/components/visual/media-frame";
import { PageSection } from "@/components/visual/page-section";
import { homeContent } from "@/content/home";

export function WorkProcessTeaser() {
  return (
    <PageSection className="pb-20 pt-4">
      <StaggerGroup>
        <StaggerItem>
          <Link
            href="/projects/portal"
            className="surface-link-card grid overflow-hidden md:grid-cols-[1fr_480px]"
          >
            <div className="p-8 md:p-10">
              <p className="type-eyebrow">
                {homeContent.process.title}
              </p>
              <p className="type-body-large mt-5">{homeContent.process.body}</p>
              <InlineCTA>View process</InlineCTA>
            </div>
            <MediaFrame
              src="/images/process-card.png"
              alt="Sticky notes labeled understand, propose, and improve."
              className="min-h-[220px]"
              radius="none"
              sizes="(max-width: 768px) 92vw, 480px"
            />
          </Link>
        </StaggerItem>
      </StaggerGroup>
    </PageSection>
  );
}
