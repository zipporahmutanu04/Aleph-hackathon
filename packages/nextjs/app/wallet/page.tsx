"use client";

import { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { 
  ArrowTopRightOnSquareIcon,
  DocumentArrowDownIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ClockIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from "@heroicons/react/24/outline";
import { Address, Balance } from "~~/components/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";

const Wallet: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const { targetNetwork } = useTargetNetwork();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for demonstration
  const tokenPrice = 0.10; // $0.10 USD
  const priceChange24h = 5.2; // +5.2%
  const takaBalance = 2340;
  const ethBalance = 0.0456;

  const transactions = [
    { id: 1, type: "earn", amount: 150, description: "Beach cleanup reward", date: "2025-01-08", hash: "0x1234...5678" },
    { id: 2, type: "earn", amount: 80, description: "Park cleanup reward", date: "2025-01-07", hash: "0x2345...6789" },
    { id: 3, type: "redeem", amount: -500, description: "Tree planting donation", date: "2025-01-06", hash: "0x3456...7890" },
    { id: 4, type: "earn", amount: 220, description: "Urban cleanup reward", date: "2025-01-05", hash: "0x4567...8901" },
  ];

  if (!connectedAddress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="glass-card p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Your Wallet</h2>
          <p className="text-gray-600 mb-6">Please connect your wallet to view your assets</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="glass-card p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Wallet Overview</h1>
              <div className="flex items-center gap-2">
                <Address address={connectedAddress} />
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-600">{targetNetwork.name}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Link 
                href={`${targetNetwork.blockExplorers?.default?.url}/address/${connectedAddress}`}
                target="_blank"
                className="btn-secondary"
              >
                <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                Block Explorer
              </Link>
              <button className="btn-outline">
                <DocumentArrowDownIcon className="w-5 h-5" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="glass-card p-2 mb-8">
          <div className="flex gap-2">
            {[
              { id: "overview", label: "Overview", icon: ChartBarIcon },
              { id: "transactions", label: "Transactions", icon: ClockIcon },
              { id: "analytics", label: "Analytics", icon: CurrencyDollarIcon }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-emerald-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-white/50"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Balance Cards */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* TAKA Token Balance */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">TAKA Balance</h3>
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <CurrencyDollarIcon className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-600 mb-2">{takaBalance.toLocaleString()}</div>
                  <div className="text-gray-600 mb-4">TAKA Tokens</div>
                  <div className="text-lg text-gray-900 font-medium">≈ ${(takaBalance * tokenPrice).toFixed(2)} USD</div>
                </div>
                <div className="mt-6 p-4 bg-emerald-50 rounded-xl">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-emerald-800">Token Price:</span>
                    <div className="text-right">
                      <div className="font-medium text-emerald-900">${tokenPrice.toFixed(3)} USD</div>
                      <div className={`text-xs flex items-center gap-1 ${priceChange24h >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                        {priceChange24h >= 0 ? <ArrowUpIcon className="w-3 h-3" /> : <ArrowDownIcon className="w-3 h-3" />}
                        {Math.abs(priceChange24h)}% (24h)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ETH Balance */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">ETH Balance</h3>
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">Ξ</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{ethBalance}</div>
                  <div className="text-gray-600 mb-4">ETH</div>
                  <Balance address={connectedAddress} className="text-lg" />
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                  <div className="text-sm text-blue-800">
                    <div className="flex justify-between mb-2">
                      <span>Network:</span>
                      <span className="font-medium">{targetNetwork.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Chain ID:</span>
                      <span className="font-medium">{targetNetwork.id}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <button className="btn-primary">
                  Send TAKA
                </button>
                <button className="btn-secondary">
                  Swap Tokens
                </button>
                <Link href="/dashboard" className="btn-outline">
                  View Dashboard
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === "transactions" && (
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Transaction History</h3>
            <div className="space-y-4">
              {transactions.map(tx => (
                <div key={tx.id} className="flex items-center justify-between p-4 bg-white/30 rounded-xl hover:bg-white/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === "earn" ? "bg-emerald-100" : "bg-orange-100"
                    }`}>
                      {tx.type === "earn" ? (
                        <ArrowUpIcon className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <ArrowDownIcon className="w-5 h-5 text-orange-600" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{tx.description}</div>
                      <div className="text-sm text-gray-600">{tx.date} • {tx.hash}</div>
                    </div>
                  </div>
                  <div className={`font-bold ${tx.amount > 0 ? "text-emerald-600" : "text-orange-600"}`}>
                    {tx.amount > 0 ? "+" : ""}{tx.amount} TAKA
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">7 Days</div>
                <div className="text-gray-600">Average Collection Time</div>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-teal-600 mb-2">89%</div>
                <div className="text-gray-600">Mission Success Rate</div>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-cyan-600 mb-2">$234</div>
                <div className="text-gray-600">Total Value Earned</div>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Earning Trends</h3>
              <div className="h-64 bg-white/30 rounded-xl flex items-center justify-center">
                <p className="text-gray-600">Chart visualization would go here</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;