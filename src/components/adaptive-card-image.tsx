"use client";

import type { SyntheticEvent } from "react";
import { useMemo, useState } from "react";
import { BaseImage } from "@/components/base-image";

type FitMode = "cover" | "contain";

export interface AdaptiveCardImageProps {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  /**
   * Images outside this aspect-ratio range are rendered with `contain` to avoid
   * aggressive cropping in fixed card media slots.
   */
  containIfRatioOutside?: { min: number; max: number };
}

function pickFitMode(
  w: number,
  h: number,
  containIfRatioOutside: { min: number; max: number },
): FitMode {
  if (w <= 0 || h <= 0) return "cover";
  const r = w / h;
  return r < containIfRatioOutside.min || r > containIfRatioOutside.max ? "contain" : "cover";
}

export function AdaptiveCardImage({
  src,
  alt,
  sizes,
  className,
  containIfRatioOutside = { min: 0.85, max: 1.95 },
}: AdaptiveCardImageProps) {
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);

  const fit = useMemo<FitMode>(() => {
    if (!natural) return "cover";
    return pickFitMode(natural.w, natural.h, containIfRatioOutside);
  }, [natural, containIfRatioOutside]);

  return (
    <div className={className}>
      {fit === "contain" && (
        <>
          <BaseImage
            src={src}
            alt=""
            fill
            className="object-cover scale-110 blur-2xl opacity-30"
            sizes={sizes}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-fd-background/55 via-fd-background/10 to-fd-primary/12" />
        </>
      )}

      <BaseImage
        src={src}
        alt={alt}
        fill
        className={fit === "contain" ? "object-contain" : "object-cover transition-transform group-hover:scale-105"}
        sizes={sizes}
        onLoad={(e: SyntheticEvent<HTMLImageElement>) => {
          const img = e.currentTarget;
          setNatural({ w: img.naturalWidth, h: img.naturalHeight });
        }}
      />
    </div>
  );
}

