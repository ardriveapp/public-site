"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Database,
  Cpu,
  Globe,
  Link2,
  Building2,
  Code2,
  ExternalLink,
  HardDrive,
  Zap,
  Fingerprint,
  Box,
  RefreshCw,
  Workflow,
  Network,
  Clock,
  Check,
  X,
  ShieldCheck,
  Lock,
  ArrowRight,
  ArrowDown,
  Upload,
  Unplug,
  Download,
  Search,
  Compass,
  Image,
  FileVideo,
  FileText,
  FileCode,
  Music,
  Server,
  Users,
  Landmark,
  DollarSign,
  Monitor,
} from "lucide-react";
import { ContactUsTrigger } from "@/components/contact/ContactUsTrigger";
import { BaseImage } from "@/components/base-image";
import {
  FINAL_CTA_WIDTH_CLASS,
  HOW_IT_WORKS_WIDTH_CLASS,
  SITE_CONTAINER_CLASS,
} from "@/components/site-container";
import type { LucideIcon } from "lucide-react";

/* ==========================================================================
   Shield Diagram Component
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
    description: "Distributed network, no single company controls access.",
    outcome: "Survives any vendor shutdown",
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
    [...Array(30).keys()] // Deterministic order for SSR - 5 icons per path × 6 paths
  );

  // Shuffle icons every 10 seconds (synced with animation cycle - all icons invisible at loop boundary)
  useEffect(() => {
    // Initial randomization after hydration
    setIconIndices([...Array(30).keys()].sort(() => Math.random() - 0.5));

    const interval = setInterval(() => {
      setIconIndices(
        [...Array(fileIconPool.length).keys()]
          .sort(() => Math.random() - 0.5)
          .concat([...Array(fileIconPool.length).keys()].sort(() => Math.random() - 0.5))
          .concat([...Array(fileIconPool.length).keys()].sort(() => Math.random() - 0.5))
          .concat([...Array(fileIconPool.length).keys()].sort(() => Math.random() - 0.5))
          .slice(0, 30)
      );
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const getIcon = (index: number) => {
    const IconComponent = fileIconPool[iconIndices[index] % fileIconPool.length];
    return (
      <div className="rounded-full bg-white p-1 shadow-sm">
        <IconComponent className="size-5 text-fd-primary/70" />
      </div>
    );
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

          {/* Animated File Icons - 5 per path for rich organic flow */}
          <div className="pointer-events-none absolute inset-0">
            {/* 12 o'clock - Top - 5 icons */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatTopA_15s_ease-in-out_infinite]">
              {getIcon(0)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatTopB_15s_ease-in-out_infinite]">
              {getIcon(1)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatTopC_15s_ease-in-out_infinite]">
              {getIcon(2)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatTopD_15s_ease-in-out_infinite]">
              {getIcon(3)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatTopE_15s_ease-in-out_infinite]">
              {getIcon(4)}
            </div>
            {/* 2 o'clock - Top Right - 5 icons */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatTopRightA_15s_ease-in-out_infinite]">
              {getIcon(5)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatTopRightB_15s_ease-in-out_infinite]">
              {getIcon(6)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatTopRightC_15s_ease-in-out_infinite]">
              {getIcon(7)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatTopRightD_15s_ease-in-out_infinite]">
              {getIcon(8)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatTopRightE_15s_ease-in-out_infinite]">
              {getIcon(9)}
            </div>
            {/* 4 o'clock - Bottom Right - 5 icons */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatBottomRightA_15s_ease-in-out_infinite]">
              {getIcon(10)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatBottomRightB_15s_ease-in-out_infinite]">
              {getIcon(11)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatBottomRightC_15s_ease-in-out_infinite]">
              {getIcon(12)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatBottomRightD_15s_ease-in-out_infinite]">
              {getIcon(13)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatBottomRightE_15s_ease-in-out_infinite]">
              {getIcon(14)}
            </div>
            {/* 6 o'clock - Bottom - 5 icons */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatBottomA_15s_ease-in-out_infinite]">
              {getIcon(15)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatBottomB_15s_ease-in-out_infinite]">
              {getIcon(16)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatBottomC_15s_ease-in-out_infinite]">
              {getIcon(17)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatBottomD_15s_ease-in-out_infinite]">
              {getIcon(18)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatBottomE_15s_ease-in-out_infinite]">
              {getIcon(19)}
            </div>
            {/* 8 o'clock - Bottom Left - 5 icons */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatBottomLeftA_15s_ease-in-out_infinite]">
              {getIcon(20)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatBottomLeftB_15s_ease-in-out_infinite]">
              {getIcon(21)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatBottomLeftC_15s_ease-in-out_infinite]">
              {getIcon(22)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatBottomLeftD_15s_ease-in-out_infinite]">
              {getIcon(23)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatBottomLeftE_15s_ease-in-out_infinite]">
              {getIcon(24)}
            </div>
            {/* 10 o'clock - Top Left - 5 icons */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatTopLeftA_15s_ease-in-out_infinite]">
              {getIcon(25)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatTopLeftB_15s_ease-in-out_infinite]">
              {getIcon(26)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatTopLeftC_15s_ease-in-out_infinite]">
              {getIcon(27)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatTopLeftD_15s_ease-in-out_infinite]">
              {getIcon(28)}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fileFloatTopLeftE_15s_ease-in-out_infinite]">
              {getIcon(29)}
            </div>
          </div>

          {/* Central Shield - prominently in the middle */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="absolute -inset-4 animate-[shieldPulse_2.5s_ease-in-out_infinite] rounded-full bg-fd-primary blur-lg" />
              <div className="absolute -inset-2 rounded-full bg-fd-primary/15 blur-md" />
              <div className="relative flex size-24 flex-col items-center justify-center rounded-full border-2 border-fd-primary/40 bg-white shadow-xl">
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

      {/* CSS Keyframes - 30 icons for rich hexagonal layout (5 per path) */}
      <style jsx>{`
        /* Shield pulse - radiating glow effect */
        @keyframes shieldPulse {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.15); opacity: 0.4; }
        }

        /* 30 icons: 5 per direction, staggered departure times for organic flow */

        /* 12 o'clock - Top: departs at 0%, 20%, 40%, 60%, 80% */
        @keyframes fileFloatTopA {
          0%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          2% { transform: translate(-50%, -50%); opacity: 1; }
          18% { transform: translate(-50%, calc(-50% - 192px)); opacity: 1; }
          20% { transform: translate(-50%, calc(-50% - 192px)); opacity: 0; }
        }
        @keyframes fileFloatTopB {
          0%, 20%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          22% { transform: translate(-50%, -50%); opacity: 1; }
          38% { transform: translate(-50%, calc(-50% - 192px)); opacity: 1; }
          40% { transform: translate(-50%, calc(-50% - 192px)); opacity: 0; }
        }
        @keyframes fileFloatTopC {
          0%, 40%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          42% { transform: translate(-50%, -50%); opacity: 1; }
          58% { transform: translate(-50%, calc(-50% - 192px)); opacity: 1; }
          60% { transform: translate(-50%, calc(-50% - 192px)); opacity: 0; }
        }
        @keyframes fileFloatTopD {
          0%, 60%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          62% { transform: translate(-50%, -50%); opacity: 1; }
          78% { transform: translate(-50%, calc(-50% - 192px)); opacity: 1; }
          80% { transform: translate(-50%, calc(-50% - 192px)); opacity: 0; }
        }
        @keyframes fileFloatTopE {
          0%, 80%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          82% { transform: translate(-50%, -50%); opacity: 1; }
          98% { transform: translate(-50%, calc(-50% - 192px)); opacity: 1; }
          99% { transform: translate(-50%, calc(-50% - 192px)); opacity: 0; }
        }

        /* 2 o'clock - Top Right: departs at 4%, 24%, 44%, 64%, 84% */
        @keyframes fileFloatTopRightA {
          0%, 4%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          6% { transform: translate(-50%, -50%); opacity: 1; }
          22% { transform: translate(calc(-50% + 343px), calc(-50% - 130px)); opacity: 1; }
          24% { transform: translate(calc(-50% + 343px), calc(-50% - 130px)); opacity: 0; }
        }
        @keyframes fileFloatTopRightB {
          0%, 24%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          26% { transform: translate(-50%, -50%); opacity: 1; }
          42% { transform: translate(calc(-50% + 343px), calc(-50% - 130px)); opacity: 1; }
          44% { transform: translate(calc(-50% + 343px), calc(-50% - 130px)); opacity: 0; }
        }
        @keyframes fileFloatTopRightC {
          0%, 44%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          46% { transform: translate(-50%, -50%); opacity: 1; }
          62% { transform: translate(calc(-50% + 343px), calc(-50% - 130px)); opacity: 1; }
          64% { transform: translate(calc(-50% + 343px), calc(-50% - 130px)); opacity: 0; }
        }
        @keyframes fileFloatTopRightD {
          0%, 64%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          66% { transform: translate(-50%, -50%); opacity: 1; }
          82% { transform: translate(calc(-50% + 343px), calc(-50% - 130px)); opacity: 1; }
          84% { transform: translate(calc(-50% + 343px), calc(-50% - 130px)); opacity: 0; }
        }
        @keyframes fileFloatTopRightE {
          0%, 84%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          86% { transform: translate(-50%, -50%); opacity: 1; }
          98% { transform: translate(calc(-50% + 343px), calc(-50% - 130px)); opacity: 1; }
          99% { transform: translate(calc(-50% + 343px), calc(-50% - 130px)); opacity: 0; }
        }

        /* 4 o'clock - Bottom Right: departs at 8%, 28%, 48%, 68%, 88% */
        @keyframes fileFloatBottomRightA {
          0%, 8%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          10% { transform: translate(-50%, -50%); opacity: 1; }
          26% { transform: translate(calc(-50% + 343px), calc(-50% + 130px)); opacity: 1; }
          28% { transform: translate(calc(-50% + 343px), calc(-50% + 130px)); opacity: 0; }
        }
        @keyframes fileFloatBottomRightB {
          0%, 28%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          30% { transform: translate(-50%, -50%); opacity: 1; }
          46% { transform: translate(calc(-50% + 343px), calc(-50% + 130px)); opacity: 1; }
          48% { transform: translate(calc(-50% + 343px), calc(-50% + 130px)); opacity: 0; }
        }
        @keyframes fileFloatBottomRightC {
          0%, 48%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          50% { transform: translate(-50%, -50%); opacity: 1; }
          66% { transform: translate(calc(-50% + 343px), calc(-50% + 130px)); opacity: 1; }
          68% { transform: translate(calc(-50% + 343px), calc(-50% + 130px)); opacity: 0; }
        }
        @keyframes fileFloatBottomRightD {
          0%, 68%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          70% { transform: translate(-50%, -50%); opacity: 1; }
          86% { transform: translate(calc(-50% + 343px), calc(-50% + 130px)); opacity: 1; }
          88% { transform: translate(calc(-50% + 343px), calc(-50% + 130px)); opacity: 0; }
        }
        @keyframes fileFloatBottomRightE {
          0%, 88%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          90% { transform: translate(-50%, -50%); opacity: 1; }
          98% { transform: translate(calc(-50% + 343px), calc(-50% + 130px)); opacity: 1; }
          99% { transform: translate(calc(-50% + 343px), calc(-50% + 130px)); opacity: 0; }
        }

        /* 6 o'clock - Bottom: departs at 12%, 32%, 52%, 72%, 92% */
        @keyframes fileFloatBottomA {
          0%, 12%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          14% { transform: translate(-50%, -50%); opacity: 1; }
          30% { transform: translate(-50%, calc(-50% + 192px)); opacity: 1; }
          32% { transform: translate(-50%, calc(-50% + 192px)); opacity: 0; }
        }
        @keyframes fileFloatBottomB {
          0%, 32%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          34% { transform: translate(-50%, -50%); opacity: 1; }
          50% { transform: translate(-50%, calc(-50% + 192px)); opacity: 1; }
          52% { transform: translate(-50%, calc(-50% + 192px)); opacity: 0; }
        }
        @keyframes fileFloatBottomC {
          0%, 52%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          54% { transform: translate(-50%, -50%); opacity: 1; }
          70% { transform: translate(-50%, calc(-50% + 192px)); opacity: 1; }
          72% { transform: translate(-50%, calc(-50% + 192px)); opacity: 0; }
        }
        @keyframes fileFloatBottomD {
          0%, 72%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          74% { transform: translate(-50%, -50%); opacity: 1; }
          90% { transform: translate(-50%, calc(-50% + 192px)); opacity: 1; }
          92% { transform: translate(-50%, calc(-50% + 192px)); opacity: 0; }
        }
        @keyframes fileFloatBottomE {
          0%, 92%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          94% { transform: translate(-50%, -50%); opacity: 1; }
          98% { transform: translate(-50%, calc(-50% + 192px)); opacity: 1; }
          99% { transform: translate(-50%, calc(-50% + 192px)); opacity: 0; }
        }

        /* 8 o'clock - Bottom Left: departs at 16%, 36%, 56%, 76%, 96% */
        @keyframes fileFloatBottomLeftA {
          0%, 16%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          18% { transform: translate(-50%, -50%); opacity: 1; }
          34% { transform: translate(calc(-50% - 343px), calc(-50% + 130px)); opacity: 1; }
          36% { transform: translate(calc(-50% - 343px), calc(-50% + 130px)); opacity: 0; }
        }
        @keyframes fileFloatBottomLeftB {
          0%, 36%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          38% { transform: translate(-50%, -50%); opacity: 1; }
          54% { transform: translate(calc(-50% - 343px), calc(-50% + 130px)); opacity: 1; }
          56% { transform: translate(calc(-50% - 343px), calc(-50% + 130px)); opacity: 0; }
        }
        @keyframes fileFloatBottomLeftC {
          0%, 56%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          58% { transform: translate(-50%, -50%); opacity: 1; }
          74% { transform: translate(calc(-50% - 343px), calc(-50% + 130px)); opacity: 1; }
          76% { transform: translate(calc(-50% - 343px), calc(-50% + 130px)); opacity: 0; }
        }
        @keyframes fileFloatBottomLeftD {
          0%, 76%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          78% { transform: translate(-50%, -50%); opacity: 1; }
          94% { transform: translate(calc(-50% - 343px), calc(-50% + 130px)); opacity: 1; }
          96% { transform: translate(calc(-50% - 343px), calc(-50% + 130px)); opacity: 0; }
        }
        @keyframes fileFloatBottomLeftE {
          0%, 2%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          4% { transform: translate(-50%, -50%); opacity: 1; }
          14% { transform: translate(calc(-50% - 343px), calc(-50% + 130px)); opacity: 1; }
          16% { transform: translate(calc(-50% - 343px), calc(-50% + 130px)); opacity: 0; }
        }

        /* 10 o'clock - Top Left: departs at 6%, 26%, 46%, 66%, 86% */
        @keyframes fileFloatTopLeftA {
          0%, 6%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          8% { transform: translate(-50%, -50%); opacity: 1; }
          24% { transform: translate(calc(-50% - 343px), calc(-50% - 130px)); opacity: 1; }
          26% { transform: translate(calc(-50% - 343px), calc(-50% - 130px)); opacity: 0; }
        }
        @keyframes fileFloatTopLeftB {
          0%, 26%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          28% { transform: translate(-50%, -50%); opacity: 1; }
          44% { transform: translate(calc(-50% - 343px), calc(-50% - 130px)); opacity: 1; }
          46% { transform: translate(calc(-50% - 343px), calc(-50% - 130px)); opacity: 0; }
        }
        @keyframes fileFloatTopLeftC {
          0%, 46%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          48% { transform: translate(-50%, -50%); opacity: 1; }
          64% { transform: translate(calc(-50% - 343px), calc(-50% - 130px)); opacity: 1; }
          66% { transform: translate(calc(-50% - 343px), calc(-50% - 130px)); opacity: 0; }
        }
        @keyframes fileFloatTopLeftD {
          0%, 66%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          68% { transform: translate(-50%, -50%); opacity: 1; }
          84% { transform: translate(calc(-50% - 343px), calc(-50% - 130px)); opacity: 1; }
          86% { transform: translate(calc(-50% - 343px), calc(-50% - 130px)); opacity: 0; }
        }
        @keyframes fileFloatTopLeftE {
          0%, 86%, 100% { transform: translate(-50%, -50%); opacity: 0; }
          88% { transform: translate(-50%, -50%); opacity: 1; }
          98% { transform: translate(calc(-50% - 343px), calc(-50% - 130px)); opacity: 1; }
          99% { transform: translate(calc(-50% - 343px), calc(-50% - 130px)); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ==========================================================================
   Shared Components
   ========================================================================== */

function BulletIcon() {
  return (
    <span className="inline-flex size-5 shrink-0 items-center justify-center rounded bg-fd-foreground">
      <BaseImage
        src="/icons/checkbox.svg"
        alt=""
        aria-hidden="true"
        width={16}
        height={16}
        className="size-4 brightness-0 invert"
      />
    </span>
  );
}

function PageTitleBadge({ title }: { title: string }) {
  return (
    <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm">
      {title}
    </div>
  );
}

function SecondaryCta({
  href,
  children,
  external,
  variant = "dark",
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  variant?: "dark" | "light";
}) {
  const className =
    variant === "light"
      ? "inline-flex items-center gap-2 rounded-full border border-white/80 bg-transparent px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
      : "inline-flex items-center gap-2 rounded-full border border-[#23232D] bg-transparent px-5 py-2.5 text-sm font-semibold text-[#23232D] hover:bg-[#23232D]/5 transition-colors";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
        <ExternalLink className="size-4" />
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

/* ==========================================================================
   Enterprise Components
   ========================================================================== */

interface SpecItemProps {
  value: string;
  label: string;
  description?: string;
}

function SpecItem({ value, label, description }: SpecItemProps) {
  return (
    <div className="rounded-xl border border-fd-border bg-fd-card p-3 sm:p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div
        className="text-2xl sm:text-3xl font-bold tracking-tight text-[#5427C8] md:text-4xl"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {value}
      </div>
      <div className="mt-1 text-sm sm:text-base font-semibold text-fd-foreground">{label}</div>
      {description && (
        <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-fd-muted-foreground">{description}</p>
      )}
    </div>
  );
}

interface ComparisonRowProps {
  feature: string;
  ario: string | boolean;
  ipfs: string | boolean;
  cloud: string | boolean;
}

function ComparisonCell({ value, className = "" }: { value: string | boolean; className?: string }) {
  if (typeof value === "boolean") {
    return (
      <span className="inline-flex items-center justify-center">
        {value ? (
          <Check className={`size-4 sm:size-5 text-fd-primary ${className}`} />
        ) : (
          <X className={`size-4 sm:size-5 text-fd-foreground ${className}`} />
        )}
      </span>
    );
  }
  return <span className={`text-xs sm:text-sm ${className}`}>{value}</span>;
}

function ComparisonTable({ rows }: { rows: ComparisonRowProps[] }) {
  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-fd-border">
              <th className="px-3 py-3 text-left text-sm font-semibold text-fd-foreground">
                Capability
              </th>
              <th className="px-3 py-3 text-center text-sm font-bold text-fd-primary bg-fd-primary/10 rounded-t-lg">
                ar.io
              </th>
              <th className="px-3 py-3 text-center text-sm font-semibold text-fd-muted-foreground">
                IPFS
              </th>
              <th className="px-3 py-3 text-center text-sm font-semibold text-fd-muted-foreground">
                Cloud
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className="border-b border-fd-border/50 last:border-b-0"
              >
                <td className="px-3 py-3 text-sm font-medium text-fd-foreground">
                  {row.feature}
                </td>
                <td className="px-3 py-3 text-center text-fd-foreground bg-fd-primary/5">
                  <ComparisonCell value={row.ario} />
                </td>
                <td className="px-3 py-3 text-center text-fd-muted-foreground">
                  <ComparisonCell value={row.ipfs} />
                </td>
                <td className="px-3 py-3 text-center text-fd-muted-foreground">
                  <ComparisonCell value={row.cloud} />
                </td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-3">
        {rows.map((row, index) => (
          <div key={index} className="rounded-lg border border-fd-border/50 p-3">
            <div className="font-semibold text-fd-foreground text-sm mb-2">
              {row.feature}
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-fd-primary/10 p-2">
                <div className="text-[10px] font-bold text-fd-primary mb-1">ar.io</div>
                <div className="flex justify-center">
                  <ComparisonCell value={row.ario} />
                </div>
              </div>
              <div className="p-2">
                <div className="text-[10px] font-medium text-fd-muted-foreground mb-1">IPFS</div>
                <div className="flex justify-center">
                  <ComparisonCell value={row.ipfs} className="text-fd-muted-foreground" />
                </div>
              </div>
              <div className="p-2">
                <div className="text-[10px] font-medium text-fd-muted-foreground mb-1">Cloud</div>
                <div className="flex justify-center">
                  <ComparisonCell value={row.cloud} className="text-fd-muted-foreground" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ==========================================================================
   Deployment Slider - NEW Combined Section
   ========================================================================== */

const DEPLOYMENT_OPTIONS = [
  {
    id: "self-hosted",
    label: "Self-Hosted",
    icon: Server,
    headline: "Run on Your Infrastructure",
    description:
      "Deploy ar.io gateway software on your own servers. Full control over data residency, compliance, and operations.",
    features: [
      "Complete infrastructure control",
      "Data residency compliance",
      "Custom security policies",
      "Run in your own cloud or on-prem",
    ],
    cta: {
      label: "Setup Your Gateway",
      href: "https://docs.ar.io/build/run-a-gateway/",
      external: true,
    },
    bestFor: "Regulated industries, government, enterprises with DevOps teams",
  },
  {
    id: "managed",
    label: "Managed",
    icon: Building2,
    headline: "We Run It For You",
    description:
      "Shared or dedicated infrastructure with enterprise SLAs, 24/7 support, and fully managed operations. You focus on building - we handle the rest.",
    features: [
      "99.9%+ uptime SLA",
      "Dedicated support team",
      "Monitoring & incident response",
      "Managed upgrades & maintenance",
    ],
    cta: {
      label: "Talk to Sales",
      href: null, // Will use ContactUsTrigger
      external: false,
    },
    bestFor: "Production applications, enterprises wanting turnkey solution",
  },
  {
    id: "public",
    label: "Public Network",
    icon: Users,
    headline: "Use the Open Network",
    description:
      "Upload and access data through any gateway on Ar.io. No infrastructure to manage - just start building.",
    features: [
      "No infrastructure to manage",
      "Pay-as-you-go pricing",
      "Global gateway network",
      "Instant access via SDK",
    ],
    cta: {
      label: "Start Building",
      href: "https://docs.ar.io/learn/",
      external: true,
    },
    bestFor: "Developers, startups, prototyping, getting started",
  },
];

function DeploymentCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {DEPLOYMENT_OPTIONS.map((option) => {
        const IconComponent = option.icon;

        return (
          <div
            key={option.id}
            className="rounded-2xl border border-fd-border bg-fd-card p-6 shadow-sm flex flex-col"
          >
            {/* Icon */}
            <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-fd-primary/10">
              <IconComponent className="size-6 text-fd-primary" />
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-fd-foreground">{option.label}</h3>
            <p className="mt-1 text-sm text-fd-muted-foreground">{option.headline}</p>

            {/* Description */}
            <p className="mt-4 text-sm text-fd-muted-foreground leading-relaxed">
              {option.description}
            </p>

            {/* Features */}
            <ul className="mt-5 space-y-2 flex-1">
              {option.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-fd-foreground">
                  <Check className="mt-0.5 size-4 text-green-600 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* Best For */}
            <div className="mt-5 rounded-lg bg-fd-muted/50 px-3 py-2">
              <span className="text-[11px] font-semibold text-fd-foreground">Best for: </span>
              <span className="text-[11px] text-fd-muted-foreground">{option.bestFor}</span>
            </div>

            {/* CTA */}
            <div className="mt-6">
              {option.cta.href ? (
                <a
                  href={option.cta.href}
                  target={option.cta.external ? "_blank" : undefined}
                  rel={option.cta.external ? "noopener noreferrer" : undefined}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#23232D] px-5 py-2.5 text-sm font-semibold text-[#F0F0F0] transition-opacity hover:opacity-90"
                >
                  {option.cta.label}
                  {option.cta.external && <ExternalLink className="size-4" />}
                </a>
              ) : (
                <ContactUsTrigger className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#23232D] px-5 py-2.5 text-sm font-semibold text-[#F0F0F0] transition-opacity hover:opacity-90">
                  {option.cta.label}
                </ContactUsTrigger>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ==========================================================================
   How It Works - Arweave Explained
   ========================================================================== */

function HowItWorksArweave() {
  return (
    <div className="rounded-3xl border border-fd-border bg-fd-card p-6 md:p-10 shadow-sm">
      {/* Tagline */}
      <div className="text-center mb-8">
        <span className="inline-block rounded-full bg-fd-primary/10 px-4 py-1.5 text-sm font-semibold text-fd-primary">
          How It Works
        </span>
      </div>

      {/* Main Flow Diagram */}
      <div className="relative">
        {/* Desktop Layout */}
        <div className="hidden md:block">
          {/* Connecting line behind everything */}
          <div className="absolute top-[60px] left-[15%] right-[15%] h-[3px] bg-gradient-to-r from-fd-primary via-fd-primary/60 to-fd-primary rounded-full" />

          <div className="grid grid-cols-3 gap-6 relative">
            {/* Step 1: You Pay */}
            <div className="text-center">
              <div className="relative mx-auto mb-4 flex size-[120px] items-center justify-center rounded-full border-[3px] border-fd-primary bg-white shadow-lg">
                <div className="text-center">
                  <Upload className="mx-auto size-8 text-fd-primary mb-1" strokeWidth={1.5} />
                  <span className="text-xs font-bold text-fd-foreground">YOU</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-fd-foreground mb-2">Upload & Pay Once</h3>
              <p className="text-sm text-fd-muted-foreground leading-relaxed max-w-[280px] mx-auto">
                You upload your file and make a single payment. No subscriptions or renewals.
              </p>
            </div>

            {/* Step 2: The Endowment */}
            <div className="text-center">
              <div className="relative mx-auto mb-4 flex size-[120px] items-center justify-center rounded-full border-[3px] border-fd-primary bg-fd-primary/10 shadow-lg">
                <div className="text-center">
                  <Landmark className="mx-auto size-8 text-fd-primary mb-1" strokeWidth={1.5} />
                  <span className="text-xs font-bold text-fd-foreground">ENDOWMENT</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-fd-foreground mb-2">Stored in a Trust</h3>
              <p className="text-sm text-fd-muted-foreground leading-relaxed max-w-[280px] mx-auto">
                Your payment enters a protocolized endowment - a permanent fund that pays for your storage over time.
              </p>
            </div>

            {/* Step 3: Miners Store */}
            <div className="text-center">
              <div className="relative mx-auto mb-4 flex size-[120px] items-center justify-center rounded-full border-[3px] border-fd-primary bg-white shadow-lg">
                <div className="text-center">
                  <HardDrive className="mx-auto size-8 text-fd-primary mb-1" strokeWidth={1.5} />
                  <span className="text-xs font-bold text-fd-foreground">ARWEAVE</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-fd-foreground mb-2">Miners Store Forever</h3>
              <p className="text-sm text-fd-muted-foreground leading-relaxed max-w-[280px] mx-auto">
                Miners compete globally to store your data on a blockchain, paid by the endowment in perpetuity.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-6">
          {/* Step 1 */}
          <div className="flex items-start gap-4">
            <div className="shrink-0 flex size-16 items-center justify-center rounded-full border-2 border-fd-primary bg-white shadow">
              <Upload className="size-7 text-fd-primary" strokeWidth={1.5} />
            </div>
            <div className="pt-1">
              <h3 className="text-base font-bold text-fd-foreground mb-1">Upload & Pay Once</h3>
              <p className="text-sm text-fd-muted-foreground leading-relaxed">
                You upload your file and make a single payment. No subscriptions. No renewals. Ever.
              </p>
            </div>
          </div>

          {/* Connector */}
          <div className="flex justify-start pl-7">
            <ArrowDown className="size-5 text-fd-primary" />
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-4">
            <div className="shrink-0 flex size-16 items-center justify-center rounded-full border-2 border-fd-primary bg-fd-primary/10 shadow">
              <Landmark className="size-7 text-fd-primary" strokeWidth={1.5} />
            </div>
            <div className="pt-1">
              <h3 className="text-base font-bold text-fd-foreground mb-1">Stored in a Trust</h3>
              <p className="text-sm text-fd-muted-foreground leading-relaxed">
                Your payment enters a protocolized endowment—a permanent fund that pays for your storage over time.
              </p>
            </div>
          </div>

          {/* Connector */}
          <div className="flex justify-start pl-7">
            <ArrowDown className="size-5 text-fd-primary" />
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-4">
            <div className="shrink-0 flex size-16 items-center justify-center rounded-full border-2 border-fd-primary bg-white shadow">
              <HardDrive className="size-7 text-fd-primary" strokeWidth={1.5} />
            </div>
            <div className="pt-1">
              <h3 className="text-base font-bold text-fd-foreground mb-1">Miners Store Forever</h3>
              <p className="text-sm text-fd-muted-foreground leading-relaxed">
                Miners compete globally to store your data on a blockchain, paid by the endowment in perpetuity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Learn More Link */}
      <div className="mt-8 text-center">
        <a
          href="https://docs.arweave.org/developers/development/protocol"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-fd-primary hover:underline"
        >
          Learn more about Arweave
          <ArrowRight className="size-4" />
        </a>
      </div>
    </div>
  );
}

/* ==========================================================================
   Architecture Diagrams
   ========================================================================== */

function StackDiagram() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      {/* CSS for animations */}
      <style>{`
        @keyframes flowDown {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes flowUp {
          0% { bottom: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { bottom: 100%; opacity: 0; }
        }
        .flow-down-1 { animation: flowDown 2s linear infinite; }
        .flow-down-2 { animation: flowDown 2s linear infinite 0.5s; }
        .flow-down-3 { animation: flowDown 2s linear infinite 1s; }
        .flow-down-4 { animation: flowDown 2s linear infinite 1.5s; }
        .flow-down-5 { animation: flowDown 2s linear infinite 0.25s; }
        .flow-down-6 { animation: flowDown 2s linear infinite 1.25s; }
        .flow-up-1 { animation: flowUp 2s linear infinite 0.25s; }
        .flow-up-2 { animation: flowUp 2s linear infinite 0.75s; }
        .flow-up-3 { animation: flowUp 2s linear infinite 1.25s; }
        .flow-up-4 { animation: flowUp 2s linear infinite 1.75s; }
        .flow-up-5 { animation: flowUp 2s linear infinite 0.5s; }
        .flow-up-6 { animation: flowUp 2s linear infinite 1.5s; }
        .flow-down-7 { animation: flowDown 2s linear infinite 0.35s; }
        .flow-down-8 { animation: flowDown 2s linear infinite 1.35s; }
        .flow-up-7 { animation: flowUp 2s linear infinite 0.6s; }
        .flow-up-8 { animation: flowUp 2s linear infinite 1.6s; }
      `}</style>

      {/* Entry Points - Your Platform, Website, AI & Archive */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {/* Your Platform */}
        <div className="flex flex-col items-center">
          <div className="w-full rounded-lg border-2 border-dashed border-fd-muted-foreground/30 bg-fd-muted/30 px-3 py-2.5 md:px-4 md:py-3">
            <div className="flex items-center gap-2">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-fd-card">
                <Code2 className="size-3.5 text-fd-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-fd-foreground">Your Platform</p>
                <p className="text-[10px] text-fd-muted-foreground">APIs, smart contracts, backends</p>
              </div>
            </div>
          </div>
          {/* Platform Flow - Purple (write) + Green (read) */}
          <div className="flex h-12 gap-1.5 py-1">
            <div className="relative w-1 rounded-full bg-purple-500/30">
              <div className="flow-down-1 absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-purple-500 shadow-sm" />
              <div className="flow-down-3 absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-purple-500 shadow-sm" />
            </div>
            <div className="relative w-1 rounded-full bg-green-500/30">
              <div className="flow-up-1 absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-green-500 shadow-sm" />
              <div className="flow-up-3 absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-green-500 shadow-sm" />
            </div>
          </div>
        </div>

        {/* Your Web App */}
        <div className="flex flex-col items-center">
          <div className="w-full rounded-lg border-2 border-dashed border-fd-muted-foreground/30 bg-fd-muted/30 px-3 py-2.5 md:px-4 md:py-3">
            <div className="flex items-center gap-2">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-fd-card">
                <Globe className="size-3.5 text-fd-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-fd-foreground">Your Web App</p>
                <p className="text-[10px] text-fd-muted-foreground">Static sites, SPAs, PWAs</p>
              </div>
            </div>
          </div>
          {/* Website Flow - Blue (write) + Amber (read) */}
          <div className="flex h-12 gap-1.5 py-1">
            <div className="relative w-1 rounded-full bg-blue-500/30">
              <div className="flow-down-2 absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-blue-500 shadow-sm" />
              <div className="flow-down-4 absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-blue-500 shadow-sm" />
            </div>
            <div className="relative w-1 rounded-full bg-amber-500/30">
              <div className="flow-up-2 absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-amber-500 shadow-sm" />
              <div className="flow-up-4 absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-amber-500 shadow-sm" />
            </div>
          </div>
        </div>

        {/* Your AI */}
        <div className="flex flex-col items-center">
          <div className="w-full rounded-lg border-2 border-dashed border-fd-muted-foreground/30 bg-fd-muted/30 px-3 py-2.5 md:px-4 md:py-3">
            <div className="flex items-center gap-2">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-fd-card">
                <Cpu className="size-3.5 text-fd-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-fd-foreground">Your AI</p>
                <p className="text-[10px] text-fd-muted-foreground">LLMs, agents, RAG</p>
              </div>
            </div>
          </div>
          {/* AI Flow - Black (write) + White/Gray (read) */}
          <div className="flex h-12 gap-1.5 py-1">
            <div className="relative w-1 rounded-full bg-gray-800/30">
              <div className="flow-down-7 absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-gray-800 shadow-sm" />
              <div className="flow-down-8 absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-gray-800 shadow-sm" />
            </div>
            <div className="relative w-1 rounded-full bg-gray-400/30">
              <div className="flow-up-7 absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-gray-400 shadow-sm" />
              <div className="flow-up-8 absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-gray-400 shadow-sm" />
            </div>
          </div>
        </div>

        {/* Your Archive */}
        <div className="flex flex-col items-center">
          <div className="w-full rounded-lg border-2 border-dashed border-fd-muted-foreground/30 bg-fd-muted/30 px-3 py-2.5 md:px-4 md:py-3">
            <div className="flex items-center gap-2">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-fd-card">
                <Database className="size-3.5 text-fd-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-fd-foreground">Your Archive</p>
                <p className="text-[10px] text-fd-muted-foreground">CMS, DAM, DMS</p>
              </div>
            </div>
          </div>
          {/* Archive Flow - Teal (write) + Rose (read) */}
          <div className="flex h-12 gap-1.5 py-1">
            <div className="relative w-1 rounded-full bg-teal-500/30">
              <div className="flow-down-5 absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-teal-500 shadow-sm" />
              <div className="flow-down-6 absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-teal-500 shadow-sm" />
            </div>
            <div className="relative w-1 rounded-full bg-rose-500/30">
              <div className="flow-up-5 absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-rose-500 shadow-sm" />
              <div className="flow-up-6 absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-rose-500 shadow-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Stack: AR.IO + Arweave */}
      <div>
        {/* AR.IO Access Layer */}
        <div className="rounded-xl border-2 border-[#5427C8] bg-fd-card p-4 shadow-md">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-fd-primary/10">
                <Globe className="size-5 text-fd-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-fd-primary">
                    Access Layer
                  </p>
                  <span className="text-fd-muted-foreground">·</span>
                  <p className="text-sm font-bold text-fd-foreground">ar.io</p>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-fd-muted-foreground">
                  Global gateways for content delivery, app hosting, and human-readable URLs.
                </p>
              </div>
              <div className="hidden shrink-0 flex-col gap-1 md:flex">
                <span className="rounded-full bg-fd-primary/10 px-2.5 py-0.5 text-[10px] font-medium text-fd-primary text-center">
                  Upload
                </span>
                <span className="rounded-full bg-fd-primary/10 px-2.5 py-0.5 text-[10px] font-medium text-fd-primary text-center">
                  Download
                </span>
                <span className="rounded-full bg-fd-primary/10 px-2.5 py-0.5 text-[10px] font-medium text-fd-primary text-center">
                  Discover
                </span>
              </div>
            </div>
          </div>

          {/* Flow between ar.io and Arweave - All 8 colors */}
          <div className="flex justify-center py-1">
            <div className="flex h-12 gap-1">
              <div className="relative w-1 rounded-full bg-purple-500/30">
                <div className="flow-down-1 absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-purple-500 shadow-sm" />
                <div className="flow-down-3 absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-purple-500 shadow-sm" />
              </div>
              <div className="relative w-1 rounded-full bg-green-500/30">
                <div className="flow-up-1 absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-green-500 shadow-sm" />
                <div className="flow-up-3 absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-green-500 shadow-sm" />
              </div>
              <div className="relative w-1 rounded-full bg-blue-500/30">
                <div className="flow-down-2 absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-blue-500 shadow-sm" />
                <div className="flow-down-4 absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-blue-500 shadow-sm" />
              </div>
              <div className="relative w-1 rounded-full bg-amber-500/30">
                <div className="flow-up-2 absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-amber-500 shadow-sm" />
                <div className="flow-up-4 absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-amber-500 shadow-sm" />
              </div>
              <div className="relative w-1 rounded-full bg-gray-800/30">
                <div className="flow-down-7 absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-gray-800 shadow-sm" />
                <div className="flow-down-8 absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-gray-800 shadow-sm" />
              </div>
              <div className="relative w-1 rounded-full bg-gray-400/30">
                <div className="flow-up-7 absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-gray-400 shadow-sm" />
                <div className="flow-up-8 absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-gray-400 shadow-sm" />
              </div>
              <div className="relative w-1 rounded-full bg-teal-500/30">
                <div className="flow-down-5 absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-teal-500 shadow-sm" />
                <div className="flow-down-6 absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-teal-500 shadow-sm" />
              </div>
              <div className="relative w-1 rounded-full bg-rose-500/30">
                <div className="flow-up-5 absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-rose-500 shadow-sm" />
                <div className="flow-up-6 absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-rose-500 shadow-sm" />
              </div>
            </div>
          </div>

          {/* Arweave Storage Layer */}
          <div className="rounded-xl border-2 border-blue-700 bg-fd-card p-4 shadow-md">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-700/10">
                <HardDrive className="size-5 text-blue-700" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-blue-700">
                    Storage Layer
                  </p>
                  <span className="text-fd-muted-foreground">·</span>
                  <p className="text-sm font-bold text-fd-foreground">Arweave</p>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-fd-muted-foreground">
                  Content-addressed with Merkle proofs, funded by a sustainable Endowment model.
                </p>
              </div>
              <div className="hidden shrink-0 flex-col gap-1 md:flex">
                <span className="rounded-full bg-blue-700/10 px-2.5 py-0.5 text-[10px] font-medium text-blue-700 text-center">
                  Permanent
                </span>
                <span className="rounded-full bg-blue-700/10 px-2.5 py-0.5 text-[10px] font-medium text-blue-700 text-center">
                  Verified
                </span>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Location Independent Diagram Component
   ========================================================================== */

interface GatewayNode {
  id: string;
  label: string;
  location: string;
}

const GATEWAY_NODES: GatewayNode[] = [
  { id: "gw1", label: "Gateway A", location: "North America" },
  { id: "gw2", label: "Gateway B", location: "Europe" },
  { id: "gw3", label: "Gateway C", location: "Asia Pacific" },
];

function LocationIndependentDiagram() {
  return (
    <div className="relative">
      {/* CSS for animations - matching Stack Diagram pattern */}
      <style>{`
        @keyframes flowRight {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes dataGlow {
          0%, 100% { box-shadow: 0 0 15px rgba(84, 39, 200, 0.2); }
          50% { box-shadow: 0 0 25px rgba(84, 39, 200, 0.4); }
        }
        .loc-flow-right-1 { animation: flowRight 2s linear infinite; }
        .loc-flow-right-2 { animation: flowRight 2s linear infinite 0.5s; }
        .loc-flow-right-3 { animation: flowRight 2s linear infinite 1s; }
        .loc-flow-right-4 { animation: flowRight 2s linear infinite 1.5s; }
        .data-glow { animation: dataGlow 3s ease-in-out infinite; }
      `}</style>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="mx-auto max-w-4xl">
          {/* Main Flow Grid */}
          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-6">

            {/* User Node */}
            <div className="flex flex-col items-center">
              <div className="flex size-24 flex-col items-center justify-center rounded-2xl border-2 border-fd-border bg-fd-card shadow-md">
                <Monitor className="size-8 text-fd-foreground" strokeWidth={1.5} />
                <span className="mt-1 text-xs font-bold text-fd-foreground">YOU</span>
              </div>
              <p className="mt-3 text-sm font-medium text-fd-foreground">Any Platform</p>
              <p className="text-xs text-fd-muted-foreground">Any Location</p>
            </div>

            {/* Flow Lines: User → Gateways */}
            <div className="flex flex-col items-center gap-6 py-4">
              {/* Purple flow track */}
              <div className="relative h-1 w-20 rounded-full bg-purple-500/30">
                <div className="loc-flow-right-1 absolute left-0 top-1/2 size-2 -translate-y-1/2 rounded-full bg-purple-500 shadow-sm" />
                <div className="loc-flow-right-3 absolute left-0 top-1/2 size-2 -translate-y-1/2 rounded-full bg-purple-500 shadow-sm" />
              </div>
              {/* Blue flow track */}
              <div className="relative h-1 w-20 rounded-full bg-blue-500/30">
                <div className="loc-flow-right-2 absolute left-0 top-1/2 size-2 -translate-y-1/2 rounded-full bg-blue-500 shadow-sm" />
                <div className="loc-flow-right-4 absolute left-0 top-1/2 size-2 -translate-y-1/2 rounded-full bg-blue-500 shadow-sm" />
              </div>
              {/* Teal flow track */}
              <div className="relative h-1 w-20 rounded-full bg-teal-500/30">
                <div className="loc-flow-right-3 absolute left-0 top-1/2 size-2 -translate-y-1/2 rounded-full bg-teal-500 shadow-sm" />
                <div className="loc-flow-right-1 absolute left-0 top-1/2 size-2 -translate-y-1/2 rounded-full bg-teal-500 shadow-sm" />
              </div>
            </div>

            {/* Gateway Nodes with Locations */}
            <div className="flex flex-col items-center gap-3">
              {/* Network Label - Above */}
              <div className="mb-1 rounded-full border border-fd-primary/20 bg-fd-primary/5 px-4 py-1">
                <span className="text-xs font-semibold text-fd-primary">ar.io Network</span>
              </div>
              {/* Gateway A - North America */}
              <div className="flex w-44 items-center gap-3 rounded-xl border border-purple-500/30 bg-purple-500/5 px-4 py-2.5">
                <div className="flex size-10 items-center justify-center rounded-lg bg-purple-500/10">
                  <Server className="size-5 text-purple-600" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-fd-foreground">Gateway A</p>
                  <p className="flex items-center gap-1 text-[10px] text-fd-muted-foreground">
                    <Globe className="size-3" /> North America
                  </p>
                </div>
              </div>
              {/* Gateway B - Europe */}
              <div className="flex w-44 items-center gap-3 rounded-xl border border-blue-500/30 bg-blue-500/5 px-4 py-2.5">
                <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500/10">
                  <Server className="size-5 text-blue-600" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-fd-foreground">Gateway B</p>
                  <p className="flex items-center gap-1 text-[10px] text-fd-muted-foreground">
                    <Globe className="size-3" /> Europe
                  </p>
                </div>
              </div>
              {/* Gateway C - Asia Pacific */}
              <div className="flex w-44 items-center gap-3 rounded-xl border border-teal-500/30 bg-teal-500/5 px-4 py-2.5">
                <div className="flex size-10 items-center justify-center rounded-lg bg-teal-500/10">
                  <Server className="size-5 text-teal-600" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-fd-foreground">Gateway C</p>
                  <p className="flex items-center gap-1 text-[10px] text-fd-muted-foreground">
                    <Globe className="size-3" /> Asia Pacific
                  </p>
                </div>
              </div>
            </div>

            {/* Flow Lines: Gateways → Data (converging) */}
            <div className="flex flex-col items-center gap-6 py-4">
              {/* Purple flow track */}
              <div className="relative h-1 w-20 rounded-full bg-purple-500/30">
                <div className="loc-flow-right-2 absolute left-0 top-1/2 size-2 -translate-y-1/2 rounded-full bg-purple-500 shadow-sm" />
              </div>
              {/* Blue flow track */}
              <div className="relative h-1 w-20 rounded-full bg-blue-500/30">
                <div className="loc-flow-right-3 absolute left-0 top-1/2 size-2 -translate-y-1/2 rounded-full bg-blue-500 shadow-sm" />
              </div>
              {/* Teal flow track */}
              <div className="relative h-1 w-20 rounded-full bg-teal-500/30">
                <div className="loc-flow-right-4 absolute left-0 top-1/2 size-2 -translate-y-1/2 rounded-full bg-teal-500 shadow-sm" />
              </div>
            </div>

            {/* Data/App Node */}
            <div className="flex flex-col items-center">
              <div className="data-glow relative flex size-28 flex-col items-center justify-center rounded-2xl border-2 border-fd-primary bg-fd-card shadow-lg">
                <Database className="size-9 text-fd-primary" strokeWidth={1.5} />
                <span className="mt-1.5 text-xs font-bold text-fd-foreground">YOUR DATA</span>
              </div>
              <p className="mt-3 text-sm font-semibold text-fd-primary">Same Content, Always</p>
              <p className="text-xs text-fd-muted-foreground">Permanent & verifiable</p>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="space-y-4">
          {/* User Card */}
          <div className="flex items-center gap-4 rounded-xl border border-fd-border bg-fd-card p-4 shadow-sm">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-fd-muted">
              <Monitor className="size-7 text-fd-foreground" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-semibold text-fd-foreground">You</p>
              <p className="text-sm text-fd-muted-foreground">Any platform, any location</p>
            </div>
          </div>

          {/* Arrow Down */}
          <div className="flex justify-center">
            <div className="rounded-full bg-fd-primary/10 p-2">
              <ArrowDown className="size-5 text-fd-primary" />
            </div>
          </div>

          {/* Gateways */}
          <div className="rounded-xl border border-fd-border bg-fd-card p-4 shadow-sm">
            <div className="mb-3 flex justify-center">
              <span className="rounded-full border border-fd-primary/20 bg-fd-primary/5 px-3 py-0.5 text-xs font-semibold text-fd-primary">ar.io Network</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {GATEWAY_NODES.map((gw, idx) => (
                <div
                  key={gw.id}
                  className={`flex flex-col items-center rounded-lg border p-2 ${
                    idx === 0 ? "border-purple-500/30 bg-purple-500/5" :
                    idx === 1 ? "border-blue-500/30 bg-blue-500/5" :
                    "border-teal-500/30 bg-teal-500/5"
                  }`}
                >
                  <Server className={`size-5 ${
                    idx === 0 ? "text-purple-600" :
                    idx === 1 ? "text-blue-600" :
                    "text-teal-600"
                  }`} strokeWidth={1.5} />
                  <p className="mt-1 text-[10px] font-semibold text-fd-foreground">{gw.label}</p>
                  <p className="flex items-center gap-0.5 text-[9px] text-fd-muted-foreground">
                    <Globe className="size-2.5" /> {gw.location}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow Down */}
          <div className="flex justify-center">
            <div className="rounded-full bg-fd-primary/10 p-2">
              <ArrowDown className="size-5 text-fd-primary" />
            </div>
          </div>

          {/* Data Card */}
          <div className="flex items-center gap-4 rounded-xl border-2 border-fd-primary bg-fd-card p-4 shadow-lg">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-fd-primary/10">
              <Database className="size-7 text-fd-primary" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-semibold text-fd-foreground">Same Content, Always</p>
              <p className="text-sm text-fd-muted-foreground">Permanent & verifiable</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Data Flow Tabs Component
   ========================================================================== */

interface FlowStep {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface DataFlowTab {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  steps: FlowStep[];
  callout?: {
    icon: LucideIcon;
    title: string;
    description: string;
  };
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

const DATA_FLOW_TABS: DataFlowTab[] = [
  {
    id: "write",
    label: "Write",
    title: "Write",
    subtitle: "Store critical data permanently with automatic audit trails.",
    steps: [
      {
        icon: Upload,
        title: "Upload",
        description: "Seamless integration with your existing systems",
      },
      {
        icon: Check,
        title: "Confirm",
        description: "Instant proof of submission for your records",
      },
      {
        icon: Lock,
        title: "Secure",
        description: "Data locked permanently, tamper-proof",
      },
      {
        icon: Globe,
        title: "Distribute",
        description: "Available from any location worldwide",
      },
    ],
    callout: {
      icon: Clock,
      title: "Immediate Availability",
      description: "Your data is available immediately after upload while permanence is being secured. Once confirmed, it's locked forever with full audit trail.",
    },
    primaryCta: { label: "Learn About Storage", href: "https://docs.ar.io/build/upload/" },
  },
  {
    id: "read",
    label: "Read",
    title: "Read",
    subtitle: "Access your data instantly from anywhere - no servers to manage, no downtime.",
    steps: [
      {
        icon: Download,
        title: "Request",
        description: "Simple URL or branded domain access",
      },
      {
        icon: Zap,
        title: "Instant",
        description: "Sub-second response from global network",
      },
      {
        icon: ShieldCheck,
        title: "Verified",
        description: "Automatic integrity confirmation",
      },
      {
        icon: Globe,
        title: "Always On",
        description: "No single point of failure, ever",
      },
    ],
    callout: {
      icon: Compass,
      title: "Branded Access",
      description: "Use your own domain names for professional, branded access to your permanent archives. No infrastructure to manage - just point and access.",
    },
    primaryCta: { label: "Learn About Access", href: "https://docs.ar.io/learn/gateways/data-retrieval/" },
    secondaryCta: { label: "Learn About Smart Domains", href: "https://docs.ar.io/learn/arns/" },
  },
  {
    id: "compute",
    label: "Compute",
    title: "Compute",
    subtitle: "Automatically preserve AI outputs, reports, and processed data with full provenance.",
    steps: [
      {
        icon: Zap,
        title: "Process",
        description: "AI, analytics, or any workflow",
      },
      {
        icon: Upload,
        title: "Archive",
        description: "Outputs stored automatically",
      },
      {
        icon: ShieldCheck,
        title: "Prove",
        description: "Timestamp and chain of custody",
      },
      {
        icon: Globe,
        title: "Share",
        description: "Instant access for stakeholders",
      },
    ],
    callout: {
      icon: Workflow,
      title: "Future-Proof Your AI",
      description: "AI models change, but your outputs don't have to disappear. Permanently archive AI-generated content, model outputs, and decision logs with verifiable timestamps for compliance and audit trails.",
    },
    primaryCta: { label: "Integration Guides", href: "https://docs.ar.io/build/guides/" },
  },
];

function DataFlowTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = DATA_FLOW_TABS[activeTab];

  return (
    <div className="rounded-2xl border border-fd-border bg-fd-card p-4 shadow-sm sm:p-6 md:p-8">
      {/* Three-Card Selector */}
      <div className="mb-6 grid grid-cols-3 gap-2 sm:mb-8 sm:gap-3">
        {DATA_FLOW_TABS.map((t, index) => {
          const icons = [Upload, Download, Cpu];
          const descriptions = ["Store permanently", "Access anywhere", "Preserve AI outputs"];
          const Icon = icons[index];
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(index)}
              className={`relative rounded-lg sm:rounded-xl border p-2.5 sm:p-3 md:p-4 text-left transition-all ${
                index === activeTab
                  ? "border-transparent bg-fd-primary/15 shadow-md"
                  : "border-fd-border bg-fd-background hover:bg-fd-primary/5 hover:shadow-sm"
              }`}
            >
              <div className="flex flex-col items-center gap-1 sm:flex-row sm:items-center sm:gap-2 md:gap-3">
                <Icon className={`size-6 sm:size-5 md:size-6 shrink-0 text-fd-primary`} />
                <div className="min-w-0 text-center sm:text-left">
                  <h3 className={`text-sm sm:text-base md:text-lg font-bold ${index === activeTab ? "text-fd-foreground" : "text-fd-foreground/80"}`}>
                    {t.label}
                  </h3>
                  <p className={`hidden sm:block text-[10px] md:text-xs truncate text-fd-muted-foreground`}>
                    {descriptions[index]}
                  </p>
                </div>
              </div>
              {index === activeTab && (
                <div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 size-0 border-x-6 border-t-6 sm:border-x-8 sm:border-t-8 border-x-transparent"
                  style={{ borderTopColor: "#E8E0F8" }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content - fixed height container for consistent card size */}
      <div className="min-h-[420px] md:min-h-[340px] flex flex-col">
      <div className="text-center mb-8">
        <p className="text-sm text-fd-muted-foreground md:text-base min-h-[40px] md:min-h-[24px]">
          {tab.subtitle}
        </p>
      </div>

      {/* Rich Flow Diagram */}
      <div className="relative">
        {/* Connection line */}
        {/* Desktop: connecting line */}
        <div className="absolute top-8 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-fd-primary/20 via-fd-primary to-fd-primary/20 hidden md:block" />

        {/* Mobile: numbered list with descriptions */}
        <div className="space-y-2 md:hidden">
          {tab.steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="flex items-center gap-3 rounded-lg border border-fd-border/50 bg-fd-background/70 p-2.5 shadow-sm">
                <div className="relative shrink-0">
                  <div className="flex size-10 items-center justify-center rounded-full border-2 border-fd-primary bg-fd-background/70">
                    <Icon className="size-5 text-fd-primary" strokeWidth={1.5} />
                  </div>
                  <div className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-fd-primary text-[9px] font-bold text-white">
                    {index + 1}
                  </div>
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-fd-foreground">{step.title}</h4>
                  <p className="text-xs text-fd-muted-foreground leading-snug">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop: full layout */}
        <div className="hidden md:grid md:grid-cols-4 md:gap-4 md:px-8">
          {tab.steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative flex flex-col items-center text-center">
                {/* Step circle */}
                <div className="relative z-10 flex size-16 items-center justify-center rounded-full border-2 border-fd-primary bg-fd-background shadow-md">
                  <Icon className="size-7 text-fd-primary" strokeWidth={1.5} />
                  {/* Step number badge */}
                  <div className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-fd-primary text-[10px] font-bold text-white">
                    {index + 1}
                  </div>
                </div>
                {/* Content */}
                <h4 className="mt-3 text-sm font-bold text-fd-foreground">
                  {step.title}
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-fd-muted-foreground max-w-[140px]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Callout */}
      {tab.callout && (
        <div className="mt-8 rounded-xl border border-fd-primary/20 bg-fd-primary/5 p-5">
          <div className="flex items-start gap-4">
            <tab.callout.icon className="mt-0.5 size-5 shrink-0 text-fd-primary" />
            <div>
              <h4 className="font-semibold text-fd-foreground">
                {tab.callout.title}
              </h4>
              <p className="mt-1 text-sm text-fd-muted-foreground">
                {tab.callout.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CTAs */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a
          href={tab.primaryCta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#23232D] px-5 py-2.5 text-sm font-semibold text-[#F0F0F0] hover:opacity-90 transition-opacity"
        >
          {tab.primaryCta.label}
          <ExternalLink className="size-4" />
        </a>
        {tab.secondaryCta && (
          <a
            href={tab.secondaryCta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#23232D] bg-transparent px-5 py-2.5 text-sm font-semibold text-[#23232D] hover:bg-[#23232D]/5 transition-colors"
          >
            {tab.secondaryCta.label}
            <ExternalLink className="size-4" />
          </a>
        )}
      </div>
      </div>{/* End fixed height container */}
    </div>
  );
}


/* ==========================================================================
   Page Component
   ========================================================================== */

export function TechnologyPage() {
  return (
    <main
      style={{
        background:
          "linear-gradient(to bottom, rgb(var(--color-fd-background)) 0%, rgb(var(--color-fd-background)) 33%, rgb(223 214 247) 66%, rgb(223 214 247) 100%)",
      }}
    >
      {/* Hero Section */}
      <section className="pb-12 pt-10">
        <div className={SITE_CONTAINER_CLASS}>
          <div className="relative overflow-hidden rounded-[2.5rem]">
            <BaseImage
              src="/technology/hero-technology.png"
              alt=""
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 1400px, 100vw"
            />
            {/* Dark overlay for text readability - full on mobile, gradient on desktop */}
            <div className="absolute inset-0 bg-black/60 lg:hidden" />
            <div
              className="absolute inset-0 hidden lg:block"
              style={{
                background: "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0) 65%)",
              }}
            />

            <div className="relative px-8 py-14 md:px-14 md:py-20 lg:py-24 min-h-[400px] md:min-h-[480px] lg:min-h-[520px]">
              <div className="max-w-2xl">
                <PageTitleBadge title="Technology" />

                <h1 className="mt-6 text-balance text-5xl font-bold tracking-tight text-white lg:text-6xl">
                  A permanent cloud.
                </h1>

                <p className="mt-4 text-base leading-7 text-white/90">
                  A critical backup system for your most important data.
                </p>

                <ul className="mt-6 space-y-3 text-sm text-white/90">
                  <li className="flex items-center gap-3">
                    <BulletIcon />
                    <span className="font-semibold">
                      Immutable data with built-in integrity, auditability and provenance
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <BulletIcon />
                    <span className="font-semibold">
                      Always-on global access, independent of regions or vendors.
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <BulletIcon />
                    <span className="font-semibold">
                      A backup system that cannot be altered, expired, or deleted.
                    </span>
                  </li>
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <SecondaryCta href="https://docs.ar.io/learn/" variant="light" external>
                    Read the Docs
                  </SecondaryCta>
                  <SecondaryCta href="/case-studies" variant="light">
                    See Case Studies
                  </SecondaryCta>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Simple Three Panel Explanation */}
      <section className={`${SITE_CONTAINER_CLASS} py-16`}>
        <div className={HOW_IT_WORKS_WIDTH_CLASS}>
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-fd-foreground md:text-4xl">
              Pay once. Access and preserve forever.
            </h2>
          </div>

          <HowItWorksArweave />
        </div>
      </section>

      {/* How You Are Protected Section */}
      <section className="py-16">
        <div className={`${SITE_CONTAINER_CLASS}`}>
          <div className={HOW_IT_WORKS_WIDTH_CLASS}>
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl">
                How You Are Protected
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-fd-muted-foreground md:text-base md:leading-7">
                Built-in protocols that protect your data and your business by design.
              </p>
            </div>

            <ShieldDiagram />

            <div className="mt-10 flex justify-center">
              <a
                href="https://whitepaper.ar.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-fd-primary hover:underline"
              >
                Read the ar.io whitepaper
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Deployment Options */}
      <section className={`${SITE_CONTAINER_CLASS} py-16`}>
        <div className={HOW_IT_WORKS_WIDTH_CLASS}>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-fd-foreground md:text-4xl">
              Choose Your Setup
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-fd-muted-foreground md:text-base">
              From full infrastructure control to zero ops—pick what fits your team.
            </p>
          </div>

          <DeploymentCards />
        </div>
      </section>

      {/* Protocol Architecture - Three-Layer Model */}
      <section className={`${SITE_CONTAINER_CLASS} py-10`}>
        <div className={HOW_IT_WORKS_WIDTH_CLASS}>
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl">
              Three-Layer Architecture
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-fd-muted-foreground md:text-base md:leading-7">
              Ar.io consists of a modular protocol stack where each layer handles specific
              responsibilities. Compose them into production-ready infrastructure that suits your needs.
            </p>
          </div>

          {/* Stack Diagram */}
          <div className="rounded-2xl border border-fd-border bg-fd-card p-6 shadow-sm md:p-8">
            <StackDiagram />
          </div>
        </div>
      </section>

      {/* Location Independent Data and Apps Section */}
      <section className={`${SITE_CONTAINER_CLASS} py-12`}>
        <div className={HOW_IT_WORKS_WIDTH_CLASS}>
          {/* Section Header */}
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl">
              Location Independent Data and Apps
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-fd-muted-foreground md:text-base md:leading-7">
              Access your data or apps through any ar.io gateway. The same verifiable content is accessible every time, from anywhere.
            </p>
          </div>

          {/* Diagram */}
          <div className="rounded-2xl border border-fd-border bg-fd-card p-6 shadow-sm md:p-8">
            <LocationIndependentDiagram />
          </div>

          {/* Feature Points */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-fd-primary/10">
                <Globe className="size-5 text-fd-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-fd-foreground">No Single Point of Failure</h3>
                <p className="mt-1 text-sm text-fd-muted-foreground">
                  Your content is replicated and cached across the network. If one gateway is unavailable, simply use another.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-fd-primary/10">
                <Link2 className="size-5 text-fd-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-fd-foreground">Human-Readable URLs</h3>
                <p className="mt-1 text-sm text-fd-muted-foreground">
                  Assign a smart domain name like <code className="rounded bg-fd-muted px-1 text-xs">ardrive.ar.io</code> to your data or app - own it permanently or lease it. Accessible across all gateways.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-fd-primary/10">
                <RefreshCw className="size-5 text-fd-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-fd-foreground">Update Without Breaking Links</h3>
                <p className="mt-1 text-sm text-fd-muted-foreground">
                  Smart domains are mutable pointers to immutable content addresses. Update your content without changing how to access it.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <a
              href="https://docs.ar.io/learn/arns/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-fd-primary hover:underline"
            >
              Learn more about Smart Domains (ArNS)
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Network Services Section */}
      <section className="py-12">
        <div className={SITE_CONTAINER_CLASS}>
          <div className={HOW_IT_WORKS_WIDTH_CLASS}>
            <div className="mb-10 text-center">
              <h2 className="text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl">
                Network Services
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-fd-muted-foreground md:text-base md:leading-7">
                Every ar.io gateway provides a comprehensive suite of services - from content delivery and name resolution to data indexing and upload processing.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Left: Key Services */}
              <div>
                <h3 className="text-xl font-bold text-fd-foreground">
                  Core Services
                </h3>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start gap-3">
                    <Zap className="mt-0.5 size-5 shrink-0 text-fd-primary" />
                    <div>
                      <span className="font-semibold text-fd-foreground">
                        Content Delivery
                      </span>
                      <p className="mt-0.5 text-sm text-fd-muted-foreground">
                        Fast global delivery with intelligent caching and automatic failover.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Link2 className="mt-0.5 size-5 shrink-0 text-fd-primary" />
                    <div>
                      <span className="font-semibold text-fd-foreground">
                        Name System
                      </span>
                      <p className="mt-0.5 text-sm text-fd-muted-foreground">
                        Smart domain names accessible across all gateways.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Search className="mt-0.5 size-5 shrink-0 text-fd-primary" />
                    <div>
                      <span className="font-semibold text-fd-foreground">
                        Data Indexing
                      </span>
                      <p className="mt-0.5 text-sm text-fd-muted-foreground">
                        Search and discover content with flexible metadata tagging.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Upload className="mt-0.5 size-5 shrink-0 text-fd-primary" />
                    <div>
                      <span className="font-semibold text-fd-foreground">
                        Uploading
                      </span>
                      <p className="mt-0.5 text-sm text-fd-muted-foreground">
                        Fast uploads with immediate availability, permanently settled.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 size-5 shrink-0 text-fd-primary" />
                    <div>
                      <span className="font-semibold text-fd-foreground">
                        Verification
                      </span>
                      <p className="mt-0.5 text-sm text-fd-muted-foreground">
                        Every download verified against tamper-proof records.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <DollarSign className="mt-0.5 size-5 shrink-0 text-fd-primary" />
                    <div>
                      <span className="font-semibold text-fd-foreground">
                        Payments
                      </span>
                      <p className="mt-0.5 text-sm text-fd-muted-foreground">
                        Pay in your currency of choice: fiat or crypto.
                      </p>
                    </div>
                  </li>
                </ul>

                <div className="mt-6">
                  <a
                    href="https://docs.ar.io/learn/what-is-ario/#features-of-the-ario-network"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-fd-primary hover:underline"
                  >
                    Learn more about Network Services
                    <ArrowRight className="size-4" />
                  </a>
                </div>
              </div>

              {/* Right: Services Diagram */}
              <div className="flex items-center justify-center">
                <div className="overflow-hidden rounded-2xl border border-fd-border shadow-sm">
                  <BaseImage
                    src="/technology/AR.IO Network Services Light.svg"
                    alt="ar.io Network Services diagram"
                    width={901}
                    height={646}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Flow Section - Tabbed */}
      <section id="data-flow" className={`${SITE_CONTAINER_CLASS} py-10`}>
        <div className={HOW_IT_WORKS_WIDTH_CLASS}>
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl">
              How Data Flows
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-fd-muted-foreground md:text-base md:leading-7">
              From upload to retrieval to naming - understand how data moves.
            </p>
          </div>

          <DataFlowTabs />
        </div>
      </section>

      {/* Performance Specifications Section */}
      <section className={`${SITE_CONTAINER_CLASS} py-10`}>
        <div className={HOW_IT_WORKS_WIDTH_CLASS}>
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl">
              Performance Specifications
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-fd-muted-foreground md:text-base md:leading-7">
              Enterprise-grade infrastructure metrics. Real numbers from
              production deployments.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            <SpecItem
              value="<1s"
              label="Data Settlement"
              description="Near instant availability of new data"
            />
            <SpecItem
              value="<100ms"
              label="Cache Hit Latency"
              description="Local cache retrieval for hot data"
            />
            <SpecItem
              value="~860"
              label="Files per Second"
              description="Average production upload throughput"
            />
            <SpecItem
              value="600+"
              label="Active Gateways"
              description="Globally distributed infrastructure"
            />
            <SpecItem
              value="100%"
              label="Network Availability"
              description="Observed network-wide uptime"
            />
            <SpecItem
              value="200+"
              label="Year Storage Design"
              description="Arweave endowment model duration"
            />
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-12">
        <div className={SITE_CONTAINER_CLASS}>
          <div className={HOW_IT_WORKS_WIDTH_CLASS}>
            <div className="mb-10 text-center">
              <h2 className="text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl">
                How Storage Options Compare
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-fd-muted-foreground md:text-base md:leading-7">
                Different solutions serve different needs. Here&apos;s how permanent storage fits into the landscape.
              </p>
            </div>

            {/* Comparison Table */}
            <div className="rounded-2xl border border-fd-border bg-fd-card p-6 shadow-sm">
              <ComparisonTable
                rows={[
                  {
                    feature: "Permanence",
                    ario: "200+ year design",
                    ipfs: "While hosted",
                    cloud: "While subscribed",
                  },
                  {
                    feature: "Cost Model",
                    ario: "One-time payment",
                    ipfs: "Self-host or subscription",
                    cloud: "Subscription",
                  },
                  {
                    feature: "Ransomware Immune",
                    ario: true,
                    ipfs: true,
                    cloud: false,
                  },
                  {
                    feature: "Data Integrity",
                    ario: "Timestamped proofs",
                    ipfs: "Content-addressed",
                    cloud: "Trust provider",
                  },
                  {
                    feature: "Open Source",
                    ario: true,
                    ipfs: true,
                    cloud: "Varies",
                  },
                  {
                    feature: "Portability",
                    ario: true,
                    ipfs: true,
                    cloud: false,
                  },
                  {
                    feature: "Infrastructure",
                    ario: "Decentralized",
                    ipfs: "Distributed",
                    cloud: "Centralized",
                  },
                ]}
              />
            </div>

            <div className="mt-10 flex justify-center">
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 text-sm font-semibold text-fd-primary hover:underline"
              >
                See Real-World Examples
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className={`${SITE_CONTAINER_CLASS} pb-20 pt-8`}>
        <div
          className={`relative overflow-hidden rounded-[2rem] border border-fd-border p-8 shadow-sm md:p-12 ${FINAL_CTA_WIDTH_CLASS}`}
          style={{
            background:
              "linear-gradient(to bottom right, rgb(var(--color-fd-card)), rgb(223 214 247))",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-fd-primary/10" />
          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-fd-foreground md:text-4xl">
              Ready to build with ar.io?
            </h2>
            <p className="mt-4 text-base leading-7 text-fd-muted-foreground">
              Whether you&apos;re uploading your first file or architecting
              enterprise infrastructure, we&apos;re here to help.
            </p>
            <div className="mt-8 flex justify-center">
              <ContactUsTrigger className="inline-flex items-center gap-2 rounded-full bg-[#23232D] px-6 py-3 text-sm font-semibold text-[#F0F0F0] hover:opacity-90 transition-opacity">
                Get Started
              </ContactUsTrigger>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
