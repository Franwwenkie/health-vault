"use client";

import { useState } from "react";
import Link from "next/link";
import ClientOnly from "./ClientOnly";

interface TransactionSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionHash?: string;
  blockNumber?: number;
  gasUsed?: string;
}

export default function TransactionSuccessModal({ 
  isOpen, 
  onClose, 
  transactionHash,
  blockNumber,
  gasUsed 
}: TransactionSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <ClientOnly>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
        <div className="health-vault-card p-8 max-w-2xl w-full mx-4 slide-up">
          {/* Success Animation */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 health-pulse">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold text-slate-50 mb-4">
              🎉 Transaction Successful!
            </h2>
            <p className="text-slate-300 text-lg mb-6">
              Your health data has been successfully encrypted and uploaded to the blockchain.
            </p>
          </div>

          {/* Transaction Details */}
          <div className="bg-slate-800/50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-slate-50 mb-4 flex items-center">
              <span className="mr-2">📋</span>
              Transaction Details
            </h3>
            
            <div className="space-y-4">
              {transactionHash && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <span className="text-slate-300 font-medium">Transaction Hash:</span>
                  <div className="flex items-center space-x-2 mt-1 sm:mt-0">
                    <code className="text-emerald-400 font-mono text-sm bg-slate-900/50 px-3 py-1 rounded">
                      {transactionHash.slice(0, 10)}...{transactionHash.slice(-8)}
                    </code>
                    <button
                      onClick={() => navigator.clipboard.writeText(transactionHash)}
                      className="text-slate-400 hover:text-slate-200 transition-colors"
                      title="Copy full hash"
                    >
                      📋
                    </button>
                  </div>
                </div>
              )}
              
              {blockNumber && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <span className="text-slate-300 font-medium">Block Number:</span>
                  <span className="text-slate-50 font-mono">{blockNumber.toLocaleString()}</span>
                </div>
              )}
              
              {gasUsed && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <span className="text-slate-300 font-medium">Gas Used:</span>
                  <span className="text-slate-50 font-mono">{gasUsed}</span>
                </div>
              )}
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 mb-8">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-emerald-400 text-lg">🔐</span>
              </div>
              <div>
                <h4 className="text-emerald-400 font-semibold mb-2">Data Secured with FHE</h4>
                <p className="text-slate-300 text-sm">
                  Your health data is now encrypted using Fully Homomorphic Encryption (FHE) 
                  and stored on the blockchain. Even we cannot see your personal health information.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/dashboard" 
              className="flex-1 health-vault-button text-center block py-4 text-lg"
              onClick={onClose}
            >
              📊 View Dashboard
            </Link>
            <Link 
              href="/mining" 
              className="flex-1 health-vault-button-secondary text-center block py-4 text-lg"
              onClick={onClose}
            >
              ⛏️ Start Mining
            </Link>
            <button 
              onClick={onClose}
              className="px-8 py-4 text-slate-400 hover:text-slate-200 border border-slate-600 rounded-lg hover:border-slate-500 transition-colors"
            >
              Close
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-700/50 text-center">
            <p className="text-slate-400 text-sm">
              Powered by <span className="text-emerald-400 font-semibold">ZAMA FHE Technology</span>
            </p>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
}
