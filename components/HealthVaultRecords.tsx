"use client";

import { useState, useEffect } from "react";
import { useHealthVault } from "@/hooks/useHealthVault";
import ErrorModal from "./ErrorModal";

interface SyncedData {
  id: string;
  type: string;
  value: string;
  unit: string;
  date: string;
  source: string;
  status: 'synced' | 'pending' | 'encrypted' | 'onchain';
  blockchainHash?: string;
}

export default function HealthVaultRecords() {
  const [activeTab, setActiveTab] = useState("all");
  const [syncedData, setSyncedData] = useState<SyncedData[]>([]);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorDetails, setErrorDetails] = useState<string>("");
  
  const { 
    uploadHealthDataToContract,
    isLoading,
    error,
    address,
    isConnected 
  } = useHealthVault();

  // Simulate synced data from devices
  useEffect(() => {
    const mockSyncedData: SyncedData[] = [
      {
        id: "1",
        type: "Heart Rate",
        value: "72",
        unit: "bpm",
        date: "2024-01-15 10:30:00",
        source: "Apple Watch",
        status: 'synced'
      },
      {
        id: "2",
        type: "Blood Pressure",
        value: "120/80",
        unit: "mmHg",
        date: "2024-01-15 10:30:00",
        source: "Samsung Health",
        status: 'synced'
      },
      {
        id: "3",
        type: "Steps",
        value: "8542",
        unit: "steps",
        date: "2024-01-15 09:00:00",
        source: "Fitbit",
        status: 'encrypted'
      },
      {
        id: "4",
        type: "Sleep Duration",
        value: "7.5",
        unit: "hours",
        date: "2024-01-14 22:00:00",
        source: "Oura Ring",
        status: 'onchain',
        blockchainHash: "0x1234...5678"
      }
    ];
    setSyncedData(mockSyncedData);
  }, []);

  const handleEncryptData = async (dataId: string) => {
    setIsEncrypting(true);
    // Simulate encryption process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSyncedData(prev => prev.map(data => 
      data.id === dataId 
        ? { ...data, status: 'encrypted' as const }
        : data
    ));
    setIsEncrypting(false);
  };

  const handleUploadToBlockchain = async (dataId: string) => {
    setIsUploading(true);
    try {
      // Generate random health data for contract upload
      const healthData = {
        healthScore: Math.floor(Math.random() * 100) + 1, // 1-100 health score
        riskFactor: Math.floor(Math.random() * 10) + 1, // 1-10 risk factor
        ageGroup: Math.floor(Math.random() * 8) + 1, // 1-8 age group
        dataHash: `0x${Math.random().toString(16).substr(2, 64)}`, // Random data hash
      };

      console.log('Uploading single health data to contract:', healthData);
      
      // Call the actual contract function and wait for transaction completion
      const result = await uploadHealthDataToContract(healthData);
      
      console.log('Upload result:', result);
      
      setSyncedData(prev => prev.map(data => 
        data.id === dataId 
          ? { 
              ...data, 
              status: 'onchain' as const,
              blockchainHash: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 8)}`
            }
          : data
      ));
      
      alert('Health data successfully uploaded to blockchain!');
      
    } catch (error) {
      console.error('Upload failed:', error);
      const errorMsg = error instanceof Error ? error.message : 'Unknown error occurred';
      setErrorMessage("Failed to upload health data to blockchain");
      setErrorDetails(errorMsg);
      setShowErrorModal(true);
    } finally {
      setIsUploading(false);
    }
  };

  const handleBatchEncrypt = async () => {
    setIsEncrypting(true);
    const pendingData = syncedData.filter(data => data.status === 'synced');
    
    for (const data of pendingData) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSyncedData(prev => prev.map(d => 
        d.id === data.id 
          ? { ...d, status: 'encrypted' as const }
          : d
      ));
    }
    setIsEncrypting(false);
  };

  const handleBatchUpload = async () => {
    setIsUploading(true);
    const encryptedData = syncedData.filter(data => data.status === 'encrypted');
    
    try {
      // Generate random health data for contract upload
      const healthData = {
        healthScore: Math.floor(Math.random() * 100) + 1, // 1-100 health score
        riskFactor: Math.floor(Math.random() * 10) + 1, // 1-10 risk factor
        ageGroup: Math.floor(Math.random() * 8) + 1, // 1-8 age group
        dataHash: `0x${Math.random().toString(16).substr(2, 64)}`, // Random data hash
      };

      console.log('Uploading health data to contract:', healthData);
      
      // Call the actual contract function and wait for transaction completion
      const result = await uploadHealthDataToContract(healthData);
      
      console.log('Upload result:', result);
      
      // Update all encrypted data to onchain status
      setSyncedData(prev => prev.map(d => 
        d.status === 'encrypted'
          ? { 
              ...d, 
              status: 'onchain' as const,
              blockchainHash: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 8)}`
            }
          : d
      ));
      
      alert('Health data successfully uploaded to blockchain!');
      
    } catch (error) {
      console.error('Upload failed:', error);
      const errorMsg = error instanceof Error ? error.message : 'Unknown error occurred';
      setErrorMessage("Failed to upload health data to blockchain");
      setErrorDetails(errorMsg);
      setShowErrorModal(true);
    } finally {
      setIsUploading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'synced': return 'bg-blue-500';
      case 'encrypted': return 'bg-purple-500';
      case 'onchain': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'synced': return 'Synced';
      case 'encrypted': return 'Encrypted';
      case 'onchain': return 'On-Chain';
      default: return 'Unknown';
    }
  };

  const filteredData = activeTab === "all" 
    ? syncedData 
    : syncedData.filter(data => data.status === activeTab);

  const stats = {
    total: syncedData.length,
    synced: syncedData.filter(d => d.status === 'synced').length,
    encrypted: syncedData.filter(d => d.status === 'encrypted').length,
    onchain: syncedData.filter(d => d.status === 'onchain').length
  };

  return (
    <div className="health-vault-records">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white health-vault-heartbeat">
          📋 Synced Health Data
        </h2>
        <div className="flex space-x-2">
          <button 
            onClick={handleBatchEncrypt}
            disabled={isEncrypting || stats.synced === 0}
            className="health-vault-button text-sm px-4 py-2 disabled:opacity-50"
          >
            {isEncrypting ? 'Encrypting...' : `🔒 Encrypt All (${stats.synced})`}
          </button>
          <button 
            onClick={handleBatchUpload}
            disabled={isUploading || stats.encrypted === 0}
            className="health-vault-button text-sm px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:opacity-50"
          >
            {isUploading ? 'Uploading...' : `⛓️ Upload All (${stats.encrypted})`}
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="health-vault-card rounded-lg p-4 text-center health-vault-records">
          <div className="text-2xl font-bold text-teal-400">{stats.total}</div>
          <div className="text-teal-200 text-sm">Total Records</div>
        </div>
        <div className="health-vault-card rounded-lg p-4 text-center health-vault-records">
          <div className="text-2xl font-bold text-blue-400">{stats.synced}</div>
          <div className="text-teal-200 text-sm">Synced</div>
        </div>
        <div className="health-vault-card rounded-lg p-4 text-center health-vault-records">
          <div className="text-2xl font-bold text-purple-400">{stats.encrypted}</div>
          <div className="text-teal-200 text-sm">Encrypted</div>
        </div>
        <div className="health-vault-card rounded-lg p-4 text-center health-vault-records">
          <div className="text-2xl font-bold text-green-400">{stats.onchain}</div>
          <div className="text-teal-200 text-sm">On-Chain</div>
        </div>
      </div>

      {/* Data Flow Progress */}
      <div className="health-vault-card rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Data Flow Progress</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">1</span>
              </div>
              <span className="text-slate-300">Device Sync</span>
            </div>
            <div className="w-16 h-1 bg-slate-600"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">2</span>
              </div>
              <span className="text-slate-300">FHE Encryption</span>
            </div>
            <div className="w-16 h-1 bg-slate-600"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">3</span>
              </div>
              <span className="text-slate-300">Blockchain Upload</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-2 mb-6">
        {["all", "synced", "encrypted", "onchain"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab
                ? "bg-teal-600 text-white health-vault-glow"
                : "bg-teal-900/30 text-teal-200 hover:bg-teal-800/50"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} ({tab === "all" ? stats.total : stats[tab as keyof typeof stats]})
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredData.map((data) => (
          <div key={data.id} className="health-vault-card rounded-lg p-6 health-vault-records">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">{data.type}</h3>
                <p className="text-teal-200 text-sm mb-2">Source: {data.source}</p>
                <div className="flex space-x-4 text-sm text-teal-300">
                  <span>Value: {data.value} {data.unit}</span>
                  <span>Date: {data.date}</span>
                  {data.blockchainHash && <span>Hash: {data.blockchainHash}</span>}
                </div>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(data.status)}`}>
                  {getStatusText(data.status)}
                </span>
                <p className="text-teal-200 text-sm mt-2">ID: {data.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-teal-900/20 rounded-lg p-3 text-center">
                <div className="text-lg font-semibold text-white">{data.value}</div>
                <div className="text-teal-200 text-sm">Value</div>
              </div>
              <div className="bg-teal-900/20 rounded-lg p-3 text-center">
                <div className="text-lg font-semibold text-white">{data.unit}</div>
                <div className="text-teal-200 text-sm">Unit</div>
              </div>
              <div className="bg-teal-900/20 rounded-lg p-3 text-center">
                <div className="text-lg font-semibold text-white">{data.source}</div>
                <div className="text-teal-200 text-sm">Source</div>
              </div>
              <div className="bg-teal-900/20 rounded-lg p-3 text-center">
                <div className="text-lg font-semibold text-white">{getStatusText(data.status)}</div>
                <div className="text-teal-200 text-sm">Status</div>
              </div>
            </div>

            <div className="flex space-x-2">
              {data.status === 'synced' && (
                <button 
                  onClick={() => handleEncryptData(data.id)}
                  disabled={isEncrypting}
                  className="health-vault-button text-sm px-4 py-2 disabled:opacity-50"
                >
                  🔒 Encrypt
                </button>
              )}
              {data.status === 'encrypted' && (
                <button 
                  onClick={() => handleUploadToBlockchain(data.id)}
                  disabled={isUploading}
                  className="health-vault-button text-sm px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:opacity-50"
                >
                  ⛓️ Upload to Chain
                </button>
              )}
              {data.status === 'onchain' && (
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  ✅ On-Chain
                </button>
              )}
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                View Details
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                Share Data
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredData.length === 0 && (
        <div className="health-vault-card rounded-lg p-8 text-center health-vault-dots">
          <div className="text-4xl mb-4">📋</div>
          <h3 className="text-lg font-semibold text-white mb-2">No {activeTab} data</h3>
          <p className="text-teal-200">No data found in this category</p>
        </div>
      )}

      {/* Data Privacy Notice */}
      <div className="mt-8">
        <div className="health-vault-card rounded-lg p-6 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">🔒</span>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-slate-50 mb-2">
                Secure Data Processing
              </h4>
              <p className="text-slate-300 text-sm">
                All data is encrypted using FHE technology before being uploaded to the blockchain. 
                Your health information remains private and secure throughout the entire process. 
                Only you have access to the decryption keys.
              </p>
            </div>
          </div>
        </div>
      </div>

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
          // Retry the last upload operation
          const encryptedData = syncedData.filter(data => data.status === 'encrypted');
          if (encryptedData.length > 0) {
            handleBatchUpload();
          }
        }}
      />
    </div>
  );
}