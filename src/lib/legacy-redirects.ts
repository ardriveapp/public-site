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

  // Legacy article slugs at root -> /articles/<slug>/
  "/anthony": "/articles/anthony/",
  "/ardrive-difference": "/articles/ardrive-difference/",
  "/ardrive-mobile-the-first-permanent-storage-app-for-your-phone": "/articles/ardrive-mobile-the-first-permanent-storage-app-for-your-phone/",
  "/arfs": "/articles/arfs/",
  "/arweave-and-nft-metadata": "/articles/arweave-and-nft-metadata/",
  "/arweave-vs-filecoin": "/articles/arweave-vs-filecoin/",
  "/arweave-vs-ordinals": "/articles/arweave-vs-ordinals/",
  "/blockchain-storage-versus-cloud-storage": "/articles/blockchain-storage-versus-cloud-storage/",
  "/bundles-how-files-get-from-ardrive-to-the-arweave-network": "/articles/bundles-how-files-get-from-ardrive-to-the-arweave-network/",
  "/can-data-really-be-stored-forever": "/articles/can-data-really-be-stored-forever/",
  "/can-you-buy-permanent-data": "/articles/can-you-buy-permanent-data/",
  "/can-you-host-a-website-on-a-blockchain": "/articles/can-you-host-a-website-on-a-blockchain/",
  "/can-you-store-nfts-on-arweave": "/articles/can-you-store-nfts-on-arweave/",
  "/can-you-store-private-data-on-a-blockchain": "/articles/can-you-store-private-data-on-a-blockchain/",
  "/cryptoadz": "/articles/cryptoadz/",
  "/dapp-history-of-ardrive": "/articles/dapp-history-of-ardrive/",
  "/family-historian": "/articles/family-historian/",
  "/fragility-of-the-internet": "/articles/fragility-of-the-internet/",
  "/full-of-eyes": "/articles/full-of-eyes/",
  "/generative-nfts": "/articles/generative-nfts/",
  "/holopolis": "/articles/holopolis/",
  "/hood-rats": "/articles/hood-rats/",
  "/how-do-you-store-data-permanently": "/articles/how-do-you-store-data-permanently/",
  "/how-long-will-a-usb-drive-last": "/articles/how-long-will-a-usb-drive-last/",
  "/how-much-data-can-you-store-on-blockchain": "/articles/how-much-data-can-you-store-on-blockchain/",
  "/how-to-create-a-permanent-link": "/articles/how-to-create-a-permanent-link/",
  "/how-to-store-data-for-100-years": "/articles/how-to-store-data-for-100-years/",
  "/introduction-to-digital-archiving-and-blockchain": "/articles/introduction-to-digital-archiving-and-blockchain/",
  "/manifest-demo": "/articles/manifest-demo/",
  "/manifests": "/articles/manifests/",
  "/myna-accountants": "/articles/myna-accountants/",
  "/nft-101-the-tldr-of-nfts": "/articles/nft-101-the-tldr-of-nfts/",
  "/pins": "/articles/pins/",
  "/pulsar79": "/articles/pulsar79/",
  "/sarah-script": "/articles/sarah-script/",
  "/stellabelle": "/articles/stellabelle/",
  "/story-btorbs": "/articles/story-btorbs/",
  "/story-lostindia": "/articles/story-lostindia/",
  "/ultimate-photobook": "/articles/ultimate-photobook/",
  "/universal-data-license": "/articles/universal-data-license/",
  "/untamed-elephants": "/articles/untamed-elephants/",
  "/using-ardrive-with-opensea": "/articles/using-ardrive-with-opensea/",
  "/vibrant-content": "/articles/vibrant-content/",
  "/what-is-ardrive": "/articles/what-is-ardrive/",
  "/what-is-arweave": "/articles/what-is-arweave/",
  "/what-is-permanent-data": "/articles/what-is-permanent-data/",
  "/what-is-the-permaweb": "/articles/what-is-the-permaweb/",
  "/whats-so-important-about-blockchain-technology": "/articles/whats-so-important-about-blockchain-technology/",
  "/what-type-of-files-on-blockchain": "/articles/what-type-of-files-on-blockchain/",
  "/where-can-i-store-my-photos-permanently": "/articles/where-can-i-store-my-photos-permanently/",
  "/who-needs-permanent-data": "/articles/who-needs-permanent-data/",

  // Nav pages that redirect elsewhere.
  "/learn": "/articles/",
  "/start": "https://app.ardrive.io/",

  // Old use case URLs -> new use case URLs.
  "/decentralized-ai": "/use-cases/verifiable-ai/",
  "/sites-and-apps": "/use-cases/sites-and-apps/",
  "/file-storage": "/use-cases/file-storage/",
  "/oracle-and-blockchain-data": "/use-cases/oracles-and-onchain-data/",
  "/social-platforms": "/use-cases/user-platforms/",
  "/web3-gaming-and-nfts": "/use-cases/digital-assets/",
});

