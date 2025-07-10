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
            <div className="hidden md:flex items-center space-x-8">
              <a href="/how-it-works" className="text-bigfi-blue hover:text-bigfi-teal transition-colors">
                How it works
              </a>
              <a href="/transparency" className="text-bigfi-blue hover:text-bigfi-teal transition-colors">
                Transparency
              </a>
              <Link href="/launch" className="bg-gradient-to-r from-bigfi-blue to-bigfi-teal text-white px-6 py-2 rounded-lg font-semibold hover:from-bigfi-blue/80 hover:to-bigfi-teal/80 transition-all duration-200 shadow-lg">
                Launch App
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className=" text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-bigfi-blue/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-bigfi-blue/30">
              <span className="text-sm font-medium text-bigfi-gray">The Future of DeFi Yields</span>
              <span className="text-bigfi-accent">✨</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              Yield Made<br />
              <span className="bg-gradient-to-r from-bigfi-blue via-bigfi-btn to-bigfi-teal bg-clip-text text-transparent">
                Extraordinary
              </span>
            </h1>
            
            <p className="text-xl text-bigfi-gray max-w-2xl mx-auto mb-12 leading-relaxed">
              Experience the next generation of DeFi with institutional-grade strategies accessible to everyone.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/launch" className="bg-gradient-to-r from-bigfi-blue to-bigfi-teal text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-bigfi-blue/80 hover:to-bigfi-teal/80 transition-all duration-200 shadow-lg">
                Launch App
              </Link>
              <Link href="/how-it-works" className="border border-bigfi-blue/50 text-bigfi-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-bigfi-blue/10 transition-all duration-200">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TVL Section */}
      <section className='pt-20 pb-20 relative overflow-hidden bg-gradient-to-r from-bigfi-panel/80 via-bigfi-blue/10 to-bigfi-panel/80'>
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className=" text-center mb-20">
            <h2 className="text-2xl font-semibold mb-4 text-bigfi-blue">Total Value Locked</h2>
            <div className="text-5xl font-bold bg-gradient-to-r from-bigfi-blue to-bigfi-teal bg-clip-text text-transparent mb-4">
              $83.97M
            </div>
            <div className="text-bigfi-gray text-sm">Securing the future of decentralized finance</div>
          </div>

          {/* Token Cards - Now Interactive */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
            {TOKENS.map((token, index) => (
              <div 
                key={token.symbol} 
                onClick={() => setSelectedToken(token)}
                className={`bg-bigfi-panel/80 backdrop-blur-sm rounded-bigfi p-6 border transition-all duration-300 hover:shadow-lg hover:shadow-bigfi-blue/20 cursor-pointer ${
                  selectedToken.symbol === token.symbol 
                    ? 'border-bigfi-teal bg-bigfi-teal/10 shadow-lg shadow-bigfi-teal/20 scale-105' 
                    : 'border-bigfi-blue/20 hover:border-bigfi-teal/40'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={token.avatar} 
                    alt={token.name}
                    className="w-8 h-8 rounded-full transition-transform duration-200 hover:scale-110"
                  />
                  <div>
                    <div className="text-xl font-bold text-bigfi-blue">{token.symbol}</div>
                    <div className="text-bigfi-teal text-sm">{token.name}</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="text-3xl font-bold bg-gradient-to-r from-bigfi-blue to-bigfi-teal bg-clip-text text-transparent">
                    {token.apy}% APY*
                  </div>
                  <div className="text-sm text-bigfi-teal">
                    Locked Value: {token.locked.toLocaleString()} {token.symbol}
                  </div>
                  <div className="w-full bg-bigfi-panel/60 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-bigfi-blue to-bigfi-teal h-2 rounded-full transition-all duration-500" 
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
      <section className="py-20">
        <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-bigfi-blue">Problem: DeFi Limitations</h2>
            <p className="text-xl text-bigfi-gray max-w-3xl mx-auto">
              Traditional DeFi solutions face critical challenges that limit growth and accessibility for everyday users.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {PROBLEMS.map((problem, index) => (
              <div key={index} className="bg-gradient-to-r from-bigfi-panel/80 to-bigfi-blue/10 rounded-lg p-6 border border-bigfi-border text-center group">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto border border-red-500/30 group-hover:bg-red-500/30 transition-colors">
                  {/* Unique abstract SVGs for each card */}
                  {index === 0 && (
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 30 Q20 10 30 30 T40 30" stroke="#1E90FF" strokeWidth="3" fill="none"/>
                      <circle cx="20" cy="20" r="10" fill="#00BFAE" fillOpacity="0.18"/>
                    </svg>
                  )}
                  {index === 1 && (
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <polygon points="10,30 20,10 30,30" fill="#1E90FF" fillOpacity="0.22"/>
                      <rect x="15" y="15" width="10" height="10" rx="3" fill="#00BFAE" fillOpacity="0.18"/>
                    </svg>
                  )}
                  {index === 2 && (
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <ellipse cx="20" cy="20" rx="14" ry="8" fill="#1E90FF" fillOpacity="0.16"/>
                      <path d="M10 25 Q20 35 30 25" stroke="#00BFAE" strokeWidth="2" fill="none"/>
                    </svg>
                  )}
                  {index === 3 && (
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="8" y="8" width="24" height="24" rx="8" fill="#00BFAE" fillOpacity="0.13"/>
                      <polygon points="20,12 28,28 12,28" fill="#1E90FF" fillOpacity="0.19"/>
                    </svg>
                  )}
                </div>
                <div className="text-lg font-semibold text-red-300">- {problem.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gradient-to-r from-bigfi-panel/80 via-bigfi-blue/10 to-bigfi-panel/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-bigfi-blue">Our Solution</h2>
            <p className="text-xl text-bigfi-gray max-w-3xl mx-auto">
              Big FI bridges the gap between TradFi and DeFi, offering better yields and more accessible products.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {SOLUTIONS.map((solution, index) => (
              <div key={index} className="bg-gradient-to-r from-bigfi-panel/80 to-bigfi-blue/10 p-6 border border-bigfi-border text-center rounded-lg group">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto border border-bigfi-blue/30 group-hover:bg-bigfi-blue/20 transition-colors">
                  {/* Unique abstract SVGs for each card */}
                  {index === 0 && (
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 20 Q20 5 30 20 T40 20" stroke="#00BFAE" strokeWidth="3" fill="none"/>
                      <ellipse cx="20" cy="25" rx="10" ry="6" fill="#1E90FF" fillOpacity="0.18"/>
                    </svg>
                  )}
                  {index === 1 && (
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <polygon points="20,8 32,32 8,32" fill="#00BFAE" fillOpacity="0.22"/>
                      <circle cx="20" cy="24" r="6" fill="#1E90FF" fillOpacity="0.15"/>
                    </svg>
                  )}
                  {index === 2 && (
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="12" y="12" width="16" height="16" rx="6" fill="#1E90FF" fillOpacity="0.13"/>
                      <path d="M16 28 Q20 20 24 28" stroke="#00BFAE" strokeWidth="2" fill="none"/>
                    </svg>
                  )}
                  {index === 3 && (
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <ellipse cx="20" cy="20" rx="14" ry="8" fill="#00BFAE" fillOpacity="0.16"/>
                      <polygon points="20,14 28,26 12,26" fill="#1E90FF" fillOpacity="0.19"/>
                    </svg>
                  )}
                </div>
                <div className="text-lg font-semibold text-bigfi-blue">+ {solution.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-bigfi-panel/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-bigfi-blue">Our Products</h2>
            <p className="text-xl text-bigfi-gray max-w-3xl mx-auto">
              Revolutionary DeFi products designed for maximum capital efficiency and user experience.
            </p>
          </div>

          <div className="text-center mb-12">
            <Link href="/launch" className="bg-gradient-to-r from-bigfi-blue to-bigfi-teal text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-bigfi-blue/80 hover:to-bigfi-teal/80 transition-all duration-200 shadow-lg">
              Start Earning
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {TOKENS.map((token, index) => (
              <div 
                key={index} 
                onClick={() => setSelectedToken(token)}
                className={`text-center bg-bigfi-panel/80 rounded-bigfi p-6 border transition-all duration-300 cursor-pointer ${
                  selectedToken.symbol === token.symbol 
                    ? 'border-bigfi-teal bg-bigfi-teal/10 shadow-lg shadow-bigfi-teal/20 scale-105' 
                    : 'border-bigfi-blue/20 hover:border-bigfi-teal/40'
                }`}
              >
                <div className="flex justify-center mb-4">
                  <img 
                    src={token.avatar} 
                    alt={token.name}
                    className="w-8 h-8 rounded-full transition-transform duration-200 hover:scale-110"
                  />
                </div>
                <div className="text-2xl font-bold mb-2 text-bigfi-blue">{token.symbol}</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-bigfi-blue to-bigfi-teal bg-clip-text text-transparent mb-4">
                  {token.apy}% APY*
                </div>
                <div className="text-sm text-bigfi-teal">
                  TVL: ${(token.locked * (token.symbol === 'USDC' ? 1 : token.symbol === 'ETH' ? 2000 : 45000)).toLocaleString()}
                </div>
                
              </div>
            ))}
          </div>

          {/* Dynamic Token Vault Info - Updates based on selected token */}
          <div className="bg-gradient-to-r from-bigfi-panel/80 to-bigfi-blue/10 rounded-bigfi p-8 border border-bigfi-blue/20">
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={selectedToken.avatar} 
                alt={selectedToken.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="text-2xl font-bold text-bigfi-blue">{selectedToken.symbol} Premium Vault</h3>
                <div className="text-2xl font-bold bg-gradient-to-r from-bigfi-blue to-bigfi-teal bg-clip-text text-transparent">
                  {selectedToken.apy}% APY*
                </div>
              </div>
            </div>
            <p className="text-bigfi-gray mb-6">{selectedToken.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-bigfi-panel/80 rounded-bigfi p-4 hover:bg-bigfi-panel/90 transition-colors">
                <div className="text-bigfi-teal text-sm mb-2">Return Profile</div>
                <div className="font-semibold text-bigfi-blue">{selectedToken.returnType}</div>
              </div>
              <div className="bg-bigfi-panel/80 rounded-bigfi p-4 hover:bg-bigfi-panel/90 transition-colors">
                <div className="text-bigfi-teal text-sm mb-2">Risk Assessment</div>
                <div className="font-semibold text-bigfi-blue">{selectedToken.risks}</div>
              </div>
              <div className="bg-bigfi-panel/80 rounded-bigfi p-4 hover:bg-bigfi-panel/90 transition-colors">
                <div className="text-bigfi-teal text-sm mb-2">Total Locked</div>
                <div className="font-semibold text-bigfi-blue">{selectedToken.locked.toLocaleString()} {selectedToken.symbol}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Build Section */}
      <section className="py-20 bg-gradient-to-r from-bigfi-panel/80 via-bigfi-blue/10 to-bigfi-panel/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-bigfi-blue">Build the Future with Big FI</h2>
          <p className="text-xl text-bigfi-gray max-w-3xl mx-auto mb-8">
            Join our ecosystem of innovative DeFi products that bridge traditional finance with decentralized opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-bigfi-blue to-bigfi-teal text-white px-8 py-4 rounded-lg font-semibold hover:from-bigfi-blue/80 hover:to-bigfi-teal/80 transition-all duration-200 shadow-lg">
              Contact Us
            </button>
            <Link href="/launch" className="border border-bigfi-blue/50 text-bigfi-blue px-8 py-4 rounded-lg font-semibold hover:bg-bigfi-blue/10 transition-all duration-200">
              Launch App
            </Link >
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex justify-between py-3 border-t border-bigfi-blue/20 bg-slate-900/80 px-[5%]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center text-slate-900 font-bold text-xl">
            <img src="/logo.png" alt="" />
          </div>
          <a href='/' className="text-2xl font-bold bg-gradient-to-r from-bigfi-blue to-bigfi-teal bg-clip-text text-transparent cursor-pointer">
            BIG FI
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