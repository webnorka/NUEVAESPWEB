#!/bin/bash
TARGET="/var/www/nuevaespana"
GIT_DIR="/var/repo/NEWEB.git"

echo "Deploying to $TARGET..."
# Clean old files
rm -rf $TARGET/*

git --work-tree=$TARGET --git-dir=$GIT_DIR checkout -f main

cd $TARGET
echo "Installing dependencies..."
npm install
echo "Building..."
npm run build
echo "Restarting PM2..."
pm2 reload ne-web || pm2 start npm --name "ne-web" -- start -- -p 3000
pm2 save

echo "Deployment Complete."
