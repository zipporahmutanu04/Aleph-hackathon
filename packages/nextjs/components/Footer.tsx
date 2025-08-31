import React from "react";
import Link from "next/link";
import { hardhat } from "viem/chains";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Faucet } from "~~/components/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";

/**
 * Site footer
 */
export const Footer = () => {
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;

  return (
    <footer className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-12 mt-20">
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Logo size={32} color="#FFFFFF" />
                <span className="text-xl font-bold">EcoChain</span>
              </div>
              <p className="text-emerald-100 text-sm">
                Building a sustainable future through blockchain technology and community action.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-emerald-100">
                <li><a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
                <li><a href="/missions" className="hover:text-white transition-colors">Missions</a></li>
                <li><a href="/leaderboard" className="hover:text-white transition-colors">Leaderboard</a></li>
                <li><a href="/rewards" className="hover:text-white transition-colors">Rewards</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-emerald-100">
                <li><a href="/docs" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="/api" className="hover:text-white transition-colors">API</a></li>
                <li><a href="/support" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-emerald-100">
                <li><a href="https://discord.com/invite/7EKWJ7b" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Discord</a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="https://github.com/LiskHQ/scaffold-lisk" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-emerald-500/30 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-emerald-100">
                © 2025 EcoChain. Built for Aleph Hackathon. All rights reserved.
              </div>
              <div className="flex gap-4">
            {isLocalNetwork && (
              <div className="flex gap-2">
                <div className="pointer-events-auto">
                  <Faucet />
                </div>
                <Link href="/blockexplorer" passHref className="btn btn-sm bg-white/20 text-white border-white/30 hover:bg-white/30">
                  <MagnifyingGlassIcon className="h-4 w-4" />
                  <span>Explorer</span>
                </Link>
              </div>
            )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
