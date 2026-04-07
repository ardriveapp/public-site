"use client";

import { useCallback, useState } from "react";
import { ContactUsModal } from "./ContactUsModal";
import { scheduleDiscovery, openGeneralInquiries } from "@/lib/contact-actions";

interface ContactUsTriggerProps {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function ContactUsTrigger({
  children,
  className,
  ariaLabel = "Open contact options",
}: ContactUsTriggerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
    // Separate "open" and "visible" for clean transition
    setTimeout(() => setIsModalVisible(true), 10);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalVisible(false);
    setTimeout(() => setIsModalOpen(false), 180);
  }, []);

  const handleScheduleDiscovery = useCallback(() => {
    scheduleDiscovery();
  }, []);

  const handleGeneralInquiries = useCallback(() => {
    openGeneralInquiries();
  }, []);

  return (
    <>
      <div
        className={className}
        onClick={openModal}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openModal();
          }
        }}
        aria-label={ariaLabel}
        style={{ cursor: "pointer" }}
      >
        {children}
      </div>

      <ContactUsModal
        isOpen={isModalOpen}
        isVisible={isModalVisible}
        onClose={closeModal}
        onScheduleDiscovery={handleScheduleDiscovery}
        onGeneralInquiries={handleGeneralInquiries}
      />
    </>
  );
}