import { BuilderLabSection } from "@/components/home/builder-lab-section";
import { Hero } from "@/components/home/hero";
import { ImpactGrid } from "@/components/home/impact-grid";
import { ProjectCardList } from "@/components/home/project-card-list";

export default function Home() {
  return (
    <main>
      <Hero />
      <ImpactGrid />
      <ProjectCardList />
      <BuilderLabSection />
    </main>
  );
}
