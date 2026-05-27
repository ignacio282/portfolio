import { siteConfig } from "@/content/site";

export function Footer() {
  return (
    <footer className="type-footer relative z-10 mx-auto flex w-full max-w-[1280px] px-5 py-10 md:px-8 md:py-16">
      {siteConfig.footer}
    </footer>
  );
}
