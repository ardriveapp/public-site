"use client";

import Link from "next/link";
import { ArrowRight, Gamepad2 } from "lucide-react";
import { SITE_CONTAINER_CLASS } from "@/components/site-container";

const FOOTER_SECTIONS = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Pricing", href: "/pricing" },
      { label: "Developers", href: "/developers" },
      { label: "NFTs", href: "/nfts" },
      { label: "Articles", href: "/articles" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Enterprise", href: "/enterprise" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help", href: "/help" },
      { label: "Brand Kit", href: "/brand-kit" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer
      className="pb-8 pt-14"
      style={{ background: "#080808" }}
    >
      <div className={SITE_CONTAINER_CLASS}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto] lg:items-start">
          <div>
            <p className="max-w-[13rem] text-xl leading-[1.2] text-fd-foreground">
              Permanent, private, and powerful.
            </p>
            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-fd-foreground">Socials</p>
              <div className="flex flex-col gap-2 text-sm text-fd-foreground/85">
                <a
                  href="https://x.com/ardriveapp"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-fit items-center gap-2 transition-colors hover:text-fd-foreground"
                >
                  <span className="font-semibold text-fd-foreground">X</span>
                  @ardriveapp
                </a>
                <a
                  href="https://discord.com/invite/ya4hf2H"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-fit items-center gap-2 transition-colors hover:text-fd-foreground"
                >
                  <Gamepad2 className="size-3.5" />
                  @ardrive
                </a>
              </div>
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title}>
                <p className="mb-3 text-sm font-semibold text-fd-foreground">
                  {section.title}
                </p>
                <div className="flex flex-col gap-2 text-sm text-fd-foreground/85">
                  {section.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="w-fit transition-colors hover:text-fd-foreground"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="flex shrink-0 flex-col gap-5 lg:items-end">
            <a
              href="https://app.ardrive.io"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 text-xl font-semibold text-fd-foreground transition-colors"
            >
              <span className="transition-colors group-hover:text-fd-primary">Launch app</span>
              <span className="inline-flex size-8 items-center justify-center rounded-full border border-fd-border/25 transition-colors group-hover:border-fd-primary/40 group-hover:bg-fd-primary/20">
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:-rotate-45 group-hover:text-fd-primary" />
              </span>
            </a>

            <a
              href="https://docs.ar.io"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 text-xl font-semibold text-fd-foreground transition-colors"
            >
              <span className="transition-colors group-hover:text-fd-primary">Docs</span>
              <span className="inline-flex size-8 items-center justify-center rounded-full border border-fd-border/25 transition-colors group-hover:border-fd-primary/40 group-hover:bg-fd-primary/20">
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:rotate-45" />
              </span>
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-fd-border/10 pt-4 text-xs text-fd-foreground/55 sm:flex-row sm:items-center sm:justify-end">
          <Link href="/tos-and-privacy" className="transition-colors hover:text-fd-foreground/85">
            Terms of Service &amp; Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
