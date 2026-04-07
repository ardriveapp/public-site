import type { ReactNode } from "react";

interface SiteContainerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "main" | "header" | "footer" | "nav";
}

/**
 * Shared layout container for the site-wide width rail.
 * Provides consistent max-width, centering, and responsive padding.
 * Default: max-w-[1400px] with responsive horizontal padding.
 */
export function SiteContainer({
  children,
  className = "",
  as: Component = "div",
}: SiteContainerProps) {
  return (
    <Component
      className={`mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </Component>
  );
}

/**
 * Exported class string for use in cases where a component wrapper isn't suitable.
 * Usage: <div className={SITE_CONTAINER_CLASS}>...</div>
 */
export const SITE_CONTAINER_CLASS =
  "mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8";

/**
 * Common width presets (use to avoid full-width stretched cards).
 * Compose with `mx-auto` / grid `justify-items-center` when centering is desired.
 */
export const WIDTH_NARROW_CLASS = "w-full max-w-sm";
export const WIDTH_XNARROW_CLASS = "w-full max-w-xs";
export const WIDTH_MEDIUM_CLASS = "w-full max-w-md";
export const WIDTH_WIDE_CLASS = "w-full max-w-lg";

/**
 * Problem card layout for Enterprise/Institutions pages.
 * Two-column rail with text + image, centered on wide screens.
 *
 * - Left column: ~520px (text)
 * - Right column: ~640px (image, aligns to bottom)
 */
export const PROBLEM_CARD_RAIL_CLASS =
  "grid gap-8 lg:grid-cols-[minmax(0,520px)_minmax(0,640px)] lg:justify-center lg:gap-12";

/**
 * Max-width wrapper for problem cards using `PROBLEM_CARD_RAIL_CLASS`.
 */
export const PROBLEM_CARD_WIDTH_CLASS = "mx-auto w-full max-w-[1200px]";

/**
 * Max-width wrapper for "What You Get" sections (narrower than problem cards).
 */
export const WHAT_YOU_GET_WIDTH_CLASS = "mx-auto w-full max-w-[1000px]";

/**
 * Max-width wrapper for "How It Works" sections (same width as problem cards).
 */
export const HOW_IT_WORKS_WIDTH_CLASS = "mx-auto w-full max-w-[1200px]";

/**
 * Max-width wrapper for case study sections (matches homepage Meta section).
 */
export const CASE_STUDY_WIDTH_CLASS = "mx-auto w-full max-w-[1100px]";

/**
 * Max-width wrapper for final CTA sections (narrower for focus).
 */
export const FINAL_CTA_WIDTH_CLASS = "mx-auto w-full max-w-[900px]";
