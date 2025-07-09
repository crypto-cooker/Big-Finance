import React from 'react';
import Link from 'next/link';

const STEPS = [
  {
    number: '01',
    title: 'Deposit Assets',
    description: 'Deposit your USDC, ETH, or BTC into our secure vaults. Your assets are protected by audited smart contracts and institutional-grade security measures.',
    icon: '💳',
    features: ['Multi-signature security', 'Insurance coverage', 'Real-time monitoring']
  },
  {
    number: '02',
    title: 'Strategy Execution',
    description: 'Our advanced algorithms automatically execute yield farming strategies across multiple DeFi protocols, optimizing for maximum returns.',
    icon: '⚡',
    features: ['Automated rebalancing', 'Cross-protocol optimization', 'Risk management']
  },
  {
    number: '03',
    title: 'Earn Rewards',
    description: 'Start earning competitive APY immediately. Rewards are automatically compounded and distributed to maximize your returns.',
    icon: '💰',
    features: ['Auto-compounding', 'Real-time tracking', 'Flexible withdrawals']
  }
];

const STRATEGIES = [
  {
    name: 'Non-Directional Trading',
    description: 'Simultaneously goes long and short to collect funding while avoiding directional exposure. This strategy leverages market inefficiencies to generate consistent returns.',
    apy: '20%',
    risk: 'Medium',
    color: 'from-blue-500 to-purple-600',
    features: ['Market neutral', 'Funding rate capture', 'Low volatility exposure']
  },
  {
    name: 'Liquidity Provision',
    description: 'Provides liquidity to DEXs and earns trading fees and protocol rewards. Optimized across multiple pools for maximum efficiency.',
    apy: '15%',
    risk: 'Low',
    color: 'from-green-500 to-emerald-600',
    features: ['Trading fee income', 'Protocol rewards', 'Impermanent loss protection']
  },
  {
    name: 'Lending & Borrowing',
    description: 'Optimizes lending rates across multiple protocols for maximum yield while maintaining capital preservation focus.',
    apy: '11%',
    risk: 'Low',
    color: 'from-orange-500 to-red-600',
    features: ['Rate optimization', 'Multi-protocol', 'Capital preservation']
  }
];

const FAQS = [
  {
    question: 'How does Big FI generate yield?',
    answer: 'Big FI uses advanced DeFi strategies including non-directional trading, liquidity provision, and cross-protocol lending to generate competitive yields while managing risk through diversification and automated rebalancing.'
  },
  {
    question: 'What are the risks involved?',
    answer: 'Risks include smart contract vulnerabilities, market volatility, and protocol-specific risks. We implement multiple security measures including audits, insurance coverage, and real-time monitoring to minimize these risks.'
  },
  {
    question: 'Can I withdraw my funds anytime?',
    answer: 'Yes, you can withdraw your staked assets at any time, subject to the specific vault\'s withdrawal conditions. Most withdrawals are processed immediately with minimal gas fees.'
  },
  {
    question: 'How are APY rates calculated?',
    answer: 'APY rates are calculated based on historical performance and current market conditions. Rates are variable and subject to change based on market dynamics and strategy performance.'
  },
  {
    question: 'Is Big FI audited and secure?',
    answer: 'Yes, all our smart contracts are audited by leading security firms. We also maintain insurance coverage and implement multi-signature governance for all critical operations.'
  },
  {
    question: 'What makes Big FI different?',
    answer: 'Big FI combines institutional-grade strategies with user-friendly accessibility, offering competitive yields through innovative non-directional trading and advanced risk management systems.'
  }
];

export default function HowItWorks() {
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
              <a href="/how-it-works" className="text-emerald-300 font-semibold">
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

      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-20 pt-12">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-emerald-500/30">
              <span className="text-sm font-medium text-emerald-100">Step by Step Guide</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              How Big FI
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Works
              </span>
            </h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Big FI leverages advanced DeFi strategies to generate competitive yields while maintaining institutional-grade security and transparency.
            </p>
          </div>

          {/* Process Steps */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-emerald-100">Simple 3-Step Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {STEPS.map((step, index) => (
                <div key={index} className="text-center group">
                  <h3 className="text-xl font-bold mb-4 text-emerald-100">{step.title}</h3>
                  <p className="text-emerald-200 mb-6">{step.description}</p>
                  <div className="space-y-2">
                    {step.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center justify-center gap-2 text-sm text-emerald-300">
                        <span className="text-emerald-400">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategies Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-emerald-100">Our Yield Strategies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {STRATEGIES.map((strategy, index) => (
                <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300 group">
                  <h3 className="text-xl font-bold mb-2 text-emerald-100">{strategy.name}</h3>
                  <p className="text-emerald-200 mb-4">{strategy.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="text-sm text-emerald-300">APY</div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">{strategy.apy}</div>
                    </div>
                    <div>
                      <div className="text-sm text-emerald-300">Risk</div>
                      <div className="font-semibold text-emerald-100">{strategy.risk}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {strategy.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-emerald-300">
                        <span className="text-emerald-400">•</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Details */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-emerald-100">Technical Architecture</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center text-2xl border border-emerald-500/30">
                    🔐
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-100">Smart Contract Security</h3>
                </div>
                <ul className="space-y-4 text-emerald-200">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">✓</span>
                    <span>Multi-signature governance for critical operations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">✓</span>
                    <span>Time-locked upgrades and emergency pause functionality</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">✓</span>
                    <span>Comprehensive audit by leading security firms</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">✓</span>
                    <span>Bug bounty program for continuous security improvement</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl flex items-center justify-center text-2xl border border-cyan-500/30">
                    🛡️
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-100">Risk Management</h3>
                </div>
                <ul className="space-y-4 text-emerald-200">
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">🔒</span>
                    <span>Diversified exposure across multiple protocols</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">📊</span>
                    <span>Real-time monitoring and automated risk controls</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">🛡️</span>
                    <span>Insurance coverage for smart contract risks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">⚡</span>
                    <span>Rapid response protocols for market volatility</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-emerald-100">Performance Metrics</h2>
            <div className="bg-gradient-to-r from-slate-800/50 to-emerald-900/20 rounded-2xl p-8 border border-emerald-500/20">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                    $83.97M
                  </div>
                  <div className="text-emerald-300 text-sm">Total Value Locked</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                    15.0%
                  </div>
                  <div className="text-emerald-300 text-sm">Average APY</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                    1,247+
                  </div>
                  <div className="text-emerald-300 text-sm">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                    99.9%
                  </div>
                  <div className="text-emerald-300 text-sm">Uptime</div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-emerald-100">Frequently Asked Questions</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              {FAQS.map((faq, index) => (
                <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300">
                  <h3 className="text-xl font-bold mb-3 text-emerald-100">{faq.question}</h3>
                  <p className="text-emerald-200">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-slate-800/50 to-emerald-900/20 rounded-2xl p-12 border border-emerald-500/20">
            <h2 className="text-3xl font-bold mb-6 text-emerald-100">Ready to Start Earning?</h2>
            <p className="text-xl text-emerald-200 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already earning competitive yields with Big FI Protocol.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/launch" className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg hover:from-emerald-300 hover:to-cyan-300 transition-all duration-200 shadow-lg hover:scale-105">
                Launch App
              </Link>
              <Link href="https://alphas-alpha.gitbook.io/bigfi_whitepaper" className="border border-emerald-400/50 text-emerald-100 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-emerald-500/10 transition-all duration-200 hover:scale-105">
                View Documentation
              </Link>
            </div>
          </div>
        </div>
      </div>

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
            <Link href="https://alphas-alpha.gitbook.io/bigfi_whitepaper/">
              <img src="/images/gitbook.svg" alt="" width={30}/>
            </Link>
        </div>
      </footer>
    </div>
  );
}