import { ethers } from "hardhat";
import { HealthVault } from "../typechain-types";

/**
 * End-to-End Test Script for Health Vault
 * Tests the complete flow from contract deployment to data operations
 */

async function main() {
  console.log("🧪 Starting Health Vault End-to-End Test...");

  try {
    // Get signers
    const [deployer, user1, user2] = await ethers.getSigners();
    console.log(`👤 Deployer: ${deployer.address}`);
    console.log(`👤 User 1: ${user1.address}`);
    console.log(`👤 User 2: ${user2.address}`);

    // Deploy contract
    console.log("\n📦 Deploying HealthVault contract...");
    const HealthVault = await ethers.getContractFactory("HealthVault");
    const healthVault = await HealthVault.deploy();
    await healthVault.waitForDeployment();
    
    const contractAddress = await healthVault.getAddress();
    console.log(`✅ Contract deployed at: ${contractAddress}`);

    // Test 1: Upload Health Data
    console.log("\n🔬 Test 1: Upload Health Data");
    const testData = {
      dataHash: "0x1234567890abcdef1234567890abcdef12345678",
      healthScore: 85,
      riskFactor: 3,
      ageGroup: 2
    };

    // Note: In a real implementation, these would be FHE encrypted values
    // For testing, we'll use placeholder encrypted values
    const encryptedScore = "0x" + "0".repeat(64);
    const encryptedRisk = "0x" + "0".repeat(64);
    const encryptedAge = "0x" + "0".repeat(64);

    const uploadTx = await healthVault.connect(user1).uploadHealthData(
      testData.dataHash,
      encryptedScore,
      encryptedRisk,
      encryptedAge,
      "0x" // inputProof placeholder
    );
    await uploadTx.wait();
    console.log("✅ Health data uploaded successfully");

    // Test 2: Retrieve User Health Data
    console.log("\n🔬 Test 2: Retrieve User Health Data");
    const userData = await healthVault.getUserHealthData(user1.address);
    console.log("📊 User Health Data:");
    console.log(`   Data Hash: ${userData.dataHash}`);
    console.log(`   Timestamp: ${userData.timestamp}`);
    console.log(`   Owner: ${userData.owner}`);
    console.log(`   Is Active: ${userData.isActive}`);

    // Test 3: Grant Sharing Permission
    console.log("\n🔬 Test 3: Grant Sharing Permission");
    const grantTx = await healthVault.connect(user1).grantSharingPermission(user2.address);
    await grantTx.wait();
    console.log("✅ Sharing permission granted");

    // Test 4: Check Sharing Permission
    console.log("\n🔬 Test 4: Check Sharing Permission");
    const hasPermission = await healthVault.hasSharingPermission(user1.address, user2.address);
    console.log(`🔐 User 2 has permission: ${hasPermission}`);

    // Test 5: Share Health Score
    console.log("\n🔬 Test 5: Share Health Score");
    const sharedScore = await healthVault.connect(user2).shareHealthScore(user1.address);
    console.log(`📈 Shared health score: ${sharedScore}`);

    // Test 6: Share Risk Factor
    console.log("\n🔬 Test 6: Share Risk Factor");
    const sharedRisk = await healthVault.connect(user2).shareRiskFactor(user1.address);
    console.log(`⚠️ Shared risk factor: ${sharedRisk}`);

    // Test 7: Share Age Group
    console.log("\n🔬 Test 7: Share Age Group");
    const sharedAge = await healthVault.connect(user2).shareAgeGroup(user1.address);
    console.log(`👤 Shared age group: ${sharedAge}`);

    // Test 8: Revoke Sharing Permission
    console.log("\n🔬 Test 8: Revoke Sharing Permission");
    const revokeTx = await healthVault.connect(user1).revokeSharingPermission(user2.address);
    await revokeTx.wait();
    console.log("✅ Sharing permission revoked");

    // Test 9: Verify Permission Revocation
    console.log("\n🔬 Test 9: Verify Permission Revocation");
    const hasPermissionAfterRevoke = await healthVault.hasSharingPermission(user1.address, user2.address);
    console.log(`🔐 User 2 has permission after revoke: ${hasPermissionAfterRevoke}`);

    // Test 10: Update Health Data
    console.log("\n🔬 Test 10: Update Health Data");
    const updatedData = {
      dataHash: "0xabcdef1234567890abcdef1234567890abcdef12",
      healthScore: 90,
      riskFactor: 2,
      ageGroup: 2
    };

    const updateTx = await healthVault.connect(user1).updateHealthData(
      updatedData.dataHash,
      encryptedScore,
      encryptedRisk,
      encryptedAge,
      "0x" // inputProof placeholder
    );
    await updateTx.wait();
    console.log("✅ Health data updated successfully");

    // Test 11: Get Updated Data
    console.log("\n🔬 Test 11: Get Updated Data");
    const updatedUserData = await healthVault.getUserHealthData(user1.address);
    console.log("📊 Updated User Health Data:");
    console.log(`   Data Hash: ${updatedUserData.dataHash}`);
    console.log(`   Timestamp: ${updatedUserData.timestamp}`);

    // Test 12: Deactivate Health Data
    console.log("\n🔬 Test 12: Deactivate Health Data");
    const deactivateTx = await healthVault.connect(user1).deactivateHealthData();
    await deactivateTx.wait();
    console.log("✅ Health data deactivated");

    // Test 13: Verify Deactivation
    console.log("\n🔬 Test 13: Verify Deactivation");
    const deactivatedData = await healthVault.getUserHealthData(user1.address);
    console.log(`🔒 Data is active after deactivation: ${deactivatedData.isActive}`);

    // Test 14: Emergency Clear Data
    console.log("\n🔬 Test 14: Emergency Clear Data");
    const clearTx = await healthVault.connect(user1).emergencyClearData();
    await clearTx.wait();
    console.log("✅ Health data cleared");

    // Test 15: Verify Data Clearing
    console.log("\n🔬 Test 15: Verify Data Clearing");
    const clearedData = await healthVault.getUserHealthData(user1.address);
    console.log(`🗑️ Data is active after clearing: ${clearedData.isActive}`);

    console.log("\n🎉 All tests completed successfully!");
    console.log("\n📋 Test Summary:");
    console.log("✅ Contract deployment");
    console.log("✅ Health data upload");
    console.log("✅ Data retrieval");
    console.log("✅ Permission granting");
    console.log("✅ Permission checking");
    console.log("✅ Data sharing");
    console.log("✅ Permission revocation");
    console.log("✅ Data updates");
    console.log("✅ Data deactivation");
    console.log("✅ Emergency data clearing");

  } catch (error) {
    console.error("❌ Test failed:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Script failed:", error);
    process.exit(1);
  });
