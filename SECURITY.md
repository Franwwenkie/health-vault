# 🔒 Security Guidelines - Health Vault

## ⚠️ CRITICAL: Sensitive Information Protection

### 🚨 What NOT to Commit to GitHub

**NEVER commit these files to GitHub:**
- `.env` - Contains private keys and API keys
- `.env.local` - Local environment variables
- `deployment-info.json` - Deployment details with private keys
- Any file containing:
  - Private keys
  - API keys
  - Database credentials
  - Wallet private keys
  - RPC URLs with API keys

### ✅ Safe Files to Commit

**These files are safe to commit:**
- `env.example` - Template with placeholder values
- `README.md` - Documentation
- Source code files
- Configuration templates

### 🛡️ Security Best Practices

1. **Always use `env.example` as a template**
2. **Never put real credentials in example files**
3. **Use placeholder values like:**
   - `your_private_key_here`
   - `your_api_key_here`
   - `your_wallet_connect_project_id`

4. **Check `.gitignore` before committing**
5. **Use PAT tokens for GitHub operations**

### 🔧 Environment Setup

1. **Copy the example file:**
   ```bash
   cp env.example .env.local
   ```

2. **Edit `.env.local` with real values:**
   ```env
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_real_project_id
   PRIVATE_KEY=your_real_private_key
   SEPOLIA_RPC_URL=your_real_rpc_url
   ```

3. **Never commit `.env.local`**

### 🚨 If You Accidentally Commit Sensitive Data

1. **Immediately remove the sensitive information**
2. **Update the file with placeholder values**
3. **Force push to GitHub to overwrite history**
4. **Consider rotating any exposed credentials**

### 📝 Current Safe Configuration

The `env.example` file now contains only placeholder values:
- ✅ Contract address (public information)
- ✅ Network configuration (public information)
- ✅ Placeholder values for sensitive data

### 🔐 GitHub PAT Token Usage

Always use PAT tokens for GitHub operations:
```bash
curl -X PUT "https://api.github.com/repos/owner/repo/contents/file" \
  -H "Authorization: token your_pat_token" \
  -H "Content-Type: application/json" \
  -d '{"message": "commit message", "content": "base64_content"}'
```

---

**Remember: Security is everyone's responsibility!**
