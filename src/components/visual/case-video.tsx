"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * A demo clip inside a case study. Unlike the lab clips, this one is meant to
 * be running by the time the reader arrives at it, so it starts on its own
 * once it scrolls into view and stops again when it leaves. Readers who ask
 * for reduced motion get a still first frame and the button.
 */
export function CaseVideo({
  src,
  poster,
  label,
  aspect = "aspect-video"
}: {
  src: string;
  poster?: string;
  label: string;
  aspect?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Playing a clip nobody is looking at burns battery for nothing, so the
    // observer runs it only while a decent part of it is on screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {
            // Autoplay can still be refused; the button stays as the way in.
          });
          return;
        }

        video.pause();
      },
      { threshold: 0.4 }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  function togglePlayback() {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      void video.play();
      return;
    }

    video.pause();
  }

  return (
    <div className={`lab-video-frame mt-12 ${aspect}`}>
      <video
        className="lab-video"
        loop
        muted
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        playsInline
        poster={poster}
        preload="metadata"
        ref={videoRef}
        // Without a poster a paused video paints nothing, so seek a hair past
        // the start and let the first frame stand in for one.
        src={poster ? src : `${src}#t=0.1`}
      />
      <button
        aria-label={isPlaying ? `Pause ${label}` : `Play ${label}`}
        className="lab-video-toggle focus-ring"
        data-playing={isPlaying}
        onClick={togglePlayback}
        type="button"
      >
        {isPlaying ? <Pause aria-hidden="true" size={22} /> : <Play aria-hidden="true" size={22} />}
      </button>
    </div>
  );
}
