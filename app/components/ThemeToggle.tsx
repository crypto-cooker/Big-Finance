"use client";

import React from "react";
import { useTheme } from "../components/ThemeProvider";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-accent/10 hover:bg-accent/20 border border-accent/30 hover:border-accent/50 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent/50"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <div className="relative">
        {/* Sun icon for light mode */}
        <svg
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={`transition-all duration-300 ease-in-out ${
            theme === "dark"
              ? "opacity-100 rotate-0"
              : "opacity-0 -rotate-90 absolute inset-0"
          }`}
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>

        {/* Moon icon for dark mode */}
        <svg
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={`transition-all duration-300 ease-in-out ${
            theme === "light"
              ? "opacity-100 rotate-0"
              : "opacity-0 rotate-90 absolute inset-0"
          }`}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </div>
    </button>
  );
};
