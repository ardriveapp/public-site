"use client";

import { useCallback, useState } from "react";
import { EmailSupportModal } from "./EmailSupportModal";

interface EmailSupportButtonProps {
  className?: string;
}

export function EmailSupportButton({ className }: EmailSupportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const closeModal = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => setIsOpen(false), 180);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className={
          className ??
          "mt-8 inline-flex cursor-pointer items-center justify-center rounded-full bg-fd-primary px-8 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        }
      >
        Email us
      </button>

      <EmailSupportModal
        isOpen={isOpen}
        isVisible={isVisible}
        onClose={closeModal}
      />
    </>
  );
}
