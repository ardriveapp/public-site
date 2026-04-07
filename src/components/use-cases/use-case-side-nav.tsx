import Link from "next/link";

export interface UseCaseSideNavItem {
  href: string;
  title: string;
}

interface UseCaseSideNavProps {
  items: UseCaseSideNavItem[];
  currentHref: string;
}

function NavLink({
  href,
  title,
  isActive,
}: {
  href: string;
  title: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={[
        "w-full rounded-full px-4 py-2 text-sm leading-snug text-balance font-normal not-italic transition-colors",
        "bg-fd-primary/10 hover:bg-fd-primary/25 text-fd-foreground/90",
        isActive ? "bg-fd-primary/25 font-semibold" : "",
      ].join(" ")}
      aria-current={isActive ? "page" : undefined}
    >
      {title}
    </Link>
  );
}

export function UseCaseSideNav({ items, currentHref }: UseCaseSideNavProps) {
  return (
    <aside className="not-prose">
      {/* Mobile dropdown */}
      <div className="mb-6 lg:hidden">
        <details className="group">
          <summary className="list-none cursor-pointer rounded-full bg-fd-primary/15 px-4 py-2 text-sm font-normal not-italic text-fd-foreground/90 hover:bg-fd-primary/25 transition-colors inline-flex items-center gap-2">
            Use Cases
            <span className="opacity-70 group-open:rotate-180 transition-transform">▾</span>
          </summary>
          <div className="mt-3 flex flex-col gap-2">
            {items.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                title={item.title}
                isActive={item.href === currentHref}
              />
            ))}
          </div>
        </details>
      </div>

      {/* Desktop sticky side nav */}
      <div className="hidden lg:block">
        <div className="sticky top-24">
          <div className="text-xs font-semibold uppercase tracking-widest text-fd-muted-foreground">
            Use Cases
          </div>
          <nav className="mt-3 flex flex-col gap-2">
            {items.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                title={item.title}
                isActive={item.href === currentHref}
              />
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}


