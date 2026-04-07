"use client";

import Link from "next/link";
import { ArrowRight, Gamepad2 } from "lucide-react";
import { SITE_CONTAINER_CLASS } from "@/components/site-container";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "For Developers", href: "/developers" },
  { label: "Pricing", href: "/pricing" },
  { label: "Learn", href: "/articles" },
  { label: "Enterprise", href: "/enterprise" },
  { label: "Contact", href: "/contact" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="pb-8 pt-14"
      style={{ background: "#080808" }}
    >
      <div className={SITE_CONTAINER_CLASS}>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="grid flex-1 grid-cols-1 gap-10 sm:grid-cols-3 lg:max-w-3xl">
            <div>
              <p className="max-w-[13rem] text-xl leading-[1.2] text-fd-foreground">
                Permanent, private, and powerful.
              </p>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold text-fd-foreground">ArDrive</p>
              <nav className="flex flex-col gap-1.5 text-sm text-fd-foreground/85">
                {FOOTER_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="w-fit transition-colors hover:text-fd-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
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

        <div className="mt-8 flex flex-col gap-2 border-t border-fd-border/10 pt-4 text-xs text-fd-foreground/55 sm:flex-row sm:items-center sm:justify-between">
          <span>Copyright &copy; {year} ArDrive</span>
          <Link href="/tos-and-privacy" className="transition-colors hover:text-fd-foreground/85">
            Terms of Service &amp; Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
