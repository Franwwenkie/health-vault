# 🚀 Vercel Deployment Guide - Health Vault

This guide will help you deploy the Health Vault frontend to Vercel platform.

## 📋 Pre-deployment Checklist

### 1. Ensure Code is Pushed to GitHub
- ✅ Code is pushed to `Franwwenkie/health-vault` repository
- ✅ All environment variables are configured correctly
- ✅ Build configuration is fixed

### 2. Environment Variables Checklist
Make sure you have the values for the following environment variables:

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `NEXT_PUBLIC_HEALTH_VAULT_ADDRESS` | `0xB2b6750C4C97d2599C477aF20D32063781C5A352` | Smart contract address |
| `NEXT_PUBLIC_CHAIN_ID` | `11155111` | Sepolia testnet chain ID |
| `NEXT_PUBLIC_NETWORK` | `sepolia` | Network name |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | `your_wallet_connect_project_id` | Your WalletConnect project ID |
| `FHEVM_NETWORK` | `sepolia` | FHEVM network configuration |

## 🚀 Deployment Steps

### Step 1: Access Vercel
1. Open your browser and visit [https://vercel.com](https://vercel.com)
2. Click "Sign up" or "Log in"
3. Select "Continue with GitHub" to login with your GitHub account

### Step 2: Create New Project
1. After logging in, click the "New Project" button
2. In the "Import Git Repository" section, find `Franwwenkie/health-vault`
3. Click the "Import" button

### Step 3: Configure Project Settings
1. **Project Name**: Keep default `health-vault` or customize
2. **Framework Preset**: Auto-detected as "Next.js"
3. **Root Directory**: Keep default `./`
4. **Build Command**: Keep default `npm run build`
5. **Output Directory**: Keep default `.next`
6. **Install Command**: Keep default `npm install`

### Step 4: Configure Environment Variables
**Important**: Environment variables must be configured manually in Vercel Dashboard, not in `vercel.json`.

1. In the "Environment Variables" section, click "Add"
2. Add the following environment variables one by one:

| Name | Value | Description |
|------|-------|-------------|
| `NEXT_PUBLIC_HEALTH_VAULT_ADDRESS` | `0xB2b6750C4C97d2599C477aF20D32063781C5A352` | Smart contract address |
| `NEXT_PUBLIC_CHAIN_ID` | `11155111` | Sepolia testnet chain ID |
| `NEXT_PUBLIC_NETWORK` | `sepolia` | Network name |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | `your_wallet_connect_project_id` | Your WalletConnect project ID |
| `FHEVM_NETWORK` | `sepolia` | FHEVM network configuration |

3. **Important**: Ensure all environment variables are set for "Production", "Preview", and "Development"
4. Click "Save" to save each environment variable

### Step 5: Deploy
1. Click the "Deploy" button
2. Wait for the build to complete (usually takes 2-5 minutes)
3. After successful build, you'll see a green "Visit" button

## 🎉 Deployment Complete

### Access Your Application
- Click the "Visit" button or use the provided URL
- Your Health Vault application is now live!

### Automatic Deployment Settings
- ✅ Enabled by default: Automatic deployment on every push to `main` branch
- ✅ Preview deployments: Preview deployment created for every Pull Request

## 🚨 Troubleshooting Common Issues

### Build Failures
1. **Check Environment Variables**: Ensure all required environment variables are set
2. **Check package.json**: Ensure all dependencies are properly installed
3. **View Build Logs**: Check detailed build logs in Vercel Dashboard

### Environment Variable Errors
1. **"references Secret which does not exist"**: Ensure environment variables are set manually in Vercel Dashboard, not referenced in `vercel.json`
2. **Environment variables not working**: Ensure environment variables are set for "Production", "Preview", and "Development"
3. **Redeploy required**: After modifying environment variables, redeploy is required for changes to take effect

### Runtime Errors
1. **Check browser console**: Look for JavaScript errors
2. **Check network requests**: Ensure API calls are working properly
3. **Check environment variables**: Ensure frontend can access environment variables

### TypeScript Build Errors
1. **"Cannot find module"**: Ensure `tsconfig.json` properly excludes unnecessary files
2. **Type errors**: Check TypeScript configuration and type definitions

## 📱 Testing Deployment

After deployment, test the following features:

### Basic Functionality Tests
- [ ] Pages load correctly
- [ ] Wallet connection functionality
- [ ] Navigation menu works properly
- [ ] Responsive design works on different devices

### Core Feature Tests
- [ ] Device connection page
- [ ] Data synchronization functionality
- [ ] Data dashboard display
- [ ] Data upload to blockchain
- [ ] Mining leaderboard

### Network Functionality Tests
- [ ] Sepolia testnet connection
- [ ] Smart contract interactions
- [ ] Transaction confirmations
- [ ] Encrypted data storage

## 🔧 Ongoing Maintenance

### Updating Deployment
1. Push code to GitHub
2. Vercel will automatically trigger new deployment
3. Check deployment status and logs

### Environment Variable Updates
1. Modify environment variables in Vercel Dashboard
2. Redeploy the project
3. Test if new configuration is working

### Monitoring and Logs
- Use Vercel Dashboard to monitor application performance
- View build and runtime logs
- Set up error notifications

## 📞 Technical Support

If you encounter issues, check:
1. Vercel official documentation: [https://vercel.com/docs](https://vercel.com/docs)
2. Next.js deployment guide: [https://nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
3. Project GitHub Issues: [https://github.com/Franwwenkie/health-vault/issues](https://github.com/Franwwenkie/health-vault/issues)

---

**🎉 Congratulations! Your Health Vault application has been successfully deployed to Vercel!**