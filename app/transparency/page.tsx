'use client';

import Link from 'next/link';

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
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent cursor-pointer">
                Big FI
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/how-it-works" className="text-emerald-100 hover:text-emerald-300 transition-colors">
                How it works
              </Link>
              <Link href="/transparency" className="text-emerald-100 hover:text-emerald-300 transition-colors">
                Transparency
              </Link>
              <Link href="/launch" className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 px-6 py-2 rounded-lg font-semibold hover:from-emerald-300 hover:to-cyan-300 transition-all duration-200 shadow-lg">
                Launch App
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Transparency
            </h1>
            <p className="text-xl text-emerald-100">
              Complete transparency in our operations, security, and performance
            </p>
          </div>

          <div className="space-y-12">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20">
              <h2 className="text-2xl font-bold mb-4 text-emerald-100">Smart Contract Audits</h2>
              <p className="text-emerald-200 mb-4">
                All our smart contracts undergo rigorous security audits by leading firms in the blockchain security space.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/30">
                  <h3 className="font-bold text-emerald-100 mb-2">Audit Status</h3>
                  <p className="text-emerald-200 text-sm">All contracts audited and verified</p>
                </div>
                <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/30">
                  <h3 className="font-bold text-emerald-100 mb-2">Security Score</h3>
                  <p className="text-emerald-200 text-sm">A+ rating from security auditors</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20">
              <h2 className="text-2xl font-bold mb-4 text-emerald-100">Real-Time Analytics</h2>
              <p className="text-emerald-200 mb-4">
                Track all protocol metrics, performance, and user statistics in real-time.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/30">
                  <h3 className="font-bold text-emerald-100 mb-2">Total Value Locked</h3>
                  <p className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">$83.97M</p>
                </div>
                <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/30">
                  <h3 className="font-bold text-emerald-100 mb-2">Active Users</h3>
                  <p className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">1,247</p>
                </div>
                <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/30">
                  <h3 className="font-bold text-emerald-100 mb-2">Total Rewards</h3>
                  <p className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">$2.1M</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20">
              <h2 className="text-2xl font-bold mb-4 text-emerald-100">Security Measures</h2>
              <p className="text-emerald-200 mb-4">
                Multi-layered security approach to protect user funds and ensure protocol safety.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-emerald-200">
                  <span className="text-emerald-400">✓</span>
                  <span>Multi-signature governance for critical operations</span>
                </div>
                <div className="flex items-center gap-3 text-emerald-200">
                  <span className="text-emerald-400">✓</span>
                  <span>Time-locked upgrades and emergency pause functionality</span>
                </div>
                <div className="flex items-center gap-3 text-emerald-200">
                  <span className="text-emerald-400">✓</span>
                  <span>Insurance coverage for smart contract risks</span>
                </div>
                <div className="flex items-center gap-3 text-emerald-200">
                  <span className="text-emerald-400">✓</span>
                  <span>Real-time monitoring and automated risk controls</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20">
              <h2 className="text-2xl font-bold mb-4 text-emerald-100">Open Source</h2>
              <p className="text-emerald-200 mb-4">
                All our smart contracts and frontend code are open source, allowing for community review and contribution.
              </p>
              <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/30">
                <p className="text-emerald-100 text-sm">
                  <strong>Repository:</strong> All code available on GitHub for public review and audit
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link 
              href="/launch" 
              className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg hover:from-emerald-300 hover:to-cyan-300 transition-all duration-200 shadow-lg"
            >
              Start Using Big FI
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}