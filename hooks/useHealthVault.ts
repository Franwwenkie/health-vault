import { useState, useEffect, useCallback } from "react";
import { useAccount, useContractRead, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { Address } from "viem";
import { usePublicClient } from "wagmi";
import { HEALTH_VAULT_ABI, HEALTH_VAULT_ADDRESS, getContractConfig, type UserHealthData, type UploadHealthDataParams } from "@/lib/contract";
import { generateDataHash, validateHealthData, type HealthData } from "@/lib/fhe-utils";

/**
 * Custom hook for Health Vault contract interactions
 */
export function useHealthVault() {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get user's health data metadata
  const { data: userHealthData, refetch: refetchUserData } = useContractRead({
    address: HEALTH_VAULT_ADDRESS,
    abi: HEALTH_VAULT_ABI,
    functionName: "getUserHealthData",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && isConnected,
    },
  });

  // Get user's health score
  const { data: healthScore, refetch: refetchHealthScore } = useContractRead({
    address: HEALTH_VAULT_ADDRESS,
    abi: HEALTH_VAULT_ABI,
    functionName: "getMyHealthScore",
    query: {
      enabled: !!address && isConnected && userHealthData?.[3],
    },
  });

  // Get user's risk factor
  const { data: riskFactor, refetch: refetchRiskFactor } = useContractRead({
    address: HEALTH_VAULT_ADDRESS,
    abi: HEALTH_VAULT_ABI,
    functionName: "getMyRiskFactor",
    query: {
      enabled: !!address && isConnected && userHealthData?.[3],
    },
  });

  // Get user's age group
  const { data: ageGroup, refetch: refetchAgeGroup } = useContractRead({
    address: HEALTH_VAULT_ADDRESS,
    abi: HEALTH_VAULT_ABI,
    functionName: "getMyAgeGroup",
    query: {
      enabled: !!address && isConnected && userHealthData?.[3],
    },
  });

  // Write contract functions
  const { writeContract, data: uploadTxData } = useWriteContract();
  const { writeContract: grantWriteContract, data: grantTxData } = useWriteContract();
  const { writeContract: revokeWriteContract, data: revokeTxData } = useWriteContract();

  // Wait for transactions
  const { isLoading: isUploading, isSuccess: isUploadSuccess } = useWaitForTransactionReceipt({
    hash: uploadTxData,
  });

  // Wait for grant transaction
  const { isLoading: isGranting, isSuccess: isGrantSuccess } = useWaitForTransactionReceipt({
    hash: grantTxData,
  });

  // Wait for revoke transaction
  const { isLoading: isRevoking, isSuccess: isRevokeSuccess } = useWaitForTransactionReceipt({
    hash: revokeTxData,
  });

  // We'll use viem's waitForTransactionReceipt directly

  // Upload health data function
  const uploadHealthDataToContract = useCallback(async (healthData: HealthData) => {
    if (!isConnected || !address) {
      throw new Error("Wallet not connected");
    }

    setIsLoading(true);
    setError(null);

    try {
      // Validate health data
      const validationErrors = validateHealthData(healthData);
      if (validationErrors.length > 0) {
        throw new Error(`Validation failed: ${validationErrors.join(", ")}`);
      }

      // Generate data hash
      const dataHash = generateDataHash(healthData);

      // Write contract
      const hash = await writeContract({
        address: HEALTH_VAULT_ADDRESS,
        abi: HEALTH_VAULT_ABI,
        functionName: "uploadHealthData",
        args: [
          dataHash,
          ("0x" + healthData.healthScore.toString(16).padStart(64, '0')) as `0x${string}`, // Convert to hex bytes32
          ("0x" + healthData.riskFactor.toString(16).padStart(64, '0')) as `0x${string}`, // Convert to hex bytes32
          ("0x" + healthData.ageGroup.toString(16).padStart(64, '0')) as `0x${string}`, // Convert to hex bytes32
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}` // inputProof placeholder
        ],
      });

      // Wait for transaction receipt to confirm it was successful
      const receipt = await publicClient.waitForTransactionReceipt({
        hash: hash,
        timeout: 60000, // 60 seconds timeout
      });

      if (receipt.status === 'success') {
        return { 
          success: true, 
          hash: hash,
          blockNumber: receipt.blockNumber.toString(),
          gasUsed: receipt.gasUsed.toString()
        };
      } else {
        throw new Error("Transaction failed on blockchain");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [isConnected, address, writeContract, publicClient]);

  // Grant sharing permission function
  const grantPermission = useCallback(async (recipient: Address) => {
    if (!isConnected || !address) {
      throw new Error("Wallet not connected");
    }

    setIsLoading(true);
    setError(null);

    try {
      grantWriteContract({
        address: HEALTH_VAULT_ADDRESS,
        abi: HEALTH_VAULT_ABI,
        functionName: "grantSharingPermission",
        args: [recipient],
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [isConnected, address, grantWriteContract]);

  // Revoke sharing permission function
  const revokePermission = useCallback(async (recipient: Address) => {
    if (!isConnected || !address) {
      throw new Error("Wallet not connected");
    }

    setIsLoading(true);
    setError(null);

    try {
      revokeWriteContract({
        address: HEALTH_VAULT_ADDRESS,
        abi: HEALTH_VAULT_ABI,
        functionName: "revokeSharingPermission",
        args: [recipient],
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [isConnected, address, revokeWriteContract]);

  // Get user's health data
  const getDecryptedHealthData = useCallback(async (): Promise<HealthData | null> => {
    if (!healthScore || !riskFactor || !ageGroup) {
      return null;
    }

    try {
      return {
        healthScore: Number(healthScore),
        riskFactor: Number(riskFactor),
        ageGroup: Number(ageGroup),
        dataHash: userHealthData?.[0] || "",
      };
    } catch (err) {
      console.error("Failed to get health data:", err);
      return null;
    }
  }, [healthScore, riskFactor, ageGroup, userHealthData]);

  // Refresh all data
  const refreshData = useCallback(() => {
    refetchUserData();
    refetchHealthScore();
    refetchRiskFactor();
    refetchAgeGroup();
  }, [refetchUserData, refetchHealthScore, refetchRiskFactor, refetchAgeGroup]);

  // Check if user has health data
  const hasHealthData = userHealthData?.[3] || false;

  // Get contract configuration
  const contractConfig = getContractConfig();

  // Mining and Leaderboard functions
  const getUserMiningStats = useCallback(async (userAddress: string) => {
    // For now, return mock data since we need to implement proper contract calls
    // In a real implementation, this would use useContractRead
    return {
      points: 0,
      streak: 0,
      uploads: 0,
      quality: 0,
      rank: 0
    };
  }, []);

  const getTopMiners = useCallback(async (count: number) => {
    // For now, return mock data since we need to implement proper contract calls
    // In a real implementation, this would use useContractRead
    return [[], []]; // addresses, points
  }, []);

  const getLeaderboardSize = useCallback(async () => {
    // For now, return mock data since we need to implement proper contract calls
    // In a real implementation, this would use useContractRead
    return 0;
  }, []);

  return {
    // State
    isLoading: isLoading || isUploading || isGranting || isRevoking,
    error,
    isConnected,
    address,
    
    // Contract data
    userHealthData: userHealthData as readonly [string, bigint, Address, boolean, boolean] | undefined,
    hasHealthData,
    contractConfig,
    
    // Health data
    healthScore,
    riskFactor,
    ageGroup,
    
    // Functions
    uploadHealthDataToContract,
    grantPermission,
    revokePermission,
    getDecryptedHealthData,
    refreshData,
    
    // Mining functions
    getUserMiningStats,
    getTopMiners,
    getLeaderboardSize,
    
    // Transaction states
    isUploading,
    isUploadSuccess,
    isGranting,
    isGrantSuccess,
    isRevoking,
    isRevokeSuccess,
  };
}

/**
 * Hook for checking sharing permissions
 */
export function useSharingPermissions(owner: Address, recipient: Address) {
  const { data: hasPermission, isLoading, error } = useContractRead({
    address: HEALTH_VAULT_ADDRESS,
    abi: HEALTH_VAULT_ABI,
    functionName: "hasSharingPermission",
    args: [owner, recipient],
    query: {
      enabled: !!owner && !!recipient,
    },
  });

  return {
    hasPermission: hasPermission || false,
    isLoading,
    error,
  };
}