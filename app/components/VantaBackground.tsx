"use client";
import { useEffect, useRef } from "react";

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let vantaEffect: any;
    let mounted = true;

    async function loadVanta() {
      if (typeof window === "undefined" || !vantaRef.current) return;
      const THREE = await import("three");
      // @ts-ignore
      window.THREE = THREE;
      const VANTA = await import("vanta/dist/vanta.globe.min");
      if (!mounted) return;
      vantaEffect = VANTA.default({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: "#1CA7EC",
        color2: "#23D18B",
        backgroundColor: "#10141C",
        size: 1.2,
        points: 12.0,
        maxDistance: 22.0,
        spacing: 18.0,
      });
    }

    loadVanta();

    return () => {
      mounted = false;
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      id="vanta-bg"
      style={{
        position: "fixed",
        zIndex: 0,
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
    ></div>
  );
} 