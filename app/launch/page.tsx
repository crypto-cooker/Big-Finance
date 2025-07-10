'use client'

import { useState } from 'react'
import Link from 'next/link'
import WalletConnectBtn from "../components/WalletConnect";

const TOKENS = [
  { 
    symbol: 'USDC', 
    name: 'USD Coin', 
    locked: 68367729.33, 
    apy: 20,
    avatar: '/images/usdc.png',
    description: 'This vault takes advantage of non-directional trades to earn high yield.',
    returnType: 'HIGH, variable',
    risks: 'Execution failure, smart contract risk, custody risk'
  },
  { 
    symbol: 'ETH', 
    name: 'Ethereum', 
    locked: 2823.1818, 
    apy: 15,
    avatar: '/images/eth.png',
    description: 'Advanced yield strategies leveraging DeFi protocols for optimal returns.',
    returnType: 'MEDIUM, variable',
    risks: 'Market volatility, smart contract risk, protocol risk'
  },
  { 
    symbol: 'BTC', 
    name: 'Bitcoin', 
    locked: 75.5618, 
    apy: 11,
    avatar: '/images/btc.png',
    description: 'Conservative yield farming with focus on capital preservation.',
    returnType: 'LOW, stable',
    risks: 'Market risk, smart contract risk, custody risk'
  },
]

export default function LaunchApp() {
  const [selectedToken, setSelectedToken] = useState(TOKENS[0])
  const [amount, setAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [tab, setTab] = useState<'stake' | 'withdraw'>('stake')

  // Example values for info rows (replace with real data as needed)
  const availableToDeposit = 0
  const availableToWithdraw = 0
  const vaultToken = 'xUSD'
  const capNote = 'The maximum amount you can deposit before reaching the cap.'
  const withdrawRate = 0.825 // 1 USDC ≈ 0.825 xUSD

  return (
    <div className="min-h-screen text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-bigfi-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center text-slate-900 font-bold text-xl">
                <img src="/logo.png" alt="" />
              </div>
              <a href='/' className="text-2xl font-bold bg-gradient-to-r from-bigfi-blue to-bigfi-teal bg-clip-text text-transparent cursor-pointer">
                BIG FI
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/how-it-works" className="text-bigfi-blue hover:text-bigfi-green transition-colors">
                How it works
              </Link>
              <Link href="/transparency" className="text-bigfi-blue hover:text-bigfi-green transition-colors">
                Transparency
              </Link>
              <WalletConnectBtn/>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 pt-8">
            <div className="inline-flex items-center gap-2 bg-bigfi-blue/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-bigfi-blue/30">
              <span className="text-sm font-medium text-bigfi-gray">DeFi Yield Platform</span>
              <span className="text-bigfi-accent">🚀</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-bigfi-blue via-bigfi-btn to-bigfi-teal bg-clip-text text-transparent">
              Big Fi Protocol
            </h1>
            <p className="text-xl text-bigfi-gray">The SuperApp DeFi Deserves</p>
          </div>

          {/* TVL Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-bigfi-panel/80 backdrop-blur-sm rounded-bigfi p-6 border border-bigfi-border hover:border-bigfi-blue/40 transition-all duration-300">
              <div className="text-sm text-bigfi-gray mb-2">Total Value Locked</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-bigfi-blue to-bigfi-teal bg-clip-text text-transparent">$83.97M</div>
            </div>
            <div className="bg-bigfi-panel/80 backdrop-blur-sm rounded-bigfi p-6 border border-bigfi-border hover:border-bigfi-blue/40 transition-all duration-300">
              <div className="text-sm text-bigfi-gray mb-2">Total Users</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-bigfi-blue to-bigfi-teal bg-clip-text text-transparent">1,247</div>
            </div>
            <div className="bg-bigfi-panel/80 backdrop-blur-sm rounded-bigfi p-6 border border-bigfi-border hover:border-bigfi-blue/40 transition-all duration-300">
              <div className="text-sm text-bigfi-gray mb-2">Total Rewards</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-bigfi-blue to-bigfi-teal bg-clip-text text-transparent">$2.1M</div>
            </div>
            <div className="bg-bigfi-panel/80 backdrop-blur-sm rounded-bigfi p-6 border border-bigfi-border hover:border-bigfi-blue/40 transition-all duration-300">
              <div className="text-sm text-bigfi-gray mb-2">Average APY</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-bigfi-blue to-bigfi-teal bg-clip-text text-transparent">13.0%</div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Token Selection */}
            <div className="lg:col-span-1">
              <div className="bg-bigfi-panel/80 backdrop-blur-sm rounded-bigfi p-6 border border-bigfi-border">
                <h2 className="text-xl font-bold mb-6 text-bigfi-blue">Select Vault</h2>
                <div className="space-y-4">
                  {TOKENS.map((token) => (
                    <button
                      key={token.symbol}
                      onClick={() => setSelectedToken(token)}
                      className={`w-full p-4 rounded-bigfi border transition-all duration-200 text-left hover:scale-105 ${
                        selectedToken.symbol === token.symbol
                          ? 'border-bigfi-teal bg-bigfi-teal/10 shadow-lg shadow-bigfi-teal/20'
                          : 'border-bigfi-blue/20 hover:border-bigfi-teal/40 bg-bigfi-panel/60'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <img 
                          src={token.avatar} 
                          alt={token.name}
                          className="w-8 h-8 rounded-full transition-transform duration-200 hover:scale-110"
                        />
                        <div>
                          <div className="font-bold text-bigfi-blue">{token.symbol}</div>
                          <div className="text-sm text-bigfi-teal">{token.name}</div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-bigfi-blue to-bigfi-teal bg-clip-text text-transparent">{token.apy}% APY*</div>
                      <div className="text-sm text-bigfi-teal">
                        Locked: {token.locked.toLocaleString()} {token.symbol}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Staking/Withdraw Interface */}
            <div className="lg:col-span-2">
              <div className="rounded-bigfi border border-bigfi-border bg-bigfi-panel/80 backdrop-blur-sm rounded-bigfi p-6 md:p-8 relative overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-bigfi-border mb-6">
                  <button
                    className={`flex-1 py-3 text-lg font-semibold transition-all duration-200 ${tab === 'stake' ? 'text-bigfi-blue border-b-2 border-bigfi-blue bg-gradient-to-r from-bigfi-blue/10 to-bigfi-teal/10' : 'text-bigfi-gray'}`}
                    onClick={() => setTab('stake')}
                  >
                    Deposit
                  </button>
                  <button
                    className={`flex-1 py-3 text-lg font-semibold transition-all duration-200 ${tab === 'withdraw' ? 'text-bigfi-blue border-b-2 border-bigfi-blue bg-gradient-to-r from-bigfi-blue/10 to-bigfi-teal/10' : 'text-bigfi-gray'}`}
                    onClick={() => setTab('withdraw')}
                  >
                    Withdraw
                  </button>
                </div>

                {/* Form */}
                {tab === 'stake' ? (
                  <>
                    <div className="mb-4 text-bigfi-gray font-medium">You will deposit:</div>
                    <div className="rounded-bigfi border border-bigfi-border flex items-center px-4 py-3 mb-4">
                      <input
                        type="number"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="flex-1 bg-transparent outline-none text-lg text-white placeholder-bigfi-gray"
                      />
                      <button className="mx-2 text-bigfi-accent font-bold text-sm">MAX</button>
                      <span className="flex items-center gap-1 text-bigfi-gray font-semibold">
                        <img src={selectedToken.avatar} alt="" className="w-6 h-6 inline-block rounded-full mr-1" />
                        {selectedToken.symbol}
                      </span>
                    </div>
                    <div className="mb-1 text-bigfi-gray text-sm">Available to deposit: <span className="text-white font-medium">{availableToDeposit} {selectedToken.symbol}</span></div>
                    <div className="mb-1 text-xs text-bigfi-gray">{capNote}</div>
                    <div className="mb-2 text-sm text-bigfi-gray">The vault token for this strategy is <span className="text-bigfi-accent font-semibold cursor-pointer">{vaultToken}</span></div>
                    <button className="w-full mt-4 bg-bigfi-btn hover:bg-bigfi-btn-dark text-white text-lg font-semibold py-3 rounded-bigfi transition-all duration-200 disabled:opacity-60" disabled>
                      Deposit
                    </button>
                  </>
                ) : (
                  <>
                    <div className="mb-4 text-bigfi-gray font-medium">You will initiate withdraw:</div>
                    <div className="rounded-bigfi border border-bigfi-border flex items-center px-4 py-3 mb-4">
                      <input
                        type="number"
                        value={withdrawAmount}
                        onChange={e => setWithdrawAmount(e.target.value)}
                        placeholder="0.00"
                        className="flex-1 bg-transparent outline-none text-lg text-white placeholder-bigfi-gray"
                      />
                      <button className="mx-2 text-bigfi-accent font-bold text-sm">MAX</button>
                      <span className="flex items-center gap-1 text-bigfi-gray font-semibold">
                        <img src={selectedToken.avatar} alt="" className="w-6 h-6 inline-block mr-1" />
                        {selectedToken.symbol}
                      </span>
                    </div>
                    <div className="mb-1 text-xs text-bigfi-gray">1 {selectedToken.symbol} ≈ {withdrawRate} {vaultToken}</div>
                    <div className="mb-1 text-bigfi-gray text-sm">Available balance: <span className="text-white font-medium">{availableToWithdraw}.{selectedToken.symbol}</span></div>
                    <div className="mb-2 text-sm text-bigfi-gray">The vault token for this strategy is <span className="text-bigfi-accent font-semibold cursor-pointer">{vaultToken}</span></div>
                    <button className="w-full mt-4 bg-bigfi-btn hover:bg-bigfi-btn-dark text-white text-lg font-semibold py-3 rounded-bigfi transition-all duration-200 disabled:opacity-60" disabled>
                      Queue Withdraw
                    </button>
                    <div className="mt-3 text-xs text-bigfi-gray">Once you queue the withdrawal, you will have to wait until approximately one day to complete it and get your funds.</div>
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