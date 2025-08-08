"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fallback?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width = 40,
  height = 40,
  className = "",
  priority = false,
  fallback = "/images/placeholder.png",
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const imageSrc = hasError ? fallback : src;

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse rounded-full" />
      )}

      {isInView && (
        <Image
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          } ${className}`}
          onLoad={handleLoad}
          onError={handleError}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
      )}
    </div>
  );
};

// Token avatar component with optimization
export const TokenAvatar: React.FC<{
  symbol: string;
  src: string;
  size?: "sm" | "md" | "lg";
}> = ({ symbol, src, size = "md" }) => {
  const sizeMap = {
    sm: { width: 24, height: 24 },
    md: { width: 40, height: 40 },
    lg: { width: 64, height: 64 },
  };

  const { width, height } = sizeMap[size];

  // Create responsive className for different screen sizes
  const getResponsiveClassName = () => {
    const baseClass = "rounded-full";

    // For screens smaller than sm, use 30x30px (w-7 h-7)
    // For sm and larger, use the original size
    const responsiveClass =
      size === "sm"
        ? "w-7 h-7 sm:w-6 sm:h-6" // 30px on mobile, 24px on sm+
        : size === "md"
        ? "w-7 h-7 sm:w-10 sm:h-10" // 30px on mobile, 40px on sm+
        : "w-7 h-7 sm:w-16 sm:h-16"; // 30px on mobile, 64px on sm+

    return `${baseClass} ${responsiveClass}`;
  };

  return (
    <OptimizedImage
      src={src}
      alt={`${symbol} token`}
      width={width}
      height={height}
      className={getResponsiveClassName()}
      fallback={`/images/${symbol.toLowerCase()}.png`}
    />
  );
};

// Lazy loading wrapper for components
export const LazyComponent: React.FC<{
  children: React.ReactNode;
  threshold?: number;
  className?: string;
}> = ({ children, threshold = 0.1, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={className}>
      {isVisible ? (
        children
      ) : (
        <div className="w-full h-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse rounded-lg" />
      )}
    </div>
  );
};
