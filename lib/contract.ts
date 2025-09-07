import { Address } from "viem";

/**
 * Contract configuration and utilities for Health Vault with FHE support
 * Updated to match the FHE-enabled contract with encrypted data operations
 */

// Contract ABI matching the FHE-enabled HealthVault contract
export const HEALTH_VAULT_ABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "dataHash",
        "type": "string"
      },
      {
        "internalType": "externalEuint32",
        "name": "encryptedScore",
        "type": "bytes32"
      },
      {
        "internalType": "externalEuint32",
        "name": "encryptedRisk",
        "type": "bytes32"
      },
      {
        "internalType": "externalEuint32",
        "name": "encryptedAge",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "inputProof",
        "type": "bytes"
      }
    ],
    "name": "uploadHealthData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      }
    ],
    "name": "grantSharingPermission",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      }
    ],
    "name": "revokeSharingPermission",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "shareHealthScore",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "shareRiskFactor",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "shareAgeGroup",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getUserHealthData",
    "outputs": [
      {
        "internalType": "string",
        "name": "dataHash",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isEncrypted",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      }
    ],
    "name": "hasSharingPermission",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMyHealthScore",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMyRiskFactor",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMyAgeGroup",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "calculateHealthRiskScore",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user1",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "user2",
        "type": "address"
      }
    ],
    "name": "compareHealthScores",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "dataHash",
        "type": "string"
      },
      {
        "internalType": "externalEuint32",
        "name": "encryptedScore",
        "type": "bytes32"
      },
      {
        "internalType": "externalEuint32",
        "name": "encryptedRisk",
        "type": "bytes32"
      },
      {
        "internalType": "externalEuint32",
        "name": "encryptedAge",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "inputProof",
        "type": "bytes"
      }
    ],
    "name": "updateHealthData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "deactivateHealthData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "emergencyClearData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isFHESupported",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getContractInfo",
    "outputs": [
      {
        "internalType": "string",
        "name": "version",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "fheSupported",
        "type": "bool"
      },
      {
        "internalType": "string",
        "name": "fheVersion",
        "type": "string"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "dataHash",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "isEncrypted",
        "type": "bool"
      }
    ],
    "name": "HealthDataUploaded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      }
    ],
    "name": "SharingPermissionGranted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      }
    ],
    "name": "SharingPermissionRevoked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "dataType",
        "type": "string"
      }
    ],
    "name": "DataShared",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "requester",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "operation",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "result",
        "type": "uint256"
      }
    ],
    "name": "FHEComputationPerformed",
    "type": "event"
  }
] as const;

// Contract address - will be set after deployment
export const HEALTH_VAULT_ADDRESS: Address = process.env.NEXT_PUBLIC_HEALTH_VAULT_ADDRESS as Address || "0x0000000000000000000000000000000000000000";

/**
 * Contract interaction utilities
 */
export class HealthVaultContract {
  private contractAddress: Address;
  private abi: typeof HEALTH_VAULT_ABI;

  constructor(contractAddress: Address = HEALTH_VAULT_ADDRESS) {
    this.contractAddress = contractAddress;
    this.abi = HEALTH_VAULT_ABI;
  }

  getAddress(): Address {
    return this.contractAddress;
  }

  getABI() {
    return this.abi;
  }

  /**
   * Check if contract is properly configured
   */
  isConfigured(): boolean {
    return this.contractAddress !== "0x0000000000000000000000000000000000000000";
  }
}

/**
 * Contract event types
 */
export interface HealthDataUploadedEvent {
  user: Address;
  dataHash: string;
  timestamp: bigint;
  isEncrypted: boolean;
}

export interface SharingPermissionGrantedEvent {
  owner: Address;
  recipient: Address;
}

export interface SharingPermissionRevokedEvent {
  owner: Address;
  recipient: Address;
}

export interface DataSharedEvent {
  owner: Address;
  recipient: Address;
  dataType: string;
}

export interface FHEComputationPerformedEvent {
  requester: Address;
  operation: string;
  result: bigint;
}

/**
 * Contract function parameters for FHE operations
 */
export interface UploadHealthDataParams {
  dataHash: string;
  encryptedScore: string; // Base64 encoded encrypted data
  encryptedRisk: string;
  encryptedAge: string;
  inputProof: string; // Base64 encoded proof
}

export interface UpdateHealthDataParams {
  dataHash: string;
  encryptedScore: string;
  encryptedRisk: string;
  encryptedAge: string;
  inputProof: string;
}

export interface UserHealthData {
  dataHash: string;
  timestamp: bigint;
  owner: Address;
  isActive: boolean;
  isEncrypted: boolean;
}

export interface ContractInfo {
  version: string;
  fheSupported: boolean;
  fheVersion: string;
}

/**
 * FHE-specific types
 */
export interface EncryptedHealthData {
  encryptedScore: string;
  encryptedRisk: string;
  encryptedAge: string;
  inputProof: string;
}

export interface DecryptedHealthData {
  score: number;
  risk: number;
  age: number;
}

/**
 * Contract interaction errors
 */
export class ContractError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = "ContractError";
  }
}

/**
 * Validate contract address
 */
export function isValidContractAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Get contract configuration for current network
 */
export function getContractConfig() {
  const address = process.env.NEXT_PUBLIC_HEALTH_VAULT_ADDRESS;
  
  if (!address || !isValidContractAddress(address)) {
    console.warn("Health Vault contract address not configured or invalid");
    return null;
  }
  
  return {
    address: address as Address,
    abi: HEALTH_VAULT_ABI,
  };
}

/**
 * Health data validation utilities
 */
export function validateHealthScore(score: number): boolean {
  return score >= 1 && score <= 100;
}

export function validateRiskFactor(risk: number): boolean {
  return risk >= 1 && risk <= 10;
}

export function validateAgeGroup(age: number): boolean {
  return age >= 1 && age <= 5;
}

export function validateDataHash(hash: string): boolean {
  return hash.length > 0;
}

/**
 * Health data type definitions
 */
export interface HealthData {
  dataHash: string;
  score: number;
  risk: number;
  age: number;
  isEncrypted: boolean;
}

export interface HealthMetrics {
  healthScore: number;
  riskFactor: number;
  ageGroup: number;
  riskScore?: number;
}

export interface SharingPermission {
  owner: Address;
  recipient: Address;
  granted: boolean;
  timestamp?: bigint;
}

/**
 * FHE utility functions for frontend
 */
export class FHEUtils {
  /**
   * Convert plain data to encrypted format (placeholder)
   * In a real implementation, this would use FHEVM client library
   */
  static async encryptHealthData(data: HealthData): Promise<EncryptedHealthData> {
    // TODO: Implement actual FHE encryption using FHEVM client
    console.warn("FHE encryption is a placeholder. Implement with FHEVM client library.");
    
    return {
      encryptedScore: btoa(JSON.stringify({ value: data.score, type: "euint32" })),
      encryptedRisk: btoa(JSON.stringify({ value: data.risk, type: "euint32" })),
      encryptedAge: btoa(JSON.stringify({ value: data.age, type: "euint32" })),
      inputProof: btoa(JSON.stringify({ proof: "placeholder", timestamp: Date.now() }))
    };
  }

  /**
   * Convert encrypted data to plain format (placeholder)
   * In a real implementation, this would use FHEVM client library
   */
  static async decryptHealthData(encryptedData: string): Promise<DecryptedHealthData> {
    // TODO: Implement actual FHE decryption using FHEVM client
    console.warn("FHE decryption is a placeholder. Implement with FHEVM client library.");
    
    try {
      const decoded = JSON.parse(atob(encryptedData));
      return {
        score: decoded.value || 0,
        risk: decoded.value || 0,
        age: decoded.value || 0
      };
    } catch {
      return { score: 0, risk: 0, age: 0 };
    }
  }

  /**
   * Check if FHE is supported in the current environment
   */
  static isFHESupported(): boolean {
    // TODO: Check if FHEVM client is available
    return false; // Will be true when FHEVM client is properly integrated
  }
}