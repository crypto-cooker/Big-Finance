'use client'

import React, { useState } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'gradient';
}

export const AnimatedButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
  disabled = false,
  loading = false,
  variant = 'primary'
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const baseClasses = `
    relative overflow-hidden transition-all duration-200 ease-out
    transform hover:scale-105 active:scale-95
    focus:outline-none focus:ring-2 focus:ring-accent/50
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
  `;

  const variantClasses = {
    primary: 'bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-transparent border border-accent text-accent hover:bg-accent/10',
    gradient: 'gradient-bg text-white shadow-lg hover:shadow-xl'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      <span className={`relative z-10 flex items-center justify-center ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </span>
      
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </span>
      )}
      
      {/* Ripple effect */}
      <span 
        className={`absolute inset-0 bg-white/20 rounded-lg transform scale-0 transition-transform duration-300 ${
          isPressed ? 'scale-100' : ''
        }`}
      />
    </button>
  );
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const AnimatedCard: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        card transition-all duration-300 ease-out
        ${hover ? 'hover:shadow-xl hover:scale-[1.02] hover:border-accent/50' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {children}
      
      {/* Subtle glow effect on hover */}
      {hover && (
        <div 
          className={`absolute inset-0 rounded-bigfi bg-gradient-to-r from-accent/5 to-accent2/5 opacity-0 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : ''
          }`}
        />
      )}
    </div>
  );
};

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  className?: string;
  type?: string;
}

export const AnimatedInput: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  label,
  error,
  className = '',
  type = 'text'
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-secondary transition-colors">
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 rounded-lg border transition-all duration-200
            bg-transparent outline-none
            ${isFocused 
              ? 'border-accent shadow-lg shadow-accent/20' 
              : 'border-primary hover:border-accent/50'
            }
            ${error ? 'border-red-500' : ''}
          `}
        />
        
        {/* Focus indicator */}
        <div 
          className={`absolute inset-0 rounded-lg border-2 border-transparent transition-all duration-200 ${
            isFocused ? 'border-accent/30' : ''
          }`}
        />
      </div>
      
      {error && (
        <p className="text-red-500 text-sm animate-pulse">{error}</p>
      )}
    </div>
  );
};

// Loading spinner component
export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`${sizeClasses[size]} border-2 border-accent/30 border-t-accent rounded-full animate-spin`} />
  );
};

// Success/Error icons with animations
export const StatusIcon: React.FC<{ type: 'success' | 'error' | 'info' }> = ({ type }) => {
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  const icons = {
    success: (
      <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    info: (
      <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  };

  return (
    <div 
      className={`transition-all duration-300 transform ${
        isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      }`}
    >
      {icons[type]}
    </div>
  );
}; 