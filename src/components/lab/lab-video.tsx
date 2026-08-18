"use client";

import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * A clip that never plays on its own: the overlay button is the only thing
 * that starts it, so nothing moves until the reader asks for it.
 */
export function LabVideo({
  src,
  poster,
  label
}: {
  src: string;
  poster?: string;
  label: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function togglePlayback() {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      void video.play();
      setIsPlaying(true);
      return;
    }

    video.pause();
    setIsPlaying(false);
  }

  return (
    <div className="lab-video-frame">
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
        {isPlaying ? (
          <Pause aria-hidden="true" size={22} />
        ) : (
          <Play aria-hidden="true" size={22} />
        )}
      </button>
    </div>
  );
}
