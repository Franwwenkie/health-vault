#!/bin/bash

echo "🔒 Cleaning sensitive files from Git history..."

# Remove sensitive files from all commits
git filter-branch --force --index-filter \
'git rm --cached --ignore-unmatch .env .env.local .env.development.local .env.test.local .env.production.local deployment-info.json' \
--prune-empty --tag-name-filter cat -- --all

echo "✅ Cleanup completed!"
echo ""
echo "⚠️  Next steps:"
echo "1. Force push to remote: git push origin --force --all"
echo "2. Force push tags: git push origin --force --tags"
echo "3. Clean up local refs: git for-each-ref --format='delete %(refname)' refs/original | git update-ref --stdin"
echo "4. Expire reflog: git reflog expire --expire=now --all"
echo "5. Garbage collect: git gc --prune=now --aggressive"
