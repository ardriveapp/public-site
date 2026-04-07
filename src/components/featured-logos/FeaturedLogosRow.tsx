"use client";

import { useState, useEffect, useRef } from "react";
import { BaseImage } from "@/components/base-image";
import { SITE_CONTAINER_CLASS } from "@/components/site-container";
import type { EcosystemItem } from "@/lib/ecosystem";

/**
 * Fisher-Yates shuffle algorithm for random array ordering
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

interface FeaturedLogosRowProps {
  featuredItems: EcosystemItem[];
}

export function FeaturedLogosRow({ featuredItems }: FeaturedLogosRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  
  // Use initial order for SSR, then randomize on client after hydration
  const [selectedLogos, setSelectedLogos] = useState<EcosystemItem[]>(() => {
    // Initial render: use first 10 items in original order (matches server)
    return featuredItems.slice(0, 10);
  });

  // Randomize only on client side after hydration
  useEffect(() => {
    const shuffled = shuffleArray(featuredItems);
    setSelectedLogos(shuffled.slice(0, 10));
  }, [featuredItems]);

  // Infinite scroll handler - seamless looping in both directions
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const scrollWidth = container.scrollWidth;
      const scrollLeft = container.scrollLeft;
      
      // Each set takes up half the scroll width
      const singleSetWidth = scrollWidth / 2;
      
      // Use a small threshold to avoid exact matching issues
      const threshold = 10;
      
      // If scrolled past the second set (near the end), jump back to first set position
      if (scrollLeft >= singleSetWidth - threshold) {
        isScrollingRef.current = true;
        container.scrollLeft = scrollLeft - singleSetWidth;
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 50);
      }
      // If scrolled before the first set (near the start), jump to second set position
      else if (scrollLeft <= threshold) {
        isScrollingRef.current = true;
        container.scrollLeft = scrollLeft + singleSetWidth;
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 50);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [selectedLogos]);

  // Don't render if we don't have enough logos
  if (selectedLogos.length === 0) {
    return null;
  }

  return (
    <section className="py-10">
      <div className={SITE_CONTAINER_CLASS}>
        <div className="text-center mb-8">
          <p className="text-sm font-semibold text-[#23232D]">
            Trusted by the best
          </p>
        </div>

        {/* Mobile: infinite scrollable carousel without scrollbar */}
        <div className="md:hidden relative overflow-hidden pb-4">
          <style jsx>{`
            .scroll-container {
              scrollbar-width: none; /* Firefox */
              -ms-overflow-style: none; /* Internet Explorer 10+ */
            }
            .scroll-container::-webkit-scrollbar {
              display: none; /* WebKit */
            }
          `}</style>
          <div 
            ref={scrollContainerRef}
            className="flex items-center gap-x-8 overflow-x-auto scroll-container"
            style={{ scrollBehavior: 'auto' }}
          >
            {/* First set of logos */}
            {selectedLogos.map((item) => (
              <div
                key={`first-${item.slug}`}
                className="flex items-center justify-center bg-transparent grayscale hover:grayscale-0 transition-all duration-300 flex-shrink-0"
              >
                {item.websiteUrl ? (
                  <a
                    href={item.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                    style={{ textDecoration: 'none' }}
                    aria-label={`Visit ${item.title} website`}
                  >
                    <BaseImage
                      src={item.logoPath!}
                      alt={item.title}
                      width={120}
                      height={48}
                      className="h-12 w-auto object-contain"
                      style={{ backgroundColor: 'transparent' }}
                    />
                  </a>
                ) : (
                  <BaseImage
                    src={item.logoPath!}
                    alt={item.title}
                    width={120}
                    height={48}
                    className="h-12 w-auto object-contain"
                    style={{ backgroundColor: 'transparent' }}
                  />
                )}
              </div>
            ))}
            {/* Duplicate set for infinite scroll effect */}
            {selectedLogos.map((item) => (
              <div
                key={`second-${item.slug}`}
                className="flex items-center justify-center bg-transparent grayscale hover:grayscale-0 transition-all duration-300 flex-shrink-0"
              >
                {item.websiteUrl ? (
                  <a
                    href={item.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                    style={{ textDecoration: 'none' }}
                    aria-label={`Visit ${item.title} website`}
                  >
                    <BaseImage
                      src={item.logoPath!}
                      alt={item.title}
                      width={120}
                      height={48}
                      className="h-12 w-auto object-contain"
                      style={{ backgroundColor: 'transparent' }}
                    />
                  </a>
                ) : (
                  <BaseImage
                    src={item.logoPath!}
                    alt={item.title}
                    width={120}
                    height={48}
                    className="h-12 w-auto object-contain"
                    style={{ backgroundColor: 'transparent' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: wrapped grid */}
        <div className="hidden md:flex flex-wrap items-center justify-center gap-x-8 gap-y-6 lg:gap-x-12">
          {selectedLogos.map((item) => (
            <div
              key={item.slug}
              className="flex items-center justify-center bg-transparent grayscale hover:grayscale-0 transition-all duration-300"
            >
              {item.websiteUrl ? (
                <a
                  href={item.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  style={{ textDecoration: 'none' }}
                  aria-label={`Visit ${item.title} website`}
                >
                  <BaseImage
                    src={item.logoPath!}
                    alt={item.title}
                    width={120}
                    height={48}
                    className="h-12 w-auto object-contain"
                    style={{ backgroundColor: 'transparent' }}
                  />
                </a>
              ) : (
                <BaseImage
                  src={item.logoPath!}
                  alt={item.title}
                  width={120}
                  height={48}
                  className="h-12 w-auto object-contain"
                  style={{ backgroundColor: 'transparent' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
