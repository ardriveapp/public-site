"use client";

import { useEffect, useState } from "react";

// Launch date: Unix timestamp in milliseconds
const LAUNCH_TIMESTAMP = 1528448397000;

function formatTimeDiff(diffMs: number): string {
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${days}:${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

interface ZeroDataLostBadgeProps {
  label?: string;
  variant?: "default" | "light";
}

export function ZeroDataLostBadge({
  label = "Time with zero data lost",
  variant = "default",
}: ZeroDataLostBadgeProps) {
  const [timeDiff, setTimeDiff] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = Date.now();
      const diff = now - LAUNCH_TIMESTAMP;
      setTimeDiff(formatTimeDiff(diff));
    };

    // Update immediately
    updateTime();

    // Update every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  if (variant === "light") {
    return (
      <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm">
        {label}:{" "}
        <span className="ml-2 font-semibold text-white">
          {timeDiff || "0:00:00:00"}
        </span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center rounded-full border border-fd-border bg-fd-background/70 px-4 py-2 text-xs font-normal text-fd-foreground/90 backdrop-blur">
      {label}:{" "}
      <span className="ml-2 font-semibold text-fd-foreground">
        {timeDiff || "0:00:00:00"}
      </span>
    </div>
  );
}

