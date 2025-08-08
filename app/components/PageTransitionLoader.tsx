"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface PageTransitionLoaderProps {
  children: React.ReactNode;
}

export const PageTransitionLoader: React.FC<PageTransitionLoaderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true); // Start with loading true for initial load
  const [loadingText, setLoadingText] = useState("Loading...");
  const pathname = usePathname();

  useEffect(() => {
    // Set different loading text based on the page
    const getLoadingText = (path: string) => {
      switch (path) {
        case "/":
          return "Loading Home...";
        case "/launch":
          return "Loading App...";
        case "/how-it-works":
          return "Loading Guide...";
        case "/transparency":
          return "Loading Transparency...";
        default:
          return "Loading...";
      }
    };

    setLoadingText(getLoadingText(pathname));

    // Hide loading after a short delay to simulate page load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Reduced to 500ms for faster loading

    // Safety timeout to ensure loading is cleared
    const safetyTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 second safety timeout

    // Ensure loading is cleared if component unmounts
    return () => {
      clearTimeout(timer);
      clearTimeout(safetyTimer);
      setIsLoading(false);
    };
  }, [pathname]);

  return (
    <>
      {/* Page Transition Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[9999] bg-primary/95 backdrop-blur-sm flex items-center justify-center">
          <div className="flex flex-col items-center gap-6">
            {/* Animated Logo */}
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent2 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-white font-bold text-xl">BF</span>
              </div>
              {/* Rotating ring */}
              <div className="absolute inset-0 w-16 h-16 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
            </div>

            {/* Loading Text */}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-primary mb-2">
                {loadingText}
              </h3>
              <p className="text-secondary text-sm">
                Please wait while we prepare your experience
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-64 h-1 bg-panel rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent to-accent2 rounded-full animate-pulse"
                style={{
                  animation: "progress 2s ease-in-out infinite",
                  width: "60%",
                }}
              />
            </div>

            {/* Loading Dots */}
            <div className="flex gap-2">
              <div
                className="w-2 h-2 bg-accent rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-2 h-2 bg-accent2 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-2 h-2 bg-accent rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Page Content */}
      <div
        className={
          isLoading
            ? "opacity-50 transition-opacity duration-500"
            : "opacity-100 transition-opacity duration-500"
        }
      >
        {children}
      </div>
    </>
  );
};

// Enhanced loading spinner component for individual use
export const LoadingSpinner: React.FC<{
  size?: "sm" | "md" | "lg" | "xl";
  text?: string;
  variant?: "default" | "page" | "button";
}> = ({ size = "md", text, variant = "default" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  };

  if (variant === "page") {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div
            className={`${sizeClasses[size]} bg-gradient-to-br from-accent to-accent2 rounded-full flex items-center justify-center animate-pulse`}
          >
            <span className="text-white font-bold text-sm">BF</span>
          </div>
          <div
            className={`absolute inset-0 ${sizeClasses[size]} border-2 border-accent/30 border-t-accent rounded-full animate-spin`}
          />
        </div>
        {text && (
          <p className={`${textSizes[size]} text-secondary text-center`}>
            {text}
          </p>
        )}
      </div>
    );
  }

  if (variant === "button") {
    return (
      <div className="flex items-center gap-2">
        <div
          className={`${sizeClasses.sm} border-2 border-white/30 border-t-white rounded-full animate-spin`}
        />
        {text && <span className="text-sm">{text}</span>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`${sizeClasses[size]} border-2 border-accent/30 border-t-accent rounded-full animate-spin`}
      />
      {text && <p className={`${textSizes[size]} text-secondary`}>{text}</p>}
    </div>
  );
};

// Add progress animation to global CSS
const progressStyles = `
@keyframes progress {
  0% { width: 0%; }
  50% { width: 60%; }
  100% { width: 100%; }
}
`;

// Inject styles
if (typeof document !== "undefined") {
  const existingStyle = document.getElementById("progress-animation");
  if (!existingStyle) {
    const style = document.createElement("style");
    style.id = "progress-animation";
    style.textContent = progressStyles;
    document.head.appendChild(style);
  }
}
