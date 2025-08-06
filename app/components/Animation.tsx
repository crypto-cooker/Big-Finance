"use client";

import { useEffect, useRef } from "react";

export default function Animation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    console.log("Animation");
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = ["#2775ca", "#4856fc", "#5e8df5", "#f7931a"];
    const LINE_WIDTH = 3;
    const MAX_TOTAL_LINES = 6;
    const MAX_VERTICAL = 3;
    const MAX_HORIZONTAL = 3;

    let width = 0;
    let height = 0;
    const lines: Array<{
      vertical: boolean;
      direction: number;
      position: number;
      progress: number;
      speed: number;
      length: number;
      color: string;
      width: number;
    }> = [];

    function resize() {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    function countLines() {
      let verticalCount = 0;
      let horizontalCount = 0;
      for (const l of lines) {
        if (l.vertical) verticalCount++;
        else horizontalCount++;
      }
      return { verticalCount, horizontalCount };
    }

    function randomFromArray<T>(arr: T[]) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    function createLine() {
      const { verticalCount, horizontalCount } = countLines();

      let vertical;
      if (verticalCount >= MAX_VERTICAL) vertical = false;
      else if (horizontalCount >= MAX_HORIZONTAL) vertical = true;
      else vertical = Math.random() < 0.5;

      const direction = Math.random() < 0.5 ? 1 : -1;
      const position = vertical
        ? Math.random() * width
        : Math.random() * height;
      const speed = (1.5 + Math.random() * 2.5) * 0.5;
      const length = 60 + Math.random() * 120;
      const color = randomFromArray(colors);

      let progress;
      if (vertical) {
        progress = direction === 1 ? 0 : height;
      } else {
        progress = direction === 1 ? 0 : width;
      }

      lines.push({
        vertical,
        direction,
        position,
        progress,
        speed,
        length,
        color,
        width: LINE_WIDTH,
      });
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = lines.length - 1; i >= 0; i--) {
        const l = lines[i];

        ctx.beginPath();
        let grad;
        if (l.vertical) {
          grad = ctx.createLinearGradient(
            l.position,
            l.progress,
            l.position,
            l.progress - l.length * l.direction
          );
        } else {
          grad = ctx.createLinearGradient(
            l.progress,
            l.position,
            l.progress - l.length * l.direction,
            l.position
          );
        }
        grad.addColorStop(0, l.color);
        grad.addColorStop(1, "rgba(255,255,255,0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = l.width;

        if (l.vertical) {
          ctx.moveTo(l.position, l.progress);
          ctx.lineTo(l.position, l.progress - l.length * l.direction);
        } else {
          ctx.moveTo(l.progress, l.position);
          ctx.lineTo(l.progress - l.length * l.direction, l.position);
        }

        ctx.stroke();

        // Rounded head
        ctx.beginPath();
        ctx.fillStyle = l.color;
        if (l.vertical) {
          ctx.arc(l.position, l.progress, l.width / 2, 0, 2 * Math.PI);
        } else {
          ctx.arc(l.progress, l.position, l.width / 2, 0, 2 * Math.PI);
        }
        ctx.fill();

        // Move
        l.progress += l.speed * l.direction;

        // Remove if off screen
        if (l.vertical) {
          if (
            (l.direction === 1 && l.progress - l.length > height + 50) ||
            (l.direction === -1 && l.progress + l.length < -50)
          ) {
            lines.splice(i, 1);
          }
        } else {
          if (
            (l.direction === 1 && l.progress - l.length > width + 50) ||
            (l.direction === -1 && l.progress + l.length < -50)
          ) {
            lines.splice(i, 1);
          }
        }
      }

      requestAnimationFrame(draw);
    }

    function spawnLinesBatch() {
      const availableSlots = MAX_TOTAL_LINES - lines.length;
      if (availableSlots <= 0) return;

      const count = Math.min(availableSlots, Math.floor(3 + Math.random() * 5));
      for (let i = 0; i < count; i++) createLine();
    }

    function scheduleSpawn() {
      spawnLinesBatch();
      const delay = 2000 + Math.random() * 4000;
      setTimeout(scheduleSpawn, delay);
    }

    scheduleSpawn();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 10,
        pointerEvents: "none",
        // zIndex: -1,
      }}
    />
  );
}
