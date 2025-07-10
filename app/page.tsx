'use client'

import React, { useState } from 'react';
import Link from 'next/link';


const TOKENS = [
  { 
    symbol: 'USDC', 
    name: 'USD Coin', 
    locked: 68367729.33, 
    apy: 20,
    avatar: '/images/usdc.png',
    description: 'This vault takes advantage of non-directional trades to earn high yield. This strategy simultaneously goes long and short, allowing it to collect funding from the short while not being exposed to downside.',
    returnType: 'HIGH, variable',
    risks: 'Execution failure, smart contract risk, custody risk'
  },
  { 
    symbol: 'ETH', 
    name: 'Ethereum', 
    locked: 2823.1818, 
    apy: 15,
    avatar: '/images/eth.png',
    description: 'Advanced yield strategies leveraging DeFi protocols for optimal returns. This vault optimizes liquidity provision and lending across multiple protocols to maximize ETH yields.',
    returnType: 'MEDIUM, variable',
    risks: 'Market volatility, smart contract risk, protocol risk'
  },
  { 
    symbol: 'BTC', 
    name: 'Bitcoin', 
    locked: 75.5618, 
    apy: 11,
    avatar: '/images/btc.png',
    description: 'Conservative yield farming with focus on capital preservation. This strategy prioritizes security and stability while generating consistent returns through low-risk lending protocols.',
    returnType: 'LOW, stable',
    risks: 'Market risk, smart contract risk, custody risk'
  },
]

const PROBLEMS = [
  { title: 'Stalling DeFi Growth', icon: '📉' },
  { title: 'Siloed Engines', icon: '🔒' },
  { title: 'Inferior Products', icon: '❌' },
  { title: 'Lack of Adaptability', icon: '🔄' },
];

const SOLUTIONS = [
  { title: 'Blend TradFi and DeFi', icon: '🔗' },
  { title: 'Competitive TradFi', icon: '⚡' },
  { title: 'Spark Growth', icon: '🚀' },
  { title: 'Better Yields', icon: '📈' },
];

export default function Home() {
  const [selectedToken, setSelectedToken] = useState(TOKENS[0]); // Default to USDC

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
            <div className="hidden md:flex items-center space-x-8">
              <a href="/how-it-works" className="text-emerald-100 hover:text-emerald-300 transition-colors">
                How it works
              </a>
              <a href="/transparency" className="text-emerald-100 hover:text-emerald-300 transition-colors">
                Transparency
              </a>
              <Link href="/launch" className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 px-6 py-2 rounded-lg font-semibold hover:from-emerald-300 hover:to-cyan-300 transition-all duration-200 shadow-lg">
                Launch App
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-emerald-500/30">
              <span className="text-sm font-medium text-emerald-100">The Future of DeFi Yields</span>
              <span className="text-emerald-400">✨</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              Yield Made<br />
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Extraordinary
              </span>
            </h1>
            
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto mb-12 leading-relaxed">
              Experience the next generation of DeFi with institutional-grade strategies accessible to everyone.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/launch" className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg hover:from-emerald-300 hover:to-cyan-300 transition-all duration-200 shadow-lg">
                Launch App
              </Link>
              <Link href="/how-it-works" className="border border-emerald-400/50 text-emerald-100 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-emerald-500/10 transition-all duration-200">
                Learn More
              </Link>
            </div>
          </div>

          {/* TVL Section */}
          <div className="text-center mb-20">
            <h2 className="text-2xl font-semibold mb-4 text-emerald-100">Total Value Locked</h2>
            <div className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              $83.97M
            </div>
            <div className="text-emerald-300 text-sm">Securing the future of decentralized finance</div>
          </div>

          {/* Token Cards - Now Interactive */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {TOKENS.map((token, index) => (
              <div 
                key={token.symbol} 
                onClick={() => setSelectedToken(token)}
                className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 cursor-pointer ${
                  selectedToken.symbol === token.symbol 
                    ? 'border-emerald-400/60 bg-emerald-500/10 shadow-lg shadow-emerald-500/20 scale-105' 
                    : 'border-emerald-500/20 hover:border-emerald-400/40'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={token.avatar} 
                    alt={token.name}
                    className="w-8 h-8 rounded-full transition-transform duration-200 hover:scale-110"
                  />
                  <div>
                    <div className="text-xl font-bold text-emerald-100">{token.symbol}</div>
                    <div className="text-emerald-300 text-sm">{token.name}</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    {token.apy}% APY*
                  </div>
                  <div className="text-sm text-emerald-300">
                    Locked Value: {token.locked.toLocaleString()} {token.symbol}
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${Math.min(token.apy * 4, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-slate-900/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-emerald-100">Problem: DeFi Limitations</h2>
            <p className="text-xl text-emerald-200 max-w-3xl mx-auto">
              Traditional DeFi solutions face critical challenges that limit growth and accessibility for everyday users.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {PROBLEMS.map((problem, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto border border-red-500/30 group-hover:bg-red-500/30 transition-colors">
                  {problem.icon}
                </div>
                <div className="text-lg font-semibold text-red-300">- {problem.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-emerald-900/20 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-emerald-100">Solution: Big FI Innovation</h2>
            <p className="text-xl text-emerald-200 max-w-3xl mx-auto">
              Our platform delivers institutional-grade capital efficiency with user-friendly accessibility.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {SOLUTIONS.map((solution, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto border border-emerald-500/30 group-hover:bg-emerald-500/30 transition-colors">
                  {solution.icon}
                </div>
                <div className="text-lg font-semibold text-emerald-300">+ {solution.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-slate-900/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-emerald-100">Our Products</h2>
            <p className="text-xl text-emerald-200 max-w-3xl mx-auto">
              Revolutionary DeFi products designed for maximum capital efficiency and user experience.
            </p>
          </div>

          <div className="text-center mb-12">
            <Link href="/launch" className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg hover:from-emerald-300 hover:to-cyan-300 transition-all duration-200 shadow-lg">
              Start Earning
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {TOKENS.map((token, index) => (
              <div 
                key={index} 
                onClick={() => setSelectedToken(token)}
                className={`text-center bg-slate-800/50 rounded-2xl p-6 border transition-all duration-300 cursor-pointer ${
                  selectedToken.symbol === token.symbol 
                    ? 'border-emerald-400/60 bg-emerald-500/10 shadow-lg shadow-emerald-500/20 scale-105' 
                    : 'border-emerald-500/20 hover:border-emerald-400/40'
                }`}
              >
                <div className="flex justify-center mb-4">
                  <img 
                    src={token.avatar} 
                    alt={token.name}
                    className="w-8 h-8 rounded-full transition-transform duration-200 hover:scale-110"
                  />
                </div>
                <div className="text-2xl font-bold mb-2 text-emerald-100">{token.symbol}</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                  {token.apy}% APY*
                </div>
                <div className="text-sm text-emerald-300">
                  TVL: ${(token.locked * (token.symbol === 'USDC' ? 1 : token.symbol === 'ETH' ? 2000 : 45000)).toLocaleString()}
                </div>
                
              </div>
            ))}
          </div>

          {/* Dynamic Token Vault Info - Updates based on selected token */}
          <div className="bg-gradient-to-r from-slate-800/50 to-emerald-900/20 rounded-2xl p-8 border border-emerald-500/20">
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={selectedToken.avatar} 
                alt={selectedToken.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="text-2xl font-bold text-emerald-100">{selectedToken.symbol} Premium Vault</h3>
                <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  {selectedToken.apy}% APY*
                </div>
              </div>
            </div>
            <p className="text-emerald-200 mb-6">{selectedToken.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 rounded-xl p-4 hover:bg-slate-800/70 transition-colors">
                <div className="text-emerald-300 text-sm mb-2">Return Profile</div>
                <div className="font-semibold text-emerald-100">{selectedToken.returnType}</div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 hover:bg-slate-800/70 transition-colors">
                <div className="text-emerald-300 text-sm mb-2">Risk Assessment</div>
                <div className="font-semibold text-emerald-100">{selectedToken.risks}</div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 hover:bg-slate-800/70 transition-colors">
                <div className="text-emerald-300 text-sm mb-2">Total Locked</div>
                <div className="font-semibold text-emerald-100">{selectedToken.locked.toLocaleString()} {selectedToken.symbol}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Build Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-purple-900/20 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-emerald-100">Build the Future with Big FI</h2>
          <p className="text-xl text-emerald-200 max-w-3xl mx-auto mb-8">
            Join our ecosystem of innovative DeFi products that bridge traditional finance with decentralized opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 px-8 py-4 rounded-lg font-semibold hover:from-emerald-300 hover:to-cyan-300 transition-all duration-200 shadow-lg">
              Contact Us
            </button>
            <Link href="/launch" className="border border-emerald-400/50 text-emerald-100 px-8 py-4 rounded-lg font-semibold hover:bg-emerald-500/10 transition-all duration-200">
              Launch App
            </Link >
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex justify-between py-3 border-t border-emerald-500/20 bg-slate-900/80 px-[5%]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-900 to-cyan-900 rounded-xl flex items-center justify-center text-slate-900 font-bold text-xl">
            <img src="/logo.png" alt="" />
          </div>
          <a href='/' className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent cursor-pointer">
            Big FI
          </a>
        </div>
        <div className='flex text-center items-center gap-3'>
            <Link href="https://x.com">
              <img src="/images/x.png" alt="" />
            </Link>
            <Link href="https://telegram.org">
              <img src="/images/telegram.png" alt="" />
            </Link>
            <Link href="https://gitbook.com">
              <img src="/images/gitbook.svg" alt="" width={30}/>
            </Link>
        </div>
      </footer>
    </div>
  );
}