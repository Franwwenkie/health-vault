"use client";

import { useState } from "react";
import Link from "next/link";
import ClientOnly from "./ClientOnly";

interface SyncCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  syncedData: {
    deviceName: string;
    recordCount: number;
    dataTypes: string[];
    lastSync: string;
  };
}

export default function SyncCompleteModal({ isOpen, onClose, syncedData }: SyncCompleteModalProps) {
  if (!isOpen) return null;

  return (
    <ClientOnly>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="health-vault-card p-8 max-w-md w-full mx-4 slide-up">
        <div className="text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 health-pulse">
            <span className="text-3xl">✅</span>
          </div>
          
          {/* Success Message */}
          <h2 className="text-2xl font-bold text-slate-50 mb-4">
            Sync Complete!
          </h2>
          <p className="text-slate-300 mb-6">
            Successfully synced data from <span className="text-emerald-400 font-semibold">{syncedData.deviceName}</span>
          </p>
          
          {/* Sync Summary */}
          <div className="bg-slate-800/50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">{syncedData.recordCount}</div>
                <div className="text-slate-300">Records Synced</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{syncedData.dataTypes.length}</div>
                <div className="text-slate-300">Data Types</div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-700">
              <div className="text-slate-300 text-sm">
                <div className="font-semibold mb-2">Data Types:</div>
                <div className="flex flex-wrap gap-1">
                  {syncedData.dataTypes.map((type, index) => (
                    <span key={index} className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-3">
            <Link 
              href="/dashboard" 
              className="health-vault-button w-full text-center block"
              onClick={onClose}
            >
              📊 View Data Dashboard
            </Link>
            <button 
              onClick={onClose}
              className="w-full px-4 py-2 text-slate-400 hover:text-slate-200 border border-slate-600 rounded-lg hover:border-slate-500 transition-colors"
            >
              Continue Syncing
            </button>
          </div>
          
          {/* Privacy Notice */}
          <div className="mt-6 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
            <div className="flex items-center space-x-2 text-sm text-emerald-300">
              <span>🔒</span>
              <span>Your data is encrypted and ready for blockchain upload</span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </ClientOnly>
  );
}
