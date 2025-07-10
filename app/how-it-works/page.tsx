'use client';

import Link from 'next/link';

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
              How It Works
            </h1>
            <p className="text-xl text-emerald-100">
              Understanding the Big FI Protocol and how to earn competitive yields
            </p>
          </div>

          <div className="space-y-12">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20">
              <h2 className="text-2xl font-bold mb-4 text-emerald-100">1. Connect Your Wallet</h2>
              <p className="text-emerald-200 mb-4">
                Start by connecting your Web3 wallet (MetaMask, WalletConnect, etc.) to access the Big FI platform.
              </p>
              <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/30">
                <p className="text-emerald-100 text-sm">
                  <strong>Supported Wallets:</strong> MetaMask, WalletConnect, Coinbase Wallet, and more
                </p>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20">
              <h2 className="text-2xl font-bold mb-4 text-emerald-100">2. Choose Your Vault</h2>
              <p className="text-emerald-200 mb-4">
                Select from our curated vaults offering different risk profiles and yield strategies:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/30">
                  <h3 className="font-bold text-emerald-100 mb-2">USDC Vault</h3>
                  <p className="text-emerald-200 text-sm">High yield, variable returns</p>
                </div>
                <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/30">
                  <h3 className="font-bold text-emerald-100 mb-2">ETH Vault</h3>
                  <p className="text-emerald-200 text-sm">Medium yield, balanced risk</p>
                </div>
                <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/30">
                  <h3 className="font-bold text-emerald-100 mb-2">BTC Vault</h3>
                  <p className="text-emerald-200 text-sm">Conservative, stable returns</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20">
              <h2 className="text-2xl font-bold mb-4 text-emerald-100">3. Stake and Earn</h2>
              <p className="text-emerald-200 mb-4">
                Deposit your assets into the chosen vault and start earning competitive yields immediately.
              </p>
              <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/30">
                <p className="text-emerald-100 text-sm">
                  <strong>Key Features:</strong> No lock-up periods, instant withdrawals, transparent fee structure
                </p>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20">
              <h2 className="text-2xl font-bold mb-4 text-emerald-100">4. Monitor and Withdraw</h2>
              <p className="text-emerald-200 mb-4">
                Track your earnings in real-time and withdraw your funds whenever you need them.
              </p>
              <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/30">
                <p className="text-emerald-100 text-sm">
                  <strong>Real-time Updates:</strong> Live APY tracking, portfolio performance, and yield history
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link 
              href="/launch" 
              className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg hover:from-emerald-300 hover:to-cyan-300 transition-all duration-200 shadow-lg"
            >
              Start Earning Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}