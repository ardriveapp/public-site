/**
 * Get the base path for static assets.
 * Reads from meta tag (set at build time) or falls back to env vars.
 */
export function getBasePath(): string {
  if (typeof window === 'undefined') {
    // Server-side: use env var
    return process.env.NEXT_PUBLIC_BASE_PATH || process.env.BASE_PATH || '';
  }
  
  // Client-side: read from meta tag first (most reliable)
  const metaTag = document.querySelector('meta[name="base-path"]');
  if (metaTag) {
    const content = metaTag.getAttribute('content');
    if (content) return content;
  }
  
  // Fallback: try __NEXT_DATA__
  const nextData = (window as any).__NEXT_DATA__;
  if (nextData?.basePath) {
    return nextData.basePath;
  }

  // Arweave gateway fallback (e.g. https://arweave.net/<TXID>/...):
  // When hosted under a TXID path prefix, we won't know it at build time.
  // Detect it at runtime and treat "/<TXID>" as our base path so that
  // "/articles/..." resolves to "/<TXID>/articles/..." instead of "/articles/...".
  const firstSegment = window.location.pathname.split("/").filter(Boolean)[0];
  // Arweave transaction IDs are base64url strings, typically 43 chars.
  // See: https://docs.arweave.org/developers/server/http-api#transaction-id
  const arweaveTxIdPattern = /^[a-zA-Z0-9_-]{43}$/;
  if (firstSegment && arweaveTxIdPattern.test(firstSegment)) {
    return `/${firstSegment}`;
  }
  
  // Last resort: env var (should be inlined at build time)
  return (process.env.NEXT_PUBLIC_BASE_PATH as string) || '';
}

/**
 * Prefix a path with the base path if it's a relative path.
 */
export function withBasePath(path: string): string {
  const basePath = getBasePath();
  // Only prefix if it's a relative path (starts with /)
  if (path.startsWith('/') && basePath) {
    return `${basePath}${path}`;
  }
  return path;
}

