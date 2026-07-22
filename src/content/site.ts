import type { NavItem } from "./types";

export const siteConfig = {
  name: "Ignacio Vergara",
  title: "IGNACIO VERGARA",
  description:
    "UX/UI designer crafting intuitive web and mobile experiences. Explore projects for Banco Pichincha and more.",
  url: "https://ignaciovergara.me",
  resumeUrl:
    "https://drive.google.com/file/d/1xigL8vO2x6H0eIgNPHIhuby91b5f9QEn/view?usp=sharing",
  linkedinUrl: "https://www.linkedin.com/in/ignaciovergara282",
  contactUrl: "mailto:ignacio.vergara282@gmail.com",
  footer: "© 2026. Designed by Ignacio Vergara"
};

export const navItems: NavItem[] = [
  {
    label: "Resume",
    href: siteConfig.resumeUrl,
    external: true
  },
  {
    label: "About",
    href: "/about"
  },
  {
    label: "LinkedIn",
    href: siteConfig.linkedinUrl,
    external: true
  },
  {
    label: "Contact Me",
    href: siteConfig.contactUrl
  }
];
