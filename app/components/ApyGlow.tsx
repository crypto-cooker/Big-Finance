type TokenProps = {
    symbol: string;
    name: string;
    avatar: string;
    address: string;
    vaultToken: string;
    apy: number;
    decimals: number;
}


export const ApyGlow: React.FC<{
    token: TokenProps;
  }> = ({token}) => {
  return (
    <div
        className={`ml-auto rounded-full px-1 sm:px-2 h-8 sm:h-10 grid place-items-center relative overflow-hidden ${
        token.symbol === "WBTC"
            ? "btc-style"
            : token.symbol === "ETH"
            ? "eth-style"
            : "usdc-style"
        }`}
    >
        <span className="relative z-10 flex items-center text-xs sm:text-sm md:text-base">
        {token.apy}% APY
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="hidden sm:block lucide lucide-sparkles sm:w-4 sm:h-4 md:w-5 md:h-5"
        >
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
            <path d="M20 3v4" />
            <path d="M22 5h-4" />
            <path d="M4 17v2" />
            <path d="M5 18H3" />
        </svg>
        </span>
        <span
        className={`glow-bar ${token.symbol.toLowerCase()}-glow`}
        ></span>
    </div>
  );
};