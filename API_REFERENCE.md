# Health Vault API Reference

This document provides comprehensive API reference for the Health Vault smart contract and frontend components.

## 📋 Table of Contents

- [Smart Contract API](#smart-contract-api)
- [Frontend Hooks API](#frontend-hooks-api)
- [FHE Utilities API](#fhe-utilities-api)
- [Error Handling](#error-handling)
- [Event Reference](#event-reference)

## 🔗 Smart Contract API

### Contract: HealthVault

**Address**: `0x...` (deployed contract address)  
**ABI**: Available in `/lib/contract.ts`

### Functions

#### `uploadHealthData(string dataHash, bytes encryptedScore, bytes encryptedRisk, bytes encryptedAge)`

Uploads encrypted health data to the blockchain.

**Parameters:**
- `dataHash` (string): Hash of the health data for verification
- `encryptedScore` (bytes): FHE encrypted health score (1-100)
- `encryptedRisk` (bytes): FHE encrypted risk factor (1-10)
- `encryptedAge` (bytes): FHE encrypted age group (1-5)

**Returns:** None

**Events Emitted:**
- `HealthDataUploaded(address indexed user, string dataHash, uint256 timestamp)`

**Requirements:**
- `dataHash` cannot be empty
- Caller must have a valid wallet connection

**Example:**
```solidity
await healthVault.uploadHealthData(
  "0x1234567890abcdef...",
  encryptedHealthScore,
  encryptedRiskFactor,
  encryptedAgeGroup
);
```

#### `updateHealthData(string dataHash, bytes encryptedScore, bytes encryptedRisk, bytes encryptedAge)`

Updates existing health data.

**Parameters:**
- `dataHash` (string): New hash of the health data
- `encryptedScore` (bytes): Updated FHE encrypted health score
- `encryptedRisk` (bytes): Updated FHE encrypted risk factor
- `encryptedAge` (bytes): Updated FHE encrypted age group

**Returns:** None

**Events Emitted:**
- `HealthDataUploaded(address indexed user, string dataHash, uint256 timestamp)`

**Requirements:**
- User must have existing health data
- `dataHash` cannot be empty

#### `getUserHealthData(address user)`

Retrieves user's health data metadata.

**Parameters:**
- `user` (address): Address of the user

**Returns:**
- `dataHash` (string): Hash of the health data
- `timestamp` (uint256): Timestamp when data was uploaded
- `owner` (address): Address of the data owner
- `isActive` (bool): Whether the data is active

**Example:**
```solidity
const userData = await healthVault.getUserHealthData(userAddress);
console.log(userData.dataHash);
console.log(userData.timestamp);
console.log(userData.owner);
console.log(userData.isActive);
```

#### `grantSharingPermission(address recipient)`

Grants sharing permission to another address.

**Parameters:**
- `recipient` (address): Address to grant permission to

**Returns:** None

**Events Emitted:**
- `SharingPermissionGranted(address indexed owner, address indexed recipient)`

**Requirements:**
- Recipient address cannot be zero address
- Recipient cannot be the caller
- User must have active health data

#### `revokeSharingPermission(address recipient)`

Revokes sharing permission from another address.

**Parameters:**
- `recipient` (address): Address to revoke permission from

**Returns:** None

**Events Emitted:**
- `SharingPermissionRevoked(address indexed owner, address indexed recipient)`

#### `hasSharingPermission(address owner, address recipient)`

Checks if an address has sharing permission.

**Parameters:**
- `owner` (address): Address of the data owner
- `recipient` (address): Address to check permission for

**Returns:**
- `bool`: True if recipient has permission

#### `shareHealthScore(address owner)`

Shares encrypted health score with permitted recipient.

**Parameters:**
- `owner` (address): Address of the data owner

**Returns:**
- `bytes`: Encrypted health score

**Events Emitted:**
- `DataShared(address indexed owner, address indexed recipient, bytes encryptedScore)`

**Requirements:**
- Caller must have sharing permission
- Owner must have active health data

#### `shareRiskFactor(address owner)`

Shares encrypted risk factor with permitted recipient.

**Parameters:**
- `owner` (address): Address of the data owner

**Returns:**
- `bytes`: Encrypted risk factor

**Requirements:**
- Caller must have sharing permission
- Owner must have active health data

#### `shareAgeGroup(address owner)`

Shares encrypted age group with permitted recipient.

**Parameters:**
- `owner` (address): Address of the data owner

**Returns:**
- `bytes`: Encrypted age group

**Requirements:**
- Caller must have sharing permission
- Owner must have active health data

#### `getMyHealthScore()`

Gets the caller's encrypted health score.

**Returns:**
- `bytes`: Encrypted health score

**Requirements:**
- Caller must have active health data

#### `getMyRiskFactor()`

Gets the caller's encrypted risk factor.

**Returns:**
- `bytes`: Encrypted risk factor

**Requirements:**
- Caller must have active health data

#### `getMyAgeGroup()`

Gets the caller's encrypted age group.

**Returns:**
- `bytes`: Encrypted age group

**Requirements:**
- Caller must have active health data

#### `deactivateHealthData()`

Deactivates the caller's health data.

**Returns:** None

**Requirements:**
- User must have active health data

#### `emergencyClearData()`

Emergency function to clear all data.

**Returns:** None

**Requirements:**
- User must have active health data

## 🎣 Frontend Hooks API

### `useHealthVault()`

Main hook for Health Vault contract interactions.

**Returns:**
```typescript
{
  // State
  isLoading: boolean;
  error: string | null;
  fheInstance: FhevmInstance | null;
  isConnected: boolean;
  address: Address | undefined;
  
  // Contract data
  userHealthData: UserHealthData | undefined;
  hasHealthData: boolean;
  contractConfig: ContractConfig | null;
  
  // Encrypted data
  encryptedHealthScore: string | undefined;
  encryptedRiskFactor: string | undefined;
  encryptedAgeGroup: string | undefined;
  
  // Functions
  uploadHealthDataToContract: (data: HealthData) => Promise<void>;
  grantPermission: (recipient: Address) => Promise<void>;
  revokePermission: (recipient: Address) => Promise<void>;
  getDecryptedHealthData: () => Promise<HealthData | null>;
  refreshData: () => void;
  
  // Transaction states
  isUploading: boolean;
  isUploadSuccess: boolean;
  isGranting: boolean;
  isGrantSuccess: boolean;
  isRevoking: boolean;
  isRevokeSuccess: boolean;
}
```

**Example:**
```typescript
const {
  uploadHealthDataToContract,
  hasHealthData,
  isLoading,
  error
} = useHealthVault();

// Upload health data
await uploadHealthDataToContract({
  healthScore: 85,
  riskFactor: 3,
  ageGroup: 2,
  dataHash: "0x..."
});
```

### `useSharingPermissions(owner: Address, recipient: Address)`

Hook for checking sharing permissions.

**Parameters:**
- `owner`: Address of the data owner
- `recipient`: Address to check permission for

**Returns:**
```typescript
{
  hasPermission: boolean;
  refetch: () => void;
}
```

### `useDataSharing()`

Hook for data sharing operations.

**Returns:**
```typescript
{
  sharedData: Record<string, any>;
  shareData: (owner: Address) => Promise<void>;
  isSharing: boolean;
}
```

## 🔐 FHE Utilities API

### `initializeFHE(): Promise<FhevmInstance>`

Initializes FHE instance for encryption/decryption.

**Returns:** Promise resolving to FHE instance

**Example:**
```typescript
const fheInstance = await initializeFHE();
```

### `encryptHealthData(fhevm: FhevmInstance, data: HealthData): Promise<EncryptedHealthData>`

Encrypts health data using FHE.

**Parameters:**
- `fhevm`: FHE instance
- `data`: Health data to encrypt

**Returns:** Promise resolving to encrypted health data

**Example:**
```typescript
const encryptedData = await encryptHealthData(fheInstance, {
  healthScore: 85,
  riskFactor: 3,
  ageGroup: 2,
  dataHash: "0x..."
});
```

### `decryptHealthData(fhevm: FhevmInstance, encryptedData: EncryptedHealthData): Promise<HealthData>`

Decrypts health data using FHE.

**Parameters:**
- `fhevm`: FHE instance
- `encryptedData`: Encrypted health data

**Returns:** Promise resolving to decrypted health data

### `validateHealthData(data: Partial<HealthData>): string[]`

Validates health data before encryption.

**Parameters:**
- `data`: Health data to validate

**Returns:** Array of validation error messages

**Example:**
```typescript
const errors = validateHealthData({
  healthScore: 150, // Invalid: > 100
  riskFactor: 3,
  ageGroup: 2
});
// Returns: ["Health score must be between 1 and 100"]
```

### `generateDataHash(data: Omit<HealthData, 'dataHash'>): string`

Generates data hash for health data.

**Parameters:**
- `data`: Health data (without dataHash)

**Returns:** Generated hash string

### Utility Functions

#### `getAgeGroupDescription(ageGroup: number): string`

Gets human-readable age group description.

#### `getRiskLevelDescription(riskFactor: number): string`

Gets human-readable risk level description.

#### `getHealthScoreDescription(healthScore: number): string`

Gets human-readable health score description.

## ⚠️ Error Handling

### Contract Errors

| Error | Description | Solution |
|-------|-------------|----------|
| `"Data hash cannot be empty"` | Empty data hash provided | Provide valid data hash |
| `"Invalid recipient address"` | Zero address provided | Use valid Ethereum address |
| `"Cannot grant permission to self"` | Trying to grant permission to self | Use different recipient address |
| `"No health data uploaded"` | No health data exists | Upload health data first |
| `"No sharing permission"` | No permission to access data | Request permission from owner |
| `"Health data not available"` | Data is inactive | Reactivate or upload new data |

### Frontend Errors

| Error | Description | Solution |
|-------|-------------|----------|
| `"Wallet not connected"` | No wallet connection | Connect wallet first |
| `"FHE not initialized"` | FHE instance not ready | Wait for FHE initialization |
| `"Validation failed"` | Invalid health data | Check data ranges and format |
| `"Contract not configured"` | Contract address missing | Deploy contract and configure |

### Error Handling Example

```typescript
try {
  await uploadHealthDataToContract(healthData);
} catch (error) {
  if (error.message.includes("Data hash cannot be empty")) {
    // Handle empty data hash
  } else if (error.message.includes("Wallet not connected")) {
    // Handle wallet connection
  } else {
    // Handle other errors
    console.error("Unexpected error:", error);
  }
}
```

## 📡 Event Reference

### `HealthDataUploaded`

Emitted when health data is uploaded or updated.

```solidity
event HealthDataUploaded(
  address indexed user,
  string dataHash,
  uint256 timestamp
);
```

### `SharingPermissionGranted`

Emitted when sharing permission is granted.

```solidity
event SharingPermissionGranted(
  address indexed owner,
  address indexed recipient
);
```

### `SharingPermissionRevoked`

Emitted when sharing permission is revoked.

```solidity
event SharingPermissionRevoked(
  address indexed owner,
  address indexed recipient
);
```

### `DataShared`

Emitted when encrypted data is shared.

```solidity
event DataShared(
  address indexed owner,
  address indexed recipient,
  bytes encryptedScore
);
```

### Event Listening Example

```typescript
// Listen for health data uploads
healthVault.on("HealthDataUploaded", (user, dataHash, timestamp) => {
  console.log(`User ${user} uploaded data: ${dataHash}`);
});

// Listen for permission grants
healthVault.on("SharingPermissionGranted", (owner, recipient) => {
  console.log(`Owner ${owner} granted permission to ${recipient}`);
});
```

## 🔧 Configuration

### Contract Configuration

```typescript
const contractConfig = {
  address: "0x...", // Contract address
  abi: HEALTH_VAULT_ABI, // Contract ABI
};
```

### Network Configuration

```typescript
const networkConfig = {
  hardhat: {
    chainId: 1337,
    url: "http://127.0.0.1:8545"
  },
  sepolia: {
    chainId: 11155111,
    url: "https://sepolia.infura.io/v3/..."
  }
};
```

### FHE Configuration

```typescript
const fheConfig = {
  chainId: 1337,
  publicKey: {
    name: "HealthVault",
    version: "1.0.0"
  }
};
```

---

This API reference provides comprehensive documentation for all Health Vault functionality. For additional examples and use cases, refer to the component implementations in the `/components` directory.
