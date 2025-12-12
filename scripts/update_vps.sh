#!/bin/bash
set -e

APP_DIR="/var/www/WEB_NE_V2"

echo "Started updates in $APP_DIR"
cd $APP_DIR

# Pull latest changes
echo "Pulling latest changes..."
git pull origin main

# Install dependencies
echo "Installing dependencies..."
npm ci

# Rebuild app
echo "Building Next.js app..."
npm run build

# Reload PM2
echo "Reloading application..."
pm2 reload web-ne-v2 || pm2 start npm --name "web-ne-v2" -- start -- -p 3000

echo "Update Complete!"
