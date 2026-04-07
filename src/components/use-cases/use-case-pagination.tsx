import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface UseCasePaginationItem {
  href: string;
  title: string;
  description?: string;
  direction: "previous" | "next";
}

interface UseCasePaginationProps {
  previous?: UseCasePaginationItem;
  next?: UseCasePaginationItem;
}

function NavPill({ href, title, direction }: UseCasePaginationItem) {
  const Icon = direction === "previous" ? ArrowLeft : ArrowRight;
  const isPrevious = direction === "previous";
  const iconClassName = isPrevious
    ? "size-4 shrink-0 transition-transform group-hover:-translate-x-0.5"
    : "size-4 shrink-0 transition-transform group-hover:translate-x-0.5";

  return (
    <Link
      href={href}
      className={[
        "group inline-flex items-center gap-2 rounded-full bg-fd-primary/15 px-4 py-2 text-sm font-normal not-italic text-fd-foreground/90 hover:bg-fd-primary/25 transition-colors",
        isPrevious ? "" : "justify-end",
      ].join(" ")}
      aria-label={`${isPrevious ? "Previous" : "Next"}: ${title}`}
    >
      {isPrevious ? <Icon className={iconClassName} /> : null}
      <span className="hidden sm:inline">{title}</span>
      <span className="sm:hidden" aria-hidden="true">
        {isPrevious ? "Prev" : "Next"}
      </span>
      {!isPrevious ? <Icon className={iconClassName} /> : null}
    </Link>
  );
}

export function UseCasePagination({ previous, next }: UseCasePaginationProps) {
  if (!previous && !next) return null;

  return (
    <nav className="not-prose mt-10 flex w-full max-w-3xl items-center justify-between gap-3">
      <div className="min-w-0">
        {previous ? <NavPill {...previous} /> : null}
      </div>
      <div className="min-w-0">
        {next ? <NavPill {...next} /> : null}
      </div>
    </nav>
  );
}


