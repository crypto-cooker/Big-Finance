'use client'

import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  width = 'w-full', 
  height = 'h-4', 
  rounded = 'rounded' 
}) => {
  return (
    <div 
      className={`${width} ${height} ${rounded} bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse ${className}`}
      style={{
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
      }}
    />
  );
};

export const TokenCardSkeleton: React.FC = () => {
  return (
    <div className="card p-6 space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton width="w-10" height="h-10" rounded="rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton width="w-20" height="h-6" />
          <Skeleton width="w-16" height="h-4" />
        </div>
        <Skeleton width="w-16" height="h-8" rounded="rounded-full" />
      </div>
      <div className="space-y-2">
        <Skeleton width="w-24" height="h-4" />
        <Skeleton width="w-32" height="h-8" />
        <Skeleton width="w-full" height="h-2" rounded="rounded-full" />
      </div>
    </div>
  );
};

export const StatsCardSkeleton: React.FC = () => {
  return (
    <div className="bg-panel/80 backdrop-blur-sm rounded-bigfi p-6 border border-primary transition-colors duration-300 text-center space-y-3">
      <div className="flex items-center justify-center gap-2">
        <Skeleton width="w-8" height="h-8" rounded="rounded-full" />
        <Skeleton width="w-16" height="h-6" />
      </div>
      <Skeleton width="w-24" height="h-4" />
      <Skeleton width="w-32" height="h-6" />
    </div>
  );
};

export const FormSkeleton: React.FC = () => {
  return (
    <div className="space-y-4">
      <Skeleton width="w-full" height="h-12" rounded="rounded-lg" />
      <Skeleton width="w-32" height="h-8" />
      <Skeleton width="w-full" height="h-12" rounded="rounded-lg" />
    </div>
  );
};

// Add shimmer animation to global CSS
const shimmerStyles = `
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = shimmerStyles;
  document.head.appendChild(style);
} 