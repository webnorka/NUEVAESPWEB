#!/bin/bash
set -e

# Configuration
APP_DIR="/var/www/WEB_NE_V2"
BRANCH="main"

echo "=========================================="
echo "🚀 Starting Deployment: $(date)"
echo "Target: $APP_DIR"
echo "=========================================="

# Ensure directory exists (safety check)
if [ ! -d "$APP_DIR" ]; then
    echo "❌ Error: App directory does not exist!"
    exit 1
fi

cd $APP_DIR

# Mark directory as safe for git
echo "🔒 Trusting git directory..."
git config --global --add safe.directory $APP_DIR

# Force git to match remote exactly
echo "📥 Fetching latest changes..."
git fetch --all

echo "⚠️  Resetting to origin/$BRANCH (Hard Reset)..."
git reset --hard origin/$BRANCH

# Install dependencies
echo "📦 Installing Clean Dependencies..."
npm ci

# Build
echo "🏗️  Building Next.js Application..."
npm run build

# Restart PM2
echo "🔄 Reloading PM2 Process..."
if pm2 list | grep -q "web-ne-v2"; then
    pm2 reload web-ne-v2
else
    echo "Process not found, starting new..."
    pm2 start npm --name "web-ne-v2" -- start -- -p 3000
    pm2 save
fi

echo "=========================================="
echo "✅ Deployment Successful!"
echo "=========================================="
