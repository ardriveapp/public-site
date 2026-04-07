"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { CONTACT_FORM_URL } from "@/lib/contact";

interface ContactFormModalProps {
  isOpen: boolean;
  isVisible: boolean;
  onClose: () => void;
}

export function ContactFormModal({
  isOpen,
  isVisible,
  onClose,
}: ContactFormModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8 transition-opacity duration-200 bg-black/70"
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
      aria-label="Contact form modal"
    >
      <div
        className="relative flex w-full max-w-7xl flex-col overflow-hidden rounded-2xl border border-fd-border bg-fd-background shadow-2xl transition-all duration-200 max-sm:h-screen max-sm:max-w-none max-sm:rounded-none max-sm:border-0"
        style={{
          height: "min(85vh, 700px)",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0) scale(1)" : "translateY(8px) scale(0.98)",
        }}
      >
        <div className="flex items-center justify-end p-3 sm:p-4" style={{ backgroundColor: "#f0f0f0" }}>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-fd-border bg-fd-background text-fd-foreground shadow-sm hover:bg-fd-accent transition-colors"
            aria-label="Close modal"
          >
            <X className="size-5" />
          </button>
        </div>

        <iframe
          title="Contact form"
          src={CONTACT_FORM_URL}
          className="w-full flex-1 border-0"
        />
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
