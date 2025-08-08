"use client";

import Link from "next/link";
import AnimatedBackground from "../components/AnimatedBackground";
import { useTheme } from "../components/ThemeProvider";
import { ThemeToggle } from "../components/ThemeToggle";
import { TransparencyImage } from "../components/TransparencyImage";
import { LoadingLink } from "../components/LoadingLink";
import { MobileNavigation } from "../components/MobileNavigation";

export default function Transparency() {
  const { theme } = useTheme();
  return (
    <div className="min-h-screen bg-primary text-primary transition-colors duration-500 relative overflow-hidden">
      <AnimatedBackground />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card backdrop-blur-md border-b border-primary transition-colors duration-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center font-bold text-xl">
                <img
                  src="/logo.png"
                  alt="BIG FI Logo"
                  className="w-full h-full"
                />
              </div>
              <LoadingLink
                href="/"
                className="text-2xl font-bold gradient-text cursor-pointer"
                variant="logo"
              >
                BIG FI
              </LoadingLink>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <LoadingLink
                href="/how-it-works"
                className="text-accent hover:text-accent transition-colors"
                variant="nav"
              >
                How it works
              </LoadingLink>
              <LoadingLink
                href="/transparency"
                className="text-accent hover:text-accent transition-colors"
                variant="nav"
              >
                Transparency
              </LoadingLink>
              <LoadingLink
                href="/launch"
                className="border border-neutral-700 rounded-full px-6 py-2"
                variant="nav"
              >
                Launch App
              </LoadingLink>
              <ThemeToggle />
            </div>
            <MobileNavigation currentPage="/transparency" />
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="h-[100px] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold gradient-text">
              Transparency
            </h1>
            <p className="text-xl  text-secondary">
              Complete transparency in our operations, security, and performance
            </p>
          </div>
          <br />
          <br />
          <div className="relative flex flex-col items-center space-y-16">
            {/* Vertical timeline line (optional) */}
            {/* <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-gradient-to-b from-accent/30 via-accent2/30 to-transparent pointer-events-none z-0" /> */}

            {/* Section 1: Smart Contract Audits (left) */}
            <section className="main-section relative w-full">
              <div className="flex items-start justify-between gap-8 flex-col lg:flex-row">
                {/* Content Box */}
                <div className="z-10 max-w-[640px] basis-[40%]">
                  <div
                    className={`${
                      theme === "light" ? "bg-panel" : "bg-panel/80"
                    } backdrop-blur-sm rounded-bigfi p-8  transition-colors duration-300`}
                  >
                    <div className="flex items-center gap-6">
                      <div className="hidden md:block">
                        <div className="bg-accent/10 rounded-full p-6 border border-accent/30">
                          <svg
                            width="48"
                            height="48"
                            fill="none"
                            viewBox="0 0 48 48"
                          >
                            <rect
                              width="48"
                              height="48"
                              rx="24"
                              fill="#1E90FF"
                              fillOpacity="0.15"
                            />
                            <path
                              d="M16 32V16h16v16H16Zm8-8h8"
                              stroke="#1E90FF"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <circle
                              cx="24"
                              cy="24"
                              r="8"
                              fill="#1E90FF"
                              fillOpacity="0.2"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-4 text-accent">
                          Smart Contract Audits
                        </h2>
                        <p className="text-secondary mb-4">
                          All our smart contracts undergo rigorous security
                          audits by leading firms in the blockchain security
                          space.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mt-6">
                      <div className="bg-accent/10 rounded-lg p-4 border border-accent/30">
                        <h3 className="font-bold text-accent mb-2">
                          Audit Status
                        </h3>
                        <p className="text-secondary text-sm">
                          All contracts audited and verified
                        </p>
                      </div>
                      <div className="bg-accent/10 rounded-lg p-4 border border-accent/30">
                        <h3 className="font-bold text-accent mb-2">
                          Security Score
                        </h3>
                        <p className="text-secondary text-sm">
                          A+ rating from security auditors
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image to the right */}
                <div className="relative z-10 basis-[60%]">
                  <TransparencyImage
                    src="/images/audit.jpg"
                    alt="Smart Contract Audit"
                    className="w-full h-[560px] rounded-lg"
                    priority={true}
                  />
                </div>
              </div>
            </section>
            <br />
            {/* Section 2: Real-Time Analytics (right) */}
            <section className="main-section relative lg:static w-full">
              <div className="flex items-start justify-between gap-8 flex-col lg:flex-row">
                {/* Image to the right */}
                <div className="relative z-10 basis-[60%]">
                  <TransparencyImage
                    src="/images/realTime.jpeg"
                    alt="Real-Time Analytics Dashboard"
                    className="w-full h-[560px] rounded-lg"
                  />
                </div>
                <div className="relative z-10 max-w-[640px] basis-[40%] ml-auto">
                  <div
                    className={`${
                      theme === "light" ? "bg-panel" : "bg-panel/80"
                    } backdrop-blur-sm rounded-bigfi p-8  transition-colors duration-300`}
                  >
                    <div className="flex items-center gap-6 flex-row-reverse">
                      <div className="hidden md:block">
                        <div className="bg-accent2/10 rounded-full p-6 border border-accent2/30">
                          <svg
                            width="48"
                            height="48"
                            fill="none"
                            viewBox="0 0 48 48"
                          >
                            <rect
                              width="48"
                              height="48"
                              rx="24"
                              fill="#00BFAE"
                              fillOpacity="0.15"
                            />
                            <path
                              d="M16 32V24h4v8h-4Zm6-8h4v8h-4v-8Zm6-4h4v12h-4V20Z"
                              fill="#00BFAE"
                            />
                            <rect
                              x="16"
                              y="16"
                              width="16"
                              height="16"
                              rx="8"
                              fill="#00BFAE"
                              fillOpacity="0.1"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-4 text-accent">
                          Real-Time Analytics
                        </h2>
                        <p className="text-secondary mb-4">
                          Track all protocol metrics, performance, and user
                          statistics in real-time.
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mt-6">
                      <div className="bg-accent2/10 rounded-lg p-4 border border-accent2/30">
                        <h3 className="font-bold text-accent mb-2">
                          Total Value Locked
                        </h3>
                        <p className="text-2xl font-bold gradient-text">
                          $83.97M
                        </p>
                      </div>
                      <div className="bg-accent2/10 rounded-lg p-4 border border-accent2/30">
                        <h3 className="font-bold text-accent mb-2">
                          Active Users
                        </h3>
                        <p className="text-2xl font-bold gradient-text">
                          1,247
                        </p>
                      </div>
                      <div className="bg-accent2/10 rounded-lg p-4 border border-accent2/30">
                        <h3 className="font-bold text-accent mb-2">
                          Total Rewards
                        </h3>
                        <p className="text-2xl font-bold gradient-text">
                          $2.1M
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <br />
            {/* Section 3: Security Measures (left) */}
            <section className="main-section relative w-full">
              <div className="flex items-start justify-between gap-8 flex-col lg:flex-row">
                {/* Image to the right */}

                <div className="z-10 max-w-[640px] basis-[40%]">
                  <div
                    className={`${
                      theme === "light" ? "bg-panel" : "bg-panel/80"
                    } backdrop-blur-sm rounded-bigfi p-8  transition-colors duration-300`}
                  >
                    <div className="flex items-center gap-6">
                      <div className="hidden md:block">
                        <div className="bg-accent/10 rounded-full p-6 border border-accent/30">
                          <svg
                            width="48"
                            height="48"
                            fill="none"
                            viewBox="0 0 48 48"
                          >
                            <rect
                              width="48"
                              height="48"
                              rx="24"
                              fill="#1E90FF"
                              fillOpacity="0.15"
                            />
                            <path
                              d="M24 14c-4.418 0-8 2.686-8 6v4c0 5.523 3.582 10 8 10s8-4.477 8-10v-4c0-3.314-3.582-6-8-6Z"
                              stroke="#1E90FF"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <circle cx="24" cy="28" r="2" fill="#1E90FF" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-4 text-accent">
                          Security Measures
                        </h2>
                        <p className="text-secondary mb-4">
                          Multi-layered security approach to protect user funds
                          and ensure protocol safety.
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4 mt-6">
                      <div className="flex items-center gap-3 text-accent">
                        <span className="text-accent">✓</span>
                        <span>
                          Multi-signature governance for critical operations
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-accent">
                        <span className="text-accent">✓</span>
                        <span>
                          Time-locked upgrades and emergency pause functionality
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-accent">
                        <span className="text-accent">✓</span>
                        <span>Insurance coverage for smart contract risks</span>
                      </div>
                      <div className="flex items-center gap-3 text-accent">
                        <span className="text-accent">✓</span>
                        <span>
                          Real-time monitoring and automated risk controls
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 basis-[60%]">
                  <TransparencyImage
                    src="/images/security.png"
                    alt="Security Measures and Protocols"
                    className="w-full md:min-w-[720px] h-[560px] rounded-lg"
                  />
                </div>
              </div>
            </section>
            <br />
            {/* Section 4: Open Source (right) */}
            <section className="main-section relative lg:static w-full">
              <div className="flex items-start justify-between gap-8 flex-col lg:flex-row">
                {/* Image to the right */}
                <div className="relative z-10 basis-[60%]">
                  <TransparencyImage
                    src="/images/openSource.jpg"
                    alt="Open Source Code Repository"
                    className="w-full h-[560px] rounded-lg"
                  />
                </div>
                <div className="relative z-10 max-w-[640px] basis-[40%]">
                  <div
                    className={`${
                      theme === "light" ? "bg-panel" : "bg-panel/80"
                    } backdrop-blur-sm rounded-bigfi p-8  transition-colors duration-300`}
                  >
                    <div className="flex items-center gap-6 flex-row-reverse">
                      <div className="hidden md:block">
                        <div className="bg-accent2/10 rounded-full p-6 border border-accent2/30">
                          <svg
                            width="48"
                            height="48"
                            fill="none"
                            viewBox="0 0 48 48"
                          >
                            <rect
                              width="48"
                              height="48"
                              rx="24"
                              fill="#00BFAE"
                              fillOpacity="0.15"
                            />
                            <path
                              d="M24 16v16M16 24h16"
                              stroke="#00BFAE"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <circle
                              cx="24"
                              cy="24"
                              r="8"
                              fill="#00BFAE"
                              fillOpacity="0.2"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-4 text-accent">
                          Open Source
                        </h2>
                        <p className="text-secondary mb-4">
                          All our smart contracts and frontend code are open
                          source, allowing for community review and
                          contribution.
                        </p>
                      </div>
                    </div>
                    <div className="bg-accent2/10 rounded-lg p-4 border border-accent2/30 mt-6">
                      <p className="text-accent text-sm">
                        <strong>Repository:</strong> All code available on
                        GitHub for public review and audit
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <br />
          <br />
          <div className="text-center mt-16">
            <LoadingLink
              href="/launch"
              className="gradient-bg text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-all duration-200 shadow-lg"
              variant="nav"
            >
              Start Using BIG FI
            </LoadingLink>
          </div>
        </div>
      </div>
    </div>
  );
}
