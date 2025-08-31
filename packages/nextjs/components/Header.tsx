"use client";

import React, { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { EcoTrackLogo } from "./EcoTrackLogo";
import { Bars3Icon, BugAntIcon, HomeIcon } from "@heroicons/react/24/outline";
import {
  DappConsoleButton,
  FaucetButton,
  RainbowKitCustomConnectButton,
  SuperchainFaucetButton,
} from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";
import { cn } from "~~/utils/cn";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Home",
    href: "/",
    icon: <HomeIcon className="h-4 w-4" />,
  },
  {
    label: "EcoTrack",
    href: "/ecotrack",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
  },
  {
    label: "Debug Contracts",
    href: "/debug",
    icon: <BugAntIcon className="h-4 w-4" />,
  },
];

export const HeaderMenuLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {menuLinks.map(({ label, href, icon }) => {
        const isActive = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              passHref
              className={cn(
                "relative flex items-center justify-between px-4 py-2 text-sm transition-colors duration-200",
                isActive ? "bg-base-100 primary-content" : "text-slate-400",
              )}
            >
              {icon}
              {label}
            </Link>
          </li>
        );
      })}
    </>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isEcoTrack = pathname.startsWith('/ecotrack');

  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  return (
    <header className={`sticky lg:static top-0 navbar min-h-0 flex-shrink-0 justify-between z-20 px-0 sm:px-2 border-b ${
      isEcoTrack
        ? 'bg-gradient-to-r from-green-600 to-green-800 shadow-lg'
        : 'bg-base-900 border-[#252442]'
    }`}>
      <div className="navbar-start w-auto lg:w-1/2">
        <div className="lg:hidden dropdown" ref={burgerMenuRef}>
          <label
            tabIndex={0}
            className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"}`}
            onClick={() => {
              setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
            }}
          >
            <Bars3Icon className="h-1/2" />
          </label>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              <HeaderMenuLinks />
            </ul>
          )}
        </div>
        <Link href="/" passHref className="hidden lg:flex items-center gap-2 ml-4 mr-6 shrink-0">
          <div className="flex relative">
            {isEcoTrack ? <EcoTrackLogo width={32} height={32} /> : <Logo size={24} />}
          </div>
          <div className="flex flex-col">
            <span className={`font-bold leading-tight ${isEcoTrack ? 'text-white' : ''}`}>
              {isEcoTrack ? 'EcoTrack' : 'Scaffold-Lisk'}
            </span>
            <span className={`text-xs ${isEcoTrack ? 'text-green-100' : ''}`}>
              {isEcoTrack ? 'Sustainable Waste Management' : 'Ethereum dev stack'}
            </span>
          </div>
        </Link>
        <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">
          <HeaderMenuLinks />
        </ul>
      </div>
      <div className="navbar-end flex-grow mr-4">
        <RainbowKitCustomConnectButton />
        <FaucetButton />
        <SuperchainFaucetButton />
        <DappConsoleButton />
      </div>
    </header>
  );
};
