import type { Metadata } from "next";
import { AboutPage } from "@/components/about/about-page";

export const metadata: Metadata = {
  title: "About",
  description:
    "How Ignacio went from complex videogames to product design: his story, experience, working philosophy, and design process."
};

export default function About() {
  return <AboutPage />;
}
