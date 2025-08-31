"use client";

import { FC, useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useAccount } from 'wagmi';
import { formatEther } from 'ethers';

interface QRCodeGeneratorProps {
  amount?: string;
  onGenerate?: (qrData: string) => void;
}

const QRCodeGenerator: FC<QRCodeGeneratorProps> = ({ amount = "0", onGenerate }) => {
  const { address } = useAccount();
  const [qrData, setQrData] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (address) {
      generateQRCode();
    }
  }, [address, amount]);

  const generateQRCode = async () => {
    if (!address) return;

    setIsGenerating(true);

    try {
      // Call API to generate QR code
      const response = await fetch('/api/qr/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userAddress: address,
          amount: amount,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setQrData(result.qrData);
        if (onGenerate) {
          onGenerate(result.qrData);
        }
      } else {
        console.error('Error generating QR code:', result.error);
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!address) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-600">Please connect your wallet to generate QR code</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
      <h3 className="text-xl font-semibold text-green-800 mb-4 text-center">
        Your Redemption QR Code
      </h3>

      <div className="flex flex-col items-center space-y-4">
        {isGenerating ? (
          <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : qrData ? (
          <div className="p-4 bg-white rounded-lg border-2 border-green-200">
            <QRCodeSVG
              value={qrData}
              size={256}
              level="H"
              includeMargin={true}
              className="rounded-lg"
            />
          </div>
        ) : null}

        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">
            Amount to Redeem: <span className="font-semibold text-green-600">{amount} ECO</span>
          </p>
          <p className="text-xs text-gray-500">
            Scan this QR code at collection points to redeem your tokens
          </p>
        </div>

        <button
          onClick={generateQRCode}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Regenerate QR Code'}
        </button>
      </div>
    </div>
  );
};

export default QRCodeGenerator;