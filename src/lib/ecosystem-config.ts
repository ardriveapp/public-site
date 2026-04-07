// Category configuration for Ecosystem Explorer
// Single source of truth for category labels and display order

export const ECOSYSTEM_CATEGORY_LABELS: Record<string, string> = {
  "ecosystem-category-ai": "AI",
  "ecosystem-category-depin": "DePIN",
  "ecosystem-category-digital-preservation": "Digital Preservation",
  "ecosystem-category-infra": "Infrastructure",
  "ecosystem-category-social-and-gaming": "Social & Gaming",
  "ecosystem-category-defi": "DeFi",
  "ecosystem-category-tools-and-apps": "Tools & Apps",
  "ecosystem-category-wallet": "Wallets",
  "ecosystem-category-nft": "NFT",
  "ecosystem-category-media": "Media",
};

// Display order for category filter chips (all categories from the dataset)
export const ECOSYSTEM_CATEGORY_ORDER = [
  "ecosystem-category-ai",
  "ecosystem-category-depin",
  "ecosystem-category-digital-preservation",
  "ecosystem-category-infra",
  "ecosystem-category-social-and-gaming",
  "ecosystem-category-defi",
  "ecosystem-category-tools-and-apps",
  "ecosystem-category-wallet",
  "ecosystem-category-nft",
  "ecosystem-category-media",
] as const;

// Helper: Get display label for a category ID
export function getCategoryLabel(categoryId: string): string {
  return ECOSYSTEM_CATEGORY_LABELS[categoryId] || categoryId;
}
