'use client'

import { useState, useEffect } from 'react'
import { useHealthVault, useSharingPermissions } from '@/hooks/useHealthVault'
import { Address } from 'viem'

export default function DataSharing() {
  const { 
    address, 
    isConnected, 
    grantPermission, 
    revokePermission, 
    isLoading, 
    error,
    hasHealthData,
    isGrantSuccess,
    isRevokeSuccess
  } = useHealthVault()
  
  const [recipientAddress, setRecipientAddress] = useState('')
  const [authorizedConsumers, setAuthorizedConsumers] = useState<Array<{
    address: string;
    name: string;
    hasPermission: boolean;
  }>>([])

  // Check permissions for known addresses
  const knownAddresses = [
    '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    '0x8ba1f109551bA432bdf5c3c2E536B6fA0E4C3f6c',
    '0x1234567890123456789012345678901234567890'
  ]

  // Load sharing permissions
  useEffect(() => {
    if (isConnected && address && hasHealthData) {
      const loadPermissions = async () => {
        const consumers = await Promise.all(
          knownAddresses.map(async (addr) => {
            const { hasPermission } = useSharingPermissions(address as Address, addr as Address)
            return {
              address: addr,
              name: `Provider ${addr.slice(0, 6)}`,
              hasPermission
            }
          })
        )
        setAuthorizedConsumers(consumers)
      }
      loadPermissions()
    }
  }, [isConnected, address, hasHealthData])

  const handleAuthorize = async () => {
    if (!recipientAddress.trim()) {
      alert('Please enter a recipient address')
      return
    }

    if (!recipientAddress.startsWith('0x') || recipientAddress.length !== 42) {
      alert('Please enter a valid Ethereum address')
      return
    }

    if (!hasHealthData) {
      alert('Please upload health data first before sharing')
      return
    }

    try {
      await grantPermission(recipientAddress as Address)
      
      // Add to local state
      const newConsumer = {
        address: recipientAddress,
        name: `Provider ${recipientAddress.slice(0, 6)}`,
        hasPermission: true
      }
      setAuthorizedConsumers([...authorizedConsumers, newConsumer])
      
      alert('Data access granted successfully!')
      setRecipientAddress('')
    } catch (error) {
      console.error('Error granting permission:', error)
      alert(`Failed to grant permission: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleRevoke = async (consumerAddr: string) => {
    try {
      await revokePermission(consumerAddr as Address)
      
      // Update local state
      setAuthorizedConsumers(authorizedConsumers.map(c => 
        c.address === consumerAddr ? { ...c, hasPermission: false } : c
      ))
      
      alert('Data access revoked successfully!')
    } catch (error) {
      console.error('Error revoking permission:', error)
      alert(`Failed to revoke permission: ${error instanceof Error ? error.message : 'Unknown error'}`)
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
          <p className="text-teal-200">
            Please connect your wallet to manage data sharing permissions.
          </p>
        </div>
      </div>
    )
  }

  if (!hasHealthData) {
    return (
      <div className="health-vault-card rounded-xl p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-2xl font-semibold text-white mb-4">
            No Health Data Found
          </h3>
          <p className="text-teal-200">
            Please upload your health data first before you can share it with others.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="health-vault-card rounded-xl p-8">
      <div className="text-center mb-8">
        <div className="text-4xl mb-4">🤝</div>
        <h3 className="text-2xl font-semibold text-white mb-2">
          Data Sharing Management
        </h3>
        <p className="text-teal-200">
          Control who can access your encrypted health data using FHE technology.
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

      {/* Success Messages */}
      {isGrantSuccess && (
        <div className="mb-6 p-4 bg-green-900/20 border border-green-500 rounded-lg">
          <div className="flex items-start">
            <div className="text-green-400 text-lg mr-3">✅</div>
            <div className="text-sm text-green-200">
              <p className="font-semibold mb-1">Success:</p>
              <p>Data access granted successfully!</p>
            </div>
          </div>
        </div>
      )}

      {isRevokeSuccess && (
        <div className="mb-6 p-4 bg-green-900/20 border border-green-500 rounded-lg">
          <div className="flex items-start">
            <div className="text-green-400 text-lg mr-3">✅</div>
            <div className="text-sm text-green-200">
              <p className="font-semibold mb-1">Success:</p>
              <p>Data access revoked successfully!</p>
            </div>
          </div>
        </div>
      )}

      {/* Authorization Form */}
      <div className="mb-8 p-6 bg-teal-900/20 rounded-xl border border-teal-500">
        <h4 className="text-lg font-semibold text-white mb-4">Grant Data Access</h4>
        <div className="space-y-4">
          <div>
            <label htmlFor="recipientAddress" className="block text-sm font-medium text-teal-200 mb-2">
              Recipient Address
            </label>
            <input
              type="text"
              id="recipientAddress"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              className="w-full px-3 py-2 bg-teal-900/30 border border-teal-700 rounded-lg text-white placeholder-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="0x..."
              required
            />
            <p className="text-teal-300 text-sm mt-1">
              Enter the Ethereum address of the person/organization you want to share data with
            </p>
          </div>
        </div>
        
        <button
          onClick={handleAuthorize}
          disabled={isLoading || !recipientAddress.trim()}
          className="mt-4 bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors health-vault-glow"
        >
          {isLoading ? 'Granting Access...' : 'Grant Access'}
        </button>
      </div>

      {/* Authorized Consumers List */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-4">Current Data Access Permissions</h4>
        
        {authorizedConsumers.length === 0 ? (
          <div className="text-center text-teal-300 py-8">
            <div className="text-4xl mb-2">📋</div>
            <p>No authorized consumers found.</p>
            <p className="text-sm mt-2">Grant access to healthcare providers or researchers to share your encrypted health data.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {authorizedConsumers.map((consumer, index) => (
              <div key={index} className="health-vault-card rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${consumer.hasPermission ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                      <div>
                        <p className="font-medium text-white">{consumer.name}</p>
                        <p className="text-sm text-teal-300 font-mono">{consumer.address}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      consumer.hasPermission ? 'bg-green-900/30 text-green-300' : 'bg-gray-900/30 text-gray-300'
                    }`}>
                      {consumer.hasPermission ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  {consumer.hasPermission && (
                    <button
                      onClick={() => handleRevoke(consumer.address)}
                      disabled={isLoading}
                      className="ml-4 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                    >
                      {isLoading ? 'Revoking...' : 'Revoke'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Privacy Information */}
      <div className="mt-8 p-4 bg-teal-900/20 rounded-lg">
        <div className="flex items-start">
          <div className="text-teal-400 text-lg mr-3">ℹ️</div>
          <div className="text-sm text-teal-200">
            <p className="font-semibold mb-1">How FHE Data Sharing Works:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Your health data remains encrypted at all times using FHE technology</li>
              <li>Authorized parties can perform computations on encrypted data without seeing raw values</li>
              <li>Access can be revoked at any time through blockchain transactions</li>
              <li>All sharing activities are permanently recorded on the blockchain</li>
              <li>Only you control who can access your encrypted health information</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
