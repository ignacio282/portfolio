import type { Metadata } from "next";
import { StartupsPage } from "@/components/startups/startups-page";
import { siteConfig } from "@/content/site";

const title = "Product design for founders who already shipped";
const description =
  "You built it with AI and it works. Here's what usually needs a second look before real users arrive.";

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
