"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const SUPPORT_EMAIL = "mailto:support@ardrive.io";

const SUPPORT_DETAILS = [
  "A short summary of the issue",
  "Your public wallet address (the one connected when the issue happened)",
  "What you were trying to do, and what went wrong",
  "When it started, and whether it's happened more than once",
  "Which product you're using (ArDrive web, CLI, ArNS, Turbo, gateway, or a custom integration)",
  "Environment details: browser and version, operating system, or — for CLI — Node version and the command you ran",
  "Any useful IDs: transaction ID, drive/file/folder ID, manifest transaction ID, ArNS name, ANT/process ID, or gateway URL",
  "Screenshots or sanitized logs (browser console or error output), if you have them",
];

interface EmailSupportModalProps {
  isOpen: boolean;
  isVisible: boolean;
  onClose: () => void;
}

export function EmailSupportModal({
  isOpen,
  isVisible,
  onClose,
}: EmailSupportModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 transition-opacity duration-200 sm:p-6"
      style={{ opacity: isVisible ? 1 : 0 }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="email-support-modal-title"
    >
      <div
        className="relative flex max-h-[min(90dvh,40rem)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-fd-border/15 bg-fd-card shadow-2xl transition-all duration-200"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? "translateY(0) scale(1)"
            : "translateY(8px) scale(0.98)",
        }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-fd-border/10 px-5 py-4 sm:px-6">
          <h2
            id="email-support-modal-title"
            className="text-xl font-bold tracking-tight text-fd-foreground sm:text-2xl"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
          >
            Before you email us
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-fd-border/15 text-fd-foreground/70 transition-colors hover:bg-white/5 hover:text-fd-foreground"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6">
          <p className="text-sm leading-relaxed text-fd-foreground/65">
            To help us provide the best and quickest support, please include as
            much detail as possible in your first message:
          </p>

          <ul className="mt-5 space-y-3 text-sm leading-relaxed text-fd-foreground/75">
            {SUPPORT_DETAILS.map((detail) => (
              <li key={detail} className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-fd-primary" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>

          <p className="mt-5 rounded-xl border border-fd-primary/20 bg-fd-primary/10 px-4 py-3 text-sm leading-relaxed text-fd-foreground/75">
            Please{" "}
            <span className="font-semibold text-fd-foreground">do not</span>{" "}
            send private keys, seed phrases, keyfiles, passwords, or payment
            details. If you share logs, remove any secrets first. A filename
            alone usually isn&apos;t enough for us to look something up — an ID
            from the list above works much better.
          </p>
        </div>

        <div className="border-t border-fd-border/10 px-5 py-4 sm:px-6">
          <a
            href={SUPPORT_EMAIL}
            onClick={onClose}
            className="inline-flex w-full items-center justify-center rounded-full bg-fd-primary px-8 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Got it
          </a>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
