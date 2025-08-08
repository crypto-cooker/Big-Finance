"use client";

import Link from "next/link";
import AnimatedBackground from "../components/AnimatedBackground";
import { ThemeToggle } from "../components/ThemeToggle";
import BackgroundSelector from "../components/BackgroundSelector";
import { useTheme } from "../components/ThemeProvider";
import { LoadingLink } from "../components/LoadingLink";
import { MobileNavigation } from "../components/MobileNavigation";

export default function HowItWorks() {
  const { theme } = useTheme();
  return (
    <div className="min-h-screen bg-primary text-primary transition-colors duration-500 relative overflow-hidden">
      <BackgroundSelector />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card backdrop-blur-md border-b border-primary transition-colors duration-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center font-bold text-xl">
                <img src="/logo.png" alt="" />
              </div>
              <LoadingLink
                href="/"
                className="text-2xl font-bold gradient-text cursor-pointer"
                variant="logo"
              >
                BIG FI
              </LoadingLink>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <LoadingLink
                href="/how-it-works"
                className="text-accent hover:text-accent transition-colors"
                variant="nav"
              >
                How it works
              </LoadingLink>
              <LoadingLink
                href="/transparency"
                className="text-accent hover:text-accent transition-colors"
                variant="nav"
              >
                Transparency
              </LoadingLink>
              <LoadingLink
                href="/launch"
                className="border border-neutral-700 rounded-full px-6 py-2"
                variant="nav"
              >
                Launch App
              </LoadingLink>
              <ThemeToggle />
            </div>
            <MobileNavigation currentPage="/how-it-works" />
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-0">
            <h1 className="text-6xl sm:text-6xl md:text-7xl lg:text-7xl font-bold mb-4 gradient-text">
              How It Works
            </h1>
            <p className="text-xl mb-2 text-secondary">
              Understanding the BIG FI Protocol and how to earn competitive
              yields
            </p>
          </div>

          <div className="relative">
            {/* Vertical timeline line (optional) */}
            <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-gradient-to-b from-accent/30 via-accent2/30 to-transparent pointer-events-none z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 relative z-10">
              {/* Step 1: Connect Wallet (left) */}
              <span className="relative z-10 w-full ">
                <div
                  className={`${
                    theme === "light" ? "bg-panel" : "bg-panel/80"
                  } backdrop-blur-sm rounded-bigfi p-8 transition-colors duration-300`}
                >
                  <div className="">
                    <div className="flex items-center justify-center">
                      <div
                        className="w-[98px] h-[98px] bg-accent/10 rounded-full p-3 border border-accent/30 flex items-center justify-center"
                        style={{ background: "#2775ca" }}
                      >
                        <svg
                          width="60"
                          height="60"
                          viewBox="0 0 60 60"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontFamily="Calibri, sans-serif"
                            fontSize="48"
                            fill="#ffffff"
                          >
                            1
                          </text>
                        </svg>
                      </div>
                    </div>
                    <br />
                    <br />
                    <div className="">
                      <h2 className="text-2xl font-bold mb-4 text-accent">
                        1. Connect Your Wallet
                      </h2>
                      <p className="text-secondary mb-4">
                        Start by connecting your Web3 wallet (MetaMask,
                        WalletConnect, etc.) to access the BIG FI platform.
                      </p>
                      <div className="bg-accent/10 rounded-lg p-4 border border-accent/30">
                        <p className="text-accent text-sm">
                          <strong>Supported Wallets:</strong> MetaMask,
                          WalletConnect, Coinbase Wallet, and more
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </span>

              {/* Step 2: Choose Vault (right) */}
              <span className="relative z-10 w-full">
                <div
                  className={`${
                    theme === "light" ? "bg-panel" : "bg-panel/80"
                  } backdrop-blur-sm rounded-bigfi p-8  transition-colors duration-300`}
                >
                  <div className="">
                    <div className="flex items-center justify-center">
                      <div
                        className="w-[98px] h-[98px] bg-accent/10 rounded-full p-3 border border-accent/30 flex items-center justify-center"
                        style={{ background: "#4856fc" }}
                      >
                        <svg
                          width="60"
                          height="60"
                          viewBox="0 0 60 60"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontFamily="Calibri, sans-serif"
                            fontSize="48"
                            fill="#ffffff"
                          >
                            2
                          </text>
                        </svg>
                      </div>
                    </div>
                    <br />
                    <br />
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-4 text-accent">
                        2. Choose Your Vault
                      </h2>
                      <p className="text-secondary mb-6">
                        Select from our curated vaults offering different risk
                        profiles and yield strategies:
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="space-y-4">
                      {/* USDC Vault */}
                      <div className="flex items-center gap-4 bg-accent/10 rounded-lg p-4 border border-accent/30">
                        <img
                          src="/images/usdc.png"
                          alt="USDC"
                          className="w-10 h-10 rounded-full"
                          onError={(e) => {
                            e.currentTarget.src = "/images/usdc.png";
                          }}
                        />
                        <div>
                          <h3 className="font-bold text-accent mb-1">
                            USDC Vault
                          </h3>
                          <p className="text-secondary text-sm">
                            High yield, variable returns
                          </p>
                        </div>
                      </div>
                      {/* ETH Vault */}
                      <div className="flex items-center gap-4 bg-accent/10 rounded-lg p-4 border border-accent/30">
                        <img
                          src="/images/eth.png"
                          alt="ETH"
                          className="w-10 h-10 rounded-full"
                          onError={(e) => {
                            e.currentTarget.src = "/images/eth.png";
                          }}
                        />
                        <div>
                          <h3 className="font-bold text-accent mb-1">
                            ETH Vault
                          </h3>
                          <p className="text-secondary text-sm">
                            Medium yield, balanced risk
                          </p>
                        </div>
                      </div>
                      {/* BTC Vault */}
                      <div className="flex items-center gap-4 bg-accent/10 rounded-lg p-4 border border-accent/30">
                        <img
                          src="/images/btc.png"
                          alt="BTC"
                          className="w-10 h-10 rounded-full"
                          onError={(e) => {
                            e.currentTarget.src = "/public/images/btc.png";
                          }}
                        />
                        <div>
                          <h3 className="font-bold text-accent mb-1">
                            BTC Vault
                          </h3>
                          <p className="text-secondary text-sm">
                            Conservative, stable returns
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </span>

              {/* Step 3: Stake and Earn (left) */}
              <span className="relative z-10 w-full">
                <div
                  className={`${
                    theme === "light" ? "bg-panel" : "bg-panel/80"
                  } backdrop-blur-sm rounded-bigfi p-8 transition-colors duration-300`}
                >
                  <div className="">
                    <div className="flex items-center justify-center">
                      <div
                        className="w-[98px] h-[98px] bg-accent/10 rounded-full p-3 border border-accent/30 flex items-center justify-center"
                        style={{ background: "#5e8df5" }}
                      >
                        <svg
                          width="60"
                          height="60"
                          viewBox="0 0 60 60"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontFamily="Calibri, sans-serif"
                            fontSize="48"
                            fill="#ffffff"
                          >
                            3
                          </text>
                        </svg>
                      </div>
                    </div>
                    <br />
                    <br />
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-4 text-accent">
                        3. Stake and Earn
                      </h2>
                      <p className="text-secondary mb-4">
                        Deposit your assets into the chosen vault and start
                        earning competitive yields immediately.
                      </p>
                      <div className="bg-accent/10 rounded-lg p-4 border border-accent/30">
                        <p className="text-accent text-sm">
                          <strong>Key Features:</strong> No lock-up periods,
                          instant withdrawals, transparent fee structure
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </span>

              {/* Step 4: Monitor and Withdraw (right) */}
              <span className="relative z-10 w-full">
                <div
                  className={`${
                    theme === "light" ? "bg-panel" : "bg-panel/80"
                  } backdrop-blur-sm rounded-bigfi p-8 transition-colors duration-300`}
                >
                  <div className="">
                    <div className="flex items-center justify-center">
                      <div
                        className="w-[98px] h-[98px] bg-accent/10 rounded-full p-3 border border-accent/30 flex items-center justify-center"
                        style={{ background: "#f7931a" }}
                      >
                        <svg
                          width="60"
                          height="60"
                          viewBox="0 0 60 60"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontFamily="Calibri, sans-serif"
                            fontSize="48"
                            fill="#ffffff"
                          >
                            4
                          </text>
                        </svg>
                      </div>
                    </div>
                    <br />
                    <br />
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-4 text-accent">
                        4. Monitor and Withdraw
                      </h2>
                      <p className="text-secondary mb-4">
                        Track your earnings in real-time and withdraw your funds
                        whenever you need them.
                      </p>
                      <div className="bg-accent2/10 rounded-lg p-4 border border-accent2/30">
                        <p className="text-accent text-sm">
                          <strong>Real-time Updates:</strong> Live APY tracking,
                          portfolio performance, and yield history
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </span>
            </div>
          </div>

          <div className="text-center mt-8 mb-4 relative z-20">
            <LoadingLink
              href="/launch"
              className="gradient-bg text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-all duration-200 shadow-lg inline-block"
              variant="nav"
            >
              Start Earning Now
            </LoadingLink>
          </div>
        </div>
      </div>
    </div>
  );
}
