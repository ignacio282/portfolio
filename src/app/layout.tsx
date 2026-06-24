import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Footer } from "@/components/shell/footer";
import { Header } from "@/components/shell/header";
import { SiteBackground } from "@/components/visual/site-background";
import { PageFade } from "@/components/motion/page-fade";
import { siteConfig } from "@/content/site";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={ibmPlexSans.variable} data-scroll-behavior="smooth">
      <body>
        <SiteBackground />
        <Header />
        <PageFade>{children}</PageFade>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
