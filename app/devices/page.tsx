"use client";

import Navigation from "@/components/Navigation";
import DeviceIntegration from "@/components/DeviceIntegration";
import BatchDataUpload from "@/components/BatchDataUpload";

export default function Devices() {
  return (
    <main className="health-vault-container">
      <Navigation title="Health Vault" subtitle="Device Management" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Page Header */}
        <div className="text-center mb-12 fade-in">
          <h1 className="health-vault-title text-4xl md:text-5xl mb-4">
            Device Management
          </h1>
          <p className="health-vault-subtitle max-w-3xl mx-auto">
            Connect your smart devices and health apps to automatically sync your health data. 
            No more manual data entry - your health information flows seamlessly into your secure vault.
          </p>
        </div>

        {/* Device Integration */}
        <div className="health-vault-section">
          <DeviceIntegration />
        </div>

        {/* Batch Upload */}
        <div className="health-vault-section">
          <BatchDataUpload />
        </div>

        {/* Quick Actions */}
        <div className="health-vault-section">
          <h2 className="text-2xl font-bold text-slate-50 mb-8 text-center">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="health-vault-card p-6 text-center slide-up">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-50 mb-2">Auto Sync</h3>
              <p className="text-slate-300 text-sm mb-4">
                Set up automatic data synchronization from all your connected devices
              </p>
              <button className="health-vault-button w-full">
                Configure Auto Sync
              </button>
            </div>
            
            <div className="health-vault-card p-6 text-center slide-up">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-50 mb-2">Data Analytics</h3>
              <p className="text-slate-300 text-sm mb-4">
                View insights and trends from your synced health data
              </p>
              <button className="health-vault-button w-full">
                View Analytics
              </button>
            </div>
            
            <div className="health-vault-card p-6 text-center slide-up">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-50 mb-2">Settings</h3>
              <p className="text-slate-300 text-sm mb-4">
                Manage sync preferences and data retention policies
              </p>
              <button className="health-vault-button w-full">
                Open Settings
              </button>
            </div>
          </div>
        </div>

        {/* Data Sources */}
        <div className="health-vault-section">
          <h2 className="text-2xl font-bold text-slate-50 mb-8 text-center">
            Supported Data Sources
          </h2>
          <div className="health-vault-card p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { name: 'Apple Health', icon: '🍎', color: 'from-gray-600 to-gray-700' },
                { name: 'Google Fit', icon: '📱', color: 'from-blue-500 to-blue-600' },
                { name: 'Fitbit', icon: '⌚', color: 'from-green-500 to-green-600' },
                { name: 'Samsung Health', icon: '📱', color: 'from-blue-600 to-blue-700' },
                { name: 'Garmin', icon: '⌚', color: 'from-orange-500 to-orange-600' },
                { name: 'Polar', icon: '⌚', color: 'from-red-500 to-red-600' },
                { name: 'Withings', icon: '⚖️', color: 'from-purple-500 to-purple-600' },
                { name: 'Oura Ring', icon: '💍', color: 'from-indigo-500 to-indigo-600' },
                { name: 'Whoop', icon: '⌚', color: 'from-pink-500 to-pink-600' },
                { name: 'MyFitnessPal', icon: '🍎', color: 'from-yellow-500 to-yellow-600' },
                { name: 'Cronometer', icon: '🥗', color: 'from-green-600 to-green-700' },
                { name: 'Strava', icon: '🏃', color: 'from-orange-600 to-orange-700' }
              ].map((source, index) => (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${source.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                    <span className="text-2xl">{source.icon}</span>
                  </div>
                  <p className="text-sm text-slate-300">{source.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="health-vault-section">
          <div className="health-vault-card p-8 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔒</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">
                Your Privacy is Our Priority
              </h2>
              <p className="text-slate-300 text-lg max-w-3xl mx-auto mb-6">
                All data synced from your devices is immediately encrypted using Fully Homomorphic Encryption (FHE). 
                Your health information remains private and secure, even during the sync process. 
                We never store your device credentials or access tokens.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white">🔐</span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-50">FHE Encrypted</h3>
                  <p className="text-xs text-slate-400">Data encrypted at all times</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white">🛡️</span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-50">Zero Knowledge</h3>
                  <p className="text-xs text-slate-400">We can't see your data</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white">🔑</span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-50">You Control</h3>
                  <p className="text-xs text-slate-400">Full data ownership</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
