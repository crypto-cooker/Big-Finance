"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "./PageTransitionLoader";

interface LoadingLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  loadingText?: string;
  variant?: "default" | "button" | "nav" | "logo";
}

export const LoadingLink: React.FC<LoadingLinkProps> = ({
  href,
  children,
  className = "",
  onClick,
  loadingText,
  variant = "default",
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = async (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
    }

    // Only show loading for external navigation
    if (href.startsWith("/") && href !== window.location.pathname) {
      setIsLoading(true);

      // Small delay to show loading state
      setTimeout(() => {
        router.push(href);
      }, 100);
    }
  };

  const getLoadingText = (path: string) => {
    if (loadingText) return loadingText;

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

  if (variant === "button") {
    return (
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`${className} ${
          isLoading ? "opacity-75 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? (
          <LoadingSpinner
            variant="button"
            text={getLoadingText(href)}
            size="sm"
          />
        ) : (
          children
        )}
      </button>
    );
  }

  if (variant === "nav") {
    return (
      <Link
        href={href}
        onClick={handleClick}
        className={`${className} ${
          isLoading ? "opacity-75 pointer-events-none" : ""
        }`}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <LoadingSpinner size="sm" />
            <span className="text-xs">{getLoadingText(href)}</span>
          </div>
        ) : (
          children
        )}
      </Link>
    );
  }

  if (variant === "logo") {
    return (
      <Link href={href} onClick={handleClick} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`${className} ${
        isLoading ? "opacity-75 pointer-events-none" : ""
      }`}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <LoadingSpinner size="sm" />
          <span>{getLoadingText(href)}</span>
        </div>
      ) : (
        children
      )}
    </Link>
  );
};
