"use client";

import React, { useState, useEffect } from "react";
import { LoadingLink } from "./LoadingLink";
import { ThemeToggle } from "./ThemeToggle";

interface MobileNavigationProps {
  className?: string;
  // Wallet connection props
  userAddress?: string | null;
  connectArbitrum?: () => void;
  disconnect?: () => void;
  isConnecting?: boolean;
  showWalletButton?: boolean;
  // Current page for highlighting active navigation
  currentPage?: string;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  className = "",
  userAddress,
  connectArbitrum,
  disconnect,
  isConnecting = false,
  showWalletButton = false,
  currentPage = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isOpen && !target.closest(".mobile-nav")) {
        setIsOpen(false);
      }
    };

    // Close menu on escape key
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleWalletAction = () => {
    if (userAddress && disconnect) {
      disconnect();
    } else if (connectArbitrum) {
      connectArbitrum();
    }
    closeMenu();
  };

  return (
    <div
      className={`md:hidden mobile-nav mobile-nav-bg backdrop-blur-sm ${className}`}
    >
      {/* Mobile Navigation Buttons Container */}
      <div className="flex items-center gap-1.5">
        {/* Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="relative p-1.5 rounded-md bg-accent/10 hover:bg-accent/20 border border-accent/30 hover:border-accent/50 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-accent/50"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <div className="relative w-5 h-5">
            {/* Hamburger Lines */}
            <span
              className={`absolute top-0 left-0 w-5 h-0.5 bg-current transform transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-2" : "translate-y-0"
              }`}
            />
            <span
              className={`absolute top-1.5 left-0 w-5 h-0.5 bg-current transform transition-all duration-300 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute top-3 left-0 w-5 h-0.5 bg-current transform transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2" : "translate-y-0"
              }`}
            />
          </div>
        </button>

        {/* Theme Toggle Button */}
        <div className="p-1.5 rounded-md bg-accent/10 hover:bg-accent/20  hover:border-accent/50 transition-all duration-300">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`absolute top-full right-0 z-40 transition-all duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto transform translate-y-0"
            : "opacity-0 pointer-events-none transform -translate-y-2"
        }`}
      >
        {/* Menu Panel */}
        <div className="w-60 bg-card border border-primary rounded-b-lg shadow-xl backdrop-blur-sm">
          <div className="flex flex-col">
            {/* Navigation Links */}
            <nav className="p-3">
              <ul className="space-y-1">
                <li>
                  <LoadingLink
                    href="/"
                    className={`flex items-center gap-3 p-3 rounded-lg text-primary hover:bg-accent/10 transition-all duration-200 hover:scale-[1.02] ${
                      currentPage === "/"
                        ? "bg-accent/10 border border-accent/30"
                        : ""
                    }`}
                    variant="nav"
                    onClick={closeMenu}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    Home
                  </LoadingLink>
                </li>
                <li>
                  <LoadingLink
                    href="/how-it-works"
                    className={`flex items-center gap-3 p-3 rounded-lg text-primary hover:bg-accent/10 transition-all duration-200 hover:scale-[1.02] ${
                      currentPage === "/how-it-works"
                        ? "bg-accent/10 border border-accent/30"
                        : ""
                    }`}
                    variant="nav"
                    onClick={closeMenu}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    How it works
                  </LoadingLink>
                </li>
                <li>
                  <LoadingLink
                    href="/transparency"
                    className={`flex items-center gap-3 p-3 rounded-lg text-primary hover:bg-accent/10 transition-all duration-200 hover:scale-[1.02] ${
                      currentPage === "/transparency"
                        ? "bg-accent/10 border border-accent/30"
                        : ""
                    }`}
                    variant="nav"
                    onClick={closeMenu}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    Transparency
                  </LoadingLink>
                </li>
                <li>
                  <LoadingLink
                    href="/launch"
                    className={`flex items-center gap-3 p-3 rounded-lg text-primary hover:bg-accent/10 transition-all duration-200 hover:scale-[1.02] ${
                      currentPage === "/launch"
                        ? "bg-accent/10 border border-accent/30"
                        : ""
                    }`}
                    variant="nav"
                    onClick={closeMenu}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Launch App
                  </LoadingLink>
                </li>

                {/* Wallet Connection Button - Only show when showWalletButton is true */}
                {showWalletButton && (
                  <li className="!mt-5">
                    <button
                      onClick={handleWalletAction}
                      disabled={isConnecting}
                      className="flex items-center gap-3 p-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold border border-red-400 hover:border-red-500 transition-all duration-200 hover:scale-[1.02] w-full text-left disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      {isConnecting ? (
                        <span className="font-bold text-white">
                          Connecting...
                        </span>
                      ) : userAddress ? (
                        <span className="font-mono text-xs font-bold text-white">
                          {userAddress.slice(0, 6)}...{userAddress.slice(-4)}
                        </span>
                      ) : (
                        <span className="font-bold text-white uppercase tracking-wide">
                          Connect Wallet
                        </span>
                      )}
                    </button>
                  </li>
                )}
              </ul>
            </nav>

            {/* Footer */}
            <div className="p-3 border-t border-primary">
              <div className="flex justify-center space-x-2">
                <a
                  href="https://x.com"
                  className="p-2 rounded-lg bg-blue-400 hover:bg-blue-500 border border-blue-200 dark:bg-accent/10 dark:hover:bg-accent/20 dark:border-transparent transition-all duration-200 hover:scale-110"
                  aria-label="Follow us on X (Twitter)"
                >
                  <img
                    src="/images/x.png"
                    alt="X (Twitter)"
                    className="w-4 h-4"
                  />
                </a>
                <a
                  href="https://telegram.org"
                  className="p-2 rounded-lg bg-blue-400 hover:bg-blue-500 border border-blue-200 dark:bg-accent/10 dark:hover:bg-accent/20 dark:border-transparent transition-all duration-200 hover:scale-110"
                  aria-label="Join our Telegram"
                >
                  <img
                    src="/images/telegram.png"
                    alt="Telegram"
                    className="w-4 h-4"
                  />
                </a>
                <a
                  href="https://gitbook.com"
                  className="p-2 rounded-lg bg-blue-400 hover:bg-blue-500 border border-blue-200 dark:bg-accent/10 dark:hover:bg-accent/20 dark:border-transparent transition-all duration-200 hover:scale-110"
                  aria-label="Read our documentation"
                >
                  <img
                    src="/images/gitbook.svg"
                    alt="GitBook"
                    className="w-4 h-4"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
