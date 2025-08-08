"use client";

import React from "react";
import Link from "next/link";

interface LoadingLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "default" | "button" | "nav" | "logo";
}

export const LoadingLink: React.FC<LoadingLinkProps> = ({
  href,
  children,
  className = "",
  onClick,
  variant = "default",
}) => {
  const handleClick = async () => {
    if (onClick) {
      onClick();
    }
  };

  if (variant === "button") {
    return (
      <button onClick={handleClick} className={className}>
        {children}
      </button>
    );
  }

  if (variant === "nav") {
    return (
      <Link href={href} onClick={handleClick} className={className}>
        {children}
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
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
};
