"use client";

import { FC } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface CollectionFormProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  qrCode: string;
  setQrCode: (value: string) => void;
  citizenAddress: string;
  setCitizenAddress: (value: string) => void;
  wasteAmount: string;
  setWasteAmount: (value: string) => void;
}

const CollectionForm: FC<CollectionFormProps> = ({
  isLoading,
  setIsLoading,
  onSubmit,
  qrCode,
  setQrCode,
  citizenAddress,
  setCitizenAddress,
  wasteAmount,
  setWasteAmount,
}) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'qrCode':
        setQrCode(value);
        break;
      case 'citizenAddress':
        setCitizenAddress(value);
        break;
      case 'wasteAmount':
        setWasteAmount(value);
        break;
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
      <h2 className="text-2xl font-semibold text-green-800 mb-6">Record New Collection</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label htmlFor="qrCode" className="block text-sm font-medium text-green-700 mb-1">
              QR Code
            </label>
            <input
              id="qrCode"
              name="qrCode"
              type="text"
              value={qrCode}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="citizenAddress" className="block text-sm font-medium text-green-700 mb-1">
              Citizen Address
            </label>
            <input
              id="citizenAddress"
              name="citizenAddress"
              type="text"
              value={citizenAddress}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="wasteAmount" className="block text-sm font-medium text-green-700 mb-1">
              Waste Amount (kg)
            </label>
            <input
              id="wasteAmount"
              name="wasteAmount"
              type="number"
              value={wasteAmount}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                <span>Recording...</span>
              </>
            ) : (
              "Record Collection"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CollectionForm;
