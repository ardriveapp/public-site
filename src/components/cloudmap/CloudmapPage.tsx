"use client"

import { cloudmapData, statuses, themes, type CloudmapItem } from "@/lib/cloudmap"
import { Coins, Users, Cpu, Building, Network, Search, X, ChevronDown } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useState, useMemo } from "react"

const getIcon = (iconName: string): LucideIcon => {
  switch (iconName) {
    case "coins":
      return Coins
    case "person-arms-spread":
    case "person-arms-spread":
      return Users
    case "cpu":
      return Cpu
    case "buildings":
      return Building
    case "share-network":
      return Network
    default:
      return Cpu
  }
}

export function CloudmapPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedThemes, setSelectedThemes] = useState<Set<string>>(new Set())
  const [selectedStatuses, setSelectedStatuses] = useState<Set<string>>(new Set())
  const [collapsedColumns, setCollapsedColumns] = useState<Set<string>>(new Set())

  // Filter items based on search and filters
  const filteredItems = useMemo(() => {
    return cloudmapData.filter(item => {
      // Search filter
      const matchesSearch = searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())

      // Theme filter
      const matchesTheme = selectedThemes.size === 0 || selectedThemes.has(item.theme)

      // Status filter
      const matchesStatus = selectedStatuses.size === 0 || selectedStatuses.has(item.status)

      return matchesSearch && matchesTheme && matchesStatus
    })
  }, [searchQuery, selectedThemes, selectedStatuses])

  // Group filtered items by status
  const groupedItems = statuses.reduce((acc, status) => {
    acc[status] = filteredItems.filter(item => item.status === status)
    return acc
  }, {} as Record<string, CloudmapItem[]>)

  const toggleTheme = (theme: string) => {
    const newSelected = new Set(selectedThemes)
    if (newSelected.has(theme)) {
      newSelected.delete(theme)
    } else {
      newSelected.add(theme)
    }
    setSelectedThemes(newSelected)
  }

  const toggleStatus = (status: string) => {
    const newSelected = new Set(selectedStatuses)
    if (newSelected.has(status)) {
      newSelected.delete(status)
    } else {
      newSelected.add(status)
    }
    setSelectedStatuses(newSelected)
  }

  const toggleColumn = (status: string) => {
    const newCollapsed = new Set(collapsedColumns)
    if (newCollapsed.has(status)) {
      newCollapsed.delete(status)
    } else {
      newCollapsed.add(status)
    }
    setCollapsedColumns(newCollapsed)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedThemes(new Set())
    setSelectedStatuses(new Set())
  }

  const hasActiveFilters = searchQuery !== "" || selectedThemes.size > 0 || selectedStatuses.size > 0

  const getStatusColors = (status: string) => {
    const colorMap: Record<string, { bg: string; text: string; border: string; bgSelected: string; textSelected: string; borderSelected: string }> = {
      "Shipped": {
        bg: "bg-green-50",
        text: "text-green-700",
        border: "border-green-200",
        bgSelected: "bg-green-600",
        textSelected: "text-white",
        borderSelected: "border-green-600"
      },
      "In Progress": {
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
        bgSelected: "bg-blue-600",
        textSelected: "text-white",
        borderSelected: "border-blue-600"
      },
      "Continual Focus Area": {
        bg: "bg-orange-50",
        text: "text-orange-700",
        border: "border-orange-200",
        bgSelected: "bg-orange-600",
        textSelected: "text-white",
        borderSelected: "border-orange-600"
      },
      "Future": {
        bg: "bg-gray-50",
        text: "text-gray-700",
        border: "border-gray-200",
        bgSelected: "bg-gray-600",
        textSelected: "text-white",
        borderSelected: "border-gray-600"
      }
    }
    
    return colorMap[status] || {
      bg: "bg-gray-50",
      text: "text-gray-700",
      border: "border-gray-200",
      bgSelected: "bg-gray-600",
      textSelected: "text-white",
      borderSelected: "border-gray-600"
    }
  }

  const getStatusStyle = (status: string, isSelected: boolean = false) => {
    const colors = getStatusColors(status)
    if (isSelected) {
      return `${colors.bgSelected} ${colors.textSelected} ${colors.borderSelected}`
    }
    return `${colors.bg} ${colors.text} ${colors.border}`
  }

  const getThemeBadge = (theme: string) => {
    const baseClasses = "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border"

    switch (theme) {
      case "Economic Engine":
        return `${baseClasses} bg-fd-primary/10 text-fd-primary border-fd-primary/20`
      case "Adoption & Accessibility":
        return `${baseClasses} bg-pink-50 text-pink-700 border-pink-200`
      case "Developer Empowerment":
        return `${baseClasses} bg-indigo-50 text-indigo-700 border-indigo-200`
      case "Infrastructure Expansion":
        return `${baseClasses} bg-cyan-50 text-cyan-700 border-cyan-200`
      case "Network Autonomy":
        return `${baseClasses} bg-emerald-50 text-emerald-700 border-emerald-200`
      default:
        return `${baseClasses} bg-gray-50 text-gray-700 border-gray-200`
    }
  }

  return (
    <div className="space-y-8">
      {/* Filter Controls */}
      <div className="rounded-2xl border border-fd-border bg-fd-card p-6 shadow-sm">
        <div className="flex flex-col gap-4">
          {/* Results Summary */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-fd-foreground/70">
              Showing {filteredItems.length} of {cloudmapData.length} initiatives
            </span>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 rounded-lg border border-fd-border bg-fd-card px-3 py-1.5 text-sm font-medium text-fd-foreground hover:bg-fd-accent transition-colors"
              >
                <X className="size-3" />
                Clear filters
              </button>
            )}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-fd-foreground/50" />
            <input
              type="text"
              placeholder="Search initiatives..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-fd-border bg-fd-card px-10 py-2 text-sm placeholder:text-fd-foreground/50 focus:border-fd-primary focus:outline-none focus:ring-1 focus:ring-fd-primary"
            />
          </div>

          {/* Theme Filters */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-fd-foreground">Filter by Theme</span>
            <div className="flex flex-wrap gap-2">
              {themes.map(theme => (
                <button
                  key={theme}
                  onClick={() => toggleTheme(theme)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${
                    selectedThemes.has(theme)
                      ? "bg-fd-primary text-white border-fd-primary"
                      : "bg-fd-card text-fd-foreground border-fd-border hover:bg-fd-accent"
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filters */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-fd-foreground">Filter by Status</span>
            <div className="flex flex-wrap gap-2">
              {statuses.map(status => (
                <button
                  key={status}
                  onClick={() => toggleStatus(status)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${getStatusStyle(status, selectedStatuses.has(status))}`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* No Results Message */}
      {filteredItems.length === 0 && (
        <div className="rounded-2xl border border-fd-border bg-fd-card p-8 text-center">
          <div className="text-fd-foreground/50 mb-2">
            <Search className="size-8 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-fd-foreground mb-2">No initiatives found</h3>
            <p className="text-sm">
              Try adjusting your search or filters to see more results.
            </p>
          </div>
        </div>
      )}

      {/* Vertical Columns Layout */}
      {filteredItems.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statuses.map(status => {
            const items = groupedItems[status]
            if (items.length === 0) return null

            const isCollapsed = collapsedColumns.has(status)

            return (
              <div key={status} className="flex flex-col gap-4">
                {/* Column Header */}
                <div className="sticky top-0 z-10">
                  <button
                    onClick={() => toggleColumn(status)}
                    className={`w-full px-4 py-3 rounded-xl text-sm font-semibold border ${getStatusStyle(status)} shadow-sm hover:opacity-90 transition-all flex items-center justify-center gap-2`}
                  >
                    <span>
                      {status}
                      <span className="ml-2 text-xs opacity-75">
                        ({items.length})
                      </span>
                    </span>
                    <ChevronDown 
                      className={`size-4 transition-transform duration-200 ${isCollapsed ? '-rotate-180' : ''}`}
                    />
                  </button>
                </div>

                {/* Column Items */}
                {!isCollapsed && (
                  <div className="flex flex-col gap-4">
                    {items.map((item, index) => {
                      const Icon = getIcon(item.iconName)
                      return (
                        <div
                          key={item.slug}
                          className="group relative overflow-hidden rounded-2xl border border-fd-border bg-fd-card p-5 shadow-sm hover:shadow-lg transition-all duration-200 hover:border-fd-primary/20 animate-in fade-in slide-in-from-bottom-4"
                          style={{
                            background:
                              "linear-gradient(to bottom right, rgb(var(--color-fd-card)) 0%, rgb(var(--color-fd-card)) 72%, rgb(223 214 247 / 0.30) 100%)",
                            animationDelay: `${index * 50}ms`,
                          }}
                        >
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-fd-primary/10 opacity-70 transition-opacity duration-200 group-hover:opacity-100" />
                          <div className="flex items-start justify-between mb-3">
                            <span className={getThemeBadge(item.theme)}>
                              <Icon className="size-3" />
                              {item.theme}
                            </span>
                          </div>

                          <h3 className="font-semibold text-fd-foreground mb-2 text-base leading-tight">
                            <span className="md:hidden">{item.mobileTitle || item.title}</span>
                            <span className="hidden md:inline">{item.title}</span>
                          </h3>

                          <p className="text-xs text-fd-foreground/70 leading-relaxed">
                            {item.description.split(' ').map((word, index) =>
                              word.startsWith('http') ? (
                                <a
                                  key={index}
                                  href={word}
                                  className="text-fd-primary hover:underline"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {word}
                                </a>
                              ) : (
                                word + ' '
                              )
                            )}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
