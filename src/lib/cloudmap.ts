import { CLOUDMAP_STATUS_ORDER, CLOUDMAP_THEME_ORDER, type Status, type Theme } from "./cloudmap-config"

export interface CloudmapItem {
  slug: string
  theme: string
  title: string
  status: string
  description: string
  iconName: string
  themeTitle?: string
  mobileTitle?: string
}

export const cloudmapData: CloudmapItem[] = [
  {
    slug: "wayfinder-x402-integration",
    theme: "Economic Engine",
    title: "Wayfinder x402 Integration",
    status: "In Progress",
    description: "Enhance Wayfinder routing for x402-enabled gateways.",
    iconName: "coins"
  },
  {
    slug: "adoption-through-digital-preservation-initiatives",
    theme: "Adoption & Accessibility",
    title: "Adoption through Digital Preservation Initiatives",
    status: "Continual Focus Area",
    description: "Demonstrate the power of open, verifiable data and its alignment with established preservation standards.",
    iconName: "person-arms-spread"
  },
  {
    slug: "content-moderation-tooling",
    theme: "Adoption & Accessibility",
    title: "Content Moderation Tooling",
    status: "Future",
    description: "Tooling for gateway operators to identify malicious content and moderate it as they see fit.",
    iconName: "person-arms-spread"
  },
  {
    slug: "bridge-the-ario-token",
    theme: "Economic Engine",
    title: "Bridge the $ARIO token",
    status: "Shipped",
    description: "Expanding $ARIO beyond its native environment to connect with new networks and ecosystems. This bridge will make the Permanent Cloud more accessible, liquid, and interoperable.",
    iconName: "coins"
  },
  {
    slug: "arns-decentralized-marketplace",
    theme: "Economic Engine",
    title: "ArNS Decentralized Marketplace",
    status: "In Progress",
    description: "Create an intuitive marketplace where aftermarket for ArNS domains.",
    iconName: "coins"
  },
  {
    slug: "add-x402-support-for-ario",
    theme: "Economic Engine",
    title: "Add x402 Support for $ARIO",
    status: "Future",
    description: "Support x402 payments using $ARIO token.",
    iconName: "coins"
  },
  {
    slug: "built-in-monetization-for-gateway-bundler-uploads",
    theme: "Economic Engine",
    title: "Built in Monetization for Gateway Bundler Uploads",
    status: "In Progress",
    description: "Add x402 payments to support payments to gateways for data uploads.",
    iconName: "coins"
  },
  {
    slug: "performance-observation",
    theme: "Developer Empowerment",
    title: "Performance Observation",
    status: "Shipped",
    description: "Use Wayfinder to track and analyze real-time network performance and behavior.",
    iconName: "cpu"
  },
  {
    slug: "launch-grants-program",
    theme: "Developer Empowerment",
    title: "Launch Grants Program",
    status: "Shipped",
    description: "Launch a grants program that supports builders to launch decentralized apps, tools, and protocols that grow the permaweb.",
    iconName: "cpu"
  },
  {
    slug: "undername-ownership-and-metadata-control",
    theme: "Developer Empowerment",
    title: "Undername Ownership and Metadata Control",
    status: "Shipped",
    description: "Introduces a new capability to Arweave Name Tokens (ANTs) by allowing each record (aka undername) within an ANT to have its own independent owner. https://github.com/ar-io/discussions/discussions/6",
    iconName: "cpu"
  },
  {
    slug: "addressing-bulk-undername-costs",
    theme: "Economic Engine",
    title: "Addressing Bulk Undername Costs",
    status: "Future",
    description: "Introduces a scalable, mathematically sound bulk discount model for purchasing ArNS undernames. https://github.com/ar-io/discussions/discussions/3",
    iconName: "coins"
  },
  {
    slug: "seamless-arns-onboarding-for-everyone-crypto",
    theme: "Adoption & Accessibility",
    title: "Seamless ArNS Onboarding for Everyone - Crypto",
    status: "Shipped",
    description: "Enable ArNS purchases with popular cryptocurrencies like ETH to eliminate onboarding friction for new users.",
    iconName: "person-arms-spread",
    themeTitle: "theme 2",
    mobileTitle: "ArNS Onboarding"
  },
  {
    slug: "gateway-hardening-via-tees",
    theme: "Infrastructure Expansion",
    title: "Gateway Hardening via TEEs",
    status: "Future",
    description: "Investigate the role of Trusted Execution Environments (TEEs) in enhancing the integrity, verifiability, and decentralization of ar.io gateway operations.",
    iconName: "buildings"
  },
  {
    slug: "locking-in-immutability",
    theme: "Network Autonomy",
    title: "Locking in Immutability",
    status: "Future",
    description: "Remove multisig controls and finalize the protocol's core logic so it can never be changed or censored.",
    iconName: "share-network",
    themeTitle: "theme 2",
    mobileTitle: "Protocol Immutability"
  },
  {
    slug: "trustless-authority-management",
    theme: "Network Autonomy",
    title: "Trustless Authority Management",
    status: "Future",
    description: "Shift ar.io message verification to a decentralized, trustless AO model, reducing reliance on core operators.",
    iconName: "share-network",
    themeTitle: "theme 2",
    mobileTitle: "Authority Management"
  },
  {
    slug: "rewarding-decentralized-storage",
    theme: "Economic Engine",
    title: "Rewarding Decentralized Storage",
    status: "Future",
    description: "Create a decentralized mining pool protocol that incentivizes gateways to store, replicate and secure Arweave data, earning $ARIO in return.",
    iconName: "coins",
    themeTitle: "theme 2",
    mobileTitle: "Mining Pool Protocol"
  },
  {
    slug: "marketplace-for-data-indexing",
    theme: "Economic Engine",
    title: "Marketplace for Data Indexing",
    status: "Future",
    description: "Launch an onchain indexing protocol and marketplace where users pay $ARIO to request custom indexing tasks from gateways.",
    iconName: "coins"
  },
  {
    slug: "built-in-monetization-for-egress",
    theme: "Economic Engine",
    title: "Built-In Monetization for Gateway Egress",
    status: "Shipped",
    description: "Leverage x402 payment protocol to support payments for gateway egress",
    iconName: "coins"
  },
  {
    slug: "expand-the-observation-protocol",
    theme: "Economic Engine",
    title: "Expand the Observation Protocol",
    status: "In Progress",
    description: "Expand the Observation Protocol's monitoring and reporting of ar.io network gateways, improving the network's health and reliability.",
    iconName: "coins"
  },
  {
    slug: "smoother-gateway-operator-experiences",
    theme: "Infrastructure Expansion",
    title: "Smoother Gateway Operator Experiences",
    status: "Continual Focus Area",
    description: "Improve deployment, monitoring, error handling, and day to day management for operators managing ar.io nodes.",
    iconName: "buildings"
  },
  {
    slug: "faster-state-reads-at-scale",
    theme: "Infrastructure Expansion",
    title: "Hyperbeam-Powered State Reads",
    status: "In Progress",
    description: "Enable the ar.io network process to use AO Hyperbeam for high-speed read access to network information like names, gateways and token balances, improving performance across the network and downstream apps.",
    iconName: "buildings"
  },
  {
    slug: "intelligent-data-prioritization-and-verification",
    theme: "Infrastructure Expansion",
    title: "Intelligent Caching and Verification",
    status: "Shipped",
    description: "Optimize how gateways cache and verify popular content to improve responsiveness and data reliability.",
    iconName: "buildings",
    themeTitle: "theme 2",
    mobileTitle: "Caching & Verification"
  },
  {
    slug: "build-faster-smarter-easier",
    theme: "Developer Empowerment",
    title: "Build Faster, Smarter, Easier",
    status: "Continual Focus Area",
    description: "Continuously improving docs, SDKs, and onboarding tools to create a world-class developer experience.",
    iconName: "cpu"
  },
  {
    slug: "rewind-the-permaweb",
    theme: "Developer Empowerment",
    title: "Rewind the Permaweb",
    status: "Shipped",
    description: "Develop a \"Wayback App and Toolset\" to rewind the permaweb by surfacing any historical ArNS information, like old expired names. https://github.com/ar-io/ar-io-grants/issues/36",
    iconName: "cpu"
  },
  {
    slug: "ar-io-extensions-library",
    theme: "Adoption & Accessibility",
    title: "Gateway Extensions Library",
    status: "Shipped",
    description: "Launch a curated library of optional gateway extensions and modules to enhance gateway functionality and encourage community-driven innovation.",
    iconName: "person-arms-spread",
    themeTitle: "theme 2",
    mobileTitle: "Gateway Extensions"
  },
  {
    slug: "expanding-wallet-support",
    theme: "Developer Empowerment",
    title: "Multi-Chain Wallet Integration",
    status: "In Progress",
    description: "Quickly onboard users from new ecosystems, like Solana, by enabling supporting their native wallets across ar.io protocols and apps.",
    iconName: "cpu"
  },
  {
    slug: "dropping-the-dot-com-with-wayfinder",
    theme: "Developer Empowerment",
    title: "Dropping the dot com with Wayfinder",
    status: "Shipped",
    description: "Develop and launch a beta of the Wayfinder protocol, making ar:// content discovery fast, verifiable, and location-independent.",
    iconName: "cpu"
  },
  {
    slug: "fueling-innovation-through-funding",
    theme: "Developer Empowerment",
    title: "Innovation Through Funding",
    status: "Continual Focus Area",
    description: "Steward a grants program to empower developers building the next generation of permaweb apps.",
    iconName: "cpu"
  },
  {
    slug: "support-more-payment-options",
    theme: "Adoption & Accessibility",
    title: "Expanded Payment Support",
    status: "Shipped",
    description: "Add new payment options and supported cryptocurrencies within ar.io payment services.",
    iconName: "person-arms-spread"
  },
  {
    slug: "increase-ario-utility",
    theme: "Economic Engine",
    title: "Pay For Uploads with $ARIO",
    status: "Shipped",
    description: "Enable $ARIO as an option within ar.io payment services for use with uploading data to Arweave.",
    iconName: "coins"
  },
  {
    slug: "fair-transparent-message-ordering",
    theme: "Network Autonomy",
    title: "Decentralized Sequencing",
    status: "Future",
    description: "Introduce AO decentralized sequencing to eliminate single points of failure in message processing.",
    iconName: "share-network"
  },
  {
    slug: "sustainable-economics-for-compute",
    theme: "Network Autonomy",
    title: "Sustainable Economics for Compute",
    status: "Future",
    description: "Introduce gas fees for AO-based actions in the network to prevent spam, ensure scalability and fund infrastructure growth, without impacting user experiences.",
    iconName: "share-network"
  },
  {
    slug: "fast-index-bootstrapping-for-new-gateways",
    theme: "Infrastructure Expansion",
    title: "Fast Index Bootstrapping for New Gateways",
    status: "Shipped",
    description: "Provide tooling for gateway operators to quickly extract and load index data, reducing time to utility for querying any data set stored on Arweave.",
    iconName: "buildings",
    themeTitle: "theme 2",
    mobileTitle: "Gateway Indexing"
  },
  {
    slug: "test-before-you-deploy",
    theme: "Developer Empowerment",
    title: "Test Before You Deploy",
    status: "Shipped",
    description: "A robust testnet and faucet that makes it easy to experiment with ArNS and gateway features risk-free.",
    iconName: "cpu"
  },
  {
    slug: "seamless-arns-onboarding-for-everyone",
    theme: "Adoption & Accessibility",
    title: "Seamless ArNS Onboarding for Everyone - Fiat",
    status: "Shipped",
    description: "Enable ArNS purchases with credit cards to eliminate onboarding friction for new users.",
    iconName: "person-arms-spread",
    themeTitle: "theme 2",
    mobileTitle: "ArNS Onboarding"
  },
  {
    slug: "bringing-ar-io-to-new-communities",
    theme: "Adoption & Accessibility",
    title: "Community Growth Campaigns",
    status: "Continual Focus Area",
    description: "Engage new userbases and ecosystems that are synergistic with the ar.io network and the permanent web through fair and transparent reward mechanisms.",
    iconName: "person-arms-spread"
  },
  {
    slug: "boosting-market-access",
    theme: "Adoption & Accessibility",
    title: "Boosting Market Access",
    status: "Continual Focus Area",
    description: "Increase token availability and accessibility to new markets around the world.",
    iconName: "person-arms-spread"
  },
  {
    slug: "unlocking-strategic-growth",
    theme: "Adoption & Accessibility",
    title: "Strategic Partnerships for Ecosystem Expansion",
    status: "Continual Focus Area",
    description: "Form new partnerships to increase usage, expand integrations, and bring in new developers into the ar.io ecosystem.",
    iconName: "person-arms-spread"
  },
  {
    slug: "integrate-once-reach-all",
    theme: "Adoption & Accessibility",
    title: "Integrate Once, Reach All",
    status: "Continual Focus Area",
    description: "Enable more apps and protocols to plug into ar.io's core services: uploading, hosting, querying, and naming.",
    iconName: "person-arms-spread"
  }
]

// Re-export for backwards compatibility
export const statuses = CLOUDMAP_STATUS_ORDER
export { type Status }

export const themes = CLOUDMAP_THEME_ORDER
export { type Theme }
