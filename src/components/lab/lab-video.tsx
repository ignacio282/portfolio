"use client";

import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * A clip that arrives as a letterbox strip and opens to its full height as it
 * is scrolled into view — the growing frame is what invites the scroll. It
 * never plays on its own: the overlay button is the only thing that starts it,
 * so nothing moves until the reader asks for it.
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
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    // From the frame first touching the bottom of the viewport until its top
    // has climbed to the upper third — the whole expansion happens on approach.
    offset: ["start end", "start 35%"]
  });
  const height = useTransform(scrollYProgress, [0, 1], ["34%", "100%"]);

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
    <div className="lab-video-track" ref={wrapRef}>
      <motion.div
        className="lab-video-frame"
        style={reducedMotion ? undefined : { height }}
      >
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
      </motion.div>
    </div>
  );
}
