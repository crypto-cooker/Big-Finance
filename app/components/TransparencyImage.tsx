'use client'

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { LargeImageSkeleton } from './TransparencySkeleton';
import { PlaceholderImage } from './PlaceholderImage';

interface TransparencyImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fallback?: string;
}

export const TransparencyImage: React.FC<TransparencyImageProps> = ({
  src,
  alt,
  className = '',
  priority = false,
  fallback = '/images/placeholder.png'
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

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {/* Skeleton loading state */}
      {isLoading && !hasError && (
        <div className="absolute inset-0">
          <LargeImageSkeleton className="w-full h-full" />
        </div>
      )}

      {/* Error state - show placeholder */}
      {hasError && (
        <div>
          <PlaceholderImage 
            alt={alt}
            className="w-full h-full"
          />
        </div>
      )}

      {/* Actual image */}
      {isInView && !hasError && (
        <Image
          src={src}
          alt={alt}
          width={720}
          height={560}
          className={`transition-all duration-500 ${
            isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          } ${className}`}
          onLoad={handleLoad}
          onError={handleError}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
        />
      )}

      {/* Loading overlay with progress indicator */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-lg">
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span className="text-white/80 text-xs font-medium">Loading image...</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Add shimmer animation to global CSS if not already present
const shimmerStyles = `
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const existingStyle = document.getElementById('shimmer-animation');
  if (!existingStyle) {
    const style = document.createElement('style');
    style.id = 'shimmer-animation';
    style.textContent = shimmerStyles;
    document.head.appendChild(style);
  }
} 