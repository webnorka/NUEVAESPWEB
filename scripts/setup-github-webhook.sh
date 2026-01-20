#!/bin/bash

# Script de configuración rápida para GitHub Webhook en Dokploy
# Uso: Ejecuta este script localmente después de obtener la webhook URL de Dokploy

set -e

REPO_OWNER="webnorka"
REPO_NAME="NUEVAESPWEB"
WEBHOOK_URL="${1:-}"

if [ -z "$WEBHOOK_URL" ]; then
    echo "❌ Error: Debes proporcionar la URL del webhook de Dokploy"
    echo ""
    echo "📋 Obtener webhook URL:"
    echo "   1. Accede al panel de Dokploy"
    echo "   2. Ve a tu aplicación NUEVAESPWEB"
    echo "   3. En Settings/Webhooks, copia la URL"
    echo ""
    echo "💡 Uso: $0 <WEBHOOK_URL>"
    echo "   Ejemplo: $0 http://38.242.133.148:3000/api/webhook/abc123"
    exit 1
fi

echo "========================================="
echo "🔗 CONFIGURANDO WEBHOOK EN GITHUB"
echo "========================================="
echo ""
echo "Repository: $REPO_OWNER/$REPO_NAME"
echo "Webhook URL: $WEBHOOK_URL"
echo ""

# Verificar si gh CLI está instalado
if ! command -v gh &> /dev/null; then
    echo "⚠️  GitHub CLI (gh) no está instalado"
    echo ""
    echo "📋 Configuración manual:"
    echo "   1. Ve a: https://github.com/$REPO_OWNER/$REPO_NAME/settings/hooks"
    echo "   2. Haz clic en 'Add webhook'"
    echo "   3. Payload URL: $WEBHOOK_URL"
    echo "   4. Content type: application/json"
    echo "   5. Events: Just the push event"
    echo "   6. Active: ✓"
    echo "   7. Haz clic en 'Add webhook'"
    echo ""
    echo "💡 O instala gh CLI: brew install gh"
    exit 0
fi

# Verificar autenticación
if ! gh auth status &> /dev/null; then
    echo "⚠️  No estás autenticado en GitHub CLI"
    echo "   Ejecuta: gh auth login"
    exit 1
fi

# Crear webhook
echo "📡 Creando webhook..."
gh api \
    repos/$REPO_OWNER/$REPO_NAME/hooks \
    -X POST \
    -f name='web' \
    -f active=true \
    -F 'events[]=push' \
    -f config[url]="$WEBHOOK_URL" \
    -f config[content_type]='json' \
    && echo "✅ Webhook creado exitosamente!" \
    || echo "❌ Error al crear webhook (puede que ya exista)"

echo ""
echo "🧪 Verificar webhook:"
echo "   https://github.com/$REPO_OWNER/$REPO_NAME/settings/hooks"
echo ""
