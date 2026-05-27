import type { Metadata } from "next";
import { ProjectIndex } from "@/components/projects/project-index";

export const metadata: Metadata = {
  title: "Projects"
};

export default function Projects() {
  return <ProjectIndex />;
}
