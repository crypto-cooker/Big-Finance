"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ethers } from "ethers";
import BackgroundSelector from "./components/BackgroundSelector";
import { ThemeToggle } from "./components/ThemeToggle";
import { LoadingLink } from "./components/LoadingLink";
import { MobileNavigation } from "./components/MobileNavigation";

// Contract addresses (Sepolia)
const CONTRACT_ADDRESSES = {
  STAKING: "0xE1c2Af96216B08679500E7F82c367F6C3979f222",
  USDC: "0xA77EDedba2ca1803f070840F9eC8E0E1AB6800Ce",
  WETH: "0x5B0DfB0854E019a7C80B038f2cdEB92CE76Ff2ed",
  WBTC: "0x744a75450fbD3E593DfDbAaB0074713DBc7ADf92",
};

// ✅ FIXED: Correct ABI matching your actual contract
const SimpleMultiTokenStakingABI = [
  "function getTokenStats(address) view returns (uint256 tvl, uint256 userCount, uint256 totalRewards)",
  "function getAllTokenStats() view returns (address[] tokens, uint256[] tvls, uint256[] userCounts, uint256[] totalRewards)",
];

const TOKENS = [
  {
    symbol: "USDC",
    name: "USD Coin",
    avatar: "/images/usdc.png",
    address: CONTRACT_ADDRESSES.USDC,
    apy: 20,
    description:
      "This vault takes advantage of non-directional trades to earn high yield. This strategy simultaneously goes long and short, allowing it to collect funding from the short while not being exposed to downside.",
    returnType: "HIGH, variable",
    risks: "Execution failure, smart contract risk, custody risk",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    avatar: "/images/eth.png",
    address: CONTRACT_ADDRESSES.WETH,
    apy: 20,
    description:
      "Advanced yield strategies leveraging DeFi protocols for optimal returns. This vault optimizes liquidity provision and lending across multiple protocols to maximize ETH yields.",
    returnType: "MEDIUM, variable",
    risks: "Market volatility, smart contract risk, protocol risk",
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    avatar: "/images/btc.png",
    address: CONTRACT_ADDRESSES.WBTC,
    apy: 20,
    description:
      "Conservative yield farming with focus on capital preservation. This strategy prioritizes security and stability while generating consistent returns through low-risk lending protocols.",
    returnType: "LOW, stable",
    risks: "Market risk, smart contract risk, custody risk",
  },
];

const PROBLEMS = [
  { title: "Stalling DeFi Growth" },
  { title: "Siloed Engines" },
  { title: "Inferior Products" },
  { title: "Lack of Adaptability" },
];

const SOLUTIONS = [
  { title: "Blend TradFi and DeFi" },
  { title: "Competitive TradFi" },
  { title: "Spark Growth" },
  { title: "Better Yields" },
];

export default function Home() {
  const [selectedToken, setSelectedToken] = useState(TOKENS[0]);
  const [tokenStats, setTokenStats] = useState([
    { locked: 0, apy: 20 },
    { locked: 0, apy: 20 },
    { locked: 0, apy: 20 },
  ]);
  const [totalTVL, setTotalTVL] = useState("0");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setIsLoading(true);
      // ✅ FIXED: Use environment variable or public RPC properly
      const provider = new ethers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL ||
          "https://sepolia.infura.io/v3/YOUR_INFURA_KEY"
      );
      const staking = new ethers.Contract(
        CONTRACT_ADDRESSES.STAKING,
        SimpleMultiTokenStakingABI,
        provider
      );

      try {
        // ✅ FIXED: Use getAllTokenStats first, then fallback to individual calls
        let stats;
        let calculatedTotalTVL = 0;

        try {
          // Method 1: Try getAllTokenStats
          const result = await staking.getAllTokenStats();

          stats = TOKENS.map((token, i) => {
            // ✅ FIXED: Use correct decimals for each token
            let decimals;
            if (token.symbol === "USDC") {
              decimals = 6;
            } else if (token.symbol === "BTC") {
              decimals = 8;
            } else {
              // ETH
              decimals = 18;
            }

            const tvlFormatted = Number(
              ethers.formatUnits(result.tvls[i], decimals)
            );

            // ✅ FIXED: Calculate total TVL by converting everything to USD equivalent
            // For simplicity, assuming 1:1 for demo. In production, you'd use price feeds
            let tvlInUSD = tvlFormatted;
            if (token.symbol === "ETH") {
              tvlInUSD = tvlFormatted * 2000; // Rough ETH price for demo
            } else if (token.symbol === "BTC") {
              tvlInUSD = tvlFormatted * 40000; // Rough BTC price for demo
            }
            calculatedTotalTVL += tvlInUSD;

            return {
              locked: tvlFormatted,
              apy: token.apy,
            };
          });
        } catch (getAllError) {
          console.log(
            "getAllTokenStats not available, falling back to individual calls:",
            getAllError
          );

          // Method 2: Fallback to individual calls
          stats = await Promise.all(
            TOKENS.map(async (token, i) => {
              try {
                const s = await staking.getTokenStats(token.address);

                // ✅ FIXED: Use correct decimals for each token
                let decimals;
                if (token.symbol === "USDC") {
                  decimals = 6;
                } else if (token.symbol === "BTC") {
                  decimals = 8;
                } else {
                  // ETH
                  decimals = 18;
                }

                const tvlFormatted = Number(ethers.formatUnits(s[0], decimals));

                // Calculate total TVL
                let tvlInUSD = tvlFormatted;
                if (token.symbol === "ETH") {
                  tvlInUSD = tvlFormatted * 2000; // Rough ETH price for demo
                } else if (token.symbol === "BTC") {
                  tvlInUSD = tvlFormatted * 40000; // Rough BTC price for demo
                }
                calculatedTotalTVL += tvlInUSD;

                return {
                  locked: tvlFormatted,
                  apy: token.apy,
                };
              } catch (tokenError) {
                console.error(
                  `Error fetching stats for ${token.symbol}:`,
                  tokenError
                );
                return { locked: 0, apy: token.apy };
              }
            })
          );
        }

        setTokenStats(stats);
        setTotalTVL(
          calculatedTotalTVL.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })
        );
      } catch (error) {
        console.error("Error fetching stats:", error);
        // Set default values on error
        setTokenStats([
          { locked: 0, apy: 20 },
          { locked: 0, apy: 20 },
          { locked: 0, apy: 20 },
        ]);
        setTotalTVL("0");
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();

    // Add event listener to refetch data when page becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchStats();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const interval = setInterval(fetchStats, 30000);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-primary text-primary transition-colors duration-500 relative overflow-hidden">
      <BackgroundSelector />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card backdrop-blur-md border-b border-primary transition-colors duration-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <LoadingLink href="/" variant="logo">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center font-bold text-xl">
                  <img src="/logo.png" alt="" />
                </div>
                <span className="text-2xl font-bold gradient-text cursor-pointer ">
                  BIG FI
                </span>
              </div>
            </LoadingLink>
            <div className="hidden md:flex items-center space-x-8">
              <LoadingLink
                href="/how-it-works"
                className="text-accent hover:text-accent2 transition-colors"
                variant="nav"
              >
                How it works
              </LoadingLink>
              <LoadingLink
                href="/transparency"
                className="text-accent hover:text-accent2 transition-colors"
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
            <MobileNavigation currentPage="/" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 bg-panel/90 relative overflow-hidden">
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-accent/30 transition-colors">
              <span className="text-sm font-medium text-secondary">
                The Future of DeFi Yields
              </span>
              <span className="text-accent">✨</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 leading-tight">
              Yield Made
              <br />
              <span className="gradient-text">Extraordinary</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-secondary max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4">
              Experience the next generation of DeFi with institutional-grade
              strategies accessible to everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <LoadingLink
                href="/launch"
                className="gradient-bg text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:opacity-90 transition-all duration-200 shadow-lg"
                variant="nav"
              >
                Launch App
              </LoadingLink>
              <LoadingLink
                href="/how-it-works"
                className="border border-accent/50 text-accent px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-accent/10 transition-all duration-200"
                variant="nav"
              >
                Learn More
              </LoadingLink>
            </div>
          </div>
        </div>
      </section>

      {/* TVL Section */}
      <section className="pt-5 pb-20 relative bg-panel transition-colors duration-500 overflow-hidden">
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-5 px-4">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-accent">
              Total Value Locked
            </h2>
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-3 sm:mb-4">
              {/* ✅ FIXED: Show loading state */}
              {isLoading ? (
                <div className="inline-block animate-spin rounded-full h-8 sm:h-12 w-8 sm:w-12 border-b-2 border-accent"></div>
              ) : (
                `$${totalTVL}`
              )}
            </div>
            <div className="text-secondary text-base sm:text-lg">
              Securing the future of decentralized finance
            </div>
          </div>
          {/* Token Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4">
            {TOKENS.map((token, index) => (
              <div
                key={token.symbol}
                onClick={() => setSelectedToken(token)}
                className={`card cursor-pointer transition-all duration-500 ease-out  border-primary transform-gpu
                ${
                  token.symbol === "BTC"
                    ? "card-btc"
                    : token.symbol === "ETH"
                    ? "card-eth"
                    : "card-usdc"
                }`}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <img
                    src={token.avatar}
                    alt={token.name}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all duration-500 ease-out hover:scale-125 hover:rotate-6 transform-gpu"
                  />
                  <div>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent transition-all duration-500 ease-out hover:scale-105 transform-gpu">
                      {token.symbol}
                    </div>
                    {/* <div className="text-accent2 text-sm">{token.name}</div> */}
                  </div>
                  <div
                    className={`ml-auto rounded-full px-2 sm:px-4 h-8 sm:h-10 grid place-items-center transition-all duration-500 ease-out hover:scale-110 hover:shadow-lg transform-gpu text-xs sm:text-sm ${
                      token.symbol === "BTC"
                        ? "btc-style"
                        : token.symbol === "ETH"
                        ? "eth-style"
                        : "usdc-style"
                    }`}
                  >
                    {token.apy}% APY*
                  </div>
                </div>
                <div className="w-full h-0.5 bg-neutral-700"></div>
                <br />
                <div>
                  <p className="font-light text-slate-500 text-sm">
                    {/* ✅ FIXED: Better formatting and loading state */}
                    Locked Value
                  </p>
                  <div className="text-xl sm:text-2xl md:text-3xl text-accent2 mb-1 transition-all duration-500 ease-out transform-gpu">
                    {isLoading
                      ? "---"
                      : `${tokenStats[index].locked.toLocaleString()} `}{" "}
                    <span className="font-light text-slate-500 text-sm sm:text-base">
                      {token.symbol}
                    </span>
                  </div>
                  {/* <div
                    className="w-full bg-panel/60 rounded-full h-2 mt-5 overflow-hidden"
                    style={{ background: "#555771" }}
                  >
                    <div
                      className="gradient-bg h-2 rounded-full transition-all duration-700 ease-out transform-gpu hover:scale-x-110"
                      style={{ width: `${Math.min(token.apy * 4, 100)}%` }}
                    ></div>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-panel/90 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-accent">
              Problem: DeFi Limitations
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-secondary max-w-3xl mx-auto">
              Traditional DeFi solutions face critical challenges that limit
              growth and accessibility for everyday users.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 px-4">
            {PROBLEMS.map((problem, index) => (
              <div
                key={index}
                className="bg-card transition-colors duration-500 rounded-lg p-4 sm:p-6 border border-primary text-center group"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto border border-red-500/30 group-hover:bg-red-500/30 transition-colors">
                  {/* Unique abstract SVGs for each card */}
                  {index === 0 && (
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 30 Q20 10 30 30 T40 30"
                        stroke="#1E90FF"
                        strokeWidth="3"
                        fill="none"
                      />
                      <circle
                        cx="20"
                        cy="20"
                        r="10"
                        fill="#00BFAE"
                        fillOpacity="0.18"
                      />
                    </svg>
                  )}
                  {index === 1 && (
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polygon
                        points="10,30 20,10 30,30"
                        fill="#1E90FF"
                        fillOpacity="0.22"
                      />
                      <rect
                        x="15"
                        y="15"
                        width="10"
                        height="10"
                        rx="3"
                        fill="#00BFAE"
                        fillOpacity="0.18"
                      />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <ellipse
                        cx="20"
                        cy="20"
                        rx="14"
                        ry="8"
                        fill="#1E90FF"
                        fillOpacity="0.16"
                      />
                      <path
                        d="M10 25 Q20 35 30 25"
                        stroke="#00BFAE"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  )}
                  {index === 3 && (
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="8"
                        y="8"
                        width="24"
                        height="24"
                        rx="8"
                        fill="#00BFAE"
                        fillOpacity="0.13"
                      />
                      <polygon
                        points="20,12 28,28 12,28"
                        fill="#1E90FF"
                        fillOpacity="0.19"
                      />
                    </svg>
                  )}
                </div>
                <div className="text-sm sm:text-base md:text-lg font-semibold text-red-300">
                  - {problem.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-panel relative transition-colors duration-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-accent">
              Our Solution
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-secondary max-w-3xl mx-auto">
              Big FI bridges the gap between TradFi and DeFi, offering better
              yields and more accessible products.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 px-4">
            {SOLUTIONS.map((solution, index) => (
              <div
                key={index}
                className="bg-card transition-colors duration-500 p-4 sm:p-6 border border-primary text-center rounded-lg group"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto border border-primary group-hover:bg-primary/20 transition-colors">
                  {/* Unique abstract SVGs for each card */}
                  {index === 0 && (
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 20 Q20 5 30 20 T40 20"
                        stroke="#00BFAE"
                        strokeWidth="3"
                        fill="none"
                      />
                      <ellipse
                        cx="20"
                        cy="25"
                        rx="10"
                        ry="6"
                        fill="#1E90FF"
                        fillOpacity="0.18"
                      />
                    </svg>
                  )}
                  {index === 1 && (
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polygon
                        points="20,8 32,32 8,32"
                        fill="#00BFAE"
                        fillOpacity="0.22"
                      />
                      <circle
                        cx="20"
                        cy="24"
                        r="6"
                        fill="#1E90FF"
                        fillOpacity="0.15"
                      />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="12"
                        y="12"
                        width="16"
                        height="16"
                        rx="6"
                        fill="#1E90FF"
                        fillOpacity="0.13"
                      />
                      <path
                        d="M16 28 Q20 20 24 28"
                        stroke="#00BFAE"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  )}
                  {index === 3 && (
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <ellipse
                        cx="20"
                        cy="20"
                        rx="14"
                        ry="8"
                        fill="#00BFAE"
                        fillOpacity="0.16"
                      />
                      <polygon
                        points="20,14 28,26 12,26"
                        fill="#1E90FF"
                        fillOpacity="0.19"
                      />
                    </svg>
                  )}
                </div>
                <div className="text-sm sm:text-base md:text-lg font-semibold text-primary">
                  + {solution.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-accent">
              Our Products
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-secondary max-w-3xl mx-auto">
              Revolutionary DeFi products designed for maximum capital
              efficiency and user experience.
            </p>
          </div>

          <div className="text-center mb-8 sm:mb-12 px-4">
            <Link
              href="/launch"
              className="gradient-bg text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:opacity-90 transition-all duration-200 shadow-lg"
            >
              Start Earning
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 px-4">
            {TOKENS.map((token, index) => (
              <div
                key={index}
                onClick={() => setSelectedToken(token)}
                className={`text-center bg-card/80 rounded-bigfi p-4 sm:p-6 border transition-all duration-300 cursor-pointer ${
                  selectedToken.symbol === token.symbol
                    ? "border-accent2 bg-accent2/10 shadow-lg shadow-accent2/20 scale-105"
                    : "border-primary hover:border-accent2/40"
                }`}
              >
                <div className="flex justify-center mb-4">
                  <img
                    src={token.avatar}
                    alt={token.name}
                    className="w-8 h-8 rounded-full transition-transform duration-200 hover:scale-110"
                  />
                </div>
                <div className="text-xl sm:text-2xl font-bold mb-2 text-accent">
                  {token.symbol}
                </div>
                <div className="text-2xl sm:text-3xl font-bold gradient-text mb-3 sm:mb-4">
                  {token.apy}% APY*
                </div>
                <div className="text-xs sm:text-sm text-accent2">
                  {/* ✅ FIXED: Better display format */}
                  TVL:{" "}
                  {isLoading
                    ? "..."
                    : `${tokenStats[index].locked.toLocaleString()} ${
                        token.symbol
                      }`}
                </div>
              </div>
            ))}
          </div>

          {/* Dynamic Token Vault Info - Updates based on selected token */}
          <div className="bg-card/80 rounded-bigfi p-4 sm:p-6 md:p-8 border border-primary transition-colors duration-500 h-[500px] sm:h-[500px] md:h-[350px] px-4">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <img
                src={selectedToken.avatar}
                alt={selectedToken.name}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
              />
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-accent">
                  {selectedToken.symbol} Premium Vault
                </h3>
                <div className="text-lg sm:text-xl md:text-2xl font-bold gradient-text">
                  {selectedToken.apy}% APY*
                </div>
              </div>
            </div>
            <p className="text-secondary text-sm sm:text-base h-[130px] mb-[10px] sm:h-[100px]">
              {selectedToken.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-card/80 rounded-bigfi p-3 sm:p-4 hover:bg-card/90 transition-colors">
                <div className="text-primary text-sm sm:text-md mb-1 sm:mb-2">
                  Return Profile
                </div>
                <div className="font-semibold text-secondary text-xs sm:text-sm">
                  {selectedToken.returnType}
                </div>
              </div>
              <div className="bg-card/80 rounded-bigfi p-3 sm:p-4 hover:bg-card/90 transition-colors">
                <div className="text-primary text-sm sm:text-md mb-1 sm:mb-2">
                  Risk Assessment
                </div>
                <div className="font-semibold text-secondary text-xs sm:text-sm">
                  {selectedToken.risks}
                </div>
              </div>
              <div className="bg-card/80 rounded-bigfi p-3 sm:p-4 hover:bg-card/90 transition-colors">
                <div className="text-primary text-sm sm:text-md mb-1 sm:mb-2">
                  Total Locked
                </div>
                <div className="font-semibold text-secondary text-xs sm:text-sm">
                  {/* ✅ FIXED: Better loading state and formatting */}
                  {isLoading
                    ? "..."
                    : `${tokenStats[
                        TOKENS.findIndex(
                          (t) => t.symbol === selectedToken.symbol
                        )
                      ].locked.toLocaleString()} ${selectedToken.symbol}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Build Section */}
      <section className="py-20 bg-panel relative transition-colors duration-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-accent px-4">
            Build the Future with Big FI
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-secondary max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            Join our ecosystem of innovative DeFi products that bridge
            traditional finance with decentralized opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <button className="gradient-bg text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:opacity-90 transition-all duration-200 shadow-lg">
              Contact Us
            </button>
            <Link
              href="/launch"
              className="border border-white text-accent px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-primary/10 transition-all duration-200"
            >
              Launch App
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex justify-between relative py-3 border-t border-primary bg-slate-900/100 px-4 sm:px-[5%]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center font-bold text-xl">
            <Link href="/">
              <img src="/logo.png" alt="" />
            </Link>
          </div>
        </div>
        <div className="flex text-center items-center gap-3">
          <Link href="https://x.com">
            <img src="/images/x.png" alt="" />
          </Link>
          <Link href="https://telegram.org">
            <img src="/images/telegram.png" alt="" />
          </Link>
          <Link href="https://gitbook.com">
            <img src="/images/gitbook.svg" alt="" width={30} />
          </Link>
        </div>
      </footer>
    </div>
  );
}
