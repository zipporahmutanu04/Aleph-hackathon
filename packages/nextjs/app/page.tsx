"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Logo } from "~~/components/Logo";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <section className="flex items-center flex-col flex-grow pt-10" style={{ background: "#E8F5E9" }}>
      <div className="px-5 flex flex-col gap-2 items-center">
        <h1 className="text-center">
          <span className="block text-2xl mb-2 text-green-800">Welcome to</span>
          <span className="flex items-end gap-4 text-5xl font-bold text-green-700">
            <Logo size={48} /> EcoTrack
          </span>
          <span className="block text-xl mt-2 text-green-600">Turning Waste into Value with Web3</span>
        </h1>
        <div className="flex btn btn-md bg-green-50 w-fit justify-center mb-4 items-center space-x-2 border border-green-200">
          <p className="my-2 font-medium text-green-800">Connected Address:</p>
          <Address address={connectedAddress} />
        </div>
      </div>

      <div className="flex-grow w-full mt-16 px-8 py-12 bg-green-50">
        <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
          <Link href="/ecotrack" className="flex flex-col bg-white px-10 py-10 text-center items-center max-w-xs rounded-3xl shadow-lg hover:shadow-xl transition-shadow border border-green-100">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-green-800 mb-2">EcoTrack Dashboard</h2>
            <p className="text-green-600">
              Start managing waste collection and token distribution
            </p>
          </Link>
          
          <Link href="/debug" className="flex flex-col bg-white px-10 py-10 text-center items-center max-w-xs rounded-3xl shadow-lg hover:shadow-xl transition-shadow border border-green-100">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <BugAntIcon className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-green-800 mb-2">Debug Contracts</h2>
            <p className="text-green-600">
              Test and debug smart contract interactions
            </p>
          </Link>
          
          <Link href="/blockexplorer" className="flex flex-col bg-white px-10 py-10 text-center items-center max-w-xs rounded-3xl shadow-lg hover:shadow-xl transition-shadow border border-green-100">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <MagnifyingGlassIcon className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-green-800 mb-2">Block Explorer</h2>
            <p className="text-green-600">
              View transaction history and blockchain details
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
