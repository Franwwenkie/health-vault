#!/bin/bash

# Safe GitHub API upload script for Health Vault project
# IMPORTANT: Replace 'your_github_pat_token_here' with your actual PAT token

TOKEN="your_github_pat_token_here"
REPO="Franwwenkie/health-vault"
BASE_URL="https://api.github.com/repos/$REPO/contents"

# Check if token is set
if [ "$TOKEN" = "your_github_pat_token_here" ]; then
    echo "❌ Error: Please set your GitHub PAT token in this script"
    echo "   Edit this file and replace 'your_github_pat_token_here' with your actual token"
    exit 1
fi

# Function to upload a file
upload_file() {
    local file_path="$1"
    local message="$2"
    
    if [ ! -f "$file_path" ]; then
        echo "⚠️  File not found: $file_path"
        return 1
    fi
    
    echo "📤 Uploading: $file_path"
    
    # Get file content in base64
    local content=$(base64 -i "$file_path" | tr -d '\n')
    
    # Get current SHA if file exists
    local sha=$(curl -s "$BASE_URL/$file_path" -H "Authorization: token $TOKEN" | jq -r '.sha // empty')
    
    # Prepare JSON data
    local json_data=$(cat <<EOF
{
    "message": "$message",
    "content": "$content"$(if [ -n "$sha" ]; then echo ",\n    \"sha\": \"$sha\""; fi)
}
EOF
)
    
    # Upload file
    local response=$(curl -s -X PUT "$BASE_URL/$file_path" \
        -H "Authorization: token $TOKEN" \
        -H "Content-Type: application/json" \
        -d "$json_data")
    
    # Check if upload was successful
    if echo "$response" | jq -e '.content' > /dev/null; then
        echo "✅ Successfully uploaded: $file_path"
    else
        echo "❌ Failed to upload: $file_path"
        echo "$response" | jq -r '.message // "Unknown error"'
        return 1
    fi
}

echo "🚀 Starting safe upload to GitHub..."
echo "📁 Repository: $REPO"
echo ""

# Upload all important files
upload_file "README.md" "Update README with latest information"
upload_file "env.example" "Update environment variables template"
upload_file "SECURITY.md" "Add security guidelines"
upload_file "DEPLOYMENT_INFO.md" "Add deployment information"
upload_file "VERCEL_DEPLOYMENT.md" "Update Vercel deployment guide"

echo ""
echo "🎉 Upload completed!"
echo "⚠️  Remember to keep your PAT token secure and never commit it to Git!"
