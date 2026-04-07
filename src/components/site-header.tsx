"use client";

import Link from "next/link";
import { X, Menu, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BaseImage } from "@/components/base-image";
import { SITE_CONTAINER_CLASS } from "@/components/site-container";

const NAV_LINKS = [
  { label: "Pricing", href: "/pricing" },
  { label: "Developers", href: "/developers" },
  { label: "Articles", href: "/articles" },
  { label: "Help", href: "/help" },
];

const isActiveLink = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur transition-all duration-300 ${
        isScrolled
          ? "border-fd-border/15 bg-fd-background/95 shadow-[0_8px_30px_rgba(0,0,0,0.24)]"
          : "border-fd-border/10 bg-fd-background/85"
      }`}
    >
      <div
        className={`${SITE_CONTAINER_CLASS} flex items-center justify-between gap-6 transition-all duration-300 ${
          isScrolled ? "py-3" : "py-4"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0" onClick={closeMobileMenu}>
          <BaseImage
            src="/brand/ArDrive-Logo-Wordmark-Light.png"
            alt="ArDrive"
            width={120}
            height={28}
            className="block h-7 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`group relative inline-flex items-center py-1 text-[0.92rem] font-semibold transition-colors ${
                isActiveLink(pathname, link.href)
                  ? "text-fd-foreground"
                  : "text-fd-foreground/75 hover:text-fd-foreground"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-px w-full origin-left transition-transform duration-200 ${
                  isActiveLink(pathname, link.href)
                    ? "scale-x-100 bg-fd-primary"
                    : "scale-x-0 bg-fd-primary group-hover:scale-x-100"
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <a
            href="https://app.ardrive.io"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-fd-primary bg-white pl-5 pr-1 py-1 text-sm font-semibold text-black transition-all duration-200 hover:shadow-[0_8px_20px_rgba(211,23,33,0.28)]"
          >
            Get Started
            <span className="inline-flex size-8 items-center justify-center rounded-full bg-fd-primary text-white">
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:-rotate-45" />
            </span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden inline-flex size-10 items-center justify-center rounded-full border border-fd-border/20 text-fd-foreground transition-colors hover:bg-fd-card"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-fd-border/10 bg-fd-background">
          <div className={`${SITE_CONTAINER_CLASS} py-4 flex flex-col gap-1`}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={`rounded-lg px-3 py-3 text-base font-semibold transition-colors ${
                  isActiveLink(pathname, link.href)
                    ? "bg-fd-card text-fd-foreground"
                    : "text-fd-foreground/80 hover:bg-fd-card hover:text-fd-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-fd-border/10">
              <a
                href="https://app.ardrive.io"
                target="_blank"
                rel="noreferrer"
                className="group flex w-full items-center justify-center gap-2 rounded-full border border-fd-primary bg-white px-5 py-1.5 text-sm font-semibold text-black transition-all duration-200 hover:shadow-[0_8px_20px_rgba(211,23,33,0.28)]"
              >
                Get Started
                <span className="inline-flex size-8 items-center justify-center rounded-full bg-fd-primary text-white">
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:-rotate-45" />
                </span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
