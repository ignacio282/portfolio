import type { Metadata } from "next";
import { StartupsPage } from "@/components/startups/startups-page";
import { siteConfig } from "@/content/site";

const title = "Design Help for Early-Stage Founders";
const description =
  "Products built fast tend to end up with the same interface. Product design audits and interface redesign for early-stage startups, built around what your team already shipped.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/startups"
  },
  openGraph: {
    title,
    description,
    url: "/startups",
    siteName: siteConfig.name,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title,
    description
  }
};

export default function Startups() {
  return <StartupsPage />;
}
