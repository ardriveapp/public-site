/**
 * Legacy, same-domain redirects for static export deployments.
 *
 * This repo is statically exported (no server), so we implement redirects
 * client-side (via the 404 page) using this mapping.
 *
 * Notes:
 * - Keys should be normalized paths (leading slash, no trailing slash).
 * - Values should be canonical app routes (include trailing slash to match `trailingSlash: true`).
 */
export const LEGACY_PATH_REDIRECTS: Readonly<Record<string, string>> = Object.freeze({
  // Old "Solutions" pages -> dedicated Technology sub-routes (easy to customize later).
  "/arns": "/technology/arns/",
  "/gateways": "/technology/gateways/",
  "/access": "/technology/access/",

  // Old solution -> new use case.
  "/storage": "/use-cases/file-storage/",

  // Old long-form -> new article.
  "/vision": "/articles/vision/",

  // Old use case URLs -> new use case URLs.
  "/decentralized-ai": "/use-cases/verifiable-ai/",
  "/sites-and-apps": "/use-cases/sites-and-apps/",
  "/file-storage": "/use-cases/file-storage/",
  "/oracle-and-blockchain-data": "/use-cases/oracles-and-onchain-data/",
  "/social-platforms": "/use-cases/user-platforms/",
  "/web3-gaming-and-nfts": "/use-cases/digital-assets/",
});

