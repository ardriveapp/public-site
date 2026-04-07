"use client";

import type { SyntheticEvent } from "react";
import { useMemo, useState } from "react";
import { BaseImage } from "@/components/base-image";

type HeroSize = "normal" | "wide";

export interface AdaptiveHeroProps {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}

function getHeroSize(naturalWidth: number, naturalHeight: number): HeroSize {
  if (naturalWidth <= 0 || naturalHeight <= 0) return "normal";
  const ratio = naturalWidth / naturalHeight;

  // Ultra-wide heroes tend to get side-cropped with `object-cover`.
  // Instead of switching to `contain` (which adds letterboxing),
  // we keep `cover` but use a shorter container (wider aspect).
  return ratio >= 1.95 ? "wide" : "normal";
}

export function AdaptiveHero({ src, alt, sizes, priority }: AdaptiveHeroProps) {
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);

  const heroSize = useMemo<HeroSize>(() => {
    if (!natural) return "normal";
    return getHeroSize(natural.w, natural.h);
  }, [natural]);

  const wrapperClassName =
    heroSize === "wide"
      ? "relative mb-8 h-52 w-full overflow-hidden rounded-2xl md:h-80"
      : "relative mb-8 h-72 w-full overflow-hidden rounded-2xl md:h-[28rem]";

  return (
    <div className={wrapperClassName}>
      <BaseImage
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes={sizes}
        priority={priority}
        onLoad={(e: SyntheticEvent<HTMLImageElement>) => {
          const img = e.currentTarget;
          setNatural({ w: img.naturalWidth, h: img.naturalHeight });
        }}
      />
    </div>
  );
}

