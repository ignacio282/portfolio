import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageSection } from "@/components/visual/page-section";
import { CTAButton } from "@/components/visual/cta-button";
import { SectionLabel } from "@/components/visual/section-label";

export default function NotFound() {
  return (
    <main>
      <PageSection className="min-h-[70vh] justify-center pt-36">
        <SectionLabel variant="accent">404</SectionLabel>
        <h1 className="type-display mt-6 max-w-3xl">
          This page is not in the portfolio yet.
        </h1>
        <p className="type-body-large mt-6 max-w-xl text-muted">
          The case study or page may still be part of the migration.
        </p>
        <CTAButton asChild className="mt-8">
          <Link href="/">
            Back Home <ArrowRight aria-hidden="true" size={20} />
          </Link>
        </CTAButton>
      </PageSection>
    </main>
  );
}
