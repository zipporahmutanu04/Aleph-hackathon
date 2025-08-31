"use client";

import { FC } from "react";

interface LoadingSpinnerProps {
  size?: number | "sm" | "md" | "lg";
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ size = "md" }) => {
  const getSize = (size: number | "sm" | "md" | "lg") => {
    if (typeof size === "number") {
      return `w-[${size}px] h-[${size}px]`;
    }

    switch (size) {
      case "sm":
        return "w-4 h-4";
      case "md":
        return "w-8 h-8";
      case "lg":
        return "w-12 h-12";
      default:
        return "w-8 h-8";
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${getSize(size)} animate-spin rounded-full border-4 border-green-200 border-t-green-600`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
