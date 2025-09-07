import { ethers } from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
  console.log("🏥 Deploying Health Vault contract...");

  // Get the contract factory
  const HealthVault = await ethers.getContractFactory("HealthVault");

  console.log("💊 Deploying Health Vault contract...");
  console.log(`👤 Deploying from: ${(await ethers.getSigners())[0].address}`);

  // Deploy the contract (no constructor parameters needed for HealthVault)
  const healthVault = await HealthVault.deploy();

  await healthVault.waitForDeployment();

  const address = await healthVault.getAddress();
  console.log(`✅ Health Vault contract deployed to: ${address}`);

  // Save deployment info
  const deploymentInfo = {
    contractAddress: address,
    network: "hardhat",
    timestamp: new Date().toISOString(),
    deployer: (await ethers.getSigners())[0].address,
    chainId: 1337,
  };

  console.log("📄 Deployment Info:", JSON.stringify(deploymentInfo, null, 2));

  // Save to deployment-info.json
  const deploymentPath = path.join(__dirname, "../deployment-info.json");
  fs.writeFileSync(deploymentPath, JSON.stringify(deploymentInfo, null, 2));
  console.log(`📁 Deployment info saved to: ${deploymentPath}`);

  // Create .env.local file for frontend
  const envContent = `NEXT_PUBLIC_HEALTH_VAULT_ADDRESS=${address}
NEXT_PUBLIC_CHAIN_ID=1337
NEXT_PUBLIC_NETWORK=hardhat
`;
  
  const envPath = path.join(__dirname, "../.env.local");
  fs.writeFileSync(envPath, envContent);
  console.log(`🔧 Environment file created: ${envPath}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });