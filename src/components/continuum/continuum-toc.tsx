"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface ContinuumTOCProps {
  contentRootId: string;
  title?: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function ContinuumTOC({ contentRootId, title = "Table of Contents" }: ContinuumTOCProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [headings, setHeadings] = useState<Heading[]>([]);

  const refreshHeadings = useCallback(() => {
    const root = document.getElementById(contentRootId);
    if (!root) {
      setHeadings([]);
      return;
    }

    // Top-level only (matches "Use Cases" side nav density).
    // Our Continuum doc uses `# ...` for top-level sections.
    const nodes = Array.from(root.querySelectorAll("h1"));
    const next: Heading[] = nodes
      .map((node) => {
        const text = (node.textContent ?? "").trim();
        if (!text) return null;

        const level = Number.parseInt(node.tagName.slice(1), 10);
        if (!Number.isFinite(level)) return null;

        let id = node.id;
        if (!id) {
          id = slugify(text);
          node.id = id;
        }

        return { id, text, level };
      })
      .filter((h): h is Heading => Boolean(h));

    setHeadings(next);
  }, [contentRootId]);

  useEffect(() => {
    refreshHeadings();

    const root = document.getElementById(contentRootId);
    if (!root) return;

    // In case MDX re-renders/hydrates and heading nodes shift, keep TOC in sync.
    const observer = new MutationObserver(() => refreshHeadings());
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [contentRootId, refreshHeadings]);

  const headingElements = useMemo(() => {
    return headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => Boolean(el));
  }, [headings]);

  useEffect(() => {
    if (headingElements.length === 0) return;

    let raf = 0;
    const TOP_OFFSET_PX = 120;

    const updateActive = () => {
      raf = 0;

      // Pick the last heading that is above the top offset.
      let current: HTMLElement | undefined;
      for (const el of headingElements) {
        if (el.getBoundingClientRect().top <= TOP_OFFSET_PX) {
          current = el;
        } else {
          break;
        }
      }

      const nextId = (current ?? headingElements[0]).id;
      setActiveId(nextId);
    };

    const onScrollOrResize = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(updateActive);
    };

    // Initial
    updateActive();

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [headingElements]);

  useEffect(() => {
    if (!activeId) return;
    // Intentionally no auto-scroll of the TOC itself — it can feel “bouncy”.
  }, [activeId]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="not-prose lg:sticky lg:top-24 lg:self-start">
      {/* Mobile dropdown */}
      <div className="mb-6 lg:hidden">
        <details className="group">
          <summary className="list-none cursor-pointer rounded-full bg-fd-primary/15 px-4 py-2 text-sm font-normal not-italic text-fd-foreground/90 hover:bg-fd-primary/25 transition-colors inline-flex items-center gap-2">
            {title}
            <span className="opacity-70 group-open:rotate-180 transition-transform">▾</span>
          </summary>
          <nav className="mt-3 flex flex-col gap-2">
            {headings.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                data-toc-id={heading.id}
                className={[
                  "w-full rounded-full px-4 py-2 text-sm leading-snug text-balance font-normal not-italic transition-colors",
                  "bg-fd-primary/10 hover:bg-fd-primary/25 text-fd-foreground/90",
                  activeId === heading.id
                    ? "bg-fd-primary/25 font-semibold"
                    : "",
                ].join(" ")}
                aria-current={activeId === heading.id ? "location" : undefined}
              >
                {heading.text}
              </a>
            ))}
          </nav>
        </details>
      </div>

      {/* Desktop sticky side nav */}
      <div className="hidden lg:block">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-fd-muted-foreground mb-3">
            {title}
          </div>
          <nav className="flex flex-col gap-2">
            {headings.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                data-toc-id={heading.id}
                className={[
                  "w-full rounded-full px-4 py-2 text-sm leading-snug text-balance font-normal not-italic transition-colors",
                  "bg-fd-primary/10 hover:bg-fd-primary/25 text-fd-foreground/90",
                  activeId === heading.id
                    ? "bg-fd-primary/25 font-semibold"
                    : "",
                ].join(" ")}
                aria-current={activeId === heading.id ? "location" : undefined}
              >
                {heading.text}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
