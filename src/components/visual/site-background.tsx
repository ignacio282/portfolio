"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
};

const gridSize = 32;
const sampleSize = 8;
const warpRadius = 105;
const warpStrength = 7;

export function SiteBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const drawingCanvas = canvas;
    const drawingContext = context;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const target: Point = { x: -9999, y: -9999 };
    const current: Point = { x: -9999, y: -9999 };
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let active = false;
    let animationFrame = 0;

    function resize() {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      drawingCanvas.width = Math.floor(width * pixelRatio);
      drawingCanvas.height = Math.floor(height * pixelRatio);
      drawingCanvas.style.width = `${width}px`;
      drawingCanvas.style.height = `${height}px`;
      drawingContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      draw();
    }

    function warpPoint(x: number, y: number): Point {
      if (reducedMotion || coarsePointer || !active) {
        return { x, y };
      }

      const dx = x - current.x;
      const dy = y - current.y;
      const distance = Math.hypot(dx, dy);

      if (distance > warpRadius || distance === 0) {
        return { x, y };
      }

      const influence = (1 - distance / warpRadius) ** 2;
      const force = influence * warpStrength;

      return {
        x: x + (dx / distance) * force,
        y: y + (dy / distance) * force
      };
    }

    function drawPolyline(points: Point[]) {
      drawingContext.beginPath();
      points.forEach((point, index) => {
        const warped = warpPoint(point.x, point.y);

        if (index === 0) {
          drawingContext.moveTo(warped.x, warped.y);
          return;
        }

        drawingContext.lineTo(warped.x, warped.y);
      });
      drawingContext.stroke();
    }

    function draw() {
      drawingContext.clearRect(0, 0, width, height);
      drawingContext.lineWidth = 1;
      drawingContext.setLineDash([]);
      drawingContext.lineCap = "butt";
      drawingContext.strokeStyle = "rgba(86, 78, 68, 0.32)";

      for (let x = -gridSize; x <= width + gridSize; x += gridSize) {
        const points: Point[] = [];

        for (let y = -gridSize; y <= height + gridSize; y += sampleSize) {
          points.push({ x, y });
        }

        drawPolyline(points);
      }

      for (let y = -gridSize; y <= height + gridSize; y += gridSize) {
        const points: Point[] = [];

        for (let x = -gridSize; x <= width + gridSize; x += sampleSize) {
          points.push({ x, y });
        }

        drawPolyline(points);
      }
    }

    function animate() {
      current.x += (target.x - current.x) * 0.16;
      current.y += (target.y - current.y) * 0.16;
      draw();
      animationFrame = window.requestAnimationFrame(animate);
    }

    function handlePointerMove(event: PointerEvent) {
      const wasActive = active;
      active = true;
      target.x = event.clientX;
      target.y = event.clientY;

      if (!wasActive) {
        current.x = event.clientX;
        current.y = event.clientY;
      }
    }

    function handlePointerLeave() {
      active = false;
      target.x = -9999;
      target.y = -9999;
    }

    resize();

    if (!reducedMotion && !coarsePointer) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerleave", handlePointerLeave);
      animationFrame = window.requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <canvas ref={canvasRef} className="background-grid-canvas" />
    </div>
  );
}
