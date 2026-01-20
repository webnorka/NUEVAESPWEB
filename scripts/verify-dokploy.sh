#!/bin/bash

# Script para verificar y configurar Dokploy para auto-deploy
# Ejecutar en el VPS: ssh root@38.242.133.148 'bash -s' < scripts/verify-dokploy.sh

set -e

echo "========================================="
echo "🔍 VERIFICANDO CONFIGURACIÓN DE DOKPLOY"
echo "========================================="
echo ""

# 1. Verificar que Dokploy está corriendo
echo "1️⃣ Estado de Dokploy:"
docker ps --filter "name=dokploy" --format "   ✓ {{.Names}}: {{.Status}}" || echo "   ✗ Dokploy no encontrado"
echo ""

# 2. Verificar puerto de Dokploy
echo "2️⃣ Puertos expuestos:"
docker ps --filter "name=dokploy" --format "   {{.Ports}}" | head -1
echo ""

# 3. Ver configuración de red
echo "3️⃣ Configuración de red:"
docker inspect $(docker ps --filter "name=dokploy" -q) --format '   API Port: {{range .NetworkSettings.Ports}}{{range .}}{{.HostPort}}{{end}}{{end}}' 2>/dev/null || echo "   No se pudo obtener info de red"
echo ""

# 4. Verificar aplicaciones deployeadas
echo "4️⃣ Aplicaciones en Dokploy:"
docker ps --filter "label=com.dokploy.app" --format "   ✓ {{.Names}} ({{.Status}})" || echo "   No hay apps deployeadas"
echo ""

# 5. Buscar aplicación NUEVAESPWEB
echo "5️⃣ Buscando NUEVAESPWEB:"
docker ps | grep -i "nuevaesp" && echo "   ✓ Encontrada" || echo "   ⚠️  No encontrada como contenedor"
echo ""

# 6. Ver logs recientes de Dokploy (últimas 20 líneas)
echo "6️⃣ Logs recientes de Dokploy:"
docker logs $(docker ps --filter "name=dokploy" -q) --tail 20 2>&1 | sed 's/^/   /'
echo ""

echo "========================================="
echo "✅ VERIFICACIÓN COMPLETA"
echo "========================================="
echo ""
echo "📋 PRÓXIMOS PASOS:"
echo "   1. Accede al panel web de Dokploy"
echo "   2. URL típica: http://38.242.133.148:3000"
echo "   3. Busca la aplicación NUEVAESPWEB"
echo "   4. Activa 'Auto Deploy' en la configuración"
echo "   5. Copia la URL del webhook si está disponible"
echo ""
