'use client'

import { useState, useEffect } from 'react'
import { useAccount, useContractRead } from 'wagmi'

// Contract ABI for reading health data
const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_userId",
        "type": "string"
      }
    ],
    "name": "getHealthData",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "uint8",
            "name": "healthScore",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "riskFactor",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "ageGroup",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct ConfidentialHealth.HealthData",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

const CONTRACT_ADDRESS = '0x...' // Replace with actual deployed contract address

export default function HealthProfile() {
  const { address, isConnected } = useAccount()
  const [userId, setUserId] = useState('')
  const [healthData, setHealthData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Mock health data for demonstration
  const mockHealthData = {
    userId: 'USER_001',
    healthScore: 85,
    riskFactor: 3,
    ageGroup: 2,
    timestamp: Date.now(),
    lastUpdated: '2024-01-15'
  }

  const handleViewProfile = () => {
    if (!userId.trim()) {
      alert('Please enter a User ID')
      return
    }
    
    setIsLoading(true)
    // Simulate API call delay
    setTimeout(() => {
      setHealthData(mockHealthData)
      setIsLoading(false)
    }, 1000)
  }

  const getAgeGroupLabel = (ageGroup: number) => {
    const labels = {
      1: '18-25',
      2: '26-35', 
      3: '36-50',
      4: '51-65',
      5: '65+'
    }
    return labels[ageGroup as keyof typeof labels] || 'Unknown'
  }

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getRiskFactorColor = (risk: number) => {
    if (risk <= 3) return 'text-green-600'
    if (risk <= 6) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (!isConnected) {
    return (
      <div className="health-card rounded-xl p-8 shadow-lg">
        <div className="text-center">
          <div className="text-6xl mb-4">🔐</div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Connect Your Wallet
          </h3>
          <p className="text-gray-600">
            Please connect your wallet to view health profiles.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="health-card rounded-xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <div className="text-4xl mb-4">📊</div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          Health Profile Viewer
        </h3>
        <p className="text-gray-600">
          View encrypted health data profiles securely.
        </p>
      </div>

      {/* Search Form */}
      <div className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter User ID to view profile"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleViewProfile}
            disabled={isLoading || !userId.trim()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Loading...' : 'View Profile'}
          </button>
        </div>
      </div>

      {/* Health Profile Display */}
      {healthData && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">User ID:</span>
                  <span className="font-medium">{healthData.userId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Age Group:</span>
                  <span className="font-medium">{getAgeGroupLabel(healthData.ageGroup)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="font-medium">{healthData.lastUpdated}</span>
                </div>
              </div>
            </div>

            {/* Health Metrics */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Health Metrics</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Health Score:</span>
                  <span className={`font-bold text-xl ${getHealthScoreColor(healthData.healthScore)}`}>
                    {healthData.healthScore}/100
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Risk Factor:</span>
                  <span className={`font-bold text-xl ${getRiskFactorColor(healthData.riskFactor)}`}>
                    {healthData.riskFactor}/10
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Health Score Visualization */}
          <div className="mt-6">
            <h5 className="text-md font-semibold text-gray-900 mb-3">Health Score Breakdown</h5>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Overall Health</span>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${healthData.healthScore}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900">{healthData.healthScore}%</span>
              </div>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="mt-6 p-4 bg-blue-100 rounded-lg">
            <div className="flex items-start">
              <div className="text-blue-600 text-lg mr-3">🔒</div>
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">Data Privacy:</p>
                <p>All health data is encrypted using FHE technology. The values shown above are 
                decrypted only for authorized viewing. Raw blockchain data remains encrypted.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      {!healthData && (
        <div className="text-center text-gray-500">
          <p>Enter a User ID above to view the corresponding health profile.</p>
        </div>
      )}
    </div>
  )
}
