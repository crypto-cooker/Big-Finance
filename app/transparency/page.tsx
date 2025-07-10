'use client';

import Link from 'next/link';

export default function Transparency() {
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
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-bigfi-blue to-bigfi-teal bg-clip-text text-transparent cursor-pointer">
                BIG FI
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/how-it-works" className="text-bigfi-blue hover:text-bigfi-teal transition-colors">
                How it works
              </Link>
              <Link href="/transparency" className="text-bigfi-blue hover:text-bigfi-teal transition-colors">
                Transparency
              </Link>
              <Link href="/launch" className="bg-gradient-to-r from-bigfi-blue to-bigfi-teal text-white px-6 py-2 rounded-lg font-semibold hover:from-bigfi-blue/80 hover:to-bigfi-teal/80 transition-all duration-200 shadow-lg">
                Launch App
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-bigfi-blue to-bigfi-teal bg-clip-text text-transparent">
              Transparency
            </h1>
            <p className="text-xl text-bigfi-gray">
              Complete transparency in our operations, security, and performance
            </p>
          </div>

          <div className="relative flex flex-col items-center space-y-16">
            {/* Vertical timeline line (optional) */}
            <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-gradient-to-b from-bigfi-blue/30 via-bigfi-teal/30 to-transparent pointer-events-none z-0" />

            {/* Section 1: Smart Contract Audits (left) */}
            <div className="relative z-10 w-full md:w-1/2 self-start">
              <div className="bg-bigfi-panel/80 backdrop-blur-sm rounded-bigfi p-8 border border-bigfi-border">
                <div className="flex items-center gap-6">
                  <div className="hidden md:block">
                    <div className="bg-bigfi-blue/10 rounded-full p-6 border border-bigfi-blue/30">
                      <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="#1E90FF" fillOpacity="0.15"/><path d="M16 32V16h16v16H16Zm8-8h8" stroke="#1E90FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="24" cy="24" r="8" fill="#1E90FF" fillOpacity="0.2"/></svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4 text-bigfi-blue">Smart Contract Audits</h2>
                    <p className="text-bigfi-gray mb-4">
                      All our smart contracts undergo rigorous security audits by leading firms in the blockchain security space.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-bigfi-blue/10 rounded-lg p-4 border border-bigfi-blue/30">
                    <h3 className="font-bold text-bigfi-blue mb-2">Audit Status</h3>
                    <p className="text-bigfi-gray text-sm">All contracts audited and verified</p>
                  </div>
                  <div className="bg-bigfi-blue/10 rounded-lg p-4 border border-bigfi-blue/30">
                    <h3 className="font-bold text-bigfi-blue mb-2">Security Score</h3>
                    <p className="text-bigfi-gray text-sm">A+ rating from security auditors</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Real-Time Analytics (right) */}
            <div className="relative z-10 w-full md:w-1/2 self-end">
              <div className="bg-bigfi-panel/80 backdrop-blur-sm rounded-bigfi p-8 border border-bigfi-border">
                <div className="flex items-center gap-6 flex-row-reverse">
                  <div className="hidden md:block">
                    <div className="bg-bigfi-blue/10 rounded-full p-6 border border-bigfi-blue/30">
                      <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="#00BFAE" fillOpacity="0.15"/><path d="M16 32V24h4v8h-4Zm6-8h4v8h-4v-8Zm6-4h4v12h-4V20Z" fill="#00BFAE"/><rect x="16" y="16" width="16" height="16" rx="8" fill="#00BFAE" fillOpacity="0.1"/></svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4 text-bigfi-blue">Real-Time Analytics</h2>
                    <p className="text-bigfi-gray mb-4">
                      Track all protocol metrics, performance, and user statistics in real-time.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-bigfi-blue/10 rounded-lg p-4 border border-bigfi-blue/30">
                    <h3 className="font-bold text-bigfi-blue mb-2">Total Value Locked</h3>
                    <p className="text-2xl font-bold bg-gradient-to-r from-bigfi-blue to-bigfi-teal bg-clip-text text-transparent">$83.97M</p>
                  </div>
                  <div className="bg-bigfi-blue/10 rounded-lg p-4 border border-bigfi-blue/30">
                    <h3 className="font-bold text-bigfi-blue mb-2">Active Users</h3>
                    <p className="text-2xl font-bold bg-gradient-to-r from-bigfi-blue to-bigfi-teal bg-clip-text text-transparent">1,247</p>
                  </div>
                  <div className="bg-bigfi-blue/10 rounded-lg p-4 border border-bigfi-blue/30">
                    <h3 className="font-bold text-bigfi-blue mb-2">Total Rewards</h3>
                    <p className="text-2xl font-bold bg-gradient-to-r from-bigfi-blue to-bigfi-teal bg-clip-text text-transparent">$2.1M</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Security Measures (left) */}
            <div className="relative z-10 w-full md:w-1/2 self-start">
              <div className="bg-bigfi-panel/80 backdrop-blur-sm rounded-bigfi p-8 border border-bigfi-border">
                <div className="flex items-center gap-6">
                  <div className="hidden md:block">
                    <div className="bg-bigfi-blue/10 rounded-full p-6 border border-bigfi-blue/30">
                      <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="#1E90FF" fillOpacity="0.15"/><path d="M24 14c-4.418 0-8 2.686-8 6v4c0 5.523 3.582 10 8 10s8-4.477 8-10v-4c0-3.314-3.582-6-8-6Z" stroke="#1E90FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="24" cy="28" r="2" fill="#1E90FF"/></svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4 text-bigfi-blue">Security Measures</h2>
                    <p className="text-bigfi-gray mb-4">
                      Multi-layered security approach to protect user funds and ensure protocol safety.
                    </p>
                  </div>
                </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-bigfi-blue">
                      <span className="text-bigfi-accent">✓</span>
                      <span>Multi-signature governance for critical operations</span>
                    </div>
                    <div className="flex items-center gap-3 text-bigfi-blue">
                      <span className="text-bigfi-accent">✓</span>
                      <span>Time-locked upgrades and emergency pause functionality</span>
                    </div>
                    <div className="flex items-center gap-3 text-bigfi-blue">
                      <span className="text-bigfi-accent">✓</span>
                      <span>Insurance coverage for smart contract risks</span>
                    </div>
                    <div className="flex items-center gap-3 text-bigfi-blue">
                      <span className="text-bigfi-accent">✓</span>
                      <span>Real-time monitoring and automated risk controls</span>
                    </div>
                </div>
              </div>
            </div>

            {/* Section 4: Open Source (right) */}
            <div className="relative z-10 w-full md:w-1/2 self-end">
              <div className="bg-bigfi-panel/80 backdrop-blur-sm rounded-bigfi p-8 border border-bigfi-border">
                <div className="flex items-center gap-6 flex-row-reverse">
                  <div className="hidden md:block">
                    <div className="bg-bigfi-blue/10 rounded-full p-6 border border-bigfi-blue/30">
                      <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="#00BFAE" fillOpacity="0.15"/><path d="M24 16v16M16 24h16" stroke="#00BFAE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="24" cy="24" r="8" fill="#00BFAE" fillOpacity="0.2"/></svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4 text-bigfi-blue">Open Source</h2>
                    <p className="text-bigfi-gray mb-4">
                      All our smart contracts and frontend code are open source, allowing for community review and contribution.
                    </p>
                  </div>
                </div>
                <div className="bg-bigfi-blue/10 rounded-lg p-4 border border-bigfi-blue/30">
                  <p className="text-bigfi-blue text-sm">
                    <strong>Repository:</strong> All code available on GitHub for public review and audit
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link 
              href="/launch" 
              className="bg-gradient-to-r from-bigfi-blue to-bigfi-teal text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-bigfi-blue/80 hover:to-bigfi-teal/80 transition-all duration-200 shadow-lg"
            >
              Start Using BIG FI
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}