"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <main className="health-vault-container">
      <Navigation />

      {/* Hero Section - Medical Theme */}
      <div className="relative overflow-hidden pt-20">
        {/* Medical Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-emerald-400 rounded-full"></div>
          <div className="absolute top-32 right-20 w-16 h-16 border-2 border-blue-400 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 border-2 border-teal-400 rounded-full"></div>
          <div className="absolute bottom-40 right-1/3 w-12 h-12 border-2 border-cyan-400 rounded-full"></div>
        </div>

        <div className="relative z-10 text-center py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-8">
                <span className="text-emerald-400">🔒</span>
                <span className="text-emerald-400 text-sm font-medium">FHE-Powered Privacy</span>
              </div>
              
              <h1 className="health-vault-title text-5xl md:text-6xl mb-6">
                Health Vault
              </h1>
              <p className="health-vault-subtitle text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Your Health Data, Secured with FHE Technology
              </p>
              <p className="text-slate-300 text-lg mb-12 max-w-2xl mx-auto">
                Connect your devices, sync your data, and access your secure health dashboard. 
                Complete privacy protection with Fully Homomorphic Encryption.
              </p>
              
              {/* CTA Buttons - Clear User Flow */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <Link href="/devices" className="health-vault-button text-lg px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 flex items-center space-x-2">
                  <span>⌚</span>
                  <span>1. Connect Devices</span>
                </Link>
                <Link href="/dashboard" className="health-vault-button text-lg px-8 py-4 flex items-center space-x-2">
                  <span>🏥</span>
                  <span>2. Access Dashboard</span>
                </Link>
              </div>
              
              {/* Secondary Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <Link href="/features" className="health-vault-button-secondary text-lg px-6 py-3 flex items-center space-x-2">
                  <span>🔍</span>
                  <span>Learn More</span>
                </Link>
                <Link href="/mining" className="health-vault-button-secondary text-lg px-6 py-3 flex items-center space-x-2">
                  <span>🏆</span>
                  <span>Start Mining</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Steps Section */}
      <div className="health-vault-section">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-50 mb-4">
            Get Started in 2 Steps
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Simple, secure, and private health data management
          </p>
        </div>

        {/* Simple Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Step 1: Connect Devices */}
          <div className="health-vault-card p-8 text-center slide-up">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">⌚</span>
            </div>
            <h3 className="text-2xl font-semibold text-slate-50 mb-4">1. Connect Your Devices</h3>
            <p className="text-slate-300 mb-6">
              Sync data from Apple Watch, Fitbit, Samsung Health, and other devices. 
              Your health information flows automatically into your secure vault.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="security-badge">🔄 Auto Sync</span>
              <span className="security-badge">📱 Multi-Device</span>
              <span className="security-badge">🔒 Encrypted</span>
            </div>
          </div>

          {/* Step 2: Access Dashboard */}
          <div className="health-vault-card p-8 text-center slide-up">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🏥</span>
            </div>
            <h3 className="text-2xl font-semibold text-slate-50 mb-4">2. Access Your Dashboard</h3>
            <p className="text-slate-300 mb-6">
              View your health data, analytics, and insights while maintaining complete privacy. 
              All data is encrypted and protected with FHE technology.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="security-badge">📊 Analytics</span>
              <span className="security-badge">🔒 FHE Protected</span>
              <span className="security-badge">🛡️ Private</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security Highlight */}
      <div className="health-vault-section">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-50 mb-4">
            Powered by FHE Technology
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Your health data is protected with Fully Homomorphic Encryption - the gold standard in privacy
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="health-vault-card p-8 text-center slide-up">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🔐</span>
            </div>
            <h3 className="text-2xl font-semibold text-slate-50 mb-4">Military-Grade Privacy</h3>
            <p className="text-slate-300 mb-6">
              Fully Homomorphic Encryption ensures your data remains encrypted during all operations, 
              including computation and analysis. Even we can't see your personal health information.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="security-badge">🔒 Zero-Knowledge</span>
              <span className="security-badge">🛡️ HIPAA Compliant</span>
              <span className="security-badge">⚡ Real-time Analysis</span>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="health-vault-section">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-50 mb-4">
            Ready to Secure Your Health Data?
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust Health Vault with their most sensitive health information
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/devices" className="health-vault-button text-lg px-8 py-4 flex items-center space-x-2">
              <span>⌚</span>
              <span>Get Started</span>
            </Link>
            <Link href="/features" className="health-vault-button-secondary text-lg px-6 py-3 flex items-center space-x-2">
              <span>🔍</span>
              <span>Learn More</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="health-vault-section bg-slate-900/50 border-t border-slate-700/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L13.09 8.26L19 7L14.74 12L19 17L13.09 15.74L12 22L10.91 15.74L5 17L9.26 12L5 7L10.91 8.26L12 2Z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-50">Health Vault</h3>
                  <p className="text-sm text-slate-400">Secure Health Data Platform</p>
                </div>
              </div>
              <p className="text-slate-300 text-sm mb-6 max-w-md">
                The world's first health data platform powered by ZAMA FHE technology. 
                Your health information deserves military-grade privacy protection.
              </p>
              
              {/* ZAMA FHE Badge */}
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-500/30 rounded-full px-4 py-2">
                <span className="text-purple-400">🔐</span>
                <span className="text-purple-400 text-sm font-medium">Powered by ZAMA FHE</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-slate-50 mb-4">Platform</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/dashboard" className="text-slate-300 hover:text-slate-50 text-sm transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/devices" className="text-slate-300 hover:text-slate-50 text-sm transition-colors">
                    Device Management
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="text-slate-300 hover:text-slate-50 text-sm transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/mining" className="text-slate-300 hover:text-slate-50 text-sm transition-colors">
                    Health Mining
                  </Link>
                </li>
              </ul>
            </div>

            {/* Technology */}
            <div>
              <h4 className="text-lg font-semibold text-slate-50 mb-4">Technology</h4>
              <ul className="space-y-2">
                <li className="text-slate-300 text-sm">Fully Homomorphic Encryption</li>
                <li className="text-slate-300 text-sm">Zero-Knowledge Privacy</li>
                <li className="text-slate-300 text-sm">Blockchain Storage</li>
                <li className="text-slate-300 text-sm">HIPAA Compliant</li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-slate-700/50 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-slate-400 text-sm mb-4 md:mb-0">
                © 2024 Health Vault. All rights reserved. Built with ZAMA FHE technology.
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-slate-400 text-sm">
                  <span>🔒</span>
                  <span>Privacy First</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400 text-sm">
                  <span>🛡️</span>
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400 text-sm">
                  <span>⚡</span>
                  <span>Real-time Sync</span>
                </div>
              </div>
            </div>
          </div>

          {/* ZAMA FHE Technology Highlight */}
          <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20 rounded-xl">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🔐</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-50">ZAMA FHE Technology</h4>
                  <p className="text-slate-300 text-sm">
                    Fully Homomorphic Encryption enables computation on encrypted data without decryption
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">100%</div>
                  <div className="text-slate-300 text-xs">Privacy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-400">Zero</div>
                  <div className="text-slate-300 text-xs">Knowledge</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">Military</div>
                  <div className="text-slate-300 text-xs">Grade</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}