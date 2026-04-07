"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { HelpArticleMeta } from "@/lib/help";

const CATEGORY_LABELS: Record<string, string> = {
  "Using Ardrive Apps": "Using ArDrive Apps",
  "Faqs": "FAQs",
  "Ardrive As A Platform": "ArDrive as a Platform",
  "Understanding The Permaweb": "Understanding the Permaweb",
};

function displayCategory(raw: string): string {
  return CATEGORY_LABELS[raw] ?? raw;
}

interface Props {
  articles: HelpArticleMeta[];
}

export function HelpIndex({ articles }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return articles;
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.section.toLowerCase().includes(q)
    );
  }, [articles, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, Map<string, HelpArticleMeta[]>>();
    for (const a of filtered) {
      const cat = a.category || "Other";
      const sec = a.section || "";
      if (!map.has(cat)) map.set(cat, new Map());
      const secMap = map.get(cat)!;
      if (!secMap.has(sec)) secMap.set(sec, []);
      secMap.get(sec)!.push(a);
    }
    return map;
  }, [filtered]);

  const categoryKeys = useMemo(
    () => [...grouped.keys()].sort((a, b) => a.localeCompare(b)),
    [grouped]
  );

  const isSearching = query.trim().length > 0;

  return (
    <div>
      {/* Search input */}
      <div className="relative mb-10 max-w-xl">
        <svg
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 size-4"
          style={{ color: "rgba(250,250,250,0.3)" }}
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search help articles…"
          className="w-full rounded-xl py-3 pl-11 pr-4 text-sm outline-none transition-colors"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#FAFAFA",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "rgba(211,23,33,0.5)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
          }}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 size-6 rounded-full flex items-center justify-center text-xs transition-colors hover:bg-white/10"
            style={{ color: "rgba(250,250,250,0.4)" }}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div
          className="rounded-2xl p-12 text-center"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p style={{ color: "rgba(250,250,250,0.4)" }}>
            No articles found for &ldquo;{query}&rdquo;.
          </p>
        </div>
      ) : (
        <>
          {isSearching && (
            <p className="mb-6 text-sm" style={{ color: "rgba(250,250,250,0.35)" }}>
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
            </p>
          )}

          <div className="space-y-14">
            {categoryKeys.map((cat) => {
              const secMap = grouped.get(cat)!;
              const sectionKeys = [...secMap.keys()].sort((a, b) => a.localeCompare(b));
              const totalInCat = [...secMap.values()].reduce((n, arr) => n + arr.length, 0);

              return (
                <section key={cat}>
                  <div className="mb-6 flex items-baseline gap-3">
                    <h2
                      className="text-xl font-bold sm:text-2xl"
                      style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                    >
                      {displayCategory(cat)}
                    </h2>
                    <span
                      className="text-xs font-semibold tabular-nums"
                      style={{ color: "rgba(250,250,250,0.3)" }}
                    >
                      {totalInCat}
                    </span>
                  </div>

                  <div className="space-y-8">
                    {sectionKeys.map((sec) => {
                      const items = secMap.get(sec)!;
                      return (
                        <div key={sec}>
                          {sec && !isSearching && (
                            <p
                              className="mb-3 text-xs font-semibold uppercase tracking-widest"
                              style={{ color: "rgba(211,23,33,0.7)" }}
                            >
                              {sec}
                            </p>
                          )}
                          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                            {items.map((article) => (
                              <Link
                                key={article.slug}
                                href={`/help/${article.slug}`}
                                className="group relative block overflow-hidden rounded-xl p-5 transition-colors"
                                style={{
                                  background: "linear-gradient(to bottom right, rgb(30,30,30), rgb(30,10,15))",
                                  border: "1px solid rgba(255,255,255,0.07)",
                                }}
                                onMouseEnter={(e) => {
                                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(211,23,33,0.3)";
                                }}
                                onMouseLeave={(e) => {
                                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                                }}
                              >
                                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                  style={{ background: "radial-gradient(80% 80% at 0% 0%, rgba(211,23,33,0.06) 0%, transparent 100%)" }}
                                />
                                <div className="relative">
                                  {isSearching && (sec || cat) && (
                                    <p
                                      className="mb-1.5 text-xs font-semibold"
                                      style={{ color: "rgba(211,23,33,0.65)" }}
                                    >
                                      {displayCategory(cat)}{sec ? ` · ${sec}` : ""}
                                    </p>
                                  )}
                                  <h3
                                    className="text-sm font-bold leading-snug group-hover:text-fd-primary transition-colors"
                                    style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                                  >
                                    {article.title}
                                  </h3>
                                  {article.description && (
                                    <p
                                      className="mt-1.5 line-clamp-2 text-xs leading-relaxed"
                                      style={{ color: "rgba(250,250,250,0.4)" }}
                                    >
                                      {article.description}
                                    </p>
                                  )}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
