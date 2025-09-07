# Health Vault Deployment Guide

This guide provides step-by-step instructions for deploying the Health Vault application to different environments.

## 📋 Prerequisites

Before deployment, ensure you have:

- Node.js (v18 or higher)
- npm or yarn package manager
- Git
- A Web3 wallet with testnet tokens
- Access to blockchain networks (Hardhat, Sepolia, etc.)

## 🏗️ Local Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Local Hardhat Network

```bash
npx hardhat node
```

This will start a local Ethereum network on `http://127.0.0.1:8545`.

### 3. Deploy Smart Contract

In a new terminal:

```bash
npm run deploy:local
```

This will:
- Deploy the HealthVault contract to the local network
- Create `deployment-info.json` with contract details
- Generate `.env.local` with environment variables

### 4. Start Frontend Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## 🌐 Sepolia Testnet Deployment

### 1. Configure Environment

Create a `.env` file with your Sepolia configuration:

```env
SEPOLIA_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
PRIVATE_KEY=YOUR_PRIVATE_KEY
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_PROJECT_ID
```

### 2. Get Testnet Tokens

- Visit [Sepolia Faucet](https://sepoliafaucet.com/)
- Request testnet ETH for your wallet
- Ensure you have enough ETH for gas fees

### 3. Deploy to Sepolia

```bash
npm run deploy:sepolia
```

### 4. Update Frontend Configuration

Update your `.env.local` file with the deployed contract address:

```env
NEXT_PUBLIC_HEALTH_VAULT_ADDRESS=0x... # Your deployed contract address
NEXT_PUBLIC_CHAIN_ID=11155111 # Sepolia chain ID
NEXT_PUBLIC_NETWORK=sepolia
```

### 5. Build and Deploy Frontend

```bash
npm run build
npm run start
```

## 🔧 Environment Configuration

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_HEALTH_VAULT_ADDRESS` | Deployed contract address | `0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6` |
| `NEXT_PUBLIC_CHAIN_ID` | Blockchain chain ID | `1337` (Hardhat) or `11155111` (Sepolia) |
| `NEXT_PUBLIC_NETWORK` | Network name | `hardhat` or `sepolia` |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | WalletConnect project ID | `your-project-id` |

### Optional Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `SEPOLIA_URL` | Sepolia RPC URL | `https://sepolia.infura.io/v3/...` |
| `PRIVATE_KEY` | Private key for deployment | `0x...` |
| `NEXT_PUBLIC_APP_URL` | Application URL | `http://localhost:3000` |

## 🚀 Production Deployment

### 1. Prepare Production Environment

```bash
# Install production dependencies
npm ci

# Build the application
npm run build

# Run tests
npm test
```

### 2. Deploy Smart Contract

Deploy to your target network:

```bash
# For mainnet (when available)
npm run deploy:mainnet

# For other networks
npx hardhat run scripts/deploy.ts --network <network-name>
```

### 3. Deploy Frontend

Choose your deployment platform:

#### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Netlify Deployment

```bash
# Build the application
npm run build

# Deploy the 'out' directory to Netlify
```

#### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t health-vault .
docker run -p 3000:3000 health-vault
```

## 🔍 Verification

### 1. Contract Verification

Verify your deployed contract on block explorers:

```bash
npx hardhat verify --network sepolia <contract-address>
```

### 2. Frontend Testing

Test the deployed application:

- [ ] Wallet connection works
- [ ] Health data can be uploaded
- [ ] Data sharing functions work
- [ ] Dashboard displays real data
- [ ] All components render correctly

### 3. Security Checks

- [ ] Environment variables are properly configured
- [ ] Private keys are not exposed
- [ ] Contract is verified on block explorer
- [ ] HTTPS is enabled in production
- [ ] Error handling is working

## 🐛 Troubleshooting

### Common Issues

#### Contract Deployment Fails

```bash
# Check network configuration
npx hardhat console --network sepolia

# Verify account balance
npx hardhat run scripts/check-balance.js --network sepolia
```

#### Frontend Connection Issues

- Verify contract address in environment variables
- Check network configuration in wallet
- Ensure RPC URL is correct
- Verify chain ID matches

#### FHE Initialization Errors

- Check FHE network configuration
- Verify FHE library installation
- Ensure proper network connectivity

### Debug Commands

```bash
# Check contract deployment
npx hardhat run scripts/debug-contract.js

# Test contract functions
npx hardhat run scripts/test-contract.js

# Check frontend build
npm run build && npm run start
```

## 📊 Monitoring

### Contract Monitoring

- Monitor contract events on block explorers
- Set up alerts for critical functions
- Track gas usage and costs

### Frontend Monitoring

- Monitor application performance
- Track user interactions
- Set up error reporting (Sentry, etc.)

## 🔄 Updates and Maintenance

### Contract Updates

1. Deploy new contract version
2. Update frontend configuration
3. Migrate user data (if needed)
4. Update documentation

### Frontend Updates

1. Update dependencies
2. Test thoroughly
3. Deploy to staging
4. Deploy to production

## 📞 Support

For deployment issues:

1. Check the troubleshooting section
2. Review error logs
3. Create an issue in the repository
4. Contact the development team

---

**Note**: Always test deployments in a staging environment before deploying to production. Keep your private keys secure and never commit them to version control.
