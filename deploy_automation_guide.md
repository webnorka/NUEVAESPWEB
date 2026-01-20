# 🤖 Guía de Automatización de Deploy con Dokploy

Esta guía te llevará paso a paso para configurar un flujo CI/CD completamente automatizado donde **cada push a la rama `main` desplegará automáticamente en producción**.

---

## 📋 Prerequisitos

- ✅ Repositorio Git conectado a GitHub: `webnorka/NUEVAESPWEB`
- ✅ Código local actualizado y funcionando
- ✅ Dokploy instalado en VPS: `38.242.133.148`
- ✅ Aplicación ya configurada en Dokploy

---

## 🔧 Configuración Paso a Paso

### Paso 1: Acceder al Panel de Dokploy

1. Abre tu navegador y accede al panel de Dokploy:
   - URL: `http://38.242.133.148:3000` (o el puerto que uses)
   - Usuario: El que configuraste en la instalación de Dokploy

> [!TIP]
> Si no recuerdas la URL del panel, conéctate por SSH y ejecuta:
> ```bash
> ssh root@38.242.133.148
> docker ps | grep dokploy
> ```

### Paso 2: Verificar Conexión con GitHub

1. En el panel de Dokploy, ve a tu aplicación **NUEVAESPWEB**
2. En la sección **Source**, verifica:
   - ✅ Provider: **GitHub**
   - ✅ Repository: `webnorka/NUEVAESPWEB`
   - ✅ Branch: `main`

> [!IMPORTANT]
> Si no está conectado a GitHub:
> 1. Haz clic en **Connect GitHub**
> 2. Autoriza Dokploy para acceder a tu repositorio
> 3. Selecciona el repositorio `webnorka/NUEVAESPWEB`
> 4. Selecciona la rama `main`

### Paso 3: Habilitar Auto Deploy

1. En la configuración de la aplicación NUEVAESPWEB, busca la sección **Deployment**
2. Activa la opción **Auto Deploy** o **Deploy on Push**
3. Configura:
   - **Branch to deploy**: `main`
   - **Build Type**: `Docker` (ya configurado)
   - **Auto Deploy**: `ON` ✅

4. Guarda los cambios

### Paso 4: Configurar Webhook de GitHub (Recomendado)

Para que GitHub notifique a Dokploy instantáneamente:

1. **En Dokploy**:
   - Ve a la aplicación NUEVAESPWEB
   - Busca la sección **Webhooks** o **Deployment Settings**
   - Copia la **Webhook URL** (formato: `http://38.242.133.148:XXXX/webhooks/...`)

2. **En GitHub**:
   - Ve a `https://github.com/webnorka/NUEVAESPWEB/settings/hooks`
   - Haz clic en **Add webhook**
   - Pega la URL del webhook de Dokploy
   - **Content type**: `application/json`
   - **Events**: Selecciona **Just the push event**
   - **Active**: Marcado ✅
   - Haz clic en **Add webhook**

3. **Verificar**:
   - GitHub enviará un ping test
   - Verifica que el webhook muestra un ✅ verde en GitHub

> [!NOTE]
> Si Dokploy no expone públicamente el webhook, puedes usar **polling** (Dokploy chequeará cambios periódicamente).

### Paso 5: Verificar Variables de Entorno

Asegúrate de que todas las variables están configuradas en Dokploy:

| Variable | Requerido | Valor |
|----------|-----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Tu URL de Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Anon Key |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Service Role Key |
| `STRIPE_SECRET_KEY` | ✅ | Secret Key de Stripe |
| `STRIPE_WEBHOOK_SECRET` | ✅ | Webhook Secret |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | ✅ | Publishable Key |
| `NEXT_PUBLIC_SITE_URL` | ✅ | `https://xn--nuevaespaa-19a.eu` |

---

## 🚀 Workflow de Desarrollo

Una vez configurado el auto-deploy, tu flujo de trabajo será:

```bash
# 1. Hacer cambios en tu código local
# ... editar archivos ...

# 2. Commitear los cambios
git add .
git commit -m "feat: descripción del cambio"

# 3. Push a GitHub
git push origin main

# 4. ✨ Dokploy detecta automáticamente y despliega
# No necesitas hacer nada más!
```

### ⏱️ Timeline esperado:
- **0s**: Push exitoso a GitHub
- **5-15s**: Dokploy detecta el cambio (webhook) o 1-5min (polling)
- **3-5min**: Build de la aplicación
- **30s**: Deploy del nuevo contenedor
- **Total**: ~4-6 minutos desde push hasta producción

---

## 📊 Monitoreo y Logs

### Ver el progreso del deploy:
1. Ve al panel de Dokploy
2. Selecciona tu aplicación NUEVAESPWEB
3. Ve a la pestaña **Deployments**
4. El último deploy mostrará:
   - Estado: Building → Deploying → Running
   - Logs en tiempo real
   - Commit hash y mensaje

### Ver logs de la aplicación:
1. En Dokploy, ve a **Logs**
2. Filtra por:
   - **Build logs**: Para ver errores de compilación
   - **Runtime logs**: Para ver la aplicación corriendo

---

## 🔍 Troubleshooting

### ❌ El deploy no se dispara automáticamente

**Verificar:**
1. ¿El webhook está configurado correctamente en GitHub?
   - Ve a Settings → Webhooks → Recent Deliveries
   - Debe haber entregas exitosas con código 200
2. ¿Auto Deploy está activado en Dokploy?
   - Configuración de la app → Auto Deploy: ON
3. ¿La rama es correcta?
   - Verifica que estás pusheando a `main`

**Solución temporal:**
- Dispara un deploy manual desde el panel de Dokploy

### ❌ El build falla

**Verificar:**
1. **Logs de build** en Dokploy
2. **Variables de entorno** están configuradas
3. **Dockerfile** es correcto (ya debería estarlo)

**Comandos para debug local:**
```bash
# Probar build localmente
docker build -t nuevaespweb-test .

# Si falla, revisar errores
```

### ❌ La aplicación no inicia después del deploy

**Verificar:**
1. **Runtime logs** en Dokploy
2. **Puerto 3000** está expuesto correctamente
3. **Variables de entorno** `NEXT_PUBLIC_*` están presentes

**Rollback:**
- En Dokploy, ve a Deployments → Selecciona un deploy anterior → Rollback

---

## 🧪 Prueba del Flujo Completo

Vamos a verificar que todo funciona:

```bash
# 1. Agregar un timestamp al README (cambio mínimo)
echo -e "\n## Last Deploy Test: $(date '+%Y-%m-%d %H:%M:%S')" >> README.md

# 2. Commit y push
git add README.md
git commit -m "test: verify auto-deploy workflow"
git push origin main

# 3. Monitorear en Dokploy
# - Ve al panel
# - Observa la pestaña Deployments
# - Debe aparecer un nuevo deployment
# - Espera a que complete (status: Running)

# 4. Verificar en producción
# - Abre https://xn--nuevaespaa-19a.eu
# - La app debe estar corriendo sin problemas

# 5. Limpiar (opcional)
git revert HEAD --no-edit
git push origin main
```

---

## 📝 Notas Finales

- **Tiempo de deploy**: El proceso completo toma ~4-6 minutos
- **Rollback**: Dokploy mantiene deploys anteriores, puedes hacer rollback con un clic
- **Zero-downtime**: Dokploy hace rolling deployments, tu app sigue disponible durante el deploy
- **Logs persistentes**: Todos los logs se guardan para troubleshooting

---

## 🎯 Estado de Esta Configuración

- [x] Repositorio Git configurado
- [x] Remote origin apunta a GitHub
- [ ] Auto Deploy activado en Dokploy
- [ ] Webhook configurado en GitHub
- [ ] Flujo completamente automatizado

**Siguiente paso**: Sigue esta guía para completar la configuración en el panel de Dokploy.
