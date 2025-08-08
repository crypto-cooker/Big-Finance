"use client";

import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ethers } from "ethers";
import { useArbitrumWallet } from "../hooks/useArbitrumWallet";
import { useStaking } from "../hooks/useStaking";
import BackgroundSelector from "../components/BackgroundSelector";
import StakingInfo from "../components/StakingInfo";
import { useTheme } from "../components/ThemeProvider";
import { ThemeToggle } from "../components/ThemeToggle";
import { ADDRESSES } from "../constants";
import stakingAbi from "../abis/staking.json";
import {
  TokenCardSkeleton,
  StatsCardSkeleton,
} from "../components/SkeletonLoader";
import {
  AnimatedButton,
  AnimatedCard,
  AnimatedInput,
  LoadingSpinner,
} from "../components/MicroInteractions";
import { TokenAvatar, LazyComponent } from "../components/OptimizedImage";
import { LoadingLink } from "../components/LoadingLink";
import { MobileNavigation } from "../components/MobileNavigation";

// Remove the inline useTheme hook since we're now importing it

type TokenStat = {
  symbol: string;
  tvl: string;
};

const TOKENS = [
  {
    symbol: "USDC",
    name: "USD Coin",
    avatar: "/images/usdc.png",
    address: ADDRESSES.USDC,
    vaultToken: "BIG USDC",
    apy: 20,
    description:
      "This vault takes advantage of non-directional trades to earn high yield.",
    returnType: "HIGH, variable",
    risks: "Execution failure, smart contract risk, custody risk",
    decimals: 6,
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    avatar: "/images/eth.png",
    address: ADDRESSES.WETH,
    vaultToken: "BIG ETH",
    apy: 20,
    description:
      "Advanced yield strategies leveraging DeFi protocols for optimal returns.",
    returnType: "MEDIUM, variable",
    risks: "Market volatility, smart contract risk, protocol risk",
    decimals: 18,
  },
  {
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    avatar: "/images/btc.png",
    address: ADDRESSES.WBTC,
    vaultToken: "BIG WBTC",
    apy: 20,
    description:
      "Conservative yield farming with focus on capital preservation.",
    returnType: "LOW, stable",
    risks: "Market risk, smart contract risk, custody risk",
    decimals: 8,
  },
];

export default function LaunchApp() {
  const [selectedToken, setSelectedToken] = useState(TOKENS[0]);
  const [amount, setAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [tab, setTab] = useState<"stake" | "withdraw">("stake");
  const [txStatus, setTxStatus] = useState<string | null>(null);
  const [allTokenStats, setAllTokenStats] = useState<TokenStat[]>([
    { symbol: "USDC", tvl: "0" },
    { symbol: "ETH", tvl: "0" },
    { symbol: "WBTC", tvl: "0" },
  ]);
  const [statsLoading, setStatsLoading] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Add theme hook
  const { theme, toggleTheme } = useTheme();

  const {
    address: userAddress,
    provider,
    signer,
    error,
    isConnecting,
    connectArbitrum,
    disconnect,
    isClient,
  } = useArbitrumWallet();

  // Show toast when wallet connection error occurs
  useEffect(() => {
    if (error) {
      toast.error("Please retry", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [error]);

  // Show toast when wallet connection is successful
  useEffect(() => {
    if (userAddress && !isConnecting) {
      toast.success("Wallet connected", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [userAddress, isConnecting]);
  const {
    stakingData,
    loading: stakingLoading,
    error: stakingError,
    fetchStakingData,
    stakeUSDC,
    stakeWBTC,
    stakeETH,
    unstakeUSDC,
    unstakeWBTC,
    unstakeETH,
  } = useStaking(provider, signer, userAddress);

  // Use a public provider for Arbitrum
  const publicProvider = new ethers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL || "https://arb1.arbitrum.io/rpc"
  );

  // Fetch total staked amounts for stats
  async function fetchAllTokenStats() {
    if (!publicProvider) return;

    setStatsLoading(true);

    try {
      const stakingContract = new ethers.Contract(
        ADDRESSES.STAKING,
        stakingAbi,
        publicProvider
      );
      console.log("stakingContract executed");
      const [totalStakedUSDC, totalStakedETH, totalStakedWBTC] =
        await Promise.all([
          stakingContract.totalStakedUSDC(),
          stakingContract.totalStakedETH(),
          stakingContract.totalStakedWBTC(),
        ]);

      setAllTokenStats([
        {
          symbol: "USDC",
          tvl: ethers.formatUnits(totalStakedUSDC, 6),
        },
        {
          symbol: "ETH",
          tvl: ethers.formatEther(totalStakedETH),
        },
        {
          symbol: "WBTC",
          tvl: ethers.formatUnits(totalStakedWBTC, 8),
        },
      ]);
    } catch (error) {
      console.error("Error fetching token stats:", error);
    } finally {
      setStatsLoading(false);
    }
  }

  // Get user's staked amount for selected token
  const getUserStakedAmount = () => {
    switch (selectedToken.symbol) {
      case "USDC":
        return stakingData.usdcStaked;
      case "ETH":
        return stakingData.ethStaked;
      case "WBTC":
        return stakingData.wbtcStaked;
      default:
        return "0";
    }
  };

  // Get user's reward for selected token
  const getUserReward = () => {
    switch (selectedToken.symbol) {
      case "USDC":
        return stakingData.usdcReward;
      case "ETH":
        return stakingData.ethReward;
      case "WBTC":
        return stakingData.wbtcReward;
      default:
        return "0";
    }
  };

  // Get user's balance for selected token
  const getUserBalance = () => {
    switch (selectedToken.symbol) {
      case "USDC":
        return stakingData.usdcBalance;
      case "ETH":
        return stakingData.ethBalance;
      case "WBTC":
        return stakingData.wbtcBalance;
      default:
        return "0";
    }
  };

  // Handle stake
  async function handleStake() {
    if (!amount || Number(amount) <= 0) {
      toast.error("Please input amount", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (!userAddress) {
      console.log("Please connect wallet");
      toast.error("Please connect wallet", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    setTxStatus("Processing...");

    try {
      switch (selectedToken.symbol) {
        case "USDC":
          await stakeUSDC(amount);
          break;
        case "ETH":
          await stakeETH(amount);
          break;
        case "WBTC":
          await stakeWBTC(amount);
          break;
      }

      setTxStatus("Stake successful!");
      setAmount("");
      await fetchAllTokenStats();
    } catch (e: unknown) {
      let msg = e instanceof Error ? e.message : String(e);
      if (
        (e as { code?: number })?.code === 4001 ||
        msg.toLowerCase().includes("user rejected") ||
        msg.toLowerCase().includes("user denied")
      ) {
        msg = "Transaction cancelled by user.";
      }
      setTxStatus("Stake failed: " + msg);
    }

    setTimeout(() => setTxStatus(null), 3000);
  }

  // Handle unstake
  async function handleUnstake() {
    if (!withdrawAmount || Number(withdrawAmount) <= 0) {
      toast.error("Please input amount", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (!userAddress) {
      toast.error("Please connect wallet", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    setTxStatus("Processing...");

    try {
      switch (selectedToken.symbol) {
        case "USDC":
          await unstakeUSDC(withdrawAmount);
          break;
        case "ETH":
          await unstakeETH(withdrawAmount);
          break;
        case "WBTC":
          await unstakeWBTC(withdrawAmount);
          break;
      }

      setTxStatus("Unstake successful!");
      setWithdrawAmount("");
      await fetchAllTokenStats();
    } catch (e: unknown) {
      let msg = e instanceof Error ? e.message : String(e);
      if (
        (e as { code?: number })?.code === 4001 ||
        msg.toLowerCase().includes("user rejected") ||
        msg.toLowerCase().includes("user denied")
      ) {
        msg = "Transaction cancelled by user.";
      }
      setTxStatus("Unstake failed: " + msg);
    }

    setTimeout(() => setTxStatus(null), 3000);
  }

  // Set max amount for stake
  const setMaxStake = () => {
    setAmount(getUserBalance());
  };

  // Set max amount for unstake
  const setMaxUnstake = () => {
    setWithdrawAmount(getUserStakedAmount());
  };

  // Fetch stats on mount
  useEffect(() => {
    fetchAllTokenStats();
    const interval = setInterval(() => {
      fetchAllTokenStats();
    }, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [fetchAllTokenStats]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".user-dropdown")) {
        setShowUserDropdown(false);
      }
    };

    if (showUserDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserDropdown]);

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
              <div className="w-40 flex justify-center">
                {!userAddress ? (
                  <button
                    onClick={connectArbitrum}
                    className=" text-accent text-md font-bold uppercase from-accent to-accent2 px-4 py-2 rounded-lg shadow-lg border-b-2 border-t border-black border-opacity-20 hover:opacity-90 transition-all duration-200 text-sm"
                  >
                    Connect Wallet
                  </button>
                ) : (
                  <div className="relative user-dropdown">
                    <button
                      onClick={() => setShowUserDropdown(!showUserDropdown)}
                      className="flex items-center w-36 gap-2 text-accent2 text-xs font-mono bg-panel/80 px-3 py-2 rounded hover:bg-panel/60 transition-all duration-200 border border-accent/20 hover:border-accent/40"
                    >
                      <span>
                        {userAddress.slice(0, 6)}...{userAddress.slice(-4)}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`transition-transform duration-200 ${
                          showUserDropdown ? "rotate-180" : ""
                        }`}
                      >
                        <polyline points="6,9 12,15 18,9" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {showUserDropdown && (
                      <div className="absolute right-0 mt-2 w-36 bg-card border border-primary/20 rounded-lg shadow-lg backdrop-blur-sm z-50">
                        <div className="py-1">
                          <div className="px-4 py-2 text-xs text-secondary border-b border-primary/10">
                            Connected Wallet
                          </div>
                          <button
                            onClick={() => {
                              disconnect();
                              setShowUserDropdown(false);
                            }}
                            className="w-full px-4 py-2 text-sm text-accent hover:bg-accent/10 transition-colors duration-200 flex items-center gap-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                              <polyline points="16,17 21,12 16,7" />
                              <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                            Disconnect
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <ThemeToggle />
            </div>
            <MobileNavigation
              userAddress={userAddress}
              connectArbitrum={connectArbitrum}
              disconnect={disconnect}
              isConnecting={isConnecting}
              showWalletButton={true}
              currentPage="/launch"
            />
          </div>
        </div>
      </nav>

      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-4 pt-8">
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-primary/30">
              <span className="text-xs sm:text-sm md:text-base font-medium text-secondary">
                DeFi Yield Platform
              </span>
              <span className="text-accent">🚀</span>
            </div>
            <h1 className="mb-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-0 gradient-text">
              Big Fi Protocol
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-secondary">
              The SuperApp DeFi Deserves
            </p>
          </div>

          {/* Token Status Cards */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-2">
            {!userAddress && (
              <div
                className="flex grid-cols-1 xl:hidden card gap-4 items-center border-error w-full md:w-[70%] text-error !py-4 px-3 mr-4 start-end h-[75%]"
                style={{ color: "red" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-error"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <div>
                  <p className="text-xs sm:text-sm md:text-base">
                    Please connect your wallet to interact with this vault
                  </p>
                </div>
              </div>
            )}
            {/* {statsLoading && (                                                //statsLoding blocked by MOMO
              <div className="col-span-full text-center text-secondary">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                <p className="mt-2">Loading token statistics...</p>
              </div>
            )} */}
            {/* {allTokenStats.map((stat, idx) => (
              <div key={stat.symbol} className="bg-panel/80 backdrop-blur-sm rounded-bigfi p-6 border border-primary transition-colors duration-300 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <img src={TOKENS[idx].avatar} alt={stat.symbol} className="w-8 h-8 rounded-full" />
                  <span className="text-xl font-bold gradient-text">{stat.symbol}</span>
                </div>
                <div className="text-sm text-secondary mb-1">Total Value Locked: <span className="text-lg font-bold text-primary">{stat.tvl} {stat.symbol}</span></div>


              </div>
            ))} */}
          </div>

          {/* Main Interface */}
          <div className="grid grid-cols-1 xl:grid-cols-3 xl:gap-6">
            {/* Token Selection */}
            <div className="mb-4 xl:col-span-1 xl:mb-0 backdrop-blur-md">
              <div className="bg-panel/80 backdrop-blur-sm rounded-bigfi !p-3 sm:!p-5 border border-primary transition-colors duration-300">
                <div className="space-y-4">
                  {TOKENS.map((token, index) => (
                    <AnimatedCard
                      key={token.symbol}
                      onClick={() => setSelectedToken(token)}
                      className={`!p-3 sm:!p-8 ${
                        token.symbol === "WBTC"
                          ? "card-btc"
                          : token.symbol === "ETH"
                          ? "card-eth"
                          : "card-usdc"
                      } `}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <TokenAvatar
                          symbol={token.symbol}
                          src={token.avatar}
                          size="md"
                        />
                        <div>
                          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-accent">
                            {token.symbol}
                          </div>
                        </div>
                        <div
                          className={`ml-auto rounded-full px-1 sm:px-2 h-8 sm:h-10 grid place-items-center relative overflow-hidden ${
                            token.symbol === "WBTC"
                              ? "btc-style"
                              : token.symbol === "ETH"
                              ? "eth-style"
                              : "usdc-style"
                          }`}
                        >
                          <span className="relative z-10 flex items-center text-xs sm:text-sm md:text-base">
                            {token.apy}% APY
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="hidden sm:block lucide lucide-sparkles sm:w-4 sm:h-4 md:w-5 md:h-5"
                            >
                              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                              <path d="M20 3v4" />
                              <path d="M22 5h-4" />
                              <path d="M4 17v2" />
                              <path d="M5 18H3" />
                            </svg>
                          </span>
                          <span
                            className={`glow-bar ${token.symbol.toLowerCase()}-glow`}
                          ></span>
                        </div>
                      </div>
                      <div className="w-full h-0.5 bg-neutral-700"></div>

                      <div className="mb-3">
                        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-accent2 h-[40px]">
                          <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-black dark:text-white">
                            {allTokenStats.find(
                              (stat) => stat.symbol === token.symbol
                            )?.tvl || "0"}{" "}
                            <span className="text-sm sm:text-base md:text-lg text-gray-500">
                              {token.symbol}
                            </span>
                          </span>
                        </div>
                        <p className="text-black dark:text-white text-sm sm:text-base md:text-lg">
                          Total Locked Value
                        </p>
                      </div>
                      <div className="w-full h-0.5 bg-neutral-700 mb-3"></div>
                      <div>
                        {/* <div
                          className="w-full bg-panel/60 rounded-full h-2 mt-5"
                          style={{ background: "#555771" }}
                        >
                          <div
                            className="gradient-bg h-2 rounded-full transition-all duration-500"
                            style={{
                              width: `${Math.min(token.apy * 4, 100)}%`,
                            }}
                          ></div>
                        </div> */}
                        <div>
                          <div className="flex justify-between">
                            <p className="text-gray-400">Staked:</p>
                            <p>
                              {userAddress ? (
                                <>
                                  {token.symbol === "USDC"
                                    ? parseFloat(
                                        stakingData.usdcStaked
                                      ).toFixed(2)
                                    : token.symbol === "ETH"
                                    ? parseFloat(stakingData.ethStaked).toFixed(
                                        4
                                      )
                                    : parseFloat(
                                        stakingData.wbtcStaked
                                      ).toFixed(6)}{" "}
                                  {token.symbol}
                                </>
                              ) : (
                                "---"
                              )}
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-gray-400">Reward:</p>
                            <p>
                              {userAddress ? (
                                <>
                                  {token.symbol === "USDC"
                                    ? parseFloat(
                                        stakingData.usdcReward
                                      ).toFixed(2)
                                    : token.symbol === "ETH"
                                    ? parseFloat(stakingData.ethReward).toFixed(
                                        4
                                      )
                                    : parseFloat(
                                        stakingData.wbtcReward
                                      ).toFixed(6)}{" "}
                                  {token.symbol}
                                </>
                              ) : (
                                "---"
                              )}
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-gray-400">Balance:</p>
                            <p>
                              {userAddress ? (
                                <>
                                  {token.symbol === "USDC"
                                    ? parseFloat(
                                        stakingData.usdcBalance
                                      ).toFixed(2)
                                    : token.symbol === "ETH"
                                    ? parseFloat(
                                        stakingData.ethBalance
                                      ).toFixed(4)
                                    : parseFloat(
                                        stakingData.wbtcBalance
                                      ).toFixed(6)}{" "}
                                  {token.symbol}
                                </>
                              ) : (
                                "---"
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </AnimatedCard>
                  ))}
                </div>
              </div>
            </div>

            {/* Staking/Withdraw Interface */}
            <div
              className="lg:col-span-2 h-[780px] xl:h-full rounded-bigfi border border-primary"
              style={{ zIndex: "10" }}
            >
              <div className="h-full flex flex-col !px-3 sm:!px-5">
                {/* 2/9 height */}
                <div className="h-[10%]">
                  <div className="flex justify-between w-full mt-4">
                    {/* Left side: Token logo + name */}
                    <div className="flex gap-4 items-center ml-8">
                      <img
                        src={selectedToken.avatar}
                        alt={selectedToken.symbol}
                        className="w-12 h-12 rounded-full"
                      />
                      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                        {selectedToken.symbol}
                      </h1>
                    </div>
                    {!userAddress && (
                      <div
                        className="hidden xl:flex card flex gap-4 items-center border-error w-[60%] text-error !py-4 px-3 mr-4 start-end h-[75%]"
                        style={{ color: "red" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-error"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <div>
                          <p className="text-xs sm:text-sm md:text-base">
                            Please connect your wallet to interact with this
                            vault
                          </p>
                        </div>
                      </div>
                    )}
                    {/* Right side: Address button */}
                    {/* <div className="flex gap-3 mr-4">
                      <button className="relative overflow-hidden flex items-center gap-2 rounded-lg text-sm py-1.5 px-4 transition-button hover:dark:shadow-button-hover-dark hover:shadow-button-hover text-center border dark:border-opacity-10 bg-neutral-300 text-gray-700 dark:text-white bg-opacity-5 border-gray-700 border-opacity-10 hover:border-opacity-30 hover:bg-opacity-15">
                        <span className="underline underline-offset-2 text-gray-400">
                          0xE2Fc...6F94
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-gray-400"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </button>
                    </div> */}
                  </div>
                </div>

                {/* 3/9 height */}
                <div className="h-[37%]">
                  <div
                    className={`card flex flex-col h-[95%] !p-4 ${
                      selectedToken.symbol === "WBTC"
                        ? "card-btc-top"
                        : selectedToken.symbol === "ETH"
                        ? "card-eth-top"
                        : "card-usdc-top"
                    }`}
                  >
                    {/* Header Section */}
                    <div className="flex border-b border-gray-200 dark:border-opacity-10">
                      {/* Left Side */}
                      <div className="flex-1 flex flex-col items-center border-r border-gray-200 dark:border-opacity-10 !px-3 !py-3 sm:!px-3 sm:!py-5 sm:!px-6">
                        <div className="flex items-end gap-2">
                          <p className="font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                            {allTokenStats.find(
                              (stat) => stat.symbol === selectedToken.symbol
                            )?.tvl || "0"}{" "}
                          </p>
                          <p className="text-gray-500 text-sm sm:text-base md:text-lg">
                            {selectedToken.symbol}
                          </p>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 font-extralight text-xs sm:text-sm md:text-base">
                          Total Value Locked
                        </p>
                      </div>

                      {/* Right Side */}
                      <div
                        className={`!px-3 !py-3 sm:!px-6 sm:!py-5 flex flex-col items-center ${
                          selectedToken.symbol === "WBTC"
                            ? "btc-style"
                            : selectedToken.symbol === "ETH"
                            ? "eth-style"
                            : "usdc-style"
                        }`}
                        style={{ background: "none" }}
                      >
                        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-sparkles inline-block sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
                          >
                            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                            <path d="M20 3v4" />
                            <path d="M22 5h-4" />
                            <path d="M4 17v2" />
                            <path d="M5 18H3" />
                          </svg>
                          20%
                        </p>
                        <p className="font-extralight text-xs sm:text-sm md:text-base">
                          Estimated Yield
                        </p>
                      </div>
                    </div>
                    <div className="w-full h-0.5 bg-neutral-700 mb-3"></div>

                    {/* Info Section */}
                    <div className="px-6 py-5">
                      <div>
                        <div className="flex justify-between">
                          <p
                            className="text-sm sm:text-base md:text-xl lg:text-2xl"
                            style={{ color: "var(--color-text-secondary)" }}
                          >
                            Staked:
                          </p>
                          <p className="text-sm sm:text-base md:text-xl lg:text-2xl">
                            {userAddress ? (
                              <>
                                {selectedToken.symbol === "USDC"
                                  ? parseFloat(stakingData.usdcStaked).toFixed(
                                      2
                                    )
                                  : selectedToken.symbol === "ETH"
                                  ? parseFloat(stakingData.ethStaked).toFixed(4)
                                  : parseFloat(stakingData.wbtcStaked).toFixed(
                                      6
                                    )}{" "}
                                {selectedToken.symbol}
                              </>
                            ) : (
                              "---"
                            )}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p
                            className="text-sm sm:text-base md:text-xl lg:text-2xl"
                            style={{ color: "var(--color-text-secondary)" }}
                          >
                            Reward:
                          </p>
                          <p className="text-sm sm:text-base md:text-xl lg:text-2xl">
                            {userAddress ? (
                              <>
                                {selectedToken.symbol === "USDC"
                                  ? parseFloat(stakingData.usdcReward).toFixed(
                                      2
                                    )
                                  : selectedToken.symbol === "ETH"
                                  ? parseFloat(stakingData.ethReward).toFixed(4)
                                  : parseFloat(stakingData.wbtcReward).toFixed(
                                      6
                                    )}{" "}
                                {selectedToken.symbol}
                              </>
                            ) : (
                              "---"
                            )}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p
                            className="text-sm sm:text-base md:text-xl lg:text-2xl"
                            style={{ color: "var(--color-text-secondary)" }}
                          >
                            Balance:
                          </p>
                          <p className="text-sm sm:text-base md:text-xl lg:text-2xl">
                            {userAddress ? (
                              <>
                                {selectedToken.symbol === "USDC"
                                  ? parseFloat(stakingData.usdcBalance).toFixed(
                                      2
                                    )
                                  : selectedToken.symbol === "ETH"
                                  ? parseFloat(stakingData.ethBalance).toFixed(
                                      4
                                    )
                                  : parseFloat(stakingData.wbtcBalance).toFixed(
                                      6
                                    )}{" "}
                                {selectedToken.symbol}
                              </>
                            ) : (
                              "---"
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {/* <div className="w-full rounded-lg bg-gray-400 dark:bg-neutral-800 bg-opacity-25 h-1.5 mt-1 overflow-hidden">
                        <div
                          className="h-full"
                          style={{
                            width: "93.8603%",
                            backgroundColor:
                              selectedToken.symbol === "WBTC"
                                ? "rgb(247, 148, 19)"
                                : selectedToken.symbol === "ETH"
                                ? "rgb(98, 126, 234)"
                                : "rgb(0, 173, 230)",
                            opacity: 0.7,
                          }}
                        ></div>
                      </div> */}
                    </div>
                  </div>
                </div>

                {/* 4/9 height */}
                <div className="h-[50%]">
                  <div
                    className={`card h-full w-full !p-0 mb-auto overflow-visible ${
                      selectedToken.symbol === "WBTC"
                        ? "card-btc"
                        : selectedToken.symbol === "ETH"
                        ? "card-eth"
                        : "card-usdc"
                    }`}
                  >
                    {/* Tabs */}
                    <div className="h-full flex flex-col">
                      <div className="flex divide-x divide-gray-200 dark:divide-opacity-10 cursor-pointer rounded-t-2xl overflow-hidden">
                        <div
                          className={`flex-1 p-4 flex items-center justify-center body2 ${
                            tab === "stake"
                              ? "bg-gradient-to-r from-primary/10 to-accent/10"
                              : "bg-background-dark"
                          }`}
                        >
                          <button
                            className={`flex-1 py-3 text-sm sm:text-base md:text-xl lg:text-2xl font-semibold transition-all duration-200 focus:outline-none focus:ring-0 border-none ${
                              selectedToken.symbol === "WBTC" && tab === "stake"
                                ? "btc-color"
                                : selectedToken.symbol === "ETH" &&
                                  tab === "stake"
                                ? "eth-color"
                                : selectedToken.symbol === "USDC" &&
                                  tab === "stake"
                                ? "usdc-color"
                                : "text-primary"
                            } ${
                              tab === "stake"
                                ? "bg-gradient-to-r from-primary/10 to-accent/10"
                                : "text-primary"
                            }`}
                            onClick={() => {
                              setTab("stake");
                              setTxStatus(null);
                            }}
                          >
                            Stake
                          </button>
                        </div>
                        <div
                          className={`flex-1 p-4 flex items-center justify-center body2 ${
                            tab === "withdraw"
                              ? "bg-gradient-to-r from-primary/10 to-accent/10"
                              : "bg-background-dark"
                          }`}
                        >
                          <button
                            className={`flex-1 py-3 text-sm sm:text-base md:text-xl lg:text-2xl font-semibold transition-all duration-200 focus:outline-none focus:ring-0 border-none ${
                              selectedToken.symbol === "WBTC" &&
                              tab === "withdraw"
                                ? "btc-color"
                                : selectedToken.symbol === "ETH" &&
                                  tab === "withdraw"
                                ? "eth-color"
                                : selectedToken.symbol === "USDC" &&
                                  tab === "withdraw"
                                ? "usdc-color"
                                : "text-primary"
                            } ${
                              tab === "withdraw"
                                ? "bg-gradient-to-r from-primary/10 to-accent/10"
                                : "text-primary"
                            }`}
                            onClick={() => {
                              setTab("withdraw");
                              setTxStatus(null);
                            }}
                          >
                            Unstake
                          </button>
                        </div>
                      </div>
                      <div className="p-6 h-full flex flex-col">
                        {/* Form */}
                        {tab === "stake" ? (
                          <>
                            <div className="basis-1/4">
                              <div className="rounded-bigfi border border-primary transition-colors duration-300 flex items-center px-4 py-3 mb-4">
                                <input
                                  type="number"
                                  value={amount}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    // Prevent negative values
                                    if (
                                      value === "" ||
                                      parseFloat(value) >= 0
                                    ) {
                                      setAmount(value);
                                    }
                                  }}
                                  onKeyDown={(e) => {
                                    // Prevent negative sign and other unwanted characters
                                    if (
                                      e.key === "-" ||
                                      e.key === "e" ||
                                      e.key === "E"
                                    ) {
                                      e.preventDefault();
                                    }
                                  }}
                                  min="0"
                                  step="any"
                                  placeholder="0.00"
                                  className="no-spinner flex-1 bg-transparent outline-none text-xs sm:text-sm md:text-base lg:text-lg text-primary placeholder-secondary focus:outline-none focus:ring-0 focus:border-transparent min-w-0"
                                />
                                <button
                                  className="mx-1 sm:mx-2 text-accent font-bold text-xs sm:text-sm hover:opacity-80 px-1 sm:px-2 whitespace-nowrap"
                                  onClick={setMaxStake}
                                >
                                  MAX
                                </button>
                                <span className="flex items-center gap-1 text-secondary font-semibold min-w-0 flex-shrink-0">
                                  <img
                                    src={selectedToken.avatar}
                                    alt=""
                                    className="w-4 h-4 sm:w-6 sm:h-6 inline-block rounded-full mr-1 flex-shrink-0"
                                  />
                                  <span className="text-xs sm:text-sm truncate">
                                    {selectedToken.symbol}
                                  </span>
                                </span>
                              </div>
                            </div>
                            <div className="basis-2/4">
                              <br />
                              <div className="mb-1 text-secondary text-sm sm:text-base md:text-xl lg:text-2xl">
                                Available to stake:{" "}
                                <span className="text-primary font-medium">
                                  {getUserBalance()} {selectedToken.symbol}
                                </span>
                              </div>
                              <br />
                              <div className="mb-2 text-sm sm:text-base md:text-xl lg:text-2xl text-secondary">
                                The vault token for this strategy is{" "}
                                <span className="text-accent font-semibold cursor-pointer">
                                  {selectedToken.vaultToken}
                                </span>
                              </div>
                            </div>
                            <div className="basis-1/4">
                              <button
                                className={`button-default flex w-32 h-12 mx-auto justify-center items-center mt-4 border border-gray-600 bg-primary transition-colors duration-200 hover:bg-primary-dark text-accent text-xl font-semibold rounded-bigfi ${
                                  !userAddress ? "cursor-not-allowed" : ""
                                }`}
                                onClick={handleStake}
                                // disabled={!amount || Number(amount) <= 0 || !userAddress || !!txStatus || stakingLoading}
                              >
                                {txStatus
                                  ? txStatus
                                  : stakingLoading
                                  ? "Loading..."
                                  : "Stake"}
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="basis-1/4">
                              <div className="rounded-bigfi border border-primary transition-colors duration-300 flex items-center px-4 py-3 mb-4">
                                <input
                                  type="number"
                                  value={withdrawAmount}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    // Prevent negative values
                                    if (
                                      value === "" ||
                                      parseFloat(value) >= 0
                                    ) {
                                      setWithdrawAmount(value);
                                    }
                                  }}
                                  onKeyDown={(e) => {
                                    // Prevent negative sign and other unwanted characters
                                    if (
                                      e.key === "-" ||
                                      e.key === "e" ||
                                      e.key === "E"
                                    ) {
                                      e.preventDefault();
                                    }
                                  }}
                                  min="0"
                                  step="any"
                                  placeholder="0.00"
                                  className="no-spinner flex-1 bg-transparent outline-none text-xs sm:text-sm md:text-base lg:text-lg text-primary placeholder-secondary focus:outline-none focus:ring-0 focus:border-transparent min-w-0"
                                />
                                <button
                                  className="mx-1 sm:mx-2 text-accent font-bold text-xs sm:text-sm hover:opacity-80 px-1 sm:px-2 whitespace-nowrap"
                                  onClick={setMaxUnstake}
                                >
                                  MAX
                                </button>
                                <span className="flex items-center gap-1 text-secondary font-semibold min-w-0 flex-shrink-0">
                                  <img
                                    src={selectedToken.avatar}
                                    alt=""
                                    className="w-4 h-4 sm:w-6 sm:h-6 inline-block rounded-full mr-1 flex-shrink-0"
                                  />
                                  <span className="text-xs sm:text-sm truncate">
                                    {selectedToken.symbol}
                                  </span>
                                </span>
                              </div>
                            </div>
                            <div className="basis-2/4">
                              <br />
                              <div className="mb-1 text-secondary text-sm sm:text-base md:text-xl lg:text-2xl">
                                Available to unstake:{" "}
                                <span className="text-primary font-medium">
                                  {getUserStakedAmount()} {selectedToken.symbol}
                                </span>
                              </div>
                              {/* <div className="mb-2 text-sm text-secondary">Rewards available: <span className="text-accent font-semibold">{getUserReward()} {selectedToken.symbol}</span></div> */}
                            </div>
                            <div className="basis-1/4">
                              <button
                                className={`button-default flex w-32 h-12 mx-auto justify-center items-center mt-4 border border-gray-600 bg-primary transition-colors duration-200 hover:bg-primary-dark text-accent text-xl font-semibold rounded-bigfi ${
                                  !userAddress ? "cursor-not-allowed" : ""
                                }`}
                                onClick={handleUnstake}
                                // disabled={!withdrawAmount || Number(withdrawAmount) <= 0 || !userAddress || !!txStatus || stakingLoading}
                              >
                                {txStatus
                                  ? txStatus
                                  : stakingLoading
                                  ? "Loading..."
                                  : "Unstake"}
                              </button>
                            </div>
                          </>
                        )}

                        {/* Error Display */}
                        {stakingError && (
                          <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-xs sm:text-sm md:text-base">
                            {stakingError}
                          </div>
                        )}
                      </div>
                      {/* Add your stake/unstake form content here */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Staking Info Section - Only show when user is connected */}
          {/* {userAddress && (
            <div className="mt-8">
              <StakingInfo stakingData={stakingData} loading={stakingLoading} />
            </div>
          )} */}
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />
    </div>
  );
}
