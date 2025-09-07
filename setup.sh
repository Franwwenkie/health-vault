#!/bin/bash

# Health Vault Setup Script
echo "🏥 Setting up Health Vault..."

# Clean install to resolve dependency conflicts
echo "🧹 Cleaning existing node_modules..."
rm -rf node_modules package-lock.json

# Install dependencies with legacy peer deps to resolve conflicts
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Create .env.local file
echo "🔧 Creating environment configuration..."
cat > .env.local << EOF
# Environment Variables for Health Vault

# Wallet Connect Project ID (get from https://dashboard.reown.com/)
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=e08e99d213c331aa0fd00f625de06e66

# Contract Address (Sepolia deployment - Latest version)
NEXT_PUBLIC_HEALTH_VAULT_ADDRESS=0x0000000000000000000000000000000000000000

# Network Configuration
NEXT_PUBLIC_NETWORK=sepolia

# Sepolia Testnet (FHEVM compatible)
SEPOLIA_RPC_URL=https://sepolia.rpc.zama.ai
PRIVATE_KEY=your-private-key
ETHERSCAN_API_KEY=your-etherscan-api-key

# FHEVM Configuration
FHEVM_NETWORK=sepolia
EOF

echo "✅ Environment file created: .env.local"

# Compile contracts
echo "🔨 Compiling smart contracts..."
npm run compile

echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Start local Hardhat network: npx hardhat node"
echo "2. Deploy contract: npm run deploy:local"
echo "3. Start development server: npm run dev"
echo ""
echo "The application will be available at http://localhost:3000"
