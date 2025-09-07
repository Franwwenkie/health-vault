"use client";

import { useState } from "react";

export default function HealthVaultSharing() {
  const [activeTab, setActiveTab] = useState("permissions");

  const sharing = {
    permissions: [
      {
        id: 1,
        recipient: "Dr. Smith",
        type: "Healthcare Provider",
        access: "Full Access",
        records: ["Blood Pressure", "Heart Rate", "Lab Results"],
        status: "Active",
        expiry: "2024-12-31"
      },
      {
        id: 2,
        recipient: "Family Member",
        type: "Emergency Contact",
        access: "Emergency Only",
        records: ["Emergency Contacts", "Allergies"],
        status: "Active",
        expiry: "2025-01-01"
      }
    ],
    requests: [
      {
        id: 1,
        requester: "Dr. Johnson",
        type: "Healthcare Provider",
        request: "Access to recent lab results",
        status: "Pending",
        date: "2024-01-15"
      }
    ],
    history: [
      {
        id: 1,
        action: "Shared records with Dr. Smith",
        date: "2024-01-14",
        status: "Completed"
      },
      {
        id: 2,
        action: "Revoked access for Dr. Brown",
        date: "2024-01-13",
        status: "Completed"
      }
    ]
  };

  return (
    <div className="health-vault-sharing">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white health-vault-heartbeat">
          🔗 Data Sharing
        </h2>
        <div className="flex space-x-2">
          {["permissions", "requests", "history"].map((tab) => (
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

      {activeTab === "permissions" && (
        <div className="space-y-4">
          {sharing.permissions.map((permission) => (
            <div key={permission.id} className="health-vault-card rounded-lg p-6 health-vault-sharing">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{permission.recipient}</h3>
                  <p className="text-teal-200 text-sm mb-2">Type: {permission.type}</p>
                  <div className="flex space-x-4 text-sm text-teal-300">
                    <span>Access: {permission.access}</span>
                    <span>Expiry: {permission.expiry}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    permission.status === "Active" ? "bg-green-600" : "bg-red-600"
                  }`}>
                    {permission.status}
                  </span>
                  <p className="text-teal-200 text-sm mt-2">ID: {permission.id}</p>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-white font-medium mb-2">Shared Records:</h4>
                <div className="flex flex-wrap gap-2">
                  {permission.records.map((record) => (
                    <span key={record} className="px-2 py-1 bg-teal-600/20 text-teal-200 rounded text-sm">
                      {record}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  View Details
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Modify Access
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Revoke Access
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "requests" && (
        <div className="space-y-4">
          {sharing.requests.map((request) => (
            <div key={request.id} className="health-vault-card rounded-lg p-6 health-vault-sharing">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{request.requester}</h3>
                  <p className="text-teal-200 text-sm mb-2">Type: {request.type}</p>
                  <p className="text-teal-200 text-sm mb-2">Request: {request.request}</p>
                  <div className="flex space-x-4 text-sm text-teal-300">
                    <span>Date: {request.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    request.status === "Pending" ? "bg-yellow-600" : "bg-green-600"
                  }`}>
                    {request.status}
                  </span>
                  <p className="text-teal-200 text-sm mt-2">ID: {request.id}</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Approve
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Deny
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "history" && (
        <div className="space-y-4">
          {sharing.history.map((action) => (
            <div key={action.id} className="health-vault-card rounded-lg p-6 health-vault-sharing">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{action.action}</h3>
                  <div className="flex space-x-4 text-sm text-teal-300">
                    <span>Date: {action.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    action.status === "Completed" ? "bg-green-600" : "bg-yellow-600"
                  }`}>
                    {action.status}
                  </span>
                  <p className="text-teal-200 text-sm mt-2">ID: {action.id}</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  View Details
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Repeat Action
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Share Data Form */}
      <div className="mt-8">
        <div className="health-vault-card rounded-lg p-6 health-vault-connection">
          <h3 className="text-lg font-semibold text-white mb-4">Share Health Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-teal-200 text-sm font-medium mb-2">Recipient</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 bg-teal-900/30 border border-teal-700 rounded-lg text-white placeholder-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter recipient name"
              />
            </div>
            <div>
              <label className="block text-teal-200 text-sm font-medium mb-2">Type</label>
              <select className="w-full px-3 py-2 bg-teal-900/30 border border-teal-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option value="Healthcare Provider">Healthcare Provider</option>
                <option value="Emergency Contact">Emergency Contact</option>
                <option value="Family Member">Family Member</option>
                <option value="Researcher">Researcher</option>
              </select>
            </div>
            <div>
              <label className="block text-teal-200 text-sm font-medium mb-2">Access Level</label>
              <select className="w-full px-3 py-2 bg-teal-900/30 border border-teal-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option value="Full Access">Full Access</option>
                <option value="Limited Access">Limited Access</option>
                <option value="Emergency Only">Emergency Only</option>
                <option value="Read Only">Read Only</option>
              </select>
            </div>
            <div>
              <label className="block text-teal-200 text-sm font-medium mb-2">Expiry Date</label>
              <input 
                type="date" 
                className="w-full px-3 py-2 bg-teal-900/30 border border-teal-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-teal-200 text-sm font-medium mb-2">Select Records to Share</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {["Blood Pressure", "Heart Rate", "Lab Results", "Medications", "Appointments", "Allergies", "Emergency Contacts", "Symptoms"].map((record) => (
                  <label key={record} className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-teal-200 text-sm">{record}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="md:col-span-2 flex items-end">
              <button className="w-full bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors health-vault-glow">
                Share Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
