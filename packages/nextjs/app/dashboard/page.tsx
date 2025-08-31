"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { 
  ChartBarIcon, 
  CurrencyDollarIcon, 
  GiftIcon, 
  TrophyIcon,
  MapPinIcon,
  CalendarIcon
} from "@heroicons/react/24/outline";
import { Address, Balance } from "~~/components/scaffold-eth";

const Dashboard: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data - in real app this would come from blockchain/API
  const userStats = {
    totalTrashCollected: 156,
    takaTokensEarned: 2340,
    weeklyProgress: 23,
    rank: 47,
    streakDays: 12,
    co2Saved: 45.6
  };

  const recentActivities = [
    { id: 1, type: "collection", amount: 15, location: "Central Park", date: "2025-01-08", tokens: 150 },
    { id: 2, type: "collection", amount: 8, location: "Beach Cleanup", date: "2025-01-07", tokens: 80 },
    { id: 3, type: "redeem", amount: 500, item: "Tree Planting", date: "2025-01-06", tokens: -500 },
    { id: 4, type: "collection", amount: 22, location: "City Center", date: "2025-01-05", tokens: 220 },
  ];

  const redeemOptions = [
    { id: 1, name: "Plant a Tree", cost: 500, description: "Fund tree planting in deforested areas", available: true },
    { id: 2, name: "Ocean Cleanup", cost: 1000, description: "Support ocean plastic removal projects", available: true },
    { id: 3, name: "Solar Panel", cost: 2500, description: "Install solar panels in rural communities", available: false },
    { id: 4, name: "Water Filter", cost: 750, description: "Provide clean water access", available: true },
  ];

  if (!connectedAddress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="glass-card p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Your Wallet</h2>
          <p className="text-gray-600 mb-6">Please connect your wallet to access your dashboard</p>
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Eco-Warrior!</h1>
              <div className="flex items-center gap-2">
                <Address address={connectedAddress} />
                <span className="text-sm text-gray-500">•</span>
                <Balance address={connectedAddress} />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">{userStats.streakDays}</div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600">#{userStats.rank}</div>
                <div className="text-sm text-gray-600">Global Rank</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="glass-card p-2 mb-8">
          <div className="flex gap-2">
            {[
              { id: "overview", label: "Overview", icon: ChartBarIcon },
              { id: "wallet", label: "Wallet", icon: CurrencyDollarIcon },
              { id: "redeem", label: "Redeem", icon: GiftIcon }
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
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-card p-6 text-center group hover:scale-105 transition-transform">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
                  <GlobeAltIcon className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{userStats.totalTrashCollected}</div>
                <div className="text-sm text-gray-600">Items Collected</div>
              </div>
              
              <div className="glass-card p-6 text-center group hover:scale-105 transition-transform">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-teal-200 transition-colors">
                  <CurrencyDollarIcon className="w-6 h-6 text-teal-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{userStats.takaTokensEarned}</div>
                <div className="text-sm text-gray-600">TAKA Tokens</div>
              </div>
              
              <div className="glass-card p-6 text-center group hover:scale-105 transition-transform">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-cyan-200 transition-colors">
                  <ChartBarIcon className="w-6 h-6 text-cyan-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{userStats.weeklyProgress}</div>
                <div className="text-sm text-gray-600">This Week</div>
              </div>
              
              <div className="glass-card p-6 text-center group hover:scale-105 transition-transform">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <TrophyIcon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{userStats.co2Saved}kg</div>
                <div className="text-sm text-gray-600">CO₂ Saved</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="flex items-center justify-between p-4 bg-white/30 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === "collection" ? "bg-emerald-100" : "bg-orange-100"
                      }`}>
                        {activity.type === "collection" ? (
                          <GlobeAltIcon className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <GiftIcon className="w-5 h-5 text-orange-600" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {activity.type === "collection" 
                            ? `Collected ${activity.amount} items`
                            : `Redeemed: ${activity.item}`
                          }
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPinIcon className="w-4 h-4" />
                          {activity.location || "Reward"}
                          <span>•</span>
                          <CalendarIcon className="w-4 h-4" />
                          {activity.date}
                        </div>
                      </div>
                    </div>
                    <div className={`font-bold ${activity.tokens > 0 ? "text-emerald-600" : "text-orange-600"}`}>
                      {activity.tokens > 0 ? "+" : ""}{activity.tokens} TAKA
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Wallet Tab */}
        {activeTab === "wallet" && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Token Balance */}
              <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">TAKA Token Balance</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-600 mb-2">{userStats.takaTokensEarned}</div>
                  <div className="text-gray-600 mb-4">TAKA Tokens</div>
                  <div className="text-sm text-gray-500">≈ $234.00 USD</div>
                </div>
                <div className="mt-6 p-4 bg-emerald-50 rounded-xl">
                  <div className="text-sm text-emerald-800">
                    <div className="flex justify-between mb-2">
                      <span>Current Price:</span>
                      <span className="font-medium">$0.10 USD</span>
                    </div>
                    <div className="flex justify-between">
                      <span>24h Change:</span>
                      <span className="font-medium text-emerald-600">+5.2%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Wallet Actions */}
              <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Wallet Actions</h3>
                <div className="space-y-4">
                  <button className="w-full btn-primary">
                    View on Block Explorer
                  </button>
                  <button className="w-full btn-secondary">
                    Export Transaction History
                  </button>
                  <button className="w-full btn-outline">
                    Connect External Wallet
                  </button>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                  <h4 className="font-medium text-blue-900 mb-2">Network Info</h4>
                  <div className="text-sm text-blue-800 space-y-1">
                    <div>Network: Lisk Sepolia</div>
                    <div>Gas Price: ~0.001 ETH</div>
                    <div>Block Time: ~2 seconds</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Redeem Tab */}
        {activeTab === "redeem" && (
          <div className="space-y-8">
            <div className="glass-card p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Redeem TAKA Tokens</h3>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Available Balance</div>
                  <div className="text-2xl font-bold text-emerald-600">{userStats.takaTokensEarned} TAKA</div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {redeemOptions.map(option => (
                  <div key={option.id} className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                    option.available 
                      ? "border-emerald-200 bg-white/50 hover:border-emerald-300 hover:shadow-lg" 
                      : "border-gray-200 bg-gray-50/50 opacity-60"
                  }`}>
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">{option.name}</h4>
                      <div className="text-right">
                        <div className="text-lg font-bold text-emerald-600">{option.cost} TAKA</div>
                        <div className="text-xs text-gray-500">≈ ${(option.cost * 0.1).toFixed(2)}</div>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{option.description}</p>
                    <button 
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                        option.available && userStats.takaTokensEarned >= option.cost
                          ? "bg-emerald-500 text-white hover:bg-emerald-600"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      disabled={!option.available || userStats.takaTokensEarned < option.cost}
                    >
                      {!option.available ? "Coming Soon" : 
                       userStats.takaTokensEarned < option.cost ? "Insufficient Balance" : "Redeem Now"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;