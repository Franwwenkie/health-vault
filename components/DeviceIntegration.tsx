"use client";

import { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import SyncCompleteModal from "./SyncCompleteModal";
import DataPreviewModal from "./DataPreviewModal";
import ErrorModal from "./ErrorModal";
import ClientOnly from "./ClientOnly";

interface Device {
  id: string;
  name: string;
  type: 'smartwatch' | 'fitness_tracker' | 'health_app' | 'medical_device';
  brand: string;
  icon: string;
  connected: boolean;
  lastSync: string | null;
  dataTypes: string[];
}

interface SyncStatus {
  deviceId: string;
  status: 'idle' | 'syncing' | 'success' | 'error';
  progress: number;
  message: string;
}

interface HealthDataRecord {
  id: string;
  type: string;
  value: number;
  unit: string;
  timestamp: string;
  source: string;
}

export default function DeviceIntegration() {
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [showDataPreview, setShowDataPreview] = useState(false);
  const [syncedData, setSyncedData] = useState<HealthDataRecord[]>([]);
  const [lastSyncInfo, setLastSyncInfo] = useState<{
    deviceName: string;
    recordCount: number;
    dataTypes: string[];
    lastSync: string;
  } | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorDetails, setErrorDetails] = useState<string>("");

  const [devices, setDevices] = useState<Device[]>([
    {
      id: 'apple-health',
      name: 'Apple Health',
      type: 'health_app',
      brand: 'Apple',
      icon: '🍎',
      connected: false,
      lastSync: null,
      dataTypes: ['Heart Rate', 'Steps', 'Sleep', 'Blood Pressure', 'Weight']
    },
    {
      id: 'google-fit',
      name: 'Google Fit',
      type: 'health_app',
      brand: 'Google',
      icon: '📱',
      connected: false,
      lastSync: null,
      dataTypes: ['Activity', 'Heart Rate', 'Sleep', 'Nutrition', 'Weight']
    },
    {
      id: 'fitbit',
      name: 'Fitbit',
      type: 'fitness_tracker',
      brand: 'Fitbit',
      icon: '⌚',
      connected: false,
      lastSync: null,
      dataTypes: ['Steps', 'Heart Rate', 'Sleep', 'Calories', 'Distance']
    },
    {
      id: 'samsung-health',
      name: 'Samsung Health',
      type: 'health_app',
      brand: 'Samsung',
      icon: '📱',
      connected: false,
      lastSync: null,
      dataTypes: ['Heart Rate', 'Steps', 'Sleep', 'Stress', 'Blood Oxygen']
    },
    {
      id: 'garmin',
      name: 'Garmin Connect',
      type: 'smartwatch',
      brand: 'Garmin',
      icon: '⌚',
      connected: false,
      lastSync: null,
      dataTypes: ['GPS', 'Heart Rate', 'Sleep', 'Training', 'Recovery']
    },
    {
      id: 'polar',
      name: 'Polar Flow',
      type: 'fitness_tracker',
      brand: 'Polar',
      icon: '⌚',
      connected: false,
      lastSync: null,
      dataTypes: ['Heart Rate', 'Training', 'Sleep', 'Recovery', 'Nutrition']
    }
  ]);

  const [syncStatus, setSyncStatus] = useState<SyncStatus[]>([]);
  const [isConnecting, setIsConnecting] = useState<string | null>(null);

  // Generate random health data based on device type
  const generateRandomHealthData = (device: Device): HealthDataRecord[] => {
    const dataTypes = device.dataTypes;
    const records: HealthDataRecord[] = [];
    const now = new Date();
    
    // Generate 3-8 random records
    const recordCount = Math.floor(Math.random() * 6) + 3;
    
    for (let i = 0; i < recordCount; i++) {
      const dataType = dataTypes[Math.floor(Math.random() * dataTypes.length)];
      const timestamp = new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000); // Last 7 days
      
      let value: number;
      let unit: string;
      
      // Generate realistic values based on data type
      switch (dataType) {
        case 'Heart Rate':
          value = Math.floor(Math.random() * 40) + 60; // 60-100 bpm
          unit = 'bpm';
          break;
        case 'Steps':
          value = Math.floor(Math.random() * 8000) + 2000; // 2000-10000 steps
          unit = 'steps';
          break;
        case 'Blood Pressure':
          value = Math.floor(Math.random() * 40) + 110; // 110-150 systolic
          unit = 'mmHg';
          break;
        case 'Sleep':
          value = Math.random() * 3 + 6; // 6-9 hours
          unit = 'hours';
          break;
        case 'Weight':
          value = Math.random() * 20 + 60; // 60-80 kg
          unit = 'kg';
          break;
        case 'Calories':
          value = Math.floor(Math.random() * 1000) + 1500; // 1500-2500 calories
          unit = 'cal';
          break;
        case 'Distance':
          value = Math.random() * 10 + 2; // 2-12 km
          unit = 'km';
          break;
        case 'Blood Oxygen':
          value = Math.random() * 5 + 95; // 95-100%
          unit = '%';
          break;
        default:
          value = Math.floor(Math.random() * 100) + 1;
          unit = 'units';
      }
      
      records.push({
        id: `${device.id}_${i}_${Date.now()}`,
        type: dataType,
        value: Math.round(value * 100) / 100,
        unit,
        timestamp: timestamp.toISOString(),
        source: device.name
      });
    }
    
    return records;
  };

  const connectDevice = async (deviceId: string) => {
    setIsConnecting(deviceId);
    
    // Simulate device connection process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setDevices(prev => prev.map(device => 
      device.id === deviceId 
        ? { ...device, connected: true, lastSync: new Date().toISOString() }
        : device
    ));
    
    setIsConnecting(null);
  };

  const syncDeviceData = async (deviceId: string) => {
    const device = devices.find(d => d.id === deviceId);
    if (!device) return;

    setSyncStatus(prev => [...prev.filter(s => s.deviceId !== deviceId), {
      deviceId,
      status: 'syncing',
      progress: 0,
      message: 'Connecting to device...'
    }]);

    // Simulate data sync process
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setSyncStatus(prev => prev.map(s => 
        s.deviceId === deviceId 
          ? { ...s, progress, message: `Syncing data... ${progress}%` }
          : s
      ));
    }

    // Generate random health data
    const generatedData = generateRandomHealthData(device);
    setSyncedData(generatedData);

    // Set sync info for modal
    setLastSyncInfo({
      deviceName: device.name,
      recordCount: generatedData.length,
      dataTypes: Array.from(new Set(generatedData.map(d => d.type))),
      lastSync: new Date().toISOString()
    });

    setSyncStatus(prev => prev.map(s => 
      s.deviceId === deviceId 
        ? { ...s, status: 'success', message: 'Data synced successfully!' }
        : s
    ));

    // Update last sync time
    setDevices(prev => prev.map(device => 
      device.id === deviceId 
        ? { ...device, lastSync: new Date().toISOString() }
        : device
    ));

    // Show sync complete modal
    setShowSyncModal(true);

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSyncStatus(prev => prev.filter(s => s.deviceId !== deviceId));
    }, 3000);
  };

  const disconnectDevice = (deviceId: string) => {
    setDevices(prev => prev.map(device => 
      device.id === deviceId 
        ? { ...device, connected: false, lastSync: null }
        : device
    ));
  };

  const syncAllDevices = async () => {
    const connectedDevices = devices.filter(device => device.connected);
    
    if (connectedDevices.length === 0) {
      alert('Please connect at least one device before syncing.');
      return;
    }

    let allSyncedData: HealthDataRecord[] = [];
    let totalRecords = 0;
    let allDataTypes: string[] = [];

    // Sync all connected devices
    for (const device of connectedDevices) {
      await syncDeviceData(device.id);
      
      // Generate data for this device
      const deviceData = generateRandomHealthData(device);
      allSyncedData = [...allSyncedData, ...deviceData];
      totalRecords += deviceData.length;
      allDataTypes = [...allDataTypes, ...deviceData.map(d => d.type)];
    }

    // Set combined sync info
    setLastSyncInfo({
      deviceName: `${connectedDevices.length} Devices`,
      recordCount: totalRecords,
      dataTypes: Array.from(new Set(allDataTypes)),
      lastSync: new Date().toISOString()
    });

    setSyncedData(allSyncedData);
    setShowSyncModal(true);
  };

  const handleUploadToChain = async (data: HealthDataRecord[]) => {
    try {
      console.log('Uploading data to blockchain:', data);
      
      // Convert health data records to the format expected by the contract
      const healthData = {
        healthScore: Math.floor(Math.random() * 100) + 1, // 1-100 health score
        riskFactor: Math.floor(Math.random() * 10) + 1, // 1-10 risk factor
        ageGroup: Math.floor(Math.random() * 8) + 1, // 1-8 age group
        dataHash: `0x${Math.random().toString(16).substr(2, 64)}`, // Random data hash
      };

      // Import the hook here to avoid circular dependency
      const { useHealthVault } = await import('@/hooks/useHealthVault');
      const { uploadHealthDataToContract } = useHealthVault();
      
      // Call the actual contract function and wait for transaction completion
      const result = await uploadHealthDataToContract(healthData);
      
      console.log('Upload result:', result);
      
      // Show success message
      alert('Data successfully uploaded to blockchain!');
      
    } catch (error) {
      console.error('Failed to upload to blockchain:', error);
      const errorMsg = error instanceof Error ? error.message : 'Unknown error occurred';
      setErrorMessage("Failed to upload health data to blockchain");
      setErrorDetails(errorMsg);
      setShowErrorModal(true);
    }
  };

  const getDeviceStatus = (deviceId: string) => {
    return syncStatus.find(s => s.deviceId === deviceId);
  };

  const formatLastSync = (lastSync: string | null) => {
    if (!lastSync) return 'Never';
    const date = new Date(lastSync);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return `${Math.floor(diffMins / 1440)}d ago`;
  };

  return (
    <ClientOnly fallback={
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-50 mb-4">
            Smart Device Integration
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Loading device integration...
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="health-vault-card p-6 slide-up">
              <div className="animate-pulse">
                <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-slate-700 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-slate-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    }>
      <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-50 mb-4">
          Smart Device Integration
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Connect your smart wearables and health apps to automatically sync your health data. 
          No more manual data entry - your health information flows seamlessly into your secure vault.
        </p>
      </div>

      {/* Device Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map((device) => {
          const status = getDeviceStatus(device.id);
          const isConnectingDevice = isConnecting === device.id;
          
          return (
            <div key={device.id} className="health-vault-card p-6 slide-up">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">{device.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-50">{device.name}</h3>
                    <p className="text-sm text-slate-400">{device.brand}</p>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  device.connected ? 'bg-emerald-400' : 'bg-slate-500'
                }`}></div>
              </div>

              {/* Data Types */}
              <div className="mb-4">
                <p className="text-sm text-slate-300 mb-2">Supported Data:</p>
                <div className="flex flex-wrap gap-1">
                  {device.dataTypes.map((type, index) => (
                    <span key={index} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              {/* Last Sync */}
              <div className="mb-4">
                <p className="text-sm text-slate-400">
                  Last sync: <span className="text-slate-300">{formatLastSync(device.lastSync)}</span>
                </p>
              </div>

              {/* Sync Progress */}
              {status && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">{status.message}</span>
                    <span className="text-slate-400">{status.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        status.status === 'success' ? 'bg-emerald-400' : 'bg-blue-400'
                      }`}
                      style={{ width: `${status.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2">
                {!device.connected ? (
                  <button
                    onClick={() => connectDevice(device.id)}
                    disabled={isConnectingDevice}
                    className="flex-1 health-vault-button text-sm py-2 px-4 disabled:opacity-50"
                  >
                    {isConnectingDevice ? 'Connecting...' : 'Connect'}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => syncDeviceData(device.id)}
                      disabled={status?.status === 'syncing'}
                      className="flex-1 health-vault-button text-sm py-2 px-4 disabled:opacity-50"
                    >
                      {status?.status === 'syncing' ? 'Syncing...' : 'Sync Now'}
                    </button>
                    <button
                      onClick={() => disconnectDevice(device.id)}
                      className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200 border border-slate-600 rounded-lg hover:border-slate-500 transition-colors"
                    >
                      Disconnect
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Batch Sync All */}
      <div className="health-vault-card p-6 text-center">
        <h3 className="text-lg font-semibold text-slate-50 mb-2">
          Sync All Connected Devices
        </h3>
        <p className="text-slate-300 text-sm mb-4">
          Automatically sync data from all your connected devices at once
        </p>
        <button 
          onClick={syncAllDevices}
          className="health-vault-button px-6 py-3"
        >
          🔄 Sync All Devices
        </button>
        <p className="text-xs text-slate-400 mt-2">
          {devices.filter(d => d.connected).length} device(s) connected
        </p>
      </div>

      {/* Data Privacy Notice */}
      <div className="health-vault-card p-6 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm">🔒</span>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-slate-50 mb-2">
              Your Data is Always Protected
            </h4>
            <p className="text-slate-300 text-sm">
              All data synced from your devices is immediately encrypted using FHE technology. 
              Your health information remains private and secure, even during the sync process. 
              We never store your device credentials or access tokens.
            </p>
          </div>
        </div>
      </div>

      {/* Sync Complete Modal */}
      {lastSyncInfo && (
        <SyncCompleteModal
          isOpen={showSyncModal}
          onClose={() => setShowSyncModal(false)}
          syncedData={lastSyncInfo}
        />
      )}

      {/* Data Preview Modal */}
      <DataPreviewModal
        isOpen={showDataPreview}
        onClose={() => setShowDataPreview(false)}
        data={syncedData}
        onUploadToChain={handleUploadToChain}
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
          handleUploadToChain(syncedData);
        }}
      />
      </div>
    </ClientOnly>
  );
}
