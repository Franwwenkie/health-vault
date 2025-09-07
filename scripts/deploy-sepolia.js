const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🏥 Deploying Health Vault contract to Sepolia testnet...");

  // Get the contract factory
  const HealthVault = await ethers.getContractFactory("HealthVault");

  console.log("💊 Deploying Health Vault contract...");
  const [deployer] = await ethers.getSigners();
  console.log(`👤 Deploying from: ${deployer.address}`);
  console.log(`💰 Account balance: ${ethers.formatEther(await deployer.provider.getBalance(deployer.address))} ETH`);

  // Deploy the contract (no constructor parameters needed for HealthVault)
  const healthVault = await HealthVault.deploy();

  console.log("⏳ Waiting for deployment confirmation...");
  await healthVault.waitForDeployment();

  const address = await healthVault.getAddress();
  console.log(`✅ Health Vault contract deployed to: ${address}`);

  // Get network info
  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);

  // Save deployment info
  const deploymentInfo = {
    contractAddress: address,
    network: "sepolia",
    chainId: chainId,
    timestamp: new Date().toISOString(),
    deployer: deployer.address,
    transactionHash: healthVault.deploymentTransaction()?.hash,
    blockNumber: await ethers.provider.getBlockNumber(),
  };

  console.log("📄 Deployment Info:", JSON.stringify(deploymentInfo, null, 2));

  // Save to deployment-info.json
  const deploymentPath = path.join(__dirname, "../deployment-info.json");
  fs.writeFileSync(deploymentPath, JSON.stringify(deploymentInfo, null, 2));
  console.log(`📁 Deployment info saved to: ${deploymentPath}`);

  // Create .env.local file for frontend
  const envContent = `# Health Vault Contract Configuration
NEXT_PUBLIC_HEALTH_VAULT_ADDRESS=${address}
NEXT_PUBLIC_CHAIN_ID=${chainId}
NEXT_PUBLIC_NETWORK=sepolia

# Wallet Connect Project ID
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=e08e99d213c331aa0fd00f625de06e66

# FHEVM Configuration
FHEVM_NETWORK=sepolia
`;
  
  const envPath = path.join(__dirname, "../.env.local");
  fs.writeFileSync(envPath, envContent);
  console.log(`🔧 Environment file created: ${envPath}`);

  // Verify contract on Etherscan (optional)
  console.log("\n🔍 To verify the contract on Etherscan, run:");
  console.log(`npx hardhat verify --network sepolia ${address}`);

  console.log("\n🎉 Deployment completed successfully!");
  console.log(`📱 Update your frontend to use contract address: ${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
