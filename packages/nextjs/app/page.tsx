"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { ArrowRightIcon, GlobeAltIcon, CurrencyDollarIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { Logo } from "~~/components/Logo";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-teal-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center mb-8">
              <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                <Logo size={64} color="#059669" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Clean Earth,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                {" "}Earn Rewards
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join the revolution in waste management. Collect trash, earn TAKA tokens, and help build a sustainable future on the blockchain.
            </p>
            
            {connectedAddress ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <div className="glass-card px-6 py-3 rounded-full">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700">Connected:</span>
                    <Address address={connectedAddress} />
                  </div>
                </div>
                <Link href="/dashboard" className="btn-primary">
                  Go to Dashboard
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary">
                  Connect Wallet to Start
                  <ArrowRightIcon className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to make a difference</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow">
                <GlobeAltIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Collect Trash</h3>
              <p className="text-gray-600">Find and collect waste in your community. Every piece counts towards a cleaner environment.</p>
            </div>
            
            <div className="glass-card p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow">
                <CurrencyDollarIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Earn TAKA Tokens</h3>
              <p className="text-gray-600">Get rewarded with TAKA tokens for your environmental contributions. The more you collect, the more you earn.</p>
            </div>
            
            <div className="glass-card p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow">
                <ChartBarIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Track Progress</h3>
              <p className="text-gray-600">Monitor your impact with detailed analytics and compete with other eco-warriors globally.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
                To create a sustainable future by incentivizing environmental action through blockchain technology. 
                We believe that small actions, when multiplied by millions of people, can transform the world.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-emerald-300 rounded-full"></div>
                  <span className="text-emerald-100">Reduce global waste pollution</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-emerald-300 rounded-full"></div>
                  <span className="text-emerald-100">Empower communities worldwide</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-emerald-300 rounded-full"></div>
                  <span className="text-emerald-100">Create sustainable economic incentives</span>
                </div>
              </div>
            </div>
            
            <div className="glass-card-dark p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Our Values</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-emerald-200 mb-2">Transparency</h4>
                  <p className="text-emerald-100">All transactions and rewards are recorded on the blockchain for complete transparency.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-emerald-200 mb-2">Community</h4>
                  <p className="text-emerald-100">Building a global community of environmental stewards working together.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-emerald-200 mb-2">Impact</h4>
                  <p className="text-emerald-100">Measuring and maximizing real-world environmental impact through technology.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of eco-warriors already making an impact. Start collecting, start earning, start changing the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard" className="btn-primary">
              Start Collecting
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
            <Link href="/debug" className="btn-secondary">
              Explore Contracts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;