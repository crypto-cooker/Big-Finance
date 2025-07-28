import React from 'react';
import { StakingData } from '../hooks/useStaking';

interface StakingInfoProps {
  stakingData: StakingData;
  loading: boolean;
}

export default function StakingInfo({ stakingData, loading }: StakingInfoProps) {
  if (loading) {
    return (
      <div className="bg-panel/80 backdrop-blur-sm rounded-bigfi p-6 border border-primary transition-colors duration-300">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
          <p className="mt-2 text-secondary">Loading staking data...</p>
        </div>
      </div>
    );
  }

  const tokens = [
    { symbol: 'USDC', name: 'USD Coin', avatar: '/images/usdc.png', staked: stakingData.usdcStaked, reward: stakingData.usdcReward, balance: stakingData.usdcBalance },
    { symbol: 'ETH', name: 'Ethereum', avatar: '/images/eth.png', staked: stakingData.ethStaked, reward: stakingData.ethReward, balance: stakingData.ethBalance },
    { symbol: 'WBTC', name: 'Wrapped Bitcoin', avatar: '/images/btc.png', staked: stakingData.wbtcStaked, reward: stakingData.wbtcReward, balance: stakingData.wbtcBalance },
  ];

  return (
    <div className="bg-panel/80 backdrop-blur-sm rounded-bigfi p-6 border border-primary transition-colors duration-300">
      <h3 className="text-xl font-bold text-primary mb-4">Your Staking Overview</h3>
      <div className="space-y-4">
        {tokens.map((token) => (
          <div key={token.symbol} className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
            <div className="flex items-center gap-3">
              <img src={token.avatar} alt={token.name} className="w-8 h-8 rounded-full" />
              <div>
                <div className="font-semibold text-primary">{token.symbol}</div>
                <div className="text-sm text-secondary">{token.name}</div>
              </div>
            </div>
                          <div className="text-right">
                <div className="text-sm text-secondary">Staked: <span className="text-primary font-medium">{token.symbol === 'USDC' ? parseFloat(token.staked).toFixed(2) : token.symbol === 'ETH' ? parseFloat(token.staked).toFixed(4) : parseFloat(token.staked).toFixed(6)} {token.symbol}</span></div>
                <div className="text-sm text-secondary">Reward: <span className="text-accent font-medium">{token.symbol === 'USDC' ? parseFloat(token.reward).toFixed(2) : token.symbol === 'ETH' ? parseFloat(token.reward).toFixed(4) : parseFloat(token.reward).toFixed(6)} {token.symbol}</span></div>
                <div className="text-sm text-secondary">Balance: <span className="text-primary font-medium">{token.symbol === 'USDC' ? parseFloat(token.balance).toFixed(2) : token.symbol === 'ETH' ? parseFloat(token.balance).toFixed(4) : parseFloat(token.balance).toFixed(6)} {token.symbol}</span></div>
              </div>
          </div>
        ))}
      </div>
      
      {/* Total Summary */}
      <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
        <h4 className="text-lg font-semibold text-accent mb-2">Total Summary</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-secondary">Total Staked Value:</span>
            <div className="text-primary font-medium">
              {parseFloat(stakingData.usdcStaked).toFixed(2)} USDC + {parseFloat(stakingData.ethStaked).toFixed(4)} ETH + {parseFloat(stakingData.wbtcStaked).toFixed(6)} WBTC
            </div>
          </div>
          <div>
            <span className="text-secondary">Total Rewards:</span>
            <div className="text-accent font-medium">
              {parseFloat(stakingData.usdcReward).toFixed(2)} USDC + {parseFloat(stakingData.ethReward).toFixed(4)} ETH + {parseFloat(stakingData.wbtcReward).toFixed(6)} WBTC
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 