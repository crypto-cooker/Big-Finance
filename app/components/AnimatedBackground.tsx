"use client";

import React, { useRef, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

type ThemeKey = "light" | "dark";

const THEME_COLORS = {
  light: {
    sea: "#e0f2fe", // light blue for light mode
    seaHighlight: "#0ea5e9", // sky blue highlight
  },
  dark: {
    sea: "#112d4e", // stronger blue for dark
    seaHighlight: "#1CA7EC", // more vivid highlight
  },
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const colors = THEME_COLORS[theme as ThemeKey];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationId: number;

    function drawSea(time: number) {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.save();
      ctx.clearRect(0, 0, w, h);
      // Draw animated sea
      ctx.beginPath();
      const waveHeight = lerp(32, 64, 0.5);
      const waveLength = lerp(0.8, 1.2, 0.5) * w;
      const waveSpeed = 0.00018;
      ctx.moveTo(0, h * 0.8);
      for (let x = 0; x <= w; x += 8) {
        const y =
          h * 0.8 +
          Math.sin((x / waveLength) * Math.PI * 2 + time * waveSpeed) *
            waveHeight *
            Math.sin(time * 0.0002 + x * 0.002);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fillStyle = colors.sea;
      ctx.globalAlpha = 0.95;
      ctx.shadowColor = colors.seaHighlight;
      ctx.shadowBlur = 32;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      ctx.restore();
    }

    function animate(time: number) {
      if (!canvas || !ctx) return;
      // Resize canvas if needed
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + "px";
        canvas.style.height = h + "px";
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
      }
      drawSea(time);
      animationId = requestAnimationFrame(animate);
    }
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
