#!/bin/bash

# Fix Dependencies Script for Health Vault
echo "🔧 Fixing dependency conflicts..."

# Remove existing node_modules and lock file
echo "🧹 Cleaning existing dependencies..."
rm -rf node_modules package-lock.json

# Install with legacy peer deps to resolve viem version conflict
echo "📦 Installing dependencies with legacy peer deps..."
npm install --legacy-peer-deps

echo "✅ Dependencies installed successfully!"
echo ""
echo "You can now run:"
echo "  npm run dev          # Start development server"
echo "  npm run compile      # Compile contracts"
echo "  npm run deploy:local # Deploy to local network"
