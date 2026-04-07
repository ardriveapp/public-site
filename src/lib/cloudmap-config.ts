// Cloudmap configuration
// Single source of truth for status and theme display order

// Display order for status columns
export const CLOUDMAP_STATUS_ORDER = [
  "Shipped",
  "In Progress",
  "Continual Focus Area",
  "Future"
] as const

export type Status = typeof CLOUDMAP_STATUS_ORDER[number]

// Display order for theme filters
export const CLOUDMAP_THEME_ORDER = [
  "Economic Engine",
  "Adoption & Accessibility",
  "Developer Empowerment",
  "Infrastructure Expansion",
  "Network Autonomy"
] as const

export type Theme = typeof CLOUDMAP_THEME_ORDER[number]
