"use client";

import { FC } from 'react';
import { useEcoSystem } from "~~/hooks/useEcoSystem";
import { formatEther } from "ethers";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ImpactDashboardProps {}

const ImpactDashboard: FC<ImpactDashboardProps> = () => {
  const { userStats, systemStats } = useEcoSystem();

  const weeklyData = systemStats ? [
    systemStats.totalWasteCollected.div(7),
    systemStats.totalWasteCollected.div(6),
    systemStats.totalWasteCollected.div(5),
    systemStats.totalWasteCollected.div(4),
    systemStats.totalWasteCollected.div(3),
    systemStats.totalWasteCollected.div(2),
    systemStats.totalWasteCollected
  ].map(n => Number(formatEther(n))) : [];

  const lineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Weekly Collections (kg)',
        data: weeklyData,
        borderColor: 'rgb(22, 163, 74)',
        backgroundColor: 'rgba(22, 163, 74, 0.5)',
      },
    ],
  };

  const doughnutData = {
    labels: ['Tokens Minted', 'Tokens Redeemed', 'Available Supply'],
    datasets: [
      {
        data: systemStats ? [
          Number(formatEther(systemStats.totalTokensMinted)),
          Number(formatEther(systemStats.totalTokensMinted.sub(userStats?.tokenBalance || 0))),
          Number(formatEther(userStats?.tokenBalance || 0))
        ] : [0, 0, 0],
        backgroundColor: [
          'rgba(22, 163, 74, 0.8)',
          'rgba(234, 179, 8, 0.8)',
          'rgba(59, 130, 246, 0.8)',
        ],
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Impact Statistics */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
        <h3 className="text-xl font-semibold text-green-800 mb-4">Impact Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-600">Total Waste Collected</p>
            <p className="text-2xl font-bold text-green-800">
              {systemStats ? formatEther(systemStats.totalWasteCollected) : "0"} kg
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-600">Active Collectors</p>
            <p className="text-2xl font-bold text-green-800">{systemStats?.totalCollectors || "0"}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-600">Your Token Balance</p>
            <p className="text-2xl font-bold text-green-800">
              {userStats ? formatEther(userStats.tokenBalance) : "0"} ECO
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-600">ECO Tokens Minted</p>
            <p className="text-2xl font-bold text-green-800">{systemStats ? formatEther(systemStats.totalTokensMinted) : "0"}</p>
          </div>
        </div>
      </div>

      {/* Weekly Collections Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
        <h3 className="text-xl font-semibold text-green-800 mb-4">Weekly Collections</h3>
        <Line data={lineChartData} options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }} />
      </div>

      {/* Waste Type Distribution */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 lg:col-span-2">
        <h3 className="text-xl font-semibold text-green-800 mb-4">Waste Type Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="aspect-square">
            <Doughnut data={doughnutData} options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                },
              },
            }} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-600">Plastic</p>
              <p className="text-2xl font-bold text-green-800">{systemStats?.wasteTypes.plastic || 0}kg</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-600">Paper</p>
              <p className="text-2xl font-bold text-yellow-800">{systemStats?.wasteTypes.paper || 0}kg</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600">Glass</p>
              <p className="text-2xl font-bold text-blue-800">{systemStats?.wasteTypes.glass || 0}kg</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-red-600">Metal</p>
              <p className="text-2xl font-bold text-red-800">{systemStats?.wasteTypes.metal || 0}kg</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactDashboard;
