"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Newspaper,
  FileCode,
  ExternalLink,
  Coins,
  Cloudy,
  BookOpen,
  Info,
  Network,
  Layers,
  X,
  Menu,
  Cpu,
  Building2,
  University,
  Palette,
  ShieldCheck,
  Fingerprint,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { BaseImage } from "@/components/base-image";
import { ContactUsTrigger } from "@/components/contact/ContactUsTrigger";
import { ContactFormModal } from "@/components/contact/ContactFormModal";
import { SITE_CONTAINER_CLASS } from "@/components/site-container";
import type { LucideIcon } from "lucide-react";
import { USE_CASE_METADATA } from "@/lib/use-case-config";
import type { UseCaseNavItem } from "@/lib/use-cases";
import {
  CONTACT_CAL_CONFIG_JSON,
  CONTACT_CAL_LINK,
  CONTACT_CAL_NAMESPACE,
} from "@/lib/contact";

type HeaderNavItem = {
  label: string;
  description?: string;
  href?: string;
  onSelect?: () => void;
  external?: boolean;
  showExternalIcon?: boolean;
  icon?: LucideIcon;
};

interface SiteHeaderProps {
  useCasesNav: UseCaseNavItem[];
}

const SERVICES_ITEMS: HeaderNavItem[] = [
  {
    label: "Enterprise",
    description: "Protect critical data from attack and downtime",
    href: "/enterprise",
    icon: Building2,
  },
  {
    label: "User Platforms",
    description: "Enable user platforms to protect user data",
    href: "/platforms",
    icon: Layers,
  },
  {
    label: "Institutions",
    description: "Preserve institutional collections and scholarly records",
    href: "/institutions",
    icon: University,
  },
  {
    label: "Provenance",
    description: "Independent verification for AI and media",
    href: "/provenance",
    icon: Fingerprint,
  },
  {
    label: "Technology",
    description: "Services and infrastructure stack",
    href: "/technology",
    icon: Cpu,
  },
];

// USE_CASE_ITEMS will be computed in the component from props

const DEVELOPER_ITEMS: HeaderNavItem[] = [
  {
    label: "Documentation",
    description: "Documentation and developer resources",
    href: "https://docs.ar.io",
    external: true,
    showExternalIcon: true,
    icon: FileCode,
  },
  {
    label: "Code",
    description: "View our open source repositories",
    href: "https://github.com/ar-io/",
    external: true,
    icon: ((props: React.SVGProps<SVGSVGElement>) => (
      <BaseImage
        src="/icons/github-icon.svg"
        alt="GitHub"
        width={22}
        height={23}
        className={props.className || "size-6"}
      />
    )) as LucideIcon,
  },
  {
    label: "Cloudmap",
    description: "Permanent cloud development progress",
    href: "/cloudmap",
    icon: Cloudy,
  },
  {
    label: "Ecosystem",
    description: "Projects and partners building with ar.io",
    href: "/ecosystem",
    icon: Network,
  },
];

const RESOURCE_ITEMS: HeaderNavItem[] = [
  {
    label: "About",
    description: "Stewardship and infrastructure services",
    href: "/about",
    icon: Info,
  },
  {
    label: "Trust",
    description: "Security, compliance, and verification",
    href: "/trust",
    icon: ShieldCheck,
  },
  {
    label: "Articles",
    description: "News, posts, and thoughts from ar.io",
    href: "/articles",
    icon: Newspaper,
  },
  {
    label: "Case Studies",
    description: "Real-world examples of ar.io in action",
    href: "/case-studies",
    icon: BookOpen,
  },
  {
    label: "Token",
    description: "Learn about the $ARIO token",
    href: "/token",
    icon: Coins,
  },
  {
    label: "Brand Kit",
    description: "Logos, colors, and typography guidelines",
    href: "/brand-kit",
    icon: Palette,
  },
];

function PillDropdown({
  label,
  items,
}: {
  label: string;
  items: HeaderNavItem[];
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const onToggle = useCallback((e: React.SyntheticEvent<HTMLDetailsElement>) => {
    const details = e.currentTarget;
    if (!details.open) return;

    // Close any other open dropdowns in the header.
    const root = details.closest("header");
    if (!root) return;
    root
      .querySelectorAll<HTMLDetailsElement>("details[data-site-dropdown]")
      .forEach((el) => {
        if (el !== details) el.open = false;
      });
  }, []);

  const onItemClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const target = e.currentTarget;
      const details = target.closest("details[data-site-dropdown]") as
        | HTMLDetailsElement
        | null;
      if (details) details.open = false;
    },
    []
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const details = detailsRef.current;
      if (!details || !details.open) return;

      const target = event.target as Node;
      // Check if the click is outside the details element
      if (!details.contains(target)) {
        details.open = false;
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown when pressing Escape (matches Continuum's "clean close" feel)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const details = detailsRef.current;
      if (!details || !details.open) return;
      details.open = false;
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <details
      ref={detailsRef}
      className="relative group"
      data-site-dropdown
      onToggle={onToggle}
      suppressHydrationWarning
    >
      <summary className="list-none cursor-pointer rounded-full bg-fd-primary/15 px-4 py-2 text-sm font-normal not-italic text-fd-foreground/90 hover:bg-fd-primary/25 transition-colors inline-flex items-center gap-2">
        {label}
        <ChevronDown className="size-4 transition-transform group-open:-rotate-180" />
      </summary>

      <div className="absolute left-0 top-full z-50 mt-2 min-w-80 overflow-hidden rounded-2xl border border-fd-border bg-fd-background shadow-lg">
        <div className="p-2" suppressHydrationWarning>
          {items.map((item) => {
            const Icon = item.icon;
            const isAction = typeof item.onSelect === "function";
            const content = (
              <>
                {Icon && <Icon className="size-5 shrink-0 text-fd-foreground/80" />}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-fd-foreground">{item.label}</div>
                  {item.description && (
                    <div className="text-xs text-fd-foreground/70 mt-0.5">{item.description}</div>
                  )}
                </div>
                {!isAction && item.external && item.showExternalIcon !== false && <ExternalLink className="size-3 shrink-0 opacity-60" />}
              </>
            );

            const key = item.href || item.label;

            if (isAction) {
              return (
                <button
                  key={key}
                  type="button"
                  onClick={(e) => {
                    onItemClick(e);
                    item.onSelect?.();
                  }}
                  className="flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left text-fd-foreground hover:bg-fd-accent transition-colors cursor-pointer"
                >
                  {content}
                </button>
              );
            }

            if (!item.href) return null;

            return item.external ? (
              <a
                key={key}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                onClick={onItemClick}
                className="flex items-start gap-3 rounded-xl px-3 py-3 text-fd-foreground hover:bg-fd-accent transition-colors"
              >
                {content}
              </a>
            ) : (
              <Link
                key={key}
                href={item.href}
                onClick={onItemClick}
                className="flex items-start gap-3 rounded-xl px-3 py-3 text-fd-foreground hover:bg-fd-accent transition-colors"
              >
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </details>
  );
}

type MobileNavSectionId = "services" | "useCases" | "developers" | "resources";

function MobileNavSection({
  id,
  label,
  items,
  isOpen,
  onToggle,
  onNavigate,
}: {
  id: MobileNavSectionId;
  label: string;
  items: HeaderNavItem[];
  isOpen: boolean;
  onToggle: (id: MobileNavSectionId) => void;
  onNavigate: () => void;
}) {
  const panelId = `mobile-site-nav-section-${id}`;

  return (
    <div className="border-b border-fd-border last:border-b-0">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 px-2 py-3 text-left text-sm font-semibold text-fd-foreground hover:bg-fd-accent/60 transition-colors"
        onClick={() => onToggle(id)}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span>{label}</span>
        <ChevronDown className={`size-4 transition-transform ${isOpen ? "-rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div id={panelId} className="border-t border-fd-border">
          {items
            .filter((item) => Boolean(item.href))
            .map((item) => {
              if (!item.href) return null;
              const Icon = item.icon;
              const key = item.href || item.label;

              const content = (
                <>
                  {Icon && <Icon className="size-5 shrink-0 text-fd-foreground/80" />}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-fd-foreground">{item.label}</div>
                    {item.description && (
                      <div className="mt-0.5 text-xs text-fd-foreground/70">{item.description}</div>
                    )}
                  </div>
                  {item.external && item.showExternalIcon !== false && (
                    <ExternalLink className="size-3 shrink-0 opacity-60" />
                  )}
                </>
              );

              return item.external ? (
                <a
                  key={key}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={onNavigate}
                  className="flex items-start gap-3 px-2 py-3 text-fd-foreground hover:bg-fd-accent/60 transition-colors"
                >
                  {content}
                </a>
              ) : (
                <Link
                  key={key}
                  href={item.href}
                  onClick={onNavigate}
                  className="flex items-start gap-3 px-2 py-3 text-fd-foreground hover:bg-fd-accent/60 transition-colors"
                >
                  {content}
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
}

export function SiteHeader({ useCasesNav }: SiteHeaderProps) {
  const useCaseItems: HeaderNavItem[] = useCasesNav.map((useCase) => {
    const slugKey = useCase.slug.join("/");
    const metadata = USE_CASE_METADATA[slugKey];

    return {
      label: useCase.title,
      description: metadata?.shortDescription || useCase.description,
      href: `/use-cases/${slugKey}`,
      icon: metadata?.icon,
    };
  });
  const calTriggerRef = useRef<HTMLAnchorElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement | null>(null);
  const pathname = usePathname();
  const lastPathnameRef = useRef<string>(pathname);
  const [headerHeightPx, setHeaderHeightPx] = useState<number>(0);
  const [viewportHeightPx, setViewportHeightPx] = useState<number>(0);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState<boolean>(false);
  const [openMobileSectionId, setOpenMobileSectionId] = useState<MobileNavSectionId | null>(null);

  const [isContactFormOpen, setIsContactFormOpen] = useState<boolean>(false);
  const [isContactFormVisible, setIsContactFormVisible] = useState<boolean>(false);

  const closeMobileMenu = useCallback(() => {
    // Prevent mobile Safari "sticky hover"/focus styling from persisting.
    mobileMenuButtonRef.current?.blur();
    setIsMobileMenuVisible(false);
    window.setTimeout(() => setIsMobileMenuOpen(false), 180);
    setOpenMobileSectionId(null);
  }, []);

  const openMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(true);
    window.setTimeout(() => setIsMobileMenuVisible(true), 10);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
      return;
    }
    openMobileMenu();
    setOpenMobileSectionId(null);
  }, [isMobileMenuOpen, closeMobileMenu, openMobileMenu]);

  const openContactForm = useCallback(() => {
    setIsContactFormOpen(true);
    // match Continuum: separate "open" and "visible" for clean transition
    window.setTimeout(() => setIsContactFormVisible(true), 10);
  }, []);

  const closeContactForm = useCallback(() => {
    setIsContactFormVisible(false);
    window.setTimeout(() => setIsContactFormOpen(false), 180);
  }, []);

  const openScheduleIntro = useCallback(() => {
    if (calTriggerRef.current) {
      calTriggerRef.current.click();
    }
  }, []);

  // Allow other pages/components to trigger the same actions as the header dropdown.
  useEffect(() => {
    const onScheduleIntro = () => {
      openScheduleIntro();
      // Signal that this event was handled
      window.dispatchEvent(new Event("ar-io:schedule-intro-handled"));
    };
    window.addEventListener("ar-io:schedule-intro", onScheduleIntro);
    return () => window.removeEventListener("ar-io:schedule-intro", onScheduleIntro);
  }, [openScheduleIntro]);

  useEffect(() => {
    const onOpenContactForm = () => {
      openContactForm();
      // Signal that this event was handled
      window.dispatchEvent(new Event("ar-io:open-contact-form-handled"));
    };
    window.addEventListener("ar-io:open-contact-form", onOpenContactForm);
    return () =>
      window.removeEventListener("ar-io:open-contact-form", onOpenContactForm);
  }, [openContactForm]);

  // Close the mobile menu after a contact option is selected (the header emits *-handled events).
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const closeOnHandled = () => closeMobileMenu();
    window.addEventListener("ar-io:schedule-intro-handled", closeOnHandled);
    window.addEventListener("ar-io:open-contact-form-handled", closeOnHandled);

    return () => {
      window.removeEventListener("ar-io:schedule-intro-handled", closeOnHandled);
      window.removeEventListener("ar-io:open-contact-form-handled", closeOnHandled);
    };
  }, [isMobileMenuOpen, closeMobileMenu]);

  // Close on route change (covers back/forward + link navigation).
  useEffect(() => {
    const lastPathname = lastPathnameRef.current;
    lastPathnameRef.current = pathname;

    if (!isMobileMenuOpen) return;
    if (lastPathname === pathname) return;
    closeMobileMenu();
  }, [pathname, isMobileMenuOpen, closeMobileMenu]);

  // Measure header height so the mobile panel can be fixed below it.
  useEffect(() => {
    const measure = () => {
      const el = headerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setHeaderHeightPx(Math.round(rect.height));
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Track the visible viewport height (fixes Android/iOS address-bar 100vh issues).
  useEffect(() => {
    const vv = window.visualViewport;

    const measureViewport = () => {
      const height = vv?.height ?? window.innerHeight;
      setViewportHeightPx(Math.round(height));
    };

    measureViewport();
    window.addEventListener("resize", measureViewport);
    vv?.addEventListener("resize", measureViewport);
    vv?.addEventListener("scroll", measureViewport);

    return () => {
      window.removeEventListener("resize", measureViewport);
      vv?.removeEventListener("resize", measureViewport);
      vv?.removeEventListener("scroll", measureViewport);
    };
  }, []);

  // Lock body scroll while either overlay is open; close on Escape.
  useEffect(() => {
    if (!isContactFormOpen && !isMobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (isContactFormOpen) closeContactForm();
      else closeMobileMenu();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isContactFormOpen, isMobileMenuOpen, closeContactForm, closeMobileMenu]);

  // Drive the "visible" animation state when the menu mounts.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    setIsMobileMenuVisible(false);
    window.setTimeout(() => setIsMobileMenuVisible(true), 10);
  }, [isMobileMenuOpen]);


  // Continuum-style Cal embed init (element-click embed).
  useEffect(() => {

    // Install Cal's element-click embed loader (ported directly from Continuum reference).
    const w = window as unknown as {
      Cal?: {
        loaded?: boolean;
        ns?: Record<string, unknown>;
        q?: unknown[];
      } & ((...args: unknown[]) => unknown);
    };

    (function (C: any, A: string, L: string) {
      const p = (a: any, ar: IArguments) => {
        a.q.push(ar);
      };
      const d = C.document;
      C.Cal =
        C.Cal ||
        function (...args: unknown[]) {
          const cal: any = C.Cal;
          const ar = args as unknown as IArguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = function (...innerArgs: unknown[]) {
              p(api, innerArgs as unknown as IArguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace] as unknown as IArguments);
            } else {
              p(cal, ar);
            }
            return;
          }
          p(cal, ar);
        };
    })(window as any, "https://app.cal.com/embed/embed.js", "init");

    // Initialize namespace + UI config (same as Continuum).
    try {
      const namespace = CONTACT_CAL_NAMESPACE;
      (w.Cal as any)("init", namespace, { origin: "https://app.cal.com" });
      const parsed = JSON.parse(CONTACT_CAL_CONFIG_JSON) as unknown;
      (w.Cal as any).ns[namespace]("ui", parsed);
    } catch {
      // If config isn't valid JSON, Cal still works via data attributes on the trigger element.
    }
  }, []);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 relative ${
        isMobileMenuOpen
          ? "border-b-0 bg-fd-background"
          : "border-b border-fd-border bg-fd-background/85 backdrop-blur"
      }`}
    >
      <div className={`${SITE_CONTAINER_CLASS} flex items-center justify-between gap-6 py-4`}>
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <BaseImage
            src="/brand/ario-full-black.svg"
            alt="ar.io"
            width={134}
            height={32}
            className="block"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <PillDropdown label="Services" items={SERVICES_ITEMS} />
          <PillDropdown label="Use Cases" items={useCaseItems} />
          <PillDropdown label="Developers" items={DEVELOPER_ITEMS} />
          <PillDropdown label="Resources" items={RESOURCE_ITEMS} />
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            ref={mobileMenuButtonRef}
            className="md:hidden inline-flex size-10 items-center justify-center rounded-full border border-fd-border bg-fd-background text-fd-foreground transition-colors supports-[hover:hover]:hover:bg-fd-accent active:bg-fd-accent/60"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-site-nav"
          >
            {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          <div className="hidden md:flex items-center gap-2">
            <ContactUsTrigger
              className="inline-flex items-center gap-2 rounded-full bg-[#23232D] px-5 py-2.5 text-sm font-semibold text-[#F0F0F0] hover:opacity-90 transition-opacity"
              ariaLabel="Get started with ar.io - open contact options"
            >
              <BaseImage
                src="/icons/rocket.svg"
                alt=""
                aria-hidden="true"
                width={16}
                height={16}
                className="shrink-0"
              />
              Get Started
            </ContactUsTrigger>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <>
          <div
            className="fixed left-0 right-0 z-40 md:hidden transition-opacity duration-200 bg-black/30"
            style={{
              top: headerHeightPx ? `${Math.max(headerHeightPx - 1, 0)}px` : undefined,
              bottom: 0,
              opacity: isMobileMenuVisible ? 1 : 0,
            }}
            aria-hidden="true"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) closeMobileMenu();
            }}
          />

          <div
            id="mobile-site-nav"
            className="fixed left-0 right-0 z-50 md:hidden border-b border-fd-border bg-fd-background !shadow-none overflow-hidden"
            style={{
              // Slight overlap to avoid any 1px seam between header + panel.
              top: headerHeightPx ? `${Math.max(headerHeightPx - 1, 0)}px` : undefined,
              height:
                viewportHeightPx && headerHeightPx
                  ? `${Math.max(viewportHeightPx - Math.max(headerHeightPx - 1, 0), 0)}px`
                  : headerHeightPx
                    ? `calc(100vh - ${Math.max(headerHeightPx - 1, 0)}px)`
                    : "calc(100vh - 72px)",
              pointerEvents: isMobileMenuVisible ? "auto" : "none",
            }}
          >
            {/* Fold-down animation: reveal content by animating grid rows (no scaling). */}
            <div
              className="grid h-full transition-[grid-template-rows,opacity] duration-200 ease-out"
              style={{
                gridTemplateRows: isMobileMenuVisible ? "1fr" : "0fr",
                opacity: isMobileMenuVisible ? 1 : 0,
              }}
            >
              <div className="overflow-hidden">
                <div
                  className={`${SITE_CONTAINER_CLASS} flex h-full flex-col pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))]`}
                >
                  <div className="flex-1 overflow-y-auto pr-1">
                    <div className="overflow-hidden rounded-2xl border border-fd-border bg-fd-background">
                      <MobileNavSection
                        id="services"
                        label="Services"
                        items={SERVICES_ITEMS}
                        isOpen={openMobileSectionId === "services"}
                        onToggle={(id) =>
                          setOpenMobileSectionId((prev) => (prev === id ? null : id))
                        }
                        onNavigate={closeMobileMenu}
                      />
                      <MobileNavSection
                        id="useCases"
                        label="Use Cases"
                        items={useCaseItems}
                        isOpen={openMobileSectionId === "useCases"}
                        onToggle={(id) =>
                          setOpenMobileSectionId((prev) => (prev === id ? null : id))
                        }
                        onNavigate={closeMobileMenu}
                      />
                      <MobileNavSection
                        id="developers"
                        label="Developers"
                        items={DEVELOPER_ITEMS}
                        isOpen={openMobileSectionId === "developers"}
                        onToggle={(id) =>
                          setOpenMobileSectionId((prev) => (prev === id ? null : id))
                        }
                        onNavigate={closeMobileMenu}
                      />
                      <MobileNavSection
                        id="resources"
                        label="Resources"
                        items={RESOURCE_ITEMS}
                        isOpen={openMobileSectionId === "resources"}
                        onToggle={(id) =>
                          setOpenMobileSectionId((prev) => (prev === id ? null : id))
                        }
                        onNavigate={closeMobileMenu}
                      />
                    </div>
                  </div>

                  <div className="mt-4 border-t border-fd-border pt-4">
                    <ContactUsTrigger
                      className="inline-flex w-full items-center justify-center rounded-full bg-[#23232D] px-5 py-3 text-sm font-semibold text-[#F0F0F0] hover:opacity-90 transition-opacity"
                      ariaLabel="Contact ar.io - open contact options"
                    >
                      Contact Us
                    </ContactUsTrigger>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Hidden Cal trigger element (Continuum pattern: click an element with data-cal-link). */}
      <a
        ref={calTriggerRef}
        href="#"
        className="hidden"
        data-cal-link={CONTACT_CAL_LINK}
        data-cal-namespace={CONTACT_CAL_NAMESPACE}
        data-cal-config={CONTACT_CAL_CONFIG_JSON}
        onClick={(e) => e.preventDefault()}
        aria-hidden="true"
        tabIndex={-1}
      >
        Schedule
      </a>

      <ContactFormModal
        isOpen={isContactFormOpen}
        isVisible={isContactFormVisible}
        onClose={closeContactForm}
      />
    </header>
  );
}


