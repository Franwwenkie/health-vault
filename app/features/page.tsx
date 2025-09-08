"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";

export default function Features() {
  return (
    <main className="health-vault-container">
      <Navigation title="Health Vault" subtitle="Features" />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Features Header */}
        <div className="text-center mb-12 fade-in">
          <h1 className="health-vault-title text-4xl md:text-5xl mb-4">
            Platform Features
          </h1>
          <p className="health-vault-subtitle max-w-3xl mx-auto">
            Comprehensive health data management with cutting-edge privacy protection and advanced analytics
          </p>
        </div>

        {/* Smart Device Integration */}
        <div className="health-vault-section">
          <h2 className="text-3xl font-bold text-slate-50 mb-8 text-center">
            Smart Device Integration
          </h2>
          <div className="health-vault-card p-8 slide-up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-slate-50 mb-4">
                  Seamless Data Synchronization
                </h3>
                <p className="text-slate-300 mb-6">
                  Connect your smart devices and health apps for automatic data synchronization. 
                  No more manual data entry - your health information flows seamlessly into your secure vault.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <h4 className="text-slate-50 font-medium mb-1">Apple Health Integration</h4>
                      <p className="text-slate-300 text-sm">Sync heart rate, steps, sleep, and activity data from your iPhone and Apple Watch</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <h4 className="text-slate-50 font-medium mb-1">Google Fit & Samsung Health</h4>
                      <p className="text-slate-300 text-sm">Connect Android devices and Samsung Galaxy watches for comprehensive health tracking</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <h4 className="text-slate-50 font-medium mb-1">Fitbit & Garmin Support</h4>
                      <p className="text-slate-300 text-sm">Import data from popular fitness trackers and smartwatches</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <h4 className="text-slate-50 font-medium mb-1">Batch Data Upload</h4>
                      <p className="text-slate-300 text-sm">Upload historical data from CSV/JSON files for comprehensive health history</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="w-full h-80 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 health-pulse">
                      <span className="text-4xl">⌚</span>
                    </div>
                    <p className="text-slate-300 text-lg font-medium">Device Sync</p>
                    <p className="text-slate-400 text-sm">Real-time data flow</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Device Integration Workflow */}
        <div className="health-vault-section">
          <h2 className="text-3xl font-bold text-slate-50 mb-8 text-center">
            Device Integration Workflow
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="health-vault-card p-6 text-center slide-up">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔗</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-50 mb-3">1. Connect</h3>
              <p className="text-slate-300 text-sm">
                Authorize Health Vault to access your device data through secure OAuth connections
              </p>
            </div>
            <div className="health-vault-card p-6 text-center slide-up">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-50 mb-3">2. Auto Sync</h3>
              <p className="text-slate-300 text-sm">
                Data automatically syncs in real-time and is encrypted immediately upon arrival
              </p>
            </div>
            <div className="health-vault-card p-6 text-center slide-up">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⛓️</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-50 mb-3">3. Blockchain Upload</h3>
              <p className="text-slate-300 text-sm">
                Encrypted data is uploaded to the blockchain for permanent, secure storage
              </p>
            </div>
          </div>
        </div>

        {/* FHE Technology */}
        <div className="health-vault-section">
          <h2 className="text-3xl font-bold text-slate-50 mb-8 text-center">
            Fully Homomorphic Encryption (FHE)
          </h2>
          <div className="health-vault-grid health-vault-grid-2">
            <div className="health-vault-card p-8 slide-up">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔐</span>
              </div>
              <h3 className="text-2xl font-semibold text-slate-50 mb-4 text-center">Zero-Knowledge Privacy</h3>
              <p className="text-slate-300 mb-6 text-center">
                Your health data remains encrypted during all operations, including computation and analysis. 
                Even our servers cannot see your personal information.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-emerald-400">✓</span>
                  <span className="text-slate-300">Data encrypted at rest and in transit</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-emerald-400">✓</span>
                  <span className="text-slate-300">Computation on encrypted data</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-emerald-400">✓</span>
                  <span className="text-slate-300">No plaintext exposure</span>
                </div>
              </div>
            </div>
            <div className="health-vault-card p-8 slide-up">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🧠</span>
              </div>
              <h3 className="text-2xl font-semibold text-slate-50 mb-4 text-center">Encrypted Analytics</h3>
              <p className="text-slate-300 mb-6 text-center">
                Get insights and analytics from your health data without ever decrypting it. 
                AI analysis happens on encrypted data, preserving your privacy.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-blue-400">✓</span>
                  <span className="text-slate-300">AI-powered health insights</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-blue-400">✓</span>
                  <span className="text-slate-300">Trend analysis and predictions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-blue-400">✓</span>
                  <span className="text-slate-300">Anomaly detection</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Types & Analytics */}
        <div className="health-vault-section">
          <h2 className="text-3xl font-bold text-slate-50 mb-8 text-center">
            Supported Data Types
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="health-vault-card p-6 slide-up">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💓</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-50 mb-3 text-center">Vital Signs</h3>
              <ul className="text-slate-300 text-sm space-y-2">
                <li>• Heart Rate (synced from devices)</li>
                <li>• Blood Pressure (synced from devices)</li>
                <li>• Body Temperature (synced from devices)</li>
                <li>• Oxygen Saturation (synced from devices)</li>
                <li>• Respiratory Rate (synced from devices)</li>
              </ul>
            </div>
            <div className="health-vault-card p-6 slide-up">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏃</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-50 mb-3 text-center">Activity Data</h3>
              <ul className="text-slate-300 text-sm space-y-2">
                <li>• Steps Count (synced from devices)</li>
                <li>• Distance Traveled (synced from devices)</li>
                <li>• Calories Burned (synced from devices)</li>
                <li>• Active Minutes (synced from devices)</li>
                <li>• Exercise Sessions (synced from devices)</li>
              </ul>
            </div>
            <div className="health-vault-card p-6 slide-up">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">😴</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-50 mb-3 text-center">Sleep & Recovery</h3>
              <ul className="text-slate-300 text-sm space-y-2">
                <li>• Sleep Duration (synced from devices)</li>
                <li>• Sleep Quality (synced from devices)</li>
                <li>• Sleep Stages (synced from devices)</li>
                <li>• Recovery Metrics (synced from devices)</li>
                <li>• Stress Levels (synced from devices)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Health Data Mining */}
        <div className="health-vault-section">
          <h2 className="text-3xl font-bold text-slate-50 mb-8 text-center">
            Health Data Mining & Rewards
          </h2>
          <div className="health-vault-card p-8 slide-up bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-slate-50 mb-4">Earn Points & Compete</h3>
                <p className="text-slate-300 mb-6">
                  Upload health data consistently to earn points, maintain streaks, and climb the leaderboard. 
                  The more you contribute, the more you earn while maintaining complete privacy.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs">🏆</span>
                    </div>
                    <div>
                      <h4 className="text-slate-50 font-medium mb-1">Points System</h4>
                      <p className="text-slate-300 text-sm">Earn 100+ points per data upload based on data quality and consistency</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs">🔥</span>
                    </div>
                    <div>
                      <h4 className="text-slate-50 font-medium mb-1">Streak Bonuses</h4>
                      <p className="text-slate-300 text-sm">Maintain daily upload streaks for bonus multipliers and special rewards</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs">📊</span>
                    </div>
                    <div>
                      <h4 className="text-slate-50 font-medium mb-1">Quality Scoring</h4>
                      <p className="text-slate-300 text-sm">Higher quality data earns more points and better leaderboard positions</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="w-full h-80 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl">🏆</span>
                    </div>
                    <p className="text-slate-300 text-lg font-medium">Mining Leaderboard</p>
                    <p className="text-slate-400 text-sm">Compete globally</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Compliance */}
        <div className="health-vault-section">
          <h2 className="text-3xl font-bold text-slate-50 mb-8 text-center">
            Security & Compliance
          </h2>
          <div className="health-vault-grid health-vault-grid-3">
            <div className="health-vault-card p-6 text-center slide-up">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔐</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-50 mb-3">FHE Encryption</h3>
              <p className="text-slate-300 text-sm mb-4">
                Fully Homomorphic Encryption ensures your data remains encrypted during all operations, 
                including computation and analysis.
              </p>
              <div className="health-progress-bar">
                <div className="health-progress-fill" style={{ width: '100%' }}></div>
              </div>
              <p className="text-xs text-emerald-400 mt-2 font-medium">Military Grade</p>
            </div>
            
            <div className="health-vault-card p-6 text-center slide-up">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-50 mb-3">HIPAA Compliant</h3>
              <p className="text-slate-300 text-sm mb-4">
                Meets and exceeds healthcare privacy regulations with zero-knowledge architecture 
                and audit trails.
              </p>
              <div className="health-progress-bar">
                <div className="health-progress-fill" style={{ width: '100%' }}></div>
              </div>
              <p className="text-xs text-blue-400 mt-2 font-medium">Certified Secure</p>
            </div>
            
            <div className="health-vault-card p-6 text-center slide-up">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-50 mb-3">Access Control</h3>
              <p className="text-slate-300 text-sm mb-4">
                Granular permission system allows you to control exactly who can access 
                your health data and for what purposes.
              </p>
              <div className="health-progress-bar">
                <div className="health-progress-fill" style={{ width: '100%' }}></div>
              </div>
              <p className="text-xs text-purple-400 mt-2 font-medium">Full Control</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="health-vault-section">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-50 mb-4">
              Ready to Experience the Future of Health Data?
            </h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Join the revolution in privacy-preserving health data management. 
              Your data, your control, your privacy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/devices" className="health-vault-button text-lg px-8 py-4 flex items-center space-x-2">
                <span>⌚</span>
                <span>Connect Your Devices</span>
              </Link>
              <Link href="/dashboard" className="health-vault-button-secondary text-lg px-6 py-3 flex items-center space-x-2">
                <span>🏥</span>
                <span>View Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}