import { useState, useEffect } from "react";
import { ethers } from "ethers";

export function useSepoliaWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Original connect logic (for mainnet/future use)
  /*
  const connect = async () => {
    if (!(window as any).ethereum) {
      setError("MetaMask not found");
      return;
    }
    try {
      const ethProvider = new ethers.BrowserProvider((window as any).ethereum);
      const network = await ethProvider.getNetwork();
      if (network.chainId !== BigInt("11155111")) { // Sepolia chainId
        // Prompt user to switch to Sepolia
        await (window as any).ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xaa36a7" }],
        });
      }
      await ethProvider.send("eth_requestAccounts", []);
      const signer = await ethProvider.getSigner();
      setProvider(ethProvider);
      setSigner(signer);
      setAddress(await signer.getAddress());
      setError(null);
    } catch (e: any) {
      setError(e.message || "Failed to connect");
    }
  };
  */

  // New connect logic for Sepolia (re-creates provider/signer after network switch)
  const connectSepolia = async () => {
    if (!isClient) {
      setError("Not on client side");
      return;
    }
    if (!(window as any).ethereum) {
      setError("MetaMask not found");
      return;
    }
    try {
      let ethProvider = new ethers.BrowserProvider((window as any).ethereum);
      let network = await ethProvider.getNetwork();
      if (network.chainId !== BigInt("11155111")) { // Sepolia chainId
        // Prompt user to switch to Sepolia
        await (window as any).ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xaa36a7" }],
        });
        // After switching, re-create provider and get new network
        ethProvider = new ethers.BrowserProvider((window as any).ethereum);
        network = await ethProvider.getNetwork();
        if (network.chainId !== BigInt("11155111")) {
          setError("Failed to switch to Sepolia");
          return;
        }
      }
      await ethProvider.send("eth_requestAccounts", []);
      const signer = await ethProvider.getSigner();
      setProvider(ethProvider);
      setSigner(signer);
      setAddress(await signer.getAddress());
      setError(null);
    } catch (e: any) {
      setError(e.message || "Failed to connect");
    }
  };

  const disconnect = () => {
    setAddress(null);
    setProvider(null);
    setSigner(null);
    setError(null);
  };

  // Export both connect (for mainnet/future) and connectSepolia (for Sepolia dev)
  return { address, provider, signer, error, connectSepolia, disconnect, isClient };
} 