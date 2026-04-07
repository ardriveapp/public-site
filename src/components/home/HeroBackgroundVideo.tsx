"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { withBasePath } from "@/lib/base-path";

export interface HeroBackgroundVideoProps {
  className?: string;
}

// Duration of the crossfade transition in milliseconds
const CROSSFADE_DURATION = 500;
// How many seconds before video end to start the crossfade
const CROSSFADE_LEAD_TIME = 0.2;

export function HeroBackgroundVideo({ className }: HeroBackgroundVideoProps) {
  const videoARef = useRef<HTMLVideoElement | null>(null);
  const videoBRef = useRef<HTMLVideoElement | null>(null);
  const [activeVideo, setActiveVideo] = useState<"A" | "B">("A");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const videoSrc = withBasePath("/home/hero-animated-donut.mp4");
  const posterSrc = withBasePath("/home/hero-background.png");

  // Configure a video element with shared settings
  const configureVideo = useCallback((video: HTMLVideoElement) => {
    video.muted = true;
    video.volume = 0;
    video.playbackRate = 0.6;
  }, []);

  // Start the crossfade transition to the other video
  const startCrossfade = useCallback(() => {
    if (isTransitioning) return;

    const nextVideo = activeVideo === "A" ? videoBRef.current : videoARef.current;
    if (!nextVideo) return;

    setIsTransitioning(true);

    // Reset and play the incoming video
    nextVideo.currentTime = 0;
    nextVideo.play().catch(() => {
      // Autoplay may be blocked; silent fail is fine for background video
    });

    // Switch active video after a brief moment to allow transition to start
    requestAnimationFrame(() => {
      setActiveVideo(activeVideo === "A" ? "B" : "A");
    });

    // Clear transitioning state after the crossfade completes
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
      // Pause the now-hidden video to save resources
      const oldVideo = activeVideo === "A" ? videoARef.current : videoBRef.current;
      if (oldVideo) {
        oldVideo.pause();
      }
    }, CROSSFADE_DURATION);
  }, [activeVideo, isTransitioning]);

  // Monitor the active video's time and trigger crossfade near the end
  useEffect(() => {
    const currentVideoRef = activeVideo === "A" ? videoARef : videoBRef;
    const video = currentVideoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const timeRemaining = video.duration - video.currentTime;
      // Trigger crossfade when approaching the end
      if (timeRemaining <= CROSSFADE_LEAD_TIME && timeRemaining > 0 && !isTransitioning) {
        startCrossfade();
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [activeVideo, isTransitioning, startCrossfade]);

  // Initial setup for both videos
  useEffect(() => {
    const videoA = videoARef.current;
    const videoB = videoBRef.current;

    if (videoA) {
      configureVideo(videoA);
      videoA.play().catch(() => {});
    }

    if (videoB) {
      configureVideo(videoB);
      // Video B starts paused, ready to take over
      videoB.pause();
    }

    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [configureVideo]);

  const sharedVideoProps = {
    muted: true,
    playsInline: true,
    disablePictureInPicture: true,
    disableRemotePlayback: true,
    "aria-hidden": true as const,
    poster: posterSrc,
  };

  return (
    <>
      {/* Video A */}
      <video
        ref={videoARef}
        className={className}
        {...sharedVideoProps}
        style={{
          objectFit: "cover",
          opacity: activeVideo === "A" ? 1 : 0,
          transition: `opacity ${CROSSFADE_DURATION}ms ease-in-out`,
        }}
      >
        <source src={videoSrc} type="video/mp4" media="(min-width: 1024px)" />
      </video>

      {/* Video B */}
      <video
        ref={videoBRef}
        className={className}
        {...sharedVideoProps}
        style={{
          objectFit: "cover",
          opacity: activeVideo === "B" ? 1 : 0,
          transition: `opacity ${CROSSFADE_DURATION}ms ease-in-out`,
        }}
      >
        <source src={videoSrc} type="video/mp4" media="(min-width: 1024px)" />
      </video>
    </>
  );
}


