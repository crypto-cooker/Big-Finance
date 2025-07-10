import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Contract ABIs (simplified - you'll need the full ABIs)
const VAULT_ABI = [
  "function deposit(uint256 assets) external returns (uint256 shares)",
  "function withdraw(uint256 shares) external returns (uint256 assets)",
  "function balanceOf(address account) external view returns (uint256)",
  "function convertToAssets(uint256 shares) external view returns (uint256)",
  "function convertToShares(uint256 assets) external view returns (uint256)",
  "function totalAssets() external view returns (uint256)",
  "function asset() external view returns (address)",
  "function claimRewards() external",
  "function earned(address account) external view returns (uint256)",
  "event Deposit(address indexed user, uint256 assets, uint256 shares)",
  "event Withdraw(address indexed user, uint256 assets, uint256 shares)"
];

const ERC20_ABI = [
  "function balanceOf(address account) external view returns (uint256)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function transfer(address to, uint256 amount) external returns (bool)",
  "function decimals() external view returns (uint8)",
  "function symbol() external view returns (string)",
  "function name() external view returns (string)"
];

const BIG_TOKEN_ABI = [
  "function stake(uint256 amount) external",
  "function withdraw(uint256 amount) external",
  "function claimRewards() external",
  "function exit() external",
  "function stakedBalances(address account) external view returns (uint256)",
  "function earned(address account) external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)",
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)"
];

// Contract addresses (replace with your deployed addresses)
const CONTRACTS = {
  BIGToken: "0x...", // Your BIG token address
  USDCVault: "0x...", // Your USDC vault address
  ETHVault: "0x...", // Your ETH vault address
  BTCVault: "0x...", // Your BTC vault address
  USDC: "0xA0b86a33E6F86C5d5E4a9E8a0e3E6E8E8a0e3E6E", // USDC token address
  WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH token address
  WBTC: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"  // WBTC token address
};

export function useWeb3() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [network, setNetwork] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      setError(null);

      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const network = await provider.getNetwork();

      setProvider(provider);
      setSigner(signer);
      setAccount(accounts[0]);
      setNetwork(network);

      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          setAccount(null);
          setSigner(null);
        } else {
          setAccount(accounts[0]);
        }
      });

      // Listen for network changes
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    setNetwork(null);
  };

  useEffect(() => {
    // Check if already connected
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      provider.listAccounts().then(accounts => {
        if (accounts.length > 0) {
          connectWallet();
        }
      });
    }
  }, []);

  return {
    account,
    provider,
    signer,
    network,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
    isConnected: !!account
  };
}

export function useVault(vaultAddress, tokenSymbol) {
  const { signer, account } = useWeb3();
  const [loading, setLoading] = useState(false);
  const [vaultData, setVaultData] = useState({
    balance: '0',
    stakedBalance: '0',
    earned: '0',
    totalAssets: '0',
    sharePrice: '1',
    tokenBalance: '0',
    allowance: '0'
  });

  const getVaultContract = () => {
    if (!signer || !vaultAddress) return null;
    return new ethers.Contract(vaultAddress, VAULT_ABI, signer);
  };

  const getTokenContract = () => {
    if (!signer) return null;
    const tokenAddress = CONTRACTS[tokenSymbol === 'USDC' ? 'USDC' : 
                                   tokenSymbol === 'ETH' ? 'WETH' : 'WBTC'];
    return new ethers.Contract(tokenAddress, ERC20_ABI, signer);
  };

  const refreshData = async () => {
    if (!account || !signer) return;

    try {
      const vault = getVaultContract();
      const token = getTokenContract();
      
      if (!vault || !token) return;

      const [
        balance,
        stakedBalance,
        earned,
        totalAssets,
        tokenBalance,
        allowance
      ] = await Promise.all([
        vault.balanceOf(account),
        vault.balanceOf(account), // Vault shares
        vault.earned(account),
        vault.totalAssets(),
        token.balanceOf(account),
        token.allowance(account, vaultAddress)
      ]);

      // Calculate share price
      const totalSupply = await vault.totalSupply();
      const sharePrice = totalSupply.gt(0) 
        ? totalAssets.mul(ethers.utils.parseEther('1')).div(totalSupply)
        : ethers.utils.parseEther('1');

      setVaultData({
        balance: ethers.utils.formatEther(balance),
        stakedBalance: ethers.utils.formatEther(stakedBalance),
        earned: ethers.utils.formatEther(earned),
        totalAssets: ethers.utils.formatEther(totalAssets),
        sharePrice: ethers.utils.formatEther(sharePrice),
        tokenBalance: ethers.utils.formatEther(tokenBalance),
        allowance: ethers.utils.formatEther(allowance)
      });
    } catch (error) {
      console.error('Error fetching vault data:', error);
    }
  };

  const deposit = async (amount) => {
    if (!signer || !amount) return;

    try {
      setLoading(true);
      const vault = getVaultContract();
      const token = getTokenContract();
      
      if (!vault || !token) throw new Error('Contracts not available');

      const amountWei = ethers.utils.parseEther(amount.toString());
      
      // Check allowance
      const currentAllowance = await token.allowance(account, vaultAddress);
      if (currentAllowance.lt(amountWei)) {
        console.log('Approving token...');
        const approveTx = await token.approve(vaultAddress, ethers.constants.MaxUint256);
        await approveTx.wait();
      }

      // Deposit
      console.log('Depositing...');
      const depositTx = await vault.deposit(amountWei);
      await depositTx.wait();
      
      // Refresh data
      await refreshData();
      
      return depositTx;
    } catch (error) {
      console.error('Deposit error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const withdraw = async (shares) => {
    if (!signer || !shares) return;

    try {
      setLoading(true);
      const vault = getVaultContract();
      
      if (!vault) throw new Error('Vault contract not available');

      const sharesWei = ethers.utils.parseEther(shares.toString());
      
      console.log('Withdrawing...');
      const withdrawTx = await vault.withdraw(sharesWei);
      await withdrawTx.wait();
      
      // Refresh data
      await refreshData();
      
      return withdrawTx;
    } catch (error) {
      console.error('Withdraw error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const claimRewards = async () => {
    if (!signer) return;

    try {
      setLoading(true);
      const vault = getVaultContract();
      
      if (!vault) throw new Error('Vault contract not available');

      console.log('Claiming rewards...');
      const claimTx = await vault.claimRewards();
      await claimTx.wait();
      
      // Refresh data
      await refreshData();
      
      return claimTx;
    } catch (error) {
      console.error('Claim rewards error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (account && signer) {
      refreshData();
    }
  }, [account, signer, vaultAddress]);

  return {
    vaultData,
    loading,
    deposit,
    withdraw,
    claimRewards,
    refreshData
  };
}

export function useBigToken() {
  const { signer, account } = useWeb3();
  const [loading, setLoading] = useState(false);
  const [bigTokenData, setBigTokenData] = useState({
    balance: '0',
    stakedBalance: '0',
    earned: '0',
    allowance: '0'
  });

  const getBigTokenContract = () => {
    if (!signer) return null;
    return new ethers.Contract(CONTRACTS.BIGToken, BIG_TOKEN_ABI, signer);
  };

  const refreshData = async () => {
    if (!account || !signer) return;

    try {
      const bigToken = getBigTokenContract();
      if (!bigToken) return;

      const [
        balance,
        stakedBalance,
        earned,
        allowance
      ] = await Promise.all([
        bigToken.balanceOf(account),
        bigToken.stakedBalances(account),
        bigToken.earned(account),
        bigToken.allowance(account, CONTRACTS.BIGToken)
      ]);

      setBigTokenData({
        balance: ethers.utils.formatEther(balance),
        stakedBalance: ethers.utils.formatEther(stakedBalance),
        earned: ethers.utils.formatEther(earned),
        allowance: ethers.utils.formatEther(allowance)
      });
    } catch (error) {
      console.error('Error fetching BIG token data:', error);
    }
  };

  const stakeBigToken = async (amount) => {
    if (!signer || !amount) return;

    try {
      setLoading(true);
      const bigToken = getBigTokenContract();
      if (!bigToken) throw new Error('BIG Token contract not available');

      const amountWei = ethers.utils.parseEther(amount.toString());
      
      // Check allowance
      const currentAllowance = await bigToken.allowance(account, CONTRACTS.BIGToken);
      if (currentAllowance.lt(amountWei)) {
        console.log('Approving BIG token...');
        const approveTx = await bigToken.approve(CONTRACTS.BIGToken, ethers.constants.MaxUint256);
        await approveTx.wait();
      }

      // Stake
      console.log('Staking BIG tokens...');
      const stakeTx = await bigToken.stake(amountWei);
      await stakeTx.wait();
      
      await refreshData();
      return stakeTx;
    } catch (error) {
      console.error('Stake error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const withdrawBigToken = async (amount) => {
    if (!signer || !amount) return;

    try {
      setLoading(true);
      const bigToken = getBigTokenContract();
      if (!bigToken) throw new Error('BIG Token contract not available');

      const amountWei = ethers.utils.parseEther(amount.toString());
      
      console.log('Withdrawing BIG tokens...');
      const withdrawTx = await bigToken.withdraw(amountWei);
      await withdrawTx.wait();
      
      await refreshData();
      return withdrawTx;
    } catch (error) {
      console.error('Withdraw BIG token error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const claimBigRewards = async () => {
    if (!signer) return;

    try {
      setLoading(true);
      const bigToken = getBigTokenContract();
      if (!bigToken) throw new Error('BIG Token contract not available');

      console.log('Claiming BIG token rewards...');
      const claimTx = await bigToken.claimRewards();
      await claimTx.wait();
      
      await refreshData();
      return claimTx;
    } catch (error) {
      console.error('Claim BIG rewards error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (account && signer) {
      refreshData();
    }
  }, [account, signer]);

  return {
    bigTokenData,
    loading,
    stakeBigToken,
    withdrawBigToken,
    claimBigRewards,
    refreshData
  };
}