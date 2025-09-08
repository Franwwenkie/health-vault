#!/bin/bash

# Script to clean sensitive files from Git history
# This will remove all traces of sensitive files from the entire Git history

echo "🔒 Starting Git history cleanup for sensitive files..."

# List of sensitive files to remove from history
SENSITIVE_FILES=(
    ".env"
    ".env.local"
    ".env.development.local"
    ".env.test.local"
    ".env.production.local"
    "deployment-info.json"
)

# Create a filter command to remove sensitive files
FILTER_CMD="git filter-branch --force --index-filter '"

for file in "${SENSITIVE_FILES[@]}"; do
    FILTER_CMD+="git rm --cached --ignore-unmatch '$file' && "
done

# Remove the last " && " and close the command
FILTER_CMD=${FILTER_CMD% && }
FILTER_CMD+="' --prune-empty --tag-name-filter cat -- --all"

echo "🧹 Removing sensitive files from Git history..."
echo "Files to remove: ${SENSITIVE_FILES[*]}"

# Execute the filter-branch command
eval $FILTER_CMD

if [ $? -eq 0 ]; then
    echo "✅ Git history cleanup completed successfully!"
    echo ""
    echo "⚠️  IMPORTANT: You need to force push to update the remote repository:"
    echo "   git push origin --force --all"
    echo "   git push origin --force --tags"
    echo ""
    echo "🚨 WARNING: This will rewrite the entire Git history!"
    echo "   Make sure all team members are aware of this change."
else
    echo "❌ Git history cleanup failed!"
    exit 1
fi
