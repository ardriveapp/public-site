import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import type { ComponentType } from "react";
import type { MDXProps } from "mdx/types";
import type { Element, Root } from "hast";
import { visit } from "unist-util-visit";
export interface CompiledMDX {
  Content: ComponentType<MDXProps & { components?: Record<string, ComponentType<any>> }>;
}

/**
 * Get base path from environment variables (server-side only during build)
 */
function getServerBasePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH || process.env.BASE_PATH || '';
}

/**
 * Rehype plugin to apply trailing slashes and base path to all images and links
 * Works for both Markdown-generated HTML and JSX elements
 */
function rehypeBasePathAssets() {
  return (tree: Root) => {
    const basePath = getServerBasePath();

    visit(tree, "element", (node: Element) => {
      // Handle images - add basePath if set
      if (node.tagName === "img" && node.properties?.src && basePath) {
        const src = node.properties.src as string;
        if (typeof src === 'string' && src.startsWith('/')) {
          node.properties.src = `${basePath}${src}`;
        }
      }

      // Handle links - always add trailing slash, add basePath if set
      if (node.tagName === "a" && node.properties?.href) {
        let href = node.properties.href as string;
        if (typeof href === 'string' && href.startsWith('/') && !href.startsWith('//')) {
          // Add trailing slash to internal links (not anchors)
          if (!href.includes('#') && !href.endsWith('/')) {
            href = `${href}/`;
          }
          node.properties.href = basePath ? `${basePath}${href}` : href;
        }
      }
    });
  };
}

/**
 * Custom MDX components that automatically handle basePath
 * These handle JSX elements in MDX that don't go through rehype
 */
function getMdxComponents() {
  const basePath = getServerBasePath();
  
  return {
    // Override img to automatically add basePath for JSX images
    img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
      const { src: originalSrc, ...restProps } = props;
      let src = typeof originalSrc === 'string' ? originalSrc : '';
      if (src && src.startsWith('/') && basePath) {
        src = `${basePath}${src}`;
      }
      return <img {...restProps} src={src} />;
    },
    // Override a to handle basePath and trailing slashes for JSX links
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
      const { href: originalHref, ...restProps } = props;
      let href = typeof originalHref === 'string' ? originalHref : '';
      // Add trailing slash to internal links (not anchors, not external)
      if (href && href.startsWith('/') && !href.startsWith('//') && !href.includes('#')) {
        if (!href.endsWith('/')) {
          href = `${href}/`;
        }
        if (basePath) {
          href = `${basePath}${href}`;
        }
      } else if (href && href.startsWith('/') && !href.startsWith('//') && basePath) {
        // Handle anchor links with basePath
        href = `${basePath}${href}`;
      }
      return <a {...restProps} href={href} />;
    },
  };
}

/**
 * Transform MDX source to add basePath to image and link paths
 */
function transformMdxSource(source: string): string {
  const basePath = getServerBasePath();
  if (!basePath) return source;

  // Transform img src attributes
  source = source.replace(
    /(<img\s+[^>]*src=["'])(\/)([^"']*["'])/g,
    `$1${basePath}$2$3`
  );

  // Transform href attributes for internal links
  source = source.replace(
    /(<a\s+[^>]*href=["'])(\/(?!\/))/g,
    `$1${basePath}$2`
  );

  return source;
}

/**
 * Compile and run MDX content, returning a React component
 */
export async function compileMDX(
  source: string,
  additionalComponents?: Record<string, ComponentType<any>>
): Promise<CompiledMDX> {
  // Transform source to add basePath before compilation
  const transformedSource = transformMdxSource(source);
  const mdxComponents = getMdxComponents();

  const { default: Content } = await evaluate(transformedSource, {
    ...runtime,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeBasePathAssets],
    // Override default components for img and a tags, plus any additional components
    // @ts-expect-error - MDX component override types
    components: {
      ...mdxComponents,
      ...additionalComponents,
    },
  });

  const WrappedContent: CompiledMDX["Content"] = (props) => {
    const mergedComponents = {
      ...mdxComponents,
      ...additionalComponents,
      ...(props.components ?? {}),
    };

    return <Content {...props} components={mergedComponents} />;
  };

  return { Content: WrappedContent };
}
