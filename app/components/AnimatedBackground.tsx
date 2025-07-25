'use client'

import React, { useRef, useEffect } from 'react';
import { useTheme } from './Providers';

// Types
interface Shape {
  x: number;
  y: number;
  radius: number;
  sides: number;
  colorKey: keyof typeof THEME_COLORS['light'];
  speed: number;
  rotSpeed: number;
  angle: number;
  floatPhase: number;
}
type Point = [number, number];

type ThemeKey = 'light' | 'dark';

// Utility to generate a random polygon
function randomPolygon(
  cx: number,
  cy: number,
  radius: number,
  sides: number,
  angleOffset = 0
): Point[] {
  const points: Point[] = [];
  for (let i = 0; i < sides; i++) {
    const angle = angleOffset + (i * 2 * Math.PI) / sides;
    points.push([
      cx + radius * Math.cos(angle),
      cy + radius * Math.sin(angle),
    ]);
  }
  return points;
}

const SHAPES = [
  { sides: 3, color: 'main' }, // triangle
  { sides: 4, color: 'accent' }, // square
  { sides: 5, color: 'main' }, // pentagon
  { sides: 6, color: 'accent' }, // hexagon
  { sides: 7, color: 'main' }, // heptagon
];

const THEME_COLORS = {
  light: {
    sea: '#b3e0ff', // stronger blue
    seaHighlight: '#1CA7EC', // more vivid highlight
    main: '#1CA7EC', // vivid blue
    accent: '#23D18B', // green accent
    shapeStroke: '#0e5a8a',
    glow: 'rgba(28,167,236,0.18)',
  },
  dark: {
    sea: '#112d4e', // stronger blue for dark
    seaHighlight: '#1CA7EC', // more vivid highlight
    main: '#1CA7EC',
    accent: '#23D18B',
    shapeStroke: '#23D18B',
    glow: 'rgba(35,209,139,0.18)',
  },
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const colors = THEME_COLORS[theme as ThemeKey];

  // Store shapes in a ref so they persist across renders
  const shapesRef = useRef<Shape[]>([]);

  // Initialize shapes only once or on theme change
  useEffect(() => {
    const shapes: Shape[] = [];
    const w = window.innerWidth;
    const h = window.innerHeight;
    const shapeCount = 4 + Math.floor(Math.random() * 2); // 4 or 5
    for (let i = 0; i < shapeCount; i++) {
      const sides = SHAPES[i % SHAPES.length].sides;
      const colorKey = SHAPES[i % SHAPES.length].color as keyof typeof THEME_COLORS['light'];
      const radius = lerp(32, 64, Math.random()); // smaller size
      const x = lerp(0.1, 0.9, Math.random()) * w;
      const y = lerp(0.2, 0.8, Math.random()) * h;
      const speed = lerp(0.08, 0.18, Math.random()) * (Math.random() > 0.5 ? 1 : -1);
      const rotSpeed = lerp(0.001, 0.003, Math.random()) * (Math.random() > 0.5 ? 1 : -1);
      const angle = Math.random() * Math.PI * 2;
      shapes.push({ x, y, radius, sides, colorKey, speed, rotSpeed, angle, floatPhase: Math.random() * Math.PI * 2 });
    }
    shapesRef.current = shapes;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
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
        const y = h * 0.8 + Math.sin((x / waveLength) * Math.PI * 2 + time * waveSpeed) * waveHeight * Math.sin(time * 0.0002 + x * 0.002);
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

    function drawShapes(time: number) {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      for (const shape of shapesRef.current) {
        // Animate position
        shape.x += shape.speed;
        if (shape.x > w + shape.radius) shape.x = -shape.radius;
        if (shape.x < -shape.radius) shape.x = w + shape.radius;
        // Bobbing
        const bob = Math.sin(time * 0.001 + shape.floatPhase) * 18;
        // Animate rotation
        shape.angle += shape.rotSpeed;
        // Draw polygon
        const points = randomPolygon(shape.x, shape.y + bob, shape.radius, shape.sides, shape.angle);
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(points[0][0], points[0][1]);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i][0], points[i][1]);
        }
        ctx.closePath();
        // Fill
        ctx.globalAlpha = 0.92;
        ctx.fillStyle = colors[shape.colorKey];
        ctx.shadowColor = colors.glow;
        ctx.shadowBlur = 32;
        ctx.fill();
        // Stroke
        ctx.globalAlpha = 1;
        ctx.lineWidth = 4;
        ctx.strokeStyle = colors.shapeStroke;
        ctx.shadowBlur = 0;
        ctx.stroke();
        ctx.restore();
      }
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
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
      }
      drawSea(time);
      drawShapes(time);
      animationId = requestAnimationFrame(animate);
    }
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        transition: 'background 0.5s',
      }}
      aria-hidden="true"
    />
  );
} 