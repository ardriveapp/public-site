"use client";

import Link from "next/link";
import { ChevronRight, HardDrive, Fingerprint, Lock, RefreshCw, Globe, Network, ShieldCheck, Unplug, DollarSign } from "lucide-react";
import { ZeroDataLostBadge } from "@/components/ZeroDataLostBadge";
import { RotatingZeroText } from "./RotatingZeroText";
import { BaseImage } from "@/components/base-image";
import { HeroBackgroundVideo } from "@/components/home/HeroBackgroundVideo";
import { ContactUsTrigger } from "@/components/contact/ContactUsTrigger";
import {
  CASE_STUDY_WIDTH_CLASS,
  SITE_CONTAINER_CLASS,
  WIDTH_XNARROW_CLASS,
} from "@/components/site-container";
import { FeaturedLogosRow } from "@/components/featured-logos/FeaturedLogosRow";
import type { EcosystemItem } from "@/lib/ecosystem";
import { useState, useEffect } from "react";
import type { LucideIcon } from "lucide-react";
import { Image, FileVideo, FileText, FileCode, Database, Music, Box } from "lucide-react";

/* ==========================================================================
   Shield Diagram Component - Protection Nodes
   ========================================================================== */

interface ProtectionNode {
  icon: LucideIcon;
  title: string;
  description: string;
  outcome: string;
}

const protectionNodes: ProtectionNode[] = [
  // Top row (left to right)
  {
    icon: DollarSign,
    title: "Paid in Full",
    description: "No outages due to missed payments.",
    outcome: "Low, long-term TCO",
  },
  {
    icon: Fingerprint,
    title: "Provably Authentic",
    description: "Cryptographic proof that data hasn't been altered.",
    outcome: "Audit-ready integrity verification",
  },
  {
    icon: Lock,
    title: "Cannot Be Changed",
    description: "Immutable once written. Cannot be modified, deleted, or encrypted.",
    outcome: "Ransomware-proof by design",
  },
  // Bottom row (left to right)
  {
    icon: Unplug,
    title: "Never Locked In",
    description: "Access data from any gateway. Switch providers anytime.",
    outcome: "Zero vendor lock-in",
  },
  {
    icon: Globe,
    title: "Always Accessible",
    description: "Global gateway network with built-in redundancy.",
    outcome: "No single point of failure",
  },
  {
    icon: Network,
    title: "No Single Dependency",
    description: "Distributed network—no single company controls access.",
    outcome: "Survives any vendor shutdown",
  },
];

interface HeroImpactStat {
  value: string;
  label: string;
}

const heroImpactStats: HeroImpactStat[] = [
  {
    value: "$4,400,000",
    label: "Avg. ransomware loss per incident",
  },
  {
    value: "$3,360,000",
    label: "Avg. downtime loss per incident",
  },
];

function ProtectionNodeCard({ node }: { node: ProtectionNode }) {
  const Icon = node.icon;
  return (
    <div className="group rounded-lg border border-[#5427C8]/30 bg-fd-card px-4 py-3 shadow-sm transition-all hover:border-[#5427C8]/50 hover:shadow-md">
      <div className="flex items-start gap-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#5427C8]/30 bg-fd-background/70 shadow-sm mt-0.5">
          <Icon className="size-4 text-fd-primary" />
        </div>
        <div className="min-w-0">
          <h4 className="text-base font-semibold text-fd-foreground">{node.title}</h4>
          <p className="text-sm leading-snug text-fd-muted-foreground">
            {node.description}
          </p>
          <p className="mt-0.5 text-xs font-medium text-fd-primary">
            {node.outcome}
          </p>
        </div>
      </div>
    </div>
  );
}

// File icons pool for random animation
const fileIconPool = [Image, FileVideo, FileText, FileCode, Database, Music, HardDrive, Box];

function ShieldDiagram() {
  // Initialize with deterministic order for SSR compatibility, then randomize on client
  const [iconIndices, setIconIndices] = useState(() =>
    [...Array(18).keys()] // Deterministic order for SSR
  );

  // Shuffle icons every 10 seconds (synced with animation cycle - all icons invisible at loop boundary)
  useEffect(() => {
    // Initial randomization after hydration
    setIconIndices([...Array(18).keys()].sort(() => Math.random() - 0.5));

    const interval = setInterval(() => {
      setIconIndices(
        [...Array(fileIconPool.length).keys()]
          .sort(() => Math.random() - 0.5)
          .concat([...Array(fileIconPool.length).keys()].sort(() => Math.random() - 0.5))
          .concat([...Array(fileIconPool.length).keys()].sort(() => Math.random() - 0.5))
          .slice(0, 18)
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const getIcon = (index: number) => {
    const IconComponent = fileIconPool[iconIndices[index] % fileIconPool.length];
    return <IconComponent className="size-5 text-fd-primary/70" />;
  };

  return (
    <div className="relative">
      {/* Mobile Layout: Just the cards stacked */}
      <div className="grid gap-3 sm:grid-cols-2 lg:hidden">
        {protectionNodes.map((node) => (
          <ProtectionNodeCard key={node.title} node={node} />
        ))}
      </div>

      {/* Desktop Layout: Hexagonal arrangement around center */}
      <div className="hidden lg:block">
        <div className="relative mx-auto" style={{ height: "500px", maxWidth: "960px" }}>
          {/* SVG Connection Lines */}
          <svg
            className="pointer-events-none absolute inset-0 size-full"
            viewBox="0 0 880 480"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Dashed line style */}
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(84, 39, 200)" stopOpacity="0.15" />
                <stop offset="50%" stopColor="rgb(84, 39, 200)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="rgb(84, 39, 200)" stopOpacity="0.15" />
              </linearGradient>
            </defs>

            {/* Connection lines from center (440, 240) to each hexagonal node */}
            {/* 12 o'clock - Top */}
            <line x1="440" y1="240" x2="440" y2="55" stroke="rgb(84, 39, 200)" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="4 3" />
            {/* 2 o'clock - Top Right */}
            <line x1="440" y1="240" x2="770" y2="115" stroke="url(#lineGradient)" strokeWidth="1.5" strokeDasharray="4 3" />
            {/* 4 o'clock - Bottom Right */}
            <line x1="440" y1="240" x2="770" y2="365" stroke="url(#lineGradient)" strokeWidth="1.5" strokeDasharray="4 3" />
            {/* 6 o'clock - Bottom */}
            <line x1="440" y1="240" x2="440" y2="425" stroke="rgb(84, 39, 200)" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="4 3" />
            {/* 8 o'clock - Bottom Left */}
            <line x1="440" y1="240" x2="110" y2="365" stroke="url(#lineGradient)" strokeWidth="1.5" strokeDasharray="4 3" />
            {/* 10 o'clock - Top Left */}
            <line x1="440" y1="240" x2="110" y2="115" stroke="url(#lineGradient)" strokeWidth="1.5" strokeDasharray="4 3" />
          </svg>

          {/* Animated File Icons - 3 per path for rich organic flow */}
          <div className="pointer-events-none absolute inset-0">
            {/* 12 o'clock - Top - 3 icons */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatTopA_10s_ease-in-out_infinite]">
              {getIcon(0)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatTopB_10s_ease-in-out_infinite]">
              {getIcon(1)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatTopC_10s_ease-in-out_infinite]">
              {getIcon(2)}
            </div>
            {/* 2 o'clock - Top Right - 3 icons */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatTopRightA_10s_ease-in-out_infinite]">
              {getIcon(3)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatTopRightB_10s_ease-in-out_infinite]">
              {getIcon(4)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatTopRightC_10s_ease-in-out_infinite]">
              {getIcon(5)}
            </div>
            {/* 4 o'clock - Bottom Right - 3 icons */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatBottomRightA_10s_ease-in-out_infinite]">
              {getIcon(6)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatBottomRightB_10s_ease-in-out_infinite]">
              {getIcon(7)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatBottomRightC_10s_ease-in-out_infinite]">
              {getIcon(8)}
            </div>
            {/* 6 o'clock - Bottom - 3 icons */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatBottomA_10s_ease-in-out_infinite]">
              {getIcon(9)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatBottomB_10s_ease-in-out_infinite]">
              {getIcon(10)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatBottomC_10s_ease-in-out_infinite]">
              {getIcon(11)}
            </div>
            {/* 8 o'clock - Bottom Left - 3 icons */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatBottomLeftA_10s_ease-in-out_infinite]">
              {getIcon(12)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatBottomLeftB_10s_ease-in-out_infinite]">
              {getIcon(13)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatBottomLeftC_10s_ease-in-out_infinite]">
              {getIcon(14)}
            </div>
            {/* 10 o'clock - Top Left - 3 icons */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatTopLeftA_10s_ease-in-out_infinite]">
              {getIcon(15)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatTopLeftB_10s_ease-in-out_infinite]">
              {getIcon(16)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatTopLeftC_10s_ease-in-out_infinite]">
              {getIcon(17)}
            </div>
          </div>

          {/* Central Shield - prominently in the middle */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="absolute -inset-4 animate-[shieldPulse_2.5s_ease-in-out_infinite] rounded-full bg-fd-primary blur-lg" />
              <div className="absolute -inset-2 rounded-full bg-fd-primary/15 blur-md" />
              <div className="relative flex size-24 flex-col items-center justify-center rounded-full border-2 border-fd-primary/40 bg-fd-background shadow-xl">
                <ShieldCheck className="size-7 text-fd-primary" />
                <span className="mt-0.5 text-center text-[9px] font-bold leading-tight text-fd-foreground">Your Data,<br />Files & Apps</span>
              </div>
            </div>
          </div>

          {/* Protection Nodes - Hexagonal arrangement */}
          {/* 12 o'clock - Top */}
          <div className="absolute left-1/2 top-0 w-[260px] -translate-x-1/2">
            <ProtectionNodeCard node={protectionNodes[0]} />
          </div>
          {/* 2 o'clock - Top Right */}
          <div className="absolute right-0 top-[60px] w-[260px]">
            <ProtectionNodeCard node={protectionNodes[1]} />
          </div>
          {/* 4 o'clock - Bottom Right */}
          <div className="absolute bottom-[60px] right-0 w-[260px]">
            <ProtectionNodeCard node={protectionNodes[2]} />
          </div>
          {/* 6 o'clock - Bottom */}
          <div className="absolute bottom-0 left-1/2 w-[260px] -translate-x-1/2">
            <ProtectionNodeCard node={protectionNodes[3]} />
          </div>
          {/* 8 o'clock - Bottom Left */}
          <div className="absolute bottom-[60px] left-0 w-[260px]">
            <ProtectionNodeCard node={protectionNodes[4]} />
          </div>
          {/* 10 o'clock - Top Left */}
          <div className="absolute left-0 top-[60px] w-[260px]">
            <ProtectionNodeCard node={protectionNodes[5]} />
          </div>
        </div>
      </div>

      {/* CSS Keyframes - 18 icons for compact hexagonal layout */}
      <style jsx>{`
        /* Shield pulse - radiating glow effect */
        @keyframes shieldPulse {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.15); opacity: 0.4; }
        }

        /* Randomized departure order (not clockwise): Top, BottomRight, TopLeft, Bottom, TopRight, BottomLeft... */
        /* 18 icons spaced ~5% apart, 20% travel time */

        /* 12 o'clock - Top: departs at 0%, 50%, 65% */
        @keyframes fileFloatTopA {
          0%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          2% { transform: translate(-50%, -50%); opacity: 1; }
          22% { transform: translate(-50%, calc(-50% - 165px)); opacity: 1; }
          24% { transform: translate(-50%, calc(-50% - 165px)); opacity: 0; }
        }
        @keyframes fileFloatTopB {
          0%, 50%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          52% { transform: translate(-50%, -50%); opacity: 1; }
          72% { transform: translate(-50%, calc(-50% - 165px)); opacity: 1; }
          74% { transform: translate(-50%, calc(-50% - 165px)); opacity: 0; }
        }
        @keyframes fileFloatTopC {
          0%, 65%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          67% { transform: translate(-50%, -50%); opacity: 1; }
          87% { transform: translate(-50%, calc(-50% - 165px)); opacity: 1; }
          89% { transform: translate(-50%, calc(-50% - 165px)); opacity: 0; }
        }

        /* 2 o'clock - Top Right: departs at 20%, 30%, 75% */
        @keyframes fileFloatTopRightA {
          0%, 20%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          22% { transform: translate(-50%, -50%); opacity: 1; }
          42% { transform: translate(calc(-50% + 295px), calc(-50% - 100px)); opacity: 1; }
          44% { transform: translate(calc(-50% + 295px), calc(-50% - 100px)); opacity: 0; }
        }
        @keyframes fileFloatTopRightB {
          0%, 30%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          32% { transform: translate(-50%, -50%); opacity: 1; }
          52% { transform: translate(calc(-50% + 295px), calc(-50% - 100px)); opacity: 1; }
          54% { transform: translate(calc(-50% + 295px), calc(-50% - 100px)); opacity: 0; }
        }
        @keyframes fileFloatTopRightC {
          0%, 75%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          77% { transform: translate(-50%, -50%); opacity: 1; }
          97% { transform: translate(calc(-50% + 295px), calc(-50% - 100px)); opacity: 1; }
          99% { transform: translate(calc(-50% + 295px), calc(-50% - 100px)); opacity: 0; }
        }

        /* 4 o'clock - Bottom Right: departs at 5%, 45%, 60% */
        @keyframes fileFloatBottomRightA {
          0%, 5%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          7% { transform: translate(-50%, -50%); opacity: 1; }
          27% { transform: translate(calc(-50% + 295px), calc(-50% + 100px)); opacity: 1; }
          29% { transform: translate(calc(-50% + 295px), calc(-50% + 100px)); opacity: 0; }
        }
        @keyframes fileFloatBottomRightB {
          0%, 45%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          47% { transform: translate(-50%, -50%); opacity: 1; }
          67% { transform: translate(calc(-50% + 295px), calc(-50% + 100px)); opacity: 1; }
          69% { transform: translate(calc(-50% + 295px), calc(-50% + 100px)); opacity: 0; }
        }
        @keyframes fileFloatBottomRightC {
          0%, 60%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          62% { transform: translate(-50%, -50%); opacity: 1; }
          82% { transform: translate(calc(-50% + 295px), calc(-50% + 100px)); opacity: 1; }
          84% { transform: translate(calc(-50% + 295px), calc(-50% + 100px)); opacity: 0; }
        }

        /* 6 o'clock - Bottom: departs at 15%, 35%, 80% */
        @keyframes fileFloatBottomA {
          0%, 15%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          17% { transform: translate(-50%, -50%); opacity: 1; }
          37% { transform: translate(-50%, calc(-50% + 165px)); opacity: 1; }
          39% { transform: translate(-50%, calc(-50% + 165px)); opacity: 0; }
        }
        @keyframes fileFloatBottomB {
          0%, 35%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          37% { transform: translate(-50%, -50%); opacity: 1; }
          57% { transform: translate(-50%, calc(-50% + 165px)); opacity: 1; }
          59% { transform: translate(-50%, calc(-50% + 165px)); opacity: 0; }
        }
        @keyframes fileFloatBottomC {
          0%, 80%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          82% { transform: translate(-50%, -50%); opacity: 1; }
          98% { transform: translate(-50%, calc(-50% + 165px)); opacity: 1; }
          99% { transform: translate(-50%, calc(-50% + 165px)); opacity: 0; }
        }

        /* 8 o'clock - Bottom Left: departs at 25%, 55%, 70% */
        @keyframes fileFloatBottomLeftA {
          0%, 25%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          27% { transform: translate(-50%, -50%); opacity: 1; }
          47% { transform: translate(calc(-50% - 295px), calc(-50% + 100px)); opacity: 1; }
          49% { transform: translate(calc(-50% - 295px), calc(-50% + 100px)); opacity: 0; }
        }
        @keyframes fileFloatBottomLeftB {
          0%, 55%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          57% { transform: translate(-50%, -50%); opacity: 1; }
          77% { transform: translate(calc(-50% - 295px), calc(-50% + 100px)); opacity: 1; }
          79% { transform: translate(calc(-50% - 295px), calc(-50% + 100px)); opacity: 0; }
        }
        @keyframes fileFloatBottomLeftC {
          0%, 70%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          72% { transform: translate(-50%, -50%); opacity: 1; }
          92% { transform: translate(calc(-50% - 295px), calc(-50% + 100px)); opacity: 1; }
          94% { transform: translate(calc(-50% - 295px), calc(-50% + 100px)); opacity: 0; }
        }

        /* 10 o'clock - Top Left: departs at 10%, 40%, 85% */
        @keyframes fileFloatTopLeftA {
          0%, 10%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          12% { transform: translate(-50%, -50%); opacity: 1; }
          32% { transform: translate(calc(-50% - 295px), calc(-50% - 100px)); opacity: 1; }
          34% { transform: translate(calc(-50% - 295px), calc(-50% - 100px)); opacity: 0; }
        }
        @keyframes fileFloatTopLeftB {
          0%, 40%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          42% { transform: translate(-50%, -50%); opacity: 1; }
          62% { transform: translate(calc(-50% - 295px), calc(-50% - 100px)); opacity: 1; }
          64% { transform: translate(calc(-50% - 295px), calc(-50% - 100px)); opacity: 0; }
        }
        @keyframes fileFloatTopLeftC {
          0%, 85%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          87% { transform: translate(-50%, -50%); opacity: 1; }
          99% { transform: translate(calc(-50% - 295px), calc(-50% - 100px)); opacity: 1; }
          100% { transform: translate(calc(-50% - 295px), calc(-50% - 100px)); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function SecondaryCta({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const isExternal = /^https?:\/\//i.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-background/70 px-4 py-2 text-sm font-semibold text-fd-foreground hover:bg-fd-accent transition-colors"
      >
        {children}
        <ChevronRight className="size-4" />
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-background/70 px-4 py-2 text-sm font-semibold text-fd-foreground hover:bg-fd-accent transition-colors"
    >
      {children}
      <ChevronRight className="size-4" />
    </Link>
  );
}

function PersonaCardButton({
  href,
  children,
  variant = "filled",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "filled" | "outline";
}) {
  const isContactLink = href === "#contact" || href === "/#contact";

  if (isContactLink) {
    if (variant === "outline") {
      return (
        <ContactUsTrigger
          className="inline-flex items-center justify-center rounded-full border border-[#23232D] bg-transparent px-4 py-2 text-sm font-semibold text-[#23232D] hover:bg-[#23232D]/5 transition-colors"
        >
          {children}
        </ContactUsTrigger>
      );
    }

    return (
      <ContactUsTrigger
        className="inline-flex items-center justify-center rounded-full bg-[#23232D] px-4 py-2 text-sm font-semibold text-[#F0F0F0] hover:opacity-90 transition-opacity"
      >
        {children}
      </ContactUsTrigger>
    );
  }

  if (variant === "outline") {
    return (
      <Link
        href={href}
        className="inline-flex items-center justify-center rounded-full border border-[#23232D] bg-transparent px-4 py-2 text-sm font-semibold text-[#23232D] hover:bg-[#23232D]/5 transition-colors"
      >
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full bg-[#23232D] px-4 py-2 text-sm font-semibold text-[#F0F0F0] hover:opacity-90 transition-opacity"
    >
      {children}
    </Link>
  );
}

interface PersonaCardProps {
  kicker: string;
  title: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  /**
   * Optional image behavior overrides (lets each card tune cropping/positioning).
   * Defaults match the current "cropped hero" style.
   */
  imageFitClassName?: "object-cover" | "object-contain";
  imagePositionClassName?: string;
  imageWrapperClassName?: string;
  imageExtraClassName?: string;
}

function PersonaCard({
  kicker,
  title,
  description,
  href,
  imageSrc,
  imageAlt,
  imageFitClassName = "object-cover",
  imagePositionClassName = "object-top",
  imageWrapperClassName = "relative -mt-[2.5rem] flex-1 w-full overflow-hidden z-20 bg-transparent",
  imageExtraClassName = "",
}: PersonaCardProps) {
  const isExternalImage = /^https?:\/\//i.test(imageSrc);

  return (
    <Link
      href={href}
      className="group relative flex h-full min-h-[600px] flex-col overflow-hidden rounded-[2rem] border border-fd-border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-primary focus-visible:ring-offset-2"
      style={{
        background:
          "radial-gradient(120% 80% at 50% 35%, rgba(223, 214, 247, 0) 0%, rgba(223, 214, 247, 0) 32%, rgba(223, 214, 247, 0.6) 72%, rgb(223 214 247) 100%), linear-gradient(180deg, rgb(var(--color-fd-card)) 0%, rgb(var(--color-fd-card)) 33%, rgb(223 214 247) 100%)",
      }}
      aria-label={`Learn more about ${title}`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fd-primary/5 to-fd-primary/10 opacity-[0.02] transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative p-8 pb-0 mb-[-2.5rem] bg-transparent">
        <div className="text-center text-xs font-semibold tracking-widest text-fd-muted-foreground">
          {kicker}
        </div>
        <h3 className="mt-2 text-center text-3xl font-bold tracking-tight">{title}</h3>
        <p className="mt-3 mx-auto max-w-sm text-center text-sm leading-6 text-fd-muted-foreground">
          {description.includes("Pay once - access forever") ? (
            <>
              {description.split("Pay once - access forever")[0]}
              <span className="font-semibold">Pay once - access forever</span>
            </>
          ) : (
            description
          )}
        </p>
      </div>

      <div className={imageWrapperClassName}>
        {isExternalImage ? (
          // Use <img> for external sources to avoid Next Image remote config friction.
          <img
            src={imageSrc}
            alt={imageAlt}
            loading="lazy"
            className={`relative z-10 h-full w-full ${imageFitClassName} ${imagePositionClassName} ${imageExtraClassName} grayscale transition-all duration-300 group-hover:scale-[1.02] group-hover:grayscale-0`}
          />
        ) : (
          <BaseImage
            src={imageSrc}
            alt={imageAlt}
            fill
            className={`${imageFitClassName} ${imagePositionClassName} ${imageExtraClassName} z-10 grayscale transition-all duration-300 group-hover:scale-[1.02] group-hover:grayscale-0`}
            sizes="(min-width: 1024px) 33vw, 100vw"
            priority={false}
          />
        )}
      </div>
    </Link>
  );
}

function FeatureCard({
  title,
  subtitle,
  description,
  secondParagraph,
  whyItMatters,
}: {
  title: string;
  subtitle: string;
  description: string;
  secondParagraph?: string;
  whyItMatters?: string;
}) {
  return (
    <div 
      className="relative overflow-hidden rounded-2xl border border-fd-border p-6 shadow-sm"
      style={{ background: 'radial-gradient(ellipse 150% 100% at 20% 20%, rgb(var(--color-fd-card)), rgb(84 39 200 / 0.02))' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent via-50% to-fd-primary/10" />
      <div className="relative">
      <div className="text-center text-xs font-semibold uppercase tracking-widest text-fd-muted-foreground">
        {subtitle}
      </div>
      <h3 className="mx-auto mt-2.5 max-w-[22ch] text-balance text-center text-xl font-bold leading-tight text-fd-foreground">
        {title}
      </h3>
      <p className="mx-auto mt-3 max-w-[44ch] text-pretty text-center text-base leading-7 text-fd-muted-foreground">
        {description}
      </p>
      {secondParagraph && (
        <p className="mx-auto mt-3 max-w-[44ch] text-pretty text-center text-base leading-7 text-fd-muted-foreground">
          {secondParagraph}
        </p>
      )}
      {whyItMatters && (
        <div className="mt-4 text-center">
          <div className="text-xs font-semibold text-fd-foreground">
            Why it matters
          </div>
          <p className="mx-auto mt-1.5 max-w-[44ch] text-pretty text-center text-base leading-7 text-fd-muted-foreground">
            {whyItMatters}
          </p>
        </div>
      )}
      </div>
    </div>
  );
}

function StatisticsCard({
  number,
  description,
  imageSrc,
  imageAlt,
}: {
  number: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <div
      className={`flex h-full ${WIDTH_XNARROW_CLASS} flex-col overflow-hidden rounded-2xl border border-fd-border bg-fd-card shadow-sm`}
    >
      <div className="px-8 pt-8 text-center">
        <div
          className="whitespace-nowrap text-3xl font-bold text-[#5427C8] md:text-3xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {number}
        </div>
        <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
          {description}
        </p>
      </div>

      <div className="mt-auto p-6 pt-7">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
          <BaseImage
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
        </div>
      </div>
    </div>
  );
}

export function HomePage({ featuredItems }: { featuredItems: EcosystemItem[] }) {
  return (
    <main
      style={{
        background:
          "linear-gradient(to bottom, rgb(var(--color-fd-background)) 0%, rgb(var(--color-fd-background)) 33%, rgb(223 214 247) 66%, rgb(223 214 247) 100%)",
      }}
    >
      {/* Font Hierarchy:
          - Hero H1: text-6xl (largest, most prominent)
          - Main section H2: text-5xl (major sections like "The critical data protector", "Securing the worlds data")
          - Stats section H2: text-4xl md:text-5xl (responsive, contextually smaller due to badge above)
          - Persona cards H3: text-3xl
          - Feature cards H3: text-lg (intentionally smaller for dense 3-column grid)
          - All kickers: text-xs tracking-widest (standardized for consistency)
      */}
      <section className="pb-12 pt-10">
        <div className={SITE_CONTAINER_CLASS}>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-fd-card lg:min-h-[560px] xl:aspect-[2/1]">
            {/* Background (static on small screens, video on large screens) */}
            <BaseImage
              src="/home/hero-background.png"
              alt=""
              fill
              priority
              className="object-cover lg:hidden"
              sizes="(min-width: 1024px) 1200px, 100vw"
            />
            {/* Mobile-only donut artwork overlay */}
            <BaseImage
              src="/home/hero-donut.png"
              alt=""
              aria-hidden="true"
              fill
              className="pointer-events-none object-contain object-right-bottom opacity-90 md:hidden translate-x-10 translate-y-6"
              sizes="(max-width: 767px) 100vw, 0vw"
              priority={false}
            />
            <HeroBackgroundVideo className="absolute inset-0 hidden h-full w-full object-cover lg:block" />
            {/* Light overlay for text readability - full on mobile, gradient on desktop */}
            <div className="absolute inset-0 bg-white/70 lg:hidden" />
            <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-fd-background/85 via-fd-background/30 to-transparent" />

            <div className="relative grid gap-10 px-8 py-14 md:px-14 md:py-16 lg:py-20 lg:grid-cols-2 lg:items-center">
              <div className="min-w-0">
                <ZeroDataLostBadge />

                <h1 className="mt-6 text-balance text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                  <RotatingZeroText />
                </h1>

                <p className="mt-3 max-w-xl text-pretty text-base leading-7 text-fd-muted-foreground">
                  Ar.io is the verification layer for AI and digital systems
                </p>

                <ul className="mt-6 space-y-3 text-sm text-fd-muted-foreground">
                  <li className="flex items-center gap-3">
                    <span className="inline-flex size-5 shrink-0 items-center justify-center rounded bg-fd-foreground">
                      <BaseImage
                        src="/icons/checkbox.svg"
                        alt=""
                        aria-hidden="true"
                        width={16}
                        height={16}
                        className="size-4"
                      />
                    </span>
                    <span className="font-semibold text-fd-foreground/90">
                      <span className="font-semibold text-fd-foreground">
                        Provable, immutable, independent
                      </span>
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-flex size-5 shrink-0 items-center justify-center rounded bg-fd-foreground">
                      <BaseImage
                        src="/icons/checkbox.svg"
                        alt=""
                        aria-hidden="true"
                        width={16}
                        height={16}
                        className="size-4"
                      />
                    </span>
                    <span className="font-semibold text-fd-foreground/90">
                      IP and AI data, verified and traceable
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-flex size-5 shrink-0 items-center justify-center rounded bg-fd-foreground">
                      <BaseImage
                        src="/icons/checkbox.svg"
                        alt=""
                        aria-hidden="true"
                        width={16}
                        height={16}
                        className="size-4"
                      />
                    </span>
                    <span className="font-semibold text-fd-foreground/90">
                      Across systems. Across time.
                    </span>
                  </li>
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <ContactUsTrigger
                    className="inline-flex items-center gap-2 rounded-full bg-[#23232D] px-5 py-2.5 text-sm font-semibold text-[#F0F0F0] hover:opacity-90 transition-opacity"
                  >
                    <BaseImage
                      src="/icons/rocket.svg"
                      alt=""
                      aria-hidden="true"
                      width={16}
                      height={16}
                      className="shrink-0"
                    />
                    Protect Your Data
                  </ContactUsTrigger>
                </div>
              </div>

              {/* Empty right column to preserve spacing vs the balloon artwork */}
              <div className="hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Cost of Not Protecting Your Data Stats Section */}
      <section className="py-16">
        <div className={SITE_CONTAINER_CLASS}>
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-fd-foreground md:text-4xl">
              Cost of Not Protecting Your Data
            </h2>
          </div>

          {/* White box with two numbers */}
          <div className="mx-auto mt-8 max-w-4xl">
            <div 
              className="grid grid-cols-1 rounded-2xl border border-fd-border shadow-sm sm:grid-cols-2"
              style={{ background: "linear-gradient(to bottom right, rgb(var(--color-fd-card)), rgb(var(--color-fd-card)) 85%, rgb(223 214 247) 100%)" }}
            >
              <div 
                className="px-6 py-6 text-center border-b sm:border-b-0 sm:border-r"
                style={{ 
                  borderBottomColor: "rgba(0, 0, 0, 0.1)",
                  borderRightColor: "rgba(0, 0, 0, 0.1)"
                }}
              >
                <div
                  className="whitespace-nowrap text-3xl font-bold text-fd-foreground md:text-4xl"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {heroImpactStats[0].value}
                </div>
                <div className="mt-2 text-sm leading-6 text-fd-muted-foreground">
                  {heroImpactStats[0].label}
                </div>
              </div>
              <div className="px-6 py-6 text-center">
                <div
                  className="whitespace-nowrap text-3xl font-bold text-fd-foreground md:text-4xl"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {heroImpactStats[1].value}
                </div>
                <div className="mt-2 text-sm leading-6 text-fd-muted-foreground">
                  {heroImpactStats[1].label}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Persona Cards Section */}
      <section className="pb-12 pt-8">
        <div className={SITE_CONTAINER_CLASS}>
          <div className="grid gap-6 lg:grid-cols-3">
            <PersonaCard
              kicker="DOWNTIME & RANSOMWARE PROTECTION"
              title="Enterprise"
              description="Protect critical data from attack, outage, and access failure. Keep business critical data online no matter what."
              href="/enterprise"
              imageSrc="/home/personas-enterprise.png"
              imageAlt="Modern office tower exterior"
              imageExtraClassName="-translate-y-0 md:translate-y-6"
            />
            <PersonaCard
              kicker="PROTECT USER & PRODUCT DATA"
              title="User Platforms"
              description="Ensure user & AI generated data remains accessible, intact, and independent of platform failure. Pay once - access forever."
              href="/platforms"
              imageSrc="/home/personas-platforms.png"
              imageAlt="A person holding a DSLR camera"
              imageFitClassName="object-contain"
              imagePositionClassName="object-bottom"
              imageWrapperClassName="relative mt-2 flex-1 w-full overflow-hidden z-20 bg-transparent"
              imageExtraClassName="-translate-y-0 md:translate-y-10"
            />
            <PersonaCard
              kicker="ESSENTIAL DATA & RECORDS"
              title="Institutions"
              description="Archive & safeguard data that must remain available today and decades from now. Pay once - access forever."
              href="/institutions"
              imageSrc="/home/personas-institutions.png"
              imageAlt="Library stacks in a public institution"
              imageFitClassName="object-contain"
              imagePositionClassName="object-bottom"
              imageWrapperClassName="relative mt-2 flex-1 w-full overflow-hidden z-20 bg-transparent"
              imageExtraClassName="-translate-y-0 md:-translate-y-0"
            />
          </div>

          <div className="mt-10 flex justify-center">
            <PersonaCardButton href="#contact" variant="filled">
              Contact Sales
            </PersonaCardButton>
          </div>
        </div>
      </section>

      {/* Trust layer for AI Section */}
      <section className={`${SITE_CONTAINER_CLASS} py-10`}>
        <div className="text-center">
          <h2 className="text-5xl font-bold tracking-tight text-fd-foreground">
            The trust layer for AI
          </h2>
          <p className="mx-auto mt-6 max-w-5xl text-base leading-7 text-fd-muted-foreground">
            AI systems scale faster than trust. Data is created, transformed, and
            distributed, without a standard way to prove: origin, authorship,
            timing, or integrity. Ar.io solves this with an independent
            cryptographic verification layer beneath infrastructure.
          </p>
          <div className="mx-auto mt-6 max-w-3xl space-y-2 text-base leading-7">
            <p className="font-bold text-fd-foreground">
              Store once. Prove forever.
            </p>
            <p className="text-fd-muted-foreground">
              Independent. Persistent. Verifiable across systems.
            </p>
            <p className="font-bold text-fd-foreground">
              Verified proof that protects your data.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="Audit-ready AI systems"
            subtitle="CRYPTOGRAPHIC AUDIT REPORTS"
            description="Cryptographically secured audit reports for training data, outputs, and logs."
            secondParagraph="→ Proves origin, timestamp, signer, and integrity."
          />
          <FeatureCard
            title="Proven AI training data"
            subtitle="TRAINING DATA VERIFICATION"
            description="Ensure datasets are traceable, verifiable, and unaltered."
            secondParagraph="→ Proves origin, authorship, and history."
          />
          <FeatureCard
            title="Verifiable AI outputs"
            subtitle="GENERATED CONTENT"
            description="Attach proof of origin and integrity to generated content."
            secondParagraph="→ Proves when, how, and by whom it was created."
          />
          <FeatureCard
            title="Tamper-proof logs and decisions"
            subtitle="COMPLIANCE & IMMUTABILITY"
            description="Create immutable, verifiable records for compliance."
            secondParagraph="→ Detects and proves any alteration."
          />
          <FeatureCard
            title="Proven ownership of digital content"
            subtitle="OWNERSHIP & PROVENANCE"
            description="Establish cryptographic ownership and provenance."
            secondParagraph="→ Proves authorship and content history."
          />
          <FeatureCard
            title="C2PA-compatible provenance infrastructure"
            subtitle="C2PA & CONTENT AUTHENTICITY"
            description="Enable standardized content authenticity workflows."
            secondParagraph="→ Stores and verifies signed manifests."
          />
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <PersonaCardButton href="#contact" variant="filled">
            Contact Sales
          </PersonaCardButton>
          <SecondaryCta href="/technology">Learn More</SecondaryCta>
        </div>
      </section>

      {/* How You Are Protected Section */}
      <section className="hidden py-16 md:block">
        <div className={`${SITE_CONTAINER_CLASS}`}>
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl">
                How You Are Protected
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-fd-muted-foreground md:text-base md:leading-7">
                Built-in protocols that protect your data—and your business—by design.
              </p>
            </div>

            <ShieldDiagram />

            <div className="mt-10 flex justify-center">
              <SecondaryCta href="/technology">Learn more</SecondaryCta>
            </div>
          </div>
        </div>
      </section>

      {/* Meta - Safeguarding Digital Collectibles with Permanent Storage Section */}
      <section className={`${SITE_CONTAINER_CLASS} py-10`}>
        <div className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-[minmax(0,500px)_minmax(0,650px)] lg:items-center lg:justify-center lg:gap-12">
          {/* Left Content */}
          <div>
            <BaseImage
              src="/ecosystem-logos/logos-meta-full.png"
              alt="Meta"
              width={126}
              height={27}
              className="mb-6 block h-6 w-auto object-contain"
            />
            <h2 className="text-3xl font-bold tracking-tight text-fd-foreground">
              Safeguarding Digital Collectibles with Permanent Storage
            </h2>
            <p className="mt-4 text-base leading-7 text-fd-muted-foreground">
              For the launch of Instagram Digital Collectibles in the U.S., Meta selected permanent storage to ensure that NFT media and metadata created on the platform would remain accessible, verifiable, and intact over time. By using permanent storage, Meta protected creators and collectors from broken links, mutable assets, and future platform or infrastructure changes.
              <br />
              <br />
              This approach allowed Meta to support creator monetization at scale while preserving long-term trust in digital ownership.
            </p>
            
            {/* Data Badges */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="rounded-lg bg-fd-card p-4 text-center">
                <div className="text-3xl font-bold text-[#5427C8]" style={{ fontFamily: 'var(--font-heading)' }}>3.8m</div>
                <div className="mt-1 text-sm text-fd-muted-foreground">Files stored</div>
              </div>
              <div className="rounded-lg bg-fd-card p-4 text-center">
                <div className="text-3xl font-bold text-[#5427C8]" style={{ fontFamily: 'var(--font-heading)' }}>7.6 TB</div>
                <div className="mt-1 text-sm text-fd-muted-foreground">of verifiable content</div>
              </div>
              <div className="rounded-lg bg-fd-card p-4 text-center">
                <div className="text-3xl font-bold text-[#5427C8]" style={{ fontFamily: 'var(--font-heading)' }}>$0</div>
                <div className="mt-1 text-sm text-fd-muted-foreground">Recurring storage costs</div>
              </div>
            </div>

            <div className="mt-6">
              <SecondaryCta href="/case-studies/meta">Read More</SecondaryCta>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-[500px] w-full overflow-hidden rounded-2xl lg:h-[600px]">
            <BaseImage
              src="/home/meta-photographer.png"
              alt="Professional video production on beach"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* Global Provenance Standards Section */}
      <section className="py-10">
        <div className={SITE_CONTAINER_CLASS}>
          <div
            className={`${CASE_STUDY_WIDTH_CLASS} grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] lg:items-center`}
          >
            <div className="text-left">
              <h2
                className="text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Built for global provenance standards
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-fd-muted-foreground md:text-base md:leading-7">
                Ar.io is aligned with C2PA - the leading standard for verifying the
                origin and history of digital content.
              </p>
              <div className="mt-8 max-w-3xl space-y-2 text-base leading-7 text-fd-muted-foreground">
                <p>
                  Backed by <b>Adobe, Microsoft, OpenAI, Google, BBC, Intel</b>
                </p>
                <p>100+ members across AI, media, and technology</p>
                <p>Rapidly adopted across AI and content workflows</p>
              </div>
              <div className="mt-8 max-w-3xl space-y-2 text-base leading-7">
                <p className="font-semibold text-fd-foreground">ar.io enables:</p>
                <ul className="list-disc space-y-2 pl-6 text-fd-muted-foreground">
                  <li>Storage and verification of C2PA manifests</li>
                  <li>Independent validation of signed content</li>
                  <li>Persistent provenance records</li>
                </ul>
                <p className="pt-1 font-semibold text-fd-foreground">
                  From standard to verifiable infrastructure
                </p>
              </div>
            </div>

            <div className="mx-auto w-full max-w-[360px] lg:relative lg:min-h-[240px] lg:mx-0 lg:justify-self-end">
              <div className="lg:absolute lg:left-0 lg:top-1/2 lg:w-full lg:-translate-y-1/2">
                <BaseImage
                  src="/ecosystem-logos/logo-c2pa.svg"
                  alt="C2PA logo"
                  width={360}
                  height={120}
                  className="h-auto w-full object-contain"
                />
              </div>
              <div className="mt-14 flex justify-center lg:absolute lg:left-0 lg:top-[calc(50%+120px)] lg:mt-0 lg:justify-start">
                <SecondaryCta href="/provenance">Learn more</SecondaryCta>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-10">
        <div className={SITE_CONTAINER_CLASS}>
          <div className="text-center">
            <h2
              className="text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Ar.io by the numbers
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-fd-muted-foreground md:text-base md:leading-7">
              Securing billions of data items across hundreds of active nodes -
              ar.io is the fastest-growing gateway to permanent, decentralized
              storage.
            </p>
          </div>

          <div className="mt-16 flex flex-col items-center gap-6 md:flex-row md:justify-center">
            <StatisticsCard
              number="650 +"
              description="Global access points"
              imageSrc="/home/stats-access.png"
              imageAlt="Satellite orbiting Earth"
            />
            <StatisticsCard
              number="875K +"
              description="Active users"
              imageSrc="/home/stats-users.png"
              imageAlt="Two women collaborating on a laptop"
            />
            <StatisticsCard
              number="20 billion +"
              description="Total files stored"
              imageSrc="/home/stats-transactions.png"
              imageAlt="Person holding a smartphone"
            />
          </div>
        </div>
      </section>

      {/* Featured Logos */}
      <FeaturedLogosRow featuredItems={featuredItems} />
    </main>
  );
}


