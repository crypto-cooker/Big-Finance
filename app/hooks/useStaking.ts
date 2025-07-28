import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { ADDRESSES } from '../constants';
import stakingAbi from '../abis/staking.json';
import erc20Abi from '../abis/erc20.json';

export interface StakingData {
  usdcStaked: string;
  wbtcStaked: string;
  ethStaked: string;
  usdcReward: string;
  wbtcReward: string;
  ethReward: string;
  usdcBalance: string;
  wbtcBalance: string;
  ethBalance: string;
  usdcAllowance: string;
  wbtcAllowance: string;
}

export function useStaking(provider: ethers.BrowserProvider | null, signer: ethers.JsonRpcSigner | null, address: string | null) {
  const [stakingData, setStakingData] = useState<StakingData>({
    usdcStaked: '0',
    wbtcStaked: '0',
    ethStaked: '0',
    usdcReward: '0',
    wbtcReward: '0',
    ethReward: '0',
    usdcBalance: '0',
    wbtcBalance: '0',
    ethBalance: '0',
    usdcAllowance: '0',
    wbtcAllowance: '0'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all staking data
  const fetchStakingData = async () => {
    if (!provider || !address) return;

    setLoading(true);
    setError(null);

    try {
      const stakingContract = new ethers.Contract(ADDRESSES.STAKING, stakingAbi, provider);
      const usdcContract = new ethers.Contract(ADDRESSES.USDC, erc20Abi, provider);
      const wbtcContract = new ethers.Contract(ADDRESSES.WBTC, erc20Abi, provider);

      // Get staked amounts
      const [usdcStaked, wbtcStaked, ethStaked] = await Promise.all([
        stakingContract.usdcStakedAmount(address),
        stakingContract.wbtcStakedAmount(address),
        stakingContract.ethStakedAmount(address)
      ]);

      // Get rewards
      const rewards = await stakingContract.getReward(address);
      const [usdcReward, wbtcReward, ethReward] = rewards;

      // Get token balances
      const [usdcBalance, wbtcBalance] = await Promise.all([
        usdcContract.balanceOf(address),
        wbtcContract.balanceOf(address)
      ]);

      // Get ETH balance
      const ethBalance = await provider.getBalance(address);

      // Get allowances
      const [usdcAllowance, wbtcAllowance] = await Promise.all([
        usdcContract.allowance(address, ADDRESSES.STAKING),
        wbtcContract.allowance(address, ADDRESSES.STAKING)
      ]);

      setStakingData({
        usdcStaked: ethers.formatUnits(usdcStaked, 6), // USDC has 6 decimals
        wbtcStaked: ethers.formatUnits(wbtcStaked, 8), // WBTC has 8 decimals
        ethStaked: ethers.formatEther(ethStaked),
        usdcReward: ethers.formatUnits(usdcReward, 6),
        wbtcReward: ethers.formatUnits(wbtcReward, 8),
        ethReward: ethers.formatEther(ethReward),
        usdcBalance: ethers.formatUnits(usdcBalance, 6),
        wbtcBalance: ethers.formatUnits(wbtcBalance, 8),
        ethBalance: ethers.formatEther(ethBalance),
        usdcAllowance: ethers.formatUnits(usdcAllowance, 6),
        wbtcAllowance: ethers.formatUnits(wbtcAllowance, 8)
      });
    } catch (err: any) {
      console.error('Error fetching staking data:', err);
      setError(err.message || 'Failed to fetch staking data');
    } finally {
      setLoading(false);
    }
  };

  // Stake USDC
  const stakeUSDC = async (amount: string) => {
    if (!signer || !address) throw new Error('Wallet not connected');

    const stakingContract = new ethers.Contract(ADDRESSES.STAKING, stakingAbi, signer);
    const usdcContract = new ethers.Contract(ADDRESSES.USDC, erc20Abi, signer);
    
    const parsedAmount = ethers.parseUnits(amount, 6);
    
    // Check allowance and approve max amount if needed
    const allowance = await usdcContract.allowance(address, ADDRESSES.STAKING);
    if (allowance < parsedAmount) {
      const maxAmount = ethers.MaxUint256;
      const approveTx = await usdcContract.approve(ADDRESSES.STAKING, maxAmount);
      await approveTx.wait();
    }
    
    // Stake
    const stakeTx = await stakingContract.stakeUSDC(parsedAmount);
    await stakeTx.wait();
    
    // Refresh data
    await fetchStakingData();
  };

  // Stake WBTC
  const stakeWBTC = async (amount: string) => {
    if (!signer || !address) throw new Error('Wallet not connected');

    const stakingContract = new ethers.Contract(ADDRESSES.STAKING, stakingAbi, signer);
    const wbtcContract = new ethers.Contract(ADDRESSES.WBTC, erc20Abi, signer);
    
    const parsedAmount = ethers.parseUnits(amount, 8);
    
    // Check allowance and approve max amount if needed
    const allowance = await wbtcContract.allowance(address, ADDRESSES.STAKING);
    if (allowance < parsedAmount) {
      const maxAmount = ethers.MaxUint256;
      const approveTx = await wbtcContract.approve(ADDRESSES.STAKING, maxAmount);
      await approveTx.wait();
    }
    
    // Stake
    const stakeTx = await stakingContract.stakeWBTC(parsedAmount);
    await stakeTx.wait();
    
    // Refresh data
    await fetchStakingData();
  };

  // Stake ETH
  const stakeETH = async (amount: string) => {
    if (!signer || !address) throw new Error('Wallet not connected');

    const stakingContract = new ethers.Contract(ADDRESSES.STAKING, stakingAbi, signer);
    const parsedAmount = ethers.parseEther(amount);
    
    // Stake ETH (payable function)
    const stakeTx = await stakingContract.stakeETH(parsedAmount, { value: parsedAmount });
    await stakeTx.wait();
    
    // Refresh data
    await fetchStakingData();
  };

  // Unstake USDC
  const unstakeUSDC = async (amount: string) => {
    if (!signer || !address) throw new Error('Wallet not connected');

    const stakingContract = new ethers.Contract(ADDRESSES.STAKING, stakingAbi, signer);
    const parsedAmount = ethers.parseUnits(amount, 6);
    
    const unstakeTx = await stakingContract.unstakeUSDC(parsedAmount);
    await unstakeTx.wait();
    
    // Refresh data
    await fetchStakingData();
  };

  // Unstake WBTC
  const unstakeWBTC = async (amount: string) => {
    if (!signer || !address) throw new Error('Wallet not connected');

    const stakingContract = new ethers.Contract(ADDRESSES.STAKING, stakingAbi, signer);
    const parsedAmount = ethers.parseUnits(amount, 8);
    
    const unstakeTx = await stakingContract.unstakeWBTC(parsedAmount);
    await unstakeTx.wait();
    
    // Refresh data
    await fetchStakingData();
  };

  // Unstake ETH
  const unstakeETH = async (amount: string) => {
    if (!signer || !address) throw new Error('Wallet not connected');

    const stakingContract = new ethers.Contract(ADDRESSES.STAKING, stakingAbi, signer);
    const parsedAmount = ethers.parseEther(amount);
    
    const unstakeTx = await stakingContract.unstakeETH(parsedAmount);
    await unstakeTx.wait();
    
    // Refresh data
    await fetchStakingData();
  };

  // Fetch data on mount and when dependencies change
  useEffect(() => {
    fetchStakingData();
  }, [provider, address]);

  return {
    stakingData,
    loading,
    error,
    fetchStakingData,
    stakeUSDC,
    stakeWBTC,
    stakeETH,
    unstakeUSDC,
    unstakeWBTC,
    unstakeETH
  };
} 