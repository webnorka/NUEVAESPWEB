#!/bin/bash
set -e

SERVER_IP="38.242.133.148"
USER="root"
KEY_PATH="/Users/webnorka/.ssh/id_rsa_vpstest"
SSH_OPTS="-i $KEY_PATH -o StrictHostKeyChecking=no"
APP_DIR="/var/www/nuevaespaña"
REPO_DIR="/var/repo/web_ne.git"
HOOK_FILE="$REPO_DIR/hooks/post-receive"

# Colors
GREEN='\033[0;32m'
NC='\033[0m'

log() {
    echo -e "${GREEN}[SETUP] $1${NC}"
}

run_ssh() {
    ssh $SSH_OPTS $USER@$SERVER_IP "$1"
}

# 1. Update System & Install Basics
log "Updating system & installing git/docker..."
run_ssh "apt-get update && apt-get install -y git curl && apt-get upgrade -y"
run_ssh "curl -fsSL https://get.docker.com | sh"

# 2. Configure Firewall
log "Configuring Firewall..."
run_ssh "ufw allow 22/tcp && ufw allow 80/tcp && ufw allow 443/tcp && ufw --force enable"

# 3. Setup Traefik (Load Balancer)
log "Setting up Traefik..."
run_ssh "mkdir -p /var/www/traefik /var/www/traefik/letsencrypt"
run_ssh "cat > /var/www/traefik/docker-compose.yml <<EOF
services:
  traefik:
    image: traefik:v3.0
    container_name: traefik
    command:
      - --api.insecure=true
      - --providers.docker=true
      - --providers.docker.exposedbydefault=false
      - --entrypoints.web.address=:80
      - --entrypoints.websecure.address=:443
      - --certificatesresolvers.myresolver.acme.tlschallenge=true
      - --certificatesresolvers.myresolver.acme.email=admin@xn--nuevaespaa-19a.eu
      - --certificatesresolvers.myresolver.acme.storage=/letsencrypt/acme.json
    ports:
      - '80:80'
      - '443:443'
      - '8080:8080'
    volumes:
      - '/var/run/docker.sock:/var/run/docker.sock:ro'
      - './letsencrypt:/letsencrypt'
    restart: always

networks:
  default:
    name: web_network
    driver: bridge
EOF"

# Clean up network if it exists manually (conflict fix)
run_ssh "docker network rm web_network || true"
run_ssh "cd /var/www/traefik && docker compose down || true"
run_ssh "cd /var/www/traefik && docker compose up -d"

# 4. Git Deployment Setup
log "Setting up Git Repo & Hook..."
run_ssh "mkdir -p $REPO_DIR $APP_DIR"
run_ssh "cd $REPO_DIR && git init --bare"

# Create post-receive hook using explicit echo to avoid heredoc issues
log "Writing post-receive hook..."
run_ssh "echo '#!/bin/bash' > $HOOK_FILE"
run_ssh "echo 'GIT_DIR=$REPO_DIR' >> $HOOK_FILE"
run_ssh "echo 'WORK_TREE=$APP_DIR' >> $HOOK_FILE"
run_ssh "echo 'export GIT_DIR' >> $HOOK_FILE"
run_ssh "echo 'export WORK_TREE' >> $HOOK_FILE"
run_ssh "echo 'echo \"==== DEPLOYMENT TRIGGERED ====\"' >> $HOOK_FILE"
run_ssh "echo 'while read oldrev newrev refname; do' >> $HOOK_FILE"
run_ssh "echo '    branch=\$(git rev-parse --symbolic --abbrev-ref \$refname)' >> $HOOK_FILE"
run_ssh "echo '    if [ \"\$branch\" = \"main\" ]; then' >> $HOOK_FILE"
run_ssh "echo '        echo \"Checking out main branch...\"' >> $HOOK_FILE"
run_ssh "echo '        git --work-tree=$APP_DIR --git-dir=$REPO_DIR checkout -f main' >> $HOOK_FILE"
run_ssh "echo '        cd $APP_DIR' >> $HOOK_FILE"
run_ssh "echo '        echo \"Building and deploying with Docker...\"' >> $HOOK_FILE"
run_ssh "echo '        docker compose up -d --build --remove-orphans' >> $HOOK_FILE"
run_ssh "echo '        echo \"Cleaning up unused images...\"' >> $HOOK_FILE"
run_ssh "echo '        docker image prune -f' >> $HOOK_FILE"
run_ssh "echo '        echo \"==== DEPLOYMENT COMPLETE ====\"' >> $HOOK_FILE"
run_ssh "echo '    fi' >> $HOOK_FILE"
run_ssh "echo 'done' >> $HOOK_FILE"

run_ssh "chmod +x $HOOK_FILE"

log "Setup Complete!"
