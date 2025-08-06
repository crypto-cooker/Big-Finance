'use client'

import React from 'react';

interface PlaceholderImageProps {
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  alt,
  className = '',
  width = 720,
  height = 560
}) => {
  return (
    <div 
      className={`bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center rounded-lg ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400">
        <svg 
          width="48" 
          height="48" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          className="opacity-50"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
          <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="2"/>
          <path d="M21 15l-5-5L5 21" strokeWidth="2"/>
        </svg>
        <span className="text-sm font-medium">{alt}</span>
        <span className="text-xs opacity-75">Image not available</span>
      </div>
    </div>
  );
}; 