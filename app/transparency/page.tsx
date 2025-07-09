import React from 'react';
import Link from 'next/link'

const AUDITS = [
  {
    firm: 'Trail of Bits',
    status: 'Completed',
    date: 'March 2024',
    score: 'A+',
    report: '#',
    color: 'text-green-400',
    description: 'Comprehensive smart contract security audit covering all vault implementations.'
  },
  {
    firm: 'OpenZeppelin',
    status: 'Completed',
    date: 'February 2024',
    score: 'A',
    report: '#',
    color: 'text-green-400',
    description: 'Security review focusing on governance and upgrade mechanisms.'
  },
  {
    firm: 'Certik',
    status: 'In Progress',
    date: 'April 2024',
    score: 'Pending',
    report: '#',
    color: 'text-yellow-400',
    description: 'Ongoing audit for new strategy implementations and protocol upgrades.'
  }
];

const SECURITY_FEATURES = [
  {
    title: 'Multi-Signature Governance',
    description: 'All critical operations require multiple signatures from trusted parties, ensuring no single point of failure in protocol governance.',
    icon: '🔐',
    details: ['5-of-7 multisig', 'Timelock delays', 'Emergency controls']
  },
  {
    title: 'Time-Locked Upgrades',
    description: 'Smart contract upgrades have a mandatory 48-hour delay period for community review and verification.',
    icon: '⏰',
    details: ['48-hour delays', 'Community review', 'Upgrade transparency']
  },
  {
    title: 'Emergency Pause',
    description: 'Ability to pause operations immediately in case of security threats or protocol vulnerabilities.',
    icon: '🛑',
    details: ['Instant pause capability', 'Guardian network', 'Automated triggers']
  },
  {
    title: 'Insurance Coverage',
    description: 'Comprehensive insurance coverage for smart contract risks through leading DeFi insurance providers.',
    icon: '🛡️',
    details: ['$10M coverage', 'Multiple providers', 'Real-time monitoring']
  }
];

const REAL_TIME_DATA = [
  { label: 'Total Value Locked', value: '$83,967,729.33', change: '+2.3%', trend: 'up' },
  { label: 'Active Users', value: '1,247', change: '+5.1%', trend: 'up' },
  { label: 'Total Transactions', value: '45,892', change: '+12.7%', trend: 'up' },
  { label: 'Average APY', value: '13.0%', change: '+0.5%', trend: 'up' }
];

const SMART_CONTRACTS = [
  {
    name: 'BigFIVault',
    address: '0x1234...5678',
    network: 'Ethereum',
    verified: true,
    purpose: 'Main vault contract for asset management'
  },
  {
    name: 'BigFIRewards',
    address: '0x8765...4321',
    network: 'Ethereum',
    verified: true,
    purpose: 'Reward distribution and staking logic'
  },
  {
    name: 'BigFIGovernance',
    address: '0x9876...5432',
    network: 'Ethereum',
    verified: true,
    purpose: 'Protocol governance and voting mechanisms'
  },
  {
    name: 'BigFIStrategy',
    address: '0x5678...9012',
    network: 'Ethereum',
    verified: true,
    purpose: 'Yield strategy execution and optimization'
  }
];

const TREASURY_DATA = [
  { asset: 'USDC', amount: '68,367,729.33', percentage: '81.3%', value: '$68,367,729' },
  { asset: 'ETH', amount: '2,823.18', percentage: '6.7%', value: '$5,646,360' },
  { asset: 'BTC', amount: '75.56', percentage: '4.1%', value: '$3,402,000' }
];

export default function Transparency() {
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
              <a href="/transparency" className="text-emerald-300 font-semibold">
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
              <span className="text-sm font-medium text-emerald-100">Open Source & Audited</span>
              <span className="text-emerald-400">🔍</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Complete
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Transparency
              </span>
            </h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              We believe in full transparency. View our smart contracts, audit reports, and real-time data to verify the security and performance of Big FI Protocol.
            </p>
          </div>

          {/* Real-time Data */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-emerald-100">Real-Time Protocol Data</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {REAL_TIME_DATA.map((data, index) => (
                <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300 group">
                  <div className="text-sm text-emerald-300 mb-2">{data.label}</div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                    {data.value}
                  </div>
                  <div className={`text-sm flex items-center gap-1 ${data.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    <span>{data.trend === 'up' ? '↗' : '↘'}</span>
                    <span>{data.change} from last week</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Treasury Composition */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-emerald-100">Treasury Composition</h2>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20">
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">
                {TREASURY_DATA.map((asset, index) => (
                  <div key={index} className="text-center group">
                    <div className="text-2xl font-bold text-emerald-100 mb-2">{asset.asset}</div>
                    <div className="text-lg text-emerald-300 mb-1">{asset.amount}</div>
                    <div className="text-sm text-emerald-400 mb-2">{asset.percentage}</div>
                    <div className="text-sm text-emerald-200">{asset.value}</div>
                    <div className="w-full bg-slate-700/50 rounded-full h-2 mt-3">
                      <div 
                        className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: asset.percentage }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Security Features */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-emerald-100">Security Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {SECURITY_FEATURES.map((feature, index) => (
                <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center text-2xl border border-emerald-500/30">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-emerald-100">{feature.title}</h3>
                  </div>
                  <p className="text-emerald-200 mb-4">{feature.description}</p>
                  <div className="space-y-2">
                    {feature.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-emerald-300">
                        <span className="text-emerald-400">•</span>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bug Bounty */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-emerald-100">Bug Bounty Program</h2>
            <div className="bg-gradient-to-r from-slate-800/50 to-emerald-900/20 rounded-2xl p-8 border border-emerald-500/20">
              <div className="max-w-4xl mx-auto text-center">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-emerald-100">Help Us Stay Secure</h3>
                  <p className="text-emerald-200 mb-6">
                    We offer rewards up to $100,000 for critical security vulnerabilities. 
                    Join our bug bounty program and help make Big FI Protocol even more secure.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-red-500/30">
                    <div className="text-2xl font-bold text-red-400 mb-2">Critical</div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-2">$100,000</div>
                    <div className="text-sm text-emerald-300">Protocol-breaking vulnerabilities</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-orange-500/30">
                    <div className="text-2xl font-bold text-orange-400 mb-2">High</div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2">$25,000</div>
                    <div className="text-sm text-emerald-300">Significant security issues</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-yellow-500/30">
                    <div className="text-2xl font-bold text-yellow-400 mb-2">Medium</div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent mb-2">$5,000</div>
                    <div className="text-sm text-emerald-300">Minor security concerns</div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="#"
                    className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:from-emerald-300 hover:to-cyan-300 transition-all duration-200 shadow-lg hover:scale-105"
                  >
                    Submit Bug Report
                  </a>
                  <a 
                    href="#"
                    className="border border-emerald-400/50 text-emerald-100 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-500/10 transition-all duration-200 hover:scale-105"
                  >
                    View Guidelines
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Governance */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-emerald-100">Governance & Voting</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20">
                <h3 className="text-xl font-bold mb-4 text-emerald-100">Active Proposals</h3>
                <div className="space-y-4">
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-emerald-100 font-semibold">BIP-007: Increase USDC Vault Cap</div>
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Active</span>
                    </div>
                    <div className="text-sm text-emerald-300 mb-3">Proposal to increase USDC vault capacity to $150M</div>
                    <div className="flex justify-between text-sm">
                      <span className="text-emerald-300">85% For</span>
                      <span className="text-emerald-300">Ends in 2 days</span>
                    </div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-emerald-100 font-semibold">BIP-008: New Strategy Integration</div>
                      <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">Pending</span>
                    </div>
                    <div className="text-sm text-emerald-300 mb-3">Integration of new yield farming strategy</div>
                    <div className="flex justify-between text-sm">
                      <span className="text-emerald-300">Voting starts in 3 days</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20">
                <h3 className="text-xl font-bold mb-4 text-emerald-100">Governance Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-emerald-300">Total Proposals</span>
                    <span className="text-emerald-100 font-semibold">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300">Passed Proposals</span>
                    <span className="text-emerald-100 font-semibold">18</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300">Active Voters</span>
                    <span className="text-emerald-100 font-semibold">892</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300">Voting Power</span>
                    <span className="text-emerald-100 font-semibold">12.4M BGFI</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-100 py-2 rounded-lg hover:from-emerald-500/30 hover:to-cyan-500/30 transition-all duration-200 font-semibold mt-4">
                    View All Proposals
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* API & Data Access */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-emerald-100">API & Data Access</h2>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto border border-emerald-500/30">
                    📊
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-emerald-100">Real-time API</h3>
                  <p className="text-emerald-300 text-sm mb-4">Access live protocol data and metrics</p>
                  <button className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-100 px-4 py-2 rounded-lg hover:from-emerald-500/30 hover:to-cyan-500/30 transition-all duration-200 text-sm font-semibold">
                    View Docs
                  </button>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto border border-cyan-500/30">
                    📈
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-emerald-100">Analytics Dashboard</h3>
                  <p className="text-emerald-300 text-sm mb-4">Detailed protocol analytics and insights</p>
                  <button className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-emerald-100 px-4 py-2 rounded-lg hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-200 text-sm font-semibold">
                    Open Dashboard
                  </button>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto border border-purple-500/30">
                    📋
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-emerald-100">Data Exports</h3>
                  <p className="text-emerald-300 text-sm mb-4">Download historical data and reports</p>
                  <button className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-emerald-100 px-4 py-2 rounded-lg hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-200 text-sm font-semibold">
                    Download Data
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-slate-800/50 to-emerald-900/20 rounded-2xl p-12 border border-emerald-500/20">
            <h2 className="text-3xl font-bold mb-6 text-emerald-100">Ready to Start Earning?</h2>
            <p className="text-xl text-emerald-200 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust Big FI Protocol for secure and transparent yield farming.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/launch" className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg hover:from-emerald-300 hover:to-cyan-300 transition-all duration-200 shadow-lg hover:scale-105">
                Launch App
              </Link>
              <Link href="https://alphas-alpha.gitbook.io/bigfi_whitepaper/" className="border border-emerald-400/50 text-emerald-100 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-emerald-500/10 transition-all duration-200 hover:scale-105">
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