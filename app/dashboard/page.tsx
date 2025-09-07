"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";
import HealthVaultDashboard from "@/components/HealthVaultDashboard";
import HealthVaultRecords from "@/components/HealthVaultRecords";
import HealthVaultAnalytics from "@/components/HealthVaultAnalytics";
import HealthVaultSharing from "@/components/HealthVaultSharing";

export default function Dashboard() {
  return (
    <main className="health-vault-container">
      <Navigation title="Health Vault" subtitle="Dashboard" />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Dashboard Header */}
        <div className="text-center mb-8 fade-in">
          <h1 className="health-vault-title text-3xl md:text-4xl mb-4">
            Health Data Dashboard
          </h1>
          <p className="health-vault-subtitle max-w-2xl mx-auto">
            Manage your encrypted health data, view analytics, and control sharing permissions
          </p>
        </div>

        {/* Main Dashboard */}
        <div className="health-vault-section">
          <div className="health-vault-card p-8 slide-up">
            <HealthVaultDashboard />
          </div>
        </div>

        {/* Features Grid */}
        <div className="health-vault-section">
          <h2 className="text-2xl font-bold text-slate-50 mb-6 text-center">
            Data Management
          </h2>
          <div className="health-vault-grid health-vault-grid-2">
            <div className="health-vault-card p-6 slide-up">
              <HealthVaultRecords />
            </div>
            <div className="health-vault-card p-6 slide-up">
              <HealthVaultAnalytics />
            </div>
          </div>
        </div>

        {/* Data Sharing Section */}
        <div className="health-vault-section">
          <div className="health-vault-card p-8 slide-up">
            <HealthVaultSharing />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="health-vault-section">
          <h2 className="text-2xl font-bold text-slate-50 mb-6 text-center">
            Quick Actions
          </h2>
          <div className="health-vault-grid health-vault-grid-3">
            <div className="health-vault-card p-6 text-center slide-up">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⌚</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-50 mb-2">Connect Devices</h3>
              <p className="text-slate-300 text-sm mb-4">
                Sync data from your smart devices and health apps
              </p>
              <Link href="/devices" className="health-vault-button w-full block text-center">
                Connect Devices
              </Link>
            </div>
            
            <div className="health-vault-card p-6 text-center slide-up">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔗</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-50 mb-2">Share Data</h3>
              <p className="text-slate-300 text-sm mb-4">
                Grant access to healthcare providers or researchers
              </p>
              <button className="health-vault-button w-full">
                Manage Sharing
              </button>
            </div>
            
            <div className="health-vault-card p-6 text-center slide-up">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-50 mb-2">View Analytics</h3>
              <p className="text-slate-300 text-sm mb-4">
                Get insights from your health data while maintaining privacy
              </p>
              <button className="health-vault-button w-full">
                View Analytics
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
