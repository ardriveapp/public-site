"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BaseImage } from "@/components/base-image";
import { SITE_CONTAINER_CLASS } from "@/components/site-container";
import type { UseCaseNavItem } from "@/lib/use-cases";

interface SiteFooterProps {
  useCasesNav: UseCaseNavItem[];
}

const servicesLinks = [
  { label: "Enterprise", href: "/enterprise" },
  { label: "Institutions", href: "/institutions" },
  { label: "Platforms", href: "/platforms" },
  { label: "Provenance", href: "/provenance" },
  { label: "Technology", href: "/technology" },
];

const resourcesLinks = [
  { label: "About", href: "/about" },
  { label: "Trust", href: "/trust" },
  { label: "Articles", href: "/articles" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Token", href: "/token" },
  { label: "Brand Kit", href: "/brand-kit" },
  { label: "Contact", href: "/contact" },
];

const developerLinks = [
  { label: "Documentation", href: "https://docs.ar.io", external: true },
  { label: "GitHub", href: "https://github.com/ar-io", external: true },
  { label: "Cloudmap", href: "/cloudmap" },
  { label: "Ecosystem", href: "/ecosystem" },
];

export function SiteFooter({ useCasesNav }: SiteFooterProps) {
  const useCasesLinks = useCasesNav.map((useCase) => ({
    label: useCase.title,
    href: `/use-cases/${useCase.slug.join("/")}`,
  }));
  const pathname = usePathname();
  const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const basePath = rawBasePath === "/" ? "" : rawBasePath.replace(/\/$/, "");

  // Helper to check pathname with or without trailing slash
  const matchesPath = (path: string) => {
    const withSlash = path.endsWith("/") ? path : `${path}/`;
    const withoutSlash = path.endsWith("/") ? path.slice(0, -1) : path;
    return pathname === withSlash || pathname === withoutSlash ||
           pathname === `${basePath}${withSlash}` || pathname === `${basePath}${withoutSlash}`;
  };

  const isHomePage = pathname === "/" || pathname === basePath || pathname === `${basePath}/`;
  const isEnterprisePage = matchesPath("/enterprise");
  const isInstitutionsPage = matchesPath("/institutions");
  const isPlatformsPage = matchesPath("/platforms");
  const isAboutPage = matchesPath("/about");
  const isTechnologyPage = matchesPath("/technology");
  const isTrustPage = matchesPath("/trust");
  const isProvenancePage = matchesPath("/provenance");

  const backgroundClassName =
    isHomePage ||
    isEnterprisePage ||
    isInstitutionsPage ||
    isPlatformsPage ||
    isAboutPage ||
    isTechnologyPage ||
    isTrustPage ||
    isProvenancePage
      ? "bg-[#DFD6F7]"
      : "bg-[linear-gradient(to_bottom,rgb(var(--color-fd-background))_0%,rgb(var(--color-fd-background))_35%,rgb(223_214_247)_100%)]";

  return (
    <footer className={`${backgroundClassName} py-12 text-[#23232D]`}>
      <div className={SITE_CONTAINER_CLASS}>
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <BaseImage
              src="/brand/ario-full-black.svg"
              alt="ar.io"
              width={500}
              height={120}
              className="block"
            />
          </div>

          {/* Link columns */}
          <div className="flex flex-wrap gap-12 md:gap-16">
            {/* Services */}
            <nav className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-[#23232D] mb-1">Services</span>
              {servicesLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-[#23232D]/80 hover:text-[#23232D] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Developers */}
            <nav className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-[#23232D] mb-1">Developers</span>
              {developerLinks.map((link) => (
                "external" in link && link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-[#23232D]/80 hover:text-[#23232D] transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-[#23232D]/80 hover:text-[#23232D] transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </nav>

            {/* Use Cases */}
            <nav className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-[#23232D] mb-1">Use Cases</span>
              {useCasesLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-[#23232D]/80 hover:text-[#23232D] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Resources */}
            <nav className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-[#23232D] mb-1">Resources</span>
              {resourcesLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-[#23232D]/80 hover:text-[#23232D] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Social links and Legal links */}
        <div className="mt-8 border-t border-[#23232D]/20 pt-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {/* Social links */}
            <nav className="flex items-center gap-4">
              <a
                href="https://x.com/ar_io_network"
                target="_blank"
                rel="noreferrer"
                className="opacity-100 hover:opacity-70 transition-opacity"
                aria-label="X (Twitter)"
              >
                <BaseImage
                  src="/icons/x-icon.svg"
                  alt="X"
                  width={22}
                  height={23}
                  className="block"
                />
              </a>
              <a
                href="https://www.linkedin.com/company/ar-io-network/"
                target="_blank"
                rel="noreferrer"
                className="opacity-100 hover:opacity-70 transition-opacity"
                aria-label="LinkedIn"
              >
                <BaseImage
                  src="/icons/linkedin-icon.svg"
                  alt="LinkedIn"
                  width={22}
                  height={23}
                  className="block"
                />
              </a>
              <a
                href="https://github.com/ar-io"
                target="_blank"
                rel="noreferrer"
                className="opacity-100 hover:opacity-70 transition-opacity"
                aria-label="GitHub"
              >
                <BaseImage
                  src="/icons/github-icon.svg"
                  alt="GitHub"
                  width={22}
                  height={23}
                  className="block"
                />
              </a>
              <a
                href="https://discord.com/invite/HGG52EtTc2"
                target="_blank"
                rel="noreferrer"
                className="opacity-100 hover:opacity-70 transition-opacity"
                aria-label="Discord"
              >
                <BaseImage
                  src="/icons/discord-icon.svg"
                  alt="Discord"
                  width={22}
                  height={23}
                  className="block"
                />
              </a>
            </nav>

            {/* Legal links */}
            <nav className="flex flex-wrap items-center gap-6 text-sm">
              <Link
                href="/legal/terms-of-service-and-privacy-policy"
                className="text-[#23232D] hover:text-[#23232D]/70 transition-colors"
              >
                Terms & Conditions
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}


