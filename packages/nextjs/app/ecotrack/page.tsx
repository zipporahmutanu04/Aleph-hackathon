"use client";

import { useAccount } from "wagmi";
import { useState, FormEvent } from "react";
import { useScaffoldContract, useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import CollectionForm from "./components/CollectionForm";
import LoadingSpinner from "./components/LoadingSpinner";
import StatsCard from "./components/StatsCard";
import MPesaRedemption from "./components/MPesaRedemption";
import ImpactDashboard from "./components/ImpactDashboard";
import QRCodeGenerator from "./components/QRCodeGenerator";

// TODO: Move these interfaces to a separate types file
type CollectorData = [string, boolean, bigint];

interface CollectorInfo {
  name: string;
  active: boolean;
  totalCollected: bigint;
}

const formatCollectorData = (data: CollectorData): CollectorInfo => {
  const [name, active, totalCollected] = data;
  return { name, active, totalCollected };
};

export default function EcoTrackPage() {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [citizenAddress, setCitizenAddress] = useState("");
  const [wasteAmount, setWasteAmount] = useState("");

  const { data: ecoTokenContract } = useScaffoldContract({
    contractName: "EcoToken",
  });

  const { data: wasteManagementContract } = useScaffoldContract({
    contractName: "WasteManagement",
  });

  const { data: collectorData, isLoading: isLoadingCollector } = useScaffoldContractRead({
    contractName: "WasteManagement",
    functionName: "collectors",
    args: [address],
  });

  const collectorInfo = collectorData ? formatCollectorData(collectorData as CollectorData) : null;

  const { writeAsync: recordCollection } = useScaffoldContractWrite({
    contractName: "WasteManagement",
    functionName: "recordCollection",
    args: [qrCode, citizenAddress, wasteAmount],
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await recordCollection();
      // Reset form
      setQrCode("");
      setWasteAmount("");
      setCitizenAddress("");
    } catch (error) {
      console.error("Error recording collection:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!address) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-b from-green-50 to-white">
        <h1 className="text-4xl font-bold text-green-800 mb-4">Welcome to EcoTrack</h1>
        <p className="text-lg text-green-600 mb-8">Please connect your wallet to continue</p>
        <div className="p-4 bg-green-50 rounded-lg border border-green-200 text-green-700">
          Connect your wallet using the button in the top right
        </div>
      </div>
    );
  }

  return (
    <div className="bg-green-50 min-h-screen">
      {/* Header */}
      <header className="bg-green-800 text-white py-4 px-6 flex justify-between items-center">
        <div className="text-xl font-bold">Taka</div>
        <nav className="flex space-x-4">
          <a href="/dashboard" className="hover:underline">Dashboard</a>
          <a href="/stations" className="hover:underline">Stations</a>
          <a href="/marketplace" className="hover:underline">Marketplace</a>
          <a href="/community" className="hover:underline">Community</a>
        </nav>
        <div className="bg-white text-green-800 px-4 py-2 rounded-full">User</div>
      </header>

      {/* Main Section */}
      <main className="px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-800">Collection</h1>
          <p className="text-green-600">Find the nearest collection points to deposit your recyclable materials and earn TAKA tokens.</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 text-center">
            <p className="text-green-600">Nearest Station</p>
            <p className="text-2xl font-bold text-green-800">0.8 km</p>
            <p className="text-green-600">EcoHub Central</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 text-center">
            <p className="text-green-600">Open Stations</p>
            <p className="text-2xl font-bold text-green-800">12</p>
            <p className="text-green-600">Available now</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 text-center">
            <p className="text-green-600">Average Rating</p>
            <p className="text-2xl font-bold text-green-800">4.7★</p>
            <p className="text-green-600">User satisfaction</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-center space-x-4 mb-8">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">All Stations</button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Open</button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Closed</button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Full</button>
        </div>

        {/* Station List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
            <p className="text-green-800 font-bold">EcoHub Central</p>
            <p className="text-green-600">123 Recycleway Ave, Green District</p>
            <p className="text-green-600">0.8 km away</p>
            <p className="text-green-600">Hours: 6:00 AM - 10:00 PM</p>
            <p className="text-green-600">Accepts: Plastic, Glass, Metal, Paper</p>
            <p className="text-green-600">Status: Open</p>
            <p className="text-green-600">Rating: 4.8</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
            <p className="text-green-800 font-bold">Sustainable Solutions Hub</p>
            <p className="text-green-600">456 Green Street, Eco Valley</p>
            <p className="text-green-600">1.2 km away</p>
            <p className="text-green-600">Hours: 24/7</p>
            <p className="text-green-600">Accepts: Plastic, Glass, Metal, Paper</p>
            <p className="text-green-600">Status: Open</p>
            <p className="text-green-600">Rating: 4.6</p>
          </div>
        </div>
      </main>
    </div>
  );
}
