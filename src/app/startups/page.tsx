import type { Metadata } from "next";
import { StartupsPage } from "@/components/startups/startups-page";

export const metadata: Metadata = {
  title: "Design Help for Early-Stage Founders"
};

export default function Startups() {
  return <StartupsPage />;
}
