import type { Metadata } from "next";
import { LabIndex } from "@/components/lab/lab-index";

export const metadata: Metadata = {
  title: "Things I've built",
  description:
    "Personal projects and experiments — how I turn my own ideas into working products."
};

export default function Lab() {
  return <LabIndex />;
}
