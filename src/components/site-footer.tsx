"use client";

import Link from "next/link";
import { SITE_CONTAINER_CLASS } from "@/components/site-container";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-fd-border/10 bg-fd-background py-6 text-sm text-fd-foreground/50">
      <div className={`${SITE_CONTAINER_CLASS} flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between`}>
        <span>Copyright &copy; {year} ardrive</span>
        <Link
          href="/tos-and-privacy"
          className="hover:text-fd-foreground transition-colors"
        >
          Terms of Service &amp; Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
