import type { LucideIcon } from "lucide-react";
import { Brain, Globe, HardDrive, Database, Users, Shapes, File } from "lucide-react";

/**
 * Use case display metadata: icons and short descriptions.
 * Titles come from MDX frontmatter in content/use-cases/
 * Order is automatic (alphabetical by title).
 */
export const USE_CASE_METADATA: Record<
  string,
  { icon: LucideIcon; shortDescription: string }
> = {
  "file-storage": {
    icon: HardDrive,
    shortDescription: "Ensure long-term access to critical files",
  },
  "durable-media": {
    icon: File,
    shortDescription: "Preserve media with provenance",
  },
  "digital-assets": {
    icon: Shapes,
    shortDescription: "Create composable digital assets",
  },
  "oracles-and-onchain-data": {
    icon: Database,
    shortDescription: "Archive oracle feeds and onchain data",
  },
  "sites-and-apps": {
    icon: Globe,
    shortDescription: "Deploy web apps without link rot",
  },
  "user-platforms": {
    icon: Users,
    shortDescription: "Publish user content that lasts",
  },
  "verifiable-ai": {
    icon: Brain,
    shortDescription: "Train, verify, and audit AI data and models",
  },
};

