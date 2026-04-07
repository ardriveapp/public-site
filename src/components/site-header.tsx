"use client";

import Link from "next/link";
import { X, Menu } from "lucide-react";
import { useCallback, useState } from "react";
import { BaseImage } from "@/components/base-image";
import { SITE_CONTAINER_CLASS } from "@/components/site-container";

const NAV_LINKS = [
  { label: "Pricing", href: "/pricing" },
  { label: "Developers", href: "/developers" },
];

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-fd-background/90 backdrop-blur border-b border-fd-border/10">
      <div className={`${SITE_CONTAINER_CLASS} flex items-center justify-between gap-6 py-4`}>
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
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-fd-foreground/80 hover:text-fd-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <a
            href="https://app.ardrive.io"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-fd-primary px-5 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            <span className="size-2 rounded-full bg-white/70 shrink-0" />
            Get Started
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
                className="rounded-lg px-3 py-3 text-sm text-fd-foreground/80 hover:bg-fd-card hover:text-fd-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-fd-border/10">
              <a
                href="https://app.ardrive.io"
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-fd-primary px-5 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              >
                <span className="size-2 rounded-full bg-white/70 shrink-0" />
                Get Started
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
