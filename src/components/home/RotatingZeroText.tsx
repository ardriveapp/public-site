"use client";

import { useState, useEffect } from "react";

const phrases = ["IP doubt.", "blind trust.", "provenance lost."];

export function RotatingZeroText() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[currentIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseDuration = 2000; // Pause at full text for 2 seconds

    if (!isDeleting && displayText === currentPhrase) {
      // Finished typing, pause before deleting
      const timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayText === "") {
      // Finished deleting, move to next phrase
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    // Type or delete one character
    const timeout = setTimeout(() => {
      setDisplayText((prev) => {
        if (isDeleting) {
          return currentPhrase.substring(0, prev.length - 1);
        } else {
          return currentPhrase.substring(0, prev.length + 1);
        }
      });
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentIndex, displayText, isDeleting]);

  return (
    <>
      Zero{" "}
      <span className="inline-block min-w-[14ch] break-words">
        {displayText}
        <span className="animate-pulse">|</span>
      </span>
    </>
  );
}

