"use client";

import { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import LoadingSpinner from './LoadingSpinner';

const QrReader = dynamic(() => import('react-qr-reader'), {
  ssr: false,
});

interface QRScannerProps {
  onScan: (data: string) => void;
  onClose: () => void;
  onRedemption?: (result: any) => void;
  collectorAddress?: string;
}

const QRScanner: FC<QRScannerProps> = ({ onScan, onClose, onRedemption, collectorAddress }) => {
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleScan = async (data: string | null) => {
    if (data && !isProcessing) {
      setIsProcessing(true);

      try {
        // First call the original onScan callback
        onScan(data);

        // If redemption callback is provided, process redemption
        if (onRedemption && collectorAddress) {
          const response = await fetch('/api/qr/redeem', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              qrData: data,
              collectorAddress,
            }),
          });

          const result = await response.json();

          if (result.success) {
            onRedemption(result.data);
            onClose(); // Close scanner after successful redemption
          } else {
            setError(result.error || 'Redemption failed');
          }
        }
      } catch (error) {
        console.error('Error processing scan:', error);
        setError('Error processing QR code');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleError = (err: any) => {
    setError('Error accessing camera. Please make sure you have granted camera permissions.');
    console.error(err);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg max-w-sm w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-green-800">Scan QR Code</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="relative">
          {error ? (
            <div className="text-red-500 text-center p-4">
              {error}
            </div>
          ) : (
            <QrReader
              onError={handleError}
              onScan={handleScan}
              style={{ width: '100%' }}
            />
          )}
        </div>
        
        <p className="text-sm text-gray-600 mt-4 text-center">
          Position the QR code within the frame to scan
        </p>
      </div>
    </div>
  );
};

export default QRScanner;
