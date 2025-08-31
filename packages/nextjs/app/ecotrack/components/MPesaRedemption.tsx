"use client";

import { FC, useState } from 'react';
import { useAccount } from 'wagmi';
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import LoadingSpinner from './LoadingSpinner';

interface MPesaRedemptionProps {
  ecoTokenContract: any;
}

const MPesaRedemption: FC<MPesaRedemptionProps> = ({ ecoTokenContract }) => {
  const { address } = useAccount();
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const { data: balance } = useScaffoldContractRead({
    contractName: "EcoToken",
    functionName: "balanceOf",
    args: [address],
  });

  const { writeAsync: redeemTokens } = useScaffoldContractWrite({
    contractName: "EcoToken",
    functionName: "redeem",
    args: [amount, phoneNumber],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      await redeemTokens();
      setMessage({
        type: 'success',
        text: `Successfully initiated redemption of ${amount} ECO to ${phoneNumber}`
      });
      setAmount('');
      setPhoneNumber('');
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to redeem tokens. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const maxAmount = balance ? Number(balance.toString()) : 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
      <h2 className="text-2xl font-semibold text-green-800 mb-4">Redeem ECO Tokens</h2>
      <div className="mb-6 p-4 bg-green-50 rounded-lg">
        <p className="text-green-700">Available Balance: {maxAmount} ECO</p>
        <p className="text-sm text-green-600">1 ECO = 100 KES</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-green-700 mb-1">
            M-Pesa Phone Number
          </label>
          <input
            id="phoneNumber"
            type="tel"
            pattern="^254[0-9]{9}$"
            placeholder="254XXXXXXXXX"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <p className="mt-1 text-sm text-gray-500">Format: 254XXXXXXXXX</p>
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-green-700 mb-1">
            Amount (ECO)
          </label>
          <input
            id="amount"
            type="number"
            min="1"
            max={maxAmount}
            step="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            Equivalent to {Number(amount || 0) * 100} KES
          </p>
        </div>

        {message && (
          <div className={`p-4 rounded-md ${
            message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !amount || !phoneNumber || Number(amount) > maxAmount}
          className="w-full px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <LoadingSpinner size={16} />
              <span>Processing...</span>
            </>
          ) : (
            <span>Redeem Tokens</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default MPesaRedemption;
