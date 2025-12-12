#!/bin/bash
set -e

# 1. System Update
echo "Updating system..."
export DEBIAN_FRONTEND=noninteractive
apt-get update && apt-get upgrade -y
apt-get install -y curl git unzip

# 2. Node.js Setup
echo "Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
npm install -g pm2

# 3. Nginx Setup
echo "Installing Nginx..."
apt-get install -y nginx

# 4. SSH Key Setup
echo "Setting up SSH Key for GitHub..."
mkdir -p /root/.ssh
cat <<EOF > /root/.ssh/id_ed25519
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
QyNTUxOQAAACDrHlgAPMUIcYhr0lHD/qflk8xDl4Mbg/3YWdcJNfhK3AAAAJAsd86rLHfO
qwAAAAtzc2gtZWQyNTUxOQAAACDrHlgAPMUIcYhr0lHD/qflk8xDl4Mbg/3YWdcJNfhK3A
AAAEDIeEYSLXRFwHKrr+plUhuQNP0dkOSRMMPq5+Od5y270OseWAA8xQhxiGvSUcP+p+WT
zEOXgxuD/dhZ1wk1+ErcAAAACmRlcGxveUB2cHMBAgM=
-----END OPENSSH PRIVATE KEY-----
EOF
chmod 600 /root/.ssh/id_ed25519
ssh-keyscan github.com >> /root/.ssh/known_hosts

# 5. Clone & Deploy
echo "Cloning repository..."
rm -rf /var/www/WEB_NE_V2
mkdir -p /var/www
git clone git@github.com:webnorka/WEB_NE_V2.git /var/www/WEB_NE_V2

cd /var/www/WEB_NE_V2
echo "Installing Dependencies..."
npm install
echo "Building..."
npm run build

echo "Starting Application..."
pm2 delete web-ne-v2 || true
# Ensure we start on port 3000
pm2 start npm --name "web-ne-v2" -- start -- -p 3000
pm2 save
pm2 startup || true

# 6. Nginx Config
echo "Configuring Nginx..."
cat <<EOF > /etc/nginx/sites-available/default
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF
nginx -t
systemctl restart nginx

echo "Setup Complete! Access at http://$(curl -s ifconfig.me)"
