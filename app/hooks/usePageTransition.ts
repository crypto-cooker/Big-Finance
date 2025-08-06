"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface UsePageTransitionReturn {
  isTransitioning: boolean;
  startTransition: (href: string) => void;
  loadingText: string;
}

export const usePageTransition = (): UsePageTransitionReturn => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading...");
  const router = useRouter();

  const getLoadingText = useCallback((path: string) => {
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
  }, []);

  const startTransition = useCallback(
    (href: string) => {
      setIsTransitioning(true);
      setLoadingText(getLoadingText(href));

      // Navigate to the new page
      router.push(href);

      // The transition will be handled by the PageTransitionLoader component
      // which will automatically hide after the page loads
    },
    [router, getLoadingText]
  );

  return {
    isTransitioning,
    startTransition,
    loadingText,
  };
};
