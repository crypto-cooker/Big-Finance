'use client'

import { useState, useEffect } from 'react'
import ThemeToggle from '../components/ThemeToggle';
import { ethers } from 'ethers';
import { useSepoliaWallet } from "../hooks/useSepoliaWallet";

const CONTRACT_ADDRESSES = {
  STAKING: "0xE1c2Af96216B08679500E7F82c367F6C3979f222",
  USDC: "0xA77EDedba2ca1803f070840F9eC8E0E1AB6800Ce",
  WETH: "0x5B0DfB0854E019a7C80B038f2cdEB92CE76Ff2ed",
  WBTC: "0x744a75450fbD3E593DfDbAaB0074713DBc7ADf92"
};

// Fixed ABI - should match contract exactly
const SimpleMultiTokenStakingABI = [
  "function getUserInfo(address, address) view returns (uint256 amount, uint256 reward, uint256 unlockTime, uint256 timeRemaining, bool canWithdraw)",
  "function getTokenStats(address) view returns (uint256 tvl, uint256 userCount, uint256 totalRewards)", // Fixed to match contract
  "function getAllTokenStats() view returns (address[] tokens, uint256[] tvls, uint256[] userCounts, uint256[] totalRewards)", // Added this function
  "function deposit(address token, uint256 amount) external",
  "function withdraw(address token) external"
];

const ERC20_ABI = [
  "function approve(address spender, uint256 amount) public returns (bool)",
  "function allowance(address owner, address spender) public view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address owner) view returns (uint256)"
];

const TOKENS = [
  { symbol: 'USDC', name: 'USD Coin', avatar: '/images/usdc.png', address: CONTRACT_ADDRESSES.USDC, vaultToken: 'BIG USDC', apy: 20, description: 'This vault takes advantage of non-directional trades to earn high yield.', returnType: 'HIGH, variable', risks: 'Execution failure, smart contract risk, custody risk' },
  { symbol: 'ETH', name: 'Ethereum', avatar: '/images/eth.png', address: CONTRACT_ADDRESSES.WETH, vaultToken: 'BIG ETH', apy: 20, description: 'Advanced yield strategies leveraging DeFi protocols for optimal returns.', returnType: 'MEDIUM, variable', risks: 'Market volatility, smart contract risk, protocol risk' },
  { symbol: 'BTC', name: 'Bitcoin', avatar: '/images/btc.png', address: CONTRACT_ADDRESSES.WBTC, vaultToken: 'BIG BTC', apy: 20, description: 'Conservative yield farming with focus on capital preservation.', returnType: 'LOW, stable', risks: 'Market risk, smart contract risk, custody risk' },
];

export default function LaunchApp() {
  const [selectedToken, setSelectedToken] = useState(TOKENS[0])
  const [amount, setAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [tab, setTab] = useState<'stake' | 'withdraw'>('stake')
  const [userInfos, setUserInfos] = useState([
    { amount: 0, reward: 0, unlockTime: 0, canWithdraw: false },
    { amount: 0, reward: 0, unlockTime: 0, canWithdraw: false },
    { amount: 0, reward: 0, unlockTime: 0, canWithdraw: false },
  ]);
  const [txStatus, setTxStatus] = useState<string | null>(null);
  const [userTokenBalance, setUserTokenBalance] = useState<string>('0');
  const [allTokenStats, setAllTokenStats] = useState([
    { symbol: 'USDC', tvl: '0', userCount: 0, totalRewards: '0' },
    { symbol: 'ETH', tvl: '0', userCount: 0, totalRewards: '0' },
    { symbol: 'BTC', tvl: '0', userCount: 0, totalRewards: '0' },
  ]);
  const [statsLoading, setStatsLoading] = useState(false);

  const { address: userAddress, provider, signer, error, connectSepolia, disconnect, isClient } = useSepoliaWallet();

  // Use a public provider for Sepolia
  const publicProvider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_INFURA_KEY_URL);

  // Always use publicProvider for stats
  const staking = new ethers.Contract(CONTRACT_ADDRESSES.STAKING, SimpleMultiTokenStakingABI, publicProvider);

  // Improved stats fetching with better error handling
  async function fetchAllTokenStats() {
    if (!publicProvider) {
      console.log("No public provider available");
      return;
    }
    
    setStatsLoading(true);
    console.log("Fetching all token stats...");
    
    try {
      // Method 1: Try using getAllTokenStats if available
      try {
        const result = await staking.getAllTokenStats();
        console.log("getAllTokenStats result:", result);
        
        const stats = TOKENS.map((token, i) => ({
          symbol: token.symbol,
          tvl: ethers.formatUnits(result.tvls[i], token.symbol === 'USDC' ? 6 : token.symbol === 'BTC' ? 8 : 18),
          userCount: Number(result.userCounts[i]),
          totalRewards: ethers.formatUnits(result.totalRewards[i], token.symbol === 'USDC' ? 6 : token.symbol === 'BTC' ? 8 : 18),
        }));
        
        setAllTokenStats(stats);
        console.log("Successfully fetched stats using getAllTokenStats:", stats);
        setStatsLoading(false);
        return;
      } catch (getAllError) {
        console.log("getAllTokenStats not available, falling back to individual calls:", getAllError);
      }

      // Method 2: Fallback to individual calls
      const stats = await Promise.all(TOKENS.map(async (token, i) => {
        try {
          console.log(`Fetching stats for ${token.symbol} at address ${token.address}`);
          const s = await staking.getTokenStats(token.address);
          console.log(`Stats for ${token.symbol}:`, s);
          
          return {
            symbol: token.symbol,
            tvl: ethers.formatUnits(s[0], token.symbol === 'USDC' ? 6 : token.symbol === 'BTC' ? 8 : 18),
            userCount: Number(s[1]),
            totalRewards: ethers.formatUnits(s[2], token.symbol === 'USDC' ? 6 : token.symbol === 'BTC' ? 8 : 18),
          };
        } catch (tokenError) {
          console.error(`Error fetching stats for ${token.symbol}:`, tokenError);
          return { symbol: token.symbol, tvl: '0', userCount: 0, totalRewards: '0' };
        }
      }));
      
      setAllTokenStats(stats);
      console.log("Successfully fetched stats using individual calls:", stats);
      
    } catch (error) {
      console.error("Error fetching all token stats:", error);
      setAllTokenStats([
        { symbol: 'USDC', tvl: '0', userCount: 0, totalRewards: '0' },
        { symbol: 'ETH', tvl: '0', userCount: 0, totalRewards: '0' },
        { symbol: 'BTC', tvl: '0', userCount: 0, totalRewards: '0' },
      ]);
    } finally {
      setStatsLoading(false);
    }
  }

  // Refactored user info fetch
  async function fetchUserInfos() {
    if (!provider || !userAddress) return;
    const staking = new ethers.Contract(CONTRACT_ADDRESSES.STAKING, SimpleMultiTokenStakingABI, provider);
    try {
      const infos = await Promise.all(TOKENS.map(async (token, i) => {
        try {
          const info = await staking.getUserInfo(userAddress, token.address);
          return {
            amount: Number(ethers.formatUnits(info[0], token.symbol === 'USDC' ? 6 : token.symbol === 'BTC' ? 8 : 18)),
            reward: Number(ethers.formatUnits(info[1], token.symbol === 'USDC' ? 6 : token.symbol === 'BTC' ? 8 : 18)),
            unlockTime: Number(info[2]),
            canWithdraw: info[4]
          };
        } catch (e) {
          console.error(`Error fetching user info for ${token.symbol}:`, e);
          return { amount: 0, reward: 0, unlockTime: 0, canWithdraw: false };
        }
      }));
      setUserInfos(infos);
    } catch (e) {
      console.error("Error fetching user infos:", e);
      setUserInfos([
        { amount: 0, reward: 0, unlockTime: 0, canWithdraw: false },
        { amount: 0, reward: 0, unlockTime: 0, canWithdraw: false },
        { amount: 0, reward: 0, unlockTime: 0, canWithdraw: false },
      ]);
    }
  }

  // Fetch user's wallet balance for the selected token
  async function fetchUserTokenBalance() {
    if (!provider || !userAddress || !selectedToken?.address) {
      setUserTokenBalance('0');
      return;
    }
    try {
      const token = new ethers.Contract(selectedToken.address, ERC20_ABI, provider);
      const decimals = await token.decimals();
      const balance = await token.balanceOf(userAddress);
      setUserTokenBalance(ethers.formatUnits(balance, decimals));
    } catch (e) {
      console.error('Error fetching token balance:', e);
      setUserTokenBalance('0');
    }
  }

  // Updated: Periodically refresh token stats every 15 seconds
  useEffect(() => {
    console.log("Component mounted, fetching initial stats...");
    fetchAllTokenStats();
    const interval = setInterval(() => {
      console.log("Interval triggered, fetching stats...");
      fetchAllTokenStats();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchUserTokenBalance();
  }, [selectedToken, userAddress, provider]);

  useEffect(() => {
    fetchUserInfos();
  }, [userAddress, provider]);

  async function handleDeposit() {
    if (!signer || !userAddress) return;
    setTxStatus('Waiting for approval...');
    const staking = new ethers.Contract(CONTRACT_ADDRESSES.STAKING, SimpleMultiTokenStakingABI, signer);
    const token = new ethers.Contract(selectedToken.address, ERC20_ABI, signer);
    const gasPrice = ethers.parseUnits("5", "gwei");

    const decimals = await token.decimals();
    const parsedAmount = ethers.parseUnits(amount, decimals);
    
    try {
      const allowance = await token.allowance(userAddress, CONTRACT_ADDRESSES.STAKING);
      if (allowance < parsedAmount) {
        const approveTx = await token.approve(CONTRACT_ADDRESSES.STAKING, parsedAmount, { gasLimit: 300000, gasPrice });
        setTxStatus('Approving...');
        await approveTx.wait();
      }
      
      setTxStatus('Depositing...');
      const depositTx = await staking.deposit(selectedToken.address, parsedAmount, { gasLimit: 300000, gasPrice });
      await depositTx.wait();
      setTxStatus('Deposit successful!');
      
      // Refresh all data
      await fetchUserInfos();
      await fetchUserTokenBalance();
      await fetchAllTokenStats();
    } catch (e: any) {
      let msg = e?.message || e;
      if (e?.code === 4001 || msg.toLowerCase().includes('user rejected') || msg.toLowerCase().includes('user denied')) {
        msg = 'Transaction cancelled by user.';
      }
      setTxStatus('Deposit failed: ' + msg);
    }
  }

  async function handleWithdraw() {
    if (!signer || !userAddress) return;
    setTxStatus('Withdrawing...');
    const staking = new ethers.Contract(CONTRACT_ADDRESSES.STAKING, SimpleMultiTokenStakingABI, signer);
    const gasPrice = ethers.parseUnits("5", "gwei");
    
    try {
      const withdrawTx = await staking.withdraw(selectedToken.address, { gasLimit: 300000, gasPrice });
      await withdrawTx.wait();
      setTxStatus('Withdraw successful!');
      
      // Refresh all data
      await fetchUserInfos();
      await fetchUserTokenBalance();
      await fetchAllTokenStats();
    } catch (e: any) {
      let msg = e?.message || e;
      if (e?.code === 4001 || msg.toLowerCase().includes('user rejected') || msg.toLowerCase().includes('user denied')) {
        msg = 'Transaction cancelled by user.';
      }
      setTxStatus('Withdraw failed: ' + msg);
    }
  }

  const availableToDeposit = userTokenBalance;
  const availableToWithdraw = 0;
  const withdrawRate = 0.8;

  return (
    <div className="min-h-screen bg-primary text-primary transition-colors duration-500 relative overflow-hidden">
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
                  onClick={connectSepolia}
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
              <ThemeToggle />
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

          {/* Token Status Cards with loading indicator */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
                <div className="text-sm text-secondary mb-1 mt-2">Users: <span className="text-lg font-bold text-primary">{stat.userCount}</span></div>
                <div className="text-sm text-secondary mb-1 mt-2">Total Rewards: <span className="text-lg font-bold text-primary">{stat.totalRewards} {stat.symbol}</span></div>
              </div>
            ))}
          </div>

          {/* Debug info - remove in production */}
          <div className="mb-4 p-4 bg-panel/50 rounded-lg text-xs text-secondary">
            <p>Public Provider: {publicProvider ? 'Connected' : 'Not Connected'}</p>
            <p>Stats Loading: {statsLoading ? 'Yes' : 'No'}</p>
            <p>Last Updated: {new Date().toLocaleTimeString()}</p>
          </div>

          {/* Rest of your component remains the same... */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                      <div className="text-sm text-accent">
                        Staked: {userInfos[index].amount} {token.symbol}
                      </div>
                      {userAddress && (
                        <div className="text-xs text-secondary mt-2">
                          <div>Staked: {userInfos[index].amount} {token.symbol}</div>
                          <div>Reward: {userInfos[index].reward} {token.symbol}</div>
                          <div>Unlock: {userInfos[index].unlockTime && userInfos[index].amount > 0 ? new Date(userInfos[index].unlockTime * 1000).toLocaleString() : '---'} </div>
                          <div>Can Withdraw: {userInfos[index].amount > 0 ? (userInfos[index].canWithdraw ? 'Yes' : 'No') : 'No'}</div>
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
                    onClick={() => setTab('stake')}
                  >
                    Deposit
                  </button>
                  <button
                    className={`flex-1 py-3 text-lg font-semibold transition-all duration-200 ${tab === 'withdraw' ? 'text-primary border-b-2 border-primary bg-gradient-to-r from-primary/10 to-accent/10' : 'text-secondary'}`}
                    onClick={() => setTab('withdraw')}
                  >
                    Withdraw
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
                      <button className="mx-2 text-accent font-bold text-sm">MAX</button>
                      <span className="flex items-center gap-1 text-secondary font-semibold">
                        <img src={selectedToken.avatar} alt="" className="w-6 h-6 inline-block rounded-full mr-1" />
                        {selectedToken.symbol}
                      </span>
                    </div>
                    <div className="mb-1 text-secondary text-sm">Available to deposit: <span className="text-primary font-medium">{availableToDeposit} {selectedToken.symbol}</span></div>
                    <div className="mb-1 text-xs text-secondary">CA: <span className="text-primary font-medium">{selectedToken.address}</span></div>
                    <div className="mb-2 text-sm text-secondary">The vault token for this strategy is <span className="text-accent font-semibold cursor-pointer">{selectedToken.vaultToken}</span></div>
                    <button className="w-full mt-4 bg-primary transition-colors duration-200 hover:bg-primary-dark text-white text-lg font-semibold py-3 rounded-bigfi disabled:opacity-60"
                      onClick={handleDeposit}
                      disabled={!amount || Number(amount) <= 0 || !userAddress}
                    >
                      Deposit
                    </button>
                    {txStatus && <div className="mt-2 text-xs text-secondary">{txStatus}</div>}
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
                      <button className="mx-2 text-accent font-bold text-sm">MAX</button>
                      <span className="flex items-center gap-1 text-secondary font-semibold">
                        <img src={selectedToken.avatar} alt="" className="w-6 h-6 inline-block rounded-full mr-1" />
                        {selectedToken.symbol}
                      </span>
                    </div>
                    <div className="mb-1 text-xs text-secondary">1 {selectedToken.symbol} ≈ {withdrawRate} {selectedToken.vaultToken}</div>
                    <div className="mb-1 text-secondary text-sm">Available balance: <span className="text-primary font-medium">{availableToWithdraw}.{selectedToken.vaultToken}</span></div>
                    <div className="mb-2 text-sm text-secondary">CA: <span className="text-primary font-bold">{selectedToken.address}</span></div>
                    <button className="w-full mt-4 bg-primary transition-colors duration-200 hover:bg-primary-dark text-white text-lg font-semibold py-3 rounded-bigfi disabled:opacity-60"
                      onClick={handleWithdraw}
                      disabled={!userAddress}
                    >
                      Queue Withdraw
                    </button>
                    {txStatus && <div className="mt-2 text-xs text-secondary">{txStatus}</div>}
                    <div className="mt-3 text-xs text-secondary">Once you queue the withdrawal, you will have to wait until approximately one day to complete it and get your funds.</div>
                    <div className="mt-3 text-xs text-secondary">
                      Unlock Time: <span className="text-accent">{userInfos[TOKENS.findIndex(t => t.symbol === selectedToken.symbol)]?.unlockTime && userInfos[TOKENS.findIndex(t => t.symbol === selectedToken.symbol)]?.amount > 0 ? new Date(userInfos[TOKENS.findIndex(t => t.symbol === selectedToken.symbol)]?.unlockTime * 1000).toLocaleString() : '---'}</span>
                      &nbsp;|&nbsp; Can Withdraw: <span className="text-accent">{userInfos[TOKENS.findIndex(t => t.symbol === selectedToken.symbol)]?.amount > 0 ? (userInfos[TOKENS.findIndex(t => t.symbol === selectedToken.symbol)]?.canWithdraw ? 'Yes' : 'No') : 'No'}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}