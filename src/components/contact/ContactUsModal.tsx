"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BookOpen, Calendar, ClipboardList, Grid3x3, X } from "lucide-react";

interface ContactUsModalProps {
  isOpen: boolean;
  isVisible: boolean;
  onClose: () => void;
  onScheduleDiscovery: () => void;
  onGeneralInquiries: () => void;
}

export function ContactUsModal({
  isOpen,
  isVisible,
  onClose,
  onScheduleDiscovery,
  onGeneralInquiries,
}: ContactUsModalProps) {
  const docsUrl = "https://docs.ar.io";
  const appUrl = "https://console.ar.io/try";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleScheduleDiscovery = useCallback(() => {
    onScheduleDiscovery();
    onClose();
  }, [onScheduleDiscovery, onClose]);

  const handleGeneralInquiries = useCallback(() => {
    onGeneralInquiries();
    onClose();
  }, [onGeneralInquiries, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll only on mobile-ish viewports (prevents background scroll).
  useEffect(() => {
    if (!isOpen) return;

    // Guard for older browsers / unexpected environments
    const isMobile =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(max-width: 640px)").matches;

    if (!isMobile) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8 max-sm:p-6 transition-opacity duration-200 bg-black/70"
      style={{
        opacity: isVisible ? 1 : 0,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Contact options"
    >
      <div
        className="relative flex min-h-0 w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-fd-border bg-fd-card shadow-2xl transition-all duration-200 max-sm:max-h-[min(90dvh,calc(100svh-2rem))] max-sm:max-w-none max-sm:rounded-none max-sm:border-0"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0) scale(1)" : "translateY(8px) scale(0.98)",
        }}
      >
        {/* Scrollable body: full vertical stack stays reachable on short viewports */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 pb-6 sm:p-8 sm:pb-8">
          <div className="mb-3 flex items-start justify-between gap-4 sm:mb-6">
            <div className="min-w-0">
              <h2 className="text-xl font-bold tracking-tight text-fd-foreground sm:text-2xl md:text-3xl">
                Contact Us
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="shrink-0 inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-fd-border bg-fd-card text-fd-foreground shadow-sm hover:bg-fd-accent transition-colors"
              aria-label="Close contact options"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3 md:gap-6 md:grid-cols-2">
            {/* Schedule a Discovery */}
            <button
              type="button"
              className="relative h-full min-h-0 overflow-hidden rounded-2xl border border-fd-border shadow-sm text-left cursor-pointer hover:shadow-md transition-shadow sm:min-h-[280px]"
              style={{
                background: "linear-gradient(to bottom right, rgb(var(--color-fd-card)), rgb(223 214 247))",
              }}
              onClick={handleScheduleDiscovery}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-fd-primary/10" />
              <div className="relative flex h-full flex-col p-3 sm:p-6">
                <div className="mb-1 flex items-center gap-2 sm:mb-4 sm:gap-3">
                  <Calendar className="size-5 shrink-0 text-fd-primary sm:size-6" />
                  <h3 className="text-base font-bold tracking-tight text-fd-foreground sm:text-lg">
                    Schedule Discovery
                  </h3>
                </div>
                <p className="text-sm leading-snug text-fd-muted-foreground sm:text-base sm:leading-7">
                  Evaluating ar.io for enterprise, institutional, or large-scale infrastructure? Let&apos;s talk.
                </p>
                <div className="mt-auto pt-3 sm:pt-8">
                  <div
                    className="pointer-events-none inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#23232D] px-3 py-2 text-xs font-semibold text-[#F0F0F0] sm:px-4 sm:py-2.5 sm:text-sm"
                    aria-hidden="true"
                  >
                    Schedule Discovery
                  </div>
                </div>
              </div>
            </button>

            {/* General Inquiries */}
            <button
              type="button"
              className="relative h-full min-h-0 overflow-hidden rounded-2xl border border-fd-border shadow-sm text-left cursor-pointer hover:shadow-md transition-shadow sm:min-h-[280px]"
              style={{
                background: "linear-gradient(to bottom right, rgb(var(--color-fd-card)), rgb(223 214 247))",
              }}
              onClick={handleGeneralInquiries}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-fd-primary/10" />
              <div className="relative flex h-full flex-col p-3 sm:p-6">
                <div className="mb-1 flex items-center gap-2 sm:mb-4 sm:gap-3">
                  <ClipboardList className="size-5 shrink-0 text-fd-primary sm:size-6" />
                  <h3 className="text-base font-bold tracking-tight text-fd-foreground sm:text-lg">
                    General Inquiries
                  </h3>
                </div>
                <p className="text-sm leading-snug text-fd-muted-foreground sm:text-base sm:leading-7">
                  Not ready for a meeting? Share a few details and we&apos;ll follow up.
                </p>
                <div className="mt-auto pt-3 sm:pt-8">
                  <div
                    className="pointer-events-none inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#23232D] px-3 py-2 text-xs font-semibold text-[#F0F0F0] sm:px-4 sm:py-2.5 sm:text-sm"
                    aria-hidden="true"
                  >
                    Submit Inquiry
                  </div>
                </div>
              </div>
            </button>
          </div>

          <div className="mt-4 border-t border-fd-border pt-4 sm:mt-6 sm:pt-6">
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-sm font-semibold tracking-tight text-fd-foreground">
                Prefer to explore on your own?
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2">
                <a
                  href={appUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-fd-border bg-fd-background px-3.5 py-2 text-sm font-semibold text-fd-foreground transition-colors hover:bg-fd-accent"
                >
                  <Grid3x3 className="size-4 shrink-0 text-fd-primary" />
                  Try the App
                </a>

                <a
                  href={docsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-fd-border bg-fd-background px-3.5 py-2 text-sm font-semibold text-fd-foreground transition-colors hover:bg-fd-accent"
                >
                  <BookOpen className="size-4 shrink-0 text-fd-primary" />
                  Read Docs
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
