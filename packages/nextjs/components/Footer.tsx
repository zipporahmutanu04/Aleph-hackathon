import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { hardhat } from "viem/chains";
import { MagnifyingGlassIcon, HeartIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { Faucet } from "~~/components/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { EcoTrackLogo } from "./EcoTrackLogo";

/**
 * Site footer
 */
export const Footer = () => {
  const { targetNetwork } = useTargetNetwork();
  const pathname = usePathname();
  const isLocalNetwork = targetNetwork.id === hardhat.id;
  const isEcoTrack = pathname.startsWith('/ecotrack');

  return (
    <footer className={`min-h-0 py-12 px-4 mb-11 lg:mb-0 border-t ${
      isEcoTrack ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-200' : 'border-[#252442]'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and Mission */}
          <div className="flex flex-col items-center md:items-start lg:col-span-1">
            {isEcoTrack ? (
              <EcoTrackLogo width={64} height={64} />
            ) : (
              <div className="text-3xl font-bold text-primary">Scaffold-Lisk</div>
            )}
            <div className="mt-4 text-center md:text-left">
              <h3 className="font-semibold text-gray-800 mb-2">Our Mission</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {isEcoTrack
                  ? 'Revolutionizing waste management through blockchain technology, creating sustainable communities and rewarding environmental stewardship.'
                  : 'Empowering developers with cutting-edge Ethereum tools to build the decentralized future.'
                }
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-gray-800 mb-4">Core Values</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Sustainability First
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Community Empowerment
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Transparency & Trust
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Innovation & Technology
              </li>
            </ul>
          </div>

          {/* Quick Links & Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
            <div className="flex flex-col space-y-2 mb-6">
              <Link href="/" className="text-sm text-gray-600 hover:text-primary transition-colors">
                Home
              </Link>
              {isEcoTrack && (
                <Link href="/ecotrack" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  EcoTrack Dashboard
                </Link>
              )}
              <Link href="/debug" className="text-sm text-gray-600 hover:text-primary transition-colors">
                Debug Contracts
              </Link>
              {isLocalNetwork && (
                <Link href="/blockexplorer" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Block Explorer
                </Link>
              )}
            </div>

            <h3 className="font-semibold text-gray-800 mb-4">Contact</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>📧 info@ecotrack.com</p>
              <p>📱 +254 700 000 000</p>
              <p>📍 Nairobi, Kenya</p>
            </div>
          </div>

          {/* Community & Impact */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-gray-800 mb-4">Community</h3>
            <div className="flex flex-col space-y-2 mb-6">
              <a
                href="https://github.com/LiskHQ/scaffold-lisk"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-gray-600 hover:text-primary transition-colors flex items-center gap-2"
              >
                <GlobeAltIcon className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://discord.com/invite/7EKWJ7b"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-gray-600 hover:text-primary transition-colors flex items-center gap-2"
              >
                <HeartIcon className="h-4 w-4" />
                Discord
              </a>
              <a
                href="https://twitter.com/ecotrack"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-gray-600 hover:text-primary transition-colors flex items-center gap-2"
              >
                🐦 Twitter
              </a>
            </div>

            {isEcoTrack && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Environmental Impact</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">10K+</div>
                    <div className="text-xs text-gray-600">Tons Recycled</div>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">500+</div>
                    <div className="text-xs text-gray-600">Active Collectors</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Developer Tools Section */}
        {isLocalNetwork && (
          <div className="border-t border-gray-200 pt-6 mb-6">
            <div className="flex flex-wrap justify-center gap-4">
              <Faucet />
              <Link href="/blockexplorer" passHref className="btn btn-primary btn-sm font-normal gap-1">
                <MagnifyingGlassIcon className="h-4 w-4" />
                <span>Block Explorer</span>
              </Link>
            </div>
          </div>
        )}

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 text-center md:text-left">
              © 2024 {isEcoTrack ? 'EcoTrack' : 'Scaffold-Lisk'}.
              {isEcoTrack ? ' Building a greener tomorrow through technology.' : ' Built with ❤️ for the decentralized future.'}
            </p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <span className="text-sm text-gray-500">Privacy Policy</span>
              <span className="text-sm text-gray-500">Terms of Service</span>
              <span className="text-sm text-gray-500">Cookie Policy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
