#!/bin/bash

# NEO1 VPS Deployment Script
# Este script automatiza el despliegue de la plataforma en tu VPS.

set -e

echo "🚀 Iniciando despliegue de NEO1..."

# 1. Pull de los últimos cambios (solo si no es un hook automático)
if [ -d ".git" ]; then
    echo "📥 Obteniendo cambios de Git..."
    git pull origin main
else
    echo "ℹ️  Estamos en un WORK_TREE gestionado por un hook (o sin repo git local)."
fi

# 2. Verificar archivo .env
if [ ! -f .env ]; then
    echo "⚠️  ADVERTENCIA: No se encontró el archivo .env. Asegúrate de tenerlo configurado con las claves de Supabase."
    # Opcional: Crear uno básico si no existe, pero mejor que el usuario lo tenga listo.
fi

# 3. Construir e iniciar contenedores
echo "🐳 Construyendo e iniciando contenedores con Docker Compose..."
docker compose up -d --build

# 4. Limpieza de imágenes antiguas
echo "🧹 Limpiando imágenes huérfanas..."
docker image prune -f

echo "✅ Despliegue completado con éxito."
echo "🌐 La plataforma debería estar activa en tu dominio configurado."
