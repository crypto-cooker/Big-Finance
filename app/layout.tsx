import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./components/Providers";
import Animation from "./components/Animation";
import { PageTransitionLoader } from "./components/PageTransitionLoader";

export const metadata: Metadata = {
  title: "BiG FI Protocol - Yield Made Simple",
  description:
    "The SuperApp DeFi Deserves. Earn competitive yields with institutional-grade security and transparent smart contracts.",
  keywords: "DeFi, yield farming, staking, crypto, ethereum, bitcoin, USDC",
  authors: [{ name: "BIG FI Protocol" }],
  openGraph: {
    title: "BIG FI Protocol - Yield Made Simple",
    description:
      "The SuperApp DeFi Deserves. Earn competitive yields with institutional-grade security.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "BIG FI Protocol - Yield Made Simple",
    description:
      "The SuperApp DeFi Deserves. Earn competitive yields with institutional-grade security.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
      </head>
      <body suppressHydrationWarning={true}>
        {/* <Animation /> */}
        <div className="relative z-[1] hide-scrollbar overflow-y-scroll h-screen">
          <Providers>
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
}
