"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { 
  MapPinIcon, 
  ClockIcon, 
  CurrencyDollarIcon,
  CheckCircleIcon,
  StarIcon
} from "@heroicons/react/24/outline";

const Missions: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [selectedMission, setSelectedMission] = useState<number | null>(null);

  const missions = [
    {
      id: 1,
      title: "Beach Cleanup Challenge",
      description: "Clean up plastic waste from local beaches and waterways",
      location: "Coastal Areas",
      duration: "2 hours",
      reward: 200,
      difficulty: "Easy",
      participants: 156,
      status: "active",
      requirements: ["Bring collection bags", "Take before/after photos", "Log GPS coordinates"]
    },
    {
      id: 2,
      title: "Urban Waste Warriors",
      description: "Target high-traffic urban areas for maximum impact",
      location: "City Centers",
      duration: "3 hours",
      reward: 350,
      difficulty: "Medium",
      participants: 89,
      status: "active",
      requirements: ["Safety vest required", "Work in teams of 2+", "Document waste types"]
    },
    {
      id: 3,
      title: "Park Restoration Project",
      description: "Comprehensive cleanup and restoration of public parks",
      location: "Public Parks",
      duration: "4 hours",
      reward: 500,
      difficulty: "Hard",
      participants: 234,
      status: "completed",
      requirements: ["Full day commitment", "Bring tools", "Community coordination"]
    },
    {
      id: 4,
      title: "River Guardian Initiative",
      description: "Protect waterways by removing debris and pollutants",
      location: "Rivers & Streams",
      duration: "3 hours",
      reward: 400,
      difficulty: "Medium",
      participants: 67,
      status: "upcoming",
      requirements: ["Water safety training", "Specialized equipment", "Environmental monitoring"]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "text-green-600 bg-green-100";
      case "Medium": return "text-yellow-600 bg-yellow-100";
      case "Hard": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-emerald-600 bg-emerald-100";
      case "completed": return "text-gray-600 bg-gray-100";
      case "upcoming": return "text-blue-600 bg-blue-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  if (!connectedAddress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="glass-card p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Your Wallet</h2>
          <p className="text-gray-600 mb-6">Please connect your wallet to view available missions</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="glass-card p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Missions</h1>
          <p className="text-gray-600">Choose your next environmental mission and start earning TAKA tokens</p>
        </div>

        {/* Missions Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {missions.map(mission => (
              <div 
                key={mission.id} 
                className={`glass-card p-6 cursor-pointer transition-all duration-300 hover:scale-102 ${
                  selectedMission === mission.id ? "ring-2 ring-emerald-500 bg-white/90" : ""
                }`}
                onClick={() => setSelectedMission(mission.id)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{mission.title}</h3>
                    <p className="text-gray-600 text-sm">{mission.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(mission.status)}`}>
                      {mission.status.charAt(0).toUpperCase() + mission.status.slice(1)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(mission.difficulty)}`}>
                      {mission.difficulty}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPinIcon className="w-4 h-4" />
                    {mission.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ClockIcon className="w-4 h-4" />
                    {mission.duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                    <CurrencyDollarIcon className="w-4 h-4" />
                    {mission.reward} TAKA
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <StarIcon className="w-4 h-4" />
                    {mission.participants} participants
                  </div>
                </div>
                
                <button 
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    mission.status === "active" 
                      ? "bg-emerald-500 text-white hover:bg-emerald-600" 
                      : mission.status === "completed"
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                  disabled={mission.status === "completed"}
                >
                  {mission.status === "active" ? "Join Mission" : 
                   mission.status === "completed" ? "Completed" : "Coming Soon"}
                </button>
              </div>
            ))}
          </div>

          {/* Mission Details */}
          <div className="lg:sticky lg:top-8">
            {selectedMission ? (
              <div className="glass-card p-6">
                {(() => {
                  const mission = missions.find(m => m.id === selectedMission);
                  if (!mission) return null;
                  
                  return (
                    <>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{mission.title}</h3>
                      <p className="text-gray-600 mb-6">{mission.description}</p>
                      
                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Reward:</span>
                          <span className="font-bold text-emerald-600">{mission.reward} TAKA</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">{mission.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Location:</span>
                          <span className="font-medium">{mission.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Participants:</span>
                          <span className="font-medium">{mission.participants}</span>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Requirements:</h4>
                        <ul className="space-y-2">
                          {mission.requirements.map((req, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                              <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <button 
                        className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-200 ${
                          mission.status === "active" 
                            ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-xl" 
                            : mission.status === "completed"
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600"
                        }`}
                        disabled={mission.status === "completed"}
                      >
                        {mission.status === "active" ? "Start Mission" : 
                         mission.status === "completed" ? "Mission Completed" : "Notify When Available"}
                      </button>
                    </>
                  );
                })()}
              </div>
            ) : (
              <div className="glass-card p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Select a Mission</h3>
                <p className="text-gray-600">Click on any mission to view details and requirements</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Missions;