'use client'

import { useState } from 'react'
import { useHealthVault } from '@/hooks/useHealthVault'
import { validateHealthData, getAgeGroupDescription, getRiskLevelDescription, getHealthScoreDescription } from '@/lib/fhe-utils'
import type { HealthData } from '@/lib/fhe-utils'

export default function HealthDataForm() {
  const { 
    uploadHealthDataToContract, 
    isLoading, 
    error, 
    isUploadSuccess,
    refreshData,
    hasHealthData,
    isConnected
  } = useHealthVault()
  
  const [formData, setFormData] = useState({
    healthScore: '',
    riskFactor: '',
    ageGroup: '',
  })
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setValidationErrors([])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const healthData: Partial<HealthData> = {
      healthScore: parseInt(formData.healthScore),
      riskFactor: parseInt(formData.riskFactor),
      ageGroup: parseInt(formData.ageGroup),
    }

    // Validate data
    const errors = validateHealthData(healthData)
    if (errors.length > 0) {
      setValidationErrors(errors)
      return
    }

    try {
      await uploadHealthDataToContract(healthData as HealthData)
      
      // Reset form on success
      setFormData({
        healthScore: '',
        riskFactor: '',
        ageGroup: '',
      })
      
      // Refresh data to show updated information
      refreshData()
      
      alert('Health data uploaded successfully!')
    } catch (error) {
      console.error('Error uploading health data:', error)
      alert(`Failed to upload health data: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  if (!isConnected) {
    return (
      <div className="health-vault-card rounded-xl p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">🔐</div>
          <h3 className="text-2xl font-semibold text-white mb-4">
            Connect Your Wallet
          </h3>
          <p className="text-teal-200 mb-6">
            Please connect your wallet to access the confidential health data platform.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="health-vault-card rounded-xl p-8">
      <div className="text-center mb-8">
        <div className="text-4xl mb-4">📝</div>
        <h3 className="text-2xl font-semibold text-white mb-2">
          {hasHealthData ? 'Update Health Data' : 'Store Health Data'}
        </h3>
        <p className="text-teal-200">
          Securely store your encrypted health information on the blockchain using FHE technology.
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-500 rounded-lg">
          <div className="flex items-start">
            <div className="text-red-400 text-lg mr-3">⚠️</div>
            <div className="text-sm text-red-200">
              <p className="font-semibold mb-1">Error:</p>
              <p>{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-500 rounded-lg">
          <div className="flex items-start">
            <div className="text-yellow-400 text-lg mr-3">⚠️</div>
            <div className="text-sm text-yellow-200">
              <p className="font-semibold mb-1">Validation Errors:</p>
              <ul className="list-disc list-inside">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {isUploadSuccess && (
        <div className="mb-6 p-4 bg-green-900/20 border border-green-500 rounded-lg">
          <div className="flex items-start">
            <div className="text-green-400 text-lg mr-3">✅</div>
            <div className="text-sm text-green-200">
              <p className="font-semibold mb-1">Success:</p>
              <p>Health data uploaded successfully to the blockchain!</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="healthScore" className="block text-sm font-medium text-teal-200 mb-2">
            Health Score (1-100)
          </label>
          <input
            type="number"
            id="healthScore"
            value={formData.healthScore}
            onChange={(e) => handleInputChange('healthScore', e.target.value)}
            className="w-full px-4 py-3 bg-teal-900/30 border border-teal-700 rounded-lg text-white placeholder-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter your health score (1-100)"
            min="1"
            max="100"
            required
          />
          <p className="text-teal-300 text-sm mt-1">
            Higher scores indicate better health status
          </p>
        </div>

        <div>
          <label htmlFor="riskFactor" className="block text-sm font-medium text-teal-200 mb-2">
            Risk Factor (1-10)
          </label>
          <input
            type="number"
            id="riskFactor"
            value={formData.riskFactor}
            onChange={(e) => handleInputChange('riskFactor', e.target.value)}
            className="w-full px-4 py-3 bg-teal-900/30 border border-teal-700 rounded-lg text-white placeholder-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter your risk factor (1-10)"
            min="1"
            max="10"
            required
          />
          <p className="text-teal-300 text-sm mt-1">
            Lower numbers indicate lower health risk
          </p>
        </div>

        <div>
          <label htmlFor="ageGroup" className="block text-sm font-medium text-teal-200 mb-2">
            Age Group
          </label>
          <select
            id="ageGroup"
            value={formData.ageGroup}
            onChange={(e) => handleInputChange('ageGroup', e.target.value)}
            className="w-full px-4 py-3 bg-teal-900/30 border border-teal-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          >
            <option value="">Select age group</option>
            <option value="1">18-25 years</option>
            <option value="2">26-35 years</option>
            <option value="3">36-50 years</option>
            <option value="4">51-65 years</option>
            <option value="5">65+ years</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading || !formData.healthScore || !formData.riskFactor || !formData.ageGroup}
          className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-teal-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors health-vault-glow"
        >
          {isLoading ? 'Uploading Data...' : (hasHealthData ? 'Update Health Data' : 'Store Health Data')}
        </button>
      </form>

      <div className="mt-6 p-4 bg-teal-900/20 rounded-lg">
        <div className="flex items-start">
          <div className="text-teal-400 text-lg mr-3">ℹ️</div>
          <div className="text-sm text-teal-200">
            <p className="font-semibold mb-1">Privacy Notice:</p>
            <p>Your health data is encrypted using FHE (Fully Homomorphic Encryption) technology before being stored on the blockchain. 
            Only you and authorized parties can access this information. The data remains encrypted even during computation.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
