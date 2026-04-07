"use client"

import { type EcosystemItem } from "@/lib/ecosystem"
import { getCategoryLabel, ECOSYSTEM_CATEGORY_ORDER } from "@/lib/ecosystem-config"
import { Search, X, ExternalLink } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { BaseImage } from "@/components/base-image"

interface EcosystemPageProps {
  items: EcosystemItem[]
  initialFocusSlug?: string
}

export function EcosystemPage({ items, initialFocusSlug }: EcosystemPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set())
  const [sortOrder, setSortOrder] = useState<"random" | "alphabetical">("random")
  const [highlightedSlug, setHighlightedSlug] = useState<string | null>(null)

  // Shuffle array (stable seed for consistency across renders)
  const shuffledData = useMemo(() => {
    const arr = [...items]
    // Simple seeded shuffle for stable randomness
    let seed = 12345
    for (let i = arr.length - 1; i > 0; i--) {
      seed = (seed * 9301 + 49297) % 233280
      const j = Math.floor((seed / 233280) * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }, [items])

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    ECOSYSTEM_CATEGORY_ORDER.forEach(category => {
      counts[category] = items.filter(item =>
        item.categories.includes(category)
      ).length
    })
    return counts
  }, [items])

  // Filter and sort items
  const filteredItems = useMemo(() => {
    const sourceData = sortOrder === "random" ? shuffledData : items

    let filtered = sourceData.filter(item => {
      // Search filter
      const matchesSearch = searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())

      // Category filter
      const matchesCategory = selectedCategories.size === 0 ||
        item.categories.some(cat => selectedCategories.has(cat))

      return matchesSearch && matchesCategory
    })

    // Apply alphabetical sort if needed
    if (sortOrder === "alphabetical") {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title))
    }

    return filtered
  }, [searchQuery, selectedCategories, sortOrder, shuffledData, items])

  const toggleCategory = (category: string) => {
    const newSelected = new Set(selectedCategories)
    if (newSelected.has(category)) {
      newSelected.delete(category)
    } else {
      newSelected.add(category)
    }
    setSelectedCategories(newSelected)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategories(new Set())
    setSortOrder("random")
  }

  const _hasActiveFilters = searchQuery !== "" || selectedCategories.size > 0 || sortOrder !== "random"

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "random" ? "alphabetical" : "random")
  }

  const getCategoryColors = (category: string) => {
    const colorMap: Record<string, { bg: string; text: string; border: string; bgSelected: string; textSelected: string; borderSelected: string }> = {
      "ecosystem-category-ai": {
        bg: "bg-purple-50",
        text: "text-purple-700",
        border: "border-purple-200",
        bgSelected: "bg-purple-600",
        textSelected: "text-white",
        borderSelected: "border-purple-600"
      },
      "ecosystem-category-depin": {
        bg: "bg-teal-50",
        text: "text-teal-700",
        border: "border-teal-200",
        bgSelected: "bg-teal-600",
        textSelected: "text-white",
        borderSelected: "border-teal-600"
      },
      "ecosystem-category-digital-preservation": {
        bg: "bg-amber-50",
        text: "text-amber-800",
        border: "border-amber-200",
        bgSelected: "bg-amber-600",
        textSelected: "text-white",
        borderSelected: "border-amber-600"
      },
      "ecosystem-category-infra": {
        bg: "bg-cyan-50",
        text: "text-cyan-700",
        border: "border-cyan-200",
        bgSelected: "bg-cyan-600",
        textSelected: "text-white",
        borderSelected: "border-cyan-600"
      },
      "ecosystem-category-social-and-gaming": {
        bg: "bg-pink-50",
        text: "text-pink-700",
        border: "border-pink-200",
        bgSelected: "bg-pink-600",
        textSelected: "text-white",
        borderSelected: "border-pink-600"
      },
      "ecosystem-category-defi": {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        bgSelected: "bg-emerald-600",
        textSelected: "text-white",
        borderSelected: "border-emerald-600"
      },
      "ecosystem-category-tools-and-apps": {
        bg: "bg-indigo-50",
        text: "text-indigo-700",
        border: "border-indigo-200",
        bgSelected: "bg-indigo-600",
        textSelected: "text-white",
        borderSelected: "border-indigo-600"
      },
      "ecosystem-category-wallet": {
        bg: "bg-orange-50",
        text: "text-orange-700",
        border: "border-orange-200",
        bgSelected: "bg-orange-600",
        textSelected: "text-white",
        borderSelected: "border-orange-600"
      },
      "ecosystem-category-nft": {
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
        bgSelected: "bg-blue-600",
        textSelected: "text-white",
        borderSelected: "border-blue-600"
      }
    }
    
    return colorMap[category] || {
      bg: "bg-gray-50",
      text: "text-gray-700",
      border: "border-gray-200",
      bgSelected: "bg-gray-600",
      textSelected: "text-white",
      borderSelected: "border-gray-600"
    }
  }

  const getCategoryStyle = (category: string) => {
    const baseClasses = "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border transition-colors"
    const colors = getCategoryColors(category)
    
    if (selectedCategories.has(category)) {
      return `${baseClasses} ${colors.bgSelected} ${colors.textSelected} ${colors.borderSelected}`
    }
    
    return `${baseClasses} ${colors.bg} ${colors.text} ${colors.border} hover:opacity-80`
  }

  const getCategoryBadgeStyle = (category: string) => {
    const colors = getCategoryColors(category)
    return `inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${colors.bg} ${colors.text} border ${colors.border}`
  }

  useEffect(() => {
    if (!initialFocusSlug) return

    setHighlightedSlug(initialFocusSlug)

    const elementId = `ecosystem-${initialFocusSlug}`
    const scrollToCard = () => {
      const el = document.getElementById(elementId)
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }

    // Wait for paint/layout so the grid is present.
    requestAnimationFrame(() => requestAnimationFrame(scrollToCard))

    const timeout = window.setTimeout(() => {
      setHighlightedSlug(null)
    }, 4500)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [initialFocusSlug])

  return (
    <div className="space-y-8">
      {/* Filter Controls */}
      <div className="rounded-2xl border border-fd-border bg-fd-card p-6 shadow-sm">
        <div className="flex flex-col gap-4">
          {/* Results Summary + Sort Control */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <span className="text-sm text-fd-foreground/70">
              Showing {filteredItems.length} of {items.length} projects
            </span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-fd-foreground/70">Order:</span>
                <button
                  onClick={toggleSortOrder}
                  className="relative inline-flex h-8 w-36 items-center rounded-lg border border-fd-border bg-fd-card p-1 transition-colors"
                >
                  <span
                    className={`absolute h-6 rounded-md bg-fd-primary/15 transition-all duration-200 ${
                      sortOrder === "random" ? "left-1 w-[calc(50%-0.5rem)]" : "left-[calc(50%+0.125rem)] w-[calc(50%-0.5rem)]"
                    }`}
                  />
                  <span
                    className={`relative z-10 flex-1 text-center text-xs font-medium transition-colors ${
                      sortOrder === "random" ? "text-fd-foreground" : "text-fd-foreground/70"
                    }`}
                  >
                    Random
                  </span>
                  <span
                    className={`relative z-10 flex-1 text-center text-xs font-medium transition-colors ${
                      sortOrder === "alphabetical" ? "text-fd-foreground" : "text-fd-foreground/70"
                    }`}
                  >
                    A-Z
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-fd-foreground/50" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-fd-border bg-fd-card px-10 py-2 text-sm placeholder:text-fd-foreground/50 focus:border-fd-primary focus:outline-none focus:ring-1 focus:ring-fd-primary"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-fd-foreground">Filter by Category</span>
            <div className="flex flex-wrap items-center gap-2">
              {ECOSYSTEM_CATEGORY_ORDER.map(category => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={getCategoryStyle(category)}
                >
                  {getCategoryLabel(category)}
                  <span className="opacity-75">({categoryCounts[category] || 0})</span>
                </button>
              ))}
              {selectedCategories.size > 0 && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border border-fd-border bg-fd-card text-fd-foreground hover:bg-fd-accent transition-colors"
                >
                  <X className="size-3" />
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* No Results Message */}
      {filteredItems.length === 0 && (
        <div className="rounded-2xl border border-fd-border bg-fd-card p-8 text-center">
          <div className="text-fd-foreground/50 mb-2">
            <Search className="size-8 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-fd-foreground mb-2">No projects found</h3>
            <p className="text-sm">
              Try adjusting your search or filters to see more results.
            </p>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      {filteredItems.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, index) => (
            item.websiteUrl ? (
              <a
                key={item.slug}
                id={`ecosystem-${item.slug}`}
                href={item.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  "relative overflow-hidden rounded-2xl border border-fd-border bg-fd-card p-6 shadow-sm hover:shadow-lg transition-all duration-200 hover:border-fd-primary/20 animate-in fade-in slide-in-from-bottom-4 flex flex-col cursor-pointer group",
                ].join(" ")}
                style={{
                  background:
                    "linear-gradient(to bottom right, rgb(var(--color-fd-card)) 0%, rgb(var(--color-fd-card)) 72%, rgb(223 214 247 / 0.30) 100%)",
                  animationDelay: `${index * 30}ms`,
                }}
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-fd-primary/10 opacity-70 transition-opacity duration-200 group-hover:opacity-100" />
                {highlightedSlug === item.slug && (
                  <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-[rgb(var(--color-fd-primary)/0.55)] bg-[rgb(var(--color-fd-primary)/0.06)]" />
                )}
                {/* Logo + Categories */}
                <div className="relative flex items-start gap-4 mb-4">
                  {item.logoPath && (
                    <div className="shrink-0">
                      <div
                        className={
                          item.logoNeedsDarkBackground
                            ? "flex size-16 items-center justify-center rounded-lg bg-[#23232D] p-2"
                            : "flex size-16 items-center justify-center rounded-lg"
                        }
                      >
                        <BaseImage
                          src={item.logoPath}
                          alt={`${item.title} logo`}
                          width={64}
                          height={64}
                          className={
                            item.logoNeedsDarkBackground
                              ? "h-12 w-12 rounded-md object-contain"
                              : "h-16 w-16 rounded-md object-contain"
                          }
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-fd-foreground mb-2 text-lg leading-tight group-hover:text-fd-primary transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {item.categories.map(cat => (
                        <span
                          key={cat}
                          className={getCategoryBadgeStyle(cat)}
                        >
                          {getCategoryLabel(cat)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="relative text-sm text-fd-foreground/70 leading-relaxed flex-1">
                  {item.description}
                </p>
              </a>
            ) : (
              <div
                key={item.slug}
                id={`ecosystem-${item.slug}`}
                className={[
                  "relative overflow-hidden rounded-2xl border border-fd-border bg-fd-card p-6 shadow-sm animate-in fade-in slide-in-from-bottom-4 flex flex-col",
                ].join(" ")}
                style={{
                  background:
                    "linear-gradient(to bottom right, rgb(var(--color-fd-card)) 0%, rgb(var(--color-fd-card)) 72%, rgb(223 214 247 / 0.30) 100%)",
                  animationDelay: `${index * 30}ms`,
                }}
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-fd-primary/10 opacity-70 transition-opacity duration-200" />
                {highlightedSlug === item.slug && (
                  <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-[rgb(var(--color-fd-primary)/0.55)] bg-[rgb(var(--color-fd-primary)/0.06)]" />
                )}
                {/* Logo + Categories */}
                <div className="relative flex items-start gap-4 mb-4">
                  {item.logoPath && (
                    <div className="shrink-0">
                      <div
                        className={
                          item.logoNeedsDarkBackground
                            ? "flex size-16 items-center justify-center rounded-lg bg-[#23232D] p-2"
                            : "flex size-16 items-center justify-center rounded-lg"
                        }
                      >
                        <BaseImage
                          src={item.logoPath}
                          alt={`${item.title} logo`}
                          width={64}
                          height={64}
                          className={
                            item.logoNeedsDarkBackground
                              ? "h-12 w-12 rounded-md object-contain"
                              : "h-16 w-16 rounded-md object-contain"
                          }
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-fd-foreground mb-2 text-lg leading-tight">
                      {item.title}
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {item.categories.map(cat => (
                        <span
                          key={cat}
                          className={getCategoryBadgeStyle(cat)}
                        >
                          {getCategoryLabel(cat)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="relative text-sm text-fd-foreground/70 leading-relaxed mb-4 flex-1">
                  {item.description}
                </p>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  )
}
