'use client'

import { useState, useEffect } from 'react'

import { ethers } from 'ethers';
import { useArbitrumWallet } from "../hooks/useArbitrumWallet";
import { useStaking } from "../hooks/useStaking";
import AnimatedBackground from '../components/AnimatedBackground';
import StakingInfo from '../components/StakingInfo';
import { ADDRESSES } from '../constants';
import stakingAbi from '../abis/staking.json';

type TokenStat = {
  symbol: string;
  tvl: string;
};

const TOKENS = [
  { 
    symbol: 'USDC', 
    name: 'USD Coin', 
    avatar: '/images/usdc.png', 
    address: ADDRESSES.USDC, 
    vaultToken: 'BIG USDC', 
    apy: 20, 
    description: 'This vault takes advantage of non-directional trades to earn high yield.', 
    returnType: 'HIGH, variable', 
    risks: 'Execution failure, smart contract risk, custody risk',
    decimals: 6
  },
  { 
    symbol: 'ETH', 
    name: 'Ethereum', 
    avatar: '/images/eth.png', 
    address: ADDRESSES.WETH, 
    vaultToken: 'BIG ETH', 
    apy: 20, 
    description: 'Advanced yield strategies leveraging DeFi protocols for optimal returns.', 
    returnType: 'MEDIUM, variable', 
    risks: 'Market volatility, smart contract risk, protocol risk',
    decimals: 18
  },
  { 
    symbol: 'WBTC', 
    name: 'Wrapped Bitcoin', 
    avatar: '/images/btc.png', 
    address: ADDRESSES.WBTC, 
    vaultToken: 'BIG WBTC', 
    apy: 20, 
    description: 'Conservative yield farming with focus on capital preservation.', 
    returnType: 'LOW, stable', 
    risks: 'Market risk, smart contract risk, custody risk',
    decimals: 8
  },
];

export default function LaunchApp() {
  const [selectedToken, setSelectedToken] = useState(TOKENS[0])
  const [amount, setAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [tab, setTab] = useState<'stake' | 'withdraw'>('stake')
  const [txStatus, setTxStatus] = useState<string | null>(null);
  const [allTokenStats, setAllTokenStats] = useState<TokenStat[]>([
    { symbol: 'USDC', tvl: '0' },
    { symbol: 'ETH', tvl: '0' },
    { symbol: 'WBTC', tvl: '0' },
  ]);
  const [statsLoading, setStatsLoading] = useState(false);

  const { address: userAddress, provider, signer, error, connectArbitrum, disconnect, isClient } = useArbitrumWallet();
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
    unstakeETH
  } = useStaking(provider, signer, userAddress);

  // Use a public provider for Arbitrum
  const publicProvider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL || 'https://arb1.arbitrum.io/rpc');

  // Fetch total staked amounts for stats
  async function fetchAllTokenStats() {
    if (!publicProvider) return;
    
    setStatsLoading(true);

    try {
      const stakingContract = new ethers.Contract(ADDRESSES.STAKING, stakingAbi, publicProvider);
      
      const [totalStakedUSDC, totalStakedETH, totalStakedWBTC] = await Promise.all([
        stakingContract.totalStakedUSDC(),
        stakingContract.totalStakedETH(),
        stakingContract.totalStakedWBTC()
      ]);

      setAllTokenStats([
        { 
          symbol: 'USDC', 
          tvl: ethers.formatUnits(totalStakedUSDC, 6)
        },
        { 
          symbol: 'ETH', 
          tvl: ethers.formatEther(totalStakedETH)
        },
        { 
          symbol: 'WBTC', 
          tvl: ethers.formatUnits(totalStakedWBTC, 8)
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
      case 'USDC':
        return stakingData.usdcStaked;
      case 'ETH':
        return stakingData.ethStaked;
      case 'WBTC':
        return stakingData.wbtcStaked;
      default:
        return '0';
    }
  };

  // Get user's reward for selected token
  const getUserReward = () => {
    switch (selectedToken.symbol) {
      case 'USDC':
        return stakingData.usdcReward;
      case 'ETH':
        return stakingData.ethReward;
      case 'WBTC':
        return stakingData.wbtcReward;
      default:
        return '0';
    }
  };

  // Get user's balance for selected token
  const getUserBalance = () => {
    switch (selectedToken.symbol) {
      case 'USDC':
        return stakingData.usdcBalance;
      case 'ETH':
        return stakingData.ethBalance;
      case 'WBTC':
        return stakingData.wbtcBalance;
      default:
        return '0';
    }
  };

  // Handle stake
  async function handleStake() {
    if (!amount || Number(amount) <= 0) return;
    
    setTxStatus('Processing...');
    
    try {
      switch (selectedToken.symbol) {
        case 'USDC':
          await stakeUSDC(amount);
          break;
        case 'ETH':
          await stakeETH(amount);
          break;
        case 'WBTC':
          await stakeWBTC(amount);
          break;
      }
      
      setTxStatus('Stake successful!');
      setAmount('');
      await fetchAllTokenStats();
    } catch (e: any) {
      let msg = e?.message || e;
      if (e?.code === 4001 || msg.toLowerCase().includes('user rejected') || msg.toLowerCase().includes('user denied')) {
        msg = 'Transaction cancelled by user.';
      }
      setTxStatus('Stake failed: ' + msg);
    }
    
    setTimeout(() => setTxStatus(null), 3000);
  }

  // Handle unstake
  async function handleUnstake() {
    if (!withdrawAmount || Number(withdrawAmount) <= 0) return;
    
    setTxStatus('Processing...');
    
    try {
      switch (selectedToken.symbol) {
        case 'USDC':
          await unstakeUSDC(withdrawAmount);
          break;
        case 'ETH':
          await unstakeETH(withdrawAmount);
          break;
        case 'WBTC':
          await unstakeWBTC(withdrawAmount);
          break;
      }
      
      setTxStatus('Unstake successful!');
      setWithdrawAmount('');
      await fetchAllTokenStats();
    } catch (e: any) {
      let msg = e?.message || e;
      if (e?.code === 4001 || msg.toLowerCase().includes('user rejected') || msg.toLowerCase().includes('user denied')) {
        msg = 'Transaction cancelled by user.';
      }
      setTxStatus('Unstake failed: ' + msg);
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
  }, []);

  return (
    <div className="min-h-screen bg-primary text-primary transition-colors duration-500 relative overflow-hidden">
      {/* <AnimatedBackground /> */}
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-primary transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center font-bold text-xl">
                <img src="/logo.png" alt="" />
              </div>
              <a href='/' className="text-2xl font-bold gradient-text cursor-pointer">
                BIG FI
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/how-it-works" className="text-accent hover:text-accent2 transition-colors">
                How it works
              </a>
              <a href="/transparency" className="text-accent hover:text-accent2 transition-colors">
                Transparency
              </a>
              {!userAddress ? (
                <button
                  onClick={connectArbitrum}
                  className="text-accent text-md font-bold uppercase bg-gradient-to-r from-accent to-accent2 px-4 py-2 rounded-lg shadow-lg border-b-2 border-t border-black border-opacity-20 hover:opacity-90 transition-all duration-200"
                >
                  Connect Wallet
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-accent2 text-xs font-mono bg-panel/80 px-2 py-1 rounded">
                    {userAddress.slice(0, 6)}...{userAddress.slice(-4)}
                  </span>
                  <button
                    onClick={disconnect}
                    className="text-xs text-accent bg-gradient-to-r from-accent to-accent2 px-2 py-1 rounded hover:opacity-80 transition-all"
                  >
                    Disconnect
                  </button>
                </div>
              )}
              {error && <span className="text-red-500 text-xs ml-2">{error}</span>}
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 pt-8">
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-primary/30">
              <span className="text-sm font-medium text-secondary">DeFi Yield Platform</span>
              <span className="text-accent">🚀</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 gradient-text">
              Big Fi Protocol
            </h1>
            <p className="text-xl text-secondary">The SuperApp DeFi Deserves</p>
          </div>

          {/* Token Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {statsLoading && (
              <div className="col-span-full text-center text-secondary">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                <p className="mt-2">Loading token statistics...</p>
              </div>
            )}
            {allTokenStats.map((stat, idx) => (
              <div key={stat.symbol} className="bg-panel/80 backdrop-blur-sm rounded-bigfi p-6 border border-primary transition-colors duration-300 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <img src={TOKENS[idx].avatar} alt={stat.symbol} className="w-8 h-8 rounded-full" />
                  <span className="text-xl font-bold gradient-text">{stat.symbol}</span>
                </div>
                <div className="text-sm text-secondary mb-1">Total Value Locked: <span className="text-lg font-bold text-primary">{stat.tvl} {stat.symbol}</span></div>


              </div>
            ))}
          </div>

          {/* Main Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Token Selection */}
            <div className="lg:col-span-1">
              <div className="bg-panel/80 backdrop-blur-sm rounded-bigfi p-8 border border-primary transition-colors duration-300">
                <div className="space-y-4">
                  {TOKENS.map((token, index) => (
                    <button
                      key={token.symbol}
                      onClick={() => setSelectedToken(token)}
                      className={`w-full p-4 rounded-bigfi border transition-all duration-200 text-left hover:scale-105 ${
                        selectedToken.symbol === token.symbol
                          ? 'border-accent bg-accent/10 shadow-lg shadow-accent/20'
                          : 'border-primary/20 hover:border-accent/40 bg-panel/60'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <img 
                          src={token.avatar} 
                          alt={token.name}
                          className="w-8 h-8 rounded-full transition-transform duration-200 hover:scale-110"
                        />
                        <div>
                          <div className="font-bold text-primary">{token.symbol}</div>
                          <div className="text-sm text-accent">{token.name}</div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold gradient-text">{token.apy}% APY*</div>
                      {userAddress && (
                        <div className="text-xs text-secondary mt-2">
                          <div>Staked: {token.symbol === 'USDC' ? parseFloat(stakingData.usdcStaked).toFixed(2) : token.symbol === 'ETH' ? parseFloat(stakingData.ethStaked).toFixed(4) : parseFloat(stakingData.wbtcStaked).toFixed(6)} {token.symbol}</div>
                          <div>Reward: {token.symbol === 'USDC' ? parseFloat(stakingData.usdcReward).toFixed(2) : token.symbol === 'ETH' ? parseFloat(stakingData.ethReward).toFixed(4) : parseFloat(stakingData.wbtcReward).toFixed(6)} {token.symbol}</div>
                          <div>Balance: {token.symbol === 'USDC' ? parseFloat(stakingData.usdcBalance).toFixed(2) : token.symbol === 'ETH' ? parseFloat(stakingData.ethBalance).toFixed(4) : parseFloat(stakingData.wbtcBalance).toFixed(6)} {token.symbol}</div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Staking/Withdraw Interface */}
            <div className="lg:col-span-2">
              <div className="rounded-bigfi border border-primary transition-colors duration-300 bg-panel/80 backdrop-blur-sm rounded-bigfi p-6 md:p-8 relative overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-primary transition-colors duration-300 mb-6">
                  <button
                    className={`flex-1 py-3 text-lg font-semibold transition-all duration-200 ${tab === 'stake' ? 'text-primary border-b-2 border-primary bg-gradient-to-r from-primary/10 to-accent/10' : 'text-secondary'}`}
                    onClick={() => { setTab('stake'); setTxStatus(null); }}
                  >
                    Stake
                  </button>
                  <button
                    className={`flex-1 py-3 text-lg font-semibold transition-all duration-200 ${tab === 'withdraw' ? 'text-primary border-b-2 border-primary bg-gradient-to-r from-primary/10 to-accent/10' : 'text-secondary'}`}
                    onClick={() => { setTab('withdraw'); setTxStatus(null); }}
                  >
                    Unstake
                  </button>
                </div>

                {/* Form */}
                {tab === 'stake' ? (
                  <>
                    <div className="rounded-bigfi border border-primary transition-colors duration-300 flex items-center px-4 py-3 mb-4">
                      <input
                        type="number"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="flex-1 bg-transparent outline-none text-lg text-primary placeholder-secondary"
                      />
                      <button 
                        className="mx-2 text-accent font-bold text-sm hover:opacity-80"
                        onClick={setMaxStake}
                      >
                        MAX
                      </button>
                      <span className="flex items-center gap-1 text-secondary font-semibold">
                        <img src={selectedToken.avatar} alt="" className="w-6 h-6 inline-block rounded-full mr-1" />
                        {selectedToken.symbol}
                      </span>
                    </div>
                    <div className="mb-1 text-secondary text-sm">Available to stake: <span className="text-primary font-medium">{getUserBalance()} {selectedToken.symbol}</span></div>
                    <div className="mb-2 text-sm text-secondary">The vault token for this strategy is <span className="text-accent font-semibold cursor-pointer">{selectedToken.vaultToken}</span></div>
                    <button 
                      className="flex w-1/4 mx-auto justify-center mt-4 bg-primary border border-gray-600 transition-colors duration-200 hover:bg-primary-dark text-accent text-lg font-semibold py-3 rounded-bigfi disabled:opacity-60"
                      onClick={handleStake}
                      disabled={!amount || Number(amount) <= 0 || !userAddress || !!txStatus || stakingLoading}
                    >
                      {txStatus ? txStatus : stakingLoading ? "Loading..." : "Stake"}
                    </button>
                  </>
                ) : (
                  <>
                    <div className="rounded-bigfi border border-primary transition-colors duration-300 flex items-center px-4 py-3 mb-4">
                      <input
                        type="number"
                        value={withdrawAmount}
                        onChange={e => setWithdrawAmount(e.target.value)}
                        placeholder="0.00"
                        className="flex-1 bg-transparent outline-none text-lg text-primary placeholder-secondary"
                      />
                      <button 
                        className="mx-2 text-accent font-bold text-sm hover:opacity-80"
                        onClick={setMaxUnstake}
                      >
                        MAX
                      </button>
                      <span className="flex items-center gap-1 text-secondary font-semibold">
                        <img src={selectedToken.avatar} alt="" className="w-6 h-6 inline-block rounded-full mr-1" />
                        {selectedToken.symbol}
                      </span>
                    </div>
                    <div className="mb-1 text-secondary text-sm">Available to unstake: <span className="text-primary font-medium">{getUserStakedAmount()} {selectedToken.symbol}</span></div>
                    {/* <div className="mb-2 text-sm text-secondary">Rewards available: <span className="text-accent font-semibold">{getUserReward()} {selectedToken.symbol}</span></div> */}
                    <button 
                      className="flex w-1/4 mx-auto justify-center mt-4 border border-gray-600 bg-primary transition-colors duration-200 hover:bg-primary-dark text-accent text-lg font-semibold py-3 rounded-bigfi disabled:opacity-60"
                      onClick={handleUnstake}
                      disabled={!withdrawAmount || Number(withdrawAmount) <= 0 || !userAddress || !!txStatus || stakingLoading}
                    >
                      {txStatus ? txStatus : stakingLoading ? "Loading..." : "Unstake"}
                    </button>
                  </>
                )}

                {/* Error Display */}
                {stakingError && (
                  <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                    {stakingError}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Staking Info Section - Only show when user is connected */}
          {userAddress && (
            <div className="mt-8">
              <StakingInfo stakingData={stakingData} loading={stakingLoading} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}