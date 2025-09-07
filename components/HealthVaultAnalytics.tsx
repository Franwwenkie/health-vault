"use client";

import { useState } from "react";

export default function HealthVaultAnalytics() {
  const [activeTab, setActiveTab] = useState("overview");

  const analytics = {
    overview: {
      healthScore: 85,
      riskLevel: "Low",
      trends: [
        { metric: "Blood Pressure", trend: "Stable", change: "+0.5%" },
        { metric: "Heart Rate", trend: "Improving", change: "-2.1%" },
        { metric: "Blood Sugar", trend: "Stable", change: "+0.8%" },
        { metric: "Weight", trend: "Improving", change: "-1.2%" }
      ]
    },
    vitals: {
      bloodPressure: { systolic: 120, diastolic: 80, trend: "stable" },
      heartRate: { resting: 72, max: 180, trend: "improving" },
      bloodSugar: { fasting: 95, postMeal: 140, trend: "stable" },
      temperature: { value: 98.6, trend: "normal" }
    },
    medications: {
      adherence: 95,
      missedDoses: 2,
      nextRefill: "5 days",
      interactions: 0
    }
  };

  return (
    <div className="health-vault-analytics">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white health-vault-heartbeat">
          📊 Health Analytics
        </h2>
        <div className="flex space-x-2">
          {["overview", "vitals", "medications"].map((tab) => (
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
          {/* Health Score */}
          <div className="health-vault-card rounded-lg p-6 health-vault-analytics">
            <h3 className="text-lg font-semibold text-white mb-4">Overall Health Score</h3>
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-teal-900/30"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${analytics.overview.healthScore * 2.51} 251`}
                    className="text-teal-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{analytics.overview.healthScore}</span>
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <p className="text-teal-200">Risk Level: <span className="text-green-400">{analytics.overview.riskLevel}</span></p>
            </div>
          </div>

          {/* Trends */}
          <div className="health-vault-card rounded-lg p-6 health-vault-analytics">
            <h3 className="text-lg font-semibold text-white mb-4">Health Trends</h3>
            <div className="space-y-3">
              {analytics.overview.trends.map((trend) => (
                <div key={trend.metric} className="flex justify-between items-center p-3 bg-teal-900/20 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">{trend.metric}</h4>
                    <p className="text-teal-200 text-sm">Trend: {trend.trend}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-medium ${
                      trend.change.startsWith('+') ? "text-red-400" : "text-green-400"
                    }`}>
                      {trend.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "vitals" && (
        <div className="space-y-6">
          <div className="health-vault-card rounded-lg p-6 health-vault-vitals">
            <h3 className="text-lg font-semibold text-white mb-4">Vital Signs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-teal-900/20 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Blood Pressure</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-teal-200">Systolic:</span>
                    <span className="text-white">{analytics.vitals.bloodPressure.systolic} mmHg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-teal-200">Diastolic:</span>
                    <span className="text-white">{analytics.vitals.bloodPressure.diastolic} mmHg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-teal-200">Trend:</span>
                    <span className="text-blue-400">{analytics.vitals.bloodPressure.trend}</span>
                  </div>
                </div>
              </div>
              <div className="bg-teal-900/20 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Heart Rate</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-teal-200">Resting:</span>
                    <span className="text-white">{analytics.vitals.heartRate.resting} bpm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-teal-200">Max:</span>
                    <span className="text-white">{analytics.vitals.heartRate.max} bpm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-teal-200">Trend:</span>
                    <span className="text-green-400">{analytics.vitals.heartRate.trend}</span>
                  </div>
                </div>
              </div>
              <div className="bg-teal-900/20 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Blood Sugar</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-teal-200">Fasting:</span>
                    <span className="text-white">{analytics.vitals.bloodSugar.fasting} mg/dL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-teal-200">Post-meal:</span>
                    <span className="text-white">{analytics.vitals.bloodSugar.postMeal} mg/dL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-teal-200">Trend:</span>
                    <span className="text-blue-400">{analytics.vitals.bloodSugar.trend}</span>
                  </div>
                </div>
              </div>
              <div className="bg-teal-900/20 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Temperature</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-teal-200">Value:</span>
                    <span className="text-white">{analytics.vitals.temperature.value}°F</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-teal-200">Trend:</span>
                    <span className="text-green-400">{analytics.vitals.temperature.trend}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "medications" && (
        <div className="space-y-6">
          <div className="health-vault-card rounded-lg p-6 health-vault-medications">
            <h3 className="text-lg font-semibold text-white mb-4">Medication Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-teal-900/20 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Adherence</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-teal-200">Adherence Rate:</span>
                    <span className="text-white">{analytics.medications.adherence}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-teal-200">Missed Doses:</span>
                    <span className="text-white">{analytics.medications.missedDoses}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-teal-200">Next Refill:</span>
                    <span className="text-white">{analytics.medications.nextRefill}</span>
                  </div>
                </div>
              </div>
              <div className="bg-teal-900/20 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Safety</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-teal-200">Drug Interactions:</span>
                    <span className="text-white">{analytics.medications.interactions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-teal-200">Allergies:</span>
                    <span className="text-white">None</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-teal-200">Side Effects:</span>
                    <span className="text-white">Mild</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
