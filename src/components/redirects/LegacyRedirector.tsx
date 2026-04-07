"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getBasePath, withBasePath } from "@/lib/base-path";
import { LEGACY_PATH_REDIRECTS } from "@/lib/legacy-redirects";

function normalizePathForLookup(pathname: string): string {
  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const lower = withLeadingSlash.toLowerCase();

  if (lower.length > 1 && lower.endsWith("/")) {
    return lower.slice(0, -1);
  }

  return lower;
}

export function LegacyRedirector(): null {
  // `usePathname()` triggers rerender on client-side route changes.
  // We only want to attempt redirects on initial 404 render and on client nav.
  const pathname = usePathname();

  useEffect(() => {
    // Avoid running during SSR (shouldn't happen due to "use client", but keep it safe).
    if (typeof window === "undefined") return;

    const basePath = getBasePath();
    const rawPathname = pathname || window.location.pathname;

    // Normalize by stripping the Next.js basePath (GitHub Pages) so keys stay stable.
    const withoutBasePath =
      basePath && rawPathname.startsWith(basePath)
        ? rawPathname.slice(basePath.length) || "/"
        : rawPathname;

    const lookupKey = normalizePathForLookup(withoutBasePath);
    const target = LEGACY_PATH_REDIRECTS[lookupKey];

    if (!target) return;

    const destination = withBasePath(target) + window.location.search + window.location.hash;

    // Replace avoids polluting browser history with a "dead" URL.
    window.location.replace(destination);
  }, [pathname]);

  return null;
}

