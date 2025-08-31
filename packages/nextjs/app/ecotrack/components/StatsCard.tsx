"use client";

import { FC } from "react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatsCard: FC<StatsCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-green-600">{title}</p>
          <p className="text-2xl font-semibold text-green-900 mt-1">{value}</p>
        </div>
        <div className="bg-green-50 p-3 rounded-full">{icon}</div>
      </div>
    </div>
  );
};

export default StatsCard;
