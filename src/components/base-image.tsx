import Image, { ImageProps } from "next/image";
import { withBasePath, getBasePath } from "@/lib/base-path";

/**
 * Image component that automatically applies basePath to src.
 * This is needed because Next.js basePath doesn't always work correctly
 * with static export for public folder assets.
 */
export function BaseImage({ src, alt, ...props }: ImageProps) {
  // Apply basePath to src if it's a string
  let srcWithBasePath = src;

  if (typeof src === 'string') {
    const basePath = getBasePath();
    // Only apply if not already prefixed and basePath exists
    if (basePath && !src.startsWith(basePath)) {
      srcWithBasePath = withBasePath(src);
    } else {
      srcWithBasePath = src;
    }
  }

  return <Image src={srcWithBasePath} alt={alt} {...props} />;
}

