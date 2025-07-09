'use client'

import { useState } from 'react'
import Link from 'next/link'

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
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = () => {
    setIsConnecting(true)
    setTimeout(() => {
      setIsConnecting(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-900 to-cyan-900 rounded-xl flex items-center justify-center text-slate-900 font-bold text-xl">
                <img src="/logo.png" alt="" />
              </div>
              <a href='/' className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent cursor-pointer">
                Big FI
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/how-it-works" className="text-emerald-100 hover:text-emerald-300 transition-colors">
                How it works
              </Link>
              <Link href="/transparency" className="text-emerald-100 hover:text-emerald-300 transition-colors">
                Transparency
              </Link>
              <button 
                onClick={handleConnect}
                disabled={isConnecting}
                className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 px-6 py-2 rounded-lg font-semibold hover:from-emerald-300 hover:to-cyan-300 transition-all duration-200 shadow-lg disabled:opacity-50"
              >
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 pt-8">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-emerald-500/30">
              <span className="text-sm font-medium text-emerald-100">DeFi Yield Platform</span>
              <span className="text-emerald-400">🚀</span>
            </div>
            
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Big Fi Protocol
            </h1>
            <p className="text-xl text-emerald-100">The SuperApp DeFi Deserves</p>
          </div>

          {/* TVL Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300">
              <div className="text-sm text-emerald-300 mb-2">Total Value Locked</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">$83.97M</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300">
              <div className="text-sm text-emerald-300 mb-2">Total Users</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">1,247</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300">
              <div className="text-sm text-emerald-300 mb-2">Total Rewards</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">$2.1M</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300">
              <div className="text-sm text-emerald-300 mb-2">Average APY</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">13.0%</div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Token Selection */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20">
                <h2 className="text-xl font-bold mb-6 text-emerald-100">Select Vault</h2>
                <div className="space-y-4">
                  {TOKENS.map((token) => (
                    <button
                      key={token.symbol}
                      onClick={() => setSelectedToken(token)}
                      className={`w-full p-4 rounded-xl border transition-all duration-200 text-left hover:scale-105 ${
                        selectedToken.symbol === token.symbol
                          ? 'border-emerald-400/50 bg-emerald-500/10 shadow-lg shadow-emerald-500/20'
                          : 'border-emerald-500/20 hover:border-emerald-400/40 bg-slate-700/30'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <img 
                          src={token.avatar} 
                          alt={token.name}
                          className="w-8 h-8 rounded-full transition-transform duration-200 hover:scale-110"
                        />
                        <div>
                          <div className="font-bold text-emerald-100">{token.symbol}</div>
                          <div className="text-sm text-emerald-300">{token.name}</div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">{token.apy}% APY*</div>
                      <div className="text-sm text-emerald-300">
                        Locked: {token.locked.toLocaleString()} {token.symbol}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Staking Interface */}
            <div className="lg:col-span-2">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20">
                <div className="flex items-center gap-4 mb-8">
                  <img 
                    src={selectedToken.avatar} 
                    alt={selectedToken.name}
                    className="w-12 h-12 rounded-full"
                  />
                 
                  <div>
                    <h2 className="text-2xl font-bold text-emerald-100">{selectedToken.symbol} Vault</h2>
                    <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">{selectedToken.apy}% APY*</div>
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-emerald-200 mb-6">{selectedToken.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-slate-700/50 rounded-xl p-4 border border-emerald-500/20">
                      <div className="text-emerald-300 text-sm mb-2">Return</div>
                      <div className="font-semibold text-emerald-100">{selectedToken.returnType}</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-xl p-4 border border-emerald-500/20">
                      <div className="text-emerald-300 text-sm mb-2">Risks</div>
                      <div className="font-semibold text-emerald-100">{selectedToken.risks}</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-xl p-4 border border-emerald-500/20">
                      <div className="text-emerald-300 text-sm mb-2">Locked Value</div>
                      <div className="font-semibold text-emerald-100">{selectedToken.locked.toLocaleString()} {selectedToken.symbol}</div>
                    </div>
                  </div>
                </div>

                {/* Staking Form */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-emerald-200 mb-2">
                      Amount to Stake
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-slate-700/50 border border-emerald-500/30 rounded-xl px-4 py-3 text-emerald-100 placeholder-emerald-400/50 focus:outline-none focus:border-emerald-400/70 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-200"
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-emerald-300 font-semibold">
                        {selectedToken.symbol}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-1 bg-slate-700/50 border border-emerald-500/30 text-emerald-100 py-3 px-4 rounded-xl hover:bg-emerald-500/10 hover:border-emerald-400/50 transition-all duration-200 font-semibold">
                      Max
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 py-3 px-4 rounded-xl font-semibold hover:from-emerald-300 hover:to-cyan-300 transition-all duration-200 shadow-lg hover:scale-105">
                      Stake {selectedToken.symbol}
                    </button>
                  </div>

                  <div className="text-center text-sm text-emerald-300 bg-emerald-500/10 rounded-lg p-3 border border-emerald-500/20">
                    *APY rates are variable and subject to change based on market conditions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}