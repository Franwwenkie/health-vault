"use client";

import { useState, useEffect } from "react";
import { useHealthVault } from "@/hooks/useHealthVault";
import { getHealthScoreDescription, getRiskLevelDescription, getAgeGroupDescription } from "@/lib/fhe-utils";
import ClientOnly from "./ClientOnly";

export default function HealthVaultDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [decryptedData, setDecryptedData] = useState<any>(null);
  
  const { 
    userHealthData, 
    hasHealthData, 
    getDecryptedHealthData, 
    isLoading,
    error,
    address,
    isConnected 
  } = useHealthVault();

  // Load decrypted data when available
  useEffect(() => {
    const loadDecryptedData = async () => {
      if (hasHealthData) {
        try {
          const data = await getDecryptedHealthData();
          setDecryptedData(data);
        } catch (err) {
          console.error("Failed to decrypt health data:", err);
        }
      }
    };

    loadDecryptedData();
  }, [hasHealthData, getDecryptedHealthData]);

  // Calculate stats based on real data
  const stats = {
    totalRecords: hasHealthData ? 1 : 0,
    activeRecords: hasHealthData ? 1 : 0,
    totalVitals: hasHealthData ? 1 : 0,
    totalMedications: 0, // Could be expanded
    totalAppointments: 0, // Could be expanded
    totalAnalytics: hasHealthData ? 1 : 0,
    totalShares: 0, // Could be tracked from events
    totalInsights: hasHealthData ? 1 : 0
  };

  return (
    <ClientOnly>
      <div className="health-vault-dashboard">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white health-vault-heartbeat">
          📊 Dashboard
        </h2>
        <div className="flex space-x-2">
          {["overview", "records", "analytics", "insights"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-teal-600 text-white health-vault-glow"
                  : "bg-teal-900/30 text-teal-200 hover:bg-teal-800/50"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Connection Status */}
          {!isConnected && (
            <div className="health-vault-card rounded-lg p-6 bg-yellow-900/20 border border-yellow-500">
              <div className="flex items-center">
                <div className="text-yellow-400 text-2xl mr-4">⚠️</div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Wallet Not Connected</h3>
                  <p className="text-yellow-200">Please connect your wallet to view your health data</p>
                </div>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="health-vault-card rounded-lg p-6 bg-red-900/20 border border-red-500">
              <div className="flex items-center">
                <div className="text-red-400 text-2xl mr-4">❌</div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Error Loading Data</h3>
                  <p className="text-red-200">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="health-vault-card rounded-lg p-6 bg-blue-900/20 border border-blue-500">
              <div className="flex items-center">
                <div className="text-blue-400 text-2xl mr-4">⏳</div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Loading Health Data</h3>
                  <p className="text-blue-200">Please wait while we load your encrypted health information...</p>
                </div>
              </div>
            </div>
          )}

          {/* No Data State */}
          {isConnected && !hasHealthData && !isLoading && !error && (
            <div className="health-vault-card rounded-lg p-6 bg-teal-900/20 border border-teal-500">
              <div className="flex items-center">
                <div className="text-teal-400 text-2xl mr-4">⌚</div>
                <div>
                  <h3 className="text-lg font-semibold text-white">No Health Data Found</h3>
                  <p className="text-teal-200">Connect your devices to sync health data automatically</p>
                </div>
              </div>
            </div>
          )}

          {/* Health Data Overview */}
          {hasHealthData && decryptedData && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="health-vault-card rounded-lg p-6 health-vault-records">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Health Score</h3>
                    <p className="text-3xl font-bold text-teal-400">{decryptedData.healthScore}</p>
                    <p className="text-sm text-teal-200">{getHealthScoreDescription(decryptedData.healthScore)}</p>
                  </div>
                  <div className="text-3xl">📊</div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-teal-900/30 rounded-full h-2">
                    <div 
                      className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${decryptedData.healthScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="health-vault-card rounded-lg p-6 health-vault-vitals">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Risk Factor</h3>
                    <p className="text-3xl font-bold text-teal-400">{decryptedData.riskFactor}/10</p>
                    <p className="text-sm text-teal-200">{getRiskLevelDescription(decryptedData.riskFactor)}</p>
                  </div>
                  <div className="text-3xl">⚠️</div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-teal-900/30 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(decryptedData.riskFactor / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="health-vault-card rounded-lg p-6 health-vault-analytics">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Age Group</h3>
                    <p className="text-3xl font-bold text-teal-400">{decryptedData.ageGroup}</p>
                    <p className="text-sm text-teal-200">{getAgeGroupDescription(decryptedData.ageGroup)}</p>
                  </div>
                  <div className="text-3xl">👤</div>
                </div>
                <div className="mt-4">
                  <div className="text-sm text-teal-200">
                    <span>Data Hash: {decryptedData.dataHash.slice(0, 10)}...</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Data Metadata */}
          {userHealthData && (
            <div className="health-vault-card rounded-lg p-6 health-vault-network">
              <h3 className="text-lg font-semibold text-white mb-4">Data Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-teal-900/20 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Blockchain Data</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-teal-200">Owner:</span>
                      <span className="text-white font-mono">{userHealthData[2]?.slice(0, 10)}...</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-teal-200">Timestamp:</span>
                      <span className="text-white">{new Date(Number(userHealthData[1]) * 1000).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-teal-200">Status:</span>
                      <span className={`font-medium ${userHealthData[3] ? 'text-green-400' : 'text-red-400'}`}>
                        {userHealthData[3] ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-teal-900/20 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Data Hash</h4>
                  <p className="text-teal-200 text-sm font-mono break-all">{userHealthData[0]}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "records" && (
        <div className="space-y-4">
          <div className="health-vault-card rounded-lg p-6 health-vault-records">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Health Records</h3>
            <div className="space-y-3">
              {[
                { type: "Blood Pressure", value: "120/80", date: "2024-01-15", status: "Normal" },
                { type: "Heart Rate", value: "72 bpm", date: "2024-01-15", status: "Normal" },
                { type: "Blood Sugar", value: "95 mg/dL", date: "2024-01-14", status: "Normal" }
              ].map((record) => (
                <div key={record.type} className="flex justify-between items-center p-3 bg-teal-900/20 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">{record.type}</h4>
                    <p className="text-teal-200 text-sm">Value: {record.value}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded text-xs ${
                      record.status === "Normal" ? "bg-green-600" : "bg-yellow-600"
                    }`}>
                      {record.status}
                    </span>
                    <p className="text-teal-200 text-sm mt-1">Date: {record.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="space-y-4">
          <div className="health-vault-card rounded-lg p-6 health-vault-analytics">
            <h3 className="text-lg font-semibold text-white mb-4">Health Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-teal-900/20 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Vital Signs Trends</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-teal-200">Blood Pressure:</span>
                    <span className="text-white">Stable</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-teal-200">Heart Rate:</span>
                    <span className="text-white">Normal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-teal-200">Blood Sugar:</span>
                    <span className="text-white">Controlled</span>
                  </div>
                </div>
              </div>
              <div className="bg-teal-900/20 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Medication Compliance</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-teal-200">Adherence Rate:</span>
                    <span className="text-white">95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-teal-200">Missed Doses:</span>
                    <span className="text-white">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-teal-200">Next Refill:</span>
                    <span className="text-white">5 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "insights" && (
        <div className="space-y-4">
          <div className="health-vault-card rounded-lg p-6 health-vault-insights">
            <h3 className="text-lg font-semibold text-white mb-4">Health Insights</h3>
            <div className="space-y-4">
              {[
                { insight: "Blood pressure is within normal range", confidence: "95%", trend: "stable" },
                { insight: "Heart rate variability is improving", confidence: "87%", trend: "positive" },
                { insight: "Medication adherence is excellent", confidence: "92%", trend: "stable" },
                { insight: "Exercise frequency could be increased", confidence: "78%", trend: "suggestion" }
              ].map((insight) => (
                <div key={insight.insight} className="bg-teal-900/20 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-white font-medium">{insight.insight}</h4>
                    <span className={`text-sm font-medium ${
                      insight.trend === "positive" ? "text-green-400" : 
                      insight.trend === "stable" ? "text-blue-400" : "text-yellow-400"
                    }`}>
                      {insight.confidence}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-teal-400">{insight.confidence}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      </div>
    </ClientOnly>
  );
}
