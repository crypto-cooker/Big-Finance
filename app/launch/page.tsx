"use client";

import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ethers } from "ethers";
import { useArbitrumWallet } from "../hooks/useArbitrumWallet";
import { useStaking } from "../hooks/useStaking";
import BackgroundSelector from "../components/BackgroundSelector";
import { useTheme } from "../components/ThemeProvider";
import { ThemeToggle } from "../components/ThemeToggle";
import { ADDRESSES } from "../constants";
import stakingAbi from "../abis/staking.json";
import { AnimatedCard } from "../components/MicroInteractions";
import { TokenAvatar } from "../components/OptimizedImage";
import { LoadingLink } from "../components/LoadingLink";
import { MobileNavigation } from "../components/MobileNavigation";
import { ApyGlow } from "../components/ApyGlow";

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
    decimals: 6,
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    avatar: "/images/eth.png",
    address: ADDRESSES.WETH,
    vaultToken: "BIG ETH",
    apy: 20,
    decimals: 18,
  },
  {
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    avatar: "/images/btc.png",
    address: ADDRESSES.WBTC,
    vaultToken: "BIG WBTC",
    apy: 20,
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
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const { theme } = useTheme();

  const {
    address: userAddress,
    provider,
    signer,
    error,
    isConnecting,
    connectArbitrum,
    disconnect,
  } = useArbitrumWallet();

  const {
    stakingData,
    loading: stakingLoading,
    error: stakingError,
    stakeUSDC,
    stakeWBTC,
    stakeETH,
    unstakeUSDC,
    unstakeWBTC,
    unstakeETH,
  } = useStaking(provider, signer, userAddress);

  const publicProvider = new ethers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL || "https://arb1.arbitrum.io/rpc"
  );

  async function fetchAllTokenStats() {
    if (!publicProvider) return;

    try {
      const stakingContract = new ethers.Contract(
        ADDRESSES.STAKING,
        stakingAbi,
        publicProvider
      );
      
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
    }
  }

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

  async function handleStake() {
    if (!amount || Number(amount) <= 0) {
      toast.error("Please input amount");
      return;
    }

    if (!userAddress) {
      toast.error("Please connect wallet");
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

  async function handleUnstake() {
    if (!withdrawAmount || Number(withdrawAmount) <= 0) {
      toast.error("Please input amount");
      return;
    }

    if (!userAddress) {
      toast.error("Please connect wallet");
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

  const setMaxStake = () => setAmount(getUserBalance());
  const setMaxUnstake = () => setWithdrawAmount(getUserStakedAmount());

  useEffect(() => {
    fetchAllTokenStats();
    const interval = setInterval(fetchAllTokenStats, 30000);
    return () => clearInterval(interval);
  }, []);

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

  // Show toasts for wallet connection
  useEffect(() => {
    if (error) {
      toast.error("Please retry");
    }
  }, [error]);

  useEffect(() => {
    if (userAddress && !isConnecting) {
      toast.success("Wallet connected");
    }
  }, [userAddress, isConnecting]);

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
                className="text-primary transition-colors"
                variant="nav"
              >
                How it works
              </LoadingLink>
              <LoadingLink
                href="/transparency"
                className="text-primary transition-colors"
                variant="nav"
              >
                Transparency
              </LoadingLink>
              
              <div className="w-40 flex justify-center">
                {!userAddress ? (
                  <button
                    onClick={connectArbitrum}
                    className="text-accent text-md font-bold uppercase px-4 py-2 rounded-lg shadow-lg border-b-2 border-t border-black border-opacity-20 hover:opacity-90 transition-all duration-200 text-sm"
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
            <h1 className="pb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-0 gradient-text">
              Big Fi Protocol
            </h1>
          </div>
          {/* Main Interface */}
          <div className="grid grid-cols-1 xl:grid-cols-3 xl:gap-6">
            {/* Token Selection */}

              <div className="space-y-4 bg-panel/80 rounded-bigfi transition-colors duration-300 mb-4">
                {TOKENS.map((token, index) => (
                  <AnimatedCard
                    key={token.symbol}
                    onClick={() => setSelectedToken(token)}
                    className={`${
                      token.symbol === "WBTC"
                        ? "card-btc"
                        : token.symbol === "ETH"
                        ? "card-eth"
                        : "card-usdc"
                    } `}
                  >
                    <div className="flex items-center gap-2 mb-3 border-b border-primary pb-3">
                      <TokenAvatar
                        symbol={token.symbol}
                        src={token.avatar}
                        size="md"
                      />
                      <div className="text-md sm:text-xl md:text-2xl lg:text-3xl font-semibold text-primary">
                        {token.symbol}
                      </div>
                      <ApyGlow token={token} />
                    </div>
                    <div className="mb-3 border-b border-primary pb-3">
                      
                      <div className="sm:text-xl md:text-2xl lg:text-3xl font-semibold text-primary">
                        {allTokenStats.find(
                          (stat) => stat.symbol === token.symbol
                        )?.tvl || "0"}{" "}
                        <span className="text-sm sm:text-base md:text-lg text-secondary">
                          {token.symbol}
                        </span>
                      </div>
                      <div className="text-secondary text-sm sm:text-base md:text-lg">
                        Locked Value
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between">
                        <p className="text-secondary">Staked:</p>
                        <p className="text-primary">
                          {userAddress ? (
                            <>
                              {token.symbol === "USDC"
                                ? parseFloat(stakingData.usdcStaked).toFixed(2)
                                : token.symbol === "ETH"
                                ? parseFloat(stakingData.ethStaked).toFixed(4)
                                : parseFloat(stakingData.wbtcStaked).toFixed(6)}{" "}
                              {token.symbol}
                            </>
                          ) : (
                            "---"
                          )}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-secondary">Reward:</p>
                        <p className="text-primary">
                          {userAddress ? (
                            <>
                              {token.symbol === "USDC"
                                ? parseFloat(stakingData.usdcReward).toFixed(2)
                                : token.symbol === "ETH"
                                ? parseFloat(stakingData.ethReward).toFixed(4)
                                : parseFloat(stakingData.wbtcReward).toFixed(6)}{" "}
                              {token.symbol}
                            </>
                          ) : (
                            "---"
                          )}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-secondary">Balance:</p>
                        <p className="text-primary">
                          {userAddress ? (
                            <>
                              {token.symbol === "USDC"
                                ? parseFloat(stakingData.usdcBalance).toFixed(2)
                                : token.symbol === "ETH"
                                ? parseFloat(stakingData.ethBalance).toFixed(4)
                                : parseFloat(stakingData.wbtcBalance).toFixed(6)}{" "}
                              {token.symbol}
                            </>
                          ) : (
                            "---"
                          )}
                        </p>
                      </div>
                    </div>
                  </AnimatedCard>
                ))}
              </div>

            {/* Staking/Withdraw Interface */}
            <div className="lg:col-span-2 rounded-bigfi !p-5 border border-primary">
                {/* Header */}
                <div className="flex justify-between w-full mb-4">
                  <div className="flex gap-4 items-center">
                    <img
                      src={selectedToken.avatar}
                      alt={selectedToken.symbol}
                      className="w-8 h-8 rounded-full"
                    />
                    <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
                      {selectedToken.symbol}
                    </h1>
                  </div>
                </div>

                {/* Stats Section */}
                <div
                  className={`flex flex-col rounded-bigfi transition-colors duration-300 mb-4 ${
                    selectedToken.symbol === "WBTC"
                      ? "card-btc-top"
                      : selectedToken.symbol === "ETH"
                      ? "card-eth-top"
                      : "card-usdc-top"
                  }`}
                >
                  <div className="flex border-b border-primary">
                    <div className="flex-1 flex flex-col justify-center items-center border-r border-primary p-2">
                      <div className="flex items-end gap-2">
                        <p className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-primary">
                          {allTokenStats.find(
                            (stat) => stat.symbol === selectedToken.symbol
                          )?.tvl || "0"}{" "}
                        </p>
                        <p className="text-secondary text-sm sm:text-base md:text-lg">
                          {selectedToken.symbol}
                        </p>
                      </div>
                      <p className="text-secondary font-extralight text-xs sm:text-sm md:text-base">
                        Total Value Locked
                      </p>
                    </div>

                    <div
                      className={`p-4 flex flex-col items-center !bg-transparent ${
                        selectedToken.symbol === "WBTC"
                          ? "btc-style"
                          : selectedToken.symbol === "ETH"
                          ? "eth-style"
                          : "usdc-style"
                      }`}
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
                      <p className="font-extralight text-xs sm:text-sm md:text-base text-secondary">
                        Estimated Yield
                      </p>
                    </div>
                  </div>
                  
                  <div className="px-6 py-5">
                    <div>
                      <div className="flex justify-between">
                        <p className="md:text-sm lg:text-xl text-secondary">
                          Staked:
                        </p>
                        <p className="md:text-sm lg:text-xl text-primary">
                          {userAddress ? (
                            <>
                              {selectedToken.symbol === "USDC"
                                ? parseFloat(stakingData.usdcStaked).toFixed(2)
                                : selectedToken.symbol === "ETH"
                                ? parseFloat(stakingData.ethStaked).toFixed(4)
                                : parseFloat(stakingData.wbtcStaked).toFixed(6)}{" "}
                              {selectedToken.symbol}
                            </>
                          ) : (
                            "---"
                          )}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p className="md:text-sm lg:text-xl text-secondary">
                          Reward:
                        </p>
                        <p className="md:text-sm lg:text-xl text-primary">
                          {userAddress ? (
                            <>
                              {selectedToken.symbol === "USDC"
                                ? parseFloat(stakingData.usdcReward).toFixed(2)
                                : selectedToken.symbol === "ETH"
                                ? parseFloat(stakingData.ethReward).toFixed(4)
                                : parseFloat(stakingData.wbtcReward).toFixed(6)}{" "}
                              {selectedToken.symbol}
                            </>
                          ) : (
                            "---"
                          )}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p className="md:text-sm lg:text-xl text-secondary">
                          Balance:
                        </p>
                        <p className="md:text-sm lg:text-xl text-primary">
                          {userAddress ? (
                            <>
                              {selectedToken.symbol === "USDC"
                                ? parseFloat(stakingData.usdcBalance).toFixed(2)
                                : selectedToken.symbol === "ETH"
                                ? parseFloat(stakingData.ethBalance).toFixed(4)
                                : parseFloat(stakingData.wbtcBalance).toFixed(6)}{" "}
                              {selectedToken.symbol}
                            </>
                          ) : (
                            "---"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Section */}
                <div
                  className={`card !p-0 ${
                    selectedToken.symbol === "WBTC"
                      ? "card-btc"
                      : selectedToken.symbol === "ETH"
                      ? "card-eth"
                      : "card-usdc"
                  }`}
                >
                  <div className="h-full flex flex-col">
                    <div className="flex divide-primary/20 cursor-pointer rounded-t-2xl overflow-hidden">
                      <div
                        className={`flex-1 p-2 flex items-center justify-center ${
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
                        className={`flex-1 p-2 flex items-center justify-center body2 ${
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
                      {tab === "stake" ? (
                        <>
                          <div className="basis-1/4">
                            <div className="rounded-bigfi border border-primary transition-colors duration-300 flex items-center px-4 py-3 mb-4">
                              <input
                                type="number"
                                value={amount}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (value === "" || parseFloat(value) >= 0) {
                                    setAmount(value);
                                  }
                                }}
                                onKeyDown={(e) => {
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
                            <div className="mb-1 text-secondary text-sm sm:text-base md:text-sm lg:text-xl">
                              Available to stake:{" "}
                              <span className="text-primary font-semibold">
                                {getUserBalance()} {selectedToken.symbol}
                              </span>
                            </div>
                            <div className="mb-2 text-sm sm:text-base md:text-sm lg:text-xl text-secondary">
                              The vault token for this strategy is{" "}
                              <span className="text-accent font-semibold">
                                {selectedToken.vaultToken}
                              </span>
                            </div>
                          </div>
                          
                          <div className="basis-1/4">
                            <button
                              className={`button-default flex w-full  h-12 mx-auto justify-center items-center mt-4 border border-gray-600 bg-primary transition-colors duration-200 hover:bg-primary-dark text-accent text-xl font-semibold rounded-bigfi ${
                                !userAddress ? "cursor-not-allowed" : ""
                              }`}
                              onClick={handleStake}
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
                                  if (value === "" || parseFloat(value) >= 0) {
                                    setWithdrawAmount(value);
                                  }
                                }}
                                onKeyDown={(e) => {
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
                            <div className="mb-1 text-secondary text-sm sm:text-base md:text-sm lg:text-xl">
                              Available to unstake:{" "}
                              <span className="text-primary font-semibold">
                                {getUserStakedAmount()} {selectedToken.symbol}
                              </span>
                            </div>
                          </div>
                          
                          <div className="basis-1/4">
                            <button
                              className={`button-default flex w-full h-12 mx-auto justify-center items-center mt-4 border border-gray-600 bg-primary transition-colors duration-200 hover:bg-primary-dark text-accent text-xl font-semibold rounded-bigfi ${
                                !userAddress ? "cursor-not-allowed" : ""
                              }`}
                              onClick={handleUnstake}
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

                      {stakingError && (
                        <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-xs sm:text-sm md:text-base">
                          {stakingError}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>

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
