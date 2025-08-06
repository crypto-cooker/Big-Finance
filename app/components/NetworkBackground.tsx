'use client'

import React, { useRef, useEffect } from 'react';
import { useTheme } from './ThemeProvider';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
}

interface Connection {
  from: number;
  to: number;
  strength: number;
}

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  const colors = {
    dark: {
      nodes: '#1CA7EC',
      connections: 'rgba(28, 167, 236, 0.3)',
      glow: 'rgba(35, 209, 139, 0.2)',
      background: 'rgba(16, 20, 28, 0.8)'
    },
    light: {
      nodes: '#3b82f6',
      connections: 'rgba(59, 130, 246, 0.2)',
      glow: 'rgba(16, 185, 129, 0.15)',
      background: 'rgba(248, 250, 252, 0.8)'
    }
  };

  const currentColors = colors[theme as keyof typeof colors];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const nodes: Node[] = [];
    const connections: Connection[] = [];
    
    // Initialize nodes
    const nodeCount = 15;
    const connectionDistance = 150;
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        connections: []
      });
    }

    // Create connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = Math.sqrt(
          Math.pow(nodes[i].x - nodes[j].x, 2) + 
          Math.pow(nodes[i].y - nodes[j].y, 2)
        );
        if (distance < connectionDistance) {
          connections.push({
            from: i,
            to: j,
            strength: 1 - (distance / connectionDistance)
          });
        }
      }
    }

    function animate() {
      if (!ctx || !canvas) return;
      
      // Clear canvas
      ctx.fillStyle = currentColors.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update node positions
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x <= 0 || node.x >= canvas.width) node.vx *= -1;
        if (node.y <= 0 || node.y >= canvas.height) node.vy *= -1;

        // Keep nodes in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));
      });

      // Draw connections
      connections.forEach(conn => {
        const from = nodes[conn.from];
        const to = nodes[conn.to];
        const distance = Math.sqrt(
          Math.pow(from.x - to.x, 2) + Math.pow(from.y - to.y, 2)
        );

        if (distance < connectionDistance) {
          ctx.beginPath();
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(to.x, to.y);
          ctx.strokeStyle = currentColors.connections;
          ctx.lineWidth = 1;
          ctx.globalAlpha = conn.strength * 0.6;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      });

      // Draw nodes
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = currentColors.nodes;
        ctx.shadowColor = currentColors.glow;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationId = requestAnimationFrame(animate);
    }

    // Handle resize
    function handleResize() {
      if (!ctx || !canvas) return;
      
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      
      ctx.scale(dpr, dpr);
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme, currentColors]);

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