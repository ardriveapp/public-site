import { CONTACT_CAL_LINK, CONTACT_FORM_URL } from "./contact";

/**
 * Schedule a discovery call.
 * Dispatches event for header to handle, with fallback if no handler present.
 */
export function scheduleDiscovery(): void {
  let handled = false;

  const handleEvent = () => {
    handled = true;
  };

  // Listen for our own event to detect if header handled it
  window.addEventListener("ar-io:schedule-intro-handled", handleEvent, { once: true });

  // Dispatch the event that the header listens for
  window.dispatchEvent(new Event("ar-io:schedule-intro"));

  // Fallback after a short delay if not handled
  setTimeout(() => {
    window.removeEventListener("ar-io:schedule-intro-handled", handleEvent);
    if (!handled) {
      window.open(`https://cal.com/${CONTACT_CAL_LINK}`, "_blank", "noopener,noreferrer");
    }
  }, 100);
}

/**
 * Open general inquiries form.
 * Dispatches event for header to handle, with fallback if no handler present.
 */
export function openGeneralInquiries(): void {
  let handled = false;

  const handleEvent = () => {
    handled = true;
  };

  // Listen for our own event to detect if header handled it
  window.addEventListener("ar-io:open-contact-form-handled", handleEvent, { once: true });

  // Dispatch the event that the header listens for
  window.dispatchEvent(new Event("ar-io:open-contact-form"));

  // Fallback after a short delay if not handled
  setTimeout(() => {
    window.removeEventListener("ar-io:open-contact-form-handled", handleEvent);
    if (!handled) {
      window.open(CONTACT_FORM_URL, "_blank", "noopener,noreferrer");
    }
  }, 100);
}