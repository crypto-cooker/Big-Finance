'use client'

import React from 'react';

interface TransparencySkeletonProps {
  className?: string;
  variant?: 'image' | 'logo';
}

export const TransparencySkeleton: React.FC<TransparencySkeletonProps> = ({
  className = '',
  variant = 'image'
}) => {
  if (variant === 'logo') {
    return (
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse ${className}`}>
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      
      {/* Content placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-2 border-gray-400/30 border-t-gray-400 rounded-full animate-spin" />
          <div className="h-2 w-16 bg-gray-400/30 rounded animate-pulse" />
        </div>
      </div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-transparent via-white/5 to-transparent" />
      </div>
    </div>
  );
};

// Enhanced skeleton for large images
export const LargeImageSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse ${className}`}>
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      
      {/* Content placeholder with better visual hierarchy */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-3 border-gray-400/30 border-t-gray-400 rounded-full animate-spin" />
          <div className="flex flex-col items-center gap-1">
            <div className="h-3 w-24 bg-gray-400/30 rounded animate-pulse" />
            <div className="h-2 w-16 bg-gray-400/20 rounded animate-pulse" />
          </div>
        </div>
      </div>
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-400/10 via-transparent to-transparent" />
    </div>
  );
}; 