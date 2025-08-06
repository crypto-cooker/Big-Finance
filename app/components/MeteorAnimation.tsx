import React, { useEffect, useRef } from "react";

const ANIMATION_DURATION = 1800; // ms
const LOOP_INTERVAL = 3000; // ms

export default function MeteorAnimation() {
  const ballRef = useRef<SVGCircleElement>(null);
  const dropRef = useRef<SVGCircleElement>(null);
  const requestRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const [loop, setLoop] = React.useState(0);

  useEffect(() => {
    let running = true;
    function animateMeteor(time: number) {
      if (!startTimeRef.current) startTimeRef.current = time;
      const elapsed = time - startTimeRef.current;
      const t = Math.min(elapsed / ANIMATION_DURATION, 1);
      // Bezier curve: from top right to bottom left, with a curve
      const start = { x: 400, y: 0 };
      const control = { x: 280, y: 300 };
      const end = { x: 0, y: 600 };
      // Quadratic Bezier
      const x =
        (1 - t) * (1 - t) * start.x +
        2 * (1 - t) * t * control.x +
        t * t * end.x;
      const y =
        (1 - t) * (1 - t) * start.y +
        2 * (1 - t) * t * control.y +
        t * t * end.y;
      // Meteor color pulse
      const colorPulse = 0.5 + 0.5 * Math.sin(8 * Math.PI * t);
      if (ballRef.current) {
        ballRef.current.setAttribute("cx", String(x));
        ballRef.current.setAttribute("cy", String(y));
        ballRef.current.setAttribute("opacity", t < 0.98 ? "1" : "0");
        ballRef.current.setAttribute("r", String(16 + 8 * colorPulse));
        ballRef.current.setAttribute("filter", "url(#meteor-glow-filter)");
      }
      // Drop-in flash: only show at t ~ 0
      if (dropRef.current) {
        const dropOpacity = t < 0.12 ? 1 - t / 0.12 : 0;
        dropRef.current.setAttribute("opacity", String(dropOpacity));
        dropRef.current.setAttribute("r", String(18 + 18 * colorPulse));
      }
      if (t < 1 && running) {
        requestRef.current = requestAnimationFrame(animateMeteor);
      }
    }
    requestRef.current = requestAnimationFrame(animateMeteor);
    const timeout = setTimeout(() => {
      startTimeRef.current = 0;
      setLoop((l) => l + 1);
    }, LOOP_INTERVAL);
    return () => {
      running = false;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      clearTimeout(timeout);
    };
  }, [loop]);

  // Responsive SVG size
  return (
    <svg
      width="100vw"
      height="100vh"
      viewBox="0 0 400 600"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <defs>
        <radialGradient id="meteor-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="40%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#1CA7EC" stopOpacity="0.7" />
          <stop offset="90%" stopColor="#23D18B" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#23D18B" stopOpacity="0.1" />
        </radialGradient>
        <radialGradient id="drop-flash" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="60%" stopColor="#fff" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#1CA7EC" stopOpacity="0.1" />
        </radialGradient>
        <filter
          id="meteor-glow-filter"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Drop-in flash at start position */}
      <circle
        ref={dropRef}
        cx={400}
        cy={0}
        r={36}
        fill="url(#drop-flash)"
        opacity={1}
        filter="url(#meteor-glow-filter)"
      />
      {/* Meteor */}
      <circle
        ref={ballRef}
        r="24"
        fill="url(#meteor-glow)"
        opacity="0"
        filter="url(#meteor-glow-filter)"
      />
    </svg>
  );
}
