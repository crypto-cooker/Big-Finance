"use client";

import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { config } from "../lib/wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import { ThemeProvider } from "./ThemeProvider";

const queryClient = new QueryClient();

function ClientProviders({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-background text-primary flex items-center justify-center">
        <div className="relative">
          <div className="inline-block animate-spin rounded-full h-24 w-24 border-b-2 border-accent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <img src="/logo.png" alt="Logo" className="w-12 h-12" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>{children}</RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return <ClientProviders>{children}</ClientProviders>;
}
