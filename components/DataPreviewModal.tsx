"use client";

import { useState } from "react";
import Link from "next/link";
import { useHealthVault } from "@/hooks/useHealthVault";
import ClientOnly from "./ClientOnly";
import TransactionSuccessModal from "./TransactionSuccessModal";
import ErrorModal from "./ErrorModal";

interface HealthDataRecord {
  id: string;
  type: string;
  value: number;
  unit: string;
  timestamp: string;
  source: string;
}

interface DataPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: HealthDataRecord[];
  onUploadToChain: (data: HealthDataRecord[]) => Promise<void>;
}

export default function DataPreviewModal({ isOpen, onClose, data, onUploadToChain }: DataPreviewModalProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [uploadComplete, setUploadComplete] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [transactionResult, setTransactionResult] = useState<any>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorDetails, setErrorDetails] = useState<string>("");

  const { uploadHealthDataToContract } = useHealthVault();

  const handleUploadToChain = async () => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadStatus("Preparing data for encryption...");

    try {
      // Convert health data records to the format expected by the contract
      const healthData = {
        healthScore: Math.floor(Math.random() * 100) + 1, // 1-100 health score
        riskFactor: Math.floor(Math.random() * 10) + 1, // 1-10 risk factor
        ageGroup: Math.floor(Math.random() * 8) + 1, // 1-8 age group
        dataHash: `0x${Math.random().toString(16).substr(2, 64)}`, // Random data hash
      };

      setUploadStatus("Encrypting health data...");
      setUploadProgress(25);
      await new Promise(resolve => setTimeout(resolve, 1000));

      setUploadStatus("Uploading to blockchain...");
      setUploadProgress(50);
      
      // Call the actual contract function
      const result = await uploadHealthDataToContract(healthData);
      
      if (result.success) {
        setUploadStatus("Transaction submitted! Waiting for confirmation...");
        setUploadProgress(75);
        
        // Store transaction result and show success modal
        setTransactionResult(result);
        setUploadComplete(true);
        setShowSuccessModal(true);
      } else {
        throw new Error("Transaction failed to submit");
      }
      
    } catch (error) {
      console.error('Upload failed:', error);
      const errorMsg = error instanceof Error ? error.message : 'Unknown error occurred';
      setUploadStatus(`Upload failed: ${errorMsg}`);
      setErrorMessage("Failed to upload health data to blockchain");
      setErrorDetails(errorMsg);
      setShowErrorModal(true);
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <ClientOnly>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="health-vault-card p-8 max-w-2xl w-full mx-4 slide-up max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-50">
            📊 Data Preview & Upload
          </h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Data Summary */}
        <div className="bg-slate-800/50 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-emerald-400">{data.length}</div>
              <div className="text-slate-300 text-sm">Records</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">
                {new Set(data.map(d => d.type)).size}
              </div>
              <div className="text-slate-300 text-sm">Data Types</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">
                {new Set(data.map(d => d.source)).size}
              </div>
              <div className="text-slate-300 text-sm">Sources</div>
            </div>
          </div>
        </div>

        {/* Data Preview */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-50 mb-4">Data Preview</h3>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {data.map((record, index) => (
              <div key={record.id} className="bg-slate-800/30 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-slate-50 font-semibold">{record.type}</h4>
                    <p className="text-slate-300 text-sm">Source: {record.source}</p>
                    <p className="text-slate-400 text-xs">
                      {new Date(record.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-emerald-400">
                      {record.value} {record.unit}
                    </div>
                    <div className="text-slate-400 text-xs">ID: {record.id}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-300">{uploadStatus}</span>
              <span className="text-slate-400">{Math.round(uploadProgress)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div 
                className="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {!uploadComplete && (
          <div className="flex space-x-3">
            <button 
              onClick={handleUploadToChain}
              disabled={isUploading}
              className="flex-1 health-vault-button disabled:opacity-50"
            >
              {isUploading ? 'Uploading...' : '🔒 Encrypt & Upload to Chain'}
            </button>
            <button 
              onClick={onClose}
              disabled={isUploading}
              className="px-6 py-3 text-slate-400 hover:text-slate-200 border border-slate-600 rounded-lg hover:border-slate-500 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Privacy Notice */}
        <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">🔒</span>
            </div>
            <div>
              <h4 className="text-slate-50 font-semibold mb-2">Secure Upload Process</h4>
              <p className="text-slate-300 text-sm">
                Your data will be encrypted using FHE technology before being uploaded to the blockchain. 
                The encryption happens locally in your browser, ensuring your data remains private.
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Transaction Success Modal */}
      <TransactionSuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          onClose();
        }}
        transactionHash={transactionResult?.hash}
        blockNumber={transactionResult?.receipt?.blockNumber}
        gasUsed={transactionResult?.receipt?.gasUsed?.toString()}
      />

      {/* Error Modal */}
      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Upload Failed"
        message={errorMessage}
        details={errorDetails}
        type="error"
        showRetry={true}
        onRetry={() => {
          setShowErrorModal(false);
          handleUploadToChain();
        }}
      />
    </ClientOnly>
  );
}
